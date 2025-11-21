# Architecture Documentation

**System**: Hugo + Atomic Design + ITCSS | **Purpose**: Enable Claude Code to understand and extend project

**Version**: 5.1.0 | **Updated**: 2025-11-21 | **Structure**: Hugo standard (theme directory)

---

## System Overview

Component-based Hugo site with standard theme architecture: Pages = Header + Sections (2-7) + Footer

**Hierarchy**: Atoms (9) → Molecules (24) → Organisms (2) → Sections (36) = **71 components**

**Note**: Hugo follows standard lookup order: project root overrides → theme defaults. Main implementation in `themes/andromeda-hugo/` directory.

---

## Flexible Layout Engine

**File**: `themes/andromeda-hugo/layouts/_default/flexible.html`

**Process**: Read sections array → Render header → Loop sections → Render footer

```yaml
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "benefits-grid"
```

---

## Components

### Atoms (9) - `themes/andromeda-hugo/layouts/partials/atoms/`
button.html, heading.html, icon.html, image.html, tag.html, divider.html, link.html, spinner.html, avatar.html

**Usage**: `{{ partial "atoms/button.html" (dict "text" "Click" "variant" "primary") }}`

### Molecules (24) - `themes/andromeda-hugo/layouts/partials/molecules/`
accordion.html, back-to-top.html, blog-card.html, breadcrumb.html, card.html, cookie-consent.html, credential-badge.html, emergency-banner.html, footer-info.html, footer-nav.html, form-field.html, language-selector.html, logo.html, mobile-menu.html, navigation.html, nav-item.html, pricing-toggle.html, process-step.html, service-preview-card.html, social-links.html, stat-card.html, timeline-step.html, value-card.html, video-embed.html

**Usage**: `{{ partial "molecules/card.html" (dict "variant" "feature" "title" "Title") }}`

### Organisms (2) - `themes/andromeda-hugo/layouts/partials/organisms/`
header.html, footer.html (cached by language for 30-50% build time reduction)

**Usage**: `{{ partialCached "organisms/header.html" . .Language }}`

### Sections (36 active) - `themes/andromeda-hugo/layouts/partials/sections/`
about-preview.html, approach-preview.html, benefits-results.html, blog-grid.html, confidentiality-notice.html, contact-form-enhanced.html, contact-info-cards.html, contact-options.html, credentials-showcase.html, cta-standard.html, faq-content.html, faq-mini.html, feature-blocks.html, feature-details.html, first-session-timeline.html, hero-breadcrumb.html, methods-used.html, method-tabs.html, my-story.html, newsletter-signup.html, onboarding-steps.html, pricing-packages.html, pricing-tables.html, privacy-guarantee.html, problem-empathy.html, service-faq-inline.html, services-preview.html, signup-form-enhanced.html, simple-process.html, stats-numbers.html, testimonials-enhanced.html, therapeutic-process.html, training-certifications.html, values-compass.html, values-intro.html, video-popup.html

**Data from front matter**:
```yaml
benefits_section:
  title: "Benefits"
  benefits:
    - icon: "las la-check"
      title: "Benefit"
```

---

## Data Flow

```
Page (content/*.md) → flexible.html → Header → Sections → Footer → HTML (public/)
                      ↓ front matter
                      sections array
```

---

## Extension Points

### Add Section
1. Create `themes/andromeda-hugo/layouts/partials/sections/my-section.html`
2. Register in `themes/andromeda-hugo/layouts/_default/flexible.html` if/else chain
3. Use: `sections: - type: "my-section"`

### Add Molecule
1. Create `themes/andromeda-hugo/layouts/partials/molecules/my-component.html`
2. Compose from atoms
3. Use: `{{ partial "molecules/my-component.html" (dict ...) }}`

### Add Atom
1. Create `themes/andromeda-hugo/layouts/partials/atoms/my-atom.html`
2. Keep simple (single responsibility)
3. Use: `{{ partial "atoms/my-atom.html" (dict ...) }}`

---

## Key Patterns

**Partial Caching**: `{{ partialCached "organisms/header.html" . .Language }}`
**Conditional**: `{{ with .Params.section }}{{ if .enable }}...{{ end }}{{ end }}`
**Variants**: `{{ if eq .variant "primary" }}...{{ else if eq .variant "secondary" }}...{{ end }}`
**Image Processing**: `{{- $img := resources.Get .src -}}{{- $webp := $img.Resize "800x webp q85" -}}`
**Props**: `{{ partial "path/component.html" (dict "key1" "val1" "key2" .PageVar) }}`

---

## File Locations (Standard Hugo Theme Structure)

```
alexandrabarbu.ro/                      # ← PROJECT ROOT (run Hugo here!)
├── themes/andromeda-hugo/              # Theme directory (main implementation)
│   ├── layouts/                        # Theme templates
│   │   ├── _default/flexible.html      # MAIN LAYOUT ENGINE
│   │   └── partials/
│   │       ├── atoms/                  # 9 atomic components
│   │       ├── molecules/              # 29 composite components
│   │       ├── organisms/              # 2 structural (header, footer)
│   │       ├── sections/               # 26 page sections
│   │       └── essentials/             # Core essentials (style, head, etc.)
│   ├── assets/                         # Theme assets
│   │   ├── scss/                       # ITCSS (7 layers) + BEM
│   │   └── js/                         # Vanilla JS (no dependencies)
│   ├── archetypes/                     # Content templates
│   └── docs/                           # Component documentation
├── layouts/                            # Project overrides (sparse - 8 files)
│   └── partials/                       # Project-specific partials
├── assets/                             # Project overrides (sparse)
├── content/                            # Site content (romanian/, english/)
├── config/                             # Hugo configuration
├── data/                               # Data files (shared_sections.yaml)
└── i18n/                               # Translation files (ro.yaml, en.yaml)

NOTE: Hugo lookup order: project root → theme directory.
Theme contains 135 SCSS files, 127 layout files. Project overrides are minimal.
```

---

## Performance

- Partial caching: Header/footer by language (30-50% reduction)
- Image processing: WebP + srcset + lazy loading (25-35% reduction)
- CSS minification: <50KB gzipped
- Template reuse: Single source of truth

---

## Testing

```bash
# Run from project root!
scripts/test-components.sh             # Verify: 9+24+2+36=71 components
scripts/test-performance.sh            # Measure: <3s build, <500KB pages
hugo --templateMetrics                 # Performance analysis
```

---

## Multilingual

```
content/ro/  # Romanian
content/en/  # English
content/fr/  # French

{{ .Language.Lang }}                    # Current language
{{ partialCached "org.html" . .Language }}  # Cache per language
```

---

## Troubleshooting

**Section not rendering**: Check spelling, verify file exists, check registration in flexible.html
**Images not loading**: Verify path in static/, check Hugo processing
**Slow builds**: Run `hugo --templateMetrics`, verify caching, check image processing

---

## Quick Reference for Claude Code

**Understand**: README.md → ARCHITECTURE.md → themes/andromeda-hugo/docs/components/
**Add features**: New page (archetypes) | New section (sections/) | New molecule (molecules/)
**Verify**: `ls themes/andromeda-hugo/layouts/partials/atoms/ | wc -l` (9), molecules (24), organisms (2), sections (36)

---

## Success Metrics ✅

Build <3s | Pages <500KB | CSS <50KB gzipped | Reusability >80% | Duplication <10% | New page <30s | 71 components total | No Bootstrap/jQuery (vanilla JS)

---

## Critical Files

- `themes/andromeda-hugo/layouts/_default/flexible.html` - Layout engine (lines 22-82: section loop)
- `layouts/partials/organisms/header.html` - Header composition
- `layouts/partials/organisms/footer.html` - Footer composition
- `archetypes/*.md` - Page templates

**Docs**: `docs/components/` for detailed component API (at root level)
