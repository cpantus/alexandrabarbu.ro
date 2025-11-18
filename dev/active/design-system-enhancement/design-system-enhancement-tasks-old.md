# Design System Enhancement - Tasks

**Last Updated:** 2025-11-18 14:45 UTC
**Progress:** 5/42 tasks complete (12%)
**Time Spent:** ~2 hours | **Time Remaining:** ~40 hours

---

## High-Level Tiers (REVISED)

- [x] **TIER 0: Design System Foundation (5/5 tasks) - 2 hours COMPLETE ✅**
- [ ] **TIER 1: Atom Upgrades (0/4 tasks) - 4 hours**
- [ ] **TIER 2: Section Template Updates (0/29 tasks) - 20 hours**
- [ ] **TIER 3: Component SCSS Files (0/6 tasks) - 12 hours**
- [ ] **TIER 4: Testing & Validation (0/6 tasks) - 6 hours**

**TOTAL:** 5/50 tasks | Core (TIER 0-3): 5/44 tasks | Validation (TIER 4): 0/6 tasks

---

## TIER 0: Design System Foundation (2 hours) ✅ COMPLETE

### 0.1 Color System Infrastructure (3 hours → 45 min actual)

- [ ] **Task 1.1:** Update component counts in `/CLAUDE.md` (line 12)
  - Change: `5 atoms → 17 molecules → 2 organisms → 24 sections`
  - To: `5 atoms → 21 molecules → 2 organisms → 34 sections`
  - **Estimated:** 5 min

- [ ] **Task 1.2:** Create comprehensive 34-section catalog in `/CLAUDE.md` (lines 58-69 replacement)
  - Organize into 6 categories:
    - Core Foundation (5): hero-breadcrumb, values-intro, feature-details, blog-grid, contact-info-cards
    - Interactive (4): video-popup, faq-mini, faq-content, method-tabs
    - Forms (3): contact-form-enhanced, signup-form-enhanced, newsletter-signup
    - Info & Trust (7): contact-options, onboarding-steps, privacy-guarantee, confidentiality-notice, job-listings, professional-affiliations, contact-info-cards
    - Enhanced v4.0 (5): values-compass, feature-blocks, pricing-tables, stats-numbers, credentials-showcase
    - Specialized Therapy (5): first-session-timeline, therapist-match, service-faq-inline, testimonials-enhanced, office-gallery
    - General Purpose (5): benefits-grid, timeline-process, related-services, service-highlights, problem-empathy
  - **Estimated:** 20 min

- [ ] **Task 1.3:** Add "Color Variant Usage Guidelines" section to `/CLAUDE.md` (after line 180)
  - Include button variant rules (primary, secondary, outline-primary, outline-secondary)
  - Include credential badge variant guide (8 variants with semantic meanings)
  - Include visual rhythm pattern (alternating sections)
  - Include selection decision tree
  - **Estimated:** 15 min

- [ ] **Task 1.4:** Mirror all changes to `/themes/andromeda-hugo/CLAUDE.md`
  - **Estimated:** 3 min (copy-paste with path adjustments)

- [ ] **Task 1.5:** Test Hugo build after documentation changes
  - Run: `cd themes/andromeda-hugo && hugo --gc --minify`
  - Verify: Build succeeds, no errors
  - **Estimated:** 2 min

---

### 1B. Enable Section Variant Flexibility (2-3 hours) - 15 tasks

**Pattern to apply:** Replace `"variant" "primary"` with `"variant" (.button_variant | default "primary")`

- [ ] **Task 1.6:** Update `layouts/partials/sections/values-compass.html` (line 93)
  - **Estimated:** 8 min (read file, locate line, apply pattern, verify syntax)

- [ ] **Task 1.7:** Update `layouts/partials/sections/values-intro.html` (line 18)
  - **Estimated:** 8 min

- [ ] **Task 1.8:** Update `layouts/partials/sections/first-session-timeline.html` (line 92)
  - **Estimated:** 8 min

- [ ] **Task 1.9:** Update `layouts/partials/sections/hero-breadcrumb.html`
  - **Estimated:** 10 min (locate button partial call first)

- [ ] **Task 1.10:** Update `layouts/partials/sections/cta-standard.html`
  - **Estimated:** 10 min

- [ ] **Task 1.11:** Update `layouts/partials/sections/feature-blocks.html`
  - **Estimated:** 10 min

- [ ] **Task 1.12:** Update `layouts/partials/sections/feature-details.html`
  - **Estimated:** 10 min

- [ ] **Task 1.13:** Update `layouts/partials/sections/onboarding-steps.html`
  - **Estimated:** 10 min

- [ ] **Task 1.14:** Update `layouts/partials/sections/contact-form-enhanced.html`
  - **Estimated:** 10 min

- [ ] **Task 1.15:** Update `layouts/partials/sections/signup-form-enhanced.html`
  - **Estimated:** 10 min

- [ ] **Task 1.16:** Update `layouts/partials/sections/service-highlights.html`
  - **Estimated:** 10 min

- [ ] **Task 1.17:** Update `layouts/partials/sections/related-services.html`
  - **Estimated:** 10 min

- [ ] **Task 1.18:** Update `layouts/partials/sections/timeline-process.html`
  - **Estimated:** 10 min

- [ ] **Task 1.19:** Update `layouts/partials/sections/office-gallery.html`
  - **Estimated:** 10 min

- [ ] **Task 1.20:** Test Hugo build after all template changes
  - Run: `hugo --gc --minify`
  - Verify: All 14 sections compile, no template errors
  - Spot check: 3-4 sections render correctly in browser
  - **Estimated:** 10 min

---

### 1C. Complete Credential CSS Variants (20 min) - 2 tasks

- [ ] **Task 1.21:** Add 4 missing credential badge variants to `_credentials.scss`
  - File: `themes/andromeda-hugo/assets/scss/components/_credentials.scss`
  - Location: After line 92 (after `.credential-badge-warning`)
  - Add:
    - `.credential-badge-secondary` (terracotta gradient)
    - `.credential-badge-coral` (coral gradient)
    - `.credential-badge-premium` (plum gradient)
    - `.credential-badge-sage` (sage gradient)
  - **Estimated:** 15 min

- [ ] **Task 1.22:** Test SCSS compilation
  - Run: `hugo --gc`
  - Verify: No SCSS compilation errors
  - Visual check: Create test page with all 8 badge variants
  - **Estimated:** 5 min

---

### 1D. Update Content with Strategic Variants (1.5 hours) - 7 tasks

- [ ] **Task 1.23:** Update English homepage (`content/english/_index.md`)
  - Apply alternating pattern:
    - hero_breadcrumb: `button_variant: "primary"` (Section 1)
    - values_compass: `button_variant: "secondary"` (Section 2)
    - feature_blocks: `button_variant: "outline-primary"` (Section 3)
    - stats_numbers: `button_variant: "secondary"` (Section 4)
    - testimonials: `button_variant: "outline-secondary"` (Section 5)
  - Update credential badges: mix primary, secondary, coral, premium
  - **Estimated:** 15 min

- [ ] **Task 1.24:** Update Romanian homepage (`content/romanian/_index.md`)
  - Mirror English homepage variant assignments
  - **Estimated:** 10 min

- [ ] **Task 1.25:** Update English services (`content/english/servicii/_index.md`)
  - Apply alternating pattern for services overview
  - **Estimated:** 15 min

- [ ] **Task 1.26:** Update Romanian services (`content/romanian/servicii/_index.md`)
  - Mirror English services variant assignments
  - **Estimated:** 10 min

- [ ] **Task 1.27:** Update English about (`content/english/despre-mine/_index.md`)
  - Apply warm variant focus (more secondary/coral for personal connection)
  - **Estimated:** 15 min

- [ ] **Task 1.28:** Update Romanian about (`content/romanian/despre-mine/_index.md`)
  - Mirror English about variant assignments
  - **Estimated:** 10 min

- [ ] **Task 1.29:** Spot check 2 additional pages
  - Choose 2 service detail pages or blog posts
  - Apply variant assignments as examples
  - **Estimated:** 15 min

---

### 1E. Testing & Validation (1 hour) - 6 tasks

- [ ] **Task 1.30:** Hugo build verification
  - Run: `cd themes/andromeda-hugo && hugo --gc --minify`
  - Measure: Build time (target <3s, baseline 1.5s)
  - Verify: 0 errors, 0 warnings
  - **Estimated:** 5 min

- [ ] **Task 1.31:** Color distribution metrics
  - Count: `rg 'button_variant.*"primary"' content/ | wc -l`
  - Count: `rg 'button_variant.*"secondary"' content/ | wc -l`
  - Count: `rg 'button_variant.*"outline' content/ | wc -l`
  - Verify: ~50-60% primary, ~20-30% secondary, ~10-20% outline
  - **Estimated:** 5 min

- [ ] **Task 1.32:** Visual audit - Homepage
  - RO: Load `/` in browser
  - EN: Load `/en/` in browser
  - Verify: Emerald + terracotta balanced, not 90% green
  - Verify: Credential badges show 8 color variants
  - **Estimated:** 10 min

- [ ] **Task 1.33:** Visual audit - Responsive
  - Mobile (375px): Check color visibility, button hierarchy
  - Tablet (768px): Verify balanced distribution
  - Desktop (1200px): Confirm visual rhythm
  - **Estimated:** 15 min

- [ ] **Task 1.34:** Backward compatibility test
  - Find 2-3 pages WITHOUT button_variant specified
  - Verify: They still render with primary variant (default)
  - Verify: No console errors
  - **Estimated:** 10 min

- [ ] **Task 1.35:** Accessibility audit
  - Check: Color contrast still meets WCAG AA (4.5:1)
  - Test: Keyboard navigation on all button variants
  - Verify: Focus states visible
  - **Estimated:** 15 min

---

## PHASE 2: Font Upgrade Experimentation (4-5 hours)

### 2A. Test Cormorant + Source Sans Pro (2 hours) - 5 tasks

- [ ] **Task 2.1:** Update font imports and variables
  - File 1: `themes/andromeda-hugo/assets/scss/_design-system.scss` (lines 16-17)
    - Change @import to Cormorant Garamond + Source Sans 3
  - File 2: `themes/andromeda-hugo/assets/scss/_design-tokens.scss` (lines 239-240)
    - `$font-heading: 'Cormorant Garamond', serif;`
    - `$font-body: 'Source Sans 3', sans-serif;`
  - **Estimated:** 15 min

- [ ] **Task 2.2:** Build and initial visual review
  - Run: `hugo server --buildDrafts`
  - Review: Homepage, service page, about page, blog post
  - Note: First impressions (does it feel more distinctive?)
  - **Estimated:** 30 min

- [ ] **Task 2.3:** Responsive testing
  - Mobile (375px): Check readability, heading hierarchy clear
  - Tablet (768px): Verify balance
  - Desktop (1200px): Confirm distinctive impact
  - **Estimated:** 30 min

- [ ] **Task 2.4:** Long-form content readability test
  - Load: Service page with 500+ word therapy description
  - Read: Full content, assess comfort (eye strain, reading speed)
  - Verify: Line-height and letter-spacing appropriate
  - **Estimated:** 30 min

- [ ] **Task 2.5:** Take screenshots for comparison
  - Screenshot: Homepage hero section
  - Screenshot: Service page body content
  - Screenshot: About page (headings + body mix)
  - Save: In `/dev/active/design-system-enhancement/screenshots/cormorant/`
  - **Estimated:** 15 min

---

### 2B. Test Alternative Pairing (2 hours) - 1 task

- [ ] **Task 2.6:** Test second font pairing (choose one)
  - **Option A:** Crimson Text + Nunito Sans (warmth-focused)
  - **Option B:** Poppins + Inter (conservative, minimal change)
  - Process: Repeat Tasks 2.1-2.5 with alternative pairing
  - Save screenshots in separate directory
  - **Estimated:** 2 hours

---

### 2C. Final Selection & Implementation (1 hour) - 1 task

- [ ] **Task 2.7:** Side-by-side comparison and decision
  - Compare: Screenshots from both font pairings
  - Evaluate: Trust factor, warmth, distinctiveness, readability
  - Stakeholder review: If required, present options
  - Decision: Choose final pairing
  - Implement: Update SCSS with chosen fonts
  - Build: Final `hugo --gc --minify`
  - Performance check: Measure font load size (<10KB target)
  - **Estimated:** 1 hour

---

## PHASE 3A: Component Quick Wins (6 hours)

### 3A.1: Fix Icon Violations (1.5 hours) - 8 tasks

- [ ] **Task 3A.1:** Fix `sections/confidentiality-notice.html:8`
  - Replace: `<i class="las la-lock me-3" style="font-size: 2rem;"></i>`
  - With: `{{ partial "atoms/icon.html" (dict "name" "lock" "size" "2x" "class" "me-3") }}`
  - **Estimated:** 10 min

- [ ] **Task 3A.2:** Fix `sections/privacy-guarantee.html:9`
  - Replace: `<i class="las la-shield-alt text-primary mb-3" style="font-size: 4rem;"></i>`
  - With: `{{ partial "atoms/icon.html" (dict "name" "shield-alt" "size" "4x" "color" "primary" "class" "mb-3") }}`
  - **Estimated:** 10 min

- [ ] **Task 3A.3:** Fix `sections/privacy-guarantee.html:19`
  - Replace: `<i class="las la-check-circle text-primary me-2"></i>`
  - With: `{{ partial "atoms/icon.html" (dict "name" "check-circle" "color" "primary" "class" "me-2") }}`
  - **Estimated:** 8 min

- [ ] **Task 3A.4:** Fix `sections/problem-empathy.html:39`
  - Replace: `<i class="las la-{{ $challenge.icon | default "exclamation-circle" }}"></i>`
  - With: `{{ partial "atoms/icon.html" (dict "name" ($challenge.icon | default "exclamation-circle")) }}`
  - **Estimated:** 10 min

- [ ] **Task 3A.5:** Fix `sections/values-compass.html:67`
  - Replace: `<i class="las la-{{ replace $item.icon "las la-" "" }}" aria-hidden="true"></i>`
  - With: `{{ partial "atoms/icon.html" (dict "name" $item.icon) }}`
  - Update front matter to pass clean icon names (no "las la-" prefix)
  - **Estimated:** 15 min

- [ ] **Task 3A.6:** Fix `molecules/footer-nav.html` social icons (6 instances)
  - Lines 33, 42, 51, 60, 69, 78
  - Replace all 6 raw `<i>` tags with icon atom calls
  - **Estimated:** 20 min

- [ ] **Task 3A.7:** Fix semantic icon in `molecules/card.html:158`
  - Replace: thumbtack icon
  - With: `check-circle` icon (semantically correct for "feature included")
  - **Estimated:** 5 min

- [ ] **Task 3A.8:** Test icon fixes
  - Build: `hugo --gc`
  - Verify: All icons render correctly
  - Check: No console errors
  - Visual: Spot check 5 sections with icons
  - **Estimated:** 12 min

---

### 3A.2: Fix Hardcoded Values (1 hour) - 5 tasks

- [ ] **Task 3A.9:** Fix `_sections.scss:22` padding
  - Replace: `padding: 2rem`
  - With: `padding: $space-8` (2rem = 32px = $space-8)
  - **Estimated:** 5 min

- [ ] **Task 3A.10:** Fix `_sections.scss:250` padding
  - Replace: `padding: 2rem`
  - With: `padding: $space-8`
  - **Estimated:** 5 min

- [ ] **Task 3A.11:** Fix `_sections.scss:120` border-radius
  - Replace: `border-radius: 50%`
  - With: `border-radius: $radius-full`
  - **Estimated:** 5 min

- [ ] **Task 3A.12:** Fix `_sections.scss:395` hardcoded shadow
  - Current: `box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);`
  - Option A: Create `$shadow-upward` token in `_design-tokens.scss`
  - Option B: Use existing token with `transform: rotateX(180deg)` wrapper
  - Decision: Create token (cleaner, reusable)
  - **Estimated:** 15 min

- [ ] **Task 3A.13:** Test hardcoded value fixes
  - Build: `hugo --gc --minify`
  - Grep: Verify no new hardcoded values introduced
  - Visual: Check affected sections render correctly
  - **Estimated:** 10 min

---

### 3A.3: Upgrade Hero Breadcrumb (1.5 hours) - 4 tasks

- [ ] **Task 3A.14:** Create/enhance `_hero-breadcrumb.scss`
  - File: `themes/andromeda-hugo/assets/scss/components/_hero-breadcrumb.scss`
  - Check: If file exists, enhance; if not, create
  - **Estimated:** 5 min

- [ ] **Task 3A.15:** Add organic blob background shapes
  - Use: `$blob-soft` or `$blob-organic` from design tokens
  - Implement: Pseudo-elements (::before, ::after) with gradient backgrounds
  - Colors: Subtle emerald → terracotta gradients
  - **Estimated:** 30 min

- [ ] **Task 3A.16:** Add gradient backgrounds
  - Use: `$gradient-warm-subtle` or `$gradient-healing-depth`
  - Apply: To hero section container
  - Layers: 3-layer depth system (base + 2 radial accents)
  - **Estimated:** 30 min

- [ ] **Task 3A.17:** Enhanced breadcrumb hover effects
  - Hover: Color transition + subtle underline slide-in
  - Transition: `$duration-fast` with `$easing-medium`
  - Accessibility: Maintain focus states
  - Test: Visual check on homepage
  - **Estimated:** 25 min

---

### 3A.4: Upgrade Contact Info Cards (2 hours) - 4 tasks

- [ ] **Task 3A.18:** Create/enhance `_contact-info-cards.scss`
  - File: `themes/andromeda-hugo/assets/scss/components/_contact-info-cards.scss`
  - Check: If file exists, enhance; if not, create
  - **Estimated:** 5 min

- [ ] **Task 3A.19:** Add glassmorphism effect
  - Mixin: `@include glassmorphism(12px, 0.85)`
  - Properties: `backdrop-filter: blur(12px)`, semi-transparent background
  - Border: `rgba(255, 255, 255, 0.2)` subtle edge
  - **Estimated:** 30 min

- [ ] **Task 3A.20:** Add gradient icon circle backgrounds
  - Icon containers: Circular gradient backgrounds
  - Gradients: Use `$gradient-icon-emerald`, `$gradient-icon-teal`, `$gradient-icon-terracotta`
  - Size: Consistent circle size ($space-16 or similar)
  - **Estimated:** 40 min

- [ ] **Task 3A.21:** Add warm brand-tinted shadows + hover lift
  - Shadow: `$shadow-sm` at rest, `$shadow-md` on hover
  - Brand tint: Add subtle emerald/terracotta color to shadow
  - Hover: `translateY(-4px)` lift animation
  - Transition: `$duration-base` with `$easing-medium`
  - Test: Visual check on contact page, responsive test
  - **Estimated:** 45 min

---

## PHASE 3B: Full Component Consistency (16 hours OPTIONAL)

### 3B.1: Standardize Navigation States (2 hours) - 4 tasks

- [ ] **Task 3B.1:** Create `.nav-item-active` mixin
  - File: `themes/andromeda-hugo/assets/scss/components/_navigation.scss`
  - Mixin: Define active state styles (color, underline, background)
  - Properties: Use design tokens for consistency
  - **Estimated:** 30 min

- [ ] **Task 3B.2:** Unify hover states
  - Apply: Consistent hover transition to nav-item, footer-nav, breadcrumb
  - Transition: `color $duration-fast $easing-medium`
  - Effect: Subtle color shift + underline slide-in
  - **Estimated:** 45 min

- [ ] **Task 3B.3:** Unify focus states
  - Accessibility: `:focus-visible` styles for keyboard navigation
  - Visual: Outline or background highlight
  - Consistent: Across all nav components
  - **Estimated:** 30 min

- [ ] **Task 3B.4:** Test navigation consistency
  - Keyboard test: Tab through all nav elements
  - Visual test: Hover all nav links
  - Accessibility: Screen reader test (if available)
  - **Estimated:** 15 min

---

### 3B.2: Upgrade Benefits Grid (2 hours) - 4 tasks

- [ ] **Task 3B.5:** Apply values-compass glassmorphism patterns
  - File: `themes/andromeda-hugo/assets/scss/components/_benefits-grid.scss`
  - Mixin: `@include glassmorphism(12px, 0.85)`
  - Backdrop: Blur effect on benefit cards
  - **Estimated:** 30 min

- [ ] **Task 3B.6:** Add gradient borders on hover
  - Technique: 2px border-image with gradient
  - Gradient: `$gradient-warm-vibrant` or emerald → terracotta
  - Hover state: Fade in border (opacity 0 → 1)
  - **Estimated:** 45 min

- [ ] **Task 3B.7:** Add icon pulse animations
  - Keyframes: `@keyframes pulse-glow` (scale + opacity)
  - Apply: To benefit card icons
  - Trigger: On card hover
  - **Estimated:** 30 min

- [ ] **Task 3B.8:** Add progressive disclosure (mobile)
  - Mobile only: `@media (max-width: 767px)`
  - Interaction: Tap to expand full description
  - Default: Show title + icon, hide description
  - Expanded: Show all content
  - **Estimated:** 15 min

---

### 3B.3: Enhance Blog Grid (2 hours) - 4 tasks

- [ ] **Task 3B.9:** Add hover lift effects
  - File: `themes/andromeda-hugo/assets/scss/components/_blog-grid.scss`
  - Hover: `transform: translateY(-8px)`
  - Transition: `transform $duration-base $easing-medium`
  - **Estimated:** 20 min

- [ ] **Task 3B.10:** Add brand-tinted shadows
  - Shadow base: `$shadow-sm` at rest
  - Shadow hover: `$shadow-md` with emerald/terracotta tint
  - Tint: `rgba($emerald-500, 0.1)` mixed into shadow color
  - **Estimated:** 40 min

- [ ] **Task 3B.11:** Apply organic border radius
  - Border radius: Use `$blob-soft` pattern
  - Apply: To blog post cards
  - Corners: Asymmetric organic feel
  - **Estimated:** 20 min

- [ ] **Task 3B.12:** Add "Read More" button icon animations
  - Icon: Arrow-right on read more buttons
  - Animation: Slide right on hover (`translateX(4px)`)
  - Smooth: `transition: transform $duration-fast`
  - **Estimated:** 40 min

---

### 3B.4: Upgrade FAQ Components (3 hours) - 5 tasks

- [ ] **Task 3B.13:** Add gradient border on active accordion
  - Files: `_faq-mini.scss`, `_faq-content.scss`
  - Active state: Gradient left border (3-4px)
  - Gradient: `$gradient-warm-vibrant` (emerald → terracotta)
  - **Estimated:** 40 min

- [ ] **Task 3B.14:** Add icon rotation animations
  - Chevron icon: Rotate 180deg when accordion expands
  - Transition: `transform $duration-base $easing-medium`
  - Smooth: No jank, 60fps
  - **Estimated:** 30 min

- [ ] **Task 3B.15:** Add glassmorphic hover states
  - Hover: Subtle glassmorphism effect on FAQ items
  - Effect: `backdrop-filter: blur(8px)`, semi-transparent background
  - Transition: Fade in on hover
  - **Estimated:** 45 min

- [ ] **Task 3B.16:** Implement smooth height transitions
  - Technique: `max-height` technique (avoid height: auto transition issues)
  - Collapsed: `max-height: 0`, `overflow: hidden`
  - Expanded: `max-height: 1000px` (or calculated)
  - Transition: `max-height $duration-slow $easing-medium`
  - **Estimated:** 45 min

- [ ] **Task 3B.17:** Mobile touch optimization
  - Touch target: Minimum 44px height for accordion headers
  - Tap feedback: Active state visual feedback
  - Accessibility: ARIA expanded/collapsed states
  - **Estimated:** 20 min

---

### 3B.5: Upgrade Onboarding Steps (3 hours) - 5 tasks

- [ ] **Task 3B.18:** Add gradient timeline connectors
  - File: `themes/andromeda-hugo/assets/scss/components/_onboarding-steps.scss`
  - Connectors: Vertical/horizontal lines between steps
  - Gradient: Emerald → terracotta along timeline
  - **Estimated:** 45 min

- [ ] **Task 3B.19:** Add icon pulse animations
  - Milestone icons: Pulse glow effect
  - Keyframes: `@keyframes pulse-milestone` (scale + glow)
  - Trigger: On scroll into view (optional) or auto-loop
  - **Estimated:** 40 min

- [ ] **Task 3B.20:** Add glassmorphic step cards
  - Step cards: Glassmorphism effect
  - Mixin: `@include glassmorphism(12px, 0.85)`
  - Layering: Ensure readability with backdrop blur
  - **Estimated:** 45 min

- [ ] **Task 3B.21:** Add progress indicator animations
  - Progress bar: SVG or pseudo-element
  - Animation: `stroke-dashoffset` for SVG or width transition
  - Visual: Fills as user progresses through steps (if interactive)
  - **Estimated:** 40 min

- [ ] **Task 3B.22:** Test onboarding steps component
  - Visual: Check all step states (current, completed, upcoming)
  - Responsive: Mobile, tablet, desktop layouts
  - Animation: Verify 60fps, no jank
  - **Estimated:** 10 min

---

### 3B.6: Enhance Timeline Process (4 hours) - 6 tasks

- [ ] **Task 3B.23:** Create SVG gradient timeline path
  - File: `themes/andromeda-hugo/assets/scss/components/_timeline-process.scss`
  - SVG: Vertical timeline path
  - Gradient: `<linearGradient>` emerald → terracotta along path
  - Stroke: Apply gradient to timeline connector line
  - **Estimated:** 1 hour

- [ ] **Task 3B.24:** Add animated progress indicator
  - Progress: Visual indicator showing current position
  - Animation: Scroll-driven (if supported) or auto-animation
  - Technique: `stroke-dasharray` + `stroke-dashoffset` for SVG
  - **Estimated:** 1 hour

- [ ] **Task 3B.25:** Add organic blob shapes for milestones
  - Milestone nodes: Use organic border-radius (`$blob-soft`)
  - Background: Gradient or glassmorphism
  - Icon: Centered in blob shape
  - **Estimated:** 40 min

- [ ] **Task 3B.26:** Add parallax scrolling (desktop ≥992px)
  - Effect: Timeline items move at different speeds on scroll
  - Implementation: `transform: translateY()` based on scroll position
  - Subtle: Not too aggressive (motion sickness concern)
  - **Estimated:** 1 hour

- [ ] **Task 3B.27:** Optimize mobile vertical timeline
  - Mobile: Simplified vertical layout
  - Touch: Easy to scroll through timeline
  - Spacing: Adequate breathing room between items
  - **Estimated:** 15 min

- [ ] **Task 3B.28:** Test timeline process component
  - Desktop: Parallax smooth, no jank
  - Mobile: Vertical timeline readable
  - Accessibility: Reduced-motion support (disable parallax)
  - **Estimated:** 5 min

---

### 3B.7: Final Testing & Validation (2 hours) - 2 tasks

- [ ] **Task 3B.29:** Comprehensive visual audit
  - All pages: Homepage, services, about, blog, contact
  - All components: 6 upgraded components render correctly
  - Responsive: Mobile, tablet, desktop all breakpoints
  - Browsers: Chrome, Firefox, Safari (if available)
  - **Estimated:** 1 hour

- [ ] **Task 3B.30:** Performance & accessibility final check
  - Build time: Still <3s (target maintained)
  - Lighthouse: Performance score (aim for 90+)
  - Accessibility: WCAG AA compliance maintained
  - Animations: All 60fps, respect `prefers-reduced-motion`
  - **Estimated:** 1 hour

---

## Completed Tasks

_None yet - starting implementation_

---

## Notes

### Task Dependencies
- **Phase 2 requires Phase 1 complete:** Need color balance foundation before font changes
- **Phase 3A can run parallel to Phase 2:** Icon fixes independent of font changes
- **Phase 3B requires 3A complete:** Build on quick wins foundation

### Task Estimation Philosophy
- **Individual tasks:** 5-60 min each (granular for tracking)
- **Built-in buffer:** ~20% buffer in estimates for unexpected issues
- **Testing integrated:** Each section includes testing tasks (not afterthought)

### Resuming Mid-Phase
If session ends mid-phase:
1. Check off completed tasks
2. Update context.md with current focus (which task actively working on)
3. Note any blockers or decisions made during implementation
4. Next session: Resume from first unchecked task in current phase

### Quality Gates
Before marking phase complete:
- [ ] All tasks in phase checked off
- [ ] Hugo build succeeds
- [ ] Visual audit passed
- [ ] No new errors introduced
- [ ] Performance maintained (<3s builds)

---

**Tasks File Complete**
**Total Effort:** 30-32 hours (Core: 14-16h, Optional: 16h)
**Next Task:** Task 1.1 (Update component counts in CLAUDE.md)
