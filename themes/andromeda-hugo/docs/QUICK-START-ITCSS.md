# ITCSS Quick Start Guide

**For developers creating new components in the Andromeda theme**

---

## 5-Minute Component Creation

### Example: Creating a "Call-to-Action Banner" Component

#### Step 1: Copy Template (10 seconds)

```bash
cd themes/andromeda-hugo/assets/scss/06-components
cp _TEMPLATE.scss _cta-banner.scss
```

#### Step 2: Replace Component Name (30 seconds)

Open `_cta-banner.scss` and replace "example" with "cta-banner":

```scss
// Find and replace:
// .c-example → .c-cta-banner
// .c-example__ → .c-cta-banner__
// .c-example-- → .c-cta-banner--
```

#### Step 3: Define Your Component (2 minutes)

```scss
.c-cta-banner {
  position: relative;
  padding: $spacing-2xl $spacing-md;
  background: $gradient-warm;
  border-radius: $border-radius-lg;
  text-align: center;
  color: $white;

  @media (max-width: $breakpoint-md) {
    padding: $spacing-xl $spacing-md;
  }
}

.c-cta-banner__title {
  font-family: $font-primary;
  font-size: $font-size-3xl;
  font-weight: $weight-bold;
  margin-bottom: $spacing-md;

  @media (max-width: $breakpoint-md) {
    font-size: $font-size-2xl;
  }
}

.c-cta-banner__subtitle {
  font-size: $font-size-lg;
  margin-bottom: $spacing-lg;
  opacity: 0.9;
}

.c-cta-banner__button {
  // Reuse existing button component
  @extend .c-button;
  @extend .c-button--secondary;
}

// Modifiers
.c-cta-banner--compact {
  padding: $spacing-lg $spacing-md;
}

.c-cta-banner--centered {
  max-width: 800px;
  margin: 0 auto;
}

// Legacy compatibility
.cta-section {
  @extend .c-cta-banner;
}
```

#### Step 4: Import Component (30 seconds)

Add to `06-components/_components.scss`:

```scss
// CTA Components
@import 'cta-banner';
```

#### Step 5: Use in HTML (1 minute)

Create Hugo partial `layouts/partials/sections/cta-banner.html`:

```html
{{- $section := .Params.cta_banner -}}
{{- if $section -}}
<section class="c-cta-banner {{ if $section.compact }}c-cta-banner--compact{{ end }}">
  <div class="o-container">
    <h2 class="c-cta-banner__title">{{ $section.title }}</h2>
    {{- if $section.subtitle -}}
    <p class="c-cta-banner__subtitle">{{ $section.subtitle }}</p>
    {{- end -}}
    {{- if $section.button_text -}}
    <a href="{{ $section.button_url }}" class="c-cta-banner__button">
      {{ $section.button_text }}
    </a>
    {{- end -}}
  </div>
</section>
{{- end -}}
```

#### Step 6: Add to Page (30 seconds)

In your content markdown:

```yaml
---
title: "Services"
sections:
  - type: "cta-banner"

cta_banner:
  title: "Ready to Get Started?"
  subtitle: "Schedule your free consultation today"
  button_text: "Contact Us"
  button_url: "/contact"
  compact: false
---
```

#### Step 7: Build & Test (30 seconds)

```bash
cd themes/andromeda-hugo
hugo server --buildDrafts
# Visit http://localhost:1313
```

**Total Time: ~5 minutes** ✅

---

## Common Component Patterns

### Pattern 1: Grid Component

```scss
.c-services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.c-services-grid__item {
  @include card-v4('primary');
  padding: $spacing-lg;
}

.c-services-grid__icon {
  @include icon-circle($icon-circle-lg, $gradient-primary);
  margin-bottom: $spacing-md;
}
```

### Pattern 2: Hero Section

```scss
.c-hero-custom {
  position: relative;
  padding: $spacing-3xl 0;
  background: $gradient-warm;
  color: $white;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern.svg') repeat;
    opacity: 0.1;
  }
}

.c-hero-custom__content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.c-hero-custom__title {
  font-family: $font-primary;
  font-size: $font-size-4xl;
  font-weight: $weight-bold;
  margin-bottom: $spacing-lg;

  @media (max-width: $breakpoint-md) {
    font-size: $font-size-3xl;
  }
}
```

### Pattern 3: Card with Hover Effect

```scss
.c-feature-card {
  @include card-v4('primary');
  padding: $spacing-lg;
  transition: $transition-base;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: $shadow-xl;

    .c-feature-card__icon {
      transform: scale(1.1) rotate(5deg);
    }
  }
}

.c-feature-card__icon {
  @include icon-circle($icon-circle-lg, $gradient-primary);
  margin-bottom: $spacing-md;
  transition: $transition-base;
}

.c-feature-card__title {
  font-size: $font-size-xl;
  font-weight: $weight-semibold;
  color: $gray-900;
  margin-bottom: $spacing-sm;
}

.c-feature-card__description {
  font-size: $font-size-base;
  color: $gray-600;
  line-height: 1.6;
}
```

---

## Token Cheat Sheet

### Spacing (Use for padding, margin, gap)

```scss
$spacing-xs: 4px
$spacing-sm: 8px
$spacing-md: 16px    // Most common
$spacing-lg: 24px    // Section spacing
$spacing-xl: 32px
$spacing-2xl: 48px   // Large sections
$spacing-3xl: 64px   // Hero sections
```

### Colors (Brand)

```scss
$primary: #4DB380      // Emerald (trust, growth)
$secondary: #CC6B49    // Terracotta (warmth)
$white: #FFFFFF
$gray-50: #F9FAFB     // Very light background
$gray-100: #F3F4F6    // Light background
$gray-600: #4B5563    // Body text
$gray-900: #111827    // Headings
```

### Typography

```scss
// Sizes (most common)
$font-size-base: 1rem      // 16px - body text
$font-size-lg: 1.125rem    // 18px - large body
$font-size-xl: 1.25rem     // 20px - small headings
$font-size-2xl: 1.5rem     // 24px - section titles
$font-size-3xl: 1.875rem   // 30px - page titles
$font-size-4xl: 2.25rem    // 36px - hero titles

// Weights
$weight-normal: 400        // Body text
$weight-semibold: 600      // Emphasized
$weight-bold: 700          // Headings
```

### Shadows (Depth)

```scss
$shadow-sm: subtle         // Flat cards
$shadow-md: normal         // Elevated cards
$shadow-lg: prominent      // Modals, dropdowns
```

### Breakpoints

```scss
$breakpoint-sm: 576px      // Phone landscape
$breakpoint-md: 768px      // Tablet
$breakpoint-lg: 992px      // Desktop
$breakpoint-xl: 1200px     // Large desktop
```

---

## Mixin Cheat Sheet

### Card Mixin

```scss
@include card-v4('primary');   // Emerald gradient glow
@include card-v4('secondary'); // Terracotta gradient glow
@include card-v4('glass');     // Glassmorphism effect
```

### Icon Circle Mixin

```scss
@include icon-circle($icon-circle-sm, $gradient-primary);   // 32px
@include icon-circle($icon-circle-md, $gradient-secondary); // 48px
@include icon-circle($icon-circle-lg, $gradient-warm);      // 64px
@include icon-circle($icon-circle-xl, $gradient-primary);   // 84px
```

### Glassmorphism Mixin

```scss
@include glassmorphism(12px, 0.1);  // Standard glass
@include glassmorphism(20px, 0.05); // Light glass
@include glassmorphism(8px, 0.15);  // Strong glass
```

### Organic Blob Mixin

```scss
@include organic-blob('soft');     // 16px/24px
@include organic-blob('organic');  // 32px/48px
@include organic-blob('smooth');   // 24px/40px
@include organic-blob('gentle');   // 20px/32px
```

---

## Testing Checklist

Before committing your component:

- [ ] Component uses `.c-*` BEM prefix
- [ ] All values use design tokens (no hardcoded colors/spacing)
- [ ] Mobile-responsive (tested at 375px, 768px, 1200px)
- [ ] Legacy compatibility via `@extend` (if replacing old component)
- [ ] Imported in `06-components/_components.scss`
- [ ] Hugo partial created (if needed)
- [ ] Build succeeds: `hugo --gc --minify`
- [ ] No console errors in browser
- [ ] Accessibility: proper heading hierarchy, alt text, ARIA labels

---

## Troubleshooting

### "Undefined variable: $primary"

**Fix**: Make sure Settings layer is imported before your component:

```scss
// main-new.scss
@import '01-settings/settings';  // Must come first
@import '06-components/components';
```

### "Undefined mixin: card-v4"

**Fix**: Import Tools layer before using mixins:

```scss
// main-new.scss
@import '02-tools/tools';  // Must come before components
@import '06-components/components';
```

### Styles not applying

**Check**:
1. Component imported in `_components.scss`?
2. Using correct BEM class names (`.c-*` prefix)?
3. Hugo server restarted after adding new files?

### Build fails

```bash
# Clean build cache
cd themes/andromeda-hugo
rm -rf public resources .hugo_build.lock
hugo --buildDrafts --verbose
```

---

## Next Steps

- Read full `ARCHITECTURE.md` for detailed token reference
- Study existing components in `06-components/`
- Use `_TEMPLATE.scss` for new components
- Check `CLAUDE.md` for Hugo-specific guidelines

---

**Happy coding! The ITCSS architecture makes it easy to create scalable, maintainable components.** ✅
