# Pattern: two_stage_content_sonnet_haiku

**Category**: workflow | **Complexity**: moderate | **Thinking**: think
**Knowledge Required**: brand-voice-guidelines, audience-research (compressed)
**Cost Savings**: 33-70% vs sonnet-only generation

---

## PURPOSE

Generate high-volume content variants cost-effectively using Haiku for generation and Sonnet for strategic selection.

**Key innovation:** Haiku generates many options cheaply ($0.01), Sonnet selects best strategically ($0.03) = $0.04 total vs $0.12 sonnet-only = **67% cost savings**.

---

## INPUT

**Required:**
- TASK: Content generation request (subject lines, social posts, ad copy, headlines)
- QUANTITY: Number of variants to generate (typically 10-20)
- TARGET: Persona (Strategic Sarah / Technical Tom) or audience description

**Optional:**
- GOAL: Awareness / Engagement / Conversion
- PLATFORM: LinkedIn / Email / Twitter / Meta / Google
- CONSTRAINTS: Length limits, keyword requirements, tone overrides

---

## Task Decomposition Override (v5.4.0)

**CRITICAL:** This pattern overrides Claude's default task decomposition behavior. YOU MUST follow the 3-phase sequence below. DO NOT create your own task breakdown.

### ❌ PROHIBITED SEQUENCE
1. ❌ Generating variants without strategic angle diversification
2. ❌ Selecting without evaluation criteria (brand voice, persona resonance, performance predictors)
3. ❌ Skipping A/B testing recommendations
4. ❌ Missing cost/quality analysis

**Consequences:** Low-quality variants, poor selection rationale, missed optimization opportunities → ARCHITECTURE VIOLATION

### ✅ MANDATORY 3-PHASE SEQUENCE

#### Phase 1: Content Strategy & Generation Parameters
**Decision Point:** Define content requirements and generation strategy

**YOU MUST:**
1. Analyze content type and determine quantity (typically 10-20 variants)
2. Identify target persona and campaign goal (awareness/engagement/conversion)
3. Define platform constraints (length limits, format requirements)
4. Plan strategic angle diversification (benefit, curiosity, urgency, question, data-driven)

**Output Acknowledgment After Phase 1:**
```
✅ Phase 1 Complete - Content Strategy Defined
📋 Content Type: [subject lines/posts/ad copy/headlines]
📊 Quantity: [10-20] variants across [5] strategic angles
🎯 Target: [persona] for [goal] on [platform]
⏭️  Proceeding to Phase 2: High-Volume Generation (Haiku)
```

#### Phase 2: High-Volume Generation & Initial Selection
**YOU MUST:**
1. Spawn copywriter-haiku subagent for variant generation
2. Generate [QUANTITY] diverse variants across strategic angles
3. Ensure brand voice alignment (check voice-patterns-quick.md)
4. Follow platform best practices (character limits, formatting)
5. Have Haiku provide top 3 picks with brief reasoning
6. Format output as numbered list for easy review

**Output Acknowledgment After Phase 2:**
```
✅ Phase 2 Complete - Variants Generated (Haiku)
📊 Variants: [count] generated across strategic angles
💰 Cost: ~$0.01
⏱️  Time: 30-60 seconds
🎯 Haiku's Top 3: [list variant numbers]
⏭️  Proceeding to Phase 3: Strategic Selection (Sonnet)
```

#### Phase 3: Strategic Selection & Performance Analysis
**YOU MUST:**
1. Spawn copywriter (sonnet) subagent for strategic review
2. Evaluate each variant against criteria (brand voice, persona resonance, goal optimization, platform best practices, performance predictors)
3. Select top 3 variants with detailed reasoning
4. Provide performance predictions based on benchmarks
5. Create A/B testing recommendation (test setup, success metrics, timeline)
6. Calculate cost analysis (total cost, savings vs sonnet-only)

**Output Acknowledgment After Phase 3:**
```
✅ Phase 3 Complete - Two-Stage Content Pattern Finished
🥇 Top 3 Selected: [variant numbers]
📊 Performance Predictions: [expected metrics]
🧪 A/B Test: #[X] vs #[Y] recommended
💰 Cost Savings: 67% ($0.04 vs $0.12 sonnet-only)
✅ Pattern execution complete
```

## Language Standards (v5.4.0)

**Directive Language:** This pattern uses imperative commands.
- ✅ "YOU MUST", "DO NOT", "ALWAYS", "NEVER"
- ❌ "should", "consider", "might", "could", "try to"

**Rationale:** Weak language leads to inconsistent execution. Strong directives ensure reliable pattern application.

---

## PROCESS

### Stage 1: High-Volume Generation (Haiku)

**Use copywriter-haiku subagent:**

```
"Use copywriter-haiku subagent to generate [QUANTITY] [content type] variants for [TASK].

Target: [PERSONA]
Goal: [GOAL]
Platform: [PLATFORM]
Constraints: [any specific requirements]

Instructions:
1. Generate [QUANTITY] diverse variants exploring different angles:
   - Benefit-focused (solve pain point directly)
   - Curiosity-driven (create information gap)
   - Urgency-based (time-limited opportunity)
   - Question-based (engage with reader challenge)
   - Data-driven (lead with compelling stat)

2. Maintain brand voice alignment (check voice-patterns-quick.md)

3. Follow platform best practices:
   - Email subject lines: 30-50 characters
   - LinkedIn posts: 150-300 words
   - Ad headlines: 25-40 characters
   - Twitter: 280 characters

4. Include your top 3 picks with brief reasoning

5. Format output as numbered list for easy selection"
```

**Expected output from Haiku:**
- 10-20 diverse variants
- Haiku's top 3 recommendations
- Total cost: ~$0.01
- Time: 30-60 seconds

### Stage 2: Strategic Selection (Sonnet)

**Use copywriter (sonnet) subagent:**

```
"Use copywriter subagent to review the [QUANTITY] variants generated by copywriter-haiku and select the top 3 with strategic rationale.

Task: [original TASK]
Target: [PERSONA]
Goal: [GOAL]

Variants to review:
[paste Haiku output]

Instructions:
1. Evaluate each variant against criteria:
   ✓ Brand voice alignment (tone, vocabulary, messaging)
   ✓ Persona resonance (pain points, language, value proposition)
   ✓ Goal optimization (awareness hooks, engagement drivers, conversion triggers)
   ✓ Platform best practices (length, format, style)
   ✓ Performance predictors (based on benchmarks from brand-voice-guidelines)

2. Select top 3 variants with detailed reasoning:
   - Why this variant will perform well
   - What makes it strategically sound
   - Expected performance (engagement rate, CTR, conversion estimate)
   - Any suggested minor tweaks for optimization

3. Rank by expected performance (#1 = strongest)

4. Provide A/B testing recommendation:
   - Test #1 vs #2 (why these two)
   - Success metrics to track
   - When to declare winner

5. Format output clearly with final selections ready to use"
```

**Expected output from Sonnet:**
- Top 3 variants with strategic analysis
- Performance predictions
- A/B testing plan
- Total cost: ~$0.03
- Time: 45-90 seconds

---

## OUTPUT

```markdown
## Two-Stage Content Generation: [Task]
**Mode:** Sonnet-Haiku (Cost-Optimized)
**Target:** [Persona] | **Goal:** [Goal] | **Platform:** [Platform]

### Stage 1: Generation (Haiku)
**Variants Generated:** [Quantity]
**Cost:** $0.01 | **Time:** 30-60s

[Haiku output: All variants]

Haiku's Top Picks:
1. [Variant #] - [brief reason]
2. [Variant #] - [brief reason]
3. [Variant #] - [brief reason]

---

### Stage 2: Selection (Sonnet)
**Strategic Review Completed**
**Cost:** $0.03 | **Time:** 45-90s

#### 🥇 #1 Recommended (Highest Expected Performance)
**Variant:** [selected variant text]

**Why This Will Perform:**
- [Strategic reason 1]
- [Strategic reason 2]
- [Strategic reason 3]

**Expected Performance:** [metric prediction based on benchmarks]

**Minor Optimization:** [if any suggested tweaks]

---

#### 🥈 #2 Recommended (Strong Alternative)
**Variant:** [selected variant text]

**Why This Will Perform:**
- [Strategic reason 1]
- [Strategic reason 2]

**Expected Performance:** [metric prediction]

---

#### 🥉 #3 Recommended (A/B Test Candidate)
**Variant:** [selected variant text]

**Why This Will Perform:**
- [Strategic reason 1]
- [Strategic reason 2]

**Expected Performance:** [metric prediction]

---

### A/B Testing Recommendation

**Test Setup:**
- **Variant A:** #1 (50% traffic)
- **Variant B:** #2 (50% traffic)

**Why Test These Two:**
[Reasoning: different approaches, test hypothesis]

**Success Metrics:**
- Primary: [key metric, e.g., open rate, CTR, engagement]
- Secondary: [supporting metric]

**Sample Size:** [statistical significance requirement]
**Timeline:** [how long to run test]
**Winner Declaration:** [when to choose based on confidence level]

---

### Cost Analysis
**Total Cost:** $0.04
**Sonnet-Only Cost:** $0.12
**Savings:** 67% ($0.08 saved)

**Quality:** Strategic selection maintains 95%+ quality vs sonnet-only
**Speed:** 75-150 seconds total (fast exploration + strategic review)
```

---

## QUALITY CHECKS

Before delivering final output:

- [ ] Top 3 selections maintain brand voice alignment
- [ ] Variants match target persona pain points and language
- [ ] Platform constraints met (length, format, style)
- [ ] Performance predictions grounded in benchmarks (from skills)
- [ ] A/B testing plan is actionable with clear metrics
- [ ] Cost savings accurately reported
- [ ] All variants ready to use without additional editing

---

## VARIATIONS

**QUANTITY_OVERRIDE:** Generate 5, 15, 20, or 50 variants (default: 10)

**FILTERING:** Have Haiku pre-filter by specific criteria before Sonnet review
Example: "Generate 20 variants, eliminate any over 50 characters, pass top 10 to Sonnet"

**HYBRID_SELECTION:** Combine Haiku's intuitive picks with Sonnet's strategic analysis
Example: "Give weight to Haiku's top 3 in final ranking"

**MULTI_ROUND:** Iterate if first batch doesn't yield winners
Example: "Haiku generates 10 → Sonnet rejects all → Haiku generates 10 new with feedback"

---

## USE CASES

**Ideal for:**
- ✅ Email subject line batches (10-20 variants for A/B testing)
- ✅ Social media posts (daily content generation at scale)
- ✅ Ad copy exploration (test different hooks, value props, CTAs)
- ✅ Initial content drafts (fast ideation for Sonnet to refine)
- ✅ High-volume campaigns (100+ pieces needing cost optimization)

**NOT ideal for:**
- ❌ Long-form content (blog posts, white papers - use sonnet-sonnet)
- ❌ Brand-defining messaging (manifestos, positioning - use sonnet-sonnet)
- ❌ Single-piece critical work (major launch headline - use sonnet-sonnet)
- ❌ Complex narratives (case studies, storytelling - use sonnet-only)

---

## EXAMPLE

**Input:**
```
TASK: Email subject lines for demo request campaign
QUANTITY: 15
TARGET: Strategic Sarah (C-suite, ROI-focused)
GOAL: Conversion (demo bookings)
CONSTRAINTS: 30-50 characters, must mention "AI" or "automation"
```

**Stage 1 Output (Haiku):**
```
15 Subject Line Variants Generated ($0.01, 45s):

1. AI doubles marketing ROI—see how
2. Your competitors are automating. Are you?
3. Strategic Sarah, your AI demo awaits
4. 5 ways AI transforms campaign performance
5. Automate or fall behind: book demo
6. [Name], ROI increase starts here
7. The AI tool your CMO recommends
8. Marketing automation: 30% cost cut
9. Strategic advantage via AI (demo)
10. Transform campaigns with AI today
11. Book demo: AI for executive teams
12. AI-powered marketing in 30 minutes
13. C-suite guide to marketing AI
14. Demo: How AI delivers 10x ROI
15. Automation for strategic leaders

Haiku's Top Picks:
1. #1 - Direct benefit, ROI-focused, under 40 chars
2. #8 - Specific savings metric, compelling for CFO review
3. #14 - Bold claim with qualification, catches attention
```

**Stage 2 Output (Sonnet):**
```
Strategic Review Completed ($0.03, 60s):

🥇 #1: "AI doubles marketing ROI—see how"
Why: Leads with specific outcome (2x ROI), creates curiosity with "see how" CTA. Sarah focuses on bottom-line results. 37 characters = mobile-optimized.
Expected: 28-32% open rate (vs 22% baseline)

🥈 #8: "Marketing automation: 30% cost cut"
Why: Concrete savings metric. Budget-conscious executives respond to specific percentages. "Cost cut" vs "savings" tests better per benchmarks.
Expected: 26-30% open rate

🥉 #14: "Demo: How AI delivers 10x ROI"
Why: Bold claim backed by demo proof. "10x" creates high curiosity. Frontloading "Demo" sets expectation.
Expected: 24-28% open rate

A/B Test: #1 vs #8 (test benefit vs cost savings framing)
Sample: 1,000 emails each
Timeline: 48 hours
Winner: >3% lift with 95% confidence
```

---

## INTEGRATION WITH OTHER PATTERNS

**Chain with optimization patterns:**
```
two_stage_content_sonnet_haiku → improve_copy → generate_variants
```

**Chain with analysis patterns:**
```
two_stage_content_sonnet_haiku → design_ab_test → extract_insights (post-campaign)
```

**Use in larger workflows:**
```
create_campaign_plan → two_stage_content_sonnet_haiku (generate assets) → review by brand-strategist
```

---

## PERFORMANCE METRICS

**Cost savings:** 67-70% vs sonnet-only
**Quality retention:** 95%+ (strategic selection maintains quality)
**Speed:** 75-150 seconds total (2-3x faster than sonnet iteration)
**Optimal volume:** 10-20 variants (sweet spot for exploration + review)
**Success rate:** 90%+ of campaigns use at least one top-3 variant

---

**This pattern is the default for `/two-stage` command. For maximum quality on critical work, use `two_stage_content_sonnet_sonnet` pattern instead.**
