# Strategy Patterns Bundle

**Quick reference for all 6 strategic planning patterns.**
**Purpose:** Fast pattern selection for marketing strategy work. Use lazy loading for execution.

---

## Bundle Overview

**6 patterns** for strategic marketing planning:
- Campaign plans, positioning, segmentation, value props, competitive analysis, GTM

**Token savings:** ~5.4K tokens (loading bundle vs all 6 patterns)
**Use when:** Strategic planning, campaign development, market analysis

---

## Pattern Selection Guide

### By Project Type
- **New product/feature:** `position_product` → `define_value_prop` → `create_gtm_plan`
- **Campaign launch:** `segment_audience` → `create_campaign_plan`
- **Market entry:** `competitive_analysis` → `position_product` → `create_gtm_plan`
- **Content strategy:** `segment_audience` → `create_campaign_plan`

### By Stakeholder Need
- **Executive/Leadership:** `create_gtm_plan`, `competitive_analysis`
- **Product marketing:** `position_product`, `define_value_prop`
- **Demand gen:** `create_campaign_plan`, `segment_audience`
- **Market research:** `competitive_analysis`, `segment_audience`

### By Timeline
- **Quick (1-2 hours):** `segment_audience`, `define_value_prop`
- **Medium (2-4 hours):** `create_campaign_plan`, `position_product`
- **Deep (4-8 hours):** `competitive_analysis`, `create_gtm_plan`

---

## Patterns Reference

### 1. create_campaign_plan
**Path:** `.claude/patterns/strategy/create_campaign_plan.md`
**Purpose:** Comprehensive multi-channel campaign strategy
**Input:** Campaign goal, budget, timeline, target personas
**Output:** Campaign brief, channel mix, content calendar, KPIs, budget allocation
**Best for:** Product launches, demand gen programs, brand campaigns
**Complexity:** Complex (~1600 tokens)

### 2. position_product
**Path:** `.claude/patterns/strategy/position_product.md`
**Purpose:** Product positioning framework and messaging
**Input:** Product details, market, competitors, differentiation
**Output:** Positioning statement, key messages, proof points, objection handling
**Best for:** New products, repositioning, messaging refresh
**Complexity:** Medium (~1400 tokens)

### 3. segment_audience
**Path:** `.claude/patterns/strategy/segment_audience.md`
**Purpose:** Audience segmentation and persona prioritization
**Input:** Market data, customer profiles, business goals
**Output:** Segment definitions, persona priorities, targeting strategy
**Best for:** Market analysis, campaign targeting, personalization strategy
**Complexity:** Medium (~1200 tokens)

### 4. define_value_prop
**Path:** `.claude/patterns/strategy/define_value_prop.md`
**Purpose:** Value proposition development and testing
**Input:** Product, customer pains, alternatives, unique value
**Output:** Value prop statement, benefit hierarchy, proof, testing plan
**Best for:** Product marketing, sales enablement, messaging
**Complexity:** Simple (~1000 tokens)

### 5. competitive_analysis
**Path:** `.claude/patterns/strategy/competitive_analysis.md`
**Purpose:** Competitive landscape analysis and positioning
**Input:** Competitors (3-5), market, evaluation criteria
**Output:** Competitive matrix, strengths/weaknesses, differentiation, threats
**Best for:** Market entry, strategic planning, sales competitive intel
**Complexity:** Complex (~1500 tokens)

### 6. create_gtm_plan
**Path:** `.claude/patterns/strategy/create_gtm_plan.md`
**Purpose:** Go-to-market strategy and launch plan
**Input:** Product, market, timeline, resources, success metrics
**Output:** GTM strategy, launch phases, channel plan, enablement, metrics
**Best for:** Product launches, market expansion, major initiatives
**Complexity:** Complex (~1700 tokens)

---

## Usage

**Sequential workflow (recommended for launches):**
```
1. /pattern competitive_analysis [competitors]
2. /pattern position_product [product-details]
3. /pattern define_value_prop [positioning]
4. /pattern segment_audience [market-data]
5. /pattern create_campaign_plan [segments]
6. /pattern create_gtm_plan [all-inputs]
```

**Standalone usage:**
```
/pattern create_campaign_plan "Q1 demand gen" "Strategic Sarah,Technical Tom"
```

**Ad-hoc reference:**
```
Load bundle → Review patterns → Select best fit → Execute
```

---

## Common Workflows

### Product Launch Workflow
1. **Competitive analysis** (Week 1-2)
   - Understand market landscape
   - Identify differentiation opportunities
2. **Positioning** (Week 2-3)
   - Define unique position
   - Craft key messages
3. **Value props** (Week 3)
   - Articulate customer value
   - Develop proof points
4. **Segmentation** (Week 4)
   - Prioritize target audiences
   - Create targeting strategy
5. **GTM plan** (Week 5-6)
   - Comprehensive launch strategy
   - Timeline and resource allocation
6. **Campaign plans** (Week 6-8)
   - Channel-specific campaigns
   - Content calendar

### Campaign Planning Workflow
1. **Audience segmentation**
   - Define target segments
   - Prioritize personas
2. **Campaign strategy**
   - Multi-channel plan
   - Budget and timeline
3. **Content execution** (switch to content-bundle)
   - Create campaign assets
   - A/B testing variants

### Competitive Response Workflow
1. **Competitive analysis**
   - Analyze competitor moves
   - Identify threats/opportunities
2. **Positioning review**
   - Refine differentiation
   - Update messaging
3. **Campaign plan**
   - Counter-positioning campaign
   - Channel strategy

---

## Common Inputs

All strategy patterns expect:
- **Business context:** Product, market, goals
- **Competitive landscape:** Key competitors, alternatives
- **Target audience:** Personas, segments, ICP
- **Resources:** Budget, timeline, team

All strategy patterns output:
- **Strategic framework:** Core strategy document
- **Actionable recommendations:** Next steps, priorities
- **Measurement plan:** KPIs, success metrics
- **Executive summary:** 1-page overview for leadership

---

## Integration with Other Bundles

**Before strategy (research phase):**
- Use `analysis-bundle` for market/customer insights
- Gather data for strategic decisions

**After strategy (execution phase):**
- Use `content-bundle` to create campaign assets
- Use `optimization-bundle` to refine messaging

**Parallel with strategy:**
- Use `analysis-bundle` to validate assumptions
- Iterate based on data insights

---

## Token Estimates

| Loading Method | Tokens | Savings |
|----------------|--------|---------|
| All 6 patterns individually | ~8.4K | Baseline |
| Strategy bundle only | ~3.0K | 64% |
| Bundle + 1 pattern on-demand | ~4.4K | 48% |
| Bundle + 3 patterns on-demand | ~7.2K | 14% |

**Recommendation:** Load bundle for project scoping, then load 1-2 patterns as needed for execution.

---

## Related Resources

- **Skills:** `campaign-strategy-quick`, `audience-research`
- **Frameworks:** Campaign strategy frameworks in skills
- **Quality checks:** `quality-checks-library.md` (STR category)
- **Other bundles:** `analysis-bundle` (research), `content-bundle` (execution)

---

**Version:** 1.0
**Last updated:** 2025-01-08
**Part of:** Memory Optimization v4.1 (Pattern Bundling)
