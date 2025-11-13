/**
 * Plugin State Detection
 *
 * Determines which plugins are enabled via state file or environment variables.
 * Used by hooks to conditionally load plugin-specific features.
 *
 * Priority (highest to lowest):
 * 1. .claude/.plugin-state file (runtime toggle via commands)
 * 2. MARKETING_PLUGIN_ENABLED env var (session/persistent toggle)
 * 3. Default: disabled
 */

import * as fs from 'fs';
import * as path from 'path';

interface PluginState {
  marketing?: boolean;
  code?: boolean;
  // Future plugins: sales?: boolean, etc.
}

/**
 * Read plugin state from state file
 */
function readPluginState(): PluginState | null {
  try {
    const stateFile = path.join(process.cwd(), '.claude', '.plugin-state');
    if (fs.existsSync(stateFile)) {
      const content = fs.readFileSync(stateFile, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    // Ignore errors, fall back to env var
  }
  return null;
}

/**
 * Check if the marketing plugin is enabled
 *
 * Checks state file first, then falls back to environment variable.
 *
 * @returns true if enabled via state file or MARKETING_PLUGIN_ENABLED=1
 */
export function isMarketingPluginEnabled(): boolean {
  // Check state file first (runtime toggle)
  const state = readPluginState();
  if (state && state.marketing !== undefined) {
    return state.marketing === true;
  }

  // Fall back to environment variable (persistent toggle)
  return process.env.MARKETING_PLUGIN_ENABLED === '1';
}

/**
 * Check if the code plugin is enabled
 *
 * Checks state file first, then falls back to environment variable.
 *
 * @returns true if enabled via state file or CODE_PLUGIN_ENABLED=1
 */
export function isCodePluginEnabled(): boolean {
  // Check state file first (runtime toggle)
  const state = readPluginState();
  if (state && state.code !== undefined) {
    return state.code === true;
  }

  // Fall back to environment variable (persistent toggle)
  return process.env.CODE_PLUGIN_ENABLED === '1';
}

/**
 * Get list of all enabled plugins
 *
 * @returns Array of enabled plugin names
 */
export function getEnabledPlugins(): string[] {
  const plugins: string[] = [];

  if (isMarketingPluginEnabled()) {
    plugins.push('marketing');
  }

  if (isCodePluginEnabled()) {
    plugins.push('code');
  }

  // Future plugins can be added here
  // if (process.env.SALES_PLUGIN_ENABLED === '1') plugins.push('sales');

  return plugins;
}

/**
 * Check if any plugins are enabled
 *
 * @returns true if at least one plugin is enabled
 */
export function hasEnabledPlugins(): boolean {
  return getEnabledPlugins().length > 0;
}
