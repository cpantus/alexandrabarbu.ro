# Claude Instructions - Andromeda Hugo Theme

**Version**: 5.1.0 - Complete 2025 Refactor + ITCSS Architecture

---

## CRITICAL Rules

1. **Run Hugo from project root**: `hugo server` (always from /home/cere/Work/alex/alexandrabarbu.ro/)
2. **Preserve multilingual**: Maintain RO (root path) + EN (`/en/`) content parity
3. **Flexible layout only**: Pages = Header + Sections (2-7) + Footer. Use 26 active section types.
4. **Reuse components**: 9 atoms → 29 molecules → 2 organisms → 26 sections = **66 components**
5. **Test both languages**: Verify `/{page}` (RO) and `/en/{page}` (EN)
6. **Enhanced design system**: Use glassmorphism, gradients, and organic shapes (v4.0)

---

## Architecture

**Component Hierarchy** (2025 Refactor Complete):
```
Atoms (9)        → button, heading, icon, image, tag, divider, link, spinner, avatar
Molecules (29)   → card, form-field, accordion, nav, credential-badge, social-links, etc.
Organisms (2)    → header, footer
Sections (26)    → 5 core + 4 interactive + 3 forms + 5 trust + 5 enhanced v4.0 + 4 specialized

Page = Header + Sections Array + Footer
```

**File Structure** (Flattened - No theme subdirectory!):
```
alexandrabarbu.ro/              # ← PROJECT ROOT (run Hugo here)
├── layouts/                    # Hugo templates (root level)
│   ├── _default/flexible.html  # Layout engine (STABLE)
│   └── partials/
│       ├── atoms/              # 5 basic components
│       ├── molecules/          # 21 composite components
│       ├── organisms/          # 2 complex (header, footer)
│       └── sections/           # 21 page sections (5 enhanced v4.0, 1 _deprecated dir)
│
├── assets/                     # Assets at root level (NOT in themes/)
│   ├── scss/                   # ITCSS Architecture (v5.0.0) ✅
│   │   ├── main-new.scss       # ITCSS entry point (ACTIVE)
│   │   ├── 01-settings/        # Design tokens (variables only)
│   │   │   ├── _tokens-colors.scss
│   │   │   ├── _tokens-typography.scss  # Crimson Pro + Work Sans
│   │   │   ├── _tokens-spacing.scss
│   │   │   ├── _tokens-shadows.scss
│   │   │   ├── _tokens-motion.scss
│   │   │   ├── _tokens-gradients.scss
│   │   │   └── _tokens-components.scss
│   │   ├── 02-tools/           # Mixins & functions (no CSS output)
│   │   │   ├── _mixins-card.scss
│   │   │   ├── _mixins-icon.scss
│   │   │   ├── _mixins-glassmorphism.scss
│   │   │   └── _functions-colors.scss
│   │   ├── 03-generic/         # CSS resets, normalize
│   │   ├── 05-objects/         # Layout primitives (.o-container, .o-grid)
│   │   └── 06-components/      # 20 BEM components (.c-*)
│   │       ├── _card.scss      # All v4.0 features preserved
│   │       ├── _button.scss
│   │       ├── _icon.scss
│   │       ├── _badge.scss
│   │       ├── _values-compass.scss    # New v4.0
│   │       ├── _stats.scss             # Enhanced v4.0
│   │       ├── _feature-blocks.scss    # Enhanced v4.0
│   │       ├── _pricing.scss           # Enhanced v4.0
│   │       ├── _credentials.scss       # Enhanced v4.0
│   │       └── ... (11 more BEM components)
│   │
│   └── js/                     # JavaScript at root level
│       ├── vanilla-collapse.js # Mobile nav, accordions (replaces Bootstrap)
│       ├── vanilla-dropdown.js # Navigation dropdowns (replaces Bootstrap)
│       ├── values-compass-interactions.js # Mobile touch
│       ├── stats-counter.js    # Animated counting
│       ├── scroll-animations.js # Parallax + scroll effects
│       └── gsap-enhancements.js # GSAP animations
│
├── content/                    # Site content (root level)
├── config/                     # Hugo configuration
├── data/                       # Data files
└── i18n/                       # Translations
```

**IMPORTANT**: Structure was flattened in commit 4886ab2. No `themes/andromeda-hugo/` directory exists!

**SCSS Architecture**: The theme uses ITCSS (Inverted Triangle CSS) + BEM naming for scalable, maintainable styling. All v4.0 design features are preserved.

**For SCSS/styling work**: See `ARCHITECTURE.md` (Hugo components) and `CLAUDE-ITCSS-ADDENDUM.md` (ITCSS quick reference).

---

## Available Sections (34)

### Core Foundation (5)
Essential page components for structure and navigation:
- `hero-breadcrumb` - Page header with title, subtitle, breadcrumb navigation
- `values-intro` - Value proposition introduction with CTAs
- `feature-details` - Detailed feature showcase
- `blog-grid` - Blog post grid with pagination
- `cta-standard` - Standard call-to-action section

### Interactive (4)
Engagement components with user interaction:
- `video-popup` - Video modal with play button overlay
- `faq-mini` - Compact FAQ accordion (3-5 questions)
- `faq-content` - Full FAQ section with categorization
- `method-tabs` - Tabbed content switcher for methodology

### Forms (3)
User input and data collection:
- `contact-form-enhanced` - Full contact form with validation
- `signup-form-enhanced` - Newsletter/service signup form
- `newsletter-signup` - Simple email subscription

### Info & Trust (7)
Trust-building and informational components:
- `contact-info-cards` - Contact methods (phone, email, location)
- `contact-options` - Alternative contact channels
- `onboarding-steps` - Process timeline for new clients
- `privacy-guarantee` - Privacy and confidentiality assurance
- `confidentiality-notice` - Legal confidentiality notice
- `job-listings` - Career opportunities section
- `professional-affiliations` - Credentials and memberships

### Enhanced v4.0 (5) ⭐
Premium components with glassmorphism, gradients, and animations:
- `values-compass` - Compass-pattern layout with glassmorphism (NEW)
- `feature-blocks` - Zigzag layout with parallax scrolling
- `pricing-tables` - Featured tier elevation with comparison tooltips
- `stats-numbers` - SVG progress rings with animated counting
- `credentials-showcase` - Gradient icon circles with credential badges

### Specialized Therapy (5)
Psychology practice-specific sections:
- `first-session-timeline` - What to expect in first session
- `therapist-match` - Therapist compatibility assessment
- `service-faq-inline` - Service-specific inline FAQ
- `testimonials-enhanced` - Client testimonials with photos
- `office-gallery` - Office photos with lightbox

### General Purpose (5)
Reusable content sections (consider upgrading to v4.0 equivalents):
- `benefits-grid` - Grid of benefits/features (v4.0: use values-compass)
- `problem-empathy` - Problem statement with empathy
- `timeline-process` - Linear process timeline
- `related-services` - Cross-sell related services
- `service-highlights` - Service feature highlights

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
hugo server --buildDrafts              # Dev server (MUST run from project root!)
hugo --gc --minify                     # Production build
hugo --templateMetrics                 # Performance check
scripts/test-components.sh             # Verify 49 components (5+21+2+21)
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

## Color Variant Usage Guidelines

### Button Variants Strategy

Achieve balanced color distribution (50-60% emerald, 20-30% terracotta, 10-20% supporting colors) through strategic variant assignment:

**Available Button Variants:**
- `primary` (emerald) - Main actions, trust signals
- `secondary` (terracotta) - Warm actions, personal connection
- `outline-primary` (emerald outline) - Secondary actions
- `outline-secondary` (terracotta outline) - Tertiary actions

**Selection Decision Tree:**
1. **Hero/CTA sections** → Use `primary` (emerald - trust, expertise)
2. **Personal/warm sections** → Use `secondary` (terracotta - connection, warmth)
3. **Alternating pattern** → Avoid color monotony by varying adjacent sections
4. **Hierarchy** → Primary > Secondary > Outline-primary > Outline-secondary

**Visual Rhythm Pattern (Recommended):**
```yaml
sections:
  - type: "hero-breadcrumb"
    button_variant: "primary"           # Section 1: Emerald (trust)
  - type: "values-compass"
    button_variant: "secondary"         # Section 2: Terracotta (warmth)
  - type: "feature-blocks"
    button_variant: "outline-primary"   # Section 3: Emerald outline
  - type: "testimonials"
    button_variant: "secondary"         # Section 4: Terracotta (personal)
  - type: "cta-standard"
    button_variant: "primary"           # Section 5: Emerald (action)
```

### Credential Badge Variants

**8 Available Variants:**
- `primary` (emerald gradient) - Main credentials, certifications
- `secondary` (terracotta gradient) - Warm trust signals
- `coral` (coral gradient) - Compassionate qualities
- `premium` (plum gradient) - Premium/specialized credentials
- `sage` (sage gradient) - Calm/holistic approaches
- `info` (blue gradient) - Educational background
- `success` (green gradient) - Achievements
- `warning` (amber gradient) - Important notices

**Semantic Usage:**
```yaml
credentials_showcase:
  credentials:
    - badge_variant: "primary"      # Licensed Psychologist
    - badge_variant: "secondary"    # 15+ years experience
    - badge_variant: "coral"        # Person-centered approach
    - badge_variant: "premium"      # Trauma specialist
```

**Balance Guidelines:**
- **Homepage:** Mix 3-4 different badge variants (avoid all-emerald)
- **Service pages:** 2-3 variants focused on service theme
- **About page:** 4-6 variants showcasing full credentials

### Common Mistakes to Avoid

❌ **All sections use primary variant** → 90% emerald monotony
✅ **Alternating pattern** → Balanced 50-60% emerald, 20-30% terracotta

❌ **Random variant selection** → Visual chaos
✅ **Semantic selection** → Trust/action = primary, warmth/personal = secondary

❌ **All credentials same color** → Bland, undifferentiated
✅ **Mixed credential badges** → Visual interest, clear differentiation

---

## Design System

**Colors**:
- Primary: `#4DB380` (emerald - growth)
- Secondary: `#CC6B49` (terracotta - balance)
- Text: `#374151` (warm gray)

**Typography**:
- Headings: Cormorant Garamond (300-700) - Elegant serif
- Body: Source Sans 3 (300-700) - Modern sans-serif
- Base: 16px
- Font loading: Google Fonts @import in `_tokens-typography.scss`

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

**Status**: Production Ready ✅ | 66 components (9 atoms + 29 molecules + 2 organisms + 26 sections) | <3s builds | <520KB pages | WebP images | Multilingual | **v5.1.0: Complete 2025 Refactor** | Full BEM + ITCSS

**Version**: 5.1.0 | **Updated**: 2025-11-20 | **Hugo**: v0.152.2 extended | **Architecture**: ITCSS + BEM | **Fonts**: Crimson Pro (serif) + Work Sans (sans)
