/**
 * Web Service
 *
 * Fetches and manages web content in HUGIN.
 * All content is marked as unverified.
 */

import { Injectable } from '@nestjs/common';
import {
  EpistemicBranch,
  Source,
  SourceType,
  createLogger,
  generateId,
} from '@yggdrasil/shared';
import { FilterService } from './filter.service.js';

const logger = createLogger('WebService', 'info');

export interface WebContent {
  id: string;
  url: string;
  title: string;
  content: string;
  fetchedAt: Date;
  trustScore: number;
  warnings: string[];
  metadata?: {
    domain: string;
    language?: string;
    author?: string;
    publishedAt?: Date;
  };
}

// In-memory store
const webContent = new Map<string, WebContent>();

@Injectable()
export class WebService {
  constructor(private readonly filterService: FilterService) {}

  async fetch(url: string): Promise<WebContent> {
    const id = generateId();

    // In a real implementation, this would:
    // 1. Fetch the URL content
    // 2. Parse and extract text
    // 3. Run through filter service

    const domain = new URL(url).hostname;
    const trustScore = this.filterService.calculateTrustScore(domain);
    const warnings = this.filterService.getWarnings(domain);

    const content: WebContent = {
      id,
      url,
      title: 'Fetched content', // Would be extracted from page
      content: '', // Would be extracted from page
      fetchedAt: new Date(),
      trustScore,
      warnings,
      metadata: { domain },
    };

    webContent.set(id, content);

    logger.info('Web content fetched', { id, url, trustScore, warningCount: warnings.length });

    return content;
  }

  async search(query: string): Promise<WebContent[]> {
    // In a real implementation, this would search the web
    // For now, search local cache
    const normalizedQuery = query.toLowerCase();

    return Array.from(webContent.values())
      .filter((c) =>
        c.title.toLowerCase().includes(normalizedQuery) ||
        c.content.toLowerCase().includes(normalizedQuery)
      )
      .sort((a, b) => b.trustScore - a.trustScore);
  }

  async toSource(content: WebContent): Promise<Omit<Source, 'id' | 'fetchedAt' | 'branch'>> {
    return {
      type: SourceType.WEB,
      identifier: content.url,
      url: content.url,
      title: content.title,
      authors: content.metadata?.author ? [content.metadata.author] : [],
      publishedAt: content.metadata?.publishedAt,
      trustScore: Math.min(content.trustScore, 49), // HUGIN max is 49
      metadata: {
        domain: content.metadata?.domain,
        warnings: content.warnings,
      },
    };
  }

  async promoteToVolva(contentId: string): Promise<{ eligible: boolean; reason?: string }> {
    const content = webContent.get(contentId);
    if (!content) {
      return { eligible: false, reason: 'Content not found' };
    }

    // Check promotion criteria
    if (content.warnings.length > 0) {
      return {
        eligible: false,
        reason: `Content has warnings: ${content.warnings.join(', ')}`,
      };
    }

    if (content.trustScore < 40) {
      return {
        eligible: false,
        reason: 'Trust score too low for VOLVA promotion',
      };
    }

    // Would need additional verification sources
    return {
      eligible: false,
      reason: 'Requires independent source verification for VOLVA promotion',
    };
  }
}
