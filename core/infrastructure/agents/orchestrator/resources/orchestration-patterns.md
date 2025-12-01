# Orchestration Patterns

**Purpose:** Proven patterns for orchestrating multi-agent workflows.

---

## Pattern 1: Scout/Plan/Build (Sequential)

**Use when:** Complex implementation requiring codebase exploration

### Workflow

```
1. Spawn 2-3 Scout agents (parallel, Haiku)
   → Search for relevant files, dependencies, patterns

2. Wait for scouts to complete
   → Aggregate scout reports

3. Spawn Planner agent (Sonnet)
   → Design implementation plan based on scout findings

4. Wait for planner to complete
   → Review plan

5. Spawn Builder agent (Sonnet)
   → Execute plan step by step

6. Wait for builder to complete
   → Review deliverables

7. Spawn Reviewer agent (Sonnet) [OPTIONAL]
   → Validate implementation quality

8. Cleanup all agents
   → Delete temporary workers
```

**Example:** "Add user authentication to the app"

---

## Pattern 2: Parallel Research → Synthesis (Mixed)

**Use when:** Gathering information from multiple sources

### Workflow

```
1. Spawn multiple research agents (parallel, Haiku)
   Scout A → Search codebase for API endpoints
   Scout B → Search docs for authentication patterns
   Scout C → Search for existing user models

2. Wait for all to complete
   → Aggregate research

3. Spawn Analyst agent (Sonnet)
   → Synthesize findings, identify gaps

4. Spawn Planner agent (Sonnet)
   → Create implementation plan

5. Cleanup all agents
```

**Example:** "Understand the current authentication system"

---

## Pattern 3: Content Generation at Scale (Parallel)

**Use when:** Creating multiple similar deliverables

### Workflow

```
1. Spawn Planner agent (Sonnet)
   → Define content strategy, outline all pieces

2. Wait for planner to complete

3. Spawn multiple Copywriter agents (parallel, Haiku or Sonnet)
   Copywriter A → Write blog post 1
   Copywriter B → Write blog post 2
   Copywriter C → Write blog post 3
   Copywriter D → Write social posts

4. Wait for all to complete

5. Spawn Brand Strategist agent (Sonnet)
   → Review all content for brand consistency

6. Cleanup all agents
```

**Example:** "Create 10 LinkedIn posts about Q4 results"

---

## Pattern 4: Analysis → Optimization (Sequential)

**Use when:** Improving existing work

### Workflow

```
1. Spawn Analyst agent (Sonnet)
   → Analyze current performance (metrics, funnel, cohorts)

2. Wait for analyst to complete

3. Spawn Growth Hacker agent (Sonnet)
   → Identify optimization opportunities

4. Spawn multiple Builder agents (parallel, Sonnet)
   Builder A → Implement optimization 1
   Builder B → Implement optimization 2
   Builder C → Implement optimization 3

5. Spawn Analyst agent (Sonnet)
   → Measure impact of optimizations

6. Cleanup all agents
```

**Example:** "Optimize email campaign performance"

---

## Pattern Selection Guidelines

- **Sequential:** Clear dependencies, each step builds on previous
- **Parallel:** Independent tasks that can run simultaneously
- **Mixed:** Complex workflows with both parallel and sequential sections
- **Choose based on:** Task dependencies, time constraints, cost budget
