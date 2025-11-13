/**
 * Source Scanner Utility
 *
 * Scans GitHub repositories for component examples and generates searchable outlines.
 * Creates per-repo outline.json files for efficient component discovery and adaptation.
 *
 * @version 1.0
 * @since 2025-11-12
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPES
// ============================================================================

export type ComponentType =
  | 'agent'
  | 'skill'
  | 'pattern'
  | 'command'
  | 'hook'
  | 'workflow'
  | 'resource'
  | 'mcp_server';

export interface ComponentMetadata {
  id: string;                    // Unique identifier (filename without extension)
  type: ComponentType;           // Component type
  purpose: string;               // Brief description
  keywords: string[];            // Search keywords
  tools?: string[];              // Tools used (for agents)
  complexity?: string;           // simple | medium | complex
  path: string;                  // Relative path from repo root
}

export interface RepoOutline {
  repo: string;                  // Repo name/identifier
  url: string;                   // GitHub URL
  updated: string;               // ISO 8601 timestamp
  stats: {                       // Component counts
    agents?: number;
    skills?: number;
    patterns?: number;
    commands?: number;
    hooks?: number;
    workflows?: number;
  };
  components: ComponentMetadata[];
}

export interface SearchQuery {
  keywords?: string[];           // Keywords to match
  type?: ComponentType;          // Filter by type
  tools?: string[];              // Filter by tools used
  complexity?: string;           // Filter by complexity
}

export interface SearchMatch {
  component: ComponentMetadata;
  repo: string;
  score: number;                 // Relevance score (0-100)
  matchReasons: string[];        // Why it matched
}

// ============================================================================
// REPO SCANNING
// ============================================================================

/**
 * Scan a repository and generate outline.json
 */
export async function scanRepo(repoPath: string): Promise<RepoOutline> {
  const repoName = path.basename(repoPath);
  const components: ComponentMetadata[] = [];

  // Scan common component directories
  const scanDirs = [
    { dir: '.claude/agents', type: 'agent' as ComponentType },
    { dir: 'agents', type: 'agent' as ComponentType },
    { dir: '.claude/skills', type: 'skill' as ComponentType },
    { dir: 'skills', type: 'skill' as ComponentType },
    { dir: '.claude/patterns', type: 'pattern' as ComponentType },
    { dir: 'patterns', type: 'pattern' as ComponentType },
    { dir: '.claude/commands', type: 'command' as ComponentType },
    { dir: 'commands', type: 'command' as ComponentType },
    { dir: '.claude/hooks', type: 'hook' as ComponentType },
    { dir: 'hooks', type: 'hook' as ComponentType },
    { dir: '.claude/workflows', type: 'workflow' as ComponentType },
    { dir: 'workflows', type: 'workflow' as ComponentType },
    { dir: 'subagents', type: 'agent' as ComponentType },
    { dir: 'plugins', type: 'agent' as ComponentType },
    { dir: '.', type: 'agent' as ComponentType } // Root directory for flat repos
  ];

  for (const { dir, type } of scanDirs) {
    const fullPath = path.join(repoPath, dir);
    if (fs.existsSync(fullPath)) {
      const found = await scanDirectory(fullPath, type, repoPath);
      components.push(...found);
    }
  }

  // Calculate stats
  const stats: RepoOutline['stats'] = {};
  for (const comp of components) {
    const key = `${comp.type}s` as keyof RepoOutline['stats'];
    stats[key] = (stats[key] || 0) + 1;
  }

  // Attempt to infer GitHub URL
  const url = inferGitHubUrl(repoPath, repoName);

  return {
    repo: repoName,
    url,
    updated: new Date().toISOString(),
    stats,
    components
  };
}

/**
 * Scan a directory recursively for components
 */
async function scanDirectory(
  dirPath: string,
  type: ComponentType,
  repoRoot: string
): Promise<ComponentMetadata[]> {
  const components: ComponentMetadata[] = [];

  if (!fs.existsSync(dirPath)) {
    return components;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Recurse into subdirectories
      const subComponents = await scanDirectory(fullPath, type, repoRoot);
      components.push(...subComponents);
    } else if (entry.isFile()) {
      // Check if it's a component file
      const ext = path.extname(entry.name);
      const isComponent =
        (type === 'hook' && ext === '.ts') ||
        (type !== 'hook' && ext === '.md');

      if (isComponent) {
        const metadata = await extractMetadata(fullPath, type, repoRoot);
        if (metadata) {
          components.push(metadata);
        }
      }
    }
  }

  return components;
}

/**
 * Extract metadata from component file
 */
async function extractMetadata(
  filePath: string,
  type: ComponentType,
  repoRoot: string
): Promise<ComponentMetadata | null> {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath, path.extname(filePath));
    const relativePath = path.relative(repoRoot, filePath);

    // Extract YAML frontmatter if present
    const yamlMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    let yamlData: any = {};

    if (yamlMatch) {
      yamlData = parseSimpleYaml(yamlMatch[1]);
    }

    // Extract purpose from YAML, comments, or heading
    let purpose = yamlData.purpose || yamlData.description || '';
    if (!purpose) {
      // Try to find purpose from comments or headings
      const commentMatch = content.match(/^#\s*(.+)$/m);
      const headingMatch = content.match(/^##?\s*(.+)$/m);
      purpose = commentMatch?.[1] || headingMatch?.[1] || 'No description available';
    }

    // Extract keywords
    const keywords: string[] = [];

    // From YAML
    if (yamlData.keywords) {
      keywords.push(...(Array.isArray(yamlData.keywords) ? yamlData.keywords : [yamlData.keywords]));
    }

    // From filename
    keywords.push(...filename.split('-'));

    // From content (simple keyword extraction)
    const contentKeywords = extractKeywords(content);
    keywords.push(...contentKeywords);

    // Deduplicate and lowercase
    const uniqueKeywords = [...new Set(keywords.map(k => k.toLowerCase()))];

    // Extract tools (for agents)
    const tools = yamlData.tools || extractTools(content);

    // Extract complexity
    const complexity = yamlData.complexity || inferComplexity(content);

    return {
      id: filename,
      type,
      purpose: purpose.trim().slice(0, 80), // Limit to 80 chars (token optimization)
      keywords: uniqueKeywords.slice(0, 5), // Limit to 5 keywords (token optimization)
      ...(tools && tools.length > 0 ? { tools: tools.slice(0, 10) } : {}), // Only include if non-empty
      complexity,
      path: relativePath
    };
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error);
    return null;
  }
}

/**
 * Simple YAML parser (handles basic key: value pairs)
 */
function parseSimpleYaml(yaml: string): any {
  const result: any = {};
  const lines = yaml.split('\n');

  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Handle arrays: [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        result[key] = value.slice(1, -1).split(',').map(s => s.trim());
      } else {
        result[key] = value.trim();
      }
    }
  }

  return result;
}

/**
 * Extract keywords from content
 */
function extractKeywords(content: string): string[] {
  const keywords: string[] = [];

  // Common patterns to extract
  const patterns = [
    /\*\*Purpose:\*\*\s*(.+)/i,
    /\*\*Keywords:\*\*\s*(.+)/i,
    /\*\*Tags:\*\*\s*(.+)/i,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      keywords.push(...match[1].split(/[,;]/).map(k => k.trim()));
    }
  }

  return keywords;
}

/**
 * Extract tools from content
 */
function extractTools(content: string): string[] {
  const tools: string[] = [];
  const toolPattern = /\b(Read|Write|Edit|MultiEdit|Task|Bash|Grep|Glob|WebSearch|WebFetch|TodoWrite)\b/g;

  const matches = content.match(toolPattern);
  if (matches) {
    tools.push(...[...new Set(matches)]);
  }

  return tools;
}

/**
 * Infer complexity from content
 */
function inferComplexity(content: string): string {
  const lines = content.split('\n').length;

  if (lines < 200) return 'simple';
  if (lines < 500) return 'medium';
  return 'complex';
}

/**
 * Infer GitHub URL from repo path
 */
function inferGitHubUrl(repoPath: string, repoName: string): string {
  try {
    const gitConfigPath = path.join(repoPath, '.git', 'config');
    if (fs.existsSync(gitConfigPath)) {
      const config = fs.readFileSync(gitConfigPath, 'utf-8');
      const match = config.match(/url\s*=\s*(https:\/\/github\.com\/[^/]+\/[^/\s]+)/);
      if (match) {
        return match[1].replace('.git', '');
      }
    }
  } catch (error) {
    // Fallback to placeholder
  }

  return `https://github.com/unknown/${repoName}`;
}

/**
 * Build outline.json and write to repo folder
 */
export async function buildOutline(repoPath: string): Promise<void> {
  const outline = await scanRepo(repoPath);
  const outlinePath = path.join(repoPath, 'outline.json');

  fs.writeFileSync(outlinePath, JSON.stringify(outline, null, 2), 'utf-8');

  console.log(`✅ Generated outline for ${outline.repo}`);
  console.log(`   Components: ${outline.components.length}`);
  console.log(`   Path: ${outlinePath}`);
}

// ============================================================================
// SYNONYM MATCHING
// ============================================================================

/**
 * Synonym dictionary for expanding search keywords
 */
const KEYWORD_SYNONYMS: Record<string, string[]> = {
  'web': ['internet', 'http', 'https', 'api', 'rest', 'url', 'online', 'browser'],
  'research': ['search', 'investigate', 'analyze', 'gather', 'explore', 'study', 'find'],
  'frontend': ['ui', 'interface', 'react', 'vue', 'angular', 'component', 'client-side', 'browser'],
  'backend': ['server', 'api', 'database', 'service', 'server-side', 'node'],
  'database': ['db', 'sql', 'nosql', 'postgres', 'mongo', 'mysql', 'data', 'storage'],
  'test': ['testing', 'spec', 'qa', 'quality', 'verify', 'validate', 'check'],
  'deploy': ['deployment', 'release', 'publish', 'ship', 'production', 'ci/cd'],
  'security': ['auth', 'authentication', 'authorization', 'secure', 'safety', 'protection'],
  'performance': ['speed', 'optimization', 'fast', 'efficient', 'optimize', 'perf'],
  'documentation': ['docs', 'readme', 'guide', 'manual', 'wiki', 'tutorial'],
  'code': ['coding', 'programming', 'development', 'software', 'script'],
  'review': ['audit', 'check', 'examine', 'inspect', 'analyze', 'assess'],
  'architecture': ['design', 'structure', 'pattern', 'blueprint', 'system'],
  'mobile': ['ios', 'android', 'app', 'smartphone', 'tablet', 'react-native'],
  'cloud': ['aws', 'azure', 'gcp', 'kubernetes', 'docker', 'container'],
  'data': ['analytics', 'analysis', 'metrics', 'statistics', 'insights'],
  'ai': ['ml', 'machine-learning', 'llm', 'gpt', 'artificial-intelligence', 'model'],
  'user': ['ux', 'ui', 'experience', 'interface', 'usability', 'accessibility'],
  'email': ['mail', 'message', 'smtp', 'gmail', 'inbox', 'send'],
  'content': ['article', 'post', 'blog', 'copy', 'text', 'writing'],
  'social': ['twitter', 'facebook', 'linkedin', 'instagram', 'media', 'network'],
  'payment': ['stripe', 'paypal', 'checkout', 'billing', 'subscription', 'transaction'],
  'analytics': ['tracking', 'metrics', 'insights', 'data', 'statistics', 'reporting'],
  'devops': ['ci', 'cd', 'pipeline', 'automation', 'infrastructure', 'deploy'],
  'quality': ['qa', 'testing', 'bug', 'error', 'validation', 'verification'],
};

/**
 * Expand keywords with synonyms
 */
function expandKeywords(keywords: string[]): string[] {
  const expanded = new Set(keywords.map(k => k.toLowerCase()));

  for (const keyword of keywords) {
    const lower = keyword.toLowerCase();

    // Check if keyword has synonyms
    if (KEYWORD_SYNONYMS[lower]) {
      KEYWORD_SYNONYMS[lower].forEach(syn => expanded.add(syn));
    }

    // Also check if keyword IS a synonym (reverse lookup)
    for (const [key, syns] of Object.entries(KEYWORD_SYNONYMS)) {
      if (syns.includes(lower)) {
        expanded.add(key);
        KEYWORD_SYNONYMS[key].forEach(syn => expanded.add(syn));
      }
    }
  }

  return Array.from(expanded);
}

// ============================================================================
// SEARCH RESULT CACHING
// ============================================================================

/**
 * Search result cache (5 minute TTL)
 */
interface CacheEntry {
  results: SearchMatch[];
  timestamp: number;
}

const searchCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Generate cache key from query
 */
function getCacheKey(query: SearchQuery): string {
  return JSON.stringify({
    keywords: query.keywords?.sort(),
    type: query.type,
    tools: query.tools?.sort(),
    complexity: query.complexity
  });
}

/**
 * Get cached search results if valid
 */
function getCachedResults(query: SearchQuery): SearchMatch[] | null {
  const key = getCacheKey(query);
  const entry = searchCache.get(key);

  if (!entry) return null;

  const age = Date.now() - entry.timestamp;
  if (age > CACHE_TTL) {
    searchCache.delete(key);
    return null;
  }

  return entry.results;
}

/**
 * Cache search results
 */
function cacheResults(query: SearchQuery, results: SearchMatch[]): void {
  const key = getCacheKey(query);
  searchCache.set(key, {
    results,
    timestamp: Date.now()
  });
}

// ============================================================================
// SEARCH & DISCOVERY
// ============================================================================

/**
 * Get all repo folders in research/component-examples/
 */
export function getAllRepos(): string[] {
  const researchPath = path.join(process.cwd(), 'research', 'component-examples');

  if (!fs.existsSync(researchPath)) {
    return [];
  }

  const entries = fs.readdirSync(researchPath, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory() && entry.name !== '.git')
    .map(entry => path.join(researchPath, entry.name));
}

/**
 * Load outline from repo folder
 */
export function loadOutline(repoPath: string): RepoOutline | null {
  const outlinePath = path.join(repoPath, 'outline.json');

  if (!fs.existsSync(outlinePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(outlinePath, 'utf-8');
    return JSON.parse(content) as RepoOutline;
  } catch (error) {
    console.error(`Error loading outline from ${outlinePath}:`, error);
    return null;
  }
}

/**
 * Search across all component outlines (with caching)
 */
export function searchComponents(query: SearchQuery): SearchMatch[] {
  // Check cache first
  const cached = getCachedResults(query);
  if (cached) {
    return cached;
  }

  const repos = getAllRepos();
  const matches: SearchMatch[] = [];

  for (const repoPath of repos) {
    const outline = loadOutline(repoPath);
    if (!outline) continue;

    const repoMatches = findInRepo(outline, query);
    matches.push(...repoMatches);
  }

  // Sort by score (descending)
  matches.sort((a, b) => b.score - a.score);

  // Cache the results
  cacheResults(query, matches);

  return matches;
}

/**
 * Search within a single repo outline
 */
function findInRepo(outline: RepoOutline, query: SearchQuery): SearchMatch[] {
  const matches: SearchMatch[] = [];

  for (const component of outline.components) {
    const match = scoreComponent(component, query);

    if (match.score > 0) {
      matches.push({
        component,
        repo: outline.repo,
        score: match.score,
        matchReasons: match.reasons
      });
    }
  }

  return matches;
}

/**
 * Score component relevance to query
 */
function scoreComponent(
  component: ComponentMetadata,
  query: SearchQuery
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Type filter (mandatory if specified)
  if (query.type && component.type !== query.type) {
    return { score: 0, reasons: [] };
  }

  // Keyword matching with synonym expansion
  if (query.keywords && query.keywords.length > 0) {
    // Expand keywords with synonyms
    const expandedKeywords = expandKeywords(query.keywords);

    for (const keyword of expandedKeywords) {
      const lowerKeyword = keyword.toLowerCase();

      // Check in component keywords
      if (component.keywords.some(k => k.includes(lowerKeyword))) {
        score += 30;
        reasons.push(`keywords: ${keyword}`);
      }

      // Check in purpose
      if (component.purpose.toLowerCase().includes(lowerKeyword)) {
        score += 20;
        reasons.push(`purpose: ${keyword}`);
      }

      // Check in ID
      if (component.id.toLowerCase().includes(lowerKeyword)) {
        score += 10;
        reasons.push(`name: ${keyword}`);
      }
    }
  }

  // Tool matching
  if (query.tools && query.tools.length > 0 && component.tools) {
    const matchingTools = query.tools.filter(t => component.tools?.includes(t));
    if (matchingTools.length > 0) {
      score += matchingTools.length * 15;
      reasons.push(`tools: ${matchingTools.join(', ')}`);
    }
  }

  // Complexity matching
  if (query.complexity && component.complexity === query.complexity) {
    score += 10;
    reasons.push(`complexity: ${query.complexity}`);
  }

  return { score, reasons };
}

// ============================================================================
// UPDATE OPERATIONS
// ============================================================================

/**
 * Update outline for a single repo
 */
export async function updateRepo(repoPath: string): Promise<void> {
  await buildOutline(repoPath);
}

/**
 * Scan all repos and generate outlines
 */
export async function scanAllRepos(): Promise<void> {
  const repos = getAllRepos();

  console.log(`📂 Found ${repos.length} repositories\n`);

  for (const repoPath of repos) {
    await buildOutline(repoPath);
  }

  console.log(`\n✨ Scan complete! All outlines generated.`);
}

// ============================================================================
// CLI INTERFACE (for testing)
// ============================================================================

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'scan':
      await scanAllRepos();
      break;

    case 'scan-one':
      const repoPath = args[1];
      if (!repoPath) {
        console.error('Usage: source-scanner.ts scan-one <repo-path>');
        process.exit(1);
      }
      await buildOutline(repoPath);
      break;

    case 'search':
      const keyword = args[1];
      if (!keyword) {
        console.error('Usage: source-scanner.ts search <keyword>');
        process.exit(1);
      }
      const results = searchComponents({ keywords: [keyword] });
      console.log(`\n🔍 Found ${results.length} matches for "${keyword}":\n`);
      results.slice(0, 10).forEach(match => {
        console.log(`  ${match.component.id} (${match.component.type})`);
        console.log(`    Repo: ${match.repo}`);
        console.log(`    Score: ${match.score}`);
        console.log(`    Reasons: ${match.matchReasons.join(', ')}`);
        console.log(`    Purpose: ${match.component.purpose.slice(0, 100)}...\n`);
      });
      break;

    case 'list':
      const repos = getAllRepos();
      console.log(`\n📂 Repositories (${repos.length}):\n`);
      repos.forEach(repo => {
        const outline = loadOutline(repo);
        console.log(`  ${path.basename(repo)}`);
        if (outline) {
          console.log(`    Components: ${outline.components.length}`);
          console.log(`    Stats: ${JSON.stringify(outline.stats)}`);
        } else {
          console.log(`    ⚠️  No outline.json found`);
        }
        console.log('');
      });
      break;

    default:
      console.log('Usage:');
      console.log('  source-scanner.ts scan          - Scan all repos');
      console.log('  source-scanner.ts scan-one <path> - Scan single repo');
      console.log('  source-scanner.ts search <keyword> - Search components');
      console.log('  source-scanner.ts list          - List all repos');
      process.exit(1);
  }
}

// Run CLI if invoked directly
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
}
