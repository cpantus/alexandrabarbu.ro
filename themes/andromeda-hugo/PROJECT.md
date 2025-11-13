# Andromeda Hugo - Psychology Practice Theme

**Version**: 3.3.3 | **Type**: Hugo Theme | **Status**: Hybrid Architecture (40% modern, 60% legacy)
**Author**: Gethugothemes | **Site**: alexandrabarbu.ro | **License**: UNLICENSED

---

## What This Project Is

**Andromeda Hugo** is a professional multilingual (Romanian/English) Hugo theme designed for psychology and therapy practices. It features a **flexible component-based architecture** allowing dynamic page composition through reusable sections, combined with traditional Hugo layouts.

**Target Audience**: Psychologists, therapists, mental health professionals seeking a modern web presence with appointment scheduling integration (Calendly).

**Core Value**: Mix-and-match page sections declaratively without touching layout code, enabling rapid page creation and consistent UX.

---

## Architecture Overview

### Current State: Hybrid System
```
andromeda-hugo/
├── layouts/
│   ├── _default/
│   │   ├── flexible.html          ✅ Modern (sequential section loader)
│   │   ├── contact-enhanced.html  ✅ Modern
│   │   └── faq.html               ✅ Modern
│   ├── partials/sections/         ✅ 16 reusable components (703 lines total)
│   │   ├── hero-breadcrumb.html   (35 lines)
│   │   ├── feature-blocks.html    (37 lines)
│   │   ├── pricing-tables.html    (80 lines)
│   │   ├── values-intro.html      (50 lines)
│   │   ├── benefits-grid.html     (60 lines)
│   │   └── ... (11 more sections)
│   └── partials/components/       ⚠️ EMPTY (atomic design not implemented)
├── themes/andromeda-hugo/         ❌ Legacy base theme (1,581 lines monolithic layouts)
├── content/                       📄 Multilingual content (RO/EN)
├── data/shared_sections.yaml      📊 Reusable section data
└── i18n/                          🌐 Translations (RO/EN/FR)
```

**Progress**: 8/30+ pages migrated to flexible system (27% complete)

---

## Flexible Layout System (The Modern Way)

### How It Works
Pages declare their layout and section sequence in front matter:

```yaml
---
title: "Services"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "feature-blocks"
  - type: "pricing-tables"
  - type: "video-popup"
---
```

**Result**: `layouts/_default/flexible.html` renders sections in order, pulling data from front matter or shared data files.

### Available Section Components (16)
| Section | Purpose | Lines | Usage |
|---------|---------|-------|-------|
| `hero-breadcrumb` | Page header with breadcrumbs | 35 | Universal header |
| `feature-blocks` | Alternating image/text blocks | 37 | Services, features |
| `pricing-tables` | Pricing cards with toggle | 80 | Service packages |
| `values-intro` | Intro section with image | 50 | About, mission |
| `benefits-grid` | Icon-based benefits grid | 60 | Value props |
| `contact-form-enhanced` | Contact form with validation | 90 | Contact pages |
| `faq-mini` | FAQ accordion | 40 | Service FAQs |
| `video-popup` | Video section with lightbox | 45 | Testimonials |
| `job-listings` | Career opportunities grid | 55 | Careers |
| `testimonials` | Client testimonials | 48 | Social proof |
| ... | (6 more sections) | ... | ... |

**Total**: 703 lines of well-scoped, reusable sections.

### Mixing Sections Example
```yaml
# Example: Combine career and service sections
---
title: "Complete Packages"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"       # From career page
  - type: "feature-blocks"     # From services page
  - type: "pricing-tables"     # From services page
  - type: "benefits-grid"      # From career page
---
```

See `LAYOUT_MIXING_GUIDE.md` for 20+ configuration examples.

---

## Tech Stack

### Core Technologies
- **Hugo**: v0.148.1 extended (static site generator)
- **PostCSS**: CSS processing with PurgeCSS optimization
- **JavaScript**: Vanilla JS with libraries (AOS animations, Swiper, Rellax parallax)
- **Fonts**: Google Fonts (Poppins headings + Open Sans body)
- **Icons**: Line Awesome (Font Awesome alternative)

### Build Tools
```json
{
  "dev": "hugo server",
  "build": "hugo --gc --minify --templateMetrics",
  "preview": "hugo server -e production --minify",
  "format": "prettier -w ."
}
```

### Integrations
- **Calendly**: Appointment scheduling (embedded + popup)
- **Google Sheets**: Contact form submissions via Apps Script
- **Analytics**: Configured for Google Analytics, Matomo, Plausible (currently disabled)

---

## Design System

### Color Palette (Psychology-Focused)
```toml
color_primary   = "#4DB380"  # Deep emerald (growth, healing)
color_secondary = "#CC6B49"  # Complementary terracotta (balance)
text_color      = "#374151"  # Warm gray (approachable)
text_dark       = "#111827"  # Near black (clarity)
border_color    = "#D1D5DB"  # Neutral borders
```

### Typography
- **Headings**: Poppins (300-700 weights)
- **Body**: Open Sans (300-700 weights)
- **Base Size**: 17px (accessibility-first)
- **Scale**: 1.2 (minorThird - gentle hierarchy)
- **Brand Color Headings**: Enabled site-wide via `params.design.headings_brand_color`

### Plugins
- **Animations**: AOS (scroll animations)
- **Sliders**: Swiper.js
- **Parallax**: Rellax.js
- **Lightbox**: GLightbox
- **Cookie Notice**: Custom implementation

---

## Multilingual Support

### Languages
- **Default**: Romanian (RO)
- **Secondary**: English (EN)
- **Partial**: French (FR) - translation files exist

### Structure
```
content/
├── romanian/
│   ├── servicii.md
│   ├── despre-mine.md
│   └── contact.md
└── english/
    ├── services.md
    ├── about-me.md
    └── contact.md
```

**Translation System**: Hugo's i18n system with YAML files (`i18n/ro.yaml`, `i18n/en.yaml`)

---

## Data Architecture

### Data Sources (3-Tier)
1. **Front Matter**: Page-specific content (titles, sections, custom data)
2. **Shared Data**: `data/shared_sections.yaml` - Reusable content across pages
3. **Site Params**: `config/_default/params.toml` - Site-wide settings

**Convention**:
- Front matter → Page content
- `data/shared/` → Cross-page reusable content
- `hugo.toml params` → Site config

---

## Current State & Roadmap

### What Works Well ✅
- **Flexible layout system**: Declarative, reorderable, DRY
- **16 modular sections**: Well-sized, single-responsibility
- **Multilingual**: Full RO/EN support
- **Calendly integration**: Seamless appointment booking
- **Performance**: <3s build time target

### Known Limitations ⚠️
- **60% pages still monolithic**: 22+ pages use legacy layouts (about.html: 287 lines, services.html: 237 lines)
- **No atomic components**: Missing atoms/molecules (buttons, inputs, cards duplicated across sections)
- **Inconsistent data sources**: Mixed front matter + data files + params without clear conventions
- **Monolithic header/footer**: 300+ line partials need decomposition

### Modernization Roadmap (12 weeks, 130 hours)
See `cc-hugo-audit.md` for detailed 5-phase plan:

**Phase 1 (Week 1-2)**: Extract atomic components (buttons, headings, inputs, icons)
**Phase 2 (Week 3-4)**: Build molecule components (cards, form-fields, nav-items)
**Phase 3 (Week 5-6)**: Decompose organisms (header, footer, navigation)
**Phase 4 (Week 7-10)**: Migrate all pages to flexible layout
**Phase 5 (Week 11-12)**: Performance optimization, documentation

**Expected ROI**: 70% less duplication, 50% faster page creation, <3s builds

---

## How to Contribute

### Prerequisites
```bash
# Required
hugo version  # v0.148.1 extended or higher
node --version  # v16+ for build tools

# Install dependencies
npm install
```

### Development Workflow

**1. Start Dev Server**
```bash
npm run dev
# Opens at http://localhost:1313 with live reload
```

**2. Working with Flexible Layouts**
```bash
# Create new page with flexible layout
hugo new content/romanian/new-page.md

# Add to front matter:
---
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "feature-blocks"
---
```

**3. Creating New Sections**
```bash
# 1. Create section partial
touch layouts/partials/sections/my-section.html

# 2. Keep under 80 lines (single responsibility)
# 3. Use consistent data access patterns:
{{ $section_data := .Params.my_section }}
{{ range $section_data.items }}
  {{ partial "atoms/card.html" . }}
{{ end }}

# 4. Add to section inventory in this doc
```

**4. Data Conventions**
```yaml
# Front matter (page-specific)
my_section:
  title: "Page Title"
  items: [...]

# data/shared_sections.yaml (reusable)
pricing_plans:
  - name: "Basic"
    price: 99

# hugo.toml params (site-wide)
[params.design]
headings_brand_color = true
```

**5. Testing Multilingual**
```bash
# Test both languages
http://localhost:1313/ro/page-name
http://localhost:1313/en/page-name

# Update translations in i18n/ro.yaml and i18n/en.yaml
```

**6. Code Formatting**
```bash
npm run format  # Prettier with go-template plugin
```

**7. Production Build**
```bash
npm run build
# Output in public/ directory
# Optimized, minified, PurgeCSS applied
```

### Best Practices

**Section Design**:
- ✅ Keep sections under 80 lines
- ✅ Single responsibility (one purpose)
- ✅ Data-driven (no hardcoded content)
- ✅ Responsive by default (mobile-first)
- ❌ Don't mix section types in one partial
- ❌ Don't duplicate atoms (extract to components/)

**Naming Conventions**:
- Sections: `feature-blocks.html` (kebab-case)
- Atoms/molecules: `button.html`, `card.html` (kebab-case)
- Data files: `shared_sections.yaml` (snake_case)

**Performance**:
- Use `partialCached` for static sections (header, footer)
- Optimize images with Hugo's image processing
- Test build time: `hugo --templateMetrics`

**Atomic Design (Future)**:
When creating new UI components, follow this hierarchy:
```
atoms/          → button.html, heading.html, input.html
molecules/      → card.html, form-field.html, nav-item.html
organisms/      → header.html, footer.html
sections/       → hero-breadcrumb.html, feature-blocks.html (existing)
```

### Common Tasks

**Add New Page Section**:
1. Edit page front matter: Add `- type: "section-name"` to sections array
2. Configure section data in same front matter
3. Refresh browser (live reload)

**Migrate Legacy Page to Flexible**:
1. Read `cc-hugo-audit.md` Phase 4 process
2. Analyze current layout structure
3. Map to existing sections (or create new)
4. Migrate front matter data
5. Test RO/EN variants
6. Move old layout to `themes/.../layouts/_deprecated/`

**Add Translation**:
1. Edit `i18n/ro.yaml` and `i18n/en.yaml`
2. Add key: `new_key: "Translated text"`
3. Use in templates: `{{ i18n "new_key" }}`

**Debug Build Issues**:
```bash
hugo --verbose --debug
hugo --templateMetrics --templateMetricsHints
```

---

## Key Files Reference

| File | Purpose | When to Edit |
|------|---------|-------------|
| `layouts/_default/flexible.html` | Section loader | Never (stable) |
| `layouts/partials/sections/*.html` | Reusable sections | Add new sections |
| `config/_default/params.toml` | Site settings | Site-wide changes |
| `hugo.toml` | Build config | Build settings, languages |
| `data/shared_sections.yaml` | Shared content | Reusable data |
| `i18n/ro.yaml`, `i18n/en.yaml` | Translations | Add translations |
| `content/romanian/`, `content/english/` | Page content | Add/edit pages |
| `LAYOUT_MIXING_GUIDE.md` | Section examples | Reference only |
| `cc-hugo-audit.md` | Modernization plan | Strategic planning |

---

## Quick Start Checklist

**For Contributors**:
- [ ] Install Hugo v0.148.1+ extended
- [ ] Run `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Review `LAYOUT_MIXING_GUIDE.md` for section examples
- [ ] Check existing sections in `layouts/partials/sections/`
- [ ] Follow atomic design principles (atoms → molecules → organisms → sections)
- [ ] Test both RO and EN versions
- [ ] Run `npm run format` before committing

**For LLM Assistance**:
- Primary architecture: Flexible layout system (declarative section composition)
- 16 existing sections in `layouts/partials/sections/` - reuse before creating new
- Data hierarchy: Front matter → `data/shared/` → `params.toml`
- Multilingual: Always edit RO + EN content
- Code style: Prettier with go-template plugin
- Performance target: <3s builds, <80 lines per section
- Roadmap: Migrate to atomic design (see `cc-hugo-audit.md`)

---

## Support & Resources

**Documentation**:
- Hugo Docs: https://gohugo.io/documentation/
- Flexible Layout Guide: `LAYOUT_MIXING_GUIDE.md`
- Architecture Audit: `cc-hugo-audit.md`
- Atomic Design: https://atomicdesign.bradfrost.com/

**Build Commands**:
```bash
npm run dev              # Development server
npm run build            # Production build
npm run preview          # Production preview
npm run format           # Code formatting
npm run update-modules   # Update Hugo modules
```

**Hugo Performance Tools**:
```bash
hugo --templateMetrics           # Template performance
hugo --templateMetricsHints      # Optimization suggestions
hugo --gc --minify               # Optimized build
```

---

**Document Version**: 1.0 | **Last Updated**: 2025-11-12 | **Tokens**: ~980
