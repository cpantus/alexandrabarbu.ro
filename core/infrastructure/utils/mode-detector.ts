/**
 * Mode Detection Utility
 *
 * Detects whether user is in Teaching mode or Production mode
 * based on prompt analysis.
 *
 * - Teaching Mode: Learning curriculum, /learn- commands, teaching/ paths
 * - Production Mode: Marketing work, /campaign, /content, etc.
 */

export type Mode = 'teaching' | 'production';

export interface ModeDetectionResult {
  mode: Mode;
  confidence: number; // 0-1
  indicators: string[];
}

/**
 * Detect mode from user prompt
 */
export function detectMode(prompt: string): ModeDetectionResult {
  const teachingIndicators: string[] = [];
  const productionIndicators: string[] = [];

  const lowerPrompt = prompt.toLowerCase();

  // Teaching mode indicators
  const teachingPatterns = [
    { pattern: /\/learn-/i, weight: 1.0, label: '/learn- command' },
    { pattern: /teaching\//i, weight: 0.9, label: 'teaching/ path reference' },
    { pattern: /\bmodule\s+\d/i, weight: 0.8, label: 'module reference' },
    { pattern: /\blesson\b/i, weight: 0.6, label: 'lesson keyword' },
    { pattern: /\btutorial\b/i, weight: 0.6, label: 'tutorial keyword' },
    { pattern: /\blearn\s+(how|about|to)\b/i, weight: 0.5, label: 'learning intent' },
    { pattern: /\bteach\s+me\b/i, weight: 0.7, label: 'teaching request' },
  ];

  // Production mode indicators
  const productionPatterns = [
    { pattern: /\/(campaign|content|analyze|growth|viral|seo|automate|launch)\b/i, weight: 1.0, label: 'production command' },
    { pattern: /\bcampaign\s+(strategy|plan)\b/i, weight: 0.8, label: 'campaign work' },
    { pattern: /\bcreate\s+(post|email|ad|content)\b/i, weight: 0.8, label: 'content creation' },
    { pattern: /\banalyze\s+(data|metrics|performance)\b/i, weight: 0.8, label: 'data analysis' },
    { pattern: /\bclient\b/i, weight: 0.6, label: 'client reference' },
    { pattern: /\bdeliverable\b/i, weight: 0.7, label: 'deliverable reference' },
  ];

  let teachingScore = 0;
  let productionScore = 0;

  // Check teaching patterns
  for (const { pattern, weight, label } of teachingPatterns) {
    if (pattern.test(prompt)) {
      teachingScore += weight;
      teachingIndicators.push(label);
    }
  }

  // Check production patterns
  for (const { pattern, weight, label } of productionPatterns) {
    if (pattern.test(prompt)) {
      productionScore += weight;
      productionIndicators.push(label);
    }
  }

  // Determine mode
  if (teachingScore > productionScore) {
    return {
      mode: 'teaching',
      confidence: Math.min(teachingScore / (teachingScore + productionScore + 0.01), 1),
      indicators: teachingIndicators,
    };
  } else if (productionScore > teachingScore) {
    return {
      mode: 'production',
      confidence: Math.min(productionScore / (teachingScore + productionScore + 0.01), 1),
      indicators: productionIndicators,
    };
  } else {
    // Default to production if ambiguous
    return {
      mode: 'production',
      confidence: 0.5,
      indicators: ['ambiguous (defaulting to production)'],
    };
  }
}

/**
 * Check if a skill should be filtered based on mode
 */
export function shouldFilterSkill(skillName: string, mode: Mode): boolean {
  // Teaching mode: filter out production-only skills
  if (mode === 'teaching') {
    const productionOnlySkills = [
      'automation-workflows',
      'research-synthesis',
    ];
    return productionOnlySkills.includes(skillName);
  }

  // Production mode: filter out teaching-only skills (currently none)
  return false;
}

/**
 * Check if a pattern should be filtered based on mode
 */
export function shouldFilterPattern(patternName: string, mode: Mode): boolean {
  // Teaching mode: suggest only teaching-relevant patterns
  if (mode === 'teaching') {
    const teachingRelevantPatterns = [
      'pre_creation_check', // For validation
      'component_skill',    // For creating custom skills
      'component_pattern',  // For creating custom patterns
    ];

    // Allow teaching-relevant patterns, filter all others
    return !teachingRelevantPatterns.includes(patternName);
  }

  // Production mode: filter out meta patterns (unless explicitly needed)
  if (mode === 'production') {
    // Meta patterns are OK in production if user is creating components
    return false;
  }

  return false;
}

/**
 * Get mode-specific reminder message
 */
export function getModeReminder(mode: Mode): string {
  if (mode === 'teaching') {
    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 TEACHING MODE ACTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You are in learning mode. Production marketing commands are hidden.

🎓 Available commands:
   /learn-0-0, /learn-0-1, ... (30 modules)

🏭 Switch to production mode: Use /campaign, /content, etc.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
  } else {
    return ''; // Don't show mode reminder in production (it's the default)
  }
}
