# Agent Orchestration

Coordinate specialized agents for complex development workflows and research tasks.

## Official Sub-Agent Patterns

This system implements the official Claude Code sub-agent patterns with enhancements for background execution and observability.

### Alignment with Official Standards

**100% Compliant:**
- ✅ **File-based discovery** - Agents defined in `.md` files with YAML frontmatter
- ✅ **YAML configuration** - Model, timeout, tools specified in frontmatter
- ✅ **Conversation storage** - JSONL format for resumable agents (`agent-{id}.jsonl`)
- ✅ **Source precedence** - Project → User → Plugin agent discovery
- ✅ **Agent structure** - Name, description, system prompt, tool access

**Enhanced Beyond Standard:**
- 🎯 **Background orchestration** - Detached processes for "out-of-loop" execution
- 📊 **Telemetry integration** - Cost tracking, bash optimization monitoring
- 👁️ **Observability** - `/observe` dashboard for real-time agent status
- 💾 **Prompt caching metrics** - Track cache hits/misses for performance
- 🔄 **Resumable agents** - Continue conversations with `--resume [agent-id]`

### Agent Discovery (File-Based)

Agents are automatically discovered from three sources:

```
Priority Order:
1. Project agents:  core/infrastructure/agents/*.md  (highest priority)
2. User agents:     ~/.claude/agents/*.md            (override defaults)
3. Plugin agents:   [plugin]/agents/*.md             (domain-specific)
```

**YAML Frontmatter Format:**
```yaml
---
name: agent-name
description: When this subagent should be invoked
tools: Read, Write, Grep, Bash
model: sonnet
timeout: 60  # minutes
thinking: think  # Optional: think|think-hard|ultrathink
---

Your agent's system prompt goes here...
```

**Discovery Details:**
- Automatic discovery at runtime (no hardcoded agent lists)
- `.md` files with YAML frontmatter
- Filters out `TEMPLATE.md` and `README.md` files
- Validates required fields: `name`, `description`
- Falls back to defaults: `model: sonnet`, `timeout: 60`

**See:** `core/infrastructure/hooks/utils/agent-discovery.ts` for implementation

### Agent Management (`/agents` Command)

Interactive command for creating and managing agents:

```bash
# List all discovered agents
/agents list [--source project|user|plugin] [--format table|json]

# Create new agent interactively
/agents create [--project|--user|--plugin]

# Edit existing agent
/agents edit <agent-name>

# Delete agent (with safety prompts)
/agents delete <agent-name> [--force]

# Validate YAML frontmatter
/agents validate <agent-name> [--all]
```

**Features:**
- Interactive creation wizard with YAML validation
- Table/JSON output formats
- Source filtering (project/user/plugin)
- Safety features (confirmations, backups, project agent protection)
- Editor integration for editing agents

**See:** `.claude/commands/infra/agents.md` for full documentation

### Conversation Storage (Resumable Agents)

Full conversation continuity across agent sessions using JSONL format:

```bash
# Start agent (creates conversation file)
/background research-scout "React best practices"
→ Creates: /tmp/agents/agent-{id}.jsonl

# Kill agent mid-execution
/kill <agent-id>

# Resume with full conversation context
/background research-scout "continue analysis" --resume <agent-id>
→ Loads previous conversation and continues
```

**JSONL Format (Official Standard):**
```jsonl
{"type":"session","agentId":"agent-123","agentType":"research-scout","startTime":"2025-11-15T10:00:00Z","version":"1.0"}
{"type":"event","timestamp":"2025-11-15T10:00:05Z","role":"user","content":"Research React best practices"}
{"type":"event","timestamp":"2025-11-15T10:01:30Z","role":"assistant","content":"Starting research..."}
```

**Utilities:**
- `createConversationFile(agentId)` - Initialize new conversation
- `appendToConversation(agentId, event)` - Add user/assistant messages
- `loadConversation(agentId)` - Restore full conversation history
- `listConversations()` - Show all conversation files
- `cleanupOldConversations(days)` - Delete old conversations

**See:** `core/infrastructure/hooks/utils/conversation-storage.ts` for implementation

### Background Orchestration (Implementation Detail)

Our system uses `child_process.spawn()` to invoke Claude Code CLI as background processes. This is **valid and necessary** because:

1. **No programmatic API exists** - Official Claude Code provides NO Node.js/TypeScript API for spawning sub-agents from code
2. **Background execution required** - We need detached processes that run independently for "out-of-loop" orchestration
3. **Telemetry integration** - Process-level control enables cost tracking, bash optimization monitoring, and `/observe` dashboard

**Official Research Findings:**
- See: `dev/active/sub-agents-migration/api-research-findings.md`
- Validates spawn() as the only implementation approach
- Documents official patterns we fully align with
- Explains why telemetry is our value-add

**Implementation:**
- Spawn detached Claude Code processes
- Pass conversation files for resumability
- Track PIDs in registry for `/observe` dashboard
- Monitor process lifecycle for telemetry
- Atomic status updates via file locking

**See:** `core/infrastructure/hooks/background-agent.ts` for implementation details

## Infrastructure Agents

### Core Orchestration (3)

- **orchestrator**: High-level coordination, multi-agent fleet management, strategy delegation
- **task-coordinator**: Task breakdown, delegation to specialists, progress tracking
- **task-implementer**: Code execution, systematic implementation, quality validation

### Discovery & Research (4)

- **research-scout**: External knowledge gathering (best practices, documentation, patterns, comparisons)
  - Tools: WebSearch, WebFetch, Context7, Read, Write
  - Output: Structured research reports with 5-10 credible sources
  - Use cases: Technology research, best practices, architecture patterns, documentation
  - Integration: Standalone `/research` or parallel with code scout via `--with-research`

- **scout** (via workflow): Codebase discovery, pattern identification, dependency mapping
  - Fast parallel search: keyword, structure, dependency strategies
  - 2-3 scouts run simultaneously for comprehensive coverage

### Specialized Utilities (1)

- **demo-personalize-orchestrator**: Business/competitive research, multi-site crawling
  - Tools: WebFetch, Context7, Playwright MCP
  - Use cases: Client analysis, competitive intelligence, market research

## Coordination Patterns

### 1. Single Agent Delegation
```bash
# Research external knowledge
/research "React Server Components best practices"

# Orchestrate complex workflow
/workflow scout-plan-build "implement authentication"
```

### 2. Parallel Multi-Agent Execution
```bash
# Research + Code discovery in parallel
/workflow scout-plan-build "add GraphQL API" --with-research
→ Research Scout: GraphQL best practices (external)
→ Code Scout: Existing API patterns (codebase)
→ Plan: Synthesize both sources
```

### 3. Sequential Workflow Phases
```
Scout → Research gaps discovered
Plan → Request research for gaps
Research → Fill knowledge gaps
Re-plan → Incorporate research
Build → Implement with informed decisions
```

### 4. Fleet Coordination
```bash
# Orchestrator spawns multiple specialists
Orchestrator
  → Research Scout (external knowledge)
  → Code Scout (codebase patterns)
  → Specialist Agent (domain expertise)
  → Synthesize results
```

## When to Use Each Agent

### Research Scout
**Use for:**
- ✅ Technology selection and comparison
- ✅ Best practices research (current, 2024-2025)
- ✅ Architecture pattern discovery
- ✅ Documentation gathering (official + authoritative)
- ✅ Pitfall identification (common mistakes to avoid)

**Examples:**
```bash
/research "React Hook best practices"
/research "microservices vs monolith"
/research "Redis caching patterns"
```

### Scout Workflow
**Use for:**
- ✅ Codebase pattern discovery
- ✅ Finding existing implementations
- ✅ Dependency mapping
- ✅ Structure identification

**Examples:**
```bash
/workflow scout "find all API endpoints"
/workflow scout "authentication patterns" --scouts 3
```

### Orchestrator
**Use for:**
- ✅ Complex multi-phase workflows
- ✅ Fleet coordination (5+ agents)
- ✅ High-level strategy delegation
- ✅ Cross-domain coordination

### Task Coordinator
**Use for:**
- ✅ Task breakdown and delegation
- ✅ Progress tracking across specialists
- ✅ Medium complexity workflows (2-4 agents)

### Task Implementer
**Use for:**
- ✅ Systematic code implementation
- ✅ Execution with quality gates
- ✅ Single-focus implementation tasks

## Research Integration Patterns

### Pattern 1: Pre-Planning Research
```
1. Research first: /research "topic"
2. Review findings: research/topic.md
3. Plan with context: /workflow scout-plan-build "task"
   → Plan auto-loads research report
```

### Pattern 2: Integrated Research
```
1. Single command: /workflow scout-plan-build "task" --with-research
2. Parallel execution:
   → Code Scout: Internal patterns
   → Research Scout: External knowledge
3. Plan synthesizes both sources
```

### Pattern 3: Gap-Driven Research
```
1. Start planning: /workflow scout-plan-build "task"
2. Scout finds no patterns (new technology)
3. Plan detects gap → suggests research
4. User approves → Research Scout spawns
5. Plan continues with research context
```

## Cost & Performance

### Research Scout
- **Duration**: 3-5 minutes (comprehensive)
- **Cost**: $0.03-0.05 per query (Haiku)
- **Cached**: $0.01-0.02 (70% reduction for repeat queries)
- **Sources**: 5-10 per research query
- **Output**: ~30-50K tokens

### Scout Workflow
- **Duration**: 2-5 minutes (2-3 parallel scouts)
- **Cost**: $0.02-0.06 (Haiku)
- **Coverage**: Entire codebase or scoped directory
- **Output**: Prioritized file lists

### Orchestrator
- **Duration**: Varies by complexity (10-60 min)
- **Cost**: $0.50-2.00 (multiple agents)
- **Agents**: 2-10 specialists coordinated
- **Output**: Comprehensive deliverables

## Observability & Tracking

### Monitor Agents
```bash
# Real-time agent dashboard
/observe agent-abc123
→ Status, context usage, tools, cost, performance

# All active agents
/observe all

# Fleet summary
/observe summary
```

### Cost Tracking
```bash
# Comprehensive cost report
/cost-report

# Filter by time
/cost-report today
/cost-report week

# Filter by agent type
/cost-report research-scout
/cost-report scout

# Optimization recommendations
/cost-report optimize
```

### Background Execution
```bash
# Spawn agent (non-blocking)
/background research-scout "React best practices"

# Check status
/background-status agent-abc123

# View results
/background-results agent-abc123
```

## Best Practices

### 1. Use Research Scout for External Knowledge
```bash
# Good: Research before implementing unfamiliar tech
/research "Next.js App Router best practices"
/workflow scout-plan-build "migrate to App Router"

# Avoid: Implementing without research
/workflow scout-plan-build "migrate to App Router"
# → No external context, may miss best practices
```

### 2. Parallel Research + Code Discovery
```bash
# Good: Single command, parallel execution
/workflow scout-plan-build "add Redis caching" --with-research

# Avoid: Sequential (slower)
/research "Redis caching"
/workflow scout-plan-build "add Redis caching"
```

### 3. Cost Optimization
```bash
# Good: Quick research for simple queries
/research "React Hook syntax" --depth=quick

# Avoid: Comprehensive for simple questions
/research "React Hook syntax"  # Defaults to comprehensive (more expensive)
```

### 4. Leverage Research Library
```bash
# Research is cached in research/ directory
/research "TypeScript best practices"  # $0.04
# Later...
/research "TypeScript best practices"  # $0.01 (cached)

# Check existing research
ls research/
cat research/typescript-best-practices.md
```

### 5. Integrate with Dev Docs
```bash
# Multi-session tasks
/create-dev-docs oauth-migration
/research "OAuth 2.0 best practices"
# Research report copied to dev/active/oauth-migration/CONTEXT.md
/workflow scout-plan-build "migrate to OAuth" --task-name oauth-migration
```

## Agent Capabilities Matrix

| Agent | WebSearch | WebFetch | Context7 | Codebase Search | Parallel | Model | Cost |
|-------|-----------|----------|----------|-----------------|----------|-------|------|
| Research Scout | ✅ | ✅ | ✅ | ✅ | Yes (5-10 sources) | Haiku | $0.03-0.05 |
| Scout Workflow | ❌ | ❌ | ❌ | ✅ | Yes (2-3 scouts) | Haiku | $0.02-0.06 |
| Orchestrator | ❌ | ❌ | ❌ | ✅ | Yes (delegates) | Sonnet | $0.50-2.00 |
| Task Coordinator | ❌ | ❌ | ❌ | ✅ | Yes (delegates) | Haiku | $0.10-0.30 |
| Task Implementer | ❌ | ❌ | ❌ | ✅ | No | Sonnet | $0.30-0.80 |
| Demo Personalize | ❌ | ✅ | ✅ | ✅ | Yes (5 researchers) | Sonnet | $0.80-2.00 |

## Research Report Structure

Research Scout outputs structured markdown reports:

```markdown
# Research Report: [Topic]

## Executive Summary
[2-3 sentence key findings]

## Key Findings
1. [Finding with authoritative source]
2. [Finding with community consensus]
...

## Best Practices
- [Practice] - [Rationale] - [Source]

## Documentation References
- [Official Docs](url) - [Key points]

## Recommendations
1. [Actionable recommendation] - [Based on research]

## Warnings/Pitfalls
- [Common mistake to avoid]
- [Anti-pattern with explanation]

## Technology Comparison (if applicable)
| Option | Pros | Cons | Use Cases |

## Sources
[All URLs with credibility ratings]

## Metadata
Searches: 7 | Fetches: 4 | Confidence: High | Duration: 4.2min
```

## Integration Points

### With Workflow System
- Scout workflow can spawn research scout in parallel
- Plan workflow auto-loads research reports
- Build workflow references research findings
- See: `core/docs/workflow-system.md`

### With Pattern System
- Research query pattern (`research_query.md`)
- Best practices pattern (`research_best_practices.md`)
- Technology comparison pattern (`research_comparison.md`)
- See: `core/docs/pattern-system.md`

### With Dev Docs
- Research reports copied to task context
- Multi-session access to research
- Preserved across sessions
- See: Dev Docs System in CLAUDE.md

---

**See also:** CLAUDE.md Capability Index, `/load orchestrator` for fleet coordination, `/load workflows` for integration
**Load this file:** `/load agents`
