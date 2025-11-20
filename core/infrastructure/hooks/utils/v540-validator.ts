/**
 * v5.4.0 Compliance Validator
 *
 * Validates that component files (skills, agents, patterns, commands) comply with
 * v5.4.0 Task Decomposition Override framework and directive language standards.
 *
 * Part of: v5.4.0 Directive Language Transformation
 * Created: 2025-11-14
 */

export interface V540ValidationResult {
  // Structure checks
  hasTaskDecomposition: boolean;
  hasLanguageStandards: boolean;
  hasProhibitedSequence: boolean;
  hasMandatorySequence: boolean;
  hasOutputAcknowledgment: boolean;

  // Language checks
  directiveCount: number;
  weakLanguageCount: number;
  weakLanguageInstances: string[];

  // Overall compliance
  isCompliant: boolean;
  isPartiallyCompliant: boolean;

  // Component type
  fileType: 'skill' | 'agent' | 'pattern' | 'command' | 'other';
}

/**
 * Validates v5.4.0 compliance for a component file
 */
export function validateV540Compliance(
  content: string,
  filename: string
): V540ValidationResult {
  const fileType = detectFileType(filename);

  // Structure checks
  const hasTaskDecomposition = content.indexOf('## Task Decomposition Override (v5.4.0)') !== -1;
  const hasLanguageStandards = content.indexOf('## Language Standards') !== -1;
  const hasProhibitedSequence = content.indexOf('### ❌ PROHIBITED SEQUENCE') !== -1;
  const hasMandatorySequence = content.indexOf('### ✅ MANDATORY SEQUENCE') !== -1;
  const hasOutputAcknowledgment = content.indexOf('**Output Acknowledgment After Phase') !== -1;

  // Language checks
  const directiveMatches = content.match(/YOU MUST|MUST NOT|DO NOT|ALWAYS|NEVER|MANDATORY|PROHIBITED/g) || [];
  const directiveCount = directiveMatches.length;

  const weakLanguageMatches = content.match(/\b(should|consider|might|could|try to|ideally|recommended)\b/gi) || [];
  const weakLanguageCount = weakLanguageMatches.length;
  // Deduplicate using object keys for ES5 compatibility
  const uniqueInstances: { [key: string]: boolean } = {};
  weakLanguageMatches.forEach(m => { uniqueInstances[m.toLowerCase()] = true; });
  const weakLanguageInstances = Object.keys(uniqueInstances);

  // Compliance calculation
  const structuralCompliance = hasTaskDecomposition && hasLanguageStandards;
  const sequenceCompliance = hasProhibitedSequence && hasMandatorySequence;
  const languageCompliance = directiveCount > 0 && weakLanguageCount < 5; // Allow up to 5 weak instances

  const isCompliant = structuralCompliance && sequenceCompliance && languageCompliance;
  const isPartiallyCompliant = (hasTaskDecomposition || hasLanguageStandards) && !isCompliant;

  return {
    hasTaskDecomposition,
    hasLanguageStandards,
    hasProhibitedSequence,
    hasMandatorySequence,
    hasOutputAcknowledgment,
    directiveCount,
    weakLanguageCount,
    weakLanguageInstances,
    isCompliant,
    isPartiallyCompliant,
    fileType
  };
}

/**
 * Generates warning message for non-compliant components
 */
export function generateV540Warning(
  result: V540ValidationResult,
  filename: string
): string {
  if (result.isCompliant) {
    return ''; // No warning needed
  }

  const warnings: string[] = [];

  // Structure warnings
  if (!result.hasTaskDecomposition || !result.hasLanguageStandards) {
    warnings.push(`
⚠️  v5.4.0 Structure Missing

Creating: ${filename}
Missing sections:${!result.hasTaskDecomposition ? '\n  - Task Decomposition Override (v5.4.0)' : ''}${!result.hasLanguageStandards ? '\n  - Language Standards' : ''}

Recommendation: Use component templates for v5.4.0 compliance
  /pattern component_${result.fileType} --name="${getComponentName(filename)}"

Proceeding without v5.4.0 structure (quality gates disabled)
    `);
  }

  // Sequence warnings
  if (!result.hasProhibitedSequence || !result.hasMandatorySequence) {
    warnings.push(`
ℹ️  Task Decomposition Sequences Incomplete

Missing:${!result.hasProhibitedSequence ? '\n  - ❌ PROHIBITED SEQUENCE section' : ''}${!result.hasMandatorySequence ? '\n  - ✅ MANDATORY SEQUENCE section' : ''}

These sections prevent Claude's default generic decomposition.
    `);
  }

  // Language warnings
  if (result.weakLanguageCount > 5) {
    warnings.push(`
⚠️  Weak Language Detected

Creating: ${filename}
Found ${result.weakLanguageCount} weak language instances: ${result.weakLanguageInstances.join(', ')}
Found ${result.directiveCount} directive language instances

v5.4.0 requires directive language for quality enforcement.
Weak language leads to inconsistent execution.

Recommendation: Convert to directives:
  ❌ "should" → ✅ "YOU MUST" / "MUST"
  ❌ "consider" → ✅ "YOU MUST evaluate"
  ❌ "might" → ✅ "may" or "MUST"

Proceeding with weak language (reduced quality guarantee)
    `);
  }

  // Output Acknowledgment info (only for patterns)
  if (result.fileType === 'pattern' && !result.hasOutputAcknowledgment) {
    warnings.push(`
ℹ️  Output Acknowledgment Missing

Creating pattern: ${filename}
Missing standardized output format for hook validation.

Recommendation: Add Output Acknowledgment sections:
  **Output Acknowledgment After Phase 1:**
  \`\`\`markdown
  ✅ PHASE 1 COMPLETE: [Phase Name]
  - [Key metrics]
  \`\`\`

Output Acknowledgment enables hook-based pattern validation.
    `);
  }

  return warnings.join('\n');
}

/**
 * Detects component type from filename
 */
function detectFileType(filename: string): 'skill' | 'agent' | 'pattern' | 'command' | 'other' {
  if (filename.indexOf('/skills/') !== -1) return 'skill';
  if (filename.indexOf('/agents/') !== -1) return 'agent';
  if (filename.indexOf('/patterns/') !== -1) return 'pattern';
  if (filename.indexOf('/commands/') !== -1) return 'command';
  return 'other';
}

/**
 * Extracts component name from filename
 */
function getComponentName(filename: string): string {
  const basename = filename.split('/').pop() || '';
  return basename.replace(/\.(md|ts|js)$/, '');
}

/**
 * Checks if file should be skipped (templates, examples)
 */
export function shouldSkipValidation(filename: string): boolean {
  const skipPatterns = [
    '/templates/',
    '/examples/',
    'TEMPLATE.md',
    'EXAMPLE.md',
    '-TEMPLATE.',
    '/node_modules/',
    '/dist/',
    '/.git/'
  ];

  return skipPatterns.some(pattern => filename.indexOf(pattern) !== -1);
}
