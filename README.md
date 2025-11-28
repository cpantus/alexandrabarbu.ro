# Alexandra Barbu - Psychology Practice Website

**v5.1.0 Standard Hugo Theme** | **Hugo + ITCSS + BEM + Enhanced Design** | **Production Ready**

---

## Quick Start

```bash
# IMPORTANT: Run Hugo from project root (standard Hugo theme structure)
cd /home/cere/Work/alex/alexandrabarbu.ro    # Project root
hugo server --buildDrafts                     # Dev server
hugo --gc --minify                            # Build production
```

---

## CMS Access

**Sveltia CMS** is integrated for visual content editing:

```bash
# Start Hugo dev server
hugo server --buildDrafts

# Access CMS at
http://localhost:1313/admin
```

Authenticate with GitHub OAuth. Create, edit, and publish pages using the flexible section builder with 37 section types.

---

## Core Concept

Pages = Header + Sections (2-7) + Footer. Choose from 37 active section types (5 enhanced v4.0):

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

## Available Sections (37 active)

**Heroes (2)**: hero-breadcrumb, hero-about
**Core (5)**: values-intro, values-compass, feature-blocks, cta-standard, cta-split
**Interactive (4)**: video-popup, faq-mini, method-tabs, blog-grid
**Forms (3)**: contact-form-enhanced, signup-form-enhanced, newsletter-signup
**Trust (6)**: contact-info-cards, contact-options, onboarding-steps, privacy-guarantee, confidentiality-notice, credentials-showcase
**Pricing (2)**: pricing-tables, pricing-packages
**Stats (1)**: stats-numbers
**Testimonials (1)**: testimonials-enhanced
**About/Bio (6)**: about-preview, approach-preview, services-preview, my-story, credentials-education, training-certifications
**Methodology (5)**: therapeutic-process, methodology-zigzag, scientific-approach, methods-used, simple-process
**Specialized (2)**: problem-empathy, benefits-results

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
Atoms (9)        → button, heading, icon, image, tag, divider, link, spinner, avatar
Molecules (24)   → card, form-field, accordion, nav, breadcrumb, social-links, video-embed, etc.
Organisms (2)    → header, footer
Sections (37)    → Page sections (hero, cta, pricing, testimonials, faq, contact, etc.)

Total: 72 components | Page = Header + Sections + Footer
```

---

## File Structure

```
alexandrabarbu.ro/              # ← Project root
├── themes/andromeda-hugo/      # Theme directory (Hugo standard structure)
│   ├── layouts/                # Hugo templates
│   │   ├── _default/           # Layout files (flexible.html, list.html, etc.)
│   │   └── partials/           # Component partials
│   │       ├── atoms/          # 9 atomic components
│   │       ├── molecules/      # 24 composite components
│   │       ├── organisms/      # 2 structural components (header, footer)
│   │       └── sections/       # 37 page sections
│   ├── assets/                 # Theme assets
│   │   ├── scss/               # ITCSS architecture (01-settings through 07-utilities)
│   │   └── js/                 # Vanilla JS (no Bootstrap/jQuery dependencies)
│   ├── archetypes/             # Content templates
│   └── docs/                   # Component documentation
├── layouts/                    # Project-level layout overrides (sparse)
│   └── partials/               # Project-specific partials
├── assets/                     # Project-level assets (sparse)
├── content/                    # Site content (multilingual: romanian/, english/)
├── config/                     # Hugo configuration (_default/, menus)
├── data/                       # Data files (shared_sections.yaml, cms_sections.yaml, etc.)
├── i18n/                       # Translation files (ro.yaml, en.yaml)
├── static/admin/               # Sveltia CMS interface
│   ├── index.html              # CMS entry point
│   ├── config.yml              # Dev CMS configuration
│   └── config.production.yml    # Production CMS configuration
└── static/images/              # Media folder (managed by CMS)

NOTE: Hugo's lookup order: project root → theme directory. Theme provides defaults,
project root provides overrides. Main implementation is in themes/andromeda-hugo/.
CMS accessible at /admin after running `hugo server`.
```

---

## Testing

```bash
# Run from project root!
scripts/test-components.sh               # Verify all 71 components (9+24+2+36)
scripts/test-performance.sh              # Build time, bundle size
```

---

## Common Tasks

**Add Section**: Create in `sections/`, register in `flexible.html`, use in pages
**Add Molecule**: Create in `molecules/`, use in sections
**Modify Styles**: Edit `themes/andromeda-hugo/assets/scss/` (ITCSS architecture)

---

## Tech Stack

Hugo v0.152.2+ Extended, ITCSS + BEM, SCSS, Vanilla JS (no Bootstrap/jQuery), Line Awesome icons, Crimson Pro + Work Sans fonts

---

## Performance

Build <3s | Pages <500KB | CSS <50KB gzipped | WebP images | Lazy loading | 80%+ reusability

---

## Multilingual

Supports RO/EN/FR via `content/ro/`, `content/en/`, `content/fr/`

---

## Documentation

- **ARCHITECTURE.md** - Technical architecture (includes CMS Integration section)
- **README.md** - Quick start and overview (this file)
- **themes/andromeda-hugo/CLAUDE.md** - Instructions for AI assistants
- **themes/andromeda-hugo/PROJECT.md** - Project-specific documentation
- **themes/andromeda-hugo/docs/components/** - Component API
- **themes/andromeda-hugo/docs/DATA-CONVENTIONS.md** - Data structure guidelines
- **data/cms_sections.yaml** - CMS section types reference with 11 categories
- **static/admin/config.yml** - Sveltia CMS configuration (for curious developers)

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

✅ 36 reusable sections (5 enhanced v4.0) | ✅ 4 archetypes | ✅ Atomic design (71 components)
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
- **8 Gradients**: warm (forest→sage), radial, glassmorphism, icons
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

**Status**: Production Ready ✅ | 72 components (9+24+2+37) | ITCSS + BEM + v4.0 Design | <520KB pages | Sveltia CMS Integrated | Hugo standard theme

**Next**: Access CMS at `/admin` | Read `CLAUDE.md` (instructions) | `ARCHITECTURE.md` (Hugo + CMS) | `CLAUDE-ITCSS-ADDENDUM.md` (ITCSS architecture)
