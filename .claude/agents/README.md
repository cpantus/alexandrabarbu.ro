# Creating Custom Agents

Guide for creating custom sub-agents using official Claude Code patterns.

## Quick Start

```bash
# Create new agent interactively
/agents create

# Or manually create a .md file with YAML frontmatter
touch ~/.claude/agents/my-agent.md
```

## YAML Frontmatter Format

All agents require YAML frontmatter at the top of the `.md` file:

```yaml
---
name: agent-name
description: When this subagent should be invoked
tools: Read, Write, Grep, Bash
model: sonnet
timeout: 60
thinking: think
---

Your agent's system prompt goes here...
```

### Required Fields

**`name`** (required)
- Unique identifier for the agent
- Use kebab-case: `my-custom-agent`
- Must be unique across all sources (project/user/plugin)

**`description`** (required)
- Brief description of when this agent should be invoked
- Used by orchestrators for automatic delegation
- Example: `"Expert in React performance optimization"`

### Optional Fields

**`tools`** (optional, default: all tools)
- Comma-separated list of tools the agent can use
- Available tools: `Read, Write, Edit, Grep, Glob, Bash, WebSearch, WebFetch, Task, TodoWrite`
- Example: `"Read, Grep, Bash"` (read-only agent)
- Example: `"Read, Write, Edit, Bash"` (code modification agent)
- Omit for full tool access

**`model`** (optional, default: `sonnet`)
- Which Claude model to use: `haiku`, `sonnet`, `opus`
- `haiku`: Fast, cost-effective for simple tasks
- `sonnet`: Balanced performance for most tasks (recommended)
- `opus`: Maximum capability for complex reasoning

**`timeout`** (optional, default: `60`)
- Maximum execution time in minutes
- Choose based on task complexity:
  - `15`: Quick reconnaissance/research
  - `30`: Focused single-file tasks
  - `45`: Multi-file refactoring
  - `60`: Complex implementations
  - `90`: Large-scale migrations

**`thinking`** (optional, default: none)
- Enable extended thinking mode
- Options: `think`, `think-hard`, `ultrathink`
- `think`: Standard reasoning (most tasks)
- `think-hard`: Deep analysis (architecture, design)
- `ultrathink`: Maximum reasoning (complex problem-solving)
- Adds latency but improves quality for complex tasks

## System Prompt

After the YAML frontmatter (after `---`), write your agent's system prompt:

```markdown
---
name: react-expert
description: Expert in React best practices and performance
tools: Read, Write, Bash
model: sonnet
timeout: 45
---

You are an expert React developer specializing in:
- React Hooks and functional components
- Performance optimization (React.memo, useMemo, useCallback)
- State management (Context, Redux, Zustand)
- Server Components and Next.js patterns

When analyzing code:
1. Check for anti-patterns (prop drilling, excessive re-renders)
2. Suggest modern alternatives to deprecated patterns
3. Ensure accessibility best practices
4. Recommend appropriate state management solutions

Always provide code examples with your recommendations.
```

## Agent Locations

Agents can be stored in three locations (priority order):

### 1. Project Agents (Highest Priority)

**Path:** `[project]/.claude/agents/` or `[project]/core/infrastructure/agents/`

**Use for:**
- Infrastructure agents shared across projects
- Domain-specific agents for this project
- Agents that override user/plugin defaults

**Example:**
```bash
.claude/agents/
├── orchestrator.md
├── task-coordinator.md
└── research-scout.md
```

### 2. User Agents (Override Defaults)

**Path:** `~/.claude/agents/`

**Use for:**
- Personal agent customizations
- Agents you use across all projects
- Domain expertise agents (your specialty)

**Example:**
```bash
~/.claude/agents/
├── python-expert.md
├── frontend-specialist.md
└── my-custom-agent.md
```

### 3. Plugin Agents (Domain-Specific)

**Path:** `[plugin]/agents/`

**Use for:**
- Plugin-provided specialist agents
- Domain-specific agent collections
- Agents tied to plugin functionality

**Example:**
```bash
code-plugin/agents/
├── frontend-architect.md
├── backend-architect.md
└── security-engineer.md
```

## Examples

### Example 1: Quick Research Agent

```yaml
---
name: quick-researcher
description: Fast research for technology decisions
tools: WebSearch, WebFetch, Read, Write
model: haiku
timeout: 15
---

You are a quick research agent. For each query:

1. Search for official documentation first
2. Find 2-3 authoritative sources
3. Summarize key points in bullet format
4. Provide source links

Keep responses concise (<500 words).
```

### Example 2: Code Reviewer

```yaml
---
name: security-reviewer
description: Security-focused code review
tools: Read, Grep, Bash
model: sonnet
timeout: 30
thinking: think
---

You are a security-focused code reviewer. Review code for:

**Security Issues:**
- SQL injection vulnerabilities
- XSS attack vectors
- Authentication/authorization flaws
- Secrets in code
- Unsafe dependencies

**Output Format:**
1. List each issue with severity (Critical/High/Medium/Low)
2. Show affected code snippet
3. Recommend fix with code example
4. Reference OWASP guidelines where applicable

Never suggest code changes that reduce security.
```

### Example 3: Architecture Advisor

```yaml
---
name: microservices-architect
description: Microservices architecture design
tools: Read, Grep, Write
model: sonnet
timeout: 60
thinking: think-hard
---

You are a microservices architecture expert. When designing systems:

**Analysis:**
1. Identify service boundaries
2. Define clear APIs between services
3. Plan data consistency strategy
4. Design fault tolerance

**Documentation:**
- Create architecture diagrams (Mermaid)
- Document service responsibilities
- Define API contracts
- Plan deployment strategy

**Anti-Patterns to Avoid:**
- Distributed monoliths
- Shared databases
- Synchronous-only communication
- No circuit breakers

Provide concrete recommendations with tradeoffs.
```

### Example 4: Focused Specialist

```yaml
---
name: css-animations
description: CSS animation and transition expert
tools: Read, Write
model: sonnet
timeout: 30
---

You are a CSS animation specialist. Focus on:

**Modern CSS:**
- CSS Grid and Flexbox layouts
- CSS Custom Properties
- Modern animation APIs (View Transitions, etc.)
- Hardware-accelerated properties

**Best Practices:**
- Use transform/opacity for smooth 60fps animations
- Prefer CSS over JavaScript where possible
- Ensure accessibility (prefers-reduced-motion)
- Provide fallbacks for older browsers

Always include CodePen-ready examples.
```

## Testing Your Agent

After creating an agent, validate and test it:

```bash
# Validate YAML syntax
/agents validate my-agent

# List to confirm it's discovered
/agents list --source user

# Test with a simple prompt
/background my-agent "Test prompt to verify functionality"

# Monitor execution
/observe <agent-id>
```

## Best Practices

### ✅ DO:

- **Be specific** in the description (helps orchestrators delegate correctly)
- **Limit tools** to only what's needed (security + clarity)
- **Choose appropriate timeout** based on task complexity
- **Use thinking modes** for complex reasoning tasks
- **Provide clear output format** in system prompt
- **Include examples** in system prompt for consistency
- **Test thoroughly** before using in production workflows

### ❌ DON'T:

- **Use generic names** like "agent-1" (be descriptive)
- **Grant unnecessary tools** (principle of least privilege)
- **Set excessive timeouts** (wastes resources)
- **Write vague descriptions** (makes delegation harder)
- **Forget to validate** YAML syntax before use
- **Overlap with existing agents** (check `/agents list` first)

## Troubleshooting

### Agent Not Discovered

```bash
# Check if file is in correct location
ls ~/.claude/agents/my-agent.md

# Validate YAML frontmatter
/agents validate my-agent

# Check for syntax errors (common issues):
# - Missing closing --- for YAML block
# - Invalid YAML (wrong indentation, quotes)
# - Missing required fields (name, description)
```

### Agent Execution Fails

```bash
# Check agent output/logs
/observe <agent-id>

# Verify tools are available
# Some tools may be restricted by permissions

# Check timeout isn't too short
# Increase timeout if agent is being killed mid-execution
```

### Agent Ignored by Orchestrator

- Ensure `description` field clearly states when agent should be used
- Check agent name isn't conflicting with higher-priority agent
- Verify agent is listed in `/agents list`

## Advanced Patterns

### Chained Agents

Create agents that work together in sequence:

```yaml
---
name: analyzer
description: Analyze code structure
tools: Read, Grep, Write
model: sonnet
timeout: 30
---

Analyze the codebase and output findings to /tmp/analysis.md
Next step: Pass findings to refactor-agent
```

### Resumable Workflows

For long-running tasks:

```bash
# Start agent
/background long-task "Begin analysis"
→ Agent ID: agent-xyz

# Stop and resume later
/kill agent-xyz
/background long-task "Continue" --resume agent-xyz
```

### Context-Aware Agents

Agents that load dev docs for task context:

```yaml
---
name: task-implementer
description: Implement planned features
tools: Read, Write, Edit, Bash
model: sonnet
timeout: 60
---

Before starting:
1. Load dev docs from /dev/active/[task]/
2. Read plan, context, and tasks files
3. Update context and tasks as you work
4. Create bundle entry when complete
```

## References

- **Official Sub-Agent Docs:** https://code.claude.com/docs/en/sub-agents.md
- **Agent Orchestration:** `/home/cere/Work/coding-agent/core/docs/agent-orchestration.md`
- **Implementation:** `/home/cere/Work/coding-agent/core/infrastructure/hooks/background-agent.ts`
- **Discovery System:** `/home/cere/Work/coding-agent/core/infrastructure/hooks/utils/agent-discovery.ts`
- **Conversation Storage:** `/home/cere/Work/coding-agent/core/infrastructure/hooks/utils/conversation-storage.ts`

## Get Help

```bash
# List all commands
/agents --help

# Validate agent
/agents validate my-agent

# Get agent details
/agents list --format json | grep my-agent
```

---

**Created:** 2025-11-15
**Version:** 5.6.0 (Official Patterns Migration)
**Status:** Production-ready
