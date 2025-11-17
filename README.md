# Alexandra Barbu - Psychology Practice Website

**v4.0 Creative Design Excellence** | **Hugo + Enhanced Design System** | **Production Ready**

---

## Quick Start

```bash
cd themes/andromeda-hugo             # Run from theme directory
hugo server --buildDrafts            # Dev server
hugo --gc --minify                   # Build production
```

---

## Core Concept

Pages = Header + Sections (2-7) + Footer. Choose from 24 section types (5 enhanced v4.0):

```yaml
# content/page.md
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "values-compass"          # NEW v4.0 - Compass layout
  - type: "pricing-tables"          # Enhanced v4.0 - Featured tier
  - type: "contact-form-enhanced"
```

---

## Available Sections (24)

**Core**: hero-breadcrumb, values-intro, feature-details, blog-grid, cta-standard
**Interactive**: video-popup, faq-mini, faq-content, method-tabs
**Forms**: contact-form-enhanced, signup-form-enhanced, newsletter-signup
**Info**: contact-info-cards, onboarding-steps, privacy-guarantee, confidentiality-notice, job-listings
**Enhanced v4.0** ⭐:
- `values-compass` (NEW) - Compass-pattern layout with glassmorphism
- `feature-blocks` - Zigzag layout with parallax scrolling
- `pricing-tables` - Featured tier elevation with tooltips
- `stats-numbers` - SVG progress rings with animated counting
- `credentials-showcase` - Gradient icons with circular grid
**Legacy**: benefits-grid (use values-compass), problem-empathy, timeline-process, related-services, service-highlights

---

## Create Pages

### Archetypes (Fast)
```bash
hugo new content/services/therapy.md --kind service-page
hugo new content/therapy/cbt.md --kind therapy-page
hugo new content/landing/promo.md --kind landing-page
```

### Manual
```yaml
---
title: "Individual Therapy"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "benefits-grid"

benefits_section:
  title: "Why Choose Us"
  benefits:
    - icon: "las la-check"
      title: "Evidence-Based"
---
```

---

## Architecture

```
Atoms (5)        → button, heading, icon, image, input
Molecules (17)   → card, form-field, accordion, nav, back-to-top, cookie-consent, etc.
Organisms (2)    → header, footer
Sections (24)    → Page sections (benefits-grid, pricing, blog-grid, etc.)

Page = Header + Sections + Footer
```

---

## File Structure

```
themes/andromeda-hugo/layouts/
├── _default/flexible.html      # Layout engine
└── partials/
    ├── atoms/                  # 5 components
    ├── molecules/              # 17 components
    ├── organisms/              # 2 components
    └── sections/               # 24 sections
```

---

## Testing

```bash
cd themes/andromeda-hugo                       # Run from theme directory
../../scripts/test-components.sh               # Verify all 48 components
../../scripts/test-performance.sh              # Build time, bundle size
```

---

## Common Tasks

**Add Section**: Create in `sections/`, register in `flexible.html`, use in pages
**Add Molecule**: Create in `molecules/`, use in sections
**Modify Styles**: Edit `assets/scss/_custom.scss`

---

## Tech Stack

Hugo v0.148.1+ Extended, Bootstrap 5.3, SCSS, AOS, Line Awesome, Poppins/Open Sans

---

## Performance

Build <3s | Pages <500KB | CSS <50KB gzipped | WebP images | Lazy loading | 80%+ reusability

---

## Multilingual

Supports RO/EN/FR via `content/ro/`, `content/en/`, `content/fr/`

---

## Documentation

- **ARCHITECTURE.md** - Technical architecture (read for development)
- **themes/andromeda-hugo/CLAUDE.md** - Instructions for AI assistants
- **themes/andromeda-hugo/PROJECT.md** - Project-specific documentation
- **themes/andromeda-hugo/docs/components/** - Component API
- **themes/andromeda-hugo/docs/DATA-CONVENTIONS.md** - Data structure guidelines

---

## Development

```bash
# 1. Create
hugo new content/services/new.md --kind service-page

# 2. Edit front matter (choose sections)

# 3. Preview
hugo server --buildDrafts

# 4. Build & deploy
hugo --gc --minify
```

---

## Key Features

✅ 24 reusable sections (5 enhanced v4.0) | ✅ 4 archetypes | ✅ Atomic design (53 components)
✅ <3s builds | ✅ WebP images | ✅ Responsive | ✅ Multilingual | ✅ Form validation
⭐ **NEW v4.0**: Glassmorphism | Warm gradients | Parallax scrolling | SVG animations

---

## v4.0 Creative Design Excellence 🎨

### What's New
**5 Premium Enhanced Components** with warm, approachable psychology design:

1. **Values Compass** (NEW) - Unique compass-pattern layout
   - Glassmorphism cards with frosted glass
   - Progressive disclosure on hover
   - Mobile tap-to-expand interactions

2. **Feature Blocks** - Zigzag layout with parallax
   - Alternating left/right pattern
   - Parallax image effects (desktop)
   - Gradient text on hover

3. **Stats Numbers** - Animated counting + SVG rings
   - Circular progress indicators
   - Count-up animation (0→target)
   - Intersection Observer triggered

4. **Pricing Tables** - Featured tier elevation
   - Featured card scaled 1.08x
   - Comparison tooltips
   - Gradient checkmarks

5. **Credentials** - Gradient icons + circular grid
   - Circular gradient backgrounds
   - Enhanced hover effects
   - Organic blob backgrounds

### Design System
- **8 Gradients**: warm (emerald→terracotta), radial, glassmorphism, icons
- **10 Animations**: fade-in, pulse, float, gradient-shift, staggered-entrance
- **Accessibility**: WCAG AA, reduced-motion, keyboard nav, touch-optimized
- **Performance**: +18KB gzipped, 60fps animations, <3s builds maintained

---

## Quick Commands

```bash
cd themes/andromeda-hugo                        # MUST run from theme directory
hugo server --buildDrafts                       # Dev server
hugo new content/page.md --kind service-page    # New page
../../scripts/test-components.sh                # Test
hugo --gc --minify                              # Build
```

**Status**: Production Ready ✅ | 53 components | Creative Design Excellence v4.0 | <520KB pages

**Next**: Read `PROJECT.md` (v4.0 enhancements) | `ARCHITECTURE.md` (technical) | `themes/andromeda-hugo/CLAUDE.md` (development)
