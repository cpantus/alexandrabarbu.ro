# Architecture Documentation

**System**: Hugo + Atomic Design + ITCSS | **Purpose**: Enable Claude Code to understand and extend project

**Version**: 5.1.0 | **Updated**: 2025-11-21 | **Structure**: Hugo standard (theme directory)

---

## System Overview

Component-based Hugo site with standard theme architecture: Pages = Header + Sections (2-7) + Footer

**Hierarchy**: Atoms (9) → Molecules (29) → Organisms (2) → Sections (26) = **66 components**

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

### Molecules (29) - `themes/andromeda-hugo/layouts/partials/molecules/`
card.html, form-field.html, accordion.html, navigation.html, breadcrumb.html, social-links.html, video-embed.html, timeline-step.html, stat-card.html, blog-card.html, back-to-top.html, cookie-consent.html, emergency-banner.html, footer-info.html, footer-nav.html, language-selector.html, logo.html, mobile-menu.html, nav-item.html, service-card.html, value-card.html, process-step.html, credential-badge.html, contact-method-card.html, feature-highlight.html, info-box.html, quote-block.html, resource-card.html, pricing-toggle.html

**Usage**: `{{ partial "molecules/card.html" (dict "variant" "feature" "title" "Title") }}`

### Organisms (2) - `themes/andromeda-hugo/layouts/partials/organisms/`
header.html, footer.html (cached by language for 30-50% build time reduction)

**Usage**: `{{ partialCached "organisms/header.html" . .Language }}`

### Sections (26 active) - `themes/andromeda-hugo/layouts/partials/sections/`
1. hero-breadcrumb.html - Page header
2. values-intro.html - Intro with image
3. feature-blocks.html - Zigzag layout (enhanced v4.0)
4. pricing-tables.html - Pricing + toggle (enhanced v4.0)
5. video-popup.html - Video section
6. contact-form-enhanced.html - Contact form
7. contact-info-cards.html - Contact cards
8. contact-options.html - Alternative contact
9. faq-mini.html - FAQ accordion
10. faq-content.html - FAQ content
11. signup-form-enhanced.html - Signup form
12. privacy-guarantee.html - Privacy section
13. blog-grid.html - Blog post grid
14. newsletter-signup.html - Newsletter subscription
15. problem-empathy.html - Problem statement
16. stats-numbers.html - Statistics (enhanced v4.0)
17. values-compass.html - Compass layout (NEW v4.0)
18. credentials-showcase.html - Credentials (enhanced v4.0)
19. first-session-timeline.html - Session walkthrough
20. service-faq-inline.html - Service FAQ
21. testimonials-enhanced.html - Client testimonials
22. _deprecated/ - Deprecated sections directory

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
scripts/test-components.sh             # Verify: 9+29+2+26=66 components
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
**Verify**: `ls themes/andromeda-hugo/layouts/partials/atoms/ | wc -l` (9), molecules (29), organisms (2), sections (26)

---

## Success Metrics ✅

Build <3s | Pages <500KB | CSS <50KB gzipped | Reusability >80% | Duplication <10% | New page <30s | 66 components total | No Bootstrap/jQuery (vanilla JS)

---

## Critical Files

- `themes/andromeda-hugo/layouts/_default/flexible.html` - Layout engine (lines 22-82: section loop)
- `layouts/partials/organisms/header.html` - Header composition
- `layouts/partials/organisms/footer.html` - Footer composition
- `archetypes/*.md` - Page templates

**Docs**: `docs/components/` for detailed component API (at root level)
