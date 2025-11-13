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
