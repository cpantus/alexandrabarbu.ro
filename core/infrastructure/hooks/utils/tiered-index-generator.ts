/**
 * Tiered Index Generator
 *
 * Generates token-efficient tiered indices for research repositories:
 * - Tier 1: Master index (500 tokens) - repo-level metadata
 * - Tier 2: Repo summaries (30-50 tokens each) - category breakdowns
 * - Tier 3: Full outlines (existing, but optimized)
 *
 * @version 1.0
 * @since 2025-01-12
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAllRepos, loadOutline, type RepoOutline, type ComponentMetadata } from './source-scanner';

// ============================================================================
// TIER 1: MASTER INDEX
// ============================================================================

export interface MasterIndex {
  version: string;
  updated: string;
  total_components: number;
  repositories: RepoIndexEntry[];
}

export interface RepoIndexEntry {
  id: string;
  count: number;
  primary_tags: string[];
  coverage: string[];
  popular: string[];
}

/**
 * Generate master index.json (Tier 1)
 * Target: ~500 tokens total
 */
export function generateMasterIndex(): MasterIndex {
  const repos = getAllRepos();
  const index: MasterIndex = {
    version: '1.0',
    updated: new Date().toISOString().split('T')[0], // Just date
    total_components: 0,
    repositories: []
  };

  for (const repoPath of repos) {
    const outline = loadOutline(repoPath);
    if (!outline) continue;

    const repoName = path.basename(repoPath);
    const entry: RepoIndexEntry = {
      id: repoName,
      count: outline.components.length,
      primary_tags: inferPrimaryTags(repoName),
      coverage: extractCoverage(outline.components),
      popular: extractPopular(outline.components, 3)
    };

    index.repositories.push(entry);
    index.total_components += outline.components.length;
  }

  return index;
}

/**
 * Infer primary tags from repo name
 */
function inferPrimaryTags(repoName: string): string[] {
  const tagMap: Record<string, string[]> = {
    'wshobson-agents': ['production', 'enterprise', 'best-practices'],
    'claude-code-templates': ['templates', 'scaffolding', 'examples'],
    'awesome-llm-apps': ['ai', 'llm', 'agents', 'applications'],
    'agents-claude-code': ['specialists', 'domain-specific', 'tooling'],
    'claude-code-unified-agents': ['orchestration', 'workflow', 'meta'],
    'claude-code-cheat-sheet': ['learning', 'simple', 'educational']
  };

  return tagMap[repoName] || ['general'];
}

/**
 * Extract coverage areas from components (top 5 domains)
 */
function extractCoverage(components: ComponentMetadata[]): string[] {
  const domainKeywords: Record<string, string[]> = {
    'backend': ['backend', 'api', 'server', 'database', 'rest'],
    'frontend': ['frontend', 'ui', 'react', 'vue', 'angular', 'component'],
    'devops': ['devops', 'cloud', 'deploy', 'ci', 'docker', 'kubernetes'],
    'testing': ['test', 'qa', 'quality', 'verify'],
    'ai': ['ai', 'ml', 'llm', 'gpt', 'agent'],
    'security': ['security', 'auth', 'secure'],
    'database': ['database', 'sql', 'mongo', 'postgres'],
    'mobile': ['mobile', 'ios', 'android', 'app'],
    'web': ['web', 'http', 'url', 'browser']
  };

  const coverageScores: Record<string, number> = {};

  for (const component of components) {
    const allKeywords = [
      ...component.keywords,
      ...component.id.toLowerCase().split('-')
    ];

    for (const [domain, keywords] of Object.entries(domainKeywords)) {
      for (const keyword of allKeywords) {
        if (keywords.some(k => keyword.includes(k))) {
          coverageScores[domain] = (coverageScores[domain] || 0) + 1;
        }
      }
    }
  }

  return Object.entries(coverageScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([domain]) => domain);
}

/**
 * Extract popular/sample components (top N by keyword count)
 */
function extractPopular(components: ComponentMetadata[], count: number): string[] {
  return components
    .sort((a, b) => b.keywords.length - a.keywords.length)
    .slice(0, count)
    .map(c => c.id);
}

// ============================================================================
// TIER 2: REPO SUMMARIES
// ============================================================================

export interface RepoSummary {
  repo: string;
  components: number;
  categories: Record<string, number>;
  top_keywords: string[];
  sample_components: Array<{ id: string; tags: string[] }>;
}

/**
 * Generate summary.json for a single repo (Tier 2)
 * Target: 30-50 tokens per repo
 */
export function generateRepoSummary(outline: RepoOutline): RepoSummary {
  const categories = categorizeComponents(outline.components);
  const topKeywords = extractTopKeywords(outline.components, 10);
  const samples = outline.components.slice(0, 5).map(c => ({
    id: c.id,
    tags: c.keywords.slice(0, 3)
  }));

  return {
    repo: outline.repo,
    components: outline.components.length,
    categories,
    top_keywords: topKeywords,
    sample_components: samples
  };
}

/**
 * Categorize components by domain
 */
function categorizeComponents(components: ComponentMetadata[]): Record<string, number> {
  const categories: Record<string, number> = {};

  for (const component of components) {
    // Simple categorization based on keywords
    const category = inferCategory(component);
    categories[category] = (categories[category] || 0) + 1;
  }

  return Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
}

/**
 * Infer primary category from component keywords
 */
function inferCategory(component: ComponentMetadata): string {
  const keywords = component.keywords.join(' ').toLowerCase();

  if (keywords.match(/backend|api|server|rest/)) return 'backend';
  if (keywords.match(/frontend|ui|react|vue|angular/)) return 'frontend';
  if (keywords.match(/devops|cloud|deploy|docker|kubernetes/)) return 'devops';
  if (keywords.match(/test|qa|quality/)) return 'testing';
  if (keywords.match(/ai|ml|llm|agent/)) return 'ai-ml';
  if (keywords.match(/security|auth/)) return 'security';
  if (keywords.match(/database|sql|mongo/)) return 'database';
  if (keywords.match(/mobile|ios|android/)) return 'mobile';

  return 'general';
}

/**
 * Extract top N keywords across all components
 */
function extractTopKeywords(components: ComponentMetadata[], count: number): string[] {
  const keywordCounts: Record<string, number> = {};

  for (const component of components) {
    for (const keyword of component.keywords) {
      keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
    }
  }

  return Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([keyword]) => keyword);
}

// ============================================================================
// FILE OPERATIONS
// ============================================================================

/**
 * Write master index to disk
 */
export function writeMasterIndex(index: MasterIndex): void {
  const researchPath = path.join(process.cwd(), 'research', 'component-examples');
  const indexPath = path.join(researchPath, 'index.json');

  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`✅ Generated master index: ${indexPath}`);
  console.log(`   Total components: ${index.total_components}`);
  console.log(`   Repositories: ${index.repositories.length}`);
}

/**
 * Write repo summary to disk
 */
export function writeRepoSummary(repoPath: string, summary: RepoSummary): void {
  const summaryPath = path.join(repoPath, 'summary.json');

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');
  console.log(`✅ Generated summary for ${summary.repo}: ${summaryPath}`);
  console.log(`   Components: ${summary.components}`);
  console.log(`   Categories: ${Object.keys(summary.categories).length}`);
}

/**
 * Generate all tiered indices (Tier 1 + Tier 2)
 */
export async function generateAllIndices(): Promise<void> {
  console.log('🔧 Generating tiered indices...\n');

  // Generate Tier 1: Master index
  const masterIndex = generateMasterIndex();
  writeMasterIndex(masterIndex);
  console.log('');

  // Generate Tier 2: Repo summaries
  const repos = getAllRepos();
  for (const repoPath of repos) {
    const outline = loadOutline(repoPath);
    if (!outline) continue;

    const summary = generateRepoSummary(outline);
    writeRepoSummary(repoPath, summary);
  }

  console.log('\n✨ All indices generated successfully!');
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'generate':
      await generateAllIndices();
      break;

    case 'master':
      const masterIndex = generateMasterIndex();
      writeMasterIndex(masterIndex);
      break;

    case 'summaries':
      const repos = getAllRepos();
      for (const repoPath of repos) {
        const outline = loadOutline(repoPath);
        if (!outline) continue;
        const summary = generateRepoSummary(outline);
        writeRepoSummary(repoPath, summary);
      }
      break;

    default:
      console.log('Usage:');
      console.log('  tiered-index-generator.ts generate    - Generate all indices');
      console.log('  tiered-index-generator.ts master      - Generate master index only');
      console.log('  tiered-index-generator.ts summaries   - Generate repo summaries only');
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
