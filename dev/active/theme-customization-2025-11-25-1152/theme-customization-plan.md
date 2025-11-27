# Theme Customization - Plan

**Created:** 2025-11-25
**Status:** Active - Ready for Implementation
**Estimated Time:** 33-43 hours
**Approach:** Hugo-Native (TOML Config → Hugo Pipes → SCSS → CSS)

## Overview

Transform the Andromeda Hugo theme into a fully customizable design system where clients can rebrand the entire site by editing one TOML file. Uses Hugo Pipes for build-time token injection, CSS custom properties for runtime flexibility, and ITCSS architecture for maintainability.

## Goals

### Primary Goals
1. **One-File Customization**: Clients edit `config/_default/design.toml` to control 85-100 design tokens
2. **No SCSS Knowledge Required**: Hugo-native TOML config with clear documentation
3. **Multi-Client Ready**: Per-environment configs for different brands/clients
4. **Build-Time Safety**: Hugo Pipes validates tokens at build time

### Secondary Goals
1. **Maintain Performance**: Keep build time <3s, page size <520KB
2. **80/20 Control**: Simple controls for maximum visual impact (backgrounds, animations)
3. **Backward Compatible**: Gradual migration, no breaking changes

## Design Token System (85-100 tokens)

### Core Tokens (50)
- **Brand** (6): primary, secondary, accent, text colors
- **Typography** (8): fonts, weights, sizes, line heights
- **Spacing** (5): base unit, scale, section padding, container width
- **Borders** (6): widths, radius, colors
- **Shadows** (4): sm, md, lg, xl
- **Component tokens** (20+): buttons, cards, icons, forms

### Background Tokens (8) - NEW
- **Gradients**: primary/secondary colors, type, angle
- **Glassmorphism**: blur amount, opacity
- **Overlays**: opacity

### Animation Tokens (7) - NEW
- **Global**: speed multiplier, easing
- **Toggles**: scroll, hover, parallax, entrance
- **Intensity**: parallax strength, hover lift distance

## Approach

### Phase 1: Configuration Layer (2-3h)
Create `config/_default/design.toml` with all 85-100 tokens, organized hierarchically with comprehensive comments.

### Phase 2: SCSS Bridge (3-4h)
Create `_config-bridge.scss` as Hugo template that injects config values into SCSS variables at build time via Hugo Pipes.

### Phase 3: Token System (4-5h)
Update `01-settings/` files to use Hugo-injected variables. Create `03-generic/_css-variables.scss` to generate CSS custom properties.

### Phase 4: Component Updates (15-20h)
Convert 71 components to use CSS custom properties:
- **High-impact** (10 files, 4-5h): buttons, cards, typography, hero
- **Medium** (20 files, 6-8h): icons, badges, forms, navigation
- **Low** (41 files, 4-7h): specialized sections

### Phase 5: Documentation (3-4h)
Create comprehensive client + developer documentation (`THEME-CUSTOMIZATION.md`), update existing docs.

### Phase 6: Testing & Validation (5-6h)
Create 3 test configs (psychology, law-firm, tech-startup), validate builds, visual regression, performance.

## Success Criteria

**For Theme:**
- [ ] One-file client customization working
- [ ] <5 min setup time per new client
- [ ] Build time <3s maintained
- [ ] No SCSS knowledge required for clients
- [ ] 85-100 customization points active
- [ ] Visual parity with current site

**For Multi-Client:**
- [ ] Client A → Client B: Edit 1 file → rebuild → done
- [ ] Per-environment configs validated
- [ ] Git-friendly (clear diffs in design.toml)
- [ ] Documented, maintainable, extensible

**Technical:**
- [ ] Hugo Pipes injection working correctly
- [ ] All components using CSS custom properties
- [ ] No hardcoded values remaining
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Cross-browser compatibility (gradients, glassmorphism)

## Risks & Mitigation

**Medium Risk: Component updates time-consuming**
- Mitigation: Phase by priority (high-impact first), straightforward pattern

**Medium Risk: Hugo template syntax in SCSS**
- Mitigation: Test bridge thoroughly with 3+ configs before full rollout

**Low Risk: Hugo Pipes already working**
- Mitigation: Validated that `resources.ExecuteAsTemplate` is in use

**Medium Risk: Animation performance on low-end devices**
- Mitigation: Add `prefers-reduced-motion` support, test on mobile

**Low Risk: Gradient cross-browser compatibility**
- Mitigation: Provide fallbacks, test in older browsers

## Technical Architecture

### Hugo→SCSS Flow
```
design.toml → Hugo Pipes → _config-bridge.scss → SCSS compilation →
CSS custom properties → Components
```

### File Changes
- **New** (3): design.toml, _config-bridge.scss, THEME-CUSTOMIZATION.md
- **Modified** (45-55): main-new.scss, style.html, 01-settings (5 files), 06-components (40-50 files), docs (2 files)
- **Test** (4+): test script, 3 client configs

### Key Decision: Build-Time vs Runtime
**Chosen:** Build-time injection via Hugo Pipes
- ✅ Type-safe, validated at build
- ✅ Optimized CSS output
- ✅ Can use SCSS calculations
- ✅ Conditional compilation (`@if $anim-hover`)

## Next Steps

1. **Review & Approve Plan** - Confirm approach, scope, timeline
2. **Prototype (Recommended)** - 2-3h to validate Hugo Pipes injection with 5-10 tokens
3. **Full Implementation** - Follow 6-phase plan if prototype succeeds

## Notes

- Current fonts: **Playfair Display** (headings) + **DM Sans** (body)
- Current colors: **Forest Green** (#234E3E), **Sage Green** (#6B9080), **Gold** (#D4AF37)
- Cleanup completed: Font inconsistencies fixed, docs updated with actual current state
- Full plan document: `THEME-CUSTOMIZATION-PLAN.md` (root directory)
