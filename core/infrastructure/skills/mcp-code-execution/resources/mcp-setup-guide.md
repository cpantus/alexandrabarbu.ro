# MCP Setup Guide

Automated generation of TypeScript wrappers for MCP servers using code execution pattern.

---

## Overview

Transform any MCP server from direct tool usage (50K-100K tokens) to filesystem-based code execution (2K-5K tokens).

**One-time setup per MCP server:** 30-60 minutes
**Result:** 96-98% token reduction for all workflows using that server

---

## Quick Setup (Playwright Example)

```bash
# 1. Create directory structure
mkdir -p ./servers/playwright/{_internal,}
mkdir -p ./scripts/playwright/{shared,examples}

# 2. Create minimal wrappers (manual - 2 files)
#    ./servers/playwright/execute.ts
#    ./servers/playwright/screenshot.ts

# 3. Create first workflow script
#    ./scripts/playwright/scrape-page.ts

# 4. Test
npx tsx ./scripts/playwright/scrape-page.ts \
  --url https://example.com \
  --selector .price \
  --output ./data/test.json
```

---

## Directory Structure

```
./servers/[mcp-name]/          # TypeScript wrappers
├── _internal/
│   └── mcp-bridge.ts          # MCP calling infrastructure
├── execute.ts                 # Primary wrapper (run scripts)
├── screenshot.ts              # Verification wrapper (optional)
└── index.ts                   # Exports

./scripts/[mcp-name]/          # Workflow scripts
├── [workflow-1].ts            # e.g., scrape-page.ts
├── [workflow-2].ts            # e.g., monitor-site.ts
├── shared/                    # Reusable utilities
│   ├── config.ts
│   └── retry.ts
└── examples/                  # Templates
    └── example-scrape.ts

./data/[mcp-name]/             # Output (gitignored)
├── scrapes/
├── reports/
└── logs/
```

---

## Step 1: MCP Bridge

Create calling infrastructure once, reuse for all tools.

**File:** `./servers/[mcp-name]/_internal/mcp-bridge.ts`

```typescript
/**
 * MCP Bridge - Calls MCP server tools from TypeScript
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

let client: Client | null = null;

async function getClient(): Promise<Client> {
  if (client) return client;

  // Read MCP config
  const mcpConfig = await import('../../../../.mcp.json', {
    assert: { type: 'json' }
  });

  // Find server config (e.g., 'playwright')
  const serverName = __dirname.split('/').slice(-2, -1)[0];
  const serverConfig = mcpConfig.default.mcpServers[serverName];

  if (!serverConfig) {
    throw new Error(`MCP server '${serverName}' not found in .mcp.json`);
  }

  // Create transport
  const transport = new StdioClientTransport({
    command: serverConfig.command,
    args: serverConfig.args || [],
    env: serverConfig.env || {}
  });

  // Initialize client
  client = new Client({
    name: `${serverName}-code-execution`,
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  await client.connect(transport);
  return client;
}

export async function callMCPTool(toolName: string, args: any): Promise<any> {
  const mcpClient = await getClient();
  const result = await mcpClient.callTool({ name: toolName, arguments: args });
  return result.content;
}

export async function listMCPTools(): Promise<string[]> {
  const mcpClient = await getClient();
  const tools = await mcpClient.listTools();
  return tools.tools.map(t => t.name);
}

export async function closeMCP(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
  }
}
```

---

## Step 2: Minimal Wrappers

Create only 1-2 essential tool wrappers. Everything else becomes scripts.

**File:** `./servers/playwright/execute.ts`

```typescript
/**
 * Playwright Execute Wrapper
 * Runs local TypeScript scripts with Playwright
 */

import { spawn } from 'child_process';
import * as path from 'path';

export interface ExecuteOptions {
  scriptPath: string;
  args?: Record<string, any>;
  timeout?: number;
}

export async function execute(options: ExecuteOptions): Promise<string> {
  const { scriptPath, args = {}, timeout = 30000 } = options;

  // Convert args to CLI format
  const cliArgs = Object.entries(args).flatMap(([key, value]) => [
    `--${key}`,
    String(value)
  ]);

  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['tsx', scriptPath, ...cliArgs], {
      timeout,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => { stdout += data; });
    proc.stderr.on('data', (data) => { stderr += data; });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Script failed (exit ${code}): ${stderr}`));
      }
    });

    proc.on('error', reject);
  });
}
```

**File:** `./servers/playwright/screenshot.ts` (optional)

```typescript
/**
 * Quick screenshot for verification
 */

import { callMCPTool } from './_internal/mcp-bridge.js';

export async function screenshot(url: string, outputPath: string): Promise<string> {
  await callMCPTool('playwright_screenshot', { url, path: outputPath });
  return `Screenshot saved: ${outputPath}`;
}
```

**File:** `./servers/playwright/index.ts`

```typescript
export { execute } from './execute.js';
export { screenshot } from './screenshot.js';
```

---

## Step 3: Workflow Scripts

Production-grade scripts with error handling, retries, logging.

**Template:** `./scripts/playwright/scrape-page.ts`

```typescript
#!/usr/bin/env node
/**
 * Web Scraping Script
 * Usage: npx tsx scrape-page.ts --url URL --selector CSS --output FILE
 */

import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface Config {
  url: string;
  selector: string;
  output: string;
  timeout?: number;
  screenshot?: boolean;
}

async function scrapePage(config: Config): Promise<void> {
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    const page: Page = await browser.newPage();

    console.log(`[scrape] Navigating to: ${config.url}`);
    await page.goto(config.url, { waitUntil: 'networkidle' });

    console.log(`[scrape] Waiting for selector: ${config.selector}`);
    await page.waitForSelector(config.selector, {
      timeout: config.timeout || 5000
    });

    console.log(`[scrape] Extracting data...`);
    const data = await page.$$eval(config.selector, elements =>
      elements.map(el => ({
        text: el.textContent?.trim(),
        html: el.innerHTML,
        href: el.getAttribute('href')
      }))
    );

    if (config.screenshot) {
      const screenshotPath = config.output.replace('.json', '.png');
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`[scrape] Screenshot: ${screenshotPath}`);
    }

    // Ensure output directory exists
    const outputDir = path.dirname(config.output);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(config.output, JSON.stringify({
      url: config.url,
      timestamp: new Date().toISOString(),
      selector: config.selector,
      count: data.length,
      data
    }, null, 2));

    console.log(`✅ Scraped ${data.length} elements → ${config.output}`);

  } catch (error) {
    console.error(`❌ Scraping failed:`, error instanceof Error ? error.message : String(error));
    throw error;
  } finally {
    if (browser) await browser.close();
  }
}

// CLI argument parsing
function parseArgs(): Config {
  const args = process.argv.slice(2);
  const config: any = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];

    if (key === 'timeout') {
      config[key] = parseInt(value);
    } else if (key === 'screenshot') {
      config[key] = true;
      i -= 1; // Boolean flag, no value
    } else {
      config[key] = value;
    }
  }

  if (!config.url || !config.selector || !config.output) {
    console.error('Usage: scrape-page.ts --url URL --selector CSS --output FILE');
    process.exit(1);
  }

  return config as Config;
}

// Execute
const config = parseArgs();
scrapePage(config)
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
```

---

## Step 4: Shared Utilities

Reusable logic across workflow scripts.

**File:** `./scripts/playwright/shared/browser-config.ts`

```typescript
export const BROWSER_CONFIGS = {
  default: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },

  mobile: {
    headless: true,
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
  },

  desktop: {
    headless: true,
    viewport: { width: 1920, height: 1080 }
  }
};
```

**File:** `./scripts/playwright/shared/retry-logic.ts`

```typescript
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;

      console.log(`[retry] Attempt ${attempt} failed, retrying in ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      delayMs *= 2; // Exponential backoff
    }
  }

  throw new Error('Retry failed');
}
```

---

## Testing

```bash
# Test scraping script
npx tsx ./scripts/playwright/scrape-page.ts \
  --url https://example.com/products \
  --selector '.product-title' \
  --output ./data/playwright/test.json

# Verify output
cat ./data/playwright/test.json | jq '.count'

# Test via MCP wrapper
node -e "
  import('./servers/playwright/index.js').then(async ({ execute }) => {
    const result = await execute({
      scriptPath: './scripts/playwright/scrape-page.ts',
      args: {
        url: 'https://example.com',
        selector: '.title',
        output: './data/test2.json'
      }
    });
    console.log(result);
  });
"
```

---

## Extending to Other MCP Servers

Same pattern works for any MCP server:

```bash
# Google Drive
./servers/gdrive/
├── _internal/mcp-bridge.ts
├── execute.ts
└── sync.ts

./scripts/gdrive/
├── sync-folder.ts
├── export-docs.ts
└── shared/auth.ts

# Salesforce
./servers/salesforce/
├── _internal/mcp-bridge.ts
├── execute.ts
└── query.ts

./scripts/salesforce/
├── sync-contacts.ts
├── update-records.ts
└── shared/connection.ts
```

---

## Next Steps

1. **Create structure:** `mkdir -p ./servers/[name] ./scripts/[name]`
2. **Add wrappers:** Copy execute.ts template, adapt for your MCP server
3. **First script:** Implement most common workflow
4. **Test:** Verify 90%+ token reduction
5. **Iterate:** Add more scripts as needed

**See:** `mcp-patterns.md` for composition patterns
**See:** `mcp-examples.md` for complete workflow examples
