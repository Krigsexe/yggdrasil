/**
 * Cognitive Daemon Service
 *
 * The autonomous background process that continuously improves YGGDRASIL.
 * Uses local LLM (Ollama) for cost-free cognitive tasks.
 *
 * Controlled ONLY by superadmin via Bifrost UI.
 *
 * "YGGDRASIL grandit meme quand personne ne regarde."
 */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createLogger,
  generateId,
  DaemonStatus,
  DaemonConfig,
  DaemonStats,
  DaemonTask,
  DaemonTaskType,
  DaemonTaskStatus,
  DaemonEvent,
  DaemonCommand,
} from '@yggdrasil/shared';
import { RedisService } from '@yggdrasil/shared/services';
import { OllamaService } from './ollama.service.js';

const logger = createLogger('DaemonService', 'info');

// Redis keys for daemon state
const REDIS_KEYS = {
  STATUS: 'daemon:status',
  CONFIG: 'daemon:config',
  STATS: 'daemon:stats',
  QUEUE: 'daemon:queue',
  EVENTS: 'daemon:events',
  LAST_COMMAND: 'daemon:last_command',
};

@Injectable()
export class DaemonService implements OnModuleInit, OnModuleDestroy {
  private status: DaemonStatus = 'stopped';
  private config: DaemonConfig;
  private stats: DaemonStats;
  private taskQueue: DaemonTask[] = [];
  private events: DaemonEvent[] = [];
  private cycleTimer: NodeJS.Timeout | null = null;
  private startTime: Date | null = null;
  private runningTasks = 0;

  constructor(
    private readonly configService: ConfigService,
    private readonly redis: RedisService,
    private readonly ollama: OllamaService
  ) {
    // Load config from environment
    this.config = {
      enabled: this.configService.get<string>('DAEMON_ENABLED') === 'true',
      superadminEmail: this.configService.get<string>('DAEMON_SUPERADMIN_EMAIL') || '',
      ollamaUrl: this.configService.get<string>('OLLAMA_URL') || 'http://localhost:11434',
      ollamaModel: this.configService.get<string>('OLLAMA_MODEL') || 'qwen2.5-coder:1.5b',
      cycleIntervalMs: 60000, // 1 minute between cycles
      maxTasksPerCycle: 5,
      maxConcurrentTasks: 2,
    };

    // Initialize stats
    this.stats = {
      status: 'stopped',
      uptime: 0,
      tasksCompleted: 0,
      tasksFailed: 0,
      tasksQueued: 0,
      ollamaAvailable: false,
      ollamaModel: this.config.ollamaModel,
      memoryUsageMb: 0,
      errorRate: 0,
    };
  }

  async onModuleInit(): Promise<void> {
    // Load persisted state from Redis
    await this.loadState();

    // Check Ollama availability
    this.stats.ollamaAvailable = await this.ollama.checkAvailability();

    if (this.config.enabled && this.stats.ollamaAvailable) {
      logger.info('Daemon enabled and Ollama available, starting automatically');
      await this.start('system');
    } else if (this.config.enabled && !this.stats.ollamaAvailable) {
      logger.warn('Daemon enabled but Ollama not available, staying stopped');
      this.addEvent('error', 'Daemon enabled but Ollama not available');
    } else {
      logger.info('Daemon disabled by configuration');
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.stop('system');
    await this.saveState();
  }

  /**
   * Check if user is authorized to control daemon
   */
  isAuthorized(email: string): boolean {
    return email === this.config.superadminEmail;
  }

  /**
   * Get superadmin email (for UI display)
   */
  getSuperadminEmail(): string {
    return this.config.superadminEmail;
  }

  /**
   * Execute a daemon command
   */
  async executeCommand(command: DaemonCommand): Promise<{ success: boolean; message: string }> {
    // Check authorization
    if (!this.isAuthorized(command.requestedBy)) {
      logger.warn('Unauthorized daemon command attempt', {
        action: command.action,
        requestedBy: command.requestedBy,
        authorizedEmail: this.config.superadminEmail,
      });
      return {
        success: false,
        message: `Non autorise. Seul ${this.config.superadminEmail} peut controler le daemon.`,
      };
    }

    // Save command to Redis
    await this.redis.set(REDIS_KEYS.LAST_COMMAND, JSON.stringify(command), 3600);

    switch (command.action) {
      case 'start':
        return this.start(command.requestedBy);
      case 'stop':
        return this.stop(command.requestedBy);
      case 'pause':
        return this.pause(command.requestedBy);
      case 'resume':
        return this.resume(command.requestedBy);
      case 'clear_queue':
        return this.clearQueue(command.requestedBy);
      case 'status':
        return { success: true, message: `Status: ${this.status}` };
      default:
        return { success: false, message: `Action inconnue: ${command.action}` };
    }
  }

  /**
   * Start the daemon
   */
  async start(requestedBy: string): Promise<{ success: boolean; message: string }> {
    if (this.status === 'running') {
      return { success: false, message: 'Daemon deja en cours d\'execution' };
    }

    // Check Ollama availability
    const ollamaCheck = await this.ollama.healthCheck();
    if (!ollamaCheck.available) {
      this.addEvent('error', 'Cannot start: Ollama not available');
      return { success: false, message: 'Ollama non disponible. Verifiez que Ollama est lance.' };
    }

    this.status = 'running';
    this.startTime = new Date();
    this.stats.status = 'running';
    this.stats.ollamaAvailable = true;

    // Start the cycle timer
    this.startCycle();

    this.addEvent('start', `Daemon demarre par ${requestedBy}`);
    logger.info('Daemon started', { requestedBy });

    await this.saveState();
    return { success: true, message: 'Daemon demarre avec succes' };
  }

  /**
   * Stop the daemon
   */
  async stop(requestedBy: string): Promise<{ success: boolean; message: string }> {
    if (this.status === 'stopped') {
      return { success: false, message: 'Daemon deja arrete' };
    }

    // Stop the cycle timer
    this.stopCycle();

    this.status = 'stopped';
    this.startTime = null;
    this.stats.status = 'stopped';

    this.addEvent('stop', `Daemon arrete par ${requestedBy}`);
    logger.info('Daemon stopped', { requestedBy });

    await this.saveState();
    return { success: true, message: 'Daemon arrete avec succes' };
  }

  /**
   * Pause the daemon (keep state but stop processing)
   */
  async pause(requestedBy: string): Promise<{ success: boolean; message: string }> {
    if (this.status !== 'running') {
      return { success: false, message: 'Daemon n\'est pas en cours d\'execution' };
    }

    this.stopCycle();
    this.status = 'paused';
    this.stats.status = 'paused';

    this.addEvent('pause', `Daemon mis en pause par ${requestedBy}`);
    logger.info('Daemon paused', { requestedBy });

    await this.saveState();
    return { success: true, message: 'Daemon mis en pause' };
  }

  /**
   * Resume the daemon
   */
  async resume(requestedBy: string): Promise<{ success: boolean; message: string }> {
    if (this.status !== 'paused') {
      return { success: false, message: 'Daemon n\'est pas en pause' };
    }

    // Check Ollama availability
    const ollamaCheck = await this.ollama.healthCheck();
    if (!ollamaCheck.available) {
      return { success: false, message: 'Ollama non disponible' };
    }

    this.status = 'running';
    this.stats.status = 'running';
    this.stats.ollamaAvailable = true;

    this.startCycle();

    this.addEvent('resume', `Daemon repris par ${requestedBy}`);
    logger.info('Daemon resumed', { requestedBy });

    await this.saveState();
    return { success: true, message: 'Daemon repris' };
  }

  /**
   * Clear the task queue
   */
  async clearQueue(requestedBy: string): Promise<{ success: boolean; message: string }> {
    const count = this.taskQueue.length;
    this.taskQueue = [];
    this.stats.tasksQueued = 0;

    this.addEvent('task_complete', `Queue videe par ${requestedBy} (${count} taches)`);
    logger.info('Queue cleared', { requestedBy, count });

    await this.saveState();
    return { success: true, message: `${count} taches supprimees de la queue` };
  }

  /**
   * Get current daemon status and stats
   */
  getStatus(): DaemonStats {
    // Update uptime
    if (this.startTime && this.status === 'running') {
      this.stats.uptime = Math.floor((Date.now() - this.startTime.getTime()) / 1000);
    }

    // Update memory usage
    const memUsage = process.memoryUsage();
    this.stats.memoryUsageMb = Math.round(memUsage.heapUsed / 1024 / 1024);

    // Update queue count
    this.stats.tasksQueued = this.taskQueue.length;

    // Calculate error rate
    const totalTasks = this.stats.tasksCompleted + this.stats.tasksFailed;
    this.stats.errorRate = totalTasks > 0 ? (this.stats.tasksFailed / totalTasks) * 100 : 0;

    return { ...this.stats };
  }

  /**
   * Get recent events (last 50)
   */
  getEvents(): DaemonEvent[] {
    return [...this.events].slice(-50);
  }

  /**
   * Get current configuration
   */
  getConfig(): DaemonConfig {
    return { ...this.config };
  }

  /**
   * Add a task to the queue
   */
  async addTask(
    type: DaemonTaskType,
    payload?: Record<string, unknown>,
    priority = 5
  ): Promise<DaemonTask> {
    const task: DaemonTask = {
      id: generateId(),
      type,
      status: 'pending' as DaemonTaskStatus,
      priority,
      payload,
      createdAt: new Date(),
    };

    this.taskQueue.push(task);
    this.taskQueue.sort((a, b) => b.priority - a.priority); // Higher priority first
    this.stats.tasksQueued = this.taskQueue.length;

    logger.info('Task added to queue', { taskId: task.id, type, priority });
    return task;
  }

  // ============= Private Methods =============

  /**
   * Start the processing cycle
   */
  private startCycle(): void {
    if (this.cycleTimer) {
      clearInterval(this.cycleTimer);
    }

    // Run immediately, then on interval
    void this.processCycle();

    this.cycleTimer = setInterval(() => {
      void this.processCycle();
    }, this.config.cycleIntervalMs);
  }

  /**
   * Stop the processing cycle
   */
  private stopCycle(): void {
    if (this.cycleTimer) {
      clearInterval(this.cycleTimer);
      this.cycleTimer = null;
    }
  }

  /**
   * Process one cycle of tasks
   */
  private async processCycle(): Promise<void> {
    if (this.status !== 'running') return;

    this.stats.lastCycleAt = new Date();

    // Check Ollama availability
    const ollamaCheck = await this.ollama.healthCheck();
    this.stats.ollamaAvailable = ollamaCheck.available;

    if (!ollamaCheck.available) {
      logger.warn('Ollama not available during cycle, skipping');
      return;
    }

    // Process tasks from queue
    const tasksToProcess = Math.min(
      this.config.maxTasksPerCycle,
      this.taskQueue.filter((t) => t.status === 'pending').length
    );

    for (let i = 0; i < tasksToProcess && this.runningTasks < this.config.maxConcurrentTasks; i++) {
      const task = this.taskQueue.find((t) => t.status === 'pending');
      if (task) {
        void this.processTask(task);
      }
    }

    // If queue is empty, add default maintenance tasks
    if (this.taskQueue.length === 0) {
      await this.addMaintenanceTasks();
    }
  }

  /**
   * Process a single task
   */
  private async processTask(task: DaemonTask): Promise<void> {
    this.runningTasks++;
    task.status = 'running';
    task.startedAt = new Date();

    logger.info('Processing task', { taskId: task.id, type: task.type });

    try {
      switch (task.type) {
        case DaemonTaskType.HEALTH_CHECK:
          await this.runHealthCheck(task);
          break;
        case DaemonTaskType.VALIDATE_KNOWLEDGE:
          await this.runValidateKnowledge(task);
          break;
        case DaemonTaskType.CLEANUP:
          await this.runCleanup(task);
          break;
        case DaemonTaskType.GENERATE_EMBEDDINGS:
          await this.runGenerateEmbeddings(task);
          break;
        case DaemonTaskType.MEMORY_CONSOLIDATION:
          await this.runMemoryConsolidation(task);
          break;
        default:
          task.result = { message: 'Unknown task type' };
      }

      task.status = 'completed';
      task.completedAt = new Date();
      task.durationMs = task.completedAt.getTime() - (task.startedAt?.getTime() || 0);
      this.stats.tasksCompleted++;
      this.stats.lastTaskAt = task.completedAt;

      this.addEvent('task_complete', `Tache ${task.type} terminee`, {
        taskId: task.id,
        durationMs: task.durationMs,
      });

      logger.info('Task completed', {
        taskId: task.id,
        type: task.type,
        durationMs: task.durationMs,
      });
    } catch (error) {
      task.status = 'failed';
      task.error = (error as Error).message;
      task.completedAt = new Date();
      task.durationMs = task.completedAt.getTime() - (task.startedAt?.getTime() || 0);
      this.stats.tasksFailed++;

      this.addEvent('task_failed', `Tache ${task.type} echouee: ${task.error}`, {
        taskId: task.id,
      });

      logger.error('Task failed', error as Error, { taskId: task.id, type: task.type });
    } finally {
      this.runningTasks--;

      // Remove completed/failed tasks from queue after some time
      setTimeout(() => {
        this.taskQueue = this.taskQueue.filter(
          (t) => t.id !== task.id || (t.status !== 'completed' && t.status !== 'failed')
        );
      }, 60000);
    }
  }

  /**
   * Add default maintenance tasks when queue is empty
   */
  private async addMaintenanceTasks(): Promise<void> {
    // Health check every cycle
    await this.addTask(DaemonTaskType.HEALTH_CHECK, {}, 1);

    // Memory consolidation (low priority)
    await this.addTask(DaemonTaskType.MEMORY_CONSOLIDATION, {}, 2);
  }

  // ============= Task Implementations =============

  /**
   * Run system health check
   */
  private async runHealthCheck(task: DaemonTask): Promise<void> {
    const ollamaHealth = await this.ollama.healthCheck();
    const redisHealth = await this.redis.ping();

    task.result = {
      ollama: {
        available: ollamaHealth.available,
        latencyMs: ollamaHealth.latencyMs,
        model: ollamaHealth.model,
      },
      redis: {
        available: redisHealth.ok,
        latencyMs: redisHealth.latencyMs,
      },
      memory: {
        heapUsedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        heapTotalMb: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    };
  }

  /**
   * Validate existing knowledge (placeholder for future MIMIR integration)
   */
  private async runValidateKnowledge(task: DaemonTask): Promise<void> {
    // Use Ollama to validate a sample of knowledge
    const response = await this.ollama.chat(
      'Analyse et valide la coherence de cette affirmation: "YGGDRASIL est un systeme d\'IA ethique."',
      'Tu es un validateur de connaissances. Reponds avec VALIDE ou INVALIDE suivi d\'une courte explication.'
    );

    task.result = {
      validated: true,
      sample: 'YGGDRASIL ethics statement',
      ollamaResponse: response,
    };
  }

  /**
   * Cleanup stale data
   */
  private async runCleanup(task: DaemonTask): Promise<void> {
    // Cleanup old events (keep last 100)
    const removedEvents = this.events.length > 100 ? this.events.length - 100 : 0;
    this.events = this.events.slice(-100);

    task.result = {
      removedEvents,
      currentEventsCount: this.events.length,
    };
  }

  /**
   * Generate embeddings for semantic search (placeholder)
   */
  private async runGenerateEmbeddings(task: DaemonTask): Promise<void> {
    // This would integrate with the embedding service
    task.result = {
      message: 'Embedding generation placeholder',
      processed: 0,
    };
  }

  /**
   * Consolidate memory (MUNIN integration placeholder)
   */
  private async runMemoryConsolidation(task: DaemonTask): Promise<void> {
    // This would integrate with MUNIN for memory management
    task.result = {
      message: 'Memory consolidation placeholder',
      consolidated: 0,
    };
  }

  // ============= Persistence =============

  /**
   * Add an event to the log
   */
  private addEvent(
    type: DaemonEvent['type'],
    message: string,
    details?: Record<string, unknown>
  ): void {
    const event: DaemonEvent = {
      id: generateId(),
      type,
      message,
      details,
      timestamp: new Date(),
    };

    this.events.push(event);

    // Keep only last 200 events in memory
    if (this.events.length > 200) {
      this.events = this.events.slice(-200);
    }
  }

  /**
   * Save state to Redis
   */
  private async saveState(): Promise<void> {
    if (!this.redis.isAvailable()) return;

    try {
      await this.redis.set(REDIS_KEYS.STATUS, this.status, 86400);
      await this.redis.set(REDIS_KEYS.STATS, JSON.stringify(this.stats), 86400);
      await this.redis.set(REDIS_KEYS.EVENTS, JSON.stringify(this.events.slice(-50)), 86400);
    } catch (error) {
      logger.error('Failed to save daemon state to Redis', error as Error);
    }
  }

  /**
   * Load state from Redis
   */
  private async loadState(): Promise<void> {
    if (!this.redis.isAvailable()) return;

    try {
      const savedStats = await this.redis.get(REDIS_KEYS.STATS);
      if (savedStats) {
        const parsed = JSON.parse(savedStats) as DaemonStats;
        // Only restore counters, not runtime status
        this.stats.tasksCompleted = parsed.tasksCompleted || 0;
        this.stats.tasksFailed = parsed.tasksFailed || 0;
      }

      const savedEvents = await this.redis.get(REDIS_KEYS.EVENTS);
      if (savedEvents) {
        this.events = JSON.parse(savedEvents) as DaemonEvent[];
      }
    } catch (error) {
      logger.error('Failed to load daemon state from Redis', error as Error);
    }
  }
}
