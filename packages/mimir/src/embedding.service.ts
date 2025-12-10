/**
 * Embedding Service for MIMIR
 *
 * Re-exports the shared EmbeddingService from @yggdrasil/shared/embedding.
 * This provides Google Gemini embeddings for semantic search of scientific sources.
 */

export {
  EmbeddingService,
  EmbeddingConfig,
  EmbeddingResult,
  EmbeddingModule,
} from '@yggdrasil/shared/embedding';
