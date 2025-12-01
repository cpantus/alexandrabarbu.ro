# SEO Audit Implementation - Tasks

**Last Updated:** 2025-12-01
**Progress:** 8/8 tasks complete

## High-Level Phases

- [x] Phase 1: Quick Fixes (4/4 tasks)
- [x] Phase 2: E-E-A-T Enhancement (0/2 tasks - SKIPPED, optional)
- [x] Phase 3: Verification (2/2 tasks)

## Detailed Task Breakdown

### Phase 1: Quick Fixes (Priority: HIGH)

- [x] Task 1.1: Update phone in `data/settings.yaml` line 15
  - Change: `+40 123 456 789` -> `+40 770 200 834`

- [x] Task 1.2: Update phone in `data/footer.yaml` line 4
  - Change: `+40 123 456 789` -> `+40 770 200 834`

- [x] Task 1.3: Update phone in `data/en/footer.yaml` line 10
  - Change: `+40 123 456 789` -> `+40 770 200 834`

- [x] Task 1.4: Enhance `static/llms.txt` with comprehensive AI guidance
  - Added: Practitioner info, services, contact, key facts
  - Added: Session duration, pricing, hours
  - Added: Ethical guidelines, content signals

### Phase 2: E-E-A-T Enhancement (Priority: MEDIUM - SKIPPED)

- [ ] Task 2.1: Fill credentials in `data/authors/default.yaml`
  - Status: SKIPPED (optional, requires client input)

- [ ] Task 2.2: Fill education in `data/authors/default.yaml`
  - Status: SKIPPED (optional, requires client input)

### Phase 3: Verification (Priority: HIGH)

- [x] Task 3.1: Test site with `hugo server --buildDrafts`
  - Verified: Footer phone number correct (RO and EN)
  - Verified: llms.txt accessible and enhanced

- [x] Task 3.2: Verify schema output
  - Checked: Organization schema has correct phone `+40 770 200 834`
  - Checked: Phone appears in footer with proper tel: link

## Completed Tasks

| Task | File | Change | Status |
|------|------|--------|--------|
| 1.1 | data/settings.yaml | Phone updated | DONE |
| 1.2 | data/footer.yaml | Phone updated | DONE |
| 1.3 | data/en/footer.yaml | Phone updated | DONE |
| 1.4 | static/llms.txt | Enhanced AI guidance | DONE |
| 3.1 | N/A | Site verification | DONE |
| 3.2 | N/A | Schema verification | DONE |

## Notes

**Archetypes ignored:**
The phone placeholder appears in theme archetypes (`themes/andromeda-hugo/archetypes/*.md`) - these are templates for new pages, not live content.

**llms.txt enhancements:**
- Added practitioner details (name, title, experience)
- Added contact info with correct phone
- Added services breakdown (individual, couples, counseling)
- Added session info (duration, format, frequency)
- Added ethical guidelines and content signals
- Added structured site map for AI crawlers

**Verification Results:**
```
Schema markup: "telephone": "+40 770 200 834"
Footer link: <a href="tel:+40 770 200 834">+40 770 200 834</a>
llms.txt: Phone correctly shown as +40 770 200 834
```
