/**
 * Audit Service
 *
 * Logs all actions for complete traceability.
 * Uses Prisma for database persistence.
 */

import { Injectable } from '@nestjs/common';
import { AuditLog, AuditAction, AuditQuery, createLogger, generateId } from '@yggdrasil/shared';
import { DatabaseService } from '@yggdrasil/shared/database';

const logger = createLogger('AuditService', 'info');

@Injectable()
export class AuditService {
  constructor(private readonly db: DatabaseService) {}

  async log(entry: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const id = generateId();
    const timestamp = new Date();

    // Store in database
    await this.db.auditLog.create({
      data: {
        id,
        action: entry.action,
        userId: entry.userId,
        resourceType: entry.resourceType,
        resourceId: entry.resourceId,
        method: entry.method,
        path: entry.path,
        statusCode: entry.statusCode,
        durationMs: entry.durationMs,
        ip: entry.ip,
        userAgent: entry.userAgent,
        metadata: (entry.metadata ?? undefined) as Parameters<typeof this.db.auditLog.create>[0]['data']['metadata'],
        createdAt: timestamp,
      },
    });

    const auditLog: AuditLog = {
      id,
      ...entry,
      timestamp,
    };

    // Also log to structured logger
    logger.info('Audit log created', {
      action: auditLog.action,
      userId: auditLog.userId,
      resourceType: auditLog.resourceType,
      resourceId: auditLog.resourceId,
      statusCode: auditLog.statusCode,
      durationMs: auditLog.durationMs,
    });

    return auditLog;
  }

  async query(query: AuditQuery): Promise<AuditLog[]> {
    const where: Record<string, unknown> = {};

    if (query.userId) {
      where['userId'] = query.userId;
    }

    if (query.actions && query.actions.length > 0) {
      where['action'] = { in: query.actions };
    }

    if (query.resourceType) {
      where['resourceType'] = query.resourceType;
    }

    if (query.resourceId) {
      where['resourceId'] = query.resourceId;
    }

    if (query.fromDate || query.toDate) {
      where['createdAt'] = {};
      if (query.fromDate) {
        (where['createdAt'] as Record<string, Date>)['gte'] = query.fromDate;
      }
      if (query.toDate) {
        (where['createdAt'] as Record<string, Date>)['lte'] = query.toDate;
      }
    }

    if (query.statusCode) {
      where['statusCode'] = query.statusCode;
    }

    const results = await this.db.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: query.offset ?? 0,
      take: query.limit ?? 100,
    });

    return results.map((row) => ({
      id: row.id,
      action: row.action as AuditAction,
      userId: row.userId ?? undefined,
      resourceType: row.resourceType,
      resourceId: row.resourceId ?? undefined,
      method: row.method,
      path: row.path,
      statusCode: row.statusCode,
      durationMs: row.durationMs,
      ip: row.ip ?? undefined,
      userAgent: row.userAgent ?? undefined,
      metadata: row.metadata as Record<string, unknown> | undefined,
      timestamp: row.createdAt,
    }));
  }

  async getById(id: string): Promise<AuditLog | undefined> {
    const row = await this.db.auditLog.findUnique({
      where: { id },
    });

    if (!row) {
      return undefined;
    }

    return {
      id: row.id,
      action: row.action as AuditAction,
      userId: row.userId ?? undefined,
      resourceType: row.resourceType,
      resourceId: row.resourceId ?? undefined,
      method: row.method,
      path: row.path,
      statusCode: row.statusCode,
      durationMs: row.durationMs,
      ip: row.ip ?? undefined,
      userAgent: row.userAgent ?? undefined,
      metadata: row.metadata as Record<string, unknown> | undefined,
      timestamp: row.createdAt,
    };
  }

  async getStats(fromDate: Date, toDate: Date) {
    // Get logs in date range
    const logsInRange = await this.db.auditLog.findMany({
      where: {
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      },
      select: {
        action: true,
        durationMs: true,
        statusCode: true,
      },
    });

    const actionCounts: Record<string, number> = {};
    let totalResponseTime = 0;
    let errorCount = 0;

    for (const log of logsInRange) {
      actionCounts[log.action] = (actionCounts[log.action] ?? 0) + 1;
      totalResponseTime += log.durationMs;
      if (log.statusCode >= 400) {
        errorCount++;
      }
    }

    return {
      totalLogs: logsInRange.length,
      actionCounts,
      averageResponseTime: logsInRange.length > 0 ? totalResponseTime / logsInRange.length : 0,
      errorRate: logsInRange.length > 0 ? errorCount / logsInRange.length : 0,
      period: { from: fromDate, to: toDate },
    };
  }

  /**
   * Delete old audit logs (retention policy)
   */
  async deleteOldLogs(retentionDays: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    const result = await this.db.auditLog.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
      },
    });

    logger.info('Deleted old audit logs', { count: result.count, retentionDays });
    return result.count;
  }
}
