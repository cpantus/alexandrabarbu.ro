
/**
 * UserPromptSubmit Hook
 *
 * Runs BEFORE Claude sees the user's prompt.
 * Analyzes prompt and injects skill activation reminders.
 *
 * This enables the Skills System v2.0 auto-activation feature.
 */

import * as path from 'path';
import { loadSkillRules, matchSkillsToPrompt, deduplicateSkills } from './utils/skill-matcher';
import { loadPatternIndex, matchPatternsToPrompt, formatPatternSuggestions, checkForJustification } from './utils/pattern-matcher';
import { loadDocsIndex, matchDocsToPrompt, loadDocContent, formatDocsForInjection, DocsCache } from './utils/docs-matcher';
import { formatCombinedActivationReminder, SkillActivation, PatternSuggestion } from './utils/formatter';
import { detectTaskComplexity, determineContextTier, CONTEXT_TIERS } from './utils/adaptive-loader';
import { isCached, addToCache, getCacheStats, recordCacheHit } from './utils/context-cache';
import { detectMode, shouldFilterSkill, shouldFilterPattern, getModeReminder } from './utils/mode-detector';
import { detectRequiredTier, filterComponentsByTier, formatTierSuggestion } from './utils/tier-filter';
import { routeRequest, formatRoutingDecision, formatCompactRouting } from './utils/smart-router';

// Global cache for loaded documentation (persists across hook invocations)
const docsCache = new DocsCache();

// Cache for skill rules and pattern index (persists across invocations)
// Optimization: 20-30ms faster per invocation (pattern compilation is expensive)
let cachedSkillRules: { data: any; timestamp: number } | null = null;
let cachedPatternIndex: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 60000; // 1 minute

/**
 * Get cached skill rules (or load if cache expired)
 */
function getSkillRules(projectRoot: string): any {
  if (!cachedSkillRules || Date.now() - cachedSkillRules.timestamp > CACHE_TTL) {
    cachedSkillRules = {
      data: loadSkillRules(projectRoot),
      timestamp: Date.now()
    };
  }
  return cachedSkillRules.data;
}

/**
 * Get cached pattern index (or load if cache expired)
 */
function getPatternIndex(projectRoot: string): any {
  if (!cachedPatternIndex || Date.now() - cachedPatternIndex.timestamp > CACHE_TTL) {
    cachedPatternIndex = {
      data: loadPatternIndex(projectRoot),
      timestamp: Date.now()
    };
  }
  return cachedPatternIndex.data;
}

/**
 * Main hook function
 */
async function main() {
  try {
    // Get user prompt from stdin
    const prompt = await readStdin();

    if (!prompt || prompt.trim().length === 0) {
      // No prompt to analyze
      process.exit(0);
    }

    // Short-circuit for trivial prompts (don't need skill/pattern matching)
    // Optimization: 15-20% of prompts skip expensive pattern matching
    const promptLower = prompt.toLowerCase().trim();
    if (promptLower.length < 10 ||
        /^(hi|hello|hey|thanks?|thank you|bye|goodbye|what time|help|\?)$/i.test(promptLower)) {
      process.exit(0);
    }

    // Get project root (hooks are in core/infrastructure/hooks/, so go up 3 dirs)
    const projectRoot = path.resolve(__dirname, '../../..');

    // Detect mode (teaching vs production)
    const modeDetection = detectMode(prompt);

    // Detect required tier based on prompt keywords
    const requiredTier = detectRequiredTier(prompt);

    // Get tier-filtered components
    const tierFilter = filterComponentsByTier(prompt, modeDetection.mode);

    // Smart routing analysis (optional, controlled by environment variable)
    const enableSmartRouting = process.env.ENABLE_SMART_ROUTING === 'true';
    let routingDecision = null;
    if (enableSmartRouting) {
      routingDecision = routeRequest(prompt);
    }

    // Load skill rules (cached for 1 minute)
    const skillRules = getSkillRules(projectRoot);

    if (Object.keys(skillRules).length === 0) {
      // No skill rules configured
      process.exit(0);
    }

    // Match skills to prompt
    const matchedSkills = matchSkillsToPrompt(prompt, skillRules, projectRoot, 3);

    // Load pattern index and match patterns (cached for 1 minute, with output style awareness)
    const patternIndex = getPatternIndex(projectRoot);
    const matchedPatterns = matchPatternsToPrompt(prompt, patternIndex, projectRoot, 2);

    // Load docs index and match documentation (for auto-loading)
    const docsIndex = loadDocsIndex(projectRoot);
    const matchedDocs = matchDocsToPrompt(prompt, docsIndex, 3);

    // Only auto-load high-confidence docs (score > 0.7)
    // Optimization: 40-50% reduction in unnecessary doc loading, 20% fewer tokens injected
    const highConfidenceDocs = matchedDocs.filter((doc: any) => doc.score > 0.7);

    // If no skills, patterns, or high-confidence docs matched, exit
    if (matchedSkills.length === 0 && matchedPatterns.length === 0 && highConfidenceDocs.length === 0) {
      process.exit(0);
    }

    // Deduplicate skills (shouldn't be necessary, but safety check)
    let uniqueSkills = deduplicateSkills(matchedSkills);

    // Filter skills based on mode (teaching vs production)
    uniqueSkills = uniqueSkills.filter(skill => !shouldFilterSkill(skill.name, modeDetection.mode));

    // Format skill activations for display
    const skillActivations: SkillActivation[] = uniqueSkills.map(skill => ({
      name: skill.name,
      priority: skill.priority,
      enforcement: skillRules[skill.name]?.enforcement,
      icon: getIconForSkill(skill.name),
      message: skill.reminderMessage,
      skillPath: skill.skillPath
    }));

    // CHECK FOR MANDATORY SKILL ENFORCEMENT
    // Skills with enforcement: "require" MUST be read before proceeding
    const requiredSkills = uniqueSkills.filter(skill =>
      skillRules[skill.name]?.enforcement === 'require'
    );

    const warnSkills = uniqueSkills.filter(skill =>
      skillRules[skill.name]?.enforcement === 'warn'
    );

    if (requiredSkills.length > 0) {
      // Check if required skills have been read (via session cache)
      const unreadSkills = requiredSkills.filter(skill =>
        !isCached('skill', skill.name, 'full')
      );

      if (unreadSkills.length > 0) {
        // BLOCK: Required skills MUST be read
        const blockMessage = [
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '🔴 EXECUTION BLOCKED: MANDATORY SKILL READING REQUIRED',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          'The following skills MUST be read before proceeding:',
          '',
          ...unreadSkills.map(skill => [
            `  ❌ ${skill.name}`,
            `     Path: ${skill.skillPath}`,
            ''
          ].join('\n')),
          '📖 WHY THIS MATTERS:',
          '   These skills contain CRITICAL guidance that ensures quality output.',
          '   Reading them is NON-NEGOTIABLE. They exist to prevent low-quality',
          '   "AI slop" and ensure professional, well-designed results.',
          '',
          '⚡ TO PROCEED:',
          '   1. Use the Read tool to read each skill file listed above',
          '   2. Follow the guidance in those files when implementing',
          '   3. Re-submit your prompt - you will be unblocked automatically',
          '',
          '⚠️  POLICY (CLAUDE.md):',
          '   Required skills enforce quality standards system-wide.',
          '   This is not optional. Read the skills, follow the guidance.',
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          ''
        ].join('\n');

        process.stderr.write(blockMessage);
        process.exit(1); // Exit with error to block execution
      }
    }

    // WARN for warn-level skills (non-blocking but strong message)
    let warnMessage = '';
    if (warnSkills.length > 0) {
      warnMessage = [
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '⚠️  CRITICAL SKILLS ACTIVATED - READ BEFORE IMPLEMENTATION',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        ...warnSkills.map(skill => `  ⚠️  ${skill.name}: ${skill.skillPath}`),
        '',
        '💡 These skills contain essential guidance for quality output.',
        '   Ignoring them will produce low-quality, generic results.',
        '   STRONGLY RECOMMENDED: Read these skills before proceeding.',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        ''
      ].join('\n');
    }

    // Format pattern suggestions for display (filter by mode)
    const filteredPatterns = matchedPatterns
      .filter(pattern => !shouldFilterPattern(pattern.name, modeDetection.mode));

    const patternSuggestions: PatternSuggestion[] = filteredPatterns.map(pattern => ({
      name: pattern.name,
      category: pattern.category,
      complexity: pattern.complexity,
      icon: getIconForPattern(pattern.category),
      patternPath: pattern.patternPath
    }));

    // Load matched documentation content (with dual-layer caching)
    // Only load high-confidence matches to reduce unnecessary context
    const docsToLoad: Array<{ name: string; content: string }> = [];
    let cacheSavingsTokens = 0;

    for (const doc of highConfidenceDocs) {
      // Check session cache first (cross-invocation)
      const docPath = (docsIndex && (docsIndex as any)[doc.name]?.path) || '';
      if (isCached('doc', doc.name, 'full')) {
        // Already loaded in this session - skip
        const tokensSaved = 2000; // Rough estimate for doc size
        cacheSavingsTokens += tokensSaved;
        recordCacheHit(tokensSaved);
        continue;
      }

      // Check memory cache (in-memory, this invocation)
      let content = docsCache.get(doc.name);

      if (!content) {
        // Cache miss - load from file
        content = loadDocContent(doc.name, projectRoot, docsIndex);
        if (content) {
          docsCache.set(doc.name, content);
          // Add to session cache
          addToCache('doc', doc.name, docPath, 'full', 2000);
        }
      }

      if (content) {
        docsToLoad.push({ name: doc.name, content });
      }
    }

    // Adaptive context loading based on task complexity
    const taskComplexity = detectTaskComplexity(prompt);
    const contextTier = determineContextTier({
      model: 'sonnet', // Default, actual model detection would require settings access
      taskComplexity,
      explicitTier: detectExplicitTier(prompt)
    });

    // Add context tier hint to reminder (if not using full tier)
    let contextTierHint = '';
    if (contextTier.name !== 'full' && (matchedSkills.length > 0 || matchedPatterns.length > 0)) {
      contextTierHint = `\n💡 Context tier: ${contextTier.name} (${contextTier.description})`;
      if (contextTier.name === 'minimal') {
        contextTierHint += '\n   Tip: Add "detailed" or "comprehensive" to prompt for full context';
      }
    }

    // Add cache savings notification if significant
    let cacheSavingsHint = '';
    if (cacheSavingsTokens > 1000) {
      const stats = getCacheStats();
      cacheSavingsHint = `\n📊 Cache: Saved ~${(cacheSavingsTokens / 1000).toFixed(1)}K tokens (already loaded in session)`;
    }

    // Add tier suggestion if Tier 2 or 3 detected
    let tierSuggestion = '';
    if (tierFilter.suggestedTier && tierFilter.suggestionMessage) {
      tierSuggestion = formatTierSuggestion(tierFilter.suggestedTier);
    }

    // Format routing decision (if enabled)
    let routingOutput = '';
    if (routingDecision) {
      // Use compact format by default, full format if DEBUG is set
      const useFullFormat = process.env.SMART_ROUTING_VERBOSE === 'true';
      routingOutput = useFullFormat
        ? formatRoutingDecision(routingDecision)
        : formatCompactRouting(routingDecision);
    }

    // Format skill activation reminder (using old formatter for skills only)
    const skillReminder = skillActivations.length > 0
      ? formatCombinedActivationReminder(skillActivations, []) // Pass empty patterns array
      : '';

    // Format pattern suggestions (using NEW verbose formatter with complexity-based enforcement)
    const patternReminder = formatPatternSuggestions(matchedPatterns, patternIndex, projectRoot, prompt);

    // CHECK FOR MANDATORY PATTERN ENFORCEMENT
    // If medium/complex patterns detected without bypass justification, BLOCK execution
    const hasJustification = checkForJustification(prompt);
    const mandatoryPatterns = matchedPatterns.filter(p =>
      p.complexity === 'medium' || p.complexity === 'complex'
    );

    if (mandatoryPatterns.length > 0 && !hasJustification) {
      // BLOCK: Medium/complex patterns require justification or /pattern usage
      const blockMessage = [
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🔴 EXECUTION BLOCKED: MANDATORY PATTERN REQUIRED',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        `Detected ${mandatoryPatterns.length} MANDATORY pattern(s):`,
        ...mandatoryPatterns.map(p => `  • ${p.name} (${p.complexity})`),
        '',
        'Medium/complex patterns ensure quality gates for critical workflows.',
        '',
        '📋 TO PROCEED, you must either:',
        '',
        '1️⃣  Use the pattern (RECOMMENDED):',
        `   /pattern ${mandatoryPatterns[0].name}`,
        '',
        '2️⃣  Provide explicit bypass justification in your prompt:',
        '   Include these elements:',
        '   ✓ "Bypassing pattern because [specific reason]"',
        '   ✓ Alternative approach explanation',
        '   ✓ Risk acknowledgment',
        '',
        '   Example:',
        '   "Bypassing pattern because experimenting with new approach.',
        '   Alternative: Manual iterative implementation.',
        '   Risk: May miss quality gates and require rework."',
        '',
        '⚠️  POLICY (CLAUDE.md):',
        '   ❌ DO NOT ignore this pattern - violation of core principles',
        '   ❌ DO NOT read pattern file and implement manually',
        '   ✅ MUST use /pattern command for enforcement + quality gates',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        ''
      ].join('\n');

      process.stderr.write(blockMessage);
      process.exit(1); // Exit with error to block execution
    }

    // Format documentation injection
    const docsInjection = formatDocsForInjection(docsToLoad);

    // Get mode-specific reminder
    const modeReminder = getModeReminder(modeDetection.mode);

    // Output reminder, mode hint, context tier hint, cache savings, and docs (will be prepended to user's prompt)
    if (modeReminder) {
      process.stdout.write(modeReminder);
    }

    if (warnMessage) {
      process.stdout.write(warnMessage);
    }

    if (skillReminder) {
      process.stdout.write(skillReminder);
    }

    if (patternReminder) {
      process.stdout.write(patternReminder);
    }

    if (contextTierHint) {
      process.stdout.write(contextTierHint);
    }

    if (tierSuggestion) {
      process.stdout.write(tierSuggestion);
    }

    if (routingOutput) {
      process.stdout.write(routingOutput);
    }

    if (cacheSavingsHint) {
      process.stdout.write(cacheSavingsHint);
    }

    if (docsInjection) {
      process.stdout.write(docsInjection);
    }

    process.exit(0);
  } catch (error) {
    console.error('[user-prompt-submit] Error:', error);
    process.exit(0); // Don't fail the hook, just skip
  }
}

/**
 * Read prompt from stdin
 */
function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';

    process.stdin.setEncoding('utf-8');

    process.stdin.on('data', (chunk) => {
      data += chunk;
    });

    process.stdin.on('end', () => {
      resolve(data);
    });

    // Handle case where stdin is immediately closed
    process.stdin.on('error', () => {
      resolve('');
    });
  });
}

/**
 * Detect if user explicitly requested a context tier
 */
function detectExplicitTier(prompt: string): 'minimal' | 'quick' | 'full' | undefined {
  const promptLower = prompt.toLowerCase();

  // Explicit full tier indicators
  if (promptLower.includes('detailed') ||
      promptLower.includes('comprehensive') ||
      promptLower.includes('full context') ||
      promptLower.includes('in-depth')) {
    return 'full';
  }

  // Explicit minimal tier indicators
  if (promptLower.includes('quick') ||
      promptLower.includes('minimal') ||
      promptLower.includes('brief') ||
      promptLower.includes('fast')) {
    return 'minimal';
  }

  return undefined;
}

/**
 * Get emoji icon for skill
 */
function getIconForSkill(skillName: string): string {
  const iconMap: { [key: string]: string } = {
    'brand-voice-guidelines': '🎨',
    'audience-research': '👥',
    'campaign-strategy-frameworks': '📋',
    'seo-optimization': '🔍',
    'marketing-analytics': '📊',
    'automation-workflows': '⚙️',
    'compliance-and-legal': '⚖️'
  };

  return iconMap[skillName] || '💡';
}

/**
 * Get emoji icon for pattern category
 */
function getIconForPattern(category: string): string {
  const iconMap: { [key: string]: string } = {
    'content': '📝',
    'strategy': '🎯',
    'analysis': '📊',
    'optimization': '⚡'
  };

  return iconMap[category] || '💡';
}

// Run the hook
main();
