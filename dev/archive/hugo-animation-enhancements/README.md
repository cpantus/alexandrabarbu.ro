# Hugo Animation Enhancements

**Status:** In Progress (Phase 1)
**Created:** 2025-11-18
**Last Updated:** 2025-11-18

---

## Quick Start for New Session

```bash
# Resume this task automatically
/resume-dev

# OR manually load and continue
cd /home/cere/Work/alex/alexandrabarbu.ro
# Read: dev/active/hugo-animation-enhancements/hugo-animation-enhancements-context.md
# Then continue with next task from tasks.md
```

---

## What This Task Does

Adds 5 genuinely new animation effects to existing Hugo theme v4.0:
1. Magnetic buttons (GSAP)
2. Ripple click effects
3. Word-by-word text reveal
4. Clip-path image reveals
5. Alpine.js reactive components

**Key Strategy:** ENHANCE existing, don't rebuild. Theme already has 90% of functionality.

---

## Current Status

- **Phase:** 1 of 4 (Add Libraries)
- **Progress:** 0 of 24 tasks complete (0%)
- **Time Spent:** 0 hours
- **Time Remaining:** 16 hours estimated
- **Next Action:** Modify hugo.toml to add GSAP and Alpine.js

---

## File Structure

```
dev/active/hugo-animation-enhancements/
├── README.md                              # This file - quick overview
├── hugo-animation-enhancements-plan.md    # Complete approved plan
├── hugo-animation-enhancements-context.md # Current state & decisions
└── hugo-animation-enhancements-tasks.md   # Detailed checklist
```

---

## Key Documents

### 1. **Plan** (`hugo-animation-enhancements-plan.md`)
- Complete implementation strategy
- All 4 phases detailed with code examples
- Architecture decisions
- Success metrics
- **Read this:** For full understanding of approach

### 2. **Context** (`hugo-animation-enhancements-context.md`)
- Current progress and focus
- Key decisions made
- File locations and architecture
- Next immediate actions
- **Read this:** To resume work seamlessly

### 3. **Tasks** (`hugo-animation-enhancements-tasks.md`)
- 24 granular tasks across 4 phases
- Checkbox format for tracking
- Dependencies noted
- Time estimates per task
- **Use this:** To track daily progress

---

## Critical Information

### Must Remember
1. **Run Hugo from theme directory:** `cd themes/andromeda-hugo`
2. **Use assets/js/ NOT static/js/** for source files
3. **Hugo plugin system:** Add libraries to hugo.toml
4. **Keep existing:** AOS, Rellax work perfectly - don't touch
5. **Extend, don't create:** Modify _design-enhancements.scss, don't create new files

### What Already Exists (Don't Rebuild)
- ✅ Glassmorphism system
- ✅ 8 gradient types
- ✅ Parallax scrolling (Rellax)
- ✅ Counter animations (SVG rings)
- ✅ Smooth scroll
- ✅ 10+ animation keyframes

### What We're Adding (Genuinely New)
- 🆕 Magnetic buttons
- 🆕 Ripple effects
- 🆕 Text reveal (word-by-word)
- 🆕 Image reveal (clip-path)
- 🆕 Alpine.js micro-interactions

---

## Files to Modify

Only 6 files total:

1. `themes/andromeda-hugo/hugo.toml` - Add 2 plugin entries
2. `layouts/partials/atoms/button.html` - Add data-animate support
3. `layouts/partials/molecules/card.html` - Add data-animate support
4. `assets/js/gsap-enhancements.js` - **CREATE** new file
5. `assets/scss/_design-enhancements.scss` - **EXTEND** existing file
6. `content/english/test-animations.md` - Test page (can delete after)

---

## Success Metrics

### Time Savings
- **Original refactor plan:** 44-54 hours
- **This plan:** 12-16 hours
- **Savings:** 70%

### Code Reduction
- **Original plan:** 15+ new files
- **This plan:** 1 new file, 5 modified
- **Reduction:** 80%

### Bundle Size
- **Target:** <100KB total
- **Current:** ~30KB
- **Adding:** +63KB (GSAP + Alpine.js)
- **Final:** ~95KB (within target)

### Duplication
- **Original plan:** 90% duplication risk
- **This plan:** 0% duplication
- **Result:** Clean enhancement layer

---

## Architecture at a Glance

```
Current Stack (Keep):
AOS (12KB)              → Scroll animations
Rellax (2KB)            → Parallax
scroll-animations.js    → Custom logic
stats-counter.js        → SVG counters
values-compass-interactions.js → Touch handling

New Enhancement Layer (Add):
GSAP (48KB)             → Magnetic buttons, advanced effects
Alpine.js (15KB)        → Reactive components
gsap-enhancements.js    → 5 new effects
_design-enhancements.scss → Extended styles

Total: ~95KB (under 100KB target)
```

---

## Next Session Checklist

When resuming:
1. [ ] Run `/resume-dev` OR read context.md
2. [ ] Check current phase (likely still Phase 1)
3. [ ] Review last completed task in tasks.md
4. [ ] Identify exact next action from context.md
5. [ ] Verify working directory: `/home/cere/Work/alex/alexandrabarbu.ro`
6. [ ] Check Hugo server status (may need restart)
7. [ ] Proceed with next task

---

## References

### Internal Docs
- **Theme rules:** `themes/andromeda-hugo/CLAUDE.md`
- **Original plan:** `themes/andromeda-hugo/cc-design.md` (90% duplication)
- **Architecture:** `themes/andromeda-hugo/PROJECT.md`

### External Resources
- **GSAP:** https://greensock.com/docs/
- **Alpine.js:** https://alpinejs.dev/
- **Hugo Pipes:** https://gohugo.io/hugo-pipes/

---

## Questions?

### For Implementation Questions
→ See detailed code examples in `hugo-animation-enhancements-plan.md`

### For Architecture Questions
→ See decisions and rationale in `hugo-animation-enhancements-context.md`

### For Progress Tracking
→ See checklist in `hugo-animation-enhancements-tasks.md`

---

**Status:** Ready for implementation
**Confidence Level:** High (clear plan, minimal changes, low risk)
**Estimated Completion:** 3-4 sessions
