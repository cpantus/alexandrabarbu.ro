# Claude Code Infrastructure - Alexandra's Hugo Site

**Version**: 5.1.0 | **Date**: 2025-11-13
**Type**: Hugo Static Site (Psychology Practice)
**Theme**: Andromeda (themes/andromeda-hugo/)
**Architecture**: Core Infrastructure + Hugo Theme

---

## Core Principles

**CRITICAL: Behavior Definition Hierarchy**
1. **CLAUDE.md rules** - Primary behavior source (50-100 tokens per rule, always loaded)
2. **Hooks** - Enforce critical rules mechanically (validation, auto-correction)
3. **Patterns/Skills/Commands** - Execution details (loaded on-demand)

**Rule:** Define behavior in CLAUDE.md first, enforce via hook only if critical. Prefer lean solutions.
**Rule:** Document-first development - BEFORE implementing any component (hook, pattern, agent, skill, command), update relevant documentation FIRST.
**Rule:** MANDATORY use modern CLI tools - `rg` not `grep`, `fd` not `find`, `bat` not `cat`, `exa` not `ls`. NO EXCEPTIONS. Enforced via `pre-tool-use-bash.ts` hook. Enable debug: `CC_BASH_OPT_DEBUG=1`.
**Rule:** Skills have enforcement-based levels (v5.1.0). When skill auto-activates with `enforcement: "require"`, MUST read skill file before proceeding.
**Rule:** MCP workflows MUST use code execution pattern when 3+ tool calls detected (96-98% token reduction).

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

**Infrastructure commands**: `.claude/commands/infra/` (~34 files)

**Examples**:
- `/workflow scout-plan-build` - Scout → Plan → Build workflow
- `/system-health` - Infrastructure diagnostics
- `/cost-report` - Cost tracking and analysis
- `/create-dev-docs [task]` - Create development docs for multi-session work
- `/resume-dev` - Resume most recent task automatically

---

## CLI Tool Standards (MANDATORY)

**MUST use modern CLI tools:**
- `rg` not `grep`
- `fd` not `find`
- `bat` not `cat`
- `exa` not `ls`
- `jq` for JSON processing
- `yq` for YAML processing

**Enforced via** `pre-tool-use-bash.ts` hook with auto-correction.

---

## Dev Docs System

**Persistence (95%+)**: For tasks >2h, complex, or multi-session:

```bash
/create-dev-docs [task-name]  # Creates dev/active/[task]/
/resume-dev                    # Auto-resumes most recent task
/update-dev-docs [task]        # Manual update if needed
/review-dev-docs               # Review all active tasks
```

**Structure**: `dev/active/[task]/` → `OVERVIEW.md | PROGRESS.md | CONTEXT.md`

---

## Hook Architecture

**Lifecycle events**:
- UserPromptSubmit - Auto-activate skills/patterns/docs
- PreToolUse - Validation before tool execution
- PostToolUse - Tracking, cleanup after execution
- Stop - Error handling, state preservation
- SessionStart/SessionEnd - Initialization, teardown

**Active hooks**:
- `user-prompt-submit.ts` - Auto-activation, skill enforcement
- `pre-tool-use-bash.ts` - CLI tool enforcement
- `pre-tool-use-write.ts` - Naming standards enforcement
- `pre-tool-use-edit.ts` - File modification tracking
- `post-tool-use-edit.ts` - Bundle log tracking
- `post-tool-use-pattern.ts` - Pattern validation
- `stop-event.ts` - Error checking
- `detect-mcp-opportunity.ts` - MCP optimization

---

## Quality Standards

**Naming (ENFORCED)**:
- Agents/commands/hooks: `kebab-case` (MANDATORY - violations blocked)
- Skills: `kebab-case` (MANDATORY - violations blocked)
- Patterns (execution): `snake_case` (e.g., `campaign_launch.md`) (MANDATORY - violations blocked)

**File Structure**:
- `.claude/skills/[name].md`
- `.claude/patterns/[category]/[name].md`
- `.claude/agents/[name].md`
- `.claude/commands/[name].md`
- `.claude/hooks/[name].ts`

---

## Cost Optimization

**Model selection**:
- Compress/summarize → haiku
- Refactor/strategic → sonnet
- Complex planning → sonnet + think-hard

**Progressive loading**:
- Skills → on-demand resources (84% reduction)
- Docs → auto-load based on triggers
- Patterns → load dependencies only

**Tracking**: `/cost-report` for agent cost analysis

---

## Security Standards

**Deny rules enforced** (v5.0.3):
- Environment files (.env*, *.env)
- SSH credentials (~/.ssh/*)
- Private keys (*.key, *.pem)
- Production configs (*.prod.*)
- Destructive operations (rm -rf, sudo)
- Git destructive (git push --force)

**Rule**: Never bypass security denials without explicit user approval.

---

## Hugo-Specific Guidelines

### Development Commands
```bash
hugo server --buildDrafts          # Local development
hugo --gc --minify                 # Production build
hugo --templateMetrics             # Performance monitoring
```

### Theme Development
- Work from theme directory: `themes/andromeda-hugo/`
- Follow refactor plan: `REFACTOR-PLAN-v2.md`
- Test multilingual (RO/EN)
- Verify responsive design

### Image Optimization
- Use Hugo's native image processing
- Generate WebP with fallbacks
- Create responsive srcset
- Implement lazy-loading

### Performance Targets
- Build time: <3s
- Page weight: <500KB
- Image assets: <2MB
- CSS bundle: <50KB (gzipped)

---

## Quick Reference

**Load documentation**:
```bash
/load skills          # Load skills reference
/load patterns        # Load patterns reference
/load agents          # Load agents reference
/load workflows       # Load workflow system
/load all             # Load all references
```

**Development workflow**:
```bash
/create-dev-docs [task]              # Start new task
/resume-dev                          # Continue work
/workflow scout-plan-build "task"    # Full workflow
```

**Diagnostics**:
```bash
/system-health        # Check infrastructure
/cost-report          # Cost analysis
/review-dev-docs      # Review active tasks
```

**Hugo-specific**:
```bash
cd themes/andromeda-hugo   # Theme development
hugo server                # Local preview
hugo --templateMetrics     # Performance check
```

---

## Git Workflow

**CRITICAL**: Never commit infrastructure files:
- `.claude/` - GITIGNORED
- `core/` - GITIGNORED
- `dev/` - Optional (can commit for team visibility)

**DO commit** (theme-specific docs):
- `themes/andromeda-hugo/CLAUDE.md`
- `themes/andromeda-hugo/PROJECT.md`
- `themes/andromeda-hugo/REFACTOR-PLAN-v2.md`
- `themes/andromeda-hugo/cc-hugo-audit.md`

---

## Session Recovery

**To resume in new session**:
```
cd /home/cere/Work/alex/alexandrabarbu.ro
/resume-dev
```

This automatically loads the most recent task with 95%+ context recovery.

**Manual resume**:
```
Read dev/active/refactor-atomic-design/PROGRESS.md
Continue from current checkpoint
```

---

## Resources

**Infrastructure**: See `core/infrastructure/` for:
- `docs/` - System documentation
- `hooks/` - Lifecycle hooks
- `patterns/` - Execution templates
- `skills/` - Knowledge documents
- `agents/` - Sub-agents

**Hugo resources**:
- Hugo docs: https://gohugo.io
- Theme docs: `themes/andromeda-hugo/`
- Current refactor: `themes/andromeda-hugo/REFACTOR-PLAN-v2.md`
