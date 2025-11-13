# Claude Code Infrastructure Setup

**Version**: 5.1.0 | **Date**: 2025-11-13
**Type**: Hugo Static Site with AI Development Infrastructure

---

## Overview

This project uses Claude Code infrastructure for AI-assisted development. The infrastructure provides:
- **Hooks**: Automated validation and enforcement (CLI tools, naming standards, security)
- **Patterns**: Execution templates for common tasks
- **Skills**: Knowledge documents that auto-activate based on context
- **Agents**: Specialized sub-agents for complex workflows
- **Commands**: 34+ infrastructure commands for development workflows
- **Dev Docs**: Session persistence system (95%+ context recovery)

---

## Directory Structure

```
/home/cere/Work/alex/alexandrabarbu.ro/
├── .gitignore                    # CRITICAL: Ignores .claude/ and core/
├── .claude/                      # Infrastructure - GITIGNORED
│   ├── CLAUDE.md                 # Project-level infrastructure rules
│   ├── settings.json             # Hooks, MCP servers, permissions
│   ├── model-rules.json          # Model selection rules
│   ├── skill-rules.json          # Skill auto-activation config
│   └── commands/
│       └── infra/                # 34 infrastructure commands
├── core/                         # Core infrastructure - GITIGNORED
│   └── infrastructure/
│       ├── hooks/                # TypeScript hooks (lifecycle automation)
│       ├── patterns/             # Execution templates
│       ├── skills/               # Knowledge documents
│       ├── agents/               # Sub-agents
│       └── resources/            # Reference documentation
├── dev/                          # Dev docs (optional: can commit for team)
│   └── active/
│       └── refactor-atomic-design/
│           ├── OVERVIEW.md       # Task overview
│           ├── PROGRESS.md       # Progress tracker
│           └── CONTEXT.md        # Technical context
├── themes/
│   └── andromeda-hugo/           # Hugo theme
│       ├── CLAUDE.md             # Theme-specific rules (COMMIT THIS)
│       ├── PROJECT.md            # Architecture docs (COMMIT THIS)
│       ├── REFACTOR-PLAN-v2.md   # Refactor plan (COMMIT THIS)
│       └── cc-hugo-audit.md      # Audit report (COMMIT THIS)
├── content/                      # Hugo content
├── static/                       # Static assets
└── config/                       # Hugo configuration
```

---

## What Gets Committed vs Ignored

### ✅ COMMIT (Project-specific documentation)
- `themes/andromeda-hugo/CLAUDE.md` - Theme development rules
- `themes/andromeda-hugo/PROJECT.md` - Architecture documentation
- `themes/andromeda-hugo/REFACTOR-PLAN-v2.md` - Refactor plan
- `themes/andromeda-hugo/cc-hugo-audit.md` - Audit report
- `themes/andromeda-hugo/LAYOUT_MIXING_GUIDE.md` - Usage guide
- `PROJECT-SETUP.md` - This file
- `dev/` - **Optional**: Can commit for team visibility into progress

### ❌ GITIGNORE (Infrastructure - Local tooling only)
- `.claude/` - Entire directory (hooks, commands, settings, skills, patterns)
- `core/` - Core infrastructure (31MB)

**Rationale**: Infrastructure is local development tooling, not part of project deliverables. Theme documentation is valuable project knowledge that should be versioned.

---

## Available Commands

Infrastructure provides 34+ commands. Key commands:

### Workflow & Task Management
- `/workflow scout-plan-build "task"` - Full Scout → Plan → Build workflow
- `/create-dev-docs [task]` - Create dev docs for multi-session work
- `/resume-dev` - Resume most recent task automatically (95%+ context recovery)
- `/update-dev-docs [task]` - Manually update dev docs if needed
- `/review-dev-docs` - Review all active tasks

### Documentation Loading
- `/load skills` - Load skills reference
- `/load patterns` - Load patterns reference
- `/load agents` - Load agents reference
- `/load workflows` - Load workflow system
- `/load all` - Load all reference documentation

### Diagnostics & Monitoring
- `/system-health` - Check infrastructure status
- `/cost-report` - Cost tracking and analysis
- `/agent-status` - Background agent status

---

## Key Features

### 1. Automated Validation (Hooks)
**Active hooks** enforce:
- **CLI tool standards**: `rg` not `grep`, `fd` not `find`, `exa` not `ls` (MANDATORY)
- **Naming standards**: kebab-case for agents/commands, snake_case for patterns (BLOCKING)
- **Security**: Blocks access to .env, SSH keys, production configs
- **Pattern enforcement**: Simple patterns SUGGESTED, complex patterns MANDATORY

### 2. Skill Auto-Activation
Skills automatically load based on prompt keywords:
- **MCP code execution**: Activates when 3+ MCP tool calls detected (96-98% token reduction)
- **Hugo development**: Activates on theme-related keywords
- **Design systems**: Activates for UI/UX work

### 3. Dev Docs System (95%+ Context Recovery)
For tasks >2 hours or multi-session work:

```bash
/create-dev-docs [task-name]  # Creates dev/active/[task]/
                              # - OVERVIEW.md (goals, decisions, references)
                              # - PROGRESS.md (task tracker with checkboxes)
                              # - CONTEXT.md (technical details, resume commands)

/resume-dev                   # Auto-resumes most recent task
                              # Loads all context automatically
```

**Structure**: `dev/active/[task]/` → `OVERVIEW.md | PROGRESS.md | CONTEXT.md`

### 4. Pattern System
Execution templates for common tasks:
- **Meta patterns**: Component creation (agents, skills, patterns, commands)
- **Workflow patterns**: Scout/Plan/Build, background agents
- **Validation patterns**: System health, component validation

### 5. Cost Optimization
- **Model selection**: haiku for simple tasks, sonnet for strategic work
- **Progressive loading**: Skills load on-demand (84% token reduction)
- **Prompt caching**: Agents >15K tokens must implement caching
- **Tracking**: `/cost-report` for detailed cost analysis

---

## Usage Examples

### Starting New Work
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro

# Option 1: Simple task
# Just start working, infrastructure auto-activates

# Option 2: Complex/multi-session task
/create-dev-docs button-atom-extraction
# Work on task...
# Context automatically saved
```

### Resuming Work (After Session Ends)
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro

# Automatic resume (RECOMMENDED)
/resume-dev
# Loads most recent task with 95%+ context recovery

# Manual resume
# Say: "Resume Hugo refactor, read dev/active/refactor-atomic-design/PROGRESS.md"
```

### Hugo Development
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro

# Check current refactor status
/resume-dev

# Load Hugo-specific documentation
/load skills

# Run Hugo server
cd themes/andromeda-hugo
hugo server --buildDrafts

# Performance monitoring
hugo --templateMetrics --templateMetricsHints
```

---

## Hugo-Specific Context

### Current Work
**Active task**: Atomic design system refactor
- **Plan**: `themes/andromeda-hugo/REFACTOR-PLAN-v2.md` (12 weeks, 130 hours)
- **Progress**: `dev/active/refactor-atomic-design/PROGRESS.md`
- **Status**: Ready to start Phase 1 (Atomic Components)

### Theme Details
- **Name**: Andromeda
- **Purpose**: Psychology practice website
- **Hugo version**: v0.148.1 extended
- **Languages**: Romanian (RO), English (EN), French (FR)
- **Current state**: 40% modern (flexible layout + 16 sections), 60% legacy

### Performance Targets
- Build time: <3s
- Page weight: <500KB
- Image assets: <2MB
- CSS bundle: <50KB (gzipped)

---

## Configuration Files

### .claude/settings.json
Defines:
- **mcpServers**: Playwright for UI testing
- **hooks**: Lifecycle automation (UserPromptSubmit, PreToolUse, PostToolUse, Stop, SessionStart, SessionEnd)
- **permissions**: Allowed/denied commands and file access
- **settings**: Auto-format markdown, use Obsidian links, etc.

### .claude/model-rules.json
Model selection based on task type:
- Simple tasks → haiku
- Strategic/refactoring → sonnet
- Complex planning → sonnet + think-hard

### .claude/skill-rules.json
Auto-activation triggers for skills:
- Keywords match → skill loads automatically
- Enforcement levels: "suggest", "warn", "require"

---

## Security

### Protected Files (Cannot Read/Write)
- Environment files (`.env*`, `*.env`)
- SSH credentials (`~/.ssh/*`)
- Private keys (`*.key`, `*.pem`)
- AWS credentials (`~/.aws/*`)
- Production configs (`*.prod.*`)

### Blocked Commands
- Destructive: `rm -rf`, `sudo`
- Network: `curl`, `wget`, `nc`
- Git destructive: `git push --force`, `git reset --hard`
- Package managers: Cannot modify `package.json`, `yarn.lock`, etc.

---

## Troubleshooting

### Infrastructure not working
```bash
# Check infrastructure exists
ls -la /home/cere/Work/alex/alexandrabarbu.ro/.claude/
ls -la /home/cere/Work/alex/alexandrabarbu.ro/core/

# Verify git ignore
git status  # Should NOT show .claude/ or core/
```

### Commands not found
```bash
# Verify command directory
ls /home/cere/Work/alex/alexandrabarbu.ro/.claude/commands/infra/
# Should show 34 command files
```

### Hooks not running
Check `.claude/settings.json` hooks configuration. All hooks use:
```bash
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" && npx tsx core/infrastructure/hooks/[hook-name].ts
```

### Session recovery issues
```bash
# Manual resume
cd /home/cere/Work/alex/alexandrabarbu.ro
# Say: "Read dev/active/refactor-atomic-design/PROGRESS.md and continue from checkpoint"
```

---

## Resources

### Documentation
- **Infrastructure rules**: `.claude/CLAUDE.md`
- **Theme rules**: `themes/andromeda-hugo/CLAUDE.md`
- **Refactor plan**: `themes/andromeda-hugo/REFACTOR-PLAN-v2.md`
- **Core docs**: `core/infrastructure/docs/`

### External Resources
- Hugo docs: https://gohugo.io
- Claude Code docs: https://code.claude.com
- Atomic Design: https://atomicdesign.bradfrost.com

---

## Important Notes

1. **Never commit** `.claude/` or `core/` - they are local tooling only
2. **Do commit** theme-specific documentation (REFACTOR-PLAN-v2.md, PROJECT.md, etc.)
3. **Use /resume-dev** for seamless session recovery (95%+ context)
4. **Modern CLI tools** are MANDATORY (rg, fd, exa, bat) - enforced by hooks
5. **Create dev docs** for tasks >2 hours or multi-session work
6. **Infrastructure is Hugo-agnostic** - can be used for any project type

---

## Setup Complete ✅

Infrastructure is now fully operational. To start working:

```bash
cd /home/cere/Work/alex/alexandrabarbu.ro
/resume-dev
```

This will automatically load the refactor task and you can begin Phase 1 of the atomic design system implementation.
