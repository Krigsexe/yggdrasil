/**
 * Audit types for YGGDRASIL
 *
 * Complete traceability is a core pillar.
 * Every action is logged and auditable.
 */

export enum AuditAction {
  // Auth actions
  LOGIN = 'auth.login',
  LOGOUT = 'auth.logout',
  REGISTER = 'auth.register',
  TOKEN_REFRESH = 'auth.token_refresh',
  PASSWORD_CHANGE = 'auth.password_change',

  // Query actions
  QUERY_SUBMIT = 'query.submit',
  QUERY_COMPLETE = 'query.complete',
  QUERY_FAIL = 'query.fail',

  // Validation actions
  VALIDATION_START = 'validation.start',
  VALIDATION_PASS = 'validation.pass',
  VALIDATION_FAIL = 'validation.fail',

  // Memory actions
  MEMORY_CREATE = 'memory.create',
  MEMORY_UPDATE = 'memory.update',
  MEMORY_DELETE = 'memory.delete',
  MEMORY_INVALIDATE = 'memory.invalidate',
  CHECKPOINT_CREATE = 'memory.checkpoint_create',
  ROLLBACK = 'memory.rollback',

  // Source actions
  SOURCE_ADD = 'source.add',
  SOURCE_VALIDATE = 'source.validate',
  SOURCE_INVALIDATE = 'source.invalidate',

  // Admin actions
  USER_CREATE = 'admin.user_create',
  USER_UPDATE = 'admin.user_update',
  USER_DELETE = 'admin.user_delete',
  CONFIG_UPDATE = 'admin.config_update',
}

export interface AuditLog {
  id: string;
  action: AuditAction;
  userId?: string;
  resourceType: string;
  resourceId?: string;
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export interface AuditQuery {
  userId?: string;
  actions?: AuditAction[];
  resourceType?: string;
  resourceId?: string;
  fromDate?: Date;
  toDate?: Date;
  statusCode?: number;
  limit?: number;
  offset?: number;
}

export interface AuditStats {
  totalLogs: number;
  actionCounts: Record<AuditAction, number>;
  averageResponseTime: number;
  errorRate: number;
  period: {
    from: Date;
    to: Date;
  };
}
