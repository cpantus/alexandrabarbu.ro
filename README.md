# Alexandra Barbu - Psychology Practice Website

**Hugo + Atomic Design** | **Production Ready** | Create pages in 30 seconds

---

## Quick Start

```bash
hugo server --buildDrafts              # Dev server
hugo --gc --minify                     # Build production
```

---

## Core Concept

Pages = Header + Sections (2-7) + Footer. Choose from 16 section types:

```yaml
# content/page.md
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "benefits-grid"
  - type: "pricing-tables"
  - type: "contact-form-enhanced"
```

---

## Available Sections (16)

**Core**: hero-breadcrumb, values-intro, feature-blocks, feature-details, benefits-grid
**Interactive**: pricing-tables, video-popup, faq-mini
**Forms**: contact-form-enhanced, signup-form-enhanced
**Info**: contact-info-cards, onboarding-steps, privacy-guarantee, confidentiality-notice, job-listings, cta-standard

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
Molecules (14)   → card, form-field, accordion, nav, etc.
Organisms (2)    → header, footer
Sections (16)    → Page sections (benefits-grid, pricing, etc.)

Page = Header + Sections + Footer
```

---

## File Structure

```
themes/andromeda-hugo/layouts/
├── _default/flexible.html      # Layout engine
└── partials/
    ├── atoms/                  # 5 components
    ├── molecules/              # 14 components
    ├── organisms/              # 2 components
    └── sections/               # 16 sections
```

---

## Testing

```bash
./scripts/test-components.sh                   # Verify all components
./scripts/test-performance.sh                  # Build time, bundle size
http://localhost:1313/test-all-sections/      # Visual test
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
- **TEST-GUIDE.md** - Complete testing workflow
- **QUICK-TEST.md** - Quick reference
- **themes/andromeda-hugo/docs/components/** - Component API

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

✅ 16 reusable sections | ✅ 3 archetypes | ✅ Atomic design (37 components)
✅ <3s builds | ✅ WebP images | ✅ Responsive | ✅ Multilingual | ✅ Form validation

---

## Quick Commands

```bash
hugo server --buildDrafts                       # Dev
hugo new content/page.md --kind service-page    # New page
./scripts/test-components.sh                    # Test
hugo --gc --minify                              # Build
```

**Status**: Production Ready ✅ | 37 components verified | Performance targets met

**Next**: Read `ARCHITECTURE.md` for technical details or `QUICK-TEST.md` to start testing.
