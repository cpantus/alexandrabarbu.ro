# 🔄 Resume Active Task

**Category:** Development & Workflows
**Purpose:** Automatically resume work on the most recently active dev docs task with auto-updates
**Version:** 1.0
**Part of:** Dev Docs Workflow (Context Persistence)

---

## ⚠️ MODE CHECK - EXECUTE FIRST

**CRITICAL:** Before proceeding, check if marketing mode is active. `/resume-dev` is only available in **core mode** (infrastructure development).

**Check:** Read `../../projects/marketing-agent/.claude/settings.local.json` (or appropriate project path) and parse the JSON:
- If file exists AND contains `"outputStyle": "marketing-expert"` → Marketing mode is ACTIVE
- Otherwise → Core mode (proceed normally)

**If marketing mode is ACTIVE, display and EXIT:**

```
❌ Resume Not Available in Marketing Mode

The /resume-dev command is for core infrastructure development work only.
Marketing projects use campaign tracking and dev docs instead.

To deactivate marketing mode and return to core mode:
  /output-style default

Current mode: Marketing (activated via output style)
```

**If core mode (marketing NOT active), proceed to "WHEN TO USE" section below.**

---

## WHEN TO USE

Use `/resume-dev` when you want to:
- Continue work on the most recent active task
- Pick up where you left off after a break or compaction
- Automatically load the right dev docs without remembering task names
- Have dev docs updated automatically after completing work

**Benefits:**
- ⚡ **Zero friction** - No need to remember task names
- 📂 **Auto-detection** - Finds most recently modified dev docs folder
- 📝 **Auto-updates** - Updates dev docs AND relevant system docs after work
- 🎯 **Smart resumption** - Loads context, displays progress, executes next step

---

## SYNTAX

```bash
# Resume most recent task
/resume-dev

# Resume specific task (optional)
/resume-dev [task-name]

# Options
/resume-dev --dry-run          # Preview what would be resumed
/resume-dev --skip-to-next     # Skip to next most recent task
/resume-dev --update-only      # Just update docs, don't do work
```

---

## WHAT IT DOES

### 1. Find Most Recent Task

Scans `dev/active/` directory and finds the folder with the most recent modification time:

```bash
dev/active/
├── pattern-based-config-standards-v5-v6/  # Modified 2025-11-07 21:30 ← SELECTED
├── demo-conversion-optimization/          # Modified 2025-11-05 14:20
└── code-execution-mcp/                    # Modified 2025-11-03 09:15
```

### 2. Load Dev Docs

Reads the three core files:
- `[task]-plan.md` - Approved implementation plan
- `[task]-context.md` - Current state, decisions, next steps
- `[task]-tasks.md` - Task checklist with progress

### 3. Display Resumption Summary

```
🔄 RESUMING TASK: pattern-based-config-standards-v5-v6
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Progress: 39/42 tasks complete (93%)
📍 Last Focus: Phase 3 (v6.0) - Generation capability
⏭️  Next Step: Update ARCHITECTURE.md and README.md

Recent Changes:
  - Updated CHANGELOG.md with v6.0 release notes
  - Created /generate command documentation
  - Enhanced 3 pattern files with OUTPUT sections

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Ready to continue!
```

### 4. Execute Next Step

Based on "Next Step" in context.md:
- If next step is specific → Execute it
- If next step mentions docs → Update relevant system docs
- If task is complete → Ask about archiving
- If next step is vague → Ask for clarification

### 5. Auto-Update All Relevant Documentation

After completing work, automatically updates:

**Dev Docs:**
- `[task]-context.md` - New focus, completed work, next step
- `[task]-tasks.md` - Check off completed tasks, update progress

**System Docs (if relevant):**
- `README.md` - Update key features, command lists, quick start
- `ARCHITECTURE.md` - Add new components, update system design
- `CHANGELOG.md` - Add release notes for new versions
- Command docs - Update command count, add new commands
- Pattern/skill indices - Update counts, add new entries

**Detection Rules:**
- If task adds new feature → Update README.md key features
- If task changes architecture → Update ARCHITECTURE.md
- If task adds version → Update CHANGELOG.md
- If task adds command → Update command count in docs
- If task adds agent/pattern/skill → Update relevant indices

---

## WORKFLOW

```
User: /resume-dev

→ Find most recent: pattern-based-config-standards-v5-v6/
→ Read dev docs: plan.md, context.md, tasks.md
→ Display summary: Progress, last focus, next step
→ Execute next step: Update ARCHITECTURE.md and README.md
→ Update dev docs: Mark tasks complete, update context
→ Update system docs: README.md, ARCHITECTURE.md, etc.
→ Confirm: Show all updates made
```

---

## EXAMPLES

### Example 1: Resume with System Doc Updates

```bash
User: /resume-dev

System:
🔄 RESUMING TASK: add-user-authentication
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Progress: 14/15 tasks complete (93%)
⏭️  Next Step: Update README.md and ARCHITECTURE.md with auth system

Starting work on system documentation...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Updated README.md:
   - Added authentication to key features
   - Updated quick start with login flow

✅ Updated ARCHITECTURE.md:
   - Added "Authentication System" section
   - Documented JWT token flow
   - Updated security considerations

✅ Updated CHANGELOG.md:
   - Added v3.0 release notes
   - Documented breaking changes

✅ Updated dev docs:
   - Marked task 14 complete
   - Progress: 15/15 tasks complete (100%)
   - Status: COMPLETE ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Task complete! Would you like to archive?
```

---

### Example 2: Resume After Compaction

```bash
User: /resume-dev

System:
🔄 RESUMING TASK: campaign-analytics-dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Progress: 22/30 tasks complete (73%)
📍 Last Focus: WebSocket real-time updates
⏭️  Next Step: Add dashboard widget components

Context recovered from dev docs (95%+ accuracy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Agent implements dashboard widgets]

✅ Completed: Dashboard widget components
✅ Updated dev docs: Progress 23/30 (77%)
⏭️  Next Step: Test dashboard with real data
```

---

### Example 3: Automatic Feature Documentation

```bash
User: /resume-dev

System:
🔄 RESUMING TASK: pattern-based-config-standards-v5-v6
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Progress: 38/42 tasks complete (90%)
⏭️  Next Step: Document v6.0 generation capability

Detected: New v6.0 feature requires system doc updates
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Updated ARCHITECTURE.md:
   - Added "Component Generation System (v6.0+)" section
   - Documented template engine, generation workflow
   - Updated component types (8 supported)

✅ Updated CHANGELOG.md:
   - Added comprehensive v6.0 release notes
   - Documented Phase 3 deliverables
   - Listed benefits and impact

✅ Updated README.md:
   - Added v6.0 to key capabilities
   - Updated customization section with /generate examples
   - Updated agent/pattern counts

✅ Updated dev docs:
   - Marked documentation tasks complete
   - Updated phase 3 progress to 100%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 All documentation updated!
```

---

## AUTO-UPDATE LOGIC

### Dev Docs Updates

**context.md:**
```markdown
# Before
**Last Updated:** 2025-11-07 14:00 UTC
**Status:** Phase 3 in progress
**Next Step:** Update documentation

# After
**Last Updated:** 2025-11-07 15:30 UTC
**Status:** Phase 3 COMPLETE ✅
**Next Step:** Testing in production

Recent completed:
- ✅ Updated ARCHITECTURE.md with v6.0 section
- ✅ Updated CHANGELOG.md with release notes
- ✅ Updated README.md with new features
```

**tasks.md:**
```markdown
# Before
**Progress:** 38/42 tasks complete (90%)
- [ ] 3.11: Update ARCHITECTURE.md
- [ ] 3.12: Update CHANGELOG.md
- [ ] 3.13: Update README.md

# After
**Progress:** 41/42 tasks complete (98%)
- [x] 3.11: Update ARCHITECTURE.md
- [x] 3.12: Update CHANGELOG.md
- [x] 3.13: Update README.md
```

### System Docs Updates

**README.md - Automatic Updates:**
- **Key Capabilities** section → Add new features
- **Command counts** → Update when commands added
- **Quick start** section → Add new workflows
- **Customization** section → Add generation examples

**ARCHITECTURE.md - Automatic Updates:**
- **Core Components** → Add new subsystems
- **Agent/Pattern/Skill counts** → Update numbers
- **New sections** → Add feature documentation
- **Integration points** → Document new connections

**CHANGELOG.md - Automatic Updates:**
- **New version section** → Add release notes
- **Deliverables** → List what was built
- **Benefits** → Document impact
- **Examples** → Show usage

---

## SYSTEM DOC UPDATE RULES

The `/resume-dev` command intelligently updates system docs based on task type:

### Feature Addition Tasks
**Updates:** README.md (key features), ARCHITECTURE.md (new section), CHANGELOG.md (version)

**Example:** Adding `/generate` command
- README: Add to capabilities list, show usage example
- ARCHITECTURE: Add "Component Generation System" section
- CHANGELOG: Add v6.0 release notes

### Architecture Changes
**Updates:** ARCHITECTURE.md (comprehensive), README.md (if user-facing)

**Example:** Refactoring validators
- ARCHITECTURE: Update validation system section
- README: Update if affects user workflow

### Command/Agent/Pattern Addition
**Updates:** README.md (counts), ARCHITECTURE.md (list), relevant index files

**Example:** Adding new agent
- README: Update agent count (18 → 19)
- ARCHITECTURE: Add agent to list with description
- agent-index.json: Add entry

### Bug Fixes
**Updates:** CHANGELOG.md only (patch version)

**Example:** Fixing validation bug
- CHANGELOG: Add to patch version section

### Documentation-Only Changes
**Updates:** Specified docs only

**Example:** Improving guides
- Update only the guides mentioned in tasks

---

## DETECTION ALGORITHM

```typescript
function detectSystemDocUpdates(task: DevDocsTask): string[] {
  const docsToUpdate: string[] = [];

  // Check task name and context for keywords
  const keywords = {
    readme: ['feature', 'capability', 'command', 'workflow', 'quick start'],
    architecture: ['system', 'architecture', 'component', 'integration', 'design'],
    changelog: ['version', 'release', 'v[0-9]', 'breaking change']
  };

  // Check completed work descriptions
  const completedWork = extractCompletedWork(task.context);

  // Rule-based detection
  if (hasNewFeature(completedWork)) {
    docsToUpdate.push('README.md', 'ARCHITECTURE.md', 'CHANGELOG.md');
  }

  if (hasArchitectureChange(completedWork)) {
    docsToUpdate.push('ARCHITECTURE.md');
  }

  if (hasVersionBump(task)) {
    docsToUpdate.push('CHANGELOG.md');
  }

  // Check if next step explicitly mentions docs
  if (task.nextStep.includes('README') || task.nextStep.includes('documentation')) {
    docsToUpdate.push('README.md', 'ARCHITECTURE.md');
  }

  return [...new Set(docsToUpdate)]; // Remove duplicates
}
```

---

## ERROR HANDLING

### No Active Tasks

```
❌ No active tasks found in dev/active/

Options:
1. Create new task: /create-dev-docs [task-name]
2. View archived: ls dev/archive/
3. Start without dev docs (not recommended)
```

### Missing Dev Doc Files

```
⚠️  Incomplete dev docs in: dev/active/task-name/

Missing: task-name-context.md, task-name-tasks.md

Options:
1. Recreate: /create-dev-docs task-name
2. Skip to next: /resume --skip-to-next
```

### Vague Next Step

```
⚠️  Next step is too vague: "Continue working"

Cannot execute automatically. Please clarify:
What specifically should be done next?
>
```

### Doc Update Conflicts

```
⚠️  README.md was modified externally

Options:
1. Review changes and merge manually
2. Overwrite with auto-generated updates
3. Skip README.md updates

Choose [1/2/3]:
```

---

## INTEGRATION WITH OTHER COMMANDS

### With /create-dev-docs

```bash
/create-dev-docs new-feature    # Create dev docs
/resume-dev                     # Auto-loads new-feature
```

### With /update-dev-docs

```bash
/resume-dev                     # Do work, auto-updates docs
# OR manually:
/update-dev-docs task-name      # Manual update
```

### With /review-dev-docs

```bash
/review-dev-docs                # See all tasks
/resume-dev                     # Resume most recent
# OR:
/resume-dev specific-task       # Resume specific one
```

### With Workflows

```bash
/resume-dev                     # Resume task
# Uses workflow if appropriate for next step
# Automatically integrates with dev docs
```

---

## BEST PRACTICES

### 1. Keep Next Steps Specific
```markdown
✅ Good: "Update ARCHITECTURE.md with component generation section"
❌ Vague: "Update documentation"
```

### 2. Let /resume-dev Handle Doc Updates
```bash
# Don't manually update README/ARCHITECTURE during task
# Let /resume-dev detect and update automatically
/resume-dev  # Handles all doc updates intelligently
```

### 3. Review Auto-Updates
After `/resume-dev` completes:
- Check what docs were updated
- Review changes for accuracy
- Adjust if needed

### 4. Use Before Compaction
```bash
/update-dev-docs task-name  # Save state before compaction
# ... compaction happens ...
/resume-dev                 # Seamlessly continues
```

---

## NOTES

- **Automatic Detection**: Finds most recent task automatically
- **Smart Updates**: Only updates relevant system docs
- **Context Recovery**: 95%+ accuracy after compaction
- **Comprehensive**: Updates dev docs + system docs
- **Safe**: Reviews changes, handles conflicts
- **Efficient**: Single command for full workflow

---

## SEE ALSO

- `/create-dev-docs` - Create new dev docs
- `/update-dev-docs` - Manual dev docs update
- `/review-dev-docs` - Review all active tasks
- `@.claude/docs/dev-docs-guide.md` - Full workflow guide
- `@dev/active/` - All active task folders

---

**Command Version:** 1.0
**Last Updated:** 2025-11-07
**Integration:** Dev Docs Workflow + System Documentation
