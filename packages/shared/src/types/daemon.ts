/**
 * Daemon Types
 *
 * Types for the Cognitive Daemon - the autonomous background process
 * that continuously improves YGGDRASIL's knowledge base.
 *
 * "YGGDRASIL grandit meme quand personne ne regarde."
 */

/**
 * Daemon status - current state of the cognitive daemon
 */
export type DaemonStatus = 'running' | 'paused' | 'stopped' | 'error';

/**
 * Daemon task types - what the daemon can do
 */
export enum DaemonTaskType {
  /** Index new sources into MIMIR */
  INDEX_SOURCE = 'INDEX_SOURCE',
  /** Validate existing knowledge */
  VALIDATE_KNOWLEDGE = 'VALIDATE_KNOWLEDGE',
  /** Clean stale data */
  CLEANUP = 'CLEANUP',
  /** Generate embeddings for semantic search */
  GENERATE_EMBEDDINGS = 'GENERATE_EMBEDDINGS',
  /** Health check of system components */
  HEALTH_CHECK = 'HEALTH_CHECK',
  /** Memory consolidation (MUNIN) */
  MEMORY_CONSOLIDATION = 'MEMORY_CONSOLIDATION',
}

/**
 * Daemon task status
 */
export type DaemonTaskStatus = 'pending' | 'running' | 'completed' | 'failed';

/**
 * Individual daemon task
 */
export interface DaemonTask {
  id: string;
  type: DaemonTaskType;
  status: DaemonTaskStatus;
  priority: number; // 1-10, higher = more urgent
  payload?: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  durationMs?: number;
}

/**
 * Daemon configuration
 */
export interface DaemonConfig {
  /** Is the daemon enabled */
  enabled: boolean;
  /** Email of the superadmin who can control the daemon */
  superadminEmail: string;
  /** Ollama URL for local LLM inference */
  ollamaUrl: string;
  /** Ollama model to use */
  ollamaModel: string;
  /** Interval between task cycles (ms) */
  cycleIntervalMs: number;
  /** Max tasks per cycle */
  maxTasksPerCycle: number;
  /** Max concurrent tasks */
  maxConcurrentTasks: number;
}

/**
 * Daemon statistics
 */
export interface DaemonStats {
  status: DaemonStatus;
  uptime: number; // seconds
  tasksCompleted: number;
  tasksFailed: number;
  tasksQueued: number;
  lastCycleAt?: Date;
  lastTaskAt?: Date;
  ollamaAvailable: boolean;
  ollamaModel: string;
  memoryUsageMb: number;
  errorRate: number; // percentage
}

/**
 * Daemon control command
 */
export interface DaemonCommand {
  action: 'start' | 'stop' | 'pause' | 'resume' | 'status' | 'clear_queue';
  requestedBy: string; // email of the user
  timestamp: Date;
}

/**
 * Daemon event for logging
 */
export interface DaemonEvent {
  id: string;
  type: 'start' | 'stop' | 'pause' | 'resume' | 'task_complete' | 'task_failed' | 'error';
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Ollama response structure
 */
export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  eval_count?: number;
  eval_duration?: number;
}

/**
 * Ollama model info
 */
export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details?: {
    format: string;
    family: string;
    parameter_size: string;
    quantization_level: string;
  };
}
