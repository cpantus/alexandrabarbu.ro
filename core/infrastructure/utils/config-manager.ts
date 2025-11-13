/**
 * Config Manager - Project Configuration and Extension Composition
 *
 * Loads and manages project configuration, extension enablement,
 * and composes settings from core + extensions.
 *
 * @version 1.0.0
 */

import * as fs from 'fs';
import * as path from 'path';
import Ajv from 'ajv';

// Types
export interface ProjectConfig {
  project: {
    name: string;
    version: string;
    description?: string;
  };
  extensions: Array<{
    name: string;
    enabled: boolean;
    config?: Record<string, any>;
  }>;
  features?: {
    teaching?: boolean;
    demo?: boolean;
    workflows?: boolean;
    mcp?: boolean;
  };
  tier?: {
    mode?: 'quick' | 'balanced' | 'full';
    customTiers?: {
      tier1?: string[];
      tier2?: string[];
      tier3?: string[];
    };
  };
  performance?: {
    caching?: boolean;
    parallelLoading?: boolean;
    lazyLoading?: boolean;
  };
  cost?: {
    budget?: {
      daily?: number;
      monthly?: number;
    };
    alertThreshold?: number;
  };
  model?: {
    default?: 'haiku' | 'sonnet' | 'opus';
    rules?: Array<{
      taskType: string;
      model: 'haiku' | 'sonnet' | 'opus';
      thinking?: 'none' | 'think' | 'think-hard' | 'ultrathink';
    }>;
  };
  mcpServers?: Array<{
    name: string;
    command: string;
    args?: string[];
    env?: Record<string, string>;
  }>;
  paths?: {
    core?: string;
    extensions?: string;
    data?: string;
    cache?: string;
  };
}

export class ConfigManager {
  private config: ProjectConfig | null = null;
  private configPath: string;
  private schemaPath: string;
  private ajv: Ajv;

  constructor(configPath: string, schemaPath: string) {
    this.configPath = configPath;
    this.schemaPath = schemaPath;
    this.ajv = new Ajv({ allErrors: true });
  }

  /**
   * Load project configuration
   */
  loadConfig(): ProjectConfig {
    if (!fs.existsSync(this.configPath)) {
      throw new Error(`Config file not found: ${this.configPath}`);
    }

    // Read config
    const configContent = fs.readFileSync(this.configPath, 'utf-8');
    const config: ProjectConfig = JSON.parse(configContent);

    // Validate config
    const schemaFile = path.join(this.schemaPath, 'config-schema.json');
    const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf-8'));
    const validate = this.ajv.compile(schema);

    if (!validate(config)) {
      throw new Error(`Invalid config.json: ${JSON.stringify(validate.errors)}`);
    }

    this.config = config;
    return config;
  }

  /**
   * Get current configuration
   */
  getConfig(): ProjectConfig {
    if (!this.config) {
      return this.loadConfig();
    }
    return this.config;
  }

  /**
   * Get enabled extensions
   */
  getEnabledExtensions(): string[] {
    const config = this.getConfig();
    return config.extensions.filter((ext) => ext.enabled).map((ext) => ext.name);
  }

  /**
   * Check if extension is enabled
   */
  isExtensionEnabled(name: string): boolean {
    const config = this.getConfig();
    const extension = config.extensions.find((ext) => ext.name === name);
    return extension?.enabled ?? false;
  }

  /**
   * Get extension-specific configuration
   */
  getExtensionConfig(name: string): Record<string, any> | undefined {
    const config = this.getConfig();
    const extension = config.extensions.find((ext) => ext.name === name);
    return extension?.config;
  }

  /**
   * Get feature flags
   */
  getFeatures(): ProjectConfig['features'] {
    const config = this.getConfig();
    return config.features ?? {
      teaching: true,
      demo: true,
      workflows: true,
      mcp: true,
    };
  }

  /**
   * Check if feature is enabled
   */
  isFeatureEnabled(feature: keyof NonNullable<ProjectConfig['features']>): boolean {
    const features = this.getFeatures();
    return features[feature] ?? true;
  }

  /**
   * Get tier configuration
   */
  getTierConfig(): ProjectConfig['tier'] {
    const config = this.getConfig();
    return config.tier ?? { mode: 'balanced' };
  }

  /**
   * Get tier mode
   */
  getTierMode(): 'quick' | 'balanced' | 'full' {
    const tierConfig = this.getTierConfig();
    return tierConfig.mode ?? 'balanced';
  }

  /**
   * Get custom tier assignments
   */
  getCustomTiers(): {
    tier1: string[];
    tier2: string[];
    tier3: string[];
  } {
    const tierConfig = this.getTierConfig();
    return {
      tier1: tierConfig.customTiers?.tier1 ?? [],
      tier2: tierConfig.customTiers?.tier2 ?? [],
      tier3: tierConfig.customTiers?.tier3 ?? [],
    };
  }

  /**
   * Get performance settings
   */
  getPerformanceSettings(): ProjectConfig['performance'] {
    const config = this.getConfig();
    return config.performance ?? {
      caching: true,
      parallelLoading: true,
      lazyLoading: true,
    };
  }

  /**
   * Get cost settings
   */
  getCostSettings(): ProjectConfig['cost'] {
    const config = this.getConfig();
    return config.cost ?? {
      alertThreshold: 0.8,
    };
  }

  /**
   * Get budget limits
   */
  getBudget(): { daily?: number; monthly?: number } {
    const costSettings = this.getCostSettings();
    return costSettings.budget ?? {};
  }

  /**
   * Get model configuration
   */
  getModelConfig(): ProjectConfig['model'] {
    const config = this.getConfig();
    return config.model ?? {
      default: 'sonnet',
      rules: [],
    };
  }

  /**
   * Get default model
   */
  getDefaultModel(): 'haiku' | 'sonnet' | 'opus' {
    const modelConfig = this.getModelConfig();
    return modelConfig.default ?? 'sonnet';
  }

  /**
   * Get model for task type
   */
  getModelForTaskType(taskType: string): {
    model: 'haiku' | 'sonnet' | 'opus';
    thinking?: 'none' | 'think' | 'think-hard' | 'ultrathink';
  } {
    const modelConfig = this.getModelConfig();
    const rule = modelConfig.rules?.find((r) => r.taskType === taskType);

    if (rule) {
      return {
        model: rule.model,
        thinking: rule.thinking,
      };
    }

    return {
      model: this.getDefaultModel(),
    };
  }

  /**
   * Get MCP servers
   */
  getMCPServers(): ProjectConfig['mcpServers'] {
    const config = this.getConfig();
    return config.mcpServers ?? [];
  }

  /**
   * Get paths configuration
   */
  getPaths(): ProjectConfig['paths'] {
    const config = this.getConfig();
    return config.paths ?? {};
  }

  /**
   * Get resolved path
   */
  getPath(pathType: 'core' | 'extensions' | 'data' | 'cache', defaultPath: string): string {
    const paths = this.getPaths();
    return paths[pathType] ?? defaultPath;
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<ProjectConfig>): void {
    if (!this.config) {
      this.loadConfig();
    }

    this.config = {
      ...this.config!,
      ...updates,
    };
  }

  /**
   * Save configuration
   */
  saveConfig(): void {
    if (!this.config) {
      throw new Error('No configuration loaded');
    }

    // Validate before saving
    const schemaFile = path.join(this.schemaPath, 'config-schema.json');
    const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf-8'));
    const validate = this.ajv.compile(schema);

    if (!validate(this.config)) {
      throw new Error(`Invalid configuration: ${JSON.stringify(validate.errors)}`);
    }

    // Write to file
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
  }

  /**
   * Enable extension
   */
  enableExtension(name: string): void {
    const config = this.getConfig();
    const extension = config.extensions.find((ext) => ext.name === name);

    if (extension) {
      extension.enabled = true;
    } else {
      config.extensions.push({ name, enabled: true });
    }

    this.updateConfig(config);
  }

  /**
   * Disable extension
   */
  disableExtension(name: string): void {
    const config = this.getConfig();
    const extension = config.extensions.find((ext) => ext.name === name);

    if (extension) {
      extension.enabled = false;
      this.updateConfig(config);
    }
  }

  /**
   * Set extension configuration
   */
  setExtensionConfig(name: string, extensionConfig: Record<string, any>): void {
    const config = this.getConfig();
    const extension = config.extensions.find((ext) => ext.name === name);

    if (extension) {
      extension.config = extensionConfig;
      this.updateConfig(config);
    }
  }

  /**
   * Get configuration summary
   */
  getSummary(): {
    project: string;
    version: string;
    enabledExtensions: number;
    totalExtensions: number;
    tierMode: string;
    defaultModel: string;
    features: string[];
  } {
    const config = this.getConfig();
    const enabledExtensions = this.getEnabledExtensions();
    const features = this.getFeatures();
    const enabledFeatures = Object.entries(features)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name);

    return {
      project: config.project.name,
      version: config.project.version,
      enabledExtensions: enabledExtensions.length,
      totalExtensions: config.extensions.length,
      tierMode: this.getTierMode(),
      defaultModel: this.getDefaultModel(),
      features: enabledFeatures,
    };
  }

  /**
   * Validate configuration consistency
   */
  validateConsistency(): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    const config = this.getConfig();

    // Check for duplicate extensions
    const extensionNames = config.extensions.map((ext) => ext.name);
    const duplicates = extensionNames.filter(
      (name, index) => extensionNames.indexOf(name) !== index
    );
    if (duplicates.length > 0) {
      errors.push(`Duplicate extensions: ${duplicates.join(', ')}`);
    }

    // Check budget consistency
    const budget = this.getBudget();
    if (budget.daily && budget.monthly && budget.daily * 30 > budget.monthly) {
      warnings.push('Daily budget * 30 exceeds monthly budget');
    }

    // Check tier mode consistency
    const tierMode = this.getTierMode();
    const customTiers = this.getCustomTiers();
    if (tierMode !== 'balanced' && customTiers.tier1.length === 0) {
      warnings.push(`Tier mode is ${tierMode} but no custom tier1 components defined`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

// Singleton instance
let configManagerInstance: ConfigManager | null = null;

/**
 * Initialize the config manager
 */
export function initializeConfigManager(configPath: string, schemaPath: string): ConfigManager {
  if (!configManagerInstance) {
    configManagerInstance = new ConfigManager(configPath, schemaPath);
  }
  return configManagerInstance;
}

/**
 * Get the config manager instance
 */
export function getConfigManager(): ConfigManager {
  if (!configManagerInstance) {
    throw new Error('ConfigManager not initialized. Call initializeConfigManager first.');
  }
  return configManagerInstance;
}
