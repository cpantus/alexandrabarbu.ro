/**
 * Skill Loader Utility
 *
 * Progressive disclosure skill loading for "require" enforcement.
 * Loads skills with tier-based context optimization:
 * - Minimal/Quick: Core principles only (200-300 lines)
 * - Full: Complete skill content (400-500 lines)
 * - Resources: Always on-demand (never auto-loaded)
 *
 * Maintains 40-60% token savings via progressive disclosure.
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Extract core principles from skill file
 * Returns first N lines which typically contain:
 * - Purpose and overview
 * - Key anti-patterns (CRITICAL for quality)
 * - Critical rules and principles
 * - Quick reference checklist
 *
 * Excludes:
 * - Detailed examples
 * - Extended explanations
 * - Resource references (loaded on-demand)
 */
export function extractSkillCore(skillPath: string, maxLines: number = 300): string | null {
  try {
    const absolutePath = path.isAbsolute(skillPath)
      ? skillPath
      : path.resolve(process.cwd(), skillPath);

    if (!fs.existsSync(absolutePath)) {
      return null;
    }

    const content = fs.readFileSync(absolutePath, 'utf-8');
    const lines = content.split('\n');

    // Take first N lines (core principles section)
    const coreLines = lines.slice(0, maxLines);
    const core = coreLines.join('\n');

    // Add truncation notice if content is longer
    if (lines.length > maxLines) {
      return core + '\n\n[... Full skill available via @-reference or in full tier mode ...]';
    }

    return core;
  } catch (error) {
    console.error(`[skill-loader] Error extracting core from ${skillPath}:`, error);
    return null;
  }
}

/**
 * Load complete skill file
 */
export function loadFullSkill(skillPath: string): string | null {
  try {
    const absolutePath = path.isAbsolute(skillPath)
      ? skillPath
      : path.resolve(process.cwd(), skillPath);

    if (!fs.existsSync(absolutePath)) {
      return null;
    }

    return fs.readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    console.error(`[skill-loader] Error loading skill ${skillPath}:`, error);
    return null;
  }
}

/**
 * List available resources for a skill
 * Resources are in skill-name/resources/ directory
 *
 * Updated for official Claude Code format (v5.6.0):
 * - Skills are now skill-name/SKILL.md (directory-based)
 * - Resources are in skill-name/resources/ (not skills/resources/skill-name/)
 */
export function listSkillResources(skillPath: string): string[] {
  try {
    const absolutePath = path.isAbsolute(skillPath)
      ? skillPath
      : path.resolve(process.cwd(), skillPath);

    // For official format: skill-name/SKILL.md
    // Resources are at: skill-name/resources/
    const skillDir = path.dirname(absolutePath); // Gets skill-name/ directory
    const resourcesDir = path.join(skillDir, 'resources');

    if (!fs.existsSync(resourcesDir)) {
      return [];
    }

    const files = fs.readdirSync(resourcesDir);
    return files
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));
  } catch (error) {
    console.error(`[skill-loader] Error listing resources for ${skillPath}:`, error);
    return [];
  }
}

/**
 * Format skill injection for Claude's context
 * Uses <required-skill> tags for clear identification
 *
 * v5.3.1: Added acknowledgment gates for "require" enforcement
 */
export function formatSkillInjection(
  skillName: string,
  content: string,
  mode: 'core' | 'full',
  resources: string[]
): string {
  // Build skill header (directive content injection - no acknowledgment gates)
  const headerParts: string[] = [
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `🔴 REQUIRED SKILL AUTO-LOADED: ${skillName}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    `Mode: ${mode === 'core' ? 'Core Principles' : 'Full Content'}`,
    'Enforcement: MANDATORY APPLICATION (not just awareness)'
  ];

  if (mode === 'core' && resources.length > 0) {
    headerParts.push(
      '',
      `📚 Full guidance: @skill file | Resources: ${resources.join(', ')}`
    );
  }

  headerParts.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '');

  const header = headerParts.join('\n');

  const footer = [
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '⚡ REQUIREMENT: Apply these principles in your response',
    '   Reading without application is useless.',
    '   This skill is loaded because it is MANDATORY for acceptable quality.',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ''
  ].join('\n');

  return `<required-skill name="${skillName}" mode="${mode}">\n${header}\n${content}\n${footer}\n</required-skill>`;
}

/**
 * Get estimated token count for content (rough approximation)
 * Used for logging and optimization metrics
 */
export function estimateTokens(content: string): number {
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil(content.length / 4);
}

/**
 * Load skill with progressive disclosure based on tier
 *
 * @param skillPath Path to skill file
 * @param tier Context tier (minimal/quick/full)
 * @returns Formatted skill content for injection
 */
export function loadSkillProgressive(
  skillName: string,
  skillPath: string,
  tier: 'minimal' | 'quick' | 'full'
): { content: string; tokens: number; mode: 'core' | 'full' } | null {
  try {
    let content: string | null = null;
    let mode: 'core' | 'full' = 'core';

    // Determine loading strategy based on tier
    if (tier === 'minimal' || tier === 'quick') {
      // Load core principles only (200-300 lines)
      content = extractSkillCore(skillPath, 300);
      mode = 'core';
    } else if (tier === 'full') {
      // Load complete skill
      content = loadFullSkill(skillPath);
      mode = 'full';
    }

    if (!content) {
      return null;
    }

    // Get available resources
    const resources = listSkillResources(skillPath);

    // Format for injection
    const formatted = formatSkillInjection(skillName, content, mode, resources);
    const tokens = estimateTokens(formatted);

    return { content: formatted, tokens, mode };
  } catch (error) {
    console.error(`[skill-loader] Error loading skill progressively:`, error);
    return null;
  }
}
