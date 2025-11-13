# Data Conventions & Content Management

**Version**: 1.0.0
**Phase**: 2 - Data Organization
**Date**: 2025-11-13
**Last Updated**: 2025-11-13

---

## Overview

This document establishes conventions for organizing and managing content data in the Andromeda Hugo theme. Following these conventions ensures consistency, maintainability, and proper separation of concerns.

---

## Data Layer Hierarchy

### 1. Front Matter (Page-Specific)

**Location**: Inside content files (`.md`)
**Scope**: Single page only
**Use for**: Page-unique content, custom layout parameters

**Example** (`content/romanian/servicii.md`):
```yaml
---
title: "Servicii"
description: "Serviciile noastre de terapie"
layout: "flexible"

# Page-specific sections
sections:
  - type: "hero-breadcrumb"
    title: "Servicii de Terapie"

  - type: "benefits_section"
    enable: true
    subtitle: "BENEFICII"
    title: "De Ce Să Alegi Terapia?"
    benefits:
      - icon: "las la-heart"
        title: "Empatie și Înțelegere"
      - icon: "las la-shield-alt"
        title: "Confidențialitate Totală"

  - type: "faq_items"
    - question: "Cât durează o ședință?"
      answer: "O ședință durează aproximativ 50 de minute."
---
```

**Best practices**:
- Keep data minimal and page-specific
- Use for unique content that won't be reused
- Ideal for flexible layout sections
- Don't duplicate data across pages

---

### 2. Data Files (Shared/Reusable)

**Location**: `data/` directory
**Scope**: Multiple pages or site-wide
**Use for**: Reusable content, structured data, collections

#### Directory Structure

```
data/
├── shared/              # Cross-page reusable content
│   ├── testimonials.yaml
│   ├── team.yaml
│   ├── services.yaml
│   ├── pricing.yaml
│   └── social.yaml
│
├── translations/        # Custom i18n data
│   ├── ro.yaml
│   └── en.yaml
│
└── config/             # Non-content configuration
    ├── navigation.yaml
    └── footer.yaml
```

#### Example: Testimonials (`data/shared/testimonials.yaml`)

```yaml
items:
  - id: "testimonial-1"
    quote: "Terapia m-a ajutat enorm să înțeleg mai bine emoțiile mele."
    author: "Maria P."
    role: "Client"
    avatar: "images/testimonials/maria.jpg"
    rating: 5
    date: 2025-01-15
    featured: true
    categories: ["individual", "anxiety"]

  - id: "testimonial-2"
    quote: "Experiență profesionistă și caldă. Recomand cu încredere!"
    author: "Ion D."
    role: "Client"
    avatar: "images/testimonials/ion.jpg"
    rating: 5
    date: 2025-01-10
    featured: false
    categories: ["couple", "communication"]
```

**Usage in templates**:
```html
{{ range site.Data.shared.testimonials.items }}
  {{ partial "molecules/card.html" (dict
    "variant" "testimonial"
    "quote" .quote
    "author" .author
    "role" .role
    "avatar" .avatar
    "rating" .rating
  ) }}
{{ end }}
```

#### Example: Team (`data/shared/team.yaml`)

```yaml
members:
  - id: "alexandra-barbu"
    name: "Alexandra Barbu"
    role: "Psihoterapeut"
    specialization: ["Anxietate", "Depresie", "Terapie de cuplu"]
    bio: "Psihoterapeut cu peste 10 ani de experiență..."
    image: "images/team/alexandra.jpg"
    email: "contact@alexandrabarbu.ro"
    phone: "+40 123 456 789"
    social:
      - name: "linkedin"
        url: "https://linkedin.com/in/..."
    credentials:
      - "Licențiat în Psihologie - Universitatea București"
      - "Master în Psihoterapie Cognitivă"
    languages: ["Română", "Engleză"]
    availability:
      monday: "09:00-17:00"
      tuesday: "09:00-17:00"
      wednesday: "09:00-17:00"
```

#### Example: Services (`data/shared/services.yaml`)

```yaml
categories:
  - id: "individual-therapy"
    name: "Terapie Individuală"
    icon: "user"
    description: "Terapie personalizată pentru nevoile tale"
    services:
      - id: "anxiety-treatment"
        name: "Tratament Anxietate"
        short_desc: "Tehnici dovedite pentru gestionarea anxietății"
        duration: "50 minute"
        price: 200
        currency: "RON"
        features:
          - "Evaluare inițială gratuită"
          - "Plan personalizat de tratament"
          - "Tehnici CBT și mindfulness"

      - id: "depression-treatment"
        name: "Tratament Depresie"
        short_desc: "Suport profesionist pentru depresie"
        duration: "50 minute"
        price: 200
        currency: "RON"

  - id: "couple-therapy"
    name: "Terapie de Cuplu"
    icon: "heart"
    description: "Întărește relația și îmbunătățește comunicarea"
```

#### Example: Pricing (`data/shared/pricing.yaml`)

```yaml
plans:
  - id: "starter"
    name: "Individual"
    price_monthly: 200
    price_yearly: 2000
    currency: "RON"
    description: "Perfect pentru persoane care încep terapia"
    features:
      - "4 ședințe pe lună"
      - "Durata: 50 minute"
      - "Suport email 24/7"
      - "Resurse educaționale"
    button_label: "Programează-te"
    button_link: "/contact/"
    featured: false

  - id: "professional"
    name: "Intensiv"
    price_monthly: 400
    price_yearly: 4000
    currency: "RON"
    description: "Cel mai popular - pentru progres accelerat"
    features:
      - "8 ședințe pe lună"
      - "Durata: 50 minute"
      - "Suport prioritar"
      - "Materiale personalizate"
      - "Exerciții suplimentare"
    button_label: "Începe Acum"
    button_link: "/contact/"
    featured: true
```

#### Example: Social Links (`data/shared/social.yaml`)

```yaml
links:
  - name: "facebook"
    url: "https://facebook.com/alexandrabarbu"
    icon: "facebook-f"
    label: "Urmărește-ne pe Facebook"

  - name: "instagram"
    url: "https://instagram.com/alexandrabarbu"
    icon: "instagram"
    label: "Urmărește-ne pe Instagram"

  - name: "linkedin"
    url: "https://linkedin.com/in/alexandrabarbu"
    icon: "linkedin"
    label: "Conectează-te pe LinkedIn"
```

**Usage**:
```html
{{ partial "molecules/social-links.html" (dict
  "links" site.Data.shared.social.links
) }}
```

---

### 3. Site Parameters (Configuration)

**Location**: `hugo.toml` (or `config/_default/params.toml`)
**Scope**: Site-wide settings and constants
**Use for**: Site metadata, global settings, feature flags

**Example** (`hugo.toml`):
```toml
[params]
  # Site metadata
  description = "Cabinet de psihoterapie Alexandra Barbu"
  author = "Alexandra Barbu"
  keywords = ["psihoterapie", "terapie", "psiholog"]

  # Contact information
  email = "contact@alexandrabarbu.ro"
  phone = "+40 123 456 789"
  address = "Str. Exemplu nr. 1, București"

  # Business settings
  currency = "RON"
  timezone = "Europe/Bucharest"
  booking_system = "calendly"

  # Feature flags
  [params.features]
    blog = true
    testimonials = true
    booking = true
    multilingual = true

  # SEO
  [params.seo]
    google_analytics = "G-XXXXXXXXXX"
    google_site_verification = "..."

  # Social media
  [params.social]
    facebook = "alexandrabarbu"
    instagram = "alexandrabarbu"
    linkedin = "alexandrabarbu"
```

**Usage**:
```html
{{ site.Params.email }}
{{ site.Params.features.testimonials }}
{{ site.Params.social.facebook }}
```

---

## Data Organization Patterns

### Pattern 1: List with Details

**Use case**: Services, team members, products

**Structure**:
```yaml
# data/shared/services.yaml
items:
  - id: "service-1"
    name: "Service Name"
    slug: "service-name"  # For URL generation
    # ... other fields
```

**Page detail** (`content/servicii/service-name.md`):
```yaml
---
title: "Service Name"
service_id: "service-1"  # Links to data file
layout: "service-detail"
---

Detailed content goes here...
```

**Template**:
```html
{{/* Get service data */}}
{{ $serviceId := .Params.service_id }}
{{ $service := index (where site.Data.shared.services.items "id" $serviceId) 0 }}

{{/* Use both data and content */}}
<h1>{{ $service.name }}</h1>
{{ .Content }}
```

---

### Pattern 2: Filtered Collections

**Use case**: Blog posts by category, services by type

**Data file** (`data/shared/blog-categories.yaml`):
```yaml
categories:
  - id: "anxiety"
    name: "Anxietate"
    description: "Articole despre anxietate"
    color: "primary"

  - id: "relationships"
    name: "Relații"
    description: "Articole despre relații"
    color: "danger"
```

**Content files**:
```yaml
---
title: "Cum să Gestionezi Anxietatea"
categories: ["anxiety"]
---
```

**Template**:
```html
{{/* Get all posts in category */}}
{{ $categoryId := .Params.category_id }}
{{ $posts := where site.RegularPages "Params.categories" "intersect" (slice $categoryId) }}

{{ range $posts }}
  <article>{{ .Title }}</article>
{{ end }}
```

---

### Pattern 3: Localized Data

**Use case**: Multilingual content that needs translation

**Structure**:
```
data/
├── ro/
│   └── testimonials.yaml
└── en/
    └── testimonials.yaml
```

**Romanian** (`data/ro/testimonials.yaml`):
```yaml
items:
  - quote: "Experiență minunată!"
    author: "Maria P."
```

**English** (`data/en/testimonials.yaml`):
```yaml
items:
  - quote: "Amazing experience!"
    author: "Maria P."
```

**Template**:
```html
{{ $lang := .Language.Lang }}
{{ $testimonials := index site.Data $lang "testimonials" }}

{{ range $testimonials.items }}
  {{ .quote }}
{{ end }}
```

---

## Naming Conventions

### File Names

**Data files**:
- Use kebab-case: `team-members.yaml`, `service-categories.yaml`
- Be descriptive: `testimonials.yaml` not `test.yaml`
- Use `.yaml` extension (consistent with Hugo best practices)

**Content files**:
- Use kebab-case: `terapie-individuala.md`
- Match slugs: filename should match URL slug
- Use language prefix for multilingual: `ro/servicii.md`, `en/services.md`

### Field Names

**YAML keys**:
- Use snake_case: `price_monthly`, `button_label`
- Be consistent across files
- Use descriptive names: `short_description` not `short_desc`

**Exceptions**: When matching Hugo conventions
- Front matter uses snake_case: `hero_image`, `meta_description`
- Template parameters use camelCase: `iconSize`, `buttonVariant`

### ID Fields

**Always include IDs**:
```yaml
items:
  - id: "unique-identifier"  # Required for lookups
    name: "Display Name"
    # ... other fields
```

**ID format**:
- Use kebab-case: `individual-therapy`, `testimonial-1`
- Be unique within collection
- Be stable (don't change IDs once published)

---

## Migration Guide

### Moving Front Matter to Data Files

**When to migrate**:
- Content is used on 3+ pages
- Content needs centralized updates
- Content is structured and reusable

**Step 1**: Create data file
```yaml
# data/shared/testimonials.yaml
items:
  - id: "testimonial-1"
    quote: "Great service!"
    author: "John Doe"
```

**Step 2**: Remove from front matter
```yaml
# Before
testimonials:
  - quote: "Great service!"
    author: "John Doe"

# After (just reference)
testimonials_source: "shared"
```

**Step 3**: Update template
```html
{{/* Before */}}
{{ range .Params.testimonials }}

{{/* After */}}
{{ range site.Data.shared.testimonials.items }}
```

---

## Best Practices

### DO

✅ **Use data files for**:
- Reusable collections (testimonials, team, services)
- Structured data (pricing, features)
- Cross-page references
- Centralized updates

✅ **Use front matter for**:
- Page-specific content
- Layout configuration
- Unique sections
- Override data

✅ **Use site params for**:
- Global constants
- Contact information
- Feature flags
- SEO settings

### DON'T

❌ **Don't duplicate data** across files
❌ **Don't hardcode** contact info in templates
❌ **Don't mix languages** in single data file (use language folders)
❌ **Don't use front matter** for shared data

---

## Validation Checklist

Before deploying data changes:
- [ ] IDs are unique within each collection
- [ ] Required fields are present in all items
- [ ] File names follow naming conventions
- [ ] Data is in correct location (front matter vs data files)
- [ ] Translations exist for all languages
- [ ] Templates updated to use new data structure
- [ ] No duplicate data across files
- [ ] YAML syntax is valid (test build)

---

## Examples by Use Case

### FAQ Section

**Data file** (`data/shared/faqs.yaml`):
```yaml
categories:
  - id: "general"
    name: "Întrebări Generale"
    items:
      - question: "Cât durează o ședință?"
        answer: "O ședință durează aproximativ 50 de minute."

      - question: "Cât costă o ședință?"
        answer: "Tariful este de 200 RON per ședință."
```

**Template**:
```html
{{ partial "molecules/accordion.html" (dict
  "items" site.Data.shared.faqs.categories.0.items
  "id" "faqAccordion"
) }}
```

### Pricing Table

**Data file** (`data/shared/pricing.yaml`) - Already shown above

**Template**:
```html
<div class="row">
  {{ range site.Data.shared.pricing.plans }}
    <div class="col-md-4">
      {{ partial "molecules/card.html" (dict
        "variant" "pricing"
        "title" .name
        "priceMonthly" .price_monthly
        "priceYearly" .price_yearly
        "currency" .currency
        "description" .description
        "features" .features
        "button" (dict
          "text" .button_label
          "href" .button_link
        )
        "featured" .featured
      ) }}
    </div>
  {{ end }}
</div>
```

### Team Section

**Data file** - Already shown above

**Template**:
```html
{{ range site.Data.shared.team.members }}
  <div class="team-member">
    <img src="{{ .image | relURL }}" alt="{{ .name }}">
    <h3>{{ .name }}</h3>
    <p>{{ .role }}</p>
    {{ partial "molecules/social-links.html" (dict "links" .social) }}
  </div>
{{ end }}
```

---

## References

- **Hugo Data Templates**: https://gohugo.io/templates/data-templates/
- **Front Matter**: https://gohugo.io/content-management/front-matter/
- **Site Configuration**: https://gohugo.io/getting-started/configuration/
- **Multilingual**: https://gohugo.io/content-management/multilingual/

---

## Changelog

### Version 1.0.0 (2025-11-13)
- Initial data conventions established
- Defined three-tier data hierarchy
- Created naming conventions
- Documented migration patterns
- Added validation checklist
- Provided use case examples
