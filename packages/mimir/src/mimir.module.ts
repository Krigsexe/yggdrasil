/**
 * MIMIR Module
 *
 * The validated knowledge branch of YGGDRASIL.
 * Contains only 100% verified information with traceable sources.
 */

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@yggdrasil/shared/database';
import { SourceService } from './source.service.js';
import { QueryService } from './query.service.js';
import { EmbeddingService } from './embedding.service.js';
import { ArxivAdapter } from './sources/arxiv.adapter.js';
import { PubmedAdapter } from './sources/pubmed.adapter.js';

@Module({
  imports: [DatabaseModule],
  providers: [
    EmbeddingService,
    SourceService,
    QueryService,
    ArxivAdapter,
    PubmedAdapter,
  ],
  exports: [SourceService, QueryService, EmbeddingService],
})
export class MimirModule {}
