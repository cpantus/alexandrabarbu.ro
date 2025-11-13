# Hugo Theme Refactor Plan: Andromeda v2.0
**Version**: 2.0 (LATEST) | **Date**: 2025-11-13 | **Status**: Ready for execution
**Based on**: cc-hugo-audit.md + PROJECT.md + stated refactor goals

---

## Executive Summary

**Strategic Context**:
- **Current state**: 40% modern (flexible layout + 16 sections), 60% legacy (1,581 lines monolithic)
- **Hugo version**: v0.148.1 extended ✅
- **Your goals**: Hugo standards ✅ | Performance ✅ | Modularity ✅ | Beautiful/animations ✅ | Advanced functionality ✅ | Critical & minimalistic ✅

**Key Decisions**:
- ✅ Keep Calendly booking (no payment complexity)
- ✅ Emerald + Terracotta color scheme (warm, therapeutic - fix config mismatch)
- ✅ Hugo native image processing (WebP, srcset, lazy-load)
- ✅ AOS for scroll animations (therapeutic aesthetic) + custom CSS micro-interactions
- ✅ Follow audit's 5-phase atomic design roadmap (proven approach)

**Investment**: 130 hours over 12 weeks
**ROI**: 70% less duplication, 50% faster page creation (per audit)
**Payback**: After ~20 new pages (~4 months)

---

## 5-Phase Refactor (12 weeks, 130 hours)

### Phase 1: Atomic Components (Week 1-2, 20h)
**Goal**: Build reusable UI primitives to eliminate 40% duplication

**Tasks**:

1. **Create atomic structure**:
   ```
   layouts/partials/
   ├── atoms/
   │   ├── button.html       (6 variants: primary, secondary, outline, link, icon, cta)
   │   ├── heading.html      (h1-h6, responsive sizing, brand color toggle)
   │   ├── input.html        (text, email, tel, textarea, checkbox, radio)
   │   ├── icon.html         (Line Awesome wrapper with size/color props)
   │   └── image.html        (NEW: Hugo image processing wrapper - WebP, srcset, lazy-load)
   ```

2. **Refactor 3 high-impact sections**:
   - `contact-form-enhanced.html` (2.7k → ~1.5k lines) - extracts input/button atoms
   - `pricing-tables.html` (4.4k → ~2.5k lines) - extracts card structure
   - `signup-form-enhanced.html` (3.3k → ~2k lines) - reuses contact form atoms

3. **Fix color scheme mismatch**:
   - Standardize on Emerald (#4DB380) + Terracotta (#CC6B49)
   - Update config and SCSS to match
   - Remove violet (#7C3AED) references

4. **Document component API**:
   - `docs/components/atoms.md` with usage examples and props

**Deliverable**: 5 atoms, 3 sections refactored (~3k lines saved), color scheme unified

**Design enhancement**: Implement subtle hover states on buttons (lift + shadow + color shift)

**Estimated time**: 20 hours
- Atoms creation: 12h
- Section refactoring: 6h
- Color scheme fix: 1h
- Documentation: 1h

---

### Phase 2: Molecular Components (Week 3-4, 30h)
**Goal**: Build composite components for consistent UI patterns

**Tasks**:

1. **Create 6 critical molecules**:
   ```
   layouts/partials/molecules/
   ├── card.html              (3 variants: feature, pricing, testimonial with hover lift)
   ├── form-field.html        (label + input + validation + error + hint)
   ├── nav-item.html          (responsive desktop/mobile with active states)
   ├── breadcrumb.html        (extracted from hero-breadcrumb)
   ├── pricing-toggle.html    (monthly/yearly with smooth transition)
   └── social-links.html      (icon grid with stagger animation)
   ```

2. **Refactor 6 sections to use molecules**:
   - `benefits-grid.html` → use card molecule
   - `feature-blocks.html` → use card molecule
   - `job-listings.html` → use card molecule
   - `faq-mini.html` → extract accordion molecule
   - `values-intro.html` → use card molecule
   - `video-popup.html` → extract video-embed molecule

3. **Create component preview page**:
   ```yaml
   # content/test/components.md
   layout: "flexible"
   sections:
     - type: "component-showcase"  # New section showing all atoms/molecules
   ```

4. **Establish data conventions** (per audit):
   - Front matter: Page-specific content
   - `data/shared/`: Cross-page reusable (testimonials, team, services)
   - `hugo.toml params`: Site-wide config

**Deliverable**: 6 molecules, 6 sections refactored, visual component library, data conventions documented

**Design enhancement**: Card hover effects (3D lift, shadow expansion, subtle parallax)

**Estimated time**: 30 hours
- Molecules creation: 18h
- Section refactoring: 8h
- Preview page: 2h
- Data conventions: 2h

---

### Phase 3: Organism Decomposition (Week 5-6, 24h)
**Goal**: Break down monolithic header/footer for performance + maintainability

**Tasks**:

1. **Decompose header** (209 lines → 50 lines):
   ```
   organisms/header.html (50 lines - composition layer)
   ├── molecules/logo.html (20 lines - SVG + link)
   ├── molecules/navigation.html (80 lines - desktop nav with dropdowns)
   ├── molecules/language-selector.html (40 lines - RO/EN/FR toggle)
   └── molecules/mobile-menu.html (110 lines - hamburger menu with slide-in)
   ```

2. **Decompose footer** (180 lines → 40 lines):
   ```
   organisms/footer.html (40 lines - composition layer)
   ├── molecules/footer-nav.html (60 lines - sitemap links)
   ├── molecules/social-links.html (30 lines - reuse from phase 2)
   └── molecules/footer-info.html (50 lines - contact + legal)
   ```

3. **Add partial caching** (per audit recommendation):
   ```html
   {{ partialCached "organisms/header.html" . .Language }}
   {{ partialCached "organisms/footer.html" . .Language }}
   ```
   **Expected**: 30-50% build time reduction

4. **Test multilingual thoroughly** (RO/EN/FR):
   - Language switcher functionality
   - Content fallbacks
   - URL structure

**Deliverable**: Modular header/footer (300+ lines saved), cached partials (faster builds), multilingual verified

**Design enhancement**: Sticky header with scroll fade-in, footer reveal animation on scroll

**Estimated time**: 24 hours
- Header decomposition: 8h
- Footer decomposition: 6h
- Partial caching: 4h
- Multilingual testing: 6h

---

### Phase 4: Legacy Migration (Week 7-10, 40h)
**Goal**: Migrate all 22+ monolithic layouts to flexible system

**Priority order** (from audit + complexity analysis):

**HIGH PRIORITY** (28h):
1. `about.html` (287 lines) → 8h - Most complex, high-traffic
2. `services.html` (237 lines) → 6h - Core conversion page
3. `pricing.html` (164 lines) → 4h - Important for business
4. `contact.html` (166 lines) → 4h - Already have enhanced version
5. `signup.html` (155 lines) → 3h - Already have enhanced section
6. `signin.html` (129 lines) → 3h - Similar to signup

**MEDIUM PRIORITY** (8h):
7. `list.html` (115 lines) → 4h - Blog/archive template
8. `single.html` (101 lines) → 4h - Blog post template

**LOW PRIORITY** (4h):
9. `how-it-works.html` (71 lines) → 2h - Simple process page
10. `terms.html` (23 lines) → 2h - Trivial legal page

**Migration process per page**:
1. Analyze current layout structure
2. Map sections (or create new if needed)
3. Convert front matter to sections array
4. Test RO/EN variants
5. Backup old layout to `_deprecated/`
6. Monitor for regressions (visual diff)

**Contact/Signup advanced functionality**:
- Already implemented: Google Sheets integration, reCAPTCHA v3, validation
- Action: Verify functionality after migration, enhance UX with better error states

**Deliverable**: 100% pages on flexible system, 1,581 legacy lines archived, all advanced features preserved

**Estimated time**: 40 hours (distributed across priority tiers)

---

### Phase 5: Performance & Polish (Week 11-12, 16h)
**Goal**: Optimize assets, animations, and finalize production quality

**Tasks**:

1. **Image optimization pipeline** (4h):
   ```html
   <!-- Implement in atoms/image.html -->
   {{- $img := resources.Get .src -}}
   {{- $webp := $img.Resize "800x webp q85" -}}
   {{- $webp2x := $img.Resize "1600x webp q85" -}}
   <picture>
     <source srcset="{{ $webp.RelPermalink }} 1x, {{ $webp2x.RelPermalink }} 2x" type="image/webp">
     <img src="{{ $img.RelPermalink }}" alt="{{ .alt }}" loading="lazy">
   </picture>
   ```
   **Target**: 8.3MB → <2MB total assets

2. **Animation refinement** (3h):
   - **Keep**: AOS for scroll reveals (gentle fade-up for therapeutic feel)
   - **Add**: Custom CSS animations:
     - Button hover: 3D lift + color shift (200ms ease-out)
     - Card hover: Shadow expansion + subtle scale (300ms ease-out)
     - Form focus: Input glow + label float (150ms ease)
     - Checkmark reveal: Draw animation on form success (600ms)
   - **Implement**: `prefers-reduced-motion` support (accessibility)
   - **Remove**: Rellax.js (replace with CSS parallax if needed)
   - **Audit**: Swiper.js usage - remove if <3 uses

3. **Build optimization** (2h):
   - Monitor: `hugo --templateMetrics --templateMetricsHints`
   - Implement: Additional partial caching for frequently used sections
   - **Target**: <3s build time (from audit success metrics)

4. **CSS optimization** (2h):
   - Audit PurgeCSS effectiveness (check unused rules)
   - Consolidate animation utilities into `_animations.scss`
   - Remove unused Bootstrap components
   - **Target**: <50KB CSS bundle (gzipped)

5. **Create archetypes** (2h - per audit recommendation):
   ```yaml
   # archetypes/service-page.md
   layout: "flexible"
   sections:
     - type: "hero-breadcrumb"
       title: "{{ replace .Name "-" " " | title }}"
     - type: "feature-details"
     - type: "pricing-tables"
     - type: "contact-form-enhanced"

   # archetypes/therapy-page.md
   layout: "flexible"
   sections:
     - type: "hero-breadcrumb"
     - type: "values-intro"
     - type: "benefits-grid"
     - type: "faq-mini"
   ```

6. **Documentation** (3h):
   - Component usage guide with examples
   - Migration guide for future pages
   - Performance benchmarks (before/after)
   - Troubleshooting guide
   - Update LAYOUT_MIXING_GUIDE.md with all 16 sections

**Deliverable**: <3s builds, <500KB page weight, complete docs, production-ready theme

**Design enhancement**: Page transition animations, loading states, skeleton screens

**Estimated time**: 16 hours
- Image optimization: 4h
- Animation refinement: 3h
- Build optimization: 2h
- CSS optimization: 2h
- Archetypes: 2h
- Documentation: 3h

---

## Success Metrics (from audit)

| Metric | Current | Target | Impact |
|--------|---------|--------|--------|
| Pages on flexible layout | 27% (8/30) | 100% | ✅ Consistency |
| Code duplication | ~40% | <10% | ✅ Maintainability |
| Build time | Unknown | <3s | ✅ Developer experience |
| Atomic components | 0 | 15+ | ✅ Reusability |
| New page creation | ~30min | <10min | ✅ Productivity |
| Component reusability | ~30% | >80% | ✅ DRY principle |
| Image assets | 8.3MB | <2MB | ✅ Performance |
| Page weight | Unknown | <500KB | ✅ User experience |

---

## Risk Mitigation (from audit + extensions)

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing pages | HIGH | Phased migration, backup to `_deprecated/`, test RO/EN |
| Calendly/form integration breaks | HIGH | Don't touch integration code, test after migration |
| Performance regression | MEDIUM | Benchmark before/after, aggressive caching, monitor metrics |
| Multilingual issues | MEDIUM | Test both languages at each phase |
| Animation performance | MEDIUM | GPU-accelerated properties only, `prefers-reduced-motion` |
| Scope creep | HIGH | Strict 5-file-per-task limit (per CLAUDE.md) |
| Over-abstraction | MEDIUM | Keep atoms simple, document when to create new components |

---

## Advanced Functionality Implementation

### Contact System (Already implemented ✅)
- Enhanced validation
- Google Sheets integration
- reCAPTCHA v3
- Multiple contact methods
- **Action in refactor**: Preserve during migration, enhance error states

### Pricing System (Already implemented ✅)
- Monthly/yearly toggle
- 3-tier cards
- Calendly integration
- **Action in refactor**: Extract card molecule, simplify toggle, add smooth transitions

### NEW: Advanced Features (Phase 4-5)
- Progressive form enhancement (save state, multi-step)
- Better loading states (skeleton screens)
- Accessibility improvements (WCAG AA compliance)
- Performance monitoring (Core Web Vitals)

---

## Beautiful Design Enhancements

### Color System
- **Primary**: Emerald #4DB380 (healing, growth)
- **Secondary**: Terracotta #CC6B49 (warmth, balance)
- Gradient overlays for depth
- Subtle texture noise (2% opacity) on backgrounds

### Typography
- Poppins headings (maintain)
- Open Sans body (maintain)
- Fluid typography (clamp() for responsive sizing)
- Increased contrast for accessibility

### Micro-interactions
1. **Button hover**: 3D lift + shadow + subtle color shift
2. **Card hover**: Scale 1.02 + shadow expansion
3. **Input focus**: Glow + floating label
4. **Form success**: Checkmark draw animation
5. **Navigation**: Underline slide-in on hover
6. **Image lazy-load**: Blur-up fade-in

### Scroll Animations (AOS)
- Fade-up for content blocks (gentle, professional)
- Stagger for card grids (0.1s delay between items)
- Parallax for hero images (CSS-only, subtle)

---

## Immediate First Steps (Week 1, Day 1-2)

**8 hours of quick wins**:

1. **Create git branch** (5min):
   ```bash
   git checkout -b refactor/atomic-design-system
   ```

2. **Extract button atom** (2h):
   - Create `layouts/partials/atoms/button.html`
   - 6 variants with hover states
   - Document props and examples

3. **Fix color scheme** (1h):
   - Update config: standardize on terracotta
   - Update SCSS variables
   - Remove violet references

4. **Create image atom with Hugo processing** (2h):
   - WebP conversion
   - Responsive srcset
   - Lazy-loading

5. **Setup performance monitoring** (1h):
   ```bash
   # Add to package.json
   "metrics": "hugo --templateMetrics --templateMetricsHints"
   # Run baseline
   ```

6. **Create component preview page** (2h):
   - Visual test page for components
   - Example usage for documentation

**Week 1 Deliverable**: Button + image atoms, color scheme fixed, baseline metrics, preview page

---

## Timeline Summary

| Phase | Duration | Hours | Key Deliverable |
|-------|----------|-------|-----------------|
| Phase 1: Atoms | Week 1-2 | 20h | 5 atoms, 3 sections refactored, color scheme fixed |
| Phase 2: Molecules | Week 3-4 | 30h | 6 molecules, 6 sections refactored, component library |
| Phase 3: Organisms | Week 5-6 | 24h | Modular header/footer, partial caching |
| Phase 4: Migration | Week 7-10 | 40h | 100% pages on flexible system |
| Phase 5: Polish | Week 11-12 | 16h | Optimized assets, complete docs |
| **TOTAL** | **12 weeks** | **130h** | **Production-ready theme** |

---

## Why This Approach is Optimal

✅ **Follows proven audit recommendations** (12 weeks, 130 hours tested approach)
✅ **Incremental & safe** (no big-bang rewrite, phased migration)
✅ **Performance-focused** (Hugo native processing, caching, optimization phase)
✅ **Modular** (atomic design = maximum reusability)
✅ **Beautiful** (AOS + custom CSS animations, therapeutic aesthetic)
✅ **Advanced functionality** (preserves existing, enhances UX)
✅ **Critical & minimalistic** (reuse existing flexible system, 5-file limit per CLAUDE.md)
✅ **Hugo best practices** (native image processing, partial caching, archetypes)

---

## Validation Checklist

Before starting each phase:
- [ ] Review phase goals and deliverables
- [ ] Ensure previous phase is complete
- [ ] Run performance baseline if applicable
- [ ] Test multilingual (RO/EN) if applicable
- [ ] Backup current state to git

After completing each phase:
- [ ] Visual regression testing
- [ ] Multilingual testing (RO/EN)
- [ ] Performance testing
- [ ] Update documentation
- [ ] Git commit with descriptive message

---

## References

**Project Documents**:
- `cc-hugo-audit.md` - Original audit and recommendations
- `PROJECT.md` - Project context and requirements
- `LAYOUT_MIXING_GUIDE.md` - Current flexible layout usage

**Hugo Documentation**:
- Partials: https://gohugo.io/templates/partials/
- Image Processing: https://gohugo.io/content-management/image-processing/
- Partial Caching: https://gohugo.io/functions/partialcached/

**Design Systems**:
- Atomic Design: https://atomicdesign.bradfrost.com/

---

## Notes

- This plan supersedes any previous refactor plans
- Based on comprehensive analysis of existing codebase + audit recommendations
- Aligned with stated goals: Hugo standards, performance, modularity, beauty, advanced features, minimalism
- Estimated ROI payback after ~20 new pages (~4 months)
- All existing functionality (Calendly, forms, multilingual) preserved and enhanced
