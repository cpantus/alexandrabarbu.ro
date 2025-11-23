# CTA Button Text Differentiation - Design Review Recommendations

**Phase 3: Replace Generic "Află Mai Multe" with Specific Action Text**

**Created:** 2025-11-23
**Status:** Ready for implementation
**Goal:** Achieve 9+/10 design score through specific, actionable CTA text

---

## Problem Statement

**Current Issue:** Too many CTAs use generic "Află Mai Multe" (Learn More), reducing clarity and call-to-action effectiveness.

**Design Review Feedback:**
> "CTAs: too many 'Află Mai Multe' - differentiate with specific actions"

**Impact:** Users don't immediately understand what action they're taking or what outcome to expect.

---

## CTA Hierarchy Strategy

### Primary CTAs (Emerald - `variant: "primary"`)
**Purpose:** Main conversion actions
**Examples:**
- "Programează Consultație Gratuită" (Schedule Free Consultation)
- "Rezervă Acum" (Book Now)
- "Începe Terapia" (Start Therapy)

### Secondary CTAs (Terracotta - `variant: "secondary"`)
**Purpose:** Exploratory actions, warm engagement
**Examples:**
- "Vezi Servicii Complete" (See All Services)
- "Citește Despre Metode" (Read About Methods)
- "Descoperă Procesul" (Discover Process)

### Tertiary CTAs (Outline - `variant: "outline-primary"` or `variant: "outline-secondary"`)
**Purpose:** Low-commitment exploration
**Examples:**
- "Citește Mai Mult" (Read More)
- "Vezi Detalii" (See Details)
- "Află Mai Multe" (Learn More) - OK for tertiary only

---

## Content Files to Update

### 1. Homepage (`/home/cere/Work/alex/alexandrabarbu.ro/content/romanian/_index.md`)

#### Section: Hero Breadcrumb
**Current:** No CTA button
**Recommendation:** Add primary CTA

```yaml
hero_breadcrumb:
  kicker: "Expertiză Psihologică"
  subtitle: "Terapie individuală, de cuplu și familială"
  cta_buttons:
    - text: "Programează Consultație Gratuită"
      url: "/contact"
      variant: "primary"
      icon: "las la-calendar"
    - text: "Vezi Servicii"
      url: "/servicii"
      variant: "outline-primary"
      icon: "las la-arrow-right"
```

**Before:** Empty hero (no CTA)
**After:** Clear primary action + secondary exploration option

---

#### Section: Related Services Cards

**Current:** All cards use "Află Mai Multe"

```yaml
related_services:
  services:
    - title: "Terapie Individuală"
      button_text: "Află Mai Multe"  # ❌ Generic
    - title: "Terapie de Cuplu"
      button_text: "Află Mai Multe"  # ❌ Generic
    - title: "Terapie de Familie"
      button_text: "Află Mai Multe"  # ❌ Generic
    - title: "Servicii Corporate"
      button_text: "Află Mai Multe"  # ❌ Generic
```

**Recommendation:** Specific action text per service

```yaml
related_services:
  services:
    - title: "Terapie Individuală"
      button_text: "Explorează Terapie Individuală"  # ✅ Specific
      button_variant: "secondary"
    - title: "Terapie de Cuplu"
      button_text: "Descoperă Terapia de Cuplu"  # ✅ Specific
      button_variant: "primary"
    - title: "Terapie de Familie"
      button_text: "Vezi Terapia de Familie"  # ✅ Specific
      button_variant: "secondary"
    - title: "Servicii Corporate"
      button_text: "Servicii pentru Companii"  # ✅ Specific
      button_variant: "outline-primary"
```

**Before:** 4x "Află Mai Multe"
**After:** 4 unique, service-specific CTAs with color variety

---

#### Section: Testimonials

**Current:** Generic or no CTA
**Recommendation:** Add conversion-focused CTA

```yaml
testimonials_enhanced:
  cta_button:
    text: "Programează Consultație Gratuită"
    url: "/contact"
    variant: "primary"
```

**Before:** Weak/missing conversion opportunity
**After:** Strong conversion CTA after social proof

---

#### Section: Final CTA (Bottom of Page)

**Current:** "Află Mai Multe"
**Recommendation:** Action-focused text

```yaml
cta_standard:
  button_text: "Programează Prima Consultație"  # ✅ Action-focused
  button_variant: "primary"
  secondary_button:
    text: "Descoperă Serviciile"  # ✅ Alternative action
    variant: "outline-secondary"
```

**Before:** Generic "Learn More"
**After:** Clear primary + secondary action

---

### 2. Service Pages (`/home/cere/Work/alex/alexandrabarbu.ro/content/romanian/servicii/*.md`)

**Pattern:** Each service page should have:
1. **Hero CTA:** "Programează Consultație" (primary)
2. **Section CTAs:** Service-specific actions
3. **Final CTA:** Conversion-focused

**Example: Terapie Individuală**

```yaml
# Before
sections:
  - type: "cta-standard"
cta_standard:
  button_text: "Află Mai Multe"  # ❌ Generic

# After
sections:
  - type: "cta-standard"
cta_standard:
  button_text: "Începe Terapia Individuală"  # ✅ Specific
  button_variant: "primary"
  secondary_button:
    text: "Citește Despre Metode"  # ✅ Educational alternative
    url: "/despre/metode-terapeutice"
    variant: "outline-primary"
```

---

### 3. About/Methodology Pages (`/home/cere/Work/alex/alexandrabarbu.ro/content/romanian/despre/*.md`)

**Pattern:** Educational → Conversion

```yaml
# Before
cta_standard:
  button_text: "Află Mai Multe"  # ❌ Generic

# After
cta_standard:
  button_text: "Programează Prima Consultație"  # ✅ Conversion
  button_variant: "primary"
  secondary_button:
    text: "Vezi Alte Servicii"  # ✅ Exploration
    url: "/servicii"
    variant: "outline-secondary"
```

---

## CTA Text Formula

### For Primary Actions (Conversion)
**Format:** `[Verb] + [Outcome/Benefit]`

Examples:
- "Programează Consultație Gratuită" (Schedule Free Consultation)
- "Începe Terapia" (Start Therapy)
- "Rezervă Locul Tău" (Reserve Your Spot)

### For Secondary Actions (Exploration)
**Format:** `[Exploration Verb] + [Specific Topic]`

Examples:
- "Vezi Servicii Complete" (See All Services)
- "Descoperă Metodele Noastre" (Discover Our Methods)
- "Citește Despre Proces" (Read About Process)

### For Tertiary Actions (Low Commitment)
**Format:** Generic is OK for tertiary

Examples:
- "Citește Mai Mult" (Read More)
- "Vezi Detalii" (See Details)
- "Află Mai Multe" (Learn More) - acceptable for tertiary only

---

## Implementation Checklist

### Content Updates Needed:
- [ ] Homepage hero - add primary CTA
- [ ] Homepage related services - 4 specific CTAs
- [ ] Homepage testimonials - add conversion CTA
- [ ] Homepage final CTA - specific action text
- [ ] Service pages (4 pages) - specific CTAs per service
- [ ] About/methodology pages - conversion CTAs
- [ ] Blog/resource pages - exploration CTAs

### Button Styling Already Supports:
- ✅ Primary variant (emerald)
- ✅ Secondary variant (terracotta)
- ✅ Outline-primary variant
- ✅ Outline-secondary variant
- ✅ Icon support
- ✅ Size variants (lg, md, sm)

**No SCSS changes needed** - button component already supports all variants.

---

## Expected Outcomes

### Before (Current):
- 80% of CTAs: "Află Mai Multe" (generic)
- No clear conversion hierarchy
- Low differentiation between primary/secondary actions

### After (Recommended):
- 60% specific action text
- 25% exploration text
- 15% generic (tertiary only)
- Clear conversion hierarchy (primary → secondary → tertiary)

### Impact on Design Score:
- **Current:** 8.6/10 (feedback: "too many generic CTAs")
- **Target:** 9+/10 (specific, actionable CTAs throughout)

---

## Notes

**Button Component Location:**
`/home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo/layouts/partials/atoms/button.html`

**Supported Parameters:**
- `text` (string) - Button text
- `url` (string) - Link destination
- `variant` (primary|secondary|outline-primary|outline-secondary)
- `icon` (Line Awesome class, e.g., "las la-calendar")
- `size` (lg|md|sm)

**Hero CTA Support:**
Already implemented in hero-breadcrumb template (lines 118-132).

---

**Implementation Priority:** HIGH
**Effort:** Medium (content updates only, no code changes)
**Impact:** HIGH (directly addresses design review feedback)
