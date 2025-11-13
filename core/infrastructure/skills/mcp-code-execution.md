# mcp-code-execution

**Type:** Infrastructure optimization
**Priority:** High (96-98% token reduction)
**Auto-activate:** MCP keywords, multi-tool workflows
**Updated:** 2025-11-12

---

## Quick Reference

### When to Use

✅ **Use code execution when:**
- 3+ MCP tool calls needed
- Privacy concerns (PII in workflow data)
- Performance critical (need parallel execution)
- Recurring workflow (runs multiple times)

❌ **Traditional MCP when:**
- 1-2 simple tool calls
- One-off exploratory task
- Workflow changes frequently

### Token Savings

| Workflow | Traditional | Code Execution | Savings |
|----------|-------------|----------------|---------|
| Web scraping | 85K | 3K | 96% |
| UI testing | 120K | 4K | 97% |
| Monitoring | 65K | 2.5K | 96% |
| Data extraction | 95K | 3.5K | 96% |

---

## The Problem

**Traditional MCP approach:**
- All tool definitions loaded upfront → 50K-100K tokens
- Every result passes through context → 20K-50K tokens
- Sequential execution → slow
- PII data exposed in agent context → privacy risk

**Example (Web Scraping):**
```
Traditional: 85K tokens, $0.26, 35 seconds
├─ playwright_navigate → 5K tokens (page in context)
├─ playwright_waitForSelector → 2K tokens
├─ playwright_getText → 3K tokens (all text in context)
└─ playwright_screenshot → 8K tokens (base64 image)
```

---

## The Solution

**Code execution approach:**
- Minimal wrappers (2-3 tools) → 2K tokens
- Local scripts process data → no PII in context
- Parallel execution → 3-10× faster
- Reusable workflows → write once, use forever

**Example (Web Scraping):**
```
Code Execution: 3K tokens, $0.009, 8 seconds
└─ playwright_execute('./scripts/scrape-page.ts', config)
   Returns: "✅ Scraped 47 items" (no PII in context)
```

---

## Implementation Pattern

### 1. Minimal MCP Wrappers

Create `./servers/[mcp-name]/` with only essential tools:

```typescript
// ./servers/playwright/execute.ts
export async function execute(scriptPath: string, args: any) {
  // Run local script, return summary only
}

// ./servers/playwright/screenshot.ts
export async function screenshot(url: string) {
  // Capture screenshot for verification
}
```

**Why minimal?** Everything else becomes local scripts (privacy, reuse, speed).

### 2. Local Workflow Scripts

Create `./scripts/[mcp-name]/[workflow].ts`:

```typescript
// ./scripts/playwright/scrape-page.ts
// - Accepts CLI args (--url, --selector, --output)
// - Processes data locally
// - Saves to ./data/ (never in context)
// - Returns 1-line summary
```

### 3. Usage

```typescript
// ❌ Traditional (85K tokens)
await playwright_navigate(url);
await playwright_getText('.price');
await playwright_screenshot();

// ✅ Code Execution (3K tokens)
await playwright_execute('./scripts/scrape-page.ts', {
  url, selector: '.price', output: './data/prices.json'
});
```

---

## Resources (Progressive Loading)

**Setup:** Load `@resources/mcp-setup-guide.md` for:
- MCP server discovery scripts
- TypeScript wrapper generation
- Directory structure creation

**Patterns:** Load `@resources/mcp-patterns.md` for:
- 10 composition patterns (Sequential, Parallel, Conditional, etc.)
- Token savings per pattern
- Copy-paste templates

**Examples:** Load `@resources/mcp-examples.md` for:
- 5 complete workflows (scraping, testing, monitoring)
- Before/after token comparisons
- Production-ready code

**Integration:** Load `@resources/mcp-integration-guide.md` for:
- skill-rules.json configuration
- Hook setup
- Testing procedures

---

## Key Benefits

### 1. Token Efficiency (96-98% reduction)
- Traditional: 70K-150K tokens
- Code execution: 2K-5K tokens
- **Savings: $0.25 → $0.01 per run**

### 2. Privacy Preservation
- **Problem:** Customer data, PII in agent context
- **Solution:** Process locally, only summaries to context
- **Impact:** GDPR/CCPA compliant

### 3. Performance (3-10× faster)
- **Traditional:** Sequential tool calls (navigate → wait → getText...)
- **Code execution:** Parallel script execution
- **Impact:** 45s → 8s typical workflow

### 4. Reusability
- **Traditional:** Re-explain workflow each time
- **Code execution:** Import scripts, compose workflows
- **Impact:** Write once, use 100+ times

---

## Security (CRITICAL)

⚠️ **Required before implementing:**

1. **Sandboxing** - Docker/VM/serverless environment
2. **Resource limits** - Memory (512MB), CPU (50%), timeout (30s)
3. **Audit logging** - All script executions logged
4. **Code review** - Security review before execution

```typescript
const sandboxConfig = {
  maxMemory: '512MB',
  maxCPU: '50%',
  timeout: 30000,
  allowedDomains: ['target-sites.com'],
  blockPrivateIPs: true,
  allowedPaths: ['./scripts/', './data/'],
  readOnly: ['./scripts/']
};
```

---

## Trade-offs

| Aspect | Traditional | Code Execution |
|--------|-------------|----------------|
| Setup | Simple | Complex (one-time) |
| Learning | Low | Medium |
| Tokens | High (70K-150K) | Low (2K-5K) |
| Privacy | Poor | Excellent |
| Reuse | None | High |

**Decision:**
- One-off task → Traditional
- Recurring + 3+ tools → Code execution
- PII data → Code execution (mandatory)

---

## Quick Start

1. **Today (30 min):** Create minimal wrappers in `./servers/playwright/`
2. **This week (2 hours):** Implement first script (scrape-page.ts)
3. **This month:** Convert 3-5 workflows, measure savings

**See:** `/load mcp-patterns` for implementation templates
