
/**
 * PostToolUse Hook (Edit)
 *
 * Runs AFTER each Edit/Write/MultiEdit tool use.
 *
 * Functions:
 * 1. Tracks edited files for Stop hook analysis
 * 2. Invalidates context cache for edited resources
 * 3. Reminds developers to update documentation (Layer 2: Detection)
 *
 * Documentation Reminder System (v1.0):
 * - Matches edited files against doc-dependencies.json patterns
 * - Displays specific, actionable documentation suggestions
 * - Non-blocking - provides helpful reminders without preventing work
 * - Part of 5-layer doc enforcement strategy (this is Layer 2)
 *
 * Configuration:
 * - CC_DISABLE_DOC_REMINDERS=1 to disable doc reminders
 * - CC_DOC_REMINDERS_DEBUG=1 for debug output
 */

import * as fs from 'fs';
import * as path from 'path';
import { invalidateResource } from './utils/context-cache';

// ============================================================================
// Types for Documentation Reminder System
// ============================================================================

interface DocSuggestion {
  file: string;
  section: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
}

interface PatternMapping {
  pattern: string;
  exclude?: string[];
  docs: DocSuggestion[];
}

interface DocDependencies {
  patterns: PatternMapping[];
}

// ============================================================================
// Documentation Reminder Configuration
// ============================================================================

const DOC_REMINDER_CONFIG = {
  enabled: process.env.CC_DISABLE_DOC_REMINDERS !== '1',
  debug: process.env.CC_DOC_REMINDERS_DEBUG === '1',
  mappingFile: 'core/infrastructure/hooks/utils/doc-dependencies.json',
};

// ============================================================================
// Documentation Reminder Functions
// ============================================================================

/**
 * Convert glob pattern to RegExp
 */
function globToRegex(pattern: string): RegExp {
  let regexPattern = pattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '{{DOUBLE_STAR}}')
    .replace(/\*/g, '[^/]*')
    .replace(/\{\{DOUBLE_STAR\}\}/g, '.*');
  return new RegExp(`^${regexPattern}$`);
}

/**
 * Check if file path matches pattern and not excluded
 */
function matchesPattern(filePath: string, mapping: PatternMapping): boolean {
  const normalized = filePath.replace(/^\.\//, '').replace(/\\/g, '/');

  // Check exclude patterns
  if (mapping.exclude) {
    for (const excludePattern of mapping.exclude) {
      const excludeRegex = globToRegex(excludePattern);
      if (excludeRegex.test(normalized)) {
        return false;
      }
    }
  }

  // Check main pattern
  const patternRegex = globToRegex(mapping.pattern);
  return patternRegex.test(normalized);
}

/**
 * Find doc suggestions for file path
 */
function findDocSuggestions(
  filePath: string,
  dependencies: DocDependencies
): DocSuggestion[] {
  for (const mapping of dependencies.patterns) {
    if (matchesPattern(filePath, mapping)) {
      return mapping.docs;
    }
  }
  return [];
}

/**
 * Format priority with emoji
 */
function formatPriority(priority: string): string {
  const icons = { high: '🔴', medium: '🟡', low: '🟢' };
  return icons[priority as keyof typeof icons] || '⚪';
}

/**
 * Display documentation suggestions
 */
function displaySuggestions(filePath: string, suggestions: DocSuggestion[]): void {
  if (suggestions.length === 0) {
    return;
  }

  console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('📚 DOCUMENTATION UPDATE REMINDER');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.error(`File modified: ${filePath}\n`);
  console.error('Suggested documentation updates:\n');

  suggestions.forEach((suggestion, index) => {
    const priorityIcon = formatPriority(suggestion.priority);
    console.error(`${index + 1}. ${priorityIcon} ${suggestion.file}`);
    console.error(`   Section: ${suggestion.section}`);
    console.error(`   Why: ${suggestion.reason}`);
    if (index < suggestions.length - 1) {
      console.error('');
    }
  });

  console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('💡 See CONTRIBUTING.md > Documentation Standards');
  console.error('   for detailed checklist and guidance');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

/**
 * Load doc dependencies and check for updates
 */
function checkDocumentationReminders(editedFile: string): void {
  if (!DOC_REMINDER_CONFIG.enabled) {
    return;
  }

  try {
    const workingDir = process.cwd();
    const mappingPath = path.join(workingDir, DOC_REMINDER_CONFIG.mappingFile);

    if (!fs.existsSync(mappingPath)) {
      if (DOC_REMINDER_CONFIG.debug) {
        console.error(`[DEBUG] Doc mapping not found: ${mappingPath}`);
      }
      return;
    }

    const content = fs.readFileSync(mappingPath, 'utf-8');
    const dependencies = JSON.parse(content) as DocDependencies;

    const suggestions = findDocSuggestions(editedFile, dependencies);

    if (DOC_REMINDER_CONFIG.debug) {
      console.error(`[DEBUG] Found ${suggestions.length} suggestions for ${editedFile}`);
    }

    if (suggestions.length > 0) {
      displaySuggestions(editedFile, suggestions);
    }
  } catch (error) {
    if (DOC_REMINDER_CONFIG.debug) {
      console.error(`[DEBUG] Doc reminder error: ${error}`);
    }
    // Fail silently - don't break workflow
  }
}

// ============================================================================
// Main Hook Function
// ============================================================================

/**
 * Main hook function
 */
async function main() {
  try {
    // Get edited file path from command line argument
    const editedFile = process.argv[2];

    if (!editedFile) {
      // No file path provided
      process.exit(0);
    }

    // Path to edit log
    const editLogPath = '/tmp/claude-edit-log.json';

    // Load existing log or create new
    let log: { files: string[]; timestamp: string };

    if (fs.existsSync(editLogPath)) {
      try {
        const logContent = fs.readFileSync(editLogPath, 'utf-8');
        log = JSON.parse(logContent);
      } catch {
        log = { files: [], timestamp: new Date().toISOString() };
      }
    } else {
      log = { files: [], timestamp: new Date().toISOString() };
    }

    // Add file to log (deduplicate)
    if (!log.files.includes(editedFile)) {
      log.files.push(editedFile);
    }

    // Write updated log
    fs.writeFileSync(editLogPath, JSON.stringify(log, null, 2), 'utf-8');

    // Invalidate context cache for relevant resources
    // (skills, patterns, personas, docs in .claude/ directory)
    if (editedFile.includes('.claude/')) {
      invalidateResource(editedFile);
    }

    // Check for documentation update reminders (Layer 2: Detection)
    checkDocumentationReminders(editedFile);

    process.exit(0);
  } catch (error) {
    console.error('[post-tool-use-edit] Error:', error);
    process.exit(0); // Don't fail the hook
  }
}

// Run the hook
main();
