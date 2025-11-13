/**
 * Bash Command Optimizer V2
 *
 * Automatically transforms traditional CLI commands to modern alternatives:
 *
 * V1 Tools (File System & Navigation):
 * - grep → ripgrep (rg)
 * - find → fd
 * - cat → bat
 * - ls → exa
 * - tree → tree (with enforced limits)
 * - git → gh (in GitHub context)
 * - cd → zoxide (z) (for frequent paths)
 * - Enables fzf pipelines (interactive scenarios)
 *
 * V2 Tools (Structured Data & Batch Operations):
 * - grep/cat on .json → jq (JSON processor)
 * - grep/cat on .yml/.yaml → yq (YAML processor)
 * - cat large JSON → fx (interactive JSON viewer)
 * - find...exec / xargs → parallel (GNU Parallel)
 * - git diff/show → delta (syntax-highlighted diff)
 * - command chains → just (command runner recipes)
 *
 * Target: 70-85% token savings per session (V2)
 * Approach: Silent optimization with warn-and-fallback
 * Performance: Filesystem caching reduces tool checks from 60ms to <5ms
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface OptimizationResult {
  original: string;
  optimized: string;
  tool: string;
  estimatedTokenSavings: number;
  applied: boolean;
  reason?: string;
}

export interface ToolAvailability {
  rg: boolean;
  fd: boolean;
  bat: boolean;
  exa: boolean;
  tree: boolean;
  gh: boolean;
  fzf: boolean;
  zoxide: boolean;
  jq: boolean;
  yq: boolean;
  parallel: boolean;
  just: boolean;
  delta: boolean;
  fx: boolean;
  zcat: boolean;
}

export interface OptimizationRule {
  name: string;
  pattern: RegExp;
  transform: (match: RegExpMatchArray, tools: ToolAvailability) => string | null;
  tool: string;
  tokenSavings: number;
  priority: number; // Higher = applied first
}

// ============================================================================
// Tool Availability Detection
// ============================================================================

// Cache configuration
const CACHE_DIR = path.join(__dirname, '..', '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'tool-availability.json');
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

let cachedToolAvailability: ToolAvailability | null = null;

/**
 * Check if filesystem cache is fresh (< 24 hours old)
 */
function isCacheFresh(): boolean {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return false;
    }
    const stats = fs.statSync(CACHE_FILE);
    const age = Date.now() - stats.mtimeMs;
    return age < CACHE_TTL;
  } catch {
    return false;
  }
}

/**
 * Read tool availability from filesystem cache
 */
function readCache(): ToolAvailability | null {
  try {
    const data = fs.readFileSync(CACHE_FILE, 'utf-8');
    return JSON.parse(data) as ToolAvailability;
  } catch {
    return null;
  }
}

/**
 * Write tool availability to filesystem cache
 */
function writeCache(availability: ToolAvailability): void {
  try {
    // Debug logging
    if (process.env.CC_BASH_OPT_DEBUG === '1') {
      console.error(`[bash-optimizer] Writing cache to: ${CACHE_FILE}`);
    }

    // Ensure cache directory exists
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      if (process.env.CC_BASH_OPT_DEBUG === '1') {
        console.error(`[bash-optimizer] Created cache directory: ${CACHE_DIR}`);
      }
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify(availability, null, 2), 'utf-8');

    if (process.env.CC_BASH_OPT_DEBUG === '1') {
      console.error(`[bash-optimizer] Cache written successfully`);
    }
  } catch (error) {
    // Log errors in debug mode
    if (process.env.CC_BASH_OPT_DEBUG === '1') {
      console.error(`[bash-optimizer] Cache write failed:`, error);
    }
  }
}

export async function checkToolAvailability(): Promise<ToolAvailability> {
  // 1. Return process-cached result if available (same process)
  if (cachedToolAvailability) {
    if (process.env.CC_BASH_OPT_DEBUG === '1') {
      console.error(`[bash-optimizer] Using process-cached tool availability`);
    }
    return cachedToolAvailability;
  }

  // 2. Check filesystem cache (persists across processes)
  if (isCacheFresh()) {
    const cached = readCache();
    if (cached) {
      if (process.env.CC_BASH_OPT_DEBUG === '1') {
        console.error(`[bash-optimizer] Using filesystem-cached tool availability`);
      }
      cachedToolAvailability = cached;
      return cachedToolAvailability;
    }
  }

  // 3. No valid cache - run tool availability checks
  if (process.env.CC_BASH_OPT_DEBUG === '1') {
    console.error(`[bash-optimizer] Running tool availability checks (no valid cache)`);
  }

  const { execSync } = await import('child_process');

  const checkTool = (tool: string): boolean => {
    try {
      execSync(`which ${tool}`, { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  };

  cachedToolAvailability = {
    rg: checkTool('rg'),
    fd: checkTool('fd'),
    bat: checkTool('bat'),
    exa: checkTool('exa'),
    tree: checkTool('tree'),
    gh: checkTool('gh'),
    fzf: checkTool('fzf'),
    zoxide: checkTool('zoxide'),
    jq: checkTool('jq'),
    yq: checkTool('yq'),
    parallel: checkTool('parallel'),
    just: checkTool('just'),
    delta: checkTool('delta'),
    fx: checkTool('fx'),
    zcat: checkTool('zcat'),
  };

  // 4. Write to filesystem cache for future invocations
  writeCache(cachedToolAvailability);

  return cachedToolAvailability;
}

// ============================================================================
// Optimization Rules
// ============================================================================

export const optimizationRules: OptimizationRule[] = [
  // -------------------------------------------------------------------------
  // RIPGREP (rg) - Highest priority, biggest savings
  // -------------------------------------------------------------------------
  {
    name: 'grep-recursive-to-rg',
    pattern: /grep\s+(-r|-R|--recursive)\s+(?:(-i|--ignore-case)\s+)?["']?([^"'\s]+)["']?\s+(.+)/,
    transform: (match, tools) => {
      if (!tools.rg) return null;
      const [, , ignoreCase, pattern, path] = match;
      const caseFlag = ignoreCase ? '-i ' : '';
      // Auto-detect file type from path
      const typeFlag = detectFileType(path);
      return `rg ${caseFlag}"${pattern}" ${typeFlag}${path}`;
    },
    tool: 'rg',
    tokenSavings: 70,
    priority: 100,
  },
  {
    name: 'grep-simple-to-rg',
    pattern: /grep\s+(?:(-i|--ignore-case)\s+)?["']?([^"'\s]+)["']?\s+(.+)/,
    transform: (match, tools) => {
      if (!tools.rg) return null;
      const [, ignoreCase, pattern, file] = match;
      const caseFlag = ignoreCase ? '-i ' : '';
      return `rg ${caseFlag}"${pattern}" ${file}`;
    },
    tool: 'rg',
    tokenSavings: 60,
    priority: 95,
  },
  {
    name: 'grep-pipe-to-rg',
    pattern: /\|\s*grep\s+(?:(-i|--ignore-case)\s+)?["']([^"']+)["']/,
    transform: (match, tools) => {
      if (!tools.rg) return null;
      const [, ignoreCase, pattern] = match;
      const caseFlag = ignoreCase ? '-i ' : '';
      return `| rg ${caseFlag}"${pattern}"`;
    },
    tool: 'rg',
    tokenSavings: 40,
    priority: 90,
  },

  // -------------------------------------------------------------------------
  // JQ - JSON Processor (V2) - Highest priority for structured data
  // -------------------------------------------------------------------------
  {
    name: 'grep-json-to-jq',
    pattern: /grep\s+(?:(-i|--ignore-case)\s+)?["']?([^"'\s]+)["']?\s+([^\s]+\.json)/,
    transform: (match, tools) => {
      if (!tools.jq) return null;
      const [, ignoreCase, pattern, file] = match;
      // Simple grep on JSON → jq search
      return `jq -r 'recurse | select(type == "string" and test("${pattern}"; "${ignoreCase ? 'i' : ''}"))' ${file}`;
    },
    tool: 'jq',
    tokenSavings: 80,
    priority: 98,
  },
  {
    name: 'cat-json-pipe-grep-to-jq',
    pattern: /cat\s+([^\s]+\.json)\s*\|\s*grep\s+["']([^"']+)["']/,
    transform: (match, tools) => {
      if (!tools.jq) return null;
      const [, file, pattern] = match;
      return `jq -r 'recurse | select(type == "string" and test("${pattern}"))' ${file}`;
    },
    tool: 'jq',
    tokenSavings: 85,
    priority: 97,
  },
  {
    name: 'cat-json-to-jq-compact',
    pattern: /cat\s+([^\s|]+\.json)(?:\s*\|)?$/,
    transform: (match, tools) => {
      if (!tools.jq) return null;
      const [, file] = match;
      // Reading JSON file → pretty print with jq
      return `jq '.' ${file}`;
    },
    tool: 'jq',
    tokenSavings: 75,
    priority: 96,
  },
  {
    name: 'jq-extract-key',
    pattern: /grep\s+["']([^"']+)["'].*?([^\s]+\.json)/,
    transform: (match, tools) => {
      if (!tools.jq) return null;
      const [, key, file] = match;
      // Extract specific key from JSON
      return `jq -r '.${key}' ${file}`;
    },
    tool: 'jq',
    tokenSavings: 80,
    priority: 95,
  },

  // -------------------------------------------------------------------------
  // YQ - YAML Processor (V2) - High priority for YAML operations
  // -------------------------------------------------------------------------
  {
    name: 'grep-yaml-to-yq',
    pattern: /grep\s+(?:(-i|--ignore-case)\s+)?["']?([^"'\s]+)["']?\s+([^\s]+\.ya?ml)/,
    transform: (match, tools) => {
      if (!tools.yq) return null;
      const [, ignoreCase, pattern, file] = match;
      // Simple grep on YAML → yq eval with select
      return `yq eval '.. | select(. == "*${pattern}*")' ${file}`;
    },
    tool: 'yq',
    tokenSavings: 80,
    priority: 98,
  },
  {
    name: 'cat-yaml-pipe-grep-to-yq',
    pattern: /cat\s+([^\s]+\.ya?ml)\s*\|\s*grep\s+["']([^"']+)["']/,
    transform: (match, tools) => {
      if (!tools.yq) return null;
      const [, file, pattern] = match;
      return `yq eval '.. | select(. == "*${pattern}*")' ${file}`;
    },
    tool: 'yq',
    tokenSavings: 85,
    priority: 97,
  },
  {
    name: 'cat-yaml-to-yq',
    pattern: /cat\s+([^\s|]+\.ya?ml)(?:\s*\|)?$/,
    transform: (match, tools) => {
      if (!tools.yq) return null;
      const [, file] = match;
      // Reading YAML file → pretty print with yq
      return `yq eval '.' ${file}`;
    },
    tool: 'yq',
    tokenSavings: 75,
    priority: 96,
  },
  {
    name: 'yq-extract-key',
    pattern: /grep\s+["']([^"']+)["'].*?([^\s]+\.ya?ml)/,
    transform: (match, tools) => {
      if (!tools.yq) return null;
      const [, key, file] = match;
      // Extract specific key from YAML
      return `yq eval '.${key}' ${file}`;
    },
    tool: 'yq',
    tokenSavings: 80,
    priority: 95,
  },

  // -------------------------------------------------------------------------
  // FX - Interactive JSON Viewer (V2) - Prevents token explosion on large files
  // -------------------------------------------------------------------------
  {
    name: 'cat-large-json-to-fx',
    pattern: /cat\s+([^\s|]+\.json)$/,
    transform: (match, tools) => {
      if (!tools.fx) return null;
      const [, file] = match;
      // Check file size - only apply fx to large files (>1KB)
      try {
        const fs = require('fs');
        const stats = fs.statSync(file);
        if (stats.size > 1024) {
          // Large JSON file - use fx for interactive exploration
          return `fx ${file}`;
        }
      } catch {
        // If file check fails, fall back to original
        return null;
      }
      return null;
    },
    tool: 'fx',
    tokenSavings: 85,
    priority: 92,
  },
  {
    name: 'less-json-to-fx',
    pattern: /less\s+([^\s]+\.json)$/,
    transform: (match, tools) => {
      if (!tools.fx) return null;
      const [, file] = match;
      // less on JSON → fx for better interaction
      return `fx ${file}`;
    },
    tool: 'fx',
    tokenSavings: 80,
    priority: 91,
  },

  // -------------------------------------------------------------------------
  // FD - Fast file finding
  // -------------------------------------------------------------------------
  {
    name: 'find-name-to-fd',
    pattern: /find\s+(\S+)\s+-name\s+["']([^"']+)["']/,
    transform: (match, tools) => {
      if (!tools.fd) return null;
      const [, path, pattern] = match;
      // Convert glob pattern to fd regex
      const fdPattern = pattern.replace(/\*/g, '').replace(/\./g, '\\.');
      return `fd "${fdPattern}" ${path}`;
    },
    tool: 'fd',
    tokenSavings: 50,
    priority: 85,
  },
  {
    name: 'find-type-f-to-fd',
    pattern: /find\s+(\S+)\s+-type\s+f\s+-name\s+["']([^"']+)["']/,
    transform: (match, tools) => {
      if (!tools.fd) return null;
      const [, path, pattern] = match;
      const fdPattern = pattern.replace(/\*/g, '').replace(/\./g, '\\.');
      return `fd -t f "${fdPattern}" ${path}`;
    },
    tool: 'fd',
    tokenSavings: 50,
    priority: 86,
  },
  {
    name: 'find-extension-to-fd',
    pattern: /find\s+(\S+)\s+-name\s+["']\*\.([^"']+)["']/,
    transform: (match, tools) => {
      if (!tools.fd) return null;
      const [, path, ext] = match;
      return `fd -e ${ext} ${path}`;
    },
    tool: 'fd',
    tokenSavings: 45,
    priority: 87,
  },

  // -------------------------------------------------------------------------
  // BAT - Syntax-highlighted preview (CRITICAL: Always add line limits)
  // -------------------------------------------------------------------------
  {
    name: 'cat-to-bat',
    pattern: /^cat\s+([^\s|>]+)$/,
    transform: (match, tools) => {
      if (!tools.bat) return null;
      const [, file] = match;
      // CRITICAL: Always limit line range to prevent token explosion
      return `bat --line-range 1:200 ${file}`;
    },
    tool: 'bat',
    tokenSavings: 30,
    priority: 80,
  },
  {
    name: 'cat-pipe-to-bat',
    pattern: /^cat\s+([^\s>]+)\s*\|/,
    transform: (match, tools) => {
      if (!tools.bat) return null;
      const [fullMatch, file] = match;
      // Replace cat with bat in piped commands
      return fullMatch.replace(/^cat/, 'bat --line-range 1:500');
    },
    tool: 'bat',
    tokenSavings: 25,
    priority: 81,
  },
  {
    name: 'cat-multiple-to-bat',
    pattern: /^cat\s+([^\s|>]+(?:\s+[^\s|>]+)+)$/,
    transform: (match, tools) => {
      if (!tools.bat) return null;
      const [, files] = match;
      return `bat --line-range 1:200 ${files}`;
    },
    tool: 'bat',
    tokenSavings: 25,
    priority: 79,
  },

  // -------------------------------------------------------------------------
  // GNU PARALLEL (V2) - Batch operations optimization
  // -------------------------------------------------------------------------
  {
    name: 'find-exec-to-parallel',
    pattern: /find\s+(.+?)\s+-exec\s+(.+?)\s+\{\}\s*\\?;/,
    transform: (match, tools) => {
      if (!tools.parallel || !tools.fd) return null;
      const [, findPath, command] = match;
      // Convert find...exec to fd | parallel for faster execution
      // Extract file pattern if present
      const nameMatch = findPath.match(/-name\s+["']([^"']+)["']/);
      if (nameMatch) {
        const pattern = nameMatch[1].replace(/\*/g, '').replace(/\./g, '\\.');
        const basePath = findPath.split('-name')[0].trim();
        return `fd "${pattern}" ${basePath} | parallel ${command}`;
      }
      return `fd ${findPath} | parallel ${command}`;
    },
    tool: 'parallel',
    tokenSavings: 50,
    priority: 82,
  },
  {
    name: 'xargs-to-parallel',
    pattern: /\|\s*xargs\s+(?:-I\s*\{\}?\s+)?(.+)/,
    transform: (match, tools) => {
      if (!tools.parallel) return null;
      const [, command] = match;
      // Convert xargs to parallel for better performance
      return `| parallel ${command}`;
    },
    tool: 'parallel',
    tokenSavings: 45,
    priority: 81,
  },
  {
    name: 'find-xargs-to-fd-parallel',
    pattern: /find\s+(.+?)\s+\|\s*xargs\s+(.+)/,
    transform: (match, tools) => {
      if (!tools.parallel || !tools.fd) return null;
      const [, findArgs, command] = match;
      // Convert find | xargs to fd | parallel
      const nameMatch = findArgs.match(/-name\s+["']([^"']+)["']/);
      if (nameMatch) {
        const pattern = nameMatch[1].replace(/\*/g, '').replace(/\./g, '\\.');
        const basePath = findArgs.split('-name')[0].trim();
        return `fd "${pattern}" ${basePath} | parallel ${command}`;
      }
      return `fd ${findArgs} | parallel ${command}`;
    },
    tool: 'parallel',
    tokenSavings: 55,
    priority: 83,
  },

  // -------------------------------------------------------------------------
  // EXA - Git-aware listing
  // -------------------------------------------------------------------------
  {
    name: 'ls-any-flags-to-exa',
    pattern: /^ls\s+(-[\w]+)\s*(.*)$/,
    transform: (match, tools) => {
      if (!tools.exa) return null;
      const [, flags, path] = match;
      // Map common ls flags to exa equivalents
      let exaFlags = '--git';
      if (flags.includes('l')) exaFlags += ' -l';
      if (flags.includes('a')) exaFlags += ' -a';
      if (flags.includes('h')) exaFlags += ' -h';
      if (flags.includes('t')) exaFlags += ' --sort modified';
      if (flags.includes('r')) exaFlags += ' --reverse';
      return `exa ${exaFlags} ${path}`.trim();
    },
    tool: 'exa',
    tokenSavings: 15,
    priority: 75,
  },
  {
    name: 'ls-recent-to-exa',
    pattern: /ls\s+-lt\s*(.*)$/,
    transform: (match, tools) => {
      if (!tools.exa) return null;
      const [, path] = match;
      return `exa --sort modified -l ${path}`.trim();
    },
    tool: 'exa',
    tokenSavings: 15,
    priority: 76,
  },
  {
    name: 'ls-simple-to-exa',
    pattern: /^ls\s+(?!-)(.+)$/,
    transform: (match, tools) => {
      if (!tools.exa) return null;
      const [, path] = match;
      return `exa ${path}`;
    },
    tool: 'exa',
    tokenSavings: 10,
    priority: 70,
  },

  // -------------------------------------------------------------------------
  // TREE - CRITICAL: Enforce depth limits
  // -------------------------------------------------------------------------
  {
    name: 'tree-unlimited-to-limited',
    pattern: /^tree(?:\s+(?!-L)(.*))?$/,
    transform: (match, tools) => {
      const args = match[1] || '';
      // CRITICAL: Always enforce depth limit and exclude common dirs
      return `tree -L 2 -I 'node_modules|dist|.git|build|coverage' ${args}`.trim();
    },
    tool: 'tree',
    tokenSavings: 85,
    priority: 95, // High priority - prevent token explosion
  },
  {
    name: 'tree-excessive-depth',
    pattern: /tree\s+-L\s+([5-9]|\d{2,})/,
    transform: (match, tools) => {
      const [fullMatch] = match;
      // Cap depth at 3 for safety
      return fullMatch.replace(/-L\s+\d+/, '-L 3');
    },
    tool: 'tree',
    tokenSavings: 70,
    priority: 96,
  },

  // -------------------------------------------------------------------------
  // WC - Word/line counting with modern alternatives
  // -------------------------------------------------------------------------
  {
    name: 'wc-lines-to-rg',
    pattern: /^wc\s+-l\s+([^\|]+)$/,
    transform: (match, tools) => {
      if (!tools.rg) return null;
      const [, files] = match;
      // Use rg for line counting - faster and more efficient
      return `rg -c "" ${files}`;
    },
    tool: 'rg',
    tokenSavings: 20,
    priority: 73,
  },

  // -------------------------------------------------------------------------
  // GITHUB CLI (gh) - Context-aware replacement
  // -------------------------------------------------------------------------
  {
    name: 'git-log-pr-to-gh',
    pattern: /git\s+log\s+.*?(?:--oneline|--pretty).*?(?:HEAD|origin|master|main)/,
    transform: (match, tools) => {
      if (!tools.gh) return null;
      // In PR context, use gh instead
      return 'gh pr list --limit 20 --json number,title,author,createdAt';
    },
    tool: 'gh',
    tokenSavings: 40,
    priority: 85,
  },
  {
    name: 'git-diff-to-gh-pr-diff',
    pattern: /git\s+diff\s+(?:HEAD|origin|master|main)/,
    transform: (match, tools) => {
      if (!tools.gh) return null;
      return 'gh pr diff';
    },
    tool: 'gh',
    tokenSavings: 35,
    priority: 84,
  },

  // -------------------------------------------------------------------------
  // DELTA (V2) - Syntax-highlighted diff pager
  // -------------------------------------------------------------------------
  {
    name: 'git-diff-with-delta',
    pattern: /^git\s+diff(?:\s+(.*))?$/,
    transform: (match, tools) => {
      if (!tools.delta) return null;
      const [, args] = match;
      // Enhance git diff with delta pager
      const diffArgs = args || '';
      return `git diff ${diffArgs} | delta`;
    },
    tool: 'delta',
    tokenSavings: 40,
    priority: 78,
  },
  {
    name: 'git-show-with-delta',
    pattern: /^git\s+show(?:\s+(.*))?$/,
    transform: (match, tools) => {
      if (!tools.delta) return null;
      const [, args] = match;
      return `git show ${args || ''} | delta`;
    },
    tool: 'delta',
    tokenSavings: 40,
    priority: 77,
  },
  {
    name: 'git-log-patch-with-delta',
    pattern: /^git\s+log\s+(-p|--patch)(?:\s+(.*))?$/,
    transform: (match, tools) => {
      if (!tools.delta) return null;
      const [, patchFlag, args] = match;
      return `git log ${patchFlag} ${args || ''} | delta`;
    },
    tool: 'delta',
    tokenSavings: 45,
    priority: 76,
  },

  // -------------------------------------------------------------------------
  // JUST (V2) - Command runner for justfile recipes
  // -------------------------------------------------------------------------
  {
    name: 'detect-justfile-recipe',
    pattern: /^(npm\s+run|yarn|make)\s+(\w+)$/,
    transform: (match, tools) => {
      if (!tools.just) return null;
      const [, _command, recipe] = match;
      // Check if justfile exists in current directory
      try {
        const fs = require('fs');
        const path = require('path');
        const cwd = process.cwd();
        const justfilePath = path.join(cwd, 'justfile');
        const justfileAltPath = path.join(cwd, 'Justfile');

        if (fs.existsSync(justfilePath) || fs.existsSync(justfileAltPath)) {
          // Justfile exists - suggest using just
          return `just ${recipe}`;
        }
      } catch {
        // If check fails, return null
        return null;
      }
      return null;
    },
    tool: 'just',
    tokenSavings: 30,
    priority: 72,
  },
  {
    name: 'long-command-chain-to-just',
    pattern: /^(.+\s+&&\s+.+\s+&&\s+.+)$/,
    transform: (match, tools) => {
      if (!tools.just) return null;
      // Suggest using just for complex command chains (3+ commands)
      // This is more of a hint - we can't auto-convert without knowing recipes
      // Return null to keep original but log suggestion
      return null; // Keep original, just is context-dependent
    },
    tool: 'just',
    tokenSavings: 25,
    priority: 71,
  },

  // -------------------------------------------------------------------------
  // ZOXIDE - Smart directory navigation (lower priority)
  // -------------------------------------------------------------------------
  {
    name: 'cd-frequent-to-zoxide',
    pattern: /cd\s+.*?(frontend|backend|src|components|utils|hooks|services)/i,
    transform: (match, tools) => {
      if (!tools.zoxide) return null;
      const [, dir] = match;
      return `z ${dir}`;
    },
    tool: 'zoxide',
    tokenSavings: 10,
    priority: 60,
  },

  // -------------------------------------------------------------------------
  // COMPOSITE PIPELINES - High-value combinations
  // -------------------------------------------------------------------------
  {
    name: 'find-grep-to-fd-rg',
    pattern: /find\s+(\S+).*?-name\s+["']([^"']+)["'].*?\|\s*xargs\s+grep\s+["']([^"']+)["']/,
    transform: (match, tools) => {
      if (!tools.fd || !tools.rg) return null;
      const [, path, filePattern, searchPattern] = match;
      const ext = filePattern.match(/\.(\w+)/)?.[1];
      const fdPart = ext ? `fd -e ${ext}` : `fd "${filePattern}"`;
      return `${fdPart} ${path} | xargs rg "${searchPattern}"`;
    },
    tool: 'fd+rg',
    tokenSavings: 80,
    priority: 110, // Highest - composite wins
  },
  {
    name: 'find-cat-to-fd-bat',
    pattern: /find\s+(\S+).*?-name\s+["']([^"']+)["'].*?\|\s*xargs\s+cat/,
    transform: (match, tools) => {
      if (!tools.fd || !tools.bat) return null;
      const [, path, filePattern] = match;
      const ext = filePattern.match(/\.(\w+)/)?.[1];
      const fdPart = ext ? `fd -e ${ext}` : `fd "${filePattern}"`;
      return `${fdPart} ${path} | xargs bat --line-range 1:200`;
    },
    tool: 'fd+bat',
    tokenSavings: 65,
    priority: 105,
  },

  // -------------------------------------------------------------------------
  // COMPRESSION HANDLING (V2.5) - Prevent token explosion on .gz files
  // -------------------------------------------------------------------------
  {
    name: 'cat-gzip-to-zcat-head',
    pattern: /cat\s+([^\s]+\.gz)(?:\s*\|)?$/,
    transform: (match, tools) => {
      if (!tools.zcat) return null;
      const [, file] = match;
      // Auto-sample first 100 lines from compressed file
      return `zcat ${file} | head -n 100`;
    },
    tool: 'zcat',
    tokenSavings: 95,
    priority: 94,
  },
  {
    name: 'zcat-without-limit-to-head',
    pattern: /^zcat\s+([^\s|]+)$/,
    transform: (match, tools) => {
      if (!tools.zcat) return null;
      const [, file] = match;
      // Always limit decompressed output to prevent token explosion
      return `zcat ${file} | head -n 100`;
    },
    tool: 'zcat',
    tokenSavings: 90,
    priority: 93,
  },
  {
    name: 'gunzip-cat-to-zcat-head',
    pattern: /gunzip\s+(?:-c\s+)?([^\s]+\.gz)(?:\s*\|)?$/,
    transform: (match, tools) => {
      if (!tools.zcat) return null;
      const [, file] = match;
      // zcat is equivalent to gunzip -c, but cleaner
      return `zcat ${file} | head -n 100`;
    },
    tool: 'zcat',
    tokenSavings: 90,
    priority: 92,
  },
  {
    name: 'zcat-grep-to-zcat-head-grep',
    pattern: /zcat\s+([^\s]+)\s*\|\s*grep\s+["']([^"']+)["']/,
    transform: (match, tools) => {
      if (!tools.zcat) return null;
      const [, file, pattern] = match;
      // Limit decompressed data before grepping
      return `zcat ${file} | head -n 1000 | grep "${pattern}"`;
    },
    tool: 'zcat',
    tokenSavings: 85,
    priority: 91,
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

function detectFileType(path: string): string {
  const typeMap: Record<string, string> = {
    '.ts': '--type ts ',
    '.tsx': '--type ts ',
    '.js': '--type js ',
    '.jsx': '--type js ',
    '.py': '--type py ',
    '.md': '--type md ',
    '.json': '--type json ',
    '.yml': '--type yaml ',
    '.yaml': '--type yaml ',
  };

  for (const [ext, flag] of Object.entries(typeMap)) {
    if (path.includes(ext)) {
      return flag;
    }
  }

  return '';
}

function estimateTokens(command: string): number {
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil(command.length / 4);
}

// ============================================================================
// Main Optimization Function
// ============================================================================

export async function optimizeBashCommand(
  command: string
): Promise<OptimizationResult> {
  const tools = await checkToolAvailability();

  // Sort rules by priority (highest first)
  const sortedRules = [...optimizationRules].sort((a, b) => b.priority - a.priority);

  // Try each rule
  for (const rule of sortedRules) {
    const match = command.match(rule.pattern);
    if (match) {
      const optimized = rule.transform(match, tools);
      if (optimized) {
        return {
          original: command,
          optimized,
          tool: rule.tool,
          estimatedTokenSavings: rule.tokenSavings,
          applied: true,
        };
      } else {
        // Tool not available - return fallback
        return {
          original: command,
          optimized: command,
          tool: rule.tool,
          estimatedTokenSavings: 0,
          applied: false,
          reason: `Tool ${rule.tool} not available - using original command`,
        };
      }
    }
  }

  // No optimization rule matched
  return {
    original: command,
    optimized: command,
    tool: 'none',
    estimatedTokenSavings: 0,
    applied: false,
  };
}

// ============================================================================
// Telemetry Integration
// ============================================================================

export interface OptimizationStats {
  totalOptimizations: number;
  byTool: Record<string, number>;
  estimatedTokensSaved: number;
  failedOptimizations: number;
  preventedSuboptimalCommands: number; // NEW: Track educational wins
}

let sessionStats: OptimizationStats = {
  totalOptimizations: 0,
  byTool: {},
  estimatedTokensSaved: 0,
  failedOptimizations: 0,
  preventedSuboptimalCommands: 0, // NEW: Initialize counter
};

export function trackOptimization(result: OptimizationResult, executionTime?: number): void {
  if (result.applied) {
    sessionStats.totalOptimizations++;
    sessionStats.byTool[result.tool] = (sessionStats.byTool[result.tool] || 0) + 1;
    sessionStats.estimatedTokensSaved += result.estimatedTokenSavings;

    // Track prevented suboptimal commands (educational metric)
    if (result.optimized !== result.original) {
      sessionStats.preventedSuboptimalCommands++;
    }
  } else if (result.reason) {
    sessionStats.failedOptimizations++;
  }

  // Log the optimization event (async)
  try {
    import('./bash-optimizer-logger').then(({ logOptimization }) => {
      logOptimization({
        timestamp: new Date().toISOString(),
        original: result.original,
        optimized: result.optimized,
        tool: result.tool,
        tokensSaved: result.estimatedTokenSavings,
        executionTime: executionTime || 0,
        applied: result.applied,
        reason: result.reason,
      });
    }).catch(() => {
      // Silent fail - logging is optional
    });
  } catch {
    // Silent fail
  }
}

export function getOptimizationStats(): OptimizationStats {
  return { ...sessionStats };
}

export function resetOptimizationStats(): void {
  sessionStats = {
    totalOptimizations: 0,
    byTool: {},
    estimatedTokensSaved: 0,
    failedOptimizations: 0,
    preventedSuboptimalCommands: 0,
  };
}

// ============================================================================
// Advanced Features
// ============================================================================

/**
 * Detect if we're in a GitHub/PR context
 */
export function isGitHubContext(): boolean {
  const { execSync } = require('child_process');
  try {
    const remoteUrl = execSync('git remote get-url origin', {
      stdio: 'pipe',
      encoding: 'utf-8',
    }).trim();
    return remoteUrl.includes('github.com');
  } catch {
    return false;
  }
}

/**
 * Build optimized pipeline for common search workflows
 */
export function buildSearchPipeline(
  searchPattern: string,
  filePattern?: string,
  preview: boolean = true
): string {
  const tools = cachedToolAvailability;
  if (!tools) return `grep -r "${searchPattern}" .`;

  const parts: string[] = [];

  // Step 1: Find files
  if (filePattern && tools.fd) {
    const ext = filePattern.match(/\.(\w+)/)?.[1];
    parts.push(ext ? `fd -e ${ext}` : `fd "${filePattern}"`);
  } else if (tools.fd) {
    parts.push('fd');
  }

  // Step 2: Search content
  if (tools.rg) {
    if (parts.length > 0) {
      parts.push(`xargs rg "${searchPattern}"`);
    } else {
      parts.push(`rg "${searchPattern}"`);
    }
  } else {
    parts.push(`grep -r "${searchPattern}" .`);
  }

  // Step 3: Preview (if requested and in interactive mode)
  if (preview && tools.bat && process.stdout.isTTY) {
    parts.push('xargs bat --line-range 1:50');
  }

  return parts.join(' | ');
}

// ============================================================================
// Exports
// ============================================================================

export default {
  optimizeBashCommand,
  checkToolAvailability,
  trackOptimization,
  getOptimizationStats,
  resetOptimizationStats,
  buildSearchPipeline,
  isGitHubContext,
};
