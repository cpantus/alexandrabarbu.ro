# Agent Token Efficiency Standards

**Version:** 1.0
**Last Updated:** 2025-11-10
**Purpose:** Consolidate agent token efficiency principles for cost optimization and performance

---

## Overview

This document consolidates agent efficiency standards scattered across CLAUDE.md, prompt-caching-guide.md, and component_agent.md. These standards ensure:

- **Cost discipline**: Appropriate model selection for task complexity
- **Token optimization**: Minimize unnecessary context and overhead
- **Performance**: Fast execution through efficient resource usage
- **Consistency**: All agents follow same efficiency principles

**Key Philosophy:** Use the smallest model that can complete the task effectively. Escalate only when complexity demands it.

---

## Standard 1: YAML Fields (Required)

All agents MUST declare efficiency parameters in YAML frontmatter.

### Required Fields

```yaml
---
name: agent-name
description: Brief description
tools: [Read, Write, Bash]
model: haiku              # REQUIRED: haiku|sonnet|opus
thinking: think           # REQUIRED for sonnet/opus: think|think-hard|ultrathink
---
```

### Field Specifications

**model** (REQUIRED):
- `haiku` - Fast, cost-effective ($0.25/$1.25 per 1M tokens in/out)
- `sonnet` - Balanced reasoning ($3/$15 per 1M tokens in/out)
- `opus` - Maximum capability ($15/$75 per 1M tokens in/out)

**thinking** (REQUIRED for sonnet/opus):
- `think` - Basic reasoning (+20% tokens)
- `think-hard` - Complex decisions (+40% tokens)
- `ultrathink` - Critical analysis (+60% tokens)
- Omit for haiku (thinking not available)

### Validation

Enforced via `.claude/patterns/meta/component_agent.md` meta-pattern.

Missing fields will cause validation failure.

---

## Standard 2: OPTIMIZATION Section (Sonnet/Opus Only)

Sonnet and opus agents MUST include an OPTIMIZATION section explaining their resource requirements.

Haiku agents MAY skip this section (already cost-optimized by definition).

### Required Content

```markdown
## OPTIMIZATION

**Model:** sonnet (requires strategic reasoning / multi-step planning / complex analysis)
**Thinking:** think-hard (multiple decision points, optimization required)
**Expected token usage:** 10-15K tokens/run
**Cost:** ~$0.15-0.25/run
  - Input: 8K tokens @ $3/1M = $0.024
  - Output: 4K tokens @ $15/1M = $0.06
  - Thinking overhead: +40% = $0.034
  - Total: ~$0.12/run

**Prompt caching:** Enabled (3 skill files, 5K tokens → 22% cost reduction)

**Escalate to opus when:**
- High-stakes brand decisions ($100K+ impact)
- Critical strategic positioning work
- Complex ethical considerations

**Delegate to haiku when:**
- Simple data gathering
- Batch content operations
- Quick research tasks

**Sub-agent guidance:**
When launching sub-agents via Task tool, use haiku for simple searches/content, sonnet for analysis/strategy.

See: `.claude/docs/agent-efficiency-standards.md` for full guidelines
```

### Examples

- **copywriter-haiku.md** (lines 190-201) - Cost optimization justification
- **orchestrator.md** (lines 373-408) - Comprehensive model selection
- **marketing-director.md** - Full OPTIMIZATION section

---

## Standard 3: Model Selection Guidelines (Not Enforced)

These are GUIDELINES, not strict rules. Agents can deviate with justification in OPTIMIZATION section.

### Model Selection Matrix

| Agent Type | Default Model | Use Case | Token Budget | Cost/Run |
|------------|---------------|----------|--------------|----------|
| **Scout** | haiku | Fast exploration, file search, keyword matching | 2-5K | $0.01-0.02 |
| **Simple copywriter** | haiku | Social posts, ad copy, email subject lines | 3-6K | $0.02-0.03 |
| **Long-form copywriter** | sonnet | Blog posts, whitepapers, case studies | 8-12K | $0.10-0.15 |
| **Analyst** | sonnet | Data analysis, performance metrics, insights | 10-15K | $0.15-0.25 |
| **Strategist** | sonnet | Campaign planning, positioning, market strategy | 12-18K | $0.20-0.35 |
| **Orchestrator** | sonnet | Multi-agent coordination, workflow management | 6-10K | $0.08-0.12 |
| **Brand decisions** | opus | Brand positioning, high-stakes creative, ethics | 20-30K | $1.00-2.00 |

### Decision Criteria

**Use haiku when:**
- Task is well-defined and straightforward
- No complex decision trees required
- Speed matters more than depth
- Batch operations (content generation, searches)
- Output format is simple and structured

**Use sonnet when:**
- Multiple decision points or trade-offs
- Strategic reasoning required
- Multi-step planning needed
- Context analysis and synthesis
- Quality matters more than speed

**Use opus when:**
- High-stakes decisions ($100K+ impact)
- Brand-defining work
- Complex ethical considerations
- Novel problem-solving required
- Maximum quality is non-negotiable

---

## Standard 4: Sub-Agent Efficiency

When agents spawn sub-agents using the Task tool, same efficiency standards apply.

### Sub-Agent Model Selection

Agents SHOULD include guidance in their OPTIMIZATION section:

```markdown
**Sub-agent guidance:**
When launching sub-agents via Task tool:
- Use haiku for: simple searches, data gathering, batch operations
- Use sonnet for: analysis, strategic planning, complex reasoning
- Use opus for: critical decisions only (with explicit approval)
```

### Sub-Agent Invocation

```typescript
// Good: Appropriate model for task complexity
Task(subagent_type: "scout-haiku", model: "haiku", task: "find files")
Task(subagent_type: "analyst", model: "sonnet", task: "analyze metrics")

// Bad: Overkill model for simple task
Task(subagent_type: "scout", model: "sonnet", task: "find files")  // Wastes cost
```

### Cascading Efficiency

Parent agent's efficiency choices cascade to sub-agents:
- Efficient parent → spawn efficient sub-agents
- Inefficient parent → sub-agents may also be inefficient

Monitor total cost across agent tree, not just individual agents.

---

## Standard 5: Prompt Caching

From `.claude/docs/prompt-caching-guide.md` - **Rule 1: Agents >15K tokens MUST cache**.

### When to Use Prompt Caching

**MUST cache when:**
- Agent >15K tokens (complexity demands caching)
- Agent invoked frequently (amortize cache setup)
- Stable prompt content (cacheable sections don't change)

**Impact:**
- 26.5% average cost reduction
- 90% cache hit rate for stable content
- Faster execution (cached sections load instantly)

### Cache Implementation

```yaml
---
promptCaching: true
cacheFiles:
  - .claude/skills/marketing_funnel.md
  - .claude/skills/growth_frameworks.md
  - .claude/knowledge/brand_guidelines.md
---
```

**Cache strategy guidelines:**
- Cache skills, patterns, knowledge (stable content)
- Don't cache user input, dynamic context
- List specific files to cache (for transparency)

### Examples

14/18 agents currently use prompt caching (78% adoption rate).

See: `.claude/docs/prompt-caching-guide.md` for full implementation guide.

---

## Standard 6: Token Budget Monitoring (Future)

**Status:** Not currently implemented, planned for future

### Proposed Monitoring

Track actual vs expected token usage to identify optimization opportunities:

```typescript
interface AgentMetrics {
  expectedTokens: number;  // From YAML or OPTIMIZATION section
  actualTokens: number;    // From telemetry
  variance: number;        // (actual - expected) / expected
  warning: boolean;        // variance > 30%
}
```

### Audit Command (Planned)

```bash
/audit-agent-efficiency [agent-name]

# Output:
# Agent: marketing-director
# Expected: 12-15K tokens/run
# Actual: 18K tokens/run (avg over 20 runs)
# Variance: +25%
# Recommendation: Review prompt for unnecessary context
```

**Note:** Manual auditing currently possible via telemetry data in `/tmp/agents/`.

---

## Enforcement

These standards are enforced via multiple mechanisms:

### 1. Meta-Pattern Validation

`.claude/patterns/meta/component_agent.md` validates:
- ✅ YAML fields present (model, thinking)
- ✅ OPTIMIZATION section exists (sonnet/opus only)
- ✅ Prompt caching specified (agents >15K)
- ⚠️ Warnings for efficiency concerns

Run validation:
```bash
/pattern component_agent [agent-name]
```

### 2. CLAUDE.md Rules

Terse behavior rules (always loaded):
- "Rule: ALWAYS use modern CLI tools"
- "Rule: Patterns are mandatory when they exist"
- (Future) "Rule: Sonnet/opus agents MUST have OPTIMIZATION section"

### 3. Manual Review

Code reviews should check:
- Model selection appropriate for task complexity
- OPTIMIZATION section justifies model choice
- Sub-agent efficiency guidance provided
- Token budget realistic

---

## Examples

### Example 1: Haiku Agent (Efficient)

```yaml
---
name: scout-haiku
model: haiku
thinking: (none)  # Haiku doesn't support thinking
---
```

**No OPTIMIZATION section required** (haiku is inherently efficient).

Cost: $0.01-0.02/run

---

### Example 2: Sonnet Agent (Well-Optimized)

```yaml
---
name: marketing-director
model: sonnet
thinking: think-hard
---

## OPTIMIZATION

**Model:** sonnet (strategic campaign planning requires multi-criteria optimization)
**Thinking:** think-hard (balancing budget, channels, timing, messaging)
**Expected token usage:** 12-15K tokens/run
**Cost:** ~$0.18-0.25/run

**Prompt caching:** Enabled
- `.claude/skills/marketing_funnel.md` (2.5K tokens)
- `.claude/skills/growth_frameworks.md` (3K tokens)
- Reduction: 22% cost savings

**Escalate to opus when:**
- Major rebrand or positioning shift ($500K+ impact)
- Crisis communications (brand reputation risk)

**Delegate to haiku when:**
- Content calendar generation
- Channel recommendation (simple heuristics)

**Sub-agent guidance:**
- copywriter-haiku for social posts, ad copy
- analyst (sonnet) for performance analysis
- brand-strategist (sonnet) for strategic decisions
```

Cost: $0.18-0.25/run (with caching)

---

### Example 3: Opus Agent (Justified)

```yaml
---
name: brand-strategist-opus
model: opus
thinking: ultrathink
---

## OPTIMIZATION

**Model:** opus (brand positioning is high-stakes, requires maximum strategic depth)
**Thinking:** ultrathink (complex brand architecture, competitive differentiation)
**Expected token usage:** 25-35K tokens/run
**Cost:** ~$1.50-2.50/run

**When to use this agent:**
- ONLY for brand-defining work ($500K+ impact)
- Major positioning decisions
- Complex competitive strategy
- NOT for routine marketing tasks (use marketing-director instead)

**Delegate everything possible:**
- Research to scout-haiku
- Analysis to analyst (sonnet)
- Content to copywriter-haiku
- This agent ONLY does high-level strategic synthesis

**Cost justification:**
Brand positioning errors cost $500K-$5M in lost market opportunity. $2/run is negligible insurance for getting it right.
```

Cost: $1.50-2.50/run (high but justified for high-stakes work)

---

## Best Practices

### 1. Start Small, Escalate as Needed

```python
# Good: Progressive escalation
1. Try haiku first for simple task
2. If insufficient → try sonnet
3. If still insufficient → try opus
4. Document why each escalation was necessary

# Bad: Start with opus "to be safe"
1. Use opus for everything
2. Waste 10-100x cost on simple tasks
```

### 2. Batch Operations with Haiku

```python
# Good: Haiku for batch operations
for item in items:
    result = Task("copywriter-haiku", task=f"write {item}")

# Bad: Sonnet for batch operations (10x cost)
for item in items:
    result = Task("copywriter", model="sonnet", task=f"write {item}")
```

### 3. Measure and Optimize

```bash
# Check agent telemetry after 10-20 runs
cat /tmp/agents/agent-abc123/telemetry.json

# Compare actual vs expected tokens
# If variance >30%, investigate:
# - Unnecessary context loaded?
# - Prompt too verbose?
# - Skills auto-activating incorrectly?
```

### 4. Document Trade-Offs

```markdown
## OPTIMIZATION

**Why sonnet not haiku:**
Tried haiku initially but quality suffered:
- 40% of outputs needed rewrites (2x cost)
- Strategic insights were shallow
- Sonnet provides 10% better quality for 5x cost
- Net: Better to use sonnet upfront than rework haiku outputs
```

---

## Migration Checklist

For existing agents without efficiency standards:

- [ ] Add `model` field to YAML frontmatter
- [ ] Add `thinking` field to YAML (sonnet/opus only)
- [ ] Add OPTIMIZATION section (sonnet/opus only)
  - [ ] Justify model choice
  - [ ] Document expected token usage
  - [ ] Provide escalation criteria
  - [ ] Provide delegation criteria
  - [ ] Add sub-agent guidance
- [ ] Specify prompt caching if agent >15K tokens
- [ ] Run `/pattern component_agent [name]` to validate
- [ ] Test agent works with new fields
- [ ] Monitor telemetry for actual token usage

---

## FAQ

**Q: Can I use sonnet for a simple task if I want higher quality?**
A: Yes, but justify it in OPTIMIZATION section. Guidelines are not enforced strictly.

**Q: What if my haiku agent is too slow for batch operations?**
A: Consider parallelizing with multiple haiku agents instead of escalating to sonnet.

**Q: Should I cache everything?**
A: No. Only cache stable content (skills, patterns, knowledge). Don't cache dynamic context.

**Q: How do I know if my agent is >15K tokens?**
A: Rough estimate: 1 page = 500 tokens. Agent with 30 pages of skills = 15K tokens.

**Q: What if I don't know expected token usage?**
A: Run agent 5-10 times, check telemetry, then set expected budget to 80th percentile.

---

## Related Documentation

- `.claude/docs/prompt-caching-guide.md` - Comprehensive caching guide
- `.claude/docs/agent-orchestration.md` - Multi-agent coordination
- `.claude/patterns/meta/component_agent.md` - Agent validation meta-pattern
- `CLAUDE.md` - Core system behavior rules

---

**Maintained by:** Marketing Agent Infrastructure Team
**Last Reviewed:** 2025-11-10
**Next Review:** 2025-12-10
