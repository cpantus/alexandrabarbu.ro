---
title: "Contact"
description: "Schedule a consultation at the office or online. I respond within 24 hours. Individual, couples, and family therapy sessions."
layout: "flexible"
draft: false

sections:
  - type: "hero-breadcrumb"
  - type: "contact-info-cards"
  - type: "contact-form-enhanced"
  - type: "feature-blocks"
  - type: "faq-mini"

# Hero Breadcrumb Section
hero_breadcrumb:
  title: "Contact"
  subtitle: "Schedule a confidential consultation. I respond within 24 hours."
  description: "The first step toward change is the most important. Whether you prefer to talk by phone, email, or schedule directly online, I'm here to help you. All conversations are completely confidential, in compliance with professional ethics codes and GDPR."
  breadcrumb:
    - name: "Home"
      url: "/en/"
    - name: "Contact"
      url: "/en/contact/"

# Contact Info Cards Section
contact_info_title: "How to *Contact Me*"
contact_info_subtitle: "Choose the method that works best for you"
contact_info_cards:
  - icon: "phone"
    label: "Phone"
    value: "+40 721 234 567"
    subtitle: "Monday - Friday: 09:00 - 20:00 | Saturday: 10:00 - 14:00"
    link: "tel:+40721234567"
  - icon: "whatsapp"
    icon_prefix: "lab"
    label: "WhatsApp"
    value: "+40 721 234 567"
    subtitle: "Text or voice messages, I respond quickly"
    link: "https://wa.me/40721234567"
  - icon: "map-marker-alt"
    label: "Bucharest Office"
    value: "Str. Doamnei no. 12, Sector 3"
    subtitle: "Bucharest 030167, Romania"
    link: "https://maps.google.com/?q=Str.+Doamnei+12+Bucuresti"
    description: "Private office in central Bucharest, easily accessible by public transport or personal car. Parking available in the area."


# Contact Form Enhanced Section
contact_form_enhanced:
  variant: "primary"
  trust_badges:
    - icon: "shield-alt"
      text: "Confidentiality"
    - icon: "clock"
      text: "Quick Response"
    - icon: "calendar-check"
      text: "Flexibility"
    - icon: "heart"
      text: "Empathy"
  title: "Schedule a **Free Consultation**"
  subtitle: "Your first conversation is commitment-free"
  description: |
    Fill out the form below and I will contact you within 24 hours to arrange your first step toward
    a more balanced life. All information is confidential.
  form_action: "https://formspree.io/f/your-form-id"
  fields:
    - name: "name"
      label: "Full Name"
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
      label: "Type of Service"
      type: "select"
      options:
        - "Individual Therapy"
        - "Couples Therapy"
        - "Family Therapy"
        - "Organizational Psychology"
        - "Not sure - I'd like a consultation"
      required: true
    - name: "preferred_contact"
      label: "Preferred Contact Method"
      type: "radio"
      options:
        - "Email"
        - "Phone"
        - "WhatsApp"
      required: true
    - name: "message"
      label: "Your Message (optional)"
      type: "textarea"
      placeholder: "Briefly describe why you're seeking therapy and any questions you have..."
      required: false
    - name: "privacy"
      label: "I agree to the <a href='/en/terms-and-conditions/'>privacy policy</a> and data processing according to GDPR"
      type: "checkbox"
      required: true
  submit_button_text: "Send Request"
  success_message: "Thank you for your message! I will respond within 24 hours."
  calendly:
    enable: true
    url: "https://calendly.com/alexandrabarbu/consultatie"
    button_text: "Or Schedule Directly Online"

# Feature Blocks Section - Free Consultation
feature_blocks:
  - subtitle: "No Obligation"
    title: "Your First Consultation is **Free**"
    description: |
      I understand that seeking help can be a difficult step. That's why I offer your first session free
      of charge (20-30 minutes) so we can get to know each other, discuss your challenges, and see if my approach
      is right for you. No pressure, no obligation.
    features:
      - "Free initial evaluation (20-30 minutes)"
      - "Comfort and confidentiality guaranteed"
      - "Informed decision, no pressure"
      - "Quick response within 24 hours"
    image: "images/free-consultation.jpg"


# FAQ Mini Section
faq_mini:
  items:
    - question: "How long does it take to get a response?"
      answer: |
        I respond to all messages within 24 business hours (usually the same day). If you send a message Friday evening or during the weekend, I will respond Monday morning.
    - question: "Can I schedule an online session?"
      answer: |
        Absolutely! I offer sessions both face-to-face at the office and online through secure, encrypted platforms (Zoom, Google Meet). The effectiveness of online therapy is scientifically proven.
    - question: "How much does a therapy session cost?"
      answer: |
        The fee for an individual session (50 minutes) is 250 RON. For couples/family therapy (75 minutes) it is 350 RON. Discounted packages available: 5 sessions for 1,150 RON.
    - question: "Is the information I share secure?"
      answer: |
        Absolutely. Confidentiality is protected by psychologists' professional ethics codes and GDPR legislation. Nothing discussed leaves the office without your explicit written consent.
    - question: "How do I prepare for my first session?"
      answer: |
        No special preparation is needed. Come as you are, with your questions and concerns. In the first session, we'll discuss why you're seeking therapy and establish our goals together.
  title: "Frequently **Asked Questions**"
  subtitle: "Quick answers to common questions"
  footer: "More questions?"
  link_text: "View all questions"
  link_url: "/en/faq"

---
