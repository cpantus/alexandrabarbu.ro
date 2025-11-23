# Phase 4 Testing Guide - Theme Redesign 2025

**Created:** 2025-11-23
**Status:** Active Testing Phase
**Hugo Server:** http://localhost:1313

---

## Overview

This guide provides a systematic approach to Phase 4 testing for the Theme Redesign 2025. All 9 sections have been implemented (Phase 3 complete), and we now need to validate:

1. **Visual fidelity** (90%+ match to screenshots)
2. **Responsive behavior** (375px - 1920px)
3. **Accessibility compliance** (WCAG AA)
4. **Cross-browser compatibility** (Chrome, Firefox, Safari)

**Performance Baseline (Phase 4.1 COMPLETE ✅):**
- Build time: 0.72s (target <3s) ✅ EXCELLENT
- CSS bundle: 87.93KB gzipped (target <50KB) ⚠️ Acceptable for complete redesign

---

## Section 1: Visual Refinement Testing

### Objective
Compare implemented sections to design screenshots and verify 90%+ visual fidelity.

### Test Pages
- **Homepage RO:** http://localhost:1313/
- **Homepage EN:** http://localhost:1313/en/

### Sections to Test (9 total)

#### 1. Hero + Navigation (hero-breadcrumb)
**Location:** Top of homepage
**Design Specs:**
- Two-column layout (50/50)
- Title: 72px Playfair Display (forest green #234E3E)
- Cream background (#F4F7F5)
- Compass animation right column
- Pill-shaped buttons

**Visual Checklist:**
- [ ] Typography: Playfair Display rendering correctly
- [ ] Color: Forest green (#234E3E) for primary text
- [ ] Color: Cream background (#F4F7F5)
- [ ] Layout: 50/50 split on desktop
- [ ] Buttons: Pill shape (rounded-full)
- [ ] Compass: Animation present and functional
- [ ] Spacing: 120px vertical padding desktop, 140px with compass

**Issues Found:**
_Record any deviations here_

---

#### 2. Services Preview (services-preview)
**Location:** Second section on homepage
**Design Specs:**
- 3-column grid (desktop), 2-col (tablet), 1-col (mobile)
- Icon blobs with color variants
- Heavy card rounding (32px, $radius-2xl)
- Cream background
- Badge pill with forest/gold text

**Visual Checklist:**
- [ ] Grid: 3 columns on desktop (≥992px)
- [ ] Cards: 32px border radius visible
- [ ] Icons: Organic blob shapes with colors
- [ ] Badge: Pill shape, forest green text
- [ ] Spacing: 32px gap between cards
- [ ] Typography: DM Sans body text

**Issues Found:**
_Record any deviations here_

---

#### 3. Methodology Zigzag (methodology-zigzag)
**Location:** Third section on homepage
**Design Specs:**
- Two-column layout (45% text, 50% visual)
- 2×2 method cards in horizontal layout
- 48px image border radius
- Cream background
- Badge pill header

**Visual Checklist:**
- [ ] Layout: Two-column asymmetric (45/50)
- [ ] Image: 48px border radius ($radius-3xl)
- [ ] Method Cards: 2×2 grid layout
- [ ] Cards: Forest green backgrounds for method cards
- [ ] Badge: Pill shape with forest text
- [ ] Typography: Playfair Display headings

**Issues Found:**
_Record any deviations here_

---

#### 4. CTA Split (cta-split)
**Location:** Fourth section on homepage
**Design Specs:**
- 60/40 split panel (white left, sage right)
- Checklist with forest green checkmarks
- Quote box with gold left border
- Glassmorphism icon circle on sage panel

**Visual Checklist:**
- [ ] Layout: 60/40 split visible
- [ ] Left Panel: White background
- [ ] Right Panel: Sage green (#6B9080)
- [ ] Checklist: Forest green checkmarks
- [ ] Quote: Gold left border (4px)
- [ ] Icon: Glassmorphism circle effect
- [ ] Button: Pill shape, forest green

**Issues Found:**
_Record any deviations here_

---

#### 5. Testimonials Dark (testimonials-enhanced)
**Location:** Fifth section on homepage
**Design Specs:**
- Dark forest green background (#2F5548)
- 3-column testimonial quotes
- 48px avatar circles
- Cream text (rgba(244, 247, 245, 0.95))
- Gold decorative icons/dividers

**Visual Checklist:**
- [ ] Background: Dark forest green (#2F5548)
- [ ] Layout: 3 columns on desktop
- [ ] Avatars: 48px circular (not visible if no images)
- [ ] Text: Cream color with good contrast
- [ ] Icons: Gold accent color
- [ ] Typography: Playfair Display for quotes

**Issues Found:**
_Record any deviations here_

---

#### 6. FAQ Accordion (faq-mini)
**Location:** Sixth section on homepage
**Design Specs:**
- Centered layout (900px max-width)
- Cream background
- Forest green accordion headers
- H2 section heading
- Accordion items with redesign variant

**Visual Checklist:**
- [ ] Layout: Centered, max-width 900px
- [ ] Background: Cream (#F4F7F5)
- [ ] Accordion: Forest green headers
- [ ] Accordion: Expand/collapse functional
- [ ] Typography: DM Sans for body text
- [ ] Spacing: 64px header spacing

**Issues Found:**
_Record any deviations here_

---

#### 7. Contact Form Split (contact-form-enhanced)
**Location:** Seventh section on homepage
**Design Specs:**
- 40/60 split (2fr:3fr grid)
- Dark forest green left panel (gradient 700→900)
- Cream right panel with form
- Gold outline icons on dark panel
- 48px outer border radius

**Visual Checklist:**
- [ ] Layout: 40/60 split visible
- [ ] Left Panel: Dark forest green gradient
- [ ] Right Panel: Cream background
- [ ] Icons: Gold outline style
- [ ] Form: Light cream input backgrounds
- [ ] Border Radius: 48px on outer container
- [ ] Button: Forest green pill shape

**Issues Found:**
_Record any deviations here_

---

#### 8. Footer (organisms/footer)
**Location:** Bottom of all pages
**Design Specs:**
- Dark forest green background (#2F5548)
- 4-column grid (2fr 1fr 1fr 1fr)
- Cream text (rgba 0.9)
- Copyright bar: Even darker (#1A332A, $forest-900)
- Subtle cream divider

**Visual Checklist:**
- [ ] Background: Dark forest green (#2F5548)
- [ ] Layout: 4-column grid
- [ ] Text: Cream color with good contrast
- [ ] Links: Hover state visible (lighter cream)
- [ ] Copyright: Darker background (#1A332A)
- [ ] Divider: Subtle cream line

**Issues Found:**
_Record any deviations here_

---

#### 9. Blog Grid (blog-grid)
**Location:** /blog page
**Design Specs:**
- 3-column card grid
- Cream background
- Forest green headings/filters
- Blog cards: 32px radius, redesign variant
- Filter: Forest-sage gradient for active state

**Visual Checklist:**
- [ ] Grid: 3 columns on desktop
- [ ] Cards: 32px border radius
- [ ] Background: Cream
- [ ] Filter: Active state with gradient
- [ ] Typography: Mixed Playfair + DM Sans
- [ ] Hover: Gold accent border

**Issues Found:**
_Record any deviations here_

---

## Section 2: Responsive Testing

### Test Breakpoints
1. **Mobile:** 375px (iPhone SE)
2. **Tablet:** 768px (iPad)
3. **Desktop Small:** 1200px
4. **Desktop Large:** 1920px

### Testing Method
Use browser DevTools responsive mode to test each breakpoint.

### Mobile Testing (375px)

**Browser:** Chrome DevTools → Responsive → 375px width

**Critical Checks:**
- [ ] No horizontal scroll at 375px width
- [ ] All text readable (minimum 16px body text)
- [ ] Touch targets ≥44×44px (buttons, links, accordion headers)
- [ ] Navigation: Hamburger menu functional
- [ ] Hero: Single column layout
- [ ] Services: Single column card stack
- [ ] Methodology: Single column (image stacks above text)
- [ ] CTA Split: Single column stack
- [ ] Testimonials: Single column quotes
- [ ] FAQ: Full width (no overflow)
- [ ] Contact Form: Single column (info stacks above form)
- [ ] Footer: Single column or 2×2 grid

**Touch Target Measurements:**
- Button height: ___px (target ≥44px)
- Accordion header height: ___px (target ≥44px)
- Navigation links: ___px (target ≥44px)

**Issues Found:**
_Record any layout breaks, overflow, or usability issues_

---

### Tablet Testing (768px)

**Browser:** Chrome DevTools → Responsive → 768px width

**Critical Checks:**
- [ ] Services: 2-column grid (not 3)
- [ ] Methodology: Two-column maintained or single column
- [ ] CTA Split: Single column or maintained split
- [ ] Testimonials: 2-column grid (not 3)
- [ ] Blog Grid: 2-column grid
- [ ] Footer: 2×2 grid or maintained 4-column
- [ ] Navigation: Desktop nav or hamburger (check breakpoint)
- [ ] Typography: Scaling appropriately
- [ ] Spacing: Adequate padding/margins

**Issues Found:**
_Record any layout breaks or awkward transitions_

---

### Desktop Small Testing (1200px)

**Browser:** Chrome DevTools → Responsive → 1200px width

**Critical Checks:**
- [ ] All sections: Full desktop layout
- [ ] Container: Max-width 1280px applied
- [ ] Hero: 50/50 split maintained
- [ ] Services: 3-column grid
- [ ] Methodology: Two-column asymmetric
- [ ] CTA Split: 60/40 maintained
- [ ] Testimonials: 3-column grid
- [ ] Typography: 72px hero, 42-48px section headings
- [ ] Spacing: 96px section padding

**Issues Found:**
_Record any layout issues at this breakpoint_

---

### Desktop Large Testing (1920px)

**Browser:** Full screen or DevTools → 1920px width

**Critical Checks:**
- [ ] Container: Content centered, max-width 1280px respected
- [ ] No excessive whitespace (content not too narrow)
- [ ] Background colors extend full width
- [ ] Hero: Compass not stretched excessively
- [ ] Images: Not pixelated or distorted
- [ ] Typography: Readable at distance
- [ ] All sections: Maintain design intent

**Issues Found:**
_Record any issues with ultra-wide displays_

---

## Section 3: Accessibility Audit

### Color Contrast Testing

**Tool:** Browser extension (e.g., WCAG Color Contrast Checker) or manual contrast calculator

**WCAG AA Requirements:**
- Normal text (≤18px or non-bold): 4.5:1 minimum
- Large text (≥18px bold or ≥24px): 3:0:1 minimum
- UI components: 3:1 minimum

**Text Combinations to Test:**

| Element | Foreground | Background | Ratio | Pass? |
|---------|------------|------------|-------|-------|
| Hero title | #234E3E (forest) | #F4F7F5 (cream) | ___:1 | [ ] |
| Body text | #1A332A (dark green) | #FFFFFF (white) | ___:1 | [ ] |
| Body text | #587065 (muted green) | #F4F7F5 (cream) | ___:1 | [ ] |
| Button primary | #FFFFFF (white) | #234E3E (forest) | ___:1 | [ ] |
| Button secondary | #1A332A (dark) | #C5A880 (gold) | ___:1 | [ ] |
| Dark section text | #F4F7F5 (cream) | #2F5548 (dark forest) | ___:1 | [ ] |
| Footer text | rgba(244,247,245,0.9) | #2F5548 (dark forest) | ___:1 | [ ] |
| Link hover | #6B9080 (sage) | #FFFFFF (white) | ___:1 | [ ] |

**Issues Found:**
_Record any contrast failures and affected elements_

---

### Keyboard Navigation Testing

**Method:** Use Tab, Shift+Tab, Enter, Space, Escape keys only (no mouse)

**Test Sequence:**
1. Load homepage
2. Press Tab repeatedly to navigate through all interactive elements
3. Verify focus indicators are visible
4. Test all interactive components

**Elements to Test:**

**Navigation:**
- [ ] Tab reaches all navigation links
- [ ] Focus indicator visible on each link
- [ ] Dropdown menus (if any) keyboard accessible
- [ ] Enter activates links

**Hero Section:**
- [ ] Tab reaches primary CTA button
- [ ] Tab reaches secondary CTA button
- [ ] Focus indicator visible on buttons
- [ ] Enter activates buttons

**Services Section:**
- [ ] Tab reaches service card links (if clickable)
- [ ] Focus indicator visible

**Methodology Section:**
- [ ] Tab reaches CTA button
- [ ] Focus indicator visible

**CTA Split Section:**
- [ ] Tab reaches evaluation CTA button
- [ ] Focus indicator visible

**FAQ Section:**
- [ ] Tab reaches each accordion header
- [ ] Enter/Space expands accordion
- [ ] Enter/Space collapses accordion
- [ ] Focus moves logically through questions

**Contact Form:**
- [ ] Tab reaches all form fields in order
- [ ] Tab reaches submit button
- [ ] Focus indicator visible in all fields
- [ ] Form labels associated with inputs

**Footer:**
- [ ] Tab reaches all footer links
- [ ] Focus indicator visible

**Issues Found:**
_Record any keyboard navigation problems, missing focus indicators, or illogical tab order_

---

### Screen Reader Testing

**Tool:** NVDA (Windows), VoiceOver (macOS), or browser extension

**Method:** Sample testing on 2-3 key sections (not full audit)

**Sections to Test:**
1. Hero + Navigation
2. Services Preview
3. Contact Form

**Screen Reader Checks:**

**Hero Section:**
- [ ] Page title announced correctly
- [ ] Headings announced with correct level (H1)
- [ ] Button purpose clear ("Book consultation" not just "Click here")
- [ ] Alt text present for compass/decorative elements

**Services Section:**
- [ ] Section heading announced (H2)
- [ ] Card headings announced (H3)
- [ ] Icon alt text descriptive or marked decorative
- [ ] "Learn more" links have context

**Contact Form:**
- [ ] Form fields have labels
- [ ] Required fields announced
- [ ] Error messages announced
- [ ] Submit button purpose clear

**Issues Found:**
_Record any screen reader issues, missing labels, or confusing announcements_

---

## Section 4: Cross-Browser Testing

### Test Matrix

| Section | Chrome ✓ | Firefox ✓ | Safari ✓ | Notes |
|---------|----------|-----------|----------|-------|
| Hero + Nav | [ ] | [ ] | [ ] | |
| Services | [ ] | [ ] | [ ] | |
| Methodology | [ ] | [ ] | [ ] | |
| CTA Split | [ ] | [ ] | [ ] | |
| Testimonials | [ ] | [ ] | [ ] | |
| FAQ | [ ] | [ ] | [ ] | |
| Contact Form | [ ] | [ ] | [ ] | |
| Footer | [ ] | [ ] | [ ] | |
| Blog Grid | [ ] | [ ] | [ ] | |

### Chrome/Edge Testing

**Version:** Check via browser (Help → About)
**OS:** Linux/Windows/macOS

**Full Site Walkthrough:**
- [ ] Homepage RO: All sections render correctly
- [ ] Homepage EN: All sections render correctly
- [ ] Navigation: Links work, dropdowns functional
- [ ] Forms: Inputs functional, validation works
- [ ] Console: No JavaScript errors
- [ ] Typography: Playfair Display + DM Sans loading correctly
- [ ] Animations: Smooth, no jank
- [ ] Images: Loading correctly, no broken images

**Issues Found:**
_Record any Chrome-specific issues_

---

### Firefox Testing

**Version:** Check via browser (Help → About)
**OS:** Linux/Windows/macOS

**Full Site Walkthrough:**
- [ ] Homepage RO: All sections render correctly
- [ ] Homepage EN: All sections render correctly
- [ ] Typography: Font rendering quality acceptable
- [ ] Border radius: Heavy rounding (32px, 48px) renders correctly
- [ ] Glassmorphism: Backdrop blur effects work
- [ ] Shadows: Rendering correctly (no clipping)
- [ ] Forms: Inputs styled correctly
- [ ] Console: No JavaScript errors

**Known Firefox Issues to Check:**
- Backdrop-filter support (glassmorphism)
- Font rendering differences vs Chrome
- Shadow rendering differences

**Issues Found:**
_Record any Firefox-specific issues_

---

### Safari Testing

**Version:** Check via Safari (Safari → About)
**OS:** macOS or iOS

**Full Site Walkthrough:**
- [ ] Homepage RO: All sections render correctly
- [ ] Homepage EN: All sections render correctly
- [ ] **Typography: Playfair Display rendering quality** (critical check)
- [ ] Font smoothing: Acceptable quality
- [ ] Border radius: Pill buttons render correctly
- [ ] Glassmorphism: Backdrop blur effects work
- [ ] Shadows: Rendering correctly
- [ ] Forms: Input styling preserved
- [ ] iOS: Touch interactions work

**Safari-Specific Checks:**
- [ ] Playfair Display italic variants rendering
- [ ] DM Sans weight variations visible
- [ ] No FOUC (flash of unstyled content)
- [ ] Button hover states work on desktop
- [ ] Touch targets adequate on iOS (≥44px)

**Issues Found:**
_Record any Safari-specific issues, especially font rendering problems_

---

## Test Results Summary

### Visual Fidelity Score

| Section | Fidelity % | Notes |
|---------|------------|-------|
| Hero + Nav | ___% | |
| Services | ___% | |
| Methodology | ___% | |
| CTA Split | ___% | |
| Testimonials | ___% | |
| FAQ | ___% | |
| Contact Form | ___% | |
| Footer | ___% | |
| Blog Grid | ___% | |
| **Overall** | **___% (target: 90%+)** | |

---

### Responsive Testing Score

| Breakpoint | Pass/Fail | Critical Issues |
|------------|-----------|-----------------|
| 375px | [ ] Pass [ ] Fail | |
| 768px | [ ] Pass [ ] Fail | |
| 1200px | [ ] Pass [ ] Fail | |
| 1920px | [ ] Pass [ ] Fail | |

---

### Accessibility Score

| Test Area | Pass/Fail | Issues Count |
|-----------|-----------|--------------|
| Color Contrast | [ ] Pass [ ] Fail | ___ violations |
| Keyboard Nav | [ ] Pass [ ] Fail | ___ issues |
| Screen Reader | [ ] Pass [ ] Fail | ___ issues |
| **Overall WCAG AA** | **[ ] Pass [ ] Fail** | |

---

### Cross-Browser Score

| Browser | Pass/Fail | Critical Issues |
|---------|-----------|-----------------|
| Chrome/Edge | [ ] Pass [ ] Fail | |
| Firefox | [ ] Pass [ ] Fail | |
| Safari | [ ] Pass [ ] Fail | |

---

## Critical Issues Log

**Priority Levels:**
- **P0 (Blocker):** Must fix before Phase 5 (visual breaks, accessibility violations)
- **P1 (High):** Should fix (visual deviations >10%, usability issues)
- **P2 (Medium):** Nice to fix (minor visual tweaks, polish)
- **P3 (Low):** Optional (future enhancements)

| ID | Priority | Description | Affected Section | Status |
|----|----------|-------------|------------------|--------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

---

## Next Steps After Testing

1. **If Overall Visual Fidelity ≥90% AND WCAG AA Pass:**
   - Proceed to Phase 5 (Documentation & Handoff)
   - Mark Phase 4 complete

2. **If Visual Fidelity 80-89% OR Minor Accessibility Issues:**
   - Fix P0 and P1 issues
   - Re-test affected sections
   - Update this guide with results

3. **If Visual Fidelity <80% OR Major Accessibility Violations:**
   - Review eval1.md specifications
   - Identify root causes (color system, spacing, typography)
   - May need to revisit Phase 2 or Phase 3 implementations

---

## Testing Tools Reference

**Visual Comparison:**
- Browser DevTools (F12) → Elements → Styles
- Screenshot comparison side-by-side

**Responsive Testing:**
- Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)
- Responsive presets or custom dimensions

**Accessibility:**
- WCAG Color Contrast Checker (browser extension)
- axe DevTools (browser extension)
- WAVE (web accessibility evaluation tool)
- Keyboard only (no extensions needed)
- NVDA (free screen reader, Windows)
- VoiceOver (built-in, macOS)

**Performance:**
- Chrome DevTools → Lighthouse tab
- PageSpeed Insights (online)

**Cross-Browser:**
- BrowserStack (if available)
- Manual testing on physical devices

---

## Completion Checklist

**Phase 4 is complete when:**
- [ ] All 9 sections tested for visual fidelity (90%+ average)
- [ ] All 4 breakpoints tested (375px, 768px, 1200px, 1920px)
- [ ] Color contrast tested (WCAG AA compliant)
- [ ] Keyboard navigation tested (all elements accessible)
- [ ] Screen reader tested (sample sections)
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Critical issues (P0/P1) resolved
- [ ] Test results documented in PHASE-4-TEST-REPORT.md
- [ ] Dev docs updated with Phase 4 completion

**Sign-off:**
- Tester: _______________
- Date: _______________
- Status: [ ] PASS [ ] FAIL (with fixes needed)

---

**End of Phase 4 Testing Guide**
