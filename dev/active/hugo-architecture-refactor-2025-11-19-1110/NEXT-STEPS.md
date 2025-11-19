# Next Steps - ITCSS Variable Migration & Deployment

**Created**: 2025-11-19 (Session 20)
**Status**: Ready for execution in new session
**Estimated Time**: 3 hours
**Current State**: Phase 3 complete (20 BEM components), ITCSS deployment blocked by missing variables

---

## 🎯 Objective

Complete migration of all design variables from legacy files to ITCSS Settings layer, enabling full deployment of the new ITCSS architecture.

---

## 📊 Current Architecture State

### ✅ What's Complete (Sessions 1-19)
- **Phase 1**: ITCSS directory structure (7 layers)
- **Phase 2**: Basic Settings layer (colors, typography, spacing, shadows, motion)
- **Phase 3**: 20 BEM components refactored with legacy compatibility (197KB)
- **Build Status**: Legacy architecture working (38s, 0 errors, 100 pages)

### ⚠️ What's Blocking Deployment
- **Missing Variables**: ~50+ design variables not yet migrated to Settings layer
- **Source Files**:
  - `_design-enhancements.scss` (gradients, animations, organic shapes, v4.0 features)
  - `_design-system.scss` (additional shadows, colors, system tokens)
  - `systems/_color-system.scss` (color functions, already in tools)
  - `systems/_icon-system.scss` (icon tokens, partially migrated)
  - `systems/_card-system.scss` (card tokens, partially migrated)

### 📁 File Locations
- **Legacy Entry**: `themes/andromeda-hugo/assets/scss/custom.scss` (working)
- **ITCSS Entry**: `themes/andromeda-hugo/assets/scss/main-new.scss` (ready after migration)
- **Settings Layer**: `themes/andromeda-hugo/assets/scss/01-settings/`
- **Source Files**: `themes/andromeda-hugo/assets/scss/`

---

## 🔧 Implementation Plan

### BATCH 1: Audit & Setup (30 min)

**Goal**: Identify all variables that need migration

**Commands**:
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo/assets/scss

# Extract all variable definitions
rg '^\$[a-zA-Z]' _design-enhancements.scss _design-system.scss | sort > /tmp/all-vars.txt

# Count variables per file
echo "=== DESIGN ENHANCEMENTS ===" && rg -c '^\$' _design-enhancements.scss
echo "=== DESIGN SYSTEM ===" && rg -c '^\$' _design-system.scss

# Categorize variables
rg '^\$gradient' _design-enhancements.scss > /tmp/gradients.txt
rg '^\$(shadow|glow)' _design-enhancements.scss _design-system.scss > /tmp/shadows.txt
rg '^\$(animation|transition|duration)' _design-enhancements.scss > /tmp/animations.txt
rg '^\$(border-radius|blob|organic)' _design-enhancements.scss > /tmp/shapes.txt
```

**Deliverables**:
- [ ] List of all variables to migrate (`/tmp/all-vars.txt`)
- [ ] Categorized variable lists (gradients, shadows, animations, shapes)
- [ ] Estimated count per category

---

### BATCH 2: Gradient Variables (45 min) ⚡ BLOCKING

**Goal**: Migrate all gradient definitions to unblock deployment

**Priority**: CRITICAL - `$gradient-glass-light` error blocks build

**Action Steps**:
1. **Create new token file**:
   ```bash
   touch 01-settings/_tokens-gradients.scss
   ```

2. **Extract gradients from `_design-enhancements.scss`**:
   - Look for lines starting with `$gradient-`
   - Typical variables:
     - `$gradient-warm` (emerald → terracotta)
     - `$gradient-primary`, `$gradient-secondary`
     - `$gradient-glass-light`, `$gradient-glass-dark`
     - `$gradient-radial-*`
     - Icon gradient variants

3. **File structure** (`01-settings/_tokens-gradients.scss`):
   ```scss
   // ==================================
   // GRADIENT TOKENS (v4.0 Design System)
   // ==================================
   // Layer: 01-settings (NO CSS output)
   // Purpose: Gradient definitions for v4.0 glassmorphism & enhanced components
   // Source: Migrated from _design-enhancements.scss
   //

   // ----------------------------------
   // Linear Gradients
   // ----------------------------------
   $gradient-warm: linear-gradient(135deg, #4DB380 0%, #CC6B49 100%);
   $gradient-primary: linear-gradient(135deg, #4DB380 0%, #3A9B6F 100%);
   // ... add all gradients from old file

   // ----------------------------------
   // Glassmorphism Gradients
   // ----------------------------------
   $gradient-glass-light: linear-gradient(...);
   // ... etc

   // ----------------------------------
   // Radial Gradients
   // ----------------------------------
   // ... etc
   ```

4. **Update aggregator** (`01-settings/_settings.scss`):
   ```scss
   @import 'tokens-gradients';  // Add after tokens-colors
   ```

5. **Test build**:
   ```bash
   cd /home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo

   # Swap to ITCSS (test only)
   mv custom.scss custom.scss.test-backup
   mv main-new.scss custom.scss

   # Build and check for gradient errors
   hugo --buildDrafts 2>&1 | rg "ERROR.*gradient"

   # If errors, fix them. If 0 errors, commit batch
   # Rollback for next batch:
   mv custom.scss main-new.scss
   mv custom.scss.test-backup custom.scss
   ```

**Deliverables**:
- [ ] `01-settings/_tokens-gradients.scss` created with all gradients
- [ ] `01-settings/_settings.scss` updated to import gradients
- [ ] Build test passes with 0 gradient errors
- [ ] Git commit: `feat(itcss): migrate gradient variables to Settings layer`

---

### BATCH 3: Shadow Variables (30 min)

**Goal**: Migrate additional shadow/glow variables

**Note**: Basic shadows already in `_tokens-shadows.scss`, need to add v4.0 enhancements

**Action Steps**:
1. **Extract shadows from `_design-enhancements.scss` and `_design-system.scss`**:
   ```bash
   rg '^\$(shadow|glow|elevation)' _design-enhancements.scss _design-system.scss
   ```

2. **Add to existing file** (`01-settings/_tokens-shadows.scss`):
   - Check for duplicates first
   - Add new shadow variants (glow effects, elevation levels)
   - Comment source: `// From _design-enhancements.scss v4.0`

3. **Test build** (same procedure as Batch 2)

**Deliverables**:
- [ ] `01-settings/_tokens-shadows.scss` updated with v4.0 shadows
- [ ] Build test passes with 0 shadow errors
- [ ] Git commit: `feat(itcss): migrate v4.0 shadow/glow variables`

---

### BATCH 4: Animation Variables (30 min)

**Goal**: Migrate animation timing, durations, easing functions

**Action Steps**:
1. **Extract animations**:
   ```bash
   rg '^\$(animation|transition|duration|ease|timing)' _design-enhancements.scss
   ```

2. **Update existing file** (`01-settings/_tokens-motion.scss`):
   - Add v4.0 animation variables
   - Keyframe names (if defined as variables)
   - Animation durations, delays

3. **Test build**

**Deliverables**:
- [ ] `01-settings/_tokens-motion.scss` updated
- [ ] Build test passes with 0 animation errors
- [ ] Git commit: `feat(itcss): migrate v4.0 animation variables`

---

### BATCH 5: Shape/Layout Variables (30 min)

**Goal**: Migrate organic blob shapes, border-radius presets, misc layout tokens

**Action Steps**:
1. **Extract shape variables**:
   ```bash
   rg '^\$(border-radius|blob|organic|shape)' _design-enhancements.scss
   ```

2. **Decision**: Add to `_tokens-spacing.scss` or create new `_tokens-shapes.scss`
   - If <10 variables → add to spacing
   - If 10+ variables → create new file

3. **Migrate and test**

**Deliverables**:
- [ ] Shape variables migrated to appropriate tokens file
- [ ] Build test passes
- [ ] Git commit: `feat(itcss): migrate shape/organic blob variables`

---

### BATCH 6: Remaining Variables (30 min)

**Goal**: Catch any remaining stragglers

**Action Steps**:
1. **Find unmigrated variables**:
   ```bash
   # Compare old files with new Settings layer
   comm -23 <(rg '^\$' _design-enhancements.scss _design-system.scss | sort | uniq) \
            <(rg '^\$' 01-settings/*.scss | sort | uniq)
   ```

2. **Categorize and migrate** remaining variables

3. **Final test build** with ITCSS architecture

**Deliverables**:
- [ ] All variables accounted for
- [ ] Build test passes with 0 undefined variable errors
- [ ] Git commit: `feat(itcss): complete variable migration to Settings layer`

---

### DEPLOYMENT: Swap to ITCSS Architecture (30 min)

**Goal**: Deploy new ITCSS architecture to production

**Pre-Deployment Checklist**:
- [ ] All variable migration batches complete
- [ ] Test build passes: `hugo --gc --minify --buildDrafts` (0 errors)
- [ ] Legacy backup exists: `custom.scss.legacy`
- [ ] ITCSS entry ready: `main-new.scss`
- [ ] Git working tree clean (all migrations committed)

**Deployment Steps**:
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo/assets/scss

# Final backup
cp custom.scss custom.scss.pre-itcss-deploy

# Atomic swap
mv custom.scss custom.scss.legacy
mv main-new.scss custom.scss

# Full build test
cd /home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo
rm -rf public resources .hugo_build.lock
hugo --gc --minify --buildDrafts 2>&1 | tee /tmp/hugo-build.log

# Check for errors
rg "ERROR" /tmp/hugo-build.log
# If 0 errors → SUCCESS
# If errors → investigate and fix

# Verify site
hugo server --bind 127.0.0.1 --port 1313 --buildDrafts
# Open http://127.0.0.1:1313
# Visual inspection: homepage, 2-3 service pages, blog
```

**Post-Deployment Verification**:
- [ ] Build succeeds (0 errors)
- [ ] Build time: <45 seconds
- [ ] Pages generated: ~100
- [ ] Visual regression: Key pages look identical
- [ ] Mobile responsive check
- [ ] No console errors in browser

**Deployment Commit**:
```bash
git add assets/scss/custom.scss assets/scss/main-new.scss \
        assets/scss/custom.scss.legacy \
        assets/scss/01-settings/

git commit -m "feat(architecture): deploy ITCSS architecture

BREAKING CHANGE: Complete migration to ITCSS 7-layer architecture

- Settings: All design variables consolidated in 01-settings/
- Tools: Mixins and functions in 02-tools/
- Generic: CSS resets in 03-generic/
- Objects: Layout primitives in 05-objects/
- Components: 20 BEM components in 06-components/
- Entry: custom.scss now uses ITCSS structure (main-new.scss deployed)

Phase 3 complete: 20/20 components refactored to BEM
Variable migration: All gradients, shadows, animations migrated

Legacy backup: custom.scss.legacy (rollback available)
Build verified: 0 errors, 100 pages, <45s build time
"
```

**Rollback Procedure** (if issues found):
```bash
# Quick rollback
mv custom.scss main-new.scss
mv custom.scss.legacy custom.scss
hugo --gc --minify --buildDrafts
# Site restored to working state
```

---

## 🚨 Critical Success Factors

**DO**:
- ✅ Work in small batches (test after each)
- ✅ Keep legacy files until deployment confirmed
- ✅ Git commit after each successful batch
- ✅ Test build after every variable batch
- ✅ Add comments showing variable origins
- ✅ Use `rg` to find all variable usages before moving

**DON'T**:
- ❌ Move all variables at once (too risky)
- ❌ Delete old files until ITCSS is deployed and verified
- ❌ Skip build tests between batches
- ❌ Forget to update `01-settings/_settings.scss` aggregator
- ❌ Rush deployment without full visual regression check

---

## 📝 Session Start Template

**Copy this to new session start**:

```
I'm continuing the Hugo ITCSS architecture refactoring project.

Context location: dev/active/hugo-architecture-refactor-2025-11-19-1110/

Current status (Session 20):
- Phase 3 complete: 20 BEM components refactored (197KB)
- ITCSS deployment BLOCKED by missing variables
- Need to migrate ~50+ variables from legacy files to Settings layer

Next action: Start BATCH 1 (Audit & Setup) from NEXT-STEPS.md

Working directory: /home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo/assets/scss

Please:
1. Read NEXT-STEPS.md
2. Start BATCH 1: Audit & Setup
3. Execute batches 2-6 incrementally
4. Deploy when all variables migrated
```

---

## 📚 Reference Files

**Dev Docs**:
- `CONTEXT.md` - Session history, architecture state
- `NEXT-STEPS.md` - This file (implementation plan)
- `PROGRESS.md` - Detailed task tracking (if exists)

**Source Files to Migrate From**:
- `themes/andromeda-hugo/assets/scss/_design-enhancements.scss` (v4.0 variables)
- `themes/andromeda-hugo/assets/scss/_design-system.scss` (system tokens)

**Target Files (ITCSS Settings Layer)**:
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-colors.scss`
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-gradients.scss` (NEW - create)
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-shadows.scss`
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-motion.scss`
- `themes/andromeda-hugo/assets/scss/01-settings/_tokens-spacing.scss`
- `themes/andromeda-hugo/assets/scss/01-settings/_settings.scss` (aggregator - update)

**Build Commands**:
```bash
# From theme directory
cd /home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo

# Test build (quick)
hugo --buildDrafts 2>&1 | rg ERROR

# Full build (production)
rm -rf public resources .hugo_build.lock && hugo --gc --minify --buildDrafts

# Dev server
hugo server --bind 127.0.0.1 --port 1313 --buildDrafts
```

---

**Status**: ✅ Variable migration complete (Session 22)
**Next Session**: Fix Hugo template pipeline error, deploy ITCSS
**Estimated Completion**: 30 minutes to fix template + deploy
