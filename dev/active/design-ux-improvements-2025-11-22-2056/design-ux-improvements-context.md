# Design & UX Improvements - Context

**Last Updated:** 2025-11-23 11:45 UTC

## Quick Reference

**Status:** 🎉 PHASE 6 IN PROGRESS! Animations + Audits Complete!
**Current Focus:** Phase 6.2-6.7 - Performance optimization, testing, quality gates
**Next Step:** Manual browser testing + performance profiling

## Key Files to Modify

### Design Tokens (Phase 1)
- `assets/scss/01-settings/_tokens-gradients.scss` - **CREATE NEW** - Centralized gradient definitions
- `assets/scss/01-settings/_tokens-motion.scss` - **CREATE NEW** - Duration and easing scales
- `assets/scss/01-settings/_tokens-colors.scss` - **MODIFY** - Add overlay values
- `assets/scss/01-settings/_tokens-spacing.scss` - **MODIFY** - Add $space-5: 20px

### Atoms (Phase 2)
- `layouts/partials/atoms/button.html` + `assets/scss/06-components/_button.scss` - Touch targets, loading states, animations
- `layouts/partials/atoms/icon.html` + `assets/scss/06-components/_icon.scss` - Standardize sizes (64px/84px), radial gradients
- `layouts/partials/atoms/heading.html` + `assets/scss/06-components/_heading.scss` - Display variant, gradient text, kerning
- `layouts/partials/atoms/image.html` - object-fit, aspect-ratio props, blur-up placeholder

### Molecules (Phase 3)
- `layouts/partials/molecules/service-preview-card.html` + `assets/scss/06-components/_services-preview.scss` - Visual differentiation, number badges
- `layouts/partials/molecules/card.html` + `assets/scss/06-components/_card.scss` - accent-top, number-badge, hover-intensity props
- `layouts/partials/molecules/form-field.html` + `assets/scss/06-components/_form-field.scss` - Floating labels, animations
- `layouts/partials/molecules/breadcrumb.html` - Reduce visual weight

### Sections (Phase 4)
- `layouts/partials/sections/hero-breadcrumb.html` + `assets/scss/06-components/_hero-breadcrumb.scss` - Grid ratio, blob shape, quote box
- `layouts/partials/sections/services-preview.html` + `assets/scss/06-components/_services-preview.scss` - Subtitle, background, card redesign
- `layouts/partials/sections/approach-preview.html` + `assets/scss/06-components/_approach-preview.scss` - Feature card, vertical flow
- `layouts/partials/sections/testimonials-enhanced.html` + `assets/scss/06-components/_testimonials-enhanced.scss` - Light background, avatars
- `layouts/partials/sections/contact-form-enhanced.html` + `assets/scss/06-components/_contact-form-enhanced.scss` - Split layout, gradients

### Organisms (Phase 5)
- `layouts/partials/organisms/header.html` - Shadow on scroll, active states
- `layouts/partials/organisms/footer.html` - Warmer background, gradient icons

### Utilities (Phase 6)
- `assets/scss/07-utilities/_animations.scss` - **CREATE NEW** - fadeInUp, shake, pulse-subtle, etc.

## Key Decisions Made

**2025-11-22 - Component Modification Only**
- **Context:** Need to improve design while maintaining architecture integrity
- **Decision:** Modify existing components only, no new components created
- **Rationale:** Existing architecture (71 components) is well-structured, additions would create maintenance burden
- **Alternatives Considered:** Creating new "enhanced" variants (rejected - would fragment component library)

**2025-11-22 - Icon Circle Size Standardization**
- **Context:** Current implementation uses 70px and 80px circles inconsistently
- **Decision:** Standardize to 64px (md) and 84px (lg) from design tokens
- **Rationale:** Matches existing token system, improves consistency, easier to maintain
- **Affected Components:** service-preview-card.html, approach-preview.html
- **Implementation:** Add `size` prop to icon.html atom

**2025-11-22 - Testimonials Background Change**
- **Context:** Current dark green background reduces readability (Screenshot #4 review)
- **Decision:** Change to light background ($green-50) with white cards
- **Rationale:** Better readability, matches site warmth, improves accessibility
- **Alternatives Considered:**
  - Keep dark bg with better contrast (rejected - still less readable)
  - Pure white bg (rejected - too stark, doesn't match warm aesthetic)

**2025-11-22 - Approach Section Image Replacement**
- **Context:** "PUNCH TODAY IN THE FACE" image doesn't match psychology brand (Screenshot #3 review)
- **Decision:** Replace with large feature card containing quote, icon, gradient background
- **Rationale:** Better brand alignment, more flexible (no stock photo needed), maintains visual interest
- **Alternative Considered:** Find better stock photo (rejected - hard to find appropriate image, costly)

**2025-11-22 - Design Token Extraction Strategy**
- **Context:** Gradients and motion values scattered across component files
- **Decision:** Extract to centralized token files (_tokens-gradients.scss, _tokens-motion.scss)
- **Rationale:** Single source of truth, easier to maintain, better consistency
- **Implementation Plan:** Incremental migration, maintain backwards compatibility during transition

**2025-11-22 - Service Card Differentiation Approach**
- **Context:** Service cards look identical, no visual hierarchy (Screenshot #2 review)
- **Decision:** Add 3px accent top borders, number badges (01-04), alternating icon gradients
- **Rationale:** Subtle differentiation without overwhelming, maintains glassmorphism aesthetic
- **Alternatives Considered:**
  - Different background colors (rejected - too bold, breaks consistency)
  - Different card heights (rejected - breaks grid alignment)
  - Icon size variation (rejected - inconsistent with design tokens)

## Open Questions

1. **Hero blob shape implementation** - Use CSS clip-path or SVG mask? Need to decide based on animation requirements
   - Lean toward: SVG mask with GSAP morph animation (more flexible)
   - Need to verify: Browser support for SVG masks with backdrop-filter

2. **Floating label animation complexity** - Implement pure CSS or add minimal JS?
   - Lean toward: Pure CSS (:focus-within, :placeholder-shown pseudoclasses)
   - Need to verify: IE11 requirement (probably not needed for psychology practice site)

3. **Form success state** - Toast notification or inline message?
   - Lean toward: Inline success state with fade-in animation (simpler, no modal management)
   - Alternative: Toast in top-right corner (more modern, doesn't disrupt layout)

4. **Icon gradient direction** - Use same gradients for all icons or rotate/vary?
   - Lean toward: Radial gradients for depth (center lighter, edges darker)
   - Need to test: Visual appeal with different icon shapes

## Blockers

_No current blockers - ready to begin implementation_

## Testing Notes

### Testing Strategy

**After each phase:**
1. Visual QA on localhost:1313 (both RO and EN pages)
2. Responsive testing (375px, 768px, 992px, 1200px)
3. Accessibility audit (WAVE + axe DevTools)
4. Performance check (Lighthouse, hugo build time)

**Testing Checklist Template:**
- [ ] Desktop Chrome (1920×1080)
- [ ] Tablet landscape (1024×768)
- [ ] Tablet portrait (768×1024)
- [ ] Mobile (375×667 iPhone SE)
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Color contrast passes WCAG AAA
- [ ] Animations respect prefers-reduced-motion
- [ ] Build time <3s
- [ ] Lighthouse score 95+

### What's been tested:
_Nothing tested yet - implementation not started_

### What still needs testing:
- All phases (1-6) pending implementation

## Component Architecture Reference

**Current Component Inventory:**
- 9 Atoms: button, heading, icon, image, tag, divider, link, spinner, avatar
- 24 Molecules: card, form-field, accordion, navigation, credential-badge, social-links, etc.
- 2 Organisms: header, footer
- 36 Sections: hero-breadcrumb, services-preview, approach-preview, testimonials-enhanced, contact-form-enhanced, etc.
- **Total: 71 components** (maintained, not increased)

**ITCSS Layers:**
1. Settings - Design tokens (colors, typography, spacing, shadows, gradients, motion)
2. Tools - Mixins and functions
3. Generic - CSS resets, normalize
4. Elements - Base HTML elements
5. Objects - Layout primitives (.o-container, .o-grid)
6. Components - UI components (.c-*)
7. Utilities - Helper classes

**BEM Naming:**
- Block: `.c-component-name`
- Element: `.c-component-name__element`
- Modifier: `.c-component-name--modifier`

## Design System Values Reference

**Colors:**
- Primary: #4DB380 (emerald)
- Secondary: #CC6B49 (terracotta)
- Supporting: teal, amber, sage, plum, coral, navy, red
- Text: $gray-700 (#374151)

**Typography:**
- Headings: Crimson Pro (serif) - 400, 500, 600
- Body: Work Sans (sans-serif) - 400, 500, 600
- Base size: 16px

**Spacing (8px grid):**
- Atoms: 12px vertical
- Molecules: 16px padding
- Organisms: 32px padding
- Sections: 64px mobile, 96px desktop

**Shadows (7 levels):**
- xs, sm, base, md, lg, xl, 2xl
- Brand shadows: primary (emerald tint), secondary (terracotta tint)

**Border Radius:**
- sm: 8px, md: 12px (most common), lg: 16px, xl: 24px, 2xl: 32px, full: 9999px

## Before Compaction Checklist

Before context gets compacted, ensure:
- [x] All key decisions documented above (✅ Complete)
- [ ] File changes logged (will update as implementation progresses)
- [x] Next steps clearly stated (✅ Phase 1 token creation)
- [x] Open questions captured (✅ 4 questions documented)
- [x] Tasks.md created with full breakdown (✅ See tasks file)

## Implementation Notes

### Phase Completion Tracking
- [x] Phase 1: Design System Refinement (✅ Complete)
- [x] Phase 2: Atom Enhancements (✅ Complete)
- [x] Phase 3: Molecule Enhancements (✅ Complete)
- [x] Phase 4: Section Redesigns (✅ COMPLETE - All 5 major sections enhanced!)
  - [x] 4.1 Hero Section (hero-breadcrumb) - 18 tasks ✅
  - [x] 4.2 Services Section (services-preview) - 10 tasks ✅
  - [x] 4.3 Approach Section (approach-preview) - 10 tasks ✅
  - [x] 4.4 Testimonials Section (testimonials-enhanced) - 12 tasks ✅
  - [x] 4.5 Contact Section (contact-form-enhanced) - 10 tasks ✅
- [x] Phase 5: Organism Enhancements (✅ COMPLETE - Already v5.1 enhanced 2025-11-20!)
  - [x] 5.1-5.2 Header: Warm gradient, branded border, shadow on scroll, mobile menu animation ✅
  - [x] 5.3-5.4 Footer: Warm gradient, branded border, cohesive branding ✅
- [ ] Phase 6: Cross-Cutting Improvements (0/7 tasks)

### Files Modified Counter
**Current: 27 files modified**
**Target: ~38 files total**

**Phase 1-4.5 Modified (COMPLETE):**
1-22. (Phase 1-4.3 files)
23. `content/romanian/_index.md` (testimonials section) ✅
24. `content/english/_index.md` (testimonials section) ✅
25. `themes/andromeda-hugo/layouts/partials/sections/contact-form-enhanced.html` (v4.0 complete redesign) ✅
26. `themes/andromeda-hugo/assets/scss/06-components/_contact-form-enhanced.scss` (v4.0 complete redesign) ✅
27. Dev docs updated (context + tasks)

**Phase 4 Achievement:** All 5 homepage sections redesigned with v4.0 design language! ✅

### Quality Gate Results
_Will be populated as phases complete_

**Phase 1:**
- Visual QA: Pending
- Accessibility: Pending
- Performance: Pending
- Code Quality: Pending

## Recovery Instructions

**If context gets compacted/reset:**

1. Read this file first for current status
2. Check `design-ux-improvements-plan.md` for full strategy
3. Check `design-ux-improvements-tasks.md` for task progress
4. Resume from "Current Focus" section above
5. Reference "Key Decisions Made" for rationale behind choices
6. Use "Key Files to Modify" as implementation roadmap

**Quick context refresh:**
- This is a design enhancement project for psychology practice website
- Architecture: ITCSS + BEM + Atomic Design (71 components)
- Constraint: Modify existing components only, no new components
- Based on 5 screenshot reviews of current design
- 6-phase approach over 4 weeks
- Currently at: Planning complete, ready for Phase 1 implementation
