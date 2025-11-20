# Theme Refactor - Detailed Context & Current State Analysis

**Last Updated**: 2025-01-19

---

## Table of Contents
1. [Current Component Inventory](#current-component-inventory)
2. [SCSS Architecture Deep Dive](#scss-architecture-deep-dive)
3. [JavaScript Interactive Features](#javascript-interactive-features)
4. [Site Structure Requirements](#site-structure-requirements)
5. [Design System Current State](#design-system-current-state)

---

## Current Component Inventory

### Atoms (5 Basic Building Blocks)
Location: `layouts/partials/atoms/`

#### 1. button.html
**Features**:
- 4 variants: primary, secondary, outline-primary, outline-secondary
- 3 sizes: sm, md, lg
- Icon support (left/right positioning)
- Animation support
- Full-width option
- Renders as `<a>` link or `<button>` element
**Current Colors**: Emerald (primary), Terracotta (secondary)
**Issues**: Variant system not unified with other components

#### 2. heading.html
**Features**:
- Levels: h1-h6
- 4 variants: default, gradient, section, bold
- 5 color variants: primary, secondary, coral, sage, info
- Alignment: left/center/right
- Optional subtitle
- Markdown support
**Current Font**: Cormorant Garamond (serif)
**Issues**: Too many variant options, inconsistent usage

#### 3. icon.html
**Features**:
- Size presets: xs (0.75rem) → 4x (4rem)
- Color classes: primary, secondary, success, danger, warning, etc.
- Gradient wrapper support (v4.0+)
- Wrapper sizes: sm (48px) → xl (96px)
- Line Awesome icon library
**Issues**: Wrapper sizes don't align with spacing system, icon sizing inconsistent

#### 4. image.html
**Features**:
- Modern formats: WebP + AVIF + fallback
- Responsive srcset (4 sizes: 0.5x, 1x, 1.5x, 2x)
- Lazy loading (default enabled)
- SVG support (no processing)
- Quality control (default: 90)
**Status**: ✅ **EXCELLENT** - Keep as-is, already optimal

#### 5. input.html
**Features**:
- 13 input types: text, email, password, tel, url, number, date, time, textarea, checkbox, radio, select
- Validation states (required, pattern, min/max)
- Error message display
- Help text support
- Full ARIA associations
**Issues**: Styling inconsistent with design system, needs visual refresh

---

### Molecules (21 Composite Components)
Location: `layouts/partials/molecules/`

#### Core Molecules (High Usage)
1. **card.html** - Flexible card with 3 variants (feature, pricing, testimonial)
2. **accordion.html** - FAQ/collapsible sections (Bootstrap 5 based)
3. **navigation.html** - Main site navigation with dropdown support
4. **breadcrumb.html** - Navigation breadcrumb trail
5. **form-field.html** - Composite form field with label

#### Credential & Badge Molecules
6. **credential-badge.html** - Professional credentials display
7. Uses icon atom + label structure
8. 3 sizes: sm, md, lg
9. 3 variants: primary, success, info

#### Navigation Molecules
10. **nav-item.html** - Individual navigation item
11. **mobile-menu.html** - Mobile navigation menu
12. **language-selector.html** - Language switcher (desktop/mobile)
13. **logo.html** - Site logo component

#### Form Molecules
14. **pricing-toggle.html** - Monthly/yearly pricing toggle

#### Content Molecules
15. **blog-card.html** - Blog post preview card
16. **stat-card.html** - Statistics display card
17. **timeline-step.html** - Timeline/process step
18. **video-embed.html** - Responsive video embed wrapper
19. **social-links.html** - Social media icon links

#### Footer Molecules
20. **footer-info.html** - Footer logo and description
21. **footer-nav.html** - Footer links and social icons

#### Utility Molecules
22. **back-to-top.html** - Floating back-to-top button
23. **cookie-consent.html** - GDPR cookie banner
24. **emergency-banner.html** - Crisis hotline banner

**Issues**: Inconsistent variant systems, some use 3 variants, others use 5+, no unified color palette approach

---

### Organisms (2 Complex Compositions)
Location: `layouts/partials/organisms/`

#### 1. header.html
**Composition**:
- Skip-to-content link (WCAG 2.1 AA)
- Logo molecule
- Navigation molecule
- Language selector molecule (desktop + mobile)
- Mobile menu toggle
- Optional CTA button
**Features**: Fixed height, Bootstrap navbar, responsive collapse, cached partial
**Issues**: Could use microinteractions on sticky scroll

#### 2. footer.html
**Composition**:
- Optional CTA section with SVG decorations
- Footer info molecule
- Footer nav molecule
- Copyright section
**Features**: Conditional CTA, SVG wave decoration, cached partial
**Issues**: SVG decoration may not fit new design language

---

### Sections (22 Active + 13 Deprecated)
Location: `layouts/partials/sections/`

#### Core Foundation (4)
1. **hero-breadcrumb.html** - Page header with title + breadcrumb
2. **values-intro.html** - Value proposition introduction
3. **blog-grid.html** - Blog post grid with pagination
4. **cta-standard.html** - Standard call-to-action

#### Interactive (3)
5. **video-popup.html** - Video modal with play button
6. **faq-mini.html** - Compact FAQ (3-5 questions)
7. **faq-content.html** - Full FAQ section

#### Forms (3)
8. **contact-form-enhanced.html** - Full contact form
9. **signup-form-enhanced.html** - Newsletter/service signup
10. **newsletter-signup.html** - Simple email subscription

#### Info & Trust (4)
11. **contact-info-cards.html** - Contact methods cards
12. **contact-options.html** - Alternative contact channels
13. **privacy-guarantee.html** - Privacy assurance
14. **credentials-showcase.html** - Professional credentials (v4.0 enhanced)

#### Enhanced v4.0 Premium (5)
15. **values-compass.html** - Compass-pattern layout with glassmorphism ⭐
16. **feature-blocks.html** - Zigzag layout with parallax
17. **pricing-tables.html** - Featured tier elevation
18. **stats-numbers.html** - SVG progress rings with counters
19. **credentials-showcase.html** - Gradient icon circles

#### Specialized Therapy (3)
20. **first-session-timeline.html** - First session expectations
21. **service-faq-inline.html** - Service-specific FAQ
22. **testimonials-enhanced.html** - Client testimonials
23. **problem-empathy.html** - Problem statement section

**Deprecated Sections** (in `_deprecated/` directory):
- benefits-grid.html, service-highlights.html, onboarding-steps.html, etc.
- Total: 13 sections replaced by enhanced v4.0 components

---

## SCSS Architecture Deep Dive

### Current Structure: ITCSS + BEM
Entry Point: `assets/scss/main-new.scss` (ACTIVE)
Legacy: `assets/scss/main.scss` (deprecated)

### 01-settings/ (Design Tokens)

#### _tokens-colors.scss
**Current Palette**:
- **Primary**: Emerald #4DB380 (growth, healing, trust)
- **Secondary**: Terracotta #CC6B49 (warmth, balance, grounding)
- **Supporting**: Teal, Amber, Sage, Plum, Coral, Navy, Red
- **Total**: 8 colors × 9 steps (50-900) = 72 color values

**Semantic Mappings**:
- Text: `$color-text-primary`, `$color-text-secondary`, `$color-text-muted`, `$color-text-heading`
- Backgrounds: `$color-bg-page`, `$color-bg-section`, `$color-bg-card`
- Borders: `$color-border-light`, `$color-border-medium`, `$color-border-dark`
- States: `$color-success`, `$color-warning`, `$color-error`, `$color-info`

**Issues**:
- Only 8 colors, need 4-6 more for expanded palette
- Some semantic mappings unclear (e.g., when to use bg-section vs bg-card)

#### _tokens-typography.scss
**Current Fonts**:
- **Headings**: Cormorant Garamond (300-700) - Elegant serif
- **Body**: Source Sans 3 (300-700) - Modern sans-serif
- **Base Size**: 16px
- **Loading**: Google Fonts @import

**Font Weights (RESTRICTED)**:
- Headings: 500 (default), 600 (bold) ONLY
- Body: 400 ONLY
- **FORBIDDEN**: 300 (thin), 700 (bold), 800 (extrabold)
- **Rationale**: Soft hierarchy, warm professional personality

**Font Sizes (11-step scale)**:
- xs (12px), sm (14px), base (16px), lg (18px), xl (20px)
- 2xl (24px), 3xl (30px), 4xl (36px), 5xl (48px)
- 6xl (60px), 7xl (clamp(64px, 6vw, 112px))

**Line Heights**:
- Tight (1.25) - Display, H1, H2
- Snug (1.375) - H3, H4, H5
- Normal (1.5) - Body text (optimal readability)
- Relaxed (1.625) - Small text

**Icon Sizes**:
- Inline: xs (0.75rem) → 4x (4rem)
- Circles: sm (32px), md (48px), lg (64px), xl (84px)

**Issues**:
- Weight restrictions too limiting (only 400/500/600)
- Icon circle sizes don't align with spacing system
- Font loading via @import (could use Hugo's asset pipeline)

#### _tokens-gradients.scss (v4.0)
**Gradient Categories**:
1. Warm gradients (emerald → terracotta): subtle, light, medium, vibrant
2. Radial gradients (organic spotlight): primary, secondary, warm
3. Multi-stop gradients (layered depth): healing-depth, sunrise
4. Icon gradients: emerald, terracotta, teal, amber
5. Glassmorphism backgrounds: glass-light, glass-warm
6. Button gradients: primary/secondary in subtle/vibrant

**Issues**: Some gradients underutilized, glassmorphism may not fit new design

#### _tokens-shadows.scss (inferred, not seen directly)
**Likely Structure**:
- Shadow scale: sm, base, md, lg, xl
- Specialized: shadow-glass, shadow-featured, shadow-primary, shadow-secondary

**Issues**: Shadow scale not documented, usage inconsistent

#### _tokens-spacing.scss (inferred, not seen directly)
**Likely Structure**:
- Spacing scale: `$space-1` through `$space-16` (0.25rem increments?)
- Gap sizes: `$gap-tight`, `$gap-normal`, `$gap-spacious`

**Issues**:
- **NO UNIFIED GRID SYSTEM** - This is a major gap
- Spacing values likely inconsistent
- No clear 8pt or 4pt grid

#### _tokens-motion.scss (inferred)
**Likely Structure**:
- Duration: `$duration-fast`, `$duration-base`, `$duration-normal`
- Easing: `$ease-out`, `$easing-medium`
- Motion levels: Level 2 molecule motion

**Issues**: Animation timing varies across components, no single source of truth

#### _tokens-components.scss (inferred)
**Likely Structure**:
- Button: `$button-border-radius`, `$button-padding-x/y`, `$button-font-weight`
- Card: `$card-padding-lg`, `$values-border-radius`
- Glass: `$glass-blur` (12px), `$glass-opacity` (0.75)
- Organic blobs: `$blob-soft`, `$blob-organic`, `$blob-smooth`, `$blob-gentle`

---

### 02-tools/ (Mixins & Functions)

#### _mixins-glassmorphism.scss
**Mixins**:
- `@mixin glassmorphism($blur, $opacity)` - Backdrop blur + transparent bg + shadow
- `@mixin organic-blob($variant)` - Asymmetric border-radius (soft, organic, smooth, gentle)

**Issues**: Glassmorphism may not fit new design language

#### _mixins-card.scss
**Mixins** (inferred from usage):
- `@mixin card-v4($variant, $elevated)` - Base card styling
- `@mixin card-glass($variant, $blur, $opacity)` - Glassmorphism cards
- `@mixin card-gradient-border($variant)` - Gradient border effect
- `@mixin card-top-accent($variant)` - Top accent border
- `@mixin card-hover-lift($distance)` - Hover lift animation
- `@mixin card-gradient-bg($variant)` - Gradient background
- `@mixin card-featured()` - Featured card styling
- `@mixin progressive-disclosure()` - Progressive content reveal
- `@mixin staggered-entrance($animation, $delay)` - Staggered animations

**Issues**: Too many mixins, some overlap, complex to maintain

#### _mixins-icon.scss (inferred)
**Likely Mixins**:
- Icon sizing helpers
- Icon circle backgrounds
- Icon gradient wrappers

#### _functions-colors.scss (inferred)
**Likely Functions**:
- Color manipulation (lighten, darken, alpha)
- Contrast calculation
- Color retrieval from scales

---

### 06-components/ (BEM Components)

#### Key BEM Components Identified

**_card.scss**:
- Block: `.c-card`
- Elements: `__header`, `__title`, `__icon`, `__body`, `__footer`, `__meta`, `__action`
- Modifiers: `--primary`, `--secondary`, `--coral`, `--sage`, `--elevated`, `--glass`, `--gradient-border`
- Auto-color distribution: Service cards alternate primary/secondary
- Legacy compatibility: `.card-v4`, `.card-primary` extend BEM classes

**_button.scss**:
- Block: `.c-button`
- Modifiers: `--primary`, `--secondary`, `--outline-primary`, `--outline-secondary`, `--sm`, `--lg`
- Features: Gradient backgrounds, hover lift (-2px), active press, focus ring, disabled state
- Touch targets: min 44px on mobile (WCAG 2.1 AA)
- Reduced motion support
- Legacy: `.btn`, `.btn-primary` extend BEM classes

**_values-compass.scss** (v4.0 flagship component):
- Block: `.c-values-compass`
- Elements: `__container`, `__header`, `__compass`, `__connectors`, `__grid`, `__card`, `__icon`, `__card-title`, `__card-description`
- Modifiers: `__card--featured`, `__card--expanded`, `__icon--emerald/terracotta/teal/amber`
- Features: Organic blobs, SVG connectors, glassmorphism, progressive disclosure, pulsing glow
- Responsive: 3 cols → 2+1 → 1 col
- Reduced motion + high contrast + print support

**Other Components** (inferred):
- `_icon.scss`, `_badge.scss`, `_form.scss`, `_hero-breadcrumb.scss`, `_testimonials.scss`
- `_faq.scss`, `_video-popup.scss`, `_blog-grid.scss`, `_problem-empathy.scss`
- `_credentials.scss`, `_stats.scss`, `_feature-blocks.scss`, `_pricing.scss`
- `_values-intro.scss`, `_newsletter.scss`, `_signup-form.scss`, `_privacy-guarantee.scss`
- `_header.scss`, `_footer.scss`

**Issues**:
- Legacy compatibility layer adds bloat
- Not all components follow BEM strictly
- Variant naming inconsistent across components

---

## JavaScript Interactive Features

### values-compass-interactions.js
**Purpose**: Mobile touch interactions for values-compass section
**Size**: ~4KB unminified
**Features**:
- Touch detection (only runs on touch devices)
- Tap-to-expand cards on mobile
- Accordion behavior (collapse others when expanding one)
- Keyboard accessibility (Enter/Space support)
- Smooth scroll to expanded card
- ARIA live regions for screen readers
- Intersection Observer for entrance animations
- Reduced motion support

**Status**: ✅ Well-implemented, keep pattern

---

### stats-counter.js
**Purpose**: Animated number counting with SVG progress rings
**Features**:
- Intersection Observer (threshold 0.5)
- Counting animation: 0 → target, 2s duration
- Easing: Ease-out cubic
- Number formatting: toLocaleString
- SVG stroke-dashoffset animation
- Pulse effect during counting
- Reduced motion fallback
- requestAnimationFrame for 60fps

**Status**: ✅ Excellent, keep as-is

---

### scroll-animations.js
**Purpose**: Unified parallax and scroll-triggered effects
**Features**:
1. Parallax scrolling (desktop ≥992px only, 30% speed)
2. Scroll triggers (Intersection Observer, threshold 0.1, `.is-visible` class)
3. Smooth scroll (anchor links, native scrollIntoView)
4. Performance: requestAnimationFrame throttling, passive listeners, ticking flag
5. Accessibility: Reduced motion support, responsive (parallax off mobile), resize handler

**Status**: ✅ Good foundation, may need animation timing updates

---

### vanilla-collapse.js (inferred)
**Purpose**: Mobile navigation collapse, accordion functionality
**Replaces**: Bootstrap JavaScript
**Status**: Need to verify implementation quality

---

### vanilla-dropdown.js (inferred)
**Purpose**: Navigation dropdown menus, keyboard navigation
**Replaces**: Bootstrap JavaScript
**Status**: Need to verify implementation quality

---

### gsap-enhancements.js (inferred)
**Purpose**: GSAP animations (magnetic buttons, ripple effects)
**Status**: Evaluate if GSAP needed in new design or if vanilla JS sufficient

---

## Site Structure Requirements

### 6 Main Page Types

#### 1. HOMEPAGE
**Sections Needed** (10):
1. Hero with headline, subheadline, intro, 2 CTAs, image/video
2. Problem Recognition: "Recunoști Aceste Semne?" (4 challenge blocks)
3. Services Preview: 3-4 service cards
4. About Preview: Photo + intro + credentials + CTA
5. Approach Preview: 4 principles with icons
6. Testimonials Carousel: 3 testimonials with ratings
7. Simple Process: 3 steps to healing
8. FAQ Preview: 3-4 questions + link to full FAQ
9. CTA Final: Headline + motivational text + booking button
10. Footer (global organism)

**Content**: Romanian (root `/`) + English (`/en/`)

---

#### 2. ABOUT PAGE (Despre)
**Sections Needed** (8):
1. Hero: Page title, subtitle, professional photo
2. My Story: Narrative (2-3 paragraphs) + informal/office photo
3. Education & Certifications: Timeline/cards with institution logos
4. Values & Philosophy: 4-6 values with icons + descriptions
5. Experience Numbers: Stats (years, clients, hours, specializations)
6. Approach Link: Preview + CTA to approach page
7. CTA: Encouraging text + consultation booking button
8. Footer (global)

**URLs**: `/despre` (RO), `/en/about` (EN)

---

#### 3. SERVICES PAGES

**Main Services Page** (6 sections):
1. Hero: Title, subtitle, intro
2. Services Grid: 4 cards (Individuală, Cuplu, Familie, Organizațională)
3. Service Chooser: Guide + self-assessment questions
4. General Benefits: Why therapy works
5. CTA: Free orientation consultation offer
6. Footer (global)

**URLs**: `/servicii` (RO), `/en/services` (EN)

**Individual Service Pages** (12 sections each):
1. Hero: Service name, subtitle, representative image
2. Who Is It For: Checklist of situations/symptoms
3. What It Solves: Challenges addressed with details
4. Therapy Process: Timeline/steps (what happens in each stage)
5. Methods Used: Techniques + scientific basis
6. Benefits & Results: Expected changes + timeline
7. Pricing & Packages: Pricing table with payment options
8. Service FAQ: 4-6 service-specific questions
9. Service Testimonials: 2-3 relevant testimonials
10. CTA: Booking consultation + questions contact
11. Related Services: Links to other relevant services
12. Footer (global)

**URLs**:
- `/servicii/terapie-individuala` (RO), `/en/services/individual-therapy` (EN)
- `/servicii/terapie-de-cuplu` (RO), `/en/services/couples-therapy` (EN)
- `/servicii/terapie-de-familie` (RO), `/en/services/family-therapy` (EN)
- `/servicii/psihologie-organizationala` (RO), `/en/services/organizational-psychology` (EN)

---

#### 4. APPROACH PAGE (Abordare)
**Sections Needed** (9):
1. Hero: Title, subtitle, compass/map visual metaphor
2. Therapeutic Philosophy: Main statement + explanation
3. Methods Tabs: CBT, Mindfulness, Systemic Therapy, EMDR (tabs/accordion)
4. Methods Integration: How methods combine + personalization
5. Work Principles: 4-6 principles with icons + descriptions
6. Therapy Process General: Diagram/timeline (First → Evaluation → Plan → Implementation → Integration)
7. What Makes Different: Unique differentiators, specific approach
8. CTA: Learn more in consultation + booking
9. Footer (global)

**URLs**: `/abordare` (RO), `/en/approach` (EN)

---

#### 5. RESOURCES PAGE (Resurse)
**Sections Needed** (10):
1. Hero: Title, subtitle, search bar
2. Resource Categories: Tabs/filter (All, Articles, Guides, Exercises, Video/Audio, Workshops)
3. Featured Resources: 3 promoted items (large cards with images)
4. Resources Grid: Card grid for all resources + load more button
5. Newsletter Signup: Benefits of subscribing + email form + GDPR checkbox
6. Workshops & Events: Calendar/list of upcoming events + registration
7. Downloadable Resources: Lead magnets + download forms
8. Recent Blog: 6-9 recent articles
9. CTA: Want personalized resources? + consultation link
10. Footer (global)

**URLs**: `/resurse` (RO), `/en/resources` (EN)

---

#### 6. CONTACT PAGE
**Sections Needed** (9):
1. Hero: Encouraging title, subtitle, office/ambient photo
2. Contact Info: 2 columns (contact details + interactive map)
3. Consultation Options: Office vs Online cards (benefits of each)
4. Contact/Booking Form: Full form (name, email, phone, service type, mode, message, availability, GDPR checkbox)
5. Free Consultation: 30min consultation details (what's included, how it helps)
6. Pricing: Table/cards with prices, packages, payment methods, social tariffs note
7. FAQ Contact: Common questions (How to cancel/reschedule? Confidential? Session duration? How many sessions?)
8. Emergency Resources: Visible box for crisis situations, emergency numbers, immediate resources
9. Footer (global)

**URLs**: `/contact` (RO), `/en/contact` (EN)

---

### Legal Pages
- **Privacy Policy**: `/politica-confidentialitate` (RO), `/en/privacy-policy` (EN)
- **Terms & Conditions**: `/termeni-conditii` (RO), `/en/terms-conditions` (EN)

---

## Design System Current State

### Typography Philosophy
**Current**: "Soft hierarchy, warm professional personality"
- Restricted weights to avoid harsh contrasts
- Cormorant Garamond for elegance
- Source Sans 3 for modern readability

**Issues**: Too restrictive (only 400/500/600), limits design expression

---

### Color Philosophy
**Current**: "Growth + Balance"
- Emerald = Growth, healing, trust (primary actions)
- Terracotta = Warmth, balance, grounding (personal connections)

**Strategy**: 50-60% emerald, 20-30% terracotta, 10-20% supporting colors

**Issues**: Only 8 colors total, need more variety for 34 sections

---

### Animation Philosophy
**Current**: "Level 2 molecule motion - consistent -2px lift + shadow upgrade"
**Features**: 10 animation types, glassmorphism, progressive disclosure

**Issues**: Timing varies (some 150ms, some 250ms, some 400ms), no unified timing scale

---

### Accessibility Standards
**Current**: WCAG 2.1 AA compliance
- Color contrast 4.5:1 minimum
- Touch targets ≥44px (mobile)
- Keyboard navigation
- Screen reader support (ARIA)
- Reduced motion support
- High contrast mode support

**Status**: ✅ Excellent foundation, maintain in new design

---

### Performance Standards
**Current**:
- Build time: <3s
- Page size: <520KB
- CSS: ~50KB gzipped (v4.0: +15KB = ~65KB)
- JS: ~3KB (v4.0 additions)
- Images: WebP + AVIF + srcset + lazy loading

**Status**: ✅ Good performance, maintain standards

---

## Key Insights for Refactor

### What Works (Preserve)
1. ✅ Atomic Design architecture
2. ✅ ITCSS + BEM structure
3. ✅ Image optimization (WebP/AVIF)
4. ✅ Accessibility compliance
5. ✅ Performance optimization
6. ✅ Multilingual support
7. ✅ Vanilla JS approach
8. ✅ Progressive enhancement
9. ✅ Data-driven templates

### What Needs Work (Fix)
1. ❌ No unified spacing grid (8pt/4pt)
2. ❌ Inconsistent component variants (3 vs 5 vs 8 color options)
3. ❌ Typography weights too restrictive (only 400/500/600)
4. ❌ Animation timing inconsistent (150ms vs 250ms vs 400ms)
5. ❌ Icon sizing not aligned with spacing
6. ❌ Only 8 colors (need 12-14 for 34 sections)
7. ❌ Legacy compatibility classes add bloat
8. ❌ Some components don't follow BEM strictly
9. ❌ Missing microinteractions in many components
10. ❌ Responsive breakpoints not consistently applied

---

*Last Updated: 2025-01-19*
*Next: See PROGRESS.md for phase tracking*
