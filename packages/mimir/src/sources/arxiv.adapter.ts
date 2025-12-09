/**
 * arXiv Adapter
 *
 * Fetches papers from arXiv API.
 */

import { Injectable } from '@nestjs/common';
import { Source, SourceType, createLogger } from '@yggdrasil/shared';

const logger = createLogger('ArxivAdapter', 'info');

// arXiv API base URL
const ARXIV_API_URL = 'https://export.arxiv.org/api/query';

@Injectable()
export class ArxivAdapter {
  async search(query: string, maxResults = 10): Promise<Omit<Source, 'id' | 'fetchedAt' | 'branch'>[]> {
    try {
      // In a real implementation, this would call the arXiv API
      // For now, return empty array as placeholder

      logger.info('arXiv search', { query, maxResults });

      // Example of what the real implementation would return:
      // const response = await fetch(
      //   `${ARXIV_API_URL}?search_query=all:${encodeURIComponent(query)}&max_results=${maxResults}`
      // );
      // const xml = await response.text();
      // return this.parseArxivResponse(xml);

      return [];
    } catch (error) {
      logger.error('arXiv search failed', error as Error);
      return [];
    }
  }

  async getByArxivId(arxivId: string): Promise<Omit<Source, 'id' | 'fetchedAt' | 'branch'> | null> {
    try {
      logger.info('arXiv fetch by ID', { arxivId });

      // Placeholder implementation
      return null;
    } catch (error) {
      logger.error('arXiv fetch failed', error as Error);
      return null;
    }
  }

  private parseArxivResponse(_xml: string): Omit<Source, 'id' | 'fetchedAt' | 'branch'>[] {
    // Parse arXiv Atom XML response
    // This would use an XML parser to extract paper metadata

    return [];
  }

  private arxivToSource(entry: {
    id: string;
    title: string;
    authors: string[];
    abstract: string;
    published: string;
    categories: string[];
  }): Omit<Source, 'id' | 'fetchedAt' | 'branch'> {
    return {
      type: SourceType.ARXIV,
      identifier: entry.id,
      url: `https://arxiv.org/abs/${entry.id}`,
      title: entry.title,
      authors: entry.authors,
      publishedAt: new Date(entry.published),
      trustScore: 85, // arXiv is preprint, not 100%
      metadata: {
        arxivId: entry.id,
        abstract: entry.abstract,
        keywords: entry.categories,
        peerReviewed: false,
      },
    };
  }
}
