/**
 * Validation errors for YGGDRASIL
 */

import { YggdrasilError, ErrorDetails } from './base.js';
import { RejectionReason } from '../types/validation.js';

export class ValidationError extends YggdrasilError {
  public readonly rejectionReason: RejectionReason;

  constructor(reason: RejectionReason, details?: ErrorDetails) {
    super(`Validation failed: ${reason}`, 'VALIDATION_ERROR', {
      reason,
      ...details,
    });
    this.rejectionReason = reason;
  }
}

export class NoSourceError extends ValidationError {
  constructor(claim: string) {
    super('NO_SOURCE', {
      claim,
      hint: 'The claim could not be anchored to any verified source',
    });
  }
}

export class ContradictionError extends ValidationError {
  constructor(claim: string, contradictingMemoryId: string) {
    super('CONTRADICTS_MEMORY', {
      claim,
      contradictingMemoryId,
      hint: 'The claim contradicts previously validated information',
    });
  }
}

export class CritiqueFailed extends ValidationError {
  constructor(challenge: string, response: string) {
    super('FAILED_CRITIQUE', {
      challenge,
      response,
      hint: 'LOKI challenge could not be adequately addressed',
    });
  }
}

export class NoConsensusError extends ValidationError {
  constructor(voteCounts: Record<string, number>) {
    super('NO_CONSENSUS', {
      voteCounts,
      hint: 'Council members could not reach consensus',
    });
  }
}

export class InsufficientConfidenceError extends ValidationError {
  constructor(required: number, actual: number) {
    super('INSUFFICIENT_CONFIDENCE', {
      required,
      actual,
      hint: 'Confidence level below minimum threshold',
    });
  }
}

export class InputValidationError extends YggdrasilError {
  public readonly field: string;
  public readonly constraints: string[];

  constructor(field: string, constraints: string[]) {
    super(`Invalid input for field '${field}'`, 'INPUT_VALIDATION_ERROR', {
      field,
      constraints,
    });
    this.field = field;
    this.constraints = constraints;
  }
}

export class SchemaValidationError extends YggdrasilError {
  public readonly errors: Array<{ path: string; message: string }>;

  constructor(errors: Array<{ path: string; message: string }>) {
    super('Schema validation failed', 'SCHEMA_VALIDATION_ERROR', { errors });
    this.errors = errors;
  }
}
