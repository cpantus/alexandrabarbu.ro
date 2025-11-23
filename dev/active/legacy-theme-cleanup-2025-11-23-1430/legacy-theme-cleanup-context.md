# Legacy Theme Cleanup - Context

**Last Updated:** 2025-11-23 15:45

## Quick Reference

**Status:** In Progress - Phase 1.1 Complete, Phase 1.2 Next
**Current Focus:** Phase 1.1 complete (feature-details migration)
**Next Step:** Phase 1.2 - first-session-timeline → onboarding-steps (4 files)

## Key Files Modified

**Phase 1.1: feature-details → feature-blocks COMPLETE ✅**
- 6 files migrated (contact, abordare/approach, resurse/resources - RO+EN)
- Git commits: 6df9e4f, f36ef71
- Build: 545ms, zero deprecated warnings
- Language parity maintained

**Files Modified:**
- content/romanian/contact.md
- content/english/contact.md
- content/romanian/abordare.md
- content/english/approach.md
- content/romanian/resurse.md
- content/english/resources.md

## Key Decisions Made

**2025-11-23 - Migration Strategy**
- **Context:** 9 deprecated sections found in active content after Phase 8 SCSS cleanup
- **Decision:** Three-phase approach (High→Medium→Low priority)
- **Rationale:**
  - Minimize risk by tackling simple migrations first
  - Maintain language parity (always RO+EN together)
  - Incremental verification (build after each phase)
- **Alternatives Considered:**
  - Bulk migration (too risky, harder to debug)
  - Leave deprecated sections (technical debt accumulation)

**2025-11-23 - Section Migration Mappings**
- **Context:** Need modern equivalents for deprecated sections
- **Decisions:**
  - `feature-details` → `feature-blocks` (v4.0 enhanced)
  - `first-session-timeline` → `onboarding-steps` (more generic)
  - `faq-content` → `faq-mini` (more compact)
  - `confidentiality-notice` → `privacy-guarantee` (semantic equivalent)
  - `benefits_section` → `values-compass` (v4.0 upgrade)
  - Contact sections → Consolidate (reduce duplication)
  - `office_gallery` → Remove orphaned data (not in sections arrays)
- **Rationale:** Use v4.0 components where available, maintain semantic meaning, reduce component count
- **Alternatives Considered:** Create new sections (adds complexity, goes against reuse principle)

## Open Questions

1. **Contact page consolidation:** Should we merge contact-info-cards + contact-options into single section, or keep separate?
   - Decision needed before migrating contact.md
   - Impact: 2 files (RO + EN)

2. **service-faq-inline migration:** Keep as dedicated component or standardize to faq-mini?
   - Currently used in 8 service pages
   - service-faq-inline has service-specific styling
   - Decision: Assess if faq-mini can handle service-specific needs

3. **Showcase files:** Should deprecated sections remain in showcase files or migrate?
   - Files: 6 showcase pages (componente-showcase*.md, components-showcase*.md)
   - Current status: Intentionally contain all sections for demo
   - Decision: Likely keep as-is for historical reference

## Blockers

None currently - ready to proceed with Phase 1

## Testing Notes

**What's been tested:**
- Build verification after $color-primary-light fix: ✅ Passing (566ms, 38 pages)
- Legacy audit via Explore agent: ✅ Complete

**What still needs testing:**
- [ ] Build after each content file migration
- [ ] Visual QA on localhost for migrated pages
- [ ] Both RO and EN language versions
- [ ] Mobile responsiveness of new sections
- [ ] All 36 active sections render correctly

## Migration Checklist by File

### Phase 1.1: feature-details → feature-blocks (6 files)
- [ ] `/content/romanian/contact.md` (line 12)
- [ ] `/content/romanian/abordare.md` (line 12)
- [ ] `/content/romanian/resurse.md` (line 14)
- [ ] `/content/english/contact.md` (line 12)
- [ ] `/content/english/approach.md` (line 12)
- [ ] `/content/english/resources.md` (line 13)

### Phase 1.2: first-session-timeline → onboarding-steps (4 files)
- [ ] `/content/romanian/abordare.md` (line 13)
- [ ] `/content/romanian/resurse.md` (line 15)
- [ ] `/content/english/approach.md` (line 13)
- [ ] `/content/english/resources.md` (line 14)

### Phase 1.3: Contact page sections (2 files, 4 sections each)
- [ ] `/content/romanian/contact.md` - contact-info-cards (line 9)
- [ ] `/content/romanian/contact.md` - contact-options (line 10)
- [ ] `/content/romanian/contact.md` - faq-content (line 14)
- [ ] `/content/romanian/contact.md` - confidentiality-notice (line 15)
- [ ] `/content/english/contact.md` - contact-info-cards (line 9)
- [ ] `/content/english/contact.md` - contact-options (line 10)
- [ ] `/content/english/contact.md` - faq-content (line 14)
- [ ] `/content/english/contact.md` - confidentiality-notice (line 15)

### Phase 1.4: service-faq-inline → faq-mini (8 files)
- [ ] `/content/romanian/servicii/terapie-individuala.md`
- [ ] `/content/romanian/servicii/terapie-de-cuplu.md`
- [ ] `/content/romanian/servicii/psihologie-organizationala.md`
- [ ] `/content/romanian/servicii/terapie-de-familie.md`
- [ ] `/content/english/services/individual-therapy.md`
- [ ] `/content/english/services/couples-therapy.md`
- [ ] `/content/english/services/organizational-psychology.md`
- [ ] `/content/english/services/family-therapy.md`

### Phase 1.5: benefits_section → values-compass (4 files)
- [ ] `/content/romanian/signup.md`
- [ ] `/content/romanian/team-building.md`
- [ ] `/content/romanian/corporate-team-building.md`
- [ ] `/content/english/corporate-team-building.md`

### Phase 1.6: Remove orphaned office_gallery (4 files)
- [ ] `/content/romanian/terapie-individuala.md` (lines 120-147)
- [ ] `/content/romanian/terapie-de-cuplu.md` (lines 94-121)
- [ ] `/content/romanian/terapie-de-familie.md` (lines 94-121)
- [ ] `/content/romanian/dezvoltare-personala.md` (lines 120-147)

## Before Compaction Checklist

Before context gets compacted, ensure:
- [ ] All key decisions documented above
- [ ] File changes logged in "Key Files Modified"
- [ ] Next steps clearly stated in "Quick Reference"
- [ ] Open questions captured
- [ ] tasks.md updated with completed phases
- [ ] Git commits created for each phase
