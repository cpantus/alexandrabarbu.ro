---
title: "Contact"
description: "Schedule a consultation at the office or online. I respond within 24 hours. Individual, couples and family therapy sessions."
layout: "flexible"
draft: false

sections:
  - type: "hero-breadcrumb"
  - type: "contact-info-cards"
  - type: "contact-options"
  - type: "contact-form-enhanced"
  - type: "feature-blocks"
  - type: "pricing-tables"
  - type: "faq-mini"
  - type: "privacy-guarantee"
  - type: "cta-standard"

# Hero Breadcrumb Section
hero_breadcrumb:
  title: "Contact"
  subtitle: "Schedule a confidential consultation. I respond within 24 hours."
  breadcrumb:
    - name: "Home"
      url: "/en/"
    - name: "Contact"
      url: "/en/contact/"

# Contact Info Cards Section
contact_info_title: "How to **Contact Me**"
contact_info_subtitle: "Choose the method that suits you best"
contact_methods:
  - icon: "phone"
    label: "Phone"
    value: "+40 721 234 567"
    subtitle: "Monday - Friday: 09:00 - 20:00 | Saturday: 10:00 - 14:00"
    link: "tel:+40721234567"
  - icon: "envelope"
    label: "Email"
    value: "contact@alexandrabarbu.ro"
    subtitle: "I respond within 24 hours (business days)"
    link: "mailto:contact@alexandrabarbu.ro"
  - icon: "whatsapp"
    icon_prefix: "lab"
    label: "WhatsApp"
    value: "+40 721 234 567"
    subtitle: "Text or voice messages, I respond quickly"
    link: "https://wa.me/40721234567"
  - icon: "map-marker-alt"
    label: "Bucharest Office"
    value: "Doamnei St. no. 12, Sector 3"
    subtitle: "Bucharest 030167, Romania"
    link: "https://maps.google.com/?q=Str.+Doamnei+12+Bucuresti"
    description: "Private office in central Bucharest, easily accessible by public transport or personal car. Parking available in the area."

# Contact Options Section
contact_options:
  title: "Session **Options**"
  description: "Complete flexibility - choose what suits you"
  options:
    - title: "Office Sessions"
      icon: "clinic-medical"
      description: |
        Face-to-face meetings in a confidential, comfortable and safe space in central Bucharest.
        Warm, professional and non-judgmental atmosphere.
      features:
        - "Total confidentiality"
        - "Private and comfortable space"
        - "Easy access by public transport"
        - "Parking available in area"
      button_text: "See Location"
      button_url: "#contact-info"
      button_variant: "primary"
    - title: "Online Sessions"
      icon: "video"
      description: |
        Equally effective therapy, from the comfort of your home. I use secure platforms (Zoom, Google Meet)
        with end-to-end encryption to protect confidentiality.
      features:
        - "Scientifically proven efficacy"
        - "Secure and encrypted connection"
        - "Schedule flexibility"
        - "Ideal for people in other cities"
      button_text: "Learn More"
      button_url: "/en/services/"
      button_variant: "secondary"

# Contact Form Enhanced Section
contact_form_enhanced:
  title: "Schedule a **Free Consultation**"
  subtitle: "The first conversation is without obligations"
  description: |
    Complete the form below and I will contact you within 24 hours to establish together
    the first step towards a more balanced life. All information is confidential.
  form_action: "https://formspree.io/f/your-form-id"
  fields:
    - name: "name"
      label: "Full name"
      type: "text"
      placeholder: "John Smith"
      required: true
    - name: "email"
      label: "Email"
      type: "email"
      placeholder: "john.smith@example.com"
      required: true
    - name: "phone"
      label: "Phone"
      type: "tel"
      placeholder: "+40 712 345 678"
      required: false
    - name: "service"
      label: "Type of service"
      type: "select"
      options:
        - "Individual Therapy"
        - "Couples Therapy"
        - "Family Therapy"
        - "Organizational Psychology"
        - "Not sure - I would like a consultation"
      required: true
    - name: "preferred_contact"
      label: "Preferred contact method"
      type: "radio"
      options:
        - "Email"
        - "Phone"
        - "WhatsApp"
      required: true
    - name: "message"
      label: "Your message (optional)"
      type: "textarea"
      placeholder: "Briefly describe why you want therapy and any questions you have..."
      required: false
    - name: "privacy"
      label: "I agree with the <a href='/terms-and-conditions/'>privacy policy</a> and data processing according to GDPR"
      type: "checkbox"
      required: true
  submit_button_text: "Send Request"
  success_message: "Thank you for your message! I will respond within 24 hours."
  calendly:
    enable: true
    url: "https://calendly.com/alexandrabarbu/consultation"
    button_text: "Or Schedule Directly Online"

# Feature Blocks Section - Free Consultation
feature_blocks:
  - subtitle: "No Obligations"
    title: "The First Consultation **Is Free**"
    description: |
      I understand that seeking help can be a difficult step. That's why I offer you the first meeting free (20-30 minutes)
      to get to know each other, discuss your challenges and see if my approach suits you.
      No pressure, no obligations.
    features:
      - "Free initial assessment (20-30 minutes)"
      - "Comfort and confidentiality guaranteed"
      - "Informed decision, no pressure"
      - "Quick response within 24 hours"
    image: "images/free-consultation.jpg"

# Pricing Tables Section
pricing_tables:
  title: "**Transparent** Rates"
  description: "No hidden costs. Discount packages available."
  toggle:
    enable: false
  packages:
    - name: "Individual Session"
      price: "250"
      currency: "RON"
      duration: "/ 50 minutes"
      description: "One individual therapy session face-to-face or online"
      features:
        - text: "50 minute session"
          included: true
        - text: "At office or online"
          included: true
        - text: "Evidence-based methods (CBT, EFT, SFT, ACT)"
          included: true
        - text: "Personalized materials and exercises"
          included: true
        - text: "Support between sessions (email)"
          included: true
      button_text: "Schedule"
      button_url: "#contact-form"
      button_variant: "outline-primary"
      featured: false
    - name: "5-Session Package"
      price: "1,150"
      currency: "RON"
      duration: "/ 5 sessions"
      description: "Discount package for medium-term therapy"
      badge: "Save 100 RON"
      features:
        - text: "5 sessions × 50 minutes (250 RON/session → 230 RON/session)"
          included: true
        - text: "All individual session benefits"
          included: true
        - text: "Scheduling flexibility"
          included: true
        - text: "Valid for 3 months"
          included: true
        - text: "Progress evaluation included"
          included: true
      button_text: "Choose Package"
      button_url: "#contact-form"
      button_variant: "primary"
      featured: true
    - name: "Couples/Family Therapy"
      price: "350"
      currency: "RON"
      duration: "/ 75 minutes"
      description: "Extended session for couples or family therapy"
      features:
        - text: "75 minute session"
          included: true
        - text: "At office or online"
          included: true
        - text: "Validated methods (Gottman, EFT, structural)"
          included: true
        - text: "Homework exercises"
          included: true
        - text: "Support between sessions"
          included: true
      button_text: "Schedule"
      button_url: "#contact-form"
      button_variant: "outline-primary"
      featured: false
  note: "Rates include VAT. You can pay cash, card or bank transfer. We issue fiscal invoices."

# FAQ Mini Section
faq_items:
  - question: "How long until I receive a response?"
    answer: |
      I respond to all messages within 24 business hours (usually same day). If you send a message Friday evening or weekend, I will respond Monday morning.
  - question: "Can I schedule an online session?"
    answer: |
      Yes, absolutely! I offer sessions both face-to-face at the office and online through secure encrypted platforms (Zoom, Google Meet). Online therapy effectiveness is scientifically demonstrated.
  - question: "How much does a therapy session cost?"
    answer: |
      The rate for an individual session (50 minutes) is 250 RON. For couples/family therapy (75 minutes) it is 350 RON. Discount packages available: 5 sessions for 1,150 RON.
  - question: "Is the information I share safe?"
    answer: |
      Absolutely. Confidentiality is protected by psychologists' code of ethics and GDPR legislation. Nothing we discuss leaves the office without your explicit written consent.
  - question: "How do I prepare for the first session?"
    answer: |
      No special preparation needed. Come as you are, with your questions and concerns. In the first session we'll discuss why you're seeking therapy and establish goals together.

faq_mini_title: "Frequently **Asked Questions**"
faq_mini_subtitle: "Quick answers to common questions"
faq_mini_footer: "Have more questions?"
faq_mini_link_text: "See all questions"
faq_mini_link_url: "/faq"

# Privacy Guarantee Section - Emergency Notice
privacy_guarantee:
  title: "Emergencies and **Crisis Situations**"
  description: |
    Important: My office does NOT offer 24/7 psychiatric emergency services. If you are in a crisis situation (suicidal thoughts, risk of harm), please contact emergency services:
  features:
    - "Suicide Prevention Hotline: 0800 801 200 (free, 24/7)"
    - "Emergency Services: 112"
    - "Alexandru Obregia Psychiatric Hospital: 021 334 5894"

# CTA Standard Section
cta_standard:
  kicker: "Take the First Step Today"
  title: "Ready to **Begin Your Journey**?"
  description: |
    Asking for help is a sign of courage and self-compassion. Every journey begins with a first step.
    I offer you a safe, empathetic and non-judgmental space to explore your challenges and discover
    your own solutions.
  button_text: "Schedule Free Consultation"
  button_url: "#contact-form"
  button_variant: "primary"
  secondary_button_text: "Call Now"
  secondary_button_url: "tel:+40721234567"
  secondary_button_variant: "secondary"
---
