/**
 * Epistemic errors for YGGDRASIL
 *
 * These errors enforce the strict separation between branches.
 * Contamination between branches is a critical violation.
 */

import { YggdrasilError, ErrorDetails } from './base.js';
import { EpistemicBranch } from '../types/epistemic.js';

export class EpistemicError extends YggdrasilError {
  constructor(message: string, code: string, details?: ErrorDetails) {
    super(message, code, details);
  }
}

export class EpistemicContaminationError extends EpistemicError {
  public readonly fromBranch: EpistemicBranch;
  public readonly toBranch: EpistemicBranch;

  constructor(from: EpistemicBranch, to: EpistemicBranch) {
    super(`Attempted contamination from ${from} to ${to}`, 'EPISTEMIC_CONTAMINATION', { from, to });
    this.fromBranch = from;
    this.toBranch = to;
  }
}

export class InvalidPromotionError extends EpistemicError {
  constructor(from: EpistemicBranch, to: EpistemicBranch, reason: string) {
    super(`Cannot promote from ${from} to ${to}: ${reason}`, 'INVALID_PROMOTION', {
      from,
      to,
      reason,
    });
  }
}

export class BranchMismatchError extends EpistemicError {
  constructor(expected: EpistemicBranch, actual: EpistemicBranch, operation: string) {
    super(
      `Branch mismatch in ${operation}: expected ${expected}, got ${actual}`,
      'BRANCH_MISMATCH',
      { expected, actual, operation }
    );
  }
}

export class ConfidenceOutOfRangeError extends EpistemicError {
  constructor(
    confidence: number,
    branch: EpistemicBranch,
    expectedRange: { min: number; max: number }
  ) {
    super(`Confidence ${confidence} out of range for branch ${branch}`, 'CONFIDENCE_OUT_OF_RANGE', {
      confidence,
      branch,
      expectedRange,
    });
  }
}

export class SourceBranchViolationError extends EpistemicError {
  constructor(sourceId: string, sourceBranch: EpistemicBranch, targetBranch: EpistemicBranch) {
    super(
      `Source from ${sourceBranch} cannot be used in ${targetBranch}`,
      'SOURCE_BRANCH_VIOLATION',
      { sourceId, sourceBranch, targetBranch }
    );
  }
}
