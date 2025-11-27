# Theme Consolidation - Context

**Last Updated:** 2025-11-27

## Quick Reference

**Status:** In Progress
**Current Focus:** Planning phase complete, ready for execution
**Next Step:** Execute Phase 1 - Move root partials to theme

## Key Files Modified

*None yet - planning phase*

## Key Decisions Made

**2025-11-27 - Keep enhanced root version of privacy-guarantee.html**
- **Context:** Root has 147 lines (enhanced), theme has 46 lines (basic)
- **Decision:** Move root version to theme, delete theme's basic version
- **Rationale:** Root version is actively used, theme version is dead code
- **Alternatives Considered:** Merge both versions (unnecessary complexity)

**2025-11-27 - Move root partials TO theme, not copy**
- **Context:** Could either copy or move files
- **Decision:** Move files (delete from root after copying to theme)
- **Rationale:** Prevents future confusion about source of truth
- **Alternatives Considered:** Keep root as override layer (adds complexity)

## Current State Analysis

### Files to Move (Phase 1)
```
layouts/partials/atoms/compass-animation.html → theme/atoms/
layouts/partials/molecules/feature-highlight.html → theme/molecules/
layouts/partials/molecules/info-box.html → theme/molecules/
layouts/partials/molecules/quote-block.html → theme/molecules/
layouts/partials/molecules/resource-card.html → theme/molecules/
layouts/partials/sections/confidentiality-notice.html → theme/sections/
layouts/partials/sections/privacy-guarantee.html → theme/sections/ (REPLACE)
```

### Archetypes (Phase 2)
```
Root archetypes (newer, keep):
  - article.md, default.md, page.md, resource-article.md
  - resource-tool.md, service.md, service-page.md, test.md

Theme archetypes (delete overlaps):
  - article.md, page.md, service.md (duplicates)
  - Keep: resources.md, simple.md, resource.md, faq-example.md
```

### SCSS (Phase 3)
```
Remove: style.scss (just imports main-new.scss)
Keep: main-new.scss (actual entry point)
Empty to remove: 04-base/ (empty directory)
```

## Open Questions

1. Should we archive old dev docs or delete them? (13 levels deep)
2. Keep documentation in theme or move to root `docs/`?

## Blockers

- [ ] None currently

## Testing Notes

**Verification commands:**
```bash
# After each phase
hugo --gc --minify
curl -s http://localhost:1316/ | grep -c "error"  # Should be 0
```

**What needs testing after consolidation:**
- [ ] Homepage renders
- [ ] Service pages render
- [ ] Contact form works
- [ ] All section types render
- [ ] Both languages work (RO/EN)

## Before Compaction Checklist

Before context gets compacted, ensure:
- [ ] All key decisions documented above
- [ ] File changes logged
- [ ] Next steps clearly stated
- [ ] Open questions captured
- [ ] Tasks.md updated with progress
