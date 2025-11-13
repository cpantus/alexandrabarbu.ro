# Pattern: Component - Resource

**Category**: meta
**Complexity**: simple
**Thinking**: N/A
**Knowledge Required**: N/A

---

## PURPOSE

Define structure, validation rules, and quality standards for skill resource files (detailed documentation loaded on-demand).

---

## INPUT

**Required:**
1. **Resource name**: kebab-case identifier
2. **Parent skill**: Which skill this resource belongs to
3. **Subject emoji**: Semantic emoji representing content
4. **Content**: Detailed documentation, examples, frameworks

---

## RULES

### Naming Convention

**Format:** kebab-case
**Pattern:** `/^[a-z0-9]+(-[a-z0-9]+)*\.md$/`

**Valid examples:**
- `tone-by-format.md` ✓
- `vocabulary-guide.md` ✓
- `strategic-sarah.md` ✓
- `quality-checklist.md` ✓

---

### Directory Structure

```
.claude/skills/
└── [skill-name]/
    └── resources/
        ├── resource-1.md
        ├── resource-2.md
        └── resource-3.md
```

**Path format:** `.claude/skills/[skill-name]/resources/[resource-name].md`

---

### Emoji Standards

**26 Skill Resources:**

**Brand Voice (3):**
- `tone-by-format`: 🎨
- `vocabulary-guide`: 📖
- `quality-checklist`: ✅

**Audience Research (4):**
- `strategic-sarah`: 👩‍💼
- `technical-tom`: 👨‍💻
- `buying-behavior-patterns`: 🛒
- `content-preferences`: ❤️

**Campaign Strategy (3):**
- `launch-campaigns`: 🚀
- `nurture-sequences`: 📧
- `messaging-frameworks`: 💬

**Marketing Analytics (3):**
- `growth-frameworks`: 📈
- `data-analysis-frameworks`: 📊
- `attribution-models`: 🔗
- `experiment-design`: 🧪

**SEO Optimization (3):**
- `llm-seo-tactics`: 🔍
- `traditional-seo-checklist`: ✅
- `programmatic-seo-blueprint`: 🗺️

**Automation (2):**
- `workflow-templates`: 📋
- `mcp-integration-patterns`: 🔌
- `automation-roi-calculator`: 💰

**Compliance (2):**
- `approval-workflows`: ✅
- `legal-requirements-checklist`: ⚖️

**Emoji Placement:**
- First character in file heading: `# 🎨 Brand Voice by Format`
- Always followed by descriptive title

---

### Structure

```markdown
# [Emoji] [Resource Title]

**Parent Skill:** [skill-name]
**Use Case:** [When to load this resource]
**Last Updated:** YYYY-MM-DD

---

## [Content Sections]
[Detailed documentation, examples, frameworks]
```

---

## PROCESS

1. **Identify Parent Skill** - Which skill will reference this resource
2. **Choose Subject Emoji** - Select semantic emoji representing content
3. **Create File** - File in `.claude/skills/[skill-name]/resources/[resource-name].md`
4. **Add Header** - Emoji, title, parent skill, use case, last updated
5. **Write Content** - Detailed documentation, examples, frameworks (not in main skill file)
6. **Link from Skill** - Add reference in parent skill file
7. **Test Loading** - Verify resource loads when skill is activated

---

## OUTPUT

### Template Structure

```markdown
# {{emoji}} {{resourceTitle}}

**Parent Skill:** {{parentSkill}}
**Use Case:** {{useCase}}
**Last Updated:** {{lastUpdated}}

---

## {{section1Title}}

{{section1Content}}

{{#if hasExamples}}
## Examples

{{#each examples}}
### {{this.title}}

{{this.content}}
{{/each}}
{{/if}}

{{#if hasFrameworks}}
## Frameworks

{{frameworksContent}}
{{/if}}

{{#if hasTemplates}}
## Templates

{{templatesContent}}
{{/if}}

{{#if hasChecklists}}
## Checklists

{{checklistsContent}}
{{/if}}

---

**Related Resources:**
{{#each relatedResources}}
- {{this}}
{{/each}}
```

### Template Variables

**Required:**
- `emoji`: Subject emoji from standards (🎨📖✅👩‍💼👨‍💻🛒❤️🚀📧💬📈📊🔗🧪🔍✅🗺️📋🔌💰⚖️)
- `resourceTitle`: Resource title (Title Case)
- `parentSkill`: Parent skill name (kebab-case)
- `useCase`: When to load this resource (one sentence)
- `lastUpdated`: Date in YYYY-MM-DD format
- `section1Title`: First major section title
- `section1Content`: First section content

**Optional:**
- `hasExamples`: Boolean - whether to include examples section
- `examples`: Array of {title, content} examples
- `hasFrameworks`: Boolean - whether to include frameworks
- `frameworksContent`: Framework documentation
- `hasTemplates`: Boolean - whether to include templates
- `templatesContent`: Template content
- `hasChecklists`: Boolean - whether to include checklists
- `checklistsContent`: Checklist content
- `relatedResources`: Array of related resource names

### Example: Generated Resource

**Input:**
```json
{
  "emoji": "📊",
  "resourceTitle": "Growth Frameworks",
  "parentSkill": "analytics",
  "useCase": "When analyzing growth metrics and identifying optimization opportunities",
  "lastUpdated": "2025-11-07",
  "section1Title": "Core Growth Frameworks",
  "section1Content": "Growth frameworks provide systematic approaches to identifying, measuring, and optimizing key growth drivers...",
  "hasExamples": true,
  "examples": [
    {"title": "AARRR Pirate Metrics", "content": "Acquisition → Activation → Retention → Referral → Revenue..."}
  ]
}
```

**Output:**
```markdown
# 📊 Growth Frameworks

**Parent Skill:** analytics
**Use Case:** When analyzing growth metrics and identifying optimization opportunities
**Last Updated:** 2025-11-07

---

## Core Growth Frameworks

Growth frameworks provide systematic approaches to identifying, measuring, and optimizing key growth drivers...

## Examples

### AARRR Pirate Metrics

Acquisition → Activation → Retention → Referral → Revenue...

---

**Related Resources:**
- data-analysis-frameworks
- attribution-models
```

---

## QUALITY CHECKS

- [ ] Name is kebab-case with .md extension
- [ ] Located in correct skill resources directory
- [ ] Heading starts with emoji
- [ ] Parent skill specified
- [ ] Use case documented
- [ ] Content is detailed (not duplicating main skill file)
- [ ] Last updated date is current
- [ ] Related resources linked

---

## ADAPTATION

**When adapting resources from external sources:**

**Location:** Move to `.claude/skills/[skill-name]/resources/` | Create parent skill if needed | Update path references in skill file
**Naming:** Enforce kebab-case with .md extension | Remove special chars | Match semantic naming patterns
**Structure:** Add heading with emoji | Include parent skill reference | Document use cases and relationships
**Content:** Retain detailed documentation | Preserve examples and frameworks | Update tool/system references to match current system
**Attribution:** Footer with source info

**Adaptation validated via:** Skill-resource link verification + `pre-tool-use-write.ts` hook

---

**Pattern Version:** 1.1
**Last Updated:** 2025-11-12
**Component Count:** 26 resources across 9 skills
