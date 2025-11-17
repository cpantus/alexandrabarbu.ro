---
title: "Contact - Cabinet Psihoterapie Alexandra Barbu"
description: "Programează o consultație la cabinet sau online. Sesiuni de terapie individuală, de cuplu și de familie în București. Răspund în 24h."
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "contact-form-enhanced"
  - type: "stats-numbers"
  - type: "faq-mini"
  - type: "newsletter-signup"

# Hero Image
hero_image: "images/hero/contact-cabinet.jpg"

# Breadcrumb
breadcrumb:
  - name: "Acasă"
    url: "/"
  - name: "Contact"
    url: "/contact/"

# Contact Form Section
contact_form:
  enable: true
  subtitle: "Începe călătoria ta"
  title: "Programează o Consultație"
  description: "Completează formularul de mai jos și te voi contacta în maximum 24 de ore pentru a stabili împreună primul tău pas către o viață mai echilibrată."

  form_fields:
    name:
      label: "Nume complet"
      placeholder: "Ion Popescu"
      required: true
    email:
      label: "Email"
      placeholder: "ion.popescu@exemplu.ro"
      required: true
    phone:
      label: "Telefon"
      placeholder: "+40 712 345 678"
      required: false
    service:
      label: "Tipul de serviciu"
      type: "select"
      options:
        - "Terapie Individuală"
        - "Terapie de Cuplu"
        - "Terapie de Familie"
        - "Psihologie Organizațională"
        - "Nu sunt sigur - aș dori o consultație"
      required: true
    preferred_contact:
      label: "Mod preferat de contact"
      type: "radio"
      options:
        - "Email"
        - "Telefon"
        - "WhatsApp"
      required: true
    message:
      label: "Mesajul tău"
      placeholder: "Descrie pe scurt motivul pentru care dorești terapie și întrebările tale..."
      type: "textarea"
      required: true
    privacy:
      label: "Sunt de acord cu <a href='/politica-confidentialitate/'>politica de confidențialitate</a> și prelucrarea datelor personale conform GDPR"
      type: "checkbox"
      required: true

  submit_button: "Trimite Cererea"
  success_message: "Mulțumesc pentru mesaj! Voi răspunde în maxim 24 de ore."
  error_message: "A apărut o eroare. Te rog încearcă din nou sau contactează-mă direct la telefon."

  office_info:
    enable: true
    title: "Informații Cabinet"
    address: "Str. Doamnei nr. 12, Sector 3, București 030167"
    phone: "+40 721 234 567"
    email: "contact@alexandrabarbu.ro"
    schedule:
      - day: "Luni - Vineri"
        hours: "09:00 - 20:00"
      - day: "Sâmbătă"
        hours: "10:00 - 14:00"
      - day: "Duminică"
        hours: "Închis"
    map_embed: "https://maps.google.com/maps?q=Str.%20Doamnei%2012%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed"

  booking_info:
    enable: true
    title: "Programare Online"
    description: "Preferă să programezi direct? Folosește calendarul online pentru a alege ziua și ora care ți se potrivește."
    calendly_url: "https://calendly.com/alexandrabarbu/consultatie"
    button_text: "Programează Online"

# Stats Section
stats:
  enable: true
  background: "light"
  items:
    - number: "24"
      suffix: "h"
      label: "Timp de răspuns maxim"
      icon: "clock"
    - number: "98"
      suffix: "%"
      label: "Rata de răspuns"
      icon: "check-circle"
    - number: "3"
      suffix: ""
      label: "Locații disponibile (cabinet + online)"
      icon: "map-marker"
    - number: "7"
      suffix: " zile"
      label: "Program disponibil"
      icon: "calendar"

# FAQ Section
faq:
  enable: true
  subtitle: "Întrebări frecvente"
  title: "Răspunsuri Rapide"
  description: "Găsește răspunsuri la cele mai comune întrebări despre procesul de programare și terapie."
  questions:
    - question: "Cât durează până primesc un răspuns?"
      answer: "Răspund la toate mesajele în maxim 24 de ore (de obicei în aceeași zi lucrătoare). În weekend-uri, răspund luni dimineața."
      icon: "question-circle"
    - question: "Pot programa o sesiune online?"
      answer: "Da, absolut! Ofer sesiuni atât față în față la cabinet, cât și online prin platforme securizate (Zoom, Google Meet). Eficacitatea terapiei online este demonstrată științific."
      icon: "video"
    - question: "Cât costă o sesiune de terapie?"
      answer: "Tariful pentru o sesiune individuală (50 minute) este 250 RON. Pentru terapie de cuplu/familie (75 minute) este 350 RON. Ofer și pachete cu discount."
      icon: "credit-card"
    - question: "Este sigură informația pe care o împărtășesc?"
      answer: "Absolut. Confidențialitatea este fundamentală în psihoterapie. Datele tale sunt protejate conform GDPR și codul deontologic al psihologilor. Nimic din ce discutăm nu părăsește cabinetul fără consimțământul tău explicit."
      icon: "shield-alt"
    - question: "Pot anula sau reprograma o sesiune?"
      answer: "Da, cu minim 24 de ore înainte. Anulările făcute cu mai puțin de 24h înainte se taxează integral, exceptând urgențele medicale."
      icon: "calendar-times"
    - question: "Cum mă pregătesc pentru prima sesiune?"
      answer: "Nu este nevoie de pregătire specială. Vino așa cum ești, cu întrebările și grijile tale. În prima sesiune vom discuta despre motivul pentru care cauți terapie și vom stabili împreună obiectivele."
      icon: "clipboard-list"

# Newsletter Section
newsletter:
  enable: true
  subtitle: "Rămâi la curent"
  title: "Resurse Gratuite pentru Sănătate Mintală"
  description: "Primește lunar articole, exerciții practice și sfaturi pentru dezvoltare personală direct în inbox."
  placeholder: "adresa@ta-de-email.ro"
  button_text: "Abonează-te"
  privacy_note: "Respectăm confidențialitatea ta. Poți să te dezabonezi oricând. Zero spam."
  benefits:
    - "Articole despre anxietate, depresie, relații"
    - "Exerciții de mindfulness și relaxare"
    - "Anunțuri despre workshopuri și webinarii"
    - "Resurse gratuite descărcabile"

# Emergency Banner
emergency:
  enable: true
  text: "**Urgență?** Dacă ai gânduri suicidare, sună la Telefonul Sufletului: 0800 801 200 (gratuit, 24/7)"
  type: "warning"
---

## Contact Direct

Pentru urgențe sau întrebări rapide, mă poți contacta direct:

- **Telefon:** [+40 721 234 567](tel:+40721234567)
- **Email:** [contact@alexandrabarbu.ro](mailto:contact@alexandrabarbu.ro)
- **WhatsApp:** [Trimite mesaj](https://wa.me/40721234567)

**Program răspunsuri:**
- Luni - Vineri: 9:00 - 20:00
- Sâmbătă: 10:00 - 14:00
- Duminică: Închis (răspund luni dimineața)
