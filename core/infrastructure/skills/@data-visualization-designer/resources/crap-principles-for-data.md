# CRAP Principles for Data Visualization

**Parent Skill:** data-visualization-designer
**Last Updated:** 2025-11-15
**Token Budget:** ~1,500 tokens

---

## Purpose

Applies the classic CRAP design principles (Contrast, Repetition, Alignment, Proximity) specifically to data visualizations and dashboards. Load this when you need to improve the visual hierarchy and organization of charts and dashboards.

---

## Contrast

**Principle:** Create visual hierarchy through deliberate differences

**In Data Viz:**
- **Primary data:** Bold, saturated colors
- **Secondary data:** Muted tones (30-50% saturation)
- **Context/gridlines:** Light gray (#E0E0E0), thin lines
- **Annotations:** Medium weight, distinct color

**Example:**
```
Primary metric line: #FF6B35 (saturated orange), 3px weight
Benchmark line: #004E89 (saturated blue), 2px weight
Historical average: #CCCCCC (gray), 1px dash
Gridlines: #F5F5F5 (very light gray), 0.5px
```

**❌ AVOID:** All elements same visual weight (no hierarchy)

---

## Repetition

**Principle:** Repeat visual properties to create unity and pattern recognition

**In Data Viz:**
- **Consistent color mapping:** Same categories = same colors across all charts
- **Repeated typography:** Same font sizes for same element types
- **Repeated spacing:** Consistent margins, padding, gaps
- **Repeated visual style:** Same chart style across dashboard

**Example:**
```
Dashboard-wide standards:
- Chart titles: 18px Semibold
- Axis labels: 12px Regular
- Legends: 11px Regular
- Annotations: 13px Italic
- Color for "Revenue": Always #2E86AB
- Spacing: 20px between charts, 40px section gaps
```

**❌ AVOID:** Different colors for same category across charts (breaks mental model)

---

## Alignment

**Principle:** Create visual connections through aligned elements

**In Data Viz:**
- **Left-align chart titles** for clean left edge
- **Align chart grids** across multi-chart layouts
- **Align axis labels** to create invisible grid
- **Align legends** consistently (all top-right or all bottom)

**Example:**
```
Dashboard layout:
- All chart titles left-aligned at X=0
- All Y-axes aligned at X=60px (for label space)
- All charts share common grid columns
- All legends positioned top-right corner
```

**❌ AVOID:** Center-aligned titles with left-aligned charts (creates ragged edge)

---

## Proximity

**Principle:** Group related elements, separate unrelated elements

**In Data Viz:**
- **Group related charts** closer together (20px gap)
- **Separate chart sections** with more space (40-60px gap)
- **Keep labels near data** (no floating labels)
- **Position legends near charts** (not at page top)

**Example:**
```
Related charts (sales metrics):
├─ Revenue chart
├─ (20px gap)
├─ Profit chart
├─ (20px gap)
└─ Margin chart

(60px gap - section break)

Unrelated charts (customer metrics):
├─ Acquisition chart
├─ (20px gap)
└─ Retention chart
```

**❌ AVOID:** Equal spacing between all elements (no visual grouping)

---

## Typography Hierarchy

**Specific to Data Viz:**

### Dashboard Title
- Size: 24-32px
- Weight: Bold or Semibold
- Color: Dark (#1A1A1A)
- Position: Top-left

### Section Headers
- Size: 18-20px
- Weight: Semibold
- Color: Dark (#333333)
- Position: Above chart group

### Chart Titles
- Size: 16-18px
- Weight: Medium
- Color: Medium (#666666)
- Position: Above each chart

### Axis Labels
- Size: 11-12px
- Weight: Regular
- Color: Light (#999999)
- Position: Below X-axis, left of Y-axis

### Data Labels (on chart)
- Size: 10-11px
- Weight: Regular or Medium
- Color: Match data series or contrast
- Position: Near data point

---

## Cross-References

Related skills: [@data-visualization-designer, @design-excellence]
Related resources: [@data-visualization-designer/resources/data-ink-optimization.md]
