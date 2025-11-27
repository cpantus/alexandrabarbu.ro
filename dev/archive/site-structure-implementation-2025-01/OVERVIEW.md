# Site Structure Implementation - Complete Content Architecture

**Project**: Alexandra Barbu Psychology Practice - Full Site Structure
**Date Started**: 2025-11-20
**Status**: 🟡 Planning Complete, Ready for Implementation
**Priority**: High
**Estimated Time**: 10-13 hours

---

## Problem Statement

### The Gap

The 2025 technical refactor (Phases 1-9, ~10 hours) completed a comprehensive component architecture modernization but did NOT implement the required site structure and page layouts.

**What Was Done** (Technical Refactor):
- ✅ 66 components refactored with BEM + ITCSS architecture
- ✅ Design system modernization (Crimson Pro + Work Sans typography)
- ✅ Design tokens, unified variants, 8pt spacing grid
- ✅ Build optimization (<3s builds, 477ms cached)
- ✅ 8 archetypes created for quick page generation

**What Was NOT Done** (Content Structure):
- ❌ Specific page layouts with exact section sequences
- ❌ Complete content for all sections
- ❌ Navigation structure matching requirements
- ❌ Information architecture implementation

**Result**: User sees "old layout" because content files weren't updated to use the refactored components in the required combinations and sequences.

### Why This Happened

**Scope Changed During Execution:**
- Originally planned: "Phase 5: Section Creation (34 sections for site structure)"
- Actually executed: "Phase 5: Section Refactoring (26 active sections)"
- Work shifted from creating content architecture → refactoring technical components
- Time constraints: 10 hours only covered technical infrastructure

**Different Work Types:**
- Technical refactor = Component architecture, design system, build infrastructure
- Content implementation = Page layouts, section sequences, content filling, information architecture

These are two separate projects that should have been done sequentially, not simultaneously.

---

## Vision & Goals

### Primary Goal

Implement the complete site architecture with all required pages, sections, and navigation structure using the refactored component foundation.

### Success Criteria

- [ ] All 11 pages accessible and rendering correctly
- [ ] All required sections implemented and functional
- [ ] Navigation structure matches specification
- [ ] Both languages (Romanian root + English `/en/`) complete with full parity
- [ ] Hugo build succeeds with no errors
- [ ] All pages responsive on mobile/tablet/desktop
- [ ] Placeholder content in place for all sections
- [ ] Documentation updated to reflect new structure
- [ ] Build performance maintained (<3s cached)

### User Expectations

User expected a complete, modern psychology practice website with:
- Professional, trust-building design
- Clear information architecture
- Easy navigation
- Complete content structure ready for content filling
- Both Romanian (default) and English versions

---

## Scope Definition

### In Scope

**Pages to Implement** (11 total):
1. Homepage (Română: `/` | English: `/en/`)
2. About (Română: `/despre-mine/` | English: `/en/about/`)
3. Services Main (Română: `/servicii/` | English: `/en/services/`)
4. Service 1: Individual Therapy (Română: `/servicii/terapie-individuala/` | English: `/en/services/individual-therapy/`)
5. Service 2: Couple Therapy (Română: `/servicii/terapie-cuplu/` | English: `/en/services/couple-therapy/`)
6. Service 3: Family Therapy (Română: `/servicii/terapie-familie/` | English: `/en/services/family-therapy/`)
7. Service 4: Organizational Psychology (Română: `/servicii/psihologie-organizationala/` | English: `/en/services/organizational-psychology/`)
8. Approach (Română: `/abordare/` | English: `/en/approach/`)
9. Resources (Română: `/resurse/` | English: `/en/resources/`)
10. Contact (Română: `/contact/` | English: `/en/contact/`)
11. Legal (Română: `/termeni-si-conditii/` | English: `/en/terms-and-conditions/`)

**New Section Components to Create** (8-10):
- services-preview (4-service grid with CTAs)
- about-preview (therapist introduction with credentials)
- approach-preview (4 core principles)
- simple-process (3-step timeline)
- my-story (narrative section with photos)
- training-certifications (education timeline)
- therapeutic-process (detailed process timeline for services)
- methods-used (therapy methods accordion/tabs)
- benefits-results (therapy benefits list)
- pricing-packages (service-specific pricing tables)

**Navigation Structure**:
```
Acasă / Home
Despre / About
Servicii / Services
  ├── Terapie Individuală / Individual Therapy
  ├── Terapie de Cuplu / Couple Therapy
  ├── Terapie de Familie / Family Therapy
  └── Psihologie Organizațională / Organizational Psychology
Abordare / Approach
Resurse / Resources
Contact
```

**Content Approach**:
- Placeholder/lorem ipsum content initially
- Proper front matter structure configured
- Ready for user to fill in real content later

### Out of Scope

- Actual content writing (user will provide)
- Image sourcing/creation
- Blog/article content
- Real testimonials
- Specific credentials/certifications
- Workshop/event scheduling
- Advanced features (booking systems, payment processing, etc.)
- SEO optimization
- Analytics integration

---

## Current State Analysis

### Existing Infrastructure (Ready to Use)

**Components Available** (66 total):
- 9 atoms (button, heading, icon, image, tag, divider, link, spinner, avatar)
- 29 molecules (card, form-field, accordion, navigation, etc.)
- 2 organisms (header, footer)
- 26 sections (hero-breadcrumb, values-compass, feature-blocks, stats-numbers, etc.)

**Architecture Foundation**:
- ✅ BEM + ITCSS CSS architecture
- ✅ Design token system (colors, typography, spacing, motion, shadows, gradients)
- ✅ 8 unified color variants (primary, secondary, tertiary, success, warning, error, info, neutral)
- ✅ Responsive behavior (4 breakpoints: sm/md/lg/xl)
- ✅ Accessibility compliance (WCAG AA)
- ✅ Multilingual support (RO default + EN)

**Build Infrastructure**:
- ✅ Hugo v0.152.2 extended
- ✅ SCSS compilation
- ✅ JavaScript bundling
- ✅ Performance optimization
- ✅ Build time: 477ms cached, 8.36s full

### Current Content Structure

**Homepage** (`content/romanian/_index.md`):
- Has: 10 sections defined BUT wrong structure
- Current: credentials-showcase, problem-empathy, feature-blocks, values-intro, values-compass, credentials-showcase (duplicate), video-popup, faq-mini, contact-form-enhanced
- Required: hero-breadcrumb, problem-empathy, services-preview, about-preview, approach-preview, testimonials-enhanced, simple-process, faq-mini, cta-standard

**About Page** (`content/romanian/despre-mine.md`):
- Has: 3 sections (hero-breadcrumb, values-intro, stats-numbers)
- Required: 8 sections (hero-breadcrumb, my-story, training-certifications, values-compass, stats-numbers, approach-preview, cta-standard)

**Service Pages** (`content/romanian/servicii/terapie-individuala.md`):
- Has: 3 sections defined
- Required: 12 sections per service page

**Missing Pages**:
- Services main page
- Couple therapy page
- Family therapy page
- Organizational psychology page
- Approach page
- Resources page
- Contact page (may exist but needs verification)
- Legal/terms page

### Missing Components

**Sections That Don't Exist**:
1. services-preview (card grid for services)
2. about-preview (therapist intro section)
3. approach-preview (principles preview)
4. simple-process (3-step timeline)
5. my-story (narrative section)
6. training-certifications (education timeline)
7. therapeutic-process (detailed service process)
8. methods-used (therapy methods)
9. benefits-results (outcome expectations)
10. pricing-packages (service-specific pricing)

**Navigation**:
- Menu structure needs update to match requirements
- Service submenu needs creation
- Both RO and EN menus need configuration

---

## Technical Approach

### Architecture Principles

1. **Component Reuse**: Use existing 66 refactored components wherever possible
2. **BEM Naming**: All new sections follow `.c-block__element--modifier` structure
3. **Design Tokens Only**: No magic numbers, all values from token system
4. **Data-Driven**: All sections read from front matter (no hardcoded content)
5. **Null-Safe**: Graceful degradation when data missing
6. **Responsive**: Mobile-first, 4 breakpoints
7. **Accessible**: WCAG AA compliance, semantic HTML, ARIA labels
8. **Multilingual**: Full RO + EN parity

### File Structure

```
layouts/partials/sections/
├── (existing 26 sections)
├── services-preview.html         # NEW
├── about-preview.html            # NEW
├── approach-preview.html         # NEW
├── simple-process.html           # NEW
├── my-story.html                 # NEW
├── training-certifications.html  # NEW
├── therapeutic-process.html      # NEW
├── methods-used.html             # NEW
├── benefits-results.html         # NEW
└── pricing-packages.html         # NEW

content/
├── romanian/                     # DEFAULT (root path /)
│   ├── _index.md                # Homepage
│   ├── despre-mine.md           # About
│   ├── servicii/
│   │   ├── _index.md           # Services main
│   │   ├── terapie-individuala.md
│   │   ├── terapie-cuplu.md
│   │   ├── terapie-familie.md
│   │   └── psihologie-organizationala.md
│   ├── abordare.md             # Approach
│   ├── resurse.md              # Resources
│   ├── contact.md              # Contact
│   └── termeni-si-conditii.md  # Legal
│
└── english/                      # ENGLISH (path /en/)
    ├── _index.md
    ├── about.md
    ├── services/
    │   ├── _index.md
    │   ├── individual-therapy.md
    │   ├── couple-therapy.md
    │   ├── family-therapy.md
    │   └── organizational-psychology.md
    ├── approach.md
    ├── resources.md
    ├── contact.md
    └── terms-and-conditions.md

config/_default/
├── menus.ro.toml               # Romanian navigation (UPDATE)
└── menus.en.toml               # English navigation (UPDATE)
```

### Quality Standards

**Code Standards**:
- Sections: < 80 lines each
- Indentation: 2 spaces
- Whitespace: Use `{{- -}}` for clean output
- Null safety: Always check `if $var`

**Performance Targets**:
- Build time: < 3s full, < 500ms cached (maintain current performance)
- Page size: < 520KB
- No console errors
- No build warnings (except acceptable content-level warnings)

**Testing Checklist**:
- [ ] Both languages (RO root, EN `/en/`)
- [ ] Responsive (375px, 768px, 1200px)
- [ ] No console errors
- [ ] Build succeeds (`hugo --gc --minify`)
- [ ] Images load with alt text
- [ ] Links functional
- [ ] Navigation works
- [ ] All sections render

---

## Dependencies & Prerequisites

### Required Knowledge
- Hugo templating (Go templates)
- YAML front matter syntax
- BEM CSS methodology
- ITCSS architecture (for any SCSS changes needed)
- Multilingual Hugo configuration

### Existing Documentation
- `CLAUDE.md` - Theme usage instructions, component API
- `ARCHITECTURE.md` - Technical architecture details
- `REFACTOR-2025-SUMMARY.md` - What the refactor accomplished
- `dev/active/theme-design-refactor-2025-01/` - Refactor dev docs

### Tools Needed
- Hugo v0.152.2 extended (installed)
- Modern CLI tools: rg, fd, bat, exa (available)
- Text editor

---

## Risks & Mitigation

### Risk 1: Section Component Complexity
**Risk**: New sections might become too complex (>80 lines)
**Mitigation**: Break into smaller molecules if needed, compose from atoms
**Impact**: Medium

### Risk 2: Performance Regression
**Risk**: Adding 10 new sections could slow build time
**Mitigation**: Use `partialCached` where appropriate, maintain <80 line limit
**Impact**: Low

### Risk 3: Language Parity Issues
**Risk**: Romanian and English content might diverge
**Mitigation**: Create both language files simultaneously, use checklists
**Impact**: Medium

### Risk 4: Navigation Complexity
**Risk**: Service submenu might not render correctly
**Mitigation**: Test navigation after each page creation, verify in both languages
**Impact**: Low

### Risk 5: Content Structure Mismatch
**Risk**: Front matter might not match section template expectations
**Mitigation**: Create detailed front matter templates, test each section
**Impact**: Medium

---

## Timeline Estimate

### Detailed Breakdown

**Phase 1: New Section Components** (2-3 hours)
- Create 10 new section HTML templates
- Test each section with placeholder data
- Verify BEM structure and responsiveness

**Phase 2: Homepage Implementation** (1 hour)
- Update RO + EN `_index.md` with 10-section structure
- Configure front matter for all sections
- Test rendering

**Phase 3: About Page** (0.5-1 hour)
- Update RO + EN about pages with 8 sections
- Test rendering

**Phase 4: Services Pages** (2-3 hours)
- Create main services page (RO + EN)
- Create 4 individual service pages (RO + EN) with 12 sections each
- Test all service pages

**Phase 5: Approach Page** (1 hour)
- Create RO + EN approach pages with 9 sections
- Test rendering

**Phase 6: Resources Page** (1-1.5 hours)
- Create RO + EN resources pages with 10 sections
- Test rendering

**Phase 7: Contact Page** (1 hour)
- Create RO + EN contact pages with 9 sections
- Test rendering

**Phase 8: Navigation Updates** (0.5 hour)
- Update menus.ro.toml and menus.en.toml
- Test navigation in both languages

**Phase 9: Testing & QA** (1 hour)
- Full site testing
- Build verification
- Responsive testing
- Language parity verification
- Documentation updates

**Total**: 10-13 hours

---

## Next Steps

### Immediate Actions

1. **Review this documentation** with stakeholder
2. **Confirm approach** (create new sections vs. adapt existing)
3. **Confirm content strategy** (placeholder vs. real content)
4. **Set up dev environment** (hugo server running)
5. **Begin Phase 1**: Create new section components

### Phase 1 Starting Point

First section to create: `services-preview.html`
- Card grid layout (4 services)
- Each card: icon, title, short description, CTA button
- Responsive: 1 col mobile, 2 col tablet, 4 col desktop
- Data from front matter: `services_preview.services[]`

---

## Notes & Constraints

### Critical Constraints

1. **Romanian is default**: Root path is Romanian, English is `/en/`
2. **Maintain build performance**: Don't regress <3s build time
3. **Preserve refactored architecture**: Don't break BEM + ITCSS structure
4. **No component duplication**: Reuse existing molecules and atoms
5. **Quality over speed**: Better to take time and do it right

### Important Context

- This is NOT a refactor; it's new implementation using refactored foundation
- Components are ready and modern; we're building the house, not the tools
- User will fill real content later; focus on structure and placeholders
- Both languages must maintain exact parity throughout

---

**Status**: Ready for implementation
**Next Session**: Start with Phase 1 (section component creation)
**Contact**: Review PROGRESS.md for phase-by-phase tracking
