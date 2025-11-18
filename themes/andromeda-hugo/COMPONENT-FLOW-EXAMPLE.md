# Component Flow Example: Romanian Landing Page

**How Atoms, Molecules, and Sections Work Together**

This document traces the complete flow from content data through sections, molecules, and atoms using the actual Romanian landing page as an example.

---

## 🎯 Overview: The Component Cascade

```
Content Data (YAML)
    ↓
Section Template (HTML)
    ↓
Molecule Components (Reusable UI patterns)
    ↓
Atom Components (Basic elements)
    ↓
Final HTML Output
```

---

## 📄 Example: Problem-Empathy Section

Let's trace **one complete section** from the Romanian landing page to see how all components work together.

### Level 1️⃣: Content Data (Front Matter)

**File:** `content/romanian/_index.md` (lines 54-76)

```yaml
problem_empathy:
  enable: true
  subtitle: "Nu ești singur"
  title: "Recunoști Aceste Semne?"
  description: "Multe persoane se confruntă cu provocări similare..."
  challenges:
    - title: "Anxietate și Stres Constant"
      description: "Te simți copleșit de grijile zilnice..."
      icon: "brain"
      index: 0
    - title: "Relații Dificile"
      description: "Conflicte recurente cu partenerul..."
      icon: "users"
      index: 1
    - title: "Traume Nerezolvate"
      description: "Amintiri dureroase care te bântuie..."
      icon: "brain"
      index: 2
    - title: "Scăderea Stării de Bine"
      description: "Lipsă de energie, pierderea plăcerii..."
      icon: "sad-tear"
      index: 3
  empathy_text: "Înțeleg prin ce treci..."
```

**What it is:** Pure data in YAML format. No HTML, no design, just content and structure.

**Key points:**
- Lives in content files (`.md` files)
- Multilingual (same structure for RO and EN)
- Content authors edit this, not code

---

### Level 2️⃣: Section Template

**File:** `layouts/partials/sections/problem-empathy.html` (63 lines)

```html
{{/* 1. Load data from front matter */}}
{{ $section := .Params.problem_empathy }}

{{ with $section }}
  {{ if .enable }}
    <section class="problem-empathy">
      <div class="container">

        {{/* 2. Section Header - Uses heading atom */}}
        <div class="problem-empathy-header">
          <p class="subtitle">{{ .subtitle | markdownify }}</p>

          {{/* ⚛️ ATOM: heading.html */}}
          {{ partial "atoms/heading.html" (dict
            "text" (.title | markdownify)
            "level" "h2"
            "class" "title"
          ) }}

          <p class="description">{{ .description | markdownify }}</p>
        </div>

        {{/* 3. Problem Cards Grid */}}
        <div class="problem-grid">
          {{ range $index, $challenge := .challenges }}

            {{/* 4. Calculate color variant (v4.0 automatic rotation) */}}
            {{ $colorVariants := slice "primary" "secondary" "coral" "sage" }}
            {{ $colorIdx := mod $index (len $colorVariants) }}
            {{ $colorVariant := index $colorVariants $colorIdx }}

            <div class="problem-card" data-aos="fade-up" data-aos-delay="{{ mul $index 100 }}">

              {{/* ⚛️ ATOM: icon.html with gradient wrapper */}}
              {{ partial "atoms/icon.html" (dict
                "name" ($challenge.icon | default "exclamation-circle")
                "withWrapper" true
                "wrapperVariant" $colorVariant
                "wrapperSize" "lg"
                "class" "problem-icon"
              ) }}

              <div class="problem-content">
                {{/* ⚛️ ATOM: heading.html with color variant */}}
                {{ partial "atoms/heading.html" (dict
                  "text" $challenge.title
                  "level" "h3"
                  "class" "problem-title"
                  "colorVariant" $colorVariant
                ) }}

                <p class="problem-description">{{ $challenge.description }}</p>
              </div>
            </div>
          {{ end }}
        </div>

        {{/* 5. Empathy Message */}}
        {{ if .empathy_text }}
          <div class="empathy-message text-center mt-5">
            <p class="lead">{{ .empathy_text | markdownify }}</p>
          </div>
        {{ end }}
      </div>
    </section>
  {{ end }}
{{ end }}
```

**What it does:**
1. **Loads data** from front matter (`problem_empathy` object)
2. **Loops through challenges** array (4 items)
3. **Calculates automatic colors** using 4-color rotation
4. **Calls atom components** for icons and headings
5. **Wraps in semantic HTML** with proper structure

**Key decisions made:**
- Color rotation pattern: `primary → secondary → coral → sage`
- Icon wrapper size: `lg` (80px circle)
- Animation delays: `0ms, 100ms, 200ms, 300ms`
- Heading levels: `h2` for title, `h3` for challenges

---

### Level 3️⃣: Atom Components

#### Atom #1: Icon with Gradient Wrapper

**File:** `layouts/partials/atoms/icon.html` (lines 78-159)

**Called with:**
```html
{{ partial "atoms/icon.html" (dict
  "name" "brain"              {{/* Challenge 0: icon name */}}
  "withWrapper" true          {{/* Enable gradient circle */}}
  "wrapperVariant" "primary"  {{/* Emerald gradient (index 0) */}}
  "wrapperSize" "lg"          {{/* 80px circle */}}
  "class" "problem-icon"      {{/* Additional CSS class */}}
) }}
```

**What the atom does:**
1. **Validates parameters** (name is required)
2. **Builds icon classes** (`las la-brain text-primary problem-icon`)
3. **Checks if wrapper needed** (`withWrapper: true`)
4. **Wraps icon in gradient circle:**
   ```html
   <div class="icon-circle icon-circle-lg icon-circle-primary">
     <i class="las la-brain"></i>
   </div>
   ```
5. **Applies SCSS styling** from `_icon-system.scss`:
   - 80px circular container
   - Emerald gradient background
   - Icon centered at 36px size
   - Glow effect on hover

**Output HTML:**
```html
<div class="icon-circle icon-circle-lg icon-circle-primary problem-icon">
  <i class="las la-brain"></i>
</div>
```

---

#### Atom #2: Heading with Color Variant

**File:** `layouts/partials/atoms/heading.html` (lines 61-84)

**Called with:**
```html
{{ partial "atoms/heading.html" (dict
  "text" "Anxietate și Stres Constant"  {{/* Challenge 0: title */}}
  "level" "h3"                          {{/* Heading level */}}
  "class" "problem-title"               {{/* Additional CSS class */}}
  "colorVariant" "primary"              {{/* Emerald color (matches icon) */}}
) }}
```

**What the atom does:**
1. **Validates parameters** (text and level required)
2. **Builds heading classes** (`heading-primary problem-title`)
3. **Determines HTML tag** (`h3`)
4. **Renders heading:**
   ```html
   <h3 class="heading-primary problem-title">Anxietate și Stres Constant</h3>
   ```
5. **Applies SCSS styling** from `_headings.scss`:
   - Cormorant Garamond font (serif)
   - Emerald color (#4DB380)
   - Proper font weight and sizing
   - Responsive scaling

**Output HTML:**
```html
<h3 class="heading-primary problem-title">Anxietate și Stres Constant</h3>
```

---

### Level 4️⃣: Final HTML Output

**Complete output for Challenge 0:**

```html
<section class="problem-empathy">
  <div class="container">
    <!-- Section header -->
    <div class="problem-empathy-header">
      <p class="subtitle">Nu ești singur</p>
      <h2 class="title">Recunoști Aceste Semne?</h2>
      <p class="description">Multe persoane se confruntă cu provocări similare...</p>
    </div>

    <!-- Problem cards grid -->
    <div class="problem-grid">

      <!-- Challenge 0: Anxietate (primary/emerald) -->
      <div class="problem-card" data-aos="fade-up" data-aos-delay="0">
        <div class="icon-circle icon-circle-lg icon-circle-primary problem-icon">
          <i class="las la-brain"></i>
        </div>
        <div class="problem-content">
          <h3 class="heading-primary problem-title">Anxietate și Stres Constant</h3>
          <p class="problem-description">Te simți copleșit de grijile zilnice...</p>
        </div>
      </div>

      <!-- Challenge 1: Relații (secondary/terracotta) -->
      <div class="problem-card" data-aos="fade-up" data-aos-delay="100">
        <div class="icon-circle icon-circle-lg icon-circle-secondary problem-icon">
          <i class="las la-users"></i>
        </div>
        <div class="problem-content">
          <h3 class="heading-secondary problem-title">Relații Dificile</h3>
          <p class="problem-description">Conflicte recurente cu partenerul...</p>
        </div>
      </div>

      <!-- Challenge 2: Traume (coral) -->
      <div class="problem-card" data-aos="fade-up" data-aos-delay="200">
        <div class="icon-circle icon-circle-lg icon-circle-coral problem-icon">
          <i class="las la-brain"></i>
        </div>
        <div class="problem-content">
          <h3 class="heading-coral problem-title">Traume Nerezolvate</h3>
          <p class="problem-description">Amintiri dureroase care te bântuie...</p>
        </div>
      </div>

      <!-- Challenge 3: Scăderea (sage) -->
      <div class="problem-card" data-aos="fade-up" data-aos-delay="300">
        <div class="icon-circle icon-circle-lg icon-circle-sage problem-icon">
          <i class="las la-sad-tear"></i>
        </div>
        <div class="problem-content">
          <h3 class="heading-sage problem-title">Scăderea Stării de Bine</h3>
          <p class="problem-description">Lipsă de energie, pierderea plăcerii...</p>
        </div>
      </div>

    </div>

    <!-- Empathy message -->
    <div class="empathy-message text-center mt-5">
      <p class="lead">Înțeleg prin ce treci...</p>
    </div>
  </div>
</section>
```

---

## 🎨 Visual Color Flow

**4-Color Rotation Pattern:**

```
Challenge 0 (index: 0) → mod(0, 4) = 0 → primary (emerald)
  ├─ Icon: .icon-circle-primary (emerald gradient)
  └─ Heading: .heading-primary (emerald text)

Challenge 1 (index: 1) → mod(1, 4) = 1 → secondary (terracotta)
  ├─ Icon: .icon-circle-secondary (terracotta gradient)
  └─ Heading: .heading-secondary (terracotta text)

Challenge 2 (index: 2) → mod(2, 4) = 2 → coral
  ├─ Icon: .icon-circle-coral (coral gradient)
  └─ Heading: .heading-coral (coral text)

Challenge 3 (index: 3) → mod(3, 4) = 3 → sage
  ├─ Icon: .icon-circle-sage (sage gradient)
  └─ Heading: .heading-sage (sage text)
```

**Result:** Automatic 25-25-25-25 color distribution across 4 challenges.

---

## 🔄 The Complete Landing Page Flow

**Romanian Landing Page** (`content/romanian/_index.md`)

```yaml
layout: "flexible"  # ← Uses flexible.html layout

sections:
  - type: "hero-breadcrumb"          # Section 1
  - type: "credentials-showcase"     # Section 2
  - type: "problem-empathy"          # Section 3 ← Our example
  - type: "feature-blocks"           # Section 4
  - type: "values-intro"             # Section 5
  - type: "values-compass"           # Section 6
  - type: "credentials-showcase"     # Section 7
  - type: "video-popup"              # Section 8
  - type: "onboarding-steps"         # Section 9
  - type: "faq-mini"                 # Section 10
  - type: "contact-form-enhanced"    # Section 11
```

### How Hugo Renders the Page:

**Step 1: Flexible Layout** (`layouts/_default/flexible.html`)

```html
<!DOCTYPE html>
<html>

  <!-- ORGANISM: Header -->
  {{ partial "organisms/header.html" . }}

  <main>
    <!-- LOOP THROUGH SECTIONS -->
    {{ range .Params.sections }}

      <!-- Section 1: hero-breadcrumb -->
      {{ if eq .type "hero-breadcrumb" }}
        {{ partial "sections/hero-breadcrumb.html" $ }}
      {{ end }}

      <!-- Section 2: credentials-showcase -->
      {{ if eq .type "credentials-showcase" }}
        {{ partial "sections/credentials-showcase.html" $ }}
      {{ end }}

      <!-- Section 3: problem-empathy ← Our example renders here -->
      {{ if eq .type "problem-empathy" }}
        {{ partial "sections/problem-empathy.html" $ }}
      {{ end }}

      <!-- Section 4-11: Continue rendering... -->

    {{ end }}
  </main>

  <!-- ORGANISM: Footer -->
  {{ partial "organisms/footer.html" . }}

</html>
```

**Step 2: Section Calls Atoms**

```
problem-empathy.html
  ├─ atoms/heading.html (section title)
  ├─ Loop 4 challenges:
  │   ├─ atoms/icon.html (challenge 0: brain, primary)
  │   ├─ atoms/heading.html (challenge 0: h3, primary)
  │   ├─ atoms/icon.html (challenge 1: users, secondary)
  │   ├─ atoms/heading.html (challenge 1: h3, secondary)
  │   ├─ atoms/icon.html (challenge 2: brain, coral)
  │   ├─ atoms/heading.html (challenge 2: h3, coral)
  │   ├─ atoms/icon.html (challenge 3: sad-tear, sage)
  │   └─ atoms/heading.html (challenge 3: h3, sage)
  └─ Empathy text (plain HTML)
```

**Step 3: Atoms Render HTML**

```
icon.html → <div class="icon-circle icon-circle-lg icon-circle-primary">
              <i class="las la-brain"></i>
            </div>

heading.html → <h3 class="heading-primary">Anxietate și Stres Constant</h3>
```

**Step 4: SCSS Adds Styling**

```scss
// _icon-system.scss (360 lines)
.icon-circle-lg {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.icon-circle-primary {
    background: linear-gradient(135deg, #4DB380 0%, #3A9D6F 100%);
    box-shadow: 0 4px 12px rgba(77, 179, 128, 0.25);

    i {
      font-size: 36px;
      color: #fff;
    }

    &:hover {
      box-shadow: 0 6px 20px rgba(77, 179, 128, 0.4);
      transform: translateY(-2px);
    }
  }
}

// _headings.scss (92 lines)
.heading-primary {
  font-family: 'Cormorant Garamond', Georgia, serif;
  color: #4DB380;
  font-weight: 600;
}
```

---

## 📊 Component Usage Statistics (Landing Page)

**Total Components Used on Romanian Landing Page:**

### Sections (11)
1. hero-breadcrumb
2. credentials-showcase (appears 2x)
3. problem-empathy
4. feature-blocks
5. values-intro
6. values-compass
7. video-popup
8. onboarding-steps
9. faq-mini
10. contact-form-enhanced

### Molecules (Estimated 30+)
- card.html (used in credentials, features, FAQ)
- credential-badge.html (8 badges in credentials-showcase)
- accordion.html (used in faq-mini)
- form-field.html (used in contact-form)
- video-embed.html (used in video-popup)
- breadcrumb.html (used in hero)

### Atoms (Estimated 100+)
- **icon.html** - ~40 instances
  - 4 in problem-empathy (with gradient wrappers)
  - 8 in credentials-showcase (badge icons)
  - ~6 in values-compass (benefit icons)
  - ~6 in feature-blocks (feature icons)
  - ~3 in onboarding-steps (step numbers)
  - More in buttons, navigation, footer

- **heading.html** - ~30 instances
  - 1 main heading per section (11 sections)
  - Multiple sub-headings (h3, h4) in each section
  - All with automatic color variants

- **button.html** - ~15 instances
  - CTAs in hero, values-intro, contact-form
  - Links in credentials, features, FAQ
  - Multiple color variants (primary, secondary, outline)

- **image.html** - ~10 instances
  - Hero image, feature images, credential photos
  - All with lazy loading and WebP support

---

## 💡 Key Takeaways

### 1. **Separation of Concerns**
- **Content** (YAML) - What to say
- **Sections** (HTML) - How to structure
- **Molecules** (HTML) - Reusable patterns
- **Atoms** (HTML) - Basic elements
- **SCSS** - How to style

### 2. **Data Flow is One-Way**
```
Content → Section → Molecule → Atom → HTML
```
Never goes backward. Each level only knows about the level below.

### 3. **Reusability Saves Code**
- `icon.html` used 40+ times
- `heading.html` used 30+ times
- `card.html` used 20+ times
- Total: ~90 component reuses vs. ~1,000 lines of duplicate HTML

### 4. **Automatic Features Work at Section Level**
- Color rotation calculated in section
- Animation delays calculated in section
- Passed down to atoms as parameters

### 5. **Zero Configuration for Content Authors**
Content authors write:
```yaml
challenges:
  - title: "Anxietate"
    icon: "brain"
```

System automatically provides:
- ✅ Gradient icon circle (emerald)
- ✅ Matching heading color (emerald)
- ✅ Staggered animation (0ms delay)
- ✅ Responsive sizing
- ✅ Accessibility attributes
- ✅ Hover effects

---

## 🔍 Debugging Tips

### Find where a component is used:
```bash
# Find all sections using icon atom
rg "atoms/icon.html" layouts/partials/sections/

# Find all color variant usages
rg "colorVariant" layouts/partials/

# Find all gradient wrappers
rg "withWrapper.*true" layouts/partials/
```

### Trace component flow:
1. **Start with content** - Check `content/romanian/_index.md`
2. **Find section** - Look in `layouts/partials/sections/problem-empathy.html`
3. **Check atoms called** - Search for `partial "atoms/`
4. **View atom code** - Read `layouts/partials/atoms/icon.html`
5. **Check SCSS** - Look in `assets/scss/systems/_icon-system.scss`

### Test in browser:
1. Run Hugo: `cd themes/andromeda-hugo && hugo server`
2. Open: `http://localhost:1313/`
3. Inspect element: Right-click → Inspect
4. See generated HTML and applied CSS

---

## 📚 Related Documentation

- **Component Inventory**: `COMPONENT-INVENTORY.md` - Full list of all 62 components
- **CLAUDE.md**: Theme guidelines and usage patterns
- **PROJECT.md**: Architecture and design decisions
- **REFACTOR-PLAN-v2.md**: Atomic design migration plan

---

**Document Complete**
**Example Source**: Romanian Landing Page (`content/romanian/_index.md`)
**Last Updated**: 2025-11-18
