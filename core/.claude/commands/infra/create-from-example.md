# 🔍 Create Component from Example

**Category:** Quality & Utilities
**Purpose:** Create components by discovering and adapting examples from research repositories
**Version:** 1.0
**Part of:** Component Creation Enhancement

---

## WHEN TO USE

Use `/create-from-example` when you want to:
- Find inspiration from existing component examples
- Adapt proven patterns to your system standards
- Learn from community-created components
- Quickly bootstrap new components from similar examples

**Benefits:**
- 🔍 **Discover** - Search 300+ components across research repos
- 🎯 **Relevant** - AI-powered matching by keywords, tools, complexity
- 📊 **Compare** - Side-by-side view of source vs adapted version
- ✅ **Compliant** - Auto-adapted to system standards with validation
- ⚡ **Fast** - Faster than starting from scratch

---

## SYNTAX

```bash
# Search and create interactively
/create-from-example <component-type> <search-keywords>

# Examples
/create-from-example agent "research web search"
/create-from-example pattern "campaign analysis"
/create-from-example skill "market intelligence"

# With options
/create-from-example agent "research" --show-all --dry-run
```

### Options

- `--show-all` - Show all matches, not just top 10
- `--dry-run` - Preview adapted component without saving
- `--force` - Overwrite existing component
- `--no-validate` - Skip validation (not recommended)

---

## WHAT IT DOES

The `/create-from-example` command executes this workflow:

### Phase 1: Discovery (Search)

**Step 1: Parse query**
```
Input: /create-from-example agent "research web search"

Parsed:
  - Type: agent
  - Keywords: ["research", "web", "search"]
  - Filters: complexity=any, tools=any
```

**Step 2: Search research repos**
- Searches across outline.json files (~10KB total, very fast)
- Ranks results by relevance score (keyword matches, tool matches, etc.)
- Returns top 10 matches with:
  - Component ID and type
  - Purpose (1-line description)
  - Repo name
  - Match score and reasons
  - Keywords and tools

**Example output:**
```
🔍 Found 15 matches for agent "research web search":

[1] search-specialist (agent) - Score: 90/100
    Repo: wshobson-agents
    Purpose: Expert web researcher using advanced search techniques and synthesis
    Keywords: search, specialist, research, web, advanced
    Tools: WebSearch, WebFetch, Read, Grep
    Match: keywords (search, research, web), tools (WebSearch)

[2] research-scout (agent) - Score: 70/100
    Repo: claude-code-cheat-sheet
    Purpose: Autonomous research and information gathering specialist
    Keywords: research, scout, autonomous, gather
    Tools: WebSearch, WebFetch, Read
    Match: keywords (research), tools (WebSearch)

...

Select a component (1-15) or 'q' to quit:
```

### Phase 2: Preview & Selection

**Step 3: User selects component**
```
> 1

Loading search-specialist from wshobson-agents...
```

**Step 4: Show preview (first 100 lines)**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 COMPONENT PREVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: wshobson-agents/agents/search-specialist.md
Lines: 1-100 of 287

[Content preview shows...]

Actions:
  [1] View full component
  [2] Adapt and compare
  [3] Select different component
  [q] Quit
```

### Phase 3: Adaptation & Comparison

**Step 5: Adapt to system standards**

When user selects "Adapt and compare":

```
🔄 Adapting to system standards...

Applying transformations:
  ✓ Added YAML frontmatter with standard fields
  ✓ Mapped tool: FileRead → Read
  ✓ Mapped tool: Execute → Bash
  ✓ Added model and thinking directives
  ✓ Normalized naming to kebab-case
  ✓ Added source attribution footer

6 changes applied
```

**Step 6: Show side-by-side comparison**

```
╔══════════════════════════════════════════════════════════════════════════╗
║                           COMPONENT COMPARISON                           ║
╠══════════════════════════════════════════════════════════════════════════╣
║ SOURCE (Original)                 │ ADAPTED (System-Compliant)          ║
╠═══════════════════════════════════╪═════════════════════════════════════╣
║ # Search Specialist               │ ---                                 ║
║                                   │ name: search-specialist             ║
║                                   │ type: agent                         ║
║                                   │ version: 1.0                        ║
║                                   │ emoji: 🔍                           ║
║                                   │ ---                                 ║
║                                   │                                     ║
║                                   │ # Search Specialist                 ║
║                                   │                                     ║
║                                   │ **Model:** sonnet                   ║
║                                   │ **Thinking:** think                 ║
║                                   │                                     ║
║ Expert web researcher...          │ Expert web researcher...            ║
║                                   │                                     ║
║ ## Tools                          │ ## Tools                            ║
║ - FileRead                        │ - Read                              ║
║ - Execute                         │ - Bash                              ║
║ - WebSearch                       │ - WebSearch                         ║
║ ... (showing first 30 lines)      │ ... (showing first 30 lines)       ║
╚═══════════════════════════════════╧═════════════════════════════════════╝

Adaptation Summary:
  - Added YAML frontmatter (standard format)
  - Mapped external tools to system tools (FileRead→Read, Execute→Bash)
  - Added model/thinking directives (agent requirements)
  - Source attribution added (footer)

Approve adaptation? [y/N]:
```

### Phase 4: Validation & Creation

**Step 7: User approves**
```
> y

✅ Component approved!
```

**Step 8: Validate adapted component**
```
🔍 Validating against meta pattern...

Checks:
  ✓ YAML frontmatter valid
  ✓ Required sections present
  ✓ Tool names valid
  ✓ Naming conventions (kebab-case)
  ✓ Structure compliance

All validations passed!
```

**Step 9: Create component file**
```
📝 Creating component...

File created: .claude/agents/search-specialist.md
Size: 312 lines
Validation: Passed

✨ Component created successfully!

Next steps:
  1. Review the generated file
  2. Customize for your specific needs
  3. Test with: /research "test query"
  4. Add to component registry if needed
```

---

## WORKFLOW DIAGRAM

```
User Input
   ↓
Search Research Repos (outline.json files)
   ↓
Display Ranked Results (top 10)
   ↓
User Selects Example
   ↓
Load & Preview Component (first 100 lines)
   ↓
User Requests Adaptation
   ↓
Apply System Standards (YAML, tools, naming, sections)
   ↓
Show Side-by-Side Comparison
   ↓
User Approves/Rejects
   ↓
Validate Against Meta Pattern
   ↓
Create Component File
   ↓
Done!
```

---

## ADAPTATION RULES

The system applies these transformations automatically:

### 1. YAML Frontmatter

**Before:**
```markdown
# Component Name

Description...
```

**After:**
```markdown
---
name: component-name
type: agent
version: 1.0
emoji: 🔍
---

# Component Name

Description...
```

### 2. Tool Name Mapping

**Mappings:**
- `FileRead` → `Read`
- `FileWrite` → `Write`
- `FileEdit` → `Edit`
- `Search` → `Grep`
- `Find` → `Glob`
- `Execute` → `Bash`

### 3. Agent Directives

**Adds (if missing):**
```markdown
**Model:** sonnet
**Thinking:** think
```

### 4. Naming Normalization

- Enforces `kebab-case` for agents/commands/hooks/skills
- Enforces `snake_case` for patterns
- Removes special characters
- Lowercases consistently

### 5. Source Attribution

**Adds footer:**
```markdown
---

**Adapted from:** Research repository component
**Adaptation Date:** 2025-11-12
**Modifications:** Added YAML frontmatter; Mapped tools; Added directives
```

---

## SEARCH SCORING

Components are ranked using this algorithm:

| Match Type | Points | Example |
|------------|--------|---------|
| Keyword in component keywords | +30 | "research" in keywords array |
| Keyword in purpose | +20 | "research" in purpose description |
| Keyword in ID | +10 | "research" in "research-scout" |
| Tool match | +15 each | Query wants WebSearch, component has it |
| Complexity match | +10 | Query wants "simple", component is simple |

**Example scoring:**
```
Query: agent "research web" with tools=[WebSearch]

Component: research-scout
  - Keywords match "research" → +30
  - Purpose contains "research" → +20
  - ID contains "research" → +10
  - Has WebSearch tool → +15
  ────────────────────────────
  Total: 75 points
```

**Ranking:** Components sorted by score (descending), top 10 shown by default.

---

## RESEARCH REPO MANAGEMENT

### Updating Research Repos

If you add new repos or update existing ones, run:

```bash
/sync-examples --scan-all
```

This regenerates all outline.json files with latest components.

### Current Research Repos

- `wshobson-agents` - 292 agents
- `claude-code-cheat-sheet` - 17 agents
- `awesome-llm-apps` - 0 components (no .claude structure)

**Total searchable:** 309 components

---

## EXAMPLES

### Example 1: Creating Research Agent

```bash
$ /create-from-example agent "research web"

🔍 Found 2 matches for agent "research web":

[1] search-specialist (agent) - Score: 90/100
    Purpose: Expert web researcher using advanced search techniques
    Repo: wshobson-agents

[2] research-scout (agent) - Score: 70/100
    Purpose: Autonomous research and information gathering
    Repo: claude-code-cheat-sheet

Select: 1

[Preview shows...]

Adapt and compare? y

[Comparison shows side-by-side...]

Approve? y

✅ Created: .claude/agents/search-specialist.md
```

### Example 2: Pattern from Analysis

```bash
$ /create-from-example pattern "performance analysis"

🔍 Found 3 matches for pattern "performance analysis":

[1] performance-audit (pattern) - Score: 85/100
[2] system-analysis (pattern) - Score: 60/100
[3] analyze-metrics (pattern) - Score: 55/100

Select: 1

[Workflow continues...]
```

### Example 3: Dry Run (Preview Only)

```bash
$ /create-from-example agent "debug" --dry-run

[Shows full workflow but doesn't save file]

✓ Preview complete (dry-run mode, no file created)
```

---

## TROUBLESHOOTING

### No matches found

**Problem:** Search returns 0 results

**Solutions:**
1. Broaden search terms (use fewer, more general keywords)
2. Check if outline.json files exist: `ls research/component-examples/*/outline.json`
3. Regenerate outlines: `/sync-examples --scan-all`
4. Try different component type

### File already exists

**Problem:** "File already exists" error

**Solutions:**
- Use `--force` to overwrite
- Choose different name
- Review existing file first

### Validation fails

**Problem:** Adapted component fails validation

**Solutions:**
- Review adaptation changes
- Check meta pattern requirements
- Use `--no-validate` to skip (then fix manually)
- Report issue if adaptation logic is incorrect

---

## INTEGRATION WITH OTHER COMMANDS

### With /sync-examples

```bash
# Update research repos first
/sync-examples --scan-all

# Then create from examples
/create-from-example agent "research"
```

### With /generate

**When to use each:**

- `/create-from-example` - When you want inspiration/adaptation from existing components
- `/generate` - When you want to create from scratch using patterns

**Workflow combination:**
```bash
# Start with example for structure
/create-from-example agent "research"

# Then generate related components from scratch
/generate command research-campaign
/generate pattern analyze_research
```

---

## NOTES

- **Search is fast:** ~10KB of outline.json files across all repos
- **Full loading is lazy:** Component content only loaded when selected
- **Adaptations are safe:** All changes validated against meta patterns
- **Source attribution:** Every adapted component tracks its source
- **Outlines are cached:** Regenerate only when repos change

---

## SEE ALSO

- `/sync-examples` - Manage research repositories
- `/generate` - Create components from scratch
- `/pattern component_*` - Meta patterns for validation
- `core/infrastructure/hooks/utils/source-scanner.ts` - Search implementation
- `core/infrastructure/hooks/utils/component-generator.ts` - Adaptation logic

---

**Command Version:** 1.0
**Last Updated:** 2025-11-12
**Integration:** Component Creation Enhancement (v1.0)
