# @yggdrasil/mimir

MIMIR - The Validated Knowledge Branch of YGGDRASIL

Named after the well of wisdom where Odin sacrificed his eye for knowledge, MIMIR contains only 100% verified information with traceable sources.

## Overview

MIMIR is the epistemic branch of YGGDRASIL dedicated to **verified knowledge**. All sources stored in MIMIR must have a trust score of 100% - no probabilistic information is allowed.

### Key Principles

- **100% Confidence Only**: Sources must be fully verified (trust score = 100)
- **Traceable Sources**: Every fact is linked to peer-reviewed or authoritative sources
- **No Contamination**: MIMIR never mixes with unverified data (HUGIN) or hypotheses (VOLVA)
- **Semantic Search**: pgvector embeddings enable intelligent retrieval

## Architecture

```
MIMIR/
├── src/
│   ├── source.service.ts      # Source CRUD with PostgreSQL + pgvector
│   ├── query.service.ts       # Query interface for MIMIR
│   ├── embedding.service.ts   # Vector embedding generation
│   ├── mimir.module.ts        # NestJS module definition
│   ├── index.ts               # Public exports
│   └── sources/
│       ├── arxiv.adapter.ts   # arXiv API integration
│       └── pubmed.adapter.ts  # PubMed API integration
└── test/
    └── source.service.e2e.ts  # E2E tests with real PostgreSQL
```

## Eligible Source Types

Only the following source types can be stored in MIMIR:

| Type       | Description                | Example                |
| ---------- | -------------------------- | ---------------------- |
| `ARXIV`    | arXiv preprints            | arxiv:2301.00001       |
| `PUBMED`   | PubMed medical literature  | PMID:12345678          |
| `ISO`      | ISO standards              | ISO-9001               |
| `RFC`      | IETF RFCs                  | RFC-7231               |
| `WIKIDATA` | Wikidata verified entities | Q42                    |
| `BOOK`     | Published books with ISBN  | ISBN-978-3-16-148410-0 |
| `JOURNAL`  | Peer-reviewed journals     | DOI:10.1000/xyz123     |

**Not eligible**: `WEB`, `OTHER` (these belong to HUGIN or VOLVA)

## Services

### SourceService

Manages scientific sources with PostgreSQL persistence and pgvector embeddings.

```typescript
import { SourceService } from '@yggdrasil/mimir';

// Add a source
const source = await sourceService.add({
  type: SourceType.ARXIV,
  identifier: 'arxiv:2312.00001',
  url: 'https://arxiv.org/abs/2312.00001',
  title: 'Neural Networks for Climate Modeling',
  authors: ['Author A', 'Author B'],
  trustScore: 100,
  metadata: {
    arxivId: '2312.00001',
    abstract: 'A novel approach to climate modeling...',
    keywords: ['neural networks', 'climate'],
  },
});

// Get by ID
const found = await sourceService.getById(source.id);

// Search by text
const results = await sourceService.search('neural networks');

// Semantic search using embeddings
const semanticResults = await sourceService.semanticSearch('machine learning climate', {
  limit: 10,
  minSimilarity: 0.7,
});

// Get statistics
const stats = await sourceService.getStats();
// { totalSources: 42, byType: { ARXIV: 30, PUBMED: 12 } }
```

### QueryService

High-level query interface that searches local sources and fetches from external APIs.

```typescript
import { QueryService } from '@yggdrasil/mimir';

// Query MIMIR
const result = await queryService.query('quantum computing advances');
// Returns: { query, sources, confidence: 100 | 0, answer?, trace }

// Verify a statement
const verification = await queryService.verifyStatement('Water boils at 100C at sea level');
// Returns: { verified, confidence, supportingSources, contradictingSources }
```

### EmbeddingService

Generates 1536-dimensional vector embeddings for semantic search.

```typescript
import { EmbeddingService } from '@yggdrasil/mimir';

const embedding = embeddingService.generate('quantum entanglement');
// Returns: number[] (1536 dimensions)

const similarity = embeddingService.cosineSimilarity(embeddingA, embeddingB);
// Returns: number between -1 and 1
```

## Database Schema

MIMIR uses PostgreSQL with pgvector extension:

```sql
CREATE TABLE sources (
  id                   TEXT PRIMARY KEY,
  type                 "SourceType" NOT NULL,
  identifier           TEXT NOT NULL,
  url                  TEXT NOT NULL,
  title                TEXT NOT NULL,
  authors              TEXT[],
  published_at         TIMESTAMP,
  fetched_at           TIMESTAMP NOT NULL DEFAULT NOW(),
  trust_score          INTEGER NOT NULL,
  branch               "EpistemicBranch" NOT NULL,
  is_valid             BOOLEAN NOT NULL DEFAULT true,
  invalidated_at       TIMESTAMP,
  doi                  TEXT,
  isbn                 TEXT,
  issn                 TEXT,
  arxiv_id             TEXT,
  pubmed_id            TEXT,
  abstract             TEXT,
  keywords             TEXT[],
  citations            INTEGER,
  peer_reviewed        BOOLEAN,
  journal              TEXT,
  volume               TEXT,
  issue                TEXT,
  pages                TEXT,
  embedding            VECTOR(1536),
  embedding_updated_at TIMESTAMP,

  CONSTRAINT sources_type_identifier_key UNIQUE (type, identifier)
);

-- Indexes for performance
CREATE INDEX sources_type_idx ON sources(type);
CREATE INDEX sources_branch_trust_score_idx ON sources(branch, trust_score);
CREATE INDEX sources_arxiv_id_idx ON sources(arxiv_id);
CREATE INDEX sources_pubmed_id_idx ON sources(pubmed_id);
```

## Security

### SQL Injection Prevention

- All queries use Prisma's `$queryRaw` with template literals (auto-parameterized)
- `$queryRawUnsafe` uses positional parameters ($1, $2, etc.)
- No string concatenation in SQL queries

### Input Validation

- `isMimirEligible()` validates source type eligibility
- Trust score must be exactly 100 (enforced in code)
- Duplicate detection via unique constraint on (type, identifier)

### Soft Delete

Sources are invalidated (soft delete) rather than hard deleted:

```typescript
await sourceService.invalidate(sourceId, 'Retracted by publisher');
```

## Testing

### Unit Tests

```bash
pnpm --filter @yggdrasil/mimir test
```

12 unit tests with mocked DatabaseService.

### E2E Tests

```bash
pnpm --filter @yggdrasil/mimir test:e2e
```

11 E2E tests with real PostgreSQL:

- Persistence verification
- Duplicate handling
- Search functionality
- Semantic search with pgvector
- Source invalidation

## Scripts

```bash
# Build
pnpm --filter @yggdrasil/mimir build

# Development watch mode
pnpm --filter @yggdrasil/mimir dev

# Unit tests
pnpm --filter @yggdrasil/mimir test

# E2E tests (requires PostgreSQL)
pnpm --filter @yggdrasil/mimir test:e2e

# Type checking
pnpm --filter @yggdrasil/mimir typecheck

# Linting
pnpm --filter @yggdrasil/mimir lint
```

## Dependencies

```json
{
  "dependencies": {
    "@nestjs/common": "^10.3.0",
    "@yggdrasil/shared": "workspace:*",
    "@prisma/client": "^5.7.0"
  }
}
```

## Integration with YGGDRASIL

MIMIR integrates with other YGGDRASIL components:

```
Query -> RATATOSK (routing) -> MIMIR (if factual query)
                            -> VOLVA (if hypothesis)
                            -> HUGIN (if web search)

MIMIR sources -> ODIN (validation) -> Response to user
```

### THING Council Usage

When the THING Council needs verified facts:

1. KVASIR queries MIMIR for peer-reviewed sources
2. LOKI challenges claims against MIMIR evidence
3. TYR uses MIMIR sources for final arbitration

## Roadmap

- [ ] Real embedding model integration (OpenAI/Cohere)
- [ ] Semantic indexing with HNSW algorithm
- [ ] Citation graph analysis
- [ ] Source freshness monitoring
- [ ] Automated source validation via re-fetch

## License

MIT License - See LICENSE in repository root.

---

_"The well of MIMIR contains all wisdom. Odin sacrificed his eye to drink from it."_
