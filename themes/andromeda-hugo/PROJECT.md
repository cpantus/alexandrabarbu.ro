# Andromeda Hugo - Psychology Practice Theme

**Version**: 4.0.0 - Creative Design Excellence | **Type**: Hugo Theme | **Status**: Enhanced Modern Architecture
**Author**: Gethugothemes (base) + Creative Enhancements | **Site**: alexandrabarbu.ro | **License**: UNLICENSED

---

## What This Project Is

**Andromeda Hugo** is a professional multilingual (Romanian/English) Hugo theme designed for psychology and therapy practices. It features a **flexible component-based architecture** allowing dynamic page composition through reusable sections, combined with traditional Hugo layouts.

**Target Audience**: Psychologists, therapists, mental health professionals seeking a modern web presence with appointment scheduling integration (Calendly).

**Core Value**: Mix-and-match page sections declaratively without touching layout code, enabling rapid page creation and consistent UX.

---

## Language & URL Configuration

**Multilingual Setup**: Romanian (default) + English + French

| Language | Content Directory | URL Pattern | Example |
|----------|------------------|-------------|---------|
| Romanian (RO) | `content/romanian/` | `/{slug}/` | `/servicii/` ✅ |
| English (EN) | `content/english/` | `/en/{slug}/` | `/en/services/` ✅ |
| French (FR) | `content/french/` | `/fr/{slug}/` | `/fr/services/` ✅ |

**Configuration** (`hugo.toml`):
- `defaultContentLanguage = 'RO'` - Romanian is default
- `defaultContentLanguageInSubdir = false` (implicit) - Default language has no prefix
- Language weights: RO=0 (default), EN=2, FR=3

**CRITICAL**: Romanian pages are at root path (`/servicii/`), **NOT** `/ro/servicii/` (404!)

**Why this structure?**
- SEO best practice: Shorter URLs for primary audience
- Standard Hugo multilingual pattern
- Language switcher uses `.RelPermalink` (auto-generates correct paths)

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

### Available Section Components (24 - Enhanced)
| Section | Purpose | Lines | Status | Features |
|---------|---------|-------|--------|----------|
| `values-compass` ⭐ | Compass-pattern values showcase | 110 | **New v4.0** | Glassmorphism, progressive disclosure, animations |
| `hero-breadcrumb` | Page header with breadcrumbs | 35 | Core | Universal header |
| `feature-blocks` ⭐ | Zigzag image/text with parallax | 37 | **Enhanced v4.0** | Parallax scrolling, gradient overlays |
| `pricing-tables` ⭐ | Featured tier pricing cards | 80 | **Enhanced v4.0** | Featured elevation, tooltips, glassmorphism |
| `credentials-showcase` ⭐ | Professional credentials grid | 45 | **Enhanced v4.0** | Gradient icons, circular layout |
| `stats-numbers` ⭐ | Animated stats with progress rings | 50 | **Enhanced v4.0** | SVG rings, counting animation |
| `values-intro` | Intro section with image | 50 | Core | About, mission |
| `benefits-grid` | Icon-based benefits grid | 60 | Core | Value props (legacy) |
| `contact-form-enhanced` | Contact form with validation | 90 | Core | Contact pages |
| `faq-mini` | FAQ accordion | 40 | Core | Service FAQs |
| `video-popup` | Video section with lightbox | 45 | Core | Testimonials |
| `job-listings` | Career opportunities grid | 55 | Core | Careers |
| `testimonials` | Client testimonials | 48 | Core | Social proof |
| ... | (11 more core sections) | ... | Core | ... |

**Total**: 1,850+ lines across all sections
**Enhanced Components**: 5 premium redesigns with v4.0 Creative Design Excellence

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

## Design System v4.0 - Creative Design Excellence

### Color Palette (Psychology-Focused)
```toml
# Primary Colors
color_primary   = "#4DB380"  # Deep emerald (growth, healing, calm)
color_secondary = "#CC6B49"  # Terracotta (balance, warmth, grounding)

# Text Colors
text_color      = "#374151"  # Warm gray (approachable)
text_dark       = "#111827"  # Near black (clarity)
border_color    = "#D1D5DB"  # Neutral borders

# Enhanced v4.0 - 9-Step Tonal Scales
green-50 to green-900    # Emerald scale for gradients
terracotta-50 to terracotta-900  # Terracotta scale for accents
```

### Enhanced Design Tokens (v4.0)
**Gradients** (8 types):
- Warm gradients: emerald → terracotta transitions
- Radial gradients: organic spotlight effects
- Icon gradients: 4 color variants (emerald, terracotta, teal, amber)
- Glassmorphism: frosted glass backgrounds

**Organic Shapes**:
- 4 blob presets: soft, organic, smooth, gentle
- Dynamic border-radius for natural feel

**Animations** (10 keyframes):
- Entrance: fade-in (up/down/left/right), scale-in
- Interactive: pulse, float, gradient-shift
- Advanced: blob-morph, staggered-entrance

**Shadows**:
- Warm-tinted shadows (4 levels)
- Colored shadows (primary, secondary, featured)
- Glassmorphism shadows

### Typography
- **Headings**: Poppins (300-800 weights) - friendly, rounded
- **Body**: Open Sans (300-700 weights) - clear, professional
- **Base Size**: 17px (accessibility-first)
- **Scale**: 1.2 (minorThird - gentle hierarchy)
- **Brand Color Headings**: Enabled site-wide
- **Gradient Text**: Available for featured elements (v4.0)

### Component Libraries
**Core**:
- **Animations**: AOS (scroll animations) + Custom scroll triggers
- **Sliders**: Swiper.js
- **Parallax**: Custom lightweight implementation (v4.0)
- **Lightbox**: GLightbox
- **Cookie Notice**: Custom implementation

**Enhanced v4.0**:
- **Intersection Observer**: Viewport-triggered animations
- **Stats Counter**: Animated number counting
- **Progress Rings**: SVG circular indicators
- **Mobile Interactions**: Touch-optimized gestures

### Accessibility Features
- ♿ WCAG 2.1 AA compliant
- 🚫 `prefers-reduced-motion` support (all animations)
- ⌨️ Keyboard navigation optimized
- 🔊 Screen reader compatible (ARIA labels, semantic HTML)
- 🎨 High contrast mode support
- 📱 Touch targets: minimum 44px

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
# Test both languages (Romanian is default, no /ro/ prefix!)
http://localhost:1313/page-name      # Romanian (default language)
http://localhost:1313/en/page-name   # English (has /en/ prefix)

# Update translations in i18n/ro.yaml and i18n/en.yaml
```

**Important**: Romanian pages don't use `/ro/` prefix - they're served at root path because Romanian is the default language (`defaultContentLanguage = 'RO'`).

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

## Creative Design Enhancements v4.0 🎨

### Overview
**Version 4.0** introduces a comprehensive creative design system with 5 premium enhanced components featuring glassmorphism, organic shapes, warm gradients, and advanced animations.

### Enhanced Components

#### 1. Values Compass ⭐ *New Component*
**File**: `layouts/partials/sections/values-compass.html`
**Purpose**: Unique compass-pattern layout for showcasing core therapy values

**Features**:
- Compass-inspired arrangement (1 featured + 3 supporting values)
- Glassmorphism cards with frosted glass effect
- Progressive disclosure (hover reveals descriptions)
- Gradient icon circles (4 color variants)
- Staggered entrance animations
- Mobile tap-to-expand interactions
- WCAG AA accessible

**Usage**:
```yaml
sections:
  - type: "values-compass"
values_compass:
  title: "Core Values"
  benefits:
    - title: "Science-Based"
      icon: "flask"
      description: "Evidence-based therapeutic methods"
    # ... 3 more values
```

#### 2. Feature Blocks ⭐ *Enhanced*
**File**: `layouts/partials/sections/feature-blocks.html`
**Enhancements**: Zigzag layout + parallax scrolling

**Features**:
- Alternating left/right zigzag pattern
- Parallax image effects (desktop ≥992px)
- Diagonal section dividers
- Gradient text on hover
- Animated subtitle underlines
- Glassmorphism image wrappers

**New Classes**: `.feature-blocks-section`, `.feature-block-item`, `.parallax-enabled`

#### 3. Stats Numbers ⭐ *Enhanced*
**File**: `layouts/partials/sections/stats-numbers.html`
**Enhancements**: SVG progress rings + animated counting

**Features**:
- Circular SVG progress indicators
- Animated number counting (0 → target, 2s duration)
- Intersection Observer (viewport-triggered)
- 4 gradient ring color variants
- Glassmorphism card design
- Reduced motion support

**JavaScript**: `assets/js/stats-counter.js` (auto-loaded)

#### 4. Credentials Showcase ⭐ *Enhanced*
**File**: `layouts/partials/sections/credentials-showcase.html`
**Enhancements**: Gradient icons + circular grid

**Features**:
- Circular gradient icon backgrounds
- Glassmorphism badge design
- Enhanced hover (rotate 8° + scale 1.1)
- Responsive circular grid (2x2 → 2 cols → stack)
- Organic background blobs
- Warm gradient borders on hover

**Supported Variants**: `primary`, `success`, `info`, `warning`

#### 5. Pricing Tables ⭐ *Enhanced*
**File**: `layouts/partials/sections/pricing-tables.html`
**Enhancements**: Featured tier elevation + tooltips

**Features**:
- Featured card scaled 1.08x with badge
- Glassmorphism card backgrounds
- Comparison tooltips on hover
- Animated price transitions
- Enhanced monthly/yearly toggle
- Gradient checkmarks for features

**Featured Badge**: Set `featured: true` in pricing card data

### Design System Files

**Core Enhancement**: `assets/scss/_design-enhancements.scss` (440 lines)
- 8 new gradient types
- 4 organic blob shapes
- 10 animation keyframes
- Enhanced shadow system
- Glassmorphism utilities

**Component Styles**:
- `_values-compass.scss` (440 lines)
- `_stats-enhanced.scss` (260 lines)
- `_feature-blocks-enhanced.scss` (330 lines)
- `_pricing-enhanced.scss` (340 lines)
- `_credentials.scss` (enhanced, 220 lines)

**JavaScript** (~650 lines total):
- `values-compass-interactions.js` - Mobile touch interactions
- `stats-counter.js` - Animated counting + SVG rings
- `scroll-animations.js` - Parallax + scroll triggers

### Performance Impact

**Before v4.0**: ~140KB CSS, 0KB component JS
**After v4.0**: ~170KB CSS, ~8KB JS
**Gzipped**: +18KB total (~15KB CSS + ~3KB JS)

**Build Time**: Maintained <3s
**Animations**: 60fps on mid-range devices
**Accessibility**: WCAG 2.1 AA compliant

### Migration Notes

**Breaking Changes**: None - all enhancements are additive
**Backward Compatible**: Existing sections work unchanged
**Opt-in**: Use new section types or enhanced features as needed

**To Use Enhanced Components**:
1. Values Compass: Change section type to `values-compass`
2. Stats: Add JavaScript include for animated counting
3. Features/Pricing/Credentials: Auto-applied via enhanced SCSS

### Browser Support

**Tested**:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

**Graceful Degradation**: All features degrade gracefully in older browsers

---

**Document Version**: 4.0 | **Last Updated**: 2025-11-17 | **Creative Design Excellence** | **Tokens**: ~1,850
