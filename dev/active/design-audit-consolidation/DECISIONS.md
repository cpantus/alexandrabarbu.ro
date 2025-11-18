# Design Audit Decision Log

**Project**: Component Consolidation & Design System Unification
**Started**: 2025-11-18

---

## User Decisions Made

### Decision 1: Typography Choice
**Date**: 2025-11-18
**Question**: Which fonts to use for the site?
**Options**:
- Poppins + Open Sans (documented in CLAUDE.md)
- Cormorant Garamond + Source Sans Pro (loaded in _design-system.scss)

**Decision**: ✅ **Cormorant Garamond + Source Sans Pro**

**Rationale**: Elegant serif + modern sans. More editorial feel suitable for professional psychology practice.

**Action Required**:
- [x] Update `_design-tokens.scss` to match ✅ (Session 2)
- [x] Update `CLAUDE.md` documentation ✅ (Session 2)
- [x] Verify font imports in browser ✅ (Session 2)

---

### Decision 2: Enhancement Strategy
**Date**: 2025-11-18
**Question**: How to unify the two design systems?
**Options**:
- Option A: Full v4.0 Enhancement (all sections)
- Option B: Tiered System (Standard/Enhanced/Premium)
- Option C: Document current mix

**Decision**: ✅ **Option A: Full v4.0 Enhancement**

**Rationale**: Apply glassmorphism, gradients, organic blobs, animations to ALL sections for most cohesive experience.

**Timeline**: 2-3 days
**Status**: Deferred to Phase 3 (after section elimination complete)

---

### Decision 3: Implementation Timeline
**Date**: 2025-11-18
**Question**: Quick wins or full 7-day roadmap?
**Options**:
- Full 7-Day Roadmap (complete implementation)
- Quick Wins First (4.5 hours, 80% benefit)

**Decision**: ✅ **Full 7-Day Roadmap**

**Rationale**: Professional production-ready result with complete testing and validation.

**Status**: Day 1 complete, Days 2-7 pending

---

### Decision 4: Section Consolidation Sequence
**Date**: 2025-11-18
**Question**: When to consolidate vs when to enhance?
**Options**:
- Before v4.0 rollout (consolidate → enhance → test)
- After v4.0 rollout (enhance → consolidate)
- Parallel tracks

**Decision**: ✅ **Before v4.0 rollout**

**Rationale**: Clean up first, then enhance. Less code to upgrade. Ensures all features preserved before merging.

**Status**: In progress (Phase 1 elimination complete)

---

### Decision 5: First Elimination Round
**Date**: 2025-11-18
**Question**: Which sections to eliminate from first showcase?
**Sections Reviewed**: 01-18 in Part 1 showcase

**Decision**: ✅ **Eliminate sections 5, 8, 9, 10, 11, 15**

**Details**:
- 05. benefits-grid → Use values-compass instead
- 08. service-highlights → Redundant with feature blocks
- 09. timeline-process → Redundant functionality
- 10. onboarding-steps → Redundant with timelines
- 11. method-tabs → Not widely used
- 15. related-services → Redundant functionality

**Rationale**: Redundant with other sections, can recreate functionality if needed later.

**Status**: ✅ COMPLETE - Moved to _deprecated/, SCSS updated, builds successful

---

## Pending Decisions

### Decision 6: Part 2 Elimination Round
**Date**: Pending
**Question**: Which sections from Part 2 showcase to eliminate?
**Sections to Review**: 13-18 in Part 2 showcase + 10 not shown

**Options**:
- Eliminate feature-details only (old version)
- Eliminate all 10 unused complex sections
- Keep testimonials-enhanced
- Eliminate testimonials-enhanced

**Recommendations**:
- ✅ Eliminate feature-details (old version, feature-blocks is better)
- ✅ Eliminate 10 unused complex sections (never used, complex data)
- ✅ Keep blog-grid, signup-form-enhanced, privacy-guarantee (lightly used)
- ⚠️ Decision needed: testimonials-enhanced (beautiful v4.0 but unused)

**Target**: 28 → 17 sections (39% additional reduction)

**Status**: ⏳ PENDING USER REVIEW

---

### Decision 7: FAQ Consolidation
**Date**: Pending
**Question**: Consolidate 3 FAQ variants into 1 component?

**Current State**:
- faq-mini.html (8 pages) - Simple accordion
- faq-content.html (UNUSED) - Shortcode rendering
- service-faq-inline.html (UNUSED) - Rich with icons/badges

**Options**:
- Keep all 3 variants
- Merge into single flexible FAQ component
- Keep faq-mini, eliminate others

**Recommendation**: Merge unused features into faq-mini, eliminate faq-content and service-faq-inline

**Status**: ⏳ PENDING

---

### Decision 8: Contact Methods Consolidation
**Date**: Pending
**Question**: Consolidate 2 contact method sections?

**Current State**:
- contact-info-cards.html (UNUSED) - Simple 3-column cards
- contact-options.html (UNUSED) - Complex with commitment levels

**Options**:
- Delete both (neither used)
- Merge into single component
- Keep simple version only

**Recommendation**: Delete both (not used anywhere)

**Status**: ⏳ PENDING

---

### Decision 9: Privacy/Confidentiality Consolidation
**Date**: Pending
**Question**: Merge privacy sections?

**Current State**:
- privacy-guarantee.html (1 page) - Box with features list
- confidentiality-notice.html (UNUSED) - Simple alert

**Options**:
- Keep both
- Merge into privacy-guarantee with style variants
- Eliminate confidentiality-notice

**Recommendation**: Keep privacy-guarantee (used), eliminate confidentiality-notice

**Status**: ⏳ PENDING

---

## Design System Decisions

### Icon System Consistency
**Date**: Pending
**Question**: Standardize icon usage across all components?

**Current Issues**:
- Different gradient variant naming (primary/secondary vs emerald/terracotta)
- Inconsistent icon wrapper application
- Mixed color rotation patterns

**Options**:
- Standardize all to semantic names (primary/secondary/accent-1/accent-2)
- Create comprehensive icon system documentation
- Leave as-is with documentation

**Recommendation**: Standardize to semantic names during v4.0 rollout

**Status**: ⏳ PENDING (Phase 3)

---

### Component Naming Convention
**Date**: Pending
**Question**: Rename sections for clarity?

**Examples**:
- contact-form-enhanced → contact-form
- signup-form-enhanced → signup-form
- testimonials-enhanced → testimonials
- feature-blocks-enhanced → feature-blocks

**Options**:
- Remove "-enhanced" suffix (all are enhanced in v4.0)
- Keep current names (backward compatibility)
- Rename strategically

**Recommendation**: Remove "-enhanced" suffix during consolidation

**Status**: ⏳ PENDING (Phase 3)

---

## Rollback Plan

### If Issues Arise

**Restore Deprecated Sections**:
```bash
# Move sections back from _deprecated/
mv layouts/partials/sections/_deprecated/*.html layouts/partials/sections/
mv assets/scss/components/_deprecated/*.scss assets/scss/components/

# Restore SCSS imports in custom.scss
# Uncomment lines 27-29
```

**Restore Points**:
- Git commit before Phase 1: [commit hash needed]
- Git commit after Phase 1: [commit hash needed]

**Critical Files Backup**: None taken (using git)

---

## Implementation Notes

### Lessons Learned

**What Worked Well**:
- Visual showcases helped decision-making
- Incremental elimination (6 sections first) validated approach
- SCSS modular structure made moves easy
- Hugo build warnings helped identify dependencies

**Challenges**:
- Complex data structures prevented some sections from showcasing
- Icon atom errors required careful data validation
- Missing content dependencies (office photos, job postings)

**Recommendations for Next Phase**:
- Test build after each batch of eliminations
- Update content pages immediately after deprecation
- Create mock data files for complex sections if needed for showcase

---

## Success Criteria

### Phase 1 Success Metrics ✅
- [x] Design audit complete
- [x] Showcases created (Part 1 & Part 2)
- [x] 6 sections eliminated
- [x] Hugo builds successfully
- [x] No performance degradation

### Phase 2 Success Criteria ⏳
- [ ] Additional 11 sections eliminated (target 17 total)
- [ ] Typography conflict resolved
- [ ] Content pages updated
- [ ] No Hugo errors
- [ ] Build time <3s

### Phase 3 Success Criteria (v4.0 Rollout) ⏳
- [ ] All sections use v4.0 design language
- [ ] Gradient variants standardized
- [ ] Icon system consistent
- [ ] WCAG AA compliance
- [ ] 60fps animations

---

**Last Updated**: 2025-11-18 18:45
**Next Review**: Phase 2 start
