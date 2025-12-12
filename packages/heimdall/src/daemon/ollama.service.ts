/**
 * Ollama Service
 *
 * Client for local LLM inference via Ollama.
 * Used by the Cognitive Daemon for cost-free local processing.
 *
 * "La sagesse locale, sans cout externe."
 */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createLogger, OllamaResponse, OllamaModel } from '@yggdrasil/shared';

const logger = createLogger('OllamaService', 'info');

export interface OllamaGenerateOptions {
  prompt: string;
  model?: string;
  system?: string;
  context?: number[];
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    num_predict?: number;
    stop?: string[];
  };
}

@Injectable()
export class OllamaService implements OnModuleInit {
  private readonly baseUrl: string;
  private readonly defaultModel: string;
  private available = false;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.config.get<string>('OLLAMA_URL') || 'http://localhost:11434';
    this.defaultModel = this.config.get<string>('OLLAMA_MODEL') || 'qwen2.5-coder:1.5b';
  }

  async onModuleInit(): Promise<void> {
    await this.checkAvailability();
  }

  /**
   * Check if Ollama is available and the model is loaded
   */
  async checkAvailability(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        logger.warn('Ollama not available', { status: response.status });
        this.available = false;
        return false;
      }

      const data = (await response.json()) as { models: OllamaModel[] };
      const models = data.models || [];
      const hasModel = models.some((m) => m.name.startsWith(this.defaultModel.split(':')[0] || ''));

      if (hasModel) {
        logger.info('Ollama available', {
          url: this.baseUrl,
          model: this.defaultModel,
          modelsCount: models.length,
        });
        this.available = true;
      } else {
        logger.warn('Ollama available but model not found', {
          model: this.defaultModel,
          availableModels: models.map((m) => m.name),
        });
        this.available = false;
      }

      return this.available;
    } catch (error) {
      logger.warn('Failed to connect to Ollama', {
        url: this.baseUrl,
        error: (error as Error).message,
      });
      this.available = false;
      return false;
    }
  }

  /**
   * Is Ollama available for inference
   */
  isAvailable(): boolean {
    return this.available;
  }

  /**
   * Get current model name
   */
  getModelName(): string {
    return this.defaultModel;
  }

  /**
   * Get base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * List available models
   */
  async listModels(): Promise<OllamaModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as { models: OllamaModel[] };
      return data.models || [];
    } catch (error) {
      logger.error('Failed to list Ollama models', error as Error);
      return [];
    }
  }

  /**
   * Generate a completion (non-streaming)
   */
  async generate(options: OllamaGenerateOptions): Promise<OllamaResponse | null> {
    if (!this.available) {
      logger.warn('Ollama not available, skipping generation');
      return null;
    }

    const model = options.model || this.defaultModel;

    try {
      const requestBody = {
        model,
        prompt: options.prompt,
        system: options.system,
        context: options.context,
        stream: false,
        options: {
          temperature: options.options?.temperature ?? 0.7,
          top_p: options.options?.top_p ?? 0.9,
          num_predict: options.options?.num_predict ?? 512,
          stop: options.options?.stop,
        },
      };

      logger.info('Generating with Ollama', {
        model,
        promptLength: options.prompt.length,
        hasSystem: !!options.system,
      });

      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(120000), // 2 minute timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const result = (await response.json()) as OllamaResponse;

      logger.info('Ollama generation complete', {
        model: result.model,
        responseLength: result.response?.length || 0,
        evalCount: result.eval_count,
        durationMs: result.total_duration ? Math.round(result.total_duration / 1_000_000) : 0,
      });

      return result;
    } catch (error) {
      logger.error('Ollama generation failed', error as Error);
      return null;
    }
  }

  /**
   * Simple chat-style generation with system prompt
   */
  async chat(userMessage: string, systemPrompt?: string): Promise<string | null> {
    const result = await this.generate({
      prompt: userMessage,
      system:
        systemPrompt ||
        `Tu es un assistant cognitif pour YGGDRASIL, un systeme d'IA ethique et verifiable.
Tu aides a analyser, classer et valider des informations.
Reponds de maniere concise et precise en francais.`,
    });

    return result?.response || null;
  }

  /**
   * Analyze text and extract key information
   */
  async analyze(
    text: string,
    analysisType: 'classify' | 'summarize' | 'extract' | 'validate'
  ): Promise<string | null> {
    const prompts: Record<string, string> = {
      classify: `Classifie le texte suivant dans une categorie appropriee.
Reponds uniquement avec la categorie et un score de confiance (0-100).
Format: CATEGORIE: <categorie> | CONFIANCE: <score>

Texte: ${text}`,

      summarize: `Resume le texte suivant en 2-3 phrases maximum.
Garde uniquement les informations essentielles.

Texte: ${text}`,

      extract: `Extrait les entites nommees (personnes, lieux, organisations, dates) du texte suivant.
Format: TYPE: <entite> pour chaque entite trouvee.

Texte: ${text}`,

      validate: `Analyse le texte suivant et determine s'il contient des informations verifiables.
Reponds avec: VERIFIABLE: oui/non | RAISON: <explication courte>

Texte: ${text}`,
    };

    return this.chat(prompts[analysisType] || text);
  }

  /**
   * Health check - returns latency in ms or -1 if unavailable
   */
  async healthCheck(): Promise<{ available: boolean; latencyMs: number; model: string }> {
    const start = Date.now();

    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });

      const latencyMs = Date.now() - start;
      const available = response.ok;

      // Update availability status
      this.available = available;

      return {
        available,
        latencyMs,
        model: this.defaultModel,
      };
    } catch {
      return {
        available: false,
        latencyMs: -1,
        model: this.defaultModel,
      };
    }
  }
}
