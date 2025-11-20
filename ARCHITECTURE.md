# Architecture Documentation

**System**: Hugo + Atomic Design + ITCSS | **Purpose**: Enable Claude Code to understand and extend project

**Version**: 5.0.1 | **Updated**: 2025-11-19 | **Structure**: Flattened (no theme subdirectory)

---

## System Overview

Component-based Hugo site with flattened architecture: Pages = Header + Sections (2-7) + Footer

**Hierarchy**: Atoms (5) → Molecules (21) → Organisms (2) → Sections (21) = **49 components**

**Critical**: Project structure was flattened in commit 4886ab2. All files are at root level - there is NO `themes/andromeda-hugo/` subdirectory!

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

### Molecules (17) - `layouts/partials/molecules/`
card.html, form-field.html, accordion.html, pricing-toggle.html, video-embed.html, social-links.html, breadcrumb.html, nav-item.html, logo.html, language-selector.html, navigation.html, mobile-menu.html, footer-nav.html, footer-info.html, back-to-top.html, cookie-consent.html, emergency-banner.html

**Usage**: `{{ partial "molecules/card.html" (dict "variant" "feature" "title" "Title") }}`

### Organisms (2) - `layouts/partials/organisms/`
header.html, footer.html (cached by language for 30-50% build time reduction)

**Usage**: `{{ partialCached "organisms/header.html" . .Language }}`

### Sections (21 active + 1 _deprecated dir) - `layouts/partials/sections/`
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

## File Locations (Flattened Structure)

```
alexandrabarbu.ro/                      # ← PROJECT ROOT (run Hugo here!)
├── layouts/                            # At root level (NOT in themes/)
│   ├── _default/flexible.html          # MAIN ENGINE
│   ├── partials/
│   │   ├── atoms/                      # 5 basic
│   │   ├── molecules/                  # 21 composite
│   │   ├── organisms/                  # 2 complex
│   │   ├── sections/                   # 21 sections + _deprecated/
│   │   └── essentials/
│   │       ├── header.html             # Calls organism
│   │       └── footer.html             # Calls organism
│   └── shortcodes/                     # Local shortcode implementations
├── assets/                             # At root level
│   ├── scss/                           # ITCSS + BEM architecture
│   └── js/                             # Vanilla JS (no Bootstrap/jQuery)
├── content/                            # Site content at root
├── config/                             # Hugo configuration
└── data/                               # Data files

IMPORTANT: No themes/andromeda-hugo/ directory exists. Structure flattened Nov 2025.
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
cd themes/andromeda-hugo               # Run from theme directory
../../scripts/test-components.sh       # Verify: 5+17+2+24=48 components
../../scripts/test-performance.sh      # Measure: <3s build, <500KB pages
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
**Verify**: `ls layouts/partials/atoms/ | wc -l` (5), molecules (21), organisms (2), sections (21 + _deprecated)

---

## Success Metrics ✅

Build <3s | Pages <500KB | CSS <50KB gzipped | Reusability >80% | Duplication <10% | New page <30s | 49 components total | No Bootstrap/jQuery (vanilla JS)

---

## Critical Files

- `layouts/_default/flexible.html` - Layout engine (lines 22-65: section loop)
- `layouts/partials/organisms/header.html` - Header composition
- `layouts/partials/organisms/footer.html` - Footer composition
- `archetypes/*.md` - Page templates

**Docs**: `docs/components/` for detailed component API (at root level)
