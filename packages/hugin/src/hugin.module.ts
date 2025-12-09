/**
 * HUGIN Module
 */

import { Module } from '@nestjs/common';
import { WebService } from './web.service.js';
import { FilterService } from './filter.service.js';

@Module({
  providers: [WebService, FilterService],
  exports: [WebService, FilterService],
})
export class HuginModule {}
