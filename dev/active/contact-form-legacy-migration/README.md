# Contact Form Migration & Legacy Cleanup

**Created**: 2025-11-22
**Status**: Planning Complete, Ready for Implementation
**Priority**: High
**Estimated Effort**: 6-8 hours over 2-3 sessions

---

## Quick Start

### For Next Session (Where to Begin)

1. **Read OVERVIEW.md** (5 min) - Understand the big picture
2. **Read PROGRESS.md Phase 1** (10 min) - Understand first implementation steps
3. **Start coding**: Extract JavaScript from legacy template to standalone file

### Documentation Structure

| File | Purpose | Read Time |
|------|---------|-----------|
| **README.md** | This file - Quick start guide | 2 min |
| **OVERVIEW.md** | Executive summary, strategy, success criteria | 15 min |
| **PROGRESS.md** | Detailed phase-by-phase task breakdown | 30 min |
| **DECISIONS.md** | Architectural decisions and rationale | 20 min |
| **CONTEXT.md** | Technical implementation details, data flow | 45 min |

---

## Executive Summary

### The Problem

**Dual template system exists**:
- **Legacy template**: Working (email + antispam) but violates BEM architecture
- **New BEM template**: Clean architecture but missing critical functionality

**Goal**: Migrate critical functionality to BEM template, remove legacy, clean up 128KB of legacy code.

### The Solution

**6-Phase Migration Plan**:
1. **Phase 1**: Extract JavaScript to standalone file (1.5h)
2. **Phase 2**: Add security enhancements (honeypot + time validation) (1h)
3. **Phase 3**: Update BEM template with new JavaScript (1h)
4. **Phase 4**: Comprehensive testing (20 test cases) (1.5h)
5. **Phase 5**: Remove legacy template (0.5h)
6. **Phase 6**: Legacy cleanup (remove 128KB legacy code) (2h)

### Critical Functionality to Preserve

✅ **Email sending** via Google Apps Script
✅ **Antispam protection** via reCAPTCHA v3
✅ **Success/error messaging**
✅ **Form validation**
✅ **Multilingual support** (RO + EN)

---

## Phase Status

| Phase | Status | Next Action |
|-------|--------|-------------|
| **Phase 0: Planning** | ✅ Complete | - |
| **Phase 1: Extract JS** | ⏸️ Not Started | Create `assets/js/contact-form-handler.js` |
| **Phase 2: Security** | ⏸️ Blocked by Phase 1 | Add honeypot + time validation |
| **Phase 3: BEM Update** | ⏸️ Blocked by Phase 2 | Update HTML template |
| **Phase 4: Testing** | ⏸️ Blocked by Phase 3 | Run 20 test cases |
| **Phase 5: Remove Legacy** | ⏸️ Blocked by Phase 4 | Delete legacy template |
| **Phase 6: Cleanup** | ⏸️ Blocked by Phase 5 | Remove 128KB legacy code |

---

## Quick Reference

### Files to Create

- [ ] `assets/js/contact-form-handler.js` (Phase 1)
- [ ] i18n translations (7 new strings, Phase 3)
- [ ] Honeypot CSS rules (Phase 2)

### Files to Modify

- [ ] `layouts/partials/sections/contact-form-enhanced.html` (Phase 3)
- [ ] `assets/scss/06-components/_contact-form-enhanced.scss` (Phase 3)
- [ ] `i18n/ro.yaml` + `i18n/en.yaml` (Phase 3)

### Files to Delete (Phase 5-6)

- [ ] `layouts/_default/contact-enhanced.html` (246 lines)
- [ ] `assets/scss/systems/` (56KB directory)
- [ ] `assets/scss/components/` (72KB directory)
- [ ] `assets/scss/_design-system-legacy.scss` (161 lines)
- [ ] 178 `@extend` blocks across 20 files

### Configuration

**Google Apps Script Endpoint**:
```toml
# config/_default/params.toml:3
contact_form_action = "https://script.google.com/macros/s/AKfycbw.../exec"
```

**reCAPTCHA v3 Site Key**:
```javascript
const RECAPTCHA_SITE_KEY = '6Ld0dcwrAAAAAOWMqwdKUMalBY_J-d1WTswuoRG8';
```

---

## Success Criteria

### Functional
- [ ] Email sending works (Google Apps Script)
- [ ] reCAPTCHA v3 token validated
- [ ] Honeypot catches bots
- [ ] Time validation rejects fast submissions
- [ ] Works in RO + EN languages
- [ ] Mobile responsive

### Technical
- [ ] JavaScript extracted to standalone file
- [ ] BEM template uses new JavaScript
- [ ] Legacy template removed
- [ ] Legacy SCSS removed (128KB)
- [ ] Build succeeds: `hugo --gc --minify`
- [ ] Build time: <3 seconds

### Quality
- [ ] 20/20 test cases pass (100%)
- [ ] No console errors
- [ ] Accessible (keyboard + screen reader)
- [ ] Dev docs complete

---

## Risk Mitigation

### Backup Strategy
```bash
# Before Phase 5 (removing legacy template)
git add -A
git commit -m "feat: complete contact form migration - before legacy removal"
git tag before-legacy-contact-removal
```

### Rollback Plan
```bash
# If issues arise
git revert HEAD  # Undo last commit
# OR
git checkout before-legacy-contact-removal -- [file]  # Restore specific file
```

### Testing Requirements
- **Phase 4**: 100% pass rate required before Phase 5
- **No exceptions**: If ANY test fails, debug before proceeding
- **Email verification**: Must receive actual test emails

---

## Timeline

### Session 1 (2-3 hours)
- Phase 1: Extract JavaScript
- Phase 2: Add security enhancements
- Testing: Standalone JavaScript works

### Session 2 (2-3 hours)
- Phase 3: Update BEM template
- Phase 4: Comprehensive testing
- Validation: Production-ready state

### Session 3 (2-3 hours)
- Phase 5: Remove legacy template
- Phase 6: Legacy cleanup
- Final testing + documentation

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Email backend | Keep Google Apps Script | Working reliably, no migration risk |
| Antispam | Keep reCAPTCHA v3 | Invisible, best UX, working |
| JavaScript location | Standalone file | BEM separation, testability |
| Honeypot | Add as enhancement | Defense in depth, zero cost |
| Time validation | Add 3-second threshold | Catches fast bots |
| No-JS fallback | Not implemented | 99.9% users have JS, simpler code |

See **DECISIONS.md** for full rationale.

---

## Data Flow Summary

```
User Fills Form
    ↓
Client Validation (required fields, honeypot, time)
    ↓
Generate reCAPTCHA v3 Token
    ↓
Send FormData to Google Apps Script (no-cors)
    ↓
Server: Verify reCAPTCHA, Store Data, Send Email
    ↓
Client: Show Success Message (assumed success)
```

See **CONTEXT.md** for detailed data flow diagram.

---

## Next Steps

1. **Read OVERVIEW.md** - Understand the full strategy
2. **Read PROGRESS.md Phase 1** - Understand first implementation
3. **Review CONTEXT.md** - See current implementation details
4. **Start Phase 1**: Extract JavaScript to standalone file

---

## Questions?

- **What is the goal?** → Migrate contact form to BEM architecture + cleanup 128KB legacy code
- **What's critical to preserve?** → Google Apps Script email + reCAPTCHA v3 antispam
- **How long will it take?** → 6-8 hours over 2-3 sessions
- **What's the first task?** → Extract 70 lines of inline JavaScript to standalone file
- **What's the risk?** → LOW - Each phase has rollback plan, extensive testing in Phase 4
- **When to remove legacy?** → Only after 100% test pass rate in Phase 4

---

**Status**: Ready for implementation. Start with Phase 1 in next session.
