# MCP Workflow Examples

Complete production workflows with token comparisons.

---

## Example 1: Competitor Price Monitoring

**Use case:** Daily scraping of 5 competitor sites for pricing data.

### Traditional Approach (85K tokens)

```
User: "Scrape prices from acme.com, beta.com, gamma.com"

Claude loads Playwright MCP:
├─ 50K tokens: All tool definitions
├─ 15K tokens: For each site (navigate, getText, screenshot)
├─ 20K tokens: All page content + images in context
└─ Total: 85K tokens, $0.26, 35 seconds
```

### Code Execution Approach (3K tokens)

```
User: "Scrape prices from acme.com, beta.com, gamma.com"

Hook detects MCP opportunity:
🎯 Recommended: Code execution pattern (96% reduction)

Claude executes:
await playwright_execute('./scripts/playwright/scrape-prices.ts', {
  urls: ['acme.com', 'beta.com', 'gamma.com'],
  selector: '.price',
  output: './data/prices-2025-11-12.json'
});

Returns: "✅ Scraped 47 prices → prices-2025-11-12.json"

Total: 3K tokens, $0.009, 8 seconds
```

**Script:** `./scripts/playwright/scrape-prices.ts`

```typescript
import { chromium } from 'playwright';
import * as fs from 'fs';

async function scrapePrices(config: {
  urls: string[];
  selector: string;
  output: string;
}) {
  const results = await Promise.all(
    config.urls.map(async (url) => {
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();

      try {
        await page.goto(`https://${url}/products`);
        await page.waitForSelector(config.selector, { timeout: 5000 });

        const prices = await page.$$eval(config.selector, elements =>
          elements.map(el => ({
            product: el.closest('.product')?.querySelector('.name')?.textContent,
            price: parseFloat(el.textContent?.replace(/[^0-9.]/g, '') || '0'),
            currency: el.textContent?.match(/[$€£]/)?.[0] || '$'
          }))
        );

        return { site: url, prices, success: true };
      } catch (error) {
        return { site: url, error: error.message, success: false };
      } finally {
        await browser.close();
      }
    })
  );

  const allPrices = results.flatMap(r => r.success ? r.prices : []);

  fs.writeFileSync(config.output, JSON.stringify({
    timestamp: new Date().toISOString(),
    sites: results.map(r => r.site),
    totalPrices: allPrices.length,
    data: allPrices
  }, null, 2));

  console.log(`✅ Scraped ${allPrices.length} prices → ${config.output}`);
}
```

**Savings:** 96% tokens | 97% cost | 4× faster

---

## Example 2: UI Testing - Checkout Flow

**Use case:** E2E testing across 3 browsers × 2 viewports daily.

### Traditional Approach (120K tokens)

```
6 combinations (Chrome/Firefox/Safari × mobile/desktop)
Each test:
├─ playwright_navigate
├─ playwright_fill (email, card)
├─ playwright_click (submit)
├─ playwright_waitForSelector (confirmation)
├─ playwright_screenshot
└─ 20K tokens per test × 6 = 120K tokens

Total: 120K tokens, $0.36, 60 seconds
```

### Code Execution Approach (4K tokens)

```
await playwright_execute('./scripts/playwright/test-checkout.ts', {
  browsers: ['chromium', 'firefox', 'webkit'],
  viewports: ['mobile', 'desktop'],
  output: './reports/checkout-test.html'
});

Returns:
"✅ 6/6 tests passed
 ⏱️  12 seconds
 📊 Report: ./reports/checkout-test.html"

Total: 4K tokens, $0.012, 12 seconds
```

**Script:** `./scripts/playwright/test-checkout.ts`

```typescript
import { chromium, firefox, webkit } from 'playwright';
import * as fs from 'fs';

const BROWSERS = { chromium, firefox, webkit };

const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  desktop: { width: 1920, height: 1080 }
};

async function testCheckout(config) {
  const results = [];

  for (const browserName of config.browsers) {
    for (const viewportName of config.viewports) {
      const browser = await BROWSERS[browserName].launch({ headless: true });
      const context = await browser.newContext({
        viewport: VIEWPORTS[viewportName]
      });
      const page = await context.newPage();

      const testName = `${browserName}-${viewportName}`;

      try {
        // Navigate to checkout
        await page.goto('https://test-shop.example.com/checkout');

        // Fill form
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('input[name="card"]', '4242424242424242');
        await page.fill('input[name="expiry"]', '12/25');
        await page.fill('input[name="cvc"]', '123');

        // Submit
        await page.click('button[type="submit"]');

        // Wait for confirmation
        await page.waitForSelector('.confirmation', { timeout: 10000 });

        // Verify
        const confirmText = await page.$eval('.confirmation', el => el.textContent);
        const success = confirmText?.includes('Thank you');

        results.push({ test: testName, passed: success, duration: 0 });

      } catch (error) {
        results.push({ test: testName, passed: false, error: error.message });
      } finally {
        await browser.close();
      }
    }
  }

  // Generate report
  const passed = results.filter(r => r.passed).length;
  const failed = results.length - passed;

  const html = `
    <h1>Checkout Test Results</h1>
    <p>✅ ${passed} passed | ❌ ${failed} failed</p>
    <ul>${results.map(r => `<li>${r.test}: ${r.passed ? '✅' : '❌'}</li>`).join('')}</ul>
  `;

  fs.writeFileSync(config.output, html);

  console.log(`✅ ${passed}/${results.length} tests passed`);
  console.log(`📊 Report: ${config.output}`);
}
```

**Savings:** 97% tokens | 97% cost | 5× faster

---

## Example 3: Site Monitoring (24/7)

**Use case:** Monitor 10 sites every 15 minutes for uptime/performance.

### Traditional Approach (Infeasible)

```
10 sites × 96 checks/day = 960 checks
Each check: 65K tokens
Daily total: 62.4M tokens

Cost: $187/day = $5,610/month
Problem: Exceeds context limits, unsustainable cost
```

### Code Execution Approach (2.5K tokens/check)

```
Cron: */15 * * * * (every 15 minutes)

Script runs:
await playwright_execute('./scripts/playwright/monitor-sites.ts', {
  sites: './config/sites.json',
  threshold: 2000,  // 2s max load time
  alert: 'slack://devops-alerts'
});

Returns:
"✅ 9/10 sites healthy
 ❌ beta.com DOWN (timeout)
 📊 Avg load: 1.2s
 🔔 Alert sent"

Daily total: 2.4M tokens (960 × 2.5K)
Cost: $7.20/day = $216/month
```

**Script:** `./scripts/playwright/monitor-sites.ts`

```typescript
import { chromium } from 'playwright';
import * as fs from 'fs';

async function monitorSites(config) {
  const sites = JSON.parse(fs.readFileSync(config.sites, 'utf8'));
  const results = [];

  for (const site of sites) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const startTime = Date.now();

    try {
      await page.goto(site.url, { timeout: config.threshold });
      const loadTime = Date.now() - startTime;

      // Check critical element
      const hasElement = await page.$(site.healthCheckSelector) !== null;

      results.push({
        url: site.url,
        status: hasElement ? 'UP' : 'DEGRADED',
        loadTime,
        healthy: hasElement && loadTime < config.threshold
      });

    } catch (error) {
      results.push({
        url: site.url,
        status: 'DOWN',
        error: error.message,
        healthy: false
      });
    } finally {
      await browser.close();
    }
  }

  // Alert on failures
  const unhealthy = results.filter(r => !r.healthy);
  if (unhealthy.length > 0 && config.alert) {
    await sendAlert(config.alert, unhealthy);
  }

  // Summary
  const healthy = results.filter(r => r.healthy).length;
  const avgLoad = results
    .filter(r => r.loadTime)
    .reduce((sum, r) => sum + r.loadTime, 0) / results.length;

  console.log(`✅ ${healthy}/${results.length} sites healthy`);
  console.log(`📊 Avg load: ${Math.round(avgLoad)}ms`);

  if (unhealthy.length > 0) {
    console.log(`❌ Down: ${unhealthy.map(r => r.url).join(', ')}`);
  }
}

async function sendAlert(webhook: string, failures: any[]) {
  // Send to Slack/Discord/etc
  console.log(`🔔 Alert sent: ${failures.length} sites down`);
}
```

**Savings:** 96% tokens | $5,394/month saved | Enables 24/7 monitoring

---

## Example 4: Data Migration (1000 records)

**Use case:** Migrate product catalog from old site to new CMS.

### Traditional Approach (Infeasible)

```
1000 products × 95K tokens each = 95M tokens
Exceeds context limit - would need 5+ sessions
Manual chunking, state management, error recovery
Estimated: 24+ hours manual work
```

### Code Execution Approach (3.5K tokens total)

```
await playwright_execute('./scripts/playwright/migrate-products.ts', {
  sourceUrl: 'old-shop.com/products',
  targetApi: 'https://new-cms.com/api/products',
  batchSize: 50,
  resume: './data/migration-state.json'
});

Returns:
"✅ Migrated 1000 products
 ⏱️  45 minutes
 ❌ 2 failures (saved to errors.json)
 📊 Resume point: ./data/migration-state.json"

Total: 3.5K tokens, 45 minutes, resumable
```

**Script:** `./scripts/playwright/migrate-products.ts`

```typescript
import { chromium } from 'playwright';
import * as fs from 'fs';

async function migrateProducts(config) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Resume from previous run
  let state = { processed: 0, failed: [] };
  if (fs.existsSync(config.resume)) {
    state = JSON.parse(fs.readFileSync(config.resume, 'utf8'));
  }

  try {
    // Navigate to product list
    await page.goto(config.sourceUrl);

    // Get all product links
    const productUrls = await page.$$eval('a.product', links =>
      links.map(a => a.href)
    );

    // Process in batches
    for (let i = state.processed; i < productUrls.length; i += config.batchSize) {
      const batch = productUrls.slice(i, i + config.batchSize);

      for (const url of batch) {
        try {
          // Scrape product data
          await page.goto(url);
          const product = await page.evaluate(() => ({
            name: document.querySelector('.product-name')?.textContent,
            price: document.querySelector('.price')?.textContent,
            description: document.querySelector('.description')?.textContent
          }));

          // Post to new CMS
          await fetch(config.targetApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
          });

          state.processed++;

        } catch (error) {
          state.failed.push({ url, error: error.message });
        }

        // Save progress
        fs.writeFileSync(config.resume, JSON.stringify(state));
      }

      console.log(`[migrate] Progress: ${state.processed}/${productUrls.length}`);
    }

    console.log(`✅ Migrated ${state.processed} products`);
    if (state.failed.length > 0) {
      console.log(`❌ ${state.failed.length} failures`);
      fs.writeFileSync('./data/migration-errors.json', JSON.stringify(state.failed));
    }

  } finally {
    await browser.close();
  }
}
```

**Savings:** 99.9% tokens | 53× faster than manual | Resumable on failure

---

## Example 5: Content Audit (Multi-site)

**Use case:** Audit 50 pages across 5 sites for broken links, missing meta tags.

### Traditional Approach

```
250 pages × 70K tokens = 17.5M tokens
Multiple sessions required
Cost: $52
Time: 2+ hours
```

### Code Execution Approach

```
await playwright_execute('./scripts/playwright/content-audit.ts', {
  sites: ['site1.com', 'site2.com', ...],
  checks: ['broken-links', 'meta-tags', 'images'],
  output: './reports/audit-2025-11-12.html'
});

Returns:
"✅ Audited 250 pages
 ❌ 47 issues found
 📊 Report: ./reports/audit-2025-11-12.html"

Total: 4.5K tokens, $0.0135, 15 minutes
```

**Script:** `./scripts/playwright/content-audit.ts`

```typescript
import { chromium } from 'playwright';
import * as fs from 'fs';

async function contentAudit(config) {
  const browser = await chromium.launch({ headless: true });
  const allIssues = [];

  for (const site of config.sites) {
    const page = await browser.newPage();

    // Get sitemap
    await page.goto(`https://${site}/sitemap.xml`);
    const urls = await page.$$eval('url > loc', locs =>
      locs.map(loc => loc.textContent)
    );

    // Audit each page
    for (const url of urls) {
      await page.goto(url);

      const issues = [];

      // Check broken links
      if (config.checks.includes('broken-links')) {
        const broken = await page.$$eval('a', links =>
          links.filter(a => !a.href || a.href === '#').map(a => a.textContent)
        );
        if (broken.length > 0) {
          issues.push({ type: 'broken-links', count: broken.length });
        }
      }

      // Check meta tags
      if (config.checks.includes('meta-tags')) {
        const hasTitle = await page.$('title') !== null;
        const hasDescription = await page.$('meta[name="description"]') !== null;
        if (!hasTitle || !hasDescription) {
          issues.push({ type: 'missing-meta', details: { hasTitle, hasDescription } });
        }
      }

      if (issues.length > 0) {
        allIssues.push({ url, issues });
      }
    }

    await page.close();
  }

  await browser.close();

  // Generate report
  const html = generateAuditReport(allIssues);
  fs.writeFileSync(config.output, html);

  console.log(`✅ Audited ${config.sites.length} sites`);
  console.log(`❌ ${allIssues.length} pages with issues`);
  console.log(`📊 Report: ${config.output}`);
}

function generateAuditReport(issues) {
  return `
    <h1>Content Audit Report</h1>
    <p>Pages with issues: ${issues.length}</p>
    <ul>
      ${issues.map(i => `
        <li>
          <strong>${i.url}</strong>
          <ul>${i.issues.map(iss => `<li>${iss.type}</li>`).join('')}</ul>
        </li>
      `).join('')}
    </ul>
  `;
}
```

**Savings:** 99.7% tokens | 8× faster | Comprehensive HTML report

---

## Summary: Token Savings Comparison

| Workflow | Traditional | Code Execution | Savings | Use Frequency |
|----------|-------------|----------------|---------|---------------|
| **Price monitoring** | 85K | 3K | 96% | Daily |
| **UI testing** | 120K | 4K | 97% | Daily |
| **Site monitoring** | 65K | 2.5K | 96% | 96×/day |
| **Data migration** | 95M | 3.5K | 99.9% | One-time |
| **Content audit** | 17.5M | 4.5K | 99.9% | Weekly |

**Annual savings (medium usage):** $7,000+

---

## Adapting Examples

All scripts follow same pattern:
1. CLI argument parsing
2. Browser/page setup
3. Core workflow logic
4. Error handling
5. Summary output (no PII in context)
6. File-based results

**Copy → Modify → Test → Deploy**

**See:** `mcp-setup-guide.md` for implementation details
**See:** `mcp-patterns.md` for composition patterns
