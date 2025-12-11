/**
 * Synthesis Service
 *
 * Synthesizes validated responses into final output.
 */

import { Injectable } from '@nestjs/common';
import { CouncilDeliberation, ValidationResult, Source, createLogger } from '@yggdrasil/shared';

const logger = createLogger('SynthesisService', 'info');

export interface SynthesisInput {
  deliberation?: CouncilDeliberation;
  validation: ValidationResult;
  originalQuery: string;
}

export interface SynthesisOutput {
  content: string;
  sources: Source[];
  confidence: number;
  disclaimer?: string;
}

@Injectable()
export class SynthesisService {
  synthesize(input: SynthesisInput): SynthesisOutput {
    logger.info('Synthesizing response', {
      hasDeliberation: !!input.deliberation,
      isValid: input.validation.isValid,
    });

    // If validation failed, return rejection message
    if (!input.validation.isValid) {
      return this.createRejectionResponse(input);
    }

    // Synthesize from council deliberation
    if (input.deliberation) {
      return this.synthesizeFromDeliberation(input);
    }

    // Synthesize from validation only
    return this.synthesizeFromValidation(input);
  }

  private createRejectionResponse(input: SynthesisInput): SynthesisOutput {
    const reason = input.validation.rejectionReason ?? 'UNKNOWN';

    const messages: Record<string, string> = {
      NO_SOURCE: 'I cannot verify this claim with validated sources.',
      CONTRADICTS_MEMORY: 'This contradicts previously validated information.',
      FAILED_CRITIQUE: 'This claim did not withstand critical analysis.',
      NO_CONSENSUS: 'The council could not reach consensus on this matter.',
      INSUFFICIENT_CONFIDENCE: 'Confidence level is below required threshold.',
      CONTAMINATION_DETECTED: 'Epistemic contamination detected between branches.',
      TIMEOUT: 'Processing exceeded time limits.',
      INTERNAL_ERROR: 'An internal error occurred during validation.',
    };

    return {
      content: `I do not know. ${messages[reason] ?? 'Validation failed.'}`,
      sources: [],
      confidence: 0,
      disclaimer:
        'This response indicates that YGGDRASIL could not verify the requested information to the required standard of certainty.',
    };
  }

  private synthesizeFromDeliberation(input: SynthesisInput): SynthesisOutput {
    const deliberation = input.deliberation!;

    // Get the final proposal from TYR's verdict
    let content = deliberation.finalProposal;

    // Add source citations
    if (input.validation.sources.length > 0) {
      content += '\n\nSources:';
      for (const source of input.validation.sources.slice(0, 5)) {
        content += `\n- ${source.title} (${source.type})`;
      }
    }

    return {
      content,
      sources: input.validation.sources,
      confidence: 100, // Only 100% reaches this point
    };
  }

  private synthesizeFromValidation(input: SynthesisInput): SynthesisOutput {
    // Direct synthesis without council deliberation
    // Used for simple factual lookups

    let content = 'Based on verified sources:\n';

    if (input.validation.sources.length > 0) {
      for (const source of input.validation.sources.slice(0, 5)) {
        content += `\n- ${source.title}`;
      }
    } else {
      content = 'The claim has been validated against the knowledge base.';
    }

    return {
      content,
      sources: input.validation.sources,
      confidence: 100,
    };
  }

  formatResponse(output: SynthesisOutput): string {
    let formatted = output.content;

    // Add confidence indicator
    if (output.confidence === 100) {
      formatted = `[VERIFIED] ${formatted}`;
    } else {
      formatted = `[UNVERIFIED] ${formatted}`;
    }

    // Add disclaimer if present
    if (output.disclaimer) {
      formatted += `\n\n---\n${output.disclaimer}`;
    }

    return formatted;
  }
}
