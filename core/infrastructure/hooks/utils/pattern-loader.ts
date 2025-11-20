/**
 * Pattern Loader Utility
 *
 * Progressive disclosure pattern loading for "mandatory" enforcement.
 * Mirrors skill-loader.ts but adapted for pattern structure.
 *
 * Loads patterns with tier-based context optimization:
 * - Minimal/Quick: Core sections only (PURPOSE, PROCESS, OUTPUT) ~200-500 lines
 * - Full: Complete pattern content
 *
 * Maintains 40-60% token savings via progressive disclosure.
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Extract core sections from pattern file
 * Returns PURPOSE, PROCESS, OUTPUT sections which contain execution logic
 *
 * Excludes:
 * - Extended examples
 * - Detailed explanations
 * - Variation sections (loaded on-demand if needed)
 */
export function extractPatternCore(patternPath: string, maxLines: number = 500): string | null {
  try {
    const absolutePath = path.isAbsolute(patternPath)
      ? patternPath
      : path.resolve(process.cwd(), patternPath);

    if (!fs.existsSync(absolutePath)) {
      return null;
    }

    const content = fs.readFileSync(absolutePath, 'utf-8');
    const lines = content.split('\n');

    // Extract core sections (PURPOSE through OUTPUT)
    const coreStart = lines.findIndex(line => /^##?\s+(PURPOSE|Input|Process)/i.test(line));
    const variationsStart = lines.findIndex(line => /^##?\s+(VARIATIONS|Examples|Additional)/i.test(line));

    if (coreStart === -1) {
      // No clear structure, take first N lines
      return lines.slice(0, maxLines).join('\n');
    }

    const endLine = variationsStart > coreStart ? variationsStart : Math.min(coreStart + maxLines, lines.length);
    const core = lines.slice(coreStart, endLine).join('\n');

    // Add truncation notice if content is longer
    if (variationsStart > coreStart || lines.length > endLine) {
      return core + '\n\n[... Full pattern available via @-reference or in full tier mode ...]';
    }

    return core;
  } catch (error) {
    console.error(`[pattern-loader] Error extracting core from ${patternPath}:`, error);
    return null;
  }
}

/**
 * Load complete pattern file
 */
export function loadFullPattern(patternPath: string): string | null {
  try {
    const absolutePath = path.isAbsolute(patternPath)
      ? patternPath
      : path.resolve(process.cwd(), patternPath);

    if (!fs.existsSync(absolutePath)) {
      return null;
    }

    return fs.readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    console.error(`[pattern-loader] Error loading pattern ${patternPath}:`, error);
    return null;
  }
}

/**
 * Format pattern injection for Claude's context
 * Uses <required-pattern> tags for clear identification
 */
export function formatPatternInjection(
  patternName: string,
  content: string,
  mode: 'core' | 'full'
): string {
  const header = [
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `🔴 REQUIRED PATTERN AUTO-LOADED: ${patternName}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    `Mode: ${mode === 'core' ? 'Core Execution Logic' : 'Full Content'}`,
    'Enforcement: MANDATORY APPLICATION (pattern files are delegatable systems)',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ''
  ].join('\n');

  const footer = [
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '⚡ REQUIREMENT: Execute this pattern workflow',
    '   This is a delegatable system - follow the PROCESS steps to completion.',
    '   The pattern is in your context to ensure quality gates are met.',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ''
  ].join('\n');

  return `<required-pattern name="${patternName}" mode="${mode}">\n${header}\n${content}\n${footer}\n</required-pattern>`;
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
 * Load pattern with progressive disclosure based on tier
 *
 * @param patternName Pattern identifier
 * @param patternPath Path to pattern file
 * @param tier Context tier (minimal/quick/full)
 * @returns Formatted pattern content for injection
 */
export function loadPatternProgressive(
  patternName: string,
  patternPath: string,
  tier: 'minimal' | 'quick' | 'full'
): { content: string; tokens: number; mode: 'core' | 'full' } | null {
  try {
    let content: string | null = null;
    let mode: 'core' | 'full' = 'core';

    // Determine loading strategy based on tier
    if (tier === 'minimal' || tier === 'quick') {
      // Load core sections only (PURPOSE, PROCESS, OUTPUT)
      content = extractPatternCore(patternPath, 500);
      mode = 'core';
    } else if (tier === 'full') {
      // Load complete pattern
      content = loadFullPattern(patternPath);
      mode = 'full';
    }

    if (!content) {
      return null;
    }

    // Format for injection
    const formatted = formatPatternInjection(patternName, content, mode);
    const tokens = estimateTokens(formatted);

    return { content: formatted, tokens, mode };
  } catch (error) {
    console.error(`[pattern-loader] Error loading pattern progressively:`, error);
    return null;
  }
}
