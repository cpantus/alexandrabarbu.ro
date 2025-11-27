# Hugo Site Cleanup Report - 2025-11-27

## Summary

**VERIFIED against live site (localhost:1316)**

**Total unused files identified:** 27 markdown files

| Category | Count | Verified |
|----------|-------|----------|
| Definitely Unused (Delete) | 2 | Yes |
| Root-Level Duplicates (Delete) | 3 | Yes |
| Unused Page Bundle Structure (Delete) | 8 | Yes |
| Orphaned Legacy Files (Delete/Archive) | 4 | Yes |
| Test/Dev Pages (Delete/Make Draft) | 9 | Yes |
| Duplicate Articles Page (Delete) | 1 | Yes |
| **TOTAL** | **27** | **All verified** |

---

## DEFINITELY UNUSED (Clear Orphans)

### English Service Stubs (Placeholder/Test Files)

| File | Lines | Reason | Verified |
|------|-------|--------|----------|
| `content/english/services/1-serviciu.md` | 8 | Stub with test content "dadasczxc" | Yes |
| `content/english/services/servicii.md` | 18 | Stub with placeholders ("**test**", "dasdas") | Yes |

**Action:** Delete immediately

---

## ROOT-LEVEL DUPLICATES (Romanian)

These exist at root level and generate URLs like `/terapie-individuala/` BUT menus link to `/servicii/terapie-individuala/`.

| Root-Level File | Active Version | URL Generated | Menu Links To |
|-----------------|----------------|---------------|---------------|
| `content/romanian/terapie-de-cuplu.md` | `content/romanian/servicii/terapie-de-cuplu.md` | `/terapie-de-cuplu/` | `/servicii/terapie-de-cuplu/` |
| `content/romanian/terapie-de-familie.md` | `content/romanian/servicii/terapie-de-familie.md` | `/terapie-de-familie/` | `/servicii/terapie-de-familie/` |
| `content/romanian/terapie-individuala.md` | `content/romanian/servicii/terapie-individuala.md` | `/terapie-individuala/` | `/servicii/terapie-individuala/` |

**Verification:** Checked live site - both URLs return 200 but only `servicii/` version is in navigation.

**Action:** Delete root-level versions (keep servicii/ subdirectory versions)

---

## UNUSED PAGE BUNDLE STRUCTURE

**IMPORTANT FINDING:** The `content/services/` directory with `index.ro.md`/`index.en.md` files is NOT being used!

The site actually uses:
- **Romanian:** `content/romanian/servicii/*.md` (ACTIVE)
- **English:** `content/english/services/*.md` (ACTIVE)

The `content/services/` page bundle structure is unused and can be deleted entirely:

| Unused File | Active Equivalent |
|-------------|-------------------|
| `content/services/individual-therapy/index.ro.md` | `content/romanian/servicii/terapie-individuala.md` |
| `content/services/individual-therapy/index.en.md` | `content/english/services/individual-therapy.md` |
| `content/services/couples-therapy/index.ro.md` | `content/romanian/servicii/terapie-de-cuplu.md` |
| `content/services/couples-therapy/index.en.md` | `content/english/services/couples-therapy.md` |
| `content/services/family-therapy/index.ro.md` | `content/romanian/servicii/terapie-de-familie.md` |
| `content/services/family-therapy/index.en.md` | `content/english/services/family-therapy.md` |
| `content/services/organizational-psychology/index.ro.md` | `content/romanian/servicii/psihologie-organizationala.md` |
| `content/services/organizational-psychology/index.en.md` | `content/english/services/organizational-psychology.md` |

**Verification:** Checked live site sections - `content/english/services/individual-therapy.md` has `feature-blocks` + `problem-empathy` sections which match what the live site renders.

**Action:** Delete entire `content/services/` directory

---

## ORPHANED LEGACY FILES

| File | URL | Status | Verified |
|------|-----|--------|----------|
| `content/romanian/familie.md` | `/familie/` | Returns 200, NOT in menus | Yes |
| `content/romanian/corporate-team-building.md` | `/corporate-team-building/` | Returns 200, NOT in menus | Yes |
| `content/english/corporate-team-building.md` | `/en/corporate-team-building/` | Returns 200, NOT in menus | Yes |
| `content/romanian/team-building.md` | `/team-building/` | Returns 200, NOT in menus | Yes |

**Action:** Delete or archive

---

## TEST/DEVELOPMENT PAGES

These are developer/testing pages not intended for production. All return 200 but are NOT in navigation:

### Romanian Component Showcases
| File | URL | Verified |
|------|-----|----------|
| `content/romanian/componente-showcase.md` | `/componente-showcase/` | Yes |
| `content/romanian/componente-showcase-part2.md` | `/componente-showcase-part2/` | Yes |
| `content/romanian/componente-showcase-complet.md` | `/componente-showcase-complet/` | Yes |

### English Component Showcases
| File | URL | Verified |
|------|-----|----------|
| `content/english/components-showcase.md` | `/en/components-showcase/` | Yes |
| `content/english/components-showcase-part2.md` | `/en/components-showcase-part2/` | Yes |
| `content/english/components-complete-showcase.md` | `/en/components-complete-showcase/` | Yes |
| `content/english/components-test.md` | `/en/components-test/` | Yes |
| `content/english/test-animations.md` | `/en/test-animations/` | Yes |

### Root Level Test Files
| File | Status | Verified |
|------|--------|----------|
| `content/test-compass.md` | Draft file | Yes |

**Action:** Delete or mark as `draft: true`

---

## DUPLICATE STRUCTURE

| File | URL | Active Alternative | Verified |
|------|-----|-------------------|----------|
| `content/english/articles.md` | `/en/articles/` | `/en/resources/articles/` | Yes |

**Action:** Delete (content exists at proper location)

---

## PAGES TO KEEP (Not in Nav but Properly Referenced)

These are **NOT orphans** - they're linked from footer, forms, or sections:

- `content/english/faq.md` / `content/romanian/intrebari.md` - Linked via forms
- `content/english/pricing.md` / `content/romanian/pricing.md` - Linked via sections
- `content/english/signin.md` / `content/romanian/signin.md` - Login pages
- `content/english/signup.md` / `content/romanian/signup.md` - Registration pages
- `content/english/terms-and-conditions.md` / `content/romanian/terms-and-conditions.md` - Footer links
- `content/romanian/servicii.md` - Main services landing page (KEEP!)

---

## CLEANUP COMMANDS

```bash
# 1. Delete stub files
rm content/english/services/1-serviciu.md
rm content/english/services/servicii.md

# 2. Delete root-level Romanian duplicates (keep servicii/ versions)
rm content/romanian/terapie-de-cuplu.md
rm content/romanian/terapie-de-familie.md
rm content/romanian/terapie-individuala.md

# 3. Delete UNUSED page bundle structure (entire directory!)
rm -rf content/services/

# 4. Delete orphaned legacy files
rm content/romanian/familie.md
rm content/romanian/corporate-team-building.md
rm content/english/corporate-team-building.md
rm content/romanian/team-building.md

# 5. Delete test/dev pages
rm content/romanian/componente-showcase.md
rm content/romanian/componente-showcase-part2.md
rm content/romanian/componente-showcase-complet.md
rm content/english/components-showcase.md
rm content/english/components-showcase-part2.md
rm content/english/components-complete-showcase.md
rm content/english/components-test.md
rm content/english/test-animations.md
rm content/test-compass.md

# 6. Delete duplicate articles page
rm content/english/articles.md
```

---

## POST-CLEANUP VERIFICATION

After cleanup, run:

```bash
# Build site to verify no broken references
hugo --gc --minify

# Check for 404s
hugo server --buildDrafts
# Then manually verify navigation works
```

---

*Generated: 2025-11-27*
