/**
 * Embedding Service for MIMIR
 *
 * Generates vector embeddings for semantic search of scientific sources.
 * Uses the same approach as MUNIN for consistency across the system.
 */

import { Injectable } from '@nestjs/common';
import { createLogger } from '@yggdrasil/shared';

const logger = createLogger('MimirEmbeddingService', 'info');

@Injectable()
export class EmbeddingService {
  private readonly dimension = 1536;

  /**
   * Generate embedding for text.
   *
   * In production, this would call an embedding model (OpenAI, Cohere, etc.)
   * For development, we generate a deterministic pseudo-embedding based on text hash.
   */
  generate(text: string): number[] {
    // Development implementation: deterministic pseudo-embedding
    // TODO: Replace with actual embedding model (OpenAI text-embedding-3-small, Cohere, etc.)

    const embedding = this.generateDeterministicEmbedding(text);

    logger.debug('Embedding generated for MIMIR source', {
      textLength: text.length,
      dimension: this.dimension,
    });

    return embedding;
  }

  /**
   * Generate embeddings for multiple texts in batch.
   */
  generateBatch(texts: string[]): number[][] {
    return texts.map((text) => this.generate(text));
  }

  /**
   * Calculate cosine similarity between two embeddings.
   * Returns a value between -1 and 1, where 1 means identical.
   */
  cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Embeddings must have same dimension');
    }

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

  /**
   * Get the embedding dimension.
   */
  getDimension(): number {
    return this.dimension;
  }

  /**
   * Generate a deterministic pseudo-embedding for development.
   * Uses a simple hash-based approach.
   *
   * NOTE: This is NOT suitable for production! It generates embeddings
   * based on character patterns, not semantic meaning.
   * For production, integrate with OpenAI, Cohere, or a local model.
   */
  private generateDeterministicEmbedding(text: string): number[] {
    const embedding: number[] = new Array<number>(this.dimension).fill(0);

    // Simple deterministic embedding based on character codes
    const normalized = text.toLowerCase().trim();

    for (let i = 0; i < normalized.length; i++) {
      const charCode = normalized.charCodeAt(i);
      const index = (charCode * (i + 1)) % this.dimension;
      embedding[index] = (embedding[index] ?? 0) + 1;
    }

    // Normalize to unit vector
    const magnitude = Math.sqrt(
      embedding.reduce((sum, val) => sum + val * val, 0)
    );

    if (magnitude > 0) {
      for (let i = 0; i < embedding.length; i++) {
        embedding[i] = (embedding[i] ?? 0) / magnitude;
      }
    }

    return embedding;
  }
}
