#!/usr/bin/env -S npx tsx

/**
 * Plugin Pattern Loader
 *
 * Loads patterns from plugins that have extended capabilities.
 * Integrates with existing pattern-index.json and pattern-matcher systems.
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

export interface PatternMetadata {
  category: 'content' | 'strategy' | 'analysis' | 'optimization';
  complexity: 'simple' | 'medium' | 'complex';
  thinking: 'think' | 'think-hard' | 'ultrathink';
  estimatedTokens: number;
  dependencies: {
    skills: string[];
    knowledgeFiles: string[];
  };
  triggers: {
    keywords: string[];
    intentPatterns: string[];
    negativeKeywords?: string[];
  };
  avgExecutionTime: string;
  usageCount: number;
  description?: string;
  exampleArgs?: string;
  requiresMarketingMode?: boolean;
  minConfidence?: number;
  source?: 'core' | 'plugin';  // NEW: Track source
  pluginName?: string;          // NEW: Track which plugin
}

export interface PatternIndex {
  version: string;
  lastUpdated: string;
  totalPatterns: number;
  patterns: Record<string, PatternMetadata>;
}

export interface PluginManifest {
  name: string;
  version: string;
  patterns?: string[];
  extensions?: {
    patterns?: {
      autoSuggest: boolean;
      categories: string[];
    };
  };
}

export interface LoadedPattern {
  name: string;
  category: string;
  filePath: string;
  content: string;
  metadata: PatternMetadata;
}

// ============================================================================
// PATTERN LOADING
// ============================================================================

/**
 * Load patterns from a plugin directory
 *
 * @param pluginPath - Absolute path to plugin root directory
 * @param manifest - Plugin manifest from plugin.json
 * @returns Array of loaded patterns with metadata
 */
export async function loadPatterns(
  pluginPath: string,
  manifest: PluginManifest
): Promise<LoadedPattern[]> {
  if (!manifest.patterns || manifest.patterns.length === 0) {
    console.log(`[plugin-pattern-loader] No patterns defined in plugin: ${manifest.name}`);
    return [];
  }

  console.log(`[plugin-pattern-loader] Loading patterns from plugin: ${manifest.name}`);

  const loadedPatterns: LoadedPattern[] = [];

  for (const patternGlob of manifest.patterns) {
    const fullGlob = path.join(pluginPath, patternGlob);
    const files = await glob(fullGlob);

    console.log(`[plugin-pattern-loader] Found ${files.length} pattern files matching: ${patternGlob}`);

    for (const file of files) {
      try {
        const pattern = await loadPattern(file, manifest.name);
        if (pattern) {
          loadedPatterns.push(pattern);
        }
      } catch (error) {
        console.error(`[plugin-pattern-loader] Error loading pattern ${file}:`, error);
      }
    }
  }

  console.log(`[plugin-pattern-loader] Loaded ${loadedPatterns.length} patterns from plugin: ${manifest.name}`);

  return loadedPatterns;
}

/**
 * Load a single pattern file and extract metadata
 *
 * @param filePath - Absolute path to pattern markdown file
 * @param pluginName - Name of the plugin
 * @returns Loaded pattern with metadata
 */
async function loadPattern(filePath: string, pluginName: string): Promise<LoadedPattern | null> {
  if (!fs.existsSync(filePath)) {
    console.error(`[plugin-pattern-loader] Pattern file not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.md');

  // Extract category from directory structure
  // Expected: patterns/category/pattern-name.md or patterns/pattern-name.md
  const parts = filePath.split(path.sep);
  const patternsIndex = parts.findIndex(p => p === 'patterns');
  let category = 'content'; // default

  if (patternsIndex >= 0 && patternsIndex < parts.length - 1) {
    const potentialCategory = parts[patternsIndex + 1];
    if (['content', 'strategy', 'analysis', 'optimization'].includes(potentialCategory)) {
      category = potentialCategory;
    } else if (parts.length > patternsIndex + 2) {
      // File might be in subdirectory like patterns/output-templates/pattern.md
      // Use parent category if available
      category = 'content'; // fallback
    }
  }

  // Parse metadata from pattern content
  const metadata = parsePatternMetadata(content, category as any, pluginName);

  return {
    name: fileName,
    category,
    filePath,
    content,
    metadata
  };
}

/**
 * Parse pattern metadata from markdown content
 *
 * Extracts metadata from YAML frontmatter and markdown structure
 *
 * @param content - Pattern markdown content
 * @param category - Pattern category
 * @param pluginName - Plugin name
 * @returns Pattern metadata
 */
function parsePatternMetadata(
  content: string,
  category: 'content' | 'strategy' | 'analysis' | 'optimization',
  pluginName: string
): PatternMetadata {
  // Extract YAML frontmatter if present
  const yamlMatch = content.match(/^---\n([\s\S]+?)\n---/);
  let yamlData: any = {};

  if (yamlMatch) {
    try {
      // Simple YAML parser (basic key: value pairs)
      const yamlLines = yamlMatch[1].split('\n');
      yamlLines.forEach(line => {
        const match = line.match(/^([a-zA-Z_]+):\s*(.+)$/);
        if (match) {
          yamlData[match[1]] = match[2];
        }
      });
    } catch (error) {
      console.warn('[plugin-pattern-loader] Failed to parse YAML frontmatter:', error);
    }
  }

  // Extract trigger keywords from content
  const keywords = extractKeywords(content);
  const intentPatterns = extractIntentPatterns(content);

  // Determine complexity based on content length and structure
  const complexity = determineComplexity(content);

  // Determine thinking level based on complexity and category
  const thinking = determineThinkingLevel(complexity, category);

  // Estimate tokens (rough heuristic)
  const estimatedTokens = Math.ceil(content.length / 4);

  return {
    category,
    complexity,
    thinking,
    estimatedTokens,
    dependencies: {
      skills: extractDependencies(content, 'skills'),
      knowledgeFiles: extractDependencies(content, 'knowledge')
    },
    triggers: {
      keywords,
      intentPatterns,
      negativeKeywords: []
    },
    avgExecutionTime: estimateExecutionTime(complexity),
    usageCount: 0,
    description: yamlData.description || extractDescription(content),
    exampleArgs: yamlData.exampleArgs || '',
    requiresMarketingMode: category === 'content' || category === 'strategy',
    minConfidence: 1,
    source: 'plugin',
    pluginName
  };
}

// ============================================================================
// METADATA EXTRACTION HELPERS
// ============================================================================

/**
 * Extract trigger keywords from pattern content
 */
function extractKeywords(content: string): string[] {
  const keywords = new Set<string>();

  // Extract from common sections
  const sections = ['## PURPOSE', '## WHEN TO USE', '## INPUT'];
  sections.forEach(section => {
    const sectionContent = extractSection(content, section);
    if (sectionContent) {
      // Extract nouns and important terms (simple heuristic)
      const words = sectionContent.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
      words.forEach(word => {
        if (!isCommonWord(word)) {
          keywords.add(word);
        }
      });
    }
  });

  return Array.from(keywords).slice(0, 10); // Limit to top 10
}

/**
 * Extract intent patterns from pattern content
 */
function extractIntentPatterns(content: string): string[] {
  const patterns: string[] = [];

  // Look for trigger phrases in WHEN TO USE section
  const whenToUse = extractSection(content, '## WHEN TO USE');
  if (whenToUse) {
    // Extract bullet points that might indicate intent
    const bullets = whenToUse.match(/^[-*]\s+(.+)$/gm);
    if (bullets) {
      bullets.forEach(bullet => {
        const cleaned = bullet.replace(/^[-*]\s+/, '').toLowerCase();
        // Create regex pattern from bullet text
        const words = cleaned.split(/\s+/).filter(w => !isCommonWord(w));
        if (words.length > 1) {
          patterns.push(words.join('.*'));
        }
      });
    }
  }

  return patterns.slice(0, 5); // Limit to top 5
}

/**
 * Extract dependencies (skills or knowledge files) from pattern content
 */
function extractDependencies(content: string, type: 'skills' | 'knowledge'): string[] {
  const dependencies = new Set<string>();

  // Look for references to skills or knowledge
  const regex = type === 'skills'
    ? /skill[s]?:\s*([a-z0-9_-]+)/gi
    : /knowledge[/]([a-z0-9_/-]+)/gi;

  const matches = content.matchAll(regex);
  for (const match of matches) {
    dependencies.add(match[1]);
  }

  return Array.from(dependencies);
}

/**
 * Extract description from pattern content
 */
function extractDescription(content: string): string {
  // Try to get first paragraph after title
  const lines = content.split('\n');
  let foundTitle = false;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && line.trim() && !line.startsWith('#') && !line.startsWith('---')) {
      return line.trim().substring(0, 200); // Limit length
    }
  }

  return 'No description available';
}

/**
 * Determine pattern complexity based on content
 */
function determineComplexity(content: string): 'simple' | 'medium' | 'complex' {
  const length = content.length;
  const sections = (content.match(/^## /gm) || []).length;

  if (length < 2000 && sections < 5) return 'simple';
  if (length < 5000 && sections < 8) return 'medium';
  return 'complex';
}

/**
 * Determine thinking level based on complexity and category
 */
function determineThinkingLevel(
  complexity: 'simple' | 'medium' | 'complex',
  category: string
): 'think' | 'think-hard' | 'ultrathink' {
  if (complexity === 'simple') return 'think';
  if (complexity === 'medium') return 'think-hard';
  if (category === 'strategy' || category === 'analysis') return 'ultrathink';
  return 'think-hard';
}

/**
 * Estimate execution time based on complexity
 */
function estimateExecutionTime(complexity: 'simple' | 'medium' | 'complex'): string {
  const times = {
    simple: '2-5 min',
    medium: '5-15 min',
    complex: '15-30 min'
  };
  return times[complexity];
}

/**
 * Check if word is common and should be filtered out
 */
function isCommonWord(word: string): boolean {
  const commonWords = new Set([
    'the', 'and', 'for', 'with', 'this', 'that', 'from', 'will',
    'have', 'can', 'are', 'how', 'when', 'what', 'where', 'why',
    'using', 'used', 'use', 'should', 'would', 'could', 'about'
  ]);
  return commonWords.has(word);
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
  const headerLevel = (sectionHeader.match(/^#+/) || ['##'])[0].length;
  const nextSectionRegex = new RegExp(`^#{1,${headerLevel}}\\s+[^#]`, 'gm');

  nextSectionRegex.lastIndex = startIndex + sectionHeader.length;
  const nextMatch = nextSectionRegex.exec(content);

  const endIndex = nextMatch ? nextMatch.index : content.length;
  return content.substring(startIndex, endIndex);
}

// ============================================================================
// PATTERN REGISTRATION
// ============================================================================

/**
 * Register patterns with the core pattern system
 *
 * Updates pattern-index.json to include plugin patterns
 *
 * @param patterns - Array of loaded patterns
 * @param projectRoot - Project root directory
 * @param config - Pattern configuration from plugin manifest
 */
export function registerPatterns(
  patterns: LoadedPattern[],
  projectRoot: string,
  config?: { autoSuggest: boolean; categories: string[] }
): boolean {
  const indexPath = path.join(projectRoot, '.claude', 'patterns', 'pattern-index.json');

  try {
    // Load existing pattern index
    let index: PatternIndex;

    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      index = JSON.parse(indexContent);
    } else {
      // Create new index if doesn't exist
      index = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        totalPatterns: 0,
        patterns: {}
      };
    }

    // Add plugin patterns to index
    let addedCount = 0;

    for (const pattern of patterns) {
      if (!index.patterns[pattern.name]) {
        index.patterns[pattern.name] = pattern.metadata;
        addedCount++;
      } else {
        console.warn(`[plugin-pattern-loader] Pattern already exists: ${pattern.name}, skipping`);
      }
    }

    // Update index metadata
    index.totalPatterns = Object.keys(index.patterns).length;
    index.lastUpdated = new Date().toISOString();

    // Write updated index
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');

    console.log(`[plugin-pattern-loader] Registered ${addedCount} new patterns`);
    console.log(`[plugin-pattern-loader] Total patterns in index: ${index.totalPatterns}`);

    return true;
  } catch (error) {
    console.error('[plugin-pattern-loader] Error registering patterns:', error);
    return false;
  }
}

/**
 * Unregister patterns from a specific plugin
 *
 * Removes plugin patterns from pattern-index.json
 *
 * @param pluginName - Name of the plugin
 * @param projectRoot - Project root directory
 */
export function unregisterPatterns(pluginName: string, projectRoot: string): boolean {
  const indexPath = path.join(projectRoot, '.claude', 'patterns', 'pattern-index.json');

  try {
    if (!fs.existsSync(indexPath)) {
      console.warn('[plugin-pattern-loader] Pattern index not found, nothing to unregister');
      return false;
    }

    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: PatternIndex = JSON.parse(indexContent);

    // Remove patterns from this plugin
    let removedCount = 0;

    for (const [name, metadata] of Object.entries(index.patterns)) {
      if (metadata.pluginName === pluginName) {
        delete index.patterns[name];
        removedCount++;
      }
    }

    // Update index metadata
    index.totalPatterns = Object.keys(index.patterns).length;
    index.lastUpdated = new Date().toISOString();

    // Write updated index
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');

    console.log(`[plugin-pattern-loader] Unregistered ${removedCount} patterns from plugin: ${pluginName}`);

    return true;
  } catch (error) {
    console.error('[plugin-pattern-loader] Error unregistering patterns:', error);
    return false;
  }
}

// ============================================================================
// PATTERN COPYING
// ============================================================================

/**
 * Copy plugin patterns to project .claude/patterns directory
 *
 * This makes patterns available in the standard location for pattern execution
 *
 * @param patterns - Array of loaded patterns
 * @param projectRoot - Project root directory
 */
export function copyPatternsToProject(patterns: LoadedPattern[], projectRoot: string): boolean {
  try {
    const patternsDir = path.join(projectRoot, '.claude', 'patterns');

    for (const pattern of patterns) {
      const targetDir = path.join(patternsDir, pattern.category);
      const targetFile = path.join(targetDir, `${pattern.name}.md`);

      // Create category directory if doesn't exist
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Copy pattern file
      fs.writeFileSync(targetFile, pattern.content, 'utf-8');

      console.log(`[plugin-pattern-loader] Copied pattern: ${pattern.name} → ${targetFile}`);
    }

    return true;
  } catch (error) {
    console.error('[plugin-pattern-loader] Error copying patterns:', error);
    return false;
  }
}

/**
 * Remove plugin patterns from project .claude/patterns directory
 *
 * @param pluginName - Name of the plugin
 * @param projectRoot - Project root directory
 */
export function removePatternsFromProject(pluginName: string, projectRoot: string): boolean {
  try {
    const patternsDir = path.join(projectRoot, '.claude', 'patterns');
    const indexPath = path.join(patternsDir, 'pattern-index.json');

    if (!fs.existsSync(indexPath)) {
      return false;
    }

    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: PatternIndex = JSON.parse(indexContent);

    // Find and remove pattern files
    for (const [name, metadata] of Object.entries(index.patterns)) {
      if (metadata.pluginName === pluginName) {
        const patternFile = path.join(patternsDir, metadata.category, `${name}.md`);
        if (fs.existsSync(patternFile)) {
          fs.unlinkSync(patternFile);
          console.log(`[plugin-pattern-loader] Removed pattern file: ${patternFile}`);
        }
      }
    }

    return true;
  } catch (error) {
    console.error('[plugin-pattern-loader] Error removing patterns:', error);
    return false;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  loadPatterns,
  registerPatterns,
  unregisterPatterns,
  copyPatternsToProject,
  removePatternsFromProject
};
