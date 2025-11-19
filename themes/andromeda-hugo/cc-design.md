# Hugo Animation System - Implementation Plan
**Complete World-Class Visual Experience - Zero npm**

---

## Vision

Build a psychology practice website with **24 premium visual effects** + **10 micro-interactions** using a clean component-based architecture with **zero npm burden**.

**Outcome:**
- Apple/Stripe-level polish
- 4 weeks implementation
- $0/month recurring cost
- 63KB total animation bundle
- Works with existing atomic design system

---

## Architecture Overview

### Core Principle: Component-Based Animations

```
themes/andromeda-hugo/
├── assets/scss/
│   ├── main.scss                 # Hugo compiles (no PostCSS!)
│   ├── _animations.scss          # Animation keyframes
│   ├── _effects.scss             # Visual effects (glass, gradients)
│   └── _micro-interactions.scss  # Micro-interaction styles
├── static/js/
│   ├── animations.js             # Animation registry
│   ├── effects.js                # Visual effect controllers
│   └── micro-interactions.js     # Micro-interaction handlers
└── layouts/partials/
    ├── atoms/
    │   ├── button.html           # With data-animate support
    │   └── card.html             # With animation triggers
    ├── molecules/
    │   └── accordion.html        # Animated components
    └── head/
        └── animation-libs.html   # CDN script loading
```

### Technology Stack (Zero npm)

**From CDN:**
- GSAP 3.12.5 (48KB gzipped) - Core, ScrollTrigger, Flip, ScrollTo, TextPlugin
- Lenis 1.0 (5KB gzipped) - Smooth scrolling
- Alpine.js 3.13 (15KB gzipped) - Reactive components

**Built-in:**
- Hugo Extended (native SCSS compilation)
- Hugo Image Processing (WebP, AVIF, responsive)
- Pure CSS animations (no dependencies)

**Total bundle:** 68KB (gzipped)

---

## Component-Based Animation Registry

### 1. Animation Registry Pattern

**Goal:** Auto-discover and initialize animations using `data-*` attributes.

**File:** `static/js/animations.js`

```javascript
// Animation registry
const animations = new Map();

// Register animation types
export function register(name, animationFn) {
  animations.set(name, animationFn);
}

// Auto-discover and initialize
export function init() {
  document.querySelectorAll('[data-animate]').forEach(el => {
    const animationType = el.dataset.animate;
    const animation = animations.get(animationType);

    if (animation) {
      animation(el, el.dataset);
    }
  });
}

// Export GSAP for use in other modules
export { gsap, ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';
```

### 2. Hugo Component Integration

**Button with animations:**

```go-html-template
{{/* layouts/partials/atoms/button.html */}}
{{- $text := .text -}}
{{- $href := .href -}}
{{- $variant := .variant | default "primary" -}}
{{- $animate := .animate | default "" -}}

<a
  href="{{ $href | relURL }}"
  class="btn btn-{{ $variant }}"
  {{- if $animate }}
  data-animate="{{ $animate }}"
  {{- range $key, $value := .animateOptions }}
  data-{{ $key }}="{{ $value }}"
  {{- end }}
  {{- end }}
>
  {{ $text }}
</a>
```

**Usage in sections:**

```go-html-template
{{ partial "atoms/button.html" (dict
  "text" "Book Free Consultation"
  "href" "/contact"
  "variant" "primary"
  "animate" "magnetic-button"
  "animateOptions" (dict "strength" "0.3")
)}}
```

### 3. Data-Driven Animation Options

**Example:** Card reveal with stagger

```go-html-template
{{- range $index, $item := .items }}
{{ partial "molecules/card.html" (dict
  "title" $item.title
  "description" $item.description
  "animate" "card-reveal"
  "animateOptions" (dict
    "delay" (mul $index 0.1)
    "from" "bottom"
  )
)}}
{{- end }}
```

---

## 24 Visual Effects - Implementation

### Phase 1: Foundation Effects (Week 1)

**1. Glassmorphism**
```scss
// assets/scss/_effects.scss
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

**2. Animated Gradient Backgrounds**
```scss
.gradient-animated {
  background: linear-gradient(
    -45deg,
    #4DB380, // Emerald
    #CC6B49, // Terracotta
    #9b87f5, // Lavender
    #FF88B7  // Pink
  );
  background-size: 400% 400%;
  animation: gradient-flow 15s ease infinite;
}

@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**3. Smooth Scrolling (Lenis)**
```javascript
// static/js/effects.js
import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0/+esm';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: 0.1
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

**4. Card Hover Effects (3D Lift)**
```javascript
// static/js/animations.js
register('card-hover', (card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -10,
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  });
});
```

**5. Scroll Progress Indicator**
```javascript
register('scroll-progress', () => {
  gsap.to('.progress-bar', {
    scaleX: () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      return scrolled / height;
    },
    ease: 'none',
    scrollTrigger: {
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
});
```

### Phase 2: Text & Image Effects (Week 2)

**6. Text Reveal (Word by Word)**
```javascript
register('text-reveal', (element) => {
  const text = element.textContent.trim();
  const words = text.split(' ');

  element.innerHTML = words
    .map(word => `<span class="word">${word}</span>`)
    .join(' ');

  gsap.from(element.querySelectorAll('.word'), {
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
```

**7. Image Reveal (Clip Path)**
```javascript
register('image-reveal', (img) => {
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
```

**8. Parallax Scrolling**
```javascript
register('parallax', (element, { speed = 0.5 }) => {
  gsap.to(element, {
    y: () => window.innerHeight * parseFloat(speed),
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});
```

### Phase 3: Interactive Elements (Week 3)

**9. Magnetic Buttons**
```javascript
register('magnetic-button', (button, { strength = 0.3 }) => {
  const str = parseFloat(strength);

  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * str,
      y: y * str,
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
```

**10. Counter Animations**
```javascript
register('counter', (element, { end, duration = 2 }) => {
  const target = parseFloat(end);

  gsap.from({ value: 0 }, {
    value: target,
    duration: parseFloat(duration),
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%'
    },
    onUpdate: function() {
      element.textContent = Math.round(this.targets()[0].value);
    }
  });
});
```

**11-24: Additional Effects**

See implementation in `eyecandy.md` for complete code:
- Bento grid layouts (CSS Grid)
- Morphing gradient borders (CSS animation)
- Glassmorphic navigation (backdrop-filter)
- Neumorphism (box-shadow technique)
- Shimmer loading (CSS keyframes)
- Stagger animations (GSAP stagger)
- Modal animations (GSAP timeline)
- Pulse animations (CSS keyframes)
- Hover glow effects (box-shadow)
- Skeleton screens (CSS + shimmer)
- Micro-interactions (click feedback)
- Form field focus (CSS transitions)
- Toast notifications (GSAP + Alpine.js)
- Infinite scroll (GSAP seamless loop)

---

## 10 Micro-Interactions - Implementation

### Phase 4: Micro-Interactions (Week 4)

**All 10 micro-interactions with complete code:**

1. **Ripple Effect on Click** - Material Design-style (Alpine.js + CSS)
2. **Success Checkmark Animation** - SVG stroke animation (GSAP)
3. **Input Label Float** - Pure CSS floating labels
4. **Copy to Clipboard** - Instant feedback (Alpine.js)
5. **Accordion Smooth Open/Close** - Alpine.js transitions
6. **Image Lazy Load with Blur-Up** - Hugo + GSAP + Intersection Observer
7. **Star Rating Hover** - Bouncy star fill (GSAP)
8. **Toggle Switch** - iOS-style with squish (Alpine.js + GSAP)
9. **Pull-to-Refresh** - Touch events + GSAP
10. **Drawer Slide-In Navigation** - Alpine.js + GSAP stagger

*See complete code examples in `eyecandy.md` lines 1390-2656*

---

## Hugo Template Integration

### 1. Load CDN Libraries

**File:** `layouts/partials/head/animation-libs.html`

```html
<!-- GSAP from CDN -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Flip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js"></script>

<!-- Lenis smooth scroll -->
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0/dist/lenis.min.js"></script>

<!-- Alpine.js -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13/dist/cdn.min.js"></script>

{{ if hugo.IsProduction }}
<!-- Production: minified -->
{{ $animations := resources.Get "js/animations.js" | minify | fingerprint }}
<script src="{{ $animations.RelPermalink }}"></script>
{{ else }}
<!-- Development: readable -->
<script src="{{ (resources.Get "js/animations.js").RelPermalink }}"></script>
{{ end }}
```

### 2. SCSS Compilation (Hugo Native)

**File:** `layouts/partials/head/styles.html`

```go-html-template
{{ $scss := resources.Get "scss/main.scss" }}
{{ $options := dict "targetPath" "css/style.css" }}

{{ if hugo.IsProduction }}
  {{ $options = merge $options (dict "outputStyle" "compressed") }}
{{ end }}

{{ $style := $scss | resources.ToCSS $options }}

{{ if hugo.IsProduction }}
  {{ $style = $style | fingerprint }}
{{ end }}

<link rel="stylesheet" href="{{ $style.RelPermalink }}">
```

### 3. Component Usage Examples

**Hero section with all effects:**

```go-html-template
<section class="hero glass" data-animate="parallax" data-speed="0.3">
  <div class="gradient-animated"></div>

  <div class="container">
    <h1 data-animate="text-reveal">
      Evidence-Based Therapy for Lasting Change
    </h1>

    {{ partial "atoms/button.html" (dict
      "text" "Book Free Consultation"
      "href" "/contact"
      "variant" "primary"
      "animate" "magnetic-button"
      "animateOptions" (dict "strength" "0.3")
    )}}
  </div>
</section>
```

**Services grid with stagger:**

```go-html-template
<section class="services">
  <div class="container">
    <div class="bento-grid">
      {{- range $index, $service := .Params.services }}
      {{ partial "molecules/card.html" (dict
        "title" $service.title
        "description" $service.description
        "icon" $service.icon
        "animate" "card-reveal"
        "animateOptions" (dict
          "delay" (mul $index 0.1)
          "from" "bottom"
        )
      )}}
      {{- end }}
    </div>
  </div>
</section>
```

**Stats section with counters:**

```go-html-template
<section class="stats">
  <div class="stat">
    <span
      class="stat-number"
      data-animate="counter"
      data-end="500"
      data-duration="2"
    >0</span>
    <span class="stat-label">Clients Helped</span>
  </div>

  <div class="stat">
    <span
      class="stat-number"
      data-animate="counter"
      data-end="15"
      data-duration="2"
    >0</span>
    <span class="stat-label">Years Experience</span>
  </div>

  <div class="stat">
    <span
      class="stat-number"
      data-animate="counter"
      data-end="95"
      data-duration="2"
    >0</span>
    <span class="stat-label">Success Rate %</span>
  </div>
</section>
```

---

## Implementation Timeline

### Week 1: Foundation (10-12 hours)

**Day 1-2: Setup**
- [ ] Create file structure (`assets/scss/`, `static/js/`)
- [ ] Add CDN script loading partial
- [ ] Create animation registry system
- [ ] Test with 1 simple animation (button hover)

**Day 3-4: Core Effects**
- [ ] Glassmorphism styles
- [ ] Gradient animations
- [ ] Smooth scrolling (Lenis)
- [ ] Card hover effects
- [ ] Scroll progress indicator

**Day 5-7: Testing & Polish**
- [ ] Mobile optimization
- [ ] Browser testing
- [ ] Performance check (Lighthouse)

**Deliverable:** 5 effects working, zero npm

---

### Week 2: Text & Images (10-12 hours)

**Day 8-10: Text Effects**
- [ ] Text reveal (word by word)
- [ ] Stagger animations for lists
- [ ] Heading animations

**Day 11-14: Image Effects**
- [ ] Image reveal (clip-path)
- [ ] Parallax scrolling
- [ ] Lazy load with blur-up
- [ ] Image galleries

**Deliverable:** 10 effects total, text & images working

---

### Week 3: Interactive Elements (12-15 hours)

**Day 15-17: Button & Navigation**
- [ ] Magnetic buttons
- [ ] Navigation animations
- [ ] Drawer slide-in (mobile)
- [ ] Glassmorphic nav bar

**Day 18-21: Advanced Interactions**
- [ ] Modal animations
- [ ] Accordion animations
- [ ] Counter animations
- [ ] Toast notifications
- [ ] Form field focus effects

**Deliverable:** 18 effects total, all interactive elements

---

### Week 4: Micro-Interactions & Polish (12-15 hours)

**Day 22-25: Micro-Interactions**
- [ ] Ripple effect
- [ ] Success checkmark
- [ ] Floating labels
- [ ] Copy to clipboard
- [ ] Star rating
- [ ] Toggle switch
- [ ] Pull-to-refresh
- [ ] All 10 micro-interactions

**Day 26-28: Final Polish**
- [ ] Bento grid layouts
- [ ] Morphing borders
- [ ] Neumorphism
- [ ] Shimmer loading
- [ ] Skeleton screens
- [ ] Pulse animations

**Deliverable:** All 24 effects + 10 micro-interactions working

---

## Quality Checklist

### Performance

- [ ] Total bundle <100KB (gzipped)
- [ ] 60fps on all animations
- [ ] Lighthouse score >90
- [ ] Mobile-optimized (no hover effects on touch)
- [ ] Lazy loading for images
- [ ] CDN caching configured

### Browser Support

- [ ] Chrome/Edge 90+ (100% features)
- [ ] Firefox 88+ (100% features)
- [ ] Safari 14+ (100% features)
- [ ] Graceful degradation for older browsers

### Accessibility

- [ ] Reduced motion support (`prefers-reduced-motion`)
- [ ] Keyboard navigation works
- [ ] ARIA labels on interactive elements
- [ ] Focus indicators visible
- [ ] Color contrast AAA compliant

### Mobile Experience

- [ ] Touch-optimized interactions
- [ ] No hover effects on mobile
- [ ] Drawer navigation on small screens
- [ ] Pull-to-refresh works
- [ ] Performance on mid-range phones

---

## Development Workflow

### Build Command (Zero npm!)

```bash
# Development
hugo server --buildDrafts

# Production
hugo --gc --minify
```

**That's it. No `npm install`. No `npm run build`. Just Hugo.**

### Adding New Animation

1. **Create animation function:**
```javascript
// static/js/animations.js
register('my-animation', (element, options) => {
  gsap.from(element, {
    // Your animation here
  });
});
```

2. **Use in Hugo template:**
```html
<div data-animate="my-animation" data-option="value">
  Content
</div>
```

3. **Save and refresh.** Hugo auto-reloads.

### Adding New Micro-Interaction

1. **Add styles:**
```scss
// assets/scss/_micro-interactions.scss
.my-interaction {
  // Your styles
}
```

2. **Add Alpine.js component:**
```javascript
// static/js/micro-interactions.js
Alpine.data('myInteraction', () => ({
  // Your component
}));
```

3. **Use in template:**
```html
<div x-data="myInteraction">
  <!-- Your component -->
</div>
```

---

## File Structure (Complete)

```
themes/andromeda-hugo/
├── assets/
│   └── scss/
│       ├── main.scss                 # Imports all partials
│       ├── _animations.scss          # Animation keyframes
│       ├── _effects.scss             # Visual effects
│       └── _micro-interactions.scss  # Micro-interaction styles
├── static/
│   └── js/
│       ├── animations.js             # Animation registry (12KB)
│       ├── effects.js                # Visual effects (8KB)
│       └── micro-interactions.js     # Micro-interactions (10KB)
└── layouts/
    ├── partials/
    │   ├── head/
    │   │   ├── animation-libs.html   # CDN script loading
    │   │   └── styles.html           # SCSS compilation
    │   ├── atoms/
    │   │   ├── button.html           # Animated button
    │   │   ├── card.html             # Animated card
    │   │   └── heading.html          # Animated heading
    │   └── molecules/
    │       ├── accordion.html        # Accordion component
    │       └── modal.html            # Modal component
    └── _default/
        └── baseof.html               # Base template
```

**Total custom code:** ~30KB (before minification)

---

## Migration from Existing System

### Current State
- Bootstrap 5 framework
- AOS (Animate On Scroll)
- jQuery animations
- 5 atoms, 14 molecules, 2 organisms

### Migration Strategy

**Phase 1: Parallel Run**
- Add new animation system alongside existing
- Test on new pages first
- Keep Bootstrap for layout (no conflict)

**Phase 2: Gradual Replacement**
- Replace AOS with GSAP ScrollTrigger
- Replace jQuery animations with GSAP
- Keep Bootstrap classes (works with GSAP)

**Phase 3: Cleanup**
- Remove AOS library
- Remove jQuery (if only used for animations)
- Keep Bootstrap 5 (or migrate to UnoCSS later)

**No breaking changes. Incremental enhancement.**

---

## Cost Summary

### Recurring Costs

**Total: $0/month**

- GSAP (free version): $0
- Lenis: $0 (open source)
- Alpine.js: $0 (open source)
- Hugo: $0 (open source)
- Hosting (Cloudflare Pages): $0
- CDN (jsDelivr): $0
- Analytics (Cloudflare Web Analytics): $0

### One-Time Costs

- Development time: 44-54 hours (4 weeks part-time)
- Testing time: Included
- Documentation: Included

**No paid subscriptions. No npm packages. Zero monthly burden.**

---

## Success Metrics

### Technical Metrics

- **Bundle size:** <100KB total (target: 68KB)
- **First Contentful Paint:** <1.5s
- **Lighthouse Performance:** >90
- **Animation frame rate:** 60fps
- **Mobile performance:** Smooth on mid-range phones

### Business Metrics

- **Bounce rate:** Decrease by 20-30%
- **Session duration:** Increase by 40-60%
- **Booking conversion:** Increase by 25-40%
- **Trust perception:** Measurable increase (surveys)
- **Mobile engagement:** Increase by 30-50%

### User Experience Metrics

- **Perceived speed:** Feels instant
- **Premium perception:** "Looks expensive"
- **Memorability:** "Best therapy site I've seen"
- **Engagement:** Users explore more pages
- **Conversion:** More appointment bookings

---

## Next Steps

### Option 1: Start Immediately

```bash
# Create file structure
mkdir -p themes/andromeda-hugo/assets/scss
mkdir -p themes/andromeda-hugo/static/js

# Create starter files
touch themes/andromeda-hugo/assets/scss/_animations.scss
touch themes/andromeda-hugo/static/js/animations.js

# Add CDN libraries to head
# Implement first 5 effects (Week 1)
```

### Option 2: Prototype First

- Pick 3 favorite effects
- Implement on single test page
- Show to stakeholders
- Get buy-in
- Then full implementation

### Option 3: Phased Rollout

- **Phase 1:** Homepage only (Week 1-2)
- **Phase 2:** Services page (Week 3)
- **Phase 3:** Contact/forms (Week 4)
- **Phase 4:** All remaining pages

---

## Resources

### Learning Materials

**GSAP:**
- Docs: https://greensock.com/docs/
- Free course: https://creativecodingclub.com/courses/gsap-3-express
- ScrollTrigger demos: https://greensock.com/st-demos/

**Alpine.js:**
- Docs: https://alpinejs.dev/start-here
- Examples: https://alpinejs.dev/components

**Hugo:**
- Image processing: https://gohugo.io/content-management/image-processing/
- Asset pipeline: https://gohugo.io/hugo-pipes/

### Code References

- Complete visual showcase: `eyecandy.md`
- Architectural patterns: `brainstorm.md`
- This implementation plan: `implementation-plan.md`

---

## Summary

**What you get:**
- 24 world-class visual effects
- 10 premium micro-interactions
- Clean component-based architecture
- Zero npm packages
- 4-week implementation
- $0/month recurring cost

**How it works:**
- GSAP + Lenis + Alpine.js from CDN
- Hugo native SCSS compilation
- Data-driven animation system
- Auto-discovery via `data-animate` attributes
- Works with existing Bootstrap + atomic design

**Why this approach:**
- Maximum visual impact
- Zero build complexity
- Easy to maintain
- Fast to implement
- Professional results

**Ready to build a psychology website that looks like it cost $50,000 but runs on $0/month?**

