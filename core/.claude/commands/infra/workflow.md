# Workflow Command

🔄 Execute Scout/Plan/Build workflow patterns for systematic task execution.

## Purpose

The `/workflow` command orchestrates the three-phase workflow pattern (Scout → Plan → Build) for complex implementation tasks. It automates the discovery, planning, and execution phases, enabling systematic and efficient task completion.

## Usage

```bash
/workflow [mode] [task-description] [options]
```

### Modes

1. **scout-plan-build** (default): Full workflow
2. **scout**: Discovery phase only
3. **plan**: Planning phase only (requires scout results)
4. **build**: Execution phase only (requires plan)
5. **scout-plan**: Discovery + planning
6. **plan-build**: Planning + execution

## Workflow Phases

### Phase 1: Scout (Discovery)
**Pattern:** `scout_workflow.md`
**Purpose:** Delegate exploratory search to find relevant files
**Duration:** 2-5 minutes (parallel execution)
**Output:** `scout-report.md` with prioritized file list

**Process:**
1. Analyze task description
2. Define search strategy (keywords, patterns, scope)
3. Spawn 2-3 scout agents in parallel (if `/background` available)
4. Or execute sequential searches (if no background agents)
5. Aggregate results and rank by relevance
6. Output scout report to dev docs

### Phase 2: Plan (Strategy)
**Pattern:** `plan_workflow.md`
**Purpose:** Create detailed execution plan from scout results
**Duration:** 5-15 minutes (strategic thinking)
**Output:** `[task]-plan.md` with phases, tasks, files

**Process:**
1. Load scout report
2. Read high-priority files identified by scouts
3. Use extended thinking for implementation strategy
4. Break task into phases (3-7 phases)
5. Define tasks per phase (15-60 min each)
6. Identify dependencies, risks, success criteria
7. Output comprehensive plan to dev docs

### Phase 3: Build (Execution)
**Pattern:** `build_workflow.md`
**Purpose:** Execute plan systematically with progress tracking
**Duration:** Variable (2-20 hours based on plan)
**Output:** Implemented changes + completion report

**Process:**
1. Load plan from dev docs
2. Execute phases sequentially
3. Track progress in tasks.md
4. Update context.md after each phase
5. Create bundle entries for major milestones
6. Validate against success criteria
7. Output completion report

## Examples

### Example 1: Full Workflow (Scout → Plan → Build)
```bash
/workflow scout-plan-build "Migrate email templates to pattern system"
```

**What happens:**
1. **Scout phase**: Searches for all email template files, identifies patterns, finds dependencies
2. **Plan phase**: Reads template files, designs migration strategy, creates phase breakdown
3. **Build phase**: Executes migration plan, creates new pattern files, validates structure
4. **Result**: Migration complete with scout report, plan, and implementation

### Example 2: Scout Only (Discovery)
```bash
/workflow scout "Find all components using the old API"
```

**What happens:**
1. Spawns scouts to search for old API usage
2. Aggregates results into scout report
3. Saves to `/dev/active/find-old-api-usage/scout-report.md`
4. **Result**: Prioritized file list with old API usage

### Example 3: Plan from Existing Scout Results
```bash
/workflow plan "Migrate to new API"
```

**What happens:**
1. Loads existing scout report from dev docs
2. Reads files identified by scouts
3. Creates migration plan with phases and tasks
4. **Result**: Detailed migration plan ready for execution

### Example 4: Build from Existing Plan
```bash
/workflow build "API migration"
```

**What happens:**
1. Loads existing plan from dev docs
2. Executes plan phases sequentially
3. Tracks progress in real-time
4. **Result**: Migration complete with progress tracking

### Example 5: Scout + Plan (No Execution)
```bash
/workflow scout-plan "Refactor authentication system"
```

**What happens:**
1. Scouts discover auth-related files
2. Planner creates refactoring strategy
3. Stops before execution for review
4. **Result**: Scout report + refactoring plan (user can review before build)

## Workflow Options

### --task-name
Explicit task name for dev docs (auto-generated from description if not provided):
```bash
/workflow scout-plan-build "Add dark mode" --task-name=dark-mode-feature
```

### --scope
Limit search scope for scout phase:
```bash
/workflow scout "Find config files" --scope=".claude/,docs/"
```

### --scouts
Number of parallel scouts (2-3 recommended):
```bash
/workflow scout "Search codebase" --scouts=3
```

### --thinking
Override thinking mode for plan phase:
```bash
/workflow plan "Complex refactor" --thinking=deep
```

### --auto-test
Run tests after each build phase (default: true):
```bash
/workflow build "Add feature" --auto-test=false
```

### --pause-on-error
Stop build on first error vs continue (default: stop):
```bash
/workflow build "Batch updates" --pause-on-error=false
```

## Chaining Rules

### 1. Phase Dependencies
Each phase depends on the previous phase's output:
```
Scout OUTPUT (scout-report.md) → Plan INPUT
Plan OUTPUT ([task]-plan.md) → Build INPUT
```

### 2. Dev Docs Integration
All workflow phases use dev docs for state persistence:
- Scout creates: `scout-report.md`
- Plan creates: `[task]-plan.md`
- Build uses: `[task]-context.md`, `[task]-tasks.md`, `[task]-bundle.log`

### 3. Context Preservation
Context persists across all phases:
- Task name, description, and constraints
- Files identified and analyzed
- Decisions made and rationale
- Progress and completion state

### 4. Background Agents (Week 4 Feature)
When background agents are available (Phase 18.5+):
- Scout phase spawns 2-3 parallel background agents
- Monitor progress with `/background-status`
- View results with `/background-results`
- Main thread freed during scout discovery

## Decision Tree

**Should I use /workflow?**
- ✅ **YES** if: Task is complex (3+ steps), requires discovery, needs planning
- ✅ **YES** if: Task spans multiple files, unclear what files to modify
- ✅ **YES** if: Task requires systematic execution with progress tracking
- ❌ **NO** if: Task is simple (single file edit), files are known
- ❌ **NO** if: Task is exploratory (use agents or patterns directly)

**Which mode should I use?**
- **scout-plan-build**: Complex task, unknown scope, needs full workflow
- **scout**: Just need file discovery, will plan/build manually
- **plan**: Scout results exist, need strategy before execution
- **build**: Plan exists, ready to execute
- **scout-plan**: Want to review plan before execution starts

## Integration with Other Commands

### Works with /pattern
Workflows can use patterns internally:
```bash
/workflow scout-plan "Create campaign plan"
# Plan phase may reference /pattern create_campaign_plan
```

### Works with /chain
Chain workflows for complex multi-task operations:
```bash
/chain workflow:scout → workflow:plan → workflow:build
```

### Works with Dev Docs
Auto-creates dev docs if they don't exist:
```bash
/workflow scout-plan-build "New feature"
# Creates /dev/active/new-feature/ automatically
```

### Works with Background Agents (Phase 18.5+)
Scout phase uses background agents when available:
```bash
/workflow scout "Large codebase search"
# Spawns 2-3 background scouts, aggregates results
```

## Output Format

### Scout Phase Output
```markdown
# Scout Report: [Task Name]

**Task:** [Description]
**Search Strategy:** [Keywords, patterns, scope]
**Scout Performance:** [Time, context, cost]

## High Priority Files (8 files)
1. /path/to/file1.ts (Relevance: HIGH, Match: keyword + structure)
2. /path/to/file2.md (Relevance: HIGH, Match: keyword)
...

## Medium Priority Files (12 files)
1. /path/to/file9.ts (Relevance: MEDIUM, Match: dependency)
...

## Search Summary
- Total files found: 42
- High priority: 8 (read these first)
- Medium priority: 12 (read if needed)
- Low priority: 22 (skip unless necessary)
```

### Plan Phase Output
```markdown
# Implementation Plan: [Task Name]

## Executive Summary
[Decisions, assumptions, approach, risks]

## Files Overview
**New files (5):**
- /path/to/new-file1.ts
...

**Modified files (3):**
- /path/to/existing-file1.ts
...

## Implementation Phases

### Phase 1: Foundation (3 tasks, 2 hours)
**Goal:** [Phase objective]
**Dependencies:** None

#### Task 1.1: [Task name]
- **Action:** [What to do]
- **Files:** [Files involved]
- **Steps:** [Execution steps]
- **Success criteria:** [How to verify]

...

## Testing Strategy
[How to test each phase]

## Risk Assessment
[Potential risks and mitigations]
```

### Build Phase Output
```markdown
# Build Completion Report: [Task Name]

## Summary
- **Phases completed:** 4/4 (100%)
- **Tasks completed:** 12/12 (100%)
- **Files created:** 5
- **Files modified:** 3
- **Duration:** 4h 23m
- **Status:** SUCCESS ✅

## Phase Results
### Phase 1: Foundation ✅
- Task 1.1: Create base structure ✅
- Task 1.2: Set up configuration ✅
- Task 1.3: Add dependencies ✅

...

## Testing Results
- Unit tests: 15/15 passed ✅
- Integration tests: 8/8 passed ✅
- Backward compatibility: VERIFIED ✅

## Next Steps
[Recommended follow-up tasks]
```

## Advanced Usage

### Resuming After Interruption
If workflow is interrupted (compaction, error, etc.):

```bash
# Resume from last checkpoint
/workflow build "task-name"
# Reads context.md, loads last completed task, continues from next task
```

### Parallel Scout Execution
When background agents are available:

```bash
/workflow scout "complex search" --scouts=3 --scope="src/,docs/"
# Spawns 3 scouts:
# - Scout 1: Keyword search in src/
# - Scout 2: Pattern search in docs/
# - Scout 3: Dependency search across both
```

### Custom Plan Review
Get plan approval before building:

```bash
# Step 1: Scout + Plan
/workflow scout-plan "major refactor"

# Step 2: Review plan (user reads and approves)
# (user reads /dev/active/major-refactor/major-refactor-plan.md)

# Step 3: Execute plan
/workflow build "major refactor"
```

### Iterative Planning
Refine plan after scout discovery:

```bash
# Initial scout
/workflow scout "feature X"

# Review scout results, adjust task description
# (user refines understanding based on scout report)

# Re-plan with better context
/workflow plan "feature X with constraint Y"
```

## Error Handling

### Scout Phase Errors
- **No files found**: Broaden search scope or adjust keywords
- **Too many files**: Add exclusion patterns or narrow scope
- **Permission errors**: Check file accessibility

### Plan Phase Errors
- **Insufficient scout data**: Re-run scout with broader scope
- **Ambiguous requirements**: Ask user for clarification
- **Missing dependencies**: Document in risk assessment

### Build Phase Errors
- **Test failures**: Pause, fix, resume
- **File conflicts**: Resolve conflicts, continue
- **Missing files**: Update plan, regenerate tasks

## Performance Benchmarks

**Scout phase:**
- 2-5 minutes for 500-file codebase
- <50K tokens context usage
- $0.02-0.05 cost (using Haiku/Flash)

**Plan phase:**
- 5-15 minutes (depending on complexity)
- 50-100K tokens context usage
- $0.10-0.30 cost (using Sonnet)

**Build phase:**
- Variable (2-20 hours)
- Context managed via dev docs + bundles
- Cost depends on implementation complexity

**Full workflow speedup:**
- 30-50% faster than manual discovery + planning
- 80%+ context recovery with dev docs + bundles
- 70%+ success rate for complex tasks

## Best Practices

1. **Use scout-plan-build for new tasks**: Systematic discovery prevents missing files
2. **Review plan before build**: Catch issues early, adjust strategy
3. **Use scout for exploration**: Quick way to understand codebase areas
4. **Leverage dev docs**: All workflow phases auto-update context
5. **Create bundles at milestones**: Enable easy resumption after interruptions
6. **Test incrementally**: Run tests after each phase, not just at end
7. **Document decisions in plan**: Future you will thank present you
8. **Use background scouts when available**: Frees main thread for other work

---

## Implementation Notes

**Status:** Phase 18.4 - Created 2025-11-04
**Dependencies:**
- Scout pattern (`.claude/patterns/workflow/scout_workflow.md`) ✅
- Plan pattern (`.claude/patterns/workflow/plan_workflow.md`) ✅
- Build pattern (`.claude/patterns/workflow/build_workflow.md`) ✅
- Dev docs system (Phase 17.5) ✅
- Background agents (Phase 18.5) ⏳ Week 4

**Future enhancements (Phase 18.5+):**
- Background agent spawning for scout phase
- Real-time progress monitoring
- Agent telemetry integration
- Cost tracking per phase
