---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: false
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "method-tabs"
  - type: "values-compass"
  - type: "feature-details"
  - type: "first-session-timeline"
  - type: "faq-mini-section"
  - type: "cta-standard"

# Hero Breadcrumb
hero_breadcrumb:
  title: "My Therapeutic Approach"
  subtitle: "Evidence-Based, Personalized Care"
  background: "light"
  show_breadcrumb: true

# Introduction
values_intro:
  enable: true
  title: "A Modern, Integrated Approach"
  description: "Combining the best of evidence-based therapies tailored to your unique needs."

  intro_text: |
    **My approach is integrative**, drawing from multiple evidence-based therapeutic modalities to create a personalized treatment plan for each client.

    **No two people are alike**, so therapy shouldn't be one-size-fits-all. I adapt techniques from CBT, EMDR, Mindfulness, and other proven approaches based on what works best for you.

  values:
    - title: "Evidence-Based"
      description: "Only scientifically validated methods"
      icon: "microscope"

    - title: "Flexible & Adaptive"
      description: "Tailored to your specific needs"
      icon: "exchange-alt"

    - title: "Collaborative"
      description: "You're an active partner in your healing"
      icon: "hands-helping"

# Therapeutic Methods
method_tabs:
  enable: true
  title: "Therapeutic Methods I Use"
  subtitle: "Evidence-Based Techniques"

  methods:
    - id: "cbt"
      name: "Cognitive Behavioral Therapy (CBT)"
      icon: "brain"
      description: "CBT helps identify and change negative thought patterns and behaviors that contribute to emotional distress."

      benefits:
        - "Proven effective for anxiety and depression"
        - "Practical skills you can use daily"
        - "Typically 12-20 sessions"
        - "Focus on present challenges"

      best_for:
        - "Anxiety disorders"
        - "Depression"
        - "Phobias"
        - "OCD"

    - id: "emdr"
      name: "EMDR"
      icon: "eye"
      description: "Eye Movement Desensitization and Reprocessing helps process traumatic memories and reduce their emotional impact."

      benefits:
        - "Effective for trauma and PTSD"
        - "Faster than traditional talk therapy"
        - "Reduces emotional intensity of memories"
        - "No need to discuss details"

      best_for:
        - "PTSD"
        - "Trauma"
        - "Anxiety from past events"
        - "Phobias"

    - id: "mindfulness"
      name: "Mindfulness-Based Therapy"
      icon: "spa"
      description: "Mindfulness techniques help you stay present, reduce rumination, and develop emotional regulation skills."

      benefits:
        - "Reduces stress and anxiety"
        - "Improves emotional regulation"
        - "Enhances self-awareness"
        - "Prevents relapse"

      best_for:
        - "Stress management"
        - "Chronic anxiety"
        - "Depression relapse prevention"
        - "Emotional regulation"

# Core Principles
values_compass:
  enable: true
  title: "Core Principles"
  subtitle: "What Guides My Work"
  description: "The foundational values that shape every therapy session."

  benefits:
    - title: "Non-Judgmental"
      icon: "heart"
      description: "Safe space to explore anything"

    - title: "Collaborative"
      icon: "hands-helping"
      description: "You're an active partner in healing"

    - title: "Goal-Oriented"
      icon: "bullseye"
      description: "Clear objectives and progress tracking"

    - title: "Culturally Sensitive"
      icon: "globe"
      description: "Respect for diverse backgrounds"

# Detailed Features
feature_details:
  enable: true
  title: "How Therapy Actually Works"
  subtitle: "The Process"

  features:
    - title: "Assessment & Planning"
      description: |
        In the first 1-2 sessions, we'll:
        - Discuss your concerns and goals
        - Understand your history and context
        - Create a personalized treatment plan
        - Set measurable objectives
      icon: "clipboard-list"
      alignment: "left"

    - title: "Active Therapy"
      description: |
        During the main therapy phase:
        - Weekly or bi-weekly sessions
        - Learn practical coping skills
        - Process difficult emotions and experiences
        - Track progress toward goals
      icon: "user-friends"
      alignment: "right"

    - title: "Integration & Maintenance"
      description: |
        As therapy concludes:
        - Consolidate gains
        - Develop relapse prevention strategies
        - Gradually reduce session frequency
        - Option for "booster" sessions as needed
      icon: "check-circle"
      alignment: "left"

# First Session
first_session_timeline:
  enable: true
  title: "What to Expect in Your First Session"
  subtitle: "First Visit Guide"
  description: "A clear overview of what happens in the initial consultation."

  timeline:
    - number: 1
      title: "Welcome & Paperwork"
      description: "Brief forms and consent documents"
      duration: "5 minutes"
      icon: "file-alt"

    - number: 2
      title: "Tell Your Story"
      description: "Share what brought you to therapy"
      duration: "20 minutes"
      icon: "comments"

    - number: 3
      title: "Assessment"
      description: "Explore symptoms, history, and goals"
      duration: "20 minutes"
      icon: "clipboard-check"

    - number: 4
      title: "Treatment Plan"
      description: "Discuss approach and next steps"
      duration: "10 minutes"
      icon: "route"

# FAQ
faq_mini_section:
  enable: true
  title: "Common Questions About My Approach"
  subtitle: "FAQ"

  questions:
    - question: "How do you decide which method to use?"
      answer: "I assess your specific situation and goals, then recommend the most effective evidence-based approach. We'll discuss options together."

    - question: "Can we switch methods if something isn't working?"
      answer: "Absolutely. Therapy is flexible. If an approach isn't helping, we'll adjust the treatment plan."

    - question: "Do I need to do homework?"
      answer: "Many therapeutic approaches include between-session exercises, but we'll discuss what works for your schedule and comfort level."

# CTA
cta_standard:
  enable: true
  title: "Ready to Begin Your Journey?"
  description: "Schedule a free 15-minute consultation to see if my approach is right for you."
  primary_button_text: "Schedule Consultation"
  primary_button_url: "/contact/"
  secondary_button_text: "Learn About Services"
  secondary_button_url: "/services/"
---

## Why an Integrative Approach?

Different problems require different solutions. Rather than rigidly adhering to one therapeutic school, I draw from multiple evidence-based approaches to create a personalized treatment plan.

This means you get the best of all worlds:
- **CBT** for practical coping skills
- **EMDR** for trauma processing
- **Mindfulness** for emotional regulation
- **Psychodynamic insights** for deeper understanding

The result is therapy that's both effective and efficient, tailored specifically to your needs.
