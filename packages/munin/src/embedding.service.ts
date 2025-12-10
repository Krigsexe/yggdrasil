/**
 * Embedding Service for MUNIN
 *
 * Re-exports the shared EmbeddingService from @yggdrasil/shared/embedding.
 * This provides Google Gemini embeddings for semantic memory search.
 */

export {
  EmbeddingService,
  EmbeddingConfig,
  EmbeddingResult,
  EmbeddingModule,
} from '@yggdrasil/shared/embedding';
