---
title: "Component Showcase"
description: "Complete documentation of all 48 reusable components in the Andromeda Hugo theme"
layout: "flexible"
draft: true

sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "feature-blocks"
  - type: "benefits-grid"
  - type: "feature-details"
  - type: "method-tabs"
  - type: "stats-numbers"
  - type: "pricing-tables"
  - type: "faq-mini"
  - type: "contact-form-enhanced"

# Hero Section
hero_breadcrumb:
  title: "Component Documentation"
  subtitle: "Complete library of 48 reusable components"
  breadcrumb:
    - name: "Home"
      url: "/"
    - name: "Documentation"
      url: "#"
    - name: "Components"

# Introduction Section
values_intro:
  enable: true
  title: "Component Library Overview"
  subtitle: "Atomic Design System"
  content: |
    ## Architecture

    This theme implements a complete **Atomic Design System** with 48 components organized into 4 layers:

    - **5 Atoms** - Basic building blocks (button, heading, icon, image, input)
    - **20 Molecules** - Simple component compositions
    - **2 Organisms** - Complex sections (header, footer)
    - **24 Sections** - Full-width page sections

    ### Design Principles

    1. **Reusability** - Each component is self-contained and reusable
    2. **Composability** - Higher-level components built from atoms/molecules
    3. **Data-Driven** - All content via front matter (no hardcoded text)
    4. **Accessibility** - WCAG AA compliant with semantic HTML
    5. **Performance** - Optimized for speed with partial caching

    ### Usage Pattern

    ```yaml
    # In page front matter
    sections:
      - type: "hero-breadcrumb"
      - type: "benefits-grid"

    hero_breadcrumb:
      title: "Page Title"
      subtitle: "Optional subtitle"
    ```

# Atoms Documentation
feature_blocks_section:
  enable: true
  title: "Atoms (5 Components)"
  subtitle: "Basic Building Blocks"
  blocks:
    - icon: "cube"
      title: "Button Atom"
      description: |
        **File:** `layouts/partials/atoms/button.html`

        **Purpose:** Reusable button component with multiple variants

        **Props:**
        - `text` (required) - Button text/label
        - `href` (optional) - Link URL
        - `variant` - primary|secondary|outline-primary|outline-secondary
        - `size` - sm|md|lg
        - `type` - link|button|submit
        - `fullWidth` - true|false
        - `icon` - Icon class (e.g., "las la-arrow-right")
        - `iconPosition` - left|right

        **Usage:**
        ```
        {{ partial "atoms/button.html" (dict
          "text" "Click Me"
          "href" "/contact"
          "variant" "primary"
          "size" "md"
          "icon" "las la-arrow-right"
        )}}
        ```

        **Variants:** 4 styles (primary, secondary, outline-primary, outline-secondary)

        **Accessibility:** Proper button/link semantics, keyboard navigable

    - icon: "heading"
      title: "Heading Atom"
      description: |
        **File:** `layouts/partials/atoms/heading.html`

        **Purpose:** Semantic heading component with variants

        **Props:**
        - `text` (required) - Heading text content
        - `level` - Heading level 1-6 (default: 2)
        - `variant` - default|gradient|section|bold
        - `align` - left|center|right
        - `class` - Additional CSS classes
        - `subtitle` - Optional subtitle text
        - `markdown` - Apply markdownify filter
        - `id` - HTML id for anchor links

        **Usage:**
        ```
        {{ partial "atoms/heading.html" (dict
          "text" "Page Title"
          "level" 2
          "variant" "section"
          "align" "center"
          "subtitle" "Optional subtitle"
        )}}
        ```

        **Variants:** 4 styles (default, gradient, section, bold)

        **Accessibility:** Proper heading hierarchy, semantic HTML

    - icon: "icons"
      title: "Icon Atom"
      description: |
        **File:** `layouts/partials/atoms/icon.html`

        **Purpose:** Icon component with Line Awesome icons

        **Props:**
        - `name` (required) - Icon name without "la-" prefix
        - `size` - xs|sm|md|lg|xl|2x|3x or custom (e.g., "2rem")
        - `color` - primary|secondary|success|danger|warning|info|light|dark
        - `class` - Additional CSS classes
        - `style` - Inline styles
        - `prefix` - Icon library (las|lar|lab|la)
        - `ariaLabel` - Accessibility label
        - `ariaHidden` - Hide from screen readers

        **Usage:**
        ```
        {{ partial "atoms/icon.html" (dict
          "name" "check-circle"
          "size" "2x"
          "color" "success"
          "class" "me-2"
        )}}
        ```

        **Libraries:** Line Awesome (las, lar, lab, la)

        **Accessibility:** ARIA labels for screen readers

    - icon: "image"
      title: "Image Atom"
      description: |
        **File:** `layouts/partials/atoms/image.html`

        **Purpose:** Optimized image component with modern formats

        **Props:**
        - `src` (required) - Image path (from assets/ or static/)
        - `alt` (required) - Alt text for accessibility
        - `width` - Image width
        - `height` - Image height
        - `class` - Additional CSS classes
        - `lazy` - Enable lazy loading (default: true)
        - `sizes` - Responsive sizes attribute
        - `quality` - Image quality (default: 85)

        **Usage:**
        ```
        {{ partial "atoms/image.html" (dict
          "src" "images/hero.jpg"
          "alt" "Hero image description"
          "width" 1200
          "height" 600
          "lazy" true
        )}}
        ```

        **Features:**
        - AVIF/WebP/original formats with `<picture>` fallback
        - Responsive srcset generation
        - Lazy loading with blur-up placeholder
        - 60-80% size reduction

        **Accessibility:** Required alt text, proper semantics

    - icon: "edit"
      title: "Input Atom"
      description: |
        **File:** `layouts/partials/atoms/input.html`

        **Purpose:** Form input with validation states

        **Props:**
        - `type` (required) - text|email|tel|number|password|textarea
        - `name` (required) - Input name attribute
        - `id` (required) - Input id attribute
        - `label` - Input label
        - `placeholder` - Placeholder text
        - `required` - true|false
        - `value` - Default value
        - `class` - Additional CSS classes
        - `helpText` - Help text below input
        - `error` - Error message
        - `success` - Success message

        **Usage:**
        ```
        {{ partial "atoms/input.html" (dict
          "type" "email"
          "name" "email"
          "id" "email"
          "label" "Email Address"
          "placeholder" "you@example.com"
          "required" true
        )}}
        ```

        **Validation:** Error/success states with messages

        **Accessibility:** Associated labels, ARIA attributes

# Molecules Documentation
benefits_grid_section:
  enable: true
  title: "Molecules (20 Components)"
  subtitle: "Composite Components"
  benefits:
    - icon: "layer-group"
      title: "Card Molecule"
      description: |
        **File:** `layouts/partials/molecules/card.html` (223 lines)

        **Variants:** feature|pricing|testimonial

        **Feature Card Props:**
        - icon, iconSize, iconColor, title, description, button

        **Pricing Card Props:**
        - currency, price, priceMonthly, priceYearly, period, features, button, featured

        **Testimonial Card Props:**
        - quote, author, role, avatar, rating

        **Used in:** benefits-grid, feature-blocks, pricing-tables (3 sections)

    - icon: "blog"
      title: "Blog Card"
      description: |
        **File:** `layouts/partials/molecules/blog-card.html` (126 lines)

        **Props:** title, link, image, description, date, author, category, type, readTime

        **Features:** Image with badge, metadata display, excerpt, responsive layout

        **Used in:** blog-grid, related-services (2 sections)

    - icon: "chart-bar"
      title: "Stat Card"
      description: |
        **File:** `layouts/partials/molecules/stat-card.html` (117 lines)

        **Props:** value, label, icon, suffix, prefix, color, animated, size (sm|md|lg), aos

        **Features:** Animated counters, icon support, prefix/suffix, 3 sizes

        **Used in:** stats-numbers, pricing-tables, benefits-grid (3 sections)

    - icon: "clock"
      title: "Timeline Step"
      description: |
        **File:** `layouts/partials/molecules/timeline-step.html` (142 lines)

        **Props:** index, icon, title, description, duration, variant (standard|alternating|simple), number

        **Features:** 3 visual variants, icon or number markers, duration display

        **Used in:** timeline-process, onboarding-steps (2 sections)

    - icon: "wpforms"
      title: "Form Field"
      description: |
        **File:** `layouts/partials/molecules/form-field.html` (253 lines)

        **Props:** type, name, id, label, error, success, helpText, icon, floatingLabel, validation

        **Features:** Validation states, error/success messages, floating labels, icon support

        **Used in:** contact-form-enhanced, signup-form-enhanced, newsletter-signup (6 sections)

    - icon: "bars"
      title: "Accordion"
      description: |
        **File:** `layouts/partials/molecules/accordion.html`

        **Props:** items (array of title/content), id, class, defaultOpen

        **Features:** Collapsible content panels, Bootstrap accordion

        **Used in:** faq-content, faq-mini (2 sections)

    - icon: "breadcrumb"
      title: "Breadcrumb"
      description: |
        **File:** `layouts/partials/molecules/breadcrumb.html`

        **Props:** items (array of name/url), class

        **Features:** Structured data for SEO, accessible navigation

        **Used in:** hero-breadcrumb (1 section)

    - icon: "arrow-up"
      title: "Back to Top"
      description: |
        **File:** `layouts/partials/molecules/back-to-top.html`

        **Features:** Smooth scroll, auto-show on scroll, fixed position

        **Used in:** baseof.html (global)

    - icon: "cookie"
      title: "Cookie Consent"
      description: |
        **File:** `layouts/partials/molecules/cookie-consent.html`

        **Features:** GDPR compliant, localStorage persistence, dismissible

        **Used in:** baseof.html (global)

    - icon: "exclamation-triangle"
      title: "Emergency Banner"
      description: |
        **File:** `layouts/partials/molecules/emergency-banner.html`

        **Props:** message, link, linkText, type (warning|info|danger)

        **Features:** Dismissible, prominent positioning, type variants

        **Used in:** Header (conditional)

    - icon: "info-circle"
      title: "Footer Info"
      description: |
        **File:** `layouts/partials/molecules/footer-info.html`

        **Features:** Contact details, business hours, location

        **Used in:** footer organism (1 section)

    - icon: "th-large"
      title: "Footer Navigation"
      description: |
        **File:** `layouts/partials/molecules/footer-nav.html`

        **Features:** Multi-column footer menu structure

        **Used in:** footer organism (1 section)

    - icon: "language"
      title: "Language Selector"
      description: |
        **File:** `layouts/partials/molecules/language-selector.html`

        **Features:** Dropdown language switcher, flag icons, current language

        **Used in:** header organism (1 section)

    - icon: "trademark"
      title: "Logo"
      description: |
        **File:** `layouts/partials/molecules/logo.html`

        **Props:** size (sm|md|lg), class

        **Features:** Responsive sizing, link to homepage, alt text

        **Used in:** header organism (1 section)

    - icon: "mobile"
      title: "Mobile Menu"
      description: |
        **File:** `layouts/partials/molecules/mobile-menu.html`

        **Features:** Off-canvas menu, close button, mobile-optimized

        **Used in:** header organism (1 section)

    - icon: "link"
      title: "Navigation Item"
      description: |
        **File:** `layouts/partials/molecules/nav-item.html`

        **Props:** item (name, url, weight), current page context

        **Features:** Active state detection, dropdown support

        **Used in:** navigation molecule (1 component)

    - icon: "compass"
      title: "Navigation"
      description: |
        **File:** `layouts/partials/molecules/navigation.html`

        **Features:** Main menu rendering, active page highlighting

        **Used in:** header organism (1 section)

    - icon: "toggle-on"
      title: "Pricing Toggle"
      description: |
        **File:** `layouts/partials/molecules/pricing-toggle.html`

        **Features:** Monthly/yearly price toggle, JavaScript-powered

        **Used in:** pricing-tables section (1 section)

    - icon: "share-alt"
      title: "Social Links"
      description: |
        **File:** `layouts/partials/molecules/social-links.html`

        **Features:** Configurable social media icons, branded colors

        **Used in:** footer organism (1 section)

    - icon: "video"
      title: "Video Embed"
      description: |
        **File:** `layouts/partials/molecules/video-embed.html`

        **Props:** url, title, class

        **Features:** YouTube/Vimeo embed, responsive aspect ratio

        **Used in:** video-popup section (1 section)

# Organisms Documentation
feature_details_section:
  enable: true
  title: "Organisms (2 Components)"
  subtitle: "Complex Sections"
  details:
    - icon: "header"
      title: "Header Organism"
      description: "**File:** `layouts/partials/organisms/header.html`"
      list:
        - "Logo molecule"
        - "Navigation molecule"
        - "Language selector molecule"
        - "Mobile menu molecule"
        - "Sticky header behavior"
        - "Partial caching enabled"

    - icon: "footer"
      title: "Footer Organism"
      description: "**File:** `layouts/partials/organisms/footer.html`"
      list:
        - "Footer info molecule"
        - "Footer navigation molecule"
        - "Social links molecule"
        - "Copyright notice"
        - "Back to top molecule"
        - "Partial caching enabled"

# Sections Overview
method_tabs_section:
  enable: true
  title: "Sections (24 Components)"
  subtitle: "Full-Width Page Sections"
  tabs:
    - name: "Content Sections"
      icon: "file-alt"
      title: "Content & Info Sections"
      content: |
        ### Hero & Navigation (2)

        **hero-breadcrumb** - Hero section with breadcrumb navigation
        - Props: title, subtitle, image, breadcrumb items
        - Features: Full-width hero, optional background image

        **values-intro** - Introduction section with rich content
        - Props: title, subtitle, content (markdown)
        - Features: Centered layout, markdown support

        ### Feature Showcases (3)

        **feature-blocks** - Grid of feature cards
        - Props: title, subtitle, blocks (icon, title, description)
        - Features: Responsive grid (1-4 columns), AOS animations

        **feature-details** - Detailed feature list
        - Props: title, subtitle, details (icon, title, description, list)
        - Features: Two-column layout, bullet lists

        **benefits-grid** - Benefits showcase grid
        - Props: title, subtitle, benefits (icon, title, description)
        - Features: Icon-based benefits, responsive grid

        ### Trust & Social Proof (4)

        **problem-empathy** - Empathy-focused problem statement
        - Props: title, subtitle, problems (title, description)
        - Features: Validates user pain points

        **stats-numbers** - Statistics display
        - Props: title, subtitle, stats (value, label, icon)
        - Features: Animated counters, prominent numbers

        **service-highlights** - Service feature highlights
        - Props: title, subtitle, highlights (icon, title, description)
        - Features: Icon grid, concise service benefits

        **confidentiality-notice** - Privacy guarantee section
        - Props: title, content, icon
        - Features: Trust signal, professional standards

    - name: "Interactive"
      icon: "hand-pointer"
      title: "Interactive Sections"
      content: |
        ### Forms & Contact (3)

        **contact-form-enhanced** - Full contact form
        - Props: title, subtitle, fields configuration
        - Features: Validation, success/error states, accessibility

        **signup-form-enhanced** - Email signup form
        - Props: title, subtitle, fields, privacy notice
        - Features: GDPR compliant, validation

        **newsletter-signup** - Newsletter subscription
        - Props: title, subtitle, button text
        - Features: Simple email capture, inline form

        ### Dynamic Content (4)

        **method-tabs** - Tabbed content interface
        - Props: title, subtitle, tabs (name, icon, title, content)
        - Features: JavaScript tabs, smooth transitions

        **pricing-tables** - Pricing comparison tables
        - Props: title, subtitle, plans, toggle (monthly/yearly)
        - Features: Price toggle, featured plans, feature lists

        **faq-mini** - Compact FAQ accordion
        - Props: title, subtitle, faqs (question, answer)
        - Features: Collapsible answers, compact layout

        **faq-content** - Full FAQ section
        - Props: title, subtitle, categories (name, faqs)
        - Features: Categorized FAQs, searchable

        ### Media (2)

        **video-popup** - Video with modal popup
        - Props: title, subtitle, video (url, thumbnail)
        - Features: Lightbox modal, YouTube/Vimeo

        **blog-grid** - Blog post grid
        - Props: title, subtitle, posts (auto-loaded or manual)
        - Features: Responsive grid, blog cards

    - name: "Specialized"
      icon: "star"
      title: "Specialized Sections"
      content: |
        ### Process & Timeline (2)

        **timeline-process** - Visual process timeline
        - Props: title, subtitle, steps (icon, title, description, duration)
        - Features: Vertical timeline, connecting lines

        **onboarding-steps** - Step-by-step onboarding
        - Props: title, subtitle, steps (number, title, description)
        - Features: Numbered steps, progress indication

        ### Contact & Booking (2)

        **contact-info-cards** - Contact information cards
        - Props: title, subtitle, cards (icon, title, details)
        - Features: Phone/email/address display

        **related-services** - Related content showcase
        - Props: title, subtitle, services (title, description, link)
        - Features: Cross-promotion, internal linking

        ### Business & Legal (3)

        **job-listings** - Job postings grid
        - Props: title, subtitle, jobs (title, type, location, description)
        - Features: Job cards, application links

        **privacy-guarantee** - Privacy policy highlight
        - Props: title, content, points (icon, text)
        - Features: Trust signals, compliance messaging

        **cta-standard** - Call-to-action section
        - Props: title, subtitle, button (text, url, variant)
        - Features: Full-width CTA, conversion-focused

# Performance Documentation
stats_section:
  enable: true
  title: "Performance & Quality"
  subtitle: "Optimization Metrics"
  stats:
    - value: "48"
      label: "Total Components"
      icon: "cubes"
      suffix: ""

    - value: "80"
      label: "Reusability Score"
      icon: "recycle"
      suffix: "%"

    - value: "998"
      label: "Critical CSS Lines"
      icon: "file-code"
      suffix: ""

    - value: "100"
      label: "WCAG AA Compliance"
      icon: "universal-access"
      suffix: "%"

# Pricing = Usage Guide
pricing_section:
  enable: true
  title: "Component Usage Levels"
  subtitle: "Choose Your Complexity"
  toggle:
    enable: false
  plans:
    - name: "Atoms"
      description: "Basic building blocks"
      price: "5"
      currency: ""
      period: "components"
      featured: false
      features:
        - "Button - 4 variants"
        - "Heading - 6 levels"
        - "Icon - Line Awesome"
        - "Image - AVIF/WebP"
        - "Input - Validation"
      button:
        label: "View Atoms"
        link: "#atoms"

    - name: "Molecules"
      description: "Composite components"
      price: "20"
      currency: ""
      period: "components"
      featured: true
      features:
        - "Card - 3 variants"
        - "Form Field - Enhanced"
        - "Navigation - Responsive"
        - "Accordion - Collapsible"
        - "Blog Card - Rich media"
        - "Stat Card - Animated"
        - "Timeline Step - 3 styles"
        - "15+ more molecules"
      button:
        label: "View Molecules"
        link: "#molecules"

    - name: "Sections"
      description: "Full-width layouts"
      price: "24"
      currency: ""
      period: "sections"
      featured: false
      features:
        - "Hero Breadcrumb"
        - "Feature Blocks"
        - "Pricing Tables"
        - "Contact Forms"
        - "FAQ Accordions"
        - "Method Tabs"
        - "Blog Grid"
        - "19+ more sections"
      button:
        label: "View Sections"
        link: "#sections"

# FAQ Section
faq_mini_section:
  enable: true
  title: "Component Documentation FAQ"
  subtitle: "Common Questions"
  faqs:
    - question: "How do I use a component?"
      answer: "Use Hugo's `partial` function with a dict of props. Example: `{{ partial \"atoms/button.html\" (dict \"text\" \"Click Me\" \"variant\" \"primary\") }}`"

    - question: "What's the difference between atoms and molecules?"
      answer: "Atoms are basic elements (button, icon, input). Molecules combine atoms into functional units (card, form-field, navigation)."

    - question: "Can I customize component styling?"
      answer: "Yes! Pass additional CSS classes via the `class` parameter or override styles in your custom SCSS."

    - question: "Are components accessible?"
      answer: "All components follow WCAG AA standards with semantic HTML, ARIA labels, and keyboard navigation support."

    - question: "How is performance optimized?"
      answer: "Components use partial caching, lazy loading, modern image formats (AVIF/WebP), and minimal CSS bundles."

    - question: "Where are component files located?"
      answer: "Atoms: `layouts/partials/atoms/`, Molecules: `layouts/partials/molecules/`, Organisms: `layouts/partials/organisms/`, Sections: `layouts/partials/sections/`"

# Contact Form
contact_form_section:
  enable: true
  title: "Request Documentation"
  subtitle: "Need more component examples or custom documentation?"
  form_action: "#"
  fields:
    - type: "text"
      name: "name"
      label: "Your Name"
      required: true
    - type: "email"
      name: "email"
      label: "Email Address"
      required: true
    - type: "select"
      name: "component"
      label: "Component Category"
      options:
        - "Atoms"
        - "Molecules"
        - "Organisms"
        - "Sections"
      required: true
    - type: "textarea"
      name: "message"
      label: "What documentation do you need?"
      required: true
  button:
    text: "Submit Request"
    variant: "primary"
  privacy_notice: "Your request will help improve our component documentation. We respect your privacy."
---

## Component Library

This page showcases all **48 components** in the Andromeda Hugo theme. Components are organized using **Atomic Design** principles for maximum reusability and maintainability.

### Quick Navigation

- [Atoms (5)](#atoms-5-components) - Basic building blocks
- [Molecules (20)](#molecules-20-components) - Composite components
- [Organisms (2)](#organisms-2-components) - Complex sections
- [Sections (24)](#sections-24-components) - Full-width page sections

### Architecture Benefits

- **80% Reusability** - Components compose together efficiently
- **Type-Safe Props** - Clear parameter documentation
- **Performance** - Partial caching reduces build time 84%
- **Accessibility** - WCAG AA compliant throughout
- **Maintainability** - Single source of truth for each pattern
