# Sveltia CMS - Complete Technical Documentation

**Version:** 0.113.0 (Beta)
**Expected GA:** Late 2025
**Last Updated:** 2025-11-28

---

## Table of Contents

1. [Overview & Architecture](#overview--architecture)
2. [Getting Started](#getting-started)
3. [Configuration Schema](#configuration-schema)
4. [Backend Configuration](#backend-configuration)
5. [Collections](#collections)
6. [Widget Reference](#widget-reference)
7. [Media Management](#media-management)
8. [Internationalization (i18n)](#internationalization-i18n)
9. [Hugo Integration](#hugo-integration)
10. [Advanced Features](#advanced-features)
11. [Security & Performance](#security--performance)
12. [Troubleshooting](#troubleshooting)
13. [Migration Guide](#migration-guide)

---

## Overview & Architecture

### What is Sveltia CMS?

Sveltia CMS is a **Git-based, lightweight headless CMS** built from scratch as a modern successor to Netlify/Decap CMS. It provides a fast, secure, and feature-rich content management interface for static site generators like Hugo, Jekyll, Next.js, SvelteKit, Eleventy, and more.

**Key Differentiators:**
- **Built with Svelte:** Compiler-based approach (not React), zero virtual DOM overhead
- **Exceptional Performance:** <500 KB bundle (minified & brotlied) vs. 1.5 MB for Decap CMS
- **First-Class i18n:** Built-in multilingual support from day one
- **Modern UX:** Immersive dark mode, mobile support, keyboard shortcuts
- **Framework-Agnostic:** Works with any static site generator
- **Drop-in Replacement:** Compatible with existing Netlify/Decap CMS configurations

### Technology Stack

```
┌─────────────────────────────────────┐
│      Svelte (Compiler-based)        │
├─────────────────────────────────────┤
│      Vite (Build & Bundling)        │
├─────────────────────────────────────┤
│    Lexical (Rich Text Editor)       │
├─────────────────────────────────────┤
│  GraphQL API (GitHub/GitLab)        │
├─────────────────────────────────────┤
│   File System Access API (Local)    │
└─────────────────────────────────────┘
```

### Core Features

#### Performance Optimizations
- **GraphQL API Integration:** Instant entry/asset listing for GitHub and GitLab
- **Local File Caching:** Faster startup times
- **Lazy Loading:** Components loaded on-demand
- **Infinite Scrolling:** Efficient content browsing
- **Thumbnail Caching:** Pre-generated thumbnails for images, videos, and PDFs

#### User Experience
- **Keyboard Shortcuts:** Efficient content workflows
- **Auto-Save Drafts:** Local backup without confirmation dialogs
- **One-Click Save:** No publish confirmation required
- **Full-Text Search:** Instant search with relevance sorting
- **Mobile Optimized:** Responsive design with touch optimization
- **QR Code Sign-In:** Passwordless mobile authentication

#### Developer Experience
- **Zero Dependencies:** No npm packages for end users
- **JSON Schema Support:** Autocomplete and validation in VS Code
- **TypeScript Definitions:** Complete, annotated type definitions
- **Multiple Config Files:** Modular configuration support
- **Built-in Asset Optimizer:** WebP/SVG conversion without external tools

---

## Getting Started

### Prerequisites

- A Git repository (GitHub, GitLab, Gitea, or Forgejo)
- A static site generator (Hugo, Jekyll, Next.js, etc.)
- HTTPS-enabled hosting (required for security)

### Installation Methods

#### Method 1: CDN (Recommended for Quick Start)

Create `static/admin/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Load Sveltia CMS -->
    <script type="module" src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>

    <!-- Reference your configuration -->
    <link rel="stylesheet" href="/admin/config.yml" />
  </body>
</html>
```

#### Method 2: npm Installation

```bash
npm install @sveltia/cms
```

```javascript
// admin/index.js
import { CMS } from '@sveltia/cms';

CMS.init({
  // Optional: provide config object instead of config.yml
  config: {
    backend: {
      name: 'github',
      repo: 'username/repository',
      branch: 'main'
    },
    // ... rest of configuration
  }
});
```

#### Method 3: Local Repository Workflow

For local development without a Git backend:

```javascript
import { CMS } from '@sveltia/cms';

CMS.init({
  backend: {
    name: 'test-repo'
  }
});
```

Uses the File System Access API for native file reading/writing.

### Basic Configuration

Create `static/admin/config.yml`:

```yaml
# Enable JSON Schema for autocomplete in VS Code
# yaml-language-server: $schema=https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json

backend:
  name: github
  repo: username/repository
  branch: main
  base_url: https://your-oauth-url  # If using custom OAuth

media_folder: static/images
public_folder: /images

collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Body", name: "body", widget: "markdown" }
```

---

## Configuration Schema

### Top-Level Options

```yaml
# Backend configuration (required)
backend:
  name: github | gitlab | gitea | test-repo
  repo: owner/repository
  branch: main
  base_url: https://oauth-provider-url
  auth_type: implicit | pkce | code  # Default varies by backend
  cms_label_prefix: cms/  # Label prefix for entry status
  squash_merges: true | false

# Global media settings
media_folder: static/images  # Server-side path
public_folder: /images       # Public-facing URL path

# Optional: multiple media libraries
media_libraries:
  - name: default
    label: Local Repository
  - name: cloudinary
    label: Cloudinary
    config:
      cloud_name: your-cloud-name
      api_key: your-api-key
  - name: uploadcare
    label: Uploadcare
    config:
      public_key: your-public-key

# Locale configuration
locale: en  # Default UI locale (not content locale)

# Site URL for preview
site_url: https://yourdomain.com

# Display URL for "View on Site" links
display_url: https://yourdomain.com

# Logo customization
logo_url: /images/logo.svg

# Collections (required)
collections:
  - name: posts
    # ... collection configuration

# Slug configuration
slug:
  encoding: unicode | ascii
  clean_accents: true | false
  sanitize_replacement: "-"

# Data output options
data_output:
  omit_empty_optional_fields: true | false
```

### VS Code Autocomplete Setup

**For YAML files**, add to the top of `config.yml`:

```yaml
# yaml-language-server: $schema=https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json
```

**For JSON files**, add inside the root object:

```json
{
  "$schema": "https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json",
  "backend": {
    // ...
  }
}
```

**Alternative: Workspace Settings**

Create `.vscode/settings.json`:

```json
{
  "yaml.schemas": {
    "https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json": [
      "/admin/config.yml",
      "/static/admin/config.yml"
    ]
  }
}
```

---

## Backend Configuration

### Supported Backends

| Backend | Status | API Method | Min. Version | Features |
|---------|--------|------------|--------------|----------|
| GitHub | ✅ Fully Supported | GraphQL | N/A | GraphQL for fast fetching, GPG signing |
| GitLab | ✅ Fully Supported | GraphQL | 16.3+ | PKCE auth, auto token renewal |
| Gitea | ✅ Supported | REST | Recent | PKCE auth |
| Forgejo | ✅ Supported | REST | Recent | PKCE auth |
| Test Repo | ✅ Local Dev | File System | N/A | Local file access (no Git) |

**Note:** Git Gateway (Netlify Identity) is **NOT supported** due to performance limitations. Use GitHub or GitLab backend directly.

### GitHub Backend

```yaml
backend:
  name: github
  repo: username/repository
  branch: main  # Default branch
  base_url: https://sveltia-cms-auth.your-worker.workers.dev  # Custom OAuth
  cms_label_prefix: cms/  # Prefix for PR labels
  squash_merges: true  # Use squash commits for editorial workflow
  open_authoring: false  # Fork-based contributions (not yet supported)
```

**GraphQL Benefits:**
- Instant content fetching (vs. hundreds of REST API calls)
- Avoids API rate limit violations
- Faster relation widget resolution

**GPG Signing:**
Commits are automatically marked as verified when using GPG keys.

### GitLab Backend

```yaml
backend:
  name: gitlab
  repo: username/repository  # Project path
  branch: main
  base_url: https://gitlab.com  # Or self-hosted URL
  auth_type: pkce  # Required (implicit grant deprecated)
  api_root: https://gitlab.com/api/v4  # API endpoint
```

**Requirements:**
- GitLab 16.3 or later
- PKCE authorization (client-side)
- OAuth access token auto-renewal supported

**Authentication Flow:**
1. User initiates login
2. PKCE authorization code flow
3. Token stored securely
4. Automatic renewal when expired

### Gitea / Forgejo Backend

```yaml
backend:
  name: gitea  # Or 'forgejo'
  repo: username/repository
  branch: main
  base_url: https://gitea.yourdomain.com
  auth_type: pkce
```

### Authentication Setup

#### Option 1: Sveltia CMS Authenticator (Cloudflare Workers)

**Best for:** Sites hosted on GitHub Pages, Cloudflare Pages, or non-Netlify platforms.

**Setup Steps:**

1. **Deploy Cloudflare Worker:**
   ```bash
   # Clone the authenticator repository
   git clone https://github.com/sveltia/sveltia-cms-auth.git
   cd sveltia-cms-auth

   # Install dependencies
   npm install

   # Deploy to Cloudflare
   npx wrangler deploy
   ```

2. **Get Worker URL:**
   - Open Cloudflare Workers dashboard
   - Select `sveltia-cms-auth` service
   - Copy the worker URL: `https://sveltia-cms-auth.<SUBDOMAIN>.workers.dev`

3. **Register OAuth App on GitHub:**
   - Go to Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - **Application name:** Your CMS Name
   - **Homepage URL:** `https://yourdomain.com`
   - **Authorization callback URL:** `https://sveltia-cms-auth.<SUBDOMAIN>.workers.dev/callback/github`
   - Copy the **Client ID** and generate a **Client Secret**

4. **Configure Worker Environment Variables:**
   ```bash
   wrangler secret put OAUTH_GITHUB_CLIENT_ID
   # Paste your Client ID when prompted

   wrangler secret put OAUTH_GITHUB_CLIENT_SECRET
   # Paste your Client Secret when prompted
   ```

5. **Update config.yml:**
   ```yaml
   backend:
     name: github
     repo: username/repository
     branch: main
     base_url: https://sveltia-cms-auth.<SUBDOMAIN>.workers.dev
   ```

#### Option 2: Netlify Identity (Not Recommended)

**Note:** Sveltia CMS does NOT support Git Gateway due to performance issues. If you previously used Netlify CMS with Git Gateway, switch to direct GitHub/GitLab backend instead.

**Migration Path:**
1. Remove Git Gateway configuration
2. Set up GitHub OAuth (see above)
3. Update backend to `github` or `gitlab`
4. Remove Netlify Identity scripts from your site

#### Option 3: Self-Hosted OAuth

Deploy your own OAuth server using any backend framework. Must implement OAuth 2.0 authorization code flow.

**Required Endpoints:**
- `/auth/github` - Initiate authorization
- `/callback/github` - Handle OAuth callback
- `/auth/gitlab` - GitLab authorization
- `/callback/gitlab` - GitLab callback

### Cross-Origin Considerations

**COOP Header Issue:**

If you encounter "Authentication Aborted" errors, check your `Cross-Origin-Opener-Policy` header:

```http
# ❌ Breaks OAuth popup flow
Cross-Origin-Opener-Policy: same-origin

# ✅ Allows OAuth popup
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

**CSP Configuration:**

Sveltia CMS supports strict Content Security Policy without `unsafe-eval` or `unsafe-inline`:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://unpkg.com;
  style-src 'self' https://unpkg.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.github.com https://gitlab.com;
```

---

## Collections

Collections define the content types your CMS will manage. Sveltia CMS supports two primary collection types: **folder collections** and **file collections**.

### Collection Types

#### Folder Collections

Organize entries as separate files in a directory. Ideal for blog posts, products, team members, etc.

```yaml
collections:
  - name: blog
    label: Blog Posts
    label_singular: Blog Post
    folder: content/blog
    create: true
    delete: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    path: "{{slug}}/index"  # Creates index.md in folder (Hugo bundles)
    preview_path: blog/{{slug}}
    extension: md
    format: yaml-frontmatter
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Draft", name: "draft", widget: "boolean", default: true }
      - { label: "Tags", name: "tags", widget: "list" }
      - { label: "Body", name: "body", widget: "markdown" }
```

**Key Options:**

| Option | Type | Description |
|--------|------|-------------|
| `name` | string | Unique identifier (used in API) |
| `label` | string | Display name (plural) |
| `label_singular` | string | Singular form for UI |
| `folder` | string | Directory path for entries |
| `create` | boolean | Allow creating new entries |
| `delete` | boolean | Allow deleting entries |
| `slug` | string | Filename pattern |
| `path` | string | Entry file path (supports Hugo bundles) |
| `extension` | string | File extension (`md`, `json`, `yml`, etc.) |
| `format` | string | Data format (see below) |
| `preview_path` | string | URL pattern for previews |
| `identifier_field` | string | Field used for entry title (default: `title`) |
| `summary` | string | Template for entry list display |
| `sortable_fields` | array | Fields available for sorting |
| `view_filters` | array | Predefined filter options |
| `view_groups` | array | Predefined grouping options |

**Format Options:**

| Format | Description | Front Matter | Body |
|--------|-------------|--------------|------|
| `yaml-frontmatter` | YAML front matter + Markdown | `---` delimited | Markdown |
| `toml-frontmatter` | TOML front matter + Markdown | `+++` delimited | Markdown |
| `json-frontmatter` | JSON front matter + Markdown | `{` `}` delimited | Markdown |
| `frontmatter` | Auto-detect front matter | Mixed | Markdown |
| `yaml` | YAML only | N/A | Full YAML |
| `toml` | TOML only | N/A | Full TOML |
| `json` | JSON only | N/A | Full JSON |

#### File Collections

Manage singleton pages or data files. Each entry is explicitly defined.

```yaml
collections:
  - name: pages
    label: Pages
    files:
      - name: about
        label: About Page
        file: content/about.md
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Body", name: "body", widget: "markdown" }

      - name: contact
        label: Contact Page
        file: content/contact.md
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Email", name: "email", widget: "string" }
          - { label: "Phone", name: "phone", widget: "string" }
          - { label: "Body", name: "body", widget: "markdown" }

      - name: settings
        label: Site Settings
        file: data/settings.yml
        fields:
          - { label: "Site Title", name: "site_title", widget: "string" }
          - { label: "Description", name: "description", widget: "text" }
          - label: "Social Media"
            name: "social"
            widget: "object"
            fields:
              - { label: "Twitter", name: "twitter", widget: "string" }
              - { label: "GitHub", name: "github", widget: "string" }
```

### Advanced Collection Configuration

#### Custom Icons

```yaml
collections:
  - name: blog
    label: Blog Posts
    icon: article  # Material Icons name
    folder: content/blog
    # ...
```

**Available Icon Sets:**
- Material Icons (default)
- Custom SVG icons via URL

#### Collection Dividers

Organize collections in the sidebar with visual separators:

```yaml
collections:
  - name: posts
    label: Blog Posts
    # ...

  - name: divider_1
    divider: true

  - name: pages
    label: Pages
    # ...
```

#### Default Sorting

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    sortable_fields:
      - name: date
        label: Date
        default: true  # Default sort field
        direction: desc  # Default sort direction
      - name: title
        label: Title
      - name: author
        label: Author
```

#### View Filters

Pre-configured filters for the collection list:

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    view_filters:
      - label: "Drafts"
        field: draft
        pattern: true

      - label: "Published"
        field: draft
        pattern: false

      - label: "Featured"
        field: featured
        pattern: true
```

#### View Groups

Group entries by field values:

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    view_groups:
      - label: "By Year"
        field: date
        pattern: "\\d{4}"

      - label: "By Author"
        field: author

      - label: "By Category"
        field: category
```

#### Nested Collections

**Current Status:** Not yet supported. Planned for future release.

**Workaround:** Use flat folder structure with slug patterns:

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    slug: "{{category}}/{{year}}-{{month}}-{{slug}}"
    fields:
      - { label: "Category", name: "category", widget: "string" }
      - { label: "Title", name: "title", widget: "string" }
      # ...
```

#### Per-Collection Media Folders

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    media_folder: /static/images/blog  # Collection-specific media
    public_folder: /images/blog
    fields:
      # ...
```

**Entry-Relative Media Folders (Hugo Page Bundles):**

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    path: "{{slug}}/index"  # Creates folder structure
    media_folder: ""  # Images alongside index.md
    public_folder: ""
    fields:
      # ...
```

**Result:**
```
content/blog/
├── my-post/
│   ├── index.md
│   ├── image1.jpg
│   └── image2.png
└── another-post/
    ├── index.md
    └── hero.jpg
```

---

## Widget Reference

Widgets define the input type for each field in your collections. Sveltia CMS supports all Netlify/Decap CMS widgets with significant improvements.

### Widget Common Options

All widgets support these base options:

```yaml
- label: "Field Label"
  name: "field_name"
  widget: "widget_type"
  required: true | false  # Default: true
  hint: "Helper text displayed below the field"
  default: "Default value"
  preview: true | false  # Show/hide in preview pane (default: true)
  i18n: true | false | duplicate  # i18n behavior
  pattern: ["regex_pattern", "Error message"]  # Validation regex
  minlength: 10  # Minimum character count
  maxlength: 280  # Maximum character count
```

### String Widget

Single-line text input.

```yaml
- label: "Title"
  name: "title"
  widget: "string"
  required: true
  minlength: 5
  maxlength: 100
  pattern: ["^[A-Za-z0-9\\s]+$", "Only alphanumeric characters allowed"]
```

**Options:**
- `minlength`: Minimum characters (with counter)
- `maxlength`: Maximum characters (with counter)
- `pattern`: Validation regex

### Text Widget

Multi-line text input.

```yaml
- label: "Description"
  name: "description"
  widget: "text"
  minlength: 20
  maxlength: 500
```

**Character Counter:** Automatically displayed when `minlength` or `maxlength` is set.

### Number Widget

Numeric input with optional range and step.

```yaml
- label: "Price"
  name: "price"
  widget: "number"
  value_type: "float"  # or "int"
  min: 0
  max: 10000
  step: 0.01
  default: 0
```

**Options:**
- `value_type`: `int` or `float`
- `min`: Minimum value
- `max`: Maximum value
- `step`: Increment/decrement step

### Boolean Widget

Toggle switch for true/false values.

```yaml
- label: "Published"
  name: "published"
  widget: "boolean"
  default: false
```

**Behavior:**
- Required field with no default → saved as `false`
- Optional field with no default → saved as `false`

### DateTime Widget

Date and/or time picker.

```yaml
- label: "Publication Date"
  name: "date"
  widget: "datetime"
  date_format: "YYYY-MM-DD"  # Display format
  time_format: "HH:mm"  # Or false for date-only
  format: "YYYY-MM-DD HH:mm"  # Storage format (ISO 8601)
  picker_utc: false  # Use UTC or local time
  default: ""
```

**Date-Only Configuration:**

```yaml
- label: "Birth Date"
  name: "birth_date"
  widget: "datetime"
  time_format: false  # No time input
  date_format: "YYYY-MM-DD"
  format: "YYYY-MM-DD"
```

**Planned:** `type` option with values: `datetime`, `date`, `time`, `year`, `month`, `week`

**Note:** The deprecated `date` widget was removed. Use `datetime` with `time_format: false` instead.

### Select Widget

Dropdown or radio button selection.

```yaml
- label: "Category"
  name: "category"
  widget: "select"
  options:
    - { label: "Technology", value: "tech" }
    - { label: "Lifestyle", value: "lifestyle" }
    - { label: "Travel", value: "travel" }
  default: "tech"
  multiple: false  # Allow multiple selections
```

**Simple Options:**

```yaml
- label: "Status"
  name: "status"
  widget: "select"
  options: ["draft", "review", "published"]
```

**Multiple Selection:**

```yaml
- label: "Tags"
  name: "tags"
  widget: "select"
  multiple: true
  min: 1
  max: 5
  options: ["javascript", "react", "vue", "svelte"]
```

### Relation Widget

Reference entries from another collection.

```yaml
- label: "Author"
  name: "author"
  widget: "relation"
  collection: "authors"  # Target collection
  value_field: "name"  # Field to store
  search_fields: ["name", "email"]  # Fields to search
  display_fields: ["name", "{{email}}"]  # Display template
  multiple: false
```

**Multiple Relations:**

```yaml
- label: "Related Posts"
  name: "related"
  widget: "relation"
  collection: "blog"
  value_field: "slug"
  search_fields: ["title", "description"]
  display_fields: ["{{title}} ({{date}})"]
  multiple: true
  min: 0
  max: 3
```

**Important:**
- `value_field` must be a **single field**, not a template
- Sveltia uses GraphQL for fast relation resolution
- Works seamlessly with i18n structures

### List Widget

Dynamic list of items (simple or complex).

**Simple List (Strings):**

```yaml
- label: "Tags"
  name: "tags"
  widget: "list"
  allow_add: true
  field: { label: "Tag", name: "tag", widget: "string" }
```

**Complex List (Objects):**

```yaml
- label: "Team Members"
  name: "team"
  widget: "list"
  fields:
    - { label: "Name", name: "name", widget: "string" }
    - { label: "Role", name: "role", widget: "string" }
    - { label: "Photo", name: "photo", widget: "image" }
    - { label: "Bio", name: "bio", widget: "text" }
```

**Variable Types (Polymorphic Lists):**

```yaml
- label: "Page Sections"
  name: "sections"
  widget: "list"
  types:
    - label: "Hero Section"
      name: "hero"
      fields:
        - { label: "Title", name: "title", widget: "string" }
        - { label: "Image", name: "image", widget: "image" }
        - { label: "CTA Text", name: "cta", widget: "string" }

    - label: "Text Section"
      name: "text"
      fields:
        - { label: "Content", name: "content", widget: "markdown" }

    - label: "Image Gallery"
      name: "gallery"
      fields:
        - label: "Images"
          name: "images"
          widget: "list"
          field: { label: "Image", name: "image", widget: "image" }
```

**Top-Level List (Data Files):**

For YAML/JSON files that are arrays at the root level:

```yaml
collections:
  - name: testimonials
    label: Testimonials
    file: data/testimonials.yml
    fields:
      - label: "Testimonials"
        name: "testimonials"
        widget: "list"
        root: true  # Allow root-level list
        fields:
          - { label: "Quote", name: "quote", widget: "text" }
          - { label: "Author", name: "author", widget: "string" }
```

### Object Widget

Nested group of fields.

```yaml
- label: "SEO Settings"
  name: "seo"
  widget: "object"
  required: false  # Optional object
  fields:
    - { label: "Meta Title", name: "title", widget: "string" }
    - { label: "Meta Description", name: "description", widget: "text" }
    - { label: "Keywords", name: "keywords", widget: "list" }
    - { label: "OG Image", name: "image", widget: "image" }
```

**Variable Types (Polymorphic Objects):**

```yaml
- label: "Call to Action"
  name: "cta"
  widget: "object"
  types:
    - label: "Button CTA"
      name: "button"
      fields:
        - { label: "Text", name: "text", widget: "string" }
        - { label: "URL", name: "url", widget: "string" }

    - label: "Form CTA"
      name: "form"
      fields:
        - { label: "Form ID", name: "form_id", widget: "string" }
        - { label: "Submit Text", name: "submit", widget: "string" }
```

**Collapsible Objects:**

Objects can be collapsed in the editor for better organization. Required subfields are only validated when the object is added.

### Markdown Widget

Rich text editor with WYSIWYG interface.

```yaml
- label: "Content"
  name: "body"
  widget: "markdown"
  sanitize_preview: true  # XSS protection (default: true)
  buttons:
    - bold
    - italic
    - code
    - link
    - heading-one
    - heading-two
    - heading-three
    - quote
    - bulleted-list
    - numbered-list
  editor_components:
    - image
    - code-block
```

**Security:**
- `sanitize_preview: true` by default (since v0.105.0)
- Prevents XSS attacks via entry previews
- Keep enabled unless you fully trust all CMS users

**Limitations:**
- Remark plugins NOT compatible (uses Lexical editor)
- Custom editor components NOT yet supported (planned)

### Code Widget

Syntax-highlighted code editor.

```yaml
- label: "Custom CSS"
  name: "custom_css"
  widget: "code"
  default_language: "css"
  allow_language_selection: true
  output_code_only: true
```

**Options:**
- `default_language`: Default syntax highlighting
- `allow_language_selection`: Let users choose language
- `output_code_only`: Save only code (not language metadata)

**Note:** Uses Prism for syntax highlighting (not CodeMirror)

### Image Widget

Image upload and selection with built-in optimizer.

```yaml
- label: "Featured Image"
  name: "image"
  widget: "image"
  required: false
  allow_multiple: false  # Deprecated, use `multiple`
  multiple: false  # Single vs. multiple images
  accept: "image/jpeg,image/png,image/webp"  # File type filter
  media_library:
    name: default  # Or cloudinary, uploadcare
  choose_url: true  # Allow URL input instead of upload
```

**Multiple Images:**

```yaml
- label: "Gallery"
  name: "gallery"
  widget: "image"
  multiple: true
```

**Custom Accept Types:**

```yaml
- label: "Avatar"
  name: "avatar"
  widget: "image"
  accept: "image/jpeg,image/png"  # Only JPEG/PNG
```

**Built-in Optimizer:**
- Converts HEIC to JPEG automatically
- Generates WebP versions
- Resizes large images
- No external tools required

### File Widget

Generic file upload (documents, videos, etc.).

```yaml
- label: "PDF Attachment"
  name: "pdf"
  widget: "file"
  accept: "application/pdf"
  multiple: false
```

**Multiple Files:**

```yaml
- label: "Documents"
  name: "documents"
  widget: "file"
  multiple: true
  accept: ".pdf,.doc,.docx"
```

**Options:**
- `accept`: File type filter (MIME types or extensions)
- `multiple`: Allow multiple file uploads
- `media_library`: Override default media library

### Hidden Widget

Store values not editable in UI.

```yaml
- label: "ID"
  name: "id"
  widget: "hidden"
  default: "auto-generated-id"
```

**Use Cases:**
- Auto-generated IDs
- System timestamps
- Computed values

### UUID Widget

Generate unique identifiers.

```yaml
- label: "Entry ID"
  name: "id"
  widget: "uuid"
  prefix: "post-"  # Optional prefix
  read_only: true
```

**Output:** `post-550e8400-e29b-41d4-a716-446655440000`

**Use Cases:**
- Unique entry identifiers
- Non-Latin language slugs
- Database-style IDs

### Map Widget

**Status:** Planned, not yet implemented.

### Color Widget

**Status:** Planned, not yet implemented.

**Workaround:** Use string widget with pattern validation:

```yaml
- label: "Brand Color"
  name: "color"
  widget: "string"
  pattern: ["^#[0-9A-Fa-f]{6}$", "Must be a valid hex color (e.g., #FF5733)"]
  default: "#000000"
```

---

## Media Management

### Media Folder Configuration

#### Global Media Folder

```yaml
media_folder: static/images
public_folder: /images
```

- **`media_folder`:** Server-side path where files are stored (relative to repository root)
- **`public_folder`:** Public-facing URL path used in content

**Leading Slash Behavior:**
- `static/images` → Relative to repo root
- `/static/images` → Absolute (same as above in Sveltia)

#### Per-Collection Media Folders

Override global settings for specific collections:

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    media_folder: /static/images/blog  # Collection-specific
    public_folder: /images/blog
    fields:
      # ...
```

**Result:** All blog media goes to `static/images/blog/`

#### Entry-Relative Media Folders

Store media alongside each entry (Hugo page bundles):

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    path: "{{slug}}/index"  # Creates folder for each post
    media_folder: ""  # Empty = same folder as entry
    public_folder: ""
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Image", name: "image", widget: "image" }
      - { label: "Body", name: "body", widget: "markdown" }
```

**File Structure:**

```
content/blog/
├── my-first-post/
│   ├── index.md
│   ├── hero.jpg
│   └── diagram.png
└── second-post/
    ├── index.md
    └── cover.jpg
```

**Benefits:**
- Keeps media organized with content
- Easier to move/delete posts
- Works perfectly with Hugo page bundles
- Auto-deletes media when entry is deleted

**Limitations:**
- Unsaved draft images don't appear in picker (yet)

#### Media Folder with Locale Support

For multilingual sites:

```yaml
media_folder: static/images/{{locale}}
public_folder: /images/{{locale}}

collections:
  - name: blog
    folder: content/blog
    i18n: true
    # ...
```

**Result:**
```
static/images/
├── en/
│   └── post-image.jpg
└── ro/
    └── post-image.jpg
```

### Asset Library

#### Full-Featured Asset Library

Sveltia CMS includes a comprehensive asset management system:

**Features:**
- View all repository assets
- Navigate between global and collection-specific media
- Thumbnail previews (images, videos, PDFs)
- Drag & drop upload
- Batch upload
- Search and filter
- Asset metadata editing
- Delete unused assets
- Automatic cleanup (entry-relative folders)

**Access:** Click "Media" in the main navigation

#### Stock Photo Integration

Built-in integration with free stock photo services:

```yaml
# No configuration needed - available by default
```

**Supported Services:**
- **Pexels:** Millions of free stock photos
- **Pixabay:** Free images and videos
- **Unsplash:** High-quality photography

**Usage:**
1. Open image field
2. Click "Stock Photos" tab
3. Search for images
4. Select and insert

**License:** All stock photos are free for commercial use (check individual service terms)

#### Multiple Media Libraries

Configure additional media storage providers:

```yaml
media_libraries:
  - name: default
    label: Local Repository

  - name: cloudinary
    label: Cloudinary
    config:
      cloud_name: your-cloud-name
      api_key: your-api-key
      api_secret: your-api-secret
      default_transformations:
        - fetch_format: auto
        - quality: auto

  - name: uploadcare
    label: Uploadcare
    config:
      public_key: your-public-key
```

**Per-Field Override:**

```yaml
fields:
  - label: "Hero Image"
    name: "hero"
    widget: "image"
    media_library:
      name: cloudinary
      config:
        folder: heroes
```

### Image Optimization

#### Built-in Optimizer

Automatic image optimization before upload:

- **Format Conversion:** HEIC → JPEG, PNG → WebP
- **Resizing:** Large images automatically resized
- **Compression:** Optimized file sizes
- **SVG Support:** Native SVG handling

**Configuration:**

```yaml
media_library:
  name: default
  config:
    max_file_size: 10485760  # 10 MB in bytes
    slugify_filename: true  # Sanitize filenames
```

#### Filename Sanitization

```yaml
slug:
  encoding: ascii  # or unicode
  clean_accents: true
  sanitize_replacement: "-"

media_library:
  name: default
  config:
    slugify_filename: true  # Apply slug rules to uploads
```

**Before:** `My Photo (2024).jpg`
**After:** `my-photo-2024.jpg`

**Note:** Currently only applies if explicitly enabled. Automatic sanitization for all uploads is planned.

### Asset Deletion

**Manual Deletion:**
1. Open Asset Library
2. Select asset(s)
3. Click delete button
4. Confirm deletion

**Automatic Deletion:**
- Entry-relative assets deleted when entry is deleted
- Global media requires manual deletion

---

## Internationalization (i18n)

Sveltia CMS has **first-class internationalization support** built into its core architecture from day one.

### i18n Structure Types

#### 1. Multiple Files Structure

Each locale gets its own file:

```yaml
i18n:
  structure: multiple_files
  locales: [en, ro]
  default_locale: en

collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    i18n: true
    fields:
      - { label: "Title", name: "title", widget: "string", i18n: true }
      - { label: "Body", name: "body", widget: "markdown", i18n: true }
```

**File Structure:**

```
content/blog/
├── my-post.en.md
└── my-post.ro.md
```

#### 2. Multiple Folders Structure

Each locale gets its own folder:

```yaml
i18n:
  structure: multiple_folders
  locales: [en, ro]
  default_locale: en

collections:
  - name: blog
    folder: content/{{locale}}/blog
    i18n: true
    fields:
      - { label: "Title", name: "title", widget: "string", i18n: true }
      - { label: "Body", name: "body", widget: "markdown", i18n: true }
```

**File Structure:**

```
content/
├── en/
│   └── blog/
│       └── my-post.md
└── ro/
    └── blog/
        └── my-post.md
```

**Template Tag:** Use `{{locale}}` in the folder path.

#### 3. Single File Structure

All translations in one file (limited support):

```yaml
i18n:
  structure: single_file
  locales: [en, ro]
  default_locale: en

collections:
  - name: pages
    file: data/pages.yml
    i18n: true
    fields:
      - { label: "Title", name: "title", widget: "string", i18n: true }
```

**File Content (YAML):**

```yaml
en:
  title: "About Us"
ro:
  title: "Despre Noi"
```

### Field-Level i18n Configuration

Control how each field behaves across locales:

```yaml
fields:
  - label: "Title"
    name: "title"
    widget: "string"
    i18n: true  # Translate this field

  - label: "Date"
    name: "date"
    widget: "datetime"
    i18n: duplicate  # Same value across locales

  - label: "Slug"
    name: "slug"
    widget: "string"
    i18n: false  # Not localized
```

**i18n Field Options:**

| Value | Behavior |
|-------|----------|
| `true` | Field is translated per locale |
| `false` | Field appears only in default locale |
| `duplicate` | Same value duplicated across locales |

### Locale Configuration

#### Default vs. Non-Default Locales

```yaml
i18n:
  structure: multiple_folders
  locales: [en, ro, de, fr]
  default_locale: en
  initial_locales: [en, ro]  # Enabled by default
```

- **Default locale:** Always enabled
- **Initial locales:** Enabled by default (users can disable)
- **Other locales:** Disabled by default (users can enable)

**User Control:** Users can enable/disable locales via the editor UI (three-dot menu)

#### Locale Labels

Customize locale display names:

```yaml
i18n:
  structure: multiple_folders
  locales:
    - code: en
      label: English
    - code: ro
      label: Română
    - code: de
      label: Deutsch
      initial: false  # Disabled by default
  default_locale: en
```

### Translation Workflow

#### Manual Translation

1. Open entry in default locale
2. Switch to target locale (language picker)
3. Edit translated fields
4. Save

#### AI-Powered Translation

Sveltia CMS integrates with translation services:

**Supported Services:**
- Google Cloud Translation
- DeepL
- Anthropic (Claude)
- OpenAI (GPT)

**Setup Example (DeepL):**

```yaml
# No configuration in config.yml needed
# Users provide API keys in CMS settings
```

**Usage:**
1. Open entry
2. Click "Translate" button (field or pane header)
3. Enter API key when prompted (stored in browser)
4. Select source and target languages
5. Field(s) automatically translated

**Benefits:**
- High-quality translations
- Fast workflow
- No context switching
- Works field-by-field or entire entry

### Slug Localization

Generate locale-specific slugs:

```yaml
collections:
  - name: blog
    folder: content/{{locale}}/blog
    slug: "{{slug}}"
    i18n: true
    fields:
      - label: "Title"
        name: "title"
        widget: "string"
        i18n: true

      - label: "Slug"
        name: "slug"
        widget: "string"
        i18n: true  # Localized slug
```

**Example:**

- **EN:** `content/en/blog/my-first-post.md` → slug: `my-first-post`
- **RO:** `content/ro/blog/primul-meu-articol.md` → slug: `primul-meu-articol`

**Alternative:** Use UUID for non-Latin languages:

```yaml
- label: "ID"
  name: "id"
  widget: "uuid"
  i18n: duplicate  # Same ID across locales
```

### Media Localization

#### Locale-Specific Media Folders

```yaml
media_folder: static/images/{{locale}}
public_folder: /images/{{locale}}
```

**Result:**

```
static/images/
├── en/
│   └── hero.jpg
└── ro/
    └── hero.jpg
```

#### Shared Media Across Locales

```yaml
media_folder: static/images
public_folder: /images

collections:
  - name: blog
    i18n: true
    fields:
      - label: "Image"
        name: "image"
        widget: "image"
        i18n: duplicate  # Same image across locales
```

### Relation Widget with i18n

```yaml
collections:
  - name: authors
    folder: content/{{locale}}/authors
    i18n: true
    fields:
      - { label: "Name", name: "name", widget: "string", i18n: true }
      - { label: "Bio", name: "bio", widget: "text", i18n: true }

  - name: blog
    folder: content/{{locale}}/blog
    i18n: true
    fields:
      - label: "Author"
        name: "author"
        widget: "relation"
        collection: "authors"
        value_field: "name"
        search_fields: ["name"]
        display_fields: ["{{name}}"]
        i18n: duplicate  # Same author across locales
```

**Important:** Ensure `value_field` is a single field, not a template.

### Validation Across Locales

**Behavior:**
- Required fields validated in all enabled locales
- Non-default locale fields validated correctly
- Collapsed objects with errors automatically expanded

---

## Hugo Integration

Sveltia CMS has specific optimizations for Hugo static sites.

### Hugo Page Bundles

**Leaf Bundles (Single Page):**

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    path: "{{slug}}/index"  # Creates index.md
    media_folder: ""
    public_folder: ""
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Image", name: "image", widget: "image" }
      - { label: "Body", name: "body", widget: "markdown" }
```

**Result:**

```
content/blog/
└── my-post/
    ├── index.md
    └── hero.jpg
```

**Branch Bundles (Section):**

```yaml
collections:
  - name: sections
    label: Sections
    folder: content
    path: "{{slug}}/_index"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Description", name: "description", widget: "text" }
```

**Result:**

```
content/
└── services/
    └── _index.md
```

### Hugo Front Matter

#### YAML Front Matter (Recommended)

```yaml
collections:
  - name: blog
    folder: content/blog
    format: yaml-frontmatter
    extension: md
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Tags", name: "tags", widget: "list" }
      - { label: "Body", name: "body", widget: "markdown" }
```

**Output:**

```markdown
---
title: "My Blog Post"
date: 2025-11-28T10:00:00Z
tags:
  - hugo
  - cms
---

Blog post content here...
```

**Critical:** Sveltia enforces **strict YAML validation**:
- Only ONE `---` at top and bottom
- No embedded `---` in content
- Balanced quotes throughout
- Escape inline dashes if needed: `\---`

#### TOML Front Matter

```yaml
collections:
  - name: blog
    folder: content/blog
    format: toml-frontmatter
    extension: md
    fields:
      # ...
```

**Output:**

```markdown
+++
title = "My Blog Post"
date = 2025-11-28T10:00:00Z
tags = ["hugo", "cms"]
+++

Blog post content here...
```

**Note:** DateTime values stored in native TOML date format (not quoted strings).

### Hugo Archetypes

Create templates for new content:

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime", default: "{{now}}" }
      - { label: "Draft", name: "draft", widget: "boolean", default: true }
      - { label: "Type", name: "type", widget: "hidden", default: "post" }
      - { label: "Layout", name: "layout", widget: "hidden", default: "single" }
      - { label: "Tags", name: "tags", widget: "list", default: [] }
      - { label: "Body", name: "body", widget: "markdown" }
```

### Hugo Taxonomies

#### Tags

```yaml
fields:
  - label: "Tags"
    name: "tags"
    widget: "list"
    allow_add: true
    field: { label: "Tag", name: "tag", widget: "string" }
```

**Or with select widget:**

```yaml
fields:
  - label: "Tags"
    name: "tags"
    widget: "select"
    multiple: true
    options: ["hugo", "cms", "jamstack", "svelte", "web-development"]
```

#### Categories

```yaml
fields:
  - label: "Category"
    name: "category"
    widget: "select"
    options:
      - { label: "Technology", value: "tech" }
      - { label: "Lifestyle", value: "lifestyle" }
      - { label: "Travel", value: "travel" }
```

### Hugo Content Types

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Type", name: "type", widget: "hidden", default: "post" }
      - { label: "Layout", name: "layout", widget: "select", options: ["single", "wide", "minimal"] }
      - { label: "Body", name: "body", widget: "markdown" }
```

### Hugo Shortcodes

**Limited Support:** Custom editor components not yet supported.

**Workaround:** Use markdown code blocks:

```yaml
fields:
  - label: "Content"
    name: "body"
    widget: "markdown"
    hint: "Use Hugo shortcodes: {{< youtube id >}}"
```

**Planned:** Custom editor components for shortcodes in future releases.

### Hugo Multilingual

#### Configuration File Structure

```yaml
i18n:
  structure: multiple_folders
  locales: [ro, en]
  default_locale: ro

collections:
  - name: blog
    label: Blog Posts
    folder: content/{{locale}}/blog
    i18n: true
    path: "{{slug}}/index"
    fields:
      - { label: "Title", name: "title", widget: "string", i18n: true }
      - { label: "Body", name: "body", widget: "markdown", i18n: true }
```

**Hugo Directory Structure:**

```
content/
├── blog/           # Romanian (default)
│   └── my-post/
│       └── index.md
└── en/
    └── blog/
        └── my-post/
            └── index.md
```

**Hugo Config (hugo.toml):**

```toml
defaultContentLanguage = 'ro'
defaultContentLanguageInSubdir = false

[languages]
  [languages.ro]
    languageName = 'Română'
    weight = 1

  [languages.en]
    languageName = 'English'
    weight = 2
```

### Hugo Data Files

Manage Hugo data files (`data/` folder):

```yaml
collections:
  - name: testimonials
    label: Testimonials
    file: data/testimonials.yml
    fields:
      - label: "Testimonials"
        name: "testimonials"
        widget: "list"
        root: true  # Top-level list
        fields:
          - { label: "Quote", name: "quote", widget: "text" }
          - { label: "Author", name: "author", widget: "string" }
          - { label: "Role", name: "role", widget: "string" }
```

### Hugo Menu Configuration

```yaml
collections:
  - name: pages
    label: Pages
    folder: content
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - label: "Menu"
        name: "menu"
        widget: "object"
        required: false
        fields:
          - { label: "Main Menu", name: "main", widget: "object", required: false, fields: [
              { label: "Weight", name: "weight", widget: "number", value_type: "int" }
            ]}
```

**Output:**

```yaml
---
title: "About"
menu:
  main:
    weight: 10
---
```

---

## Advanced Features

### Slug Configuration

#### Global Slug Settings

```yaml
slug:
  encoding: unicode | ascii
  clean_accents: true | false
  sanitize_replacement: "-"
```

**Examples:**

| Input | encoding: unicode | encoding: ascii |
|-------|-------------------|-----------------|
| "Hello World!" | `hello-world` | `hello-world` |
| "Café París" | `café-parís` | `cafe-paris` |
| "日本語タイトル" | `日本語タイトル` | (removed) |

**Recommendation:** Use `unicode` for multilingual sites, `ascii` for legacy compatibility.

#### Per-Collection Slug

```yaml
collections:
  - name: blog
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    slug_length: 50  # Max characters
    fields:
      # ...
```

**Available Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| `{{slug}}` | Auto-generated from title | `my-post` |
| `{{year}}` | 4-digit year | `2025` |
| `{{month}}` | 2-digit month | `11` |
| `{{day}}` | 2-digit day | `28` |
| `{{hour}}` | 2-digit hour | `14` |
| `{{minute}}` | 2-digit minute | `30` |
| `{{second}}` | 2-digit second | `45` |
| `{{fields.field_name}}` | Field value | `tech` |

**Custom Slug Field:**

```yaml
fields:
  - label: "Custom Slug"
    name: "slug"
    widget: "string"
    hint: "Leave blank to auto-generate"
    required: false
```

**Behavior:**
- If user provides slug → use it
- If blank → auto-generate from title

### Variable Types (Polymorphism)

#### List with Variable Types

```yaml
- label: "Page Sections"
  name: "sections"
  widget: "list"
  types:
    - label: "Hero"
      name: "hero"
      fields:
        - { label: "Title", name: "title", widget: "string" }
        - { label: "Subtitle", name: "subtitle", widget: "text" }
        - { label: "Background", name: "bg", widget: "image" }

    - label: "Features"
      name: "features"
      fields:
        - label: "Items"
          name: "items"
          widget: "list"
          fields:
            - { label: "Icon", name: "icon", widget: "string" }
            - { label: "Title", name: "title", widget: "string" }
            - { label: "Description", name: "desc", widget: "text" }

    - label: "CTA"
      name: "cta"
      fields:
        - { label: "Text", name: "text", widget: "string" }
        - { label: "Button", name: "button", widget: "string" }
        - { label: "URL", name: "url", widget: "string" }
```

**Output (YAML):**

```yaml
sections:
  - type: hero
    title: "Welcome"
    subtitle: "To our site"
    bg: /images/hero.jpg

  - type: features
    items:
      - icon: "check"
        title: "Fast"
        desc: "Lightning speed"
      - icon: "lock"
        title: "Secure"
        desc: "Bank-level security"

  - type: cta
    text: "Get started today"
    button: "Sign Up"
    url: "/signup"
```

#### Object with Variable Types

```yaml
- label: "Content Block"
  name: "content"
  widget: "object"
  types:
    - label: "Text Block"
      name: "text"
      fields:
        - { label: "Content", name: "content", widget: "markdown" }

    - label: "Video Block"
      name: "video"
      fields:
        - { label: "URL", name: "url", widget: "string" }
        - { label: "Caption", name: "caption", widget: "text" }
```

### Conditional Fields

**Current Status:** Not yet implemented. Planned for future release.

**Issue:** [#139 - Conditional fields](https://github.com/sveltia/sveltia-cms/issues/139)

**Workaround:** Use variable types to create conditional structures:

```yaml
- label: "Call to Action"
  name: "cta"
  widget: "object"
  types:
    - label: "Internal Link"
      name: "internal"
      fields:
        - label: "Page"
          name: "page"
          widget: "relation"
          collection: "pages"
          value_field: "slug"
          search_fields: ["title"]

    - label: "External Link"
      name: "external"
      fields:
        - { label: "URL", name: "url", widget: "string" }
```

### Validation Patterns

#### Regular Expression Validation

```yaml
- label: "Email"
  name: "email"
  widget: "string"
  pattern: ["^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", "Invalid email format"]
```

**Full Regex Support:**

```yaml
- label: "Tweet"
  name: "tweet"
  widget: "text"
  pattern: ["/^.{1,280}$/s", "Tweet must be 280 characters or less"]
```

**Flags:** Use `/pattern/flags` syntax (e.g., `/pattern/i` for case-insensitive)

#### Length Validation

```yaml
- label: "Meta Description"
  name: "meta_desc"
  widget: "text"
  minlength: 50
  maxlength: 160
  hint: "Optimal length: 120-160 characters"
```

**Features:**
- Character counter displayed automatically
- User-friendly validation errors
- Real-time feedback

#### Number Validation

```yaml
- label: "Age"
  name: "age"
  widget: "number"
  value_type: "int"
  min: 18
  max: 120
```

#### Custom Validation Messages

```yaml
- label: "Username"
  name: "username"
  widget: "string"
  minlength: 3
  maxlength: 20
  pattern: ["^[a-zA-Z0-9_]+$", "Only letters, numbers, and underscores allowed"]
```

### Data Output Options

#### Omit Empty Optional Fields

```yaml
data_output:
  omit_empty_optional_fields: true
```

**Behavior:**

| Field Configuration | Value | Output (false) | Output (true) |
|---------------------|-------|----------------|---------------|
| Required string | Empty | `title: ""` | `title: ""` |
| Optional string | Empty | `subtitle: ""` | (omitted) |
| Required list | Empty | `tags: []` | `tags: []` |
| Optional list | Empty | `categories: []` | (omitted) |
| Required boolean | Unchecked | `draft: false` | `draft: false` |
| Optional boolean | Unchecked | `featured: false` | (omitted) |

**Use Case:** TypeScript/validation systems expecting `undefined` instead of empty values.

#### Consistent Data Types

Sveltia always saves proper values:
- Empty strings: `""`
- Empty arrays: `[]`
- Null values: `null`
- Never `undefined`

### Editorial Workflow

**Current Status:** Planned for 1.x release (mid-2026).

**Alternative:** Use branch-based workflow:

```yaml
backend:
  name: github
  repo: username/repository
  branch: main
  cms_label_prefix: cms/
  squash_merges: true
```

**Workflow:**
1. Create content → saved to feature branch
2. Submit PR automatically
3. Review via GitHub PR interface
4. Merge when approved

**PR Labels:**
- `cms/draft` - Work in progress
- `cms/review` - Ready for review
- `cms/approved` - Approved

### Preview Templates

**Current Status:** Limited support. Custom preview templates planned.

**What Works:**
- Click-to-highlight (automatic, no opt-in)
- Preview pane rendering
- Hide preview per field: `preview: false`

**What Doesn't Work Yet:**
- Custom preview templates
- Custom editor components
- Preview styles customization

**Planned Features:**
- Full preview customization
- Live preview mode
- Custom preview templates
- Framework-specific previews

### Custom Widgets

**Current Status:** Not yet supported. Marketplace planned for future release.

**Roadmap:**
- Custom widget registration API
- Widget marketplace
- Community-contributed widgets
- Framework-agnostic widget system

**Current Limitation:** Cannot use Netlify/Decap CMS custom widgets (React-based, incompatible with Svelte architecture).

---

## Security & Performance

### Security Features

#### Content Security Policy (CSP)

Sveltia CMS supports strict CSP without unsafe directives:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://unpkg.com;
  style-src 'self' https://unpkg.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.github.com https://gitlab.com;
  frame-ancestors 'none';
```

**No `unsafe-eval` or `unsafe-inline` required.**

#### XSS Protection

- **Markdown sanitization:** `sanitize_preview: true` by default (since v0.105.0)
- **Input validation:** All user inputs validated
- **Output encoding:** Proper encoding in previews
- **No known vulnerabilities:** Active security maintenance

#### Authentication Security

- **OAuth 2.0:** Industry-standard authentication
- **PKCE Flow:** Prevents authorization code interception
- **Token Storage:** Secure browser storage
- **Auto-renewal:** Tokens refreshed automatically (GitLab, Gitea)
- **HTTPS Required:** Enforced via Secure Context API

#### Dependency Management

- **Dependabot:** Automated dependency updates
- **Trusted Publishing:** 2FA enabled for npm
- **Regular Audits:** Security vulnerabilities patched quickly
- **No Unpatched CVEs:** Clean security record

### Performance Optimizations

#### Bundle Size

| CMS | Bundle Size (min+gzip) | Bundle Size (min+brotli) |
|-----|------------------------|--------------------------|
| Sveltia CMS | ~300 KB | <500 KB |
| Decap CMS | ~1.5 MB | ~1.3 MB |
| Static CMS | ~2.6 MB | ~2.2 MB |

**70-80% smaller** than alternatives.

#### Load Time Optimizations

- **Lazy Loading:** Components loaded on-demand
- **Code Splitting:** Separate bundles for features
- **Tree Shaking:** Unused code eliminated
- **Minification:** Aggressive compression
- **No Virtual DOM:** Direct DOM manipulation (Svelte compiler)

#### API Optimization

**GraphQL for GitHub/GitLab:**
- Fetch all content in one request
- Avoid hundreds of REST API calls
- Prevent rate limiting
- Instant content listing

**Traditional (REST):**
```
GET /repos/:owner/:repo/contents/content/blog    # 1 request
GET /repos/:owner/:repo/contents/content/blog/post1.md  # 1 request
GET /repos/:owner/:repo/contents/content/blog/post2.md  # 1 request
... (100+ requests for 100 posts)
```

**Sveltia (GraphQL):**
```graphql
query {
  repository(owner: "username", name: "repo") {
    object(expression: "main:content/blog") {
      ... on Tree {
        entries {
          name
          object {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  }
}
# 1 request, all content fetched
```

#### Caching

- **Local File Cache:** Faster startup
- **Thumbnail Cache:** Pre-generated thumbnails
- **Asset Cache:** Reduced network requests
- **Service Worker:** (Planned) Offline support

#### Rendering Performance

- **Infinite Scrolling:** Render only visible entries
- **Virtual Lists:** Efficient large collections
- **Debounced Search:** Reduced re-renders
- **Optimistic UI:** Instant feedback

### Accessibility (WCAG 2.2)

#### Current Status

- **WAI-ARIA:** Comprehensive support
- **Keyboard Navigation:** Full keyboard access
- **Screen Readers:** NVDA and VoiceOver tested
- **Color Contrast:** Sufficient foreground/background contrast
- **Focus Indicators:** Clear focus states
- **Reduced Motion:** Respects `prefers-reduced-motion`
- **Reduced Transparency:** Respects `prefers-reduced-transparency`
- **Links:** Underlined by default

#### In Progress

- **High Contrast Mode:** Full support coming soon
- **AA Compliance:** Ongoing improvements
- **AAA Compliance:** Long-term goal

---

## Troubleshooting

### Common Issues

#### 1. Admin Page 404

**Symptoms:** `/admin` returns 404 error

**Causes:**
- `static/admin/` directory missing
- Files not deployed
- Incorrect Hugo configuration

**Solutions:**

```bash
# Verify directory exists
ls static/admin/
# Should show: index.html, config.yml

# Check Hugo config (hugo.toml)
# Ensure static files are published

# Test locally
hugo server
# Visit: http://localhost:1313/admin/
```

#### 2. YAML Parse Errors

**Symptoms:** "Invalid YAML" error when saving

**Causes:**
- Multiple `---` delimiters
- Unbalanced quotes
- Special characters

**Solutions:**

```yaml
# ❌ Invalid (multiple delimiters)
---
title: "Post"
---
Some content
---
More content
---

# ✅ Valid
---
title: "Post"
---
Some content
More content

# ❌ Invalid (unbalanced quotes)
title: "My "special" post"

# ✅ Valid
title: "My \"special\" post"
# Or
title: 'My "special" post'

# ❌ Invalid (inline separator)
title: "Section --- Subsection"

# ✅ Valid
title: "Section \\--- Subsection"
```

#### 3. Image Upload Failures

**Symptoms:** Images fail to upload

**Causes:**
- HEIC format (iOS photos)
- File size too large
- Incorrect media folder path

**Solutions:**

```bash
# Convert HEIC to JPEG before upload
# Or let Sveltia auto-convert (built-in)

# Check media folder configuration
# media_folder should exist in repository

# Verify file size limits
# Default: 10 MB
```

#### 4. Authentication Aborted

**Symptoms:** OAuth popup closes without signing in

**Causes:**
- COOP header set to `same-origin`
- Incorrect OAuth configuration
- Popup blockers

**Solutions:**

```http
# Fix COOP header
Cross-Origin-Opener-Policy: same-origin-allow-popups

# Verify OAuth settings
# - Client ID correct
# - Callback URL matches
# - base_url configured

# Disable popup blockers for your domain
```

#### 5. Images Not Loading in Preview

**Symptoms:** Preview shows broken images

**Causes:**
- Incorrect `public_folder` path
- Media folder mismatch
- Images not committed to Git

**Solutions:**

```yaml
# Verify public_folder matches your site structure
media_folder: static/images
public_folder: /images  # Must match Hugo's static URL

# For page bundles:
media_folder: ""
public_folder: ""

# Ensure images are committed
git status
git add static/images/
git commit -m "Add images"
```

#### 6. Relation Widget Not Working

**Symptoms:** Related entries not showing

**Causes:**
- `value_field` is a template (not allowed)
- Target collection empty
- i18n mismatch

**Solutions:**

```yaml
# ❌ Invalid (template value_field)
widget: "relation"
collection: "authors"
value_field: "{{name}} - {{email}}"

# ✅ Valid (single field)
widget: "relation"
collection: "authors"
value_field: "name"
display_fields: ["{{name}} - {{email}}"]

# Ensure target collection has entries
# Check locale configuration matches
```

#### 7. Slow Performance

**Symptoms:** CMS loads slowly, laggy interface

**Causes:**
- Large repository (many files)
- Using REST API instead of GraphQL
- Too many media files

**Solutions:**

```yaml
# Ensure GraphQL is used (automatic for GitHub/GitLab)
backend:
  name: github  # Uses GraphQL automatically

# Optimize media:
# - Use per-collection media folders
# - Archive old media
# - Use external media library (Cloudinary)

# Clean up repository:
# - Remove unused files
# - Use .gitignore for large binaries
```

### Debugging Tips

#### Enable Debug Logging

```javascript
// admin/index.html
<script type="module">
  import { CMS } from '@sveltia/cms';

  CMS.init({
    // Enable debug mode
    debug: true
  });
</script>
```

#### Browser Console

**Check for errors:**
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Share error messages when reporting issues

#### Network Tab

**Check API requests:**
1. Open DevTools → Network tab
2. Filter by XHR/Fetch
3. Verify API calls succeed (200 status)
4. Check response payloads

#### Validate Configuration

**Use JSON Schema:**

```bash
# Install YAML validator
npm install -g ajv-cli

# Validate config.yml
ajv validate -s https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json -d static/admin/config.yml
```

---

## Migration Guide

### From Netlify/Decap CMS

#### Quick Migration (Drop-in Replacement)

If you're using:
- GitHub, GitLab, or Gitea backend (not Git Gateway)
- No custom widgets
- No unsupported features

**Migration Steps:**

1. **Update HTML:**

```html
<!-- Before (Netlify CMS) -->
<script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>

<!-- After (Sveltia CMS) -->
<script type="module" src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
```

2. **Test:**

```bash
hugo server
# Visit: http://localhost:1313/admin/
# Verify login and editing works
```

3. **Done!** Your existing `config.yml` works as-is.

#### Full Migration (With Backend Change)

If you're using Git Gateway (Netlify Identity):

1. **Set up GitHub OAuth** (see Authentication Setup above)

2. **Update config.yml:**

```yaml
# Before
backend:
  name: git-gateway
  branch: main

# After
backend:
  name: github
  repo: username/repository
  branch: main
  base_url: https://your-oauth-worker.workers.dev
```

3. **Remove Netlify Identity:**

```html
<!-- Remove these scripts -->
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

4. **Update index.html:**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Content Manager</title>
  </head>
  <body>
    <script type="module" src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
  </body>
</html>
```

5. **Test and deploy**

#### Unsupported Features

**Not Available in Sveltia CMS (Yet):**

| Feature | Status | Workaround |
|---------|--------|------------|
| Custom Widgets | Planned (marketplace) | Use built-in widgets |
| Custom Preview Templates | Planned (1.0+) | Use default preview |
| Custom Editor Components | Planned (1.0+) | Use markdown |
| Editorial Workflow | Planned (1.x) | Use GitHub PR workflow |
| Nested Collections | Planned | Use flat structure with categories |
| Git Gateway | Not supported | Switch to GitHub/GitLab backend |
| Open Authoring | Planned | N/A |

**If you rely on these features**, wait for Sveltia CMS 1.0+ or continue using Decap CMS.

### Configuration Adjustments

#### Deprecated Options

Sveltia CMS marks deprecated options in JSON schema:

```yaml
# ❌ Deprecated
backend:
  auth_type: implicit  # GitLab implicit grant removed

# ✅ Use instead
backend:
  auth_type: pkce

# ❌ Deprecated
fields:
  - widget: date  # Date widget removed

# ✅ Use instead
fields:
  - widget: datetime
    time_format: false
```

**VS Code will warn you** if you use deprecated options (when JSON schema is enabled).

#### New Options

Take advantage of Sveltia-specific improvements:

```yaml
# Slug length limit
collections:
  - slug_length: 50

# Per-field preview control
fields:
  - preview: false

# Character count limits
fields:
  - minlength: 10
  - maxlength: 280

# Multiple media libraries
media_libraries:
  - name: cloudinary

# Top-level lists
fields:
  - widget: list
    root: true
```

### Testing Checklist

Before going live with Sveltia CMS:

- [ ] Authentication works (login/logout)
- [ ] Can create new entries
- [ ] Can edit existing entries
- [ ] Can delete entries (if enabled)
- [ ] Can upload images
- [ ] Images display in preview
- [ ] All field types work correctly
- [ ] Relation widgets resolve entries
- [ ] i18n locales switch properly
- [ ] Media library accessible
- [ ] Search/filter/sort functions work
- [ ] Draft saving works
- [ ] Final save commits to Git
- [ ] Changes appear on live site after build
- [ ] All locales tested (if multilingual)
- [ ] Mobile interface tested
- [ ] No console errors

---

## Additional Resources

### Official Links

- **GitHub Repository:** https://github.com/sveltia/sveltia-cms
- **npm Package:** https://www.npmjs.com/package/@sveltia/cms
- **JSON Schema:** https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json
- **Authenticator:** https://github.com/sveltia/sveltia-cms-auth
- **Discussions:** https://github.com/sveltia/sveltia-cms/discussions

### Community Resources

- **Hugo Integration Guide:** https://keefeere.me/blog/hugo_sveltia/
- **Hugolify Framework:** https://www.hugolify.io/docs/cms/sveltia-cms/
- **Jamstack Directory:** https://jamstack.org/headless-cms/sveltia-cms/

### Related Documentation

- **Hugo Documentation:** https://gohugo.io/documentation/
- **Netlify CMS (Decap):** https://decapcms.org/docs/
- **Git Workflows:** https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows

### Support

- **Bug Reports:** https://github.com/sveltia/sveltia-cms/issues
- **Feature Requests:** https://github.com/sveltia/sveltia-cms/discussions
- **Questions:** https://github.com/sveltia/sveltia-cms/discussions

**Response Time:** Typically <24 hours for bug reports.

---

## Roadmap

### Version 1.0 (GA) - Late 2025

**Planned Features:**
- [ ] Complete documentation
- [ ] Configuration editor (built-in)
- [ ] Official starter kits
- [ ] Localization (UI translations)
- [ ] Demo site
- [ ] Performance optimizations
- [ ] Accessibility improvements (WCAG AA)

### Version 1.x - Mid 2026

**Deferred Features:**
- [ ] Editorial workflow (draft/review/publish)
- [ ] Open authoring (fork-based contributions)
- [ ] Real-time collaboration
- [ ] Custom preview templates
- [ ] Custom editor components
- [ ] Widget marketplace
- [ ] Nested collections
- [ ] Conditional fields

### Long-Term Vision

- Widget ecosystem
- Plugin architecture
- Advanced workflow automation
- AI-powered features (beyond translation)
- Mobile app
- Offline-first capabilities

---

## FAQ

### General Questions

**Q: Is Sveltia CMS free?**
A: Yes, completely free and open source (MIT license).

**Q: Can I use Sveltia CMS in production?**
A: Yes, but note it's in beta. Version 1.0 expected late 2025.

**Q: Do I need Netlify to use Sveltia CMS?**
A: No, works with any static host (GitHub Pages, Cloudflare, Vercel, etc.).

**Q: Does Sveltia CMS work offline?**
A: Partially. Local workflow (test-repo backend) works offline. Remote backends require internet. Full offline support planned.

### Technical Questions

**Q: Can I use Sveltia CMS with [framework]?**
A: Yes, works with any static site generator (Hugo, Jekyll, Next.js, Eleventy, SvelteKit, etc.).

**Q: How do I migrate from Netlify/Decap CMS?**
A: See Migration Guide above. Often just one line change.

**Q: Can I customize the CMS interface?**
A: Limited customization now (logo, collection icons). More options planned.

**Q: Does Sveltia CMS support custom backends?**
A: Currently only GitHub, GitLab, Gitea, Forgejo. Custom backends not yet supported.

**Q: Can I use Sveltia CMS with a monorepo?**
A: Yes, configure `base` and `media_folder` paths accordingly.

### Security Questions

**Q: Is Sveltia CMS secure?**
A: Yes, no known vulnerabilities. Regular security updates, strict CSP support, XSS protection.

**Q: How is authentication handled?**
A: OAuth 2.0 (GitHub/GitLab/Gitea). No passwords stored in CMS.

**Q: Can I restrict CMS access?**
A: Yes, via repository permissions (GitHub teams, GitLab groups, etc.).

### Compatibility Questions

**Q: Do Netlify CMS custom widgets work?**
A: No, incompatible (React vs. Svelte). Custom widget API planned.

**Q: Do Decap CMS configurations work?**
A: Mostly yes. See Unsupported Features for exceptions.

**Q: Can I use both Sveltia and Decap CMS?**
A: Yes, they can coexist (different HTML files). Not recommended long-term.

---

## License

Sveltia CMS is released under the **MIT License**.

Copyright (c) 2022-2025 Sveltia Project

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

**Document Version:** 1.0
**Sveltia CMS Version:** 0.113.0 (Beta)
**Last Updated:** 2025-11-28
**Maintained By:** Research Scout Agent

---

## Sources

This documentation was compiled from the following authoritative sources:

- [Sveltia CMS GitHub Repository](https://github.com/sveltia/sveltia-cms)
- [Sveltia CMS npm Package](https://www.npmjs.com/package/@sveltia/cms)
- [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)
- [Integrating Sveltia CMS with Hugo - Real-World Setup](https://keefeere.me/blog/hugo_sveltia/)
- [Hugolify Sveltia CMS Documentation](https://www.hugolify.io/docs/cms/sveltia-cms/)
- [Hugo CMS Setup Journey - Decap & Sveltia on GitHub Pages](https://0deepresearch.com/posts/2025-05-08-hugo-cms-setup-journey-decap-cms-sveltia-cms-on-github-pages/)
- [Sveltia CMS on Jamstack](https://jamstack.org/headless-cms/sveltia-cms/)
- [Why Sveltia CMS is the Best Git-CMS Choice](https://sedenko.net/blog/why-i-like-sveltia-cms)
- [GitHub Discussions - Media Folder Configuration](https://github.com/sveltia/sveltia-cms/discussions/190)
- [GitHub Discussions - Relation Fields i18n](https://github.com/sveltia/sveltia-cms/discussions/302)
- [GitHub Issues - Conditional Fields](https://github.com/sveltia/sveltia-cms/issues/139)

---

**END OF DOCUMENTATION**