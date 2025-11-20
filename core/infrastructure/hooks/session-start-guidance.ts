/**
 * Session Start Guidance Hook
 *
 * Runs at session startup to inject core principles and standards into Claude's context.
 * This drives natural compliance through proactive guidance rather than reactive enforcement.
 *
 * v5.3.0: Guidance-First Architecture
 * - Core principles (behavior, constraints, workflow)
 * - CLI tool standards (rg/fd/bat/exa)
 * - Total cost: ~700 tokens per session (one-time)
 */

import * as fs from 'fs';
import * as path from 'path';
import { isCached, addToCache } from './utils/context-cache';

interface GuidanceFile {
  name: string;
  path: string;
  tokens: number;
}

/**
 * Guidance files to inject at session start
 */
const GUIDANCE_FILES: GuidanceFile[] = [
  {
    name: 'core-principles',
    path: 'data/core-principles-summary.md',
    tokens: 600
  },
  {
    name: 'cli-standards',
    path: 'data/cli-standards.md',
    tokens: 100
  }
];

/**
 * Inject session guidance into Claude's context
 */
async function injectSessionGuidance() {
  try {
    let totalTokens = 0;
    const loadedGuidance: string[] = [];

    for (const guide of GUIDANCE_FILES) {
      // Check cache - only inject once per session
      if (!isCached('guidance', guide.name, 'session')) {
        const guidancePath = path.join(__dirname, guide.path);

        if (!fs.existsSync(guidancePath)) {
          process.stderr.write(`⚠️  Guidance file not found: ${guide.name}\n`);
          continue;
        }

        const content = fs.readFileSync(guidancePath, 'utf-8');

        // Inject into Claude's context via stdout
        process.stdout.write(`<session-guidance name="${guide.name}">\n${content}\n</session-guidance>\n`);

        // Mark as loaded in session cache
        addToCache('guidance', guide.name, guidancePath, 'session', guide.tokens);

        loadedGuidance.push(guide.name);
        totalTokens += guide.tokens;
      }
    }

    if (loadedGuidance.length > 0) {
      process.stderr.write(`✓ Session guidance loaded (${loadedGuidance.join(', ')}, ~${totalTokens} tokens)\n`);
      process.stderr.write('  Guidance-first mode: Core principles in context for natural compliance\n');
    }

    process.exit(0);
  } catch (error) {
    process.stderr.write(`[session-start-guidance] Error: ${error}\n`);
    process.exit(0); // Don't fail the hook, just skip guidance
  }
}

// Run the hook
injectSessionGuidance();
