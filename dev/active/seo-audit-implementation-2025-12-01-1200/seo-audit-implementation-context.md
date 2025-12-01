# SEO Audit Implementation - Context

**Last Updated:** 2025-12-01

## Quick Reference

**Status:** Ready to Implement
**Current Focus:** Phase 1 - Phone number update + llms.txt enhancement
**Next Step:** Edit `data/settings.yaml` to update phone number

## Key Files to Modify

- `data/settings.yaml:15` - Main phone number (currently `+40 123 456 789`)
- `data/footer.yaml:4` - Romanian footer phone
- `data/en/footer.yaml:10` - English footer phone
- `static/llms.txt` - AI crawler guidance file (needs enhancement)

## Key Decisions Made

**2025-12-01 - Audit Findings Assessment**
- **Context:** Compared audit findings against actual site implementation
- **Decision:** Many "critical" findings already fixed in current codebase
- **Rationale:** Audits appear to have analyzed older site version
- **Impact:** Reduced scope from 12-14 hours to 2-3 hours

**2025-12-01 - Phone Number Update**
- **Context:** Client provided correct phone number
- **Decision:** Update `+40 123 456 789` → `+40 770 200 834`
- **Locations:** 3 data files (settings.yaml, footer.yaml, en/footer.yaml)

## What's Already Working

| Feature | Evidence | Location |
|---------|----------|----------|
| robots.txt | Contains all AI bot directives | `static/robots.txt` |
| Schema markup | 7 types configured | `config/_default/seo.toml` |
| llms.txt exists | Basic version | `static/llms.txt` |
| Dynamic llms.txt | Template available | `themes/.../home.llms.txt` |
| Sitemap | Multilingual index | `/sitemap.xml` |

## Open Questions

1. Should we delete `static/llms.txt` to let Hugo's dynamic template work? Or enhance the static version?
   - **Current decision:** Enhance static version (simpler)

## Blockers

None - ready to proceed

## Testing Notes

**What needs testing:**
- [ ] Phone number displays correctly in footer (RO)
- [ ] Phone number displays correctly in footer (EN)
- [ ] tel: links work correctly
- [ ] llms.txt accessible at root
- [ ] Schema markup rendering (check with validator)

## Before Compaction Checklist

Before context gets compacted, ensure:
- [x] All key decisions documented above
- [x] File changes logged
- [x] Next steps clearly stated
- [x] Open questions captured
- [ ] Tasks.md updated with progress (after implementation)
