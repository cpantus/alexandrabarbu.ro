# Claude Code Core Infrastructure

**Version:** 5.5.0
**Status:** Production
**License:** MIT
**Usage:** Standalone Workspace OR Git Submodule

Shared core infrastructure for Claude Code projects - domain-agnostic, reusable, production-grade.

**NEW in v5.5.0:** Can be used as a standalone Claude Code workspace for infrastructure development!

## Overview

This repository contains the **core infrastructure layer** for Claude Code implementations. It provides:

- 🤖 **Agents** - Specialized agents for research, planning, building, and orchestration
- 📋 **Patterns** - Execution templates with quality gates and validation
- 🧠 **Skills** - Auto-activated knowledge modules
- 🪝 **Hooks** - Lifecycle event handlers for validation and automation
- 📚 **Documentation** - System guides and reference materials
- 🔧 **Utilities** - Shared tooling and validation logic

**Design Philosophy:**
- **Domain-agnostic** - Works for any client/industry (marketing, development, etc.)
- **Plugin-extensible** - Domain-specific components live in plugins
- **Token-optimized** - Progressive loading, caching, minimal overhead
- **Production-ready** - Tested, validated, with quality gates

---

## Quick Start

### Option 1: Standalone Workspace (NEW in v5.5.0)

Use hal-10k-core as a complete Claude Code workspace for infrastructure development:

```bash
git clone git@github.com:cpantus/hal-10k-core.git
cd hal-10k-core
cd infrastructure/hooks && npm install && cd ../..

# Start using Claude Code - all 34 infrastructure commands available!
# /system-health, /plan-enhanced, /workflow, etc.
```

See `INSTALLATION.md` for complete setup guide.

### Option 2: As a Git Submodule (Traditional)

Use this core as a git submodule in your domain-specific project:

```bash
# In your project directory
git submodule add git@github.com:cpantus/hal-10k-core.git core
git submodule update --init --recursive

# Your project structure
your-project/
├── core/                    # ← This repository (submodule)
├── plugins/                 # Your domain-specific components
│   └── marketing-plugin/
├── .claude/
│   ├── settings.json       # Points to core/ for infrastructure
│   └── CLAUDE.md           # Your project configuration
└── README.md
```

### Updating the Submodule

```bash
# Pull latest core updates
cd core
git pull origin main
cd ..
git add core
git commit -m "chore: update core to latest version"
```

---

## What's Included

### 📁 Directory Structure

```
hal-10k-core/
├── CORE.md                         # Core infrastructure documentation
├── README.md                       # This file
├── docs/                           # System documentation (6 files)
│   ├── README.md                   # Documentation index
│   ├── agent-orchestration.md     # Agent coordination patterns
│   ├── cli-tool-standards.md      # CLI tool compliance guide
│   ├── hook-architecture.md       # Hook system design
│   ├── pattern-system.md          # Pattern execution framework
│   ├── skills-system.md           # Skill auto-activation
│   └── workflow-system.md         # Scout/Plan/Build workflows
├── infrastructure/
│   ├── agents/                    # 5 core agents
│   │   ├── orchestrator.md
│   │   ├── task-coordinator.md
│   │   ├── task-implementer.md
│   │   ├── research-scout.md
│   │   └── demo-personalize.md
│   ├── hooks/                     # 13 lifecycle hooks
│   │   ├── user-prompt-submit.ts
│   │   ├── pre-tool-use-bash.ts
│   │   ├── pre-tool-use-write.ts
│   │   ├── suggest-research.ts
│   │   └── utils/                 # Shared hook utilities
│   ├── patterns/                  # Execution templates
│   │   ├── meta/                  # 8 component creation patterns
│   │   ├── workflow/              # 9 workflow patterns
│   │   ├── bundles/               # 4 pattern bundles
│   │   └── pattern-index.json     # Pattern metadata
│   ├── skills/                    # 3 core skills
│   │   ├── research-integration.md
│   │   ├── mcp-code-execution.md
│   │   └── teaching-system.md
│   └── commands/                  # 25 infrastructure commands
│       └── infra/
└── schemas/                       # Validation schemas
    ├── mcp-schema.json
    └── pattern-schema.json
```

### 🤖 Agents (6 Core)

**General Purpose:**
- `orchestrator.md` - Multi-agent coordination
- `task-coordinator.md` - Task planning and breakdown
- `task-implementer.md` - Code implementation
- `system-architect.md` - **NEW v5.5.0** - Architecture design (universal, not coding-specific)

**Specialized:**
- `research-scout.md` - External knowledge gathering (WebSearch, Context7 MCP)
- `demo-personalize.md` - Demo customization

### 📋 Patterns (21 Core)

**Meta Patterns (8)** - Component creation with quality gates:
- `component_agent` - Create new agents
- `component_pattern` - Create new patterns
- `component_skill` - Create new skills
- `component_command` - Create new commands
- `component_hook` - Create new hooks
- `component_workflow` - Create new workflows
- `component_resource` - Create new resources
- `component_mcp_server` - Create MCP server wrappers

**Workflow Patterns (9)** - Multi-stage execution:
- `scout_workflow` - Research phase
- `plan_workflow` - Planning phase
- `build_workflow` - Implementation phase
- `enhanced_planning` - Research-first comprehensive planning
- `research_query` - Standalone research
- `research_best_practices` - Best practices lookup
- `research_comparison` - Technology comparison
- `two_stage_content_sonnet_sonnet` - Two-stage content generation
- `two_stage_content_sonnet_haiku` - Cost-optimized two-stage

**Bundles (4)** - Quick reference collections:
- `analysis_bundle` - Data analysis patterns
- `content_bundle` - Content creation patterns
- `optimization_bundle` - Performance patterns
- `strategy_bundle` - Strategic planning patterns

### 🧠 Skills (3 Core)

Auto-activated knowledge modules:
- `research-integration.md` - Research Scout capabilities and integration
- `mcp-code-execution.md` - MCP code execution pattern (96-98% token reduction)
- `teaching-system.md` - Teaching mode and learning patterns

### 🪝 Hooks (13 Core)

Lifecycle event handlers:
- `user-prompt-submit.ts` - Auto-activate skills/patterns/docs
- `pre-tool-use-bash.ts` - **ENFORCE** CLI tool standards
- `pre-tool-use-write.ts` - **ENFORCE** naming standards (kebab-case)
- `pre-tool-use-edit.ts` - Track modifications
- `post-tool-use-edit.ts` - Bundle log tracking
- `post-tool-use-pattern.ts` - Validate pattern stage completion
- `session-start-command-links.ts` - Dynamic command symlink management
- `stop-event.ts` - Error checking and cleanup
- `background-agent.ts` - Background agent orchestration
- `agent-telemetry.ts` - Cost tracking and observability
- `context-bundle.ts` - Context persistence
- `suggest-research.ts` - Suggest research for knowledge gaps
- `detect-mcp-opportunity.ts` - Detect MCP optimization opportunities

**Hook Utilities:**
- `skill-matcher.ts` - Match skills to prompts
- `pattern-matcher.ts` - Match patterns to prompts
- `docs-matcher.ts` - Match documentation to prompts
- `mode-detector.ts` - Detect teaching vs production mode
- `plugin-state.ts` - Plugin enable/disable detection
- `bash-optimizer.ts` - CLI tool validation/correction
- `component-consistency-validator.ts` - Component validation
- `mcp-detector.ts` - MCP pattern detection

---

## Integration Guide

### 1. Add as Submodule

```bash
cd your-project
git submodule add git@github.com:cpantus/hal-10k-core.git core
```

### 2. Configure settings.json

Point your Claude Code settings to the core infrastructure:

```json
{
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{
        "type": "command",
        "command": "npx tsx core/infrastructure/hooks/user-prompt-submit.ts"
      }]
    }],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "npx tsx core/infrastructure/hooks/pre-tool-use-bash.ts"
        }]
      },
      {
        "matcher": "Write",
        "hooks": [{
          "type": "command",
          "command": "npx tsx core/infrastructure/hooks/pre-tool-use-write.ts"
        }]
      }
    ]
  }
}
```

### 3. Reference in CLAUDE.md

```markdown
# Your Project Configuration

**Core Infrastructure:** git@github.com:cpantus/hal-10k-core.git (v5.4.0)

## Architecture

**2-Tier Hybrid:**
- **Core** (`core/`) - Shared infrastructure (this repository)
- **Plugin** (`plugins/`) - Domain-specific components

Core provides agents, patterns, skills, hooks.
Plugin extends with domain-specific implementations.
```

### 4. Create Plugin Structure

```bash
mkdir -p plugins/your-plugin/{agents,patterns,skills,commands,hooks}
```

---

## Version History

### v5.5.0 (2025-11-12) - Current

**Major Features:**
- **Standalone Workspace Capability** - Can now be used as a complete Claude Code workspace for infrastructure development
- **system-architect Agent Promoted to Core** - Architecture design now universal (was coding-plugin-specific)
- **Complete .claude/ Directory** - Full Claude Code configuration (settings, commands, docs)
- **Enhanced Planning Self-Contained** - /plan-enhanced now fully functional without plugin dependencies

**Infrastructure:**
- 34 infrastructure commands (was 25)
- Complete hooks configuration (15 hooks)
- MCP server configuration (playwright for infrastructure)
- Project metadata and documentation system

**New Files:**
- `INSTALLATION.md` - Standalone setup guide
- `.claude/settings.json` - Hook and MCP configuration
- `.claude/CLAUDE.md` - Core behavior rules (v5.0.7)
- `.claude/commands/infra/` - 34 command files
- `tsconfig.json`, scripts, comprehensive .gitignore

**Components:**
- 6 core agents (added system-architect)
- 25 core patterns
- 3 core skills
- 15 lifecycle hooks
- 34 infrastructure commands

### v5.4.0 (2025-11-12)

**Features:**
- Research Scout agent with Context7 MCP integration
- Enhanced pattern filtering (minConfidence, negativeKeywords)
- Research integration in workflow patterns
- MCP code execution pattern (96-98% token reduction)
- Pattern stage validation hook

### Previous Versions

See `CHANGELOG.md` (coming soon) for full version history.

---

## Development

### Running Tests

```bash
# Validate all components
./core/infrastructure/hooks/utils/component-consistency-validator.ts

# Test pattern execution
/pattern component_pattern --name="test-pattern"

# Check hook functionality
npx tsx core/infrastructure/hooks/user-prompt-submit.ts
```

### Making Changes

**When to modify core vs plugin:**

| Change Type | Location | Reason |
|-------------|----------|--------|
| Generic agent/pattern | Core | Reusable across domains |
| Domain-specific agent | Plugin | Marketing, sales, etc. |
| Validation hook | Core | Quality enforcement |
| Trigger keywords | Plugin | Domain vocabulary |
| Documentation | Core | System architecture |
| Examples | Plugin | Domain use cases |

**Pull Request Process:**
1. Create feature branch
2. Make changes
3. Test with multiple projects
4. Update documentation
5. Submit PR with description

---

## Contributing

Contributions welcome! Please:

1. Follow existing patterns and conventions
2. Test with multiple use cases
3. Update documentation
4. Add examples where helpful
5. Keep components domain-agnostic

**Style Guide:**
- Agents/commands/hooks: `kebab-case.ts`
- Patterns (execution): `snake_case.md`
- Patterns (output): `kebab-case.md`
- Skills: `kebab-case.md`

---

## Support

**Issues:** https://github.com/cpantus/hal-10k-core/issues
**Discussions:** https://github.com/cpantus/hal-10k-core/discussions
**Documentation:** See `docs/` directory

---

## License

MIT License - See LICENSE file for details

---

## Projects Using This Core

- Marketing Agent v5 - https://github.com/cpantus/marketing-agent-v5
- Coding Agent - (internal)

*Add your project here via PR!*

---

**Maintained by:** @cpantus
**Last Updated:** 2025-11-12
**Status:** ✅ Production Ready
