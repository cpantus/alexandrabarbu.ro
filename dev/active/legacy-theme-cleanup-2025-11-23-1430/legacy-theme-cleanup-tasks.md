# Legacy Theme Cleanup - Tasks

**Last Updated:** 2025-11-23 15:45
**Progress:** 14/36 tasks complete (39%)

## High-Level Phases

- [ ] Phase 1: Active Content Migration (14/24 tasks - 58% complete)
- [ ] Phase 2: Theme Template Cleanup (0/8 tasks)
- [ ] Phase 3: Documentation & Scripts Cleanup (0/4 tasks)

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

#### Phase 1.2: first-session-timeline → onboarding-steps (4 files)
- [ ] Task 1.2.1: Migrate `/content/romanian/abordare.md` - first-session-timeline → onboarding-steps
- [ ] Task 1.2.2: Migrate `/content/romanian/resurse.md` - first-session-timeline → onboarding-steps
- [ ] Task 1.2.3: Migrate `/content/english/approach.md` - first-session-timeline → onboarding-steps
- [ ] Task 1.2.4: Migrate `/content/english/resources.md` - first-session-timeline → onboarding-steps
- [ ] Task 1.2.5: Build verification - ensure no errors
- [ ] Task 1.2.6: Visual QA - check timeline sections render correctly

#### Phase 1.3: Contact page consolidation (2 files, 4 sections)
- [ ] Task 1.3.1: Read both contact.md files - understand full structure
- [ ] Task 1.3.2: Decide consolidation strategy (merge vs separate)
- [ ] Task 1.3.3: Migrate contact-info-cards section (RO + EN)
- [ ] Task 1.3.4: Migrate contact-options section (RO + EN)
- [ ] Task 1.3.5: Migrate faq-content → faq-mini (RO + EN)
- [ ] Task 1.3.6: Migrate confidentiality-notice → privacy-guarantee (RO + EN)
- [ ] Task 1.3.7: Build verification - ensure no errors
- [ ] Task 1.3.8: Visual QA - check contact pages render correctly

#### Phase 1.4: service-faq-inline → faq-mini (8 files)
- [ ] Task 1.4.1: Read one service file - assess faq-mini compatibility
- [ ] Task 1.4.2: Migrate `/content/romanian/servicii/terapie-individuala.md`
- [ ] Task 1.4.3: Migrate `/content/romanian/servicii/terapie-de-cuplu.md`
- [ ] Task 1.4.4: Migrate `/content/romanian/servicii/psihologie-organizationala.md`
- [ ] Task 1.4.5: Migrate `/content/romanian/servicii/terapie-de-familie.md`
- [ ] Task 1.4.6: Migrate `/content/english/services/individual-therapy.md`
- [ ] Task 1.4.7: Migrate `/content/english/services/couples-therapy.md`
- [ ] Task 1.4.8: Migrate `/content/english/services/organizational-psychology.md`
- [ ] Task 1.4.9: Migrate `/content/english/services/family-therapy.md`
- [ ] Task 1.4.10: Build verification - ensure no errors
- [ ] Task 1.4.11: Visual QA - check all service pages

#### Phase 1.5: benefits_section → values-compass (4 files)
- [ ] Task 1.5.1: Read one benefits_section file - understand data structure
- [ ] Task 1.5.2: Migrate `/content/romanian/signup.md`
- [ ] Task 1.5.3: Migrate `/content/romanian/team-building.md`
- [ ] Task 1.5.4: Migrate `/content/romanian/corporate-team-building.md`
- [ ] Task 1.5.5: Migrate `/content/english/corporate-team-building.md`
- [ ] Task 1.5.6: Build verification - ensure no errors
- [ ] Task 1.5.7: Visual QA - check values-compass rendering

#### Phase 1.6: Remove orphaned office_gallery data (4 files)
- [ ] Task 1.6.1: Remove office_gallery from `/content/romanian/terapie-individuala.md`
- [ ] Task 1.6.2: Remove office_gallery from `/content/romanian/terapie-de-cuplu.md`
- [ ] Task 1.6.3: Remove office_gallery from `/content/romanian/terapie-de-familie.md`
- [ ] Task 1.6.4: Remove office_gallery from `/content/romanian/dezvoltare-personala.md`
- [ ] Task 1.6.5: Build verification - ensure no errors

### Phase 2: Theme Template Cleanup (MEDIUM PRIORITY)

- [ ] Task 2.1: Verify all content migrations complete (Phase 1 done)
- [ ] Task 2.2: Remove `themes/andromeda-hugo/layouts/partials/sections/feature-details.html`
- [ ] Task 2.3: Remove `themes/andromeda-hugo/layouts/partials/sections/first-session-timeline.html`
- [ ] Task 2.4: Remove `themes/andromeda-hugo/layouts/partials/sections/contact-info-cards.html`
- [ ] Task 2.5: Remove `themes/andromeda-hugo/layouts/partials/sections/contact-options.html`
- [ ] Task 2.6: Remove `themes/andromeda-hugo/layouts/partials/sections/faq-content.html`
- [ ] Task 2.7: Remove `themes/andromeda-hugo/layouts/partials/sections/confidentiality-notice.html`
- [ ] Task 2.8: Remove `themes/andromeda-hugo/layouts/partials/sections/service-faq-inline.html`
- [ ] Task 2.9: Archive or delete `/content-old-backup/` directory
- [ ] Task 2.10: Add to `.gitignore` if keeping backups
- [ ] Task 2.11: Build verification - ensure no template errors

### Phase 3: Documentation & Scripts Cleanup (LOW PRIORITY)

- [ ] Task 3.1: Review `scripts/remove-deprecated-sections.py` - assess if still useful
- [ ] Task 3.2: Update script with correct deprecated sections list OR remove entirely
- [ ] Task 3.3: Move `dev/active/contact-form-legacy-migration/` to `dev/archive/`
- [ ] Task 3.4: Update CLAUDE.md - document Phase 8+9 cleanup completion
- [ ] Task 3.5: Final build verification - zero deprecated section warnings
- [ ] Task 3.6: Create final git commit summarizing all cleanup work

## Completed Tasks

✅ 2025-11-23 14:00 - Fixed `$color-primary-light` undefined variable in `_pricing.scss`
✅ 2025-11-23 14:30 - Comprehensive legacy theme audit via Explore agent
✅ 2025-11-23 14:30 - Dev docs created for tracking cleanup phases
✅ 2025-11-23 15:45 - Phase 1.1 COMPLETE: feature-details → feature-blocks (6 files, 2 commits)

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
