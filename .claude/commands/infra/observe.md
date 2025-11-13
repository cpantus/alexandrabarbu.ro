# Observe Command - Agent Observability Dashboard

👀 **Purpose:** Display real-time observability dashboard for background agents

**Created:** 2025-11-04 (Phase 19.1)

---

## Command Syntax

```bash
/observe [agent-id]     # Display dashboard for specific agent
/observe all            # Display dashboard for all active agents
/observe summary        # Display aggregate metrics across all agents
```

---

## What This Command Does

The `/observe` command provides a comprehensive real-time dashboard for monitoring background agents. It reads agent status and telemetry data, then displays it in a formatted terminal UI.

**Data Sources:**
- Agent status: `/tmp/agents/agent-{id}-status.json`
- Agent telemetry: `/tmp/agents/telemetry/agent-{id}-telemetry.json`
- Agent registry: `/tmp/agents/registry.json`

**Dashboard Components:**
- **Status** - Running time, current status, progress
- **Context Usage** - Tokens used, percentage of 200K context window, trend
- **Tool Calls** - Total calls, breakdown by type (Read, Write, Bash, Grep, etc.)
- **Cost Tracking** - Input/output tokens, USD cost, cost per minute
- **Assets** - Files consumed (read) vs produced (written)
- **Performance** - Tokens/sec, tools/min, efficiency score
- **Current Activity** - Latest tool call, thinking status

---

## Usage Examples

### Example 1: Observe Single Agent

```bash
/observe agent-abc123
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Agent: analyst (ID: abc123)                                     │
├─────────────────────────────────────────────────────────────────┤
│ Status: Running (3m 24s)                                        │
│ Progress: Analyzing Q4 campaign metrics...                      │
├─────────────────────────────────────────────────────────────────┤
│ CONTEXT USAGE                                                   │
│   Current: 87,234 / 200,000 tokens (43.6%)                     │
│   Trend: ↑ +12K in last 2 minutes                              │
│   Peak: 91,450 tokens (45.7%)                                   │
├─────────────────────────────────────────────────────────────────┤
│ TOOL CALLS (Total: 12)                                          │
│   Read: 6 calls                                                 │
│   Bash: 3 calls                                                 │
│   Write: 2 calls                                                │
│   Grep: 1 call                                                  │
│   Last: Read (data/q4-metrics.csv) - 15 seconds ago            │
├─────────────────────────────────────────────────────────────────┤
│ COST TRACKING                                                   │
│   Input: 87,234 tokens ($0.262)                                │
│   Output: 15,421 tokens ($0.231)                               │
│   Total Cost: $0.493                                            │
│   Cost/Min: $0.145                                              │
│   Projected: ~$0.725 if continues at current rate              │
├─────────────────────────────────────────────────────────────────┤
│ ASSETS                                                           │
│   Consumed (Read):                                              │
│     • data/q4-metrics.csv (1.2 MB)                             │
│     • skills/marketing-analytics.md (45 KB)                     │
│     • .claude/priming/analysis-context.md (38 KB)              │
│                                                                  │
│   Produced (Write):                                              │
│     • reports/q4-analysis-draft.md (18 KB)                      │
├─────────────────────────────────────────────────────────────────┤
│ PERFORMANCE METRICS                                              │
│   Tokens/sec: 426                                               │
│   Tools/min: 3.5                                                │
│   Efficiency: 89% (high)                                        │
│   Thinking Time: 42s total (20% of runtime)                     │
├─────────────────────────────────────────────────────────────────┤
│ CURRENT ACTIVITY                                                 │
│   Thinking: Calculating funnel drop-off rates by persona...     │
│   Duration: 8 seconds                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

### Example 2: Observe All Active Agents

```bash
/observe all
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────┐
│ ACTIVE AGENTS (3)                                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 1. analyst (abc123) - Running (3m 24s)                         │
├─────────────────────────────────────────────────────────────────┤
│ Context: 87,234 tokens (43.6%) | Cost: $0.493 | Tools: 12      │
│ Progress: Analyzing Q4 campaign metrics...                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 2. copywriter (def456) - Running (1m 52s)                      │
├─────────────────────────────────────────────────────────────────┤
│ Context: 45,678 tokens (22.8%) | Cost: $0.187 | Tools: 8       │
│ Progress: Writing LinkedIn posts for Q4 results...             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 3. scout (ghi789) - Running (0m 38s)                           │
├─────────────────────────────────────────────────────────────────┤
│ Context: 12,345 tokens (6.2%) | Cost: $0.042 | Tools: 15       │
│ Progress: Searching for authentication code patterns...         │
└─────────────────────────────────────────────────────────────────┘

Total Cost: $0.722 | Avg Context: 24.2% | Total Tools: 35
```

---

### Example 3: Aggregate Summary

```bash
/observe summary
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────┐
│ AGENT FLEET SUMMARY                                             │
├─────────────────────────────────────────────────────────────────┤
│ Active Agents: 3                                                │
│ Completed Today: 8                                              │
│ Failed Today: 1                                                 │
│ Success Rate: 89% (8/9)                                         │
├─────────────────────────────────────────────────────────────────┤
│ AGGREGATE METRICS                                                │
│   Total Context: 145,257 tokens (avg: 24.2% per agent)         │
│   Total Cost: $0.722 (active) + $2.145 (completed) = $2.867    │
│   Total Tools: 35 (active) + 142 (completed) = 177             │
│   Avg Runtime: 2m 18s (active), 8m 45s (completed)             │
├─────────────────────────────────────────────────────────────────┤
│ COST BREAKDOWN                                                   │
│   Input Tokens: 402,156 tokens ($1.206)                        │
│   Output Tokens: 110,432 tokens ($1.657)                       │
│   Total: $2.867                                                 │
├─────────────────────────────────────────────────────────────────┤
│ TOOL USAGE (ALL AGENTS)                                         │
│   Read: 78 calls (44%)                                          │
│   Bash: 42 calls (24%)                                          │
│   Write: 31 calls (18%)                                         │
│   Grep: 18 calls (10%)                                          │
│   Edit: 8 calls (4%)                                            │
├─────────────────────────────────────────────────────────────────┤
│ PERFORMANCE                                                      │
│   Avg Tokens/sec: 387                                           │
│   Avg Tools/min: 4.2                                            │
│   Avg Efficiency: 86%                                           │
├─────────────────────────────────────────────────────────────────┤
│ TOP ASSETS CONSUMED                                              │
│   1. skills/marketing-analytics.md (5 agents)                   │
│   2. skills/brand-voice-guidelines.md (3 agents)                │
│   3. data/q4-metrics.csv (2 agents)                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Notes

### Reading Agent Data

```typescript
// Read agent status
const statusPath = `/tmp/agents/agent-${agentId}-status.json`;
const status = JSON.parse(await fs.readFile(statusPath, 'utf-8'));

// Read agent telemetry
const telemetryPath = `/tmp/agents/telemetry/agent-${agentId}-telemetry.json`;
const telemetry = JSON.parse(await fs.readFile(telemetryPath, 'utf-8'));

// Combine for dashboard
const dashboardData = {
  id: agentId,
  type: status.type,
  status: status.status,
  prompt: status.prompt,
  runtime: Date.now() - status.startTime,
  context: telemetry.contextUsage,
  tools: telemetry.toolCalls,
  cost: telemetry.cost,
  assets: telemetry.fileAccess,
  performance: telemetry.performance,
  currentActivity: telemetry.events[telemetry.events.length - 1]
};
```

### Dashboard Formatting

**Use the `.claude/utils/dashboard-formatter.ts` utility:**

```typescript
import { formatAgentDashboard } from '../utils/dashboard-formatter';

const dashboard = formatAgentDashboard(dashboardData);
console.log(dashboard);
```

**Box Drawing Characters:**
- `┌─┐` (top border)
- `├─┤` (section separator)
- `└─┘` (bottom border)
- `│` (vertical border)

**Color Coding:**
- Status "running" → Green
- Status "completed" → Blue
- Status "failed" → Red
- Context <50% → Green
- Context 50-75% → Yellow
- Context >75% → Red

---

## Dashboard Sections

### 1. Header
- Agent type and ID
- Status and runtime
- Current progress/prompt (truncated to 60 chars)

### 2. Context Usage
- Current tokens (absolute + percentage)
- Trend (increase/decrease in last N minutes)
- Peak tokens (max reached)

### 3. Tool Calls
- Total count
- Breakdown by type (Read, Write, Bash, Grep, Edit, etc.)
- Last tool call (type, target, time ago)

### 4. Cost Tracking
- Input tokens + cost
- Output tokens + cost
- Total cost
- Cost per minute
- Projected cost (if continues at current rate)

### 5. Assets
- Consumed: Files read (name, size)
- Produced: Files written (name, size)

### 6. Performance Metrics
- Tokens/sec (throughput)
- Tools/min (activity rate)
- Efficiency score (% time in tool calls vs thinking)
- Thinking time (total, % of runtime)

### 7. Current Activity
- Latest event (thinking, tool call, etc.)
- Duration

---

## Error Handling

### Agent Not Found
```
Error: Agent 'abc123' not found.

Use `/background-status` to see all active agents, or check if the agent has already completed.
```

### No Active Agents
```
No active agents found.

Use `/background [agent-type] [prompt]` to spawn a new agent.
```

### Telemetry Not Available
```
Warning: Telemetry data for agent 'abc123' is incomplete.

This may be because the agent just started (telemetry initializes after first tool call).
Displaying available data...

[Partial dashboard with available fields]
```

---

## Integration Points

### Phase 18.5: Background Agents
- Reads agent status created by background-agent.ts hook
- Requires agent registry at `/tmp/agents/registry.json`

### Phase 18.6: Agent Telemetry
- Reads telemetry data created by agent-telemetry.ts hook
- Requires telemetry files at `/tmp/agents/telemetry/`

### Phase 19.2: Telemetry Enhancement (NEXT)
- Will add real-time status updates
- Will add asset tracking improvements
- Will add performance metrics calculations

### Phase 19.3: Cost Tracking (NEXT)
- `/observe` provides per-agent cost data
- `/cost-report` will aggregate costs across all agents

---

## Performance Considerations

**Dashboard Overhead:**
- Target: <100ms to generate dashboard
- File reads: 2 per agent (status + telemetry)
- Formatting: ~10ms for terminal UI generation

**Refresh Rate:**
- Manual refresh (user re-runs command)
- Future: Consider `/observe --watch` for auto-refresh every 5s

**Memory Usage:**
- Loads 1-3 agents' data into memory (~60 KB per agent)
- Summary mode: Loads all agents (~200 KB for 10 agents)

---

## Success Criteria

✅ **Functional Requirements:**
- Display single agent dashboard with all sections
- Display all active agents in compact view
- Display aggregate summary across fleet
- Handle missing/incomplete data gracefully

✅ **Performance Requirements:**
- <100ms dashboard generation
- <1 second for `/observe all` with 10 agents
- <2 seconds for `/observe summary` with 20 agents

✅ **User Experience:**
- Clear, readable terminal formatting
- Color-coded status indicators
- Helpful error messages
- Actionable insights (e.g., "projected cost if continues")

---

## Future Enhancements (Post-Phase 19)

### Phase 20: Orchestrator Integration
- Add orchestrator-level dashboard showing task → agents hierarchy
- Show agent chaining (scout → planner → builder)

### Phase 21: Dedicated Server
- Add `/observe` support for remote agents (via HTTP API)
- Add historical dashboards (view completed agent data)

### v5.0: Advanced Observability
- `/observe --watch` for auto-refresh
- Comparative dashboards (agent A vs agent B)
- Anomaly detection (flag unusual cost/context spikes)
- Performance recommendations (suggest cheaper models)

---

## Examples of Use Cases

### Use Case 1: Monitor Long-Running Agent
```bash
# Spawn analyst agent
/background analyst "Analyze Q4 campaign data and create report"

# Check initial status
/background-status agent-abc123
  → Running (0m 15s), no detailed metrics yet

# Wait 2 minutes, then observe
/observe agent-abc123
  → See: Context at 43%, cost $0.49, thinking about funnel analysis

# Continue monitoring every few minutes
# If context >75%, consider cancelling and optimizing prompt
```

---

### Use Case 2: Compare Multiple Agents
```bash
# Spawn 3 agents in parallel
/background analyst "Analyze Q4 metrics"
/background copywriter "Write Q4 blog post"
/background scout "Find all analytics code"

# Check fleet status
/observe all
  → See: Analyst using 43% context, copywriter 22%, scout 6%
  → Insight: Scout is most efficient (low context, high tool usage)
```

---

### Use Case 3: Cost Monitoring
```bash
# Spawn expensive agent (Sonnet on large task)
/background analyst "Deep analysis of 12 months of campaign data"

# Monitor cost
/observe agent-abc123
  → See: Cost $0.49, projected $2.87 if continues
  → Decision: Let it run (under $3 budget) or kill it (over budget)

# View aggregate cost
/observe summary
  → See: Total cost today $2.87 across 9 agents
  → Decision: Stay under $5/day budget, proceed with more work
```

---

## Technical Implementation

### Step 1: Read Agent Registry
```typescript
const registry = JSON.parse(await fs.readFile('/tmp/agents/registry.json', 'utf-8'));
const activeAgents = registry.agents.filter(a => a.status === 'running');
```

### Step 2: Read Agent Status + Telemetry
```typescript
for (const agent of activeAgents) {
  const status = await readAgentStatus(agent.id);
  const telemetry = await readAgentTelemetry(agent.id);
  const dashboardData = combineDashboardData(status, telemetry);
  // ... format and display
}
```

### Step 3: Format Dashboard
```typescript
import { formatAgentDashboard } from '../utils/dashboard-formatter';
const dashboard = formatAgentDashboard(dashboardData);
```

### Step 4: Display
```typescript
console.log(dashboard);
```

---

## Testing Checklist

- [ ] Test `/observe [agent-id]` with running agent
- [ ] Test `/observe [agent-id]` with completed agent
- [ ] Test `/observe [agent-id]` with failed agent
- [ ] Test `/observe [agent-id]` with agent-id that doesn't exist
- [ ] Test `/observe all` with 0 active agents
- [ ] Test `/observe all` with 1 active agent
- [ ] Test `/observe all` with 5+ active agents
- [ ] Test `/observe summary` with mixed statuses (running, completed, failed)
- [ ] Test dashboard formatting (box drawing characters display correctly)
- [ ] Test color coding (status indicators)
- [ ] Test performance (<100ms single agent, <2s summary)
- [ ] Test with incomplete telemetry data (graceful degradation)
- [ ] Test with missing status file (error handling)

---

**Command Status:** Ready for implementation
**Dependencies:** Phase 18.5 (background agents), Phase 18.6 (telemetry)
**Next Steps:** Implement `.claude/utils/dashboard-formatter.ts` utility
