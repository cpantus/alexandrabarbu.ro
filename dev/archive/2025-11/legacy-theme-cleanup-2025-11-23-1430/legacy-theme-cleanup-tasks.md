# Legacy Theme Cleanup - Tasks

**Last Updated:** 2025-11-23 19:00
**Progress:** 57/57 tasks complete (100%) - ALL PHASES COMPLETE ✅

## High-Level Phases

- [x] Phase 1: Active Content Migration (45/45 tasks - 100% COMPLETE ✅)
- [x] Phase 2: Theme Template Cleanup (5/5 tasks - 100% COMPLETE ✅)
- [x] Phase 3: Documentation & Scripts Cleanup (7/7 tasks - 100% COMPLETE ✅)

## Detailed Task Breakdown

### Phase 1: Active Content Migration (HIGH PRIORITY)

#### Phase 1.1: feature-details → feature-blocks (6 files) ✅ COMPLETE
- [x] Task 1.1.1: Read `/content/romanian/contact.md` - understand current structure
- [x] Task 1.1.2: Migrate `/content/romanian/contact.md` - feature-details → feature-blocks
- [x] Task 1.1.3: Read `/content/romanian/abordare.md` - understand current structure
- [x] Task 1.1.4: Migrate `/content/romanian/abordare.md` - feature-details → feature-blocks
- [x] Task 1.1.5: Read `/content/romanian/resurse.md` - understand current structure
- [x] Task 1.1.6: Migrate `/content/romanian/resurse.md` - feature-details → feature-blocks
- [x] Task 1.1.7: Read `/content/english/contact.md` - understand current structure
- [x] Task 1.1.8: Migrate `/content/english/contact.md` - feature-details → feature-blocks
- [x] Task 1.1.9: Read `/content/english/approach.md` - understand current structure
- [x] Task 1.1.10: Migrate `/content/english/approach.md` - feature-details → feature-blocks
- [x] Task 1.1.11: Read `/content/english/resources.md` - understand current structure
- [x] Task 1.1.12: Migrate `/content/english/resources.md` - feature-details → feature-blocks
- [x] Task 1.1.13: Build verification - ensure no errors
- [x] Task 1.1.14: Visual QA - check pages on localhost (RO + EN)

#### Phase 1.2: first-session-timeline → onboarding-steps (4 files) ✅ COMPLETE
- [x] Task 1.2.1: Migrate `/content/romanian/abordare.md` - first-session-timeline → onboarding-steps
- [x] Task 1.2.2: Migrate `/content/romanian/resurse.md` - first-session-timeline → onboarding-steps
- [x] Task 1.2.3: Migrate `/content/english/approach.md` - first-session-timeline → onboarding-steps
- [x] Task 1.2.4: Migrate `/content/english/resources.md` - first-session-timeline → onboarding-steps
- [x] Task 1.2.5: Build verification - ensure no errors
- [x] Task 1.2.6: Visual QA - check timeline sections render correctly

#### Phase 1.3: Contact page sections (2 files, 2 sections) ✅ COMPLETE
- [x] Task 1.3.1: Read both contact.md files - understand full structure
- [x] Task 1.3.2: Decide consolidation strategy (keep contact-info-cards & contact-options - NOT deprecated)
- [x] Task 1.3.3: Migrate faq-content → faq-mini (RO + EN)
- [x] Task 1.3.4: Migrate confidentiality-notice → privacy-guarantee (RO + EN)
- [x] Task 1.3.5: Build verification - ensure no errors
- [x] Task 1.3.6: Visual QA - check contact pages render correctly

#### Phase 1.4: service-faq-inline → faq-mini (8 files) ✅ COMPLETE
- [x] Task 1.4.1: Read one service file - assess faq-mini compatibility
- [x] Task 1.4.2: Migrate `/content/romanian/servicii/terapie-individuala.md`
- [x] Task 1.4.3: Migrate `/content/romanian/servicii/terapie-de-cuplu.md`
- [x] Task 1.4.4: Migrate `/content/romanian/servicii/psihologie-organizationala.md`
- [x] Task 1.4.5: Migrate `/content/romanian/servicii/terapie-de-familie.md`
- [x] Task 1.4.6: Migrate `/content/english/services/individual-therapy.md`
- [x] Task 1.4.7: Migrate `/content/english/services/couples-therapy.md`
- [x] Task 1.4.8: Migrate `/content/english/services/organizational-psychology.md`
- [x] Task 1.4.9: Migrate `/content/english/services/family-therapy.md`
- [x] Task 1.4.10: Build verification - ensure no errors
- [x] Task 1.4.11: Visual QA - check all service pages

#### Phase 1.5: Remove orphaned benefits_section (4 files) ✅ COMPLETE
- [x] Task 1.5.1: Verify benefits_section is orphaned (not in sections array, no template)
- [x] Task 1.5.2: Remove from `/content/romanian/signup.md`
- [x] Task 1.5.3: Remove from `/content/romanian/team-building.md`
- [x] Task 1.5.4: Remove from `/content/romanian/corporate-team-building.md`
- [x] Task 1.5.5: Remove from `/content/english/corporate-team-building.md`
- [x] Task 1.5.6: Build verification - ensure no errors
- [x] Task 1.5.7: Verify cleanup complete

#### Phase 1.6: Remove orphaned office_gallery data (4 files) ✅ COMPLETE
- [x] Task 1.6.1: Remove office_gallery from `/content/romanian/terapie-individuala.md`
- [x] Task 1.6.2: Remove office_gallery from `/content/romanian/terapie-de-cuplu.md`
- [x] Task 1.6.3: Remove office_gallery from `/content/romanian/terapie-de-familie.md`
- [x] Task 1.6.4: Remove office_gallery from `/content/romanian/dezvoltare-personala.md`
- [x] Task 1.6.5: Build verification - ensure no errors

### Phase 2: Theme Template Cleanup (MEDIUM PRIORITY) ✅ COMPLETE

- [x] Task 2.1: Verify all content migrations complete (Phase 1 done)
- [x] Task 2.2: Remove deprecated section templates (5 files removed)
  - Removed: feature-details.html, first-session-timeline.html, faq-content.html
  - Removed: confidentiality-notice.html, service-faq-inline.html
  - Kept: contact-info-cards.html, contact-options.html (NOT deprecated)
- [x] Task 2.3: Check for backup directories (none found - already clean)
- [x] Task 2.4: Build verification - zero deprecated section warnings in active content
- [x] Task 2.5: Verify showcase files still work (warnings expected, intentional demo reference)

### Phase 3: Documentation & Scripts Cleanup (LOW PRIORITY) ✅ COMPLETE

- [x] Task 3.1: Review cleanup scripts - assessed all 4 scripts
- [x] Task 3.2: Archive obsolete script - moved remove-deprecated-sections.py to scripts/archive/
- [x] Task 3.3: Archive completed dev docs - moved contact-form-legacy-migration/ to dev/archive/
- [x] Task 3.4: Update CLAUDE.md - updated section counts (36 → 31), removed deprecated sections
- [x] Task 3.5: Final build verification - 39 RO + 33 EN pages, zero active warnings ✅
- [x] Task 3.6: Update dev docs - Phase 3 completion documented
- [x] Task 3.7: Ready for final git commit

## Completed Tasks

✅ 2025-11-23 14:00 - Fixed `$color-primary-light` undefined variable in `_pricing.scss`
✅ 2025-11-23 14:30 - Comprehensive legacy theme audit via Explore agent
✅ 2025-11-23 14:30 - Dev docs created for tracking cleanup phases
✅ 2025-11-23 15:45 - Phase 1.1 COMPLETE: feature-details → feature-blocks (6 files, 2 commits)
✅ 2025-11-23 16:00 - Phase 1.2 COMPLETE: first-session-timeline → onboarding-steps (4 files)
✅ 2025-11-23 16:15 - Phase 1.3 COMPLETE: Contact sections (faq-content→faq-mini, confidentiality-notice→privacy-guarantee, 2 files)
✅ 2025-11-23 16:30 - Phase 1.4 COMPLETE: service-faq-inline → faq-mini (8 service files - RO+EN parity maintained)
✅ 2025-11-23 16:45 - Phase 1.5 COMPLETE: Removed orphaned benefits_section data (4 files - never rendered, no template exists)
✅ 2025-11-23 17:00 - Phase 1.6 COMPLETE: Removed orphaned office_gallery data (4 files - never rendered, no template exists)
🎉 2025-11-23 17:00 - PHASE 1 COMPLETE: All active content migrated/cleaned (18 files total across 6 sub-phases)
✅ 2025-11-23 18:30 - PHASE 2 COMPLETE: Removed 5 deprecated section templates, build passes (556ms, zero active warnings)
✅ 2025-11-23 19:00 - PHASE 3 COMPLETE: Documentation updated, obsolete scripts archived, final verification passed
🎉 2025-11-23 19:00 - ALL PHASES COMPLETE: Legacy cleanup fully complete (57/57 tasks, 100%)

## Notes

**Task Dependencies:**
- Phase 2 cannot start until Phase 1 is 100% complete (content must be migrated before removing templates)
- Phase 3 can run in parallel with Phase 2 (documentation cleanup independent)

**Git Commit Strategy:**
- Commit after each sub-phase (1.1, 1.2, 1.3, etc.)
- Enables rollback if issues discovered
- Clear commit messages: "feat: migrate feature-details to feature-blocks (6 pages)"

**Build Verification Pattern:**
```bash
hugo --buildDrafts --gc --minify
# Check for:
# - Zero "section not found" warnings
# - Build time <3s
# - 38+ pages generated successfully
```

**Visual QA Checklist:**
- [ ] Desktop view (1200px+)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px)
- [ ] Romanian language
- [ ] English language
- [ ] All sections render
- [ ] No visual regressions
- [ ] Animations work (feature-blocks parallax, etc.)
