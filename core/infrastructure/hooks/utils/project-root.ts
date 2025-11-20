/**
 * Centralized project root detection utility
 *
 * Provides portable project root detection that works regardless of:
 * - Hook installation location
 * - Symbolic links
 * - Non-git installations
 *
 * Uses git root detection first, falls back to current working directory.
 * Results are cached for performance.
 *
 * @module project-root
 */

import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

let cachedProjectRoot: string | null = null;

/**
 * Get the project root directory
 *
 * Detection strategy:
 * 1. Try git root (git rev-parse --show-toplevel)
 * 2. Fall back to current working directory
 * 3. Cache result for performance
 *
 * @returns Absolute path to project root
 *
 * @example
 * ```typescript
 * import { getProjectRoot } from './utils/project-root';
 *
 * const projectRoot = getProjectRoot();
 * const configPath = path.join(projectRoot, '.claude', 'settings.json');
 * ```
 */
export function getProjectRoot(): string {
  // Return cached value if available
  if (cachedProjectRoot) {
    return cachedProjectRoot;
  }

  // Strategy 1: Try git root
  try {
    const gitRoot = execSync('git rev-parse --show-toplevel', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'], // Suppress stderr
    }).trim();

    if (gitRoot && fs.existsSync(gitRoot)) {
      cachedProjectRoot = gitRoot;
      return gitRoot;
    }
  } catch {
    // Not in a git repository, continue to fallback
  }

  // Strategy 2: Fall back to current working directory
  const cwd = process.cwd();
  cachedProjectRoot = cwd;
  return cwd;
}

/**
 * Clear the cached project root
 *
 * Useful for testing or if the project root changes during execution
 * (rare in normal operation).
 *
 * @example
 * ```typescript
 * import { clearProjectRootCache } from './utils/project-root';
 *
 * // In tests
 * afterEach(() => {
 *   clearProjectRootCache();
 * });
 * ```
 */
export function clearProjectRootCache(): void {
  cachedProjectRoot = null;
}

/**
 * Get a path relative to project root
 *
 * Convenience function that combines getProjectRoot() with path.join()
 *
 * @param segments - Path segments to join with project root
 * @returns Absolute path
 *
 * @example
 * ```typescript
 * import { getProjectPath } from './utils/project-root';
 *
 * const settingsPath = getProjectPath('.claude', 'settings.json');
 * const hooksDir = getProjectPath('core', 'infrastructure', 'hooks');
 * ```
 */
export function getProjectPath(...segments: string[]): string {
  return path.join(getProjectRoot(), ...segments);
}
