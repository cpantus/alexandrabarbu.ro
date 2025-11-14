# Site Builder Wizard - Development Documentation

**Version**: 1.0.0 | **Created**: 2025-11-14 | **Status**: In Development
**Session ID**: claude/implement-wizard-017FSnmmZoKrQ9Zi3J26YGhk
**Duration Estimate**: 20-30 hours | **Priority**: High

---

## Vision

A comprehensive, interactive CLI wizard that generates beautiful Hugo sites in 10 minutes with 90% completion rate. Think "rails new" but for Hugo sites with industry-specific templates, AI content generation, and smart image curation.

---

## User Experience Flow

```
$ create-site wizard

╔══════════════════════════════════════════════════════╗
║  🎨 Beautiful Site Builder - Wizard Mode             ║
╚══════════════════════════════════════════════════════╝

PHASE 1: Quick Start (30 seconds)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Site name: Dr. Alexandra Barbu
2. Industry: [Psychology Practice / Law Firm / Consulting / Restaurant / E-commerce / Custom]
3. Primary goal: [Conversion / Information / Both] → Both
4. Languages: [RO, EN, FR] → RO, EN
   → Default language: [RO/EN] → RO (impacts content generation)
5. Got existing content? [Yes/No/Partial] → Partial

✓ Loading psychology-practice blueprint...

... (continues through 7 phases) ...

✨ SITE GENERATED! (90% complete)
```

---

## Key Features

### 1. Multi-language Support (Enhanced)
- Select multiple languages (RO, EN, FR, etc.)
- **NEW**: Choose default language (impacts all content generation)
- Auto-generate multilingual structure
- Language-specific content fallbacks

### 2. Industry-Ready Blueprints
- Psychology Practice (existing reference)
- Law Firm
- Consulting/Coaching
- Restaurant/Cafe
- E-commerce
- SaaS/Tech
- Portfolio/Creative
- Non-profit
- Custom (user-guided)

Each blueprint includes:
- Suggested menu structure
- Page templates
- Section recommendations
- Color schemes
- Typography pairings
- Stock photo collections

### 3. Intelligent Image Selection
- Integration with Unsplash API
- Industry-specific photo collections
- Interactive image picker
- Automatic optimization (WebP, srcset, lazy-load)
- Placeholder generation with correct aspect ratios

### 4. Branding Configuration
- **Logo upload**: Accept SVG/PNG, generate variants
- **Color scheme**: Interactive color picker with presets
  - Primary color (hex code)
  - Secondary color (hex code)
  - Accent color (hex code)
  - Auto-generate complementary palette
- **Typography**:
  - Heading font (Google Fonts integration)
  - Body font (Google Fonts integration)
  - Preview combinations
- **Output**: `config/_default/params.yaml` with full branding config

### 5. Agent Orchestration
- **Content Agent**: Creates markdown files with sections
- **AI Agent**: Generates copy for selected sections
- **Theme Agent**: Applies branding (colors, fonts, animations)
- **Integration Agent**: Sets up Calendly, analytics, forms
- **i18n Agent**: Creates multilingual structure
- **SEO Agent**: Meta tags, schema, sitemap
- **Asset Agent**: Images, optimization, placeholders
- **Image Agent** (NEW): Curates and downloads Unsplash images

### 6. Refinement System
Post-generation commands for iteration:
- `refine-site` - Interactive refinement menu
- `add-images` - Guided image upload/selection
- `edit-content` - Section-by-section editor
- `review-ai-content` - Review and edit AI-generated text

---

## Technical Architecture

### Directory Structure

```
.claude/
├── commands/
│   └── infra/
│       ├── create-site.md              # Main wizard command
│       ├── refine-site.md              # Refinement command
│       ├── add-images.md               # Image management
│       └── review-ai-content.md        # Content review
├── agents/
│   └── site-builder/
│       ├── content-agent.md            # Content structure generation
│       ├── ai-content-agent.md         # AI text generation
│       ├── theme-agent.md              # Branding application
│       ├── integration-agent.md        # External service setup
│       ├── i18n-agent.md               # Multilingual structure
│       ├── seo-agent.md                # SEO optimization
│       ├── asset-agent.md              # Asset optimization
│       ├── image-agent.md              # Unsplash integration
│       └── orchestrator-agent.md       # Main orchestrator
├── patterns/
│   └── site_generation/
│       ├── wizard_flow.md              # Interactive wizard pattern
│       ├── blueprint_loading.md        # Industry blueprint pattern
│       └── refinement_flow.md          # Post-gen refinement pattern
└── data/
    └── blueprints/
        ├── psychology-practice.yaml    # Industry blueprint
        ├── law-firm.yaml
        ├── consulting.yaml
        ├── restaurant.yaml
        ├── ecommerce.yaml
        ├── saas.yaml
        ├── portfolio.yaml
        ├── nonprofit.yaml
        └── _blueprint-schema.yaml      # Blueprint structure definition

content/
└── _wizard/                            # Wizard-generated content (temp)
    └── generated-TIMESTAMP/

config/
└── _default/
    └── branding.yaml                   # Generated branding config
```

### Data Structures

#### Blueprint Schema (`_blueprint-schema.yaml`)

```yaml
name: "Psychology Practice"
slug: "psychology-practice"
description: "Therapeutic practice, counseling, mental health services"

# Menu structure
menu:
  suggested:
    - name: "Home"
      weight: 1
      sections: [hero-cta, values-intro, services-overview, testimonials, faq-mini, contact-form]
    - name: "About"
      weight: 2
      sections: [hero-breadcrumb, bio, credentials, approach, office-tour]
    - name: "Services"
      weight: 3
      submenu: true
      count: 4
      templates:
        - name: "Individual Therapy"
          sections: [hero-breadcrumb, service-intro, modalities, benefits-grid, process, faq, cta]
        - name: "Couples Therapy"
          sections: [hero-breadcrumb, service-intro, benefits-grid, process, testimonials, cta]
    - name: "Pricing"
      weight: 4
      sections: [hero-breadcrumb, pricing-tables, faq-mini, cta]
    - name: "Contact"
      weight: 5
      sections: [hero-breadcrumb, contact-form-enhanced, office-info, social-links]

# Design presets
design:
  color_schemes:
    - name: "Warm & Therapeutic"
      primary: "#4DB380"    # Emerald
      secondary: "#CC6B49"  # Terracotta
      accent: "#F4A460"     # Sandy brown
      default: true
    - name: "Calm & Professional"
      primary: "#2C3E50"    # Navy
      secondary: "#95A5A6"  # Sage
      accent: "#3498DB"     # Sky blue

  typography:
    - name: "Classic"
      heading: "Poppins"
      body: "Open Sans"
      default: true
    - name: "Editorial"
      heading: "Playfair Display"
      body: "Lato"

  animation:
    default_intensity: "subtle"  # subtle | moderate | bold
    prefers_reduced_motion: true

# Content generation
content:
  ai_suitable:
    - service-descriptions
    - faq-answers
    - process-explanations
    - benefits-lists

  user_required:
    - personal-bio
    - credentials
    - pricing-details
    - contact-info

  placeholders:
    - testimonials
    - team-bios

# Images
images:
  unsplash_collections:
    - id: "therapy-warm"
      query: "therapy office warm lighting"
      count: 5
    - id: "nature-healing"
      query: "nature peaceful meditation"
      count: 5
    - id: "people-authentic"
      query: "people authentic connection"
      count: 5

  stock_style: "authentic"  # professional | authentic | minimal

# Integrations
integrations:
  recommended:
    - calendly
    - google-analytics
    - contact-forms

  optional:
    - newsletter
    - live-chat

# SEO
seo:
  schema_types:
    - LocalBusiness
    - ProfessionalService
    - Person

  meta_templates:
    home_title: "{siteName} - {tagline}"
    service_title: "{serviceName} | {siteName}"
```

#### Wizard State (`wizard-state.json`)

Stored in memory during wizard session:

```json
{
  "phase": "3",
  "timestamp": "2025-11-14T10:30:00Z",
  "config": {
    "site_name": "Dr. Alexandra Barbu",
    "industry": "psychology-practice",
    "primary_goal": "both",
    "languages": ["ro", "en"],
    "default_language": "ro",
    "existing_content": "partial"
  },
  "menu": {
    "pages": [
      {
        "name": "Home",
        "slug": "home",
        "weight": 1,
        "sections": ["hero-cta", "values-intro", "services-overview", "testimonials", "video-intro", "faq-mini", "contact-form"]
      }
    ]
  },
  "design": {
    "color_scheme": {
      "name": "Warm & Therapeutic",
      "primary": "#4DB380",
      "secondary": "#CC6B49",
      "accent": "#F4A460"
    },
    "typography": {
      "heading": "Poppins",
      "body": "Open Sans"
    },
    "logo": {
      "path": "/static/images/logo.svg",
      "uploaded": true
    }
  },
  "images": {
    "selected": [
      {
        "id": "unsplash-abc123",
        "url": "https://images.unsplash.com/...",
        "purpose": "hero-home",
        "credit": "Photo by John Doe on Unsplash"
      }
    ]
  },
  "integrations": {
    "calendly": {
      "enabled": true,
      "url": "https://calendly.com/dralexandra"
    },
    "analytics": {
      "provider": "plausible",
      "domain": "alexandrabarbu.ro"
    }
  }
}
```

---

## Implementation Phases

### Phase 1: Foundation (4-6 hours)
- Create command structure (`create-site.md`)
- Design blueprint schema
- Create 2-3 industry blueprints (psychology, law, consulting)
- Build wizard state management
- Implement Phase 1 of wizard (Quick Start)

### Phase 2: Menu & Page Builder (4-6 hours)
- Implement Phase 2 (Menu Structure)
- Implement Phase 3 (Page Customization)
- Create section library reference
- Build interactive prompts

### Phase 3: Design System (3-4 hours)
- Implement Phase 4 (Design & Feel)
- Logo upload handling
- Color picker integration
- Typography selector (Google Fonts API)
- Generate `branding.yaml` config

### Phase 4: Images & Content (4-6 hours)
- Implement Phase 5 (Content Generation)
- Unsplash API integration
- Image picker UI (CLI-based)
- AI content agent
- Placeholder generation

### Phase 5: Integrations & Generation (3-4 hours)
- Implement Phase 6 (Integrations)
- Implement Phase 7 (Site Generation)
- Agent orchestration
- Content file generation
- Config file generation

### Phase 6: Refinement System (3-4 hours)
- `refine-site` command
- `add-images` command
- `review-ai-content` command
- `edit-content` command
- Post-generation helpers

### Phase 7: Testing & Polish (2-3 hours)
- Test with all blueprints
- Error handling
- Progress indicators
- Documentation
- Example outputs

---

## Dependencies

### External APIs
- **Unsplash API**: Image curation
  - API key required (free tier: 50 requests/hour)
  - Rate limiting handling

- **Google Fonts API**: Typography preview
  - No key required
  - Font list caching

### Hugo Requirements
- Hugo Extended v0.148.1+
- Existing Andromeda theme (with atomic design refactor)
- Flexible layout system

### Claude Code Infrastructure
- Agent system (multi-agent orchestration)
- Pattern system (wizard flow)
- Command system (CLI interface)

---

## Success Metrics

- **Time to 90% complete site**: <10 minutes
- **User satisfaction**: "Felt magical" threshold
- **Content quality**: AI-generated content requires <20% editing
- **Image quality**: >80% of suggested images accepted
- **Refinement rate**: <30 minutes to polish final 10%

---

## Open Questions & Decisions

1. **Wizard length**: Target 5-10 minutes - is this achievable?
2. **AI content**: Use Claude API for generation or templates?
3. **Image download**: Auto-download Unsplash images or just suggest?
4. **Logo processing**: Support auto-generation of favicon/social variants?
5. **Preview**: Live preview during wizard or only after generation?
6. **Undo**: Support "back" button in wizard or linear only?
7. **Save state**: Allow saving wizard state and resuming later?

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Unsplash API rate limits | Medium | Cache responses, batch requests, fallback to placeholders |
| AI content quality low | Medium | Provide templates, allow placeholders, manual editing |
| Complex wizard intimidating | High | Provide "Quick" defaults at each step, skip options |
| Logo upload handling | Low | Accept common formats, validate, resize automatically |
| Color scheme conflicts | Low | Provide tested presets, accessibility checking |
| Blueprint coverage insufficient | Medium | Start with 3-4 core industries, add more iteratively |

---

## Next Steps

1. Create blueprint schema and 3 initial blueprints
2. Implement wizard Phase 1 (Quick Start)
3. Build state management system
4. Create orchestrator agent skeleton
5. Test end-to-end flow with single blueprint

---

## References

- User requirements: Original wizard design
- Theme structure: `themes/andromeda-hugo/`
- Atomic design: `REFACTOR-PLAN-v2.md`
- Section library: `themes/andromeda-hugo/layouts/partials/sections/`
