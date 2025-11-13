# Analysis Patterns Bundle

**Quick reference for all 7 data analysis patterns.**
**Purpose:** Fast pattern selection for marketing analytics. Use lazy loading for execution.

---

## Bundle Overview

**7 patterns** for marketing data analysis:
- Insights extraction, performance comparison, content audits, funnel/cohort/attribution analysis, ecommerce analysis

**Token savings:** ~6.2K tokens (loading bundle vs all 7 patterns)
**Use when:** Analyzing campaign data, extracting insights, optimization planning

---

## Pattern Selection Guide

### By Data Type
- **Campaign metrics:** `compare_performance`, `extract_insights`, `attribution_analysis`
- **Website/funnel data:** `funnel_analysis`, `analyze_ecommerce_website`
- **User behavior:** `cohort_analysis`, `funnel_analysis`
- **Content performance:** `audit_content`, `compare_performance`

### By Question Type
- "What happened?" → `extract_insights`, `compare_performance`
- "Why did it happen?" → `attribution_analysis`, `funnel_analysis`
- "What should we do?" → `audit_content`, `cohort_analysis`
- "How are we performing?" → `compare_performance`, `analyze_ecommerce_website`

### By Complexity
- **Quick (30-60 min):** `extract_insights`, `compare_performance`
- **Medium (1-2 hours):** `audit_content`, `funnel_analysis`
- **Deep (2-4 hours):** `cohort_analysis`, `attribution_analysis`, `analyze_ecommerce_website`

---

## Patterns Reference

### 1. extract_insights
**Path:** `.claude/patterns/analysis/extract_insights.md`
**Purpose:** Extract actionable insights from marketing data
**Input:** Dataset (CSV/metrics), analysis goal, context
**Output:** Key insights, trends, recommendations, visualization suggestions
**Best for:** Campaign post-mortems, monthly reviews, data exploration
**Complexity:** Simple (~1000 tokens)

### 2. compare_performance
**Path:** `.claude/patterns/analysis/compare_performance.md`
**Purpose:** Compare performance across campaigns, channels, time periods
**Input:** 2-5 entities to compare, metrics, time frame
**Output:** Comparison table, variance analysis, insights, recommendations
**Best for:** A/B test analysis, channel optimization, trend analysis
**Complexity:** Simple (~900 tokens)

### 3. audit_content
**Path:** `.claude/patterns/analysis/audit_content.md`
**Purpose:** Content quality and performance audit
**Input:** Content inventory, performance metrics, quality criteria
**Output:** Audit report, content gaps, refresh priorities, quality scores
**Best for:** Content strategy, SEO audits, messaging consistency
**Complexity:** Medium (~1200 tokens)

### 4. funnel_analysis
**Path:** `.claude/patterns/analysis/funnel_analysis.md`
**Purpose:** Conversion funnel analysis and optimization
**Input:** Funnel stages, conversion rates, drop-off points
**Output:** Funnel visualization, bottlenecks, optimization opportunities
**Best for:** Conversion optimization, user journey analysis
**Complexity:** Medium (~1300 tokens)

### 5. cohort_analysis
**Path:** `.claude/patterns/analysis/cohort_analysis.md`
**Purpose:** User cohort behavior and retention analysis
**Input:** Cohort definitions, behavioral metrics, time periods
**Output:** Cohort tables, retention curves, insights, segments
**Best for:** Product-market fit, retention optimization, LTV analysis
**Complexity:** Complex (~1500 tokens)

### 6. attribution_analysis
**Path:** `.claude/patterns/analysis/attribution_analysis.md`
**Purpose:** Marketing attribution modeling and channel contribution
**Input:** Touch points, conversion data, attribution model preference
**Output:** Attribution model, channel contribution, budget recommendations
**Best for:** Budget allocation, channel mix optimization, ROI analysis
**Complexity:** Complex (~1600 tokens)

### 7. analyze_ecommerce_website
**Path:** `.claude/patterns/analysis/analyze_ecommerce_website.md`
**Purpose:** Comprehensive ecommerce website analysis
**Input:** Website URL or analytics data, business goals
**Output:** UX audit, conversion analysis, recommendations, priority matrix
**Best for:** Ecommerce optimization, conversion rate improvement
**Complexity:** Complex (~1400 tokens)

---

## Usage

**Standard analysis workflow:**
```
1. Load bundle for pattern selection
2. /pattern extract_insights [data.csv] "campaign performance"
3. Review insights
4. /pattern compare_performance [campaign-a] [campaign-b]
5. Generate recommendations
```

**Deep-dive analysis:**
```
/pattern funnel_analysis [funnel-data]
→ Identify bottleneck
→ /pattern cohort_analysis [user-segments]
→ Find high-value cohorts
→ /pattern attribution_analysis [touchpoints]
→ Optimize channel mix
```

---

## Common Workflows

### Monthly Performance Review
1. **Extract insights** - Overall trends and patterns
2. **Compare performance** - This month vs last month
3. **Attribution analysis** - Channel contribution
4. **Recommendations** - Next month priorities

### Conversion Optimization
1. **Funnel analysis** - Identify drop-off points
2. **Analyze ecommerce** - Website UX issues
3. **Cohort analysis** - High-converting segments
4. **Compare performance** - Before/after tests

### Content Strategy
1. **Audit content** - Current content quality
2. **Extract insights** - Performance patterns
3. **Compare performance** - Top vs bottom content
4. **Recommendations** - Content priorities

### Attribution & Budget Planning
1. **Attribution analysis** - Current channel mix
2. **Compare performance** - Channel efficiency
3. **Cohort analysis** - Customer journey patterns
4. **Budget recommendations** - Reallocation plan

---

## Common Inputs

All analysis patterns expect:
- **Data source:** CSV files, analytics export, or metrics
- **Analysis timeframe:** Date ranges for comparison
- **Business context:** Goals, benchmarks, constraints
- **Metrics of interest:** KPIs to focus on

All analysis patterns output:
- **Executive summary:** Key findings (3-5 bullets)
- **Detailed analysis:** Charts, tables, calculations
- **Actionable insights:** What the data means
- **Recommendations:** Next steps with priorities

---

## Integration with Other Bundles

**Analysis → Strategy:**
- Use insights to inform `create_campaign_plan`
- Feed attribution data into `create_gtm_plan`

**Analysis → Optimization:**
- Funnel insights → `optimize_conversion`
- Content audit → `improve_copy`
- Performance gaps → `design_ab_test`

**Strategy → Analysis → Optimization:**
1. Strategy: Plan campaign
2. Analysis: Measure results
3. Optimization: Improve performance
4. Repeat cycle

---

## Token Estimates

| Loading Method | Tokens | Savings |
|----------------|--------|---------|
| All 7 patterns individually | ~8.9K | Baseline |
| Analysis bundle only | ~2.7K | 70% |
| Bundle + 1 pattern | ~4.0K | 55% |
| Bundle + 3 patterns | ~6.6K | 26% |

**Recommendation:** Load bundle first, then load specific patterns based on analysis needs.

---

## Related Resources

- **Skills:** `analytics-quick`, `marketing-analytics`
- **Tools:** CSV analysis, attribution modeling
- **Quality checks:** `quality-checks-library.md` (ANL category)
- **Other bundles:** `strategy-bundle`, `optimization-bundle`

---

**Version:** 1.0
**Last updated:** 2025-01-08
**Part of:** Memory Optimization v4.1 (Pattern Bundling)
