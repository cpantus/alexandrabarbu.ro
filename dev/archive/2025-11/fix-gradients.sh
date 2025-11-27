#!/bin/bash

# Fix all emerald/terracotta gradients to forest/sage/gold
# Redesign 2025 - Phase 4 gradient cleanup

set -e

echo "🔄 Replacing emerald/terracotta gradients with forest/sage/gold..."

# Navigation gradient (90deg emerald→terracotta→emerald) → forest→sage
sed -i 's/linear-gradient(90deg, \$emerald-400 0%, \$terracotta-400 50%, \$emerald-500 100%)/linear-gradient(90deg, $forest-500 0%, $sage-500 50%, $forest-600 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_navigation.scss

# Footer nav gradient (same pattern)
sed -i 's/linear-gradient(90deg, \$emerald-400 0%, \$terracotta-400 50%, \$emerald-500 100%)/linear-gradient(90deg, $forest-500 0%, $sage-500 50%, $forest-600 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_footer-nav.scss

# Footer info gradient (same pattern)
sed -i 's/linear-gradient(90deg, \$emerald-400 0%, \$terracotta-400 50%, \$emerald-500 100%)/linear-gradient(90deg, $forest-500 0%, $sage-500 50%, $forest-600 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_footer-info.scss

# Nav item gradient
sed -i 's/linear-gradient(90deg, \$color-emerald-500, \$color-terracotta-500)/linear-gradient(90deg, $forest-500, $sage-500)/g' themes/andromeda-hugo/assets/scss/06-components/_nav-item.scss

# Testimonials background gradient → clean cream
sed -i 's/linear-gradient(180deg, white 0%, rgba(\$terracotta-50, 0\.3) 50%, white 100%)/linear-gradient(180deg, $cream-50 0%, rgba($cream-100, 0.3) 50%, $cream-50 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_testimonials.scss

# Accordion emerald/terracotta → forest/sage
sed -i 's/linear-gradient(135deg, \$emerald-100 0%, \$terracotta-100 100%)/linear-gradient(135deg, $forest-100 0%, $sage-100 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_accordion.scss

# FAQ background gradient → clean cream
sed -i 's/linear-gradient(135deg, rgba(\$emerald-50, 0\.2) 0%, white 50%, rgba(\$terracotta-50, 0\.2) 100%)/linear-gradient(135deg, rgba($cream-100, 0.2) 0%, $cream-50 50%, rgba($cream-100, 0.2) 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_faq.scss

# FAQ icon gradient → forest/sage
sed -i 's/linear-gradient(135deg, \$emerald-100 0%, \$terracotta-100 100%)/linear-gradient(135deg, $forest-100 0%, $sage-100 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_faq.scss

# Timeline emerald variant → forest
sed -i 's/linear-gradient(135deg, rgba(\$emerald-300, 0\.3), rgba(\$emerald-600, 0\.3))/linear-gradient(135deg, rgba($forest-300, 0.3), rgba($forest-600, 0.3))/g' themes/andromeda-hugo/assets/scss/06-components/_timeline-step.scss

# Timeline terracotta variant → sage
sed -i 's/linear-gradient(135deg, rgba(\$terracotta-300, 0\.3), rgba(\$terracotta-600, 0\.3))/linear-gradient(135deg, rgba($sage-300, 0.3), rgba($sage-600, 0.3))/g' themes/andromeda-hugo/assets/scss/06-components/_timeline-step.scss

# Social links gradient → forest/sage
sed -i 's/linear-gradient(135deg, \$emerald-400 0%, \$terracotta-400 100%)/linear-gradient(135deg, $forest-400 0%, $sage-400 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_social-links.scss

# Social links terracotta→terracotta → sage→gold
sed -i 's/linear-gradient(135deg, \$terracotta-400 0%, \$terracotta-500 100%)/linear-gradient(135deg, $sage-400 0%, $gold-500 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_social-links.scss

# Video popup overlays → forest
sed -i 's/linear-gradient(135deg, rgba(\$emerald-900, 0\.3), rgba(\$terracotta-900, 0\.3))/linear-gradient(135deg, rgba($forest-900, 0.3), rgba($forest-800, 0.3))/g' themes/andromeda-hugo/assets/scss/06-components/_video-popup.scss

# Heading gradients → forest/sage/gold
sed -i 's/linear-gradient(135deg, \$color-primary 0%, \$emerald-700 100%)/linear-gradient(135deg, $forest-500 0%, $forest-700 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_heading.scss
sed -i 's/linear-gradient(135deg, \$emerald-400 0%, \$emerald-600 100%)/linear-gradient(135deg, $forest-400 0%, $forest-600 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_heading.scss
sed -i 's/linear-gradient(135deg, \$terracotta-400 0%, \$terracotta-600 100%)/linear-gradient(135deg, $sage-400 0%, $sage-600 100%)/g' themes/andromeda-hugo/assets/scss/06-components/_heading.scss

echo "✅ All gradients updated to Redesign 2025 colors!"
echo "📋 Summary:"
echo "   - Navigation: forest→sage gradient"
echo "   - Footer links: forest→sage gradient"
echo "   - Accordions/FAQ: forest/sage/cream"
echo "   - Social links: forest/sage/gold"
echo "   - Headings: forest/sage variants"
echo ""
echo "🔨 Run 'hugo server --disableFastRender' to rebuild and verify"
