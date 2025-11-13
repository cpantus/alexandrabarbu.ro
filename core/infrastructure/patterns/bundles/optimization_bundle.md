# Optimization Patterns Bundle

**Quick reference for all 6 optimization patterns.**
**Purpose:** Fast pattern selection for marketing optimization. Use lazy loading for execution.

---

## Bundle Overview

**6 patterns** for optimizing marketing performance:
- Copy improvement, variant generation, conversion optimization, subject lines, CTAs, A/B test design

**Token savings:** ~5.0K tokens (loading bundle vs all 6 patterns)
**Use when:** Improving existing content, A/B testing, conversion rate optimization

---

## Pattern Selection Guide

### By Optimization Target
- **Email marketing:** `improve_subject_lines`, `improve_copy`, `generate_variants`
- **Website/landing pages:** `optimize_conversion`, `optimize_cta`, `improve_copy`
- **Ad campaigns:** `improve_copy`, `generate_variants`, `design_ab_test`
- **General content:** `improve_copy`, `generate_variants`

### By Goal
- **Increase open rates:** `improve_subject_lines`
- **Increase click-through:** `optimize_cta`, `improve_copy`
- **Increase conversions:** `optimize_conversion`, `design_ab_test`
- **Test variations:** `generate_variants`, `design_ab_test`

### By Stage
- **Planning:** `design_ab_test` (design experiment)
- **Creating:** `generate_variants` (create test variants)
- **Optimizing:** `improve_copy`, `optimize_cta`, `optimize_conversion`
- **Measuring:** `design_ab_test` (analysis plan)

---

## Patterns Reference

### 1. improve_copy
**Path:** `.claude/patterns/optimization/improve_copy.md`
**Purpose:** Improve existing marketing copy for better performance
**Input:** Current copy, performance metrics, improvement goals
**Output:** Improved copy (3 versions), change rationale, A/B test plan
**Best for:** Underperforming content, messaging refresh, conversion optimization
**Complexity:** Medium (~1100 tokens)

### 2. generate_variants
**Path:** `.claude/patterns/optimization/generate_variants.md`
**Purpose:** Generate A/B test variants for any marketing asset
**Input:** Control version, test hypothesis, number of variants (3-5)
**Output:** Test variants, differentiation matrix, prediction, measurement plan
**Best for:** A/B testing, multivariate testing, creative exploration
**Complexity:** Simple (~900 tokens)

### 3. optimize_conversion
**Path:** `.claude/patterns/optimization/optimize_conversion.md`
**Purpose:** Comprehensive conversion rate optimization analysis
**Input:** Page/funnel details, current performance, user research
**Output:** CRO audit, prioritized recommendations, test roadmap
**Best for:** Landing pages, checkout flows, lead gen forms
**Complexity:** Complex (~1400 tokens)

### 4. improve_subject_lines
**Path:** `.claude/patterns/optimization/improve_subject_lines.md`
**Purpose:** Optimize email subject lines for open rates
**Input:** Current subject line, email context, audience
**Output:** 10 improved variants, personalization options, testing strategy
**Best for:** Email campaigns, newsletters, promotional emails
**Complexity:** Simple (~800 tokens)

### 5. optimize_cta
**Path:** `.claude/patterns/optimization/optimize_cta.md`
**Purpose:** Optimize call-to-action copy and placement
**Input:** Current CTA, page context, conversion goal
**Output:** CTA variants (5-10), placement recommendations, urgency tactics
**Best for:** Buttons, forms, conversion points
**Complexity:** Simple (~900 tokens)

### 6. design_ab_test
**Path:** `.claude/patterns/optimization/design_ab_test.md`
**Purpose:** Design rigorous A/B test with statistical validity
**Input:** Hypothesis, metric, baseline, desired lift
**Output:** Test design, sample size, duration, analysis plan, success criteria
**Best for:** Experiment planning, test validation, ROI projection
**Complexity:** Medium (~1200 tokens)

---

## Usage

**Quick optimization workflow:**
```
1. Identify underperforming asset
2. /pattern improve_copy [current-copy] "increase CTR"
3. /pattern generate_variants [improved-copy] 5
4. /pattern design_ab_test [test-details]
5. Launch test
```

**Comprehensive CRO:**
```
/pattern optimize_conversion [landing-page-url]
→ Get prioritized recommendations
→ /pattern optimize_cta [current-cta]
→ /pattern improve_copy [page-copy]
→ /pattern design_ab_test [changes]
→ Implement and measure
```

**Email optimization:**
```
/pattern improve_subject_lines [current-subject]
→ Get 10 variants
→ /pattern improve_copy [email-body]
→ /pattern generate_variants [best-version] 3
→ /pattern design_ab_test [test-plan]
```

---

## Common Workflows

### Content Refresh Cycle
1. **Analyze performance** (use `analysis-bundle`)
   - Identify underperforming content
2. **Improve copy**
   - Generate improved versions
3. **Generate variants**
   - Create A/B test versions
4. **Design test**
   - Plan experiment
5. **Measure & iterate**

### Landing Page CRO
1. **Optimize conversion**
   - Comprehensive audit
2. **Optimize CTA**
   - Button/form optimization
3. **Improve copy**
   - Hero, value props
4. **Design A/B test**
   - Test all changes
5. **Implement winner**

### Email Campaign Optimization
1. **Improve subject lines**
   - 10 variants for testing
2. **Improve copy**
   - Email body optimization
3. **Optimize CTA**
   - Button text and placement
4. **Design A/B test**
   - Multi-element test
5. **Send and measure**

### A/B Testing Program
1. **Identify opportunities** (from `analysis-bundle`)
2. **Generate variants**
   - Create test versions
3. **Design tests**
   - Plan experiments
4. **Prioritize roadmap**
   - Highest impact first
5. **Run test program**

---

## Common Inputs

All optimization patterns expect:
- **Current version:** Existing copy/design
- **Performance baseline:** Current metrics
- **Improvement goal:** Target lift or KPI
- **Constraints:** Brand guidelines, character limits

All optimization patterns output:
- **Optimized versions:** 3-10 improved variants
- **Change rationale:** Why each change works
- **Testing plan:** How to validate improvements
- **Expected impact:** Predicted performance lift

---

## Integration with Other Bundles

**Analysis → Optimization:**
1. Use `extract_insights` to find opportunities
2. Apply optimization patterns to top priorities
3. Use `design_ab_test` to validate

**Optimization → Content:**
1. Optimize existing content
2. Use learnings in `content-bundle` patterns
3. Apply best practices to new creation

**Full cycle:**
1. **Strategy** (strategy-bundle): Plan campaign
2. **Content** (content-bundle): Create assets
3. **Analysis** (analysis-bundle): Measure performance
4. **Optimization** (optimization-bundle): Improve results
5. Repeat

---

## Token Estimates

| Loading Method | Tokens | Savings |
|----------------|--------|---------|
| All 6 patterns individually | ~7.2K | Baseline |
| Optimization bundle only | ~2.2K | 69% |
| Bundle + 1 pattern | ~3.3K | 54% |
| Bundle + 3 patterns | ~5.5K | 24% |

**Recommendation:** Load bundle to identify best pattern, then load 1-2 for execution.

---

## Optimization Principles

**1. Test, don't guess**
- Always validate with A/B tests
- Use `design_ab_test` for rigor

**2. Focus on high impact**
- Prioritize by potential lift × traffic
- Start with conversion points

**3. Iterate continuously**
- Optimization is ongoing
- Build testing roadmap

**4. Learn and document**
- Capture test learnings
- Apply insights across channels

**5. Respect statistical significance**
- Use proper sample sizes
- Don't call tests early

---

## Related Resources

- **Skills:** `brand-voice-guidelines` (messaging constraints)
- **Tools:** A/B testing platforms, analytics
- **Quality checks:** `quality-checks-library.md` (OPT category)
- **Other bundles:** `analysis-bundle` (identify opportunities), `content-bundle` (create new)

---

**Version:** 1.0
**Last updated:** 2025-01-08
**Part of:** Memory Optimization v4.1 (Pattern Bundling)
