# Create Dev Docs Workflow

📄 **Usage:** `/create-dev-docs [task-name]`

**Examples:**
- `/create-dev-docs "email campaign redesign"`
- `/create-dev-docs "add viral sharing features"`
- `/create-dev-docs` (uses most recent plan if available)

**Purpose:** Create persistent development documentation for large tasks to survive context resets and compactions.

---

## When to Use Dev Docs

Use dev docs for:
- ✅ Large tasks spanning multiple sessions
- ✅ Complex implementations requiring careful planning
- ✅ Tasks that might get interrupted by context compaction
- ✅ Multi-step workflows with dependencies
- ✅ Tasks requiring institutional knowledge

Skip dev docs for:
- ❌ Simple, single-session tasks
- ❌ Quick fixes or trivial changes
- ❌ Exploratory research (no clear deliverable yet)

---

## Workflow

### Step 1: Determine Task Name

**If task name provided:**
- Use the provided task name directly
- Create slug: lowercase, hyphens (e.g., "Email Campaign Redesign" → "email-campaign-redesign")

**If no task name provided:**
- Check if there's a recent approved plan
- Extract task name from plan content
- If no plan available, ask user for task name

### Step 2: Create Directory Structure

Create `/dev/active/[task-slug]/` directory with 3 files:

```
/dev/active/[task-slug]/
├── [task-slug]-plan.md        # The approved plan or task description
├── [task-slug]-context.md     # Key files, decisions, next steps
└── [task-slug]-tasks.md       # Checklist (survives compaction)
```

### Step 3: Generate Plan File

**File:** `[task-slug]-plan.md`

**Template:**
```markdown
# [Task Name] - Plan

**Created:** [Date]
**Status:** Active
**Estimated time:** [X hours]

## Overview

[High-level description of the task]

## Goals

1. [Primary goal]
2. [Secondary goal]
3. [Tertiary goal]

## Approach

[Step-by-step approach or plan]

## Success Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Risks & Mitigation

**Risks:**
- [Risk 1]: [Mitigation strategy]
- [Risk 2]: [Mitigation strategy]

## Notes

[Any additional context or considerations]
```

### Step 4: Generate Context File

**File:** `[task-slug]-context.md`

**Template:**
```markdown
# [Task Name] - Context

**Last Updated:** [Date]

## Quick Reference

**Status:** [In Progress / Blocked / Nearly Complete]
**Current Focus:** [What you're working on right now]
**Next Step:** [Immediate next action]

## Key Files Modified

- `path/to/file1.ts` - [What changed and why]
- `path/to/file2.ts` - [What changed and why]
- `path/to/file3.md` - [What changed and why]

## Key Decisions Made

**[Date] - [Decision Title]**
- **Context:** [Why we needed to decide]
- **Decision:** [What we decided]
- **Rationale:** [Why we chose this approach]
- **Alternatives Considered:** [What else we thought about]

## Open Questions

1. [Question 1 - needs resolution before proceeding]
2. [Question 2 - can be decided later]

## Blockers

- [ ] [Blocker 1 - what's blocking progress]
- [ ] [Blocker 2 - what needs to be unblocked]

## Testing Notes

**What's been tested:**
- [Test scenario 1]: ✅ Passing
- [Test scenario 2]: ❌ Failing (see issue above)

**What still needs testing:**
- [ ] [Test scenario 3]
- [ ] [Test scenario 4]

## Before Compaction Checklist

Before context gets compacted, ensure:
- [ ] All key decisions documented above
- [ ] File changes logged
- [ ] Next steps clearly stated
- [ ] Open questions captured
- [ ] Tasks.md updated with progress
```

### Step 5: Generate Tasks File

**File:** `[task-slug]-tasks.md`

**Template:**
```markdown
# [Task Name] - Tasks

**Last Updated:** [Date]
**Progress:** [X/Y tasks complete]

## High-Level Phases

- [ ] Phase 1: [Phase name] (0/X tasks)
- [ ] Phase 2: [Phase name] (0/X tasks)
- [ ] Phase 3: [Phase name] (0/X tasks)

## Detailed Task Breakdown

### Phase 1: [Phase Name]

- [ ] Task 1.1: [Description]
- [ ] Task 1.2: [Description]
- [ ] Task 1.3: [Description]

### Phase 2: [Phase Name]

- [ ] Task 2.1: [Description]
- [ ] Task 2.2: [Description]
- [ ] Task 2.3: [Description]

### Phase 3: [Phase Name]

- [ ] Task 3.1: [Description]
- [ ] Task 3.2: [Description]

## Completed Tasks

✅ [Date] - [Task description]
✅ [Date] - [Task description]

## Notes

[Any notes about task ordering, dependencies, or special considerations]
```

### Step 6: Create Initial Bundle Entry

**After creating dev docs, automatically create the first bundle entry:**

Run the context-bundle hook to initialize bundle log:
```bash
ts-node .claude/hooks/context-bundle.ts "create-dev-docs: [task-name]" "create-dev-docs" "success"
```

This creates:
- Initial bundle log file: `[task-slug]-bundle.log`
- First entry with task creation timestamp
- Baseline context snapshot

**Bundle entry format:**
```json
{
  "timestamp": "2025-11-04T14:00:00Z",
  "prompt": "create-dev-docs: email-campaign-redesign",
  "tools": [{"type": "create-dev-docs", "description": "Dev docs creation"}],
  "outcome": "success",
  "contextSnapshot": "Status: Active. Starting task: [task-name]",
  "filesModified": ["plan.md", "context.md", "tasks.md"]
}
```

### Step 7: Confirm Creation

Display confirmation message with:
- ✅ Directory created
- ✅ 3 files generated
- ✅ Bundle log initialized
- 📁 Location: `/dev/active/[task-slug]/`
- 📋 Next steps: Update files as you work, use `/update-dev-docs` before compaction

---

## How to Continue After Compaction

**When context resets:**

1. Say: "Continue working on [task name]"
2. Claude will:
   - Read `/dev/active/[task-slug]/[task-slug]-plan.md`
   - Read `/dev/active/[task-slug]/[task-slug]-context.md`
   - Read `/dev/active/[task-slug]/[task-slug]-tasks.md`
   - Resume from last known state with full context

**Continuity rate:** 95%+ (task context survives compaction)

---

## Integration with Planning Mode

**Automatic creation:**
- When you approve a plan in planning mode
- The `PlanApproved` hook automatically runs this workflow
- No manual invocation needed

**Manual creation:**
- Use `/create-dev-docs [task-name]` anytime
- Useful for tasks not started in planning mode
- Or for breaking large tasks into sub-tasks

---

## Best Practices

**DO:**
- ✅ Create dev docs BEFORE starting large tasks
- ✅ Update context.md frequently (every 1-2 hours of work)
- ✅ Check off tasks in tasks.md as you complete them
- ✅ Document key decisions in context.md immediately
- ✅ Run `/update-dev-docs` before long breaks or end of session

**DON'T:**
- ❌ Wait until compaction to create dev docs (too late!)
- ❌ Create dev docs for trivial tasks (overhead not worth it)
- ❌ Forget to update files as you work (defeats the purpose)
- ❌ Skip documenting "why" behind decisions

---

## Time Estimate

- Creating dev docs: 2-3 minutes
- Updating during work: 30 seconds every hour
- Recovering after compaction: 1-2 minutes (vs 10-20 min re-understanding task)

**ROI:** 10-20x time savings on multi-session tasks

---

## Example Confirmation Message

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ DEV DOCS CREATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Directory: /dev/active/email-campaign-redesign/

Files created:
  ✅ email-campaign-redesign-plan.md
  ✅ email-campaign-redesign-context.md
  ✅ email-campaign-redesign-tasks.md
  📦 email-campaign-redesign-bundle.log (initialized)

📋 Next Steps:
  1. Update context.md as you work
  2. Check off tasks in tasks.md
  3. Run /update-dev-docs before compaction
  4. To resume: "Continue working on email campaign redesign"

💡 Tip: Your work will now survive context resets!
   Bundle logs improve recovery from 70% → 80%+

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
