# CLAUDE.md - ITCSS Architecture Addendum

**Version**: 5.0.0 - ITCSS + BEM Production
**Updated**: 2025-11-19
**Read this WITH**: CLAUDE.md (v4.0.0)

---

## 🎯 IMPORTANT: Architecture Update

The Andromeda theme now uses **ITCSS (Inverted Triangle CSS) + BEM** architecture for all styling. This provides:

- ✅ Modular, scalable CSS architecture
- ✅ No specificity wars (eliminated 163 `!important`)
- ✅ Component isolation via BEM naming
- ✅ Single source of truth (design tokens)
- ✅ 100% backward compatible with existing HTML

**This addendum supplements CLAUDE.md v4.0.0 with ITCSS-specific information.**

---

## Quick Reference: What Changed

### For Component Creation

**Old Way** (still works via legacy compatibility):
```html
<div class="card">
  <div class="card-header">Title</div>
</div>
```

**New Way** (recommended for new components):
```html
<div class="c-card">
  <div class="c-card__header">Title</div>
</div>
```

### For Styling (SCSS)

**Old Way**:
```scss
// Hardcoded values scattered across files
.my-component {
  padding: 24px;
  color: #4DB380;
}
```

**New Way**:
```scss
// Use design tokens from Settings layer
.c-my-component {
  padding: $spacing-lg;
  color: $primary;
}
```

---

## SCSS File Structure (ITCSS)

**Entry Point**: `assets/scss/style.scss` → imports `main-new.scss`

**Layer Structure** (import order matters!):
```
assets/scss/
├── style.scss                    # Entry point
├── main-new.scss                 # ITCSS orchestrator
├── 01-settings/                  # Design tokens (variables only)
│   ├── _tokens-colors.scss
│   ├── _tokens-typography.scss
│   ├── _tokens-spacing.scss
│   ├── _tokens-shadows.scss
│   ├── _tokens-motion.scss
│   ├── _tokens-gradients.scss
│   └── _tokens-components.scss
├── 02-tools/                     # Mixins & functions
│   ├── _mixins-card.scss
│   ├── _mixins-icon.scss
│   ├── _mixins-glassmorphism.scss
│   └── _functions-colors.scss
├── 03-generic/                   # Resets, normalize
├── 04-elements/                  # (unused)
├── 05-objects/                   # Layout primitives (.o-*)
│   ├── _layout-container.scss
│   ├── _layout-grid.scss
│   ├── _layout-flex.scss
│   └── _layout-stack.scss
└── 06-components/                # UI components (.c-*)
    ├── _TEMPLATE.scss            # Use this for new components!
    ├── _card.scss
    ├── _button.scss
    ├── _icon.scss
    ├── _badge.scss
    ├── _form.scss
    └── ... 15 more BEM components
```

---

## Creating New Components

### Step 1: Use the Template

```bash
cd assets/scss/06-components
cp _TEMPLATE.scss _my-component.scss
```

### Step 2: Follow BEM Naming

```scss
// Block
.c-my-component {
  padding: $spacing-lg;
}

// Elements (children)
.c-my-component__header { }
.c-my-component__title { }
.c-my-component__content { }

// Modifiers (variants)
.c-my-component--primary { }
.c-my-component--large { }
```

### Step 3: Use Design Tokens

```scss
// ✅ Good - uses tokens
.c-my-component {
  padding: $spacing-lg;           // Not 24px
  color: $primary;                // Not #4DB380
  font-size: $font-size-xl;       // Not 20px
  transition: $transition-base;   // Not all 0.3s ease
}
```

### Step 4: Import in Aggregator

```scss
// 06-components/_components.scss
@import 'my-component';
```

---

## Token Quick Reference

**Most Common Tokens**:

```scss
// Colors
$primary: #4DB380;              // Emerald
$secondary: #CC6B49;            // Terracotta
$white, $gray-50, $gray-900

// Spacing
$spacing-sm: 8px
$spacing-md: 16px               // Most common
$spacing-lg: 24px
$spacing-xl: 32px

// Typography
$font-primary                   // Poppins (headings)
$font-secondary                 // Open Sans (body)
$font-size-base: 1rem           // 16px
$font-size-xl: 1.25rem          // 20px
$font-size-2xl: 1.5rem          // 24px
$weight-normal: 400
$weight-bold: 700

// Shadows
$shadow-sm, $shadow-md, $shadow-lg

// Motion
$transition-base                // Standard transition
```

**Full reference**: See `ARCHITECTURE.md` (621 lines of complete token documentation)

---

## Mixin Quick Reference

**Card with Glassmorphism**:
```scss
.c-my-card {
  @include card-v4('primary');   // Emerald glow
}
```

**Icon Circle**:
```scss
.c-my-icon {
  @include icon-circle($icon-circle-lg, $gradient-primary);
}
```

**Glassmorphism Effect**:
```scss
.c-my-glass {
  @include glassmorphism(12px, 0.1);  // blur, opacity
}
```

---

## Legacy Compatibility

**All old class names still work** via `@extend` directives:

```scss
// In _card.scss
.card {
  @extend .c-card;  // Maps old class to new BEM class
}
```

**This means**: Existing HTML templates work without changes. New components should use BEM naming.

---

## Build Commands (No Change)

```bash
cd themes/andromeda-hugo          # Still required!
hugo server --buildDrafts         # Dev server
hugo --gc --minify                # Production build
```

**Build Performance**:
- Time: ~37.5 seconds
- Pages: 99 (43 RO + 56 EN)
- Errors: 0 ✅

---

## Documentation Resources

**Quick Start** (5-minute guide):
- `docs/QUICK-START-ITCSS.md` - Component creation tutorial

**Architecture Guide** (complete reference):
- `ARCHITECTURE.md` - Full ITCSS documentation, token reference, best practices

**Component Template**:
- `assets/scss/06-components/_TEMPLATE.scss` - Copy this for new components

**Original Guide**:
- `CLAUDE.md` (v4.0.0) - Still valid for Hugo/content/sections

---

## What HASN'T Changed

✅ **Content creation** - Same as before (CLAUDE.md is still accurate)
✅ **Page structure** - Still Header + Sections + Footer
✅ **Section types** - All 21 sections still work
✅ **Hugo commands** - Same workflow
✅ **Multilingual** - RO (root) + EN (`/en/`) unchanged
✅ **Component hierarchy** - Atoms → Molecules → Organisms → Sections

**Only SCSS architecture changed** - everything else is the same!

---

## Common Tasks

### Add a New Section Component

1. **Copy template**: `cp 06-components/_TEMPLATE.scss 06-components/_my-section.scss`
2. **Define styles**: Use BEM naming (`.c-my-section`, `.c-my-section__title`)
3. **Use tokens**: Replace hardcoded values with design tokens
4. **Import**: Add to `06-components/_components.scss`
5. **Create partial**: `layouts/partials/sections/my-section.html` (as before)
6. **Test**: Build and verify

### Override a Design Token

**Don't do this unless necessary!** But if you must:

1. Open `01-settings/_tokens-*.scss`
2. Find the token (e.g., `$primary: #4DB380`)
3. Change the value
4. Rebuild - all components using that token update automatically

### Debug Build Errors

**"Undefined variable $primary"**:
- Settings layer not imported
- Check `main-new.scss` import order

**"Undefined mixin card-v4"**:
- Tools layer not imported
- Check `main-new.scss` import order

**Styles not applying**:
- Component not imported in `_components.scss`?
- Using wrong BEM class name?
- Hugo server needs restart?

---

## Migration Status

**Phase Status**: ✅ COMPLETE
- Phase 1: Foundation (Settings + Tools layers) ✅
- Phase 2: Systems (Generic + Objects layers) ✅
- Phase 3: Components (20 BEM components) ✅
- Deployment: ITCSS architecture active ✅
- Documentation: Complete guides created ✅

**Production Ready**: Yes - 0 build errors, 100% backward compatible

---

## Summary

**For Users**: Nothing changes - continue using CLAUDE.md v4.0.0 for content/section creation

**For Developers**: Use ITCSS + BEM for new SCSS code:
1. Copy `_TEMPLATE.scss` for new components
2. Use design tokens (never hardcode values)
3. Follow BEM naming (`.c-component__element--modifier`)
4. Import in `_components.scss`
5. Read `ARCHITECTURE.md` for full reference

**Version Upgrade Path**:
- v4.0.0 (CLAUDE.md) - Content, sections, Hugo workflow
- v5.0.0 (This addendum) - ITCSS architecture for SCSS

---

**Status**: Production ✅ | ITCSS + BEM | 20 components | 6 layers | 0 errors | Backward compatible

**Version**: 5.0.0 | **Updated**: 2025-11-19 | **Deployed**: 2025-11-19
