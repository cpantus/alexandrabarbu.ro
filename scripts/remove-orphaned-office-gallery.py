#!/usr/bin/env python3
"""
Remove orphaned office_gallery data blocks that are never rendered.
These sections have data defined but no corresponding type in sections array.
"""

import re
from pathlib import Path

files_to_clean = [
    "content/romanian/terapie-individuala.md",
    "content/romanian/terapie-de-cuplu.md",
    "content/romanian/terapie-de-familie.md",
    "content/romanian/dezvoltare-personala.md",
]

def remove_office_gallery(filepath):
    """Remove orphaned office_gallery block from a file."""
    path = Path(filepath)
    if not path.exists():
        print(f"❌ File not found: {filepath}")
        return False

    content = path.read_text()

    # Pattern: # office_gallery followed by office_gallery: block with all nested content
    # Match from comment through all nested YAML until next top-level # comment or end
    pattern = re.compile(
        r'^# office_gallery\n'
        r'^office_gallery:\n'
        r'(?:^  .*\n)*',  # Match all indented lines (2+ spaces)
        re.MULTILINE
    )

    # Remove the office_gallery block
    new_content = pattern.sub('', content)

    if new_content == content:
        print(f"⚠️  No office_gallery found in: {filepath}")
        return False

    # Write back
    path.write_text(new_content)
    print(f"✅ Removed orphaned office_gallery from: {filepath}")
    return True

def main():
    """Remove orphaned office_gallery blocks from all files."""
    print("Removing orphaned office_gallery data blocks...")
    print()

    success_count = 0
    for filepath in files_to_clean:
        if remove_office_gallery(filepath):
            success_count += 1

    print()
    print(f"Cleanup complete: {success_count}/{len(files_to_clean)} files")

if __name__ == "__main__":
    main()
