# Multi-Agent Workflows (Background Execution)

**Background agent execution** - delegate work to specialized agents that run independently while you continue working.

## Core Capabilities

### 1. Scout/Plan/Build Workflow Patterns

- **Scout**: Parallel fast agents search codebase (keyword/structure/dependency) + optional external research
- **Plan**: Strategic planning with task breakdown (15-60 min tasks), auto-loads research context
- **Build**: Systematic execution with progress tracking

### 1a. Research Integration

- **Research Scout**: External knowledge gathering (best practices, documentation, patterns)
  - Tools: WebSearch, WebFetch, Context7
  - Sources: 5-10 credible sources per query
  - Duration: 3-5 minutes (comprehensive)
  - Cost: $0.03-0.05 per query (Haiku)
  - Output: `research/[topic].md` with structured findings

- **Integration Modes**:
  1. **Standalone**: `/research "topic"` → manual research before planning
  2. **Parallel**: `--with-research` flag → research + code scout simultaneously
  3. **Gap-Driven**: Plan detects knowledge gaps → suggests research → auto-spawn

### 1b. Enhanced Planning (v1.1.0)

**Command**: `/plan-enhanced "task"`

**Purpose**: Research-first comprehensive planning for complex software development tasks

**When to Use**:
- New systems/services (greenfield projects)
- Unfamiliar technology stacks
- Scalability-critical systems
- High-stakes implementations

**4-Stage Process**:
1. **Research** (3-5 min, $0.09-0.15): Parallel scouts gather best practices + official docs
2. **Architecture** (10-15 min, $0.20-0.40): System-architect with think-hard + create dev docs
3. **Validation** (5-10 min, $0.10-0.20): Validate architecture against research
4. **Planning** (5-10 min, $0.10-0.25): Create phased implementation plan

**Total**: 20-35 minutes, $0.50-1.00

**Key Feature**: Automatic dev docs creation in Stage 2 enables seamless multi-session work

**Example**:
```bash
/plan-enhanced "create Hugo blog with custom theme and multilingual support"
→ Research: Hugo best practices + multilingual patterns
→ Architecture: Comprehensive Hugo site design + dev docs created
→ Validation: Check against research findings
→ Planning: 6-phase implementation plan
```

### 2. Background Agent Execution

- 13 agent types: copywriter, analyst, scout, planner, builder, + 8 specialists
- Non-blocking: Spawn agents and continue working
- Parallel execution: Run 3-5 agents simultaneously
- Real-time monitoring: Track context, tools, cost, progress

### 3. Agent Telemetry

- Context usage tracking (current %, history)
- Tool call tracking (Read, Write, Bash, Grep counts)
- Cost tracking (input/output tokens, USD cost)
- Performance metrics (tokens/sec, tools/min, efficiency)
- File access tracking (consumed vs produced)

### 4. Observability & Cost Tracking

- Real-time agent dashboards with terminal UI
- Per-agent cost tracking with USD pricing (Haiku/Sonnet/Opus)
- Aggregate cost reporting by type/model/category/day
- Optimization recommendations (30-50% savings potential)
- Budget tracking with alerts (daily/weekly/monthly)
- Performance monitoring (tokens/sec, efficiency, context usage)

## Commands

### Workflow Orchestration

```bash
/workflow scout-plan-build "add user authentication" --task-name auth-feature
/workflow scout "find all API endpoints" --scouts 3
/workflow plan "optimize database queries" --thinking extended
/workflow build "implement rate limiting" --auto-test

# With research integration
/workflow scout-plan-build "implement GraphQL API" --with-research
```

### Research Commands

```bash
# Standalone research
/research "React Server Components best practices"
/research "Redis caching patterns" --depth=quick
/research "microservices vs monolith" --depth=comprehensive

# Research output location
research/[topic].md  # Structured markdown report

# Integrated with workflows
/workflow scout-plan-build "add caching" --with-research
  → Research Scout: Caching best practices (parallel)
  → Code Scout: Existing cache patterns (parallel)
  → Plan: Synthesize both sources
```

### Background Agent Execution

```bash
# Spawn agent (non-blocking)
/background copywriter "Write 5 LinkedIn posts about Q4 results" --model haiku --priority high

# Check status
/background-status agent-abc123
  → Shows: context %, tools called, cost, runtime, status

# View results (partial or final)
/background-results agent-abc123
  → Shows: Latest output, deliverables, completion status
```

### Observability & Cost Tracking

```bash
# Observe agent dashboard (real-time)
/observe agent-abc123
  → Shows: Status, context usage, tools, cost, assets, performance, activity

# Observe all active agents
/observe all
  → Shows: Compact view of all agents with summary metrics

# Aggregate fleet summary
/observe summary
  → Shows: Total cost, success rate, top agent types, optimization opportunities

# Cost report (comprehensive analysis)
/cost-report
  → Shows: Aggregate cost, breakdown by type/model/category, daily trends, optimizations

# Cost report by time period
/cost-report today
/cost-report week
/cost-report month

# Cost report by agent type
/cost-report analyst
/cost-report copywriter

# Optimization recommendations only
/cost-report optimize
  → Shows: 4 optimization types (Haiku scouts, priming, two-stage, batching)
```

## Workflow Modes

- `scout-plan-build` - Full workflow (search → plan → execute)
- `scout` - Search only (parallel fast agents)
- `plan` - Planning only (load scout results → create plan)
- `build` - Execution only (load plan → execute systematically)
- `scout-plan` - Search + plan (no execution)
- `plan-build` - Plan + execute (skip search)

## Options

- `--task-name` - Dev docs task name (auto-loads plan/context/tasks)
- `--scope` - Search scope (specific directory or glob pattern)
- `--scouts N` - Number of parallel scout agents (2-3 default)
- `--thinking` - Thinking mode (quick/balanced/extended)
- `--auto-test` - Run tests after each phase
- `--pause-on-error` - Stop workflow if errors occur
- `--model` - Model selection (haiku/sonnet/opus)
- `--priority` - Priority level (low/normal/high)

## When to Use Workflows

**Use /workflow for:**
- ✅ Complex tasks requiring codebase exploration (Scout)
- ✅ Large implementations needing strategic planning (Plan)
- ✅ Multi-phase work with clear execution steps (Build)
- ✅ Tasks where you want structured, systematic approach
- ✅ When you need progress tracking (dev docs integration)

**Use /background for:**
- ✅ Tasks you want to delegate while continuing other work
- ✅ Parallel work streams (research + content creation)
- ✅ Long-running tasks (20+ minutes)
- ✅ Work that doesn't need real-time interaction
- ✅ When you want cost tracking per agent

**Traditional approach for:**
- ✅ Quick, single-step tasks (<5 minutes)
- ✅ Interactive work requiring back-and-forth
- ✅ Tasks where you need immediate feedback
- ✅ Simple file edits or reads

## Integration with Existing Systems

### Workflow + Dev Docs

```bash
# Create dev docs for task
/create-dev-docs add-user-auth

# Run workflow (auto-loads dev docs)
/workflow scout-plan-build "add user authentication" --task-name add-user-auth

# Workflow automatically:
# - Loads plan.md (if exists)
# - Updates context.md with progress
# - Checks off tasks in tasks.md
# - Appends to bundle.log
```

### Background Agents + Telemetry

```bash
# Spawn multiple agents in parallel
/background analyst "Analyze Q4 campaign performance" --model sonnet
/background copywriter "Write blog post about AI trends" --model haiku
/background scout "Find all authentication code" --model haiku

# Monitor all agents
/observe all
  → Shows dashboard with all agent status, cost, progress
```

### Workflow + Patterns

```bash
# Workflows can execute patterns
/workflow build "create LinkedIn campaign" --task-name linkedin-campaign

# Inside build workflow, patterns are invoked:
# - create_linkedin_post pattern
# - generate_variants pattern
# - Brand voice skills loaded automatically
```

## Performance Characteristics

**Scout/Plan/Build Workflow:**
- Scout: 2-3 parallel agents, 2-5 min, $0.02-0.06 (Haiku)
- Plan: Strategic planning, 3-8 min, $0.10-0.20 (Sonnet)
- Build: Systematic execution, 10-30 min, $0.30-0.80 (Sonnet)
- **Total:** 15-45 min, $0.42-1.06 vs 45-120 min manual (3-8x faster)

**Background Agents:**
- Spawn overhead: <2 seconds
- Parallel efficiency: 90%+ (3-5 agents)
- Cost tracking: Real-time, per-agent
- Typical file size: ~20 KB telemetry per agent

**Telemetry Overhead:**
- Non-blocking I/O (won't slow execution)
- Bounded growth (last 100 events, last 50 context snapshots)
- Read latency: <10ms per telemetry file

## Best Practices

**1. Use workflows for large tasks:**
```bash
# Good: Complex task with exploration → planning → execution
/workflow scout-plan-build "migrate authentication to OAuth2"

# Avoid: Simple single-file edit
/workflow build "fix typo in README"  # Overkill, just use Edit tool
```

**2. Use background agents for parallel work:**
```bash
# Good: Delegate while continuing main work
/background analyst "Analyze user retention data"
# Continue working on campaign planning while analyst runs

# Avoid: Sequential dependency
/background scout "find API endpoints"
# Then immediately need results → Use /workflow scout instead
```

**3. Use cheap models for scouts:**
```bash
# Good: Fast, cheap model for search
/workflow scout "find all database models" --model haiku

# Avoid: Expensive model for simple search
/workflow scout "find all database models" --model opus  # Waste of $
```

**4. Track costs with telemetry:**
```bash
# After running background agents
/background-status agent-abc123
  → Check cost before continuing
  → Optimize by using cheaper models if cost is high
```

**5. Integrate with dev docs:**
```bash
# Always create dev docs for large tasks
/create-dev-docs oauth2-migration
/workflow scout-plan-build "migrate to OAuth2" --task-name oauth2-migration
  → Automatic progress tracking, context preservation
```

---

**See also:** `/load orchestrator` for fleet coordination, `/load devdocs` for integration
**Load this file:** `/load workflows`
