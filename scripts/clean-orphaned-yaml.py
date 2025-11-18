#!/usr/bin/env python3
"""
Clean up orphaned YAML blocks after removing deprecated sections.
This script removes any top-level blocks that start with spaces (orphaned after section removal).
"""

import re
import sys
from pathlib import Path

def clean_orphaned_yaml(file_path):
    """Remove orphaned YAML blocks from front matter."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into front matter and body
    parts = content.split('---')
    if len(parts) < 3:
        return False  # No front matter

    front_matter = parts[1]
    body = '---'.join(parts[2:])
    original_fm = front_matter

    # Remove lines that start with 2 spaces but are not part of valid YAML structure
    # These are orphaned continuation lines after deleted sections
    lines = front_matter.split('\n')
    cleaned_lines = []
    skip_until_next_key = False

    for i, line in enumerate(lines):
        # Empty lines are OK
        if not line.strip():
            cleaned_lines.append(line)
            continue

        # Comments are OK
        if line.strip().startswith('#'):
            cleaned_lines.append(line)
            continue

        # Top-level keys (no leading spaces)
        if line and line[0] not in (' ', '\t'):
            skip_until_next_key = False
            cleaned_lines.append(line)
            continue

        # Nested items under a list (  - item:)
        if re.match(r'^\s{2}-\s+\w+:', line):
            # Check if we're inside a valid parent
            # Look back to find parent key
            has_parent = False
            for j in range(i-1, -1, -1):
                prev_line = lines[j]
                if prev_line and prev_line[0] not in (' ', '\t', '#') and prev_line.strip():
                    # Found top-level key
                    has_parent = ':' in prev_line
                    break

            if has_parent:
                cleaned_lines.append(line)
            continue

        # Nested values under a key (    key: value)
        if line.startswith('  ') and ':' in line:
            # Check if this is under a valid parent by looking back
            has_parent = False
            for j in range(i-1, -1, -1):
                prev_line = lines[j]
                if not prev_line.strip() or prev_line.strip().startswith('#'):
                    continue
                if prev_line and prev_line[0] not in (' ', '\t'):
                    # Found top-level key
                    has_parent = ':' in prev_line
                    break
                if prev_line.startswith('  -'):
                    # Part of a list item
                    has_parent = True
                    break

            if has_parent:
                cleaned_lines.append(line)
            continue

        # Nested list items (  - value)
        if re.match(r'^\s{2}-\s+"?[^:]+"?$', line):
            # Look back for parent list
            has_parent = False
            for j in range(i-1, -1, -1):
                prev_line = lines[j]
                if not prev_line.strip() or prev_line.strip().startswith('#'):
                    continue
                if prev_line and prev_line[0] not in (' ', '\t'):
                    # Found top-level key
                    has_parent = ':' in prev_line
                    break

            if has_parent:
                cleaned_lines.append(line)
            continue

        # Deep nested items (4+ spaces)
        if line.startswith('    '):
            # Check if we're in a valid context
            has_parent = False
            for j in range(i-1, -1, -1):
                prev_line = lines[j]
                if not prev_line.strip() or prev_line.strip().startswith('#'):
                    continue
                if prev_line.startswith('  ') and not prev_line.startswith('    '):
                    # Found intermediate parent
                    has_parent = True
                    break
                if prev_line and prev_line[0] not in (' ', '\t'):
                    break

            if has_parent:
                cleaned_lines.append(line)
            continue

    new_front_matter = '\n'.join(cleaned_lines)

    # Clean up excessive blank lines
    new_front_matter = re.sub(r'\n{3,}', '\n\n', new_front_matter)

    if new_front_matter != original_fm:
        # Reconstruct file
        new_content = '---' + new_front_matter + '---' + body

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

        if clean_orphaned_yaml(md_file):
            print(f"✓ Cleaned: {md_file}")
            files_modified += 1

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Files scanned: {files_scanned}")
    print(f"  Files cleaned: {files_modified}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
