/**
 * Agent Telemetry Hook
 *
 * Tracks agent performance metrics in real-time:
 * - Context usage (tokens)
 * - Tool calls (Read, Write, Bash, etc.)
 * - Execution time and activity
 * - Cost (input + output tokens)
 * - Assets (files consumed vs produced)
 *
 * Phase 18.6 - Multi-Agent Workflows (Telemetry Tracking)
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface TelemetryEvent {
  timestamp: string;
  type: 'tool_call' | 'context_update' | 'status_change' | 'file_access' | 'thinking';
  data: any;
}

interface ToolCallEvent {
  tool: string;
  duration?: number;
  success: boolean;
  error?: string;
  args?: Record<string, any>;
}

interface ContextUpdateEvent {
  tokens: number;
  percentage: number;
  delta: number;
}

interface FileAccessEvent {
  type: 'read' | 'write';
  path: string;
  size?: number;
  status: 'success' | 'error';
}

interface StatusChangeEvent {
  from: string;
  to: string;
  reason?: string;
}

interface BashOptimizationEvent {
  timestamp: string;
  original: string;
  optimized: string;
  tool: string;
  estimatedTokensSaved: number;
  executionTime?: number;
}

interface AgentTelemetry {
  agentId: string;
  type: string;
  startTime: string;
  lastUpdate: string;
  runtime: number; // seconds

  // Context tracking
  context: {
    current: number;
    max: number;
    percentage: number;
    history: Array<{ timestamp: string; tokens: number; percentage: number }>;
  };

  // Tool tracking
  tools: {
    total: number;
    byType: Record<string, number>;
    history: Array<{ timestamp: string; tool: string; duration?: number }>;
    lastTool?: string;
    lastToolTime?: string;
  };

  // Cost tracking
  cost: {
    inputTokens: number;
    outputTokens: number;
    inputCost: number;
    outputCost: number;
    total: number;
    costPerMinute: number;
  };

  // File tracking
  files: {
    consumed: string[];
    produced: Array<{ path: string; size: number; status: string; timestamp: string }>;
    reads: number;
    writes: number;
  };

  // Performance metrics
  performance: {
    tokensPerSecond: number;
    toolsPerMinute: number;
    averageThinkingTime: number;
    efficiency: number; // output tokens / input tokens
  };

  // Status tracking
  status: {
    current: string;
    history: Array<{ timestamp: string; status: string; reason?: string }>;
  };

  // Bash optimization tracking
  bashOptimizations: {
    total: number;
    byTool: Record<string, number>; // rg: 5, fd: 3, bat: 2, etc.
    totalTokensSaved: number;
    history: BashOptimizationEvent[];
    averageTokensSavedPerOptimization: number;
  };

  // Prompt caching tracking (Phase 2)
  promptCaching?: {
    enabled: boolean; // Whether this agent uses caching
    cacheFiles: string[]; // Cache files loaded
    invocations: {
      total: number; // Total agent invocations
      cacheHits: number; // Invocations within 5min window
      cacheMisses: number; // First invocation or after cache expiry
      cacheHitRate: number; // Percentage (cacheHits / total)
    };
    tokens: {
      cachedContent: number; // Total tokens in cached content
      tokensSavedFromHits: number; // Tokens saved from cache hits (90% savings)
      estimatedSavingsPerHit: number; // Average tokens saved per cache hit
    };
    cost: {
      withoutCaching: number; // Cost if caching was disabled
      withCaching: number; // Actual cost with caching
      totalSavings: number; // Dollar savings from caching
      savingsPercentage: number; // Percentage savings
    };
    window: {
      lastInvocationTime?: string; // Timestamp of last invocation
      windowActive: boolean; // Whether within 5min cache window
      expiresAt?: string; // When current cache expires
    };
    history: Array<{
      timestamp: string;
      cacheHit: boolean;
      tokensSaved: number;
      costSaved: number;
    }>;
  };

  // Event log (last 100 events)
  events: TelemetryEvent[];
}

// ============================================================================
// Constants
// ============================================================================

const AGENTS_DIR = '/tmp/agents';
const TELEMETRY_DIR = path.join(AGENTS_DIR, 'telemetry');
const MAX_EVENTS = 100; // Keep last 100 events

// Pricing (per 1M tokens) - Claude Sonnet 4.5 as of 2025
const PRICING = {
  'haiku': { input: 0.25, output: 1.25 },    // $0.25/$1.25 per 1M tokens
  'sonnet': { input: 3.0, output: 15.0 },    // $3/$15 per 1M tokens
  'opus': { input: 15.0, output: 75.0 }      // $15/$75 per 1M tokens
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Ensure telemetry directory exists
 */
function ensureTelemetryDir(): void {
  if (!fs.existsSync(AGENTS_DIR)) {
    fs.mkdirSync(AGENTS_DIR, { recursive: true });
  }
  if (!fs.existsSync(TELEMETRY_DIR)) {
    fs.mkdirSync(TELEMETRY_DIR, { recursive: true });
  }
}

/**
 * Get telemetry file path
 */
function getTelemetryPath(agentId: string): string {
  return path.join(TELEMETRY_DIR, `${agentId}.json`);
}

/**
 * Calculate cost from token usage
 */
function calculateCost(inputTokens: number, outputTokens: number, model: string): {
  inputCost: number;
  outputCost: number;
  total: number;
} {
  const pricing = PRICING[model as keyof typeof PRICING] || PRICING.sonnet;

  const inputCost = (inputTokens / 1_000_000) * pricing.input;
  const outputCost = (outputTokens / 1_000_000) * pricing.output;
  const total = inputCost + outputCost;

  return { inputCost, outputCost, total };
}

/**
 * Calculate runtime in seconds
 */
function calculateRuntime(startTime: string): number {
  const start = new Date(startTime).getTime();
  const now = Date.now();
  return Math.floor((now - start) / 1000);
}

/**
 * Read telemetry data
 */
function readTelemetry(agentId: string): AgentTelemetry | null {
  const telemetryPath = getTelemetryPath(agentId);

  if (!fs.existsSync(telemetryPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(telemetryPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('[agent-telemetry] Error reading telemetry:', error);
    return null;
  }
}

/**
 * Write telemetry data
 */
function writeTelemetry(agentId: string, telemetry: AgentTelemetry): void {
  ensureTelemetryDir();

  const telemetryPath = getTelemetryPath(agentId);
  fs.writeFileSync(telemetryPath, JSON.stringify(telemetry, null, 2));
}

/**
 * Add event to telemetry (keep last N events)
 */
function addEvent(telemetry: AgentTelemetry, event: TelemetryEvent): void {
  telemetry.events.push(event);

  // Keep only last MAX_EVENTS events
  if (telemetry.events.length > MAX_EVENTS) {
    telemetry.events = telemetry.events.slice(-MAX_EVENTS);
  }
}

/**
 * Update performance metrics
 */
function updatePerformanceMetrics(telemetry: AgentTelemetry): void {
  const runtime = calculateRuntime(telemetry.startTime);

  if (runtime > 0) {
    // Tokens per second (based on total tokens)
    const totalTokens = telemetry.cost.inputTokens + telemetry.cost.outputTokens;
    telemetry.performance.tokensPerSecond = totalTokens / runtime;

    // Tools per minute
    telemetry.performance.toolsPerMinute = (telemetry.tools.total / runtime) * 60;

    // Efficiency (output tokens / input tokens)
    if (telemetry.cost.inputTokens > 0) {
      telemetry.performance.efficiency = telemetry.cost.outputTokens / telemetry.cost.inputTokens;
    }

    // Cost per minute
    telemetry.cost.costPerMinute = (telemetry.cost.total / runtime) * 60;
  }
}

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Initialize telemetry for a new agent
 */
export function initializeTelemetry(
  agentId: string,
  agentType: string,
  model: string = 'sonnet'
): AgentTelemetry {
  const now = new Date().toISOString();

  const telemetry: AgentTelemetry = {
    agentId,
    type: agentType,
    startTime: now,
    lastUpdate: now,
    runtime: 0,

    context: {
      current: 0,
      max: 200000,
      percentage: 0,
      history: []
    },

    tools: {
      total: 0,
      byType: {},
      history: [],
      lastTool: undefined,
      lastToolTime: undefined
    },

    cost: {
      inputTokens: 0,
      outputTokens: 0,
      inputCost: 0,
      outputCost: 0,
      total: 0,
      costPerMinute: 0
    },

    files: {
      consumed: [],
      produced: [],
      reads: 0,
      writes: 0
    },

    performance: {
      tokensPerSecond: 0,
      toolsPerMinute: 0,
      averageThinkingTime: 0,
      efficiency: 0
    },

    status: {
      current: 'created',
      history: [{ timestamp: now, status: 'created' }]
    },

    bashOptimizations: {
      total: 0,
      byTool: {},
      totalTokensSaved: 0,
      history: [],
      averageTokensSavedPerOptimization: 0
    },

    events: []
  };

  writeTelemetry(agentId, telemetry);
  return telemetry;
}

/**
 * Track tool call
 */
export function trackToolCall(
  agentId: string,
  tool: string,
  duration?: number,
  success: boolean = true,
  error?: string
): void {
  const telemetry = readTelemetry(agentId);
  if (!telemetry) return;

  const now = new Date().toISOString();

  // Update tool tracking
  telemetry.tools.total++;
  telemetry.tools.byType[tool] = (telemetry.tools.byType[tool] || 0) + 1;
  telemetry.tools.lastTool = tool;
  telemetry.tools.lastToolTime = now;
  telemetry.tools.history.push({ timestamp: now, tool, duration });

  // Add event
  const event: TelemetryEvent = {
    timestamp: now,
    type: 'tool_call',
    data: { tool, duration, success, error }
  };
  addEvent(telemetry, event);

  // Update timestamps
  telemetry.lastUpdate = now;
  telemetry.runtime = calculateRuntime(telemetry.startTime);

  // Update performance metrics
  updatePerformanceMetrics(telemetry);

  writeTelemetry(agentId, telemetry);
}

/**
 * Track context usage
 */
export function trackContextUsage(
  agentId: string,
  currentTokens: number,
  maxTokens: number = 200000
): void {
  const telemetry = readTelemetry(agentId);
  if (!telemetry) return;

  const now = new Date().toISOString();
  const percentage = (currentTokens / maxTokens) * 100;
  const delta = currentTokens - telemetry.context.current;

  // Update context tracking
  telemetry.context.current = currentTokens;
  telemetry.context.max = maxTokens;
  telemetry.context.percentage = percentage;
  telemetry.context.history.push({ timestamp: now, tokens: currentTokens, percentage });

  // Keep only last 50 context snapshots
  if (telemetry.context.history.length > 50) {
    telemetry.context.history = telemetry.context.history.slice(-50);
  }

  // Add event
  const event: TelemetryEvent = {
    timestamp: now,
    type: 'context_update',
    data: { tokens: currentTokens, percentage, delta }
  };
  addEvent(telemetry, event);

  // Update timestamps
  telemetry.lastUpdate = now;
  telemetry.runtime = calculateRuntime(telemetry.startTime);

  // Update performance metrics
  updatePerformanceMetrics(telemetry);

  writeTelemetry(agentId, telemetry);
}

/**
 * Track token usage and cost
 */
export function trackCost(
  agentId: string,
  inputTokens: number,
  outputTokens: number,
  model: string = 'sonnet'
): void {
  const telemetry = readTelemetry(agentId);
  if (!telemetry) return;

  const now = new Date().toISOString();

  // Update cost tracking
  telemetry.cost.inputTokens += inputTokens;
  telemetry.cost.outputTokens += outputTokens;

  const costCalc = calculateCost(
    telemetry.cost.inputTokens,
    telemetry.cost.outputTokens,
    model
  );

  telemetry.cost.inputCost = costCalc.inputCost;
  telemetry.cost.outputCost = costCalc.outputCost;
  telemetry.cost.total = costCalc.total;

  // Update timestamps
  telemetry.lastUpdate = now;
  telemetry.runtime = calculateRuntime(telemetry.startTime);

  // Update performance metrics
  updatePerformanceMetrics(telemetry);

  writeTelemetry(agentId, telemetry);
}

/**
 * Track file access
 */
export function trackFileAccess(
  agentId: string,
  type: 'read' | 'write',
  filePath: string,
  size?: number,
  status: 'success' | 'error' = 'success'
): void {
  const telemetry = readTelemetry(agentId);
  if (!telemetry) return;

  const now = new Date().toISOString();

  // Update file tracking
  if (type === 'read') {
    if (!telemetry.files.consumed.includes(filePath)) {
      telemetry.files.consumed.push(filePath);
    }
    telemetry.files.reads++;
  } else {
    // Check if file already exists in produced
    const existingIndex = telemetry.files.produced.findIndex(f => f.path === filePath);

    if (existingIndex >= 0) {
      // Update existing file
      telemetry.files.produced[existingIndex] = {
        path: filePath,
        size: size || 0,
        status,
        timestamp: now
      };
    } else {
      // Add new file
      telemetry.files.produced.push({
        path: filePath,
        size: size || 0,
        status,
        timestamp: now
      });
    }

    telemetry.files.writes++;
  }

  // Add event
  const event: TelemetryEvent = {
    timestamp: now,
    type: 'file_access',
    data: { type, path: filePath, size, status }
  };
  addEvent(telemetry, event);

  // Update timestamps
  telemetry.lastUpdate = now;
  telemetry.runtime = calculateRuntime(telemetry.startTime);

  writeTelemetry(agentId, telemetry);
}

/**
 * Track status change
 */
export function trackStatusChange(
  agentId: string,
  newStatus: string,
  reason?: string
): void {
  const telemetry = readTelemetry(agentId);
  if (!telemetry) return;

  const now = new Date().toISOString();
  const oldStatus = telemetry.status.current;

  // Update status tracking
  telemetry.status.current = newStatus;
  telemetry.status.history.push({ timestamp: now, status: newStatus, reason });

  // Add event
  const event: TelemetryEvent = {
    timestamp: now,
    type: 'status_change',
    data: { from: oldStatus, to: newStatus, reason }
  };
  addEvent(telemetry, event);

  // Update timestamps
  telemetry.lastUpdate = now;
  telemetry.runtime = calculateRuntime(telemetry.startTime);

  writeTelemetry(agentId, telemetry);
}

/**
 * Track thinking time
 */
export function trackThinking(
  agentId: string,
  duration: number,
  message?: string
): void {
  const telemetry = readTelemetry(agentId);
  if (!telemetry) return;

  const now = new Date().toISOString();

  // Update average thinking time
  const totalThinkingTime = (telemetry.performance.averageThinkingTime * telemetry.tools.total) + duration;
  telemetry.performance.averageThinkingTime = totalThinkingTime / (telemetry.tools.total + 1);

  // Add event
  const event: TelemetryEvent = {
    timestamp: now,
    type: 'thinking',
    data: { duration, message }
  };
  addEvent(telemetry, event);

  // Update timestamps
  telemetry.lastUpdate = now;
  telemetry.runtime = calculateRuntime(telemetry.startTime);

  writeTelemetry(agentId, telemetry);
}

/**
 * Get telemetry summary
 */
export function getTelemetrySummary(agentId: string): AgentTelemetry | null {
  return readTelemetry(agentId);
}

/**
 * Get all telemetry data
 */
export function getAllTelemetry(): AgentTelemetry[] {
  ensureTelemetryDir();

  const telemetryFiles = fs.readdirSync(TELEMETRY_DIR)
    .filter(f => f.endsWith('.json'));

  const allTelemetry: AgentTelemetry[] = [];

  for (const file of telemetryFiles) {
    const agentId = file.replace('.json', '');
    const telemetry = readTelemetry(agentId);

    if (telemetry) {
      allTelemetry.push(telemetry);
    }
  }

  return allTelemetry;
}

/**
 * Delete telemetry for completed agent
 */
export function deleteTelemetry(agentId: string): boolean {
  const telemetryPath = getTelemetryPath(agentId);

  if (fs.existsSync(telemetryPath)) {
    try {
      fs.unlinkSync(telemetryPath);
      return true;
    } catch (error) {
      console.error('[agent-telemetry] Error deleting telemetry:', error);
      return false;
    }
  }

  return false;
}

/**
 * Track bash optimization
 */
export function trackBashOptimization(
  agentId: string,
  original: string,
  optimized: string,
  tool: string,
  estimatedTokensSaved: number,
  executionTime?: number
): void {
  const telemetry = readTelemetry(agentId);
  if (!telemetry) return;

  const now = new Date().toISOString();

  // Update bash optimization tracking
  telemetry.bashOptimizations.total++;
  telemetry.bashOptimizations.byTool[tool] = (telemetry.bashOptimizations.byTool[tool] || 0) + 1;
  telemetry.bashOptimizations.totalTokensSaved += estimatedTokensSaved;

  // Calculate average
  telemetry.bashOptimizations.averageTokensSavedPerOptimization =
    telemetry.bashOptimizations.totalTokensSaved / telemetry.bashOptimizations.total;

  // Add to history (keep last 50)
  telemetry.bashOptimizations.history.push({
    timestamp: now,
    original,
    optimized,
    tool,
    estimatedTokensSaved,
    executionTime
  });

  if (telemetry.bashOptimizations.history.length > 50) {
    telemetry.bashOptimizations.history = telemetry.bashOptimizations.history.slice(-50);
  }

  // Update timestamps
  telemetry.lastUpdate = now;
  telemetry.runtime = calculateRuntime(telemetry.startTime);

  writeTelemetry(agentId, telemetry);
}

/**
 * Initialize prompt caching tracking for an agent
 * Call this when an agent with caching is invoked
 */
export function initializePromptCaching(
  agentId: string,
  cacheFiles: string[],
  cachedTokens: number
): void {
  const telemetry = readTelemetry(agentId);
  if (!telemetry) return;

  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

  telemetry.promptCaching = {
    enabled: true,
    cacheFiles,
    invocations: {
      total: 0,
      cacheHits: 0,
      cacheMisses: 0,
      cacheHitRate: 0
    },
    tokens: {
      cachedContent: cachedTokens,
      tokensSavedFromHits: 0,
      estimatedSavingsPerHit: 0
    },
    cost: {
      withoutCaching: 0,
      withCaching: 0,
      totalSavings: 0,
      savingsPercentage: 0
    },
    window: {
      lastInvocationTime: now,
      windowActive: true,
      expiresAt
    },
    history: []
  };

  telemetry.lastUpdate = now;
  writeTelemetry(agentId, telemetry);
}

/**
 * Track a cache invocation (hit or miss)
 * Call this every time an agent with caching is invoked
 */
export function trackCacheInvocation(
  agentId: string,
  model: string = 'sonnet'
): void {
  const telemetry = readTelemetry(agentId);
  if (!telemetry || !telemetry.promptCaching) return;

  const now = new Date().toISOString();
  const caching = telemetry.promptCaching;

  // Check if within 5-minute cache window
  const lastInvocation = caching.window.lastInvocationTime
    ? new Date(caching.window.lastInvocationTime).getTime()
    : 0;
  const timeSinceLastInvocation = Date.now() - lastInvocation;
  const isCacheHit = timeSinceLastInvocation < 5 * 60 * 1000 && caching.invocations.total > 0;

  // Update invocation counts
  caching.invocations.total++;
  if (isCacheHit) {
    caching.invocations.cacheHits++;
  } else {
    caching.invocations.cacheMisses++;
  }

  // Calculate cache hit rate
  caching.invocations.cacheHitRate =
    (caching.invocations.cacheHits / caching.invocations.total) * 100;

  // Calculate token savings for cache hits (90% savings on cached tokens)
  let tokensSaved = 0;
  let costSaved = 0;

  if (isCacheHit) {
    // Cache hit: Save 90% of cached input tokens
    tokensSaved = Math.floor(caching.tokens.cachedContent * 0.9);
    caching.tokens.tokensSavedFromHits += tokensSaved;

    // Calculate average savings per hit
    caching.tokens.estimatedSavingsPerHit =
      caching.tokens.tokensSavedFromHits / caching.invocations.cacheHits;

    // Calculate cost savings (90% savings on input cost for cached tokens)
    const pricing = PRICING[model as keyof typeof PRICING] || PRICING.sonnet;
    const fullCostForCachedTokens = (caching.tokens.cachedContent / 1_000_000) * pricing.input;
    costSaved = fullCostForCachedTokens * 0.9;

    caching.cost.totalSavings += costSaved;
  }

  // Update cache window
  caching.window.lastInvocationTime = now;
  caching.window.windowActive = isCacheHit;
  caching.window.expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  // Add to history (keep last 100)
  caching.history.push({
    timestamp: now,
    cacheHit: isCacheHit,
    tokensSaved,
    costSaved
  });

  if (caching.history.length > 100) {
    caching.history = caching.history.slice(-100);
  }

  // Calculate cumulative costs
  // withoutCaching = all invocations at full price for cached content
  const pricing = PRICING[model as keyof typeof PRICING] || PRICING.sonnet;
  caching.cost.withoutCaching =
    (caching.tokens.cachedContent / 1_000_000) * pricing.input * caching.invocations.total;

  // withCaching = first invocation full price + cache hits at 10% price
  const fullPriceCost = (caching.tokens.cachedContent / 1_000_000) * pricing.input;
  const cacheHitCost = fullPriceCost * 0.1;
  caching.cost.withCaching =
    fullPriceCost + (cacheHitCost * caching.invocations.cacheHits);

  // Savings percentage
  if (caching.cost.withoutCaching > 0) {
    caching.cost.savingsPercentage =
      (caching.cost.totalSavings / caching.cost.withoutCaching) * 100;
  }

  // Update timestamps
  telemetry.lastUpdate = now;
  telemetry.runtime = calculateRuntime(telemetry.startTime);

  writeTelemetry(agentId, telemetry);
}

/**
 * Get bash optimization statistics
 */
export function getBashOptimizationStats(): {
  totalOptimizations: number;
  totalTokensSaved: number;
  byTool: Record<string, { count: number; tokensSaved: number }>;
  averageSavingsPerOptimization: number;
} {
  const allTelemetry = getAllTelemetry();

  let totalOptimizations = 0;
  let totalTokensSaved = 0;
  const byTool: Record<string, { count: number; tokensSaved: number }> = {};

  for (const telemetry of allTelemetry) {
    totalOptimizations += telemetry.bashOptimizations?.total || 0;
    totalTokensSaved += telemetry.bashOptimizations?.totalTokensSaved || 0;

    // Aggregate by tool
    for (const [tool, count] of Object.entries(telemetry.bashOptimizations?.byTool || {})) {
      if (!byTool[tool]) {
        byTool[tool] = { count: 0, tokensSaved: 0 };
      }
      byTool[tool].count += count;

      // Calculate token savings for this tool from history
      const toolHistory = (telemetry.bashOptimizations?.history || []).filter(h => h.tool === tool);
      const toolTokensSaved = toolHistory.reduce((sum, h) => sum + h.estimatedTokensSaved, 0);
      byTool[tool].tokensSaved += toolTokensSaved;
    }
  }

  return {
    totalOptimizations,
    totalTokensSaved,
    byTool,
    averageSavingsPerOptimization: totalOptimizations > 0 ? totalTokensSaved / totalOptimizations : 0
  };
}

/**
 * Get prompt caching statistics across all agents
 */
export function getPromptCachingStats(): {
  agentsWithCaching: number;
  totalInvocations: number;
  totalCacheHits: number;
  totalCacheMisses: number;
  overallCacheHitRate: number;
  totalTokensSaved: number;
  totalCostSavings: number;
  averageSavingsPerAgent: number;
  byAgent: Record<string, {
    cacheFiles: string[];
    invocations: number;
    cacheHits: number;
    hitRate: number;
    tokensSaved: number;
    costSavings: number;
  }>;
} {
  const allTelemetry = getAllTelemetry();

  let agentsWithCaching = 0;
  let totalInvocations = 0;
  let totalCacheHits = 0;
  let totalCacheMisses = 0;
  let totalTokensSaved = 0;
  let totalCostSavings = 0;
  const byAgent: Record<string, any> = {};

  for (const telemetry of allTelemetry) {
    if (!telemetry.promptCaching?.enabled) continue;

    agentsWithCaching++;
    const caching = telemetry.promptCaching;

    totalInvocations += caching.invocations.total;
    totalCacheHits += caching.invocations.cacheHits;
    totalCacheMisses += caching.invocations.cacheMisses;
    totalTokensSaved += caching.tokens.tokensSavedFromHits;
    totalCostSavings += caching.cost.totalSavings;

    byAgent[telemetry.agentId] = {
      cacheFiles: caching.cacheFiles,
      invocations: caching.invocations.total,
      cacheHits: caching.invocations.cacheHits,
      hitRate: caching.invocations.cacheHitRate,
      tokensSaved: caching.tokens.tokensSavedFromHits,
      costSavings: caching.cost.totalSavings
    };
  }

  return {
    agentsWithCaching,
    totalInvocations,
    totalCacheHits,
    totalCacheMisses,
    overallCacheHitRate: totalInvocations > 0 ? (totalCacheHits / totalInvocations) * 100 : 0,
    totalTokensSaved,
    totalCostSavings,
    averageSavingsPerAgent: agentsWithCaching > 0 ? totalCostSavings / agentsWithCaching : 0,
    byAgent
  };
}

/**
 * Clean up telemetry for completed/failed agents
 */
export function cleanupTelemetry(): number {
  // Read agent registry to find completed/failed agents
  const registryPath = path.join(AGENTS_DIR, 'registry.json');

  if (!fs.existsSync(registryPath)) {
    return 0;
  }

  try {
    const registryContent = fs.readFileSync(registryPath, 'utf-8');
    const registry = JSON.parse(registryContent);

    let cleaned = 0;

    for (const agent of registry.agents || []) {
      if (agent.status === 'completed' || agent.status === 'failed' || agent.status === 'killed') {
        if (deleteTelemetry(agent.id)) {
          cleaned++;
        }
      }
    }

    return cleaned;
  } catch (error) {
    console.error('[agent-telemetry] Error cleaning up telemetry:', error);
    return 0;
  }
}

// ============================================================================
// Exports
// ============================================================================

export default {
  initializeTelemetry,
  trackToolCall,
  trackContextUsage,
  trackCost,
  trackFileAccess,
  trackStatusChange,
  trackThinking,
  trackBashOptimization,
  initializePromptCaching,
  trackCacheInvocation,
  getTelemetrySummary,
  getAllTelemetry,
  getBashOptimizationStats,
  getPromptCachingStats,
  deleteTelemetry,
  cleanupTelemetry
};
