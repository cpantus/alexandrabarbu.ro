# Andromeda Hugo Theme - ITCSS Architecture Guide

**Version**: 5.0.0 - ITCSS + BEM Production
**Updated**: 2025-11-19
**Status**: Production Ready ✅

---

## Overview

The Andromeda theme uses **ITCSS (Inverted Triangle CSS)** architecture with **BEM (Block Element Modifier)** naming conventions to provide a scalable, maintainable, and conflict-free styling system.

### What Problem Does This Solve?

**Before ITCSS:**
- Specificity wars (163 `!important` declarations)
- Token duplication (colors defined in 3 places)
- Component conflicts (`.card` vs `.value-card`)
- Fragile cascade (required "nuclear border reset")
- No component isolation

**After ITCSS:**
- Natural specificity hierarchy (no `!important` needed)
- Single source of truth (design tokens)
- BEM component isolation (no conflicts)
- Predictable cascade (no reset hacks)
- Portable components

---

## ITCSS Layer Structure

The architecture follows 6 layers (imported in strict order):

```
assets/scss/
├── 01-settings/          # Design tokens (variables only, no CSS output)
├── 02-tools/             # Mixins & functions (no CSS output)
├── 03-generic/           # CSS resets, normalize
├── 04-elements/          # (Currently unused - for base HTML element styles)
├── 05-objects/           # Layout primitives (.o-*)
└── 06-components/        # UI components (.c-*)
```

### Layer 1: Settings (Design Tokens)

**Purpose**: Single source of truth for all design values
**Output**: No CSS (Sass variables only)

```scss
01-settings/
├── _settings.scss              # Import aggregator
├── _tokens-colors.scss         # 8 color palettes (192 lines)
├── _tokens-typography.scss     # Fonts, sizes, weights (89 lines)
├── _tokens-spacing.scss        # Margins, padding, containers (62 lines)
├── _tokens-shadows.scss        # Box shadows (46 lines)
├── _tokens-motion.scss         # Transitions, animations (67 lines)
├── _tokens-gradients.scss      # Gradient definitions (91 lines)
└── _tokens-components.scss     # Component-specific tokens (78 lines)
```

**Key Tokens:**
- Colors: `$primary`, `$secondary`, `$gray-*`, `$emerald-*`, `$terracotta-*`
- Typography: `$font-primary`, `$font-secondary`, `$font-size-*`, `$weight-*`
- Spacing: `$spacing-*`, `$container-max-width`, `$breakpoint-*`
- Shadows: `$shadow-sm`, `$shadow-md`, `$shadow-lg`
- Motion: `$transition-base`, `$duration-*`, `$ease-*`
- Gradients: `$gradient-primary`, `$gradient-warm`, `$gradient-glass-*`

**Rule**: NEVER hardcode values. Always use tokens.

### Layer 2: Tools (Mixins & Functions)

**Purpose**: Reusable code patterns
**Output**: No CSS (only when called)

```scss
02-tools/
├── _tools.scss                 # Import aggregator
├── _functions-colors.scss      # Color palette functions (170 lines)
├── _mixins-card.scss           # Card component patterns
├── _mixins-icon.scss           # Icon circle patterns
└── _mixins-glassmorphism.scss  # Glassmorphism effects
```

**Key Mixins:**
- `@mixin card-v4($variant)` - Card with glassmorphism
- `@mixin icon-circle($size, $gradient)` - Gradient icon circle
- `@mixin glassmorphism($blur, $opacity)` - Glass effect
- `@mixin organic-blob($variant)` - Blob border radius

**Usage:**
```scss
.c-my-card {
  @include card-v4('primary');
}
```

### Layer 3: Generic (Resets)

**Purpose**: Normalize browser defaults
**Output**: Element selectors only

```scss
03-generic/
├── _generic.scss               # Import aggregator
└── _custom-properties.scss     # CSS variables for runtime
```

**Contains**: CSS custom properties for dynamic theming (if needed).

### Layer 4: Elements (Base HTML)

**Purpose**: Unstyled HTML element defaults (currently unused)

### Layer 5: Objects (Layout Primitives)

**Purpose**: Structure/layout patterns (OOCSS)
**Naming**: `.o-*` prefix

```scss
05-objects/
├── _objects.scss               # Import aggregator
├── _layout-container.scss      # .o-container, .o-container--fluid
├── _layout-grid.scss           # .o-grid--2col, --3col, --4col
├── _layout-flex.scss           # .o-flex with modifiers
└── _layout-stack.scss          # .o-stack (vertical spacing)
```

**Example:**
```html
<div class="o-container">
  <div class="o-grid--3col">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>
```

### Layer 6: Components (UI Components)

**Purpose**: Reusable UI components
**Naming**: `.c-*` prefix (BEM)

```scss
06-components/
├── _components.scss            # Import aggregator
├── _TEMPLATE.scss              # Component template
├── _card.scss                  # .c-card (573 lines)
├── _button.scss                # .c-button (329 lines)
├── _icon.scss                  # .c-icon (380 lines)
├── _badge.scss                 # .c-badge (300 lines)
├── _form.scss                  # .c-form (532 lines)
├── _hero-breadcrumb.scss       # .c-hero-breadcrumb (341 lines)
├── _testimonials.scss          # .c-testimonials (479 lines)
├── _faq.scss                   # .c-faq (481 lines)
├── _video-popup.scss           # .c-video (274 lines)
├── _blog-grid.scss             # .c-blog-grid (448 lines)
├── _newsletter.scss            # .c-newsletter (371 lines)
├── _privacy-guarantee.scss     # .c-privacy-guarantee (338 lines)
├── _values-intro.scss          # .c-values-intro (285 lines)
├── _signup-form.scss           # .c-signup-form (382 lines)
├── _problem-empathy.scss       # .c-problem-empathy (440 lines)
├── _credentials.scss           # .c-credentials (250 lines)
├── _values-compass.scss        # .c-values-compass (604 lines)
├── _stats.scss                 # .c-stats (438 lines)
├── _feature-blocks.scss        # .c-feature-blocks (488 lines)
└── _pricing.scss               # .c-pricing (570 lines)
```

**Total**: 20 components, ~9,850 lines of BEM code

---

## BEM Naming Convention

### Structure

```
.c-block__element--modifier
│   │      │         │
│   │      │         └─ Variant/state (optional)
│   │      └─────────── Child element (optional)
│   └────────────────── Component type (c- prefix)
└────────────────────── Component name
```

### Examples

```scss
// Block
.c-card { }

// Elements
.c-card__header { }
.c-card__title { }
.c-card__content { }
.c-card__footer { }

// Modifiers
.c-card--primary { }
.c-card--secondary { }
.c-card--featured { }

// Combined
.c-card--primary .c-card__title { }
```

### Rules

1. **Block**: Component name (`.c-testimonial`, `.c-pricing`)
2. **Element**: Child component (`__header`, `__title`, `__icon`)
3. **Modifier**: Variant or state (`--primary`, `--large`, `--active`)
4. **No nesting**: `.c-card__header__title` ❌ → `.c-card__title` ✅
5. **Prefix required**: All components use `.c-*` prefix

---

## Creating New Components

### Step 1: Copy Template

```bash
cp assets/scss/06-components/_TEMPLATE.scss assets/scss/06-components/_my-component.scss
```

### Step 2: Update Component Name

Replace all instances of "example" with your component name:

```scss
// Before
.c-example { }
.c-example__header { }
.c-example--primary { }

// After
.c-my-component { }
.c-my-component__header { }
.c-my-component--primary { }
```

### Step 3: Use Design Tokens

```scss
.c-my-component {
  // ✅ Good - uses tokens
  padding: $spacing-lg;
  color: $primary;
  font-size: $font-size-xl;
  transition: $transition-base;

  // ❌ Bad - hardcoded values
  padding: 32px;
  color: #4DB380;
  font-size: 24px;
  transition: all 0.3s ease;
}
```

### Step 4: Import in Aggregator

```scss
// 06-components/_components.scss
@import 'my-component';
```

### Step 5: Add Legacy Compatibility (if needed)

```scss
// Map old class names to new BEM classes
.old-component-class {
  @extend .c-my-component;
}
```

---

## Design Token Reference

### Colors

```scss
// Primary palette
$primary: #4DB380;          // Emerald
$secondary: #CC6B49;        // Terracotta

// Gray scale
$white: #FFFFFF;
$gray-50: #F9FAFB;
$gray-100: #F3F4F6;
$gray-200: #E5E7EB;
$gray-300: #D1D5DB;
$gray-600: #4B5563;
$gray-900: #111827;
$black: #000000;

// Extended palettes (emerald, terracotta, teal, coral, plum, sage, amber, blue)
// Each with: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
```

### Typography

```scss
// Fonts
$font-primary: 'Poppins', sans-serif;     // Headings
$font-secondary: 'Open Sans', sans-serif;  // Body

// Sizes
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px

// Weights
$weight-light: 300;
$weight-normal: 400;
$weight-medium: 500;
$weight-semibold: 600;
$weight-bold: 700;
$weight-extrabold: 800;
```

### Spacing

```scss
$spacing-xs: 0.25rem;   // 4px
$spacing-sm: 0.5rem;    // 8px
$spacing-md: 1rem;      // 16px
$spacing-lg: 1.5rem;    // 24px
$spacing-xl: 2rem;      // 32px
$spacing-2xl: 3rem;     // 48px
$spacing-3xl: 4rem;     // 64px

// Container
$container-max-width: 1200px;

// Breakpoints
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

### Shadows

```scss
$shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Motion

```scss
// Durations
$duration-instant: 150ms;
$duration-normal: 300ms;
$duration-slow: 500ms;

// Easing
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$ease-out: cubic-bezier(0, 0, 0.2, 1);
$ease-in: cubic-bezier(0.4, 0, 1, 1);

// Composite
$transition-base: all 0.3s ease-in-out;
$transition-fast: all 0.15s ease-out;
$transition-slow: all 0.5s ease-in-out;
```

---

## Best Practices

### 1. Component Isolation

```scss
// ✅ Good - BEM isolation
.c-card {
  padding: $spacing-md;
}

.c-card__title {
  font-size: $font-size-xl;
}

// ❌ Bad - No isolation
.card {
  padding: $spacing-md;
}

.card .title {
  font-size: $font-size-xl;
}
```

### 2. Token Usage

```scss
// ✅ Good - Token-based
.c-button {
  background: $primary;
  padding: $spacing-sm $spacing-md;
  border-radius: $border-radius-md;
  transition: $transition-base;
}

// ❌ Bad - Hardcoded
.c-button {
  background: #4DB380;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
```

### 3. Mobile-First Responsive

```scss
// ✅ Good - Mobile-first
.c-grid {
  display: grid;
  grid-template-columns: 1fr;  // Mobile: 1 column
  gap: $spacing-md;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);  // Tablet: 2 columns
  }

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(3, 1fr);  // Desktop: 3 columns
  }
}
```

### 4. Avoid Deep Nesting

```scss
// ✅ Good - Flat structure
.c-nav { }
.c-nav__list { }
.c-nav__item { }
.c-nav__link { }

// ❌ Bad - Deep nesting
.c-nav {
  .list {
    .item {
      .link { }
    }
  }
}
```

### 5. Use Mixins for Patterns

```scss
// ✅ Good - Reusable mixin
.c-card {
  @include card-v4('primary');
}

.c-testimonial {
  @include card-v4('secondary');
}

// ❌ Bad - Duplicate code
.c-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  // ... 20 more lines
}

.c-testimonial {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  // ... 20 more lines (duplicated)
}
```

### 6. CSS Specificity Over !important

```scss
// ✅ Good - BEM class specificity naturally overrides element selectors
.c-navigation__dropdown-link {
  text-decoration: none;  // BEM class > element selector (a)
}

.c-navigation__dropdown-link--active {
  color: $primary;
}

// ❌ Bad - !important battles
.c-navigation__dropdown-link {
  text-decoration: none !important;  // Fragile
}

.c-navigation__dropdown-link--active {
  color: $primary !important;  // Cascade broken
}
```

**Rules:**
- BEM classes (`.c-component__element`) have higher specificity than element selectors (`a`, `p`)
- NEVER use `!important` to fight global styles - refactor specificity instead
- Only use `!important` for: accessibility overrides, third-party CSS overrides, utility classes
- If styles aren't applying: check specificity, don't add `!important`

### 7. Debug Mode for JavaScript

```javascript
// ✅ Good - Production-ready
const DEBUG = false;  // Toggle for development

if (DEBUG) console.log('Debugging info');
if (DEBUG) console.warn('Warning');

// ❌ Bad - Console spam in production
console.log('Debugging info');  // Always runs
console.warn('Warning');  // Always runs
```

**Rules:**
- Wrap all console statements in `if (DEBUG)` checks
- Set `DEBUG = false` before committing
- Exception: Critical errors can use `console.error()` directly

---

## Legacy Compatibility

All new BEM components include `@extend` directives to maintain backward compatibility with old class names:

```scss
// New BEM component
.c-testimonial { }
.c-testimonial__quote { }
.c-testimonial--featured { }

// Legacy compatibility
.testimonial-card {
  @extend .c-testimonial;
}

.testimonial-quote {
  @extend .c-testimonial__quote;
}

.testimonial-featured {
  @extend .c-testimonial--featured;
}
```

**This means**: Existing HTML templates continue to work without changes, while new components use BEM naming.

---

## Troubleshooting

### Build Errors

**Error**: "Undefined variable: $primary"
**Fix**: Import `01-settings/_settings.scss` before using tokens

**Error**: "Undefined mixin: card-v4"
**Fix**: Import `02-tools/_tools.scss` before using mixins

### Specificity Issues

**Problem**: Styles not applying
**Check**:
1. Is component imported in `06-components/_components.scss`?
2. Is import order correct in `main-new.scss`?
3. Are you using BEM naming (`.c-*` prefix)?

### Token Not Found

**Problem**: "Undefined variable: $spacing-custom"
**Fix**: Check `01-settings/` for available tokens, or add new token if needed

---

## Performance

**Build Time**: ~37.5 seconds (99 pages, 207 images)
**CSS Output**: ~520KB uncompressed
**Components**: 20 BEM components (9,850 lines)
**Optimization**: Hugo minification + fingerprinting enabled

---

## Migration from Legacy

The ITCSS architecture is **already deployed** and active. Legacy `custom.scss` has been replaced with `main-new.scss`.

**Entry point**: `assets/scss/style.scss` → imports `main-new.scss`

All existing HTML templates work via `@extend` compatibility layer.

---

## Resources

- **Component Template**: `assets/scss/06-components/_TEMPLATE.scss`
- **Token Reference**: This file (ARCHITECTURE.md)
- **Project Overview**: `PROJECT.md`
- **Quick Start**: `README.md`
- **User Guide**: `CLAUDE.md`

---

**Status**: Production Ready ✅ | 20 components | 6 ITCSS layers | BEM naming | Token-based | Legacy compatible

**Version**: 5.0.0 | **Updated**: 2025-11-19
