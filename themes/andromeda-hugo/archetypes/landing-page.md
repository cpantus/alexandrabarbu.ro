---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: true
layout: "flexible"

sections:
  # Hero section with CTA
  - type: "hero-cta"
    enable: true
    title: "{{ replace .Name "-" " " | title }}"
    subtitle: "Transform Your Life"
    description: "Compelling value proposition goes here"
    image: ""
    button:
      enable: true
      label: "Get Started"
      link: "#signup"
    secondary_button:
      enable: true
      label: "Learn More"
      link: "#features"

  # Social proof / Stats
  - type: "stats"
    enable: true
    stats:
      - number: "1000+"
        label: "Happy Clients"
      - number: "15+"
        label: "Years Experience"
      - number: "98%"
        label: "Satisfaction Rate"
      - number: "50+"
        label: "Therapy Techniques"

  # Benefits overview
  - type: "benefits-grid"
    enable: true
    title: "Why Choose Us"
    subtitle: "Benefits"
    description: "Discover what makes our approach unique and effective"
    benefits:
      - icon: "user-md"
        title: "Expert Guidance"
        description: "Work with experienced, licensed professionals"
      - icon: "heart"
        title: "Personalized Care"
        description: "Tailored approach for your unique needs"
      - icon: "clock"
        title: "Flexible Schedule"
        description: "Convenient appointment times"
      - icon: "shield-check"
        title: "Confidential"
        description: "Safe, private, and secure environment"

  # Feature showcase
  - type: "feature-details"
    enable: true
    title: "How It Works"
    subtitle: "Simple Process"
    features:
      - icon: "calendar-check"
        title: "1. Book Consultation"
        description: "Schedule your initial consultation online or by phone"
      - icon: "clipboard-list"
        title: "2. Assessment"
        description: "We'll assess your needs and create a personalized plan"
      - icon: "hands-helping"
        title: "3. Begin Sessions"
        description: "Start your journey with regular, supportive sessions"
      - icon: "chart-line"
        title: "4. Track Progress"
        description: "Monitor improvements and celebrate milestones"

  # Testimonials
  - type: "testimonials-slider"
    enable: true
    title: "What Our Clients Say"
    subtitle: "Testimonials"
    testimonials:
      - quote: "Life-changing experience. I finally have the tools I need."
        author: "Sarah M."
        role: "Individual Client"
        rating: 5
        avatar: ""
      - quote: "Professional, caring, and incredibly effective approach."
        author: "John D."
        role: "Couples Client"
        rating: 5
        avatar: ""
      - quote: "I wish I had started therapy here years ago!"
        author: "Maria L."
        role: "Family Client"
        rating: 5
        avatar: ""

  # Pricing
  - type: "pricing-tables"
    enable: true
    title: "Transparent Pricing"
    subtitle: "Choose Your Plan"
    monthly_yearly_toggle: "toggle"
    offer: "Special: 20% off first month"
    pricing_card:
      - name: "Individual"
        currency: "$"
        monthly_price: "120"
        yearly_price: "1200"
        content: "One-on-one sessions"
        services:
          - "Weekly 50-minute sessions"
          - "Personalized treatment plan"
          - "Email support between sessions"
          - "Progress tracking"
        button_label: "Get Started"
        button_link: "#signup"
        featured: false

      - name: "Couples"
        currency: "$"
        monthly_price: "180"
        yearly_price: "1800"
        content: "Relationship therapy"
        services:
          - "Weekly 60-minute sessions"
          - "Couples assessment"
          - "Communication exercises"
          - "Homework assignments"
          - "Progress monitoring"
        button_label: "Get Started"
        button_link: "#signup"
        featured: true

      - name: "Family"
        currency: "$"
        monthly_price: "200"
        yearly_price: "2000"
        content: "Family counseling"
        services:
          - "Weekly 75-minute sessions"
          - "Family dynamics assessment"
          - "Conflict resolution strategies"
          - "Individual check-ins"
          - "Resource library access"
        button_label: "Get Started"
        button_link: "#signup"
        featured: false

  # FAQ
  - type: "faq-mini"
    enable: true
    title: "Frequently Asked Questions"
    subtitle: "FAQ"
    faq:
      - question: "Do you accept insurance?"
        answer: "Yes, we accept most major insurance plans. Contact us to verify your coverage."
      - question: "What if I need to cancel?"
        answer: "We require 24-hour notice for cancellations. Please review our cancellation policy."
      - question: "Are sessions confidential?"
        answer: "Absolutely. Confidentiality is a cornerstone of therapy, with few legal exceptions."
      - question: "Can I switch plans?"
        answer: "Yes, you can adjust your therapy plan at any time to better suit your needs."

  # Signup form
  - type: "signup-form-enhanced"
    enable: true
    title: "Start Your Journey Today"
    subtitle: "Book Consultation"
    description: "Fill out the form below and we'll be in touch within 24 hours"
    image: ""
    form_action: ""
    button_label: "Request Consultation"

  # Trust signals
  - type: "brands-carousel"
    enable: true
    title: "Recognized By"
    subtitle: "Credentials"
    brands:
      - image: ""
        name: "Credential 1"
      - image: ""
        name: "Credential 2"
      - image: ""
        name: "Credential 3"
---

## Landing Page Content

Additional content for SEO and context. This helps with search engine rankings while providing valuable information.

### Our Commitment

Brief statement about your commitment to client wellbeing.

### What Makes Us Different

- Unique differentiator 1
- Unique differentiator 2
- Unique differentiator 3
