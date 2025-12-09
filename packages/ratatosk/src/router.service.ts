/**
 * Router Service
 *
 * Routes requests to the appropriate epistemic branch.
 */

import { Injectable } from '@nestjs/common';
import {
  EpistemicBranch,
  CouncilMember,
  createLogger,
} from '@yggdrasil/shared';
import { ClassifierService, QueryClassification } from './classifier.service.js';

const logger = createLogger('RouterService', 'info');

export interface RouteDecision {
  primaryBranch: EpistemicBranch;
  secondaryBranches: EpistemicBranch[];
  councilMembers: CouncilMember[];
  complexity: 'simple' | 'moderate' | 'complex';
  requiresDeliberation: boolean;
  estimatedTokens: number;
}

@Injectable()
export class RouterService {
  constructor(private readonly classifier: ClassifierService) {}

  async route(query: string, context?: Record<string, unknown>): Promise<RouteDecision> {
    const classification = await this.classifier.classify(query);

    const primaryBranch = this.determinePrimaryBranch(classification);
    const secondaryBranches = this.determineSecondaryBranches(classification, primaryBranch);
    const councilMembers = this.determineCouncilMembers(classification);
    const complexity = this.determineComplexity(classification);
    const requiresDeliberation = this.requiresDeliberation(classification);
    const estimatedTokens = this.estimateTokens(classification);

    const decision: RouteDecision = {
      primaryBranch,
      secondaryBranches,
      councilMembers,
      complexity,
      requiresDeliberation,
      estimatedTokens,
    };

    logger.info('Route decision made', {
      queryLength: query.length,
      primaryBranch,
      complexity,
      requiresDeliberation,
    });

    return decision;
  }

  private determinePrimaryBranch(classification: QueryClassification): EpistemicBranch {
    // Factual queries requiring verified sources go to MIMIR
    if (classification.type === 'factual' && classification.requiresVerification) {
      return EpistemicBranch.MIMIR;
    }

    // Research and theoretical queries go to VOLVA
    if (classification.type === 'research' || classification.type === 'theoretical') {
      return EpistemicBranch.VOLVA;
    }

    // Current events and real-time info go to HUGIN
    if (classification.type === 'current_events' || classification.requiresRealtime) {
      return EpistemicBranch.HUGIN;
    }

    // Default to MIMIR for verified information
    return EpistemicBranch.MIMIR;
  }

  private determineSecondaryBranches(
    classification: QueryClassification,
    primary: EpistemicBranch
  ): EpistemicBranch[] {
    const secondary: EpistemicBranch[] = [];

    // Complex queries may need multiple branches
    if (classification.complexity === 'complex') {
      if (primary !== EpistemicBranch.MIMIR) {
        secondary.push(EpistemicBranch.MIMIR);
      }
      if (primary !== EpistemicBranch.VOLVA && classification.type === 'research') {
        secondary.push(EpistemicBranch.VOLVA);
      }
    }

    return secondary;
  }

  private determineCouncilMembers(classification: QueryClassification): CouncilMember[] {
    const members: CouncilMember[] = [CouncilMember.KVASIR]; // Always include KVASIR for reasoning

    // Add specialists based on query type
    if (classification.domain === 'mathematics' || classification.domain === 'logic') {
      members.push(CouncilMember.NORNES);
    }

    if (classification.domain === 'creative' || classification.type === 'creative') {
      members.push(CouncilMember.BRAGI);
    }

    if (classification.domain === 'history' || classification.domain === 'general') {
      members.push(CouncilMember.SAGA);
    }

    // Always add LOKI for critique on complex queries
    if (classification.complexity === 'complex') {
      members.push(CouncilMember.LOKI);
    }

    // Always add TYR for arbitration
    members.push(CouncilMember.TYR);

    return [...new Set(members)];
  }

  private determineComplexity(
    classification: QueryClassification
  ): 'simple' | 'moderate' | 'complex' {
    return classification.complexity;
  }

  private requiresDeliberation(classification: QueryClassification): boolean {
    return (
      classification.complexity === 'complex' ||
      classification.requiresMultipleSources ||
      classification.controversial
    );
  }

  private estimateTokens(classification: QueryClassification): number {
    const baseTokens = 1000;
    const complexityMultiplier = {
      simple: 1,
      moderate: 2,
      complex: 4,
    };

    return baseTokens * complexityMultiplier[classification.complexity];
  }
}
