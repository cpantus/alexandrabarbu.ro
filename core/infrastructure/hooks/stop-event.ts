/**
 * Stop Hook (Enhanced v2.0)
 *
 * Runs AFTER Claude finishes responding.
 *
 * Features:
 * 1. Analyzes edited files for risky patterns
 * 2. Runs build checks (TypeScript validation)
 * 3. Displays workflow automation suggestions
 * 4. Monitors budget and displays cost alerts
 *
 * This provides proactive error prevention and workflow guidance.
 */

import * as path from 'path';
import * as fs from 'fs';
import { analyzeFiles, loadEditedFiles } from './utils/file-analyzer';
import { runTypeScriptCheck } from './utils/build-runner';
import { formatErrorCheckReminder, ErrorIssue } from './utils/formatter';
import {
  loadPatternIndex,
  isPatternOutput,
  getPatternNameFromFile,
  loadPatternContent,
  getPatternCategory
} from './utils/pattern-matcher';
import {
  loadWorkflowStatus,
  formatWorkflowStatus
} from './utils/status-gate';
import {
  checkBudgetStatus,
  formatBudgetAlert
} from './utils/cost-budget';
import { getProjectRoot } from './utils/project-root';

/**
 * Main hook function
 */
async function main() {
  // Hook timeout protection (5 seconds)
  const HOOK_TIMEOUT = 5000;
  const timeoutId = setTimeout(() => {
    console.error('[stop-event] Timeout exceeded (5s), exiting gracefully');
    process.exit(0);
  }, HOOK_TIMEOUT);

  try {
    // Get project root (portable detection via git or cwd)
    const projectRoot = getProjectRoot();

    // Path to edit log (created by post-tool-use-edit hook)
    const editLogPath = '/tmp/claude-edit-log.json';

    // Load edited files
    const editedFiles = loadEditedFiles(editLogPath);

    // Analyze files for risky patterns (only if files were edited)
    let allIssues: ErrorIssue[] = [];

    if (editedFiles.length > 0) {
      const patternIssues = analyzeFiles(editedFiles);
      const patternValidationIssues = validatePatternOutputs(editedFiles, projectRoot);
      const buildResult = runTypeScriptCheck(projectRoot);

      allIssues = [
        ...patternIssues,
        ...patternValidationIssues,
        ...buildResult.errors
      ];
    }

    // Format error reminder message (if any issues)
    const errorReminder = allIssues.length > 0 ? formatErrorCheckReminder(allIssues) : '';

    // Check workflow status and format suggestions
    const workflowState = loadWorkflowStatus(projectRoot);
    const workflowReminder = workflowState ? formatWorkflowStatus(workflowState) : '';

    // Check budget status and format alerts
    const budgetStatus = checkBudgetStatus(projectRoot);
    const budgetAlert = budgetStatus.alert ? formatBudgetAlert(budgetStatus) : '';

    // Output all reminders/alerts
    let output = '';

    if (errorReminder) {
      output += '\n' + errorReminder + '\n';
    }

    if (workflowReminder) {
      output += '\n' + workflowReminder + '\n';
    }

    if (budgetAlert) {
      output += '\n' + budgetAlert + '\n';
    }

    if (output) {
      process.stdout.write(output);
    }

    // Clear the edit log for next session
    clearEditLog(editLogPath);

    clearTimeout(timeoutId);
    process.exit(0);
  } catch (error) {
    console.error('[stop-event] Error:', error);
    clearTimeout(timeoutId);
    process.exit(0); // Don't fail the hook
  }
}

/**
 * Validate pattern outputs for compliance with pattern specifications
 */
function validatePatternOutputs(
  editedFiles: string[],
  projectRoot: string
): ErrorIssue[] {
  const issues: ErrorIssue[] = [];

  // Load pattern index
  const patternIndex = loadPatternIndex(projectRoot);
  if (!patternIndex) {
    return issues;
  }

  for (const filePath of editedFiles) {
    // Read file content
    if (!fs.existsSync(filePath)) {
      continue;
    }

    let fileContent: string;
    try {
      fileContent = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      continue; // Skip files that can't be read
    }

    // Check if file was created using a pattern
    if (!isPatternOutput(filePath, fileContent)) {
      continue;
    }

    // Extract pattern name
    const patternName = getPatternNameFromFile(fileContent);
    if (!patternName) {
      continue;
    }

    // Get pattern category
    const category = getPatternCategory(patternName, patternIndex);
    if (!category) {
      continue;
    }

    // Load pattern content
    const patternContent = loadPatternContent(patternName, category, projectRoot);
    if (!patternContent) {
      continue;
    }

    // Validate OUTPUT format
    const outputValid = validateOutputFormat(fileContent, patternContent);
    if (!outputValid) {
      issues.push({
        file: filePath,
        message: `OUTPUT format doesn't match ${patternName} pattern specification`,
        severity: 'warning'
      });
    }

    // Check if QUALITY CHECKS section is referenced
    const qualityChecksPresent = checkQualityChecks(fileContent, patternContent);
    if (!qualityChecksPresent) {
      issues.push({
        file: filePath,
        message: `Consider running QUALITY CHECKS from ${patternName} pattern`,
        severity: 'info'
      });
    }
  }

  return issues;
}

/**
 * Validate if file output matches pattern OUTPUT specification
 */
function validateOutputFormat(fileContent: string, patternContent: string): boolean {
  // Extract OUTPUT section from pattern
  const outputMatch = patternContent.match(/## OUTPUT\n([\s\S]*?)(?=\n##|$)/);
  if (!outputMatch) {
    return true; // No OUTPUT section to validate against
  }

  const outputSpec = outputMatch[1];

  // Check for key OUTPUT requirements (basic validation)
  // This is a simple heuristic - patterns should define clear OUTPUT formats
  const requiredElements = [
    'markdown',
    'section',
    'heading',
    'format',
    'structure'
  ];

  // If pattern specifies any of these, do basic structural checks
  for (const element of requiredElements) {
    if (outputSpec.toLowerCase().includes(element)) {
      // Pattern has structure requirements - do basic validation
      // For now, just check if file has some markdown structure
      if (!fileContent.includes('#') && !fileContent.includes('**')) {
        return false;
      }
      break;
    }
  }

  return true;
}

/**
 * Check if quality checks were performed or referenced
 */
function checkQualityChecks(fileContent: string, patternContent: string): boolean {
  // Extract QUALITY CHECKS section from pattern
  const qualityMatch = patternContent.match(/## QUALITY CHECKS\n([\s\S]*?)(?=\n##|$)/);
  if (!qualityMatch) {
    return true; // No quality checks section
  }

  // Check if file content references quality checks or has quality markers
  const qualityMarkers = [
    'quality check',
    'quality checks',
    'validation',
    'reviewed',
    'verified',
    'checklist'
  ];

  return qualityMarkers.some(marker =>
    fileContent.toLowerCase().includes(marker.toLowerCase())
  );
}

/**
 * Clear edit log
 */
function clearEditLog(logPath: string) {
  try {
    if (fs.existsSync(logPath)) {
      fs.unlinkSync(logPath);
    }
  } catch (error) {
    console.error('[stop-event] Error clearing edit log:', error);
  }
}

// Run the hook
main();
