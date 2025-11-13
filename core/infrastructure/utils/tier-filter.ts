/**
 * Tier Filtering Utility
 *
 * Implements tiered component visibility and filtering logic.
 *
 * Tier 1 (Core): Always visible - handles 70-80% of requests
 * Tier 2 (Specialized): On-demand activation via keywords
 * Tier 3 (Expert): Gated, requires explicit invocation
 * Tier 4 (Teaching): Separate mode, completely isolated
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Types
// ============================================================================

interface TierConfig {
  version: string;
  tiers: {
    [key: string]: {
      name: string;
      description: string;
      visibility: 'always' | 'on-demand' | 'gated' | 'mode-specific';
      keywords: string[];
    };
  };
  suggestionRules: {
    tier2?: {
      message: string;
      conditions: string[];
    };
    tier3?: {
      message: string;
      conditions: string[];
      costWarning: boolean;
    };
  };
  visibilityMatrix: {
    productionMode: Record<string, string>;
    teachingMode: Record<string, string>;
  };
}

interface SystemRegistry {
  version: string;
  agents: Array<{ name: string; tier: number }>;
  patterns: Array<{ name: string; tier: number }>;
  skills: Array<{ name: string; tier: number }>;
  commands: Array<{ name: string; tier: number }>;
}

interface TierFilterResult {
  visibleAgents: string[];
  visiblePatterns: string[];
  visibleSkills: string[];
  visibleCommands: string[];
  suggestedTier?: number;
  suggestionMessage?: string;
}

// ============================================================================
// Configuration Loading
// ============================================================================

let tierConfig: TierConfig | null = null;
let systemRegistry: SystemRegistry | null = null;

function loadTierConfig(): TierConfig {
  if (tierConfig) return tierConfig;

  const configPath = path.join(process.cwd(), '.claude/tier-config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error('tier-config.json not found');
  }

  tierConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  return tierConfig!;
}

function loadSystemRegistry(): SystemRegistry {
  if (systemRegistry) return systemRegistry;

  const registryPath = path.join(process.cwd(), 'system-registry.json');
  if (!fs.existsSync(registryPath)) {
    throw new Error('system-registry.json not found');
  }

  systemRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
  return systemRegistry!;
}

// ============================================================================
// Tier Detection
// ============================================================================

/**
 * Detect which tier should be activated based on user prompt
 */
export function detectRequiredTier(prompt: string): number {
  const config = loadTierConfig();
  const lowerPrompt = prompt.toLowerCase();

  // Check for Tier 4 (Teaching) keywords
  const tier4Keywords = config.tiers['4']?.keywords || [];
  if (tier4Keywords.some(kw => lowerPrompt.includes(kw.toLowerCase()))) {
    return 4;
  }

  // Check for Tier 3 (Expert) keywords
  const tier3Keywords = config.tiers['3']?.keywords || [];
  if (tier3Keywords.some(kw => lowerPrompt.includes(kw.toLowerCase()))) {
    return 3;
  }

  // Check for Tier 2 (Specialized) keywords
  const tier2Keywords = config.tiers['2']?.keywords || [];
  if (tier2Keywords.some(kw => lowerPrompt.includes(kw.toLowerCase()))) {
    return 2;
  }

  // Default to Tier 1 (Core)
  return 1;
}

// ============================================================================
// Tier Filtering
// ============================================================================

/**
 * Filter components based on tier visibility rules
 */
export function filterComponentsByTier(
  prompt: string,
  mode: 'production' | 'teaching' = 'production'
): TierFilterResult {
  const config = loadTierConfig();
  const registry = loadSystemRegistry();
  const requiredTier = detectRequiredTier(prompt);

  // Get visibility rules for current mode
  const visibilityRules = mode === 'production'
    ? config.visibilityMatrix.productionMode
    : config.visibilityMatrix.teachingMode;

  // Determine which tiers should be visible
  const visibleTiers: number[] = [];

  // Tier 1 (Core) - always visible in production
  if (visibilityRules.tier1 === 'always') {
    visibleTiers.push(1);
  }

  // Tier 2 (Specialized) - visible if keywords match or always in production
  if (visibilityRules.tier2 === 'on-demand' && requiredTier >= 2) {
    visibleTiers.push(2);
  }

  // Tier 3 (Expert) - only if explicitly requested
  if (visibilityRules.tier3 === 'explicit-only' && requiredTier >= 3) {
    visibleTiers.push(3);
  }

  // Tier 4 (Teaching) - only in teaching mode
  if (mode === 'teaching' && visibilityRules.tier4 === 'always') {
    visibleTiers.push(4);
  }

  // Filter components
  const result: TierFilterResult = {
    visibleAgents: registry.agents
      .filter(a => visibleTiers.includes(a.tier))
      .map(a => a.name),
    visiblePatterns: registry.patterns
      .filter(p => visibleTiers.includes(p.tier))
      .map(p => p.name),
    visibleSkills: registry.skills
      .filter(s => visibleTiers.includes(s.tier))
      .map(s => s.name),
    visibleCommands: registry.commands
      .filter(c => visibleTiers.includes(c.tier))
      .map(c => c.name),
  };

  // Add suggestions if Tier 2 keywords detected but user might not know about it
  if (requiredTier === 2 && config.suggestionRules.tier2) {
    result.suggestedTier = 2;
    result.suggestionMessage = config.suggestionRules.tier2.message;
  }

  // Add cost warning if Tier 3 detected
  if (requiredTier === 3 && config.suggestionRules.tier3) {
    result.suggestedTier = 3;
    result.suggestionMessage = config.suggestionRules.tier3.message;
  }

  return result;
}

// ============================================================================
// Component Lookup
// ============================================================================

/**
 * Get tier for a specific component
 */
export function getComponentTier(
  componentName: string,
  componentType: 'agent' | 'pattern' | 'skill' | 'command'
): number | null {
  const registry = loadSystemRegistry();

  const components = {
    agent: registry.agents,
    pattern: registry.patterns,
    skill: registry.skills,
    command: registry.commands,
  }[componentType];

  const component = components.find(c => c.name === componentName);
  return component?.tier || null;
}

/**
 * Check if a component is visible in current tier context
 */
export function isComponentVisible(
  componentName: string,
  componentType: 'agent' | 'pattern' | 'skill' | 'command',
  activeTiers: number[]
): boolean {
  const tier = getComponentTier(componentName, componentType);
  return tier !== null && activeTiers.includes(tier);
}

// ============================================================================
// Tier Statistics
// ============================================================================

/**
 * Get summary of components by tier
 */
export function getTierSummary() {
  const registry = loadSystemRegistry();
  const config = loadTierConfig();

  return {
    tier1: {
      name: config.tiers['1'].name,
      agents: registry.agents.filter(a => a.tier === 1).length,
      patterns: registry.patterns.filter(p => p.tier === 1).length,
      skills: registry.skills.filter(s => s.tier === 1).length,
      commands: registry.commands.filter(c => c.tier === 1).length,
    },
    tier2: {
      name: config.tiers['2'].name,
      agents: registry.agents.filter(a => a.tier === 2).length,
      patterns: registry.patterns.filter(p => p.tier === 2).length,
      skills: registry.skills.filter(s => s.tier === 2).length,
      commands: registry.commands.filter(c => c.tier === 2).length,
    },
    tier3: {
      name: config.tiers['3'].name,
      agents: registry.agents.filter(a => a.tier === 3).length,
      patterns: registry.patterns.filter(p => p.tier === 3).length,
      skills: registry.skills.filter(s => s.tier === 3).length,
      commands: registry.commands.filter(c => c.tier === 3).length,
    },
    tier4: {
      name: config.tiers['4'].name,
      agents: registry.agents.filter(a => a.tier === 4).length,
      patterns: registry.patterns.filter(p => p.tier === 4).length,
      skills: registry.skills.filter(s => s.tier === 4).length,
      commands: registry.commands.filter(c => c.tier === 4).length,
    },
  };
}

// ============================================================================
// Suggestion Formatting
// ============================================================================

/**
 * Format tier suggestion message for display
 */
export function formatTierSuggestion(tier: number): string {
  const config = loadTierConfig();

  if (tier === 2 && config.suggestionRules.tier2) {
    return `\n${config.suggestionRules.tier2.message}\n`;
  }

  if (tier === 3 && config.suggestionRules.tier3) {
    return `\n${config.suggestionRules.tier3.message}\n`;
  }

  return '';
}
