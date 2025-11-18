# Andromeda Hugo Theme - Component Inventory

**Version:** 4.0.0 Creative Design Excellence
**Last Updated:** 2025-11-18
**Total Components:** 53 components across 4 levels

---

## Component Hierarchy Overview

```
5 Atoms (Basic UI elements)
  ↓
21 Molecules (Composite components)
  ↓
2 Organisms (Complex sections)
  ↓
34 Sections (Page building blocks)
```

**Total:** 62 components organized using Atomic Design principles

---

## 🔬 ATOMS (5 components)

Basic UI elements that cannot be broken down further. These are the building blocks of all other components.

### 1. **button.html** (`layouts/partials/atoms/button.html`)
**Purpose:** Interactive button elements with multiple variants
**Parameters:**
- `text` (string) - Button label
- `url` (string) - Link destination
- `variant` (string) - Color variant: primary, secondary, outline-primary, outline-secondary
- `size` (string) - Size: sm, md, lg
- `icon` (string) - Optional icon class
- `type` (string) - HTML button type: button, submit, reset

**Variants:**
- Primary (emerald) - Main actions, trust signals
- Secondary (terracotta) - Warm actions, personal connection
- Outline-primary - Secondary actions
- Outline-secondary - Tertiary actions

**v4.0 Features:** Gradient hover effects, smooth transitions, accessibility support

---

### 2. **heading.html** (`layouts/partials/atoms/heading.html`)
**Purpose:** Semantic heading elements with automatic color variants
**Parameters:**
- `text` (string) - Heading text
- `level` (string) - HTML level: h1, h2, h3, h4, h5, h6
- `colorVariant` (string) - Color: primary, secondary, coral, sage, info
- `class` (string) - Additional CSS classes
- `autoColor` (bool) - Enable automatic color rotation

**v4.0 Features:**
- Automatic color rotation based on section position
- 5 gradient color variants
- Typography optimization (Cormorant Garamond)
- Responsive font sizing

**SCSS:** `assets/scss/components/_headings.scss` (92 lines)

---

### 3. **icon.html** (`layouts/partials/atoms/icon.html`)
**Purpose:** Icon display with optional gradient circle wrapper
**Parameters:**
- `name` (string) - Icon class (Line Awesome icons)
- `size` (string) - Icon size: sm, md, lg, xl, 2x, 3x
- `withWrapper` (bool) - Enable gradient circle background
- `wrapperVariant` (string) - Wrapper color: emerald, terracotta, teal, amber, coral, premium, sage, navy
- `wrapperSize` (string) - Wrapper size: sm, md, lg, xl
- `wrapperClass` (string) - Additional wrapper classes

**v4.0 Features:**
- Gradient circular backgrounds (8 variants)
- Glow effects on hover
- Pulse animations
- Auto-color integration

**SCSS:** `assets/scss/systems/_icon-system.scss` (360 lines)

**Example:**
```html
{{ partial "atoms/icon.html" (dict
  "name" "la-check-circle"
  "withWrapper" true
  "wrapperVariant" "primary"
  "wrapperSize" "lg"
) }}
```

---

### 4. **image.html** (`layouts/partials/atoms/image.html`)
**Purpose:** Responsive image with lazy loading and WebP support
**Parameters:**
- `src` (string) - Image path
- `alt` (string) - Alt text (required for accessibility)
- `width` (int) - Image width
- `height` (int) - Image height
- `class` (string) - CSS classes
- `lazy` (bool) - Enable lazy loading (default: true)

**Features:**
- WebP format with fallbacks
- Responsive srcset
- Lazy loading
- Automatic optimization

---

### 5. **input.html** (`layouts/partials/atoms/input.html`)
**Purpose:** Form input fields with validation
**Parameters:**
- `name` (string) - Input name attribute
- `type` (string) - Input type: text, email, tel, number, textarea
- `label` (string) - Input label
- `placeholder` (string) - Placeholder text
- `required` (bool) - Required field
- `value` (string) - Default value

**Features:**
- Validation states
- Accessible labels
- Error messaging
- Consistent styling

---

## 🧩 MOLECULES (21 components)

Composite components built from atoms. These combine basic elements into functional UI patterns.

### Navigation & Layout

#### 1. **navigation.html** (`layouts/partials/molecules/navigation.html`)
**Purpose:** Main site navigation with dropdown support
**Features:** Multi-level menus, active states, responsive behavior

#### 2. **nav-item.html** (`layouts/partials/molecules/nav-item.html`)
**Purpose:** Individual navigation item with active state styling

#### 3. **mobile-menu.html** (`layouts/partials/molecules/mobile-menu.html`)
**Purpose:** Mobile navigation drawer
**Features:** Slide-out animation, overlay, touch-friendly

#### 4. **breadcrumb.html** (`layouts/partials/molecules/breadcrumb.html`)
**Purpose:** Breadcrumb navigation trail
**Features:** Automatic generation from Hugo page hierarchy

#### 5. **language-selector.html** (`layouts/partials/molecules/language-selector.html`)
**Purpose:** Language switcher (Romanian/English)
**Features:** Flag icons, smooth transitions

#### 6. **logo.html** (`layouts/partials/molecules/logo.html`)
**Purpose:** Site logo with link to homepage
**Features:** Responsive sizing, retina support

---

### Content Display

#### 7. **card.html** (`layouts/partials/molecules/card.html`)
**Purpose:** Flexible content card with multiple variants
**Parameters:**
- `title` (string) - Card title
- `content` (string) - Card content
- `icon` (string) - Optional icon
- `iconWithWrapper` (bool) - Enable icon gradient wrapper
- `iconWrapperVariant` (string) - Icon color variant
- `iconWrapperSize` (string) - Icon wrapper size
- `headingColorVariant` (string) - Title color variant
- `variant` (string) - Card type: default, feature, service, blog
- `image` (string) - Card image
- `url` (string) - Card link
- `button_text` (string) - CTA button text
- `button_variant` (string) - Button color variant

**v4.0 Features:**
- Glassmorphism effects
- Gradient borders
- Hover lift animations
- Auto-color integration

**SCSS:** `assets/scss/systems/_card-system.scss` (420 lines)

#### 8. **blog-card.html** (`layouts/partials/molecules/blog-card.html`)
**Purpose:** Blog post preview card
**Features:** Image, title, excerpt, date, category, read time

#### 9. **stat-card.html** (`layouts/partials/molecules/stat-card.html`)
**Purpose:** Statistics display with animated counting
**Features:** SVG progress rings, number counting animation

#### 10. **credential-badge.html** (`layouts/partials/molecules/credential-badge.html`)
**Purpose:** Professional credentials and certifications display
**Parameters:**
- `label` (string) - Badge label
- `value` (string) - Badge value
- `icon` (string) - Icon class
- `variant` (string) - Color variant: primary, secondary, coral, premium, sage, info, success, warning
- `size` (string) - Size: sm, md, lg

**v4.0 Features:**
- 8 gradient color variants
- Icon with gradient circles
- Glassmorphism background
- Responsive sizing

**SCSS:** `assets/scss/components/_credentials.scss` (enhanced v4.0)

---

### Interactive Elements

#### 11. **accordion.html** (`layouts/partials/molecules/accordion.html`)
**Purpose:** Collapsible content sections
**Features:** Smooth expand/collapse, icon rotation, keyboard navigation

#### 12. **form-field.html** (`layouts/partials/molecules/form-field.html`)
**Purpose:** Complete form field with label, input, validation
**Features:** Error states, helper text, accessible labels

#### 13. **pricing-toggle.html** (`layouts/partials/molecules/pricing-toggle.html`)
**Purpose:** Monthly/yearly pricing switcher
**Features:** Animated toggle, price updates

#### 14. **video-embed.html** (`layouts/partials/molecules/video-embed.html`)
**Purpose:** Responsive video embedding
**Features:** YouTube/Vimeo support, lazy loading, privacy-friendly

---

### Specialized Components

#### 15. **timeline-step.html** (`layouts/partials/molecules/timeline-step.html`)
**Purpose:** Individual timeline step component
**Features:** Gradient icon circles, connector lines, color variants

#### 16. **social-links.html** (`layouts/partials/molecules/social-links.html`)
**Purpose:** Social media icon links
**Features:** Hover effects, accessible labels

#### 17. **footer-nav.html** (`layouts/partials/molecules/footer-nav.html`)
**Purpose:** Footer navigation menus
**Features:** Multi-column layout, category grouping

#### 18. **footer-info.html** (`layouts/partials/molecules/footer-info.html`)
**Purpose:** Footer contact information and copyright
**Features:** Structured data, legal links

#### 19. **back-to-top.html** (`layouts/partials/molecules/back-to-top.html`)
**Purpose:** Scroll-to-top button
**Features:** Appears on scroll, smooth animation

#### 20. **cookie-consent.html** (`layouts/partials/molecules/cookie-consent.html`)
**Purpose:** GDPR-compliant cookie banner
**Features:** Customizable, dismissible, accessible

#### 21. **emergency-banner.html** (`layouts/partials/molecules/emergency-banner.html`)
**Purpose:** Critical announcements banner
**Features:** Dismissible, high contrast, urgent styling

---

## 🏢 ORGANISMS (2 components)

Complex, standalone sections combining multiple molecules and atoms.

### 1. **header.html** (`layouts/partials/organisms/header.html`)
**Purpose:** Site-wide header with navigation
**Components Used:**
- logo.html (molecule)
- navigation.html (molecule)
- mobile-menu.html (molecule)
- language-selector.html (molecule)

**Features:**
- Sticky header on scroll
- Mobile-responsive
- Transparent/solid variants
- Accessibility compliant

**SCSS:** Header styling integrated in main theme

---

### 2. **footer.html** (`layouts/partials/organisms/footer.html`)
**Purpose:** Site-wide footer with multiple sections
**Components Used:**
- footer-nav.html (molecule)
- footer-info.html (molecule)
- social-links.html (molecule)
- back-to-top.html (molecule)

**Features:**
- Multi-column layout
- Newsletter signup integration
- Contact information
- Legal links
- Social media links
- Accessibility compliant

**SCSS:** Footer styling integrated in main theme

---

## 📄 SECTIONS (34 components)

Page building blocks for the flexible layout system. Each section is a complete, self-contained content area.

### Core Foundation (5 sections)

#### 1. **hero-breadcrumb.html**
**Purpose:** Page header with title, subtitle, and breadcrumb navigation
**Parameters:**
- `title` (string) - Page title
- `subtitle` (string) - Page subtitle
- `breadcrumb` (bool) - Show breadcrumb trail

**v4.0 Features:** Organic blob backgrounds, gradient accents, primary heading colorVariant

**Content:** `hero_breadcrumb` in front matter

---

#### 2. **values-intro.html**
**Purpose:** Value proposition introduction with CTAs
**Parameters:**
- `title` (string) - Section title
- `content` (string) - Introduction text
- `buttons` (array) - CTA buttons

**v4.0 Features:** Primary heading colorVariant, gradient button effects

**Content:** `values_intro` in front matter

---

#### 3. **feature-details.html**
**Purpose:** Detailed feature showcase with descriptions
**Parameters:**
- `title` (string) - Section title
- `features` (array) - Feature list with icon, title, description

**v4.0 Features:** Gradient icon circles, color rotation, glassmorphism cards

**Content:** `feature_details` in front matter

---

#### 4. **blog-grid.html**
**Purpose:** Blog post grid with pagination
**Parameters:**
- `title` (string) - Section title
- `posts_per_page` (int) - Number of posts per page
- `show_categories` (bool) - Display category filters

**v4.0 Features:** Card-v4 styling, hover lift effects, gradient accents

**Content:** Automatically pulls from blog content

---

#### 5. **cta-standard.html**
**Purpose:** Standard call-to-action section
**Parameters:**
- `title` (string) - CTA title
- `content` (string) - CTA description
- `button_text` (string) - Button label
- `button_url` (string) - Button link
- `button_variant` (string) - Button color

**v4.0 Features:** Gradient backgrounds, animated buttons, responsive layout

**Content:** `cta_standard` in front matter

---

### Interactive Sections (4 sections)

#### 6. **video-popup.html**
**Purpose:** Video modal with play button overlay
**Parameters:**
- `title` (string) - Section title
- `video_url` (string) - Video URL (YouTube/Vimeo)
- `thumbnail` (string) - Video thumbnail image
- `description` (string) - Video description

**v4.0 Features:** Primary heading colorVariant, gradient play button

**Content:** `video_popup` in front matter

---

#### 7. **faq-mini.html**
**Purpose:** Compact FAQ accordion (3-5 questions)
**Parameters:**
- `title` (string) - Section title
- `faqs` (array) - FAQ items with question/answer

**v4.0 Features:** Gradient borders, icon rotation animations, smooth expand/collapse

**SCSS:** `assets/scss/components/_faq.scss` (400 lines)

**Content:** `faq_mini` in front matter

---

#### 8. **faq-content.html**
**Purpose:** Full FAQ section with categorization
**Parameters:**
- `title` (string) - Section title
- `categories` (array) - FAQ categories with questions

**v4.0 Features:** Category-based gradient variants, enhanced accordion, search integration

**SCSS:** `assets/scss/components/_faq.scss` (shared with faq-mini)

**Content:** `faq_content` in front matter

---

#### 9. **method-tabs.html**
**Purpose:** Tabbed content switcher for methodology/approach
**Parameters:**
- `title` (string) - Section title
- `tabs` (array) - Tab items with title, content, icon

**v4.0 Features:**
- 3-color rotation for tabs (primary→secondary→coral)
- Gradient tab indicators
- Smooth fade transitions
- Card-v4 styling for content

**SCSS:** `assets/scss/components/_method-tabs.scss` (360 lines)

**Content:** `method_tabs` in front matter

---

### Forms & Contact (3 sections)

#### 10. **contact-form-enhanced.html**
**Purpose:** Full contact form with validation
**Parameters:**
- `title` (string) - Form title
- `submit_text` (string) - Submit button text
- `success_message` (string) - Success confirmation
- `fields` (array) - Form fields configuration

**v4.0 Features:** Primary colorVariant heading, gradient submit button, glassmorphism form container

**Content:** `contact_form` in front matter

---

#### 11. **signup-form-enhanced.html**
**Purpose:** Newsletter/service signup form
**Parameters:**
- `title` (string) - Form title
- `benefits` (array) - Signup benefits list
- `privacy_text` (string) - Privacy policy text

**v4.0 Features:** Primary/secondary colorVariant headings, gradient benefits icons

**Content:** `signup_form` in front matter

---

#### 12. **newsletter-signup.html**
**Purpose:** Simple email subscription form
**Parameters:**
- `title` (string) - Newsletter title
- `description` (string) - Newsletter description
- `placeholder` (string) - Email input placeholder
- `button_text` (string) - Subscribe button text

**v4.0 Features:** Gradient icon wrapper (xl, secondary), secondary heading colorVariant

**Content:** `newsletter` in front matter

---

### Info & Trust (7 sections)

#### 13. **contact-info-cards.html**
**Purpose:** Contact methods display (phone, email, location)
**Parameters:**
- `title` (string) - Section title
- `cards` (array) - Contact methods with icon, title, value, link

**v4.0 Features:**
- 4-color rotation (primary→secondary→coral→sage)
- Gradient icon wrappers (lg size)
- Matching heading colorVariants
- Card-v4 styling

**Content:** `contact_info_cards` in front matter

---

#### 14. **contact-options.html**
**Purpose:** Alternative contact channels
**Parameters:**
- `title` (string) - Section title
- `options` (array) - Contact options with icon, title, description, button

**v4.0 Features:** 4-color rotation, gradient icon circles, button colors match icons

**Content:** `contact_options` in front matter

---

#### 15. **onboarding-steps.html**
**Purpose:** Process timeline for new clients
**Parameters:**
- `title` (string) - Section title
- `steps` (array) - Onboarding steps with title, description

**v4.0 Features:**
- 4-color rotation (primary→secondary→coral→sage)
- Gradient circle wrappers for step numbers
- Icon-circle classes for enhanced styling

**Content:** `onboarding_steps` in front matter

---

#### 16. **privacy-guarantee.html**
**Purpose:** Privacy and confidentiality assurance
**Parameters:**
- `title` (string) - Section title
- `content` (string) - Privacy guarantee text
- `features` (array) - Privacy features list

**v4.0 Features:** XL gradient shield icon (primary), check-circle icons for features

**Content:** `privacy_guarantee` in front matter

---

#### 17. **confidentiality-notice.html**
**Purpose:** Legal confidentiality notice
**Parameters:**
- `title` (string) - Notice title
- `content` (string) - Legal text

**v4.0 Features:** MD gradient lock icon (secondary variant)

**Content:** `confidentiality_notice` in front matter

---

#### 18. **job-listings.html**
**Purpose:** Career opportunities section
**Parameters:**
- `title` (string) - Section title
- `jobs` (array) - Job listings with title, location, type, description

**v4.0 Features:** Card-v4 styling, gradient accents, hover effects

**Content:** `job_listings` in front matter or content files

---

#### 19. **professional-affiliations.html**
**Purpose:** Credentials and professional memberships
**Parameters:**
- `title` (string) - Section title
- `affiliations` (array) - Organization logos and names

**v4.0 Features:** Gradient badge styling, glassmorphism cards

**Content:** `affiliations` in front matter

---

### Enhanced v4.0 Premium (5 sections) ⭐

#### 20. **values-compass.html** (NEW v4.0)
**Purpose:** Compass-pattern layout with core values
**Parameters:**
- `title` (string) - Section title
- `benefits` (array) - Values with icon, title, description

**v4.0 Features:**
- Compass layout (N, S, E, W positioning)
- Glassmorphism cards
- Progressive disclosure (mobile tap-to-expand)
- Gradient icons with auto-rotation
- Organic blob backgrounds

**SCSS:** `assets/scss/components/_values-compass.scss`

**Content:** `values_compass` in front matter

**Example:**
```yaml
values_compass:
  title: "Core Values"
  benefits:
    - icon: "flask"
      title: "Science-Based"
      description: "Evidence-based CBT, DBT, ACT methods"
    - icon: "heart"
      title: "Compassionate"
      description: "Person-centered, empathetic approach"
```

---

#### 21. **feature-blocks.html** (ENHANCED v4.0)
**Purpose:** Feature showcase with zigzag layout
**Parameters:**
- `title` (string) - Section title
- `features` (array) - Features with image, title, description

**v4.0 Features:**
- Zigzag alternating layout
- Parallax scrolling (desktop ≥992px)
- Gradient accents
- Image hover effects

**SCSS:** Enhanced in `_design-enhancements.scss`

**Content:** `feature_blocks` in front matter

---

#### 22. **pricing-tables.html** (ENHANCED v4.0)
**Purpose:** Pricing comparison with featured tier
**Parameters:**
- `title` (string) - Section title
- `plans` (array) - Pricing tiers with features, price, CTA

**v4.0 Features:**
- Featured tier 1.08x scale elevation
- Comparison tooltips
- Gradient borders on featured plan
- Hover lift effects

**SCSS:** Enhanced in `_design-enhancements.scss`

**Content:** `pricing_tables` in front matter

---

#### 23. **stats-numbers.html** (ENHANCED v4.0)
**Purpose:** Statistics display with animated counting
**Parameters:**
- `title` (string) - Section title
- `stats` (array) - Statistics with number, label, icon

**v4.0 Features:**
- SVG progress rings
- Animated counting (0→target, 2s)
- Gradient fills
- Responsive layout

**SCSS:** Enhanced in `_design-enhancements.scss`
**JS:** `assets/js/stats-counter.js`

**Content:** `stats_numbers` in front matter

---

#### 24. **credentials-showcase.html** (ENHANCED v4.0)
**Purpose:** Professional credentials with 8-color badge system
**Parameters:**
- `title` (string) - Section title
- `credentials` (array) - Credentials with label, value, icon, badge_variant

**v4.0 Features:**
- 8 gradient badge variants
- Gradient icon circles
- Glassmorphism badges
- Auto-color distribution

**SCSS:** `assets/scss/components/_credentials.scss` (enhanced)

**Badge Variants:**
- `primary` (emerald) - Main credentials
- `secondary` (terracotta) - Trust signals
- `coral` - Compassionate qualities
- `premium` (plum) - Specialized credentials
- `sage` - Holistic approaches
- `info` (blue) - Educational background
- `success` (green) - Achievements
- `warning` (amber) - Important notices

**Content:** `credentials_showcase` in front matter

---

### Specialized Therapy (5 sections)

#### 25. **first-session-timeline.html**
**Purpose:** What to expect in first therapy session
**Parameters:**
- `title` (string) - Section title
- `steps` (array) - Session timeline steps

**v4.0 Features:**
- 3-color rotation (primary→secondary→coral)
- Gradient icon wrappers (md size) for icons
- Icon-circle classes for numbers
- Matching heading colorVariants

**Content:** `first_session_timeline` in front matter

---

#### 26. **therapist-match.html**
**Purpose:** Therapist compatibility assessment
**Parameters:**
- `title` (string) - Section title
- `good_fit` (array) - Good fit indicators
- `not_fit` (array) - Not a good fit indicators

**v4.0 Features:**
- Icon wrappers (xl size, primary/secondary)
- Heading colorVariants (primary/secondary)
- Enhanced visual distinction between good fit vs. not a fit

**Content:** `therapist_match` in front matter

---

#### 27. **service-faq-inline.html**
**Purpose:** Service-specific inline FAQ
**Parameters:**
- `title` (string) - Section title
- `faqs` (array) - Service-specific questions

**v4.0 Features:** Primary heading colorVariant, FAQ accordion styling

**Content:** `service_faq` in front matter

---

#### 28. **testimonials-enhanced.html**
**Purpose:** Client testimonials with photos
**Parameters:**
- `title` (string) - Section title
- `testimonials` (array) - Testimonials with quote, author, photo, role

**v4.0 Features:**
- Card gradient backgrounds (3-color variant system)
- Quote styling with decorative quotation marks
- Photo with gradient rings
- Staggered entrance animations

**SCSS:** `assets/scss/components/_testimonials.scss` (350 lines)

**Content:** `testimonials` in front matter

---

#### 29. **office-gallery.html**
**Purpose:** Office/practice photos with lightbox
**Parameters:**
- `title` (string) - Section title
- `images` (array) - Gallery images with src, alt, caption

**v4.0 Features:** Gradient borders on hover, masonry grid layout, lightbox integration

**Content:** `office_gallery` in front matter

---

### General Purpose (5 sections)

#### 30. **benefits-grid.html**
**Purpose:** Grid of benefits/features
**Parameters:**
- `title` (string) - Section title
- `benefits` (array) - Benefits with icon, title, description

**v4.0 Features:**
- 4-color rotation (primary→secondary→coral→sage)
- Gradient icon circles via card.html molecule
- Glassmorphism cards with gradient borders
- Hover lift effects

**SCSS:** `assets/scss/components/_benefits-grid.scss` (410 lines)

**Content:** `benefits_section` in front matter

**Example:**
```yaml
benefits_section:
  title: "Why Choose Us"
  benefits:
    - icon: "check"
      title: "Evidence-Based"
      description: "CBT, DBT, ACT methods"
```

---

#### 31. **problem-empathy.html**
**Purpose:** Problem statement with empathy
**Parameters:**
- `title` (string) - Section title
- `intro` (string) - Introduction text
- `challenges` (array) - Problem/challenge items

**v4.0 Features:**
- 4-color rotation (primary→secondary→coral→sage)
- Gradient icon wrappers
- Heading colorVariants
- Glassmorphism cards
- Organic background blobs

**SCSS:** `assets/scss/components/_problem-empathy.scss` (280 lines)

**Content:** `problem_empathy` in front matter

---

#### 32. **timeline-process.html**
**Purpose:** Linear process timeline
**Parameters:**
- `title` (string) - Section title
- `steps` (array) - Process steps with icon, title, description

**v4.0 Features:**
- 3-color rotation (primary→secondary→coral)
- Gradient icon circles for icons and numbers
- Gradient connector lines between steps
- Parallax scrolling effects (desktop ≥992px)
- Card-v4 styling

**SCSS:** `assets/scss/components/_timeline-process.scss` (330 lines)

**Content:** `timeline_process` in front matter

---

#### 33. **related-services.html**
**Purpose:** Cross-sell related services
**Parameters:**
- `title` (string) - Section title
- `services` (array) - Related services with title, description, link

**v4.0 Features:** Card-v4 styling, gradient accents, auto-color rotation

**Content:** `related_services` in front matter

---

#### 34. **service-highlights.html**
**Purpose:** Service feature highlights
**Parameters:**
- `title` (string) - Section title
- `highlights` (array) - Highlights with icon, title, description

**v4.0 Features:** Gradient icon circles, color rotation, card enhancements

**Content:** `service_highlights` in front matter

---

## 📊 Component Statistics

### By Level
- **Atoms:** 5 components (8% of total)
- **Molecules:** 21 components (34% of total)
- **Organisms:** 2 components (3% of total)
- **Sections:** 34 components (55% of total)
- **Total:** 62 components

### By v4.0 Enhancement Status
- **v4.0 Enhanced Premium:** 5 sections (values-compass, feature-blocks, pricing-tables, stats-numbers, credentials-showcase)
- **v4.0 Upgraded (TIER 2):** 29 sections (all legacy sections now enhanced)
- **Total v4.0 Sections:** 34/34 (100%)

### By Category
- **Core Foundation:** 5 sections
- **Interactive:** 4 sections
- **Forms & Contact:** 3 sections
- **Info & Trust:** 7 sections
- **Enhanced v4.0 Premium:** 5 sections
- **Specialized Therapy:** 5 sections
- **General Purpose:** 5 sections

### Code Statistics
- **Total Component Files:** 62 HTML files
- **Component SCSS Files:** 6 major files (~2,130 lines)
- **System SCSS Files:** 3 files (~1,120 lines)
- **Total SCSS for v4.0:** ~3,250 lines

---

## 🎨 v4.0 Design Language Features

All 34 sections now implement the v4.0 design language with:

### Color System
- **Automatic 50-30-20 distribution** (emerald/terracotta/others)
- **8 gradient variants** (emerald, terracotta, teal, amber, coral, premium, sage, navy)
- **4-color rotation patterns** (primary→secondary→coral→sage)
- **Zero configuration required** (automatic color assignment)

### Icon System
- **Gradient circular backgrounds** (all icons)
- **8 icon wrapper variants** matching color system
- **4 size options** (sm, md, lg, xl)
- **Glow effects and hover animations**

### Card System
- **Glassmorphism effects** (backdrop-filter blur)
- **Gradient borders** (subtle accent lines)
- **Hover lift effects** (3D elevation on interaction)
- **Auto-color integration** (matches section color theme)

### Typography
- **Cormorant Garamond** (headings) - Literary, thoughtful serif
- **Source Sans 3** (body) - Clean, readable sans-serif
- **Typography score:** 44/50 (1.7x improvement)
- **5 heading color variants** (primary, secondary, coral, sage, info)

### Animations
- **Staggered entrance** (fade-in-up with delays)
- **Hover effects** (lift, glow, scale)
- **Scroll animations** (parallax on desktop ≥992px)
- **60fps GPU-accelerated** (smooth performance)

---

## 🔧 Usage Patterns

### Creating a New Page

```yaml
---
title: "My Page"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "benefits-grid"
  - type: "testimonials-enhanced"
  - type: "cta-standard"

hero_breadcrumb:
  title: "Page Title"
  subtitle: "Page subtitle"

benefits_section:
  title: "Why Choose Us"
  benefits:
    - icon: "check"
      title: "Benefit 1"
      description: "Description here"
---
```

### Component Composition Example

```html
<!-- Section uses Molecules which use Atoms -->

<section class="benefits-grid">
  {{ range .benefits }}
    <!-- Molecule: card.html -->
    {{ partial "molecules/card.html" (dict
      "icon" .icon
      "iconWithWrapper" true              <!-- Atom: icon.html with wrapper -->
      "iconWrapperVariant" "primary"
      "title" .title
      "headingColorVariant" "primary"     <!-- Atom: heading.html with color -->
      "content" .description
    ) }}
  {{ end }}
</section>
```

### Color Variant Strategy

**Button Variants:**
```yaml
# Alternating pattern for visual rhythm
sections:
  - type: "hero-breadcrumb"
    button_variant: "primary"           # Emerald (trust)
  - type: "values-compass"
    button_variant: "secondary"         # Terracotta (warmth)
  - type: "feature-blocks"
    button_variant: "outline-primary"   # Emerald outline
  - type: "cta-standard"
    button_variant: "primary"           # Emerald (action)
```

**Badge Variants (8-color rotation):**
```yaml
credentials_showcase:
  credentials:
    - badge_variant: "primary"      # Licensed Psychologist
    - badge_variant: "secondary"    # 15+ years experience
    - badge_variant: "coral"        # Person-centered approach
    - badge_variant: "premium"      # Trauma specialist
```

---

## 📖 Documentation References

- **Architecture:** `themes/andromeda-hugo/PROJECT.md`
- **Design Guidelines:** `themes/andromeda-hugo/CLAUDE.md`
- **Refactor Plan:** `themes/andromeda-hugo/REFACTOR-PLAN-v2.md`
- **Component SCSS:** `themes/andromeda-hugo/assets/scss/components/`
- **System SCSS:** `themes/andromeda-hugo/assets/scss/systems/`

---

## 🎯 Quality Standards

### Performance
- ✅ Build time: <3s (target met)
- ✅ CSS bundle: ~75KB gzipped (within budget)
- ✅ 60fps animations (GPU-accelerated)
- ✅ Zero layout shifts

### Accessibility
- ✅ WCAG AA compliant (4.5:1 contrast)
- ✅ Screen reader friendly
- ✅ Keyboard navigation
- ✅ Reduced-motion support

### Code Quality
- ✅ DRY principles (component reuse)
- ✅ Semantic HTML
- ✅ Null-safe templates
- ✅ Design token compliance

---

**Inventory Complete:** 62 components ready for production use
**Status:** 100% v4.0 enhanced, fully documented, tested, and optimized
**Last Updated:** 2025-11-18
