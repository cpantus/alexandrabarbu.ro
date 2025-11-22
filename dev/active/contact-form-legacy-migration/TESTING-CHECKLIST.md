# Contact Form Testing Checklist - Phase 4

**Date**: 2025-11-22
**Status**: Ready for Testing
**Required Pass Rate**: 100% (20/20 tests) before Phase 5

---

## Pre-Testing Setup

### 1. Start Hugo Development Server

```bash
hugo server --buildDrafts
```

**Test URLs**:
- Romanian: http://localhost:1313/contact
- English: http://localhost:1313/en/contact

### 2. Open Browser Developer Tools

- Chrome: `F12` or `Cmd+Option+I` (Mac)
- Firefox: `F12` or `Cmd+Option+I` (Mac)
- Safari: Enable Developer Menu → `Cmd+Option+I`

**Important Tabs**:
- **Console**: Check for JavaScript errors
- **Network**: Monitor fetch requests and reCAPTCHA
- **Elements**: Inspect honeypot field visibility

---

## Test Suite (20 Tests)

### Section 1: Email Sending Tests (5 tests)

#### ✅ Test 1: Valid Form Submission (Romanian)
**URL**: http://localhost:1313/contact
**Steps**:
1. Fill name: "Test User"
2. Fill email: "test@example.com"
3. Fill message: "This is a test message from the Romanian contact form."
4. Wait 5 seconds (time validation)
5. Click "Trimite mesaj"

**Expected**:
- [ ] Success message: "Mesaj trimis cu succes! Vă voi contacta în maxim 24 ore."
- [ ] Form fields cleared
- [ ] Success message auto-dismisses after 10 seconds
- [ ] No console errors

**Actual**: _____________________________

---

#### ✅ Test 2: Valid Form Submission (English)
**URL**: http://localhost:1313/en/contact
**Steps**:
1. Fill name: "Test User"
2. Fill email: "test@example.com"
3. Fill message: "This is a test message from the English contact form."
4. Wait 5 seconds
5. Click "Send message"

**Expected**:
- [ ] Success message in English
- [ ] Form fields cleared
- [ ] No console errors

**Actual**: _____________________________

---

#### ✅ Test 3: Empty Name Field
**URL**: http://localhost:1313/contact
**Steps**:
1. Leave name empty
2. Fill email: "test@example.com"
3. Fill message: "Test message"
4. Click "Trimite mesaj"

**Expected**:
- [ ] Warning message: "Completați toate câmpurile!"
- [ ] Form NOT submitted
- [ ] No network request in Network tab

**Actual**: _____________________________

---

#### ✅ Test 4: Empty Email Field
**URL**: http://localhost:1313/contact
**Steps**:
1. Fill name: "Test User"
2. Leave email empty
3. Fill message: "Test message"
4. Click submit

**Expected**:
- [ ] Warning message shown
- [ ] Form NOT submitted

**Actual**: _____________________________

---

#### ✅ Test 5: Empty Message Field
**URL**: http://localhost:1313/contact
**Steps**:
1. Fill name: "Test User"
2. Fill email: "test@example.com"
3. Leave message empty
4. Click submit

**Expected**:
- [ ] Warning message shown
- [ ] Form NOT submitted

**Actual**: _____________________________

---

### Section 2: reCAPTCHA Tests (3 tests)

#### ✅ Test 6: reCAPTCHA Token Generated
**URL**: http://localhost:1313/contact
**Steps**:
1. Open Network tab
2. Fill valid form data
3. Wait 5 seconds
4. Click submit
5. Check Network tab for requests

**Expected**:
- [ ] Request to `www.google.com/recaptcha/api.js` (script loaded)
- [ ] Request to `google.com/recaptcha` (token generated)
- [ ] Console log: "reCAPTCHA token generated successfully"
- [ ] FormData includes `recaptcha_token` field

**Actual**: _____________________________

---

#### ✅ Test 7: reCAPTCHA Badge Visible
**URL**: http://localhost:1313/contact
**Steps**:
1. Scroll to bottom-right corner of page
2. Look for reCAPTCHA badge

**Expected**:
- [ ] reCAPTCHA v3 badge visible (small logo in bottom-right)
- [ ] Badge shows "protected by reCAPTCHA"
- [ ] Badge is clickable (Privacy/Terms links work)

**Actual**: _____________________________

---

#### ✅ Test 8: reCAPTCHA Graceful Degradation
**URL**: http://localhost:1313/contact
**Steps**:
1. Open browser console
2. Type: `delete window.grecaptcha`
3. Reload page
4. Fill valid form data
5. Submit form

**Expected**:
- [ ] Console warning: "reCAPTCHA not loaded - graceful degradation"
- [ ] Form STILL submits (without token)
- [ ] Success message shown

**Actual**: _____________________________

---

### Section 3: Honeypot Tests (2 tests)

#### ✅ Test 9: Honeypot Field Hidden
**URL**: http://localhost:1313/contact
**Steps**:
1. Open Elements/Inspector tab
2. Search for `name="website"` input
3. Check CSS styles on the field

**Expected**:
- [ ] Honeypot field exists in DOM
- [ ] Field has `position: absolute; left: -9999px`
- [ ] Field has `opacity: 0`
- [ ] Field NOT visible to users (completely hidden)
- [ ] Field has `aria-hidden="true"`

**Actual**: _____________________________

---

#### ✅ Test 10: Honeypot Triggers Rejection
**URL**: http://localhost:1313/contact
**Steps**:
1. Open browser console
2. Fill valid form data
3. In console, type: `document.querySelector('[name="website"]').value = "spam bot"`
4. Submit form

**Expected**:
- [ ] Form submission silently rejected (no error message shown to "bot")
- [ ] Console warning: "Honeypot triggered - bot detected"
- [ ] No network request sent
- [ ] No success message

**Actual**: _____________________________

---

### Section 4: Time-Based Validation Tests (2 tests)

#### ✅ Test 11: Fast Submission Rejected (<3 seconds)
**URL**: http://localhost:1313/contact
**Steps**:
1. Reload page
2. IMMEDIATELY fill all fields (as fast as possible)
3. Submit within 2 seconds of page load

**Expected**:
- [ ] Warning message: "Vă rugăm să completați formularul cu atenție."
- [ ] Console warning: "Form submitted too fast (__ms) - possible bot"
- [ ] Form NOT submitted

**Actual**: _____________________________

---

#### ✅ Test 12: Normal Submission Accepted (>3 seconds)
**URL**: http://localhost:1313/contact
**Steps**:
1. Reload page
2. Wait 5 seconds
3. Fill all fields
4. Submit form

**Expected**:
- [ ] No time validation error
- [ ] Form submits successfully
- [ ] Success message shown

**Actual**: _____________________________

---

### Section 5: User Experience Tests (3 tests)

#### ✅ Test 13: Loading State During Submission
**URL**: http://localhost:1313/contact
**Steps**:
1. Fill valid form data
2. Wait 5 seconds
3. Click submit button
4. Observe button state immediately

**Expected**:
- [ ] Button text changes to "Se trimite..."
- [ ] Button disabled (cannot click again)
- [ ] Button re-enables after submission completes
- [ ] Button text reverts to "Trimite mesaj"

**Actual**: _____________________________

---

#### ✅ Test 14: Form Reset After Success
**URL**: http://localhost:1313/contact
**Steps**:
1. Submit valid form
2. Wait for success message
3. Check form fields

**Expected**:
- [ ] All fields cleared (name, email, message)
- [ ] Form ready for new submission
- [ ] No residual data in fields

**Actual**: _____________________________

---

#### ✅ Test 15: Error Message with Fallback Contact
**URL**: http://localhost:1313/contact
**Steps**:
1. Disconnect from internet (or simulate network error)
2. Fill valid form data
3. Submit form

**Expected**:
- [ ] Error message: "Eroare! Încercați din nou sau contactați direct: +40 722.123.456"
- [ ] Phone number is clickable link (`tel:` protocol)
- [ ] Form data NOT cleared (user can retry)

**Actual**: _____________________________

---

### Section 6: Responsive Design Tests (3 tests)

#### ✅ Test 16: Mobile (375px)
**URL**: http://localhost:1313/contact
**Steps**:
1. Open DevTools → Device Toolbar (iPhone SE or similar)
2. Set width to 375px
3. Test form submission

**Expected**:
- [ ] Form fits screen width
- [ ] All fields accessible
- [ ] Submit button accessible
- [ ] No horizontal scrolling
- [ ] Form submits successfully

**Actual**: _____________________________

---

#### ✅ Test 17: Tablet (768px)
**URL**: http://localhost:1313/contact
**Steps**:
1. Set width to 768px (iPad)
2. Test form submission

**Expected**:
- [ ] Layout adapts to tablet width
- [ ] Form submits successfully

**Actual**: _____________________________

---

#### ✅ Test 18: Desktop (1200px+)
**URL**: http://localhost:1313/contact
**Steps**:
1. Set width to 1920px (full desktop)
2. Test form submission

**Expected**:
- [ ] Two-column layout (image left, form right)
- [ ] Form submits successfully

**Actual**: _____________________________

---

### Section 7: Accessibility Tests (2 tests)

#### ✅ Test 19: Keyboard Navigation
**URL**: http://localhost:1313/contact
**Steps**:
1. Click in browser address bar
2. Press `Tab` repeatedly
3. Fill form using only keyboard
4. Submit using `Enter` on submit button

**Expected**:
- [ ] Can tab through all fields (name → email → message → submit)
- [ ] Focus indicators visible on each field
- [ ] Can submit form with Enter key
- [ ] Honeypot field NOT in tab order (tabindex="-1")

**Actual**: _____________________________

---

#### ✅ Test 20: Console Error Check (Final Validation)
**URL**: http://localhost:1313/contact and http://localhost:1313/en/contact
**Steps**:
1. Open Console tab
2. Reload page (RO)
3. Check for errors
4. Switch to EN page
5. Check for errors

**Expected**:
- [ ] No JavaScript errors in console (RO)
- [ ] No JavaScript errors in console (EN)
- [ ] Only expected logs: "Contact form handler initialized", "reCAPTCHA token generated"
- [ ] No 404 errors in Network tab
- [ ] JavaScript file loads: `contact-form-handler.js`

**Actual**: _____________________________

---

## Test Results Summary

**Date Tested**: _______________
**Tested By**: _______________
**Browser**: _______________
**Pass Rate**: ___ / 20 tests (___%)

### Results Breakdown

| Category | Passed | Failed | Pass Rate |
|----------|--------|--------|-----------|
| Email Sending (5) | ___ | ___ | ___% |
| reCAPTCHA (3) | ___ | ___ | ___% |
| Honeypot (2) | ___ | ___ | ___% |
| Time Validation (2) | ___ | ___ | ___% |
| User Experience (3) | ___ | ___ | ___% |
| Responsive (3) | ___ | ___ | ___% |
| Accessibility (2) | ___ | ___ | ___% |

### Failed Tests (if any)

1. Test #___: _________________________________
   - Issue: _________________________________
   - Priority: High / Medium / Low

2. Test #___: _________________________________
   - Issue: _________________________________
   - Priority: High / Medium / Low

---

## Next Steps

### If 100% Pass Rate (20/20)
✅ **PROCEED TO PHASE 5**: Remove legacy template
- Create backup commit: `git tag before-legacy-contact-removal`
- Delete `themes/andromeda-hugo/layouts/_default/contact-enhanced.html`
- Test contact pages still work
- Proceed to Phase 6 (legacy cleanup)

### If <100% Pass Rate
❌ **DO NOT PROCEED**: Debug and fix failing tests
- Document all failures in detail
- Fix JavaScript/HTML/SCSS issues
- Re-run full test suite
- Must achieve 100% before Phase 5

---

## Notes & Observations

(Add any additional observations, edge cases discovered, or recommendations)

_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________

---

**Critical Reminder**: Phase 5 (removing legacy template) should ONLY proceed after 100% test pass rate. No exceptions.
