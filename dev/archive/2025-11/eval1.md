# Design Evaluation Framework - Theme Redesign

**Version**: 1.0
**Created**: 2025-11-23
**Purpose**: Comprehensive design extraction and implementation specifications for 10-section redesign

---

## Part 1: Design Pattern Extraction (Screenshot Analysis)

### Section 1: Hero + Navigation + Main CTA

**Screenshot Analysis**: Homepage hero with compass animation

#### Visual Design

**Colors**:
- Background: Cream/Off-white (#F4F7F5 or similar - very light, warm neutral)
- Logo text: Dark green (#234E3E approximate)
- Navigation links: Dark green (#234E3E)
- Heading "Găsim": Dark charcoal-green (#1A332A)
- Heading "Nordul Interior": Sage green italic (#6B9080)
- Body text: Muted green-grey (#587065)
- Primary button: Dark green background (#234E3E), white text
- Secondary button: Outline dark green (#234E3E), dark green text
- Compass: Gold "N" (#C5A880), dark green needle/rings (#234E3E)

**Typography**:
- Logo "ALEXANDRA BARBU": Sans-serif, uppercase, ~11px, tracking-widest, dark green
- Logo tagline "GĂSIM NORDUL INTERIOR": Sans-serif, uppercase, ~9px, lighter weight
- Main heading "Găsim": Serif (Playfair Display-like), ~72px, weight 600, dark green
- Subheading "Nordul Interior": Serif italic, ~72px, sage green
- Body text: Sans-serif (DM Sans-like), ~18px, weight 400, line-height 1.6, muted green
- Navigation: Sans-serif, ~16px, weight 500
- Button text: Sans-serif, ~16px, weight 500

**Spacing**:
- Section padding: Very generous vertical (~120px top, ~140px bottom)
- Content max-width: ~600px for text column
- Gap between heading and body: ~32px
- Gap between body and CTAs: ~48px
- Button gap: ~16px horizontal between primary/secondary
- Navigation items gap: ~32px

**Layout**:
- Two-column layout: Left 50% (text), Right 50% (compass illustration)
- Text column: Left-aligned, max-width constrained
- Compass: Centered in right column, ~500px diameter
- Navigation: Horizontal, right-aligned in header
- Container: ~1200-1280px max-width, centered

**Components**:
- Transparent navigation (scrolls to glassmorphism)
- Large serif heading with italic variant
- Pill-shaped buttons (rounded-full)
- Animated compass SVG (3 rings rotating, needle oscillating)

**Interactions**:
- Navigation scroll state: Transparent → Glassmorphism background
- Compass rings: Slow rotation (outer clockwise, middle counter-clockwise)
- Compass needle: Gentle oscillation ±20 degrees
- Button hover: Likely lift + shadow transition

**Responsive**:
- Desktop: Two-column side-by-side
- Tablet: Likely stacked, compass smaller
- Mobile: Stacked, compass ~300px diameter

---

### Section 2: Servicii Oferite (Services)

**Screenshot Analysis**: 3-column service cards

#### Visual Design

**Colors**:
- Section background: White or very light cream (#FCFDFB)
- Section badge background: Cream rounded pill (#F4F7F5)
- Section badge text: Dark green (#234E3E)
- Heading: Dark green (#1A332A), serif
- Body intro: Muted green-grey (#587065)
- Card backgrounds: White (#FFFFFF)
- Card borders: Very subtle cream (#E9EFEC)
- Icon blob backgrounds: Light color tints (blue-grey, sage-green, gold) at ~10% opacity
- Icon strokes: Matching color at 100% opacity
- Card titles: Dark green (#1A332A), serif
- Card descriptions: Muted green-grey (#587065)

**Typography**:
- Section badge "Servicii Oferite": Sans-serif italic, ~14px, tracking-wide
- Section heading "Începe Călătoria Ta": Serif, ~48px, weight 600, centered
- Intro text: Sans-serif, ~18px, centered, max-width ~700px
- Card titles: Serif, ~24px, weight 600
- Card descriptions: Sans-serif, ~16px, line-height 1.6

**Spacing**:
- Section padding: ~96px vertical
- Heading to intro: ~24px
- Intro to cards: ~64px
- Card grid gap: ~32px horizontal, ~40px vertical
- Card internal padding: ~40px
- Icon to title: ~24px
- Title to description: ~16px

**Layout**:
- Container: ~1200px max-width, centered
- Grid: 3 columns desktop, 2 columns tablet, 1 column mobile
- Card aspect: Vertical, ~equal heights
- Icon blob: ~80px diameter circle, positioned top-left of card content

**Components**:
- Icon with organic blob background (SVG irregular shape)
- Heavy rounded cards (border-radius: ~32px / 2rem)
- Subtle borders (1px solid)
- Section badge (pill shape, background)

**Interactions**:
- Card hover: Border color change to accent/30, shadow-2xl, slight lift (-2px)
- Icon scale on card hover: Likely 1.05-1.1x

**Responsive**:
- Desktop (≥1200px): 3 columns
- Tablet (768-1199px): 2 columns
- Mobile (<768px): 1 column, cards full-width

---

### Section 3: Metodologie (O Abordare Integrativă)

**Screenshot Analysis**: Text + image + 4 methodology cards

#### Visual Design

**Colors**:
- Section background: Cream (#F4F7F5)
- Section badge: White rounded pill
- Section badge text: Dark green (#234E3E), uppercase
- Heading: Dark green (#1A332A), serif with italic "Integrativă"
- Body text: Muted green-grey (#587065)
- Image: Full-color photo, rounded corners
- Method card icons: Circular backgrounds with color-coded system:
  - Cognitive: Light blue-tinted circle
  - Mindfulness: Light sage-tinted circle
  - Schema: Light purple-tinted circle
  - Humanist: Light coral-tinted circle
- Method card titles: Dark green (#1A332A), sans-serif, weight 600
- Method card descriptions: Muted green-grey (#587065)

**Typography**:
- Section badge "METODOLOGIE": Sans-serif, uppercase, ~12px, tracking-widest
- Heading "O Abordare": Serif, ~42px, weight 600
- Heading "Integrativă": Serif italic, ~42px, sage green
- Body text: Sans-serif, ~16px, line-height 1.7
- Method titles: Sans-serif, ~18px, weight 600
- Method descriptions: Sans-serif, ~15px, line-height 1.6

**Spacing**:
- Section padding: ~96px vertical
- Left column (text): ~45% width
- Right column (image + cards): ~50% width
- Column gap: ~5%
- Image to cards: ~48px vertical
- Card grid gap: ~24px
- Card padding: ~32px
- Icon to text: ~16px

**Layout**:
- Two-column layout: Left (text), Right (image + 2×2 grid of cards)
- Image: ~full width of right column, ~400px height, rounded-3xl (~48px)
- Method cards: 2×2 grid below image
- Cards: Horizontal layout (icon left, text right)

**Components**:
- Section badge pill
- Large image with heavy rounding
- Icon circles (gradient backgrounds)
- Horizontal info cards (compact)

**Interactions**:
- Image: Possibly subtle parallax scroll
- Cards: Likely hover state (background color change)
- Icons: May scale slightly on hover

**Responsive**:
- Desktop: Side-by-side columns
- Tablet: Stacked, image full-width, cards 2-column grid
- Mobile: Stacked, cards 1-column

---

### Section 4: CTA Evaluare (Self-Assessment)

**Screenshot Analysis**: Split layout with checklist and CTA

#### Visual Design

**Colors**:
- Left panel background: White (#FFFFFF)
- Right panel background: Sage green (#6B9080 or similar muted green)
- Left panel badge: Cream pill (#F4F7F5)
- Left panel badge text: Dark green (#234E3E), uppercase
- Left heading: Dark green (#1A332A), serif
- Left heading accent "soluția potrivită": Sage green italic
- Checklist text: Muted green-grey (#587065)
- Checklist icons: Sage green checkmarks in circles
- Quote box background: Cream (#F4F7F5)
- Quote box border-left: Gold accent (#C5A880), ~4px
- Quote text: Muted green-grey italic (#587065), ~14px
- Right panel icon background: White/cream circle (~120px), glassmorphism effect
- Right panel icon: Clock outline, dark green stroke
- Right panel heading: White (#F4F7F5)
- Right panel body: White/cream (#F4F7F5), ~90% opacity
- Right panel button: White background, dark green text
- Right panel disclaimer: White/cream (#F4F7F5), ~70% opacity, ~13px

**Typography**:
- Badge "AUTO-REFLECȚIE": Sans-serif, uppercase, ~11px, tracking-widest
- Left heading "Este terapia": Serif, ~36px, weight 600
- Left accent text "soluția potrivită": Serif italic, sage green
- Checklist items: Sans-serif, ~16px, line-height 1.8
- Quote: Sans-serif italic, ~14px
- Right heading: Sans-serif, ~28px, weight 600
- Right body: Sans-serif, ~16px, line-height 1.6
- Button: Sans-serif, ~16px, weight 500

**Spacing**:
- Panel split: ~60% left, ~40% right
- Left panel padding: ~64px all sides
- Right panel padding: ~56px all sides
- Checklist item gap: ~20px
- Icon to text gap: ~16px
- Quote top margin: ~32px
- Right icon to heading: ~32px
- Right heading to body: ~16px
- Right body to button: ~32px
- Right button to disclaimer: ~20px

**Layout**:
- Side-by-side panels (left white, right sage green)
- Left: Vertical stack (badge → heading → checklist → quote)
- Right: Centered vertical (icon → heading → body → button → disclaimer)
- No visible border between panels (seamless join)

**Components**:
- Badge pill (cream background)
- Checklist items with custom check icons
- Quote box with left border accent
- Glassmorphism icon circle (backdrop-blur effect)
- Pill button (white on sage green)
- Heavy rounded corners on overall section (~32px)

**Interactions**:
- Button hover: Likely slight scale or shadow change
- Glassmorphism effect on scroll (already visible)

**Responsive**:
- Desktop: Side-by-side panels
- Tablet/Mobile: Stacked panels (left on top, right below)

---

### Section 5: Testimoniale (Ecouri ale Călătoriei)

**Screenshot Analysis**: Dark green background with 3 testimonial cards

#### Visual Design

**Colors**:
- Section background: Dark forest green (#2F5548 or similar, darker than primary)
- Section icon: Gold/sand accent (#C5A880), quote marks
- Section heading: Cream/off-white (#F4F7F5)
- Section subtitle: Cream/off-white (#F4F7F5), ~80% opacity
- Divider lines: Gold/sand (#C5A880), thin, decorative
- Testimonial cards background: Transparent/none (text directly on dark green)
- Testimonial quotes: Cream (#F4F7F5), serif italic
- Testimonial names: Cream (#F4F7F5), sans-serif, weight 600
- Testimonial roles: Cream (#F4F7F5), sans-serif, ~70% opacity, smaller

**Typography**:
- Quote icon: ~48px
- Section heading "Ecouri ale Călătoriei": Serif, ~42px, centered, cream color
- Subtitle "Fiecare poveste este unică...": Sans-serif, ~16px, centered
- Divider: Decorative horizontal lines (~60px width)
- Testimonial quotes: Serif italic, ~18-20px, line-height 1.7, cream
- Testimonial names: Sans-serif, ~16px, weight 600, uppercase with tracking
- Testimonial roles: Sans-serif, ~14px, weight 400

**Spacing**:
- Section padding: ~112px vertical
- Quote icon to heading: ~24px
- Heading to divider: ~16px
- Divider to subtitle: ~16px
- Subtitle to testimonials: ~80px
- Testimonial grid gap: ~64px horizontal
- Quote to attribution: ~32px
- Name initial circle to name: ~16px

**Layout**:
- Container: ~1200px max-width, centered
- Header: Centered (icon, heading, divider, subtitle)
- Testimonials: 3-column grid, equal width
- Each testimonial: Vertical stack (quote → name circle → name → role)
- Name circle: Small circular avatar placeholder (~48px), letter initial

**Components**:
- Quote icon (decorative)
- Horizontal divider lines (decorative, gold)
- Avatar circles (initials)
- Long-form quote text blocks

**Interactions**:
- Possibly subtle fade-in on scroll
- No obvious hover states (testimonials are read-only content)

**Responsive**:
- Desktop: 3 columns
- Tablet: 2 columns or 1 column
- Mobile: 1 column, stacked

---

### Section 6: FAQ (Întrebări Frecvente)

**Screenshot Analysis**: Accordion-style FAQ with expandable items

#### Visual Design

**Colors**:
- Section background: Very light cream (#FCFDFB or white)
- Section icon: Sage green circle background (~64px), white question mark
- Section heading: Dark green (#1A332A), serif
- Section subtitle: Muted green-grey (#587065), centered
- FAQ item backgrounds: White (#FFFFFF)
- FAQ item borders: Very subtle cream (#E9EFEC), 1px
- Question text: Dark green (#1A332A), serif, weight 600
- Answer text: Muted green-grey (#587065), sans-serif
- Expand/collapse icons: Dark green (#234E3E) circles with +/- symbols
- Active item (expanded): Slight background tint or border highlight

**Typography**:
- Section icon: White "?" symbol, ~28px
- Section heading "Întrebări Frecvente": Serif, ~42px, centered
- Subtitle "Claritate înainte de a începe drumul": Sans-serif, ~16px, centered
- Question text: Serif, ~20px, weight 600
- Answer text: Sans-serif, ~16px, line-height 1.7

**Spacing**:
- Section padding: ~96px vertical
- Icon to heading: ~24px
- Heading to subtitle: ~16px
- Subtitle to FAQ items: ~64px
- FAQ item gap: ~16px (between accordion items)
- FAQ item padding: ~28px horizontal, ~24px vertical
- Question to icon gap: ~20px
- Expanded answer top margin: ~20px (when visible)

**Layout**:
- Container: ~900px max-width, centered (narrower than typical sections)
- Header: Centered (icon, heading, subtitle)
- FAQ items: Full-width stack
- Each item: Horizontal flex (question text left, expand icon right)
- Expanded answer: Full-width text block below question

**Components**:
- Circular icon badge with question mark
- Accordion items (expandable/collapsible)
- Round expand/collapse buttons (+/-)
- Subtle borders on items

**Interactions**:
- Click question or icon to expand/collapse
- Smooth height transition (300-400ms)
- Only one item expanded at a time (accordion behavior)
- Icon changes from + to - when expanded
- Possible subtle background color change on expand

**Responsive**:
- Desktop: ~900px container
- Tablet/Mobile: Full-width, maintain accordion behavior

---

### Section 7: Contact Form (Trimite un Mesaj)

**Screenshot Analysis**: Split layout with contact info panel (dark green) and form (white)

#### Visual Design

**Colors**:
- Left panel background: Dark forest green (#2F5548, gradient with geometric shapes)
- Geometric shapes overlay: Lighter green (~#4A6B5F), subtle opacity
- Left panel text: Cream/off-white (#F4F7F5)
- Left panel heading: Cream, sans-serif, ~32px
- Left panel subheading: Cream, ~70% opacity, ~16px
- Left panel icons: Gold/sand outline circles (#C5A880), ~48px
- Left panel labels: Cream, uppercase, ~11px, tracking-wide
- Left panel values: Cream, ~18px, weight 500
- Right panel background: White (#FFFFFF)
- Right panel note background: Very light cream (#F4F7F5)
- Right panel note icon: Sage green (#6B9080)
- Right panel note text: Dark green (#1A332A), ~14px
- Form labels: Dark green (#1A332A), sans-serif, uppercase, ~12px, weight 600
- Form inputs: Light cream background (#F9F9F9), dark green text, subtle border
- Submit button: Sage green background (#6B9080), white text, pill shape
- Submit button icon: White arrow/send icon

**Typography**:
- Left heading "Trimite un Mesaj": Sans-serif, ~32px, weight 600
- Left subheading: Sans-serif, ~16px, weight 400
- Left section labels: Sans-serif, uppercase, ~11px, tracking-widest
- Left contact values: Sans-serif, ~18px, weight 500
- Right note text: Sans-serif, ~14px, italic
- Form labels: Sans-serif, uppercase, ~12px, weight 600, tracking-wide
- Form inputs: Sans-serif, ~16px
- Button text: Sans-serif, ~16px, weight 500

**Spacing**:
- Panel split: ~40% left, ~60% right
- Left panel padding: ~64px
- Right panel padding: ~64px
- Left icon circle diameter: ~48px
- Left icon to text gap: ~20px
- Left info blocks gap: ~48px
- Right note padding: ~20px
- Right note to form: ~32px
- Form field gap: ~28px
- Label to input gap: ~8px
- Input height: ~56px (generous)
- Textarea height: ~160px
- Button: ~56px height, full-width

**Layout**:
- Side-by-side panels (left dark, right light)
- Left: Vertical stack (heading → phone → email → location)
- Each contact method: Icon circle (left) + Label/value (right)
- Right: Note box at top, form fields below
- Form: Vertical stack (name → email → message → button)
- Overall section: Heavy rounded corners (~32px)

**Components**:
- Geometric background shapes (decorative)
- Icon outline circles (gold border, transparent fill)
- Info note box (light background, icon + text)
- Form inputs (light background, subtle border)
- Pill submit button with icon
- Heavy section rounding

**Interactions**:
- Form input focus: Border color change to sage green, possibly glow
- Submit button hover: Darker sage green background, icon animation
- Geometric shapes: Possibly subtle parallax or fixed position

**Responsive**:
- Desktop: Side-by-side panels
- Tablet/Mobile: Stacked (left panel on top, form below)

---

### Section 8: Footer

**Screenshot Analysis**: Dark green multi-column footer

#### Visual Design

**Colors**:
- Footer background: Dark forest green (#2F5548, similar to contact panel)
- Logo icon: Cream/gold outline (#C5A880)
- Logo text: Cream (#F4F7F5)
- Tagline text: Cream, ~70% opacity
- Section headings: Cream (#F4F7F5), sans-serif, ~14px, weight 600
- Links: Cream (#F4F7F5), sans-serif, ~15px, ~80% opacity
- Link hover: Full opacity, possibly gold accent
- Social icons: Cream outlines in circles, ~40px diameter
- Social icon backgrounds: Transparent with border (~1.5px)

**Typography**:
- Logo "Alexandra Barbu": Sans-serif, ~18px, weight 600
- Tagline: Sans-serif, ~14px, weight 400, line-height 1.6
- Column headings "Navigare", "Info", "Social Media": Sans-serif, uppercase, ~12px, tracking-wide, weight 600
- Links: Sans-serif, ~15px, weight 400

**Spacing**:
- Footer padding: ~80px vertical, ~0 horizontal (full-width background)
- Container: ~1200px max-width, centered
- Logo column: ~30% width
- Navigation columns: ~20% width each
- Social column: ~25% width
- Column gap: ~5%
- Logo to tagline: ~16px
- Column heading to links: ~24px
- Link gap: ~16px vertical
- Social icon gap: ~16px horizontal

**Layout**:
- 4-column grid: Logo/Description | Navigare | Info | Social Media
- Logo column: Leaf icon + text stack + tagline paragraph
- Navigation columns: Heading + vertical link list
- Social column: Heading + horizontal icon row
- Full-width dark background, content constrained to container

**Components**:
- Logo with leaf icon
- Link lists (vertical)
- Social icon circles (outline style)
- Multi-column footer grid

**Interactions**:
- Links hover: Opacity 100%, possibly underline or color change
- Social icons hover: Background fill or scale
- Smooth transitions (200-300ms)

**Responsive**:
- Desktop: 4 columns
- Tablet: 2×2 grid (logo + nav top, info + social bottom)
- Mobile: Stacked single column

---

### Section 9: Articole/Blog Grid

**Screenshot Analysis**: (Limited view in screenshot, inferring from design system)

#### Visual Design (Inferred)

**Colors**:
- Section background: White or very light cream (#FCFDFB)
- Card backgrounds: White (#FFFFFF)
- Card borders: Subtle cream (#E9EFEC)
- Card image overlay: Possibly gradient on hover
- Card titles: Dark green (#1A332A), serif
- Card meta text: Muted green-grey (#587065), sans-serif, small
- Card descriptions: Muted green-grey (#587065)
- Read more links: Sage green (#6B9080) or dark green (#234E3E)

**Typography**:
- Card titles: Serif, ~24px, weight 600
- Meta text (date, category): Sans-serif, ~13px, uppercase, tracking-wide
- Description: Sans-serif, ~15px, line-height 1.6
- Read more: Sans-serif, ~14px, weight 500

**Spacing**:
- Section padding: ~96px vertical
- Card grid gap: ~32px
- Card image height: ~240px
- Card content padding: ~32px
- Meta to title: ~12px
- Title to description: ~16px
- Description to link: ~20px

**Layout**:
- Container: ~1200px max-width
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Cards: Vertical (image top, content below)
- Image: Full-width within card, aspect-ratio 16:9

**Components**:
- Image with lazy loading
- Blog card (heavy rounded ~24-32px)
- Meta badges (date, category)
- Read more link with arrow

**Interactions**:
- Card hover: Shadow increase, slight lift
- Image hover: Subtle zoom (scale 1.05)
- Read more hover: Underline or arrow animation

---

### Section 10: Teste de Autoevaluare (Self-Assessment Tests)

**Screenshot Analysis**: Card grid with test items

#### Visual Design

**Colors**:
- Section background: Very light cream (#FCFDFB)
- Section icon: Sage green circle (~64px), white clipboard icon
- Section heading: Dark green (#1A332A), serif
- Section subtitle: Muted green-grey (#587065)
- Info box background: Very light blue-grey (~#EEF3F6)
- Info box icon: Sage green circle, white "i"
- Info box text: Dark green (#1A332A), ~14px
- Important text: Dark green, weight 600
- Card backgrounds: White (#FFFFFF)
- Card borders: Subtle cream (#E9EFEC)
- Card icon backgrounds: Color-coded circles (blue, coral/red)
- Card icons: Matching color outlines (brain, heart)
- Badge "Gratuit": Cream pill background (#F4F7F5), dark green text, ~11px
- Card titles: Dark green (#1A332A), serif, ~22px
- Card descriptions: Muted green-grey (#587065), ~15px
- Card meta items: Muted green-grey, small, with bullet separators
- Button backgrounds: Dark forest green (#234E3E)
- Button text: White (#FFFFFF)
- Button hover: Sage green (#6B9080)

**Typography**:
- Section icon: White clipboard outline
- Section heading "Teste de Autoevaluare": Serif, ~42px, centered
- Subtitle: Sans-serif, ~16px, centered, max-width ~800px
- Info box heading "Notă Importantă": Sans-serif, ~13px, weight 600
- Info box text: Sans-serif, ~14px, line-height 1.6
- Badge "Gratuit": Sans-serif, uppercase, ~10px, tracking-wide, weight 600
- Card titles: Serif, ~22px, weight 600
- Card descriptions: Sans-serif, ~15px, line-height 1.6
- Card meta: Sans-serif, ~13px, weight 400
- Button: Sans-serif, ~15px, weight 500

**Spacing**:
- Section padding: ~96px vertical
- Icon to heading: ~24px
- Heading to subtitle: ~16px
- Subtitle to info box: ~48px
- Info box padding: ~24px
- Info box to cards: ~48px
- Card grid gap: ~32px horizontal, ~40px vertical
- Card padding: ~40px
- Icon to badge: ~16px
- Title to description: ~16px
- Description to meta: ~20px
- Meta to button: ~24px

**Layout**:
- Container: ~1100px max-width, centered
- Header: Centered (icon, heading, subtitle)
- Info box: Full-width within container, horizontal (icon left, text right)
- Card grid: 2 columns desktop, 1 column mobile
- Each card: Vertical stack (icon/badge → title → description → meta → button)
- Icon: Top-left positioned (~80px circle)

**Components**:
- Section icon badge (colored circle)
- Info box (alert style, icon + text)
- Test cards (white background, heavy rounded)
- Icon circles (color-coded)
- Badge pills ("Gratuit")
- Meta information with bullet separators
- CTA buttons (pill shaped)

**Interactions**:
- Card hover: Border color to accent, shadow increase, lift
- Button hover: Background color change (dark green → sage green), arrow icon shift
- Icon scale on card hover

**Responsive**:
- Desktop: 2 columns
- Mobile: 1 column, cards full-width

---

## Part 2: Design Token Migration Plan

### 2.1 Color System - Complete SCSS Variable Definitions

**New Color Scales to Add** (`themes/andromeda-hugo/assets/scss/01-settings/_tokens-colors.scss`):

```scss
// ==================================
// REDESIGN COLOR SYSTEM
// ==================================
// Based on design-system.md + screenshot analysis
// Deep forest green + sage + gold/sand + cream palette

// ----------------------------------
// FOREST GREEN SCALE (Primary)
// ----------------------------------
// Replaces/augments emerald scale
$forest-50: #E8F1EE;   // Lightest tint
$forest-100: #C5DBD3;  // Very light
$forest-200: #9EC3B6;  // Light
$forest-300: #77AB99;  // Medium-light
$forest-400: #5A9883;  // Medium
$forest-500: #234E3E;  // PRIMARY (from design-system.md) - main brand color
$forest-600: #1F4537;  // Medium-dark
$forest-700: #2F5548;  // Dark (used in testimonials/footer/contact panel)
$forest-800: #153026;  // Very dark
$forest-900: #0D1F19;  // Darkest

// ----------------------------------
// SAGE GREEN SCALE (Secondary)
// ----------------------------------
// Warm, muted green for secondary elements
$sage-50: #EEF4F2;
$sage-100: #D5E5E0;
$sage-200: #B8D4CC;
$sage-300: #9BC3B8;
$sage-400: #83AEA4;
$sage-500: #6B9080;  // SECONDARY (from design-system.md)
$sage-600: #5A7A6D;
$sage-700: #4A6359;
$sage-800: #3A4D46;
$sage-900: #2A3733;

// ----------------------------------
// GOLD/SAND SCALE (Accent)
// ----------------------------------
// Warm metallic accent for highlights
$gold-50: #F9F5F0;
$gold-100: #F0E8DC;
$gold-200: #E6D9C6;
$gold-300: #DBCAB0;
$gold-400: #D0BB9A;
$gold-500: #C5A880;  // ACCENT (from design-system.md) - compass N, dividers
$gold-600: #B0936B;  // Darker gold (secondary button hover)
$gold-700: #9A7E56;
$gold-800: #856A41;
$gold-900: #6F552C;

// ----------------------------------
// CREAM SCALE (Backgrounds/Neutrals)
// ----------------------------------
// Cool green-tinted cream neutrals
$cream-50: #FCFDFB;   // PUREST (nearly white)
$cream-100: #F4F7F5;  // MAIN APP BG (from design-system.md)
$cream-200: #E9EFEC;  // BORDERS/DIVIDERS
$cream-300: #DCE5E0;  // Subtle backgrounds
$cream-400: #CFD9D4;  // Medium backgrounds
$cream-500: #C2CEC8;  // Deeper backgrounds

// ----------------------------------
// TEXT COLORS (Green-Tinted)
// ----------------------------------
// From design-system.md
$text-primary-green: #1A332A;  // Main text (dark green-black, nearly charcoal)
$text-muted-green: #587065;    // Muted text (green-grey for paragraphs)
$text-light-cream: #F4F7F5;    // Light text (for dark backgrounds)

// ----------------------------------
// SEMANTIC COLOR MAPPING
// ----------------------------------
// Map to component-friendly names

// Backgrounds
$color-bg-primary: $cream-100;        // Main app background
$color-bg-secondary: $cream-50;       // Card backgrounds (white)
$color-bg-dark: $forest-700;          // Dark sections (footer, testimonials)
$color-bg-panel: $sage-500;           // Accent panels (CTA right side)

// Text
$color-text-primary: $text-primary-green;  // Main headings, body
$color-text-secondary: $text-muted-green;  // Secondary text
$color-text-on-dark: $text-light-cream;    // Text on dark backgrounds

// Borders
$color-border-light: $cream-200;      // Subtle borders
$color-border-medium: $cream-300;     // Medium borders
$color-border-accent: $gold-500;      // Accent borders (left border on quote)

// Brand Colors
$color-brand-primary: $forest-500;    // Main brand color
$color-brand-secondary: $sage-500;    // Secondary brand color
$color-brand-accent: $gold-500;       // Accent highlights

// Interactive States
$color-hover-primary: $sage-500;      // Primary button hover
$color-hover-secondary: $gold-600;    // Secondary button hover
$color-focus-ring: $sage-500;         // Focus indicator
```

**Color Migration Strategy**:
1. Add new scales above to `_tokens-colors.scss`
2. Keep existing emerald/terracotta scales (don't break current)
3. Use semantic variables (`$color-brand-primary`, etc.) in components
4. Gradually migrate components to new scales
5. Remove old scales after full migration (Phase 2)

---

### 2.2 Typography System

**Font Updates** (`themes/andromeda-hugo/assets/scss/01-settings/_tokens-typography.scss`):

```scss
// ==================================
// TYPOGRAPHY TOKENS - REDESIGN
// ==================================

// ----------------------------------
// GOOGLE FONTS IMPORT
// ----------------------------------
// Replace existing import with:
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Sans:wght@300;400;500;700&display=swap');

// ----------------------------------
// FONT FAMILIES
// ----------------------------------
$font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
$font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

// Aliases for clarity
$font-serif: $font-heading;
$font-sans: $font-body;

// ----------------------------------
// FONT WEIGHTS
// ----------------------------------
// Playfair Display: 400, 500, 600, 700 (regular + italic)
// DM Sans: 300, 400, 500, 700

$weight-light: 300;        // DM Sans only
$weight-normal: 400;       // Both fonts
$weight-medium: 500;       // Both fonts
$weight-semibold: 600;     // Playfair Display only
$weight-bold: 700;         // Both fonts

// Semantic weights
$font-weight-heading-regular: $weight-medium;   // 500 for softer hierarchy
$font-weight-heading-bold: $weight-semibold;    // 600 for emphasis
$font-weight-body-regular: $weight-normal;      // 400 for body text
$font-weight-body-medium: $weight-medium;       // 500 for labels, nav

// ----------------------------------
// FONT SIZES
// ----------------------------------
// Keep existing scale, verify against screenshots
$font-size-xs: 0.75rem;    // 12px - tiny labels
$font-size-sm: 0.875rem;   // 14px - small text
$font-size-base: 1rem;     // 16px - base body
$font-size-lg: 1.125rem;   // 18px - large body
$font-size-xl: 1.25rem;    // 20px - small headings
$font-size-2xl: 1.5rem;    // 24px - card titles
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px - section headings
$font-size-5xl: 3rem;      // 48px - large section headings
$font-size-6xl: 3.75rem;   // 60px
$font-size-7xl: 4.5rem;    // 72px - hero headings

// ----------------------------------
// LINE HEIGHTS
// ----------------------------------
$leading-none: 1;
$leading-tight: 1.25;
$leading-snug: 1.375;
$leading-normal: 1.5;
$leading-relaxed: 1.625;
$leading-loose: 1.75;

// NEW: Display text (large headings)
$leading-display: 1.1;     // Tight leading for hero text (from design-system.md)

// ----------------------------------
// LETTER SPACING
// ----------------------------------
$tracking-tighter: -0.05em;
$tracking-tight: -0.025em;
$tracking-normal: 0;
$tracking-wide: 0.025em;
$tracking-wider: 0.05em;
$tracking-widest: 0.1em;   // For uppercase labels/badges
```

**Typography Migration**:
1. Update Google Fonts import (single line change)
2. Test Playfair Display rendering across browsers
3. Verify italic variants load correctly
4. Adjust component line-heights if needed (compare to screenshots)

---

### 2.3 Spacing System

**Spacing Updates** (`themes/andromeda-hugo/assets/scss/01-settings/_tokens-spacing.scss`):

```scss
// ==================================
// SPACING TOKENS - 4px BASE GRID
// ==================================

// ----------------------------------
// CORE SPACING SCALE (4px increments)
// ----------------------------------
$space-0: 0;
$space-1: 0.25rem;   // 4px
$space-2: 0.5rem;    // 8px
$space-3: 0.75rem;   // 12px
$space-4: 1rem;      // 16px
$space-5: 1.25rem;   // 20px
$space-6: 1.5rem;    // 24px
$space-7: 1.75rem;   // 28px
$space-8: 2rem;      // 32px
$space-10: 2.5rem;   // 40px
$space-12: 3rem;     // 48px
$space-16: 4rem;     // 64px
$space-20: 5rem;     // 80px
$space-24: 6rem;     // 96px (py-24 equivalent)
$space-28: 7rem;     // 112px
$space-32: 8rem;     // 128px (py-32 equivalent)

// ----------------------------------
// SECTION PADDING
// ----------------------------------
$section-padding-y-mobile: $space-16;      // 64px (mobile)
$section-padding-y: $space-24;             // 96px (desktop, matches py-24)
$section-padding-y-xlarge: $space-32;      // 128px (generous sections, py-32)

$section-padding-x: $space-4;              // 16px horizontal (mobile)

// ----------------------------------
// CONTAINER
// ----------------------------------
$container-max-width: 1280px;              // Updated from 1200px (matches max-w-7xl)
$container-padding: $space-4;              // 16px horizontal padding

// ----------------------------------
// GRID GAPS
// ----------------------------------
$grid-gap: $space-8;                       // 32px default grid gap
$grid-gap-sm: $space-6;                    // 24px small gap
$grid-gap-lg: $space-10;                   // 40px large gap

// ----------------------------------
// COMPONENT SPACING
// ----------------------------------
$card-padding: $space-10;                  // 40px card internal padding
$card-padding-sm: $space-8;                // 32px small card padding

$button-padding-x: $space-6;               // 24px horizontal
$button-padding-y: $space-3;               // 12px vertical

$input-padding-x: $space-4;                // 16px horizontal
$input-padding-y: $space-3;                // 12px vertical (56px total height with border)
```

**Spacing Migration**:
1. Add new tokens above
2. Update `$container-max-width` to 1280px
3. Use semantic variables in components (`$section-padding-y`, etc.)
4. Verify 4px grid compliance (all values divisible by 4)

---

### 2.4 Border Radius System

**Radius Updates** (`themes/andromeda-hugo/assets/scss/01-settings/_tokens-components.scss`):

```scss
// ==================================
// BORDER RADIUS TOKENS
// ==================================

$radius-none: 0;
$radius-sm: 0.25rem;     // 4px
$radius-md: 0.5rem;      // 8px
$radius-lg: 0.75rem;     // 12px
$radius-xl: 1rem;        // 16px
$radius-2xl: 2rem;       // 32px (heavy rounding for cards)
$radius-3xl: 3rem;       // 48px (very heavy rounding)
$radius-full: 9999px;    // Pill shape (buttons)

// Semantic radius
$radius-button: $radius-full;        // Pill buttons
$radius-card: $radius-2xl;           // Standard cards (32px)
$radius-card-heavy: $radius-3xl;     // Image cards, special sections (48px)
$radius-input: $radius-md;           // Form inputs (8px)
$radius-badge: $radius-full;         // Badge pills
```

**Radius Migration**:
1. Add `$radius-3xl` to existing scale
2. Update button components to use `$radius-full`
3. Update card components to use `$radius-2xl` or `$radius-3xl`

---

### 2.5 Shadow System

**Shadow Updates** (`themes/andromeda-hugo/assets/scss/01-settings/_tokens-shadows.scss`):

```scss
// ==================================
// SHADOW TOKENS (Colored Shadows)
// ==================================
// Philosophy: Diffused, colored shadows (not pure black)

// ----------------------------------
// NEUTRAL SHADOWS (Fallback)
// ----------------------------------
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

// ----------------------------------
// COLORED SHADOWS (Primary)
// ----------------------------------
// Using forest green tint
$shadow-primary: 0 10px 30px -5px rgba($forest-500, 0.2);
$shadow-primary-lg: 0 20px 40px -8px rgba($forest-500, 0.3);

// Secondary (sage green tint)
$shadow-secondary: 0 10px 30px -5px rgba($sage-500, 0.15);

// Accent (gold tint)
$shadow-accent: 0 10px 30px -5px rgba($gold-500, 0.2);

// ----------------------------------
// COMPONENT-SPECIFIC SHADOWS
// ----------------------------------
$shadow-card: $shadow-lg;                    // Resting card shadow
$shadow-card-hover: $shadow-2xl;             // Card hover shadow
$shadow-button: $shadow-primary;             // Button shadow (colored)
$shadow-nav: 0 2px 8px rgba($forest-500, 0.08);  // Navigation scroll shadow
```

**Shadow Migration**:
1. Update `$shadow-primary` to use `$forest-500` instead of `$emerald-400`
2. Add `$shadow-2xl` for card hover states
3. Use colored shadows for interactive elements (buttons, cards)

---

### 2.6 Additional Tokens

**Grain Overlay** (New):

```scss
// themes/andromeda-hugo/assets/scss/01-settings/_tokens-effects.scss

// ==================================
// GRAIN OVERLAY EFFECT
// ==================================
$grain-opacity: 0.4;
$grain-blend-mode: multiply;
$grain-z-index: 50;

// SVG data URI (fractalNoise)
$grain-svg: url('data:image/svg+xml;base64,...'); // Implement in component
```

**Glassmorphism** (Existing - Verify):

```scss
// themes/andromeda-hugo/assets/scss/02-tools/_mixins-glassmorphism.scss

@mixin glassmorphism($bg-opacity: 0.9, $blur: 10px) {
  background-color: rgba($cream-100, $bg-opacity);
  backdrop-filter: blur($blur);
  -webkit-backdrop-filter: blur($blur);
}
```

---

## Part 3: Component Specifications

### 3.1 Atoms

#### Atom: Button (`layouts/partials/atoms/button.html`)

**Props**:
- `text` (string, required) - Button label
- `url` (string, required) - Link destination
- `variant` (string, optional) - "primary" | "secondary" | "outline" | "ghost" (default: "primary")
- `size` (string, optional) - "sm" | "md" | "lg" (default: "md")
- `icon` (string, optional) - Line Awesome icon class
- `icon_position` (string, optional) - "left" | "right" (default: "right")

**SCSS** (`themes/andromeda-hugo/assets/scss/06-components/_button.scss`):

```scss
.c-btn {
  // Base
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  font-family: $font-sans;
  font-weight: $font-weight-body-medium;
  text-decoration: none;
  border-radius: $radius-button; // 9999px (pill)
  transition: all 300ms ease-out;
  cursor: pointer;

  // Sizes
  &--sm {
    font-size: $font-size-sm;
    padding: $space-2 $space-4;
  }

  &--md {
    font-size: $font-size-base;
    padding: $space-3 $space-6;
  }

  &--lg {
    font-size: $font-size-lg;
    padding: $space-4 $space-8;
  }

  // Variants
  &--primary {
    background-color: $forest-500;
    color: $text-light-cream;
    box-shadow: $shadow-button;

    &:hover {
      background-color: $sage-500;
      transform: translateY(-1px);
      box-shadow: $shadow-primary-lg;
    }
  }

  &--secondary {
    background-color: $gold-500;
    color: $text-light-cream;

    &:hover {
      background-color: $gold-600;
      transform: translateY(-1px);
    }
  }

  &--outline {
    background-color: transparent;
    color: $forest-500;
    border: 2px solid $forest-500;

    &:hover {
      background-color: $forest-500;
      color: $text-light-cream;
    }
  }

  &--ghost {
    background-color: transparent;
    color: $forest-500;

    &:hover {
      background-color: rgba($forest-500, 0.05);
    }
  }
}
```

**Template**:

```html
{{- $text := .text -}}
{{- $url := .url -}}
{{- $variant := .variant | default "primary" -}}
{{- $size := .size | default "md" -}}
{{- $icon := .icon -}}
{{- $icon_position := .icon_position | default "right" -}}

<a href="{{ $url }}" class="c-btn c-btn--{{ $variant }} c-btn--{{ $size }}">
  {{- if and $icon (eq $icon_position "left") -}}
  <i class="{{ $icon }}"></i>
  {{- end -}}
  {{ $text }}
  {{- if and $icon (eq $icon_position "right") -}}
  <i class="{{ $icon }}"></i>
  {{- end -}}
</a>
```

---

#### Atom: Heading (`layouts/partials/atoms/heading.html`)

**Props**:
- `level` (number, required) - 1-6 for h1-h6
- `text` (string, required) - Heading text
- `style` (string, optional) - "default" | "italic" | "mixed" (default: "default")
- `accent_text` (string, optional) - Text to italicize (for mixed style)
- `align` (string, optional) - "left" | "center" | "right" (default: "left")

**SCSS** (`themes/andromeda-hugo/assets/scss/06-components/_heading.scss`):

```scss
.c-heading {
  font-family: $font-serif;
  color: $text-primary-green;

  // Levels
  &--h1 {
    font-size: $font-size-7xl; // 72px
    line-height: $leading-display;
    font-weight: $font-weight-heading-bold;
  }

  &--h2 {
    font-size: $font-size-5xl; // 48px
    line-height: $leading-tight;
    font-weight: $font-weight-heading-bold;
  }

  &--h3 {
    font-size: $font-size-4xl; // 36px
    line-height: $leading-tight;
    font-weight: $font-weight-heading-bold;
  }

  // Italic variant
  &__accent {
    font-style: italic;
    color: $sage-500;
  }

  // Alignment
  &--center {
    text-align: center;
  }

  &--right {
    text-align: right;
  }
}
```

---

#### Atom: Icon with Blob Background (`layouts/partials/atoms/icon-blob.html`)

**Props**:
- `icon` (string, required) - Line Awesome icon class
- `color` (string, optional) - "blue" | "sage" | "gold" | "coral" | "purple" (default: "sage")
- `size` (string, optional) - "sm" | "md" | "lg" (default: "md")

**SCSS** (`themes/andromeda-hugo/assets/scss/06-components/_icon-blob.scss`):

```scss
.c-icon-blob {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  // Sizes
  &--sm {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }

  &--md {
    width: 64px;
    height: 64px;
    font-size: 28px;
  }

  &--lg {
    width: 80px;
    height: 80px;
    font-size: 32px;
  }

  // Background circle
  &__bg {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    opacity: 0.1;

    &--blue { background-color: #4A90E2; }
    &--sage { background-color: $sage-500; }
    &--gold { background-color: $gold-500; }
    &--coral { background-color: #E27A7A; }
    &--purple { background-color: #9B7AB8; }
  }

  // Icon
  &__icon {
    position: relative;
    z-index: 1;

    &--blue { color: #4A90E2; }
    &--sage { color: $sage-500; }
    &--gold { color: $gold-500; }
    &--coral { color: #E27A7A; }
    &--purple { color: #9B7AB8; }
  }
}
```

---

### 3.2 Molecules

#### Molecule: Card (`layouts/partials/molecules/card.html`)

**Props**:
- `variant` (string, required) - "service" | "blog" | "test" | "method"
- `title` (string, required)
- `description` (string, required)
- `icon` (string, optional) - Icon class
- `icon_color` (string, optional) - Color variant for icon blob
- `image` (string, optional) - Image path
- `badge` (string, optional) - Badge text (e.g., "Gratuit")
- `cta` (dict, optional) - {text, url}
- `meta` (array, optional) - [{text, icon}]

**SCSS** (`themes/andromeda-hugo/assets/scss/06-components/_card.scss`):

```scss
.c-card {
  background-color: $color-bg-secondary;
  border: 1px solid $color-border-light;
  border-radius: $radius-card; // 32px
  padding: $card-padding;
  transition: all 300ms ease-out;

  &:hover {
    border-color: rgba($gold-500, 0.3);
    box-shadow: $shadow-card-hover;
    transform: translateY(-2px);
  }

  // Variants
  &--service {
    text-align: left;
  }

  &--blog {
    padding: 0;
    overflow: hidden;
  }

  &--test {
    position: relative;
  }

  // Elements
  &__image {
    width: 100%;
    height: 240px;
    object-fit: cover;
    margin-bottom: $space-6;
    border-radius: $radius-card-heavy; // 48px for images
  }

  &__icon {
    margin-bottom: $space-6;
  }

  &__badge {
    display: inline-block;
    background-color: $cream-100;
    color: $forest-500;
    font-size: $font-size-xs;
    font-weight: $weight-bold;
    text-transform: uppercase;
    letter-spacing: $tracking-widest;
    padding: $space-1 $space-3;
    border-radius: $radius-badge;
    margin-bottom: $space-4;
  }

  &__title {
    font-family: $font-serif;
    font-size: $font-size-2xl;
    font-weight: $font-weight-heading-bold;
    color: $text-primary-green;
    margin-bottom: $space-4;
  }

  &__description {
    font-family: $font-sans;
    font-size: $font-size-base;
    line-height: $leading-relaxed;
    color: $text-muted-green;
    margin-bottom: $space-5;
  }

  &__meta {
    display: flex;
    gap: $space-4;
    font-size: $font-size-sm;
    color: $text-muted-green;
    margin-bottom: $space-6;
  }
}
```

---

#### Molecule: Accordion Item (`layouts/partials/molecules/accordion-item.html`)

**Props**:
- `question` (string, required)
- `answer` (string, required)
- `id` (string, required) - Unique ID for accordion

**SCSS** (`themes/andromeda-hugo/assets/scss/06-components/_accordion.scss`):

```scss
.c-accordion {
  &__item {
    background-color: $color-bg-secondary;
    border: 1px solid $color-border-light;
    border-radius: $radius-lg;
    margin-bottom: $space-4;
    overflow: hidden;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-6 $space-7;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: rgba($sage-500, 0.03);
    }
  }

  &__question {
    font-family: $font-serif;
    font-size: $font-size-xl;
    font-weight: $font-weight-heading-bold;
    color: $text-primary-green;
    margin: 0;
  }

  &__toggle {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 2px solid $forest-500;
    border-radius: 50%;
    color: $forest-500;
    font-size: 18px;
    transition: transform 200ms ease-out;
  }

  &__body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 400ms ease-out;
  }

  &__answer {
    padding: 0 $space-7 $space-6;
    font-family: $font-sans;
    font-size: $font-size-base;
    line-height: $leading-loose;
    color: $text-muted-green;
  }

  // Expanded state
  &__item.is-expanded {
    .c-accordion__toggle {
      transform: rotate(45deg);
    }

    .c-accordion__body {
      max-height: 500px; // Adjust based on content
    }
  }
}
```

---

### 3.3 Section Components (Summary)

Each section requires a dedicated SCSS file in `06-components/` and Hugo partial in `layouts/partials/sections/`. Based on screenshot analysis:

**New/Modified Sections**:

1. `_hero-breadcrumb.scss` + `hero-breadcrumb.html` - **MODIFY** existing, update styles
2. `_services-grid.scss` + `services-grid.html` - **CREATE** new (or modify existing services section)
3. `_methodology-zigzag.scss` + `methodology-zigzag.html` - **CREATE** new
4. `_cta-split.scss` + `cta-split.html` - **CREATE** new (split panel CTA)
5. `_testimonials-dark.scss` + `testimonials-enhanced.html` - **MODIFY** existing
6. `_faq-accordion.scss` + `faq-content.html` - **MODIFY** existing
7. `_contact-split.scss` + `contact-form-enhanced.html` - **MODIFY** existing
8. `_footer.scss` + `footer.html` (organism) - **MODIFY** existing
9. `_blog-grid.scss` + `blog-grid.html` - **MODIFY** existing
10. `_test-grid.scss` + `test-grid.html` - **CREATE** new

---

## Part 4: Implementation Blueprint (Per Section)

### Section 1: Hero + Navigation

**Implementation Strategy**:

**Reuse**:
- Existing `organisms/header.html` structure
- Existing `sections/hero-breadcrumb.html` base layout

**Modify**:
- Update navigation SCSS to add transparent→glassmorphism scroll state
- Update hero layout to two-column (text left, compass right)
- Update typography to Playfair Display + larger sizes
- Update button styles to pill shape

**Create**:
- Compass SVG animation component (if not exists, or modify existing `values-compass`)
- New navigation scroll state JavaScript

**SCSS Files**:
- `06-components/_navigation.scss` - Add scroll state
- `06-components/_hero-breadcrumb.scss` - Update layout
- `06-components/_button.scss` - Update to pill shape

**Hugo Template** (`sections/hero-breadcrumb.html`):

```html
{{- $section := .Params.hero_breadcrumb -}}
{{- if $section -}}
<section class="c-hero-breadcrumb">
  <div class="container">
    <div class="c-hero-breadcrumb__grid">
      <div class="c-hero-breadcrumb__content">
        <h1 class="c-hero-breadcrumb__title">
          {{ $section.title }}
          {{- if $section.title_accent -}}
          <span class="c-hero-breadcrumb__title-accent">{{ $section.title_accent }}</span>
          {{- end -}}
        </h1>
        <p class="c-hero-breadcrumb__description">{{ $section.subtitle }}</p>

        <div class="c-hero-breadcrumb__cta">
          {{ partial "atoms/button.html" (dict
            "text" $section.cta_primary.text
            "url" $section.cta_primary.url
            "variant" "primary"
          ) }}
          {{ partial "atoms/button.html" (dict
            "text" $section.cta_secondary.text
            "url" $section.cta_secondary.url
            "variant" "outline"
          ) }}
        </div>
      </div>

      <div class="c-hero-breadcrumb__visual">
        {{ partial "atoms/compass-animation.html" }}
      </div>
    </div>
  </div>
</section>
{{- end -}}
```

**Data Schema**:

```yaml
hero_breadcrumb:
  title: "Găsim"
  title_accent: "Nordul Interior"
  subtitle: "Când știi unde ești, poți merge oriunde. Descoperim resursele interioare și construim o viață echilibrată într-un mediu cald și securizant."
  cta_primary:
    text: "Programează o ședință"
    url: "/contact"
  cta_secondary:
    text: "Află mai multe"
    url: "/despre"
```

**JavaScript** (`assets/js/navigation-scroll.js`):

```javascript
// Navigation scroll state
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.c-header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScroll = currentScroll;
  });
});
```

---

### Section 2: Services Grid

**Implementation Strategy**:

**Reuse**:
- Existing card molecule structure
- Existing grid layout patterns

**Modify**:
- Update card radius to heavy (2rem)
- Update icon treatment to blob backgrounds

**Create**:
- Icon blob atom (if not exists)
- Service card variant

**SCSS Files**:
- `06-components/_card.scss` - Add service variant
- `06-components/_icon-blob.scss` - Create icon with blob background
- `06-components/_services-grid.scss` - New section component

**Hugo Template** (`sections/services-grid.html`):

```html
{{- $section := .Params.services_section -}}
{{- if $section -}}
<section class="c-services-grid section">
  <div class="container">
    <div class="c-services-grid__header">
      <div class="c-services-grid__badge">{{ $section.badge }}</div>
      <h2 class="c-services-grid__title">{{ $section.title }}</h2>
      <p class="c-services-grid__intro">{{ $section.intro }}</p>
    </div>

    <div class="c-services-grid__grid">
      {{- range $section.services -}}
      <div class="c-card c-card--service">
        <div class="c-card__icon">
          {{ partial "atoms/icon-blob.html" (dict
            "icon" .icon
            "color" .icon_color
            "size" "lg"
          ) }}
        </div>
        <h3 class="c-card__title">{{ .title }}</h3>
        <p class="c-card__description">{{ .description }}</p>
      </div>
      {{- end -}}
    </div>
  </div>
</section>
{{- end -}}
```

**Data Schema**:

```yaml
services_section:
  badge: "Servicii Oferite"
  title: "Începe Călătoria Ta"
  intro: "Când știi unde ești, poți merge oriunde. Descoperim resursele interioare și construim o viață echilibrată!"
  services:
    - title: "Psihoterapie Individuală"
      icon: "las la-brain"
      icon_color: "blue"
      description: "Un spațiu sigur pentru a explora gândurile și emoțiile..."
    - title: "Dezvoltare Personală"
      icon: "las la-leaf"
      icon_color: "sage"
      description: "Identificăm resursele proprii și lucrăm împreună..."
    - title: "Corporate Wellbeing"
      icon: "las la-star"
      icon_color: "gold"
      description: "Programe dedicate companiilor pentru a susține..."
```

---

### Section 3: Methodology (Zigzag Layout)

**Implementation Strategy**:

**Reuse**:
- Existing image processing
- Existing grid layouts

**Create**:
- Zigzag layout component (text left, visual right)
- Method card horizontal variant
- Image with heavy rounding

**SCSS Files**:
- `06-components/_methodology-zigzag.scss` - New section
- `06-components/_method-card.scss` - Horizontal card variant

**Hugo Template** (`sections/methodology-zigzag.html`):

```html
{{- $section := .Params.methodology_section -}}
{{- if $section -}}
<section class="c-methodology-zigzag section">
  <div class="container">
    <div class="c-methodology-zigzag__grid">
      <div class="c-methodology-zigzag__content">
        <div class="c-methodology-zigzag__badge">{{ $section.badge }}</div>
        <h2 class="c-methodology-zigzag__title">
          {{ $section.title }}
          <span class="c-methodology-zigzag__title-accent">{{ $section.title_accent }}</span>
        </h2>
        <p class="c-methodology-zigzag__description">{{ $section.description }}</p>
      </div>

      <div class="c-methodology-zigzag__visual">
        <img src="{{ $section.image }}" alt="{{ $section.title }}" class="c-methodology-zigzag__image">

        <div class="c-methodology-zigzag__methods">
          {{- range $section.methods -}}
          <div class="c-method-card">
            <div class="c-method-card__icon">
              {{ partial "atoms/icon-blob.html" (dict "icon" .icon "color" .color "size" "md") }}
            </div>
            <div class="c-method-card__content">
              <h4 class="c-method-card__title">{{ .title }}</h4>
              <p class="c-method-card__description">{{ .description }}</p>
            </div>
          </div>
          {{- end -}}
        </div>
      </div>
    </div>
  </div>
</section>
{{- end -}}
```

**Data Schema**:

```yaml
methodology_section:
  badge: "METODOLOGIE"
  title: "O Abordare"
  title_accent: "Integrativă"
  description: "Nu există o rețetă universală pentru vindecare..."
  image: "/images/methodology/workspace.jpg"
  methods:
    - title: "Cognitiv-Comportamentală"
      icon: "las la-lightbulb"
      color: "blue"
      description: "Identificăm și restructurăm tiparele de gândire negative..."
    - title: "Mindfulness & Prezență"
      icon: "las la-sun"
      color: "sage"
      description: "Tehnicile de ancorare în prezent reduc anxietatea..."
    - title: "Terapie Centrată pe Scheme"
      icon: "las la-balance-scale"
      color: "purple"
      description: "Explorăm originile profunde ale tiparelor emoționale..."
    - title: "Abordare Umanistă"
      icon: "las la-heart"
      color: "coral"
      description: "Credem în capacitatea înnăscută a fiecărui om..."
```

---

### Sections 4-10: Similar Implementation Patterns

Each remaining section follows the same implementation pattern:

1. **Analyze screenshot** → Extract colors, typography, spacing
2. **Map to tokens** → Use SCSS variables from Part 2
3. **Identify components** → Reuse atoms/molecules, create new if needed
4. **Write SCSS** → BEM naming, token-based styling
5. **Create Hugo template** → Data-driven, null-safe
6. **Define data schema** → Frontmatter structure

---

## Part 5: Visual Acceptance Criteria (Per-Section Checklists)

### How to Use These Checklists

**Purpose:** Measurable validation criteria to determine if each section matches the design specifications from screenshots.

**Scoring:** Each criterion is pass/fail. A section must achieve 90%+ (check 9/10 items minimum) to be considered complete.

**When to Check:** After implementing each section, use this checklist to validate against eval1.md Part 1 specifications.

---

### Section 1: Hero + Navigation - Acceptance Checklist

**File:** `sections/hero-breadcrumb.html` + `_hero-breadcrumb.scss`

- [ ] **Layout:** Two-column layout visible (text left ~50%, compass right ~50%)
- [ ] **Background:** Cream/off-white background color (#F4F7F5 or similar light warm neutral)
- [ ] **Heading Typography:** Playfair Display serif font at ~72px, weight 600, dark green (#1A332A)
- [ ] **Heading Accent:** "Nordul Interior" (or equivalent) in italic sage green (#6B9080)
- [ ] **Body Text:** DM Sans ~18px, line-height 1.6, muted green-grey (#587065)
- [ ] **Primary Button:** Pill shape (rounded-full), dark green background (#234E3E), white text
- [ ] **Secondary Button:** Pill shape, outline style, dark green border/text (#234E3E)
- [ ] **Compass Animation:** Present and functioning (3 rings rotating, needle oscillating if applicable)
- [ ] **Navigation State:** Transparent at top, transitions to glassmorphism on scroll
- [ ] **Spacing:** Generous vertical padding (~96-120px), proper gaps between elements (heading→body: ~32px, body→CTAs: ~48px)

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Section 2: Services Grid - Acceptance Checklist

**File:** `sections/services-grid.html` + `_services-grid.scss`

- [ ] **Layout:** 3-column grid on desktop (≥1200px), responsive collapse to 2-col (tablet), 1-col (mobile)
- [ ] **Section Badge:** Pill-shaped badge present with "Servicii Oferite" or equivalent, cream background
- [ ] **Section Heading:** Centered, Playfair Display serif, ~48px, dark green (#1A332A)
- [ ] **Card Background:** White (#FFFFFF) with subtle cream border (#E9EFEC)
- [ ] **Card Radius:** Heavy rounding visible (32px / 2rem), not subtle
- [ ] **Icon Blobs:** Organic circular backgrounds (~80px diameter) behind icons, color-coded (blue, sage, gold tints at ~10% opacity)
- [ ] **Icon Style:** Line-based icons (Line Awesome or similar), matching blob color at full opacity
- [ ] **Card Titles:** Serif font (Playfair Display), ~24px, dark green
- [ ] **Card Hover:** Border color change to accent (~gold/30%), shadow increase, slight lift (-2px)
- [ ] **Grid Gap:** ~32px between cards horizontally, ~40px vertically

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Section 3: Methodology (Zigzag) - Acceptance Checklist

**File:** `sections/methodology-zigzag.html` + `_methodology-zigzag.scss`

- [ ] **Layout:** Two-column zigzag (text left ~45%, visual right ~50%)
- [ ] **Section Badge:** "METODOLOGIE" or equivalent, uppercase, white pill background
- [ ] **Heading Accent:** "Integrativă" or equivalent word in italic sage green
- [ ] **Image:** Present with heavy rounding (48px / 3rem radius), ~400px height
- [ ] **Method Cards:** 2×2 grid below image, horizontal layout (icon left, text right)
- [ ] **Method Icons:** Circular color-coded backgrounds (blue, sage, purple, coral visible)
- [ ] **Card Compact Style:** Smaller padding (~32px), horizontal orientation clear
- [ ] **Typography Hierarchy:** Heading serif bold, body sans-serif regular, method titles sans-serif semi-bold
- [ ] **Spacing:** Image to cards gap ~48px, grid gap between methods ~24px
- [ ] **Responsive:** Stacks to single column on mobile, image full-width

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Section 4: CTA Evaluation (Split Panel) - Acceptance Checklist

**File:** `sections/cta-split.html` + `_cta-split.scss`

- [ ] **Layout:** Split panel visible (left ~60% white, right ~40% sage green)
- [ ] **Left Panel:** White background, badge + heading + checklist + quote box
- [ ] **Right Panel:** Sage green background (#6B9080 or similar muted green)
- [ ] **Glassmorphism:** Right panel icon circle has backdrop-blur effect visible
- [ ] **Checklist Icons:** Sage green checkmarks in circles, aligned left
- [ ] **Quote Box:** Cream background (#F4F7F5), gold left border (~4px), italic text
- [ ] **Right Panel Icon:** Large circular background (~120px), clock or relevant icon
- [ ] **Right Panel Text:** White/cream text (#F4F7F5), good contrast on sage background
- [ ] **Right Panel Button:** White background with dark green text (inverted from primary)
- [ ] **Section Radius:** Heavy overall rounding (~32px) on entire section container

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Section 5: Testimonials (Dark Background) - Acceptance Checklist

**File:** `sections/testimonials-enhanced.html` + `_testimonials-dark.scss`

- [ ] **Background:** Dark forest green (#2F5548 or darker than primary #234E3E)
- [ ] **Section Icon:** Gold/sand accent color (#C5A880), quote marks visible
- [ ] **Heading Color:** Cream/off-white (#F4F7F5), serif font, centered
- [ ] **Decorative Dividers:** Gold/sand thin horizontal lines above/below heading
- [ ] **Layout:** 3-column grid of testimonials on desktop
- [ ] **Quote Text:** Cream color (#F4F7F5), serif italic, ~18-20px, line-height 1.7
- [ ] **Avatar Circles:** Small circular placeholders (~48px) with letter initials
- [ ] **Names:** Cream color, sans-serif, weight 600, uppercase with tracking
- [ ] **Roles:** Cream color at ~70% opacity, smaller size (~14px)
- [ ] **Responsive:** Stacks to 2-col or 1-col on tablet/mobile

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Section 6: FAQ Accordion - Acceptance Checklist

**File:** `sections/faq-content.html` + `_faq-accordion.scss`

- [ ] **Section Icon:** Sage green circle background (~64px), white question mark
- [ ] **Heading:** Centered, serif font, ~42px, dark green (#1A332A)
- [ ] **Container Width:** Narrower than typical sections (~900px max-width)
- [ ] **Accordion Items:** White background, subtle cream borders (#E9EFEC)
- [ ] **Item Radius:** Moderate rounding visible (~12-16px / $radius-lg)
- [ ] **Question Text:** Serif font, ~20px, weight 600, dark green
- [ ] **Expand Icons:** Circular buttons with + symbol, dark green border (~32px diameter)
- [ ] **Expanded State:** Icon rotates to become X or changes to minus, smooth transition
- [ ] **Answer Text:** Sans-serif, ~16px, line-height 1.7, muted green-grey (#587065)
- [ ] **Interaction:** Smooth height transition on expand/collapse (~300-400ms)

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Section 7: Contact Form (Split Panel) - Acceptance Checklist

**File:** `sections/contact-form-enhanced.html` + `_contact-split.scss`

- [ ] **Layout:** Split panel (left ~40% dark, right ~60% white)
- [ ] **Left Panel:** Dark forest green background (#2F5548), geometric shapes overlay
- [ ] **Geometric Shapes:** Lighter green shapes visible (~#4A6B5F), subtle opacity
- [ ] **Left Panel Text:** Cream/off-white (#F4F7F5), good contrast
- [ ] **Contact Icons:** Gold/sand outline circles (~48px), transparent fill
- [ ] **Contact Info:** Phone, email, location with labels (uppercase, tracking-wide) and values
- [ ] **Right Panel:** White background, info note box at top
- [ ] **Info Note:** Light cream background (#F4F7F5), sage green icon, italic text
- [ ] **Form Inputs:** Light cream background (#F9F9F9), generous height (~56px), subtle borders
- [ ] **Submit Button:** Sage green background (#6B9080), white text, pill shape, full-width, send icon

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Section 8: Footer - Acceptance Checklist

**File:** `organisms/footer.html` + `_footer.scss`

- [ ] **Background:** Dark forest green (#2F5548), full-width
- [ ] **Layout:** 4-column grid (Logo/Description, Navigare, Info, Social Media)
- [ ] **Logo:** Leaf icon + text, cream color (#F4F7F5)
- [ ] **Text Color:** Cream (#F4F7F5) for headings, ~80% opacity for links
- [ ] **Column Headings:** Sans-serif, uppercase, ~12px, tracking-wide, weight 600
- [ ] **Links:** Sans-serif, ~15px, vertical stack with ~16px gap
- [ ] **Link Hover:** Full opacity (100%), smooth transition
- [ ] **Social Icons:** Outline circle style (~40px diameter), ~1.5px border, cream color
- [ ] **Spacing:** Generous vertical padding (~80px), proper column gaps
- [ ] **Responsive:** Collapses to 2×2 grid (tablet) or single column (mobile)

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Section 9: Blog Grid - Acceptance Checklist

**File:** `sections/blog-grid.html` + `_blog-grid.scss`

- [ ] **Layout:** 3-column card grid on desktop, 2-col tablet, 1-col mobile
- [ ] **Card Background:** White (#FFFFFF) with subtle border
- [ ] **Card Radius:** Medium-heavy rounding (24-32px), not subtle
- [ ] **Card Image:** Full-width within card, aspect-ratio ~16:9, ~240px height
- [ ] **Image Radius:** Matches card radius or slightly heavier (24-32px)
- [ ] **Meta Text:** Date/category, sans-serif, ~13px, uppercase, tracking-wide
- [ ] **Card Titles:** Serif font, ~24px, weight 600, dark green (#1A332A)
- [ ] **Card Descriptions:** Sans-serif, ~15px, line-height 1.6, muted green-grey
- [ ] **Card Hover:** Shadow increase, slight lift, possible image zoom (scale 1.05)
- [ ] **Grid Gap:** ~32px between cards

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Section 10: Self-Assessment Tests - Acceptance Checklist

**File:** `sections/test-grid.html` + `_test-grid.scss`

- [ ] **Section Icon:** Sage green circle (~64px), white clipboard icon
- [ ] **Heading:** Centered, serif font, ~42px, dark green
- [ ] **Info Box:** Light blue-grey background (~#EEF3F6), sage green "i" icon, full-width
- [ ] **Info Box Text:** "Notă Importantă" heading visible, body text ~14px, line-height 1.6
- [ ] **Layout:** 2-column card grid on desktop, 1-col mobile
- [ ] **Card Icons:** Large color-coded circles (~80px), brain (blue), heart (coral/red)
- [ ] **Badge Pills:** "Gratuit" or equivalent, cream background, dark green text, ~10px uppercase
- [ ] **Card Titles:** Serif font, ~22px, weight 600, dark green
- [ ] **Meta Items:** Bullet-separated (● 3 minute ● 7 întrebări), ~13px
- [ ] **CTA Buttons:** Dark forest green background (#234E3E), white text, hover changes to sage green (#6B9080)

**Score:** ___/10 | **Pass:** ≥9/10 ✅

---

### Master Acceptance Scorecard

**Use this table to track overall progress:**

| Section | Score | Pass? | Notes |
|---------|-------|-------|-------|
| 1. Hero + Navigation | __/10 | ☐ | |
| 2. Services Grid | __/10 | ☐ | |
| 3. Methodology (Zigzag) | __/10 | ☐ | |
| 4. CTA Evaluation (Split) | __/10 | ☐ | |
| 5. Testimonials (Dark BG) | __/10 | ☐ | |
| 6. FAQ Accordion | __/10 | ☐ | |
| 7. Contact Form (Split) | __/10 | ☐ | |
| 8. Footer | __/10 | ☐ | |
| 9. Blog Grid | __/10 | ☐ | |
| 10. Self-Assessment Tests | __/10 | ☐ | |
| **TOTAL** | **__/100** | **__/10 Sections** | **Target: 90/100** |

**Overall Project Status:**
- **Visual Fidelity:** ___% (average of all section scores)
- **Sections Passing:** ___/10 (≥9/10 each)
- **Ready for Production:** ☐ YES / ☐ NO

**Acceptance Criteria for Production:**
- ☐ All 10 sections score ≥9/10 (90%+)
- ☐ Overall visual fidelity ≥90%
- ☐ Zero critical visual bugs
- ☐ Token compliance 100% (automated check passes)
- ☐ Build time <3s
- ☐ WCAG AA compliant
- ☐ Responsive 375px-1920px
- ☐ Cross-browser tested (Chrome, Firefox, Safari)

---

## Summary & Next Steps

This evaluation framework provides:

1. **Design Pattern Extraction** - Complete visual analysis of 10 sections from screenshots
2. **Design Token Migration Plan** - Full SCSS variable definitions ready to implement
3. **Component Specifications** - Detailed atom/molecule/section specs with code
4. **Implementation Blueprint** - Section-by-section strategy with templates and data schemas

**Next Actions**:

1. **Review eval1.md** - Validate design extraction accuracy against screenshots
2. **Create new git branch** - `git checkout -b redesign-2025`
3. **Phase 1: Tokens** - Implement all token updates from Part 2
4. **Phase 2: Components** - Update atoms/molecules per Part 3
5. **Phase 3: Sections** - Implement sections 1-10 per Part 4
6. **Phase 4: Testing** - Visual comparison, responsive testing, accessibility audit

**Quality Gates**:
- Design token compliance: 100% (no hardcoded values)
- Visual fidelity: 90%+ to screenshots (subjective but measurable via comparison)
- Performance: Build time <3s, CSS <50KB gzipped
- Accessibility: WCAG AA compliant
- Responsive: 375px-1920px functional

---

**End of eval1.md**
