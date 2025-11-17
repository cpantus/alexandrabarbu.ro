---
title: "Galerie Componente"
description: "Documentație completă pentru toate cele 48 de componente reutilizabile în tema Andromeda Hugo"
layout: "flexible"
draft: true

sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "feature-blocks"
  - type: "benefits-grid"
  - type: "feature-details"
  - type: "method-tabs"
  - type: "stats-numbers"
  - type: "pricing-tables"
  - type: "faq-mini"
  - type: "contact-form-enhanced"

# Hero Section
hero_breadcrumb:
  title: "Documentație Componente"
  subtitle: "Bibliotecă completă cu 48 de componente reutilizabile"
  breadcrumb:
    - name: "Acasă"
      url: "/"
    - name: "Documentație"
      url: "#"
    - name: "Componente"

# Introduction Section
values_intro:
  enable: true
  title: "Prezentare Bibliotecă Componente"
  subtitle: "Sistem de Design Atomic"
  content: |
    ## Arhitectură

    Această temă implementează un sistem complet de **Design Atomic** cu 48 de componente organizate în 4 nivele:

    - **5 Atomi** - Blocuri de bază (buton, titlu, icon, imagine, input)
    - **20 Molecule** - Compoziții simple de componente
    - **2 Organisme** - Secțiuni complexe (header, footer)
    - **24 Secțiuni** - Secțiuni de pagină full-width

    ### Principii de Design

    1. **Reutilizare** - Fiecare componentă este independentă și reutilizabilă
    2. **Compoziție** - Componente de nivel superior construite din atomi/molecule
    3. **Bazat pe Date** - Tot conținutul prin front matter (fără text hardcodat)
    4. **Accesibilitate** - Conform WCAG AA cu HTML semantic
    5. **Performanță** - Optimizat pentru viteză cu partial caching

    ### Pattern de Utilizare

    ```yaml
    # În front matter-ul paginii
    sections:
      - type: "hero-breadcrumb"
      - type: "benefits-grid"

    hero_breadcrumb:
      title: "Titlu Pagină"
      subtitle: "Subtitlu opțional"
    ```

# Atoms Documentation
feature_blocks_section:
  enable: true
  title: "Atomi (5 Componente)"
  subtitle: "Blocuri de Bază"
  blocks:
    - icon: "cube"
      title: "Atom Buton"
      description: |
        **Fișier:** `layouts/partials/atoms/button.html`

        **Scop:** Componentă de buton reutilizabilă cu multiple variante

        **Proprietăți:**
        - `text` (necesar) - Text/etichetă buton
        - `href` (opțional) - URL link
        - `variant` - primary|secondary|outline-primary|outline-secondary
        - `size` - sm|md|lg
        - `type` - link|button|submit
        - `fullWidth` - true|false
        - `icon` - Clasă icon (ex: "las la-arrow-right")
        - `iconPosition` - left|right

        **Utilizare:**
        ```
        {{ partial "atoms/button.html" (dict
          "text" "Apasă aici"
          "href" "/contact"
          "variant" "primary"
          "size" "md"
          "icon" "las la-arrow-right"
        )}}
        ```

        **Variante:** 4 stiluri (primary, secondary, outline-primary, outline-secondary)

        **Accesibilitate:** Semantică corectă buton/link, navigabil cu tastatura

    - icon: "heading"
      title: "Atom Titlu"
      description: |
        **Fișier:** `layouts/partials/atoms/heading.html`

        **Scop:** Componentă de titlu semantic cu variante

        **Proprietăți:**
        - `text` (necesar) - Conținut text titlu
        - `level` - Nivel titlu 1-6 (default: 2)
        - `variant` - default|gradient|section|bold
        - `align` - left|center|right
        - `class` - Clase CSS adiționale
        - `subtitle` - Text subtitlu opțional
        - `markdown` - Aplică filtru markdownify
        - `id` - HTML id pentru link-uri anchor

        **Utilizare:**
        ```
        {{ partial "atoms/heading.html" (dict
          "text" "Titlu Pagină"
          "level" 2
          "variant" "section"
          "align" "center"
          "subtitle" "Subtitlu opțional"
        )}}
        ```

        **Variante:** 4 stiluri (default, gradient, section, bold)

        **Accesibilitate:** Ierarhie corectă titluri, HTML semantic

    - icon: "icons"
      title: "Atom Icon"
      description: |
        **Fișier:** `layouts/partials/atoms/icon.html`

        **Scop:** Componentă icon cu Line Awesome icons

        **Proprietăți:**
        - `name` (necesar) - Nume icon fără prefix "la-"
        - `size` - xs|sm|md|lg|xl|2x|3x sau custom (ex: "2rem")
        - `color` - primary|secondary|success|danger|warning|info|light|dark
        - `class` - Clase CSS adiționale
        - `style` - Stiluri inline
        - `prefix` - Bibliotecă icon (las|lar|lab|la)
        - `ariaLabel` - Etichetă accesibilitate
        - `ariaHidden` - Ascunde de screen readers

        **Utilizare:**
        ```
        {{ partial "atoms/icon.html" (dict
          "name" "check-circle"
          "size" "2x"
          "color" "success"
          "class" "me-2"
        )}}
        ```

        **Biblioteci:** Line Awesome (las, lar, lab, la)

        **Accesibilitate:** Etichete ARIA pentru screen readers

    - icon: "image"
      title: "Atom Imagine"
      description: |
        **Fișier:** `layouts/partials/atoms/image.html`

        **Scop:** Componentă imagine optimizată cu formate moderne

        **Proprietăți:**
        - `src` (necesar) - Cale imagine (din assets/ sau static/)
        - `alt` (necesar) - Text alt pentru accesibilitate
        - `width` - Lățime imagine
        - `height` - Înălțime imagine
        - `class` - Clase CSS adiționale
        - `lazy` - Activează lazy loading (default: true)
        - `sizes` - Atribut sizes responsive
        - `quality` - Calitate imagine (default: 85)

        **Utilizare:**
        ```
        {{ partial "atoms/image.html" (dict
          "src" "images/hero.jpg"
          "alt" "Descriere imagine hero"
          "width" 1200
          "height" 600
          "lazy" true
        )}}
        ```

        **Caracteristici:**
        - Formate AVIF/WebP/original cu fallback `<picture>`
        - Generare srcset responsive
        - Lazy loading cu blur-up placeholder
        - Reducere dimensiune 60-80%

        **Accesibilitate:** Text alt necesar, semantică corectă

    - icon: "edit"
      title: "Atom Input"
      description: |
        **Fișier:** `layouts/partials/atoms/input.html`

        **Scop:** Input formular cu stări de validare

        **Proprietăți:**
        - `type` (necesar) - text|email|tel|number|password|textarea
        - `name` (necesar) - Atribut name input
        - `id` (necesar) - Atribut id input
        - `label` - Etichetă input
        - `placeholder` - Text placeholder
        - `required` - true|false
        - `value` - Valoare default
        - `class` - Clase CSS adiționale
        - `helpText` - Text ajutor sub input
        - `error` - Mesaj eroare
        - `success` - Mesaj succes

        **Utilizare:**
        ```
        {{ partial "atoms/input.html" (dict
          "type" "email"
          "name" "email"
          "id" "email"
          "label" "Adresă Email"
          "placeholder" "tu@exemplu.ro"
          "required" true
        )}}
        ```

        **Validare:** Stări eroare/succes cu mesaje

        **Accesibilitate:** Etichete asociate, atribute ARIA

# Molecules Documentation
benefits_grid_section:
  enable: true
  title: "Molecule (20 Componente)"
  subtitle: "Componente Compozite"
  benefits:
    - icon: "layer-group"
      title: "Moleculă Card"
      description: |
        **Fișier:** `layouts/partials/molecules/card.html` (223 linii)

        **Variante:** feature|pricing|testimonial

        **Card Feature:**
        - icon, iconSize, iconColor, title, description, button

        **Card Preț:**
        - currency, price, priceMonthly, priceYearly, period, features, button, featured

        **Card Testimonial:**
        - quote, author, role, avatar, rating

        **Utilizat în:** benefits-grid, feature-blocks, pricing-tables (3 secțiuni)

    - icon: "blog"
      title: "Card Blog"
      description: |
        **Fișier:** `layouts/partials/molecules/blog-card.html` (126 linii)

        **Proprietăți:** title, link, image, description, date, author, category, type, readTime

        **Caracteristici:** Imagine cu badge, afișare metadata, excerpt, layout responsive

        **Utilizat în:** blog-grid, related-services (2 secțiuni)

    - icon: "chart-bar"
      title: "Card Statistică"
      description: |
        **Fișier:** `layouts/partials/molecules/stat-card.html` (117 linii)

        **Proprietăți:** value, label, icon, suffix, prefix, color, animated, size (sm|md|lg), aos

        **Caracteristici:** Contoare animate, suport icon, prefix/suffix, 3 dimensiuni

        **Utilizat în:** stats-numbers, pricing-tables, benefits-grid (3 secțiuni)

    - icon: "clock"
      title: "Pas Timeline"
      description: |
        **Fișier:** `layouts/partials/molecules/timeline-step.html` (142 linii)

        **Proprietăți:** index, icon, title, description, duration, variant (standard|alternating|simple), number

        **Caracteristici:** 3 variante vizuale, marcatori icon sau număr, afișare durată

        **Utilizat în:** timeline-process, onboarding-steps (2 secțiuni)

    - icon: "wpforms"
      title: "Câmp Formular"
      description: |
        **Fișier:** `layouts/partials/molecules/form-field.html` (253 linii)

        **Proprietăți:** type, name, id, label, error, success, helpText, icon, floatingLabel, validation

        **Caracteristici:** Stări validare, mesaje eroare/succes, etichete flotante, suport icon

        **Utilizat în:** contact-form-enhanced, signup-form-enhanced, newsletter-signup (6 secțiuni)

# Stats Section
stats_section:
  enable: true
  title: "Performanță & Calitate"
  subtitle: "Metrici Optimizare"
  stats:
    - value: "48"
      label: "Total Componente"
      icon: "cubes"
      suffix: ""

    - value: "80"
      label: "Scor Reutilizare"
      icon: "recycle"
      suffix: "%"

    - value: "998"
      label: "Linii CSS Critice"
      icon: "file-code"
      suffix: ""

    - value: "100"
      label: "Conformitate WCAG AA"
      icon: "universal-access"
      suffix: "%"

# FAQ Section
faq_mini_section:
  enable: true
  title: "Întrebări Frecvente Documentație"
  subtitle: "Întrebări Comune"
  faqs:
    - question: "Cum folosesc o componentă?"
      answer: "Folosește funcția `partial` din Hugo cu un dict de proprietăți. Exemplu: `{{ partial \"atoms/button.html\" (dict \"text\" \"Apasă\" \"variant\" \"primary\") }}`"

    - question: "Care e diferența între atomi și molecule?"
      answer: "Atomii sunt elemente de bază (buton, icon, input). Moleculele combină atomii în unități funcționale (card, form-field, navigation)."

    - question: "Pot personaliza stilul componentelor?"
      answer: "Da! Transmite clase CSS adiționale prin parametrul `class` sau suprascrie stilurile în SCSS-ul tău custom."

    - question: "Sunt componentele accesibile?"
      answer: "Toate componentele respectă standardele WCAG AA cu HTML semantic, etichete ARIA și suport navigare cu tastatura."

    - question: "Cum e optimizată performanța?"
      answer: "Componentele folosesc partial caching, lazy loading, formate imagine moderne (AVIF/WebP) și bundle-uri CSS minimale."

    - question: "Unde sunt localizate fișierele componentelor?"
      answer: "Atomi: `layouts/partials/atoms/`, Molecule: `layouts/partials/molecules/`, Organisme: `layouts/partials/organisms/`, Secțiuni: `layouts/partials/sections/`"
---

## Bibliotecă Componente

Această pagină prezintă toate **48 componentele** din tema Andromeda Hugo. Componentele sunt organizate folosind principiile **Atomic Design** pentru reutilizare și întreținere maximă.

### Navigare Rapidă

- [Atomi (5)](#atomi-5-componente) - Blocuri de bază
- [Molecule (20)](#molecule-20-componente) - Componente compozite
- [Organisme (2)](#organisme-2-componente) - Secțiuni complexe
- [Secțiuni (24)](#sectiuni-24-componente) - Secțiuni pagină full-width

### Beneficii Arhitectură

- **80% Reutilizare** - Componentele se compun împreună eficient
- **Proprietăți Type-Safe** - Documentație clară parametri
- **Performanță** - Partial caching reduce timpul de build cu 84%
- **Accesibilitate** - Conform WCAG AA în totalitate
- **Întreținere** - Sursă unică de adevăr pentru fiecare pattern
