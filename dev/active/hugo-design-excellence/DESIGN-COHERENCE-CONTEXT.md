# Hugo Design Coherence - Context

**Last Updated:** 2025-11-17
**Status:** NEW PLAN - Ready for Implementation
**Current Focus:** Design language definition + token architecture

---

## Quick Reference

**Status:** Planning Complete - Awaiting implementation start
**Current Phase:** Pre-Week 1 (Design language definition prep)
**Next Step:** Week 1 - Define unified color system (8 colors with strict semantic rules)

---

## Critical User Requirement

**From User (2025-11-17):**
> "we have to upgrade the design of this project the hugo way... components (typography, atoms, molecules, menu, etc) must ALL be COHERENT and ALIGNED"

**Key Requirements:**
1. **Color Scheme:** Start with 2 brand colors, expand to full palette consistently used across ALL components
2. **Typography:** Improve approach starting with brand fonts, style consistently in ALL components
3. **Design Model:** Current landing page http://localhost:1313/ as inspiration, improve to be distinctive, modern, warm
4. **Coherence:** EVERY component must speak same design language

---

## Current State Analysis

### Excellent Foundation (From Previous 93% Completion)

**Performance & Architecture ✅:**
- Build time: 25s → <3s (88% improvement achieved)
- Atomic structure: 5 atoms + 20 molecules + 2 organisms + 30 sections
- CSS modularized: 2,394 → 998 lines critical CSS (58% reduction)
- Hugo patterns: Page bundles, taxonomies, related content implemented
- Accessibility: Skip link, ARIA labels, 44px touch targets added

**Brand Foundation ✅:**
- **Primary Color:** #4DB380 (Emerald) - growth, healing, trust
- **Secondary Color:** #CC6B49 (Terracotta) - warmth, balance, grounding
- **Primary Font:** Poppins (headings, weights 300-800)
- **Secondary Font:** Open Sans (body, weights 300-700)
- **Design System v4.0:** Glassmorphism, gradients (14), animations (10), organic shapes

**Component Inventory ✅:**
```
5 Atoms:      button, heading, icon, image, input
20 Molecules: card, blog-card, stat-card, timeline-step, form-field,
              accordion, back-to-top, cookie-consent, credential-badge,
              emergency-banner, footer-info, footer-nav, language-selector,
              logo, mobile-menu, nav-item, navigation, pricing-toggle,
              social-links, video-embed
2 Organisms:  header, footer
30 Sections:  (24 original + 6 new: professional-affiliations, office-gallery,
              testimonials-enhanced, first-session-timeline, therapist-match,
              service-faq-inline)
```

### Critical Gap: Inconsistent Application

**Problem:** Design system exists but not coherently applied

**Evidence:**
1. **Color Usage:**
   - Some components use `$emerald-500` token
   - Others use hardcoded `#4DB380` or `#059669` override
   - No enforced semantic rules (which color for which purpose)

2. **Typography:**
   - Scale defined (11 sizes) but inconsistently applied
   - Some headings use Poppins 300, others 500, others 700
   - Body text sometimes bold when should be regular 400

3. **Spacing:**
   - 8px grid system exists but many hardcoded `padding: 20px` or `margin: 15px`
   - Component tier rules (atoms 12px, molecules 16px) not enforced

4. **Motion:**
   - 3-tier system defined but inconsistent implementation
   - Some buttons use `transition: 200ms`, others `300ms`, others `400ms`
   - Hover states vary: some `translateY(-2px)`, some `-4px`, some none

5. **Shadows:**
   - Elevation system exists (7 levels) but arbitrary usage
   - Some cards jump xs → lg (skipping levels)
   - CTA shadows inconsistent

---

## Design Language Definition (Week 1 Prep)

### 5 Design Pillars (Govern ALL Decisions)

**1. Warm Professional**
- Color: Warm emerald/terracotta, soft gradients (not harsh)
- Borders: Soft radius (8-24px, organic), never sharp 0px
- Animation: Gentle easing (ease-out, ease-in-out), not linear

**2. Organic Rhythm**
- Spacing: 8px grid ONLY (4, 8, 12, 16, 24, 32, 48, 64, 96)
- Shapes: Organic blobs for backgrounds, soft rounded corners
- Breathing room: Generous whitespace, never cramped

**3. Soft Hierarchy**
- Type: Clear scale (11 sizes) but gentle weight contrast (500/600 headings, 400 body)
- Color: Primary/secondary clear but not jarring (emerald-700 headings, not emerald-500)
- Elevation: Subtle shadows (sm/md), not dramatic (xl)

**4. Welcoming Motion**
- Timing: Calm 200-300ms, not fast 100ms or slow 500ms
- Easing: Natural curves (ease-out, cubic-bezier), not linear
- Choreography: Staggered entrance (100ms delays), not simultaneous

**5. Accessible Trust**
- Contrast: 4.5:1 minimum (WCAG AA) on all text
- Focus: Emerald-500 ring, 2px offset, ALWAYS visible
- Touch: 44px minimum on mobile, NEVER smaller

### 8-Color Palette (Semantic Purpose)

**Primary Palette (2 brand - EXISTING):**
```scss
$emerald-500: #4DB380;  // PRIMARY actions, growth, trust
$terracotta-500: #CC6B49; // SECONDARY actions, warmth, balance
```

**Supporting Palette (6 NEW - Systematic Purpose):**
```scss
$teal-500: #14b8a6;    // INFO states, calm accents
$amber-500: #f59e0b;   // WARNING states, highlights
$sage-500: #22c55e;    // SUCCESS states, positive feedback
$plum-600: #9333ea;    // PREMIUM features, depth
$coral-400: #fb7185;   // EMOTIONAL content, testimonials
$navy-900: #1e3a8a;    // FOOTER, contrast sections, stability
```

**Coherence Rules (ENFORCE):**
```scss
// ONLY emerald/terracotta for brand CTAs
.btn-primary → emerald gradient
.btn-secondary → terracotta gradient
// NEVER use teal/amber/sage for brand buttons

// Supporting colors ONLY for semantic states
.alert-info → teal
.alert-warning → amber
.alert-success → sage
// NEVER decorative (e.g., random teal accent)

// ALL hover: lighten 10% + shadow warm-md
&:hover {
  background: lighten($color, 10%);
  box-shadow: $shadow-warm-md;
}

// ALL focus: emerald-500 ring, 2px offset
&:focus-visible {
  outline: 2px solid $emerald-500;
  outline-offset: 2px;
}

// ALL disabled: gray-400 + 50% opacity
&:disabled {
  background: $gray-400;
  opacity: 0.5;
}
```

### Typography System (Coherent Hierarchy)

**Font Pairing Rule:**
```scss
// Poppins (headings) = ALWAYS medium (500) OR semibold (600)
// NEVER light (300), NEVER bold (700), NEVER extrabold (800)
h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', sans-serif;
  font-weight: 500; // OR 600 for extra emphasis
}

// Open Sans (body) = ALWAYS regular (400)
// NEVER bold (700) in paragraphs (use <strong> sparingly)
p, li, span {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
}
```

**Scale Coherence (11 sizes, STRICT usage):**
| Size | CSS | HTML Usage | ONLY For |
|------|-----|------------|----------|
| Display-1 | 64-112px fluid | `.display-1` | Hero page titles |
| Display-2 | 48-72px fluid | `.display-2` | Section headers |
| H1 | 36-48px fluid | `<h1>` | Page titles |
| H2 | 30-36px fluid | `<h2>` | Major sections |
| H3 | 24-30px fluid | `<h3>` | Subsections |
| H4 | 24px | `<h4>` | Card titles |
| H5 | 20px | `<h5>` | List headers |
| H6 | 18px | `<h6>` | Small headings |
| Body | 16px | `<p>`, `<li>` | All paragraphs |
| Small | 14px | `.text-sm` | Captions, metadata |
| XS | 12px | `.text-xs` | Fine print |

**Line Height Alignment:**
```scss
// Tight (1.25) for display/h1/h2
.display-1, .display-2, h1, h2 { line-height: 1.25; }

// Snug (1.375) for h3/h4/h5
h3, h4, h5 { line-height: 1.375; }

// Normal (1.5) for body
p, li { line-height: 1.5; }

// Relaxed (1.625) for small/xs
.text-sm, .text-xs { line-height: 1.625; }
```

**Color Coherence:**
```scss
// ALL headings follow ONE variable:
:root {
  --heading-color: #111827; // gray-900 default
}
body.headings-brand-color {
  --heading-color: #16a34a; // emerald-700 (slightly darker than #4DB380)
}
h1, h2, h3, h4, h5, h6 {
  color: var(--heading-color); // NEVER hardcode
}

// Body text hierarchy (NEVER deviate):
p { color: #374151; } // gray-700
.text-secondary { color: #4b5563; } // gray-600
.text-muted { color: #6b7280; } // gray-500
```

### Spacing System (8px Grid, Rhythmic Coherence)

**Component Tier Rules:**
```scss
// Atoms: 12px vertical (space-3)
.btn { padding: 12px 32px; } // 12px top/bottom ALWAYS

// Molecules: 16px (space-4)
.card { padding: 16px; } // 16px ALWAYS

// Organisms: 32px vertical (space-8)
.header, .footer { padding: 32px 0; } // 32px ALWAYS

// Sections: 64px mobile, 96px desktop
.section {
  padding: 64px 0; // Mobile
  @media (min-width: 992px) {
    padding: 96px 0; // Desktop
  }
}
```

**Component Gaps:**
```scss
// Atom-to-atom: 8px (space-2)
.btn-group > .btn + .btn { margin-left: 8px; }

// Molecule elements: 16px (space-4)
.card > * + * { margin-top: 16px; }

// Cards in grid: 24px (space-6)
.grid { gap: 24px; }

// Sections: 96px (space-24)
.section + .section { margin-top: 96px; }
```

**FORBIDDEN VALUES:**
- ❌ 10px, 15px, 20px, 25px, 30px (not on 8px grid)
- ❌ Arbitrary values like `margin: 17px`
- ✅ ONLY: 4, 8, 12, 16, 24, 32, 48, 64, 96 (8px multiples)

### Elevation System (Shadows = Depth Hierarchy)

**7 Levels, Strict Transition Rules:**
```scss
// At rest: xs or sm only
.card { box-shadow: $shadow-sm; }
.input { box-shadow: $shadow-xs; }

// On hover: +1 level ONLY
.card:hover { box-shadow: $shadow-md; } // sm → md
.input:focus { box-shadow: $shadow-sm; } // xs → sm

// CTAs: warm-md on hover (special CTA shadow)
.btn-primary:hover, .btn-secondary:hover {
  box-shadow: $shadow-warm-md;
}

// Featured: ONLY pricing featured tier
.pricing-card.featured { box-shadow: $shadow-featured; }

// NEVER skip levels
// ❌ .card { box-shadow: $shadow-xs; }
// ❌ .card:hover { box-shadow: $shadow-lg; } // xs → lg FORBIDDEN
```

### Border Radius System (Organic Warmth)

**4 Levels, Component Type Mapping:**
```scss
// sm (8px): Inputs, small buttons, badges
.input, .btn-sm, .badge { border-radius: 8px; }

// md (12px): Buttons, cards (MOST COMMON)
.btn, .card { border-radius: 12px; }

// lg (16px): Hero cards, feature blocks
.card-hero, .feature-block { border-radius: 16px; }

// xl (24px): Section backgrounds
.section-bg { border-radius: 24px; }
```

**RULE:** ALL components of same type use SAME radius
- All buttons (primary/secondary/tertiary) = 12px
- All cards (regular/pricing/testimonial) = 12px
- NO exceptions

### Motion System (3-Tier Consistency)

**Level 1 - Subtle (links, nav items):**
```scss
a, .nav-link {
  transition: color 200ms ease-out;
  &:hover { color: $emerald-500; }
  // Transform: NONE
  // Shadow: NONE
}
```

**Level 2 - Medium (cards, form fields):**
```scss
.card, .input {
  transition: all 300ms ease-in-out;
  &:hover {
    transform: translateY(-2px); // Small lift
    box-shadow: $shadow-md; // +1 level
  }
}
```

**Level 3 - Strong (buttons, CTAs):**
```scss
.btn {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: translateY(-4px) scale(1.02); // Lift + grow
    box-shadow: $shadow-warm-md; // CTA shadow
  }
}
```

**RULE:** ALL components in same category use SAME level
- All links = Level 1
- All cards = Level 2
- All buttons = Level 3

---

## Component Audit Findings

### Atoms (5 total)

**button.html (63 lines):**
- ✅ Good: Uses variants (primary/secondary/tertiary)
- ❌ Gap: Hardcoded `padding: 12px 32px` instead of `$space-3 $space-8`
- ❌ Gap: Hardcoded `border-radius: 12px` instead of `$radius-md`
- ❌ Gap: Inconsistent hover (some buttons 2px lift, some 4px)

**heading.html (43 lines):**
- ✅ Good: Supports levels (h1-h6, display-1, display-2)
- ❌ Gap: Hardcoded colors instead of CSS custom properties
- ❌ Gap: Font weights vary (300, 500, 600, 700) - should be ONLY 500/600

**icon.html (72 lines):**
- ✅ Good: Gradient backgrounds (8 variants)
- ❌ Gap: Hardcoded sizes (32px, 48px, 64px, 84px) instead of tokens
- ❌ Gap: Hover `rotate(5deg)` not consistent across all icons

**image.html (98 lines):**
- ✅ Good: AVIF/WebP/srcset implemented (Phase 1)
- ✅ Good: Lazy loading
- ❌ Gap: Hardcoded `border-radius: 16px` instead of `$radius-lg`

**input.html (196 lines):**
- ✅ Good: ARIA attributes (Phase 5)
- ❌ Gap: Hardcoded `padding: 12px` instead of `$space-3`
- ❌ Gap: Hardcoded `border-radius: 8px` instead of `$radius-sm`

### Molecules (20 total)

**card.html (103 lines):**
- ✅ Good: Multiple variants (feature/pricing/testimonial)
- ❌ Gap: Hardcoded `padding: 16px` instead of `$space-4`
- ❌ Gap: Hardcoded `border-radius: 12px` instead of `$radius-md`
- ❌ Gap: Shadow transition not consistent (sm → md vs sm → lg)

**form-field.html (253 lines):**
- ✅ Good: Comprehensive validation states
- ❌ Gap: Uses `atoms/input.html` which has hardcoded values (inherited gap)
- ❌ Gap: Gap between label and input varies (8px vs 12px)

**20 molecules total:** Similar patterns of hardcoded values instead of tokens

### Organisms (2 total)

**header.html (118 lines):**
- ✅ Good: Composed from molecules (logo, navigation, language-selector, mobile-menu)
- ❌ Gap: Hardcoded `padding: 32px 0` instead of `$space-8`
- ❌ Gap: Sticky shadow hardcoded instead of `$shadow-md`

**footer.html (96 lines):**
- ✅ Good: Composed from molecules (footer-nav, footer-info, social-links)
- ❌ Gap: Hardcoded `padding: 64px 0` instead of `$space-16`
- ❌ Gap: Background color hardcoded `#1e3a8a` instead of `$navy-900`

### Sections (30 total)

**General patterns across all 30 sections:**
- ✅ Good: Use flexible layout engine (Phase 1)
- ❌ Gap: Vertical padding inconsistent (some 64px, some 80px, some 96px)
- ❌ Gap: Title colors hardcoded instead of using CSS custom property
- ❌ Gap: Content gaps vary (some 16px, some 24px, some 32px)

---

## Key Decisions Made

### Decision 1: 8-Color Palette (2025-11-17)
**Context:** User requested "appropriate color scheme" starting with 2 brand colors
**Decision:** Expand to 8 colors with STRICT semantic purpose
**Rationale:**
- 2 brand (emerald, terracotta) for PRIMARY/SECONDARY only
- 6 supporting (teal, amber, sage, plum, coral, navy) for SEMANTIC states only
- Prevents arbitrary color usage ("let's use teal here because it looks nice")
- Enforces coherence through rules
**Alternatives Considered:**
- 6 colors (rejected: not enough for semantic states)
- 10+ colors (rejected: too complex, hard to enforce)

### Decision 2: Typography Weight Restriction (2025-11-17)
**Context:** Current implementation uses Poppins weights 300-800 inconsistently
**Decision:** ONLY 500/600 for headings, ONLY 400 for body
**Rationale:**
- Soft hierarchy pillar (not dramatic contrast)
- Warm professional (not thin 300 or heavy 700)
- Easier to enforce coherence (2 choices vs 6)
**Alternatives Considered:**
- Allow all weights (rejected: too much freedom, incoherent)
- Single weight (rejected: no hierarchy)

### Decision 3: Component Tier Spacing (2025-11-17)
**Context:** 8px grid exists but no tier rules
**Decision:** Atoms 12px, Molecules 16px, Organisms 32px, Sections 64px/96px
**Rationale:**
- Clear progression (12 → 16 → 32 → 64 → 96)
- Organic rhythm (natural breathing room)
- Easy to remember and enforce
**Alternatives Considered:**
- Flat spacing (rejected: no hierarchy)
- Complex tier rules (rejected: hard to remember)

### Decision 4: Motion Level Categorization (2025-11-17)
**Context:** Transition durations vary wildly (100ms to 500ms)
**Decision:** 3 levels only - Subtle (200ms), Medium (300ms), Strong (300ms with scale)
**Rationale:**
- Welcoming motion pillar (calm, reassuring)
- Clear categorization by component type
- 300ms base for most interactions (research-backed optimal)
**Alternatives Considered:**
- 5 levels (rejected: too granular)
- Single duration (rejected: no hierarchy)

---

## Open Questions

### Q1: Should we create NEW design token file or extend existing `_design-system.scss`?
**Context:** `_design-system.scss` exists (358 lines) with some tokens
**Options:**
- A) Create new `_design-tokens.scss` (clean slate, enforced rules)
- B) Extend existing `_design-system.scss` (maintain continuity)
**Recommendation:** Option A - Clean slate with strict organization
**Rationale:** Existing file mixes tokens with utilities, hard to enforce pure tokens

### Q2: How to handle responsive spacing (mobile vs desktop)?
**Context:** Sections use 64px mobile, 96px desktop
**Options:**
- A) Define mobile/desktop tokens separately (`$section-padding-mobile`, `$section-padding-desktop`)
- B) Use multipliers (`$section-padding-base * 1.5 for desktop`)
- C) Fluid spacing with `clamp()`
**Recommendation:** Option A - Explicit tokens
**Rationale:** Clearest, easiest to enforce, no calculation

### Q3: Should legacy sections be refactored immediately or gradually?
**Context:** 30 sections already exist, 93% completion achieved
**Options:**
- A) Refactor all 30 sections immediately (consistent but disruptive)
- B) Refactor on touch (maintain working code until changed)
- C) Phased refactor (weeks 7-9 as planned)
**Recommendation:** Option C - Phased refactor (weeks 7-9)
**Rationale:** Lower risk, validates atom/molecule changes first, allows testing

---

## Blockers

**None currently** - All decisions resolved, ready to begin Week 1

---

## Resources & References

### Documentation
- **This plan:** `DESIGN-COHERENCE-PLAN.md`
- **Tasks:** `DESIGN-COHERENCE-TASKS.md` (to be created)
- **Previous progress:** `hugo-design-excellence-plan.md` (93% complete, archived)
- **Theme docs:** `/themes/andromeda-hugo/CLAUDE.md`, `/themes/andromeda-hugo/PROJECT.md`
- **Architecture:** `/ARCHITECTURE.md`

### Key Files to Modify
- **Tokens:** `/themes/andromeda-hugo/assets/scss/_design-tokens.scss` (to create)
- **Atoms:** `/themes/andromeda-hugo/layouts/partials/atoms/*.html` (5 files)
- **Molecules:** `/themes/andromeda-hugo/layouts/partials/molecules/*.html` (20 files)
- **Organisms:** `/themes/andromeda-hugo/layouts/partials/organisms/*.html` (2 files)
- **Sections:** `/themes/andromeda-hugo/layouts/partials/sections/*.html` (30 files)

### Commands
- `cd themes/andromeda-hugo && hugo server --buildDrafts` - Dev server
- `hugo --templateMetrics` - Performance check
- `hugo --gc --minify` - Production build
- `rg '#[0-9a-fA-F]{6}' themes/ --type html` - Find hardcoded colors

---

## Before Compaction Checklist

- [x] Critical user requirement documented (coherence + alignment)
- [x] Design language defined (5 pillars, 8 colors, typography, spacing, shadows, radius, motion)
- [x] Component audit complete (5 atoms, 20 molecules, 2 organisms, 30 sections)
- [x] Key decisions documented (8-color palette, weight restriction, tier spacing, motion levels)
- [x] Open questions captured (token file, responsive spacing, refactor timing)
- [x] Next steps clear (Week 1 - define design language)

**Next Session:**
1. Read DESIGN-COHERENCE-PLAN.md (comprehensive plan)
2. Read this file (DESIGN-COHERENCE-CONTEXT.md) for current state
3. Read DESIGN-COHERENCE-TASKS.md (detailed breakdown)
4. Begin Week 1: Create `_design-tokens.scss` with 8-color system

**Recovery Command:**
> "Continue working on hugo design coherence implementation"
