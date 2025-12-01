# Delegation Frameworks & Workflow Patterns

**Purpose:** Proven patterns for coordinating multi-agent workflows efficiently.

---

## Core Delegation Principles

### Principle 1: Preserve Requirements
- Pass FULL original user request to all agents
- Never summarize or paraphrase user intent
- Add specialist-specific focus areas
- Preserve all constraints and preferences

### Principle 2: Clear Boundaries
- Each agent has distinct responsibility
- No overlap between agent scopes
- Explicit deliverable per agent
- Clear success criteria

### Principle 3: Trust Specialists
- Delegate, then let them work
- DO NOT intervene during implementation
- If revisions needed, delegate back to specialist
- Never edit agent output yourself

### Principle 4: Optimize for Parallelism
- Launch independent agents in parallel
- Single message with multiple Task calls
- Minimize sequential dependencies
- 3-5 agents maximum for parallel execution

---

## Workflow Pattern 1: Sequential Coordination

**Use When:** Steps depend on each other

**Pattern:**
```markdown
**Step 1:** Delegate task to Agent A
→ Wait for results
→ Review findings

**Step 2:** Delegate to Agent B (pass Agent A's output)
→ Wait for completion
→ Review alignment

**Step 3:** Delegate to Agent C (pass Agent B's output)
→ Wait for final deliverable
→ Review quality

**Step 4:** Synthesize and present to user
```

**Example:**
```markdown
User: "Analyze Q4 campaign performance and recommend improvements"

Step 1: analyst → Performance analysis
→ Wait for analysis results

Step 2: marketing-director → Strategic recommendations (with analysis)
→ Wait for recommendations

Step 3: Synthesize analysis + recommendations
→ Create unified narrative
→ Present to user
```

**Best Practices:**
- Minimize sequential steps (each adds latency)
- Pass complete context forward at each step
- Review outputs before passing to next agent
- Document dependencies clearly

---

## Workflow Pattern 2: Parallel Coordination

**Use When:** Independent work streams

**Pattern:**
```markdown
**Launch N agents in parallel (single message with N Task calls):**
- Agent A: Independent task 1
- Agent B: Independent task 2
- Agent C: Independent task 3
...

→ Wait for all agents to complete
→ Synthesize findings
→ Present integrated deliverable
```

**Example:**
```markdown
User: "Comprehensive market analysis for product launch"

Launch 3 agents in parallel:
- analyst: Competitive analysis
- brand-strategist: Brand audit
- growth-hacker: Growth opportunity assessment

→ Wait for all 3 to complete
→ Synthesize findings into unified report
→ Present integrated analysis
```

**Best Practices:**
- **Optimal Parallelism:** 3-5 agents maximum
- Beyond 5 agents, coordination overhead dominates
- Ensure tasks are truly independent
- Plan synthesis strategy before launching
- Single message with multiple Task calls (not separate messages)

**Performance Impact:**
- 2 parallel agents: ~2x faster than sequential
- 3-5 parallel agents: ~3-5x faster (optimal range)
- 6+ parallel agents: Diminishing returns, coordination complexity increases

---

## Workflow Pattern 3: Hub-and-Spoke Review

**Use When:** Quality critical, multiple perspectives needed

**Pattern:**
```markdown
**Hub:** You maintain the canonical requirements

**Primary Creation:**
→ Delegate to specialist: Create deliverable

**Parallel Review (2-4 specialists):**
→ Reviewer A: Check dimension 1
→ Reviewer B: Check dimension 2
→ Reviewer C: Check dimension 3

**Synthesis:**
→ Collect feedback from all reviewers
→ Identify conflicts and common themes
→ Consolidate feedback
→ Delegate revisions to primary creator (with consolidated feedback)
→ Present final deliverable
```

**Example:**
```markdown
User: "Create our brand manifesto for upcoming launch"

Primary Creation:
→ copywriter: Draft brand manifesto
→ Wait for draft

Parallel Review (launch 3 agents simultaneously):
→ brand-strategist: Brand alignment check
→ marketing-director: Strategic fit check
→ llm-seo-expert: Messaging clarity check

Synthesis:
→ Collect all 3 reviews
→ Identify common themes (e.g., "tone too casual" from 2/3 reviewers)
→ Consolidate feedback into single revision request
→ copywriter: Revise manifesto (with consolidated feedback)

Final Check:
→ Verify revisions address all feedback
→ Present to user
```

**Best Practices:**
- 2-4 reviewers optimal (more creates noise)
- Reviewers check orthogonal dimensions (brand, strategy, data, etc.)
- Consolidate feedback before delegating revisions
- Single revision cycle preferred (plan consolidation carefully)

---

## Workflow Pattern 4: Two-Stage Research → Execution

**Use When:** Complex task requiring context discovery first

**Pattern:**
```markdown
**Stage 1: Research & Discovery (Haiku for cost savings)**
→ scout-haiku: Find relevant files, gather context
→ Wait for results
→ Review and validate context

**Stage 2: Strategic Execution (Sonnet with full context)**
→ specialist: Execute task with discovered context
→ Wait for deliverable
→ Present to user
```

**Example:**
```markdown
User: "Update all social media templates with new branding"

Stage 1: scout-haiku → Find all social media template files
→ Returns list of 15 template files

Stage 2: task-implementer → Update all 15 templates with new branding
→ Returns updated templates

Cost Savings: 33% vs. using Sonnet for discovery
```

**Best Practices:**
- Use Haiku for discovery (75% cost reduction vs Sonnet)
- Validate discovery results before Stage 2
- Pass complete context to Stage 2 specialist
- Two-stage saves 30-40% vs. single Sonnet stage

---

## Workflow Pattern 5: Batch Creation

**Use When:** Creating multiple similar deliverables

**Pattern:**
```markdown
**Parallel Batch Creation:**
Launch N copywriters in parallel (1 per deliverable)
→ Each creates specific deliverable
→ Wait for all to complete
→ Synthesize into cohesive set
→ Present collection
```

**Example:**
```markdown
User: "Create 10 blog posts for Q1 content calendar"

Launch 10 copywriter agents in parallel:
- copywriter-1: Blog post 1 (topic A)
- copywriter-2: Blog post 2 (topic B)
...
- copywriter-10: Blog post 10 (topic J)

→ Wait for all 10 to complete
→ Review for consistency
→ Present full content calendar
```

**Caution:**
- Only for truly independent deliverables
- Risk: Inconsistent tone/style across batch
- Mitigation: Provide detailed brand guidelines to each
- Alternative: Sequential creation by single agent (more consistent, slower)

---

## Decision Framework: Which Pattern?

### Ask Yourself:

**1. Are tasks dependent?**
- YES → Sequential Coordination (Pattern 1)
- NO → Parallel Coordination (Pattern 2)

**2. Is quality critical with multiple review dimensions?**
- YES → Hub-and-Spoke Review (Pattern 3)
- NO → Simple delegation or parallel

**3. Is context discovery needed first?**
- YES → Two-Stage Research → Execution (Pattern 4)
- NO → Direct delegation

**4. Creating multiple similar items?**
- YES → Batch Creation (Pattern 5)
- NO → Standard delegation

**5. How many agents?**
- 1 agent → Simple delegation
- 2-3 agents → Parallel or sequential based on dependencies
- 4-5 agents → Parallel with careful synthesis planning
- 6+ agents → Reconsider scope, break into sub-projects

---

## Anti-Patterns to Avoid

### ❌ Anti-Pattern 1: Sequential When Parallel Possible
**Wrong:** Launch 3 independent tasks sequentially (3x slower)
**Right:** Launch 3 agents in parallel (single message)

### ❌ Anti-Pattern 2: Too Many Parallel Agents
**Wrong:** Launch 10 agents in parallel
**Right:** Max 5 parallel agents, or batch into sub-projects

### ❌ Anti-Pattern 3: Unclear Dependencies
**Wrong:** Launch agents without understanding what depends on what
**Right:** Map dependencies first, then choose pattern

### ❌ Anti-Pattern 4: Premature Synthesis
**Wrong:** Try to synthesize before all agents complete
**Right:** Wait for all agents, then synthesize

### ❌ Anti-Pattern 5: Missing Integration Plan
**Wrong:** Launch agents, figure out integration later
**Right:** Plan synthesis strategy before launching

---

## Quick Reference Table

| Scenario | Pattern | Agents | Timing |
|----------|---------|--------|--------|
| Step 2 depends on Step 1 | Sequential | 2-4 | Serial |
| 3 independent analyses | Parallel | 3 | Concurrent |
| High-stakes deliverable | Hub-and-Spoke | 1 primary + 2-4 reviewers | Mixed |
| Need context discovery | Two-Stage | 2 (scout + specialist) | Serial |
| 10 similar blog posts | Batch Creation | 10 (or 1 sequential) | Concurrent |

---

**Reference:** Use these patterns during Phase 1 (Delegation Strategy) to design optimal workflows.
