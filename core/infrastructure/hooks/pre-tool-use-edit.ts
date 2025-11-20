
/**
 * PreToolUse Edit Hook
 *
 * Runs BEFORE the Edit tool is used to modify existing files.
 * Validates component consistency and AUTO-CORRECTS issues.
 *
 * This ensures all component modifications follow system conventions with automatic fixes.
 */

import * as path from 'path';
import * as fs from 'fs';
import {
  validateComponent,
  formatValidationReport,
  autoCorrectComponent,
  ComponentType
} from './utils/component-consistency-validator';
import { initializePatternCache } from './utils/pattern-parser';
import {
  readStdin,
  parseToolArgs,
  passthroughInput,
  outputToolArgs,
  getFilePath,
  getProjectRoot,
  getRelativePath,
  getComponentName as getBaseComponentName,
} from './utils/hook-base';

// Initialize pattern cache at module load (v5.2)
initializePatternCache();

/**
 * Parse component type from file path
 */
function getComponentTypeFromPath(filePath: string): ComponentType | null {
  const relativePath = getRelativePath(filePath);

  if (relativePath.startsWith('.claude/agents/')) {
    return { type: 'agent', path: filePath };
  } else if (relativePath.startsWith('.claude/patterns/')) {
    const parts = relativePath.split('/');
    const category = parts[2]; // content, strategy, analysis, optimization
    if (['content', 'strategy', 'analysis', 'optimization', 'workflow'].includes(category)) {
      return { type: 'pattern', category, path: filePath };
    }
    return { type: 'pattern', path: filePath };
  } else if (relativePath.startsWith('.claude/skills/')) {
    return { type: 'skill', path: filePath };
  } else if (relativePath.startsWith('.claude/commands/')) {
    return { type: 'command', path: filePath };
  } else if ((relativePath.startsWith('core/infrastructure/hooks/') ||
              relativePath.startsWith('marketing-plugin/hooks/')) &&
             relativePath.endsWith('.ts')) {
    if (relativePath.includes('/utils/')) {
      return { type: 'utility', path: filePath };
    }
    return { type: 'hook', path: filePath };
  }

  return null;
}

/**
 * Main hook function
 */
async function main() {
  let input = '';

  try {
    // Get tool use arguments from stdin
    input = await readStdin();

    // Parse the tool use arguments (JSON format)
    const toolArgs = parseToolArgs(input);

    // Early exit if no valid input or parse failed
    if (!input || input.trim().length === 0 || toolArgs === null) {
      passthroughInput(input);
      return;
    }

    // Get file path from tool arguments
    const filePath = getFilePath(toolArgs);
    if (!filePath) {
      outputToolArgs(toolArgs);
      return;
    }

    // Get project root
    const projectRoot = getProjectRoot();

    // Check if this is a component file that needs validation
    const componentType = getComponentTypeFromPath(filePath);
    if (!componentType) {
      // Not a component file, output as-is
      outputToolArgs(toolArgs);
      return;
    }

    // Get component name
    const componentName = getBaseComponentName(filePath);

    // For edits, we need to read the current file and apply the change to validate the result
    let content = '';
    try {
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf-8');

        // If we have old_string and new_string, simulate the edit
        if (toolArgs.old_string && toolArgs.new_string) {
          content = content.replace(toolArgs.old_string, toolArgs.new_string);
        }
      }
    } catch (error) {
      // Can't read file, output as-is
      outputToolArgs(toolArgs);
      return;
    }

    // Only validate if we're editing the YAML frontmatter or structure
    // (not every small edit needs validation)
    const isStructuralEdit =
      (toolArgs.old_string && toolArgs.old_string.includes('---')) || // YAML frontmatter
      (toolArgs.old_string && toolArgs.old_string.includes('##')) ||    // Section headers
      (toolArgs.old_string && toolArgs.old_string.includes('description:')) || // Agent description
      (toolArgs.old_string && toolArgs.old_string.includes('# /'));     // Command header

    if (!isStructuralEdit) {
      // Not a structural edit, skip validation to avoid noise
      outputToolArgs(toolArgs);
      return;
    }

    // Run validation on the edited content
    const validationResult = validateComponent(
      componentName,
      content,
      componentType,
      projectRoot
    );

    // Check if there are any issues that need correction
    if (!validationResult.overallValid ||
        validationResult.criticalIssues.length > 0) {

      // AUTO-CORRECT the issues
      const { corrected, changes } = autoCorrectComponent(
        componentName,
        content,
        componentType,
        validationResult,
        projectRoot
      );

      // Update the new_string in tool arguments to include corrections
      // We need to apply the correction to just the edited portion
      toolArgs.new_string = corrected.includes(toolArgs.new_string)
        ? toolArgs.new_string
        : corrected.replace(content.replace(toolArgs.old_string, toolArgs.new_string), toolArgs.new_string);

      if (changes.length > 0) {
        // Show what was fixed
        console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('✨ AUTO-CORRECTED EDIT');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.error(`📝 Component: ${componentName} (${componentType.type})`);
        console.error('\n🔧 FIXES APPLIED:');
        changes.forEach(change => console.error(`   ✅ ${change}`));
        console.error('\n💡 Edit has been auto-corrected to match system standards');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }
    }

    // Output the (potentially corrected) tool arguments
    outputToolArgs(toolArgs);

  } catch (error) {
    // Log error but pass through original input
    console.error('[pre-tool-use-edit] Error:', error);
    passthroughInput(input);
  }
}

// Run the hook
main();
