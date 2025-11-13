# Changelog

All notable changes to the hal-10k-core infrastructure will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
