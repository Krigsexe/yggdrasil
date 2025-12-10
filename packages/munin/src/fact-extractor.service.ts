/**
 * Fact Extractor Service
 *
 * Extracts important facts from conversation messages and persists them in MUNIN.
 * Only verified users can have their stated facts persisted.
 *
 * Examples of extractable facts:
 * - Identity statements: "Je suis Julien, ton créateur"
 * - Relationship declarations: "Tu es relié à Yggdrasil"
 * - Context information: Documentation, preferences, goals
 */

import { Injectable } from '@nestjs/common';
import { createLogger } from '@yggdrasil/shared';

const logger = createLogger('FactExtractor', 'info');

export enum FactType {
  IDENTITY = 'IDENTITY',           // Who the user is
  RELATIONSHIP = 'RELATIONSHIP',   // How user relates to system
  PREFERENCE = 'PREFERENCE',       // User preferences
  CONTEXT = 'CONTEXT',             // Background information
  GOAL = 'GOAL',                   // User objectives
  INSTRUCTION = 'INSTRUCTION',     // Direct instructions to remember
}

export interface ExtractedFact {
  type: FactType;
  content: string;
  confidence: number;      // 0-100
  keywords: string[];
  requiresVerification: boolean;
}

// Patterns for fact extraction
const FACT_PATTERNS: Array<{
  pattern: RegExp;
  type: FactType;
  confidence: number;
  requiresVerification: boolean;
}> = [
  // Identity patterns (French & English)
  {
    pattern: /(?:je\s+(?:suis|m'appelle)|my\s+name\s+is|i\s+am)\s+([^.,!?]+)/i,
    type: FactType.IDENTITY,
    confidence: 90,
    requiresVerification: true,
  },
  {
    pattern: /(?:je\s+suis\s+(?:ton|votre)\s+créateur|i\s+(?:am|'m)\s+your\s+creator)/i,
    type: FactType.IDENTITY,
    confidence: 95,
    requiresVerification: true,
  },
  {
    pattern: /(?:appelle[s]?[\s-]moi|call\s+me)\s+([^.,!?]+)/i,
    type: FactType.IDENTITY,
    confidence: 85,
    requiresVerification: false,
  },

  // Relationship patterns
  {
    pattern: /(?:tu\s+es\s+(?:maintenant\s+)?(?:relié|connecté)\s+à|you\s+are\s+(?:now\s+)?connected\s+to)\s+([^.,!?]+)/i,
    type: FactType.RELATIONSHIP,
    confidence: 80,
    requiresVerification: true,
  },

  // Instruction patterns
  {
    pattern: /(?:souviens[\s-]toi\s+(?:que|de)|remember\s+(?:that|to))\s+([^.,!?]+)/i,
    type: FactType.INSTRUCTION,
    confidence: 95,
    requiresVerification: false,
  },
  {
    pattern: /(?:n'oublie\s+(?:pas|jamais)|don't\s+forget)\s+([^.,!?]+)/i,
    type: FactType.INSTRUCTION,
    confidence: 95,
    requiresVerification: false,
  },
  {
    pattern: /(?:retiens\s+(?:que|bien)|keep\s+in\s+mind)\s+([^.,!?]+)/i,
    type: FactType.INSTRUCTION,
    confidence: 90,
    requiresVerification: false,
  },

  // Goal patterns
  {
    pattern: /(?:je\s+(?:veux|souhaite|cherche\s+à)|i\s+want\s+to|my\s+goal\s+is)\s+([^.,!?]+)/i,
    type: FactType.GOAL,
    confidence: 85,
    requiresVerification: false,
  },
  {
    pattern: /(?:l'(?:idée|objectif)\s+est\s+de|the\s+(?:idea|goal)\s+is\s+to)\s+([^.,!?]+)/i,
    type: FactType.GOAL,
    confidence: 90,
    requiresVerification: false,
  },

  // Preference patterns
  {
    pattern: /(?:je\s+préfère|i\s+prefer)\s+([^.,!?]+)/i,
    type: FactType.PREFERENCE,
    confidence: 80,
    requiresVerification: false,
  },

  // Context patterns (documentation, code, etc.)
  {
    pattern: /(?:voici\s+(?:la\s+)?(?:documentation|doc)|here\s+is\s+the\s+(?:documentation|doc))/i,
    type: FactType.CONTEXT,
    confidence: 100,
    requiresVerification: false,
  },
  {
    pattern: /(?:tu\s+as\s+(?:tous?\s+)?(?:les?\s+)?(?:renseignements?|informations?)|you\s+have\s+(?:all\s+)?the\s+info)/i,
    type: FactType.CONTEXT,
    confidence: 85,
    requiresVerification: false,
  },
];

@Injectable()
export class FactExtractorService {
  /**
   * Extract facts from a message
   */
  extract(message: string): ExtractedFact[] {
    const facts: ExtractedFact[] = [];

    for (const { pattern, type, confidence, requiresVerification } of FACT_PATTERNS) {
      const match = message.match(pattern);
      if (match) {
        const content = match[1]?.trim() || match[0].trim();

        facts.push({
          type,
          content,
          confidence,
          keywords: this.extractKeywords(content),
          requiresVerification,
        });

        logger.debug('Fact extracted', { type, confidence, content: content.substring(0, 50) });
      }
    }

    // Check for large context blocks (documentation)
    if (this.isLargeContextBlock(message)) {
      facts.push({
        type: FactType.CONTEXT,
        content: message,
        confidence: 100,
        keywords: this.extractKeywords(message),
        requiresVerification: false,
      });
    }

    return facts;
  }

  /**
   * Check if message is a large context block (documentation, code, etc.)
   */
  private isLargeContextBlock(message: string): boolean {
    const lines = message.split('\n').length;
    const hasMarkdown = /^#+\s|```|^\s*[-*]\s|\|.*\|/m.test(message);

    return lines > 20 && hasMarkdown;
  }

  /**
   * Extract keywords from content for semantic indexing
   */
  private extractKeywords(content: string): string[] {
    const stopWords = new Set([
      'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'à', 'au', 'aux',
      'et', 'ou', 'mais', 'donc', 'car', 'ni', 'que', 'qui', 'quoi',
      'ce', 'cet', 'cette', 'ces', 'mon', 'ton', 'son', 'notre', 'votre',
      'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'on',
      'est', 'sont', 'suis', 'es', 'sommes', 'êtes', 'être', 'avoir',
      'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
      'should', 'may', 'might', 'must', 'can', 'to', 'of', 'in', 'for',
      'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
      'before', 'after', 'above', 'below', 'between', 'under', 'again',
      'and', 'but', 'or', 'nor', 'so', 'yet', 'both', 'either', 'neither',
      'not', 'only', 'own', 'same', 'than', 'too', 'very', 'just',
    ]);

    return content
      .toLowerCase()
      .replace(/[^a-zàâäéèêëïîôùûüç\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 20); // Limit to 20 keywords
  }
}
