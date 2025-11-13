/**
 * Utility functions for analyzing edited files for risky patterns
 */

import * as fs from 'fs';
import { ErrorIssue } from './formatter';

export interface RiskyPattern {
  pattern: RegExp;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  fileTypes: string[]; // File extensions this pattern applies to
}

/**
 * Define risky patterns to detect
 */
const RISKY_PATTERNS: RiskyPattern[] = [
  // TypeScript/JavaScript patterns
  {
    pattern: /try\s*\{[^}]*\}\s*catch\s*\([^)]*\)\s*\{[^}]*\}/g,
    message: 'try-catch block - verify error is logged or handled',
    severity: 'warning',
    fileTypes: ['.ts', '.js', '.tsx', '.jsx']
  },
  {
    pattern: /catch\s*\([^)]*\)\s*\{\s*\}/g,
    message: 'empty catch block - errors are silently swallowed',
    severity: 'critical',
    fileTypes: ['.ts', '.js', '.tsx', '.jsx']
  },
  {
    pattern: /async\s+function/g,
    message: 'async function - verify error handling with try-catch',
    severity: 'warning',
    fileTypes: ['.ts', '.js', '.tsx', '.jsx']
  },
  {
    pattern: /await\s+/g,
    message: 'await usage - verify surrounding try-catch for error handling',
    severity: 'info',
    fileTypes: ['.ts', '.js', '.tsx', '.jsx']
  },
  {
    pattern: /\.then\(/g,
    message: 'promise.then() - verify .catch() is present',
    severity: 'warning',
    fileTypes: ['.ts', '.js', '.tsx', '.jsx']
  },
  {
    pattern: /console\.log/g,
    message: 'console.log - consider using proper logging library in production',
    severity: 'info',
    fileTypes: ['.ts', '.js', '.tsx', '.jsx']
  },

  // Database patterns (Prisma)
  {
    pattern: /prisma\.[a-z]+\.(create|update|delete|findMany)/gi,
    message: 'Prisma query - verify repository pattern is used (not in route handler)',
    severity: 'warning',
    fileTypes: ['.ts', '.js']
  },

  // Security patterns
  {
    pattern: /process\.env\./g,
    message: 'environment variable access - verify it has fallback or validation',
    severity: 'warning',
    fileTypes: ['.ts', '.js', '.tsx', '.jsx']
  },
  {
    pattern: /eval\(/g,
    message: 'eval() usage - SECURITY RISK, avoid if possible',
    severity: 'critical',
    fileTypes: ['.ts', '.js', '.tsx', '.jsx']
  },

  // Marketing-specific patterns
  {
    pattern: /(guarantee|guaranteed|100%|always|never)\s+(results?|success|roi)/gi,
    message: 'absolute claim - may require legal review',
    severity: 'warning',
    fileTypes: ['.md', '.txt', '.html']
  },
  {
    pattern: /\b(synergy|leverage|paradigm|game-changer|revolutionary)\b/gi,
    message: 'forbidden marketing buzzword detected',
    severity: 'warning',
    fileTypes: ['.md', '.txt', '.html']
  }
];

/**
 * Analyze a file for risky patterns
 */
export function analyzeFile(filePath: string): ErrorIssue[] {
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return [];
  }

  // Get file extension
  const ext = filePath.substring(filePath.lastIndexOf('.'));

  // Filter patterns that apply to this file type
  const applicablePatterns = RISKY_PATTERNS.filter(p =>
    p.fileTypes.includes(ext)
  );

  if (applicablePatterns.length === 0) {
    return []; // No patterns to check for this file type
  }

  // Read file content
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`[file-analyzer] Error reading file ${filePath}:`, error);
    return [];
  }

  // Check each pattern
  const issues: ErrorIssue[] = [];

  for (const { pattern, message, severity } of applicablePatterns) {
    const matches = content.match(pattern);
    if (matches && matches.length > 0) {
      issues.push({
        file: filePath.split('/').pop() || filePath, // Just filename for brevity
        message: `${message} (${matches.length} occurrence${matches.length > 1 ? 's' : ''})`,
        severity,
        line: undefined // We could calculate line numbers, but keeping it simple
      });
    }
  }

  return issues;
}

/**
 * Analyze multiple files for risky patterns
 */
export function analyzeFiles(filePaths: string[]): ErrorIssue[] {
  const allIssues: ErrorIssue[] = [];

  for (const filePath of filePaths) {
    const issues = analyzeFile(filePath);
    allIssues.push(...issues);
  }

  // Deduplicate issues (same file + message)
  const seen = new Set<string>();
  return allIssues.filter(issue => {
    const key = `${issue.file}:${issue.message}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Load edited files from log
 */
export function loadEditedFiles(logPath: string): string[] {
  if (!fs.existsSync(logPath)) {
    return [];
  }

  try {
    const logContent = fs.readFileSync(logPath, 'utf-8');
    const log = JSON.parse(logContent);

    // Assume log format: { files: string[], timestamp: string }
    if (Array.isArray(log.files)) {
      return log.files;
    }

    // Alternative: array of file paths
    if (Array.isArray(log)) {
      return log;
    }

    return [];
  } catch (error) {
    console.error(`[file-analyzer] Error loading edit log:`, error);
    return [];
  }
}

/**
 * Group issues by severity
 */
export function groupBySeverity(issues: ErrorIssue[]): {
  critical: ErrorIssue[];
  warning: ErrorIssue[];
  info: ErrorIssue[];
} {
  return {
    critical: issues.filter(i => i.severity === 'critical'),
    warning: issues.filter(i => i.severity === 'warning'),
    info: issues.filter(i => i.severity === 'info')
  };
}
