#!/usr/bin/env -S npx tsx

/**
 * Documentation Enforcement Validator
 *
 * Validates that required documentation files have been updated when code changes are committed.
 * Part of the git pre-commit hook workflow.
 *
 * Exit Codes:
 *   0 - All validation passed (or bypassed)
 *   1 - Minor violations found (warns but allows commit)
 *   2 - Major violations found (blocks commit)
 */

import { execSync } from 'child_process';
import { existsSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
import { minimatch } from 'minimatch';

// Types
interface Rule {
  name: string;
  pattern: string;
  excludePattern?: string | null;
  docs: string[];
  severity: 'major' | 'minor';
  message: string;
}

interface Config {
  version: string;
  description: string;
  timestampWindow: number;
  rules: Rule[];
  excludeFiles: string[];
  bypassPatterns: string[];
  bypassMessage: string;
}

interface Violation {
  rule: Rule;
  changedFiles: string[];
  missingDocs: string[];
  severity: 'major' | 'minor';
}

// Constants
const CONFIG_PATH = 'core/infrastructure/hooks/utils/doc-enforcement-config.json';
const PROJECT_ROOT = process.cwd();

// Color codes for terminal output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

/**
 * Load configuration from JSON file
 */
function loadConfig(): Config {
  const configPath = join(PROJECT_ROOT, CONFIG_PATH);

  if (!existsSync(configPath)) {
    console.error(`${COLORS.red}Error: Configuration file not found: ${configPath}${COLORS.reset}`);
    process.exit(2);
  }

  try {
    const configContent = readFileSync(configPath, 'utf-8');
    return JSON.parse(configContent) as Config;
  } catch (error) {
    console.error(`${COLORS.red}Error loading configuration: ${error}${COLORS.reset}`);
    process.exit(2);
  }
}

/**
 * Get list of staged files from git
 */
function getStagedFiles(): string[] {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
      cwd: PROJECT_ROOT,
    });

    return output.trim().split('\n').filter(file => file.length > 0);
  } catch (error) {
    console.error(`${COLORS.red}Error getting staged files: ${error}${COLORS.reset}`);
    return [];
  }
}

/**
 * Check if commit message indicates bypass
 */
function shouldBypass(config: Config): boolean {
  try {
    // Try to get the commit message from COMMIT_EDITMSG
    const commitMsgPath = join(PROJECT_ROOT, '.git', 'COMMIT_EDITMSG');

    if (!existsSync(commitMsgPath)) {
      return false;
    }

    const commitMsg = readFileSync(commitMsgPath, 'utf-8').split('\n')[0];

    for (const pattern of config.bypassPatterns) {
      const regex = new RegExp(pattern);
      if (regex.test(commitMsg)) {
        console.log(`${COLORS.cyan}ℹ ${config.bypassMessage}${COLORS.reset}`);
        return true;
      }
    }

    return false;
  } catch (error) {
    // If we can't read commit message, don't bypass
    return false;
  }
}

/**
 * Check if a file should be excluded from validation
 */
function isExcluded(file: string, config: Config): boolean {
  return config.excludeFiles.some(pattern => minimatch(file, pattern));
}

/**
 * Check if a file matches a rule pattern
 */
function matchesPattern(file: string, rule: Rule): boolean {
  const matches = minimatch(file, rule.pattern);

  if (!matches) {
    return false;
  }

  // Check exclude pattern if defined
  if (rule.excludePattern) {
    const excluded = minimatch(file, rule.excludePattern);
    return !excluded;
  }

  return true;
}

/**
 * Check if a documentation file was recently modified
 */
function wasRecentlyModified(docPath: string, windowSeconds: number): boolean {
  const fullPath = join(PROJECT_ROOT, docPath);

  if (!existsSync(fullPath)) {
    return false;
  }

  try {
    const stats = statSync(fullPath);
    const now = Date.now();
    const fileTime = stats.mtimeMs;
    const ageSeconds = (now - fileTime) / 1000;

    return ageSeconds <= windowSeconds;
  } catch (error) {
    return false;
  }
}

/**
 * Check if a documentation file is staged in this commit
 */
function isStaged(docPath: string, stagedFiles: string[]): boolean {
  return stagedFiles.includes(docPath);
}

/**
 * Validate documentation requirements
 */
function validate(config: Config, stagedFiles: string[]): Violation[] {
  const violations: Violation[] = [];

  // Group files by matching rules
  for (const rule of config.rules) {
    const matchedFiles = stagedFiles.filter(file =>
      !isExcluded(file, config) && matchesPattern(file, rule)
    );

    if (matchedFiles.length === 0) {
      continue;
    }

    // Check if required docs are updated
    const missingDocs = rule.docs.filter(doc => {
      const recentlyModified = wasRecentlyModified(doc, config.timestampWindow);
      const staged = isStaged(doc, stagedFiles);

      return !recentlyModified && !staged;
    });

    if (missingDocs.length > 0) {
      violations.push({
        rule,
        changedFiles: matchedFiles,
        missingDocs,
        severity: rule.severity,
      });
    }
  }

  return violations;
}

/**
 * Format time window in human-readable format
 */
function formatTimeWindow(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  return `${hours} hour${hours > 1 ? 's' : ''}`;
}

/**
 * Display violations to user
 */
function displayViolations(violations: Violation[], config: Config): void {
  const majorViolations = violations.filter(v => v.severity === 'major');
  const minorViolations = violations.filter(v => v.severity === 'minor');

  if (majorViolations.length > 0) {
    console.error(`\n${COLORS.red}${COLORS.bold}❌ DOCUMENTATION ENFORCEMENT FAILED${COLORS.reset}`);
    console.error(`${COLORS.red}The following major violations will block this commit:${COLORS.reset}\n`);

    majorViolations.forEach((violation, idx) => {
      console.error(`${COLORS.bold}${idx + 1}. ${violation.rule.name}${COLORS.reset}`);
      console.error(`   ${COLORS.red}${violation.rule.message}${COLORS.reset}`);
      console.error(`   ${COLORS.cyan}Changed files:${COLORS.reset}`);
      violation.changedFiles.forEach(file => {
        console.error(`     - ${file}`);
      });
      console.error(`   ${COLORS.yellow}Required documentation (not updated in last ${formatTimeWindow(config.timestampWindow)}):${COLORS.reset}`);
      violation.missingDocs.forEach(doc => {
        console.error(`     - ${doc}`);
      });
      console.error('');
    });

    console.error(`${COLORS.bold}To fix:${COLORS.reset}`);
    console.error(`1. Update the required documentation files`);
    console.error(`2. Stage the documentation changes: ${COLORS.cyan}git add <doc-files>${COLORS.reset}`);
    console.error(`3. Retry your commit\n`);
    console.error(`${COLORS.bold}To bypass (use sparingly):${COLORS.reset}`);
    console.error(`Prefix your commit message with WIP: or TEMP:\n`);
  }

  if (minorViolations.length > 0) {
    console.warn(`\n${COLORS.yellow}${COLORS.bold}⚠ DOCUMENTATION WARNINGS${COLORS.reset}`);
    console.warn(`${COLORS.yellow}The following documentation updates are recommended:${COLORS.reset}\n`);

    minorViolations.forEach((violation, idx) => {
      console.warn(`${COLORS.bold}${idx + 1}. ${violation.rule.name}${COLORS.reset}`);
      console.warn(`   ${violation.rule.message}`);
      console.warn(`   ${COLORS.cyan}Changed files:${COLORS.reset}`);
      violation.changedFiles.forEach(file => {
        console.warn(`     - ${file}`);
      });
      console.warn(`   ${COLORS.yellow}Recommended documentation updates:${COLORS.reset}`);
      violation.missingDocs.forEach(doc => {
        console.warn(`     - ${doc}`);
      });
      console.warn('');
    });

    console.warn(`${COLORS.yellow}Proceeding with commit in 5 seconds...${COLORS.reset}\n`);
  }
}

/**
 * Main execution
 */
function main(): void {
  const config = loadConfig();

  // Check for bypass
  if (shouldBypass(config)) {
    process.exit(0);
  }

  // Get staged files
  const stagedFiles = getStagedFiles();

  if (stagedFiles.length === 0) {
    console.log(`${COLORS.green}✓ No staged files to validate${COLORS.reset}`);
    process.exit(0);
  }

  // Validate
  const violations = validate(config, stagedFiles);

  if (violations.length === 0) {
    console.log(`${COLORS.green}✓ Documentation enforcement passed${COLORS.reset}`);
    process.exit(0);
  }

  // Display violations
  displayViolations(violations, config);

  // Determine exit code
  const hasMajorViolations = violations.some(v => v.severity === 'major');
  const hasMinorViolations = violations.some(v => v.severity === 'minor');

  if (hasMajorViolations) {
    process.exit(2);
  } else if (hasMinorViolations) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { loadConfig, getStagedFiles, validate, type Config, type Violation };
