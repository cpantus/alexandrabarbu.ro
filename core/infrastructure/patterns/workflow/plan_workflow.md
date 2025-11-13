# Plan Workflow Pattern

**Category:** Workflow
**Purpose:** Create detailed execution plan from scout results
**Use When:** After Scout completes, before Build begins
**Cost:** Medium (uses Sonnet for strategic thinking)
**Speed:** Medium (5-15 minutes depending on complexity)

---

## INPUT

Required:
- **scout_report** - Path to scout report file (e.g., /dev/active/[task]/scout-report.md)
- **task_description** - High-level task description
- **high_priority_files** - List of files to load and analyze

Optional:
- **medium_priority_files** - Additional files to consider if needed
- **constraints** - Technical constraints (time, budget, dependencies)
- **output_file** - Where to save plan (default: /dev/active/[task]/[task]-plan.md)
- **thinking_depth** - Level of strategic thinking (quick | thorough | deep)

---

## PROCESS

### Step 1: Load Scout Results
1. **Read scout report:**
   - High priority files list
   - Medium priority files list
   - Search strategy and rationale
   - Scout performance metrics

2. **Validate scout results:**
   - Verify file paths exist
   - Check file accessibility
   - Assess file sizes (warn if >1000 lines)

3. **Prioritize file loading:**
   - Load all high priority files first
   - Load medium priority files only if needed
   - Skip low priority files initially

**Think about:**
- Are the scout results sufficient?
- Do I need additional files?
- Are there obvious gaps in coverage?

---

### Step 2: Load Research Context & Detect Gaps

**Research Loading (Automatic):**

1. **Check for research reports:**
   - Look in working directory for `research-report.md`
   - Search `research/` directory for reports matching task keywords
   - Load research report if provided by scout workflow (--with-research flag)

2. **Load research if found:**
   ```bash
   # Check for research from scout workflow
   if research_report exists in scout results:
       Read research_report
       Extract key findings, best practices, warnings

   # Check working directory
   if "research-report.md" exists in current directory:
       Read research-report.md
       Load as planning context

   # Search research library
   keywords = extract_keywords(task_description)
   matching_reports = grep keywords in research/*.md
   if matching_reports found:
       Read most_recent_matching_report
       Note: Using cached research from [date]
   ```

3. **Integrate research findings:**
   - **Best Practices**: Follow recommendations from research
   - **Warnings**: Avoid pitfalls identified in research
   - **Patterns**: Use architecture patterns from research
   - **Documentation**: Reference official docs found in research

**Gap Detection (Automatic):**

1. **Detect knowledge gaps:**
   ```
   IF scout found NO files (empty high_priority_files)
   AND task involves new technology/pattern
   AND no research report loaded
   THEN knowledge_gap_detected = TRUE
   ```

2. **Identify gap type:**
   - **New technology**: Technology not in codebase (e.g., "Redis", "GraphQL")
   - **New pattern**: Architecture pattern not used (e.g., "CQRS", "event-driven")
   - **Unfamiliar domain**: Domain team hasn't worked with
   - **Major migration**: Significant technology change

3. **Suggest research:**
   ```markdown
   ⚠️  **Knowledge Gap Detected**

   Scout found no existing patterns for: [Technology/Pattern]

   This appears to be a new technology for this codebase.

   **Recommendation**: Research best practices before planning

   Options:
   1. `/research "[Technology] best practices"` - Comprehensive research (3-5 min)
   2. Continue planning without research (may miss best practices)
   3. Let me auto-spawn research agent (requires approval)

   Which would you prefer? [1/2/3]
   ```

**Auto-Research (with User Approval):**

If user chooses option 3:
```
User: 3
→ Plan: Spawning research scout for "[Technology] best practices"
→ Research Scout: Executes research (3-5 min)
→ Plan: Loads research report
→ Plan: Continues with research context
```

**Research Context in Planning:**

When research is loaded, include in all planning decisions:

```markdown
## Research Context

**Research Report**: research/[topic].md
**Confidence**: [High/Medium/Low]
**Date**: [YYYY-MM-DD]

### Key Findings
- [Finding 1 from research]
- [Finding 2 from research]

### Best Practices to Follow
- [Practice 1] - [Why it matters]
- [Practice 2] - [Why it matters]

### Warnings to Heed
- ⚠️  [Warning 1] - [Consequence if ignored]
- ⚠️  [Warning 2] - [Consequence if ignored]

### Recommended Patterns
- [Pattern 1] - [When to use]
- [Pattern 2] - [When to use]

**Implementation Note**: All phases should follow these best practices
```

**Think about:**
- Is external knowledge needed for this task?
- Do we have research on this technology?
- Should we suggest research to the user?
- What best practices should inform the plan?

---

### Step 3: Read & Analyze High Priority Files
**Read each high priority file:**

For each file:
1. **Understand purpose:**
   - What does this file do?
   - How does it relate to the task?
   - What patterns/structures does it use?

2. **Identify dependencies:**
   - What other files does it reference?
   - What files reference it?
   - What external dependencies exist?

3. **Note constraints:**
   - Existing patterns to follow
   - Style guidelines to maintain
   - Backward compatibility requirements

4. **Extract key insights:**
   - Relevant code patterns
   - Configuration structures
   - Naming conventions
   - Best practices

**Use extended thinking:** "Think hard about optimal implementation strategy"

---

### Step 3: Design Implementation Strategy
**Break task into phases:**

1. **Phase breakdown:**
   - Identify logical phases (usually 3-7 phases)
   - Order phases by dependency
   - Estimate effort per phase
   - Identify risks per phase

2. **File-level planning:**
   - Which files to create (list all new files)
   - Which files to modify (list all modifications)
   - Which files to delete (if any)
   - File organization and structure

3. **Dependency management:**
   - What must be done first (blocking dependencies)
   - What can be done in parallel
   - What requires sequential execution
   - External dependencies to address

4. **Risk assessment:**
   - What could go wrong?
   - What are the hard parts?
   - Where might we get stuck?
   - How to mitigate risks?

**Think about:**
- Is this the simplest approach?
- Are there alternative strategies?
- What assumptions am I making?
- What could I be missing?

---

### Step 4: Create Detailed Task Breakdown
**For each phase, create tasks:**

**Task format:**
```markdown
### Phase [N]: [Phase Name] ([estimated time])

**Goal:** [What this phase achieves]

#### Task [N.1]: [Task Name] ([estimated time])
**Action:** [What to do]
**Files:**
- Create: [new files list]
- Modify: [existing files to change]
- Read: [files to reference]

**Steps:**
1. [Specific step 1]
2. [Specific step 2]
3. [Specific step 3]

**Success criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

**Risks:**
- [Risk 1] - Mitigation: [how to address]
```

**Task guidelines:**
- Tasks should be 15-60 minutes each
- Each task should have clear success criteria
- Tasks should be independently testable
- Minimize inter-task dependencies

---

### Step 5: Validate Plan Quality
**Quality checks:**

**Completeness:**
- [ ] All required files are addressed (create/modify/delete)
- [ ] All phases have clear goals
- [ ] All tasks have success criteria
- [ ] Dependencies are explicitly stated
- [ ] Risks are identified and mitigated

**Feasibility:**
- [ ] Total estimated time is reasonable
- [ ] No circular dependencies
- [ ] No missing information (all files available)
- [ ] Technical approach is sound

**Clarity:**
- [ ] Tasks are specific and actionable
- [ ] File paths are absolute and correct
- [ ] Steps are detailed enough to follow
- [ ] Success criteria are measurable

**Backward Compatibility:**
- [ ] Existing functionality is preserved
- [ ] No breaking changes (or explicitly documented)
- [ ] Integration points are identified
- [ ] Testing strategy is defined

---

### Step 6: Output Plan Document
**Create comprehensive plan:**

```markdown
# [Task Name] - Implementation Plan

**Created:** [timestamp]
**Based on:** scout-report.md
**Estimated Time:** [X hours]
**Complexity:** [Low | Medium | High]

---

## Executive Summary

[2-3 paragraphs describing the task, approach, and key decisions]

**Key Decisions:**
1. [Decision 1 and rationale]
2. [Decision 2 and rationale]
3. [Decision 3 and rationale]

**Assumptions:**
1. [Assumption 1]
2. [Assumption 2]

**Risks:**
1. [Risk 1] - Mitigation: [strategy]
2. [Risk 2] - Mitigation: [strategy]

---

## Files Overview

**New Files (N files):**
- path/to/new-file1.md - Purpose: [description]
- path/to/new-file2.ts - Purpose: [description]

**Modified Files (N files):**
- path/to/existing-file1.md - Changes: [description]
- path/to/existing-file2.ts - Changes: [description]

**Files to Read (Reference):**
- path/to/reference-file1.md - Reason: [why needed]

**Total File Operations:** N new, N modified, N deleted

---

## Implementation Phases

### Phase 1: [Phase Name] ([time estimate])
**Goal:** [What this phase achieves]
**Dependencies:** [None | Phase X]

#### Task 1.1: [Task Name] ([time])
**Action:** [What to do]
**Files:** Create: [list], Modify: [list]
**Steps:**
1. [Step 1]
2. [Step 2]
**Success:**
- [ ] [Criterion 1]

#### Task 1.2: [Task Name] ([time])
...

### Phase 2: [Phase Name] ([time estimate])
...

---

## Dependency Graph

```
Phase 1 → Phase 2 → Phase 4
       ↘ Phase 3 ↗
```

**Critical Path:** Phase 1 → Phase 2 → Phase 4 (total: [X] hours)
**Parallel Work:** Phase 3 can run alongside Phase 2

---

## Testing Strategy

**Unit Tests:**
- [Component 1]: Test [functionality]
- [Component 2]: Test [functionality]

**Integration Tests:**
- Test [interaction 1]
- Test [interaction 2]

**Backward Compatibility:**
- Verify [existing feature 1] still works
- Verify [existing feature 2] still works

**Acceptance Criteria:**
- [ ] [Feature 1] works as expected
- [ ] [Feature 2] works as expected
- [ ] No regressions in existing functionality
- [ ] Documentation is updated

---

## Risk Management

### High Risk Items
**Risk 1:** [Description]
- **Likelihood:** [Low | Medium | High]
- **Impact:** [Low | Medium | High]
- **Mitigation:** [Strategy]
- **Contingency:** [Backup plan]

### Medium Risk Items
...

### Low Risk Items
...

---

## Success Metrics

**Functional:**
- [ ] [Metric 1]: [Target]
- [ ] [Metric 2]: [Target]

**Non-Functional:**
- [ ] Performance: [Target]
- [ ] Maintainability: [Target]
- [ ] Backward compatibility: 100%

**Delivery:**
- [ ] Estimated time: [X] hours
- [ ] Actual time: [TBD]
- [ ] Quality: [Target]

---

## Next Steps

1. Review plan with stakeholders
2. Begin Phase 1, Task 1.1
3. Update progress in tasks.md
4. Create bundle entries as work progresses
5. Test continuously during implementation

---

**Plan Status:** Ready for Build agent
**Next Agent:** Build workflow pattern
```

---

## OUTPUT

**Primary Deliverable:** Implementation Plan ([task]-plan.md)

**Format:** Comprehensive markdown document with:
- Executive summary (decisions, assumptions, risks)
- Files overview (new, modified, read)
- Implementation phases (3-7 phases)
- Task breakdown (15-60 min per task)
- Dependency graph
- Testing strategy
- Risk management
- Success metrics
- Next steps

**File Structure:**
```
/dev/active/[task]/
├── scout-report.md          # Input from Scout
├── [task]-plan.md           # Output from Plan (this file)
├── [task]-tasks.md          # Task checklist (generated by Plan)
└── [task]-context.md        # Context file (for dev docs)
```

---

## QUALITY CHECKS

**Before passing to Build agent:**

**Plan Completeness:**
- [ ] All scout findings are addressed
- [ ] File operations are complete (create/modify/delete all listed)
- [ ] Dependencies are explicitly stated
- [ ] Phases are properly ordered
- [ ] Tasks are 15-60 minutes each
- [ ] Success criteria are defined for each task
- [ ] Risks are identified and mitigated

**Plan Feasibility:**
- [ ] Total estimated time is reasonable (<20 hours)
- [ ] No circular dependencies
- [ ] Technical approach is sound
- [ ] Required files are available
- [ ] No breaking changes (or explicitly documented)

**Plan Clarity:**
- [ ] Tasks are actionable (no ambiguity)
- [ ] File paths are absolute and correct
- [ ] Steps are detailed enough to execute
- [ ] Success criteria are measurable
- [ ] Next steps are clear

**Integration:**
- [ ] Plan integrates with existing system
- [ ] Backward compatibility preserved
- [ ] Testing strategy is comprehensive
- [ ] Documentation updates are included

---

## EXAMPLE

**Input:**
```json
{
  "scout_report": "/dev/active/migrate-email-templates/scout-report.md",
  "task_description": "Migrate email templates to pattern system",
  "high_priority_files": [
    ".claude/patterns/content/create_email_campaign.md",
    ".claude/skills/automation-workflows.md",
    ".claude/skills/brand-voice-guidelines.md",
    "scripts/test-email-campaign.ts"
  ]
}
```

**Process:**

**Step 1: Load scout results**
- Read scout-report.md
- Identified 4 high priority files, 5 medium priority
- Validated all files exist

**Step 2: Read & analyze files**
- Read create_email_campaign.md: Existing pattern structure, 450 lines
- Read automation-workflows.md: Email automation best practices
- Read brand-voice-guidelines.md: Voice/tone requirements
- Read test-email-campaign.ts: Testing script for email campaigns

**Key insights:**
- Pattern structure is well-defined (PURPOSE, INPUT, PROCESS, OUTPUT)
- Email templates exist in company context and modules
- Need to extract templates into reusable pattern files
- Testing infrastructure exists (test-email-campaign.ts)

**Step 3: Design strategy**
- Approach: Create new email template patterns, update existing pattern
- Phases: 4 phases (Extract, Create, Integrate, Test)
- Risks: Breaking existing email creation workflow

**Step 4: Task breakdown**
- Phase 1: Extract templates (3 tasks, 2h)
- Phase 2: Create pattern files (4 tasks, 3h)
- Phase 3: Integrate patterns (2 tasks, 2h)
- Phase 4: Test and validate (2 tasks, 2h)

**Step 5: Validate plan**
- ✅ All files addressed
- ✅ Dependencies clear
- ✅ Risks identified
- ✅ Testing strategy defined

**Step 6: Output plan**

**Output:**
```markdown
# Migrate Email Templates to Pattern System - Implementation Plan

**Created:** 2025-11-04 14:30:00
**Based on:** scout-report.md (3 scouts, 2.3 minutes, 15 files)
**Estimated Time:** 9 hours
**Complexity:** Medium

---

## Executive Summary

This plan outlines the migration of email templates scattered across company context and teaching modules into the pattern system. The approach involves extracting existing templates, creating new pattern files, and integrating them with the existing `create_email_campaign.md` pattern.

**Key Decisions:**
1. **Pattern structure:** Follow existing pattern format (PURPOSE, INPUT, PROCESS, OUTPUT)
2. **Template organization:** Create separate patterns for common email types (welcome, nurture, promo)
3. **Backward compatibility:** Maintain existing create_email_campaign.md, enhance with templates
4. **Testing:** Reuse test-email-campaign.ts script, add new test cases

**Assumptions:**
1. Existing email pattern structure is optimal (no changes needed)
2. Templates in company context are production-ready
3. Module 2.3 templates can be extracted without breaking course

**Risks:**
1. Breaking existing email workflow - Mitigation: Thorough testing, maintain backward compatibility
2. Template quality varies - Mitigation: Standardize all templates during extraction
3. Missing templates - Mitigation: Review all modules/context files thoroughly

---

## Files Overview

**New Files (3 files):**
- .claude/patterns/content/email_template_welcome.md - Welcome email template pattern
- .claude/patterns/content/email_template_nurture.md - Nurture email template pattern
- .claude/patterns/content/email_template_promo.md - Promotional email template pattern

**Modified Files (2 files):**
- .claude/patterns/content/create_email_campaign.md - Add template integration
- .claude/patterns/pattern-index.json - Add 3 new patterns with keywords

**Files to Read (Reference):**
- company-context/PRODUCT.md - Extract product email templates
- teaching/2-3-content-at-scale.md - Extract teaching templates
- .claude/skills/brand-voice-guidelines.md - Voice/tone requirements
- scripts/test-email-campaign.ts - Testing reference

**Total File Operations:** 3 new, 2 modified, 0 deleted

---

## Implementation Phases

### Phase 1: Extract Templates (2h)
**Goal:** Extract all email templates from company context and modules
**Dependencies:** None

#### Task 1.1: Scan and catalog templates (30 min)
**Action:** Find all email templates across codebase
**Files:** Read: company-context/*, teaching/*
**Steps:**
1. Search for email templates using Grep (keywords: "Subject:", "From:", "To:")
2. Read each file containing templates
3. Create catalog: template-catalog.md with all templates listed
4. Categorize by type (welcome, nurture, promo, other)
**Success:**
- [ ] Catalog created with 10+ templates
- [ ] Templates categorized by type
- [ ] Template locations documented

#### Task 1.2: Extract welcome email templates (45 min)
**Action:** Extract all welcome email templates into structured format
**Files:** Create: extracted-welcome-templates.md
**Steps:**
1. Copy all welcome email templates from catalog
2. Standardize format (Subject, From, To, Body)
3. Add metadata (use case, persona, goal)
4. Validate against brand-voice-guidelines.md
**Success:**
- [ ] 3-5 welcome templates extracted
- [ ] Format standardized
- [ ] Brand voice compliant

#### Task 1.3: Extract nurture and promo templates (45 min)
**Action:** Extract nurture and promotional email templates
**Files:** Create: extracted-nurture-templates.md, extracted-promo-templates.md
**Steps:**
1. Copy nurture templates (3-5 templates)
2. Copy promo templates (3-5 templates)
3. Standardize format for all
4. Validate against brand guidelines
**Success:**
- [ ] Nurture templates extracted (3-5)
- [ ] Promo templates extracted (3-5)
- [ ] All templates validated

---

### Phase 2: Create Pattern Files (3h)
**Goal:** Convert extracted templates into pattern files
**Dependencies:** Phase 1

#### Task 2.1: Create welcome email pattern (1h)
**Action:** Create email_template_welcome.md pattern file
**Files:** Create: .claude/patterns/content/email_template_welcome.md
**Steps:**
1. Copy pattern structure from create_email_campaign.md
2. Populate PURPOSE, INPUT, PROCESS, OUTPUT sections
3. Add 3-5 welcome email templates from extraction
4. Add quality checks and examples
5. Validate format matches existing patterns
**Success:**
- [ ] Pattern file created (400-500 lines)
- [ ] 3-5 templates included
- [ ] Format matches existing patterns
- [ ] Quality checks defined

#### Task 2.2: Create nurture email pattern (1h)
**Action:** Create email_template_nurture.md pattern file
**Files:** Create: .claude/patterns/content/email_template_nurture.md
**Steps:**
[Similar to 2.1, for nurture emails]
**Success:**
- [ ] Pattern file created
- [ ] 3-5 nurture templates included
- [ ] Format matches existing patterns

#### Task 2.3: Create promo email pattern (1h)
**Action:** Create email_template_promo.md pattern file
**Files:** Create: .claude/patterns/content/email_template_promo.md
**Steps:**
[Similar to 2.1, for promo emails]
**Success:**
- [ ] Pattern file created
- [ ] 3-5 promo templates included
- [ ] Format matches existing patterns

---

### Phase 3: Integrate Patterns (2h)
**Goal:** Integrate new patterns with existing system
**Dependencies:** Phase 2

#### Task 3.1: Update pattern index (30 min)
**Action:** Add new patterns to pattern-index.json
**Files:** Modify: .claude/patterns/pattern-index.json
**Steps:**
1. Add 3 new pattern entries (welcome, nurture, promo)
2. Define keywords for each (10-15 keywords per pattern)
3. Define intent patterns (3-5 per pattern)
4. Test pattern matching with sample prompts
**Success:**
- [ ] 3 patterns added to index
- [ ] 30-45 keywords added
- [ ] 9-15 intent patterns added
- [ ] Pattern matching works

#### Task 3.2: Update create_email_campaign pattern (1.5h)
**Action:** Integrate templates into existing pattern
**Files:** Modify: .claude/patterns/content/create_email_campaign.md
**Steps:**
1. Add template selection section to INPUT
2. Update PROCESS to reference template patterns
3. Add examples showing template usage
4. Update quality checks to include template validation
5. Test pattern with new template references
**Success:**
- [ ] Template integration complete
- [ ] Examples updated
- [ ] Quality checks updated
- [ ] Backward compatibility maintained

---

### Phase 4: Test and Validate (2h)
**Goal:** Ensure all patterns work correctly
**Dependencies:** Phase 3

#### Task 4.1: Unit test new patterns (1h)
**Action:** Test each pattern individually
**Files:** Read: scripts/test-email-campaign.ts, Modify: add test cases
**Steps:**
1. Test email_template_welcome pattern (3 test cases)
2. Test email_template_nurture pattern (3 test cases)
3. Test email_template_promo pattern (3 test cases)
4. Verify OUTPUT format compliance
5. Verify brand voice consistency
**Success:**
- [ ] 9 test cases pass (3 per pattern)
- [ ] OUTPUT format correct
- [ ] Brand voice consistent
- [ ] No errors or warnings

#### Task 4.2: Integration test with create_email_campaign (1h)
**Action:** Test template integration in email campaign pattern
**Files:** Test: .claude/patterns/content/create_email_campaign.md
**Steps:**
1. Create email campaign using welcome template
2. Create email campaign using nurture template
3. Create email campaign using promo template
4. Verify backward compatibility (create campaign without template)
5. Validate all quality checks pass
**Success:**
- [ ] All 4 test scenarios pass
- [ ] Templates integrate correctly
- [ ] Backward compatibility preserved
- [ ] Quality checks pass

---

## Dependency Graph

```
Phase 1 (Extract) → Phase 2 (Create) → Phase 3 (Integrate) → Phase 4 (Test)
```

**Critical Path:** Phase 1 → Phase 2 → Phase 3 → Phase 4 (total: 9 hours)
**No Parallel Work:** All phases are sequential

---

## Testing Strategy

**Unit Tests:**
- email_template_welcome: 3 templates tested individually
- email_template_nurture: 3 templates tested individually
- email_template_promo: 3 templates tested individually

**Integration Tests:**
- Template selection in create_email_campaign
- Pattern auto-suggestion with new keywords
- Backward compatibility (existing workflow unchanged)

**Acceptance Criteria:**
- [ ] All 3 new patterns work independently
- [ ] Templates integrate with create_email_campaign
- [ ] Pattern auto-suggestion works with new keywords
- [ ] Backward compatibility: 100% (existing email workflow unchanged)
- [ ] Brand voice compliance: 100%

---

## Risk Management

### High Risk Items
**Risk 1:** Breaking existing email creation workflow
- **Likelihood:** Medium
- **Impact:** High
- **Mitigation:** Maintain backward compatibility, thorough integration testing
- **Contingency:** Revert changes if tests fail, investigate and fix

### Medium Risk Items
**Risk 2:** Template quality inconsistency
- **Likelihood:** Medium
- **Impact:** Medium
- **Mitigation:** Standardize all templates during extraction, validate against brand guidelines
- **Contingency:** Review and revise templates post-extraction

### Low Risk Items
**Risk 3:** Missing templates
- **Likelihood:** Low
- **Impact:** Low
- **Mitigation:** Comprehensive search across all files
- **Contingency:** Add templates later as discovered

---

## Success Metrics

**Functional:**
- [ ] 3 new patterns created
- [ ] 9-15 templates extracted and included
- [ ] Pattern auto-suggestion accuracy: >85%
- [ ] Backward compatibility: 100%

**Non-Functional:**
- [ ] Pattern load time: <2 seconds
- [ ] Brand voice compliance: 100%
- [ ] Pattern OUTPUT compliance: 100%

**Delivery:**
- [ ] Estimated time: 9 hours
- [ ] Actual time: [TBD]
- [ ] Quality: Grade A (90%+ success rate)

---

## Next Steps

1. Begin Phase 1, Task 1.1 (Scan and catalog templates)
2. Update progress in /dev/active/migrate-email-templates/migrate-email-templates-tasks.md
3. Create bundle entries as each task completes
4. Run tests after each phase
5. Document any deviations from plan in context.md

---

**Plan Status:** ✅ Ready for Build agent
**Next Agent:** build_workflow pattern
**Output for Build:** /dev/active/migrate-email-templates/migrate-email-templates-plan.md
```

---

## VARIATIONS

### Variation 1: Quick Plan (2-5 min, high-level only)
**Use when:** Simple task, clear scope
- Skip extended thinking
- 1-3 phases only
- Minimal task breakdown
- No risk assessment

### Variation 2: Deep Plan (20-30 min, exhaustive analysis)
**Use when:** Complex task, high stakes
- Extended thinking on all decisions
- 5-10 phases with sub-phases
- Detailed task breakdown (5-15 min tasks)
- Comprehensive risk assessment
- Alternative approaches explored

### Variation 3: Collaborative Plan (interactive)
**Use when:** Unclear requirements, needs user input
- Pause after initial strategy
- Ask user for preferences/constraints
- Refine plan based on feedback
- Iterate until approved

---

## INTEGRATION

**Chaining from Scout:**
```bash
# Scout completed, now plan
/pattern plan_workflow "/dev/active/[task]/scout-report.md"
```

**Chaining to Build:**
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

**Issue: Plan is too vague (tasks not actionable)**
- Solution: Add more detail to steps, use specific file paths, define concrete actions

**Issue: Plan is too detailed (tasks <15 min)**
- Solution: Combine tasks, group related actions, raise abstraction level

**Issue: Circular dependencies detected**
- Solution: Reorder phases, break circular dependency, parallelize where possible

**Issue: Estimated time is unrealistic (too high/low)**
- Solution: Review task complexity, adjust estimates, compare to similar past tasks

**Issue: Risk mitigation is weak**
- Solution: Add concrete mitigation steps, define contingency plans, test assumptions

**Issue: Backward compatibility not preserved**
- Solution: Add compatibility layer, version new features, maintain existing interfaces

---

## BEST PRACTICES

1. **Use extended thinking:** Complex plans benefit from deep strategic analysis
2. **Be specific:** Absolute file paths, concrete actions, measurable criteria
3. **Break into phases:** 3-7 phases is optimal, too few = vague, too many = complex
4. **Size tasks right:** 15-60 min per task is the sweet spot
5. **Document decisions:** Explain key choices and trade-offs
6. **Identify risks early:** High-risk items need mitigation strategies
7. **Validate assumptions:** List assumptions explicitly, test if critical
8. **Preserve compatibility:** Backward compatibility is critical unless explicitly breaking
9. **Include testing:** Testing strategy should be comprehensive
10. **Make it actionable:** Build agent should be able to execute without clarification

---

**Pattern Version:** 1.0
**Last Updated:** 2025-11-04
**Part of:** v4.0 Multi-Agent Workflows (Phase 18)
