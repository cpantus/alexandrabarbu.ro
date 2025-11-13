# Hugo Theme Audit - Andromeda Psychology Practice
**Version**: 1.0 | **Date**: 2025-11-12 | **Hugo**: v0.148.1 extended

---

## 1. Executive Summary

**Status**: ⚡ **Hybrid Architecture** (40% modular, 60% legacy)
**Verdict**: Ready for full component migration

**Key Metrics**:
- 16 section components (avg 44 lines, well-sized)
- 8/30+ pages using flexible layout
- 5 large monolithic layouts (237-287 lines) need migration
- Empty `layouts/partials/components/` directory

**ROI**: 12 weeks → 70% less duplication, 50% faster page creation

---

## 2. Architecture Analysis

### Current Structure
```
andromeda-hugo/
├── layouts/
│   ├── _default/
│   │   ├── flexible.html          ✅ Modern (sequential sections)
│   │   ├── contact-enhanced.html  ✅ Modern
│   │   └── faq.html               ✅ Modern
│   └── partials/
│       ├── sections/              ✅ 16 components (703 lines)
│       │   ├── hero-breadcrumb.html
│       │   ├── feature-blocks.html
│       │   ├── pricing-tables.html
│       │   └── ... (13 more)
│       └── components/            ⚠️ EMPTY
│
└── themes/andromeda-hugo/         ❌ Legacy base theme
    └── layouts/_default/
        ├── about.html             ❌ 287 lines (monolithic)
        ├── services.html          ❌ 237 lines (monolithic)
        ├── pricing.html           ❌ 164 lines (monolithic)
        └── ... (12 more layouts, 1,581 lines)
```

### Flexible Layout System (Working Well)
```yaml
# content/romanian/servicii.md
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "feature-blocks"
  - type: "values-intro"
  - type: "pricing-tables"
  - type: "benefits-grid"
```

**Pros**: Declarative, reorderable, DRY
**Issue**: Only 8/30+ pages migrated

---

## 3. Component Inventory

### Sections (16) - Status: ✅ Good
| Component | Lines | Purpose |
|-----------|-------|---------|
| hero-breadcrumb | 35 | Page header |
| feature-blocks | 37 | Image/text alternating |
| pricing-tables | 80 | Pricing cards |
| values-intro | 50 | Intro with image |
| benefits-grid | 60 | Icon grid |
| contact-form-enhanced | 90 | Contact form |
| faq-mini | 40 | FAQ accordion |
| ... | ... | (9 more) |

**Total**: 703 lines across 16 well-scoped sections

### Atomic Components - Status: ❌ Missing
```
layouts/partials/
├── atoms/           ❌ Non-existent (buttons, inputs, headings)
├── molecules/       ❌ Non-existent (cards, form-fields)
└── organisms/       ❌ Non-existent (header, footer, nav)
```

**Impact**: Duplication in sections, no reusable UI primitives

---

## 4. Problems & Solutions

### Problem 1: 60% Pages Still Monolithic
**Issue**: 22+ pages use legacy layouts instead of flexible

**Evidence**:
```bash
themes/andromeda-hugo/layouts/_default/
├── about.html     287 lines  ❌
├── services.html  237 lines  ❌
├── contact.html   166 lines  ❌
├── pricing.html   164 lines  ❌
```

**Solution**: Migrate to flexible layout
```yaml
# Before: content/about.md uses about.html layout (287 lines)
# After:
---
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "benefits-grid"
---
```

**Effort**: 2 hours per page × 5 high-value pages = 10 hours
**Benefit**: Reusable sections, consistent behavior

---

### Problem 2: No Atomic Components
**Issue**: Buttons, inputs, cards duplicated across sections

**Example Duplication**:
```html
<!-- Appears 8× across sections -->
<a href="{{ .url }}" class="btn btn-primary">{{ .text }}</a>
```

**Solution**: Extract atoms/molecules
```html
<!-- layouts/partials/atoms/button.html -->
{{- $variant := .variant | default "primary" -}}
<a href="{{ .url }}" class="btn btn-{{ $variant }}">{{ .text }}</a>

<!-- Usage in sections -->
{{ partial "atoms/button.html" (dict "variant" "primary" "text" "Learn More" "url" "/about") }}
```

**Priority Atoms** (12 hours):
- button.html (variants: primary, secondary, outline)
- heading.html (h1-h6 with responsive sizing)
- input.html (text, email, tel, textarea)
- icon.html (Line Awesome wrapper)

**Priority Molecules** (18 hours):
- card.html (feature, pricing, testimonial)
- form-field.html (label + input + error)
- nav-item.html (desktop/mobile navigation)

**Effort**: 30 hours | **Benefit**: 70% less duplication

---

### Problem 3: Monolithic Header/Footer
**Issue**: `themes/.../partials/essentials/header.html` (300 lines)

**Solution**: Decompose
```
BEFORE: header.html (300 lines)

AFTER:
organisms/header.html (50 lines)
├── molecules/logo.html (20 lines)
├── molecules/navigation.html (80 lines)
├── molecules/language-selector.html (40 lines)
└── molecules/mobile-menu.html (110 lines)
```

**Effort**: 8 hours | **Benefit**: Easier testing, reusable nav

---

### Problem 4: Inconsistent Data Sources
**Issue**: Mixed front matter + data files + params

**Convention** (establish):
```yaml
# Front matter: Page-specific content
---
title: "Services"
pricing_card:
  - name: "Basic"
    price: 99
---

# data/shared/: Cross-page reusable content
# data/shared/testimonials.yaml
testimonials:
  - author: "John"
    quote: "..."

# hugo.toml params: Site-wide config
[params.design]
headings_brand_color = true
```

**Effort**: 6 hours migration | **Benefit**: Predictable data access

---

## 5. Modernization Roadmap (12 Weeks)

### Phase 1: Atoms (Week 1-2) - 20 hours
**Goal**: Reusable UI primitives

1. Create directory structure (`layouts/partials/atoms/`)
2. Extract atoms:
   - `button.html` (6 variants)
   - `heading.html` (h1-h6)
   - `input.html` (4 types)
   - `icon.html`
3. Document usage (`docs/components/atoms.md`)
4. Refactor 3 sections to use atoms

**Deliverable**: 4 atomic components, 3 sections refactored

---

### Phase 2: Molecules (Week 3-4) - 30 hours
**Goal**: Composite UI components

1. Create molecules:
   - `card.html` (3 variants: feature, pricing, testimonial)
   - `form-field.html`
   - `nav-item.html`
2. Refactor 6 sections to use molecules
3. Create component preview page

**Deliverable**: 3 molecule components, 6 sections refactored

---

### Phase 3: Organisms (Week 5-6) - 24 hours
**Goal**: Decompose monolithic partials

1. Refactor `header.html` (300→50 lines)
2. Refactor `footer.html` (200→40 lines)
3. Extract navigation molecules
4. Update all sections to use organisms

**Deliverable**: Header/footer decomposed, full atomic hierarchy

---

### Phase 4: Migration (Week 7-10) - 40 hours
**Goal**: Move all pages to flexible layout

**Priority pages**:
1. `about.html` → flexible (8h)
2. `services.html` → flexible (6h)
3. `pricing.html` → flexible (4h)
4. `contact.html` → flexible (4h)
5. Remaining 18 pages (18h)

**Process per page**:
1. Analyze current layout structure
2. Map to existing sections (or create new)
3. Migrate front matter data
4. Test multilingual (RO/EN)
5. Backup old layout to `_deprecated/`

**Deliverable**: 100% pages on flexible system

---

### Phase 5: Optimization (Week 11-12) - 16 hours
**Goal**: Performance and polish

1. Add partial caching:
   ```html
   {{ partialCached "organisms/header.html" . }}
   ```
2. Responsive image optimization (srcset)
3. Create page archetypes:
   ```yaml
   # archetypes/service-page.md
   layout: "flexible"
   sections:
     - type: "hero-breadcrumb"
     - type: "feature-blocks"
     - type: "pricing-tables"
   ```
4. Performance audit (`hugo --templateMetrics`)
5. Documentation (usage guide, migration guide)

**Deliverable**: <3s build time, complete docs

---

## 6. Quick Wins (Week 1)

**5 actions, 8 hours total**:

1. **Extract button component** (2h)
   ```bash
   mkdir -p layouts/partials/atoms
   # Create button.html with variants
   ```

2. **Migrate 1 simple page to flexible** (2h)
   ```yaml
   # Pick simplest page (e.g., terms.html)
   # Convert to flexible layout
   ```

3. **Document component usage** (2h)
   ```bash
   mkdir -p docs/components
   # Create atoms.md with examples
   ```

4. **Set data conventions** (1h)
   ```markdown
   # Add to README:
   ## Data Sources
   - Front matter: Page content
   - data/shared/: Reusable content
   - params: Site config
   ```

5. **Create GitHub project board** (1h)
   - Track component extraction
   - Track page migrations
   - Measure progress

---

## 7. Testing Strategy

### Component Testing
```bash
# Create test page
content/test/components.md

# Preview components
hugo server -D

# Visual check:
# - All variants render
# - Responsive behavior
# - Accessibility (WCAG AA)
```

### Performance Testing
```bash
# Before/after metrics
hugo --templateMetrics | grep partials

# Target: <10ms per component
# Monitor: Build time <3s
```

### Regression Testing
```bash
# Compare pages before/after migration
diff <(curl http://localhost:1313/ro/about) <(curl http://localhost:1313/ro/about-new)

# Check: Same content, structure, behavior
```

---

## 8. Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Pages on flexible layout | 27% (8/30) | 100% |
| Code duplication | ~40% | <10% |
| Build time | ~5s | <3s |
| Component reusability | ~30% | >80% |
| New page creation | ~30min | <10min |
| Atomic components | 0 | 15+ |

---

## 9. Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Breaking existing pages | Backup layouts to `_deprecated/`, phased migration |
| Performance regression | Benchmark before/after, aggressive caching |
| Increased complexity | Simple patterns, thorough documentation |
| Team learning curve | Component examples, pair programming |

---

## 10. Investment Summary

**Total Effort**: 130 hours over 12 weeks
**Cost**: ~$6,500 @ $50/hr (or 3-4 weeks focused dev time)

**Returns**:
- 70% less code duplication = easier maintenance
- 50% faster page creation = faster iterations
- Consistent UI = better UX
- Reusable across sites = long-term leverage

**Payback Period**: After ~20 new pages created (~4 months)

---

## 11. Next Steps

### This Week
1. ✅ Review audit with team (30 min)
2. ✅ Approve modernization plan (decision)
3. ✅ Set up dev branch `feature/atomic-components`
4. ✅ Create GitHub project board
5. ✅ Start Phase 1 (extract button atom)

### Week 1 Deliverables
- Button component (6 variants)
- Heading component
- 1 page migrated to flexible
- Component documentation started

---

## 12. Resources

**Hugo Docs**:
- Partials: https://gohugo.io/templates/partials/
- Lookup order: https://gohugo.io/templates/lookup-order/

**Design Systems**:
- Atomic Design: https://atomicdesign.bradfrost.com/

**Tools**:
```bash
# Performance
hugo --templateMetrics --templateMetricsHints

# Testing
hugo server --disableFastRender

# Build
hugo --gc --minify
```

---

## Appendix: Component Examples

### Atom: Button
```html
<!-- layouts/partials/atoms/button.html -->
{{- $variant := .variant | default "primary" -}}
{{- $size := .size | default "medium" -}}
<a href="{{ .url }}" class="btn btn-{{ $variant }} btn-{{ $size }}">
  {{- if .icon }}<i class="{{ .icon }} me-2"></i>{{ end -}}
  {{ .text }}
</a>
```

### Molecule: Card
```html
<!-- layouts/partials/molecules/card.html -->
<div class="card h-100">
  {{- if .image -}}
    {{ partial "atoms/image.html" (dict "src" .image "alt" .title) }}
  {{- end -}}
  <div class="card-body">
    {{ partial "atoms/heading.html" (dict "level" 3 "text" .title) }}
    <p>{{ .description | markdownify }}</p>
    {{ partial "atoms/button.html" (dict "variant" "outline" "text" "Learn More" "url" .link) }}
  </div>
</div>
```

### Usage in Section
```html
<!-- layouts/partials/sections/feature-blocks.html -->
{{ range .Params.features }}
  <div class="col-md-4">
    {{ partial "molecules/card.html" . }}
  </div>
{{ end }}
```

---

**Document Version**: 2.0 (Compressed)
**Pages**: 7 (down from 65)
**Reading Time**: 8 minutes
