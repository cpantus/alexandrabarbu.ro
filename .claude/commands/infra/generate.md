# 🏗️ Generate Component

**Category:** Quality & Utilities
**Purpose:** Zero-effort component creation via interactive prompting and pattern-based templates
**Version:** v6.0
**Part of:** Pattern-Based Configuration Standards

---

## WHEN TO USE

Use `/generate` when you need to create new components:
- **Agents** - Specialized marketing agents
- **Commands** - Slash commands for workflows
- **Patterns** - Execution templates
- **Skills** - Auto-activating knowledge
- **Hooks** - Lifecycle event automation
- **Workflows** - Scout/Plan/Build workflows
- **Resources** - Skill-specific documentation
- **MCP Servers** - Model Context Protocol integrations

**Benefits:**
- ⚡ **<5 minutes** to create component (vs 20-30 minutes manual)
- ✅ **Automatic validation** - Generated components pass quality checks
- 📝 **Consistent quality** - Templates ensure structure compliance
- 🎯 **Guided prompts** - Clear instructions for each field

---

## SYNTAX

```bash
# Interactive mode (recommended)
/generate <component-type> <component-name>

# With options
/generate <component-type> <component-name> [--dry-run] [--force] [--no-validate]

# Examples
/generate agent market-researcher
/generate pattern analyze_performance --category analysis
/generate command validate-campaign
/generate skill market-intelligence
```

### Component Types

| Type | Description | Example |
|------|-------------|---------|
| `agent` | Specialized marketing agent | `marketing-researcher` |
| `command` | Slash command | `validate-campaign` |
| `pattern` | Execution template | `analyze_performance` |
| `skill` | Auto-activating knowledge | `market-intelligence` |
| `hook` | Lifecycle event automation | `pre-campaign-launch` |
| `workflow` | Scout/Plan/Build workflow | `campaign-research` |
| `resource` | Skill documentation | `growth-frameworks` |
| `mcp_server` | MCP integration | `brave-search` |

### Options

- `--dry-run` - Preview generated content without writing file
- `--force` - Overwrite existing file if it exists
- `--no-validate` - Skip validation step (not recommended)
- `--category <cat>` - Specify category for patterns (content/strategy/analysis/optimization)
- `--complexity <lvl>` - Specify complexity for patterns (simple/medium/complex)

---

## WHAT IT DOES

The `/generate` command executes this workflow:

### 1. Load Pattern Template
- Reads component pattern from `.claude/patterns/meta/component_<type>.md`
- Extracts OUTPUT section template
- Identifies required and optional fields from INPUT section

### 2. Interactive Prompting
For each required field, prompts you with:
- **Field name** and **description** from pattern
- **Examples** of valid values
- **Validation rules** (format, enum options, etc.)
- **Default values** where applicable

Example prompts for generating an agent:
```
🎯 Generating agent: market-researcher

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 AGENT CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Required Information:

1. Description (one-line, starts with emoji):
   > Research-focused specialist for market analysis and competitive intelligence

2. Tools (comma-separated):
   > Read, Grep, WebSearch, WebFetch

3. Model (sonnet/opus/haiku):
   > sonnet

4. Thinking mode (think/think-hard/ultrathink):
   > think

5. Core expertise (3-5 bullet points):
   > - Market research and competitive analysis
   > - Data synthesis and insight extraction
   > - Trend identification and forecasting

...
```

### 3. Template Rendering
- Fills template with your inputs using template engine
- Supports variables: `{{variableName}}`
- Supports conditionals: `{{#if optional}}...{{/if}}`
- Supports loops: `{{#each array}}{{this}}{{/each}}`
- Applies helpers: `{{componentName | titleCase}}`
- Auto-inserts emoji from pattern standards

### 4. Validation
- Runs pattern-based validation on generated content
- Checks naming conventions (kebab-case, etc.)
- Verifies required sections present
- Validates YAML frontmatter (if applicable)
- Checks emoji compliance
- Identifies broken @-references
- **Offers auto-corrections** if issues found

### 5. Write File
- Writes component to appropriate directory
- Creates parent directories if needed
- Sets permissions (executable for hooks)
- Updates registries (agent-index.json, pattern-index.json, etc.)

### 6. Confirmation
- Shows file path
- Shows validation status
- Lists any warnings
- Provides next steps

---

## OUTPUT

### Success Output

```
✨ GENERATING COMPONENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Generated: .claude/agents/market-researcher.md (347 lines)
✅ Validated: All checks passed
✅ Registry updated: agent-index.json

🎯 Component created successfully!

Next steps:
1. Review generated file: .claude/agents/market-researcher.md
2. Test agent: /agent-create market-researcher "research task"
3. Update integrations if needed

Preview first 20 lines? [y/N]
```

### Dry-Run Output

```
🔍 DRY-RUN MODE (no files written)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Would write to: .claude/agents/market-researcher.md

═══ GENERATED CONTENT (347 lines) ═══

---
name: market-researcher
description: 🔬 Research-focused specialist for market analysis and competitive intelligence
tools: Read, Grep, WebSearch, WebFetch
model: sonnet
thinking: think
---

# Market Researcher Agent

...

═══ VALIDATION REPORT ═══

✅ Naming: kebab-case, valid format
✅ Structure: All required sections present
✅ Emoji: 🔬 (research emoji, matches standards)
✅ Similarity: No duplicates (closest: analyst at 45%)
✅ Integration: All @-references valid

To write this file, run: /generate agent market-researcher (without --dry-run)
```

### Validation Issues

```
⚠️  VALIDATION WARNINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issues found in generated component:

❌ Critical:
  - Missing required section: ## Workflow Protocol

⚠️  Warnings:
  - Description missing emoji (should start with emoji)
  - Similar component exists: marketing-analyst (similarity: 72%)

✨ AUTO-CORRECTIONS AVAILABLE:

1. Add emoji 🔬 to description
2. Add ## Workflow Protocol section with template

Apply corrections? [y/N]
> y

✅ Corrections applied
✅ Re-validated: All checks passed

Component written to: .claude/agents/market-researcher.md
```

---

## EXAMPLES

### Example 1: Generate Marketing Agent

```bash
/generate agent content-optimizer
```

**Prompts:**
1. Description: `Content optimization specialist for A/B testing, copy improvement, and conversion optimization`
2. Tools: `Read, Write, Edit, Task`
3. Model: `sonnet`
4. Thinking: `think`
5. Core expertise:
   - A/B test design and analysis
   - Copy optimization and improvement
   - Conversion rate optimization
   - Content performance analysis

**Output:** `.claude/agents/content-optimizer.md`

---

### Example 2: Generate Pattern with Category

```bash
/generate pattern video_script --category content
```

**Prompts:**
1. Purpose: `Create engaging video scripts for social media platforms`
2. Input fields: `platform, duration, objective, target audience`
3. Process steps: (5-10 steps for creating video script)
4. Output format: `Script with timestamps, hooks, B-roll suggestions`
5. Quality checks: (3-5 validation criteria)

**Output:** `.claude/patterns/content/video_script.md`

---

### Example 3: Generate Hook

```bash
/generate hook pre-campaign-validation
```

**Prompts:**
1. Description: `Validate campaign configuration before launch`
2. Trigger event: `pre-tool-use (when writing campaign files)`
3. Hook logic: (TypeScript implementation)
4. Success message: `Campaign validated successfully`
5. Environment variables: (none)

**Output:** `.claude/hooks/pre-campaign-validation.ts` (executable)

---

### Example 4: Generate with Dry-Run

```bash
/generate skill competitive-intelligence --dry-run
```

**Effect:**
- Prompts for all required fields
- Generates content in memory
- Validates generated content
- Displays full preview
- **Does NOT write file**
- Shows command to run without `--dry-run`

**Use case:** Preview before committing, test template changes

---

### Example 5: Force Overwrite Existing

```bash
/generate agent market-researcher --force
```

**Effect:**
- Overwrites existing `.claude/agents/market-researcher.md`
- Shows diff between old and new (if requested)
- Creates backup: `.claude/agents/market-researcher.md.bak`

**Use case:** Regenerate component with updated template

---

## VALIDATION INTEGRATION

Generated components are automatically validated against pattern rules:

### Validation Checks

1. **Naming Convention**
   - kebab-case format: `^[a-z0-9]+(-[a-z0-9]+)*$`
   - Length constraints (3-50 characters)
   - No abbreviations unless standard

2. **Required Structure**
   - YAML frontmatter (agents, skills)
   - Required markdown sections
   - Proper heading hierarchy

3. **Emoji Standards**
   - Description starts with emoji (agents)
   - Emoji matches pattern mapping
   - Accessible (paired with text)

4. **Similarity Detection**
   - Warning if >60% similar to existing component
   - Error if >85% similar (likely duplicate)
   - Uses Levenshtein distance + word overlap

5. **Integration References**
   - All `@.claude/...` references valid
   - Target files exist
   - Extensions included (.md, .ts, .json)

### Auto-Corrections

If validation finds issues, `/generate` offers automatic fixes:

- Add missing emoji (from pattern standards)
- Fix naming convention (convert to kebab-case)
- Add missing required sections (from template)
- Fix broken references (suggest alternatives)
- Format YAML frontmatter correctly

---

## REGISTRY UPDATES

Components are automatically registered after creation:

| Component Type | Registry File | Update |
|----------------|---------------|--------|
| Agent | `.claude/agents/agent-index.json` | Add entry with name, description, tools |
| Pattern | `.claude/patterns/pattern-index.json` | Add entry with category, complexity |
| Skill | `.claude/skills/skill-rules.json` | Add auto-activation triggers |
| Command | N/A | No registry (indexed by filesystem) |
| Hook | `.claude/settings.json` | Add hook registration |
| Workflow | `.claude/workflows/workflow-index.json` | Add entry |
| Resource | N/A | Referenced by parent skill |
| MCP Server | `.claude/mcp-servers.json` | Add server configuration |

---

## ERROR HANDLING

### Common Errors

**File already exists:**
```
❌ Error: File already exists: .claude/agents/market-researcher.md

Options:
1. Use --force to overwrite existing file
2. Choose different component name
3. Check if you meant to edit (not generate)
```

**Invalid component name:**
```
❌ Error: Component name must be kebab-case

Given: "MarketResearcher"
Expected: "market-researcher"

Auto-suggestion: Use "market-researcher" instead? [y/N]
```

**Template not found:**
```
❌ Error: No template found for component type: unknown-type

Valid component types:
- agent, command, pattern, skill, hook, workflow, resource, mcp_server

Did you mean: agent? [y/N]
```

**Validation failed:**
```
⚠️  Warning: Generated component has validation issues

Issues:
- Missing required section: ## Core Expertise

You can:
1. Apply auto-corrections (recommended)
2. Write anyway (not recommended)
3. Cancel and fix manually

Choose: [1/2/3]
```

---

## BEST PRACTICES

### 1. Use Descriptive Names
- ✅ `market-researcher` - Clear purpose
- ❌ `mr-agent` - Abbreviated, unclear

### 2. Preview First (Dry-Run)
```bash
/generate agent new-agent --dry-run
# Review output
/generate agent new-agent  # Actually create
```

### 3. Let Validation Guide You
- Read validation warnings carefully
- Apply auto-corrections when offered
- Don't skip validation unless testing

### 4. Check for Duplicates
- Review similarity warnings
- Consider extending existing component instead
- Use distinct names to avoid confusion

### 5. Test Generated Components
```bash
# For agents
/agent-create <agent-name> "test task"

# For patterns
/pattern <pattern-name> "test input"

# For commands
/<command-name>

# For hooks
# Trigger the lifecycle event (e.g., create a file)
```

---

## TROUBLESHOOTING

### Component doesn't show up in system

**Check:**
1. File exists in correct directory
2. Registry file updated (run `/system-health` to verify)
3. No syntax errors in generated file
4. Restart Claude Code session (cache refresh)

**Fix:**
```bash
/system-health --verbose  # Check for issues
# Manually add to registry if needed
```

### Generated component has wrong format

**Cause:** Template may be outdated or custom pattern used

**Fix:**
1. Check pattern file: `.claude/patterns/meta/component_<type>.md`
2. Verify OUTPUT section has correct template
3. Update template if needed
4. Regenerate: `/generate <type> <name> --force`

### Validation always fails

**Cause:** Pattern rules too strict or custom format

**Fix:**
1. Review pattern RULES section
2. Adjust validation rules if appropriate
3. Use `--no-validate` temporarily (not recommended)
4. File issue if rules are incorrect

---

## NOTES

- **Pattern-Based:** Uses meta-patterns as single source of truth
- **Extensible:** Add new component types by creating pattern files
- **Version:** Introduced in v6.0 (Pattern-Based Configuration Standards Phase 3)
- **Dependencies:** Requires pattern-parser, component-generator, validators
- **Performance:** <5 seconds generation time (excluding user input)
- **Caching:** Pattern templates cached at startup for speed

---

## SEE ALSO

- `/pre-check` - Validate component before creation (manual)
- `/system-health` - Verify all components and registries
- `@.claude/patterns/meta/component_*.md` - Pattern templates
- `@.claude/docs/pre-implementation-guide.md` - Component creation guide
- `@.claude/docs/emoji-guide.md` - Emoji standards reference

---

**Pattern Version:** 1.0
**Last Updated:** 2025-11-07
**Status:** v6.0 Feature
