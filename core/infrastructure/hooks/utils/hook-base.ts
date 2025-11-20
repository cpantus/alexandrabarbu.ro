/**
 * Hook Base Utilities
 *
 * Shared utilities for all pre-tool and post-tool hooks.
 * Eliminates duplicated boilerplate code (~200 lines across 6 hooks).
 *
 * Provides:
 * - Standard stdin reading
 * - JSON parsing with error handling
 * - Early exit patterns
 * - Error formatting
 * - Passthrough logic
 */

// ============================================================================
// Standard I/O Operations
// ============================================================================

/**
 * Read stdin to get tool use arguments
 *
 * Used by all hooks to receive tool arguments from Claude Code.
 * Returns raw input string that needs to be parsed.
 */
export async function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      resolve(data);
    });
  });
}

/**
 * Parse tool arguments from stdin input
 *
 * Handles JSON parsing with error handling.
 * Returns null if parsing fails (hook should passthrough).
 */
export function parseToolArgs(input: string): any | null {
  try {
    return JSON.parse(input);
  } catch (error) {
    return null;
  }
}

/**
 * Check if input should be processed or passed through
 *
 * Common early-exit conditions across all hooks.
 */
export function shouldSkipProcessing(input: string, toolArgs: any | null): boolean {
  // No input
  if (!input || input.trim().length === 0) {
    return true;
  }

  // Failed to parse JSON
  if (toolArgs === null) {
    return true;
  }

  return false;
}

// ============================================================================
// Output Operations
// ============================================================================

/**
 * Pass input through unchanged to stdout
 *
 * Used when hook determines it should not process the tool use.
 * Supports both raw string input and parsed JSON objects.
 */
export function passthroughInput(input: string | any): void {
  if (typeof input === 'string') {
    process.stdout.write(input);
  } else {
    process.stdout.write(JSON.stringify(input));
  }
  process.exit(0);
}

/**
 * Output modified tool arguments to stdout
 *
 * Used when hook successfully modifies tool arguments.
 */
export function outputToolArgs(toolArgs: any): void {
  process.stdout.write(JSON.stringify(toolArgs));
  process.exit(0);
}

// ============================================================================
// Error Handling
// ============================================================================

/**
 * Format and display standardized error message
 *
 * Used for warnings, validation errors, and informational messages.
 */
export function formatErrorMessage(
  level: 'ERROR' | 'WARNING' | 'INFO',
  title: string,
  details: string[]
): void {
  const icons = {
    ERROR: '🚨',
    WARNING: '⚠️',
    INFO: 'ℹ️'
  };

  console.error(`\n${icons[level]} [${level}] ${title}`);
  details.forEach(detail => {
    console.error(`   ${detail}`);
  });
  console.error('');
}

/**
 * Display blocking error and exit
 *
 * Used when hook must prevent tool execution.
 * Returns never (exits process).
 */
export function blockWithError(
  title: string,
  details: string[],
  exitCode: number = 1
): never {
  formatErrorMessage('ERROR', title, details);
  process.exit(exitCode);
}

// ============================================================================
// Path Utilities
// ============================================================================

/**
 * Get project root from hook location
 *
 * Hooks are in core/infrastructure/hooks/, so go up 3 directories.
 * Returns absolute path to project root.
 */
export function getProjectRoot(): string {
  const path = require('path');
  return path.resolve(__dirname, '../../..');
}

/**
 * Get relative path from project root
 *
 * Useful for determining if file is in specific directory.
 */
export function getRelativePath(filePath: string): string {
  const path = require('path');
  const projectRoot = getProjectRoot();
  return path.relative(projectRoot, filePath);
}

// ============================================================================
// File Path Helpers
// ============================================================================

/**
 * Extract file path from tool arguments
 *
 * Handles various tool argument formats (file_path, path, etc.)
 */
export function getFilePath(toolArgs: any): string | null {
  return toolArgs.file_path || toolArgs.path || null;
}

/**
 * Get component name from file path
 *
 * Extracts just the filename without extension.
 */
export function getComponentName(filePath: string): string {
  const path = require('path');
  const basename = path.basename(filePath);
  return basename.replace(/\.(md|ts|js|json)$/, '');
}

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Hook configuration interface
 *
 * Standard configuration pattern for all hooks.
 */
export interface HookConfig {
  enabled: boolean;
  silent?: boolean;
  warnOnError?: boolean;
  maxExecutionTime?: number;
}

/**
 * Tool arguments type
 *
 * Common structure of tool arguments from Claude Code.
 */
export interface ToolArgs {
  command?: string;
  file_path?: string;
  path?: string;
  content?: string;
  old_string?: string;
  new_string?: string;
  [key: string]: any;
}
