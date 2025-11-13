# Generate Reference Material

**Command:** `/generate-reference [module-id]`
**Purpose:** Auto-generate supporting reference documentation for teaching modules
**Model:** sonnet
**Category:** Teaching Infrastructure

---

## Description

The `/generate-reference` command automatically creates comprehensive reference materials for teaching modules by extracting relevant content from existing patterns, agents, skills, and documentation.

**What it generates:**
- Topic-specific reference guides
- Pattern examples and templates
- Agent usage documentation
- Skill reference sheets
- Best practices and standards

**Output location:** `marketing-plugin/teaching/{module-id}-{name}/reference/`

---

## Usage

```bash
# Generate reference materials for a specific module
/generate-reference 2.15

# Generate with specific topics
/generate-reference 2.13 --topics "workflow patterns, agent coordination"

# Preview what would be generated (dry run)
/generate-reference 1.11 --dry-run
```

---

## How It Works

### Step 1: Module Metadata Extraction

Load the teaching module metadata from `.claude/teaching-index.json` and command file:
- Module title and overview
- Prerequisites and dependencies
- Referenced materials (from command metadata)
- Integration points with other modules
- Learning objectives

### Step 2: Topic Identification

Analyze module content to identify key topics:
- **From module title:** Extract main concepts (e.g., "Fleet Orchestration" → orchestration, fleet management, coordination)
- **From reference materials:** Parse mentioned files (e.g., `@teaching/2.15-v4-orchestration/orchestration-patterns.md`)
- **From integration points:** Related modules and their topics
- **From --topics flag:** User-specified additional topics

### Step 3: Content Sourcing

Search existing components for relevant examples:

**Patterns:**
- Search `core/infrastructure/patterns/**/*.md` and `marketing-plugin/patterns/**/*.md`
- Match topic keywords in pattern names and content
- Extract pattern structure, usage examples, and templates

**Agents:**
- Search `core/infrastructure/agents/**/*.md` and `marketing-plugin/agents/**/*.md`
- Find agents related to module topics
- Extract agent capabilities, usage patterns, and best practices

**Skills:**
- Search `marketing-plugin/skills/**/*.md`
- Match topic keywords to skill triggers and content
- Extract relevant knowledge sections

**Documentation:**
- Search `core/docs/**/*.md`
- Find related architectural patterns and standards
- Extract relevant sections

### Step 4: Reference Generation

Create structured reference documents:

1. **{topic}-guide.md** - Comprehensive topic overview
   - What it is and why it matters
   - Core concepts and terminology
   - Common use cases
   - Best practices
   - Anti-patterns to avoid

2. **{topic}-examples.md** - Real-world examples
   - Code samples from patterns/agents
   - Complete workflows
   - Before/after comparisons
   - Common scenarios

3. **{topic}-reference.md** - Quick reference sheet
   - Command syntax
   - Parameter options
   - Common flags and configurations
   - Troubleshooting guide

4. **integration-examples.md** - Cross-module connections
   - How this module builds on prerequisites
   - How concepts connect to related modules
   - Workflow combinations

### Step 5: Output Organization

```
marketing-plugin/teaching/{module-id}-{name}/
├── CLAUDE.md                        # Teaching script (already exists)
└── reference/                       # Generated reference materials
    ├── orchestration-patterns.md    # Topic guide with examples
    ├── agent-lifecycle-guide.md     # Management reference
    ├── interactive-mode-examples.md # Usage scenarios
    ├── cost-optimization-guide.md   # Best practices
    └── quick-reference.md           # Cheat sheet
```

---

## Generation Strategy

### For Each Topic:

1. **Search Phase:**
   ```typescript
   const patterns = await glob(`**/*${topic}*.md`, {cwd: 'patterns'})
   const agents = await glob(`**/*${topic}*.md`, {cwd: 'agents'})
   const skills = await searchSkills(topic)
   const docs = await searchDocs(topic)
   ```

2. **Extract Phase:**
   - Read matching files
   - Extract relevant sections (## headings matching topic keywords)
   - Capture code examples and templates
   - Identify best practices and warnings

3. **Synthesize Phase:**
   - Combine examples from multiple sources
   - Organize by use case or complexity
   - Add explanatory text for teaching context
   - Create cross-references

4. **Format Phase:**
   - Apply consistent markdown structure
   - Add table of contents for long docs
   - Include "See also" sections
   - Add last-updated timestamp

---

## Example: Module 2.15 (Fleet Orchestration)

**Command:** `/generate-reference 2.15`

**Input (from command metadata):**
```markdown
**Reference Materials:**
- `@teaching/2.15-v4-orchestration/orchestration-patterns.md`
- `@teaching/2.15-v4-orchestration/agent-lifecycle-guide.md`
- `@teaching/2.15-v4-orchestration/interactive-mode-examples.md`
```

**Generation Process:**

1. **Identify topics:** orchestration, patterns, agent lifecycle, interactive mode

2. **Search components:**
   - Patterns: `orchestrator.md`, `task-coordinator.md`, workflow patterns
   - Agents: `orchestrator.md`, `task-coordinator.md`, specialist agents
   - Docs: `agent-orchestration.md`, `hook-architecture.md`
   - Skills: automation-workflows

3. **Generate files:**

**`orchestration-patterns.md`:**
```markdown
# Orchestration Patterns

## Overview
Fleet orchestration enables coordination of multiple specialized agents...

## 6 Core Patterns

### 1. Migration Pattern
**Use case:** Move codebase from v4.2 to v5.0
**Agents:** scout-haiku → plan → multiple builders
**Example:**
[Extract from orchestrator.md and actual usage examples]

### 2. Implementation Pattern
...

## When to Use Each Pattern
[Decision tree based on task characteristics]

## Best Practices
- Start simple (2-3 agents) before scaling
- Use /observe to monitor progress
- Set cost budgets upfront
...
```

**`agent-lifecycle-guide.md`:**
```markdown
# Agent Lifecycle Management

## CRUD Operations

### Create
Agents spawn automatically with /workflow or manually:
[Command examples from workflow patterns]

### Monitor
Use /observe [id] to check status:
[Examples with sample output]

### Cleanup
[Best practices and commands]
```

**`interactive-mode-examples.md`:**
```markdown
# Interactive Mode Workflows

## Example 1: High-Stakes Launch Campaign
**Scenario:** $50K budget, CEO review required
**Workflow:**
[Step-by-step interactive session]

## Example 2: ...
```

**Generated output:** 4 reference files totaling ~15-20 pages of documentation

---

## Template Structure

### Topic Guide Template:

```markdown
# [Topic] Guide

**Module:** [Module ID]
**Last Generated:** [Date]
**Source Components:** [List of patterns/agents/skills used]

---

## Overview

### What is [Topic]?
[1-2 paragraph explanation]

### Why It Matters
[Value proposition for marketing use case]

### When to Use
[Decision criteria]

---

## Core Concepts

### Concept 1: [Name]
**Definition:** ...
**Example:** ...
**Related:** ...

[Repeat for each concept]

---

## Common Use Cases

### Use Case 1: [Scenario]
**Problem:** ...
**Solution:** ...
**Implementation:**
```bash
[command]
```
**Expected Result:** ...

[Repeat for 3-5 use cases]

---

## Best Practices

1. **[Practice Name]**
   - Why: ...
   - How: ...
   - Example: ...

[Repeat for 5-10 practices]

---

## Anti-Patterns (What NOT to Do)

❌ **[Anti-pattern Name]**
- Why it's wrong: ...
- Correct approach: ...

[Repeat for common mistakes]

---

## Troubleshooting

**Problem:** [Common issue]
**Cause:** ...
**Solution:** ...

[Repeat for 5-10 common issues]

---

## See Also

- Module [X.Y]: [How it relates]
- Pattern: [Related pattern]
- Agent: [Related agent]
- Skill: [Related skill]

---

**Generated:** [Timestamp]
**Module:** [Module ID]
```

---

## Command Options

### Required:
- `module-id` - Module identifier (e.g., "2.15", "1.11")

### Optional:
- `--topics "topic1, topic2"` - Additional topics to include
- `--dry-run` - Preview what would be generated without creating files
- `--force` - Overwrite existing reference materials
- `--format [detailed|quick-reference|both]` - Output format (default: both)
- `--output-dir [path]` - Custom output directory (default: auto-detected)

---

## Implementation Details

**Language:** TypeScript
**Location:** `core/infrastructure/utils/reference-generator.ts`

**Key Functions:**
```typescript
async function generateReference(moduleId: string, options: Options) {
  // 1. Load module metadata
  const module = await loadModuleMetadata(moduleId)

  // 2. Identify topics
  const topics = await identifyTopics(module, options.topics)

  // 3. Search components
  const components = await searchComponents(topics)

  // 4. Generate reference docs
  const docs = await synthesizeReferences(topics, components)

  // 5. Write output
  await writeReferenceDocs(module, docs, options)
}

async function identifyTopics(module: ModuleMetadata, additionalTopics?: string): Promise<string[]> {
  const topics: string[] = []

  // Extract from title
  topics.push(...extractKeywords(module.title))

  // Extract from reference materials
  if (module.referenceMaterials) {
    topics.push(...parseReferencePaths(module.referenceMaterials))
  }

  // Add user-specified topics
  if (additionalTopics) {
    topics.push(...additionalTopics.split(',').map(t => t.trim()))
  }

  return [...new Set(topics)] // Deduplicate
}

async function searchComponents(topics: string[]): Promise<ComponentMatches> {
  const results = {
    patterns: [],
    agents: [],
    skills: [],
    docs: []
  }

  for (const topic of topics) {
    // Search patterns
    results.patterns.push(...await glob(`**/*${topic}*.md`, {cwd: 'patterns'}))

    // Search agents
    results.agents.push(...await glob(`**/*${topic}*.md`, {cwd: 'agents'}))

    // Search skills (by trigger keywords)
    results.skills.push(...await searchSkillsByKeyword(topic))

    // Search documentation
    results.docs.push(...await searchDocsContent(topic))
  }

  return results
}
```

---

## Usage Examples

### Example 1: Generate for Module 2.15 (Fleet Orchestration)

```bash
$ /generate-reference 2.15

Generating reference materials for Module 2.15: Fleet Orchestration...

Identified topics:
- orchestration
- patterns
- agent lifecycle
- interactive mode
- cost optimization

Searching components...
  Patterns: 8 matches
  Agents: 5 matches
  Skills: 2 matches
  Docs: 3 matches

Generating reference docs...
  ✅ orchestration-patterns.md (6,234 words)
  ✅ agent-lifecycle-guide.md (3,892 words)
  ✅ interactive-mode-examples.md (4,567 words)
  ✅ cost-optimization-guide.md (2,341 words)
  ✅ quick-reference.md (1,023 words)

Output: /home/cere/Work/marketing-agent-v5/marketing-plugin/teaching/2.15-fleet-orchestration/reference/

Reference materials generated successfully! (18,057 words total)
```

### Example 2: Generate with Custom Topics

```bash
$ /generate-reference 1.11 --topics "markdown, frontmatter, progressive disclosure"

Generating reference materials for Module 1.11: Creating Custom Skills...

Identified topics:
- skills
- custom
- markdown
- frontmatter
- progressive disclosure
- auto-activation

[... generation process ...]
```

### Example 3: Dry Run

```bash
$ /generate-reference 2.2 --dry-run

DRY RUN: Module 2.2 - Analyze Campaign Data

Would generate:
- email-analytics-guide.md (estimated 4,500 words)
  Sources: analyst.md, email_campaign pattern, campaign_analytics pattern

- persona-segmentation-guide.md (estimated 3,200 words)
  Sources: audience-research.md skill, analyst.md agent

- ab-testing-guide.md (estimated 5,100 words)
  Sources: ab_test.md pattern, conversion_optimization.md pattern

- dataset-reference.md (estimated 2,800 words)
  Sources: DATASET-CATALOG.md, email-campaign-metrics.csv structure

Total estimated output: 15,600 words across 4 files

Run without --dry-run to generate.
```

---

## Benefits

1. **Time Savings:** Automated generation vs. manual writing (5x faster)
2. **Consistency:** All reference docs follow same structure
3. **Accuracy:** Sourced from actual production components
4. **Completeness:** Covers all relevant topics systematically
5. **Maintainability:** Regenerate when components update

---

## Limitations

- **Quality depends on source content:** If patterns/agents lack examples, generated docs will too
- **Manual review recommended:** Auto-generated content may need editing for clarity
- **No custom examples:** Uses only existing component examples
- **Topic identification heuristic:** May miss some relevant topics

**Best Practice:** Use as starting point, then enhance with custom examples and teaching-specific explanations.

---

## See Also

- **Teaching Index:** `.claude/teaching-index.json` - Module metadata source
- **Dataset Catalog:** `marketing-plugin/teaching/DATASET-CATALOG.md` - Dataset information
- **Component Patterns:** See individual pattern/agent/skill files

---

**Version:** 1.0
**Last Updated:** 2025-11-11
**Status:** Ready for implementation
