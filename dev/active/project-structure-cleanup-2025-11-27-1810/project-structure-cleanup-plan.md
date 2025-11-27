# Project Structure Cleanup - Plan

**Created:** 2025-11-27
**Status:** Active
**Estimated time:** 15 minutes

## Overview

Aggressive cleanup of project structure to remove work artifacts (ALL CAPS files), old files (pre-November), and consolidate to a clean, professional structure.

## Cleanup Rules

- ALL CAPS filenames = work artifacts → DELETE
- Files older than November 2025 → DELETE
- Essential files (CLAUDE.md, PROJECT.md, cc-design.md) → KEEP

## Goals

1. Remove 18+ unnecessary files (work artifacts, old docs, utility scripts)
2. Consolidate theme dev/ to project dev/
3. Achieve clean, minimal structure with single source of truth

## Approach

### Phase 1: Root Cleanup
- Remove empty `layouts/` directory
- Delete ALL CAPS work files (ARCHITECTURE.md, REDESIGN-2025-PROGRESS.md, TESTING-GUIDE.md)
- Delete utility scripts (start-dev.sh, strip-comments.sh, strip-html-comments.sh)

### Phase 2: Theme Cleanup
- Delete 10 ALL CAPS work artifact files
- Delete artifacts (.DS_Store, hugo.toml-orig)
- Consolidate theme dev/ to project dev/archive/

### Phase 3: Verification
- Run Hugo build to confirm no breakage

## Success Criteria

- [ ] No ALL CAPS files in root (except CLAUDE.md)
- [ ] No ALL CAPS files in theme root (except CLAUDE.md, PROJECT.md)
- [ ] No empty directories
- [ ] No Mac artifacts or backup files
- [ ] Hugo build passes
- [ ] Clean ls output

## Files to Delete

**Root (6 files + 1 dir):**
- layouts/ (empty dir)
- ARCHITECTURE.md
- REDESIGN-2025-PROGRESS.md
- TESTING-GUIDE.md
- start-dev.sh
- strip-comments.sh
- strip-html-comments.sh

**Theme (12 files + 1 dir):**
- ARCHITECTURE.md
- CLAUDE-ITCSS-ADDENDUM.md
- COMPONENT-AUDIT-REPORT.md
- COMPONENT-FLOW-EXAMPLE.md
- COMPONENT-INVENTORY.md
- DESIGN-TOKENS-USAGE.md
- ICON-CONSISTENCY-FIX.md
- LAYOUT_MIXING_GUIDE.md
- PAGES-COMPONENTS.md
- THEME-CUSTOMIZATION.md
- .DS_Store
- hugo.toml-orig
- dev/ (consolidate to project dev/)

## Notes

- This follows the earlier theme consolidation which moved partials/archetypes to theme
- Combined cleanup removes ~18 files and achieves professional project structure
