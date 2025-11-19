# Hugo Animation Enhancements - Approved Plan

**Created:** 2025-11-18
**Status:** In Progress
**Estimated Time:** 12-16 hours
**Files Modified:** 6 files

---

## Executive Summary

Minimal Hugo-native animation enhancements to existing Andromeda theme. **Strategy: ENHANCE existing v4.0 components, don't rebuild.**

**Key Insight:** Theme already has 90% of desired functionality. The refactor plan (`cc-design.md`) proposed rebuilding what exists. This plan adds only the missing 10%.

---

## Analysis Results

### Current State (Already Exists)
- ✅ Glassmorphism system (`_design-enhancements.scss`)
- ✅ 8 gradient types (warm, radial, glass, icon)
- ✅ Parallax scrolling (Rellax + `scroll-animations.js`)
- ✅ Counter animations (`stats-counter.js` with SVG rings)
- ✅ Smooth scroll (native implementation)
- ✅ 10+ animation keyframes
- ✅ AOS (Animate On Scroll) library
- ✅ Hugo plugin system for libraries
- ✅ 5 atoms, 21 molecules, 2 organisms, 34 sections

### Genuinely New (10% to Add)
1. **Magnetic buttons** - GSAP mousemove interactions
2. **Ripple click effects** - Visual feedback on clicks
3. **Word-by-word text reveal** - Advanced text animations
4. **Clip-path image reveals** - Sophisticated image entrances
5. **Alpine.js reactive micro-interactions** - Toggle switches, accordions

### What We're NOT Doing (Avoiding Duplication)
- ❌ Creating parallel animation registry (AOS exists)
- ❌ Rebuilding glassmorphism (already in `_design-enhancements.scss`)
- ❌ Recreating gradient system (8 types defined)
- ❌ Duplicating parallax (Rellax works)
- ❌ Rebuilding counter animations (`stats-counter.js` excellent)
- ❌ Using `static/js/` for source (anti-pattern, use `assets/js/`)
- ❌ Manual CDN script tags (use Hugo plugin system)
- ❌ Adding Lenis (native smooth scroll sufficient)

---

## Implementation Phases

### Phase 1: Add Libraries (Hugo Way) - 2 hours
**Status:** In Progress

**Task:** Modify `themes/andromeda-hugo/hugo.toml`

Add to existing `[[params.plugins.js]]` section:
```toml
[[params.plugins.js]]
link = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
attributes = "defer"

[[params.plugins.js]]
link = "https://cdn.jsdelivr.net/npm/alpinejs@3.13/dist/cdn.min.js"
attributes = "defer"
```

**Why these libraries:**
- GSAP: Magnetic buttons, advanced animations (48KB gzipped)
- Alpine.js: Reactive micro-interactions (15KB gzipped)
- Total: +63KB (vs +68KB in original plan)

**Keep existing:**
- AOS (12KB) - scroll animations work perfectly
- Rellax (2KB) - parallax is lightweight
- Skip Lenis - native smooth scroll sufficient

### Phase 2: Enhance Existing Components - 4 hours
**Status:** Pending

**Task 1:** Enhance `layouts/partials/atoms/button.html`

Add data-animate support (non-breaking change):
```html
{{/* Add optional animation support */}}
{{ $animate := .animate }}
{{ $animateOptions := .animateOptions }}

{{/* In button/link tag attributes */}}
{{- if $animate }}
  data-animate="{{ $animate }}"
  {{- range $key, $value := $animateOptions }}
  data-{{ $key }}="{{ $value }}"
  {{- end }}
{{- end }}
```

**Task 2:** Enhance `layouts/partials/molecules/card.html`

Same pattern as button - add optional data-animate support.

**Usage Example:**
```go-html-template
{{ partial "atoms/button.html" (dict
  "text" "Book Consultation"
  "href" "/contact"
  "variant" "primary"
  "animate" "magnetic-button"
  "animateOptions" (dict "strength" "0.3")
)}}
```

### Phase 3: Add Genuinely New Effects - 6 hours
**Status:** Pending

**Task 1:** Create `assets/js/gsap-enhancements.js` (NEW file)

5 genuinely new effects:
```javascript
/**
 * GSAP Enhancements - Adds 5 new effects to existing animation system
 * Works alongside AOS/Rellax, doesn't replace them
 * Accessibility: Respects prefers-reduced-motion
 */

(function() {
  'use strict';

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Wait for GSAP to load
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, enhancements disabled');
    return;
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initMagneticButtons();
    initRippleEffects();
    initTextReveal();
    initImageReveal();
    initAlpineComponents();
  }

  // 1. Magnetic Buttons (NEW)
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('[data-animate="magnetic-button"]');
    buttons.forEach(button => {
      const strength = parseFloat(button.dataset.strength || '0.3');

      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  // 2. Ripple Click Effects (NEW)
  function initRippleEffects() {
    const elements = document.querySelectorAll('[data-animate="ripple"]');
    elements.forEach(element => {
      element.addEventListener('click', createRipple);
    });
  }

  function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);

    gsap.fromTo(ripple, {
      scale: 0,
      opacity: 0.6
    }, {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove()
    });
  }

  // 3. Text Reveal (Word by Word) (NEW)
  function initTextReveal() {
    const elements = document.querySelectorAll('[data-animate="text-reveal"]');
    elements.forEach(element => {
      const text = element.textContent.trim();
      const words = text.split(' ');

      element.innerHTML = words
        .map(word => `<span class="word-reveal">${word}</span>`)
        .join(' ');

      gsap.from(element.querySelectorAll('.word-reveal'), {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%'
        }
      });
    });
  }

  // 4. Image Reveal (Clip Path) (NEW)
  function initImageReveal() {
    const images = document.querySelectorAll('[data-animate="image-reveal"]');
    images.forEach(img => {
      gsap.from(img, {
        clipPath: 'inset(0% 100% 0% 0%)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: img,
          start: 'top 75%'
        }
      });
    });
  }

  // 5. Alpine.js Component Enhancements (NEW)
  function initAlpineComponents() {
    // Alpine.js will auto-initialize x-data components
    // This function can add GSAP animations to Alpine transitions
    document.addEventListener('alpine:init', () => {
      // Add custom Alpine directives if needed
    });
  }

})();
```

**Task 2:** Extend `assets/scss/_design-enhancements.scss`

Add at end of file (don't create new file):
```scss
/*------------------------------------------------------------------
  # GSAP Enhancement Styles (v4.1)
  # Added: 2025-11-18
-------------------------------------------------------------------*/

/* Magnetic Button Enhancements */
[data-animate="magnetic-button"] {
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: $shadow-hover-lift;
  }
}

/* Ripple Effect Container */
[data-animate="ripple"] {
  position: relative;
  overflow: hidden;
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  pointer-events: none;
}

/* Text Reveal Words */
.word-reveal {
  display: inline-block;
  margin-right: 0.25em;
}

/* Image Reveal Clip Path */
[data-animate="image-reveal"] {
  clip-path: inset(0% 0% 0% 0%);
}

/* Alpine.js Toggle Switch */
.toggle-switch {
  position: relative;
  width: 50px;
  height: 26px;
  background: $gray-300;
  border-radius: 13px;
  transition: background 0.3s;
  cursor: pointer;

  &.active {
    background: $emerald-500;
  }

  .toggle-knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: $shadow-sm;
  }

  &.active .toggle-knob {
    transform: translateX(24px);
  }
}

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    animation: none !important;
    transition: none !important;
  }

  .word-reveal,
  .ripple-effect,
  .toggle-knob {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Phase 4: Integration Testing - 4 hours
**Status:** Pending

**Test Checklist:**
- [ ] GSAP loads from CDN (check browser console)
- [ ] Alpine.js loads and initializes
- [ ] Magnetic buttons work on desktop hover
- [ ] Ripple effects work on click
- [ ] Text reveal triggers on scroll
- [ ] Image reveal works with lazy loading
- [ ] No conflicts with existing AOS/Rellax
- [ ] Accessibility: reduced-motion disables effects
- [ ] Mobile: no magnetic buttons (hover detection)
- [ ] Build succeeds: `cd themes/andromeda-hugo && hugo --gc --minify`
- [ ] Bundle size: Check total JS < 100KB
- [ ] Performance: Lighthouse score >90

**Test Page:**
Create test page at `content/english/test-animations.md`:
```yaml
---
title: "Animation Test Page"
layout: "flexible"
draft: true
sections:
  - type: "hero-breadcrumb"

hero_breadcrumb:
  title: "Animation Test"
  subtitle: "Testing new GSAP enhancements"
  buttons:
    - text: "Magnetic Button"
      url: "#test"
      variant: "primary"
      animate: "magnetic-button"
      animateOptions:
        strength: "0.3"
    - text: "Ripple Button"
      url: "#test"
      variant: "secondary"
      animate: "ripple"
---
```

---

## Files to Modify

### 1. `themes/andromeda-hugo/hugo.toml`
**Change:** Add GSAP and Alpine.js to `[[params.plugins.js]]` section
**Line:** After line 230 (current last plugin)
**Impact:** Adds libraries to all pages

### 2. `layouts/partials/atoms/button.html`
**Change:** Add optional `data-animate` attribute support
**Lines:** 67-80 (modify existing button/link rendering)
**Impact:** Backward compatible - only adds attributes when specified

### 3. `layouts/partials/molecules/card.html`
**Change:** Add optional `data-animate` attribute support
**Impact:** Backward compatible - enables card animations when specified

### 4. `assets/js/gsap-enhancements.js` (NEW)
**Change:** Create new file with 5 effects
**Size:** ~4KB minified
**Impact:** Loaded on all pages (deferred)

### 5. `assets/scss/_design-enhancements.scss` (EXTEND)
**Change:** Append GSAP enhancement styles at end
**Lines:** Add after line 200+ (current end)
**Impact:** Adds ~50 lines of CSS, <2KB gzipped

### 6. Test page (optional, can delete after testing)
**Change:** Create test page to verify effects
**Impact:** Draft only, not published

---

## Hugo Configuration Details

### Current Plugin System
Location: `themes/andromeda-hugo/hugo.toml` lines 210-240

Existing plugins loaded:
- Line Awesome icons (CSS)
- Swiper carousel (CSS/JS)
- AOS animations (CSS/JS)
- Rellax parallax (JS)
- Cookie consent (JS)
- WebFont loader (JS)

Our additions fit naturally into this system.

### Build Commands
```bash
# Development (from theme directory)
cd themes/andromeda-hugo
hugo server --buildDrafts

# Production build
hugo --gc --minify

# Check performance
hugo --templateMetrics
```

---

## Success Metrics

### Time Savings
- **Proposed plan:** 44-54 hours
- **This plan:** 12-16 hours
- **Savings:** 70%

### Code Reduction
- **Proposed plan:** 15+ new files
- **This plan:** 1 new file, 5 modified
- **Reduction:** 80%

### Bundle Size
- **Proposed plan:** +68KB (GSAP + Lenis + Alpine)
- **This plan:** +63KB (GSAP + Alpine, keep AOS/Rellax)
- **Reduction:** 7% smaller

### Duplication
- **Proposed plan:** 90% duplication risk
- **This plan:** Zero duplication
- **Improvement:** Complete avoidance

---

## Risk Mitigation

### What Could Go Wrong
1. **GSAP conflicts with AOS** - Low risk, both use different APIs
2. **Performance impact** - Mitigated by defer loading
3. **Mobile performance** - Magnetic buttons disabled on touch
4. **Bundle size bloat** - Total still <100KB target

### Rollback Strategy
If issues arise:
1. Remove GSAP/Alpine from `hugo.toml`
2. Remove `data-animate` calls from content
3. Revert to AOS-only (already working)
4. Delete `gsap-enhancements.js`

Simple rollback = safe experimentation.

---

## Next Steps After Implementation

### Phase 5: Production Rollout
1. Test on staging environment
2. Roll out to homepage first
3. Monitor performance with Lighthouse
4. Gather user feedback
5. Expand to other pages
6. Document usage patterns

### Phase 6: Content Team Enablement
1. Create usage guide for content editors
2. Add examples to documentation
3. Create reusable page templates
4. Train on when to use each effect type

---

## References

### Documentation
- Theme rules: `themes/andromeda-hugo/CLAUDE.md`
- Original refactor plan: `themes/andromeda-hugo/cc-design.md`
- Theme architecture: `themes/andromeda-hugo/PROJECT.md`

### Key Files
- Existing animations: `assets/js/scroll-animations.js`
- Existing counters: `assets/js/stats-counter.js`
- Design system: `assets/scss/_design-enhancements.scss`
- Plugin config: `themes/andromeda-hugo/hugo.toml`

### External Resources
- GSAP docs: https://greensock.com/docs/
- Alpine.js docs: https://alpinejs.dev/
- Hugo asset pipeline: https://gohugo.io/hugo-pipes/

---

**Last Updated:** 2025-11-18
**Status:** Ready to implement Phase 1
