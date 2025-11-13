# Hugo Theme Refactor - Atomic Design System

## Project Overview
**Goal**: Refactor Andromeda Hugo theme to atomic design system
**Duration**: 12 weeks, 130 hours
**Status**: Planning complete, ready to execute

## Objectives
1. ✅ Hugo latest standards and best practices
2. ✅ Performance and speed (<3s builds, <500KB pages)
3. ✅ Modularity (atomic design: atoms → molecules → organisms)
4. ✅ Beautiful eye candy (AOS animations + custom CSS)
5. ✅ Advanced functionality (contact forms, pricing - already built)
6. ✅ Critical & minimalistic approach

## Key Decisions
- **Payment**: Keep Calendly booking only (no Stripe/PayPal)
- **Design**: Emerald (#4DB380) + Terracotta (#CC6B49) - warm, therapeutic
- **Images**: Hugo native processing (WebP, srcset, lazy-load)
- **Animations**: AOS for scroll reveals + custom CSS micro-interactions

## Current State
- 40% modern: Flexible layout system + 16 section components
- 60% legacy: 1,581 lines monolithic code across 22+ pages
- Hugo v0.148.1 extended ✅
- 8.3MB unoptimized images ❌
- ~40% code duplication ❌

## Target State
- 100% pages on flexible layout system
- <10% code duplication
- <3s build time
- <2MB total image assets
- 15+ atomic components

## References
- **Main plan**: `themes/andromeda-hugo/REFACTOR-PLAN-v2.md` (LATEST)
- **Audit**: `themes/andromeda-hugo/cc-hugo-audit.md`
- **Context**: `themes/andromeda-hugo/PROJECT.md`
- **Usage**: `themes/andromeda-hugo/LAYOUT_MIXING_GUIDE.md`
- **Infrastructure**: `.claude/CLAUDE.md` (project root)

## 5 Phases
1. **Phase 1** (Week 1-2, 20h): Atomic Components
2. **Phase 2** (Week 3-4, 30h): Molecular Components
3. **Phase 3** (Week 5-6, 24h): Organism Decomposition
4. **Phase 4** (Week 7-10, 40h): Legacy Migration
5. **Phase 5** (Week 11-12, 16h): Performance & Polish

See REFACTOR-PLAN-v2.md for complete details.
