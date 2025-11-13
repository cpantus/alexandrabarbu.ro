/**
 * Cost Budget Utilities
 *
 * Tracks agent execution costs and monitors budget thresholds.
 * Integrates with agent telemetry to provide budget alerts.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface BudgetConfig {
  daily_limit: number;      // Daily spend limit in USD
  weekly_limit: number;     // Weekly spend limit in USD
  monthly_limit: number;    // Monthly spend limit in USD
  alert_threshold: number;  // Alert when reaching X% of limit (e.g., 0.8 = 80%)
  enabled: boolean;         // Enable/disable budget monitoring
}

export interface SpendRecord {
  date: string;             // ISO date string
  agent: string;            // Agent name
  model: string;            // Model used (sonnet, haiku, etc.)
  input_tokens: number;     // Input tokens used
  output_tokens: number;    // Output tokens generated
  cost: number;             // Estimated cost in USD
  task: string;             // Task description
}

export interface BudgetStatus {
  daily: {
    spent: number;
    limit: number;
    remaining: number;
    percentage: number;
  };
  weekly: {
    spent: number;
    limit: number;
    remaining: number;
    percentage: number;
  };
  monthly: {
    spent: number;
    limit: number;
    remaining: number;
    percentage: number;
  };
  alert: boolean;
  alert_message?: string;
}

/**
 * Model pricing (per million tokens)
 */
const MODEL_PRICING = {
  'claude-sonnet-4-5': {
    input: 3.00,   // $3 per 1M input tokens
    output: 15.00  // $15 per 1M output tokens
  },
  'claude-haiku-3-5': {
    input: 0.25,   // $0.25 per 1M input tokens
    output: 1.25   // $1.25 per 1M output tokens
  }
};

/**
 * Load budget configuration
 */
export function loadBudget(projectRoot: string): BudgetConfig {
  const budgetPath = path.join(projectRoot, 'enhancements', '_cost_budget.json');

  try {
    if (!fs.existsSync(budgetPath)) {
      // Return default config if not exists
      return {
        daily_limit: 5.00,
        weekly_limit: 25.00,
        monthly_limit: 100.00,
        alert_threshold: 0.80,
        enabled: true
      };
    }

    const content = fs.readFileSync(budgetPath, 'utf-8');
    return JSON.parse(content) as BudgetConfig;
  } catch (error) {
    console.error('[cost-budget] Error loading budget config:', error);
    return {
      daily_limit: 5.00,
      weekly_limit: 25.00,
      monthly_limit: 100.00,
      alert_threshold: 0.80,
      enabled: true
    };
  }
}

/**
 * Save budget configuration
 */
export function saveBudget(projectRoot: string, config: BudgetConfig): boolean {
  const budgetPath = path.join(projectRoot, 'enhancements', '_cost_budget.json');

  try {
    // Ensure directory exists
    const enhancementsDir = path.join(projectRoot, 'enhancements');
    if (!fs.existsSync(enhancementsDir)) {
      fs.mkdirSync(enhancementsDir, { recursive: true });
    }

    fs.writeFileSync(budgetPath, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('[cost-budget] Error saving budget config:', error);
    return false;
  }
}

/**
 * Calculate cost for token usage
 */
export function calculateCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  // Normalize model name
  const normalizedModel = model.includes('haiku') ? 'claude-haiku-3-5' : 'claude-sonnet-4-5';

  const pricing = MODEL_PRICING[normalizedModel];
  if (!pricing) {
    console.warn(`[cost-budget] Unknown model: ${model}, using Sonnet pricing`);
    const defaultPricing = MODEL_PRICING['claude-sonnet-4-5'];
    return (
      (inputTokens / 1_000_000) * defaultPricing.input +
      (outputTokens / 1_000_000) * defaultPricing.output
    );
  }

  return (
    (inputTokens / 1_000_000) * pricing.input +
    (outputTokens / 1_000_000) * pricing.output
  );
}

/**
 * Load spend records from telemetry
 */
function loadSpendRecords(projectRoot: string): SpendRecord[] {
  const spendLogPath = path.join(projectRoot, 'enhancements', '_spend_log.json');

  try {
    if (!fs.existsSync(spendLogPath)) {
      return [];
    }

    const content = fs.readFileSync(spendLogPath, 'utf-8');
    const data = JSON.parse(content);
    return data.records || [];
  } catch (error) {
    console.error('[cost-budget] Error loading spend records:', error);
    return [];
  }
}

/**
 * Save spend records
 */
function saveSpendRecords(projectRoot: string, records: SpendRecord[]): boolean {
  const spendLogPath = path.join(projectRoot, 'enhancements', '_spend_log.json');

  try {
    // Ensure directory exists
    const enhancementsDir = path.join(projectRoot, 'enhancements');
    if (!fs.existsSync(enhancementsDir)) {
      fs.mkdirSync(enhancementsDir, { recursive: true });
    }

    const data = {
      records,
      last_updated: new Date().toISOString()
    };

    fs.writeFileSync(spendLogPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('[cost-budget] Error saving spend records:', error);
    return false;
  }
}

/**
 * Track agent spend
 */
export function trackSpend(
  projectRoot: string,
  agent: string,
  model: string,
  inputTokens: number,
  outputTokens: number,
  task: string = 'Unknown task'
): boolean {
  try {
    const cost = calculateCost(model, inputTokens, outputTokens);

    const record: SpendRecord = {
      date: new Date().toISOString(),
      agent,
      model,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost,
      task
    };

    const records = loadSpendRecords(projectRoot);
    records.push(record);

    // Keep only last 1000 records to prevent file bloat
    if (records.length > 1000) {
      records.splice(0, records.length - 1000);
    }

    return saveSpendRecords(projectRoot, records);
  } catch (error) {
    console.error('[cost-budget] Error tracking spend:', error);
    return false;
  }
}

/**
 * Get spend for a specific period
 */
function getSpendForPeriod(records: SpendRecord[], days: number): number {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return records
    .filter(r => new Date(r.date) >= cutoffDate)
    .reduce((sum, r) => sum + r.cost, 0);
}

/**
 * Check budget status
 */
export function checkBudgetStatus(projectRoot: string): BudgetStatus {
  const config = loadBudget(projectRoot);
  const records = loadSpendRecords(projectRoot);

  if (!config.enabled) {
    return {
      daily: { spent: 0, limit: 0, remaining: 0, percentage: 0 },
      weekly: { spent: 0, limit: 0, remaining: 0, percentage: 0 },
      monthly: { spent: 0, limit: 0, remaining: 0, percentage: 0 },
      alert: false
    };
  }

  // Calculate spend for each period
  const dailySpent = getSpendForPeriod(records, 1);
  const weeklySpent = getSpendForPeriod(records, 7);
  const monthlySpent = getSpendForPeriod(records, 30);

  // Check if any alert threshold is exceeded
  const dailyPercentage = (dailySpent / config.daily_limit) * 100;
  const weeklyPercentage = (weeklySpent / config.weekly_limit) * 100;
  const monthlyPercentage = (monthlySpent / config.monthly_limit) * 100;

  const alertThresholdPercent = config.alert_threshold * 100;
  let alert = false;
  let alertMessage: string | undefined;

  if (dailyPercentage >= alertThresholdPercent) {
    alert = true;
    alertMessage = `Daily budget at ${dailyPercentage.toFixed(0)}% ($${dailySpent.toFixed(2)}/$${config.daily_limit.toFixed(2)})`;
  } else if (weeklyPercentage >= alertThresholdPercent) {
    alert = true;
    alertMessage = `Weekly budget at ${weeklyPercentage.toFixed(0)}% ($${weeklySpent.toFixed(2)}/$${config.weekly_limit.toFixed(2)})`;
  } else if (monthlyPercentage >= alertThresholdPercent) {
    alert = true;
    alertMessage = `Monthly budget at ${monthlyPercentage.toFixed(0)}% ($${monthlySpent.toFixed(2)}/$${config.monthly_limit.toFixed(2)})`;
  }

  return {
    daily: {
      spent: dailySpent,
      limit: config.daily_limit,
      remaining: Math.max(0, config.daily_limit - dailySpent),
      percentage: dailyPercentage
    },
    weekly: {
      spent: weeklySpent,
      limit: config.weekly_limit,
      remaining: Math.max(0, config.weekly_limit - weeklySpent),
      percentage: weeklyPercentage
    },
    monthly: {
      spent: monthlySpent,
      limit: config.monthly_limit,
      remaining: Math.max(0, config.monthly_limit - monthlySpent),
      percentage: monthlyPercentage
    },
    alert,
    alert_message: alertMessage
  };
}

/**
 * Format budget alert message
 */
export function formatBudgetAlert(status: BudgetStatus): string {
  if (!status.alert || !status.alert_message) {
    return '';
  }

  const lines = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '💰 BUDGET ALERT',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    `⚠️  ${status.alert_message}`,
    '',
    '📊 Current Spend:',
    `   Daily:   $${status.daily.spent.toFixed(2)} / $${status.daily.limit.toFixed(2)} (${status.daily.percentage.toFixed(0)}%)`,
    `   Weekly:  $${status.weekly.spent.toFixed(2)} / $${status.weekly.limit.toFixed(2)} (${status.weekly.percentage.toFixed(0)}%)`,
    `   Monthly: $${status.monthly.spent.toFixed(2)} / $${status.monthly.limit.toFixed(2)} (${status.monthly.percentage.toFixed(0)}%)`,
    '',
    '💡 Consider:',
    '   • Use Haiku agents for simple tasks (75% cost reduction)',
    '   • Use /two-stage for variant generation (67% savings)',
    '   • Batch similar analyses to leverage prompt caching (85% savings)',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  ];

  return lines.join('\n');
}

/**
 * Get spend summary by agent
 */
export function getSpendByAgent(projectRoot: string, days: number = 7): Map<string, number> {
  const records = loadSpendRecords(projectRoot);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const spendByAgent = new Map<string, number>();

  records
    .filter(r => new Date(r.date) >= cutoffDate)
    .forEach(r => {
      const current = spendByAgent.get(r.agent) || 0;
      spendByAgent.set(r.agent, current + r.cost);
    });

  return spendByAgent;
}

/**
 * Get spend summary by model
 */
export function getSpendByModel(projectRoot: string, days: number = 7): Map<string, number> {
  const records = loadSpendRecords(projectRoot);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const spendByModel = new Map<string, number>();

  records
    .filter(r => new Date(r.date) >= cutoffDate)
    .forEach(r => {
      const current = spendByModel.get(r.model) || 0;
      spendByModel.set(r.model, current + r.cost);
    });

  return spendByModel;
}

/**
 * Reset daily/weekly/monthly spend (for testing or manual reset)
 */
export function resetSpendLog(projectRoot: string): boolean {
  const spendLogPath = path.join(projectRoot, 'enhancements', '_spend_log.json');

  try {
    if (fs.existsSync(spendLogPath)) {
      fs.unlinkSync(spendLogPath);
    }
    return true;
  } catch (error) {
    console.error('[cost-budget] Error resetting spend log:', error);
    return false;
  }
}
