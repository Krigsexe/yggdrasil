/**
 * Memory Module
 */

import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service.js';
import { CheckpointService } from './checkpoint.service.js';
import { EmbeddingService } from './embedding.service.js';

@Module({
  providers: [MemoryService, CheckpointService, EmbeddingService],
  exports: [MemoryService, CheckpointService, EmbeddingService],
})
export class MemoryModule {}
