# Hugo Design Excellence Improvement Plan

**Created:** 2025-11-17
**Status:** Active - Planning Complete, Ready for Implementation
**Estimated Time:** 12 weeks (130 hours)
**UX Score:** 7.8/10 → 9+/10
**Build Performance:** 25s → <3s (88% improvement)

---

## Executive Summary

Transform the Alexandra Barbu psychology practice website from good foundation to best-in-class Hugo implementation through systematic improvements across 5 phases:

1. **Critical Performance** (Weeks 1-3): Fix 13s build bottleneck, implement Hugo native patterns
2. **CSS Architecture** (Weeks 4-6): Remove 850 lines of CSS debt, implement modular structure
3. **Complete Atomic Design** (Weeks 7-9): Achieve 80%+ component reusability
4. **Hugo Native Features** (Weeks 10-11): Leverage page bundles, taxonomies, related content
5. **Psychology UX Polish** (Week 12): Trust building, booking flow, accessibility to 100%

---

## Phase 1: Critical Performance & Architecture (Weeks 1-3)

### Goals
- Reduce build time from 25s to 5s (80% improvement)
- Implement Hugo best practices for template lookup and caching
- Establish theme independence
- Optimize image pipeline with modern formats

### Tasks

**Week 1: Build Performance Bottleneck**
1. Fix `style.html` partial caching (13s → <1s)
   - **Current Issue**: Cache key is page-specific, should be global
   - **Location**: `/themes/andromeda-hugo/themes/andromeda-hugo/layouts/partials/essentials/style.html`
   - **Fix**: Change to `{{ partialCached "style.html" . "global-styles" }}`
   - **Alternative**: Move style processing inline to baseof.html
   - **Expected**: 92% reduction in style processing time

2. Refactor flexible layout engine (70 lines → 5 lines)
   - **Current Issue**: Manual if/else chain for 24 sections
   - **Location**: `/themes/andromeda-hugo/layouts/_default/flexible.html` (lines 22-92)
   - **Fix**: Dynamic template lookup with `templates.Exists`
   - **Code**:
     ```go
     {{ $sectionPartial := printf "sections/%s.html" $sectionType }}
     {{ if templates.Exists (printf "partials/%s" $sectionPartial) }}
       {{ partial $sectionPartial $ }}
     {{ else }}
       {{ warnf "Section not found: %s at %s" $sectionType .File.Path }}
     {{ end }}
     ```
   - **Expected**: Auto-discovery of new sections, infinite extensibility

**Week 2: Image Pipeline & Partial Caching**
3. Enhance image atom with Hugo Pipes
   - **Location**: `/themes/andromeda-hugo/layouts/partials/atoms/image.html`
   - **Add**: WebP/AVIF generation, responsive srcset, lazy loading, blur-up placeholders
   - **Code Template**:
     ```html
     {{ $image := resources.Get .src }}
     {{ $webp := $image.Resize "800x webp q85" }}
     {{ $avif := $image.Resize "800x avif q85" }}
     <picture>
       <source srcset="{{ $avif.RelPermalink }}" type="image/avif">
       <source srcset="{{ $webp.RelPermalink }}" type="image/webp">
       <img src="{{ $image.RelPermalink }}" loading="lazy" alt="{{ .alt }}">
     </picture>
     ```
   - **Expected**: 60-80% image size reduction

4. Implement partial caching for sections
   - **Target Sections**: pricing-tables, benefits-grid, feature-blocks (93ms savings)
   - **Cache Key Strategy**: `{{ $cacheKey := printf "%s-%s" .Language (md5 (printf "%v" .Params.section_data)) }}`
   - **Expected**: 84% reduction in repeated section rendering

**Week 3: Theme Independence**
5. Copy baseof.html to active theme
   - **Current Issue**: Relying on nested parent theme
   - **Source**: `/themes/andromeda-hugo/themes/andromeda-hugo/layouts/_default/baseof.html`
   - **Destination**: `/themes/andromeda-hugo/layouts/_default/baseof.html`
   - **Customize**: Inline style processing, remove parent theme dependency
   - **Expected**: Full control over HTML structure

6. Remove .Scratch counter anti-pattern
   - **Files**: benefits-grid.html, feature-blocks.html, feature-details.html
   - **Current**: `$.Scratch.Set "counter" (add ($.Scratch.Get "counter") 1)`
   - **Fix**: Use `range $index, $item` pattern
   - **Expected**: 12 lines removed, clearer code

### Success Criteria
- [ ] Build time <5s (current: 25s)
- [ ] Images serve WebP/AVIF with srcset
- [ ] Flexible layout uses dynamic lookup (5 lines)
- [ ] Theme independent (baseof.html in active theme)
- [ ] Partial caching enabled for 5+ components

---

## Phase 2: CSS Architecture & Performance (Weeks 4-6)

### Goals
- Remove 850 lines of CSS bloat (31% reduction)
- Split global bundle into critical + page-specific
- Achieve <30KB critical CSS (current: ~50KB)
- Simplify heading color system from 176 lines to 8 lines

### Tasks

**Week 4: Remove CSS Bloat**
7. Delete hardcoded color overrides
   - **Location**: `/themes/andromeda-hugo/themes/andromeda-hugo/assets/scss/custom.scss` (lines 504-1360)
   - **Content**: 850 lines of `[style*="#FE6019"] { background-color: #059669 !important; }`
   - **Root Cause**: Fighting inherited base theme styles
   - **Fix**: Remove base theme dependency OR create clean fork
   - **Expected**: 2,752 → 1,900 lines (31% reduction)

**Week 5: Component-Scoped CSS**
8. Extract page-specific styles to bundles
   - **Contact Page**: 228 lines → `pages/_contact.scss`
   - **Signup Page**: 292 lines → `pages/_signup.scss`
   - **Timeline**: 88 lines → `components/_timeline.scss`
   - **Blog Grid**: 64 lines → `components/_blog-grid.scss`
   - **Load Strategy**: Conditionally via Hugo Pipes per page
   - **Expected**: 50KB → 30KB critical, 5-10KB per page bundle

9. Simplify heading color system
   - **Current**: 176 lines of conditional logic
   - **Location**: custom.scss (lines 1610-1786)
   - **Fix**: CSS custom properties
     ```scss
     :root { --heading-color: #111827; }
     body.headings-brand-color { --heading-color: #4DB380; }
     h2, h3, h4, h5, h6 { color: var(--heading-color); }
     ```
   - **Expected**: 176 lines → 8 lines (95% reduction)

**Week 6: Modular SCSS Structure**
10. Restructure SCSS architecture
    - **Create**:
      ```
      scss/
      ├── _design-system.scss (tokens only)
      ├── base/ (reset, typography, utilities)
      ├── components/
      │   ├── atoms/ (_button.scss, _form-controls.scss)
      │   ├── molecules/ (_card.scss, _navigation.scss)
      │   └── organisms/ (_header.scss, _footer.scss)
      └── pages/ (_contact.scss, _signup.scss)
      ```
    - **Expected**: Better maintainability, tree-shaking enabled

### Success Criteria
- [ ] CSS bundle <30KB critical (current: 50KB)
- [ ] Page-specific CSS 5-10KB per page
- [ ] Zero hardcoded color overrides
- [ ] Modular SCSS structure implemented
- [ ] Heading color system <10 lines

---

## Phase 3: Complete Atomic Design System (Weeks 7-9)

### Goals
- Achieve 80%+ component reusability (current: 55%)
- Create 4 missing molecules
- Refactor 3 oversized sections to <80 lines
- Complete component documentation

### Tasks

**Week 7: Missing Molecules**
11. Create form-field molecule
    - **Reuse In**: contact-form-enhanced, signup-form-enhanced, newsletter-signup (6 sections)
    - **API**: `{{ partial "molecules/form-field.html" (dict "type" "email" "label" "Email" "required" true "error" .error) }}`
    - **Expected**: Eliminate input duplication

12. Create stat-card molecule
    - **Reuse In**: stats-numbers, pricing-tables, benefits-grid
    - **API**: `{{ partial "molecules/stat-card.html" (dict "number" "500+" "label" "Clients" "icon" "las la-users") }}`

13. Create blog-card molecule
    - **Reuse In**: blog-grid, related-services
    - **API**: `{{ partial "molecules/blog-card.html" (dict "image" .image "title" .title "excerpt" .excerpt "date" .date) }}`

14. Create timeline-step molecule
    - **Reuse In**: timeline-process, onboarding-steps
    - **API**: `{{ partial "molecules/timeline-step.html" (dict "icon" .icon "title" .title "content" .content) }}`

**Week 8: Refactor Oversized Sections**
15. Refactor pricing-tables.html (120 → 65 lines)
    - **Extract**: Pricing card variant to card molecule
    - **Location**: `/themes/andromeda-hugo/layouts/partials/sections/pricing-tables.html`

16. Refactor signup-form-enhanced.html (117 → 70 lines)
    - **Use**: form-field molecule (created in week 7)
    - **Location**: `/themes/andromeda-hugo/layouts/partials/sections/signup-form-enhanced.html`

17. Refactor method-tabs.html (117 → 75 lines)
    - **Extract**: Tab navigation molecule
    - **Location**: `/themes/andromeda-hugo/layouts/partials/sections/method-tabs.html`

**Week 9: Component Documentation**
18. Create component showcase page
    - **Location**: `/themes/andromeda-hugo/content/english/components-showcase.md`
    - **Content**: Storybook-style demo of all 48 components
    - **Include**: Props API, usage examples, variants, accessibility notes

### Success Criteria
- [ ] 80%+ component reusability achieved
- [ ] 4 new molecules created and used in 10+ sections
- [ ] 95% sections <80 lines (current: 50%)
- [ ] Component showcase page live

---

## Phase 4: Hugo Native Features (Weeks 10-11)

### Goals
- Implement page bundles for content-image co-location
- Add content types and taxonomies
- Replace manual related content with Hugo's built-in algorithm
- Add explicit configuration files

### Tasks

**Week 10: Page Bundles & Content Types**
19. Migrate to page bundles
    - **Current**: `content/english/services.md` + global images
    - **Target**:
      ```
      content/services/
      ├── individual-therapy/
      │   ├── index.ro.md
      │   ├── index.en.md
      │   └── hero.jpg
      ```
    - **Expected**: Better organization, scoped image processing

20. Define content types
    - **Location**: `archetypes/`
    - **Types**: services, blog, landing
    - **Auto-layouts**: `layouts/services/single.html`, `layouts/blog/list.html`

21. Add taxonomies
    - **Location**: `config/_default/config.toml`
    - **Add**:
      ```toml
      [taxonomies]
        therapy = "therapies"    # CBT, DBT, ACT
        condition = "conditions"  # anxiety, depression
        category = "categories"
      ```
    - **Expected**: Auto-generated filtering pages at `/therapies/cbt/`

**Week 11: Related Content & Configuration**
22. Implement Hugo's related content
    - **Replace**: `sections/related-services.html` (56 lines)
    - **Use**: `.Site.RegularPages.Related . | first 3`
    - **Config**:
      ```toml
      [related]
        threshold = 80
        [[related.indices]]
          name = "therapies"
          weight = 80
      ```

23. Add configuration files
    - **Create**: `config/_default/markup.toml`
      ```toml
      [goldmark.renderer]
        unsafe = false
      [goldmark.parser]
        autoHeadingID = true
      ```
    - **Create**: `config/_default/imaging.toml`
      ```toml
      [imaging]
        quality = 90
        resampleFilter = "Lanczos"
      ```

### Success Criteria
- [ ] Service pages use page bundles
- [ ] Content types defined with auto-layouts
- [ ] Taxonomies generate filtering pages
- [ ] Related content uses Hugo's algorithm
- [ ] All config files explicit (markup, imaging, outputs)

---

## Phase 5: Psychology Practice UX Polish (Week 12)

### Goals
- Boost UX score from 7.8 to 9+/10
- Implement psychology-specific trust building
- Reduce first session anxiety
- Achieve 100% WCAG AA compliance
- Optimize booking conversion funnel

### Tasks

**Trust Building**
24. Add credentials hero badge
    - **Location**: Homepage hero section
    - **Content**: "Licențiat Psiholog Clinician", "10+ Ani Experiență", "500+ Clienți", "Membru CPR"

25. Professional association logos
    - **Section**: professional-affiliations.html
    - **Content**: Colegiul Psihologilor, European Association for Psychotherapy

26. Office photos gallery
    - **Section**: office-gallery.html
    - **Photos**: Waiting room, therapy room, tea corner

27. Real testimonial details
    - **Enhance**: Add age range, therapy type, verification badge
    - **Example**: "Maria T., 32 ani, Terapie individuală (6 luni), Verificat ✓"

**Reduce First Session Anxiety**
28. "What to expect" timeline
    - **Section**: first-session-explained.html
    - **Content**: 0-10min welcome, 10-40min exploration, 40-50min action plan

29. "Are we a good fit?" section
    - **Content**: When my approach works, when we're not a match
    - **Location**: About page or service pages

30. Service page FAQs
    - **Questions**: "How long until results?", "Weekly sessions required?", "Insurance accepted?"

**Pricing Transparency**
31. Add pricing to service pages
    - **Content**: "250 RON/ședință (50 min)", package deals, payment methods
    - **Location**: All service pages

**Multi-Option Booking Flow**
32. Create booking options section
    - **Options**:
      - Fast track (Calendly direct)
      - Information seekers (contact form)
      - Low commitment (resource download)
    - **Alternative channels**: WhatsApp, phone, email

**Accessibility to 100%**
33. Add skip-to-content link
    - **Location**: Top of header.html
    - **Code**: `<a href="#main-content" class="skip-to-content visually-hidden-focusable">Skip to main content</a>`

34. Fix form accessibility
    - **Add**: ARIA labels, error associations, live regions
    - **Files**: atoms/input.html, contact-form-enhanced.html, signup-form-enhanced.html

35. Ensure 44px touch targets
    - **Audit**: All buttons, links, form inputs on mobile
    - **Fix**: Add minimum height/width in mobile breakpoints

**Multilingual UX**
36. Language preference persistence
    - **Add**: localStorage to remember language choice
    - **Auto-redirect**: Homepage to preferred language

37. Enhanced language selector
    - **Add**: Flags, language names, ARIA labels
    - **Location**: molecules/language-selector.html

38. Add hreflang tags
    - **Location**: partials/head.html
    - **Code**: `<link rel="alternate" hreflang="ro" href="..." />`

### Success Criteria
- [ ] UX score 9+/10 (current: 7.8)
- [ ] WCAG AA compliance 100% (current: 85%)
- [ ] Pricing visible on all service pages
- [ ] Multi-option booking flow implemented
- [ ] 44px minimum touch targets on mobile
- [ ] Language preference persists across sessions

---

## Risk Assessment & Mitigation

### High Risk
**CSS removal breaks inherited styles**
- **Impact**: Visual regression, broken layouts
- **Mitigation**: Test each override removal in isolation, keep staging environment, visual regression testing
- **Rollback**: Git revert, staged deployment

**Partial caching causes stale content**
- **Impact**: Outdated sections shown after content updates
- **Mitigation**: Use cache keys based on params hash + language, clear cache on deploy
- **Validation**: Test content updates in dev before production

### Medium Risk
**Image processing slows builds**
- **Impact**: Build time increases instead of decreases
- **Mitigation**: Generate on-demand, cache in resources/, use Hugo's built-in image processing (fast)
- **Monitoring**: Hugo --templateMetrics after each change

**Content restructure breaks URLs**
- **Impact**: 404s, SEO loss
- **Mitigation**: Implement 301 redirects, test URL structure in staging, update sitemap
- **Validation**: Crawl site before/after, check Google Search Console

### Low Risk
**Component API changes break existing pages**
- **Impact**: Template errors on build
- **Mitigation**: Version components, deprecate gradually, maintain backward compatibility
- **Testing**: Build all pages after API changes

---

## Tools & Resources

### Specialized Agents
- **hugo-specialist**: Template optimization, Hugo best practices validation
- **frontend-architect**: Component refactoring, CSS modularization
- **ux-designer**: Psychology practice UX patterns, trust building
- **performance-engineer**: Build optimization, caching strategy
- **code-reviewer**: Pre-commit quality checks

### Skills (Auto-Load)
- **design-excellence**: Design system validation, component quality
- **mcp-code-execution**: Batch operations, data processing

### Commands
- `/workflow scout-plan-build` - Complex multi-step workflows
- `/code-on` - Enable code plugin for advanced patterns
- `/system-health` - Validate infrastructure state

---

## Success Metrics

### Performance
| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Build time | 25s | <3s | 88% |
| CSS bundle | 50KB | 30KB | 40% |
| Image sizes | No optimization | 60-80% reduction | 70% avg |
| Lighthouse Performance | Unknown | 90+ | - |

### Quality
| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Component reusability | 55% | 80%+ | 45% |
| Section size compliance | 50% | 95% | 90% |
| UX score | 7.8/10 | 9+/10 | 15% |
| WCAG AA compliance | 85% | 100% | 18% |

### Maintainability
| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| CSS debt (override lines) | 850 | 0 | 100% |
| Hugo best practices | 75% | 100% | 33% |
| Component docs | Incomplete | Complete | - |
| Section lookup | Manual (70 lines) | Auto (5 lines) | 93% |

---

## Decision Points Needed

1. **CSS Strategy**: Remove nested theme entirely OR keep with proper overrides?
   - **Option A**: Fork base theme, remove all overrides (clean slate)
   - **Option B**: Keep nested theme, fix overrides at build level
   - **Recommendation**: Option A for long-term maintainability

2. **Content Restructure**: Migrate to page bundles now OR defer to Phase 4?
   - **Option A**: Phase 1 (front-load work, better organization from start)
   - **Option B**: Phase 4 (as planned, less disruption early)
   - **Recommendation**: Option B (stick to plan, validate architecture first)

3. **Mobile Testing**: Block deployment until device testing OR parallel track?
   - **Option A**: Block (ensure quality before launch)
   - **Option B**: Parallel (test while building, don't block progress)
   - **Recommendation**: Option B with weekly device testing checkpoints

4. **Pricing Display**: Show exact prices OR "Contact for pricing"?
   - **Psychology Practice Context**: Transparency reduces inquiry friction
   - **Recommendation**: Show exact prices (250 RON/session) with packages

5. **Image Format**: WebP only OR WebP + AVIF?
   - **Browser Support**: WebP (96%), AVIF (76%)
   - **Recommendation**: Both with `<picture>` fallback (best quality, broad support)

---

## Next Steps

**Immediate (This Session)**:
1. Approve this plan
2. Create context.md and tasks.md
3. Initialize bundle log for continuity

**Week 1 Start**:
1. Branch: `feature/hugo-performance-optimization`
2. Fix style.html caching (quick win, 92% improvement)
3. Refactor flexible.html section lookup
4. Run `hugo --templateMetrics` to validate improvements
5. Update dev docs with progress

**Before Each Phase**:
1. Review phase goals and success criteria
2. Create phase-specific branch (e.g., `feature/css-architecture`)
3. Set up validation tests (build time, bundle size, component count)
4. Document decisions in context.md

**After Each Phase**:
1. Merge to main after validation
2. Deploy to staging
3. Run full test suite
4. Update progress in tasks.md
5. Review metrics against targets

---

## Continuity Plan

**For Seamless Session Resume**:
1. Read this plan file (high-level strategy)
2. Read context.md (current state, decisions, blockers)
3. Read tasks.md (detailed checklist with progress)
4. Check bundle log for recent activity
5. Resume from "Next Step" in context.md

**Recovery Command**: "Continue working on hugo design excellence improvements"

**Expected Recovery Time**: <2 minutes to full context restoration
