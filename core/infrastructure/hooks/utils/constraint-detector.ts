/**
 * Constraint Detector (v5.7.0)
 *
 * Detects implicit and explicit constraints from conversation context.
 * Used by ExitPlanMode to enforce constraint acknowledgment in plans.
 *
 * Philosophy: Plans must explicitly address known constraints BEFORE implementation.
 * This prevents "awareness without application" failures.
 *
 * Created: 2025-11-18
 */

export interface PlanConstraints {
  // File size constraints
  skillLineLimit?: number;        // Skill files must be <500 lines (progressive disclosure)
  cacheTokenLimit?: number;       // Cache files must be 2,000-3,000 tokens

  // Design constraints
  paretoPrinciple?: boolean;      // User said "don't overdo" / "20/80" / "minimal"
  minimalChanges?: boolean;       // User requested focused, small scope

  // Quality constraints
  explicitStandards?: string[];   // Standards user referenced
  requiredMetrics?: string[];     // Metrics that must appear in plan

  // Source information
  detectedFrom?: string[];        // Where constraints came from (for debugging)
}

export interface ConstraintMatch {
  type: keyof PlanConstraints;
  value: any;
  source: string;  // Which message triggered detection
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Detects constraints from conversation history
 */
export function detectConstraints(conversationText: string): PlanConstraints {
  const constraints: PlanConstraints = {};
  const detectedFrom: string[] = [];

  // Normalize text for pattern matching
  const text = conversationText.toLowerCase();

  // DETECTION 1: Skill file modifications
  if (text.includes('.claude/skills/') ||
      text.includes('skill file') ||
      (text.includes('skill') && text.includes('enhance'))) {
    constraints.skillLineLimit = 500;
    detectedFrom.push('Skill file modification detected → 500 line limit (progressive disclosure v5.2.0)');
  }

  // DETECTION 2: Pareto principle / "don't overdo"
  const paretoPatterns = [
    /don't overdo/i,
    /don't?\s+overdo/i,
    /20.*80|80.*20/i,
    /pareto/i,
    /minimal changes/i,
    /focused.*changes/i,
    /keep it simple/i,
    /20%.*80%/i
  ];

  if (paretoPatterns.some(pattern => conversationText.match(pattern))) {
    constraints.paretoPrinciple = true;
    constraints.minimalChanges = true;
    detectedFrom.push('Pareto principle detected → Must focus on 20% that brings 80% value');
  }

  // DETECTION 3: Explicit line limit mentions
  const lineLimitMatch = conversationText.match(/(?:must be |should be |limit.*?|<\s*)(\d+)\s*lines?/i);
  if (lineLimitMatch) {
    const limit = parseInt(lineLimitMatch[1]);
    if (limit > 0 && limit < 10000) {
      constraints.skillLineLimit = limit;
      detectedFrom.push(`Explicit line limit: ${limit} lines`);
    }
  }

  // DETECTION 4: Progressive disclosure mentions
  if (text.includes('progressive disclosure') ||
      text.includes('auto-load') ||
      text.includes('quick tier')) {
    if (!constraints.skillLineLimit) {
      constraints.skillLineLimit = 500;
    }
    detectedFrom.push('Progressive disclosure mentioned → 500 line limit applies');
  }

  // DETECTION 5: Cache file operations
  if (text.includes('.claude/knowledge/cache/') ||
      text.includes('cache file')) {
    constraints.cacheTokenLimit = 3000;
    detectedFrom.push('Cache file operation → 2,000-3,000 token limit');
  }

  // DETECTION 6: Explicit standards references
  const standardPatterns = [
    /v5\.\d+\.\d+ standard/i,
    /progressive disclosure standard/i,
    /task decomposition override/i,
    /directive language/i,
    /naming.*standard/i
  ];

  const explicitStandards: string[] = [];
  standardPatterns.forEach(pattern => {
    const match = conversationText.match(pattern);
    if (match) {
      explicitStandards.push(match[0]);
    }
  });

  if (explicitStandards.length > 0) {
    constraints.explicitStandards = explicitStandards;
    detectedFrom.push(`Standards referenced: ${explicitStandards.join(', ')}`);
  }

  // Add detection sources
  if (detectedFrom.length > 0) {
    constraints.detectedFrom = detectedFrom;
  }

  return constraints;
}

/**
 * Validates that a plan addresses detected constraints
 */
export function validatePlanConstraints(
  plan: string,
  constraints: PlanConstraints
): { valid: boolean; errors: string[]; warnings: string[] } {

  const errors: string[] = [];
  const warnings: string[] = [];

  // No constraints = no validation needed
  if (Object.keys(constraints).length === 0 ||
      (Object.keys(constraints).length === 1 && constraints.detectedFrom)) {
    return { valid: true, errors: [], warnings: [] };
  }

  // VALIDATION 1: Skill line limit
  if (constraints.skillLineLimit) {
    const hasLimitMention = plan.match(/<\s*500\s*lines?|line limit|progressive disclosure/i);
    const hasCurrentLines = plan.match(/current.*?(\d+)\s*lines?/i);
    const hasTargetLines = plan.match(/target.*?[<≤]?\s*(\d+)\s*lines?/i);
    const hasStrategy = plan.match(/compress|extract|resources?|restructure|reduce/i);

    if (!hasLimitMention && !hasTargetLines) {
      errors.push(
        `❌ Skill line limit not acknowledged\n` +
        `   Required: <${constraints.skillLineLimit} lines (progressive disclosure standard)\n` +
        `   Plan must include target line count`
      );
    }

    if (!hasStrategy && hasCurrentLines) {
      warnings.push(
        `⚠️  No compression strategy mentioned\n` +
        `   Consider: extract to resources, compress sections, restructure`
      );
    }

    // Extract target and validate
    if (hasTargetLines) {
      const targetMatch = plan.match(/target.*?[<≤]?\s*(\d+)\s*lines?/i);
      if (targetMatch) {
        const target = parseInt(targetMatch[1]);
        if (target > constraints.skillLineLimit) {
          errors.push(
            `❌ Target line count exceeds limit\n` +
            `   Target: ${target} lines\n` +
            `   Limit: ${constraints.skillLineLimit} lines\n` +
            `   Must reduce target to comply with standard`
          );
        }
      }
    }
  }

  // VALIDATION 2: Pareto principle
  if (constraints.paretoPrinciple || constraints.minimalChanges) {
    const hasParetoAcknowledgment = plan.match(/20%|80%|pareto|minimal|focused|compress/i);
    const hasScopeLimitation = plan.match(/will not|won't|exclude|only|just|focused on/i);

    if (!hasParetoAcknowledgment) {
      errors.push(
        `❌ Pareto principle not addressed\n` +
        `   User requested: "don't overdo" / "20% that brings 80%"\n` +
        `   Plan must show: What's the critical 20%? What will you NOT do?`
      );
    }

    if (!hasScopeLimitation) {
      warnings.push(
        `⚠️  No scope limitation mentioned\n` +
        `   Consider explicitly stating what you will NOT do`
      );
    }
  }

  // VALIDATION 3: Explicit standards
  if (constraints.explicitStandards && constraints.explicitStandards.length > 0) {
    const standardsMentioned = constraints.explicitStandards.some(std =>
      plan.toLowerCase().includes(std.toLowerCase())
    );

    if (!standardsMentioned) {
      warnings.push(
        `⚠️  Standards mentioned but not addressed in plan\n` +
        `   Referenced: ${constraints.explicitStandards.join(', ')}`
      );
    }
  }

  // VALIDATION 4: Cache token limit
  if (constraints.cacheTokenLimit) {
    const hasTokenMention = plan.match(/\d+\s*tokens?/i);

    if (!hasTokenMention) {
      warnings.push(
        `⚠️  Cache file token budget not mentioned\n` +
        `   Required: 2,000-3,000 tokens\n` +
        `   Plan should include estimated token count`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Generates a constraint acknowledgment template for the user
 */
export function generateConstraintTemplate(constraints: PlanConstraints): string {
  let template = '\n**Constraint Acknowledgment Required:**\n\n';

  if (constraints.skillLineLimit) {
    template += `📏 **Line Limit**: <${constraints.skillLineLimit} lines (progressive disclosure)\n`;
    template += `   - Current lines: [FILL IN]\n`;
    template += `   - Target lines: [FILL IN - must be <${constraints.skillLineLimit}]\n`;
    template += `   - Strategy: [compress/extract to resources/restructure]\n\n`;
  }

  if (constraints.paretoPrinciple) {
    template += `🎯 **Pareto Principle**: Focus on 20% that brings 80% value\n`;
    template += `   - Critical 20%: [FILL IN - what are the high-impact changes?]\n`;
    template += `   - Will NOT do: [FILL IN - what will you exclude?]\n\n`;
  }

  if (constraints.cacheTokenLimit) {
    template += `💾 **Token Budget**: 2,000-3,000 tokens\n`;
    template += `   - Estimated tokens: [FILL IN]\n`;
    template += `   - Strategy if >3,000: [FILL IN]\n\n`;
  }

  if (constraints.explicitStandards && constraints.explicitStandards.length > 0) {
    template += `📋 **Standards Referenced**:\n`;
    constraints.explicitStandards.forEach(std => {
      template += `   - ${std}\n`;
    });
    template += '\n';
  }

  template += 'Add this acknowledgment to your plan before proceeding.\n';

  return template;
}

/**
 * Formats validation errors for display
 */
export function formatValidationErrors(
  validation: { valid: boolean; errors: string[]; warnings: string[] },
  constraints: PlanConstraints
): string {

  if (validation.valid && validation.warnings.length === 0) {
    return ''; // No output needed
  }

  let output = '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

  if (!validation.valid) {
    output += '❌ PLAN REJECTED: Constraint Violations\n';
  } else {
    output += '⚠️  PLAN WARNINGS: Consider Addressing\n';
  }

  output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

  // Show detected constraints
  if (constraints.detectedFrom && constraints.detectedFrom.length > 0) {
    output += '📋 Detected Constraints:\n';
    constraints.detectedFrom.forEach(source => {
      output += `   • ${source}\n`;
    });
    output += '\n';
  }

  // Show errors (blocking)
  if (validation.errors.length > 0) {
    output += '🚫 BLOCKING ISSUES:\n\n';
    validation.errors.forEach(error => {
      output += `${error}\n\n`;
    });
  }

  // Show warnings (non-blocking)
  if (validation.warnings.length > 0) {
    output += '💡 SUGGESTIONS:\n\n';
    validation.warnings.forEach(warning => {
      output += `${warning}\n\n`;
    });
  }

  // Show template
  if (!validation.valid) {
    output += generateConstraintTemplate(constraints);
  }

  output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

  return output;
}
