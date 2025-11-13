/**
 * Post-Tool-Use Pattern Validation Hook
 *
 * Validates that patterns complete all required stages and produce expected outputs.
 * Prevents partial execution bugs where Claude skips stages.
 *
 * Triggered: After Task tool execution (pattern invocation)
 * Action: Validate outputs match pattern metadata requirements
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// ============================================================================
// Types
// ============================================================================

interface PatternOutputSpec {
  pattern: string;
  minCount: number;
  minSize: number;
  description: string;
}

interface PatternStage {
  name: string;
  description: string;
  outputs: PatternOutputSpec[];
}

interface RequiredOutputs {
  stages: PatternStage[];
  enforceSequential: boolean;
  validateOnCompletion: boolean;
}

interface PatternMetadata {
  category: string;
  complexity: string;
  requiredOutputs?: RequiredOutputs;
}

interface ValidationResult {
  valid: boolean;
  missingStages: string[];
  missingFiles: Array<{
    stage: string;
    pattern: string;
    expected: number;
    found: number;
    description: string;
  }>;
  undersizedFiles: Array<{
    stage: string;
    file: string;
    size: number;
    minSize: number;
  }>;
}

// ============================================================================
// Constants
// ============================================================================

const PATTERN_INDEX_PATH = path.join(
  __dirname,
  '../../patterns/pattern-index.json'
);

const WORKING_DIR = process.cwd();

// ============================================================================
// Utilities
// ============================================================================

/**
 * Load pattern index
 */
function loadPatternIndex(): Record<string, PatternMetadata> {
  try {
    const content = fs.readFileSync(PATTERN_INDEX_PATH, 'utf-8');
    const index = JSON.parse(content);
    return index.patterns || {};
  } catch (error) {
    console.error('[post-tool-use-pattern] Error loading pattern index:', error);
    return {};
  }
}

/**
 * Extract pattern name from tool invocation
 * Handles: /pattern enhanced_planning "task"
 */
function extractPatternName(toolInput: string): string | null {
  // Match: /pattern [name] OR /pattern [name] "args"
  const match = toolInput.match(/\/pattern\s+(\w+)/);
  return match ? match[1] : null;
}

/**
 * Check if files matching pattern exist
 */
async function findMatchingFiles(pattern: string): Promise<string[]> {
  try {
    const fullPattern = path.join(WORKING_DIR, pattern);
    const files = await glob(fullPattern, { nodir: true });
    return files;
  } catch (error) {
    console.error(`[post-tool-use-pattern] Error globbing ${pattern}:`, error);
    return [];
  }
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath: string): number {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

/**
 * Validate pattern outputs
 */
async function validatePatternOutputs(
  patternName: string,
  requiredOutputs: RequiredOutputs
): Promise<ValidationResult> {
  const result: ValidationResult = {
    valid: true,
    missingStages: [],
    missingFiles: [],
    undersizedFiles: []
  };

  for (const stage of requiredOutputs.stages) {
    let stageValid = true;

    for (const outputSpec of stage.outputs) {
      const files = await findMatchingFiles(outputSpec.pattern);

      // Check file count
      if (files.length < outputSpec.minCount) {
        result.valid = false;
        stageValid = false;
        result.missingFiles.push({
          stage: stage.name,
          pattern: outputSpec.pattern,
          expected: outputSpec.minCount,
          found: files.length,
          description: outputSpec.description
        });
      }

      // Check file sizes
      for (const file of files) {
        const size = getFileSize(file);
        if (size < outputSpec.minSize) {
          result.valid = false;
          stageValid = false;
          result.undersizedFiles.push({
            stage: stage.name,
            file: path.relative(WORKING_DIR, file),
            size,
            minSize: outputSpec.minSize
          });
        }
      }
    }

    if (!stageValid) {
      result.missingStages.push(stage.name);
    }
  }

  return result;
}

/**
 * Format validation error message
 */
function formatValidationError(
  patternName: string,
  result: ValidationResult
): string {
  const lines: string[] = [];

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('⚠️  PATTERN STAGE VALIDATION FAILED');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push(`Pattern: ${patternName}`);
  lines.push(`Incomplete Stages: ${result.missingStages.join(', ')}`);
  lines.push('');

  if (result.missingFiles.length > 0) {
    lines.push('Missing Output Files:');
    for (const missing of result.missingFiles) {
      lines.push(`  ❌ Stage "${missing.stage}": ${missing.pattern}`);
      lines.push(`     Expected: ${missing.expected} file(s), Found: ${missing.found}`);
      lines.push(`     Description: ${missing.description}`);
      lines.push('');
    }
  }

  if (result.undersizedFiles.length > 0) {
    lines.push('Undersized Output Files:');
    for (const undersized of result.undersizedFiles) {
      lines.push(`  ⚠️  Stage "${undersized.stage}": ${undersized.file}`);
      lines.push(`     Size: ${undersized.size} bytes (minimum: ${undersized.minSize})`);
      lines.push('');
    }
  }

  lines.push('NEXT STEPS:');
  lines.push(`  1. Review pattern documentation: /pattern ${patternName} --help`);
  lines.push(`  2. Complete missing stages manually`);
  lines.push(`  3. Or re-run pattern with explicit stage execution`);
  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return lines.join('\n');
}

// ============================================================================
// Main Hook Logic
// ============================================================================

async function main() {
  try {
    // Read hook input from stdin
    const input = fs.readFileSync(0, 'utf-8');
    const hookData = JSON.parse(input);

    // Only validate Task tool (patterns invoked via Task)
    if (hookData.tool !== 'Task') {
      process.exit(0);
    }

    // Extract pattern name from tool input
    const toolInput = hookData.parameters?.prompt || '';
    const patternName = extractPatternName(toolInput);

    if (!patternName) {
      // Not a pattern invocation
      process.exit(0);
    }

    // Load pattern metadata
    const patterns = loadPatternIndex();
    const patternMetadata = patterns[patternName];

    if (!patternMetadata) {
      console.error(`[post-tool-use-pattern] Pattern not found: ${patternName}`);
      process.exit(0);
    }

    // Check if pattern has validation requirements
    const requiredOutputs = patternMetadata.requiredOutputs;
    if (!requiredOutputs || !requiredOutputs.validateOnCompletion) {
      // Pattern doesn't require validation
      process.exit(0);
    }

    // Validate pattern outputs
    const result = await validatePatternOutputs(patternName, requiredOutputs);

    if (!result.valid) {
      // Validation failed - output error message
      const errorMessage = formatValidationError(patternName, result);
      process.stderr.write(errorMessage + '\n');

      // For now: WARN only (don't block)
      // Future: Could block with process.exit(1) if enforceSequential is true
      process.exit(0);
    }

    // Validation passed
    process.exit(0);
  } catch (error) {
    console.error('[post-tool-use-pattern] Hook error:', error);
    process.exit(0); // Don't block on hook errors
  }
}

main();
