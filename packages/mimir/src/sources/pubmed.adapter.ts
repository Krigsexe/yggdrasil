/**
 * PubMed Adapter
 *
 * Fetches papers from PubMed/NCBI API.
 */

import { Injectable } from '@nestjs/common';
import { Source, SourceType, createLogger } from '@yggdrasil/shared';

const logger = createLogger('PubmedAdapter', 'info');

// PubMed API base URL
const PUBMED_API_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

@Injectable()
export class PubmedAdapter {
  async search(query: string, maxResults = 10): Promise<Omit<Source, 'id' | 'fetchedAt' | 'branch'>[]> {
    try {
      logger.info('PubMed search', { query, maxResults });

      // In a real implementation, this would:
      // 1. Call esearch to get PMIDs
      // 2. Call efetch to get paper details
      // For now, return empty array as placeholder

      return [];
    } catch (error) {
      logger.error('PubMed search failed', error as Error);
      return [];
    }
  }

  async getByPmid(pmid: string): Promise<Omit<Source, 'id' | 'fetchedAt' | 'branch'> | null> {
    try {
      logger.info('PubMed fetch by PMID', { pmid });

      // Placeholder implementation
      return null;
    } catch (error) {
      logger.error('PubMed fetch failed', error as Error);
      return null;
    }
  }

  async getByDoi(doi: string): Promise<Omit<Source, 'id' | 'fetchedAt' | 'branch'> | null> {
    try {
      logger.info('PubMed fetch by DOI', { doi });

      // Placeholder implementation
      return null;
    } catch (error) {
      logger.error('PubMed fetch failed', error as Error);
      return null;
    }
  }

  private pubmedToSource(article: {
    pmid: string;
    title: string;
    authors: string[];
    abstract: string;
    journal: string;
    pubDate: string;
    doi?: string;
  }): Omit<Source, 'id' | 'fetchedAt' | 'branch'> {
    return {
      type: SourceType.PUBMED,
      identifier: article.pmid,
      url: `https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/`,
      title: article.title,
      authors: article.authors,
      publishedAt: new Date(article.pubDate),
      trustScore: 100, // PubMed is peer-reviewed
      metadata: {
        pubmedId: article.pmid,
        doi: article.doi,
        abstract: article.abstract,
        journal: article.journal,
        peerReviewed: true,
      },
    };
  }
}
