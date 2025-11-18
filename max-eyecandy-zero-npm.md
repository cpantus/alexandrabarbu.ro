# Maximum Eye Candy, Zero npm Burden

**Date**: 2025-11-18
**Goal**: World-class visuals without build tools
**Philosophy**: Use CDN + Hugo native features only

---

## The Problem with npm

❌ **npm install** - Dependency hell
❌ **package.json** - 50+ dependencies
❌ **node_modules** - 200MB of bloat
❌ **Build failures** - PostCSS, webpack, esbuild errors
❌ **Security warnings** - npm audit every week
❌ **Version conflicts** - Node 18 vs 20

**You don't need ANY of this for eye candy.**

---

## The Zero-npm Stack

### ✅ What We'll Use

**1. Hugo's Built-in SCSS/Sass Compiler**
- No npm needed
- Fast, reliable
- Part of Hugo Extended

**2. GSAP from CDN**
- Just `<script src="...">` tag
- No build step
- Always latest version

**3. UnoCSS Runtime (CDN)**
- Tailwind-like utilities
- Runs in browser
- No build step, no PostCSS

**4. Alpine.js (CDN)**
- Lightweight reactivity
- Like Vue, but 15KB
- No build needed

**5. Google Fonts (CDN)**
- Professional typography
- Free, fast CDN
- No downloads

**6. Everything else: Pure CSS + HTML**
- Modern CSS is incredibly powerful
- Container queries, scroll-driven animations
- View transitions API

---

## Architecture

```
alexandrabarbu.ro/
├── themes/andromeda-hugo/
│   ├── assets/
│   │   └── scss/
│   │       ├── main.scss           # Hugo compiles this
│   │       ├── _animations.scss    # Pure CSS animations
│   │       ├── _effects.scss       # Glassmorphism, gradients
│   │       └── _utilities.scss     # Custom utilities
│   ├── layouts/
│   │   └── partials/
│   │       └── head.html           # CDN scripts here
│   └── static/
│       └── js/
│           ├── animations.js       # GSAP from CDN
│           └── interactions.js     # Alpine.js components
└── hugo.toml                        # No build config needed!
```

**Total build tools: ZERO**
**Total dependencies: ZERO**
**Total npm commands: ZERO**

---

## Part 1: Hugo Native SCSS (No npm)

### Setup

Hugo Extended has built-in Sass/SCSS compiler. No installation needed.

```go-html-template
{{/* layouts/partials/head.html */}}

{{/* Compile SCSS with Hugo (no npm!) */}}
{{ $scss := resources.Get "scss/main.scss" }}
{{ $options := (dict "targetPath" "css/main.css" "outputStyle" "compressed") }}
{{ $style := $scss | resources.ToCSS $options }}
{{ if hugo.IsProduction }}
  {{ $style = $style | fingerprint }}
{{ end }}

<link rel="stylesheet" href="{{ $style.RelPermalink }}">
```

### Modern CSS (No Tailwind Needed!)

```scss
// assets/scss/main.scss

// CSS Custom Properties (Design Tokens)
:root {
  // Colors (OKLCH - better than HSL)
  --color-primary: oklch(65% 0.2 160);      // Emerald
  --color-secondary: oklch(60% 0.15 40);    // Terracotta
  --color-bg: oklch(99% 0 0);               // White
  --color-text: oklch(20% 0 0);             // Dark gray

  // Spacing (Fluid with clamp)
  --space-xs: clamp(0.5rem, 1vw, 0.75rem);
  --space-sm: clamp(0.75rem, 2vw, 1rem);
  --space-md: clamp(1rem, 3vw, 1.5rem);
  --space-lg: clamp(1.5rem, 4vw, 2.5rem);
  --space-xl: clamp(2rem, 6vw, 4rem);

  // Typography (Fluid)
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.3vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --font-size-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);
  --font-size-xl: clamp(1.75rem, 1.5rem + 1.25vw, 2.5rem);
  --font-size-2xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);

  // Shadows (Modern, subtle)
  --shadow-sm: 0 1px 3px oklch(0% 0 0 / 0.12);
  --shadow-md: 0 4px 6px oklch(0% 0 0 / 0.1);
  --shadow-lg: 0 10px 15px oklch(0% 0 0 / 0.1);
  --shadow-xl: 0 20px 25px oklch(0% 0 0 / 0.1);

  // Border radius
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;
}

// Dark mode (automatic)
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: oklch(15% 0 0);
    --color-text: oklch(95% 0 0);
    --color-primary: oklch(75% 0.2 160);
  }
}

// Import modules
@import 'animations';
@import 'effects';
@import 'utilities';
@import 'components';
```

### Pure CSS Animations

```scss
// assets/scss/_animations.scss

// Fade in on scroll (no JavaScript!)
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Scroll-driven animations (Chrome 115+, progressive enhancement)
@supports (animation-timeline: view()) {
  .animate-on-scroll {
    animation: fade-in linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}

// Fallback for older browsers
@supports not (animation-timeline: view()) {
  .animate-on-scroll {
    animation: fade-in 0.6s ease-out;
  }
}

// Gradient animation
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-animate {
  background: linear-gradient(
    -45deg,
    var(--color-primary),
    var(--color-secondary),
    oklch(70% 0.15 280),
    oklch(75% 0.18 200)
  );
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

// Shimmer effect
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    oklch(100% 0 0 / 0.3),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

// Rotate (for loading spinners)
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.rotate {
  animation: rotate 1s linear infinite;
}

// Scale pulse
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

// Bounce
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce {
  animation: bounce 1s ease-in-out infinite;
}
```

### Glassmorphism & Modern Effects

```scss
// assets/scss/_effects.scss

// Glassmorphism
.glass {
  background: oklch(100% 0 0 / 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid oklch(100% 0 0 / 0.2);
  box-shadow:
    0 8px 32px oklch(0% 0 0 / 0.1),
    inset 0 1px 0 oklch(100% 0 0 / 0.5);
}

// Fallback for browsers without backdrop-filter
@supports not (backdrop-filter: blur(20px)) {
  .glass {
    background: oklch(100% 0 0 / 0.95);
  }
}

// Gradient mesh background
.gradient-mesh {
  background:
    radial-gradient(at 0% 0%, var(--color-primary) 0px, transparent 50%),
    radial-gradient(at 100% 0%, var(--color-secondary) 0px, transparent 50%),
    radial-gradient(at 100% 100%, oklch(70% 0.15 280) 0px, transparent 50%),
    radial-gradient(at 0% 100%, oklch(75% 0.18 200) 0px, transparent 50%);
}

// Bento grid layout
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);

  // Featured items span 2 columns
  .featured {
    grid-column: span 2;
    grid-row: span 2;
  }
}

// Elevated cards with depth
.card-elevated {
  position: relative;
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      oklch(100% 0 0 / 0.1),
      oklch(0% 0 0 / 0.05)
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);

    &::before {
      opacity: 1;
    }
  }
}

// Text gradient
.text-gradient {
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-secondary)
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

// Neon glow
.neon-glow {
  color: var(--color-primary);
  text-shadow:
    0 0 10px currentColor,
    0 0 20px currentColor,
    0 0 40px currentColor;
}

// Morphing border
.morphing-border {
  position: relative;
  border-radius: var(--radius-lg);

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(
      45deg,
      var(--color-primary),
      var(--color-secondary),
      oklch(70% 0.15 280),
      oklch(75% 0.18 200)
    );
    background-size: 400% 400%;
    animation: gradient-shift 3s ease infinite;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
}

// Neumorphism (soft 3D effect)
.neumorphic {
  background: var(--color-bg);
  box-shadow:
    8px 8px 16px oklch(0% 0 0 / 0.1),
    -8px -8px 16px oklch(100% 0 0 / 0.7);
  border-radius: var(--radius-xl);

  &:active {
    box-shadow:
      inset 4px 4px 8px oklch(0% 0 0 / 0.1),
      inset -4px -4px 8px oklch(100% 0 0 / 0.7);
  }
}
```

---

## Part 2: GSAP from CDN (No npm)

### Simple CDN Include

```go-html-template
{{/* layouts/partials/head.html */}}

<!-- GSAP from CDN (NO npm needed!) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Flip.min.js"></script>

<!-- Lenis smooth scroll (optional) -->
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.0/bundled/lenis.min.js"></script>
```

### Pure JavaScript Animations (No Build)

```javascript
// static/js/animations.js

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, Flip);

// Smooth scroll (optional)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// Hero animation
gsap.from('.hero h1', {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'power4.out',
  delay: 0.2,
});

gsap.from('.hero p', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  delay: 0.5,
});

gsap.from('.hero .btn', {
  y: 30,
  opacity: 0,
  duration: 0.6,
  delay: 0.8,
});

// Cards animate on scroll
gsap.utils.toArray('.card').forEach((card, i) => {
  gsap.from(card, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1,
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    }
  });
});

// Parallax backgrounds
gsap.utils.toArray('.parallax-bg').forEach(bg => {
  gsap.to(bg, {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: bg,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    }
  });
});

// Pin sections
ScrollTrigger.create({
  trigger: '.pinned-section',
  start: 'top top',
  end: '+=500',
  pin: true,
  pinSpacing: true,
});

// Horizontal scroll
const sections = gsap.utils.toArray('.horizontal-panel');
if (sections.length > 0) {
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-container',
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => '+=' + document.querySelector('.horizontal-container').offsetWidth
    }
  });
}

// Magnetic buttons
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  });
});

// Text reveal (simple word split)
document.querySelectorAll('.text-reveal').forEach(element => {
  const text = element.textContent;
  const words = text.split(' ');

  element.innerHTML = words
    .map(word => `<span class="word">${word}</span>`)
    .join(' ');

  gsap.from(element.querySelectorAll('.word'), {
    y: 50,
    opacity: 0,
    stagger: 0.05,
    duration: 0.6,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
    }
  });
});

// Counter animation
document.querySelectorAll('[data-counter]').forEach(counter => {
  const target = parseFloat(counter.dataset.counter);

  gsap.to({ val: 0 }, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: counter,
      start: 'top 80%',
    },
    onUpdate: function() {
      counter.textContent = Math.ceil(this.targets()[0].val);
    }
  });
});

// Image reveal
gsap.utils.toArray('.img-reveal').forEach(img => {
  gsap.from(img, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: img,
      start: 'top 80%',
    }
  });
});
```

**That's it! No build step needed.**

---

## Part 3: UnoCSS Runtime (No npm)

### CDN Include

```go-html-template
{{/* layouts/partials/head.html */}}

<!-- UnoCSS Runtime - Tailwind utilities without build! -->
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime@0.58.0"></script>

<script>
  // Configure UnoCSS
  window.__unocss = {
    theme: {
      colors: {
        primary: {
          50: '#f0fdf4',
          500: '#4DB380',
          600: '#16a34a',
          700: '#15803d',
        },
        secondary: {
          50: '#fff7ed',
          500: '#CC6B49',
          600: '#ea580c',
        },
      },
    },
    presets: [
      () => window.__unocss_runtime.presetWind(),
      () => window.__unocss_runtime.presetAttributify(),
    ],
  }
</script>
```

### Use Like Tailwind (No Build!)

```html
<!-- Traditional utility classes -->
<button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
  Click Me
</button>

<!-- OR Attributify mode (cleaner for Hugo) -->
<button
  bg="primary-500 hover:primary-600"
  text="white"
  p="x-4 y-2"
  rounded="lg"
>
  Click Me
</button>
```

**Zero build. Zero npm. Full utility power.**

---

## Part 4: Alpine.js for Interactivity (No npm)

### CDN Include

```html
<!-- Alpine.js - Like Vue, but 15KB and no build -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Examples

```html
<!-- Modal -->
<div x-data="{ open: false }">
  <button @click="open = true">Open Modal</button>

  <div
    x-show="open"
    x-transition
    class="modal"
  >
    <div class="modal-content">
      <h2>Modal Title</h2>
      <button @click="open = false">Close</button>
    </div>
  </div>
</div>

<!-- Tabs -->
<div x-data="{ tab: 'home' }">
  <nav>
    <button @click="tab = 'home'" :class="{ active: tab === 'home' }">Home</button>
    <button @click="tab = 'profile'" :class="{ active: tab === 'profile' }">Profile</button>
  </nav>

  <div x-show="tab === 'home'" x-transition>Home content</div>
  <div x-show="tab === 'profile'" x-transition>Profile content</div>
</div>

<!-- Dropdown -->
<div x-data="{ open: false }" @click.away="open = false">
  <button @click="open = !open">
    Menu
  </button>

  <div x-show="open" x-transition>
    <a href="#">Item 1</a>
    <a href="#">Item 2</a>
  </div>
</div>

<!-- Counter -->
<div x-data="{ count: 0 }">
  <button @click="count++">Increment</button>
  <span x-text="count"></span>
</div>

<!-- Form validation -->
<div x-data="{ email: '', valid: false }">
  <input
    type="email"
    x-model="email"
    @input="valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)"
  >
  <span x-show="!valid && email.length > 0">Invalid email</span>
  <button :disabled="!valid">Submit</button>
</div>
```

**No build. Reactive like Vue.**

---

## Part 5: Modern CSS Features (No JavaScript)

### View Transitions API

```html
<meta name="view-transition" content="same-origin">
```

```css
/* Smooth page transitions (Chrome 111+) */
@view-transition {
  navigation: auto;
}

/* Customize transition */
::view-transition-old(root) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}
```

### Container Queries (No Media Queries!)

```css
/* Card adapts to container, not viewport */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

@container (min-width: 600px) {
  .card {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

### Scroll-Driven Animations (No JS!)

```css
/* Fade in on scroll - pure CSS */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.card {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
```

### CSS Nesting (No Sass needed!)

```css
/* Native CSS nesting (Chrome 112+) */
.card {
  padding: 1rem;
  border-radius: 0.5rem;

  &:hover {
    transform: translateY(-4px);
  }

  & h3 {
    color: var(--color-primary);
  }

  & .badge {
    background: var(--color-secondary);
  }
}
```

---

## Complete Eye Candy Components (No npm!)

### 1. Glassmorphic Hero

```html
<section class="hero" style="background: url(hero-bg.jpg) center/cover;">
  <div class="glass" style="padding: 4rem;">
    <h1 class="text-gradient animate-on-scroll">
      Professional Psychology Services
    </h1>
    <p class="animate-on-scroll" style="animation-delay: 0.2s;">
      Evidence-based therapy for lasting change
    </p>
    <button class="btn-magnetic">Book Free Consultation</button>
  </div>
</section>
```

### 2. Bento Grid Services

```html
<div class="bento-grid">
  <div class="card-elevated">
    <h3>Individual Therapy</h3>
    <p>Personalized support for your mental health journey</p>
  </div>

  <div class="card-elevated featured gradient-mesh">
    <h3>CBT Therapy</h3>
    <p>Evidence-based cognitive behavioral therapy</p>
  </div>

  <div class="card-elevated">
    <h3>Couples Therapy</h3>
    <p>Strengthen your relationship</p>
  </div>
</div>
```

### 3. Animated Testimonials

```html
<div class="testimonial" x-data="{ current: 0, testimonials: [...] }">
  <div class="glass">
    <blockquote x-text="testimonials[current].quote"></blockquote>
    <cite x-text="testimonials[current].author"></cite>
  </div>

  <button @click="current = (current - 1 + testimonials.length) % testimonials.length">
    ←
  </button>
  <button @click="current = (current + 1) % testimonials.length">
    →
  </button>
</div>
```

### 4. Morphing Border Cards

```html
<div class="morphing-border card-elevated">
  <h3>Premium Package</h3>
  <p class="neon-glow">12 Sessions</p>
  <ul>
    <li>Weekly 1-on-1 sessions</li>
    <li>24/7 chat support</li>
    <li>Personalized exercises</li>
  </ul>
  <button class="neumorphic">Choose Plan</button>
</div>
```

### 5. Parallax Sections

```html
<section class="parallax-section">
  <div class="parallax-bg" style="background-image: url(...)"></div>
  <div class="content">
    <h2 class="text-reveal">Our Approach</h2>
    <p>Evidence-based therapy...</p>
  </div>
</section>
```

---

## Hugo Integration

### Main Layout

```go-html-template
<!DOCTYPE html>
<html lang="{{ .Site.Language.Lang }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ .Title }}</title>

  <!-- Hugo-compiled SCSS (no npm!) -->
  {{ $scss := resources.Get "scss/main.scss" }}
  {{ $style := $scss | resources.ToCSS (dict "outputStyle" "compressed") }}
  {{ if hugo.IsProduction }}
    {{ $style = $style | fingerprint }}
  {{ end }}
  <link rel="stylesheet" href="{{ $style.RelPermalink }}">

  <!-- Google Fonts (CDN) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- GSAP (CDN) -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

  <!-- Alpine.js (CDN) -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

  <!-- UnoCSS Runtime (optional) -->
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
</head>
<body>
  {{ partial "header.html" . }}

  <main>
    {{ block "main" . }}{{ end }}
  </main>

  {{ partial "footer.html" . }}

  <!-- Your animations (no build!) -->
  <script src="{{ "js/animations.js" | relURL }}"></script>
</body>
</html>
```

### Build Command

```bash
# That's it! No npm!
hugo server

# Production
hugo --minify
```

---

## What You Get (Zero npm)

✅ **Glassmorphism** - Frosted glass effects
✅ **Gradient animations** - Shifting colors
✅ **Text reveals** - Word-by-word animations
✅ **Parallax** - Depth on scroll
✅ **Magnetic buttons** - Follow cursor
✅ **Smooth scrolling** - Butter-smooth
✅ **Card animations** - Fade in on scroll
✅ **Image reveals** - Clip-path effects
✅ **Counters** - Number animations
✅ **Bento grids** - Modern layouts
✅ **Morphing borders** - Animated gradients
✅ **Neumorphism** - Soft 3D
✅ **Modals/Dropdowns** - Alpine.js
✅ **Dark mode** - Automatic
✅ **Responsive** - Container queries

**All from CDN. Zero build tools.**

---

## Performance

### Bundle Sizes

- **Hugo SCSS**: ~15KB (your custom styles)
- **GSAP CDN**: 48KB (gzipped)
- **Alpine.js**: 15KB (gzipped)
- **UnoCSS Runtime**: 25KB (optional)
- **Total**: ~100KB (vs 200KB Bootstrap)

### Load Time

- All CDN files cached by browser
- Parallel downloads from CDN
- No build step = instant Hugo builds
- Sub-1s page loads

---

## Maintenance

### Updates

**Before (npm):**
```bash
npm outdated
npm audit
npm update
# Fix breaking changes
# Debug build errors
```

**After (CDN):**
```html
<!-- Update version number -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<!-- Change to -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
```

**That's it. No npm audit. No dependency hell.**

---

## Timeline

### Setup (2-3 hours)

- Hugo SCSS setup
- Add CDN scripts
- Create base animations
- Test in browser

### Implementation (20-30 hours)

- Create SCSS modules (animations, effects)
- Build GSAP animations
- Add Alpine.js components
- Test cross-browser

**Total: 22-33 hours vs 274-399 hours**

---

## Comparison

| Feature | npm Build | CDN Approach |
|---------|-----------|--------------|
| **Setup** | 8-12h | 2-3h |
| **Dependencies** | 50+ packages | 0 packages |
| **Build errors** | Common | Never |
| **Updates** | npm audit hell | Change version # |
| **Build time** | 3-10s | Instant |
| **Deploy** | CI/CD complexity | Just Hugo |
| **Debugging** | PostCSS, webpack | Browser DevTools |
| **Eye candy** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ (same!) |

---

## Limitations

### ❌ What You Can't Do

**1. Tree-shaking**
- Can't remove unused CSS automatically
- But UnoCSS Runtime does this in browser

**2. Advanced Tailwind plugins**
- Some plugins need build step
- But you have Hugo SCSS instead

**3. TypeScript**
- No TS compilation
- But you don't need it for animations

### ✅ What You CAN Do

Everything visual:
- All animations
- All effects
- All interactions
- Modern CSS features
- Progressive enhancement

---

## Recommendation

### 🏆 This is THE Solution for You

**Why:**
1. ✅ **Zero npm** - No build tools
2. ✅ **Maximum eye candy** - All the effects
3. ✅ **Fast setup** - 2-3 hours
4. ✅ **Easy maintenance** - Change CDN version
5. ✅ **Hugo native** - Uses built-in SCSS
6. ✅ **Modern** - Latest CSS features
7. ✅ **Performant** - CDN caching

**Timeline:**
- **Week 1**: Setup Hugo SCSS, add CDN scripts
- **Week 2-3**: Build animations, effects
- **Week 4**: Test, polish, launch

**Total: 4 weeks vs 8-12 months**

---

## Next Steps

Want me to:

1. **Create the complete SCSS file** with all effects?
2. **Build the animations.js** with all GSAP code?
3. **Set up the Hugo layout** with CDN includes?
4. **Create example components** ready to use?

I can implement this entire system for you **right now** - no npm, just pure Hugo + CDN magic.

Ready?
