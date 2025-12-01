# Skill Templates

**Parent Skill:** skill-developer
**Last Updated:** 2025-11-16
**Purpose:** Ready-to-use templates for creating different skill types

---

## Main Skill File Template

```markdown
# [Skill Name]

**Last Updated:** [Date]
**Skill Type:** [universal|domain-specific|guardrail]

---

## Purpose

[2-3 sentences: What problem does this solve?]

Use this skill when:
- [Specific use case 1]
- [Specific use case 2]
- [Specific use case 3]

---

## Quick Reference

### [Framework/Process Name]

**[Key concept 1]**
- Point 1
- Point 2
- Point 3

**[Key concept 2]**
- Point 1
- Point 2

### Checklist: [Common Task]

1. [ ] [Step 1]
2. [ ] [Step 2]
3. [ ] [Step 3]

### Decision Tree: [Common Decision]

```
IF [condition] → THEN [action]
ELSE IF [condition] → THEN [action]
ELSE → [default action]
```

---

## Core Knowledge

### [Section 1: Foundational Concepts]

[Content: 50-100 lines]

### [Section 2: Key Frameworks]

[Content: 50-100 lines]

### [Section 3: Application Guidelines]

[Content: 50-100 lines]

### [Section 4: Common Pitfalls]

[Content: 30-50 lines]

---

## Resources

- [@resources/[file1].md] - [Description of detailed guide]
- [@resources/[file2].md] - [Description of detailed guide]
- [@resources/[file3].md] - [Description of detailed guide]

---

## Usage Patterns

**Pattern 1: [Common scenario]**
```
Load: [This skill] + [@other-skill]
Apply: [Framework from this skill]
Output: [Expected deliverable]
```

**Pattern 2: [Another scenario]**
```
Load: [This skill] + [@resources/specific-file]
Apply: [Specific technique]
Output: [Expected deliverable]
```

---

## Quality Checklist

Before delivering work using this skill:

**[Category 1]:**
- [ ] [Check 1]
- [ ] [Check 2]

**[Category 2]:**
- [ ] [Check 1]
- [ ] [Check 2]

**[Category 3]:**
- [ ] [Check 1]
- [ ] [Check 2]
```

---

## Resource File Template

```markdown
# [Resource Name]

**Parent Skill:** [skill-name]
**Last Updated:** [Date]
**Token Budget:** [Estimated tokens]

---

## Purpose

[Why this resource exists, when to load it]

---

## [Section 1: Detailed Implementation Guide]

### Step 1: [First step]
[Detailed instructions with examples]

### Step 2: [Second step]
[Detailed instructions with examples]

[Continue...]

---

## [Section 2: Templates]

### Template 1: [Template name]
```
[Copy-paste ready template]
```

**When to use:** [Guidance]
**Customization:** [What to change]

---

## [Section 3: Examples]

### Example 1: [Scenario]
**Context:** [Background]
**Approach:** [What was done]
**Result:** [Outcome]
**Lessons:** [Takeaways]

---

## [Section 4: Edge Cases]

### Edge Case 1: [Unusual scenario]
**Problem:** [What goes wrong]
**Solution:** [How to handle]

---

## Cross-References

Related skills: [@skill1], [@skill2]
Related resources: [@resources/other-file]
```

---

## skill-rules.json Configuration Template

```json
"[skill-name]": {
  "type": "domain-specific",
  "enforcement": "suggest",
  "priority": "high",
  "description": "[One-line description]",
  "skillPath": ".claude/skills/[skill-name].md",
  "resources": [
    ".claude/skills/resources/[resource1].md",
    ".claude/skills/resources/[resource2].md"
  ],
  "promptTriggers": {
    "keywords": [
      "keyword1", "keyword2", "keyword3",
      "phrase 1", "phrase 2"
    ],
    "intentPatterns": [
      "(verb).*?(noun|phrase)",
      "pattern2",
      "pattern3"
    ]
  },
  "fileTriggers": {
    "pathPatterns": [
      "**/*-[type].md",
      "[directory]/**/*.md"
    ],
    "contentPatterns": [
      "Marker:",
      "Another Marker:"
    ]
  },
  "autoActivate": true,
  "reminderMessage": "[Icon] [Category] Check - [Action to take]"
}
```

---

## Keyword Selection Tips

**Start with 15-30 keywords:**
- Include synonyms and variations
- Add domain-specific jargon
- Test with common prompts

**Examples:**
- Email skill: "email", "inbox", "deliverability", "bounce", "spam", "subject line", "open rate"
- SEO skill: "seo", "search", "ranking", "keywords", "backlinks", "meta", "organic traffic"

---

## Intent Pattern Tips

**Match verb + noun combinations:**
```regex
(create|build|design).*?(campaign|strategy)
```

**Capture question patterns:**
```regex
(how|what|why).*?(target|segment)
```

**Use optional groups:**
```regex
(analyze|review).*?(data|metrics|performance)?
```

---

## Common Skill Structures

### Content Creation Skills
- Purpose: Guide content production
- Quick Reference: Content formulas, templates
- Core Knowledge: Writing frameworks, optimization
- Resources: Industry-specific examples, style guides

### Analysis Skills
- Purpose: Guide data interpretation
- Quick Reference: Metrics dashboards, benchmarks
- Core Knowledge: Analysis frameworks, insights
- Resources: Statistical methods, reporting templates

### Strategy Skills
- Purpose: Guide planning and decision-making
- Quick Reference: Strategy canvases, decision trees
- Core Knowledge: Planning frameworks, prioritization
- Resources: Case studies, competitive analysis

### Execution Skills
- Purpose: Guide implementation and operations
- Quick Reference: Checklists, process flows
- Core Knowledge: Execution frameworks, best practices
- Resources: Tool guides, troubleshooting playbooks
