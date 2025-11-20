/**
 * Agent Discovery Utility
 *
 * Discovers agents from filesystem using official Claude Code sub-agent pattern:
 * - Project agents: core/infrastructure/agents/*.md (highest priority)
 * - User agents: ~/.claude/agents/*.md (personal across projects)
 * - Plugin agents: [plugin]/agents/*.md (domain-specific)
 *
 * Replaces hardcoded VALID_AGENT_TYPES array with file-based discovery.
 *
 * Part of Sub-Agents Migration (Phase 1, Day 1-2)
 * See: dev/active/sub-agents-migration/sub-agents-migration-plan.md
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { sync as globSync } from 'glob';
import * as yaml from 'js-yaml';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface AgentConfig {
  // Required fields (from YAML frontmatter)
  name: string;
  description: string;

  // Optional fields (from YAML frontmatter)
  tools?: string;        // Comma-separated list, e.g., "Read, Write, Bash"
  model?: string;        // Model alias: "haiku", "sonnet", "opus", or full model ID
  timeout?: number;      // Timeout in minutes
  thinking?: string;     // Thinking mode: "quick", "normal", "deep"

  // Metadata
  systemPrompt: string;  // Markdown body content (after YAML frontmatter)
  filePath: string;      // Absolute path to agent file
  source: 'project' | 'user' | 'plugin';  // Where agent was discovered
  pluginName?: string;   // Plugin name if source === 'plugin'
}

export interface DiscoveryOptions {
  includeProject?: boolean;  // Default: true
  includeUser?: boolean;     // Default: true
  includePlugins?: boolean;  // Default: true
  pluginFilter?: string[];   // Only include specific plugins
  cache?: boolean;           // Use cached results (default: true)
}

// ============================================================================
// Constants
// ============================================================================

const PROJECT_ROOT = process.cwd();
const PROJECT_AGENTS_DIR = path.join(PROJECT_ROOT, 'core/infrastructure/agents');
const USER_AGENTS_DIR = path.join(os.homedir(), '.claude/agents');
const PLUGIN_PATTERN = '*-plugin/agents'; // Matches: code-plugin/agents, marketing-plugin/agents

// Cache for discovered agents (cleared on file changes)
let discoveryCache: AgentConfig[] | null = null;
let lastDiscoveryTime: number = 0;
const CACHE_TTL_MS = 5000; // 5 seconds

// ============================================================================
// Core Discovery Functions
// ============================================================================

/**
 * Discover all agents from filesystem (project + user + plugins)
 *
 * Precedence order (highest to lowest):
 * 1. Project agents (core/infrastructure/agents/*.md)
 * 2. User agents (~/.claude/agents/*.md)
 * 3. Plugin agents (*-plugin/agents/*.md)
 *
 * If multiple agents have the same name, the highest precedence wins.
 *
 * @param options Discovery options (filtering, caching)
 * @returns Array of agent configurations
 */
export async function discoverAgents(options: DiscoveryOptions = {}): Promise<AgentConfig[]> {
  const {
    includeProject = true,
    includeUser = true,
    includePlugins = true,
    pluginFilter,
    cache = true
  } = options;

  // Check cache
  if (cache && discoveryCache && (Date.now() - lastDiscoveryTime < CACHE_TTL_MS)) {
    return filterDiscoveredAgents(discoveryCache, options);
  }

  const allAgents: AgentConfig[] = [];

  // Discover project agents (highest priority)
  if (includeProject) {
    const projectAgents = await discoverProjectAgents();
    allAgents.push(...projectAgents);
  }

  // Discover user agents (medium priority)
  if (includeUser) {
    const userAgents = await discoverUserAgents();
    allAgents.push(...userAgents);
  }

  // Discover plugin agents (lowest priority)
  if (includePlugins) {
    const pluginAgents = await discoverPluginAgents(pluginFilter);
    allAgents.push(...pluginAgents);
  }

  // Remove duplicates (keep highest precedence)
  const uniqueAgents = deduplicateAgents(allAgents);

  // Update cache
  discoveryCache = uniqueAgents;
  lastDiscoveryTime = Date.now();

  return filterDiscoveredAgents(uniqueAgents, options);
}

/**
 * Discover agents from project directory (core/infrastructure/agents/*.md)
 */
export async function discoverProjectAgents(): Promise<AgentConfig[]> {
  if (!fs.existsSync(PROJECT_AGENTS_DIR)) {
    return [];
  }

  const files = globSync('*.md', { cwd: PROJECT_AGENTS_DIR, absolute: false });

  // Filter out template and documentation files
  const agentFiles = files.filter(file =>
    !file.includes('TEMPLATE') &&
    !file.includes('README') &&
    !file.includes('AGENT-TEMPLATE')
  );

  const agents: AgentConfig[] = [];

  for (const file of agentFiles) {
    const filePath = path.join(PROJECT_AGENTS_DIR, file);
    try {
      const agent = await parseAgentFile(filePath);
      if (agent) {
        agent.source = 'project';
        agents.push(agent);
      }
    } catch (error) {
      console.error(`[agent-discovery] Failed to parse project agent ${file}:`, error);
    }
  }

  return agents;
}

/**
 * Discover agents from user directory (~/.claude/agents/*.md)
 */
export async function discoverUserAgents(): Promise<AgentConfig[]> {
  if (!fs.existsSync(USER_AGENTS_DIR)) {
    return [];
  }

  const files = globSync('*.md', { cwd: USER_AGENTS_DIR, absolute: false });

  // Filter out template and documentation files
  const agentFiles = files.filter(file =>
    !file.includes('TEMPLATE') &&
    !file.includes('README')
  );

  const agents: AgentConfig[] = [];

  for (const file of agentFiles) {
    const filePath = path.join(USER_AGENTS_DIR, file);
    try {
      const agent = await parseAgentFile(filePath);
      if (agent) {
        agent.source = 'user';
        agents.push(agent);
      }
    } catch (error) {
      console.error(`[agent-discovery] Failed to parse user agent ${file}:`, error);
    }
  }

  return agents;
}

/**
 * Discover agents from plugin directories (*-plugin/agents/*.md)
 */
export async function discoverPluginAgents(pluginFilter?: string[]): Promise<AgentConfig[]> {
  const pluginDirs = globSync(PLUGIN_PATTERN, { cwd: PROJECT_ROOT, absolute: false });

  const agents: AgentConfig[] = [];

  for (const pluginDir of pluginDirs) {
    const pluginName = path.dirname(pluginDir).replace('-plugin', '');

    // Apply plugin filter if specified
    if (pluginFilter && !pluginFilter.includes(pluginName)) {
      continue;
    }

    const pluginAgentsDir = path.join(PROJECT_ROOT, pluginDir);

    if (!fs.existsSync(pluginAgentsDir)) {
      continue;
    }

    const files = globSync('*.md', { cwd: pluginAgentsDir, absolute: false });

    // Filter out template and documentation files
    const agentFiles = files.filter(file =>
      !file.includes('TEMPLATE') &&
      !file.includes('README')
    );

    for (const file of agentFiles) {
      const filePath = path.join(pluginAgentsDir, file);
      try {
        const agent = await parseAgentFile(filePath);
        if (agent) {
          agent.source = 'plugin';
          agent.pluginName = pluginName;
          agents.push(agent);
        }
      } catch (error) {
        console.error(`[agent-discovery] Failed to parse plugin agent ${pluginName}/${file}:`, error);
      }
    }
  }

  return agents;
}

// ============================================================================
// Agent File Parsing
// ============================================================================

/**
 * Parse agent markdown file with YAML frontmatter
 *
 * Expected format:
 * ```
 * ---
 * name: agent-name
 * description: What this agent does
 * tools: Read, Write, Bash  # Optional
 * model: sonnet              # Optional
 * timeout: 30                # Optional (minutes)
 * thinking: quick            # Optional
 * ---
 *
 * # Agent System Prompt
 * [Markdown content...]
 * ```
 *
 * @param filePath Absolute path to agent markdown file
 * @returns Parsed agent configuration or null if invalid
 */
export async function parseAgentFile(filePath: string): Promise<AgentConfig | null> {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract YAML frontmatter
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    console.warn(`[agent-discovery] No YAML frontmatter found in ${filePath}`);
    return null;
  }

  const [, frontmatterYaml, markdownBody] = frontmatterMatch;

  // Parse YAML frontmatter
  let frontmatter: any;
  try {
    frontmatter = yaml.load(frontmatterYaml);
  } catch (error) {
    console.error(`[agent-discovery] Invalid YAML in ${filePath}:`, error);
    return null;
  }

  // Validate required fields
  if (!frontmatter.name || !frontmatter.description) {
    console.error(`[agent-discovery] Missing required fields (name, description) in ${filePath}`);
    return null;
  }

  // Build agent config
  const agent: AgentConfig = {
    name: frontmatter.name,
    description: frontmatter.description,
    tools: frontmatter.tools,
    model: frontmatter.model,
    timeout: frontmatter.timeout,
    thinking: frontmatter.thinking,
    systemPrompt: markdownBody.trim(),
    filePath,
    source: 'project' // Will be overwritten by caller
  };

  return agent;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Remove duplicate agents (keep highest precedence)
 *
 * Precedence: project > user > plugin
 */
function deduplicateAgents(agents: AgentConfig[]): AgentConfig[] {
  const seen = new Map<string, AgentConfig>();

  for (const agent of agents) {
    const existing = seen.get(agent.name);

    if (!existing) {
      seen.set(agent.name, agent);
      continue;
    }

    // Keep highest precedence
    const precedence = { project: 3, user: 2, plugin: 1 };
    const existingPrecedence = precedence[existing.source];
    const currentPrecedence = precedence[agent.source];

    if (currentPrecedence > existingPrecedence) {
      seen.set(agent.name, agent);
    }
  }

  return Array.from(seen.values());
}

/**
 * Filter discovered agents based on options
 */
function filterDiscoveredAgents(agents: AgentConfig[], options: DiscoveryOptions): AgentConfig[] {
  let filtered = agents;

  // Apply plugin filter
  if (options.pluginFilter && options.pluginFilter.length > 0) {
    filtered = filtered.filter(agent =>
      agent.source !== 'plugin' ||
      (agent.pluginName && options.pluginFilter!.includes(agent.pluginName))
    );
  }

  return filtered;
}

/**
 * Find agent by name (case-insensitive)
 */
export async function findAgentByName(name: string, options?: DiscoveryOptions): Promise<AgentConfig | null> {
  const agents = await discoverAgents(options);
  const normalizedName = name.toLowerCase();

  return agents.find(agent => agent.name.toLowerCase() === normalizedName) || null;
}

/**
 * Get agent names (useful for validation)
 */
export async function getAgentNames(options?: DiscoveryOptions): Promise<string[]> {
  const agents = await discoverAgents(options);
  return agents.map(agent => agent.name);
}

/**
 * Clear discovery cache (useful when agent files change)
 */
export function clearDiscoveryCache(): void {
  discoveryCache = null;
  lastDiscoveryTime = 0;
}

// ============================================================================
// CLI (for testing)
// ============================================================================

if (require.main === module) {
  (async () => {
    console.log('🔍 Discovering agents...\n');

    const agents = await discoverAgents();

    console.log(`Found ${agents.length} agents:\n`);

    // Group by source
    const bySource = {
      project: agents.filter(a => a.source === 'project'),
      user: agents.filter(a => a.source === 'user'),
      plugin: agents.filter(a => a.source === 'plugin')
    };

    console.log(`📁 Project agents (${bySource.project.length}):`);
    for (const agent of bySource.project) {
      console.log(`  - ${agent.name}: ${agent.description.substring(0, 60)}...`);
      console.log(`    Tools: ${agent.tools || 'inherit all'}, Model: ${agent.model || 'inherit'}, Timeout: ${agent.timeout || 60}min`);
    }

    console.log(`\n👤 User agents (${bySource.user.length}):`);
    for (const agent of bySource.user) {
      console.log(`  - ${agent.name}: ${agent.description.substring(0, 60)}...`);
    }

    console.log(`\n🔌 Plugin agents (${bySource.plugin.length}):`);
    for (const agent of bySource.plugin) {
      console.log(`  - ${agent.name} [${agent.pluginName}]: ${agent.description.substring(0, 60)}...`);
    }

    console.log('\n✅ Discovery complete');
  })();
}
