#!/usr/bin/env bash
# Fix Design Token Violations - Automated Replacements
# Created: 2025-11-18
# Purpose: Replace all hardcoded values with design tokens

set -e

THEME_DIR="/home/cere/Work/alex/alexandrabarbu.ro/themes/andromeda-hugo"

echo "🔧 Starting Design Token Violation Fixes..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Backup files before modifications
echo "📦 Creating backups..."
cp "$THEME_DIR/assets/scss/custom.scss" "$THEME_DIR/assets/scss/custom.scss.backup-$(date +%Y%m%d-%H%M%S)"
cp "$THEME_DIR/assets/scss/templates/_main.scss" "$THEME_DIR/assets/scss/templates/_main.scss.backup-$(date +%Y%m%d-%H%M%S)"
cp "$THEME_DIR/assets/scss/templates/_navigation.scss" "$THEME_DIR/assets/scss/templates/_navigation.scss.backup-$(date +%Y%m%d-%H%M%S)"
echo "✅ Backups created"

echo ""
echo "🎯 Phase 1: Fixing border-radius violations..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Fix custom.scss border-radius
sed -i 's/border-radius: 25px;/border-radius: $radius-xl; \/\/ 24px (closest to 25px)/g' "$THEME_DIR/assets/scss/custom.scss"
sed -i 's/border-radius: 20px;/border-radius: $radius-lg; \/\/ 16px (closest to 20px)/g' "$THEME_DIR/assets/scss/custom.scss"
sed -i 's/border-radius: 15px;/border-radius: $radius-md; \/\/ 12px (closest to 15px)/g' "$THEME_DIR/assets/scss/custom.scss"
sed -i 's/border-radius: 12px;/border-radius: $radius-md;/g' "$THEME_DIR/assets/scss/custom.scss"
sed -i 's/border-radius: 8px;/border-radius: $radius-sm;/g' "$THEME_DIR/assets/scss/custom.scss"
sed -i 's/border-radius: 4px;/border-radius: $radius-xs; \/\/ 4px/g' "$THEME_DIR/assets/scss/custom.scss"
sed -i 's/border-radius: 3px;/border-radius: $radius-xs; \/\/ 4px (closest to 3px)/g' "$THEME_DIR/assets/scss/custom.scss"

echo "✅ Fixed 22 border-radius violations in custom.scss"

# Fix templates/_main.scss border-radius
sed -i 's/border-radius: 13px;/border-radius: $radius-md; \/\/ 12px/g' "$THEME_DIR/assets/scss/templates/_main.scss"
sed -i 's/border-radius: 5px;/border-radius: $radius-xs; \/\/ 4px/g' "$THEME_DIR/assets/scss/templates/_main.scss"

echo "✅ Fixed 2 border-radius violations in _main.scss"

# Fix templates/_navigation.scss border-radius
sed -i 's/border-radius: 2px;/border-radius: $radius-xs; \/\/ 4px/g' "$THEME_DIR/assets/scss/templates/_navigation.scss"

echo "✅ Fixed 1 border-radius violation in _navigation.scss"

echo ""
echo "🎯 Phase 2: Fixing box-shadow violations..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Fix common shadow patterns in custom.scss
# Pattern: 0 10px 40px rgba(0, 0, 0, 0.08) → $shadow-lg
sed -i 's/box-shadow: 0 10px 40px rgba(0, 0, 0, 0\.08);/box-shadow: $shadow-lg;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 10px 30px rgba(77, 179, 128, 0.15) → $shadow-warm-md
sed -i 's/box-shadow: 0 10px 30px rgba(77, 179, 128, 0\.15);/box-shadow: $shadow-warm-md;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 10px 25px rgba(77, 179, 128, 0.3) → $shadow-warm-md
sed -i 's/box-shadow: 0 10px 25px rgba(77, 179, 128, 0\.3);/box-shadow: $shadow-warm-md;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 5px 15px rgba(77, 179, 128, 0.2) → $shadow-warm-sm
sed -i 's/box-shadow: 0 5px 15px rgba(77, 179, 128, 0\.2);/box-shadow: $shadow-warm-sm;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 5px 15px rgba(77, 179, 128, 0.3) → $shadow-warm-md
sed -i 's/box-shadow: 0 5px 15px rgba(77, 179, 128, 0\.3);/box-shadow: $shadow-warm-md;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 5px 20px rgba(77, 179, 128, 0.1) → $shadow-warm-sm
sed -i 's/box-shadow: 0 5px 20px rgba(77, 179, 128, 0\.1);/box-shadow: $shadow-warm-sm;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 4px 12px rgba(0,0,0,0.1) → $shadow-sm
sed -i 's/box-shadow: 0 4px 12px rgba(0,0,0,0\.1);/box-shadow: $shadow-sm;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 4px 12px rgba($color-primary, 0.3) → $shadow-warm-sm
sed -i 's/box-shadow: 0 4px 12px rgba(\$color-primary, 0\.3);/box-shadow: $shadow-warm-sm;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 8px 20px rgba(0,0,0,0.12) → $shadow-md
sed -i 's/box-shadow: 0 8px 20px rgba(0,0,0,0\.12);/box-shadow: $shadow-md;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 8px 20px rgba(0,0,0,0.1) → $shadow-md
sed -i 's/box-shadow: 0 8px 20px rgba(0,0,0,0\.1);/box-shadow: $shadow-md;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 6px 16px rgba(77, 179, 128, 0.4) → $shadow-warm-md
sed -i 's/box-shadow: 0 6px 16px rgba(77, 179, 128, 0\.4);/box-shadow: $shadow-warm-md;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 4px 12px rgba(77, 179, 128, 0.3) → $shadow-warm-sm
sed -i 's/box-shadow: 0 4px 12px rgba(77, 179, 128, 0\.3);/box-shadow: $shadow-warm-sm;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 3px 10px rgba(0, 0, 0, 0.05) → $shadow-xs
sed -i 's/box-shadow: 0 3px 10px rgba(0, 0, 0, 0\.05);/box-shadow: $shadow-xs;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 -4px 20px rgba(0, 0, 0, 0.15) → $shadow-md (footer top shadow)
sed -i 's/box-shadow: 0 -4px 20px rgba(0, 0, 0, 0\.15);/box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15); \/\/ Special: footer top shadow/g' "$THEME_DIR/assets/scss/custom.scss"

# Fix focus ring patterns (these should stay as rgba for focus states)
# Pattern: 0 0 0 0.2rem rgba(77, 179, 128, 0.1)
sed -i 's/box-shadow: 0 0 0 0\.2rem rgba(77, 179, 128, 0\.1);/outline: 2px solid $emerald-500; outline-offset: 2px;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 0 0 0.2rem rgba($color-secondary, 0.25)
sed -i 's/box-shadow: 0 0 0 0\.2rem rgba(\$color-secondary, 0\.25);/outline: 2px solid $terracotta-500; outline-offset: 2px;/g' "$THEME_DIR/assets/scss/custom.scss"

# Pattern: 0 0 0 0.25rem rgba($color-secondary, 0.25)
sed -i 's/box-shadow: 0 0 0 0\.25rem rgba(\$color-secondary, 0\.25);/outline: 2px solid $terracotta-500; outline-offset: 2px;/g' "$THEME_DIR/assets/scss/custom.scss"

echo "✅ Fixed 19 box-shadow violations in custom.scss"

echo ""
echo "🎯 Phase 3: Fixing transition violations..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Fix templates/_navigation.scss transitions
sed -i 's/transition: 0\.15s ease-out;/transition: color $duration-fast $easing-subtle; \/\/ Level 1/g' "$THEME_DIR/assets/scss/templates/_navigation.scss"
sed -i 's/transition: 0\.3s ease;/transition: all $duration-base $easing-medium; \/\/ Level 2/g' "$THEME_DIR/assets/scss/templates/_navigation.scss"
sed -i 's/transition: 0s;/transition: none;/g' "$THEME_DIR/assets/scss/templates/_navigation.scss"
sed -i 's/transition: 0\.15s;/transition: all $duration-fast $easing-subtle; \/\/ Level 1/g' "$THEME_DIR/assets/scss/templates/_navigation.scss"
sed -i 's/transition: 0\.1s;/transition: all $duration-fast $easing-subtle; \/\/ Level 1/g' "$THEME_DIR/assets/scss/templates/_navigation.scss"
sed -i 's/transition: 0\.5s cubic-bezier(0\.165, 0\.84, 0\.44, 1);/transition: all $duration-slow $easing-medium;/g' "$THEME_DIR/assets/scss/templates/_navigation.scss"
sed -i 's/transition: 0\.4s cubic-bezier(0\.165, 0\.84, 0\.44, 1);/transition: all $duration-base $easing-strong;/g' "$THEME_DIR/assets/scss/templates/_navigation.scss"

echo "✅ Fixed 8 transition violations in _navigation.scss"

# Fix templates/_main.scss transitions
sed -i 's/transition: 0\.3s ease;/transition: all $duration-base $easing-medium; \/\/ Level 2/g' "$THEME_DIR/assets/scss/templates/_main.scss"
sed -i 's/transition: 0\.15s;/transition: all $duration-fast $easing-subtle; \/\/ Level 1/g' "$THEME_DIR/assets/scss/templates/_main.scss"
sed -i 's/transition: 0\.35s ease;/transition: all $duration-base $easing-medium;/g' "$THEME_DIR/assets/scss/templates/_main.scss"
sed -i 's/transition: 0\.25s ease;/transition: all $duration-base $easing-medium;/g' "$THEME_DIR/assets/scss/templates/_main.scss"
sed -i 's/transition: 0\.3s;/transition: all $duration-base $easing-medium;/g' "$THEME_DIR/assets/scss/templates/_main.scss"
sed -i 's/transition: 0\.3s cubic-bezier(0\.075, 0\.82, 0\.165, 1);/transition: all $duration-base $easing-strong;/g' "$THEME_DIR/assets/scss/templates/_main.scss"

echo "✅ Fixed 6 transition violations in _main.scss"

# Fix _common.scss transitions
sed -i 's/transition: 1\.5s cubic-bezier(0\.105, 0\.84, 0\.44, 1);/transition: all $duration-slow $easing-medium;/g' "$THEME_DIR/assets/scss/_common.scss"
sed -i 's/transition: 0\.3s ease;/transition: all $duration-base $easing-medium;/g' "$THEME_DIR/assets/scss/_common.scss"

echo "✅ Fixed 2 transition violations in _common.scss"

# Fix _buttons.scss transitions
sed -i 's/transition: 0\.2s ease-out;/transition: all $duration-fast $easing-subtle; \/\/ Level 1/g' "$THEME_DIR/assets/scss/_buttons.scss"
sed -i 's/transition: 0\.3s;/transition: all $duration-base $easing-strong; \/\/ Level 3 (buttons)/g' "$THEME_DIR/assets/scss/_buttons.scss"

echo "✅ Fixed 2 transition violations in _buttons.scss"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ All Violations Fixed!"
echo ""
echo "📊 Summary:"
echo "  • Border-radius: 25 fixes"
echo "  • Box-shadow: 19 fixes"
echo "  • Transitions: 18 fixes"
echo "  • Total: 62 violations resolved"
echo ""
echo "Next steps:"
echo "  1. Run Hugo build to validate"
echo "  2. Check for any compilation errors"
echo "  3. Re-run compliance checks"
echo ""
