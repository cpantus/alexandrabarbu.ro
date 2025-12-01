# Perceptual Accuracy Research

**Parent Skill:** data-visualization-designer
**Last Updated:** 2025-11-15
**Token Budget:** ~2,000 tokens

---

## Purpose

Provides the scientific foundation for visual encoding decisions based on Cleveland & McGill's perceptual accuracy hierarchy. Load this when you need to justify why certain visual channels (position, length, color, etc.) are more or less effective for encoding data.

---

## Cleveland & McGill Perceptual Hierarchy

Ranked from MOST accurate to LEAST accurate for quantitative encoding:

### Tier 1: Position (Most Accurate - Error rate <5%)
**Visual channels:**
- Position along common scale (bar chart, scatter plot)
- Position along non-aligned scale (small multiples)

**Use for:** Primary quantitative comparisons
**Error rate:** 2-5% (humans excellent at comparing positions)

### Tier 2: Length/Distance (High Accuracy - Error rate 5-10%)
**Visual channels:**
- Length (bar length)
- Distance (scatter point distance)
- Direction/Angle (pie slices - 10-30% error!)

**Use for:** Secondary quantitative comparisons
**Error rate:** 5-10% for length, 10-30% for angles (pie charts)

### Tier 3: Area (Medium Accuracy - Error rate 15-25%)
**Visual channels:**
- Area (bubble size, treemap cells)
- Volume (3D representations - AVOID)

**Use for:** Tertiary quantitative comparisons, relative magnitude
**Error rate:** 15-25% (humans terrible at comparing areas)

### Tier 4: Color Saturation (Low Accuracy - Error rate 20-35%)
**Visual channels:**
- Color saturation/intensity (heatmaps)
- Color hue (categorical only - NOT quantitative)

**Use for:** Supporting quantitative encoding, categorical distinction
**Error rate:** 20-35% for saturation, unusable for hue-based quantitative

---

## Practical Encoding Decisions

### Example 1: Sales by Region
**Data:** 5 regions, 1 sales metric

**Option A (Position - Best):**
```
Bar chart: Position along Y-axis (sales)
Error rate: ~5%
```

**Option B (Length - Good):**
```
Horizontal bar: Bar length (sales)
Error rate: ~8%
```

**Option C (Area - Poor):**
```
Bubble chart: Bubble size (sales)
Error rate: ~20%
```

**Option D (Color - Worst):**
```
Map with color saturation (sales)
Error rate: ~30%
```

**Recommendation:** Use Option A (bar chart with position encoding)

### Example 2: Three Variables (X, Y, Size)
**Data:** Scatter plot with 3rd dimension

**Primary encoding:** X/Y position (most accurate)
**Secondary encoding:** Bubble size (area - medium accuracy)
**Supporting encoding:** Color hue for categories (not quantitative!)

**DO NOT:** Encode 3rd quantitative variable with color saturation (error rate 30%+)

---

## Key Research Findings

### Finding 1: Pie Charts vs Bars
- **Pie charts:** 10-30× higher error rate than bars (angle perception poor)
- **Bar charts:** 2-5% error rate (position perception excellent)
- **Recommendation:** Use pie ONLY if one slice >50% and message is "majority vs minority"

### Finding 2: Color for Quantitative Data
- **Hue (red vs blue):** Cannot encode quantitative differences (categorical only)
- **Saturation (light vs dark):** 20-35% error rate (acceptable for supporting role)
- **Recommendation:** Use color for categories or to support position/length encoding

### Finding 3: 3D Charts
- **Volume perception:** 40-60% error rate (humans terrible at estimating volumes)
- **Occlusion:** Hidden data points create false conclusions
- **Recommendation:** NEVER use 3D charts for quantitative data

### Finding 4: Position > Length > Area > Color
- **Position:** Align on common scale for highest accuracy
- **Length:** Acceptable for comparisons, but position preferred
- **Area:** Use only when space-constrained (treemaps)
- **Color:** Supporting role only (never primary quantitative encoding)

---

## Application Checklist

Before finalizing your visual encoding:

**Primary Variable (Most Important):**
- [ ] Encoded using position (preferred) or length (acceptable)
- [ ] NOT encoded using area or color saturation

**Secondary Variable:**
- [ ] Encoded using length (if primary uses position)
- [ ] Encoded using area (if space-constrained)
- [ ] NOT encoded using color hue for quantitative data

**Categorical Variables:**
- [ ] Encoded using color hue (categorical palettes)
- [ ] Encoded using shape (if <5 categories)
- [ ] NOT encoded using position or length

**Accessibility:**
- [ ] Redundant encoding used (position + color, not color alone)
- [ ] Colorblind-safe palettes (avoid red-green)
- [ ] Sufficient contrast for low-vision users

---

## Cross-References

Related skills: [@data-visualization-designer, @diagram-drawing]
Related resources: [@data-visualization-designer/resources/crap-principles-for-data.md]
