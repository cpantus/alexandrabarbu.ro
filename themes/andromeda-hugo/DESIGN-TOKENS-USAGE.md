# Design Tokens Usage Guide

**Version:** 1.0.0
**Last Updated:** 2025-11-17
**Part of:** Hugo Design Coherence Initiative

---

## Purpose

This document defines MANDATORY token usage rules for all components in the Andromeda Hugo theme.
NO component should use hardcoded values - all styling MUST come from design tokens.

**Source of Truth:** `/themes/andromeda-hugo/assets/scss/_design-tokens.scss`

---

## Component Token Mapping

### Component Type Reference

| Component Type | Padding (Internal) | Border Radius | Shadow (Rest) | Shadow (Hover) | Motion Level | Example Usage |
|----------------|-------------------|---------------|---------------|----------------|--------------|---------------|
| **Atoms** | | | | | | |
| Button | `$space-3 $space-8` (12px 32px) | `$radius-md` (12px) | none | `$shadow-warm-md` | Level 3 (strong) | Primary/secondary/tertiary CTAs |
| Button Small | `$space-2 $space-4` (8px 16px) | `$radius-sm` (8px) | none | `$shadow-warm-sm` | Level 3 (strong) | Compact actions, mobile |
| Input | `$space-3` (12px) | `$radius-sm` (8px) | `$shadow-xs` | `$shadow-sm` | Level 2 (medium) | Text inputs, textareas, selects |
| Badge | `$space-1 $space-2` (4px 8px) | `$radius-sm` (8px) | none | none | Level 1 (subtle) | Status indicators, tags |
| Icon (circular bg) | `$space-3` (12px) | `50%` (full circle) | `$shadow-sm` | `$shadow-md` | Level 2 (medium) | Feature icons with backgrounds |
| **Molecules** | | | | | | |
| Card | `$space-4` (16px) | `$radius-md` (12px) | `$shadow-sm` | `$shadow-md` | Level 2 (medium) | Feature cards, pricing cards |
| Card Hero | `$space-6` (24px) | `$radius-lg` (16px) | `$shadow-md` | `$shadow-lg` | Level 2 (medium) | Hero section cards, emphasis |
| Form Field | `$space-4` (16px) container | Uses `input` atom | `$shadow-xs` | `$shadow-sm` | Level 2 (medium) | Label + input + error wrapper |
| Accordion Item | `$space-4` (16px) | `$radius-md` (12px) | `$shadow-sm` | `$shadow-md` | Level 2 (medium) | FAQ items, collapsible content |
| Nav Item | `$space-2 $space-4` (8px 16px) | `$radius-sm` (8px) | none | `$shadow-sm` | Level 1 (subtle) | Header navigation links |
| Breadcrumb Item | `$space-1 $space-2` (4px 8px) | `$radius-sm` (8px) | none | none | Level 1 (subtle) | Breadcrumb navigation |
| Timeline Step | `$space-4` (16px) | `$radius-md` (12px) | `$shadow-sm` | `$shadow-md` | Level 2 (medium) | Process steps, onboarding |
| Stat Card | `$space-4` (16px) | `$radius-md` (12px) | `$shadow-sm` | `$shadow-md` | Level 2 (medium) | Number statistics, metrics |
| Blog Card | `$space-4` (16px) | `$radius-md` (12px) | `$shadow-sm` | `$shadow-md` | Level 2 (medium) | Blog post previews |
| Credential Badge | `$space-3` (12px) | `$radius-md` (12px) | `$shadow-sm` | `$shadow-md` | Level 2 (medium) | Professional certifications |
| Pricing Toggle | `$space-2 $space-4` (8px 16px) | `$radius-md` (12px) | none | `$shadow-sm` | Level 2 (medium) | Monthly/yearly pricing switch |
| Social Link | `$space-2` (8px) | `50%` (circular) | `$shadow-xs` | `$shadow-sm` | Level 1 (subtle) | Social media icons |
| Video Embed | `$space-0` (0px) | `$radius-lg` (16px) | `$shadow-md` | `$shadow-lg` | none | YouTube/Vimeo embeds |
| **Organisms** | | | | | | |
| Header | `$space-8 0` (32px vertical) | none | none (sticky: `$shadow-md`) | none | Level 1 (subtle) | Site header navigation |
| Footer | `$space-16 0` (64px vertical) | none | none | none | none | Site footer |
| **Sections** | | | | | | |
| Section (mobile) | `$space-16 0` (64px vertical) | `$radius-xl` (24px) if bg | none | none | none | All page sections (mobile) |
| Section (desktop) | `$space-24 0` (96px vertical) | `$radius-xl` (24px) if bg | none | none | none | All page sections (desktop ≥992px) |

---

## Spacing Rules by Component Tier

### Tier 1: Atoms (Smallest Padding)
**Rule:** `$space-3` (12px) vertical padding is STANDARD for atoms
- **Buttons:** `padding: $space-3 $space-8` (12px 32px)
- **Inputs:** `padding: $space-3` (12px)
- **Small buttons:** `padding: $space-2 $space-4` (8px 16px)
- **Badges:** `padding: $space-1 $space-2` (4px 8px)

### Tier 2: Molecules (Medium Padding)
**Rule:** `$space-4` (16px) is STANDARD for molecule containers
- **Cards:** `padding: $space-4` (16px)
- **Form fields:** `padding: $space-4` (16px) container
- **Nav items:** `padding: $space-2 $space-4` (8px 16px)
- **Timeline steps:** `padding: $space-4` (16px)

### Tier 3: Organisms (Large Padding)
**Rule:** `$space-8` (32px) vertical is STANDARD for organism containers
- **Header:** `padding: $space-8 0` (32px vertical)
- **Footer:** `padding: $space-16 0` (64px vertical - exception for emphasis)

### Tier 4: Sections (Largest Padding)
**Rule:** Responsive padding, generous vertical rhythm
- **Mobile:** `padding: $space-16 0` (64px vertical)
- **Desktop:** `padding: $space-24 0` (96px vertical, ≥992px breakpoint)

---

## Border Radius Rules by Component Type

### Small Radius (`$radius-sm` = 8px)
**Used for:** Compact, functional components
- Inputs, textareas, selects
- Small buttons
- Badges, tags
- Breadcrumb items
- Nav items

### Medium Radius (`$radius-md` = 12px)
**Used for:** Standard interactive components (MOST COMMON)
- Buttons (standard size)
- Cards (all variants: feature, pricing, testimonial, blog)
- Accordion items
- Timeline steps
- Stat cards
- Credential badges

### Large Radius (`$radius-lg` = 16px)
**Used for:** Emphasis components
- Hero cards
- Feature blocks
- Video embeds
- Image containers (via atom)

### Extra Large Radius (`$radius-xl` = 24px)
**Used for:** Section backgrounds ONLY
- Section containers with colored backgrounds
- Large hero backgrounds

### Full Circle (`50%`)
**Used for:** Circular icons/avatars
- Icon atoms with circular backgrounds
- Social media link buttons
- Avatar images

---

## Shadow Rules by Component Type

### Elevation Level 1: `$shadow-xs`
**Used for:** Resting state of form inputs
- Input atoms (rest)
- Select dropdowns (rest)

### Elevation Level 2: `$shadow-sm`
**Used for:** Resting state of cards and containers
- Cards (rest)
- Accordion items (rest)
- Timeline steps (rest)
- Stat cards (rest)
- Blog cards (rest)
- Credential badges (rest)
- Icon atoms with backgrounds (rest)

### Elevation Level 3: `$shadow-md`
**Used for:** Hover state of cards (+1 level from sm)
- Cards (hover)
- Accordion items (hover)
- Timeline steps (hover)
- Hero cards (rest - exception for emphasis)
- Sticky header (when scrolled)

### Elevation Level 4: `$shadow-lg`
**Used for:** Hover state of hero cards (+1 level from md)
- Hero cards (hover)
- Video embeds (hover)

### Special: `$shadow-warm-md`
**Used for:** CTA button hover states ONLY
- Primary button (hover)
- Secondary button (hover)
- All CTAs (hover)

### Special: `$shadow-featured`
**Used for:** Featured pricing tier ONLY
- Pricing card with `.featured` class

---

## Motion Rules by Component Type

### Level 1: Subtle (200ms ease-out)
**Used for:** Links and navigation
```scss
transition: color $duration-fast $easing-medium;
&:hover {
  color: $emerald-500;
  // NO transform, NO shadow
}
```
- Nav items
- Breadcrumb links
- Footer links
- Social links
- Text links

### Level 2: Medium (300ms ease-in-out)
**Used for:** Cards and form fields
```scss
transition: all $duration-base $easing-medium;
&:hover {
  transform: translateY(-2px);
  box-shadow: [+1 level from rest];
}
```
- Cards (all variants)
- Input atoms (focus)
- Accordion items
- Timeline steps
- Stat cards
- Blog cards
- Icon atoms with backgrounds

### Level 3: Strong (300ms cubic-bezier)
**Used for:** Buttons and CTAs
```scss
transition: all $duration-base $easing-strong;
&:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: $shadow-warm-md;
}
```
- Buttons (all variants)
- Primary CTAs
- Secondary CTAs

---

## Color Usage Rules

### Brand Colors (Emerald + Terracotta)
**ONLY for:** Primary and secondary brand CTAs
- ✅ Primary button → `$emerald-500` gradient
- ✅ Secondary button → `$terracotta-500` gradient
- ✅ Primary nav item (active) → `$emerald-500`
- ❌ NEVER use teal/amber/sage for brand CTAs
- ❌ NEVER use emerald/terracotta for semantic states

### Supporting Colors (Semantic Purpose ONLY)
**Teal** (`$teal-500`) - INFO states
- Info alerts, info badges, calm accents
- Contact info icons
- **NEVER:** Decorative buttons, random accents

**Amber** (`$amber-500`) - WARNING states
- Warning alerts, urgent notices
- Emergency banner
- **NEVER:** Decorative highlights

**Sage** (`$sage-500`) - SUCCESS states
- Success alerts, positive feedback
- Form validation success
- **NEVER:** Brand buttons

**Plum** (`$plum-600`) - PREMIUM features
- Privacy guarantee section
- Confidentiality notice
- Premium tier indicators
- **NEVER:** Regular content

**Coral** (`$coral-400`) - EMOTIONAL content
- Testimonials, emotional quotes
- Empathy sections
- **NEVER:** Technical content

**Navy** (`$navy-900`) - CONTRAST sections
- Footer background
- High-contrast sections
- **NEVER:** Light backgrounds

### Grayscale (Text + Borders)
**Text Hierarchy:**
- Headings: `var(--heading-color)` (gray-900 default, emerald-700 brand mode)
- Primary text: `$gray-700` (#374151)
- Secondary text: `$gray-600` (#4b5563)
- Muted text: `$gray-500` (#6b7280)

**Borders + Backgrounds:**
- Borders: `$gray-300` (#d1d5db)
- Disabled: `$gray-400` (#9ca3af)
- Backgrounds: `$gray-50` (#f9fafb), `$gray-100` (#f3f4f6)

---

## Typography Usage Rules

### Font Family
**Headings** (h1-h6, display-1, display-2):
```scss
font-family: $font-heading; // Poppins
```

**Body** (p, li, span):
```scss
font-family: $font-body; // Open Sans
```

### Font Weight
**Headings** (ONLY two weights allowed):
```scss
font-weight: $font-weight-heading; // 500 (medium) - STANDARD
font-weight: $font-weight-heading-bold; // 600 (semibold) - EXTRA EMPHASIS ONLY
```
❌ FORBIDDEN: 300 (light), 700 (bold), 800 (extrabold)

**Body** (ONLY one weight):
```scss
font-weight: 400; // Regular
```
Use `<strong>` or `<em>` sparingly for inline emphasis, NOT font-weight

### Font Size Scale
**Usage Mapping:**
| Token | Usage | Components |
|-------|-------|------------|
| `$text-7xl` | Hero page titles | `.display-1` class only |
| `$text-6xl` | Section headers | `.display-2` class only |
| `$text-5xl` | Page titles | `<h1>` tags |
| `$text-4xl` | Major sections | `<h2>` tags |
| `$text-3xl` | Subsections | `<h3>` tags |
| `$text-2xl` | Card titles | `<h4>` tags |
| `$text-xl` | List headers | `<h5>` tags |
| `$text-lg` | Small headings | `<h6>` tags |
| `$text-base` | All paragraphs | `<p>`, `<li>` |
| `$text-sm` | Captions, metadata | `.text-sm` class |
| `$text-xs` | Fine print | `.text-xs` class |

### Line Height
**Mapping:**
- Display/H1/H2: `line-height: $leading-tight` (1.25)
- H3/H4/H5: `line-height: $leading-snug` (1.375)
- Body (p, li): `line-height: $leading-normal` (1.5)
- Small/XS: `line-height: $leading-relaxed` (1.625)

---

## Focus States (Accessibility)

**ALL interactive components MUST have visible focus states:**
```scss
&:focus-visible {
  outline: 2px solid $emerald-500;
  outline-offset: 2px;
}
```

**Components requiring focus states:**
- ✅ Buttons (all variants)
- ✅ Inputs (all types)
- ✅ Links (nav, text, social)
- ✅ Accordion triggers
- ✅ Tab controls
- ✅ Form fields

---

## Disabled States

**ALL interactive components MUST have disabled states:**
```scss
&:disabled,
&.disabled {
  background: $gray-400;
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Components requiring disabled states:**
- ✅ Buttons
- ✅ Inputs
- ✅ Form fields

---

## Breakpoint-Specific Token Usage

### Mobile (<768px)
- Section padding: `$space-16 0` (64px vertical)
- Touch targets: Minimum 44px (44px × 44px)
- Font scale: Use `clamp()` for fluid typography

### Tablet (768px-991px)
- Section padding: `$space-16 0` (64px vertical)
- Touch targets: Minimum 44px

### Desktop (≥992px)
- Section padding: `$space-24 0` (96px vertical)
- Hover states: Fully enabled (translateY, shadows)
- Touch targets: Minimum 40px (mouse accuracy better)

---

## Component Gap Rules

### Internal Gaps (Within Components)
**Atoms:**
- Button group gap: `$space-2` (8px)

**Molecules:**
- Card content gap: `$space-4` (16px) between elements
- Form field gap: `$space-2` (8px) between label and input

**Sections:**
- Content gap: `$space-12` (48px) between major elements (title, subtitle, content grid)

### External Gaps (Between Components)
**Card Grids:**
- Gap: `$space-6` (24px)

**Section Spacing:**
- Margin: `$space-24` (96px) between sections

---

## Validation Checklist

Before committing any component, verify:
- [ ] NO hardcoded colors (use tokens from `_design-tokens.scss`)
- [ ] NO hardcoded spacing (use `$space-*` tokens)
- [ ] NO hardcoded shadows (use `$shadow-*` tokens)
- [ ] NO hardcoded radius (use `$radius-*` tokens)
- [ ] NO hardcoded transitions (use `$duration-*` and `$easing-*`)
- [ ] Font weights ONLY 500/600 (headings) or 400 (body)
- [ ] Focus states use `$emerald-500` outline
- [ ] Disabled states use `$gray-400` + 50% opacity
- [ ] Tier padding rules followed (atoms 12px, molecules 16px, etc.)
- [ ] Shadow transitions NEVER skip levels (xs→sm→md→lg)

---

## Examples

### Example 1: Button Atom (Correct Usage)
```scss
.btn {
  padding: $space-3 $space-8; // 12px 32px
  border-radius: $radius-md; // 12px
  font-family: $font-heading;
  font-weight: $font-weight-heading; // 500
  transition: all $duration-base $easing-strong; // 300ms cubic-bezier

  &:hover {
    transform: translateY(-4px) scale(1.02); // Level 3 motion
    box-shadow: $shadow-warm-md; // Special CTA shadow
  }

  &:focus-visible {
    outline: 2px solid $emerald-500;
    outline-offset: 2px;
  }

  &:disabled {
    background: $gray-400;
    opacity: 0.5;
  }
}
```

### Example 2: Card Molecule (Correct Usage)
```scss
.card {
  padding: $space-4; // 16px (molecule tier)
  border-radius: $radius-md; // 12px
  box-shadow: $shadow-sm; // Rest state
  transition: all $duration-base $easing-medium; // 300ms ease-in-out

  &:hover {
    transform: translateY(-2px); // Level 2 motion
    box-shadow: $shadow-md; // +1 level from sm
  }

  > * + * {
    margin-top: $space-4; // 16px gap between card elements
  }
}
```

### Example 3: Section (Correct Usage)
```scss
.section {
  padding: $space-16 0; // 64px vertical (mobile)

  @media (min-width: 992px) {
    padding: $space-24 0; // 96px vertical (desktop)
  }

  .section-title {
    color: var(--heading-color); // Uses CSS custom property
    font-family: $font-heading;
    font-weight: $font-weight-heading; // 500
    font-size: $text-4xl; // H2 size
    line-height: $leading-tight; // 1.25
    margin-bottom: $space-12; // 48px gap before content
  }
}
```

---

## Common Mistakes to Avoid

### ❌ Wrong: Hardcoded Values
```scss
.btn {
  padding: 12px 32px; // WRONG - use $space-3 $space-8
  border-radius: 12px; // WRONG - use $radius-md
  transition: 300ms; // WRONG - use $duration-base $easing-strong
}
```

### ❌ Wrong: Skipping Shadow Levels
```scss
.card {
  box-shadow: $shadow-xs; // Rest
  &:hover {
    box-shadow: $shadow-lg; // WRONG - skips sm and md
  }
}
```

### ❌ Wrong: Using Supporting Colors for Brand CTAs
```scss
.btn-primary {
  background: $teal-500; // WRONG - teal is for INFO states only
}
```

### ❌ Wrong: Arbitrary Font Weights
```scss
h1 {
  font-weight: 700; // WRONG - only 500 or 600 allowed
}
```

### ✅ Correct: Token-Based Styling
```scss
.btn {
  padding: $space-3 $space-8;
  border-radius: $radius-md;
  transition: all $duration-base $easing-strong;
  font-weight: $font-weight-heading; // 500
  background: $emerald-500; // Brand primary

  &:hover {
    box-shadow: $shadow-warm-md; // Special CTA shadow
  }
}
```

---

## Next Steps

1. ✅ Design tokens defined (`_design-tokens.scss`)
2. ✅ Token file imported (`_design-system.scss`)
3. ✅ Component token mapping documented (this file)
4. ⏭️ **Next:** Week 3 - Audit components for hardcoded values
5. ⏭️ **Next:** Week 3-9 - Refactor atoms → molecules → organisms → sections

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-17
**Part of:** Hugo Design Coherence Initiative (Week 2, Task 2.2.1)
