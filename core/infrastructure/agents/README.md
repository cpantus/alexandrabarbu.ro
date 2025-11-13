# Infrastructure Agents

Core agents for workflow orchestration, research, and task execution.

## Agent Catalog

### Core Orchestration

#### orchestrator.md
**Purpose**: High-level coordination and multi-agent fleet management
**Tools**: Read, Task
**Model**: Sonnet
**Use Cases**:
- Complex multi-phase workflows
- Fleet coordination (5+ agents)
- Strategy delegation across domains
- Cross-functional coordination

**Example**:
```bash
# Orchestrator spawns multiple specialists
→ Research Scout (external knowledge)
→ Code Scout (codebase patterns)
→ Frontend Specialist (UI implementation)
→ Synthesize results
```

#### task-coordinator.md
**Purpose**: Task breakdown and delegation to specialists
**Tools**: Read, Task
**Model**: Haiku
**Use Cases**:
- Medium complexity workflows (2-4 agents)
- Task breakdown with delegation
- Progress tracking across specialists
- Parallel work coordination

**Example**:
```bash
# Coordinator delegates to specialists
→ Scout: Find patterns
→ Analyst: Evaluate options
→ Implementer: Execute plan
```

#### task-implementer.md
**Purpose**: Systematic code implementation with quality gates
**Tools**: Read, Write, Edit, Bash, Grep
**Model**: Sonnet
**Use Cases**:
- Focused implementation tasks
- Code execution with validation
- Quality-gated delivery
- Single-responsibility implementations

**Example**:
```bash
# Implementer executes with quality checks
→ Implement feature
→ Run tests
→ Validate quality
→ Commit changes
```

### Discovery & Research

#### research-scout.md
**Purpose**: External knowledge gathering for planning
**Tools**: WebSearch, WebFetch, Context7, Read, Write, Grep
**Model**: Haiku (cost-efficient)
**Caching**: Aggressive (research is highly reusable)

**Research Capabilities**:
1. **Documentation Lookup**: Context7 + WebFetch official docs
2. **Best Practices**: WebSearch + top 5-10 results
3. **Technology Comparison**: WebSearch + synthesis
4. **Architecture Patterns**: WebSearch + real examples
5. **Pitfall Identification**: Common mistakes + anti-patterns

**Output Format**:
- Structured markdown reports (`research/[topic].md`)
- Executive summary (2-3 sentences)
- Key findings (5-7 bullet points with sources)
- Best practices (prioritized)
- Documentation references (official + authoritative)
- Recommendations (actionable with rationale)
- Warnings/pitfalls (what to avoid)
- Sources (credibility-rated URLs)
- Metadata (searches, fetches, confidence, duration)

**Use Cases**:
- Technology selection and comparison
- Best practices research (2024-2025 current)
- Architecture pattern discovery
- Documentation aggregation
- Planning context enrichment

**Performance**:
- Duration: 3-5 minutes (comprehensive depth)
- Cost: $0.03-0.05 per query
- Cached: $0.01-0.02 (70% reduction)
- Sources: 5-10 credible sources per query
- Output: 30-50K tokens

**Integration**:
```bash
# Standalone research
/research "React Server Components best practices"

# Integrated with workflow (parallel execution)
/workflow scout-plan-build "add server components" --with-research
→ Research Scout: External best practices
→ Code Scout: Internal patterns
→ Plan: Synthesize both

# Gap-driven research
/workflow scout-plan-build "implement Redis"
→ Scout: No Redis found
→ Plan: Gap detected → suggest research
→ Research Scout: Redis patterns
→ Plan: Continue with research context
```

**Examples**:
```bash
/research "React Hook best practices"
/research "microservices vs monolith"
/research "Redis caching patterns"
/research "Next.js App Router migration"
/research "TypeScript strict mode benefits"
```

#### demo-personalize-orchestrator.md
**Purpose**: Business/competitive research and multi-site crawling
**Tools**: WebFetch, Context7, Playwright MCP, Task
**Model**: Sonnet
**Use Cases**:
- Client website analysis
- Competitive intelligence
- Market research
- Multi-site crawling workflows

**Example**:
```bash
# Spawn 5 parallel researchers
→ Client website analysis
→ Competitor 1 analysis
→ Competitor 2 analysis
→ Industry documentation
→ Synthesize competitive landscape
```

### Scout Workflow (via patterns)

**Location**: `core/infrastructure/patterns/workflow/scout_workflow.md`
**Purpose**: Codebase discovery and pattern identification
**Tools**: Grep, Glob, Read
**Model**: Haiku (fast, cheap)

**Search Strategies**:
1. **Keyword Search**: Files containing key terms
2. **Structure Search**: Imports, exports, class definitions
3. **Dependency Search**: Related files and dependencies

**Performance**:
- Duration: 2-5 minutes (2-3 parallel scouts)
- Cost: $0.02-0.06
- Coverage: Entire codebase or scoped directory
- Output: Prioritized file lists (high/medium/low priority)

**Integration with Research**:
- Can run in parallel with research scout
- `--with-research` flag spawns both
- Plan synthesizes code + research findings

## Usage Patterns

### Pattern 1: Simple Implementation
```bash
# Use task-implementer for focused work
→ Read context
→ Implement feature
→ Validate quality
→ Done
```

### Pattern 2: Research-Enhanced Planning
```bash
# Standalone research first
/research "topic"

# Then plan with research context
/workflow scout-plan-build "task"
→ Plan auto-loads research/topic.md
```

### Pattern 3: Parallel Discovery
```bash
# Research + code discovery simultaneously
/workflow scout-plan-build "task" --with-research
→ Research Scout (external) + Code Scout (internal)
→ Plan synthesizes both sources
→ Build with complete context
```

### Pattern 4: Fleet Coordination
```bash
# Orchestrator coordinates multiple agents
Orchestrator
  → Research Scout (gather knowledge)
  → Code Scout (find patterns)
  → Task Coordinator (delegate work)
    → Specialist 1 (frontend)
    → Specialist 2 (backend)
  → Synthesize deliverables
```

## Model Selection

| Agent | Default Model | Rationale |
|-------|--------------|-----------|
| Orchestrator | Sonnet | Strategic thinking, coordination |
| Task Coordinator | Haiku | Fast delegation, cost-efficient |
| Task Implementer | Sonnet | Code quality, reasoning |
| Research Scout | Haiku | Information gathering, speed |
| Demo Personalize | Sonnet | Complex analysis, synthesis |
| Scout Workflow | Haiku | Fast search, parallel execution |

## Cost Optimization

### Use Cheap Models for Discovery
```bash
# Good: Haiku for research and search
/research "topic"  # Uses Haiku
/workflow scout "find patterns" --model haiku

# Avoid: Expensive models for simple tasks
/workflow scout "find patterns" --model opus  # Wasteful
```

### Leverage Caching
```bash
# First research query
/research "TypeScript best practices"  # $0.04

# Repeat query (cached)
/research "TypeScript best practices"  # $0.01 (75% savings)
```

### Parallel Execution
```bash
# Sequential (slower, no time savings)
/research "topic"           # 4 minutes
/workflow scout "patterns"  # 3 minutes
# Total: 7 minutes

# Parallel (faster, same cost)
/workflow scout-plan-build "task" --with-research
# Total: 4 minutes (research + scout in parallel)
```

## Integration Points

### With Workflow System
- Scout workflow can spawn research scout in parallel
- Plan workflow auto-loads research reports
- Build workflow references research findings
- See: `core/docs/workflow-system.md`

### With Pattern System
- Research patterns guide effective queries
- Component patterns validate agent structure
- Workflow patterns orchestrate multi-agent flows
- See: `core/docs/pattern-system.md`

### With Dev Docs
- Research reports copied to task context
- Multi-session access preserved
- Context recovery across sessions
- See: Dev Docs System in CLAUDE.md

### With Background Execution
- Spawn agents non-blocking
- Monitor with `/observe` and `/cost-report`
- Parallel work streams
- See: Background Agent Execution in workflow-system.md

## Agent Capabilities Matrix

| Agent | WebSearch | WebFetch | Context7 | Codebase | Parallel | Model | Cost/Use |
|-------|-----------|----------|----------|----------|----------|-------|----------|
| Orchestrator | ❌ | ❌ | ❌ | ✅ | ✅ (delegates) | Sonnet | $0.50-2.00 |
| Task Coordinator | ❌ | ❌ | ❌ | ✅ | ✅ (delegates) | Haiku | $0.10-0.30 |
| Task Implementer | ❌ | ❌ | ❌ | ✅ | ❌ | Sonnet | $0.30-0.80 |
| Research Scout | ✅ | ✅ | ✅ | ✅ | ✅ (sources) | Haiku | $0.03-0.05 |
| Demo Personalize | ❌ | ✅ | ✅ | ✅ | ✅ (5 agents) | Sonnet | $0.80-2.00 |
| Scout Workflow | ❌ | ❌ | ❌ | ✅ | ✅ (2-3 scouts) | Haiku | $0.02-0.06 |

## Best Practices

### 1. Choose the Right Agent
```bash
# Simple implementation → Task Implementer
→ Focused, single-responsibility work

# Complex multi-phase → Orchestrator
→ Coordination across domains

# Need external knowledge → Research Scout
→ Best practices, documentation, patterns

# Codebase discovery → Scout Workflow
→ Find existing patterns
```

### 2. Use Research for Unfamiliar Tech
```bash
# Good: Research before implementing
/research "Next.js App Router best practices"
/workflow scout-plan-build "migrate to App Router"

# Avoid: Skip research, risk missing best practices
/workflow scout-plan-build "migrate to App Router"
```

### 3. Parallel Execution When Possible
```bash
# Good: Parallel research + code discovery
/workflow scout-plan-build "task" --with-research

# Avoid: Sequential (slower)
/research "topic"
/workflow scout-plan-build "task"
```

### 4. Leverage Research Library
```bash
# Research accumulates in research/ directory
ls research/
→ react-hooks-best-practices.md
→ redis-caching-patterns.md
→ typescript-strict-mode.md

# Reuse existing research (free)
cat research/react-hooks-best-practices.md
```

### 5. Monitor Cost and Performance
```bash
# Track agent costs
/cost-report research-scout
/cost-report today

# Observe active agents
/observe all

# Optimize based on metrics
/cost-report optimize
```

## File Locations

```
core/infrastructure/agents/
├── README.md (this file)
├── orchestrator.md
├── task-coordinator.md
├── task-implementer.md
├── research-scout.md
└── demo-personalize-orchestrator.md

core/infrastructure/patterns/workflow/
├── scout_workflow.md
├── plan_workflow.md
└── build_workflow.md
```

## See Also

- **Agent Orchestration**: `core/docs/agent-orchestration.md`
- **Workflow System**: `core/docs/workflow-system.md`
- **Pattern System**: `core/docs/pattern-system.md`
- **CLAUDE.md**: Main configuration and quick reference

---

**Load this documentation**: `/load agents`
