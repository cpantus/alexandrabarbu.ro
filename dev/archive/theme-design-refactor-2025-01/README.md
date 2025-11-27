# Theme Design System Complete Refactor - Quick Start Guide

**Project**: Andromeda Hugo Theme Redesign for Psychology Practice Website
**Status**: Planning Complete ✅ | Ready to Start Phase 1
**Started**: 2025-01-19

---

## 📋 Quick Start (Next Session)

### To Resume This Project:

1. **Read this README first** (you're here!)
2. **Review OVERVIEW.md** (project goals, scope, success metrics)
3. **Check PROGRESS.md** (see current phase status)
4. **Reference CONTEXT.md** (detailed current state analysis)
5. **Reference DECISIONS.md** (design decisions and rationale)
6. **Start Phase 1** (Design System Foundation)

---

## 🎯 Project Summary (1 Minute Version)

**What**: Complete redesign of Hugo theme with new design language, consistent components, and full site structure

**Why**:
- Current design has inconsistencies (spacing, variants, animations)
- Need unified design system with no legacy baggage
- Implementing complete site structure (34 sections across 6 page types)

**Scope**:
- **10 Phases** across **9 sessions** (~12-17 hours total)
- **~150-200 files** modified/created
- **77 components** (10 atoms, 29 molecules, 4 organisms, 34 sections)

**Key Decisions**:
- ✅ New design language from scratch
- ✅ New serif + sans typography (to be selected in Phase 1)
- ✅ Refined color palette: Emerald + Terracotta + 4-6 new colors (12-14 total)
- ✅ 8pt spacing grid system
- ✅ Unified animation language (4 durations, 4 easing curves)
- ✅ All enhancements: spacing, variants, animations, responsive, microinteractions, icons

---

## 📁 Dev Docs Structure

```
dev/active/theme-design-refactor-2025-01/
├── README.md          ← You are here (quick start)
├── OVERVIEW.md        ← Project goals, scope, phases, metrics
├── CONTEXT.md         ← Current state analysis (50 components, SCSS, JS)
├── PROGRESS.md        ← Phase tracking, task checklists
└── DECISIONS.md       ← Design decisions, rationale, open questions
```

---

## 🚀 Next Actions (Session 1)

### Start Phase 1: Design System Foundation

**Goal**: Create foundational design tokens in SCSS

**Tasks** (1-2 hours):

1. **Typography System** (~30 min)
   - Research 3-5 serif + sans font pairings
   - Select fonts (professional, warm, trustworthy, readable)
   - Define font scales, weights, line heights
   - Create `assets/scss/01-settings/_tokens-typography.scss`

2. **Expanded Color Palette** (~30 min)
   - Refine emerald (#4DB380) and terracotta (#CC6B49)
   - Select 4-6 new supporting colors
   - Create 9-step scales (50-900) for all colors
   - Test WCAG AA contrast ratios
   - Define semantic mappings
   - Create `assets/scss/01-settings/_tokens-colors.scss`

3. **Spacing System** (~15 min)
   - Define 8pt grid spacing scale (1-16)
   - Define component-specific spacing
   - Create `assets/scss/01-settings/_tokens-spacing.scss`

4. **Animation Language** (~15 min)
   - Define timing values (fast/base/normal/slow)
   - Define easing curves (ease-out, ease-in-out, spring, linear)
   - Define microinteractions
   - Create `assets/scss/01-settings/_tokens-motion.scss`

5. **Icon System** (~15 min)
   - Evaluate icon libraries (Line Awesome, Lucide, Heroicons, Phosphor)
   - Select icon library
   - Define icon sizes (aligned to 8pt grid)
   - Define usage patterns
   - Create `assets/scss/01-settings/_tokens-icons.scss`

6. **Additional Tokens** (~15 min)
   - Define shadows (5 levels)
   - Define border-radius scale
   - Define gradients (if keeping)
   - Define z-index layers
   - Create `_tokens-shadows.scss`, `_tokens-borders.scss`, `_tokens-gradients.scss`, `_tokens-z-index.scss`

**Output**: 8 design token files in `assets/scss/01-settings/`

**Success Criteria**:
- ✅ Typography pair selected (serif + sans)
- ✅ 12-14 colors with 9-step scales
- ✅ 8pt spacing grid defined
- ✅ Animation timing unified
- ✅ Icon system defined
- ✅ All tokens documented
- ✅ No magic numbers

---

## 📊 Current State Snapshot

### Component Inventory (Before Refactor)
- **5 Atoms**: button, heading, icon, image, input
- **21 Molecules**: card, accordion, navigation, breadcrumb, form-field, etc.
- **2 Organisms**: header, footer
- **22 Active Sections**: hero-breadcrumb, values-compass, feature-blocks, etc.
- **13 Deprecated Sections**: In `_deprecated/` directory
- **Total**: 50 active components

### Target Inventory (After Refactor)
- **10 Atoms**: 5 refactored + 5 new
- **29 Molecules**: 21 refactored + 8 new
- **4 Organisms**: 2 refactored + 2 new
- **34 Sections**: All new for complete site structure
- **Total**: 77 components (+54% increase)

### Architecture
- **SCSS**: ITCSS + BEM (7 layers, ~50 component files)
- **JavaScript**: Vanilla JS (6 interaction files, ~10KB)
- **Multilingual**: RO (root `/`) + EN (`/en/`)
- **Performance**: Build <3s, pages <520KB, Lighthouse ≥90

---

## 🎨 Design System Preview

### Typography (To Be Selected)
**Current**: Cormorant Garamond + Source Sans 3 → **TO BE REPLACED**
**New**: Serif (headings) + Sans (body) - **TBD in Phase 1**

### Colors (To Be Expanded)
**Current**: 8 colors (Emerald, Terracotta, + 6 supporting)
**New**: 12-14 colors (Refined Emerald, Refined Terracotta, + 4-6 new)

**Suggested New Colors**:
- Calm Blue (trust, professionalism)
- Warm Sage (nature, calm, healing)
- Soft Lavender (compassion, gentleness)
- Deep Plum (depth, wisdom, premium)
- Gentle Coral (warmth, optimism)
- Neutral Taupe (grounding, sophistication)

### Spacing (New)
**8pt Grid**:
- $space-1: 8px
- $space-2: 16px
- $space-3: 24px
- $space-4: 32px
- $space-6: 48px
- $space-8: 64px
- $space-12: 96px
- $space-16: 128px

### Animation (Unified)
**Durations**:
- Fast: 150ms (button press, input focus)
- Base: 250ms (hover, color change)
- Normal: 350ms (slide-in, fade-in)
- Slow: 500ms (modal, carousel)

**Easing**:
- Ease-out: Default UI (cubic-bezier(0, 0, 0.2, 1))
- Ease-in-out: Bidirectional (cubic-bezier(0.4, 0, 0.2, 1))
- Spring: Playful (cubic-bezier(0.68, -0.55, 0.265, 1.55))
- Linear: Progress (linear)

---

## 🗂️ Site Structure (To Be Implemented)

### 6 Page Types, 34 Sections

1. **Homepage** (10 sections)
2. **About** (8 sections)
3. **Services Main** (6 sections)
4. **Individual Services** (12 sections each × 4 services)
5. **Approach** (9 sections)
6. **Resources** (10 sections)
7. **Contact** (9 sections)

See CONTEXT.md for detailed section breakdown.

---

## 📈 Progress Tracking

| Phase | Status | Progress | Time |
|-------|--------|----------|------|
| Planning | ✅ | 100% | 1h |
| Phase 1: Design Tokens | ⏸️ | 0% | 1-2h |
| Phase 2: Atoms | ⏸️ | 0% | 1-1.5h |
| Phase 3: Molecules | ⏸️ | 0% | 2-2.5h |
| Phase 4: Organisms | ⏸️ | 0% | 0.5-1h |
| Phase 5: Sections | ⏸️ | 0% | 3-4h |
| Phase 6: Content | ⏸️ | 0% | 1-1.5h |
| Phase 7: JavaScript | ⏸️ | 0% | 1h |
| Phase 8: SCSS Refinement | ⏸️ | 0% | 0.5h |
| Phase 9: Testing & QA | ⏸️ | 0% | 1-2h |
| Phase 10: Documentation | ⏸️ | 0% | 0.5-1h |

**Next**: Start Phase 1

See PROGRESS.md for detailed task checklists.

---

## 🎯 Success Metrics

### Quality Gates (Must Achieve)
- ✅ 100% design token usage (no magic numbers)
- ✅ Unified variant system (8 variants across all components)
- ✅ Consistent spacing (8pt grid adherence)
- ✅ Consistent animations (unified timing/easing)
- ✅ All 34 sections created
- ✅ Both RO + EN content complete
- ✅ Build time <3s
- ✅ WCAG AA compliance
- ✅ Lighthouse ≥90
- ✅ No console errors

### Performance Targets
- **Build**: <3 seconds
- **Page Size**: <600KB
- **CSS**: <60KB gzipped
- **JS**: <30KB gzipped
- **Lighthouse**: ≥90 (all metrics)

---

## 🛠️ Key Files to Know

### Current Architecture
- **Layouts**: `/layouts/` (atoms, molecules, organisms, sections)
- **SCSS**: `/assets/scss/` (ITCSS structure)
- **JS**: `/assets/js/` (vanilla interaction files)
- **Content**: `/content/ro/` and `/content/en/`
- **Config**: `/config/_default/`

### Documentation
- **Architecture**: `/ARCHITECTURE.md` (component structure)
- **Claude Instructions**: `/CLAUDE.md` (theme guidelines)
- **This Project**: `/dev/active/theme-design-refactor-2025-01/`

---

## ⚠️ Important Constraints

### Must Preserve
- Hugo flexible layout system
- Atomic Design pattern
- ITCSS + BEM architecture
- Multilingual support (RO + EN)
- WCAG AA accessibility
- Performance standards (<3s builds)
- Vanilla JS approach

### Can Change
- Typography (new fonts)
- Color palette (expanded)
- Spacing (introduce 8pt grid)
- Animations (unified timing)
- Component implementations (complete rebuilds)

---

## 🔍 Open Questions (Resolve in Phase 1)

### Typography
- [ ] Which serif font for headings?
- [ ] Which sans font for body?
- [ ] 4 or 5 font weights?
- [ ] Google Fonts or self-hosted?

### Colors
- [ ] Keep emerald #4DB380 or adjust?
- [ ] Keep terracotta #CC6B49 or adjust?
- [ ] Which 4-6 supporting colors exactly?

### Icons
- [ ] Which library: Line Awesome, Lucide, Heroicons, Phosphor?
- [ ] Stroke width preference?
- [ ] Keep gradient circle wrappers or new pattern?

### Design Patterns
- [ ] Glassmorphism: Keep, refine, or remove?
- [ ] Gradients: Update or remove?
- [ ] Organic shapes: Keep or new approach?
- [ ] Shadow style: Soft (current) or hard (modern)?

**Resolve all in Phase 1, Session 1**

---

## 📞 Quick Reference Commands

```bash
# Start Hugo dev server
cd /home/cere/Work/alex/alexandrabarbu.ro
hugo server --buildDrafts

# Build for production
hugo --gc --minify

# Check performance
hugo --templateMetrics

# Run from project root!
```

---

## 💡 Tips for Next Session

1. **Start fresh**: Review all 4 dev docs (takes 10 minutes)
2. **Design excellence**: Use design skill for font/color selection
3. **Be systematic**: Complete Phase 1 fully before moving to Phase 2
4. **Test as you go**: Build Hugo after each token file to verify syntax
5. **Document decisions**: Update DECISIONS.md with final choices
6. **Update PROGRESS.md**: Check off tasks as you complete them

---

## 📚 External Resources

- **Hugo Docs**: https://gohugo.io/documentation/
- **ITCSS Guide**: https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/
- **BEM Methodology**: http://getbem.com/
- **WCAG Quick Ref**: https://www.w3.org/WAI/WCAG21/quickref/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Google Fonts**: https://fonts.google.com/
- **Font Joy** (pairing): https://fontjoy.com/

---

## ✅ Planning Phase Complete

**Completed**:
- [x] Analyzed current architecture (50 components)
- [x] Defined site structure (6 page types, 34 sections)
- [x] Made design decisions (new language, typography, colors, spacing, animations)
- [x] Created comprehensive dev docs (4 files, ~300KB documentation)

**Next**: Start Phase 1 - Design System Foundation

---

**Status**: Ready to begin implementation 🚀
**Estimated Time to Complete**: 9 sessions, 12-17 hours
**Next Session**: Phase 1 (Design Tokens) - 1-2 hours

*Created: 2025-01-19*
*Ready for: Session 1 (Phase 1)*
