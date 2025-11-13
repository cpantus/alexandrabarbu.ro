# Load Context Bundle

📦 **Usage:** `/bundle-load [task-name]`

**Examples:**
- `/bundle-load "email-campaign-redesign"`
- `/bundle-load` (loads active task's bundle)

**Purpose:** Load and restore full execution history from context bundles.

---

## What Does Bundle Load Do?

Bundle load **reconstructs your work session** by reading the append-only execution log and displaying:
- **Timeline:** When actions happened
- **Tools Used:** What operations were performed
- **Files Modified:** Which files changed
- **Decisions Made:** Critical context snapshots
- **Outcomes:** Success/error/partial status

**Use case:** After context compaction, quickly recover complete execution history.

---

## When to Use Bundle Load

**After context compaction:**
- Say: "Continue [task]" → reads dev docs
- Then: `/bundle-load [task]` → restores full execution timeline
- Result: 80%+ context recovery (vs 70% with dev docs alone)

**For debugging:**
- Trace when an issue started
- See sequence of file modifications
- Identify decision points

**For team handoff:**
- Show complete work history
- Explain what was tried and why
- Document outcomes

**For progress review:**
- See how much was accomplished
- Identify patterns (e.g., frequent errors)
- Estimate remaining work

---

## Workflow

### Step 1: Identify Task

**If task name provided:**
- Load bundles for specified task

**If no task name provided:**
- Find active task (most recently updated)
- Load bundles for that task

### Step 2: Read Bundle Log

**File:** `/dev/active/[task]/[task]-bundle.log`

**Parse:**
- Read line-by-line (newline-delimited JSON)
- Each line is one bundle entry
- Parse JSON for each entry

**Example bundle.log:**
```
{"timestamp":"2025-11-04T10:00:00Z","tools":[{"type":"Read","file":"docs/API.md"}],"outcome":"success","contextSnapshot":"Starting SendGrid integration"}
{"timestamp":"2025-11-04T10:15:00Z","tools":[{"type":"Write","file":"src/sendgrid.ts"}],"outcome":"success","contextSnapshot":"Creating API client"}
{"timestamp":"2025-11-04T10:30:00Z","tools":[{"type":"Edit","file":"src/sendgrid.ts"}],"outcome":"error","contextSnapshot":"Hit rate limit bug"}
```

### Step 3: Analyze Bundle History

**Group by:**
- Session (by timestamp gaps >30 minutes)
- Phase (by context changes)
- Outcome (success vs error)

**Extract:**
- Total bundles
- Total tools used
- Files modified (unique list)
- Error count
- Success rate

**Timeline:**
- Session 1: [timestamp range] - [X bundles] - [outcome]
- Session 2: [timestamp range] - [X bundles] - [outcome]
- Session 3: [timestamp range] - [X bundles] - [outcome]

### Step 4: Display Bundle History

**Format:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 CONTEXT BUNDLES LOADED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Task: email-campaign-redesign
📊 Total Bundles: 47
🕐 Time Span: 2025-11-01 → 2025-11-04 (3 days)
✅ Success Rate: 89% (42/47)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 SESSION 1 (Nov 1, 10:00-12:30)
   Duration: 2h 30m | Bundles: 15 | Success: 100%

   10:00 ✅ Read docs/SendGrid-API.md
         → "Starting SendGrid integration research"

   10:15 ✅ Write src/integrations/sendgrid.ts
         → "Creating API client with authentication"

   10:30 ✅ Edit src/config/sendgrid.ts
         → "Adding API key configuration"

   10:45 ✅ Write tests/sendgrid.test.ts
         → "Adding unit tests for API client"

   ...12 more bundles...

   Files Modified (Session 1):
   - src/integrations/sendgrid.ts
   - src/config/sendgrid.ts
   - tests/sendgrid.test.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 SESSION 2 (Nov 2, 14:00-17:45)
   Duration: 3h 45m | Bundles: 22 | Success: 86%

   14:00 ✅ Read src/lib/email-sender.ts
         → "Adding queue system for bulk emails"

   14:15 ✅ Write src/lib/queue.ts
         → "Implementing Redis-based queue"

   14:30 ❌ Edit src/integrations/sendgrid.ts
         → "Hit SendGrid rate limit (429 error)"

   14:45 ✅ Edit src/lib/queue.ts
         → "Added rate limiting (100/second)"

   15:00 ✅ Bash "npm install redis"
         → "Installing Redis client"

   ...17 more bundles...

   Files Modified (Session 2):
   - src/lib/email-sender.ts
   - src/lib/queue.ts
   - src/integrations/sendgrid.ts
   - package.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 SESSION 3 (Nov 4, 09:00-11:00)
   Duration: 2h | Bundles: 10 | Success: 100%

   09:00 ✅ Read tests/sendgrid.test.ts
         → "Running final integration tests"

   09:15 ✅ Bash "npm test"
         → "All tests passing"

   09:30 ✅ Edit README.md
         → "Documenting SendGrid integration"

   ...7 more bundles...

   Files Modified (Session 3):
   - tests/sendgrid.test.ts
   - README.md
   - docs/SENDGRID-INTEGRATION.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 SUMMARY

Total Time Invested: ~8 hours (3 sessions)
Total Files Modified: 12 unique files
Total Tool Calls: 47
Success Rate: 89% (42 success, 5 errors)

Most Modified Files:
  1. src/integrations/sendgrid.ts (8 edits)
  2. src/lib/queue.ts (6 edits)
  3. tests/sendgrid.test.ts (4 edits)

Error Patterns:
  - 3x Rate limit errors (14:30, 14:35, 14:40)
  - 2x Test failures (09:05, 09:10)

Key Milestones:
  ✅ Session 1: Basic SendGrid integration complete
  ✅ Session 2: Queue system implemented
  ✅ Session 3: Testing and documentation complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 CONTEXT RESTORED

You were working on: Email campaign redesign
Last session: Nov 4, 09:00-11:00
Last action: Documented SendGrid integration in README
Next step: [Read from context.md]

Full execution history loaded. You can now resume with
complete context of what was done, when, and why.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 5: Integrate with Dev Docs

**After loading bundles:**
- Read `[task]-context.md` for next steps
- Read `[task]-tasks.md` for progress
- Combine: Bundle history + Dev docs = complete picture

---

## Load Options

### Default Load (Recent Only)
```
/bundle-load [task]
```
Shows last 20 bundles (most recent work)

### Full History
```
/bundle-load [task] --full
```
Shows ALL bundles (entire task history)

### Session View
```
/bundle-load [task] --session 2
```
Shows specific session only

### Date Range
```
/bundle-load [task] --since "2025-11-01"
```
Shows bundles since date

### Error Only
```
/bundle-load [task] --errors
```
Shows only failed bundles (for debugging)

---

## Integration with Compaction Recovery

**Standard workflow after compaction:**

1. **Resume task:**
   ```
   User: "Continue working on email-campaign-redesign"
   ```

2. **Claude reads dev docs:**
   - plan.md: Original plan
   - context.md: Current focus, next steps
   - tasks.md: Progress checklist

3. **Claude loads bundles (optional):**
   ```
   Claude: "Loading execution history..."
   [Reads bundle.log]
   ```

4. **Display recovery summary:**
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📂 RESUMING: Email Campaign Redesign
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   📋 Last Focus (from context.md):
      Implementing SendGrid API integration

   📝 Recent Actions (from bundles):
      Nov 4, 09:30 - Documented integration in README
      Nov 4, 09:15 - All tests passing
      Nov 4, 09:00 - Final integration tests

   🎯 Next Step (from context.md):
      Deploy to staging environment

   ✅ Progress: 8/10 tasks complete (80%)

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Full context restored! Ready to continue.
   ```

**Result:** 80%+ context recovery (vs 70% without bundles)

---

## Debugging with Bundles

**Scenario:** Something broke, need to trace when.

```
User: /bundle-load email-campaign --errors

Claude:
Analyzing error bundles...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ ERROR BUNDLES (5 total)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nov 2, 14:30 ❌ Edit src/integrations/sendgrid.ts
   → "Hit SendGrid rate limit (429 error)"
   Files: src/integrations/sendgrid.ts

Nov 2, 14:35 ❌ Bash "npm test"
   → "Tests failing: rate limit not handled"
   Files: tests/sendgrid.test.ts

Nov 2, 14:40 ❌ Edit src/integrations/sendgrid.ts
   → "Retry logic not working"
   Files: src/integrations/sendgrid.ts

Nov 4, 09:05 ❌ Bash "npm test"
   → "Integration test timeout"
   Files: tests/sendgrid.test.ts

Nov 4, 09:10 ❌ Bash "npm test"
   → "Mock API not responding"
   Files: tests/sendgrid.test.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 ERROR ANALYSIS

Pattern Detected:
  - Session 2: 3 rate limit errors (14:30-14:40)
  - Session 3: 2 test failures (09:05-09:10)

Root Cause (Session 2):
  SendGrid API rate limit not handled → Added queue system

Root Cause (Session 3):
  Mock API timeout → Fixed in next bundle (09:15)

All errors resolved by end of session.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Best Practices

**DO:**
- ✅ Load bundles after compaction (full context restoration)
- ✅ Use `--errors` to debug issues
- ✅ Load bundles before team handoff
- ✅ Review bundles to estimate remaining work
- ✅ Combine with dev docs for complete picture

**DON'T:**
- ❌ Load bundles for every task (only when needed)
- ❌ Rely solely on bundles (use dev docs too)
- ❌ Delete bundle.log (permanent history loss)
- ❌ Manually edit bundle.log (append-only!)

---

## Performance

**Load time:**
- Small task (<50 bundles): <1 second
- Medium task (50-200 bundles): 1-2 seconds
- Large task (200+ bundles): 2-5 seconds

**Bundle file size:**
- ~200 bytes per bundle entry
- 100 bundles ≈ 20KB
- 1000 bundles ≈ 200KB

**Recommendation:** Archive old bundles after task completion to keep size manageable.

---

## Troubleshooting

### No Bundle Log Found

**Problem:** `bundle.log` doesn't exist

**Solution:**
- Bundles created automatically by hook
- If no bundles yet, work on task first
- Or create manual bundle: `/bundle-create [task]`

### Empty Bundle History

**Problem:** Bundle log is empty

**Solution:**
- File exists but no entries yet
- Hook might not be triggered yet
- Create test bundle: `/bundle-create [task] "test"`

### Corrupted Bundle

**Problem:** JSON parse error

**Solution:**
- One or more bundle entries malformed
- Load with `--skip-errors` flag
- Manually fix bundle.log (edit malformed line)

---

## Time Estimate

- **Loading bundles:** 1-5 seconds
- **Analyzing history:** Automated
- **Context recovery benefit:** +10-15% (70% → 80%+)

**ROI:** Minimal time, significant context restoration

---

## Related Commands

- `/bundle-create [task]` - Create new bundle entry
- `/bundle-view [task]` - View recent bundles (lighter)
- `/update-dev-docs [task]` - Update dev docs context
- `/review-dev-docs` - Review all active tasks

---

Built with Claude Code v4.0 (Phase 17) 🚀
**Context Recovery:** 80%+ with bundles + dev docs
