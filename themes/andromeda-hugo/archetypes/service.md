---
title: "{{ replace .Name "-" " " | title }}"
description: ""
layout: "flexible"
draft: true

# Taxonomies for SEO and content organization
therapies: []  # e.g., ["CBT", "EMDR", "Mindfulness"]
conditions: [] # e.g., ["anxiety", "depression", "trauma"]
service_types: [] # e.g., ["individual", "couples", "family"]

sections:
  - type: "hero-breadcrumb"
  - type: "problem-empathy"
  - type: "method-tabs"
  - type: "benefits-grid"
  - type: "stats-numbers"
  - type: "related-content"
  - type: "contact-form-enhanced"

# Hero Section
hero_image: "images/services/{{ .Name }}-hero.jpg"

breadcrumb:
  - name: "Home"
    url: "/"
  - name: "Services"
    url: "/services/"
  - name: "{{ replace .Name "-" " " | title }}"
    url: "/services/{{ .Name }}/"

# Problem Empathy Section
problem_empathy:
  enable: true
  subtitle: "Understanding your challenges"
  title: "When This Service Can Help"
  description: ""
  challenges:
    - title: "Challenge 1"
      description: ""
      icon: "exclamation-triangle"
      index: 0
    - title: "Challenge 2"
      description: ""
      icon: "cloud-rain"
      index: 1
  empathy_text: ""

# Stats Section
stats:
  enable: true
  background: "light"
  items:
    - number: "70"
      suffix: "%"
      label: "Client improvement rate"
      icon: "smile"
    - number: "50"
      suffix: " min"
      label: "Session duration"
      icon: "clock"

# Contact Form
contact_form:
  enable: true
  title: "Schedule a Session"
  subtitle: "Take the first step"
---

Add service description here.
