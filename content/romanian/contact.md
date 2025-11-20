---
title: "Contact"
description: "Programează o consultație la cabinet sau online. Răspund în maxim 24 de ore. Sesiuni de terapie individuală, de cuplu și de familie."
layout: "flexible"
draft: false

sections:
  - type: "hero-breadcrumb"
  - type: "contact-info-cards"
  - type: "contact-options"
  - type: "contact-form-enhanced"
  - type: "feature-details"
  - type: "pricing-tables"
  - type: "faq-content"
  - type: "confidentiality-notice"
  - type: "cta-standard"

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
contact_info_cards:
  title: "Cum Mă **Poți Contacta**"
  description: "Alege modalitatea care ți se potrivește cel mai bine"
  cards:
    - title: "Telefon"
      icon: "phone"
      value: "+40 721 234 567"
      description: "Luni - Vineri: 09:00 - 20:00 | Sâmbătă: 10:00 - 14:00"
      link: "tel:+40721234567"
      link_text: "Sună Acum"
    - title: "Email"
      icon: "envelope"
      value: "contact@alexandrabarbu.ro"
      description: "Răspund în maxim 24 de ore (zile lucrătoare)"
      link: "mailto:contact@alexandrabarbu.ro"
      link_text: "Trimite Email"
    - title: "WhatsApp"
      icon: "lab la-whatsapp"
      value: "+40 721 234 567"
      description: "Mesaje text sau vocale, răspund rapid"
      link: "https://wa.me/40721234567"
      link_text: "Deschide WhatsApp"
    - title: "Cabinet București"
      icon: "map-marker-alt"
      value: "Str. Doamnei nr. 12, Sector 3"
      description: "București 030167, România"
      link: "https://maps.google.com/?q=Str.+Doamnei+12+Bucuresti"
      link_text: "Vezi pe Hartă"
  map:
    enable: true
    title: "Locația Cabinetului"
    embed_url: "https://maps.google.com/maps?q=Str.%20Doamnei%2012%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed"
    description: "Cabinet privat în centrul Bucureștiului, ușor accesibil cu transportul în comun sau mașina personală. Parcare disponibilă în zonă."

# Contact Options Section
contact_options:
  title: "Opțiuni de **Ședințe**"
  description: "Flexibilitate completă - alege ce ți se potrivește"
  options:
    - title: "Ședințe la Cabinet"
      icon: "clinic-medical"
      description: |
        Întâlniri față în față într-un spațiu confidențial, confortabil și sigur în centrul Bucureștiului.
        Atmosferă caldă, profesională și lipsită de judecată.
      features:
        - "Confidențialitate totală"
        - "Spațiu privat și confortabil"
        - "Acces ușor cu transportul în comun"
        - "Parcare disponibilă în zonă"
      button_text: "Vezi Locația"
      button_url: "#contact-info"
      button_variant: "primary"
    - title: "Ședințe Online"
      icon: "video"
      description: |
        Terapie la fel de eficientă, din confortul casei tale. Folosesc platforme securizate (Zoom, Google Meet)
        cu criptare end-to-end pentru a proteja confidențialitatea.
      features:
        - "Eficacitate dovedită științific"
        - "Conexiune sigură și criptată"
        - "Flexibilitate de program"
        - "Ideal pentru persoane în alte orașe"
      button_text: "Află Mai Mult"
      button_url: "/servicii/"
      button_variant: "secondary"

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

# Feature Details Section - Free Consultation
feature_details:
  kicker: "Fără Obligații"
  title: "Prima Consultație **Este Gratuită**"
  description: |
    Înțeleg că a căuta ajutor poate fi un pas dificil. De aceea, îți ofer prima întâlnire gratuit (20-30 minute)
    pentru a ne cunoaște, a discuta despre provocările tale și a vedea dacă abordarea mea ți se potrivește.
    Fără presiune, fără obligații.
  features:
    - title: "Evaluare Inițială Gratuită"
      description: |
        20-30 de minute în care discutăm despre situația ta, așteptările tale de la terapie și cum te pot ajuta.
        Îți explic și procesul terapeutic și răspund la orice întrebări ai.
      icon: "user-check"
    - title: "Confort și Confidențialitate"
      description: |
        Te vei simți ascultat, înțeles și respectat. Confidențialitatea este garantată prin codul deontologic
        și legislația GDPR. Nimic din ce discutăm nu părăsește cabinetul fără acordul tău.
      icon: "lock"
    - title: "Decizie Informată"
      description: |
        După întâlnirea inițială, vei avea toate informațiile necesare pentru a decide dacă vrei să continui.
        Nu există presiune sau obligații. Terapia funcționează cel mai bine când este alegerea ta liberă.
      icon: "hand-holding-heart"
    - title: "Răspuns Rapid"
      description: |
        Răspund la toate mesajele în maxim 24 de ore (de obicei în aceeași zi lucrătoare). Programarea se face rapid,
        adesea chiar în aceeași săptămână, în funcție de disponibilitate.
      icon: "clock"

# Pricing Tables Section
pricing_tables:
  title: "Tarife **Transparente**"
  description: "Fără costuri ascunse. Pachete cu discount disponibile."
  toggle:
    enable: false
  packages:
    - name: "Sesiune Individuală"
      price: "250"
      currency: "RON"
      duration: "/ 50 minute"
      description: "O sesiune de terapie individuală față în față sau online"
      features:
        - text: "50 de minute sesiune"
          included: true
        - text: "La cabinet sau online"
          included: true
        - text: "Metode bazate pe evidențe (CBT, EFT, SFT, ACT)"
          included: true
        - text: "Materiale și exerciții personalizate"
          included: true
        - text: "Suport între ședințe (email)"
          included: true
      button_text: "Programează"
      button_url: "#contact-form"
      button_variant: "outline-primary"
      featured: false
    - name: "Pachet 5 Ședințe"
      price: "1,150"
      currency: "RON"
      duration: "/ 5 sesiuni"
      description: "Pachet cu discount pentru terapie pe termen mediu"
      badge: "Economisești 100 RON"
      features:
        - text: "5 ședințe × 50 minute (250 RON/ședință → 230 RON/ședință)"
          included: true
        - text: "Toate beneficiile sesiunii individuale"
          included: true
        - text: "Flexibilitate de programare"
          included: true
        - text: "Valabilitate 3 luni"
          included: true
        - text: "Evaluare progres inclusă"
          included: true
      button_text: "Alege Pachetul"
      button_url: "#contact-form"
      button_variant: "primary"
      featured: true
    - name: "Terapie de Cuplu/Familie"
      price: "350"
      currency: "RON"
      duration: "/ 75 minute"
      description: "Sesiune extinsă pentru terapia de cuplu sau de familie"
      features:
        - text: "75 de minute sesiune"
          included: true
        - text: "La cabinet sau online"
          included: true
        - text: "Metode validate (Gottman, EFT, structurală)"
          included: true
        - text: "Exerciții pentru acasă"
          included: true
        - text: "Suport între ședințe"
          included: true
      button_text: "Programează"
      button_url: "#contact-form"
      button_variant: "outline-primary"
      featured: false
  note: "Tarifele includ TVA. Poți achita cash, card sau transfer bancar. Emitem facturi fiscale."

# FAQ Content Section
faq_content:
  title: "Întrebări **Frecvente**"
  description: "Răspunsuri la cele mai comune întrebări despre programare și procesul terapeutic"
  categories:
    - name: "Programare și Acces"
      slug: "programare"
      questions:
        - question: "Cât durează până primesc un răspuns?"
          answer: |
            Răspund la toate mesajele în maxim 24 de ore lucrătoare (de obicei în aceeași zi). Dacă trimiți
            un mesaj vineri seara sau în weekend, voi răspunde luni dimineața.
        - question: "Pot programa o sesiune online?"
          answer: |
            Da, absolut! Ofer sesiuni atât față în față la cabinet, cât și online prin platforme securizate
            cu criptare (Zoom, Google Meet). Eficacitatea terapiei online este demonstrată științific și este
            la fel de eficientă ca terapia față în față.
        - question: "Cât de repede pot obține o programare?"
          answer: |
            De obicei pot oferi o programare în aceeași săptămână sau următoarea, în funcție de disponibilitatea
            mea și a ta. Pentru urgențe, încerc să găsesc un slot cât mai repede posibil.
    - name: "Tarife și Plăți"
      slug: "tarife"
      questions:
        - question: "Cât costă o sesiune de terapie?"
          answer: |
            Tariful pentru o sesiune individuală (50 minute) este 250 RON. Pentru terapie de cuplu/familie
            (75 minute) este 350 RON. Ofer și pachete cu discount: 5 ședințe la 1,150 RON (economisești 100 RON).
        - question: "Cum pot plăti pentru ședințe?"
          answer: |
            Poți plăti cash, cu cardul la cabinet sau prin transfer bancar. Plata se face de obicei la sfârșitul
            fiecărei ședințe. Pentru pachete, plata se poate face în avans. Emitem facturi fiscale.
        - question: "Pot anula sau reprograma o sesiune?"
          answer: |
            Da, cu minim 24 de ore înainte de sesiune. Anulările făcute cu mai puțin de 24h înainte se taxează
            integral, exceptând urgențele medicale dovedite.
    - name: "Confidențialitate și Siguranță"
      slug: "confidentialitate"
      questions:
        - question: "Este sigură informația pe care o împărtășesc?"
          answer: |
            Absolut. Confidențialitatea este fundamentală în psihoterapie și este protejată prin:
            1) Codul deontologic al psihologilor (secret profesional)
            2) Legislația GDPR pentru protecția datelor
            3) Nimic din ce discutăm nu părăsește cabinetul fără consimțământul tău explicit scris
            Excepțiile legale (risc de vătămare, abuz) sunt explicate în primul contract.
        - question: "Sunt datele mele personale în siguranță?"
          answer: |
            Da. Datele tale personale sunt stocate securizat, criptat și sunt accesibile doar de mine.
            Nu le voi împărtăși niciodată cu terți fără acordul tău explicit, cu excepția obligațiilor legale.
    - name: "Procesul Terapeutic"
      slug: "proces"
      questions:
        - question: "Cum mă pregătesc pentru prima sesiune?"
          answer: |
            Nu este nevoie de pregătire specială. Vino așa cum ești, cu întrebările și grijile tale.
            În prima sesiune vom discuta despre motivul pentru care cauți terapie, așteptările tale și
            vom stabili împreună obiectivele. Îți recomand să fii deschis și sincer.
        - question: "Cât durează procesul terapeutic?"
          answer: |
            Durata variază în funcție de problemele cu care te confrunți și de obiectivele tale. Unele persoane
            observă îmbunătățiri în 5-8 ședințe (terapie scurtă), altele beneficiază de 12-20 de ședințe
            (terapie medie), iar în cazuri complexe (traume, probleme profunde) poate dura 6-12 luni sau mai mult.
            Evaluăm progresul regulat împreună.

# Confidentiality Notice Section
confidentiality_notice:
  title: "Urgențe și **Situații de Criză**"
  description: |
    **Important:** Cabinetul meu NU oferă servicii de urgență psihiatrică sau intervenție în criză 24/7.

    **Dacă te afli într-o situație de urgență** (gânduri suicidare, criză acută, risc de vătămare), te rog să contactezi:

    - **Telefonul Sufletului:** 0800 801 200 (gratuit, 24/7, confidențial)
    - **Serviciul de Urgență:** 112
    - **Spitalul de Psihiatrie "Alexandru Obregia":** 021 334 5894 (Urgențe)

    Pentru situații non-urgente, te voi contacta în maxim 24 de ore lucrătoare.
  variant: "warning"

# CTA Standard Section
cta_standard:
  kicker: "Fă Primul Pas Astăzi"
  title: "Pregătit să **Începi Călătoria Ta**?"
  description: |
    A cere ajutor este un semn de curaj și auto-compasiune. Fiecare călătorie începe cu un prim pas.
    Îți ofer un spațiu sigur, empatic și lipsit de judecată pentru a explora provocările tale și a descoperi
    propriile soluții.
  button_text: "Programează Consultația Gratuită"
  button_url: "#contact-form"
  button_variant: "primary"
  secondary_button_text: "Sună Acum"
  secondary_button_url: "tel:+40721234567"
  secondary_button_variant: "secondary"
---
