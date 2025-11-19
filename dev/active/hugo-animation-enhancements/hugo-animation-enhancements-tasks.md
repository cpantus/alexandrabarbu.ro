# Hugo Animation Enhancements - Task Checklist

**Progress:** 0 / 24 tasks complete (0%)
**Last Updated:** 2025-11-18

---

## Phase 1: Add Libraries (2 hours) ⏳ IN PROGRESS

### Setup & Configuration
- [ ] 1.1 Read hugo.toml plugin section (lines 210-240)
- [ ] 1.2 Add GSAP plugin entry to hugo.toml
- [ ] 1.3 Add Alpine.js plugin entry to hugo.toml
- [ ] 1.4 Verify hugo.toml syntax is valid

### Testing
- [ ] 1.5 Test Hugo server starts: `cd themes/andromeda-hugo && hugo server --buildDrafts`
- [ ] 1.6 Verify no build errors in console
- [ ] 1.7 Open browser and check GSAP loaded (console: `typeof gsap`)
- [ ] 1.8 Check Alpine.js loaded (console: `typeof Alpine`)
- [ ] 1.9 Verify no conflicts with existing AOS/Rellax

**Estimated Time:** 2 hours
**Status:** Not started
**Blocker:** None

---

## Phase 2: Enhance Components (4 hours) 📅 PENDING

### Button Enhancement
- [ ] 2.1 Read current `layouts/partials/atoms/button.html` fully
- [ ] 2.2 Add `$animate` parameter extraction
- [ ] 2.3 Add `$animateOptions` parameter extraction
- [ ] 2.4 Add conditional `data-animate` attribute to link tag
- [ ] 2.5 Add conditional `data-*` attributes for options
- [ ] 2.6 Add same to button tag (both link and button paths)
- [ ] 2.7 Test button renders without animation (backward compat)
- [ ] 2.8 Test button renders with data-animate attributes

### Card Enhancement
- [ ] 2.9 Read current `layouts/partials/molecules/card.html` fully
- [ ] 2.10 Apply same pattern as button (animate + options)
- [ ] 2.11 Test card renders without animation
- [ ] 2.12 Test card renders with data-animate attributes

**Estimated Time:** 4 hours
**Status:** Pending
**Depends On:** Phase 1 complete

---

## Phase 3: Add New Effects (6 hours) 📅 PENDING

### JavaScript Implementation
- [ ] 3.1 Create `assets/js/gsap-enhancements.js` file
- [ ] 3.2 Add reduced-motion detection
- [ ] 3.3 Add GSAP check and early return
- [ ] 3.4 Implement `initMagneticButtons()` function
- [ ] 3.5 Implement `initRippleEffects()` function
- [ ] 3.6 Implement `initTextReveal()` function
- [ ] 3.7 Implement `initImageReveal()` function
- [ ] 3.8 Implement `initAlpineComponents()` function
- [ ] 3.9 Add main `init()` function with DOM ready check
- [ ] 3.10 Test each effect individually

### SCSS Extension
- [ ] 3.11 Read current `_design-enhancements.scss` end
- [ ] 3.12 Add comment header for v4.1 additions
- [ ] 3.13 Add magnetic button styles
- [ ] 3.14 Add ripple effect styles
- [ ] 3.15 Add text reveal styles
- [ ] 3.16 Add image reveal styles
- [ ] 3.17 Add Alpine.js toggle switch styles
- [ ] 3.18 Add reduced-motion media query
- [ ] 3.19 Verify SCSS compiles without errors

**Estimated Time:** 6 hours
**Status:** Pending
**Depends On:** Phase 2 complete

---

## Phase 4: Integration Testing (4 hours) 📅 PENDING

### Test Page Creation
- [ ] 4.1 Create `content/english/test-animations.md`
- [ ] 4.2 Add hero with magnetic button
- [ ] 4.3 Add section with ripple button
- [ ] 4.4 Add text reveal heading
- [ ] 4.5 Add image reveal test image

### Browser Testing
- [ ] 4.6 Test in Chrome (desktop)
- [ ] 4.7 Test in Firefox (desktop)
- [ ] 4.8 Test in Safari (desktop)
- [ ] 4.9 Test on mobile Chrome
- [ ] 4.10 Test on mobile Safari
- [ ] 4.11 Verify magnetic buttons disabled on mobile
- [ ] 4.12 Verify ripple works on touch

### Performance Testing
- [ ] 4.13 Run production build: `hugo --gc --minify`
- [ ] 4.14 Check bundle size (target: <100KB)
- [ ] 4.15 Run Lighthouse performance test
- [ ] 4.16 Verify score >90
- [ ] 4.17 Check no console errors
- [ ] 4.18 Test page load speed (<1.5s FCP)

### Accessibility Testing
- [ ] 4.19 Test with `prefers-reduced-motion: reduce`
- [ ] 4.20 Verify all animations disabled
- [ ] 4.21 Test keyboard navigation
- [ ] 4.22 Test with screen reader
- [ ] 4.23 Verify ARIA labels present
- [ ] 4.24 Check color contrast AAA

**Estimated Time:** 4 hours
**Status:** Pending
**Depends On:** Phase 3 complete

---

## Summary

### Total Progress
- **Tasks Complete:** 0 / 24 (0%)
- **Time Spent:** 0 hours
- **Time Remaining:** 16 hours (estimated)
- **Current Phase:** Phase 1 (0% complete)

### Completion Estimates
- **Phase 1:** 2 hours → Expected completion: Session 1
- **Phase 2:** 4 hours → Expected completion: Session 2
- **Phase 3:** 6 hours → Expected completion: Session 2-3
- **Phase 4:** 4 hours → Expected completion: Session 3

### Total Sessions
- **Estimated:** 3-4 sessions at 4-6 hours each
- **Current:** Session 1
- **Remaining:** 2-3 sessions

---

## Quick Status Legend

- ⏳ **IN PROGRESS** - Currently being worked on
- 📅 **PENDING** - Not started, waiting on dependencies
- ✅ **COMPLETE** - Finished and tested
- ⚠️ **BLOCKED** - Cannot proceed (note blocker)
- 🔄 **TESTING** - Implementation done, testing in progress
