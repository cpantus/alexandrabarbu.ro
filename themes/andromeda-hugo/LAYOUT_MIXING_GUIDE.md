# Layout Mixing Configuration Examples
# This file demonstrates how to mix and match sections between pages

## Example 1: Services page with career elements
```yaml
---
title: "Servicii"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"       # From career page
  - type: "feature-blocks"     # Original services
  - type: "benefits-grid"      # From career page
  - type: "pricing-tables"     # Original services
  - type: "video-popup"        # Original services
---
```

## Example 2: Career page with services elements
```yaml
---
title: "Corporate"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "feature-blocks"     # From services page
  - type: "values-intro"       # Original career
  - type: "pricing-tables"     # From services page
  - type: "benefits-grid"      # Original career
  - type: "job-listings"       # Original career
---
```

## Example 3: Hybrid page mixing both
```yaml
---
title: "Pachete Complete"
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "values-intro"
  - type: "feature-blocks"
  - type: "benefits-grid"
  - type: "pricing-tables"
  - type: "video-popup"
  - type: "job-listings"
---
```

## Available Section Types:
1. **hero-breadcrumb** - Page header with title and breadcrumbs
2. **feature-blocks** - Alternating image/text blocks
3. **pricing-tables** - Pricing cards with toggle
4. **values-intro** - Introduction with image
5. **benefits-grid** - Icon grid layout
6. **video-popup** - Video section with popup
7. **job-listings** - Career opportunities grid

## How to Use:
1. Set `layout: "flexible"` in your page front matter
2. Add a `sections:` array listing the sections you want
3. Configure each section's data in the front matter
4. Sections will render in the order specified
