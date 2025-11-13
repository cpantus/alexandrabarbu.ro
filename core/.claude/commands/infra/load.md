# /load - Load Detail Documentation

📚 **Description:** Manually load detail documentation for specific capabilities

**Usage:** `/load [capability|all]`

**Purpose:** Override auto-loading and explicitly load documentation when needed

---

## Valid Capabilities

- `skills` → skills-system.md (241 tokens)
- `patterns` → pattern-system.md (805 tokens)
- `agents` → agent-orchestration.md (249 tokens)
- `workflows` → workflow-system.md (1,453 tokens)
- `orchestrator` → orchestrator-guide.md (1,178 tokens)
- `devdocs` → dev-docs-guide.md (413 tokens)
- `guidelines` → workflow-guidelines.md (272 tokens)
- `teaching` → teaching-mode.md (421 tokens)
- `all` → All 8 documentation files (5,032 tokens)

---

## File Mapping

- `skills` → `.claude/docs/skills-system.md`
- `patterns` → `.claude/docs/pattern-system.md`
- `agents` → `.claude/docs/agent-orchestration.md`
- `workflows` → `.claude/docs/workflow-system.md`
- `orchestrator` → `.claude/docs/orchestrator-guide.md`
- `devdocs` → `.claude/docs/dev-docs-guide.md`
- `guidelines` → `.claude/docs/workflow-guidelines.md`
- `teaching` → `.claude/docs/teaching-mode.md`
- `all` → Load all 8 files above

---

## Implementation Protocol

When you see `/load [capability]`, follow these steps:

1. **Parse** the capability name from the command
2. **Validate** it's in the list above
3. **If invalid:** Show error message with valid options
4. **If valid:** Use the Read tool to load the file(s)
5. **Confirm** what was loaded (brief summary, 1-2 sentences)
6. **Proceed** with the user's task using the loaded documentation

**CRITICAL:** Actually use the Read tool to load files. Don't just acknowledge!

---

## Error Handling

**Invalid capability:**
```
❌ Unknown capability: "foobar"

Valid capabilities: skills, patterns, agents, workflows, orchestrator, devdocs, guidelines, teaching, all

Try: /load patterns
```

**File not found:**
```
❌ Documentation file not found: .claude/docs/missing-file.md

This might be a configuration issue. Please check the .claude/docs/ directory.
```

---

## Usage Examples

### Load pattern system
```
/load patterns
```
→ Loads pattern-system.md (24 patterns for content, strategy, analysis, optimization)

### Load workflows
```
/load workflows
```
→ Loads workflow-system.md (Scout/Plan/Build patterns, background agents, telemetry)

### Load orchestrator
```
/load orchestrator
```
→ Loads orchestrator-guide.md (Fleet coordination, task decomposition, agent CRUD)

### Load all documentation
```
/load all
```
→ Loads all 8 detail files (5,032 tokens total)

### Combined with task
```
/load patterns

Now create a LinkedIn post about our Q1 product launch
```
→ Loads patterns first, then executes the task with full pattern knowledge

---

## When to Use

**Auto-loading should work 95%+ of the time**, but use `/load` when:

1. **Auto-loading missed:** You need docs but they weren't auto-loaded
2. **Explicit reference:** You want to reference specific documentation
3. **Preloading:** Load docs before starting a complex task
4. **Troubleshooting:** Verify what documentation is available
5. **Learning:** Explore the documentation system

---

## Performance Notes

- **Loading latency:** <200ms per file (typically <100ms)
- **Caching:** Files are cached for the session (subsequent loads are instant)
- **Token cost:** See token counts in "Valid Capabilities" above
- **Cache cleared:** On context compaction

---

## Related Commands

- `/help` - Get help with Claude Code
- `/prime [content|analytics|full]` - Enrich context with campaign data
- See CLAUDE.md Capability Index for full system overview
