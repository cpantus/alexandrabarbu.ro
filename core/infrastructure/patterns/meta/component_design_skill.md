# Pattern: Component - Design Skill

**Category**: meta
**Complexity**: simple
**Thinking**: N/A (specification pattern)
**Knowledge Required**: Design excellence principles from cc-visuals.md
**Version:** 2.0 (v5.4.0 - Directive Language + Task Decomposition Override)

---

## PURPOSE

Define structure, validation rules, and quality standards for **design-related skills** (frontend, UX, visual design, diagrams, typography, etc.) to prevent "AI slop" aesthetics.

**Specific to:** Skills that provide guidance on visual design, typography, color, motion, layouts, or any user-facing aesthetic decisions.

---

## Task Decomposition Override (v5.4.0)

When creating or validating design skill components, **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE (Generic Design Guidance):
1. Create design skill without design excellence requirements
2. Skip typography and color anti-patterns
3. Forget accessibility and motion principles
4. Deploy without validating against "AI slop" indicators

### ✅ MANDATORY SEQUENCE (Design Excellence Skill Development):

**Phase 1: Knowledge Application** (Validate 4 critical design excellence requirements)
1. **Typography Excellence**: Verify distinctive font guidance and anti-patterns
   - Reference: This pattern "Typography Guidance" section + cc-visuals.md
   - Output: Font anti-patterns documented + distinctive alternatives provided

2. **Color & Theme Direction**: Check cohesive theme guidance and cliché avoidance
   - Reference: This pattern "Color & Theme Direction" section
   - Output: Theme examples provided + purple-gradient-on-white avoided

3. **Motion & Animation Principles**: Ensure accessibility and focused impact guidance
   - Reference: This pattern "Motion & Animation Principles" section
   - Output: prefers-reduced-motion included + one-moment focus emphasized

4. **Anti-Patterns Section**: Validate comprehensive design anti-patterns are documented
   - Reference: This pattern "Anti-Patterns Section (REQUIRED)"
   - Output: All 5+ anti-patterns explicitly listed with ❌ markers

**Output Acknowledgment After Phase 1:**
```
Design Skill Validation Analysis:
- Typography: [Distinctive fonts ✓, Inter/Roboto explicitly avoided ✓]
- Color & Theme: [Cohesive themes provided ✓, Purple gradient avoided ✓]
- Motion: [prefers-reduced-motion ✓, One-moment focus ✓]
- Anti-Patterns: [5 anti-patterns documented ✓]
```

**Phase 2: Implementation** (Create design skill with excellence standards)
5. Structure skill with all 5 required design excellence sections
6. Add resources for detailed typography, color, motion guidance
7. Include practical examples showing quality vs "AI slop"

**Phase 3: Validation** (Verify design excellence compliance)
8. Check all anti-patterns are explicitly warned against
9. Verify skill promotes distinctive, non-generic design choices
10. Validate accessibility guidelines are included

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** Design skills MUST prevent "AI slop" aesthetics by explicitly teaching distinctive choices and warning against generic patterns. Skipping Phase 1 validation leads to skills that perpetuate Inter/Roboto usage, purple gradients, and flat backgrounds—the exact anti-patterns we're trying to eliminate.

---

## Language Standards (v5.4.0)

**YOU MUST use directive language throughout design skill specifications:**

**Required Directives:**
- ✅ "MUST", "DO NOT", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "recommended"

**Design Requirements:**
- ✅ "Design skills MUST include typography anti-patterns"
- ❌ "Design skills should include typography guidance"

**Anti-Pattern Warnings:**
- ✅ "NEVER use Inter/Roboto", "ALWAYS provide distinctive alternatives"
- ❌ "Avoid using generic fonts", "Consider distinctive alternatives"

**Enforcement Note:** Meta-patterns with weak language will be rejected by validation hooks.

---

## INPUT

**Required:**
1. **Skill name**: kebab-case identifier (e.g., "frontend-best-practices", "ux-guidelines")
2. **Skill type**: Universal, Conditional, or On-Demand
3. **Design domain**: Frontend, UX, Data Viz, Typography, Color Theory, etc.
4. **Auto-activation triggers**: Design-related keywords

**Optional:**
5. **Resources**: Detailed design resources in resources/ subdirectory
6. **Priority**: Critical, High, Medium, Low

---

## RULES

### Design Excellence Requirements

**All design skills MUST include:**

1. **Typography Guidance**
   - ❌ Anti-patterns: Inter, Roboto, Arial, Helvetica (signal "AI slop")
   - ✅ Distinctive alternatives: IBM Plex Sans, Space Grotesk, Fira Code, Crimson Pro, etc.
   - Rationale: Why these fonts signal quality and professionalism
   - Pairing principles: High contrast, weight extremes, size jumps

2. **Color & Theme Direction**
   - Avoid clichés: Purple gradients on white = "AI slop"
   - Reference cohesive themes: Cyberpunk, brutalist, retro, corporate, RPG, etc.
   - CSS variable patterns for consistency
   - Dominant color + accent principle (not evenly-distributed palettes)

3. **Motion & Animation Principles**
   - Focus: One high-impact moment > scattered micro-interactions
   - Include `prefers-reduced-motion` accessibility
   - Timing guidance: 200-600ms for UI transitions
   - GPU-accelerated properties only (`transform`, `opacity`)

4. **Background Design Techniques**
   - Teach layered gradients, not flat colors
   - Subtle texture/noise techniques
   - Never recommend: Pure white (#fff), pure black (#000)
   - Atmospheric depth over solid colors

5. **Anti-Patterns Section (REQUIRED)**
```markdown
## Design Anti-Patterns to Avoid

❌ **Generic fonts**: Inter, Roboto, Arial (signal AI-generated content)
❌ **Clichéd color schemes**: Purple gradients on white backgrounds
❌ **Flat backgrounds**: Use atmospheric depth with layered gradients
❌ **No variation**: Repeatedly using same choices across projects
❌ **Scattered animations**: Focus on one orchestrated moment
```

---

### Required Structure (Design Skills)

**File Header:**
```markdown
# [Skill Name]

**Skill Type:** Conditional (most design skills)
**Priority:** High (design impacts user perception)
**Auto-activates on:** [design-related keywords]
**Last Updated:** YYYY-MM-DD

---

## What This Skill Does

[Brief description covering design excellence + technical guidance]

Uses progressive disclosure: Main skill (<500 lines) + detailed resources on-demand.

---
```

**Required Sections:**

1. **Design Excellence Section** (BEFORE technical content)
```markdown
## [Domain] Design Excellence

[Domain-specific introduction about avoiding "AI slop"]

### Typography
- Never use: [Generic fonts]
- Consider: [Distinctive alternatives]
- Principles: [Pairing, hierarchy, extremes]

### Color & Theme
- Avoid: [Clichés]
- Commit to: [Theme examples]
- Use: [CSS variables pattern]

### Motion & Animation
- Focus: [High-impact moments]
- Include: [Accessibility]
- Timing: [Guidelines]

### Backgrounds
- Teach: [Layered gradients, textures]
- Avoid: [Flat colors, pure white/black]

### Anti-Patterns to Avoid
[Required anti-patterns list]
```

2. **Technical Guidance Section** (domain-specific best practices)

3. **When to Load Resources Section**
```markdown
## When to Load Resources

Load detailed resources when deeper guidance needed:

**[Category]:**
- [Description] → `@resources/[file-name].md`

---

**Auto-activation triggers:** [comma-separated keywords]
```

---

### Progressive Disclosure Structure

**Main skill file (<500 lines):**
- Design excellence principles (typography, color, motion, backgrounds)
- Quick reference for technical best practices
- Anti-patterns to avoid
- Resource references

**Resources directory (unlimited):**
```
[skill-name]/
└── resources/
    ├── typography-choices.md          # Font pairing, distinctive selections
    ├── design-themes-gallery.md       # Theme examples with code
    ├── motion-design.md               # Animation patterns, accessibility
    ├── atmospheric-backgrounds.md     # Gradient/texture techniques
    └── [domain-specific].md          # Additional resources
```

---

### skill-rules.json Integration

**All design skills MUST be registered:**

```json
{
  "[skill-name]": {
    "type": "domain-specific",
    "enforcement": "suggest",
    "priority": "high",
    "description": "[Domain] with design excellence - avoid AI slop aesthetics, [key features]",
    "skillPath": "[path]/[skill-name].md",
    "promptTriggers": {
      "keywords": [
        "[domain-keywords]",
        "design", "visual design", "aesthetic", "theme", "styling",
        "typography", "font", "color palette", "animation", "motion", "background", "gradient"
      ],
      "intentPatterns": [
        "(create|design|build).*?([domain-patterns])",
        "(improve|enhance).*?(design|aesthetic|visual)"
      ]
    },
    "autoActivate": true,
    "reminderMessage": "💡 [Skill Name] activated - Design excellence, [key features]"
  }
}
```

---

## EXAMPLES

### Frontend Design Skill

**File:** `frontend-best-practices.md`

**Structure:**
1. Skill header with design-focused description
2. **Frontend Design Excellence** section
   - Typography: Distinctive fonts (avoid Inter/Roboto)
   - Color/Theme: Cohesive aesthetics, theme inspiration
   - Motion: CSS-only, orchestrated reveals
   - Backgrounds: Layered gradients
   - Anti-patterns
3. Technical sections (React, Vue, TypeScript, etc.)
4. Resources references
5. Auto-activation triggers

**See:** `code-plugin/skills/frontend-best-practices.md`

### UX Design Skill

**File:** `ux-guidelines.md`

**Structure:**
1. Skill header
2. **Visual Design Excellence** section
   - Typography for UX (readability, hierarchy)
   - Color psychology & accessibility
   - Visual hierarchy & layout
   - Motion for usability
   - Backgrounds
3. Usability principles (Nielsen's heuristics, WCAG)
4. UI patterns
5. Resources references

**See:** `code-plugin/skills/ux-guidelines.md`

### Data Visualization Skill

**File:** `diagram-drawing.md`

**Structure:**
1. Skill header
2. **Design Excellence for Data Visualization** section
   - Typography for charts (avoid generic fonts)
   - Color schemes for data (accessibility, semantic colors)
   - Themes for infographics
   - Motion/animation for charts
   - Backgrounds for infographics
3. Chart.js technical reference
4. Resources references

**See:** `.claude/skills/diagram-drawing.md`

---

## VALIDATION CHECKLIST

Design skills must pass these checks:

**Design Excellence:**
- [ ] Typography section with anti-patterns (Inter, Roboto, Arial)
- [ ] Distinctive font alternatives provided
- [ ] Color/theme guidance (avoid purple gradients)
- [ ] Motion principles (high-impact, accessibility)
- [ ] Background techniques (layered gradients, textures)
- [ ] Required anti-patterns section present

**Technical Content:**
- [ ] Domain-specific best practices
- [ ] Code examples where appropriate
- [ ] Accessibility considerations

**Structure:**
- [ ] Skill header with design-focused description
- [ ] Design excellence section BEFORE technical content
- [ ] Progressive disclosure (main + resources)
- [ ] "When to Load Resources" section
- [ ] Resources directory created if referenced

**Integration:**
- [ ] Registered in skill-rules.json
- [ ] Design-related keywords in triggers
- [ ] Auto-activation enabled
- [ ] Reminder message mentions design excellence

---

## OUTPUT

### Valid Design Skill Example

```markdown
# Frontend Best Practices

**Skill Type:** Conditional
**Priority:** High
**Auto-activates on:** frontend, react, vue, UI, design, visual design, typography, theme
**Last Updated:** 2025-11-13

---

## What This Skill Does

Provides comprehensive frontend development guidance covering:
- **Design Excellence**: Typography, color, motion, backgrounds (avoid "AI slop" aesthetics)
- **Technical Best Practices**: React, Vue, TypeScript, performance, accessibility

Uses progressive disclosure: Main skill (<500 lines) + detailed resources on-demand.

---

## Frontend Design Excellence

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the **"AI slop" aesthetic**. Avoid this: make creative, distinctive frontends that surprise and delight.

### Typography: Choose Distinctive Fonts

Typography instantly signals quality. **Avoid boring, generic fonts.**

**Never use:**
- ❌ Inter, Roboto, Open Sans, Lato, Arial, default system fonts

**Consider distinctive choices:**
- **Code aesthetic**: JetBrains Mono, Fira Code, Space Grotesk
- **Editorial**: Playfair Display, Crimson Pro, Newsreader
- **Technical**: IBM Plex Sans, Source Sans 3

[... continues with complete design excellence guidance ...]

## React Best Practices

[... technical content ...]

## When to Load Resources

**Typography & Design:**
- Font pairing, weight extremes → `@frontend-best-practices/resources/typography-choices.md`
- Theme galleries → `@frontend-best-practices/resources/design-themes-gallery.md`

---

**Auto-activation triggers:** frontend, react, vue, design, typography, theme, etc.
```

---

## PROCESS

1. **Identify Design Domain** (frontend, UX, data viz, typography, etc.)
2. **Create Skill File** with design excellence section FIRST
3. **Add Technical Content** AFTER design principles
4. **Create Resources Directory** with 3-4 detailed files
5. **Register in skill-rules.json** with design triggers
6. **Validate** against checklist above
7. **Test Auto-Activation** with design-related prompts

---

## REFERENCE

**Core Principle (from cc-visuals.md):**
> "You tend to converge toward generic, 'on distribution' outputs. In frontend design, this creates what users call the 'AI slop' aesthetic. Avoid this: make creative, distinctive designs that surprise and delight."

**Key Anti-Patterns:**
- Generic fonts (Inter, Roboto, Arial)
- Purple gradients on white backgrounds
- Flat colors without depth
- Scattered micro-interactions
- Cookie-cutter layouts

**Design Excellence Dimensions:**
- Typography (distinctive, not generic)
- Color/Theme (cohesive, not clichéd)
- Motion (purposeful, not decorative)
- Backgrounds (atmospheric, not flat)
