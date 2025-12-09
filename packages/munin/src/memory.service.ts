/**
 * Memory Service
 *
 * Handles storage and retrieval of chrono-semantic memories.
 */

import { Injectable } from '@nestjs/common';
import {
  MemoryEntry,
  MemoryType,
  MemoryQuery,
  MemorySearchResult,
  createLogger,
  generateMemoryId,
  NotFoundError,
} from '@yggdrasil/shared';
import { EmbeddingService } from './embedding.service.js';

const logger = createLogger('MemoryService', 'info');

// In-memory store for development
// TODO: Replace with Prisma when database is set up
const memories = new Map<string, MemoryEntry>();

@Injectable()
export class MemoryService {
  constructor(private readonly embeddingService: EmbeddingService) {}

  async create(
    userId: string,
    type: MemoryType,
    content: unknown,
    options?: {
      sessionId?: string;
      tags?: string[];
      importance?: number;
    }
  ): Promise<MemoryEntry> {
    const id = generateMemoryId();
    const now = new Date();

    // Generate embedding for semantic search
    const contentString = typeof content === 'string'
      ? content
      : JSON.stringify(content);
    const embedding = await this.embeddingService.generate(contentString);

    const entry: MemoryEntry = {
      id,
      userId,
      sessionId: options?.sessionId,
      type,
      content,
      embedding,
      metadata: {
        tags: options?.tags ?? [],
        importance: options?.importance ?? 50,
        accessCount: 0,
        relatedMemories: [],
      },
      createdAt: now,
      updatedAt: now,
    };

    memories.set(id, entry);

    logger.info('Memory created', { id, userId, type });

    return entry;
  }

  async getById(id: string): Promise<MemoryEntry> {
    const memory = memories.get(id);
    if (!memory) {
      throw new NotFoundError('Memory', id);
    }

    // Update access count
    memory.metadata.accessCount++;
    memory.metadata.lastAccessedAt = new Date();

    return memory;
  }

  async query(query: MemoryQuery): Promise<MemorySearchResult> {
    let results = Array.from(memories.values());

    // Filter by userId
    results = results.filter((m) => m.userId === query.userId);

    // Filter by sessionId
    if (query.sessionId) {
      results = results.filter((m) => m.sessionId === query.sessionId);
    }

    // Filter by types
    if (query.types && query.types.length > 0) {
      results = results.filter((m) => query.types?.includes(m.type));
    }

    // Filter by tags
    if (query.tags && query.tags.length > 0) {
      results = results.filter((m) =>
        query.tags?.some((tag) => m.metadata.tags.includes(tag))
      );
    }

    // Filter by date range
    if (query.fromDate) {
      results = results.filter((m) => m.createdAt >= query.fromDate!);
    }
    if (query.toDate) {
      results = results.filter((m) => m.createdAt <= query.toDate!);
    }

    // Filter invalidated
    if (!query.includeInvalidated) {
      results = results.filter((m) => !m.invalidatedAt);
    }

    // Semantic search if query provided
    let semanticScores: Map<string, number> | undefined;
    if (query.semanticQuery) {
      const queryEmbedding = await this.embeddingService.generate(query.semanticQuery);
      semanticScores = new Map();

      for (const memory of results) {
        if (memory.embedding) {
          const score = this.cosineSimilarity(queryEmbedding, memory.embedding);
          semanticScores.set(memory.id, score);
        }
      }

      // Sort by semantic similarity
      results.sort((a, b) => {
        const scoreA = semanticScores?.get(a.id) ?? 0;
        const scoreB = semanticScores?.get(b.id) ?? 0;
        return scoreB - scoreA;
      });
    } else {
      // Sort by creation date descending
      results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    const totalCount = results.length;

    // Apply pagination
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 100;
    results = results.slice(offset, offset + limit);

    return {
      memories: results,
      totalCount,
      semanticScores,
    };
  }

  async invalidate(
    id: string,
    invalidatedBy: string,
    reason: string
  ): Promise<void> {
    const memory = await this.getById(id);
    memory.invalidatedAt = new Date();
    memory.invalidatedBy = invalidatedBy;
    memory.invalidationReason = reason;

    logger.info('Memory invalidated', { id, invalidatedBy, reason });
  }

  async getRelated(id: string, limit = 10): Promise<MemoryEntry[]> {
    const memory = await this.getById(id);
    if (!memory.embedding) {
      return [];
    }

    const allMemories = Array.from(memories.values()).filter(
      (m) => m.id !== id && m.userId === memory.userId && !m.invalidatedAt && m.embedding
    );

    // Calculate similarity scores
    const scored = allMemories.map((m) => ({
      memory: m,
      score: this.cosineSimilarity(memory.embedding!, m.embedding!),
    }));

    // Sort by similarity and return top N
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((s) => s.memory);
  }

  async getUserMemoryCount(userId: string): Promise<number> {
    return Array.from(memories.values()).filter(
      (m) => m.userId === userId && !m.invalidatedAt
    ).length;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += (a[i] ?? 0) * (b[i] ?? 0);
      normA += (a[i] ?? 0) ** 2;
      normB += (b[i] ?? 0) ** 2;
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }
}
