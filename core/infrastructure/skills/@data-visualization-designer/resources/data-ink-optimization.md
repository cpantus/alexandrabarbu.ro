# Data-Ink Ratio Optimization

**Parent Skill:** data-visualization-designer
**Last Updated:** 2025-11-15
**Token Budget:** ~1,200 tokens

---

## Purpose

Implements Edward Tufte's data-ink ratio principle: maximize the proportion of ink dedicated to data, minimize non-data ink (chartjunk). Load this when you need to simplify and clarify visualizations by removing unnecessary elements.

---

## The Data-Ink Ratio

**Formula:** Data-Ink Ratio = (Ink used for data) / (Total ink used)

**Goal:** Maximize this ratio by removing non-essential ink

**Tufte's Principle:** "Erase non-data-ink, within reason"

---

## Chartjunk to Remove

### 1. Heavy Gridlines (High Priority)
**Problem:** Dark gridlines compete with data for attention

**Solution:**
- Use very light gray (#F0F0F0 or lighter)
- Remove horizontal gridlines if not essential
- Remove vertical gridlines for time series
- Use subtle dashed lines if needed

**Before:** `grid-color: #CCCCCC, width: 1px`
**After:** `grid-color: #F5F5F5, width: 0.5px`

### 2. Unnecessary Borders/Boxes
**Problem:** Chart borders add visual weight without adding information

**Solution:**
- Remove chart area borders
- Remove legend boxes
- Remove axis boxes
- Keep only essential dividing lines

**❌ Remove:** Chart border, legend border, background fills
**✅ Keep:** Axis lines (if needed for reference)

### 3. 3D Effects and Shadows
**Problem:** 3D distorts perception, shadows add visual noise

**Solution:**
- Use flat 2D charts always
- Remove drop shadows
- Remove gradients (use solid colors)
- Remove pseudo-3D effects (bevels, embossing)

**❌ Never:** 3D pie charts, 3D bars, gradient fills
**✅ Always:** Flat 2D representations

### 4. Decorative Elements
**Problem:** Decorations distract from data

**Solution:**
- Remove background images
- Remove decorative icons
- Remove ornamental dividers
- Remove unnecessary color

**❌ Remove:** Clipart, background patterns, decorative headers
**✅ Keep:** Functional icons (sort indicators, warnings)

### 5. Redundant Labels
**Problem:** Over-labeling creates visual clutter

**Solution:**
- Remove axis labels if title makes them obvious
- Remove legend if colors/categories obvious
- Remove data labels if chart readable without them
- Use tooltips instead of permanent labels

**Example:**
```
Chart title: "Monthly Revenue (USD)"
❌ Y-axis label: "Revenue (USD)" - redundant!
✅ Y-axis label: Remove, already in title
```

---

## What to Keep (Essential Data-Ink)

### 1. Data Marks (Primary Ink)
- Bars, lines, points, areas
- These are your data - maximize their visual prominence

### 2. Functional Text
- Chart titles (what is this?)
- Axis tick labels (what scale?)
- Key annotations (what's notable?)

### 3. Minimal Reference Elements
- Axis lines (only if needed)
- Light gridlines (if they aid reading)
- Zero baseline (if essential for context)

---

## Before/After Examples

### Example 1: Bar Chart Cleanup

**Before (Low Data-Ink Ratio ~40%):**
```
- Heavy gridlines (#CCCCCC, 1px)
- Chart border (1px black)
- 3D bar effect
- Drop shadows
- Background gradient
- Redundant axis labels
- Legend box with border
```

**After (High Data-Ink Ratio ~85%):**
```
- Light gridlines (#F8F8F8, 0.5px, horizontal only)
- No border
- Flat 2D bars
- No shadows
- White background
- Title only (no redundant labels)
- Borderless legend (or removed if obvious)
```

**Result:** Focus immediately goes to data, not decoration

### Example 2: Line Chart Cleanup

**Before:**
```
- Thick axis lines (2px)
- Dense gridlines (both X and Y)
- Data point markers on every point
- Multiple colors for single series
- Background shading
```

**After:**
```
- Thin Y-axis only (0.5px, if needed)
- Light horizontal gridlines only
- Markers on key points only (start, end, peaks)
- Single color for series
- Clean white background
```

---

## The 5-Second Simplification Test

**Test your chart:**
1. Cover the chart
2. Uncover for 5 seconds
3. Cover again
4. What did you remember?

**If you remembered:**
- ✅ The key insight → Good data-ink ratio
- ❌ Gridlines, borders, decorations → Too much chartjunk

**Fix:** Remove elements until only data is memorable

---

## Practical Guidelines

### For Every Element, Ask:
1. **Does this encode data?** → Keep (data-ink)
2. **Does this help read data?** → Keep if essential (functional)
3. **Does this decorate?** → Remove (chartjunk)

### Safe Removals (Usually):
- Chart borders
- Heavy gridlines
- Legend borders
- 3D effects
- Shadows/gradients
- Background images
- Redundant labels

### Safe Keeps (Usually):
- Data marks (bars, lines, points)
- Chart titles
- Axis tick labels
- Key annotations
- Very light gridlines (if they aid reading)

---

## Cross-References

Related skills: [@data-visualization-designer, @design-excellence]
Related resources: [@data-visualization-designer/resources/crap-principles-for-data.md]
