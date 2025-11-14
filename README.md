# Alexandra Barbu - Psychology Practice Website

**Hugo Static Site** | **Atomic Design System** | **Production Ready**

A modern, modular Hugo website for a psychology practice built with atomic design principles. Create pages in 30 seconds by mixing and matching 16 pre-built section components.

---

## Quick Start

```bash
# Install Hugo Extended (required)
brew install hugo  # macOS
snap install hugo --channel=extended  # Linux

# Start development server
hugo server --buildDrafts

# Open browser
http://localhost:1313/

# Build production
hugo --gc --minify
```

---

## Project Status

**Version**: 2.0 (Atomic Design System)
**Build Status**: ✅ Production Ready
**Components**: 5 atoms, 14 molecules, 2 organisms, 16 sections
**Performance**: <3s builds, <500KB pages, <50KB CSS (gzipped)

---

## Core Concept

This site uses a **flexible layout system** where pages are composed from reusable sections:

```yaml
# Any page (content/*.md)
---
title: "My Page"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"      # Choose 2-7 sections
  - type: "benefits-grid"        # From 16 available types
  - type: "pricing-tables"       # In any order
  - type: "contact-form-enhanced"
---
```

**Result**: Header + Footer + 4 sections = Complete page in 30 seconds.

---

## Available Sections (16 Types)

### Core Content
- `hero-breadcrumb` - Page header with breadcrumb navigation
- `values-intro` - Introduction section with image and text
- `feature-blocks` - Alternating image/text content blocks
- `feature-details` - Feature cards with icons and descriptions
- `benefits-grid` - Icon-based benefits grid layout

### Interactive
- `pricing-tables` - Pricing cards with monthly/yearly toggle
- `video-popup` - Video section with thumbnail and popup player
- `faq-mini` - FAQ accordion with expand/collapse

### Forms
- `contact-form-enhanced` - Contact form with validation and reCAPTCHA
- `signup-form-enhanced` - User signup form with validation

### Information
- `contact-info-cards` - Contact information display cards
- `onboarding-steps` - Step-by-step process visualization
- `privacy-guarantee` - Privacy guarantee section
- `confidentiality-notice` - Confidentiality information
- `job-listings` - Career opportunities grid
- `cta-standard` - Call-to-action section

---

## Creating Pages

### Method 1: Use Archetypes (Recommended)

```bash
# Service page (hero + features + pricing + contact)
hugo new content/services/therapy.md --kind service-page

# Therapy modality page (hero + benefits + process + FAQ)
hugo new content/therapy/cbt.md --kind therapy-page

# Marketing landing page (hero + benefits + testimonials + signup)
hugo new content/landing/consultation.md --kind landing-page
```

### Method 2: Manual Creation

```yaml
---
title: "Individual Therapy"
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "benefits-grid"
  - type: "pricing-tables"
  - type: "faq-mini"
  - type: "contact-form-enhanced"

# Section data
values_intro:
  title: "Professional Individual Therapy"
  description: "Personalized support in a safe space"
  image: "/images/services/individual.jpg"

benefits_section:
  title: "Why Choose Us"
  benefits:
    - icon: "las la-user-check"
      title: "Personalized"
    - icon: "las la-brain"
      title: "Evidence-Based"
    - icon: "las la-heart"
      title: "Compassionate"

pricing_section:
  plans:
    - title: "Individual Session"
      price_monthly: 100
      currency: "RON"
      features:
        - "50 minute session"
        - "Flexible scheduling"
---
```

---

## Component Architecture

```
Atomic Design Hierarchy:
├── Atoms (5)           → Basic UI primitives (button, heading, icon, image, input)
├── Molecules (14)      → Composite components (card, form-field, accordion, navigation)
├── Organisms (2)       → Complex compositions (header, footer)
└── Sections (16)       → Full page sections (benefits-grid, pricing-tables, etc.)

Page Structure:
├── Header (auto-included)
├── Section 1 → Molecules → Atoms
├── Section 2 → Molecules → Atoms
├── ...
├── Section N (2-7 sections)
└── Footer (auto-included)
```

---

## File Structure

```
alexandrabarbu.ro/
├── content/                    # Page content (markdown)
│   ├── services/
│   ├── therapy/
│   └── *.md
├── themes/andromeda-hugo/      # Theme (main work area)
│   ├── layouts/
│   │   ├── _default/
│   │   │   └── flexible.html   # Main layout engine
│   │   └── partials/
│   │       ├── atoms/          # 5 basic components
│   │       ├── molecules/      # 14 composite components
│   │       ├── organisms/      # 2 complex compositions
│   │       └── sections/       # 16 page sections
│   ├── assets/scss/            # Styles
│   ├── archetypes/             # Page templates
│   └── docs/                   # Component documentation
├── static/                     # Static assets (images, etc.)
├── config/                     # Hugo configuration
├── dev/active/                 # Development docs (task tracking)
├── scripts/                    # Testing scripts
├── ARCHITECTURE.md             # Technical architecture guide
├── TEST-GUIDE.md               # Complete testing guide
└── QUICK-TEST.md               # Quick reference
```

---

## Development Workflow

### 1. Create New Page
```bash
hugo new content/services/new-service.md --kind service-page
```

### 2. Choose Sections
Edit front matter, select 2-7 sections from 16 available types

### 3. Add Content
Fill in section data (title, description, images, etc.)

### 4. Preview
```bash
hugo server --buildDrafts
# Visit http://localhost:1313/services/new-service/
```

### 5. Build & Deploy
```bash
hugo --gc --minify
# Deploy public/ folder
```

---

## Testing

```bash
# Component verification (5 atoms, 14 molecules, 2 organisms, 16 sections)
./scripts/test-components.sh

# Performance test (build time, bundle size, WebP generation)
./scripts/test-performance.sh

# Visual test page (all 16 sections on one page)
http://localhost:1313/test-all-sections/

# Component preview (atoms with examples)
http://localhost:1313/components-preview/
```

---

## Multilingual Support

Supports Romanian (RO), English (EN), French (FR):

```yaml
# Content structure
content/
├── ro/           # Romanian content
├── en/           # English content
└── fr/           # French content (optional)

# Language switching via navigation header
```

---

## Performance Features

- **Partial Caching**: Header/footer cached by language (30-50% build time reduction)
- **Image Optimization**: Hugo native processing, WebP generation, responsive srcset
- **Lazy Loading**: Images load on scroll
- **CSS Optimization**: Minified, <50KB gzipped
- **Animation**: AOS scroll reveals with `prefers-reduced-motion` support

---

## Key Documentation

- **ARCHITECTURE.md** - Technical architecture and component system
- **TEST-GUIDE.md** - Complete testing workflow (6 levels)
- **TEST-RESULTS.md** - Component verification results
- **QUICK-TEST.md** - Quick reference card
- **themes/andromeda-hugo/REFACTOR-PLAN-v2.md** - Original refactor plan
- **themes/andromeda-hugo/docs/components/** - Component documentation
- **dev/active/refactor-atomic-design/PROGRESS.md** - Implementation progress

---

## Common Tasks

### Add New Section Type
```bash
# 1. Create section partial
themes/andromeda-hugo/layouts/partials/sections/my-section.html

# 2. Register in flexible.html
# Add to layouts/_default/flexible.html

# 3. Document usage
# Add examples to docs/
```

### Create Custom Molecule
```bash
# 1. Create molecule
themes/andromeda-hugo/layouts/partials/molecules/my-component.html

# 2. Use in sections
{{ partial "molecules/my-component.html" (dict "prop" "value") }}

# 3. Document
# Add to docs/components/molecules.md
```

### Modify Styling
```bash
# Edit SCSS
themes/andromeda-hugo/assets/scss/_custom.scss

# Rebuild
hugo server --disableFastRender
```

---

## Tech Stack

- **Hugo**: v0.148.1+ Extended (static site generator)
- **Bootstrap**: 5.3 (responsive framework)
- **SCSS**: Custom theming + animations
- **AOS**: Animate On Scroll library
- **Line Awesome**: Icon set
- **Swiper.js**: Carousels/sliders
- **Google Fonts**: Poppins (headings), Open Sans (body)

---

## Design System

**Colors**:
- Primary: Terracotta `#CC6B49` (warm, therapeutic)
- Secondary: Emerald `#4DB380` (healing, growth)
- Gradients and overlays for depth

**Typography**:
- Headings: Poppins (400, 500, 600, 700)
- Body: Open Sans (400, 600, 700)
- Fluid sizing with `clamp()`

**Animations**:
- Scroll reveals: AOS fade-up (gentle, professional)
- Hover states: 3D lift + shadow + color shift (200-300ms)
- Form focus: Glow + floating label
- Accessibility: `prefers-reduced-motion` support

---

## Support & Resources

**Getting Help**:
- Architecture: Read `ARCHITECTURE.md`
- Testing: Read `TEST-GUIDE.md`
- Components: Check `themes/andromeda-hugo/docs/components/`
- Hugo docs: https://gohugo.io

**Project Infrastructure**:
- Claude Code instructions: `.claude/CLAUDE.md`
- Theme rules: `themes/andromeda-hugo/CLAUDE.md`
- Refactor plan: `themes/andromeda-hugo/REFACTOR-PLAN-v2.md`

---

## License & Credits

**Theme**: Andromeda Hugo (customized)
**Project**: Psychology Practice Website
**Architecture**: Atomic Design System (Brad Frost)

---

## Quick Reference

```bash
# Start development
hugo server --buildDrafts

# Create page
hugo new content/page.md --kind service-page

# Test components
./scripts/test-components.sh

# Build production
hugo --gc --minify

# Deploy
# Copy public/ to hosting
```

**Next Steps**: Read `ARCHITECTURE.md` for technical details or `QUICK-TEST.md` to start testing.
