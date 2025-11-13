# Enable Code Plugin

Enable the code plugin to access frontend, UX, and architecture components.

```bash
echo '{"code": true}' > .claude/.plugin-state && npx tsx core/infrastructure/hooks/session-start-command-links.ts && echo "✅ Code plugin ENABLED - Restart your session to activate commands"
```

**What gets enabled:**
- 7 agents (frontend, UX, architecture specialists, +haiku variants)
- 16 patterns (4 frontend, 4 UX, 4 architecture, 4 Hugo)
- 4 skills (frontend best practices, UX guidelines, architecture patterns, Hugo development)
- 4 commands (/design, /architect, /component, /review-code)

**To disable:** Run `/code-off`
