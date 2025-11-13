---
title: "Component Preview - Atomic Design System"
date: 2025-11-13
draft: true
layout: "components-preview"
type: "page"
description: "Preview of all atomic components in the Andromeda theme"
---

# Atomic Design System Components

This page showcases all atomic components available in the Andromeda Hugo theme.
Use this page to preview and test components during development.

## Atoms

### Button Atom
Reusable button component with multiple variants and options.

### Heading Atom
Semantic heading component (h1-h6) with variants (default, gradient, section, bold) and alignment options.

### Input Atom
Flexible form input component supporting text, email, password, tel, textarea, checkbox, radio, and select types.

### Icon Atom
Icon component using Line Awesome icons with size presets (xs-4x), color variants, and accessibility support.

### Image Atom
Responsive image component with Hugo processing, WebP support, and lazy loading.

## Usage

### Button Examples

**Primary Button:**
```
{{ partial "atoms/button.html" (dict
  "text" "Primary Button"
  "href" "#"
  "variant" "primary"
) }}
```

**Secondary Button:**
```
{{ partial "atoms/button.html" (dict
  "text" "Secondary Button"
  "href" "#"
  "variant" "secondary"
) }}
```

**Outline Button:**
```
{{ partial "atoms/button.html" (dict
  "text" "Outline Button"
  "href" "#"
  "variant" "outline-primary"
) }}
```

**Submit Button:**
```
{{ partial "atoms/button.html" (dict
  "text" "Submit"
  "type" "submit"
  "variant" "primary"
  "fullWidth" true
) }}
```

### Heading Examples

**Section Title:**
```
{{ partial "atoms/heading.html" (dict
  "text" "Page Title"
  "level" 2
  "variant" "section"
  "align" "center"
) }}
```

**Gradient Heading:**
```
{{ partial "atoms/heading.html" (dict
  "text" "Beautiful Gradient"
  "level" 2
  "variant" "gradient"
  "class" "mb-4"
) }}
```

**With Subtitle:**
```
{{ partial "atoms/heading.html" (dict
  "text" "Main Title"
  "level" 2
  "variant" "section"
  "subtitle" "This is a subtitle"
) }}
```

### Input Examples

**Text Input:**
```
{{ partial "atoms/input.html" (dict
  "type" "email"
  "name" "email"
  "id" "email"
  "label" "Email Address"
  "placeholder" "your@email.com"
  "required" true
) }}
```

**Textarea:**
```
{{ partial "atoms/input.html" (dict
  "type" "textarea"
  "name" "message"
  "id" "message"
  "label" "Message"
  "rows" 4
) }}
```

**Checkbox:**
```
{{ partial "atoms/input.html" (dict
  "type" "checkbox"
  "name" "terms"
  "id" "terms"
  "label" "I agree to the terms"
) }}
```

### Icon Examples

**Basic Icon:**
```
{{ partial "atoms/icon.html" (dict
  "name" "check-circle"
  "color" "success"
  "class" "me-2"
) }}
```

**Large Icon:**
```
{{ partial "atoms/icon.html" (dict
  "name" "shield-alt"
  "size" "4x"
  "color" "primary"
) }}
```

**Custom Size:**
```
{{ partial "atoms/icon.html" (dict
  "name" "arrow-right"
  "size" "1.5rem"
  "class" "ms-2"
) }}
```

### Image Examples

**Basic Image:**
```
{{ partial "atoms/image.html" (dict
  "src" "images/example.jpg"
  "alt" "Example image"
  "width" 800
) }}
```

**Responsive Image with WebP:**
```
{{ partial "atoms/image.html" (dict
  "src" "images/hero.jpg"
  "alt" "Hero image"
  "width" 1200
  "height" 600
  "responsive" true
  "webp" true
) }}
```
