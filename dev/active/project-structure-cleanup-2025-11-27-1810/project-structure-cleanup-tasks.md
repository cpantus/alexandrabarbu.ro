# Project Structure Cleanup - Tasks

**Last Updated:** 2025-11-27
**Progress:** 0/3 phases complete

## High-Level Phases

- [ ] Phase 1: Root cleanup (0/3 tasks)
- [ ] Phase 2: Theme cleanup (0/3 tasks)
- [ ] Phase 3: Verification (0/1 tasks)

## Detailed Task Breakdown

### Phase 1: Root Cleanup

- [ ] 1.1: Remove empty layouts/ directory
- [ ] 1.2: Delete ALL CAPS work files (ARCHITECTURE.md, REDESIGN-2025-PROGRESS.md, TESTING-GUIDE.md)
- [ ] 1.3: Delete utility scripts (start-dev.sh, strip-comments.sh, strip-html-comments.sh)

### Phase 2: Theme Cleanup

- [ ] 2.1: Delete 10 ALL CAPS work artifact files
- [ ] 2.2: Delete artifacts (.DS_Store, hugo.toml-orig)
- [ ] 2.3: Consolidate theme dev/ to project dev/archive/2025-11/theme-dev/

### Phase 3: Verification

- [ ] 3.1: Run `hugo --gc --minify` and verify build passes

## Completed Tasks

*None yet*

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
