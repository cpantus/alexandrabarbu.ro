# Pattern: Component - Skill

**Category**: meta
**Complexity**: simple
**Thinking**: N/A (specification pattern)
**Knowledge Required**: N/A

---

## PURPOSE

Define structure, validation rules, and quality standards for skill components in the Claude Code infrastructure system.

---

## TASK DECOMPOSITION OVERRIDE (v5.4.0)

When this pattern applies (creating new skill component), **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE (Template copy-paste without thought):
1. Copy SKILL-TEMPLATE.md verbatim
2. Fill in placeholder text without validation
3. Add random "best practices" from internet
4. Skip enforcement level and trigger definition
5. Use weak language ("should", "consider", "might")
6. Skip anti-pattern identification

### ✅ MANDATORY SEQUENCE (Quality Skill Creation):

**Phase 1: [Skill Design]** (Make 4 critical decisions)
1. **Enforcement Level Decision**: Determine auto-load behavior
   - Reference: Pattern "Skill Types" section + @component_skill/resources/enforcement-guide.md
   - Output: Level (require/suggest) + trigger keywords (3-5) + justification

2. **Knowledge Structure Decision**: Define core vs. resources split
   - Reference: Pattern "Resource Files" + "Progressive Disclosure" sections
   - Output: Core principles list (≤500 lines main) + resource topic breakdown

3. **Anti-Pattern Identification**: List prohibited approaches
   - Reference: Pattern "Design Skills Best Practices" section
   - Output: 3-5 anti-patterns + consequences + detection criteria

4. **Task Decomposition Override Design**: Define mandatory execution sequence
   - Reference: SKILL-TEMPLATE.md "Task Decomposition Override (v5.4.0)" section
   - Output: ❌ prohibited sequence + ✅ mandatory 3-phase sequence

**Output Acknowledgment After Phase 1:**
```
Skill Design Complete:
- Enforcement: [require/suggest] - Triggers: [keyword1, keyword2, keyword3]
- Structure: [420]L core + [3] resources ([topic1, topic2, topic3])
- Anti-Patterns: [pattern1, pattern2, pattern3]
- Override: 3-phase sequence defined (Decision→Implementation→Validation)
```

**Phase 2: [Implementation]** (Write skill with v5.4.0 compliance)
5. Write skill file using directive language (YOU MUST/MUST NOT, never "should"/"consider")
6. Create resource files for deep-dive topics (on-demand loading)
7. Register in skill-rules.json with triggers and enforcement level

**Phase 3: [Validation]** (Verify quality standards)
8. Verify ≤500 lines core skill (`wc -l file.md`)
9. Check directive language compliance (`rg -i "should|consider|might|try to"` → expect 0 matches)
10. Validate Task Decomposition Override structure (has ❌/✅/phases/acknowledgment/rationale)
11. Test auto-activation (simulate trigger keywords in test prompt)

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** Generic skills become noise without enforcement. The 4-decision framework (Phase 1) ensures skills are actionable (enforcement triggers), efficient (progressive disclosure), preventive (anti-patterns), and directive (override sequences). Validation phase (Phase 3) prevents quality regression and weak language proliferation. Reusing this pattern guarantees skill quality and consistency across infrastructure.

---

## LANGUAGE STANDARDS (v5.4.0)

**YOU MUST use directive language throughout skill creation:**

**Required Directives:**
- ✅ "YOU MUST use", "DO NOT use", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "it's recommended", "please", "ideally"

**Skill Content Examples:**
- ❌ "Consider using distinctive fonts" → ✅ "YOU MUST use distinctive fonts"
- ❌ "You should avoid purple gradients" → ✅ "DO NOT use purple gradients (PROHIBITED)"
- ❌ "It's recommended to validate accessibility" → ✅ "MANDATORY: Validate accessibility (WCAG 2.1 AA)"

**Section Headers:**
- ✅ "Required Standards", "Rules", "Anti-Patterns to Avoid"
- ❌ "Best Practices", "Guidelines", "Recommendations"

**Enforcement:** Skills with weak language will be BLOCKED by pre-tool-use-write.ts hook.

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

**Structure (Official Claude Code Format v5.6.0):**
```
.claude/skills/
└── skill-name/                  # Skill directory
    ├── SKILL.md                 # Main file (required, <500 lines)
    ├── resources/               # Supporting docs (optional)
    │   ├── detail-doc-1.md
    │   ├── detail-doc-2.md
    │   └── framework-specific.md
    └── scripts/                 # Helper scripts (optional)
        └── helper.py
```

**Key Changes (v5.6.0):**
- Skills are now directories, not standalone files
- Main file MUST be named `SKILL.md` (uppercase)
- Resources are in `skill-name/resources/` (not `skills/resources/skill-name/`)
- YAML frontmatter required (see SKILL-TEMPLATE)

**Naming:** kebab-case, descriptive
- `tone-by-format.md` ✓
- `vocabulary-guide.md` ✓
- `strategic-sarah.md` ✓

**References:** Use `@skill-name/resources/file-name.md` in main skill file

**Progressive Disclosure:**
- Main SKILL.md: Quick reference (<500 lines)
- Resources: Detailed docs (unlimited length)
- Load resources only when needed

**See:** `dev/archive/migrations/v5.6.0-skills-migration.md` for migration from legacy format (v5.5.0 → v5.6.0)

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

### Valid Skill File Example (Official Format v5.6.0)

```markdown
---
name: "brand-voice-guidelines"
description: "Ensures all marketing content maintains consistent brand voice. Provides voice attributes, writing frameworks, and quality checklists. Auto-activates when creating email, social, blog, ad copy, or any content."
---

# Brand Voice Guidelines

## What This Skill Does

Ensures all marketing content maintains consistent brand voice. Provides:
- Core voice attributes
- Writing frameworks
- Quality checklists

**Progressive disclosure:**
- This file: Quick reference + core attributes
- Resources:
  - `@brand-voice-guidelines/resources/tone-by-format.md` - Format-specific guidance
  - `@brand-voice-guidelines/resources/vocabulary-guide.md` - Preferred/forbidden terms
  - `@brand-voice-guidelines/resources/quality-checklist.md` - Self-review protocol

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

**Pattern Version:** 2.0 (v5.4.0 Task Decomposition Override)
**Last Updated:** 2025-11-14
**Component Count:** 10 skills (infrastructure + plugin)
**Validation Coverage:** 100%
**Compliance:** v5.4.0 directive language + 3-phase execution
