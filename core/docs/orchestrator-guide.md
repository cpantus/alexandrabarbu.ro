# Orchestrator Agent (Fleet-Scale Coordination)

**The Orchestrator** is the central intelligence for fleet-scale multi-agent operations. Give it a high-level task, and it automatically decomposes, coordinates, and executes using specialized agents.

## Single Command for Complex Work

```bash
/orchestrate "Migrate email templates to pattern system"
```

**What happens:**
1. **Analyzes** your request (goal, deliverable, complexity)
2. **Decomposes** into 4-8 atomic tasks
3. **Spawns** appropriate agents (scouts, planners, builders, reviewers)
4. **Coordinates** execution (sequential/parallel/mixed chaining)
5. **Monitors** progress via telemetry
6. **Aggregates** results into final deliverable
7. **Cleans up** all agents (temporary workers)

## Orchestration Examples

### Example 1: Migration Task

```bash
/orchestrate "Migrate email templates to pattern system"

# Orchestrator creates:
# 1. Scout (haiku, 10 min) - Find all email template files
# 2. Planner (sonnet, 20 min) - Design migration strategy
# 3. Builder (sonnet, 60 min) - Execute migration
# 4. Reviewer (sonnet, 10 min) - Validate patterns

# Result: 4 pattern files, $0.42, 78 minutes (2.3x faster than manual)
```

### Example 2: Strategy Development

```bash
/orchestrate "Analyze Q4 performance and create Q1 strategy" --max-time 90

# Orchestrator creates (parallel research):
# 1. Analyst (sonnet, 30 min) - Analyze Q4 metrics
# 2. Scout (haiku, 15 min) - Research market trends
# Then sequential:
# 3. Growth Hacker (sonnet, 20 min) - Identify opportunities
# 4. Planner (sonnet, 45 min) - Create Q1 strategy
# 5-6. Reviewers (sonnet, 10 min each) - Validate financials & brand alignment

# Result: Q1 strategy with budget allocation, 107 minutes, $1.08
```

### Example 3: Content at Scale

```bash
/orchestrate "Create 10 LinkedIn posts about our new AI product"

# Orchestrator creates:
# 1. Content Strategist (sonnet, 15 min) - Define messaging angles
# 2-4. Copywriters (haiku, 20 min each, parallel) - Write posts 1-10
# 5. Brand Strategist (sonnet, 10 min) - Review consistency

# Result: 10 posts with 3 variants each (30 total), $0.46, 50 minutes (4.8x faster)
```

## Orchestrate Options

```bash
/orchestrate "{task}" --task-name {dev-docs} --max-cost {usd} --max-time {min} --mode {auto|interactive}
```

**--task-name**: Link to dev docs (auto-loads plan/context/tasks)
```bash
/create-dev-docs homepage-redesign
/orchestrate "Redesign homepage" --task-name homepage-redesign
```

**--max-cost**: Budget limit (default: $2.00)
```bash
/orchestrate "Analyze data" --max-cost 0.50  # Abort if exceeds $0.50
```

**--max-time**: Time limit (default: 120 min)
```bash
/orchestrate "Quick analysis" --max-time 30  # Optimize for speed
```

**--mode**: Execution mode (default: auto)
```bash
/orchestrate "Critical migration" --mode interactive
# Pauses for approval at each phase (high-stakes work)
```

## Manual Agent Control (CRUD)

For fine-grained control, create agents manually:

### Create Agent

```bash
/agent-create {agent-type} "{prompt}" --model {haiku|sonnet|opus} --timeout {min} --priority {low|normal|high}
```

**13 Agent Types:**
- **scout** (haiku) - Codebase exploration ($0.01-0.05)
- **planner** (sonnet) - Strategic planning ($0.10-0.25)
- **builder** (sonnet) - Implementation ($0.20-0.50)
- **reviewer** (sonnet) - Quality validation ($0.05-0.15)
- **copywriter** (haiku/sonnet) - Content creation ($0.05-0.20)
- **analyst** (sonnet) - Data analysis ($0.15-0.40)
- **growth-hacker** (sonnet) - Growth optimization ($0.10-0.30)
- **llm-seo-expert**, **brand-strategist**, **content-strategist**, **automation-expert**, **viral-expert**, **devops-architect**

### Check Status

```bash
/agent-status {agent-id}  # Quick status
/observe {agent-id}       # Full dashboard
```

### View Results

```bash
/background-results {agent-id}
```

### Kill Agent

```bash
/agent-kill {agent-id}  # If stuck or runaway
```

### Cleanup (CRITICAL)

```bash
/agent-cleanup              # Delete all completed agents
/agent-cleanup --all        # Delete completed + failed
/agent-cleanup --older-than 24  # Delete agents > 24h old
```

**⚠️ IMPORTANT:** Agents are temporary workers. Always cleanup after tasks complete!

## When to Use What

**Use `/orchestrate` for:**
- ✅ Complex multi-agent workflows (3+ agents)
- ✅ When you want automatic coordination
- ✅ High-level tasks ("migrate X to Y", "analyze and create strategy")
- ✅ When you trust the system to decompose correctly

**Use `/workflow` for:**
- ✅ When you know the pattern (scout-plan-build)
- ✅ Structured workflows with clear phases
- ✅ When you want explicit control over pattern

**Use `/agent-create` for:**
- ✅ Single agents (no coordination needed)
- ✅ Manual control over chaining
- ✅ Testing specific agent types
- ✅ Custom workflows not covered by patterns

**Use direct tools for:**
- ✅ Simple single-step tasks (Read, Write, Edit, Grep)
- ✅ Quick file operations
- ✅ Interactive work

## Cost Optimization

### 1. Model Selection

- Scouts → **Haiku** (75% cheaper, $0.01-0.05)
- Strategy/Implementation → **Sonnet** ($0.10-0.50)
- Rarely use **Opus** (5x more expensive)

### 2. Context Priming

```bash
/prime content  # Before spawning copywriters
```
Saves 5-9K tokens (34% reduction) = 20-30% cost savings

### 3. Task Batching

Group similar tasks for same agent = 20% savings via shared context

### 4. Two-Stage Workflows

```bash
# Haiku generates 10 variants → Sonnet picks best 3
# 33% savings vs using Sonnet for all generation
```

## Observability & Cost Tracking

### Monitor Fleet

```bash
/observe all                # All active agents (compact view)
/observe summary            # Aggregate metrics
/observe {agent-id}         # Single agent (full dashboard)
```

### Track Costs

```bash
/cost-report                # All agents
/cost-report today          # Today's agents
/cost-report week           # This week
/cost-report analyst        # By agent type
/cost-report optimize       # Optimization recommendations only
```

**Cost Report Shows:**
- Total cost ($USD), average per agent
- Breakdown by agent type, model, category
- Daily trends (7-day view)
- Budget tracking (daily/weekly/monthly)
- 4 optimization types (30-50% savings potential)

---

**See also:** `/load workflows` for workflow integration, `/load agents` for agent types
**Load this file:** `/load orchestrator`
