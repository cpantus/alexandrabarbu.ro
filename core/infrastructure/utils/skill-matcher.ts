/**
 * Utility functions for matching user prompts to relevant skills
 */

import * as fs from 'fs';
import * as path from 'path';

export interface SkillRule {
  type: 'universal' | 'domain-specific' | 'guardrail';
  enforcement: 'suggest' | 'warn' | 'require';
  priority: 'critical' | 'high' | 'medium' | 'low';
  promptTriggers: {
    keywords: string[];
    intentPatterns: string[];
  };
  fileTriggers?: {
    pathPatterns: string[];
    contentPatterns: string[];
  };
  autoActivate: boolean;
  reminderMessage: string;
}

export interface SkillRules {
  [skillName: string]: SkillRule;
}

export interface MatchedSkill {
  name: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  matchReason: string;
  skillPath: string;
  reminderMessage: string;
}

/**
 * Load skill rules from skill-rules.json
 */
export function loadSkillRules(projectRoot: string): SkillRules {
  const rulesPath = path.join(projectRoot, '.claude', 'skill-rules.json');

  if (!fs.existsSync(rulesPath)) {
    console.error(`[skill-matcher] skill-rules.json not found at ${rulesPath}`);
    return {};
  }

  try {
    const rulesContent = fs.readFileSync(rulesPath, 'utf-8');
    return JSON.parse(rulesContent);
  } catch (error) {
    console.error(`[skill-matcher] Error loading skill-rules.json:`, error);
    return {};
  }
}

/**
 * Match user prompt to relevant skills
 */
export function matchSkillsToPrompt(
  prompt: string,
  skillRules: SkillRules,
  maxSkills: number = 3
): MatchedSkill[] {
  const matches: Array<MatchedSkill & { score: number }> = [];
  const promptLower = prompt.toLowerCase();

  for (const [skillName, rule] of Object.entries(skillRules)) {
    if (!rule.autoActivate) {
      continue;
    }

    let score = 0;
    const matchReasons: string[] = [];

    // Check keyword matches
    const keywordMatches = rule.promptTriggers.keywords.filter(keyword =>
      promptLower.includes(keyword.toLowerCase())
    );

    if (keywordMatches.length > 0) {
      score += keywordMatches.length * 2; // 2 points per keyword
      matchReasons.push(`keywords: ${keywordMatches.slice(0, 3).join(', ')}`);
    }

    // Check intent pattern matches
    for (const pattern of rule.promptTriggers.intentPatterns) {
      try {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(prompt)) {
          score += 3; // 3 points per pattern match
          matchReasons.push(`intent: ${pattern}`);
        }
      } catch (error) {
        console.error(`[skill-matcher] Invalid regex pattern: ${pattern}`, error);
      }
    }

    // If we have matches, add to results
    if (score > 0) {
      matches.push({
        name: skillName,
        priority: rule.priority,
        matchReason: matchReasons.join(', '),
        skillPath: `.claude/skills/${skillName}.md`,
        reminderMessage: rule.reminderMessage,
        score
      });
    }
  }

  // Sort by priority (critical > high > medium > low), then by score
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  matches.sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }
    return b.score - a.score; // Higher score first
  });

  // Return top N matches, removing score field
  return matches.slice(0, maxSkills).map(({ score, ...rest }) => rest);
}

/**
 * Check if file should trigger skill activation
 */
export function matchSkillsToFile(
  filePath: string,
  fileContent: string,
  skillRules: SkillRules
): MatchedSkill[] {
  const matches: MatchedSkill[] = [];

  for (const [skillName, rule] of Object.entries(skillRules)) {
    if (!rule.autoActivate || !rule.fileTriggers) {
      continue;
    }

    let matched = false;
    const matchReasons: string[] = [];

    // Check path patterns
    for (const pathPattern of rule.fileTriggers.pathPatterns) {
      try {
        // Convert glob pattern to regex
        const regex = new RegExp(pathPattern.replace(/\*/g, '.*'), 'i');
        if (regex.test(filePath)) {
          matched = true;
          matchReasons.push(`path: ${pathPattern}`);
        }
      } catch (error) {
        console.error(`[skill-matcher] Invalid path pattern: ${pathPattern}`, error);
      }
    }

    // Check content patterns
    for (const contentPattern of rule.fileTriggers.contentPatterns) {
      if (fileContent.includes(contentPattern)) {
        matched = true;
        matchReasons.push(`content: ${contentPattern}`);
      }
    }

    if (matched) {
      matches.push({
        name: skillName,
        priority: rule.priority,
        matchReason: matchReasons.join(', '),
        skillPath: `.claude/skills/${skillName}.md`,
        reminderMessage: rule.reminderMessage
      });
    }
  }

  return matches;
}

/**
 * Deduplicate skill matches (keep highest priority)
 */
export function deduplicateSkills(skills: MatchedSkill[]): MatchedSkill[] {
  const seen = new Set<string>();
  const deduplicated: MatchedSkill[] = [];

  for (const skill of skills) {
    if (!seen.has(skill.name)) {
      seen.add(skill.name);
      deduplicated.push(skill);
    }
  }

  return deduplicated;
}
