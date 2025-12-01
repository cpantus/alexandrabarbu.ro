# Data Storytelling & Annotations

**Parent Skill:** data-visualization-designer
**Last Updated:** 2025-11-15
**Token Budget:** ~1,800 tokens

---

## Purpose

Provides strategies for adding narrative structure and strategic annotations to data visualizations. Load this when you need to guide viewers through complex data, highlight insights, or build a data-driven narrative.

---

## Annotation Strategy

**Principle:** Annotations explain what's notable, not what's obvious

### Types of Annotations

#### 1. Insight Annotations (Most Important)
**Purpose:** Call out the key finding

**Format:**
```
"Sales increased 47% after product launch"
"Conversion rate peaked during holiday season"
"Customer churn spiked following price change"
```

**Placement:** Near the relevant data point
**Style:** Bold or colored to stand out
**When:** Always include on executive-facing dashboards

#### 2. Context Annotations
**Purpose:** Explain external events that caused data changes

**Format:**
```
"Product launch ↓"
"Competitor entered market ↓"
"Marketing campaign →"
```

**Placement:** Vertical line or arrow at event time
**Style:** Small, subtle (don't compete with data)
**When:** Time-series data with known external factors

#### 3. Comparison Annotations
**Purpose:** Highlight how current data compares to benchmarks

**Format:**
```
"23% above target"
"Industry average: 2.3%"
"Last year: $1.2M"
```

**Placement:** Reference line with label
**Style:** Dashed line + small label
**When:** Data has meaningful benchmarks

#### 4. Threshold Annotations
**Purpose:** Show acceptable/critical ranges

**Format:**
```
"Critical threshold ——"
"Target range [shaded area]"
"Acceptable zone"
```

**Placement:** Horizontal line or shaded region
**Style:** Subtle (gray/background color)
**When:** Data has defined limits (SLAs, targets, budgets)

---

## Narrative Arc for Data Stories

### Structure 1: Problem-Solution Arc
**Use when:** Showing how action solved an issue

**Flow:**
1. **Problem:** Chart shows declining metric
2. **Action:** Annotation marks intervention point
3. **Solution:** Chart shows recovery/improvement
4. **Outcome:** Annotation states final result

**Example:**
```
Chart: Customer satisfaction over time
"Satisfaction declining" → "New support system launched ↓" → "Satisfaction recovering" → "Now 15% above baseline"
```

### Structure 2: Before-After Comparison
**Use when:** Demonstrating impact of change

**Flow:**
1. **Baseline:** Show "before" data
2. **Intervention:** Mark the change point
3. **Impact:** Show "after" data
4. **Magnitude:** Annotate the difference

**Example:**
```
Split chart or vertical divider:
Before (shaded) | After (highlighted)
"Previous process: 45min avg" | "New process: 23min avg (49% faster)"
```

### Structure 3: Progression Over Time
**Use when:** Showing gradual improvement or trends

**Flow:**
1. **Starting point:** Annotate initial state
2. **Milestones:** Mark key progress points
3. **Current state:** Highlight latest data
4. **Trajectory:** Annotate future projection

**Example:**
```
Line chart with milestones:
"Q1: Pilot launch" → "Q2: Team expanded" → "Q3: Full rollout" → "Q4: 300% growth"
```

---

## Annotation Best Practices

### DO:
- ✅ Explain WHY data changed (external events, actions taken)
- ✅ Quantify differences ("47% increase" not "increased a lot")
- ✅ Use arrows/lines to connect annotation to data
- ✅ Keep annotations brief (5-10 words max)
- ✅ Position near relevant data (not in legend/title)

### DON'T:
- ❌ State the obvious ("This is the January bar")
- ❌ Add annotations to every data point (visual clutter)
- ❌ Use long sentences (break into multiple annotations)
- ❌ Place annotations far from data (forces eye travel)
- ❌ Use ALL CAPS or excessive styling

---

## Progressive Disclosure in Dashboards

**Principle:** Show overview first, details on demand

### Layer 1: Headline Metrics (5-second glance)
```
Big number cards:
"$2.4M Revenue"
"47% Growth"
"12,450 Customers"
```

**Goal:** Instant status check

### Layer 2: Trend Visualization (15-second scan)
```
Sparklines or small line charts next to metrics:
"$2.4M Revenue [small upward trend line]"
```

**Goal:** Direction and magnitude

### Layer 3: Detailed Charts (1-minute analysis)
```
Full-size charts with annotations:
[Line chart showing revenue over time with annotated milestones]
```

**Goal:** Understand drivers and context

### Layer 4: Drill-Down (On-demand)
```
Click metric → Detailed breakdown view
Hover chart → Tooltip with specifics
```

**Goal:** Answer "why?" questions

---

## Annotation Style Guide

### Typography:
- **Size:** 10-12px (smaller than chart title, larger than axis labels)
- **Weight:** Regular or Medium (not bold unless emphasizing insight)
- **Color:** Dark gray (#666666) or accent color for insights
- **Style:** Italic for context, Regular for data

### Visual Elements:
- **Lines:** Thin (0.5-1px), dashed for references
- **Arrows:** Simple, minimal (not decorative)
- **Boxes:** Only for multi-line annotations, light border
- **Background:** White or very light gray if needed for legibility

### Placement:
- **Above data:** Headline insights
- **Near data:** Contextual explanations
- **Below chart:** Source citations, methodology notes
- **Avoid:** Covering data, overlapping annotations

---

## Examples

### Example 1: Sales Dashboard with Narrative

```
Chart Title: "Q4 Sales Performance"

Annotations:
1. "Black Friday campaign ↓" (vertical line at Nov 24)
2. "37% spike in conversions" (callout at peak)
3. "Inventory shortage limited sales" (explanation at dip)
4. "Target: $2M" (dashed horizontal line)
5. "Exceeded by 12%" (final outcome annotation)
```

**Narrative:** Campaign drove spike → inventory issue created temporary dip → still exceeded target

### Example 2: User Engagement Over Time

```
Chart Title: "Monthly Active Users Growth"

Annotations:
1. "Baseline: 10,000 MAU" (starting point)
2. "Referral program launched ↓" (Q2 marker)
3. "45% organic growth" (Q2-Q3 period highlight)
4. "Mobile app released ↓" (Q3 marker)
5. "Now at 32,000 MAU" (current state)
```

**Narrative:** Strategic actions (referral, mobile) drove user growth milestones

---

## Quick Checklist

**For every visualization:**
- [ ] Key insight annotated (what's notable?)
- [ ] External events marked (what caused changes?)
- [ ] Benchmarks shown (how does this compare?)
- [ ] Annotations positioned near data
- [ ] Annotations brief (5-10 words)
- [ ] Visual hierarchy clear (data > annotations > axes)

---

## Cross-References

Related skills: [@data-visualization-designer]
Related resources: [@data-visualization-designer/resources/crap-principles-for-data.md, @data-visualization-designer/resources/data-ink-optimization.md]
