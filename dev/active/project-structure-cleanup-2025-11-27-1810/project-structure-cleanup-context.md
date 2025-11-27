# Project Structure Cleanup - Context

**Last Updated:** 2025-11-27

## Quick Reference

**Status:** Ready to Execute
**Current Focus:** Full cleanup plan approved
**Next Step:** Execute Phase 1 (root cleanup)

## Key Files to Keep

**Root level (essential):**
- CLAUDE.md - Claude Code instructions
- README.md - Project readme
- changelog.md - Changelog
- hugo.toml - Hugo config
- playwright.config.ts - Testing config

**Theme level (essential):**
- CLAUDE.md - Theme instructions
- PROJECT.md - Theme overview
- cc-design.md - Design system reference

## Key Decisions Made

**2025-11-27 - Aggressive cleanup approach**
- **Context:** User specified ALL CAPS files and files older than November are no longer needed
- **Decision:** Delete rather than archive work artifacts
- **Rationale:** Files are in git history if needed; cleaner structure more valuable
- **Alternatives Considered:** Archive to dev/archive/ (adds clutter)

**2025-11-27 - Keep cc-design.md**
- **Context:** Mixed case file, contains design system reference
- **Decision:** Keep as essential reference
- **Rationale:** Active design system documentation, lowercase naming

## Open Questions

None - plan is clear and approved.

## Blockers

None.

## Before Compaction Checklist

Before context gets compacted, ensure:
- [x] All key decisions documented above
- [x] Files to delete clearly listed in plan.md
- [x] Next steps clearly stated
- [ ] Tasks.md updated with progress
