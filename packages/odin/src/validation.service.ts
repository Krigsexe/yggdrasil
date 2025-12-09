/**
 * Validation Service
 *
 * The core of ODIN - validates all content before output.
 * Implements the Absolute Veracity pillar.
 */

import { Injectable } from '@nestjs/common';
import {
  ValidationResult,
  ValidationTrace,
  ValidationStep,
  ValidationDecision,
  RejectionReason,
  Source,
  CouncilDeliberation,
  createLogger,
  generateId,
  YGGDRASIL_VERSION,
} from '@yggdrasil/shared';
import { AnchoringService } from './anchoring.service.js';

const logger = createLogger('ValidationService', 'info');

export interface ValidationInput {
  content: string;
  deliberation?: CouncilDeliberation;
  requestId: string;
  requireMimirAnchor?: boolean;
}

@Injectable()
export class ValidationService {
  constructor(private readonly anchoring: AnchoringService) {}

  async validate(input: ValidationInput): Promise<ValidationResult> {
    const startTime = Date.now();
    const traceId = generateId();
    const steps: ValidationStep[] = [];

    let stepNumber = 1;

    // Step 1: Source anchoring check
    const anchoringResult = await this.checkAnchoring(input, stepNumber++, steps);
    if (!anchoringResult.passed && input.requireMimirAnchor !== false) {
      return this.createRejectionResult(
        input,
        'NO_SOURCE',
        steps,
        traceId,
        startTime
      );
    }

    // Step 2: Memory consistency check
    const memoryResult = await this.checkMemoryConsistency(input, stepNumber++, steps);
    if (!memoryResult.passed) {
      return this.createRejectionResult(
        input,
        'CONTRADICTS_MEMORY',
        steps,
        traceId,
        startTime
      );
    }

    // Step 3: Council consensus check
    if (input.deliberation) {
      const consensusResult = await this.checkConsensus(input.deliberation, stepNumber++, steps);
      if (!consensusResult.passed) {
        return this.createRejectionResult(
          input,
          'NO_CONSENSUS',
          steps,
          traceId,
          startTime
        );
      }

      // Step 4: LOKI challenges check
      const lokiResult = await this.checkLokiChallenges(input.deliberation, stepNumber++, steps);
      if (!lokiResult.passed) {
        return this.createRejectionResult(
          input,
          'FAILED_CRITIQUE',
          steps,
          traceId,
          startTime
        );
      }
    }

    // Step 5: Confidence threshold check
    const confidenceResult = await this.checkConfidence(input, stepNumber++, steps);
    if (!confidenceResult.passed) {
      return this.createRejectionResult(
        input,
        'INSUFFICIENT_CONFIDENCE',
        steps,
        traceId,
        startTime
      );
    }

    // All checks passed - create approval result
    return this.createApprovalResult(
      input,
      anchoringResult.sources,
      steps,
      traceId,
      startTime
    );
  }

  private async checkAnchoring(
    input: ValidationInput,
    stepNumber: number,
    steps: ValidationStep[]
  ): Promise<{ passed: boolean; sources: Source[] }> {
    const stepStart = Date.now();

    const sources = await this.anchoring.findSources(input.content);
    const passed = sources.length > 0;

    steps.push({
      stepNumber,
      component: 'ODIN',
      action: 'source_anchoring_check',
      result: passed ? 'PASS' : 'FAIL',
      details: { sourcesFound: sources.length },
      timestamp: new Date(),
      durationMs: Date.now() - stepStart,
    });

    return { passed, sources };
  }

  private async checkMemoryConsistency(
    input: ValidationInput,
    stepNumber: number,
    steps: ValidationStep[]
  ): Promise<{ passed: boolean }> {
    const stepStart = Date.now();

    // Placeholder - would check against MUNIN for contradictions
    const passed = true;

    steps.push({
      stepNumber,
      component: 'MUNIN',
      action: 'memory_consistency_check',
      result: passed ? 'PASS' : 'WARN',
      details: { contradictions: 0 },
      timestamp: new Date(),
      durationMs: Date.now() - stepStart,
    });

    return { passed };
  }

  private async checkConsensus(
    deliberation: CouncilDeliberation,
    stepNumber: number,
    steps: ValidationStep[]
  ): Promise<{ passed: boolean }> {
    const stepStart = Date.now();

    const passed = ['CONSENSUS', 'MAJORITY'].includes(deliberation.tyrVerdict.verdict);

    steps.push({
      stepNumber,
      component: 'TYR',
      action: 'consensus_check',
      result: passed ? 'PASS' : 'FAIL',
      details: {
        verdict: deliberation.tyrVerdict.verdict,
        voteCounts: deliberation.tyrVerdict.voteCounts,
      },
      timestamp: new Date(),
      durationMs: Date.now() - stepStart,
    });

    return { passed };
  }

  private async checkLokiChallenges(
    deliberation: CouncilDeliberation,
    stepNumber: number,
    steps: ValidationStep[]
  ): Promise<{ passed: boolean }> {
    const stepStart = Date.now();

    const criticalChallenges = deliberation.lokiChallenges.filter(
      (c) => c.severity === 'CRITICAL' && !c.resolved
    );
    const passed = criticalChallenges.length === 0;

    steps.push({
      stepNumber,
      component: 'LOKI',
      action: 'challenge_resolution_check',
      result: passed ? 'PASS' : 'FAIL',
      details: {
        totalChallenges: deliberation.lokiChallenges.length,
        unresolvedCritical: criticalChallenges.length,
      },
      timestamp: new Date(),
      durationMs: Date.now() - stepStart,
    });

    return { passed };
  }

  private async checkConfidence(
    input: ValidationInput,
    stepNumber: number,
    steps: ValidationStep[]
  ): Promise<{ passed: boolean }> {
    const stepStart = Date.now();

    let confidence = 100;
    if (input.deliberation) {
      const responses = input.deliberation.responses;
      if (responses.length > 0) {
        confidence = Math.round(
          responses.reduce((sum, r) => sum + r.confidence, 0) / responses.length
        );
      }
    }

    // ODIN requires 100% confidence or rejection
    const passed = confidence === 100;

    steps.push({
      stepNumber,
      component: 'ODIN',
      action: 'confidence_threshold_check',
      result: passed ? 'PASS' : 'FAIL',
      details: { confidence, required: 100 },
      timestamp: new Date(),
      durationMs: Date.now() - stepStart,
    });

    return { passed };
  }

  private createApprovalResult(
    input: ValidationInput,
    sources: Source[],
    steps: ValidationStep[],
    traceId: string,
    startTime: number
  ): ValidationResult {
    const trace: ValidationTrace = {
      id: traceId,
      requestId: input.requestId,
      timestamp: new Date(),
      steps,
      finalDecision: 'APPROVED',
      processingTimeMs: Date.now() - startTime,
      odinVersion: YGGDRASIL_VERSION,
    };

    logger.info('Validation APPROVED', {
      requestId: input.requestId,
      sourceCount: sources.length,
      processingTimeMs: trace.processingTimeMs,
    });

    return {
      isValid: true,
      confidence: 100,
      sources,
      trace,
    };
  }

  private createRejectionResult(
    input: ValidationInput,
    reason: RejectionReason,
    steps: ValidationStep[],
    traceId: string,
    startTime: number
  ): ValidationResult {
    const trace: ValidationTrace = {
      id: traceId,
      requestId: input.requestId,
      timestamp: new Date(),
      steps,
      finalDecision: 'REJECTED',
      processingTimeMs: Date.now() - startTime,
      odinVersion: YGGDRASIL_VERSION,
    };

    logger.warn('Validation REJECTED', {
      requestId: input.requestId,
      reason,
      processingTimeMs: trace.processingTimeMs,
    });

    return {
      isValid: false,
      confidence: 0,
      sources: [],
      trace,
      rejectionReason: reason,
    };
  }
}
