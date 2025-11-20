# Pattern: [Pattern Name]

**Category**: [meta|workflow|content|analytics|automation]
**Complexity**: [simple|medium|complex]
**Thinking**: [think|think-hard|ultrathink|N/A]
**Model**: [haiku|sonnet|opus]
**Knowledge Required**: [List required skills/docs, or N/A]

---

## DOCUMENTATION CHECKLIST - COMPLETE BEFORE IMPLEMENTING

**[ ] 1. Update README.md:**
   - **Section**: "Pattern System" or "Quick Reference"
   - **Action**: Add pattern to count (if new category) or list
   - **Why**: Keep component counts accurate

**[ ] 2. Update core/docs/pattern-system.md:**
   - **Section**: "Available Patterns" or category-specific section
   - **Action**: Add pattern entry with name, category, purpose
   - **Why**: Central registry for pattern discovery

**[ ] 3. Update ARCHITECTURE.md (if architectural):**
   - **Section**: "Pattern System" or relevant domain section
   - **Action**: Document new pattern capability or category
   - **Why**: Track architectural additions

**[ ] 4. Update .claude/docs-index.json (if pattern loads resources):**
   - **Action**: Add resource entries with triggers
   - **Why**: Enable auto-loading of pattern dependencies

**[ ] 5. Test pattern invocation:**
   - **Command**: `/pattern [pattern_name]`
   - **Verify**: Pattern executes correctly, output format correct
   - **Why**: Ensure pattern is functional before marking complete

---

## PURPOSE

[1-2 sentences describing what this pattern does and when to use it]

---

## TASK DECOMPOSITION OVERRIDE (v5.4.0)

When this pattern applies ([specific use cases]), **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE ([Name the anti-pattern - typical wrong approach]):
1. [Wrong approach step 1 - skipping validation/planning]
2. [Wrong approach step 2 - ad-hoc execution without structure]
3. [Wrong approach step 3 - incomplete or missing outputs]
4. [Wrong approach step 4 - no validation of results]

### ✅ MANDATORY SEQUENCE ([Pattern's execution model]):

**Phase 1: [Input Validation]** (Ensure [N] prerequisites met)
1. **[Prerequisite 1]**: [What to validate]
   - Reference: Pattern "[Section]" or validation rules
   - Output: [Validation result - pass/fail with details]

2. **[Prerequisite 2]**: [What to validate]
   - Reference: Pattern "[Section]" or validation rules
   - Output: [Validation result - pass/fail with details]

3. **[Prerequisite 3]**: [What to validate]
   - Reference: Pattern "[Section]" or validation rules
   - Output: [Validation result - pass/fail with details]

**Output Acknowledgment After Phase 1:**
```
[Pattern Name] Validated:
- [Prerequisite 1]: ✅ [Status + details]
- [Prerequisite 2]: ✅ [Status + details]
- [Prerequisite 3]: ✅ [Status + details]
```

**Phase 2: [Staged Execution]** (Execute workflow stages)
4. **Stage 1 - [Stage Name]**: [What this stage accomplishes]
   - Actions: [Key actions for this stage]
   - Outputs: [Artifacts produced]

5. **Stage 2 - [Stage Name]**: [What this stage accomplishes]
   - Actions: [Key actions for this stage]
   - Outputs: [Artifacts produced]

6. **Stage 3 - [Stage Name]**: [What this stage accomplishes]
   - Actions: [Key actions for this stage]
   - Outputs: [Artifacts produced]

**Phase 3: [Output Generation]** (Validate and finalize deliverables)
7. **Completeness Check**: Verify all required outputs produced
8. **Quality Validation**: Check outputs meet pattern standards
9. **Artifact Finalization**: Save/format deliverables per pattern spec

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** [Explain WHY the mandatory sequence is required. What quality/completeness does it guarantee? What problems does structured execution prevent?]

---

## LANGUAGE STANDARDS (v5.4.0)

**YOU MUST use directive language throughout pattern execution:**

**Required Directives:**
- ✅ "MUST", "DO NOT", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "it's recommended"

**Process Steps:**
- ✅ "Execute X", "Validate Y", "Generate Z"
- ❌ "Try to do X", "Consider Y", "Should generate Z"

**Rules Section:**
- ✅ "MUST follow", "PROHIBITED:", "REQUIRED:"
- ❌ "Should follow", "Avoid:", "Recommended:"

**Enforcement Note:** Patterns with weak language will be rejected by validation hooks.

---

## INPUT

**Required:**
1. **[Input name]**: [Description and format]
2. **[Input name]**: [Description and format]

**Optional:**
- `--[flag-name]`: [What it does]
- `--[flag-name]`: [What it does]

**Context from conversation:**
- [What contextual information this pattern can extract]

---

## RULES

### [Rule Category 1]

[Describe the constraints, standards, or requirements for this aspect]

**Examples:**
```
[Good example] ✓
[Bad example] ✗
```

**Rationale:** [Why this rule exists]

---

### [Rule Category 2]

[Additional rules as needed]

---

## PROCESS

### Step 1: [Step Name]

[Detailed instructions for this step]

**Actions:**
1. [Specific action]
2. [Specific action]

**Validation:**
- [ ] [Check 1]
- [ ] [Check 2]

---

### Step 2: [Step Name]

[Continue with process steps]

---

## OUTPUT

**Primary deliverable:**
- [Main output format and location]

**Structure:**
```markdown
[Template or example of output structure]
```

**Quality Checks:**
- [ ] [Quality criteria 1]
- [ ] [Quality criteria 2]
- [ ] [Quality criteria 3]

**Documentation Updates Required:**
- [ ] [Specific doc to update and why]
- [ ] [Specific doc to update and why]

---

## VALIDATION

**Before marking complete:**

1. **Functional validation:**
   - [ ] Pattern executes without errors
   - [ ] All required inputs handled correctly
   - [ ] Output format matches specification

2. **Quality validation:**
   - [ ] Output meets quality standards
   - [ ] Edge cases handled
   - [ ] Error messages are clear

3. **Documentation validation:**
   - [ ] All checklist items completed
   - [ ] Pattern listed in relevant indices
   - [ ] Usage examples clear

---

## EXAMPLES

### Example 1: [Scenario Name]

**Input:**
```
[Example input]
```

**Output:**
```
[Example output]
```

**Notes:** [Any special considerations]

---

### Example 2: [Scenario Name]

[Additional examples as needed]

---

## RELATED PATTERNS

- `[related_pattern_name]`: [When to use instead/in combination]
- `[related_pattern_name]`: [When to use instead/in combination]

---

## NOTES

**Design decisions:**
- [Key decision and rationale]
- [Key decision and rationale]

**Common pitfalls:**
- [What to avoid and why]
- [What to avoid and why]

**Future enhancements:**
- [Potential improvement]
- [Potential improvement]

---

**Pattern Version:** 1.0
**Last Updated:** [YYYY-MM-DD]
**Maintained By:** [Team/role]
