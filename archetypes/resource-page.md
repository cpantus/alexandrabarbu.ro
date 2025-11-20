---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: false
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "blog-grid"
  - type: "newsletter-signup"
  - type: "contact-info-cards"

# Hero Breadcrumb
hero_breadcrumb:
  title: "Resources & Articles"
  subtitle: "Mental Health Knowledge Base"
  background: "light"
  show_breadcrumb: true

# Blog Grid
blog_grid:
  enable: true
  title: "Latest Articles"
  subtitle: "Mental Health Insights"
  description: "Evidence-based articles about mental health, therapy, and personal growth."

  # Filters
  show_filters: true
  filters:
    - "All"
    - "Anxiety"
    - "Depression"
    - "Relationships"
    - "Self-Care"
    - "Therapy Tips"

  # Posts will be automatically populated from content/blog/

# Newsletter
newsletter_signup:
  enable: true
  title: "Stay Informed"
  subtitle: "Mental Health Newsletter"
  description: "Get monthly insights, tips, and resources delivered to your inbox."

  privacy_notice: "We respect your privacy. Unsubscribe anytime."
  button_text: "Subscribe"
  success_message: "Thank you for subscribing!"

# Contact Info
contact_info_cards:
  enable: true
  title: "Need Personal Support?"
  subtitle: "Contact Options"
  description: "If you're looking for personalized help, reach out to schedule a consultation."

  cards:
    - icon: "phone"
      label: "Phone"
      value: "+40 123 456 789"
      link: "tel:+40123456789"
      type: "phone"

    - icon: "envelope"
      label: "Email"
      value: "contact@example.com"
      link: "mailto:contact@example.com"
      type: "email"

    - icon: "calendar"
      label: "Schedule"
      value: "Book Online"
      link: "/contact/"
      type: "link"
---

## About This Resource Section

This section contains articles, guides, and resources about mental health, therapy techniques, and personal development. All content is based on scientific evidence and clinical experience.

### Topics Covered

- Anxiety & Stress Management
- Depression & Mood Disorders
- Relationship Issues
- Trauma & PTSD
- Self-Care Strategies
- Therapy Techniques

### How to Use These Resources

1. **Browse by Topic**: Use the filters to find articles relevant to your situation
2. **Read Regularly**: New content added monthly
3. **Share**: Help others by sharing useful articles
4. **Take Action**: If you need personalized support, book a consultation
