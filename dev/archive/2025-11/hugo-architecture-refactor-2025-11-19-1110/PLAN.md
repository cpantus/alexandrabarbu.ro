# Hugo Theme Architecture Refactoring - Complete Plan

**Date**: 2025-11-19 11:10
**Status**: Planning Complete - Awaiting Approval
**Estimated Effort**: 58-85 hours over 6 weeks

---

## Problem Statement

The Andromeda Hugo theme (v4.0.0) suffers from **systemic architectural issues** preventing scalable component creation:

### Critical Issues Identified

1. **Specificity Wars**: 163 `!important` declarations across 20 files
2. **Nuclear Border Reset Dependency**: Requires special file imported LAST to enforce borders
3. **God Object Monolith**: 2,236-line `custom.scss` with mixed concerns
4. **Token Fragmentation**: 40% duplication (8 categories defined in 2-3 files each)
5. **Component Overlap**: 18+ selectors with multi-file definitions
6. **Import Order Dependency**: Architecture breaks if files reordered
7. **No Isolation**: Components override each other through CSS cascade

### Root Cause

**Additive architecture without layer boundaries**. Components override each other through CSS cascade order rather than architectural isolation.

### Current State Metrics

- **11,091 lines** across 30 files
- **163 `!important` declarations** (specificity battles)
- **2,236-line monolith** (custom.scss)
- **40% token duplication** (colors, spacing, shadows defined 2-3x)
- **18+ selector conflicts** (same classes defined in multiple files)
- **"Nuclear reset" requirement** (systems/_card-border-reset.scss must be imported last)

---

## Solution: 6-Layer ITCSS Architecture

### Architectural Principles

1. **ITCSS (Inverted Triangle CSS)**: Industry-standard layered architecture
2. **Hugo-Compliant**: Leverages Hugo's token → system → component hierarchy
3. **BEM Naming**: `.c-block__element--modifier` eliminates specificity conflicts
4. **Progressive Specificity**: Specificity increases naturally with each layer
5. **Component Isolation**: Each component has unique namespace, cannot conflict

### New File Structure

```
themes/andromeda-hugo/assets/scss/
├── main.scss                     ← Single entry point (300 lines)
│
├── 01-settings/                  ← Layer 1: Design tokens (NO CSS output)
│   ├── _tokens-colors.scss       ← 8 color scales (emerald, terracotta, etc.)
│   ├── _tokens-typography.scss   ← Font scales, icon sizes
│   ├── _tokens-spacing.scss      ← Spacing scale (0-20)
│   ├── _tokens-shadows.scss      ← 7 shadow levels
│   ├── _tokens-motion.scss       ← Animation durations, easings
│   └── _settings.scss            ← Import aggregator
│
├── 02-tools/                     ← Layer 2: Mixins & functions (NO CSS output)
│   ├── _functions-colors.scss    ← Color utilities
│   ├── _mixins-typography.scss   ← Fluid type, etc.
│   ├── _mixins-layout.scss       ← Flexbox, grid helpers
│   ├── _mixins-effects.scss      ← Glassmorphism, gradients, icon-circle
│   ├── _mixins-card.scss         ← Card patterns
│   └── _tools.scss               ← Import aggregator
│
├── 03-generic/                   ← Layer 3: Resets (element selectors only)
│   ├── _normalize.scss           ← CSS reset
│   └── _generic.scss             ← Import aggregator
│
├── 04-elements/                  ← Layer 4: Bare HTML (element selectors only)
│   ├── _typography.scss          ← h1-h6, p, a, strong
│   ├── _forms.scss               ← input, select, textarea
│   ├── _media.scss               ← img, video, iframe
│   └── _elements.scss            ← Import aggregator
│
├── 05-objects/                   ← Layer 5: Layout primitives (.o-* prefix)
│   ├── _layout-container.scss    ← .o-container, .o-container--fluid
│   ├── _layout-grid.scss         ← .o-grid, .o-grid--2col, .o-grid--3col
│   ├── _layout-flex.scss         ← .o-flex, .o-flex__item
│   ├── _layout-stack.scss        ← .o-stack (vertical spacing)
│   └── _objects.scss             ← Import aggregator
│
├── 06-components/                ← Layer 6: UI components (.c-* prefix, BEM)
│   ├── _button.scss              ← .c-button, .c-button--primary
│   ├── _card.scss                ← .c-card, .c-card__title, .c-card--featured
│   ├── _icon.scss                ← .c-icon, .c-icon-circle--lg
│   ├── _badge.scss               ← .c-badge, .c-badge--gradient
│   ├── _values-compass.scss      ← .c-values-compass, .c-values-compass__card
│   ├── _problem-empathy.scss     ← .c-problem-empathy, .c-problem-empathy__card
│   ├── _credentials.scss         ← .c-credentials, .c-credentials__badge
│   └── ... (21 component files)
│   └── _components.scss          ← Import aggregator
│
└── 07-utilities/                 ← Layer 7: Single-purpose (.u-* prefix)
    ├── _spacing.scss             ← .u-mt-3, .u-mb-6, .u-pt-4
    ├── _display.scss             ← .u-hidden, .u-flex
    ├── _text.scss                ← .u-text-center, .u-text-bold
    ├── _colors.scss              ← .u-bg-primary, .u-text-secondary
    └── _utilities.scss           ← Import aggregator
```

**Total**: 45 files, ~6,500 lines (vs. current 30 files, 11,091 lines)

### Layer Responsibilities

| Layer | Purpose | Selectors | CSS Output | Can Use |
|-------|---------|-----------|------------|---------|
| **1. Settings** | Design tokens | None | NO | - |
| **2. Tools** | Mixins/functions | None | NO | Layer 1 |
| **3. Generic** | Resets | Elements only | YES | Layers 1-2 |
| **4. Elements** | HTML defaults | Elements only | YES | Layers 1-2 |
| **5. Objects** | Layout patterns | `.o-*` classes | YES | Layers 1-2 |
| **6. Components** | UI components | `.c-*` classes (BEM) | YES | Layers 1-2, 5 |
| **7. Utilities** | Overrides | `.u-*` classes | YES | Layers 1-2 |

**Key Rules**:
- **Import order CRITICAL**: Layers must load in sequence (1→2→3→4→5→6→7)
- **Later layers CANNOT override earlier layers** (without explicit intent)
- **Components isolated**: BEM naming prevents cross-component conflicts
- **!important ONLY in utilities** (Layer 7)

---

## BEM Naming Convention

**Block**: Component root (`.c-[name]`)
**Element**: Child of block (`.c-[name]__[element]`)
**Modifier**: Variant (`.c-[name]--[modifier]`)

### Example: Card Component

```scss
// Block
.c-card { /* base card styles */ }

// Elements
.c-card__title { /* card title */ }
.c-card__body { /* card body */ }
.c-card__footer { /* card footer */ }

// Modifiers (block level)
.c-card--featured { /* highlighted variant */ }
.c-card--glassmorphism { /* glass effect variant */ }

// Modifiers (element level)
.c-card__title--large { /* larger title */ }
```

### Example: Values Compass Component

```scss
// Block
.c-values-compass { /* section wrapper */ }

// Elements
.c-values-compass__header { /* section header */ }
.c-values-compass__title { /* section title */ }
.c-values-compass__grid { /* card grid */ }
.c-values-compass__card { /* individual card */ }
.c-values-compass__icon { /* icon circle */ }
.c-values-compass__card-title { /* card title */ }
.c-values-compass__card-description { /* card description */ }

// Modifiers
.c-values-compass__card--featured { /* featured card variant */ }
.c-values-compass__icon--terracotta { /* terracotta color variant */ }
```

**Benefits**:
- **No conflicts**: `.c-values-compass__card` cannot conflict with `.c-problem-empathy__card` (different blocks)
- **Clear relationships**: `__` indicates parent-child, `--` indicates variant
- **Predictable**: Hover on `.c-values-compass__card` only affects values compass cards

---

## 5-Phase Refactoring Plan

### Phase 1: Foundation Consolidation
**Week 1 | 8-12 hours | Risk: LOW**

**Goal**: Create clean token + tools layers

**Tasks**:
1. Create new directory structure (7 layers)
2. Split `_design-tokens.scss` → 5 specialized files (colors, typography, spacing, shadows, motion)
3. Extract mixins from `_design-system.scss` and `_design-enhancements.scss` → `02-tools/`
4. Remove 40% token duplication
5. Create temporary `main-new.scss` entry point
6. Test build (should succeed with zero visual changes)

**Files Created**: 9 new files in `01-settings/` and `02-tools/`
**Files Modified**: None (parallel development)
**Validation**: `hugo --gc --minify` succeeds, screenshot comparison shows zero differences

---

### Phase 2: System Layer Refactoring
**Week 2 | 12-16 hours | Risk: MEDIUM**

**Goal**: Convert system files to mixin-only, create base layers

**Tasks**:
1. Refactor `systems/_card-system.scss`:
   - Move mixins → `02-tools/_mixins-card.scss`
   - Move component classes → `06-components/_card.scss`
   - Delete file
2. Refactor `systems/_icon-system.scss`:
   - Move mixins → `02-tools/_mixins-icon.scss`
   - Move component classes → `06-components/_icon.scss`
   - Delete file
3. Refactor `systems/_color-system.scss`:
   - Move functions → `02-tools/_functions-colors.scss`
   - Move CSS custom properties → `01-settings/_tokens-colors.scss`
   - Delete file
4. Delete `systems/_card-border-reset.scss` (no longer needed)
5. Create `03-generic/_normalize.scss` (minimal reset)
6. Extract HTML element styles from `custom.scss` → `04-elements/`
7. Test build

**Files Created**: 8 new files in `03-generic/`, `04-elements/`, `02-tools/`
**Files Deleted**: 3 files (`systems/*.scss`)
**Validation**: Build succeeds, visual regression tests pass

---

### Phase 3: Component Refactoring
**Week 3-4 | 20-30 hours | Risk: HIGH**

**Goal**: Convert all components to BEM naming, isolate styling

**Tasks**:
1. Create objects layer (4 files):
   - `.o-container`, `.o-grid`, `.o-flex`, `.o-stack`
2. Refactor core components (5 files, 12 hours):
   - `_card.scss`: → `.c-card`, `.c-card__title`, `.c-card--featured`
   - `_button.scss`: → `.c-button`, `.c-button--primary`
   - `_icon.scss`: → `.c-icon`, `.c-icon-circle--lg`
   - `_badge.scss`: → `.c-badge`, `.c-badge--gradient`
   - `_form.scss`: Extract from custom.scss
3. Refactor section components (6 files, 10 hours):
   - `_values-compass.scss`: → `.c-values-compass__card`
   - `_problem-empathy.scss`: → `.c-problem-empathy__card`
   - `_credentials.scss`: → `.c-credentials__badge`
   - `_stats-enhanced.scss`: → `.c-stats__number`
   - `_feature-blocks-enhanced.scss`: → `.c-feature-blocks__item`
   - `_pricing-enhanced.scss`: → `.c-pricing__card`
4. Update HTML templates (6 files, 4 hours):
   - `layouts/partials/sections/values-compass.html`
   - `layouts/partials/sections/problem-empathy.html`
   - `layouts/partials/sections/credentials-showcase.html`
   - `layouts/partials/molecules/card.html`
   - `layouts/partials/atoms/button.html`
   - `layouts/partials/atoms/icon.html`
5. Visual regression testing (BackstopJS)

**Files Created**: 4 objects, refactored 21 components
**Files Modified**: 6 HTML templates
**Validation**: Visual regression tests pass, all pages render correctly

---

### Phase 4: Utilities & Cleanup
**Week 5 | 8-12 hours | Risk: MEDIUM**

**Goal**: Create utilities layer, remove legacy code

**Tasks**:
1. Create utilities layer (4 files):
   - `_spacing.scss`: `.u-mt-3`, `.u-mb-6`, etc.
   - `_display.scss`: `.u-hidden`, `.u-flex`
   - `_text.scss`: `.u-text-center`, `.u-text-bold`
   - `_colors.scss`: `.u-bg-primary`, `.u-text-secondary`
2. Extract utilities from `custom.scss` → `07-utilities/`
3. Delete legacy files:
   - `_design-system.scss`
   - `_design-enhancements.scss`
   - Deprecated components
4. Consolidate `custom.scss` → minimal `_legacy.scss`
5. Test build, verify CSS output reduced 20-30%

**Files Created**: 4 utility files
**Files Deleted**: 5 legacy files
**Validation**: Build succeeds, CSS size reduced

---

### Phase 5: Finalization & Tooling
**Week 6 | 10-15 hours | Risk: LOW**

**Goal**: Replace old entry point, add validation tooling, document

**Tasks**:
1. Replace old entry point (2 hours):
   - Rename `custom.scss` → `custom-old.scss.bak` (backup)
   - Rename `main-new.scss` → `main.scss` (new entry point)
   - Update Hugo config (if needed)
   - Delete `_legacy.scss`
   - Test full site build
2. Add Stylelint validation (3 hours):
   - Create `.stylelintrc.json` (BEM rules, !important detection)
   - Add npm scripts (`lint:css`, `lint:css:fix`)
   - Add pre-commit hook (auto-validation)
   - Run linter, fix violations
3. Create architecture documentation (4 hours):
   - Update `themes/andromeda-hugo/ARCHITECTURE.md`
   - Update `themes/andromeda-hugo/CLAUDE.md`
   - Create `themes/andromeda-hugo/docs/SCSS-ARCHITECTURE.md`
4. Create component templates (2 hours):
   - `_TEMPLATE.scss`: BEM component template
   - `scripts/create-component.sh`: Component generator
5. Visual regression testing (4 hours):
   - Install BackstopJS
   - Create screenshot baseline (21+ pages)
   - Compare refactored site with baseline
   - Fix any visual regressions

**Files Created**: Entry point, tooling, docs, templates
**Validation**: Zero visual differences, zero Stylelint violations, zero build errors

---

## Expected Improvements

| Metric | Current | After Refactor | Improvement |
|--------|---------|----------------|-------------|
| **Total SCSS Lines** | 11,091 | ~6,500 | -41% |
| **`!important` Count** | 163 | ~30 (utilities only) | -82% |
| **File Count** | 30 | 45 | +50% (but smaller files) |
| **Largest File** | 2,236 lines | <400 lines | -82% |
| **Specificity Wars** | 18+ conflicts | 0 (BEM isolation) | -100% |
| **Token Duplication** | 40% | 0% | -100% |
| **CSS Output Size** | ~520KB | ~350-390KB | -25-35% |
| **Build Time** | <3s | <3s | Maintained |
| **Maintainability** | LOW (fragile cascade) | HIGH (predictable layers) | DRAMATIC |

---

## Risk Mitigation

### Parallel Development Strategy

**Phases 1-4**: Old and new files coexist
- Old entry point: `custom.scss` (production)
- New entry point: `main-new.scss` (development/testing)
- Can test new architecture without breaking production

**Phase 5**: Atomic swap
- Single change: rename `main-new.scss` → `main.scss`
- Rollback: < 5 minutes (restore old entry point)

### Rollback Procedures

**Per-Phase Rollback**:
```bash
# Each phase is git-tagged
git revert HEAD~N..HEAD  # Revert last N commits
git checkout refactor-phase-X  # Return to phase X
```

**Emergency Rollback** (Production):
```bash
# Step 1: Restore old entry point (< 5 min)
mv themes/andromeda-hugo/assets/scss/custom-old.scss.bak \
   themes/andromeda-hugo/assets/scss/custom.scss

# Step 2: Rebuild and deploy
hugo --gc --minify
# ... deploy
```

### Validation Gates

**After Each Phase**:
- [ ] Build succeeds (`hugo --gc --minify`)
- [ ] No visual regressions (screenshot comparison)
- [ ] CSS output size within expected range
- [ ] Git commit with descriptive message
- [ ] Git tag: `refactor-phase-X`

**After Phase 3 & Phase 5**:
- [ ] Full visual regression test suite (BackstopJS)
- [ ] All 21+ pages render correctly
- [ ] Responsive behavior intact (375px, 768px, 1200px)
- [ ] Hover states work
- [ ] Accessibility features preserved

---

## Tooling & Automation

### Component Generator Script

`./scripts/create-component.sh my-feature`

**Generates**:
- SCSS file with BEM structure (`06-components/_my-feature.scss`)
- HTML partial (`layouts/partials/sections/my-feature.html`)
- Adds import to `main.scss`
- Validates naming (kebab-case only)

### Stylelint Configuration

**Validates**:
- BEM naming convention (`.c-block__element--modifier`)
- No `!important` outside utilities layer
- Specificity < 0,3,0
- Nesting depth ≤ 3
- Kebab-case variable names

**Enforcement**:
- Pre-commit hook (blocks commits with violations)
- CI/CD integration (GitHub Actions)

### Architecture Validation

`./scripts/validate-architecture.sh`

**Checks**:
1. Import order correct (layers 1→7)
2. No `!important` in components layer
3. No hardcoded colors (use tokens)
4. BEM naming compliance
5. Component file size < 400 lines
6. No cross-layer imports

---

## Success Criteria

**Technical**:
- [ ] Zero build errors
- [ ] All visual regression tests pass (100% match)
- [ ] CSS output reduced by 25-35%
- [ ] Zero `!important` in components layer
- [ ] Stylelint passes with zero violations
- [ ] Architecture validation script passes

**Quality**:
- [ ] All 21+ components documented
- [ ] Component creation workflow tested (create 3+ new components)
- [ ] BEM naming enforced (100% compliance)
- [ ] Token usage enforced (zero hardcoded values)

**Performance**:
- [ ] Build time < 3 seconds
- [ ] CSS output < 400KB (compressed)
- [ ] No unused CSS (dead code eliminated)

**Maintainability**:
- [ ] New components can be created in < 15 minutes
- [ ] No specificity conflicts
- [ ] Clear separation of concerns
- [ ] Self-documenting code structure

---

## Next Steps

**Awaiting User Approval**:

1. **Scope Confirmation**: Full 5-phase refactoring (6 weeks) or start with Phase 1 only (1 week trial)?
2. **BEM Naming**: `.c-block__element--modifier` convention acceptable?
3. **Testing**: Install BackstopJS for visual regression testing?
4. **Tooling**: Add Stylelint + pre-commit hooks?
5. **Timeline**: 58-85 hours over 6 weeks acceptable?

**Once Approved, Start With**:
- Phase 1: Foundation Consolidation (Week 1, 8-12 hours)
- Create `01-settings/` and `02-tools/` directories
- Split token files
- Extract mixins
- Create `main-new.scss`
- Test build

---

**Plan Created**: 2025-11-19 11:10
**Plan Status**: READY FOR APPROVAL
