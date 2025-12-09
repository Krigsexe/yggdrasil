/**
 * Memory (MUNIN) types for YGGDRASIL
 *
 * MUNIN handles chrono-semantic memory with full
 * checkpoint and rollback capabilities.
 */

export enum MemoryType {
  INTERACTION = 'interaction',
  DECISION = 'decision',
  CORRECTION = 'correction',
  CHECKPOINT = 'checkpoint',
  INVALIDATION = 'invalidation',
}

export interface MemoryEntry {
  id: string;
  userId: string;
  sessionId?: string;
  type: MemoryType;
  content: unknown;
  embedding?: number[];
  metadata: MemoryMetadata;
  createdAt: Date;
  updatedAt: Date;
  validUntil?: Date;
  invalidatedAt?: Date;
  invalidatedBy?: string;
  invalidationReason?: string;
}

export interface MemoryMetadata {
  tags: string[];
  importance: number;
  accessCount: number;
  lastAccessedAt?: Date;
  relatedMemories: string[];
  sourceValidationId?: string;
}

export interface MemoryDependency {
  memoryId: string;
  dependsOnId: string;
  dependencyType: 'derives_from' | 'references' | 'invalidates' | 'supersedes';
  createdAt: Date;
}

export interface Checkpoint {
  id: string;
  userId: string;
  label: string;
  description?: string;
  stateHash: string;
  memoryIds: string[];
  createdAt: Date;
  metadata: Record<string, unknown>;
}

export interface RollbackResult {
  success: boolean;
  checkpointId: string;
  invalidatedCount: number;
  restoredCount: number;
  errors?: string[];
  timestamp: Date;
}

export interface MemoryQuery {
  userId: string;
  sessionId?: string;
  types?: MemoryType[];
  tags?: string[];
  fromDate?: Date;
  toDate?: Date;
  semanticQuery?: string;
  limit?: number;
  offset?: number;
  includeInvalidated?: boolean;
}

export interface MemorySearchResult {
  memories: MemoryEntry[];
  totalCount: number;
  semanticScores?: Map<string, number>;
}

export interface MemoryConfig {
  maxEntriesPerUser: number;
  embeddingDimension: number;
  semanticSearchEnabled: boolean;
  autoCheckpointInterval: number;
  retentionDays: number;
}

export const DEFAULT_MEMORY_CONFIG: MemoryConfig = {
  maxEntriesPerUser: 100000,
  embeddingDimension: 1536,
  semanticSearchEnabled: true,
  autoCheckpointInterval: 100,
  retentionDays: 365,
};
