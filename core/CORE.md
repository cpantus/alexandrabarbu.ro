# Claude Code Core Infrastructure v5.0

**Version**: 5.0 (alpha) | **Last Updated**: 2025-11-08

## Core Principles

**CRITICAL: Behavior Definition Hierarchy**
1. **CORE.md rules** - Primary behavior source (50-100 tokens per rule, always loaded)
2. **Hooks** - Enforce critical rules mechanically (validation, auto-correction)
3. **Patterns/Skills/Commands** - Execution details (loaded on-demand)

**Rule:** Define behavior in CORE.md first, enforce via hook only if critical. Prefer lean solutions.

**🚨 CRITICAL: CLI TOOL ENFORCEMENT 🚨**

**BEFORE ANY BASH COMMAND - VERIFY YOU'RE USING MODERN TOOLS:**

| ❌ FORBIDDEN | ✅ REQUIRED | Savings | Why |
|-------------|------------|---------|-----|
| `cat file` | `bat --line-range` OR Read tool | 30% | Syntax highlighting, pagination |
| `cat file \| cmd` | `bat file \| cmd` OR `cmd < file` | 25% | Avoid useless cat |
| `ls -l*` (any flags) | `exa --git -l` | 15% | Git status, better formatting |
| `grep`, `grep -r` | `rg` | 60-80% | 80% faster, better output |
| `find` | `fd` | 40-50% | 50% faster, simpler syntax |
| `wc -l` | `rg -c ""` OR `fd \| wc -l` | 20% | Modern counting |
| `cat file.json \| jq` | Read tool | 75-85% | Direct parsing |

**ENFORCEMENT:**
- **YOU (main assistant):** Use these tools in ALL Bash commands. **No exceptions.**
- **Hook has gaps** - It catches most violations but misses pipes, `wc`, some flag combos
- **YOU MUST USE CORRECT TOOLS FIRST** - Don't rely on hook auto-correction
- **SUBAGENTS (Task tool):** Include CLI standards in every agent prompt you create

**Full reference:** `@core/docs/cli-tool-standards.md` (auto-loaded)

**Rule:** Patterns are mandatory when they exist for your task type.

**Pattern Invocation:** ✅ Hook suggests → `/pattern [name] [args]` → Pattern executes | ✅ Pattern exists → Use `/pattern [name]` | ❌ Ignore or manual implementation (violation) | ❌ Read pattern file → Implement manually (bypasses enforcement)

**CRITICAL:** Pattern files are delegatable systems, NOT documentation.

---

## Core Constraint: Minimal Changes

**BEFORE implementation:** 1. Scan 3 similar patterns in codebase 2. List existing solutions 3. Identify reusable components/utilities/logic

**Scope Targets:** ≤5 files per task (HARD) | <200 lines total changes | Modify existing over new files | Question every new abstraction

**Validate Necessity:** Does this exist? | Can existing be simplified vs extended? | Solving today's problem or imagined future?

**Required per task:** Affect ≤5 files | Test strategy | Rollback plan | Dev docs update (multi-session tasks)

**FORBIDDEN without approval:** New architectural patterns | Refactoring working code "for cleanliness" | Premature optimization | Single-use base classes/factories

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

## CLI Tool Standards (MANDATORY)

**CRITICAL:** MUST use modern CLI tools. **See:** `@core/docs/cli-tool-standards.md`

---

## Skills System

**See:** `@core/docs/skills-system.md` for auto-activation, structure, and configuration

---

## Pattern System

**See:** `@core/docs/pattern-system.md` for meta + workflow patterns, auto-suggest, chaining, and structure

---

## Agent Orchestration

**See:** `@core/docs/agent-orchestration.md` for orchestrator agents and coordination patterns

---

## Workflow System

**Scout/Plan/Build:** Scout (research, context) → Plan (strategy, breakdown) → Build (implement, quality, refine)

**Commands:** `/workflow scout-plan-build "task"` | `/background [agent]` | `/observe [id]` | `/cost-report`

**Infrastructure:** `hooks/background-agent.ts` | `hooks/agent-telemetry.ts` | Agent types defined by extensions

---

## Hook Architecture

**See:** `@core/docs/hook-architecture.md` for lifecycle, implementations, and creation guide

---

## Dev Docs System

**Persistence (95%+):** `/create-dev-docs` | `/update-dev-docs` | `/review-dev-docs` | `/resume-dev` | **When:** Tasks >2h, complex, multi-session

**Structure:** `dev/active/[task]/` → `[task]-plan.md | [task]-context.md | [task]-tasks.md`

---

## Extension System

**Core + Extensions + Projects:** Three-layer architecture for domain separation and reusability

**Extension Loading:**
- Extensions discovered via `domain.json` manifest
- Components registered automatically
- Auto-activation works across extensions
- Validated via JSON schemas

**Extension Development:**
- Use `extensions/_template/` as starter
- See extension development guide
- Validate with `/pattern component_*` meta-patterns

---

## Configuration Standards

**settings.json:** `{"mcpServers": {...}, "hooks": {...}, "permissions": {...}, "settings": {...}}`
**model-rules.json:** `{"rules": [{"taskType": "...", "model": "haiku|sonnet|opus"}]}`
**config.json:** Project composition (core + extensions)
**domain.json:** Extension manifest

---

## Documentation System

**Auto-load:** `docs-index.json` → triggers → `user-prompt-submit.ts` | Cache | Progressive loading
**docs-index.json:** `{"docs": {"[name]": {"path": "...", "triggers": [...], "cache": true}}}`
**Manual:** `/load skills|patterns|agents|workflows|all`

---

## Component Validation

**Meta-patterns** (`core/infrastructure/patterns/meta/`): Standards for patterns, skills, agents, commands, hooks, workflows, resources, MCP servers

**Usage:** `/pattern component_[type]` validates before creation

---

## Cost Optimization

**Model:** compress/summarize → haiku | refactor/strategic → sonnet | Pattern: simple → haiku | medium/complex → sonnet + think-hard | Thinking: think | think-hard | ultrathink

**Progressive:** Skills → on-demand resources | Docs → auto-load | Patterns → load dependencies

**On-Demand:** `/prime [tier]` | Skills auto-activate | **Tracking:** `/cost-report` | `hooks/agent-telemetry.ts`

### Prompt Caching

**Agents >15K MUST cache | 26.5% cost reduction | See:** `@core/docs/prompt-caching-guide.md` for 5 rules and templates

---

## Quality Standards

**Naming:** Skills/patterns: `snake_case` | Agents/commands/hooks: `kebab-case`

**File Structure:**
- Core: `core/infrastructure/{agents|patterns|commands|hooks|utils}/`
- Extensions: `extensions/[name]/{agents|skills|patterns|commands|knowledge}/`
- Projects: `projects/[name]/.claude/`

**Validation:** Meta-patterns (`/pattern component_[type]`) before production

**CLI Compliance:** Use modern tools (see CLI Tool Standards) | Monitor: `CC_BASH_OPT_DEBUG=1`

**Permissions:** `settings.json` → `permissions.allowedCommands` | Explicit | Careful wildcards | Document

### CRITICAL: Extend vs Create

**BEFORE creating:** 1. Search existing 2. Identify extension points 3. Default EXTEND 4. Verify uniqueness

**Extension Points:** Hooks (bash-optimizer rules) | Patterns (categories) | Skills (resources, triggers) | **Flags:** 2nd hook same event | >70% overlap

---

## Tiered Loading

**Tier 1:** Always loaded (critical infrastructure)
**Tier 2:** Load on-demand (common tasks)
**Tier 3:** Load on explicit request (specialized)

**Configuration:** Set in `domain.json` (extensions) or `config.json` (projects)

---

## Component Schemas

**8 JSON Schemas:**
- `domain-schema.json` - Extension manifests
- `config-schema.json` - Project configuration
- `agent-schema.json` - Agent metadata
- `skill-schema.json` - Skill metadata
- `pattern-schema.json` - Pattern metadata
- `command-schema.json` - Command metadata
- `hook-schema.json` - Hook metadata
- `mcp-schema.json` - MCP server configuration

**Location:** `@core/schemas/`

---

## Quick Reference

**Load:** `/load skills|patterns|agents|workflows|all`
**Create:** `/pattern component_skill|component_pattern|component_agent|component_command`
**Diagnostics:** `/system-health` | `/cost-report` | `/agent-status`
**Dev Docs:** `/create-dev-docs` | `/update-dev-docs` | `/review-dev-docs` | `/resume-dev`
**Workflows:** `/workflow scout-plan-build` | `/background` | `/observe`
**Bundling:** `/bundle-create` | `/bundle-load`
**Generate:** `/generate [type] [name]`

---

## Core vs Extensions

**Core Contains:**
- Infrastructure agents (orchestrator, task-coordinator, task-implementer, demo-orchestrator)
- Meta patterns (component_*, compress_*, pre_creation_check)
- Workflow patterns (scout, plan, build, two-stage)
- Infrastructure commands (workflow, background, observe, cost-report, system-health, etc.)
- All hooks (lifecycle management)
- All utilities (matchers, parsers, validators, optimizers)
- Core documentation (architecture, standards, guides)
- JSON schemas (validation)
- Teaching infrastructure (script-following protocol)

**Extensions Contain:**
- Domain-specific agents
- Domain-specific skills
- Domain-specific patterns (content, strategy, analysis, optimization)
- Domain-specific commands
- Domain knowledge bases
- Teaching content (modules, datasets)
- Output styles
- MCP server configs (domain-specific)

**Projects Contain:**
- Configuration (`config.json`, `CLAUDE.md`)
- Composition of core + extensions
- Project-specific overrides
- Local customizations

---

## Migration from v4.2

**Breaking Changes:**
- File paths changed (`.claude/` → `core/infrastructure/` or `extensions/[name]/`)
- CLAUDE.md split into CORE.md (infrastructure) + DOMAIN.md (extensions)
- Extension system required for domain components

**Migration Strategy:**
- v4.2 remains unchanged during v5 development
- v5 built in parallel (`../marketing-agent-v5/`)
- Switchover only after comprehensive validation
- Rollback plan via v4.2 backup

---

## Version History

**v5.0 (2025-11-08)** - Core + Extensions architecture
- Separated core infrastructure from domain logic
- Extension system with auto-discovery
- 8 JSON schemas for validation
- Tiered loading system
- Enhanced dev docs workflow

**v4.2 (2025-11-01)** - Monolithic architecture
- Combined infrastructure + marketing
- 277 components in single structure
