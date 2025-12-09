/**
 * Council Service
 *
 * Orchestrates deliberation between council members.
 */

import { Injectable } from '@nestjs/common';
import {
  CouncilMember,
  CouncilResponse,
  CouncilDeliberation,
  LokiChallenge,
  TyrVerdict,
  createLogger,
  generateId,
} from '@yggdrasil/shared';
import { KvasirAdapter } from './members/kvasir.adapter.js';
import { SagaAdapter } from './members/saga.adapter.js';
import { LokiAdapter } from './members/loki.adapter.js';
import { VotingService } from './voting.service.js';

const logger = createLogger('CouncilService', 'info');

export interface DeliberationRequest {
  query: string;
  members?: CouncilMember[];
  requireConsensus?: boolean;
  maxTimeMs?: number;
}

@Injectable()
export class CouncilService {
  constructor(
    private readonly kvasir: KvasirAdapter,
    private readonly saga: SagaAdapter,
    private readonly loki: LokiAdapter,
    private readonly voting: VotingService
  ) {}

  async deliberate(request: DeliberationRequest): Promise<CouncilDeliberation> {
    const startTime = Date.now();
    const deliberationId = generateId();

    const members = request.members ?? [
      CouncilMember.KVASIR,
      CouncilMember.SAGA,
      CouncilMember.LOKI,
      CouncilMember.TYR,
    ];

    logger.info('Deliberation started', {
      id: deliberationId,
      query: request.query.slice(0, 100),
      members,
    });

    // Get responses from council members (in parallel for efficiency)
    const responses = await this.gatherResponses(request.query, members);

    // LOKI challenges the responses
    const challenges = await this.gatherChallenges(responses);

    // TYR renders verdict
    const tyrVerdict = await this.voting.renderVerdict(responses, challenges);

    // Synthesize final proposal
    const finalProposal = this.synthesizeFinalProposal(responses, tyrVerdict);

    const processingTimeMs = Date.now() - startTime;

    const deliberation: CouncilDeliberation = {
      id: deliberationId,
      requestId: deliberationId, // Would come from the original request
      query: request.query,
      responses,
      lokiChallenges: challenges,
      tyrVerdict,
      finalProposal,
      totalProcessingTimeMs: processingTimeMs,
      timestamp: new Date(),
    };

    logger.info('Deliberation completed', {
      id: deliberationId,
      verdict: tyrVerdict.verdict,
      processingTimeMs,
    });

    return deliberation;
  }

  private async gatherResponses(
    query: string,
    members: CouncilMember[]
  ): Promise<CouncilResponse[]> {
    const responsePromises: Promise<CouncilResponse | null>[] = [];

    for (const member of members) {
      if (member === CouncilMember.LOKI || member === CouncilMember.TYR) {
        continue; // These have special roles
      }

      const promise = this.getMemberResponse(member, query);
      responsePromises.push(promise);
    }

    const results = await Promise.all(responsePromises);
    return results.filter((r): r is CouncilResponse => r !== null);
  }

  private async getMemberResponse(
    member: CouncilMember,
    query: string
  ): Promise<CouncilResponse | null> {
    const startTime = Date.now();

    try {
      let response: { content: string; confidence: number; reasoning?: string };

      switch (member) {
        case CouncilMember.KVASIR:
          response = await this.kvasir.query(query);
          break;
        case CouncilMember.SAGA:
          response = await this.saga.query(query);
          break;
        default:
          return null;
      }

      return {
        member,
        content: response.content,
        confidence: response.confidence,
        reasoning: response.reasoning,
        processingTimeMs: Date.now() - startTime,
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error(`Failed to get response from ${member}`, error as Error);
      return null;
    }
  }

  private async gatherChallenges(responses: CouncilResponse[]): Promise<LokiChallenge[]> {
    const challenges: LokiChallenge[] = [];

    for (const response of responses) {
      const lokiResponse = await this.loki.challenge(response);
      if (lokiResponse) {
        challenges.push({
          id: generateId(),
          targetMember: response.member,
          challenge: lokiResponse.challenge,
          severity: lokiResponse.severity,
          resolved: false,
          timestamp: new Date(),
        });
      }
    }

    return challenges;
  }

  private synthesizeFinalProposal(
    responses: CouncilResponse[],
    verdict: TyrVerdict
  ): string {
    if (responses.length === 0) {
      return 'No consensus reached - insufficient responses from council members.';
    }

    // Find highest confidence response
    const bestResponse = responses.reduce((best, current) =>
      current.confidence > best.confidence ? current : best
    );

    // In production, this would use an LLM to synthesize all responses
    return `[${verdict.verdict}] ${bestResponse.content}`;
  }
}
