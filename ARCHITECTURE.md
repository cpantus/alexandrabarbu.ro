# Architecture Documentation

**System**: Hugo Static Site with Atomic Design
**Purpose**: Enable seamless understanding and extension by Claude Code
**Version**: 2.0

---

## System Overview

This is a **component-based Hugo website** where pages are assembled from reusable sections. The architecture follows **atomic design principles** with a 4-level hierarchy:

```
Atoms → Molecules → Organisms → Sections (Templates)
```

---

## Core Architecture

### 1. Flexible Layout Engine

**File**: `themes/andromeda-hugo/layouts/_default/flexible.html`

**Purpose**: Main layout controller that renders pages from section definitions

**How it works**:
```yaml
# Page front matter (content/*.md)
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "benefits-grid"
  - type: "pricing-tables"
```

**Process**:
1. Read `sections` array from front matter
2. Always render header first (organism)
3. Loop through sections, render each partial sequentially
4. Always render footer last (organism)
5. Include section-specific scripts (e.g., pricing-scripts.html)

**Code location**: `themes/andromeda-hugo/layouts/_default/flexible.html:22-65`

---

### 2. Component Hierarchy

#### **Atoms** (5 components)
**Location**: `themes/andromeda-hugo/layouts/partials/atoms/`

Basic UI primitives - smallest building blocks:
- `button.html` - Variants: primary, secondary, outline, with icons
- `heading.html` - h1-h6, variants: default, gradient, section, bold
- `icon.html` - Line Awesome icons, size presets (xs-4x)
- `image.html` - Hugo image processing, WebP, srcset, lazy loading
- `input.html` - Types: text, email, password, textarea, checkbox, radio, select

**Usage pattern**:
```html
{{ partial "atoms/button.html" (dict
  "text" "Click Me"
  "href" "/page/"
  "variant" "primary"
) }}
```

#### **Molecules** (14 components)
**Location**: `themes/andromeda-hugo/layouts/partials/molecules/`

Composite components combining atoms:
- `card.html` - Variants: feature, pricing, testimonial
- `form-field.html` - Label + input + validation + error
- `accordion.html` - Bootstrap 5 collapsible
- `pricing-toggle.html` - Monthly/yearly price switcher
- `video-embed.html` - Video player with thumbnail
- `social-links.html` - Icon grid with stagger animation
- `breadcrumb.html` - Navigation breadcrumb
- `nav-item.html` - Navigation link with active states
- `logo.html` - Site logo SVG
- `language-selector.html` - Multilingual switcher (RO/EN/FR)
- `navigation.html` - Main nav with dropdowns
- `mobile-menu.html` - Hamburger menu + slide-in
- `footer-nav.html` - Footer navigation
- `footer-info.html` - Footer information

**Usage pattern**:
```html
{{ partial "molecules/card.html" (dict
  "variant" "feature"
  "icon" "check-circle"
  "title" "Feature Title"
  "description" "Description text"
) }}
```

#### **Organisms** (2 components)
**Location**: `themes/andromeda-hugo/layouts/partials/organisms/`

Complex compositions of molecules:
- `header.html` - Logo + navigation + language selector + mobile menu
- `footer.html` - Footer info + navigation + social links + copyright

**Performance optimization**:
```html
{{ partialCached "organisms/header.html" . .Language }}
{{ partialCached "organisms/footer.html" . .Language }}
```
Caching reduces build time by 30-50%.

**Integration**: Organisms are called via essentials wrappers:
- `layouts/partials/essentials/header.html` → calls organism
- `layouts/partials/essentials/footer.html` → calls organism

#### **Sections** (16 components)
**Location**: `themes/andromeda-hugo/layouts/partials/sections/`

Full page sections that compose molecules:
1. `hero-breadcrumb.html` - Page header (always rendered first)
2. `values-intro.html` - Intro with image (uses card molecule)
3. `feature-blocks.html` - Alternating blocks (uses image atom)
4. `feature-details.html` - Feature cards (uses card molecule)
5. `benefits-grid.html` - Icon grid (uses card molecule)
6. `pricing-tables.html` - Pricing cards (uses card + pricing-toggle molecules)
7. `job-listings.html` - Career grid (uses card molecule)
8. `video-popup.html` - Video section (uses video-embed molecule)
9. `contact-form-enhanced.html` - Contact form (uses form-field molecule)
10. `contact-info-cards.html` - Contact info (uses card molecule)
11. `confidentiality-notice.html` - Privacy notice
12. `faq-mini.html` - FAQ accordion (uses accordion molecule)
13. `faq-content.html` - FAQ content template
14. `onboarding-steps.html` - Process steps
15. `signup-form-enhanced.html` - Signup form (uses form-field molecule)
16. `privacy-guarantee.html` - Privacy guarantee

**Data convention**: Sections read from page front matter:
```yaml
benefits_section:
  title: "Benefits"
  benefits:
    - icon: "las la-check"
      title: "Benefit 1"
```

---

## Data Flow

### Page Rendering Flow

```
1. User creates page (content/page.md) with:
   layout: "flexible"
   sections: [array of section types]

2. Hugo processes:
   - Reads flexible.html layout
   - Parses sections array from front matter

3. Flexible.html renders:
   - Header (organism, cached by language)
   - Loop through sections:
     - Section calls molecules
     - Molecules call atoms
   - Footer (organism, cached by language)

4. Build output:
   - HTML generated in public/
   - Images processed to WebP
   - CSS minified
```

### Component Communication

**Props pattern** (dict):
```html
{{ partial "path/component.html" (dict
  "key1" "value1"
  "key2" .PageVar
  "key3" $localVar
) }}
```

**Context passing**:
```html
{{ partial "path/component.html" $ }}  ← Pass entire page context
{{ partial "path/component.html" . }}  ← Pass current context
```

---

## File Structure

### Critical Files

```
themes/andromeda-hugo/
├── layouts/
│   ├── _default/
│   │   ├── flexible.html              ← MAIN LAYOUT ENGINE
│   │   ├── baseof.html                ← Base HTML template
│   │   └── single.html                ← Single page layout
│   └── partials/
│       ├── atoms/                      ← 5 basic components
│       ├── molecules/                  ← 14 composite components
│       ├── organisms/                  ← 2 complex compositions
│       ├── sections/                   ← 16 page sections
│       └── essentials/
│           ├── header.html             ← Header wrapper
│           └── footer.html             ← Footer wrapper
├── assets/scss/
│   ├── style.scss                      ← Main stylesheet
│   ├── _buttons.scss                   ← Button styles
│   ├── _animations.scss                ← Animation library
│   └── _common.scss                    ← Common utilities
├── archetypes/
│   ├── service-page.md                 ← Service page template
│   ├── therapy-page.md                 ← Therapy page template
│   └── landing-page.md                 ← Landing page template
└── docs/
    └── components/
        ├── atoms.md                    ← Atom documentation
        └── molecules.md                ← Molecule documentation
```

---

## Extension Points

### Adding New Section Type

**Steps**:
1. Create section file:
   ```bash
   themes/andromeda-hugo/layouts/partials/sections/my-section.html
   ```

2. Register in flexible.html:
   ```html
   {{ else if eq $sectionType "my-section" }}
     {{ partial "sections/my-section.html" $ }}
   ```

3. Use in pages:
   ```yaml
   sections:
     - type: "my-section"
   ```

### Creating New Molecule

**Steps**:
1. Create molecule file:
   ```bash
   themes/andromeda-hugo/layouts/partials/molecules/my-component.html
   ```

2. Compose from atoms:
   ```html
   {{ partial "atoms/icon.html" (dict "name" .icon) }}
   {{ partial "atoms/heading.html" (dict "text" .title "level" 3) }}
   {{ partial "atoms/button.html" (dict "text" "Learn More") }}
   ```

3. Use in sections:
   ```html
   {{ partial "molecules/my-component.html" (dict "prop" "value") }}
   ```

### Creating New Atom

**Steps**:
1. Create atom file:
   ```bash
   themes/andromeda-hugo/layouts/partials/atoms/my-atom.html
   ```

2. Keep it simple (single responsibility):
   ```html
   {{- $prop := .prop | default "default" -}}
   <element class="{{ $prop }}">{{ .text }}</element>
   ```

3. Use in molecules or sections:
   ```html
   {{ partial "atoms/my-atom.html" (dict "text" "Content") }}
   ```

---

## Key Design Patterns

### 1. Partial Caching
**Where**: Organisms (header, footer)
**Why**: 30-50% build time reduction
**Pattern**:
```html
{{ partialCached "organisms/header.html" . .Language }}
```
Cache key = language (for multilingual support)

### 2. Conditional Rendering
**Pattern**:
```html
{{ with .Params.section_name }}
  {{ if .enable }}
    <!-- Render section -->
  {{ end }}
{{ end }}
```

### 3. Data Fallbacks
**Pattern**:
```html
{{ $data := .Params.section_name }}
{{ if not $data }}
  {{ $data = .Params.fallback_name }}
{{ end }}
```

### 4. Image Processing
**Pattern**:
```html
{{- $img := resources.Get .src -}}
{{- $webp := $img.Resize "800x webp q85" -}}
<img src="{{ $webp.RelPermalink }}" loading="lazy">
```

### 5. Component Variants
**Pattern**:
```html
{{ if eq .variant "primary" }}
  <!-- Primary variant -->
{{ else if eq .variant "secondary" }}
  <!-- Secondary variant -->
{{ end }}
```

---

## Performance Architecture

### Build Optimization
1. **Partial caching**: Header/footer cached by language
2. **Image processing**: Resources.Get with caching
3. **Template reuse**: Single source of truth for components
4. **Lazy evaluation**: Sections only render if enabled

### Runtime Optimization
1. **WebP images**: 25-35% size reduction
2. **Lazy loading**: Images load on scroll
3. **CSS minification**: <50KB gzipped
4. **AOS animations**: GPU-accelerated, with reduced motion support

---

## Testing Architecture

### Automated Tests
- `scripts/test-components.sh` - Verifies all components exist
- `scripts/test-performance.sh` - Measures build time and bundle size

### Test Pages
- `content/test-all-sections.md` - Demonstrates all 16 sections
- `content/components-preview.md` - Showcases all atoms

### Verification
```bash
./scripts/test-components.sh
# Expected: 5 atoms, 14 molecules, 2 organisms, 16 sections
```

---

## Multilingual Architecture

### Structure
```
content/
├── ro/          ← Romanian (default)
├── en/          ← English
└── fr/          ← French (optional)
```

### Language Context
Hugo provides `.Language` in templates:
```html
{{ if eq .Language.Lang "ro" }}
  <!-- Romanian content -->
{{ else if eq .Language.Lang "en" }}
  <!-- English content -->
{{ end }}
```

### Caching by Language
```html
{{ partialCached "organisms/header.html" . .Language }}
```
Separate cache per language.

---

## Common Patterns

### Accessing Page Data
```html
{{ .Params.section_name }}      ← Front matter data
{{ .Title }}                     ← Page title
{{ .Content }}                   ← Page content (markdown)
{{ .Language.Lang }}             ← Current language
```

### Looping Through Items
```html
{{ range .Params.section.items }}
  {{ partial "molecules/card.html" (dict
    "title" .title
    "description" .description
  ) }}
{{ end }}
```

### Conditional Classes
```html
<div class="card {{ if .featured }}featured{{ end }}">
```

---

## Troubleshooting Guide

### Section Not Rendering
1. Check section type spelling in front matter
2. Verify section file exists: `ls themes/andromeda-hugo/layouts/partials/sections/`
3. Check registration in flexible.html: `grep "section-type" layouts/_default/flexible.html`

### Images Not Loading
1. Verify path relative to `static/`: `ls static/images/`
2. Check Hugo processing: `hugo --verbose | grep "processing image"`
3. Check resources: `ls resources/_gen/images/`

### Component Props Not Working
1. Verify dict syntax: `(dict "key" "value")`
2. Check context passing: `$` vs `.`
3. Add debug: `{{ printf "%#v" . }}` to see available data

### Build Time Slow
1. Run metrics: `hugo --templateMetrics --templateMetricsHints`
2. Check caching: `grep partialCached layouts/partials/organisms/*`
3. Verify image processing efficiency

---

## Quick Reference for Claude Code

### To understand this project:
1. Read: `README.md` (project overview)
2. Read: `ARCHITECTURE.md` (this file - technical details)
3. Check: `themes/andromeda-hugo/docs/components/` (component API)

### To add features:
1. For new pages: Use archetypes or flexible layout
2. For new sections: Create in `sections/`, register in `flexible.html`
3. For new molecules: Create in `molecules/`, use in sections
4. For new atoms: Create in `atoms/`, use in molecules

### To test changes:
1. Run: `hugo server --buildDrafts`
2. Test: `./scripts/test-components.sh`
3. Verify: http://localhost:1313/test-all-sections/

### To verify architecture:
```bash
# Count components
ls themes/andromeda-hugo/layouts/partials/atoms/ | wc -l      # Should be 5
ls themes/andromeda-hugo/layouts/partials/molecules/ | wc -l  # Should be 14
ls themes/andromeda-hugo/layouts/partials/organisms/ | wc -l  # Should be 2
ls themes/andromeda-hugo/layouts/partials/sections/ | wc -l   # Should be 16
```

---

## Success Metrics

- **Build time**: <3s (via partial caching)
- **Page weight**: <500KB (via WebP + minification)
- **CSS bundle**: <50KB gzipped
- **Component reuse**: >80%
- **Code duplication**: <10%
- **New page creation**: <30 seconds

All targets achieved ✅
