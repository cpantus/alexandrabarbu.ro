#!/usr/bin/env -S npx tsx

/**
 * Plugin Knowledge Loader
 *
 * Loads knowledge bases from plugins that have extended capabilities.
 * Knowledge bases include brand guidelines, personas, frameworks, and compliance docs.
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

export interface KnowledgeFile {
  name: string;
  category: string;
  filePath: string;
  content: string;
  format: 'markdown' | 'json' | 'yaml' | 'text';
  pluginName: string;
}

export interface PluginManifest {
  name: string;
  version: string;
  knowledge?: string[];
  extensions?: {
    knowledge?: Record<string, string>; // Category to path mapping
  };
}

export interface KnowledgeIndex {
  version: string;
  lastUpdated: string;
  totalFiles: number;
  byCategory: Record<string, number>;
  files: Record<string, {
    category: string;
    filePath: string;
    format: string;
    source: 'core' | 'plugin';
    pluginName?: string;
  }>;
}

// ============================================================================
// KNOWLEDGE LOADING
// ============================================================================

/**
 * Load knowledge files from a plugin directory
 *
 * @param pluginPath - Absolute path to plugin root directory
 * @param manifest - Plugin manifest from plugin.json
 * @returns Array of loaded knowledge files
 */
export async function loadKnowledge(
  pluginPath: string,
  manifest: PluginManifest
): Promise<KnowledgeFile[]> {
  if (!manifest.knowledge || manifest.knowledge.length === 0) {
    console.log(`[plugin-knowledge-loader] No knowledge files defined in plugin: ${manifest.name}`);
    return [];
  }

  console.log(`[plugin-knowledge-loader] Loading knowledge files from plugin: ${manifest.name}`);

  const loadedFiles: KnowledgeFile[] = [];

  for (const knowledgeGlob of manifest.knowledge) {
    const fullGlob = path.join(pluginPath, knowledgeGlob);
    const files = await glob(fullGlob);

    console.log(`[plugin-knowledge-loader] Found ${files.length} knowledge files matching: ${knowledgeGlob}`);

    for (const file of files) {
      try {
        const knowledgeFile = await loadKnowledgeFile(file, manifest.name, pluginPath, manifest);
        if (knowledgeFile) {
          loadedFiles.push(knowledgeFile);
        }
      } catch (error) {
        console.error(`[plugin-knowledge-loader] Error loading knowledge file ${file}:`, error);
      }
    }
  }

  console.log(`[plugin-knowledge-loader] Loaded ${loadedFiles.length} knowledge files from plugin: ${manifest.name}`);

  return loadedFiles;
}

/**
 * Load a single knowledge file and extract metadata
 *
 * @param filePath - Absolute path to knowledge file
 * @param pluginName - Name of the plugin
 * @param pluginPath - Plugin root path
 * @param manifest - Plugin manifest
 * @returns Loaded knowledge file
 */
async function loadKnowledgeFile(
  filePath: string,
  pluginName: string,
  pluginPath: string,
  manifest: PluginManifest
): Promise<KnowledgeFile | null> {
  if (!fs.existsSync(filePath)) {
    console.error(`[plugin-knowledge-loader] Knowledge file not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const fileExt = path.extname(filePath);

  // Determine format
  const format = determineFormat(fileExt);

  // Determine category from directory structure or manifest
  const category = determineCategory(filePath, pluginPath, manifest);

  return {
    name: fileName,
    category,
    filePath,
    content,
    format,
    pluginName
  };
}

/**
 * Determine file format from extension
 */
function determineFormat(extension: string): 'markdown' | 'json' | 'yaml' | 'text' {
  const ext = extension.toLowerCase();

  if (['.md', '.markdown'].includes(ext)) return 'markdown';
  if (['.json'].includes(ext)) return 'json';
  if (['.yaml', '.yml'].includes(ext)) return 'yaml';
  return 'text';
}

/**
 * Determine knowledge category from file path or manifest
 */
function determineCategory(
  filePath: string,
  pluginPath: string,
  manifest: PluginManifest
): string {
  const relativePath = path.relative(pluginPath, filePath);

  // Check if path matches any category in manifest
  if (manifest.extensions?.knowledge) {
    for (const [category, categoryPath] of Object.entries(manifest.extensions.knowledge)) {
      if (relativePath.startsWith(categoryPath)) {
        return category;
      }
    }
  }

  // Extract from directory structure
  // Expected: knowledge/category/file.md
  const parts = relativePath.split(path.sep);
  const knowledgeIndex = parts.findIndex(p => p === 'knowledge');

  if (knowledgeIndex >= 0 && knowledgeIndex < parts.length - 1) {
    return parts[knowledgeIndex + 1];
  }

  return 'general';
}

// ============================================================================
// KNOWLEDGE REGISTRATION
// ============================================================================

/**
 * Register knowledge files with the knowledge system
 *
 * Updates knowledge-index.json to include plugin knowledge
 *
 * @param files - Array of loaded knowledge files
 * @param projectRoot - Project root directory
 */
export function registerKnowledge(
  files: KnowledgeFile[],
  projectRoot: string
): boolean {
  const indexPath = path.join(projectRoot, '.claude', 'knowledge-index.json');

  try {
    // Load existing knowledge index
    let index: KnowledgeIndex;

    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      index = JSON.parse(indexContent);
    } else {
      // Create new index if doesn't exist
      index = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        totalFiles: 0,
        byCategory: {},
        files: {}
      };
    }

    // Add plugin knowledge files to index
    let addedCount = 0;

    for (const file of files) {
      if (!index.files[file.name]) {
        index.files[file.name] = {
          category: file.category,
          filePath: file.filePath,
          format: file.format,
          source: 'plugin',
          pluginName: file.pluginName
        };

        // Update category count
        index.byCategory[file.category] = (index.byCategory[file.category] || 0) + 1;

        addedCount++;
      } else {
        console.warn(`[plugin-knowledge-loader] Knowledge file already exists: ${file.name}, skipping`);
      }
    }

    // Update index metadata
    index.totalFiles = Object.keys(index.files).length;
    index.lastUpdated = new Date().toISOString();

    // Write updated index
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');

    console.log(`[plugin-knowledge-loader] Registered ${addedCount} new knowledge files`);
    console.log(`[plugin-knowledge-loader] Total knowledge files in index: ${index.totalFiles}`);
    console.log(`[plugin-knowledge-loader] By category:`, index.byCategory);

    return true;
  } catch (error) {
    console.error('[plugin-knowledge-loader] Error registering knowledge files:', error);
    return false;
  }
}

/**
 * Unregister knowledge files from a specific plugin
 *
 * Removes plugin knowledge files from knowledge-index.json
 *
 * @param pluginName - Name of the plugin
 * @param projectRoot - Project root directory
 */
export function unregisterKnowledge(pluginName: string, projectRoot: string): boolean {
  const indexPath = path.join(projectRoot, '.claude', 'knowledge-index.json');

  try {
    if (!fs.existsSync(indexPath)) {
      console.warn('[plugin-knowledge-loader] Knowledge index not found, nothing to unregister');
      return false;
    }

    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: KnowledgeIndex = JSON.parse(indexContent);

    // Remove knowledge files from this plugin
    let removedCount = 0;

    for (const [name, file] of Object.entries(index.files)) {
      if (file.pluginName === pluginName) {
        // Update category count
        index.byCategory[file.category] = Math.max(0, (index.byCategory[file.category] || 1) - 1);
        if (index.byCategory[file.category] === 0) {
          delete index.byCategory[file.category];
        }

        delete index.files[name];
        removedCount++;
      }
    }

    // Update index metadata
    index.totalFiles = Object.keys(index.files).length;
    index.lastUpdated = new Date().toISOString();

    // Write updated index
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');

    console.log(`[plugin-knowledge-loader] Unregistered ${removedCount} knowledge files from plugin: ${pluginName}`);

    return true;
  } catch (error) {
    console.error('[plugin-knowledge-loader] Error unregistering knowledge files:', error);
    return false;
  }
}

// ============================================================================
// KNOWLEDGE COPYING
// ============================================================================

/**
 * Copy plugin knowledge files to project .claude/knowledge directory
 *
 * @param files - Array of loaded knowledge files
 * @param projectRoot - Project root directory
 */
export function copyKnowledgeToProject(files: KnowledgeFile[], projectRoot: string): boolean {
  try {
    const knowledgeDir = path.join(projectRoot, '.claude', 'knowledge');

    // Create knowledge directory if doesn't exist
    if (!fs.existsSync(knowledgeDir)) {
      fs.mkdirSync(knowledgeDir, { recursive: true });
    }

    for (const file of files) {
      // Create category directory
      const categoryDir = path.join(knowledgeDir, file.category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      // Copy file
      const targetFile = path.join(categoryDir, file.name);
      fs.writeFileSync(targetFile, file.content, 'utf-8');

      console.log(`[plugin-knowledge-loader] Copied knowledge file: ${file.name} → ${targetFile}`);
    }

    return true;
  } catch (error) {
    console.error('[plugin-knowledge-loader] Error copying knowledge files:', error);
    return false;
  }
}

/**
 * Remove plugin knowledge files from project .claude/knowledge directory
 *
 * @param pluginName - Name of the plugin
 * @param projectRoot - Project root directory
 */
export function removeKnowledgeFromProject(pluginName: string, projectRoot: string): boolean {
  try {
    const knowledgeDir = path.join(projectRoot, '.claude', 'knowledge');
    const indexPath = path.join(projectRoot, '.claude', 'knowledge-index.json');

    if (!fs.existsSync(indexPath)) {
      return false;
    }

    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: KnowledgeIndex = JSON.parse(indexContent);

    // Find and remove knowledge files
    for (const [name, file] of Object.entries(index.files)) {
      if (file.pluginName === pluginName) {
        const knowledgeFile = path.join(knowledgeDir, file.category, name);
        if (fs.existsSync(knowledgeFile)) {
          fs.unlinkSync(knowledgeFile);
          console.log(`[plugin-knowledge-loader] Removed knowledge file: ${knowledgeFile}`);
        }
      }
    }

    return true;
  } catch (error) {
    console.error('[plugin-knowledge-loader] Error removing knowledge files:', error);
    return false;
  }
}

// ============================================================================
// KNOWLEDGE RETRIEVAL
// ============================================================================

/**
 * Get knowledge file by name
 *
 * @param fileName - Name of the knowledge file
 * @param projectRoot - Project root directory
 * @returns Knowledge file content or null
 */
export function getKnowledgeFile(fileName: string, projectRoot: string): string | null {
  const indexPath = path.join(projectRoot, '.claude', 'knowledge-index.json');

  if (!fs.existsSync(indexPath)) {
    return null;
  }

  try {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: KnowledgeIndex = JSON.parse(indexContent);

    const file = index.files[fileName];
    if (!file) {
      return null;
    }

    // Try to read from indexed path
    if (fs.existsSync(file.filePath)) {
      return fs.readFileSync(file.filePath, 'utf-8');
    }

    // Try to read from project knowledge directory
    const projectPath = path.join(projectRoot, '.claude', 'knowledge', file.category, fileName);
    if (fs.existsSync(projectPath)) {
      return fs.readFileSync(projectPath, 'utf-8');
    }

    return null;
  } catch (error) {
    console.error('[plugin-knowledge-loader] Error retrieving knowledge file:', error);
    return null;
  }
}

/**
 * Get all knowledge files in a category
 *
 * @param category - Knowledge category
 * @param projectRoot - Project root directory
 * @returns Array of knowledge file names
 */
export function getKnowledgeByCategory(category: string, projectRoot: string): string[] {
  const indexPath = path.join(projectRoot, '.claude', 'knowledge-index.json');

  if (!fs.existsSync(indexPath)) {
    return [];
  }

  try {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: KnowledgeIndex = JSON.parse(indexContent);

    return Object.entries(index.files)
      .filter(([_, file]) => file.category === category)
      .map(([name, _]) => name);
  } catch (error) {
    console.error('[plugin-knowledge-loader] Error retrieving knowledge by category:', error);
    return [];
  }
}

/**
 * Search knowledge files by keyword
 *
 * @param keyword - Search keyword
 * @param projectRoot - Project root directory
 * @returns Array of matching knowledge file names
 */
export function searchKnowledge(keyword: string, projectRoot: string): string[] {
  const indexPath = path.join(projectRoot, '.claude', 'knowledge-index.json');

  if (!fs.existsSync(indexPath)) {
    return [];
  }

  try {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: KnowledgeIndex = JSON.parse(indexContent);

    const keywordLower = keyword.toLowerCase();
    const matches: string[] = [];

    for (const [name, file] of Object.entries(index.files)) {
      // Check if keyword matches filename
      if (name.toLowerCase().includes(keywordLower)) {
        matches.push(name);
        continue;
      }

      // Check if keyword matches category
      if (file.category.toLowerCase().includes(keywordLower)) {
        matches.push(name);
        continue;
      }

      // Check if keyword matches content (for small files)
      try {
        const content = getKnowledgeFile(name, projectRoot);
        if (content && content.toLowerCase().includes(keywordLower)) {
          matches.push(name);
        }
      } catch (error) {
        // Skip if can't read file
      }
    }

    return matches;
  } catch (error) {
    console.error('[plugin-knowledge-loader] Error searching knowledge:', error);
    return [];
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  loadKnowledge,
  registerKnowledge,
  unregisterKnowledge,
  copyKnowledgeToProject,
  removeKnowledgeFromProject,
  getKnowledgeFile,
  getKnowledgeByCategory,
  searchKnowledge
};
