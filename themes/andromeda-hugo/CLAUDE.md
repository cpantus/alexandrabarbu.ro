# Claude Instructions - Andromeda Hugo Theme

**Project**: Psychology Practice Hugo Theme | **Version**: 3.3.3 | **Architecture**: Hybrid (Flexible + Legacy)
**Read First**: `PROJECT.md` for complete architecture | `cc-hugo-audit.md` for modernization roadmap

---

## Core Principles

**CRITICAL Rules - Follow These Always**:

1. **Read PROJECT.md First**: Before ANY work, read `PROJECT.md` to understand the flexible layout system and architecture
2. **Preserve Multilingual**: ALWAYS maintain RO (Romanian) + EN (English) content parity
3. **Flexible Layout First**: Use `layout: "flexible"` + sections array - NEVER create new monolithic layouts
4. **Reuse Before Create**: Check existing 16 sections in `layouts/partials/sections/` before creating new ones
5. **Data Hierarchy**: Front matter (page-specific) → `data/shared/` (reusable) → `params.toml` (site-wide)
6. **Section Size Limit**: Keep sections under 80 lines - if larger, decompose into atoms/molecules
7. **Test Both Languages**: ALWAYS verify changes work in both `/ro/` and `/en/` paths

---

## Architecture Quick Reference

### Directory Structure
```
andromeda-hugo/
├── layouts/
│   ├── _default/
│   │   └── flexible.html        # ✅ STABLE - Don't modify
│   ├── partials/
│   │   ├── sections/            # ✅ 16 sections - Extend here
│   │   └── components/          # ⚠️ EMPTY - Future atomic components
│   └── shortcodes/
├── content/
│   ├── romanian/                # 🇷🇴 RO content
│   └── english/                 # 🇬🇧 EN content
├── data/
│   └── shared_sections.yaml     # Reusable cross-page data
├── config/_default/
│   ├── params.toml              # Site-wide settings
│   ├── menus.ro.toml            # RO navigation
│   └── menus.en.toml            # EN navigation
├── i18n/
│   ├── ro.yaml                  # RO translations
│   └── en.yaml                  # EN translations
└── themes/andromeda-hugo/       # ❌ LEGACY - Don't use
```

### Flexible Layout Pattern (Use This!)
```yaml
# content/romanian/servicii.md
---
title: "Servicii de Psihoterapie"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "feature-blocks"
  - type: "pricing-tables"
  - type: "benefits-grid"

# Section data (inline)
hero_breadcrumb:
  title: "Servicii"
  subtitle: "Terapie personalizată"

feature_blocks:
  items:
    - title: "Terapie CBT"
      description: "..."
      image: "images/..."
---
```

### Available Sections (16 Total)
| Section Type | Purpose | Lines | Common Use |
|--------------|---------|-------|------------|
| `hero-breadcrumb` | Page header | 35 | All pages |
| `feature-blocks` | Image/text alternating | 37 | Services, features |
| `pricing-tables` | Pricing cards | 80 | Packages |
| `values-intro` | Intro + image | 50 | About, mission |
| `benefits-grid` | Icon grid | 60 | Benefits |
| `contact-form-enhanced` | Contact form | 90 | Contact |
| `faq-mini` | FAQ accordion | 40 | FAQs |
| `video-popup` | Video + lightbox | 45 | Testimonials |
| `job-listings` | Job grid | 55 | Careers |
| `testimonials` | Client quotes | 48 | Social proof |
| *(6 more - see PROJECT.md)* | ... | ... | ... |

---

## Common Tasks & How-To

### 1. Add New Page
```bash
# Create RO version
hugo new content/romanian/new-page.md

# Create EN version
hugo new content/english/new-page.md
```

**Front Matter Template**:
```yaml
---
title: "Page Title"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "feature-blocks"

hero_breadcrumb:
  title: "Page Title"
  subtitle: "Subtitle here"

feature_blocks:
  items:
    - title: "Feature 1"
      description: "Description here"
      image: "images/feature-01.png"
    - title: "Feature 2"
      description: "Description here"
      image: "images/feature-02.png"
---

Page markdown content here (optional).
```

### 2. Modify Existing Page
```bash
# 1. Locate page
find content/ -name "page-name.md"

# 2. Edit front matter (sections array or section data)
# 3. Test in dev server: npm run dev
# 4. Check both languages:
#    - http://localhost:1313/ro/page-name
#    - http://localhost:1313/en/page-name
```

**Important**: When editing sections array, verify section data exists in front matter or `data/shared_sections.yaml`

### 3. Create New Section Component
```bash
# 1. Check if similar section exists first!
ls layouts/partials/sections/

# 2. If truly unique, create:
touch layouts/partials/sections/my-section.html
```

**Section Template**:
```html
<!-- layouts/partials/sections/my-section.html -->
{{- $section_data := .Params.my_section -}}
{{- if $section_data -}}
<section class="section">
  <div class="container">
    <div class="row">
      {{- if $section_data.title -}}
      <div class="col-12 text-center mb-4">
        <h2>{{ $section_data.title }}</h2>
      </div>
      {{- end -}}

      {{- range $section_data.items -}}
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h3>{{ .title }}</h3>
            <p>{{ .description | markdownify }}</p>
          </div>
        </div>
      </div>
      {{- end -}}
    </div>
  </div>
</section>
{{- end -}}
```

**Rules**:
- ✅ Under 80 lines
- ✅ Data-driven (no hardcoded text)
- ✅ Null-safe (check `if $section_data`)
- ✅ Use Hugo functions (`markdownify`, `safeHTML`)
- ❌ Don't duplicate buttons/cards (extract to atoms when atomic design is ready)

### 4. Add Translation
```yaml
# i18n/ro.yaml
new_key: "Textul în română"

# i18n/en.yaml
new_key: "Text in English"
```

**Usage in Templates**:
```html
{{ i18n "new_key" }}
```

### 5. Update Navigation
```toml
# config/_default/menus.ro.toml
[[main]]
name = "Servicii"
url = "/ro/servicii"
weight = 2

# config/_default/menus.en.toml
[[main]]
name = "Services"
url = "/en/services"
weight = 2
```

### 6. Migrate Legacy Page to Flexible
**Process** (see `cc-hugo-audit.md` Phase 4 for details):

```bash
# 1. Identify legacy layout
grep -r "layout:" content/romanian/old-page.md
# If missing "layout: flexible", it uses legacy

# 2. Find legacy layout file
ls themes/andromeda-hugo/layouts/_default/

# 3. Analyze sections in legacy layout
# Map to existing sections or identify new ones needed

# 4. Create front matter with sections array
# 5. Migrate content data
# 6. Test both RO + EN
# 7. Backup legacy layout to themes/.../layouts/_deprecated/
```

---

## Data Access Patterns

### When to Use Each Data Source

**Front Matter** (Page-Specific):
```yaml
# Use for: Unique content for THIS page only
hero_breadcrumb:
  title: "Specific Page Title"
  subtitle: "Unique subtitle"
```

**Shared Data** (`data/shared_sections.yaml`):
```yaml
# Use for: Content reused across multiple pages
pricing_plans:
  basic:
    name: "Basic Plan"
    price: 99
  premium:
    name: "Premium Plan"
    price: 199
```

**Access in Template**:
```html
{{ $plans := site.Data.shared_sections.pricing_plans }}
{{ range $plans }}
  <div class="pricing-card">{{ .name }}: {{ .price }}</div>
{{ end }}
```

**Site Params** (`config/_default/params.toml`):
```toml
# Use for: Site-wide settings/config
[params.design]
headings_brand_color = true

[params.cta]
calendly_url = "https://calendly.com/..."
```

**Access in Template**:
```html
{{ if site.Params.design.headings_brand_color }}
  <h1 class="text-primary">{{ .Title }}</h1>
{{ end }}
```

---

## Design System Guidelines

### Colors (Psychology Brand)
```scss
// Primary: Deep emerald (growth, healing)
color-primary: #4DB380

// Secondary: Terracotta (balance)
color-secondary: #CC6B49

// Text: Warm gray (approachable)
text-color: #374151
text-dark: #111827
text-light: #9CA3AF
```

**Usage**: Prefer utility classes (`text-primary`, `bg-secondary`) over inline styles

### Typography
- **Headings**: Poppins (300-700) - Clean, modern, approachable
- **Body**: Open Sans (300-700) - Readable, professional
- **Base Size**: 17px (accessibility-first)
- **Hierarchy**: 1.2 scale (minorThird)

**Example**:
```html
<h1 class="mb-4">{{ .Title }}</h1>  <!-- Poppins, auto-sized -->
<p>{{ .Description }}</p>           <!-- Open Sans, 17px base -->
```

### Responsive Breakpoints
```scss
// Bootstrap 5 defaults (theme uses these)
sm: 576px   // Small devices
md: 768px   // Tablets
lg: 992px   // Desktops
xl: 1200px  // Large desktops
```

**Usage**:
```html
<div class="col-12 col-md-6 col-lg-4">
  <!-- 1 col mobile, 2 cols tablet, 3 cols desktop -->
</div>
```

---

## Quality Standards

### Code Style
- **Indentation**: 2 spaces (HTML, YAML)
- **Hugo Templates**: Use `{{- -}}` for whitespace control
- **Comments**: Explain WHY, not WHAT
- **Null Safety**: Always check `if $var` before using

**Example**:
```html
{{- $section := .Params.my_section -}}
{{- if $section -}}
  {{- range $section.items -}}
    <div>{{ .title }}</div>
  {{- end -}}
{{- end -}}
```

### Performance
- **Sections**: < 80 lines each
- **Build Time**: Target < 3 seconds
- **Image Optimization**: Use Hugo's image processing
  ```html
  {{ $img := resources.Get .image }}
  {{ $resized := $img.Resize "600x" }}
  <img src="{{ $resized.RelPermalink }}" alt="{{ .title }}">
  ```
- **Partial Caching**: For static partials (header, footer)
  ```html
  {{ partialCached "header.html" . }}
  ```

### Accessibility
- **Alt Text**: Required for all images
- **Semantic HTML**: Use `<section>`, `<article>`, `<nav>`, etc.
- **Color Contrast**: Minimum WCAG AA (4.5:1)
- **Keyboard Navigation**: Test tab order
- **ARIA Labels**: For icon-only buttons

**Example**:
```html
<a href="{{ .url }}" aria-label="Learn more about {{ .title }}">
  <i class="las la-arrow-right"></i>
</a>
```

---

## Testing Checklist

Before marking task complete, verify:

- [ ] **Multilingual**: Content exists in both RO and EN
- [ ] **Dev Server**: Page renders correctly (`npm run dev`)
- [ ] **Both Languages**: Tested `/ro/page` and `/en/page`
- [ ] **Responsive**: Checked mobile (375px), tablet (768px), desktop (1200px)
- [ ] **No Console Errors**: Browser dev tools clean
- [ ] **Build Success**: `npm run build` completes without errors
- [ ] **Images Load**: All images have correct paths and alt text
- [ ] **Links Work**: All navigation and CTAs functional
- [ ] **Calendly** (if used): Embedded/popup opens correctly

---

## Common Pitfalls & Solutions

### ❌ Problem: Section doesn't render
**Solution**: Check section data exists in front matter:
```yaml
sections:
  - type: "my-section"  # ← Section type added

my_section:             # ← Section data MISSING (add this!)
  title: "Section Title"
  items: [...]
```

### ❌ Problem: Translation missing
**Solution**: Add to both `i18n/ro.yaml` and `i18n/en.yaml`:
```yaml
# ro.yaml
my_key: "Textul în română"

# en.yaml
my_key: "Text in English"
```

### ❌ Problem: Page uses legacy layout
**Solution**: Check front matter has `layout: "flexible"`:
```yaml
---
title: "Page"
layout: "flexible"  # ← Add this if missing
---
```

### ❌ Problem: Image not loading
**Solution**: Images must be in `assets/images/` or `static/images/`:
```yaml
# ✅ Correct
image: "images/feature-01.png"

# ❌ Wrong (absolute path)
image: "/assets/images/feature-01.png"
```

### ❌ Problem: Build fails
**Solution**: Check Hugo template syntax:
```bash
# Run with verbose logging
hugo --verbose --debug

# Check template metrics
hugo --templateMetrics
```

---

## Development Commands

```bash
# Start dev server (live reload)
npm run dev
# → http://localhost:1313

# Production build
npm run build
# → Output in public/

# Production preview
npm run preview
# → http://localhost:1313 (minified)

# Format code
npm run format
# → Prettier with go-template plugin

# Update Hugo modules
npm run update-modules
```

---

## File Modification Rules

### ✅ SAFE to Modify
- `content/**/*.md` - Page content (always maintain RO + EN parity)
- `layouts/partials/sections/*.html` - Add new sections or edit existing
- `data/shared_sections.yaml` - Shared reusable data
- `config/_default/params.toml` - Site-wide settings
- `config/_default/menus.*.toml` - Navigation (RO/EN)
- `i18n/*.yaml` - Translations

### ⚠️ MODIFY WITH CAUTION
- `layouts/_default/flexible.html` - Core layout engine (stable, rarely needs changes)
- `hugo.toml` - Build config (breaking changes possible)
- `package.json` - Dependencies (breaking changes possible)
- `postcss.config.js` - CSS processing (affects build)

### ❌ DON'T MODIFY
- `themes/andromeda-hugo/` - Legacy theme (deprecated, being phased out)
- `node_modules/` - Dependencies (managed by npm)
- `public/` - Build output (auto-generated)
- `resources/` - Hugo cache (auto-generated)

---

## Modernization Roadmap (Reference)

**Current State**: 40% modern (flexible layouts), 60% legacy (monolithic)

**12-Week Plan** (see `cc-hugo-audit.md` for details):

**Phase 1 (Week 1-2)**: Extract atomic components
- Create `layouts/partials/atoms/` (button, heading, input, icon)
- Refactor 3 sections to use atoms

**Phase 2 (Week 3-4)**: Build molecule components
- Create `layouts/partials/molecules/` (card, form-field, nav-item)
- Refactor 6 sections to use molecules

**Phase 3 (Week 5-6)**: Decompose organisms
- Refactor header.html (300→50 lines)
- Refactor footer.html (200→40 lines)

**Phase 4 (Week 7-10)**: Migrate all pages to flexible
- Priority: about.html, services.html, pricing.html, contact.html
- Backup legacy layouts to `_deprecated/`

**Phase 5 (Week 11-12)**: Optimize & document
- Add partial caching
- Performance audit
- Create page archetypes

**When Working on Modernization**:
1. Reference `cc-hugo-audit.md` for detailed instructions
2. Follow atomic design hierarchy: atoms → molecules → organisms → sections
3. Test after each phase
4. Update PROJECT.md with progress

---

## Getting Help

**Documentation Priority**:
1. **This File** (`CLAUDE.md`) - How to work with Claude
2. **PROJECT.md** - Architecture, patterns, contribution guide
3. **cc-hugo-audit.md** - Modernization strategy, roadmap
4. **LAYOUT_MIXING_GUIDE.md** - Section configuration examples
5. **Hugo Docs** - https://gohugo.io/documentation/

**Debugging**:
```bash
# Template errors
hugo --verbose --debug

# Performance issues
hugo --templateMetrics --templateMetricsHints

# Build issues
hugo --gc --minify --verbose
```

**Ask User If**:
- Unclear which section to use for a use case
- Need to create new section type (verify doesn't exist)
- Breaking change needed (layout engine, build config)
- Design decision (colors, typography, spacing)
- Multilingual content ambiguity (RO vs EN translation)

---

## Summary: Your Workflow

**For Every Task**:
1. ✅ Read `PROJECT.md` if first time in project
2. ✅ Identify if task requires RO + EN changes (90% yes)
3. ✅ Use flexible layout pattern (no monolithic layouts)
4. ✅ Check existing 16 sections before creating new
5. ✅ Follow data hierarchy (front matter → shared → params)
6. ✅ Test both languages in dev server
7. ✅ Verify responsive behavior
8. ✅ Run `npm run build` to confirm no errors

**When Creating Components**:
- Under 80 lines (sections)
- Data-driven (no hardcoded text)
- Null-safe (`if` checks)
- Semantic HTML
- Accessible (alt text, ARIA, contrast)

**When Migrating Pages**:
- Read `cc-hugo-audit.md` Phase 4
- Map legacy sections to existing sections
- Backup legacy layout to `_deprecated/`
- Test both RO + EN thoroughly

---

**Document Version**: 1.0 | **Last Updated**: 2025-11-12 | **Hugo**: v0.148.1 extended
