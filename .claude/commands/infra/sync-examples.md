# 🔄 Sync Example Components

**Category:** Quality & Utilities
**Purpose:** Manage research repository examples for component creation
**Version:** 1.0
**Part of:** Component Creation Enhancement

---

## WHEN TO USE

Use `/sync-examples` when you need to:
- Add new research repositories for component examples
- Update existing repo outlines after repo changes
- Regenerate search indices for all repos
- List available research repositories and stats
- Clone example repos from GitHub

**When to run:**
- After cloning/updating research repos
- When `/create-from-example` shows stale results
- After modifying research repo structure
- To see what examples are available

---

## SYNTAX

```bash
# Scan all repos and generate outlines
/sync-examples --scan-all

# Scan single repo
/sync-examples --scan=<path>

# Clone and auto-index new repo
/sync-examples --clone=<github-url>

# List all repos with stats
/sync-examples --list

# Examples
/sync-examples --scan-all
/sync-examples --scan=research/component-examples/wshobson-agents
/sync-examples --clone=https://github.com/username/repo
/sync-examples --list
```

---

## WHAT IT DOES

### --scan-all (Scan All Repositories)

Scans all repositories in `research/component-examples/` and generates/updates their `outline.json` files.

**What happens:**

1. **Find repos**
   ```
   Scanning: research/component-examples/

   Found repositories:
     - wshobson-agents
     - claude-code-cheat-sheet
     - awesome-llm-apps
   ```

2. **Scan each repo**
   ```
   📂 Scanning wshobson-agents...

   Looking for components in:
     - .claude/agents/
     - agents/
     - .claude/skills/
     - skills/
     - .claude/patterns/
     - patterns/
     - subagents/
     ...

   Found:
     - 292 agents
     - 0 skills
     - 0 patterns
   ```

3. **Extract metadata**

   For each component file:
   - Parses YAML frontmatter (if present)
   - Extracts purpose from description/heading
   - Identifies keywords from filename, content, YAML
   - Detects tools used (Read, Write, WebSearch, etc.)
   - Infers complexity (simple/medium/complex) from file size
   - Records relative path from repo root

4. **Generate outline.json**
   ```json
   {
     "repo": "wshobson-agents",
     "url": "https://github.com/wshobson/agents",
     "updated": "2025-11-12T09:12:09.874Z",
     "stats": {
       "agents": 292
     },
     "components": [
       {
         "id": "search-specialist",
         "type": "agent",
         "purpose": "Expert web researcher using advanced search techniques",
         "keywords": ["search", "specialist", "research", "web"],
         "tools": ["WebSearch", "WebFetch", "Read"],
         "complexity": "medium",
         "path": "agents/search-specialist.md"
       }
     ]
   }
   ```

5. **Save outline**
   ```
   ✅ Generated outline for wshobson-agents
      Components: 292
      Path: research/component-examples/wshobson-agents/outline.json
   ```

**Output:**
```
📂 Found 3 repositories

✅ Generated outline for awesome-llm-apps
   Components: 0
   Path: /path/to/research/component-examples/awesome-llm-apps/outline.json

✅ Generated outline for claude-code-cheat-sheet
   Components: 17
   Path: /path/to/research/component-examples/claude-code-cheat-sheet/outline.json

✅ Generated outline for wshobson-agents
   Components: 292
   Path: /path/to/research/component-examples/wshobson-agents/outline.json

✨ Scan complete! All outlines generated.
```

### --scan=<path> (Scan Single Repository)

Generates outline.json for a single repository.

**Usage:**
```bash
/sync-examples --scan=research/component-examples/wshobson-agents
```

**Output:**
```
📂 Scanning: wshobson-agents

Looking for components...
  - Found 292 agents

✅ Generated outline for wshobson-agents
   Components: 292
   Path: research/component-examples/wshobson-agents/outline.json
   Size: 42KB
```

**Use when:**
- You modified a specific repo
- Testing outline generation
- Debugging component detection

### --clone=<url> (Clone and Index)

Clones a GitHub repository and automatically generates its outline.

**Usage:**
```bash
/sync-examples --clone=https://github.com/username/repo-name
```

**What happens:**

1. **Parse URL**
   ```
   Repository: username/repo-name
   Clone to: research/component-examples/username-repo-name
   ```

2. **Clone repo (shallow)**
   ```
   🔽 Cloning from GitHub...

   $ git clone --depth 1 https://github.com/username/repo-name \
       research/component-examples/username-repo-name

   Cloning into 'username-repo-name'...
   ```

3. **Auto-scan**
   ```
   📂 Scanning cloned repository...

   ✅ Generated outline for username-repo-name
      Components: 47
      Path: research/component-examples/username-repo-name/outline.json
   ```

4. **Ready to use**
   ```
   ✨ Repository ready!

   You can now search these components:
   $ /create-from-example agent "keyword"
   ```

**Folder naming:**
- URL: `https://github.com/username/repo-name`
- Folder: `username-repo-name` (lowercase, hyphens)

### --list (List Repositories)

Shows all available research repositories with statistics.

**Usage:**
```bash
/sync-examples --list
```

**Output:**
```
📂 Repositories (3):

  awesome-llm-apps
    Components: 0
    Stats: {}

  claude-code-cheat-sheet
    Components: 17
    Stats: {"agents":17}

  wshobson-agents
    Components: 292
    Stats: {"agents":292}

Total: 309 components across 3 repositories
```

**Shows for each repo:**
- Folder name
- Component count
- Component type breakdown (agents, skills, patterns, etc.)
- Whether outline.json exists
- Last updated timestamp (if available)

---

## OUTLINE.JSON FORMAT

The generated `outline.json` files use this structure:

```json
{
  "repo": "wshobson-agents",
  "url": "https://github.com/wshobson/agents",
  "updated": "2025-11-12T09:12:09.874Z",
  "stats": {
    "agents": 292,
    "skills": 15,
    "patterns": 42
  },
  "components": [
    {
      "id": "component-name",
      "type": "agent|skill|pattern|command|hook|workflow",
      "purpose": "Brief one-line description",
      "keywords": ["keyword1", "keyword2", "..."],
      "tools": ["Read", "Write", "WebSearch"],
      "complexity": "simple|medium|complex",
      "path": "relative/path/from/repo/root.md"
    }
  ]
}
```

**Size limits:**
- ~200 lines per outline.json
- ~40-50 components per repo (limited by line count)
- ~1KB per outline file

**Benefits:**
- Fast to search (10KB for 10 repos)
- Human-readable
- Git-friendly
- Can be manually edited if needed

---

## COMPONENT DETECTION

### Directories Scanned

The scanner looks for components in these directories (in order):

```
.claude/agents/          → agent
agents/                  → agent
.claude/skills/          → skill
skills/                  → skill
.claude/patterns/        → pattern
patterns/                → pattern
.claude/commands/        → command
commands/                → command
.claude/hooks/           → hook
hooks/                   → hook
.claude/workflows/       → workflow
workflows/               → workflow
subagents/               → agent
plugins/                 → agent (recursive)
```

### File Types

- **Agents/Skills/Patterns/Commands/Workflows:** `.md` files
- **Hooks:** `.ts` files
- **Ignored:** Subdirectories scanned recursively

### Metadata Extraction

**From YAML frontmatter:**
```yaml
---
name: component-name
purpose: Component description
keywords: [keyword1, keyword2]
tools: [Read, Write, Grep]
complexity: medium
---
```

**From content:**
- Purpose: First heading or comment
- Keywords: Extracted from filename and content
- Tools: Detected by pattern matching (Read, Write, etc.)
- Complexity: Inferred from file size (<200 lines=simple, <500=medium, 500+=complex)

---

## WORKFLOW EXAMPLES

### Example 1: First Time Setup

```bash
# Clone research repos
$ git clone --depth 1 https://github.com/wshobson/agents \
    research/component-examples/wshobson-agents

# Generate all outlines
$ /sync-examples --scan-all

# Verify
$ /sync-examples --list

# Ready to use
$ /create-from-example agent "research"
```

### Example 2: Adding New Repo

```bash
# Clone and auto-index
$ /sync-examples --clone=https://github.com/username/new-repo

# Check stats
$ /sync-examples --list

# Start using
$ /create-from-example agent "keyword from new repo"
```

### Example 3: Updating After Changes

```bash
# Made changes to wshobson-agents repo
$ cd research/component-examples/wshobson-agents
$ git pull

# Regenerate outline
$ /sync-examples --scan=research/component-examples/wshobson-agents

# Or regenerate all
$ /sync-examples --scan-all
```

### Example 4: Debugging Empty Results

```bash
# Check what repos exist
$ /sync-examples --list

# If a repo shows 0 components, rescan
$ /sync-examples --scan=research/component-examples/repo-name

# Check directory structure manually
$ ls -la research/component-examples/repo-name/
```

---

## FILE STRUCTURE

```
research/
└── component-examples/
    ├── .gitignore                          # Ignore rules
    ├── wshobson-agents/
    │   ├── .git/
    │   ├── agents/
    │   │   ├── search-specialist.md        # Component file
    │   │   └── ...
    │   └── outline.json                    # Generated index
    ├── claude-code-cheat-sheet/
    │   ├── .git/
    │   ├── subagents/
    │   │   ├── api-developer.md
    │   │   └── ...
    │   └── outline.json
    └── awesome-llm-apps/
        ├── .git/
        └── outline.json
```

**.gitignore options:**

```gitignore
# Option 1: Track outlines, ignore repos
*/
!*/outline.json

# Option 2: Ignore outlines (regenerate as needed)
*/outline.json

# Option 3: Ignore everything (regenerate all)
*
```

---

## PERFORMANCE

| Operation | Repos | Components | Time | Memory |
|-----------|-------|------------|------|--------|
| Scan all | 3 | 309 | ~2s | ~10MB |
| Scan one | 1 | 292 | ~0.7s | ~5MB |
| Search (via outlines) | 3 | 309 | <100ms | ~10KB |
| Clone + scan | 1 | 50 | ~5s | ~20MB |

**Why it's fast:**
- Shallow git clones (`--depth 1`)
- Per-repo outlines (no central index)
- Simple file scanning (no AST parsing)
- Lightweight metadata extraction

---

## TROUBLESHOOTING

### No components found in repo

**Problem:** Scan shows 0 components

**Causes:**
1. Repo doesn't use standard directories (`.claude/agents/`, `agents/`, etc.)
2. Component files are in unexpected locations
3. Files have wrong extensions (.txt instead of .md)

**Solutions:**
- Check repo structure: `ls -R research/component-examples/repo-name/`
- Look for non-standard directories
- Extend scanner to check additional paths (edit source-scanner.ts)

### Git clone fails

**Problem:** `--clone` command fails

**Causes:**
1. Invalid GitHub URL
2. Private repo (needs authentication)
3. Network issues
4. Repo doesn't exist

**Solutions:**
- Verify URL format: `https://github.com/username/repo-name`
- For private repos: Clone manually, then run `--scan`
- Check network connectivity
- Verify repo exists on GitHub

### Outline.json is huge

**Problem:** Outline file >1MB

**Cause:** Repo has 1000+ components

**Solutions:**
- This is expected for large repos
- Search still works but may be slower
- Consider splitting repo or reducing scope
- Current implementation handles up to ~5000 components

---

## INTEGRATION

### With /create-from-example

```bash
# Update indices first
/sync-examples --scan-all

# Then create
/create-from-example agent "research"
```

### With /generate

```bash
# Sync examples provides inspiration
/sync-examples --list

# Generate uses patterns
/generate agent market-researcher
```

### Manual CLI Usage

```bash
# Direct TypeScript execution
npx tsx core/infrastructure/hooks/utils/source-scanner.ts scan
npx tsx core/infrastructure/hooks/utils/source-scanner.ts list
npx tsx core/infrastructure/hooks/utils/source-scanner.ts search "keyword"
```

---

## NOTES

- Outlines are auto-generated, safe to delete and regenerate
- Shallow clones save disk space (only latest commit)
- Each repo is self-contained (can be added/removed independently)
- Search performance scales linearly with repo count
- Component paths are relative (repos can be moved)

---

## SEE ALSO

- `/create-from-example` - Use research examples to create components
- `core/infrastructure/hooks/utils/source-scanner.ts` - Scanner implementation
- `.gitignore` in research folder - Version control options
- `CLAUDE.md` - Component creation standards

---

**Command Version:** 1.0
**Last Updated:** 2025-11-12
**Integration:** Component Creation Enhancement (v1.0)
