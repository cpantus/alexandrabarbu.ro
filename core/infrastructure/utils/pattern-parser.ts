/**
 * Pattern Parser Utility
 *
 * Reads component specification patterns from .claude/patterns/meta/ and extracts
 * validation rules, emoji mappings, and structural requirements.
 *
 * This enables pattern-based configuration where patterns define the rules
 * instead of hardcoded TypeScript logic.
 *
 * @version 5.2
 * @since 2025-11-06
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPES
// ============================================================================

export type ComponentType = 'agent' | 'command' | 'pattern' | 'skill' | 'hook' | 'workflow' | 'resource' | 'mcp_server';

export interface ComponentPattern {
  type: ComponentType;
  path: string;
  content: string;
  rules: PatternRules;
  emojiMappings: Map<string, string>;
  examples: PatternExample[];
}

export interface PatternRules {
  namingConvention: {
    format: string; // 'kebab-case', 'snake_case', etc.
    pattern: RegExp;
    minLength?: number;
    maxLength?: number;
    examples: { valid: string[]; invalid: string[] };
  };
  requiredStructure: {
    yamlFrontmatter?: string[];
    sections: string[];
    optionalSections?: string[];
  };
  emojiStandards: {
    placement: string;
    categoryEmoji?: string;
    individualMappings: Map<string, string>;
  };
  similarityThresholds: {
    warning: number;
    error: number;
  };
}

export interface PatternExample {
  title: string;
  input?: string;
  output: string;
  valid: boolean;
}

// ============================================================================
// PATTERN CACHE
// ============================================================================

const patternCache: Map<ComponentType, ComponentPattern> = new Map();
let cacheInitialized = false;

/**
 * Initialize pattern cache by loading all component patterns
 */
export function initializePatternCache(patternsDir?: string): void {
  if (cacheInitialized) return;

  const baseDir = patternsDir || path.join(process.cwd(), '.claude', 'patterns', 'meta');

  const componentTypes: ComponentType[] = [
    'agent',
    'command',
    'pattern',
    'skill',
    'hook',
    'workflow',
    'resource',
    'mcp_server'
  ];

  for (const type of componentTypes) {
    const patternPath = path.join(baseDir, `component_${type}.md`);

    if (fs.existsSync(patternPath)) {
      const content = fs.readFileSync(patternPath, 'utf-8');
      const pattern = parseComponentPattern(type, patternPath, content);
      patternCache.set(type, pattern);
    }
  }

  cacheInitialized = true;
}

/**
 * Get cached pattern for component type
 */
export function getComponentPattern(type: ComponentType): ComponentPattern | null {
  if (!cacheInitialized) {
    initializePatternCache();
  }

  return patternCache.get(type) || null;
}

/**
 * Clear pattern cache (useful for testing)
 */
export function clearPatternCache(): void {
  patternCache.clear();
  cacheInitialized = false;
}

// ============================================================================
// PATTERN PARSING
// ============================================================================

/**
 * Parse a component pattern file and extract rules
 */
function parseComponentPattern(
  type: ComponentType,
  filePath: string,
  content: string
): ComponentPattern {
  return {
    type,
    path: filePath,
    content,
    rules: extractRules(content),
    emojiMappings: extractEmojiMappings(content),
    examples: extractExamples(content)
  };
}

/**
 * Extract validation rules from RULES section
 */
function extractRules(content: string): PatternRules {
  const rulesSection = extractSection(content, '## RULES');

  return {
    namingConvention: extractNamingConvention(rulesSection),
    requiredStructure: extractRequiredStructure(rulesSection),
    emojiStandards: extractEmojiStandards(rulesSection),
    similarityThresholds: extractSimilarityThresholds(rulesSection)
  };
}

/**
 * Extract naming convention rules
 */
function extractNamingConvention(rulesSection: string): PatternRules['namingConvention'] {
  const namingSection = extractSection(rulesSection, '### Naming Convention');

  // Extract format (kebab-case, snake_case, etc.)
  const formatMatch = namingSection.match(/\*\*Format:\*\*\s+([a-z-_]+)/i);
  const format = formatMatch ? formatMatch[1] : 'kebab-case';

  // Extract regex pattern
  const patternMatch = namingSection.match(/\*\*Pattern:\*\*\s+`([^`]+)`/);
  const patternStr = patternMatch ? patternMatch[1] : '^[a-z0-9]+(-[a-z0-9]+)*$';
  const pattern = new RegExp(patternStr);

  // Extract valid examples
  const validExamples: string[] = [];
  const invalidExamples: string[] = [];

  const validMatches = namingSection.matchAll(/^-\s+`([^`]+)`\s+✓/gm);
  for (const match of validMatches) {
    validExamples.push(match[1]);
  }

  const invalidMatches = namingSection.matchAll(/^-\s+`([^`]+)`\s+✗/gm);
  for (const match of invalidMatches) {
    invalidExamples.push(match[1]);
  }

  return {
    format,
    pattern,
    examples: { valid: validExamples, invalid: invalidExamples }
  };
}

/**
 * Extract required structure rules
 */
function extractRequiredStructure(rulesSection: string): PatternRules['requiredStructure'] {
  const structureSection = extractSection(rulesSection, '### Required Structure');

  // Extract YAML frontmatter fields
  const yamlMatch = structureSection.match(/```yaml\n([\s\S]+?)\n```/);
  const yamlFields: string[] = [];
  if (yamlMatch) {
    const yamlContent = yamlMatch[1];
    const fieldMatches = yamlContent.matchAll(/^([a-z_A-Z]+):/gm);
    for (const match of fieldMatches) {
      yamlFields.push(match[1]);
    }
  }

  // Extract required sections (multiple formats supported)
  const sections: string[] = [];

  // Format 1: "- ## Section Name"
  const listMatches = structureSection.matchAll(/^- ## ([^(\n]+)/gm);
  for (const match of listMatches) {
    sections.push(match[1].trim());
  }

  // Format 2: Numbered list "1. **## Section Name**"
  const numberedMatches = structureSection.matchAll(/^\d+\.\s+\*\*## ([^*]+)\*\*/gm);
  for (const match of numberedMatches) {
    sections.push(match[1].trim());
  }

  // Format 3: Look for markdown sections that mention "MUST include"
  const mustIncludeMatch = structureSection.match(/MUST include.*?sections.*?:/i);
  if (mustIncludeMatch && sections.length === 0) {
    // Extract section names from subsequent lines
    const afterMust = structureSection.substring(mustIncludeMatch.index! + mustIncludeMatch[0].length);
    const sectionNameMatches = afterMust.matchAll(/## ([A-Za-z ]+)/g);
    for (const match of sectionNameMatches) {
      const sectionName = match[1].trim();
      if (sectionName && !sections.includes(sectionName)) {
        sections.push(sectionName);
      }
    }
  }

  // Extract optional sections if specified
  const optionalSections: string[] = [];
  const optionalMatch = structureSection.match(/\*\*Optional Sections:\*\*/);
  if (optionalMatch) {
    const afterOptional = structureSection.substring(optionalMatch.index! + optionalMatch[0].length);
    const optMatches = afterOptional.matchAll(/^- `## ([^`]+)`/gm);
    for (const match of optMatches) {
      optionalSections.push(match[1].trim());
    }
  }

  return {
    yamlFrontmatter: yamlFields.length > 0 ? yamlFields : undefined,
    sections,
    optionalSections: optionalSections.length > 0 ? optionalSections : undefined
  };
}

/**
 * Extract emoji standards and mappings
 */
function extractEmojiStandards(rulesSection: string): PatternRules['emojiStandards'] {
  const emojiSection = extractSection(rulesSection, '### Emoji Standards');

  // Extract category emoji if present
  const categoryMatch = emojiSection.match(/[Cc]ategory emoji:\s+(.+)/);
  const categoryEmoji = categoryMatch ? categoryMatch[1].trim() : undefined;

  // Extract individual emoji mappings
  const mappings = new Map<string, string>();

  // Match patterns like: - `agent-name`: 🎯 (description)
  const mappingMatches = emojiSection.matchAll(/^-\s+`([^`]+)`:\s+([^\s(]+)/gm);
  for (const match of mappingMatches) {
    mappings.set(match[1], match[2]);
  }

  // Match table format: | agent-name | 🎯 | ...
  const tableMatches = emojiSection.matchAll(/^\|\s+([a-z0-9-_]+)\s+\|\s+([^\s|]+)\s+\|/gm);
  for (const match of tableMatches) {
    if (match[1] !== '---' && !match[1].includes('Name')) {
      mappings.set(match[1], match[2]);
    }
  }

  return {
    placement: 'First character in YAML description or heading',
    categoryEmoji,
    individualMappings: mappings
  };
}

/**
 * Extract similarity detection thresholds
 */
function extractSimilarityThresholds(rulesSection: string): PatternRules['similarityThresholds'] {
  const similaritySection = extractSection(rulesSection, '### Similarity Detection');

  const warningMatch = similaritySection.match(/\*\*Warning:\*\*\s+>(\d+)%/);
  const errorMatch = similaritySection.match(/\*\*Error:\*\*\s+>(\d+)%/);

  return {
    warning: warningMatch ? parseInt(warningMatch[1]) : 60,
    error: errorMatch ? parseInt(errorMatch[1]) : 85
  };
}

/**
 * Extract emoji mappings from pattern
 */
function extractEmojiMappings(content: string): Map<string, string> {
  const emojiSection = extractSection(content, '### Emoji Standards');
  const mappings = new Map<string, string>();

  // Extract all emoji mappings
  const mappingMatches = emojiSection.matchAll(/^-\s+`([^`]+)`:\s+([^\s(]+)/gm);
  for (const match of mappingMatches) {
    mappings.set(match[1], match[2]);
  }

  // Extract from tables
  const tableMatches = emojiSection.matchAll(/^\|\s+([a-z0-9-_]+)\s+\|\s+([^\s|]+)\s+\|/gm);
  for (const match of tableMatches) {
    if (match[1] !== '---' && !match[1].includes('Name')) {
      mappings.set(match[1], match[2]);
    }
  }

  return mappings;
}

/**
 * Extract examples from pattern
 */
function extractExamples(content: string): PatternExample[] {
  const exampleSection = extractSection(content, '## EXAMPLE');
  const examples: PatternExample[] = [];

  // Look for scenario headings
  const scenarios = exampleSection.split(/### Scenario \d+:/);

  for (let i = 1; i < scenarios.length; i++) {
    const scenario = scenarios[i];
    const titleMatch = scenario.match(/^([^\n]+)/);
    const title = titleMatch ? titleMatch[1].trim() : `Example ${i}`;

    // Check if valid or invalid
    const valid = !title.toLowerCase().includes('invalid') &&
                   !title.toLowerCase().includes('error');

    examples.push({
      title,
      output: scenario.trim(),
      valid
    });
  }

  return examples;
}

/**
 * Extract a section from markdown content
 */
function extractSection(content: string, sectionHeader: string): string {
  const headerRegex = new RegExp(`^${sectionHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
  const match = content.match(headerRegex);

  if (!match || match.index === undefined) {
    return '';
  }

  const startIndex = match.index;

  // Find next section at same or higher level
  const headerLevel = (sectionHeader.match(/^#+/) || ['##'])[0].length;
  const nextSectionRegex = new RegExp(`^#{1,${headerLevel}}\\s+[^#]`, 'gm');

  nextSectionRegex.lastIndex = startIndex + sectionHeader.length;
  const nextMatch = nextSectionRegex.exec(content);

  const endIndex = nextMatch ? nextMatch.index : content.length;
  return content.substring(startIndex, endIndex);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get emoji for a specific component
 */
export function getEmojiForComponent(type: ComponentType, componentName: string): string | null {
  const pattern = getComponentPattern(type);
  if (!pattern) return null;

  return pattern.emojiMappings.get(componentName) || null;
}

/**
 * Get all emoji mappings for a component type
 */
export function getAllEmojiMappings(type: ComponentType): Map<string, string> {
  const pattern = getComponentPattern(type);
  return pattern?.emojiMappings || new Map();
}

/**
 * Validate component name against pattern rules
 */
export function validateComponentName(type: ComponentType, name: string): {
  valid: boolean;
  expectedFormat: string;
  actualFormat: string;
  issues: string[];
} {
  const pattern = getComponentPattern(type);
  if (!pattern) {
    return {
      valid: false,
      expectedFormat: 'unknown',
      actualFormat: 'unknown',
      issues: [`No pattern found for component type: ${type}`]
    };
  }

  const rules = pattern.rules.namingConvention;
  const issues: string[] = [];

  // Check format
  const valid = rules.pattern.test(name);
  if (!valid) {
    issues.push(`Name does not match expected pattern: ${rules.format}`);
  }

  // Detect actual format
  let actualFormat = 'unknown';
  if (name.includes('_')) {
    actualFormat = 'snake_case';
  } else if (name.includes('-')) {
    actualFormat = 'kebab-case';
  } else if (name.match(/[A-Z]/)) {
    actualFormat = 'PascalCase or camelCase';
  } else {
    actualFormat = 'lowercase';
  }

  return {
    valid: valid && issues.length === 0,
    expectedFormat: rules.format,
    actualFormat,
    issues
  };
}

/**
 * Get similarity thresholds for component type
 */
export function getSimilarityThresholds(type: ComponentType): { warning: number; error: number } {
  const pattern = getComponentPattern(type);
  return pattern?.rules.similarityThresholds || { warning: 60, error: 85 };
}

/**
 * Get required structure for component type
 */
export function getRequiredStructure(type: ComponentType): PatternRules['requiredStructure'] | null {
  const pattern = getComponentPattern(type);
  return pattern?.rules.requiredStructure || null;
}
