#!/bin/bash
#
# Performance Monitoring Script for Andromeda Hugo Theme
# Tracks build time, page weight, and template performance
#
# Usage: ./scripts/performance-check.sh
#

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "=========================================="
echo "  Hugo Theme Performance Check"
echo "=========================================="
echo ""

# Performance targets from REFACTOR-PLAN-v2.md
TARGET_BUILD_TIME=3
TARGET_PAGE_WEIGHT=500
TARGET_IMAGE_ASSETS=2
TARGET_CSS_BUNDLE=50

# 1. Build Time Monitoring
echo "📊 Build Time Check"
echo "------------------------------------------"
START_TIME=$(date +%s.%N)
hugo --quiet --gc --minify > /dev/null 2>&1
END_TIME=$(date +%s.%N)
BUILD_TIME=$(echo "$END_TIME - $START_TIME" | bc)
BUILD_TIME_INT=$(printf "%.0f" $BUILD_TIME)

if (( $(echo "$BUILD_TIME < $TARGET_BUILD_TIME" | bc -l) )); then
    echo -e "${GREEN}✓ Build time: ${BUILD_TIME}s (target: <${TARGET_BUILD_TIME}s)${NC}"
else
    echo -e "${RED}✗ Build time: ${BUILD_TIME}s (target: <${TARGET_BUILD_TIME}s)${NC}"
fi
echo ""

# 2. Template Performance Metrics
echo "🔍 Template Performance"
echo "------------------------------------------"
hugo --templateMetrics --quiet | head -20
echo ""

# 3. Image Asset Size Check
echo "📸 Image Assets Size"
echo "------------------------------------------"
if [ -d "assets/images" ]; then
    IMAGE_SIZE=$(du -sh assets/images 2>/dev/null | cut -f1)
    IMAGE_SIZE_MB=$(du -sm assets/images 2>/dev/null | cut -f1)
    if [ $IMAGE_SIZE_MB -lt $TARGET_IMAGE_ASSETS ]; then
        echo -e "${GREEN}✓ Image assets: ${IMAGE_SIZE} (target: <${TARGET_IMAGE_ASSETS}MB)${NC}"
    else
        echo -e "${RED}✗ Image assets: ${IMAGE_SIZE} (target: <${TARGET_IMAGE_ASSETS}MB)${NC}"
    fi
else
    echo -e "${YELLOW}⚠ No assets/images directory found${NC}"
fi

if [ -d "static/images" ]; then
    STATIC_IMAGE_SIZE=$(du -sh static/images 2>/dev/null | cut -f1)
    STATIC_IMAGE_SIZE_MB=$(du -sm static/images 2>/dev/null | cut -f1)
    echo "  Static images: ${STATIC_IMAGE_SIZE}"
fi
echo ""

# 4. CSS Bundle Size Check
echo "🎨 CSS Bundle Size"
echo "------------------------------------------"
if [ -d "public" ]; then
    CSS_FILES=$(find public -name "*.css" -type f 2>/dev/null)
    if [ -n "$CSS_FILES" ]; then
        TOTAL_CSS_SIZE=0
        for file in $CSS_FILES; do
            SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            TOTAL_CSS_SIZE=$((TOTAL_CSS_SIZE + SIZE))
        done
        CSS_SIZE_KB=$((TOTAL_CSS_SIZE / 1024))

        if [ $CSS_SIZE_KB -lt $TARGET_CSS_BUNDLE ]; then
            echo -e "${GREEN}✓ CSS bundle: ${CSS_SIZE_KB}KB (target: <${TARGET_CSS_BUNDLE}KB)${NC}"
        else
            echo -e "${RED}✗ CSS bundle: ${CSS_SIZE_KB}KB (target: <${TARGET_CSS_BUNDLE}KB)${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ No CSS files found in public/${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Run hugo build first to check CSS size${NC}"
fi
echo ""

# 5. Code Duplication Estimate
echo "📝 Code Duplication Check"
echo "------------------------------------------"
SECTIONS_COUNT=$(find layouts/partials/sections -name "*.html" 2>/dev/null | wc -l | xargs)
ATOMS_COUNT=$(find layouts/partials/atoms -name "*.html" 2>/dev/null | wc -l | xargs)
MOLECULES_COUNT=$(find layouts/partials/molecules -name "*.html" 2>/dev/null | wc -l | xargs)

echo "  Sections: ${SECTIONS_COUNT}"
echo "  Atoms: ${ATOMS_COUNT}"
echo "  Molecules: ${MOLECULES_COUNT}"

if [ $ATOMS_COUNT -gt 3 ] && [ $MOLECULES_COUNT -gt 2 ]; then
    echo -e "${GREEN}✓ Atomic design structure in place${NC}"
else
    echo -e "${YELLOW}⚠ Atomic design structure incomplete${NC}"
fi
echo ""

# 6. Summary
echo "=========================================="
echo "  Performance Summary"
echo "=========================================="
echo ""

CHECKS_PASSED=0
CHECKS_TOTAL=4

if (( $(echo "$BUILD_TIME < $TARGET_BUILD_TIME" | bc -l) )); then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi

if [ -d "assets/images" ] && [ $IMAGE_SIZE_MB -lt $TARGET_IMAGE_ASSETS ]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi

if [ -d "public" ] && [ $CSS_SIZE_KB -lt $TARGET_CSS_BUNDLE ]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi

if [ $ATOMS_COUNT -gt 3 ]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi

PASS_RATE=$((CHECKS_PASSED * 100 / CHECKS_TOTAL))

if [ $PASS_RATE -ge 75 ]; then
    echo -e "${GREEN}✓ Performance: ${CHECKS_PASSED}/${CHECKS_TOTAL} checks passed (${PASS_RATE}%)${NC}"
elif [ $PASS_RATE -ge 50 ]; then
    echo -e "${YELLOW}⚠ Performance: ${CHECKS_PASSED}/${CHECKS_TOTAL} checks passed (${PASS_RATE}%)${NC}"
else
    echo -e "${RED}✗ Performance: ${CHECKS_PASSED}/${CHECKS_TOTAL} checks passed (${PASS_RATE}%)${NC}"
fi

echo ""
echo "Run 'hugo --templateMetrics' for detailed template analysis"
echo "Run 'hugo --buildStats' to see build statistics"
echo ""
