# Refactor Context & Key Information

## Project Location
```
Project root: /home/cere/Work/alex/alexandrabarbu.ro/
Theme: themes/andromeda-hugo/
```

## Key Files to Read First
1. `REFACTOR-PLAN-v2.md` - Complete refactor plan (LATEST)
2. `cc-hugo-audit.md` - Technical audit with recommendations
3. `PROJECT.md` - Project requirements and context
4. `LAYOUT_MIXING_GUIDE.md` - Current flexible layout usage

## Current Architecture

### What Works Well ✅
- **Flexible layout system**: `layouts/_default/flexible.html` (92 lines)
  - Sequential section loader from front matter
  - 16 supported section types
  - 8/30+ pages already migrated

- **16 Section Components**: `layouts/partials/sections/`
  - Average 44 lines per component (well-scoped)
  - Single-responsibility design
  - Total: 703 lines across 16 components

- **Modern tooling**:
  - Hugo v0.148.1 extended
  - Hugo Modules (go.mod)
  - PostCSS, PurgeCSS configured
  - Bootstrap 5 via SCSS

### What Needs Fixing ❌
- **No atomic components**: `layouts/partials/atoms/` doesn't exist
- **40% code duplication**: Buttons, inputs, cards repeated across sections
- **Monolithic header/footer**: 209 + 180 = 389 lines
- **60% legacy pages**: 1,581 lines in `themes/andromeda-hugo/layouts/_default/`
- **8.3MB unoptimized images**: No WebP, no srcset
- **Color scheme mismatch**: Violet vs Terracotta in config

## Directory Structure
```
andromeda-hugo/
├── layouts/
│   ├── _default/
│   │   ├── flexible.html          ✅ Modern
│   │   ├── contact-enhanced.html  ✅ Modern
│   │   └── faq.html               ✅ Modern
│   └── partials/
│       ├── sections/              ✅ 16 components
│       ├── atoms/                 ❌ CREATE THIS
│       ├── molecules/             ❌ CREATE THIS
│       └── organisms/             ❌ CREATE THIS
│
├── themes/andromeda-hugo/         ❌ Legacy nest
│   └── layouts/_default/
│       ├── about.html (287 lines)
│       ├── services.html (237 lines)
│       └── ... (20+ more)
│
└── assets/
    └── images/                    ❌ 8.3MB unoptimized
```

## Critical Components to Extract (Phase 1)

### Button Atom (Duplicated 8× across sections)
**Variants**: primary, secondary, outline, link, icon, cta
**Current duplication**: ~80 lines across sections
**Target**: 1 reusable component (~30 lines)

### Input Atom (Duplicated 6× in forms)
**Types**: text, email, tel, textarea, checkbox, radio
**Current duplication**: ~120 lines across forms
**Target**: 1 reusable component (~40 lines)

### Image Atom (NEW - doesn't exist)
**Purpose**: Hugo image processing wrapper
**Features**: WebP conversion, responsive srcset, lazy-load
**Impact**: 8.3MB → <2MB assets

## Color Scheme (FIX IN PHASE 1)

### Current (Inconsistent)
- Config: Secondary = #CC6B49 (terracotta)
- SCSS: Secondary = #7C3AED (violet)

### Target (Unified)
- Primary: #4DB380 (emerald - healing, growth)
- Secondary: #CC6B49 (terracotta - warmth, balance)
- Text: #374151 (warm gray)
- Background: #FDFDFD (clean white)

**Action**: Update both config and SCSS to terracotta, remove violet

## Advanced Functionality (Already Built)

### Contact Forms ✅
- Location: `layouts/partials/sections/contact-form-enhanced.html` (2.7k)
- Features: Google Sheets integration, reCAPTCHA v3, validation
- Action: Preserve during refactor, extract atoms from it

### Pricing System ✅
- Location: `layouts/partials/sections/pricing-tables.html` (4.4k)
- Features: Monthly/yearly toggle, 3-tier cards, Calendly integration
- Action: Extract card molecule, simplify toggle

## Animation Strategy

### Keep
- **AOS** (Animate On Scroll): Gentle fade-up for therapeutic feel
  - ~13KB minified
  - Good for professional psychology site

### Add
- **Custom CSS animations**:
  - Button hover: 3D lift + shadow (200ms)
  - Card hover: Scale 1.02 + shadow (300ms)
  - Input focus: Glow + label float (150ms)
  - Checkmark reveal: Draw animation (600ms)
  - `prefers-reduced-motion` support

### Remove
- **Rellax.js**: Replace with CSS parallax if needed
- **Swiper.js**: Audit usage, remove if <3 instances

## Multilingual Support
- Languages: RO (Romanian), EN (English), FR (French)
- Test after each phase: Language switcher, content fallbacks, URLs

## Performance Targets

| Metric | Current | Target |
|--------|---------|--------|
| Build time | Unknown | <3s |
| Page weight | Unknown | <500KB |
| Image assets | 8.3MB | <2MB |
| CSS bundle | Unknown | <50KB (gzipped) |
| Code duplication | 40% | <10% |

## Git Workflow
- Branch: `refactor/atomic-design-system`
- Backup legacy to: `_deprecated/`
- Commit after each phase
- Test multilingual before each commit

## Resume Commands

### To resume in new session:
```
cd /home/cere/Work/alex/alexandrabarbu.ro
/resume-dev
```

Or manually:
```
Resume Hugo refactor in themes/andromeda-hugo/
Read themes/andromeda-hugo/REFACTOR-PLAN-v2.md and dev/active/refactor-atomic-design/PROGRESS.md
Continue from current checkpoint
```

### To check current status:
```
Read dev/active/refactor-atomic-design/PROGRESS.md
Show what's completed and what's next
```

### To start Phase 1:
```
Start Phase 1 of Hugo refactor
Create git branch and extract button atom
```
