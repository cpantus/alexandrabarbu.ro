# Key Decisions & Rationale

**Project**: Site Structure Implementation
**Date**: 2025-11-20

---

## Decision Log

### Decision 1: Create New Sections vs. Adapt Existing

**Date**: 2025-11-20
**Status**: ✅ Decided
**Decision**: Create new specialized sections

**Options Considered**:
1. **Adapt existing sections** (e.g., use `feature-blocks` for services-preview)
2. **Create new specialized sections** (e.g., dedicated `services-preview` component)
3. **Hybrid approach** (adapt where fits well, create where necessary)

**Chosen**: Option 2 - Create new specialized sections

**Rationale**:
- **Semantic clarity**: `services-preview` is clearer than "feature-blocks that shows services"
- **Maintainability**: Easier to understand codebase when components match their purpose
- **Flexibility**: Service preview has specific requirements (4-card grid, service-specific CTAs) that don't perfectly match feature-blocks
- **Documentation**: New sections match user's original requirements exactly
- **Future-proofing**: If requirements change, specialized sections easier to modify

**Implications**:
- More components to maintain (10 new sections)
- Longer Phase 1 implementation time (2-3 hours)
- Better semantic HTML and clearer intent
- Easier for future developers to understand

**Trade-offs Accepted**:
- Slight increase in codebase size
- More time upfront for implementation
- **Benefit**: Better maintainability and clarity long-term

---

### Decision 2: Placeholder vs. Real Content

**Date**: 2025-11-20
**Status**: ✅ Decided
**Decision**: Use placeholder/lorem ipsum content

**Options Considered**:
1. **Use existing content** from current pages where available
2. **Use placeholder content** (lorem ipsum) throughout
3. **Mix approach**: Structure now, real content incrementally

**Chosen**: Option 2 - Use placeholder content

**Rationale**:
- **User confirmation**: User explicitly chose "Use placeholder content (lorem ipsum)"
- **Clear separation**: Structure implementation separate from content writing
- **Faster delivery**: No waiting for content approval or writing
- **Easier validation**: Focus on structure and functionality, not content quality
- **User control**: User can fill real content at their own pace

**Implications**:
- Site will need content pass after implementation
- Placeholder text must be clearly marked (e.g., "Lorem ipsum...")
- Images should use placeholder services or clear alt text
- User responsible for content writing/sourcing

**Next Steps After Implementation**:
1. User reviews structure and placeholders
2. User provides real content section by section
3. We update content files with real text/images
4. Review and refinement

---

### Decision 3: Full Implementation vs. Phased Approach

**Date**: 2025-11-20
**Status**: ✅ Decided
**Decision**: Full implementation (all pages)

**Options Considered**:
1. **Full implementation**: All 11 pages with complete structure
2. **Priority pages only**: Homepage + About + 1 service page first
3. **One reference page**: Complete homepage, then apply pattern to others

**Chosen**: Option 1 - Full implementation

**Rationale**:
- **User confirmation**: User explicitly chose "Full implementation (all pages)"
- **Complete solution**: Delivers functioning site in one go
- **Consistent quality**: All pages done to same standard simultaneously
- **Easier testing**: Can test navigation and cross-linking immediately
- **No half-finished state**: Site either incomplete or complete, not partially done

**Implications**:
- Longer single session (10-13 hours total)
- More comprehensive testing required
- All documentation must be updated at once
- Higher upfront time investment

**Benefits**:
- User gets complete site structure
- No follow-up sessions needed for basic structure
- Can immediately start filling content across all pages
- Full navigation and site architecture functional

---

### Decision 4: Language Structure (Romanian Default)

**Date**: 2025-11-20
**Status**: ✅ Decided (Confirmed)
**Decision**: Romanian as default language (root path), English as `/en/`

**Context**:
This is not a new decision but a critical constraint that was reinforced during planning.

**Structure**:
```
Romanian (Default):
- Homepage: /
- About: /despre-mine/
- Services: /servicii/
- etc.

English:
- Homepage: /en/
- About: /en/about/
- Services: /en/services/
- etc.
```

**Rationale**:
- **Target audience**: Primary audience is Romanian-speaking
- **Hugo configuration**: Already configured this way
- **SEO**: Romanian content at root benefits local SEO
- **User requirement**: Explicitly stated "Romanian is default"

**Critical Implications**:
- All content files must be created in both `content/romanian/` and `content/english/`
- Navigation menus must be maintained in both `menus.ro.toml` and `menus.en.toml`
- URL slugs are different (e.g., `despre-mine` vs. `about`)
- Language switcher must be functional
- Full parity required between languages

**Common Mistakes to Avoid**:
- ❌ Creating `/ro/contact` (should be `/contact`)
- ❌ Using English slugs in Romanian content (should be Romanian slugs)
- ❌ Testing only one language
- ❌ Assuming EN is default

---

### Decision 5: Section Naming Convention

**Date**: 2025-11-20
**Status**: ✅ Decided
**Decision**: Use clear, semantic section names matching purpose

**Naming Examples**:
- `services-preview` (not `feature-blocks-services`)
- `about-preview` (not `therapist-intro`)
- `simple-process` (not `steps-timeline`)
- `therapeutic-process` (not `service-process`)

**Rationale**:
- **Clarity**: Names match their exact purpose
- **Searchability**: Easy to find right section when editing
- **Documentation**: Names match user's original requirements
- **Consistency**: Following BEM naming (`.c-section-name`)

**BEM CSS Classes**:
```css
.c-services-preview { }
.c-services-preview__grid { }
.c-services-preview__card { }
.c-services-preview__card--featured { }
```

---

### Decision 6: Component Reuse Strategy

**Date**: 2025-11-20
**Status**: ✅ Decided
**Decision**: Reuse existing atoms and molecules, create new sections

**Strategy**:
- **Reuse**: All 9 atoms (button, heading, icon, etc.)
- **Reuse**: Relevant molecules (card, accordion, form-field, etc.)
- **Create New**: Section-level components only (10 new sections)

**Example**:
```html
<!-- services-preview.html -->
<section class="c-services-preview">
  <div class="o-container">
    {{ partial "atoms/heading.html" (dict "text" $title "level" 2) }}
    <div class="c-services-preview__grid">
      {{- range $services -}}
        {{ partial "molecules/card.html" (dict
          "title" .title
          "description" .description
          "variant" "service"
        ) }}
      {{- end -}}
    </div>
  </div>
</section>
```

**Benefits**:
- Consistent design system usage
- Less code duplication
- Faster implementation
- Proven, tested components

---

### Decision 7: Testing Approach

**Date**: 2025-11-20
**Status**: ✅ Decided
**Decision**: Test each phase incrementally, final comprehensive QA at Phase 9

**Testing Strategy**:
1. **Phase 1**: Test each new section as created
2. **Phases 2-7**: Test page rendering after each page update
3. **Phase 8**: Test navigation after menu updates
4. **Phase 9**: Comprehensive full-site QA

**Tools**:
- Hugo server (`hugo server --buildDrafts`)
- Build verification (`hugo --gc --minify`)
- Manual browser testing (Chrome DevTools)
- Responsive testing (375px, 768px, 1200px)
- Both language testing (RO + EN)

**Quality Gates**:
- Each phase must pass basic tests before moving to next
- Build must succeed with no errors
- Both languages must render correctly
- Responsive behavior must work

---

### Decision 8: Documentation Updates

**Date**: 2025-11-20
**Status**: ✅ Decided
**Decision**: Update documentation in Phase 9 (after implementation complete)

**Files to Update**:
- `CLAUDE.md` - Add new sections to "Available Sections" list
- `ARCHITECTURE.md` - Update component inventory (26 → 36 sections)
- `README.md` - Document new site structure
- `PROGRESS.md` - Mark phases complete

**Rationale**:
- **Accuracy**: Documentation matches final implementation
- **Efficiency**: One documentation pass vs. multiple updates
- **Completeness**: Can document actual outcomes, not just plans

**Documentation Standards**:
- Clear section descriptions
- Example front matter configurations
- Usage guidelines
- Language considerations

---

### Decision 9: SCSS Approach

**Date**: 2025-11-20
**Status**: ✅ Decided
**Decision**: Create new SCSS files for each new section following ITCSS structure

**File Structure**:
```
themes/andromeda-hugo/assets/scss/06-components/
├── (existing 26 component SCSS files)
├── _services-preview.scss         # NEW
├── _about-preview.scss            # NEW
├── _approach-preview.scss         # NEW
├── _simple-process.scss           # NEW
├── _my-story.scss                 # NEW
├── _training-certifications.scss  # NEW
├── _therapeutic-process.scss      # NEW
├── _methods-used.scss             # NEW
├── _benefits-results.scss         # NEW
└── _pricing-packages.scss         # NEW
```

**Standards**:
- BEM naming (`.c-section-name__element--modifier`)
- Design tokens only (no magic numbers)
- Mobile-first responsive
- WCAG AA contrast ratios

**Import**:
Add to `assets/scss/06-components/_components.scss`:
```scss
@import 'services-preview';
@import 'about-preview';
// ... etc
```

---

### Decision 10: Performance Budget

**Date**: 2025-11-20
**Status**: ✅ Decided
**Decision**: Maintain current performance targets, no regression

**Performance Targets**:
- Build time: < 3s full, < 500ms cached
- Page size: < 520KB
- CSS: ~60KB gzipped
- JS: ~30KB gzipped
- Lighthouse: ≥ 90

**Monitoring**:
- Run `hugo --gc --minify --templateMetrics` after Phase 9
- Compare before/after build times
- Verify no significant regression

**Mitigation if Targets Exceeded**:
- Use `partialCached` for expensive sections
- Optimize images (WebP, lazy loading)
- Minimize CSS/JS if needed
- Review section complexity

---

## Decision Summary Table

| # | Decision | Chosen Option | Impact | Status |
|---|----------|---------------|--------|--------|
| 1 | New vs. Adapt Sections | Create new specialized sections | +10 components | ✅ |
| 2 | Content Approach | Placeholder/lorem ipsum | User fills later | ✅ |
| 3 | Implementation Scope | Full (all 11 pages) | 10-13 hours | ✅ |
| 4 | Language Structure | RO default, EN `/en/` | Full parity required | ✅ |
| 5 | Section Naming | Semantic, clear names | Better maintainability | ✅ |
| 6 | Component Reuse | Reuse atoms/molecules | Faster, consistent | ✅ |
| 7 | Testing Approach | Incremental + final QA | Phase 9 comprehensive | ✅ |
| 8 | Documentation | Update in Phase 9 | Single documentation pass | ✅ |
| 9 | SCSS Approach | New files per section | 10 new SCSS files | ✅ |
| 10 | Performance Budget | Maintain current targets | No regression | ✅ |

---

## Open Questions

*None currently - all key decisions made*

---

## Future Decisions Needed

### After Implementation Complete

1. **Real Content Strategy**: How to prioritize content filling (which pages first?)
2. **Image Strategy**: Stock photos, custom photography, illustrations?
3. **Blog/Resources**: Actual article creation approach
4. **Testimonials**: How to source and display real client testimonials
5. **SEO**: Meta descriptions, keywords, structured data approach
6. **Analytics**: Which analytics platform to use
7. **Performance Optimization**: If targets not met, what to optimize
8. **Maintenance**: Who maintains content going forward

*These decisions deferred until structure implementation complete*

---

**Last Updated**: 2025-11-20
**Next Review**: After Phase 9 completion
