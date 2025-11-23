# Phase 6: Legacy SCSS Cleanup - Future Work

**Status**: Documented (deferred to future task)
**Est. Time**: 2-3 hours
**Complexity**: Medium (requires careful testing)
**Priority**: Low (non-blocking for contact form functionality)

---

## Why Deferred

The contact form migration (Phases 1-5) is **complete and working**:
- ✅ Email sending confirmed
- ✅ Security enhancements active (reCAPTCHA v3 + honeypot + time validation)
- ✅ BEM architecture compliance
- ✅ Legacy template removed (246 lines)
- ✅ Build time: <600ms

Phase 6 cleanup is **independent** and can be done separately without affecting contact form functionality.

---

## Cleanup Scope (128KB of legacy code)

### 1. Remove Legacy SCSS Imports (main-new.scss)

**Lines to remove**:
- Line 84: `@import 'components/headings';` (legacy, check if still needed)
- Line 85: `@import 'components/contact-form-enhanced';` (redundant, BEM version already imported)
- Line 98: `@import 'systems/card-border-reset';` (nuclear border reset, check impact)

### 2. Delete Legacy Directories

**Directory: themes/andromeda-hugo/assets/scss/systems/ (56KB)**
Files:
- `_card-border-reset.scss` (3.7KB) - Nuclear reset for card borders
- `_card-system.scss` (15KB) - Legacy card system
- `_color-system.scss` (15KB) - Legacy color mappings
- `_icon-system.scss` (14KB) - Legacy icon system

**Directory: themes/andromeda-hugo/assets/scss/components/ (72KB)**
Files:
- `_blog-grid.scss` (1.4KB)
- `_contact-form-enhanced.scss` (6.5KB) - **LEGACY VERSION** (BEM version in 06-components/)
- `_faq.scss` (6.6KB)
- `_headings.scss` (2.0KB)
- `_newsletter-signup.scss` (1.4KB)
- `_privacy-guarantee.scss` (1.2KB)
- `_sections.scss` (11KB)
- `_signup-form.scss` (1.4KB)
- `_values-intro.scss` (1.4KB)
- `_video-popup.scss` (1.4KB)
- Plus: `atoms/`, `molecules/`, `organisms/` subdirectories

### 3. Check for BEM Equivalents

Before deleting each legacy file, verify if a BEM version exists in `06-components/`:

```bash
# Check what's in BEM components
ls themes/andromeda-hugo/assets/scss/06-components/ | rg "(blog-grid|faq|headings|newsletter|privacy|sections|signup|values|video)"
```

**If BEM version exists**: Safe to delete legacy
**If no BEM version**: May still be in use, needs investigation

---

## Risks & Mitigation

### Risk 1: Breaking Existing Pages
**Impact**: Pages may lose styling if legacy components still in use
**Mitigation**:
- Create git tag before cleanup: `git tag before-phase-6-cleanup`
- Test all pages after each deletion
- Check build output for undefined variable/mixin errors
- Rollback if any page breaks

### Risk 2: Missing Dependencies
**Impact**: Some BEM components may depend on legacy mixins/variables
**Mitigation**:
- Search for imports: `rg "@import.*systems" themes/andromeda-hugo/assets/scss/`
- Extract needed mixins before deleting source files
- Test build after each file removal

### Risk 3: @extend Compatibility Blocks
**Impact**: 178 @extend blocks across 20 BEM component files
**Mitigation**:
- These provide backward compatibility for old HTML class names
- Removing them breaks non-BEM HTML templates
- Check if any non-BEM HTML templates still exist before removing

---

## Implementation Steps

### Step 1: Create Backup
```bash
git add -A
git commit -m "checkpoint: before Phase 6 SCSS cleanup"
git tag before-phase-6-cleanup
```

### Step 2: Inventory Legacy vs BEM

Create a mapping of legacy → BEM equivalents:

| Legacy File | BEM Equivalent | Status |
|-------------|----------------|--------|
| components/contact-form-enhanced.scss | 06-components/_contact-form-enhanced.scss | ✅ BEM exists |
| components/headings.scss | 06-components/_headings.scss | ❓ Check |
| components/blog-grid.scss | 06-components/_blog-grid.scss | ✅ BEM exists |
| ... | ... | ... |

```bash
# Generate this mapping
for file in themes/andromeda-hugo/assets/scss/components/*.scss; do
  basename=$(basename $file)
  if [ -f "themes/andromeda-hugo/assets/scss/06-components/$basename" ]; then
    echo "$basename → BEM exists ✅"
  else
    echo "$basename → No BEM version ❓"
  fi
done
```

### Step 3: Remove Redundant Imports (One at a Time)

**Test 1**: Remove `components/contact-form-enhanced` import
```bash
# Edit main-new.scss (remove line 85)
# Build and test
hugo --gc --minify
# Check /contact page
# If OK, commit
```

**Test 2**: Remove `components/headings` import
```bash
# Edit main-new.scss (remove line 84)
# Build and test
# Check all pages for heading styles
# If OK, commit
```

**Test 3**: Remove `systems/card-border-reset` import
```bash
# Edit main-new.scss (remove line 98)
# Build and test
# Check all pages for card border issues
# If issues, investigate BEM card component
# If OK, commit
```

### Step 4: Delete Empty/Unused Directories

Only after confirming no imports reference them:

```bash
# Verify no references
rg "components/" themes/andromeda-hugo/assets/scss/main-new.scss
rg "systems/" themes/andromeda-hugo/assets/scss/main-new.scss

# If clean, delete
rm -rf themes/andromeda-hugo/assets/scss/components/
rm -rf themes/andromeda-hugo/assets/scss/systems/

# Test build
hugo --gc --minify
```

### Step 5: Remove @extend Compatibility Blocks (Optional)

This is a **separate task** and requires HTML template audit:

1. Search all HTML templates for old class names: `rg "class=\"(?!c-)" layouts/`
2. If all templates use BEM classes (`.c-*`), safe to remove @extend blocks
3. Remove @extend blocks from 20 BEM component files (search for `@extend`)
4. Test thoroughly

---

## Expected Results

**Before Cleanup**:
- SCSS files: ~200 files
- Bundle size: ~520KB
- Build time: 567ms
- Legacy code: 128KB + 178 @extend blocks

**After Cleanup**:
- SCSS files: ~170 files (-15% files)
- Bundle size: ~450KB (-13% size reduction)
- Build time: ~500ms (slightly faster)
- Legacy code: 0 bytes ✅

---

## Testing Checklist

After cleanup, test:
- [ ] `/contact` page (Romanian)
- [ ] `/en/contact` page (English)
- [ ] All service pages (4 RO + 4 EN)
- [ ] Homepage
- [ ] Blog pages
- [ ] Hugo build succeeds: `hugo --gc --minify`
- [ ] No console errors in browser
- [ ] Responsive design intact (375px, 768px, 1200px)
- [ ] All cards have proper borders
- [ ] All headings styled correctly
- [ ] All forms styled correctly

---

## Rollback Plan

If cleanup breaks anything:

```bash
# Option 1: Revert last commit
git revert HEAD

# Option 2: Restore from tag
git checkout before-phase-6-cleanup -- themes/andromeda-hugo/assets/scss/

# Option 3: Restore specific file
git checkout before-phase-6-cleanup -- themes/andromeda-hugo/assets/scss/main-new.scss

# Rebuild
hugo --gc --minify
```

---

## Notes for Future Implementation

- This is a **non-urgent** task - contact form migration complete
- Can be done incrementally (one file/directory at a time)
- Requires thorough testing after each step
- Estimate: 2-3 hours with careful testing
- Can be split into multiple smaller tasks:
  - Task 1: Remove legacy imports (30 min)
  - Task 2: Delete components/ directory (45 min)
  - Task 3: Delete systems/ directory (45 min)
  - Task 4: Test all pages (30 min)

---

**Recommendation**: Schedule Phase 6 as a separate "SCSS Cleanup" task when:
- Low-traffic period (to allow for testing)
- No other major changes in progress
- Time available for thorough testing
- Or defer until next major refactoring cycle
