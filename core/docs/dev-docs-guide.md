# Dev Docs Workflow (Context Persistence)

**Dev docs** survive context compactions and enable seamless task resumption with 95%+ context recovery.

## Directory Structure

```
/dev/active/[task-slug]/
├── [task-slug]-plan.md        # Approved plan
├── [task-slug]-context.md     # Current state, decisions, next steps
└── [task-slug]-tasks.md       # Checklist (survives compaction)
```

## The Four Commands

1. **`/create-dev-docs [task]`** - Create dev docs (or auto-created via PlanApproved hook)
2. **`/resume-dev`** - Auto-resume most recent task, update docs after work (RECOMMENDED)
3. **`/update-dev-docs [task]`** - Manually update context (if needed)
4. **`/review-dev-docs`** - Review all active tasks

## When to Use Dev Docs

**USE for:**
- ✅ Large tasks spanning multiple sessions (>2 hours)
- ✅ Complex implementations requiring careful planning
- ✅ Tasks that might get interrupted by compaction

**SKIP for:**
- ❌ Simple, single-session tasks (<30 minutes)
- ❌ Quick fixes or trivial changes

## Before Compaction Checklist

**ALWAYS update dev docs before compaction:**
- [ ] Current focus clearly stated in context.md
- [ ] Next step explicitly defined (not vague)
- [ ] All key decisions documented with rationale
- [ ] All modified files logged with change descriptions
- [ ] All completed tasks checked off in tasks.md
- [ ] Progress counter updated

## Continuing After Compaction

### Option 1: /resume-dev (RECOMMENDED)

**Zero friction** - Just run `/resume-dev`

Agent will:
1. Find most recently modified task in dev/active/
2. Load dev docs automatically
3. Display: "Resuming [task]. Last focus: [X]. Next step: [Y]. Progress: [Z/W]"
4. Execute next step
5. Auto-update dev docs + system docs after work

**Result:** 95%+ context recovery + automatic documentation updates

### Option 2: Manual (Traditional)

Say: **"Continue working on [task name]"**

Agent will:
1. Read dev docs (you must specify task name)
2. Display summary
3. Resume work (no auto-updates)

**When to use:** When you want manual control over updates

## Integration with Workflows

Dev docs integrate seamlessly with workflows:

```bash
# Create dev docs for task
/create-dev-docs add-user-auth

# Run workflow (auto-loads dev docs)
/workflow scout-plan-build "add user authentication" --task-name add-user-auth

# Workflow automatically:
# - Loads plan.md (if exists)
# - Updates context.md with progress
# - Checks off tasks in tasks.md
# - Appends to bundle.log
```

---

**See also:** `/load workflows` for workflow integration
**Load this file:** `/load devdocs`
