---
title: "Component Test - Working Sections"
layout: "flexible"
draft: false

sections:
  - type: "hero-breadcrumb"
  - type: "stats-numbers"
  - type: "problem-empathy"

  - type: "faq-mini"

hero_breadcrumb:
  title: "01. Component Showcase"
  subtitle: "Testing working sections"

stats_section:
  enable: true
  title: "02. stats-numbers"
  stats:
    - number: 500
      suffix: "+"
      label: "Clients"
      icon: "users"
    - number: 10
      suffix: "+"
      label: "Years"
      icon: "calendar"

problem_empathy:
  enable: true
  title: "03. problem-empathy"
  challenges:
    - title: "Anxiety"
      description: "Constant worry"
      icon: "brain"
      index: 0
    - title: "Relationships"
      description: "Communication issues"
      icon: "users"
      index: 1

benefits_section:
  enable: true
  title: "04. benefits-grid"
  benefits:
    - title: "Professional"
      icon: "user-md"
      description: "Licensed"
    - title: "Flexible"
      icon: "calendar"
      description: "Online available"

faq_mini:
  enable: true
  title: "05. faq-mini"
  faqs:
    - question: "Test?"
      answer: "Answer."
---
