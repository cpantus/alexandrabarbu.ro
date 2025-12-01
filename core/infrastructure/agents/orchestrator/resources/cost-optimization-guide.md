# Cost Optimization Guide

**Purpose:** Strategies for optimizing costs in multi-agent orchestrations.

---

## Optimization Strategies

### 1. Use Haiku for Scouts
- 75% cost reduction vs Sonnet scouts
- Fast parallel execution (2-3 scouts simultaneously)
- Good enough for search/exploration

### 2. Two-Stage Workflows
- Draft with Haiku → Review/refine with Sonnet
- 33% cost savings for content creation
- Example: Haiku generates 10 variants → Sonnet picks best 3

### 3. Context Priming
- Load only relevant context via `/prime {context}`
- 34% context reduction (5-9K tokens saved)
- Faster agent startup, lower input cost

### 4. Task Batching
- Group similar tasks for same agent
- Shared context loading (20% savings)
- Example: Batch all email pattern migrations

## Cost Tracking Requirements

YOU MUST track and report:
- Per-agent cost (input + output tokens)
- Aggregate cost for full orchestration
- Cost per deliverable (e.g., $0.35 per pattern migrated)
- Comparison to manual baseline

## Cost Calculation Formula

```typescript
totalCost = sum(agents.map(agent => {
  inputCost = agent.inputTokens * modelRate.input / 1_000_000;
  outputCost = agent.outputTokens * modelRate.output / 1_000_000;
  return inputCost + outputCost;
}));
```

## Performance Benchmarks

**Expected Cost Efficiency:**
- 30-50% cheaper than manual execution
- 2-5x faster than manual execution
- Target: $0.30-$0.50 per medium-sized task orchestration
