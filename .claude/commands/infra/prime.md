# Context Priming Command

⚡ **Command:** `/prime [context-type]`

**Purpose:** Dynamically load task-specific context to optimize token usage. Instead of loading all knowledge in CLAUDE.md (heavy), load only what's needed for the current task (light).

**Available Context Types:**
1. `content` - Brand voice, personas, content creation essentials
2. `strategy` - Campaign frameworks, messaging, growth hacking
3. `analysis` - Metrics, benchmarks, statistical methods, ROI analysis

---

## Usage

**Syntax:**
```bash
/prime [context-type]
```

**Examples:**
```bash
/prime content          # Load for content creation (email, social, blog, ads)
/prime strategy         # Load for campaign planning and strategy
/prime analysis         # Load for data analysis and performance reporting
```

---

## When to Use Each Context

### `/prime content`
**Use for:**
- Creating emails, LinkedIn posts, blog articles, ad copy
- Writing landing page copy, social threads
- Content optimization and A/B variant generation
- Brand voice compliance checks

**What it loads:**
- Core voice attributes (authoritative, approachable, clear, empowering)
- Persona summaries (Sarah, Tom, Frank)
- Content format performance data
- Channel optimization guidelines
- Quality check checklists

**Token savings:** ~5-8K tokens vs loading full skills

### `/prime strategy`
**Use for:**
- Planning marketing campaigns (launch, nurture, webinar, etc.)
- Developing messaging hierarchies
- Designing growth experiments
- Multi-channel coordination
- Budget allocation and channel optimization

**What it loads:**
- Campaign types and success metrics
- Messaging hierarchy framework (3 levels)
- Growth hacking frameworks (AARRR, ICE, k-factor)
- Channel coordination patterns
- Performance benchmarks by channel

**Token savings:** ~6-9K tokens vs loading full skills

### `/prime analysis`
**Use for:**
- Analyzing campaign performance data
- Running A/B test analysis
- Conducting funnel analysis
- Attribution modeling
- ROI and CAC calculations
- Performance benchmarking

**What it loads:**
- Performance benchmarks (email, LinkedIn, landing pages, ads)
- A/B testing framework (statistical significance, sample size)
- Funnel analysis methods
- Attribution models (first-touch, last-touch, multi-touch)
- ROI and LTV:CAC calculations

**Token savings:** ~6-9K tokens vs loading full skills

---

## How Context Priming Works

### Traditional Approach (Heavy)
```
CLAUDE.md (1,500 lines, always loaded)
  ↓ References
Skills auto-activate (500 lines each × 2-3 skills = 1,000-1,500 lines)
  ↓ Total
2,500-3,000 lines loaded (~12-15K tokens)
```

**Problem:** Many lines irrelevant to current task (waste tokens)

### Context Priming Approach (Light)
```
CLAUDE.md slim (800 lines, universal instructions)
  ↓ User runs /prime [context]
Priming context (300 lines, task-specific essentials)
  ↓ Total
1,100 lines loaded (~5-6K tokens)
```

**Benefit:** 50-60% token savings, faster loading, focused context

---

## Context Priming Strategy

### For Single Tasks (Simple)
**Pattern:** Prime → Execute → Done

**Example:**
```bash
User: "Create LinkedIn post about Q4 results for Strategic Sarah"
Agent: /prime content
Agent: [Creates LinkedIn post using content-context.md]
```

### For Complex Tasks (Multiple Contexts)
**Pattern:** Prime multiple → Execute → Done

**Example:**
```bash
User: "Analyze Q4 email performance and recommend optimizations"
Agent: /prime analysis    # Load benchmarks, statistical methods
Agent: [Analyzes data]
Agent: /prime strategy    # Load campaign frameworks for recommendations
Agent: [Provides optimization recommendations]
```

### For Large Projects (Sequential)
**Pattern:** Prime → Execute → Re-prime → Execute

**Example:**
```bash
User: "Plan and create a product launch campaign"
Agent: /prime strategy    # Load campaign planning frameworks
Agent: [Creates campaign plan]
Agent: /prime content     # Load brand voice and content guidelines
Agent: [Creates email and LinkedIn content for campaign]
```

---

## Best Practices

### DO:
✅ Prime before starting work (not mid-task)
✅ Use content priming for all content creation
✅ Use strategy priming for campaign planning
✅ Use analysis priming for data work
✅ Re-prime when switching task types

### DON'T:
❌ Prime multiple contexts at once (load on-demand instead)
❌ Skip priming for complex tasks (you'll miss critical context)
❌ Mix task types without re-priming (use wrong context)
❌ Load full skills when priming context is sufficient

---

## Integration with Skills & Patterns

### Context Priming + Skills
**When to use priming:**
- Fast, focused tasks (content piece, quick analysis)
- Token optimization is priority
- Task is well-defined

**When to load full skills:**
- Complex, multi-faceted tasks
- Need deep context and cross-references
- Educational understanding desired
- Multiple related tasks in sequence

**Example:**
```bash
# Fast approach (priming)
/prime content → Create 1 LinkedIn post → Done

# Deep approach (full skills)
@.claude/skills/brand-voice-guidelines.md → Create brand guide → Train team → Done
```

### Context Priming + Patterns
**Priming context is automatically loaded by patterns when needed:**

Pattern `create_linkedin_post` references:
- `voice-patterns-quick.md` (compressed, 330 lines)
- `personas-patterns-quick.md` (compressed, 240 lines)

**If you run `/prime content` first:**
- Pattern loads compressed knowledge (fast)
- Priming context provides additional depth
- Combined approach: fastest + highest quality

---

## Context Files

**Location:** `.claude/priming/`

**Files:**
1. `content-context.md` (308 lines)
   - Brand voice essentials
   - Persona summaries
   - Content format guidelines
   - Quality checklists

2. `strategy-context.md` (301 lines)
   - Campaign types and metrics
   - Messaging hierarchy
   - Growth frameworks
   - Channel coordination

3. `analysis-context.md` (310 lines)
   - Performance benchmarks
   - Statistical methods
   - Funnel analysis
   - Attribution and ROI

---

## Token Savings Analysis

### Scenario 1: Create LinkedIn Post

**Without priming:**
- CLAUDE.md: 1,500 lines (~7.5K tokens)
- brand-voice-guidelines skill: 500 lines (~2.5K tokens)
- audience-research skill: 500 lines (~2.5K tokens)
- **Total: 2,500 lines (~12.5K tokens)**

**With priming:**
- CLAUDE.md slim: 800 lines (~4K tokens)
- content-context.md: 308 lines (~1.5K tokens)
- **Total: 1,108 lines (~5.5K tokens)**

**Savings: 7K tokens (56% reduction)**

### Scenario 2: Plan Campaign

**Without priming:**
- CLAUDE.md: 1,500 lines (~7.5K tokens)
- campaign-strategy-frameworks: 500 lines (~2.5K tokens)
- marketing-analytics: 500 lines (~2.5K tokens)
- **Total: 2,500 lines (~12.5K tokens)**

**With priming:**
- CLAUDE.md slim: 800 lines (~4K tokens)
- strategy-context.md: 301 lines (~1.5K tokens)
- **Total: 1,101 lines (~5.5K tokens)**

**Savings: 7K tokens (56% reduction)**

### Scenario 3: Analyze Performance

**Without priming:**
- CLAUDE.md: 1,500 lines (~7.5K tokens)
- marketing-analytics: 500 lines (~2.5K tokens)
- campaign-strategy-frameworks: 500 lines (~2.5K tokens)
- **Total: 2,500 lines (~12.5K tokens)**

**With priming:**
- CLAUDE.md slim: 800 lines (~4K tokens)
- analysis-context.md: 310 lines (~1.5K tokens)
- **Total: 1,110 lines (~5.5K tokens)**

**Savings: 7K tokens (56% reduction)**

---

## Troubleshooting

**Q: When should I use `/prime` vs loading full skills?**
A: Use `/prime` for focused, single tasks. Load full skills for complex, multi-task work requiring deep context.

**Q: Can I prime multiple contexts at once?**
A: Technically yes, but it defeats the purpose (token savings). Prime sequentially as needed.

**Q: Will priming work with patterns?**
A: Yes! Patterns reference compressed knowledge files. Priming adds additional depth without duplication.

**Q: How do I know which context to prime?**
A: Ask yourself: "What am I creating/analyzing/planning?" → content/analysis/strategy

**Q: What if I need something not in priming context?**
A: Load the full skill with `@.claude/skills/[skill-name].md` or the specific resource file.

---

## Expected Outcomes

**After using `/prime` command:**
✅ 50-60% token savings vs full skill loading
✅ <5 seconds to load context (vs 10-15 sec for full skills)
✅ Focused context (only what's needed for task)
✅ Faster task execution (less cognitive load)
✅ More context budget for conversation history
✅ Consistent quality (same standards, compressed delivery)

---

## Related Commands

- `/mcp-load [profile]` - Load task-specific MCP servers
- `/pattern [name]` - Execute marketing patterns
- `/workflow [type]` - Run multi-step workflows
- `@.claude/skills/[skill].md` - Load full skill for deep context

---

**Remember:** Context priming is about efficiency. Load what you need, when you need it. For focused tasks, prime. For complex work, load full skills.
