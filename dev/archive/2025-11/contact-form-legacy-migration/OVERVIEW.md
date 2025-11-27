# Contact Form Migration & Legacy Cleanup - Overview

**Task**: Migrate contact form functionality to new BEM architecture while completing legacy theme cleanup
**Created**: 2025-11-22
**Status**: Planning
**Priority**: High
**Estimated Effort**: 6-8 hours over 2-3 sessions

---

## Executive Summary

### Current State

**Dual Template System**:
- **New BEM template**: `layouts/partials/sections/contact-form-enhanced.html` (158 lines)
  - Clean BEM markup, no JavaScript
  - Uses standard HTML form submission
  - Missing email/antispam functionality

- **Legacy template**: `layouts/_default/contact-enhanced.html` (246 lines)
  - Inline JavaScript (70 lines) handles submission
  - Google Apps Script email sending ✅
  - reCAPTCHA v3 antispam protection ✅
  - Works, but not BEM architecture

### Critical Functionality (MUST Preserve)

1. **Google Apps Script Email Sending**
   - Endpoint: `https://script.google.com/macros/s/AKfycbw.../exec`
   - Method: POST with FormData
   - Fields: name, email, message, recaptcha_token
   - Status: Working ✅

2. **reCAPTCHA v3 Antispam Protection**
   - Site Key: `6Ld0dcwrAAAAAOWMqwdKUMalBY_J-d1WTswuoRG8`
   - Type: Invisible, score-based (v3)
   - Integration: Token generated on submit, appended to FormData
   - Status: Working ✅

3. **User Experience**
   - Success message: "Mesaj trimis cu succes! Vă voi contacta în maxim 24 ore."
   - Error fallback: Phone number provided
   - Form reset on success
   - Loading state during submission

### Migration Strategy

**Approach**: Extract → Enhance → Migrate → Cleanup

```
Phase 1: Extract JavaScript
├─ Extract inline JS from legacy template
├─ Create standalone assets/js/contact-form-handler.js
└─ Preserve all existing functionality

Phase 2: Enhance (Recommended Security)
├─ Add honeypot field (CSS-hidden bot trap)
├─ Add time-based validation (reject <3 sec submissions)
└─ Improve error handling

Phase 3: Update BEM Template
├─ Update contact-form-enhanced.html to use new JavaScript
├─ Add honeypot field to HTML
├─ Test multilingual support (RO + EN)

Phase 4: Test & Validate
├─ Test email sending (success/failure cases)
├─ Test reCAPTCHA token generation
├─ Test honeypot catches bots
├─ Validate on staging environment

Phase 5: Remove Legacy Template
├─ Backup legacy template
├─ Remove layouts/_default/contact-enhanced.html
└─ Update content files if needed

Phase 6: Legacy Cleanup (Full Theme Cleanup)
├─ Remove assets/scss/systems/ (56KB)
├─ Remove assets/scss/components/ (72KB)
├─ Remove _design-system-legacy.scss (161 lines)
├─ Remove 178 @extend compatibility blocks
└─ Update documentation
```

---

## Success Criteria

### Functional Requirements

- [ ] Email sending works (Google Apps Script)
- [ ] reCAPTCHA v3 token generated and validated
- [ ] Honeypot field catches simple bots
- [ ] Time-based validation rejects fast submissions (<3 sec)
- [ ] Success/error messages display correctly
- [ ] Form resets after successful submission
- [ ] Works in both RO and EN languages
- [ ] Mobile responsive (375px, 768px, 1200px)

### Technical Requirements

- [ ] JavaScript extracted to standalone file
- [ ] BEM template uses new JavaScript
- [ ] Legacy template removed
- [ ] Legacy SCSS directories removed
- [ ] Build succeeds: `hugo --gc --minify`
- [ ] Build time: <3 seconds
- [ ] No console errors
- [ ] Accessibility: keyboard navigation, ARIA labels

### Quality Requirements

- [ ] Code documented (comments in JavaScript)
- [ ] Dev docs complete (all phases documented)
- [ ] Testing checklist completed
- [ ] Rollback plan tested
- [ ] Production deployment verified

---

## Risk Assessment

### HIGH RISK (Critical Functionality)

| Risk | Impact | Mitigation |
|------|--------|------------|
| Email sending breaks | Users can't contact | Test thoroughly, keep legacy template until validated |
| reCAPTCHA fails | Spam submissions | Graceful degradation already implemented |
| Google Script endpoint changes | Complete failure | Backup legacy template, document endpoint URL |

### MEDIUM RISK (User Experience)

| Risk | Impact | Mitigation |
|------|--------|------------|
| Success message doesn't display | Confusion | Test both RO/EN languages |
| Form doesn't reset | Minor UX issue | Test form reset logic |
| Loading state missing | No feedback | Test disabled button state |

### LOW RISK (Technical)

| Risk | Impact | Mitigation |
|------|--------|------------|
| Build fails after cleanup | Development blocker | Git version control, rollback plan |
| JavaScript file not loaded | Form doesn't submit | Test asset pipeline |
| Multilingual strings missing | Mixed languages | Test i18n translations |

---

## Timeline Estimate

### Session 1 (2-3 hours)
- Phase 1: Extract JavaScript to standalone file
- Phase 2: Add honeypot + time-based validation
- Testing: Standalone JavaScript works

### Session 2 (2-3 hours)
- Phase 3: Update BEM template
- Phase 4: Full testing (email, antispam, multilingual)
- Validation: Production-ready state

### Session 3 (2-3 hours)
- Phase 5: Remove legacy template
- Phase 6: Legacy cleanup (systems, components, @extend blocks)
- Final testing + documentation update

---

## Dependencies

### External Services
- **Google Apps Script**: Email backend (must remain accessible)
- **Google reCAPTCHA v3**: Antispam service (must remain configured)

### Hugo Configuration
- `config/_default/params.toml`: Contains `contact_form_action` URL
- `i18n/ro.yaml` + `i18n/en.yaml`: Form field translations

### Assets
- `assets/scss/06-components/_contact-form-enhanced.scss`: BEM styles (283 lines)
- `assets/js/contact-form-handler.js`: NEW FILE (to be created)

### Content
- `content/romanian/contact.md`: Romanian contact page
- `content/english/contact.md`: English contact page

---

## Rollback Plan

### If Email Sending Breaks
1. Revert to legacy template: `git checkout HEAD~1 -- layouts/_default/contact-enhanced.html`
2. Update contact page front matter to use legacy layout
3. Test email sending
4. Investigate JavaScript issues

### If Build Fails After Cleanup
1. Restore deleted directories: `git checkout HEAD~1 -- assets/scss/systems/ assets/scss/components/`
2. Restore legacy SCSS imports: `git checkout HEAD~1 -- assets/scss/main-new.scss`
3. Run `hugo --gc --minify`
4. Investigate SCSS errors

### If reCAPTCHA Fails
1. Check browser console for errors
2. Verify site key in JavaScript matches config
3. Test with `grecaptcha` object in console
4. Check Google reCAPTCHA admin console for quota/errors

---

## Next Steps

1. Review this overview document
2. Check PROGRESS.md for detailed task breakdown
3. Check DECISIONS.md for architectural decisions
4. Check CONTEXT.md for technical implementation details
5. Start with Phase 1 in next session

---

## Notes

- Legacy template inline JavaScript is well-written (async/await, error handling)
- reCAPTCHA v3 is properly implemented (invisible, score-based)
- No honeypot currently (recommended enhancement)
- Google Apps Script endpoint is black box (cannot see server-side code)
- No-CORS mode means we can't read response (assumed success)

**Recommendation**: Complete Phases 1-4 first (contact form migration), then Phase 6 (legacy cleanup) as separate task.
