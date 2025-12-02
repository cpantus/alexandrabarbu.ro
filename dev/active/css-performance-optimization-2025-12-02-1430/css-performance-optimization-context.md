# CSS Performance Optimization - Context

**Last Updated:** 2025-12-02

## Quick Reference

**Status:** Not Started (Plan Approved)
**Current Focus:** Ready to begin Phase 1 (CSS Minification)
**Next Step:** Add minify config to hugo.toml

## Key Files to Modify

1. `hugo.toml` - Add minify configuration
2. `themes/andromeda-hugo/postcss.config.js` - Add cssnano + enhance PurgeCSS
3. `themes/andromeda-hugo/assets/scss/04-elements/_headings.scss` - H1 fix
4. `themes/andromeda-hugo/layouts/partials/essentials/style.html` - CSS pipeline (verify)
5. `/static/fonts/la-*.woff2` - Font files (subsetting)
6. `/static/css/line-awesome.min.css` - Icon CSS (strip unused)

## Key Decisions Made

**2025-12-02 - Icon Optimization Approach**
- **Context:** Line Awesome loads 284KB for ~25 used icons
- **Decision:** Use font subsetting with pyftsubset
- **Rationale:** Keeps existing class names, no HTML changes required, safe rollback
- **Alternatives Considered:**
  - Feather Icons (requires class name changes)
  - Inline SVGs (requires template refactoring)

## Open Questions

1. Does cssnano need to be added to package.json? (check if already installed)
2. What is the current PurgeCSS safelist? (need to review before enhancing)

## Blockers

None currently

## Testing Notes

**What needs testing:**
- [ ] All 25 icons render after subsetting
- [ ] Both RO + EN pages work
- [ ] Responsive layouts (375px, 768px, 1200px)
- [ ] No H1 console warnings
- [ ] Lighthouse improvements verified

## Before Compaction Checklist

Before context gets compacted, ensure:
- [ ] All key decisions documented above
- [ ] File changes logged
- [ ] Next steps clearly stated
- [ ] Open questions captured
- [ ] Tasks.md updated with progress
