/**
 * Adaptive Context Loader v1.0
 *
 * Automatically loads context at the appropriate tier based on:
 * - Model being used (haiku/sonnet/opus)
 * - Task complexity
 * - Explicit user preferences
 *
 * Tier Mapping:
 * - Haiku: Card/Abstract versions (minimal context, fast)
 * - Sonnet: Quick reference versions (balanced)
 * - Opus: Full versions (comprehensive context)
 */

export interface ContextTier {
  name: 'minimal' | 'quick' | 'full';
  description: string;
  personas: 'card' | 'quick' | 'full';
  skills: 'abstract' | 'quick' | 'full';
  patterns: 'id-only' | 'quick' | 'full';
  mcpProfile: string;
}

export interface AdaptiveConfig {
  model: 'haiku' | 'sonnet' | 'opus';
  taskComplexity?: 'simple' | 'medium' | 'complex';
  explicitTier?: 'minimal' | 'quick' | 'full';
}

// Context tier definitions
export const CONTEXT_TIERS: Record<string, ContextTier> = {
  minimal: {
    name: 'minimal',
    description: 'Ultra-fast loading with cards and abstracts only',
    personas: 'card',
    skills: 'abstract',
    patterns: 'id-only',
    mcpProfile: 'content-minimal'
  },
  quick: {
    name: 'quick',
    description: 'Balanced loading with quick references',
    personas: 'quick',
    skills: 'quick',
    patterns: 'quick',
    mcpProfile: 'content-standard'
  },
  full: {
    name: 'full',
    description: 'Comprehensive loading for complex tasks',
    personas: 'full',
    skills: 'full',
    patterns: 'full',
    mcpProfile: 'analytics-detailed'
  }
};

// Model-to-tier mapping (default)
export const MODEL_TIER_MAP: Record<string, ContextTier> = {
  haiku: CONTEXT_TIERS.minimal,
  sonnet: CONTEXT_TIERS.quick,
  opus: CONTEXT_TIERS.full
};

/**
 * Determines the appropriate context tier based on model and task
 */
export function determineContextTier(config: AdaptiveConfig): ContextTier {
  // Explicit tier overrides everything
  if (config.explicitTier) {
    return CONTEXT_TIERS[config.explicitTier];
  }

  // Task complexity can bump tier up
  if (config.taskComplexity === 'complex' && config.model === 'haiku') {
    return CONTEXT_TIERS.quick; // Bump haiku up for complex tasks
  }

  if (config.taskComplexity === 'complex' && config.model === 'sonnet') {
    return CONTEXT_TIERS.full; // Bump sonnet up for complex tasks
  }

  // Default: use model tier map
  return MODEL_TIER_MAP[config.model];
}

/**
 * Resolves the actual file path for a given resource at a specific tier
 */
export function resolveResourcePath(
  resourceType: 'persona' | 'skill' | 'pattern',
  resourceName: string,
  tier: ContextTier
): string {
  const basePath = '.claude';

  switch (resourceType) {
    case 'persona':
      if (tier.personas === 'card') {
        // Card version (e.g., strategic-sarah-card.md)
        return `${basePath}/skills/resources/${resourceName}-card.md`;
      } else if (tier.personas === 'quick') {
        // Quick version doesn't exist for personas, fall back to card
        return `${basePath}/skills/resources/${resourceName}-card.md`;
      } else {
        // Full version (e.g., strategic-sarah.md)
        return `${basePath}/skills/resources/${resourceName}.md`;
      }

    case 'skill':
      if (tier.skills === 'abstract' || tier.skills === 'quick') {
        // Quick version (e.g., campaign-strategy-quick.md)
        return `${basePath}/skills/resources/${resourceName}-quick.md`;
      } else {
        // Full version (e.g., campaign-strategy.md)
        return `${basePath}/skills/${resourceName}.md`;
      }

    case 'pattern':
      // Patterns don't have tiers yet - always full
      // Future: Could implement pattern bundling here
      return `${basePath}/patterns/${resourceName}.md`;

    default:
      throw new Error(`Unknown resource type: ${resourceType}`);
  }
}

/**
 * Generates loading instructions for Claude based on tier
 */
export function generateLoadingInstructions(
  tier: ContextTier,
  resources: {
    personas?: string[];
    skills?: string[];
    patterns?: string[];
  }
): string {
  let instructions = `# Adaptive Context Loading (${tier.name} tier)\n\n`;
  instructions += `**Context tier:** ${tier.description}\n`;
  instructions += `**MCP Profile:** ${tier.mcpProfile}\n\n`;

  if (resources.personas && resources.personas.length > 0) {
    instructions += `**Personas (${tier.personas} version):**\n`;
    resources.personas.forEach(p => {
      const path = resolveResourcePath('persona', p, tier);
      instructions += `- @${path}\n`;
    });
    instructions += '\n';
  }

  if (resources.skills && resources.skills.length > 0) {
    instructions += `**Skills (${tier.skills} version):**\n`;
    resources.skills.forEach(s => {
      const path = resolveResourcePath('skill', s, tier);
      instructions += `- @${path}\n`;
    });
    instructions += '\n';
  }

  if (resources.patterns && resources.patterns.length > 0) {
    instructions += `**Patterns (${tier.patterns} version):**\n`;
    resources.patterns.forEach(p => {
      const path = resolveResourcePath('pattern', p, tier);
      instructions += `- @${path}\n`;
    });
    instructions += '\n';
  }

  if (tier.name === 'minimal') {
    instructions += '**Note:** Using minimal context for speed. Request full context if needed.\n';
  } else if (tier.name === 'quick') {
    instructions += '**Note:** Using quick references for balance. Full context available on request.\n';
  }

  return instructions;
}

/**
 * Detects task complexity from user prompt
 */
export function detectTaskComplexity(prompt: string): 'simple' | 'medium' | 'complex' {
  const promptLower = prompt.toLowerCase();

  // Complex indicators
  const complexIndicators = [
    'comprehensive', 'detailed analysis', 'full audit',
    'strategic plan', 'multi-channel', 'campaign',
    'research', 'competitive analysis', 'market research'
  ];

  // Simple indicators
  const simpleIndicators = [
    'quick', 'simple', 'short', 'one-liner',
    'tweet', 'single post', 'headline only'
  ];

  // Check for complexity indicators
  const hasComplexIndicators = complexIndicators.some(ind => promptLower.includes(ind));
  const hasSimpleIndicators = simpleIndicators.some(ind => promptLower.includes(ind));

  if (hasComplexIndicators) return 'complex';
  if (hasSimpleIndicators) return 'simple';

  // Check prompt length
  if (prompt.length > 500) return 'complex';
  if (prompt.length < 100) return 'simple';

  return 'medium';
}

/**
 * Main adaptive loading function
 * Called by user-prompt-submit.ts hook
 */
export function adaptiveLoad(config: AdaptiveConfig): {
  tier: ContextTier;
  instructions: string;
  tokenEstimate: number;
} {
  const tier = determineContextTier(config);

  // Token estimates per tier (rough)
  const tokenEstimates: Record<string, number> = {
    minimal: 2000,  // Cards + abstracts
    quick: 5000,    // Quick references
    full: 15000     // Full context
  };

  return {
    tier,
    instructions: generateLoadingInstructions(tier, {}),
    tokenEstimate: tokenEstimates[tier.name]
  };
}

// Export types and functions
export default {
  determineContextTier,
  resolveResourcePath,
  generateLoadingInstructions,
  detectTaskComplexity,
  adaptiveLoad,
  CONTEXT_TIERS,
  MODEL_TIER_MAP
};
