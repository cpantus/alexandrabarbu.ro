---
description: "📷 Add Images - Guided image upload and replacement for placeholders"
---

# Add Images Command

Interactive tool for uploading and managing images in your generated site.

## Usage

```bash
/add-images [category]
```

**Categories**:
- `hero` - Hero/banner images for pages
- `services` - Service-related images
- `team` - Team member photos
- `logo` - Site logo
- `all` - Upload images for all categories
- (no category) - Interactive menu

## How It Works

### 1. Interactive Menu (No Category)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📷 IMAGE MANAGEMENT

Current image status:
┌──────────────────────────────────────────┐
│ Hero Images:    3/5 uploaded (2 placeholders) │
│ Service Images: 0/4 uploaded (4 placeholders) │
│ Team Photos:    0/3 uploaded (3 placeholders) │
│ Logo:           ✓ Uploaded                │
│ OG Images:      ⚠️  Using defaults          │
└──────────────────────────────────────────┘

What would you like to do?

1. 📸 Upload hero images (2 needed)
2. 🔧 Upload service images (4 needed)
3. 👥 Upload team photos (3 needed)
4. 🎨 Replace logo
5. 🌐 Add OG (social media) images
6. 🔍 Review all images
7. ♻️  Replace specific image
8. ❌ Exit

Enter choice [1-8]:
```

### 2. Upload Hero Images

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📸 UPLOAD HERO IMAGES

Hero images are large banner images for page headers.
Recommended: 1920x1080px (16:9), JPEG or WebP, <500KB

Current hero images:
✓ hero-home.jpg (Unsplash)
✓ hero-about.jpg (Unsplash)
⚠️  hero-services-placeholder.jpg (Placeholder)
✓ hero-contact.jpg (Unsplash)

Which hero image to upload?

1. Services page hero
2. Upload additional hero
3. Replace existing hero
4. Back to menu

Enter choice: 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Upload image for: Services page hero

Options:
a) Upload from local file
b) Provide image URL (will download)
c) Search Unsplash
d) Skip for now

Enter choice: a

Drag and drop image file or enter path:
> /Users/alex/Desktop/therapy-room.jpg

Analyzing image...
✓ File: therapy-room.jpg
✓ Size: 245KB
✓ Dimensions: 1920x1080 (perfect!)
✓ Format: JPEG

Optimize image?
- Resize if too large
- Convert to WebP for better performance
- Maintain quality at 90%

Optimize? [Y/n]: Y

Processing...
✓ Converted to WebP (187KB, 24% smaller)
✓ Created responsive sizes (1920w, 1280w, 640w)
✓ Moved placeholder to .wizard/replaced-images/
✓ Saved: static/images/hero/hero-services.webp
✓ Updated references in: content/services/_index.ro.md
✓ Updated references in: content/services/_index.en.md

Alt text for accessibility:
Current: "Services hero image"
New (or press Enter to keep): Peaceful therapy room with natural light

✓ Alt text updated

Upload another hero image? [y/N]: n
```

### 3. Upload Service Images

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 UPLOAD SERVICE IMAGES

Service images illustrate specific services.
Recommended: 1200x900px (4:3), JPEG or WebP, <300KB

Services needing images:
1. Individual Therapy (placeholder)
2. Couples Therapy (placeholder)
3. Family Therapy (placeholder)
4. Group Therapy (placeholder)

Upload images:
a) One by one (guided)
b) Batch upload (multiple files)
c) Search Unsplash for all
d) Skip for now

Enter choice: b

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 BATCH UPLOAD

Drop multiple image files or enter directory:
> /Users/alex/Desktop/service-photos/

Found 4 images:
- individual-therapy.jpg (1200x900, 280KB)
- couples-therapy.jpg (1400x1050, 320KB)
- family-therapy.jpg (1200x800, 265KB)
- group-session.jpg (1600x1200, 450KB)

Match images to services:

1. Individual Therapy
   Auto-matched: individual-therapy.jpg ✓
   Correct? [Y/n]: Y

2. Couples Therapy
   Auto-matched: couples-therapy.jpg ✓
   Correct? [Y/n]: Y

3. Family Therapy
   Auto-matched: family-therapy.jpg ✓
   Correct? [Y/n]: Y

4. Group Therapy
   Auto-matched: group-session.jpg ✓
   Correct? [Y/n]: Y

Processing 4 images...
✓ 1/4 individual-therapy.jpg → service-1.webp
✓ 2/4 couples-therapy.jpg → service-2.webp
✓ 3/4 family-therapy.jpg → service-3.webp
✓ 4/4 group-session.jpg → service-4.webp

All images optimized and saved!

Total saved: 245KB (38% reduction from originals)

Add alt text for each? [Y/n]: Y

Image 1 - Individual Therapy:
Alt text: Person in individual therapy session

Image 2 - Couples Therapy:
Alt text: Couple discussing in therapy

Image 3 - Family Therapy:
Alt text: Family therapy session with children

Image 4 - Group Therapy:
Alt text: Group therapy circle discussion

✓ All alt text saved
✓ Updated content files
✓ Replaced 4 placeholders

Service images complete! 🎉
```

### 4. Upload Team Photos

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 UPLOAD TEAM PHOTOS

Team photos appear on About/Team page.
Recommended: 800x800px (1:1 square), JPEG or WebP, <200KB

Current team members (from data/team.yaml):
1. Dr. Alexandra Barbu - Psychologist (placeholder)
2. Maria Ionescu - Therapist (placeholder)
3. Ion Popescu - Counselor (placeholder)

Upload photos for which team member?
[1-3] or "all": all

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Upload for: Dr. Alexandra Barbu

Options:
a) Upload photo
b) Use placeholder
c) Skip

Enter choice: a

Image path or drag-and-drop:
> /Users/alex/Photos/headshot-alexandra.jpg

✓ File: headshot-alexandra.jpg
⚠️  Size: 2400x3200 (will crop to square)

Crop preview:
┌────────────────┐
│                │
│   [  FACE ]    │  ← Will center on face
│                │
└────────────────┘

Auto-detect face for cropping? [Y/n]: Y

✓ Face detected, cropping centered
✓ Resized to 800x800
✓ Optimized: 145KB
✓ Saved: static/images/team/team-1.webp
✓ Updated: data/team.yaml

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Upload for: Maria Ionescu
[Repeat process...]

✓ All team photos uploaded!
```

### 5. Replace Logo

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 REPLACE LOGO

Current logo: static/images/logo/logo.png

Upload new logo:
Options:
a) Upload new logo file
b) Create text-based logo
c) Remove logo (use site name)
d) Cancel

Enter choice: a

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Upload logo file:
Recommended formats: SVG (preferred), PNG with transparency
Recommended size: 200px height, transparent background

Image path:
> /Users/alex/Desktop/new-logo.svg

✓ File: new-logo.svg (vector, 12KB)

This will:
1. Backup current logo to .wizard/replaced-images/
2. Save new logo as: static/images/logo/logo.svg
3. Generate PNG versions (for compatibility)
4. Update favicon
5. Update config references

Proceed? [Y/n]: Y

Processing...
✓ Backed up old logo
✓ Saved: static/images/logo/logo.svg
✓ Generated: static/images/logo/logo.png (200px height)
✓ Generated: static/images/logo/logo-square.png (512x512)
✓ Generated: favicon-32x32.png
✓ Generated: favicon-16x16.png
✓ Generated: apple-touch-icon.png
✓ Updated: config/_default/params.yaml

Logo replaced! Refresh browser to see changes.
```

### 6. Review All Images

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 IMAGE INVENTORY REVIEW

Total images: 27
Total size: 4.2MB
Placeholders remaining: 2

┌─────────────────────────────────────────────┐
│ HERO IMAGES (5)                             │
├─────────────────────────────────────────────┤
│ ✓ hero-home.webp         (187KB, 1920x1080) │
│ ✓ hero-about.webp        (203KB, 1920x1080) │
│ ✓ hero-services.webp     (187KB, 1920x1080) │
│ ✓ hero-contact.webp      (178KB, 1920x1080) │
│ ✓ hero-pricing.webp      (195KB, 1920x1080) │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SERVICE IMAGES (4)                          │
├─────────────────────────────────────────────┤
│ ✓ service-1.webp         (125KB, 1200x900)  │
│ ✓ service-2.webp         (132KB, 1200x900)  │
│ ✓ service-3.webp         (118KB, 1200x900)  │
│ ✓ service-4.webp         (140KB, 1200x900)  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ TEAM PHOTOS (3)                             │
├─────────────────────────────────────────────┤
│ ✓ team-1.webp            (145KB, 800x800)   │
│ ✓ team-2.webp            (138KB, 800x800)   │
│ ✓ team-3.webp            (142KB, 800x800)   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ LOGO (8 files)                              │
├─────────────────────────────────────────────┤
│ ✓ logo.svg               (12KB, vector)     │
│ ✓ logo.png               (25KB, 200px)      │
│ ✓ logo-square.png        (30KB, 512x512)    │
│ ✓ favicon-32x32.png      (2KB, 32x32)       │
│   ... and 4 more                            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ OG IMAGES (Social Media) (5)               │
├─────────────────────────────────────────────┤
│ ⚠️  og-home.jpg           (Placeholder)      │
│ ⚠️  og-about.jpg          (Placeholder)      │
│ ✓ og-services.jpg        (85KB, 1200x630)   │
│ ✓ og-contact.jpg         (78KB, 1200x630)   │
│ ✓ og-pricing.jpg         (82KB, 1200x630)   │
└─────────────────────────────────────────────┘

⚠️  Actions needed:
- 2 OG image placeholders (low priority)

Overall status: 93% complete

Actions:
1. Replace specific image
2. Generate missing OG images from hero images
3. Export inventory report
4. Back to menu

Enter choice:
```

### 7. Search Unsplash

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔎 SEARCH UNSPLASH

Category: Services images
Query: therapy session professional

Searching... Found 47 results

Top results:
1. ⭐⭐⭐⭐⭐ Therapist and client in session
   By: John Smith | 1920x1280 | ID: abc123

2. ⭐⭐⭐⭐ Peaceful therapy room
   By: Jane Doe | 1800x1200 | ID: def456

3. ⭐⭐⭐⭐ Professional counseling space
   By: Bob Wilson | 2400x1600 | ID: ghi789

[... more results ...]

Select image [1-10], "more" for next page, or "search" for new query:
> 1

Preview: https://unsplash.com/photos/abc123

Download this image? [Y/n]: Y

✓ Downloaded from Unsplash
✓ Optimized and saved
✓ Attribution added to credits
✓ Photographer: John Smith will be credited in footer

Saved as: static/images/services/service-1-abc123.webp
```

## Image Optimization

All uploaded images are automatically:

1. **Resized** if larger than recommended dimensions
2. **Converted to WebP** for ~30% smaller files
3. **Quality optimized** to 85-90% (imperceptible loss)
4. **Responsive versions created** (if hero/large images)
5. **Alt text prompted** for accessibility
6. **EXIF data stripped** for privacy

## Validation

Before accepting an image:

- ✅ Correct aspect ratio (or offer to crop)
- ✅ Sufficient resolution (warn if too small)
- ✅ File size reasonable (<5MB upload, optimized to <500KB)
- ✅ Valid format (JPEG, PNG, WebP, SVG for logos)
- ✅ No corruption

## Image Storage

```
static/images/
├── hero/
│   ├── hero-home.webp
│   ├── hero-home-1280.webp (responsive)
│   ├── hero-home-640.webp (responsive)
│   └── ...
├── services/
│   ├── service-1.webp
│   └── ...
├── team/
│   ├── team-1.webp
│   └── ...
├── logo/
│   ├── logo.svg
│   ├── logo.png
│   └── ...
└── og/
    ├── og-home.jpg
    └── ...
```

## Replaced Images Backup

Replaced images are moved to:
```
.wizard/replaced-images/{timestamp}/
├── hero-services-placeholder.jpg
└── ...
```

## Update Log

All image operations logged to:
```
.wizard/image-operations-log.md
```

Example:
```markdown
# Image Operations Log

## 2025-11-14 15:30 - Hero Services Image Uploaded

- **Action**: Upload
- **File**: therapy-room.jpg → hero-services.webp
- **Original size**: 245KB (1920x1080 JPEG)
- **Optimized**: 187KB (1920x1080 WebP, 24% reduction)
- **Replaced**: hero-services-placeholder.jpg
- **Alt text**: "Peaceful therapy room with natural light"
- **Updated files**:
  - content/services/_index.ro.md
  - content/services/_index.en.md
```

## Related Commands

- `/refine-site design` - Update logo via design refinement
- `/review-ai-content` - Review and edit content
- `/edit-content [page]` - Edit page content

## Tips

**Batch upload**: Drop multiple files at once for efficiency

**Use WebP**: Modern format, much smaller than JPEG/PNG

**Optimize before upload**: Smaller files = faster uploads and site

**Consistent style**: Match photography style across all images

**Alt text matters**: Essential for accessibility and SEO

**Backup originals**: Keep high-res originals in separate folder

---

**Note**: Images are optimized during upload. Original sizes may be reduced for web performance.
