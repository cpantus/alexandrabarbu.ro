/**
 * Utility functions for running build checks (TypeScript compilation)
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { ErrorIssue } from './formatter';

export interface BuildResult {
  success: boolean;
  errors: ErrorIssue[];
  stderr: string;
}

/**
 * Check if TypeScript is available
 */
export function isTypeScriptAvailable(): boolean {
  try {
    execSync('which tsc', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Find tsconfig.json in project
 */
export function findTsConfig(projectRoot: string): string | null {
  const possiblePaths = [
    path.join(projectRoot, 'tsconfig.json'),
    path.join(projectRoot, 'tsconfig.build.json'),
    path.join(projectRoot, 'packages', 'backend', 'tsconfig.json') // Monorepo support
  ];

  for (const configPath of possiblePaths) {
    if (fs.existsSync(configPath)) {
      return configPath;
    }
  }

  return null;
}

/**
 * Run TypeScript compilation check
 */
export function runTypeScriptCheck(projectRoot: string): BuildResult {
  // Check if TypeScript is available
  if (!isTypeScriptAvailable()) {
    return {
      success: true, // Don't fail if TypeScript isn't set up
      errors: [],
      stderr: 'TypeScript not found - skipping type check'
    };
  }

  // Find tsconfig.json
  const tsConfigPath = findTsConfig(projectRoot);
  if (!tsConfigPath) {
    return {
      success: true, // Don't fail if no TypeScript config
      errors: [],
      stderr: 'No tsconfig.json found - skipping type check'
    };
  }

  try {
    // Run tsc --noEmit (type check only, no compilation)
    execSync(`tsc --noEmit --project ${tsConfigPath}`, {
      cwd: projectRoot,
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    return {
      success: true,
      errors: [],
      stderr: ''
    };
  } catch (error: any) {
    // Parse TypeScript errors
    const stderr = error.stderr || error.stdout || '';
    const errors = parseTypeScriptErrors(stderr);

    return {
      success: false,
      errors,
      stderr
    };
  }
}

/**
 * Parse TypeScript error output into structured format
 */
function parseTypeScriptErrors(output: string): ErrorIssue[] {
  const errors: ErrorIssue[] = [];

  // TypeScript error format:
  // src/file.ts(10,5): error TS2322: Type 'string' is not assignable to type 'number'.
  const errorRegex = /(.+?)\((\d+),\d+\):\s+error\s+TS\d+:\s+(.+)/g;

  let match;
  while ((match = errorRegex.exec(output)) !== null) {
    const [, filePath, line, message] = match;

    errors.push({
      file: filePath.split('/').pop() || filePath,
      message: message.trim(),
      severity: 'critical',
      line: parseInt(line, 10)
    });
  }

  // If no structured errors found but there's output, create generic error
  if (errors.length === 0 && output.trim().length > 0) {
    errors.push({
      file: 'unknown',
      message: 'TypeScript compilation failed (see details below)',
      severity: 'critical'
    });
  }

  return errors;
}

/**
 * Run ESLint check (if available)
 */
export function runESLintCheck(projectRoot: string): BuildResult {
  try {
    execSync('which eslint', { stdio: 'ignore' });
  } catch {
    return {
      success: true,
      errors: [],
      stderr: 'ESLint not found - skipping'
    };
  }

  try {
    execSync('eslint . --quiet', {
      cwd: projectRoot,
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    return {
      success: true,
      errors: [],
      stderr: ''
    };
  } catch (error: any) {
    const stderr = error.stderr || error.stdout || '';

    return {
      success: false,
      errors: [{
        file: 'project',
        message: 'ESLint found issues',
        severity: 'warning'
      }],
      stderr
    };
  }
}

/**
 * Run all build checks
 */
export function runAllChecks(projectRoot: string): BuildResult {
  const tsResult = runTypeScriptCheck(projectRoot);

  // Only run ESLint if TypeScript check passed
  if (tsResult.success) {
    const eslintResult = runESLintCheck(projectRoot);
    if (!eslintResult.success) {
      return {
        success: false,
        errors: [...tsResult.errors, ...eslintResult.errors],
        stderr: tsResult.stderr + '\n' + eslintResult.stderr
      };
    }
  }

  return tsResult;
}
