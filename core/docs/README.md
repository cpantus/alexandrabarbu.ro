# CLAUDE.md Detail Documentation

This directory contains detailed documentation that is loaded on-demand to complement the core `.claude/CLAUDE.md` file.

## Architecture

**Core CLAUDE.md** (~1,158 tokens) contains:
- Identity & Operational Modes
- Capability Index (comprehensive feature list)
- Core Operating Principles (compressed)
- Quality Standards
- Production Mode Essentials
- System Architecture

**Detail files** (8 files, ~5,900 tokens total) contain:
- In-depth explanations
- Detailed examples
- Complete reference materials
- Implementation guides

## Detail Files

### 1. skills-system.md (~350 tokens)
**When to load:** When working with skills, understanding auto-activation, or needing detailed skill references.

**Loaded via:** `/load skills` or auto-loaded when keywords detected (skill names, @.claude/skills/)

**Contains:**
- Complete list of 7 skills with descriptions
- How skills work (auto-activation, progressive disclosure)
- When to load manually vs auto-activation
- Skill activation priority
- Integration with patterns

---

### 2. pattern-system.md (~1,100 tokens)
**When to load:** When using patterns, chaining patterns, or understanding pattern execution methods.

**Loaded via:** `/load patterns` or auto-loaded when keywords detected (/pattern, /chain, create_, write_, generate_)

**Contains:**
- All 24 patterns by category (Content, Strategy, Analysis, Optimization)
- Pattern execution methods (auto-suggestion, manual, chaining)
- Pattern structure (PURPOSE, INPUT, PROCESS, OUTPUT, QUALITY CHECKS, EXAMPLE, VARIATIONS)
- Pattern + Skills integration
- Pattern decision framework (when to use patterns vs skills vs agents)

---

### 3. agent-orchestration.md (~1,850 tokens)
**When to load:** When using research agents, coordinating agents, or understanding agent specializations.

**Loaded via:** `/load agents` or auto-loaded when `/research`, agent coordination, or knowledge gathering detected

**Contains:**
- Infrastructure agents: orchestrator, task-coordinator, task-implementer, research-scout, demo-personalize
- Research Scout capabilities (WebSearch, WebFetch, Context7 MCP)
- Research integration patterns (standalone, parallel, gap-driven)
- Agent coordination patterns and cost/performance metrics
- When to use each agent type with examples

---

### 4. workflow-system.md (~1,650 tokens)
**When to load:** When using Scout/Plan/Build workflows, research integration, background agents, or telemetry.

**Loaded via:** `/load workflows` or auto-loaded when keywords detected (/workflow, /background, /research, --with-research, scout, planner, builder)

**Contains:**
- Scout/Plan/Build workflow patterns with research integration
- Research Scout integration (--with-research flag, parallel execution)
- Background agent execution (13 agent types, commands)
- Agent telemetry (context, tools, cost, performance tracking)
- Observability & cost tracking (dashboards, reports)
- When to use workflows vs traditional approach
- Integration with dev docs, patterns, and research library
- Performance characteristics and best practices

---

### 5. orchestrator-guide.md (~1,600 tokens)
**When to load:** When using the orchestrator for fleet-scale coordination or complex task decomposition.

**Loaded via:** `/load orchestrator` or auto-loaded when keywords detected (/orchestrate, fleet, coordinate)

**Contains:**
- How orchestrator works (analyze, decompose, spawn, coordinate, monitor, aggregate, cleanup)
- Orchestration examples (migration, strategy, content at scale)
- Orchestrate options (--task-name, --max-cost, --max-time, --mode)
- Manual agent control (CRUD operations: create, status, kill, cleanup)
- 13 agent types with cost estimates
- When to use /orchestrate vs /workflow vs /agent-create vs direct tools
- Cost optimization strategies (4 types: model selection, priming, batching, two-stage)
- Observability & cost tracking

---

### 6. dev-docs-guide.md (~380 tokens)
**When to load:** When creating dev docs, working on large tasks, or resuming after compaction.

**Loaded via:** `/load devdocs` or auto-loaded when keywords detected (/create-dev-docs, /update-dev-docs, large task)

**Contains:**
- Dev docs directory structure
- The three commands (create, update, review)
- When to use dev docs (large tasks >2h, complex implementations)
- Before compaction checklist
- Continuing after compaction (context recovery instructions)
- Integration with workflows

---

> **Note:** The following docs have been moved to `marketing-plugin/`:
> - `workflow-guidelines.md` → `marketing-plugin/docs/workflow-guidelines.md`
> - `teaching-mode.md` → `marketing-plugin/teaching/teaching-mode.md`
> - `output-style-marketing-expert.md` → `marketing-plugin/docs/output-style-marketing-expert.md`
> - `tier-guide.md` → `marketing-plugin/docs/tier-guide.md`
>
> These are marketing-specific docs and part of the plugin system. They remain auto-loadable via docs-index.json.

---

## Loading Mechanisms

### Auto-Loading (Hooks)
Detail files are automatically loaded when relevant keywords are detected in user prompts:
- **Pattern keywords:** /pattern, /chain, create_, write_, generate_, improve_, optimize_
- **Workflow keywords:** /workflow, /background, scout, planner, builder
- **Orchestrator keywords:** /orchestrate, fleet, coordinate, decompose
- **Dev docs keywords:** /create-dev-docs, /update-dev-docs, large task, multi-session
- **Teaching keywords:** /start-\d+-\d+, lesson, module, teaching
- **Agent keywords:** agent coordination, specialist review, orchestration

**Hook accuracy target:** >95%

### Manual Loading
Use `/load [capability]` to explicitly load documentation:
```bash
/load skills              # Load skills-system.md
/load patterns            # Load pattern-system.md
/load agents              # Load agent-orchestration.md
/load workflows           # Load workflow-system.md
/load orchestrator        # Load orchestrator-guide.md
/load devdocs             # Load dev-docs-guide.md
/load all                 # Load all core infrastructure docs
```

Plugin-specific docs are auto-loaded via docs-index.json triggers.

### Caching
- Detail files are cached for the session duration
- Cache cleared on context compaction
- Cache hit rate target: >90%
- Loading latency target: <200ms (silent loading)

---

## Token Budget (Core Infrastructure)

| File | Target Tokens | Actual Tokens | Status |
|------|---------------|---------------|--------|
| skills-system.md | 350 | TBD | ⏳ Pending |
| pattern-system.md | 1,100 | TBD | ⏳ Pending |
| agent-orchestration.md | 1,850 | TBD | ✅ Updated (v5.1.0) |
| workflow-system.md | 1,650 | TBD | ✅ Updated (v5.1.0) |
| orchestrator-guide.md | 1,600 | TBD | ⏳ Pending |
| dev-docs-guide.md | 380 | TBD | ⏳ Pending |
| **TOTAL (Core)** | **6,930** | **TBD** | ⏳ Pending |

**Core CLAUDE.md:** ~1,158 tokens
**Core detail files:** ~5,500 tokens
**Total core system:** ~6,658 tokens

**Plugin docs** (marketing-plugin/docs/, marketing-plugin/teaching/): ~1,260 tokens
- workflow-guidelines.md: ~280 tokens
- teaching-mode.md: ~260 tokens
- output-style-marketing-expert.md: ~650 tokens
- tier-guide.md: ~70 tokens

**Session start:** 1,158 tokens (core only, 82% reduction)
**On-demand loading:** 0-6,760 tokens (context-dependent)

---

## Cross-References

Detail files reference each other and core CLAUDE.md:
- patterns → skills (for knowledge loading)
- workflows → patterns (for execution)
- orchestrator → workflows (for coordination)
- dev-docs → workflows (for integration)
- All files → CLAUDE.md Capability Index (for navigation)

---

## Maintenance

**Single source of truth:** Content lives in ONE detail file, referenced elsewhere

**Updating files:**
1. Update relevant detail file
2. Verify cross-references still work
3. Update token counts in this README
4. Test auto-loading hooks
5. Validate cache behavior

**Adding new capabilities:**
1. Add to detail file (or create new file if major feature)
2. Update CLAUDE.md Capability Index
3. Add hook detection pattern (if applicable)
4. Update this README
5. Test auto-loading

---

## Historical Documentation

**Migration Guides:**
- See `dev/archive/migrations/` for completed version migrations
- [v5.6.0 Skills Migration](../../dev/archive/migrations/v5.6.0-skills-migration.md) - Migration from legacy to official Claude Code format

**Audit Reports:**
- See `docs/audits/` (project root) for security and compliance audits
- Latest permission audit: 2025-11-11, Next: 2026-02-11

---

**For questions or updates, see:** `dev/active/claude-md-optimization/` dev docs
