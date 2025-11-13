
/**
 * SessionEnd Hook
 *
 * Runs when Claude Code session ends.
 * Cleans up temporary cache files.
 */

import { pruneCache } from './utils/context-cache';

/**
 * Main hook function
 */
async function main() {
  try {
    // Prune expired entries from cache
    // (Don't clear completely - user might resume session)
    pruneCache();

    process.exit(0);
  } catch (error) {
    // Fail silently
    process.exit(0);
  }
}

// Run the hook
main();
