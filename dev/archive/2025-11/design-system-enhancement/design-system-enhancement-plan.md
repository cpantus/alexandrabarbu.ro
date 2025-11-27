# Design System Enhancement - Complete Plan

**Created:** 2025-11-18
**Status:** Active - Revised with v4.0 Systematic Upgrade
**Estimated time:** 50 hours (~2 weeks full-time)
**Priority:** CRITICAL - Design language inconsistency across site

---

## Overview

Transform the Andromeda Hugo theme from **design bifurcation** (5 enhanced v4.0 sections + 29 generic legacy sections) to a **cohesive, warm, professional psychology practice design system** with consistent v4.0 styling across ALL 34 sections.

**Core Problem Identified:**
The website has two conflicting design languages coexisting:
- ✅ **5 enhanced sections** (credentials-showcase, values-compass): Gradient icons, glassmorphism, color variety (50-30-20 distribution)
- ❌ **29 legacy sections** (problem-empathy, timeline, method-tabs, service-highlights): ALL GREEN monotony, flat design, no visual interest, generic corporate aesthetic

**User Requirement:** "Components should look like [credentials/values-compass sections], not [problem-empathy/timeline/method-tabs sections]. ALL atoms, molecules, sections, organisms MUST follow the same design language."

**Solution:** Systematic 4-tier upgrade to apply v4.0 design language to ALL sections, with automatic color distribution system embedded at the architecture level.

---

## Problems Identified

### 1. Design Language Bifurcation (CRITICAL)
**Visual Evidence:**
- **Good Design** (5 sections): Gradient circular icon backgrounds, glassmorphism cards, color variety (emerald/terracotta/teal/amber), organic shapes, animations
- **Bad Design** (29 sections): 90%+ emerald green monotony, flat cards, plain icons (no gradient backgrounds), corporate/generic feel, no visual interest

**Root Cause:** v4.0 design system exists (`_design-enhancements.scss`, 8 gradient variants, glassmorphism mixins) but was only applied to 5 sections. The remaining 29 sections never received v4.0 upgrades.

### 2. Color Monotony (90% Emerald Green)
**Evidence:** 19 primary button usages vs 1 secondary (95% emerald dominance)
**Root Cause:** Templates support `button_variant` parameter, but content pages don't specify it → defaults to "primary" (green)
**Impact:** Site looks corporate, generic, "AI slop" aesthetic instead of warm psychology practice

### 3. Generic Typography (29/50 score)
**Current:** Poppins + Open Sans - distinctiveness 4/10
**Target:** Serif + Sans pairing scoring 40+/50 with distinctiveness 7+/10
**Impact:** Font pairing doesn't convey expertise, depth, or therapeutic warmth

### 4. Component Inconsistencies
- 12 icon violations (raw `<i>` tags with inline styles, no gradient backgrounds)
- 6 legacy components need v4.0 upgrade (benefits-grid, blog-grid, faq, onboarding, timeline, method-tabs)
- Hardcoded values in SCSS (4 instances)

### 5. Documentation Gaps
- 34 sections exist, only 24 documented in CLAUDE.md
- Missing color variant strategy guide
- No automatic color distribution documentation

---

## Solution: 4-Phase Systematic Upgrade

### PHASE 1: v4.0 Design Language Unification (44 hours)

**Goal:** Upgrade ALL 34 sections to v4.0 enhanced design standard (matching credentials-showcase aesthetic).

#### TIER 0: Design System Foundation (8 hours)

**Create automatic color distribution system:**

**0.1 Color Assignment Utilities (3 hours)**
- File: `assets/scss/_color-system.scss` (NEW)
- Functions: `get-section-color-variant($index)`, `get-icon-gradient($variant)`
- CSS custom properties: `--section-heading-color`, `--section-icon-gradient`
- Automatic rotation: Section 1 = emerald, Section 2 = terracotta, Section 3 = emerald, Section 4 = terracotta, Section 5 = teal, Section 6 = amber (repeats)

**0.2 Icon Wrapper Mixins (2 hours)**
- File: `assets/scss/_icon-system.scss` (NEW)
- Mixin: `@mixin section-icon-wrapper($size, $variant)`
- Features: Gradient circle backgrounds, glow effects, hover animations
- 8 variants: emerald, terracotta, teal, amber, coral, premium, sage, navy

**0.3 Card Enhancement Mixins (2 hours)**
- File: `assets/scss/_card-system.scss` (NEW)
- Mixin: `@mixin card-glass($blur)` - Glassmorphism effect
- Mixin: `@mixin card-gradient-border($gradient)` - Gradient borders
- Auto-color integration via CSS variables

**0.4 Hugo Template Helper (1 hour)**
- File: `layouts/partials/meta/section-color-index.html` (NEW)
- Function: Calculate section index for automatic color assignment
- Integration: Flexible layout engine

**Deliverables:**
- Color assignment functions (50-30-20 distribution)
- Universal icon wrapper system (ALL icons get gradient circles)
- Card styling variants (glassmorphism + gradient borders)
- Template helpers for automatic color calculation

#### TIER 1: Atom Upgrades (4 hours)

**1.1 Icon Atom Enhancement (2 hours)**
- File: `layouts/partials/atoms/icon.html`
- New params: `withWrapper` (boolean), `wrapperVariant` (emerald/terracotta/etc), `wrapperSize` (sm/md/lg)
- Behavior: When `withWrapper=true`, wraps icon in gradient circle with auto-color
- Backward compatible: Old usage (no wrapper) still works

**1.2 Heading Atom Enhancement (2 hours)**
- File: `layouts/partials/atoms/heading.html`
- New params: `colorVariant` (emerald/terracotta/etc), `autoColor` (boolean)
- Behavior: Headings can rotate colors based on section position
- Backward compatible: Default color maintained

**Impact:** ALL sections can now use enhanced atoms with `withWrapper=true` and `autoColor=true` to adopt v4.0 styling.

#### TIER 2: Section Template Updates (20 hours)

**Upgrade all 29 legacy sections systematically:**

**GROUP A: Simple Icon Sections (6 sections, 6 hours)**
Sections: benefits-grid, service-highlights, contact-info-cards, contact-options, privacy-guarantee, professional-affiliations

Changes:
- Wrap ALL icons in gradient circles
- Rotate icon colors (emerald → terracotta → teal → amber)
- Add heading color variants
- Apply glassmorphism or gradient borders to cards

Pattern:
```html
{{ range $index, $item := .items }}
  {{ $iconVariant := index (slice "emerald" "terracotta" "teal" "amber") (mod $index 4) }}

  {{ partial "atoms/icon.html" (dict
    "name" $item.icon
    "withWrapper" true
    "wrapperVariant" $iconVariant
  ) }}

  {{ partial "atoms/heading.html" (dict
    "text" $item.title
    "level" "h3"
    "colorVariant" $iconVariant
  ) }}
{{ end }}
```

**GROUP B: Card-Based Sections (8 sections, 8 hours)**
Sections: problem-empathy, testimonials, therapist-match, onboarding-steps, first-session-timeline, faq-mini, faq-content, job-listings

Changes:
- All GROUP A changes PLUS:
- Apply glassmorphism to cards (`@include card-glass()`)
- Add staggered entrance animations
- Organic border radius patterns
- Gradient borders on hover

**GROUP C: Complex Layout Sections (6 sections, 6 hours)**
Sections: timeline-process, method-tabs, feature-details, values-intro, video-popup, blog-grid

Changes:
- All GROUP A + B changes PLUS:
- Custom layout enhancements (zigzag, compass, organic shapes)
- Gradient timeline connectors (emerald → terracotta gradient)
- Parallax scrolling effects (desktop ≥992px)
- Advanced animations (scroll-driven, SVG gradients)

**Detailed Examples:**

**problem-empathy section:**
```html
<div class="problem-empathy">
  <div class="problem-grid">
    {{ range $index, $challenge := .challenges }}
      {{ $iconVariant := index (slice "emerald" "terracotta" "teal" "amber") (mod $index 4) }}

      <div class="problem-card" data-aos="fade-up" data-aos-delay="{{ mul $index 100 }}">
        {{ partial "atoms/icon.html" (dict
          "name" ($challenge.icon | default "exclamation-circle")
          "withWrapper" true
          "wrapperVariant" $iconVariant
        ) }}

        {{ partial "atoms/heading.html" (dict
          "text" $challenge.title
          "level" "h3"
          "colorVariant" $iconVariant
        ) }}

        <p>{{ $challenge.description }}</p>
      </div>
    {{ end }}
  </div>
</div>
```

**timeline-process section:**
```html
<div class="timeline-wrapper">
  {{ range $index, $step := .steps }}
    {{ $iconVariant := index (slice "emerald" "terracotta" "teal" "amber") (mod $index 4) }}

    <div class="timeline-item">
      <div class="timeline-marker">
        <div class="timeline-icon timeline-icon-{{ $iconVariant }}">
          {{ partial "atoms/icon.html" (dict "name" .icon "size" "2x") }}
        </div>
      </div>

      <div class="timeline-content">
        {{ partial "atoms/heading.html" (dict
          "text" .title
          "level" "h4"
          "colorVariant" $iconVariant
        ) }}
        <p>{{ .description }}</p>
      </div>
    </div>
  {{ end }}
</div>
```

#### TIER 3: Component SCSS Files (12 hours)

**Create dedicated v4.0 SCSS files for each section type:**

**3.1 Create/Update Component SCSS (8 hours)**

Files to create:
- `_problem-empathy.scss` (2 hours) - Glassmorphism cards, gradient icons, organic background blobs
- `_timeline-process.scss` (2 hours) - Multi-color gradient connector, gradient icon circles, parallax
- `_method-tabs.scss` (1 hour) - Tab color variants, gradient active states
- `_benefits-grid.scss` (1 hour) - Glassmorphism grid, icon pulse animations
- `_testimonials.scss` (1 hour) - Gradient borders, hover lift effects
- `_faq.scss` (1 hour) - Gradient borders on active accordion, icon rotations

**Standard Structure:**
```scss
.problem-empathy {
  position: relative;
  padding: $space-20 0;
  overflow: hidden;
  background: $gradient-warm-subtle;

  // Organic background blob
  &::before {
    content: '';
    position: absolute;
    top: -15%;
    right: -10%;
    width: 50%;
    height: 130%;
    background: $gradient-radial-primary;
    opacity: 0.08;
    @include organic-blob('smooth');
  }

  .problem-card {
    @include card-glass(16px);
    @include staggered-entrance(fade-in-up, 150ms);

    .icon-wrapper {
      @include section-icon-wrapper($icon-circle-md);
      margin: 0 auto $space-5;
    }
  }
}
```

**3.2 Update Main SCSS Import (1 hour)**
- File: `assets/scss/components/_components.scss`
- Add imports for all new component SCSS files

**3.3 CSS Utilities for Auto-Color (3 hours)**
- File: `assets/scss/_utilities.scss`
- Section-level color assignment (CSS vars set on `<section>` tags)
- Heading auto-color utility classes
- Icon wrapper auto-color (when variant not specified)
- Card border auto-color

**Example:**
```scss
// Section-level color assignment
@for $i from 1 through 12 {
  .flexible-layout > section:nth-child(#{$i}) {
    $variant: nth((emerald, terracotta, emerald, terracotta, teal, amber), (($i - 1) % 6) + 1);

    --section-heading-color: var(--#{$variant}-700);
    --section-icon-gradient: var(--gradient-icon-#{$variant});
  }
}

.icon-wrapper:not([class*="icon-wrapper-"]) {
  background: var(--section-icon-gradient, $gradient-icon-emerald);
}
```

#### TIER 4: Testing & Validation (6 hours)

**4.1 Visual Audit Script (2 hours)**
- Script: `scripts/audit-color-distribution.sh`
- Count icon wrapper variants in templates
- Count heading color variants
- Verify 50% emerald, 30% terracotta, 20% others distribution

**4.2 Visual Regression Testing (2 hours)**
- Screenshot comparison before/after
- Test all page types (homepage, services, about, blog, contact)
- Verify responsive (mobile, tablet, desktop)

**4.3 Performance Validation (1 hour)**
- Build time: Must remain <3s
- CSS bundle size: +15-20KB acceptable
- Page weight: Maintain <520KB
- Animations: 60fps verification

**4.4 Accessibility Check (1 hour)**
- WCAG AA compliance (4.5:1 contrast for all new colors)
- Icons have proper aria-labels
- Reduced-motion support for all animations
- Keyboard navigation verified

#### 1D-REVISED: Automatic Color Distribution System (9 hours)

**Integrated into TIER 0-3 above, but can also be implemented as standalone improvement:**

**Meta Partial for Smart Color Calculation:**
- File: `layouts/partials/meta/_color-strategy.html`
- Function: Calculate appropriate color based on position, context, type
- Palettes: default (50-30-20), warm (75% terracotta), professional (75% emerald), badge (8-color rotation)

**CSS-Based Color Cycling (Fallback):**
- File: `assets/scss/_design-patterns.scss`
- nth-child rules for automatic color distribution when template logic not present
- Applies to: service cards, feature cards, blog cards, credential badges, navigation

**Integration Pattern:**
```html
{{ $autoColor := partial "meta/color-strategy.html" (dict
  "type" "button"
  "index" $index
  "context" "default"
  "section" $section
) }}

{{ partial "atoms/button.html" (dict
  "text" .text
  "variant" (.button_variant | default $section.button_variant | default $autoColor)
) }}
```

**Fallback Chain:**
1. Item-level explicit variant (highest priority)
2. Section-level variant override
3. Smart calculated variant (position-based)
4. CSS nth-child fallback
5. Never hardcoded "primary"

---

### PHASE 2: Font Upgrade Experimentation (4-5 hours)

**Goal:** Replace Poppins + Open Sans (29/50 score) with superior font pairing (40+/50 score).

**Font Pairing Candidates:**

**TIER 1: Maximum Impact (Serif + Sans)**

**1. Cormorant Garamond + Source Sans Pro** ⭐ TOP RECOMMENDATION
- Score: 44/50 (1.7x improvement)
- Trust: 9/10 | Warmth: 8/10 | Calm: 9/10 | Readability: 10/10 | Distinctive: 8/10
- Personality: Literary, thoughtful, reflective
- Best for: Narrative therapy, psychodynamic, depth-oriented practices
- Performance: +8KB

**2. Crimson Text + Nunito Sans**
- Score: 43/50 (1.5x improvement)
- Trust: 8/10 | Warmth: 9/10 | Calm: 9/10 | Readability: 9/10 | Distinctive: 8/10
- Personality: Warm, compassionate, approachable
- Best for: Person-centered therapy, compassion-focused
- Performance: +7KB

**3. Playfair Display + Lato**
- Score: 39/50 (1.3x improvement)
- Trust: 9/10 | Warmth: 7/10 | Calm: 7/10 | Readability: 9/10 | Distinctive: 7/10
- Personality: Traditional, professional, established
- Best for: Clinical expertise, traditional methods
- Performance: +10KB

**TIER 2: Modern Warm (Sans + Sans)**

**4. Poppins + Inter** (Minimal change option)
- Score: 38/50 (1.3x improvement)
- Conservative upgrade, keeps Poppins
- Performance: +2KB

**Testing Process (4-5 hours):**
1. Update font imports (15 min)
2. Test Cormorant + Source Sans Pro (2 hours)
3. Test alternative pairing (2 hours)
4. Side-by-side comparison (30 min)
5. Final selection & implementation (30 min)

**Files to Modify:**
- `assets/scss/_design-system.scss` (font imports)
- `assets/scss/_design-tokens.scss` ($font-heading, $font-body)

---

### PHASE 3A: Component Quick Wins (6 hours) ⚡ CORE

**High impact, low effort fixes (already incorporated into Phase 1 TIER 2-3):**

**3A.1: Fix Icon Violations (1.5 hours)**
- Replace 12 raw `<i>` tags with icon atom
- Add `withWrapper=true` for gradient circles
- Semantic fixes (thumbtack → check-circle)

**3A.2: Fix Hardcoded Values (1 hour)**
- File: `assets/scss/_sections.scss`
- Replace hardcoded padding/border-radius with design tokens
- Create `$shadow-upward` token if needed

**3A.3: Upgrade Hero Breadcrumb (1.5 hours)**
- Add organic blob background shapes
- Gradient backgrounds (emerald → terracotta subtle)
- Enhanced breadcrumb hover effects

**3A.4: Upgrade Contact Info Cards (2 hours)**
- Glassmorphism effect
- Gradient icon circle backgrounds
- Hover lift animations + brand-tinted shadows

---

### PHASE 3B: Full Component Consistency (16 hours OPTIONAL)

**Medium effort enhancements (optional, can defer):**

**3B.1: Standardize Navigation States (2 hours)**
- Create `.nav-item-active` mixin
- Unify hover/focus states across all nav components
- Accessibility improvements (focus-visible states)

**3B.2-3B.6: Additional Enhancements (14 hours)**
- Benefits grid glassmorphism patterns
- Blog grid hover lift effects
- FAQ gradient borders + icon rotations
- Onboarding steps gradient connectors
- Timeline process SVG gradients + parallax

---

## Success Criteria

### Phase 1: v4.0 Design Language Unification ✅

**Visual Consistency:**
- [ ] ALL 34 sections follow v4.0 design language
- [ ] ALL icons have gradient circle backgrounds (no raw `<i>` tags)
- [ ] Color distribution: 50% emerald, 30% terracotta, 20% others site-wide
- [ ] Glassmorphism or gradient borders on all cards
- [ ] Consistent animations (staggered entrance, hover effects)

**Technical:**
- [ ] Build time maintained <3s
- [ ] CSS bundle <75KB gzipped
- [ ] WCAG AA accessibility compliance
- [ ] 60fps animations
- [ ] Zero content migration required

**User Experience:**
- [ ] Website feels cohesive (no design bifurcation)
- [ ] Warm, professional psychology practice aesthetic
- [ ] Pages look like credentials/values-compass sections (NOT like old problem-empathy/timeline)

### Phase 2: Font Upgrade ✅
- [ ] Font pairing scores >40/50
- [ ] Readability 9+/10 for long-form content
- [ ] Distinctiveness 7+/10
- [ ] Performance impact <10KB

### Phase 3A: Quick Wins ✅
- [ ] Icon violations fixed (0 raw tags)
- [ ] Hardcoded values eliminated
- [ ] Hero + contact cards enhanced

### Phase 3B: Full Consistency (OPTIONAL) ✅
- [ ] Navigation states standardized
- [ ] All 6 legacy components upgraded
- [ ] Overall consistency score 9.5+/10

---

## Effort Estimation & Timeline

### Time Breakdown

| Phase | Tier/Task | Hours | Deliverables |
|-------|-----------|-------|--------------|
| **PHASE 1** | **v4.0 Unification** | **44** | |
| TIER 0 | Foundation | 8 | Color system, icon system, card system, helpers |
| TIER 1 | Atoms | 4 | Icon + heading atoms with v4.0 support |
| TIER 2 | Sections | 20 | 29 sections upgraded (6+8+6 hours by group) |
| TIER 3 | SCSS | 12 | Component SCSS files, utilities, imports |
| 1D-REVISED | Auto-Color | (integrated) | Smart color distribution (part of TIER 0-3) |
| **PHASE 2** | **Font Upgrade** | **4-5** | Superior typography |
| **PHASE 3A** | **Quick Wins** | **(integrated)** | Part of Phase 1 TIER 2-3 |
| **PHASE 3B** | **Full Consistency** | **16** | Optional enhancements |
| **TOTAL** | | **48-49 core** | **~2 weeks** |
| | | **64-65 with 3B** | **~2.5 weeks** |

### Phased Rollout Strategy

**WEEK 1 (25 hours):**
- Days 1-2: TIER 0 Foundation (8 hours)
- Days 3-4: TIER 1 Atoms + 3 pilot sections (10 hours)
  - Pilot: problem-empathy, timeline-process, benefits-grid
- Day 5: Visual QA, stakeholder review, gather feedback (7 hours)

**WEEK 2 (25 hours):**
- Days 1-2: Complete TIER 2 remaining sections (13 hours)
- Days 3-4: TIER 3 SCSS files (12 hours)
- Day 5: TIER 4 Testing & validation (6 hours)

**OPTIONAL WEEK 3 (16 hours):**
- Phase 3B full consistency enhancements

**PHASE 2 (Font) - Parallel or Sequential:**
- Can run parallel to TIER 2-3 (independent changes)
- Or sequential after Phase 1 complete

---

## File Modification Inventory

### New Files (15+)

**Foundation:**
- `assets/scss/_color-system.scss` (~150 lines)
- `assets/scss/_icon-system.scss` (~100 lines)
- `assets/scss/_card-system.scss` (~80 lines)
- `assets/scss/_design-patterns.scss` (~80 lines)
- `layouts/partials/meta/section-color-index.html` (~50 lines)
- `layouts/partials/meta/_color-strategy.html` (~100 lines)

**Component SCSS:**
- `assets/scss/components/_problem-empathy.scss`
- `assets/scss/components/_timeline-process.scss` (REPLACE existing)
- `assets/scss/components/_method-tabs.scss` (REPLACE existing)
- `assets/scss/components/_benefits-grid.scss`
- `assets/scss/components/_testimonials.scss`
- `assets/scss/components/_faq.scss`
- `assets/scss/components/_hero-breadcrumb.scss`
- `assets/scss/components/_contact-info-cards.scss`

**Testing/Docs:**
- `content/test/color-test.md`
- `scripts/audit-color-distribution.sh`
- `docs/v4-color-system.md`

### Modified Files (40+)

**Atoms (2):**
- `layouts/partials/atoms/icon.html` (add withWrapper params)
- `layouts/partials/atoms/heading.html` (add colorVariant params)

**Molecules (3+):**
- `layouts/partials/molecules/card.html` (add iconWrapper, headingColorVariant params)
- `layouts/partials/molecules/footer-nav.html` (fix social icons)
- Other molecules as needed

**Sections (29):**
All 29 legacy sections updated with:
- Gradient icon circles
- Heading color rotation
- Glassmorphism/gradient border cards
- Staggered animations

**SCSS (5+):**
- `assets/scss/_design-system.scss` (add imports)
- `assets/scss/components/_components.scss` (add imports)
- `assets/scss/_utilities.scss` (add auto-color utilities)
- `assets/scss/style.scss` (import design-patterns)
- `assets/scss/_sections.scss` (fix hardcoded values)

**Documentation (2):**
- `CLAUDE.md` (add Automatic Color Distribution section)
- `PROJECT.md` (update v4.0 features)

**Total:** ~55 files, ~1500+ lines changed

---

## Risks & Mitigation

**RISK 1: Breaking Changes to Existing Pages**
- **Mitigation:** Backward compatible fallback chains, gradual rollout with pilot sections
- **Rollback:** Can revert individual sections without affecting others

**RISK 2: Build Time Increase**
- **Mitigation:** Use SCSS variables (compile-time) instead of runtime calculations where possible
- **Target:** Maintain <3s builds

**RISK 3: CSS Bundle Size Bloat**
- **Mitigation:** Use mixins (avoid duplication), purge unused CSS, gzip compression
- **Target:** +15-20KB max (acceptable for 29 sections upgraded)

**RISK 4: Color Distribution Edge Cases**
- **Mitigation:** Test pages with 1-12 sections, provide manual override, document fallback
- **Rollback:** Can adjust color algorithm without touching templates

**RISK 5: Accessibility Regression**
- **Mitigation:** Run axe audit after each tier, verify color contrast, test screen readers
- **Quality Gate:** Must pass WCAG AA before proceeding to next tier

**RISK 6: Design Token Regression**
- **Mitigation:** Week 10 achieved 100% token compliance, all new code uses tokens exclusively
- **Testing:** Grep for hardcoded values before merge

---

## Quality Gates

**Gate 1 (After TIER 0):**
- [ ] Color assignment functions work correctly
- [ ] CSS custom properties apply to sections
- [ ] No build errors, no visual regressions yet

**Gate 2 (After TIER 1):**
- [ ] Icon atom supports `withWrapper` param
- [ ] Heading atom supports `colorVariant` param
- [ ] Backward compatibility verified

**Gate 3 (After Pilot Sections):**
- [ ] 3 pilot sections show color variety (50-30-20)
- [ ] Gradient circles render correctly
- [ ] Glassmorphism effects work
- [ ] Animations smooth (60fps)
- [ ] No accessibility regressions

**Gate 4 (After All Sections):**
- [ ] Color distribution audit passes
- [ ] All 29 sections enhanced
- [ ] Build time <3s
- [ ] CSS bundle <75KB gzipped
- [ ] WCAG AA compliance maintained

---

## Documentation Updates

### CLAUDE.md Additions

**New Section: "Automatic Color Distribution (v4.1+)"**

```markdown
## Automatic Color Distribution (v4.1+)

ALL sections automatically receive color assignments (50% emerald, 30% terracotta, 20% others).

**Zero Configuration Required:**
```yaml
# No color configuration needed!
problem_empathy:
  challenges:
    - title: "Challenge 1"  # Auto: emerald icon + heading
    - title: "Challenge 2"  # Auto: terracotta icon + heading
    - title: "Challenge 3"  # Auto: teal icon + heading
    - title: "Challenge 4"  # Auto: amber icon + heading
```

**Manual Override (Optional):**
```yaml
problem_empathy:
  color_theme: "warm"  # Section-level override (75% terracotta)
  challenges:
    - title: "Challenge 1"
      icon_variant: "premium"  # Item-level override
```

**Available Color Themes:**
- `default` - 50-30-20 distribution (balanced)
- `warm` - 75% terracotta/coral (personal, approachable)
- `professional` - 75% emerald (trust, expertise)
- `badge` - 8-color rotation (maximum variety)

**Benefits:**
- ✅ Zero configuration (new pages automatically balanced)
- ✅ Future-proof (works for 10 or 1000 pages)
- ✅ Flexible (can override when needed)
- ✅ Scalable (color distribution is a solved design system feature)
```

### v4.0 Design Language Specification

**Create:** `docs/v4-design-language-spec.md`

Complete specification including:
- Color distribution algorithm (position-based 6-item pattern)
- Typography color system (headings rotate colors)
- Icon treatment standards (gradient circles for ALL icons)
- Card/container styling (glassmorphism vs gradient borders)
- Spacing & rhythm (organic gaps, asymmetric layouts)
- Animation standards (entrance, hover, scroll effects)

---

## Next Actions

### Immediate (Week 1)

**Day 1-2:**
1. ✅ Review and approve this comprehensive plan
2. Begin TIER 0 (foundation) - 8 hours
   - Create color system SCSS
   - Create icon system SCSS
   - Create card system SCSS
   - Create Hugo template helpers

**Day 3-4:**
3. Complete TIER 1 (atoms) - 4 hours
4. Update 3 pilot sections - 6 hours
   - problem-empathy
   - timeline-process
   - benefits-grid

**Day 5:**
5. Visual QA on pilot sections
6. Stakeholder review
7. Gather feedback
8. Decide: Proceed with remaining sections or adjust approach

### After Completion

**Phase 1 Complete:**
- Design language unified across all 34 sections
- Color distribution is a solved problem
- Future pages automatically inherit v4.0 styling

**Phase 2 (Font):**
- Can proceed with typography upgrade
- Independent of Phase 1 work

**Ongoing:**
- Monitor build performance
- Update documentation as patterns evolve
- Maintain 100% design token compliance

---

## Summary

This comprehensive plan addresses the **fundamental design bifurcation** identified by the user: the website currently has 5 beautiful v4.0 sections (credentials, values-compass) and 29 generic legacy sections (problem-empathy, timeline, method-tabs) that look like they're from a different website.

**Solution:** Systematic 4-tier upgrade applying v4.0 design language (gradient icons, glassmorphism, color variety, organic shapes, animations) to ALL 34 sections, with automatic color distribution system ensuring 50-30-20 balance site-wide.

**Total Effort:** 48-49 hours core (~2 weeks), 64-65 hours with optional Phase 3B (~2.5 weeks)

**Result:** A cohesive, warm, professional psychology practice website where ALL components follow the same beautiful v4.0 design language - no more bifurcation, no more "AI slop" aesthetic, just consistent excellence across every page.

---

**Status:** Ready for Implementation
**Priority:** CRITICAL - Core design system issue
**Next Step:** Begin TIER 0 Foundation (Day 1-2)
**Expected Completion:** 2 weeks from start (core phases)
