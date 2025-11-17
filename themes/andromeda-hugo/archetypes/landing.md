---
title: "{{ replace .Name "-" " " | title }}"
description: ""
layout: "flexible"
draft: true

sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "feature-blocks"
  - type: "benefits-grid"
  - type: "pricing-tables"
  - type: "faq-mini"
  - type: "contact-form-enhanced"

# Hero Section
hero_breadcrumb:
  title: "{{ replace .Name "-" " " | title }}"
  subtitle: ""
  image: "images/{{ .Name }}-hero.jpg"

# Values Introduction
values_intro:
  enable: true
  title: ""
  subtitle: ""
  content: |
    Add introduction content here.

# Feature Blocks
feature_blocks_section:
  enable: true
  title: "Key Features"
  subtitle: ""
  blocks:
    - icon: "check-circle"
      title: "Feature 1"
      description: ""
    - icon: "shield-alt"
      title: "Feature 2"
      description: ""
    - icon: "heart"
      title: "Feature 3"
      description: ""

# Benefits Grid
benefits_grid_section:
  enable: true
  title: "Benefits"
  subtitle: ""
  benefits:
    - icon: "check"
      title: "Benefit 1"
      description: ""
    - icon: "star"
      title: "Benefit 2"
      description: ""

# FAQ
faq_mini_section:
  enable: true
  title: "Common Questions"
  subtitle: ""
  faqs:
    - question: "Question 1?"
      answer: "Answer 1"
    - question: "Question 2?"
      answer: "Answer 2"

# Contact Form
contact_form_section:
  enable: true
  title: "Get in Touch"
  subtitle: ""
---

Add landing page content here.
