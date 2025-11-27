# Theme Consolidation - Plan

**Created:** 2025-11-27
**Status:** Active
**Estimated time:** 1.5-2 hours

## Overview

Consolidate the Andromeda Hugo theme which has become scattered after multiple refactorings. Files are split between root and theme directories, with duplicate components, excessive directory depth (13 levels), and unclear source of truth.

## Goals

1. **Single source of truth**: All components in theme directory
2. **Flatten structure**: Reduce from 13 to 4-5 levels max depth
3. **Eliminate dead code**: Remove duplicates and unused files
4. **Improve maintainability**: Clear organization, no scattered files

## Approach

**7 Phases** (see tasks.md for details):

1. **Phase 1**: Move root partials to theme (7 files)
2. **Phase 2**: Consolidate archetypes (8 files, 3 overlaps)
3. **Phase 3**: Clean SCSS (remove wrapper, empty dirs)
4. **Phase 4**: Organize documentation (21 files)
5. **Phase 5**: Remove unused translations (`fr.yaml`)
6. **Phase 6**: Archive legacy files
7. **Phase 7**: Flatten dev directories

## Success Criteria

- [ ] Zero partials in root `layouts/` (all in theme)
- [ ] Max directory depth ≤ 5 levels
- [ ] Single SCSS entry point
- [ ] All archetypes in theme only
- [ ] Hugo build passes with no new warnings
- [ ] Site renders identically before/after

## Risks & Mitigation

**Risks:**
- Breaking partial references: Test build after each phase
- Losing enhanced content: Back up before moving (root `privacy-guarantee.html` has 147 lines vs theme's 46)
- Git history complexity: Single commit per phase with clear message

## Notes

- Reference report: `final-consolidation-27-11.md`
- Previous cleanup: `cleanup-27-11.md` (27 unused .md files removed)
- Hugo server running on port 1316 for verification
