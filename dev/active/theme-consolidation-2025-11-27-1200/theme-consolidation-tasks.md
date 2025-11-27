# Theme Consolidation - Tasks

**Last Updated:** 2025-11-27
**Progress:** 7/7 phases complete

## High-Level Phases

- [x] Phase 1: Move root partials to theme (5/5 tasks)
- [x] Phase 2: Consolidate archetypes (3/3 tasks)
- [x] Phase 3: Clean SCSS structure (2/3 tasks - 04-base didn't exist)
- [x] Phase 4: Organize documentation (skipped - already organized)
- [x] Phase 5: Remove unused translations (1/1 tasks)
- [x] Phase 6: Archive legacy files (2/2 tasks)
- [x] Phase 7: Flatten dev directories (2/2 tasks)

## Completed Tasks

### Phase 1: Move Root Partials to Theme
- [x] 1.1: Move atoms/compass-animation.html to theme
- [x] 1.2: Move molecules (4 files) to theme
- [x] 1.3: Move sections (2 files) to theme, REPLACED privacy-guarantee.html
- [x] 1.4: Delete root layouts/partials directories
- [x] 1.5: Verify Hugo build passes (841ms)

### Phase 2: Consolidate Archetypes
- [x] 2.1: Copy newer root archetypes to theme (8 files)
- [x] 2.2: Delete root archetypes directory
- [x] 2.3: Verify Hugo build passes (1018ms)

### Phase 3: Clean SCSS Structure
- [x] 3.1: Remove style.scss wrapper (unused - directly loads main-new.scss)
- [x] 3.2: 04-base/ directory didn't exist (already cleaned)
- [x] 3.3: Verify styles still compile correctly (847ms)

### Phase 4: Organize Documentation
- [x] Skipped - docs already organized in theme/docs/

### Phase 5: Remove Unused Translations
- [x] 5.1: Delete i18n/fr.yaml (unused French translation)

### Phase 6: Archive Legacy Files
- [x] 6.1: Delete content-old-backup/
- [x] 6.2: Archive work files to dev/archive/2025-11/

### Phase 7: Flatten Dev Directories
- [x] 7.1: Consolidate old dev tasks to dev/archive/2025-11/
- [x] 7.2: Clean dev structure (active: 4 items, archive: 1 folder)

## Final Verification

```bash
hugo --gc --minify  # Build: 854ms, 95 RO pages, 33 EN pages
```

## Summary

**Files moved/consolidated:**
- 7 root partials → theme
- 8 root archetypes → theme
- 1 SCSS file removed (style.scss wrapper)
- 1 translation removed (fr.yaml)
- 1 backup directory removed (content-old-backup)
- 6 work files archived
- 15 old dev tasks archived

**Result:** Single source of truth in theme directory, cleaner root structure.
