# Build Workflow Pattern

**Category:** Workflow
**Purpose:** Execute implementation plan systematically
**Use When:** After Plan completes, ready to build/modify files
**Cost:** High (actual implementation work)
**Speed:** Variable (depends on plan complexity, 2-20 hours)

---

## INPUT

Required:
- **plan_file** - Path to plan file (e.g., /dev/active/[task]/[task]-plan.md)
- **task_name** - Name of the task (for context/progress tracking)

Optional:
- **start_phase** - Phase to start from (default: Phase 1)
- **start_task** - Task to start from (default: Task 1.1)
- **auto_test** - Run tests after each phase (default: true)
- **auto_bundle** - Create bundle entries automatically (default: true)
- **pause_on_error** - Stop on first error vs continue (default: stop)

---

## PROCESS

### Step 1: Load and Validate Plan
1. **Read plan file:**
   - Executive summary (decisions, assumptions, risks)
   - Files overview (new, modified, deleted)
   - Implementation phases
   - Task breakdown
   - Testing strategy

2. **Validate plan structure:**
   - Phases are properly numbered
   - Tasks are properly numbered
   - File paths are absolute
   - Dependencies are clear
   - Success criteria exist

3. **Create progress tracking:**
   - Load or create tasks.md file
   - Mark tasks as pending/in_progress/completed
   - Track phase progress

4. **Set up context:**
   - Load or create context.md file
   - Record plan loaded
   - Note starting point

**Think about:**
- Is the plan clear and actionable?
- Are there any ambiguities to resolve?
- Do I have all required files?
- Are there any blockers?

---

### Step 2: Execute Phases Sequentially
**For each phase in plan:**

1. **Pre-phase setup:**
   - Read phase goal and dependencies
   - Verify dependencies are met
   - Mark phase as "in_progress" in tasks.md
   - Create bundle entry (phase start)

2. **Execute phase tasks:**
   - For each task in phase:
     - Mark task as "in_progress"
     - Execute task steps
     - Verify success criteria
     - Mark task as "completed"
     - Create bundle entry (task completion)

3. **Post-phase validation:**
   - Verify all tasks completed
   - Run phase tests (if defined)
   - Check for errors/warnings
   - Update context.md with progress
   - Mark phase as "completed" in tasks.md

4. **Decision point:**
   - Continue to next phase? (yes if all success criteria met)
   - Pause for review? (yes if high-risk phase)
   - Stop on error? (yes if pause_on_error=true)

---

### Step 3: Execute Individual Tasks
**For each task:**

#### 3.1: Read Task Details
- Task name and action
- Files to create/modify/read
- Steps to execute
- Success criteria

#### 3.2: Execute File Operations
**File Creation:**
```bash
# Create new file
/create path/to/new-file.md
# Write content according to task specification
```

**File Modification:**
```bash
# Read existing file
/read path/to/existing-file.md
# Edit file using Edit tool
/edit path/to/existing-file.md
```

**File Deletion:** (rare)
```bash
# Backup first, then delete
/backup path/to/file-to-delete.md
/delete path/to/file-to-delete.md
```

#### 3.3: Follow Task Steps
- Execute steps in order
- Validate each step before proceeding
- Document any deviations in context.md
- Ask user for clarification if ambiguous

#### 3.4: Verify Success Criteria
**Check each criterion:**
- [ ] Criterion 1 met?
- [ ] Criterion 2 met?
- [ ] Criterion 3 met?

**If all met:** Mark task complete ✅
**If any fail:** Document issue, attempt fix, escalate if needed

---

### Step 4: Handle Errors and Blockers
**When error occurs:**

1. **Capture error details:**
   - What failed?
   - Error message/stack trace
   - Which task/step?
   - File context

2. **Attempt recovery:**
   - **Syntax errors:** Fix immediately, retry
   - **Logic errors:** Review plan, adjust approach
   - **Missing files:** Check plan, create if needed
   - **Dependency issues:** Resolve dependency first

3. **Document issue:**
   - Log error in context.md
   - Mark task as "blocked" if unresolvable
   - Note attempted solutions

4. **Escalation:**
   - If `pause_on_error=true`: Stop and ask user
   - If `pause_on_error=false`: Continue, log error, fix later
   - For critical errors: Always stop and escalate

---

### Step 5: Testing and Validation
**After each phase (if auto_test=true):**

1. **Run unit tests:**
   - Execute tests defined in plan
   - Validate OUTPUT formats
   - Check for regressions

2. **Run integration tests:**
   - Test interactions between components
   - Verify dependencies work
   - Check backward compatibility

3. **Manual validation:**
   - Review created/modified files
   - Verify file contents match plan
   - Check file formatting/style

4. **Record results:**
   - Log test results in context.md
   - Mark tests as passed/failed in tasks.md
   - Create bundle entry with test results

**If tests fail:**
- Investigate failure
- Fix issues
- Re-run tests
- Document fixes

---

### Step 6: Progress Tracking
**Throughout execution:**

1. **Update tasks.md:**
   - Mark tasks as in_progress/completed
   - Track phase completion
   - Calculate progress percentage

2. **Update context.md:**
   - Log each major action
   - Document decisions made
   - Record deviations from plan
   - Note blockers/issues

3. **Create bundle entries:**
   - After each task completion
   - After each phase completion
   - After errors/blockers
   - At end of session

4. **Report progress:**
   - Show progress percentage
   - Estimate remaining time
   - Highlight blockers

---

### Step 7: Completion and Handoff
**When all phases complete:**

1. **Final validation:**
   - All tasks marked completed
   - All tests passing
   - All success criteria met
   - No open blockers

2. **Create deliverable summary:**
   - List all files created
   - List all files modified
   - List all files deleted
   - Summarize changes

3. **Run final tests:**
   - Full test suite (unit + integration)
   - Backward compatibility check
   - Performance validation
   - Quality checks

4. **Update documentation:**
   - Mark plan as "COMPLETE" in plan.md
   - Mark all tasks as "completed" in tasks.md
   - Update context.md with final status
   - Create final bundle entry

5. **Generate completion report:**
   - Summary of work done
   - Time taken (estimated vs actual)
   - Issues encountered and resolved
   - Success metrics achieved
   - Next steps (if any)

---

## OUTPUT

**Primary Deliverables:**
1. **All files specified in plan** (created, modified, or deleted)
2. **Updated tasks.md** (all tasks marked completed)
3. **Updated context.md** (final status, decisions, issues)
4. **Bundle log entries** (execution history)
5. **Completion report** (summary of work)

**Format:**
```markdown
# [Task Name] - Completion Report

**Completed:** [timestamp]
**Based on Plan:** [plan file path]
**Estimated Time:** [X hours]
**Actual Time:** [Y hours]
**Status:** ✅ COMPLETE

---

## Executive Summary

[2-3 paragraphs describing what was built, key challenges, and results]

---

## Deliverables

**Files Created ([N] files):**
- path/to/new-file1.md - Purpose: [description]
- path/to/new-file2.ts - Purpose: [description]

**Files Modified ([N] files):**
- path/to/existing-file1.md - Changes: [description]
- path/to/existing-file2.ts - Changes: [description]

**Files Deleted ([N] files):**
- path/to/deleted-file.md - Reason: [description]

**Total File Operations:** N created, N modified, N deleted

---

## Phase Execution Summary

### Phase 1: [Phase Name] ✅
**Time:** [actual time] (estimated: [estimated time])
**Tasks:** 3/3 completed
**Issues:** None

### Phase 2: [Phase Name] ✅
**Time:** [actual time] (estimated: [estimated time])
**Tasks:** 4/4 completed
**Issues:** 1 minor issue resolved

### Phase 3: [Phase Name] ✅
...

**Total Phases:** 4/4 completed (100%)

---

## Test Results

**Unit Tests:** ✅ All Passed
- Test 1: ✅ Passed
- Test 2: ✅ Passed
- Test 3: ✅ Passed

**Integration Tests:** ✅ All Passed
- Integration 1: ✅ Passed
- Integration 2: ✅ Passed

**Backward Compatibility:** ✅ 100% Preserved
- Feature 1: ✅ Working
- Feature 2: ✅ Working

**Performance:** ✅ Within Targets
- Load time: [X]s (target: [Y]s)
- Token usage: [X]K (target: [Y]K)

---

## Issues Encountered

### Issue 1: [Description]
**Type:** [Syntax | Logic | Dependency]
**Phase:** Phase 2, Task 2.3
**Resolution:** [How it was fixed]
**Time Lost:** [X] minutes

### Issue 2: [Description]
...

**Total Issues:** 2 (all resolved)

---

## Deviations from Plan

### Deviation 1: [Description]
**Original Plan:** [What was planned]
**Actual Implementation:** [What was done]
**Reason:** [Why deviation was necessary]
**Impact:** [How it affected timeline/quality]

**Total Deviations:** 1 (minor, no negative impact)

---

## Success Metrics

**Functional:**
- [ ] ✅ Metric 1: [Target] - Achieved: [Actual]
- [ ] ✅ Metric 2: [Target] - Achieved: [Actual]

**Non-Functional:**
- [ ] ✅ Performance: [Target] - Achieved: [Actual]
- [ ] ✅ Quality: [Target] - Achieved: [Actual]
- [ ] ✅ Backward Compatibility: 100%

**Delivery:**
- [ ] ✅ Estimated time: [X] hours - Actual: [Y] hours
- [ ] ✅ Quality grade: [A | B | C]
- [ ] ✅ All tests passed

---

## Lessons Learned

1. [Lesson 1]
2. [Lesson 2]
3. [Lesson 3]

---

## Next Steps

1. [Next step 1, if applicable]
2. [Next step 2, if applicable]
3. [Next step 3, if applicable]

---

**Build Status:** ✅ COMPLETE
**Handoff:** Ready for production / next task
```

---

## QUALITY CHECKS

**Before marking task complete:**

**File Operations:**
- [ ] All files created as planned
- [ ] All files modified as planned
- [ ] All file deletions completed (if any)
- [ ] File contents match specifications
- [ ] File formatting is correct

**Task Execution:**
- [ ] All task steps executed
- [ ] All success criteria met
- [ ] No errors or warnings
- [ ] Deviations documented in context.md

**Testing:**
- [ ] Unit tests pass (if defined)
- [ ] Integration tests pass (if defined)
- [ ] Backward compatibility preserved
- [ ] Performance within targets

**Progress Tracking:**
- [ ] tasks.md is up to date
- [ ] context.md is up to date
- [ ] Bundle entries created
- [ ] Progress percentage accurate

**Completion:**
- [ ] All phases completed
- [ ] All tasks marked completed
- [ ] Completion report generated
- [ ] Success metrics achieved

---

## EXAMPLE

**Input:**
```json
{
  "plan_file": "/dev/active/migrate-email-templates/migrate-email-templates-plan.md",
  "task_name": "migrate-email-templates",
  "auto_test": true,
  "auto_bundle": true,
  "pause_on_error": false
}
```

**Execution:**

**Step 1: Load plan**
- Read migrate-email-templates-plan.md
- Validated 4 phases, 11 tasks
- Created tasks.md with 11 tasks (all pending)
- Created context.md with initial state

**Step 2: Execute phases**

**Phase 1: Extract Templates (2h)**
- Task 1.1: Scan and catalog ✅ (30 min)
  - Created template-catalog.md with 12 templates
  - Categorized: 4 welcome, 4 nurture, 4 promo
- Task 1.2: Extract welcome templates ✅ (45 min)
  - Created extracted-welcome-templates.md with 4 templates
  - Validated against brand-voice-guidelines.md
- Task 1.3: Extract nurture/promo ✅ (45 min)
  - Created extracted-nurture-templates.md with 4 templates
  - Created extracted-promo-templates.md with 4 templates

**Phase 2: Create Pattern Files (3h)**
- Task 2.1: Create welcome pattern ✅ (1h)
  - Created email_template_welcome.md (480 lines)
  - Included 4 welcome templates
  - Validated format matches existing patterns
- Task 2.2: Create nurture pattern ✅ (1h)
  - Created email_template_nurture.md (465 lines)
  - Included 4 nurture templates
- Task 2.3: Create promo pattern ✅ (1h)
  - Created email_template_promo.md (492 lines)
  - Included 4 promo templates

**Phase 3: Integrate Patterns (2h)**
- Task 3.1: Update pattern index ✅ (30 min)
  - Added 3 patterns to pattern-index.json
  - Added 42 keywords total
  - Added 12 intent patterns total
  - Tested pattern matching (all working)
- Task 3.2: Update email campaign pattern ✅ (1.5h)
  - Modified create_email_campaign.md (added template integration)
  - Maintained backward compatibility
  - Updated examples and quality checks

**Phase 4: Test and Validate (2h)**
- Task 4.1: Unit test patterns ✅ (1h)
  - Tested email_template_welcome: 3/3 pass ✅
  - Tested email_template_nurture: 3/3 pass ✅
  - Tested email_template_promo: 3/3 pass ✅
- Task 4.2: Integration test ✅ (1h)
  - Campaign with welcome template: ✅ pass
  - Campaign with nurture template: ✅ pass
  - Campaign with promo template: ✅ pass
  - Campaign without template (backward compatibility): ✅ pass

**Step 7: Completion**
- All 4 phases completed ✅
- All 11 tasks completed ✅
- All tests passed ✅
- Created completion report ✅

**Output:**
```markdown
# Migrate Email Templates to Pattern System - Completion Report

**Completed:** 2025-11-04 18:45:00
**Based on Plan:** /dev/active/migrate-email-templates/migrate-email-templates-plan.md
**Estimated Time:** 9 hours
**Actual Time:** 9.2 hours
**Status:** ✅ COMPLETE

---

## Executive Summary

Successfully migrated email templates from company context and teaching modules into the pattern system. Created 3 new pattern files (welcome, nurture, promo) containing 12 total templates. Integrated templates with existing `create_email_campaign.md` pattern while maintaining 100% backward compatibility. All tests passed.

---

## Deliverables

**Files Created (6 files):**
- .claude/patterns/content/email_template_welcome.md (480 lines) - Welcome email templates
- .claude/patterns/content/email_template_nurture.md (465 lines) - Nurture email templates
- .claude/patterns/content/email_template_promo.md (492 lines) - Promotional email templates
- extracted-welcome-templates.md (working file)
- extracted-nurture-templates.md (working file)
- extracted-promo-templates.md (working file)

**Files Modified (2 files):**
- .claude/patterns/content/create_email_campaign.md - Added template integration section
- .claude/patterns/pattern-index.json - Added 3 patterns, 42 keywords, 12 intent patterns

**Total File Operations:** 6 created, 2 modified, 0 deleted

---

## Phase Execution Summary

### Phase 1: Extract Templates ✅
**Time:** 2.0 hours (estimated: 2.0 hours)
**Tasks:** 3/3 completed
**Issues:** None
**Deliverables:** 3 extraction files, 12 templates cataloged

### Phase 2: Create Pattern Files ✅
**Time:** 3.1 hours (estimated: 3.0 hours)
**Tasks:** 3/3 completed
**Issues:** None
**Deliverables:** 3 new pattern files (1,437 lines total)

### Phase 3: Integrate Patterns ✅
**Time:** 2.0 hours (estimated: 2.0 hours)
**Tasks:** 2/2 completed
**Issues:** None
**Deliverables:** Updated pattern index, updated email campaign pattern

### Phase 4: Test and Validate ✅
**Time:** 2.1 hours (estimated: 2.0 hours)
**Tasks:** 2/2 completed
**Issues:** None
**Deliverables:** All tests passing, backward compatibility confirmed

**Total Phases:** 4/4 completed (100%)
**Total Time:** 9.2 hours (estimated: 9.0 hours, +2.2% variance)

---

## Test Results

**Unit Tests:** ✅ All Passed (9/9)
- email_template_welcome: ✅ 3/3 passed
- email_template_nurture: ✅ 3/3 passed
- email_template_promo: ✅ 3/3 passed

**Integration Tests:** ✅ All Passed (4/4)
- Campaign with welcome template: ✅ Passed
- Campaign with nurture template: ✅ Passed
- Campaign with promo template: ✅ Passed
- Campaign without template: ✅ Passed (backward compatibility)

**Backward Compatibility:** ✅ 100% Preserved
- Existing email workflow: ✅ Working
- Pattern auto-suggestion: ✅ Working with new keywords

**Performance:** ✅ Within Targets
- Pattern load time: <2s (target: <2s)
- Template selection: <1s (target: <2s)

---

## Issues Encountered

**No issues encountered** ✅

All tasks executed as planned with no errors, warnings, or blockers.

---

## Deviations from Plan

**No deviations** ✅

All tasks executed exactly as planned with no modifications to the original plan.

---

## Success Metrics

**Functional:**
- [x] ✅ 3 new patterns created - Achieved: 3 patterns
- [x] ✅ 9-15 templates extracted - Achieved: 12 templates
- [x] ✅ Pattern auto-suggestion accuracy >85% - Achieved: 100% (tested with 10 prompts)
- [x] ✅ Backward compatibility 100% - Achieved: 100%

**Non-Functional:**
- [x] ✅ Pattern load time <2s - Achieved: <2s
- [x] ✅ Brand voice compliance 100% - Achieved: 100%
- [x] ✅ Pattern OUTPUT compliance 100% - Achieved: 100%

**Delivery:**
- [x] ✅ Estimated time: 9 hours - Actual: 9.2 hours (+2.2%)
- [x] ✅ Quality grade: A (100% test pass rate)

---

## Lessons Learned

1. **Template extraction was straightforward** - Grep worked well for finding email templates
2. **Pattern structure is consistent** - Easy to replicate across 3 new patterns
3. **Backward compatibility is critical** - Testing without templates confirmed no regressions

---

## Next Steps

1. Monitor pattern usage over next week
2. Add more templates as discovered
3. Consider creating additional template types (transactional, onboarding, etc.)

---

**Build Status:** ✅ COMPLETE
**Handoff:** Ready for production use
```

---

## VARIATIONS

### Variation 1: Quick Build (minimal tracking)
**Use when:** Simple plan, low risk
- Skip detailed progress tracking
- No bundle entries
- Minimal context updates
- Fast execution

### Variation 2: Careful Build (maximum validation)
**Use when:** Complex plan, high risk
- Test after each task (not just phase)
- Pause after each phase for review
- Extensive logging in context.md
- User confirmation before proceeding

### Variation 3: Incremental Build (pause between phases)
**Use when:** Long plan, needs checkpoints
- Execute one phase at a time
- Stop after each phase
- User reviews before continuing
- Allows for plan adjustments

### Variation 4: Parallel Build (multiple build agents)
**Use when:** Phases can run independently
- Spawn multiple build agents
- Each agent executes one phase
- Aggregate results at end
- Faster for parallelizable work

---

## INTEGRATION

**Chaining from Plan:**
```bash
# Plan completed, now build
/pattern build_workflow "/dev/active/[task]/[task]-plan.md"
```

**Full workflow:**
```bash
# Scout → Plan → Build (automatic)
/workflow scout-plan-build "[task description]"
```

---

## TROUBLESHOOTING

**Issue: Task steps are ambiguous**
- Solution: Ask user for clarification, update context.md with decision

**Issue: File paths don't exist**
- Solution: Check plan for typos, create directories if needed, update plan if incorrect

**Issue: Success criteria not met**
- Solution: Investigate why, fix issue, re-check, escalate if unresolvable

**Issue: Tests failing**
- Solution: Debug test failure, fix code, re-run tests, document fix

**Issue: Build taking longer than estimated**
- Solution: Log delay, continue execution, update time estimates in completion report

**Issue: Deviations from plan necessary**
- Solution: Document deviation in context.md, explain rationale, update plan if needed

---

## BEST PRACTICES

1. **Follow plan strictly:** Only deviate when necessary, document all deviations
2. **Test continuously:** Don't wait until end, test after each phase
3. **Track progress:** Keep tasks.md and context.md up to date in real-time
4. **Create bundles:** Bundle entries enable recovery after compaction
5. **Handle errors gracefully:** Log, attempt recovery, escalate if needed
6. **Validate success criteria:** Don't skip this step, it catches issues early
7. **Maintain backward compatibility:** Unless plan explicitly allows breaking changes
8. **Document decisions:** Future you will thank current you
9. **Report progress:** User appreciates knowing where you are
10. **Celebrate completion:** Generate comprehensive completion report

---

**Pattern Version:** 1.0
**Last Updated:** 2025-11-04
**Part of:** v4.0 Multi-Agent Workflows (Phase 18)
