/**
 * Router Module
 */

import { Module } from '@nestjs/common';
import { RouterService } from './router.service.js';
import { ClassifierService } from './classifier.service.js';

@Module({
  providers: [RouterService, ClassifierService],
  exports: [RouterService, ClassifierService],
})
export class RouterModule {}
