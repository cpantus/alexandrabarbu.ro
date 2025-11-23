#!/usr/bin/env python3
"""
Migrate service-faq-inline sections to faq-mini in service pages.
Handles only the # Service FAQ section, preserving other sections intact.
"""

import re
from pathlib import Path

files_to_migrate = [
    "content/romanian/servicii/terapie-de-cuplu.md",
    "content/romanian/servicii/terapie-de-familie.md",
    "content/romanian/servicii/psihologie-organizationala.md",
    "content/english/services/individual-therapy.md",
    "content/english/services/couples-therapy.md",
    "content/english/services/family-therapy.md",
    "content/english/services/organizational-psychology.md",
]

def migrate_file(filepath):
    """Migrate a single file from service-faq-inline to faq-mini."""
    path = Path(filepath)
    if not path.exists():
        print(f"❌ File not found: {filepath}")
        return False

    content = path.read_text()

    # 1. Change section type in sections array
    content = content.replace('- type: "service-faq-inline"', '- type: "faq-mini"')

    # 2. Find and replace the Service FAQ section
    # Pattern: # Service FAQ followed by service_faq: block
    faq_pattern = re.compile(
        r'# Service FAQ\n'
        r'service_faq:\n'
        r'  enable: true\n'
        r'  title: "([^"]+)"\n'
        r'  subtitle: "([^"]+)"\n'
        r'\n'
        r'  questions:',
        re.MULTILINE
    )

    def replace_faq_header(match):
        title = match.group(1)
        subtitle = match.group(2)
        return (
            f'# FAQ Mini\n'
            f'faq_mini_title: "{title}"\n'
            f'faq_mini_subtitle: "{subtitle}"\n'
            f'\n'
            f'faq_items:'
        )

    content = faq_pattern.sub(replace_faq_header, content)

    # 3. Remove icon: lines from FAQ questions (keeping proper indentation)
    # Pattern: lines with "      icon: " (6 spaces)
    content = re.sub(r'^      icon: .*\n', '', content, flags=re.MULTILINE)

    # Write back
    path.write_text(content)
    print(f"✅ Migrated: {filepath}")
    return True

def main():
    """Migrate all service files."""
    print("Starting service-faq-inline → faq-mini migration...")
    print()

    success_count = 0
    for filepath in files_to_migrate:
        if migrate_file(filepath):
            success_count += 1

    print()
    print(f"Migration complete: {success_count}/{len(files_to_migrate)} files")

if __name__ == "__main__":
    main()
