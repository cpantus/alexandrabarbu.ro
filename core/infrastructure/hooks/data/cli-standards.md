# CLI Tool Standards (MANDATORY)

**Use modern tools everywhere - NO EXCEPTIONS:**

| Modern Tool | Replaces | Use Case |
|-------------|----------|----------|
| `rg` | grep | Search code/text |
| `fd` | find | Find files |
| `bat` | cat | Read files with syntax highlighting |
| `exa` | ls | List directories |

**Scope:** Main session, sub-agents, pattern execution, scripts, all contexts

**Examples:**

✅ **Correct:**
```bash
rg "function" src/
fd "*.ts"
bat src/index.ts
exa --tree src/
```

❌ **Wrong:**
```bash
grep "function" src/
find . -name "*.ts"
cat src/index.ts
ls -la src/
```

**In pipes:**
```bash
✅ git diff | rg "import"
❌ git diff | grep "import"
```

---

*These standards are enforced system-wide. The pre-tool-use-bash hook auto-corrects violations, but with this guidance loaded you should naturally use modern tools.*
