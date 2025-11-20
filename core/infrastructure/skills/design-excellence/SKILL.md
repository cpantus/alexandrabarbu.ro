---
name: "design-excellence"
description: "Provides design principles and anti-patterns for creating distinctive, professional interfaces that avoid "AI slop" aesthetics. Focus on typography, color systems, motion, and cohesive themes. Auto-activates when user mentions: design, UX, UI, frontend, visual design, typography, color, theme, animation, interface"
---

# Design Excellence

## MANDATORY PRE-WORK CHECKLIST

**YOU MUST complete this checklist BEFORE applying this skill:**

**[ ] 1. Read Task Decomposition Override Section**
   - **WHY**: Understand the PROHIBITED sequence (Generic Material Design clone)
   - **WHY**: Understand the MANDATORY sequence (3-phase Design Excellence approach)
   - **CONSEQUENCE**: Skipping = delivering "safe professional" generic output = architecture violation

**[ ] 2. Acknowledge Output Format Requirement**
   - **FORMAT REQUIRED**:
     ```
     Design Excellence Applied:
     - Typography: [Font pairing + rationale]
     - Color System: [Approach + key values]
     - Motion Strategy: [Philosophy + key parameters]
     ```
   - **WHY**: Hook validation requires this exact format
   - **CONSEQUENCE**: Missing acknowledgment = architecture violation

**[ ] 3. Identify Design-Specific Requirements**
   - **Hero Typography**: ≥100px for distinctive impact (NOT 64px "safe" sizing)
   - **Layered Backgrounds**: 3+ visual layers for depth (NOT single gradients)
   - **Color System Depth**: 5+ tonal variants (50-900 scale) for rich interactions
   - **Design Philosophy**: DISTINCTIVE and memorable (NOT "safe professional")
   - **Font Selection**: NO Inter/Roboto/Arial/Helvetica alone (use distinctive pairings)
   - **WHY**: Generic sizing + flat backgrounds + minimal colors = indistinguishable "AI slop"
   - **CONSEQUENCE**: Ignoring = user sees "looks like every other SaaS site" = failed design

**[ ] 4. Check for Multi-Skill Compositions (v5.5.0)**
   - **IF design-excellence + data-visualization-designer + diagram-drawing loaded**:
     - YOU MUST apply all three skills in conjunction (not isolation)
     - Composition: visual-design-excellence (3.2x quality improvement)
     - This skill = aesthetic polish, data-viz = truthful encoding, diagram = implementation
   - **CONSEQUENCE**: Single-skill usage when composition available = suboptimal quality

**✅ ALL BOXES CHECKED = Ready to proceed to Task Decomposition Override**
**❌ SKIPPING THIS CHECKLIST = Claiming "Design Excellence Applied" while delivering generic output**

---

## Task Decomposition Override (v5.4.0)

When this skill applies (design/UI/UX/visual request), **DO NOT use your default task decomposition.**

### ❌ PROHIBITED ITEMS (Generic Material Design clone):
1. Use Inter or Roboto for all text
2. Apply default Material Design colors
3. Add generic hover effects
4. Use standard component library styling

### ✅ MANDATORY SEQUENCE (Design Excellence Application):

**Phase 1: Design System Decisions** (Make 3 explicit decisions)
1. **Typography Strategy**: Choose distinctive font pairing
   - Reference: Skill "Typography" section
   - Output: Selected fonts with rationale (e.g., "Space Grotesk + IBM Plex Mono for modern technical aesthetic")

2. **Color System Approach**: Select semantic/thematic/brand-aligned palette
   - Reference: Skill "Color Systems" section
   - Output: Color approach with key values (e.g., "Cyberpunk theme: neon #00ff00, #ff00ff on dark #0a0a1a")

3. **Motion Strategy**: Define purposeful/minimal/none animation approach
   - Reference: Skill "Motion & Animation" section
   - Output: Motion philosophy (e.g., "Minimal: hover scale 1.02, 150ms, respecting prefers-reduced-motion")

**Output Acknowledgment After Phase 1:**
```
Design Excellence Applied:
- Typography: [Font pairing + rationale]
- Color System: [Approach + key values]
- Motion Strategy: [Philosophy + key parameters]
```

**Phase 2: Implementation** (Apply Phase 1 decisions)
4. Implement typography system (font families, sizes, hierarchy)
5. Implement color tokens and semantic mappings
6. Implement motion patterns with accessibility support
7. Apply cohesive theme across all components

**Phase 3: Validation** (Verify quality criteria)
8. Verify typography: NO Inter/Roboto alone, clear hierarchy, 2-3 families max
9. Verify color: 4.5:1 contrast minimum, consistent token usage
10. Verify motion: respects prefers-reduced-motion, GPU-accelerated properties
11. Verify cohesion: consistent spacing, border radius, shadow system

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** Generic Material Design clones signal "AI slop." Professional interfaces require distinctive aesthetics and intentional design decisions. The 3-phase approach GUARANTEES: (1) explicit design system decisions before implementation, (2) cohesive application of principles, (3) measurable quality verification. This is MANDATORY for quality output.

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

## Design Principles

### Typography

Typography is the foundation of design excellence. Poor font choices instantly signal "AI slop."

**Never use as primary typography:**
- ❌ Inter, Roboto, Open Sans (alone, without pairing)
- ❌ Arial, Helvetica, system defaults
- ❌ Comic Sans, Papyrus (obviously)

**YOU MUST use distinctive pairings like these examples:**
- **Modern**: Space Grotesk + IBM Plex Mono
- **Editorial**: Source Serif + Source Sans
- **Technical**: JetBrains Mono + IBM Plex Sans
- **Elegant**: Cormorant + Lato

**Typography principles:**
- **Hierarchy**: Clear visual distinction (size, weight, spacing)
- **Readability**: Line length 50-75 characters, line height 1.4-1.6
- **Consistency**: Limit to 2-3 font families maximum
- **Intentionality**: Every font choice MUST have a reason

### Color Systems

Color creates meaning, mood, and hierarchy.

**Approach 1: Semantic (Purpose-Driven)**
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Warning: Yellow (#f59e0b)
- Info: Blue (#3b82f6)
- Neutral: Gray scale

**Approach 2: Thematic (Mood-Driven)**
- Cyberpunk: Neon (#00ff00, #ff00ff) + dark (#0a0a1a)
- Corporate: Navy (#1e3a8a) + gray (#64748b)
- Warm: Orange (#f97316) + cream (#fef3c7)
- Cool: Teal (#14b8a6) + slate (#475569)

**Approach 3: Brand-Aligned**
- Use brand primary + secondary colors
- Generate accessible variations (WCAG AA minimum)
- Create semantic mappings from brand palette

**Color principles:**
- **Contrast**: 4.5:1 for text, 3:1 for UI components (WCAG AA)
- **Consistency**: Use variables/design tokens
- **Accessibility**: Test with colorblind simulators
- **Intentionality**: Avoid random color choices

### Motion & Animation

Animation MUST guide attention and provide feedback, not distract.

**Purposeful Motion (Guides Attention):**
- Entry animations: Fade + slight translate (400ms, easeOut)
- State changes: Smooth transitions (200-300ms)
- Loading states: Progressive disclosure
- Scroll-triggered: Reveal content as user explores

**Minimal Motion (Subtle Feedback):**
- Hover: Scale 1.02, brightness 1.1 (150ms)
- Click: Scale 0.98 (100ms)
- Focus: Border highlight (instant)
- Drag: Opacity 0.8, cursor change

**No Motion (Accessibility):**
- Respect `prefers-reduced-motion: reduce`
- Provide instant state changes
- Use color/shape for feedback instead

**Motion principles:**
- **Duration**: 100ms (micro), 300ms (standard), 500ms (complex)
- **Easing**: easeOut for entrances, easeIn for exits, easeInOut for transforms
- **Performance**: Use transform and opacity (GPU-accelerated)
- **Accessibility**: Always provide reduced-motion alternative

### Themes & Cohesion

A cohesive theme ties typography, color, and motion together.

**Theme Components:**
1. **Typography system**: Font families, sizes, weights, line heights
2. **Color palette**: Primary, secondary, semantic, neutral scales
3. **Spacing scale**: 4px/8px base, consistent rhythm
4. **Border radius**: Consistent rounding (0px sharp, 4px soft, 12px+ pill)
5. **Shadow system**: Elevation levels (subtle to prominent)
6. **Motion tokens**: Duration, easing, transition properties

**Example Theme (Cyberpunk):**
```css
:root {
  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'Fira Code', monospace;

  /* Colors */
  --color-primary: #00ff00;
  --color-secondary: #ff00ff;
  --color-bg: #0a0a1a;
  --color-text: #00ffff;

  /* Motion */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Anti-Patterns to Avoid

**Typography:**
- ❌ Using Inter/Roboto alone without distinctive pairing
- ❌ More than 3 font families
- ❌ Tiny text (<12px for body copy)
- ❌ Poor hierarchy (everything same size/weight)

**Color:**
- ❌ Pure black text on pure white (#000 on #fff)
- ❌ Low contrast (<4.5:1 for text)
- ❌ Too many accent colors (>3)
- ❌ Inconsistent color usage

**Motion:**
- ❌ Overly long animations (>1 second)
- ❌ Bouncing/elastic easing for data viz
- ❌ Continuous looping animations
- ❌ Ignoring prefers-reduced-motion

**General:**
- ❌ Generic Material Design clone
- ❌ Inconsistent spacing (random margins/padding)
- ❌ Missing hover/focus states
- ❌ No loading states

---

## Resources (Progressive Loading)

**Typography**: Load `@resources/typography-system.md` for:
- Font pairing strategies
- Type scale generation
- Web font optimization

**Color**: Load `@resources/color-systems.md` for:
- Palette generation tools
- Accessibility testing
- Design token implementation

**Motion**: Load `@resources/animation-principles.md` for:
- Easing function library
- Performance optimization
- Reduced motion patterns

**Themes**: Load `@resources/theme-gallery.md` for:
- 10 complete theme examples
- Copy-paste CSS/design tokens
- Before/after comparisons

# Implement design principles, avoid anti patterns, read resources