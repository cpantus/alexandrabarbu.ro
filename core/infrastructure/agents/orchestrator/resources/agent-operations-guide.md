# Agent Operations Guide

**Purpose:** Complete guide for monitoring, lifecycle management, error handling, and recovery protocols.

---

## Progress Monitoring

### Telemetry Files

Location: `/tmp/agents/telemetry/agent-{id}.json`

Contains:
- Context usage (current %, peak, history)
- Tool calls (Read, Write, Bash counts)
- Cost tracking (input/output tokens, USD)
- Status changes (created → running → completed/failed)
- Performance metrics (tokens/sec, tools/min)

### Status Checks

```bash
/background-status {agent-id}
```

Returns:
- Current status (running, completed, failed)
- Runtime (minutes elapsed)
- Context usage (tokens used, % of window)
- Cost so far (USD)
- Latest thinking/activity

### Observability Dashboard

```bash
/observe all
```

Shows compact view of all active agents:
- Agent ID, type, status
- Runtime, context %, cost
- Latest activity

### Monitoring Protocol

1. **Spawn agents** → Record agent IDs
2. **Poll every 60s** → Check status of all agents
3. **On completion** → Retrieve results via `/background-results {id}`
4. **On failure** → Read error logs, decide retry or abort
5. **Chain next task** → Pass output file paths to dependent agents

---

## Agent Lifecycle Management (CRUD)

### Critical Principle

**Agents are temporary workers, not permanent instances.**

### Create

```bash
/background {agent-type} "{detailed-prompt}" --model {haiku|sonnet|opus} --timeout {minutes}
```

- Spawns new agent process
- Registers in `/tmp/agents/registry.json`
- Initializes telemetry file
- Returns agent ID

### Read

```bash
/background-status {agent-id}
/background-results {agent-id}
/observe {agent-id}
```

- Check status (running, completed, failed)
- View results (partial or final)
- See full dashboard (context, cost, tools, performance)

### Update

```bash
/agent-update {agent-id} --priority high
```

- Change priority (affects execution order in queue)
- Extend timeout (if agent needs more time)
- Note: Cannot change prompt after spawning

### Delete

```bash
/agent-kill {agent-id}      # Kill single agent
/agent-cleanup              # Delete all completed/failed agents
```

**CRITICAL:** Delete agents after task completion
- Agents are temporary (minutes to hours, not days)
- Free up resources, prevent registry bloat
- Cleanup telemetry files

### Cleanup Protocol

**After successful orchestration:**
```bash
/agent-cleanup  # Delete all completed agents
```

**After failed orchestration:**
```bash
/agent-kill {failed-agent-id}  # Kill failed agent
/agent-cleanup                  # Clean up others
```

**Daily maintenance:**
```bash
/agent-cleanup  # Delete all old agents (completed >24h ago)
```

### Registry Management

Location: `/tmp/agents/registry.json`

```json
{
  "agents": [
    {
      "id": "agent-abc123",
      "type": "scout",
      "status": "completed",
      "createdAt": "2025-11-04T10:00:00Z",
      "completedAt": "2025-11-04T10:08:00Z",
      "cost": 0.02,
      "reportPath": "/tmp/agents/agent-abc123-report.md"
    }
  ],
  "stats": {
    "total": 47,
    "active": 3,
    "completed": 42,
    "failed": 2
  }
}
```

---

## Error Handling & Recovery

### When Agents Fail

**Step 1: Diagnose**

```bash
/background-status {failed-agent-id}
```

Read error logs, identify issue:
- Out of context? → Retry with context priming
- Missing file? → Run scout first to find it
- Timeout? → Break task into smaller chunks
- Model error? → Retry once, escalate if fails again

**Step 2: Decide**

- **Retry (70% of failures):** Same agent, fix inputs
- **Reroute (20% of failures):** Different agent type
- **Abort (10% of failures):** Unrecoverable, report to user

**Step 3: Execute**

```typescript
if (agent.status === 'failed') {
  const diagnosis = diagnoseFailure(agent);

  if (diagnosis.type === 'out_of_context') {
    // Retry with priming
    retryWithPriming(agent, diagnosis.recommendedContext);
  } else if (diagnosis.type === 'missing_dependency') {
    // Run scout to find missing file
    const scout = spawnScout(diagnosis.missingFile);
    await scout.complete();
    retryAgent(agent);
  } else if (diagnosis.type === 'timeout') {
    // Break into smaller tasks
    const subtasks = breakIntoSubtasks(agent.task);
    for (const subtask of subtasks) {
      await spawnAgent(subtask);
    }
  } else {
    // Abort and report
    reportFailure(agent, diagnosis);
  }
}
```

### Recovery Best Practices

1. **Retry once automatically** for transient errors
2. **Log all failures** to `/tmp/agents/failures.log`
3. **Report to user** if 2+ retries fail
4. **Don't cascade failures** - graceful degradation

---

## Result Aggregation

### After All Agents Complete

**Step 1: Collect Outputs**
- Read all agent report files
- Extract key deliverables
- Identify any failures or gaps

**Step 2: Synthesize**
- Combine outputs into coherent narrative
- Resolve conflicts between agents
- Fill gaps if needed

**Step 3: Deliver**
- Create final report/deliverable
- Summarize what was done
- List files created/modified
- Report costs and performance
- Recommend follow-ups

### Example Aggregation

```markdown
# Orchestration Report: Email Template Migration

**Task:** Migrate email templates to pattern system
**Duration:** 78 minutes
**Agents Used:** 4 (scout, planner, builder, reviewer)
**Total Cost:** $0.42 USD

## Results

✅ **Migration Complete**

**Agents Executed:**
1. Scout (haiku, 8 min, $0.02) - Found 12 email template files
2. Planner (sonnet, 22 min, $0.12) - Designed migration strategy
3. Builder (sonnet, 42 min, $0.24) - Migrated all 12 templates to 4 patterns
4. Reviewer (sonnet, 6 min, $0.04) - Validated all patterns, 0 issues

**Files Created:**
- `.claude/patterns/content/create_welcome_email.md` (450 lines)
- `.claude/patterns/content/create_newsletter.md` (520 lines)
- `.claude/patterns/content/create_promo_email.md` (480 lines)
- `.claude/patterns/content/create_transactional_email.md` (380 lines)

**Dev Docs:**
- `/dev/active/email-migration/email-migration-plan.md`
- `/dev/active/email-migration/migration-report.md`
- `/dev/active/email-migration/review-report.md`

**Quality:** All patterns follow structure (PURPOSE, INPUT, PROCESS, OUTPUT, EXAMPLES)

## Performance

- **Speed:** 78 min vs ~180 min manual (2.3x faster)
- **Cost:** $0.42 vs ~$1.20 manual (65% cheaper via Haiku scout)
- **Quality:** 100% validation pass (reviewer found 0 issues)

## Recommendations

1. Update documentation to reference new patterns
2. Deprecate old template files (move to /old-templates/)
3. Test patterns with real campaign data
4. Consider creating pattern for event invitation emails

---

**Orchestrator:** task-orchestrator-v1
**Report Generated:** 2025-11-04 16:30:00 UTC
```

---

## Commands Reference

As orchestrator, you invoke:

1. **`/background {agent} "{prompt}"`** - Spawn agents
2. **`/background-status {id}`** - Check agent status
3. **`/background-results {id}`** - Get agent results
4. **`/observe all`** - Monitor all agents
5. **`/cost-report today`** - Track costs
6. **`/agent-cleanup`** - Delete completed agents
7. **`/workflow {mode} "{task}"`** - Orchestrate Scout/Plan/Build
8. **`/prime {context}`** - Prime context for agents

---

## Success Metrics

As orchestrator, you're measured by:

1. **Task Completion Rate:** 80%+ of orchestrations complete successfully
2. **Cost Efficiency:** 30-50% cheaper than manual execution
3. **Speed:** 2-5x faster than manual execution
4. **Agent Cleanup:** 0 permanent agent instances (all deleted after tasks)
5. **Error Recovery:** 70%+ of failed agents recover via retry
6. **Quality:** 95%+ of deliverables pass review

---

## Anti-Patterns (What NOT to Do)

❌ **Don't spawn agents for trivial tasks**
- Bad: 1 scout to find a specific file you already know exists
- Good: Use Glob or Grep tool directly

❌ **Don't use Opus for simple tasks**
- Bad: Opus scout for keyword search ($15 vs $0.25)
- Good: Haiku for search, Sonnet for strategy, Opus RARELY

❌ **Don't leave agents running permanently**
- Bad: Spawn 10 agents, leave them running for days
- Good: Spawn → Complete → Cleanup (agents live minutes to hours)

❌ **Don't create circular dependencies**
- Bad: Task A depends on Task B, Task B depends on Task A
- Good: Clear dependency DAG (directed acyclic graph)

❌ **Don't ignore failures**
- Bad: Agent fails, you proceed with dependent tasks
- Good: Diagnose, retry, or abort gracefully

❌ **Don't make tasks too small or too large**
- Bad: 100 tasks of 2 min each (overhead), or 1 task of 4 hours (timeout)
- Good: 4-8 tasks of 10-60 min each
