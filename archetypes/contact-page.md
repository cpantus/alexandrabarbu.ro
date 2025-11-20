---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: false
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "contact-info-cards"
  - type: "contact-form-enhanced"
  - type: "onboarding-steps"
  - type: "privacy-guarantee"
  - type: "faq-mini-section"

# Hero Breadcrumb
hero_breadcrumb:
  title: "Get In Touch"
  subtitle: "Schedule Your First Session"
  background: "light"
  show_breadcrumb: true

# Contact Information
contact_info_cards:
  enable: true
  title: "Contact Information"
  subtitle: "Reach Out"
  description: "Choose your preferred way to get in touch."

  cards:
    - icon: "phone"
      label: "Phone"
      value: "+40 123 456 789"
      link: "tel:+40123456789"
      type: "phone"
      variant: "primary"
      size: "md"

    - icon: "envelope"
      label: "Email"
      value: "contact@example.com"
      link: "mailto:contact@example.com"
      type: "email"
      variant: "secondary"
      size: "md"

    - icon: "map-marker-alt"
      label: "Location"
      value: "Bucharest, Romania"
      link: "https://maps.google.com"
      type: "link"
      variant: "tertiary"
      size: "md"

# Contact Form
contact_form:
  enable: true
  title: "Send Us a Message"
  subtitle: "Contact Form"
  description: "Fill out the form below and we'll get back to you within 24 hours."

  form_fields:
    - name: "name"
      label: "Full Name"
      type: "text"
      required: true

    - name: "email"
      label: "Email Address"
      type: "email"
      required: true

    - name: "phone"
      label: "Phone Number"
      type: "tel"
      required: false

    - name: "service"
      label: "Service Interest"
      type: "select"
      required: false
      options:
        - "Individual Therapy"
        - "Couples Therapy"
        - "Family Therapy"
        - "Not Sure - Need Consultation"

    - name: "message"
      label: "Your Message"
      type: "textarea"
      required: true

  trust_badges:
    - "Confidential"
    - "24h Response"
    - "No Commitment"

# Onboarding Process
onboarding_steps:
  enable: true
  title: "How It Works"
  subtitle: "Simple Process"
  description: "Getting started is easy. Here's what happens next."

  steps:
    - number: 1
      title: "Contact Us"
      description: "Fill out the form or call us"
      icon: "envelope"

    - number: 2
      title: "Free Consultation"
      description: "15-minute intro call to discuss your needs"
      icon: "phone"

    - number: 3
      title: "Schedule Session"
      description: "Book your first therapy session"
      icon: "calendar"

    - number: 4
      title: "Begin Therapy"
      description: "Start your journey to wellness"
      icon: "heart"

# Privacy
privacy_guarantee:
  enable: true
  title: "Your Privacy Matters"
  subtitle: "Confidentiality Guaranteed"
  description: "All communications are strictly confidential and protected by professional ethics guidelines."

  guarantees:
    - title: "Professional Confidentiality"
      description: "Bound by psychologist-client privilege"
      icon: "lock"

    - title: "GDPR Compliant"
      description: "Your data is protected under EU regulations"
      icon: "shield-alt"

    - title: "Secure Communication"
      description: "Encrypted email and video sessions"
      icon: "key"

# FAQ
faq_mini_section:
  enable: true
  title: "Quick Questions"
  subtitle: "Before You Contact"

  questions:
    - question: "How quickly will you respond?"
      answer: "We typically respond within 24 hours during business days."

    - question: "Is the consultation really free?"
      answer: "Yes! The 15-minute intro call is completely free with no obligation."

    - question: "Do you offer online sessions?"
      answer: "Yes, we offer both in-person and online therapy sessions."
---

## Office Hours

**Monday - Friday**: 9:00 AM - 7:00 PM
**Saturday**: 10:00 AM - 2:00 PM
**Sunday**: Closed

## Emergency Support

If you're experiencing a mental health emergency, please contact:

- **Emergency Services**: 112
- **Mental Health Crisis Line**: [Crisis Line Number]
- **Nearest Hospital**: [Hospital Name & Address]

This practice provides scheduled therapy services and is not equipped for emergency situations.
