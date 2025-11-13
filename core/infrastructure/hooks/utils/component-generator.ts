/**
 * Component Generator Utility
 *
 * Generates component files from pattern-based templates with interactive prompting.
 * Integrates with pattern-parser and component-consistency-validator.
 *
 * @version 1.0 (Phase 3 - v6.0)
 * @since 2025-11-07
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  ComponentType as PatternComponentType,
  getComponentPattern,
  getEmojiForComponent,
  initializePatternCache
} from './pattern-parser';
import {
  validateComponent,
  ComponentType as ValidatorComponentType
} from './component-consistency-validator';
import {
  searchComponents,
  SearchQuery,
  SearchMatch,
  ComponentMetadata,
  RepoOutline
} from './source-scanner';

// ============================================================================
// TYPES
// ============================================================================

export type ComponentType = PatternComponentType;

export interface GenerationOptions {
  dryRun?: boolean;        // Preview without writing
  noValidate?: boolean;    // Skip validation
  force?: boolean;         // Overwrite existing
  category?: string;       // For patterns
  complexity?: string;     // For patterns
  interactive?: boolean;   // Interactive mode (default: true)
}

export interface ComponentInputs {
  [key: string]: string | string[] | boolean;
}

export interface GenerationResult {
  success: boolean;
  filePath: string;
  content: string;
  validation?: any;
  registriesUpdated: string[];
  warnings: string[];
  errors: string[];
}

// ============================================================================
// TEMPLATE ENGINE
// ============================================================================

/**
 * Simple template engine - supports {{var}}, {{#each}}, {{#if}}
 */
class TemplateEngine {
  private helpers: Map<string, (value: any) => string>;

  constructor() {
    this.helpers = new Map();
    this.registerDefaultHelpers();
  }

  /**
   * Register default helper functions
   */
  private registerDefaultHelpers(): void {
    // titleCase: "marketing-director" -> "Marketing Director"
    this.helpers.set('titleCase', (value: string) => {
      return value
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });

    // capitalize: "marketing-director" -> "Marketing-director"
    this.helpers.set('capitalize', (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    });

    // uppercase: "hello" -> "HELLO"
    this.helpers.set('uppercase', (value: string) => {
      return value.toUpperCase();
    });

    // lowercase: "HELLO" -> "hello"
    this.helpers.set('lowercase', (value: string) => {
      return value.toLowerCase();
    });

    // kebabCase: "Marketing Director" -> "marketing-director"
    this.helpers.set('kebabCase', (value: string) => {
      return value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    });
  }

  /**
   * Render template with inputs
   */
  public render(template: string, inputs: ComponentInputs): string {
    let result = template;

    // Process {{#if condition}}...{{/if}} blocks
    result = this.processConditionals(result, inputs);

    // Process {{#each array}}...{{/each}} blocks
    result = this.processLoops(result, inputs);

    // Process {{variable}} and {{variable | helper}}
    result = this.processVariables(result, inputs);

    return result;
  }

  /**
   * Process {{#if condition}}...{{/if}} blocks
   */
  private processConditionals(template: string, inputs: ComponentInputs): string {
    const ifRegex = /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g;

    return template.replace(ifRegex, (match, condition, content) => {
      const value = inputs[condition];

      // Include content if value is truthy
      // Check falsy: undefined, null, '', false
      const isFalsy = !value || value === '' || (typeof value === 'boolean' && !value);
      if (isFalsy) {
        return '';
      }

      return content;
    });
  }

  /**
   * Process {{#each array}}...{{/each}} blocks
   */
  private processLoops(template: string, inputs: ComponentInputs): string {
    const eachRegex = /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g;

    return template.replace(eachRegex, (match, arrayName, itemTemplate) => {
      const array = inputs[arrayName];

      if (!Array.isArray(array)) {
        return '';
      }

      // Special handling for collaboration array (has {agent, role} objects)
      if (arrayName === 'collaboration' && array.length > 0 && typeof array[0] === 'object') {
        return array.map(item => {
          let itemContent = itemTemplate;
          // Replace {{agent}} and {{role}}
          for (const [key, value] of Object.entries(item)) {
            itemContent = itemContent.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value));
          }
          return itemContent;
        }).join('');
      }

      // Standard array - replace {{this}} with item value
      return array.map(item => {
        return itemTemplate.replace(/\{\{this\}\}/g, String(item));
      }).join('');
    });
  }

  /**
   * Process {{variable}} and {{variable | helper}}
   */
  private processVariables(template: string, inputs: ComponentInputs): string {
    // Pattern: {{variable}} or {{variable | helper}}
    const varRegex = /\{\{([^}]+)\}\}/g;

    return template.replace(varRegex, (match, expression) => {
      const trimmed = expression.trim();

      // Check if helper is used: variable | helper
      const parts = trimmed.split('|').map((p: string) => p.trim());
      const varName = parts[0];
      const helperName = parts.length > 1 ? parts[1] : null;

      // Get variable value
      let value = inputs[varName];

      if (value === undefined || value === null) {
        return '';
      }

      // Convert to string
      value = String(value);

      // Apply helper if specified
      if (helperName && this.helpers.has(helperName)) {
        const helper = this.helpers.get(helperName)!;
        value = helper(value);
      }

      return value;
    });
  }

  /**
   * Register custom helper
   */
  public registerHelper(name: string, fn: (value: any) => string): void {
    this.helpers.set(name, fn);
  }
}

// ============================================================================
// TEMPLATE EXTRACTION
// ============================================================================

/**
 * Extract template from pattern OUTPUT section
 */
function extractTemplate(componentType: ComponentType): string | null {
  const pattern = getComponentPattern(componentType);
  if (!pattern) {
    return null;
  }

  const content = pattern.content;

  // Extract template from OUTPUT section
  // Look for: ## OUTPUT ... ### Template Structure ... ```markdown ... ```
  const outputMatch = content.match(/## OUTPUT[\s\S]*?### Template Structure[\s\S]*?```markdown\n([\s\S]*?)\n```/);

  if (!outputMatch) {
    return null;
  }

  return outputMatch[1];
}

/**
 * Extract template variables documentation from pattern
 */
function extractTemplateVariables(componentType: ComponentType): {
  required: string[];
  optional: string[];
} {
  const pattern = getComponentPattern(componentType);
  if (!pattern) {
    return { required: [], optional: [] };
  }

  const content = pattern.content;
  const required: string[] = [];
  const optional: string[] = [];

  // Extract from ### Template Variables section
  const varsMatch = content.match(/### Template Variables([\s\S]*?)(?=###|$)/);
  if (!varsMatch) {
    return { required, optional };
  }

  const varsSection = varsMatch[1];

  // Extract required variables: - `varName`: description
  const requiredMatches = varsSection.match(/\*\*Required.*?\*\*:[\s\S]*?(?=\*\*Optional|\*\*Variable|$)/);
  if (requiredMatches) {
    const reqSection = requiredMatches[0];
    const reqVars = reqSection.matchAll(/- `(\w+)`:/g);
    for (const match of reqVars) {
      required.push(match[1]);
    }
  }

  // Extract optional variables
  const optionalMatches = varsSection.match(/\*\*Optional.*?\*\*:[\s\S]*?(?=\*\*Variable|$)/);
  if (optionalMatches) {
    const optSection = optionalMatches[0];
    const optVars = optSection.matchAll(/- `(\w+)`:/g);
    for (const match of optVars) {
      optional.push(match[1]);
    }
  }

  return { required, optional };
}

// ============================================================================
// INTERACTIVE PROMPTING
// ============================================================================

/**
 * Prompt user interactively for component inputs
 *
 * This function would integrate with AskUserQuestion in a real CLI environment.
 * For now, it's a placeholder that will be called from the /generate command.
 */
async function promptForInputs(
  componentType: ComponentType,
  componentName: string
): Promise<ComponentInputs> {
  const inputs: ComponentInputs = {
    componentName
  };

  // Extract required and optional variables from pattern
  const { required, optional } = extractTemplateVariables(componentType);

  // Get emoji automatically
  const emoji = getEmojiForComponent(componentType, componentName);
  if (emoji) {
    inputs.emoji = emoji;
  }

  // For now, return basic inputs
  // The /generate command will handle the actual prompting using AskUserQuestion
  // This function serves as the interface between command and generator

  return inputs;
}

/**
 * Get field descriptions from pattern INPUT section
 */
function getFieldDescriptions(componentType: ComponentType): Map<string, string> {
  const pattern = getComponentPattern(componentType);
  const descriptions = new Map<string, string>();

  if (!pattern) {
    return descriptions;
  }

  const content = pattern.content;

  // Extract from ## INPUT section
  const inputMatch = content.match(/## INPUT([\s\S]*?)(?=##|$)/);
  if (!inputMatch) {
    return descriptions;
  }

  const inputSection = inputMatch[1];

  // Extract field descriptions: - `fieldName`: description or **fieldName:** description
  const fieldMatches = inputSection.matchAll(/(?:- `(\w+)`:|^\*\*(\w+):\*\*)\s*(.+?)$/gm);
  for (const match of fieldMatches) {
    const fieldName = match[1] || match[2];
    const description = match[3];
    if (fieldName) {
      descriptions.set(fieldName, description.trim());
    }
  }

  return descriptions;
}

/**
 * Validate user input for a specific field
 */
function validateFieldInput(
  fieldName: string,
  value: any,
  componentType: ComponentType
): { valid: boolean; error?: string } {
  // Basic validation rules
  switch (fieldName) {
    case 'componentName':
      if (typeof value !== 'string' || value.length < 3) {
        return { valid: false, error: 'Component name must be at least 3 characters' };
      }
      // Check kebab-case
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)) {
        return { valid: false, error: 'Component name must be in kebab-case' };
      }
      break;

    case 'model':
      const validModels = ['sonnet', 'opus', 'haiku', 'claude-sonnet-4-5', 'claude-opus-4', 'claude-haiku-4'];
      if (!validModels.includes(String(value))) {
        return { valid: false, error: `Model must be one of: ${validModels.join(', ')}` };
      }
      break;

    case 'thinking':
      const validThinking = ['think', 'think-hard', 'ultrathink'];
      if (!validThinking.includes(String(value))) {
        return { valid: false, error: `Thinking mode must be one of: ${validThinking.join(', ')}` };
      }
      break;

    case 'tools':
      // Accept comma-separated string or array
      if (typeof value === 'string') {
        const tools = value.split(',').map(t => t.trim());
        const validTools = ['Read', 'Write', 'Edit', 'MultiEdit', 'Task', 'Bash', 'Grep', 'Glob', 'WebSearch', 'WebFetch'];
        const invalidTools = tools.filter(t => !validTools.includes(t));
        if (invalidTools.length > 0) {
          return { valid: false, error: `Invalid tools: ${invalidTools.join(', ')}` };
        }
      }
      break;
  }

  return { valid: true };
}

// ============================================================================
// COMPONENT GENERATION
// ============================================================================

/**
 * Generate component from template
 */
async function generateComponent(
  componentType: ComponentType,
  componentName: string,
  inputs: ComponentInputs,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  const result: GenerationResult = {
    success: false,
    filePath: '',
    content: '',
    registriesUpdated: [],
    warnings: [],
    errors: []
  };

  try {
    // Initialize pattern cache if not already done
    initializePatternCache();

    // Get emoji for component
    const emoji = getEmojiForComponent(componentType, componentName);
    if (emoji) {
      inputs.emoji = emoji;
    }

    // Add componentName to inputs
    inputs.componentName = componentName;

    // Extract template from pattern
    const template = extractTemplate(componentType);
    if (!template) {
      result.errors.push(`No template found for component type: ${componentType}`);
      return result;
    }

    // Render template
    const engine = new TemplateEngine();
    const content = engine.render(template, inputs);

    result.content = content;

    // Determine file path
    const filePath = getComponentFilePath(componentType, componentName, options);
    result.filePath = filePath;

    // Check if file exists (unless force)
    if (!options.force && fs.existsSync(filePath)) {
      result.errors.push(`File already exists: ${filePath}. Use --force to overwrite.`);
      return result;
    }

    // Validate generated content (unless noValidate)
    if (!options.noValidate) {
      const validatorType: ValidatorComponentType = {
        type: componentType as any,
        path: filePath
      };

      const validation = validateComponent(
        componentName,
        content,
        validatorType,
        process.cwd()
      );

      result.validation = validation;

      if (!validation.overallValid) {
        result.warnings.push('Generated component has validation issues');
        // Still allow generation, but warn user
      }
    }

    // Write file (unless dry-run)
    if (!options.dryRun) {
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, content, 'utf-8');
    }

    result.success = true;

  } catch (error) {
    result.errors.push(`Generation failed: ${error instanceof Error ? error.message : String(error)}`);
  }

  return result;
}

/**
 * Get file path for component
 */
function getComponentFilePath(
  componentType: ComponentType,
  componentName: string,
  options: GenerationOptions
): string {
  const projectRoot = process.cwd();
  const extension = componentType === 'hook' ? '.ts' : '.md';
  const filename = `${componentName}${extension}`;

  switch (componentType) {
    case 'agent':
      return path.join(projectRoot, '.claude', 'agents', filename);
    case 'command':
      return path.join(projectRoot, '.claude', 'commands', filename);
    case 'pattern':
      const category = options.category || 'content';
      return path.join(projectRoot, '.claude', 'patterns', category, filename);
    case 'skill':
      return path.join(projectRoot, '.claude', 'skills', filename);
    case 'hook':
      return path.join(projectRoot, '.claude', 'hooks', filename);
    case 'workflow':
      return path.join(projectRoot, '.claude', 'workflows', filename);
    case 'resource':
      return path.join(projectRoot, '.claude', 'skills', 'resources', filename);
    case 'mcp_server':
      return path.join(projectRoot, '.claude', 'mcp-servers', filename);
    default:
      return path.join(projectRoot, '.claude', filename);
  }
}

// ============================================================================
// SOURCE EXAMPLE INTEGRATION
// ============================================================================

/**
 * Find relevant examples from research repos
 */
export function findRelevantExamples(query: SearchQuery): SearchMatch[] {
  return searchComponents(query);
}

/**
 * Get component summary (from outline only - fast)
 */
export function getComponentSummary(match: SearchMatch): {
  id: string;
  type: string;
  purpose: string;
  repo: string;
  keywords: string[];
} {
  return {
    id: match.component.id,
    type: match.component.type,
    purpose: match.component.purpose,
    repo: match.repo,
    keywords: match.component.keywords
  };
}

/**
 * Find similar components based on selected component
 * Uses shared keywords and tools to find related components
 */
export function findSimilarComponents(
  selectedMatch: SearchMatch,
  limit: number = 5
): SearchMatch[] {
  // Create search query from selected component's attributes
  const query: SearchQuery = {
    keywords: selectedMatch.component.keywords.slice(0, 5), // Use top 5 keywords
    type: selectedMatch.component.type,
    tools: selectedMatch.component.tools
  };

  // Search for similar components
  const allMatches = searchComponents(query);

  // Filter out the selected component itself
  const similarMatches = allMatches.filter(
    match => !(
      match.component.id === selectedMatch.component.id &&
      match.repo === selectedMatch.repo
    )
  );

  // Calculate similarity scores
  const withSimilarity = similarMatches.map(match => {
    let similarityScore = match.score; // Base score from keyword/tool matching

    // Bonus for shared keywords
    const sharedKeywords = match.component.keywords.filter(k =>
      selectedMatch.component.keywords.includes(k)
    );
    similarityScore += sharedKeywords.length * 5;

    // Bonus for shared tools
    if (match.component.tools && selectedMatch.component.tools) {
      const sharedTools = match.component.tools.filter(t =>
        selectedMatch.component.tools!.includes(t)
      );
      similarityScore += sharedTools.length * 10;
    }

    return {
      ...match,
      similarityScore,
      sharedKeywords: sharedKeywords.length,
      sharedTools: match.component.tools && selectedMatch.component.tools
        ? match.component.tools.filter(t => selectedMatch.component.tools!.includes(t)).length
        : 0
    };
  });

  // Sort by similarity score and return top N
  return withSimilarity
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit);
}

/**
 * Get component preview (smart section extraction)
 */
export function getComponentPreview(match: SearchMatch): string {
  const fullPath = getFullPath(match);

  if (!fs.existsSync(fullPath)) {
    return `Error: File not found at ${fullPath}`;
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');

  // Extract key sections for preview
  const preview: string[] = [];
  let lineCount = 0;
  const maxLines = 100;

  // 1. YAML frontmatter (if exists)
  if (lines[0]?.startsWith('---')) {
    let yamlEnd = -1;
    for (let i = 1; i < Math.min(lines.length, 50); i++) {
      preview.push(lines[i]);
      lineCount++;
      if (lines[i].startsWith('---')) {
        yamlEnd = i;
        break;
      }
    }
    if (yamlEnd === -1) {
      preview.push('---');
      lineCount++;
    }
    preview.push(''); // blank line after YAML
    lineCount++;
  }

  // 2. Find major sections (## headings)
  const sections: { index: number; title: string; lines: string[] }[] = [];
  let currentSection: { index: number; title: string; lines: string[] } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      // Save previous section
      if (currentSection) {
        sections.push(currentSection);
      }
      // Start new section
      currentSection = {
        index: i,
        title: line.substring(3).trim(),
        lines: [line]
      };
    } else if (currentSection) {
      currentSection.lines.push(line);
    }
  }
  // Save last section
  if (currentSection) {
    sections.push(currentSection);
  }

  // 3. Show first ~10 lines of each section (or until we hit maxLines)
  const prioritySections = ['Purpose', 'Description', 'Overview', 'Usage', 'When to Use', 'Examples'];

  // First, show priority sections
  for (const sectionTitle of prioritySections) {
    const section = sections.find(s =>
      s.title.toLowerCase().includes(sectionTitle.toLowerCase())
    );
    if (section && lineCount < maxLines) {
      const linesToShow = section.lines.slice(0, Math.min(15, maxLines - lineCount));
      preview.push(...linesToShow);
      lineCount += linesToShow.length;
      preview.push(''); // blank line between sections
      lineCount++;
    }
  }

  // Then, show other sections if we have space
  for (const section of sections.slice(0, 3)) {
    if (lineCount >= maxLines) break;
    if (prioritySections.some(p => section.title.toLowerCase().includes(p.toLowerCase()))) {
      continue; // Skip already shown sections
    }
    const linesToShow = section.lines.slice(0, Math.min(10, maxLines - lineCount));
    preview.push(...linesToShow);
    lineCount += linesToShow.length;
    preview.push(''); // blank line
    lineCount++;
  }

  // Fallback: if no sections found, just show first 100 lines
  if (preview.length === 0) {
    return lines.slice(0, 100).join('\n') + '\n\n[... preview truncated at 100 lines ...]';
  }

  return preview.join('\n') + '\n\n[... smart preview showing key sections ...]';
}

/**
 * Get full component content
 */
export function getFullComponent(match: SearchMatch): string {
  const fullPath = getFullPath(match);

  if (!fs.existsSync(fullPath)) {
    return `Error: File not found at ${fullPath}`;
  }

  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * Get full file path from match
 */
function getFullPath(match: SearchMatch): string {
  const researchPath = path.join(process.cwd(), 'research', 'component-examples');
  return path.join(researchPath, match.repo, match.component.path);
}

/**
 * Adapt component to system standards
 */
export function adaptToSystemStandards(
  sourceContent: string,
  componentType: ComponentType,
  componentName: string
): {
  adapted: string;
  changes: string[];
} {
  const changes: string[] = [];
  let adapted = sourceContent;

  // 1. Add/fix YAML frontmatter
  const hasYaml = adapted.startsWith('---\n');
  if (!hasYaml) {
    const emoji = getEmojiForComponent(componentType, componentName);
    const yamlBlock = `---
name: ${componentName}
type: ${componentType}
version: 1.0
emoji: ${emoji || '🔧'}
---

`;
    adapted = yamlBlock + adapted;
    changes.push('Added YAML frontmatter with standard fields');
  }

  // 2. Ensure proper naming (kebab-case)
  const properName = componentName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (properName !== componentName) {
    adapted = adapted.replace(new RegExp(componentName, 'g'), properName);
    changes.push(`Normalized name to kebab-case: ${componentName} → ${properName}`);
  }

  // 3. Map tool names to system tools
  const toolMappings: { [key: string]: string } = {
    'FileRead': 'Read',
    'FileWrite': 'Write',
    'FileEdit': 'Edit',
    'Search': 'Grep',
    'Find': 'Glob',
    'Execute': 'Bash',
    'WebSearch': 'WebSearch',
    'WebFetch': 'WebFetch'
  };

  for (const [oldTool, newTool] of Object.entries(toolMappings)) {
    if (adapted.includes(oldTool)) {
      adapted = adapted.replace(new RegExp(`\\b${oldTool}\\b`, 'g'), newTool);
      changes.push(`Mapped tool: ${oldTool} → ${newTool}`);
    }
  }

  // 4. Add model and thinking directives if missing (for agents)
  if (componentType === 'agent') {
    if (!adapted.includes('**model:**') && !adapted.includes('**Model:**')) {
      const modelSection = `\n**Model:** sonnet\n**Thinking:** think\n`;
      // Insert after first heading
      const firstHeading = adapted.indexOf('\n#');
      if (firstHeading !== -1) {
        const insertPoint = adapted.indexOf('\n', firstHeading + 1);
        adapted = adapted.slice(0, insertPoint) + modelSection + adapted.slice(insertPoint);
        changes.push('Added model and thinking directives');
      }
    }
  }

  // 5. Ensure structure sections exist (for agents)
  if (componentType === 'agent') {
    const requiredSections = ['Purpose', 'Tools', 'Instructions'];
    const missingSections: string[] = [];

    for (const section of requiredSections) {
      if (!adapted.includes(`## ${section}`) && !adapted.includes(`## ${section.toUpperCase()}`)) {
        missingSections.push(section);
      }
    }

    if (missingSections.length > 0) {
      changes.push(`Missing sections: ${missingSections.join(', ')} (will need manual completion)`);
    }
  }

  // 6. Add source attribution
  const attribution = `\n---\n\n**Adapted from:** Research repository component\n**Adaptation Date:** ${new Date().toISOString().split('T')[0]}\n**Modifications:** ${changes.length > 0 ? changes.join('; ') : 'Minor structural adaptations'}\n`;

  adapted = adapted + attribution;
  changes.push('Added source attribution footer');

  return { adapted, changes };
}

/**
 * Generate side-by-side comparison
 */
export function generateComparison(
  source: string,
  adapted: string
): string {
  const sourceLines = source.split('\n');
  const adaptedLines = adapted.split('\n');

  const maxLines = Math.max(sourceLines.length, adaptedLines.length);
  const comparison: string[] = [];

  comparison.push('╔══════════════════════════════════════════════════════════════════════════╗');
  comparison.push('║                           COMPONENT COMPARISON                           ║');
  comparison.push('╠══════════════════════════════════════════════════════════════════════════╣');
  comparison.push('║ SOURCE (Original)                 │ ADAPTED (System-Compliant)          ║');
  comparison.push('╠═══════════════════════════════════╪═════════════════════════════════════╣');

  // Show first 30 lines of each
  const displayLines = Math.min(30, maxLines);

  for (let i = 0; i < displayLines; i++) {
    const srcLine = (sourceLines[i] || '').slice(0, 35).padEnd(35);
    const adaptLine = (adaptedLines[i] || '').slice(0, 35).padEnd(35);

    const marker = sourceLines[i] !== adaptedLines[i] ? '│' : '│';
    comparison.push(`║ ${srcLine} ${marker} ${adaptLine} ║`);
  }

  if (maxLines > 30) {
    comparison.push('║ ... (showing first 30 lines)      │ ... (showing first 30 lines)       ║');
  }

  comparison.push('╚═══════════════════════════════════╧═════════════════════════════════════╝');

  return comparison.join('\n');
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  TemplateEngine,
  extractTemplate,
  extractTemplateVariables,
  promptForInputs,
  getFieldDescriptions,
  validateFieldInput,
  generateComponent
};
