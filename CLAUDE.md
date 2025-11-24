# Claude Instructions - Andromeda Hugo Theme

## CRITICAL Rules

1. **Run Hugo from project root**: `hugo server` (always from /home/cere/Work/alex/alexandrabarbu.ro/)
2. **Preserve multilingual**: Maintain RO (root path) + EN (`/en/`) content parity
3. **Flexible layout**: Pages = Header + Sections (2-7) + Footer. 36 section types available
4. **Reuse components**: 9 atoms → 24 molecules → 2 organisms → 36 sections = 71 components
5. **Test both languages**: Verify `/{page}` (RO) and `/en/{page}` (EN)

---

## Architecture

**Component Hierarchy**:
```
Atoms (9)        → button, heading, icon, image, tag, divider, link, spinner, avatar
Molecules (24)   → card, form-field, accordion, nav, credential-badge, social-links, etc.
Organisms (2)    → header, footer
Sections (36)    → hero, cta, pricing, testimonials, faq, contact, stats, etc.
Page = Header + Sections Array + Footer
```

**File Structure**:
```
alexandrabarbu.ro/              # ← PROJECT ROOT
├── layouts/partials/
│   ├── atoms/ molecules/ organisms/ sections/
│   └── _default/flexible.html  # Layout engine (STABLE)
├── assets/
│   ├── scss/                   # ITCSS Architecture
│   │   ├── main-new.scss       # Entry point
│   │   ├── 01-settings/        # Design tokens
│   │   ├── 02-tools/           # Mixins & functions
│   │   ├── 03-generic/         # Resets
│   │   ├── 05-objects/         # Layout primitives
│   │   └── 06-components/      # BEM components
│   └── js/                     # Vanilla JS (no Bootstrap)
├── content/ config/ data/ i18n/
```

**SCSS**: ITCSS + BEM. See `ARCHITECTURE.md` and `CLAUDE-ITCSS-ADDENDUM.md` for details.

---

## Available Sections

**Core (4)**: hero-breadcrumb, values-intro, blog-grid, cta-standard
**Interactive (3)**: video-popup, faq-mini, method-tabs
**Forms (3)**: contact-form-enhanced, signup-form-enhanced, newsletter-signup
**Trust (6)**: contact-info-cards, contact-options, onboarding-steps, privacy-guarantee, job-listings, professional-affiliations
**Enhanced (5)**: values-compass, feature-blocks, pricing-tables, stats-numbers, credentials-showcase
**Therapy (2)**: therapist-match, testimonials-enhanced
**General (5)**: benefits-grid, problem-empathy, timeline-process, related-services, service-highlights

---

## Quick Start

**Create Page**:
```yaml
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
---
```

**Archetypes**:
```bash
hugo new content/services/therapy.md --kind service-page
```

---

## Language URLs

| Language | URL | Path |
|----------|-----|------|
| Romanian | `/servicii/` | `content/romanian/` |
| English | `/en/services/` | `content/english/` |

**Common Mistakes**:
- ❌ `/ro/contact` (RO is default, no prefix)
- ✅ `/contact` (Romanian)
- ✅ `/en/contact` (English)

---

## Commands

```bash
hugo server --buildDrafts              # Dev server
hugo --gc --minify                     # Production
hugo --templateMetrics                 # Performance check
```

---

## Data Hierarchy

```yaml
# Front matter (page-specific)
hero_breadcrumb:
  title: "Unique Title"
```

```yaml
# data/shared_sections.yaml (shared)
pricing_plans:
  basic: {...}
```

```toml
# config/_default/params.toml (site)
[params.design]
headings_brand_color = true
```

**Access**:
```html
{{ .Params.hero_breadcrumb.title }}
{{ site.Data.shared_sections.pricing_plans }}
{{ site.Params.design.headings_brand_color }}
```

---

## Color Variants

**Buttons**: primary (forest), secondary (sage), outline-primary, outline-secondary
**Strategy**: 50-60% forest, 20-30% sage, 10-20% accents

**Pattern**:
```yaml
- type: "hero-breadcrumb"
  button_variant: "primary"      # Forest (trust)
- type: "values-compass"
  button_variant: "secondary"    # Sage (calm)
```

**Badge Variants**: primary, secondary, coral, premium, sage, info, success, warning

---

## Design System

**Colors**: Primary `#234E3E` (forest), Secondary `#6B9080` (sage), Accent `#D4AF37` (gold), Text `#374151`
**Typography**: Crimson Pro (headings), Work Sans (body), 16px base
**Breakpoints**: sm:576px, md:768px, lg:992px, xl:1200px

---

## Common Tasks

**Add Section**:
```bash
ls layouts/partials/sections/        # Check existing
touch layouts/partials/sections/my-section.html
# Register in flexible.html (line 22-82)
```

**Section Template** (<80 lines, data-driven, null-safe):
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

**Add Translation**:
```yaml
# i18n/ro.yaml
my_key: "Text în română"
```
Usage: `{{ i18n "my_key" }}`

**Update Nav**:
```toml
# config/_default/menus.ro.toml
[[main]]
name = "Servicii"
url = "servicii/"
weight = 2
```

---

## Component Composition

```html
<!-- ❌ Don't duplicate -->
<a href="{{ .url }}" class="btn">{{ .text }}</a>

<!-- ✅ Use atom -->
{{ partial "atoms/button.html" (dict "text" .text "url" .url "variant" "primary") }}
```

---

## Quality Standards

**Code**: 2-space indent, `{{- -}}` whitespace, null checks
**Performance**: <80 lines/section, <3s build, WebP images, `partialCached`
**Accessibility**: Alt text, semantic HTML, WCAG AA (4.5:1), ARIA labels

---

## Testing Checklist

- [ ] Both languages (RO root, EN `/en/`)
- [ ] Responsive (375px, 768px, 1200px)
- [ ] No console errors
- [ ] Build succeeds
- [ ] Images load with alt text
- [ ] Links work

---

## Pitfalls

**Section missing**:
```yaml
sections:
  - type: "my-section"  # ✅ Type added
my_section:             # ❌ Data missing
  title: "Title"
```

**Image path**:
```yaml
# ✅ Correct
image: "images/feature.png"
# ❌ Wrong
image: "/assets/images/feature.png"
```

---

## File Modification

**✅ SAFE**: `content/**/*.md`, `layouts/partials/sections/*.html`, `data/shared_sections.yaml`, `config/_default/params.toml`, `i18n/*.yaml`
**⚠️ CAUTION**: `layouts/_default/flexible.html`, `hugo.toml`
**❌ DON'T**: `node_modules/`, `public/`, `resources/`

---

## Documentation

**Read**: `PROJECT.md` (architecture), `README.md` (quick start), `ARCHITECTURE.md` (technical), `docs/components/`, `docs/DATA-CONVENTIONS.md`

---

## Summary

**Every Task**: Check existing sections, use flexible layout, test RO+EN, verify responsive, run `hugo --gc --minify`
**Component Creation**: <80 lines, data-driven, null-safe, compose from atoms/molecules

---

## Enhanced Design Features

**Values Compass**: Compass layout, glassmorphism, progressive disclosure, mobile tap-to-expand
**Feature Blocks**: Zigzag + parallax (desktop ≥992px)
**Pricing**: Featured tier elevation + tooltips
**Stats**: SVG rings + animated counting
**Credentials**: Gradient circles + glassmorphism

**Design System Additions**: 8 gradients, 10 animations, 4 organic blob presets, WCAG AA, reduced-motion support
**Performance**: +18KB gzipped, <3s builds, 60fps animations

---

**Status**: Production Ready ✅ | 71 components | <3s builds | <520KB pages | ITCSS + BEM | Crimson Pro + Work Sans
