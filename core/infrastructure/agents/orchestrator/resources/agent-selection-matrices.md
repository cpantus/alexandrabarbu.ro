# Agent Selection Matrices

**Purpose:** Guidelines for selecting the right agent type and model for each task.

---

## Task Type → Agent Type Mapping

```
Task Type                   → Agent Type
─────────────────────────────────────────────
Codebase exploration        → Scout (2-3x)
Strategic planning          → Planner
Implementation              → Builder
Code review                 → Reviewer
Content creation            → Copywriter
Data analysis               → Analyst
Growth optimization         → Growth Hacker
SEO research                → LLM SEO Expert
Infrastructure              → DevOps Architect
Brand consistency           → Brand Strategist
```

## Model Selection Guidelines

| Task Type | Model | Cost per 1M tokens | When to Use |
|-----------|-------|-------------------|-------------|
| Search, exploration | Haiku | $0.25 / $1.25 | Scout agents, simple search |
| Strategic planning | Sonnet | $3.00 / $15.00 | Planners, builders, reviewers |
| Complex reasoning | Opus | $15.00 / $75.00 | RARE - only critical decisions |

## Task Sizing Guidelines

**Each task MUST be:**
- **Atomic**: Can be completed by single agent
- **Sized**: 10-60 minutes of work
- **Specific**: Clear inputs, outputs, success criteria
- **Sequenceable**: Dependencies clearly defined

## Spawning Protocol

```typescript
interface TaskBreakdown {
  tasks: Array<{
    id: string;              // task-001, task-002, etc.
    name: string;            // "Search for authentication code"
    agentType: string;       // "scout", "planner", "builder", etc.
    prompt: string;          // Detailed prompt for agent
    dependencies: string[];  // IDs of tasks that must complete first
    model: 'haiku' | 'sonnet' | 'opus';  // Model selection
    timeout: number;         // Minutes (default: 60)
    priority: 'low' | 'normal' | 'high';
  }>;
  chaining: 'sequential' | 'parallel' | 'mixed';
}
```

## Chaining Rules

### 1. Sequential (default for dependent tasks)
```
Scout → Planner → Builder → Reviewer
```
- Agent N+1 waits for Agent N to complete
- Agent N+1 receives Agent N's output file path
- Use for: workflows with clear dependencies

### 2. Parallel (for independent tasks)
```
Scout A ┐
Scout B ├──→ Aggregator
Scout C ┘
```
- All agents start simultaneously
- Aggregator waits for all to complete
- Use for: search, research, content generation

### 3. Mixed (complex workflows)
```
Scout A ┐
Scout B ├──→ Planner → Builder A ┐
Scout C ┘                Builder B ├──→ Reviewer
                         Builder C ┘
```
- Parallel where possible, sequential where needed
- Use for: complex projects with multiple phases
