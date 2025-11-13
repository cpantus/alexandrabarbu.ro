/**
 * Utility functions for matching user prompts to relevant skills
 */

import * as fs from 'fs';
import * as path from 'path';

export interface SkillRule {
  type: 'universal' | 'domain-specific' | 'guardrail';
  enforcement: 'suggest' | 'warn' | 'require';
  priority: 'critical' | 'high' | 'medium' | 'low';
  skillPath?: string; // Path to skill file (relative to project root)
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
 * Resolve skill file path by searching in multiple locations
 * Priority: 1) Rule's skillPath, 2) marketing-plugin, 3) core, 4) .claude (legacy)
 */
function resolveSkillPath(skillName: string, rule: SkillRule, projectRoot: string): string {
  // If rule specifies a path, use it
  if (rule.skillPath) {
    const specifiedPath = path.join(projectRoot, rule.skillPath);
    if (fs.existsSync(specifiedPath)) {
      return rule.skillPath; // Return relative path
    }
    console.warn(`[skill-matcher] Skill path specified in rule not found: ${rule.skillPath}`);
  }

  // Search in multiple locations
  const searchPaths = [
    `marketing-plugin/skills/${skillName}.md`,
    `core/infrastructure/skills/${skillName}.md`,
    `.claude/skills/${skillName}.md` // legacy fallback
  ];

  for (const searchPath of searchPaths) {
    const fullPath = path.join(projectRoot, searchPath);
    if (fs.existsSync(fullPath)) {
      return searchPath; // Return relative path
    }
  }

  // If not found, return the rule's path or default to legacy location
  return rule.skillPath || `.claude/skills/${skillName}.md`;
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
    const parsed = JSON.parse(rulesContent);
    return parsed.skills;
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
  projectRoot: string,
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
        skillPath: resolveSkillPath(skillName, rule, projectRoot),
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
  skillRules: SkillRules,
  projectRoot: string
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
        skillPath: resolveSkillPath(skillName, rule, projectRoot),
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
