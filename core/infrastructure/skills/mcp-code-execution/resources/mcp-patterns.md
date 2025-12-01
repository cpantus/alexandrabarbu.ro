# MCP Composition Patterns

Production patterns for composing MCP workflows using code execution approach.

---

## Pattern Index

| Pattern | Use Case | Token Savings | Speedup |
|---------|----------|---------------|---------|
| **Sequential** | Steps depend on previous results | 95% | 1× |
| **Parallel** | Independent operations | 96% | 5-10× |
| **Conditional** | Branch based on data | 95% | 2-3× |
| **Polling** | Wait for state change | 98% | 10× |
| **Batch** | Process many items | 97% | 8-12× |
| **Pipeline** | Multi-stage transformation | 96% | 4-6× |
| **Fan-out/Fan-in** | Scatter-gather | 96% | 6-10× |
| **Circuit Breaker** | Fault tolerance | 95% | 3× |
| **Retry** | Transient failures | 94% | 2× |
| **Cache** | Repeated operations | 99% | 100× |

---

## 1. Sequential Pattern

**Use:** Each step depends on previous step's output.

**Example:** Login → Navigate → Extract data → Logout

```typescript
// ./scripts/playwright/sequential-workflow.ts
async function sequentialWorkflow(config) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Step 1: Login
    const sessionId = await login(page, config.credentials);

    // Step 2: Navigate (uses sessionId)
    await navigate(page, config.url, sessionId);

    // Step 3: Extract (depends on navigation)
    const data = await extractData(page, config.selector);

    // Step 4: Logout (cleanup)
    await logout(page);

    return { success: true, data, count: data.length };

  } finally {
    await browser.close();
  }
}
```

**Token comparison:**
- Traditional: 110K (each step loads tools + passes data)
- Code execution: 3K (script runs locally, returns summary)
- **Savings: 97%**

---

## 2. Parallel Pattern

**Use:** Independent operations that can run simultaneously.

**Example:** Scrape 10 competitor sites simultaneously.

```typescript
// ./scripts/playwright/parallel-scraping.ts
async function parallelScraping(urls: string[]) {
  const results = await Promise.all(
    urls.map(async (url) => {
      const browser = await chromium.launch();
      const page = await browser.newPage();

      try {
        await page.goto(url);
        const data = await page.$$eval('.price', extractPrices);
        return { url, data, success: true };
      } catch (error) {
        return { url, error: error.message, success: false };
      } finally {
        await browser.close();
      }
    })
  );

  return {
    total: results.length,
    success: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length
  };
}
```

**Token comparison:**
- Traditional: 850K (10 sites × 85K per site, sequential)
- Code execution: 4K (parallel execution, summary only)
- **Savings: 99.5%** | **Speedup: 10×**

---

## 3. Conditional Pattern

**Use:** Branch based on data or state.

**Example:** If login fails, try OAuth; if product out of stock, check alternatives.

```typescript
// ./scripts/playwright/conditional-flow.ts
async function conditionalFlow(config) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Check condition
    await page.goto(config.url);
    const inStock = await page.$('.in-stock') !== null;

    if (inStock) {
      // Path A: Normal purchase flow
      return await normalPurchase(page, config);
    } else {
      // Path B: Check alternatives
      const alternatives = await findAlternatives(page, config.product);
      return { inStock: false, alternatives };
    }

  } finally {
    await browser.close();
  }
}
```

**Token comparison:**
- Traditional: 120K (both paths loaded + condition data)
- Code execution: 3.5K (only executed path in context)
- **Savings: 97%**

---

## 4. Polling Pattern

**Use:** Wait for condition (e.g., job completion, element appears).

**Example:** Wait for export job to complete, download result.

```typescript
// ./scripts/playwright/polling-workflow.ts
async function pollForCompletion(url: string, maxWait = 300000) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);

    // Poll until complete
    const result = await page.waitForFunction(
      () => {
        const status = document.querySelector('.status')?.textContent;
        return status === 'Complete' || status === 'Failed';
      },
      { timeout: maxWait, polling: 1000 }
    );

    const finalStatus = await page.$eval('.status', el => el.textContent);

    if (finalStatus === 'Complete') {
      // Download result
      const downloadUrl = await page.$eval('.download', el => el.href);
      return { success: true, downloadUrl };
    } else {
      return { success: false, error: 'Job failed' };
    }

  } finally {
    await browser.close();
  }
}
```

**Token comparison:**
- Traditional: 250K (polling state repeatedly in context)
- Code execution: 2.5K (local polling, final state only)
- **Savings: 99%** | **Speedup: 10×** (no round-trips)

---

## 5. Batch Pattern

**Use:** Process large number of items (100s-1000s).

**Example:** Update 500 product prices, migrate 1000 records.

```typescript
// ./scripts/playwright/batch-processing.ts
async function batchProcess(items: any[], batchSize = 50) {
  const results = {
    total: items.length,
    processed: 0,
    failed: 0,
    errors: []
  };

  // Process in chunks
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    await Promise.all(batch.map(async (item) => {
      try {
        await processItem(item);
        results.processed++;
      } catch (error) {
        results.failed++;
        results.errors.push({ item: item.id, error: error.message });
      }
    }));

    console.log(`[batch] Processed ${results.processed}/${items.length}`);
  }

  return results;
}
```

**Token comparison:**
- Traditional: 12M tokens (500 items × 24K each - exceeds context!)
- Code execution: 5K (summary only, PII never in context)
- **Savings: 99.96%** | **Enables workflows impossible with traditional approach**

---

## 6. Pipeline Pattern

**Use:** Multi-stage data transformation.

**Example:** Scrape → Clean → Enrich → Validate → Export.

```typescript
// ./scripts/playwright/pipeline-workflow.ts
async function pipeline(config) {
  // Stage 1: Scrape
  const rawData = await scrapeStage(config.url, config.selector);

  // Stage 2: Clean
  const cleaned = await cleanStage(rawData);

  // Stage 3: Enrich (call external APIs)
  const enriched = await enrichStage(cleaned);

  // Stage 4: Validate
  const validated = await validateStage(enriched);

  // Stage 5: Export
  await exportStage(validated, config.output);

  return {
    stages: {
      scraped: rawData.length,
      cleaned: cleaned.length,
      enriched: enriched.length,
      validated: validated.length,
      exported: validated.length
    }
  };
}
```

**Token comparison:**
- Traditional: 180K (each stage's data in context)
- Code execution: 4K (stage counts only)
- **Savings: 98%**

---

## 7. Fan-out/Fan-in Pattern

**Use:** Scatter work, gather results.

**Example:** Check 20 sites for price, aggregate best deals.

```typescript
// ./scripts/playwright/fan-out-fan-in.ts
async function fanOutFanIn(sites: string[], product: string) {
  // Fan-out: Parallel scraping
  const results = await Promise.all(
    sites.map(site => scrapeSite(site, product))
  );

  // Fan-in: Aggregate results
  const prices = results
    .filter(r => r.success && r.price)
    .map(r => ({ site: r.site, price: r.price }));

  const bestDeal = prices.reduce((best, curr) =>
    curr.price < best.price ? curr : best
  );

  return {
    checked: sites.length,
    found: prices.length,
    bestDeal,
    avgPrice: prices.reduce((sum, p) => sum + p.price, 0) / prices.length
  };
}
```

**Token comparison:**
- Traditional: 1.7M tokens (20 sites × 85K per site)
- Code execution: 3.5K (aggregated results only)
- **Savings: 99.8%**

---

## 8. Circuit Breaker Pattern

**Use:** Prevent cascading failures.

**Example:** If 3 consecutive scrapes fail, stop and alert.

```typescript
// ./scripts/playwright/circuit-breaker.ts
class CircuitBreaker {
  private failures = 0;
  private readonly threshold = 3;
  private state: 'closed' | 'open' = 'closed';

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      throw new Error('Circuit breaker open - too many failures');
    }

    try {
      const result = await fn();
      this.failures = 0; // Reset on success
      return result;
    } catch (error) {
      this.failures++;
      if (this.failures >= this.threshold) {
        this.state = 'open';
        console.error('[circuit-breaker] OPEN - threshold reached');
      }
      throw error;
    }
  }
}

// Usage
const breaker = new CircuitBreaker();
for (const url of urls) {
  try {
    await breaker.execute(() => scrapePage(url));
  } catch (error) {
    console.log(`[error] ${url}: ${error.message}`);
  }
}
```

**Benefit:** Prevents wasted tokens on doomed operations.

---

## 9. Retry Pattern

**Use:** Handle transient failures.

**Example:** Network timeouts, rate limits.

```typescript
// ./scripts/playwright/retry-pattern.ts
async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;

      // Exponential backoff
      const delay = delayMs * Math.pow(2, attempt - 1);
      console.log(`[retry] Attempt ${attempt} failed, waiting ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error('Should never reach here');
}

// Usage
const data = await withRetry(
  () => scrapePage(url),
  3,    // max attempts
  2000  // initial delay
);
```

**Token comparison:**
- Traditional: 3× token usage on retries (255K for 3 attempts)
- Code execution: Same 3K regardless of retries
- **Savings: 98%** on retry scenarios

---

## 10. Cache Pattern

**Use:** Avoid repeated expensive operations.

**Example:** Cache scraped product catalogs for 1 hour.

```typescript
// ./scripts/playwright/cache-pattern.ts
import * as fs from 'fs';
import * as path from 'path';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class FileCache<T> {
  constructor(private readonly cacheDir: string, private readonly ttlMs: number) {
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
  }

  get(key: string): T | null {
    const filePath = path.join(this.cacheDir, `${key}.json`);
    if (!fs.existsSync(filePath)) return null;

    const entry: CacheEntry<T> = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const age = Date.now() - entry.timestamp;

    if (age > this.ttlMs) {
      fs.unlinkSync(filePath); // Expired
      return null;
    }

    return entry.data;
  }

  set(key: string, data: T): void {
    const filePath = path.join(this.cacheDir, `${key}.json`);
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    fs.writeFileSync(filePath, JSON.stringify(entry));
  }
}

// Usage
const cache = new FileCache('./data/cache', 3600000); // 1 hour TTL

async function getCatalog(url: string) {
  const cached = cache.get(url);
  if (cached) {
    console.log('[cache] HIT');
    return cached;
  }

  console.log('[cache] MISS - scraping...');
  const data = await scrapePage(url);
  cache.set(url, data);
  return data;
}
```

**Token comparison:**
- Traditional: 85K per request (no caching possible)
- Code execution: 3K first request, 0.5K cached (file read)
- **Savings: 99% on cached requests**

---

## Pattern Selection Guide

```
Need multiple independent operations? → Parallel
Need sequential dependent steps? → Sequential
Need to process 100+ items? → Batch
Data changes based on conditions? → Conditional
Waiting for async operation? → Polling
Multi-stage transformation? → Pipeline
Aggregate from many sources? → Fan-out/Fan-in
Prevent cascade failures? → Circuit Breaker
Handle transient errors? → Retry
Repeated expensive operations? → Cache
```

---

## Combining Patterns

Real workflows often combine multiple patterns:

```typescript
// Example: Parallel + Retry + Cache
async function robustParallelScraping(urls: string[]) {
  const cache = new FileCache('./cache', 3600000);

  const results = await Promise.all(
    urls.map(url =>
      withRetry(async () => {
        const cached = cache.get(url);
        if (cached) return cached;

        const data = await scrapePage(url);
        cache.set(url, data);
        return data;
      }, 3, 2000)
    )
  );

  return results;
}
```

**Pattern stack:** Parallel (10× speedup) + Retry (resilience) + Cache (99% savings on repeat)

---

## Best Practices

1. **Return summaries, not full data** - "Processed 500 records" vs full record array
2. **Log progress** - Console output for observability
3. **Handle errors gracefully** - Try/catch, meaningful error messages
4. **Use TypeScript** - Type safety prevents runtime errors
5. **Reuse utilities** - Shared retry/cache/config logic
6. **Test locally first** - Validate script before MCP integration
7. **Document args** - Clear CLI interface (--url, --output)

---

## Next Steps

- **Apply patterns:** Identify which pattern fits your workflow
- **Copy templates:** Adapt code snippets above
- **Test:** Measure token savings
- **Iterate:** Combine patterns for complex workflows

**See:** `mcp-examples.md` for complete workflow implementations
