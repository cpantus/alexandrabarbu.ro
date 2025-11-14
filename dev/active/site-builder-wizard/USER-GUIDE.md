# Site Builder Wizard - User Guide

**Version**: 2.0.0
**Last Updated**: 2025-11-14
**Status**: Complete & Production Ready

---

## Overview

The Site Builder Wizard generates a complete, production-ready Hugo website in minutes. Choose from industry-specific blueprints, customize through an interactive wizard, and get a fully functional site with content, design, and integrations.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Available Blueprints](#available-blueprints)
3. [Wizard Phases](#wizard-phases)
4. [Post-Wizard Refinement](#post-wizard-refinement)
5. [Blueprint Details](#blueprint-details)
6. [Customization Guide](#customization-guide)
7. [Integration Setup](#integration-setup)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

- Hugo Extended v0.148.1+
- Node.js 18+ (for some integrations)
- Modern CLI tools: `fd`, `rg`, `jq`, `yq`
- Git
- (Optional) Unsplash API key for stock photos

### Basic Usage

```bash
# Start the wizard
/create-site

# Follow the interactive prompts through 7 phases
# Total time: 10 minutes

# After generation
hugo server --buildDrafts
# Visit http://localhost:1313
```

### What You Get

✅ **Complete website** with 6-10 pages
✅ **Multilingual support** (RO/EN or custom)
✅ **Responsive design** (mobile, tablet, desktop)
✅ **SEO optimized** (meta tags, schema.org, sitemap)
✅ **Professional content** (AI-generated, ready to personalize)
✅ **Stock imagery** (Unsplash integration)
✅ **Integrations** (booking, analytics, forms)
✅ **90% complete** - Just add personal touches!

---

## Available Blueprints

### 1. Psychology Practice 🧠

**Perfect for**: Therapists, psychologists, counselors, mental health practitioners

**Pages included**:
- Home (hero, services, testimonials, FAQ)
- About (bio, credentials, approach, philosophy)
- Services (individual, couples, family, group therapy)
- Contact (form, booking, location, hours)
- Pricing
- FAQ

**Design**: Warm, calming colors (therapeutic green, terracotta). Empathetic tone. Focus on trust and confidentiality.

**Integrations**: Calendly for booking, Plausible analytics, contact forms

### 2. Law Firm ⚖️

**Perfect for**: Lawyers, attorneys, legal services, law offices

**Pages included**:
- Home (hero, practice areas, team, results)
- About (firm history, values, team)
- Practice Areas (multiple specializations)
- Attorney Profiles
- Contact
- Case Results

**Design**: Professional, authoritative (navy, gold accents). Formal yet accessible tone.

**Integrations**: Contact forms, Google Analytics, newsletter

### 3. Consulting Business 💼

**Perfect for**: Business consultants, strategy advisors, management consulting

**Pages included**:
- Home (value prop, services, case studies)
- About (expertise, methodology)
- Services (strategy, operations, digital transformation)
- Case Studies
- Contact
- Resources/Blog

**Design**: Modern, professional (corporate blue, gray). Results-oriented tone.

**Integrations**: Newsletter, analytics, meeting scheduler

---

## Wizard Phases

### Phase 1: Quick Start (2 min)

**Choose blueprint**:
```
Available blueprints:
1. 🧠 Psychology Practice
2. ⚖️  Law Firm
3. 💼 Consulting Business

Select [1-3]: 1
```

**Select languages**:
```
Default language: [Romanian/English/Other]
Additional languages: [None/English/Romanian/French/...]
```

**Tip**: Most users choose Romanian + English for local + international reach.

### Phase 2: Menu Structure (2 min)

**Customize navigation**:
```
Suggested menu:
✓ Home
✓ About
✓ Services (with 4 subpages)
✓ Contact

Add pages:
- Blog
- FAQ
- Pricing
- Testimonials
```

**Submenus**:
```
Services submenu:
1. Individual Therapy
2. Couples Therapy
3. Family Therapy
4. Group Therapy

Add/remove/reorder as needed
```

**Tip**: Start with suggested structure. You can add pages later with `/refine-site structure`.

### Phase 3: Page Customization (2 min)

**Select sections for each page**:
```
Home page sections:
☑ Hero with CTA
☑ Values introduction
☑ Services overview
☑ Testimonials
☑ Mini FAQ
☑ Contact form

Available sections:
○ Benefits grid
○ Process steps
○ Video introduction
○ Team showcase
...
```

**Tip**: Each blueprint suggests optimal sections. Customize based on your content availability.

### Phase 4: Design & Feel (2 min)

**Logo**:
```
Logo options:
1. Upload logo file (SVG, PNG)
2. Use text-based logo (site name)
3. Skip for now

Your choice: 1

[Upload /path/to/logo.svg]
✓ Logo processed
```

**Colors**:
```
Color schemes (Psychology Practice):
1. Therapeutic Green (warm, calming) - Default
2. Ocean Blue (professional, trust)
3. Earth Tones (natural, grounded)
4. Custom (enter hex codes)

Select: 1

Primary: #4DB380
Secondary: #CC6B49
Accent: #F4A460
```

**Typography**:
```
Typography presets:
1. Classic (Poppins + Open Sans) - Default
2. Editorial (Playfair + Lato)
3. Modern (Inter + Roboto)
4. Custom fonts

Select: 1
```

**Tip**: Stick with defaults for most professional look. Customize later if needed.

### Phase 5: Content Strategy (1 min)

**AI Content Generation**:
```
Generate content with AI?
[Yes] / No

AI will generate:
- Service descriptions
- Benefits lists
- FAQ answers
- Process explanations

You will add:
- Personal bio
- Credentials
- Pricing
- Testimonials
```

**Images**:
```
Image source:
1. Unsplash (curated stock photos) - Recommended
2. Placeholders (replace later)
3. Upload my own (bulk upload)

Select: 1

Unsplash API key: [Optional, from env var]
```

**Tip**: AI + Unsplash = fastest path to 90% complete site. Personalize the 10% later.

### Phase 6: Integrations (1 min)

**Booking system**:
```
Booking system:
○ None
◉ Calendly (free)
○ Cal.com (open source)

Calendly username: [Enter later]
```

**Analytics**:
```
Analytics:
○ None
◉ Plausible (privacy-friendly, €9/mo)
○ Google Analytics (free, requires consent)

Domain: [Enter later]
```

**Contact form**:
```
Contact form backend:
◉ Google Sheets (free, easy setup)
○ Formspree (50/mo free)
○ Native (no backend, email only)
```

**Social media**:
```
Social profiles:
Facebook: https://facebook.com/yourpage
Instagram: https://instagram.com/yourprofile
LinkedIn: https://linkedin.com/in/yourprofile
```

**Tip**: Choose integrations, complete setup after generation (guided instructions provided).

### Phase 7: Generation (Auto, <1 min)

**Orchestrator runs 7 agents in parallel**:
```
✓ Content Agent: Generating 24 markdown files...
✓ AI Content Agent: Writing 3,500 words...
✓ Theme Agent: Applying colors and typography...
✓ i18n Agent: Creating multilingual menus...
✓ SEO Agent: Adding meta tags and schema...
✓ Asset Agent: Downloading 20 images...
✓ Integration Agent: Configuring services...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ SITE GENERATED! (90% complete)

📊 Stats:
  - 8 pages created
  - 42 sections configured
  - 3,560 words of content
  - 20 images (15 Unsplash, 5 placeholders)
  - 3 integrations connected
  - Build time: 45s

📝 TODO (the 10%):
  1. Replace 5 placeholder images
  2. Review AI-generated content
  3. Add personal bio and credentials

🚀 Next steps:
  $ hugo server              # Preview your site
  $ /refine-site             # Make adjustments
  $ /add-images              # Upload images
  $ /review-ai-content       # Review AI text

📁 Files location:
  Content: content/
  Config: config/_default/
  Images: static/images/

Want to preview now? [Y/n]:
```

**Tip**: Say yes to preview. You'll see your site immediately!

---

## Post-Wizard Refinement

### 1. Review AI Content

```bash
/review-ai-content
```

Walk through each AI-generated section. Options:
- **Keep as-is** (quality is good)
- **Edit** (add personal touch)
- **Regenerate** (try again)

**Priority sections to personalize**:
1. About bio (add your story)
2. Credentials (add certifications)
3. Pricing (add actual prices)
4. Testimonials (add real testimonials)

**Time**: 30-60 minutes

### 2. Upload Images

```bash
/add-images
```

Replace placeholders with your photos:
- **Hero images** (5 needed): Office, therapy room, etc.
- **Team photos** (3 needed): Professional headshots
- **Service images** (optional): Illustrate your services

**Tip**: Use `/add-images hero` for guided upload.

**Time**: 15-30 minutes

### 3. Complete Integration Setup

```bash
/refine-site integrations
```

Add API keys and credentials:
1. **Calendly**: Add your username
2. **Analytics**: Add domain/tracking ID
3. **Contact form**: Complete setup steps

Follow detailed instructions in `.wizard/generated-*/integration-setup.md`.

**Time**: 20-40 minutes

### 4. Final Refinements

```bash
/refine-site
```

Fine-tune:
- **Design**: Adjust colors, fonts
- **Structure**: Add/remove pages
- **Content**: Edit any section

**Time**: 30-60 minutes

---

## Blueprint Details

### Psychology Practice Blueprint

**Target audience**: Individuals seeking therapy, couples, families

**Tone**: Empathetic, warm, professional, non-judgmental

**Key features**:
- Focus on confidentiality and trust
- Warm color palette (greens, terracotta)
- Emphasis on process and benefits
- FAQ addressing common concerns
- Booking integration (essential)

**Content included**:
- Service descriptions (individual, couples, family therapy)
- Process explanations (what to expect)
- Benefits lists (why therapy helps)
- FAQ (28 common questions)
- Credentials section (personalize)

**Recommended customizations**:
1. Add your photo and bio
2. Add specific therapeutic approaches (CBT, EMDR, etc.)
3. Add real testimonials (with permission)
4. Add pricing (transparent builds trust)
5. Add insurance information (if applicable)

### Law Firm Blueprint

**Target audience**: Individuals/businesses needing legal services

**Tone**: Authoritative, professional, trustworthy, results-oriented

**Key features**:
- Professional color palette (navy, gold)
- Focus on expertise and results
- Case studies and credentials prominent
- Multiple practice areas
- Team profiles

**Content included**:
- Practice area descriptions
- Attorney bios (personalize)
- Firm history and values
- Case results (add real results)
- Legal process explanations

**Recommended customizations**:
1. Add attorney photos and detailed bios
2. Add real case results (anonymized)
3. Add client testimonials
4. Add bar associations and certifications
5. Add FAQ for each practice area

### Consulting Business Blueprint

**Target audience**: Businesses seeking strategic guidance

**Tone**: Expert, strategic, results-driven, data-informed

**Key features**:
- Modern, corporate design
- Focus on methodology and ROI
- Case studies prominent
- Industry expertise showcased
- Blog/resources section

**Content included**:
- Service descriptions (strategy, operations, digital transformation)
- Methodology explanations
- Case study templates
- About expertise and team
- Contact and consultation booking

**Recommended customizations**:
1. Add real case studies (with results)
2. Add team member bios and expertise
3. Add client logos (with permission)
4. Add blog posts or resources
5. Add pricing or consultation process

---

## Customization Guide

### Change Colors

```bash
/refine-site design
# Choose: 1. Change colors
# Enter hex codes or choose preset
```

**Color psychology**:
- **Blue**: Trust, professionalism (law, corporate)
- **Green**: Growth, health (therapy, wellness)
- **Purple**: Creativity, wisdom (coaching, consulting)
- **Orange**: Energy, enthusiasm (sports, events)

### Add New Page

```bash
/refine-site structure
# Choose: a) Add new page
# Enter page details
# Select sections
```

**Common pages to add**:
- Blog/Resources
- Testimonials page
- FAQ page
- Pricing page
- Team page
- Portfolio/Case studies

### Change Typography

```bash
/refine-site design
# Choose: 2. Change typography
# Select preset or custom
```

**Font combinations**:
- **Classic**: Poppins + Open Sans (versatile)
- **Editorial**: Playfair + Lato (elegant)
- **Modern**: Inter + Roboto (clean)
- **Friendly**: Nunito + Lato (approachable)

---

## Integration Setup

### Calendly Setup (Booking)

1. **Create account**: https://calendly.com
2. **Set availability**: Configure your schedule
3. **Get username**: From your Calendly URL
4. **Add to site**:
   ```bash
   /refine-site integrations
   # Select Calendly
   # Enter username
   ```
5. **Test**: Visit contact page, click booking button

### Plausible Setup (Analytics)

1. **Create account**: https://plausible.io
2. **Add website**: Enter your domain
3. **Add to site**:
   ```bash
   /refine-site integrations
   # Select Plausible
   # Enter domain
   ```
4. **Verify**: Check Plausible dashboard after deployment

### Google Sheets Form Backend

1. **Create spreadsheet**: Google Sheets
2. **Add Apps Script**: Extensions > Apps Script
3. **Deploy**: Deploy as web app
4. **Add to site**:
   ```bash
   /refine-site integrations
   # Select Google Sheets
   # Enter script URL
   ```
5. **Test**: Submit test message, check spreadsheet

Detailed instructions: `.wizard/generated-*/integration-setup.md`

---

## Troubleshooting

### Hugo Build Fails

**Problem**: `hugo` command errors

**Solutions**:
1. Check Hugo version: `hugo version` (need Extended v0.148.1+)
2. Check for syntax errors in frontmatter
3. Run `hugo --verbose` for detailed errors
4. Check `.wizard/generated-*/logs/errors.log`

### Images Not Displaying

**Problem**: Images show broken links

**Solutions**:
1. Check file paths in content files
2. Verify images exist in `static/images/`
3. Check image file extensions match references
4. Clear browser cache (`Ctrl+Shift+R`)

### Calendly Widget Not Loading

**Problem**: Booking button doesn't work

**Solutions**:
1. Verify Calendly username in config
2. Check browser console for errors
3. Disable ad blockers (temporarily)
4. Test Calendly link directly: `https://calendly.com/your-username`

### Analytics Not Tracking

**Problem**: No visits showing in analytics

**Solutions**:
1. Wait 1-2 hours for data to appear
2. Verify domain in analytics config
3. Check if script is loaded (view page source)
4. Test in incognito mode (no ad blockers)

### Form Submissions Not Working

**Problem**: Contact form doesn't send messages

**Solutions**:
1. Check form backend URL in config
2. Test form backend directly (Postman, curl)
3. Check browser console for CORS errors
4. Verify Google Sheets script permissions

### Multilingual Links Broken

**Problem**: Language switcher doesn't work

**Solutions**:
1. Verify `translationKey` is same across languages
2. Check all languages have same page structure
3. Verify menu configs exist for each language
4. Clear Hugo cache: `hugo --gc`

---

## FAQ

**Q: How long does generation take?**
A: 10 minutes wizard + <1 minute generation = ~11 minutes total.

**Q: Can I change the blueprint after generation?**
A: Yes, but easier to regenerate. Use `/refine-site` for small changes.

**Q: Do I need to know Hugo?**
A: No. The wizard generates everything. Hugo knowledge helps for advanced customization.

**Q: Can I use my own images instead of Unsplash?**
A: Yes. Use `/add-images` to upload your own.

**Q: Is the AI-generated content good quality?**
A: Yes, professional and grammatically correct. Personalize for authenticity.

**Q: Can I add more languages later?**
A: Yes, with `/refine-site structure`. Manual translation needed.

**Q: How do I deploy the site?**
A: Deploy to Netlify, Vercel, or GitHub Pages. Free hosting available.

**Q: Can I customize the design further?**
A: Yes. Edit SCSS files in `assets/scss/` or use `/refine-site design`.

**Q: What if I need a different industry?**
A: Request new blueprint or customize existing one.

**Q: Is the generated site SEO-friendly?**
A: Yes. Meta tags, schema.org markup, and sitemap included.

---

## Next Steps

1. **Generate your site**: `/create-site`
2. **Preview locally**: `hugo server`
3. **Personalize content**: `/review-ai-content`
4. **Upload images**: `/add-images`
5. **Complete integrations**: Follow setup guides
6. **Deploy**: Push to GitHub, deploy on Netlify/Vercel
7. **Launch**: Share with the world! 🚀

---

## Support

**Documentation**: `dev/active/site-builder-wizard/OVERVIEW.md`
**Architecture**: `dev/active/site-builder-wizard/CONTEXT.md`
**Progress**: `dev/active/site-builder-wizard/PROGRESS.md`
**Logs**: `.wizard/generated-*/logs/`

**Need help?** Check troubleshooting section or review generated TODO list.

---

## Version History

- **v2.0.0** (2025-11-14): Complete system with 6 agents, 4 refinement commands, 3 blueprints
- **v1.0.0** (2025-11-14): Initial wizard infrastructure and core agents

---

**Made with ❤️ using Claude Code**
