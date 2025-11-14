#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Component Verification Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

THEME_DIR="themes/andromeda-hugo/layouts/partials"

# Check atoms
echo ""
echo "🔬 Atoms (5 expected):"
ls -1 $THEME_DIR/atoms/ | wc -l
ls -1 $THEME_DIR/atoms/

# Check molecules
echo ""
echo "🧪 Molecules (14 expected):"
ls -1 $THEME_DIR/molecules/ | wc -l
ls -1 $THEME_DIR/molecules/

# Check organisms
echo ""
echo "🦠 Organisms (2 expected):"
ls -1 $THEME_DIR/organisms/ 2>/dev/null | wc -l
ls -1 $THEME_DIR/organisms/ 2>/dev/null

# Check sections
echo ""
echo "📦 Sections (16 expected):"
ls -1 $THEME_DIR/sections/ | wc -l
ls -1 $THEME_DIR/sections/

# Verify archetypes
echo ""
echo "📋 Archetypes (3 expected):"
ls -1 themes/andromeda-hugo/archetypes/*.md 2>/dev/null | wc -l
ls -1 themes/andromeda-hugo/archetypes/*.md 2>/dev/null

echo ""
echo "✅ Component check complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
