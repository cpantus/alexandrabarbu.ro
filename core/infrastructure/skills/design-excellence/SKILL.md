---
name: "design-excellence"
description: "Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics."
---

# Design Excellence
Design principles and anti-patterns for distinctive, professional interfaces avoiding "AI slop" aesthetics. Focus on typography, color, motion, and cohesive themes. Auto-activate: design, UX, UI, frontend, visual design, typography, color, theme, animation, interface

## Design Thinking
Before coding, understand context and commit to a BOLD aesthetic:
- **Purpose**: What problem does this solve? Who uses it?
- **Tone**: Pick extreme: brutally minimal, maximalist chaos, retro-futuristic, organic, luxury, playful, editorial, brutalist, art deco, soft/pastel, industrial
- **Constraints**: Framework, performance, accessibility
- **Differentiation**: What makes this UNFORGETTABLE?

## MANDATORY PRE-WORK CHECKLIST
**[ ] 1. Read Task Decomposition Override** — PROHIBITED: Generic Material clone | MANDATORY: 3-phase approach
**[ ] 2. Acknowledge Output Format** — `Design Excellence Applied:` (missing = violation)
**[ ] 3. Design-Specific Requirements** — Hero ≥100px, 3+ bg layers, 5+ color tones, NO Inter/Roboto alone
**[ ] 4. Multi-Skill Compositions** — design-excellence + data-viz + diagram-drawing = 3.2x quality

---

## Task Decomposition Override

### ❌ PROHIBITED: Generic Material Design
- Inter/Roboto for all text, default Material colors, generic hover effects, standard component styling

### ✅ MANDATORY SEQUENCE:
**Phase 1: Design Decisions** → Typography pairing + Color system + Motion strategy
**Phase 2: Implementation** → Apply typography, color tokens, motion patterns, cohesive theme
**Phase 3: Validation** → NO Inter/Roboto alone, 4.5:1 contrast, prefers-reduced-motion, consistent spacing/radius/shadows

---

## Core Design Principles

### 1. Repetition (The Glue)
Repeat elements consistently to unify design: colors, typefaces, line weights, shapes, textures.
- **Purpose**: Ties design together, builds comfort, solidifies competence
- **Missing it**: Disjointed, unorganized appearance
- **Strategic Break**: Breaking repetition creates focal points—but MUST be surrounded by existing repetition. Breaking industry-standard repetition (unique color scheme) = novel differentiation

### 2. Contrast (Visual Difference)
Create obvious differences to draw attention:
- **Color**: Opposing colors (white/black, white/peach)
- **Shape**: Straight/angular vs smooth curves
- **Texture**: Rough (sandy blur) vs smooth (realistic object)
- **Hierarchy**: Different text weights/sizes
- **Font**: Contrasting choices, weights, colors for important info

### 3. Hierarchy (Dominance + Priority)
Give extra weight to certain elements—hallmark of professional design.
- **3-Stage Marketing**: Attract → Intrigue → Deliver message
- **Techniques**: Size (bigger = important), Weight (bolder), Color (different brightness/saturation), Font style (Sans heading vs Serif body), Orientation (isometric angle), White space (room to breathe = obvious importance)

### 4. Space (White/Negative Space)
Space prevents clutter, enhances hierarchy, emphasizes bonds between elements.
- **Proximity**: Grouped objects = subconsciously linked
- **Negative Space is ACTIVE**: Not empty—directs attention. Element in "sea of nothingness" = premium, powerful, unmissable
- **Macro**: Large expanse = minimalism, modernity, luxury, emphasis on focal point
- **Micro**: Space between lines/paragraphs = informative, serious
- **Active**: Guides viewing order, breaks into digestible chunks
- **Passive**: Aids legibility/aesthetics without guiding order

### 5. Balance (Form + Stability)
Weight evenly divided along vertical/horizontal axes.
- **Symmetrical**: Visually appealing, comfortable
- **Asymmetrical**: Large element counteracted by groups of smaller elements, typography, fine lines

---

## Advanced Layout Techniques

### Grid Manipulation
Basic grids (rule of thirds, 12-column) are essential, but bend rules to push message while maintaining functionality.
- **Intentional Breaking**: Grid-breaking serves design message/tone, not randomness
- **Invisible Guides**: Subtle margins, vertical anchors—almost every element relates to something else

### Overlapping Elements
Creates layers, makes design dynamic.
- **Interaction**: Elements touch/bleed/hover on same boundaries = rhythm, organic flow, vibrant pulse
- **Narrative**: Overlapping text/images, gradient fades merging subject with backdrop = dimensionality, natural hierarchy

### Tension Through Contrast
Create friction: big vs small, bold vs quiet, light vs dark, motion vs stillness. Energy holds attention.

### Rhythm
Design elements guide eye across layout (related to active white space and overlapping).

### Trust the Eye
Use guides for structure, then adjust for feel. Visual correction = significantly more polished work.

---

## Design Principles (Implementation)

### Typography System
**Display (distinctive):** Space Grotesk, Sohne, Cabinet Grotesk, Fraunces, Crimson Pro, Cormorant, JetBrains Mono
**Body (readable):** Untitled Sans, Sectra, Sentient, Work Sans, IBM Plex Sans, Source Sans
**PROHIBITED alone:** Inter, Roboto, Open Sans, Arial, Helvetica, system defaults
**Rules:** Hero ≥100px, clear hierarchy, 50-75 char lines, 1.4-1.6 line height, 2-3 families max, every choice needs rationale

### Color System
**Approaches:** Semantic (success/error/warning/info), Thematic (cyberpunk/corporate/warm/cool), Brand-aligned
**Neutral Tint Rule:** Tint ALL neutrals with primary—light [color] text, dark [color] backgrounds (never pure black/white)
**Psychology:** Pastels = cleanliness, freshness (health/makeup/fragrance themes)
**Rules:** 4.5:1 text contrast, 3:1 UI, use tokens, 5+ tonal variants, test colorblind

### Microinteractions (80% Effort)
**Hero CTA:** Magnetic pull + shadow lift + arrow slide (NEVER opacity)
**Navigation:** Animated underline draw-in, neighborhood awareness
**Cards:** Dramatic elevation (-8px), spotlight gradient, dimmed neighbors
**Scroll:** Parallax layers, staggered fade-ups (50-100ms), animated counters
**Forms:** Floating labels, border glows, shake on error, checkmark on success
**Loading:** Skeleton shimmer, blur-to-focus (NO spinners)
**Controls:** SVG path draw-in checkboxes, weighted momentum toggles

### Spatial & Visual
**Composition:** Asymmetry, overlap, diagonal flow, grid-breaking
**Backgrounds:** Gradient meshes, noise, geometric patterns, layered transparencies, dramatic shadows (AVOID flat solids)
**Icons:** Custom/distinctive (duotone, outlined, hand-drawn)—icons feel authored, not imported

### Motion Strategy
**Page Load:** One orchestrated entrance, staggered reveals (animation-delay)
**Timings:** 100ms (micro), 300ms (standard), 500ms (complex) | Easing: easeOut (enter), easeIn (exit), easeInOut (transform)
**Performance:** GPU-accelerated (transform + opacity only), ALWAYS prefers-reduced-motion

---

## Quality Standards

**Quality Rule:** Every interaction MUST build confidence, reduce friction, or create delight. Otherwise cut it.

**Never Compromise:**
- State transitions, loading skeletons match content, empty states inspire action, error pages maintain aesthetic
- Image blur-up, disabled states coherent, elegant text truncation, deliberate breakpoints (not just collapse)

**Critical Points:** Hero CTA, Navigation, Conversion cards, Scroll choreography, Form states

---

## Anti-Patterns

**Typography:** Inter/Roboto alone, >3 families, <12px body, poor hierarchy
**Color:** Pure #000/#fff, <4.5:1 contrast, >3 accents, inconsistent usage
**Motion:** >1s animations, bouncing for data viz, continuous loops, ignoring reduced-motion
**General:** Generic Material clone, inconsistent spacing, missing hover/focus/loading, flat backgrounds
**Layout:** Random grid-breaking (not intentional), isolated elements (no visual relationships), no balance compensation

---

## Resources

**Typography**: `@resources/typography-system.md` — Font pairing, type scales, web font optimization
**Color**: `@resources/color-systems.md` — Palette generation, accessibility testing, design tokens
**Motion**: `@resources/animation-principles.md` — Easing functions, performance, reduced motion patterns
**Themes**: `@resources/theme-gallery.md` — 10 complete themes, copy-paste CSS, before/after comparisons

# Implement design principles (repetition→contrast→hierarchy→space→balance), prioritize microinteractions (80% effort), never compromise conversion points
