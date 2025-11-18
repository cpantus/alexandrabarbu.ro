#!/usr/bin/env python3
"""Quick fix for orphaned blocks after breadcrumb."""
import re
from pathlib import Path

def fix_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    parts = content.split('---')
    if len(parts) < 3:
        return False

    front_matter = parts[1]
    body = '---'.join(parts[2:])

    # Pattern: breadcrumb followed by orphaned enable/title/services/methods blocks
    pattern = r'(breadcrumb:.*?\n(?:  -.*?\n)+)\n((?:  \w+:.*?\n)+)'

    def clean_orphans(match):
        return match.group(1) + '\n'

    new_fm = re.sub(pattern, clean_orphans, front_matter, flags=re.MULTILINE)

    if new_fm != front_matter:
        new_content = '---' + new_fm + '---' + body
        with open(file_path, 'w') as f:
            f.write(new_content)
        return True
    return False

content_dir = Path('themes/andromeda-hugo/content')
fixed = 0
for md_file in content_dir.rglob('*.md'):
    if fix_file(md_file):
        print(f"Fixed: {md_file}")
        fixed += 1

print(f"Fixed {fixed} files")
