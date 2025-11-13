/**
 * Utility functions for matching user prompts to relevant marketing patterns
 */

import * as fs from 'fs';
import * as path from 'path';

export interface PatternMetadata {
  category: 'content' | 'strategy' | 'analysis' | 'optimization' | 'meta' | 'workflow' | 'bundles';
  complexity: 'simple' | 'medium' | 'complex';
  thinking: 'think' | 'think-hard' | 'ultrathink';
  estimatedTokens: number;
  dependencies: {
    skills: string[];
    knowledgeFiles: string[];
  };
  triggers: {
    keywords: string[];
    intentPatterns: string[];
    negativeKeywords?: string[];  // NEW: Words that prevent matching
  };
  avgExecutionTime: string;
  usageCount: number;
  description?: string;           // NEW: What the pattern does
  exampleArgs?: string;            // NEW: Example usage with args
  requiresMarketingMode?: boolean; // NEW: Only suggest in marketing output style
  minConfidence?: number;          // NEW: Minimum score required (default: 1)
}

export interface OutputStyleState {
  isActive: boolean;
  style: string | null;            // 'marketing-expert' | 'default' | null
  activatedBy: string | null;      // 'demo' | 'command' | 'manual' | null
}

export interface PatternIndex {
  version: string;
  lastUpdated: string;
  totalPatterns: number;
  patterns: Record<string, PatternMetadata>;
  _sourceLocation?: string; // Added internally to track which location patterns came from
}

export interface MatchedPattern {
  name: string;
  category: 'content' | 'strategy' | 'analysis' | 'optimization' | 'meta' | 'workflow' | 'bundles';
  complexity: 'simple' | 'medium' | 'complex';
  matchReason: string;
  patternPath: string;
  score: number;
}

/**
 * Get current output style state from settings.local.json
 */
export function getOutputStyleState(projectRoot: string): OutputStyleState {
  try {
    const settingsPath = path.join(projectRoot, '.claude', 'settings.local.json');
    if (fs.existsSync(settingsPath)) {
      const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
      return {
        isActive: settings.outputStyle === 'marketing-expert',
        style: settings.outputStyle || null,
        activatedBy: settings.outputStyleActivatedBy || null
      };
    }
  } catch (error) {
    console.error('[pattern-matcher] Failed to read output style state:', error);
  }

  return { isActive: false, style: null, activatedBy: null };
}

/**
 * Detect domain context (technical vs marketing vs neutral)
 */
export function detectDomainContext(prompt: string): 'technical' | 'marketing' | 'neutral' {
  const promptLower = prompt.toLowerCase();

  const technicalIndicators = [
    'architecture', 'infrastructure', 'code', 'refactor', 'technical',
    'system', 'api', 'database', 'migration', 'v5', 'v4', 'version',
    'fix', 'bug', 'implementation', 'typescript', 'hook', 'utility',
    'function', 'class', 'interface', 'schema', 'validation'
  ];

  const marketingIndicators = [
    'customer', 'audience', 'conversion', 'roi', 'brand',
    'social media', 'content marketing', 'seo', 'ppc',
    'lead', 'funnel', 'cac', 'ltv', 'engagement'
  ];

  const techScore = technicalIndicators.filter(word =>
    promptLower.includes(word)).length;
  const marketingScore = marketingIndicators.filter(word =>
    promptLower.includes(word)).length;

  if (techScore > marketingScore + 1) return 'technical';
  if (marketingScore > techScore + 1) return 'marketing';
  return 'neutral';
}

/**
 * Load pattern index from pattern-index.json
 * Searches in new architecture locations (core, plugins) and falls back to legacy location
 */
export function loadPatternIndex(projectRoot: string): PatternIndex | null {
  // Check new architecture locations first with their base paths
  const possibleLocations = [
    { indexPath: path.join(projectRoot, 'core', 'infrastructure', 'patterns', 'pattern-index.json'),
      basePath: 'core/infrastructure/patterns' },
    { indexPath: path.join(projectRoot, 'marketing-plugin', 'patterns', 'pattern-index.json'),
      basePath: 'marketing-plugin/patterns' },
    { indexPath: path.join(projectRoot, '.claude', 'patterns', 'pattern-index.json'),
      basePath: '.claude/patterns' } // legacy fallback
  ];

  for (const location of possibleLocations) {
    if (fs.existsSync(location.indexPath)) {
      try {
        const indexContent = fs.readFileSync(location.indexPath, 'utf-8');
        const index: PatternIndex = JSON.parse(indexContent);
        // Add internal metadata about source location
        index._sourceLocation = location.basePath;
        return index;
      } catch (error) {
        console.error(`[pattern-matcher] Error loading pattern-index.json from ${location.indexPath}:`, error);
        // Continue to next location
      }
    }
  }

  // No pattern index found in any location - this is OK, pattern system works without it
  return null;
}

/**
 * Match user prompt to relevant patterns with context awareness
 */
export function matchPatternsToPrompt(
  prompt: string,
  patternIndex: PatternIndex | null,
  projectRoot: string,
  maxPatterns: number = 2
): MatchedPattern[] {
  if (!patternIndex) {
    return [];
  }

  const matches: MatchedPattern[] = [];
  const promptLower = prompt.toLowerCase();

  // NEW: Get output style state and domain context
  const outputStyle = getOutputStyleState(projectRoot);
  const domainContext = detectDomainContext(prompt);

  for (const [patternName, metadata] of Object.entries(patternIndex.patterns)) {
    let score = 0;
    const matchReasons: string[] = [];

    // NEW: Check if pattern requires marketing mode
    if (metadata.requiresMarketingMode && !outputStyle.isActive) {
      continue; // Skip marketing-only patterns when not in marketing mode
    }

    // NEW: Check negative keywords first (early exit if found)
    if (metadata.triggers.negativeKeywords) {
      const hasNegative = metadata.triggers.negativeKeywords.some(keyword =>
        promptLower.includes(keyword.toLowerCase())
      );
      if (hasNegative) {
        continue; // Skip this pattern entirely
      }
    }

    // NEW: Apply domain context penalty for mismatches
    if (domainContext === 'technical' &&
        (metadata.category === 'content' || metadata.category === 'strategy' ||
         metadata.category === 'analysis' || metadata.category === 'optimization')) {
      score -= 2; // Penalty for marketing patterns in technical context
    }

    // Check keyword matches (weight: 1 point per keyword)
    const keywordMatches = metadata.triggers.keywords.filter(keyword =>
      promptLower.includes(keyword.toLowerCase())
    );

    if (keywordMatches.length > 0) {
      score += keywordMatches.length;
      matchReasons.push(`keywords: ${keywordMatches.slice(0, 2).join(', ')}`);
    }

    // Check intent pattern matches (weight: 3 points per pattern)
    for (const pattern of metadata.triggers.intentPatterns) {
      try {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(prompt)) {
          score += 3;
          matchReasons.push('intent pattern match');
          break; // Only count first intent match to avoid over-weighting
        }
      } catch (error) {
        console.error(`[pattern-matcher] Invalid regex pattern: ${pattern}`, error);
      }
    }

    // NEW: Check minimum confidence threshold
    const minConfidence = metadata.minConfidence || 1;
    if (score < minConfidence) {
      continue; // Not confident enough
    }

    // If we have matches, add to results
    if (score > 0) {
      // Use source location from index to build correct path
      const basePath = patternIndex._sourceLocation || '.claude/patterns';
      matches.push({
        name: patternName,
        category: metadata.category,
        complexity: metadata.complexity,
        matchReason: matchReasons.join(', '),
        patternPath: `${basePath}/${metadata.category}/${patternName}.md`,
        score
      });
    }
  }

  // Sort by score descending
  matches.sort((a, b) => b.score - a.score);

  // Return top N matches
  return matches.slice(0, maxPatterns);
}

/**
 * Check if user prompt contains justification for bypassing pattern
 */
export function checkForJustification(prompt: string): boolean {
  const promptLower = prompt.toLowerCase();

  const justificationPhrases = [
    'bypassing pattern because',
    'not using pattern because',
    'skipping pattern because',
    'manual implementation because',
    'alternative approach:',
    'justification:',
    'reason for not using pattern'
  ];

  return justificationPhrases.some(phrase => promptLower.includes(phrase));
}

/**
 * Get enforcement level badge based on complexity
 */
function getEnforcementBadge(complexity: 'simple' | 'medium' | 'complex', hasJustification: boolean): {
  badge: string;
  level: 'SUGGESTED' | 'MANDATORY' | 'BYPASSED';
} {
  if (complexity === 'simple') {
    return { badge: '🟢 SUGGESTED', level: 'SUGGESTED' };
  }

  if (hasJustification) {
    return { badge: '🟡 BYPASSED', level: 'BYPASSED' };
  }

  return { badge: '🔴 MANDATORY', level: 'MANDATORY' };
}

/**
 * Format pattern suggestions for display in hook reminder (VERBOSE with complexity-based enforcement)
 */
export function formatPatternSuggestions(
  patterns: MatchedPattern[],
  patternIndex: PatternIndex | null,
  projectRoot: string,
  userPrompt: string = ''
): string {
  if (patterns.length === 0) return '';

  const outputStyle = getOutputStyleState(projectRoot);
  const hasJustification = checkForJustification(userPrompt);
  const lines: string[] = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ];

  // Header with context
  if (outputStyle.isActive) {
    lines.push(`🎯 PATTERN SUGGESTION (Marketing Mode Active via ${outputStyle.activatedBy})`);
  } else {
    lines.push('🎯 PATTERN SUGGESTION');
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  for (const pattern of patterns) {
    const metadata = patternIndex?.patterns[pattern.name];
    const enforcement = getEnforcementBadge(pattern.complexity, hasJustification);

    // Pattern info with enforcement badge
    lines.push(`${enforcement.badge} Pattern: ${pattern.name}`);
    lines.push(`   Category: ${pattern.category} (${pattern.complexity})`);
    lines.push(`   Location: @${pattern.patternPath}`);
    lines.push('');

    // Match reasons (verbose)
    lines.push('🔍 Match Reasons:');
    const reasons = pattern.matchReason.split(', ');
    reasons.forEach(reason => {
      lines.push(`   • ${reason}`);
    });
    lines.push(`   • Confidence score: ${pattern.score}/10`);
    if (outputStyle.isActive) {
      lines.push(`   • Output style: ${outputStyle.style} (${outputStyle.activatedBy})`);
    }
    lines.push('');

    // Pattern description (if available)
    if (metadata?.description) {
      lines.push('📖 What This Pattern Does:');
      lines.push(`   ${metadata.description}`);
      lines.push('');
    }

    // Usage instructions
    lines.push('⚡ How to Use:');
    lines.push(`   /pattern ${pattern.name}`);
    lines.push('');
    if (metadata?.exampleArgs) {
      lines.push('   OR provide context:');
      lines.push(`   /pattern ${pattern.name} ${metadata.exampleArgs}`);
      lines.push('');
    }

    // Enforcement message based on complexity and justification
    if (enforcement.level === 'SUGGESTED') {
      // Simple patterns - gentle suggestion
      lines.push('💡 RECOMMENDATION:');
      lines.push('   This pattern provides structure and quality gates.');
      lines.push('   You may proceed without it if you have specific reasons.');
      lines.push('');
    } else if (enforcement.level === 'MANDATORY') {
      // Medium/Complex patterns without justification - strong warning
      lines.push('🔴 MANDATORY REQUIREMENT:');
      lines.push('   Medium/complex patterns ensure quality gates for critical workflows.');
      lines.push('');
      lines.push('   To proceed WITHOUT this pattern, include in your prompt:');
      lines.push('   ✓ "Bypassing pattern because..." (explicit justification)');
      lines.push('   ✓ Alternative approach explanation');
      lines.push('   ✓ Risk acknowledgment');
      lines.push('');
      lines.push('   Otherwise: /pattern ' + pattern.name);
      lines.push('');
      lines.push('   ⚠️  POLICY (CLAUDE.md):');
      lines.push('   ❌ DO NOT ignore this pattern - violation of core principles');
      lines.push('   ❌ DO NOT read pattern file and implement manually');
      lines.push('   ✅ MUST use /pattern command for enforcement + quality gates');
      lines.push('');
    } else if (enforcement.level === 'BYPASSED') {
      // Medium/Complex patterns with justification - acknowledged bypass
      lines.push('🟡 PATTERN BYPASS ACKNOWLEDGED:');
      lines.push('   ✓ Justification detected in prompt');
      lines.push('   ⚠️  Proceeding without pattern - quality gates NOT enforced');
      lines.push('   ⚠️  You are responsible for maintaining standards');
      lines.push('');
      lines.push('   Recommended: Use /pattern ' + pattern.name + ' for validated output');
      lines.push('');
    }
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return lines.join('\n');
}

/**
 * Legacy simple formatter (for backward compatibility)
 */
export function formatPatternSuggestion(pattern: MatchedPattern): string {
  const categoryEmoji = {
    content: '📝',
    strategy: '🎯',
    analysis: '📊',
    optimization: '⚡'
  };

  const emoji = categoryEmoji[pattern.category] || '💡';

  return `${emoji} ${pattern.name.replace(/_/g, ' ')} (${pattern.category}, ${pattern.complexity})\n   Pattern: @${pattern.patternPath}`;
}

/**
 * Format multiple pattern suggestions as a combined reminder section
 */
export function formatPatternReminder(patterns: MatchedPattern[]): string {
  if (patterns.length === 0) {
    return '';
  }

  let reminder = '\n🎨 SUGGESTED PATTERNS:\n';

  for (const pattern of patterns) {
    reminder += formatPatternSuggestion(pattern) + '\n';
  }

  return reminder;
}

/**
 * Get pattern category from pattern name by loading metadata
 */
export function getPatternCategory(
  patternName: string,
  patternIndex: PatternIndex | null
): string | null {
  if (!patternIndex || !patternIndex.patterns[patternName]) {
    return null;
  }

  return patternIndex.patterns[patternName].category;
}

/**
 * Load pattern content from file
 * Searches in new architecture locations (core, plugins) and falls back to legacy location
 */
export function loadPatternContent(
  patternName: string,
  category: string,
  projectRoot: string
): string | null {
  // Check new architecture locations first
  const possiblePaths = [
    path.join(projectRoot, 'core', 'infrastructure', 'patterns', category, `${patternName}.md`),
    path.join(projectRoot, 'marketing-plugin', 'patterns', category, `${patternName}.md`),
    path.join(projectRoot, '.claude', 'patterns', category, `${patternName}.md`) // legacy fallback
  ];

  for (const patternPath of possiblePaths) {
    if (fs.existsSync(patternPath)) {
      try {
        return fs.readFileSync(patternPath, 'utf-8');
      } catch (error) {
        console.error(`[pattern-matcher] Error reading pattern from ${patternPath}:`, error);
        // Continue to next location
      }
    }
  }

  // Pattern file not found in any location
  return null;
}

/**
 * Validate if a file was created using a pattern (checks for pattern metadata in content)
 */
export function isPatternOutput(filePath: string, fileContent: string): boolean {
  // Patterns typically have structured OUTPUT sections
  // Check for common pattern output markers
  const patternMarkers = [
    '<!-- Generated using pattern:',
    '# Pattern Output:',
    'Pattern: ',
    '**Pattern:**'
  ];

  return patternMarkers.some(marker => fileContent.includes(marker));
}

/**
 * Extract pattern name from file content if it was created using a pattern
 */
export function getPatternNameFromFile(fileContent: string): string | null {
  // Try to extract pattern name from common markers
  const patterns = [
    /<!-- Generated using pattern:\s*([a-z_]+)\s*-->/i,
    /# Pattern Output:\s*([a-z_]+)/i,
    /Pattern:\s*([a-z_]+)/i,
    /\*\*Pattern:\*\*\s*([a-z_]+)/i
  ];

  for (const pattern of patterns) {
    const match = fileContent.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Increment usage count for a pattern
 */
export function incrementPatternUsage(
  patternName: string,
  projectRoot: string
): boolean {
  const indexPath = path.join(projectRoot, '.claude', 'patterns', 'pattern-index.json');

  try {
    const index = loadPatternIndex(projectRoot);
    if (!index || !index.patterns[patternName]) {
      return false;
    }

    index.patterns[patternName].usageCount += 1;

    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`[pattern-matcher] Error incrementing usage count:`, error);
    return false;
  }
}

/**
 * Get pattern statistics from index
 */
export function getPatternStats(patternIndex: PatternIndex | null): {
  totalPatterns: number;
  byCategory: Record<string, number>;
  byComplexity: Record<string, number>;
  totalUsage: number;
  mostUsed: Array<{ name: string; count: number }>;
} | null {
  if (!patternIndex) {
    return null;
  }

  const stats = {
    totalPatterns: patternIndex.totalPatterns,
    byCategory: {} as Record<string, number>,
    byComplexity: {} as Record<string, number>,
    totalUsage: 0,
    mostUsed: [] as Array<{ name: string; count: number }>
  };

  const usageCounts: Array<{ name: string; count: number }> = [];

  for (const [name, metadata] of Object.entries(patternIndex.patterns)) {
    // Count by category
    stats.byCategory[metadata.category] = (stats.byCategory[metadata.category] || 0) + 1;

    // Count by complexity
    stats.byComplexity[metadata.complexity] = (stats.byComplexity[metadata.complexity] || 0) + 1;

    // Track usage
    stats.totalUsage += metadata.usageCount;
    usageCounts.push({ name, count: metadata.usageCount });
  }

  // Sort by usage and get top 5
  stats.mostUsed = usageCounts
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return stats;
}
