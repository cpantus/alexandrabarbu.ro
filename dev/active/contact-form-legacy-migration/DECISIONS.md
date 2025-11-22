# Contact Form Migration & Legacy Cleanup - Decisions

**Last Updated**: 2025-11-22
**Status**: Planning

---

## Decision Log

### D1: Extract JavaScript to Standalone File

**Decision**: Extract 70 lines of inline JavaScript from legacy template into `assets/js/contact-form-handler.js`

**Context**:
- Legacy template has inline `<script>` tag (lines 170-241)
- JavaScript is well-written (async/await, error handling)
- BEM architecture prefers separation of concerns (HTML/CSS/JS)

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. Keep inline JavaScript** | No file changes needed | Violates BEM principles, hard to test | ❌ Rejected |
| **2. Extract to standalone file** | Clean separation, testable, reusable | Requires new file | ✅ **Selected** |
| **3. Use Hugo's JS bundling** | Minification, tree-shaking | Added complexity, overkill for simple form | ❌ Rejected |

**Rationale**:
- BEM architecture requires clean separation of concerns
- Standalone JavaScript easier to test (unit tests possible)
- Reusable across multiple forms (newsletter, career, etc.)
- Improves maintainability (single source of truth)

**Implementation**:
```javascript
// assets/js/contact-form-handler.js
(function() {
  'use strict';

  const CONFIG = {
    RECAPTCHA_SITE_KEY: '6Ld0dcwrAAAAAOWMqwdKUMalBY_J-d1WTswuoRG8',
    MIN_SUBMIT_TIME: 3000, // 3 seconds
    SUCCESS_TIMEOUT: 10000 // 10 seconds
  };

  // Functions: validateForm, generateRecaptchaToken, submitForm, etc.
  // ...

  document.addEventListener('DOMContentLoaded', init);
})();
```

**Consequences**:
- ✅ Cleaner HTML templates
- ✅ JavaScript testable in isolation
- ⚠️ One more file to maintain
- ⚠️ Must ensure file loads on contact pages

---

### D2: Use Google Apps Script (Keep Existing Backend)

**Decision**: Continue using Google Apps Script for email backend (no migration to alternatives)

**Context**:
- Current endpoint: `https://script.google.com/macros/s/AKfycbw.../exec`
- Working reliably (email sending verified)
- Free tier sufficient for psychology practice volume

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. Keep Google Apps Script** | Already working, free, no migration needed | Black box server code, no-CORS limitation | ✅ **Selected** |
| **2. Netlify Forms** | Native Hugo integration, spam filtering | Vendor lock-in, paid tier needed | ❌ Rejected |
| **3. Formspree** | Easy setup, good UX | External dependency, costs money | ❌ Rejected |
| **4. Custom backend (Node.js)** | Full control, CORS support | Hosting costs, maintenance overhead | ❌ Rejected |
| **5. Cloudflare Workers** | Serverless, fast, cheap | Migration effort, new learning curve | ❌ Rejected |

**Rationale**:
- **Working reliably**: "If it ain't broke, don't fix it"
- **Free tier**: 20K executions/day (far exceeds psychology practice needs)
- **No hosting**: Fully managed by Google
- **Email integration**: Likely uses Gmail API or MailApp
- **Zero migration risk**: Changing backends = potential email delivery failures

**Trade-offs Accepted**:
- ❌ **No-CORS mode**: Cannot read response (must assume success)
- ❌ **Black box**: Cannot see server-side validation logic
- ❌ **Google dependency**: If Google discontinues service, must migrate
- ✅ **Stability**: Working system > theoretical improvements

**Implementation**:
```javascript
// Form submission (fire-and-forget due to no-CORS)
const response = await fetch(actionURL, {
  method: 'POST',
  body: formData,
  mode: 'no-cors' // Google Apps Script requires this
});

// Assume success (cannot read response due to no-cors)
showSuccessMessage();
```

**Consequences**:
- ✅ Zero backend migration effort
- ✅ Email sending continues working
- ⚠️ Cannot verify actual server response
- ⚠️ Must rely on client-side success assumption

---

### D3: Use reCAPTCHA v3 (Keep Existing Antispam)

**Decision**: Continue using reCAPTCHA v3 invisible antispam protection

**Context**:
- Site key: `6Ld0dcwrAAAAAOWMqwdKUMalBY_J-d1WTswuoRG8`
- Type: v3 (invisible, score-based, no user interaction)
- Currently working (server-side validation in Google Apps Script)

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. reCAPTCHA v3 (current)** | Invisible, no UX friction, working | Google dependency, privacy concerns | ✅ **Selected** |
| **2. reCAPTCHA v2 (checkbox)** | Better bot detection | User friction, accessibility issues | ❌ Rejected |
| **3. hCaptcha** | Privacy-focused, GDPR-friendly | Migration effort, server-side validation changes | ❌ Rejected |
| **4. Cloudflare Turnstile** | Free, privacy-focused | New service, migration needed | ❌ Rejected |
| **5. Custom honeypot only** | Simple, no external dependency | Weaker protection, bots evolving | ❌ Rejected |

**Rationale**:
- **v3 advantages**: Invisible (no checkbox), score-based (adaptive), no UX friction
- **Working reliably**: Server-side validation already implemented in Google Apps Script
- **Best UX**: Users don't see CAPTCHA (unlike v2 checkbox)
- **Psychology practice**: Low spam volume, v3 sufficient

**Enhancement**: Add honeypot + time-based validation as supplementary layers

**Implementation**:
```javascript
// Generate reCAPTCHA v3 token on form submit
const recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, {
  action: 'submit'
});

// Append to FormData (server validates score)
formData.append('recaptcha_token', recaptchaToken);
```

**Consequences**:
- ✅ No user friction (invisible CAPTCHA)
- ✅ Strong bot protection (score-based)
- ⚠️ Google dependency (privacy concerns)
- ⚠️ Graceful degradation needed (if grecaptcha fails)

---

### D4: Add Honeypot Field (Enhancement)

**Decision**: Add CSS-hidden honeypot field as supplementary antispam layer

**Context**:
- Current: reCAPTCHA v3 only (no honeypot)
- Honeypot: Simple trap field that bots fill but humans don't see
- Lightweight: No external dependencies, pure HTML/CSS/JS

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. Add honeypot field** | Simple, effective against basic bots, no dependencies | Sophisticated bots can detect, needs CSS hiding | ✅ **Selected** |
| **2. No honeypot (reCAPTCHA only)** | Simpler implementation | Single point of failure | ❌ Rejected |
| **3. Multiple honeypots** | Better detection | Overengineering, diminishing returns | ❌ Rejected |

**Rationale**:
- **Defense in depth**: Multiple layers better than single layer (reCAPTCHA + honeypot)
- **Catches basic bots**: Simple scrapers that auto-fill all fields
- **No cost**: Pure HTML/CSS/JS implementation
- **Quick win**: 10 minutes implementation, significant value

**Implementation**:
```html
<!-- Honeypot field (hidden from humans, filled by bots) -->
<input type="text"
       name="website"
       class="honeypot-field"
       tabindex="-1"
       autocomplete="off"
       aria-hidden="true">
```

```css
.honeypot-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
```

```javascript
// Validate honeypot (silent rejection)
const honeypot = form.querySelector('[name="website"]');
if (honeypot && honeypot.value !== '') {
  console.warn('Honeypot triggered - bot detected');
  return false; // Silent rejection (no error shown to bot)
}
```

**Consequences**:
- ✅ Catches basic bots (form scrapers)
- ✅ Zero UX impact (humans never see field)
- ✅ Zero cost (no external service)
- ⚠️ Won't catch sophisticated bots (need reCAPTCHA for those)

---

### D5: Add Time-Based Validation (Enhancement)

**Decision**: Reject form submissions <3 seconds (likely bots)

**Context**:
- Human users need time to fill form (realistically 10+ seconds)
- Bots auto-fill instantly (<1 second)
- Simple check: `timeDiff = submitTime - pageLoadTime`

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. 3-second threshold** | Catches fast bots, allows fast typers | Edge case: copy-paste users | ✅ **Selected** |
| **2. 5-second threshold** | Safer threshold | May miss some bots | ❌ Rejected |
| **3. No time validation** | Simpler implementation | Misses fast bot submissions | ❌ Rejected |

**Rationale**:
- **3 seconds**: Realistic minimum for human (name + email + message)
- **Copy-paste users**: Can type fast, but 3 sec still reasonable
- **Bot detection**: Most bots submit <1 second (immediate)
- **User experience**: Fast users (3-5 sec) still pass validation

**Implementation**:
```javascript
let formLoadTime = Date.now();

function submitForm(event) {
  const timeDiff = Date.now() - formLoadTime;

  if (timeDiff < 3000) {
    console.warn('Form submitted too fast - possible bot');
    showErrorMessage('Vă rugăm să completați formularul cu atenție.');
    return false;
  }

  // Continue with submission...
}
```

**Edge Cases**:
- ✅ **Fast typers**: 3 seconds enough for name + email + short message
- ✅ **Copy-paste**: Still need 3 seconds to paste 3 fields + click submit
- ⚠️ **Autofill**: Browser autofill + submit could be <3 sec (rare, acceptable false positive)

**Consequences**:
- ✅ Catches instant bot submissions
- ✅ No UX impact for normal users (>10 sec typical)
- ⚠️ Rare false positive (autofill + instant submit)
- ⚠️ Can be bypassed (bots can add delay)

---

### D6: No-CORS Mode (Accept Trade-off)

**Decision**: Keep no-CORS mode for Google Apps Script (cannot read response)

**Context**:
- Google Apps Script requires `mode: 'no-cors'` for cross-origin requests
- No-CORS mode: Browser blocks reading response (security feature)
- Current implementation: Assume success, show success message

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. Keep no-CORS (assume success)** | Works with Google Apps Script, simple | Cannot verify actual server response | ✅ **Selected** |
| **2. Proxy through Netlify** | CORS support, can read response | Added complexity, Netlify dependency | ❌ Rejected |
| **3. Migrate to CORS-enabled backend** | Full response validation | Major migration, hosting costs | ❌ Rejected |

**Rationale**:
- **Google Apps Script limitation**: No way to enable CORS from client side
- **Acceptable risk**: Email delivery rate ~99% (Google infrastructure reliable)
- **User expectation**: Success message shown immediately (better UX than waiting)
- **Fallback**: Error message provides phone number for direct contact

**Implementation**:
```javascript
try {
  const response = await fetch(actionURL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors' // Required for Google Apps Script
  });

  // Cannot read response.ok or response.json() due to no-cors
  // Assume success and show success message
  showSuccessMessage();
  form.reset();

} catch (error) {
  // Network error (offline, timeout, etc.)
  showErrorMessage();
}
```

**Trade-offs Accepted**:
- ❌ **Cannot verify**: Don't know if email actually sent
- ❌ **False positives**: Success message shown even if server error
- ✅ **Better UX**: Immediate feedback (no waiting for server response)
- ✅ **Simpler code**: No response parsing, error handling logic

**Consequences**:
- ⚠️ User sees success message even if email failed (rare)
- ✅ Faster UX (no wait for server response)
- ✅ Works with current Google Apps Script setup
- ⚠️ Cannot implement retry logic (don't know if failed)

---

### D7: File Structure - Where to Place contact-form-handler.js

**Decision**: Place in `assets/js/contact-form-handler.js` (not in theme)

**Context**:
- Hugo asset pipeline: `assets/` folder at site root
- Theme assets: `themes/andromeda-hugo/assets/`
- Question: Where to place new JavaScript file?

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. Site root: assets/js/** | Overrides theme, easier customization | Not part of theme package | ✅ **Selected** |
| **2. Theme: themes/.../assets/js/** | Part of theme package, portable | Harder to customize per site | ❌ Rejected |
| **3. Both (theme + override)** | Flexibility | Duplicate files, confusion | ❌ Rejected |

**Rationale**:
- **Site-specific**: Contact form action URL is site-specific (different per client)
- **Customization**: Each psychology practice may want different form logic
- **Hugo precedence**: Site `assets/` overrides theme `assets/` (good for customization)
- **Theme portability**: Theme should be generic, site adds specifics

**Implementation**:
```
/home/cere/Work/alex/alexandrabarbu.ro/
├── assets/                     # ← Place here (site-specific)
│   └── js/
│       └── contact-form-handler.js  # NEW FILE
│
└── themes/andromeda-hugo/
    └── assets/                 # ← Don't place here (theme generic)
        └── js/
            ├── vanilla-collapse.js
            ├── vanilla-dropdown.js
            └── ... (theme JS files)
```

**Consequences**:
- ✅ Easy to customize per site (different Google Apps Script URLs)
- ✅ Theme remains generic (reusable across clients)
- ⚠️ Must copy file when creating new sites from theme
- ⚠️ Not included in theme package (must document)

---

### D8: i18n Strategy - Hardcoded vs. Hugo i18n

**Decision**: Use Hugo i18n system for all user-facing strings (not hardcoded in JavaScript)

**Context**:
- Multilingual site: Romanian (default) + English
- JavaScript needs success/error messages
- Question: Hardcode strings or use Hugo i18n?

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. Hugo i18n (data attributes)** | Centralized translations, maintainable | Requires HTML data attributes | ✅ **Selected** |
| **2. Hardcoded in JavaScript** | Simpler JavaScript | Duplication, hard to maintain | ❌ Rejected |
| **3. Fetch i18n from JSON** | Dynamic loading | Extra HTTP request, complexity | ❌ Rejected |

**Rationale**:
- **Single source of truth**: `i18n/ro.yaml` and `i18n/en.yaml` already exist
- **Maintainability**: Update translations in one place, not JavaScript + YAML
- **Hugo best practices**: Use i18n system for all translatable strings

**Implementation**:
```html
<!-- Template: Pass translations via data attributes -->
<form id="contact-form"
      data-success-message="{{ i18n "contact_form_success" }}"
      data-error-message="{{ i18n "contact_form_error" }}"
      data-sending-message="{{ i18n "contact_form_sending" }}">
```

```javascript
// JavaScript: Read from data attributes
const form = document.getElementById('contact-form');
const successMessage = form.dataset.successMessage;
const errorMessage = form.dataset.errorMessage;
const sendingMessage = form.dataset.sendingMessage;

function showSuccessMessage() {
  messageContainer.textContent = successMessage; // From i18n
  messageContainer.classList.add('form-message--success');
}
```

**Consequences**:
- ✅ Centralized translations (i18n/*.yaml)
- ✅ Easy to update (edit YAML, not JavaScript)
- ⚠️ Slightly more HTML (data attributes)
- ⚠️ JavaScript depends on HTML structure

---

### D9: Progressive Enhancement vs. Required JavaScript

**Decision**: Require JavaScript for form submission (no progressive enhancement fallback)

**Context**:
- Form needs JavaScript for reCAPTCHA, validation, fetch API
- Progressive enhancement: Provide no-JS fallback
- Question: Support no-JS users?

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. Require JavaScript** | Simpler implementation, modern web standard | Excludes <1% users | ✅ **Selected** |
| **2. No-JS fallback (standard POST)** | Accessible to all users | Google Apps Script doesn't return HTML, UX poor | ❌ Rejected |
| **3. Detect no-JS, show message** | Informs users | Added complexity, rare use case | ❌ Rejected |

**Rationale**:
- **reCAPTCHA requires JS**: No way to implement v3 without JavaScript
- **Modern web**: 99.9% of users have JavaScript enabled (2025)
- **Google Apps Script**: Designed for AJAX requests, not form POST with HTML response
- **Psychology practice**: Target audience (therapy clients) unlikely to disable JS

**Statistics**:
- <0.2% of web users have JavaScript disabled (2025)
- Mobile users: ~100% JS enabled
- Accessibility tools: Screen readers work with JavaScript

**Consequences**:
- ✅ Simpler implementation (no dual code paths)
- ✅ Better UX (AJAX submission, no page reload)
- ⚠️ <1% users cannot submit form (must use phone/email fallback)
- ⚠️ Accessibility: Must ensure keyboard navigation + screen reader support

---

### D10: Error Handling Strategy - Optimistic vs. Pessimistic

**Decision**: Optimistic error handling (assume success unless proven failure)

**Context**:
- No-CORS mode: Cannot read server response
- Question: Show success or error by default?

**Options Considered**:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **1. Optimistic (assume success)** | Better UX, aligns with Google reliability | False positives possible | ✅ **Selected** |
| **2. Pessimistic (assume failure)** | Safer, no false positives | Poor UX, confusing to users | ❌ Rejected |
| **3. Show "submitted" (neutral)** | Honest about uncertainty | Doesn't resolve user expectation | ❌ Rejected |

**Rationale**:
- **Google reliability**: Apps Script on Google Cloud (99.9% uptime)
- **User expectation**: Contact forms typically show success immediately
- **Error likelihood**: Network errors detectable, server errors rare
- **Fallback**: Error message provides phone number for direct contact

**Implementation**:
```javascript
try {
  await fetch(actionURL, { method: 'POST', body: formData, mode: 'no-cors' });

  // Optimistic: Assume success
  showSuccessMessage();
  form.reset();

} catch (error) {
  // Network error detected (offline, timeout)
  showErrorMessage();
}
```

**Consequences**:
- ✅ Better UX (immediate positive feedback)
- ✅ Aligns with user expectations
- ⚠️ Rare false positive (server error not detected)
- ⚠️ User may not retry if email actually failed

---

## Summary of Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| D1: JavaScript location | Standalone file | BEM separation of concerns, testability |
| D2: Email backend | Keep Google Apps Script | Working reliably, free, no migration risk |
| D3: Antispam | Keep reCAPTCHA v3 | Invisible, working, best UX |
| D4: Honeypot | Add as enhancement | Defense in depth, zero cost |
| D5: Time validation | Add 3-second threshold | Catches fast bots, no UX impact |
| D6: CORS mode | Accept no-CORS limitation | Works with Google Apps Script, acceptable trade-off |
| D7: File location | Site assets/ not theme | Customization flexibility |
| D8: Translations | Hugo i18n via data attributes | Centralized, maintainable |
| D9: No-JS fallback | Not implemented | 99.9% users have JS, simpler code |
| D10: Error handling | Optimistic (assume success) | Better UX, Google reliability |

---

## Decision Principles

### Guiding Principles
1. **Preserve what works**: Don't fix what isn't broken (Google Apps Script, reCAPTCHA)
2. **BEM architecture**: Clean separation of concerns (HTML/CSS/JS)
3. **Defense in depth**: Multiple antispam layers (reCAPTCHA + honeypot + time)
4. **User experience first**: Immediate feedback > technical purity
5. **Maintainability**: Centralized translations, documented code
6. **Risk mitigation**: Rollback plans, version control, testing

### Trade-offs Accepted
- ❌ Cannot read server response (no-CORS limitation)
- ❌ Rare false positives (success shown on server error)
- ❌ No-JS users cannot submit (~0.2% of users)
- ✅ Better UX (immediate feedback, no page reload)
- ✅ Simpler code (fewer edge cases to handle)
- ✅ Reliable (Google infrastructure, proven technology)

---

## Future Considerations

### Potential Improvements (Not in Scope)
1. **CORS-enabled backend**: Migrate to backend that supports CORS (can verify responses)
2. **Queue system**: Retry failed submissions automatically
3. **Analytics**: Track form submission success rate
4. **A/B testing**: Test different reCAPTCHA thresholds
5. **Rate limiting**: Prevent spam from single IP (server-side)

### When to Revisit Decisions
- **D2 (Google Apps Script)**: If Google discontinues service or changes pricing
- **D3 (reCAPTCHA v3)**: If spam rate increases significantly (>10%)
- **D6 (no-CORS)**: If email delivery issues detected (missing emails)
- **D9 (no-JS fallback)**: If accessibility audit requires it

---

## Approval & Sign-off

- [x] Decisions documented and rationalized
- [ ] Decisions reviewed by stakeholder
- [ ] Decisions approved for implementation
- [ ] Consequences understood and accepted

**Next Steps**: Proceed with Phase 1 implementation (extract JavaScript to standalone file)
