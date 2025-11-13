---
name: "[skill-name]"
description: "[emoji] One-sentence description of skill's knowledge domain"
auto_activate_triggers:
  - "[keyword-1]"
  - "[keyword-2]"
  - "[keyword-3]"
resources:
  - path: "skills/resources/[skill-name]/[resource-file].md"
    description: "[What this resource provides]"
version: "1.0"
---

# [Skill Name] Skill

**DOCUMENTATION CHECKLIST - COMPLETE BEFORE IMPLEMENTING:**

**[ ] 1. Update README.md:**
   - **Section**: Skills count in Quick Reference
   - **Action**: Increment skill count
   - **Why**: Keep component inventory accurate

**[ ] 2. Update core/docs/skills-system.md:**
   - **Section**: "Available Skills" list
   - **Action**: Add skill entry with name, emoji, triggers, resources
   - **Why**: Central registry for skill discovery

**[ ] 3. Update .claude/skill-rules.json:**
   - **Action**: Add skill auto-activation entry with triggers
   - **Why**: Enable auto-loading when relevant keywords detected
   - **Format**:
     ```json
     {
       "name": "[skill-name]",
       "triggers": ["[keyword-1]", "[keyword-2]"],
       "path": ".claude/skills/[skill-name].md"
     }
     ```

**[ ] 4. Update .claude/docs-index.json (if has resources):**
   - **Action**: Add resource entries for on-demand loading
   - **Why**: Enable progressive loading to save tokens
   - **Format**:
     ```json
     {
       "name": "[skill-name]-[resource-name]",
       "path": ".claude/skills/resources/[skill-name]/[resource].md",
       "triggers": ["[specific-trigger]"],
       "cache": true
     }
     ```

**[ ] 5. Update plugin README (if plugin skill):**
   - **File**: [plugin-name]/README.md
   - **Action**: Add skill to plugin's skill list
   - **Why**: Document plugin-specific knowledge

---

## Purpose

[2-3 sentences describing what knowledge this skill provides and when it's valuable]

**Knowledge Areas:**
- [Area 1]
- [Area 2]
- [Area 3]

**Auto-Activates When:**
User mentions: [keyword-1], [keyword-2], [keyword-3], or related concepts

---

## Core Principles

### Principle 1: [Principle Name]

[Description of the principle and why it matters]

**Guidelines:**
- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

**Examples:**
```
✅ Good: [Example of following principle]
❌ Bad: [Example of violating principle]
```

---

### Principle 2: [Principle Name]

[Continue with additional principles...]

---

## Key Concepts

### [Concept 1 Name]

**Definition:** [Clear explanation of the concept]

**Application:**
- [How to apply this concept]
- [When to use it]
- [Common patterns]

**Related Concepts:**
- [Related concept 1]
- [Related concept 2]

---

### [Concept 2 Name]

[Continue with additional concepts...]

---

## Frameworks & Models

### [Framework Name]

**Purpose:** [What problem this framework solves]

**Components:**
1. **[Component 1]**: [Description]
2. **[Component 2]**: [Description]
3. **[Component 3]**: [Description]

**Application Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Example:**
```
[Concrete example of framework in action]
```

---

## Best Practices

### Do's
- ✅ [Best practice 1 with brief rationale]
- ✅ [Best practice 2 with brief rationale]
- ✅ [Best practice 3 with brief rationale]

### Don'ts
- ❌ [Anti-pattern 1 with brief explanation]
- ❌ [Anti-pattern 2 with brief explanation]
- ❌ [Anti-pattern 3 with brief explanation]

---

## Common Patterns

### Pattern 1: [Pattern Name]

**When to Use:** [Situation where this pattern applies]

**Structure:**
```
[Pattern template or outline]
```

**Variations:**
- [Variation 1]: [When to use]
- [Variation 2]: [When to use]

---

### Pattern 2: [Pattern Name]

[Continue with additional patterns...]

---

## Resources

### Quick Reference
[Inline quick reference content - formulas, checklists, key metrics, etc.]

**Key Metrics:**
- [Metric 1]: [What it measures, formula if applicable]
- [Metric 2]: [What it measures, formula if applicable]

**Common Formulas:**
- [Formula name]: `[formula]` - [What it calculates]

### Extended Resources

**For deeper knowledge, see:**
- `skills/resources/[skill-name]/[resource-1].md` - [What it covers]
- `skills/resources/[skill-name]/[resource-2].md` - [What it covers]

**When to load:**
- Load [resource-1] when: [specific trigger or need]
- Load [resource-2] when: [specific trigger or need]

---

## Integration

**Works Well With:**
- **Skill**: [other-skill-name] - [How they complement each other]
- **Pattern**: [pattern_name] - [How pattern applies this knowledge]
- **Agent**: [agent-name] - [Which agents leverage this skill]

**Typical Workflow:**
```
1. [Skill] auto-activates on keyword detection
2. Agent applies [Framework] to user's problem
3. Pattern [pattern_name] structures the output
4. Extended resources loaded if deeper expertise needed
```

---

## Examples

### Example 1: [Scenario]

**Context:** [Situation description]

**Skill Application:**
```
[How the skill's knowledge applies to this scenario]
```

**Outcome:**
[What result the skill enables]

---

### Example 2: [Scenario]

[Additional examples as needed]

---

## Validation Checklist

**When applying this skill, verify:**
- [ ] [Check 1 - ensures principle adherence]
- [ ] [Check 2 - ensures quality standard]
- [ ] [Check 3 - ensures best practice followed]
- [ ] [Check 4 - ensures framework correctly applied]

---

## Related Skills

**Complementary Skills:**
- `[skill-name-1]`: [When to use together]
- `[skill-name-2]`: [When to use together]

**Prerequisite Knowledge:**
- [Concept from another skill that's foundational]

**Builds Toward:**
- [Advanced skill that builds on this one]

---

## Notes

**Design Decisions:**
- [Why this skill structure was chosen]
- [What trade-offs were made]

**Auto-Activation Tuning:**
- [Why these triggers were selected]
- [What false positive/negative rate is acceptable]

**Resource Loading Strategy:**
- [Why certain content is inline vs in resources]
- [Token budget considerations]

**Future Enhancements:**
- [Potential expansion of knowledge]
- [Additional resources planned]

---

**Skill Version:** 1.0
**Last Updated:** [YYYY-MM-DD]
**Maintained By:** [Team/role]
**Category:** [infrastructure|plugin-specific]
**Token Budget:** [Approximate size - aim for <500 lines base, unlimited resources]
