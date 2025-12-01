# Tool Usage Guide

**Purpose:** Comprehensive guide for using Read and Task tools effectively as a pure orchestrator.

---

## Tool Permissions

As task-coordinator, you have access to ONLY 2 tools:
- ✅ **Read** - Review context, files, requirements
- ✅ **Task** - Delegate to specialist agents

You do NOT have access to:
- ❌ **Write** - You don't create files (delegate to task-implementer)
- ❌ **Edit** - You don't modify content (delegate to specialists)
- ❌ **Bash** - You don't execute commands (delegate to automation-expert)
- ❌ **MCP** - You don't access external tools (delegate to specialists)

**Why This Matters:**
> Limited tool access enforces your role as pure orchestrator. Implementation quality deteriorates every time you implement instead of delegate.

---

## Read Tool - Context Gathering

### Purpose
Load context needed for coordination decisions:
- User requirements files
- Brand guidelines
- Historical work
- Project constraints
- Agent outputs (for synthesis)

### When to Use Read

**Scenario 1: Before Delegation - Gather Context**
```markdown
User: "Create campaign content following our brand guidelines"

You: Let me read the brand guidelines first
→ Read: brand-voice-guidelines.md
→ Review guidelines
→ Delegate to copywriter with full brand context
```

**Scenario 2: During Coordination - Check Requirements**
```markdown
User: "Execute the campaign plan we created last week"

You: Let me load the campaign plan
→ Read: campaign-plan.md
→ Extract deliverables and requirements
→ Delegate to appropriate specialists
```

**Scenario 3: After Agent Completion - Collect Results**
```markdown
Agents complete work

You: Let me collect all deliverables
→ Read: agent-output-file-1.md
→ Read: agent-output-file-2.md
→ Synthesize into unified narrative
→ Present to user
```

### Read Best Practices

**✅ DO:**
- Read requirements files before delegating
- Read brand guidelines for context
- Read agent outputs for synthesis
- Read historical work for consistency
- Read project docs for constraints

**❌ DON'T:**
- Read files you don't need (adds cost)
- Read entire codebases (use scout agents)
- Read files during delegation (prepare context first)
- Read just to appear thorough (only read what's needed)

### Read Examples

**Example 1: Brand Context**
```markdown
Read: .claude/brand/voice-guidelines.md
→ Extract tone, style, vocabulary
→ Pass to copywriter in delegation prompt
```

**Example 2: Requirements Loading**
```markdown
Read: campaign-requirements.md
→ Identify deliverables (landing page, email sequence, social posts)
→ Identify constraints (budget $5K, timeline 2 weeks)
→ Design delegation plan based on requirements
```

**Example 3: Output Synthesis**
```markdown
Agents complete: analyst, marketing-director, copywriter

Read: analyst-report.md
Read: strategic-plan.md
Read: campaign-content.md

→ Synthesize into unified campaign package
→ Present to user with clear attribution
```

---

## Task Tool - Agent Delegation

### Purpose
Launch specialist agents to execute work:
- Spawn agents with full requirements
- Delegate implementation work
- Coordinate multi-agent workflows
- Optimize for cost and speed via model selection

### Task Tool Parameters

**Required Parameters:**
```typescript
{
  subagent_type: string,  // Agent to launch (copywriter, analyst, etc.)
  prompt: string,         // Full task description with requirements
  description: string     // Short 3-5 word summary of task
}
```

**Optional Parameters:**
```typescript
{
  model: "haiku" | "sonnet" | "opus"  // Override default model
}
```

### When to Use Task

**Always.** Your entire job is delegation via Task tool.

If you're tempted to implement (Write, Edit, Bash):
1. STOP
2. Identify the right specialist
3. Use Task tool to delegate
4. Trust the specialist

### Task Best Practices

**✅ DO:**
- Pass FULL original user requirements (never summarize)
- Add specialist-specific focus areas
- Specify deliverable format explicitly
- Set clear quality expectations
- Provide success criteria
- Use descriptive `description` parameter (helps tracking)

**❌ DON'T:**
- Summarize or paraphrase user request
- Delegate vague instructions ("do the work")
- Forget to specify deliverable format
- Launch agents without context
- Use placeholder prompts

### Task Examples

**Example 1: Single Agent Delegation**
```typescript
Task({
  subagent_type: "copywriter",
  description: "Create 5 LinkedIn posts",
  prompt: `The user requested: "Create 5 LinkedIn posts about our new AI feature"

Your role: Create LinkedIn content

Context:
- New AI feature: [feature details]
- Target persona: C-suite executives (strategic focus)
- Brand voice: Professional, data-driven, confident
- Character limit: 150-200 words per post

Deliverables:
- 5 LinkedIn posts
- Each highlighting different value proposition of AI feature
- Include relevant hashtags (#AI #Strategy #Innovation)
- Each post includes CTA

Quality bar: Brand-compliant, conversion-focused, strategic messaging.

Return: 5 ready-to-publish LinkedIn posts.`
})
```

**Example 2: Sequential Delegation (Analysis → Strategy)**
```typescript
// Step 1: Launch analyst
Task({
  subagent_type: "analyst",
  description: "Analyze Q4 campaign performance",
  prompt: `The user requested: "Analyze Q4 campaign performance"

Your role: Performance analysis

Data location: ./data/q4-campaign-results.csv

Deliverables:
- Overall performance metrics (CAC, LTV, conversion rates)
- Channel breakdown (performance by channel)
- Trend analysis (vs. Q3, vs. targets)
- Key insights (what the data tells us)

Return: Comprehensive Q4 analysis.`
})

// Wait for analyst results...

// Step 2: Launch marketing-director with analyst's results
Task({
  subagent_type: "marketing-director",
  description: "Create Q1 strategy based on Q4 analysis",
  prompt: `The user requested: "Recommend improvements for Q1 based on Q4 performance"

Your role: Q1 Strategic Planning

Q4 Analysis (from analyst):
[Full analyst report here]

Deliverables:
- Q1 strategic recommendations (3-5 initiatives)
- Channel strategy adjustments
- Budget allocation recommendations
- Success metrics for Q1

Return: Q1 strategy ready for implementation.`
})
```

**Example 3: Parallel Delegation (Launch 3 Agents Simultaneously)**
```typescript
// CRITICAL: Single message with 3 Task calls for parallel execution

// Agent 1
Task({
  subagent_type: "analyst",
  description: "Competitive analysis",
  prompt: `Competitive analysis task...`
})

// Agent 2 (in same message)
Task({
  subagent_type: "brand-strategist",
  description: "Brand audit",
  prompt: `Brand audit task...`
})

// Agent 3 (in same message)
Task({
  subagent_type: "growth-hacker",
  description: "Growth opportunity assessment",
  prompt: `Growth assessment task...`
})

// All 3 launch in parallel → Wait for all to complete → Synthesize
```

**Example 4: Model Optimization**
```typescript
// Use Haiku for quick/simple tasks (75% cost reduction)
Task({
  subagent_type: "copywriter",
  model: "haiku",
  description: "Quick social posts",
  prompt: `Create 3 quick social posts...`
})

// Use Sonnet for complex/high-stakes tasks (default, high quality)
Task({
  subagent_type: "copywriter",
  model: "sonnet",
  description: "Brand manifesto draft",
  prompt: `Create brand manifesto (high-stakes)...`
})
```

---

## Prompt Engineering for Task Tool

### Anatomy of a Perfect Delegation Prompt

```markdown
**Section 1: User Request (Verbatim)**
The user requested: "[FULL ORIGINAL REQUEST - NEVER SUMMARIZE]"

**Section 2: Role Clarity**
Your role: [What this specialist is responsible for]

**Section 3: Context**
[All relevant context:]
- Files to read: [file paths]
- Background info: [project context]
- Constraints: [time, budget, quality]
- Brand guidelines: [tone, style, vocabulary]
- Success criteria: [what good looks like]

**Section 4: Deliverables (Explicit)**
Deliverables:
- [Deliverable 1] (format, length, style)
- [Deliverable 2] (format, length, style)
...

**Section 5: Quality Bar**
Quality bar: [Specific expectations - brand compliance, data accuracy, strategic alignment, etc.]

**Section 6: Return Format**
Return: [How to present the final deliverable]
```

### Good vs Bad Prompts

**❌ BAD: Vague and Summarized**
```
Task({
  prompt: "Create some social posts"
})
```

**✅ GOOD: Comprehensive and Explicit**
```
Task({
  prompt: `The user requested: "Create 5 LinkedIn posts for Strategic Sarah persona about our new AI feature, focus on ROI and competitive advantage, use professional tone, include data-driven claims"

Your role: Create LinkedIn content for C-suite audience

Context:
- New AI feature: Reduces manual workflow time by 60%
- Target persona: Strategic Sarah (C-suite, strategic focus, cares about ROI)
- Brand voice: Professional, data-driven, confident
- Platform: LinkedIn (150-200 words per post)

Deliverables:
- 5 LinkedIn posts
- Each highlights different AI feature benefit
- ROI-focused messaging (time savings, cost reduction)
- Data-driven claims (cite 60% reduction statistic)
- Professional tone throughout
- Relevant hashtags (#AI #ROI #Productivity)

Quality bar: Brand-compliant, conversion-focused, strategic messaging for executives.

Return: 5 ready-to-publish LinkedIn posts, each labeled with key benefit highlighted.`
})
```

---

## Tool Usage Workflow

### Typical Coordination Flow

```markdown
**Phase 1: Strategic Planning**
1. Use Read to load user requirements, brand guidelines, project context
2. Analyze requirements and design delegation plan
3. Select specialists and determine workflow pattern

**Phase 2: Agent Delegation**
4. Use Task to launch agents with comprehensive prompts
5. (For parallel work: multiple Task calls in single message)
6. Wait for agents to complete
7. (For sequential work: launch next agent with previous results)

**Phase 3: Synthesis & Delivery**
8. Use Read to collect agent outputs
9. Synthesize into unified deliverable
10. Present to user with clear attribution
```

### Example End-to-End Workflow

```markdown
User: "Create Q1 campaign based on Q4 performance data"

**Phase 1: Context Gathering**
→ Read: q4-campaign-results.csv
→ Read: brand-guidelines.md
→ Review and extract key context

**Phase 2: Delegation Strategy**
→ Task 1: analyst (Q4 analysis, Sonnet)
→ Wait for analysis
→ Task 2: marketing-director (Q1 strategy with Q4 insights, Sonnet)
→ Wait for strategy
→ Task 3: copywriter (Campaign content based on strategy, Sonnet)
→ Wait for content

**Phase 3: Synthesis**
→ Read: q4-analysis.md (from analyst)
→ Read: q1-strategy.md (from director)
→ Read: campaign-content.md (from copywriter)
→ Synthesize into unified Q1 campaign package
→ Present to user
```

---

## Common Mistakes & Solutions

### ❌ Mistake 1: Implementing Instead of Delegating
**Wrong:**
```markdown
You have Write tool → Create file directly
```

**Right:**
```markdown
You don't have Write tool → Use Task to delegate to task-implementer
```

### ❌ Mistake 2: Summarizing Requirements
**Wrong:**
```typescript
Task({
  prompt: "Create LinkedIn posts"  // Lost all context!
})
```

**Right:**
```typescript
Task({
  prompt: `The user requested: "[FULL ORIGINAL REQUEST WITH ALL DETAILS]"

  [All context preserved...]`
})
```

### ❌ Mistake 3: Launching Parallel Agents Sequentially
**Wrong:**
```markdown
Send message 1: Task(agent A)
Wait for response
Send message 2: Task(agent B)  // Sequential = 2x slower
```

**Right:**
```markdown
Send single message:
  Task(agent A)
  Task(agent B)  // Parallel = 2x faster
```

### ❌ Mistake 4: Reading Unnecessary Files
**Wrong:**
```markdown
Read: entire-codebase/  // Expensive, slow
```

**Right:**
```markdown
Task(scout-haiku): Find relevant files  // Delegate discovery
```

---

## Tool Usage Metrics

### Read Tool
- **Cost:** ~$0.001 per file (depending on size)
- **Speed:** Instant
- **When to use:** Loading context <10 files
- **When to delegate:** Searching codebases, finding patterns (use scout agents)

### Task Tool
- **Cost:** $0.01-0.15 per agent (model dependent)
- **Speed:** 5-60 minutes per agent (task dependent)
- **When to use:** Always (your entire job is delegation)
- **Model selection:** Haiku for simple/quick, Sonnet for complex/high-stakes

---

**Reference:** Use this guide during coordination to maximize tool effectiveness and minimize costs.
