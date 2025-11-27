# Hugo Theme Consolidation Report
**Date**: 2025-11-27
**Site**: alexandrabarbu.ro
**Theme**: Andromeda Hugo

---

## Executive Summary

After comprehensive analysis of the Hugo site at `/home/cere/Work/alex/alexandrabarbu.ro`, this report identifies opportunities to consolidate and simplify the theme structure. The site currently follows a **theme-based architecture** with components split between the theme directory and project root, creating maintenance complexity.

**Key Findings**:
- 717 source files (content, layouts, styles, scripts)
- Maximum directory depth: 13 levels (excessive)
- Theme size: 29MB
- Partial duplication between root layouts and theme layouts
- Two SCSS entry points (legacy + new)
- Mixed archetype locations
- 20+ documentation files scattered across theme and root

**Consolidation Goals**:
1. Flatten directory structure to 3-4 levels maximum
2. Eliminate duplicate files between root and theme
3. Clean up legacy/backup directories
4. Consolidate documentation
5. Simplify configuration structure
6. Maintain existing functionality while reducing complexity

---

## 1. Current State Analysis

### 1.1 File Count by Type

```
Total source files: 717
├── Markdown (.md): ~172 (content: 50, docs: 122)
├── HTML (.html): 115 (layouts/partials)
├── SCSS (.scss): 131
├── JavaScript (.js): ~14
├── Config (.toml, .yaml): ~20
└── Images: ~100 (72 theme + 28 static)
```

### 1.2 Directory Depth Analysis

**Problem Areas** (depth > 5 levels):
```
themes/andromeda-hugo/assets/scss/06-components/         # 5 levels
themes/andromeda-hugo/layouts/partials/sections/         # 5 levels
themes/andromeda-hugo/dev/active/design-audit-*/         # 6+ levels
content/romanian/resurse/articole/                       # 4 levels (acceptable)
```

**Maximum Observed Depth**: 13 levels (in dev/active subdirectories)

### 1.3 Size Analysis

```
Total project: ~230MB (with generated files)
├── public/ (generated): 148MB
├── core/ (submodule): 32MB
├── themes/andromeda-hugo/: 29MB
│   ├── assets/images/: 8.3MB
│   ├── layouts/partials/: ~2MB
│   └── assets/scss/: ~500KB
├── resources/ (generated): 15MB
├── static/images/: 2.3MB
├── dev/: 1.6MB
└── content/: 516KB
```

### 1.4 Component Distribution

**Theme Components** (themes/andromeda-hugo/layouts/partials/):
```
├── atoms/ (10 files)
├── molecules/ (21 files)
├── organisms/ (2 files)
├── sections/ (37 files)
├── meta/ (2 files)
├── seo/ (2 subdirs + 4 files)
├── essentials/ (5 files)
└── components/ (1 file)

Total: 108 HTML partials
```

**Root Overrides** (layouts/partials/):
```
├── atoms/ (1 file: compass-animation.html)
├── molecules/ (4 files: feature-highlight, info-box, quote-block, resource-card)
└── sections/ (2 files: confidentiality-notice, privacy-guarantee)

Total: 7 HTML partials
```

**Analysis**: The 7 root partials override or extend theme functionality. The `privacy-guarantee.html` exists in BOTH locations but with different content (147 lines root vs 46 lines theme - **NOT identical**).

---

## 2. Problem Areas

### 2.1 Duplicate/Split Components

**CRITICAL - Duplicate Section with Different Content**:
```
layouts/partials/sections/privacy-guarantee.html          # 147 lines (enhanced)
themes/andromeda-hugo/layouts/partials/sections/privacy-guarantee.html  # 46 lines (basic)
```
**Impact**: Hugo will use the root version, making the theme version dead code.
**Action Required**: Consolidate to single source of truth.

**Root-Only Molecules** (not in theme):
```
layouts/partials/molecules/feature-highlight.html
layouts/partials/molecules/info-box.html
layouts/partials/molecules/quote-block.html
layouts/partials/molecules/resource-card.html
```
**Impact**: These are orphaned components likely for content pages (resources).
**Action Required**: Move to theme if reusable, or document as content-specific.

**Root-Only Atom**:
```
layouts/partials/atoms/compass-animation.html
```
**Impact**: Special animation component, should be in theme atoms.
**Action Required**: Move to theme.

**Root-Only Section**:
```
layouts/partials/sections/confidentiality-notice.html
```
**Impact**: Missing from theme, should be consolidated.
**Action Required**: Move to theme.

### 2.2 SCSS Architecture Issues

**Multiple Entry Points**:
```
themes/andromeda-hugo/assets/scss/
├── main-new.scss      # ACTIVE - ITCSS entry point (19.7KB)
├── style.scss         # WRAPPER - imports main-new.scss (318 bytes)
└── _config-bridge.scss # CONFIG BRIDGE (13.2KB)
```

**Analysis**:
- `style.scss` is a thin wrapper that just imports `main-new.scss`
- `main-new.scss` is the actual ITCSS entry point
- Both files are redundant - only one entry point needed
- The theme uses `main-new.scss` directly (confirmed in `essentials/style.html`)

**Empty Directory**:
```
themes/andromeda-hugo/assets/scss/base/  # EMPTY (0 files)
```
**Action**: Remove empty directory.

**Legacy Pages Directory**:
```
themes/andromeda-hugo/assets/scss/pages/
├── _contact.scss
└── _signup.scss
```
**Analysis**: Page-specific styles violate ITCSS component architecture. These should be sections in `06-components/` or removed if already covered by component styles.

### 2.3 Configuration Fragmentation

**Root Config Files** (2 Hugo configs):
```
/hugo.toml                          # Root config (7.9KB)
/config/_default/hugo.toml          # Module config
```

**Config Directory** (12 files):
```
config/_default/
├── hugo.toml
├── taxonomies.toml
├── seo.toml
├── params.toml
├── imaging.toml
├── menus.ro.toml
├── menus.en.toml
├── design.toml
├── markup.toml
├── languages.toml
├── outputs.toml
└── module.toml
```

**Analysis**: Good modular structure, but root `hugo.toml` may duplicate settings from `config/_default/hugo.toml`.

### 2.4 Archetype Duplication

**Root Archetypes** (9 files, Nov 2025 - NEWER):
```
archetypes/
├── about-page.md
├── approach-page.md
├── contact-page.md
├── default.md
├── landing-page.md
├── legal-page.md
├── resource-page.md
└── service-page.md
```

**Theme Archetypes** (7 files, older):
```
themes/andromeda-hugo/archetypes/
├── blog.md
├── default.md
├── landing.md
├── landing-page.md
├── service.md
├── service-page.md
└── therapy-page.md
```

**Overlap**:
- `default.md` exists in both
- `landing-page.md` exists in both
- `service-page.md` exists in both

**Analysis**: Root archetypes are newer (Nov 20, 2025) and more comprehensive. Theme archetypes are older (Nov 17, 2025 and May 2025). Root versions should be consolidated into theme.

### 2.5 Documentation Sprawl

**Root Documentation** (8 files + cleanup notes):
```
ARCHITECTURE.md          # 12.9KB
CLAUDE.md               # 7.5KB
changelog.md            # 10.5KB
cleanup-27-11.md        # 7.4KB
design-review-2025-11-23.md  # 35KB
design-system.md        # 4.4KB
eval1.md                # 66.8KB
README.md               # 7.8KB
REDESIGN-2025-PROGRESS.md    # 9.8KB
TESTING-GUIDE.md        # 13.8KB
```

**Theme Documentation** (13 files):
```
themes/andromeda-hugo/
├── ARCHITECTURE.md
├── cc-design.md
├── CLAUDE-ITCSS-ADDENDUM.md
├── CLAUDE.md
├── COMPONENT-AUDIT-REPORT.md
├── COMPONENT-FLOW-EXAMPLE.md
├── COMPONENT-INVENTORY.md
├── DESIGN-TOKENS-USAGE.md
├── ICON-CONSISTENCY-FIX.md
├── LAYOUT_MIXING_GUIDE.md
├── PAGES-COMPONENTS.md
├── PROJECT.md
└── THEME-CUSTOMIZATION.md
```

**Analysis**:
- `ARCHITECTURE.md` exists in BOTH locations (root: 12.9KB, theme: varies)
- `CLAUDE.md` exists in BOTH locations (root: 7.5KB, theme: varies)
- Total: 21+ documentation files
- Significant duplication and confusion about source of truth

### 2.6 Legacy/Backup Files

**Confirmed Backups**:
```
content-old-backup/              # OLD content backup (should be archived)
scripts/archive/remove-deprecated-sections.py.obsolete
dev/archive/design-system-enhancement/design-system-enhancement-tasks-old.md
```

**Suspicious Root Scripts**:
```
fix-gradients.sh         # One-time fix script?
strip-comments.sh        # Utility script
strip-html-comments.sh   # Utility script
start-dev.sh            # Dev helper (keep)
```

**Analysis**: `fix-gradients.sh` and `strip-*-comments.sh` scripts are likely one-time utilities that can be archived.

### 2.7 Unused Languages

**i18n Files**:
```
i18n/
├── en.yaml   # English (USED)
├── fr.yaml   # French (UNUSED - from template?)
└── ro.yaml   # Romanian (USED)
```

**Analysis**: `fr.yaml` is from the original theme template (dated May 2025) and is not used in this site. Should be removed.

### 2.8 Deep Dev Directories

```
dev/active/design-audit-consolidation/
dev/active/hugo-styling-fixes-2025-01/
dev/archive/design-system-enhancement/
```

**Analysis**: Dev notes are 6+ levels deep. These should be flattened or moved to a docs archive.

---

## 3. Consolidation Recommendations

### 3.1 Theme Consolidation Strategy

**Principle**: Move all customizations INTO the theme, keep root minimal.

**Rationale**: Hugo's theme override system means:
1. Files in root `/layouts/` override theme files (by design)
2. This creates confusion about source of truth
3. Theme should be self-contained and portable
4. Root should only contain site-specific content and config

**Recommended Structure**:
```
alexandrabarbu.ro/
├── config/              # Site configuration (KEEP)
├── content/             # Site content (KEEP)
├── data/                # Site data (KEEP)
├── i18n/                # Translations (KEEP, clean)
├── static/              # Static assets (KEEP)
├── layouts/             # DELETE (move to theme)
├── assets/              # DELETE (move to theme)
├── archetypes/          # DELETE (move to theme)
└── themes/andromeda-hugo/  # All theme code here
```

### 3.2 Specific File Actions

#### Phase 1: Consolidate Partials (7 files)

**Move root partials to theme**:
```bash
# Atoms (1 file)
mv layouts/partials/atoms/compass-animation.html \
   themes/andromeda-hugo/layouts/partials/atoms/

# Molecules (4 files)
mv layouts/partials/molecules/feature-highlight.html \
   themes/andromeda-hugo/layouts/partials/molecules/
mv layouts/partials/molecules/info-box.html \
   themes/andromeda-hugo/layouts/partials/molecules/
mv layouts/partials/molecules/quote-block.html \
   themes/andromeda-hugo/layouts/partials/molecules/
mv layouts/partials/molecules/resource-card.html \
   themes/andromeda-hugo/layouts/partials/molecules/

# Sections (2 files)
# CRITICAL: privacy-guarantee.html - keep root version (enhanced 147 lines)
mv layouts/partials/sections/privacy-guarantee.html \
   themes/andromeda-hugo/layouts/partials/sections/privacy-guarantee.html
# (This will overwrite the basic 46-line theme version)

mv layouts/partials/sections/confidentiality-notice.html \
   themes/andromeda-hugo/layouts/partials/sections/

# Remove now-empty root layouts directory
rm -rf layouts/
```

**Verification**: Check that all references still work.

#### Phase 2: Consolidate Archetypes (8 files)

**Strategy**: Root archetypes are newer and more comprehensive. Replace theme archetypes with root versions.

```bash
# Backup theme archetypes first
mkdir -p themes/andromeda-hugo/archetypes.old
cp -r themes/andromeda-hugo/archetypes/* themes/andromeda-hugo/archetypes.old/

# Copy root archetypes to theme (keeping blog.md from theme)
cp archetypes/about-page.md themes/andromeda-hugo/archetypes/
cp archetypes/approach-page.md themes/andromeda-hugo/archetypes/
cp archetypes/contact-page.md themes/andromeda-hugo/archetypes/
cp archetypes/default.md themes/andromeda-hugo/archetypes/
cp archetypes/landing-page.md themes/andromeda-hugo/archetypes/
cp archetypes/legal-page.md themes/andromeda-hugo/archetypes/
cp archetypes/resource-page.md themes/andromeda-hugo/archetypes/
cp archetypes/service-page.md themes/andromeda-hugo/archetypes/

# Remove old theme archetypes (except blog.md which is theme-specific)
cd themes/andromeda-hugo/archetypes/
rm -f landing.md service.md therapy-page.md

# Remove root archetypes directory
cd /home/cere/Work/alex/alexandrabarbu.ro
rm -rf archetypes/
```

#### Phase 3: Clean Up SCSS Structure

**Remove redundant style.scss wrapper**:
```bash
cd themes/andromeda-hugo/assets/scss/

# style.scss is just a wrapper - remove it
rm style.scss

# Ensure main-new.scss is the only entry point
# (Already confirmed in use by essentials/style.html)

# Remove empty base directory
rmdir base/

# Move page-specific styles to components or remove
# (Review _contact.scss and _signup.scss first)
# If they duplicate section styles, delete them:
rm pages/_contact.scss pages/_signup.scss
rmdir pages/
```

**Note**: Verify that `pages/*.scss` styles aren't providing unique functionality before deletion.

#### Phase 4: Consolidate Documentation

**Strategy**: Keep one set of docs, preferably in theme for portability.

```bash
# Consolidate documentation into theme/docs/
mkdir -p themes/andromeda-hugo/docs/project-history/

# Move root docs to theme (keep most recent versions)
# Project-level docs stay in root
cp ARCHITECTURE.md themes/andromeda-hugo/ARCHITECTURE.md  # Update theme version
cp CLAUDE.md themes/andromeda-hugo/CLAUDE.md              # Update theme version
cp README.md themes/andromeda-hugo/README.md              # Update theme version

# Archive project-specific progress docs
mv design-review-2025-11-23.md themes/andromeda-hugo/docs/project-history/
mv REDESIGN-2025-PROGRESS.md themes/andromeda-hugo/docs/project-history/
mv cleanup-27-11.md themes/andromeda-hugo/docs/project-history/
mv eval1.md themes/andromeda-hugo/docs/project-history/

# Keep in root (project-specific)
# - changelog.md (project history)
# - design-system.md (site-specific design)
# - TESTING-GUIDE.md (site-specific testing)

# Create single source of truth doc index
cat > themes/andromeda-hugo/docs/README.md << 'EOF'
# Andromeda Hugo Theme Documentation

## Core Documentation
- [ARCHITECTURE.md](../ARCHITECTURE.md) - ITCSS + BEM architecture
- [CLAUDE.md](../CLAUDE.md) - Claude AI instructions
- [PROJECT.md](../PROJECT.md) - Project overview
- [README.md](../README.md) - Quick start

## Component Documentation
- [components/atoms.md](components/atoms.md) - Atomic components
- [components/molecules.md](components/molecules.md) - Molecular components

## Reference
- [DATA-CONVENTIONS.md](DATA-CONVENTIONS.md) - Data structure conventions
- [DESIGN-TOKENS-USAGE.md](../DESIGN-TOKENS-USAGE.md) - Design token guide
- [SEO-STRUCTURED-DATA.md](SEO-STRUCTURED-DATA.md) - SEO implementation

## Project History
- [project-history/](project-history/) - Historical design reviews and progress

## Archived
- See `docs/project-history/` for historical documentation
EOF
```

#### Phase 5: Clean Up Config

**Analyze and consolidate Hugo configs**:
```bash
# Check if root hugo.toml duplicates config/_default/hugo.toml
diff hugo.toml config/_default/hugo.toml

# If root hugo.toml only sets theme and baseURL, consolidate:
# Move essential settings to config/_default/hugo.toml
# Keep root hugo.toml minimal as project entry point
```

**Remove unused language**:
```bash
rm i18n/fr.yaml
```

#### Phase 6: Archive/Remove Legacy Files

```bash
# Archive old content backup (don't delete - just move outside repo)
mkdir -p ../archived-2025-11-27/
mv content-old-backup ../archived-2025-11-27/

# Move one-time scripts to archive
mkdir -p scripts/archive/
mv fix-gradients.sh scripts/archive/
mv strip-comments.sh scripts/archive/
mv strip-html-comments.sh scripts/archive/

# Keep start-dev.sh (still useful)
```

#### Phase 7: Flatten Dev Directories

```bash
# Move dev notes to single-level archive
mkdir -p themes/andromeda-hugo/docs/dev-archive/
mv dev/active/* themes/andromeda-hugo/docs/dev-archive/
mv dev/archive/* themes/andromeda-hugo/docs/dev-archive/
rm -rf dev/
```

### 3.3 Configuration Verification

After consolidation, verify these files are correct:

1. **hugo.toml** (root) - Should only contain:
   - `baseURL`
   - `theme = "andromeda-hugo"`
   - Critical site-level settings

2. **config/_default/hugo.toml** - Should contain:
   - Module configuration
   - Build settings
   - Content management settings

3. **config/_default/*.toml** - All other settings split logically

### 3.4 Testing Checklist

After each phase:
```bash
# 1. Test build
cd /home/cere/Work/alex/alexandrabarbu.ro
hugo --gc --minify

# 2. Check for errors
hugo --verbose 2>&1 | grep -i error

# 3. Test dev server
hugo server --buildDrafts

# 4. Verify both languages
# Open http://localhost:1313/ (Romanian)
# Open http://localhost:1313/en/ (English)

# 5. Check all pages load
# Test: /, /servicii/, /contact/, /despre-mine/, etc.
```

---

## 4. Target Structure

### 4.1 Proposed Final Directory Layout

```
alexandrabarbu.ro/                           # PROJECT ROOT (FLAT)
│
├── config/                                  # Configuration (KEEP)
│   └── _default/
│       ├── hugo.toml
│       ├── languages.toml
│       ├── menus.{ro,en}.toml
│       ├── params.toml
│       ├── design.toml
│       └── ... (12 files)
│
├── content/                                 # Content (KEEP)
│   ├── english/
│   │   ├── services/
│   │   └── ... (17 pages)
│   └── romanian/
│       ├── servicii/
│       ├── resurse/
│       │   └── articole/
│       └── ... (20 pages)
│
├── data/                                    # Data files (KEEP)
│   ├── shared_sections.yaml
│   ├── authors/
│   ├── components/
│   └── en/
│
├── i18n/                                    # Translations (CLEANED)
│   ├── en.yaml
│   └── ro.yaml
│
├── static/                                  # Static assets (KEEP)
│   └── images/
│       ├── about/
│       ├── hero/
│       ├── services/
│       └── testimonials/
│
├── scripts/                                 # Build scripts (KEEP)
│   └── archive/                             # Archived utilities
│
├── themes/                                  # THEME (CONSOLIDATED)
│   └── andromeda-hugo/
│       ├── archetypes/                      # ALL archetypes here (9 files)
│       │   ├── about-page.md
│       │   ├── approach-page.md
│       │   ├── blog.md
│       │   ├── contact-page.md
│       │   ├── default.md
│       │   ├── landing-page.md
│       │   ├── legal-page.md
│       │   ├── resource-page.md
│       │   └── service-page.md
│       │
│       ├── assets/                          # ALL assets here
│       │   ├── images/                      # Theme images (8.3MB)
│       │   ├── js/                          # JavaScript (12 files)
│       │   └── scss/                        # SCSS (CLEANED)
│       │       ├── main-new.scss            # SINGLE entry point
│       │       ├── 01-settings/             # Design tokens (8 files)
│       │       ├── 02-tools/                # Mixins (4 files)
│       │       ├── 03-generic/              # Resets
│       │       ├── 04-elements/             # Base elements
│       │       ├── 05-objects/              # Layout objects
│       │       ├── 06-components/           # BEM components (90 files)
│       │       └── 07-utilities/            # Utilities
│       │
│       ├── layouts/                         # ALL layouts here
│       │   ├── _default/
│       │   │   ├── baseof.html
│       │   │   ├── flexible.html            # Layout engine
│       │   │   ├── list.html
│       │   │   └── single.html
│       │   ├── partials/
│       │   │   ├── atoms/                   # 11 files (added compass-animation)
│       │   │   ├── molecules/               # 25 files (added 4 content molecules)
│       │   │   ├── organisms/               # 2 files
│       │   │   ├── sections/                # 38 files (added 2, updated 1)
│       │   │   ├── meta/                    # 2 files
│       │   │   ├── seo/                     # SEO components
│       │   │   ├── essentials/              # 5 files
│       │   │   └── components/              # 1 file
│       │   └── shortcodes/                  # 15 files
│       │
│       ├── docs/                            # Theme documentation (ORGANIZED)
│       │   ├── README.md                    # Documentation index
│       │   ├── components/
│       │   │   ├── atoms.md
│       │   │   └── molecules.md
│       │   ├── DATA-CONVENTIONS.md
│       │   ├── QUICK-START-ITCSS.md
│       │   ├── SEO-STRUCTURED-DATA.md
│       │   ├── project-history/             # Archived progress docs
│       │   │   ├── design-review-2025-11-23.md
│       │   │   ├── REDESIGN-2025-PROGRESS.md
│       │   │   ├── cleanup-27-11.md
│       │   │   └── eval1.md
│       │   └── dev-archive/                 # Archived dev notes
│       │       ├── design-audit-consolidation/
│       │       └── hugo-styling-fixes-2025-01/
│       │
│       ├── static/                          # Theme static files
│       │   ├── admin/                       # CMS admin
│       │   ├── games/                       # ADHD games
│       │   └── js/                          # Static JS
│       │
│       ├── ARCHITECTURE.md                  # Theme architecture (MASTER)
│       ├── CLAUDE.md                        # Claude instructions (MASTER)
│       ├── PROJECT.md                       # Project overview
│       ├── README.md                        # Quick start
│       ├── COMPONENT-AUDIT-REPORT.md
│       ├── COMPONENT-FLOW-EXAMPLE.md
│       ├── COMPONENT-INVENTORY.md
│       ├── DESIGN-TOKENS-USAGE.md
│       ├── CLAUDE-ITCSS-ADDENDUM.md
│       ├── ICON-CONSISTENCY-FIX.md
│       ├── LAYOUT_MIXING_GUIDE.md
│       ├── PAGES-COMPONENTS.md
│       ├── THEME-CUSTOMIZATION.md
│       ├── cc-design.md
│       └── package.json
│
├── hugo.toml                                # Minimal root config
├── changelog.md                             # Project changelog (KEEP)
├── design-system.md                         # Site design system (KEEP)
├── TESTING-GUIDE.md                         # Site testing guide (KEEP)
├── start-dev.sh                             # Dev helper (KEEP)
└── README.md                                # Project README (KEEP)
```

### 4.2 Maximum Depth Limits

**After consolidation**:
- **Root directories**: 2-3 levels max
  - `config/_default/` = 2 levels
  - `content/romanian/resurse/articole/` = 4 levels (acceptable for content)
  - `data/` = 2-3 levels

- **Theme directories**: 3-4 levels max
  - `themes/andromeda-hugo/assets/scss/06-components/` = 5 levels (acceptable for ITCSS)
  - `themes/andromeda-hugo/layouts/partials/sections/` = 5 levels (acceptable)
  - `themes/andromeda-hugo/docs/project-history/` = 4 levels (archives)

**Reduction**: From 13 levels to 5 levels maximum (deep dev dirs eliminated).

### 4.3 File Count Reduction

**Before**:
- Root layouts: 7 files
- Root assets: 2 files
- Root archetypes: 8 files
- Root docs: 8 files
- Theme: 29MB, 108 partials, 131 SCSS files

**After**:
- Root layouts: 0 files (REMOVED)
- Root assets: 0 files (REMOVED)
- Root archetypes: 0 files (REMOVED)
- Root docs: 4 files (essential project docs only)
- Theme: ~29MB, 115 partials (+7), 129 SCSS files (-2)

**Net reduction**: 17 root files eliminated, better organization.

---

## 5. Migration Commands

### 5.1 Full Consolidation Script

```bash
#!/bin/bash
# Hugo Theme Consolidation Script
# Date: 2025-11-27
# Run from: /home/cere/Work/alex/alexandrabarbu.ro

set -e  # Exit on error

PROJECT_ROOT="/home/cere/Work/alex/alexandrabarbu.ro"
THEME_DIR="$PROJECT_ROOT/themes/andromeda-hugo"
BACKUP_DIR="$PROJECT_ROOT/../alexandrabarbu-backup-$(date +%Y%m%d-%H%M%S)"

echo "=== Hugo Theme Consolidation ==="
echo "Project: $PROJECT_ROOT"
echo "Theme: $THEME_DIR"
echo ""

# Safety check
read -p "This will modify your theme structure. Continue? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

# Create backup
echo "Creating backup at $BACKUP_DIR..."
mkdir -p "$BACKUP_DIR"
cp -r "$PROJECT_ROOT" "$BACKUP_DIR/"
echo "✓ Backup created"

cd "$PROJECT_ROOT"

# Phase 1: Consolidate Partials
echo ""
echo "=== Phase 1: Consolidating Partials ==="

# Atoms
echo "Moving atoms..."
if [ -f "layouts/partials/atoms/compass-animation.html" ]; then
    mv layouts/partials/atoms/compass-animation.html \
       "$THEME_DIR/layouts/partials/atoms/"
    echo "✓ Moved compass-animation.html"
fi

# Molecules
echo "Moving molecules..."
for file in feature-highlight.html info-box.html quote-block.html resource-card.html; do
    if [ -f "layouts/partials/molecules/$file" ]; then
        mv "layouts/partials/molecules/$file" \
           "$THEME_DIR/layouts/partials/molecules/"
        echo "✓ Moved $file"
    fi
done

# Sections
echo "Moving sections..."
if [ -f "layouts/partials/sections/privacy-guarantee.html" ]; then
    # This overwrites the theme version (intentional - root is enhanced)
    mv layouts/partials/sections/privacy-guarantee.html \
       "$THEME_DIR/layouts/partials/sections/"
    echo "✓ Moved privacy-guarantee.html (overwrote theme version)"
fi

if [ -f "layouts/partials/sections/confidentiality-notice.html" ]; then
    mv layouts/partials/sections/confidentiality-notice.html \
       "$THEME_DIR/layouts/partials/sections/"
    echo "✓ Moved confidentiality-notice.html"
fi

# Remove empty root layouts directory
if [ -d "layouts" ]; then
    find layouts -type d -empty -delete
    if [ -z "$(ls -A layouts)" ]; then
        rmdir layouts
        echo "✓ Removed empty layouts directory"
    fi
fi

# Phase 2: Consolidate Archetypes
echo ""
echo "=== Phase 2: Consolidating Archetypes ==="

# Backup theme archetypes
if [ -d "$THEME_DIR/archetypes" ]; then
    mkdir -p "$THEME_DIR/archetypes.old"
    cp -r "$THEME_DIR/archetypes/"* "$THEME_DIR/archetypes.old/" 2>/dev/null || true
    echo "✓ Backed up theme archetypes"
fi

# Copy root archetypes to theme
if [ -d "archetypes" ]; then
    cp archetypes/*.md "$THEME_DIR/archetypes/" 2>/dev/null || true
    echo "✓ Copied root archetypes to theme"

    # Remove old theme archetypes (keep blog.md)
    cd "$THEME_DIR/archetypes"
    rm -f landing.md service.md therapy-page.md
    cd "$PROJECT_ROOT"

    # Remove root archetypes directory
    rm -rf archetypes/
    echo "✓ Removed root archetypes directory"
fi

# Phase 3: Clean Up SCSS
echo ""
echo "=== Phase 3: Cleaning Up SCSS ==="

cd "$THEME_DIR/assets/scss"

# Remove style.scss wrapper (only if it just imports main-new.scss)
if [ -f "style.scss" ]; then
    if grep -q "^@import 'main-new'" style.scss; then
        rm style.scss
        echo "✓ Removed redundant style.scss wrapper"
    fi
fi

# Remove empty base directory
if [ -d "base" ] && [ -z "$(ls -A base)" ]; then
    rmdir base
    echo "✓ Removed empty base directory"
fi

# Review pages directory (manual decision needed)
if [ -d "pages" ]; then
    echo "⚠ pages/ directory still exists - review _contact.scss and _signup.scss manually"
fi

cd "$PROJECT_ROOT"

# Phase 4: Consolidate Documentation
echo ""
echo "=== Phase 4: Consolidating Documentation ==="

# Create docs structure
mkdir -p "$THEME_DIR/docs/project-history"

# Copy/update core docs to theme
for doc in ARCHITECTURE.md CLAUDE.md README.md; do
    if [ -f "$doc" ]; then
        cp "$doc" "$THEME_DIR/$doc"
        echo "✓ Updated $doc in theme"
    fi
done

# Move historical docs
for doc in design-review-2025-11-23.md REDESIGN-2025-PROGRESS.md cleanup-27-11.md eval1.md; do
    if [ -f "$doc" ]; then
        mv "$doc" "$THEME_DIR/docs/project-history/"
        echo "✓ Archived $doc"
    fi
done

# Create docs index
cat > "$THEME_DIR/docs/README.md" << 'EOF'
# Andromeda Hugo Theme Documentation

## Core Documentation
- [ARCHITECTURE.md](../ARCHITECTURE.md) - ITCSS + BEM architecture
- [CLAUDE.md](../CLAUDE.md) - Claude AI instructions
- [PROJECT.md](../PROJECT.md) - Project overview
- [README.md](../README.md) - Quick start

## Component Documentation
- [components/atoms.md](components/atoms.md) - Atomic components
- [components/molecules.md](components/molecules.md) - Molecular components

## Reference
- [DATA-CONVENTIONS.md](DATA-CONVENTIONS.md) - Data structure conventions
- [DESIGN-TOKENS-USAGE.md](../DESIGN-TOKENS-USAGE.md) - Design token guide
- [SEO-STRUCTURED-DATA.md](SEO-STRUCTURED-DATA.md) - SEO implementation

## Project History
- [project-history/](project-history/) - Historical design reviews and progress
EOF
echo "✓ Created docs/README.md index"

# Phase 5: Clean Config
echo ""
echo "=== Phase 5: Cleaning Config ==="

# Remove unused French language
if [ -f "i18n/fr.yaml" ]; then
    rm i18n/fr.yaml
    echo "✓ Removed unused fr.yaml"
fi

# Phase 6: Archive Legacy Files
echo ""
echo "=== Phase 6: Archiving Legacy Files ==="

# Archive old content backup (move outside repo)
if [ -d "content-old-backup" ]; then
    mkdir -p ../archived-2025-11-27
    mv content-old-backup ../archived-2025-11-27/
    echo "✓ Archived content-old-backup"
fi

# Archive one-time scripts
mkdir -p scripts/archive
for script in fix-gradients.sh strip-comments.sh strip-html-comments.sh; do
    if [ -f "$script" ]; then
        mv "$script" scripts/archive/
        echo "✓ Archived $script"
    fi
done

# Phase 7: Flatten Dev Directories
echo ""
echo "=== Phase 7: Flattening Dev Directories ==="

if [ -d "dev" ]; then
    mkdir -p "$THEME_DIR/docs/dev-archive"

    # Move dev/active
    if [ -d "dev/active" ]; then
        mv dev/active/* "$THEME_DIR/docs/dev-archive/" 2>/dev/null || true
    fi

    # Move dev/archive
    if [ -d "dev/archive" ]; then
        mv dev/archive/* "$THEME_DIR/docs/dev-archive/" 2>/dev/null || true
    fi

    # Remove dev directory
    rm -rf dev/
    echo "✓ Flattened dev directories"
fi

# Final cleanup
echo ""
echo "=== Final Cleanup ==="

# Remove empty directories
find "$PROJECT_ROOT" -type d -empty -delete 2>/dev/null || true
echo "✓ Removed empty directories"

echo ""
echo "=== Consolidation Complete ==="
echo ""
echo "Next steps:"
echo "1. Test build: hugo --gc --minify"
echo "2. Test dev server: hugo server --buildDrafts"
echo "3. Verify both languages work"
echo "4. Review theme docs at themes/andromeda-hugo/docs/"
echo ""
echo "Backup location: $BACKUP_DIR"
```

### 5.2 Individual Phase Commands

If you prefer to run phases individually:

**Phase 1: Consolidate Partials**
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro

# Atoms
mv layouts/partials/atoms/compass-animation.html \
   themes/andromeda-hugo/layouts/partials/atoms/

# Molecules
mv layouts/partials/molecules/feature-highlight.html \
   themes/andromeda-hugo/layouts/partials/molecules/
mv layouts/partials/molecules/info-box.html \
   themes/andromeda-hugo/layouts/partials/molecules/
mv layouts/partials/molecules/quote-block.html \
   themes/andromeda-hugo/layouts/partials/molecules/
mv layouts/partials/molecules/resource-card.html \
   themes/andromeda-hugo/layouts/partials/molecules/

# Sections
mv layouts/partials/sections/privacy-guarantee.html \
   themes/andromeda-hugo/layouts/partials/sections/
mv layouts/partials/sections/confidentiality-notice.html \
   themes/andromeda-hugo/layouts/partials/sections/

# Remove empty directories
find layouts -type d -empty -delete
rmdir layouts
```

**Phase 2: Consolidate Archetypes**
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro

# Backup theme archetypes
mkdir -p themes/andromeda-hugo/archetypes.old
cp -r themes/andromeda-hugo/archetypes/* themes/andromeda-hugo/archetypes.old/

# Copy root archetypes to theme
cp archetypes/*.md themes/andromeda-hugo/archetypes/

# Clean up old theme archetypes
cd themes/andromeda-hugo/archetypes
rm -f landing.md service.md therapy-page.md

# Remove root archetypes
cd /home/cere/Work/alex/alexandrabarbu.ro
rm -rf archetypes/
```

**Phase 3: Clean SCSS**
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo/assets/scss

# Remove wrapper
rm style.scss

# Remove empty directory
rmdir base

# Review pages directory manually before removing
ls -la pages/
# If _contact.scss and _signup.scss are redundant:
# rm pages/_contact.scss pages/_signup.scss
# rmdir pages/
```

**Phase 4: Consolidate Docs**
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro

# Create structure
mkdir -p themes/andromeda-hugo/docs/project-history

# Update theme docs
cp ARCHITECTURE.md themes/andromeda-hugo/
cp CLAUDE.md themes/andromeda-hugo/
cp README.md themes/andromeda-hugo/

# Archive historical docs
mv design-review-2025-11-23.md themes/andromeda-hugo/docs/project-history/
mv REDESIGN-2025-PROGRESS.md themes/andromeda-hugo/docs/project-history/
mv cleanup-27-11.md themes/andromeda-hugo/docs/project-history/
mv eval1.md themes/andromeda-hugo/docs/project-history/
```

**Phase 5: Clean Config**
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro

# Remove unused language
rm i18n/fr.yaml
```

**Phase 6: Archive Legacy**
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro

# Archive old content
mkdir -p ../archived-2025-11-27
mv content-old-backup ../archived-2025-11-27/

# Archive scripts
mkdir -p scripts/archive
mv fix-gradients.sh scripts/archive/
mv strip-comments.sh scripts/archive/
mv strip-html-comments.sh scripts/archive/
```

**Phase 7: Flatten Dev**
```bash
cd /home/cere/Work/alex/alexandrabarbu.ro

# Create archive
mkdir -p themes/andromeda-hugo/docs/dev-archive

# Move dev notes
mv dev/active/* themes/andromeda-hugo/docs/dev-archive/
mv dev/archive/* themes/andromeda-hugo/docs/dev-archive/

# Remove dev directory
rm -rf dev/
```

### 5.3 Verification Commands

After each phase:

```bash
# 1. Check Hugo build
cd /home/cere/Work/alex/alexandrabarbu.ro
hugo --gc --minify

# 2. Check for missing partials
hugo --verbose 2>&1 | grep -i "partial.*not found"

# 3. Check for missing files
hugo --verbose 2>&1 | grep -i "error"

# 4. Test dev server
hugo server --buildDrafts

# 5. List remaining root files (should be minimal)
ls -la /home/cere/Work/alex/alexandrabarbu.ro/ | grep "^-"

# 6. Check theme partial count (should be 115)
find themes/andromeda-hugo/layouts/partials -name "*.html" | wc -l

# 7. Verify no duplicate files remain
find . -name "privacy-guarantee.html" ! -path "*/node_modules/*" ! -path "*/.git/*"
# Should only show theme version

# 8. Check directory depth (should be ≤5)
find . -type d ! -path "*/.git/*" ! -path "*/node_modules/*" ! -path "*/public/*" -printf '%d\n' | sort -n | tail -1
```

---

## 6. Risk Assessment & Rollback

### 6.1 Risk Level: MEDIUM

**Risks**:
1. Breaking partial references if files are moved incorrectly
2. Hugo build failures if archetypes are misconfigured
3. Lost customizations if wrong versions are kept
4. CSS regressions if SCSS entry points are broken

**Mitigations**:
1. Full backup before starting (see script)
2. Phase-by-phase execution with testing
3. Git commit after each successful phase
4. Keep backup for 30 days

### 6.2 Rollback Plan

**If consolidation fails**:

```bash
# Option 1: Git revert (if changes committed)
cd /home/cere/Work/alex/alexandrabarbu.ro
git log --oneline -10  # Find commit before consolidation
git reset --hard <commit-hash>

# Option 2: Restore from backup
BACKUP_DIR="../alexandrabarbu-backup-YYYYMMDD-HHMMSS"
cd /home/cere/Work/alex/alexandrabarbu.ro
rm -rf *  # DANGEROUS - make sure you're in right directory
cp -r "$BACKUP_DIR/alexandrabarbu.ro/"* .

# Option 3: Selective file restore
# If only one phase failed, restore specific files from backup:
cp "$BACKUP_DIR/alexandrabarbu.ro/layouts/partials/sections/privacy-guarantee.html" \
   layouts/partials/sections/
```

### 6.3 Testing Matrix

After consolidation, test these scenarios:

| Test | RO | EN | Notes |
|------|----|----|-------|
| Home page | ✓ | ✓ | Check hero, values-compass, stats |
| Services page | ✓ | ✓ | Check feature-blocks, pricing |
| Individual service | ✓ | ✓ | Check hero-breadcrumb, cta |
| Contact page | ✓ | ✓ | Check contact-form, privacy-guarantee |
| About page | ✓ | ✓ | Check credentials, testimonials |
| Resources page | ✓ | - | Check resource-card, feature-highlight |
| Responsive (375px) | ✓ | ✓ | Mobile view |
| Responsive (768px) | ✓ | ✓ | Tablet view |
| Responsive (1200px) | ✓ | ✓ | Desktop view |
| Build time | - | - | Should be <3s |
| Page size | - | - | Should be <520KB |

---

## 7. Benefits & Impact

### 7.1 Maintenance Benefits

**Before**:
- 7 root partials + 108 theme partials = confusion about source of truth
- Duplicate `privacy-guarantee.html` with different content
- 8 root archetypes + 7 theme archetypes = 15 files, 3 duplicates
- 21 documentation files across root and theme
- 2 SCSS entry points (style.scss wrapper + main-new.scss)
- Maximum 13 directory levels (in dev/)

**After**:
- 0 root partials + 115 theme partials = single source of truth
- Single `privacy-guarantee.html` (enhanced version in theme)
- 0 root archetypes + 9 theme archetypes = 9 files, no duplicates
- ~17 core docs + archived history in theme/docs/
- 1 SCSS entry point (main-new.scss only)
- Maximum 5 directory levels

### 7.2 Performance Impact

**Build Time**: No change expected (same files, just reorganized)

**Development Experience**:
- Faster file finding (clear structure)
- No confusion about which file is active
- Easier theme updates/versioning

### 7.3 Portability Benefits

**Before**:
- Theme depends on root overrides (7 files)
- Can't use theme in another project without copying overrides

**After**:
- Theme is self-contained and portable
- Can deploy theme as standalone package
- Root only contains site-specific content and config

### 7.4 Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Root layout files | 7 | 0 | -7 files |
| Root archetypes | 8 | 0 | -8 files |
| Root assets | 2 | 0 | -2 files |
| Documentation files | 21 | 17 + archive | Organized |
| SCSS entry points | 2 | 1 | -1 file |
| Max directory depth | 13 | 5 | -8 levels |
| Duplicate sections | 1 | 0 | -1 file |
| Source of truth confusion | High | None | Clear |
| Theme portability | Poor | Good | Portable |

---

## 8. Post-Consolidation Maintenance

### 8.1 New Development Guidelines

**Rule 1: Theme-First Development**
- All new components go in `themes/andromeda-hugo/layouts/partials/`
- Never create files in root `layouts/` directory

**Rule 2: Archetype Management**
- All archetypes live in `themes/andromeda-hugo/archetypes/`
- Update theme archetypes, not root

**Rule 3: Documentation**
- Core theme docs: `themes/andromeda-hugo/*.md`
- Component docs: `themes/andromeda-hugo/docs/components/`
- Project-specific docs: root (changelog.md, design-system.md)
- Historical docs: `themes/andromeda-hugo/docs/project-history/`

**Rule 4: SCSS Changes**
- Edit `themes/andromeda-hugo/assets/scss/main-new.scss` as entry point
- Add new components to `06-components/`
- Use ITCSS layers correctly (see ARCHITECTURE.md)

**Rule 5: Testing**
- Test both languages after any layout change
- Verify responsive breakpoints
- Check build time stays <3s

### 8.2 Future Refactoring Opportunities

**Not included in this consolidation** (future work):

1. **Static vs Theme Assets**:
   - Consider moving `static/images/` to `themes/andromeda-hugo/assets/images/`
   - Benefit: Theme includes all assets
   - Risk: Larger theme, slower Hugo image processing

2. **Data Consolidation**:
   - Review `data/shared_sections.yaml` vs theme defaults
   - Possibly move shared data to theme
   - Benefit: More portable theme
   - Risk: Less flexibility per site

3. **Component Audit**:
   - Review all 115 partials for usage
   - Identify truly unused components
   - Benefit: Leaner theme
   - Effort: Requires grep across all content

4. **SCSS Component Reduction**:
   - 90+ component SCSS files is many
   - Consider merging small related components
   - Benefit: Fewer files
   - Risk: Less modularity

### 8.3 Version Control Strategy

**After consolidation, commit structure**:

```bash
# Commit 1: Phase 1-2 (layouts + archetypes)
git add themes/andromeda-hugo/layouts/partials/
git add themes/andromeda-hugo/archetypes/
git rm -r layouts/ archetypes/
git commit -m "refactor: consolidate layouts and archetypes into theme

- Move 7 root partials to theme (atoms, molecules, sections)
- Consolidate archetypes: use newer root versions in theme
- Remove duplicate privacy-guarantee.html (keep enhanced version)
- Theme now self-contained for all layouts"

# Commit 2: Phase 3-4 (SCSS + docs)
git add themes/andromeda-hugo/assets/scss/
git add themes/andromeda-hugo/docs/
git rm design-review-2025-11-23.md REDESIGN-2025-PROGRESS.md
git commit -m "refactor: clean up SCSS and consolidate documentation

- Remove style.scss wrapper (use main-new.scss directly)
- Remove empty base/ directory
- Archive historical docs to theme/docs/project-history/
- Create docs/README.md index"

# Commit 3: Phase 5-7 (cleanup)
git add config/ i18n/ scripts/
git rm -r dev/ content-old-backup/
git commit -m "chore: archive legacy files and flatten dev directories

- Remove unused fr.yaml translation
- Archive one-time utility scripts
- Move dev notes to theme/docs/dev-archive/
- Archive content-old-backup outside repo"

# Commit 4: Update this report
git add final-consolidation-27-11.md
git commit -m "docs: add comprehensive theme consolidation report"
```

---

## 9. Conclusion

This consolidation addresses years of incremental development that resulted in split architecture between root and theme. The primary issues—duplicate files, unclear source of truth, excessive depth—stem from Hugo's override mechanism being used for customization rather than theme-internal organization.

**Key Achievements**:
1. Eliminate 17 root files (layouts, assets, archetypes)
2. Consolidate duplicate `privacy-guarantee.html` (enhanced version wins)
3. Flatten directory structure from 13 to 5 levels max
4. Organize 21 documentation files into clear hierarchy
5. Create single SCSS entry point (remove wrapper)
6. Make theme fully portable and self-contained

**Next Steps**:
1. Review and approve this consolidation plan
2. Create full backup
3. Execute phases 1-7 (use provided script or manual commands)
4. Test thoroughly (both languages, responsive, build time)
5. Commit changes with clear messages
6. Update team documentation with new guidelines

**Timeline Estimate**:
- Backup: 5 minutes
- Execution: 30 minutes (scripted) or 60 minutes (manual)
- Testing: 30 minutes
- Documentation: 15 minutes
- **Total**: 1.5-2 hours

**Risk**: Medium (with rollback plan and backup)
**Benefit**: High (long-term maintainability and clarity)
**Recommendation**: Execute during low-traffic period, with rollback plan ready.

---

## Appendix A: File Inventory

### A.1 Root Files (Before Consolidation)

**Layouts** (7 files):
```
layouts/partials/atoms/compass-animation.html
layouts/partials/molecules/feature-highlight.html
layouts/partials/molecules/info-box.html
layouts/partials/molecules/quote-block.html
layouts/partials/molecules/resource-card.html
layouts/partials/sections/privacy-guarantee.html        # 147 lines (ENHANCED)
layouts/partials/sections/confidentiality-notice.html
```

**Assets** (2 files):
```
assets/js/navigation-scroll.js
assets/js/contact-form-handler.js
```

**Archetypes** (8 files):
```
archetypes/about-page.md
archetypes/approach-page.md
archetypes/contact-page.md
archetypes/default.md
archetypes/landing-page.md
archetypes/legal-page.md
archetypes/resource-page.md
archetypes/service-page.md
```

**Documentation** (8 files):
```
ARCHITECTURE.md (12.9KB)
CLAUDE.md (7.5KB)
changelog.md (10.5KB)
cleanup-27-11.md (7.4KB)
design-review-2025-11-23.md (35KB)
design-system.md (4.4KB)
eval1.md (66.8KB)
REDESIGN-2025-PROGRESS.md (9.8KB)
TESTING-GUIDE.md (13.8KB)
```

**Scripts** (4 files):
```
fix-gradients.sh
strip-comments.sh
strip-html-comments.sh
start-dev.sh
```

### A.2 Theme Files (Summary)

**Partials** (108 files):
- Atoms: 10
- Molecules: 21
- Organisms: 2
- Sections: 37
- Essentials: 5
- Components: 1
- Meta: 2
- SEO: 4+
- Other: 26+

**SCSS** (131 files):
- Settings: 8
- Tools: 4
- Generic: 2
- Elements: 4
- Objects: 6
- Components: 90
- Utilities: 4
- Entry: 3 (main-new.scss, style.scss, _config-bridge.scss)
- Pages: 2

**JavaScript** (12 files):
```
back-to-top.js
blog-grid-filter.js
cookie-consent.js
emergency-banner.js
language-selector.js
magnetic-buttons.js
scroll-animations.js
stagger-reveal.js
stats-counter.js
values-compass-interactions.js
vanilla-collapse.js
vanilla-dropdown.js
```

**Archetypes** (7 files):
```
blog.md
default.md
landing.md
landing-page.md
service.md
service-page.md
therapy-page.md
```

**Images** (72 files, 8.3MB)

**Documentation** (13 files)

---

## Appendix B: Hugo Override Mechanism

### How Hugo Resolves Files

Hugo uses a "layered" file system where root files **override** theme files:

```
Resolution order:
1. /layouts/partials/sections/hero.html         (ROOT - highest priority)
2. /themes/andromeda-hugo/layouts/partials/sections/hero.html  (THEME)
```

**Current Problem**:
- `privacy-guarantee.html` exists in BOTH locations
- Root version (147 lines) overrides theme version (46 lines)
- Theme version becomes dead code
- Developers don't know which version is active

**After Consolidation**:
- Only theme version exists (enhanced 147-line version moved to theme)
- Single source of truth
- Clear file location for all components

### Why Root Overrides Were Created

**Typical scenario**:
1. Theme provides basic `privacy-guarantee.html` (46 lines)
2. Developer needs enhanced version (147 lines)
3. Instead of editing theme file, creates root override
4. Over time, root overrides accumulate
5. Confusion: which version is canonical?

**Better approach** (post-consolidation):
1. Edit theme file directly
2. Keep theme as authoritative source
3. Use git for version control
4. Root stays clean (only content + config)

---

## Appendix C: Testing Scenarios

### C.1 Critical Paths to Test

**Romanian (Root Path)**:
```
/ → Home
/servicii/ → Services list
/servicii/terapie-individuala/ → Individual therapy
/servicii/terapie-de-cuplu/ → Couples therapy
/servicii/terapie-de-familie/ → Family therapy
/servicii/psihologie-organizationala/ → Organizational psychology
/despre-mine/ → About
/abordare/ → Approach
/contact/ → Contact (privacy-guarantee, confidentiality-notice)
/pricing/ → Pricing
/resurse/ → Resources (resource-card, feature-highlight)
/resurse/articole/ → Articles
/intrebari/ → FAQ
```

**English (/en/ Path)**:
```
/en/ → Home
/en/services/ → Services list
/en/services/individual-therapy/
/en/services/couples-therapy/
/en/services/family-therapy/
/en/services/organizational-psychology/
/en/about/
/en/approach/
/en/contact/
/en/pricing/
/en/resources/
/en/faq/
```

### C.2 Component-Specific Tests

**After moving root partials to theme**:

1. **compass-animation.html** (atom):
   - Used in: Values compass section
   - Test: Home page values-compass section animation works

2. **feature-highlight.html** (molecule):
   - Used in: Resource pages
   - Test: `/resurse/` page highlights render correctly

3. **info-box.html** (molecule):
   - Used in: Content pages
   - Test: Check info boxes in articles

4. **quote-block.html** (molecule):
   - Used in: Blog/article content
   - Test: Check blockquotes in `/resurse/articole/`

5. **resource-card.html** (molecule):
   - Used in: Resources page
   - Test: `/resurse/` displays resource cards

6. **privacy-guarantee.html** (section):
   - Used in: Contact page
   - Test: `/contact/` shows privacy guarantee (enhanced 147-line version)

7. **confidentiality-notice.html** (section):
   - Used in: Contact page
   - Test: `/contact/` shows confidentiality notice

### C.3 Responsive Breakpoints

Test each critical path at:
- **375px**: iPhone SE (mobile)
- **768px**: iPad (tablet)
- **1200px**: Desktop
- **1920px**: Large desktop

**Check**:
- Navigation collapses correctly
- Values compass adapts (mobile tap, desktop hover)
- Feature blocks stack on mobile
- Pricing tables scroll/stack
- Forms are usable
- Images load with correct srcset

### C.4 Performance Tests

```bash
# Build time
time hugo --gc --minify
# Should be <3s

# Page size (largest page)
hugo --gc --minify
ls -lh public/index.html
ls -lh public/servicii/index.html
# Should be <520KB

# Image optimization
find public/images -name "*.webp" | wc -l
# Should have WebP versions

# CSS size
ls -lh public/css/*
# Should be minified

# JS size
ls -lh public/js/*
# Should be minified
```

---

## Appendix D: Decision Log

### D.1 Key Decisions Made

**Decision 1: Theme-First Architecture**
- **Rationale**: Hugo's override mechanism creates split architecture. Moving all components to theme creates single source of truth.
- **Trade-off**: Lose Hugo's built-in override system, but gain clarity.

**Decision 2: Keep Enhanced privacy-guarantee.html**
- **Rationale**: Root version (147 lines) is enhanced with more features than theme version (46 lines).
- **Action**: Move enhanced version to theme, overwrite basic version.

**Decision 3: Root Archetypes Win**
- **Rationale**: Root archetypes are newer (Nov 20, 2025) and more comprehensive than theme archetypes (Nov 17, 2025 / May 2025).
- **Action**: Copy root archetypes to theme, remove old theme versions.

**Decision 4: Remove style.scss Wrapper**
- **Rationale**: `style.scss` just imports `main-new.scss`. No value in wrapper.
- **Action**: Remove wrapper, use `main-new.scss` as sole entry point.

**Decision 5: Archive Dev Directories, Not Delete**
- **Rationale**: Dev notes have historical value but create excessive depth (13 levels).
- **Action**: Move to `theme/docs/dev-archive/` for reference, remove from root.

**Decision 6: Keep Project Docs in Root**
- **Rationale**: Some docs are project-specific (changelog, testing guide), not theme-specific.
- **Action**: Keep 4 essential docs in root, move rest to theme.

**Decision 7: Archive, Don't Delete, content-old-backup**
- **Rationale**: Backup content might be needed for reference.
- **Action**: Move outside repo (to `../archived-2025-11-27/`), not inside.

### D.2 Deferred Decisions

**Deferred 1: Static Images to Theme Assets**
- **Reason**: Requires testing Hugo image processing performance.
- **Timeline**: Future refactoring (3-6 months).

**Deferred 2: SCSS Component Merging**
- **Reason**: 90+ component files is manageable, merging adds risk without clear benefit.
- **Timeline**: Only if build performance degrades.

**Deferred 3: Data Structure Consolidation**
- **Reason**: `data/shared_sections.yaml` is site-specific, not clear it should move to theme.
- **Timeline**: Review after this consolidation is stable (1-2 months).

**Deferred 4: Unused Component Audit**
- **Reason**: Requires grep across all content files, time-consuming.
- **Timeline**: Separate audit task (low priority).

---

## Appendix E: Command Quick Reference

### Pre-Consolidation

```bash
# Create backup
BACKUP_DIR="../alexandrabarbu-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r . "$BACKUP_DIR/"

# Verify current state
hugo version
hugo --verbose
```

### During Consolidation

```bash
# Phase 1: Move partials
mv layouts/partials/atoms/compass-animation.html themes/andromeda-hugo/layouts/partials/atoms/
mv layouts/partials/molecules/*.html themes/andromeda-hugo/layouts/partials/molecules/
mv layouts/partials/sections/*.html themes/andromeda-hugo/layouts/partials/sections/
rmdir layouts

# Phase 2: Move archetypes
cp archetypes/*.md themes/andromeda-hugo/archetypes/
rm -rf archetypes/

# Phase 3: Clean SCSS
cd themes/andromeda-hugo/assets/scss
rm style.scss
rmdir base

# Phase 4: Organize docs
mkdir -p themes/andromeda-hugo/docs/project-history
mv design-review-2025-11-23.md themes/andromeda-hugo/docs/project-history/
mv REDESIGN-2025-PROGRESS.md themes/andromeda-hugo/docs/project-history/

# Phase 5: Clean config
rm i18n/fr.yaml

# Phase 6: Archive legacy
mkdir -p ../archived-2025-11-27
mv content-old-backup ../archived-2025-11-27/
mkdir -p scripts/archive
mv fix-gradients.sh scripts/archive/

# Phase 7: Flatten dev
mkdir -p themes/andromeda-hugo/docs/dev-archive
mv dev/* themes/andromeda-hugo/docs/dev-archive/
rm -rf dev/
```

### Post-Consolidation

```bash
# Test build
hugo --gc --minify

# Test dev server
hugo server --buildDrafts

# Check for errors
hugo --verbose 2>&1 | grep -i error

# Verify file counts
find layouts -name "*.html" 2>/dev/null | wc -l  # Should be 0
find themes/andromeda-hugo/layouts/partials -name "*.html" | wc -l  # Should be 115
find archetypes -name "*.md" 2>/dev/null | wc -l  # Should be 0
find themes/andromeda-hugo/archetypes -name "*.md" | wc -l  # Should be 9

# Commit changes
git add .
git status
git commit -m "refactor: consolidate theme structure"
```

---

**Report End**

**Generated**: 2025-11-27
**Author**: Claude Code (Sonnet 4.5)
**Project**: alexandrabarbu.ro Hugo Theme Consolidation
**Version**: 1.0
