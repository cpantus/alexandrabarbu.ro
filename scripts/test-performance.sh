#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Hugo Performance Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Clean build
echo "🧹 Cleaning previous build..."
rm -rf public/ resources/

# Build with metrics
echo "🔨 Building with metrics..."
time hugo --gc --minify --templateMetrics > /tmp/hugo-metrics.txt 2>&1

# Check build time
BUILD_TIME=$(grep "Total in" /tmp/hugo-metrics.txt | awk '{print $3}')
echo "⏱️  Build time: $BUILD_TIME"

# Check template metrics
echo ""
echo "📊 Slowest templates:"
grep -A 10 "Template Metrics" /tmp/hugo-metrics.txt

# Check output size
echo ""
echo "📦 Output size:"
du -sh public/
echo ""
du -sh public/css/
du -sh public/js/
du -sh public/images/ 2>/dev/null || echo "No images processed"

# Check CSS bundle size
if [ -f public/css/style.min.css ]; then
    GZIPPED=$(gzip -c public/css/style.min.css | wc -c)
    echo ""
    echo "💅 CSS bundle (gzipped): $(($GZIPPED / 1024))KB"
fi

# Check for WebP images
WEBP_COUNT=$(find public/images -name "*.webp" 2>/dev/null | wc -l)
echo "🖼️  WebP images generated: $WEBP_COUNT"

echo ""
echo "✅ Performance test complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
