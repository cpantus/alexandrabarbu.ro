# Create Context Bundle

📦 **Usage:** `/bundle-create [task-name] [context-snapshot]`

**Examples:**
- `/bundle-create "email-campaign-redesign" "Implementing SendGrid integration"`
- `/bundle-create` (uses active task, auto-detects context)

**Purpose:** Manually create a context bundle entry to capture current execution state.

---

## What Are Context Bundles?

Context bundles are **append-only execution logs** that track:
- Timestamp of activity
- User prompts
- Tools used (Read, Write, Edit, Bash, etc.)
- Files modified
- Execution outcome (success/error/partial)
- Context snapshot (what you're working on)

**Storage:** `/dev/active/[task]/[task]-bundle.log`

**Benefits:**
- 📈 Improves context recovery: 70% → 80%+ after compaction
- 📝 Complete execution history for debugging
- 🔍 Easy to trace what happened and when
- ⚡ Lightweight (append-only, no overhead)

---

## When to Create Bundles

**Automatically created by hook:**
- After each tool use (Edit, Write, Bash, etc.)
- Triggered by `context-bundle.ts` hook
- No manual action needed in most cases

**Manually create when:**
- Making a critical decision (capture the moment)
- Reaching a milestone (mark progress)
- Before taking a break (snapshot current state)
- Encountering a blocker (document for debugging)

---

## Workflow

### Step 1: Identify Active Task

**If task name provided:**
- Use specified task
- Read task's dev docs to validate it exists

**If no task name provided:**
- Check `/dev/active/` for directories
- If only 1 active task: auto-select it
- If multiple tasks: find most recently updated
- If no tasks: error (must have dev docs first)

### Step 2: Capture Context Snapshot

**If context provided in command:**
- Use provided context string

**If no context provided:**
- Read `[task]-context.md`
- Extract "Current Focus" and "Next Step"
- Use as context snapshot

**Example snapshot:**
```
Focus: Implementing SendGrid API integration. Next: Test with sample campaign.
```

### Step 3: Gather Execution Data

**Tools used:**
- Check edit log (`/tmp/claude-edit-log.json`)
- List recent tool calls (last 5-10 minutes)

**Files modified:**
- Extract from edit log
- Include file paths

**Outcome:**
- Default: `success` (can specify `error`, `partial`, `pending`)

### Step 4: Create Bundle Entry

**Format (newline-delimited JSON):**
```json
{
  "timestamp": "2025-11-04T15:30:00Z",
  "sessionId": "abc123",
  "prompt": "Implement SendGrid integration",
  "tools": [
    {
      "type": "Write",
      "file": "src/integrations/sendgrid.ts",
      "description": "Created SendGrid API client"
    },
    {
      "type": "Edit",
      "file": "src/lib/email-sender.ts",
      "description": "Added queue system"
    }
  ],
  "outcome": "success",
  "contextSnapshot": "Focus: SendGrid integration. Next: Test API.",
  "filesModified": [
    "src/integrations/sendgrid.ts",
    "src/lib/email-sender.ts"
  ]
}
```

### Step 5: Append to Bundle Log

**File:** `/dev/active/[task]/[task]-bundle.log`

**Operation:** Append-only (never overwrite)
- Each entry is one line (newline-delimited JSON)
- New entries added to end of file
- Old entries never modified
- Full execution history preserved

### Step 6: Confirm Creation

Display confirmation:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ CONTEXT BUNDLE CREATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Task: email-campaign-redesign
🕐 Timestamp: 2025-11-04 15:30:00
📊 Outcome: success

📝 Context:
   Focus: Implementing SendGrid API integration
   Next: Test with sample campaign

🔧 Tools Used:
   - Write: src/integrations/sendgrid.ts
   - Edit: src/lib/email-sender.ts

💾 Saved to: email-campaign-redesign-bundle.log

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Manual Bundle Creation Example

**Scenario:** You just made a critical architectural decision and want to capture it.

```
User: /bundle-create "email-campaign-redesign" "Decided to use Redis queue instead of direct API calls to avoid rate limits"

Claude:
Analyzing current task state...

📋 Active Task: email-campaign-redesign
📅 Last Updated: 2 hours ago

Creating context bundle...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ CONTEXT BUNDLE CREATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Task: email-campaign-redesign
🕐 Timestamp: 2025-11-04 15:30:00
📊 Outcome: success

📝 Context:
   Decided to use Redis queue instead of direct API calls
   to avoid rate limits

🔧 Recent Tools:
   - Write: src/lib/queue.ts
   - Edit: src/integrations/sendgrid.ts

💾 Bundle #47 saved to: email-campaign-redesign-bundle.log

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This bundle will help preserve context across compactions.
Use /bundle-view to see full execution history.
```

---

## Integration with Dev Docs

**Seamless workflow:**

```
1. Create dev docs → /create-dev-docs [task]
   ↓
2. Work on task → context-bundle hook auto-creates bundles
   ↓
3. Manual milestones → /bundle-create (if needed)
   ↓
4. Before compaction → /update-dev-docs (updates context.md)
   ↓
5. After compaction → /bundle-load [task] (restores full history)
   ↓
6. Resume work → 80%+ context recovered (vs 70% with dev docs alone)
```

**Why bundles improve recovery:**
- Dev docs = high-level summary (what, why, next)
- Bundles = detailed execution log (when, how, outcome)
- Together = complete picture of task progress

---

## Advanced Usage

**Custom outcome:**
```
/bundle-create "email-campaign" "Hit SendGrid rate limit" --outcome error
```

**Multiple entries:**
```
/bundle-create "email-campaign" "Milestone 1: Basic integration complete"
/bundle-create "email-campaign" "Milestone 2: Queue system implemented"
/bundle-create "email-campaign" "Milestone 3: Testing completed"
```

**Debugging:**
```
/bundle-create "email-campaign" "Error: API returns 429 Too Many Requests" --outcome error
[Later: Use /bundle-view to trace when error started]
```

---

## Best Practices

**DO:**
- ✅ Let hook auto-create bundles (hands-free)
- ✅ Manually create for critical decisions
- ✅ Use descriptive context snapshots
- ✅ Create milestone bundles (phase completion)
- ✅ Capture errors with `--outcome error`

**DON'T:**
- ❌ Create bundles for trivial actions (overhead not worth it)
- ❌ Manually create every bundle (let hook handle it)
- ❌ Write vague context ("working on stuff")
- ❌ Delete or modify bundle.log (append-only!)

---

## File Format

**Bundle log structure:**
```
/dev/active/[task]/[task]-bundle.log

Line 1: {"timestamp":"2025-11-04T10:00:00Z","tools":[...],"outcome":"success",...}
Line 2: {"timestamp":"2025-11-04T10:15:00Z","tools":[...],"outcome":"success",...}
Line 3: {"timestamp":"2025-11-04T10:30:00Z","tools":[...],"outcome":"partial",...}
...
Line N: {"timestamp":"2025-11-04T15:30:00Z","tools":[...],"outcome":"success",...}
```

**Format:** Newline-delimited JSON (NDJSON)
- Each line is a valid JSON object
- Easy to parse (read line-by-line)
- Append-only (no overwrites)
- Human-readable

---

## Troubleshooting

### No Active Task Found

**Problem:** `/bundle-create` can't find active dev docs

**Solution:**
1. Create dev docs first: `/create-dev-docs [task]`
2. Or specify task explicitly: `/bundle-create [task-name]`

### Bundle Log Not Created

**Problem:** `bundle.log` file doesn't exist

**Solution:**
- File is created automatically on first bundle
- Check `/dev/active/[task]/` directory exists
- Verify write permissions

### Context Snapshot Empty

**Problem:** Bundle has "No context available"

**Solution:**
- Update context.md with current focus
- Or provide context in command: `/bundle-create [task] "your context"`

---

## Time Estimate

- **Creating bundle:** <1 second (automated)
- **Manual creation:** 5-10 seconds
- **Recovery benefit:** +10-15% context restoration (70% → 80%+)

**ROI:** Minimal overhead, significant context improvement

---

## Related Commands

- `/bundle-load [task]` - Load full bundle history
- `/bundle-view [task]` - View recent bundles
- `/update-dev-docs [task]` - Update dev docs context
- `/create-dev-docs [task]` - Create new dev docs

---

Built with Claude Code v4.0 (Phase 17) 🚀
**Context Bundles:** 80%+ recovery across compactions
