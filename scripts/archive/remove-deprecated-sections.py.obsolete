#!/usr/bin/env python3
"""
Remove deprecated section types from Hugo content files.
Removes both the section type entry from the sections array
and the corresponding section data block.
"""

import re
import sys
from pathlib import Path

DEPRECATED_SECTIONS = [
    'benefits-grid',
    'method-tabs',
    'timeline-process',
    'service-highlights',
    'related-services',
    'onboarding-steps',
]

def remove_deprecated_sections(file_path):
    """Remove deprecated section references from a Hugo content file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    modified = False

    # Split into front matter and body
    parts = content.split('---')
    if len(parts) < 3:
        return False  # No front matter

    front_matter = parts[1]
    body = '---'.join(parts[2:])

    # Remove section type entries from sections array
    for section_type in DEPRECATED_SECTIONS:
        # Match: - type: "section-name" or   - type: "section-name"
        pattern = r'^\s*-\s+type:\s+["\']' + re.escape(section_type) + r'["\']\s*$'
        if re.search(pattern, front_matter, re.MULTILINE):
            front_matter = re.sub(pattern, '', front_matter, flags=re.MULTILINE)
            modified = True
            print(f"  - Removed section type: {section_type}")

    # Remove section data blocks (section_name: ... until next section or ---)
    for section_type in DEPRECATED_SECTIONS:
        section_data_name = section_type.replace('-', '_')

        # Match section data block with proper indentation handling
        # Pattern: section_name:\n followed by indented lines until next top-level key or end
        pattern = r'^' + re.escape(section_data_name) + r':.*?(?=^\w+:|$)'
        if re.search(pattern, front_matter, re.MULTILINE | re.DOTALL):
            front_matter = re.sub(pattern, '', front_matter, flags=re.MULTILINE | re.DOTALL)
            modified = True
            print(f"  - Removed section data: {section_data_name}")

    if modified:
        # Clean up extra blank lines (more than 2 consecutive)
        front_matter = re.sub(r'\n{3,}', '\n\n', front_matter)

        # Reconstruct file
        new_content = '---' + front_matter + '---' + body

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True

    return False

def main():
    """Process all content files."""
    content_dir = Path('content')

    if not content_dir.exists():
        # Try themes/andromeda-hugo/content
        content_dir = Path('themes/andromeda-hugo/content')
        if not content_dir.exists():
            print("Error: content directory not found")
            sys.exit(1)

    files_modified = 0
    files_scanned = 0

    for md_file in content_dir.rglob('*.md'):
        files_scanned += 1
        print(f"\nProcessing: {md_file}")

        if remove_deprecated_sections(md_file):
            files_modified += 1

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Files scanned: {files_scanned}")
    print(f"  Files modified: {files_modified}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
