#!/bin/bash
set -e

echo "Stripping all comments from SCSS files..."

find themes/andromeda-hugo/assets/scss/ -name "*.scss" -type f | while IFS= read -r file; do
  sed -i 's|//.*$||g' "$file"
  sed -i ':a;N;$!ba;s|/\*.*\*/||g' "$file"
  sed -i '/^[[:space:]]*$/d' "$file"
done

echo "Done! Stripped comments from $(find themes/andromeda-hugo/assets/scss/ -name '*.scss' -type f | wc -l) SCSS files."
