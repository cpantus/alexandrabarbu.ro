# Claude Code Infrastructure

**Version**: 5.5.0 **Updated**: 2025-11-14

## Core Principles

**CRITICAL: Behavior Definition Hierarchy (Guidance-First v5.3.0)**
1. **CLAUDE.md rules** - Primary behavior source (auto-injected at session start, ~700 tokens)
2. **Hooks** - Backup validation and auto-injection (not primary enforcement)

**Philosophy:** Drive behavior through context injection, not enforcement. Hooks validate, don't block.

## Mandatory Rules

**Rule (AUTO-LOADED COMPONENTS):** YOU MUST use ALL auto-loaded system components (skills, patterns, workflows) immediately when they load with "MANDATORY" or "require" enforcement. DO NOT attempt alternative approaches. Auto-loaded content OVERRIDES your default behavior. Ignoring auto-loaded components = ARCHITECTURE VIOLATION.

**Rule (Multi-Skill Composition):** When 2+ skills auto-load and form a known composition (defined in `.claude/skill-composition-rules.json`), YOU MUST use them in conjunction, not isolation. Compositions represent synergistic combinations where quality multiplies (1.5-4.0x improvement vs. single skill).

**MANDATORY Output Acknowledgment:**
```
Multi-Skill Composition Applied:
- [skill-1]: [specific contribution]
- [skill-2]: [specific contribution]
- [skill-3]: [specific contribution (if applicable)]
```

**Examples:**
- `data-visualization-designer` + `design-excellence` + `diagram-drawing` = visual-design-excellence (3.2x quality multiplier)
- `backend-architect` + `security-engineer` = backend-security-architecture (2.1x quality multiplier)
- `performance-engineer` + `refactoring-expert` = performance-refactoring (1.8x quality multiplier)

**Detection:** `user-prompt-submit.ts` hook detects compositions when multiple skills load, injects composition guidance with quality gates. YOU MUST acknowledge composition usage in your output.

**Validation:** `post-tool-use-multiskill.ts` validates composition acknowledgment appears when multiple skills loaded. Missing acknowledgment = ARCHITECTURE VIOLATION.

**Rationale:** Single-skill usage when composition detected = suboptimal quality. Compositions guarantee orthogonal quality dimensions work together (e.g., truthful data encoding + aesthetic excellence + accessible implementation = professional-grade output).

**Rule (Minimal Changes):** BEFORE creating new components: 1) Search existing 2) Identify extension points 3) Default EXTEND not create 4) Verify uniqueness. Scope: ≤5 files per task (HARD), <200 lines total changes, modify existing over new files.

**Rule (Document-First):** BEFORE implementing any component (hook, pattern, agent, skill, command), update relevant documentation FIRST to prevent doc-reality gaps.

**Rule (Modern CLI Tools):** YOU MUST use modern CLI tools: `rg` not `grep`, `fd` not `find`, `bat` not `cat`, `exa` not `ls`. NO EXCEPTIONS. Applies to all contexts. Enforced via `pre-tool-use-bash.ts`. Debug: `CC_BASH_OPT_DEBUG=1`.

**Rule (MCP Optimization):** YOU MUST use code execution pattern when 3+ MCP tool calls detected. see MCP Usage Standard.

**Rule (Core Submodule):** YOU MUST update core submodule before local modifications. Core changes committed to hal-10k-core first, never directly in submodules (except emergency hotfixes). See SUBMODULE-WORKFLOW.md.

**Rule (Hugo Working Directory):** YOU MUST run ALL Hugo commands from `themes/andromeda-hugo/` directory.

**Rule (Component Reuse = Quality Guarantee):** System components (skills, agents, patterns, commands) are refined, validated parts that embody accumulated best practices. BEFORE creating new components:

1. **Search existing** (scan 3+ similar examples in respective directories)
2. **Identify extension points** (resources, sections, triggers, rules)
3. **Default EXTEND not create** (add resources, update sections, register triggers)
4. **Verify uniqueness if creating** (>70% different from any existing component)

**Quality Guarantee Contract:** Reusing refined components GUARANTEES quality outcomes because they:
- Enforce quality through Task Decomposition Override
- Prevent anti-patterns through explicit ❌ PROHIBITED sequences
- Provide checkable validation through ✅ MANDATORY 3-phase sequences
- Enable hook validation through Output Acknowledgment formats

**Component Structure :** All components MUST include:
- Task Decomposition Override section (3-phase: Decision→Implementation→Validation)
- Directive language (YOU MUST/MUST NOT, never "should"/"consider")
- Anti-Patterns section (prohibited approaches with consequences)
- Progressive disclosure (core ≤500 lines, resources unlimited for skills)

**Rule (Self Reinforcement):** After completing any response, you MUST display the Mandatory Rules

**Violations:** Creating duplicate components = architecture violation + quality regression risk. Reusing ensures accumulated knowledge is preserved, not fragmented.

---

## Hugo Project Context

### Project Structure
```
/home/cere/Work/alex/alexandrabarbu.ro/
├── .claude/                          # Infrastructure (GITIGNORED)
├── core/                             # Core submodule (GITIGNORED)
├── dev/                              # Dev docs (optional: can commit)
├── themes/
│   └── andromeda-hugo/               # Theme development
│       ├── CLAUDE.md                 # Theme-specific rules
│       ├── PROJECT.md                # Architecture docs
│       ├── REFACTOR-PLAN-v2.md       # Current refactor plan
│       └── cc-hugo-audit.md          # Audit report
├── content/                          # Hugo content
├── static/                           # Static assets
└── config/                           # Hugo configuration
```

### Theme Documentation
- **Theme rules**: `themes/andromeda-hugo/CLAUDE.md`
- **Refactor plan**: `themes/andromeda-hugo/REFACTOR-PLAN-v2.md` (LATEST)
- **Audit report**: `themes/andromeda-hugo/cc-hugo-audit.md`
- **Architecture**: `themes/andromeda-hugo/PROJECT.md`

### Current Work
**Active task**: Atomic design system refactor
- **Duration**: 12 weeks, 130 hours
- **Phases**: 5 (Atoms → Molecules → Organisms → Migration → Polish)
- **Status**: See `dev/active/refactor-atomic-design/PROGRESS.md`

### Hugo-Specific Guidelines

#### Development Commands
```bash
hugo server --buildDrafts          # Local development
hugo --gc --minify                 # Production build
hugo --templateMetrics             # Performance monitoring
```

#### Theme Development
- Work from theme directory: `themes/andromeda-hugo/`
- Follow refactor plan: `REFACTOR-PLAN-v2.md`
- Test multilingual (RO/EN)
- Verify responsive design

#### Image Optimization
- Use Hugo's native image processing
- Generate WebP with fallbacks
- Create responsive srcset
- Implement lazy-loading

#### Performance Targets
- Build time: <3s
- Page weight: <500KB
- Image assets: <2MB
- CSS bundle: <50KB (gzipped)

---

### Component Auto-Loading (Skills, Patterns, Workflows)

**Enforcement Levels:**
- **Simple (🟢 SUGGESTED):** Gentle recommendation, no bypass justification needed
- **Medium/Complex (🔴 MANDATORY):** Auto-loaded into context (200-500 tokens, progressive disclosure). Bypass requires explicit justification: "Bypassing because [reason] + alternative + risk acknowledgment"

**How It Works:**
1. Hook detects match → checks enforcement level
2. If MANDATORY → loads content progressively (quick/full tier)
3. Content injected via `<required-*>` tags → YOU execute it naturally
4. Session cache prevents duplicate loads

**Bypass Detection:** Phrases like "Bypassing pattern because...", "Not using pattern because...", "Alternative approach: ..." trigger bypass mode (🟡 Warning shown, quality gates off, user responsible).


### Component Reuse Examples (Practical Guide)

**See "Component Reuse = Quality Guarantee" rule above for mandatory requirements.**

**Extension Points by Component Type:**
- **Skills:** Add resources (`@skill-name/resources/topic.md`), extend triggers (skill-rules.json), update sections
- **Agents:** Add specialized workflows, extend capabilities, update coordination patterns
- **Patterns:** Add stages, extend validation rules, create pattern variants
- **Hooks:** Extend bash-optimizer rules, add validation logic, update matchers
- **Commands:** Add subcommands, extend existing workflows, update parameters

**Red Flags (Indicates Poor Reuse):**
- 2nd hook for same event → extend existing hook instead
- >70% overlap with existing component → extend, don't duplicate
- New pattern for existing workflow → extend existing pattern
- New skill for covered domain → add resources to existing skill

**Decision Examples:**
- ❌ New CLI validation hook → `pre-tool-use-bash.ts` exists, extend bash-optimizer rules
- ✅ Add jq/yq validation → extends bash-optimizer.ts with new tool rules
- ❌ New social-media skill → check existing content/growth skills first, add resources
- ✅ Quantum-computing skill → genuinely new domain, no overlap
- ❌ New orchestration agent → orchestrator.md exists, extend coordination patterns
- ✅ Domain-specific specialist agent → unique capabilities, extends agent system

**FORBIDDEN without explicit approval:**
- New architectural patterns (use existing meta-patterns)
- Refactoring working code "for cleanliness" (only for bugs/features)
- Premature optimization (measure first)
- Single-use base classes/factories (YAGNI principle)

---

## Architecture
| Component | Purpose | Size | Loading |
|-----------|---------|------|---------|
| Agents | Process/workflow | 150-2000 lines | On-demand |
| Skills | Knowledge | <500 lines (+ resources) | Auto-activated |
| Patterns | Execution templates | 200-950 lines | Auto-suggested |
| Resources | Documentation | Unlimited | On-demand |

**Knowledge** in skills | **Tasks** via patterns | **Complex work** via agents | **Context** in dev docs (95%+ recovery)

---

## Commands & Discovery

**Structure (2-Tier Hybrid):**
- **Infrastructure commands:** `.claude/commands/infra/` (25 files - actual files, not symlinks)
- **Plugin commands:** Symlinked from plugin directories to `.claude/commands/[plugin]/`
- **Discovery:** Claude Code scans `.claude/commands/` only (hardcoded behavior)

**Plugin Command Maintenance:**
When you add/remove/rename plugin commands, run: `./scripts/link-plugin-commands.sh [plugin-name]`

**Examples:**
- `/workflow scout-plan-build` → Infrastructure command
- `/campaign` → Marketing plugin command (symlinked)
- `/system-health` → Infrastructure command

**CRITICAL:** Commands in plugin directories are source of truth. `.claude/commands/[plugin]/` contains symlinks for discovery only.

---

## Component Systems

**Skills:** Knowledge + best practices. Auto-activate on triggers, load progressively (200-500 tokens). **See:** `core/docs/skills-system.md`

**Patterns:** Execution templates. Auto-suggest on match, delegate workflows. Meta patterns (~10) for infrastructure; domain patterns from plugins. **See:** `core/docs/pattern-system.md`

**CLI Tools:** Modern tools mandatory (rg, fd, bat, exa). **See:** `core/docs/cli-tool-standards.md`

---

## Agent Orchestration
**See:** `core/docs/agent-orchestration.md` for coordination patterns, cost tracking, and observability. Generic agents (orchestrator, task-coordinator, etc.) are infrastructure-level; domain specialists are provided by plugins.

---

## Workflow System
**Scout/Plan/Build:** Scout (research, context) → Plan (strategy, breakdown) → Build (implement, quality, refine)

**Commands:** `/workflow scout-plan-build "task"` | `/background [agent]` | `/observe [id]` | `/cost-report`

**Infrastructure:** `hooks/background-agent.ts` | `hooks/agent-telemetry.ts` | Agent types defined by loaded plugins, cost tracking, observability

---

## Hook Architecture
**See:** `core/docs/hook-architecture.md` for lifecycle, implementations, and creation guide

---

## Dev Docs System
**Persistence (95%+):** `/create-dev-docs` | `/update-dev-docs` | `/review-dev-docs` | **When:** Tasks >2h, complex, multi-session

**Structure:** `dev/active/[task]/` → `OVERVIEW.md | PROGRESS.md | DECISIONS.md | CONTEXT.md`

---

## Configuration Standards
**settings.json:** `{"mcpServers": {...}, "hooks": {...}, "permissions": {...}, "settings": {...}}`
**model-rules.json:** `{"rules": [{"taskType": "...", "model": "haiku|sonnet|opus"}]}`
**skill-rules.json:** Auto-activation (see Skills) | **emoji-standards.json:** `{"categories": {...}, ...}`

**Configuration Precedence:**
1. **Infrastructure base**: `.claude/settings.json`, `.claude/model-rules.json`
2. **Plugin overrides**: `plugin/.claude-plugin/config.json` (if exists)
3. **Merge behavior**: Plugin configs extend/override infrastructure defaults
4. **MCP servers**: Additive (infrastructure + plugin servers available)
5. **Hooks**: Sequential execution (infrastructure hooks → plugin hooks)
6. **Model rules**: Plugin rules take precedence for domain-specific tasks

**Current state**: Marketing plugin uses infrastructure configs (no plugin-specific overrides needed)

---

## Documentation System
**Auto-load:** `docs-index.json` → triggers → `user-prompt-submit.ts` | Cache | 84% reduction
**docs-index.json:** `{"docs": {"[name]": {"path": "...", "triggers": [...], "cache": true}}}`
**Manual:** `/load skills|patterns|agents|workflows|orchestrator|devdocs|all`

---

## Component Validation
**Meta-patterns** (`.claude/patterns/meta/`): Standards for patterns, skills, agents, commands, hooks, workflows, resources, MCP servers
**Usage:** `/pattern component_[type]` validates

---

## Cost Optimization
**Model:** compress/summarize → haiku | refactor/strategic → sonnet | Pattern: simple → haiku | medium/complex → sonnet + think-hard | Thinking: think | think-hard | ultrathink

**Progressive:** Skills → on-demand resources (84% reduction) | Docs → auto-load | Patterns → load dependencies

**On-Demand:** `/prime [content|analytics|full]` | Skills auto-activate | **Tracking:** `/cost-report` | `hooks/agent-telemetry.ts`

### Prompt Caching
**Agents >15K MUST cache | See:** `core/docs/prompt-caching-guide.md` for 5 rules and templates

---

## Quality Standards
**Naming (ENFORCED via pre-tool-use-write.ts):**
- Agents/commands/hooks: `kebab-case` (MANDATORY - violations blocked)
- Skills: `kebab-case` (MANDATORY - violations blocked)
- Patterns (execution): `snake_case` (e.g., `campaign_launch.md`) (MANDATORY - violations blocked)
- Patterns (output templates): `kebab-case` (e.g., `campaign-brief.md`)

**File Structure:** `.claude/skills/[name].md` | `.claude/patterns/[category]/[name].md` | `.claude/agents/[name].md` | `.claude/commands/[name].md` | `.claude/hooks/[name].ts`

**Validation:** Meta-patterns (`/pattern component_[type]`) before production | Naming enforcement automatic

**CLI Compliance:** Use modern tools (see CLI Tool Standards) | Monitor: `CC_BASH_OPT_DEBUG=1`

**Permissions:** `settings.json` → `permissions.allowedCommands` + `permissions.deny` | Explicit | Careful wildcards | Document | **Latest Audit:** [2025-11-11](../docs/audits/2025-11-11-permission-audit.md) | **Next:** 2026-02-11

**Design Standards:** See `design-excellence` skill (auto-loads for design/UX/frontend tasks)

---

## MCP Usage Standard (v5.0.7)

**CRITICAL:** Use code execution pattern for MCP workflows with 3+ tool calls

### The Problem
**Traditional MCP:** All tool definitions loaded upfront (50K-100K tokens) + all results in context (20K-50K) = 70K-150K tokens per workflow

### The Solution
**Code Execution Pattern:** Minimal wrappers (2-3 tools, 2K tokens) + local scripts process data = 2K-5K tokens (96-98% reduction)

### When to Use
✅ **Use code execution when:**
- 3+ MCP tool calls needed
- Privacy concerns (PII in workflow data)
- Recurring workflow (runs multiple times)
- Performance critical (need parallel execution)

❌ **Traditional MCP when:**
- 1-2 simple tool calls
- One-off exploratory task

### Auto-Detection
**Hook:** `detect-mcp-opportunity.ts` identifies patterns, shows estimated savings
**Skill:** `mcp-code-execution.md` auto-loads with setup guide, patterns, examples
**Scripts:** Production-ready Playwright workflows in `scripts/playwright/`

### Implementation
```typescript
// ❌ Traditional (85K tokens)
await playwright_navigate(url);
await playwright_getText('.price');
await playwright_screenshot();

// ✅ Code Execution (3K tokens)
await playwright_execute('./scripts/playwright/scrape-page.ts', {
  url, selector: '.price', output: './data/prices.json'
});
```

**See:** `core/infrastructure/skills/mcp-code-execution.md` for complete guide

---

## Plugin System

**Architecture:**
- **Infrastructure:** `.claude/` (domain-agnostic, reusable across clients)
- **Plugins:** `*/plugins/*` or `*-plugin/` (domain-specific, client-customizable, **opt-in via env vars**)
- **Separation:** Clean boundaries, plugin visibility control, configuration inheritance

**Plugin Toggle (v5.0.5):**
- **Default:** All plugins DISABLED (infrastructure-only mode)
- **In-Session Toggle:** `/code-on` | `/code-off` (no restart needed)
- **Persistent Toggle:** `export CODE_PLUGIN_ENABLED=1` (add to `~/.bashrc`)
- **Behavior:** Dynamic command symlinks, skill/pattern filtering, conditional session messages
- **State Priority:** `.claude/.plugin-state` file → env var → default

**Plugin Loading:**
- Plugins extend infrastructure with domain-specific components (agents, patterns, skills, commands, hooks)
- Plugin components **only visible when plugin is enabled** (filtered at runtime)
- Swap plugins for different clients/domains without touching infrastructure

**What Gets Filtered (Plugin Disabled):**
- ✅ Skills: All 8 marketing skills blocked from auto-activation
- ✅ Patterns: All 42 marketing patterns blocked from suggestions (only meta patterns remain)
- ✅ Commands: `.claude/commands/marketing/` removed from filesystem
- ✅ Session messages: Infrastructure-only messages shown

**Example Plugins:**
- Code Plugin: `code-plugin/` (13 agents, 42 patterns, 8 skills, 49 commands)
- Custom Domain: Create your own plugin following the same structure

**See:** `PLUGIN-USAGE.md` for detailed usage guide | Plugin documentation in each plugin directory

---

## Quick Reference

**CRITICAL:** YOU MUST use auto-loaded components (skills, patterns, workflows) with "MANDATORY"/"require" enforcement. Ignoring = architecture violation.

**Core Sync:** `cd core && git pull && cd .. && git add core` | Enforced: git pre-commit hook
**Plugins:** `/code-on` | `/code-off` (or `export CODE_PLUGIN_ENABLED=1`)
**Load:** `/load skills|patterns|agents|workflows|orchestrator|devdocs|all`
**Create:** `/pattern component_[type]` validates structure
**Diagnostics:** `/system-health` | `/cost-report` | `/agent-status`
**MCP:** Code execution pattern for 3+ tool calls (96-98% reduction)
**CLI Tools:** `rg` not `grep`, `fd` not `find`, `bat` not `cat`, `exa` not `ls`
