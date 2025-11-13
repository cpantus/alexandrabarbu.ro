# Background Agent Command

⏰ Launch a specialized agent in the background for autonomous task execution.

## Purpose

Spawn background agents that execute tasks independently, enabling "out-of-loop" operation where you can continue other work while agents complete complex tasks asynchronously.

## Usage

```bash
/background [agent-type] "[prompt]"
/background [agent-type] "[prompt]" --output [file-path]
/background [agent-type] "[prompt]" --task [task-name]
```

## Parameters

### Required
- **agent-type**: Type of specialist agent to spawn
  - `copywriter` - Conversion copy, A/B testing
  - `analyst` - Statistical analysis, attribution
  - `brand-strategist` - Voice consistency, positioning
  - `content-strategist` - Editorial calendars, SEO
  - `growth-hacker` - Growth loops, pirate metrics
  - `ai-growth-hacker` - AI personalization, content at scale
  - `llm-seo-expert` - LLM search + traditional SEO
  - `automation-expert` - Workflow automation, marketing ops
  - `viral-expert` - Viral mechanics, STEPPS framework
  - `marketing-director` - Strategy, budgets, ROI
  - `scout` - Fast file/code searching
  - `planner` - Strategic planning from scout results
  - `builder` - Systematic execution of plans

- **prompt**: Task description for the agent (quoted string)

### Optional
- `--output [file-path]`: Where agent should write results (default: auto-generated)
- `--task [task-name]`: Associate with existing dev docs task
- `--model [model]`: Override default model (haiku, sonnet, opus)
- `--timeout [minutes]`: Max execution time (default: 60)
- `--priority [low|normal|high]`: Execution priority (default: normal)

## Examples

### Basic Usage
```bash
# Spawn analyst to analyze metrics
/background analyst "Analyze Q4 metrics from data/q4-metrics.csv and identify top 3 insights"

# Spawn copywriter for content generation
/background copywriter "Generate 10 LinkedIn post variants about our new product launch"

# Spawn SEO expert for optimization
/background llm-seo-expert "Audit blog posts in /content/ and suggest SEO improvements"
```

### With Output File
```bash
# Direct output to specific file
/background analyst "Analyze funnel drop-offs by persona" --output reports/funnel-analysis.md

# Generate campaign strategy
/background marketing-director "Create Q1 2025 campaign strategy" --output strategy/q1-2025.md
```

### With Task Association
```bash
# Associate with existing dev docs task
/background builder "Execute migration plan" --task email-template-migration

# Scout for workflow pattern
/background scout "Find all email template files" --task content-audit
```

### With Model Override
```bash
# Use cheap model for simple tasks
/background scout "Find config files" --model haiku

# Use premium model for complex analysis
/background marketing-director "Design product launch strategy" --model opus
```

## What Happens

When you run `/background [agent] [prompt]`:

1. **Agent Registration**
   - Creates unique agent ID (e.g., `agent-a3f9b2`)
   - Registers in agent registry at `/tmp/agents/registry.json`
   - Creates status file at `/tmp/agents/[agent-id]-status.json`

2. **Background Spawn**
   - Spawns separate Claude Code process
   - Agent runs autonomously in background
   - No blocking of your current session

3. **Report File Creation**
   - Creates report file at `/tmp/agents/[agent-id]-report.md` (or custom output)
   - Agent writes results to report as it works
   - File updated incrementally

4. **Telemetry Tracking**
   - Tracks context usage (tokens)
   - Tracks tool calls (Read, Write, Bash, etc.)
   - Tracks execution time and cost
   - Telemetry saved to `/tmp/agent-telemetry/[agent-id].json`

5. **Immediate Return**
   - Command returns immediately with agent ID
   - You can continue working or check status later

## Output Format

Command outputs:
```
✓ Background agent spawned
  ID: agent-a3f9b2
  Type: analyst
  Status: running
  Report: /tmp/agents/agent-a3f9b2-report.md

Check status: /background-status agent-a3f9b2
View results: /background-results agent-a3f9b2
```

## Agent Registry

Background agents are tracked in `/tmp/agents/registry.json`:

```json
{
  "agents": [
    {
      "id": "agent-a3f9b2",
      "type": "analyst",
      "prompt": "Analyze Q4 metrics and identify top 3 insights",
      "status": "running",
      "createdAt": "2025-11-04T14:30:00Z",
      "reportFile": "/tmp/agents/agent-a3f9b2-report.md",
      "outputFile": "reports/q4-analysis.md",
      "taskName": null,
      "model": "sonnet",
      "priority": "normal",
      "timeout": 60
    }
  ]
}
```

## Status Values

Agents progress through these states:
- **created** - Agent registered, not yet started
- **running** - Agent actively executing task
- **completed** - Task finished successfully
- **failed** - Task failed (error or timeout)
- **killed** - Manually terminated via `/agent-kill`

## Integration with Other Commands

### Check Status
```bash
/background-status agent-a3f9b2    # View progress, context usage, tools called
```

### View Results
```bash
/background-results agent-a3f9b2   # View completed report
```

### Kill Agent
```bash
/agent-kill agent-a3f9b2           # Terminate running agent (Phase 20)
```

### Observe Agent
```bash
/observe agent-a3f9b2              # Live dashboard view (Phase 19)
```

### Cleanup
```bash
/agent-cleanup                     # Delete all completed agents (Phase 20)
```

## Workflow Integration

Background agents integrate seamlessly with workflow patterns:

### Scout/Plan/Build Workflow
```bash
# Spawn scouts in parallel
/background scout "Find email template files" --task migration
/background scout "Find email components" --task migration

# After scouts complete, spawn planner
/background planner "Design migration strategy" --task migration

# After plan approved, spawn builder
/background builder "Execute migration plan" --task migration
```

### Agent Chaining
```bash
# Chain 1: Scout → Plan
/background scout "Find deprecated APIs" --output /tmp/scout-report.md
# (wait for completion via /background-status)
/background planner "Create refactoring plan" --input /tmp/scout-report.md

# Chain 2: Analysis → Recommendations
/background analyst "Analyze campaign performance" --output /tmp/analysis.md
/background growth-hacker "Suggest growth optimizations" --input /tmp/analysis.md
```

### Parallel Execution
```bash
# Spawn 5 agents simultaneously for different personas
/background copywriter "Write email for Strategic Sarah" --output emails/sarah.md
/background copywriter "Write email for Technical Tom" --output emails/tom.md
/background copywriter "Write email for Budget Beth" --output emails/beth.md
/background copywriter "Write email for Creative Cara" --output emails/cara.md
/background copywriter "Write email for Enterprise Ed" --output emails/ed.md

# Check all statuses
/background-status all
```

## Dev Docs Integration

When using `--task [task-name]`:
1. Agent automatically loads dev docs from `/dev/active/[task]/`
2. Agent updates `[task]-context.md` with progress
3. Agent checks off tasks in `[task]-tasks.md`
4. Agent creates bundle entries in `[task]-bundle.log`

Example:
```bash
/background builder "Implement feature X" --task feature-x-implementation
```

Agent will:
- Read `/dev/active/feature-x-implementation/feature-x-implementation-plan.md`
- Read `/dev/active/feature-x-implementation/feature-x-implementation-context.md`
- Update context.md as it works
- Check off tasks in tasks.md
- Create bundle log entries

## Performance & Cost

### Token Usage
- **Scout agents** (haiku): 10-30K tokens per task
- **Planner agents** (sonnet): 50-100K tokens per task
- **Builder agents** (sonnet): 100-150K tokens per task
- **Specialist agents** (sonnet): 50-200K tokens depending on complexity

### Execution Time
- **Scout tasks**: 2-5 minutes
- **Planning tasks**: 5-15 minutes
- **Building tasks**: 15-60 minutes
- **Analysis tasks**: 10-30 minutes

### Cost Estimates
- **Scout (haiku)**: $0.01-0.05 per task
- **Planner (sonnet)**: $0.10-0.30 per task
- **Builder (sonnet)**: $0.30-1.00 per task
- **Specialist (sonnet)**: $0.10-0.50 per task

### Parallel Execution Limits
- **Recommended**: 3-5 agents simultaneously
- **Maximum**: 10 agents (monitor cost/performance)
- **Safe default**: 3 agents for balanced resource usage

## Best Practices

### 1. Clear Prompts
✓ **Good**: "Analyze Q4 funnel data and identify top 3 drop-off points with recommendations"
✗ **Bad**: "Look at the data"

### 2. Appropriate Agent Selection
- Use **scout** for searching/finding files
- Use **planner** for strategic thinking
- Use **builder** for systematic execution
- Use **specialist** agents for domain expertise

### 3. Output Files
- Always specify `--output` for important results
- Use consistent file paths (e.g., `/reports/`, `/analysis/`)
- Check output file exists after agent completes

### 4. Task Association
- Use `--task` for multi-step workflows
- Helps agents understand broader context
- Enables automatic progress tracking

### 5. Model Selection
- Use **haiku** for simple searches, quick tasks
- Use **sonnet** for most tasks (default)
- Use **opus** only for complex strategic work

### 6. Monitor Progress
- Check status periodically: `/background-status agent-id`
- Don't spawn too many agents at once
- Clean up completed agents regularly

### 7. Timeout Settings
- Short tasks (scouts): 15-30 minutes
- Medium tasks (analysis): 30-60 minutes
- Long tasks (building): 60-120 minutes
- Set realistic timeouts to prevent runaway costs

## Error Handling

### Agent Fails to Start
```
Error: Could not spawn background agent
Reason: Invalid agent type 'foo'
Valid types: copywriter, analyst, scout, planner, builder, ...
```

**Solution**: Check agent type spelling

### Agent Times Out
```
Agent agent-a3f9b2 timed out after 60 minutes
Status: failed
Report: Partial results in /tmp/agents/agent-a3f9b2-report.md
```

**Solution**: Increase timeout or break task into smaller pieces

### Registry Locked
```
Error: Agent registry is locked
Another process is modifying registry
```

**Solution**: Wait a few seconds and retry

### Out of Disk Space
```
Error: Cannot create report file
Reason: No space left on device
```

**Solution**: Clean up old agent reports in `/tmp/agents/`

## Troubleshooting

### Agent Not Starting
1. Check `/tmp/agents/[agent-id]-status.json` exists
2. Check registry file `/tmp/agents/registry.json` is valid JSON
3. Check Claude Code is accessible in PATH

### Agent Stuck
1. Check status: `/background-status agent-id`
2. Check report file has recent updates
3. Kill if necessary: `/agent-kill agent-id` (Phase 20)

### Results Not Appearing
1. Check agent completed: `/background-status agent-id`
2. Check report file path in registry
3. View results: `/background-results agent-id`

### High Cost
1. Check telemetry: `/observe agent-id` (Phase 19)
2. Review context usage (should be <150K tokens)
3. Consider using cheaper models (haiku) for simple tasks

## Implementation Notes

### Hook: background-agent.ts
This command is powered by `.claude/hooks/background-agent.ts`, which:
1. Validates agent type and prompt
2. Creates unique agent ID
3. Registers agent in registry
4. Spawns separate Claude Code process via Node.js `child_process`
5. Returns immediately (non-blocking)

### Agent Spawn Method
```typescript
import { spawn } from 'child_process';

const claudeProcess = spawn('claude', [
  '--mode', 'agent',
  '--type', agentType,
  '--prompt', prompt,
  '--output', reportFile,
  '--telemetry', telemetryFile
], {
  detached: true,  // Run independently
  stdio: 'ignore'  // Don't block parent process
});

claudeProcess.unref();  // Allow parent to exit
```

### Registry Locking
Registry uses file-based locking to prevent race conditions:
1. Create lock file: `/tmp/agents/registry.lock`
2. Read/modify registry
3. Write registry
4. Delete lock file

Timeout: 10 seconds (prevents deadlocks)

## Advanced Usage

### Custom Telemetry
```bash
# Enable detailed telemetry tracking
/background analyst "Analyze data" --telemetry-level detailed
```

### Resource Limits
```bash
# Limit context usage
/background scout "Find files" --max-tokens 50000
```

### Retry on Failure
```bash
# Auto-retry up to 3 times on failure
/background builder "Deploy feature" --retry 3
```

### Dependency Chaining (Future: Phase 20)
```bash
# Agent B waits for Agent A to complete
/background scout "Find templates" --agent-id A
/background planner "Design migration" --depends-on A
```

## See Also

- `/background-status` - Check agent progress
- `/background-results` - View agent output
- `/observe` (Phase 19) - Live dashboard monitoring
- `/agent-kill` (Phase 20) - Terminate agents
- `/agent-cleanup` (Phase 20) - Clean up completed agents
- `/orchestrate` (Phase 20) - High-level workflow orchestration
- `docs/WORKFLOW-PATTERNS.md` - Scout/Plan/Build patterns
- `.claude/patterns/workflow/` - Workflow pattern files

---

**Phase 18.5 - Background Agent Execution**
**Status:** Implementation
**Integration:** Hooks, workflow patterns, dev docs, observability (Phase 19)
