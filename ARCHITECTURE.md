# Architecture Documentation

**System**: Hugo + Atomic Design + ITCSS | **Purpose**: Enable Claude Code to understand and extend project

**Version**: 5.4.0 | **Updated**: 2025-12-02 | **Structure**: Hugo standard (theme directory)

---

## System Overview

Component-based Hugo site with standard theme architecture: Pages = Header + Sections (2-7) + Footer

**Hierarchy**: Atoms (9) → Molecules (24) → Organisms (2) → Sections (18) = **53 components**

**Note**: Hugo follows standard lookup order: project root overrides → theme defaults. Main implementation in `themes/andromeda-hugo/` directory.

**CMS**: Sveltia CMS integrated at `/admin` for headless content management (see CMS Integration section below).

---

## Flexible Layout Engine

**File**: `themes/andromeda-hugo/layouts/_default/flexible.html`

**Process**: Read sections array → Render header → Loop sections → Render footer

```yaml
layout: "flexible"
sections:
  - type: "hero-breadcrumb"
  - type: "benefits-grid"
```

---

## Components

### Atoms (9) - `themes/andromeda-hugo/layouts/partials/atoms/`
button.html, heading.html, icon.html, image.html, tag.html, divider.html, link.html, spinner.html, avatar.html

**Usage**: `{{ partial "atoms/button.html" (dict "text" "Click" "variant" "primary") }}`

### Molecules (24) - `themes/andromeda-hugo/layouts/partials/molecules/`
accordion.html, back-to-top.html, blog-card.html, breadcrumb.html, card.html, cookie-consent.html, credential-badge.html, emergency-banner.html, footer-info.html, footer-nav.html, form-field.html, language-selector.html, logo.html, mobile-menu.html, navigation.html, nav-item.html, pricing-toggle.html, process-step.html, service-preview-card.html, social-links.html, stat-card.html, timeline-step.html, value-card.html, video-embed.html

**Usage**: `{{ partial "molecules/card.html" (dict "variant" "feature" "title" "Title") }}`

### Organisms (2) - `themes/andromeda-hugo/layouts/partials/organisms/`
header.html, footer.html (cached by language for 30-50% build time reduction)

**Usage**: `{{ partialCached "organisms/header.html" . .Language }}`

### Sections (18 active) - `themes/andromeda-hugo/layouts/partials/sections/`
benefits-results.html, blog-grid.html, contact-form-enhanced.html, contact-info-cards.html, credentials-education.html, cta-split.html, cta-standard.html, faq-mini.html, feature-blocks.html, hero-about.html, hero-breadcrumb.html, methodology-zigzag.html, onboarding-steps.html, scientific-approach.html, services-preview.html, testimonials-enhanced.html, test-index.html, values-intro.html

**Data from front matter**:
```yaml
benefits_section:
  title: "Benefits"
  benefits:
    - icon: "las la-check"
      title: "Benefit"
```

---

## Data Flow

```
Page (content/*.md) → flexible.html → Header → Sections → Footer → HTML (public/)
                      ↓ front matter
                      sections array
```

---

## Extension Points

### Add Section
1. Create `themes/andromeda-hugo/layouts/partials/sections/my-section.html`
2. Register in `themes/andromeda-hugo/layouts/_default/flexible.html` if/else chain
3. Use: `sections: - type: "my-section"`

### Add Molecule
1. Create `themes/andromeda-hugo/layouts/partials/molecules/my-component.html`
2. Compose from atoms
3. Use: `{{ partial "molecules/my-component.html" (dict ...) }}`

### Add Atom
1. Create `themes/andromeda-hugo/layouts/partials/atoms/my-atom.html`
2. Keep simple (single responsibility)
3. Use: `{{ partial "atoms/my-atom.html" (dict ...) }}`

---

## Key Patterns

**Partial Caching**: `{{ partialCached "organisms/header.html" . .Language }}`
**Conditional**: `{{ with .Params.section }}{{ if .enable }}...{{ end }}{{ end }}`
**Variants**: `{{ if eq .variant "primary" }}...{{ else if eq .variant "secondary" }}...{{ end }}`
**Image Processing**: `{{- $img := resources.Get .src -}}{{- $webp := $img.Resize "800x webp q85" -}}`
**Props**: `{{ partial "path/component.html" (dict "key1" "val1" "key2" .PageVar) }}`
**Markdownify**: Use `| markdownify` for text fields that may contain markdown (titles, descriptions)

### Text Emphasis Pattern (v5.3.2)

Use markdown for emphasis in front matter instead of separate `title_accent` fields:

```yaml
# ✅ Preferred - native markdown
title: "Finding Your *Inner North*"    # Italic + sage green
title: "Cum Mă **Poți Contacta**"      # Bold + sage green

# ❌ Deprecated - custom fields
title: "Finding Your"
title_accent: "Inner North"
```

Templates use `| markdownify` to render tags, styled via:
- `.c-heading em` / `.c-heading i` → italic + sage green
- `.c-heading strong` / `.c-heading b` → bold + sage green

---

## File Locations (Standard Hugo Theme Structure)

```
alexandrabarbu.ro/                      # ← PROJECT ROOT (run Hugo here!)
├── themes/andromeda-hugo/              # Theme directory (main implementation)
│   ├── layouts/                        # Theme templates
│   │   ├── _default/flexible.html      # MAIN LAYOUT ENGINE
│   │   └── partials/
│   │       ├── atoms/                  # 9 atomic components
│   │       ├── molecules/              # 29 composite components
│   │       ├── organisms/              # 2 structural (header, footer)
│   │       ├── sections/               # 26 page sections
│   │       └── essentials/             # Core essentials (style, head, etc.)
│   ├── assets/                         # Theme assets
│   │   ├── scss/                       # ITCSS (7 layers) + BEM
│   │   └── js/                         # Vanilla JS (no dependencies)
│   ├── archetypes/                     # Content templates
│   └── docs/                           # Component documentation
├── layouts/                            # Project overrides (sparse - 8 files)
│   └── partials/                       # Project-specific partials
├── assets/                             # Project overrides (sparse)
├── content/                            # Site content (romanian/, english/)
├── config/                             # Hugo configuration
├── data/                               # Data files (shared_sections.yaml)
└── i18n/                               # Translation files (ro.yaml, en.yaml)

NOTE: Hugo lookup order: project root → theme directory.
Theme contains 135 SCSS files, 127 layout files. Project overrides are minimal.
```

---

## SCSS Design Tokens (v5.2.0)

The theme uses a comprehensive design token system in `themes/andromeda-hugo/assets/scss/01-settings/`:

### Spacing Tokens (`_tokens-spacing.scss`)
```scss
// 8px base grid
$space-1: 4px;    $space-2: 8px;    $space-3: 12px;   $space-4: 16px;
$space-6: 24px;   $space-8: 32px;   $space-12: 48px;  $space-16: 64px;
$space-24: 96px;  $space-32: 128px;

// Breakpoints (min-width, mobile-first)
$breakpoint-sm: 576px;   $breakpoint-md: 768px;    $breakpoint-lg: 992px;
$breakpoint-xl: 1200px;  $breakpoint-xxl: 1400px;

// Max-width breakpoints (for edge cases)
$breakpoint-sm-max: 575px;  $breakpoint-md-max: 767px;
$breakpoint-lg-max: 991px;  $breakpoint-xl-max: 1199px;
```

### Motion Tokens (`_tokens-motion.scss`)
```scss
// Durations (3-tier system)
$duration-instant: 100ms;  $duration-fast: 200ms;    $duration-base: 300ms;
$duration-normal: 400ms;   $duration-slow: 600ms;    $duration-slower: 800ms;

// Hover lift tokens (standardized translateY)
$hover-lift-sm: -2px;   // Level 1 - Subtle (links, small elements)
$hover-lift-md: -4px;   // Level 2 - Medium (cards, buttons)
$hover-lift-lg: -8px;   // Level 3 - Strong (featured cards, CTAs)

// Z-index scale
$z-dropdown: 1000;  $z-sticky: 1020;  $z-fixed: 1030;
$z-modal: 1050;     $z-tooltip: 1070; $z-skip-link: 10000;
```

### Shadow Tokens (`_tokens-shadows.scss`)
```scss
// Elevation shadows (7 levels)
$shadow-xs → $shadow-sm → $shadow-base → $shadow-md → $shadow-lg → $shadow-xl → $shadow-2xl

// Focus ring tokens (accessibility)
$shadow-focus-sm: 0 0 0 3px rgba($forest-500, 0.2);
$shadow-focus-md: 0 0 0 4px rgba($forest-500, 0.3);
$shadow-focus-secondary-sm/md, $shadow-focus-neutral-sm/md

// Pulse animation tokens
$shadow-pulse-start: 0 0 0 0 rgba($forest-500, 0);
$shadow-pulse-end: 0 0 0 4px rgba($forest-500, 0.3);

// Avatar/logo ring tokens
$shadow-ring-forest, $shadow-ring-sage, $shadow-ring-neutral
```

### Typography Tokens (`_tokens-typography.scss`)
```scss
// Font weights (semantic)
$font-weight-normal: 400;    $font-weight-medium: 500;
$font-weight-semibold: 600;  $font-weight-bold: 700;
$font-weight-extrabold: 800;

// Font sizes (modular scale)
$text-xs: 0.75rem;   $text-sm: 0.875rem;  $text-base: 1rem;
$text-lg: 1.125rem;  $text-xl: 1.25rem;   $text-2xl: 1.5rem;
$text-3xl: 1.875rem; $text-4xl: 2.25rem;  $text-5xl: 3rem;
```

### Token Usage Rules
1. **Never hard-code** breakpoints, font-sizes, font-weights, or shadows
2. **Hover transitions**: Use specific properties, avoid `transition: all`
3. **Shadow progression**: Only increase by 1 level on hover (sm→md, not sm→lg)
4. **Focus states**: Use $shadow-focus-* tokens for accessibility

---

## Performance

- Partial caching: Header/footer by language (30-50% reduction)
- Image processing: WebP + srcset + lazy loading (25-35% reduction)
- CSS minification: <50KB gzipped
- Template reuse: Single source of truth

---

## Testing

```bash
# Run from project root!
scripts/test-components.sh             # Verify: 9+24+2+36=71 components
scripts/test-performance.sh            # Measure: <3s build, <500KB pages
hugo --templateMetrics                 # Performance analysis
```

---

## Multilingual

```
content/ro/  # Romanian
content/en/  # English
content/fr/  # French

{{ .Language.Lang }}                    # Current language
{{ partialCached "org.html" . .Language }}  # Cache per language
```

---

## SEO & LLM Optimization

The theme includes comprehensive SEO for traditional search engines and AI systems (ChatGPT, Perplexity, Claude).

### LLM SEO Features

| Feature | Purpose | Output |
|---------|---------|--------|
| `/llms.txt` | AI crawler guidance | Plain-text site summary |
| Schema.org JSON-LD | Semantic understanding | 7 schema types |
| E-E-A-T signals | Author credibility | Credentials, education |

### Schema Types (Auto-generated)

| Schema | Triggers | Location |
|--------|----------|----------|
| `WebSite` | Homepage | `seo/schemas/website.html` |
| `Organization` | Homepage | `seo/schemas/organization.html` |
| `Person` | Homepage (configurable) | `seo/schemas/person.html` |
| `Article` | `/blog/`, `/articole/`, `/resurse/` | `seo/schemas/article.html` |
| `Service` | `/servicii/`, `/services/` | `seo/schemas/service.html` |
| `FAQPage` | Pages with `faq_items` | `seo/schemas/faq.html` |
| `BreadcrumbList` | All pages | `seo/schemas/breadcrumb.html` |

### Configuration

```toml
# config/_default/seo.toml
[params.seo]
  enable = true

[params.seo.llms_txt]
  enable = true
  max_articles = 10

[params.seo.organization]
  enable = true
  type = "ProfessionalService"

[params.seo.person]
  enable = true
  default_author = "default"  # References data/authors/default.yaml
```

### File Structure

```
layouts/partials/seo/
├── structured-data.html      # Main orchestrator
├── hreflang.html             # Language alternates
└── schemas/                  # 7 schema templates
    ├── website.html
    ├── organization.html
    ├── person.html
    ├── article.html
    ├── service.html
    ├── faq.html
    └── breadcrumb.html

layouts/_default/llms.txt     # AI crawler file template
config/_default/seo.toml      # All SEO configuration
config/_default/outputs.toml  # Enables LlmsTxt output
data/authors/                 # Author profiles for E-E-A-T
```

### Testing

```bash
# Check llms.txt
curl http://localhost:1313/llms.txt

# Check JSON-LD schemas
curl -s http://localhost:1313/ | grep -A 20 'application/ld+json'
```

**Full Documentation**: `themes/andromeda-hugo/docs/SEO-STRUCTURED-DATA.md`

---

## CMS Integration

**Sveltia CMS** provides headless content management for this Hugo site with visual editing capabilities.

### Access & Authentication (Two-Layer)

**Layer 1: Cloudflare Access (Zero Trust)**
- Protects `/admin/*` path before reaching CMS
- Authentication: Whitelisted Gmail addresses via email PIN code
- Configuration: Cloudflare Zero Trust dashboard
- Session: Cloudflare Access cookie (persists across browser sessions)

**Layer 2: Sveltia CMS → GitHub API**
- After passing Cloudflare Access, CMS needs GitHub token to read/write repository
- Authentication: Custom Cloudflare Worker returns hardcoded PAT
- Token storage: Browser localStorage (per-browser, not synced across devices)

**Production URLs**:
- CMS: `https://alexandrabarbu.ro/admin`
- Auth Worker: `https://sveltia-cms-auth-alexandrabarbu.cpantus.workers.dev`
- Repository: `cpantus/alexandrabarbu.ro` (branch: `main`)

### Authentication Flow

```
User → Cloudflare Access (email PIN) → /admin → Sveltia CMS
                                                     ↓
                                          Click "Sign In with GitHub"
                                                     ↓
                                          Popup → Worker /auth endpoint
                                                     ↓
                                          Worker returns PAT via postMessage
                                                     ↓
                                          CMS stores in localStorage
                                                     ↓
                                          Authenticated (cached for future visits)
```

### Cloudflare Worker Configuration

**Worker**: `sveltia-cms-auth-alexandrabarbu`

**Environment Variables** (Cloudflare Dashboard → Workers → Settings → Variables):
| Variable | Type | Purpose |
|----------|------|---------|
| `GITHUB_TOKEN` | Secret | PAT for GitHub API access (scoped to repo) |
| `CF_ACCESS_AUD` | Plaintext | Cloudflare Access application audience tag |
| `ALLOWED_DOMAINS` | Plaintext | `alexandrabarbu.ro` (legacy, optional) |

**Security Model**:
```
Request → Worker checks for CF_Authorization cookie/header
                ↓
        Validates JWT signature against Cloudflare public keys
                ↓
        Checks JWT expiration and audience (CF_ACCESS_AUD)
                ↓
        If valid → returns PAT | If invalid → 403 Forbidden
```

**Worker Code** (with JWT validation):
```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/auth' || url.pathname === '/callback') {
      // Extract CF Access JWT from cookie or header
      const jwt = request.headers.get('Cf-Access-Jwt-Assertion') ||
                  getCookieValue(request.headers.get('Cookie'), 'CF_Authorization');

      if (!jwt) {
        return new Response('Forbidden: CF Access required', { status: 403 });
      }

      // Validate JWT (signature, expiration, audience)
      const isValid = await validateCFAccessJWT(jwt, env.CF_ACCESS_AUD);
      if (!isValid) {
        return new Response('Forbidden: Invalid token', { status: 403 });
      }

      // Only authenticated users reach here
      const token = env.GITHUB_TOKEN;
      // Returns HTML that sends token via window.opener.postMessage()
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }
    return new Response('Sveltia CMS Auth', { status: 200 });
  },
};
```

**Testing Worker Security**:
```bash
# Should return 403 Forbidden (no CF Access cookie)
curl -i https://sveltia-cms-auth-alexandrabarbu.cpantus.workers.dev/auth
```

### Troubleshooting: "Login Screen Appears"

If users see the Sveltia CMS login screen instead of auto-authenticating:

1. **Cause**: Browser localStorage was cleared (browser update, cache clear, incognito mode)
2. **Fix**: Click "Sign In with GitHub" button once
3. **Result**: Token cached in localStorage, auto-auth restored for future visits

**Note**: Each browser/device needs to authenticate once. Tokens are stored per-browser, not synced across devices.

### Collections Structure

Collections mirror content directory structure for both languages:

**Romanian**:
- Servicii (`content/romanian/servicii`)
- Resurse (`content/romanian/resurse`)
- Articole (`content/romanian/resurse/articole`)
- Pagini Principale (`content/romanian`)

**English**:
- Services (`content/english/services`)
- Resources (`content/english/resources`)
- Pages (`content/english`)

**Site Configuration**:
- Navigation (RO + EN menus)
- Settings (social media links)
- Section Reference (CMS sections catalog)

### Flexible Page Building

All pages use the **flexible layout** with section-based composition. CMS provides:

1. **Section Selector**: Choose from 18 core section types
2. **Section Configuration**: Collapsible form fields for each section
3. **Preview**: Live preview in Hugo dev server
4. **Git Integration**: Auto-commits changes to GitHub

Supported section types documented in `data/cms_sections.yaml` (pruned to core sections: heroes, core, interactive, forms, trust, about, methodology).

### Files

**Configuration**:
- `static/admin/config.yml` - Main CMS configuration
- `static/admin/config.production.yml` - Production CMS configuration
- `static/admin/index.html` - CMS interface entry point
- `data/cms_sections.yaml` - Section type catalog with descriptions

**Media**:
- Folder: `static/images`
- Public: `/images`
- Formats: WebP, PNG, JPG, SVG

---

## Troubleshooting

**Section not rendering**: Check spelling, verify file exists, check registration in flexible.html
**Images not loading**: Verify path in static/, check Hugo processing
**Slow builds**: Run `hugo --templateMetrics`, verify caching, check image processing

---

## Quick Reference for Claude Code

**Understand**: README.md → ARCHITECTURE.md → themes/andromeda-hugo/docs/components/
**Add features**: New page (archetypes) | New section (sections/) | New molecule (molecules/)
**Verify**: `ls themes/andromeda-hugo/layouts/partials/atoms/ | wc -l` (9), molecules (24), organisms (2), sections (18)
**CMS**: Access at `/admin` for visual page building

---

## Success Metrics ✅

Build <3s | Pages <500KB | CSS <50KB gzipped | Reusability >80% | Duplication <10% | New page <30s | 53 components total | Critical CSS inlining | No Bootstrap/jQuery (vanilla JS) | Sveltia CMS integrated

---

## Recent Changes (Week of 2025-12-02)

### Major Refactoring
- **Section Cleanup** (v5.4.0): Removed 20 unused section templates to reduce maintenance burden
  - Deleted: about-preview, approach-preview, confidentiality-notice, contact-options, credentials-showcase, method-tabs, methods-used, my-story, newsletter-signup, pricing-packages, pricing-tables, privacy-guarantee, problem-empathy, service-faq-inline, simple-process, stats-numbers, therapeutic-process, training-certifications, values-compass, video-popup
  - Retained: 18 core sections focused on active site needs
  - Impact: Cleaner component selection in CMS, reduced codebase complexity

### Performance Enhancements
- **Critical CSS Inlining** (82a6136): Eliminate render-blocking CSS by inlining critical above-fold styles
  - Added: `themes/andromeda-hugo/assets/scss/critical.scss`
  - Updated: Style loading in `essentials/style.html`
  - Impact: Faster first paint, improved Core Web Vitals

### UX Improvements
- **CMS Toast Notifications** (79486a8): Added visual feedback for save operations in Sveltia CMS
- **Page Updates**: Enhanced approach, resources, contact, and service pages with improved imagery

### Component Naming Changes
- `credentials-showcase.html` → Removed (replaced by credentials-education.html)
- `problem-empathy.html` → Removed (content consolidated)
- New: `credentials-education.html`, `methodology-zigzag.html`, `scientific-approach.html`

---

## Critical Files

- `themes/andromeda-hugo/layouts/_default/flexible.html` - Layout engine (lines 22-82: section loop)
- `themes/andromeda-hugo/assets/scss/critical.scss` - Critical CSS for above-fold rendering (NEW)
- `layouts/partials/organisms/header.html` - Header composition
- `layouts/partials/organisms/footer.html` - Footer composition
- `archetypes/*.md` - Page templates

**Docs**: `docs/components/` for detailed component API (at root level)
