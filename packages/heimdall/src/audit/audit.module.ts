/**
 * Audit Module
 *
 * Complete traceability is a core pillar.
 */

import { Module, Global } from '@nestjs/common';
import { AuditService } from './audit.service.js';
import { AuditInterceptor } from './audit.interceptor.js';

@Global()
@Module({
  providers: [AuditService, AuditInterceptor],
  exports: [AuditService, AuditInterceptor],
})
export class AuditModule {}
