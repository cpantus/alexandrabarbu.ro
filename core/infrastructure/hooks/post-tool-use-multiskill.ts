/**
 * Post-Tool-Use Multi-Skill Composition Validation Hook (v5.5.0)
 *
 * Runs AFTER Claude completes a tool use (Write, Edit, or Task).
 * Validates that composition acknowledgment appears in output when multiple skills were loaded.
 *
 * Philosophy: If 2+ skills auto-loaded, they should work together, not in isolation.
 * This hook validates that Claude acknowledged the composition and used skills in conjunction.
 *
 * Enforcement: WARNING (non-blocking, but signals quality issue)
 */

import * as path from 'path';
import * as fs from 'fs';
import { getCachedKeys, isCached } from './utils/context-cache';
import { extractCompositionAcknowledgment, shouldCompose, detectCompositions } from './utils/composition-matcher';
import { readStdinWithTimeout } from './utils/stdin-reader';
import { getProjectRoot } from './utils/project-root';

interface ToolUseEvent {
  tool: string;
  args: any;
  result?: string;
  error?: string;
}

/**
 * Main hook function
 */
async function main() {
  try {
    // Read tool use event from stdin (JSON format) with timeout
    const eventData = await readStdinWithTimeout({ timeout: 1000 });

    if (!eventData || eventData.trim().length === 0) {
      process.exit(0);
    }

    let event: ToolUseEvent;
    try {
      event = JSON.parse(eventData);
    } catch (error) {
      // Not JSON, skip validation
      process.exit(0);
    }

    // Only validate for Write, Edit, and Task tools (significant outputs)
    if (!['Write', 'Edit', 'Task'].includes(event.tool)) {
      process.exit(0);
    }

    // Check if multiple skills were loaded this session
    const loadedSkills = getLoadedSkillsFromCache();

    if (loadedSkills.length < 2) {
      // Less than 2 skills loaded, no composition expected
      process.exit(0);
    }

    // Check if these skills should compose
    if (!shouldCompose(loadedSkills)) {
      // No known composition for these skills, skip validation
      process.exit(0);
    }

    // Get the content that was written/edited
    let content = '';

    if (event.tool === 'Write') {
      content = event.args?.content || '';
    } else if (event.tool === 'Edit') {
      content = event.args?.new_string || '';
    } else if (event.tool === 'Task') {
      content = event.args?.prompt || '';
    }

    if (!content || content.length < 100) {
      // Too short to require composition acknowledgment
      process.exit(0);
    }

    // Extract composition acknowledgment from content
    const acknowledgment = extractCompositionAcknowledgment(content);

    if (!acknowledgment.found) {
      // No composition acknowledgment found - warn user
      process.stderr.write('\\n');
      process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n');
      process.stderr.write('⚠️  MULTI-SKILL COMPOSITION WARNING\\n');
      process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n');
      process.stderr.write('\\n');
      process.stderr.write(`Multiple skills loaded this session: ${loadedSkills.join(', ')}\\n`);
      process.stderr.write('\\n');
      process.stderr.write('Expected composition acknowledgment in output (NOT FOUND):\\n');
      process.stderr.write('\\n');
      process.stderr.write('  Multi-Skill Composition Applied:\\n');
      process.stderr.write('  - [skill-1]: [contribution]\\n');
      process.stderr.write('  - [skill-2]: [contribution]\\n');
      process.stderr.write('  - [skill-3]: [contribution]\\n');
      process.stderr.write('\\n');
      process.stderr.write('📉 Quality Impact: Skills used in isolation = suboptimal quality\\n');
      process.stderr.write('   Composition synergy lost (1.5-4.0x quality multiplier not applied)\\n');
      process.stderr.write('\\n');
      process.stderr.write('💡 Recommendation: Revise output to explicitly show how all loaded\\n');
      process.stderr.write('   skills worked together to produce the result.\\n');
      process.stderr.write('\\n');
      process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n');
      process.stderr.write('\\n');
    } else if (!acknowledgment.is_valid) {
      // Acknowledgment found but invalid (< 2 skills mentioned)
      process.stderr.write('\\n');
      process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n');
      process.stderr.write('⚠️  INCOMPLETE COMPOSITION ACKNOWLEDGMENT\\n');
      process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n');
      process.stderr.write('\\n');
      process.stderr.write(`Loaded skills: ${loadedSkills.join(', ')}\\n`);
      process.stderr.write(`Mentioned in output: ${acknowledgment.skills_mentioned.join(', ') || 'none'}\\n`);
      process.stderr.write('\\n');
      process.stderr.write('❌ Invalid: Composition acknowledgment found but incomplete.\\n');
      process.stderr.write(`   Expected ${loadedSkills.length} skills, found ${acknowledgment.skills_mentioned.length}.\\n`);
      process.stderr.write('\\n');
      process.stderr.write('💡 Ensure all loaded skills are explicitly acknowledged with their\\n');
      process.stderr.write('   specific contributions to the output.\\n');
      process.stderr.write('\\n');
      process.stderr.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n');
      process.stderr.write('\\n');
    } else {
      // Valid composition acknowledgment found - success!
      const projectRoot = getProjectRoot();

      // Try to detect which composition was used
      const compositions = detectCompositions(loadedSkills, content);

      let compositionName = 'multi-skill composition';
      let synergyMultiplier = 'unknown';

      if (compositions.length > 0) {
        compositionName = compositions[0].composition.name;
        synergyMultiplier = compositions[0].composition.synergy_multiplier.toFixed(1);
      }

      process.stderr.write(`✓ Valid composition acknowledgment (${compositionName}, ${synergyMultiplier}x quality multiplier)\\n`);
    }

    process.exit(0);
  } catch (error) {
    console.error('[post-tool-use-multiskill] Error:', error);
    process.exit(0); // Don't fail the hook, just skip
  }
}

/**
 * Get list of skills loaded this session from context cache
 */
function getLoadedSkillsFromCache(): string[] {
  try {
    const cachedKeys = getCachedKeys('skill-loaded');
    return cachedKeys;
  } catch (error) {
    return [];
  }
}

// Removed: readStdin() - now using readStdinWithTimeout() from utils/stdin-reader.ts

// Run the hook
main();
