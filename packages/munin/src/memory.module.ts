/**
 * Memory Module
 *
 * MUNIN - The chrono-semantic memory system of YGGDRASIL.
 * Handles storage, retrieval, and invalidation of memories with pgvector embeddings.
 *
 * Features:
 * - Memory persistence with semantic search
 * - Automatic fact extraction from conversations
 * - User verification for trust management
 * - Checkpoint and rollback capabilities
 */

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@yggdrasil/shared/database';
import { EmbeddingModule, EmbeddingService } from '@yggdrasil/shared/embedding';
import { MemoryService } from './memory.service.js';
import { CheckpointService } from './checkpoint.service.js';
import { FactExtractorService } from './fact-extractor.service.js';
import { MemoryPersistenceService } from './memory-persistence.service.js';

@Module({
  imports: [DatabaseModule, EmbeddingModule],
  providers: [MemoryService, CheckpointService, FactExtractorService, MemoryPersistenceService],
  exports: [
    MemoryService,
    CheckpointService,
    EmbeddingService,
    FactExtractorService,
    MemoryPersistenceService,
  ],
})
export class MemoryModule {}
