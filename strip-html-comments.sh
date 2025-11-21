#!/bin/bash
set -e

echo "Stripping all HTML comments from template files..."

find themes/andromeda-hugo/layouts/ -name "*.html" -type f | while IFS= read -r file; do
  sed -i ':a;N;$!ba;s|<!--.*-->||g' "$file"
  sed -i '/^[[:space:]]*$/d' "$file"
done

echo "Done! Stripped HTML comments from $(find themes/andromeda-hugo/layouts/ -name '*.html' -type f | wc -l) template files."
