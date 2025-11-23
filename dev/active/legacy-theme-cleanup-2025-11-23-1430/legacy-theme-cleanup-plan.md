# Legacy Theme Cleanup - Plan

**Created:** 2025-11-23
**Status:** Active
**Estimated time:** 3-4 hours

## Overview

Complete cleanup of all legacy theme remnants from the Hugo site following the successful Phase 8 SCSS cleanup. This includes migrating deprecated sections in active content, removing unused template files, and archiving old backup directories.

## Goals

1. **Migrate all deprecated sections** from active content pages to modern v4.0+ equivalents
2. **Remove unused template files** once content is migrated
3. **Clean up backup directories** and outdated helper scripts
4. **Ensure zero build warnings** related to deprecated sections
5. **Maintain language parity** between Romanian (RO) and English (EN) content

## Approach

### Phase 1: HIGH PRIORITY - Active Content Migration
Migrate 9 deprecated sections across 24+ content files to modern equivalents:

1. **feature-details → feature-blocks** (6 pages)
   - Enhanced v4.0 component with parallax scrolling
   - Better visual hierarchy and glassmorphism effects

2. **first-session-timeline → onboarding-steps** (4 pages)
   - More generic, reusable timeline component
   - Better mobile responsiveness

3. **Contact page consolidation** (2 pages: contact.md RO/EN)
   - contact-info-cards → Simplify or consolidate
   - contact-options → Merge with contact-info-cards
   - faq-content → faq-mini (more compact)
   - confidentiality-notice → privacy-guarantee

4. **service-faq-inline → faq-mini** (8 service pages)
   - Standardize FAQ presentation across service pages
   - Reduce maintenance overhead

5. **benefits_section → values-compass** (4 pages)
   - Upgrade to v4.0 enhanced component
   - Better visual presentation with glassmorphism

6. **Remove orphaned office_gallery data** (4 service pages)
   - Data blocks that aren't even in sections arrays
   - Clean up bloat

### Phase 2: MEDIUM PRIORITY - Theme Cleanup
Remove deprecated section template files once content is migrated:

1. Remove 7 deprecated section templates:
   - feature-details.html
   - first-session-timeline.html
   - contact-info-cards.html
   - contact-options.html
   - faq-content.html
   - confidentiality-notice.html
   - service-faq-inline.html

2. Archive or delete `content-old-backup/` directory
   - Currently untracked
   - Add to .gitignore if keeping for reference

### Phase 3: LOW PRIORITY - Documentation Cleanup
Update documentation and remove outdated scripts:

1. Remove or update `scripts/remove-deprecated-sections.py`
   - Script has outdated deprecated sections list
   - No longer in active workflow

2. Archive legacy dev docs
   - `dev/active/contact-form-legacy-migration/` → `dev/archive/`
   - Historical documentation from previous migration phases

3. Update CLAUDE.md if needed
   - Ensure deprecated sections list is accurate
   - Document what was cleaned up in Phase 8+9

## Success Criteria

- [ ] All 24+ content files migrated to modern sections
- [ ] Zero "section not found" warnings in Hugo build
- [ ] Both RO and EN languages working correctly
- [ ] Build time remains <3s
- [ ] All pages render correctly with new sections
- [ ] No visual regressions
- [ ] 7 deprecated template files removed
- [ ] Backup directories cleaned up
- [ ] Documentation updated

## Risks & Mitigation

**Risk 1: Breaking existing pages**
- Mitigation: Read each file before migrating, preserve data structure, test build after each phase

**Risk 2: Visual inconsistencies after migration**
- Mitigation: Use equivalent modern sections, maintain same data fields, visual QA on localhost

**Risk 3: Language parity issues**
- Mitigation: Always migrate RO + EN files together, verify both languages after changes

**Risk 4: Data loss during migration**
- Mitigation: Git commits after each phase, can rollback if needed

**Risk 5: Build failures from missing sections**
- Mitigation: Incremental approach, verify build after each file migration

## Notes

**Context:**
- This follows successful Phase 8 (legacy SCSS cleanup) completed in commit `0862f50`
- The recent fix of `$color-primary-light` undefined variable revealed other legacy remnants
- ITCSS architecture is clean, Bootstrap/jQuery successfully removed
- Main focus is content migration, not code refactoring

**Priority Order:**
1. Start with high-impact, low-risk migrations (feature-details → feature-blocks)
2. Handle complex cases (contact page consolidation) mid-phase
3. Clean up orphaned data last (easy wins)

**Key Files to Monitor:**
- `/content/romanian/contact.md` - 6 deprecated sections
- `/content/english/contact.md` - 6 deprecated sections
- Service pages (8 total) - service-faq-inline migration
- `/content/romanian/abordare.md` + `/content/english/approach.md` - 2 sections each

**Build Verification After Each Phase:**
```bash
hugo --buildDrafts --gc --minify
# Should complete in <3s with zero deprecated section warnings
```
