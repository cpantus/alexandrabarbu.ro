---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: false
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "feature-blocks"
  - type: "first-session-timeline"
  - type: "pricing-tables"
  - type: "testimonials-enhanced"
  - type: "service-faq-inline"
  - type: "contact-form-enhanced"

# Hero Breadcrumb
hero_breadcrumb:
  title: "{{ replace .Name "-" " " | title }}"
  subtitle: "Evidence-Based Therapy"
  background: "light"
  show_breadcrumb: true

# Service Introduction
values_intro:
  enable: true
  title: "Service Overview"
  description: "Brief description of what this service offers and who it helps."
  intro_text: |
    Detailed description of the service approach, methods, and benefits.

  values:
    - title: "Evidence-Based"
      description: "Research-supported therapeutic approaches"
      icon: "microscope"

    - title: "Personalized Care"
      description: "Tailored treatment plans for individual needs"
      icon: "user-circle"

    - title: "Professional Support"
      description: "Experienced, licensed therapist guidance"
      icon: "award"

# Service Features
feature_blocks:
  - title: "Feature 1"
    subtitle: "Key benefit"
    description: "Description of this service feature and its benefits."
    image: "images/services/feature-1.jpg"

  - title: "Feature 2"
    subtitle: "Key benefit"
    description: "Description of this service feature and its benefits."
    image: "images/services/feature-2.jpg"

# First Session
first_session_timeline:
  enable: true
  title: "What to Expect in Your First Session"
  subtitle: "First Session Guide"
  description: "A clear overview of the first therapy session process."

  timeline:
    - number: 1
      title: "Initial Assessment"
      description: "We'll discuss your concerns and goals"
      duration: "15 minutes"

    - number: 2
      title: "History & Background"
      description: "Understanding your story and context"
      duration: "15 minutes"

    - number: 3
      title: "Treatment Planning"
      description: "Developing your personalized approach"
      duration: "15 minutes"

    - number: 4
      title: "Next Steps"
      description: "Scheduling and practical arrangements"
      duration: "5 minutes"

# Pricing
pricing_tables:
  enable: true
  title: "Session Pricing"
  subtitle: "Transparent Pricing"
  default_yearly: false

  plans:
    - name: "Single Session"
      price_monthly: 250
      price_yearly: null
      description: "Pay per session - flexible scheduling"
      features:
        - "50-minute session"
        - "Evidence-based therapy"
        - "Personalized approach"
      button_text: "Book Session"
      button_url: "/contact/"
      featured: false

    - name: "Package (5 Sessions)"
      price_monthly: 225
      price_yearly: null
      description: "Save 10% with package deal"
      features:
        - "5 × 50-minute sessions"
        - "All Single Session benefits"
        - "10% discount"
      button_text: "Get Package"
      button_url: "/contact/"
      featured: true

# Testimonials
testimonials_enhanced:
  enable: true
  title: "Client Experiences"
  subtitle: "Success Stories"

  testimonials:
    - quote: "This therapy changed my life. I feel more confident and at peace."
      author: "A.M."
      role: "Client"
      rating: 5
      verified: true
      outcome: "Reduced anxiety by 70%"

# FAQ
service_faq_inline:
  enable: true
  title: "Frequently Asked Questions"
  subtitle: "Common Questions"

  faqs:
    - question: "How long is each session?"
      answer: "Each session is 50 minutes long."
      icon: "clock"

    - question: "How many sessions will I need?"
      answer: "This varies by individual goals and needs. We'll discuss this in your first session."
      icon: "question-circle"

# Contact Form
contact_form:
  enable: true
  title: "Ready to Get Started?"
  subtitle: "Book Your First Session"
  description: "Contact us to schedule your initial consultation."
---

## Additional Information

Add any additional markdown content here.
