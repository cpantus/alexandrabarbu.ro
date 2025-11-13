# Cost Report Command - Agent Cost Analysis & Optimization

💰 **Purpose:** Generate comprehensive cost reports for background agent execution with optimization recommendations

**Created:** 2025-11-04 (Phase 19.3)

---

## Command Syntax

```bash
/cost-report                    # Full cost report (all time)
/cost-report today              # Today's costs only
/cost-report week               # Last 7 days
/cost-report month              # Last 30 days
/cost-report [agent-type]       # Costs for specific agent type
/cost-report optimize           # Show optimization recommendations only
/cost-report bash               # Bash optimization metrics only
```

---

## What This Command Does

The `/cost-report` command analyzes agent execution costs across all background agents (active, completed, and failed) and provides:

1. **Aggregate cost metrics** - Total spend, average per agent, cost breakdown
2. **Cost by agent type** - Which agent types are most/least expensive
3. **Cost by task category** - Content creation, analysis, strategy, etc.
4. **Trend analysis** - Daily/weekly spending patterns
5. **Bash optimization metrics** - Token savings from CLI tool optimizations
6. **Optimization recommendations** - Specific actions to reduce costs

**Data Sources:**
- Agent telemetry: `/tmp/agents/telemetry/agent-{id}-telemetry.json`
- Agent status: `/tmp/agents/agent-{id}-status.json`
- Agent registry: `/tmp/agents/registry.json`

---

## Usage Examples

### Example 1: Full Cost Report

```bash
/cost-report
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────┐
│ AGENT COST REPORT - ALL TIME                                    │
├─────────────────────────────────────────────────────────────────┤
│ Report Period: 2025-10-28 to 2025-11-04 (7 days)              │
│ Generated: 2025-11-04 14:32:15                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SUMMARY                                                          │
├─────────────────────────────────────────────────────────────────┤
│ Total Agents: 42 (3 active, 37 completed, 2 failed)            │
│ Total Cost: $18.452                                             │
│ Average Cost/Agent: $0.439                                      │
│ Daily Avg: $2.636                                               │
├─────────────────────────────────────────────────────────────────┤
│ Input Tokens: 2,847,123 ($8.541)                               │
│ Output Tokens: 661,234 ($9.919)                                │
│ Input/Output Ratio: 4.3:1                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ COST BY AGENT TYPE (Top 5)                                      │
├─────────────────────────────────────────────────────────────────┤
│ 1. analyst         12 runs    $7.234 (39%)    $0.603/run      │
│ 2. copywriter       8 runs    $4.123 (22%)    $0.515/run      │
│ 3. planner          6 runs    $3.456 (19%)    $0.576/run      │
│ 4. builder          5 runs    $2.234 (12%)    $0.447/run      │
│ 5. scout           11 runs    $1.405 (8%)     $0.128/run ✓    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ COST BY TASK CATEGORY                                            │
├─────────────────────────────────────────────────────────────────┤
│ Content Creation:    15 agents    $6.234 (34%)    $0.416/agent │
│ Data Analysis:       12 agents    $7.234 (39%)    $0.603/agent │
│ Strategy Planning:    6 agents    $3.456 (19%)    $0.576/agent │
│ Codebase Search:     11 agents    $1.405 (8%)     $0.128/agent │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ COST BY MODEL                                                    │
├─────────────────────────────────────────────────────────────────┤
│ Sonnet (38 agents):  $16.891 (92%)    $0.445/agent             │
│ Haiku (4 agents):    $1.561 (8%)      $0.390/agent             │
│ Opus (0 agents):     $0.000 (0%)      N/A                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ DAILY BREAKDOWN (Last 7 Days)                                   │
├─────────────────────────────────────────────────────────────────┤
│ 2025-11-04 (Today):     6 agents    $3.124 ███████░░░          │
│ 2025-11-03:             8 agents    $4.234 ██████████          │
│ 2025-11-02:             5 agents    $2.123 █████░░░░░          │
│ 2025-11-01:             7 agents    $3.456 ████████░░          │
│ 2025-10-31:             4 agents    $1.890 ████░░░░░░          │
│ 2025-10-30:             6 agents    $2.340 █████░░░░░          │
│ 2025-10-29:             6 agents    $1.285 ███░░░░░░░          │
│                                                                  │
│ Trend: ↑ +23% vs previous week                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ OPTIMIZATION RECOMMENDATIONS                                     │
├─────────────────────────────────────────────────────────────────┤
│ 1. HIGH IMPACT: Use Haiku for scout agents                     │
│    • Scouts average $0.576 on Sonnet, $0.128 on Haiku         │
│    • Potential savings: $4.92/week (~38% reduction)            │
│                                                                  │
│ 2. MEDIUM IMPACT: Enable context priming for analysts          │
│    • Analysts using 89K tokens avg, 45% on skill loading       │
│    • Priming could reduce to 55K tokens (~34% savings)         │
│    • Potential savings: $2.15/week                             │
│                                                                  │
│ 3. MEDIUM IMPACT: Use cheaper models for copywriters           │
│    • Copywriters avg $0.515, could use Haiku for drafts        │
│    • Run Haiku draft → Sonnet review (2-stage approach)        │
│    • Potential savings: $1.87/week                             │
│                                                                  │
│ 4. LOW IMPACT: Batch similar tasks                             │
│    • 3 content agents ran same day with similar prompts        │
│    • Could batch into single agent with multiple outputs       │
│    • Potential savings: $0.85/week                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PROJECTED SAVINGS                                                │
├─────────────────────────────────────────────────────────────────┤
│ Current Weekly Cost: $18.452                                    │
│ With Optimizations:  $8.662 (-53%)                             │
│ Annual Savings:      ~$509                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

### Example 2: Today's Costs

```bash
/cost-report today
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────┐
│ AGENT COST REPORT - TODAY                                       │
├─────────────────────────────────────────────────────────────────┤
│ Date: 2025-11-04                                                │
│ Agents: 6 (3 active, 3 completed)                              │
│ Total Cost: $3.124                                              │
│ Avg Cost/Agent: $0.521                                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ AGENT BREAKDOWN                                                  │
├─────────────────────────────────────────────────────────────────┤
│ 1. analyst (abc123)     Running     $0.493    3m 24s           │
│ 2. copywriter (def456)  Running     $0.187    1m 52s           │
│ 3. scout (ghi789)       Running     $0.042    0m 38s           │
│ 4. analyst (jkl012)     Completed   $0.876    12m 45s          │
│ 5. planner (mno345)     Completed   $0.734    8m 12s           │
│ 6. builder (pqr678)     Completed   $0.792    15m 33s          │
└─────────────────────────────────────────────────────────────────┘

Budget Status: $3.12 / $10.00 daily budget (31% used) ✓
```

---

### Example 3: Cost by Agent Type

```bash
/cost-report analyst
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────┐
│ COST REPORT: ANALYST AGENTS                                     │
├─────────────────────────────────────────────────────────────────┤
│ Total Runs: 12                                                  │
│ Total Cost: $7.234                                              │
│ Average Cost: $0.603/run                                        │
│ Min Cost: $0.342 | Max Cost: $1.234                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ COST DISTRIBUTION                                                │
├─────────────────────────────────────────────────────────────────┤
│ < $0.40:    2 runs (17%)    ██░░░░░░░░                         │
│ $0.40-0.60: 5 runs (42%)    ████████░░                         │
│ $0.60-0.80: 3 runs (25%)    █████░░░░░                         │
│ $0.80-1.00: 1 run  (8%)     ██░░░░░░░░                         │
│ > $1.00:    1 run  (8%)     ██░░░░░░░░                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ MOST EXPENSIVE RUNS                                              │
├─────────────────────────────────────────────────────────────────┤
│ 1. Q4 metrics deep dive    $1.234    18m 45s    142K tokens    │
│ 2. Campaign attribution    $0.987    15m 12s    128K tokens    │
│ 3. Cohort analysis         $0.876    12m 45s    112K tokens    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ OPTIMIZATION OPPORTUNITIES                                       │
├─────────────────────────────────────────────────────────────────┤
│ • 89% of analyst cost is input tokens (context loading)        │
│ • Enable /prime analysis before spawning analysts              │
│ • Use /mcp-load analysis profile (8-12K token savings)         │
│ • Estimated savings: ~$2.15/week (30% reduction)               │
└─────────────────────────────────────────────────────────────────┘
```

---

### Example 4: Bash Optimization Metrics

```bash
/cost-report bash
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────┐
│ BASH OPTIMIZATION REPORT                                         │
├─────────────────────────────────────────────────────────────────┤
│ Report Period: All Time                                          │
│ Generated: 2025-11-07 16:45:00                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SUMMARY                                                          │
├─────────────────────────────────────────────────────────────────┤
│ Total Optimizations: 234                                        │
│ Total Tokens Saved: 142,350 tokens                             │
│ Average Savings: 608 tokens/optimization                       │
│ Estimated Cost Savings: $0.43 (session-level)                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SAVINGS BY TOOL                                                  │
├─────────────────────────────────────────────────────────────────┤
│ 1. ripgrep (rg)      89 uses    85,240 tokens (60%)    958/use  │
│ 2. fd                52 uses    28,600 tokens (20%)    550/use  │
│ 3. bat               38 uses    14,250 tokens (10%)    375/use  │
│ 4. exa               28 uses     5,840 tokens (4%)     209/use  │
│ 5. tree              18 uses     6,120 tokens (4%)     340/use  │
│ 6. gh                 9 uses     2,300 tokens (2%)     256/use  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ TOP 10 OPTIMIZATIONS (Highest Token Savings)                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. grep -r "error" . → rg "error" .           3,240 tokens     │
│ 2. find . -name "*.ts" | xargs grep "fn"      2,850 tokens     │
│    → fd -e ts . | xargs rg "fn"                                │
│ 3. tree -L 5 → tree -L 2 -I 'node_modules'    2,340 tokens     │
│ 4. grep -r "import" src/ → rg "import" src/   1,920 tokens     │
│ 5. find . -type f -name "*.md"                1,680 tokens     │
│    → fd -e md .                                                 │
│ 6. cat large-file.ts → bat --line-range...    1,450 tokens     │
│ 7. grep -r "export" . → rg "export" .         1,340 tokens     │
│ 8. find . -name "test*" → fd "test"           1,120 tokens     │
│ 9. ls -la --recursive → exa --git -la         980 tokens       │
│ 10. tree → tree -L 2 -I 'node_modules'        875 tokens       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ OPTIMIZATION RATE (Last 7 Days)                                 │
├─────────────────────────────────────────────────────────────────┤
│ 2025-11-07 (Today):    42 optimizations    25,440 tokens saved │
│ 2025-11-06:            38 optimizations    23,104 tokens saved │
│ 2025-11-05:            35 optimizations    21,280 tokens saved │
│ 2025-11-04:            29 optimizations    17,632 tokens saved │
│ 2025-11-03:            31 optimizations    18,848 tokens saved │
│ 2025-11-02:            27 optimizations    16,416 tokens saved │
│ 2025-11-01:            32 optimizations    19,456 tokens saved │
│                                                                  │
│ Trend: ↑ +15% vs previous week                                 │
│ Hook Performance: <50ms avg (✓ under target)                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SESSION IMPACT                                                   │
├─────────────────────────────────────────────────────────────────┤
│ Before Optimization:    330,000 tokens/session                  │
│ After Optimization:     150,000 tokens/session                  │
│ Net Savings:            180,000 tokens (55%)                    │
│ Cost Reduction:         $0.28/session (56%)                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ MOST OPTIMIZED AGENTS                                            │
├─────────────────────────────────────────────────────────────────┤
│ 1. scout-haiku         52 optimizations    31,200 tokens saved  │
│ 2. analyst             38 optimizations    22,800 tokens saved  │
│ 3. content-strategist  29 optimizations    17,400 tokens saved  │
│ 4. automation-expert   24 optimizations    14,400 tokens saved  │
│ 5. copywriter-haiku    18 optimizations    10,800 tokens saved  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PERFORMANCE METRICS                                              │
├─────────────────────────────────────────────────────────────────┤
│ Hook Execution Time:                                            │
│   Average: 38ms                                                  │
│   Median: 32ms                                                   │
│   95th Percentile: 62ms                                         │
│   Max: 89ms                                                      │
│   Performance Status: ✓ All under 100ms threshold              │
│                                                                  │
│ Tool Availability:                                               │
│   rg: ✓ Available  │  fd: ✓ Available  │  bat: ✓ Available    │
│   exa: ✓ Available │  tree: ✓ Available │  gh: ✓ Available    │
│   fzf: ✓ Available │  zoxide: ✓ Available                      │
└─────────────────────────────────────────────────────────────────┘
```

---

### Example 5: Optimization Recommendations Only

```bash
/cost-report optimize
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────┐
│ COST OPTIMIZATION RECOMMENDATIONS                                │
├─────────────────────────────────────────────────────────────────┤
│ Based on 42 agents analyzed (7 days of data)                   │
│ Total Current Cost: $18.452                                     │
│ Potential Savings: $9.79/week (53%)                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 1. USE HAIKU FOR SCOUT AGENTS (HIGH IMPACT)                    │
├─────────────────────────────────────────────────────────────────┤
│ Issue:   11 scout agents used Sonnet model ($0.576 avg cost)   │
│ Fix:     Change default scout model to Haiku                   │
│ Command: /background scout "..." --model haiku                  │
│ Savings: $4.92/week (38% of scout costs)                       │
│ Quality: No impact (scouts only search, don't need reasoning)  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 2. ENABLE CONTEXT PRIMING FOR ANALYSTS (MEDIUM IMPACT)         │
├─────────────────────────────────────────────────────────────────┤
│ Issue:   Analysts load full skills (89K tokens avg)            │
│          45% of input tokens are skill loading                  │
│ Fix:     Use /prime analysis before spawning analysts          │
│ Command: /prime analysis && /background analyst "..."           │
│ Savings: $2.15/week (reduces context 34%)                      │
│ Quality: No impact (priming provides same knowledge)           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 3. TWO-STAGE COPYWRITING (MEDIUM IMPACT)                       │
├─────────────────────────────────────────────────────────────────┤
│ Issue:   Copywriters use Sonnet for all drafts ($0.515 avg)    │
│ Fix:     Draft with Haiku, review with Sonnet                  │
│ Command: /background copywriter "draft" --model haiku           │
│          /background brand-strategist "review draft"            │
│ Savings: $1.87/week (36% reduction)                            │
│ Quality: Slight improvement (Sonnet reviews ensure quality)    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 4. BATCH SIMILAR TASKS (LOW IMPACT)                            │
├─────────────────────────────────────────────────────────────────┤
│ Issue:   3 content agents ran same day with similar prompts    │
│          Could batch into single agent with multiple outputs    │
│ Fix:     Combine prompts: "Create 3 LinkedIn posts about..."   │
│ Savings: $0.85/week (avoids duplicate context loading)         │
│ Quality: Same or better (more consistent voice)                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ IMPLEMENTATION PRIORITY                                          │
├─────────────────────────────────────────────────────────────────┤
│ Week 1: Implement #1 (Haiku for scouts)                        │
│         → Immediate 38% scout cost reduction                    │
│         → No workflow changes needed                            │
│                                                                  │
│ Week 2: Implement #2 (Context priming)                         │
│         → Update workflows to /prime before /background         │
│         → 34% analyst cost reduction                            │
│                                                                  │
│ Week 3: Implement #3 (Two-stage copywriting)                   │
│         → Create draft-review workflow pattern                  │
│         → 36% copywriter cost reduction                         │
│                                                                  │
│ Week 4: Implement #4 (Batching)                                │
│         → Identify batchable tasks daily                        │
│         → Combine into single prompts                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Cost Analysis Methodology

### 1. Data Collection
```typescript
// Read all agent telemetry files
const telemetryFiles = await fs.readdir('/tmp/agents/telemetry/');
const allTelemetry = await Promise.all(
  telemetryFiles.map(file => readTelemetryFile(file))
);

// Filter by time period
const filtered = allTelemetry.filter(t =>
  t.startTime >= startDate && t.startTime <= endDate
);
```

### 2. Cost Calculation
```typescript
// Per-agent cost
function calculateAgentCost(telemetry: AgentTelemetry): AgentCost {
  const model = telemetry.model;
  const pricing = MODEL_PRICING[model];

  const inputCost = (telemetry.inputTokens / 1_000_000) * pricing.input;
  const outputCost = (telemetry.outputTokens / 1_000_000) * pricing.output;

  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    inputTokens: telemetry.inputTokens,
    outputTokens: telemetry.outputTokens,
  };
}

// Aggregate costs
function aggregateCosts(costs: AgentCost[]): AggregateCost {
  return costs.reduce((acc, cost) => ({
    totalCost: acc.totalCost + cost.totalCost,
    inputTokens: acc.inputTokens + cost.inputTokens,
    outputTokens: acc.outputTokens + cost.outputTokens,
    // ... more aggregations
  }), { totalCost: 0, inputTokens: 0, outputTokens: 0 });
}
```

### 3. Optimization Analysis
```typescript
// Identify optimization opportunities
function analyzeOptimizations(telemetry: AgentTelemetry[]): Optimization[] {
  const optimizations: Optimization[] = [];

  // Check if scouts are using expensive models
  const scoutCosts = telemetry.filter(t => t.type === 'scout');
  const avgScoutCost = average(scoutCosts.map(s => s.totalCost));
  if (avgScoutCost > 0.20) {
    optimizations.push({
      priority: 'high',
      title: 'Use Haiku for scout agents',
      savings: calculateSavings(scoutCosts, 'haiku'),
      // ... more details
    });
  }

  // Check context usage patterns
  const highContextAgents = telemetry.filter(t => t.contextUsage > 80000);
  if (highContextAgents.length > 3) {
    optimizations.push({
      priority: 'medium',
      title: 'Enable context priming',
      savings: estimatePrimingSavings(highContextAgents),
      // ... more details
    });
  }

  return optimizations;
}
```

---

## Cost Tracking Features

### 1. Budget Alerts
```typescript
// Check if daily/weekly budget exceeded
function checkBudget(totalCost: number, period: 'day' | 'week'): BudgetStatus {
  const budget = period === 'day' ? DAILY_BUDGET : WEEKLY_BUDGET;
  const percentage = (totalCost / budget) * 100;

  if (percentage > 100) {
    return { status: 'exceeded', percentage, message: '⚠️ Budget exceeded!' };
  } else if (percentage > 80) {
    return { status: 'warning', percentage, message: '⚠️ Nearing budget limit' };
  } else {
    return { status: 'ok', percentage, message: '✓ Within budget' };
  }
}
```

### 2. Cost Forecasting
```typescript
// Project costs based on current trends
function forecastCosts(historicalCosts: DailyCost[]): Forecast {
  const avgDailyCost = average(historicalCosts.map(c => c.total));
  const trend = calculateTrend(historicalCosts);

  return {
    nextWeek: avgDailyCost * 7 * (1 + trend),
    nextMonth: avgDailyCost * 30 * (1 + trend),
    confidence: calculateConfidence(historicalCosts),
  };
}
```

### 3. Cost Attribution
```typescript
// Attribute costs to projects/tasks
function attributeCosts(telemetry: AgentTelemetry[]): CostAttribution {
  const byProject: Record<string, number> = {};

  for (const agent of telemetry) {
    // Extract project from prompt or dev docs
    const project = extractProject(agent.prompt);
    byProject[project] = (byProject[project] || 0) + agent.totalCost;
  }

  return byProject;
}
```

---

## Model Pricing (2025 Rates)

```typescript
export const MODEL_PRICING = {
  haiku: {
    input: 0.25,   // $0.25 per 1M tokens
    output: 1.25,  // $1.25 per 1M tokens
  },
  sonnet: {
    input: 3.00,   // $3.00 per 1M tokens
    output: 15.00, // $15.00 per 1M tokens
  },
  opus: {
    input: 15.00,  // $15.00 per 1M tokens
    output: 75.00, // $75.00 per 1M tokens
  },
} as const;
```

---

## Integration Points

### Phase 18.6: Agent Telemetry
- Reads cost data from telemetry files
- Uses cost calculation formulas from telemetry hook

### Phase 19.1: Observability Dashboard
- `/observe` shows per-agent cost
- `/cost-report` shows aggregate cost across all agents

### Phase 19.2: Telemetry Enhancement (NEXT)
- Will add cost accumulation tracking
- Will add budget alert hooks

### Phase 20: Orchestrator
- Orchestrator can check `/cost-report` before spawning agents
- Can make model selection decisions based on cost targets

---

## Success Criteria

✅ **Functional Requirements:**
- Generate cost reports for all time periods (today, week, month, all)
- Break down costs by agent type, task category, model
- Show daily trends with visual bars
- Provide actionable optimization recommendations
- Support budget tracking and alerts

✅ **Performance Requirements:**
- <2 seconds to generate full report (42 agents)
- <500ms to generate today's report
- <100ms to calculate optimization recommendations

✅ **Business Value:**
- Identify 3-5 high-impact optimizations
- Project 30-50% cost savings potential
- Provide implementation roadmap

---

## Future Enhancements (Post-Phase 19)

### Phase 20: Orchestrator Integration
- Auto-apply optimizations (e.g., use Haiku for scouts automatically)
- Cost-aware agent spawning (check budget before launching)

### Phase 21: Dedicated Server
- Historical cost tracking (store in SQLite)
- Cost dashboards (web UI)
- Email alerts for budget thresholds

### v5.0: Advanced Cost Management
- Real-time cost projections (estimate before running agent)
- Cost optimization hooks (automatically switch models mid-execution)
- Cost allocation by team/project

---

## Testing Checklist

- [ ] Test `/cost-report` with no agents
- [ ] Test `/cost-report` with 1 agent
- [ ] Test `/cost-report` with 10+ agents
- [ ] Test `/cost-report today` (boundary: midnight)
- [ ] Test `/cost-report week` (7 days)
- [ ] Test `/cost-report month` (30 days)
- [ ] Test `/cost-report [agent-type]` for each type
- [ ] Test `/cost-report optimize` recommendations
- [ ] Test cost calculations (verify against manual calculation)
- [ ] Test optimization savings projections (realistic estimates)
- [ ] Test budget alerts (80%, 100%, 120% thresholds)
- [ ] Test performance (<2s for 42 agents)

---

**Command Status:** Ready for implementation
**Dependencies:** Phase 18.6 (agent telemetry), Phase 19.1 (dashboard formatter)
**Next Steps:** Implement `.claude/utils/cost-calculator.ts` utility
