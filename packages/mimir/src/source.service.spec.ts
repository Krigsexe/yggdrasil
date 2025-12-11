/**
 * Source Service Tests
 *
 * Tests for MIMIR source management with mocked dependencies.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SourceService } from './source.service.js';
import { EmbeddingService } from '@yggdrasil/shared/embedding';
import { SourceType } from '@yggdrasil/shared';

// Mock row returned by database (snake_case)
interface MockSourceRow {
  id: string;
  type: string;
  identifier: string;
  url: string;
  title: string;
  authors: string[];
  published_at: Date | null;
  fetched_at: Date;
  trust_score: number;
  branch: string;
  is_valid: boolean;
  invalidated_at: Date | null;
  doi: string | null;
  isbn: string | null;
  issn: string | null;
  arxiv_id: string | null;
  pubmed_id: string | null;
  abstract: string | null;
  keywords: string[];
  citations: number | null;
  peer_reviewed: boolean | null;
  journal: string | null;
  volume: string | null;
  issue: string | null;
  pages: string | null;
}

// Create a mock DatabaseService (extends PrismaClient, so methods are direct)
const createMockDatabaseService = () => ({
  $queryRaw: vi.fn(),
  $queryRawUnsafe: vi.fn(),
  $executeRaw: vi.fn(),
  source: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    count: vi.fn(),
    groupBy: vi.fn(),
  },
});

describe('SourceService', () => {
  let service: SourceService;
  let embeddingService: EmbeddingService;
  let mockDb: ReturnType<typeof createMockDatabaseService>;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Create mock db
    mockDb = createMockDatabaseService();

    // Create embedding service in dev mode (deterministic, no external dependencies)
    embeddingService = new EmbeddingService({ devMode: true });

    // Create service with mocked database
    service = new SourceService(mockDb as any, embeddingService);
  });

  describe('instantiation', () => {
    it('should create service instance', () => {
      expect(service).toBeDefined();
    });
  });

  describe('add', () => {
    it('should add a new source', async () => {
      const now = new Date();
      const mockSourceRow: MockSourceRow = {
        id: 'test-id-1',
        type: 'ARXIV',
        identifier: 'arxiv:2301.00001',
        url: 'https://arxiv.org/abs/2301.00001',
        title: 'Test Paper',
        authors: ['Author One', 'Author Two'],
        trust_score: 100,
        branch: 'MIMIR',
        fetched_at: now,
        published_at: null,
        is_valid: true,
        invalidated_at: null,
        doi: null,
        isbn: null,
        issn: null,
        arxiv_id: '2301.00001',
        pubmed_id: null,
        abstract: null,
        keywords: [],
        citations: null,
        peer_reviewed: null,
        journal: null,
        volume: null,
        issue: null,
        pages: null,
      };

      // Mock getByIdentifier returning null (no existing source)
      mockDb.$queryRaw.mockResolvedValueOnce([]);
      // Mock the insert returning the new source
      mockDb.$queryRaw.mockResolvedValueOnce([mockSourceRow]);

      const source = await service.add({
        type: SourceType.ARXIV,
        identifier: 'arxiv:2301.00001',
        url: 'https://arxiv.org/abs/2301.00001',
        title: 'Test Paper',
        authors: ['Author One', 'Author Two'],
        trustScore: 100,
      });

      expect(source).toBeDefined();
      expect(source.id).toBeDefined(); // ID is generated, not from mock
      expect(source.type).toBe(SourceType.ARXIV);
    });

    it('should reject sources with trustScore below 100', async () => {
      await expect(
        service.add({
          type: SourceType.ARXIV,
          identifier: 'arxiv:2301.00002',
          url: 'https://arxiv.org/abs/2301.00002',
          title: 'Untrusted Paper',
          trustScore: 90,
        })
      ).rejects.toThrow('MIMIR sources must have trust score of 100');
    });
  });

  describe('getById', () => {
    it('should retrieve a source by ID', async () => {
      const now = new Date();
      const mockSourceRow: MockSourceRow = {
        id: 'test-id-2',
        type: 'PUBMED',
        identifier: 'pmid:12345678',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12345678',
        title: 'Medical Study',
        authors: ['Dr. Research'],
        trust_score: 100,
        branch: 'MIMIR',
        fetched_at: now,
        published_at: null,
        is_valid: true,
        invalidated_at: null,
        doi: null,
        isbn: null,
        issn: null,
        arxiv_id: null,
        pubmed_id: '12345678',
        abstract: null,
        keywords: [],
        citations: null,
        peer_reviewed: null,
        journal: null,
        volume: null,
        issue: null,
        pages: null,
      };

      mockDb.$queryRaw.mockResolvedValue([mockSourceRow]);

      const found = await service.getById('test-id-2');

      expect(found).toBeDefined();
      expect(found.id).toBe('test-id-2');
    });

    it('should throw NotFoundError for non-existent ID', async () => {
      mockDb.$queryRaw.mockResolvedValue([]);

      await expect(service.getById('non-existent-id')).rejects.toThrow(
        'Source not found: non-existent-id'
      );
    });
  });

  describe('search', () => {
    it('should search sources by query', async () => {
      const now = new Date();
      const mockSourceRow: MockSourceRow = {
        id: 'test-id-3',
        type: 'ARXIV',
        identifier: 'arxiv:quantum-1',
        url: 'https://arxiv.org/abs/quantum-1',
        title: 'Quantum Computing Advances',
        authors: ['Quantum Researcher'],
        trust_score: 100,
        branch: 'MIMIR',
        fetched_at: now,
        published_at: null,
        is_valid: true,
        invalidated_at: null,
        doi: null,
        isbn: null,
        issn: null,
        arxiv_id: 'quantum-1',
        pubmed_id: null,
        abstract: null,
        keywords: [],
        citations: null,
        peer_reviewed: null,
        journal: null,
        volume: null,
        issue: null,
        pages: null,
      };

      mockDb.$queryRawUnsafe.mockResolvedValue([mockSourceRow]);

      const results = await service.search('quantum');

      expect(results.length).toBe(1);
      expect(results[0]?.title).toContain('Quantum');
    });

    it('should return empty array when no results', async () => {
      mockDb.$queryRawUnsafe.mockResolvedValue([]);

      const results = await service.search('nonexistent-topic');

      expect(results).toEqual([]);
    });
  });

  describe('getStats', () => {
    it('should return statistics about sources', async () => {
      // Mock count query
      mockDb.$queryRaw.mockResolvedValueOnce([{ count: BigInt(5) }]);
      // Mock group by query
      mockDb.$queryRaw.mockResolvedValueOnce([
        { type: 'ARXIV', count: BigInt(3) },
        { type: 'PUBMED', count: BigInt(2) },
      ]);

      const stats = await service.getStats();

      expect(stats).toBeDefined();
      expect(stats.totalSources).toBe(5);
      expect(stats.byType.ARXIV).toBe(3);
      expect(stats.byType.PUBMED).toBe(2);
    });
  });

  describe('getByIdentifier', () => {
    it('should find source by type and identifier', async () => {
      const now = new Date();
      const mockSourceRow: MockSourceRow = {
        id: 'test-id-4',
        type: 'ARXIV',
        identifier: 'arxiv:2301.00001',
        url: 'https://arxiv.org/abs/2301.00001',
        title: 'Test Paper',
        authors: [],
        trust_score: 100,
        branch: 'MIMIR',
        fetched_at: now,
        published_at: null,
        is_valid: true,
        invalidated_at: null,
        doi: null,
        isbn: null,
        issn: null,
        arxiv_id: '2301.00001',
        pubmed_id: null,
        abstract: null,
        keywords: [],
        citations: null,
        peer_reviewed: null,
        journal: null,
        volume: null,
        issue: null,
        pages: null,
      };

      mockDb.$queryRaw.mockResolvedValue([mockSourceRow]);

      const found = await service.getByIdentifier(SourceType.ARXIV, 'arxiv:2301.00001');

      expect(found).toBeDefined();
      expect(found?.identifier).toBe('arxiv:2301.00001');
    });

    it('should return null if not found', async () => {
      mockDb.$queryRaw.mockResolvedValue([]);

      const found = await service.getByIdentifier(SourceType.ARXIV, 'nonexistent');

      expect(found).toBeNull();
    });
  });

  describe('validate', () => {
    it('should validate a source exists and is trustworthy', async () => {
      const now = new Date();
      const mockSourceRow: MockSourceRow = {
        id: 'test-id-5',
        type: 'ARXIV',
        identifier: 'arxiv:test',
        url: 'https://arxiv.org/abs/test',
        title: 'Test',
        authors: [],
        trust_score: 100,
        branch: 'MIMIR',
        fetched_at: now,
        published_at: null,
        is_valid: true,
        invalidated_at: null,
        doi: null,
        isbn: null,
        issn: null,
        arxiv_id: null,
        pubmed_id: null,
        abstract: null,
        keywords: [],
        citations: null,
        peer_reviewed: null,
        journal: null,
        volume: null,
        issue: null,
        pages: null,
      };

      mockDb.$queryRaw.mockResolvedValue([mockSourceRow]);

      const isValid = await service.validate('test-id-5');

      expect(isValid).toBe(true);
    });

    it('should return true for any existing source (stub implementation)', async () => {
      // NOTE: Current implementation is a stub that always returns true
      // In a full implementation, this would re-fetch and verify the source
      const now = new Date();
      const mockSourceRow: MockSourceRow = {
        id: 'test-id-6',
        type: 'ARXIV',
        identifier: 'arxiv:test',
        url: 'https://arxiv.org/abs/test',
        title: 'Test',
        authors: [],
        trust_score: 100,
        branch: 'MIMIR',
        fetched_at: now,
        published_at: null,
        is_valid: false, // Even with is_valid=false, stub returns true
        invalidated_at: now,
        doi: null,
        isbn: null,
        issn: null,
        arxiv_id: null,
        pubmed_id: null,
        abstract: null,
        keywords: [],
        citations: null,
        peer_reviewed: null,
        journal: null,
        volume: null,
        issue: null,
        pages: null,
      };

      mockDb.$queryRaw.mockResolvedValue([mockSourceRow]);

      const isValid = await service.validate('test-id-6');

      // Stub always returns true - will be updated when full validation is implemented
      expect(isValid).toBe(true);
    });
  });
});
