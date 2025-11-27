# Component Design Enhancement - Tasks

**Last Updated:** 2025-11-17
**Progress:** 0/47 tasks complete (0%)

## High-Level Phases

- [ ] Phase 1: Fix Design System Foundation (0/3 tasks) - 30 min
- [ ] Phase 2: Atoms Visual Enhancement (0/10 tasks) - 90 min
- [ ] Phase 3: Molecules Visual Enhancement (0/14 tasks) - 90 min
- [ ] Phase 4: Sections Visual Enhancement (0/10 tasks) - 90 min
- [ ] Phase 5: Motion & Interaction Polish (0/4 tasks) - 45 min
- [ ] Phase 6: Accessibility & Reduced Motion (0/4 tasks) - 30 min
- [ ] Phase 7: Documentation & Validation (0/4 tasks) - 30 min

**Total:** 0/7 phases complete | 0/47 tasks complete

---

## Detailed Task Breakdown

### Phase 1: Fix Design System Foundation (30 min)

**Goal:** Resolve Design Excellence violations and enable default enhancements

- [ ] **Task 1.1:** Fix hero typography in `_design-system.scss`
  - Change hero clamp from 4rem to 6.25rem minimum (100px requirement)
  - Update H1 fluid scaling to start at 100px
  - Test on desktop and mobile viewports

- [ ] **Task 1.2:** Enable layered backgrounds by default in `custom.scss`
  - Apply layered-background mixin to `.card`, `.section`, `.hero` classes
  - Create utility classes for layer intensities (subtle, medium, bold)
  - Test visual depth on example pages

- [ ] **Task 1.3:** Create component enhancement tokens in `_design-system.scss`
  - Add atom tokens (button ripple, icon glow, input focus)
  - Add molecule tokens (card hover, navigation transitions)
  - Add section tokens (hero overlays, background patterns)
  - Document new tokens

---

### Phase 2: Atoms Visual Enhancement (90 min)

**Goal:** Add visual personality to foundation elements

- [ ] **Task 2.1:** Enhance button atom (`atoms/button.html` + SCSS)
  - Add icon slide animation on hover (right arrow)
  - Implement ripple effect on click for primary buttons
  - Apply colored brand shadows to primary/secondary variants
  - Add gradient backgrounds to primary buttons
  - Improve focus states with brand-colored rings
  - Add loading state with spinner animation

- [ ] **Task 2.2:** Enhance heading atom (`atoms/heading.html` + SCSS)
  - Add gradient text variant for hero headings
  - Add decorative underline variant with scroll reveal
  - Ensure 100px+ for H1 on desktop
  - Add subtle text-shadow for hero depth
  - Create section-heading variant with accent line

- [ ] **Task 2.3:** Enhance input atom (`atoms/input.html` + SCSS)
  - Add smooth focus transitions with brand borders
  - Implement floating label animation
  - Add validation animations (shake error, checkmark success)
  - Improve placeholder styling
  - Add subtle background gradient on focus

- [ ] **Task 2.4:** Enhance icon atom (`atoms/icon.html` + SCSS)
  - Add brand color variants (primary, secondary, gradient)
  - Add hover pulse animation for interactive icons
  - Add sizing presets aligned with design system
  - Add subtle glow effect for featured icons

- [ ] **Task 2.5:** Enhance image atom (`atoms/image.html` + SCSS)
  - Add lazy-load fade-in animation
  - Add subtle zoom on hover for interactive images
  - Add layered shadow for depth
  - Add loading skeleton with brand gradient

---

### Phase 3: Molecules Visual Enhancement (90 min)

**Goal:** Create polished, cohesive molecule patterns

- [ ] **Task 3.1:** Enhance card molecule (`molecules/card.html` + SCSS)
  - Apply layered backgrounds by default (3+ layers)
  - Add colored brand shadows (primary/secondary by variant)
  - Add hover lift animation (translateY + shadow)
  - Add gradient borders for featured cards
  - Add subtle background pattern for depth

- [ ] **Task 3.2:** Enhance navigation molecule (`molecules/navigation.html` + SCSS)
  - Add underline animation on hover (grows from center)
  - Add active state with brand indicator
  - Add dropdown fade + slide animation
  - Improve mobile menu slide-in transition
  - Add background blur when scrolled

- [ ] **Task 3.3:** Enhance language selector (`molecules/language-selector.html` + SCSS)
  - Style dropdown with brand colors and shadows
  - Add smooth transition on option change
  - Add hover states for options
  - Improve mobile selector styling

- [ ] **Task 3.4:** Enhance form field molecule (`molecules/form-field.html` + SCSS)
  - Add label floating animation
  - Add validation feedback with icons/colors
  - Add focus state with brand glow
  - Improve error/success messaging with animations

- [ ] **Task 3.5:** Enhance social links molecule (`molecules/social-links.html` + SCSS)
  - Add hover color transitions (brand colors)
  - Add icon bounce animation on hover
  - Add subtle glow effect
  - Improve spacing and visual rhythm

- [ ] **Task 3.6:** Enhance back-to-top molecule (`molecules/back-to-top.html` + SCSS)
  - Add circular button with brand gradient
  - Add fade + slide-in reveal on scroll
  - Add rotation animation on click
  - Add progress ring showing scroll position

- [ ] **Task 3.7:** Enhance cookie consent molecule (`molecules/cookie-consent.html` + SCSS)
  - Add slide-up animation with backdrop blur
  - Style with brand colors and layered background
  - Add smooth button transitions
  - Improve typography hierarchy

---

### Phase 4: Sections Visual Enhancement (90 min)

**Goal:** Apply healing gradients and layered backgrounds to page sections

- [ ] **Task 4.1:** Enhance hero sections (various hero patterns)
  - Apply healing gradients as background overlays
  - Add subtle animated background patterns
  - Improve CTA button prominence (gradient + shadow)
  - Add scroll indicator animation
  - Verify 100px+ hero typography

- [ ] **Task 4.2:** Enhance feature sections (`feature-blocks.html`, `feature-details.html`)
  - Add icon animations on scroll reveal
  - Apply gradient accents to section dividers
  - Add hover effects on feature cards
  - Improve visual hierarchy with brand colors

- [ ] **Task 4.3:** Enhance contact form section (`contact-form-enhanced.html`)
  - Add background layering for depth
  - Improve form field focus states
  - Add submit button loading animation
  - Add success state animation

- [ ] **Task 4.4:** Enhance pricing section (`pricing-tables.html`)
  - Add featured card with gradient border + shadow
  - Add toggle animation for pricing periods
  - Improve CTA button prominence
  - Add hover lift effects on cards

- [ ] **Task 4.5:** Enhance FAQ section (`faq-content.html`, `faq-mini.html`)
  - Add smooth accordion expand/collapse
  - Add icon rotation animation
  - Improve question hover states
  - Add subtle background on open items

---

### Phase 5: Motion & Interaction Polish (45 min)

**Goal:** Ensure consistent, purposeful animations across all components

- [ ] **Task 5.1:** Implement consistent hover states
  - Apply lift + shadow to all cards
  - Apply scale 1.02 to all buttons
  - Apply underline animation to all text links
  - Ensure GPU-accelerated transforms (translate, scale, opacity)

- [ ] **Task 5.2:** Implement focus indicators
  - Brand-colored focus rings on all interactive elements
  - Visible at 4px minimum thickness
  - High contrast for accessibility
  - Smooth transition in/out

- [ ] **Task 5.3:** Implement loading states
  - Skeleton screens with brand gradient shimmer
  - Button loading spinners with brand colors
  - Page transition effects
  - Image lazy-load fade-ins

- [ ] **Task 5.4:** Implement scroll animations
  - Fade-in on scroll for sections (using AOS)
  - Parallax effects for hero backgrounds (subtle)
  - Progress indicators for long pages
  - Smooth scroll for anchor links

---

### Phase 6: Accessibility & Reduced Motion (30 min)

**Goal:** Ensure full accessibility compliance and reduced motion support

- [ ] **Task 6.1:** Implement reduced motion support
  - Verify all animations respect `prefers-reduced-motion: reduce`
  - Provide instant state changes as fallback
  - Use color/shape instead of motion for feedback
  - Test with reduced motion enabled in browser

- [ ] **Task 6.2:** Test keyboard navigation
  - Verify tab order across all components
  - Check focus visibility on all interactive elements
  - Test skip links functionality
  - Verify screen reader announcements

- [ ] **Task 6.3:** Validate color contrast
  - Check gradient text maintains WCAG AA (4.5:1)
  - Validate all button variants for sufficient contrast
  - Test focus indicators against backgrounds
  - Use color blindness simulators

- [ ] **Task 6.4:** Final accessibility audit
  - Run automated accessibility scanner
  - Manual keyboard-only navigation test
  - Screen reader testing (basic)
  - Document any accessibility notes

---

### Phase 7: Documentation & Validation (30 min)

**Goal:** Document enhancements and validate Design Excellence compliance

- [ ] **Task 7.1:** Update component documentation
  - Document new visual variants for each component
  - Add usage examples with enhanced styling
  - Note accessibility features and considerations
  - Create visual component gallery page (optional)

- [ ] **Task 7.2:** Validate Design Excellence compliance
  - [x] Hero typography: 100px+ minimum
  - [x] Layered backgrounds: Applied to cards and sections
  - [x] Motion: Consistent, purposeful, reduced-motion support
  - [x] Colored shadows: Brand shadows on primary elements
  - [x] Gradient usage: Hero, CTAs, accents
  - [x] Focus indicators: Brand-colored, visible
  - [x] Typography hierarchy: Clear distinction
  - [x] Accessibility: WCAG AA maintained

- [ ] **Task 7.3:** Create design changelog
  - Document all visual enhancements made
  - Create before/after examples for key components
  - Note performance impact (if any)
  - Create migration guide for existing pages (if needed)

- [ ] **Task 7.4:** Final visual review
  - Review all enhanced components in browser
  - Check consistency across pages
  - Verify brand aesthetic is maintained
  - Get user feedback and approval

---

## Completed Tasks

_(None yet - work not started)_

---

## Notes

**Task Ordering:**
- Phases must be completed sequentially (foundation → atoms → molecules → sections → polish)
- Tasks within each phase can be done in any order
- Some tasks may be combined for efficiency (e.g., all SCSS changes together)

**Dependencies:**
- Phase 2-4 depend on Phase 1 (foundation tokens must exist)
- Phase 5 depends on Phase 2-4 (components must exist to polish)
- Phase 6 can be done alongside Phase 5
- Phase 7 is final validation after all work complete

**Special Considerations:**
- Hugo dev server is running - changes visible immediately
- Test on multiple pages as you enhance components
- Keep user preferences in mind (balanced aesthetic)
- Maintain therapy brand feel (calming, professional)
