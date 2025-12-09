/**
 * ID generation utilities for YGGDRASIL
 */

import { randomUUID } from 'crypto';

/**
 * Generate a UUID v4
 */
export function generateId(): string {
  return randomUUID();
}

/**
 * Generate a prefixed ID for easier debugging
 */
export function generatePrefixedId(prefix: string): string {
  return `${prefix}_${randomUUID().replace(/-/g, '')}`;
}

/**
 * ID prefixes for different entity types
 */
export const ID_PREFIXES = {
  REQUEST: 'req',
  RESPONSE: 'res',
  SESSION: 'ses',
  MEMORY: 'mem',
  CHECKPOINT: 'chk',
  SOURCE: 'src',
  VALIDATION: 'val',
  DELIBERATION: 'del',
  AUDIT: 'aud',
} as const;

/**
 * Generate a request ID
 */
export function generateRequestId(): string {
  return generatePrefixedId(ID_PREFIXES.REQUEST);
}

/**
 * Generate a session ID
 */
export function generateSessionId(): string {
  return generatePrefixedId(ID_PREFIXES.SESSION);
}

/**
 * Generate a memory entry ID
 */
export function generateMemoryId(): string {
  return generatePrefixedId(ID_PREFIXES.MEMORY);
}

/**
 * Generate a checkpoint ID
 */
export function generateCheckpointId(): string {
  return generatePrefixedId(ID_PREFIXES.CHECKPOINT);
}

/**
 * Validate UUID format
 */
export function isValidUuid(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

/**
 * Validate prefixed ID format
 */
export function isValidPrefixedId(id: string, prefix: string): boolean {
  const regex = new RegExp(`^${prefix}_[0-9a-f]{32}$`, 'i');
  return regex.test(id);
}
