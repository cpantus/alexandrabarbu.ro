# Pattern: Component - Pattern

**Category**: meta
**Complexity**: medium
**Thinking**: N/A (specification pattern, not execution pattern)
**Knowledge Required**: N/A (defines standards for pattern components)

---

## PURPOSE

Define the structure, validation rules, and quality standards for pattern components in the Marketing Agent system. This is the meta-pattern: the pattern that defines what patterns should look like.

---

## INPUT

When creating or validating a pattern component:

**Required:**
1. **Pattern name**: snake_case identifier (e.g., "create_linkedin_post", "extract_insights")
2. **Category**: Pattern category (content, strategy, analysis, optimization, workflow, meta)
3. **Complexity**: simple, medium, or complex
4. **Thinking mode**: think, think-hard, ultrathink
5. **Knowledge required**: Skills or knowledge files needed

**Optional:**
6. **Estimated tokens**: Approximate token count for execution
7. **Trigger keywords**: Keywords for auto-suggestion
8. **Dependencies**: Skills, knowledge files, other patterns

---

## RULES

### Naming Convention

**Format:** snake_case (lowercase with underscores)

**Pattern:** `/^[a-z0-9]+(_[a-z0-9]+)*$/`

**Valid examples:**
- `create_linkedin_post` ✓
- `extract_insights` ✓
- `generate_variants` ✓
- `two_stage_content_sonnet_haiku` ✓

**Invalid examples:**
- `createLinkedInPost` ✗ (camelCase)
- `create-linkedin-post` ✗ (kebab-case)
- `CreateLinkedInPost` ✗ (PascalCase)
- `create_linkedin_post_` ✗ (trailing underscore)

**Rationale:** Snake_case is standard for pattern names in the system, distinguishing them from commands (kebab-case) and skills (kebab-case). This provides clear semantic separation.

---

### Required Structure

**File Header (YAML-style metadata):**
```markdown
# Pattern: [Pattern Name]

**Category**: content|strategy|analysis|optimization|workflow|meta
**Complexity**: simple|medium|complex
**Thinking**: think|think-hard|ultrathink
**Knowledge Required**: skill-name, knowledge-file.md

---
```

**Required Markdown Sections:**
```markdown
## PURPOSE
One-sentence description of what this pattern does and when to use it.

## INPUT
**Required:**
1. Field 1: description
2. Field 2: description

**Optional:**
3. Field 3: description

## PROCESS
Step-by-step execution logic (numbered steps)

## OUTPUT
Exact format specification for deliverable

## QUALITY CHECKS
Checklist of validation criteria before delivery

## EXAMPLE
Complete example showing input → process → output

## VARIATIONS
Different modes or customization options (optional but recommended)

## USAGE NOTES
When to use this pattern vs alternatives (optional but recommended)
```

**Optional but Recommended Sections:**
- SUCCESS METRICS (for marketing patterns)
- PATTERN CHAINING (integration with other patterns)
- MAINTENANCE NOTES (for meta-patterns)

---

### Category Standards

**6 Pattern Categories:**

| Category | Emoji | Purpose | Complexity Range | Example Patterns |
|----------|-------|---------|------------------|------------------|
| content | 📝 | Create marketing content | simple-complex | create_linkedin_post, write_blog_article |
| strategy | 🎯 | Strategic planning | medium-complex | create_campaign_plan, competitive_analysis |
| analysis | 📊 | Data analysis and insights | medium-complex | extract_insights, funnel_analysis |
| optimization | ⚡ | Improve performance | simple-medium | improve_copy, optimize_conversion |
| workflow | 🔄 | Process orchestration | complex | scout_workflow, two_stage_content |
| meta | 🔧 | System patterns | medium | component_agent, component_pattern |

**Category Selection Guidelines:**
- **Content**: Produces marketing deliverables (posts, emails, articles, ads)
- **Strategy**: Creates plans, frameworks, positioning
- **Analysis**: Processes data to extract insights
- **Optimization**: Improves existing content or processes
- **Workflow**: Coordinates agents or multi-step processes
- **Meta**: Defines system standards and components

---

### Complexity Levels

**Simple (30-60 seconds execution):**
- Single-step or straightforward multi-step process
- Minimal thinking required (use `think` mode)
- ~1000-1500 tokens
- Examples: improve_subject_lines, generate_variants

**Medium (60-120 seconds execution):**
- Multi-step with some decision logic
- Moderate thinking required (use `think` mode)
- ~1500-2500 tokens
- Examples: create_email_campaign, segment_audience

**Complex (120-300 seconds execution):**
- Complex multi-step with deep reasoning
- Significant thinking required (use `think-hard` or `ultrathink`)
- ~2500-5000 tokens
- Examples: write_blog_article, create_campaign_plan, competitive_analysis

**Criteria for complexity:**
- Number of steps (simple: 3-5, medium: 5-8, complex: 8+)
- Reasoning depth (simple: template-based, medium: decision logic, complex: strategic thinking)
- Output length (simple: <500 words, medium: 500-1500 words, complex: 1500+ words)
- Dependencies (simple: 1-2 skills, medium: 2-3 skills, complex: 3+ skills)

---

### Thinking Mode Standards

**think (default):**
- Standard reasoning capability
- Good for template-based patterns
- Use for: simple and most medium patterns

**think-hard:**
- Enhanced reasoning for complex decisions
- Good for strategic or analytical patterns
- Use for: complex patterns requiring deep analysis

**ultrathink:**
- Maximum reasoning depth
- Reserved for highest-complexity strategic work
- Use for: rare, ultra-complex patterns (e.g., comprehensive campaign strategies)

**Selection guideline:**
- Simple complexity → think
- Medium complexity → think
- Complex complexity → think-hard (or ultrathink if truly necessary)

---

### Emoji Standards

**Category Emojis (6 + workflow variants):**

**Primary Categories:**
- content: 📝 (content creation)
- strategy: 🎯 (strategic planning)
- analysis: 📊 (data analysis)
- optimization: ⚡ (performance improvement)
- workflow: 🔄 (process orchestration)
- meta: 🔧 (system patterns)

**Individual Pattern Emojis (32 patterns):**

**Content Patterns (6):**
- create_linkedin_post: 📝
- create_email_campaign: 📧
- write_blog_article: 📄
- generate_ad_copy: 📢
- create_landing_page_copy: 🌐
- write_social_thread: 🧵

**Strategy Patterns (6):**
- create_campaign_plan: 🎯
- position_product: 🎯
- segment_audience: 👥
- define_value_prop: 💎
- competitive_analysis: ⚔️
- create_gtm_plan: 🚀

**Analysis Patterns (7):**
- extract_insights: 💡
- compare_performance: 📊
- audit_content: 🔍
- funnel_analysis: 🔻
- cohort_analysis: 👥
- attribution_analysis: 🔗
- analyze_ecommerce_website: 🛒

**Optimization Patterns (6):**
- improve_copy: ✨
- generate_variants: 🔀
- optimize_conversion: 📈
- improve_subject_lines: 📧
- optimize_cta: 👆
- design_ab_test: 🧪

**Workflow Patterns (5):**
- scout_workflow: 🔎
- plan_workflow: 📋
- build_workflow: 🔨
- two_stage_content_sonnet_sonnet: 🎭
- two_stage_content_sonnet_haiku: ⚡

**Meta Patterns (2+):**
- component_agent: 🤖
- component_command: 💻
- component_pattern: 🔧
- (more as created)

**Emoji Usage:**
- In pattern-index.json (category field)
- Hook outputs for pattern suggestions
- NOT in pattern markdown files themselves
- NOT in file names

---

### Similarity Detection

**Algorithm:** Levenshtein distance + semantic purpose overlap

**Thresholds:**
- **Warning:** >60% similarity to existing pattern name
- **Error:** >85% similarity to existing pattern name

**Check against:** All existing pattern files in `.claude/patterns/`

**Purpose:** Prevent confusing or duplicate patterns

**Example warnings:**
- `create_linkedin_post` vs `create_linkedin_posts` → 95% similar → ❌ Error
- `analyze_content` vs `audit_content` → 70% similar → ⚠️ Warning (acceptable if distinct purposes)
- `extract_insights` vs `generate_insights` → 65% similar → ⚠️ Warning

---

### Knowledge Dependencies

**Valid dependency types:**

**Skills (auto-activating):**
- brand-voice-guidelines
- audience-research
- campaign-strategy-frameworks
- seo-optimization
- marketing-analytics
- automation-workflows
- compliance-and-legal
- research-synthesis

**Knowledge Files (pattern-specific, compressed):**
- voice-patterns-quick.md
- personas-patterns-quick.md
- performance-patterns-quick.md
- frameworks-patterns-quick.md

**Format in metadata:**
```markdown
**Knowledge Required**: skill-name, knowledge-file.md, other-skill
```

**Validation:**
- Skills must exist in `.claude/skills/`
- Knowledge files must exist in `.claude/skills/[skill-name]/resources/`
- Maximum 4 dependencies (keep patterns focused)

---

### Integration References

**Valid reference formats:**
- Skills: `@.claude/skills/[skill-name].md`
- Knowledge files: Reference by name (loaded via skills)
- Other patterns: `@.claude/patterns/[category]/[pattern-name].md`
- Agents: `@.claude/agents/[agent-name].md`

**Pattern chaining syntax:**
```bash
/chain pattern1 → pattern2 → pattern3
```

**Validation rules:**
- Referenced skills must exist
- Knowledge files must be in skill resources
- Chained patterns should have compatible input/output
- Maximum chain length: 5 patterns (prevent complexity explosion)

---

## PROCESS

When creating or validating a pattern component:

### Step 1: Load Existing Patterns
```bash
# Read all pattern files
find .claude/patterns -name "*.md" -not -path "*/meta/*"
```

### Step 2: Validate Naming
- Check against naming pattern `/^[a-z0-9]+(_[a-z0-9]+)*$/`
- File name matches pattern name
- Run similarity detection against existing patterns
- Warn if >60% similar, error if >85% similar

### Step 3: Validate Metadata Header
- Category is one of 6 valid categories
- Complexity is simple/medium/complex
- Thinking mode is think/think-hard/ultrathink
- Knowledge dependencies exist

### Step 4: Validate Structure
- All required sections present (PURPOSE, INPUT, PROCESS, OUTPUT, QUALITY CHECKS, EXAMPLE)
- Sections in correct order
- Each section has content (not just headers)

### Step 5: Validate Complexity Alignment
- Thinking mode matches complexity
- Estimated tokens match complexity range
- Number of process steps matches complexity

### Step 6: Check Pattern Index
- Pattern registered in pattern-index.json
- Metadata matches file header
- Trigger keywords defined
- Category emoji correct

### Step 7: Validate Examples
- EXAMPLE section shows complete flow
- Input → Process → Output demonstrated
- Example is realistic and useful

### Step 8: Generate Report
Return validation results with errors, warnings, and recommendations.

---

## OUTPUT

### Validation Report Structure

```typescript
interface PatternValidationReport {
  valid: boolean;
  patternName: string;
  category: PatternCategory;
  complexity: 'simple' | 'medium' | 'complex';
  errors: string[];          // Must fix before approval
  warnings: string[];        // Should address
  recommendations: string[]; // Optional improvements
  corrections: Correction[]; // Auto-fixable issues

  metadata: {
    categoryValid: boolean;
    complexityValid: boolean;
    thinkingModeValid: boolean;
    dependenciesValid: boolean;
  };

  structure: {
    requiredSectionsPresent: boolean;
    missingSections: string[];
    sectionsInOrder: boolean;
  };

  patternIndex: {
    registered: boolean;
    metadataMatches: boolean;
    triggersValid: boolean;
  };
}

type PatternCategory = 'content' | 'strategy' | 'analysis' | 'optimization' | 'workflow' | 'meta';
```

### Valid Pattern File Structure

```markdown
# Pattern: Create LinkedIn Post

**Category**: content
**Complexity**: simple
**Thinking**: think
**Knowledge Required**: voice-patterns-quick.md, personas-patterns-quick.md

---

## PURPOSE

Create a professional, engaging LinkedIn post that aligns with brand voice and targets a specific audience persona to achieve a defined marketing goal.

---

## INPUT

**Required:**
1. **Topic**: The subject matter or key message
2. **Persona**: Target audience (Strategic Sarah, Technical Tom, custom)
3. **Goal**: Post objective (awareness, engagement, lead generation)

**Optional:**
4. **Length**: short/medium/long [default: medium]
5. **Tone**: professional/approachable/bold [default: professional]

---

## PROCESS

### Step 1: Load Context
- Load brand voice from voice-patterns-quick.md
- Load persona details from personas-patterns-quick.md

### Step 2: Structure Post
- Opening (Hook): Attention-grabbing statement
- Body (Value): Deliver on hook's promise
- Closing (CTA): Clear next step

### Step 3: Apply Voice & Tone
- Use brand vocabulary
- Avoid forbidden terms
- Match tone to persona

### Step 4: Format for LinkedIn
- Break into 1-3 line paragraphs
- Add emojis sparingly (max 2-3)
- Include 3-5 hashtags

### Step 5: Quality Check
- Run QUALITY CHECKS section

---

## OUTPUT

**Format:**
```
[LINKEDIN POST]
[Hook]

[Body paragraph 1]

[Body paragraph 2]

[CTA]

[Hashtags: #relevant #tags]

---

[METADATA]
- Target Persona: [name]
- Goal: [goal]
- Length: [X words]
- Estimated Engagement: [prediction]
```

---

## QUALITY CHECKS

- [ ] Uses approved vocabulary
- [ ] Addresses persona pain points
- [ ] Hook is attention-grabbing
- [ ] CTA is clear and actionable
- [ ] 3-5 relevant hashtags included

---

## EXAMPLE

**Input:**
- Topic: "Q4 marketing performance exceeded targets"
- Persona: Strategic Sarah
- Goal: Thought leadership

**Output:**
```
[Complete example post with all sections]
```

---

## VARIATIONS

### By Length
- Short (100-150 words): Single focused message
- Medium (150-250 words): Hook + 2-3 supporting points
- Long (250-400 words): Deep dive with multiple examples

### By Goal
- Awareness: Focus on education, CTA is share
- Engagement: End with question, CTA is comment
- Lead Generation: Tease resource, CTA is click link

---

## USAGE NOTES

**When to use this pattern:**
- Need LinkedIn content quickly (< 5 minutes)
- Want consistent brand voice
- Testing different messaging

**When to use full skills instead:**
- Creating comprehensive LinkedIn strategy
- Developing campaign series (10+ posts)
- Complex content calendar planning

**Pattern chaining:**
- create_linkedin_post → generate_variants → improve_copy
- segment_audience → create_linkedin_post
```

---

## QUALITY CHECKS

Before approving a pattern component:

### Naming & Structure
- [ ] Name follows snake_case convention
- [ ] File name matches pattern name
- [ ] No similar pattern names (>85% similarity)
- [ ] All required sections present
- [ ] Sections in correct order

### Metadata Validation
- [ ] Category is valid (content/strategy/analysis/optimization/workflow/meta)
- [ ] Complexity matches pattern scope (simple/medium/complex)
- [ ] Thinking mode appropriate for complexity
- [ ] Knowledge dependencies exist

### Content Quality
- [ ] PURPOSE is one clear sentence
- [ ] INPUT lists all required and optional fields
- [ ] PROCESS has numbered, actionable steps
- [ ] OUTPUT shows exact format specification
- [ ] QUALITY CHECKS are concrete criteria
- [ ] EXAMPLE demonstrates complete flow

### Pattern Index Registration
- [ ] Pattern listed in pattern-index.json
- [ ] Metadata matches file header
- [ ] Category emoji correct
- [ ] Trigger keywords defined
- [ ] Dependencies listed

### Complexity Alignment
- [ ] Simple: 3-5 steps, think mode, ~1000-1500 tokens
- [ ] Medium: 5-8 steps, think mode, ~1500-2500 tokens
- [ ] Complex: 8+ steps, think-hard/ultrathink, ~2500-5000 tokens

### Integration
- [ ] Knowledge files referenced exist
- [ ] Skills referenced exist
- [ ] Pattern chaining makes sense
- [ ] USAGE NOTES explains when to use vs alternatives

---

## EXAMPLE VALIDATION SCENARIOS

### Scenario 1: Valid Content Pattern

**Input:** `create_linkedin_post.md` with all required sections, proper metadata, registered in pattern-index.json

**Output:**
```
✅ VALIDATION PASSED

Pattern: create_linkedin_post
Category: content
Complexity: simple
Thinking: think

Metadata: ✓ Valid
Structure: ✓ All required sections present
Pattern Index: ✓ Registered
Examples: ✓ Complete example provided

Ready for production use.
```

---

### Scenario 2: Invalid Pattern (Missing Sections)

**Input:** `extract_insights.md` missing QUALITY CHECKS and EXAMPLE sections

**Output:**
```
❌ VALIDATION FAILED

Errors (must fix):
1. Missing required section: QUALITY CHECKS
2. Missing required section: EXAMPLE
3. Not registered in pattern-index.json

Warnings:
1. Complexity is "complex" but only 5 process steps (expected 8+)
2. Consider using think-hard instead of think for complex pattern

Apply structural fixes? (yes/no)
```

---

### Scenario 3: Complexity Mismatch

**Input:** Pattern marked "simple" but has 10 process steps and uses think-hard

**Output:**
```
⚠️  VALIDATION PASSED WITH WARNINGS

Pattern: create_campaign_plan
Category: strategy

Warnings:
1. Complexity mismatch: Marked "simple" but has 10 process steps (expected 3-5)
2. Thinking mode mismatch: Uses "think-hard" (typically for complex patterns)
3. Estimated tokens: 3500 (outside simple range of 1000-1500)

Recommendation: Change complexity to "complex" for better alignment

Auto-correct complexity? (yes/no)
```

---

## VARIATIONS

### Pattern Types by Category

**Content Patterns:**
- Focus on producing deliverables
- Clear output format specifications
- Brand voice compliance critical
- Examples: create_linkedin_post, write_blog_article

**Strategy Patterns:**
- Focus on planning and frameworks
- Require deep thinking
- Multiple scenarios and trade-offs
- Examples: create_campaign_plan, competitive_analysis

**Analysis Patterns:**
- Focus on extracting insights from data
- Structured analysis frameworks
- Clear metrics and findings
- Examples: extract_insights, funnel_analysis

**Optimization Patterns:**
- Focus on improving existing work
- Before/after comparisons
- A/B testing recommendations
- Examples: improve_copy, optimize_conversion

**Workflow Patterns:**
- Focus on agent coordination
- Multi-step orchestration
- Hand-offs between agents
- Examples: scout_workflow, two_stage_content

**Meta Patterns:**
- Focus on system standards
- Define component specifications
- Used by validators and generators
- Examples: component_agent, component_pattern

---

## ADAPTATION

**When adapting patterns from external sources:**

**Naming:** Enforce snake_case for execution patterns | kebab-case for output templates | Match category folder structure
**Structure:** Add YAML with category, complexity, model | Ensure sections (INPUT, WORKFLOW, OUTPUT, EXAMPLES) | Validate template variables
**Template syntax:** Convert to system template engine ({{var}}, {{#if}}, {{#each}}) | Ensure variables documented in INPUT section
**Complexity:** Infer from pattern steps/file size | Map to simple/medium/complex | Set appropriate model/thinking directives
**Attribution:** Footer tracking source + modifications

**Adaptation validated via:** `pattern-parser.ts` + `pre-tool-use-write.ts` hook

---

## USAGE NOTES

**When to use this pattern:**
- Creating a new pattern component
- Validating existing pattern compliance
- Understanding pattern standards
- Debugging pattern issues

**When to use `/generate pattern` instead:**
- Want interactive guided creation
- Prefer prompts over manual writing
- Need auto-validation during creation

**Pattern chaining opportunities:**
- component_pattern → validate → component_skill (create skills referenced)
- component_pattern → validate → update pattern-index.json

---

## MAINTENANCE NOTES

**When adding new patterns:**
1. Choose appropriate category (or propose new)
2. Select emoji (category or distinctive individual)
3. Create pattern file following this specification
4. Register in pattern-index.json
5. Update pattern count in stats (currently 32)
6. Run similarity detection

**When changing pattern standards:**
1. Update RULES section in this meta-pattern
2. Update component-consistency-validator.ts
3. Re-validate all existing patterns
4. Update CHANGELOG.md

**When adding new category:**
1. Add to category table
2. Choose category emoji
3. Update PatternCategory type
4. Document category purpose
5. Update stats

**When deprecating a pattern:**
1. Move to `.claude/deprecated/patterns/`
2. Remove from pattern-index.json
3. Update pattern count
4. Add deprecation notice in file
5. Update related patterns to remove references

---

**Pattern Version:** 1.0
**Last Updated:** 2025-11-06
**Component Count:** 32 patterns (6 content + 6 strategy + 7 analysis + 6 optimization + 5 workflow + 2 meta)
**Category Count:** 6 categories
**Validation Coverage:** 100%
