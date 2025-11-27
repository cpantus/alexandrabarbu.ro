# Andromeda Hugo Theme - Customization Guide

**Version:** 5.5.0
**Last Updated:** 2025-11-25

## Overview

The Andromeda Hugo theme is fully customizable through a single configuration file. Edit `config/_default/design.toml` to control colors, typography, spacing, animations, and more - all without touching any SCSS or code files.

## Quick Start

1. Open `config/_default/design.toml`
2. Edit the values you want to change
3. Run `hugo server` to see changes instantly
4. Build with `hugo --gc --minify` for production

## How It Works

```
design.toml → Hugo Pipes → SCSS → CSS Custom Properties → Components
```

Your configuration values are injected at build time, generating CSS custom properties that all components use. This ensures:
- Type-safe values (validated at build time)
- Optimized CSS output
- Consistent styling across all components

---

## Configuration Reference

### Brand Colors

```toml
[design.brand]
  # Primary brand color - Main CTAs, buttons, links
  # Examples: #234E3E (forest), #0066CC (blue), #8B4513 (brown)
  primary = "#234E3E"

  # Secondary brand color - Secondary buttons, accents
  # Examples: #6B9080 (sage), #4A90E2 (sky), #C19A6B (tan)
  secondary = "#6B9080"

  # Accent color - Badges, icons, highlights
  # Examples: #D4AF37 (gold), #FF6B6B (coral), #9B59B6 (purple)
  accent = "#D4AF37"

  # Semantic colors
  success = "#10B981"
  warning = "#F59E0B"
  error = "#EF4444"
```

### Typography

```toml
[design.typography]
  # Heading font (serif or sans-serif)
  # Options: "Playfair Display", "Merriweather", "Lora", "Montserrat", "Inter"
  heading_font = "Playfair Display"

  # Body font (readable sans-serif)
  # Options: "DM Sans", "Work Sans", "Inter", "Open Sans", "Roboto"
  body_font = "DM Sans"

  # Font weights
  heading_weight = "700"
  body_weight = "400"

  # Base font size (14px-18px recommended)
  base_size = "16px"

  # Font scale ratio
  # Options: 1.2 (minor third), 1.25 (major third), 1.333 (perfect fourth)
  scale = "1.25"

  # Line heights
  line_height_body = "1.6"
  line_height_heading = "1.2"
```

### Text Colors

```toml
[design.colors.text]
  primary = "#374151"    # Body copy
  secondary = "#6B7280"  # Captions, metadata
  muted = "#9CA3AF"      # Placeholders, disabled
  inverted = "#FFFFFF"   # Dark backgrounds
```

### Spacing System

```toml
[design.spacing]
  base = "8px"                     # Base unit (8px grid)
  scale = "1.5"                    # Spacing scale
  section_padding_desktop = "80px" # Section vertical padding
  section_padding_mobile = "48px"
  container_max_width = "1200px"
  container_padding = "16px"
```

### Borders

```toml
[design.borders]
  width = "1px"
  focus_width = "2px"
  radius_sm = "4px"
  radius_md = "8px"
  radius_lg = "16px"
  radius_full = "9999px"  # Pill shape
  color = "#E5E7EB"
```

### Shadows

```toml
[design.shadows]
  sm = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
  md = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  lg = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  xl = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
```

### Backgrounds

```toml
[design.backgrounds]
  # Toggle gradient backgrounds (false = solid colors)
  enable_gradients = true

  # Gradient settings
  gradient_type = "linear"   # Options: linear, radial, conic
  gradient_angle = "135deg"  # For linear gradients
  gradient_start_opacity = "0.9"
  gradient_end_opacity = "0.7"

  # Glassmorphism effect (frosted glass)
  enable_glassmorphism = true
  glassmorphism_blur = "12px"
  glassmorphism_opacity = "0.8"

  # Dark overlay for hero images
  overlay_opacity = "0.4"
```

### Animations

```toml
[design.animations]
  # Global speed multiplier (0.5 = 2x faster, 2.0 = 2x slower)
  speed_multiplier = "1.0"

  # Easing function
  # Options: linear, ease, ease-in, ease-out, ease-in-out
  # Custom: cubic-bezier(0.4, 0.0, 0.2, 1)
  easing = "ease-in-out"

  # Toggle animation types
  enable_scroll_animations = true    # Fade in on scroll
  enable_hover_animations = true     # Button lift, card hover
  enable_parallax = true             # Background parallax
  enable_entrance_animations = true  # Page load animations

  # Parallax strength (0.0 to 1.0)
  parallax_strength = "0.5"
```

### Component Settings

#### Buttons

```toml
[design.components.buttons]
  padding_horizontal = "24px"
  padding_vertical = "12px"
  font_size = "16px"
  font_weight = "600"
  border_radius = "8px"
  hover_lift = "2px"
  transition = "0.2s"
  text_transform = "none"  # Options: none, uppercase, lowercase
```

#### Cards

```toml
[design.components.cards]
  background = "#FFFFFF"
  border_width = "1px"
  border_color = "#E5E7EB"
  border_radius = "12px"
  padding = "24px"
  hover_effect = "lift"   # Options: lift, glow, none
  hover_lift = "4px"
```

#### Navigation

```toml
[design.components.navigation]
  height = "72px"
  background = "#FFFFFF"
  backdrop_blur = true
  link_color = "#374151"
  link_hover_color = "#234E3E"
  mobile_menu_background = "#FFFFFF"
```

#### Forms

```toml
[design.components.forms]
  input_background = "#FFFFFF"
  input_border_color = "#D1D5DB"
  input_border_width = "1px"
  input_border_radius = "8px"
  input_padding = "12px 16px"
  input_focus_border_color = "#234E3E"
  input_font_size = "16px"
```

#### Icons

```toml
[design.components.icons]
  size_sm = "16px"
  size_md = "24px"
  size_lg = "32px"
  default_color = "#234E3E"
```

#### Badges

```toml
[design.components.badges]
  padding = "4px 12px"
  border_radius = "16px"
  font_size = "14px"
  font_weight = "500"
```

#### Hero Section

```toml
[design.components.hero]
  min_height_desktop = "600px"
  min_height_mobile = "400px"
  text_align = "center"  # Options: left, center, right
  overlay_opacity = "0.5"
```

#### Footer

```toml
[design.components.footer]
  background = "#1F2937"
  text_color = "#D1D5DB"
  padding_top = "64px"
  padding_bottom = "32px"
```

### Accessibility

```toml
[design.accessibility]
  min_contrast_ratio = "4.5"  # WCAG AA = 4.5, AAA = 7.0
  focus_ring_color = "#234E3E"
  focus_ring_width = "2px"
  focus_ring_offset = "2px"
  respect_reduced_motion = true  # Disable animations for users who prefer
```

### Performance

```toml
[design.performance]
  enable_css_variables = true      # Runtime theming via CSS vars
  enable_gpu_acceleration = true   # Smoother animations
```

---

## Example Configurations

### Psychology Practice (Current)

```toml
[design.brand]
  primary = "#234E3E"   # Forest green - trust, growth
  secondary = "#6B9080" # Sage green - calm, healing
  accent = "#D4AF37"    # Gold - premium, warmth

[design.typography]
  heading_font = "Playfair Display"  # Elegant serif
  body_font = "DM Sans"              # Clean sans-serif

[design.animations]
  enable_hover_animations = true
  speed_multiplier = "1.0"  # Normal pace for calm feeling
```

### Law Firm

```toml
[design.brand]
  primary = "#1a365d"   # Navy blue - authority
  secondary = "#2d3748" # Slate - professionalism
  accent = "#c4a35a"    # Gold - prestige

[design.typography]
  heading_font = "Merriweather"  # Traditional serif
  body_font = "Work Sans"

[design.backgrounds]
  enable_gradients = false  # Conservative, solid colors
  enable_glassmorphism = false

[design.animations]
  enable_hover_animations = true
  speed_multiplier = "0.8"  # Faster, more businesslike
```

### Tech Startup

```toml
[design.brand]
  primary = "#6366f1"   # Indigo - innovation
  secondary = "#8b5cf6" # Purple - creativity
  accent = "#06b6d4"    # Cyan - energy

[design.typography]
  heading_font = "Inter"   # Modern sans
  body_font = "Inter"

[design.borders]
  radius_md = "12px"
  radius_lg = "24px"  # More rounded for modern look

[design.backgrounds]
  enable_gradients = true
  enable_glassmorphism = true  # Modern frosted glass effect

[design.animations]
  enable_all_animations = true
  speed_multiplier = "1.2"  # Slightly slower for dramatic effect
```

### Minimal/Accessible

```toml
[design.brand]
  primary = "#000000"   # Pure black
  secondary = "#4B5563" # Gray
  accent = "#2563EB"    # Blue for links

[design.backgrounds]
  enable_gradients = false
  enable_glassmorphism = false

[design.animations]
  enable_scroll_animations = false
  enable_hover_animations = false
  enable_parallax = false
  enable_entrance_animations = false

[design.accessibility]
  min_contrast_ratio = "7.0"  # WCAG AAA
  respect_reduced_motion = true
```

---

## Multi-Client Setup

Create environment-specific configs:

```
config/
├── _default/
│   └── design.toml    # Base config
├── production/
│   └── design.toml    # Client A
├── staging/
│   └── design.toml    # Client B
└── development/
    └── design.toml    # Testing
```

Build for specific environment:

```bash
hugo --environment=production
hugo --environment=staging
```

---

## CSS Custom Properties

All design tokens are exposed as CSS custom properties. You can override them in your own CSS:

```css
/* Override in custom CSS */
:root {
  --btn-primary-bg: #FF0000;  /* Red buttons */
  --card-border-radius: 0;    /* Sharp corners */
}
```

### Available CSS Variables

**Animation System:**
- `--anim-hover-enabled` (1 or 0)
- `--anim-scroll-enabled` (1 or 0)
- `--anim-entrance-enabled` (1 or 0)
- `--anim-parallax-enabled` (1 or 0)
- `--anim-speed-multiplier`
- `--anim-easing`
- `--anim-duration-fast`, `--anim-duration-base`, `--anim-duration-slow`

**Background System:**
- `--bg-gradients-enabled` (1 or 0)
- `--bg-glassmorphism-enabled` (1 or 0)
- `--bg-glassmorphism-blur`
- `--bg-glassmorphism-opacity`
- `--bg-overlay-opacity`
- `--bg-gradient-type`
- `--bg-gradient-angle`

**Components:**
- `--btn-*` (button properties)
- `--card-*` (card properties)
- `--form-*` (form properties)
- `--heading-*` (heading properties)
- `--nav-*` (navigation properties)
- `--footer-*` (footer properties)

---

## Troubleshooting

### Changes Not Appearing

1. Clear Hugo cache: `hugo --gc`
2. Check for typos in TOML file
3. Verify hex colors are valid (#RRGGBB format)
4. Check Hugo server console for errors

### Build Errors

1. Run `hugo --verbose --debug` for detailed errors
2. Check TOML syntax (use a validator)
3. Ensure all required sections exist

### Animations Not Working

1. Check `enable_*_animations` toggles
2. Verify `speed_multiplier` is not 0
3. Check browser developer tools for CSS variables

### Gradients Not Showing

1. Verify `enable_gradients = true`
2. Check `gradient_type` is valid
3. Ensure colors have proper opacity values

---

## Token Reference (95 tokens)

| Category | Count | Examples |
|----------|-------|----------|
| Brand Colors | 6 | primary, secondary, accent, success, warning, error |
| Typography | 10 | fonts, weights, sizes, line heights |
| Text Colors | 4 | primary, secondary, muted, inverted |
| Spacing | 7 | base, scale, section padding, container |
| Borders | 7 | width, radius (4 sizes), color |
| Shadows | 4 | sm, md, lg, xl |
| Backgrounds | 8 | gradients, glassmorphism, overlay |
| Animations | 7 | speed, easing, toggles |
| Buttons | 8 | padding, font, radius, hover |
| Cards | 7 | background, border, padding, hover |
| Navigation | 6 | height, background, colors |
| Forms | 7 | input styling |
| Icons | 4 | sizes, color |
| Badges | 4 | padding, radius, font |
| Hero | 4 | heights, alignment, overlay |
| Footer | 4 | background, colors, padding |
| Accessibility | 4 | contrast, focus ring |
| Performance | 2 | CSS vars, GPU |

---

## Need Help?

- Check the comments in `design.toml` for guidance
- Review example configurations above
- Run `hugo --verbose` for detailed build output
- All hex colors must be in #RRGGBB format
