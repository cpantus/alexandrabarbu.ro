
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
import { loadSkillProgressive } from './utils/skill-loader';
import { loadPatternProgressive } from './utils/pattern-loader';
import { detectCompositions, formatCompositionGuidance } from './utils/composition-matcher';
import { readStdinWithTimeout } from './utils/stdin-reader';
import { getProjectRoot } from './utils/project-root';

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
  // Hook timeout protection (5 seconds)
  const HOOK_TIMEOUT = 5000;
  const timeoutId = setTimeout(() => {
    console.error('[user-prompt-submit] Timeout exceeded (5s), exiting gracefully');
    process.exit(0);
  }, HOOK_TIMEOUT);

  try {
    // Get user prompt from stdin with timeout
    const prompt = await readStdinWithTimeout({ timeout: 1000 });

    if (!prompt || prompt.trim().length === 0) {
      // No prompt to analyze
      clearTimeout(timeoutId);
      process.exit(0);
    }

    // Short-circuit for trivial prompts (don't need skill/pattern matching)
    // Optimization: 15-20% of prompts skip expensive pattern matching
    const promptLower = prompt.toLowerCase().trim();
    if (promptLower.length < 10 ||
        /^(hi|hello|hey|thanks?|thank you|bye|goodbye|what time|help|\?)$/i.test(promptLower)) {
      clearTimeout(timeoutId);
      process.exit(0);
    }

    // Get project root (portable detection via git or cwd)
    const projectRoot = getProjectRoot();

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
    const skillRulesData = getSkillRules(projectRoot);
    const skillRules = skillRulesData.skills || {};
    const config = skillRulesData.config || { maxSkillsPerPrompt: 3 };

    if (Object.keys(skillRules).length === 0) {
      // No skill rules configured
      process.exit(0);
    }

    // Match skills to prompt (use config limit, not hardcoded)
    const matchedSkills = matchSkillsToPrompt(prompt, skillRules, projectRoot, config.maxSkillsPerPrompt);

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

    // AUTO-LOAD REQUIRED SKILLS (v5.2.0: Application Guarantee)
    // Skills with enforcement: "require" are AUTO-LOADED into Claude's context
    // This GUARANTEES application (not just awareness)
    const requiredSkills = uniqueSkills.filter(skill =>
      skillRules[skill.name]?.enforcement === 'require'
    );

    const warnSkills = uniqueSkills.filter(skill =>
      skillRules[skill.name]?.enforcement === 'warn'
    );

    // Auto-load required skills with progressive disclosure
    let autoLoadedSkills: string[] = [];
    let totalAutoLoadTokens = 0;

    if (requiredSkills.length > 0) {
      // Check which skills need loading (not already loaded THIS session)
      const skillsToLoad = requiredSkills.filter(skill =>
        !isCached('skill-loaded', skill.name, 'session')
      );

      if (skillsToLoad.length > 0) {
        // Determine context tier for progressive loading
        const taskComplexity = detectTaskComplexity(prompt);
        const contextTier = determineContextTier({
          model: 'sonnet',
          taskComplexity,
          explicitTier: detectExplicitTier(prompt)
        });

        // Load each required skill progressively
        for (const skill of skillsToLoad) {
          const loaded = loadSkillProgressive(
            skill.name,
            skill.skillPath,
            contextTier.name
          );

          if (loaded) {
            // Inject skill content into Claude's context via stdout
            process.stdout.write(loaded.content);

            // Track loaded skills
            autoLoadedSkills.push(skill.name);
            totalAutoLoadTokens += loaded.tokens;

            // Mark as loaded in session cache (prevents duplicate loads)
            addToCache('skill-loaded', skill.name, skill.skillPath, 'session', loaded.tokens);

            // Log to stderr for user visibility
            process.stderr.write(`✓ ${skill.name} auto-loaded (${contextTier.name} mode, ${loaded.tokens} tokens, MANDATORY for quality)\n`);
          }
        }
      } else {
        // All required skills already loaded this session
        process.stderr.write(`✓ Required skills already loaded this session (${requiredSkills.map(s => s.name).join(', ')})\n`);
      }
    }

    // MULTI-SKILL COMPOSITION DETECTION (v5.5.0)
    // Check if loaded skills form a known composition (synergistic combination)
    // If so, inject composition guidance to ensure skills work together
    const allLoadedSkills = [
      ...requiredSkills.map(s => s.name),
      ...warnSkills.map(s => s.name)
    ];

    let compositionGuidance = '';
    if (allLoadedSkills.length >= 2) {
      const compositions = detectCompositions(allLoadedSkills, prompt);

      if (compositions.length > 0) {
        // Use highest-confidence composition
        const topComposition = compositions[0];

        // Only inject if not already cached for this session
        if (!isCached('composition-loaded', topComposition.composition.name, 'session')) {
          compositionGuidance = formatCompositionGuidance(topComposition);

          // Mark as loaded in session cache
          addToCache(
            'composition-loaded',
            topComposition.composition.name,
            topComposition.composition.name,
            'session',
            500 // Estimated tokens for composition guidance
          );

          // Log to stderr for user visibility
          process.stderr.write(`✓ Composition detected: ${topComposition.composition.name} (${topComposition.matched_skills.length} skills, ${(topComposition.confidence * 100).toFixed(0)}% confidence)\n`);
        }
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

    // AUTO-LOAD MANDATORY PATTERNS (v5.3.0: Guidance-First)
    // If medium/complex patterns detected without bypass justification, AUTO-INJECT content
    const hasJustification = checkForJustification(prompt);
    const mandatoryPatterns = matchedPatterns.filter(p =>
      p.complexity === 'medium' || p.complexity === 'complex'
    );

    let autoLoadedPatterns: string[] = [];
    let totalPatternTokens = 0;

    if (mandatoryPatterns.length > 0 && !hasJustification) {
      // Auto-load mandatory patterns (like skills v5.2.0, but for patterns)
      const patternsToLoad = mandatoryPatterns.filter(pattern =>
        !isCached('pattern-loaded', pattern.name, 'session')
      );

      if (patternsToLoad.length > 0) {
        // Determine context tier for progressive loading
        const taskComplexity = detectTaskComplexity(prompt);
        const contextTier = determineContextTier({
          model: 'sonnet',
          taskComplexity,
          explicitTier: detectExplicitTier(prompt)
        });

        // Load each mandatory pattern progressively
        for (const pattern of patternsToLoad) {
          const loaded = loadPatternProgressive(
            pattern.name,
            pattern.patternPath,
            contextTier.name
          );

          if (loaded) {
            // Inject pattern content into Claude's context via stdout
            process.stdout.write(loaded.content);

            // Track loaded patterns
            autoLoadedPatterns.push(pattern.name);
            totalPatternTokens += loaded.tokens;

            // Mark as loaded in session cache (prevents duplicate loads)
            addToCache('pattern-loaded', pattern.name, pattern.patternPath, 'session', loaded.tokens);

            // Log to stderr for user visibility
            process.stderr.write(`✓ ${pattern.name} auto-loaded (MANDATORY pattern, ${contextTier.name} mode, ${loaded.tokens} tokens)\n`);
          }
        }
      } else {
        // All mandatory patterns already loaded this session
        process.stderr.write(`✓ Mandatory patterns already loaded this session (${mandatoryPatterns.map(p => p.name).join(', ')})\n`);
      }
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

    if (compositionGuidance) {
      process.stdout.write(compositionGuidance);
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

    clearTimeout(timeoutId);
    process.exit(0);
  } catch (error) {
    console.error('[user-prompt-submit] Error:', error);
    clearTimeout(timeoutId);
    process.exit(0); // Don't fail the hook, just skip
  }
}

// Removed: readStdin() - now using readStdinWithTimeout() from utils/stdin-reader.ts

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
