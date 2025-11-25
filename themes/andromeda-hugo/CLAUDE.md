# Claude Instructions - Andromeda Hugo Theme

**Version**: 5.0.0 - Creative Design Excellence + ITCSS Architecture

---

## CRITICAL Rules

**⚠️ CSS Override Prevention Protocol**
When modifying existing styles: 1) Read the target file first to understand current implementation, 2) Check for competing selectors if unexpected behavior occurs (`rg "selector" assets/scss`), 3) Use `!important` sparingly and only when specificity conflicts are confirmed.

1. **Run Hugo from theme directory**: `cd themes/andromeda-hugo && hugo server`
2. **Preserve multilingual**: Maintain RO (root path) + EN (`/en/`) content parity
3. **Flexible layout only**: Pages = Header + Sections (2-7) + Footer. Use 21 section types.
4. **Reuse components**: 5 atoms → 21 molecules → 2 organisms → 21 sections
5. **Test both languages**: Verify `/{page}` (RO) and `/en/{page}` (EN)
6. **Enhanced design system**: Use glassmorphism, gradients, and organic shapes (v4.0)

---

## Architecture

**Component Hierarchy** (v4.0 Enhanced):
```
Atoms (5)        → button, heading, icon, image, input
Molecules (21)   → card, form-field, accordion, nav, credential-badge, etc.
Organisms (2)    → header, footer
Sections (21)    → 12 core + 4 specialized + 5 enhanced premium components

Page = Header + Sections Array + Footer
```

**File Structure**:
```
layouts/
├── _default/flexible.html      # Layout engine (STABLE)
└── partials/
    ├── atoms/                  # 5 basic components
    ├── molecules/              # 21 composite components
    ├── organisms/              # 2 complex (header, footer)
    └── sections/               # 21 page sections (5 enhanced v4.0)

assets/scss/                    # ITCSS Architecture (v5.0.0) ✅
├── main-new.scss               # ITCSS entry point (ACTIVE)
├── 01-settings/                # Design tokens (8 files - variables only)
│   ├── _tokens-colors.scss
│   ├── _tokens-typography.scss
│   ├── _tokens-spacing.scss
│   ├── _tokens-shadows.scss
│   ├── _tokens-motion.scss
│   ├── _tokens-gradients.scss
│   └── _tokens-components.scss
├── 02-tools/                   # Mixins & functions (no CSS output)
│   ├── _mixins-card.scss
│   ├── _mixins-icon.scss
│   ├── _mixins-glassmorphism.scss
│   └── _functions-colors.scss
├── 03-generic/                 # CSS resets, normalize
├── 05-objects/                 # Layout primitives (.o-container, .o-grid)
└── 06-components/              # 20 BEM components (.c-*)
    ├── _card.scss              # All v4.0 features preserved
    ├── _button.scss
    ├── _icon.scss
    ├── _badge.scss
    ├── _values-compass.scss    # New v4.0
    ├── _stats.scss             # Enhanced v4.0
    ├── _feature-blocks.scss    # Enhanced v4.0
    ├── _pricing.scss           # Enhanced v4.0
    ├── _credentials.scss       # Enhanced v4.0
    └── ... (11 more BEM components)

assets/js/
├── values-compass-interactions.js # Mobile touch
├── stats-counter.js               # Animated counting
└── scroll-animations.js           # Parallax + scroll effects
```

**SCSS Architecture**: The theme uses ITCSS (Inverted Triangle CSS) + BEM naming for scalable, maintainable styling. All v4.0 design features are preserved.

**For SCSS/styling work**: See `ARCHITECTURE.md` (complete ITCSS guide) and `CLAUDE-ITCSS-ADDENDUM.md` (quick reference).

---

## Active Sections (26 total)

**Core (5)**: hero-breadcrumb, values-intro, blog-grid, cta-standard, feature-details
**Interactive (4)**: video-popup, faq-mini, faq-content, method-tabs
**Forms (3)**: contact-form-enhanced, signup-form-enhanced, newsletter-signup
**Trust (5)**: contact-info-cards, contact-options, privacy-guarantee, onboarding-steps, confidentiality-notice
**Enhanced v4.0 (5)** ⭐: values-compass, feature-blocks, pricing-tables, stats-numbers, credentials-showcase
**Specialized (4)**: first-session-timeline, service-faq-inline, testimonials-enhanced, problem-empathy

**Deprecated (8)**: benefits-grid, service-highlights, timeline-process, related-services, professional-affiliations, therapist-match, office-gallery, job-listings

---

## Quick Start

**Page Template** (30s):
```yaml
---
title: "Page Title"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "values-compass"

hero_breadcrumb:
  title: "Title"
  subtitle: "Subtitle"

values_compass:
  title: "Core Values"
  benefits:
    - title: "Science-Based"
      icon: "flask"
      description: "Evidence-based methods"
---
```

**Archetypes**: `hugo new content/services/page.md --kind service-page`

**Languages**: RO (root `/`) + EN (`/en/`) | Use `.RelPermalink` in templates

**Commands**:
```bash
cd themes/andromeda-hugo          # REQUIRED
hugo server --buildDrafts         # Dev
hugo --gc --minify               # Production
```

---

## Data Access

**Front Matter**: `{{ .Params.hero_breadcrumb.title }}`
**Shared Data**: `{{ site.Data.shared_sections.pricing_plans }}`
**Site Params**: `{{ site.Params.design.headings_brand_color }}`

---

## Color System (Auto v4.1+)

**3-Tier Auto Distribution**:
1. Smart defaults (position-based)
2. CSS nth-child fallback
3. Manual override (highest priority)

**Palettes**: default (50/50 emerald/terracotta), warm (75% terracotta), professional (75% emerald), badge (8-color rotation)

**Button Variants**: primary (emerald), secondary (terracotta), outline-primary, outline-secondary

**Badge Variants (8)**: primary, secondary, coral, premium, sage, info, success, warning

**Usage** (auto):
```yaml
related_services:
  services:
    - title: "Service 1"  # Auto: primary
    - title: "Service 2"  # Auto: secondary
```

**Override**:
```yaml
related_services:
  color_theme: "warm"     # Section level
  services:
    - title: "Service 1"
      button_variant: "secondary"  # Item level
```

---

## Design System

**Colors**: Primary #234E3E (forest green), Secondary #6B9080 (sage green), Accent #D4AF37 (gold), Text #374151
**Typography**: Playfair Display (serif headings) + DM Sans (sans body) | Base 16px
**Breakpoints**: sm:576px | md:768px | lg:992px | xl:1200px

---

## Common Tasks

**New Section**:
1. Check existing: `ls layouts/partials/sections/`
2. Create: `touch layouts/partials/sections/name.html`
3. Register in `flexible.html` (lines 22-82)
4. Template: <80 lines, data-driven, null-safe

**Translation**: Add to `i18n/ro.yaml` + `i18n/en.yaml` | Use `{{ i18n "key" }}`

**Navigation**: Update `config/_default/menus.{ro,en}.toml`

**Component Reuse**:
```html
<!-- ✅ Good -->
{{ partial "atoms/button.html" (dict "text" .text "url" .url "variant" "primary") }}

<!-- ❌ Bad -->
<a href="{{ .url }}" class="btn btn-primary">{{ .text }}</a>
```

---

## Quality

**Code**: 2-space indent | `{{- -}}` whitespace | Null-safe `if $var`
**Performance**: Sections <80 lines | Build <3s | WebP+srcset+lazy | Cache partials
**Accessibility**: Alt text | Semantic HTML | WCAG AA 4.5:1 | ARIA labels

---

## Testing

- [ ] Both RO + EN languages
- [ ] Responsive 375/768/1200px
- [ ] No console errors
- [ ] Build succeeds
- [ ] Images load
- [ ] Links work

---

## Troubleshooting

**Section missing**: Add section data + type in front matter
**Image 404**: Use `images/file.png` (not `/assets/`)
**Build fails**: `hugo --verbose --debug`

---

## Files

**✅ Safe**: content/\*\*/\*.md, layouts/partials/sections/\*.html, data/\*.yaml, config/\*.toml, i18n/\*.yaml
**⚠️ Caution**: layouts/_default/flexible.html, hugo.toml
**❌ Never**: node_modules/, public/, resources/

---

## Docs

**Read**: PROJECT.md (arch), README.md (quick), ARCHITECTURE.md (tech)
**API**: docs/components/
**Test**: ../../scripts/test-components.sh

---

## Workflow

**Every Task**: Read PROJECT.md → Use flexible layout → Check existing → Test RO+EN → Verify responsive → Build
**Component**: <80 lines | Data-driven | Null-safe | Compose atoms/molecules

---

## v4.0 Enhancements 🎨

**5 Premium Components**: values-compass (NEW), feature-blocks, pricing-tables, stats-numbers, credentials-showcase

**Features**: Glassmorphism | Gradient icons | Parallax (≥992px) | SVG progress rings | Animated counting | Organic blobs | Staggered animations

**values-compass Example**:
```yaml
sections:
  - type: "values-compass"
values_compass:
  title: "Core Values"
  benefits:
    - title: "Science-Based"
      icon: "flask"
      description: "Evidence-based CBT, DBT, ACT"
```

**feature-blocks**: Zigzag + parallax
**pricing-tables**: Featured tier 1.08x scale + tooltips
**stats-numbers**: SVG rings + counting (0→target, 2s)
**credentials-showcase**: Gradient circles + badges

**Performance**: +18KB gzipped (+15KB CSS +3KB JS) | Build <3s ✅ | 60fps GPU

**v4.0 Design System**:
- 8 gradients (warm, radial, glass, icon)
- 10 animations (fade-in 4dir, pulse, float, gradient-shift, blob-morph, stagger)
- 4 organic blobs (soft, organic, smooth, gentle)
- WCAG AA | Reduced-motion support | Keyboard nav | Touch-optimized

---

**Status**: Production ✅ | 26 active sections | <3s builds | <520KB pages | WebP | Multilingual | **v5.0: ITCSS + BEM + v4.0 Design**

**Version**: 5.0.1 | **Updated**: 2025-11-20 | **Hugo**: v0.148.1 extended | **Architecture**: ITCSS + BEM
