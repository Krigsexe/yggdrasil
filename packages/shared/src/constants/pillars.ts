/**
 * The Seven Pillars of YGGDRASIL
 *
 * These are the foundational principles that guide all development.
 * Every line of code must serve these pillars.
 */

export const SEVEN_PILLARS = {
  ABSOLUTE_VERACITY: {
    id: 'ABSOLUTE_VERACITY',
    name: 'Absolute Veracity',
    description: 'Never probability. Certainty or silence.',
    principle:
      'YGGDRASIL says "verified, here are the sources" or "I do not know". Never "probably true".',
    implementation: [
      'All claims must be anchored to MIMIR sources',
      'Confidence is binary: 100% (sourced) or rejection',
      'Hallucinations are architectural impossibilities',
    ],
  },

  TOTAL_TRACEABILITY: {
    id: 'TOTAL_TRACEABILITY',
    name: 'Total Traceability',
    description: 'Every thought has an origin. Every decision has a trace.',
    principle:
      'Every response can be audited: where the information comes from, why this decision, what reasoning path.',
    implementation: [
      'ValidationTrace included in every response',
      'Structured JSON logs, timestamped, non-repudiable',
      'Complete audit of every interaction',
    ],
  },

  EPISTEMIC_SEPARATION: {
    id: 'EPISTEMIC_SEPARATION',
    name: 'Epistemic Separation',
    description: 'Knowledge, hypothesis, and noise never mix.',
    principle:
      'Three strictly separated branches: MIMIR (proven), VOLVA (theoretical), HUGIN (unverified).',
    implementation: [
      'Separate databases for each branch',
      'No API allows cross-contamination',
      'EpistemicContaminationError on violation attempts',
    ],
  },

  LIVING_MEMORY: {
    id: 'LIVING_MEMORY',
    name: 'Living Memory',
    description: 'Intelligence without memory is merely reflex.',
    principle:
      'YGGDRASIL remembers: past interactions, decisions made, corrections applied, evolving contexts.',
    implementation: [
      'MUNIN stores all interactions',
      'Triple indexing: temporal, semantic, causal',
      'Context reconstruction on each request',
    ],
  },

  REVERSIBILITY: {
    id: 'REVERSIBILITY',
    name: 'Reversibility',
    description: 'No error is final.',
    principle:
      'Rollback possible to any past state. Correction of decisions based on subsequently invalidated information.',
    implementation: [
      'Checkpoint system',
      'Rollback to any state',
      'Automatic rollback when source is invalidated',
    ],
  },

  SOVEREIGNTY: {
    id: 'SOVEREIGNTY',
    name: 'Sovereignty',
    description: "Humanity's data belongs to humanity.",
    principle:
      'Open-source, self-hostable, federable, auditable. No dependency on a single provider.',
    implementation: [
      'MIT + copyleft license',
      'Docker + Ollama for local deployment',
      'Multi-provider abstractions',
    ],
  },

  SUSTAINABILITY: {
    id: 'SUSTAINABILITY',
    name: 'Sustainability',
    description: 'Intelligence that destroys its planet is not intelligent.',
    principle:
      'Mutualization of existing models. Zero training of new models. Public consumption metrics.',
    implementation: [
      'No model training',
      'Serverless, scale-to-zero',
      'Public energy consumption metrics',
    ],
  },
} as const;

export type PillarId = keyof typeof SEVEN_PILLARS;
export type Pillar = (typeof SEVEN_PILLARS)[PillarId];

export function getPillar(id: PillarId): Pillar {
  return SEVEN_PILLARS[id];
}

export function getAllPillars(): Pillar[] {
  return Object.values(SEVEN_PILLARS);
}
