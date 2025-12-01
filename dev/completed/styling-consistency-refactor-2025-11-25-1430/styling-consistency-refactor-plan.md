# Styling Consistency Refactor - Plan

**Created:** 2025-11-25
**Status:** Active
**Estimated time:** 1-2 weeks (incremental)

## Overview

Refactor the Hugo theme's SCSS to achieve consistent design language implementation across all 71 components (atoms, molecules, sections, organisms). The theme has accumulated styling inconsistencies through multiple rounds of refactoring and legacy component updates. Goal is clean, maintainable code while preserving 100% current visual appearance.

## Goals

1. **Consistency**: Single source of truth for all design tokens (typography, spacing, motion, shadows)
2. **Maintainability**: Eliminate hard-coded values, reduce !important usage from 77 to <10
3. **Visual Preservation**: Zero breaking visual changes (normalize orphan values to closest tokens)
4. **Extensibility**: Make it easy to extend the design system for future sections

## Approach

### Phase 1: Foundation Fixes (Day 1-2)
- Consolidate duplicate breakpoint definitions (2 files → 1)
- Fix off-by-one breakpoint values (30+ instances)
- Remove orphan backup file
- Fix critical !important (z-index: 999)

### Phase 2: Typography Normalization (Day 3-4)
- Map 15+ hard-coded font sizes to existing tokens
- Normalize orphan values: 40px→36px, 56px→48px
- Remove typography !important in services-preview

### Phase 3: Animation Standardization (Day 5-6)
- Replace 10+ hard-coded timing values with tokens
- Eliminate 41 `transition: all` anti-patterns
- Create and apply hover lift tokens

### Phase 4: Shadow & Gradient Cleanup (Day 7-8)
- Expand shadow tokens for common patterns
- Migrate 15 files to gradient tokens
- Replace exact shadow matches with tokens

### Phase 5: Section & Background Simplification (Day 9)
- Simplify 8 background classes to 3
- Remove section !important declarations

### Phase 6: Font-Weight & Line-Height (Day 10)
- Replace numeric weights with semantic tokens
- Optional: Add line-height tokens

### Phase 7: CSS Variables Audit (Day 11-12)
- Analyze 1324-line custom properties file
- Identify unused/redundant variables
- Prune, document, or split based on findings

## Success Criteria

- [ ] !important usage reduced from 77 to <10
- [ ] Hard-coded font sizes: 0 (all use tokens)
- [ ] Hard-coded timings: 0 (all use tokens)
- [ ] `transition: all` instances: 0
- [ ] Shadow token adoption: 80%+ (up from 20%)
- [ ] Build time maintained: <3s
- [ ] Zero visual regressions

## Risks & Mitigation

**Risks:**
- **Visual regressions from token normalization**: Mitigation - normalizing to closest token (max 4-12px difference on large headings)
- **Specificity cascade effects**: Mitigation - fix one file at a time, test after each commit
- **CSS variable audit scope creep**: Mitigation - audit first, then decide approach based on findings

## Notes

- User preference: Trust the process (no automated screenshots)
- User preference: Normalize orphan values to existing tokens (minor visual adjustments acceptable)
- User preference: Audit CSS variables before deciding to keep/remove
- Commit strategy: One commit per sub-phase for easy rollback

## Reference Documents

- `/styling-consistency.md` - Original audit (typography, animations, shadows, backgrounds)
- `/STYLING-REFACTOR-PLAN.md` - Detailed implementation plan with file references
- `/ARCHITECTURE.md` - System overview and component hierarchy
