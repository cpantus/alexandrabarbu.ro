#!/usr/bin/env python3
"""
Remove orphaned benefits_section data blocks that are never rendered.
These sections have data defined but no corresponding type in sections array.
"""

import re
from pathlib import Path

files_to_clean = [
    "content/romanian/team-building.md",
    "content/romanian/corporate-team-building.md",
    "content/english/corporate-team-building.md",
]

def remove_benefits_section(filepath):
    """Remove orphaned benefits_section block from a file."""
    path = Path(filepath)
    if not path.exists():
        print(f"❌ File not found: {filepath}")
        return False

    content = path.read_text()

    # Pattern: # Benefits Section (or similar) followed by benefits_section: block
    # Match from comment through all nested YAML until next top-level # comment or end
    pattern = re.compile(
        r'^# Benefits.*\n'
        r'^benefits_section:\n'
        r'(?:^  .*\n)*',  # Match all indented lines (2+ spaces)
        re.MULTILINE
    )

    # Remove the benefits_section block
    new_content = pattern.sub('', content)

    if new_content == content:
        print(f"⚠️  No benefits_section found in: {filepath}")
        return False

    # Write back
    path.write_text(new_content)
    print(f"✅ Removed orphaned benefits_section from: {filepath}")
    return True

def main():
    """Remove orphaned benefits_section blocks from all files."""
    print("Removing orphaned benefits_section data blocks...")
    print()

    success_count = 0
    for filepath in files_to_clean:
        if remove_benefits_section(filepath):
            success_count += 1

    print()
    print(f"Cleanup complete: {success_count}/{len(files_to_clean)} files")

if __name__ == "__main__":
    main()
