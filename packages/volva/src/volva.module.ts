/**
 * VOLVA Module
 */

import { Module } from '@nestjs/common';
import { HypothesisService } from './hypothesis.service.js';

@Module({
  providers: [HypothesisService],
  exports: [HypothesisService],
})
export class VolvaModule {}
