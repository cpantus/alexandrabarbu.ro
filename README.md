# Alexandra Barbu - Psychology Practice Website

**v5.0.1 Flattened Architecture** | **Hugo + ITCSS + Enhanced Design** | **Production Ready**

---

## Quick Start

```bash
# IMPORTANT: Project structure is flattened - run Hugo from project root!
cd /home/cere/Work/alex/alexandrabarbu.ro    # Project root (NOT theme directory)
hugo server --buildDrafts                     # Dev server
hugo --gc --minify                            # Build production
```

---

## Core Concept

Pages = Header + Sections (2-7) + Footer. Choose from 21 active section types (5 enhanced v4.0):

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

## Available Sections (21 active + 1 deprecated dir)

**Core**: hero-breadcrumb, values-intro, blog-grid
**Interactive**: video-popup, faq-mini, faq-content
**Forms**: contact-form-enhanced, signup-form-enhanced, newsletter-signup
**Info**: contact-info-cards, contact-options, privacy-guarantee, first-session-timeline
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
Molecules (21)   → card, form-field, accordion, nav, back-to-top, cookie-consent, etc.
Organisms (2)    → header, footer
Sections (21)    → Page sections (values-compass, pricing, credentials, blog-grid, etc.)

Total: 49 components | Page = Header + Sections + Footer
```

---

## File Structure

```
alexandrabarbu.ro/              # ← Project root (flattened structure!)
├── layouts/                    # Hugo templates at root level
│   ├── _default/flexible.html  # Layout engine
│   └── partials/
│       ├── atoms/              # 5 components
│       ├── molecules/          # 21 components
│       ├── organisms/          # 2 components
│       └── sections/           # 21 sections + _deprecated/
├── assets/                     # Assets at root level
│   ├── scss/                   # ITCSS architecture
│   └── js/                     # Vanilla JS (no Bootstrap/jQuery)
├── content/                    # Content at root level
├── config/                     # Configuration
└── data/                       # Data files

NOTE: No themes/andromeda-hugo/ subdirectory - structure flattened in commit 4886ab2
```

---

## Testing

```bash
# Run from project root!
scripts/test-components.sh               # Verify all 49 components (5+21+2+21)
scripts/test-performance.sh              # Build time, bundle size
```

---

## Common Tasks

**Add Section**: Create in `sections/`, register in `flexible.html`, use in pages
**Add Molecule**: Create in `molecules/`, use in sections
**Modify Styles**: Edit `assets/scss/_custom.scss`

---

## Tech Stack

Hugo v0.148.1+ Extended, ITCSS + BEM, SCSS, Vanilla JS (no Bootstrap/jQuery), Line Awesome icons, Cormorant Garamond + Source Sans 3 fonts

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
# ALWAYS run from project root!
hugo server --buildDrafts                       # Dev server
hugo new content/page.md --kind service-page    # New page
scripts/test-components.sh                      # Test
hugo --gc --minify                              # Build
```

**Status**: Production Ready ✅ | 49 components (5+21+2+21) | ITCSS + BEM + v4.0 Design | <520KB pages | Flattened architecture

**Next**: Read `CLAUDE.md` (instructions) | `ARCHITECTURE.md` (Hugo components) | `CLAUDE-ITCSS-ADDENDUM.md` (ITCSS architecture)
