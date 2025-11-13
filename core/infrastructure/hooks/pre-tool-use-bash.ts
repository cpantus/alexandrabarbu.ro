
/**
 * PreToolUse Bash Hook V2
 *
 * MANDATORY ENFORCEMENT: CLI Tool Standards (70-85% token savings)
 * Runs BEFORE the Bash tool is used to execute commands.
 * Automatically enforces modern CLI tools and auto-corrects violations.
 *
 * V1 Transformations (File System & Navigation) - MANDATORY:
 * - grep → ripgrep (rg) [REQUIRED]
 * - find → fd [REQUIRED]
 * - cat → bat (with line limits) [REQUIRED]
 * - ls → exa [REQUIRED]
 * - tree → tree (with depth limits) [REQUIRED]
 * - git → gh (in GitHub context) [REQUIRED]
 * - cd → zoxide (z) [REQUIRED]
 *
 * V2 Transformations (Structured Data & Batch Operations) - MANDATORY:
 * - grep/cat on .json → jq (JSON processor) [REQUIRED]
 * - grep/cat on .yml/.yaml → yq (YAML processor) [REQUIRED]
 * - cat large JSON → fx (interactive JSON viewer) [REQUIRED]
 * - find...exec / xargs → parallel (GNU Parallel) [REQUIRED]
 * - git diff/show → delta (syntax-highlighted diff) [REQUIRED]
 * - npm run/yarn/make → just (command runner recipes) [REQUIRED]
 *
 * Enforcement:
 * - Auto-corrects violations with WARNING
 * - Tracks violations for telemetry
 * - Fallback to legacy tools only if modern tools unavailable
 * - Zero breaking changes (graceful degradation)
 */

import {
  optimizeBashCommand,
  trackOptimization,
  checkToolAvailability,
} from './utils/bash-optimizer';

// ============================================================================
// Hook Configuration
// ============================================================================

const HOOK_CONFIG = {
  enabled: process.env.CC_DISABLE_BASH_OPT !== '1',
  silent: false, // MANDATORY warnings enabled
  warnOnFallback: false, // Don't spam warnings when tools unavailable
  warnOnSuboptimal: true, // MANDATORY: Always warn on CLI tool violations
  warnOnlyOnTransformation: true, // Performance: only warn when we transform
  maxExecutionTime: 30, // ms (optimized with filesystem caching)
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Read stdin to get tool use arguments
 */
async function readStdin(): Promise<string> {
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
 * Display MANDATORY warning when CLI tool standards violated
 */
function warnSuboptimalCommand(
  original: string,
  optimized: string,
  tool: string,
  savings: number
): void {
  if (HOOK_CONFIG.warnOnSuboptimal && HOOK_CONFIG.warnOnlyOnTransformation) {
    console.error(`\n🚨 [CLI Tool Standards] VIOLATION DETECTED - Auto-corrected`);
    console.error(`   ❌ Forbidden:  ${original}`);
    console.error(`   ✅ Required:   ${optimized}`);
    console.error(`   Tool: ${tool} | Token savings: ~${savings}%`);
    console.error(`   ⚠️  MANDATORY: Use modern CLI tools. See core/docs/cli-tool-standards.md`);
    console.error(`   📋 CLAUDE.md: "ALWAYS use modern CLI tools (see CLI Tool Standards section)"\n`);
  }
}

/**
 * Determine if command should skip optimization
 */
function shouldSkipOptimization(command: string): boolean {
  const skipPatterns = [
    // Skip git operations (except those optimized to gh)
    /^git\s+(add|commit|push|pull|checkout|branch|merge|rebase|stash)/,
    // Skip package managers
    /^(npm|yarn|pnpm|bun)\s/,
    // Skip interactive commands
    /^(vim|nano|emacs|less|more)\s/,
    // Skip system commands
    /^(sudo|systemctl|service)\s/,
    // Skip already optimized commands (V1 + V2)
    /^(rg|fd|bat|exa|gh|fzf|z|jq|yq|parallel|just|delta|fx)\s/,
    // Skip complex redirections (multiple > or <)
    /[><].*[><]/,
  ];

  return skipPatterns.some((pattern) => pattern.test(command));
}

// ============================================================================
// Main Hook Function
// ============================================================================

async function main() {
  let input = '';

  try {
    // Get tool use arguments from stdin
    input = await readStdin();

    if (!input || input.trim().length === 0) {
      // No input, output as-is
      process.stdout.write(input);
      process.exit(0);
    }

    // Parse the tool use arguments (JSON format)
    let toolArgs: any;
    try {
      toolArgs = JSON.parse(input);
    } catch (error) {
      // Can't parse, output as-is
      process.stdout.write(input);
      process.exit(0);
    }

    // Check if hook is enabled
    if (!HOOK_CONFIG.enabled) {
      process.stdout.write(JSON.stringify(toolArgs));
      process.exit(0);
    }

    // Extract command from tool arguments
    const command = toolArgs.command;
    if (!command || typeof command !== 'string') {
      // No command, output as-is
      process.stdout.write(JSON.stringify(toolArgs));
      process.exit(0);
    }

    // Skip optimization for certain command types
    if (shouldSkipOptimization(command.trim())) {
      process.stdout.write(JSON.stringify(toolArgs));
      process.exit(0);
    }

    const startTime = Date.now();

    // Perform optimization
    const result = await optimizeBashCommand(command.trim());

    const executionTime = Date.now() - startTime;

    // Track optimization for telemetry (with execution time)
    trackOptimization(result, executionTime);

    // Check execution time
    if (executionTime > HOOK_CONFIG.maxExecutionTime) {
      console.error(
        `[bash-optimizer] Hook execution took ${executionTime}ms (target: ${HOOK_CONFIG.maxExecutionTime}ms)`
      );
    }

    // If optimization was applied, update command
    if (result.applied && result.optimized !== result.original) {
      toolArgs.command = result.optimized;

      // Educational warning: teach correct tool usage
      warnSuboptimalCommand(
        result.original,
        result.optimized,
        result.tool || 'unknown',
        result.estimatedTokenSavings || 0
      );
    } else if (result.reason && HOOK_CONFIG.warnOnFallback) {
      console.error(`[bash-optimizer] ${result.reason}`);
    }

    // Output the (potentially modified) tool arguments
    process.stdout.write(JSON.stringify(toolArgs));
    process.exit(0);

  } catch (error) {
    // Silently pass through on error to avoid hook failures
    // Use the input we already read
    process.stdout.write(input || '{}');
    process.exit(0);
  }
}

// Run the hook
main();
