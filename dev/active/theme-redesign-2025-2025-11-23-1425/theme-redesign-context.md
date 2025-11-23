# Theme Redesign 2025 - Context

**Last Updated:** 2025-11-23 15:30

## Quick Reference

**Status:** Phase 3 In Progress - Section 1 (33% complete)
**Current Focus:** Hero section - compass atom done, HTML + SCSS pending
**Next Step:** Update hero-breadcrumb.html with two-column layout + compass

## Key Files Reference

### Source Documents
- `/eval1.md` - Complete design extraction and implementation specifications (PRIMARY SOURCE)
- `/design-system.md` - Conceptual design reference (React/Tailwind → Hugo/SCSS translation)
- `/ARCHITECTURE.md` - Hugo theme architecture (71 components, ITCSS + BEM)
- `/CLAUDE.md` - Development guidelines

### Token Files (Phase 1 targets)
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-colors.scss` - Color system
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-typography.scss` - Fonts
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-spacing.scss` - Spacing grid
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-shadows.scss` - Shadows
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-components.scss` - Border radius

### Component Files (Phase 2 targets)
**Atoms:**
- `layouts/partials/atoms/button.html` + `06-components/_button.scss`
- `layouts/partials/atoms/heading.html` + `06-components/_heading.scss`
- `layouts/partials/atoms/icon-blob.html` + `06-components/_icon-blob.scss` (NEW)

**Molecules:**
- `layouts/partials/molecules/card.html` + `06-components/_card.scss`
- `layouts/partials/molecules/accordion-item.html` + `06-components/_accordion.scss`
- `layouts/partials/molecules/navigation.html` + `06-components/_navigation.scss`

### Section Files (Phase 3 targets)
1. `sections/hero-breadcrumb.html` + `_hero-breadcrumb.scss` (MODIFY)
2. `sections/services-grid.html` + `_services-grid.scss` (NEW or MODIFY)
3. `sections/methodology-zigzag.html` + `_methodology-zigzag.scss` (NEW)
4. `sections/cta-split.html` + `_cta-split.scss` (NEW)
5. `sections/testimonials-enhanced.html` + `_testimonials-dark.scss` (MODIFY)
6. `sections/faq-content.html` + `_faq-accordion.scss` (MODIFY)
7. `sections/contact-form-enhanced.html` + `_contact-split.scss` (MODIFY)
8. `organisms/footer.html` + `_footer.scss` (MODIFY)
9. `sections/blog-grid.html` + `_blog-grid.scss` (MODIFY)
10. `sections/test-grid.html` + `_test-grid.scss` (NEW)

## Key Decisions Made

**2025-11-23 - Color System Migration Strategy**
- **Context:** Design uses forest green (#234E3E) vs current emerald (#4DB380), need migration path
- **Decision:** Parallel color scale strategy - add new scales alongside existing, use semantic variables
- **Rationale:**
  - Zero breaking changes to existing code
  - Gradual migration section-by-section
  - Easy rollback if needed
  - Semantic variables (`$color-brand-primary`) hide implementation
- **Alternatives Considered:**
  - Direct replacement (REJECTED: too risky, breaks existing)
  - Aliasing (REJECTED: confusing semantics)
- **Implementation:** Phase 1 adds `$forest-*`, `$sage-*`, `$gold-*`, `$cream-*` scales plus semantic mappings

**2025-11-23 - Typography Update (Playfair Display + DM Sans)**
- **Context:** Design system specifies Playfair Display + DM Sans, current uses Crimson Pro + Work Sans
- **Decision:** Full replacement of font families
- **Rationale:**
  - Both are elegant serifs (similar category)
  - Single Google Fonts import change
  - Low risk, high visual impact
  - Aligns with design specifications
- **Alternatives Considered:**
  - Keep Crimson Pro (REJECTED: doesn't match design intent)
  - A/B test (REJECTED: unnecessary complexity)
- **Implementation:** Update `@import` URL + `$font-heading`/`$font-body` variables in Phase 1

**2025-11-23 - Button Shape (Pill vs Rounded)**
- **Context:** Design shows rounded-full buttons (pill, 9999px), current uses 12px radius
- **Decision:** Full pill shape (rounded-full)
- **Rationale:**
  - Distinctive visual identity
  - Clear design system adherence
  - Modern, friendly aesthetic
- **Alternatives Considered:**
  - Heavy rounded (24-32px) compromise (REJECTED: half-measure)
  - Conditional variant (REJECTED: adds complexity)
- **Implementation:** Update `$radius-button: $radius-full` in Phase 2
- **Risk Mitigation:** Ensure 44×44px min touch targets via padding

**2025-11-23 - Cream vs Mint Background Philosophy**
- **Context:** Design uses cream (#F4F7F5), current uses mint (#E8F5F0) for "healing aesthetic"
- **Decision:** Replace mint with cream backgrounds
- **Rationale:**
  - design-system.md is authoritative source
  - Cream provides cleaner, more neutral canvas
  - Better contrast for forest green text
- **Alternatives Considered:**
  - Keep mint (REJECTED: doesn't match design)
  - Hybrid cream/mint (REJECTED: inconsistent)
- **Implementation:** Update `$color-bg-primary: $cream-100` in Phase 1

**2025-11-23 - Implementation Phases (5 phases, 5-6 weeks)**
- **Context:** Large redesign needs structured approach to avoid chaos
- **Decision:** 5-phase waterfall (Tokens → Components → Sections → Testing → Docs)
- **Rationale:**
  - Foundation-first ensures consistency
  - Per-phase validation catches issues early
  - Clear checkpoints for review
- **Alternatives Considered:**
  - Section-by-section (REJECTED: inconsistent foundation)
  - Big bang (REJECTED: too risky)
- **Implementation:** Follow plan.md phase structure strictly

## Open Questions

None currently - eval1.md provides complete specifications.

## Blockers

None currently - ready to implement.

## Design Specifications (Quick Reference)

### Color Palette
- **Primary:** Forest Green #234E3E (`$forest-500`)
- **Secondary:** Sage Green #6B9080 (`$sage-500`)
- **Accent:** Gold/Sand #C5A880 (`$gold-500`)
- **Backgrounds:** Cream #F4F7F5 (`$cream-100`), White #FFFFFF (`$cream-50`)
- **Text Primary:** Dark green-black #1A332A (`$text-primary-green`)
- **Text Muted:** Green-grey #587065 (`$text-muted-green`)
- **Dark Sections:** #2F5548 (`$forest-700`) - footer, testimonials, contact panel

### Typography
- **Headings:** Playfair Display, weights 400/500/600/700, with italic variants
- **Body:** DM Sans, weights 300/400/500/700
- **Hero Size:** 72px (4.5rem, `$font-size-7xl`)
- **Section Headings:** 42-48px (2.625-3rem, `$font-size-4xl` to `$font-size-5xl`)
- **Body Text:** 16-18px (1-1.125rem, `$font-size-base` to `$font-size-lg`)
- **Line Height Display:** 1.1 (`$leading-display`)

### Spacing
- **Section Padding:** 96px vertical desktop (`$section-padding-y`), 64px mobile
- **Extra Generous:** 128px vertical (`$section-padding-y-xlarge`)
- **Container Max Width:** 1280px (`$container-max-width`)
- **Card Grid Gap:** 32px (`$grid-gap`)
- **Card Padding:** 40px (`$card-padding`)

### Border Radius
- **Buttons:** Pill (9999px, `$radius-full`)
- **Standard Cards:** 32px (`$radius-2xl`)
- **Heavy Cards/Images:** 48px (`$radius-3xl`)
- **Inputs:** 8px (`$radius-md`)
- **Badges:** Pill (`$radius-full`)

### Shadows
- **Card Resting:** `$shadow-lg` (neutral)
- **Card Hover:** `$shadow-2xl` (deeper)
- **Button:** `$shadow-primary` (forest green tint 20%)
- **Navigation Scroll:** `$shadow-nav` (subtle forest tint)

### Interactive States
- **Button Hover:**
  - Primary: Background sage green, lift -1px
  - Secondary: Background darker gold (#B0936B)
- **Card Hover:** Border accent/30, shadow-2xl, lift -2px
- **Link Hover:** Color change, possibly underline animation

## Testing Notes

**What's been tested:**
- None yet - planning phase

**What needs testing (per phase):**

**Phase 1 (Tokens):**
- [ ] Hugo build succeeds with new tokens
- [ ] No visual changes (tokens defined but unused)
- [ ] Browser renders fonts correctly (Playfair Display loads)

**Phase 2 (Components):**
- [ ] Button pill shape renders correctly
- [ ] Heavy card rounding (32px) visible
- [ ] Icon blobs display with color variants
- [ ] Navigation scroll state transitions smoothly

**Phase 3 (Sections):**
- [ ] Each section visual match to screenshot (90%+)
- [ ] Responsive behavior (375px, 768px, 1200px)
- [ ] Data schema validation (frontmatter structure)

**Phase 4 (Refinement):**
- [ ] Color contrast WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Keyboard navigation functional
- [ ] Cross-browser (Chrome, Firefox, Safari)
- [ ] Build time <3s
- [ ] CSS bundle <50KB gzipped

**Phase 5 (Handoff):**
- [ ] Documentation updated
- [ ] Migration guide complete
- [ ] Full site walkthrough (RO + EN)

## Before Compaction Checklist

Before context gets compacted, ensure:
- [ ] Current phase progress documented in tasks.md
- [ ] File changes logged above (Key Files Modified section)
- [ ] Next steps clearly stated in Quick Reference
- [ ] Open questions captured
- [ ] Blockers documented
- [ ] Any deviations from eval1.md noted with rationale

## Implementation Tracking

**Not Started:**
- Phase 2: Component Updates
- Phase 3: Section Implementation
- Phase 4: Refinement & Testing
- Phase 5: Documentation & Handoff

**In Progress:**
- None

**Completed:**
- ✅ eval1.md created (design extraction complete)
- ✅ Dev docs created (this file + plan + tasks)
- ✅ Git branch `redesign-2025` created
- ✅ Phase 1: Token Migration (commit cda95a3)
- ✅ Phase 2: Core Components COMPLETE (commits 39ee190, c98cac3, 7bcf742) ✅
  - Atoms: Button, Heading, Icon-blob (NEW)
  - Molecules: Card, Accordion, Navigation + scroll state JS
- ✅ Phase 3: Section 1 - Hero (1/3 tasks, commit aa3d40d)
  - Compass-animation atom (NEW): 3 rotating rings (40s/25s/15s), oscillating needle (3s), SVG-based, responsive
  - Files: compass-animation.html, _compass-animation.scss, _components.scss
  - Pending: hero-breadcrumb.html update, hero SCSS update

## Critical Notes

**DO NOT FORGET:**
1. Create git branch `redesign-2025` BEFORE any implementation
2. Use semantic color variables in new code (`$color-brand-primary` not `$forest-500`)
3. Test font rendering across browsers early (Phase 2)
4. Verify 44×44px touch targets for pill buttons
5. Screenshot comparison for each section (manual but critical)
6. Maintain build time <3s (monitor per phase)
7. WCAG AA compliance mandatory (test early)
8. Multilingual parity (RO + EN) must be maintained

**REFERENCE EVAL1.MD FOR:**
- Exact color hex codes (Part 1: Screenshot Analysis)
- Complete SCSS variable definitions (Part 2: Token Migration)
- Component implementation templates (Part 3: Component Specs)
- Section-by-section implementation strategy (Part 4: Implementation Blueprint)

**SUCCESS CRITERIA:**
- Visual fidelity: 90%+ to screenshots
- Token compliance: 100% (zero hardcoded values)
- Performance: Build <3s, CSS <50KB gzipped
- Accessibility: WCAG AA (zero violations)
- Architecture: 71-component system preserved
