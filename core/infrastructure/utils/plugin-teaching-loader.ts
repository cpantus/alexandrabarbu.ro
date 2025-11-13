#!/usr/bin/env -S npx tsx

/**
 * Plugin Teaching Loader
 *
 * Loads teaching modules from plugins that have extended capabilities.
 * Teaching modules are interactive lessons with associated datasets.
 *
 * @version 1.0
 * @since 2025-11-10
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// ============================================================================
// TYPES
// ============================================================================

export interface TeachingModule {
  name: string;
  level: number;
  lesson: number;
  title: string;
  filePath: string;
  content: string;
  datasetPaths: string[];
  pluginName: string;
}

export interface PluginManifest {
  name: string;
  version: string;
  teaching?: string[];
  extensions?: {
    teaching?: {
      modules: number;
      datasets: boolean;
      datasetPath: string;
    };
  };
}

export interface TeachingIndex {
  version: string;
  lastUpdated: string;
  totalModules: number;
  modules: Record<string, {
    level: number;
    lesson: number;
    title: string;
    filePath: string;
    datasetPaths: string[];
    source: 'core' | 'plugin';
    pluginName?: string;
  }>;
}

// ============================================================================
// TEACHING MODULE LOADING
// ============================================================================

/**
 * Load teaching modules from a plugin directory
 *
 * @param pluginPath - Absolute path to plugin root directory
 * @param manifest - Plugin manifest from plugin.json
 * @returns Array of loaded teaching modules
 */
export async function loadTeaching(
  pluginPath: string,
  manifest: PluginManifest
): Promise<TeachingModule[]> {
  if (!manifest.teaching || manifest.teaching.length === 0) {
    console.log(`[plugin-teaching-loader] No teaching modules defined in plugin: ${manifest.name}`);
    return [];
  }

  console.log(`[plugin-teaching-loader] Loading teaching modules from plugin: ${manifest.name}`);

  const loadedModules: TeachingModule[] = [];

  for (const teachingGlob of manifest.teaching) {
    const fullGlob = path.join(pluginPath, teachingGlob);
    const files = await glob(fullGlob);

    console.log(`[plugin-teaching-loader] Found ${files.length} teaching module files matching: ${teachingGlob}`);

    for (const file of files) {
      try {
        const module = await loadTeachingModule(file, manifest.name, pluginPath, manifest);
        if (module) {
          loadedModules.push(module);
        }
      } catch (error) {
        console.error(`[plugin-teaching-loader] Error loading teaching module ${file}:`, error);
      }
    }
  }

  console.log(`[plugin-teaching-loader] Loaded ${loadedModules.length} teaching modules from plugin: ${manifest.name}`);

  return loadedModules;
}

/**
 * Load a single teaching module file and extract metadata
 *
 * @param filePath - Absolute path to teaching module markdown file
 * @param pluginName - Name of the plugin
 * @param pluginPath - Plugin root path
 * @param manifest - Plugin manifest
 * @returns Loaded teaching module
 */
async function loadTeachingModule(
  filePath: string,
  pluginName: string,
  pluginPath: string,
  manifest: PluginManifest
): Promise<TeachingModule | null> {
  if (!fs.existsSync(filePath)) {
    console.error(`[plugin-teaching-loader] Teaching module file not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.md');

  // Parse module name to extract level and lesson
  // Expected format: lesson-<level>-<lesson>.md or <level>-<lesson>.md
  const match = fileName.match(/(?:lesson-)?(\d+)-(\d+)/);
  let level = 1;
  let lesson = 1;

  if (match) {
    level = parseInt(match[1]);
    lesson = parseInt(match[2]);
  }

  // Extract title from content
  const title = extractTitle(content);

  // Find associated datasets
  const datasetPaths = findDatasets(pluginPath, manifest, level, lesson);

  return {
    name: fileName,
    level,
    lesson,
    title,
    filePath,
    content,
    datasetPaths,
    pluginName
  };
}

/**
 * Extract title from teaching module content
 */
function extractTitle(content: string): string {
  // Try to get from first heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  // Try to get from YAML frontmatter
  const yamlMatch = content.match(/^---\n([\s\S]+?)\n---/);
  if (yamlMatch) {
    const titleYamlMatch = yamlMatch[1].match(/title:\s*(.+)$/m);
    if (titleYamlMatch) {
      return titleYamlMatch[1].trim();
    }
  }

  return 'Untitled Lesson';
}

/**
 * Find dataset files associated with a teaching module
 */
function findDatasets(
  pluginPath: string,
  manifest: PluginManifest,
  level: number,
  lesson: number
): string[] {
  const datasets: string[] = [];

  if (!manifest.extensions?.teaching?.datasets) {
    return datasets;
  }

  const datasetPath = manifest.extensions.teaching.datasetPath || 'teaching/datasets';
  const datasetDir = path.join(pluginPath, datasetPath);

  if (!fs.existsSync(datasetDir)) {
    return datasets;
  }

  // Look for datasets matching level-lesson pattern
  const patterns = [
    `${level}-${lesson}*.csv`,
    `${level}-${lesson}*.json`,
    `lesson-${level}-${lesson}*.csv`,
    `lesson-${level}-${lesson}*.json`
  ];

  for (const pattern of patterns) {
    const files = fs.readdirSync(datasetDir).filter(f => {
      const match = f.match(new RegExp(pattern.replace('*', '.*')));
      return match !== null;
    });

    files.forEach(file => {
      datasets.push(path.join(datasetDir, file));
    });
  }

  return datasets;
}

// ============================================================================
// TEACHING MODULE REGISTRATION
// ============================================================================

/**
 * Register teaching modules with the teaching system
 *
 * Updates teaching-index.json and creates /learn-X-Y commands
 *
 * @param modules - Array of loaded teaching modules
 * @param projectRoot - Project root directory
 */
export function registerTeaching(
  modules: TeachingModule[],
  projectRoot: string
): boolean {
  const indexPath = path.join(projectRoot, '.claude', 'teaching-index.json');

  try {
    // Load existing teaching index
    let index: TeachingIndex;

    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      index = JSON.parse(indexContent);
    } else {
      // Create new index if doesn't exist
      index = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        totalModules: 0,
        modules: {}
      };
    }

    // Add plugin teaching modules to index
    let addedCount = 0;

    for (const module of modules) {
      const key = `${module.level}-${module.lesson}`;

      if (!index.modules[key]) {
        index.modules[key] = {
          level: module.level,
          lesson: module.lesson,
          title: module.title,
          filePath: module.filePath,
          datasetPaths: module.datasetPaths,
          source: 'plugin',
          pluginName: module.pluginName
        };
        addedCount++;
      } else {
        console.warn(`[plugin-teaching-loader] Teaching module already exists: ${key}, skipping`);
      }
    }

    // Update index metadata
    index.totalModules = Object.keys(index.modules).length;
    index.lastUpdated = new Date().toISOString();

    // Write updated index
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');

    console.log(`[plugin-teaching-loader] Registered ${addedCount} new teaching modules`);
    console.log(`[plugin-teaching-loader] Total teaching modules in index: ${index.totalModules}`);

    // Create command files for each module
    createTeachingCommands(modules, projectRoot);

    return true;
  } catch (error) {
    console.error('[plugin-teaching-loader] Error registering teaching modules:', error);
    return false;
  }
}

/**
 * Create /learn-X-Y command files for teaching modules
 */
function createTeachingCommands(modules: TeachingModule[], projectRoot: string): void {
  const commandsDir = path.join(projectRoot, '.claude', 'commands');

  if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir, { recursive: true });
  }

  for (const module of modules) {
    const commandName = `learn-${module.level}-${module.lesson}.md`;
    const commandPath = path.join(commandsDir, commandName);

    // Only create if doesn't already exist
    if (!fs.existsSync(commandPath)) {
      const commandContent = generateTeachingCommand(module);
      fs.writeFileSync(commandPath, commandContent, 'utf-8');
      console.log(`[plugin-teaching-loader] Created command: ${commandName}`);
    }
  }
}

/**
 * Generate command content for a teaching module
 */
function generateTeachingCommand(module: TeachingModule): string {
  return `# 📚 Learn ${module.level}.${module.lesson}: ${module.title}

**Category:** Teaching
**Part of:** Interactive Marketing Education (Level ${module.level})

---

## What This Does

Loads and presents teaching module ${module.level}.${module.lesson}: "${module.title}"

This is part of the progressive marketing education curriculum that teaches marketing concepts through interactive lessons${module.datasetPaths.length > 0 ? ' with real datasets' : ''}.

---

## Module Content

Load the teaching module:

\`\`\`
@${module.filePath}
\`\`\`

${module.datasetPaths.length > 0 ? `\n## Associated Datasets\n\n${module.datasetPaths.map(p => `- @${p}`).join('\n')}\n` : ''}

---

## Instructions

1. Read and understand the lesson content
2. ${module.datasetPaths.length > 0 ? 'Review the provided datasets\n3. ' : ''}Complete any exercises or examples
4. Ask questions if anything is unclear
5. Move to next lesson when ready: \`/learn-${module.level}-${module.lesson + 1}\`

---

**Command Version:** 1.0
**Generated by:** Plugin Teaching Loader
**Source Plugin:** ${module.pluginName}
`;
}

/**
 * Unregister teaching modules from a specific plugin
 *
 * Removes plugin teaching modules from teaching-index.json and command files
 *
 * @param pluginName - Name of the plugin
 * @param projectRoot - Project root directory
 */
export function unregisterTeaching(pluginName: string, projectRoot: string): boolean {
  const indexPath = path.join(projectRoot, '.claude', 'teaching-index.json');

  try {
    if (!fs.existsSync(indexPath)) {
      console.warn('[plugin-teaching-loader] Teaching index not found, nothing to unregister');
      return false;
    }

    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: TeachingIndex = JSON.parse(indexContent);

    // Remove teaching modules from this plugin
    let removedCount = 0;
    const commandsDir = path.join(projectRoot, '.claude', 'commands');

    for (const [key, module] of Object.entries(index.modules)) {
      if (module.pluginName === pluginName) {
        // Remove command file
        const commandName = `learn-${module.level}-${module.lesson}.md`;
        const commandPath = path.join(commandsDir, commandName);
        if (fs.existsSync(commandPath)) {
          fs.unlinkSync(commandPath);
          console.log(`[plugin-teaching-loader] Removed command: ${commandName}`);
        }

        // Remove from index
        delete index.modules[key];
        removedCount++;
      }
    }

    // Update index metadata
    index.totalModules = Object.keys(index.modules).length;
    index.lastUpdated = new Date().toISOString();

    // Write updated index
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');

    console.log(`[plugin-teaching-loader] Unregistered ${removedCount} teaching modules from plugin: ${pluginName}`);

    return true;
  } catch (error) {
    console.error('[plugin-teaching-loader] Error unregistering teaching modules:', error);
    return false;
  }
}

// ============================================================================
// TEACHING MODULE COPYING
// ============================================================================

/**
 * Copy plugin teaching modules to project .claude/teaching directory
 *
 * @param modules - Array of loaded teaching modules
 * @param projectRoot - Project root directory
 */
export function copyTeachingToProject(modules: TeachingModule[], projectRoot: string): boolean {
  try {
    const teachingDir = path.join(projectRoot, '.claude', 'teaching');

    // Create teaching directory if doesn't exist
    if (!fs.existsSync(teachingDir)) {
      fs.mkdirSync(teachingDir, { recursive: true });
    }

    // Create datasets directory
    const datasetsDir = path.join(teachingDir, 'datasets');
    if (!fs.existsSync(datasetsDir)) {
      fs.mkdirSync(datasetsDir, { recursive: true });
    }

    for (const module of modules) {
      // Copy module file
      const targetFile = path.join(teachingDir, `${module.name}.md`);
      fs.writeFileSync(targetFile, module.content, 'utf-8');
      console.log(`[plugin-teaching-loader] Copied teaching module: ${module.name} → ${targetFile}`);

      // Copy dataset files
      for (const datasetPath of module.datasetPaths) {
        const datasetName = path.basename(datasetPath);
        const targetDataset = path.join(datasetsDir, datasetName);
        fs.copyFileSync(datasetPath, targetDataset);
        console.log(`[plugin-teaching-loader] Copied dataset: ${datasetName} → ${targetDataset}`);
      }
    }

    return true;
  } catch (error) {
    console.error('[plugin-teaching-loader] Error copying teaching modules:', error);
    return false;
  }
}

/**
 * Remove plugin teaching modules from project .claude/teaching directory
 *
 * @param pluginName - Name of the plugin
 * @param projectRoot - Project root directory
 */
export function removeTeachingFromProject(pluginName: string, projectRoot: string): boolean {
  try {
    const teachingDir = path.join(projectRoot, '.claude', 'teaching');
    const indexPath = path.join(projectRoot, '.claude', 'teaching-index.json');

    if (!fs.existsSync(indexPath)) {
      return false;
    }

    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: TeachingIndex = JSON.parse(indexContent);

    // Find and remove module files
    for (const [key, module] of Object.entries(index.modules)) {
      if (module.pluginName === pluginName) {
        const moduleFile = path.join(teachingDir, path.basename(module.filePath));
        if (fs.existsSync(moduleFile)) {
          fs.unlinkSync(moduleFile);
          console.log(`[plugin-teaching-loader] Removed teaching module file: ${moduleFile}`);
        }

        // Remove datasets
        for (const datasetPath of module.datasetPaths) {
          const datasetFile = path.join(teachingDir, 'datasets', path.basename(datasetPath));
          if (fs.existsSync(datasetFile)) {
            fs.unlinkSync(datasetFile);
            console.log(`[plugin-teaching-loader] Removed dataset file: ${datasetFile}`);
          }
        }
      }
    }

    return true;
  } catch (error) {
    console.error('[plugin-teaching-loader] Error removing teaching modules:', error);
    return false;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  loadTeaching,
  registerTeaching,
  unregisterTeaching,
  copyTeachingToProject,
  removeTeachingFromProject
};
