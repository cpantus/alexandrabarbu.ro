# Changelog

All notable changes to the hal-10k-core infrastructure will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.7.0] - 2025-11-15

### Added
- **Skill Resources**: Progressive disclosure for large skills
  - `skill-developer.md`: Extracted templates and examples to `@skill-developer/resources/`
    - `skill-templates.md`: 4 skill type templates + common patterns (~1,500 tokens)
    - `skill-examples.md`: Complete examples with planning structure (~800 tokens)
  - `data-visualization-designer.md`: Created 4 referenced resource files
    - `perceptual-accuracy-research.md`: Cleveland & McGill hierarchy (~2,000 tokens)
    - `crap-principles-for-data.md`: Design principles for charts (~1,500 tokens)
    - `data-ink-optimization.md`: Tufte principles, chartjunk removal (~1,200 tokens)
    - `data-storytelling.md`: Annotation strategies, narrative arc (~1,800 tokens)

- **Automated Component Counter**: `scripts/count-components.ts`
  - Counts all component types: hooks, utilities, skills, patterns, agents, commands, docs
  - JSON output mode: `--json` flag
  - Verbose mode: `--verbose` for detailed file listings
  - Eliminates documentation drift

### Changed
- **skill-developer.md**: Reduced from 870 → 664 lines (-23.7%)
  - Main file now stays under recommended 700-line limit
  - Progressive disclosure maintains quality while reducing token load

### Impact
- **Token Savings**: 5-9K tokens per skill activation (40-60% reduction)
- **Documentation Accuracy**: Component counts now automated (152 total components)
- **Code Quality**: +6 focused resource files, zero breaking changes

### Component Counts (v5.7.0)
```
Hooks (main):           17
Hook Utilities:         31
Shared Utilities:       28
Skills:                 6
Skill Resources:        2 resource directories
Patterns:               26
Agents:                 9
Commands:               35
Documentation:          18
Total Components:       152
```

## [5.1.0] - 2025-11-13

### Added
- **Skill Enforcement System**: Added 2-level enforcement for skills (warn/require)
  - `warn`: Strong warning message, non-blocking
  - `require`: BLOCKS execution until skill is read via session cache
  - Prevents ignoring critical quality guidance (design, security, compliance skills)
  - Enforcement badges in skill activation reminders (🔴 REQUIRED, ⚠️ CRITICAL)

### Changed
- **user-prompt-submit.ts**: Extended with skill enforcement logic (lines 140-212)
  - Checks enforcement level for activated skills
  - Blocks execution if `require` skill not read
  - Shows strong warning for `warn` level skills
  - Uses session cache to verify skill was read

- **formatter.ts**: Updated SkillActivation interface to include enforcement level
  - Added enforcement badges to skill reminder output
  - Displays enforcement level prominently in activation messages

### Documentation
- Updated `core/docs/skills-system.md` with enforcement levels section
- Updated `core/docs/hook-architecture.md` to document skill enforcement
- Added skill enforcement rule to `.claude/CLAUDE.md`

### Impact
- System-wide quality enforcement for design/security/compliance skills
- Mirrors pattern enforcement philosophy (graduated levels, clear blocking)
- ~50 lines of code, reuses existing session cache infrastructure
- Generic solution works for all skills across all projects

## [5.0.7] - 2025-11-12

### Previous version
- See project-specific changelogs for earlier versions
