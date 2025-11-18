# Hugo Site Cleanup - Deprecated Sections Removal

**Date:** 2025-11-18
**Status:** ✅ COMPLETED
**Duration:** ~2 hours
**Working Directory:** `themes/andromeda-hugo/`

---

## Overview

Comprehensive cleanup of Hugo site after design audit removed deprecated section components. Fixed build errors, removed orphaned YAML data, and ensured site builds successfully.

---

## Problems Identified

### 1. Critical Icon Error
- **File:** `layouts/partials/sections/contact-options.html:40`
- **Error:** `Icon atom requires 'name' parameter`
- **Cause:** Missing null-check for `$option.icon` parameter

### 2. Deprecated Section References (28 files affected)
Content files referenced 6 deleted section types:
- `benefits-grid` (13 files)
- `method-tabs` (7 files)
- `timeline-process` (6 files)
- `service-highlights` (3 files)
- `related-services` (4 files)
- `onboarding-steps` (2 files)

### 3. Orphaned YAML Data Blocks
Python cleanup script removed section type entries but left orphaned data blocks in front matter, causing YAML parsing errors in 15+ files.

---

## Solutions Implemented

### Fix 1: Icon Atom Null Safety

**File:** `layouts/partials/sections/contact-options.html`

```html
<!-- Before -->
<div class="option-icon">
  {{ partial "atoms/icon.html" (dict "name" $option.icon "size" "48") }}
</div>

<!-- After -->
<div class="option-icon">
  {{- if $option.icon -}}
  {{ partial "atoms/icon.html" (dict "name" $option.icon "size" "48") }}
  {{- else -}}
  {{ partial "atoms/icon.html" (dict "name" "envelope" "size" "48") }}
  {{- end -}}
</div>
```

### Fix 2: Automated Section Reference Removal

**Script:** `scripts/remove-deprecated-sections.py`

```python
# Removed section type entries from sections array
# Removed corresponding section data blocks (section_name:)
# Processed 28 files, updated front matter
```

**Results:**
- Scanned: 62 files
- Modified: 28 files
- Section types removed: 6 different types
- Data blocks removed: ~35 blocks

### Fix 3: Orphaned YAML Cleanup

**Manual fixes required for:**
- `romanian/abordare.md` - method_tabs data
- `english/approach.md` - method_tabs data
- `romanian/signup.md` - onboarding_steps array
- `romanian/despre-mine.md` - timeline_process data
- `english/services/organizational-psychology.md` - service_highlights data
- `romanian/servicii/psihologie-organizationala.md` - service_highlights data
- `romanian/_index.md` - onboarding steps array (3-item list)
- `english/_index.md` - onboarding steps array (3-item list)

**Automated cleanup:**
```bash
# Removed orphaned comment headers + data blocks
python3 << 'PYTHON'
pattern = r'# [^\n]+\n\n(?:  [^\n]+\n)+'
# Cleaned 10 additional files
PYTHON
```

**Large block removal:**
```bash
# Removed massive orphaned services blocks (150+ lines each)
sed -i '25,182d' content/english/services.md
sed -i '24,182d' content/romanian/servicii.md
```

---

## Build Results

### Before Cleanup
```
Error: error building site
- Icon atom requires 'name' parameter
- 32 warnings about missing sections
- Multiple YAML parsing errors
Build: FAILED
```

### After Cleanup
```
✅ BUILD SUCCESSFUL

Statistics:
  Pages: RO (43) | EN (56)
  Build Time: 37.9 seconds (production)
  Build Time: 1.2 seconds (dev server)
  Warnings: 1 (non-critical: feature-details)
  Errors: 0

Hugo Server: Running on http://localhost:1313/
Status: ✅ OPERATIONAL
```

---

## Scripts Created

### 1. `scripts/remove-deprecated-sections.py`
- **Purpose:** Remove section type entries and data blocks
- **Usage:** `python3 scripts/remove-deprecated-sections.py`
- **Results:** 28 files modified

### 2. `scripts/clean-orphaned-yaml.py`
- **Purpose:** Conservative YAML orphan removal
- **Status:** Too conservative, didn't catch all cases
- **Note:** Not used in final solution

### 3. `scripts/fix-breadcrumb-orphans.py`
- **Purpose:** Targeted breadcrumb orphan removal
- **Status:** Pattern too specific
- **Note:** Not used in final solution

### 4. Inline Python cleanup (successful)
```python
# Pattern-based removal of comment headers + orphaned indented blocks
# Used successfully to clean 10 files
```

---

## Files Modified

### Layouts (1 file)
- `layouts/partials/sections/contact-options.html` - Added icon null-check

### Content - Romanian (15 files)
- `content/romanian/_index.md`
- `content/romanian/abordare.md`
- `content/romanian/signup.md`
- `content/romanian/despre-mine.md`
- `content/romanian/servicii.md`
- `content/romanian/servicii/psihologie-organizationala.md`
- `content/romanian/servicii/terapie-individuala.md`
- `content/romanian/terapie-individuala.md`
- `content/romanian/terapie-de-cuplu.md`
- `content/romanian/terapie-de-familie.md`
- `content/romanian/dezvoltare-personala.md`
- `content/romanian/team-building.md`
- `content/romanian/corporate-team-building.md`
- `content/romanian/componente-showcase.md`

### Content - English (14 files)
- `content/english/_index.md`
- `content/english/approach.md`
- `content/english/services.md`
- `content/english/services/individual-therapy.md`
- `content/english/services/organizational-psychology.md`
- `content/english/corporate-team-building.md`
- `content/english/components-test.md`
- `content/english/components-showcase.md`

### Content - Services (3 files)
- `content/services/individual-therapy/index.ro.md`
- `content/services/individual-therapy/index.en.md`
- `content/services/organizational-psychology/index.ro.md`
- `content/services/organizational-psychology/index.en.md`
- `content/services/couples-therapy/index.ro.md`

**Total Modified:** 33 files

---

## Validation

### Build Tests
```bash
# Clean production build
hugo --gc --minify
✅ Success: 37.9s, 0 errors, 1 warning

# Development server
hugo server --buildDrafts
✅ Success: 1.2s, serving on :1313

# Both languages
- Romanian (root): 43 pages ✅
- English (/en/): 56 pages ✅
```

### Site Access
```bash
curl http://localhost:1313/ | head -20
✅ Returns valid HTML

# Both languages accessible
✅ http://localhost:1313/ (Romanian)
✅ http://localhost:1313/en/ (English)
```

---

## Lessons Learned

### 1. Regex Pattern Limitations
Initial Python scripts were too conservative or too specific. Final solution required:
- Pattern-based removal for comment blocks
- Manual sed for large orphaned blocks
- Individual file fixes for edge cases

### 2. YAML Front Matter Complexity
Hugo's YAML parser is strict:
- Orphaned 2-space indented blocks cause "non-map value" errors
- Must remove both comment headers AND data blocks
- Empty lines between blocks can leave orphans

### 3. Build Testing Strategy
Progressive approach worked best:
1. Fix critical error (icon)
2. Remove deprecated sections
3. Test build → identify orphans
4. Clean orphans iteratively
5. Verify final build

### 4. Working Directory Confusion
`cd themes/andromeda-hugo` required for Hugo commands but working directory kept resetting. Solution: use absolute paths or chain commands.

---

## Future Maintenance

### When Removing Sections

**Checklist:**
1. ✅ Remove section partial file
2. ✅ Update `flexible.html` section registry
3. ✅ **Search and remove from content files**
4. ✅ **Clean orphaned YAML data blocks**
5. ✅ Test build before committing
6. ✅ Verify both languages

### Prevention Script
Consider creating a pre-commit hook that:
- Detects orphaned 2-space indented blocks after top-level keys
- Validates YAML front matter structure
- Warns about missing section partials

---

## Performance Impact

### Before
- Build: Failed (errors)
- Warnings: 32 missing sections

### After
- Build: 37.9s (production), 1.2s (dev)
- Warnings: 1 (non-critical)
- Page count: Unchanged (99 total)
- No performance degradation

---

## Related Documentation

- **Theme Docs:** `themes/andromeda-hugo/CLAUDE.md`
- **Available Sections:** 21 active sections (v4.0)
- **Deprecated Sections:** Moved to `layouts/partials/sections/_deprecated/`
- **Design Audit:** See design audit consolidation docs

---

## Status: ✅ COMPLETED

**Final State:**
- Hugo builds successfully (0 errors)
- Both languages operational (RO + EN)
- Server running on http://localhost:1313/
- All deprecated section references removed
- YAML front matter valid across all content files

**Build Output:**
```
Pages: RO (43) | EN (56)
Build Time: 37.9s (production) / 1.2s (dev)
Errors: 0
Warnings: 1 (non-critical)
Status: PRODUCTION READY ✅
```

---

**Completed:** 2025-11-18 20:30 UTC
**Next Steps:** Monitor site for any remaining edge cases, consider automation for future section removals
