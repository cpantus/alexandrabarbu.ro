#!/usr/bin/env node
/**
 * Post-Tool-Use Hook: Write Tool Validation
 *
 * Validates file content against skill requirements after Write tool execution.
 * Checks for design anti-patterns when design-excellence/diagram-drawing skills are active.
 *
 * Enforcement: WARN mode (non-blocking, reports violations to stderr)
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationViolation {
  rule: string;
  line?: number;
  found: string;
  message: string;
}

interface ValidationResult {
  valid: boolean;
  violations: ValidationViolation[];
}

// Banned patterns for design-excellence skill
const DESIGN_PATTERNS = {
  // Typography: Inter/Roboto/Arial/Helvetica used alone (not in pairing context)
  bannedFonts: /font-family:\s*['"]?(Inter|Roboto|Arial|Helvetica)['"]?(?!\s*,)/gi,

  // Color: Pure white or pure black backgrounds
  pureWhite: /background(-color)?:\s*(#fff(?![0-9a-f])|white)(?!\s*-)/gi,
  pureBlack: /background(-color)?:\s*(#000(?![0-9a-f])|black)(?!\s*-)/gi,

  // Motion: Animation without accessibility support
  animationWithoutA11y: /(animation|transition|@keyframes)(?![\s\S]*?@media\s*\([^)]*prefers-reduced-motion)/gi
};

/**
 * Load session cache to check if design skills are active
 */
function isDesignSkillActive(): boolean {
  try {
    const sessionId = process.env.CLAUDE_SESSION_ID || 'default';
    const cachePath = path.join(
      process.cwd(),
      'core/infrastructure/hooks/utils',
      `claude-context-cache-${sessionId}.json`
    );

    if (!fs.existsSync(cachePath)) {
      return false;
    }

    const cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    const loadedSkills = cache.loadedSkills || {};

    // Check if design-excellence or diagram-drawing are loaded this session
    return !!(loadedSkills['design-excellence'] || loadedSkills['diagram-drawing']);
  } catch (error) {
    // If cache check fails, skip validation (don't break workflow)
    return false;
  }
}

/**
 * Validate file content against design patterns
 */
function validateDesignContent(content: string, filePath: string): ValidationResult {
  const violations: ValidationViolation[] = [];
  const ext = path.extname(filePath).toLowerCase();

  // Only validate frontend files
  if (!['.html', '.css', '.js', '.jsx', '.tsx', '.vue'].includes(ext)) {
    return { valid: true, violations: [] };
  }

  // Check for banned fonts (Inter/Roboto/Arial/Helvetica used alone)
  let match;
  const bannedFonts = content.matchAll(DESIGN_PATTERNS.bannedFonts);
  for (match of bannedFonts) {
    violations.push({
      rule: 'typography-anti-pattern',
      found: match[0],
      message: `Banned font "${match[1]}" detected (signals AI slop). Use distinctive fonts: Archivo, Space Grotesk, IBM Plex Sans, Crimson Pro, Fira Code`
    });
  }

  // Check for pure white backgrounds
  const pureWhite = content.matchAll(DESIGN_PATTERNS.pureWhite);
  for (match of pureWhite) {
    violations.push({
      rule: 'background-anti-pattern',
      found: match[0],
      message: 'Pure white (#fff) background detected. Use layered gradients or off-white colors for depth'
    });
  }

  // Check for pure black backgrounds
  const pureBlack = content.matchAll(DESIGN_PATTERNS.pureBlack);
  for (match of pureBlack) {
    violations.push({
      rule: 'background-anti-pattern',
      found: match[0],
      message: 'Pure black (#000) background detected. Use near-black with subtle color for sophistication'
    });
  }

  // Check for animations without accessibility support
  if (/(animation|transition|@keyframes)/i.test(content)) {
    if (!/@media\s*\([^)]*prefers-reduced-motion/i.test(content)) {
      violations.push({
        rule: 'motion-accessibility',
        found: 'Animation/transition without accessibility',
        message: 'MANDATORY: Include @media (prefers-reduced-motion: reduce) block for animations'
      });
    }
  }

  return {
    valid: violations.length === 0,
    violations
  };
}

/**
 * Main hook execution
 */
function main() {
  try {
    // Parse tool use data from stdin
    const input = fs.readFileSync(0, 'utf-8');
    const toolUse = JSON.parse(input);

    // Extract file path from Write tool parameters
    const filePath = toolUse.params?.file_path;
    if (!filePath) {
      console.error('⚠️  post-tool-use-write: No file_path in Write tool params');
      process.exit(0);
    }

    // Check if design skills are active
    if (!isDesignSkillActive()) {
      // No design skills loaded, skip validation
      process.exit(0);
    }

    // Read file content
    if (!fs.existsSync(filePath)) {
      console.error(`⚠️  post-tool-use-write: File not found: ${filePath}`);
      process.exit(0);
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Validate content
    const result = validateDesignContent(content, filePath);

    // Report violations (WARN mode - non-blocking)
    if (!result.valid && result.violations.length > 0) {
      console.error('');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('⚠️  DESIGN ANTI-PATTERNS DETECTED');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('');
      console.error(`File: ${path.basename(filePath)}`);
      console.error(`Violations: ${result.violations.length}`);
      console.error('');

      result.violations.forEach((v, i) => {
        console.error(`${i + 1}. ${v.message}`);
        console.error(`   Found: ${v.found}`);
        console.error('');
      });

      console.error('These patterns signal "AI slop" and undermine credibility.');
      console.error('See: .claude/skills/design-excellence.md for guidance');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('');
    }

    // Exit 0 (success) - warnings don't block file write
    process.exit(0);
  } catch (error) {
    // Don't break workflow on validation errors
    console.error(`⚠️  post-tool-use-write validation error: ${error}`);
    process.exit(0);
  }
}

main();
