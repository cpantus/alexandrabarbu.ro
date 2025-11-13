/**
 * Background Agent Hook
 *
 * Spawns background agents for autonomous task execution.
 * Enables "out-of-loop" operation where agents run independently.
 *
 * Phase 18.5 - Multi-Agent Workflows (Background Execution)
 */

import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { randomBytes } from 'crypto';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface AgentOptions {
  type: string;
  prompt: string;
  output?: string;
  task?: string;
  model?: 'haiku' | 'sonnet' | 'opus';
  timeout?: number;
  priority?: 'low' | 'normal' | 'high';
}

interface AgentRegistryEntry {
  id: string;
  type: string;
  prompt: string;
  status: 'created' | 'running' | 'completed' | 'failed' | 'killed';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  reportFile: string;
  outputFile?: string;
  taskName?: string;
  model: string;
  priority: string;
  timeout: number;
  pid?: number;
}

interface AgentStatus {
  id: string;
  type: string;
  prompt: string;
  status: string;
  progress?: number;
  createdAt: string;
  startedAt?: string;
  lastActivity?: string;
  runtime?: number;
  contextUsage?: {
    current: number;
    max: number;
    percentage: number;
  };
  toolCalls?: {
    total: number;
    byType: Record<string, number>;
    lastTool?: string;
    lastToolTime?: string;
  };
  filesConsumed?: string[];
  filesProduced?: Array<{ path: string; size: number; status: string }>;
  cost?: {
    inputTokens: number;
    outputTokens: number;
    inputCost: number;
    outputCost: number;
    total: number;
  };
  reportFile: string;
  outputFile?: string;
  taskName?: string;
  currentAction?: string;
  phases?: {
    total: number;
    completed: number;
    current: string;
  };
}

interface AgentRegistry {
  agents: AgentRegistryEntry[];
}

// ============================================================================
// Constants
// ============================================================================

const AGENTS_DIR = '/tmp/agents';
const REGISTRY_FILE = path.join(AGENTS_DIR, 'registry.json');
const LOCK_FILE = path.join(AGENTS_DIR, 'registry.lock');
const LOCK_TIMEOUT = 10000; // 10 seconds

const VALID_AGENT_TYPES = [
  'copywriter',
  'analyst',
  'brand-strategist',
  'content-strategist',
  'growth-hacker',
  'ai-growth-hacker',
  'llm-seo-expert',
  'automation-expert',
  'viral-expert',
  'marketing-director',
  'scout',
  'planner',
  'builder',
  // Code plugin agents (v1.1.0)
  'frontend-specialist',
  'code-reviewer',
  'system-architect',
  'ux-designer',
  'hugo-specialist',
  'architect-haiku',
  'frontend-haiku'
];

const MODEL_DEFAULTS: Record<string, string> = {
  'scout': 'haiku',
  'planner': 'sonnet',
  'builder': 'sonnet',
  'analyst': 'sonnet',
  'copywriter': 'sonnet',
  'brand-strategist': 'sonnet',
  'content-strategist': 'sonnet',
  'growth-hacker': 'sonnet',
  'ai-growth-hacker': 'sonnet',
  'llm-seo-expert': 'sonnet',
  'automation-expert': 'sonnet',
  'viral-expert': 'sonnet',
  'marketing-director': 'opus',
  // Code plugin agents (v1.1.0)
  'frontend-specialist': 'sonnet',
  'code-reviewer': 'sonnet',
  'system-architect': 'sonnet',
  'ux-designer': 'sonnet',
  'hugo-specialist': 'sonnet',
  'architect-haiku': 'haiku',
  'frontend-haiku': 'haiku'
};

const TIMEOUT_DEFAULTS: Record<string, number> = {
  'scout': 15,
  'planner': 30,
  'builder': 60,
  // Code plugin agents (v1.1.0)
  'frontend-specialist': 45,
  'code-reviewer': 30,
  'system-architect': 45,
  'ux-designer': 30,
  'hugo-specialist': 30,
  'architect-haiku': 30,
  'frontend-haiku': 30,
  'default': 60
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate unique agent ID
 */
function generateAgentId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = randomBytes(4).toString('hex');
  return `agent-${timestamp}-${randomPart}`;
}

/**
 * Ensure agents directory exists
 */
function ensureAgentsDir(): void {
  if (!fs.existsSync(AGENTS_DIR)) {
    fs.mkdirSync(AGENTS_DIR, { recursive: true });
  }
}

/**
 * Acquire registry lock
 */
function acquireLock(): void {
  const startTime = Date.now();

  while (fs.existsSync(LOCK_FILE)) {
    if (Date.now() - startTime > LOCK_TIMEOUT) {
      // Force remove stale lock
      fs.unlinkSync(LOCK_FILE);
      break;
    }
    // Wait 100ms
    const waitUntil = Date.now() + 100;
    while (Date.now() < waitUntil) { }
  }

  fs.writeFileSync(LOCK_FILE, process.pid.toString());
}

/**
 * Release registry lock
 */
function releaseLock(): void {
  if (fs.existsSync(LOCK_FILE)) {
    fs.unlinkSync(LOCK_FILE);
  }
}

/**
 * Read agent registry
 */
function readRegistry(): AgentRegistry {
  ensureAgentsDir();

  if (!fs.existsSync(REGISTRY_FILE)) {
    return { agents: [] };
  }

  try {
    const content = fs.readFileSync(REGISTRY_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('[background-agent] Error reading registry:', error);
    return { agents: [] };
  }
}

/**
 * Write agent registry
 */
function writeRegistry(registry: AgentRegistry): void {
  ensureAgentsDir();
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));
}

/**
 * Register new agent
 */
function registerAgent(entry: AgentRegistryEntry): void {
  acquireLock();

  try {
    const registry = readRegistry();
    registry.agents.push(entry);
    writeRegistry(registry);
  } finally {
    releaseLock();
  }
}

/**
 * Update agent status in registry
 */
function updateAgentStatus(agentId: string, updates: Partial<AgentRegistryEntry>): void {
  acquireLock();

  try {
    const registry = readRegistry();
    const agent = registry.agents.find(a => a.id === agentId);

    if (agent) {
      Object.assign(agent, updates);
      writeRegistry(registry);
    }
  } finally {
    releaseLock();
  }
}

/**
 * Create initial status file
 */
function createStatusFile(agentId: string, options: AgentOptions): void {
  const statusFile = path.join(AGENTS_DIR, `${agentId}-status.json`);

  const status: AgentStatus = {
    id: agentId,
    type: options.type,
    prompt: options.prompt,
    status: 'created',
    createdAt: new Date().toISOString(),
    reportFile: path.join(AGENTS_DIR, `${agentId}-report.md`),
    outputFile: options.output,
    taskName: options.task,
    contextUsage: {
      current: 0,
      max: 200000,
      percentage: 0
    },
    toolCalls: {
      total: 0,
      byType: {}
    },
    filesConsumed: [],
    filesProduced: [],
    cost: {
      inputTokens: 0,
      outputTokens: 0,
      inputCost: 0,
      outputCost: 0,
      total: 0
    }
  };

  fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));
}

/**
 * Create initial report file
 */
function createReportFile(agentId: string, options: AgentOptions): string {
  const reportFile = path.join(AGENTS_DIR, `${agentId}-report.md`);

  const header = `# Agent Report: ${options.type}-${options.task || 'task'}
Agent ID: ${agentId}
Started: ${new Date().toISOString()}
Status: initializing

## Task
${options.prompt}

## Configuration
- Model: ${options.model || MODEL_DEFAULTS[options.type] || 'sonnet'}
- Timeout: ${options.timeout || TIMEOUT_DEFAULTS[options.type] || TIMEOUT_DEFAULTS.default} minutes
- Priority: ${options.priority || 'normal'}
${options.output ? `- Output: ${options.output}` : ''}
${options.task ? `- Dev Docs: /dev/active/${options.task}/` : ''}

## Initialization
- Creating agent instance...
- Loading context...

`;

  fs.writeFileSync(reportFile, header);
  return reportFile;
}

/**
 * Build agent prompt
 */
function buildAgentPrompt(options: AgentOptions): string {
  let prompt = options.prompt;

  // Add task context if specified
  if (options.task) {
    prompt = `[Task: ${options.task}]

Load dev docs from /dev/active/${options.task}/:
- Read ${options.task}-plan.md for task overview
- Read ${options.task}-context.md for current state
- Read ${options.task}-tasks.md for task checklist

${prompt}

When complete:
- Update ${options.task}-context.md with progress
- Check off completed tasks in ${options.task}-tasks.md
- Create bundle entry via /update-dev-docs ${options.task}`;
  }

  // Add output file instruction if specified
  if (options.output) {
    prompt += `

Write final results to: ${options.output}`;
  }

  return prompt;
}

/**
 * Spawn background agent process
 */
function spawnAgent(agentId: string, options: AgentOptions, reportFile: string): number | undefined {
  const model = options.model || MODEL_DEFAULTS[options.type] || 'sonnet';
  const timeout = (options.timeout || TIMEOUT_DEFAULTS[options.type] || TIMEOUT_DEFAULTS.default) * 60 * 1000;

  const agentPrompt = buildAgentPrompt(options);

  // Create prompt file
  const promptFile = path.join(AGENTS_DIR, `${agentId}-prompt.txt`);
  fs.writeFileSync(promptFile, agentPrompt);

  // Spawn Claude Code process
  // Note: This is a conceptual implementation
  // Actual implementation depends on how Claude Code CLI works
  const args = [
    '--agent', options.type,
    '--model', model,
    '--prompt-file', promptFile,
    '--output', reportFile,
    '--timeout', timeout.toString(),
    '--background'
  ];

  try {
    const projectRoot = path.resolve(__dirname, '../../..');
    const claudeProcess = spawn('claude', args, {
      detached: true,
      stdio: 'ignore',
      cwd: projectRoot,
      env: process.env  // Inherit parent env vars (including CC_DISABLE_BASH_OPT for hook enforcement)
    });

    // Unref so parent can exit
    claudeProcess.unref();

    return claudeProcess.pid;
  } catch (error) {
    console.error('[background-agent] Error spawning agent:', error);
    return undefined;
  }
}

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Parse command arguments
 */
export function parseBackgroundCommand(commandArgs: string[]): AgentOptions | null {
  if (commandArgs.length < 2) {
    console.error('[background-agent] Usage: /background [agent-type] "[prompt]" [--options]');
    return null;
  }

  const type = commandArgs[0];
  const prompt = commandArgs[1];

  if (!VALID_AGENT_TYPES.includes(type)) {
    console.error('[background-agent] Invalid agent type:', type);
    console.error('[background-agent] Valid types:', VALID_AGENT_TYPES.join(', '));
    return null;
  }

  const options: AgentOptions = {
    type,
    prompt
  };

  // Parse optional flags
  for (let i = 2; i < commandArgs.length; i++) {
    const arg = commandArgs[i];

    if (arg === '--output' && i + 1 < commandArgs.length) {
      options.output = commandArgs[++i];
    } else if (arg === '--task' && i + 1 < commandArgs.length) {
      options.task = commandArgs[++i];
    } else if (arg === '--model' && i + 1 < commandArgs.length) {
      const model = commandArgs[++i] as 'haiku' | 'sonnet' | 'opus';
      if (['haiku', 'sonnet', 'opus'].includes(model)) {
        options.model = model;
      }
    } else if (arg === '--timeout' && i + 1 < commandArgs.length) {
      options.timeout = parseInt(commandArgs[++i]);
    } else if (arg === '--priority' && i + 1 < commandArgs.length) {
      const priority = commandArgs[++i] as 'low' | 'normal' | 'high';
      if (['low', 'normal', 'high'].includes(priority)) {
        options.priority = priority;
      }
    }
  }

  return options;
}

/**
 * Spawn background agent
 */
export function spawnBackgroundAgent(options: AgentOptions): string {
  ensureAgentsDir();

  // Generate agent ID
  const agentId = generateAgentId();

  // Create report file
  const reportFile = createReportFile(agentId, options);

  // Create status file
  createStatusFile(agentId, options);

  // Register agent
  const registryEntry: AgentRegistryEntry = {
    id: agentId,
    type: options.type,
    prompt: options.prompt,
    status: 'created',
    createdAt: new Date().toISOString(),
    reportFile,
    outputFile: options.output,
    taskName: options.task,
    model: options.model || MODEL_DEFAULTS[options.type] || 'sonnet',
    priority: options.priority || 'normal',
    timeout: options.timeout || TIMEOUT_DEFAULTS[options.type] || TIMEOUT_DEFAULTS.default
  };

  registerAgent(registryEntry);

  // Spawn agent process
  const pid = spawnAgent(agentId, options, reportFile);

  if (pid) {
    // Update registry with PID and status
    updateAgentStatus(agentId, {
      pid,
      status: 'running',
      startedAt: new Date().toISOString()
    });
  } else {
    // Failed to spawn
    updateAgentStatus(agentId, {
      status: 'failed'
    });

    throw new Error(`Failed to spawn agent ${agentId}`);
  }

  return agentId;
}

/**
 * Get agent status
 */
export function getAgentStatus(agentId: string): AgentStatus | null {
  const statusFile = path.join(AGENTS_DIR, `${agentId}-status.json`);

  if (!fs.existsSync(statusFile)) {
    return null;
  }

  try {
    const content = fs.readFileSync(statusFile, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('[background-agent] Error reading status:', error);
    return null;
  }
}

/**
 * Get all agent statuses
 */
export function getAllAgentStatuses(): AgentStatus[] {
  ensureAgentsDir();

  const registry = readRegistry();
  const statuses: AgentStatus[] = [];

  for (const agent of registry.agents) {
    const status = getAgentStatus(agent.id);
    if (status) {
      statuses.push(status);
    }
  }

  return statuses;
}

/**
 * Get agent results
 */
export function getAgentResults(agentId: string): string | null {
  const reportFile = path.join(AGENTS_DIR, `${agentId}-report.md`);

  if (!fs.existsSync(reportFile)) {
    return null;
  }

  try {
    return fs.readFileSync(reportFile, 'utf-8');
  } catch (error) {
    console.error('[background-agent] Error reading report:', error);
    return null;
  }
}

/**
 * Filter agents by type
 */
export function filterAgentsByType(type: string): AgentStatus[] {
  const allStatuses = getAllAgentStatuses();
  return allStatuses.filter(s => s.type === type);
}

/**
 * Filter agents by status
 */
export function filterAgentsByStatus(status: string): AgentStatus[] {
  const allStatuses = getAllAgentStatuses();
  return allStatuses.filter(s => s.status === status);
}

/**
 * Get agents for current task
 */
export function getTaskAgents(taskName: string): AgentStatus[] {
  const allStatuses = getAllAgentStatuses();
  return allStatuses.filter(s => s.taskName === taskName);
}

// ============================================================================
// Cleanup Functions
// ============================================================================

/**
 * Clean up completed agents (Phase 20)
 */
export function cleanupCompletedAgents(): number {
  ensureAgentsDir();

  const registry = readRegistry();
  const completedAgents = registry.agents.filter(
    a => a.status === 'completed' || a.status === 'failed'
  );

  let cleaned = 0;

  for (const agent of completedAgents) {
    // Delete report file
    const reportFile = path.join(AGENTS_DIR, `${agent.id}-report.md`);
    if (fs.existsSync(reportFile)) {
      fs.unlinkSync(reportFile);
    }

    // Delete status file
    const statusFile = path.join(AGENTS_DIR, `${agent.id}-status.json`);
    if (fs.existsSync(statusFile)) {
      fs.unlinkSync(statusFile);
    }

    // Delete prompt file
    const promptFile = path.join(AGENTS_DIR, `${agent.id}-prompt.txt`);
    if (fs.existsSync(promptFile)) {
      fs.unlinkSync(promptFile);
    }

    cleaned++;
  }

  // Update registry
  acquireLock();
  try {
    registry.agents = registry.agents.filter(
      a => a.status !== 'completed' && a.status !== 'failed'
    );
    writeRegistry(registry);
  } finally {
    releaseLock();
  }

  return cleaned;
}

/**
 * Kill running agent (Phase 20)
 */
export function killAgent(agentId: string): boolean {
  const registry = readRegistry();
  const agent = registry.agents.find(a => a.id === agentId);

  if (!agent || !agent.pid) {
    return false;
  }

  try {
    process.kill(agent.pid, 'SIGTERM');

    // Update status
    updateAgentStatus(agentId, {
      status: 'killed',
      completedAt: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error('[background-agent] Error killing agent:', error);
    return false;
  }
}

// ============================================================================
// Exports
// ============================================================================

export default {
  parseBackgroundCommand,
  spawnBackgroundAgent,
  getAgentStatus,
  getAllAgentStatuses,
  getAgentResults,
  filterAgentsByType,
  filterAgentsByStatus,
  getTaskAgents,
  cleanupCompletedAgents,
  killAgent
};
