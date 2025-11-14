# Site Builder Wizard - Context & Background

**Created**: 2025-11-14
**Purpose**: Additional context for this task

---

## User Requirements

The user wants a comprehensive wizard (`create-site wizard`) that:

1. **Generates beautiful Hugo sites in ~10 minutes**
2. **Supports multiple industries** (not just psychology)
3. **Multi-language with default selection** (RO, EN, FR with default choice impacts generation)
4. **Smart image curation** from Unsplash and other free sources
5. **Branding customization** via config:
   - Client logo upload
   - Typography selection (Google Fonts)
   - Color scheme (hex codes)
6. **90% complete** after generation, 10% manual polish

---

## Original Wizard Design

The user provided a detailed 7-phase wizard design:

### Phase 1: Quick Start (30 seconds)
- Site name, industry, primary goal
- **Languages with default selection** (NEW requirement)
- Existing content status
- Loads industry blueprint

### Phase 2: Menu Structure (2 minutes)
- Suggest menu based on industry
- Allow submenu creation
- Add custom pages
- Final menu review

### Phase 3: Page Customization (5 minutes)
- For each page, choose detail level (Quick/Customize/Skip)
- Select sections from library
- Reorder sections
- Configure section parameters

### Phase 4: Design & Feel (2 minutes)
- Color scheme presets or custom (hex codes)
- Typography pairings
- Animation intensity
- Photography style

### Phase 5: Content Generation (1 minute)
- Choose content approach (placeholders/AI/import/mix)
- Select what AI generates
- Image handling
- SEO setup

### Phase 6: Integrations (1 minute)
- Booking system (Calendly, Cal.com, etc.)
- Contact form setup
- Analytics (Google Analytics, Plausible)
- Social media links

### Phase 7: Site Generation (automatic)
- Launch 7-8 agents in parallel
- Generate content files
- Apply theme configuration
- Create multilingual structure
- Optimize images
- Setup SEO
- Display stats and TODOs

---

## Agent Architecture (Behind the Scenes)

```
User Wizard Input
    ↓
Wizard Parser → JSON config (wizard-state.json)
    ↓
Agent Orchestrator
    ├─→ Content Agent (creates .md files with sections)
    ├─→ AI Agent (generates copy for selected sections)
    ├─→ Theme Agent (applies colors, fonts, animations)
    ├─→ Integration Agent (sets up Calendly, analytics, etc.)
    ├─→ i18n Agent (creates multilingual structure)
    ├─→ SEO Agent (meta tags, schema, sitemap)
    ├─→ Asset Agent (images, placeholders, optimization)
    └─→ Image Agent (Unsplash curation and download)
    ↓
Site Generated (90% ready)
    ↓
Refinement commands available:
    - refine-site (adjust anything)
    - add-images (guided image upload)
    - review-ai-content (edit AI sections)
    - edit-content (section-by-section editor)
```

---

## Integration with Existing Theme

### Andromeda Hugo Theme
- **Current state**: Atomic design refactor in progress (see `refactor-atomic-design/`)
- **Flexible layout system**: 16+ sections available
- **Multilingual**: RO/EN/FR support
- **Performance targets**: <3s build, <500KB pages

### Section Library
Available sections for page composition:
- `hero-cta`, `hero-breadcrumb`
- `values-intro`, `benefits-grid`, `feature-blocks`
- `services-overview`, `pricing-tables`
- `testimonials`, `faq-mini`, `contact-form-enhanced`
- `video-popup`, `image-gallery`
- `team-intro`, `office-tour`
- And more...

### Atomic Components (In Development)
- **Atoms**: button, heading, input, icon, image
- **Molecules**: card, form-field, nav-item, breadcrumb
- **Organisms**: header, footer

The wizard will leverage these components for generated content.

---

## Technical Constraints

### Hugo Environment
- Hugo Extended v0.148.1+
- Working directory: `/home/user/alexandrabarbu.ro`
- Git branch: `claude/implement-wizard-017FSnmmZoKrQ9Zi3J26YGhk`
- Theme path: `themes/andromeda-hugo/`

### Claude Code Infrastructure
- Commands location: `.claude/commands/infra/`
- Agents location: `.claude/agents/site-builder/`
- Patterns location: `.claude/patterns/site_generation/`
- Data location: `.claude/data/blueprints/`

### External Dependencies
- **Unsplash API**: Requires API key (free tier: 50 req/hour)
- **Google Fonts API**: Public, no key required
- **Hugo**: Already installed
- **Modern CLI tools**: fd, rg, bat, jq, yq (already available)

---

## Design Philosophy

### The "Magic" Factor
What makes this wizard feel magical:
1. **Smart defaults** - Pre-selected based on industry
2. **Progressive disclosure** - Only show complexity when needed
3. **Visual feedback** - Progress bars, checkmarks, previews
4. **Speed** - Each phase <2 minutes
5. **Intelligence** - Learns from choices (e.g., industry → color scheme)
6. **Polish** - 90% done in wizard, not 50%

### The 90/10 Rule
**Wizard generates (90%)**:
- Complete content structure (all pages, sections)
- AI-generated copy for generic sections
- Placeholder images (with correct sizes)
- Full theme configuration
- Multilingual structure
- SEO basics
- Integration setup

**User polishes (10%)**:
- Personal content (bio, credentials)
- Replace placeholder images with real ones
- Review/edit AI-generated content
- Add real testimonials
- Fine-tune colors/fonts
- Test integrations

---

## Industry Blueprint Examples

### Psychology Practice
- **Pages**: Home, About, Services(4), Pricing, FAQ, Contact
- **Colors**: Warm & Therapeutic (emerald + terracotta)
- **Typography**: Classic (Poppins + Open Sans)
- **Animations**: Subtle (trust-building)
- **Images**: Authentic, warm, connection-focused
- **Sections**: Heavy on testimonials, FAQs, trust-building
- **Integrations**: Calendly (priority), Google Analytics

### Law Firm
- **Pages**: Home, About, Practice Areas(6), Team, Case Results, Blog, Contact
- **Colors**: Professional (navy + gold)
- **Typography**: Editorial (Playfair + Lato)
- **Animations**: Moderate (professional confidence)
- **Images**: Professional, clean, authority
- **Sections**: Heavy on credentials, results, team
- **Integrations**: Contact forms (priority), newsletter

### Consulting
- **Pages**: Home, About, Services(3), Process, Resources, Blog, Contact
- **Colors**: Modern & Vibrant (blue + orange)
- **Typography**: Modern (Inter + Work Sans)
- **Animations**: Bold (dynamic, innovative)
- **Images**: Business, strategy, growth
- **Sections**: Heavy on process, results, thought leadership
- **Integrations**: Newsletter (priority), analytics, social proof

---

## Key Modifications from Original Design

### 1. Default Language Selection (NEW)
**Original**: Select languages (RO, EN, FR)
**Modified**: Select languages + default
```
Languages: [RO, EN, FR] → RO, EN
→ Default language: [RO/EN] → RO
```
**Impact**:
- Default language used for AI content generation
- URL structure (e.g., `/` vs `/en/`)
- Content fallback order

### 2. Logo Customization (NEW)
**Added to Phase 4**:
- Upload logo file (SVG, PNG)
- Auto-generate variants (favicon, social share)
- Output to `static/images/logo/`

### 3. Color Code Input (ENHANCED)
**Original**: Presets only
**Modified**: Presets + custom hex codes
```
Custom colors:
  Primary: #4DB380
  Secondary: #CC6B49
  Accent: #F4A460
```

### 4. Typography via Config (ENHANCED)
**Original**: Presets only
**Modified**: Google Fonts integration
```
Heading font: [Browse Google Fonts] → Poppins
Body font: [Browse Google Fonts] → Open Sans
```
**Output**: Updates `config/_default/params.yaml`

### 5. Image Source Help (NEW)
**Added to Phase 5**:
- Unsplash integration (search, preview, select)
- Show curated collections per industry
- Interactive CLI picker
- Auto-download option

---

## File Outputs

### Content Files
```
content/
├── _index.ro.md              # Home (default language)
├── _index.en.md              # Home (English)
├── about/
│   ├── _index.ro.md
│   └── _index.en.md
├── services/
│   ├── individual-therapy/
│   │   ├── _index.ro.md
│   │   └── _index.en.md
│   └── ... (more services)
└── ... (more pages)
```

Each content file has:
- Front matter with `layout: "flexible"`
- `sections` array with configured sections
- Multilingual metadata
- SEO metadata

### Config Files
```
config/
└── _default/
    ├── params.yaml           # Updated with branding
    ├── languages.yaml        # Multilingual config
    └── menus.yaml            # Generated menu structure
```

### Static Assets
```
static/
├── images/
│   ├── logo/
│   │   ├── logo.svg          # Uploaded logo
│   │   ├── favicon.ico       # Generated
│   │   └── social-share.png  # Generated
│   └── hero/
│       ├── home-hero.jpg     # Downloaded from Unsplash
│       └── ... (more images)
└── ... (existing assets)
```

### Wizard Artifacts
```
.wizard/
└── generated-2025-11-14-103000/
    ├── wizard-state.json     # Full wizard session state
    ├── blueprint.yaml        # Selected blueprint
    ├── todos.md              # The 10% TODO list
    └── stats.json            # Generation statistics
```

---

## Success Criteria

### Functional
- [ ] Wizard completes in <10 minutes
- [ ] Generates 90% complete site
- [ ] All 7 phases work end-to-end
- [ ] Multi-language support works
- [ ] Logo upload works
- [ ] Color customization works
- [ ] Unsplash integration works
- [ ] AI content generation works
- [ ] Refinement commands work

### Quality
- [ ] Generated content is Hugo-valid
- [ ] Site builds without errors
- [ ] Site passes accessibility checks
- [ ] Images are optimized (WebP, srcset)
- [ ] SEO metadata is complete
- [ ] Multilingual structure is correct

### User Experience
- [ ] Wizard feels "magical"
- [ ] Defaults are smart and sensible
- [ ] Error messages are helpful
- [ ] Progress is visible
- [ ] Final output is impressive

---

## Open Design Questions

### 1. Wizard UX
- **Progress indicator**: Show phase progress or overall progress?
- **Back button**: Support going back or linear only?
- **Save state**: Allow pausing wizard and resuming later?

### 2. Content Generation
- **AI provider**: Use Claude API directly or templates?
- **Content quality**: How much editing should be expected?
- **Language**: Generate in default language only or all selected languages?

### 3. Image Handling
- **Unsplash download**: Auto-download or just links?
- **Image optimization**: Do it during wizard or defer to Hugo?
- **Placeholders**: Use actual placeholders or Unsplash "to-be-replaced"?

### 4. Refinement Flow
- **When**: Immediately after generation or separate session?
- **Granularity**: Page-by-page or section-by-section?
- **Preview**: Live preview or regenerate each time?

---

## References

### Internal Documentation
- `dev/active/refactor-atomic-design/` - Atomic design refactor context
- `themes/andromeda-hugo/REFACTOR-PLAN-v2.md` - Theme refactor plan
- `themes/andromeda-hugo/PROJECT.md` - Theme architecture
- `.claude/CLAUDE.md` - Infrastructure guidelines

### External Resources
- Unsplash API: https://unsplash.com/developers
- Google Fonts API: https://developers.google.com/fonts
- Hugo Multilingual: https://gohugo.io/content-management/multilingual/
- Hugo Image Processing: https://gohugo.io/content-management/image-processing/

---

## Next Steps

1. **Create blueprint schema** - Define YAML structure
2. **Create 3 blueprints** - Psychology, law, consulting
3. **Implement Phase 1** - Quick start with language selection
4. **Build state management** - JSON state persistence
5. **Test basic flow** - Validate wizard UX
