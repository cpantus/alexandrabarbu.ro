# Sveltia CMS Reconfiguration - Plan

**Created:** 2025-11-28
**Status:** In Progress
**Project:** alexandrabarbu.ro Hugo site

## Overview

Reconfigure Sveltia CMS from scratch to provide a full-featured `/admin` GUI with:
1. Edit menu categories
2. Add/remove sections to pages with content customization
3. Edit SEO settings
4. Edit site and page metadata/keywords
5. Add/remove images where allowed
6. Create/delete pages
7. List available sections

## Research Summary

**Documentation Created:** `/home/cere/Work/alex/alexandrabarbu.ro/sveltia.md` (3070 lines)

**Key Findings:**
- Sveltia CMS supports Variable Types (polymorphic lists) - perfect for section management
- 38 section types available in `layouts/partials/sections/`
- Current config.yml was outdated (pointed to wrong content paths `themes/andromeda-hugo/content/`)
- Content is actually at `content/romanian/` and `content/english/`

## Critical Issues with Original Config (RESOLVED)

1. **Wrong content paths:** Pointed to `themes/andromeda-hugo/content/` instead of `content/`
2. **No section management:** Users could not add/remove/reorder sections
3. **Static page definitions:** Each page hardcoded, no dynamic page creation
4. **Missing flexible layout integration:** The sections array was not exposed in CMS
5. **No available sections list:** Users didn't know what sections exist

---

## Implementation Phases

### Phase 1: Fix Content Paths & Structure

**Files:**
- `static/admin/index.html` - CMS entry point
- `static/admin/config.yml` - Local dev configuration

**Changes:**
1. Move admin files from theme to project root: `static/admin/`
2. Fix all content paths:
   - `themes/andromeda-hugo/content/romanian/` → `content/romanian/`
   - `themes/andromeda-hugo/content/english/` → `content/english/`

---

### Phase 2: Implement Section Management (Split Approach)

**Approach:** Keep compatibility with current Hugo templates by using:
1. `sections` array with simple type declarations
2. Separate front matter keys for each section's data (e.g., `hero_breadcrumb:`, `values_compass:`)

**Section Array (simple list of types):**
```yaml
- label: "Active Sections"
  name: "sections"
  widget: "list"
  hint: "Add section types to display on this page. Configure each section below."
  fields:
    - label: "Section Type"
      name: "type"
      widget: "select"
      options:
        - { label: "Hero Breadcrumb", value: "hero-breadcrumb" }
        - { label: "Values Compass", value: "values-compass" }
        # ... all 37 section types
```

**Separate Section Data Fields (collapsible objects):**
```yaml
- label: "Hero Breadcrumb Config"
  name: "hero_breadcrumb"
  widget: "object"
  collapsed: true
  required: false
  fields:
    - { label: "Title", name: "title", widget: "string" }
    - { label: "Subtitle", name: "subtitle", widget: "text", required: false }
    # ... all hero-breadcrumb fields
```

**Benefits:**
- 100% compatible with existing Hugo templates
- No template changes required
- Users select types, then configure each section separately
- Collapsed objects keep the UI clean

**Section Types (37 total):**

| Category         | Sections                                                                                          |
|------------------|---------------------------------------------------------------------------------------------------|
| Heroes (2)       | hero-breadcrumb, hero-about                                                                       |
| Core (5)         | values-intro, values-compass, feature-blocks, cta-standard, cta-split                             |
| Interactive (4)  | video-popup, faq-mini, method-tabs, blog-grid                                                     |
| Forms (3)        | contact-form-enhanced, signup-form-enhanced, newsletter-signup                                    |
| Trust (6)        | contact-info-cards, contact-options, onboarding-steps, privacy-guarantee, confidentiality-notice, credentials-showcase |
| Pricing (2)      | pricing-tables, pricing-packages                                                                  |
| Stats (1)        | stats-numbers                                                                                     |
| Testimonials (1) | testimonials-enhanced                                                                             |
| About/Bio (6)    | about-preview, approach-preview, services-preview, my-story, credentials-education, training-certifications |
| Methodology (5)  | therapeutic-process, methodology-zigzag, scientific-approach, methods-used, simple-process        |
| Specialized (2)  | problem-empathy, benefits-results                                                                 |

---

### Phase 3: Create Page Collections

**Folder Collections (create: true):**
```yaml
collections:
  # Romanian Pages (folder collection - can create new pages)
  - name: pages_ro
    label: "Pagini (Romanian)"
    folder: content/romanian
    create: true
    delete: true
    slug: "{{slug}}"
    extension: md
    format: yaml-frontmatter
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Layout", name: "layout", widget: "hidden", default: "flexible" }
      - { label: "Draft", name: "draft", widget: "boolean", default: false }
      - { label: "SEO Description", name: "description", widget: "text" }
      - { label: "Keywords", name: "keywords", widget: "list", required: false }
      - label: "Page Sections"
        name: "sections"
        widget: "list"
        # ... all section types
```

---

### Phase 4: Menu/Navigation Management

**Data File Collection:**
```yaml
- name: navigation
  label: "Navigation Menu"
  files:
    - name: menu_ro
      label: "Romanian Menu"
      file: config/_default/menus.ro.toml
      fields:
        - label: "Main Menu Items"
          name: "main"
          widget: "list"
          fields:
            - { label: "Name", name: "name", widget: "string" }
            - { label: "URL", name: "url", widget: "string" }
            - { label: "Weight (Order)", name: "weight", widget: "number" }
            - { label: "Parent", name: "parent", widget: "string", required: false }
```

---

### Phase 5: SEO & Metadata Management

**Site-Wide SEO (file collection):**
```yaml
- name: settings
  label: "Site Settings"
  files:
    - name: social
      label: "Social Media"
      file: data/social.yml
      fields:
        - { label: "Facebook", name: "facebook", widget: "string", required: false }
        - { label: "Instagram", name: "instagram", widget: "string", required: false }
        # ... other social links
```

**Per-Page SEO (in page fields):**
```yaml
- label: "SEO Description"
  name: "description"
  widget: "text"
  hint: "150-160 characters for search engines"

- label: "Keywords"
  name: "keywords"
  widget: "list"
  required: false
```

---

### Phase 6: Image Management

**Media Configuration:**
```yaml
media_folder: static/images
public_folder: /images
```

**Image Fields in Sections:**
```yaml
- label: "Hero Image"
  name: "hero_image"
  widget: "image"
  required: false
  hint: "Alternative to compass animation"
```

---

### Phase 7: Available Sections Reference

**File:** `data/cms_sections.yaml`
```yaml
sections:
  - type: hero-breadcrumb
    label: "Hero with Breadcrumb"
    description: "Page header with title, breadcrumb, and compass animation"
    category: "Heroes"

  - type: values-compass
    label: "Values Compass"
    description: "Compass layout displaying core values with glassmorphism"
    category: "Core"

  # ... all 37 sections with descriptions
```

---

## Key Decision

**Section Data Approach:** Split (Current)
- Keep `sections` array for type declarations (e.g., `- type: "hero-breadcrumb"`)
- Separate front matter keys for section data (e.g., `hero_breadcrumb: {...}`)
- Reason: 100% compatible with existing Hugo templates, no template changes needed

---

## Success Criteria

- [x] `/admin` loads successfully
- [ ] Can create new pages in both languages
- [ ] Can add/remove sections to any page
- [ ] Can customize content within each section
- [ ] Can edit main navigation menu
- [ ] Can edit SEO settings (global + per-page)
- [ ] Can upload and manage images
- [ ] Can delete pages
- [x] Available sections list visible
- [ ] Hugo builds successfully with CMS-edited content
- [ ] Both RO and EN content works correctly
