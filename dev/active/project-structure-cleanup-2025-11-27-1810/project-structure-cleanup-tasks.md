# Project Structure Cleanup - Tasks

**Last Updated:** 2025-11-27
**Progress:** 3/3 phases complete

## High-Level Phases

- [x] Phase 1: Root cleanup (3/3 tasks)
- [x] Phase 2: Theme cleanup (3/3 tasks)
- [x] Phase 3: Verification (1/1 tasks)

## Detailed Task Breakdown

### Phase 1: Root Cleanup

- [x] 1.1: Remove empty layouts/ directory
- [x] 1.2: Delete ALL CAPS work files (ARCHITECTURE.md, REDESIGN-2025-PROGRESS.md, TESTING-GUIDE.md)
- [x] 1.3: Delete utility scripts (start-dev.sh, strip-comments.sh, strip-html-comments.sh)

### Phase 2: Theme Cleanup

- [x] 2.1: Delete 10 ALL CAPS work artifact files
- [x] 2.2: Delete artifacts (.DS_Store, hugo.toml-orig)
- [x] 2.3: Theme dev/ already didn't exist (no consolidation needed)

### Phase 3: Verification

- [x] 3.1: Run `hugo --gc --minify` - Build passes (829ms, 95 RO + 33 EN pages)

## Completed Tasks

All tasks completed successfully.

## Notes

**Execution commands:**
```bash
# Phase 1: Root cleanup
rm -rf layouts/
rm ARCHITECTURE.md REDESIGN-2025-PROGRESS.md TESTING-GUIDE.md
rm start-dev.sh strip-comments.sh strip-html-comments.sh

# Phase 2: Theme cleanup
cd themes/andromeda-hugo
rm ARCHITECTURE.md CLAUDE-ITCSS-ADDENDUM.md COMPONENT-AUDIT-REPORT.md \
   COMPONENT-FLOW-EXAMPLE.md COMPONENT-INVENTORY.md DESIGN-TOKENS-USAGE.md \
   ICON-CONSISTENCY-FIX.md LAYOUT_MIXING_GUIDE.md PAGES-COMPONENTS.md \
   THEME-CUSTOMIZATION.md
rm .DS_Store hugo.toml-orig
mkdir -p ../../dev/archive/2025-11/theme-dev
mv dev/active/* ../../dev/archive/2025-11/theme-dev/
rm -rf dev/

# Phase 3: Verify
cd /home/cere/Work/alex/alexandrabarbu.ro
hugo --gc --minify
```
