/**
 * Utility functions for validating component consistency
 *
 * v5.2: Refactored to read validation rules from pattern files instead of hardcoded logic.
 * Rules are now defined in .claude/patterns/meta/component_*.md files.
 *
 * Ensures new components follow existing patterns:
 * - Naming conventions (kebab-case for agents/skills, snake_case for patterns)
 * - Required structure (YAML frontmatter, sections, quality checks)
 * - Integration points (valid cross-references)
 * - Emoji standards (consistent usage across component types)
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  initializePatternCache,
  getComponentPattern,
  validateComponentName as patternValidateName,
  getEmojiForComponent,
  getAllEmojiMappings,
  getSimilarityThresholds,
  getRequiredStructure,
  ComponentType as PatternComponentType
} from './pattern-parser';

// ============================================================================
// INTERFACES
// ============================================================================

export interface ComponentType {
  type: 'agent' | 'pattern' | 'skill' | 'command' | 'hook' | 'utility';
  category?: string; // For patterns: content/strategy/analysis/optimization
  path: string;
}

export interface NamingValidation {
  valid: boolean;
  expectedFormat: string;
  actualFormat: string;
  suggestion?: string;
  issues: string[];
}

export interface StructureValidation {
  valid: boolean;
  missingRequired: string[];
  missingRecommended: string[];
  hasRequiredSections: boolean;
}

export interface SimilarComponent {
  name: string;
  path: string;
  type: string;
  similarity: number;
  reason: string;
}

export interface IntegrationCheck {
  valid: boolean;
  brokenReferences: Array<{
    reference: string;
    line: number;
    type: 'skill' | 'pattern' | 'knowledge' | 'agent';
  }>;
  suggestedIntegrations: Array<{
    component: string;
    reason: string;
  }>;
}

export interface EmojiValidation {
  valid: boolean;
  hasEmoji: boolean;
  suggestedEmoji?: string;
  emojiStandard?: string;
  issues: string[];
}

export interface ValidationReport {
  componentName: string;
  componentType: ComponentType;
  naming: NamingValidation;
  structure: StructureValidation;
  integration: IntegrationCheck;
  emoji: EmojiValidation;
  similarComponents: SimilarComponent[];
  overallValid: boolean;
  criticalIssues: string[];
  warnings: string[];
  recommendations: string[];
}

// ============================================================================
// NAMING VALIDATION
// ============================================================================

/**
 * Validate component name follows naming conventions
 * v5.2: Now reads rules from pattern files
 */
export function validateNaming(
  componentName: string,
  componentType: ComponentType
): NamingValidation {
  const issues: string[] = [];
  let suggestion: string | undefined;

  // Map legacy type to pattern type
  const patternType = componentType.type as PatternComponentType;

  // Use pattern-parser to validate name
  const patternValidation = patternValidateName(patternType, componentName);

  let expectedFormat = patternValidation.expectedFormat;
  let actualFormat = patternValidation.actualFormat;

  // Add pattern-based issues
  issues.push(...patternValidation.issues);

  // Check if format matches expected
  const valid = patternValidation.valid;

  if (!valid && !suggestion) {
    // Generate suggestion based on detected format
    if (expectedFormat === 'kebab-case' && actualFormat === 'snake_case') {
      suggestion = componentName.replace(/_/g, '-');
    } else if (expectedFormat === 'snake_case' && actualFormat === 'kebab-case') {
      suggestion = componentName.replace(/-/g, '_');
    } else if (actualFormat.includes('PascalCase') || actualFormat.includes('camelCase')) {
      // Convert PascalCase/camelCase to appropriate format
      const lowercase = componentName.replace(/([A-Z])/g, '-$1').toLowerCase();
      suggestion = expectedFormat === 'snake_case'
        ? lowercase.replace(/-/g, '_')
        : lowercase;
      suggestion = suggestion.replace(/^[-_]/, ''); // Remove leading separator
    }
  }

  // Check for common anti-patterns
  if (componentName.length < 3) {
    issues.push('Name too short (minimum 3 characters)');
  }
  if (componentName.length > 50) {
    issues.push('Name too long (maximum 50 characters)');
  }
  if (componentName.match(/[^a-z0-9-_]/)) {
    issues.push('Name contains invalid characters (use only a-z, 0-9, -, _)');
  }
  if (componentName.startsWith('-') || componentName.startsWith('_')) {
    issues.push('Name should not start with separator');
  }
  if (componentName.endsWith('-') || componentName.endsWith('_')) {
    issues.push('Name should not end with separator');
  }

  return {
    valid: valid && issues.length === 0,
    expectedFormat,
    actualFormat,
    suggestion,
    issues
  };
}

// ============================================================================
// STRUCTURE VALIDATION
// ============================================================================

/**
 * Validate component has required structure
 * v5.2: Now reads required structure from pattern files
 */
export function validateStructure(
  content: string,
  componentType: ComponentType
): StructureValidation {
  // Try pattern-based validation first
  const patternType = componentType.type as PatternComponentType;
  const requiredStructure = getRequiredStructure(patternType);

  if (requiredStructure) {
    return validateStructureFromPattern(content, componentType, requiredStructure);
  }

  // Fallback to hardcoded validation for compatibility
  switch (componentType.type) {
    case 'agent':
      return validateAgentStructure(content);
    case 'pattern':
      return validatePatternStructure(content);
    case 'skill':
      return validateSkillStructure(content);
    case 'command':
      return validateCommandStructure(content);
    case 'hook':
      return validateHookStructure(content);
    default:
      return {
        valid: true,
        missingRequired: [],
        missingRecommended: [],
        hasRequiredSections: true
      };
  }
}

/**
 * Validate structure using pattern-based rules
 */
function validateStructureFromPattern(
  content: string,
  componentType: ComponentType,
  requiredStructure: NonNullable<ReturnType<typeof getRequiredStructure>>
): StructureValidation {
  const missingRequired: string[] = [];
  const missingRecommended: string[] = [];

  // Check YAML frontmatter fields (if required)
  if (requiredStructure.yamlFrontmatter) {
    const yamlMatch = content.match(/^---\n([\s\S]+?)\n---/);
    if (!yamlMatch) {
      missingRequired.push('YAML frontmatter (---)');
    } else {
      const yamlContent = yamlMatch[1];
      for (const field of requiredStructure.yamlFrontmatter) {
        const fieldRegex = new RegExp(`^${field}:`, 'm');
        if (!fieldRegex.test(yamlContent)) {
          missingRequired.push(`YAML field: ${field}`);
        }
      }
    }
  }

  // Check required sections
  for (const section of requiredStructure.sections) {
    const sectionRegex = new RegExp(`^##\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
    if (!sectionRegex.test(content)) {
      missingRequired.push(`## ${section}`);
    }
  }

  // Check optional/recommended sections
  if (requiredStructure.optionalSections) {
    for (const section of requiredStructure.optionalSections) {
      const sectionRegex = new RegExp(`^##\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
      if (!sectionRegex.test(content)) {
        missingRecommended.push(`## ${section}`);
      }
    }
  }

  return {
    valid: missingRequired.length === 0,
    missingRequired,
    missingRecommended,
    hasRequiredSections: missingRequired.length === 0
  };
}

function validateAgentStructure(content: string): StructureValidation {
  const required = [
    '---', // YAML frontmatter
    'name:',
    'description:',
    'tools:',
    'model:',
    '# ', // At least one heading
    '## Core Expertise',
    '## When to Invoke This Agent',
    '## Workflow Protocol',
    '## Quality Gates'
  ];

  const recommended = [
    '## Output Style',
    '## Example Scenarios',
    '## Collaboration with Other Agents',
    '## Success Metrics'
  ];

  const missingRequired = required.filter(section => !content.includes(section));
  const missingRecommended = recommended.filter(section => !content.includes(section));

  return {
    valid: missingRequired.length === 0,
    missingRequired,
    missingRecommended,
    hasRequiredSections: missingRequired.length === 0
  };
}

function validatePatternStructure(content: string): StructureValidation {
  const required = [
    '# Pattern:',
    '**Category**:',
    '**Complexity**:',
    '**Thinking**:',
    '## PURPOSE',
    '## INPUT',
    '## PROCESS',
    '## OUTPUT',
    '## QUALITY CHECKS',
    '## EXAMPLE'
  ];

  const recommended = [
    '## VARIATIONS',
    '## USAGE NOTES',
    '## SUCCESS METRICS',
    '**Pattern Version:**'
  ];

  const missingRequired = required.filter(section => !content.includes(section));
  const missingRecommended = recommended.filter(section => !content.includes(section));

  return {
    valid: missingRequired.length === 0,
    missingRequired,
    missingRecommended,
    hasRequiredSections: missingRequired.length === 0
  };
}

function validateSkillStructure(content: string): StructureValidation {
  const required = [
    '# Skill:',
    '**Type**:',
    '**Priority**:',
    '**Auto-Activates**:',
    '## PURPOSE',
    '## KNOWLEDGE BASE',
    '## WHEN TO USE'
  ];

  const recommended = [
    '## RESOURCE FILES',
    '## INTEGRATION POINTS',
    '## QUALITY STANDARDS',
    '**Skill Version:**'
  ];

  const missingRequired = required.filter(section => !content.includes(section));
  const missingRecommended = recommended.filter(section => !content.includes(section));

  return {
    valid: missingRequired.length === 0,
    missingRequired,
    missingRecommended,
    hasRequiredSections: missingRequired.length === 0
  };
}

function validateCommandStructure(content: string): StructureValidation {
  const required = [
    '# /',
    '## WHEN TO USE',
    '## SYNTAX',
    '## WHAT IT DOES',
    '## EXAMPLES',
    '## OUTPUT'
  ];

  const recommended = [
    '## RELATED COMMANDS',
    '## NOTES'
  ];

  const missingRequired = required.filter(section => !content.includes(section));
  const missingRecommended = recommended.filter(section => !content.includes(section));

  return {
    valid: missingRequired.length === 0,
    missingRequired,
    missingRecommended,
    hasRequiredSections: missingRequired.length === 0
  };
}

function validateHookStructure(content: string): StructureValidation {
  const required = [
    '#!/usr/bin/env ts-node',
    '/**',
    'import',
    'async function main()',
    'try {',
    'catch (error) {',
    'process.exit(0)',
    'main()'
  ];

  const recommended = [
    '[hook-name] Error:', // Standardized error prefix
    'readStdin()',
    'formatOutput('
  ];

  const missingRequired = required.filter(section => !content.includes(section));
  const missingRecommended = recommended.filter(section => !content.includes(section));

  return {
    valid: missingRequired.length === 0,
    missingRequired,
    missingRecommended,
    hasRequiredSections: missingRequired.length === 0
  };
}

// ============================================================================
// SIMILARITY DETECTION
// ============================================================================

/**
 * Find similar components that may duplicate functionality
 */
export function findSimilarComponents(
  componentName: string,
  componentType: ComponentType,
  projectRoot: string,
  threshold?: number
): SimilarComponent[] {
  const similar: SimilarComponent[] = [];

  try {
    // Get similarity thresholds from pattern file
    const patternType = componentType.type as PatternComponentType;
    const thresholds = getSimilarityThresholds(patternType);

    // Use pattern-based warning threshold or provided threshold
    const warningThreshold = threshold !== undefined ? threshold : (thresholds.warning / 100);

    // Get all components of the same type
    const componentsDir = getComponentsDirectory(componentType, projectRoot);
    if (!componentsDir || !fs.existsSync(componentsDir)) {
      return similar;
    }

    const files = getFilesRecursive(componentsDir);

    for (const file of files) {
      const filename = path.basename(file, path.extname(file));

      // Skip if it's the same file
      if (filename === componentName) {
        continue;
      }

      // Calculate similarity
      const similarity = calculateSimilarity(componentName, filename);

      if (similarity >= warningThreshold) {
        similar.push({
          name: filename,
          path: file,
          type: componentType.type,
          similarity,
          reason: getSimilarityReason(componentName, filename, similarity)
        });
      }
    }

    // Sort by similarity (highest first)
    similar.sort((a, b) => b.similarity - a.similarity);

    // Return top 5
    return similar.slice(0, 5);
  } catch (error) {
    console.error('[component-consistency-validator] Error finding similar components:', error);
    return similar;
  }
}

function getComponentsDirectory(componentType: ComponentType, projectRoot: string): string | null {
  switch (componentType.type) {
    case 'agent':
      return path.join(projectRoot, '.claude', 'agents');
    case 'pattern':
      return componentType.category
        ? path.join(projectRoot, '.claude', 'patterns', componentType.category)
        : path.join(projectRoot, '.claude', 'patterns');
    case 'skill':
      return path.join(projectRoot, '.claude', 'skills');
    case 'command':
      return path.join(projectRoot, '.claude', 'commands');
    case 'hook':
      return path.join(projectRoot, '.claude', 'hooks');
    case 'utility':
      return path.join(projectRoot, '.claude', 'hooks', 'utils');
    default:
      return null;
  }
}

function getFilesRecursive(dir: string): string[] {
  const files: string[] = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...getFilesRecursive(fullPath));
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.ts'))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Ignore errors for missing directories
  }

  return files;
}

function calculateSimilarity(str1: string, str2: string): number {
  // Normalize strings
  const s1 = str1.toLowerCase().replace(/[-_]/g, ' ');
  const s2 = str2.toLowerCase().replace(/[-_]/g, ' ');

  // Extract words
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);

  // Count common words
  const common = words1.filter(w => words2.includes(w)).length;
  const total = Math.max(words1.length, words2.length);

  if (total === 0) return 0;

  // Calculate Jaccard similarity
  const wordSimilarity = common / total;

  // Calculate Levenshtein distance for overall string
  const maxLen = Math.max(s1.length, s2.length);
  const distance = levenshteinDistance(s1, s2);
  const stringSimilarity = 1 - (distance / maxLen);

  // Weighted average (60% word similarity, 40% string similarity)
  return wordSimilarity * 0.6 + stringSimilarity * 0.4;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

function getSimilarityReason(name1: string, name2: string, similarity: number): string {
  if (similarity >= 0.9) {
    return 'Nearly identical names - possible duplicate';
  } else if (similarity >= 0.7) {
    return 'Very similar names - check if this is the same concept';
  } else {
    return 'Similar names - review for potential overlap';
  }
}

// ============================================================================
// INTEGRATION VALIDATION
// ============================================================================

/**
 * Check for broken references and suggest integrations
 */
export function checkIntegrations(
  content: string,
  componentType: ComponentType,
  projectRoot: string
): IntegrationCheck {
  const brokenReferences: IntegrationCheck['brokenReferences'] = [];
  const suggestedIntegrations: IntegrationCheck['suggestedIntegrations'] = [];

  // Find all @.claude/... references
  const referencePattern = /@\.claude\/(skills|patterns|knowledge|agents)\/([^)\s]+)/g;
  let match;

  const lines = content.split('\n');
  let lineNumber = 0;

  for (const line of lines) {
    lineNumber++;

    while ((match = referencePattern.exec(line)) !== null) {
      const refType = match[1];
      const refPath = match[2];
      const fullPath = path.join(projectRoot, '.claude', refType, refPath);

      if (!fs.existsSync(fullPath)) {
        brokenReferences.push({
          reference: `@.claude/${refType}/${refPath}`,
          line: lineNumber,
          type: refType.slice(0, -1) as 'skill' | 'pattern' | 'knowledge' | 'agent'
        });
      }
    }
  }

  // Suggest integrations based on component type and content
  if (componentType.type === 'pattern') {
    // Patterns should reference skills for knowledge
    if (!content.includes('**Knowledge Required**:')) {
      suggestedIntegrations.push({
        component: 'Add **Knowledge Required** section',
        reason: 'Patterns should specify which skills/knowledge files they depend on'
      });
    }
  }

  if (componentType.type === 'agent') {
    // Agents should reference skills they load
    if (!content.includes('Load Knowledge')) {
      suggestedIntegrations.push({
        component: 'Add skill references in Workflow Protocol',
        reason: 'Agents should explicitly load required skills for knowledge'
      });
    }
  }

  return {
    valid: brokenReferences.length === 0,
    brokenReferences,
    suggestedIntegrations
  };
}

// ============================================================================
// EMOJI VALIDATION
// ============================================================================

/**
 * Validate emoji usage follows standards
 * v5.2: Now reads emoji mappings from pattern files
 */
export function validateEmoji(
  componentName: string,
  content: string,
  componentType: ComponentType,
  projectRoot: string
): EmojiValidation {
  const issues: string[] = [];

  try {
    // Map legacy type to pattern type
    const patternType = componentType.type as PatternComponentType;

    // Get emoji from pattern file
    const suggestedEmoji = getEmojiForComponent(patternType, componentName) || undefined;
    const emojiStandard = suggestedEmoji;

    let hasEmoji = false;

    // Check based on component type
    switch (componentType.type) {
      case 'agent':
        // Check YAML frontmatter description
        const yamlMatch = content.match(/description:\s*(.+)/);
        if (yamlMatch) {
          const description = yamlMatch[1];
          hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(description);

          if (!hasEmoji && suggestedEmoji) {
            issues.push(`Agent description should start with emoji ${suggestedEmoji}`);
          } else if (!hasEmoji) {
            issues.push('Agent description should start with emoji');
          }
        }
        break;

      case 'command':
        // Check first heading or description line for emoji
        const headingMatch = content.match(/^#\s+(.+)/m);
        const descMatch = content.match(/^[🎯📚📝📊🚀🔍⚙️🤖⏰🔌📦💰🏥🔄]/m);

        if (headingMatch || descMatch) {
          hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(content.substring(0, 200));

          if (!hasEmoji) {
            issues.push('Command should include category emoji in description');
          }
        }
        break;

      case 'skill':
        // Skills should have emoji in reminderMessage (check skill-rules.json)
        const rulesPath = path.join(projectRoot, '.claude', 'skill-rules.json');
        if (fs.existsSync(rulesPath)) {
          const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf-8'));
          if (rules.skills && rules.skills[componentName]) {
            const reminderMessage = rules.skills[componentName].reminderMessage;
            hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(reminderMessage);

            if (!hasEmoji && suggestedEmoji) {
              issues.push(`Skill reminderMessage should start with emoji ${suggestedEmoji}`);
            } else if (!hasEmoji) {
              issues.push('Skill reminderMessage in skill-rules.json should start with emoji');
            }
          }
        }
        break;
    }

    return {
      valid: issues.length === 0,
      hasEmoji,
      suggestedEmoji,
      emojiStandard,
      issues
    };
  } catch (error) {
    console.error('[component-consistency-validator] Error validating emoji:', error);
    return {
      valid: true,
      hasEmoji: false,
      issues: []
    };
  }
}

// ============================================================================
// COMPLETE VALIDATION
// ============================================================================

/**
 * Run complete validation suite for a component
 */
export function validateComponent(
  componentName: string,
  content: string,
  componentType: ComponentType,
  projectRoot: string
): ValidationReport {
  const naming = validateNaming(componentName, componentType);
  const structure = validateStructure(content, componentType);
  const integration = checkIntegrations(content, componentType, projectRoot);
  const emoji = validateEmoji(componentName, content, componentType, projectRoot);
  const similarComponents = findSimilarComponents(componentName, componentType, projectRoot);

  const criticalIssues: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Collect critical issues
  if (!naming.valid) {
    criticalIssues.push(...naming.issues.map(i => `Naming: ${i}`));
  }
  if (!structure.valid) {
    criticalIssues.push(...structure.missingRequired.map(s => `Missing required: ${s}`));
  }
  if (!integration.valid) {
    criticalIssues.push(...integration.brokenReferences.map(
      r => `Broken reference: ${r.reference} (line ${r.line})`
    ));
  }

  // Collect warnings
  if (structure.missingRecommended.length > 0) {
    warnings.push(...structure.missingRecommended.map(s => `Missing recommended: ${s}`));
  }
  if (!emoji.valid) {
    warnings.push(...emoji.issues);
  }
  // ✅ UPGRADED: Similarity detection with tiered severity
  if (similarComponents.length > 0) {
    const topMatch = similarComponents[0];
    const similarityPercent = Math.round(topMatch.similarity * 100);

    if (topMatch.similarity >= 1.0) {
      // Exact match = critical error (blocks creation)
      criticalIssues.push(`DUPLICATE: Component '${topMatch.name}' already exists at ${topMatch.path}`);
    } else if (topMatch.similarity >= 0.9) {
      // Near-duplicate = critical error (likely duplicate with minor differences)
      criticalIssues.push(`Near-duplicate detected: Very similar to '${topMatch.name}' (${similarityPercent}% similar) at ${topMatch.path}`);
    } else if (topMatch.similarity >= 0.8) {
      // High similarity = warning (review for overlap)
      warnings.push(`Very similar component exists: ${topMatch.name} (${similarityPercent}% similar) - Review for potential overlap`);
    } else if (topMatch.similarity >= 0.7) {
      // Moderate similarity = info (possible related functionality)
      warnings.push(`Similar component found: ${topMatch.name} (${similarityPercent}% similar) - Consider consolidation`);
    }
  }

  // Collect recommendations
  if (naming.suggestion) {
    recommendations.push(`Rename to: ${naming.suggestion}`);
  }
  if (emoji.suggestedEmoji) {
    recommendations.push(`Add emoji: ${emoji.suggestedEmoji}`);
  }
  if (integration.suggestedIntegrations.length > 0) {
    recommendations.push(...integration.suggestedIntegrations.map(s => s.component));
  }

  const overallValid = criticalIssues.length === 0;

  return {
    componentName,
    componentType,
    naming,
    structure,
    integration,
    emoji,
    similarComponents,
    overallValid,
    criticalIssues,
    warnings,
    recommendations
  };
}

/**
 * Format validation report for display
 */
export function formatValidationReport(report: ValidationReport): string {
  const lines: string[] = [];

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push(`🔍 COMPONENT VALIDATION: ${report.componentName}`);
  lines.push(`📁 Type: ${report.componentType.type}${report.componentType.category ? ` (${report.componentType.category})` : ''}`);
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  // Overall status
  if (report.overallValid) {
    lines.push('✅ VALIDATION PASSED');
  } else {
    lines.push('❌ VALIDATION FAILED');
  }
  lines.push('');

  // Critical issues
  if (report.criticalIssues.length > 0) {
    lines.push('🚨 CRITICAL ISSUES (must fix):');
    for (const issue of report.criticalIssues) {
      lines.push(`   ❌ ${issue}`);
    }
    lines.push('');
  }

  // Warnings
  if (report.warnings.length > 0) {
    lines.push('⚠️  WARNINGS (should fix):');
    for (const warning of report.warnings) {
      lines.push(`   ⚠️  ${warning}`);
    }
    lines.push('');
  }

  // Recommendations
  if (report.recommendations.length > 0) {
    lines.push('💡 RECOMMENDATIONS:');
    for (const rec of report.recommendations) {
      lines.push(`   💡 ${rec}`);
    }
    lines.push('');
  }

  // Similar components
  if (report.similarComponents.length > 0) {
    lines.push('🔗 SIMILAR COMPONENTS:');
    for (const similar of report.similarComponents) {
      const percent = Math.round(similar.similarity * 100);
      lines.push(`   📄 ${similar.name} (${percent}% similar)`);
      lines.push(`      ${similar.reason}`);
      lines.push(`      Path: ${similar.path}`);
    }
    lines.push('');
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return lines.join('\n');
}

// ============================================================================
// AUTO-CORRECTION
// ============================================================================

/**
 * Auto-correct component issues and return corrected content
 */
export function autoCorrectComponent(
  componentName: string,
  content: string,
  componentType: ComponentType,
  validationResult: ValidationReport,
  projectRoot: string
): { corrected: string; changes: string[] } {
  let correctedContent = content;
  const changes: string[] = [];

  // 1. Fix naming in content (if file name doesn't match convention)
  if (!validationResult.naming.valid && validationResult.naming.suggestion) {
    const oldName = componentName;
    const newName = validationResult.naming.suggestion;
    
    // Replace in content where component name appears
    correctedContent = correctedContent.replace(
      new RegExp(`\\b${oldName}\\b`, 'g'),
      newName
    );
    
    changes.push(`Renamed: ${oldName} → ${newName}`);
  }

  // 2. Add missing emoji
  if (!validationResult.emoji.valid && validationResult.emoji.suggestedEmoji) {
    correctedContent = addEmojiToComponent(
      correctedContent,
      componentType,
      validationResult.emoji.suggestedEmoji
    );
    changes.push(`Added emoji: ${validationResult.emoji.suggestedEmoji}`);
  }

  // 3. Add missing required sections
  if (!validationResult.structure.valid && validationResult.structure.missingRequired.length > 0) {
    correctedContent = addMissingSections(
      correctedContent,
      componentType,
      validationResult.structure.missingRequired
    );
    changes.push(`Added ${validationResult.structure.missingRequired.length} required section(s)`);
  }

  return { corrected: correctedContent, changes };
}

/**
 * Add emoji to component based on type
 */
function addEmojiToComponent(
  content: string,
  componentType: ComponentType,
  emoji: string
): string {
  switch (componentType.type) {
    case 'agent':
      // Add emoji to YAML description
      const yamlMatch = content.match(/^(---[\s\S]*?description:\s*)([^\n]+)/m);
      if (yamlMatch) {
        const beforeDesc = yamlMatch[1];
        const desc = yamlMatch[2];
        
        // Check if emoji already exists
        if (!/^[\u{1F300}-\u{1F9FF}]/u.test(desc.trim())) {
          return content.replace(
            /^(---[\s\S]*?description:\s*)([^\n]+)/m,
            `$1${emoji} $2`
          );
        }
      }
      break;

    case 'command':
      // Add emoji to first line after command name
      const cmdMatch = content.match(/^(#\s+\/[^\n]+\n\n)([^\n]+)/);
      if (cmdMatch) {
        const header = cmdMatch[1];
        const desc = cmdMatch[2];
        
        // Check if emoji already exists
        if (!/^[\u{1F300}-\u{1F9FF}]/u.test(desc.trim())) {
          return content.replace(
            /^(#\s+\/[^\n]+\n\n)([^\n]+)/,
            `$1${emoji} $2`
          );
        }
      }
      break;

    case 'skill':
      // Skills have emojis in skill-rules.json, not in file
      // No change to content needed
      break;

    case 'pattern':
      // Patterns use category emojis in pattern-index.json
      // No change to content needed
      break;

    default:
      // For resources and other types, add to first heading
      const headingMatch = content.match(/^(#\s+)([^\n]+)/m);
      if (headingMatch) {
        const prefix = headingMatch[1];
        const title = headingMatch[2];
        
        if (!/^[\u{1F300}-\u{1F9FF}]/u.test(title.trim())) {
          return content.replace(
            /^(#\s+)([^\n]+)/m,
            `$1${emoji} $2`
          );
        }
      }
      break;
  }

  return content;
}

/**
 * Add missing sections to component
 */
function addMissingSections(
  content: string,
  componentType: ComponentType,
  missingSections: string[]
): string {
  let correctedContent = content;

  switch (componentType.type) {
    case 'agent':
      correctedContent = addMissingAgentSections(correctedContent, missingSections);
      break;
    case 'pattern':
      correctedContent = addMissingPatternSections(correctedContent, missingSections);
      break;
    case 'skill':
      correctedContent = addMissingSkillSections(correctedContent, missingSections);
      break;
    case 'command':
      correctedContent = addMissingCommandSections(correctedContent, missingSections);
      break;
    case 'hook':
      correctedContent = addMissingHookSections(correctedContent, missingSections);
      break;
  }

  return correctedContent;
}

function addMissingAgentSections(content: string, missing: string[]): string {
  let result = content;

  // Add missing YAML frontmatter
  if (missing.includes('---')) {
    result = `---
name: agent-name
description: Agent description
tools: Read, Write
model: claude-sonnet-4-5
thinking: think
---

${result}`;
  }

  // Add missing sections at the end
  const sectionsToAdd: string[] = [];

  if (missing.includes('## Core Expertise')) {
    sectionsToAdd.push(`
## Core Expertise

### [Category 1]
- [Expertise area 1]
- [Expertise area 2]
`);
  }

  if (missing.includes('## When to Invoke This Agent')) {
    sectionsToAdd.push(`
## When to Invoke This Agent

Invoke this agent when you need:
- **[Use case 1]**: [Description]
- **[Use case 2]**: [Description]
`);
  }

  if (missing.includes('## Workflow Protocol')) {
    sectionsToAdd.push(`
## Workflow Protocol

**For Every [Task Type]:**

1. **[Step 1]**
   - [Action]

2. **Load Knowledge**
   - \`@.claude/knowledge/[path]\`

3. **Create Deliverable**
   - [What to produce]
`);
  }

  if (missing.includes('## Quality Gates')) {
    sectionsToAdd.push(`
## Quality Gates

Before delivering:

- [ ] **[Check 1]**: [What to verify]
- [ ] **[Check 2]**: [What to verify]
`);
  }

  return result + sectionsToAdd.join('\n');
}

function addMissingPatternSections(content: string, missing: string[]): string {
  let result = content;

  const sectionsToAdd: string[] = [];

  if (missing.includes('## PURPOSE')) {
    sectionsToAdd.push(`
## PURPOSE

[What this pattern does]
`);
  }

  if (missing.includes('## INPUT')) {
    sectionsToAdd.push(`
## INPUT

**Required:**
1. **[Parameter]**: [Description]
`);
  }

  if (missing.includes('## PROCESS')) {
    sectionsToAdd.push(`
## PROCESS

### Step 1: [Step Name]
- [Action]
`);
  }

  if (missing.includes('## OUTPUT')) {
    sectionsToAdd.push(`
## OUTPUT

**Format:**
\`\`\`
[Output structure]
\`\`\`
`);
  }

  if (missing.includes('## QUALITY CHECKS')) {
    sectionsToAdd.push(`
## QUALITY CHECKS

- [ ] **[Check 1]**: [Criteria]
- [ ] **[Check 2]**: [Criteria]
`);
  }

  if (missing.includes('## EXAMPLE')) {
    sectionsToAdd.push(`
## EXAMPLE

**Input:**
- [Example input]

**Output:**
\`\`\`
[Example output]
\`\`\`
`);
  }

  return result + sectionsToAdd.join('\n');
}

function addMissingSkillSections(content: string, missing: string[]): string {
  let result = content;

  const sectionsToAdd: string[] = [];

  if (missing.includes('## PURPOSE')) {
    sectionsToAdd.push(`
## PURPOSE

[What this skill provides]
`);
  }

  if (missing.includes('## KNOWLEDGE BASE')) {
    sectionsToAdd.push(`
## KNOWLEDGE BASE

### [Category]
- [Knowledge point]
`);
  }

  if (missing.includes('## WHEN TO USE')) {
    sectionsToAdd.push(`
## WHEN TO USE

**Auto-activates when:**
- [Trigger condition]

**Manually reference when:**
- [Complex scenario]
`);
  }

  return result + sectionsToAdd.join('\n');
}

function addMissingCommandSections(content: string, missing: string[]): string {
  let result = content;

  const sectionsToAdd: string[] = [];

  if (missing.includes('## WHEN TO USE')) {
    sectionsToAdd.push(`
## WHEN TO USE

Use \`/command-name\` when:
- [Use case]
`);
  }

  if (missing.includes('## SYNTAX')) {
    sectionsToAdd.push(`
## SYNTAX

\`\`\`
/command-name [arg]
\`\`\`

**Arguments:**
- \`[arg]\`: [Description]
`);
  }

  if (missing.includes('## WHAT IT DOES')) {
    sectionsToAdd.push(`
## WHAT IT DOES

1. [Step 1]
2. [Step 2]
`);
  }

  if (missing.includes('## EXAMPLES')) {
    sectionsToAdd.push(`
## EXAMPLES

### Example 1:
\`\`\`
/command-name example
\`\`\`
[What happens]
`);
  }

  if (missing.includes('## OUTPUT')) {
    sectionsToAdd.push(`
## OUTPUT

**Success:**
\`\`\`
[Example output]
\`\`\`
`);
  }

  return result + sectionsToAdd.join('\n');
}

function addMissingHookSections(content: string, missing: string[]): string {
  let result = content;

  // Hooks are TypeScript, different approach
  if (missing.includes('#!/usr/bin/env ts-node')) {
    result = `#!/usr/bin/env ts-node\n\n${result}`;
  }

  if (missing.includes('/**')) {
    const docComment = `/**
 * Hook Name
 *
 * Description of what this hook does.
 */

`;
    result = result.replace(/^(#!\/usr\/bin\/env ts-node\n\n)/, `$1${docComment}`);
  }

  return result;
}

/**
 * Generate corrected file name if needed
 */
export function getCorrectedFileName(
  componentName: string,
  componentType: ComponentType,
  naming: NamingValidation
): string {
  if (!naming.valid && naming.suggestion) {
    const ext = componentType.type === 'hook' || componentType.type === 'utility' ? '.ts' : '.md';
    return `${naming.suggestion}${ext}`;
  }

  const ext = componentType.type === 'hook' || componentType.type === 'utility' ? '.ts' : '.md';
  return `${componentName}${ext}`;
}
