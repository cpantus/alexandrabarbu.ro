# Theme Refactor - Design Decisions & Rationale

**Last Updated**: 2025-01-19

---

## Table of Contents
1. [Core Design Philosophy](#core-design-philosophy)
2. [Typography Decisions](#typography-decisions)
3. [Color System Decisions](#color-system-decisions)
4. [Spacing System Decisions](#spacing-system-decisions)
5. [Animation Language Decisions](#animation-language-decisions)
6. [Icon System Decisions](#icon-system-decisions)
7. [Component Architecture Decisions](#component-architecture-decisions)
8. [Technical Architecture Decisions](#technical-architecture-decisions)

---

## Core Design Philosophy

### Decision: Create New Design Language from Scratch
**Selected**: Create entirely new design language (not incremental improvement)
**Rationale**:
- Current v4.0 design has inconsistencies (spacing, variants, animations)
- Starting fresh ensures unified system without legacy baggage
- Opportunity to apply modern design principles systematically
- Clean slate allows for better design token architecture

**Rejected Alternatives**:
- ❌ Keep current warm, organic psychology style (has structural issues)
- ❌ Modern minimalist with clean lines (may feel too cold for psychology)
- ❌ Bold contemporary (may feel too aggressive for therapy practice)
- ❌ Elegant sophisticated (may feel too formal/distant)

**Impact**:
- Complete rebuild of all 50+ components
- New design token system (8 token files)
- Higher upfront cost, but better long-term maintainability
- Cleaner codebase with no legacy compatibility burden

---

## Typography Decisions

### Decision: Crimson Pro + Work Sans
**Selected**: Crimson Pro (serif headings) + Work Sans (sans body) ✅ **DECIDED 2025-01-19**
**Previous**: Cormorant Garamond (serif) + Source Sans 3 (sans) → REPLACED

**Rationale**:
- **Crimson Pro**: Elegant serif with calligraphic touches, designed for screen readability
  - Balanced contemporary aesthetic (professional yet approachable)
  - Specifically recommended for healthcare and professional services
  - Variable font support for performance
  - Excellent Romanian diacritic support
- **Work Sans**: Friendly, legible sans optimized for digital use
  - Modern geometric sans with warm, rounded feel
  - Excellent at all sizes, especially UI elements
  - Variable font support
  - Pairs beautifully with Crimson Pro (serif-sans contrast)
- **Psychology Practice Fit**: Balances elegance with approachability - perfect for therapy
- Better performance than previous fonts (variable fonts, better subsetting)

**Selection Criteria** (for Phase 1):
1. **Professional**: Conveys expertise and trustworthiness
2. **Warm**: Approachable, not cold or clinical
3. **Readable**: Excellent readability at all sizes
4. **Variable fonts**: Support variable font technology for performance
5. **Good weight range**: 4-5 weights (light, regular, medium, semibold, bold)
6. **Good language support**: Romanian diacritics (ă, â, î, ș, ț)
7. **Performance**: Good subsetting, reasonable file size

**Pairing Strategy**:
- **Serif for headings**: Creates hierarchy, professional authority, emotional warmth
- **Sans for body**: Modern readability, clean UI elements, better at small sizes
- **Contrast**: Serif + sans pairing creates visual interest and hierarchy

**Font Weight Philosophy** (NEW):
- Remove restriction of only 400/500/600
- Allow 4-5 weights: light (300), regular (400), medium (500), semibold (600), bold (700)
- **Rationale**: More expressive hierarchy, better design flexibility
- **Constraint**: Still restrict to 4-5 weights (not full 100-900 range) to maintain performance

**Font Scale** (11-step):
- Keep current 11-step scale (xs → 7xl)
- Introduce fluid typography for responsive scaling (clamp() for large headings)
- **Rationale**: Current scale works well, just needs better font foundation

**Line Heights** (4 levels):
- Keep current approach: tight (1.25), snug (1.375), normal (1.5), relaxed (1.625)
- **Rationale**: Current line heights are optimal for readability

---

## Color System Decisions

### Decision: Refined Palette + Expanded Color Range
**Selected**: Refine emerald + terracotta foundation, add 4-6 supporting colors
**Current**: 8 colors → NEW: 12-14 colors

**Rationale**:
- Emerald (#4DB380) and terracotta (#CC6B49) are strong brand colors (keep foundation)
- 8 colors insufficient for 34 sections (need more variety)
- Psychology practice needs calm, warm, trustworthy palette
- Supporting colors enable better hierarchy and visual interest

**Color Selection Strategy**:
1. **Refine foundation**:
   - Emerald (#4DB380): May adjust for better harmony, but keep green growth symbolism
   - Terracotta (#CC6B49): May adjust for better warmth, keep grounding symbolism

2. **Add 4-6 supporting colors**:
   - **Calm Blue**: Trust, professionalism, calm (for informational sections)
   - **Warm Sage**: Nature, calm, healing (for values/philosophy)
   - **Soft Lavender**: Compassion, creativity, gentleness (for testimonials)
   - **Deep Plum**: Depth, wisdom, premium (for credentials/expertise)
   - **Gentle Coral**: Warmth, energy, optimism (for CTAs, highlights)
   - **Neutral Taupe**: Grounding, sophistication, elegance (for backgrounds, borders)

3. **9-Step Scales**:
   - Create 50-900 scales for each color (consistent with current approach)
   - **Rationale**: Enables flexible tinting/shading for backgrounds, borders, hover states

4. **Semantic Mappings**:
   - Define clear semantic names: `$color-text-primary`, `$color-bg-section`, etc.
   - **Rationale**: Abstract color usage from specific values, easier to theme

**Accessibility Requirements**:
- All text/background combinations must meet WCAG AA (4.5:1 contrast minimum)
- Test all color combinations with contrast checker tools
- Document passing combinations in design system docs

**Color Distribution Strategy** (for 34 sections):
- **Primary (emerald)**: 40-50% - Main actions, trust signals, professional content
- **Secondary (terracotta)**: 20-30% - Warm connections, personal content, secondary actions
- **Supporting colors**: 20-30% - Variety, hierarchy, visual interest
- **Neutrals**: 10-20% - Backgrounds, borders, text

---

## Spacing System Decisions

### Decision: 8pt Grid System
**Selected**: 8pt base grid (not 4pt)
**Current**: No unified grid (inconsistent spacing)

**Rationale**:
- **8pt over 4pt**: Simpler mental model, fewer options, faster decisions
- **Why grid**: Ensures visual consistency, rhythm, professional polish
- **Industry standard**: 8pt grid used by Material Design, iOS HIG, major design systems

**Spacing Scale** (16 steps):
```
$space-1:  8px   (0.5rem)
$space-2:  16px  (1rem)
$space-3:  24px  (1.5rem)
$space-4:  32px  (2rem)
$space-5:  40px  (2.5rem)
$space-6:  48px  (3rem)
$space-8:  64px  (4rem)
$space-10: 80px  (5rem)
$space-12: 96px  (6rem)
$space-16: 128px (8rem)
$space-20: 160px (10rem)
$space-24: 192px (12rem)
```

**Component Spacing**:
- **Card padding**: $space-4 to $space-6 (32px to 48px)
- **Section vertical spacing**: $space-12 to $space-16 (96px to 128px)
- **Grid gaps**: $space-3 to $space-4 (24px to 32px)
- **Button padding**: $space-2 vertical, $space-4 horizontal (16px, 32px)

**Responsive Spacing**:
- Mobile: Use smaller values (e.g., section spacing $space-8 instead of $space-12)
- Tablet: Mid-range values
- Desktop: Full spacing scale
- **Rationale**: Maintain visual rhythm while adapting to screen real estate

**Exception Policy**:
- Icons, borders, small UI details may use 1px, 2px, 4px (sub-grid values)
- **Rationale**: Optical precision sometimes requires sub-grid adjustments

---

## Animation Language Decisions

### Decision: Unified Timing & Easing System
**Selected**: 4 duration levels, 3-4 easing curves, consistent microinteractions
**Current**: Inconsistent timing (150ms, 250ms, 400ms varies by component)

**Duration Levels**:
- **Fast**: 150ms - Instant feedback (button press, input focus)
- **Base**: 250ms - Standard transitions (hover, color change)
- **Normal**: 350ms - Moderate animations (slide-in, fade-in)
- **Slow**: 500ms - Complex animations (modal open, carousel)

**Easing Curves**:
- **Ease-out**: Default for UI interactions (cubic-bezier(0, 0, 0.2, 1))
  - Use: Hover states, button presses, color transitions
  - **Rationale**: Fast start, slow end feels responsive
- **Ease-in-out**: Smooth bidirectional (cubic-bezier(0.4, 0, 0.2, 1))
  - Use: Modal open/close, drawer slide, carousel
  - **Rationale**: Symmetrical, smooth for reversible animations
- **Spring**: Bouncy, playful (cubic-bezier(0.68, -0.55, 0.265, 1.55))
  - Use: Success states, microinteractions, playful moments
  - **Rationale**: Adds personality without being distracting
- **Linear**: Constant speed (linear)
  - Use: Loading spinners, progress bars
  - **Rationale**: Consistent progress indication

**Microinteraction Patterns**:
1. **Button Hover**: -2px translateY, shadow upgrade, 150ms ease-out
2. **Button Press**: translateY(0), shadow downgrade, 150ms ease-out
3. **Card Hover**: -4px translateY, shadow upgrade, 250ms ease-out
4. **Input Focus**: Border color change, 150ms ease-out
5. **Input Error**: Shake animation (3px left/right), 500ms spring

**Scroll Animation Patterns**:
1. **Fade-in**: Opacity 0 → 1, 350ms ease-out
2. **Slide-in-up**: TranslateY(20px) → 0, opacity 0 → 1, 350ms ease-out
3. **Slide-in-left**: TranslateX(-20px) → 0, opacity 0 → 1, 350ms ease-out
4. **Scale-in**: Scale(0.95) → 1, opacity 0 → 1, 350ms ease-out
5. **Staggered**: Children animate with 100ms delay each

**Parallax**:
- **Speed**: 30% of scroll speed (Desktop ≥992px only)
- **Rationale**: Subtle depth without motion sickness

**Accessibility**:
- Respect `prefers-reduced-motion` media query
- Disable all animations if user prefers reduced motion
- **Rationale**: WCAG compliance, user control

---

## Icon System Decisions

### Decision: Select New Icon Library (TBD in Phase 1)
**Current**: Line Awesome → To be evaluated
**Options**: Line Awesome, Lucide, Heroicons, Phosphor

**Selection Criteria**:
1. **Coverage**: 1000+ icons for comprehensive needs
2. **Consistency**: Uniform stroke width, optical sizing, grid-based
3. **Psychology relevance**: Mental health, wellness, therapy icons
4. **Licensing**: Open source, free for commercial use
5. **Performance**: SVG-based, tree-shakeable, small file size
6. **Maintenance**: Active development, community support
7. **Romanian support**: Covers needed symbols/concepts

**Icon Size System** (aligned with 8pt grid):
```
xs: 16px  (2 × 8pt)
sm: 24px  (3 × 8pt)
md: 32px  (4 × 8pt)
lg: 48px  (6 × 8pt)
xl: 64px  (8 × 8pt)
2xl: 96px (12 × 8pt)
```

**Icon Wrapper Sizes** (for gradient circles):
```
sm: 48px  (6 × 8pt) - Contains md (32px) icon
md: 64px  (8 × 8pt) - Contains lg (48px) icon
lg: 96px  (12 × 8pt) - Contains xl (64px) icon
xl: 128px (16 × 8pt) - Contains 2xl (96px) icon
```

**Icon Usage Patterns**:
- **Inline icons**: xs/sm sizes within text, buttons
- **Card icons**: md/lg sizes in feature cards, value cards
- **Hero icons**: lg/xl sizes in headers, large sections
- **Decorative icons**: 2xl sizes for backgrounds, accents

**Color Strategy**:
- Use semantic color tokens for icon fills/strokes
- Support gradient wrappers for special emphasis
- **Rationale**: Icons inherit design system colors automatically

---

## Component Architecture Decisions

### Decision: Maintain Atomic Design Pattern
**Selected**: Keep atoms → molecules → organisms → sections hierarchy
**Rationale**:
- Current architecture is sound (separates concerns well)
- Atomic Design proven pattern for scalable component systems
- Composability enables reuse and consistency
- Clear mental model for component hierarchy

**Component Count Target**:
- **Atoms**: 10 (5 refactored + 5 new)
- **Molecules**: 29 (21 refactored + 8 new)
- **Organisms**: 4 (2 refactored + 2 new)
- **Sections**: 34 (all new for site structure)
- **Total**: 77 components

**Rationale for Counts**:
- Atoms: Keep minimal (only truly atomic components)
- Molecules: More variety needed for 34 sections
- Organisms: Minimal (header, footer, hero, CTA patterns)
- Sections: One per unique page section requirement

---

### Decision: Unified Variant System
**Selected**: Standardize color variants across all components
**Current**: Inconsistent (some use 3 variants, others 5, others 8)

**New Variant System** (8 color variants):
1. **primary** - Emerald (main actions, trust, professional)
2. **secondary** - Terracotta (warm actions, personal connection)
3. **tertiary** - Calm Blue (informational, support actions)
4. **success** - Green (positive feedback, achievements)
5. **warning** - Amber (caution, important notices)
6. **error** - Red (errors, critical alerts)
7. **info** - Blue (informational content)
8. **neutral** - Gray (subtle, backgrounds)

**Application**:
- All atoms support all 8 variants (buttons, badges, icons, headings)
- Molecules inherit variants from atoms they compose
- Sections use variants via atom/molecule composition

**Rationale**:
- Consistent mental model (same variants everywhere)
- Enables flexible color usage without new components
- Easier to maintain (change variant = changes everywhere)

---

### Decision: BEM Naming Convention
**Selected**: Continue using BEM (Block Element Modifier)
**Rationale**:
- Current BEM implementation works well
- Industry standard for component-based CSS
- Predictable class naming
- Avoids specificity wars
- Works well with ITCSS architecture

**BEM Rules**:
- Block: `.c-card` (c- prefix for component)
- Element: `.c-card__header` (double underscore)
- Modifier: `.c-card--primary` (double dash)
- No nesting beyond 1 level deep (`.c-card__header__title` ❌ forbidden)

**Legacy Class Removal**:
- Remove all legacy compatibility classes (`.card-v4`, `.btn-primary`, etc.)
- **Rationale**: Clean codebase, no backwards compatibility needed for full redesign

---

## Technical Architecture Decisions

### Decision: Maintain ITCSS Architecture
**Selected**: Keep ITCSS (Inverted Triangle CSS) layer structure
**Rationale**:
- ITCSS solves specificity management (increasing specificity as you go down)
- Industry-proven pattern for large CSS codebases
- Works well with BEM and component architecture

**ITCSS Layers** (7 layers):
1. **01-settings/**: Design tokens (variables only, no CSS output)
2. **02-tools/**: Mixins, functions (no CSS output)
3. **03-generic/**: CSS resets, normalize (low specificity)
4. **05-objects/**: Layout primitives (.o-container, .o-grid)
5. **06-components/**: BEM components (.c-button, .c-card)
6. **07-utilities/**: Utility classes (.u-text-center, .u-mb-4)
7. **main.scss**: Entry point (imports all layers in order)

**Why no 04-elements layer**:
- Skipped in current architecture (not needed for component-based approach)
- **Rationale**: All styling done via classes (BEM components), no bare element styling

---

### Decision: Vanilla JavaScript (No Framework Dependencies)
**Selected**: Continue vanilla JS approach (no jQuery, no Bootstrap JS)
**Rationale**:
- Current vanilla implementations work well (values-compass, stats-counter, scroll-animations)
- No framework dependencies = smaller bundle, better performance
- Modern browser APIs sufficient (IntersectionObserver, requestAnimationFrame)
- Full control over behavior and performance

**GSAP Decision** (TBD in Phase 7):
- Evaluate if GSAP needed for new design
- If complex animations required: Keep GSAP (professional-grade animation library)
- If simple animations sufficient: Remove GSAP, use CSS + vanilla JS
- **Rationale**: Only include dependencies that provide significant value

---

### Decision: Preserve Multilingual Architecture
**Selected**: Keep current RO (root) + EN (/en/) structure
**Rationale**:
- Current multilingual setup works perfectly
- Romanian primary (root path) - correct for .ro domain
- English secondary (/en/ path) - clear URL structure
- Hugo i18n system handles translations well

**Content Parity Requirement**:
- Every Romanian page must have English equivalent
- Exact feature parity (no missing sections in either language)
- **Rationale**: Professional consistency, SEO optimization

---

### Decision: Performance Standards (Maintain Current)
**Selected**: Keep existing performance targets
- Build time: <3 seconds
- Page size: <600KB (current <520KB, allowing +80KB for new features)
- CSS: <60KB gzipped (current ~50KB, allowing +10KB)
- JS: <30KB gzipped (current ~3KB, allowing +27KB)
- Lighthouse score: ≥90 (all metrics)

**Rationale**:
- Current performance excellent
- New design should not regress performance
- Set budget for new features while maintaining speed

**Image Strategy** (maintain):
- AVIF → WebP → fallback
- Responsive srcset (4 sizes)
- Lazy loading (default)
- Hugo image processing pipeline
- **Rationale**: Already optimal, no changes needed

---

### Decision: Accessibility Standards (WCAG AA Minimum)
**Selected**: Maintain WCAG 2.1 AA compliance, aim for AAA where possible
**Requirements**:
- Color contrast: 4.5:1 minimum (text/background)
- Touch targets: ≥44px on mobile
- Keyboard navigation: All interactive elements accessible via keyboard
- Screen readers: Full ARIA support, semantic HTML
- Reduced motion: Respect prefers-reduced-motion media query
- Focus indicators: Clear visible focus states (not :focus { outline: none })

**Rationale**:
- Current accessibility excellent
- Psychology practice serves diverse population (accessibility critical)
- Legal compliance (many countries require WCAG AA)
- Ethical responsibility (inclusive design)

---

## Decision Summary Table

| Decision Area | Selected Approach | Key Rationale |
|---------------|-------------------|---------------|
| **Design Philosophy** | New design language from scratch | Clean slate, no legacy burden, unified system |
| **Typography** | New serif + sans pairing (TBD Phase 1) | Better brand representation, more expressive |
| **Font Weights** | 4-5 weights (300-700), remove restriction | More flexibility vs current 400/500/600 only |
| **Colors** | 12-14 colors (refine emerald + terracotta + add 6) | Need variety for 34 sections, maintain brand |
| **Color Scales** | 9-step scales (50-900) | Flexible tinting/shading, consistent with current |
| **Spacing** | 8pt grid system (16 steps) | Visual consistency, professional rhythm |
| **Animation Timing** | 4 durations (150/250/350/500ms) | Consistent, predictable, unified |
| **Easing** | 4 curves (ease-out, ease-in-out, spring, linear) | Covers all use cases, professional feel |
| **Icons** | New library (TBD Phase 1), sizes aligned to 8pt grid | Consistency with spacing, comprehensive coverage |
| **Component Count** | 77 total (10+29+4+34) | Sufficient for 34 sections, not bloated |
| **Variants** | 8 unified variants (all components) | Consistency, flexibility, maintainability |
| **CSS Architecture** | ITCSS + BEM (continue current) | Proven, scalable, manageable |
| **JS Approach** | Vanilla JS (no jQuery/Bootstrap JS) | Performance, control, no dependencies |
| **Multilingual** | RO (root) + EN (/en/) (maintain current) | Works well, SEO optimized |
| **Performance** | Maintain targets (<3s, <600KB, Lighthouse ≥90) | Excellent baseline, no regression |
| **Accessibility** | WCAG 2.1 AA minimum (maintain current) | Ethical, legal, inclusive |

---

## Open Questions (To Resolve in Phase 1)

### Typography ✅ **RESOLVED 2025-01-19**
- [x] Which serif font for headings? → **Crimson Pro** (elegant, calligraphic, psychology-appropriate)
- [x] Which sans font for body? → **Work Sans** (friendly, legible, modern geometric)
- [x] Font weights: 4 or 5 weights? → **3 weights: 400/500/600** (lighter than previous, maintains performance)
- [x] Font loading: Google Fonts or self-hosted? → **Google Fonts** (CDN performance, automatic subsetting)

### Colors
- [ ] Exact emerald shade: Keep #4DB380 or adjust?
- [ ] Exact terracotta shade: Keep #CC6B49 or adjust?
- [ ] Which 4-6 supporting colors exactly?
- [ ] Color naming convention: descriptive (emerald) or abstract (primary)?

### Icons
- [ ] Which icon library: Line Awesome, Lucide, Heroicons, or Phosphor?
- [ ] Stroke width: 1.5px, 2px, or variable?
- [ ] Icon wrapper style: Gradient circles (keep) or new pattern?

### Design Patterns
- [ ] Glassmorphism: Keep, refine, or remove completely?
- [ ] Gradients: Keep, update, or remove?
- [ ] Organic shapes: Keep blob shapes or new approach?
- [ ] Card shadows: Soft shadows (current) or harder shadows (modern)?

**Resolution Timeline**: All open questions resolved in Phase 1 (Session 1)

---

*Last Updated: 2025-01-19*
*Next: Begin Phase 1 implementation in next session*
