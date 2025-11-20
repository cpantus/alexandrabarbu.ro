---
name: "skill-template"
description: "Template for creating new Claude Code skills following official specification. Provides structure, YAML frontmatter format, and best practices for skill development."
---

# Skill Template

**Official Claude Code Skills Format**

This template follows the official Claude Code skills specification from https://code.claude.com/docs/en/skills.md

## Structure Requirements

Skills must be organized as directories with a `SKILL.md` file:

```
skill-name/
├── SKILL.md (required - this file)
├── supporting-file.md (optional)
├── resources/ (optional)
│   ├── resource-1.md
│   └── resource-2.md
└── scripts/ (optional)
    └── helper-script.py
```

---

## YAML Frontmatter (REQUIRED)

Every SKILL.md must start with YAML frontmatter:

```yaml
---
name: "skill-name"  # lowercase, numbers, hyphens only (max 64 chars)
description: "Brief description of what this Skill does and when to use it. Include trigger keywords that users would mention. Max 1024 characters."
allowed-tools: Read, Grep, Glob  # optional - restricts Claude's capabilities when skill is active
---
```

**Required Fields:**
- `name`: Skill identifier (lowercase, hyphens, numbers only, max 64 chars)
- `description`: What the skill does AND when to use it (trigger keywords for model-invoked activation)

**Optional Fields:**
- `allowed-tools`: Comma-separated list of tools Claude can use (enables read-only or scope-restricted workflows)

---

## Activation Model

Skills are **model-invoked** - Claude autonomously decides when to activate them based on:
1. User request context
2. Description matching (trigger keywords)
3. Task relevance

This differs from slash commands (explicit user invocation).

**Writing Effective Descriptions:**
- Include specific keywords users would mention
- Describe both functionality AND usage triggers
- Example: "Provides React best practices for component design, hooks, state management, and performance optimization. Activate when building React components or debugging React applications."

---

## DOCUMENTATION CHECKLIST - COMPLETE BEFORE IMPLEMENTING

**[ ] 1. Update README.md:**
   - **Section**: Skills count in Quick Reference
   - **Action**: Increment skill count
   - **Why**: Keep component inventory accurate

**[ ] 2. Update core/docs/skills-system.md:**
   - **Section**: "Available Skills" list
   - **Action**: Add skill entry with name, description, location
   - **Why**: Central registry for skill discovery

**[ ] 3. Storage Location Decision:**
   - Personal skills: `~/.claude/skills/skill-name/SKILL.md`
   - Project skills: `.claude/skills/skill-name/SKILL.md` (team-shared, git-tracked)
   - Plugin skills: `plugin-name/skills/skill-name/SKILL.md`

**[ ] 4. Update plugin README (if plugin skill):**
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

**Activates When:**
User mentions: [keyword-1], [keyword-2], [keyword-3], or related concepts (via description matching)

---

## MANDATORY PRE-WORK CHECKLIST

**YOU MUST complete this checklist BEFORE applying this skill:**

**[ ] 1. Read Task Decomposition Override Section**
   - **WHY**: Understand the PROHIBITED sequence (what NOT to do)
   - **WHY**: Understand the MANDATORY sequence (3-phase approach)
   - **CONSEQUENCE**: Skipping = using prohibited approach = architecture violation

**[ ] 2. Acknowledge Output Format Requirement**
   - **FORMAT REQUIRED**:
     ```
     [Skill Name] Applied:
     - [Decision 1]: [Choice made + rationale]
     - [Decision 2]: [Choice made + rationale]
     - [Decision 3]: [Choice made + rationale]
     ```
   - **WHY**: Hook validation requires this exact format
   - **CONSEQUENCE**: Missing acknowledgment = architecture violation

**[ ] 3. Identify Skill-Specific Requirements**
   - **[Requirement 1]**: [What to check/verify before starting]
   - **[Requirement 2]**: [What to check/verify before starting]
   - **[Requirement 3]**: [What to check/verify before starting]
   - **WHY**: [Rationale for these specific requirements - what quality issue they prevent]
   - **CONSEQUENCE**: Ignoring = [specific quality failure this skill prevents]

**[ ] 4. Check for Multi-Skill Compositions (v5.5.0)**
   - **IF this skill + [complementary-skill] loaded together**:
     - YOU MUST apply both skills in conjunction (not isolation)
     - Composition: [composition-name] ([multiplier]x quality improvement)
     - See: `.claude/skill-composition-rules.json`
   - **CONSEQUENCE**: Single-skill usage when composition available = suboptimal quality

**✅ ALL BOXES CHECKED = Ready to proceed to Task Decomposition Override**
**❌ SKIPPING THIS CHECKLIST = Claiming "I followed the skill" while delivering generic output**

---

## Task Decomposition Override (v5.4.0)

When this skill applies ([trigger conditions - be specific]), **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE ([Name the anti-pattern - common wrong approach]):
1. [Wrong approach step 1 - common mistake users/Claude make]
2. [Wrong approach step 2 - leads to quality issues]
3. [Wrong approach step 3 - violates skill principles]
4. [Wrong approach step 4 - produces poor outcomes]

### ✅ MANDATORY SEQUENCE ([Skill purpose/approach name]):

**Phase 1: [Knowledge Application]** (Make [N] explicit decisions)
1. **[Decision Name 1]**: [What to decide/choose]
   - Reference: Skill "[Section Name]" or @skill-name/resource-file.md
   - Output: [What to document/produce]

2. **[Decision Name 2]**: [What to decide/choose]
   - Reference: Skill "[Section Name]" or @skill-name/resource-file.md
   - Output: [What to document/produce]

3. **[Decision Name 3]**: [What to decide/choose]
   - Reference: Skill "[Section Name]" or @skill-name/resource-file.md
   - Output: [What to document/produce]

**Output Acknowledgment After Phase 1:**
```
[Skill Name] Applied:
- [Decision 1]: [Choice made + rationale]
- [Decision 2]: [Choice made + rationale]
- [Decision 3]: [Choice made + rationale]
```

**Phase 2: [Implementation]** (Apply Phase 1 decisions)
4. [Implementation step 1 - applies decision from Phase 1]
5. [Implementation step 2 - follows skill principles]
6. [Implementation step 3 - ensures quality outcomes]

**Phase 3: [Validation]** (Verify quality criteria)
7. [Validation criterion 1 - must be checkable/measurable]
8. [Validation criterion 2 - must be checkable/measurable]
9. [Validation criterion 3 - must be checkable/measurable]

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** [Explain WHY the mandatory sequence is required. What quality does it guarantee? What problem does it solve? How does component reuse ensure these outcomes?]

---

## Language Standards (v5.4.0)

**YOU MUST use directive language throughout this skill:**

**Required Directives:**
- ✅ "YOU MUST use", "DO NOT use", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "it's recommended", "please", "ideally"

**Section Headers:**
- ✅ "Required Standards", "Rules", "Requirements", "Anti-Patterns to Avoid"
- ❌ "Best Practices", "Guidelines", "Recommendations", "Suggestions"

**Examples of Directive Transformation:**
- ❌ "Consider using X" → ✅ "YOU MUST use X"
- ❌ "You should avoid Y" → ✅ "DO NOT use Y (PROHIBITED)"
- ❌ "It's recommended to Z" → ✅ "MANDATORY: Z"
- ❌ "Try to follow pattern P" → ✅ "ALWAYS follow pattern P"

**Enforcement Note:** Skills with weak language will be rejected by pre-tool-use-write.ts hook.

---

## Core Principles

### Principle 1: [Principle Name]

[Description of the principle and why it matters]

**Requirements:**
- [Requirement 1 - use directive language: "YOU MUST..."]
- [Requirement 2 - use directive language: "DO NOT..."]
- [Requirement 3 - use directive language: "ALWAYS..."]

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

## Required Standards

### YOU MUST Follow
- ✅ [Required standard 1 - directive language + rationale]
- ✅ [Required standard 2 - directive language + rationale]
- ✅ [Required standard 3 - directive language + rationale]

**Examples:**
- "YOU MUST validate input before processing"
- "ALWAYS use type-safe patterns"
- "MANDATORY: Document all public APIs"

---

## Anti-Patterns to Avoid

**YOU MUST NOT use these approaches:**

### ❌ Anti-Pattern 1: [Pattern Name]
**What it is:** [Description of the anti-pattern]
**Why it's prohibited:** [Consequence or quality issue it causes]
**Instead, do:** [Correct approach from Required Standards]

### ❌ Anti-Pattern 2: [Pattern Name]
**What it is:** [Description of the anti-pattern]
**Why it's prohibited:** [Consequence or quality issue it causes]
**Instead, do:** [Correct approach from Required Standards]

### ❌ Anti-Pattern 3: [Pattern Name]
**What it is:** [Description of the anti-pattern]
**Why it's prohibited:** [Consequence or quality issue it causes]
**Instead, do:** [Correct approach from Required Standards]

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

## Progressive Disclosure & Resources

### Inline Quick Reference
[Keep base skill content <500 lines]

**Key Metrics:**
- [Metric 1]: [What it measures, formula if applicable]
- [Metric 2]: [What it measures, formula if applicable]

**Common Formulas:**
- [Formula name]: `[formula]` - [What it calculates]

### Supporting Files (Progressive Disclosure)

Claude will load these only when needed:

**resources/resource-1.md** - [What it covers, when to load]
**resources/resource-2.md** - [What it covers, when to load]
**scripts/helper.py** - [What it does, when to use]

**Token Budget:**
- Base skill: <500 lines (stays loaded)
- Resources: Unlimited (loaded on-demand)
- Scripts: Executed when needed

---

## Integration

**Works Well With:**
- **Skill**: [other-skill-name] - [How they complement each other]
- **Pattern**: [pattern_name] - [How pattern applies this knowledge]
- **Agent**: [agent-name] - [Which agents leverage this skill]

**Typical Workflow:**
```
1. [Skill] auto-activates on description matching
2. Claude applies [Framework] to user's problem
3. Extended resources loaded if deeper expertise needed
4. Output follows Required Standards
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

**Activation Tuning:**
- Description keywords: [List key terms for model-invoked activation]
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
**Last Updated:** 2025-01-14
**Maintained By:** hal-10k-core
**Category:** infrastructure
**Token Budget:** <500 lines base skill, unlimited resources
**Official Spec:** https://code.claude.com/docs/en/skills.md
