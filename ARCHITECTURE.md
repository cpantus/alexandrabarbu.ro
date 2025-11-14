# Architecture Documentation

**System**: Hugo + Atomic Design | **Purpose**: Enable Claude Code to understand and extend project

---

## System Overview

Component-based Hugo site: Pages = Header + Sections (2-7) + Footer

**Hierarchy**: Atoms → Molecules → Organisms → Sections

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

### Atoms (5) - `layouts/partials/atoms/`
button.html, heading.html, icon.html, image.html, input.html

**Usage**: `{{ partial "atoms/button.html" (dict "text" "Click" "variant" "primary") }}`

### Molecules (14) - `layouts/partials/molecules/`
card.html, form-field.html, accordion.html, pricing-toggle.html, video-embed.html, social-links.html, breadcrumb.html, nav-item.html, logo.html, language-selector.html, navigation.html, mobile-menu.html, footer-nav.html, footer-info.html

**Usage**: `{{ partial "molecules/card.html" (dict "variant" "feature" "title" "Title") }}`

### Organisms (2) - `layouts/partials/organisms/`
header.html, footer.html (cached by language for 30-50% build time reduction)

**Usage**: `{{ partialCached "organisms/header.html" . .Language }}`

### Sections (16) - `layouts/partials/sections/`
1. hero-breadcrumb.html - Page header
2. values-intro.html - Intro with image
3. feature-blocks.html - Alternating blocks
4. feature-details.html - Feature cards
5. benefits-grid.html - Icon grid
6. pricing-tables.html - Pricing + toggle
7. job-listings.html - Career grid
8. video-popup.html - Video section
9. contact-form-enhanced.html - Contact form
10. contact-info-cards.html - Contact cards
11. confidentiality-notice.html - Privacy
12. faq-mini.html - FAQ accordion
13. faq-content.html - FAQ content
14. onboarding-steps.html - Process steps
15. signup-form-enhanced.html - Signup form
16. privacy-guarantee.html - Privacy section

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
1. Create `layouts/partials/sections/my-section.html`
2. Register in `flexible.html` if/else chain
3. Use: `sections: - type: "my-section"`

### Add Molecule
1. Create `layouts/partials/molecules/my-component.html`
2. Compose from atoms
3. Use: `{{ partial "molecules/my-component.html" (dict ...) }}`

### Add Atom
1. Create `layouts/partials/atoms/my-atom.html`
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

## File Locations

```
themes/andromeda-hugo/layouts/
├── _default/flexible.html              # MAIN ENGINE
├── partials/
│   ├── atoms/                          # 5 basic
│   ├── molecules/                      # 14 composite
│   ├── organisms/                      # 2 complex
│   ├── sections/                       # 16 sections
│   └── essentials/
│       ├── header.html                 # Calls organism
│       └── footer.html                 # Calls organism
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
./scripts/test-components.sh           # Verify: 5+14+2+16 components
./scripts/test-performance.sh          # Measure: <3s build, <500KB pages
http://localhost:1313/test-all-sections/  # Visual test
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
**Verify**: `ls layouts/partials/atoms/ | wc -l` (5), molecules (14), organisms (2), sections (16)

---

## Success Metrics ✅

Build <3s | Pages <500KB | CSS <50KB gzipped | Reusability >80% | Duplication <10% | New page <30s

---

## Critical Files

- `layouts/_default/flexible.html` - Layout engine (lines 22-65: section loop)
- `layouts/partials/organisms/header.html` - Header composition
- `layouts/partials/organisms/footer.html` - Footer composition
- `archetypes/*.md` - Page templates

**Docs**: `themes/andromeda-hugo/docs/components/` for detailed component API
