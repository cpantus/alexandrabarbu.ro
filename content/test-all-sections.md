---
title: "Complete System Test - All Sections"
description: "Comprehensive test page demonstrating all 16 available section types"
date: 2025-11-14
draft: false
layout: "flexible"

sections:
  # 1. Hero with breadcrumb (always rendered first)
  - type: "hero-breadcrumb"
    enable: true

  # 2. Values intro section
  - type: "values-intro"
    enable: true

  # 3. Feature blocks (alternating layout)
  - type: "feature-blocks"
    enable: true

  # 4. Feature details
  - type: "feature-details"
    enable: true

  # 5. Benefits grid (icon cards)
  - type: "benefits-grid"
    enable: true

  # 6. Video popup section
  - type: "video-popup"
    enable: true

  # 7. Pricing tables with toggle
  - type: "pricing-tables"
    enable: true

  # 8. FAQ mini section
  - type: "faq-mini"
    enable: true

  # 9. Contact form enhanced
  - type: "contact-form-enhanced"
    enable: true

  # 10. Contact info cards
  - type: "contact-info-cards"
    enable: true

  # 11. Onboarding steps
  - type: "onboarding-steps"
    enable: true

  # 12. Privacy guarantee
  - type: "privacy-guarantee"
    enable: true

  # 13. Confidentiality notice
  - type: "confidentiality-notice"
    enable: true

  # 14. Signup form enhanced
  - type: "signup-form-enhanced"
    enable: true

  # 15. Job listings (if you have career sections)
  - type: "job-listings"
    enable: false

  # 16. CTA standard
  - type: "cta-standard"
    enable: true

# Test data for sections
hero:
  title: "System Test Page"
  subtitle: "All 16 Section Types"
  breadcrumb_text: "Test"

values_intro:
  title: "Values Intro Test"
  subtitle: "Testing Section 2"
  description: "This section tests the values-intro component with image and text layout."
  image: "/images/about/01.jpg"
  list:
    - "Feature one"
    - "Feature two"
    - "Feature three"

feature_blocks:
  title: "Feature Blocks Test"
  subtitle: "Testing Section 3"
  blocks:
    - title: "Block 1"
      description: "Testing alternating layout"
      image: "/images/about/02.jpg"
    - title: "Block 2"
      description: "Testing reverse layout"
      image: "/images/about/03.jpg"

feature_details:
  title: "Feature Details Test"
  subtitle: "Testing Section 4"
  features:
    - icon: "check-circle"
      title: "Feature 1"
      description: "Testing feature cards"
    - icon: "shield-alt"
      title: "Feature 2"
      description: "Testing icon display"
    - icon: "star"
      title: "Feature 3"
      description: "Testing grid layout"

benefits_section:
  title: "Benefits Grid Test"
  subtitle: "Testing Section 5"
  description: "Testing the benefits grid with icon cards"
  benefits:
    - icon: "las la-check-circle"
      title: "Benefit 1"
    - icon: "las la-heart"
      title: "Benefit 2"
    - icon: "las la-star"
      title: "Benefit 3"
    - icon: "las la-shield-alt"
      title: "Benefit 4"

video_section:
  title: "Video Popup Test"
  subtitle: "Testing Section 6"
  description: "Testing video embed component"
  video_id: "dyZcRRWiuuw"
  thumbnail: "/images/about/video-popup.jpg"

pricing_section:
  title: "Pricing Tables Test"
  subtitle: "Testing Section 7"
  toggle:
    monthly: "Monthly"
    yearly: "Yearly"
  plans:
    - title: "Basic"
      currency: "$"
      price_monthly: 29
      price_yearly: 290
      features:
        - "Feature 1"
        - "Feature 2"
        - "Feature 3"
      button_text: "Choose Plan"
    - title: "Pro"
      currency: "$"
      price_monthly: 59
      price_yearly: 590
      featured: true
      features:
        - "All Basic features"
        - "Feature 4"
        - "Feature 5"
      button_text: "Choose Plan"

faq_section:
  title: "FAQ Mini Test"
  subtitle: "Testing Section 8"
  faqs:
    - question: "Test question 1?"
      answer: "Test answer 1"
    - question: "Test question 2?"
      answer: "Test answer 2"
    - question: "Test question 3?"
      answer: "Test answer 3"

contact_form:
  title: "Contact Form Test"
  subtitle: "Testing Section 9"
  description: "Testing enhanced contact form with validation"

contact_info:
  title: "Contact Info Test"
  subtitle: "Testing Section 10"
  cards:
    - icon: "phone"
      title: "Phone"
      content: "+1 234 567 8900"
    - icon: "envelope"
      title: "Email"
      content: "test@example.com"
    - icon: "map-marker"
      title: "Address"
      content: "123 Test Street"

onboarding:
  title: "Onboarding Steps Test"
  subtitle: "Testing Section 11"
  steps:
    - title: "Step 1"
      description: "First step description"
    - title: "Step 2"
      description: "Second step description"
    - title: "Step 3"
      description: "Third step description"

privacy_section:
  title: "Privacy Guarantee Test"
  subtitle: "Testing Section 12"
  content: "Testing privacy guarantee section content and layout."

confidentiality:
  title: "Confidentiality Notice Test"
  subtitle: "Testing Section 13"
  content: "Testing confidentiality notice section content and layout."

signup_form:
  title: "Signup Form Test"
  subtitle: "Testing Section 14"
  description: "Testing enhanced signup form with validation"

cta:
  title: "Call to Action Test"
  subtitle: "Testing Section 16"
  button_text: "Get Started"
  button_url: "/contact/"
---

This is a comprehensive test page demonstrating all available section types in the flexible layout system.
