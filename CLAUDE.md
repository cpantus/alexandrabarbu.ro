# Claude Instructions - Andromeda Hugo Theme

**Version**: 4.0.0 - Creative Design Excellence Edition

---

## CRITICAL Rules

1. **Run Hugo from theme directory**: `cd themes/andromeda-hugo && hugo server`
2. **Preserve multilingual**: Maintain RO (root path) + EN (`/en/`) content parity
3. **Flexible layout only**: Pages = Header + Sections (2-7) + Footer. Use 24 section types.
4. **Reuse components**: 5 atoms → 17 molecules → 2 organisms → 24 sections
5. **Test both languages**: Verify `/{page}` (RO) and `/en/{page}` (EN)
6. **Enhanced design system**: Use glassmorphism, gradients, and organic shapes (v4.0)

---

## Architecture

**Component Hierarchy** (v4.0 Enhanced):
```
Atoms (5)        → button, heading, icon, image, input
Molecules (17)   → card, form-field, accordion, nav, credential-badge, etc.
Organisms (2)    → header, footer
Sections (24)    → 19 core + 5 enhanced premium components

Page = Header + Sections Array + Footer
```

**File Structure**:
```
layouts/
├── _default/flexible.html      # Layout engine (STABLE)
└── partials/
    ├── atoms/                  # 5 basic components
    ├── molecules/              # 17 composite components
    ├── organisms/              # 2 complex (header, footer)
    └── sections/               # 24 page sections (5 enhanced v4.0)

assets/
├── scss/
│   ├── _design-enhancements.scss      # v4.0 design system
│   └── components/
│       ├── _values-compass.scss       # New v4.0
│       ├── _stats-enhanced.scss       # Enhanced v4.0
│       ├── _feature-blocks-enhanced.scss  # Enhanced v4.0
│       ├── _pricing-enhanced.scss     # Enhanced v4.0
│       └── _credentials.scss          # Enhanced v4.0
└── js/
    ├── values-compass-interactions.js # Mobile touch
    ├── stats-counter.js               # Animated counting
    └── scroll-animations.js           # Parallax + scroll effects
```

---

## Available Sections (24)

**Core**: hero-breadcrumb, values-intro, feature-details, blog-grid, cta-standard
**Interactive**: video-popup, faq-mini, faq-content, method-tabs
**Forms**: contact-form-enhanced, signup-form-enhanced, newsletter-signup
**Info**: contact-info-cards, onboarding-steps, privacy-guarantee, confidentiality-notice, job-listings
**Enhanced v4.0** ⭐:
- `values-compass` - Compass-pattern layout with glassmorphism (NEW)
- `feature-blocks` - Zigzag layout with parallax scrolling
- `pricing-tables` - Featured tier elevation with tooltips
- `stats-numbers` - SVG progress rings with animated counting
- `credentials-showcase` - Gradient icons with circular grid
**Legacy**: benefits-grid (use values-compass instead), problem-empathy, timeline-process, related-services, service-highlights

---

## Quick Start

### Create Page (30 seconds)
```yaml
# content/english/services/therapy.md
---
title: "Individual Therapy"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "benefits-grid"

hero_breadcrumb:
  title: "Individual Therapy"
  subtitle: "Evidence-based approach"

benefits_section:
  title: "Why Choose Us"
  benefits:
    - icon: "las la-check"
      title: "Evidence-Based"
      description: "CBT, DBT, ACT methods"
---
```

### Use Archetypes (Faster)
```bash
hugo new content/services/therapy.md --kind service-page
hugo new content/therapy/cbt.md --kind therapy-page
hugo new content/landing/promo.md --kind landing-page
```

---

## Language URL Structure

| Language | URL | Content Path |
|----------|-----|--------------|
| Romanian (default) | `/servicii/` | `content/romanian/` |
| English | `/en/services/` | `content/english/` |

**Common Mistakes**:
- ❌ `/ro/contact` - Returns 404 (RO is default, no prefix)
- ✅ `/contact` - Correct for Romanian
- ✅ `/en/contact` - Correct for English

**In Templates**: Use `.RelPermalink` (Hugo handles language prefixes)

---

## Development Commands

```bash
cd themes/andromeda-hugo               # MUST run from theme directory
hugo server --buildDrafts              # Dev server
hugo --gc --minify                     # Production build
hugo --templateMetrics                 # Performance check
../../scripts/test-components.sh       # Verify 48 components
```

---

## Data Hierarchy

**Front Matter** (page-specific):
```yaml
hero_breadcrumb:
  title: "Unique Title"
```

**Shared Data** (`data/shared_sections.yaml`):
```yaml
pricing_plans:
  basic: {...}
  premium: {...}
```

**Site Params** (`config/_default/params.toml`):
```toml
[params.design]
headings_brand_color = true
```

**Access Pattern**:
```html
{{ .Params.hero_breadcrumb.title }}              # Front matter
{{ site.Data.shared_sections.pricing_plans }}    # Shared data
{{ site.Params.design.headings_brand_color }}    # Site params
```

---

## Design System

**Colors**:
- Primary: `#4DB380` (emerald - growth)
- Secondary: `#CC6B49` (terracotta - balance)
- Text: `#374151` (warm gray)

**Typography**:
- Headings: Poppins (300-700)
- Body: Open Sans (300-700)
- Base: 17px

**Breakpoints**:
```
sm: 576px | md: 768px | lg: 992px | xl: 1200px
```

---

## Common Tasks

### Add New Section
```bash
# 1. Check existing sections first
ls layouts/partials/sections/

# 2. Create section (if unique)
touch layouts/partials/sections/my-section.html

# 3. Register in flexible.html (line 22-82)
# 4. Use in page front matter
```

**Section Template** (< 80 lines, data-driven, null-safe):
```html
{{- $section := .Params.my_section -}}
{{- if $section -}}
<section class="section">
  <div class="container">
    <h2>{{ $section.title }}</h2>
    {{- range $section.items -}}
      {{ partial "molecules/card.html" (dict "title" .title "variant" "feature") }}
    {{- end -}}
  </div>
</section>
{{- end -}}
```

### Add Translation
```yaml
# i18n/ro.yaml
my_key: "Text în română"

# i18n/en.yaml
my_key: "Text in English"
```

**Usage**: `{{ i18n "my_key" }}`

### Update Navigation
```toml
# config/_default/menus.ro.toml
[[main]]
name = "Servicii"
url = "servicii/"  # Relative URL (Hugo serves at root)
weight = 2

# config/_default/menus.en.toml
[[main]]
name = "Services"
url = "services/"  # Hugo adds /en/ automatically
weight = 2
```

---

## Component Composition

**Use Existing Components**:
```html
<!-- ❌ Don't duplicate buttons -->
<a href="{{ .url }}" class="btn btn-primary">{{ .text }}</a>

<!-- ✅ Use atom -->
{{ partial "atoms/button.html" (dict "text" .text "url" .url "variant" "primary") }}
```

**Props Pattern**:
```html
{{ partial "atoms/button.html" (dict
  "text" "Click Me"
  "url" "/contact"
  "variant" "primary"
  "icon" "las la-arrow-right"
) }}
```

---

## Quality Standards

**Code Style**:
- Indentation: 2 spaces
- Whitespace: Use `{{- -}}`
- Null safety: Always check `if $var`

**Performance**:
- Sections: < 80 lines
- Build: < 3s
- Images: WebP + srcset + lazy loading
- Caching: `{{ partialCached "organisms/header.html" . .Language }}`

**Accessibility**:
- Alt text: Required
- Semantic HTML: `<section>`, `<article>`, `<nav>`
- Color contrast: WCAG AA (4.5:1)
- ARIA labels: For icon-only buttons

---

## Testing Checklist

- [ ] Both languages (RO root, EN `/en/`)
- [ ] Responsive (375px, 768px, 1200px)
- [ ] No console errors
- [ ] Build succeeds (`hugo --gc --minify`)
- [ ] Images load with alt text
- [ ] Links functional
- [ ] Performance: `hugo --templateMetrics`

---

## Common Pitfalls

**Section doesn't render**:
```yaml
sections:
  - type: "my-section"  # ✅ Type added

my_section:             # ❌ Data missing (add this!)
  title: "Title"
```

**Image not loading**:
```yaml
# ✅ Correct
image: "images/feature.png"

# ❌ Wrong
image: "/assets/images/feature.png"
```

**Build fails**:
```bash
hugo --verbose --debug  # Check template syntax
```

---

## File Modification Rules

**✅ SAFE**:
- `content/**/*.md` (maintain RO + EN parity)
- `layouts/partials/sections/*.html`
- `data/shared_sections.yaml`
- `config/_default/params.toml`
- `i18n/*.yaml`

**⚠️ CAUTION**:
- `layouts/_default/flexible.html` (stable, rarely changes)
- `hugo.toml`

**❌ DON'T MODIFY**:
- `node_modules/`, `public/`, `resources/`

---

## Documentation

**Read First**: `PROJECT.md` (architecture), `README.md` (quick start), `ARCHITECTURE.md` (technical)
**Component API**: `docs/components/` (inside theme directory)
**Data Conventions**: `docs/DATA-CONVENTIONS.md`
**Tests**: `../../scripts/test-components.sh` (verify 48 components)

---

## Summary

**Every Task**:
1. Read `PROJECT.md` (first time)
2. Use flexible layout pattern
3. Check existing sections before creating
4. Test both RO + EN
5. Verify responsive
6. Run `hugo --gc --minify`

**Component Creation**:
- < 80 lines (sections)
- Data-driven (no hardcoded text)
- Null-safe (`if` checks)
- Compose from atoms/molecules

---

## v4.0 Creative Design Enhancements 🎨

**NEW**: 5 premium enhanced components with warm, approachable psychology design

### Values Compass (NEW)
```yaml
sections:
  - type: "values-compass"
values_compass:
  title: "Core Values"
  benefits:
    - title: "Science-Based"
      icon: "flask"
      description: "Evidence-based CBT, DBT, ACT methods"
```
**Features**: Compass layout, glassmorphism, progressive disclosure, gradient icons, mobile tap-to-expand

### Enhanced Components (AUTO-APPLIED)
- **Feature Blocks**: Zigzag layout + parallax scrolling (desktop ≥992px)
- **Pricing Tables**: Featured tier 1.08x scale + comparison tooltips
- **Stats Numbers**: SVG progress rings + animated counting (0→target, 2s)
- **Credentials**: Gradient icon circles + glassmorphism badges

### Design System v4.0
**8 New Gradients**: warm (emerald→terracotta), radial, glassmorphism, icon variants
**10 Animations**: fade-in (4 directions), pulse, float, gradient-shift, blob-morph, staggered-entrance
**4 Organic Blobs**: soft, organic, smooth, gentle border-radius presets
**Accessibility**: WCAG AA, reduced-motion support, keyboard nav, touch-optimized

### Performance
**Added**: +18KB gzipped (+15KB CSS + ~3KB JS)
**Build**: Maintained <3s
**Animations**: 60fps GPU-accelerated

---

**Status**: Production Ready ✅ | 53 components | <3s builds | <520KB pages | WebP images | Multilingual | **Creative Design Excellence v4.0**

**Version**: 4.0.0 | **Updated**: 2025-11-17 | **Hugo**: v0.148.1 extended
