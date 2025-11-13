/**
 * Bash Optimizer Logger
 *
 * Logs optimization events to file for monitoring and debugging.
 * Log location: /tmp/bash-optimizer.log
 *
 * Features:
 * - Real-time logging of optimizations
 * - Rotating log (keeps last 1000 lines)
 * - Performance metrics tracking
 * - Debug mode support
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Configuration
// ============================================================================

const LOG_FILE = '/tmp/bash-optimizer.log';
const MAX_LOG_LINES = 1000;
const DEBUG_MODE = process.env.CC_BASH_OPT_DEBUG === '1';

// ============================================================================
// Types
// ============================================================================

export interface OptimizationLogEntry {
  timestamp: string;
  original: string;
  optimized: string;
  tool: string;
  tokensSaved: number;
  executionTime: number;
  applied: boolean;
  reason?: string;
}

// ============================================================================
// Logging Functions
// ============================================================================

/**
 * Ensure log file exists
 */
function ensureLogFile(): void {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '# Bash Optimizer Log\n# Generated: ' + new Date().toISOString() + '\n\n');
  }
}

/**
 * Rotate log file if needed (keep last N lines)
 */
function rotateLogIfNeeded(): void {
  try {
    if (!fs.existsSync(LOG_FILE)) return;

    const content = fs.readFileSync(LOG_FILE, 'utf-8');
    const lines = content.split('\n');

    if (lines.length > MAX_LOG_LINES) {
      // Keep header + last MAX_LOG_LINES entries
      const header = lines.slice(0, 2).join('\n');
      const recentLines = lines.slice(-MAX_LOG_LINES).join('\n');
      fs.writeFileSync(LOG_FILE, header + '\n\n' + recentLines);
    }
  } catch (error) {
    // Ignore rotation errors
  }
}

/**
 * Log optimization event
 */
export function logOptimization(entry: OptimizationLogEntry): void {
  try {
    ensureLogFile();

    const logLine = formatLogEntry(entry);
    fs.appendFileSync(LOG_FILE, logLine + '\n');

    // Output to stderr in debug mode
    if (DEBUG_MODE) {
      console.error('[bash-optimizer]', logLine);
    }

    // Rotate log if needed (async, don't block)
    setImmediate(rotateLogIfNeeded);
  } catch (error) {
    // Silent fail - don't break hook on logging errors
  }
}

/**
 * Format log entry as compact string
 */
function formatLogEntry(entry: OptimizationLogEntry): string {
  const timestamp = new Date(entry.timestamp).toISOString();

  if (entry.applied) {
    return `[${timestamp}] ✓ ${entry.tool} | ${entry.tokensSaved} tokens | ${entry.executionTime}ms | ${entry.original.substring(0, 60)}${entry.original.length > 60 ? '...' : ''}`;
  } else {
    return `[${timestamp}] ✗ SKIPPED | ${entry.reason || 'unknown'} | ${entry.original.substring(0, 60)}${entry.original.length > 60 ? '...' : ''}`;
  }
}

/**
 * Log session summary
 */
export function logSessionSummary(stats: {
  totalOptimizations: number;
  byTool: Record<string, number>;
  estimatedTokensSaved: number;
  failedOptimizations: number;
}): void {
  try {
    ensureLogFile();

    const summary = [
      '',
      '─────────────────────────────────────────────────────────',
      `SESSION SUMMARY | ${new Date().toISOString()}`,
      `Total Optimizations: ${stats.totalOptimizations}`,
      `Tokens Saved: ~${stats.estimatedTokensSaved}`,
      `Failed: ${stats.failedOptimizations}`,
      `By Tool: ${Object.entries(stats.byTool).map(([tool, count]) => `${tool}=${count}`).join(', ')}`,
      '─────────────────────────────────────────────────────────',
      '',
    ].join('\n');

    fs.appendFileSync(LOG_FILE, summary);

    if (DEBUG_MODE) {
      console.error('[bash-optimizer]', summary);
    }
  } catch (error) {
    // Silent fail
  }
}

/**
 * Get recent log entries (last N lines)
 */
export function getRecentLogs(count: number = 50): string[] {
  try {
    if (!fs.existsSync(LOG_FILE)) return [];

    const content = fs.readFileSync(LOG_FILE, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());

    return lines.slice(-count);
  } catch (error) {
    return [];
  }
}

/**
 * Clear log file
 */
export function clearLog(): void {
  try {
    if (fs.existsSync(LOG_FILE)) {
      fs.unlinkSync(LOG_FILE);
    }
  } catch (error) {
    // Silent fail
  }
}

/**
 * Get log file path
 */
export function getLogPath(): string {
  return LOG_FILE;
}

// ============================================================================
// Exports
// ============================================================================

export default {
  logOptimization,
  logSessionSummary,
  getRecentLogs,
  clearLog,
  getLogPath,
};
