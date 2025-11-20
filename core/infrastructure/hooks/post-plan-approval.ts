/**
 * PostPlanApproval Hook (v5.7.0)
 *
 * Runs AFTER user approves a plan (ExitPlanMode), BEFORE execution begins.
 * Validates that the plan explicitly addresses all detected constraints.
 *
 * Philosophy: "Awareness without application" prevention
 * - If constraints exist (e.g., <500 lines, "don't overdo"), plan MUST acknowledge them
 * - Blocks execution if plan violates or ignores constraints
 * - Forces explicit design thinking before implementation
 *
 * This hook prevents failures where Claude:
 * 1. Reads standards/constraints
 * 2. Understands them correctly
 * 3. Creates plan that violates them anyway
 * 4. Implements the flawed plan
 *
 * Created: 2025-11-18
 * Solves: github.com/anthropics/claude-code/issues/excalidraw-1107-line-violation
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  detectConstraints,
  validatePlanConstraints,
  formatValidationErrors,
  PlanConstraints
} from './utils/constraint-detector';

interface PostPlanApprovalEvent {
  plan: string;
  conversationHistory?: string;  // Full conversation text for constraint detection
}

/**
 * Read event data from stdin
 */
async function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf-8');

    process.stdin.on('data', (chunk) => {
      data += chunk;
    });

    process.stdin.on('end', () => {
      resolve(data);
    });

    // Timeout after 1 second
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

/**
 * Extract conversation history from various sources
 */
function extractConversationHistory(event: any): string {
  // Try different possible locations for conversation history
  if (event.conversationHistory) {
    return event.conversationHistory;
  }

  if (event.context) {
    return event.context;
  }

  // If not provided, use just the plan (limited constraint detection)
  return event.plan || '';
}

/**
 * Main hook function
 */
async function main() {
  try {
    // Read event from stdin
    const input = await readStdin();

    if (!input || input.trim().length === 0) {
      // No input, exit gracefully
      process.exit(0);
    }

    // Parse event
    let event: PostPlanApprovalEvent;
    try {
      event = JSON.parse(input);
    } catch (error) {
      // Not JSON or parse failed, exit gracefully
      process.stderr.write('[post-plan-approval] Could not parse event, skipping validation\n');
      process.exit(0);
    }

    // Get plan text
    const plan = event.plan || '';

    if (plan.length < 50) {
      // Plan too short to validate meaningfully
      process.exit(0);
    }

    // Extract conversation history for constraint detection
    const conversationHistory = extractConversationHistory(event);

    // STEP 1: Detect constraints from conversation
    const constraints = detectConstraints(conversationHistory);

    // If no constraints detected, exit early (no validation needed)
    if (Object.keys(constraints).length === 0 ||
        (Object.keys(constraints).length === 1 && constraints.detectedFrom)) {
      process.stderr.write('[post-plan-approval] ✓ No constraints detected, proceeding with plan\n');
      process.exit(0);
    }

    // STEP 2: Validate plan against constraints
    const validation = validatePlanConstraints(plan, constraints);

    // STEP 3: Handle validation result
    if (!validation.valid) {
      // BLOCKING ERROR: Plan violates constraints
      const errorMessage = formatValidationErrors(validation, constraints);

      process.stderr.write(errorMessage);
      process.stderr.write('\nFix the plan to address constraints, then try again.\n');
      process.stderr.write('Use ExitPlanMode with updated plan after addressing issues above.\n\n');

      // Exit with error code to block execution
      process.exit(1);

    } else if (validation.warnings.length > 0) {
      // NON-BLOCKING WARNINGS: Plan could be improved
      const warningMessage = formatValidationErrors(validation, constraints);

      process.stderr.write(warningMessage);
      process.stderr.write('Proceeding with plan (warnings are non-blocking).\n\n');

      // Exit successfully (warnings don't block)
      process.exit(0);

    } else {
      // PERFECT: Plan addresses all constraints
      process.stderr.write('[post-plan-approval] ✓ Plan addresses all detected constraints\n');

      // Show what was validated for transparency
      if (constraints.detectedFrom && constraints.detectedFrom.length > 0) {
        process.stderr.write('\n📋 Validated Constraints:\n');
        constraints.detectedFrom.forEach(source => {
          process.stderr.write(`   ✓ ${source}\n`);
        });
        process.stderr.write('\n');
      }

      process.exit(0);
    }

  } catch (error) {
    // Log error but don't block execution (fail open for safety)
    process.stderr.write(`[post-plan-approval] Error: ${error}\n`);
    process.stderr.write('[post-plan-approval] Proceeding despite error (fail-open mode)\n');
    process.exit(0);
  }
}

// Run the hook
main();
