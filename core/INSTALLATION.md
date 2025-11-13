# HAL-10K-Core Installation Guide

**Version:** 5.5.0
**Type:** Standalone Claude Code Infrastructure Workspace
**Purpose:** Infrastructure development and testing (no domain plugins)

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Git**: v2.30 or higher
- **Claude Code CLI**: Latest version

---

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:cpantus/hal-10k-core.git
cd hal-10k-core
```

### 2. Install Hook Dependencies

```bash
cd infrastructure/hooks
npm install
cd ../..
```

This installs TypeScript and dependencies needed for hooks to execute.

### 3. Verify Installation

```bash
# Test TypeScript compilation
npx tsx infrastructure/hooks/user-prompt-submit.ts --version

# Should output: Hook system initialized
```

---

## Environment Setup (Optional)

If you plan to use MCP servers or specific integrations:

```bash
# Create .env file (not tracked in git)
cp .env.example .env

# Edit .env with your API keys
```

**Note:** hal-10k-core includes only `playwright` MCP server by default (infrastructure utility).

---

## Verification

### Run System Health Check

```bash
# Start Claude Code in hal-10k-core directory
# Then run:
/system-health
```

**Expected Output:**
- ✅ All hooks functional
- ✅ 34 infrastructure commands available
- ✅ 6 agents loaded (including system-architect)
- ✅ 25 patterns available
- ✅ 3 infrastructure skills loaded

### Test Enhanced Planning

```bash
/plan-enhanced "design a new validation hook system"
```

**Expected Behavior:**
- Stage 1: Research-scout agents spawn
- Stage 2: System-architect creates proposal
- Stage 3: Validation report generated
- Stage 4: Implementation plan created

---

## Available Commands

hal-10k-core provides **34 infrastructure commands**:

### Workflow & Orchestration
- `/workflow scout-plan-build` - Full 3-stage workflow
- `/plan-enhanced` - 4-stage research-first planning
- `/research` - Spawn research agents
- `/background` - Launch background agents
- `/observe [id]` - Monitor agent progress
- `/cost-report` - View token usage

### Patterns & Components
- `/pattern [name]` - Execute workflow patterns
- `/generate` - Generate components from templates
- `/chain [pattern1] [pattern2]` - Chain pattern execution

### Development Workflow
- `/create-dev-docs [task]` - Start dev docs tracking
- `/update-dev-docs [task]` - Update dev docs
- `/resume-dev` - Resume most recent task
- `/review-dev-docs` - Review all active tasks

### System & Diagnostics
- `/system-health` - Full system diagnostic
- `/load [skills|patterns|agents|all]` - Load documentation
- `/prime [content|full]` - Prime context
- `/mcp-list` - List available MCP servers

### Plugin Management (Template)
- `/code-on` - Enable code plugin (example)
- `/code-off` - Disable code plugin (example)
- *(Adapt for your own plugins)*

---

## Usage Patterns

### Infrastructure Development

hal-10k-core is designed for developing and testing infrastructure components:

```bash
# Create a new hook
/pattern component_hook --name="pre-tool-use-commit"

# Test the hook
npx tsx infrastructure/hooks/pre-tool-use-commit.ts

# Validate all hooks
/system-health
```

### Pattern Development

```bash
# Create a new pattern
/pattern component_pattern --name="deployment_workflow"

# Test pattern execution
/pattern deployment_workflow --dry-run

# Validate pattern structure
./scripts/validate-component-counts.sh
```

### Agent Development

```bash
# Create a new agent
/pattern component_agent --name="code-optimizer"

# Test agent in enhanced planning
/plan-enhanced "optimize core infrastructure"
```

---

## Directory Structure

```
hal-10k-core/
├── .claude/                    # Claude Code workspace configuration
│   ├── settings.json          # Hooks, MCP servers, permissions
│   ├── CLAUDE.md              # Core behavior rules (v5.0.7)
│   ├── model-rules.json       # Model selection automation
│   ├── docs-index.json        # Auto-loading docs
│   ├── project.json           # Project metadata
│   └── commands/
│       └── infra/             # 34 infrastructure commands
├── infrastructure/
│   ├── agents/                # 6 core agents (+ system-architect)
│   ├── hooks/                 # 15 lifecycle hooks + utilities
│   ├── patterns/              # 25 patterns (meta + workflow + bundles)
│   ├── skills/                # 3 infrastructure skills
│   └── utils/                 # 26 utility modules
├── docs/                      # 17 documentation files
├── schemas/                   # JSON schemas (MCP, patterns)
├── scripts/                   # Helper scripts
├── tsconfig.json              # TypeScript configuration
├── .gitignore                 # Comprehensive ignore rules
├── README.md                  # Project overview
└── INSTALLATION.md            # This file
```

---

## Troubleshooting

### Hooks Not Executing

**Problem:** `/system-health` reports hook failures

**Solution:**
```bash
cd infrastructure/hooks
npm install
cd ../..
npx tsx infrastructure/hooks/user-prompt-submit.ts
```

### TypeScript Errors

**Problem:** `Cannot find module` errors

**Solution:**
```bash
# Verify tsconfig.json paths
cat tsconfig.json

# Reinstall dependencies
cd infrastructure/hooks
rm -rf node_modules package-lock.json
npm install
```

### Commands Not Found

**Problem:** `/plan-enhanced` not recognized

**Solution:**
```bash
# Verify commands directory
ls .claude/commands/infra/ | wc -l
# Should output: 34

# Check settings.json exists
test -f .claude/settings.json && echo "Settings found" || echo "Missing settings.json"
```

### MCP Server Errors

**Problem:** `playwright` server fails to start

**Solution:**
```bash
# Test MCP server manually
npx -y @modelcontextprotocol/server-playwright

# Check environment variables
echo $PLAYWRIGHT_API_KEY
```

---

## Development Workflow

### Making Infrastructure Changes

1. **Work directly in hal-10k-core:**
   ```bash
   cd ~/Work/hal-10k-core
   # Make changes to hooks, patterns, agents, etc.
   ```

2. **Test changes:**
   ```bash
   /system-health
   ./scripts/validate-component-counts.sh
   ```

3. **Commit and tag:**
   ```bash
   git add .
   git commit -m "feat: add new validation hook"
   git tag v5.6.0 -a -m "v5.6.0: Enhanced validation system"
   git push origin main --tags
   ```

4. **Update projects using this core:**
   ```bash
   # In each project (marketing-agent-v5, coding-agent, etc.)
   git submodule update --remote core
   git add core
   git commit -m "chore: update core to v5.6.0"
   git push
   ```

### Testing Before Propagation

Always test infrastructure changes in hal-10k-core before pushing:

```bash
# Test new hook
npx tsx infrastructure/hooks/new-hook.ts

# Test new pattern
/pattern new_pattern --dry-run

# Full system validation
/system-health
```

---

## Integration with Projects

hal-10k-core is designed to be used as a git submodule in projects:

```bash
# In a new project
git submodule add git@github.com:cpantus/hal-10k-core.git core

# Update to latest
git submodule update --remote core
```

See `SUBMODULE-WORKFLOW.md` in projects for complete workflow guide.

---

## Support & Contribution

**Repository:** https://github.com/cpantus/hal-10k-core
**Issues:** https://github.com/cpantus/hal-10k-core/issues
**Version:** 5.5.0
**Last Updated:** 2025-11-12

---

## Quick Reference

```bash
# Installation
git clone git@github.com:cpantus/hal-10k-core.git
cd hal-10k-core && cd infrastructure/hooks && npm install && cd ../..

# Verification
/system-health

# Test Enhanced Planning
/plan-enhanced "task description"

# Development
# Edit infrastructure components → Test → Commit → Tag → Push

# Update Projects
cd ~/Work/project-name
git submodule update --remote core
git add core && git commit -m "chore: update core"
```

---

**Remember:** hal-10k-core is infrastructure-only. No domain plugins included. Perfect for developing and testing core components before propagating to projects.
