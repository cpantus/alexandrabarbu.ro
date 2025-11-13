# Pattern: Component - Skill

**Category**: meta
**Complexity**: simple
**Thinking**: N/A (specification pattern)
**Knowledge Required**: N/A

---

## PURPOSE

Define structure, validation rules, and quality standards for skill components in the Marketing Agent system.

---

## INPUT

**Required:**
1. **Skill name**: kebab-case identifier (e.g., "brand-voice-guidelines")
2. **Skill type**: Universal, Conditional, or On-Demand
3. **Auto-activation triggers**: Keywords/phrases that activate the skill
4. **Core knowledge**: Quick reference patterns and principles

**Optional:**
5. **Resources**: Detailed documentation files in resources/ subdirectory
6. **Priority**: Critical, High, Medium, Low

---

## RULES

### Naming Convention

**Format:** kebab-case

**Pattern:** `/^[a-z0-9]+(-[a-z0-9]+)*$/`

**Valid examples:**
- `brand-voice-guidelines` ✓
- `audience-research` ✓
- `campaign-strategy-frameworks` ✓
- `seo-optimization` ✓

**Invalid examples:**
- `brand_voice_guidelines` ✗ (underscore)
- `brandVoiceGuidelines` ✗ (camelCase)
- `Brand-Voice-Guidelines` ✗ (capitalized)

**Rationale:** Kebab-case matches commands and agents, creating consistent naming across components.

---

### Required Structure

**File Header:**
```markdown
# [Skill Name]

**Skill Type:** Universal|Conditional|On-Demand
**Priority:** Critical|High|Medium|Low
**Auto-activates on:** keyword1, keyword2, pattern phrases
**Last Updated:** YYYY-MM-DD

---
```

**Required Sections:**
```markdown
## What This Skill Does
- Purpose and activation conditions
- Progressive disclosure (main file + resources)

## Quick Reference
- One-sentence summary
- Core principles (bullet points)
- Key frameworks/patterns

## [Topic-Specific Sections]
(Varies by skill - brand voice attributes, persona profiles, frameworks, etc.)

## When to Load Resources
- Conditions when detailed docs needed
- Resource file listing with @resources/ paths
```

---

### Emoji Standards

**9 Skills:**
- `brand-voice-guidelines`: 🎨 (creative/brand identity)
- `audience-research`: 👥 (people/personas)
- `campaign-strategy-frameworks`: 📋 (planning/organization)
- `seo-optimization`: 🔍 (search/discovery)
- `marketing-analytics`: 📊 (data/metrics)
- `automation-workflows`: ⚙️ (automation/systems)
- `compliance-and-legal`: ⚖️ (legal/rules)
- `research-synthesis`: 🔬 (research/analysis)
- `skill-developer`: 🛠️ (development/tools)

**Emoji Usage:**
- In skill-rules.json reminderMessage field
- Hook outputs for skill activation
- NOT in skill markdown files
- NOT in file names

---

### Skill Types

**Universal:**
- Activates on ALL relevant tasks automatically
- Examples: brand-voice-guidelines (all content), compliance-and-legal (approvals)
- Priority: Usually Critical or High

**Conditional:**
- Activates when specific keywords/patterns detected
- Examples: seo-optimization (when SEO mentioned), marketing-analytics (data tasks)
- Priority: Usually High or Medium

**On-Demand:**
- Must be explicitly loaded by user or agent
- Examples: skill-developer (creating new skills)
- Priority: Usually Medium or Low

---

### Auto-Activation Triggers

**Keywords:** Single words or short phrases
```yaml
auto-activates on: email, social, blog, ad copy, content creation
```

**Intent Patterns:** Regex-like patterns
```yaml
intentPatterns:
  - (create|write|draft).*(email|social|blog)
  - content.*(creation|development)
```

**Validation:**
- Keywords should be specific, not generic
- Avoid trigger overlap between skills (causes conflicts)
- Test triggers don't false-positive on unrelated tasks

---

### Resource Files

**Structure:**
```
.claude/skills/
├── skill-name.md (main file, <500 lines)
└── skill-name/
    └── resources/
        ├── detail-doc-1.md
        ├── detail-doc-2.md
        └── framework-specific.md
```

**Naming:** kebab-case, descriptive
- `tone-by-format.md` ✓
- `vocabulary-guide.md` ✓
- `strategic-sarah.md` ✓

**References:** Use `@resources/file-name.md` in main skill file

**Progressive Disclosure:**
- Main skill file: Quick reference (<500 lines)
- Resources: Detailed docs (unlimited length)
- Load resources only when needed

---

### Similarity Detection

**Thresholds:**
- **Warning:** >60% similarity
- **Error:** >85% similarity

**Examples:**
- `brand-voice-guidelines` vs `brand-guidelines` → 80% → ⚠️ Warning
- `seo-optimization` vs `seo-optimisation` → 95% → ❌ Error (typo)

---

### Design Skills Best Practices (v5.4.0)

**For design-related skills** (frontend, UX, visual design, diagrams, typography, etc.):

**Typography Guidance:**
- ❌ Never recommend: Inter, Roboto, Arial, Helvetica (signal "AI slop")
- ✅ Provide distinctive alternatives: IBM Plex Sans, Space Grotesk, Fira Code, Crimson Pro
- Include rationale: Why these fonts signal quality and professionalism

**Color & Theme:**
- Avoid cliché patterns (purple gradients on white = "AI slop")
- Reference cohesive themes (cyberpunk, brutalist, retro, corporate, RPG)
- Provide CSS variable patterns for consistency

**Motion & Animation:**
- Focus on high-impact moments (one orchestrated page load > scattered micro-interactions)
- Include accessibility (`prefers-reduced-motion`)
- Timing guidance (200-600ms for UI transitions)

**Backgrounds:**
- Teach layered gradients, not flat colors
- Subtle texture/noise techniques
- Never recommend pure white (#fff) or pure black (#000)

**Anti-Patterns Section (Required):**
```markdown
## Design Anti-Patterns to Avoid

❌ **Generic fonts**: Inter, Roboto, Arial (signal AI-generated content)
❌ **Cliché color schemes**: Purple gradients on white backgrounds
❌ **Flat backgrounds**: Use atmospheric depth with layered gradients
❌ **No variation**: Repeatedly using same choices across projects
```

**Resource Structure:**
Design skills should reference detailed resources:
- `@resources/typography-choices.md` - Font pairing, distinctive selections
- `@resources/design-themes-gallery.md` - Theme examples with code
- `@resources/motion-design.md` - Animation patterns, accessibility
- `@resources/atmospheric-backgrounds.md` - Gradient/texture techniques

**See Examples:**
- `code-plugin/skills/frontend-best-practices.md` - Frontend design excellence
- `code-plugin/skills/ux-guidelines.md` - Visual design for UX
- `.claude/skills/diagram-drawing.md` - Design for data visualization

---

## PROCESS

1. **Load Existing Skills**
2. **Validate Naming** (kebab-case, uniqueness)
3. **Check File Header** (all required fields)
4. **Validate Skill Type** (Universal/Conditional/On-Demand)
5. **Check Auto-Activation** (triggers defined, no conflicts)
6. **Verify Structure** (required sections present)
7. **Check Resources** (if referenced, verify they exist)
8. **Similarity Detection** (check against all skills)
9. **Generate Report**

---

## OUTPUT

### Validation Report

```typescript
interface SkillValidationReport {
  valid: boolean;
  skillName: string;
  skillType: 'Universal' | 'Conditional' | 'On-Demand';
  errors: string[];
  warnings: string[];
  recommendations: string[];
  corrections: Correction[];
}
```

### Valid Skill File Example

```markdown
# Brand Voice Guidelines

**Skill Type:** Universal
**Priority:** Critical
**Auto-activates on:** email, social, blog, ad copy, content creation
**Last Updated:** 2025-11-03

---

## What This Skill Does

Ensures all marketing content maintains consistent brand voice. Provides:
- Core voice attributes
- Writing frameworks
- Quality checklists

**Progressive disclosure:**
- This file: Quick reference + core attributes
- Resources:
  - `@resources/tone-by-format.md` - Format-specific guidance
  - `@resources/vocabulary-guide.md` - Preferred/forbidden terms
  - `@resources/quality-checklist.md` - Self-review protocol

---

## Quick Reference

Brand voice is **data-driven yet human** - authoritative expertise with approachable clarity.

### Core Attributes (Weighted)
- Authoritative (40%) - Expert insights backed by data
- Approachable (30%) - Conversational, not corporate
- Clear (20%) - Simple language, no fluff
- Empowering (10%) - Actionable, confidence-building

---

## [Topic Sections...]

## When to Load Resources

Load detailed resources when:
- Creating long-form content: `@resources/tone-by-format.md`
- Reviewing terminology: `@resources/vocabulary-guide.md`
- Quality audit needed: `@resources/quality-checklist.md`
```

---

## QUALITY CHECKS

- [ ] Name is kebab-case
- [ ] File header has all required fields
- [ ] Skill type is valid
- [ ] Auto-activation triggers defined
- [ ] Quick reference section present
- [ ] Main file under 500 lines
- [ ] Resources (if any) exist at specified paths
- [ ] No >85% similarity to existing skills

---

## VARIATIONS

### By Skill Type

**Universal Skills:**
- Always active
- Core to all tasks
- Examples: brand-voice-guidelines, compliance-and-legal

**Conditional Skills:**
- Activate on triggers
- Domain-specific
- Examples: seo-optimization, marketing-analytics

**On-Demand Skills:**
- Explicitly loaded
- Specialized use cases
- Examples: skill-developer, research-synthesis (non-marketing)

---

## ADAPTATION

**When adapting skills from external sources:**

**Structure:** Add YAML frontmatter with triggers, category, resources | Validate sections (Purpose, When Active, Key Knowledge, Usage)
**Naming:** Enforce kebab-case | Match filename to YAML name field | Remove special chars
**Resources:** External resources → `.claude/skills/resources/` | Update paths | Validate links exist
**Triggers:** Map to system trigger keywords | Ensure pattern matching works | Test auto-activation logic
**Attribution:** Footer with source, date, modifications

**Adaptation validated via:** `skill-matcher.ts` + `pre-tool-use-write.ts` hook

---

## USAGE NOTES

**When to use:**
- Creating new skill component
- Validating existing skill
- Understanding skill standards

**When to use `/generate skill`:**
- Interactive guided creation
- Auto-validation during creation

---

## MAINTENANCE NOTES

**When adding new skills:**
1. Update emoji mapping in this pattern
2. Add to skill-rules.json
3. Update skill count (currently 9)
4. Check auto-activation doesn't conflict

**When deprecating:**
1. Move to `.claude/deprecated/skills/`
2. Remove from skill-rules.json
3. Update count

---

**Pattern Version:** 1.0
**Last Updated:** 2025-11-06
**Component Count:** 9 skills
**Validation Coverage:** 100%
