/**
 * Epistemic types for YGGDRASIL
 *
 * These types define the three branches of knowledge:
 * - MIMIR: Validated, 100% confidence
 * - VOLVA: Research/hypotheses, variable confidence
 * - HUGIN: Internet/unverified, low confidence
 */

export enum EpistemicBranch {
  MIMIR = 'MIMIR',
  VOLVA = 'VOLVA',
  HUGIN = 'HUGIN',
}

export interface ConfidenceLevel {
  value: number;
  branch: EpistemicBranch;
  label: ConfidenceLabel;
}

export type ConfidenceLabel = 'VERIFIED' | 'THEORETICAL' | 'UNVERIFIED';

export interface EpistemicMetadata {
  branch: EpistemicBranch;
  confidence: number;
  verifiedAt?: Date;
  verifiedBy?: string;
  sourceCount: number;
}

/**
 * Confidence thresholds for each branch
 */
export const CONFIDENCE_THRESHOLDS = {
  [EpistemicBranch.MIMIR]: { min: 100, max: 100 },
  [EpistemicBranch.VOLVA]: { min: 50, max: 99 },
  [EpistemicBranch.HUGIN]: { min: 0, max: 49 },
} as const;

/**
 * Determines the epistemic branch based on confidence level
 */
export function getBranchForConfidence(confidence: number): EpistemicBranch {
  if (confidence === 100) return EpistemicBranch.MIMIR;
  if (confidence >= 50) return EpistemicBranch.VOLVA;
  return EpistemicBranch.HUGIN;
}

/**
 * Gets the confidence label for display
 */
export function getConfidenceLabel(branch: EpistemicBranch): ConfidenceLabel {
  switch (branch) {
    case EpistemicBranch.MIMIR:
      return 'VERIFIED';
    case EpistemicBranch.VOLVA:
      return 'THEORETICAL';
    case EpistemicBranch.HUGIN:
      return 'UNVERIFIED';
  }
}

/**
 * Validates that a confidence value is within valid range for a branch
 */
export function isValidConfidenceForBranch(confidence: number, branch: EpistemicBranch): boolean {
  const threshold = CONFIDENCE_THRESHOLDS[branch];
  return confidence >= threshold.min && confidence <= threshold.max;
}
