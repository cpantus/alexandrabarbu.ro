# View Context Bundles

👀 **Usage:** `/bundle-view [task-name] [--count N]`

**Examples:**
- `/bundle-view` (view last 10 bundles from active task)
- `/bundle-view "email-campaign-redesign"` (specific task)
- `/bundle-view --count 20` (last 20 bundles)

**Purpose:** Quick view of recent context bundles without full history load.

---

## Bundle View vs Bundle Load

**Bundle View (lightweight):**
- Shows last N bundles (default: 10)
- Fast (~100ms)
- Use for: Quick status check, recent activity review
- Output: Condensed timeline

**Bundle Load (comprehensive):**
- Shows full execution history
- Slower (1-5 seconds)
- Use for: Post-compaction recovery, debugging, team handoff
- Output: Detailed analysis with sessions, summaries, patterns

**When to use each:**
- `/bundle-view` → Daily use, quick checks
- `/bundle-load` → After compaction, deep analysis

---

## Workflow

### Step 1: Identify Task

**If task name provided:**
- Load bundles for specified task

**If no task name provided:**
- Find active task (most recently updated)
- Load bundles for that task

### Step 2: Read Recent Bundles

**File:** `/dev/active/[task]/[task]-bundle.log`

**Parse:**
- Read last N lines (default: 10)
- Parse each line as JSON
- Extract key fields: timestamp, tools, outcome, contextSnapshot

### Step 3: Display Recent Activity

**Format:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 RECENT BUNDLES (Last 10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Task: email-campaign-redesign
📊 Total Bundles: 47
🕐 Showing: Last 10 bundles (Nov 4, 09:00-11:00)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nov 4, 11:00  ✅  Edit README.md
   → "Documented SendGrid integration usage"

Nov 4, 10:45  ✅  Write docs/SENDGRID-INTEGRATION.md
   → "Created detailed integration guide"

Nov 4, 10:30  ✅  Edit src/integrations/sendgrid.ts
   → "Added error handling and retry logic"

Nov 4, 10:15  ✅  Bash "npm test"
   → "All integration tests passing"

Nov 4, 10:00  ✅  Edit tests/sendgrid.test.ts
   → "Added test for rate limit handling"

Nov 4, 09:45  ✅  Write src/lib/queue.ts
   → "Implemented Redis queue with 100/sec limit"

Nov 4, 09:30  ✅  Read docs/SendGrid-API.md
   → "Researching best practices for queue implementation"

Nov 4, 09:15  ❌  Bash "npm test"
   → "Integration test timeout (mock API issue)"

Nov 4, 09:10  ✅  Edit src/integrations/sendgrid.ts
   → "Fixed API client initialization"

Nov 4, 09:00  ✅  Read src/lib/email-sender.ts
   → "Starting queue system implementation"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 QUICK STATS (Last 10 bundles)

Success Rate: 90% (9/10)
Time Span: 2 hours
Files Modified:
  - src/integrations/sendgrid.ts (3x)
  - tests/sendgrid.test.ts (2x)
  - README.md (1x)
  - docs/SENDGRID-INTEGRATION.md (1x)
  - src/lib/queue.ts (1x)

Last Activity: 15 minutes ago
Current Focus: Documentation complete, ready for deployment

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Use /bundle-load for full execution history
```

---

## View Options

### Default View (Last 10)
```
/bundle-view
```
Shows last 10 bundles from active task

### Custom Count
```
/bundle-view --count 20
```
Shows last 20 bundles

### Specific Task
```
/bundle-view "email-campaign-redesign"
```
Shows bundles for specified task

### Today Only
```
/bundle-view --today
```
Shows bundles created today

### This Session
```
/bundle-view --session
```
Shows bundles from current session (last 30 minutes)

---

## Use Cases

### 1. Daily Standup

**Before team meeting:**
```
/bundle-view --today

[Shows what you worked on today]
- 09:00: Started queue implementation
- 10:15: Tests passing
- 11:00: Documentation complete

Quick answer: "Implemented Redis queue, all tests passing, docs done."
```

### 2. Context Check

**After short break:**
```
/bundle-view

[Shows last 10 bundles]
- Last action: Edit README.md
- Context: "Documented SendGrid integration usage"

Quick reminder: Where you left off
```

### 3. Progress Tracking

**End of day:**
```
/bundle-view --today

[Shows full day's work]
- 15 bundles created
- 12 files modified
- 93% success rate

Quick summary: Productive day, good progress
```

### 4. Quick Debug

**Something broke recently:**
```
/bundle-view --count 20

[Scan recent bundles for errors]
- 09:15: ❌ Test timeout
- Next bundles: Fixed mock API

Quick diagnosis: Issue already resolved
```

---

## Output Formats

### Compact (Default)
```
Nov 4, 11:00  ✅  Edit README.md
   → "Documented SendGrid integration usage"
```
- One line per bundle
- Timestamp + Status + Tool + File
- Context snapshot below

### Detailed
```
/bundle-view --detailed

Nov 4, 11:00  ✅  SUCCESS

Tool: Edit
File: README.md
Context: Documented SendGrid integration usage

Tools Used:
  - Edit (README.md)

Files Modified:
  - README.md

Session: 3
Bundle #47
```

### Summary Only
```
/bundle-view --summary

Last 10 Bundles (Nov 4, 09:00-11:00)
  ✅ 9 success
  ❌ 1 error
  📁 5 files modified
  ⏱️  2 hours of work
  🎯 Current: Documentation complete
```

---

## Integration with Dev Docs

**Combined workflow:**

1. **Start session:**
   ```
   User: "Continue email-campaign-redesign"
   Claude: [Reads dev docs]
   Claude: [Shows /bundle-view automatically]
   ```

2. **Display:**
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📂 RESUMING: Email Campaign Redesign
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   📋 From context.md:
      Last Focus: Implementing SendGrid integration
      Next Step: Deploy to staging

   📦 Recent Activity (bundles):
      Nov 4, 11:00 - Documented integration
      Nov 4, 10:15 - All tests passing
      Nov 4, 09:45 - Queue system complete

   ✅ Progress: 8/10 tasks (80%)

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```

**Benefits:**
- Dev docs: Strategic context (what, why, next)
- Bundles: Tactical context (when, how, outcome)
- Together: Complete picture

---

## Performance

**View time:**
- Last 10 bundles: <100ms
- Last 50 bundles: <500ms
- Last 100 bundles: <1s

**Why so fast?**
- Only reads last N lines (no full file parse)
- Minimal processing
- Lightweight output

**Comparison:**
- `/bundle-view`: ~100ms (quick check)
- `/bundle-load`: ~2s (full analysis)

**Recommendation:** Use `/bundle-view` for frequent checks, `/bundle-load` for deep dives.

---

## Best Practices

**DO:**
- ✅ Use `/bundle-view` daily for quick status
- ✅ Check bundles before team standups
- ✅ View bundles after short breaks
- ✅ Use `--today` for end-of-day summary
- ✅ Combine with dev docs for full context

**DON'T:**
- ❌ Use `/bundle-view` for debugging (use `/bundle-load --errors`)
- ❌ Use `/bundle-view` after compaction (use `/bundle-load`)
- ❌ View bundles for every action (overhead not worth it)
- ❌ Modify bundle.log manually (append-only!)

---

## Automation

**Auto-view on resume:**

When you say "Continue [task]", Claude can automatically show recent bundles:

```
User: "Continue email-campaign-redesign"

Claude:
[Reads dev docs]
[Auto-runs /bundle-view]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📂 RESUMING: Email Campaign Redesign
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Recent Activity:
   Nov 4, 11:00 - Documented integration
   Nov 4, 10:15 - Tests passing
   Nov 4, 09:45 - Queue complete

📋 Next Step: Deploy to staging

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready to deploy! Should I proceed?
```

**Configuration:**
- Set `auto_bundle_view: true` in settings.json
- Or run manually: `/bundle-view` anytime

---

## Comparison Table

| Feature | Bundle View | Bundle Load |
|---------|-------------|-------------|
| **Speed** | Fast (~100ms) | Slower (~2s) |
| **Bundles Shown** | Last N (default 10) | All bundles |
| **Analysis Depth** | Quick stats | Full analysis |
| **Session Detection** | No | Yes |
| **Error Patterns** | No | Yes |
| **File Statistics** | Basic | Detailed |
| **Use Case** | Daily checks | Post-compaction |
| **Output Size** | Compact | Comprehensive |

---

## Troubleshooting

### No Bundles Found

**Problem:** Bundle log is empty

**Solution:**
- Bundles created automatically by hook
- If new task, no bundles yet
- Create test bundle: `/bundle-create [task] "test"`

### Too Many Bundles

**Problem:** Last 10 not enough

**Solution:**
- Increase count: `/bundle-view --count 50`
- Or use full load: `/bundle-load [task]`

### Bundles Too Old

**Problem:** Last 10 bundles are from yesterday

**Solution:**
- Use `--today` flag: `/bundle-view --today`
- Or `--session` for current session only

---

## Time Estimate

- **Viewing bundles:** <1 second
- **Reading output:** 10-30 seconds
- **Context recovery benefit:** Quick orientation without full load

**ROI:** Instant status check, minimal time

---

## Related Commands

- `/bundle-create [task]` - Create new bundle
- `/bundle-load [task]` - Full bundle history
- `/update-dev-docs [task]` - Update dev docs
- `/review-dev-docs` - Review all tasks

---

Built with Claude Code v4.0 (Phase 17) 🚀
**Quick Status:** View recent bundles in <100ms
