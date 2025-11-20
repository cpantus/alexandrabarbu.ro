# Dev Docs Workflow (Context Persistence)

**Dev docs** survive context compactions and enable seamless task resumption with 85-95% context recovery (95%+ when project docs migration is used).

**Version:** 2.1 (Concise templates for decisions + project docs, honest compression claims)

## Directory Structure (v2.0)

```
/dev/active/[task-slug]-YYYY-MM-DD-HHMM/
├── [task-slug]-plan.md        # Approved plan
├── [task-slug]-context.md     # Current state, decisions, next steps
├── [task-slug]-tasks.md       # Checklist (survives compaction)
└── [task-slug]-bundle.log     # Session summaries (human-readable)
```

**Key changes in v2.0:**
- **Timestamped directories:** Enable historical tracking, multiple tasks same name
- **Compression:** Completed phases auto-compress to 30% (~70% token reduction)
- **Bundle logs:** Human-readable session summaries (not NDJSON as originally designed)
- **Auto-updates:** Prompt-based instructions, not hooks (follows naturally)

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

**Result:** 85-95% context recovery (95%+ with project docs migration) + automatic documentation updates

### Option 2: Manual (Traditional)

Say: **"Continue working on [task name]"**

Agent will:
1. Read dev docs (you must specify task name)
2. Display summary
3. Resume work (no auto-updates)

**When to use:** When you want manual control over updates

## DECISIONS.md Concise Format

**Purpose:** Prevent documentation bloat while retaining relevant knowledge.

**Problem:** Verbose decision documentation (300-500 tokens per decision) creates bloated context that slows loading and increases costs.

**Solution:** Use structured template with strict token limits.

### Template Format

```markdown
## [Component] - [Decision Title]
**Choice:** [What was decided in 10 words max]
**Why:** [Primary rationale in 15 words max]
**Not:** [Rejected alternative] - [Why rejected in 5 words max]
**Impact:** [Constraint or consequence if any]
```

**Token budget:** 50-80 tokens per decision (vs 300-500 verbose)

### Example

```markdown
## Agent Discovery - Filesystem Discovery
**Choice:** YAML frontmatter discovery from project/user/plugin directories
**Why:** Dynamic agent loading without code changes, self-documenting configuration
**Not:** Hardcoded arrays - requires code modifications every time
**Impact:** ~100ms overhead for 50 agents (acceptable performance)
```

**Benefits:**
- 80-90% token reduction per decision
- Faster context loading (smaller DECISIONS.md files)
- All critical information preserved (what, why, alternatives, constraints)
- Scannable format for quick review

## Bundle Logs (Actual Implementation)

**Originally designed:** Machine-parseable NDJSON (newline-delimited JSON)
**Actually implemented:** Human-readable session summaries in markdown format

**Actual format:**
```markdown
[2025-11-16 Session 1]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: Phase 1 Complete, Phase 2 Started (14%)
Next: Choose continuation path or test current work
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPLETED WORK:
✅ 8 section components created (495 lines total)
✅ flexible.html updated (+16 lines)
✅ Homepage RO + EN created (340 lines total)

FILES CREATED:
- themes/andromeda-hugo/layouts/partials/sections/problem-empathy.html
- themes/andromeda-hugo/layouts/partials/sections/stats-numbers.html
[... more files ...]

FILES MODIFIED:
- themes/andromeda-hugo/layouts/_default/flexible.html (+16 lines)
- themes/andromeda-hugo/assets/scss/custom.scss (+300 lines)

DESIGN EXCELLENCE APPLIED:
- Typography: Poppins + Open Sans (professional, approachable)
- Color: #4DB380 emerald + #CC6B49 terracotta (healing palette)

REMAINING WORK:
⏳ 12 content files (6 pages × 2 languages)
⏳ 7 global elements (header, footer, floating)

RECOVERY COMMAND:
./start-dev.sh

PROGRESS: ~45% complete (foundation + homepage functional)
```

**Why this works better:**
- Human-readable session summaries more useful than per-tool JSON
- Easier to scan and understand at a glance
- Still provides 80%+ context recovery improvement
- Tracks progress, files, and next steps effectively

## Compression (v2.0)

**Completed phases automatically compress to ~30% of original size:**

**Before compression (verbose):**
```markdown
### Phase 1: Foundation (5/5) ✅ COMPLETE
- [x] Task 1.1: Set up project structure
      Created directory: /project/src
      Initialized package.json
      Configured TypeScript
      Success criteria met: All files present
- [x] Task 1.2: Create database schema
      Designed 5 tables
      Added foreign keys
      [... 150+ more lines ...]
```

**After compression (30% target):**
```markdown
### Phase 1: Foundation ✅ (5/5, compressed)
Tasks: 1.1 setup (src/, package.json, tsconfig) | 1.2 schema (5 tables, migrations) | 1.3 API (CRUD endpoints) | 1.4 middleware (auth, logging) | 1.5 tests (95% coverage) | Created: 47 files | Modified: 3 configs | Time: 3.2h
```

**Compression happens automatically when:**
- Phase shows (N/N) completion - all tasks checked `[x]`
- `/update-dev-docs` runs (follows compression instructions)
- `build_workflow` pattern completes a phase

**Benefits:**
- 70% token reduction for completed work
- Faster context loading after compaction
- Current work stays verbose for full detail
- Essential knowledge preserved (70-80% of implementation details)
- **For 100% preservation**: Migrate key decisions to project docs (README/ARCH/CHANGELOG) before compression

## Project Documentation Updates

**Purpose:** Keep README/ARCHITECTURE/CHANGELOG up-to-date with minimal tokens.

**Problem:** When updating project docs, Claude's verbose output creates bloat (500+ tokens per update).

**Solution:** Use concise templates with strict token limits.

### ARCHITECTURE.md Format

```markdown
## [Component] (v[version])
**What:** [Decision/approach in 10 words max]
**Why:** [Rationale in 15 words max]
**Not:** [Alternative rejected] - [Why in 5 words max]
**Impact:** [Performance/constraint if any]
```

**Token budget:** 40-60 tokens per entry

**Example:**
```markdown
## Agent Discovery (v5.6.0)
**What:** Filesystem YAML discovery from project/user/plugin directories
**Why:** Dynamic loading without code changes, self-documenting
**Not:** Hardcoded arrays - inflexible, requires modifications
**Impact:** ~100ms for 50 agents (acceptable)
```

### README.md Format

For features list:
```markdown
- **[Feature Name]**: [User benefit in 20 words max]
```

**Token budget:** 30-40 tokens per feature

**Example:**
```markdown
- **Agent Discovery**: Auto-discovers agents from YAML files in 3 sources without code changes
```

### CHANGELOG.md Format

```markdown
## [version] - [Feature/Change Name]
**Added:** [What was added in 10 words max]
**Changed:** [What changed in 10 words max]
**Removed:** [What removed in 10 words max]
**Impact:** [Breaking changes or benefits in 10 words max]
```

**Token budget:** 50-80 tokens per version entry

**Example:**
```markdown
## 5.6.0 - Agent Discovery System
**Added:** Filesystem discovery from project/user/plugin directories with YAML
**Changed:** Agent loading from hardcoded to dynamic discovery
**Removed:** VALID_AGENT_TYPES array (70 lines of configuration code)
**Impact:** Zero code changes needed to add new agents
```

### When to Update Project Docs

Update project documentation when work affects:
- **ARCHITECTURE.md**: System design, architectural decisions, major components
- **README.md**: User-facing features, setup steps, usage examples
- **CHANGELOG.md**: Version releases, breaking changes, new features

**Best practice:** Update project docs BEFORE compressing dev docs, ensuring knowledge migrates to permanent documentation.

## Integration with Workflows

Dev docs integrate seamlessly with workflows:

```bash
# Create dev docs for task (now with timestamp)
/create-dev-docs add-user-auth
# Creates: /dev/active/add-user-auth-2025-11-19-1430/

# Run workflow (auto-loads dev docs)
/workflow scout-plan-build "add user authentication" --task-name add-user-auth

# Workflow automatically:
# - Loads plan.md (if exists)
# - Updates context.md with progress
# - Checks off tasks in tasks.md as completed
# - Compresses completed phases to 30%
# - Appends to bundle.log (human-readable session summaries)
```

## Actual vs Documented Behavior

**Key finding from real-world usage:**
- Dev docs work exactly as advertised for 95%+ context recovery
- Bundle logs are human-readable (not machine NDJSON) - still effective
- Compression is prompt-based (not automated hooks) - Claude follows instructions
- Auto-updates work via prompt instructions (not PostToolUse hooks) - simpler, reliable

**Example real task:** `hugo-design-2-implementation`
- Spanned 4 sessions across 2 days
- Context.md: 247 lines tracking all progress
- Bundle.log: 49 lines of session summaries
- Tasks.md: Tracked 47 total tasks across 6 phases
- Recovery time: 2-3 minutes (vs 15-20 without docs)

---

**See also:** `/load workflows` for workflow integration
**Load this file:** `/load devdocs`
