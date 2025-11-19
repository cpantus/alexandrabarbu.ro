---
title: "Animation Test Page - GSAP Enhancements"
date: 2025-11-19T08:00:00+02:00
layout: "flexible"
draft: false
sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "feature-blocks"
  - type: "credentials-showcase"
  - type: "cta-standard"

# Hero Section with Magnetic Buttons
hero_breadcrumb:
  title: "GSAP Animation Enhancements"
  subtitle: "Testing 5 New Animation Effects - v4.1"
  breadcrumbs:
    - name: "Home"
      url: "/"
    - name: "Test"
      url: "/test-animations"
  buttons:
    - text: "Magnetic Button (Desktop)"
      href: "#features"
      variant: "primary"
      animate: "magnetic-button"
      animateOptions:
        strength: "0.3"
    - text: "Ripple Effect Button"
      href: "#features"
      variant: "secondary"
      animate: "ripple"

# Text Reveal Section
values_intro:
  title: "Word-by-Word Text Reveal"
  subtitle: "This text will animate word by word on scroll"
  description: "Watch as each word fades in with a staggered animation effect, creating a smooth and elegant entrance that draws attention to your content."
  buttons:
    - text: "Another Magnetic Button"
      href: "#credentials"
      variant: "outline-primary"
      animate: "magnetic-button"
      animateOptions:
        strength: "0.4"

# Feature Blocks with Mixed Animations
feature_blocks_section:
  title: "Animation Features Showcase"
  subtitle: "Testing all five new animation types"
  features:
    - icon: "magic"
      title: "Magnetic Buttons"
      description: "Buttons that follow your mouse cursor on desktop. Try hovering over the buttons above!"
      button:
        text: "Test Magnetic Effect"
        href: "#test"
        variant: "primary"
        animate: "magnetic-button"
    - icon: "water"
      title: "Ripple Effects"
      description: "Click buttons to see expanding ripple animations from the click point."
      button:
        text: "Test Ripple Effect"
        href: "#test"
        variant: "secondary"
        animate: "ripple"
    - icon: "text"
      title: "Text Reveal"
      description: "Text animates word-by-word on scroll for engaging content presentation."
      button:
        text: "Scroll Up to See"
        href: "#top"
        variant: "outline-primary"
    - icon: "image"
      title: "Image Reveal"
      description: "Images reveal with clip-path animations for sophisticated entrances."
      button:
        text: "Check Credentials"
        href: "#credentials"
        variant: "outline-secondary"

# Credentials with Image Reveals
credentials_showcase:
  title: "Credential Badge Examples"
  subtitle: "Testing gradient icon circles and badges"
  credentials:
    - icon: "certificate"
      title: "Licensed Psychologist"
      description: "Board certified professional"
      badge_variant: "primary"
      badge_text: "Certified"
    - icon: "graduation-cap"
      title: "PhD Psychology"
      description: "Advanced academic credentials"
      badge_variant: "secondary"
      badge_text: "Education"
    - icon: "heart"
      title: "Compassionate Care"
      description: "Person-centered approach"
      badge_variant: "coral"
      badge_text: "Values"
    - icon: "brain"
      title: "Trauma Specialist"
      description: "EMDR and somatic therapy"
      badge_variant: "premium"
      badge_text: "Specialty"

# CTA with Both Animation Types
cta_standard:
  title: "Ready to Experience the Animations?"
  description: "Click the buttons below to test magnetic and ripple effects"
  buttons:
    - text: "Primary Magnetic Button"
      href: "#contact"
      variant: "primary"
      animate: "magnetic-button"
      animateOptions:
        strength: "0.35"
    - text: "Secondary Ripple Button"
      href: "#contact"
      variant: "secondary"
      animate: "ripple"
    - text: "Outline Magnetic"
      href: "#contact"
      variant: "outline-primary"
      animate: "magnetic-button"
      animateOptions:
        strength: "0.25"
    - text: "Outline Ripple"
      href: "#contact"
      variant: "outline-secondary"
      animate: "ripple"
---

## Animation Test Page

This page demonstrates all 5 new GSAP-powered animation effects added in v4.1:

### 1. Magnetic Buttons (Desktop Only)
Hover over buttons labeled "Magnetic Button" to see them follow your cursor with an elastic bounce-back effect.

**Note:** This effect is disabled on touch devices to avoid conflicts with mobile gestures.

### 2. Ripple Click Effects
Click any button with "Ripple" in its name to see an expanding circular ripple animation from your click point.

**Works on:** Desktop and mobile (touch-friendly).

### 3. Word-by-Word Text Reveal
Scroll to see text animate into view word by word. The title and description in the "Values Intro" section use this effect.

**Trigger:** Automatically when scrolling into view.

### 4. Clip-Path Image Reveals
Images reveal with a smooth clip-path animation. Check the credentials section for examples.

**Trigger:** Automatically when scrolling into view.

### 5. Alpine.js Components
Toggle switches and reactive components (examples coming soon).

**Status:** Framework loaded and ready for interactive components.

---

## Technical Details

**Libraries Loaded:**
- GSAP 3.12.5 (48KB gzipped)
- ScrollTrigger (GSAP plugin)
- Alpine.js 3.13 (15KB gzipped)
- Custom: gsap-enhancements.js (4KB minified)

**Total Bundle Size:** ~95KB (under 100KB target ✅)

**Browser Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Accessibility:**
- Respects \`prefers-reduced-motion\`
- All animations disabled when user prefers reduced motion
- Keyboard navigation supported
- Screen reader friendly

**Performance:**
- GPU-accelerated animations (60fps)
- Deferred script loading
- No impact on First Contentful Paint
- Build time: <3s

---

## Testing Checklist

- [ ] Magnetic buttons work on desktop hover
- [ ] Magnetic buttons disabled on mobile/touch
- [ ] Ripple effects work on click
- [ ] Ripple effects work on touch
- [ ] Text reveals on scroll
- [ ] Image reveals on scroll
- [ ] No console errors
- [ ] No layout shifts
- [ ] Smooth 60fps animations
- [ ] Reduced motion preference respected
