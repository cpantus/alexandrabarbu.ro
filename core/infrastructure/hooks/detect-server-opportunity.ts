#!/usr/bin/env node
/**
 * Detect MCP Server Optimization Opportunity Hook
 *
 * Detects which MCP servers are needed based on user prompt keywords
 * and suggests optimal server configuration for token savings.
 *
 * Complementary to detect-mcp-opportunity.ts which detects code execution patterns.
 *
 * Event: UserPromptSubmit
 * Priority: After user-prompt-submit.ts (skill/pattern matching)
 */

import {
  loadMCPServerCatalog,
  detectNeededServers,
  recommendProfile,
  formatDetectionMessage,
  getLoadedServers,
  compareWithLoadedServers
} from './utils/mcp-server-detector.js';
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

    // Check if debug mode is enabled
    const debugMode = process.env.MCP_SERVER_DEBUG === '1';

    // Load MCP server catalog
    const catalog = loadMCPServerCatalog();

    // Detect which servers are needed
    const detection = detectNeededServers(prompt, catalog);

    // Get recommended profile
    const recommendedProfile = recommendProfile(detection, catalog);

    // Get currently loaded servers
    const loadedServers = getLoadedServers();

    // Compare with current configuration
    const comparison = compareWithLoadedServers(detection, loadedServers);

    // Format and output detection message
    const message = formatDetectionMessage(detection, recommendedProfile);

    if (message) {
      console.log(message);
    }

    // In debug mode, show detailed comparison
    if (debugMode) {
      console.error('\n🔬 DEBUG MODE - Server Comparison:');
      console.error(`   Currently loaded: ${loadedServers.join(', ') || 'none'}`);
      console.error(`   Detected needed: ${detection.serversNeeded.join(', ') || 'none'}`);
      console.error(`   Already loaded: ${comparison.alreadyLoaded.join(', ') || 'none'}`);
      console.error(`   Should load: ${comparison.shouldLoad.join(', ') || 'none'}`);
      console.error(`   Unnecessary: ${comparison.unnecessary.join(', ') || 'none'}`);
      console.error(`   Recommendation: ${comparison.recommendation}`);
      console.error('');
    }

    process.exit(0);

  } catch (error) {
    // Silent fail in production - don't block user prompt
    if (process.env.MCP_SERVER_DEBUG === '1') {
      console.error('[detect-server-opportunity] Error:', error instanceof Error ? error.message : String(error));
    }
    process.exit(0);
  }
}

main();
