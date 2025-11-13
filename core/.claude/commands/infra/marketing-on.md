# Enable Marketing Plugin

```bash
# Write state file
echo '{"marketing": true}' > .claude/.plugin-state

# Apply changes immediately
npx tsx core/infrastructure/hooks/session-start-command-links.ts

# Confirm
echo ""
echo "✅ Marketing plugin ENABLED"
echo ""
echo "Immediately available:"
echo "  • 49 marketing commands (/campaign, /content, /analyze, etc.)"
echo ""
echo "Active on next prompt:"
echo "  • 8 auto-activating skills (brand voice, SEO, campaigns)"
echo "  • 42 marketing patterns (content, strategy, optimization)"
echo "  • 13 marketing agents (marketing-director, copywriter, analyst, etc.)"
echo ""
echo "Disable with: /marketing-off"
```

## What It Does

1. ✅ Creates `.claude/.plugin-state` file with `{"marketing": true}`
2. ✅ Creates marketing command symlinks in `.claude/commands/marketing/`
3. ✅ Enables marketing skills for auto-activation (next prompt)
4. ✅ Enables marketing patterns for suggestions (next prompt)
5. ✅ All changes active **immediately** - no restart needed

## After Running

**Immediately available:**
- 49 marketing commands (`/campaign`, `/content`, `/analyze`, `/growth`, `/viral`, `/seo`, etc.)

**On next prompt:**
- 8 auto-activating skills (brand voice, SEO, campaign strategy)
- 42 marketing pattern suggestions (content, strategy, optimization)
- 13 marketing agents (marketing-director, copywriter, analyst, etc.)

## Making It Persistent

The `/marketing-on` command creates a runtime state file that lasts for the current working directory. To make it persistent across all sessions:

```bash
# Add to ~/.bashrc or ~/.zshrc
echo 'export MARKETING_PLUGIN_ENABLED=1' >> ~/.bashrc
source ~/.bashrc
```

## Disable Again

```bash
/marketing-off
```

## See Also

- `/marketing-off` - Disable marketing plugin
- `PLUGIN-USAGE.md` - Complete plugin documentation
- `QUICK-START.md` - Getting started guide
