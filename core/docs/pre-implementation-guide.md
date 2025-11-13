# 🚀 Pre-Implementation Guide

**Version:** 1.1
**Last Updated:** 2025-11-06
**Purpose:** Developer guide for creating consistent, validated components

> **📌 v5.1 UPDATE:** Component standards are now pattern-based!
>
> For complete specifications and validation rules, reference:
> - `/pattern component_agent` - Agent component standards
> - `/pattern component_command` - Command component standards
> - `/pattern component_pattern` - Pattern component standards
> - `/pattern component_skill` - Skill component standards
> - `/pattern component_hook` - Hook component standards
> - `/pattern component_workflow` - Workflow pattern standards
> - `/pattern component_resource` - Resource file standards
> - `/pattern component_mcp_server` - MCP server config standards
>
> These patterns are the single source of truth for component structure, naming, and validation.

---

## Table of Contents

1. [Overview](#overview)
2. [The Validation Workflow](#the-validation-workflow)
3. [Using /pre-check](#using-pre-check)
4. [Naming Conventions](#naming-conventions)
5. [Structure Requirements](#structure-requirements)
6. [Emoji Selection](#emoji-selection)
7. [Integration Validation](#integration-validation)
8. [Auto-Correction](#auto-correction)
9. [Best Practices](#best-practices)
10. [Common Validation Errors](#common-validation-errors)
11. [Troubleshooting](#troubleshooting)

---

## Overview

The Marketing Agent system includes **automatic validation** and **auto-correction** to ensure all components follow consistent patterns. This guide shows you how to leverage these tools when creating new components.

### Why Validate Before Creating?

- **Prevent duplicates** - Find similar components before creating
- **Ensure consistency** - Follow established naming and structure
- **Catch errors early** - Fix issues before they're committed
- **Speed up development** - Auto-correction fixes common mistakes
- **Maintain quality** - System stays clean and organized

### Automatic Validation

**Auto-correction (Automatic)** - Pre-tool-use hooks automatically validate and fix issues when writing/editing files

---

## The Validation Workflow

### Recommended Workflow

```
1. Plan component
   ├─ Decide type (agent/pattern/skill/command/hook)
   ├─ Choose descriptive name
   └─ Identify integrations needed

2. Create component
   ├─ Write file content
   ├─ Pre-hook validation runs automatically
   ├─ Auto-correction fixes issues
   └─ Shows what was corrected

3. Verify creation
   ├─ Check auto-corrections applied
   ├─ Review similar component warnings
   └─ Test component works
```

---

## How Automatic Validation Works

When you create or edit a component file, pre-tool-use hooks automatically:

1. **Detect the component type** - Based on file path and extension
2. **Validate naming** - Check kebab-case/snake_case conventions (from patterns)
3. **Check for duplicates** - Find similar existing components (>70% similarity)
4. **Verify structure** - Ensure required sections present (from patterns)
5. **Validate emoji** - Check emoji from pattern files (v5.2+)
6. **Apply corrections** - Fix issues automatically
7. **Show results** - Display what was corrected

### What Gets Validated

1. **Naming Convention**
   - Agents/Skills/Commands: kebab-case
   - Patterns: snake_case
   - Hooks/Utilities: kebab-case

2. **Duplicate Detection**
   - Levenshtein distance similarity
   - Word overlap analysis
   - Warns about similar existing components

3. **Structure Requirements**
   - Required sections per component type
   - YAML frontmatter presence
   - Markdown formatting

4. **Emoji Standards**
   - Appropriate emoji from pattern files (v5.2+)
   - Correct placement for component type
   - Format compliance

5. **Integration Points**
   - Valid @-references
   - Cross-component dependencies
   - Registry entries

---

## Naming Conventions

### Component Type Rules

| Component | Format | Example | Reason |
|-----------|--------|---------|--------|
| Agent | kebab-case | `content-strategist` | Consistency, URL-friendly |
| Pattern | snake_case | `create_campaign_plan` | Function naming convention |
| Skill | kebab-case | `brand-voice-guidelines` | Consistency |
| Command | kebab-case | `system-health` | CLI convention |
| Hook | kebab-case | `pre-tool-use-write` | Event naming |
| Utility | kebab-case | `component-validator` | Module naming |

### Naming Best Practices

**DO:**
- ✅ Use descriptive names: `content-strategist` not `strategist1`
- ✅ Be specific: `email-campaign-analyzer` not `analyzer`
- ✅ Follow domain terms: `funnel-analysis` not `pipe-check`
- ✅ Keep concise: `brand-voice` not `brand-voice-consistency-checker`

**DON'T:**
- ❌ Use generic names: `helper`, `util`, `manager`
- ❌ Include type in name: `agent-copywriter` (just `copywriter`)
- ❌ Use abbreviations: `mktg` (use `marketing`)
- ❌ Mix conventions: `ContentStrategist` in file name

### Similarity Thresholds

The validator uses similarity detection:
- **>85% similar:** High risk duplicate, review carefully
- **70-85% similar:** Moderate risk, consider consolidation
- **<70% similar:** Different enough, proceed

**Example:**
- `content-strategist` vs `content-researcher`: 67% similar ✅
- `content-strategist` vs `content-strategist-v2`: 92% similar ❌

---

## Structure Requirements

### Agent Structure

**Required sections:**
```markdown
---
name: agent-name
description: 🎯 Brief description with emoji
tools: [Read, Write, Search]
model: sonnet
thinking: think-hard
---

# 🎯 Agent Name

## Core Expertise
What the agent specializes in...

## When to Invoke
Specific scenarios...

## Workflow Protocol
Step-by-step process...

## Quality Gates
Validation criteria...
```

**Key requirements:**
- YAML frontmatter with name, description, tools, model, thinking
- Emoji in description (first character)
- 4 required sections: Core Expertise, When to Invoke, Workflow Protocol, Quality Gates

### Pattern Structure

**Required sections:**
```markdown
# Pattern Name

## PURPOSE
What this pattern does...

## INPUT
Required information...

## PROCESS
Step-by-step execution...

## OUTPUT
What gets produced...

## QUALITY CHECKS
Validation criteria...

## EXAMPLE
Sample usage...
```

**Key requirements:**
- snake_case file name
- 6 required sections
- No YAML frontmatter needed
- Registered in pattern-index.json

### Command Structure

**Required sections:**
```markdown
# /command-name

🎯 Brief description with category emoji

## WHEN TO USE
When to invoke this command...

## SYNTAX
Command usage...

## WHAT IT DOES
Detailed explanation...

## EXAMPLES
Usage examples...

## OUTPUT
Expected results...
```

**Key requirements:**
- Command name with / prefix
- Category emoji on line 3
- 5 required sections
- Clear examples

### Skill Structure

**Required sections:**
```markdown
# Skill Name

## PURPOSE
What knowledge this skill provides...

## KNOWLEDGE BASE
Core information...

## WHEN TO USE
Triggering scenarios...
```

**Key requirements:**
- Registered in skill-rules.json with triggers
- 3 required sections minimum
- References to resource files

### Resource Structure

**Required format:**
```markdown
# 🎨 Resource Name

**Resource for:** skill-name
**Load when:** usage context
**Last Updated:** YYYY-MM-DD

## Content
Detailed information...
```

**Key requirements:**
- Subject emoji in first heading
- Metadata section (Resource for, Load when)
- Well-organized content sections

---

## Emoji Selection

### Finding the Right Emoji

**Agents - Distinctive, role-specific:**
- 🎯 marketing-director (targeting/strategy)
- ✍️ copywriter (writing)
- 📊 analyst (data/charts)
- 🎨 brand-strategist (design/creativity)

**Commands - Category-based:**
- 📚 Teaching commands
- 🎯 Production commands
- 📝 Content commands
- 📊 Analysis commands

**Resources - Subject-appropriate:**
- 🎨 Tone and voice guidelines
- 👩‍💼 Persona profiles
- 📊 Data frameworks
- ⚖️ Legal requirements

### Using Pattern Files for Emoji Standards (v5.2+)

> **⚠️  UPDATED:** Emoji standards are now in pattern files, not `emoji-standards.json`

```bash
# View emoji mappings for agents
/pattern component_agent

# View all pattern-based standards
ls .claude/patterns/meta/component_*.md

# Search for specific emoji
grep "🎯" .claude/patterns/meta/component_agent.md
```

**Pattern files (single source of truth):**
- `.claude/patterns/meta/component_agent.md` - Agent emojis
- `.claude/patterns/meta/component_command.md` - Command category emojis
- `.claude/patterns/meta/component_pattern.md` - Pattern category emojis
- `.claude/patterns/meta/component_skill.md` - Skill emojis
- (and 4 more component types)

### Adding New Emoji Mappings

If creating a new component:

1. Choose appropriate emoji (check pattern file to avoid duplicates)
2. Update relevant pattern file (`.claude/patterns/meta/component_*.md`):
```markdown
### Emoji Standards

| Component Name | Emoji | Category |
|----------------|-------|----------|
| existing-agent | 🎯   | Marketing |
| new-agent      | 🔥   | Marketing |
```
3. Validators automatically read from patterns (no code changes needed)
4. Test with `/pre-check`

**Old method (DEPRECATED):**
- `emoji-standards.json` moved to `.claude/deprecated/`
- No longer used by validators (v5.2+)
- Will be removed in v6.0

---

## Integration Validation

### Valid Reference Formats

**Internal components:**
```markdown
@.claude/skills/brand-voice-guidelines.md
@.claude/patterns/create_campaign_plan.md
@.claude/agents/copywriter.md
```

**Teaching modules:**
```markdown
@teaching/1.1-welcome/CLAUDE.md
@teaching/2.3-patterns/exercises.md
```

**Resources:**
```markdown
@.claude/skills/resources/tone-by-format.md
```

### Common Integration Errors

**Broken path:**
```markdown
❌ @.claude/skills/nonexistent.md
✅ @.claude/skills/brand-voice-guidelines.md
```

**Missing extension:**
```markdown
❌ @.claude/patterns/create_campaign_plan
✅ @.claude/patterns/create_campaign_plan.md
```

**Wrong directory:**
```markdown
❌ @.claude/agent/copywriter.md
✅ @.claude/agents/copywriter.md
```

### Testing Integrations

After creation, verify references:
```bash
# Check for broken references
/system-health --verbose

# Look for your component in output
grep "your-component" output
```

---

## Auto-Correction

### How Auto-Correction Works

Pre-tool-use hooks automatically fix common issues:

1. **Detect issue** - Wrong naming, missing emoji, bad structure
2. **Apply fix** - Correct the content before writing
3. **Show changes** - Display what was corrected
4. **Write corrected file** - Save fixed version

### What Gets Auto-Corrected

**Naming:**
```
Input:  ContentResearcher
Auto:   content-researcher ✅
```

**Emojis:**
```
Input:  description: Marketing director specialist
Auto:   description: 🎯 Marketing director specialist ✅
```

**Structure:**
```
Input:  Missing "Quality Gates" section
Auto:   Adds section template ✅
```

### Auto-Correction Output

When you create a file with issues:
```
✨ AUTO-CORRECTED PRE-IMPLEMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Component: ContentResearcher (agent)

🔧 FIXES APPLIED:
   ✅ Renamed: ContentResearcher → content-researcher
   ✅ Added emoji: 🔎
   ✅ Added 2 required section(s)

⚠️  NOTE: Very similar component exists:
   📄 content-strategist (72% similar)
   Consider reviewing: .claude/agents/content-strategist.md

💡 File has been auto-corrected to match system standards
```

### Limitations

Auto-correction **CAN** fix:
- Naming convention errors
- Missing emojis (from standards)
- Missing section templates
- Basic structural issues

Auto-correction **CANNOT** fix:
- Logic errors in content
- Incorrect integration references
- Duplicate component decisions
- Complex structural problems

**Solution:** Use `/pre-check` first to catch issues auto-correction can't fix.

---

## Best Practices

### Before Creating Components

1. **Search first** - Use grep/find to check for similar components
2. **Review similar components** - Learn from existing patterns
3. **Plan integrations** - Identify which components to reference
4. **Choose emoji** - Select from emoji-standards.json (auto-added if missing)
5. **Choose descriptive name** - Follow naming conventions

### During Creation

1. **Follow templates** - Use existing components as examples
2. **Include all required sections** - Don't skip structure
3. **Add emoji correctly** - Right place, right format
4. **Reference properly** - Use @.claude/... format
5. **Write clear descriptions** - Be specific and actionable

### After Creation

1. **Review auto-corrections** - Understand what was fixed
2. **Test the component** - Ensure it works as expected
3. **Check system health** - Run `/system-health` if major change
4. **Update registries** - Add to appropriate JSON files
5. **Document integrations** - Note dependencies

### Component Creation Checklist

```
□ Searched for similar existing components
□ Chose distinctive, descriptive name
□ Included all required sections (or let auto-correction add them)
□ Added valid @-references only
□ Reviewed auto-correction output
□ Verified no similar components overlooked
□ Tested component works
□ Updated relevant registries if needed
□ Documented purpose and usage
```

---

## Common Validation Errors

### Error: "Expected kebab-case, found PascalCase"

**Cause:** Using wrong naming convention

**Fix:**
```
Wrong: ContentStrategist
Right: content-strategist
```

**Prevention:** Always use lowercase with hyphens for agents/skills/commands. Auto-correction will fix this.

---

### Warning: "Very similar component exists (92% similar)"

**Cause:** Creating duplicate or near-duplicate component

**Fix:**
1. Review the existing component
2. Consider enhancing existing instead of creating new
3. If truly different, choose more distinctive name

**Prevention:** Search before creating, review validation warnings

---

### Error: "Missing required section: Core Expertise"

**Cause:** Agent file missing required section

**Fix:** Add the missing section:
```markdown
## Core Expertise
[Description of what agent specializes in]
```

**Prevention:** Let auto-correction add missing sections automatically

---

### Error: "Missing emoji in YAML description"

**Cause:** Agent description doesn't start with emoji

**Fix:**
```yaml
# Wrong
description: Marketing director specialist

# Right
description: 🎯 Marketing director specialist
```

**Prevention:** Auto-correction adds emoji automatically from emoji-standards.json

---

### Error: "Broken reference: @.claude/nonexistent.md"

**Cause:** Reference to file that doesn't exist

**Fix:**
1. Create the referenced file, or
2. Remove the reference, or
3. Fix the path to correct file

**Prevention:** Validate all @-references exist before committing

---

### Error: "Pattern name should use snake_case"

**Cause:** Using kebab-case for pattern instead of snake_case

**Fix:**
```
Wrong: create-campaign-plan
Right: create_campaign_plan
```

**Prevention:** Remember patterns use underscore, not hyphen

---

## Troubleshooting

### Issue: /pre-check says name is taken but file doesn't exist

**Possible causes:**
- File was deleted but still in registry
- Typo in registry entry
- Cache issue

**Solution:**
1. Check all registries (skill-rules.json, pattern-index.json, etc.)
2. Remove stale entries
3. Run `/system-health` to verify

---

### Issue: Auto-correction not applying fixes

**Possible causes:**
- Hooks not enabled in settings.json
- TypeScript compilation errors
- Pre-tool-use hook not registered

**Solution:**
1. Check `.claude/settings.json` has PreToolUse hooks
2. Test hook: `npx ts-node .claude/hooks/pre-tool-use-write.ts`
3. Check for TypeScript errors

---

### Issue: Validation says structure invalid but sections exist

**Possible causes:**
- Section headers have typos
- Wrong heading level (### vs ##)
- Sections in wrong order

**Solution:**
1. Check exact section names (case-sensitive)
2. Use ## for required sections
3. Follow template order

---

### Issue: Can't find appropriate emoji in standards

**Possible causes:**
- New component type not in emoji-standards.json
- Standards file out of date

**Solution:**
1. Choose appropriate emoji from Unicode
2. Add to emoji-standards.json
3. Update version and timestamp
4. Test with `/pre-check`

---

## Summary

### Quick Reference

**Naming:**
- Agents/Skills/Commands: kebab-case
- Patterns: snake_case

**Structure:**
- Include all required sections
- Add emoji from emoji-standards.json
- Use valid @-references only

**After creating:**
- Review auto-corrections
- Test component works
- Run `/system-health` if needed

### Key Takeaways

1. **Trust auto-correction** - Hooks automatically fix common mistakes
2. **Review warnings** - Pay attention to similar component alerts
3. **Follow templates** - Use existing components as guides
4. **Search for duplicates** - Don't recreate existing components
5. **Let automation work** - Emoji, naming, structure fixed automatically

### Resources

- **Component patterns** (`.claude/patterns/meta/component_*.md`) - Emoji standards source of truth
- **pre-tool-use-write.ts** - Auto-correction hook for new files
- **pre-tool-use-edit.ts** - Auto-correction hook for edits
- **/system-health command** - System-wide validation
- **component-consistency-validator.ts** - Validation utility source
- **component-health-checker.ts** - Health check utility source

---

**Last Updated:** 2025-11-11
**Version:** 1.1
**Maintainer:** System Architecture
**Related:** component patterns, system-health.md, pre-tool-use-write.ts, pre-tool-use-edit.ts
