# Theme Redesign 2025 - Implementation Plan

**Created:** 2025-11-23 14:25
**Status:** Active - Ready to implement
**Estimated time:** 40-50 hours (5-6 weeks part-time)
**Source:** eval1.md (comprehensive design evaluation framework)

## Overview

Complete redesign of the Andromeda Hugo theme based on design-system.md specifications and 10 reference screenshots. This is a high-fidelity implementation that transforms the current emerald/terracotta color scheme to a forest green/sage/gold palette with Playfair Display serif + DM Sans typography, heavy card rounding (2rem-3rem), pill-shaped buttons, and glassmorphism effects.

**Key Changes:**
- Color palette: Forest green (#234E3E) + Sage (#6B9080) + Gold (#C5A880) + Cream backgrounds (#F4F7F5)
- Typography: Playfair Display (headings) + DM Sans (body) replacing Crimson Pro + Work Sans
- Button shape: Pill (rounded-full, 9999px) replacing moderate rounding
- Card radius: Heavy (2rem-3rem) replacing standard rounding
- Navigation: Transparent → glassmorphism scroll state
- 10 sections redesigned with extracted specifications from screenshots

## Goals

1. **High-fidelity visual match** - 90%+ adherence to screenshot designs
2. **Design token compliance** - 100% use of SCSS variables, zero hardcoded values
3. **Performance maintained** - Build time <3s, CSS bundle <50KB gzipped
4. **Accessibility preserved** - WCAG AA compliance maintained
5. **Architecture preserved** - Hugo flexible layout, ITCSS + BEM, 71-component system intact

## Approach

### Phase 1: Foundation (Week 1) - Token Migration
**Goal:** Update all design tokens without breaking existing components

1. **Color System**
   - Add new color scales to `01-settings/_tokens-colors.scss`:
     - `$forest-*` (50-900 scale, primary brand)
     - `$sage-*` (50-900 scale, secondary)
     - `$gold-*` (50-900 scale, accent)
     - `$cream-*` (50-500 scale, backgrounds/neutrals)
   - Add semantic color mappings:
     - `$color-brand-primary: $forest-500`
     - `$color-bg-primary: $cream-100`
     - `$text-primary-green: #1A332A`
   - Keep existing emerald/terracotta scales (parallel migration strategy)

2. **Typography**
   - Update Google Fonts import: Playfair Display (400,500,600,700 + italics) + DM Sans (300,400,500,700)
   - Update `$font-heading` to 'Playfair Display'
   - Update `$font-body` to 'DM Sans'
   - Add `$leading-display: 1.1` for hero text

3. **Spacing**
   - Add `$space-32: 8rem` (128px for py-32 equivalent)
   - Update `$container-max-width: 1280px` (was 1200px)
   - Verify 4px grid compliance

4. **Border Radius**
   - Add `$radius-3xl: 3rem` (48px for image/special cards)
   - Keep `$radius-full: 9999px` for pill buttons

5. **Shadows**
   - Update `$shadow-primary` to use `$forest-500` tint (was `$emerald-400`)
   - Add `$shadow-2xl` for card hover states

**Deliverables:**
- All token files updated in `themes/andromeda-hugo/assets/scss/01-settings/`
- Hugo build succeeds with new tokens
- No visual changes yet (tokens defined but not used)

### Phase 2: Core Components (Week 2) - Atoms & Molecules
**Goal:** Update foundational components to use new design system

1. **Atoms**
   - `atoms/button.html` + `_button.scss`:
     - Update to pill shape (`$radius-button: $radius-full`)
     - Update variants to use forest/sage/gold colors
     - Update hover: `translateY(-1px)` (was -4px)
   - `atoms/heading.html` + `_heading.scss`:
     - Update font-family to Playfair Display
     - Add italic accent support (`.c-heading__accent`)
   - `atoms/icon-blob.html` + `_icon-blob.scss` (NEW):
     - Create icon with organic blob background
     - Support color variants (blue, sage, gold, coral, purple)
     - Sizes: sm (48px), md (64px), lg (80px)

2. **Molecules**
   - `molecules/card.html` + `_card.scss`:
     - Update radius to `$radius-card: $radius-2xl` (32px)
     - Update borders to `$cream-200`
     - Update hover: `border-color: rgba($gold-500, 0.3)`, `$shadow-card-hover`
   - `molecules/accordion-item.html` + `_accordion.scss`:
     - Update colors to forest green
     - Update border radius to `$radius-lg`
   - `molecules/navigation.html` + `_navigation.scss`:
     - Add scroll state: transparent → glassmorphism
     - JavaScript: `navigation-scroll.js` (detect scroll, add `.is-scrolled` class)

**Deliverables:**
- All atom/molecule components updated
- Component isolation testing (verify in storybook or test page)
- No section integration yet

### Phase 3: Section Implementation (Weeks 3-4) - 10 Sections
**Goal:** Implement all 10 sections per eval1.md specifications

**Section 1: Hero + Navigation**
- File: `sections/hero-breadcrumb.html` + `_hero-breadcrumb.scss`
- Layout: Two-column (text left 50%, compass right 50%)
- Components: Heading with italic accent, pill buttons, compass animation
- Data schema: `hero_breadcrumb` with title/title_accent/subtitle/cta_primary/cta_secondary

**Section 2: Services Grid**
- File: `sections/services-grid.html` + `_services-grid.scss` (NEW or modify existing)
- Layout: 3-column grid (desktop), 2-col (tablet), 1-col (mobile)
- Components: Icon blob, heavy rounded cards (2rem)
- Data schema: `services_section` with badge/title/intro/services array

**Section 3: Methodology (Zigzag)**
- File: `sections/methodology-zigzag.html` + `_methodology-zigzag.scss` (NEW)
- Layout: Two-column (text 45%, image+cards 50%)
- Components: Image (3rem radius), 2×2 method cards (horizontal layout)
- Data schema: `methodology_section` with methods array

**Section 4: CTA Evaluation (Split Panel)**
- File: `sections/cta-split.html` + `_cta-split.scss` (NEW)
- Layout: Split 60/40 (white left, sage green right with glassmorphism)
- Components: Checklist items, quote box, glassmorphism icon circle
- Data schema: `cta_evaluation` with checklist/quote/cta fields

**Section 5: Testimonials (Dark Background)**
- File: `testimonials-enhanced.html` + `_testimonials-dark.scss` (MODIFY existing)
- Layout: Dark forest green background, 3-column quotes
- Components: Quote cards, avatar circles
- Data schema: `testimonials_section` with testimonials array

**Section 6: FAQ Accordion**
- File: `faq-content.html` + `_faq-accordion.scss` (MODIFY existing)
- Layout: Centered, max-width 900px, accordion items
- Components: Accordion items with expand/collapse
- Data schema: `faq_section` with questions array

**Section 7: Contact Form (Split)**
- File: `contact-form-enhanced.html` + `_contact-split.scss` (MODIFY existing)
- Layout: Split 40/60 (dark panel left, form right)
- Components: Contact info cards, form inputs with light backgrounds
- Data schema: `contact_section` with contact methods + form fields

**Section 8: Footer**
- File: `organisms/footer.html` + `_footer.scss` (MODIFY existing)
- Layout: Dark forest green, 4-column grid
- Components: Logo, link lists, social icons (outline style)
- Data schema: Site-level footer config

**Section 9: Blog Grid**
- File: `blog-grid.html` + `_blog-grid.scss` (MODIFY existing)
- Layout: 3-column card grid
- Components: Blog cards with images (24-32px radius)
- Data schema: Hugo content query for blog posts

**Section 10: Self-Assessment Tests**
- File: `test-grid.html` + `_test-grid.scss` (NEW)
- Layout: 2-column card grid, info box above
- Components: Test cards with icon blobs, badge pills, CTA buttons
- Data schema: `tests_section` with tests array

**Deliverables:**
- All 10 sections implemented
- Per-section visual comparison to screenshots
- Responsive testing (375px, 768px, 1200px)

### Phase 4: Refinement & Testing (Week 5)
**Goal:** Polish, test, and validate against eval1.md criteria

1. **Visual Refinement**
   - Screenshot comparison for each section
   - Fine-tune spacing/colors if needed
   - Verify typography rendering across browsers

2. **Responsive Testing**
   - Test all sections at 375px, 768px, 1200px, 1920px
   - Verify touch targets ≥44px on mobile
   - Test navigation collapse/expand

3. **Accessibility Audit**
   - Color contrast check (WCAG AA: 4.5:1 text, 3:1 UI)
   - Keyboard navigation test
   - Screen reader test (NVDA/VoiceOver sample)
   - Semantic HTML verification

4. **Performance Validation**
   - Build time: Target <2.5s (current 1.5s baseline)
   - CSS bundle size: Target <50KB gzipped
   - Image optimization: WebP + lazy loading
   - Lighthouse audit: Performance ≥85, Accessibility ≥90

5. **Cross-Browser Testing**
   - Chrome/Edge (latest)
   - Firefox (latest)
   - Safari (macOS + iOS)
   - Font rendering consistency

**Deliverables:**
- Visual fidelity report (90%+ target)
- Accessibility compliance report (WCAG AA)
- Performance metrics (build time, bundle size)
- Cross-browser compatibility matrix

### Phase 5: Documentation & Handoff (Week 6)
**Goal:** Document changes, create migration guide, finalize

1. **Update Documentation**
   - Update CLAUDE.md with new color palette
   - Update design-system.md to reflect implementation
   - Document any deviations from eval1.md

2. **Create Migration Guide**
   - Document breaking changes (if any)
   - Provide before/after examples
   - Update component usage examples

3. **Final Review**
   - Full site walkthrough (RO + EN)
   - Multilingual parity check
   - Final visual comparison to screenshots

4. **Merge to Main**
   - Create PR from `redesign-2025` branch
   - Request review
   - Merge after approval

**Deliverables:**
- Updated documentation
- Migration guide
- Approved PR merged to main

## Success Criteria

**Visual Fidelity:**
- [ ] 90%+ match to reference screenshots (subjective but measurable via comparison)
- [ ] All 10 sections implemented per specifications
- [ ] Typography matches design (Playfair Display + DM Sans)
- [ ] Color palette accurately translated from design-system.md

**Technical Quality:**
- [ ] 100% design token compliance (zero hardcoded colors/spacing/shadows)
- [ ] Build time <3s (target: maintain 1.5s baseline)
- [ ] CSS bundle <50KB gzipped (target: ~45KB)
- [ ] WCAG AA compliant (zero violations)
- [ ] Responsive 375px-1920px (no horizontal scroll, readable text)

**Architecture Preservation:**
- [ ] Hugo flexible layout pattern intact
- [ ] ITCSS + BEM architecture maintained
- [ ] 71-component system preserved (may add 5-10 new components)
- [ ] Multilingual support (RO/EN) functional
- [ ] No regression in existing features

**Performance:**
- [ ] Lighthouse Performance ≥85
- [ ] Lighthouse Accessibility ≥90
- [ ] No layout shift (CLS <0.1)
- [ ] Images optimized (WebP, lazy loading)

## Risks & Mitigation

**Risk 1: Color System Conflict**
- **Issue:** Parallel color scales (forest/emerald) may cause confusion
- **Mitigation:**
  - Use semantic variables in new code (`$color-brand-primary` not `$forest-500`)
  - Phase out old scales in Phase 4
  - Document which scale to use in component comments

**Risk 2: Typography Rendering Differences**
- **Issue:** Playfair Display may render differently than Crimson Pro (line heights, widths)
- **Mitigation:**
  - Test across OS/browsers early (Phase 2)
  - Adjust line heights per font if needed
  - Use font-display: swap for loading

**Risk 3: Pill Button Accessibility**
- **Issue:** Rounded-full buttons may have insufficient target size
- **Mitigation:**
  - Ensure minimum 44×44px touch targets
  - Add sufficient padding to pill buttons
  - Test with touch devices

**Risk 4: Scope Creep**
- **Issue:** Temptation to add features beyond design specifications
- **Mitigation:**
  - Strict adherence to eval1.md specifications
  - No new features unless approved
  - Focus on fidelity, not enhancement

**Risk 5: Build Time Increase**
- **Issue:** Additional SCSS files may slow builds
- **Mitigation:**
  - Monitor build time per phase
  - Use SCSS partials efficiently
  - Leverage Hugo partial caching

## Notes

**Reference Documents:**
- `eval1.md` - Primary source of truth for all design specifications
- `design-system.md` - Conceptual design system (React/Tailwind reference)
- `ARCHITECTURE.md` - Hugo architecture, component system
- `CLAUDE.md` - Theme development guidelines

**Branch Strategy:**
- Work branch: `redesign-2025`
- Base branch: `main`
- Merge strategy: PR with full review after Phase 5

**Testing Approach:**
- Per-phase validation (no merge until phase complete)
- Visual comparison to screenshots (manual, side-by-side)
- Automated: Hugo build succeeds, no console errors
- Manual: Responsive, accessibility, cross-browser

**Communication:**
- Weekly status updates
- Visual progress screenshots
- Blocker escalation as needed

**Tools:**
- Hugo v0.152.2 extended
- Node.js (for SCSS compilation)
- Browser DevTools (responsive testing, accessibility audit)
- Lighthouse (performance/accessibility metrics)

**Success Metrics:**
- Visual fidelity: 90%+ (primary goal)
- Token compliance: 100% (mandatory)
- Performance: <3s build, <50KB CSS (maintain baseline)
- Accessibility: WCAG AA (zero violations)
