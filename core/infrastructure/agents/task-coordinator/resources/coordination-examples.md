# Coordination Examples

**Purpose:** Real-world examples demonstrating task-coordinator delegation patterns in practice.

---

## Example 1: Simple Delegation

**Scenario:** User requests quick content creation

**User Request:**
```
"Create 5 social media posts about our new pricing model"
```

**Your Coordination Process:**

### Phase 1: Delegation Strategy
```markdown
📋 COORDINATION PLAN

**User Request:** "Create 5 social media posts about our new pricing model"
**Deliverables:** 5 LinkedIn/Twitter posts, platform-specific formatting

**Delegation Plan:**
1. copywriter-haiku → Create 5 social posts (haiku model, $0.02 estimated cost)

**Workflow:** Simple delegation (1 agent)
**Dependencies:** None
**Quality Gates:** Brand voice compliance

Proceeding with Phase 2: Agent Delegation...
```

### Phase 2: Coordination
1. **Read brand guidelines** (if available)
2. **Launch copywriter-haiku** with comprehensive prompt:

```markdown
Task prompt:
"The user requested: 'Create 5 social media posts about our new pricing model'

Your role: Create social media content

Context:
- New pricing model: [details from user/files]
- Target platforms: LinkedIn (professional), Twitter (concise)
- Brand voice: [guidelines if available]

Deliverables:
- 5 social media posts
- Mix of LinkedIn (2-3 posts, 150-200 words) and Twitter (2-3 posts, 280 chars max)
- Each post highlights different value proposition
- Include relevant hashtags and CTAs

Quality bar: Brand-compliant, conversion-focused, platform-appropriate.

Return: 5 ready-to-publish posts with platform labels."
```

3. **Wait for completion**
4. **Collect results**

### Phase 3: Validation & Integration

**Quality Check:**
- ✓ All 5 posts created?
- ✓ Platform-appropriate formatting?
- ✓ Brand voice consistent?

**Present to User:**
```markdown
# Social Media Posts - Coordination Results

**Specialist Coordinated:**
- copywriter-haiku: Content creation

**Deliverables:**
1. Social Media Posts (by copywriter-haiku)
   - 3 LinkedIn posts (professional tone, 150-200 words each)
   - 2 Twitter posts (concise, 280 chars with hashtags)
   - All posts highlight pricing value propositions

## Content Preview
[Show first post as sample]

Ready to publish! All 5 posts follow brand guidelines and are optimized for each platform.

---
**Coordinated by:** task-coordinator-v2
```

**Outcome:**
- **Duration:** 2-3 minutes
- **Cost:** ~$0.02 (Haiku)
- **Quality:** Brand-compliant, platform-optimized

---

## Example 2: Multi-Agent Sequential Coordination

**Scenario:** Analysis followed by strategic recommendations

**User Request:**
```
"Analyze our Q4 campaign performance and recommend improvements for Q1"
```

**Your Coordination Process:**

### Phase 1: Delegation Strategy
```markdown
📋 COORDINATION PLAN

**User Request:** "Analyze our Q4 campaign performance and recommend improvements for Q1"
**Deliverables:** Performance analysis + Strategic recommendations for Q1

**Delegation Plan:**
1. analyst → Q4 performance analysis (sonnet, ~15 min)
2. marketing-director → Q1 strategy with improvements (sonnet, ~20 min, depends on step 1)

**Workflow:** Sequential (step 2 needs step 1 results)
**Dependencies:** marketing-director needs analyst's findings
**Quality Gates:** Data accuracy (analyst), strategic alignment (director)

Proceeding with Phase 2: Agent Delegation...
```

### Phase 2: Coordination

**Step 1: Launch Analyst**
```markdown
Task prompt:
"The user requested: 'Analyze our Q4 campaign performance and recommend improvements for Q1'

Your role: Q4 Performance Analysis

Context:
- Campaign data location: [file paths]
- Key metrics to analyze: CAC, LTV, conversion rates, channel performance
- Compare vs. Q3 and vs. annual targets

Deliverables:
- Q4 performance summary (overall metrics)
- Channel breakdown (performance by channel)
- Trend analysis (what's improving/declining)
- Data-driven insights (what the numbers tell us)

Quality bar: Statistical rigor, accurate attribution, actionable insights.

Return: Comprehensive Q4 analysis ready for strategic planning."
```

**Wait for analyst to complete (~15 min)**

**Step 2: Launch Marketing Director (with analyst's results)**
```markdown
Task prompt:
"The user requested: 'Analyze our Q4 campaign performance and recommend improvements for Q1'

Your role: Q1 Strategic Recommendations

Context:
- Q4 Performance Analysis (from analyst):
[Full analyst report]

- Business goals for Q1: [from user/files]
- Budget constraints: [if known]

Deliverables:
- Strategic recommendations for Q1 (3-5 key initiatives)
- Channel strategy adjustments (based on Q4 performance)
- Budget allocation recommendations
- Success metrics for Q1
- Implementation timeline

Quality bar: Data-driven, strategic, actionable, aligned with business goals.

Return: Q1 strategy ready for implementation."
```

**Wait for marketing-director to complete (~20 min)**

### Phase 3: Validation & Integration

**Quality Check:**
- ✓ Analysis covers all key metrics?
- ✓ Recommendations are data-driven?
- ✓ Strategy aligns with Q4 learnings?

**Synthesize:**
```markdown
# Q4 Analysis + Q1 Strategy - Coordination Results

**Specialists Coordinated:**
- analyst: Q4 performance analysis
- marketing-director: Q1 strategic recommendations

**Deliverables:**
1. Q4 Performance Analysis (by analyst)
   - Overall performance: [summary]
   - Channel breakdown: [insights]
   - Key trends: [findings]

2. Q1 Strategic Recommendations (by marketing-director)
   - Top 3 initiatives: [strategic focus]
   - Budget allocation: [channel mix]
   - Success metrics: [KPIs]

## Integrated Output

### Q4 Learnings
[Analyst's key insights]

### Q1 Strategy
[Marketing director's recommendations, grounded in Q4 data]

### Implementation Plan
[Director's timeline and next steps]

## Next Steps
1. Review and approve Q1 strategy
2. Allocate budget per channel recommendations
3. Set up tracking for new KPIs

---
**Coordinated by:** task-coordinator-v2
```

**Outcome:**
- **Duration:** ~35 minutes (15 + 20)
- **Cost:** ~$0.15 (2 Sonnet agents)
- **Quality:** Data-driven strategy, seamless analysis-to-strategy flow

---

## Example 3: Hub-and-Spoke Review Pattern

**Scenario:** High-stakes deliverable requiring multi-perspective quality assurance

**User Request:**
```
"Create our brand manifesto for upcoming launch"
```

**Your Coordination Process:**

### Phase 1: Delegation Strategy
```markdown
📋 COORDINATION PLAN

**User Request:** "Create our brand manifesto for upcoming launch"
**Deliverables:** Brand manifesto (high-stakes, strategic document)

**Delegation Plan:**
1. copywriter → Draft brand manifesto (sonnet, ~30 min)
2. Parallel review (3 specialists, ~15 min each):
   - brand-strategist → Brand alignment check
   - marketing-director → Strategic fit check
   - llm-seo-expert → Messaging clarity check
3. copywriter → Revise based on consolidated feedback (~15 min)

**Workflow:** Hub-and-spoke (creation → parallel review → revision)
**Dependencies:** Reviews depend on draft, revision depends on reviews
**Quality Gates:** Brand compliance, strategic alignment, messaging clarity

Proceeding with Phase 2: Agent Delegation...
```

### Phase 2: Coordination

**Step 1: Primary Creation**
```markdown
Launch copywriter:
"Create brand manifesto draft (600-800 words)
- Company mission, vision, values
- What we stand for
- How we're different
- Promise to customers

Return: Draft manifesto ready for review."
```

**Wait for draft (~30 min)**

**Step 2: Parallel Review (launch 3 agents simultaneously in single message)**

Agent 1 - brand-strategist:
```markdown
"Review brand manifesto for brand alignment:
[Full manifesto draft]

Check:
- Brand voice consistency
- Values alignment
- Positioning clarity
- Authenticity

Return: Brand compliance report + suggested edits."
```

Agent 2 - marketing-director:
```markdown
"Review brand manifesto for strategic fit:
[Full manifesto draft]

Check:
- Strategic alignment with business goals
- Competitive differentiation
- Target audience resonance
- Long-term sustainability

Return: Strategic assessment + recommended changes."
```

Agent 3 - llm-seo-expert:
```markdown
"Review brand manifesto for messaging clarity:
[Full manifesto draft]

Check:
- Message clarity and simplicity
- Memorable phrasing
- Emotional resonance
- Quotable elements

Return: Messaging analysis + optimization suggestions."
```

**Wait for all 3 reviews (~15 min)**

**Step 3: Consolidate Feedback**

Analyze 3 reviews:
- **Common theme from 2+ reviewers:** "Tone too formal, needs more human warmth" (brand + messaging)
- **Strategic feedback:** "Strengthen differentiation section" (director)
- **Brand feedback:** "Values section too generic" (brand)
- **Messaging feedback:** "Opening lacks emotional hook" (seo-expert)

**Consolidated revision request:**
```markdown
Launch copywriter:
"Revise brand manifesto based on review feedback:

Original draft:
[Full manifesto]

Consolidated feedback:
1. PRIORITY: Add human warmth to tone (2 reviewers flagged formal tone)
2. Strengthen competitive differentiation section
3. Make values section more specific to our brand
4. Create stronger emotional hook in opening

Return: Revised manifesto addressing all 4 points."
```

**Wait for revision (~15 min)**

### Phase 3: Validation & Integration

**Final Quality Check:**
- ✓ All feedback addressed?
- ✓ Tone warmer and more human?
- ✓ Differentiation strengthened?
- ✓ Values specific?

**Present to User:**
```markdown
# Brand Manifesto - Coordination Results

**Specialists Coordinated:**
- copywriter: Draft creation + revision
- brand-strategist: Brand alignment review
- marketing-director: Strategic fit review
- llm-seo-expert: Messaging clarity review

**Deliverables:**
1. Brand Manifesto - Final Version (by copywriter, reviewed by 3 specialists)
   - 750 words
   - Incorporates feedback from brand, strategy, and messaging perspectives
   - Ready for launch

## Review Process
**Round 1:** 3 parallel reviews identified 4 improvement areas
**Round 2:** Consolidated feedback applied, all issues addressed

## Final Brand Manifesto
[Full revised manifesto]

---
**Coordinated by:** task-coordinator-v2
```

**Outcome:**
- **Duration:** ~60 minutes (30 + 15 + 15)
- **Cost:** ~$0.30 (4 Sonnet agents: 1 primary + 3 reviewers)
- **Quality:** High-stakes deliverable, multi-perspective quality assurance

---

## Example 4: Two-Stage Research → Execution

**Scenario:** Complex task requiring context discovery

**User Request:**
```
"Update all social media templates with new branding guidelines"
```

**Your Coordination Process:**

### Phase 1: Delegation Strategy
```markdown
📋 COORDINATION PLAN

**User Request:** "Update all social media templates with new branding guidelines"
**Deliverables:** All social media templates updated with new branding

**Delegation Plan:**
1. scout-haiku → Find all social media template files (haiku, ~5 min, $0.01)
2. task-implementer → Update all templates with new branding (sonnet, ~20 min, $0.10)

**Workflow:** Two-stage (discovery → execution)
**Dependencies:** Implementer needs file list from scout
**Quality Gates:** All templates found, branding applied consistently

Cost Optimization: Using haiku for discovery saves 33% vs. sonnet-only

Proceeding with Phase 2: Agent Delegation...
```

### Phase 2: Coordination

**Stage 1: Discovery (Haiku)**
```markdown
Launch scout-haiku:
"Find all social media template files in the codebase.

Search for:
- Files with 'template' in name or path
- Social media related: linkedin, twitter, instagram, facebook
- Common formats: .md, .html, .jsx, .tsx

Return: Complete list of file paths for social media templates."
```

**Wait for scout (~5 min)**

**Scout returns:** 15 template files found

**Stage 2: Execution (Sonnet with full context)**
```markdown
Launch task-implementer:
"Update all social media templates with new branding guidelines.

Template files to update:
[15 file paths from scout]

New branding guidelines:
[Branding details from user/files]

Changes needed:
- Update color scheme to new brand colors
- Replace old logo with new logo
- Update font references to new brand fonts
- Ensure brand voice guidelines reflected in copy

Return: Summary of changes made to all 15 templates."
```

**Wait for implementer (~20 min)**

### Phase 3: Validation & Integration

**Quality Check:**
- ✓ All 15 templates updated?
- ✓ Branding applied consistently?
- ✓ No templates missed?

**Present to User:**
```markdown
# Social Media Template Branding Update - Coordination Results

**Specialists Coordinated:**
- scout-haiku: Template file discovery
- task-implementer: Branding application

**Deliverables:**
1. Template Discovery (by scout-haiku)
   - Found 15 social media template files across codebase

2. Branding Updates (by task-implementer)
   - Updated all 15 templates with new branding:
     * New color scheme applied
     * Logos replaced
     * Font references updated
     * Brand voice guidelines incorporated

## Files Modified
[List of 15 updated template files]

## Next Steps
1. Test templates with sample content
2. Deploy to production when approved

---
**Coordinated by:** task-coordinator-v2
**Cost Optimization:** Two-stage approach saved 33% vs. single Sonnet agent
```

**Outcome:**
- **Duration:** ~25 minutes (5 + 20)
- **Cost:** ~$0.11 (vs. $0.15 for Sonnet-only)
- **Savings:** 33% cost reduction via two-stage pattern

---

## Key Takeaways from Examples

### Example 1 (Simple Delegation)
- **Pattern:** Single agent
- **When:** Quick, straightforward tasks
- **Model:** Haiku for cost savings
- **Duration:** Minutes
- **Cost:** Pennies

### Example 2 (Sequential)
- **Pattern:** Analysis → Strategy
- **When:** Step 2 needs Step 1 results
- **Model:** Sonnet for quality
- **Duration:** Sum of agent times
- **Cost:** ~$0.15 for 2 specialists

### Example 3 (Hub-and-Spoke)
- **Pattern:** Create → Parallel review → Revise
- **When:** High-stakes, multi-perspective quality assurance
- **Model:** Sonnet for quality-critical work
- **Duration:** Longest parallel path + revisions
- **Cost:** ~$0.30 for 4 specialists

### Example 4 (Two-Stage)
- **Pattern:** Haiku discovery → Sonnet execution
- **When:** Context discovery needed first
- **Model:** Haiku for search, Sonnet for implementation
- **Duration:** Minimal overhead (~5 min)
- **Savings:** 30-40% vs. Sonnet-only

---

**Reference:** Use these examples during coordination to match user requests to proven patterns.
