/**
 * Utility functions for matching user prompts to relevant marketing patterns
 */

import * as fs from 'fs';
import * as path from 'path';

export interface PatternMetadata {
  category: 'content' | 'strategy' | 'analysis' | 'optimization';
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
}

export interface MatchedPattern {
  name: string;
  category: 'content' | 'strategy' | 'analysis' | 'optimization';
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
 */
export function loadPatternIndex(projectRoot: string): PatternIndex | null {
  const indexPath = path.join(projectRoot, '.claude', 'patterns', 'pattern-index.json');

  if (!fs.existsSync(indexPath)) {
    console.error(`[pattern-matcher] pattern-index.json not found at ${indexPath}`);
    return null;
  }

  try {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    return JSON.parse(indexContent);
  } catch (error) {
    console.error(`[pattern-matcher] Error loading pattern-index.json:`, error);
    return null;
  }
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
      matches.push({
        name: patternName,
        category: metadata.category,
        complexity: metadata.complexity,
        matchReason: matchReasons.join(', '),
        patternPath: `.claude/patterns/${metadata.category}/${patternName}.md`,
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
 * Format pattern suggestions for display in hook reminder (VERBOSE)
 */
export function formatPatternSuggestions(
  patterns: MatchedPattern[],
  patternIndex: PatternIndex | null,
  projectRoot: string
): string {
  if (patterns.length === 0) return '';

  const outputStyle = getOutputStyleState(projectRoot);
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

    // Pattern info
    lines.push(`📋 Pattern: ${pattern.name}`);
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

    // Enforcement reminder
    lines.push('⚠️  Why This Matters:');
    lines.push('   Pattern executes with enforcement (templates + standards + quality gates)');
    lines.push('   ❌ DO NOT read pattern file and implement manually');
    lines.push('   ✅ Use /pattern command for consistent quality');
    lines.push('');
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
 */
export function loadPatternContent(
  patternName: string,
  category: string,
  projectRoot: string
): string | null {
  const patternPath = path.join(
    projectRoot,
    '.claude',
    'patterns',
    category,
    `${patternName}.md`
  );

  if (!fs.existsSync(patternPath)) {
    console.error(`[pattern-matcher] Pattern file not found: ${patternPath}`);
    return null;
  }

  try {
    return fs.readFileSync(patternPath, 'utf-8');
  } catch (error) {
    console.error(`[pattern-matcher] Error loading pattern:`, error);
    return null;
  }
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
