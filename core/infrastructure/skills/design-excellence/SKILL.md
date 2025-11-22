---
name: "design-excellence"
description: "Provides design principles and anti-patterns for creating distinctive, professional interfaces that avoid "AI slop" aesthetics. Focus on typography, color systems, motion, and cohesive themes. Auto-activates when user mentions: design, UX, UI, frontend, visual design, typography, color, theme, animation, interface"
---

# Design Excellence

## MANDATORY PRE-WORK CHECKLIST

**YOU MUST complete BEFORE applying this skill:**

**[ ] 1. Read Task Decomposition Override**
   - PROHIBITED: Generic Material Design clone
   - MANDATORY: 3-phase Design Excellence approach
   - CONSEQUENCE: Skipping = "safe professional" generic output = architecture violation

**[ ] 2. Acknowledge Output Format**
   ```
   Design Excellence Applied:
   - Typography: [Font pairing + rationale]
   - Color System: [Approach + key values]
   - Motion Strategy: [Philosophy + key parameters]
   ```
   - CONSEQUENCE: Missing acknowledgment = architecture violation

**[ ] 3. Design-Specific Requirements**
   - Hero Typography: ≥100px (NOT 64px)
   - Layered Backgrounds: 3+ visual layers (NOT single gradients)
   - Color System: 5+ tonal variants (50-900 scale)
   - Font Selection: NO Inter/Roboto/Arial/Helvetica alone
   - CONSEQUENCE: Generic sizing + flat backgrounds = "AI slop"

**[ ] 4. Multi-Skill Compositions (v5.5.0)**
   - IF design-excellence + data-visualization-designer + diagram-drawing: USE all three (3.2x quality)
   - CONSEQUENCE: Single-skill usage = suboptimal quality

---

## Task Decomposition Override (v5.4.0)

### ❌ PROHIBITED (Generic Material Design clone):
1. Inter/Roboto for all text
2. Default Material Design colors
3. Generic hover effects
4. Standard component library styling

### ✅ MANDATORY SEQUENCE:

**Phase 1: Design System Decisions**
1. **Typography**: Distinctive pairing (Space Grotesk + IBM Plex Mono)
2. **Color System**: Semantic/thematic/brand-aligned palette
3. **Motion Strategy**: Purposeful/minimal/none approach

**Output After Phase 1:**
```
Design Excellence Applied:
- Typography: [pairing + rationale]
- Color System: [approach + values]
- Motion Strategy: [philosophy + parameters]
```

**Phase 2: Implementation**
4. Implement typography (families, sizes, hierarchy)
5. Implement color tokens and mappings
6. Implement motion patterns + accessibility
7. Apply cohesive theme

**Phase 3: Validation**
8. Verify typography: NO Inter/Roboto alone, 2-3 families max
9. Verify color: 4.5:1 contrast minimum
10. Verify motion: prefers-reduced-motion, GPU-accelerated
11. Verify cohesion: consistent spacing, radius, shadows

**IF ❌ instead of ✅ = ARCHITECTURE VIOLATION**

---

## Language Standards

**REQUIRED:** "YOU MUST", "DO NOT", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED"
**PROHIBITED:** "should", "consider", "might", "could", "recommended"

---

## Design Principles

### Project Classification
**Classify project type:** landing_page / portfolio / app / ecommerce / saas — [Theme/Industry]

### Typography System

**Display fonts (distinctive, characterful):**
- Modern: Space Grotesk, Sohne, Cabinet Grotesk
- Editorial: Fraunces, Crimson Pro, Cormorant
- Technical: JetBrains Mono

**Body fonts (refined, readable):**
- Untitled Sans, Sectra, Sentient, Work Sans, Garnett, IBM Plex Sans, Source Sans

**PROHIBITED as primary:**
- ❌ Inter, Roboto, Open Sans (alone)
- ❌ Arial, Helvetica, system defaults

**Rules:**
- Hero: ≥100px for impact
- Hierarchy: Clear distinction (size, weight, spacing)
- Readability: 50-75 char line length, 1.4-1.6 line height
- Limit: 2-3 families maximum
- Rationale: Every font choice MUST have reason

### Color System

**Approaches:**
1. **Semantic**: Success #10b981, Error #ef4444, Warning #f59e0b, Info #3b82f6
2. **Thematic**: Cyberpunk (neon #00ff00, #ff00ff + dark #0a0a1a), Corporate (navy #1e3a8a + gray #64748b), Warm (orange #f97316 + cream #fef3c7), Cool (teal #14b8a6 + slate #475569)
3. **Brand-Aligned**: Primary + secondary + accessible variations

**MANDATORY Neutral Tint Rule:**
- Tint ALL neutrals with primary color
- Light [color] text instead of pure white
- Dark [color] backgrounds instead of pure black

**Rules:**
- Contrast: 4.5:1 text, 3:1 UI (WCAG AA)
- Tokens: Use variables for consistency
- Depth: 5+ tonal variants (50-900 scale)
- Test: Colorblind simulators

### Microinteractions Priority (80% of effort)

**Hero CTA:**
- Magnetic pull + layered depth (shadow + lift) + arrow slide-replace
- NEVER opacity change

**Navigation:**
- Animated underline draw-in from center
- Neighborhood awareness (adjacent items dim/shift on hover)

**Pricing/Feature Cards:**
- Dramatic elevation (translateY -8px)
- Spotlight gradient + dimmed neighbors
- Rotating gradient border

**Scroll Reveals:**
- Parallax layers
- Staggered fade-ups (50-100ms delays)
- Number counters animate from zero

**Form States:**
- Floating labels + border glows
- Error: horizontal shake
- Success: checkmark fade-in

**Loading States:**
- Skeleton shimmer gradients
- Blur-to-focus images
- NO generic spinners

**Toast Notifications:**
- Slide + fade + personality on dismiss

**Checkboxes & Toggles:**
- Checkboxes: SVG path animation draw-in
- Toggles: Weight and momentum (NOT instant snap)

### Spatial & Visual Design

**Composition:**
- Asymmetry, overlap, diagonal flow, grid-breaking elements
- Spacing: Generous negative space OR controlled density (commit)

**Backgrounds:**
- Gradient meshes, noise textures, geometric patterns, layered transparencies
- Dramatic shadows, grain overlays
- AVOID: Flat solid colors

**Icons:**
- Custom or distinctive (duotone, outlined, hand-drawn)
- AVOID: Material Icons filled, default libraries
- Rule: Icons feel authored, not imported

### Motion Strategy

**Page Load:**
- One orchestrated entrance with staggered reveals (animation-delay)
- Priority: High-impact moments over scattered micro-interactions

**Timings:**
- 100ms (micro), 300ms (standard), 500ms (complex)
- Easing: easeOut (entrances), easeIn (exits), easeInOut (transforms)

**Performance:**
- GPU-accelerated: transform + opacity only
- ALWAYS: prefers-reduced-motion support

**Implementation:**
- CSS-only for HTML
- Motion library for React

### Interactive Flourishes

**Cursors:**
- Contextual changes (grab hand, crosshairs, colored trails)

**Magnetic Elements:**
- Buttons pull toward cursor subtly

**3D Effects:**
- Tilt/shift based on mouse position (perspective + rotateX/Y)

**Scroll-Linked:**
- Elements react to viewport position

**Easter Eggs:**
- Obscure hover zones

---

## Quality Standards

**Quality Rule:**
Every interaction MUST build confidence, reduce friction, or create delight. If not, cut it.

**Polish Focus (Never Compromise):**
- Transitions between states
- Loading skeletons match content structure
- Empty states inspire action
- Error pages maintain aesthetic universe
- Image loading: blur-up previews
- Disabled states remain visually coherent
- Text overflow: elegant truncation
- Every breakpoint receives deliberate attention (not just collapse)

**Critical Conversion Points:**
- Hero CTA
- Navigation
- Key conversion cards
- Scroll choreography
- Form states

---

## Anti-Patterns

**Typography:** Inter/Roboto alone, >3 families, <12px body, poor hierarchy
**Color:** Pure black/white (#000/#fff), <4.5:1 contrast, >3 accents, inconsistent usage
**Motion:** >1s animations, bouncing/elastic for data viz, continuous loops, ignoring prefers-reduced-motion
**General:** Generic Material clone, inconsistent spacing, missing hover/focus/loading states, flat backgrounds

---

## Resources

**Typography**: `@resources/typography-system.md` — Font pairing, type scales, web font optimization
**Color**: `@resources/color-systems.md` — Palette generation, accessibility testing, design tokens
**Motion**: `@resources/animation-principles.md` — Easing functions, performance, reduced motion patterns
**Themes**: `@resources/theme-gallery.md` — 10 complete themes, copy-paste CSS, before/after comparisons

# Implement design principles, avoid anti-patterns, prioritize microinteractions (80% effort), never compromise conversion points
