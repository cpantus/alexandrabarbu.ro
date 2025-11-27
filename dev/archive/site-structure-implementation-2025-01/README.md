# Site Structure Implementation - Dev Docs

**Location**: `dev/active/site-structure-implementation-2025-01/`
**Status**: Planning Complete, Ready for Implementation
**Created**: 2025-11-20

---

## Quick Start (New Session)

When resuming this project in a new session:

1. **Read OVERVIEW.md first** - Understand the problem, vision, and approach
2. **Check PROGRESS.md** - See what phase you're on and what's been completed
3. **Reference CONTEXT.md** - Detailed specifications for all page layouts
4. **Review DECISIONS.md** - Key architectural and implementation decisions

---

## File Guide

### OVERVIEW.md
**Purpose**: High-level project summary and approach
**Contains**:
- Problem statement (why site structure wasn't implemented during refactor)
- Vision & goals
- Scope definition (11 pages, 10 new sections)
- Current state analysis
- Technical approach
- Timeline estimate (10-13 hours)
- Risks & dependencies

**Read this**: For project context and big picture

---

### PROGRESS.md
**Purpose**: Phase-by-phase implementation tracking
**Contains**:
- Overall status dashboard
- 10 phases with detailed task breakdowns
- Checklists for each phase
- Time tracking
- Testing requirements

**Read this**: To know what to work on next

---

### DECISIONS.md
**Purpose**: Record of key decisions and rationale
**Contains**:
- 10 major decisions made during planning
- Options considered
- Rationale and implications
- Decision summary table

**Read this**: To understand why certain approaches were chosen

---

### CONTEXT.md
**Purpose**: Comprehensive requirements reference
**Contains**:
- Complete site architecture
- Detailed page layouts for all 11 pages
- Section-by-section specifications
- Content requirements
- Technical standards

**Read this**: As definitive reference during implementation

---

## Project Summary

### The Gap

The 2025 refactor completed technical architecture (BEM + ITCSS, design system, 66 components) but did NOT implement the required site structure and page layouts.

**What exists**: Modern, refactored component foundation (atoms, molecules, organisms, sections)
**What's missing**: Actual page structures with correct section sequences and content

### The Solution

Implement complete site architecture:
- **11 pages** (Homepage, About, Services main + 4 services, Approach, Resources, Contact, Legal)
- **10 new sections** (services-preview, about-preview, approach-preview, simple-process, my-story, training-certifications, therapeutic-process, methods-used, benefits-results, pricing-packages)
- **Navigation** structure with service submenu
- **Both languages** (Romanian default + English `/en/`)
- **Placeholder content** (user fills real content later)

### Implementation Approach

**9 Phases**:
1. Create 10 new section components (2-3h)
2. Homepage implementation (1h)
3. About page (0.5-1h)
4. Services pages (2-3h)
5. Approach page (1h)
6. Resources page (1-1.5h)
7. Contact page (1h)
8. Navigation updates (0.5h)
9. Testing & QA (1h)

**Total**: 10-13 hours

---

## Key Decisions

1. **Create new specialized sections** (vs. adapt existing)
2. **Placeholder content** (user fills later)
3. **Full implementation** (all pages at once)
4. **Romanian as default** (root path), English at `/en/`
5. **BEM naming** for all new sections
6. **Reuse atoms/molecules**, create new sections only

---

## Technical Standards

- **BEM Naming**: `.c-section-name__element--modifier`
- **Design Tokens Only**: No magic numbers
- **Sections**: < 80 lines, data-driven, null-safe
- **Responsive**: Mobile-first, 4 breakpoints
- **Accessible**: WCAG AA compliance
- **Performance**: Maintain <3s builds, <520KB pages

---

## Language Structure (CRITICAL)

**Romanian (Default)**:
- Homepage: `/`
- About: `/despre-mine/`
- Services: `/servicii/`
- etc.

**English**:
- Homepage: `/en/`
- About: `/en/about/`
- Services: `/en/services/`
- etc.

**Full parity required** between languages throughout implementation.

---

## Starting Implementation

### Phase 1: Create New Sections

First section to implement: `services-preview.html`

**Location**: `layouts/partials/sections/services-preview.html`

**Structure**:
```html
{{- $section := .Params.services_preview -}}
{{- if $section -}}
<section class="c-services-preview section">
  <div class="o-container">
    {{ partial "atoms/heading.html" (dict "text" $section.title "level" 2) }}
    <div class="c-services-preview__grid">
      {{- range $section.services -}}
        {{ partial "molecules/card.html" (dict
          "title" .title
          "description" .description
          "icon" .icon
          "variant" "service"
          "cta_text" .cta_text
          "cta_url" .cta_url
        ) }}
      {{- end -}}
    </div>
  </div>
</section>
{{- end -}}
```

**SCSS**: Create `themes/andromeda-hugo/assets/scss/06-components/_services-preview.scss`

**Register**: Add to `layouts/_default/flexible.html` section switch

**Test**: Create test page with front matter, verify rendering

---

## Testing Strategy

- **Incremental**: Test after each section/page creation
- **Languages**: Always test both RO + EN
- **Responsive**: Test at 375px, 768px, 1200px
- **Build**: Run `hugo --gc --minify` after each phase
- **Comprehensive QA**: Phase 9 full site testing

---

## Documentation Updates

After implementation complete (Phase 9):
- Update `CLAUDE.md` with new sections list
- Update `ARCHITECTURE.md` with component inventory
- Update `README.md` with site structure
- Update `PROGRESS.md` with completion status

---

## Questions?

Refer to specific doc files:
- **What's the big picture?** → OVERVIEW.md
- **What do I work on next?** → PROGRESS.md
- **Why was this decision made?** → DECISIONS.md
- **What are the exact requirements?** → CONTEXT.md

---

## Success Criteria

- [ ] All 11 pages accessible and rendering
- [ ] All required sections implemented
- [ ] Navigation structure matches spec
- [ ] Both languages (RO + EN) complete with parity
- [ ] Hugo build succeeds with no errors
- [ ] All pages responsive
- [ ] Placeholder content in place
- [ ] Documentation updated

---

**Ready to begin?** Start with Phase 1 in PROGRESS.md

**Last Updated**: 2025-11-20
