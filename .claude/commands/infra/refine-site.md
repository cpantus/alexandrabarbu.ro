---
description: "🎨 Refine Site - Interactive post-wizard editing for content, design, and structure"
---

# Refine Site Command

Interactive tool for making adjustments to your generated site after the wizard completes.

## Usage

```bash
/refine-site [area]
```

**Areas**:
- `content` - Edit page content and sections
- `design` - Adjust colors, fonts, and styling
- `structure` - Modify menu and page structure
- `integrations` - Update third-party integrations
- (no area) - Interactive menu to choose

## How It Works

### 1. Interactive Menu (No Area Specified)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 REFINE YOUR SITE

What would you like to adjust?

1. 📝 Content - Edit page text and sections
2. 🎨 Design - Colors, fonts, and styling
3. 📋 Structure - Menu and page organization
4. 🔌 Integrations - Update third-party services
5. 📊 Review - See current site status
6. ❌ Exit

Enter choice [1-6]:
```

### 2. Content Refinement (`/refine-site content`)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 CONTENT REFINEMENT

Current pages:
1. Home (content/_index.ro.md)
2. About (content/about/_index.ro.md)
3. Services (content/services/_index.ro.md)
   ├── Individual Therapy
   └── Couples Therapy
4. Contact (content/contact/_index.ro.md)

Options:
a) Edit page content
b) Add/remove sections
c) Update multilingual content
d) Review AI-generated content
e) Back to main menu

Enter choice:
```

#### a) Edit Page Content

```
Select page to edit [1-4]: 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 EDITING: Home Page
File: content/_index.ro.md

Current sections:
1. hero-cta (Hero with CTA)
2. values-intro (Values Introduction)
3. services-overview (Services Overview)
4. testimonials (Testimonials)
5. faq-mini (Mini FAQ)
6. contact-form (Contact Form)

Actions:
a) Edit section content
b) Reorder sections
c) Add new section
d) Remove section
e) Edit page metadata (title, description, SEO)
f) Preview changes
g) Save and exit

Enter action:
```

**Edit Section Content**:

```
Select section to edit [1-6]: 1

Current content (hero-cta):
---
title: "Suport Psihologic Profesionist în București"
subtitle: "Terapie individuală și de cuplu într-un spațiu sigur..."
cta_text: "Programează o Consultație"
cta_link: "/contact"
---

Edit:
1. Title
2. Subtitle
3. CTA button text
4. CTA button link
5. Background image
6. Edit all (open in editor)
7. Cancel

Enter choice:
```

#### b) Add/Remove Sections

**Add Section**:

```
Available section types:
1. hero-cta - Hero banner with call-to-action
2. hero-breadcrumb - Hero with breadcrumb navigation
3. values-intro - Introduction with values
4. services-overview - Service cards grid
5. benefits-grid - Benefits with icons
6. testimonials - Client testimonials
7. faq-mini - Compact FAQ (5 questions)
8. faq-comprehensive - Full FAQ page
9. contact-form - Contact form
10. contact-form-enhanced - Enhanced contact form
11. about-bio - Personal biography
12. team-grid - Team members grid
13. pricing-tables - Pricing comparison
14. ...more

Select section type [1-13] or search:
```

### 3. Design Refinement (`/refine-site design`)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 DESIGN REFINEMENT

Current design:
┌─────────────────────────────────────┐
│ Colors                              │
├─────────────────────────────────────┤
│ Primary:   #4DB380 (Therapeutic Green) │
│ Secondary: #CC6B49 (Warm Terracotta)   │
│ Accent:    #F4A460 (Sandy Brown)       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Typography                          │
├─────────────────────────────────────┤
│ Headings: Poppins (Sans-serif)      │
│ Body:     Open Sans (Sans-serif)    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Logo                                │
├─────────────────────────────────────┤
│ Type:     Uploaded logo             │
│ Location: /images/logo/logo.png     │
└─────────────────────────────────────┘

Options:
1. Change colors
2. Change typography
3. Update logo
4. Adjust spacing/sizing
5. Animation settings
6. Preview changes
7. Reset to blueprint defaults
8. Back to main menu

Enter choice:
```

#### 1) Change Colors

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 COLOR CUSTOMIZATION

Which color to change?
1. Primary color (currently #4DB380)
2. Secondary color (currently #CC6B49)
3. Accent color (currently #F4A460)
4. All colors (use preset)
5. Back

Enter choice: 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Change Primary Color

Options:
a) Enter hex code (e.g., #3498db)
b) Choose from presets
c) Pick from psychology blueprint presets
d) Cancel

Enter choice: a

Enter hex code: #2C7A5F

Preview:
┌──────────────────────────────────┐
│ █████ #2C7A5F (Darker Green)     │
└──────────────────────────────────┘

Apply this color? [Y/n]: Y

✓ Primary color updated to #2C7A5F
✓ Updated: config/_default/params.yaml
✓ Updated: assets/scss/_custom-vars.scss

Run `hugo server` to preview changes.
```

#### 2) Change Typography

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 TYPOGRAPHY CUSTOMIZATION

Presets:
1. Classic (Poppins + Open Sans) - Current
2. Editorial (Playfair Display + Lato)
3. Modern (Inter + Roboto)
4. Elegant (Cormorant + Source Sans Pro)
5. Clean (Work Sans + Lato)
6. Custom (choose your own)

Select preset [1-6]: 3

✓ Typography updated to "Modern"
✓ Headings: Inter (weights: 400, 600, 700)
✓ Body: Roboto (weights: 400, 600)
✓ Updated: config/_default/params.yaml
✓ Google Fonts will load automatically

Run `hugo server` to see changes.
```

### 4. Structure Refinement (`/refine-site structure`)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 STRUCTURE REFINEMENT

Current menu structure:
1. Home (/)
2. About (/about)
3. Services (/services)
   ├── Individual Therapy
   └── Couples Therapy
4. Contact (/contact)

Options:
a) Add new page
b) Remove page
c) Reorder menu items
d) Edit page slug/URL
e) Add submenu
f) Edit menu translations
g) Back to main menu

Enter choice:
```

#### a) Add New Page

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

➕ ADD NEW PAGE

Page name (Romanian): Preturi
Page name (English): Pricing
Slug (URL): pricing

Parent page (optional):
- Leave blank for top-level page
- Or enter parent slug (e.g., "services")

Parent slug [blank]:

Sections to include:
1. Hero with breadcrumb
2. Pricing tables
3. FAQ
4. CTA section

Select sections (comma-separated) [1-4] or "all": all

✓ Creating page structure...
✓ Created: content/pricing/_index.ro.md
✓ Created: content/pricing/_index.en.md
✓ Updated: config/_default/menus.ro.yaml
✓ Updated: config/_default/menus.en.yaml

Page created! Edit content: /edit-content pricing
```

### 5. Integrations Refinement (`/refine-site integrations`)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔌 INTEGRATIONS REFINEMENT

Current integrations:
┌────────────────────────────────────────┐
│ Booking: Calendly                      │
│ Status:  ⚠️  Needs configuration       │
│ Action:  Add Calendly username         │
├────────────────────────────────────────┤
│ Analytics: Plausible                   │
│ Status:  ⚠️  Needs configuration       │
│ Action:  Add domain name               │
├────────────────────────────────────────┤
│ Forms: Google Sheets                   │
│ Status:  ⚠️  Needs setup               │
│ Action:  Add script URL                │
├────────────────────────────────────────┤
│ Social: Configured                     │
│ Status:  ✓ Complete                    │
└────────────────────────────────────────┘

Options:
1. Configure booking system
2. Configure analytics
3. Configure contact form
4. Update social links
5. Add/remove integrations
6. Test integrations
7. View setup instructions
8. Back to main menu

Enter choice:
```

#### 1) Configure Booking System

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 CONFIGURE BOOKING SYSTEM

Current: Calendly (not configured)

Enter your Calendly username:
(e.g., if your URL is calendly.com/alexandra-barbu, enter "alexandra-barbu")

Username: alexandra-barbu

Optional: Default event slug
(e.g., "30-minute-consultation")
Leave blank for no default

Event slug [blank]: consultatie-initiala

✓ Calendly configured
✓ Updated: config/_default/params.yaml
✓ Widget URL: https://calendly.com/alexandra-barbu/consultatie-initiala

Test the booking widget:
- Visit your contact page
- Click "Programează o Consultație"
- Verify calendar loads

Need help? See: .wizard/generated-*/integration-setup.md
```

### 6. Review Current Status

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 SITE STATUS REVIEW

Generated: 2025-11-14 10:30
Wizard: Psychology Practice Blueprint

┌────────────────────────────────────────┐
│ CONTENT                                │
├────────────────────────────────────────┤
│ Pages: 6                               │
│ Languages: Romanian, English           │
│ AI-generated sections: 15              │
│ TODO items: 8                          │
│ Status: 85% complete                   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ DESIGN                                 │
├────────────────────────────────────────┤
│ Colors: ✓ Configured                   │
│ Typography: ✓ Configured               │
│ Logo: ✓ Uploaded                       │
│ Images: ⚠️  12 placeholders remaining  │
│ Status: 75% complete                   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ INTEGRATIONS                           │
├────────────────────────────────────────┤
│ Booking: ⚠️  Needs configuration       │
│ Analytics: ⚠️  Needs configuration     │
│ Forms: ⚠️  Needs setup                 │
│ Social: ✓ Configured                   │
│ Status: 40% complete                   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ SEO                                    │
├────────────────────────────────────────┤
│ Meta tags: ✓ All pages                 │
│ Schema.org: ✓ Configured               │
│ Sitemap: ✓ Enabled                     │
│ Images: ⚠️  Missing alt text for 5     │
│ Status: 90% complete                   │
└────────────────────────────────────────┘

Critical TODO items:
1. Replace 12 placeholder images
2. Configure booking system (Calendly)
3. Configure analytics (Plausible)
4. Add real testimonials

Next steps:
- /add-images - Upload real images
- /refine-site integrations - Complete setup
- /review-ai-content - Personalize AI content

Press any key to return to menu...
```

## Implementation

When this command is invoked:

1. **Check for generated site**:
   - Look for `.wizard/generated-*` directory
   - Load wizard state from `.wizard/state-*.json`
   - Load generation manifest

2. **Present interactive menu**:
   - Use inquirer or prompts library for nice CLI UI
   - Show current status and options
   - Navigate between sections

3. **For each refinement area**:
   - Load relevant config files
   - Present current values
   - Allow editing with validation
   - Save changes immediately
   - Provide feedback

4. **File editing**:
   - For simple values: inline editing with prompts
   - For complex content: open in $EDITOR
   - For colors: provide hex input with validation
   - For selections: use list prompts

5. **Validation**:
   - Validate hex colors
   - Check file paths exist
   - Verify URLs are valid
   - Test API keys if possible

6. **Auto-save**:
   - Save after each change
   - Create backup before editing
   - Log all changes to `.wizard/refine-log.md`

7. **Preview support**:
   - Offer to run `hugo server` after changes
   - Show diff of changes made
   - Allow reverting changes

## Examples

### Quick color change
```bash
/refine-site design
# Choose "1. Change colors"
# Enter new hex codes
# See preview
# Apply
```

### Add new page
```bash
/refine-site structure
# Choose "a) Add new page"
# Enter page details
# Select sections
# Page created with TODO markers
```

### Configure integrations
```bash
/refine-site integrations
# Choose integration to configure
# Enter API keys/usernames
# Test connection
# Save configuration
```

## Files Modified

Depending on what's refined:

**Content**:
- `content/**/_index.*.md` - Page content
- `data/*.yaml` - Data files

**Design**:
- `config/_default/params.yaml` - Design parameters
- `assets/scss/_custom-vars.scss` - Custom SCSS variables

**Structure**:
- `config/_default/menus.*.yaml` - Menu translations
- `content/**/_index.*.md` - New pages

**Integrations**:
- `config/_default/params.yaml` - Integration config

## Tips

**Use tab completion**: Navigate menus with arrow keys

**Preview often**: Run `hugo server` to see changes live

**Backup first**: Changes are auto-saved, but original wizard generation is preserved

**Small iterations**: Make one change at a time and preview

**Read TODO**: Check `.wizard/generated-*/TODO.md` for what needs attention

## Related Commands

- `/edit-content [page]` - Edit specific page content
- `/add-images [category]` - Upload images
- `/review-ai-content` - Review AI-generated content
- `/create-site` - Run wizard again for new site

---

**Note**: This command modifies your site files. The original wizard-generated files are backed up in `.wizard/generated-{timestamp}/`.
