# SEO & Structured Data Documentation

**Version**: 1.0.0 | **Updated**: 2025-11-26

This theme includes comprehensive SEO features for both traditional search engines and AI systems (ChatGPT, Perplexity, Claude).

---

## Quick Start

SEO features are **enabled by default**. Configuration lives in `config/_default/seo.toml`.

```toml
# Minimal setup - just enable
[params.seo]
  enable = true
```

---

## LLM SEO (AI Search Optimization)

### What is LLM SEO?

AI assistants like ChatGPT, Perplexity, and Claude crawl websites differently than Google. They benefit from:
- Structured plain-text summaries (`/llms.txt`)
- Schema.org JSON-LD for semantic understanding
- Clear author credentials (E-E-A-T signals)

### /llms.txt File

**Standard**: [llmstxt.org](https://llmstxt.org/)

Generates a plain-text file at `/llms.txt` optimized for AI crawlers:

```
# Site Title

> Site description for AI assistants

## About the Author
Name - Job Title
Professional description...

## Site Structure
- [Services](/services/): Service offerings
- [Blog](/blog/): Latest articles

## Key Pages
- [Homepage](https://example.com/): Main landing page
- [Service A](https://example.com/services/a/): Description...

## Recent Articles
- [Article Title](https://example.com/blog/article/) (2025-01-15): Brief description

## Contact Information
- Email: contact@example.com
- Phone: +1234567890

## Language
- Romanian (ro)
- English (en)
```

**Configuration** (`config/_default/seo.toml`):

```toml
[params.seo.llms_txt]
  enable = true

  # Content sections to include
  include_services = true
  include_about = true
  include_blog = true
  include_contact = true

  # Limit articles shown
  max_articles = 10

  # URL patterns to exclude
  exclude_patterns = ["**/draft-*", "**/private/*"]

  # Custom AI guidance
  guidelines = "This website provides professional therapy services. Content is educational only."

  # Citation format preference
  citation_format = "APA"
```

**Output format** (`config/_default/outputs.toml`):

```toml
[outputFormats.LlmsTxt]
  mediaType = "text/plain"
  baseName = "llms"
  isPlainText = true
  notAlternative = true

home = ["HTML", "RSS", "WebAppManifest", "LlmsTxt"]
```

**Template**: `layouts/_default/llms.txt`

---

## Schema.org Structured Data

### Overview

7 schema types auto-generated as JSON-LD based on page context:

| Schema | Purpose | Auto-triggers |
|--------|---------|---------------|
| `WebSite` | Site-level info + search action | Homepage |
| `Organization` | Business/professional info | Homepage |
| `Person` | Author E-E-A-T credentials | Homepage (configurable) |
| `Article` | Blog/article content | URL patterns |
| `Service` | Service offerings | URL patterns |
| `FAQPage` | FAQ rich results | Front matter detection |
| `BreadcrumbList` | Navigation hierarchy | All pages |

### File Structure

```
layouts/partials/seo/
├── structured-data.html      # Main orchestrator
├── hreflang.html             # Language alternates
├── hreflang-tags.html        # Hreflang meta tags
└── schemas/
    ├── website.html          # WebSite schema
    ├── organization.html     # Organization/LocalBusiness
    ├── person.html           # Person/Author
    ├── article.html          # Article/BlogPosting
    ├── service.html          # Service/ProfessionalService
    ├── faq.html              # FAQPage
    └── breadcrumb.html       # BreadcrumbList
```

### Schema Configuration

#### Organization Schema

```toml
[params.seo.organization]
  enable = true

  # Schema.org type hierarchy
  # Options: Organization, LocalBusiness, ProfessionalService,
  #          MedicalBusiness, LegalService, EducationalOrganization
  type = "ProfessionalService"

  # Basic info (falls back to site.Title, site.Params.description)
  name = ""
  legal_name = ""
  description = ""
  founding_date = ""

  # URLs
  url = ""
  logo = ""
  image = ""

  # Contact
  email = ""
  telephone = ""

  # Price indicator ($, $$, $$$)
  price_range = "$$"

  # Physical address
  [params.seo.organization.address]
    street = "123 Main St"
    city = "Bucharest"
    region = "Bucharest"
    postal_code = "010101"
    country = "RO"

  # Opening hours (ISO 8601)
  opening_hours = ["Mo-Fr 09:00-18:00", "Sa 10:00-14:00"]

  # Social profiles
  same_as = [
    "https://facebook.com/business",
    "https://linkedin.com/company/business"
  ]
```

#### Person/Author Schema

```toml
[params.seo.person]
  enable = true

  # References data/authors/{name}.yaml
  default_author = "default"

  # Display options
  show_on_homepage = true
  include_credentials = true
  include_education = true
```

**Author data file** (`data/authors/default.yaml`):

```yaml
name: "Dr. Jane Smith"
job_title: "Licensed Clinical Psychologist"
description: "Specializing in cognitive behavioral therapy..."
image: "/images/author.jpg"
email: "jane@example.com"

credentials:
  - name: "PhD in Clinical Psychology"
    institution: "University of Example"
    year: 2015
  - name: "Licensed Psychologist"
    issuer: "State Board"
    license_number: "PSY-12345"

education:
  - degree: "PhD"
    field: "Clinical Psychology"
    institution: "University of Example"
    year: 2015

same_as:
  - "https://linkedin.com/in/janesmith"
  - "https://twitter.com/drjanesmith"
```

#### Article Schema

```toml
[params.seo.article]
  enable = true

  # Type: Article, BlogPosting, NewsArticle, TechArticle
  type = "Article"

  # Include metadata
  include_word_count = true
  include_read_time = true
  include_date_modified = true
  include_author = true
  include_publisher = true

  # URL patterns that trigger Article schema
  path_patterns = ["/blog/", "/articole/", "/articles/", "/posts/", "/resurse/"]
```

#### Service Schema

```toml
[params.seo.service]
  enable = true

  # Type: Service, ProfessionalService
  type = "Service"

  # Pricing
  include_pricing = true
  price_currency = "RON"

  # URL patterns
  path_patterns = ["/servicii/", "/services/"]
```

#### FAQ Schema

```toml
[params.seo.faq]
  enable = true
  auto_detect = true
  max_items = 10
```

**Front matter detection** - FAQ schema auto-generates when pages have:

```yaml
# Option 1: faq_items
faq_items:
  - question: "How long is a session?"
    answer: "Sessions typically last 50 minutes."

# Option 2: faq_mini section
faq_mini:
  faqs:
    - question: "What should I expect?"
      answer: "Your first session involves..."
```

#### WebPage Schema

```toml
[params.seo.webpage]
  enable = true

  # Map URL patterns to WebPage subtypes
  [params.seo.webpage.types]
    "/despre" = "AboutPage"
    "/about" = "AboutPage"
    "/contact" = "ContactPage"
    "/servicii" = "ItemPage"
    "/services" = "ItemPage"
    "/blog" = "CollectionPage"
    "/articole" = "CollectionPage"
    "/faq" = "FAQPage"
```

#### Breadcrumb Schema

```toml
[params.seo.breadcrumb]
  enable = true
  include_home = true
```

---

## Traditional SEO

### Meta Tags

Auto-generated in `layouts/partials/basic-seo.html`:

- `<meta name="description">` - From page/site description
- `<meta name="author">` - From author config
- `<meta name="keywords">` - From page tags/keywords
- `<link rel="canonical">` - Canonical URL
- `<meta name="article:published_time">` - Publication date
- `<meta name="article:modified_time">` - Last modified

### Open Graph

```toml
[params.seo.opengraph]
  enabled = true
```

Generates:
- `og:title`, `og:description`, `og:url`
- `og:site_name`, `og:locale`
- `og:type` (website/article based on content)
- `og:image`, `og:image:alt`
- Article-specific: `article:published_time`, `article:author`, `article:tag`

### Twitter Cards

```toml
[params.seo.twitter]
  enabled = true
  card_type = "summary_large_image"
  site = "@yourbusiness"
  creator = "@author"
```

---

## Validation & Debugging

### Build-time Warnings

```toml
[params.seo.validation]
  enable = true
  warn_missing_description = true
  warn_missing_author = true
  warn_missing_image = true
  min_description_length = 120
```

### Testing Tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **JSON-LD Playground**: https://json-ld.org/playground/

### View Generated Output

```bash
# Start dev server
hugo server

# Check llms.txt
curl http://localhost:1313/llms.txt

# Check JSON-LD schemas
curl -s http://localhost:1313/ | grep -A 20 'application/ld+json'
```

---

## E-E-A-T Signals

This theme emphasizes E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness):

| Signal | Implementation |
|--------|----------------|
| **Experience** | Author credentials, years of practice |
| **Expertise** | Education, certifications, licenses |
| **Authoritativeness** | Professional affiliations, social profiles |
| **Trustworthiness** | Contact info, physical address, reviews |

### Best Practices

1. **Complete author profiles** in `data/authors/`
2. **Add credentials** with issuing bodies and dates
3. **Include physical address** for local businesses
4. **Link social profiles** for verification
5. **Date your content** with published/modified times

---

## Multilingual Support

All schemas respect Hugo's multilingual setup:

- Separate `llms.txt` per language
- `hreflang` tags for language alternates
- Localized content in schemas

```
/llms.txt           # Romanian (default)
/en/llms.txt        # English
```

---

## Extending Schemas

### Add Custom Schema

1. Create partial: `layouts/partials/seo/schemas/custom.html`
2. Include in `structured-data.html`:

```html
{{- if .IsPage -}}
  {{- if in .RelPermalink "/custom-section/" -}}
    {{ partial "seo/schemas/custom.html" . }}
  {{- end -}}
{{- end -}}
```

### Override Existing Schema

Create project-level override:
```
layouts/partials/seo/schemas/article.html  # Overrides theme version
```

---

## Summary

| Feature | Status | Config |
|---------|--------|--------|
| llms.txt | Enabled | `[params.seo.llms_txt]` |
| WebSite schema | Enabled | `[params.seo]` |
| Organization schema | Enabled | `[params.seo.organization]` |
| Person schema | Enabled | `[params.seo.person]` |
| Article schema | Enabled | `[params.seo.article]` |
| Service schema | Enabled | `[params.seo.service]` |
| FAQ schema | Enabled | `[params.seo.faq]` |
| Breadcrumb schema | Enabled | `[params.seo.breadcrumb]` |
| Open Graph | Enabled | `[params.seo.opengraph]` |
| Twitter Cards | Enabled | `[params.seo.twitter]` |

All features enabled by default with sensible fallbacks. Customize in `config/_default/seo.toml`.
