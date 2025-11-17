# Hugo Theme Design Coherence - Implementation Plan

**Created:** 2025-11-17
**Status:** NEW PLAN - Ready for Implementation
**Estimated Time:** 10 weeks (systematic design coherence)
**Supersedes:** Previous performance-focused plan (which achieved 93% completion)

---

## CRITICAL REQUIREMENT: Design Coherence

**From User (2025-11-17):**
> "we have to upgrade the design of this project the hugo way. Use hugo specialist, ux designer, design skill with full knowledge. We must create an appropriate color scheme to be consistently used in the theme, in all components starting with the 2 configured brand colors and leaving you the option of picking the rest. Typography approach can be improved, start with configured brand fonts and style them consistently in all components in the theme. The desired design to apply to components starts with current landing page design http://localhost:1313/ which you will improve and will be made distinctive, modern, warm in all the theme."

**EMPHASIS:**
> "ALL components (typography, atoms, molecules, menu, etc) must ALL be COHERENT and ALIGNED"

---

## Executive Summary

Transform the Hugo theme from "good design system foundation" to "perfectly coherent visual language" where:
- **Every component speaks the same design language**
- **Typography, color, spacing, motion are systematically aligned**
- **No isolated design decisions - everything flows from unified foundation**
- **Warm professional personality** permeates all 62 components

**Key Shift from Previous Plan:**
- Previous: Performance + architecture improvements (93% complete ✅)
- **NEW**: Design coherence + systematic visual alignment across entire theme

---

## Current Foundation (Excellent Starting Point)

### What's Already Working ✅
**From previous 93% completion:**
- Build performance optimized (25s → <3s achieved)
- Atomic component structure (5 atoms, 20 molecules, 2 organisms, 30 sections)
- CSS architecture modularized (2,394 → 998 lines critical CSS)
- Hugo best practices implemented (page bundles, taxonomies, related content)
- Accessibility improvements (skip link, ARIA labels, 44px touch targets)
- UX enhancements (first session timeline, therapist match, enhanced testimonials)

### Brand Foundation
- **Primary:** Emerald #4DB380 (growth, healing, trust)
- **Secondary:** Terracotta #CC6B49 (warmth, balance, grounding)
- **Fonts:** Poppins (headings), Open Sans (body)
- **Design System v4.0:** Glassmorphism, gradients, organic shapes, animations

### Critical Gap to Address
**Inconsistent application** - Design system exists but not coherently applied:
- Some components use tokens, others use hardcoded values
- Typography scale exists but inconsistently applied
- Color palette exists but usage rules not enforced
- Motion system defined but not universally implemented

---

## The 5 Design Pillars (Govern ALL Decisions)

1. **Warm Professional** - Approachable but credible
   Guides: Color warmth, border softness, animation gentleness

2. **Organic Rhythm** - Natural spacing flow
   Guides: 8px grid adherence, organic shapes, breathing room

3. **Soft Hierarchy** - Clear but gentle contrast
   Guides: Type scale application, color weights, elevation levels

4. **Welcoming Motion** - Calm, reassuring interactions
   Guides: Animation timing, easing curves, choreography

5. **Accessible Trust** - Universal clarity
   Guides: Contrast ratios, focus states, touch targets

---

## Phase 1: Design Language Definition (Week 1)

### 1.1 Unified Color System (8 colors, strict semantic rules)

**Primary Palette (2 brand - PRESERVE):**
- Emerald #4DB380 → PRIMARY actions only, growth, trust
- Terracotta #CC6B49 → SECONDARY actions only, warmth, balance

**Supporting Palette (6 NEW - systematic purpose):**
- **Teal #14b8a6** → Info states, calm accents
- **Amber #f59e0b** → Warning states, highlights
- **Sage #22c55e** → Success states, positive feedback
- **Plum #9333ea** → Premium features, depth
- **Coral #fb7185** → Emotional content, testimonials
- **Navy #1e3a8a** → Footer, contrast sections

**COHERENCE RULES (Enforce Strictly):**
```scss
// ONLY emerald/terracotta for brand CTAs
.btn-primary → emerald gradient
.btn-secondary → terracotta gradient

// Supporting colors ONLY for semantic states
.alert-info → teal
.alert-warning → amber
.alert-success → sage

// ALL hover states: lighten 10% + shadow warm-md
&:hover {
  background: lighten($color, 10%);
  box-shadow: $shadow-warm-md;
}

// ALL focus states: emerald ring, 2px offset
&:focus-visible {
  outline: 2px solid $emerald-500;
  outline-offset: 2px;
}

// ALL disabled states: gray-400 + 50% opacity
&:disabled {
  background: $gray-400;
  opacity: 0.5;
}
```

### 1.2 Typography System (coherent hierarchy)

**Font Pairing Rule:**
```scss
// Poppins (headings) = ALWAYS medium (500) or semibold (600)
h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', sans-serif;
  font-weight: 500; // OR 600, NEVER 300/400/700/800
}

// Open Sans (body) = ALWAYS regular (400)
p, li, span {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400; // NEVER bold in paragraphs
}
```

**Scale Coherence (11 sizes, strict usage):**
| Size | Usage | ONLY For |
|------|-------|----------|
| Display-1 (64-112px) | Hero titles | ONLY |
| Display-2 (48-72px) | Section titles | ONLY |
| H1 (36-48px) | Page titles | ONLY |
| H2 (30-36px) | Major sections | ONLY |
| H3 (24-30px) | Subsections | ONLY |
| H4 (24px) | Card titles | ONLY |
| H5 (20px) | List headers | ONLY |
| H6 (18px) | Small headings | ONLY |
| Body (16px) | All paragraphs | ONLY |
| Small (14px) | Captions, metadata | ONLY |
| XS (12px) | Fine print | ONLY |

**Line Height Alignment:**
```scss
// Headings: 1.25 (tight) for ALL display/h1/h2
.display-1, .display-2, h1, h2 { line-height: 1.25; }

// Subheadings: 1.375 (snug) for ALL h3/h4/h5
h3, h4, h5 { line-height: 1.375; }

// Body: 1.5 (normal) for ALL paragraphs
p, li { line-height: 1.5; }

// Captions: 1.625 (relaxed) for ALL small/xs
.text-sm, .text-xs { line-height: 1.625; }
```

**Color Coherence:**
```scss
// ALL headings follow ONE rule:
:root {
  --heading-color: #111827; // gray-900 default
}
body.headings-brand-color {
  --heading-color: #16a34a; // emerald-700 (NOT #4DB380 primary)
}
h1, h2, h3, h4, h5, h6 {
  color: var(--heading-color);
}

// Body text hierarchy (NEVER deviate):
p { color: #374151; } // gray-700 ALWAYS
.text-secondary { color: #4b5563; } // gray-600 ALWAYS
.text-muted { color: #6b7280; } // gray-500 ALWAYS
```

### 1.3 Spacing System (8px grid, rhythmic coherence)

**Component Internal Spacing (ALWAYS follow tier):**
```scss
// Atoms: 12px (space-3)
.btn, .input, .icon-wrapper {
  padding: 12px 32px; // Vertical 12px ALWAYS
}

// Molecules: 16px (space-4)
.card, .form-field, .nav-item {
  padding: 16px; // ALWAYS 16px
}

// Organisms: 32px (space-8)
.header, .footer {
  padding: 32px 0; // Vertical 32px ALWAYS
}

// Sections: 64px mobile, 96px desktop
.section {
  padding: 64px 0; // Mobile ALWAYS 64px
  @media (min-width: 992px) {
    padding: 96px 0; // Desktop ALWAYS 96px
  }
}
```

**Component Gaps (ALWAYS follow scale):**
```scss
// Atom to atom: 8px (space-2)
.btn-group > .btn + .btn { margin-left: 8px; }

// Molecule elements: 16px (space-4)
.card > * + * { margin-top: 16px; }

// Cards in grid: 24px (space-6)
.grid { gap: 24px; }

// Sections: 96px desktop, 64px mobile
.section + .section { margin-top: 96px; }
```

**FORBIDDEN:** Using spacing values outside defined scale
(1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20) × 4px base

### 1.4 Elevation System (shadows = depth hierarchy)

**7 Levels, Strict Transition Rules:**
```scss
// At rest: xs or sm only
.card { box-shadow: $shadow-sm; }

// On hover: +1 level ONLY (xs→sm, sm→md, md→lg)
.card:hover { box-shadow: $shadow-md; } // sm+1

// CTAs: warm-md on hover (ALL buttons)
.btn-primary:hover, .btn-secondary:hover {
  box-shadow: $shadow-warm-md; // Special CTA shadow
}

// NEVER skip levels (can't go xs→lg)
```

### 1.5 Border Radius System (organic warmth)

**4 Levels, Strict Component Type Mapping:**
```scss
// sm (8px): Inputs, small buttons, badges
.input, .btn-sm, .badge { border-radius: 8px; }

// md (12px): Standard buttons, cards
.btn, .card { border-radius: 12px; }

// lg (16px): Hero cards, feature blocks
.card-hero, .feature-block { border-radius: 16px; }

// xl (24px): Section backgrounds
.section-bg { border-radius: 24px; }
```

**RULE:** ALL components of same type use SAME radius
(all buttons = 12px, all cards = 12px, NO exceptions)

### 1.6 Motion System (3-tier consistency)

**Level 1 - Subtle (links, nav items):**
```scss
a, .nav-link {
  transition: color 200ms ease-out;
  &:hover { color: $emerald-500; }
}
```

**Level 2 - Medium (cards, form fields):**
```scss
.card {
  transition: all 300ms ease-in-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md; // +1 level
  }
}
```

**Level 3 - Strong (buttons, CTAs):**
```scss
.btn {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: $shadow-warm-md;
  }
}
```

**RULE:** ALL components in same category use SAME interaction level

---

## Phase 2: Design Token Architecture (Week 2)

### 2.1 Create `_design-tokens.scss` (Master Source of Truth)

**File Structure:**
```scss
// ==================================
// DESIGN TOKENS - SINGLE SOURCE OF TRUTH
// ==================================

// 1. COLOR TOKENS
$emerald-500: #4DB380;
$terracotta-500: #CC6B49;
// ... 8-color palette with 9-step scales

// 2. SEMANTIC COLOR MAPPINGS (Enforced Usage)
$color-primary: $emerald-500;
$color-secondary: $terracotta-500;
$color-success: $sage-500;
$color-warning: $amber-500;
// ...

// 3. TYPOGRAPHY TOKENS
$font-heading: 'Poppins', sans-serif;
$font-body: 'Open Sans', sans-serif;
$font-weight-heading: 500; // ONLY 500 or 600
$font-weight-body: 400; // ONLY 400

// 4. SPACING TOKENS (8px base grid)
$space-1: 4px;
$space-2: 8px;
// ... up to $space-20

// 5. SHADOW TOKENS
$shadow-xs: ...;
$shadow-sm: ...;
// ... 7 elevation levels

// 6. RADIUS TOKENS
$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-xl: 24px;

// 7. MOTION TOKENS
$duration-fast: 200ms;
$duration-base: 300ms;
$easing-subtle: ease-out;
$easing-medium: ease-in-out;
$easing-strong: cubic-bezier(0.4, 0, 0.2, 1);
```

### 2.2 Component Token Mapping Table

| Component Type | Padding | Radius | Shadow (rest) | Shadow (hover) | Motion |
|----------------|---------|--------|---------------|----------------|--------|
| Button | space-3, space-8 | md (12px) | sm | warm-md | Level 3 |
| Card | space-4 | md (12px) | sm | md | Level 2 |
| Input | space-3 | sm (8px) | xs | sm | Level 2 |
| Nav Link | space-2, space-4 | none | none | none | Level 1 |
| Section | space-16/24 | xl (24px) | none | none | none |

### 2.3 Audit All 62 Components

**Spreadsheet Format:**
| Component | Type | Hardcoded Values | Token Replacements | Status |
|-----------|------|------------------|---------------------|--------|
| button.html | Atom | `padding: 12px 32px` | `$space-3 $space-8` | To Fix |
| card.html | Molecule | `border-radius: 12px` | `$radius-md` | To Fix |
| ... | ... | ... | ... | ... |

**Priority Order:**
1. Atoms (5) - Week 3
2. Molecules (20) - Weeks 4-5
3. Organisms (2) - Week 6
4. Sections (34) - Weeks 7-9

---

## Phase 3-7: Component Coherence (Weeks 3-10)

### Phase 3: Atomic Foundation (Week 3)

**For EACH of 5 atoms:**
1. Audit current implementation
2. Replace ALL hardcoded values with tokens
3. Ensure strict adherence to tier rules
4. Test variants (sizes, colors, states)
5. Document props API with token references

**Example: button.html**
```html
<!-- BEFORE (hardcoded) -->
<a href="{{ .url }}" class="btn" style="padding: 12px 32px; border-radius: 12px;">

<!-- AFTER (token-driven) -->
<a href="{{ .url }}" class="btn btn-{{ .variant }} btn-{{ .size }}">
```

```scss
// SCSS using tokens
.btn {
  padding: $space-3 $space-8; // Atom tier
  border-radius: $radius-md; // ALL buttons
  font-family: $font-body;
  font-weight: 500; // Consistent weight
  transition: all $duration-base $easing-strong; // Level 3

  &:hover {
    transform: translateY(-4px) scale(1.02); // Level 3
    box-shadow: $shadow-warm-md; // ALL CTA hovers
  }

  &:focus-visible {
    outline: 2px solid $emerald-500; // ALL focus states
    outline-offset: 2px;
  }

  &:disabled {
    background: $gray-400; // ALL disabled
    opacity: 0.5;
  }
}

.btn-primary {
  background: $color-primary; // Token, not hex
  &:hover { background: lighten($color-primary, 10%); }
}
```

### Phase 4: Molecular Composition (Weeks 4-5)

**CRITICAL RULE:** Molecules MUST ONLY use atoms + tokens
- NO new spacing values (use molecule tier: space-4)
- NO new colors (compose from atom variants)
- NO new motion (inherit from atom interactions)
- NO new typography (use heading + body atoms)

**For EACH of 20 molecules:**
1. Identify atom dependencies
2. Replace custom HTML with atom partials
3. Verify token usage only
4. Test compositional purity
5. Document molecular coherence

**Example: card.html**
```html
<!-- BEFORE (custom HTML) -->
<div class="card">
  <h4 style="color: #4DB380;">{{ .title }}</h4>
  <p>{{ .content }}</p>
  <a href="{{ .url }}" class="btn btn-primary">{{ .cta }}</a>
</div>

<!-- AFTER (composed from atoms) -->
<div class="card">
  {{ partial "atoms/heading.html" (dict "level" "h4" "text" .title) }}
  <p>{{ .content }}</p>
  {{ partial "atoms/button.html" (dict "text" .cta "url" .url "variant" "primary") }}
</div>
```

```scss
// Card molecule uses token tier
.card {
  padding: $space-4; // Molecule tier ALWAYS
  border-radius: $radius-md; // Consistent with buttons
  box-shadow: $shadow-sm;
  transition: all $duration-base $easing-medium; // Level 2

  &:hover {
    transform: translateY(-2px); // Level 2
    box-shadow: $shadow-md; // +1 elevation
  }

  > * + * {
    margin-top: $space-4; // Molecule gap ALWAYS
  }
}
```

### Phase 5-7: Organisms + Sections (Weeks 6-9)

**Same process for all 36 remaining components:**
1. Replace hardcoded values with tokens
2. Ensure compositional purity (atoms → molecules → organisms → sections)
3. Verify tier adherence (spacing, shadows, motion)
4. Test coherence (do all components feel like same family?)
5. Document token usage

---

## Phase 8: System-Wide Coherence Validation (Week 10)

### 8.1 Automated Token Compliance Checks

```bash
# Check for hardcoded colors (MUST be zero outside _design-tokens.scss)
rg '#[0-9a-fA-F]{3,6}' themes/andromeda-hugo/layouts/ --type html

# Check for hardcoded px spacing
rg 'padding:\s*\d+px|margin:\s*\d+px' themes/andromeda-hugo/assets/scss/ --type scss

# Check for hardcoded transition values
rg 'transition:\s*\d+ms' themes/andromeda-hugo/assets/scss/ --type scss
```

### 8.2 Visual Coherence Testing

**Page-by-page walkthrough:**
- [ ] Do all buttons look/behave identically across pages?
- [ ] Do all cards share same shadow/radius/padding across sections?
- [ ] Do all headings follow same color/weight/scale across content?
- [ ] Do all hover states use same motion tier within category?
- [ ] Do all forms use same field styling across contact/signup?

### 8.3 Multilingual Coherence (RO + EN)

**Test EVERY page in both languages:**
- [ ] Typography scales work with Romanian diacritics (ă, â, î, ș, ț)
- [ ] Spacing accommodates longer translated text
- [ ] All components use same design tokens regardless of language
- [ ] Visual hierarchy maintained across translations

### 8.4 Responsive Coherence (375px → 1920px)

**Test all breakpoints:**
- [ ] Mobile (375px): Touch targets 44px, token spacing scales down gracefully
- [ ] Tablet (768px): Layout transitions use token breakpoints
- [ ] Desktop (1200px): Optimal reading width maintained
- [ ] Large (1920px): No token values break down

### 8.5 Accessibility Coherence

**ALL interactive elements:**
- [ ] Focus ring: emerald-500, 2px offset (WCAG 2.1 AA)
- [ ] Text contrast: 4.5:1 minimum (WCAG AA)
- [ ] Touch targets: 44px minimum (WCAG AAA)
- [ ] Forms: ARIA labels, error associations
- [ ] Images: Alt text, lazy loading

### 8.6 Performance Coherence

**Ensure token system doesn't degrade performance:**
- [ ] Build time: <3s (token processing overhead minimal)
- [ ] Page weight: <520KB (CSS tokens compile efficiently)
- [ ] Animation FPS: 60fps (GPU-accelerated transforms only)
- [ ] CSS bundle: <50KB gzipped (tokens enable tree-shaking)

---

## Success Criteria (ALL Must Pass)

### Coherence Metrics (PRIMARY)
- ✅ Zero hardcoded colors (except in `_design-tokens.scss`)
- ✅ Zero hardcoded spacing (except in token definitions)
- ✅ All buttons: Same radius, same motion, same shadows
- ✅ All cards: Same padding, same radius, same hover behavior
- ✅ All headings: Same color logic, same weights, same scale
- ✅ All forms: Same field styling, same validation states
- ✅ All sections: Same vertical rhythm, same title hierarchy
- ✅ 100% WCAG AA compliance
- ✅ 100% responsive (375px-1920px)
- ✅ 100% multilingual (RO + EN identical visual quality)

### Technical Metrics (SECONDARY)
- ✅ Build time <3s
- ✅ Page weight <520KB
- ✅ CSS bundle <50KB gzipped
- ✅ Animation 60fps

### Design Metrics (PRIMARY)
- ✅ Warm professional personality (consistent across all 62 components)
- ✅ Visual family resemblance (all components feel related)
- ✅ Clear hierarchy (primary/secondary/tertiary always clear)
- ✅ Rhythmic spacing (no jarring gaps or cramped sections)

---

## Key Deliverables

1. **`_design-tokens.scss`** - Single source of truth (~500 lines)
2. **5 Atoms** - 100% token-compliant
3. **20 Molecules** - Composed from atoms, zero custom values
4. **2 Organisms** - Perfect composition from molecules
5. **34 Sections** - All aligned to design system
6. **`DESIGN-SYSTEM.md`** - Complete coherence documentation
7. **Component showcase page** - Visual reference of coherent system
8. **Token compliance report** - Before/after audit

---

## Implementation Strategy

**Week-by-Week:**
- **Week 1:** Define design language (colors, typography, spacing, shadows, radius, motion)
- **Week 2:** Create `_design-tokens.scss` + audit all 62 components
- **Week 3:** Atoms (5) → 100% token compliance
- **Week 4:** Molecules 1-10 → compositional purity
- **Week 5:** Molecules 11-20 → compositional purity
- **Week 6:** Organisms (2) → perfect composition
- **Week 7:** Sections 1-12 → alignment
- **Week 8:** Sections 13-24 → alignment
- **Week 9:** Sections 25-34 → alignment
- **Week 10:** System-wide validation + documentation

**Timeline:** 10 weeks
**Philosophy:** Coherence through systematic token usage, compositional purity, strict design rules

---

## Continuity for Next Session

**To Resume:**
1. Read this plan (DESIGN-COHERENCE-PLAN.md)
2. Read context (DESIGN-COHERENCE-CONTEXT.md)
3. Read tasks (DESIGN-COHERENCE-TASKS.md)
4. Start Week 1 or continue from current checkpoint

**Recovery Command:**
> "Continue working on hugo design coherence implementation"

**Expected Recovery Time:** <2 minutes to full context restoration
