# Design & UX Improvements - Tasks

**Last Updated:** 2025-11-23 10:30 UTC
**Progress:** 93/100 tasks complete (93%)

## High-Level Phases

- [x] Phase 1: Design System Refinement (5/5 tasks) ✅
- [x] Phase 2: Atom Enhancements (8/8 tasks) ✅
- [x] Phase 3: Molecule Enhancements (8/8 tasks) ✅
- [x] Phase 4: Section Redesigns (60/60 tasks) ✅
- [x] Phase 5: Organism Enhancements (4/4 tasks) ✅ **COMPLETE!**
- [ ] Phase 6: Cross-Cutting Improvements (0/7 tasks)

---

## Detailed Task Breakdown

### Phase 1: Design System Refinement (Foundation)

**1.1-1.2 Token Files** ✅
- [x] Gradients and motion tokens already existed
- [x] All required gradients and durations present

**1.3 Color Tokens Enhancement** ✅
- [x] Added `$overlay-dark: rgba($gray-900, 0.85)`
- [x] Added `$overlay-light: rgba($green-50, 0.95)`

**1.4 Spacing Tokens** ✅
- [x] `$space-5: 20px` already existed

**1.5 Token Migration** ✅
- [x] Build successful (510ms)
- [x] No regressions

---

### Phase 2: Atom Enhancements (Building Blocks)

**2.1 Button Atom - HTML** ✅
- [x] Added loading state with spinner
- [x] Icon slide-right animation attribute
- [x] All props verified

**2.2 Button Atom - SCSS** ✅
- [x] Touch target: 44px → 48px
- [x] Hover: `translateY(-2px) scale(1.02)`
- [x] Focus-ring animation
- [x] Disabled: `filter: saturate(0.5)`
- [x] Loading state styles

**2.3 Icon Atom - HTML** ✅
- [x] Size documentation updated
- [x] Sizes: sm(48px), md(64px), lg(84px), xl(104px)

**2.4 Icon Atom - SCSS** ✅
- [x] Circle sizes standardized
- [x] Radial gradients (circle at 30% 30%)
- [x] Hover scale: 1.12
- [x] pulse-subtle animation added

**2.5 Heading Atom - HTML Template** ✅
- [x] Open `layouts/partials/atoms/heading.html`
- [x] Add `display` variant support (text-5xl, text-6xl)
- [x] Add optional gradient text effect (background-clip: text)
- [x] Verify markdownify still works

**2.6 Heading Atom - SCSS** ✅
- [x] Open `assets/scss/06-components/_heading.scss`
- [x] Improve h1 line-height: 1.25 → 1.2
- [x] Add kerning for Crimson Pro: `letter-spacing: -0.02em` for h1/h2
- [x] Add subtle text-shadow: `0 2px 4px rgba(0,0,0,0.05)`
- [x] Implement gradient text variant styles

**2.7 Image Atom - HTML Template** ✅
- [x] Open `layouts/partials/atoms/image.html`
- [x] Add `object-fit` prop: cover, contain, fill
- [x] Add `aspect-ratio` prop: 1/1, 4/3, 16/9, 21/9
- [x] Add blur-up placeholder effect logic

**2.8 Image Atom - Testing** ✅
- [x] Build test successful (590ms - well under 3s target)
- [x] WebP/AVIF processing verified (existing code intact)
- [x] Lazy loading functionality verified (existing code intact)

---

### Phase 3: Molecule Enhancements (Composite Components)

**3.1 Service Preview Card - HTML Template** ✅
- [x] Added `number_badge` and `button_variant` params
- [x] Number badge element in top-right
- [x] Button uses configurable variant (default: outline-primary)
- [x] Arrow icon already present

**3.2 Service Preview Card - SCSS** ✅
- [x] Enhanced glassmorphism (blur 6px, opacity 0.95)
- [x] 3px accent border system (intensifies 4px on hover)
- [x] Icon hover: `rotate(5deg) scale(1.15)`
- [x] Number badge styles (48px/40px, gray, top-right)
- [x] Variant-specific border colors (all 8 variants)

**3.3 Card Molecule - HTML Template** ✅
- [x] Added `accentTop`, `numberBadge`, `hoverIntensity` props
- [x] Class building logic for modifiers
- [x] Badge element in all variants (feature/pricing/testimonial)

**3.4 Card Molecule - SCSS** ✅
- [x] Added `position: relative` to base card
- [x] Number badge styles (48px/40px, circular, top-right)
- [x] Leveraged existing `--top-accent` modifier
- [x] Leveraged existing `--hover-lift` modifiers (small/medium/large)

**3.5 Form Field Molecule - HTML Template** ✅
- [x] Opened `layouts/partials/molecules/form-field.html`
- [x] Floating label structure already existed (lines 82-105)
- [x] Added error/success validation icons with proper positioning
- [x] Added ARIA attributes (`aria-live="polite"` for error feedback)
- [x] Icons use Line Awesome (las la-check-circle, las la-exclamation-circle)

**3.6 Form Field Molecule - SCSS** ✅
- [x] Enhanced `assets/scss/06-components/_form.scss` (form-field uses this)
- [x] Floating label animation already existed (lines 82-105)
- [x] Added gradient border on focus using `border-image` property
- [x] Increased padding: 12px 16px → 14px 18px
- [x] Enhanced focus ring: `0 0 0 3px rgba($color-primary, 0.1)`
- [x] Created `@keyframes shake` (4px shake animation)
- [x] Enhanced error state: red border, red label, shake animation
- [x] Enhanced success state: green border, green label
- [x] Created `@keyframes slideInFade` for error messages
- [x] Added `.c-form__validation-icon` styles for icon positioning

**3.7 Breadcrumb Molecule - SCSS** ✅
- [x] Opened `assets/scss/06-components/_breadcrumb.scss`
- [x] Reduced font size: 14px → 13px
- [x] Lightened link color: $color-text-secondary → $gray-500
- [x] Lightened home icon color: $color-text-secondary → $gray-500
- [x] Added separator opacity: 0.5 for reduced visual weight

**3.8 Molecule Testing** ✅
- [x] Build test: Successful at 592ms (▼ 119ms faster - performance improvement!)
- [x] CSS compilation verified: All enhancements properly compiled
- [x] Service card: Number badges, accent borders, icon gradients all compiled
- [x] Card molecule: accentTop, numberBadge, hoverIntensity modifiers present
- [x] Form field animations: shake and slideInFade keyframes compiled (lines 5570, 5578)
- [x] Form field validation: .c-form__validation-icon classes compiled
- [x] Breadcrumb: .c-breadcrumb__separator styles compiled
- [x] No errors: Only content warnings (not component issues)
- [x] All Phase 3 molecules ready for visual testing in browser

---

### Phase 4: Section Redesigns (Key UX Improvements)

#### 4.1 Hero Section (hero-breadcrumb) - 18 tasks ✅

- [x] Open `layouts/partials/sections/hero-breadcrumb.html`
- [x] Change grid ratio: `1fr 1fr` → `5fr 4fr`
- [x] Add vertical centering for content column
- [x] Update responsive breakpoint: stack at 992px (already correct)
- [x] Add kicker text prop (optional, above title)
- [x] Update subtitle size prop to support 18px
- [x] Replace circular image with organic blob shape (clip-path)
- [x] Reposition quote box to overlap image by 20%
- [x] Enhance CTA buttons: add icons, increase size to lg
- [x] Increase button gap: 16px → 20px

- [x] Open `assets/scss/06-components/_hero-breadcrumb.scss`
- [x] Implement grid ratio changes (5fr 4fr)
- [x] Add vertical centering styles (flexbox justify-content: center)
- [x] Update responsive breakpoints (maintained at 992px)
- [x] Implement kicker text styles (12px, uppercase, terracotta, semibold)
- [x] Improve h1 typography (text-5xl/6xl, letter-spacing -0.02em)
- [x] Create organic blob shape (clip-path with blob-morph animation)
- [x] Add image border: 4px solid $green-100 + shadow-2xl
- [x] Implement quote box glassmorphism: rgba($primary-900, 0.85) + blur(12px)
- [x] Style quote text: Crimson Pro italic, 18px, white
- [x] Add quote icon styling (las la-quote-left, primary-400, 24px)
- [x] Add decorative background blob with gradient + animation
- [x] Implement CTA button fadeInUp animation

**Build Test:** ✅ Successful (529ms - well under 3s target)

#### 4.2 Services Section (services-preview) - 10 tasks ✅

- [x] Open `layouts/partials/sections/services-preview.html`
- [x] Add subtitle above title: "Cum Te Pot Ajuta"
- [x] Center-align section header
- [x] Add decorative gradient line below title (60px wide)
- [x] Update service card loop to pass accent color variant
- [x] Add section-level CTA button: "Vezi Toate Serviciile" (outline-secondary)
- [x] Ensure card differentiation (number badges 01-04, alternating gradients)

- [x] Open `assets/scss/06-components/_services-preview.scss`
- [x] Change background: white → $green-50
- [x] Add subtle radial gradient overlay
- [x] Style subtitle: gray-600, 16px
- [x] Create decorative gradient line: 60px wide, emerald → terracotta
- [x] Reduce grid gap: 40px → 32px
- [x] Update tablet breakpoint (768-991px): 2 columns with better spacing
- [x] Style section CTA button (center-aligned below grid)
- [x] Implement card accent border rotation (primary → secondary → coral → sage)
- [x] Implement icon gradient rotation (matching accent colors)
- [x] Add number badge positioning and styling
- [x] Test all changes with 4 service cards

**Build Test:** ✅ Successful (build completes without errors)

#### 4.3 Approach Section (approach-preview) - 10 tasks ✅

- [x] Open `layouts/partials/sections/approach-preview.html`
- [x] Change layout from horizontal split to vertical flow
- [x] Improve "METODOLOGIE" tag styling (pill shape, emerald bg, white text)
- [x] Increase title size to text-4xl
- [x] Add description paragraph below title (2-3 sentences, explain integrative approach)
- [x] Create large feature card to replace image:
  - Gradient background (emerald → teal)
  - Large icon (las la-brain, 104px, white with glow)
  - Quote text: "Nu există o rețetă universală..."
  - Author attribution: "— Dr. Alexandra Barbu"
  - Organic blob background shape
- [x] Update methodology grid to 2×2 layout
- [x] Add methodology numbers (01-04) in top-left of cards
- [x] Standardize icon circles to 64px (md size)
- [x] Change card styling from glassmorphism to solid white with accent borders

- [x] Open `assets/scss/06-components/_approach-preview.scss`
- [x] Implement vertical flow layout (header → feature card → grid)
- [x] Style methodology tag (pill shape, emerald background, white text, centered)
- [x] Implement feature card styles:
  - Gradient background (emerald-400 → teal-500)
  - Large icon container (104px circle, white, subtle glow)
  - Quote typography (Crimson Pro italic, 20px, white, centered)
  - Author attribution (Work Sans, 14px, emerald-100)
  - Organic blob background SVG
  - Padding and spacing
- [x] Update methodology grid (2×2, consistent gaps)
- [x] Change card backgrounds: glassmorphism → solid white
- [x] Add accent borders (left or top, 3px, variant colors)
- [x] Add methodology number positioning (top-left, gray-400)
- [x] Standardize icon circles to 64px
- [x] Implement icon gradient rotation (primary/secondary/coral/sage)
- [x] Update hover states: translateY(-4px), icon rotate(-5deg)
- [x] Test feature card on all breakpoints

**Build Test:** ✅ Successful (302ms template + 495ms SCSS - well under 3s target)

#### 4.4 Testimonials Section (testimonials-enhanced) - 12 tasks ✅

**NOTE:** HTML/SCSS templates were already version 3.0.0 with all design enhancements! Only content updates needed.

- [x] ✅ All HTML template features already implemented (v3.0.0 - 2025-11-23):
  - Light background ($green-50) ✅
  - Text-4xl title, gray-600 subtitle ✅
  - Decorative quote mark (text-6xl, emerald-200) ✅
  - White cards with 3px left borders ✅
  - Floating quote marks in cards ✅
  - Avatar placeholders with initials and gradients ✅
  - 18px quote text, line-height 1.7 ✅
  - 20px stars with glow effect ✅
  - 24px grid gap ✅
  - Privacy note as card (green-100 background, lock icon) ✅
  - Section CTA button support ✅
  - AOS staggered animations ✅

- [x] Update Romanian content (_index.md):
  - Changed `author` → `name` with initials (M.A., A.E., I.P.)
  - Added `age_range`, `therapy_type`, `duration` fields
  - Added `variant: "primary"` and `background: "light"`
  - Added `privacy_note` with confidentiality text
  - Added `cta_button` with "Programează Consultație Gratuită"

- [x] Update English content (_index.md):
  - Changed `author` → `name` with initials
  - Added all structured fields matching Romanian version
  - Added privacy note and CTA button

- [x] Build test: ✅ Successful (689ms - well under 3s target)

**All 12 Phase 4.4 tasks complete!**

#### 4.5 Contact Section (contact-form-enhanced) - 10 tasks ✅

**HTML Template (v4.0 Complete Redesign):**
- [x] ✅ Replaced image-based left panel with gradient panel (emerald-700 → emerald-900)
- [x] ✅ Added organic blob shapes (2 blobs with blob-morph animation)
- [x] ✅ Created glassmorphism contact info cards structure:
  - Icon circles with gradient backgrounds
  - Title, value, and metadata fields
  - Hover effects (translateX + background change)
- [x] ✅ Updated trust badges to circular 2-column grid
- [x] ✅ Added form description field support
- [x] ✅ Added prominent privacy note badge (emerald, lock icon)
- [x] ✅ Made submit button full-width with lg size and paper-plane icon
- [x] ✅ Added loading state template (spinner + "Se trimite..." text)
- [x] ✅ Added success state template (checkmark icon + "Mesaj trimis!" text)
- [x] ✅ Mobile-first ordering (form first, contact panel second)

**SCSS Styles (v4.0 Complete Redesign):**
- [x] ✅ Updated grid ratio from `1fr 1fr` to `1fr 1.2fr`
- [x] ✅ Implemented gradient background (linear-gradient emerald-700 → emerald-900)
- [x] ✅ Created blob-morph animation (20s infinite, 2 blobs)
- [x] ✅ Styled glassmorphism contact cards:
  - `rgba(255, 255, 255, 0.1)` background
  - `backdrop-filter: blur(12px)`
  - Radial gradient icon circles (48px)
  - Typography hierarchy (title/value/meta)
  - Hover: translateX(4px) + shadow
- [x] ✅ Updated trust badges to circular grid (56px icons, 2-column)
- [x] ✅ Added subtle texture to right panel (radial-gradient dot pattern)
- [x] ✅ Styled privacy note badge (emerald border, gradient background, lock icon)
- [x] ✅ Styled form description (gray-600, relaxed line-height)
- [x] ✅ Created loading state styles (40px spinner, spin animation)
- [x] ✅ Created success state styles (64px checkmark, fadeIn animation)
- [x] ✅ Implemented responsive adjustments:
  - Tablet (lg): Reduced blob sizes, adjusted padding
  - Mobile (md): Single column grid, form-first ordering, 4-column trust grid
  - Small mobile (480px): Vertical contact cards, 2-column trust grid
- [x] ✅ Added prefers-reduced-motion support (disables all animations)
- [x] ✅ Added high contrast mode support (stronger borders)

**Build Test:** ✅ Successful (no errors or warnings)

**All 10 Phase 4.5 tasks complete! 🎉 PHASE 4 COMPLETE!**

---

### Phase 5: Organism Enhancements ✅

**NOTE:** Phase 5 was ALREADY COMPLETE! Both organisms were enhanced with v5.1 warm branding on 2025-11-20.

**5.1-5.2 Header Enhancements** ✅
- [x] ✅ Header already v5.1 enhanced (`themes/andromeda-hugo/assets/scss/06-components/_header.scss`):
  - Warm branded gradient background: `linear-gradient(to right, rgba($green-50, 0.95), rgba($terracotta-50, 0.95))`
  - 3px emerald branded border: `border-bottom: 3px solid $color-primary-500`
  - Shadow on scroll: `&--sticky` state adds `box-shadow: $shadow-md` + `backdrop-filter: blur(12px)`
  - Mobile menu icon rotation animation: Icons rotate 90deg when menu opens/closes
  - Smooth transitions throughout: `transition: all $duration-normal $easing-default`
  - Focus indicators with glow animations: `skipLinkFocusGlow`, `brandFocusGlow`, `toggleFocusGlow`
  - Skip-to-content link for accessibility (WCAG 2.1 AA)
  - Responsive collapse behavior with opacity + max-height transitions
  - Reduced-motion support: All animations disabled with `@media (prefers-reduced-motion: reduce)`

**5.3-5.4 Footer Enhancements** ✅
- [x] ✅ Footer already v5.1 enhanced (`themes/andromeda-hugo/assets/scss/06-components/_footer.scss`):
  - Warm branded gradient background: `linear-gradient(135deg, $terracotta-50 0%, $green-50 100%)` (reverse of body)
  - 3px terracotta branded border: `border-top: 3px solid $color-secondary-500`
  - Cohesive branding with warm psychology aesthetic
  - Optional CTA section with branded styling
  - Responsive grid layout (3 columns → 2 columns → 1 column)
  - 8pt spacing grid throughout
  - Print styles for clean printing

**Build Test:** ✅ Successful (no errors or warnings)

**All 4 Phase 5 tasks complete! Organisms already had v5.1 warm branding! 🎉**

---

### Phase 6: Cross-Cutting Improvements

**6.1 Animations Utility File**
- [ ] Create `assets/scss/07-utilities/_animations.scss`
- [ ] Define `@keyframes fadeInUp` - for section content reveals
- [ ] Define `@keyframes slideInRight` - for form field errors
- [ ] Define `@keyframes pulse-subtle` - for interactive icons
- [ ] Define `@keyframes focus-ring` - for button/input focus states
- [ ] Define `@keyframes shake` - for form validation errors
- [ ] Define `@keyframes blob-morph` - for organic shape animations (if using CSS, not GSAP)
- [ ] Import in `main-new.scss`

**6.2 Accessibility Audit**
- [ ] Run WAVE browser extension on all pages
- [ ] Run axe DevTools on all pages
- [ ] Verify all color contrasts meet WCAG AAA (7:1)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] Ensure all images have alt text
- [ ] Verify ARIA labels on icon-only buttons
- [ ] Check skip links work
- [ ] Verify form error announcements
- [ ] Test reduced motion support (all animations disabled)

**6.3 Performance Optimization**
- [ ] Add `will-change: transform` to animated elements
- [ ] Audit backdrop-filter usage (use sparingly, test performance)
- [ ] Add `content-visibility: auto` to off-screen sections
- [ ] Test font loading (consider font-display: swap)
- [ ] Run Lighthouse audit (target 95+)
- [ ] Check Hugo build time (must be <3s)
- [ ] Verify page size <520KB
- [ ] Test on low-end device or throttled CPU

**6.4 Cross-Browser Testing**
- [ ] Test Chrome (latest)
- [ ] Test Firefox (latest)
- [ ] Test Safari (latest)
- [ ] Test Edge (latest)
- [ ] Test Chrome Android (mobile)
- [ ] Test Safari iOS (mobile)

**6.5 Responsive Testing**
- [ ] Test 375px (iPhone SE)
- [ ] Test 768px (iPad portrait)
- [ ] Test 992px (iPad landscape)
- [ ] Test 1200px (desktop)
- [ ] Test 1920px (large desktop)

**6.6 Language Parity Check**
- [ ] Verify Romanian pages render correctly
- [ ] Verify English pages render correctly
- [ ] Check all i18n translations used
- [ ] Verify breadcrumbs work in both languages

**6.7 Final Quality Gate**
- [ ] All phases complete
- [ ] All tests passing
- [ ] Lighthouse score 95+
- [ ] WCAG AAA compliance verified
- [ ] Build time <3s
- [ ] Page size <520KB
- [ ] No console errors
- [ ] Animations smooth (60fps)
- [ ] Mobile experience tested on real device

---

## Completed Tasks

_No tasks completed yet - implementation not started_

---

## Notes

### Task Dependencies

**Must complete in order:**
1. Phase 1 must complete before Phase 2 (atoms need tokens)
2. Phase 2 must complete before Phase 3 (molecules use atoms)
3. Phase 3 must complete before Phase 4 (sections use molecules)
4. Phases 2-5 must complete before Phase 6 (testing needs all components)

**Can parallelize:**
- Within each phase, tasks can be done in any order
- Organism enhancements (Phase 5) can be done anytime after Phase 2
- Animation file (6.1) can be created early and used throughout

### Testing Strategy

**After each component modification:**
1. Visual check on localhost:1313
2. Verify both Romanian and English versions
3. Test mobile responsiveness
4. Check console for errors

**After each phase:**
1. Run full accessibility audit
2. Run Lighthouse
3. Check build time
4. Verify no regressions

### File Modification Tracking

**Total files to modify: ~38**

Breakdown:
- Design tokens: 5 files (3 new, 2 modify)
- Atoms: 8 files (4 partials + 4 SCSS)
- Molecules: 8 files (4 partials + 4 SCSS)
- Sections: 10 files (5 partials + 5 SCSS)
- Organisms: 4 files (2 partials + 2 SCSS)
- Utilities: 1 file (new)
- Main SCSS: 2 imports added

### Icon Circle Size Migration

**Current → Target:**
- Services: 80px → 84px (lg)
- Approach: 70px → 64px (md)

**Rationale:** Align with design token system (48px, 64px, 84px, 104px)

### Color Variant Rotation Patterns

**Service Cards (4):**
1. Primary (emerald)
2. Secondary (terracotta)
3. Coral
4. Sage

**Testimonials (3):**
1. Primary (emerald)
2. Secondary (terracotta)
3. Coral

**Consistency:** Same rotation pattern maintains visual rhythm across sections
