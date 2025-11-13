#!/usr/bin/env ts-node
/**
 * Component Health Checker Utility
 *
 * Performs system-wide validation and health checks:
 * - Validates all registry JSON files (syntax, structure, completeness)
 * - Checks for broken @-references across all markdown files
 * - Verifies emoji compliance (agents, commands, resources)
 * - Finds orphaned files (not referenced anywhere)
 * - Generates comprehensive health report with scores
 *
 * Usage:
 *   ts-node component-health-checker.ts
 *   ts-node component-health-checker.ts --verbose
 *   ts-node component-health-checker.ts --json
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// INTERFACES
// ============================================================================

export interface RegistryValidation {
  file: string;
  valid: boolean;
  exists: boolean;
  syntaxValid: boolean;
  structureValid: boolean;
  issues: string[];
}

export interface BrokenReference {
  sourceFile: string;
  line: number;
  reference: string;
  targetPath: string;
  reason: string;
}

export interface EmojiCompliance {
  componentType: 'agent' | 'command' | 'resource';
  file: string;
  hasEmoji: boolean;
  correctFormat: boolean;
  expectedEmoji?: string;
  actualEmoji?: string;
  issue?: string;
}

export interface OrphanedFile {
  path: string;
  type: string;
  size: number;
  lastModified: string;
  reason: string;
}

export interface HealthScore {
  overall: number;
  registries: number;
  references: number;
  emojis: number;
  orphans: number;
}

export interface HealthReport {
  timestamp: string;
  score: HealthScore;
  registries: RegistryValidation[];
  brokenReferences: BrokenReference[];
  emojiCompliance: EmojiCompliance[];
  orphanedFiles: OrphanedFile[];
  summary: {
    totalIssues: number;
    criticalIssues: number;
    warnings: number;
    recommendations: string[];
  };
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const BASE_DIR = '/home/cere/Work/marketing-agent/.claude';

const REGISTRY_FILES = [
  'skill-rules.json',
  'patterns/pattern-index.json',
  'emoji-standards.json',
  'docs/docs-index.json',
  'settings.json'
];

const REQUIRED_REGISTRY_FIELDS: Record<string, string[]> = {
  'skill-rules.json': ['skills', 'triggers', 'version'],
  'patterns/pattern-index.json': ['patterns', 'categories', 'complexityDefinitions'],
  'emoji-standards.json': ['agents', 'commands', 'skillResources', 'version'],
  'docs/docs-index.json': ['docs', 'triggers', 'priorities'],
  'settings.json': ['hooks']
};

// ============================================================================
// REGISTRY VALIDATION
// ============================================================================

/**
 * Validate all registry JSON files
 */
export function validateRegistryFiles(): RegistryValidation[] {
  const results: RegistryValidation[] = [];

  for (const file of REGISTRY_FILES) {
    const filePath = path.join(BASE_DIR, file);
    const result: RegistryValidation = {
      file,
      valid: true,
      exists: false,
      syntaxValid: false,
      structureValid: false,
      issues: []
    };

    // Check file exists
    if (!fs.existsSync(filePath)) {
      result.valid = false;
      result.issues.push('File does not exist');
      results.push(result);
      continue;
    }
    result.exists = true;

    // Check JSON syntax
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      result.syntaxValid = true;

      // Check required fields
      const requiredFields = REQUIRED_REGISTRY_FIELDS[file] || [];
      for (const field of requiredFields) {
        if (!(field in data)) {
          result.structureValid = false;
          result.issues.push(`Missing required field: ${field}`);
          result.valid = false;
        }
      }

      if (result.issues.length === 0) {
        result.structureValid = true;
      }

    } catch (error) {
      result.syntaxValid = false;
      result.valid = false;
      if (error instanceof Error) {
        result.issues.push(`JSON syntax error: ${error.message}`);
      }
    }

    results.push(result);
  }

  return results;
}

// ============================================================================
// REFERENCE CHECKING
// ============================================================================

/**
 * Find all @-references in markdown files
 */
function findReferences(filePath: string): Array<{ line: number; reference: string }> {
  const references: Array<{ line: number; reference: string }> = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Match @.claude/... or @lesson-modules/... patterns
      const matches = line.matchAll(/@([.\w/-]+(?:\.md|\.json|\.ts)?)/g);

      for (const match of matches) {
        references.push({
          line: i + 1,
          reference: match[1]
        });
      }
    }
  } catch (error) {
    // Skip files that can't be read
  }

  return references;
}

/**
 * Resolve reference path to absolute path
 */
function resolveReference(reference: string, sourceDir: string): string {
  // Handle different reference formats
  if (reference.startsWith('.claude/')) {
    return path.join(BASE_DIR, reference.substring('.claude/'.length));
  } else if (reference.startsWith('lesson-modules/')) {
    return path.join(path.dirname(BASE_DIR), reference);
  } else {
    // Try relative to source file
    return path.join(sourceDir, reference);
  }
}

/**
 * Check all @-references across the system
 */
export function checkBrokenReferences(): BrokenReference[] {
  const brokenRefs: BrokenReference[] = [];

  // Get all markdown files
  const markdownFiles = findAllFiles(BASE_DIR, '.md');

  for (const file of markdownFiles) {
    const references = findReferences(file);
    const sourceDir = path.dirname(file);

    for (const ref of references) {
      const targetPath = resolveReference(ref.reference, sourceDir);

      if (!fs.existsSync(targetPath)) {
        brokenRefs.push({
          sourceFile: file.replace(BASE_DIR + '/', ''),
          line: ref.line,
          reference: ref.reference,
          targetPath,
          reason: 'Target file does not exist'
        });
      }
    }
  }

  return brokenRefs;
}

// ============================================================================
// EMOJI COMPLIANCE
// ============================================================================

/**
 * Load emoji standards
 */
function loadEmojiStandards(): any {
  const emojiPath = path.join(BASE_DIR, 'emoji-standards.json');

  if (!fs.existsSync(emojiPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(emojiPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

/**
 * Check if agent has correct emoji in YAML description
 */
function checkAgentEmoji(filePath: string, standards: any): EmojiCompliance {
  const fileName = path.basename(filePath, '.md');
  const expectedEmoji = standards?.agents?.[fileName];

  const result: EmojiCompliance = {
    componentType: 'agent',
    file: filePath.replace(BASE_DIR + '/', ''),
    hasEmoji: false,
    correctFormat: false,
    expectedEmoji
  };

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Find description line in YAML frontmatter
    let inFrontmatter = false;
    for (const line of lines) {
      if (line.trim() === '---') {
        inFrontmatter = !inFrontmatter;
        continue;
      }

      if (inFrontmatter && line.startsWith('description:')) {
        const description = line.substring('description:'.length).trim();

        // Check if has any emoji (simple check for emoji characters)
        const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(description);
        result.hasEmoji = hasEmoji;

        if (hasEmoji && expectedEmoji) {
          // Check if it's the correct emoji
          const startsWithExpected = description.startsWith(expectedEmoji);
          result.correctFormat = startsWithExpected;
          result.actualEmoji = description.charAt(0);

          if (!startsWithExpected) {
            result.issue = `Expected emoji ${expectedEmoji}, found ${description.charAt(0)}`;
          }
        } else if (!hasEmoji && expectedEmoji) {
          result.issue = `Missing emoji ${expectedEmoji}`;
        }

        break;
      }
    }
  } catch (error) {
    result.issue = 'Could not read file';
  }

  return result;
}

/**
 * Check if command has correct emoji
 */
function checkCommandEmoji(filePath: string, standards: any): EmojiCompliance {
  const fileName = path.basename(filePath, '.md');
  const categoryEmoji = standards?.commands?.individual?.[fileName] ||
                        standards?.commands?.categories?.production; // default

  const result: EmojiCompliance = {
    componentType: 'command',
    file: filePath.replace(BASE_DIR + '/', ''),
    hasEmoji: false,
    correctFormat: false,
    expectedEmoji: categoryEmoji
  };

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').slice(0, 10); // Check first 10 lines

    // Check for emoji in first few lines
    const hasEmoji = lines.some(line => /[\u{1F300}-\u{1F9FF}]/u.test(line));
    result.hasEmoji = hasEmoji;

    if (!hasEmoji && categoryEmoji) {
      result.issue = `Missing category emoji ${categoryEmoji}`;
    }

  } catch (error) {
    result.issue = 'Could not read file';
  }

  return result;
}

/**
 * Check if resource has correct emoji
 */
function checkResourceEmoji(filePath: string, standards: any): EmojiCompliance {
  const fileName = path.basename(filePath, '.md');
  const expectedEmoji = standards?.skillResources?.[fileName];

  const result: EmojiCompliance = {
    componentType: 'resource',
    file: filePath.replace(BASE_DIR + '/', ''),
    hasEmoji: false,
    correctFormat: false,
    expectedEmoji
  };

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Check first heading
    const firstHeading = lines.find(line => line.startsWith('#'));
    if (firstHeading) {
      const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(firstHeading);
      result.hasEmoji = hasEmoji;

      if (hasEmoji && expectedEmoji) {
        const correctEmoji = firstHeading.includes(expectedEmoji);
        result.correctFormat = correctEmoji;

        if (!correctEmoji) {
          result.issue = `Expected emoji ${expectedEmoji} in heading`;
        }
      } else if (!hasEmoji && expectedEmoji) {
        result.issue = `Missing emoji ${expectedEmoji} in heading`;
      }
    }
  } catch (error) {
    result.issue = 'Could not read file';
  }

  return result;
}

/**
 * Verify emoji compliance across all components
 */
export function verifyEmojiCompliance(): EmojiCompliance[] {
  const results: EmojiCompliance[] = [];
  const standards = loadEmojiStandards();

  if (!standards) {
    return results;
  }

  // Check agents
  const agentFiles = findAllFiles(path.join(BASE_DIR, 'agents'), '.md');
  for (const file of agentFiles) {
    results.push(checkAgentEmoji(file, standards));
  }

  // Check commands
  const commandFiles = findAllFiles(path.join(BASE_DIR, 'commands'), '.md');
  for (const file of commandFiles) {
    results.push(checkCommandEmoji(file, standards));
  }

  // Check resources
  const resourceFiles = findAllFiles(path.join(BASE_DIR, 'skills/resources'), '.md');
  for (const file of resourceFiles) {
    results.push(checkResourceEmoji(file, standards));
  }

  return results;
}

// ============================================================================
// ORPHANED FILES
// ============================================================================

/**
 * Build reference map (which files reference which)
 */
function buildReferenceMap(): Map<string, string[]> {
  const refMap = new Map<string, string[]>();
  const allFiles = findAllFiles(BASE_DIR, '');

  for (const file of allFiles) {
    if (!file.endsWith('.md') && !file.endsWith('.json') && !file.endsWith('.ts')) {
      continue;
    }

    const references = findReferences(file);
    for (const ref of references) {
      const targetPath = resolveReference(ref.reference, path.dirname(file));

      if (!refMap.has(targetPath)) {
        refMap.set(targetPath, []);
      }
      refMap.get(targetPath)!.push(file);
    }
  }

  return refMap;
}

/**
 * Find orphaned files (not referenced anywhere)
 */
export function findOrphanedFiles(): OrphanedFile[] {
  const orphans: OrphanedFile[] = [];
  const refMap = buildReferenceMap();

  // Get all component files
  const componentDirs = [
    'agents',
    'patterns',
    'skills',
    'commands',
    'hooks',
    'hooks/utils',
    'docs'
  ];

  for (const dir of componentDirs) {
    const dirPath = path.join(BASE_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (!stats.isFile()) continue;

      // Skip certain files that don't need references
      if (file === 'README.md' || file === '.gitkeep') continue;

      // Check if file is referenced
      const isReferenced = refMap.has(filePath);

      // Also check if it's in a registry
      const isInRegistry = isFileInRegistry(filePath);

      if (!isReferenced && !isInRegistry) {
        orphans.push({
          path: filePath.replace(BASE_DIR + '/', ''),
          type: path.extname(file),
          size: stats.size,
          lastModified: stats.mtime.toISOString(),
          reason: 'Not referenced in any file or registry'
        });
      }
    }
  }

  return orphans;
}

/**
 * Check if file is registered in any registry
 */
function isFileInRegistry(filePath: string): boolean {
  const fileName = path.basename(filePath, path.extname(filePath));

  // Check skill-rules.json
  try {
    const skillRules = JSON.parse(
      fs.readFileSync(path.join(BASE_DIR, 'skill-rules.json'), 'utf-8')
    );
    if (fileName in skillRules.skills) return true;
  } catch (error) {
    // Ignore
  }

  // Check pattern-index.json
  try {
    const patternIndex = JSON.parse(
      fs.readFileSync(path.join(BASE_DIR, 'patterns/pattern-index.json'), 'utf-8')
    );
    if (fileName in patternIndex.patterns) return true;
  } catch (error) {
    // Ignore
  }

  // Check emoji-standards.json
  try {
    const emojiStandards = JSON.parse(
      fs.readFileSync(path.join(BASE_DIR, 'emoji-standards.json'), 'utf-8')
    );
    if (emojiStandards.agents?.[fileName]) return true;
    if (emojiStandards.commands?.individual?.[fileName]) return true;
    if (emojiStandards.skillResources?.[fileName]) return true;
  } catch (error) {
    // Ignore
  }

  // Check docs-index.json
  try {
    const docsIndex = JSON.parse(
      fs.readFileSync(path.join(BASE_DIR, 'docs/docs-index.json'), 'utf-8')
    );
    if (fileName in docsIndex.docs) return true;
  } catch (error) {
    // Ignore
  }

  return false;
}

// ============================================================================
// HEALTH SCORING
// ============================================================================

/**
 * Calculate health scores
 */
export function calculateHealthScore(
  registries: RegistryValidation[],
  references: BrokenReference[],
  emojis: EmojiCompliance[],
  orphans: OrphanedFile[]
): HealthScore {
  // Registry score (25%)
  const validRegistries = registries.filter(r => r.valid).length;
  const registryScore = (validRegistries / registries.length) * 100;

  // Reference score (35%)
  const totalFiles = findAllFiles(BASE_DIR, '.md').length;
  const brokenRatio = references.length / Math.max(totalFiles, 1);
  const referenceScore = Math.max(0, (1 - brokenRatio) * 100);

  // Emoji score (25%)
  const compliantEmojis = emojis.filter(e => e.hasEmoji && e.correctFormat).length;
  const emojiScore = emojis.length > 0 ? (compliantEmojis / emojis.length) * 100 : 100;

  // Orphan score (15%)
  const orphanRatio = orphans.length / Math.max(totalFiles, 1);
  const orphanScore = Math.max(0, (1 - orphanRatio * 2) * 100);

  // Overall weighted score
  const overall = Math.round(
    registryScore * 0.25 +
    referenceScore * 0.35 +
    emojiScore * 0.25 +
    orphanScore * 0.15
  );

  return {
    overall,
    registries: Math.round(registryScore),
    references: Math.round(referenceScore),
    emojis: Math.round(emojiScore),
    orphans: Math.round(orphanScore)
  };
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

/**
 * Generate comprehensive health report
 */
export function generateHealthReport(): HealthReport {
  console.log('🏥 Running system health check...\n');

  console.log('📋 Validating registry files...');
  const registries = validateRegistryFiles();

  console.log('🔗 Checking references...');
  const brokenReferences = checkBrokenReferences();

  console.log('😊 Verifying emoji compliance...');
  const emojiCompliance = verifyEmojiCompliance();

  console.log('🔍 Finding orphaned files...');
  const orphanedFiles = findOrphanedFiles();

  console.log('📊 Calculating health scores...\n');
  const score = calculateHealthScore(
    registries,
    brokenReferences,
    emojiCompliance,
    orphanedFiles
  );

  // Generate recommendations
  const recommendations: string[] = [];

  if (score.registries < 100) {
    recommendations.push('Fix registry JSON files (check syntax and required fields)');
  }

  if (brokenReferences.length > 0) {
    recommendations.push(`Fix ${brokenReferences.length} broken reference(s)`);
  }

  const emojiIssues = emojiCompliance.filter(e => !e.hasEmoji || !e.correctFormat).length;
  if (emojiIssues > 0) {
    recommendations.push(`Add or correct ${emojiIssues} emoji(s)`);
  }

  if (orphanedFiles.length > 0) {
    recommendations.push(`Review ${orphanedFiles.length} orphaned file(s) for cleanup`);
  }

  const criticalIssues = registries.filter(r => !r.valid).length +
                        brokenReferences.length;

  return {
    timestamp: new Date().toISOString(),
    score,
    registries,
    brokenReferences,
    emojiCompliance,
    orphanedFiles,
    summary: {
      totalIssues: criticalIssues + emojiIssues + orphanedFiles.length,
      criticalIssues,
      warnings: emojiIssues + orphanedFiles.length,
      recommendations
    }
  };
}

/**
 * Format health report for display
 */
export function formatHealthReport(report: HealthReport, verbose: boolean = false): string {
  let output = '';

  // Header
  output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  output += '🏥 SYSTEM HEALTH REPORT\n';
  output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

  // Overall score
  const scoreEmoji = report.score.overall >= 90 ? '✅' :
                     report.score.overall >= 70 ? '⚠️' : '❌';
  output += `${scoreEmoji} Overall Health: ${report.score.overall}%\n\n`;

  // Component scores
  output += '📊 Component Scores:\n';
  output += `   📋 Registries: ${report.score.registries}%\n`;
  output += `   🔗 References: ${report.score.references}%\n`;
  output += `   😊 Emojis: ${report.score.emojis}%\n`;
  output += `   🔍 Orphans: ${report.score.orphans}%\n\n`;

  // Summary
  output += `📈 Summary:\n`;
  output += `   Total Issues: ${report.summary.totalIssues}\n`;
  output += `   Critical: ${report.summary.criticalIssues}\n`;
  output += `   Warnings: ${report.summary.warnings}\n\n`;

  // Issues (if any)
  if (report.summary.totalIssues > 0) {
    // Registry issues
    const invalidRegistries = report.registries.filter(r => !r.valid);
    if (invalidRegistries.length > 0) {
      output += '🚨 Registry Issues:\n';
      for (const reg of invalidRegistries) {
        output += `   ❌ ${reg.file}\n`;
        for (const issue of reg.issues) {
          output += `      - ${issue}\n`;
        }
      }
      output += '\n';
    }

    // Broken references
    if (report.brokenReferences.length > 0) {
      output += `🔗 Broken References: ${report.brokenReferences.length}\n`;
      if (verbose) {
        for (const ref of report.brokenReferences.slice(0, 10)) {
          output += `   ❌ ${ref.sourceFile}:${ref.line}\n`;
          output += `      Reference: @${ref.reference}\n`;
          output += `      Reason: ${ref.reason}\n`;
        }
        if (report.brokenReferences.length > 10) {
          output += `   ... and ${report.brokenReferences.length - 10} more\n`;
        }
      } else {
        output += `   Use --verbose to see details\n`;
      }
      output += '\n';
    }

    // Emoji issues
    const emojiIssues = report.emojiCompliance.filter(e => e.issue);
    if (emojiIssues.length > 0) {
      output += `😊 Emoji Issues: ${emojiIssues.length}\n`;
      if (verbose) {
        for (const emoji of emojiIssues.slice(0, 10)) {
          output += `   ⚠️  ${emoji.file}\n`;
          output += `      ${emoji.issue}\n`;
        }
        if (emojiIssues.length > 10) {
          output += `   ... and ${emojiIssues.length - 10} more\n`;
        }
      } else {
        output += `   Use --verbose to see details\n`;
      }
      output += '\n';
    }

    // Orphaned files
    if (report.orphanedFiles.length > 0) {
      output += `🔍 Orphaned Files: ${report.orphanedFiles.length}\n`;
      if (verbose) {
        for (const orphan of report.orphanedFiles.slice(0, 10)) {
          output += `   📄 ${orphan.path}\n`;
          output += `      ${orphan.reason}\n`;
        }
        if (report.orphanedFiles.length > 10) {
          output += `   ... and ${report.orphanedFiles.length - 10} more\n`;
        }
      } else {
        output += `   Use --verbose to see details\n`;
      }
      output += '\n';
    }
  }

  // Recommendations
  if (report.summary.recommendations.length > 0) {
    output += '💡 Recommendations:\n';
    for (const rec of report.summary.recommendations) {
      output += `   - ${rec}\n`;
    }
    output += '\n';
  }

  output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  output += `Generated: ${new Date(report.timestamp).toLocaleString()}\n`;

  return output;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Recursively find all files with given extension
 */
function findAllFiles(dir: string, ext: string): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and hidden directories
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
        continue;
      }
      files.push(...findAllFiles(fullPath, ext));
    } else if (entry.isFile()) {
      if (ext === '' || entry.name.endsWith(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

if (require.main === module) {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose');
  const json = args.includes('--json');

  const report = generateHealthReport();

  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatHealthReport(report, verbose));
  }

  // Exit with error code if health is poor
  process.exit(report.score.overall >= 70 ? 0 : 1);
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  validateRegistryFiles,
  checkBrokenReferences,
  verifyEmojiCompliance,
  findOrphanedFiles,
  calculateHealthScore,
  generateHealthReport,
  formatHealthReport
};
