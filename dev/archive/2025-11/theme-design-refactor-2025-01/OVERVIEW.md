# Theme Design System Complete Refactor - Project Overview

**Project ID**: theme-design-refactor-2025-01
**Started**: 2025-01-19
**Completed**: 2025-11-20
**Status**: ✅ COMPLETE - Production Ready
**Actual Duration**: ~10 hours across multiple sessions

---

## Executive Summary

Complete redesign of the Andromeda Hugo Theme for a psychology practice website (alexandrabarbu.ro). This project involves creating a new design language from scratch, rebuilding all components (atoms, molecules, organisms, sections), and implementing a complete site structure with 34 sections across 6 main page types.

---

## Project Goals

### Primary Objectives
1. **Create new design language from scratch** using design excellence principles
2. **Rebuild all components** with consistent design system (50+ components)
3. **Implement complete site structure** (Homepage, About, Services, Approach, Resources, Contact)
4. **Ensure consistency** across typography, colors, spacing, animations, icons
5. **Maintain performance** (build <3s, WCAG AA accessibility)
6. **Support multilingual** (Romanian primary, English secondary)

### Key Requirements
- New design language (not incremental improvement)
- New typography system (new serif + sans pairing)
- Refined color palette (keep emerald + terracotta foundation, add supporting colors)
- Unified spacing system (8pt or 4pt grid)
- Consistent animation language
- Microinteractions throughout
- Consistent icon usage
- Full responsive behavior
- WCAG AA compliance

---

## Design Decisions (From User Input)

### 1. Design Style
**Selected**: Create new design language from scratch using design skill
**Approach**: Not keeping current v4.0 style, building entirely new system

### 2. Color Palette
**Selected**: Refine current palette + introduce more assorted colors
**Foundation**: Keep emerald (#4DB380) + terracotta (#CC6B49) as base
**Expansion**: Add 4-6 supporting colors for better variety and hierarchy
**Requirements**:
- WCAG AA contrast (4.5:1 minimum)
- 9-step scales for each color (50-900)
- Semantic color mappings

### 3. Typography
**Selected**: New serif + sans combination
**Current**: Cormorant Garamond (serif) + Source Sans 3 (sans) - TO BE REPLACED
**Requirements**:
- Choose fonts that represent psychology practice brand
- Professional, warm, trustworthy
- Excellent readability
- Variable font support preferred
- Restricted weight usage (3-4 weights maximum for consistency)

### 4. Priority Enhancements
**All selected** (user chose all options):
1. ✅ **Consistent spacing system** - 8pt or 4pt grid throughout
2. ✅ **Unified component variants** - Standardize all color variants across components
3. ✅ **Consistent animation language** - Unified timing, easing, patterns
4. ✅ **Responsive behavior** - Consistent breakpoints and layouts
5. ✅ **Relevant microinteractions** - Button hovers, card interactions, form feedback
6. ✅ **Consistent icon usage** - Icon library, sizing, positioning standards

---

## Current State Analysis

### Existing Architecture (v5.0.1)
**Component Count**: 50 active components
- **5 Atoms**: button, heading, icon, image, input
- **21 Molecules**: card, accordion, navigation, breadcrumb, form-field, etc.
- **2 Organisms**: header, footer
- **22 Active Sections**: hero-breadcrumb, values-compass, feature-blocks, pricing-tables, etc.
- **13 Deprecated Sections**: In `_deprecated/` directory

**SCSS Architecture**: ITCSS + BEM
- **01-settings/**: Design tokens (colors, typography, spacing, shadows, motion, gradients, components)
- **02-tools/**: Mixins + functions (glassmorphism, card, icon, colors)
- **03-generic/**: CSS resets, normalize
- **05-objects/**: Layout primitives (.o-container, .o-grid)
- **06-components/**: BEM components (.c-button, .c-card, .c-values-compass, etc.)

**JavaScript**: Vanilla JS (no jQuery)
- values-compass-interactions.js
- stats-counter.js
- scroll-animations.js
- vanilla-collapse.js
- vanilla-dropdown.js
- gsap-enhancements.js

**Current Design System (v4.0)**:
- **Colors**: Emerald (#4DB380) primary, Terracotta (#CC6B49) secondary, 6 supporting colors
- **Typography**: Cormorant Garamond (300-700) headings, Source Sans 3 (300-700) body
- **Font Weights**: Restricted to 500/600 headings, 400 body (300/700/800 forbidden)
- **Design Features**: Glassmorphism, gradients, organic shapes, progressive disclosure
- **Animations**: 10 types (fade-in directions, pulse, float, gradient-shift, blob-morph, staggered)

### Strengths to Preserve
1. ✅ Atomic Design + ITCSS + BEM architecture (well-organized, scalable)
2. ✅ Design token system (single source of truth)
3. ✅ Progressive enhancement (works without JS, enhanced with JS)
4. ✅ Accessibility-first (WCAG AA, reduced motion, keyboard nav, ARIA)
5. ✅ Performance-optimized (modern image formats, lazy loading, efficient animations)
6. ✅ Multilingual support (RO + EN with i18n)
7. ✅ Composability (atoms → molecules → organisms → sections)
8. ✅ Data-driven (front matter controls content, templates handle presentation)
9. ✅ Vanilla JS (no jQuery dependency)

### Issues to Address
1. ❌ Inconsistent spacing (no unified grid system)
2. ❌ Inconsistent component variants (color variants vary by component type)
3. ❌ Typography weight restrictions too limiting (only 400/500/600 allowed)
4. ❌ Animation timing varies across components
5. ❌ Icon sizing inconsistent
6. ❌ Some legacy compatibility classes creating bloat
7. ❌ Missing microinteractions in many components
8. ❌ Responsive breakpoints not consistently applied

---

## Scope Overview

### Phase Breakdown (10 Phases)

**PHASE 1**: Design System Foundation (Design Tokens)
- Typography system (new font pairing, scales, weights, line heights)
- Expanded color palette (9-step scales, semantic mappings)
- Spacing system (8pt/4pt grid, component spacing)
- Animation language (timing, easing, microinteractions)
- Icon system (library, sizes, usage patterns)
- Additional tokens (shadows, border-radius, gradients, glassmorphism, z-index)

**PHASE 2**: Atom Refactor (5 Core + New Atoms)
- Refactor: button, heading, icon, image, input
- Create new: badge, divider, link, spinner, avatar
- Total: ~10 atoms

**PHASE 3**: Molecule Refactor (21 Existing + New Molecules)
- Refactor: All 21 existing molecules
- Create new: 8 new molecules (service-preview-card, value-card, process-step, etc.)
- Total: ~29 molecules

**PHASE 4**: Organism Refactor
- Refactor: header, footer
- Create new: hero-section, cta-section (if needed)
- Total: ~4 organisms

**PHASE 5**: Section Creation (34 Sections for Site Structure)
- Homepage: 10 sections
- About: 8 sections
- Services main: 6 sections
- Individual service pages: 12 sections each
- Approach: 9 sections
- Resources: 10 sections
- Contact: 9 sections
- Legal: 2 sections
- Total: ~34 unique sections

**PHASE 6**: Content Structure & Multilingual Setup
- Romanian content (root path): ~12 pages
- English content (/en/ path): ~12 pages (mirrored)
- Archetypes: 8 page templates
- Navigation menus: 2 files (RO + EN)
- Total: ~34 content/config files

**PHASE 7**: JavaScript Microinteractions
- New/updated: 10 JS files
- Remove Bootstrap JS dependencies
- Total: ~10 interaction files

**PHASE 8**: SCSS Architecture Refinement
- ITCSS layers: 7 layers
- BEM components: ~50 component files
- Entry point: main.scss consolidation

**PHASE 9**: Testing & Quality Assurance
- Functionality, accessibility, performance, multilingual, browser testing

**PHASE 10**: Documentation Updates
- Update: ARCHITECTURE.md, CLAUDE.md, README.md
- Create: DESIGN-SYSTEM.md
- Document: All components in docs/components/

---

## Estimated Scope

### File Modifications
- **Design Tokens**: ~8 SCSS files (complete rewrite)
- **Atoms**: 5 refactored + 5 new = 10 total (~10 HTML + ~10 SCSS files)
- **Molecules**: 21 refactored + 8 new = 29 total (~29 HTML + ~29 SCSS files)
- **Organisms**: 2 refactored + 2 new = 4 total (~4 HTML + ~4 SCSS files)
- **Sections**: 34 new sections (~34 HTML + ~34 SCSS files)
- **Content Files**: ~20 pages (RO + EN) + ~8 archetypes + ~2 menus = ~30 files
- **JavaScript**: ~10 interaction files
- **Documentation**: ~5 major docs + component docs
- **TOTAL ESTIMATED**: ~150-200 files modified/created

### Time Estimate
- **Multi-session project**: 6-10 hours of focused work across multiple sessions
- **Breakdown**:
  - Design system foundation: 1-2 hours
  - Component refactoring: 3-4 hours
  - Content creation: 1-2 hours
  - Testing & QA: 1-2 hours
  - Documentation: 0.5-1 hour

---

## Success Metrics

### Quality Gates
- ✅ 100% design token usage (no magic numbers in components)
- ✅ Unified variant system across all components
- ✅ Consistent spacing throughout (8pt/4pt grid adherence)
- ✅ Consistent animation timing and easing
- ✅ All 34 sections created for complete site structure
- ✅ Both RO + EN content complete with parity
- ✅ Build time <3s (Hugo performance)
- ✅ WCAG AA accessibility compliance
- ✅ Lighthouse score ≥90 (performance, accessibility, best practices, SEO)
- ✅ No console errors or warnings
- ✅ All browsers tested (Chrome, Firefox, Safari, Edge, Mobile)

### Performance Targets
- **Hugo Build**: <3 seconds
- **Page Size**: <600KB (down from current <520KB acceptable)
- **CSS Size**: <60KB gzipped
- **JS Size**: <30KB gzipped
- **Images**: WebP + AVIF + lazy loading
- **Lighthouse Score**: ≥90 across all metrics

---

## Key Constraints

### Must Preserve
1. **Hugo architecture**: Flexible layout system (layouts/_default/flexible.html)
2. **Atomic Design pattern**: Atoms → Molecules → Organisms → Sections
3. **ITCSS + BEM**: SCSS architecture and naming conventions
4. **Multilingual**: RO (root) + EN (/en/) support
5. **Accessibility**: WCAG AA compliance minimum
6. **Performance**: <3s builds, modern image formats
7. **No dependencies**: Vanilla JS only (no jQuery, minimal external libraries)

### Can Change
1. ✅ Typography (new serif + sans pairing)
2. ✅ Color palette (refined + expanded)
3. ✅ Spacing system (introduce grid)
4. ✅ Animation language (new timing/easing)
5. ✅ Icon library (if better option exists)
6. ✅ Component implementations (complete rebuilds)
7. ✅ Design patterns (glassmorphism, gradients, etc.)

---

## Next Steps

### Immediate Actions (Next Session)
1. **Review dev docs** to refresh context
2. **Start Phase 1**: Design system foundation
   - Research and select new typography (serif + sans pairing)
   - Define expanded color palette (emerald + terracotta + 4-6 new colors)
   - Create 8pt/4pt grid spacing system
   - Define animation timing/easing values
   - Select icon library and define sizing system
3. **Create design token files** in `assets/scss/01-settings/`

### Session-by-Session Approach
- **Session 1-2**: Phase 1 (Design tokens) + Phase 2 (Atoms)
- **Session 3-4**: Phase 3 (Molecules) + Phase 4 (Organisms)
- **Session 5-6**: Phase 5 (Sections) - Part 1
- **Session 7**: Phase 5 (Sections) - Part 2 + Phase 6 (Content)
- **Session 8**: Phase 7 (JavaScript) + Phase 8 (SCSS refinement)
- **Session 9**: Phase 9 (Testing & QA)
- **Session 10**: Phase 10 (Documentation) + Final review

---

## References

### Documentation
- **Architecture**: `/home/cere/Work/alex/alexandrabarbu.ro/ARCHITECTURE.md`
- **Claude Instructions**: `/home/cere/Work/alex/alexandrabarbu.ro/CLAUDE.md`
- **Current Theme**: `layouts/`, `assets/scss/`, `assets/js/`
- **Component Analysis**: See CONTEXT.md for detailed current state

### External Resources
- **Hugo Docs**: https://gohugo.io/documentation/
- **ITCSS**: https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/
- **BEM**: http://getbem.com/
- **WCAG AA**: https://www.w3.org/WAI/WCAG21/quickref/
- **Atomic Design**: https://bradfrost.com/blog/post/atomic-web-design/

---

## Risk Assessment

### High Risk Areas
1. **Typography selection**: Wrong fonts = brand mismatch, must choose carefully
2. **Color accessibility**: Must test all combinations for WCAG AA contrast
3. **Breaking changes**: Complete redesign may break existing content
4. **Performance regression**: More components = potential bloat if not careful
5. **Multilingual parity**: Must maintain exact feature parity between RO + EN

### Mitigation Strategies
1. **Typography**: Research psychology practice branding, test multiple pairings
2. **Color**: Use contrast checker tools, test with screen readers
3. **Breaking changes**: Create backup branch before starting, version control
4. **Performance**: Monitor build times, use Hugo's `--templateMetrics`, lazy load everything
5. **Multilingual**: Create RO + EN content simultaneously, checklist validation

---

## Project Status

**Current Phase**: Planning ✅
**Next Phase**: Design System Foundation (Phase 1)
**Blockers**: None
**Questions**: None (design decisions finalized)

---

*Last Updated: 2025-01-19*
