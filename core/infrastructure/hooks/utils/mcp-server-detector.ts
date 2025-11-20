/**
 * MCP Server Detection Utility
 *
 * Detects which MCP servers are needed based on user prompt keywords.
 * Used for selective server loading to reduce token usage at startup.
 *
 * Complementary to mcp-detector.ts which detects code execution opportunities.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

export interface MCPServerMetadata {
  category: string;
  keywords: string[];
  toolCount: number;
  estimatedTokens: number;
  frequency: 'high' | 'medium' | 'low';
  autoStart: boolean;
  description: string;
}

export interface MCPServerCatalog {
  servers: {
    [serverName: string]: MCPServerMetadata;
  };
  profiles: {
    [profileName: string]: {
      description: string;
      servers: string[];
      estimatedTokens: number;
      tokenSavings: number;
      savingsPercentage: number;
    };
  };
  metadata: {
    totalServers: number;
    totalEstimatedTokens: number;
    averageTokensPerServer: number;
    lastUpdated: string;
    version: string;
  };
}

export interface ServerDetectionResult {
  serversNeeded: string[];
  estimatedTokens: number;
  tokenSavings: number;
  savingsPercentage: number;
  totalTokens: number;
  confidence: 'high' | 'medium' | 'low';
  matchedKeywords: { [serverName: string]: string[] };
}

/**
 * Load MCP server catalog from file system
 */
export function loadMCPServerCatalog(): MCPServerCatalog {
  try {
    const catalogPath = join(process.cwd(), '.claude/mcp-server-catalog.json');
    const catalogContent = readFileSync(catalogPath, 'utf-8');
    return JSON.parse(catalogContent);
  } catch (error) {
    throw new Error(`Failed to load MCP server catalog: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Detect which MCP servers are needed based on user prompt
 */
export function detectNeededServers(
  prompt: string,
  catalog: MCPServerCatalog
): ServerDetectionResult {
  const promptLower = prompt.toLowerCase();
  const matchedKeywords: { [serverName: string]: string[] } = {};
  const serversNeeded: Set<string> = new Set();

  // Step 1: Add auto-start servers (always loaded)
  for (const [serverName, metadata] of Object.entries(catalog.servers)) {
    if (metadata.autoStart) {
      serversNeeded.add(serverName);
      matchedKeywords[serverName] = ['auto-start'];
    }
  }

  // Step 2: Keyword-based detection
  for (const [serverName, metadata] of Object.entries(catalog.servers)) {
    const matched: string[] = [];

    for (const keyword of metadata.keywords) {
      if (promptLower.includes(keyword.toLowerCase())) {
        matched.push(keyword);
      }
    }

    if (matched.length > 0) {
      serversNeeded.add(serverName);
      matchedKeywords[serverName] = matched;
    }
  }

  // Step 3: Calculate token estimates
  const estimatedTokens = Array.from(serversNeeded).reduce((sum, serverName) => {
    return sum + (catalog.servers[serverName]?.estimatedTokens || 0);
  }, 0);

  const totalTokens = catalog.metadata.totalEstimatedTokens;
  const tokenSavings = totalTokens - estimatedTokens;
  const savingsPercentage = totalTokens > 0
    ? Math.round((tokenSavings / totalTokens) * 100)
    : 0;

  // Step 4: Determine confidence level
  const confidence = calculateConfidence(serversNeeded, matchedKeywords);

  return {
    serversNeeded: Array.from(serversNeeded),
    estimatedTokens,
    tokenSavings,
    savingsPercentage,
    totalTokens,
    confidence,
    matchedKeywords
  };
}

/**
 * Calculate confidence level of detection
 */
function calculateConfidence(
  servers: Set<string>,
  matchedKeywords: { [serverName: string]: string[] }
): 'high' | 'medium' | 'low' {
  if (servers.size === 0) {
    return 'low';
  }

  // Calculate average number of matched keywords
  const keywordCounts = Object.values(matchedKeywords)
    .filter(keywords => !keywords.includes('auto-start'))
    .map(keywords => keywords.length);

  if (keywordCounts.length === 0) {
    return 'low'; // Only auto-start servers
  }

  const avgMatches = keywordCounts.reduce((a, b) => a + b, 0) / keywordCounts.length;

  if (avgMatches >= 2.0) {
    return 'high'; // Multiple keywords matched per server
  } else if (avgMatches >= 1.0) {
    return 'medium'; // At least one keyword per server
  } else {
    return 'low';
  }
}

/**
 * Get recommended profile based on detected servers
 */
export function recommendProfile(
  detection: ServerDetectionResult,
  catalog: MCPServerCatalog
): string | null {
  const serversSet = new Set(detection.serversNeeded);

  // Find exact or closest matching profile
  let bestMatch: string | null = null;
  let bestMatchScore = 0;

  for (const [profileName, profile] of Object.entries(catalog.profiles)) {
    const profileServers = new Set(profile.servers);

    // Calculate match score (intersection / union)
    const intersection = new Set([...serversSet].filter(s => profileServers.has(s)));
    const union = new Set([...serversSet, ...profileServers]);

    const score = intersection.size / union.size;

    if (score > bestMatchScore) {
      bestMatchScore = score;
      bestMatch = profileName;
    }
  }

  // Only recommend if match score is decent (>50%)
  return bestMatchScore >= 0.5 ? bestMatch : null;
}

/**
 * Format detection result for display
 */
export function formatDetectionMessage(
  detection: ServerDetectionResult,
  recommendedProfile: string | null
): string {
  // Don't show message if no servers detected (or only auto-start)
  const nonAutoStartServers = detection.serversNeeded.filter(
    s => !detection.matchedKeywords[s]?.includes('auto-start')
  );

  if (nonAutoStartServers.length === 0) {
    return '';
  }

  const lines = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '🔍 MCP SERVER DETECTION',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    `📊 Servers detected (${detection.confidence} confidence):`,
  ];

  // List detected servers with matched keywords
  for (const serverName of detection.serversNeeded) {
    const keywords = detection.matchedKeywords[serverName] || [];
    const keywordStr = keywords
      .filter(k => k !== 'auto-start')
      .slice(0, 3)
      .join(', ');

    if (keywordStr) {
      lines.push(`   • ${serverName} (matched: ${keywordStr})`);
    }
  }

  lines.push('');
  lines.push(`💡 Token optimization:`);
  lines.push(`   Loaded: ${detection.estimatedTokens.toLocaleString()} tokens`);
  lines.push(`   Saved: ${detection.tokenSavings.toLocaleString()} tokens (${detection.savingsPercentage}%)`);
  lines.push(`   Total: ${detection.totalTokens.toLocaleString()} tokens baseline`);

  if (recommendedProfile) {
    lines.push('');
    lines.push(`🎯 Recommended profile: ${recommendedProfile}`);
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return lines.join('\n');
}

/**
 * Check if a server is currently loaded (from settings.json)
 */
export function getLoadedServers(): string[] {
  try {
    const settingsPath = join(process.cwd(), '.claude/settings.json');
    const settings = JSON.parse(readFileSync(settingsPath, 'utf-8'));

    if (settings.mcpServers) {
      return Object.keys(settings.mcpServers);
    }

    return [];
  } catch (error) {
    // Fail gracefully - return empty array
    return [];
  }
}

/**
 * Compare detected servers with currently loaded servers
 */
export interface ServerComparisonResult {
  alreadyLoaded: string[];
  shouldLoad: string[];
  unnecessary: string[];
  recommendation: string;
}

export function compareWithLoadedServers(
  detection: ServerDetectionResult,
  loadedServers: string[]
): ServerComparisonResult {
  const detectedSet = new Set(detection.serversNeeded);
  const loadedSet = new Set(loadedServers);

  const alreadyLoaded = detection.serversNeeded.filter(s => loadedSet.has(s));
  const shouldLoad = detection.serversNeeded.filter(s => !loadedSet.has(s));
  const unnecessary = loadedServers.filter(s => !detectedSet.has(s));

  let recommendation = '';

  if (shouldLoad.length > 0) {
    recommendation = `Consider loading: ${shouldLoad.join(', ')}`;
  } else if (unnecessary.length > 0 && unnecessary.length > 2) {
    recommendation = `Consider unloading ${unnecessary.length} unnecessary servers to save tokens`;
  } else {
    recommendation = 'Server configuration looks optimal';
  }

  return {
    alreadyLoaded,
    shouldLoad,
    unnecessary,
    recommendation
  };
}
