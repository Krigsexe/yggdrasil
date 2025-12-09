/**
 * THING Module
 */

import { Module } from '@nestjs/common';
import { CouncilService } from './council.service.js';
import { VotingService } from './voting.service.js';
import { KvasirAdapter } from './members/kvasir.adapter.js';
import { SagaAdapter } from './members/saga.adapter.js';
import { LokiAdapter } from './members/loki.adapter.js';

@Module({
  providers: [
    CouncilService,
    VotingService,
    KvasirAdapter,
    SagaAdapter,
    LokiAdapter,
  ],
  exports: [CouncilService, VotingService],
})
export class ThingModule {}
