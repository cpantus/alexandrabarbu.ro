#!/bin/bash
################################################################################
# Plugin Command Symlink Generator
#
# PURPOSE:
#   Creates symlinks in .claude/commands/[plugin]/ pointing to actual command
#   files in [plugin]-plugin/commands/. This bridges Claude Code's discovery
#   mechanism (which scans .claude/commands/) with the 2-tier architecture
#   (which keeps plugin commands in plugin directories).
#
# USAGE:
#   ./scripts/link-plugin-commands.sh <plugin-name>
#
# EXAMPLES:
#   ./scripts/link-plugin-commands.sh code
#   ./scripts/link-plugin-commands.sh sales
#
# WHEN TO RUN:
#   ✅ After adding a new command to plugin
#   ✅ After removing a command from plugin
#   ✅ After renaming a command in plugin
#   ✅ After git clone (if symlinks broken on Windows)
#   ✅ When symlinks seem out of sync
#   ❌ NOT needed when editing command content (symlinks follow source)
#
# WHAT IT DOES:
#   1. Removes all existing symlinks in .claude/commands/[plugin]/
#   2. Scans [plugin]-plugin/commands/ for all .md files
#   3. Creates symlink for each file in .claude/commands/[plugin]/
#   4. Reports count of symlinks created
#
# NOTES:
#   - Symlinks are relative: ../../../[plugin]-plugin/commands/filename.md
#   - Symlinks should be committed to git
#   - On Windows, may need to run after clone even if symlinks in git
#   - Script is idempotent - safe to run multiple times
#
################################################################################

set -e

PLUGIN=${1:-code}
PROJECT_ROOT=$(pwd)
PLUGIN_DIR="$PROJECT_ROOT/${PLUGIN}-plugin/commands"
COMMANDS_DIR="$PROJECT_ROOT/.claude/commands/$PLUGIN"

# Check if plugin is enabled (when called directly, not from hook)
if [ "$PLUGIN" = "code" ] && [ "$CODE_PLUGIN_ENABLED" != "1" ] && [ -t 1 ]; then
  echo "⚠️  Code plugin is not enabled (CODE_PLUGIN_ENABLED != 1)"
  echo "   Symlinks will be created but commands won't be active"
  echo "   To enable: export CODE_PLUGIN_ENABLED=1"
  echo ""
fi

if [ ! -d "$PLUGIN_DIR" ]; then
  echo "ERROR: Plugin directory not found: $PLUGIN_DIR"
  exit 1
fi

echo "Creating symlinks for $PLUGIN plugin commands..."

# Clean existing symlinks
rm -rf "$COMMANDS_DIR"
mkdir -p "$COMMANDS_DIR"

# Create symlinks
cd "$COMMANDS_DIR"
for cmd in "$PLUGIN_DIR"/*.md; do
  if [ -f "$cmd" ]; then
    ln -s "../../../${PLUGIN}-plugin/commands/$(basename "$cmd")" "$(basename "$cmd")"
  fi
done

COUNT=$(find "$COMMANDS_DIR" -type l | wc -l)
echo "✓ Created $COUNT symlinks for $PLUGIN plugin"
