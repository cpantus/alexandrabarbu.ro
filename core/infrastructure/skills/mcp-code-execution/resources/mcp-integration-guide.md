# MCP Integration Guide

Step-by-step integration of MCP code execution pattern into Marketing Agent v5.0 infrastructure.

---

## Integration Overview

**Goal:** Enable auto-detection and skill activation for MCP optimization opportunities.

**Components:**
1. Detection hook (detect-mcp-opportunity.ts) - Already created ✅
2. Detection utility (mcp-detector.ts) - Already created ✅
3. Main skill (mcp-code-execution.md) - Already created ✅
4. Resource files - Already created ✅
5. Configuration updates - Needed

**Time:** 5-10 minutes

---

## Step 1: Register Detection Hook

**File:** `.claude/settings.json`

Add to `hooks.UserPromptSubmit` array:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npx tsx core/infrastructure/hooks/user-prompt-submit.ts"
          },
          {
            "type": "command",
            "command": "npx tsx core/infrastructure/hooks/detect-mcp-opportunity.ts"
          }
        ]
      }
    ]
  }
}
```

**What this does:** Runs MCP detection after standard skill/pattern matching.

---

## Step 2: Configure Skill Auto-Activation

**File:** `.claude/skill-rules.json`

Add new skill entry:

```json
{
  "skills": {
    "mcp-code-execution": {
      "path": "core/infrastructure/skills/mcp-code-execution.md",
      "keywords": [
        "playwright", "puppeteer", "selenium", "browser automation",
        "web scraping", "scrape", "crawl", "extract",
        "ui testing", "e2e testing", "end to end",
        "site monitoring", "uptime check", "monitor",
        "data extraction", "bulk export",
        "mcp optimization", "token reduction"
      ],
      "intentPatterns": [
        "scrape .+ from .+",
        "test .+ (ui|interface|workflow)",
        "monitor .+ (site|website|service)",
        "extract .+ data .+",
        "check if .+ (is up|responds|loads)"
      ],
      "filePatterns": [
        "**/.mcp.json",
        "**/servers/**/*.ts",
        "**/scripts/playwright/**/*.ts",
        "**/scripts/*/**.ts"
      ],
      "cache": true,
      "priority": "high"
    }
  }
}
```

**What this does:** Auto-loads skill when user mentions MCP, scraping, testing, or monitoring.

---

## Step 3: Test Auto-Detection

Run these test prompts:

### Test 1: Web Scraping Detection

```
User: "I need to scrape pricing data from 3 competitor websites"

Expected output:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 MCP CODE EXECUTION OPPORTUNITY DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Pattern: web-scraping (high confidence)
   Traditional: ~85K tokens
   6 MCP tool calls

💡 Code Execution Pattern:
   Optimized: ~3K tokens (96% reduction)
   Cost: ~$0.246 saved per run
   Speed: 6.0× faster (parallel execution)

📖 Skill auto-loaded: mcp-code-execution.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[mcp-code-execution skill content loads...]
```

### Test 2: UI Testing Detection

```
User: "Test the checkout flow across Chrome, Firefox, and Safari"

Expected: Detection message + skill auto-load
```

### Test 3: No Detection (Should be silent)

```
User: "What's the weather today?"

Expected: No MCP detection message (irrelevant prompt)
```

### Test 4: Manual Skill Load

```
User: "/load mcp-code-execution"

Expected: Skill loads without detection message
```

---

## Step 4: Create First Playwright Script

See Playwright production scripts in next section, or:

```bash
# Create directory
mkdir -p ./scripts/playwright/shared

# Copy example from mcp-setup-guide.md
# Or proceed to Playwright scripts section below
```

---

## Step 5: Verify Integration

### Checklist

- [ ] Hook registered in settings.json
- [ ] Skill rules added to skill-rules.json
- [ ] Test prompt triggers detection
- [ ] Skill auto-loads on keywords
- [ ] No false positives on unrelated prompts
- [ ] Resource files load on demand

### Verification Commands

```bash
# Check hook exists
ls core/infrastructure/hooks/detect-mcp-opportunity.ts

# Check utility exists
ls core/infrastructure/hooks/utils/mcp-detector.ts

# Check skill exists
ls core/infrastructure/skills/mcp-code-execution.md

# Check resources exist
ls core/infrastructure/skills/resources/mcp-*.md

# Test hook directly
echo "scrape pricing from acme.com" | npx tsx core/infrastructure/hooks/detect-mcp-opportunity.ts
```

---

## Customization

### Adjust Detection Thresholds

**File:** `core/infrastructure/hooks/utils/mcp-detector.ts`

```typescript
// Change minimum tool count
const shouldOptimize = (toolCount >= 3) // Change to 2 or 4

// Change confidence thresholds
confidence = matchCount >= 2 ? 'high' : 'medium' // Adjust matchCount

// Add custom patterns
const MCP_KEYWORDS = {
  'web-scraping': ['scrape', 'extract', ...],
  'custom-pattern': ['your', 'keywords', 'here']
}
```

### Add Project-Specific Keywords

**File:** `.claude/skill-rules.json`

```json
{
  "skills": {
    "mcp-code-execution": {
      "keywords": [
        // Add your domain-specific terms
        "competitor analysis",
        "price intelligence",
        "catalog sync"
      ]
    }
  }
}
```

### Disable Detection for Specific Scenarios

```typescript
// In detect-mcp-opportunity.ts
if (prompt.includes('--no-mcp-optimization')) {
  process.exit(0); // Skip detection
}
```

---

## Monitoring

### Track Token Savings

Add to your workflow scripts:

```typescript
// At script start
const startTokens = getCurrentTokenCount(); // Your implementation

// At script end
const savedTokens = estimatedTraditional - actualUsed;
console.log(`💰 Saved ${savedTokens}K tokens (${percent}%)`);
```

### Log Detection Events

```typescript
// In detect-mcp-opportunity.ts
if (detection.shouldOptimize) {
  fs.appendFileSync('./logs/mcp-detections.log', JSON.stringify({
    timestamp: new Date().toISOString(),
    pattern: detection.pattern,
    estimatedSavings: detection.costSavings
  }) + '\n');
}
```

---

## Troubleshooting

### Hook Not Triggering

**Problem:** Detection message doesn't appear

**Solutions:**
1. Check hook registered in settings.json
2. Verify TypeScript compiles: `npx tsx core/infrastructure/hooks/detect-mcp-opportunity.ts`
3. Test with explicit MCP prompt: "use playwright to scrape"
4. Check logs for errors

### Skill Not Auto-Loading

**Problem:** Detection works but skill doesn't load

**Solutions:**
1. Verify skill path in skill-rules.json
2. Check skill file exists: `ls core/infrastructure/skills/mcp-code-execution.md`
3. Ensure keywords match in both hook detection and skill rules
4. Clear skill cache if present

### False Positives

**Problem:** Detection triggers for irrelevant prompts

**Solutions:**
1. Increase detection threshold (toolCount >= 4)
2. Remove broad keywords from MCP_KEYWORDS
3. Add negative patterns (exclude certain words)
4. Require higher confidence level

### Resource Files Not Loading

**Problem:** Skill loads but resources don't

**Solutions:**
1. Use explicit load: `/load mcp-setup-guide`
2. Verify resource paths in skill file
3. Check markdown link syntax: `@resources/mcp-patterns.md`

---

## Next Steps

1. **Integration complete** - Detection + skill working
2. **Create Playwright scripts** - See next section
3. **Test with real workflow** - Measure token savings
4. **Iterate** - Adjust thresholds, add keywords
5. **Expand** - Apply pattern to other MCP servers

---

## Success Criteria

After integration, you should have:

✅ Auto-detection working (appropriate triggers, no false positives)
✅ Skill loads on MCP keywords
✅ Resources available on demand
✅ First workflow demonstrates 90%+ token reduction
✅ Team understands pattern and can create new scripts

**Validation:** Run 3-5 test prompts, measure token usage before/after.

**Goal:** 96-98% token reduction for multi-tool MCP workflows.
