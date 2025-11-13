/**
 * [Hook Name] Hook
 *
 * Purpose: [Brief description of what this hook does]
 * Hook Type: [PreToolUse|PostToolUse|SessionStart|SessionEnd|UserPromptSubmit]
 * Event: [Tool name or event type]
 *
 * DOCUMENTATION CHECKLIST - COMPLETE BEFORE IMPLEMENTING:
 * ─────────────────────────────────────────────────────────────────
 * [ ] 1. Update core/docs/hook-architecture.md:
 *        - Add entry to "Current Hooks" table
 *        - Include: Hook name, type, purpose, impact
 *        - Document any configuration options
 *
 * [ ] 2. Update .claude/CLAUDE.md (if behavior-defining):
 *        - Add rule to Core Principles if this hook enforces policy
 *        - Reference in Hook Architecture section
 *        - Document any environment variables
 *
 * [ ] 3. Update .claude/settings.json:
 *        - Add hook registration with correct event type
 *        - Set proper command path (npx tsx core/infrastructure/hooks/...)
 *        - Add any required permissions
 *
 * [ ] 4. Update ARCHITECTURE.md (if architectural):
 *        - Add to Hook System section if introduces new capability
 *        - Document integration points with other systems
 *
 * [ ] 5. Create tests (if complex logic):
 *        - Test file: core/infrastructure/hooks/__tests__/[hook-name].test.ts
 *        - Cover main scenarios and edge cases
 * ─────────────────────────────────────────────────────────────────
 *
 * Implementation Notes:
 * - Hooks receive stdin with tool arguments (PreToolUse) or results (PostToolUse)
 * - Output to stderr for warnings/messages (stdout reserved for tool modification)
 * - Keep execution time under 50ms for good UX
 * - Use utils/ for shared logic to keep hooks lean
 * - Follow error handling patterns from existing hooks
 */

// ============================================================================
// Imports
// ============================================================================

// Add your imports here
// Example: import { someUtility } from './utils/your-utility';

// ============================================================================
// Configuration
// ============================================================================

const HOOK_CONFIG = {
  enabled: process.env.CC_DISABLE_YOUR_HOOK !== '1',
  debug: process.env.CC_YOUR_HOOK_DEBUG === '1',
  // Add other config options as needed
};

// ============================================================================
// Types
// ============================================================================

interface YourInputType {
  // Define the structure of input you expect
  // For PreToolUse hooks: tool arguments
  // For PostToolUse hooks: tool results
}

// ============================================================================
// Core Logic
// ============================================================================

/**
 * Main hook logic
 * @param input - Parsed input from stdin
 * @returns Modified output or void
 */
function processHook(input: YourInputType): void | string {
  if (!HOOK_CONFIG.enabled) {
    return;
  }

  try {
    // Your hook logic here

    // For PreToolUse hooks that modify tool input:
    // return JSON.stringify(modifiedInput);

    // For hooks that just observe/warn:
    // console.error('⚠️  Your warning message');

  } catch (error) {
    if (HOOK_CONFIG.debug) {
      console.error(`[DEBUG] Hook error: ${error}`);
    }
    // Fail gracefully - never break user workflow
    return;
  }
}

// ============================================================================
// Stdin Processing
// ============================================================================

async function main(): Promise<void> {
  try {
    // Read stdin
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    const input = Buffer.concat(chunks).toString('utf-8');

    if (!input.trim()) {
      return;
    }

    // Parse input
    const parsed = JSON.parse(input) as YourInputType;

    // Process
    const result = processHook(parsed);

    // Output (if modifying tool input)
    if (result) {
      console.log(result);
    }

  } catch (error) {
    if (HOOK_CONFIG.debug) {
      console.error(`[DEBUG] Main error: ${error}`);
    }
    // Never throw - hooks should fail silently
  }
}

// ============================================================================
// Execution
// ============================================================================

main();
