# Hugo Atomic Design System - Testing Guide

**Date**: 2025-11-14
**Version**: 1.0.0
**System Status**: Production Ready ✅

---

## Quick Start Testing

### 1. Start Hugo Development Server

```bash
cd /home/user/alexandrabarbu.ro
hugo server --buildDrafts --disableFastRender
```

**Expected output:**
```
Web Server is available at http://localhost:1313/
Press Ctrl+C to stop
```

**What this does:**
- `--buildDrafts`: Include draft pages in preview
- `--disableFastRender`: Full rebuild for accurate testing
- Hot reload: Auto-refresh browser on file changes

---

## 2. Test Pages Available

### A. Component Preview Page
**URL**: `http://localhost:1313/components-preview/`
**Purpose**: Test all atomic components (atoms + examples)
**Status**: ✅ Exists (draft mode)

**What to verify:**
- [ ] All 5 atoms render correctly
- [ ] Code examples are displayed
- [ ] Buttons have hover effects
- [ ] Icons load properly
- [ ] Images process correctly (WebP)

### B. Complete System Test Page
**URL**: `http://localhost:1313/test-all-sections/`
**Purpose**: Test all 16 section types in one page
**Status**: ✅ Created (see `content/test-all-sections.md`)

**What to verify:**
- [ ] All 16 sections render in correct order
- [ ] Header + Footer appear (organisms)
- [ ] Pricing toggle works (monthly/yearly)
- [ ] Contact form validation works
- [ ] FAQ accordion expands/collapses
- [ ] Video popup triggers correctly
- [ ] Mobile responsive layout
- [ ] Multilingual switching (if enabled)

---

## 3. Testing Checklist

### Level 1: Visual Testing (5 minutes)

```bash
# Start server
hugo server --buildDrafts

# Open in browser:
# http://localhost:1313/test-all-sections/
```

**Verify:**
- [ ] Page loads without errors
- [ ] All sections visible
- [ ] Colors match theme (Terracotta #CC6B49 + Emerald #4DB380)
- [ ] Fonts load correctly (Poppins headings, Open Sans body)
- [ ] Images load and are responsive
- [ ] Animations trigger on scroll (AOS)

### Level 2: Component Testing (10 minutes)

**Atoms (5 components):**
```bash
# View component preview
http://localhost:1313/components-preview/
```

- [ ] **Button**: All variants (primary, secondary, outline)
- [ ] **Heading**: All levels (h1-h6), all variants
- [ ] **Input**: All types (text, email, textarea, checkbox, radio, select)
- [ ] **Icon**: Line Awesome icons render
- [ ] **Image**: WebP generation, responsive srcset, lazy loading

**Molecules (14 components):**
- [ ] **Card**: Feature, pricing, testimonial variants
- [ ] **Form Field**: Label + input + validation
- [ ] **Accordion**: FAQ collapse/expand
- [ ] **Pricing Toggle**: Monthly/yearly switch
- [ ] **Video Embed**: Thumbnail + popup
- [ ] **Social Links**: Icon grid
- [ ] **Breadcrumb**: Navigation path
- [ ] **Nav Item**: Active states
- [ ] **Logo**: SVG rendering
- [ ] **Language Selector**: RO/EN/FR switching
- [ ] **Navigation**: Dropdown menus
- [ ] **Mobile Menu**: Hamburger + slide-in
- [ ] **Footer Nav**: Links render
- [ ] **Footer Info**: Contact info displays

**Organisms (2 components):**
- [ ] **Header**: Logo + nav + language selector + mobile menu
- [ ] **Footer**: Info + nav + social links + copyright

### Level 3: Functional Testing (15 minutes)

**Pricing System:**
```javascript
// Test pricing toggle
1. Navigate to pricing section
2. Click "Monthly" / "Yearly" toggle
3. Verify prices update correctly
4. Check smooth transition animation
```

**Contact Form:**
```javascript
// Test form validation
1. Navigate to contact form section
2. Submit empty form → should show validation errors
3. Enter invalid email → should show error
4. Fill correctly → should submit (or show success)
5. Check reCAPTCHA v3 loads (if configured)
```

**FAQ Accordion:**
```javascript
// Test accordion behavior
1. Navigate to FAQ section
2. Click question → answer expands
3. Click another → previous collapses (Bootstrap 5)
4. Verify smooth transitions
```

**Video Popup:**
```javascript
// Test video embed
1. Navigate to video section
2. Click play button
3. Verify video loads (YouTube/Vimeo)
4. Check modal/popup behavior
```

**Multilingual:**
```javascript
// Test language switching (if enabled)
1. Click language selector
2. Switch to RO → content changes
3. Switch to EN → content changes
4. Verify URL structure (/ro/, /en/)
```

### Level 4: Performance Testing (10 minutes)

**Build Time:**
```bash
# Clean build with metrics
hugo --gc --minify --templateMetrics --templateMetricsHints

# Target: <3s build time
# Check output for slow templates
```

**Page Weight:**
```bash
# Build production
hugo --gc --minify

# Check public/ folder size
du -sh public/

# Target: <500KB per page
# Check in browser DevTools Network tab
```

**Image Optimization:**
```bash
# Check WebP generation
ls public/images/**/*.webp

# Verify responsive srcset in HTML
curl http://localhost:1313/test-all-sections/ | grep srcset

# Target: <2MB total image assets
```

**CSS Bundle:**
```bash
# Check CSS file size
ls -lh public/css/*.css

# Target: <50KB gzipped
gzip -c public/css/style.min.css | wc -c
```

**Partial Caching:**
```bash
# Verify caching in template
grep -r "partialCached" themes/andromeda-hugo/layouts/

# Should find:
# - Header organism cached by language
# - Footer organism cached by language
```

### Level 5: Responsive Testing (10 minutes)

**Browser DevTools:**
```javascript
// Test breakpoints
F12 → Toggle device toolbar

// Viewports to test:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1280px (laptop)
- Large: 1920px (desktop)
```

**Verify:**
- [ ] Mobile menu appears on mobile (<992px)
- [ ] Desktop nav appears on desktop (>992px)
- [ ] Pricing cards stack on mobile
- [ ] Feature blocks alternate properly
- [ ] Forms are full-width on mobile
- [ ] Images scale responsively
- [ ] Text remains readable (no overflow)
- [ ] Buttons are touch-friendly (min 44px)

### Level 6: Accessibility Testing (5 minutes)

**Keyboard Navigation:**
```javascript
// Test with keyboard only
Tab → Should highlight interactive elements
Enter/Space → Should activate buttons/links
Escape → Should close modals
Arrow keys → Should navigate dropdowns
```

**Screen Reader:**
```bash
# Check semantic HTML
curl http://localhost:1313/test-all-sections/ | grep -E "<h[1-6]|<nav|<main|<footer|<header|alt="

# Verify:
- Heading hierarchy (h1 → h2 → h3)
- Alt text on images
- ARIA labels on icons
- Form labels associated with inputs
```

**Reduced Motion:**
```css
/* Test in browser DevTools */
Emulate CSS media feature: prefers-reduced-motion: reduce

/* Verify animations are disabled/simplified */
```

---

## 4. Creating New Test Pages

### Method 1: Using Archetypes

```bash
# Service page
hugo new content/services/test-service.md --kind service-page

# Therapy page
hugo new content/therapy/test-therapy.md --kind therapy-page

# Landing page
hugo new content/landing/test-landing.md --kind landing-page
```

### Method 2: Manual Creation

```yaml
---
title: "My Test Page"
date: 2025-11-14
draft: false
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "benefits-grid"
  - type: "pricing-tables"
  - type: "contact-form-enhanced"

# Add section data here
benefits_section:
  title: "Test Benefits"
  benefits:
    - icon: "las la-check"
      title: "Benefit 1"
---
```

---

## 5. Common Issues & Troubleshooting

### Issue: Sections not rendering

**Symptoms:**
- Blank spaces where sections should be
- "Unknown section type" comments in HTML

**Fix:**
```bash
# Check section type spelling in front matter
# Verify section partial exists
ls themes/andromeda-hugo/layouts/partials/sections/

# Check if section is registered in flexible.html
grep "section-type-name" themes/andromeda-hugo/layouts/_default/flexible.html
```

### Issue: Images not loading

**Symptoms:**
- Broken image icons
- 404 errors in console

**Fix:**
```bash
# Check image path (relative to static/)
ls static/images/

# Verify image processing
hugo --verbose | grep "processing image"

# Check Hugo resources
ls resources/_gen/images/
```

### Issue: Pricing toggle not working

**Symptoms:**
- Toggle clicks but prices don't change
- JavaScript errors in console

**Fix:**
```bash
# Verify pricing-scripts.html is included
grep "pricing-scripts" themes/andromeda-hugo/layouts/_default/flexible.html

# Check JavaScript loads
curl http://localhost:1313/test-all-sections/ | grep "pricing"

# Test in browser console
document.querySelectorAll('[data-pricing-monthly]')
```

### Issue: Forms not validating

**Symptoms:**
- Form submits without validation
- No error messages

**Fix:**
```bash
# Check form-field molecule includes validation
cat themes/andromeda-hugo/layouts/partials/molecules/form-field.html | grep required

# Verify JavaScript is loaded
# Check browser console for errors
```

### Issue: Build time >3s

**Symptoms:**
- Slow hugo server startup
- Slow page regeneration

**Fix:**
```bash
# Check template metrics
hugo --templateMetrics --templateMetricsHints

# Verify partial caching is used
grep partialCached themes/andromeda-hugo/layouts/partials/essentials/*

# Check for heavy image processing
hugo --verbose | grep "image processing"
```

---

## 6. Test Results Template

```markdown
# Test Results - [Date]

## Environment
- Hugo version: [run `hugo version`]
- Theme: Andromeda v2.0
- Branch: [git branch name]

## Level 1: Visual Testing
- [ ] Pass / [ ] Fail - Page loads
- [ ] Pass / [ ] Fail - All sections visible
- [ ] Pass / [ ] Fail - Colors correct
- [ ] Pass / [ ] Fail - Fonts load
- [ ] Pass / [ ] Fail - Images responsive

## Level 2: Component Testing
- [ ] Pass / [ ] Fail - Atoms (5/5)
- [ ] Pass / [ ] Fail - Molecules (14/14)
- [ ] Pass / [ ] Fail - Organisms (2/2)

## Level 3: Functional Testing
- [ ] Pass / [ ] Fail - Pricing toggle
- [ ] Pass / [ ] Fail - Contact form
- [ ] Pass / [ ] Fail - FAQ accordion
- [ ] Pass / [ ] Fail - Video popup

## Level 4: Performance Testing
- Build time: [X]s (target: <3s)
- Page weight: [X]KB (target: <500KB)
- CSS bundle: [X]KB (target: <50KB gzipped)

## Level 5: Responsive Testing
- [ ] Pass / [ ] Fail - Mobile (375px)
- [ ] Pass / [ ] Fail - Tablet (768px)
- [ ] Pass / [ ] Fail - Desktop (1280px)

## Level 6: Accessibility Testing
- [ ] Pass / [ ] Fail - Keyboard navigation
- [ ] Pass / [ ] Fail - Semantic HTML
- [ ] Pass / [ ] Fail - Reduced motion

## Issues Found
1. [Issue description] - [Severity: Low/Medium/High]
2. [Issue description] - [Severity: Low/Medium/High]

## Notes
[Additional observations]
```

---

## 7. Automated Testing Scripts

### Performance Check Script

Create `scripts/test-performance.sh`:

```bash
#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Hugo Performance Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Clean build
echo "🧹 Cleaning previous build..."
rm -rf public/ resources/

# Build with metrics
echo "🔨 Building with metrics..."
time hugo --gc --minify --templateMetrics > /tmp/hugo-metrics.txt 2>&1

# Check build time
BUILD_TIME=$(grep "Total in" /tmp/hugo-metrics.txt | awk '{print $3}')
echo "⏱️  Build time: $BUILD_TIME"

# Check template metrics
echo ""
echo "📊 Slowest templates:"
grep -A 10 "Template Metrics" /tmp/hugo-metrics.txt

# Check output size
echo ""
echo "📦 Output size:"
du -sh public/
echo ""
du -sh public/css/
du -sh public/js/
du -sh public/images/ 2>/dev/null || echo "No images processed"

# Check CSS bundle size
if [ -f public/css/style.min.css ]; then
    GZIPPED=$(gzip -c public/css/style.min.css | wc -c)
    echo ""
    echo "💅 CSS bundle (gzipped): $(($GZIPPED / 1024))KB"
fi

# Check for WebP images
WEBP_COUNT=$(find public/images -name "*.webp" 2>/dev/null | wc -l)
echo "🖼️  WebP images generated: $WEBP_COUNT"

echo ""
echo "✅ Performance test complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

### Component Check Script

Create `scripts/test-components.sh`:

```bash
#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Component Verification Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

THEME_DIR="themes/andromeda-hugo/layouts/partials"

# Check atoms
echo ""
echo "🔬 Atoms (5 expected):"
ls -1 $THEME_DIR/atoms/ | wc -l
ls -1 $THEME_DIR/atoms/

# Check molecules
echo ""
echo "🧪 Molecules (14 expected):"
ls -1 $THEME_DIR/molecules/ | wc -l
ls -1 $THEME_DIR/molecules/

# Check organisms
echo ""
echo "🦠 Organisms (2 expected):"
ls -1 $THEME_DIR/organisms/ 2>/dev/null | wc -l
ls -1 $THEME_DIR/organisms/ 2>/dev/null

# Check sections
echo ""
echo "📦 Sections (16 expected):"
ls -1 $THEME_DIR/sections/ | wc -l
ls -1 $THEME_DIR/sections/

# Verify archetypes
echo ""
echo "📋 Archetypes (3 expected):"
ls -1 themes/andromeda-hugo/archetypes/*.md 2>/dev/null | wc -l
ls -1 themes/andromeda-hugo/archetypes/*.md 2>/dev/null

echo ""
echo "✅ Component check complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

Make scripts executable:
```bash
chmod +x scripts/test-performance.sh
chmod +x scripts/test-components.sh
```

---

## 8. Quick Test Commands

```bash
# Full test suite
hugo server --buildDrafts && open http://localhost:1313/test-all-sections/

# Performance test
./scripts/test-performance.sh

# Component verification
./scripts/test-components.sh

# Build production
hugo --gc --minify

# Check for errors
hugo --verbose 2>&1 | grep -i error

# Validate HTML
curl http://localhost:1313/test-all-sections/ | tidy -errors -q
```

---

## Success Criteria

Your system is working correctly if:

- ✅ **Build time**: <3 seconds
- ✅ **Page weight**: <500KB
- ✅ **CSS bundle**: <50KB gzipped
- ✅ **Image assets**: <2MB total (WebP enabled)
- ✅ **Components**: 5 atoms + 14 molecules + 2 organisms functional
- ✅ **Sections**: All 16 section types render correctly
- ✅ **Responsive**: Works on mobile/tablet/desktop
- ✅ **Accessible**: Keyboard navigable, semantic HTML
- ✅ **Multilingual**: RO/EN switching works (if enabled)
- ✅ **Forms**: Validation and submission work
- ✅ **Animations**: AOS scroll reveals + CSS micro-interactions

---

## Next Steps

After testing passes:

1. **Deploy to staging**
2. **QA testing by team**
3. **Fix any issues found**
4. **Deploy to production**
5. **Monitor performance**
6. **Create new pages using system**

---

## Support

- **Documentation**: `/themes/andromeda-hugo/docs/`
- **Refactor Plan**: `themes/andromeda-hugo/REFACTOR-PLAN-v2.md`
- **Component Docs**: `themes/andromeda-hugo/docs/components/`
- **Progress**: `dev/active/refactor-atomic-design/PROGRESS.md`
