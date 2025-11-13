# Update Dev Docs Workflow

📝 **Usage:** `/update-dev-docs [task-name]`

**Examples:**
- `/update-dev-docs "email campaign redesign"`
- `/update-dev-docs` (updates current active task)

**Purpose:** Update dev docs before context compaction to preserve progress, decisions, and next steps.

---

## When to Update Dev Docs

**CRITICAL: Update before:**
- 🔴 Context compaction warning appears
- 🔴 End of work session (long break)
- 🔴 Major milestone completion
- 🔴 Key decision made

**Also update regularly:**
- 🟡 Every 1-2 hours of active work
- 🟡 After completing significant tasks
- 🟡 When switching between tasks
- 🟡 Before asking complex questions

**Why this matters:**
Without updated dev docs, context compaction = losing ALL progress and context.
With updated dev docs, you can resume instantly with full context restored.

---

## Workflow

### Step 1: Identify Active Task

**If task name provided:**
- Load dev docs for that specific task
- Read all 3 files: plan.md, context.md, tasks.md

**If no task name provided:**
- Check `/dev/active/` for directories
- If only 1 active task: auto-select it
- If multiple tasks: ask which one to update
- If no tasks: suggest creating one with `/create-dev-docs`

### Step 2: Review Current State

Read all 3 dev docs files:
- `[task]-plan.md` - Original plan (rarely changes)
- `[task]-context.md` - Working context (frequently updated)
- `[task]-tasks.md` - Task checklist (frequently updated)

**Display summary:**
```
📋 Current Task: [Task Name]
📅 Last Updated: [X hours/days ago]
✅ Progress: [X/Y tasks complete]
🎯 Current Focus: [From context.md]
```

### Step 3: Update Context File

**Guide user through updating `[task]-context.md`:**

**1. Update Quick Reference:**
```markdown
## Quick Reference

**Status:** [Ask: Still in progress / Blocked / Nearly complete?]
**Current Focus:** [Ask: What are you working on right now?]
**Next Step:** [Ask: What's the immediate next action?]
```

**2. Update Key Files Modified:**
```markdown
## Key Files Modified

[Review recent Edit/Write tool uses, add new files]
- `new/file.ts` - [Ask: What changed and why?]
- `existing/file.ts` - [Updated: New changes...]
```

**3. Document New Decisions:**
```markdown
## Key Decisions Made

**[Today's Date] - [Ask: What decision did you make?]**
- **Context:** [Ask: Why did you need to decide this?]
- **Decision:** [Ask: What did you decide?]
- **Rationale:** [Ask: Why this approach?]
- **Alternatives Considered:** [Ask: What else did you consider?]
```

**4. Update Open Questions:**
```markdown
## Open Questions

[Review existing questions]
- [Mark resolved questions]
- [Add new questions]
```

**5. Update Blockers:**
```markdown
## Blockers

[Review existing blockers]
- [x] ~~Blocker 1~~ - Resolved: [How it was resolved]
- [ ] New blocker - [Description]
```

**6. Update Testing Notes:**
```markdown
## Testing Notes

**What's been tested since last update:**
- [New test scenario]: ✅/❌ [Result]

**What still needs testing:**
- [ ] [Update list]
```

### Step 4: Update Tasks File

**Guide user through updating `[task]-tasks.md`:**

**1. Check off completed tasks:**
```markdown
## Detailed Task Breakdown

### Phase 1: [Phase Name]

- [x] Task 1.1: [Description] ✅ [Date completed]
- [x] Task 1.2: [Description] ✅ [Date completed]
- [ ] Task 1.3: [Description]
```

**2. Move completed tasks to "Completed Tasks" section:**
```markdown
## Completed Tasks

✅ [Date] - Task 1.1: [Description]
✅ [Date] - Task 1.2: [Description]
```

**3. Add new tasks discovered during work:**
```markdown
### Phase 2: [Phase Name]

- [ ] Task 2.1: [Existing]
- [ ] Task 2.2: [Existing]
- [ ] Task 2.3: [NEW - discovered during implementation]
```

**4. Update progress counter:**
```markdown
**Progress:** [X/Y tasks complete] (was [X-N/Y])
```

### Step 5: Update Plan File (If Needed)

**Usually plan.md stays unchanged, but update if:**
- Scope changed significantly
- Timeline adjusted
- Goals refined
- Risks evolved

**Ask user:** "Has the overall plan changed? (Y/N)"

If yes, update plan.md sections that changed.

### Step 6: Create Bundle Entry

**After updating dev docs, automatically create a bundle entry:**

Run the context-bundle hook to append execution log:
```bash
ts-node .claude/hooks/context-bundle.ts "update-dev-docs: [brief summary]" "update-dev-docs" "success"
```

This captures:
- Timestamp of update
- Summary of what was updated
- Current context snapshot
- Modified files list

**Bundle format (appended to [task]-bundle.log):**
```json
{
  "timestamp": "2025-11-04T14:23:45Z",
  "prompt": "update-dev-docs: Updated context with SendGrid integration progress",
  "tools": [{"type": "update-dev-docs", "description": "Dev docs update"}],
  "outcome": "success",
  "contextSnapshot": "Focus: Integrating SendGrid API. Next: Test integration with sample campaign",
  "filesModified": ["context.md", "tasks.md"]
}
```

### Step 7: Confirm Updates

Display update summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ DEV DOCS UPDATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Task: [Task Name]
📅 Last Updated: [Previous] → [Now]
✅ Progress: [X/Y → X+N/Y tasks]

Updated Files:
  📝 context.md - [What was updated]
  ✓ tasks.md - [X new tasks completed, Y new tasks added]
  📋 plan.md - [Updated / Unchanged]

📊 Summary:
  ✅ Completed: [X tasks]
  🔄 In Progress: [Y tasks]
  📋 Remaining: [Z tasks]
  🚧 Blockers: [N blockers]

📦 Bundle Entry: Created in [task]-bundle.log
   Context recovery improved: 70% → 80%+

💡 You're ready for compaction! Context will survive.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Before Compaction Checklist

Before context gets compacted, ensure you've updated:

**context.md:**
- [ ] Current focus clearly stated
- [ ] Next step explicitly defined
- [ ] All key decisions documented
- [ ] All modified files logged
- [ ] Open questions captured
- [ ] Blockers documented

**tasks.md:**
- [ ] All completed tasks checked off
- [ ] Newly discovered tasks added
- [ ] Progress counter updated
- [ ] No ambiguous task descriptions

**plan.md:**
- [ ] Scope changes reflected (if any)
- [ ] Timeline adjustments noted (if any)

**If all checked:** ✅ You're safe to compact!

---

## Smart Update Prompts

The command should intelligently prompt based on what changed:

**If files were edited recently:**
```
I noticed you edited these files since last update:
- src/components/email-builder.tsx
- src/lib/campaign-utils.ts
- README.md

Add these to "Key Files Modified"? (Y/N)
If yes, explain what changed in each.
```

**If new decisions were made:**
```
I see you made implementation choices today.
Any key decisions to document? (Y/N)
If yes, walk through decision template.
```

**If blockers were mentioned:**
```
You mentioned being stuck on [X] earlier.
Is this a blocker to document? (Y/N)
If yes, add to Blockers section.
```

---

## Interactive vs. Quick Update Modes

**Interactive Mode (default):**
- Walk through each section
- Ask questions for each update
- Thorough, ensures nothing missed
- Time: 3-5 minutes

**Quick Update Mode:**
```
/update-dev-docs --quick
```
- Auto-detect file changes
- Prompt only for critical items (status, next step)
- Fast, for frequent updates
- Time: 30-60 seconds

---

## Best Practices

**DO:**
- ✅ Update frequently (every 1-2 hours)
- ✅ Be specific in "Next Step" (not "Continue working")
- ✅ Document WHY behind decisions (future you will thank you)
- ✅ Log ALL modified files (even small changes)
- ✅ Update BEFORE compaction warning

**DON'T:**
- ❌ Wait until compaction to update (you'll forget details)
- ❌ Skip documenting "obvious" decisions (they're not obvious later)
- ❌ Write vague next steps ("Fix bugs", "Test more")
- ❌ Forget to move completed tasks to "Completed" section

---

## Time Estimates

**Interactive update:** 3-5 minutes
**Quick update:** 30-60 seconds
**Recovery without update:** 10-20 minutes (re-understanding task)

**ROI:** Update now = save 10x time later

---

## Example Update Session

```
User: /update-dev-docs

Claude:
📋 Found 1 active task: email-campaign-redesign
📅 Last updated: 3 hours ago
✅ Progress: 8/15 tasks complete

Let's update your dev docs before compaction.

────────────────────────────────────────

1️⃣ QUICK REFERENCE

Current status in context.md: "In Progress"
Is this still accurate? (Y/N)

> Y

Current focus: "Implementing email template builder"
Is this still your focus? (Y/N)

> N

What's your current focus now?

> Integrating with SendGrid API

Great! Next step was: "Add drag-drop functionality"
Is this still the next step? (Y/N)

> N

What's the immediate next action?

> Test SendGrid integration with sample campaign

────────────────────────────────────────

2️⃣ FILES MODIFIED

I noticed you edited:
- src/integrations/sendgrid.ts
- src/lib/email-sender.ts

Add these to Key Files Modified? (Y/N)

> Y

What changed in src/integrations/sendgrid.ts?

> Added SendGrid API client with authentication and rate limiting

What changed in src/lib/email-sender.ts?

> Created queue system for bulk email sending

────────────────────────────────────────

3️⃣ KEY DECISIONS

Any key decisions to document? (Y/N)

> Y

Decision title?

> Use queue system instead of direct API calls

Why did you need to decide this?

> SendGrid has rate limits, need to avoid hitting them

What did you decide?

> Implement Redis-based queue with 100 emails/second limit

Alternatives considered?

> Direct API calls (would hit rate limits), delay-based throttling (unreliable)

────────────────────────────────────────

4️⃣ TASKS COMPLETED

Which tasks did you complete? (Enter numbers, comma-separated)

Available tasks:
[8] Integrate with email service provider
[9] Add email queue system

> 8,9

────────────────────────────────────────

5️⃣ CREATING BUNDLE ENTRY

Creating execution log entry...

Bundle entry created:
  📦 File: /dev/active/email-campaign-redesign/email-campaign-redesign-bundle.log
  🕐 Timestamp: 2025-11-04T14:23:45Z
  📸 Snapshot: "Focus: Integrating SendGrid API. Next: Test integration"

────────────────────────────────────────

✅ DEV DOCS UPDATED

Updated Files:
  📝 context.md - Updated focus, next step, files, decisions
  ✓ tasks.md - 2 new tasks completed (8/15 → 10/15)
  📦 bundle.log - New entry appended

You're ready for compaction! Context will survive.
```

---

## Recovering After Compaction

**When context resets, simply say:**

"Continue working on [task name]"

Claude will:
1. Read `/dev/active/[task]/[task]-plan.md`
2. Read `/dev/active/[task]/[task]-context.md`
3. Read `/dev/active/[task]/[task]-tasks.md`
4. Load `/dev/active/[task]/[task]-bundle.log` (execution history)
5. Display: "Resuming [task]. Last focus: [X]. Next step: [Y]. Progress: [Z/W]"
6. Continue exactly where you left off

**Success rate:** 95%+ full context restoration

**With bundles:**
- 80%+ context recovery (vs 70% without bundles)
- Full execution history available
- Can trace back decisions and changes
- Better understanding of work progression
