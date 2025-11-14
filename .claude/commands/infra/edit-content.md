---
description: "✏️ Edit Content - Quick editor for page content and sections"
---

# Edit Content Command

Quick access tool for editing specific page content and sections.

## Usage

```bash
/edit-content [page] [section]
```

**Examples**:
```bash
/edit-content home                    # Edit home page
/edit-content services/individual     # Edit service page
/edit-content home hero               # Edit specific section
/edit-content about bio               # Edit about bio
```

## How It Works

### 1. Edit Entire Page

```bash
/edit-content home
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✏️  EDIT: Home Page

File: content/_index.ro.md

Options:
1. Edit in terminal (guided)
2. Open in $EDITOR (VS Code, vim, etc.)
3. Edit specific section
4. Edit frontmatter only
5. Preview current content
6. Cancel

Enter choice: 3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Page sections:
1. hero-cta (Hero with CTA)
2. values-intro (Values Introduction)
3. services-overview (Services Overview)
4. testimonials (Testimonials)
5. faq-mini (Mini FAQ)
6. contact-form (Contact Form)

Select section [1-6]: 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION: hero-cta

Current configuration:
┌─────────────────────────────────────────────┐
│ title: "Suport Psihologic Profesionist"     │
│ subtitle: "Terapie individuală și de cuplu" │
│ cta_text: "Programează o Consultație"       │
│ cta_link: "/contact"                        │
│ background_image: "/images/hero/hero-home.webp" │
│ style: "centered"                           │
└─────────────────────────────────────────────┘

Edit which field?
1. Title
2. Subtitle
3. CTA button text
4. CTA button link
5. Background image
6. Style
7. Edit all (open in editor)
8. Back

Enter choice: 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current subtitle:
"Terapie individuală și de cuplu într-un mediu sigur,
 confidențial și lipsit de judecată."

New subtitle (or press Enter to keep):
> Suport psihologic specializat pentru anxietate, depresie
  și dezvoltare personală în București.

✓ Subtitle updated

Preview:
┌─────────────────────────────────────────────┐
│ Suport Psihologic Profesionist               │
│                                              │
│ Suport psihologic specializat pentru        │
│ anxietate, depresie și dezvoltare            │
│ personală în București.                      │
│                                              │
│        [Programează o Consultație]           │
└─────────────────────────────────────────────┘

Save changes? [Y/n]: Y

✓ Saved: content/_index.ro.md

Edit another section? [y/N]: n
```

### 2. Edit Specific Section Directly

```bash
/edit-content home hero
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✏️  QUICK EDIT: Home › Hero Section

File: content/_index.ro.md
Section: hero-cta

[Opens directly to field editing menu...]
```

### 3. Edit Frontmatter

```bash
/edit-content services/individual
```

```
Options:
1. Edit in terminal
2. Open in $EDITOR
3. Edit specific section
4. Edit frontmatter only  ← Select this
5. Preview current content
6. Cancel

Enter choice: 4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FRONTMATTER EDITOR

Current metadata:
┌─────────────────────────────────────────────┐
│ title: "Terapie Individuală"                │
│ description: "Sesiuni de terapie..."        │
│ draft: false                                │
│ weight: 1                                   │
│ translationKey: "individual-therapy"        │
└─────────────────────────────────────────────┘

SEO:
┌─────────────────────────────────────────────┐
│ meta_title: "Terapie Individuală | ..."     │
│ meta_description: "Sesiuni de terapie..."   │
│ keywords: ["terapie", "anxietate", ...]     │
└─────────────────────────────────────────────┘

Edit:
1. Page title
2. Description
3. SEO metadata
4. Draft status
5. Weight (menu order)
6. All (open in editor)
7. Back

Enter choice: 3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEO METADATA EDITOR

Current meta title:
"Terapie Individuală | Cabinetul Alexandra Barbu"

New meta title (50-60 chars recommended, current: 48):
> Terapie Individuală București - Psiholog Clinician | Alexandra Barbu

✓ New length: 62 chars (⚠️  slightly long, but OK)

Current meta description:
"Sesiuni de terapie individuală pentru anxietate, depresie
și dezvoltare personală. Abordare profesională și empatică."

New meta description (150-160 chars recommended, current: 118):
> Terapie individuală în București pentru anxietate, depresie, stres și
  dezvoltare personală. Psiholog clinician cu 10 ani experiență.
  Programare online.

✓ New length: 155 chars (perfect!)

Current keywords:
- terapie individuală
- psiholog București
- anxietate
- depresie

Add/remove keywords? [Y/n]: Y

Keywords (comma-separated):
> terapie individuală, psiholog București, anxietate, depresie,
  psiholog clinician, terapie online, consiliere psihologică

✓ 7 keywords

Save SEO changes? [Y/n]: Y
✓ Saved

Run SEO validation? [Y/n]: Y

Validating...
✓ Meta title length: Good (62 chars)
✓ Meta description length: Perfect (155 chars)
✓ Keywords: 7 (recommended: 5-10)
✓ Title includes primary keyword
✓ Description includes call to action
✓ No keyword stuffing detected

SEO Score: 92/100 ⭐⭐⭐⭐

Recommendations:
- Consider shorter meta title (60 chars ideal)
```

### 4. Bulk Edit

```bash
/edit-content services
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✏️  BULK EDIT: Services

Found 4 service pages:
1. Individual Therapy
2. Couples Therapy
3. Family Therapy
4. Group Therapy

Options:
a) Edit each individually
b) Bulk update common fields
c) Update SEO for all
d) Reorder services
e) Add section to all
f) Cancel

Enter choice: b

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BULK UPDATE

What to update across all services?
1. Add same section (e.g., pricing, testimonials)
2. Update CTA button
3. Add disclaimer text
4. Update contact information
5. Update pricing
6. Custom field

Enter choice: 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UPDATE CTA BUTTON (All Services)

Current CTA buttons vary:
- Individual Therapy: "Programează Consultație"
- Couples Therapy: "Rezervă Ședință"
- Family Therapy: "Contactează-ne"
- Group Therapy: "Află Mai Multe"

New CTA text (same for all):
> Programează Consultație Gratuită

New CTA link (same for all):
> /contact?service={service_slug}

Preview:
┌─────────────────────────────────────────────┐
│ [Programează Consultație Gratuită]          │
│                                              │
│ Links to: /contact?service=individual       │
└─────────────────────────────────────────────┘

Apply to all 4 services? [Y/n]: Y

Updating...
✓ Updated: services/individual-therapy/_index.ro.md
✓ Updated: services/couples-therapy/_index.ro.md
✓ Updated: services/family-therapy/_index.ro.md
✓ Updated: services/group-therapy/_index.ro.md

✓ 4 services updated

Also update English versions? [Y/n]: Y

Enter English CTA text:
> Book Free Consultation

✓ Updated: services/individual-therapy/_index.en.md
✓ Updated: services/couples-therapy/_index.en.md
✓ Updated: services/family-therapy/_index.en.md
✓ Updated: services/group-therapy/_index.en.md

✓ All services updated (8 files)
```

### 5. Visual Editor (Rich Preview)

```bash
/edit-content about
```

```
Options:
...
7. Visual preview mode

Enter choice: 7

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 VISUAL PREVIEW MODE

Launching preview server...
✓ Server running at http://localhost:1313

Opening about page...
✓ Browser opened: http://localhost:1313/about

┌─────────────────────────────────────────────┐
│ LIVE EDIT MODE                              │
│                                              │
│ 1. Make changes in terminal                  │
│ 2. Save changes                              │
│ 3. Refresh browser to see updates           │
│                                              │
│ Server will auto-reload on save             │
│                                              │
│ Press Ctrl+C to stop server and exit        │
└─────────────────────────────────────────────┘

Edit which section?
[Section selection menu...]

[User selects section, edits, saves]

✓ Changes saved
→ Browser auto-reloaded

Continue editing? [Y/n]:
```

### 6. Diff/Compare Mode

```bash
/edit-content home --diff
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 COMPARE: Home Page Changes

Comparing to original (wizard-generated):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HERO SECTION:

Original (generated):
  Suport Psihologic Profesionist în București

  Oferim terapie individuală și de cuplu într-un
  mediu sigur, confidențial și lipsit de judecată.

Current (edited):
  Suport Psihologic Profesionist în București

  Suport psihologic specializat pentru anxietate,
+ depresie și dezvoltare personală în București.

Changes:
+ Added: "specializat pentru anxietate, depresie"
- Removed: "într-un mediu sigur, confidențial"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2 sections changed, 4 sections unchanged

Actions:
1. See all changes
2. Revert specific section
3. Revert all changes
4. Export diff
5. Continue editing
6. Exit

Enter choice:
```

## Keyboard Shortcuts

When in editor:
- `Ctrl+S` - Save
- `Ctrl+Q` - Quit without saving
- `Ctrl+P` - Preview
- `Ctrl+Z` - Undo
- `Ctrl+R` - Revert section

## File Backup

Before each edit:
```
.wizard/backups/
└── 2025-11-14/
    ├── 16-30-45-content-_index.ro.md
    └── 16-31-12-content-services-individual-_index.ro.md
```

## Multilingual Support

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Editing: Home Page (Romanian)

Also edit other languages?
- English version: content/_index.en.md
- French version: content/_index.fr.md (if exists)

Edit all languages? [y/N]: Y

Language: Romanian [Current]
[Edit Romanian...]

Language: English
Translate changes automatically? [Y/n]: Y

Original (RO): "Suport psihologic specializat pentru..."
Translation (EN): "Specialized psychological support for..."

Accept translation? [Y/n]: Y
✓ English version updated

[Continue for all languages...]
```

## Related Commands

- `/review-ai-content` - Review AI-generated content
- `/refine-site content` - Comprehensive content refinement
- `/add-images` - Manage images

## Tips

**Save often**: Changes are auto-saved, but good practice

**Use preview**: Run `hugo server` to see changes live

**Check multilingual**: Edit all language versions for consistency

**Test on mobile**: Preview on different screen sizes

**Validate SEO**: Use built-in SEO validator

**Backup first**: Originals saved automatically, but good to know

---

**Note**: All edits create automatic backups in `.wizard/backups/`.
