/**
 * Utility functions for matching user prompts to documentation files
 *
 * Auto-loads detail documentation based on detected intent/keywords
 * Part of CLAUDE.md v4.0 optimization (progressive disclosure)
 */

import * as fs from 'fs';
import * as path from 'path';

export interface DocMetadata {
  file: string;
  description: string;
  estimatedTokens: number;
  priority: 'high' | 'medium' | 'low';
  triggers: {
    keywords: string[];
    intentPatterns: string[];
  };
  cacheKey: string;
}

export interface DocsIndex {
  version: string;
  lastUpdated: string;
  totalDocs: number;
  docs: Record<string, DocMetadata>;
}

export interface MatchedDoc {
  name: string;
  file: string;
  priority: 'high' | 'medium' | 'low';
  matchReason: string;
  docPath: string;
  score: number;
}

/**
 * Load docs index from docs-index.json
 */
export function loadDocsIndex(projectRoot: string): DocsIndex | null {
  const indexPath = path.join(projectRoot, '.claude', 'docs-index.json');

  if (!fs.existsSync(indexPath)) {
    console.error(`[docs-matcher] docs-index.json not found at ${indexPath}`);
    return null;
  }

  try {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    return JSON.parse(indexContent);
  } catch (error) {
    console.error(`[docs-matcher] Error loading docs-index.json:`, error);
    return null;
  }
}

/**
 * Match user prompt to relevant documentation files
 */
export function matchDocsToPrompt(
  prompt: string,
  docsIndex: DocsIndex | null,
  maxDocs: number = 3
): MatchedDoc[] {
  if (!docsIndex) {
    return [];
  }

  const matches: MatchedDoc[] = [];
  const promptLower = prompt.toLowerCase();

  for (const [docName, metadata] of Object.entries(docsIndex.docs)) {
    let score = 0;
    const matchReasons: string[] = [];

    // Check keyword matches (weight: 2 points per keyword)
    const keywordMatches = metadata.triggers.keywords.filter(keyword =>
      promptLower.includes(keyword.toLowerCase())
    );

    if (keywordMatches.length > 0) {
      score += keywordMatches.length * 2;
      matchReasons.push(`keywords: ${keywordMatches.slice(0, 3).join(', ')}`);
    }

    // Check intent pattern matches (weight: 5 points per pattern)
    for (const pattern of metadata.triggers.intentPatterns) {
      try {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(prompt)) {
          score += 5;
          matchReasons.push('intent pattern match');
          break; // Only count first intent match to avoid over-weighting
        }
      } catch (error) {
        console.error(`[docs-matcher] Invalid regex pattern: ${pattern}`, error);
      }
    }

    // If we have matches, add to results
    if (score > 0) {
      matches.push({
        name: docName,
        file: metadata.file,
        priority: metadata.priority,
        matchReason: matchReasons.join(', '),
        docPath: `core/docs/${metadata.file}`,
        score
      });
    }
  }

  // Sort by priority (high > medium > low), then by score
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  matches.sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }
    return b.score - a.score; // Higher score first
  });

  // Return top N matches
  return matches.slice(0, maxDocs);
}

/**
 * Load documentation file content
 */
export function loadDocContent(
  docName: string,
  projectRoot: string,
  docsIndex: DocsIndex | null
): string | null {
  if (!docsIndex || !docsIndex.docs[docName]) {
    console.error(`[docs-matcher] Doc not found in index: ${docName}`);
    return null;
  }

  const fileName = docsIndex.docs[docName].file;
  const docPath = path.join(projectRoot, 'core', 'docs', fileName);

  if (!fs.existsSync(docPath)) {
    console.error(`[docs-matcher] Doc file not found: ${docPath}`);
    return null;
  }

  try {
    return fs.readFileSync(docPath, 'utf-8');
  } catch (error) {
    console.error(`[docs-matcher] Error loading doc:`, error);
    return null;
  }
}

/**
 * Load documentation by capability name (for /load command)
 */
export function loadDocByCapability(
  capability: string,
  projectRoot: string,
  docsIndex: DocsIndex | null
): { name: string; content: string } | null {
  if (!docsIndex) {
    return null;
  }

  // Map capability names to doc names
  const capabilityMap: { [key: string]: string } = {
    'skills': 'skills-system',
    'patterns': 'pattern-system',
    'agents': 'agent-orchestration',
    'workflows': 'workflow-system',
    'orchestrator': 'orchestrator-guide',
    'devdocs': 'dev-docs-guide',
    'guidelines': 'workflow-guidelines',
    'teaching': 'teaching-mode'
  };

  const docName = capabilityMap[capability];
  if (!docName) {
    return null;
  }

  const content = loadDocContent(docName, projectRoot, docsIndex);
  if (!content) {
    return null;
  }

  return { name: docName, content };
}

/**
 * Load all documentation files (for /load all)
 */
export function loadAllDocs(
  projectRoot: string,
  docsIndex: DocsIndex | null
): Array<{ name: string; content: string }> {
  if (!docsIndex) {
    return [];
  }

  const docs: Array<{ name: string; content: string }> = [];

  for (const [docName, metadata] of Object.entries(docsIndex.docs)) {
    const content = loadDocContent(docName, projectRoot, docsIndex);
    if (content) {
      docs.push({ name: docName, content });
    }
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  docs.sort((a, b) => {
    const metaA = docsIndex.docs[a.name];
    const metaB = docsIndex.docs[b.name];
    return priorityOrder[metaA.priority] - priorityOrder[metaB.priority];
  });

  return docs;
}

/**
 * Format matched docs for injection into prompt
 */
export function formatDocsForInjection(
  docs: Array<{ name: string; content: string }>
): string {
  if (docs.length === 0) {
    return '';
  }

  const sections: string[] = [];

  sections.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  sections.push('📚 AUTO-LOADED DOCUMENTATION');
  sections.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  sections.push('');

  for (const doc of docs) {
    sections.push(`# ${doc.name.replace(/-/g, ' ').toUpperCase()}`);
    sections.push('');
    sections.push(doc.content);
    sections.push('');
    sections.push('---');
    sections.push('');
  }

  sections.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  sections.push('');

  return sections.join('\n');
}

/**
 * Simple in-memory cache for loaded docs (session duration)
 */
export class DocsCache {
  private cache: Map<string, string> = new Map();
  private hits: number = 0;
  private misses: number = 0;

  has(docName: string): boolean {
    return this.cache.has(docName);
  }

  get(docName: string): string | null {
    const content = this.cache.get(docName);
    if (content !== undefined) {
      this.hits++;
      return content;
    } else {
      this.misses++;
      return null;
    }
  }

  set(docName: string, content: string): void {
    this.cache.set(docName, content);
  }

  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  getStats(): { size: number; hits: number; misses: number; hitRate: number } {
    const total = this.hits + this.misses;
    const hitRate = total > 0 ? this.hits / total : 0;

    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate
    };
  }
}

/**
 * Get list of valid capability names (for error messages)
 */
export function getValidCapabilities(): string[] {
  return [
    'skills',
    'patterns',
    'agents',
    'workflows',
    'orchestrator',
    'devdocs',
    'guidelines',
    'teaching',
    'all'
  ];
}
