#!/usr/bin/env -S npx tsx

/**
 * Main Plugin Loader
 *
 * Orchestrates loading of all plugin components (standard + extended).
 * Integrates with Claude Code plugin system to load plugins with extended capabilities.
 *
 * Standard components (agents, commands, hooks, MCP) are loaded by Claude Code automatically.
 * This loader handles extended components: patterns, skills, teaching, knowledge.
 *
 * @version 1.0
 * @since 2025-11-10
 */

import * as fs from 'fs';
import * as path from 'path';
import * as PluginPatternLoader from './plugin-pattern-loader';
import * as PluginSkillLoader from './plugin-skill-loader';
import * as PluginTeachingLoader from './plugin-teaching-loader';
import * as PluginKnowledgeLoader from './plugin-knowledge-loader';

// ============================================================================
// TYPES
// ============================================================================

export interface PluginManifest {
  name: string;
  description: string;
  version: string;
  author: {
    name: string;
    email?: string;
    url?: string;
  };

  // Standard components (loaded by Claude Code)
  agents?: string[];
  commands?: string[];
  hooks?: string[];

  // Extended components (loaded by this system)
  patterns?: string[];
  skills?: string[];
  teaching?: string[];
  knowledge?: string[];

  // Extension configuration
  extensions?: {
    patterns?: {
      autoSuggest: boolean;
      categories: string[];
    };
    skills?: {
      autoActivate: boolean;
      triggers: string[];
    };
    teaching?: {
      modules: number;
      datasets: boolean;
      datasetPath: string;
    };
    knowledge?: Record<string, string>; // Category to path mapping
  };
}

export interface LoadResult {
  success: boolean;
  pluginName: string;
  componentsLoaded: {
    patterns: number;
    skills: number;
    teaching: number;
    knowledge: number;
  };
  errors: string[];
  warnings: string[];
}

// ============================================================================
// PLUGIN LOADING
// ============================================================================

/**
 * Load a plugin with all its components
 *
 * This is called after Claude Code has loaded the standard components.
 * It loads the extended components (patterns, skills, teaching, knowledge).
 *
 * @param pluginPath - Absolute path to plugin root directory
 * @param manifestOrPath - Plugin manifest object or path to plugin.json
 * @param projectRoot - Project root directory (defaults to current working directory)
 * @returns Load result with success status and component counts
 */
export async function loadPlugin(
  pluginPath: string,
  manifestOrPath: PluginManifest | string,
  projectRoot: string = process.cwd()
): Promise<LoadResult> {
  const result: LoadResult = {
    success: false,
    pluginName: '',
    componentsLoaded: {
      patterns: 0,
      skills: 0,
      teaching: 0,
      knowledge: 0
    },
    errors: [],
    warnings: []
  };

  try {
    // Load manifest
    const manifest = typeof manifestOrPath === 'string'
      ? loadManifest(manifestOrPath)
      : manifestOrPath;

    if (!manifest) {
      result.errors.push('Failed to load plugin.json manifest');
      return result;
    }

    result.pluginName = manifest.name;

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📦 Loading Plugin: ${manifest.name} v${manifest.version}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    // Check if plugin has extended components
    if (!hasExtendedComponents(manifest)) {
      console.log(`ℹ️  Plugin has no extended components (patterns, skills, teaching, knowledge)`);
      console.log(`   Standard components (agents, commands, hooks) loaded by Claude Code\n`);
      result.success = true;
      return result;
    }

    console.log(`🔧 Loading extended components...\n`);

    // Load patterns
    if (manifest.patterns && manifest.patterns.length > 0) {
      try {
        const patterns = await PluginPatternLoader.loadPatterns(pluginPath, manifest);

        if (patterns.length > 0) {
          // Register with pattern system
          PluginPatternLoader.registerPatterns(patterns, projectRoot, manifest.extensions?.patterns);

          // Copy to project
          PluginPatternLoader.copyPatternsToProject(patterns, projectRoot);

          result.componentsLoaded.patterns = patterns.length;
          console.log(`✅ Patterns loaded: ${patterns.length}`);
        }
      } catch (error) {
        const errorMsg = `Failed to load patterns: ${error}`;
        result.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    // Load skills
    if (manifest.skills && manifest.skills.length > 0) {
      try {
        const skills = await PluginSkillLoader.loadSkills(pluginPath, manifest);

        if (skills.length > 0) {
          // Register with skill system
          PluginSkillLoader.registerSkills(skills, projectRoot, manifest.extensions?.skills);

          // Copy to project
          PluginSkillLoader.copySkillsToProject(skills, projectRoot);

          result.componentsLoaded.skills = skills.length;
          console.log(`✅ Skills loaded: ${skills.length}`);
        }
      } catch (error) {
        const errorMsg = `Failed to load skills: ${error}`;
        result.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    // Load teaching modules
    if (manifest.teaching && manifest.teaching.length > 0) {
      try {
        const teaching = await PluginTeachingLoader.loadTeaching(pluginPath, manifest);

        if (teaching.length > 0) {
          // Register with teaching system
          PluginTeachingLoader.registerTeaching(teaching, projectRoot);

          // Copy to project
          PluginTeachingLoader.copyTeachingToProject(teaching, projectRoot);

          result.componentsLoaded.teaching = teaching.length;
          console.log(`✅ Teaching modules loaded: ${teaching.length}`);
        }
      } catch (error) {
        const errorMsg = `Failed to load teaching modules: ${error}`;
        result.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    // Load knowledge base
    if (manifest.knowledge && manifest.knowledge.length > 0) {
      try {
        const knowledge = await PluginKnowledgeLoader.loadKnowledge(pluginPath, manifest);

        if (knowledge.length > 0) {
          // Register with knowledge system
          PluginKnowledgeLoader.registerKnowledge(knowledge, projectRoot);

          // Copy to project
          PluginKnowledgeLoader.copyKnowledgeToProject(knowledge, projectRoot);

          result.componentsLoaded.knowledge = knowledge.length;
          console.log(`✅ Knowledge files loaded: ${knowledge.length}`);
        }
      } catch (error) {
        const errorMsg = `Failed to load knowledge files: ${error}`;
        result.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    // Summary
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📊 Plugin Load Summary: ${manifest.name}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`   Patterns:  ${result.componentsLoaded.patterns}`);
    console.log(`   Skills:    ${result.componentsLoaded.skills}`);
    console.log(`   Teaching:  ${result.componentsLoaded.teaching}`);
    console.log(`   Knowledge: ${result.componentsLoaded.knowledge}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    // Check for errors
    if (result.errors.length > 0) {
      console.error(`⚠️  Loaded with ${result.errors.length} error(s):\n`);
      result.errors.forEach(err => console.error(`   • ${err}`));
      result.success = false;
    } else {
      console.log(`✅ Plugin loaded successfully!\n`);
      result.success = true;
    }

    return result;

  } catch (error) {
    result.errors.push(`Unexpected error: ${error}`);
    console.error(`❌ Plugin loading failed: ${error}`);
    return result;
  }
}

/**
 * Unload a plugin and remove all its components
 *
 * @param pluginName - Name of the plugin to unload
 * @param projectRoot - Project root directory
 * @returns True if successful
 */
export function unloadPlugin(pluginName: string, projectRoot: string = process.cwd()): boolean {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🗑️  Unloading Plugin: ${pluginName}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  let success = true;

  try {
    // Unregister and remove patterns
    console.log(`Removing patterns...`);
    PluginPatternLoader.unregisterPatterns(pluginName, projectRoot);
    PluginPatternLoader.removePatternsFromProject(pluginName, projectRoot);

    // Unregister and remove skills
    console.log(`Removing skills...`);
    PluginSkillLoader.unregisterSkills(pluginName, projectRoot);
    PluginSkillLoader.removeSkillsFromProject(pluginName, projectRoot);

    // Unregister and remove teaching modules
    console.log(`Removing teaching modules...`);
    PluginTeachingLoader.unregisterTeaching(pluginName, projectRoot);
    PluginTeachingLoader.removeTeachingFromProject(pluginName, projectRoot);

    // Unregister and remove knowledge files
    console.log(`Removing knowledge files...`);
    PluginKnowledgeLoader.unregisterKnowledge(pluginName, projectRoot);
    PluginKnowledgeLoader.removeKnowledgeFromProject(pluginName, projectRoot);

    console.log(`\n✅ Plugin unloaded successfully!\n`);
  } catch (error) {
    console.error(`❌ Error unloading plugin: ${error}\n`);
    success = false;
  }

  return success;
}

// ============================================================================
// MANIFEST LOADING
// ============================================================================

/**
 * Load plugin manifest from plugin.json file
 *
 * @param manifestPath - Path to plugin.json
 * @returns Plugin manifest or null if failed
 */
function loadManifest(manifestPath: string): PluginManifest | null {
  try {
    if (!fs.existsSync(manifestPath)) {
      console.error(`Plugin manifest not found: ${manifestPath}`);
      return null;
    }

    const content = fs.readFileSync(manifestPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading plugin manifest: ${error}`);
    return null;
  }
}

/**
 * Check if plugin has extended components
 *
 * @param manifest - Plugin manifest
 * @returns True if plugin has any extended components
 */
function hasExtendedComponents(manifest: PluginManifest): boolean {
  return !!(
    (manifest.patterns && manifest.patterns.length > 0) ||
    (manifest.skills && manifest.skills.length > 0) ||
    (manifest.teaching && manifest.teaching.length > 0) ||
    (manifest.knowledge && manifest.knowledge.length > 0)
  );
}

// ============================================================================
// PLUGIN VALIDATION
// ============================================================================

/**
 * Validate plugin manifest structure
 *
 * @param manifest - Plugin manifest to validate
 * @returns Validation result with errors and warnings
 */
export function validateManifest(manifest: PluginManifest): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!manifest.name) {
    errors.push('Missing required field: name');
  }

  if (!manifest.version) {
    errors.push('Missing required field: version');
  }

  if (!manifest.description) {
    warnings.push('Missing recommended field: description');
  }

  if (!manifest.author) {
    warnings.push('Missing recommended field: author');
  }

  // Validate extended components configuration
  if (manifest.patterns && manifest.patterns.length > 0) {
    if (!manifest.extensions?.patterns) {
      warnings.push('Patterns defined but no extensions.patterns configuration');
    }
  }

  if (manifest.skills && manifest.skills.length > 0) {
    if (!manifest.extensions?.skills) {
      warnings.push('Skills defined but no extensions.skills configuration');
    }
  }

  if (manifest.teaching && manifest.teaching.length > 0) {
    if (!manifest.extensions?.teaching) {
      warnings.push('Teaching modules defined but no extensions.teaching configuration');
    }
  }

  if (manifest.knowledge && manifest.knowledge.length > 0) {
    if (!manifest.extensions?.knowledge) {
      warnings.push('Knowledge files defined but no extensions.knowledge configuration');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

/**
 * Main CLI entry point for testing and manual loading
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📦 Plugin Loader - Extended Component System

Usage:
  npx tsx plugin-loader.ts load <plugin-path> [project-root]
  npx tsx plugin-loader.ts unload <plugin-name> [project-root]
  npx tsx plugin-loader.ts validate <plugin-json-path>

Examples:
  npx tsx plugin-loader.ts load /path/to/marketing-plugin
  npx tsx plugin-loader.ts unload marketing
  npx tsx plugin-loader.ts validate /path/to/marketing-plugin/.claude-plugin/plugin.json
    `);
    process.exit(0);
  }

  const command = args[0];

  switch (command) {
    case 'load': {
      const pluginPath = args[1];
      const projectRoot = args[2] || process.cwd();

      if (!pluginPath) {
        console.error('❌ Error: Plugin path required');
        process.exit(1);
      }

      const manifestPath = path.join(pluginPath, '.claude-plugin', 'plugin.json');
      const result = await loadPlugin(pluginPath, manifestPath, projectRoot);

      process.exit(result.success ? 0 : 1);
      break;
    }

    case 'unload': {
      const pluginName = args[1];
      const projectRoot = args[2] || process.cwd();

      if (!pluginName) {
        console.error('❌ Error: Plugin name required');
        process.exit(1);
      }

      const success = unloadPlugin(pluginName, projectRoot);
      process.exit(success ? 0 : 1);
      break;
    }

    case 'validate': {
      const manifestPath = args[1];

      if (!manifestPath) {
        console.error('❌ Error: Manifest path required');
        process.exit(1);
      }

      const manifest = loadManifest(manifestPath);
      if (!manifest) {
        console.error('❌ Failed to load manifest');
        process.exit(1);
      }

      const validation = validateManifest(manifest);

      console.log(`\n📋 Manifest Validation: ${manifest.name}\n`);

      if (validation.errors.length > 0) {
        console.log(`❌ Errors:`);
        validation.errors.forEach(err => console.log(`   • ${err}`));
      }

      if (validation.warnings.length > 0) {
        console.log(`\n⚠️  Warnings:`);
        validation.warnings.forEach(warn => console.log(`   • ${warn}`));
      }

      if (validation.valid && validation.warnings.length === 0) {
        console.log(`✅ Manifest is valid!\n`);
      }

      process.exit(validation.valid ? 0 : 1);
      break;
    }

    default:
      console.error(`❌ Unknown command: ${command}`);
      process.exit(1);
  }
}

// Run CLI if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  loadPlugin,
  unloadPlugin,
  validateManifest
};
