/**
 * Composition Matcher Utility (v5.5.0)
 *
 * Detects when multiple loaded skills form a known composition (synergistic combination).
 * Used by user-prompt-submit.ts to inject composition guidance when skills should work together.
 *
 * Philosophy: Skills in isolation are good. Skills working together are exponentially better.
 * When data-visualization-designer + design-excellence + diagram-drawing all load,
 * they should compose into a unified quality guarantee, not operate independently.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface SkillComposition {
  name: string;
  description: string;
  skills: string[];
  triggers: string[];
  enforcement: 'require' | 'suggest' | 'optional';
  synergy_multiplier: number;
  output_acknowledgment_template: string;
  rationale: string;
  quality_gates: string[];
}

export interface CompositionRules {
  version: string;
  compositions: SkillComposition[];
  composition_metadata: {
    enforcement_philosophy: string;
    synergy_multiplier_explanation: string;
    output_acknowledgment_requirement: string;
    validation_strategy: string;
  };
}

export interface CompositionMatch {
  composition: SkillComposition;
  matched_skills: string[];
  confidence: number;
  trigger_matched: string | null;
}

/**
 * Load skill composition rules from configuration file
 */
export function loadCompositionRules(): CompositionRules {
  const rulesPath = path.join(process.cwd(), '.claude', 'skill-composition-rules.json');

  if (!fs.existsSync(rulesPath)) {
    console.error(`[composition-matcher] skill-composition-rules.json not found at ${rulesPath}`);
    return {
      version: '5.5.0',
      compositions: [],
      composition_metadata: {
        enforcement_philosophy: '',
        synergy_multiplier_explanation: '',
        output_acknowledgment_requirement: '',
        validation_strategy: ''
      }
    };
  }

  try {
    const rulesContent = fs.readFileSync(rulesPath, 'utf-8');
    return JSON.parse(rulesContent);
  } catch (error) {
    console.error('[composition-matcher] Error loading composition rules:', error);
    return {
      version: '5.5.0',
      compositions: [],
      composition_metadata: {
        enforcement_philosophy: '',
        synergy_multiplier_explanation: '',
        output_acknowledgment_requirement: '',
        validation_strategy: ''
      }
    };
  }
}

/**
 * Detect if loaded skills form a known composition
 *
 * @param loadedSkills - Array of skill names that were loaded in this session
 * @param userPrompt - The user's prompt (for trigger matching)
 * @returns Array of matching compositions, sorted by confidence
 */
export function detectCompositions(
  loadedSkills: string[],
  userPrompt: string
): CompositionMatch[] {
  const rules = loadCompositionRules();
  const matches: CompositionMatch[] = [];

  for (const composition of rules.compositions) {
    // Check if all required skills for this composition are loaded
    const matchedSkills = composition.skills.filter(skill =>
      loadedSkills.includes(skill)
    );

    // Need at least 2 skills from composition to consider it a match
    if (matchedSkills.length < 2) {
      continue;
    }

    // Calculate confidence based on:
    // 1. Percentage of composition skills that are loaded (weight: 0.6)
    // 2. Whether triggers match user prompt (weight: 0.4)
    const skillMatchPercent = matchedSkills.length / composition.skills.length;

    const promptLower = userPrompt.toLowerCase();
    const triggerMatch = composition.triggers.some(trigger =>
      promptLower.includes(trigger.toLowerCase())
    );

    const triggerMatchValue = triggerMatch ? 1.0 : 0.0;
    const matchedTrigger = triggerMatch
      ? composition.triggers.find(t => promptLower.includes(t.toLowerCase())) || null
      : null;

    const confidence = (skillMatchPercent * 0.6) + (triggerMatchValue * 0.4);

    // Only consider matches with confidence > 0.5 (at least half the skills + trigger, or all skills)
    if (confidence > 0.5) {
      matches.push({
        composition,
        matched_skills: matchedSkills,
        confidence,
        trigger_matched: matchedTrigger
      });
    }
  }

  // Sort by confidence (highest first), then by synergy multiplier
  return matches.sort((a, b) => {
    if (b.confidence !== a.confidence) {
      return b.confidence - a.confidence;
    }
    return b.composition.synergy_multiplier - a.composition.synergy_multiplier;
  });
}

/**
 * Format composition guidance for injection into Claude's context
 */
export function formatCompositionGuidance(match: CompositionMatch): string {
  const { composition, matched_skills, confidence, trigger_matched } = match;

  const enforcementEmoji = composition.enforcement === 'require' ? '🔴' : '🟡';
  const enforcementText = composition.enforcement === 'require' ? 'MANDATORY' : 'RECOMMENDED';

  let output = `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  output += `${enforcementEmoji} MULTI-SKILL COMPOSITION DETECTED: ${composition.name}\n`;
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  output += `${composition.description}\n\n`;

  output += `**Loaded Skills (${matched_skills.length}/${composition.skills.length}):**\n`;
  for (const skill of matched_skills) {
    output += `  ✓ ${skill}\n`;
  }

  const missingSkills = composition.skills.filter(s => !matched_skills.includes(s));
  if (missingSkills.length > 0) {
    output += `\n**Optional Additional Skills:**\n`;
    for (const skill of missingSkills) {
      output += `  ○ ${skill} (not loaded, but could enhance output)\n`;
    }
  }

  output += `\n**Synergy Multiplier:** ${composition.synergy_multiplier}x quality improvement vs. single skill\n`;
  output += `**Enforcement:** ${enforcementText}\n`;
  output += `**Confidence:** ${(confidence * 100).toFixed(0)}%\n`;

  if (trigger_matched) {
    output += `**Trigger Matched:** "${trigger_matched}"\n`;
  }

  output += `\n**Rationale:**\n${composition.rationale}\n`;

  output += `\n**REQUIRED OUTPUT ACKNOWLEDGMENT:**\n`;
  output += `You MUST include this in your response:\n\n`;
  output += `\`\`\`\n${composition.output_acknowledgment_template}\n\`\`\`\n`;

  output += `\n**Quality Gates (Validate All):**\n`;
  for (const gate of composition.quality_gates) {
    output += `  □ ${gate}\n`;
  }

  output += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  output += `⚡ REQUIREMENT: Use ALL loaded skills in conjunction.\n`;
  output += `   Single-skill usage when composition detected = ARCHITECTURE VIOLATION.\n`;
  output += `   Quality guarantee only applies when skills work together.\n`;
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  return output;
}

/**
 * Get composition by name (for validation/testing)
 */
export function getCompositionByName(name: string): SkillComposition | null {
  const rules = loadCompositionRules();
  return rules.compositions.find(c => c.name === name) || null;
}

/**
 * Check if skills should compose (quick check for validation hooks)
 */
export function shouldCompose(loadedSkills: string[]): boolean {
  const rules = loadCompositionRules();

  for (const composition of rules.compositions) {
    const matchedCount = composition.skills.filter(skill =>
      loadedSkills.includes(skill)
    ).length;

    // If 2+ skills from any composition are loaded, they should compose
    if (matchedCount >= 2) {
      return true;
    }
  }

  return false;
}

/**
 * Extract composition acknowledgment from Claude's output
 * Used by validation hook to verify composition was applied
 */
export function extractCompositionAcknowledgment(output: string): {
  found: boolean;
  skills_mentioned: string[];
  is_valid: boolean;
} {
  // Look for "Multi-Skill Composition Applied:" or similar patterns
  const patterns = [
    /Multi-Skill Composition Applied:/i,
    /Composition Applied:/i,
    /Skills Composed:/i,
  ];

  let found = false;
  for (const pattern of patterns) {
    if (pattern.test(output)) {
      found = true;
      break;
    }
  }

  if (!found) {
    return { found: false, skills_mentioned: [], is_valid: false };
  }

  // Extract skill names mentioned in the acknowledgment
  // Look for patterns like "- skill-name:" or "skill-name: [contribution]"
  const skillMentionPattern = /[-•]\s*([a-z0-9-]+):/gi;
  const matches = output.matchAll(skillMentionPattern);
  const skills_mentioned = Array.from(matches).map(m => m[1]);

  // Valid if at least 2 skills are mentioned
  const is_valid = skills_mentioned.length >= 2;

  return { found, skills_mentioned, is_valid };
}
