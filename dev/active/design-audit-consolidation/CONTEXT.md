# Design Audit Context & Reference

**Project**: Component Consolidation & Design System Unification
**Status**: ✅ COMPLETE - Phase 2 Finished
**Last Updated**: 2025-11-18 Session 3
**Context File**: Technical details, file locations, commands

---

## Project Structure

### Key Directories

```
/home/cere/Work/alex/alexandrabarbu.ro/
├── themes/andromeda-hugo/
│   ├── layouts/partials/sections/          # Section components (28 active)
│   │   └── _deprecated/                     # Deprecated sections (6 files)
│   ├── assets/scss/
│   │   ├── _design-system.scss              # Standard v2.0 system
│   │   ├── _design-tokens.scss              # Design tokens (NEEDS UPDATE)
│   │   ├── _design-enhancements.scss        # v4.0 enhancements
│   │   ├── custom.scss                      # Main SCSS (imports commented)
│   │   └── components/
│   │       └── _deprecated/                 # Deprecated SCSS (3 files)
│   ├── content/
│   │   ├── english/
│   │   │   ├── components-showcase.md       # Part 1 showcase
│   │   │   └── components-showcase-part2.md # Part 2 showcase
│   │   └── romanian/
│   │       ├── componente-showcase.md       # Part 1 showcase (RO)
│   │       └── componente-showcase-part2.md # Part 2 showcase (RO)
│   └── CLAUDE.md                            # Theme docs (NEEDS UPDATE)
└── dev/active/design-audit-consolidation/   # This documentation
    ├── OVERVIEW.md                          # Project summary
    ├── PROGRESS.md                          # Progress tracking
    ├── DECISIONS.md                         # Decision log
    └── CONTEXT.md                           # This file
```

---

## Component Inventory

### Active Sections (21 - Final Count)

**Showcased in Part 1 (12)**:
```
layouts/partials/sections/
├── hero-breadcrumb.html          ✅ 20+ pages
├── credentials-showcase.html     ✅ 2 pages, v4.0
├── problem-empathy.html          ✅ 14+ pages, v4.0
├── stats-numbers.html            ✅ 18+ pages, v4.0
├── values-compass.html           ✅ 2 pages, NEW v4.0
├── feature-blocks.html           ✅ 6 pages, v4.0
├── faq-mini.html                 ✅ 8 pages, v4.0
├── video-popup.html              ✅ 2 pages
├── values-intro.html             ✅ 11 pages
├── pricing-tables.html           ✅ 4 pages, v4.0
├── newsletter-signup.html        ✅ 3 pages
└── contact-form-enhanced.html    ✅ 18+ pages
```

**Showcased in Part 2 (6)**:
```
layouts/partials/sections/
├── blog-grid.html                ✅ 2 pages
├── signup-form-enhanced.html     ✅ 1 page
├── privacy-guarantee.html        ✅ 1 page
├── testimonials-enhanced.html    ⚠️ UNUSED, v4.0 (decision pending)
└── feature-details.html          ❌ UNUSED, old version (recommend delete)
```

**Not Showcased (10)**:
```
layouts/partials/sections/
├── confidentiality-notice.html   ❌ UNUSED (recommend delete)
├── contact-info-cards.html       ❌ UNUSED (recommend delete)
├── contact-options.html          ❌ UNUSED (recommend delete)
├── professional-affiliations.html ❌ UNUSED (recommend delete)
├── faq-content.html              ❌ UNUSED (recommend delete)
├── service-faq-inline.html       ❌ UNUSED (recommend delete)
├── first-session-timeline.html   ❌ UNUSED (recommend delete)
├── therapist-match.html          ❌ UNUSED (recommend delete)
├── office-gallery.html           ❌ UNUSED (recommend delete)
└── job-listings.html             ✅ 4 pages (keep, niche use)
```

### Deprecated Sections (13 - Final Count)

**Phase 1 (6 sections):**
```
layouts/partials/sections/_deprecated/
├── benefits-grid.html            # Was 12 pages → use values-compass
├── service-highlights.html       # Was 6 pages → redundant
├── timeline-process.html         # Was 7 pages → redundant
├── onboarding-steps.html         # Was 2 pages → redundant
├── method-tabs.html              # Was 6 pages → not widely used
└── related-services.html         # Was 6 pages → redundant
```

**Phase 2 (7 sections):**
```
layouts/partials/sections/_deprecated/
├── feature-details.html          # Old version
├── confidentiality-notice.html   # Simple, redundant
├── professional-affiliations.html # Needs logos
├── therapist-match.html          # Therapy-specific
├── office-gallery.html           # Needs photos
├── job-listings.html             # Specialized
└── related-content.html          # New, unused
```

**SCSS Files:**
```
assets/scss/components/_deprecated/
├── _benefits-grid.scss
├── _timeline-process.scss
└── _method-tabs.scss
```

---

## Hugo Build Commands

### Development
```bash
# From theme directory (MUST run from here)
cd /home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo

# Development server
hugo server --buildDrafts

# Development server (specific port)
hugo server --bind 127.0.0.1 --port 1313 --buildDrafts

# Production build
hugo --gc --minify

# Build with verbose output
hugo --verbose --debug

# Template performance metrics
hugo --templateMetrics
```

### Build Verification
```bash
# Check build time
hugo --gc 2>&1 | grep "Total in"

# Check for errors
hugo 2>&1 | grep "ERROR"

# Check for warnings
hugo 2>&1 | grep "WARN"

# Count pages built
hugo --gc 2>&1 | grep "Pages"
```

---

## Showcase URLs

### Local Development
**Ensure Hugo server is running on port 1313**

**Part 1 - Main Sections**:
- Romanian (default): http://localhost:1313/componente-showcase/
- English: http://localhost:1313/en/components-showcase/

**Part 2 - Remaining Sections**:
- Romanian (default): http://localhost:1313/componente-showcase-part2/
- English: http://localhost:1313/en/components-showcase-part2/

### File Locations
```bash
# Built HTML files
public/componente-showcase/index.html              # RO Part 1
public/en/components-showcase/index.html           # EN Part 1
public/componente-showcase-part2/index.html        # RO Part 2
public/en/components-showcase-part2/index.html     # EN Part 2
```

---

## Design System Files

### Typography Configuration

**Current State** (INCONSISTENT):
```scss
// _design-system.scss (ACTIVE - User's choice)
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Source+Sans+3:wght@300;400;600;700&display=swap');
$font-primary: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
$font-secondary: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;

// _design-tokens.scss (NEEDS UPDATE)
$font-heading: 'Poppins', sans-serif;  // ❌ Wrong
$font-body: 'Open Sans', sans-serif;   // ❌ Wrong

// CLAUDE.md (NEEDS UPDATE)
Typography:
- Headings: Poppins (300-700)          // ❌ Wrong
- Body: Open Sans (300-700)            // ❌ Wrong
```

**Required Changes**:
```scss
// Update _design-tokens.scss to:
$font-heading: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
$font-body: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;

// Update CLAUDE.md to:
Typography:
- Headings: Cormorant Garamond (300-700)
- Body: Source Sans 3 (300-700)
```

### Color System

**Primary Colors**:
```scss
$emerald-500: #4DB380;    // Primary (growth, trust)
$terracotta-500: #CC6B49; // Secondary (warmth, balance)
```

**9-Step Color Scales**:
- Emerald: 50, 100, 200, 300, 400, 500, 600, 700, 800
- Terracotta: 50, 100, 200, 300, 400, 500, 600, 700, 800

**Supporting Palettes** (8):
- Teal, Amber, Sage, Plum, Coral, Navy, Red, Gray

### v4.0 Enhancements

**Location**: `assets/scss/_design-enhancements.scss`

**Features**:
- 8 gradient variants (warm, radial, icon, glass)
- 4 organic blob shapes
- 10 animation keyframes
- Enhanced shadows (warm, featured, glass)
- Utility mixins (glassmorphism, organic-blob, icon-circle, etc.)

**Size Impact**: +18KB gzipped (+15KB CSS + ~3KB JS)

---

## Content Pages Using Deprecated Sections

**Affected Pages** (need updates):
```
content/english/services.md               # Uses: method-tabs, timeline-process, related-services
content/english/services/individual-therapy.md  # Uses: method-tabs, benefits-grid, related-services
content/english/services/organizational-psychology.md  # Uses: service-highlights
content/english/signup.md                 # Uses: benefits-grid
content/english/approach.md               # Uses: method-tabs
content/romanian/[same pages]             # Same issues in Romanian
```

**Fix Strategy**:
1. Replace benefits-grid → values-compass or feature-blocks
2. Replace timeline-process → Create custom timeline if needed
3. Replace method-tabs → Use different layout or faq-mini
4. Replace service-highlights → feature-blocks
5. Replace related-services → Manual links or different approach

---

## Testing Commands

### Visual Regression
```bash
# Build production
hugo --gc --minify

# Check file sizes
du -sh public/
ls -lh public/*/index.html | head -20

# Check for broken links (if tool installed)
# [Add link checker command if available]
```

### Accessibility
```bash
# Run axe-core or similar (if installed)
# [Add accessibility testing commands]
```

### Performance
```bash
# Template metrics
hugo --templateMetrics | head -30

# Build time
time hugo --gc --minify
```

---

## Git Commands

### Current Status
```bash
git status
git diff
```

### Create Checkpoint
```bash
# After Phase completion
git add -A
git commit -m "feat: Phase 1 complete - Eliminate 6 redundant sections

- Moved 6 sections to _deprecated/
- Updated SCSS imports
- Created showcases for visual review
- 34 → 28 sections (18% reduction)

Eliminated: benefits-grid, service-highlights, timeline-process,
onboarding-steps, method-tabs, related-services"
```

### Restore from Backup
```bash
# If issues arise
git log --oneline -10
git checkout <commit-hash> -- <file-path>

# Or reset completely
git reset --hard <commit-hash>
```

---

## Environment Details

**Hugo Version**: v0.152.2 extended
**Working Directory**: `/home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo`
**Platform**: Linux 6.15.4-100.fc41.x86_64
**Date**: 2025-11-18

---

## Quick Reference

### Most Used Commands
```bash
# Navigate to theme
cd /home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo

# Build and check
hugo --gc --minify 2>&1 | tail -20

# Start server
hugo server --bind 127.0.0.1 --port 1313

# Count remaining sections
ls layouts/partials/sections/*.html | wc -l

# View warnings
hugo 2>&1 | grep "WARN"
```

### File Locations Quick Access
```bash
# Main SCSS file
vim assets/scss/custom.scss

# Design tokens
vim assets/scss/_design-tokens.scss

# Theme docs
vim CLAUDE.md

# Deprecated sections
ls -la layouts/partials/sections/_deprecated/

# Showcase pages
ls -la content/english/components-showcase*.md
```

---

## Troubleshooting

### Build Fails
```bash
# Check for syntax errors
hugo --verbose 2>&1 | grep -A5 "ERROR"

# Check SCSS imports
grep "@import" assets/scss/custom.scss

# Verify deprecated files moved
ls layouts/partials/sections/_deprecated/
```

### Sections Not Rendering
```bash
# Check flexible.html template
vim layouts/_default/flexible.html

# Check if section registered (lines 22-82)
grep "section-name" layouts/_default/flexible.html
```

### Font Not Loading
```bash
# Check browser Network tab
# Verify font URLs in _design-system.scss
# Check for CORS issues
```

---

**Last Updated**: 2025-11-18 18:50
**Next Update**: As needed for Phase 2
