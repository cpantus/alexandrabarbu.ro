# Key Decisions & Rationale

**Project**: Theme Audit & Fixes
**Date**: 2025-11-21

---

## Phase Strategy

### Decision: Two-Phase Approach
**Options Considered**:
1. Fix all issues in one phase (faster)
2. Two phases: Critical → Polish (structured)
3. Three phases: Critical → Medium → Polish (too granular)

**Decision**: Option 2 - Two-phase approach

**Rationale**:
- Phase 1 addresses blockers (logo broken, build warnings)
- Allows user to verify critical fixes before polish work
- Clear milestone: build succeeds with minimal warnings
- Phase 2 can be deferred if time-constrained

**Impact**: Allows resumption at clear checkpoint

---

## Logo Fix

### Decision: Inline SVG with currentColor
**Options Considered**:
1. Keep `<img>` tag, update CSS to target img elements
2. Convert to inline SVG with currentColor
3. Use CSS mask-image for color control

**Decision**: Option 2 - Inline SVG

**Rationale**:
- CSS expected SVG structure (`.c-logo__svg`)
- currentColor enables variant system to work
- Better performance (no HTTP request)
- Full control over SVG styling
- Accessibility improvements (role, aria-label)

**Trade-offs**:
- ✅ Pro: Color variants work, no caching issues
- ✅ Pro: One file to maintain (no external SVG)
- ❌ Con: Larger HTML file size (~2KB)
- ❌ Con: Can't reuse across sites easily

**Impact**: Logo displays correctly, all variants work

---

## Typography Fix

### Decision: Update Legacy Alias Variables
**Options Considered**:
1. Global search/replace all `$font-primary` → `$font-heading` in 20 files
2. Update legacy alias definitions to point to new fonts
3. Remove legacy aliases, force breaking change

**Decision**: Option 2 - Update alias definitions

**Rationale**:
- Fastest fix (1 file vs 20 files)
- Backward compatible (no component changes needed)
- Allows gradual migration to new names
- Clearly marked as DEPRECATED with comments

**Trade-offs**:
- ✅ Pro: Instant fix, zero regression risk
- ✅ Pro: Components work immediately
- ❌ Con: Technical debt remains (legacy names)
- ❌ Con: Developers may keep using old names

**Future Work**: Create migration script for Phase 3 cleanup

**Impact**: All components now load correct fonts

---

## CTA Button Structure

### Decision: Support Both Flat and Nested Structures
**Options Considered**:
1. Update all content to use flat structure (12+ files)
2. Update template to support nested structure only
3. Support both structures with fallback logic

**Decision**: Option 3 - Dual structure support

**Rationale**:
- Future-proof (supports legacy and new content)
- No content file changes needed
- Clear migration path (nested is preferred)
- Minimal template complexity (30 lines)

**Implementation**:
```hugo
{{- if $section.button_text -}}
  {{/* Flat structure (legacy) */}}
{{- else if $section.primary_button -}}
  {{/* Nested structure (current) */}}
{{- end -}}
```

**Trade-offs**:
- ✅ Pro: Works with all existing content
- ✅ Pro: Enables new nested format
- ❌ Con: Slight template complexity
- ❌ Con: Two code paths to maintain

**Impact**: CTA warnings reduced 92% (12 → 1)

---

## List Template Creation

### Decision: Use Blog-Grid Styling for Taxonomies
**Options Considered**:
1. Create simple list (ul/li)
2. Use blog-grid layout (cards with images)
3. Create custom taxonomy-specific layout

**Decision**: Option 2 - Blog-grid layout

**Rationale**:
- Consistent with existing blog section styling
- Supports images, metadata, excerpts
- Responsive out of the box
- Reuses existing CSS (.c-blog-card)

**Trade-offs**:
- ✅ Pro: Visual consistency
- ✅ Pro: No new CSS needed
- ❌ Con: May be overkill for simple lists
- ❌ Con: Assumes taxonomy items have images

**Future Enhancement**: Create taxonomy-specific template if needed

**Impact**: Taxonomy pages now render correctly

---

## Content Layout Updates

### Decision: Use sed for Batch Updates
**Options Considered**:
1. Manual editing of 8 files
2. sed command for automated replacement
3. Write custom script

**Decision**: Option 2 - sed command

**Rationale**:
- Fast (1 command vs 8 manual edits)
- Consistent (same change to all files)
- Repeatable (if more files added)
- Simple regex: `s/^layout:.*$/layout: "flexible"/`

**Command Used**:
```bash
for file in content/{english,romanian}/{signin,signup,pricing,terms-and-conditions}.md; do
  sed -i 's/^layout:.*$/layout: "flexible"/' "$file"
done
```

**Trade-offs**:
- ✅ Pro: Quick and accurate
- ✅ Pro: No human error
- ❌ Con: Requires shell access
- ❌ Con: Can't undo easily (use git)

**Impact**: 8 files updated, layout warnings resolved

---

## Phase 2 Deferral

### Decision: Defer UX/Polish to Phase 2
**Options Considered**:
1. Fix all 22 warnings in Phase 1
2. Stop after critical fixes (Phase 1)
3. Mix critical and polish fixes

**Decision**: Option 2 - Stop after Phase 1

**Rationale**:
- Clear completion criteria (build succeeds)
- Allows user to test critical fixes
- Remaining warnings are non-blocking
- Phase 2 can be done in separate session

**Remaining Issues (Low Impact)**:
- Footer layout misalignment (visual only)
- WCAG contrast (affects some text)
- Contact card params (showcase pages only)
- Timeline variant (one component)

**Impact**: 64% warning reduction achieved, site functional

---

## Footer Grid Fix Strategy (Phase 2)

### Decision: Remove Conflicting Styles (Planned)
**Options Considered**:
1. Remove grid, use flexbox throughout
2. Remove flexbox, use grid only
3. Remove conflicting padding/max-width from footer-nav

**Decision**: Option 3 - Remove conflicts, keep grid

**Rationale**:
- Grid is correct for footer layout
- footer-nav adding unnecessary overrides
- Minimal change (remove 2-3 lines)
- Preserves responsive behavior

**Not Yet Implemented** (Phase 2)

---

## WCAG Contrast Fix Strategy (Phase 2)

### Decision: Use Darker Muted Text Color (Planned)
**Options Considered**:
1. Increase background lightness
2. Decrease text lightness (darker)
3. Remove muted text entirely

**Decision**: Option 2 - Darker text

**Rationale**:
- Maintains design intent (muted but readable)
- Existing token available ($color-text-secondary = 6.4:1)
- No layout changes needed
- Affects only small portions of text

**Not Yet Implemented** (Phase 2)

---

## Design Principles Applied

### Minimal Changes
- Change only what's necessary to fix issue
- Preserve existing architecture (BEM, ITCSS)
- Maintain backward compatibility where possible

### Progressive Enhancement
- Fix critical issues first (blocking)
- Defer polish to Phase 2 (non-blocking)
- Allow incremental testing and validation

### Future-Proof
- Support both legacy and new data structures
- Mark deprecated code clearly
- Document migration paths

### Developer Experience
- Clear error messages (validation warnings)
- Consistent patterns (BEM, design tokens)
- Well-documented changes

---

## Anti-Decisions (What We Didn't Do)

### ❌ Don't: Rebuild Logo System
- Considered: Redesigning entire logo molecule
- Rejected: Too risky, current system works
- Instead: Fixed specific issue (inline SVG)

### ❌ Don't: Remove Legacy Font Variables
- Considered: Delete $font-primary/$font-secondary
- Rejected: Would break 20+ components immediately
- Instead: Redirect to correct fonts, mark deprecated

### ❌ Don't: Restructure All CTA Content
- Considered: Update all content to nested format
- Rejected: Too many files, error-prone
- Instead: Support both formats in template

### ❌ Don't: Create Custom Layouts for Each Page
- Considered: Make signin/signup/pricing layouts
- Rejected: Violates flexible layout architecture
- Instead: Use flexible layout (standard pattern)

---

## Lessons Learned

### What Worked Well
1. **Dual-agent audit** - Hugo + UX perspectives comprehensive
2. **Phase approach** - Clear milestone, easy to resume
3. **Backward compatibility** - No breaking changes to content
4. **Design token fix** - One-line change fixed 20 files

### What Could Improve
1. **Earlier testing** - Could have caught mismatch sooner
2. **Content validation** - Need schema for front matter
3. **Layout enforcement** - Hook to prevent non-flexible layouts
4. **Font loading check** - Automated test for correct fonts

### For Next Session
- Start with build test to verify state
- Reference PROGRESS.md for exact task list
- Use agent reports for detailed specifications
- Test incrementally (don't batch changes)

---

**Last Updated**: 2025-11-21
**Author**: Claude
**Version**: 1.0.0
