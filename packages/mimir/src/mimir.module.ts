/**
 * MIMIR Module
 */

import { Module } from '@nestjs/common';
import { SourceService } from './source.service.js';
import { QueryService } from './query.service.js';
import { ArxivAdapter } from './sources/arxiv.adapter.js';
import { PubmedAdapter } from './sources/pubmed.adapter.js';

@Module({
  providers: [SourceService, QueryService, ArxivAdapter, PubmedAdapter],
  exports: [SourceService, QueryService],
})
export class MimirModule {}
