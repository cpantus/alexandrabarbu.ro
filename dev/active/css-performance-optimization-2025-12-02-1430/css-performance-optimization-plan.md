# CSS Performance Optimization - Plan

**Created:** 2025-12-02
**Status:** Active
**Estimated time:** 1 hour

## Overview

Optimize CSS delivery based on Lighthouse diagnostics showing:
- Unused CSS: 124 KiB potential savings (121KB main + 15.8KB icons)
- Minify CSS: 36 KiB potential savings
- Deprecated API: H1UserAgentFontSizeInSection warning

## Goals

1. Enable CSS minification via Hugo + cssnano (36KB savings)
2. Fix H1 deprecated API warning
3. Subset Line Awesome icon fonts (85KB savings)
4. Enhance PurgeCSS safelist patterns (70KB savings)

## Recent Context (Already Implemented)

- Critical CSS inlining (3.3KB inline)
- Async CSS loading with `media="print"` pattern
- Self-hosted fonts with font-display:swap
- Page size reduced from ~800KB to ~94KB

## Approach

### Phase 1: CSS Minification (Quick Win - 36KB savings)

**Files to modify:**
1. `hugo.toml` - Add minify configuration
2. `themes/andromeda-hugo/postcss.config.js` - Add cssnano
3. `package.json` - Add cssnano dependency

**Changes:**

```toml
# hugo.toml - Add minify section
[minify]
  disableCSS = false
  disableHTML = false
  disableJS = false
  minifyOutput = true
```

```javascript
// postcss.config.js - Add cssnano
const cssnano = require("cssnano");
module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
    cssnano({ preset: "default" })
  ],
};
```

### Phase 2: H1 Deprecated API Fix (Quick - Warning removal)

**File:** `themes/andromeda-hugo/assets/scss/04-elements/_headings.scss`

**Fix:** Add explicit font-size for h1 in sectioning contexts:

```scss
section h1,
article h1,
aside h1,
nav h1 {
  font-size: $text-4xl;
}
```

### Phase 3: Icon Font Subsetting (High Impact - ~85KB savings)

**Current state:** Line Awesome loads 284KB (fonts + CSS) for only ~25 icons used

**Approach:** Use pyftsubset to extract only used glyphs (keeps existing class names, no HTML changes)

**Steps:**
1. Create icon inventory: grep for all `la-`, `las `, `lab `, `lar ` classes
2. Install fonttools: `pip install fonttools`
3. Subset each font file
4. Replace font files in `/static/fonts/`
5. Update `/static/css/line-awesome.min.css`

### Phase 4: PurgeCSS Enhancement (Medium Impact - ~70KB savings)

**File:** `themes/andromeda-hugo/postcss.config.js`

**Enhance safelist patterns** to include state classes.

## Success Criteria

- [ ] Hugo build succeeds (`hugo --gc --minify`)
- [ ] All icons render correctly
- [ ] Both RO + EN pages work
- [ ] Responsive layouts (375px, 768px, 1200px)
- [ ] Lighthouse re-test shows improvements
- [ ] No console warnings (H1 deprecation gone)

## Risks & Mitigation

**Risks:**
- PurgeCSS removes needed classes: Expand safelist patterns, test all pages
- Icon subsetting breaks icons: Test all 25 icons, keep backup fonts
- Minification breaks CSS: Test in dev before production

## Notes

User preference: Font subsetting approach (keeps class names, no HTML changes)
