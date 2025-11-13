/**
 * MCP Pattern Detection Utility
 *
 * Detects when MCP code execution pattern would be more efficient than
 * traditional direct tool calls. Used by detect-mcp-opportunity hook.
 */

export interface MCPPattern {
  shouldOptimize: boolean;
  toolCount: number;
  estimatedTokens: number;
  optimizedTokens: number;
  costSavings: number;
  speedup: number;
  pattern: 'web-scraping' | 'ui-testing' | 'monitoring' | 'data-extraction' | 'multi-tool' | 'unknown';
  confidence: 'high' | 'medium' | 'low';
}

// Pattern-specific keywords for classification
const MCP_KEYWORDS = {
  'web-scraping': ['scrape', 'extract', 'crawl', 'data collection', 'parse html', 'harvest'],
  'ui-testing': ['test', 'ui test', 'e2e', 'browser test', 'selenium', 'end to end', 'integration test'],
  'monitoring': ['monitor', 'uptime', 'check site', 'availability', 'health check', 'ping'],
  'data-extraction': ['capture', 'download', 'export', 'extract data', 'bulk export', 'mass download']
};

// MCP server names that benefit from code execution pattern
const MCP_SERVERS = [
  'playwright', 'puppeteer', 'selenium',
  'google-drive', 'gdrive', 'salesforce', 'hubspot',
  'slack', 'github', 'gitlab', 'jira',
  'postgres', 'mysql', 'mongodb'
];

/**
 * Detect if prompt would benefit from MCP code execution pattern
 */
export function detectMCPPattern(prompt: string): MCPPattern {
  const promptLower = prompt.toLowerCase();

  // Detect pattern type
  let pattern: MCPPattern['pattern'] = 'unknown';
  let confidence: MCPPattern['confidence'] = 'low';
  let toolCount = 0;

  // Check for specific workflow patterns
  for (const [patternType, keywords] of Object.entries(MCP_KEYWORDS)) {
    const matchCount = keywords.filter(kw => promptLower.includes(kw)).length;
    if (matchCount >= 1) {
      pattern = patternType as any;
      toolCount = estimateToolCount(pattern);
      confidence = matchCount >= 2 ? 'high' : 'medium';
      break;
    }
  }

  // Check for MCP server mentions
  const mcpServerMentioned = MCP_SERVERS.some(server => promptLower.includes(server));

  // Check for multi-step indicators
  const stepIndicators = ['then', 'and then', 'after', 'next', 'followed by'];
  const stepCount = stepIndicators.filter(ind => promptLower.includes(ind)).length;
  const hasMultipleSteps = stepCount >= 2;

  // Detect multiple tool calls pattern
  const toolCallIndicators = ['call', 'use', 'run', 'execute', 'invoke'];
  const toolMentions = toolCallIndicators.filter(t => {
    const regex = new RegExp(`${t}\\s+\\w+`, 'gi');
    return regex.test(prompt);
  }).length;

  // Upgrade to multi-tool pattern if many operations detected
  if (pattern === 'unknown' && (hasMultipleSteps || toolMentions >= 3)) {
    pattern = 'multi-tool';
    toolCount = Math.max(toolMentions, stepCount + 1, 3);
    confidence = 'medium';
  }

  // Determine if should optimize
  const shouldOptimize = (
    (toolCount >= 3) ||
    (mcpServerMentioned && hasMultipleSteps) ||
    (mcpServerMentioned && toolMentions >= 2) ||
    (pattern !== 'unknown' && confidence === 'high')
  );

  // Token estimates
  const estimatedTokens = calculateTraditionalTokens(toolCount, pattern);
  const optimizedTokens = calculateOptimizedTokens(toolCount, pattern);
  const costSavings = calculateCostSavings(estimatedTokens, optimizedTokens);
  const speedup = calculateSpeedup(toolCount, pattern);

  return {
    shouldOptimize,
    toolCount,
    estimatedTokens,
    optimizedTokens,
    costSavings,
    speedup,
    pattern,
    confidence
  };
}

/**
 * Estimate tool count based on pattern type
 */
function estimateToolCount(pattern: string): number {
  const counts: Record<string, number> = {
    'web-scraping': 6,      // navigate, wait, getText, screenshot, evaluate, close
    'ui-testing': 8,        // navigate, wait, click, fill, screenshot, assert, evaluate, close
    'monitoring': 4,        // navigate, wait, screenshot, close
    'data-extraction': 7,   // navigate, wait, getText, evaluate, download, screenshot, close
    'multi-tool': 5         // generic multi-step workflow
  };
  return counts[pattern] || 3;
}

/**
 * Calculate traditional MCP approach token usage
 */
function calculateTraditionalTokens(toolCount: number, pattern: string): number {
  // Tool definitions: ~50K-100K for typical MCP server
  const toolDefinitions = 70;

  // Per-tool result overhead (data in context)
  const perToolOverhead = pattern === 'data-extraction' ? 10 : 5;
  const dataTokens = toolCount * perToolOverhead;

  // Additional overhead for complex patterns
  const patternOverhead = ['ui-testing', 'data-extraction'].includes(pattern) ? 20 : 0;

  return toolDefinitions + dataTokens + patternOverhead;
}

/**
 * Calculate code execution approach token usage
 */
function calculateOptimizedTokens(toolCount: number, pattern: string): number {
  // Minimal wrapper tools: ~2K
  const wrapperTokens = 2;

  // Script execution overhead (per script)
  const scriptOverhead = 0.5;

  // Summary data returned to context (much smaller)
  const summaryTokens = Math.ceil(toolCount * 0.2);

  return wrapperTokens + scriptOverhead + summaryTokens;
}

/**
 * Calculate cost savings ($3 per 1M tokens)
 */
function calculateCostSavings(traditional: number, optimized: number): number {
  const COST_PER_1K_TOKENS = 0.003; // $3 per 1M = $0.003 per 1K
  const savings = ((traditional - optimized) / 1000) * COST_PER_1K_TOKENS;
  return parseFloat(savings.toFixed(3));
}

/**
 * Calculate speedup from parallel execution
 */
function calculateSpeedup(toolCount: number, pattern: string): number {
  // Parallel execution benefit
  const parallelBenefit = Math.min(toolCount, 10);

  // Pattern-specific multipliers
  const multipliers: Record<string, number> = {
    'web-scraping': 1.0,
    'ui-testing': 0.8,    // Less parallelizable
    'monitoring': 1.2,    // Highly parallelizable
    'data-extraction': 1.0,
    'multi-tool': 1.0
  };

  const multiplier = multipliers[pattern] || 1.0;
  return parseFloat((parallelBenefit * multiplier).toFixed(1));
}

/**
 * Format detection result for display
 */
export function formatDetectionMessage(detection: MCPPattern): string {
  if (!detection.shouldOptimize) {
    return ''; // No message if optimization not recommended
  }

  const reduction = Math.round(((detection.estimatedTokens - detection.optimizedTokens) / detection.estimatedTokens) * 100);

  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 MCP CODE EXECUTION OPPORTUNITY DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Pattern: ${detection.pattern} (${detection.confidence} confidence)
   Traditional: ~${detection.estimatedTokens}K tokens
   ${detection.toolCount} MCP tool calls

💡 Code Execution Pattern:
   Optimized: ~${detection.optimizedTokens}K tokens (${reduction}% reduction)
   Cost: ~$${detection.costSavings} saved per run
   Speed: ${detection.speedup}× faster (parallel execution)

📖 Skill auto-loaded: mcp-code-execution.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();
}
