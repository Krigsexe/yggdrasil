/**
 * 🌲 YGGDRASIL - Shared Types & Constants
 * 
 * Core types and constants used across all YGGDRASIL components.
 */

// ============================================================================
// EPISTEMIC BRANCHES
// ============================================================================

/**
 * The three epistemic branches of YGGDRASIL.
 * These represent different levels of knowledge certainty.
 */
export enum EpistemicBranch {
  /** MÍMIR - Validated knowledge, 100% confidence */
  MIMIR = 'MIMIR',
  /** VÖLVA - Research/hypotheses, variable confidence */
  VOLVA = 'VOLVA',
  /** HUGIN - Internet/unverified, treat with caution */
  HUGIN = 'HUGIN',
}

/**
 * Confidence levels for information.
 */
export interface ConfidenceLevel {
  /** The numeric confidence (0-100) */
  value: number;
  /** The source branch */
  branch: EpistemicBranch;
  /** Human-readable label */
  label: 'VERIFIED' | 'THEORETICAL' | 'UNVERIFIED';
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Result of ODIN validation.
 */
export interface ValidationResult {
  /** Whether the content passed validation */
  isValid: boolean;
  /** Confidence level (100 = fully validated) */
  confidence: number;
  /** Sources that anchor this content */
  sources: Source[];
  /** The validation trace for audit */
  trace: ValidationTrace;
  /** If invalid, the reason why */
  rejectionReason?: RejectionReason;
}

export interface Source {
  id: string;
  type: 'arxiv' | 'pubmed' | 'iso' | 'rfc' | 'wikidata' | 'web' | 'other';
  url: string;
  title: string;
  authors?: string[];
  publishedAt?: Date;
  trustScore: number;
  branch: EpistemicBranch;
}

export interface ValidationTrace {
  id: string;
  timestamp: Date;
  steps: ValidationStep[];
  finalDecision: 'APPROVED' | 'REJECTED';
  odinVersion: string;
}

export interface ValidationStep {
  component: 'MIMIR' | 'VOLVA' | 'HUGIN' | 'THING' | 'LOKI' | 'TYR' | 'ODIN';
  action: string;
  result: 'PASS' | 'FAIL' | 'WARN';
  details?: Record<string, unknown>;
  timestamp: Date;
}

export type RejectionReason =
  | 'NO_SOURCE'
  | 'CONTRADICTS_MEMORY'
  | 'FAILED_CRITIQUE'
  | 'NO_CONSENSUS'
  | 'INSUFFICIENT_CONFIDENCE'
  | 'CONTAMINATION_DETECTED';

// ============================================================================
// THING COUNCIL
// ============================================================================

/**
 * Members of the THING council.
 */
export enum CouncilMember {
  /** KVASIR - Deep reasoning (Claude) */
  KVASIR = 'KVASIR',
  /** BRAGI - Creativity (Grok) */
  BRAGI = 'BRAGI',
  /** NORNES - Calculation/Logic (DeepSeek) */
  NORNES = 'NORNES',
  /** SAGA - General knowledge (Llama) */
  SAGA = 'SAGA',
  /** LOKI - Adversarial critique */
  LOKI = 'LOKI',
  /** TYR - Arbitration/Voting */
  TYR = 'TYR',
}

export interface CouncilResponse {
  member: CouncilMember;
  content: string;
  confidence: number;
  reasoning?: string;
  sources?: Source[];
  timestamp: Date;
}

export interface CouncilDeliberation {
  id: string;
  query: string;
  responses: CouncilResponse[];
  lokkiChallenges: string[];
  tyrVerdict: 'CONSENSUS' | 'MAJORITY' | 'SPLIT' | 'DEADLOCK';
  finalProposal: string;
  timestamp: Date;
}

// ============================================================================
// MEMORY (MUNIN)
// ============================================================================

export interface MemoryEntry {
  id: string;
  userId: string;
  type: 'interaction' | 'decision' | 'correction' | 'checkpoint';
  content: unknown;
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
  validUntil?: Date;
  dependencies?: string[];
}

export interface Checkpoint {
  id: string;
  userId: string;
  stateSnapshot: Record<string, unknown>;
  createdAt: Date;
  reason: string;
}

// ============================================================================
// API
// ============================================================================

export interface YggdrasilRequest {
  id: string;
  query: string;
  context?: Record<string, unknown>;
  userId: string;
  sessionId: string;
  timestamp: Date;
  options?: RequestOptions;
}

export interface RequestOptions {
  /** Force a specific branch */
  forceBranch?: EpistemicBranch;
  /** Specific council members to consult */
  councilMembers?: CouncilMember[];
  /** Whether to include full trace */
  includeTrace?: boolean;
  /** Maximum response time in ms */
  timeout?: number;
}

export interface YggdrasilResponse {
  id: string;
  requestId: string;
  content: string;
  validation: ValidationResult;
  memoryUpdated: boolean;
  processingTime: number;
  timestamp: Date;
}

// ============================================================================
// ERRORS
// ============================================================================

export class YggdrasilError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'YggdrasilError';
  }
}

export class ValidationError extends YggdrasilError {
  constructor(reason: RejectionReason, details?: Record<string, unknown>) {
    super(`Validation failed: ${reason}`, 'VALIDATION_ERROR', { reason, ...details });
    this.name = 'ValidationError';
  }
}

export class EpistemicContaminationError extends YggdrasilError {
  constructor(from: EpistemicBranch, to: EpistemicBranch) {
    super(
      `Attempted contamination from ${from} to ${to}`,
      'EPISTEMIC_CONTAMINATION',
      { from, to }
    );
    this.name = 'EpistemicContaminationError';
  }
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const YGGDRASIL_VERSION = '0.1.0';

export const SEVEN_PILLARS = [
  'ABSOLUTE_VERACITY',
  'TOTAL_TRACEABILITY',
  'EPISTEMIC_SEPARATION',
  'LIVING_MEMORY',
  'REVERSIBILITY',
  'SOVEREIGNTY',
  'SUSTAINABILITY',
] as const;

export const SEVEN_LAWS = [
  'PRIMACY_OF_TRUTH',
  'ABSOLUTE_TRANSPARENCY',
  'SEPARATION_OF_KNOWLEDGE',
  'SELECTIVE_FORGETTING',
  'DATA_SOVEREIGNTY',
  'COMPUTATIONAL_HUMILITY',
  'PERPETUAL_OPENNESS',
] as const;

export type Pillar = (typeof SEVEN_PILLARS)[number];
export type Law = (typeof SEVEN_LAWS)[number];
