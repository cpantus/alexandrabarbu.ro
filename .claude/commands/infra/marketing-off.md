# Disable Marketing Plugin

```bash
# Write state file
echo '{"marketing": false}' > .claude/.plugin-state

# Apply changes immediately
npx tsx core/infrastructure/hooks/session-start-command-links.ts

# Confirm
echo ""
echo "✅ Marketing plugin DISABLED"
echo ""
echo "Immediately removed:"
echo "  • Marketing commands (.claude/commands/marketing/ removed)"
echo ""
echo "On next prompt:"
echo "  • No marketing skills auto-activation"
echo "  • No marketing pattern suggestions"
echo "  • Clean infrastructure-only experience"
echo ""
echo "Infrastructure still available:"
echo "  • Meta patterns (/pattern component_*)"
echo "  • Infrastructure agents (orchestrator, task-coordinator)"
echo "  • Infrastructure commands (/workflow, /system-health)"
echo ""
echo "Enable with: /marketing-on"
```

## What It Does

1. ✅ Creates `.claude/.plugin-state` file with `{"marketing": false}`
2. ✅ Removes marketing command symlinks from `.claude/commands/marketing/`
3. ✅ Disables marketing skills auto-activation (next prompt)
4. ✅ Disables marketing patterns suggestions (next prompt)
5. ✅ All changes active **immediately** - no restart needed

## After Running

**Immediately removed:**
- 49 marketing commands no longer visible

**On next prompt:**
- No marketing skills auto-activation
- No marketing pattern suggestions
- Clean infrastructure-only experience

## Infrastructure Still Available

With marketing disabled, you still have full access to:
- Meta patterns (`/pattern component_*`)
- Infrastructure agents (orchestrator, task-coordinator)
- Infrastructure commands (`/workflow`, `/system-health`, `/pattern`)
- All core documentation and utilities

## Enable Again

```bash
/marketing-on
```

## Permanently Disable

To remove marketing from all sessions, ensure environment variable is not set:

```bash
# Check if set
echo $MARKETING_PLUGIN_ENABLED

# If set, remove from ~/.bashrc or ~/.zshrc
# Then reload shell or unset:
unset MARKETING_PLUGIN_ENABLED
```

## See Also

- `/marketing-on` - Enable marketing plugin
- `PLUGIN-USAGE.md` - Complete plugin documentation
- `QUICK-START.md` - Getting started guide
