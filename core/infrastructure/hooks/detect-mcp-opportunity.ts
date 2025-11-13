#!/usr/bin/env node
/**
 * Detect MCP Code Execution Opportunity Hook
 *
 * Triggers when user prompt would benefit from MCP code execution pattern
 * instead of traditional direct MCP tool calls.
 *
 * Auto-activates mcp-code-execution skill when pattern detected.
 *
 * Event: UserPromptSubmit
 * Priority: After user-prompt-submit.ts (skill/pattern matching)
 */

import { detectMCPPattern, formatDetectionMessage } from './utils/mcp-detector.js';
import * as readline from 'readline';

async function readStdin(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  let input = '';
  for await (const line of rl) {
    input += line + '\n';
  }

  return input.trim();
}

async function main() {
  try {
    // Read user prompt from stdin
    const prompt = await readStdin();

    if (!prompt) {
      process.exit(0);
    }

    // Detect MCP optimization opportunity
    const detection = detectMCPPattern(prompt);

    // Output message if optimization recommended
    if (detection.shouldOptimize) {
      const message = formatDetectionMessage(detection);
      console.log(message);

      // Skill auto-activation happens via skill-rules.json configuration
      // This hook just provides the detection message
    }

    process.exit(0);

  } catch (error) {
    // Silent fail - don't block user prompt
    console.error('[detect-mcp-opportunity] Error:', error instanceof Error ? error.message : String(error));
    process.exit(0);
  }
}

main();
