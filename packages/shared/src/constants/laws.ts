/**
 * The Seven Laws of YGGDRASIL
 *
 * These are inviolable rules that govern system behavior.
 * The code MUST respect these laws.
 */

export const SEVEN_LAWS = {
  PRIMACY_OF_TRUTH: {
    id: 'PRIMACY_OF_TRUTH',
    number: 1,
    name: 'Primacy of Truth',
    statement: 'YGGDRASIL never lies',
    rule: 'IF confidence < 100% AND NOT anchored_in_verified_source THEN response = "I do not know" + reason',
    implementation: 'ODIN rejects all unanchored output',
  },

  ABSOLUTE_TRANSPARENCY: {
    id: 'ABSOLUTE_TRANSPARENCY',
    number: 2,
    name: 'Absolute Transparency',
    statement: 'Always show the reasoning',
    rule: 'FOR EACH response: INCLUDE complete_trace { sources_consulted, reasoning_paths, models_involved, intermediate_decisions }',
    implementation: 'Every response includes ValidationTrace',
  },

  SEPARATION_OF_KNOWLEDGE: {
    id: 'SEPARATION_OF_KNOWLEDGE',
    number: 3,
    name: 'Separation of Knowledge',
    statement: 'Proven != Supposed != Noise',
    rule: 'NEVER mix: MIMIR (proven) with VOLVA (hypothesis), VOLVA with HUGIN (noise), HUGIN with MIMIR',
    implementation: 'Separate databases, no contamination API',
  },

  SELECTIVE_FORGETTING: {
    id: 'SELECTIVE_FORGETTING',
    number: 4,
    name: 'Selective Forgetting',
    statement: 'Right to selective erasure',
    rule: 'IF information_invalidated: THEN propagate_invalidation(all_derived_decisions) AND mark_as_obsolete AND notify_concerned_users',
    implementation: 'GDPR tagging, granular rollback',
  },

  DATA_SOVEREIGNTY: {
    id: 'DATA_SOVEREIGNTY',
    number: 5,
    name: 'Data Sovereignty',
    statement: 'Data belongs to the creator',
    rule: 'ALL personal data: REMAIN under user jurisdiction, CAN BE exported anytime, CAN BE permanently deleted, ARE NEVER sold or shared',
    implementation: 'E2E encryption, local deployment option',
  },

  COMPUTATIONAL_HUMILITY: {
    id: 'COMPUTATIONAL_HUMILITY',
    number: 6,
    name: 'Computational Humility',
    statement: 'Consume only what is necessary',
    rule: 'FOR EACH request: USE minimum necessary resources, REPORT consumption (tokens, estimated energy), PREFER local models when relevant',
    implementation: 'Serverless, public metrics',
  },

  PERPETUAL_OPENNESS: {
    id: 'PERPETUAL_OPENNESS',
    number: 7,
    name: 'Perpetual Openness',
    statement: 'Code belongs to humanity',
    rule: 'YGGDRASIL code: IS AND WILL REMAIN open-source, CANNOT BE closed, patented or privatized, BELONGS to humanity',
    implementation: 'MIT + copyleft, distributed governance',
  },
} as const;

export type LawId = keyof typeof SEVEN_LAWS;
export type Law = (typeof SEVEN_LAWS)[LawId];

export function getLaw(id: LawId): Law {
  return SEVEN_LAWS[id];
}

export function getAllLaws(): Law[] {
  return Object.values(SEVEN_LAWS);
}

export function getLawByNumber(number: number): Law | undefined {
  return Object.values(SEVEN_LAWS).find((law) => law.number === number);
}
