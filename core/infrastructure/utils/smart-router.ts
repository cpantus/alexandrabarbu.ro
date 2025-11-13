/**
 * Smart Component Router
 *
 * Analyzes user requests and automatically suggests:
 * - Complexity level (simple/medium/complex)
 * - Appropriate tier (1/2/3)
 * - Recommended components (agents, patterns, skills)
 * - Cost estimate
 * - Mode (Quick/Standard/Expert)
 *
 * Goal: Reduce decision paralysis and optimize component selection
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Types
// ============================================================================

export type Complexity = 'simple' | 'medium' | 'complex';
export type Mode = 'quick' | 'standard' | 'expert';

export interface RoutingDecision {
  complexity: Complexity;
  recommendedTier: number;
  recommendedMode: Mode;
  costEstimate: {
    min: number;
    max: number;
    currency: 'USD';
  };
  duration: {
    min: number; // minutes
    max: number;
  };
  recommendations: {
    agents?: string[];
    patterns?: string[];
    skills?: string[];
    commands?: string[];
  };
  reasoning: string;
  confidence: number; // 0-1
}

interface ComplexityIndicators {
  simple: string[];
  medium: string[];
  complex: string[];
}

interface SystemRegistry {
  agents: Array<{ name: string; tier: number }>;
  patterns: Array<{ name: string; tier: number; category?: string }>;
  skills: Array<{ name: string; tier: number }>;
  commands: Array<{ name: string; tier: number }>;
}

// ============================================================================
// Configuration
// ============================================================================

const COMPLEXITY_INDICATORS: ComplexityIndicators = {
  simple: [
    'post', 'tweet', 'headline', 'subject line', 'tagline', 'cta',
    'button text', 'alt text', 'caption', 'status', 'quick', 'fast',
    'short', 'brief', 'single', 'one', 'simple', 'variant', 'variants',
    'version', 'versions', 'option', 'options', 'alternative', 'alternatives'
  ],
  medium: [
    'campaign', 'strategy', 'plan', 'analysis', 'analyze', 'audit',
    'review', 'research', 'report', 'email campaign', 'blog', 'article',
    'content calendar', 'funnel', 'cohort', 'segment', 'persona',
    'value prop', 'positioning', 'messaging'
  ],
  complex: [
    'launch', 'orchestrate', 'comprehensive', 'multi-channel', 'integrated',
    'fleet', 'multiple agents', 'full campaign', 'end-to-end', 'complete',
    'gtm', 'go-to-market', 'transformation', 'overhaul', 'rebuild',
    'background', 'async', 'parallel'
  ]
};

const COST_ESTIMATES = {
  simple: { min: 0.01, max: 0.05 },    // Quick tasks
  medium: { min: 0.15, max: 0.75 },    // Standard work
  complex: { min: 5.00, max: 20.00 }   // Multi-agent operations
};

const DURATION_ESTIMATES = {
  simple: { min: 0.5, max: 3 },        // 30s - 3min
  medium: { min: 10, max: 45 },        // 10-45min
  complex: { min: 30, max: 120 }       // 30min - 2hr
};

// ============================================================================
// Complexity Detection
// ============================================================================

/**
 * Detect task complexity based on keywords and patterns
 */
export function detectComplexity(prompt: string): Complexity {
  const lowerPrompt = prompt.toLowerCase();

  // Count matches for each complexity level
  const complexMatches = COMPLEXITY_INDICATORS.complex.filter(kw =>
    lowerPrompt.includes(kw.toLowerCase())
  ).length;

  const mediumMatches = COMPLEXITY_INDICATORS.medium.filter(kw =>
    lowerPrompt.includes(kw.toLowerCase())
  ).length;

  const simpleMatches = COMPLEXITY_INDICATORS.simple.filter(kw =>
    lowerPrompt.includes(kw.toLowerCase())
  ).length;

  // Additional heuristics
  const wordCount = prompt.split(/\s+/).length;

  // Detect multi-deliverable campaigns (e.g., "10 posts, 3 articles")
  // Must have number directly adjacent to deliverable type (not "5 variants FOR email")
  const hasMultipleDeliverables = /\d+\s+(posts|emails|articles|campaigns|deliverables)(?:\s|,|and|$)/i.test(prompt);

  // Check if it's just requesting variants (simple task)
  const isSimpleVariants = /variants?|versions?|options?|alternatives?/i.test(prompt);

  const hasMultiple = hasMultipleDeliverables && !isSimpleVariants;
  const hasCoordination = /coordinate|orchestrate|multiple agents|fleet/i.test(prompt);

  // Decision logic with priority scoring
  // Complex takes priority only if it has strong signals
  if ((complexMatches > simpleMatches) || hasCoordination || (hasMultiple && wordCount > 50)) {
    return 'complex';
  }

  // Medium takes priority if it has more matches than simple
  if ((mediumMatches > simpleMatches) || (hasMultiple && wordCount > 20) || (wordCount > 30 && simpleMatches === 0)) {
    return 'medium';
  }

  return 'simple';
}

/**
 * Map complexity to recommended tier
 */
export function complexityToTier(complexity: Complexity): number {
  switch (complexity) {
    case 'simple':
      return 1; // Tier 1 - Core components
    case 'medium':
      return 2; // Tier 2 - Specialized components
    case 'complex':
      return 3; // Tier 3 - Expert/orchestration
  }
}

/**
 * Map complexity to recommended mode
 */
export function complexityToMode(complexity: Complexity): Mode {
  switch (complexity) {
    case 'simple':
      return 'quick';
    case 'medium':
      return 'standard';
    case 'complex':
      return 'expert';
  }
}

// ============================================================================
// Cost Estimation
// ============================================================================

/**
 * Estimate cost based on complexity
 */
export function estimateCost(complexity: Complexity): { min: number; max: number; currency: 'USD' } {
  const estimate = COST_ESTIMATES[complexity];
  return { ...estimate, currency: 'USD' };
}

/**
 * Estimate duration based on complexity
 */
export function estimateDuration(complexity: Complexity): { min: number; max: number } {
  return DURATION_ESTIMATES[complexity];
}

// ============================================================================
// Component Recommendations
// ============================================================================

/**
 * Load system registry
 */
function loadSystemRegistry(): SystemRegistry | null {
  try {
    const registryPath = path.join(process.cwd(), 'system-registry.json');
    if (!fs.existsSync(registryPath)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Recommend specific components based on prompt content
 */
export function recommendComponents(
  prompt: string,
  tier: number
): {
  agents?: string[];
  patterns?: string[];
  skills?: string[];
  commands?: string[];
} {
  const registry = loadSystemRegistry();
  if (!registry) {
    return {};
  }

  const lowerPrompt = prompt.toLowerCase();
  const recommendations: {
    agents?: string[];
    patterns?: string[];
    skills?: string[];
    commands?: string[];
  } = {};

  // Agent recommendations based on keywords
  const agentKeywords: Record<string, string[]> = {
    'marketing-director': ['strategy', 'campaign', 'plan', 'coordinate'],
    'copywriter': ['copy', 'write', 'post', 'email', 'headline'],
    'analyst': ['analyze', 'data', 'metrics', 'insights', 'report'],
    'growth-hacker': ['growth', 'experiment', 'viral', 'activation'],
    'llm-seo-expert': ['seo', 'search', 'optimization', 'keywords'],
    'brand-strategist': ['brand', 'positioning', 'messaging', 'voice'],
    'content-strategist': ['content', 'calendar', 'editorial', 'blog'],
    'automation-expert': ['automation', 'workflow', 'integrate', 'automate']
  };

  const suggestedAgents: string[] = [];
  for (const [agent, keywords] of Object.entries(agentKeywords)) {
    if (keywords.some(kw => lowerPrompt.includes(kw))) {
      const agentData = registry.agents.find(a => a.name === agent);
      if (agentData && agentData.tier <= tier) {
        suggestedAgents.push(agent);
      }
    }
  }

  if (suggestedAgents.length > 0) {
    recommendations.agents = suggestedAgents.slice(0, 3); // Top 3
  }

  // Pattern recommendations based on task type
  const patternKeywords: Record<string, string[]> = {
    'create_linkedin_post': ['linkedin', 'post', 'social post'],
    'create_email_campaign': ['email', 'email campaign', 'newsletter'],
    'create_campaign_plan': ['campaign plan', 'campaign strategy'],
    'write_blog_article': ['blog', 'article', 'long-form'],
    'extract_insights': ['insights', 'analyze data', 'data analysis'],
    'improve_copy': ['improve', 'optimize copy', 'better copy'],
    'generate_variants': ['variants', 'variations', 'a/b test', 'test'],
    'funnel_analysis': ['funnel', 'conversion', 'drop-off'],
    'competitive_analysis': ['competitive', 'competitor', 'competition'],
    'cohort_analysis': ['cohort', 'retention', 'churn']
  };

  const suggestedPatterns: string[] = [];
  for (const [pattern, keywords] of Object.entries(patternKeywords)) {
    if (keywords.some(kw => lowerPrompt.includes(kw))) {
      const patternData = registry.patterns.find(p => p.name === pattern);
      if (patternData && patternData.tier <= tier) {
        suggestedPatterns.push(pattern);
      }
    }
  }

  if (suggestedPatterns.length > 0) {
    recommendations.patterns = suggestedPatterns.slice(0, 2); // Top 2
  }

  // Command recommendations
  if (tier >= 3 && lowerPrompt.includes('orchestrate')) {
    recommendations.commands = ['/orchestrate'];
  } else if (tier >= 2) {
    if (lowerPrompt.includes('seo')) recommendations.commands = ['/seo'];
    if (lowerPrompt.includes('growth')) recommendations.commands = ['/growth'];
    if (lowerPrompt.includes('automate')) recommendations.commands = ['/automate'];
  }

  return recommendations;
}

// ============================================================================
// Routing Decision
// ============================================================================

/**
 * Generate complete routing decision with recommendations
 */
export function routeRequest(prompt: string): RoutingDecision {
  // Detect complexity
  const complexity = detectComplexity(prompt);

  // Map to tier and mode
  const recommendedTier = complexityToTier(complexity);
  const recommendedMode = complexityToMode(complexity);

  // Estimate cost and duration
  const costEstimate = estimateCost(complexity);
  const duration = estimateDuration(complexity);

  // Get component recommendations
  const recommendations = recommendComponents(prompt, recommendedTier);

  // Calculate confidence based on keyword matches
  const lowerPrompt = prompt.toLowerCase();
  const allIndicators = [
    ...COMPLEXITY_INDICATORS.simple,
    ...COMPLEXITY_INDICATORS.medium,
    ...COMPLEXITY_INDICATORS.complex
  ];
  const matchCount = allIndicators.filter(kw => lowerPrompt.includes(kw)).length;
  const confidence = Math.min(0.95, 0.5 + (matchCount * 0.1));

  // Generate reasoning
  const reasoning = generateReasoning(complexity, recommendedTier, recommendations);

  return {
    complexity,
    recommendedTier,
    recommendedMode,
    costEstimate,
    duration,
    recommendations,
    reasoning,
    confidence
  };
}

/**
 * Generate human-readable reasoning for the routing decision
 */
function generateReasoning(
  complexity: Complexity,
  tier: number,
  recommendations: any
): string {
  const reasons: string[] = [];

  // Complexity reasoning
  if (complexity === 'simple') {
    reasons.push('Single deliverable, quick task');
  } else if (complexity === 'medium') {
    reasons.push('Multi-step task requiring research and strategy');
  } else {
    reasons.push('Complex operation requiring coordination or multiple agents');
  }

  // Tier reasoning
  if (tier === 1) {
    reasons.push('Core components sufficient');
  } else if (tier === 2) {
    reasons.push('Specialized capabilities needed');
  } else {
    reasons.push('Expert-level orchestration required');
  }

  // Component reasoning
  if (recommendations.agents && recommendations.agents.length > 0) {
    reasons.push(`Suggested agents: ${recommendations.agents.join(', ')}`);
  }

  if (recommendations.patterns && recommendations.patterns.length > 0) {
    reasons.push(`Recommended patterns: ${recommendations.patterns.join(', ')}`);
  }

  return reasons.join('. ');
}

// ============================================================================
// Formatting
// ============================================================================

/**
 * Format routing decision for display
 */
export function formatRoutingDecision(decision: RoutingDecision): string {
  const lines: string[] = [];

  lines.push('\n🎯 SMART ROUTING ANALYSIS');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Complexity & Mode
  lines.push(`📊 Complexity: ${decision.complexity.toUpperCase()}`);
  lines.push(`⚡ Mode: ${decision.recommendedMode}`);
  lines.push(`🎚️  Tier: ${decision.recommendedTier}\n`);

  // Cost & Duration
  lines.push(`💰 Estimated Cost: $${decision.costEstimate.min.toFixed(2)}-$${decision.costEstimate.max.toFixed(2)}`);
  lines.push(`⏱️  Duration: ${decision.duration.min}-${decision.duration.max} minutes\n`);

  // Recommendations
  if (Object.keys(decision.recommendations).length > 0) {
    lines.push('💡 Recommended Components:');

    if (decision.recommendations.agents && decision.recommendations.agents.length > 0) {
      lines.push(`   Agents: ${decision.recommendations.agents.join(', ')}`);
    }

    if (decision.recommendations.patterns && decision.recommendations.patterns.length > 0) {
      lines.push(`   Patterns: ${decision.recommendations.patterns.map(p => `/pattern ${p}`).join(', ')}`);
    }

    if (decision.recommendations.commands && decision.recommendations.commands.length > 0) {
      lines.push(`   Commands: ${decision.recommendations.commands.join(', ')}`);
    }

    lines.push('');
  }

  // Reasoning
  lines.push(`📝 Reasoning: ${decision.reasoning}`);
  lines.push(`✅ Confidence: ${Math.round(decision.confidence * 100)}%\n`);

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return lines.join('\n');
}

/**
 * Format compact routing summary (one-liner)
 */
export function formatCompactRouting(decision: RoutingDecision): string {
  return `🎯 ${decision.complexity} task → Tier ${decision.recommendedTier} (${decision.recommendedMode} mode) | $${decision.costEstimate.min.toFixed(2)}-${decision.costEstimate.max.toFixed(2)}, ${decision.duration.min}-${decision.duration.max}min`;
}
