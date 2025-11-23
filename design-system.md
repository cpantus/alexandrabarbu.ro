1. Core Identity & Mood
Theme: Organic, Professional, Serene, grounded, therapeutic.
Metaphor: The Compass ("Nordul Interior") and Nature (Leaves, Growth).
Visual Style: Clean minimalism with organic touches, soft textures, and high-end typography.
2. Tech Stack & Libraries
Framework: React with Tailwind CSS.
Icons: lucide-react (Stroke width: 1px or 1.5px).
Fonts: Google Fonts via CDN.
Motion: framer-motion for complex SVG animations, Tailwind transition for UI states.
3. Color Palette
The palette is nature-inspired, utilizing deep greens and muted creams.
Primary Colors
Deep Forest Green (Primary): #234E3E
Usage: Headings, Primary Buttons, Footer Background, Strong Borders.
Sage Green (Secondary): #6B9080
Usage: Hover states, sub-accents, illustrations.
Muted Gold/Sand (Accent): #C5A880
Usage: Highlights, Links, Button Secondary variants, "N" on compass.
Neutral/Background Colors
Cream 50 (Purest): #FCFDFB
Cream 100 (Main App BG): #F4F7F5 (Cool Green-tinted cream).
Cream 200 (Borders/Dividers): #E9EFEC
Cream 300: #DCE5E0
Text Colors
Main Text: #1A332A (Dark green-black, almost charcoal).
Muted Text: #587065 (Muted green-grey for paragraphs).
Light Text: #F4F7F5 (For dark backgrounds).
4. Typography
Font Family 1: Serif (Headings)
Font: "Playfair Display", serif.
Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).
Usage Rules:
Used for all Headings (H1-H6).
Italic Usage: Frequently used for emphasis words within a heading (e.g., font-serif italic text-brand-secondary).
Line Height: Tight leading on large display text (approx 1.1).
Font Family 2: Sans-Serif (Body/UI)
Font: "DM Sans", sans-serif.
Weights: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold).
Usage Rules:
Used for body paragraphs, navigation, buttons, labels.
Uppercase: Often used for labels/tags with tracking-widest and text-xs.
5. UI Components
Buttons
Shape: rounded-full (Pill shape).
Typography: DM Sans, Medium weight.
Variants:
Primary: Bg #234E3E, Text White, Shadow colored (shadow-brand-primary/20). Hover: Bg #6B9080, Translate Y -1px.
Secondary: Bg #C5A880, Text White. Hover: Darker Gold (#B0936B).
Outline: Border-2 #234E3E, Text #234E3E. Hover: Bg #234E3E, Text White.
Ghost: Text #234E3E, Hover Bg #234E3E/5.
Cards (Services/Resources)
Shape: Heavy rounding rounded-[2rem] or rounded-[3rem].
Background: White (bg-white).
Border: Thin, subtle (border border-cream-200).
Hover Effect: hover:border-brand-accent/30, hover:shadow-2xl, internal elements lift (-translate-y-1 or scale).
Navbar
State 1 (Top): Transparent, large padding (py-6).
State 2 (Scrolled): Glassmorphism (bg-cream-100/90 backdrop-blur-md), compact padding (py-3), shadow-sm.
Links: DM Sans, relative positioning for animated underline effect on hover (center-out expansion).
6. Visual Effects & Textures
The "Grain" Overlay
A global texture applied to the entire app to remove digital harshness.
Implementation: Fixed div inset-0, z-index 50, pointer-events-none.
CSS: opacity-40, mix-blend-multiply.
Image: SVG Data URI using <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>.
Organic Blobs
Used behind icons in cards.
Style: SVG shapes with irregular paths.
Fill: Current color opacity 10% (opacity-10 fill-current).
Shadows
Type: Diffused, colored shadows rather than pure black.
Example: shadow-brand-primary/20.
7. Animations & Micro-interactions
Global Keyframes (Tailwind)
spin-slow: Linear rotation, 20s duration (used on Compass rings).
float: TranslateY -20px and back, 6s ease-in-out (used for floating elements).
blob: Transform scale/translate loop, 7s infinite (used for organic shapes).
Interactions
Hover: Almost all interactive elements have transition-all duration-300.
Cards: Group hover effects. When card is hovered, the icon scales (scale-110) and the title underline color changes.
8. Layout Principles
Spacing: Generous whitespace. Sections typically use py-24 or py-32.
Grid: Standard 12-column logic (using Tailwind grid-cols-1 md:grid-cols-2 lg:grid-cols-3).
Container: max-w-7xl mx-auto px-4.
9. Specific Iconography (The Compass)
Style: Fine lines (strokeWidth="1" or "0.5").
Colors: Strokes in Primary Green (#234E3E), accents in Gold (#D68C5D).
Animation:
Outer ring: Rotates clockwise slowly.
Middle ring: Rotates counter-clockwise.
Needle: Oscillates gently +/- 20 degrees (easeInOut).
