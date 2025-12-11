/**
 * Council (THING) types for YGGDRASIL
 *
 * The THING is the assembly where council members deliberate.
 * Each member brings unique capabilities to the discussion.
 */

import { Source } from './source.js';

export enum CouncilMember {
  KVASIR = 'KVASIR', // Deep reasoning (Claude)
  BRAGI = 'BRAGI', // Creativity (Grok)
  NORNES = 'NORNES', // Calculation/Logic (DeepSeek)
  SAGA = 'SAGA', // General knowledge (Llama)
  SYN = 'SYN', // Vision/Multimodal (Gemini)
  LOKI = 'LOKI', // Adversarial critique
  TYR = 'TYR', // Arbitration/Voting
}

export type CouncilVerdict = 'CONSENSUS' | 'MAJORITY' | 'SPLIT' | 'DEADLOCK';

export interface CouncilResponse {
  member: CouncilMember;
  content: string;
  confidence: number;
  reasoning?: string;
  sources?: Source[];
  processingTimeMs: number;
  timestamp: Date;
}

export interface LokiChallenge {
  id: string;
  targetMember: CouncilMember;
  challenge: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  response?: string;
  resolved: boolean;
  timestamp: Date;
}

export interface TyrVerdict {
  verdict: CouncilVerdict;
  voteCounts: Record<string, number>;
  reasoning: string;
  dissent?: string[];
  timestamp: Date;
}

export interface CouncilDeliberation {
  id: string;
  requestId: string;
  query: string;
  responses: CouncilResponse[];
  lokiChallenges: LokiChallenge[];
  tyrVerdict: TyrVerdict;
  finalProposal: string;
  totalProcessingTimeMs: number;
  timestamp: Date;
}

export interface CouncilConfig {
  members: CouncilMember[];
  requiredMembers: CouncilMember[];
  votingThreshold: number;
  lokiEnabled: boolean;
  maxDeliberationTimeMs: number;
  parallelExecution: boolean;
}

export const DEFAULT_COUNCIL_CONFIG: CouncilConfig = {
  members: [CouncilMember.KVASIR, CouncilMember.SAGA, CouncilMember.LOKI, CouncilMember.TYR],
  requiredMembers: [CouncilMember.KVASIR, CouncilMember.TYR],
  votingThreshold: 0.66,
  lokiEnabled: true,
  maxDeliberationTimeMs: 60000,
  parallelExecution: true,
};

/**
 * Council member capabilities
 */
export const COUNCIL_CAPABILITIES: Record<CouncilMember, string[]> = {
  [CouncilMember.KVASIR]: ['deep_reasoning', 'analysis', 'nuance'],
  [CouncilMember.BRAGI]: ['creativity', 'language', 'expression'],
  [CouncilMember.NORNES]: ['calculation', 'logic', 'mathematics'],
  [CouncilMember.SAGA]: ['general_knowledge', 'history', 'context'],
  [CouncilMember.SYN]: ['vision', 'multimodal', 'image_analysis'],
  [CouncilMember.LOKI]: ['critique', 'adversarial', 'edge_cases'],
  [CouncilMember.TYR]: ['arbitration', 'fairness', 'consensus'],
};
