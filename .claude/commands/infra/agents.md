# Agents Command

🤖 Manage agents through an interactive command interface with file-based discovery.

## Purpose

Interactive command for managing agent definitions - list, create, edit, delete, and validate agents discovered from the filesystem (project, user, and plugin agents).

## Usage

```bash
/agents                      # Interactive mode (shows menu)
/agents list                 # List all discovered agents
/agents create [name]        # Create new agent interactively
/agents edit [name]          # Edit existing agent
/agents delete [name]        # Delete agent (with confirmation)
/agents validate [name]      # Validate agent YAML frontmatter
```

## Subcommands

### list
Display all agents discovered from filesystem with their configuration.

```bash
/agents list
/agents list --source project    # Only project agents
/agents list --source user       # Only user agents
/agents list --source plugin     # Only plugin agents
/agents list --format table      # Table format (default)
/agents list --format json       # JSON format
```

**Output:**
```
🤖 DISCOVERED AGENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECT AGENTS (7)
┌─────────────────────────────────┬──────────┬─────────┬───────────────────────────────────┐
│ Name                            │ Model    │ Timeout │ Description                       │
├─────────────────────────────────┼──────────┼─────────┼───────────────────────────────────┤
│ orchestrator                    │ sonnet   │ 60 min  │ Coordinate multi-agent workflows  │
│ task-coordinator                │ sonnet   │ 45 min  │ Break down complex tasks          │
│ research-scout                  │ haiku    │ 15 min  │ Fast research and discovery       │
└─────────────────────────────────┴──────────┴─────────┴───────────────────────────────────┘

USER AGENTS (14)
┌─────────────────────────────────┬──────────┬─────────┬───────────────────────────────────┐
│ Name                            │ Model    │ Timeout │ Description                       │
├─────────────────────────────────┼──────────┼─────────┼───────────────────────────────────┤
│ backend-architect               │ sonnet   │ 60 min  │ Design backend systems            │
│ frontend-architect              │ sonnet   │ 60 min  │ Create accessible UIs             │
│ python-expert                   │ sonnet   │ 45 min  │ Production-ready Python code      │
└─────────────────────────────────┴──────────┴─────────┴───────────────────────────────────┘

PLUGIN AGENTS (0)
No plugin agents found (code-plugin agents need YAML frontmatter)

Total: 21 agents
```

### create
Create a new agent with interactive wizard.

```bash
/agents create my-agent
/agents create             # Prompts for name
```

**Interactive Wizard:**
```
Creating new agent: my-agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Agent name: my-agent
2. Description: [Enter description]
3. Model (haiku/sonnet/opus): sonnet
4. Timeout (minutes): 60
5. Tools (comma-separated or 'all'): Read, Write, Bash, Grep
6. Thinking mode (quick/normal/deep): normal
7. System prompt: [Enter multi-line prompt, Ctrl+D to finish]

Preview YAML:
---
name: my-agent
description: Custom agent for specific tasks
model: sonnet
timeout: 60
tools: Read, Write, Bash, Grep
thinking: normal
---

[Your system prompt here]

Create agent? (y/n): y

✓ Agent created: /home/user/.claude/agents/my-agent.md
✓ Agent validated successfully
✓ Agent ready to use: /background my-agent "task description"
```

**Where agents are created:**
- Default location: `~/.claude/agents/[name].md` (user agents)
- Override: `--project` flag creates in `core/infrastructure/agents/`
- Override: `--plugin [name]` creates in `[name]-plugin/agents/`

### edit
Open agent file in default editor for modification.

```bash
/agents edit orchestrator
```

**Behavior:**
1. Finds agent by name using `findAgentByName()`
2. Opens file in `$EDITOR` (falls back to `vim` or `nano`)
3. Waits for editor to close
4. Automatically validates YAML after save
5. Reports validation results

**Output:**
```
Opening agent: orchestrator
File: /home/user/project/core/infrastructure/agents/orchestrator.md
Editor: code

[Editor opens...]

✓ Agent saved
✓ YAML validation passed
✓ Agent ready to use
```

### delete
Delete agent file with confirmation.

```bash
/agents delete my-agent
/agents delete my-agent --force    # Skip confirmation
```

**Interactive Confirmation:**
```
Delete agent: my-agent
Location: ~/.claude/agents/my-agent.md
Source: user

Agent details:
  Name: my-agent
  Description: Custom agent for specific tasks
  Model: sonnet
  Timeout: 60 min

This action cannot be undone.
Delete agent? (y/n): y

✓ Agent deleted: my-agent
✓ File removed: ~/.claude/agents/my-agent.md
```

**Safety:**
- Cannot delete project agents (core/infrastructure/agents/) without `--force`
- Cannot delete plugin agents through this command (edit plugin directly)
- Confirmation required unless `--force` flag used
- Backs up to `.agents-backup/` before deletion (optional with `--backup`)

### validate
Validate agent YAML frontmatter and structure.

```bash
/agents validate orchestrator     # Validate specific agent
/agents validate --all            # Validate all agents
```

**Output:**
```
Validating agent: orchestrator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ YAML frontmatter found
✓ Required field 'name': orchestrator
✓ Required field 'description': Coordinate multi-agent workflows
✓ Optional field 'model': claude-sonnet-4-5
✓ Optional field 'timeout': not specified (will use default: 60 min)
✓ Optional field 'tools': not specified (will use all tools)
✓ Optional field 'thinking': not specified (will use default)
✓ System prompt: 1247 lines

✓ Agent validation passed

Agent ready to use:
  /background orchestrator "task description"
```

**Validation Checks:**
1. File exists and is readable
2. YAML frontmatter present (delimited by `---`)
3. Required fields: `name`, `description`
4. Optional fields valid if present: `model`, `timeout`, `tools`, `thinking`
5. System prompt (markdown body) is non-empty
6. YAML syntax is valid (parseable)

**Error Examples:**
```
✗ YAML frontmatter not found
  Add frontmatter to top of file:
  ---
  name: my-agent
  description: Agent description
  ---

✗ Required field missing: 'description'
  Add to YAML frontmatter:
  description: Brief description of agent purpose

✗ Invalid model: 'gpt-4'
  Valid models: haiku, sonnet, opus, or full model ID starting with 'claude-'

✗ Invalid timeout: 'infinity'
  Timeout must be a number (minutes): 60
```

## Discovery System

Agents are discovered from three sources in priority order:

1. **Project agents** (highest priority)
   - Location: `core/infrastructure/agents/*.md`
   - Purpose: Infrastructure agents, workflow agents
   - Examples: orchestrator, task-coordinator, research-scout
   - Count: 7-10 agents

2. **User agents** (medium priority)
   - Location: `~/.claude/agents/*.md`
   - Purpose: Personal agents, reusable across projects
   - Examples: backend-architect, frontend-architect, python-expert
   - Count: Varies (10-50 agents)

3. **Plugin agents** (lowest priority)
   - Location: `*-plugin/agents/*.md`
   - Purpose: Domain-specific agents (marketing, code, etc.)
   - Examples: copywriter, code-reviewer, hugo-specialist
   - Count: Varies by plugin (5-20 per plugin)

**Precedence:** If multiple agents have the same name, project > user > plugin

## Agent File Format

All agents must have YAML frontmatter + markdown body:

```markdown
---
name: my-agent
description: Brief description of agent purpose
model: sonnet                    # Optional: haiku, sonnet, opus, or full model ID
timeout: 60                      # Optional: timeout in minutes (default: 60)
tools: Read, Write, Bash, Grep   # Optional: comma-separated or 'all'
thinking: normal                 # Optional: quick, normal, deep
---

# Agent System Prompt

This is the agent's system prompt (markdown content).
It defines the agent's behavior, capabilities, and instructions.

## Capabilities

- Capability 1
- Capability 2

## Task Decomposition

[Instructions for how agent should break down tasks]

## Output Format

[Expected output format]
```

## Examples

### Example 1: List All Agents
```bash
/agents list
```

Shows all 21 discovered agents grouped by source.

### Example 2: Create New Agent
```bash
/agents create data-analyst

# Interactive wizard:
Description: Analyze data and generate insights
Model: sonnet
Timeout: 45
Tools: Read, Bash, Grep
Thinking: normal
System prompt:
You are a data analyst specializing in statistical analysis and visualization.

[Ctrl+D]

✓ Agent created: ~/.claude/agents/data-analyst.md
```

### Example 3: Edit Existing Agent
```bash
/agents edit data-analyst

# Opens in editor, modify, save
✓ Agent saved and validated
```

### Example 4: Validate Agent
```bash
/agents validate data-analyst

✓ Agent validation passed
```

### Example 5: Delete Agent
```bash
/agents delete data-analyst

Delete agent? (y/n): y
✓ Agent deleted
```

### Example 6: List Project Agents Only
```bash
/agents list --source project

PROJECT AGENTS (7)
- orchestrator (sonnet, 60 min)
- task-coordinator (sonnet, 45 min)
- research-scout (haiku, 15 min)
...
```

## Integration with Other Commands

### With /background
```bash
# Create agent
/agents create fast-coder

# Use agent
/background fast-coder "Implement feature X"
```

### With /agents validate
```bash
# Before using new agent
/agents create my-agent
/agents validate my-agent    # Check it's correct
/background my-agent "task"  # Use it
```

### With Agent Discovery
```bash
# Agents command uses same discovery as /background
/agents list                           # Shows all agents
/background [any-agent-from-list] "task"
```

## Implementation

### Command Execution
The `/agents` command is implemented via TypeScript script:

```bash
npx tsx core/infrastructure/hooks/utils/agents-cli.ts [subcommand] [args]
```

### Discovery Module
Uses `core/infrastructure/hooks/utils/agent-discovery.ts`:

```typescript
import { discoverAgents, findAgentByName } from './utils/agent-discovery';

// List all agents
const agents = await discoverAgents();

// Find specific agent
const agent = await findAgentByName('orchestrator');
```

### Command Logic
Full implementation in `core/infrastructure/hooks/utils/agents-cli.ts`:

```typescript
// Parse subcommand
const subcommand = args[0] || 'list';

switch (subcommand) {
  case 'list':
    await listAgents(args.slice(1));
    break;
  case 'create':
    await createAgent(args[1]);
    break;
  case 'edit':
    await editAgent(args[1]);
    break;
  case 'delete':
    await deleteAgent(args[1]);
    break;
  case 'validate':
    await validateAgent(args[1]);
    break;
  default:
    showHelp();
}
```

## Best Practices

### 1. Organize Agents by Scope
- **Project agents**: Workflow/infrastructure agents (in core/)
- **User agents**: Personal reusable agents (in ~/.claude/)
- **Plugin agents**: Domain-specific agents (in plugins/)

### 2. Use Descriptive Names
✓ **Good**: `backend-architect`, `data-analyst`, `test-engineer`
✗ **Bad**: `agent1`, `helper`, `thing`

### 3. Write Clear Descriptions
✓ **Good**: "Design scalable backend systems with focus on data integrity"
✗ **Bad**: "Backend stuff"

### 4. Set Appropriate Timeouts
- Quick tasks (scouts, searches): 15-30 min
- Medium tasks (analysis, planning): 30-60 min
- Long tasks (building, implementation): 60-120 min

### 5. Validate Before Using
```bash
/agents create my-agent
/agents validate my-agent    # Always validate
/background my-agent "task"
```

### 6. Keep System Prompts Focused
- Clear capabilities section
- Specific task decomposition instructions
- Expected output format
- Anti-patterns to avoid

## Troubleshooting

### Agent Not Found
```bash
/background my-agent "task"
Error: Invalid agent type 'my-agent'
```

**Solution:**
```bash
/agents list                  # Check if agent exists
/agents validate my-agent     # Check for errors
/agents create my-agent       # Create if missing
```

### YAML Parse Error
```bash
/agents validate my-agent
✗ YAML syntax error: unexpected token
```

**Solution:**
```bash
/agents edit my-agent         # Fix YAML manually
# Ensure proper YAML syntax:
# - Use spaces not tabs
# - Quote strings with special characters
# - Close all YAML blocks with ---
```

### Editor Not Found
```bash
/agents edit my-agent
Error: Editor not found
```

**Solution:**
```bash
export EDITOR=nano            # Or: vim, code, emacs
/agents edit my-agent
```

### Cannot Delete Project Agent
```bash
/agents delete orchestrator
Error: Cannot delete project agent without --force
```

**Solution:**
```bash
# Project agents are protected
# Only delete if you're sure:
/agents delete orchestrator --force
```

## See Also

- `/background [agent] [prompt]` - Spawn background agent
- `/background-status` - Check agent progress
- `core/infrastructure/hooks/utils/agent-discovery.ts` - Discovery implementation
- `core/docs/agent-orchestration.md` - Agent coordination patterns
- `dev/active/sub-agents-migration/` - Migration documentation

---

**Part of:** Sub-Agents Migration (Day 3-4)
**Status:** Implementation
**Integration:** Agent discovery system, background agents, file-based configuration
