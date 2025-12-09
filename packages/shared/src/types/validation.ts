/**
 * Validation types for YGGDRASIL
 *
 * ODIN uses these types to validate all responses.
 * Nothing exits the system without passing validation.
 */

import { Source } from './source.js';

export type RejectionReason =
  | 'NO_SOURCE'
  | 'CONTRADICTS_MEMORY'
  | 'FAILED_CRITIQUE'
  | 'NO_CONSENSUS'
  | 'INSUFFICIENT_CONFIDENCE'
  | 'CONTAMINATION_DETECTED'
  | 'TIMEOUT'
  | 'INTERNAL_ERROR';

export type ValidationDecision = 'APPROVED' | 'REJECTED';

export interface ValidationResult {
  isValid: boolean;
  confidence: number;
  sources: Source[];
  trace: ValidationTrace;
  rejectionReason?: RejectionReason;
}

export interface ValidationTrace {
  id: string;
  requestId: string;
  timestamp: Date;
  steps: ValidationStep[];
  finalDecision: ValidationDecision;
  processingTimeMs: number;
  odinVersion: string;
}

export interface ValidationStep {
  stepNumber: number;
  component: ValidationComponent;
  action: string;
  result: ValidationStepResult;
  details?: Record<string, unknown>;
  timestamp: Date;
  durationMs: number;
}

export type ValidationComponent =
  | 'HEIMDALL'
  | 'RATATOSK'
  | 'MIMIR'
  | 'VOLVA'
  | 'HUGIN'
  | 'THING'
  | 'KVASIR'
  | 'BRAGI'
  | 'NORNES'
  | 'SAGA'
  | 'LOKI'
  | 'TYR'
  | 'ODIN'
  | 'MUNIN';

export type ValidationStepResult = 'PASS' | 'FAIL' | 'WARN' | 'SKIP';

export interface ValidationConfig {
  requireMimirAnchor: boolean;
  minimumConfidence: number;
  requireConsensus: boolean;
  consensusThreshold: number;
  lokiChallengeRequired: boolean;
  maxProcessingTimeMs: number;
}

export const DEFAULT_VALIDATION_CONFIG: ValidationConfig = {
  requireMimirAnchor: true,
  minimumConfidence: 100,
  requireConsensus: true,
  consensusThreshold: 0.66,
  lokiChallengeRequired: true,
  maxProcessingTimeMs: 30000,
};
