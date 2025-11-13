# /two-stage - Two-Stage Content Generation Workflow

⚡ Execute cost-optimized or quality-optimized two-stage content generation workflows.

---

## Syntax

```bash
/two-stage [mode] [task]
```

**Modes:**
- `<default>` - Sonnet-Haiku (cost-optimized, 67% savings)
- `s2` - Sonnet-Sonnet (quality-optimized, maximum strategic depth)

---

## Mode 1: Default (Sonnet-Haiku) - Cost-Optimized

**When to use:**
- High-volume content (social posts, email subject lines, ad copy)
- Initial exploration and ideation
- Budget-conscious work
- Quick iterations and A/B testing variants

**Process:**
1. **copywriter-haiku** generates 10-20 variants rapidly ($0.01, 30-60s)
2. **copywriter (sonnet)** reviews and selects top 3 strategically ($0.03, 45-90s)

**Total cost:** $0.04 (vs $0.12 sonnet-only)
**Savings:** 67%
**Quality:** 95%+ maintained through strategic selection

### Examples

```bash
# Email subject lines
/two-stage "Generate 15 email subject lines for demo request campaign targeting Strategic Sarah"

# Social media posts
/two-stage "Create 10 LinkedIn post variants about Q4 marketing ROI results"

# Ad copy
/two-stage "Generate 12 Meta ad headlines for GrowthEngine AI Copilot feature"

# Quick content iterations
/two-stage "Create 20 CTA button text variants for landing page conversion optimization"
```

---

## Mode 2: s2 (Sonnet-Sonnet) - Quality-Optimized

**When to use:**
- Brand-defining messaging (manifestos, positioning statements)
- Major campaigns ($100K+ budgets, high visibility)
- Executive communications (CEO blog, investor updates)
- Product launches (competitive markets, strategic positioning)
- Critical work where stakes justify time investment

**Process:**
1. **copywriter (sonnet)** generates 5-10 variants with deep thinking ($0.08, 3-5 min)
2. **copywriter (sonnet)** conducts systematic review and strategic analysis ($0.04, 2-3 min)

**Total cost:** $0.12 (same as direct sonnet work)
**Value add:** Structured quality process, rigorous selection framework
**Quality:** Maximum (95-100% stakeholder approval)

### Examples

```bash
# Brand messaging
/two-stage s2 "Create brand manifesto headline for $500K GrowthEngine product launch"

# Strategic narratives
/two-stage s2 "Generate positioning statement variants for category-defining AI copilot"

# Executive communications
/two-stage s2 "Draft CEO blog post headline variants for major pivot announcement"

# High-stakes campaigns
/two-stage s2 "Create landing page hero headline for Series B announcement campaign"
```

---

## Command Execution

When you invoke `/two-stage`:

### Step 1: Parse Input

**Extract:**
- Mode: default (sonnet-haiku) or s2 (sonnet-sonnet)
- Task: Content generation request
- Context: Infer persona, goal, platform from task description

**Example parsing:**
```
Input: "/two-stage Generate 15 email subject lines for demo request"
Mode: default (sonnet-haiku)
Task: Email subject lines
Quantity: 15
Goal: Conversion (demo request)
Persona: Infer from context (likely Strategic Sarah for demo requests)
```

```
Input: "/two-stage s2 Create brand manifesto headline for product launch"
Mode: s2 (sonnet-sonnet)
Task: Brand manifesto headline
Stakes: Product launch (high)
Goal: Awareness + positioning
Platform: Multi-channel
```

### Step 2: Load Appropriate Pattern

**For default mode:**
```
Load and execute: @.claude/patterns/workflow/two_stage_content_sonnet_haiku.md
```

**For s2 mode:**
```
Load and execute: @.claude/patterns/workflow/two_stage_content_sonnet_sonnet.md
```

### Step 3: Execute Workflow

**Default mode (Sonnet-Haiku):**
1. Invoke copywriter-haiku subagent with task details
2. Wait for Haiku to generate variants
3. Invoke copywriter subagent to review and select top 3
4. Present final output with cost analysis

**s2 mode (Sonnet-Sonnet):**
1. Invoke copywriter subagent with extended thinking
2. Wait for strategic generation
3. Invoke copywriter subagent for systematic review
4. Present comprehensive analysis with executive recommendation

### Step 4: Format Output

**Provide:**
- Selected variants (top 3)
- Strategic rationale for selections
- Performance predictions
- A/B testing recommendations
- Cost breakdown (input/output tokens, USD cost)
- Savings calculation (vs alternative approaches)

---

## Task Enrichment

**Auto-enrich task descriptions to maximize agent effectiveness:**

**Add persona inference:**
```
User: "Generate email subject lines for demo request"
Enriched: "Generate email subject lines for demo request targeting Strategic Sarah (C-suite, ROI-focused)"
```

**Add platform constraints:**
```
User: "Create social post about Q4 results"
Enriched: "Create LinkedIn post (150-300 words, professional tone) about Q4 results for Strategic Sarah"
```

**Add goal clarity:**
```
User: "Generate ad headlines"
Enriched: "Generate Meta ad headlines (25-40 chars) for awareness stage targeting Technical Tom"
```

**Add quantity defaults:**
```
User: "Create subject line variants"
Enriched: "Create 10-15 subject line variants for A/B testing"
```

---

## Quality Gates

**Before executing workflow, verify:**

1. **Task is appropriate for two-stage:**
   - ✅ Variant generation (multiple options needed)
   - ✅ Clear target audience (persona identified)
   - ✅ Defined format (subject lines, posts, headlines)
   - ❌ NOT single-piece work (use direct agent invocation)
   - ❌ NOT long-form content (use blog writing patterns)

2. **Mode selection is justified:**
   - Default mode: High volume, cost matters, quick iterations
   - s2 mode: High stakes, brand-defining, strategic depth required

3. **Context is sufficient:**
   - If missing persona: Infer or ask user
   - If missing goal: Infer or default to engagement
   - If missing quantity: Default to 10 for default mode, 5-7 for s2

---

## Integration with Other Commands

**Chain with patterns:**
```bash
/two-stage "Generate subject lines" → /pattern improve_copy → /pattern generate_variants
```

**Use in workflows:**
```bash
/pattern create_campaign_plan  # Strategy
→ /two-stage "Generate campaign headlines"  # Content generation
→ Use brand-strategist subagent for compliance review
```

**Combine with analysis:**
```bash
/two-stage "Generate ad variants"  # Create content
→ /pattern design_ab_test  # Plan testing
→ /analyze [results-file]  # Post-campaign analysis
```

---

## Cost Tracking

**Report costs clearly:**

```markdown
### Cost Analysis
**Mode:** [Default / s2]
**Stage 1:** $[X] ([tokens] tokens, [agent] agent)
**Stage 2:** $[Y] ([tokens] tokens, [agent] agent)
**Total:** $[Z]

**Comparison:**
- Direct Sonnet: $[comparison]
- Savings: [%] ($[amount])

**ROI Justification:**
[Why this approach vs alternatives]
```

---

## Examples with Full Output

### Example 1: Default Mode (Email Subject Lines)

**Command:**
```bash
/two-stage "Generate 15 email subject lines for product demo request targeting Strategic Sarah"
```

**Execution:**
1. Parse: Mode=default, Task=subject lines, Quantity=15, Persona=Strategic Sarah, Goal=conversion
2. Load pattern: two_stage_content_sonnet_haiku.md
3. Execute Stage 1: copywriter-haiku generates 15 variants
4. Execute Stage 2: copywriter reviews and selects top 3
5. Present output with A/B testing plan

**Output preview:**
```markdown
## Two-Stage Content Generation: Email Subject Lines
**Mode:** Sonnet-Haiku (Cost-Optimized)
**Target:** Strategic Sarah | **Goal:** Conversion (demo bookings)

### Stage 1: Generation (Haiku - $0.01, 45s)
15 variants generated exploring benefit, curiosity, urgency, question, data-driven angles

### Stage 2: Selection (Sonnet - $0.03, 60s)
🥇 "AI doubles marketing ROI—see how" (32% predicted open rate)
🥈 "Strategic Sarah, your AI demo awaits" (28% predicted open rate)
🥉 "Demo: How AI delivers 10x ROI" (26% predicted open rate)

### A/B Test: #1 vs #2 (benefit vs personalization)
Sample: 1,000 emails each | Timeline: 48 hours | Winner: >3% lift @ 95% confidence

### Cost: $0.04 (vs $0.12 sonnet-only) = 67% savings
```

### Example 2: s2 Mode (Brand Headline)

**Command:**
```bash
/two-stage s2 "Create brand manifesto headline for $500K GrowthEngine AI Copilot product launch"
```

**Execution:**
1. Parse: Mode=s2, Task=brand headline, Stakes=$500K launch, Platform=multi-channel
2. Load pattern: two_stage_content_sonnet_sonnet.md
3. Execute Stage 1: copywriter (sonnet) with deep thinking generates 7 variants
4. Execute Stage 2: copywriter (sonnet) systematic review with scoring matrix
5. Present comprehensive analysis with executive recommendation

**Output preview:**
```markdown
## Two-Stage Content Generation: Brand Manifesto Headline
**Mode:** Sonnet-Sonnet (Quality-Optimized)
**Stakes:** $500K product launch, category entry, competitive market

### Stage 1: Strategic Generation (Sonnet - $0.08, 4 min)
7 variants exploring aspiration, provocation, insight, benefit, story, data angles

### Stage 2: Strategic Review (Sonnet - $0.04, 3 min)
Scoring Matrix: Brand Voice (30%) + Persona (30%) + Strategic (25%) + Performance (15%)

🥇 "Your marketing team, amplified: AI that thinks like your best strategist" (87/100)
Why This Wins: "Amplified" reduces AI replacement anxiety, "best strategist" appeals to identity
Brand Impact: Positions as strategic partner, enables premium pricing, differentiates from commodity
Risk: Must prove strategic capability immediately in demo
Confidence: High (aligns with "copilot" category trend)

### Executive Recommendation: Use Variant #1
Rationale: Strategic framing + aspiration appeal + differentiation via "amplification"
Confidence: High | Contingency: Fall back to Variant #2 if demos don't convert

### Cost: $0.12 (same as direct sonnet, added structure value)
```

---

## Best Practices

1. **Choose mode strategically:**
   - Default for volume/speed/cost (social, emails, ads)
   - s2 for stakes/quality/depth (launches, positioning, execs)

2. **Provide context:**
   - Include persona when known
   - Specify platform constraints
   - Mention stakes if high (budget, visibility)

3. **Trust the process:**
   - Stage 1 explores, Stage 2 selects
   - Don't skip to Stage 2 (loses cost/time benefit)

4. **Use outputs systematically:**
   - Test top 2 variants (not just #1)
   - Track actual performance vs predictions
   - Iterate learnings into next generation

5. **Integrate with workflows:**
   - Two-stage is content generation step
   - Chain with strategy, review, analysis patterns

---

## Troubleshooting

**Issue:** "Default mode variants are too similar"
**Solution:** Increase quantity (ask for 20 variants) or add constraint ("explore 5 distinct angles")

**Issue:** "s2 mode selections scored <80"
**Solution:** Regenerate Stage 1 with s2 feedback, or escalate to marketing-director for strategic guidance

**Issue:** "Unclear which mode to use"
**Rule of thumb:** If budget >$50K or exec visibility, use s2. Otherwise default.

**Issue:** "Need faster than default mode"
**Solution:** Skip two-stage, use copywriter-haiku directly (trade strategic selection for speed)

---

**The /two-stage command brings best-practice two-stage workflows to your fingertips. Default mode for 67% savings, s2 mode for maximum quality. Choose strategically.**
