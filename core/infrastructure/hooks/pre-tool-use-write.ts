
/**
 * PreToolUse Write Hook
 *
 * Runs BEFORE the Write tool is used to create new files.
 * Validates component consistency and AUTO-CORRECTS issues.
 *
 * This ensures all new components follow system conventions with automatic fixes.
 */

import * as path from 'path';
import * as fs from 'fs';
import {
  validateComponent,
  formatValidationReport,
  autoCorrectComponent,
  getCorrectedFileName,
  ComponentType
} from './utils/component-consistency-validator';
import { initializePatternCache } from './utils/pattern-parser';
import {
  validateV540Compliance,
  generateV540Warning,
  shouldSkipValidation
} from './utils/v540-validator';
import {
  readStdin,
  parseToolArgs,
  passthroughInput,
  outputToolArgs,
  blockWithError,
  getFilePath,
  getProjectRoot,
  getRelativePath,
  getComponentName as getBaseComponentName,
} from './utils/hook-base';

// Initialize pattern cache at module load
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
 * Estimate token count for content
 * Uses conservative estimate: ~3.5 characters per token
 * This ensures we don't underestimate and violate budget
 */
function estimateTokenCount(content: string): number {
  const chars = content.length;
  return Math.ceil(chars / 3.5);
}

/**
 * Check if file is a cache file
 */
function isCacheFile(filePath: string): boolean {
  const relativePath = getRelativePath(filePath);
  return relativePath.startsWith('.claude/knowledge/cache/');
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

    // ✅ CRITICAL: Check if file already exists (prevents duplicate creation)
    if (fs.existsSync(filePath)) {
      const relativePath = getRelativePath(filePath);
      blockWithError(
        'CRITICAL ERROR: File Already Exists',
        [
          `📁 Path: ${relativePath}`,
          `🔧 Type: ${componentType.type}`,
          '',
          '💡 Did you mean to MODIFY the existing file instead of creating a new one?',
          '   Use the Edit tool or Read + Edit pattern to modify existing files.',
          '',
          '🚫 OPERATION BLOCKED: Cannot overwrite existing component without explicit confirmation'
        ],
        1
      );
    }

    // Get component name
    const componentName = getBaseComponentName(filePath);

    // Get content if provided
    const content = toolArgs.content || '';

    // ✅ CACHE FILE TOKEN BUDGET VALIDATION (Phase 2)
    if (isCacheFile(filePath)) {
      const tokens = estimateTokenCount(content);
      const relativePath = path.relative(projectRoot, filePath);

      // BLOCK if >3,000 tokens (hard limit)
      if (tokens > 3000) {
        console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ CACHE FILE TOKEN BUDGET EXCEEDED');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.error(`📁 File: ${relativePath}`);
        console.error(`📊 Tokens: ${tokens.toLocaleString()} (limit: 3,000)`);
        console.error(`📈 Over budget by: ${(tokens - 3000).toLocaleString()} tokens`);
        console.error('\n💡 SOLUTIONS:');
        console.error('   1. Remove less critical content');
        console.error('   2. Split into multiple cache files (recommended)');
        console.error('   3. Move variable content to separate file');
        console.error('\n📖 RULES:');
        console.error('   • Cache files MUST be 2,000-3,000 tokens');
        console.error('   • This ensures optimal caching performance');
        console.error('   • Modular design: One cache file per domain');
        console.error('\n🚫 OPERATION BLOCKED: Cache file exceeds token budget');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        process.exit(1);
      }

      // WARN if <2,000 tokens (underutilized) or approaching limit
      if (tokens < 2000) {
        console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('⚠️  CACHE FILE UNDERUTILIZED');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.error(`📁 File: ${relativePath}`);
        console.error(`📊 Tokens: ${tokens.toLocaleString()} (target: 2,000-3,000)`);
        console.error(`📉 Remaining capacity: ${(2000 - tokens).toLocaleString()} tokens`);
        console.error('\n💡 CONSIDER:');
        console.error('   • Add more relevant content to maximize cache value');
        console.error('   • Merge with another small cache file');
        console.error('   • Keep as-is if content is complete');
        console.error('\n✅ Proceeding with write (no blocking issue)');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      } else if (tokens >= 2900) {
        console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('⚠️  CACHE FILE APPROACHING LIMIT');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.error(`📁 File: ${relativePath}`);
        console.error(`📊 Tokens: ${tokens.toLocaleString()} (limit: 3,000)`);
        console.error(`📉 Remaining budget: ${(3000 - tokens).toLocaleString()} tokens`);
        console.error('\n💡 Future edits may exceed budget - plan accordingly');
        console.error('✅ Proceeding with write');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      } else {
        // Sweet spot (2,000-2,900 tokens) - silent success
        console.error(`\n✅ Cache file token budget OK: ${tokens.toLocaleString()} tokens (target: 2,000-3,000)\n`);
      }
    }

    // Run validation
    const validationResult = validateComponent(
      componentName,
      content,
      componentType,
      projectRoot
    );

    // ✅ MANDATORY: Block naming violations (cannot auto-correct file names once written)
    if (!validationResult.naming.valid) {
      const relativePath = path.relative(projectRoot, filePath);
      console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('🚨 COMPONENT NAMING STANDARD VIOLATION');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.error(`📁 File: ${relativePath}`);
      console.error(`🔧 Type: ${componentType.type}`);
      console.error(`❌ Name: ${componentName}`);
      console.error(`✅ Expected format: ${validationResult.naming.expectedFormat}`);
      console.error(`❌ Actual format: ${validationResult.naming.actualFormat}`);

      if (validationResult.naming.issues.length > 0) {
        console.error('\n📋 Issues:');
        validationResult.naming.issues.forEach(issue => {
          console.error(`   • ${issue}`);
        });
      }

      if (validationResult.naming.suggestion) {
        console.error(`\n💡 Suggested name: ${validationResult.naming.suggestion}.md`);
        console.error(`   Updated path: ${path.dirname(relativePath)}/${validationResult.naming.suggestion}.md`);
      }

      console.error('\n📖 NAMING STANDARDS (MANDATORY):');
      console.error('   • Agents, commands, hooks: kebab-case (my-component-name)');
      console.error('   • Patterns: snake_case (my_pattern_name)');
      console.error('   • Skills: kebab-case (my-skill-name)');
      console.error('   • See: CLAUDE.md Quality Standards section');

      console.error('\n🚫 OPERATION BLOCKED: Fix naming before creating component');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      process.exit(1);
    }

    // ✅ v5.4.0 COMPLIANCE VALIDATION (Phase 6: Hook Enhancement)
    // Warn (not block) when components lack v5.4.0 structure
    if (!shouldSkipValidation(filePath) && content && content.length > 100) {
      const v540Result = validateV540Compliance(content, filePath);

      if (!v540Result.isCompliant) {
        const warning = generateV540Warning(v540Result, path.relative(projectRoot, filePath));
        if (warning) {
          console.error(warning);
        }

        // Log compliance status for observability
        if (v540Result.isPartiallyCompliant) {
          console.error(`\nℹ️  v5.4.0 Compliance: PARTIAL (has some structure, missing others)\n`);
        } else {
          console.error(`\nℹ️  v5.4.0 Compliance: NON-COMPLIANT (missing Task Decomposition Override framework)\n`);
        }
      } else {
        // Silently pass compliant components
        console.error(`\n✅ v5.4.0 Compliance: FULLY COMPLIANT\n`);
      }
    }

    // ✅ SUGGEST RESEARCH EXAMPLES (if available)
    // Check if research examples exist that might help
    try {
      const researchPath = path.join(projectRoot, 'research', 'component-examples');
      if (fs.existsSync(researchPath) && componentType.type !== 'utility') {
        const hasOutlines = fs.readdirSync(researchPath)
          .some(dir => {
            const outlinePath = path.join(researchPath, dir, 'outline.json');
            return fs.existsSync(outlinePath);
          });

        if (hasOutlines) {
          console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.error('💡 TIP: Research Examples Available');
          console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
          console.error(`   Creating new ${componentType.type}: ${componentName}`);
          console.error('   \n   Consider using /create-from-example to:');
          console.error('   • Search 300+ components from research repos');
          console.error('   • Adapt proven patterns to system standards');
          console.error('   • See side-by-side source vs adapted comparison');
          console.error('\n   Usage:');
          console.error(`   /create-from-example ${componentType.type} "${componentName.split('-').join(' ')}"`);
          console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }
      }
    } catch (error) {
      // Silently skip if research folder check fails
    }

    // Check if there are any issues that need correction
    if (!validationResult.overallValid ||
        validationResult.criticalIssues.length > 0 ||
        validationResult.warnings.length > 0) {

      // AUTO-CORRECT the issues
      const { corrected, changes } = autoCorrectComponent(
        componentName,
        content,
        componentType,
        validationResult,
        projectRoot
      );

      // Update tool arguments with corrected content
      toolArgs.content = corrected;

      // Check if file name needs correction (should not be needed due to blocking above)
      const correctedFileName = getCorrectedFileName(
        componentName,
        componentType,
        validationResult.naming
      );

      if (correctedFileName !== path.basename(filePath)) {
        // Update file path
        const dir = path.dirname(filePath);
        toolArgs.file_path = path.join(dir, correctedFileName);
      }

      // Show what was fixed
      console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('✨ AUTO-CORRECTED PRE-IMPLEMENTATION');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.error(`📝 Component: ${componentName} (${componentType.type})`);

      if (changes.length > 0) {
        console.error('\n🔧 FIXES APPLIED:');
        changes.forEach(change => console.error(`   ✅ ${change}`));
      }

      if (validationResult.similarComponents.length > 0 && validationResult.similarComponents[0].similarity > 0.7) {
        console.error('\n⚠️  NOTE: Very similar component exists:');
        console.error(`   📄 ${validationResult.similarComponents[0].name} (${Math.round(validationResult.similarComponents[0].similarity * 100)}% similar)`);
        console.error(`   Consider reviewing: ${validationResult.similarComponents[0].path}`);
      }

      console.error('\n💡 File has been auto-corrected to match system standards');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } else if (validationResult.recommendations.length > 0) {
      // No critical issues, but apply recommendations automatically
      const { corrected, changes } = autoCorrectComponent(
        componentName,
        content,
        componentType,
        validationResult,
        projectRoot
      );

      if (changes.length > 0) {
        toolArgs.content = corrected;

        console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('✨ AUTO-ENHANCED PRE-IMPLEMENTATION');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.error(`✅ ${componentName} (${componentType.type})`);
        console.error('\n💅 ENHANCEMENTS APPLIED:');
        changes.forEach(change => console.error(`   ✨ ${change}`));
        console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }
    }

    // Output the (potentially corrected) tool arguments
    outputToolArgs(toolArgs);

  } catch (error) {
    // Log error but pass through original input
    console.error('[pre-tool-use-write] Error:', error);
    passthroughInput(input);
  }
}

// Run the hook
main();
