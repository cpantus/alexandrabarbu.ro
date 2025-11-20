# Skills System Architecture (hal-10k-core)

**Version:** 5.6.0
**Status:** Official Claude Code Format
**Specification:** https://code.claude.com/docs/en/skills.md

---

## Overview

Skills are **auto-activating knowledge modules** that provide Claude with domain expertise. They are organized as directories with a `SKILL.md` file following the official Claude Code specification.

---

## Directory Structure (Official Format)

```
skills/
└── skill-name/                    # Skill directory
    ├── SKILL.md                   # Main skill file (required)
    ├── resources/                 # Supporting documentation (optional)
    │   ├── resource-1.md
    │   └── resource-2.md
    └── scripts/                   # Helper scripts (optional)
        └── helper.py
```

**Key Points:**
- **Directory-based:** Each skill is a directory, not a standalone file
- **SKILL.md required:** Main file must be named `SKILL.md` (uppercase)
- **Progressive disclosure:** Resources loaded on-demand to save tokens
- **Self-contained:** All skill-specific content in skill's directory

---

## SKILL.md Format

Every `SKILL.md` must start with YAML frontmatter:

```yaml
---
name: "skill-name"  # lowercase, numbers, hyphens only (max 64 chars)
description: "Brief description of what this Skill does and when to use it. Include trigger keywords that users would mention. Max 1024 characters."
allowed-tools: Read, Grep, Glob  # optional - restricts Claude's capabilities
---

# Skill Name

[Skill content here...]
```

### Required Fields

**name:**
- Identifier for the skill
- Must match directory name
- Lowercase, hyphens, numbers only
- Max 64 characters
- Example: `"design-excellence"`, `"mcp-code-execution"`

**description:**
- What the skill does AND when to use it
- Include trigger keywords for model-invoked activation
- Max 1024 characters
- Examples:
  - "Provides React best practices for component design, hooks, state management, and performance optimization. Activate when building React components or debugging React applications."
  - "Expert design guidance for data visualizations. Activate when creating charts, dashboards, infographics, or any data visualization."

### Optional Fields

**allowed-tools:**
- Comma-separated list of Claude Code tools
- Restricts capabilities when skill is active
- Use for read-only or scope-restricted workflows
- Example: `Read, Grep, Glob` (no file modifications)

---

## Activation Model

Skills are **model-invoked** - Claude autonomously decides when to activate them based on:

1. **User request context** - What the user is asking for
2. **Description matching** - Keywords in skill description
3. **Task relevance** - How well skill applies to current task

This differs from:
- **Slash commands:** Require explicit user invocation (`/command`)
- **Manual loading:** User references skill (`@skill-name`)

**Example Flow:**
```
User: "Let's design a React dashboard"
  → Claude detects "design" and "React" keywords
  → Matches design-excellence and frontend-best-practices skills
  → Auto-activates relevant skills
  → Applies principles in response
```

---

## Storage Locations

Skills can be stored in three locations:

### 1. Personal Skills (`~/.claude/skills/`)
- User-specific knowledge
- Not shared with team
- Persists across projects
- Examples: personal coding preferences, workflow shortcuts

### 2. Project Skills (`.claude/skills/`)
- Project-specific knowledge
- Team-shared (git-tracked)
- Version-controlled
- Examples: project conventions, domain knowledge

### 3. Plugin Skills (`plugin-name/skills/`)
- Bundled with Claude Code plugins
- Distributed via plugin system
- Examples: hal-10k-core skills, code-plugin skills

---

## hal-10k-core Skills

**Location:** `core/infrastructure/skills/`

**Available Skills (v5.6.0):**

1. **data-visualization-designer/**
   - Expert design guidance for truthful data visualizations
   - Chart selection, color strategy, visual encoding
   - Auto-activates: data viz, dashboard, chart, infographic

2. **design-excellence/**
   - Design principles for distinctive, professional interfaces
   - Typography, color systems, motion, themes
   - Auto-activates: design, UX, UI, frontend, typography

3. **diagram-drawing/**
   - Chart.js/D3.js implementation for diagrams
   - Technical implementation, export formats
   - Auto-activates: diagram, chart, graph, visualization

4. **mcp-code-execution/**
   - 96-98% token reduction for MCP workflows
   - Code execution pattern for 3+ tool calls
   - Resources: mcp-examples, mcp-integration-guide, mcp-patterns, mcp-setup-guide

5. **skill-developer/**
   - Meta-skill for creating other skills
   - Template-first approach, structure validation

6. **skill-template/**
   - Official template for new skills
   - Structure requirements, YAML frontmatter format
   - Best practices guide

---

## Progressive Disclosure

Skills use **progressive disclosure** to minimize token usage:

### Token Budget
- **Base skill:** <500 lines (core principles, quick reference)
- **Resources:** Unlimited (loaded on-demand)
- **Total savings:** 40-60% vs monolithic files

### Loading Tiers
1. **Minimal/Quick tier:** Core principles only (200-300 lines)
2. **Full tier:** Complete skill content (400-500 lines)
3. **Resources:** Always on-demand (never auto-loaded)

### Resource Loading
```markdown
# In skill content:
For detailed examples, see @skill-name/resources/examples.md

# User references resource:
@design-excellence/resources/typography-guide.md
```

---

## Skill Composition (v5.5.0)

Multiple skills can work together with **quality multipliers**:

### Example: visual-design-excellence (3.2x quality)
- `data-visualization-designer` - Truthful data encoding
- `design-excellence` - Aesthetic polish
- `diagram-drawing` - Technical implementation

**Combined result:** Professional-grade visualizations with truthful data, distinctive design, and solid implementation.

---

## Enforcement Levels

Skills have different enforcement levels based on quality criticality:

### suggest (Informational)
- Gentle recommendation
- No blocking
- User can ignore
- Example: Code style guides

### warn (Strong Warning)
- Important but not critical
- Non-blocking message
- User should consider
- Example: Frontend best practices

### require (Mandatory)
- AUTO-LOADS skill into Claude's context
- Mandatory application
- Quality guarantee
- Examples: design-excellence, security-guidelines

**The Application Guarantee:**
"require" enforcement GUARANTEES the skill is in Claude's context and MUST be applied. Reading without application is useless.

---

## Creating New Skills

### Step 1: Create Directory Structure
```bash
mkdir -p skills/my-skill
touch skills/my-skill/SKILL.md
```

### Step 2: Add YAML Frontmatter
```yaml
---
name: "my-skill"
description: "What this skill does. Include trigger keywords like 'example' and 'demo'."
---
```

### Step 3: Write Skill Content
Follow the skill-template structure:
- Purpose section
- Core principles
- Required standards
- Anti-patterns to avoid
- Examples
- Validation checklist

### Step 4: Add Resources (Optional)
```bash
mkdir -p skills/my-skill/resources
touch skills/my-skill/resources/detailed-guide.md
```

### Step 5: Test Activation
- Start Claude Code session
- Use trigger keywords from description
- Verify skill auto-activates
- Check content is applied

---

## v5.4.0 Structure Requirements

All skills created after v5.4.0 MUST include:

### 1. Task Decomposition Override Section
- Overrides Claude's default task breakdown
- 3-phase mandatory sequence (typically)
- ❌ PROHIBITED anti-patterns with consequences
- ✅ MANDATORY application steps
- Output acknowledgment formats

**Example phases:**
- **Design skills:** "Design System Decisions" → "Implementation" → "Validation"
- **Technical skills:** "Architecture Analysis" → "Implementation" → "Testing"
- **Process skills:** "Context Analysis" → "Execution" → "Review"

### 2. Language Standards Section
- Enforces directive language (YOU MUST/DO NOT)
- Prohibits weak language (should/consider/might)
- Rationale: Weak language leads to inconsistent application

### 3. MANDATORY Pre-Work Checklist
- Must be completed before applying skill
- Includes reading requirements
- Output format acknowledgment
- Skill-specific requirements
- Multi-skill composition checks

---

## Integration with Infrastructure

### Hooks
- **user-prompt-submit.ts** - Detects skill matches, auto-loads
- **post-tool-use-multiskill.ts** - Validates composition usage

### Utilities
- **skill-loader.ts** - Progressive loading, tier-based
- **skill-matcher.ts** - Match prompts to skills
- **composition-matcher.ts** - Detect multi-skill compositions

### Configuration
- **skill-rules.json** - Skill registration, triggers, enforcement
- **skill-composition-rules.json** - Multi-skill compositions
- **docs-index.json** - Resource loading configuration

---

## Migration from Legacy Format

**Legacy format (v5.5.0 and earlier):**
```
skills/
├── skill-name.md              # Standalone file
└── resources/                 # Shared resources
    └── skill-name/
```

**Official format (v5.6.0+):**
```
skills/
└── skill-name/                # Directory
    ├── SKILL.md               # Main file
    └── resources/             # Skill-specific resources
```

**See:** `dev/archive/migrations/v5.6.0-skills-migration.md` for detailed migration instructions (v5.5.0 → v5.6.0).

---

## Best Practices

### Writing Effective Descriptions
- Include specific keywords users would mention
- Describe both functionality AND usage triggers
- Be concise but comprehensive (max 1024 chars)
- Think about user language, not technical terms

**Good:**
> "Provides React best practices for component design, hooks, state management, and performance optimization. Activate when building React components or debugging React applications."

**Bad:**
> "React skill."

### Token Optimization
- Keep base skill <500 lines
- Move detailed examples to resources
- Use progressive disclosure
- Reference resources explicitly

### Quality Gates
- Use Task Decomposition Override
- Include PROHIBITED sequences
- Provide MANDATORY sequences
- Add validation checklists

### Activation Tuning
- Test trigger keywords in real scenarios
- Monitor false positives/negatives
- Adjust description if needed
- Balance specificity vs coverage

---

## Testing Skills

### Unit Testing
```bash
# Test skill file exists
test -f skills/my-skill/SKILL.md

# Validate YAML frontmatter
npx tsx -e "console.log(require('js-yaml').load(fs.readFileSync('skills/my-skill/SKILL.md', 'utf-8')))"
```

### Integration Testing
1. Start Claude Code session
2. Use trigger keywords
3. Verify skill auto-activates
4. Check content appears in context
5. Test resource loading

### Quality Validation
- Use `/pattern component_skill` for structure validation
- Check directive language (no "should", "consider")
- Verify 3-phase Task Decomposition Override
- Test enforcement level behavior

---

## Performance Metrics

**Token Usage:**
- Base skill: 200-500 tokens (progressive disclosure)
- With resources: 500-2000 tokens (on-demand)
- Monolithic (legacy): 1000-3000 tokens always

**Savings:** 40-60% via progressive disclosure

**Loading Time:**
- Tier detection: <10ms
- File read: <50ms
- Format injection: <10ms
- **Total:** <100ms per skill

---

## Resources

- **Official Spec:** https://code.claude.com/docs/en/skills.md
- **Migration Guide:** `dev/archive/migrations/v5.6.0-skills-migration.md` (v5.5.0 → v5.6.0)
- **Skill Template:** `core/infrastructure/skills/skill-template/SKILL.md`
- **Component Pattern:** `core/infrastructure/patterns/meta/component_skill.md`

---

**Last Updated:** 2025-01-14
**hal-10k-core Version:** 5.6.0
**Format:** Official Claude Code
