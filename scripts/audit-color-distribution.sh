#!/usr/bin/env bash
#
# Visual Audit Script - v4.0 Design Language Compliance
# Checks all 34 sections for v4.0 design compliance
#

set -euo pipefail

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "v4.0 Design Language Compliance Audit"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Count total sections
total_sections=$(find themes/andromeda-hugo/layouts/partials/sections -name "*.html" | wc -l)
echo "📊 Total Sections: $total_sections"
echo ""

# 1. Check icon wrapper usage
echo "🎨 Icon Wrapper Compliance"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

wrapper_count=$(rg 'withWrapper.*true' themes/andromeda-hugo/layouts/partials/sections/ | wc -l)
rotation_sections=$(rg 'mod \$index' themes/andromeda-hugo/layouts/partials/sections/ -l | wc -l)
raw_icons=$(rg '<i class=' themes/andromeda-hugo/layouts/partials/sections/ 2>/dev/null | wc -l || echo "0")

echo "  Icon wrappers (withWrapper=true): $wrapper_count"
echo "  Sections with rotation patterns: $rotation_sections/13 expected"
echo "  Raw <i> tags (should be 0): $raw_icons"

if [ "$raw_icons" -eq 0 ]; then
    echo -e "  ${GREEN}✅ No raw icon tags found${NC}"
else
    echo -e "  ${RED}❌ Found $raw_icons raw icon tags${NC}"
fi
echo ""

# 2. Check heading color variants
echo "🎨 Heading Color Variant Compliance"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

heading_variants=$(rg 'colorVariant' themes/andromeda-hugo/layouts/partials/sections/ | wc -l)
echo "  Heading colorVariant usages: $heading_variants"

if [ "$heading_variants" -gt 50 ]; then
    echo -e "  ${GREEN}✅ Good heading color distribution${NC}"
elif [ "$heading_variants" -gt 30 ]; then
    echo -e "  ${YELLOW}⚠️  Moderate heading color usage${NC}"
else
    echo -e "  ${RED}❌ Low heading color usage${NC}"
fi
echo ""

# 3. Check color distribution in wrapper variants
echo "🎨 Color Distribution Analysis"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

primary_count=$(rg 'wrapperVariant.*["'\''](primary|emerald)["'\'']' themes/andromeda-hugo/layouts/partials/sections/ | wc -l || echo "0")
secondary_count=$(rg 'wrapperVariant.*["'\''](secondary|terracotta)["'\'']' themes/andromeda-hugo/layouts/partials/sections/ | wc -l || echo "0")
coral_count=$(rg 'wrapperVariant.*["'\'']coral["'\'']' themes/andromeda-hugo/layouts/partials/sections/ | wc -l || echo "0")
sage_count=$(rg 'wrapperVariant.*["'\'']sage["'\'']' themes/andromeda-hugo/layouts/partials/sections/ | wc -l || echo "0")
other_count=$(rg 'wrapperVariant.*["'\''](teal|amber|info|premium)["'\'']' themes/andromeda-hugo/layouts/partials/sections/ | wc -l || echo "0")

# Calculate rotation-based distribution
rotation_items=$(rg 'mod \$index' themes/andromeda-hugo/layouts/partials/sections/ -A 10 | rg 'range' -B 5 | rg '\$' | wc -l || echo "0")

total_explicit=$((primary_count + secondary_count + coral_count + sage_count + other_count))
echo "  Explicit variant assignments:"
echo "    Primary (emerald): $primary_count"
echo "    Secondary (terracotta): $secondary_count"
echo "    Coral: $coral_count"
echo "    Sage: $sage_count"
echo "    Others (teal/amber/etc): $other_count"
echo "    Total explicit: $total_explicit"
echo ""
echo "  Rotation-based assignments:"
echo "    Sections with rotation: $rotation_sections"
echo "    Estimated rotated items: ~$rotation_items (dynamic)"
echo ""

# 4. Check card system usage
echo "🎨 Card System Compliance"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

card_v4=$(rg 'card-v4' themes/andromeda-hugo/layouts/partials/sections/ | wc -l || echo "0")
card_glass=$(rg 'card-glass' themes/andromeda-hugo/layouts/partials/sections/ | wc -l || echo "0")
echo "  card-v4 usages: $card_v4"
echo "  card-glass usages: $card_glass"
echo ""

# 5. Check SCSS component files
echo "🎨 Component SCSS Files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

scss_files=(
    "themes/andromeda-hugo/assets/scss/components/_problem-empathy.scss"
    "themes/andromeda-hugo/assets/scss/components/_timeline-process.scss"
    "themes/andromeda-hugo/assets/scss/components/_method-tabs.scss"
    "themes/andromeda-hugo/assets/scss/components/_benefits-grid.scss"
    "themes/andromeda-hugo/assets/scss/components/_testimonials.scss"
    "themes/andromeda-hugo/assets/scss/components/_faq.scss"
)

scss_count=0
for file in "${scss_files[@]}"; do
    if [ -f "$file" ]; then
        scss_count=$((scss_count + 1))
        echo -e "  ${GREEN}✅${NC} $(basename "$file")"
    else
        echo -e "  ${RED}❌${NC} $(basename "$file") MISSING"
    fi
done

echo ""
echo "  SCSS files: $scss_count/6"
echo ""

# 6. Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Calculate compliance score
compliance_score=0
max_score=6

[ "$raw_icons" -eq 0 ] && compliance_score=$((compliance_score + 1))
[ "$heading_variants" -gt 50 ] && compliance_score=$((compliance_score + 1))
[ "$rotation_sections" -ge 10 ] && compliance_score=$((compliance_score + 1))
[ "$card_v4" -gt 0 ] && compliance_score=$((compliance_score + 1))
[ "$scss_count" -eq 6 ] && compliance_score=$((compliance_score + 1))
[ "$total_explicit" -gt 0 ] && compliance_score=$((compliance_score + 1))

percentage=$((compliance_score * 100 / max_score))

echo "  Compliance Score: $compliance_score/$max_score ($percentage%)"
echo ""

if [ "$compliance_score" -eq "$max_score" ]; then
    echo -e "${GREEN}✅ EXCELLENT: Full v4.0 compliance achieved!${NC}"
elif [ "$compliance_score" -ge 4 ]; then
    echo -e "${YELLOW}⚠️  GOOD: Mostly compliant, minor gaps remain${NC}"
else
    echo -e "${RED}❌ NEEDS WORK: Significant v4.0 gaps detected${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
