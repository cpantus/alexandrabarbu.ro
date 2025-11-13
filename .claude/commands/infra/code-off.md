# Disable Code Plugin

Disable the code plugin to run in infrastructure-only mode.

```bash
echo '{"code": false}' > .claude/.plugin-state && rm -rf .claude/commands/code && echo "✅ Code plugin DISABLED - Restart your session"
```

**What gets disabled:**
- All code plugin agents
- All code plugin patterns
- All code plugin skills
- All code plugin commands

**To enable:** Run `/code-on`
