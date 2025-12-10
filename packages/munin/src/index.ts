/**
 * MUNIN - Memory Component
 *
 * Chrono-semantic memory system with checkpoint and rollback capabilities.
 * Named after Odin's raven who represents memory.
 *
 * Features:
 * - Memory persistence with pgvector semantic search
 * - Fact extraction from conversations
 * - User verification levels for trust management
 * - Cascade invalidation
 */

export * from './memory.module.js';
export * from './memory.service.js';
export * from './checkpoint.service.js';
export * from './embedding.service.js';
export * from './fact-extractor.service.js';
export * from './memory-persistence.service.js';
