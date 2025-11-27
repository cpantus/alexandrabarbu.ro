---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: false
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "contact-form-enhanced"

# Hero Breadcrumb
hero_breadcrumb:
  title: "{{ replace .Name "-" " " | title }}"
  subtitle: ""
  background: "light"
  show_breadcrumb: true

# Contact Form
contact_form:
  enable: true
  title: "Get in Touch"
  subtitle: "Contact Form"
  description: "Have questions? Send us a message and we'll get back to you soon."
---

## Main Content

Write your page content here using Markdown.
