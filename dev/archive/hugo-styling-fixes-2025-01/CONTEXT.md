# Technical Context - Hugo Styling Investigation

## SCSS Architecture Overview

### File Structure (30 SCSS files total)

```
themes/andromeda-hugo/assets/scss/
├── custom.scss                        # Main entry (2,241 lines)
├── _design-system.scss                # Foundation
├── _design-tokens.scss                # Variables (466 lines)
├── _design-enhancements.scss          # v4.0 creative (530 lines)
│
├── systems/                           # Foundation systems
│   ├── _card-system.scss              # Card variants (528 lines)
│   ├── _icon-system.scss              # Icon wrappers (476 lines)
│   └── _color-system.scss             # Color variants (423 lines)
│
└── components/                        # Component styles
    ├── _testimonials.scss             # Testimonial cards
    ├── _problem-empathy.scss          # Problem cards
    ├── _credentials.scss              # Credential badges
    ├── _values-compass.scss           # Values compass
    └── [21 more component files]
```

### Token System Architecture

#### 1. Font-Size Tokens (for icon glyphs)
**Location**: `_design-tokens.scss` lines 281-289

```scss
$icon-xs: 0.75rem;    // 12px - Tiny inline icons
$icon-sm: 0.875rem;   // 14px - Small inline icons
$icon-base: 1rem;     // 16px - Default icon size
$icon-md: 1.25rem;    // 20px - Medium icons
$icon-lg: 1.5rem;     // 24px - Large icons
$icon-xl: 2rem;       // 32px - Extra large icons
$icon-2x: 2rem;       // 32px - Alias for xl
$icon-3x: 3rem;       // 48px - Feature icons
$icon-4x: 4rem;       // 64px - Hero icons
```

**Usage**: Applied to `font-size` property of `<i>` or `<svg>` elements

#### 2. Container Tokens (for icon circle wrappers)
**Location**: `_design-tokens.scss` lines 291-295

```scss
$icon-circle-sm: 32px;   // Small circular icon container
$icon-circle-md: 48px;   // Medium (MOST COMMON)
$icon-circle-lg: 64px;   // Large circular icon container
$icon-circle-xl: 84px;   // Extra large circular icon container
```

**Usage**: Applied to `width` and `height` properties of container elements

#### 3. Component-Specific Tokens
**Location**: `_design-enhancements.scss` lines 226-233

```scss
/* Values Component Tokens */
$values-card-base-width: 280px;
$values-card-featured-width: 320px;
$values-icon-size: $icon-circle-md;          // NOW CORRECT (48px)
$values-icon-featured-size: $icon-circle-lg; // NOW CORRECT (64px)
$values-card-gap: $gap-normal;
$values-border-radius: $radius-xl;
$values-featured-scale: 1.15;
```

## Component Analysis

### Values Compass (_values-compass.scss)

**Structure**:
```scss
.value-card {
  @include card-v4('primary', false);  // Base card styling
}

.value-card-icon-wrapper {
  width: $values-icon-size;            // 48px (fixed)
  height: $values-icon-size;

  i {
    font-size: $icon-circle-sm;        // 32px (icon glyph size)
  }
}

.value-card-featured .value-card-icon-wrapper {
  width: $values-icon-featured-size;   // 64px (fixed)
  height: $values-icon-featured-size;
}
```

**Responsive Behavior**: No responsive breakpoints (desktop-only component)

### Problem Empathy (_problem-empathy.scss)

**Desktop** (default):
```scss
.problem-icon-wrapper {
  width: $icon-circle-lg;   // 64px
  height: $icon-circle-lg;

  i {
    font-size: $icon-xl;    // 2rem (32px)
  }
}
```

**Tablet** (max-width: 768px):
```scss
@media (max-width: 768px) {
  .problem-icon-wrapper {
    width: $icon-circle-sm;   // 32px (fixed)
    height: $icon-circle-sm;

    i {
      font-size: 1.5rem;      // 24px
    }
  }
}
```

**Mobile** (max-width: 576px):
```scss
@media (max-width: 576px) {
  .problem-icon-wrapper {
    width: 28px;              // (fixed)
    height: 28px;

    i {
      font-size: 1.25rem;     // 20px
    }
  }
}
```

**Responsive Scaling**: 64px → 32px → 28px (container) | 32px → 24px → 20px (glyph)

## Border System Evolution

### Original System (before v4.0)
**Method**: CSS mask with linear-gradient

```scss
.component::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: $radius-md;
  padding: 2px;
  background: $gradient-warm-vibrant;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity $duration-base;
}
```

### Current System (v4.0)
**Method**: 3-layer box-shadow gradient glow

```scss
@mixin card-v4($variant: 'primary', $elevated: false) {
  border: none !important;  // Remove borders

  &:hover {
    box-shadow:
      0 0 0 1px rgba($emerald-400, 0.2),      // Ring
      0 8px 24px -4px rgba($emerald-500, 0.25), // Depth
      0 16px 48px -8px rgba($emerald-400, 0.15); // Outer glow
  }
}
```

**Components Using Glow**:
- values-compass (line 166: `border: none !important`)
- problem-empathy (line 70: `border: none !important`)
- credentials (line 11: `border: none !important`)
- testimonials (line 90: `border: none !important`)

## Recent Refactoring Timeline

### Commit 8c7e1f7 (Nov 18, 21:03)
**"Major cleanup and design system consolidation"**

- Created modular SCSS architecture
- Added 3 new system files (card, icon, color)
- Introduced `card-v4()` mixin
- Moved deprecated components to `_deprecated/`

### Commit 9bee8f0 (Nov 18, 21:35)
**"Replace gradient line borders with elegant gradient glow effects"**

- Replaced CSS mask borders with box-shadow glows
- Updated `card-v4()` mixin
- Added `border: none !important` overrides
- Removed `::before` gradient borders from some components

### Commit b358ba6 (Jan 19, 2025)
**"fix(icons): consolidate icon tokens to single source of truth"** ❌ BROKE ICONS

- Removed duplicate icon tokens (lines 426-430, 212-216)
- Updated hardcoded sizes in 3 components
- **ERROR**: Kept font-size definition, components needed container sizes

### Commit 04c300e (Jan 19, 2025)
**"fix(icons): correct icon container token usage"** ✅ FIXED ICONS

- Fixed values-compass container tokens
- Fixed problem-empathy responsive tokens
- Added clarifying documentation

## Investigation Findings

### Components with ::before Pseudo-Elements (20 files)

**Search Result**: `rg '::before' themes/andromeda-hugo/assets/scss/ -g '*.scss'`

**Finding**: ZERO files use `::before` for gradient borders
- All `::before` elements serve other purposes (spacing, decorations, etc.)
- Original diagnosis (double borders from `::before`) was INCORRECT
- Border removal was already complete in commit 9bee8f0

### Border Violations Found (8 instances)

**File**: `custom.scss`

| Line | Type | Border | Purpose |
|------|------|--------|---------|
| 440 | `border-top: 4px solid` | Accent | Feature card variant |
| 448 | `border-top: 4px solid` | Accent | Feature card variant |
| 456 | `border-top: 4px solid` | Accent | Feature card variant |
| 597 | `border-left: 4px solid` | Accent | Service highlight |
| 886 | `border-top: 2px solid` | Separator | Section divider |
| 1655 | `border-bottom: 1px solid` | Separator | Subtle divider |
| 1852 | `border-bottom: 1px solid` | Separator | Content separator |
| 1910 | `border-left: 3px solid` | Accent | Sidebar element |

**Status**: NOT REMOVED (out of scope for this session)
- Lines 440-464 are LEGACY accent borders (should use gradient glow)
- Lines 886, 1655, 1852 are INTENTIONAL separators (keep)
- Line 1910 is sidebar accent (evaluate separately)

## SCSS Compilation Order

```scss
// custom.scss (main entry point)
@import "design-tokens";        // Variables loaded first
@import "design-enhancements";  // Component tokens next
@import "systems/card-system";  // Mixins available
@import "systems/icon-system";
@import "components/values-compass";  // Components use tokens
@import "components/problem-empathy";
// ... etc
```

**Cascade Rule**: Last definition wins
- If `$icon-lg` defined multiple times, last import overwrites previous
- This caused unpredictable behavior before cleanup

## Testing Strategy

### Visual Validation Checklist

**Values Compass**:
- [ ] Regular card icons: 48px diameter circles
- [ ] Featured card icons: 64px diameter circles
- [ ] Icons centered in circles
- [ ] Gradient glow on hover (no solid borders)

**Problem Empathy**:
- [ ] Desktop (>992px): 64px circles
- [ ] Tablet (768px): 32px circles
- [ ] Mobile (576px): 28px circles
- [ ] Smooth size transitions

**General**:
- [ ] No double borders
- [ ] No single-line accent borders (unless intentional separators)
- [ ] Consistent icon sizing across all components
- [ ] Both RO (/) and EN (/en/) languages render correctly

### Browser DevTools Inspection

```javascript
// Check computed styles
const iconWrapper = document.querySelector('.value-card-icon-wrapper');
console.log(getComputedStyle(iconWrapper).width);  // Should be "48px"
console.log(getComputedStyle(iconWrapper).border); // Should be "none"

// Check responsive
window.matchMedia('(max-width: 768px)').matches  // True on tablet
```

## Known Issues (Resolved)

1. **Token namespace collision** ✅ FIXED
   - Root cause identified and corrected
   - Documentation added to prevent recurrence

2. **Broken icon containers** ✅ FIXED
   - Values compass: 48px/64px restored
   - Problem empathy: Responsive sizing restored

3. **Border removal incomplete** ⚠️ PARTIAL
   - Gradient glow system: Complete
   - Legacy accent borders in custom.scss: Not removed (low priority)

## Future Work (Optional)

1. **Remove legacy accent borders** (custom.scss lines 440-464, 597):
   - Replace with gradient glow variants
   - Test visual impact before committing

2. **Create $icon-circle-xs token** (if needed):
   - Currently using hardcoded `28px` for mobile
   - Consider: `$icon-circle-xs: 28px`

3. **Audit all components for hardcoded sizes**:
   - Search: `rg 'width: \d+px|height: \d+px' -g '*.scss'`
   - Replace with appropriate tokens
