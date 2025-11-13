#!/usr/bin/env -S npx tsx

/**
 * Plugin Skill Loader
 *
 * Loads auto-activating skills from plugins that have extended capabilities.
 * Integrates with existing skill-rules.json and skill-matcher systems.
 *
 * @version 1.0
 * @since 2025-11-10
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// ============================================================================
// TYPES
// ============================================================================

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
  source?: 'core' | 'plugin';  // NEW: Track source
  pluginName?: string;          // NEW: Track which plugin
}

export interface SkillRules {
  [skillName: string]: SkillRule;
}

export interface PluginManifest {
  name: string;
  version: string;
  skills?: string[];
  extensions?: {
    skills?: {
      autoActivate: boolean;
      triggers: string[];
    };
  };
}

export interface LoadedSkill {
  name: string;
  filePath: string;
  content: string;
  rule: SkillRule;
}

// ============================================================================
// SKILL LOADING
// ============================================================================

/**
 * Load skills from a plugin directory
 *
 * @param pluginPath - Absolute path to plugin root directory
 * @param manifest - Plugin manifest from plugin.json
 * @returns Array of loaded skills with rules
 */
export async function loadSkills(
  pluginPath: string,
  manifest: PluginManifest
): Promise<LoadedSkill[]> {
  if (!manifest.skills || manifest.skills.length === 0) {
    console.log(`[plugin-skill-loader] No skills defined in plugin: ${manifest.name}`);
    return [];
  }

  console.log(`[plugin-skill-loader] Loading skills from plugin: ${manifest.name}`);

  const loadedSkills: LoadedSkill[] = [];

  for (const skillGlob of manifest.skills) {
    const fullGlob = path.join(pluginPath, skillGlob);
    const files = await glob(fullGlob);

    console.log(`[plugin-skill-loader] Found ${files.length} skill files matching: ${skillGlob}`);

    for (const file of files) {
      try {
        const skill = await loadSkill(file, manifest.name);
        if (skill) {
          loadedSkills.push(skill);
        }
      } catch (error) {
        console.error(`[plugin-skill-loader] Error loading skill ${file}:`, error);
      }
    }
  }

  console.log(`[plugin-skill-loader] Loaded ${loadedSkills.length} skills from plugin: ${manifest.name}`);

  return loadedSkills;
}

/**
 * Load a single skill file and extract metadata
 *
 * @param filePath - Absolute path to skill markdown file
 * @param pluginName - Name of the plugin
 * @returns Loaded skill with rule
 */
async function loadSkill(filePath: string, pluginName: string): Promise<LoadedSkill | null> {
  if (!fs.existsSync(filePath)) {
    console.error(`[plugin-skill-loader] Skill file not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.md');

  // Parse rule from skill content
  const rule = parseSkillRule(content, pluginName);

  return {
    name: fileName,
    filePath,
    content,
    rule
  };
}

/**
 * Parse skill rule from markdown content
 *
 * Extracts metadata from YAML frontmatter and markdown structure
 *
 * @param content - Skill markdown content
 * @param pluginName - Plugin name
 * @returns Skill rule
 */
function parseSkillRule(content: string, pluginName: string): SkillRule {
  // Extract YAML frontmatter if present
  const yamlMatch = content.match(/^---\n([\s\S]+?)\n---/);
  let yamlData: any = {};

  if (yamlMatch) {
    try {
      // Simple YAML parser (basic key: value pairs)
      const yamlLines = yamlMatch[1].split('\n');
      yamlLines.forEach(line => {
        const match = line.match(/^([a-zA-Z_]+):\s*(.+)$/);
        if (match) {
          yamlData[match[1]] = match[2];
        }
      });
    } catch (error) {
      console.warn('[plugin-skill-loader] Failed to parse YAML frontmatter:', error);
    }
  }

  // Extract trigger keywords from content
  const keywords = extractKeywords(content);
  const intentPatterns = extractIntentPatterns(content);

  // Extract file triggers if present
  const fileTriggers = extractFileTriggers(content);

  // Determine priority based on content and explicit markers
  const priority = determinePriority(content, yamlData);

  // Extract type
  const type = determineSkillType(content, yamlData);

  // Generate reminder message
  const reminderMessage = generateReminderMessage(content);

  return {
    type,
    enforcement: 'suggest',
    priority,
    promptTriggers: {
      keywords,
      intentPatterns
    },
    fileTriggers: fileTriggers || undefined,
    autoActivate: true,
    reminderMessage,
    source: 'plugin',
    pluginName
  };
}

// ============================================================================
// METADATA EXTRACTION HELPERS
// ============================================================================

/**
 * Extract trigger keywords from skill content
 */
function extractKeywords(content: string): string[] {
  const keywords = new Set<string>();

  // Extract from ACTIVATION TRIGGERS section
  const triggersSection = extractSection(content, '## ACTIVATION TRIGGERS');
  if (triggersSection) {
    // Look for keyword lists
    const keywordMatch = triggersSection.match(/\*\*Keywords:\*\*\s*(.+)/i);
    if (keywordMatch) {
      const words = keywordMatch[1].split(/[,;]\s*/);
      words.forEach(word => keywords.add(word.trim().toLowerCase()));
    }

    // Look for bullet lists
    const bullets = triggersSection.match(/^[-*]\s+([^\n]+)/gm);
    if (bullets) {
      bullets.forEach(bullet => {
        const cleaned = bullet.replace(/^[-*]\s+/, '').trim().toLowerCase();
        if (cleaned && !cleaned.includes(':')) {
          keywords.add(cleaned);
        }
      });
    }
  }

  // Extract from title and description
  const titleMatch = content.match(/^#\s+([^\n]+)/m);
  if (titleMatch) {
    const titleWords = titleMatch[1].toLowerCase().split(/\s+/);
    titleWords.forEach(word => {
      if (word.length > 4 && !isCommonWord(word)) {
        keywords.add(word);
      }
    });
  }

  return Array.from(keywords).slice(0, 15); // Limit to top 15
}

/**
 * Extract intent patterns from skill content
 */
function extractIntentPatterns(content: string): string[] {
  const patterns: string[] = [];

  // Extract from ACTIVATION TRIGGERS section
  const triggersSection = extractSection(content, '## ACTIVATION TRIGGERS');
  if (triggersSection) {
    // Look for intent pattern lists
    const intentMatch = triggersSection.match(/\*\*Intent Patterns:\*\*\s*(.+)/i);
    if (intentMatch) {
      const patternTexts = intentMatch[1].split(/[,;]\s*/);
      patternTexts.forEach(pattern => {
        const cleaned = pattern.trim();
        if (cleaned) {
          patterns.push(cleaned);
        }
      });
    }

    // Look for "When user asks about/for..." patterns
    const whenMatches = triggersSection.matchAll(/when\s+(?:user|you|they)\s+(?:ask|need|want)[^.]+/gi);
    for (const match of whenMatches) {
      patterns.push(match[0]);
    }
  }

  return patterns.slice(0, 5); // Limit to top 5
}

/**
 * Extract file triggers from skill content
 */
function extractFileTriggers(content: string): { pathPatterns: string[]; contentPatterns: string[] } | null {
  const triggersSection = extractSection(content, '## ACTIVATION TRIGGERS');
  if (!triggersSection) {
    return null;
  }

  const pathPatterns: string[] = [];
  const contentPatterns: string[] = [];

  // Look for file triggers section
  const fileTriggersMatch = triggersSection.match(/\*\*File Triggers:\*\*\s*([\s\S]+?)(?=\n\n|\n##|$)/i);
  if (fileTriggersMatch) {
    const fileTriggers = fileTriggersMatch[1];

    // Extract path patterns
    const pathMatch = fileTriggers.match(/\*\*Path:\*\*\s*(.+)/i);
    if (pathMatch) {
      const paths = pathMatch[1].split(/[,;]\s*/);
      paths.forEach(p => pathPatterns.push(p.trim()));
    }

    // Extract content patterns
    const contentMatch = fileTriggers.match(/\*\*Content:\*\*\s*(.+)/i);
    if (contentMatch) {
      const contents = contentMatch[1].split(/[,;]\s*/);
      contents.forEach(c => contentPatterns.push(c.trim()));
    }
  }

  if (pathPatterns.length === 0 && contentPatterns.length === 0) {
    return null;
  }

  return { pathPatterns, contentPatterns };
}

/**
 * Determine skill priority
 */
function determinePriority(
  content: string,
  yamlData: any
): 'critical' | 'high' | 'medium' | 'low' {
  // Check explicit priority in YAML
  if (yamlData.priority) {
    const priority = yamlData.priority.toLowerCase();
    if (['critical', 'high', 'medium', 'low'].includes(priority)) {
      return priority as any;
    }
  }

  // Check for priority indicators in content
  const contentLower = content.toLowerCase();

  if (contentLower.includes('critical') || contentLower.includes('security') || contentLower.includes('compliance')) {
    return 'critical';
  }

  if (contentLower.includes('important') || contentLower.includes('required')) {
    return 'high';
  }

  if (contentLower.includes('recommended') || contentLower.includes('suggested')) {
    return 'medium';
  }

  return 'low';
}

/**
 * Determine skill type
 */
function determineSkillType(
  content: string,
  yamlData: any
): 'universal' | 'domain-specific' | 'guardrail' {
  // Check explicit type in YAML
  if (yamlData.type) {
    const type = yamlData.type.toLowerCase();
    if (['universal', 'domain-specific', 'guardrail'].includes(type)) {
      return type as any;
    }
  }

  // Infer from content
  const contentLower = content.toLowerCase();

  if (contentLower.includes('guardrail') || contentLower.includes('compliance') || contentLower.includes('security')) {
    return 'guardrail';
  }

  if (contentLower.includes('domain') || contentLower.includes('marketing') || contentLower.includes('specific')) {
    return 'domain-specific';
  }

  return 'universal';
}

/**
 * Generate reminder message from skill content
 */
function generateReminderMessage(content: string): string {
  // Try to extract from REMINDER section
  const reminderSection = extractSection(content, '## REMINDER');
  if (reminderSection) {
    const lines = reminderSection.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    if (lines.length > 0) {
      return lines[0].trim().substring(0, 200);
    }
  }

  // Try to extract from description
  const descriptionSection = extractSection(content, '## DESCRIPTION');
  if (descriptionSection) {
    const lines = descriptionSection.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    if (lines.length > 0) {
      return lines[0].trim().substring(0, 200);
    }
  }

  // Fallback to title
  const titleMatch = content.match(/^#\s+([^\n]+)/m);
  if (titleMatch) {
    return `Consider using: ${titleMatch[1]}`;
  }

  return 'Skill available for use';
}

/**
 * Check if word is common and should be filtered out
 */
function isCommonWord(word: string): boolean {
  const commonWords = new Set([
    'the', 'and', 'for', 'with', 'this', 'that', 'from', 'will',
    'have', 'can', 'are', 'how', 'when', 'what', 'where', 'why',
    'using', 'used', 'use', 'should', 'would', 'could', 'about',
    'skill', 'guide', 'guidelines'
  ]);
  return commonWords.has(word);
}

/**
 * Extract a section from markdown content
 */
function extractSection(content: string, sectionHeader: string): string {
  const headerRegex = new RegExp(`^${sectionHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
  const match = content.match(headerRegex);

  if (!match || match.index === undefined) {
    return '';
  }

  const startIndex = match.index;
  const headerLevel = (sectionHeader.match(/^#+/) || ['##'])[0].length;
  const nextSectionRegex = new RegExp(`^#{1,${headerLevel}}\\s+[^#]`, 'gm');

  nextSectionRegex.lastIndex = startIndex + sectionHeader.length;
  const nextMatch = nextSectionRegex.exec(content);

  const endIndex = nextMatch ? nextMatch.index : content.length;
  return content.substring(startIndex, endIndex);
}

// ============================================================================
// SKILL REGISTRATION
// ============================================================================

/**
 * Register skills with the core skill system
 *
 * Updates skill-rules.json to include plugin skills
 *
 * @param skills - Array of loaded skills
 * @param projectRoot - Project root directory
 * @param config - Skill configuration from plugin manifest
 */
export function registerSkills(
  skills: LoadedSkill[],
  projectRoot: string,
  config?: { autoActivate: boolean; triggers: string[] }
): boolean {
  const rulesPath = path.join(projectRoot, '.claude', 'skill-rules.json');

  try {
    // Load existing skill rules
    let rules: SkillRules;

    if (fs.existsSync(rulesPath)) {
      const rulesContent = fs.readFileSync(rulesPath, 'utf-8');
      rules = JSON.parse(rulesContent);
    } else {
      // Create new rules if doesn't exist
      rules = {};
    }

    // Add plugin skills to rules
    let addedCount = 0;

    for (const skill of skills) {
      if (!rules[skill.name]) {
        // Apply config overrides if provided
        if (config) {
          skill.rule.autoActivate = config.autoActivate;
          if (config.triggers.length > 0) {
            // Add config triggers to existing triggers
            skill.rule.promptTriggers.keywords.push(...config.triggers);
            // Deduplicate
            skill.rule.promptTriggers.keywords = Array.from(new Set(skill.rule.promptTriggers.keywords));
          }
        }

        rules[skill.name] = skill.rule;
        addedCount++;
      } else {
        console.warn(`[plugin-skill-loader] Skill already exists: ${skill.name}, skipping`);
      }
    }

    // Write updated rules
    fs.writeFileSync(rulesPath, JSON.stringify(rules, null, 2), 'utf-8');

    console.log(`[plugin-skill-loader] Registered ${addedCount} new skills`);
    console.log(`[plugin-skill-loader] Total skills in rules: ${Object.keys(rules).length}`);

    return true;
  } catch (error) {
    console.error('[plugin-skill-loader] Error registering skills:', error);
    return false;
  }
}

/**
 * Unregister skills from a specific plugin
 *
 * Removes plugin skills from skill-rules.json
 *
 * @param pluginName - Name of the plugin
 * @param projectRoot - Project root directory
 */
export function unregisterSkills(pluginName: string, projectRoot: string): boolean {
  const rulesPath = path.join(projectRoot, '.claude', 'skill-rules.json');

  try {
    if (!fs.existsSync(rulesPath)) {
      console.warn('[plugin-skill-loader] Skill rules not found, nothing to unregister');
      return false;
    }

    const rulesContent = fs.readFileSync(rulesPath, 'utf-8');
    const rules: SkillRules = JSON.parse(rulesContent);

    // Remove skills from this plugin
    let removedCount = 0;

    for (const [name, rule] of Object.entries(rules)) {
      if (rule.pluginName === pluginName) {
        delete rules[name];
        removedCount++;
      }
    }

    // Write updated rules
    fs.writeFileSync(rulesPath, JSON.stringify(rules, null, 2), 'utf-8');

    console.log(`[plugin-skill-loader] Unregistered ${removedCount} skills from plugin: ${pluginName}`);

    return true;
  } catch (error) {
    console.error('[plugin-skill-loader] Error unregistering skills:', error);
    return false;
  }
}

// ============================================================================
// SKILL COPYING
// ============================================================================

/**
 * Copy plugin skills to project .claude/skills directory
 *
 * This makes skills available in the standard location for skill activation
 *
 * @param skills - Array of loaded skills
 * @param projectRoot - Project root directory
 */
export function copySkillsToProject(skills: LoadedSkill[], projectRoot: string): boolean {
  try {
    const skillsDir = path.join(projectRoot, '.claude', 'skills');

    // Create skills directory if doesn't exist
    if (!fs.existsSync(skillsDir)) {
      fs.mkdirSync(skillsDir, { recursive: true });
    }

    for (const skill of skills) {
      const targetFile = path.join(skillsDir, `${skill.name}.md`);

      // Copy skill file
      fs.writeFileSync(targetFile, skill.content, 'utf-8');

      console.log(`[plugin-skill-loader] Copied skill: ${skill.name} → ${targetFile}`);
    }

    return true;
  } catch (error) {
    console.error('[plugin-skill-loader] Error copying skills:', error);
    return false;
  }
}

/**
 * Remove plugin skills from project .claude/skills directory
 *
 * @param pluginName - Name of the plugin
 * @param projectRoot - Project root directory
 */
export function removeSkillsFromProject(pluginName: string, projectRoot: string): boolean {
  try {
    const skillsDir = path.join(projectRoot, '.claude', 'skills');
    const rulesPath = path.join(projectRoot, '.claude', 'skill-rules.json');

    if (!fs.existsSync(rulesPath)) {
      return false;
    }

    const rulesContent = fs.readFileSync(rulesPath, 'utf-8');
    const rules: SkillRules = JSON.parse(rulesContent);

    // Find and remove skill files
    for (const [name, rule] of Object.entries(rules)) {
      if (rule.pluginName === pluginName) {
        const skillFile = path.join(skillsDir, `${name}.md`);
        if (fs.existsSync(skillFile)) {
          fs.unlinkSync(skillFile);
          console.log(`[plugin-skill-loader] Removed skill file: ${skillFile}`);
        }
      }
    }

    return true;
  } catch (error) {
    console.error('[plugin-skill-loader] Error removing skills:', error);
    return false;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  loadSkills,
  registerSkills,
  unregisterSkills,
  copySkillsToProject,
  removeSkillsFromProject
};
