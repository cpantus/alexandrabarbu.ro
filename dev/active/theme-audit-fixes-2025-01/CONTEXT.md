# Detailed Context & Specifications

**Project**: Theme Audit & Fixes
**Date**: 2025-11-21

---

## Project Background

### Initial State
- **Theme**: Andromeda Hugo v5.1.0 (complete 2025 refactor)
- **Architecture**: BEM + ITCSS (66 components: 9 atoms + 29 molecules + 2 organisms + 26 sections)
- **Typography**: Crimson Pro (serif headings) + Work Sans (sans body)
- **Build Status**: Succeeding but with 22 warnings
- **User Report**: "Display problems"

### Refactor History
From `REFACTOR-2025-SUMMARY.md`:
- Completed 2025-11-20
- 9.5 hours across multiple sessions
- 66 components refactored with BEM + ITCSS
- Build succeeds (8.36s full, 477ms cached)
- 2 acceptable warnings (now 22 - regression!)

---

## Audit Reports (Agent Analysis)

### Hugo Specialist Agent Report

**Build Analysis** (Full Output):
```
hugo v0.152.2-6abdacad3f3fe944ea42177844469139e81feda6+extended linux/amd64

WARN  found no layout file for "html" for kind "taxonomy"
WARN  found no layout file for "html" for layout "signin" for kind "page"
WARN  found no layout file for "html" for layout "signup" for kind "page"
WARN  found no layout file for "html" for layout "pricing" for kind "page"
WARN  found no layout file for "html" for layout "terms-and-conditions" for kind "page"
WARN  cta-standard section requires: title, description, button_text, button_url (12 occurrences)
WARN  contact-method-card.html: Missing required parameter 'label'
WARN  contact-method-card.html: Missing required parameter 'value'
WARN  timeline-step.html: invalid variant 'coral'. Using 'primary'.
WARN  process-step: 'step' parameter is required
WARN  service-faq-inline: 'questions' array is empty (14 occurrences)
WARN  found no layout file for "webappmanifest" for layout "flexible"
```

**Critical Issues Identified**:
1. Logo not rendering (img vs SVG mismatch)
2. Typography loading wrong fonts (Poppins/Open Sans instead of Crimson Pro/Work Sans)
3. CTA data structure mismatch (12 pages affected)
4. Missing list.html template (taxonomy pages broken)
5. Missing layout templates (5 pages can't render)

**Root Causes**:
- Logo: Template expects inline SVG but has img tag
- Typography: Legacy variables point to old fonts
- CTA: Template expects flat structure, content uses nested
- Taxonomy: No fallback list template defined
- Layouts: Content files declare non-existent layouts

### UX Designer Agent Report

**Critical Visual Issues**:
1. **Logo Display** (HIGH) - Brand identity broken
   - CSS expects `.c-logo__svg` element
   - Template provides `<img>` tag
   - Color variants non-functional
   - Footer logo missing

2. **Typography Inconsistency** (HIGH) - Design system broken
   - Should load: Crimson Pro + Work Sans
   - Actually loading: Poppins + Open Sans (legacy)
   - Mixed font families across components
   - FOUC (Flash of Unstyled Content) risk

3. **Footer Layout** (MEDIUM) - Visual misalignment
   - Grid system (4 columns) conflicts with flexbox
   - footer-nav has `max-width: 66.666%` but is grid child
   - Excessive padding causing imbalance
   - Responsive breakpoints not working correctly

4. **WCAG Compliance** (MEDIUM) - Accessibility violations
   - Footer copyright: 3.8:1 contrast (fails WCAG AA 4.5:1)
   - `$color-text-muted` (#6b7280) too light
   - Breadcrumb text fails contrast
   - Legal liability risk

5. **Design Token Confusion** (LOW) - Developer confusion
   - 10+ variables for 2 font families
   - `$font-heading`, `$font-serif`, `$font-family-heading` all → same value
   - Legacy aliases create inconsistency

**Responsive Breakpoint Issues**:
| Breakpoint | Width | Issue |
|------------|-------|-------|
| 320px | Small Mobile | Footer text wrapping awkwardly |
| 768px | Tablet | Footer grid breaks (2 columns) |
| 992px | Desktop | Footer nav alignment off |
| 1200px+ | Large | Logo slightly oversized |

---

## Technical Specifications

### File Locations

**Theme Structure** (Flattened - No subdirectory):
```
/home/cere/Work/alex/alexandrabarbu.ro/
├── themes/andromeda-hugo/
│   ├── layouts/
│   │   ├── _default/
│   │   │   ├── flexible.html         # Layout engine
│   │   │   ├── list.html             # NEW (created in Phase 1)
│   │   │   ├── baseof.html
│   │   │   └── [other layouts]
│   │   └── partials/
│   │       ├── atoms/
│   │       ├── molecules/
│   │       │   └── logo.html         # MODIFIED (Phase 1)
│   │       ├── organisms/
│   │       └── sections/
│   │           └── cta-standard.html # MODIFIED (Phase 1)
│   └── assets/
│       └── scss/
│           ├── 01-settings/
│           │   └── _tokens-typography.scss # MODIFIED (Phase 1)
│           └── 06-components/
│               ├── _footer.scss       # TODO (Phase 2)
│               └── _footer-nav.scss   # TODO (Phase 2)
└── content/
    ├── english/
    │   ├── signin.md                  # MODIFIED (Phase 1)
    │   ├── signup.md                  # MODIFIED (Phase 1)
    │   ├── pricing.md                 # MODIFIED (Phase 1)
    │   └── terms-and-conditions.md    # MODIFIED (Phase 1)
    └── romanian/
        ├── signin.md                  # MODIFIED (Phase 1)
        ├── signup.md                  # MODIFIED (Phase 1)
        ├── pricing.md                 # MODIFIED (Phase 1)
        └── terms-and-conditions.md    # MODIFIED (Phase 1)
```

### Design System Reference

**Typography Tokens** (Correct):
```scss
$font-heading: 'Crimson Pro', Georgia, serif;    // Headings - Elegant
$font-body: 'Work Sans', sans-serif;              // Body - Friendly

// Weights
$font-weight-heading: 500;                        // Default headings
$font-weight-heading-bold: 600;                   // Emphasized headings
$font-weight-body: 400;                           // Body text
```

**Typography Tokens** (Legacy - Fixed in Phase 1):
```scss
// Before (WRONG):
$font-primary: 'Poppins', sans-serif;
$font-secondary: 'Open Sans', sans-serif;

// After (CORRECT):
$font-primary: $font-heading;     // Redirects to Crimson Pro
$font-secondary: $font-body;      // Redirects to Work Sans
```

**Color Tokens** (WCAG Issue):
```scss
$color-text-muted: $gray-500;        // #6b7280 (3.8:1 - FAILS)
$color-text-secondary: $gray-600;    // #4b5563 (6.4:1 - PASSES)
$color-bg-page: $gray-50;            // #f9fafb (light background)
```

**Spacing Grid** (8pt system):
```scss
$space-1: 0.5rem;   // 8px
$space-2: 1rem;     // 16px
$space-3: 1.5rem;   // 24px
$space-4: 2rem;     // 32px
$space-6: 3rem;     // 48px
$space-8: 4rem;     // 64px
```

### Component Architecture

**Logo Molecule Structure**:
```html
<!-- Before (BROKEN): -->
<img src="images/logo.svg" alt="Site Title" class="c-logo__svg">

<!-- After (FIXED): -->
<svg class="c-logo__svg" viewBox="0 0 3149 699" role="img">
  <g fill="currentColor">...</g>
</svg>
```

**CTA Section Data Structures**:
```yaml
# Flat Structure (Legacy - Still Supported):
cta_standard:
  title: "Title"
  description: "Description"
  button_text: "Click Me"
  button_url: "/contact"
  button_variant: "primary"

# Nested Structure (Current - Preferred):
cta_standard:
  title: "Title"
  description: "Description"
  primary_button:
    text: "Click Me"
    url: "/contact"
    variant: "primary"
  secondary_button:
    text: "Learn More"
    url: "/about"
    variant: "outline-secondary"
```

**Contact Card Data Mismatch**:
```yaml
# Template Expects:
contact_methods:
  - label: "Phone"      # ← expects 'label'
    value: "+40 123"    # ← expects 'value'

# Content Provides:
contact_methods:
  - title: "Phone"      # ← provides 'title'
    info: "+40 123"     # ← provides 'info'
```

---

## Build Environment

### Hugo Configuration
- **Version**: v0.152.2-6abdacad3f3fe944ea42177844469139e81feda6+extended
- **Platform**: linux/amd64
- **Build Date**: 2025-10-24T15:31:49Z
- **Extended Features**: ✅ SCSS compilation, image processing

### Languages
- **Default**: Romanian (ro) - Root path `/`
- **Additional**: English (en) - Path `/en/`
- **Content Structure**: Separate directories (`content/romanian/`, `content/english/`)

### Build Commands
```bash
# Development
hugo server --buildDrafts --bind 0.0.0.0 --port 1313

# Production
hugo --gc --minify

# Clean Build
rm -rf public/ resources/ && hugo --gc --minify

# Performance Check
hugo --templateMetrics

# Verbose Debug
hugo --verbose --debug
```

### Performance Targets
- Full build: <10s (currently 8.09s) ✅
- Cached build: <3s (currently 439ms) ✅
- Page size: <520KB ✅
- Images: WebP + lazy loading ✅

---

## Content Schema Examples

### Service Page Front Matter (12 sections):
```yaml
---
title: "Individual Therapy"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "feature-blocks"
  - type: "problem-empathy"
  - type: "therapeutic-process"
  - type: "methods-used"
  - type: "benefits-results"
  - type: "pricing-packages"
  - type: "service-faq-inline"
  - type: "testimonials-enhanced"
  - type: "cta-standard"
  - type: "services-preview"
  - type: "footer"

hero_breadcrumb:
  title: "Individual Therapy"
  subtitle: "Evidence-based approach"

cta_standard:
  title: "Ready to Start?"
  description: "Take the first step"
  primary_button:
    text: "Book Appointment"
    url: "/contact"
    variant: "primary"
---
```

### Homepage Front Matter (10 sections):
```yaml
---
title: "Home"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "problem-empathy"
  - type: "services-preview"
  - type: "about-preview"
  - type: "approach-preview"
  - type: "testimonials-enhanced"
  - type: "simple-process"
  - type: "faq-mini"
  - type: "cta-standard"
  - type: "footer"
---
```

---

## Testing Protocols

### Build Validation
```bash
# 1. Clean build
rm -rf public/ resources/

# 2. Full build
hugo --gc --minify 2>&1 | tee build.log

# 3. Check warnings
grep "WARN" build.log | wc -l

# 4. Check errors
grep "ERROR" build.log

# 5. Verify pages generated
grep "Pages" build.log
```

### Visual Testing Checklist
- [ ] Logo displays in header (all variants)
- [ ] Logo displays in footer
- [ ] All headings use Crimson Pro
- [ ] All body text uses Work Sans
- [ ] Footer sections aligned correctly
- [ ] Footer text readable (contrast check)
- [ ] CTA buttons render on all pages
- [ ] Contact cards display correctly
- [ ] Responsive at 375px, 768px, 1200px
- [ ] No console errors in browser

### Contrast Testing
```bash
# Tools:
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Inspect → Accessibility → Contrast

# Required Ratios:
- Normal text: ≥4.5:1 (WCAG AA)
- Large text (18pt+): ≥3:1 (WCAG AA)
- UI components: ≥3:1 (WCAG AA)
```

---

## Known Constraints

### Cannot Change
1. **BEM + ITCSS architecture** - Core design system
2. **Flexible layout pattern** - Standard for all pages
3. **Design token system** - Foundation of styling
4. **Multilingual structure** - RO + EN support
5. **Component hierarchy** - Atoms → Molecules → Organisms → Sections

### Must Preserve
1. **Build performance** - <3s cached, <10s full
2. **Responsive breakpoints** - 4 standard sizes
3. **Accessibility** - WCAG AA minimum
4. **Component reusability** - DRY principle
5. **Hugo best practices** - `.RelPermalink`, null-safety

### Can Modify Carefully
1. **SCSS component styles** - Test thoroughly
2. **Template logic** - Maintain backward compatibility
3. **Front matter structure** - Support legacy formats
4. **Design tokens** - Document clearly
5. **Layout templates** - Ensure fallbacks work

---

## Reference Documents

### Primary References
1. `/REFACTOR-2025-SUMMARY.md` - Complete refactor history
2. `/themes/andromeda-hugo/ARCHITECTURE.md` - Technical architecture
3. `/themes/andromeda-hugo/CLAUDE-ITCSS-ADDENDUM.md` - ITCSS quick reference
4. `/dev/active/site-structure-implementation-2025-01/PROGRESS.md` - Site structure work

### Agent Reports
- Hugo Specialist: Full build analysis, 22 warnings categorized
- UX Designer: Visual audit, WCAG issues, responsive testing

### Hugo Documentation
- Layouts: https://gohugo.io/templates/lookup-order/
- Front Matter: https://gohugo.io/content-management/front-matter/
- Multilingual: https://gohugo.io/content-management/multilingual/

---

## Success Criteria (Revisited)

### Phase 1 (COMPLETE ✅)
- [x] Logo renders correctly
- [x] Typography uses correct fonts
- [x] CTA warnings < 2 (achieved: 1)
- [x] Build warnings < 10 (achieved: 8)
- [x] Build succeeds
- [x] All pages load

### Phase 2 (PENDING)
- [ ] Build warnings ≤ 3 (target: 0)
- [ ] WCAG AA compliance (all text)
- [ ] Footer layout correct
- [ ] Contact cards display properly
- [ ] No console errors
- [ ] Lighthouse score ≥ 90

---

**Last Updated**: 2025-11-21
**Author**: Claude
**Version**: 1.0.0
