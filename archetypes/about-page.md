---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: false
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "stats-numbers"
  - type: "credentials-showcase"
  - type: "values-compass"
  - type: "testimonials-enhanced"
  - type: "contact-form-enhanced"

# Hero Breadcrumb
hero_breadcrumb:
  title: "About Me"
  subtitle: "My Story & Approach"
  background: "light"
  show_breadcrumb: true

# Introduction
values_intro:
  enable: true
  title: "Who I Am and Why I Do Therapy"
  description: "Brief introduction to your background and motivation."

  intro_text: |
    **I became a therapist** because I witnessed the healing power of therapy - both in the lives of those I've helped and in my own journey of self-discovery.

    **I believe every person** has the inner resources necessary for healing and growth. My role is to create a safe space where those resources can be discovered and activated.

  values:
    - title: "Authentic Empathy"
      description: "You'll be heard without judgment"
      icon: "heart"

    - title: "Evidence-Based Approach"
      description: "Only scientifically validated methods"
      icon: "microscope"

    - title: "Personalized Care"
      description: "Every treatment plan is unique"
      icon: "user-circle"

# Stats
stats_numbers:
  enable: true
  title: "Experience & Impact"
  background: "light"

  stats:
    - number: "15"
      suffix: "+"
      label: "Years of experience"
      icon: "award"
      animated: true

    - number: "500"
      suffix: "+"
      label: "People helped"
      icon: "users"
      animated: true

    - number: "5000"
      suffix: "+"
      label: "Therapy hours provided"
      icon: "clock"
      animated: true

# Credentials
credentials_showcase:
  enable: true
  subtitle: "Professional Qualifications"
  title: "Credentials & Expertise"
  description: "Accreditations and experience that guarantee quality services"
  background: "light"

  credentials:
    - icon: "user-md"
      label: "Licensed Clinical Psychologist"
      value: "CPR Certified"
      variant: "primary"

    - icon: "award"
      label: "15+ Years Experience"
      value: "500+ Clients Helped"
      variant: "secondary"

    - icon: "certificate"
      label: "CPR Member"
      value: "Romanian Psychologists College"
      variant: "info"

    - icon: "graduation-cap"
      label: "Continuing Education"
      value: "CBT, EMDR, Mindfulness"
      variant: "coral"

# Core Values
values_compass:
  enable: true
  title: "Core Values"
  subtitle: "What Guides My Work"
  description: "The principles that shape my therapeutic approach"

  benefits:
    - title: "Science-Based"
      icon: "flask"
      description: "Evidence-based CBT, DBT, ACT methods"

    - title: "Personalized"
      icon: "user-circle"
      description: "Tailored approach for each individual"

    - title: "Compassionate"
      icon: "heart"
      description: "Warm, non-judgmental support"

    - title: "Growth-Oriented"
      icon: "seedling"
      description: "Focus on sustainable positive change"

# Testimonials
testimonials_enhanced:
  enable: true
  title: "Client Experiences"
  subtitle: "What People Say"

  testimonials:
    - quote: "Professional, compassionate, and effective. Highly recommended."
      author: "A.M."
      role: "Client"
      rating: 5
      verified: true

# Contact
contact_form:
  enable: true
  title: "Let's Connect"
  subtitle: "Get In Touch"
  description: "If my approach resonates with you, schedule a free 15-minute consultation."
---

## What Makes Me Different

### I Don't Judge, I Understand
I've worked with hundreds of people from different backgrounds. Nothing is too shameful or too difficult to discuss.

### I Don't Give Advice, I Provide Tools
I won't tell you what to do. I'll teach you to discover your own answers and make decisions aligned with your values.

### I Don't Work Endlessly
Therapy has clear goals and an estimated duration. You won't be dependent on therapy for life.
