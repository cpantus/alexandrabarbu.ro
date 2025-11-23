# Button Contrast Verification - WCAG AA Compliance

**Date:** 2025-11-23
**Standard:** WCAG AA (4.5:1 minimum for normal text, 3:1 for large text and UI components)
**Status:** VERIFICATION NEEDED

---

## Color Combinations to Test

### 1. Emerald Primary Button on Mint Background
**Button Color:** `#4DB380` (emerald-500)
**Background:** `#E8F5F0` (mint-bg)
**Context:** Primary buttons on mint green section backgrounds

**Calculated Contrast Ratio:** ~2.8:1 (ESTIMATED - below WCAG AA 3:1 minimum for UI components)

**Status:** ⚠️ LIKELY FAILS - Needs verification and potential fix

**Recommended Fix if Failing:**
```scss
// Option 1: Darken emerald primary
$emerald-500: #3a9d6b;  // Darker, higher contrast (from #4DB380)

// Option 2: Add border for definition
.c-button--primary {
  border: 2px solid darken($emerald-500, 10%);
}

// Option 3: Increase saturation (recommended)
$emerald-500: #42a870;  // Slightly darker, more saturated
```

---

### 2. Terracotta Secondary Button on Peach Background
**Button Color:** `#CC6B49` (terracotta-500)
**Background:** `#fff5f3` (terracotta-50) or `#ffe8e1` (terracotta-100)
**Context:** Secondary buttons on peach section backgrounds

**Calculated Contrast Ratio:** ~4.2:1 on terracotta-50, ~3.8:1 on terracotta-100 (ESTIMATED)

**Status:** ⚠️ BORDERLINE - Needs verification

**Recommended Fix if Failing:**
```scss
// Darken terracotta secondary slightly
$terracotta-500: #b85a3a;  // Darker (from #CC6B49)
```

---

### 3. White Text on Emerald Button
**Text Color:** `#ffffff` (white)
**Button Background:** `#4DB380` (emerald-500)
**Context:** Button text on primary buttons

**Calculated Contrast Ratio:** ~3.5:1 (ESTIMATED - PASS for large text 18px+)

**Status:** ✅ LIKELY PASSES for large text (button text is typically 16-18px)

---

### 4. White Text on Terracotta Button
**Text Color:** `#ffffff` (white)
**Button Background:** `#CC6B49` (terracotta-500)
**Context:** Button text on secondary buttons

**Calculated Contrast Ratio:** ~4.8:1 (ESTIMATED - PASS)

**Status:** ✅ LIKELY PASSES

---

## Testing Instructions

### Use WebAIM Contrast Checker
**URL:** https://webaim.org/resources/contrastchecker/

**For Each Combination:**
1. Enter foreground color (button or text)
2. Enter background color
3. Check "Normal Text" result (4.5:1) and "Large Text" result (3:1)
4. For UI components (buttons), minimum is 3:1

**Test Results:**

| Combination | Foreground | Background | Ratio | WCAG AA | Status |
|-------------|------------|------------|-------|---------|--------|
| Emerald on Mint | #4DB380 | #E8F5F0 | ___:1 | 3:1 | ☐ Pass ☐ Fail |
| Terracotta on Peach (50) | #CC6B49 | #fff5f3 | ___:1 | 3:1 | ☐ Pass ☐ Fail |
| Terracotta on Peach (100) | #CC6B49 | #ffe8e1 | ___:1 | 3:1 | ☐ Pass ☐ Fail |
| White on Emerald | #ffffff | #4DB380 | ___:1 | 3:1 | ☐ Pass ☐ Fail |
| White on Terracotta | #ffffff | #CC6B49 | ___:1 | 3:1 | ☐ Pass ☐ Fail |

---

## Implementation of Fixes

### If Emerald Fails (Most Likely Issue)

**File to Update:** `themes/andromeda-hugo/assets/scss/01-settings/_tokens-colors.scss`

**Change Line 24:**
```scss
// Before
$emerald-500: #4DB380;  // BRAND PRIMARY

// After (Option 1 - Darker)
$emerald-500: #42a870;  // Increased contrast, slightly darker

// After (Option 2 - Much darker if needed)
$emerald-500: #3a9d6b;  // Higher contrast version
```

**Alternative: Add Border (Non-invasive)**

**File to Update:** `themes/andromeda-hugo/assets/scss/06-components/_button.scss`

**Add to `.c-button--primary` (around line 118):**
```scss
.c-button--primary {
  background: $gradient-primary;
  color: white;
  box-shadow: $shadow-primary;
  border: 2px solid darken($emerald-500, 12%);  // Add definition

  // ... rest of styles
}
```

---

### If Terracotta Fails

**File to Update:** `themes/andromeda-hugo/assets/scss/01-settings/_tokens-colors.scss`

**Change Line 38:**
```scss
// Before
$terracotta-500: #CC6B49;  // BRAND SECONDARY

// After
$terracotta-500: #b85a3a;  // Darker, higher contrast
```

---

## Hover State Verification

**Also Test Hover States:**
- Ensure hover states maintain or improve contrast
- Current implementation uses vibrant gradients which should be darker
- Verify: `.c-button--primary:hover` and `.c-button--secondary:hover`

---

## Focus State Verification

**Current Focus Ring:**
```scss
&:focus {
  box-shadow: 0 0 0 3px rgba($emerald-500, 0.15);
}
```

**Verification:**
- Check that focus ring is visible on all backgrounds
- 3px ring should be sufficient
- Consider increasing opacity to 0.25 if not visible enough

---

## Accessibility Testing Tools

**Automated Testing:**
1. **axe DevTools** (Chrome/Firefox extension)
2. **WAVE** (Web Accessibility Evaluation Tool)
3. **Lighthouse** (Chrome DevTools)

**Manual Testing:**
1. **WebAIM Contrast Checker** (online tool)
2. **Colour Contrast Analyser** (desktop app)
3. **Browser DevTools** (inspect computed colors)

---

## Testing Checklist

- [ ] Test emerald button on mint background
- [ ] Test emerald button on white background
- [ ] Test terracotta button on peach background (50)
- [ ] Test terracotta button on peach background (100)
- [ ] Test terracotta button on white background
- [ ] Test outline button variants
- [ ] Test hover states for all variants
- [ ] Test focus states visibility
- [ ] Test with color blindness simulators
- [ ] Run automated accessibility checker (axe/WAVE)

---

## Color Blindness Considerations

**Test with Simulators:**
- Deuteranopia (red-green, most common)
- Protanopia (red-green)
- Tritanopia (blue-yellow)

**Tools:**
- Chrome extension: "Colorblindly"
- Online: Coblis Color Blindness Simulator
- macOS: System Preferences > Accessibility > Display > Color Filters

**Current Colors Should Be OK:**
- Emerald vs Terracotta have different luminance
- Not relying solely on color for meaning
- Icons and text provide additional cues

---

## Next Steps

1. **Test all combinations** using WebAIM Contrast Checker
2. **Fill in actual ratios** in the table above
3. **Apply fixes** only if ratios fail WCAG AA (3:1 for UI components)
4. **Re-test after fixes** to confirm compliance
5. **Document final ratios** in this file

---

## Notes

- **UI Components** (buttons, inputs) require 3:1 minimum (not 4.5:1 like text)
- **Large text** (18px+, or 14px bold+) requires 3:1 minimum
- **Normal text** (<18px regular, <14px bold) requires 4.5:1 minimum
- **Button text** is typically 16-18px, so 3:1 applies
- **Gradients** use the midpoint color for contrast calculations

---

**Status:** Testing required, fixes prepared if needed
**Priority:** HIGH (Accessibility critical)
**Estimated Time:** 30 minutes testing + 5 minutes fixes (if needed)
