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
