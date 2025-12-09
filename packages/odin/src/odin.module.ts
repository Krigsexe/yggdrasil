/**
 * ODIN Module
 */

import { Module } from '@nestjs/common';
import { ValidationService } from './validation.service.js';
import { AnchoringService } from './anchoring.service.js';
import { SynthesisService } from './synthesis.service.js';

@Module({
  providers: [ValidationService, AnchoringService, SynthesisService],
  exports: [ValidationService, AnchoringService, SynthesisService],
})
export class OdinModule {}
