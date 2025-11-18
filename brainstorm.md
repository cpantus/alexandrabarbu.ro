# Hugo Component System Brainstorm

**Date**: 2025-11-18
**Topics**: shadcn-inspired components for Hugo, GSAP animation integration

---

## Question 1: How to Build shadcn Components for Hugo?

### Current State

**Existing System:**
- Bootstrap 5 framework
- Atomic design system (5 atoms, 14 molecules, 2 organisms)
- Components in `layouts/partials/atoms/`, `molecules/`, `organisms/`

**Example atoms:**
- button.html
- heading.html
- icon.html
- input.html
- image.html

### shadcn/ui Principles

**What makes shadcn special:**
1. **Copy-paste components** (not installed via npm)
2. **Customizable** (you own the code)
3. **Accessible** (built with Radix primitives)
4. **Tailwind CSS** (utility-first)
5. **CLI tool** to add components
6. **Type-safe** (TypeScript)

### Proposed Hugo Equivalent

#### Option 1: Keep Bootstrap, Add shadcn-like DX

Build on existing system with shadcn developer experience:

```
hugo-ui/
├── components/           # Component library
│   ├── button/
│   │   ├── button.html          # Partial
│   │   ├── button.config.yaml   # Variants config
│   │   ├── examples.md          # Usage examples
│   │   └── preview.html         # Visual preview
│   ├── card/
│   ├── dialog/
│   └── ...
├── cli/                  # CLI tool
│   └── add-component.sh         # hugo-ui add button
└── themes.yaml          # Theme tokens (colors, spacing)
```

**Component Structure:**

```yaml
# components/button/config.yaml
variants:
  default:
    class: "btn btn-primary"
  destructive:
    class: "btn btn-danger"
  outline:
    class: "btn btn-outline-primary"
  ghost:
    class: "btn btn-link"

sizes:
  sm: "btn-sm"
  md: ""
  lg: "btn-lg"

defaultVariant: "default"
defaultSize: "md"
```

**Enhanced Partial:**

```go-html-template
{{/* components/button/button.html */}}
{{ $config := site.Data.components.button }}
{{ $variant := .variant | default $config.defaultVariant }}
{{ $size := .size | default $config.defaultSize }}

{{ $class := index $config.variants $variant "class" }}
{{ if $size }}
  {{ $class = printf "%s %s" $class (index $config.sizes $size) }}
{{ end }}

<button class="{{ $class }} {{ .class }}" {{ with .attributes }}{{ . }}{{ end }}>
  {{ .text }}
</button>
```

**CLI Tool:**

```bash
#!/bin/bash
# scripts/hugo-ui.sh

hugo-ui add button    # Copies button component
hugo-ui add card      # Copies card component
hugo-ui list          # Shows available components
hugo-ui init          # Sets up the system
```

#### Option 2: Migrate to Tailwind + Full shadcn Clone

More work but true shadcn experience:

```bash
# Install Tailwind
npm install -D tailwindcss @tailwindcss/forms @tailwindcss/typography

# Create components with Tailwind classes
# Similar to shadcn's approach
```

### Recommended: Hybrid Approach

Create **"hugo-ui"** system that:

1. **Builds on existing atoms/molecules**
2. **Adds shadcn-like features**:
   - Component registry with variants
   - CLI tool to scaffold components
   - Theme configuration system
   - Comprehensive docs with live previews
3. **Keeps Bootstrap initially** (less disruption)
4. **Optional Tailwind migration** path later

### Implementation Phases

**Phase 1: Foundation**
- Create component registry structure
- Design theme token system
- Build CLI scaffolding tool

**Phase 2: Enhance Existing Components**
- Add config.yaml to 5 atoms
- Create variant system
- Add preview pages

**Phase 3: Documentation**
- Component catalog
- Usage examples
- Interactive previews

**Phase 4: New Components**
- Dialog/Modal
- Dropdown
- Tabs
- Toast/Alert
- Command palette

---

## Question 2: How to Add GSAP Animations to Hugo Components?

### Current Animation Stack

**Existing Libraries:**
- AOS (Animate On Scroll)
- Rellax (parallax)
- Swiper (carousels)
- jQuery animations (pricing toggle)

**Files:**
- `themes/andromeda-hugo/themes/andromeda-hugo/assets/js/script.js`
- `layouts/partials/pricing-scripts.html`

### Proposed Component-Based Animation Architecture

```
themes/andromeda-hugo/
├── assets/
│   └── js/
│       ├── animations/              # Animation modules
│       │   ├── index.js            # Main registry
│       │   ├── atoms/
│       │   │   ├── button.js       # Button animations
│       │   │   ├── card.js         # Card animations
│       │   │   └── heading.js      # Heading animations
│       │   ├── molecules/
│       │   │   ├── accordion.js    # Accordion animations
│       │   │   └── modal.js        # Modal animations
│       │   └── utils/
│       │       ├── scroll.js       # ScrollTrigger helpers
│       │       └── presets.js      # Reusable timelines
│       ├── main.js                 # Main entry point
│       └── vendor.js               # GSAP imports
└── layouts/
    └── partials/
        ├── atoms/
        │   └── button.html         # With data-animate attrs
        └── animations/
            └── init.html           # Animation init script
```

### Step 1: Install GSAP

```bash
npm install gsap
```

### Step 2: Animation Registry

```javascript
// assets/js/animations/index.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animation registry
const animations = new Map();

// Register animation
export function register(name, animationFn) {
  animations.set(name, animationFn);
}

// Initialize all animations
export function init() {
  // Auto-discover elements with data-animate
  document.querySelectorAll('[data-animate]').forEach(el => {
    const animationType = el.dataset.animate;
    const animation = animations.get(animationType);

    if (animation) {
      animation(el, el.dataset);
    }
  });
}

export { gsap, ScrollTrigger };
```

### Step 3: Component Animations

**Button Animations:**

```javascript
// assets/js/animations/atoms/button.js
import { gsap } from '../index.js';
import { register } from '../index.js';

export function buttonHover(button, options = {}) {
  const { scale = 1.05, duration = 0.3 } = options;

  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      scale,
      duration,
      ease: 'power2.out'
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      duration,
      ease: 'power2.inOut'
    });
  });
}

export function buttonClick(button) {
  gsap.to(button, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power1.inOut'
  });
}

// Auto-register
register('button-hover', buttonHover);
register('button-click', (el) => {
  el.addEventListener('click', () => buttonClick(el));
});
```

**Card Animations:**

```javascript
// assets/js/animations/atoms/card.js
import { gsap, ScrollTrigger } from '../index.js';
import { register } from '../index.js';

export function cardReveal(card, options) {
  const {
    delay = 0,
    stagger = 0.1,
    from = 'bottom'
  } = options;

  const direction = {
    bottom: { y: 50, x: 0 },
    top: { y: -50, x: 0 },
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 }
  };

  gsap.from(card, {
    ...direction[from],
    opacity: 0,
    duration: 0.8,
    delay: parseFloat(delay),
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
}

register('card-reveal', cardReveal);
register('card-hover', (card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -10,
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  });
});
```

**Accordion Animations:**

```javascript
// assets/js/animations/molecules/accordion.js
import { gsap } from '../index.js';
import { register } from '../index.js';

function accordionInit(accordion) {
  const items = accordion.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-collapse');
    const button = header.querySelector('.accordion-button');

    // Set initial height
    gsap.set(content, { height: 0, overflow: 'hidden' });

    button.addEventListener('click', (e) => {
      e.preventDefault();

      const isOpen = item.classList.contains('open');

      // Close all others
      items.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          const otherContent = otherItem.querySelector('.accordion-collapse');
          gsap.to(otherContent, {
            height: 0,
            duration: 0.3,
            ease: 'power2.inOut'
          });
          otherItem.classList.remove('open');
        }
      });

      // Toggle current
      if (isOpen) {
        gsap.to(content, {
          height: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
        item.classList.remove('open');
      } else {
        gsap.to(content, {
          height: 'auto',
          duration: 0.3,
          ease: 'power2.out'
        });
        item.classList.add('open');
      }
    });
  });
}

register('accordion', accordionInit);
```

### Step 4: Update Hugo Components

```go-html-template
{{/* layouts/partials/atoms/button.html */}}
{{- $text := .text -}}
{{- $href := .href -}}
{{- $variant := .variant | default "primary" -}}
{{- $animate := .animate | default "" -}}  {{/* NEW */}}

{{- $btnClass := printf "btn btn-%s" $variant -}}

<a
  href="{{ $href | relURL }}"
  class="{{ $btnClass }}"
  {{- if $animate }}
  data-animate="{{ $animate }}"
  {{- with .animateOptions }}
  {{- range $key, $value := . }}
  data-{{ $key }}="{{ $value }}"
  {{- end }}
  {{- end }}
  {{- end }}
>
  {{ $text }}
</a>
```

**Usage in Sections:**

```go-html-template
{{/* layouts/partials/sections/benefits-grid.html */}}
<section class="section">
  <div class="container">
    <div class="row g-4">
      {{- range $index, $item := .items }}
      <div class="col-md-4">
        {{ partial "molecules/card.html" (dict
          "title" $item.title
          "description" $item.description
          "icon" $item.icon
          "animate" "card-reveal"
          "animateOptions" (dict
            "delay" (mul $index 0.1)
            "from" "bottom"
          )
        )}}
      </div>
      {{- end }}
    </div>
  </div>
</section>
```

### Step 5: Reusable Animation Utilities

```javascript
// assets/js/animations/utils/presets.js
import { gsap } from '../index.js';

export const presets = {
  // Fade in from direction
  fadeIn: (el, from = 'bottom', distance = 50) => ({
    y: from === 'bottom' ? distance : from === 'top' ? -distance : 0,
    x: from === 'left' ? -distance : from === 'right' ? distance : 0,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }),

  // Stagger children
  staggerChildren: (parent, childSelector, animation, stagger = 0.1) => {
    const children = parent.querySelectorAll(childSelector);
    return gsap.from(children, {
      ...animation,
      stagger,
      scrollTrigger: {
        trigger: parent,
        start: 'top 80%'
      }
    });
  },

  // Parallax effect
  parallax: (el, speed = 0.5) => {
    gsap.to(el, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  },

  // Reveal with mask
  maskReveal: (el, direction = 'left') => {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;inset:0;background:#000;';
    el.style.position = 'relative';
    el.appendChild(overlay);

    return gsap.to(overlay, {
      xPercent: direction === 'left' ? -100 : 100,
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%'
      }
    });
  }
};
```

### Step 6: Main Entry Point

```javascript
// assets/js/main.js
import { init } from './animations/index.js';

// Import all animation modules (auto-registers them)
import './animations/atoms/button.js';
import './animations/atoms/card.js';
import './animations/atoms/heading.js';
import './animations/molecules/accordion.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  init();
});
```

### Step 7: Hugo Asset Pipeline

```go-html-template
{{/* layouts/partials/essentials/scripts.html */}}

{{/* Build JS bundle with esbuild */}}
{{ $js := resources.Get "js/main.js" }}
{{ $js = $js | js.Build (dict
  "minify" hugo.IsProduction
  "target" "es2018"
  "format" "esm"
) }}

{{ if hugo.IsProduction }}
  {{ $js = $js | fingerprint }}
{{ end }}

<script type="module" src="{{ $js.RelPermalink }}"></script>
```

### Migration Strategy: AOS Replacement

```javascript
// assets/js/animations/utils/aos-replacement.js
import { register } from '../index.js';
import { gsap, ScrollTrigger } from '../index.js';

// Drop-in AOS replacement
register('aos-fade-up', (el, { aosDuration = 600, aosDelay = 0 }) => {
  gsap.from(el, {
    y: 50,
    opacity: 0,
    duration: aosDuration / 1000,
    delay: aosDelay / 1000,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Usage: data-animate="aos-fade-up" data-aos-duration="800"
```

### Key Benefits

✅ **Component-Based**: Animations tied to components, not scattered
✅ **Data-Driven**: Use `data-*` attributes like AOS
✅ **Auto-Discovery**: Elements register themselves
✅ **Reusable**: Presets library for common patterns
✅ **Performant**: GSAP is more performant than AOS/jQuery
✅ **Type-Safe**: Can add TypeScript later
✅ **Tree-Shakeable**: Hugo's esbuild only bundles used animations
✅ **Hugo-Friendly**: Works with Hugo's asset pipeline

### Implementation Phases

**Phase 1: Setup (1-2 hours)**
- Install GSAP
- Create animation registry structure
- Build 2-3 example animations (button, card)

**Phase 2: Core Animations (2-3 hours)**
- Migrate all atoms (5 components)
- Create reusable presets
- Add ScrollTrigger helpers

**Phase 3: Complex Animations (3-4 hours)**
- Animate molecules (accordion, modal, etc.)
- Add page transitions
- Create timeline-based sequences

**Phase 4: AOS Migration (2-3 hours)**
- Replace AOS with GSAP equivalents
- Update all sections using AOS
- Test and optimize

**Phase 5: Polish (1-2 hours)**
- Performance optimization
- Documentation
- Create animation showcase page

---

## Next Steps

### For shadcn-inspired Components:
1. Decide: Bootstrap+CLI or full Tailwind migration?
2. Design component variant system
3. Build CLI tool prototype
4. Enhance 2-3 existing atoms as proof of concept

### For GSAP Animations:
1. Install GSAP
2. Create animation registry
3. Build button + card animations as POC
4. Decide on AOS migration timeline
5. Implement phase by phase

### Questions to Answer:
- Should we keep Bootstrap or migrate to Tailwind?
- Which components need animations most urgently?
- Should we replace AOS entirely or run both temporarily?
- Do we want TypeScript for animation modules?
