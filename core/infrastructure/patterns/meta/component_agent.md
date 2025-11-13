# Pattern: Component - Agent

**Type:** Meta-pattern (defines component standards)
**Category:** System Architecture
**Complexity:** Medium
**Purpose:** Define structure, validation rules, and standards for specialized marketing agents

---

## PURPOSE

Ensure all agents follow consistent naming conventions, structural requirements, emoji standards, and quality guidelines to maintain system cohesion and enable validation/generation.

---

## INPUT

When creating or validating an agent:

**Required Fields:**
- `agentName` - Agent identifier (kebab-case)
- `agentType` - Agent category (marketing-specialist, orchestrator, cost-optimized)
- `emoji` - Distinctive emoji representing agent's domain
- `purpose` - One-sentence description of agent's core expertise
- `tools` - Array of tools agent can use (Read, Write, Edit, Task, Bash, etc.)
- `model` - Claude model to use (sonnet, opus, haiku)
- `thinking` - Thinking mode (think, think-hard, ultrathink)

**Optional Fields:**
- `promptCaching` - Whether to enable prompt caching (for large context agents)
- `costOptimization` - Special cost optimization strategies
- `category` - Additional categorization

---

## RULES

### Naming Convention

**Format:** kebab-case
**Regex:** `/^[a-z0-9]+(-[a-z0-9]+)*$/`
**Examples:**
- ✅ `marketing-director` - Correct
- ✅ `llm-seo-expert` - Correct
- ✅ `ai-growth-hacker` - Correct
- ❌ `MarketingDirector` - PascalCase (invalid)
- ❌ `marketing_director` - snake_case (invalid)
- ❌ `mkt-dir` - Too abbreviated (avoid)

**Rationale:**
- kebab-case is standard for filenames and URLs
- Improves readability in file listings
- Consistent with command and skill naming
- Compatible with all operating systems

**Constraints:**
- Minimum length: 3 characters
- Maximum length: 50 characters
- Must start and end with alphanumeric
- No consecutive separators (`--`)
- Use descriptive, unabbreviated names

### Required Structure

#### YAML Frontmatter

All agents MUST have YAML frontmatter at top of file:

```yaml
---
name: "agent-name"
description: "🎯 One-sentence description of agent's core expertise"
tools:
  - Read
  - Write
  - Task
model: "sonnet"  # or "opus" or "haiku"
thinking: "think"  # or "think-hard" or "ultrathink"
---
```

**Field Requirements:**
- `name` - Must match filename (without .md extension)
- `description` - Must start with emoji, then concise expertise statement
- `tools` - Array of tool names (valid: Read, Write, Edit, MultiEdit, Task, Bash, Grep, Glob, etc.)
- `model` - One of: "sonnet" (default), "opus" (highest quality), "haiku" (cost-optimized)
- `thinking` - One of: "think" (default), "think-hard" (complex reasoning), "ultrathink" (maximum depth)

**Optional Fields:**
```yaml
promptCaching: true  # For agents with large context (analyst, brand-strategist, growth-hacker)
cacheFiles:  # External cache files to load (when promptCaching: true)
  - .claude/knowledge/cache/brand-context.md
  - .claude/knowledge/cache/audience-context.md
category: "specialist"  # Or "orchestrator", "cost-optimized"
```

#### Prompt Caching Requirements (When promptCaching: true)

**When to Enable Caching:**
- Agent has >15,000 token context (large knowledge base)
- Agent invoked iteratively (analysis, planning, content creation)
- Agent references reusable knowledge (frameworks, benchmarks, templates)

**Required YAML Fields:**
```yaml
promptCaching: true
cacheFiles:
  - .claude/knowledge/cache/[domain]-context.md  # List all cache files used
```

**Required Markdown Sections (in this order):**

1. **## PROMPT CACHING OPTIMIZATION** (immediately after H1 title)
   - Brief explanation of caching strategy
   - Cacheable vs variable content breakdown
   - Cache window explanation (5 minutes default)
   - Cost impact estimates (first invocation vs cache hits)

2. **## CACHEABLE CONTEXT (Load First)**
   - Summary of knowledge loaded from cache files
   - Reference each cache file with `**Source:** @path/to/file.md`
   - Brief description of what each cache contains
   - Note: "These cache files are loaded automatically by hooks"

3. **## END CACHEABLE CONTEXT**
   - Marker indicating end of cached content
   - Note: "*Above content is cached for 5 minutes. Below content changes per task.*"

**Structure Example:**
```markdown
---
name: example-agent
promptCaching: true
cacheFiles:
  - .claude/knowledge/cache/domain-context.md
  - .claude/knowledge/cache/brand-context.md
---

# Example Agent

Agent description here.

---

## PROMPT CACHING OPTIMIZATION

**This agent is optimized for prompt caching to reduce costs on iterative workflows.**

### Caching Strategy

**Cacheable content (loaded first, 10% cost on cache hits):**
1. Domain frameworks and templates
2. Brand guidelines
3. Performance benchmarks

**Variable content (loaded last, full cost):**
4. Specific task requirements

**Cache window:** 5 minutes (subsequent invocations reuse cached context)

**Cost impact:**
- First invocation: ~$0.12 (full cost)
- Invocations 2-10 within 5 min: ~$0.02 each (83% savings)
- Effective cost for batch work: ~$0.04/invocation avg

---

## CACHEABLE CONTEXT (Load First)

**This agent uses external cache files for optimal prompt caching. The following knowledge is automatically loaded from cache:**

### 1. Domain Knowledge
**Source:** @.claude/knowledge/cache/domain-context.md

- Framework details
- Templates and examples
- Best practices

### 2. Brand Standards
**Source:** @.claude/knowledge/cache/brand-context.md

- Brand voice and tone
- Vocabulary preferences
- Quality standards

**Note:** These cache files are loaded automatically by hooks. You do not need to manually reference them.

---

## END CACHEABLE CONTEXT

*Above content is cached for 5 minutes. Below content changes per task.*

---

## Core Expertise
[Rest of agent content...]
```

**Cache File Requirements:**
- Each cache file must be 2,000-3,000 tokens (enforced by pre-tool-use-write.ts hook)
- Cache files must be in `.claude/knowledge/cache/` directory
- File naming: `[domain]-context.md` (e.g., `analytics-context.md`, `seo-context.md`)
- Cache files are reusable across multiple agents

**Validation Rules:**
- If `promptCaching: true` → MUST include all 3 caching sections (OPTIMIZATION, CACHEABLE CONTEXT, END)
- If `cacheFiles` array present → All files must exist
- Cached sections must appear BEFORE variable content (after H1, before Core Expertise)
- Cache files referenced in CACHEABLE CONTEXT must match cacheFiles array

#### Required Markdown Sections

All agents MUST include these sections in order:

1. **## Core Expertise** (150-300 words)
   - What the agent does
   - Primary capabilities
   - When to use this agent
   - What makes it specialized

2. **## When to Invoke** (100-200 words)
   - Specific trigger conditions
   - Task types that need this agent
   - Coordination scenarios (which other agents to pair with)
   - Anti-patterns (when NOT to use this agent)

3. **## Workflow Protocol** (200-400 words)
   - Step-by-step execution process
   - Tool usage patterns
   - Output format expectations
   - Integration with skills/patterns
   - Coordination protocol (if orchestrator)

4. **## Quality Gates** (100-200 words)
   - Self-review checklist
   - Quality standards specific to agent's domain
   - Validation criteria
   - Hand-off requirements (what next agent needs)

**Optional Sections:**
- `## Examples` - Real-world usage examples
- `## Integration Points` - Skills, patterns, other agents this coordinates with
- `## Cost Optimization` - Strategies for efficient operation (Haiku agents)
- `## Prompt Caching Strategy` - When/how caching is used

### Emoji Standards

**Complete Agent Emoji Mapping:**

| Agent Name | Emoji | Fallback | Category |
|-----------|-------|----------|----------|
| marketing-director | 🎯 | [Strategy] | Marketing Specialist |
| copywriter | ✍️ | [Copy] | Marketing Specialist |
| analyst | 📊 | [Analytics] | Marketing Specialist |
| brand-strategist | 🎨 | [Brand] | Marketing Specialist |
| content-strategist | 📝 | [Content] | Marketing Specialist |
| growth-hacker | 🚀 | [Growth] | Marketing Specialist |
| ai-growth-hacker | 🤖 | [AI Growth] | Marketing Specialist |
| llm-seo-expert | 🔍 | [SEO] | Marketing Specialist |
| automation-expert | ⚙️ | [Automation] | Marketing Specialist |
| viral-expert | 🌟 | [Viral] | Marketing Specialist |
| orchestrator | 🎼 | [Orchestration] | Orchestrator |
| demo-orchestrator | 🎬 | [Demo] | Orchestrator |
| demo-personalize-orchestrator | 🛍️ | [E-commerce] | Orchestrator |
| task-coordinator | 📋 | [Coordination] | Orchestrator |
| task-implementer | 🔨 | [Implementation] | Orchestrator |
| scout-haiku | 🔎 | [Scout] | Cost-Optimized |
| copywriter-haiku | ✍️ | [Fast Copy] | Cost-Optimized |
| content-strategist-haiku | 📝 | [Fast Content] | Cost-Optimized |

**Emoji Selection Guidelines:**

When adding a new agent:

1. **Semantic Match** - Emoji should visually represent agent's domain
   - Strategy → 🎯 target
   - Copy → ✍️ writing
   - Analytics → 📊 chart
   - Brand → 🎨 artist palette

2. **Distinctiveness** - Must be unique among agents
   - Check existing emojis before choosing
   - Haiku variants CAN reuse emoji of full version (e.g., copywriter-haiku uses ✍️)
   - But core agents should all be distinct

3. **Universal Support** - Must render correctly on all platforms
   - Test on macOS, Linux, Windows
   - Verify in terminal environments
   - Avoid newly-introduced emojis (last 2 years)
   - Stick to Unicode standard emojis

4. **Accessibility** - Always pair with text
   - Format: `🎯 Strategic marketing leadership specialist`
   - Never use emoji alone as identifier
   - Include fallback text in systems that don't render emojis

**Emoji Placement:**
- YAML `description` field: `description: "🎯 Agent description"`
- First character, followed by space
- Not used elsewhere in agent file (only YAML)

### Similarity Detection

**Algorithm:** Levenshtein distance + word overlap analysis

**Thresholds:**
- **>85% similar** - ERROR (likely duplicate)
- **60-85% similar** - WARNING (review carefully)
- **<60% similar** - OK (distinct enough)

**What's Checked:**
- Agent name similarity (edit distance)
- Description similarity (keyword overlap)
- Core expertise similarity (TF-IDF cosine similarity)

**Why This Matters:**
- Prevents duplicate agents with slightly different names
- Ensures clear separation of concerns
- Helps identify when to extend existing agent vs create new one

**Examples:**
- `content-strategist` vs `content-strategy-expert` → 85% similar (too close)
- `copywriter` vs `copy-editor` → 70% similar (warning, but could be distinct roles)
- `analyst` vs `copywriter` → 15% similar (distinct)

### Integration References

**Valid Reference Formats:**
- Skills: `@.claude/skills/[skill-name].md`
- Patterns: `@.claude/patterns/[category]/[pattern-name].md`
- Knowledge: `@.claude/knowledge/[category]/[file].md`
- Other agents: `@.claude/agents/[agent-name].md`
- Lesson modules: `@teaching/[module]/[file].md`

**Validation:**
- All `@` references must resolve to existing files
- Use relative paths from project root
- Include file extension (.md, .ts, .json)
- Check references are not broken on file renames

**Common Integration Points:**
- Agents often reference 2-4 skills
- Agents may chain to specific patterns
- Orchestrators reference other agents
- All agents should reference quality checklists

### Model Selection Guidelines

**Sonnet (default):**
- Best balance of quality, speed, and cost
- Use for most marketing specialists
- Good for 90% of tasks

**Opus:**
- Highest quality and reasoning
- Use for critical strategic decisions
- Rarely needed (marketing-director could use for major campaigns)
- 3x cost of Sonnet

**Haiku:**
- 75% cost savings vs Sonnet
- Use for high-volume, pattern-based tasks
- Good for scouts, quick content generation
- Reduced reasoning capability (acceptable trade-off for speed)

**Thinking Mode:**
- `think` - Default, good for structured tasks
- `think-hard` - Complex reasoning, multi-step problems
- `ultrathink` - Maximum reasoning depth, rare usage

### Prompt Caching

**Enable When:**
- Agent context >20K tokens
- Agent called iteratively (>3 times in workflow)
- Context rarely changes (personas, brand voice)

**Currently Enabled:**
- analyst (large datasets, repeated analysis)
- brand-strategist (brand guidelines, voice patterns)
- growth-hacker (growth frameworks, metrics)

**Cost Impact:**
- 85% savings on cached input tokens
- Only works for repeated context
- Cache expires after 5 minutes

---

## PROCESS

Step-by-step validation process for agents:

1. **Load Existing Agents**
   - Read all files from `.claude/agents/`
   - Parse YAML frontmatter
   - Extract names, descriptions, tools

2. **Validate Naming**
   - Check name matches regex `/^[a-z0-9]+(-[a-z0-9]+)*$/`
   - Verify length constraints (3-50 chars)
   - Check for invalid characters
   - Generate suggestion if invalid

3. **Check YAML Frontmatter**
   - Verify all required fields present
   - Validate field types (array, string, enum)
   - Check model is valid enum value
   - Check thinking mode is valid enum value
   - Verify tools are valid tool names

4. **Verify Emoji**
   - Check description starts with emoji
   - Verify emoji matches standards (if existing agent)
   - Suggest appropriate emoji if missing
   - Ensure emoji is distinctive (not used by another agent)

5. **Check Required Sections**
   - Verify ## Core Expertise exists
   - Verify ## When to Invoke exists
   - Verify ## Workflow Protocol exists
   - Verify ## Quality Gates exists
   - Check sections have sufficient content (not just headers)

6. **Detect Similar Agents**
   - Calculate Levenshtein distance with all existing agents
   - Calculate word overlap in descriptions
   - Flag if >85% similar (ERROR)
   - Warn if 60-85% similar (WARNING)

7. **Check Integration References**
   - Find all @-references in file
   - Resolve each reference to filesystem path
   - Verify target file exists
   - Report broken references

8. **Generate Validation Report**
   - Aggregate all validation results
   - Classify issues (critical, warning, recommendation)
   - Provide auto-correction suggestions
   - Calculate overall validity

---

## OUTPUT

### Validation Report Structure

```typescript
interface AgentValidationReport {
  agentName: string;
  valid: boolean;

  naming: {
    valid: boolean;
    expectedFormat: 'kebab-case';
    actualFormat: string;
    suggestion?: string;
    issues: string[];
  };

  structure: {
    valid: boolean;
    hasYAML: boolean;
    missingYAMLFields: string[];
    missingRequiredSections: string[];
    missingRecommendedSections: string[];
  };

  emoji: {
    valid: boolean;
    hasEmoji: boolean;
    emojiMatches: boolean;
    suggestedEmoji?: string;
    issues: string[];
  };

  similarity: {
    similarAgents: Array<{
      name: string;
      similarity: number;
      reason: string;
    }>;
    hasDuplicate: boolean;
  };

  integration: {
    valid: boolean;
    brokenReferences: Array<{
      reference: string;
      line: number;
      targetPath: string;
    }>;
  };

  overallIssues: {
    critical: string[];  // Must fix before creation
    warnings: string[];  // Should address
    recommendations: string[];  // Nice to have
  };

  autoCorrections: Array<{
    type: 'naming' | 'emoji' | 'structure';
    description: string;
    oldValue: string;
    newValue: string;
  }>;
}
```

### Valid Agent File Structure

```markdown
---
name: "marketing-director"
description: "🎯 Strategic marketing leadership specialist - strategic planning, campaign coordination, ROI analysis"
tools:
  - Read
  - Write
  - Task
model: "sonnet"
thinking: "think-hard"
promptCaching: false
---

# Marketing Director Agent

## Core Expertise

[150-300 words describing what this agent does, primary capabilities, specialization]

The Marketing Director is a strategic marketing leadership specialist focused on:
- Campaign strategy and planning
- Budget allocation and ROI optimization
- Cross-channel coordination
- Stakeholder alignment
- Performance forecasting

This agent excels at CMO-level strategic thinking, translating business goals into marketing initiatives, and coordinating multiple specialist agents for integrated campaigns.

## When to Invoke

[100-200 words on specific trigger conditions, task types, coordination scenarios]

Invoke the Marketing Director when:
- Creating comprehensive campaign strategies
- Planning product launches or major initiatives
- Coordinating 3+ marketing specialists
- Aligning marketing with business objectives
- Prioritizing initiatives with budget constraints

DO NOT invoke for:
- Tactical content creation (use copywriter)
- Data analysis only (use analyst)
- Single-channel execution (use appropriate specialist)

Best paired with analyst (data insights) and growth-hacker (opportunity identification).

## Workflow Protocol

[200-400 words on step-by-step execution process]

1. **Situational Analysis**
   - Load company context from knowledge base
   - Review performance data with analyst
   - Identify opportunities and constraints

2. **Strategic Planning**
   - Define campaign objectives and metrics
   - Develop positioning and messaging strategy
   - Plan channel mix and budget allocation
   - Create timeline and milestones

3. **Specialist Coordination**
   - Brief copywriter on brand voice requirements
   - Task content-strategist with editorial calendar
   - Commission growth-hacker for optimization tactics
   - Assign analyst for measurement framework

4. **Quality Synthesis**
   - Review specialist outputs
   - Ensure strategic coherence
   - Validate against business objectives
   - Package final campaign plan

**Integration Points:**
- References: `@.claude/skills/campaign-strategy-frameworks.md`
- Patterns: Uses `create_campaign_plan`, `segment_audience`, `define_value_prop`
- Coordinates: analyst, copywriter, content-strategist, growth-hacker

## Quality Gates

[100-200 words on self-review checklist and standards]

Before finalizing any campaign strategy:

- [ ] **Strategic Alignment** - Campaign objectives clearly support business goals
- [ ] **Metric Definition** - Success metrics defined and measurable
- [ ] **Budget Justification** - ROI projections based on historical data
- [ ] **Risk Assessment** - Key risks identified with mitigation strategies
- [ ] **Stakeholder Buy-in** - Plan addresses known stakeholder concerns
- [ ] **Resource Validation** - Required resources (team, budget, time) available
- [ ] **Timeline Realism** - Milestones account for dependencies and constraints
- [ ] **Specialist Coordination** - Clear hand-off to execution specialists
- [ ] **Measurement Framework** - Analytics setup and reporting cadence defined

**Quality Standard:** CMO-level strategic thinking, not tactical execution.

---

## Examples

### Example 1: Product Launch Campaign

**Input:** "Plan launch campaign for new AI features targeting enterprise"

**Process:**
1. Analyst provides market analysis (competitive positioning, target segments)
2. Define launch objectives (awareness, demo requests, early adopters)
3. Plan 3-month campaign (pre-launch, launch, post-launch)
4. Coordinate specialists:
   - Content-strategist: Editorial calendar, thought leadership
   - Copywriter: Messaging, value propositions, ad copy
   - Growth-hacker: Activation tactics, viral loops
5. Define metrics and tracking

**Output:** 15-page campaign strategy with timeline, budget, tactics, metrics

### Example 2: Budget Reallocation

**Input:** "Q3 campaign underperforming, reallocate $50K to better channels"

**Process:**
1. Analyst identifies underperforming channels and opportunities
2. Review performance data and attribution
3. Model scenarios for reallocation
4. Coordinate with specialists for quick pivots
5. Update budget allocation and forecasts

**Output:** Reallocation plan with revised forecasts and tactical changes

---

## Integration Points

**Skills Used:**
- `campaign-strategy-frameworks` - Strategic planning templates
- `audience-research` - Persona analysis
- `marketing-analytics` - Performance benchmarks

**Patterns Invoked:**
- `create_campaign_plan` - Campaign planning template
- `segment_audience` - Target segment analysis
- `define_value_prop` - Value proposition development
- `create_gtm_plan` - Go-to-market strategy

**Coordinates With:**
- `analyst` - Data insights, performance analysis
- `copywriter` - Messaging and copy development
- `content-strategist` - Content planning and SEO
- `growth-hacker` - Growth tactics and optimization
- `brand-strategist` - Brand consistency and positioning

**Outputs For:**
- Campaign briefs for execution specialists
- Budget allocation documents
- Performance dashboards
- Stakeholder presentations

---

## QUALITY CHECKS

Use this checklist when creating or validating an agent:

- [ ] **Naming**
  - [ ] Name is kebab-case
  - [ ] Name is descriptive (not abbreviated)
  - [ ] Name is 3-50 characters
  - [ ] No invalid characters
  - [ ] Not >85% similar to existing agent

- [ ] **YAML Frontmatter**
  - [ ] All required fields present (name, description, tools, model, thinking)
  - [ ] Name matches filename
  - [ ] Description starts with emoji
  - [ ] Tools are valid tool names
  - [ ] Model is sonnet/opus/haiku
  - [ ] Thinking mode is think/think-hard/ultrathink

- [ ] **Emoji**
  - [ ] Emoji is distinctive (not used by other agents)
  - [ ] Emoji is semantic (matches agent's domain)
  - [ ] Emoji renders correctly (tested on multiple platforms)
  - [ ] Emoji is followed by space and description

- [ ] **Required Sections**
  - [ ] ## Core Expertise (150-300 words)
  - [ ] ## When to Invoke (100-200 words)
  - [ ] ## Workflow Protocol (200-400 words)
  - [ ] ## Quality Gates (100-200 words)

- [ ] **Content Quality**
  - [ ] Core Expertise clearly defines specialization
  - [ ] When to Invoke has specific trigger conditions
  - [ ] Workflow Protocol is step-by-step and actionable
  - [ ] Quality Gates has concrete checklist items
  - [ ] Examples show real-world usage (if included)

- [ ] **Integration**
  - [ ] All @-references resolve to existing files
  - [ ] Skills/patterns referenced are appropriate
  - [ ] Other agents mentioned exist
  - [ ] Integration points make sense

- [ ] **Consistency**
  - [ ] Tone matches other agent files
  - [ ] Structure follows pattern
  - [ ] Terminology consistent with system vocabulary

---

## OUTPUT

### Template Structure

The agent file follows this exact structure:

```markdown
---
name: {{componentName}}
description: {{emoji}} {{description}}
tools: {{tools}}
model: {{model}}
thinking: {{thinking}}
{{#if promptCaching}}promptCaching: true{{/if}}
{{#if category}}category: "{{category}}"{{/if}}
---

# {{componentName | titleCase}} Agent

{{agentIntro}}

---

## Core Expertise

{{#each coreExpertise}}
- {{this}}
{{/each}}

## When to Invoke This Agent

Invoke the {{componentName}} for:
{{#each whenToInvoke}}
- {{this}}
{{/each}}

## Workflow Protocol

{{workflowProtocol}}

## Quality Gates

{{qualityGates}}

{{#if outputStyle}}
## Output Style

{{outputStyle}}
{{/if}}

{{#if collaboration}}
## Collaboration

Work with:
{{#each collaboration}}
- **{{agent}}**: {{role}}
{{/each}}
{{/if}}

{{#if successMetrics}}
## Success Metrics

You're successful when:
{{#each successMetrics}}
- ✅ {{this}}
{{/each}}
{{/if}}
```

### Template Variables

**Required (YAML Frontmatter):**
- `componentName`: Agent identifier (kebab-case)
- `emoji`: Agent emoji from emoji mapping table
- `description`: One-line description (25-100 words)
- `tools`: Comma-separated tool list (Read, Write, Bash, Grep, etc.)
- `model`: claude-sonnet-4-5 | claude-opus-4 | claude-haiku-4
- `thinking`: think | think-hard | ultrathink

**Optional (YAML Frontmatter):**
- `promptCaching`: true (for agents with large context - analyst, brand-strategist, growth-hacker)
- `category`: "specialist" | "orchestrator" | "cost-optimized"

**Required (Content):**
- `agentIntro`: 2-3 sentence introduction describing agent's role and expertise
- `coreExpertise`: Array of 5-8 expertise areas (bulleted list)
- `whenToInvoke`: Array of 3-5 specific use cases/scenarios
- `workflowProtocol`: Step-by-step execution process (numbered list, 5-10 steps)
- `qualityGates`: Validation checklist (bulleted list with checkboxes, 3-5 items)

**Optional (Content):**
- `outputStyle`: Expected output format and structure
- `collaboration`: Array of {agent, role} - which agents to work with
- `successMetrics`: Array of success criteria (bulleted list with ✅)

### Variable Helpers

The template engine supports these helpers:

- `{{componentName | titleCase}}` → Converts "marketing-director" to "Marketing Director"
- `{{componentName | capitalize}}` → Converts "marketing-director" to "Marketing-director"
- `{{emoji}}` → Auto-inserted from emoji mapping table
- `{{#if variable}}...{{/if}}` → Conditional rendering
- `{{#each array}}{{this}}{{/each}}` → Loop over arrays

### Example: Generated Agent

**Input:**
```json
{
  "componentName": "market-researcher",
  "description": "Research-focused specialist for market analysis, competitive intelligence, and data synthesis",
  "tools": "Read, Grep, WebSearch, WebFetch",
  "model": "claude-sonnet-4-5",
  "thinking": "think",
  "agentIntro": "You are a research-focused marketing specialist with expertise in market analysis, competitive intelligence, and data synthesis. You gather and analyze market data to inform strategic decisions.",
  "coreExpertise": [
    "Market research and competitive analysis",
    "Data synthesis and insight extraction",
    "Trend identification and forecasting",
    "Competitor monitoring and benchmarking",
    "Customer research and persona development"
  ],
  "whenToInvoke": [
    "Need to research competitors or market trends",
    "Analyzing market opportunities",
    "Gathering competitive intelligence",
    "Synthesizing research into actionable insights"
  ],
  "workflowProtocol": "1. **Define Objectives**: Clarify what questions need answering\n2. **Gather Data**: Use WebSearch, WebFetch for competitor sites, industry reports\n3. **Analyze**: Extract key insights, identify patterns\n4. **Synthesize**: Create comprehensive research summary\n5. **Recommend**: Provide data-driven recommendations",
  "qualityGates": "- [ ] Research covers all key competitors\n- [ ] Data sources are credible and cited\n- [ ] Insights are actionable (not just facts)\n- [ ] Recommendations are data-driven"
}
```

**Output:**
```markdown
---
name: market-researcher
description: 🔬 Research-focused specialist for market analysis, competitive intelligence, and data synthesis
tools: Read, Grep, WebSearch, WebFetch
model: claude-sonnet-4-5
thinking: think
---

# Market Researcher Agent

You are a research-focused marketing specialist with expertise in market analysis, competitive intelligence, and data synthesis. You gather and analyze market data to inform strategic decisions.

---

## Core Expertise

- Market research and competitive analysis
- Data synthesis and insight extraction
- Trend identification and forecasting
- Competitor monitoring and benchmarking
- Customer research and persona development

## When to Invoke This Agent

Invoke the market-researcher for:
- Need to research competitors or market trends
- Analyzing market opportunities
- Gathering competitive intelligence
- Synthesizing research into actionable insights

## Workflow Protocol

1. **Define Objectives**: Clarify what questions need answering
2. **Gather Data**: Use WebSearch, WebFetch for competitor sites, industry reports
3. **Analyze**: Extract key insights, identify patterns
4. **Synthesize**: Create comprehensive research summary
5. **Recommend**: Provide data-driven recommendations

## Quality Gates

- [ ] Research covers all key competitors
- [ ] Data sources are credible and cited
- [ ] Insights are actionable (not just facts)
- [ ] Recommendations are data-driven
```

### Usage with /generate Command

```bash
# Interactive generation
/generate agent market-researcher

# Will prompt for:
# 1. Description (one-line with emoji suggested)
# 2. Tools (comma-separated)
# 3. Model (sonnet/opus/haiku)
# 4. Thinking mode (think/think-hard/ultrathink)
# 5. Core expertise (3-5 bullet points)
# 6. When to invoke (2-3 scenarios)
# 7. Workflow protocol (step-by-step)
# 8. Quality gates (checklist items)

# Optional prompts (if user wants):
# 9. Output style (optional)
# 10. Collaboration (optional)
# 11. Success metrics (optional)
```

---

## ADAPTATION

**When adapting agents from external sources (research repos, community examples):**

**Tool mapping:** Map external tools to system tools | Examples: `FileRead`→`Read`, `Execute`→`Bash`, `Search`→`Grep`
**Structure:** Add YAML frontmatter if missing | Ensure model+thinking directives present | Validate required sections (Purpose, Tools, Instructions)
**Naming:** Enforce kebab-case | Remove special chars | Lowercase consistently
**Attribution:** Add footer tracking source repo, adaptation date, modifications applied
**Validation:** Run against this pattern post-adaptation | Flag missing sections | Verify tool names valid

**Adaptation validated via:** `pre-tool-use-write.ts` hook + `adaptToSystemStandards()` in component-generator.ts

---

## MAINTENANCE

**When to Update This Pattern:**
- New agent added (update emoji mapping table)
- Validation rules change
- New agent category introduced
- Tool list expanded
- Model options change

**How to Update:**
- Edit this file (`.claude/patterns/meta/component_agent.md`)
- Update emoji mapping table
- Update RULES section
- Increment version in CHANGELOG
- No code changes needed (validators read this pattern)

**Version History:**
- v1.1 (2025-11-07) - Added OUTPUT section with template for /generate command (Phase 3, v6.0)
- v1.0 (2025-11-06) - Initial pattern creation, consolidates emoji-standards.json + validator logic
