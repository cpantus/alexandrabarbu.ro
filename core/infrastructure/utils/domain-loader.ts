/**
 * Domain Loader - Extension Auto-Discovery and Registration
 *
 * Discovers extensions via domain.json manifests, validates them against schemas,
 * and registers components for auto-activation.
 *
 * @version 1.0.0
 */

import * as fs from 'fs';
import * as path from 'path';
import Ajv from 'ajv';

// Types
export interface DomainManifest {
  name: string;
  version: string;
  type: 'extension' | 'core';
  description: string;
  author?: string;
  license?: string;
  components: {
    agents?: ComponentDefinition[];
    skills?: ComponentDefinition[];
    patterns?: ComponentDefinition[];
    commands?: ComponentDefinition[];
    hooks?: ComponentDefinition[];
  };
  features?: {
    teaching?: boolean;
    demo?: boolean;
    workflows?: boolean;
    mcp?: boolean;
  };
  dependencies?: {
    core?: string;
    extensions?: Array<{ name: string; version: string }>;
  };
  tier?: {
    tier1?: string[];
    tier2?: string[];
    tier3?: string[];
  };
  mcpServers?: MCPServerConfig[];
}

export interface ComponentDefinition {
  name: string;
  path: string;
  description?: string;
  tier?: 'tier1' | 'tier2' | 'tier3';
  category?: string;
  triggers?: string[];
  model?: 'haiku' | 'sonnet' | 'opus';
  event?: string;
}

export interface MCPServerConfig {
  name: string;
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface LoadedExtension {
  manifest: DomainManifest;
  basePath: string;
  enabled: boolean;
}

export interface ExtensionRegistry {
  extensions: Map<string, LoadedExtension>;
  components: {
    agents: Map<string, ComponentDefinition & { extensionName: string; fullPath: string }>;
    skills: Map<string, ComponentDefinition & { extensionName: string; fullPath: string }>;
    patterns: Map<string, ComponentDefinition & { extensionName: string; fullPath: string }>;
    commands: Map<string, ComponentDefinition & { extensionName: string; fullPath: string }>;
    hooks: Map<string, ComponentDefinition & { extensionName: string; fullPath: string }>;
  };
  mcpServers: MCPServerConfig[];
}

export class DomainLoader {
  private registry: ExtensionRegistry;
  private ajv: Ajv;
  private extensionsPath: string;
  private coreSchemaPath: string;

  constructor(extensionsPath: string, coreSchemaPath: string) {
    this.extensionsPath = extensionsPath;
    this.coreSchemaPath = coreSchemaPath;
    this.ajv = new Ajv({ allErrors: true });

    this.registry = {
      extensions: new Map(),
      components: {
        agents: new Map(),
        skills: new Map(),
        patterns: new Map(),
        commands: new Map(),
        hooks: new Map(),
      },
      mcpServers: [],
    };
  }

  /**
   * Discover and load all extensions
   */
  async discoverExtensions(): Promise<void> {
    if (!fs.existsSync(this.extensionsPath)) {
      console.warn(`Extensions directory not found: ${this.extensionsPath}`);
      return;
    }

    const entries = fs.readdirSync(this.extensionsPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('_')) {
        continue; // Skip files and template directories
      }

      const extensionPath = path.join(this.extensionsPath, entry.name);
      const manifestPath = path.join(extensionPath, 'domain.json');

      if (fs.existsSync(manifestPath)) {
        try {
          await this.loadExtension(entry.name, extensionPath);
        } catch (error) {
          console.error(`Failed to load extension ${entry.name}:`, error);
        }
      }
    }
  }

  /**
   * Load a specific extension
   */
  async loadExtension(name: string, extensionPath: string): Promise<void> {
    const manifestPath = path.join(extensionPath, 'domain.json');

    // Read manifest
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest: DomainManifest = JSON.parse(manifestContent);

    // Validate manifest
    const schemaPath = path.join(this.coreSchemaPath, 'domain-schema.json');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    const validate = this.ajv.compile(schema);

    if (!validate(manifest)) {
      throw new Error(`Invalid domain.json for ${name}: ${JSON.stringify(validate.errors)}`);
    }

    // Validate dependencies
    this.validateDependencies(manifest);

    // Register extension
    this.registry.extensions.set(name, {
      manifest,
      basePath: extensionPath,
      enabled: true,
    });

    // Register components
    this.registerComponents(name, extensionPath, manifest);

    // Register MCP servers
    if (manifest.mcpServers) {
      this.registry.mcpServers.push(...manifest.mcpServers);
    }

    console.log(`✓ Loaded extension: ${name} v${manifest.version}`);
  }

  /**
   * Register components from extension
   */
  private registerComponents(
    extensionName: string,
    basePath: string,
    manifest: DomainManifest
  ): void {
    // Register agents
    if (manifest.components.agents) {
      for (const agent of manifest.components.agents) {
        const fullPath = path.join(basePath, agent.path);
        this.registry.components.agents.set(agent.name, {
          ...agent,
          extensionName,
          fullPath,
        });
      }
    }

    // Register skills
    if (manifest.components.skills) {
      for (const skill of manifest.components.skills) {
        const fullPath = path.join(basePath, skill.path);
        this.registry.components.skills.set(skill.name, {
          ...skill,
          extensionName,
          fullPath,
        });
      }
    }

    // Register patterns
    if (manifest.components.patterns) {
      for (const pattern of manifest.components.patterns) {
        const fullPath = path.join(basePath, pattern.path);
        this.registry.components.patterns.set(pattern.name, {
          ...pattern,
          extensionName,
          fullPath,
        });
      }
    }

    // Register commands
    if (manifest.components.commands) {
      for (const command of manifest.components.commands) {
        const fullPath = path.join(basePath, command.path);
        this.registry.components.commands.set(command.name, {
          ...command,
          extensionName,
          fullPath,
        });
      }
    }

    // Register hooks
    if (manifest.components.hooks) {
      for (const hook of manifest.components.hooks) {
        const fullPath = path.join(basePath, hook.path);
        this.registry.components.hooks.set(hook.name, {
          ...hook,
          extensionName,
          fullPath,
        });
      }
    }
  }

  /**
   * Validate extension dependencies
   */
  private validateDependencies(manifest: DomainManifest): void {
    if (!manifest.dependencies) {
      return;
    }

    // Check core version
    if (manifest.dependencies.core) {
      // TODO: Implement semver checking
      console.log(`Extension ${manifest.name} requires core ${manifest.dependencies.core}`);
    }

    // Check extension dependencies
    if (manifest.dependencies.extensions) {
      for (const dep of manifest.dependencies.extensions) {
        if (!this.registry.extensions.has(dep.name)) {
          console.warn(`Missing dependency: ${dep.name} (required by ${manifest.name})`);
        }
      }
    }
  }

  /**
   * Get all loaded extensions
   */
  getExtensions(): Map<string, LoadedExtension> {
    return this.registry.extensions;
  }

  /**
   * Get extension by name
   */
  getExtension(name: string): LoadedExtension | undefined {
    return this.registry.extensions.get(name);
  }

  /**
   * Get all registered components of a type
   */
  getComponents<T extends keyof ExtensionRegistry['components']>(
    type: T
  ): Map<string, ComponentDefinition & { extensionName: string; fullPath: string }> {
    return this.registry.components[type];
  }

  /**
   * Get component by name and type
   */
  getComponent<T extends keyof ExtensionRegistry['components']>(
    type: T,
    name: string
  ): (ComponentDefinition & { extensionName: string; fullPath: string }) | undefined {
    return this.registry.components[type].get(name);
  }

  /**
   * Get components by tier
   */
  getComponentsByTier(tier: 'tier1' | 'tier2' | 'tier3'): ComponentDefinition[] {
    const components: ComponentDefinition[] = [];

    for (const [, agent] of this.registry.components.agents) {
      if (agent.tier === tier) components.push(agent);
    }
    for (const [, skill] of this.registry.components.skills) {
      if (skill.tier === tier) components.push(skill);
    }
    for (const [, pattern] of this.registry.components.patterns) {
      if (pattern.tier === tier) components.push(pattern);
    }

    return components;
  }

  /**
   * Get skills matching triggers
   */
  getSkillsByTriggers(userPrompt: string): Array<ComponentDefinition & { fullPath: string }> {
    const matchedSkills: Array<ComponentDefinition & { fullPath: string }> = [];
    const lowerPrompt = userPrompt.toLowerCase();

    for (const [, skill] of this.registry.components.skills) {
      if (skill.triggers) {
        for (const trigger of skill.triggers) {
          if (lowerPrompt.includes(trigger.toLowerCase())) {
            matchedSkills.push(skill);
            break;
          }
        }
      }
    }

    return matchedSkills;
  }

  /**
   * Get all MCP servers
   */
  getMCPServers(): MCPServerConfig[] {
    return this.registry.mcpServers;
  }

  /**
   * Get registry statistics
   */
  getStats(): {
    extensions: number;
    agents: number;
    skills: number;
    patterns: number;
    commands: number;
    hooks: number;
    mcpServers: number;
  } {
    return {
      extensions: this.registry.extensions.size,
      agents: this.registry.components.agents.size,
      skills: this.registry.components.skills.size,
      patterns: this.registry.components.patterns.size,
      commands: this.registry.components.commands.size,
      hooks: this.registry.components.hooks.size,
      mcpServers: this.registry.mcpServers.length,
    };
  }

  /**
   * Enable/disable extension
   */
  setExtensionEnabled(name: string, enabled: boolean): void {
    const extension = this.registry.extensions.get(name);
    if (extension) {
      extension.enabled = enabled;
    }
  }

  /**
   * Reload an extension
   */
  async reloadExtension(name: string): Promise<void> {
    const extension = this.registry.extensions.get(name);
    if (!extension) {
      throw new Error(`Extension not found: ${name}`);
    }

    // Remove old components
    this.unregisterExtensionComponents(name);

    // Reload extension
    await this.loadExtension(name, extension.basePath);
  }

  /**
   * Unregister all components from an extension
   */
  private unregisterExtensionComponents(extensionName: string): void {
    // Remove agents
    for (const [name, agent] of this.registry.components.agents) {
      if (agent.extensionName === extensionName) {
        this.registry.components.agents.delete(name);
      }
    }

    // Remove skills
    for (const [name, skill] of this.registry.components.skills) {
      if (skill.extensionName === extensionName) {
        this.registry.components.skills.delete(name);
      }
    }

    // Remove patterns
    for (const [name, pattern] of this.registry.components.patterns) {
      if (pattern.extensionName === extensionName) {
        this.registry.components.patterns.delete(name);
      }
    }

    // Remove commands
    for (const [name, command] of this.registry.components.commands) {
      if (command.extensionName === extensionName) {
        this.registry.components.commands.delete(name);
      }
    }

    // Remove hooks
    for (const [name, hook] of this.registry.components.hooks) {
      if (hook.extensionName === extensionName) {
        this.registry.components.hooks.delete(name);
      }
    }

    // Remove MCP servers (filter)
    this.registry.mcpServers = this.registry.mcpServers.filter(
      (server) => !server.name.startsWith(`${extensionName}:`)
    );
  }
}

// Singleton instance
let loaderInstance: DomainLoader | null = null;

/**
 * Initialize the domain loader
 */
export function initializeDomainLoader(
  extensionsPath: string,
  coreSchemaPath: string
): DomainLoader {
  if (!loaderInstance) {
    loaderInstance = new DomainLoader(extensionsPath, coreSchemaPath);
  }
  return loaderInstance;
}

/**
 * Get the domain loader instance
 */
export function getDomainLoader(): DomainLoader {
  if (!loaderInstance) {
    throw new Error('DomainLoader not initialized. Call initializeDomainLoader first.');
  }
  return loaderInstance;
}
