---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: false
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "problem-empathy"
  - type: "feature-blocks"
  - type: "pricing-tables"
  - type: "testimonials-enhanced"
  - type: "faq-mini-section"
  - type: "cta-standard"
  - type: "contact-form-enhanced"

# Hero Section
hero_breadcrumb:
  title: "{{ replace .Name "-" " " | title }}"
  subtitle: "Transform Your Life Today"
  background: "primary"
  show_breadcrumb: false
  button_text: "Get Started"
  button_url: "/contact/"

# Problem/Empathy Section
problem_empathy:
  enable: true
  subtitle: "You're Not Alone"
  title: "Are You Experiencing These Challenges?"
  description: "Many people face similar struggles. The first step to healing is recognizing the need for support."

  challenges:
    - title: "Challenge 1"
      description: "Description of common problem"
      icon: "brain"
      index: 0

    - title: "Challenge 2"
      description: "Description of common problem"
      icon: "heart"
      index: 1

    - title: "Challenge 3"
      description: "Description of common problem"
      icon: "users"
      index: 2

  empathy_text: "I understand what you're going through. These challenges are real and deserve professional attention."

# Features
feature_blocks:
  - title: "Feature 1"
    subtitle: "Key benefit"
    description: "How this feature helps solve the problem"
    image: "images/features/feature-1.jpg"

  - title: "Feature 2"
    subtitle: "Key benefit"
    description: "How this feature helps solve the problem"
    image: "images/features/feature-2.jpg"

# Pricing
pricing_tables:
  enable: true
  title: "Simple, Transparent Pricing"
  subtitle: "Choose Your Plan"
  default_yearly: false

  plans:
    - name: "Basic"
      price_monthly: 250
      description: "Perfect for getting started"
      features:
        - "Feature 1"
        - "Feature 2"
        - "Feature 3"
      button_text: "Get Started"
      button_url: "/contact/"
      featured: false

    - name: "Premium"
      price_monthly: 350
      description: "Best value for comprehensive care"
      features:
        - "All Basic features"
        - "Feature 4"
        - "Feature 5"
      button_text: "Choose Premium"
      button_url: "/contact/"
      featured: true

# Testimonials
testimonials_enhanced:
  enable: true
  title: "What Clients Say"
  subtitle: "Success Stories"

  testimonials:
    - quote: "This service changed my life completely."
      author: "Client Name"
      role: "Client"
      rating: 5
      verified: true

# FAQ
faq_mini_section:
  enable: true
  title: "Common Questions"
  subtitle: "FAQ"

  questions:
    - question: "How does it work?"
      answer: "Brief answer explaining the process."

    - question: "How long does it take?"
      answer: "Brief answer about duration."

# CTA
cta_standard:
  enable: true
  title: "Ready to Get Started?"
  description: "Take the first step towards positive change today."
  primary_button_text: "Book Now"
  primary_button_url: "/contact/"
  secondary_button_text: "Learn More"
  secondary_button_url: "/about/"

# Contact Form
contact_form:
  enable: true
  title: "Schedule Your Free Consultation"
  subtitle: "Get In Touch"
  description: "Fill out the form and we'll get back to you within 24 hours."
---
