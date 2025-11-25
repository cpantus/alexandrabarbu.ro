---
title: "Contact"
description: "Programează o consultație la cabinet sau online. Răspund în maxim 24 de ore. Sesiuni de terapie individuală, de cuplu și de familie."
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
  subtitle: "Programează o consultație confidențială. Răspund în maxim 24 de ore."
  breadcrumb:
    - name: "Acasă"
      url: "/"
    - name: "Contact"
      url: "/contact/"

# Contact Info Cards Section
contact_info_title: "Cum Mă **Poți Contacta**"
contact_info_subtitle: "Alege modalitatea care ți se potrivește cel mai bine"
contact_methods:
  - icon: "phone"
    label: "Telefon"
    value: "+40 721 234 567"
    subtitle: "Luni - Vineri: 09:00 - 20:00 | Sâmbătă: 10:00 - 14:00"
    link: "tel:+40721234567"
  - icon: "whatsapp"
    icon_prefix: "lab"
    label: "WhatsApp"
    value: "+40 721 234 567"
    subtitle: "Mesaje text sau vocale, răspund rapid"
    link: "https://wa.me/40721234567"
  - icon: "map-marker-alt"
    label: "Cabinet București"
    value: "Str. Doamnei nr. 12, Sector 3"
    subtitle: "București 030167, România"
    link: "https://maps.google.com/?q=Str.+Doamnei+12+Bucuresti"
    description: "Cabinet privat în centrul Bucureștiului, ușor accesibil cu transportul în comun sau mașina personală. Parcare disponibilă în zonă."


# Contact Form Enhanced Section
contact_form_enhanced:
  title: "Programează o **Consultație Gratuită**"
  subtitle: "Prima discuție este fără obligații"
  description: |
    Completează formularul de mai jos și te voi contacta în maxim 24 de ore pentru a stabili împreună
    primul pas către o viață mai echilibrată. Toate informațiile sunt confidențiale.
  form_action: "https://formspree.io/f/your-form-id"
  fields:
    - name: "name"
      label: "Nume complet"
      type: "text"
      placeholder: "Ion Popescu"
      required: true
    - name: "email"
      label: "Email"
      type: "email"
      placeholder: "ion.popescu@exemplu.ro"
      required: true
    - name: "phone"
      label: "Telefon"
      type: "tel"
      placeholder: "+40 712 345 678"
      required: false
    - name: "service"
      label: "Tipul de serviciu"
      type: "select"
      options:
        - "Terapie Individuală"
        - "Terapie de Cuplu"
        - "Terapie de Familie"
        - "Psihologie Organizațională"
        - "Nu sunt sigur - aș dori o consultație"
      required: true
    - name: "preferred_contact"
      label: "Mod preferat de contact"
      type: "radio"
      options:
        - "Email"
        - "Telefon"
        - "WhatsApp"
      required: true
    - name: "message"
      label: "Mesajul tău (opțional)"
      type: "textarea"
      placeholder: "Descrie pe scurt motivul pentru care dorești terapie și orice întrebări ai..."
      required: false
    - name: "privacy"
      label: "Sunt de acord cu <a href='/termeni-si-conditii/'>politica de confidențialitate</a> și prelucrarea datelor conform GDPR"
      type: "checkbox"
      required: true
  submit_button_text: "Trimite Cererea"
  success_message: "Mulțumesc pentru mesaj! Voi răspunde în maxim 24 de ore."
  calendly:
    enable: true
    url: "https://calendly.com/alexandrabarbu/consultatie"
    button_text: "Sau Programează Direct Online"

# Feature Blocks Section - Free Consultation
feature_blocks:
  - subtitle: "Fără Obligații"
    title: "Prima Consultație **Este Gratuită**"
    description: |
      Înțeleg că a căuta ajutor poate fi un pas dificil. De aceea, îți ofer prima întâlnire gratuit (20-30 minute)
      pentru a ne cunoaște, a discuta despre provocările tale și a vedea dacă abordarea mea ți se potrivește.
      Fără presiune, fără obligații.
    features:
      - "Evaluare inițială gratuită (20-30 minute)"
      - "Confort și confidențialitate garantată"
      - "Decizie informată, fără presiune"
      - "Răspuns rapid în maxim 24 de ore"
    image: "images/free-consultation.jpg"


# FAQ Mini Section
faq_items:
  - question: "Cât durează până primesc un răspuns?"
    answer: |
      Răspund la toate mesajele în maxim 24 de ore lucrătoare (de obicei în aceeași zi). Dacă trimiți un mesaj vineri seara sau în weekend, voi răspunde luni dimineața.
  - question: "Pot programa o sesiune online?"
    answer: |
      Da, absolut! Ofer sesiuni atât față în față la cabinet, cât și online prin platforme securizate cu criptare (Zoom, Google Meet). Eficacitatea terapiei online este demonstrată științific.
  - question: "Cât costă o sesiune de terapie?"
    answer: |
      Tariful pentru o sesiune individuală (50 minute) este 250 RON. Pentru terapie de cuplu/familie (75 minute) este 350 RON. Pachete cu discount disponibile: 5 ședințe la 1,150 RON.
  - question: "Este sigură informația pe care o împărtășesc?"
    answer: |
      Absolut. Confidențialitatea este protejată prin codul deontologic al psihologilor și legislația GDPR. Nimic din ce discutăm nu părăsește cabinetul fără consimțământul tău explicit scris.
  - question: "Cum mă pregătesc pentru prima sesiune?"
    answer: |
      Nu este nevoie de pregătire specială. Vino așa cum ești, cu întrebările și grijile tale. În prima sesiune vom discuta despre motivul pentru care cauți terapie și vom stabili împreună obiectivele.

faq_mini_title: "Întrebări **Frecvente**"
faq_mini_subtitle: "Răspunsuri rapide la cele mai comune întrebări"
faq_mini_footer: "Mai ai întrebări?"
faq_mini_link_text: "Vezi toate întrebările"
faq_mini_link_url: "/faq"

---
