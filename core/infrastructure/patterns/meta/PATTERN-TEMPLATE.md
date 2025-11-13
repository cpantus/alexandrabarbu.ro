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
