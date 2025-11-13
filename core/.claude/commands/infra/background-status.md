# Background Status Command

📊 Check the status and progress of background agents.

## Purpose

Monitor running, completed, or failed background agents to understand their progress, resource usage, and current state.

## Usage

```bash
/background-status [agent-id]
/background-status all
/background-status [agent-type]
/background-status
```

## Parameters

### Modes

1. **Specific Agent** - Check single agent by ID
   ```bash
   /background-status agent-a3f9b2
   ```

2. **All Agents** - List all active agents
   ```bash
   /background-status all
   ```

3. **By Type** - Filter by agent type
   ```bash
   /background-status analyst
   /background-status copywriter
   ```

4. **Current Task** - Show agents for current dev docs task
   ```bash
   /background-status
   ```

## Output Format

### Single Agent Status

```
┌─────────────────────────────────────────────────────────┐
│ Agent: analyst-Q4-metrics                              │
│ ID: agent-a3f9b2                                       │
├─────────────────────────────────────────────────────────┤
│ Status: running                                         │
│ Progress: 67% (2/3 phases complete)                    │
│ Runtime: 12m 34s                                       │
│ Created: 2025-11-04 14:30:15                           │
│                                                         │
│ Context Usage:                                          │
│   87,234 / 200,000 tokens (43.6%)                      │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░         │
│                                                         │
│ Activity:                                               │
│   Tools Called: 14 (Read: 7, Write: 4, Bash: 3)       │
│   Last Tool: Write (2m 15s ago)                        │
│   Current Action: Analyzing funnel drop-offs...        │
│                                                         │
│ Files:                                                  │
│   Consumed:                                             │
│     • data/q4-metrics.csv                              │
│     • skills/marketing-analytics.md                    │
│     • .claude/priming/analysis-context.md              │
│   Produced:                                             │
│     • reports/q4-analysis.md (draft, 2,340 chars)     │
│                                                         │
│ Cost:                                                   │
│   Input tokens: 62,450 ($0.187)                        │
│   Output tokens: 8,230 ($0.247)                        │
│   Total: $0.434                                        │
│                                                         │
│ Output:                                                 │
│   Report: /tmp/agents/agent-a3f9b2-report.md           │
│   Final: reports/q4-analysis.md                        │
│                                                         │
│ Task Association:                                       │
│   Dev Docs: /dev/active/q4-analysis/                   │
│   Last Update: 5m 12s ago                              │
└─────────────────────────────────────────────────────────┘

Commands:
  View results: /background-results agent-a3f9b2
  View live: /observe agent-a3f9b2 (Phase 19)
  Kill agent: /agent-kill agent-a3f9b2 (Phase 20)
```

### All Agents List

```
Background Agents (4 active, 2 completed, 1 failed)
────────────────────────────────────────────────────

Running (3):
  agent-a3f9b2  analyst           Q4 metrics analysis      12m 34s  43.6%  $0.43
  agent-b7e2c1  copywriter        LinkedIn variants        8m 12s   31.2%  $0.22
  agent-d4f8a9  growth-hacker     Growth loop design       15m 47s  58.9%  $0.67

Pending (1):
  agent-e2a5b3  planner           Migration strategy       queued   0%     $0.00

Completed (2):
  agent-c1d6e8  scout             Find templates           4m 23s   ✓      $0.05
  agent-f9b3a7  scout             Find components          3m 51s   ✓      $0.04

Failed (1):
  agent-a8c2d4  builder           Deploy feature           timeout  ✗      $1.23

Total Cost: $2.64 (input: $1.38, output: $1.26)
Total Runtime: 48m 40s across 7 agents

Commands:
  Check agent: /background-status [agent-id]
  View results: /background-results [agent-id]
  Cleanup: /agent-cleanup (Phase 20)
```

### By Agent Type

```
Analyst Agents (2 total, 1 running, 1 completed)
────────────────────────────────────────────────────

Running:
  agent-a3f9b2  Q4 metrics analysis     12m 34s  43.6%  $0.43  running

Completed:
  agent-g5h2j8  Q3 performance review   18m 23s  100%   $0.78  completed

Summary:
  Total runtime: 30m 57s
  Total cost: $1.21
  Success rate: 100% (1/1 completed successfully)
  Avg cost per task: $0.61
```

## Status Indicators

### Agent States

- **🟢 running** - Agent actively executing task
- **🟡 pending** - Agent queued, not yet started
- **✅ completed** - Task finished successfully
- **❌ failed** - Task failed (error or timeout)
- **🔴 killed** - Manually terminated

### Progress Indicators

```
Progress: 67% (2/3 phases complete)
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░
```

Progress calculated from:
- Dev docs task completion (if `--task` used)
- Tool call patterns (setup → execute → finalize)
- File write operations (incremental progress)

### Context Usage Bars

```
Context: 87,234 / 200,000 tokens (43.6%)
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░

Thresholds:
  < 50%  ▓▓▓▓▓ (green, safe)
  50-75% ▓▓▓▓▓ (yellow, monitor)
  > 75%  ▓▓▓▓▓ (red, near limit)
```

## Status File Format

Background agents write status to `/tmp/agents/[agent-id]-status.json`:

```json
{
  "id": "agent-a3f9b2",
  "type": "analyst",
  "prompt": "Analyze Q4 metrics and identify top 3 insights",
  "status": "running",
  "progress": 67,
  "createdAt": "2025-11-04T14:30:15Z",
  "startedAt": "2025-11-04T14:30:18Z",
  "lastActivity": "2025-11-04T14:40:32Z",
  "runtime": 754,
  "contextUsage": {
    "current": 87234,
    "max": 200000,
    "percentage": 43.6
  },
  "toolCalls": {
    "total": 14,
    "byType": {
      "Read": 7,
      "Write": 4,
      "Bash": 3
    },
    "lastTool": "Write",
    "lastToolTime": "2025-11-04T14:40:17Z"
  },
  "filesConsumed": [
    "data/q4-metrics.csv",
    "skills/marketing-analytics.md",
    ".claude/priming/analysis-context.md"
  ],
  "filesProduced": [
    {
      "path": "reports/q4-analysis.md",
      "size": 2340,
      "status": "draft"
    }
  ],
  "cost": {
    "inputTokens": 62450,
    "outputTokens": 8230,
    "inputCost": 0.187,
    "outputCost": 0.247,
    "total": 0.434
  },
  "reportFile": "/tmp/agents/agent-a3f9b2-report.md",
  "outputFile": "reports/q4-analysis.md",
  "taskName": "q4-analysis",
  "currentAction": "Analyzing funnel drop-offs by persona...",
  "phases": {
    "total": 3,
    "completed": 2,
    "current": "Analysis"
  }
}
```

## Integration with Dev Docs

When agent launched with `--task`:
```bash
/background builder "Execute migration" --task email-migration
```

Status shows dev docs integration:
```
Task Association:
  Dev Docs: /dev/active/email-migration/
  Tasks: 12/18 complete (67%)
  Last Update: 5m 12s ago
  Context File: email-migration-context.md
  Bundle Log: 8 entries
```

Agent automatically:
- Reads plan.md, context.md, tasks.md
- Updates context.md with progress
- Checks off tasks in tasks.md
- Creates bundle entries

## Telemetry Integration (Phase 18.6)

Status pulls from telemetry file `/tmp/agent-telemetry/[agent-id].json`:

```json
{
  "agentId": "agent-a3f9b2",
  "timestamps": [
    {"time": "2025-11-04T14:30:18Z", "event": "started"},
    {"time": "2025-11-04T14:32:45Z", "event": "phase_1_complete"},
    {"time": "2025-11-04T14:38:23Z", "event": "phase_2_complete"}
  ],
  "metrics": {
    "contextUsageHistory": [
      {"time": "2025-11-04T14:30:18Z", "tokens": 15234},
      {"time": "2025-11-04T14:35:00Z", "tokens": 52890},
      {"time": "2025-11-04T14:40:00Z", "tokens": 87234}
    ],
    "toolCallHistory": [
      {"time": "2025-11-04T14:30:20Z", "tool": "Read", "file": "data/q4-metrics.csv"},
      {"time": "2025-11-04T14:32:15Z", "tool": "Read", "file": "skills/marketing-analytics.md"}
    ]
  }
}
```

## Refresh Rate

Status updates in real-time:
- **Agent status**: Updated every tool call
- **Context usage**: Updated every 30 seconds
- **Cost tracking**: Updated every API call
- **Progress**: Updated every task completion

Auto-refresh: Status file watched by background-agent.ts hook

## Best Practices

### 1. Regular Monitoring
```bash
# Check all agents every 10-15 minutes
/background-status all

# Monitor high-cost agents closely
/background-status all | grep "analyst\|marketing-director"
```

### 2. Context Warnings
If context > 75%:
```
⚠️ Warning: Agent agent-a3f9b2 using 82.3% of context
Consider:
  - Using /prime to reduce context
  - Breaking task into smaller pieces
  - Killing agent if stuck
```

### 3. Cost Alerts
If cost > $1.00:
```
💰 Cost Alert: Agent agent-d4f8a9 has cost $1.34
Review task complexity or kill if needed
```

### 4. Timeout Warnings
If runtime > 80% of timeout:
```
⏰ Timeout Warning: Agent agent-b7e2c1 at 48/60 minutes
Will timeout in 12 minutes if not completed
```

### 5. Stuck Detection
If no activity for 10+ minutes:
```
🔴 Stuck Agent: agent-c1d6e8 no activity for 12m 34s
Last tool: Read (12m 34s ago)
Recommendation: Kill agent and retry with simpler prompt
```

## Performance Metrics

### Average Status Query Time
- Single agent: <50ms (read single JSON file)
- All agents: <200ms (read registry + all status files)
- By type: <100ms (filter registry)

### Status File Size
- Typical: 2-5 KB per agent
- With telemetry: 10-20 KB per agent
- Max retention: 7 days (auto-cleanup)

## Error Handling

### Agent Not Found
```
Error: Agent agent-xyz123 not found
Check ID: /background-status all
```

### Status File Missing
```
Warning: Status file missing for agent-a3f9b2
Agent may have crashed or been manually deleted
Check registry: /tmp/agents/registry.json
```

### Registry Corrupted
```
Error: Cannot read agent registry
File: /tmp/agents/registry.json
Reason: Invalid JSON

Solution: Restore from backup or recreate
```

### No Active Agents
```
No background agents running

Spawn agent: /background [type] "[prompt]"
See completed: /background-status all
```

## Advanced Usage

### Filter by Status
```bash
# Show only running agents
/background-status all --filter running

# Show only failed agents
/background-status all --filter failed

# Show completed in last hour
/background-status all --filter "completed,1h"
```

### Sort Options
```bash
# Sort by cost (highest first)
/background-status all --sort cost

# Sort by runtime (longest first)
/background-status all --sort runtime

# Sort by context usage (highest first)
/background-status all --sort context
```

### Export Status
```bash
# Export to JSON
/background-status all --format json > agent-status.json

# Export to CSV
/background-status all --format csv > agent-status.csv
```

### Watch Mode (Live Updates)
```bash
# Auto-refresh every 5 seconds
/background-status agent-a3f9b2 --watch

# Press Ctrl+C to exit watch mode
```

## Troubleshooting

### Status Not Updating
1. Check agent is running: `ps aux | grep claude`
2. Check status file exists: `ls /tmp/agents/agent-*/status.json`
3. Check status file modified recently: `ls -lt /tmp/agents/`

### Inaccurate Progress
- Progress is estimated based on heuristics
- Use dev docs integration for accurate task progress
- Check actual report file for true progress

### High Context Usage
- Agent may have loaded too many files
- Consider using `/prime` instead of full skills
- Break task into smaller pieces

### Cost Higher Than Expected
- Check telemetry: `/observe agent-id` (Phase 19)
- Review context usage (large context = high cost)
- Consider cheaper models for simple tasks

## See Also

- `/background` - Spawn background agents
- `/background-results` - View agent output
- `/observe` (Phase 19) - Live dashboard with charts
- `/agent-kill` (Phase 20) - Terminate agents
- `/agent-cleanup` (Phase 20) - Clean up completed agents
- `/cost-report` (Phase 19) - Detailed cost analysis
- `.claude/hooks/background-agent.ts` - Background agent hook
- `.claude/hooks/agent-telemetry.ts` - Telemetry tracking hook

---

**Phase 18.5 - Background Agent Execution**
**Status:** Implementation
**Integration:** Telemetry (Phase 18.6), observability (Phase 19), CRUD (Phase 20)
