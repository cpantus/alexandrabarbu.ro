#!/usr/bin/env ts-node

/**
 * Context Cache CLI
 *
 * Command-line utility for inspecting and managing context cache.
 * Used by /context-status and /context-clear commands.
 */

import {
  getCache,
  getCacheStats,
  getCachedResources,
  clearCache,
  pruneCache
} from './context-cache';

const command = process.argv[2];

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

function displayStatus(): void {
  const cache = getCache();
  const stats = getCacheStats();
  const resources = getCachedResources();

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 CONTEXT CACHE STATUS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log(`Session: ${cache.sessionId}`);
  console.log(`Started: ${new Date(cache.startedAt).toISOString()} (${stats.sessionAge} ago)`);
  console.log(`Cache file: /tmp/claude-marketing-agent-context-cache.json\n`);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📈 STATISTICS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log(`Cached resources: ${stats.entriesCount}`);
  console.log(`Total tokens loaded: ${formatNumber(stats.totalTokens)}`);
  console.log(`Tokens saved (cache hits): ${formatNumber(stats.cacheSavings)}`);
  console.log(`Cache hit rate: ${stats.hitRate}\n`);

  if (resources.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📦 CACHED RESOURCES');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Header
    console.log(
      'Type'.padEnd(10) +
      'Name'.padEnd(35) +
      'Tier'.padEnd(10) +
      'Age'.padEnd(10) +
      'Tokens'
    );
    console.log('-'.repeat(80));

    // Resources
    resources.forEach(resource => {
      console.log(
        resource.type.padEnd(10) +
        resource.name.substring(0, 33).padEnd(35) +
        resource.tier.padEnd(10) +
        resource.age.padEnd(10) +
        formatNumber(resource.tokens)
      );
    });

    console.log();
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💡 RECOMMENDATIONS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const hitRateNum = parseInt(stats.hitRate);
  if (hitRateNum > 20) {
    console.log(`✅ Cache healthy - ${stats.hitRate} hit rate`);
  } else if (hitRateNum > 0) {
    console.log(`⚠️  Low cache hit rate - ${stats.hitRate}`);
  } else {
    console.log(`ℹ️  No cache hits yet (session just started)`);
  }

  if (stats.cacheSavings > 0) {
    console.log(`📊 ${formatNumber(stats.cacheSavings)} tokens saved this session`);
  }

  console.log(`🔄 Cache entries expire after 30 minutes of inactivity\n`);

  console.log('Commands:');
  console.log('- /context-clear - Clear cache manually');
  console.log('- /context-status - Refresh this view\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

function displayClear(): void {
  clearCache();

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🗑️  CONTEXT CACHE CLEARED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('✅ Cache file deleted');
  console.log('✅ Next prompt will start fresh session\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

function displayPrune(): void {
  const beforeStats = getCacheStats();
  pruneCache();
  const afterStats = getCacheStats();

  const removed = beforeStats.entriesCount - afterStats.entriesCount;

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧹 CACHE PRUNED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log(`Removed ${removed} expired entries`);
  console.log(`Remaining: ${afterStats.entriesCount} entries\n`);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Main execution
switch (command) {
  case 'status':
    displayStatus();
    break;

  case 'clear':
    displayClear();
    break;

  case 'prune':
    displayPrune();
    break;

  default:
    console.error(`Unknown command: ${command}`);
    console.error('Usage: context-cache-cli [status|clear|prune]');
    process.exit(1);
}
