---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: true
layout: "flexible"

sections:
  # Hero section with breadcrumb
  - type: "hero-breadcrumb"
    enable: true
    title: "{{ replace .Name "-" " " | title }}"
    subtitle: ""
    background_image: ""

  # Service details with features
  - type: "feature-details"
    enable: true
    title: "Service Overview"
    subtitle: ""
    description: ""
    features:
      - icon: "check-circle"
        title: "Feature 1"
        description: "Description of feature 1"
      - icon: "check-circle"
        title: "Feature 2"
        description: "Description of feature 2"
      - icon: "check-circle"
        title: "Feature 3"
        description: "Description of feature 3"

  # How it works section
  - type: "how-it-works"
    enable: true
    title: "How It Works"
    subtitle: "Process"
    steps:
      - title: "Step 1"
        description: "Description of step 1"
        image: ""
      - title: "Step 2"
        description: "Description of step 2"
        image: ""
      - title: "Step 3"
        description: "Description of step 3"
        image: ""

  # Pricing section
  - type: "pricing-tables"
    enable: true
    title: "Pricing Plans"
    subtitle: "Choose Your Plan"
    monthly_yearly_toggle: "toggle"
    pricing_card:
      - name: "Basic"
        currency: "$"
        monthly_price: "99"
        yearly_price: "990"
        content: "Perfect for individuals"
        services:
          - "Service 1"
          - "Service 2"
          - "Service 3"
        button_label: "Get Started"
        button_link: "/contact"
        featured: false

  # Benefits grid
  - type: "benefits-grid"
    enable: true
    title: "Benefits"
    subtitle: "Why Choose This Service"
    benefits:
      - icon: "heart"
        title: "Benefit 1"
        description: "Description of benefit 1"
      - icon: "shield-alt"
        title: "Benefit 2"
        description: "Description of benefit 2"
      - icon: "users"
        title: "Benefit 3"
        description: "Description of benefit 3"

  # FAQ section
  - type: "faq-mini"
    enable: true
    title: "Frequently Asked Questions"
    subtitle: "FAQ"
    faq:
      - question: "Question 1?"
        answer: "Answer to question 1"
      - question: "Question 2?"
        answer: "Answer to question 2"
      - question: "Question 3?"
        answer: "Answer to question 3"

  # Contact form
  - type: "contact-form-enhanced"
    enable: true
    title: "Get in Touch"
    subtitle: "Contact"
    description: "Have questions? Reach out to us."
---

## Service Description

Write your detailed service description here. This content will be displayed on the page.

### Key Features

- Feature 1
- Feature 2
- Feature 3

### Target Audience

Describe who this service is for.

### Expected Results

Describe the expected outcomes and results.
