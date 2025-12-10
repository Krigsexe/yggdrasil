/**
 * Embedding Module for NestJS
 *
 * Provides the shared EmbeddingService for dependency injection.
 */

import { Module, Global } from '@nestjs/common';
import { EmbeddingService } from './embedding.service.js';

@Global()
@Module({
  providers: [EmbeddingService],
  exports: [EmbeddingService],
})
export class EmbeddingModule {}
