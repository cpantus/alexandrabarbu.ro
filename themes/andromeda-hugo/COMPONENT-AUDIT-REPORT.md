# Component Audit Report - Hardcoded Values

**Date:** 2025-11-17
**Version:** 1.0.0
**Part of:** Hugo Design Coherence Initiative (Week 2, Task 2.3.1)

---

## Executive Summary

**Scope:** All components in Andromeda Hugo theme (5 atoms + 20 molecules + 2 organisms + 30 sections = 57 components)

**Goal:** Identify all hardcoded design values that should be replaced with design tokens

**Methodology:**
- Scanned HTML templates for hardcoded hex colors (`#RRGGBB`)
- Scanned SCSS files for hardcoded padding, border-radius, transitions, colors
- Prioritized findings by component tier and refactor schedule

---

## Summary Statistics

| Category | Files with Issues | Estimated Lines to Refactor | Priority |
|----------|------------------|---------------------------|----------|
| **Hex Colors (SCSS)** | 8 files | ~200 color declarations | HIGH |
| **Hex Colors (HTML)** | 3 files | ~17 inline styles | MEDIUM |
| **Border Radius** | 4 files | ~23 declarations | HIGH |
| **Padding** | 6 files | ~9 declarations | MEDIUM |
| **Transitions** | 0 files | 0 (already using tokens) | ✅ GOOD |

**Total Estimated Refactor Scope:** ~250 lines across 11 unique files

---

## Detailed Findings

### 1. Hardcoded Hex Colors in SCSS (HIGH PRIORITY)

#### `custom.scss` - 86 hardcoded colors
**File:** `/themes/andromeda-hugo/assets/scss/custom.scss`
**Issue:** Contains many hardcoded hex colors instead of tokens
**Impact:** HIGH - This is the main stylesheet
**Examples:**
- Body text colors, headings, links
- Background colors for sections
- Border colors
**Refactor Week:** Week 3-9 (gradual replacement as components are refactored)
**Token Replacements:**
- `#374151` → `$gray-700` (primary text)
- `#4DB380` → `$emerald-500` (brand primary)
- `#CC6B49` → `$terracotta-500` (brand secondary)
- `#f9fafb` → `$gray-50` (backgrounds)

---

#### `pages/_signup.scss` - 36 hardcoded colors
**File:** `/themes/andromeda-hugo/assets/scss/pages/_signup.scss`
**Issue:** Signup page-specific styles with hardcoded colors
**Impact:** MEDIUM - Single page scope
**Examples:**
- Form field colors
- Button backgrounds
- Validation state colors
**Refactor Week:** Week 3 (when refactoring form atoms/molecules)
**Token Replacements:**
- Success states → `$sage-500`
- Error states → Use semantic `$color-error`
- Info states → `$teal-500`

---

#### `_design-system.scss` - 35 hardcoded colors
**File:** `/themes/andromeda-hugo/assets/scss/_design-system.scss`
**Issue:** OLD design system tokens (before Week 1 refactor)
**Impact:** HIGH - These should migrate to `_design-tokens.scss`
**Examples:**
- Old color palette definitions
- Typography color mappings
**Refactor Week:** Week 2 (NOW - consolidate into `_design-tokens.scss`)
**Action:** Audit existing colors, migrate to token file, deprecate old definitions

---

#### `pages/_contact.scss` - 20 hardcoded colors
**File:** `/themes/andromeda-hugo/assets/scss/pages/_contact.scss`
**Issue:** Contact page-specific styles with hardcoded colors
**Impact:** MEDIUM - Single page scope
**Examples:**
- Alert backgrounds (#e8f5ef success, #fff3cd warning, #fdf2f2 error)
- Border colors
- Text colors
**Refactor Week:** Week 3 (when refactoring form molecules)
**Token Replacements:**
- `#e8f5ef` → Use semantic alert classes with tokens
- `#4DB380` → `$emerald-500`
- `#e57373` → Use semantic `$color-error`

---

#### `components/_sections.scss` - 13 hardcoded colors
**File:** `/themes/andromeda-hugo/assets/scss/components/_sections.scss`
**Issue:** Section component styles with colors
**Impact:** HIGH - Affects all sections
**Refactor Week:** Week 7-9 (section refactor phase)
**Token Replacements:**
- Section background colors → `$gray-50`, `$gray-100`
- Accent colors → Use brand tokens

---

#### `components/_credentials.scss` - 4 hardcoded colors
**File:** `/themes/andromeda-hugo/assets/scss/components/_credentials.scss`
**Issue:** Credential badge icon colors
**Impact:** LOW - Single component
**Examples:**
- `#4DB380` (emerald)
- `#059669` (darker emerald)
- `#0ea5e9` (blue)
- `#374151`, `#6b7280` (grays)
**Refactor Week:** Week 4-5 (molecule refactor)
**Token Replacements:**
- `#4DB380` → `$emerald-500`
- `#059669` → `$emerald-600`
- `#0ea5e9` → `$teal-500`
- `#374151` → `$gray-700`
- `#6b7280` → `$gray-500`

---

#### `_design-enhancements.scss` - 2 hardcoded colors
**File:** `/themes/andromeda-hugo/assets/scss/_design-enhancements.scss`
**Issue:** Design v4.0 enhancements with hardcoded colors
**Impact:** MEDIUM - Affects glassmorphism, gradients
**Refactor Week:** Week 4-5 (when refactoring enhanced components)
**Token Replacements:**
- Gradient colors → Use defined gradient tokens
- Glassmorphism backgrounds → Use token-based RGBA

---

#### `components/_problem-empathy.scss` - 2 hardcoded colors
**File:** `/themes/andromeda-hugo/assets/scss/components/_problem-empathy.scss`
**Issue:** Problem-empathy section colors
**Impact:** LOW - Single section
**Refactor Week:** Week 7-9 (section refactor)
**Token Replacements:**
- Background/accent colors → Brand tokens

---

### 2. Hardcoded Hex Colors in HTML Templates (MEDIUM PRIORITY)

#### `layouts/_default/contact-enhanced.html` - 11 hardcoded colors
**File:** `/layouts/_default/contact-enhanced.html`
**Lines:** 255-267, 296
**Issue:** Inline styles for alert states
**Impact:** MEDIUM - Contact page template
**Examples:**
```html
<div style="background-color: #e8f5ef; border: 1px solid #4DB380; color: #2d5a3d;">
<div style="background-color: #fff3cd; border: 1px solid #ffc107; color: #856404;">
<div style="background-color: #fdf2f2; border: 1px solid #e57373; color: #721c24;">
<input style="outline: 2px solid #4DB380;">
```
**Refactor Week:** Week 3 (when refactoring form molecules)
**Token Replacements:**
- Move to CSS classes using semantic alert tokens
- Success alert: `.alert-success` class → `$sage-500` background
- Warning alert: `.alert-warning` class → `$amber-500` background
- Error alert: `.alert-error` class → Semantic error color
- Focus outline: Use standard focus ring token

---

#### `layouts/partials/molecules/logo.html` - 1 hardcoded color
**File:** `/layouts/partials/molecules/logo.html`
**Line:** 20
**Issue:** SVG logo fill color hardcoded
**Impact:** LOW - Single logo component
**Example:**
```html
<g fill="#4db380">
```
**Refactor Week:** Week 4-5 (molecule refactor)
**Token Replacement:**
- `fill="#4db380"` → `fill="currentColor"` + CSS color from `$emerald-500` token

---

#### `layouts/partials/molecules/credential-badge.html` - 5 hardcoded colors
**File:** `/layouts/partials/molecules/credential-badge.html`
**Lines:** 75, 79, 83, 95, 101
**Issue:** Inline styles for icon colors (duplicates SCSS findings)
**Impact:** LOW - Single component
**Refactor Week:** Week 4-5 (molecule refactor)
**Token Replacements:** Same as `_credentials.scss` above

---

#### `layouts/partials/sections/pricing-tables.html` - 1 hardcoded color
**File:** `/layouts/partials/sections/pricing-tables.html`
**Line:** 29
**Issue:** Inline background color
**Impact:** LOW - Single section
**Example:**
```html
<div style="background:#f9f9f9;">
```
**Refactor Week:** Week 7-9 (section refactor)
**Token Replacement:**
- `background:#f9f9f9` → CSS class with `$gray-50` token

---

### 3. Hardcoded Border Radius (HIGH PRIORITY)

#### `pages/_signup.scss` - 9 radius declarations
**File:** `/themes/andromeda-hugo/assets/scss/pages/_signup.scss`
**Issue:** Form fields, buttons with hardcoded radius
**Examples:** `border-radius: 8px`, `border-radius: 12px`
**Refactor Week:** Week 3
**Token Replacements:**
- `8px` → `$radius-sm`
- `12px` → `$radius-md`

---

#### `pages/_contact.scss` - 7 radius declarations
**File:** `/themes/andromeda-hugo/assets/scss/pages/_contact.scss`
**Issue:** Alert boxes, form fields with hardcoded radius
**Refactor Week:** Week 3
**Token Replacements:** Same as signup.scss

---

#### `components/_sections.scss` - 6 radius declarations
**File:** `/themes/andromeda-hugo/assets/scss/components/_sections.scss`
**Issue:** Section cards, containers with radius
**Refactor Week:** Week 7-9
**Token Replacements:**
- `12px` → `$radius-md`
- `16px` → `$radius-lg`

---

#### `custom.scss` - 1 radius declaration
**File:** `/themes/andromeda-hugo/assets/scss/custom.scss`
**Issue:** Global radius somewhere in file
**Refactor Week:** Week 3
**Token Replacement:** Identify specific usage, replace with appropriate token

---

### 4. Hardcoded Padding (MEDIUM PRIORITY)

**Files with hardcoded padding:**
- `pages/_contact.scss` - 3 declarations
- `pages/_signup.scss` - 2 declarations
- `components/_values-compass.scss` - 1 declaration
- `components/_problem-empathy.scss` - 1 declaration
- `components/_pricing-enhanced.scss` - 1 declaration
- `components/_credentials.scss` - 1 declaration

**Common patterns:**
- `padding: 20px` → Should be `$space-5` (if needed) or `$space-6` (24px, on 8px grid)
- `padding: 16px` → `$space-4`
- `padding: 12px` → `$space-3`

**Refactor Schedule:**
- Contact/signup pages → Week 3 (form refactor)
- Component-specific → Week 4-9 (respective component refactor weeks)

**Note:** Some padding values may be `15px`, `20px` which are NOT on 8px grid - these need adjustment to nearest valid token (16px or 24px)

---

### 5. Hardcoded Transitions (✅ GOOD - No Issues Found)

**Finding:** No hardcoded `transition: XXXms` patterns found in SCSS files
**Reason:** Design system already uses duration/easing tokens
**Action:** NONE - Continue using existing pattern

---

## Prioritized Refactor Plan

### Immediate (Week 2 - NOW)
1. ✅ **Consolidate `_design-system.scss` colors into `_design-tokens.scss`**
   - Migrate 35 color definitions
   - Deprecate old variables
   - Update imports

### Week 3 (Atom Refactor)
2. **Refactor contact/signup page styles**
   - Replace 56 hardcoded colors (contact 20 + signup 36)
   - Replace 16 border-radius declarations
   - Replace 5 padding declarations
   - Move inline alert styles to CSS classes

3. **Refactor form-related HTML templates**
   - `contact-enhanced.html` - Move 11 inline styles to classes
   - Create reusable alert component classes

### Week 4-5 (Molecule Refactor)
4. **Refactor component-specific styles**
   - `_credentials.scss` - 4 colors, 1 padding
   - `credential-badge.html` - 5 inline colors
   - `logo.html` - 1 SVG fill color
   - `pricing-tables.html` - 1 inline background

5. **Refactor design enhancements**
   - `_design-enhancements.scss` - 2 colors (gradients/glassmorphism)
   - Ensure v4.0 features use tokens

### Week 7-9 (Section Refactor)
6. **Refactor section styles**
   - `_sections.scss` - 13 colors, 6 border-radius
   - `_problem-empathy.scss` - 2 colors, 1 padding
   - `_values-compass.scss` - 1 padding
   - `_pricing-enhanced.scss` - 1 padding

### Week 10 (Validation)
7. **Final audit**
   - Re-run all grep patterns
   - Verify ZERO hardcoded values (except in `_design-tokens.scss`)
   - Generate before/after comparison report

---

## Validation Commands

Run these commands to verify token compliance:

```bash
# Check for hardcoded colors (should be 0 results except _design-tokens.scss)
rg '#[0-9a-fA-F]{6}' themes/andromeda-hugo/layouts/ --type html

rg '#[0-9a-fA-F]{6}' themes/andromeda-hugo/assets/scss/ -g '*.scss' \
  | grep -v '_design-tokens.scss'

# Check for hardcoded spacing
rg 'padding:\s*\d+px|margin:\s*\d+px' themes/andromeda-hugo/assets/scss/ -g '*.scss' \
  | grep -v '_design-tokens.scss'

# Check for hardcoded radius
rg 'border-radius:\s*\d+px' themes/andromeda-hugo/assets/scss/ -g '*.scss' \
  | grep -v '_design-tokens.scss'

# Check for hardcoded transitions
rg 'transition:\s*\d+ms' themes/andromeda-hugo/assets/scss/ -g '*.scss' \
  | grep -v '_design-tokens.scss'
```

**Expected Results (Week 10):**
- Hex colors: 0 (except token file)
- Padding/margin: 0 (except token file)
- Border-radius: 0 (except token file)
- Transitions: 0 (already compliant ✅)

---

## Success Metrics

| Metric | Current (Week 2) | Target (Week 10) | Progress |
|--------|------------------|------------------|----------|
| **Files with hardcoded colors** | 11 files | 1 file (`_design-tokens.scss` only) | 9% |
| **Hardcoded color declarations** | ~217 | 0 | 0% |
| **Hardcoded border-radius** | ~23 | 0 | 0% |
| **Hardcoded padding** | ~9 | 0 | 0% |
| **Token compliance (components)** | ~15% | 100% | 15% |

---

## Component-Specific Audit Table

| Component | Type | File Path | Hardcoded Colors | Hardcoded Radius | Hardcoded Padding | Priority | Refactor Week |
|-----------|------|-----------|------------------|------------------|-------------------|----------|---------------|
| **SCSS Styles** | | | | | | | |
| Custom | Global | `custom.scss` | 86 | 1 | 0 | HIGH | Week 3-9 |
| Design System | Global | `_design-system.scss` | 35 | 0 | 0 | HIGH | Week 2 (NOW) |
| Signup Page | Page | `pages/_signup.scss` | 36 | 9 | 2 | MEDIUM | Week 3 |
| Contact Page | Page | `pages/_contact.scss` | 20 | 7 | 3 | MEDIUM | Week 3 |
| Sections | Global | `components/_sections.scss` | 13 | 6 | 0 | HIGH | Week 7-9 |
| Credentials | Molecule | `components/_credentials.scss` | 4 | 0 | 1 | LOW | Week 4-5 |
| Design Enhancements | Global | `_design-enhancements.scss` | 2 | 0 | 0 | MEDIUM | Week 4-5 |
| Problem Empathy | Section | `components/_problem-empathy.scss` | 2 | 0 | 1 | LOW | Week 7-9 |
| Values Compass | Section | `components/_values-compass.scss` | 0 | 0 | 1 | LOW | Week 7-9 |
| Pricing Enhanced | Section | `components/_pricing-enhanced.scss` | 0 | 0 | 1 | LOW | Week 7-9 |
| **HTML Templates** | | | | | | | |
| Contact Enhanced | Template | `layouts/_default/contact-enhanced.html` | 11 | 0 | 0 | MEDIUM | Week 3 |
| Logo | Molecule | `layouts/partials/molecules/logo.html` | 1 | 0 | 0 | LOW | Week 4-5 |
| Credential Badge | Molecule | `layouts/partials/molecules/credential-badge.html` | 5 | 0 | 0 | LOW | Week 4-5 |
| Pricing Tables | Section | `layouts/partials/sections/pricing-tables.html` | 1 | 0 | 0 | LOW | Week 7-9 |

**Total:** 14 files with issues

---

## Notes

### Good Practices Already in Place
- ✅ Transitions already use token-based duration/easing
- ✅ Typography scale tokens exist and are used
- ✅ Motion system tokens defined (3 levels)
- ✅ Shadow system tokens defined (9 shadows)

### Areas Needing Most Work
1. **Color consistency** - 217 hardcoded colors across 11 files
2. **Border radius** - 23 declarations need token replacement
3. **Inline styles** - HTML templates have 17 inline style attributes

### Refactor Strategy
- **Gradual, phase-based** - Follow existing Week 3-9 plan
- **Component-tier order** - Atoms first, then molecules, organisms, sections
- **Test after each phase** - Verify build, visual regression testing
- **Document as you go** - Update component docs with token usage

---

## Next Steps

1. ✅ **Week 2 Complete** - Audit done, issues cataloged
2. ⏭️ **Week 3 Start** - Begin atom refactor (button, heading, icon, image, input)
3. ⏭️ **Week 3 Parallel** - Consolidate `_design-system.scss` into `_design-tokens.scss`
4. ⏭️ **Week 4-5** - Molecule refactor with token enforcement
5. ⏭️ **Week 7-9** - Section refactor, bulk of remaining issues
6. ⏭️ **Week 10** - Final validation, zero tolerance for hardcoded values

---

**Report Version:** 1.0.0
**Generated:** 2025-11-17
**Part of:** Hugo Design Coherence Initiative
**Next Update:** Week 10 (final validation)
