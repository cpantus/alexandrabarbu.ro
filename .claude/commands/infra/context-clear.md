# Clear Context Cache

Manually clear the session's context cache.

**Purpose:** Force fresh loading of all context (useful for testing or after major file edits).

---

## Task

Clear the context cache and start a fresh session:

```bash
node_modules/.bin/ts-node .claude/hooks/utils/context-cache-cli.ts clear
```

---

## When to Use

- **Testing changes:** After editing skills, patterns, or personas
- **Troubleshooting:** If seeing stale or incorrect context
- **Fresh start:** Beginning a new major task
- **After updates:** Following system or content updates

---

## What Gets Cleared

- All cached skills (quick and full versions)
- All cached patterns
- All cached personas (cards and full)
- All cached documentation
- Session statistics and timestamps

---

## What Happens Next

- Next prompt starts a new session
- Context will be loaded fresh
- Cache will rebuild as you work
- Differential loading resumes automatically

---

## Notes

- Cache also auto-clears after 4 hours of inactivity
- Individual resources invalidate when their files are edited
- Use `/context-status` to verify cache is cleared
