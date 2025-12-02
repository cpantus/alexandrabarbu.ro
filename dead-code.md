# Dead Code Audit - Andromeda Hugo Theme

**Date**: 2025-12-02
**Auditor**: Claude (validated)
**Status**: VALIDATED - Most original findings were INCORRECT

---

## Executive Summary

After validation, **most of the original audit findings were wrong**:

| Original Claim | Validation Result |
|----------------|-------------------|
| 5 empty analytics partials (dead) | **FALSE** - Called from head.html, intentional placeholders |
| 18 unused SCSS files | **FALSE** - All imported in _components.scss |
| 6 unused JS files | **FALSE** - magnetic-buttons.js IS loaded in script.html |
| 2 unused section templates | **PARTIALLY TRUE** - benefits-results IS used (4 pages), video-popup has no template |
| 33 unused i18n keys | **UNVERIFIED** - Requires manual audit |

**Actual dead code found:**
1. `data/components/buttons/` - CMS auto-generated garbage (DELETED)
2. `_video-popup.scss` - SCSS exists but no template (harmless, ~50 lines of unused CSS)

---

## Validated Findings

### 1. Empty Analytics Partials - NOT DEAD CODE

These ARE called from `layouts/partials/essentials/head.html`:
```html
{{ partialCached "baidu-analytics.html" . }}
{{ partialCached "plausible-analytics.html" . }}
{{ partialCached "counter-analytics.html" . }}
```

They're **intentional extension points** - empty placeholders for future analytics providers.

**Action**: KEEP (do not delete)

---

### 2. SCSS Files - ALL IMPORTED

All 18 files claimed as "unused" are actually imported in `assets/scss/06-components/_components.scss`:

- `_about-preview.scss` - Line 102
- `_approach-preview.scss` - Line 103
- `_confidentiality-notice.scss` - Line 93
- `_contact-options.scss` - Line 90
- etc.

**Action**: KEEP (all are compiled into CSS bundle)

---

### 3. JavaScript Files - LOADED

`magnetic-buttons.js` IS loaded in `layouts/partials/essentials/script.html` line 10:
```html
{{ range (slice ... "js/magnetic-buttons.js" ...) }}
```

`gsap-enhancements.js` does NOT exist (mentioned in comments only).

**Action**: KEEP (working as intended)

---

### 4. Section Templates

| Template | Status |
|----------|--------|
| `benefits-results.html` | **USED** - 4 service pages reference it |
| `video-popup.html` | **DOES NOT EXIST** - SCSS orphaned |

The `_video-popup.scss` is imported but has no corresponding template. This is ~50 lines of unused CSS but causes no harm.

**Action**: Consider removing `_video-popup.scss` import from `_components.scss` (low priority)

---

### 5. CMS-Generated Data - DELETED

`data/components/buttons/` contained auto-generated CMS test data:
- `map-style-primary-size-medium-target-_self-name-buton1-text-ssss-url-https-facebook-com.yml`

**Action**: DELETED (was garbage from CMS testing)

---

## Remaining Low-Priority Cleanup

### Optional: Remove video-popup SCSS orphan

In `themes/andromeda-hugo/assets/scss/06-components/_components.scss`, line 71:
```scss
@import 'video-popup';  // Has no template - orphaned SCSS
```

Could be removed to eliminate ~50 lines of unused CSS, but impact is negligible.

---

## Recommendations

1. **DO NOT delete analytics partials** - They're intentional extension points
2. **DO NOT delete SCSS files** - All are imported and compiled
3. **DO NOT delete magnetic-buttons.js** - It's actively loaded
4. **DONE**: Deleted `data/components/` garbage
5. **OPTIONAL**: Remove video-popup SCSS import (low priority, ~50 lines savings)

---

## Lessons Learned

The original Haiku agent audit made several false assumptions:
- Assumed 0-byte files = unused (they were intentional placeholders)
- Didn't trace SCSS imports through `_components.scss`
- Didn't search for template usage in content files
- Didn't check JS loading in script.html

**Always validate automated audits before deleting code.**

---

## Files Changed

| Action | File |
|--------|------|
| DELETED | `data/components/buttons/*.yml` |
| DELETED | `data/components/` (empty directory) |
