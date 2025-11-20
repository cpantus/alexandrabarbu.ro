# Claude Code Infrastructure

**Version**: 5.0.7 **Updated**: 2025-11-12
**Architecture**: 2-Tier Hybrid (Core + Plugins)
**Domain Extensions**: Load via plugins
**MCP Standard**: Code execution pattern (96-98% token reduction)

## Core Principles

**CRITICAL: Behavior Definition Hierarchy**
1. **CLAUDE.md rules** - Primary behavior source (50-100 tokens per rule, always loaded)
2. **Hooks** - Enforce critical rules mechanically (validation, auto-correction)
3. **Patterns/Skills/Commands** - Execution details (loaded on-demand)

**Rule:** Define behavior in CLAUDE.md first, enforce via hook only if critical. Prefer lean solutions.
**Rule:** Document-first development - BEFORE implementing any component (hook, pattern, agent, skill, command), update relevant documentation FIRST. This prevents doc-reality gaps and ensures designs are validated before code is written.
**Rule:** MANDATORY use modern CLI tools (see CLI Tool Standards section) - `rg` not `grep`, `fd` not `find`, `bat` not `cat`, `exa` not `ls`. NO EXCEPTIONS including pipes (e.g., `git diff | rg` not `git diff | grep`). Applies to all contexts: main session, sub-agents, pattern execution. Enforced via `pre-tool-use-bash.ts` hook. Enable debug: `CC_BASH_OPT_DEBUG=1`.
**Rule:** Patterns have complexity-based enforcement (see Pattern Enforcement below). Simple patterns SUGGESTED, Medium/Complex patterns MANDATORY unless justified.
**Rule:** Skills have enforcement-based levels (v5.1.0). When skill auto-activates with `enforcement: "require"`, MUST read skill file before proceeding. Reading is NON-NEGOTIABLE - these skills prevent low-quality output. Execution BLOCKED until skill is read. Enforced via `user-prompt-submit.ts` hook.
**Rule:** MCP workflows MUST use code execution pattern when 3+ tool calls detected (see MCP Usage Standard below). Auto-detection hook suggests optimization, achieving 96-98% token reduction.
**Rule:** MUST update core submodule before making local modifications. Core provides infrastructure foundation (hooks, patterns, agents, skills); always sync to latest stable release before development work. Enforced via git pre-commit hook. See SUBMODULE-WORKFLOW.md for complete workflow.
**Rule:** Core changes MUST be committed to hal-10k-core repository first, never directly in project submodules (except emergency hotfixes with immediate upstream sync). Use `cd ~/Work/hal-10k-core` for infrastructure improvements, push to remote, then sync in projects: `cd core && git pull && cd .. && git add core && git commit`. Document all core updates with "CORE-SYNC:" prefix in CHANGELOG.md.

### Pattern Enforcement (Complexity-Based)

**Simple patterns (🟢 SUGGESTED):**
- Gentle recommendation, no justification required for bypass
- Examples: component_agent, component_pattern, compress_documentation

**Medium/Complex patterns (🔴 MANDATORY):**
- Strong enforcement, requires explicit justification for bypass
- Examples: campaign_launch, funnel_analysis, go_to_market, product_launch
- Bypass phrase: "Bypassing pattern because [reason]" + alternative approach + risk acknowledgment
- When bypassed: 🟡 Warning shown, quality gates NOT enforced, user responsible

**Pattern-Appropriate:** Domain-specific tasks (defined by loaded plugins) | Meta (validation, component creation, system health)

**Pattern Invocation:** ✅ Hook suggests → `/pattern [name] [args]` → Pattern executes | ✅ Pattern exists → Use `/pattern [name]` | ❌ Ignore or manual implementation (VIOLATION for medium/complex - requires explicit justification) | ❌ Read pattern file → Implement manually (bypasses enforcement)

**CRITICAL:** Pattern files are delegatable systems, NOT documentation. Ignoring MANDATORY pattern suggestions violates core architecture principles unless explicitly justified.


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

## CLI Tool Standards (MANDATORY)
**CRITICAL:** MUST use modern CLI tools. **See:** `core/docs/cli-tool-standards.md`

---

## Skills System
**See:** `core/docs/skills-system.md` for auto-activation, structure, and configuration

---

## Pattern System
**See:** `core/docs/pattern-system.md` for pattern structure, auto-suggest, chaining, and creation guidelines. Meta patterns (~10) for component creation and validation are infrastructure-level; domain patterns are provided by plugins.

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
- Skills: Directory `kebab-case`, file MUST be `SKILL.md` (MANDATORY - violations blocked per Anthropic standard)
- Patterns (execution): `snake_case` (e.g., `campaign_launch.md`) (MANDATORY - violations blocked)
- Patterns (output templates): `kebab-case` (e.g., `campaign-brief.md`)

**File Structure:**
- Skills: `.claude/skills/[skill-name]/SKILL.md` (with optional `/resources/` subdirectory)
- Patterns: `.claude/patterns/[category]/[name].md`
- Agents: `.claude/agents/[name].md`
- Commands: `.claude/commands/[name].md`
- Hooks: `.claude/hooks/[name].ts`

**Validation:** Meta-patterns (`/pattern component_[type]`) before production | Naming enforcement automatic

**CLI Compliance:** Use modern tools (see CLI Tool Standards) | Monitor: `CC_BASH_OPT_DEBUG=1`

**Permissions:** `settings.json` → `permissions.allowedCommands` + `permissions.deny` | Explicit | Careful wildcards | Document

### Security Standards

**Deny Rules Enforced (v5.0.3):**
- **Environment files:** .env*, *.env, .env.* (read/write blocked)
- **SSH credentials:** ~/.ssh/* (read/write blocked)
- **AWS credentials:** ~/.aws/* (read/write blocked)
- **Private keys:** *.key, *.pem (read/write blocked)
- **Production configs:** *.prod.*, *.config.production.* (read/write blocked)
- **Destructive operations:** rm -rf, rm -r, sudo (blocked)
- **Network operations:** curl, wget, nc (blocked without approval)
- **Git destructive:** git reset --hard, git push --force, git push -f (blocked)
- **Package management:** package.json, package-lock.json, yarn.lock, requirements.txt (write blocked)
- **System files:** /etc/*, /root/* (read/write blocked)

**Rule:** Never bypass security denials without explicit user approval.
**Rule:** All sensitive operations require user confirmation.
**Audit:** Quarterly review (last: 2025-11-11, next: 2026-02-11)

### CRITICAL: Extend vs Create
**BEFORE creating:** 1. Search existing 2. Identify extension points 3. Default EXTEND 4. Verify uniqueness

**Examples:** ❌ CLI hook → pre-tool-use-bash.ts exists | ✅ Add jq/yq → Extends | ❌ Social skill → Check content/growth | ✅ Quantum → New

**Points:** Hooks (bash-optimizer rules) | Patterns (categories) | Skills (resources, triggers) | **Flags:** 2nd hook same event | >70% overlap

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

**See:** `infrastructure/skills/mcp-code-execution.md` for complete guide

---

## Plugin System

**Architecture:**
- **Infrastructure:** `.claude/` (domain-agnostic, reusable across clients)
- **Plugins:** `*/plugins/*` or `*-plugin/` (domain-specific, client-customizable, **opt-in via env vars**)
- **Separation:** Clean boundaries, plugin visibility control, configuration inheritance

**Plugin Toggle (v5.0.5):**
- **Default:** All plugins DISABLED (infrastructure-only mode)
- **In-Session Toggle:** `/marketing-on` | `/marketing-off` (no restart needed)
- **Persistent Toggle:** `export MARKETING_PLUGIN_ENABLED=1` (add to `~/.bashrc`)
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
- Marketing Agent Plugin: `marketing-plugin/` (13 agents, 42 patterns, 8 skills, 49 commands)
- Custom Domain: Create your own plugin following the same structure

**See:** `PLUGIN-USAGE.md` for detailed usage guide | Plugin documentation in each plugin directory

---

## Quick Reference
**Core Sync:** `cd core && git pull && cd .. && git add core` | Check: `git submodule status` | Enforced: git pre-commit hook
**Plugins:** `/marketing-on` | `/marketing-off` to toggle (or `export MARKETING_PLUGIN_ENABLED=1`)
**Load:** `/load skills|patterns|agents|workflows|orchestrator|devdocs|all`
**Create:** `/pattern component_skill|component_pattern|component_agent|component_command`
**Diagnostics:** `/system-health` | `/cost-report` | `/agent-status`
**MCP:** Use code execution pattern for 3+ tool workflows (96-98% token reduction)
