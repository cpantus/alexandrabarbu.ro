# Pattern: Component - Command

**Category**: meta
**Complexity**: medium
**Thinking**: N/A (specification pattern, not execution pattern)
**Knowledge Required**: N/A (defines standards for command components)
**Version:** 2.0 (v5.4.0 - Directive Language + Task Decomposition Override)

---

## PURPOSE

Define the structure, validation rules, and quality standards for slash command components in the Marketing Agent system.

---

## Task Decomposition Override (v5.4.0)

When creating or validating command components, **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE (Ad-hoc Command Creation):
1. Create markdown file without checking existing commands
2. Skip category validation
3. Forget to add examples or usage syntax
4. Deploy without testing invocation

### ✅ MANDATORY SEQUENCE (Systematic Command Development):

**Phase 1: Input Validation** (Validate 3 critical command requirements)
1. **Naming Validation**: Verify kebab-case format and special pattern compliance
   - Reference: This pattern "Naming Convention" section
   - Output: Name validity + pattern compliance (agent-*, mcp-*, start-X-Y, etc.)

2. **Category Validation**: Check category is valid and command fits appropriately
   - Reference: This pattern "Category Standards" section
   - Output: Category validity + appropriate categorization

3. **Uniqueness Validation**: Ensure command name doesn't duplicate existing commands
   - Reference: Scan `.claude/commands/` directory
   - Output: Uniqueness check + similar command warnings

**Output Acknowledgment After Phase 1:**
```
Command Validation Input Analysis:
- Naming: [kebab-case ✓, pattern: agent-* ✓]
- Category: [production ✓ / workflow might be more appropriate]
- Uniqueness: [Unique ✓ / Similar to existing-command (60% overlap)]
```

**Phase 2: Staged Execution** (Create command with proper structure)
4. Create markdown file with required sections (description, usage, examples)
5. Add workflow instructions if command is multi-step
6. Include parameter documentation for complex commands

**Phase 3: Output Generation** (Test and validate command)
7. Test command invocation works correctly
8. Verify all examples execute successfully
9. Document command in appropriate index/discovery system

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** Command creation requires validating naming patterns and category appropriateness first. Skipping Phase 1 leads to improperly categorized commands, missing documentation, and duplicate functionality. The mandatory sequence ensures commands are discoverable and properly integrated.

---

## Language Standards (v5.4.0)

**YOU MUST use directive language throughout command specifications:**

**Required Directives:**
- ✅ "MUST", "DO NOT", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "recommended"

**Command Documentation:**
- ✅ "Commands MUST include usage syntax"
- ❌ "Commands should include usage syntax"

**Workflow Instructions:**
- ✅ "Execute step 1", "Verify output", "NEVER skip validation"
- ❌ "Try to execute", "Consider verifying", "Should check output"

**Enforcement Note:** Meta-patterns with weak language will be rejected by validation hooks.

---

## INPUT

When creating or validating a command component:

**Required:**
1. **Command name**: kebab-case identifier without leading slash (e.g., "campaign", "start-1-1")
2. **Category**: Command category (teaching, production, content, analysis, etc.)
3. **Description**: One-sentence summary with emoji prefix describing purpose
4. **Usage syntax**: Command invocation pattern with parameters

**Optional:**
5. **Parameters**: Required and optional parameters
6. **Examples**: Usage examples
7. **Workflow**: Step-by-step execution instructions

---

## RULES

### Naming Convention

**Format:** kebab-case (lowercase with hyphens)

**Pattern:** `/^[a-z0-9]+(-[a-z0-9]+)*$/`

**Valid examples:**
- `campaign` ✓ (single word)
- `create-dev-docs` ✓ (multi-word)
- `start-1-1` ✓ (includes numbers)
- `mcp-load` ✓ (acronym + action)
- `agent-cleanup` ✓ (noun + verb)

**Invalid examples:**
- `/campaign` ✗ (includes slash - slash added at runtime)
- `Campaign` ✗ (capitalized)
- `create_dev_docs` ✗ (underscore)
- `createDevDocs` ✗ (camelCase)

**Special patterns:**
- Teaching modules: `start-X-Y` where X = module number, Y = lesson number
- Agent operations: `agent-[action]` (agent-create, agent-status, agent-kill, agent-cleanup)
- MCP operations: `mcp-[action]` (mcp-load, mcp-unload, mcp-list)
- Background operations: `background-[noun]` (background-status, background-results)
- Bundle operations: `bundle-[action]` (bundle-create, bundle-load, bundle-view)

**Rationale:** Kebab-case is standard for CLI commands and provides clear word separation.

---

### Required Structure

**Markdown File Format:**

```markdown
# [Command Title]

[Emoji] **Description:** One-sentence command purpose

**Usage:** `/command-name [required-param] [optional-param]`

**Examples:**
- `/command-name example1`
- `/command-name example2 "with options"`

---

## [Additional Sections as Needed]

### For workflow commands:
- Workflow steps
- Agent coordination
- Output format

### For teaching commands:
- Reference to lesson module
- Script instructions
- Teaching protocol

### For utility commands:
- Parameters
- Options
- Error handling
- Related commands
```

**Required Elements:**
- First line: # heading with command title (friendly name, not command itself)
- Second line: Emoji + description
- Usage line with syntax
- Examples section
- Separator (`---`)

**Optional but Recommended:**
- Parameters section (for complex commands)
- Workflow section (for multi-step commands)
- Quality standards section (for production commands)
- Related commands section
- Performance notes

---

### Emoji Standards

**Category Emojis (14 categories):**

| Category | Emoji | Purpose | Example Commands |
|----------|-------|---------|------------------|
| teaching | 📚 | Educational modules | start-0-0, start-1-1, start-2-1 |
| production | 🎯 | Main marketing workflows | campaign, launch |
| content | 📝 | Content creation | content, pattern, chain, two-stage |
| analysis | 📊 | Data analysis | analyze, cost-report |
| growth | 🚀 | Growth tactics | growth, viral |
| seo | 🔍 | SEO optimization | seo |
| automation | ⚙️ | Workflow automation | automate |
| agents | 🤖 | Agent management | agent-create, agent-status, agent-kill, agent-cleanup |
| background | ⏰ | Background execution | background, background-status, background-results, observe |
| mcp | 🔌 | MCP server integration | mcp-load, mcp-unload, mcp-list |
| context | 📦 | Context management | prime, load, bundle-create, bundle-load, bundle-view |
| monitoring | 💰 | System monitoring | cost-report |
| system | 🏥 | System health | system-health, pre-check |
| workflow | 🔄 | Workflow orchestration | workflow, orchestrate, demo, demo-personalize |

**Individual Command Emojis (67 commands):**

**Production Commands:**
- `campaign`: 🎯 (strategic planning)
- `content`: 📝 (content creation)
- `analyze`: 📊 (data analysis)
- `growth`: 🚀 (growth optimization)
- `viral`: 🌟 (viral mechanics)
- `seo`: 🔍 (SEO strategy)
- `automate`: ⚙️ (automation)
- `launch`: 🚀 (product launch)

**Content Commands:**
- `pattern`: 📝 (pattern execution)
- `chain`: 🔗 (pattern chaining)
- `two-stage`: ⚡ (two-stage content)

**Workflow Commands:**
- `workflow`: 🔄 (workflow execution)
- `orchestrate`: 🎼 (agent orchestration)
- `demo`: 🎬 (demo orchestration)
- `demo-personalize`: 🛍️ (e-commerce demo)

**Background Execution:**
- `background`: ⏰ (background task)
- `background-status`: 📊 (status check)
- `background-results`: 📋 (results retrieval)
- `observe`: 👀 (observe background)

**Agent Management:**
- `agent-create`: 🤖 (create agent)
- `agent-status`: 📊 (agent status)
- `agent-kill`: 🛑 (terminate agent)
- `agent-cleanup`: 🧹 (cleanup agents)

**MCP Integration:**
- `mcp-load`: 🔌 (load MCP server)
- `mcp-unload`: 🔌 (unload MCP server)
- `mcp-list`: 📋 (list MCP servers)

**Context Management:**
- `prime`: ⚡ (context enrichment)
- `load`: 📚 (load documentation)
- `bundle-create`: 📦 (create bundle)
- `bundle-load`: 📦 (load bundle)
- `bundle-view`: 👀 (view bundle)

**Dev Docs:**
- `create-dev-docs`: 📄 (create dev docs)
- `update-dev-docs`: 📝 (update dev docs)
- `review-dev-docs`: 👀 (review dev docs)

**Monitoring:**
- `cost-report`: 💰 (cost reporting)
- `pre-check`: 🔍 (pre-flight check)
- `system-health`: 🏥 (system health)

**Teaching Commands (27 modules):**
All use 📚 emoji:
- `start-0-0`, `start-0-1`, `start-0-2` (Module 0: Introduction)
- `start-1-1` through `start-1-12` (Module 1: Core System)
- `start-2-1` through `start-2-15` (Module 2: Advanced)

**Emoji Placement:**
- First line after heading: `[Emoji] **Description:** ...`
- Not in heading itself
- Not in file name
- Always followed by description text

**Emoji Selection Guidelines:**
- Use **category emoji** for most commands (aligns with command's domain)
- Use **individual emoji** for flagship/high-frequency commands
- Teaching commands always use 📚
- MCP commands always use 🔌
- Agent commands always use 🤖 (category) or specific emoji (individual)

---

### Similarity Detection

**Algorithm:** Levenshtein distance + command purpose overlap

**Thresholds:**
- **Warning:** >60% similarity to existing command name
- **Error:** >85% similarity to existing command name

**Check against:** All existing command files in `.claude/commands/`

**Purpose:** Prevent confusing or duplicate commands that could cause disambiguation issues

**Example warnings:**
- `campaign` vs `campaigns` → 90% similar → ❌ Error
- `analyze` vs `analysis` → 70% similar → ⚠️ Warning (acceptable if distinct)
- `mcp-load` vs `load` → 45% similar → ✓ OK (different domains)

**Special case - Teaching commands:**
- Format: `start-X-Y` is standardized, no similarity check needed
- Validates X and Y are numeric and sequential

---

### Command Syntax Validation

**Usage Format:**
```
**Usage:** `/command-name [required] [optional]`
```

**Parameter Conventions:**
- `[required]` - Required parameter (must provide)
- `[optional]` - Optional parameter (may omit)
- `"quoted"` - String parameter with spaces
- `|` - Alternatives (e.g., `[option1|option2]`)

**Valid usage examples:**
- `/campaign [type] [goal] [audience]` ✓
- `/load [capability|all]` ✓
- `/pattern [pattern-name]` ✓
- `/start-1-1` ✓ (no parameters)
- `/mcp-load [profile-name]` ✓

**Invalid usage examples:**
- `campaign [type]` ✗ (missing leading slash)
- `/Campaign [type]` ✗ (capitalized command)
- `/command (required)` ✗ (wrong bracket style)

---

### Teaching Command Standards

**Naming:** `start-X-Y` where:
- X = module number (0, 1, 2)
- Y = lesson number within module (1, 2, 3...)

**Structure:**
```markdown
📚 Teaching Module

Read and follow the teaching script in:
@teaching/X.Y-[lesson-name]/CLAUDE.md

Follow @.claude/SCRIPT_INSTRUCTIONS.md precisely:
- Say blocks word-for-word
- Stop at Check points
- No meta-commentary
- Stay in character as marketing instructor
- Never mention you're following a script

Start teaching immediately without preamble.
```

**Validation:**
- File exists at specified lesson-modules path
- CLAUDE.md file exists in lesson directory
- Module/lesson numbers are sequential (no gaps)

---

### Integration References

**Valid reference formats:**
- Lesson modules: `@teaching/X.Y-[name]/CLAUDE.md`
- Skills: `@.claude/skills/[skill-name].md`
- Patterns: `@.claude/patterns/[category]/[pattern-name].md`
- Agents: `@.claude/agents/[agent-name].md`
- Documentation: `@.claude/docs/[doc-name].md`
- Knowledge: `@.claude/knowledge/[category]/[file].md`

**Validation rules:**
- ✓ Must start with `@.claude/` or `@teaching/`
- ✓ Must include file extension (`.md`, `.json`, `.ts`)
- ✓ Target file must exist at path
- ⚠️ Warn if referenced file doesn't exist (may be future implementation)

---

## PROCESS

When creating or validating a command component:

### Step 1: Load Existing Commands
```bash
# Read all command files
ls .claude/commands/*.md
```

### Step 2: Validate Naming
- Check against naming pattern `/^[a-z0-9]+(-[a-z0-9]+)*$/`
- Verify no leading slash in file name
- Run similarity detection against existing commands
- Warn if >60% similar, error if >85% similar
- For teaching commands: validate `start-X-Y` format

### Step 3: Validate Structure
- First line is heading (# Command Title)
- Second line has emoji + description
- Usage line present with `/command-name` syntax
- Examples section present with at least 1 example
- Separator (`---`) present

### Step 4: Validate Emoji
- Check emoji matches category standards
- Verify emoji is NOT in heading
- Verify emoji is NOT in file name
- Confirm emoji followed by description text

### Step 5: Validate Syntax
- Usage line starts with `**Usage:**`
- Command name starts with `/`
- Parameters use `[bracket]` notation
- Optional parameters clearly marked

### Step 6: Check Integration References
- Find all `@.claude/` and `@teaching/` references
- Verify each reference includes file extension
- Check target files exist (warn if missing)
- For teaching commands: verify lesson module path exists

### Step 7: Category Classification
- Determine command category from emoji and purpose
- Validate category is one of 14 defined categories
- Check category alignment with command functionality

### Step 8: Generate Report
Return validation results with errors, warnings, and recommendations.

---

## OUTPUT

### Validation Report Structure

```typescript
interface CommandValidationReport {
  valid: boolean;
  commandName: string;
  category: CommandCategory;
  errors: string[];          // Must fix before approval
  warnings: string[];        // Should address
  recommendations: string[]; // Optional improvements
  corrections: Correction[]; // Auto-fixable issues
}

interface Correction {
  field: string;           // e.g., "emoji", "usage", "naming"
  current: string;         // Current value
  suggested: string;       // Recommended value
  reason: string;          // Why correction needed
  autoApply: boolean;      // Can be auto-applied safely
}

type CommandCategory =
  | 'teaching' | 'production' | 'content' | 'analysis'
  | 'growth' | 'seo' | 'automation' | 'agents'
  | 'background' | 'mcp' | 'context' | 'monitoring'
  | 'system' | 'workflow';
```

### Valid Command File Examples

**Production Command:**
```markdown
# Campaign Creation Workflow

🎯 **Usage:** `/campaign [type] [goal] [audience]`

**Examples:**
- `/campaign email "increase trial signups by 30%" "Strategic Sarah"`
- `/campaign integrated "product launch - 300 customers" "Marketing Manager Mary"`

---

## Workflow

### Step 1: Load Knowledge
[Workflow steps...]

### Step 2: Invoke Primary Agent
[Agent coordination...]

## Quality Standards
[Quality criteria...]
```

**Utility Command:**
```markdown
# /load - Load Detail Documentation

📚 **Description:** Manually load detail documentation for specific capabilities

**Usage:** `/load [capability|all]`

**Purpose:** Override auto-loading and explicitly load documentation when needed

---

## Valid Capabilities

- `skills` → skills-system.md (241 tokens)
- `patterns` → pattern-system.md (805 tokens)
[... more capabilities ...]

## Implementation Protocol

When you see `/load [capability]`, follow these steps:
1. Parse the capability name
2. Validate it's in the list
3. Load the file(s)
4. Confirm what was loaded

## Error Handling
[Error examples...]

## Usage Examples
[Detailed examples...]
```

**Teaching Command:**
```markdown
📚 Teaching Module

Read and follow the teaching script in:
@teaching/1.1-welcome/CLAUDE.md

Follow @.claude/SCRIPT_INSTRUCTIONS.md precisely:
- Say blocks word-for-word
- Stop at Check points
- No meta-commentary
- Stay in character as marketing instructor
- Never mention you're following a script

Start teaching immediately without preamble.
```

---

## QUALITY CHECKS

Before approving a command component:

### Naming & Syntax
- [ ] Name follows kebab-case convention
- [ ] No leading slash in file name
- [ ] No similar command names (>85% similarity)
- [ ] Usage line includes `/command-name` with proper syntax
- [ ] Parameters use correct bracket notation

### Structure
- [ ] First line is heading
- [ ] Second line has emoji + description
- [ ] Usage line present
- [ ] Examples section with at least 1 example
- [ ] Separator (`---`) present after intro
- [ ] Appropriate sections for command type

### Emoji Compliance
- [ ] Emoji matches category or is distinctive
- [ ] Emoji NOT in heading
- [ ] Emoji NOT in file name
- [ ] Emoji followed by description text
- [ ] Teaching commands use 📚

### Content Quality
- [ ] Description is clear and concise
- [ ] Examples show realistic usage
- [ ] Workflow steps are actionable (if applicable)
- [ ] Error handling documented (for complex commands)
- [ ] Related commands referenced (if applicable)

### Technical Validation
- [ ] All @-references include file extensions
- [ ] Referenced files exist (or are marked as future)
- [ ] Teaching commands reference valid lesson paths
- [ ] Agent/pattern/skill references are valid

### Category Alignment
- [ ] Command category is clear
- [ ] Emoji matches category standards
- [ ] Functionality aligns with category purpose

---

## EXAMPLE VALIDATION SCENARIOS

### Scenario 1: Valid Production Command

**Input:** `campaign.md` with complete structure, proper emoji, workflow steps

**Output:**
```
✅ VALIDATION PASSED

Command: campaign
Category: production
Emoji: 🎯 (matches category)

Structure:
- Naming: Valid (kebab-case, unique)
- Syntax: Valid (/campaign [type] [goal] [audience])
- Emoji: Valid (category emoji for production)
- Examples: 3 examples provided
- Workflow: Complete (6 steps)

Ready for production use.
```

---

### Scenario 2: Invalid Command (Multiple Errors)

**Input:** `Campaign.md` with:
- Capitalized file name
- Missing emoji
- Invalid usage syntax (no leading slash)
- No examples

**Output:**
```
❌ VALIDATION FAILED

Errors (must fix):
1. File name must be lowercase: "Campaign.md" → "campaign.md"
2. Missing emoji in description line
3. Invalid usage syntax: "campaign [type]" → "/campaign [type]"
4. Missing examples section

Corrections available:
✓ Auto-fix file name to lowercase
✓ Auto-add emoji 🎯 (detected category: production)
✓ Auto-fix usage syntax to include leading slash

Apply auto-corrections? (yes/no)
```

---

### Scenario 3: Teaching Command Validation

**Input:** `start-1-5.md` referencing `@teaching/1.5-workflows/CLAUDE.md`

**Process:**
1. Validate naming: `start-1-5` ✓ (follows pattern)
2. Check emoji: 📚 ✓ (teaching emoji)
3. Verify reference: `@teaching/1.5-workflows/CLAUDE.md`
4. Check file exists: ✓
5. Validate structure matches teaching template: ✓

**Output:**
```
✅ VALIDATION PASSED

Command: start-1-5
Category: teaching
Module: 1.5 (workflows)
Reference: @teaching/1.5-workflows/CLAUDE.md ✓

Teaching command structure valid.
```

---

## VARIATIONS

### Command Types

**Production Workflows (High-complexity):**
- Multi-step agent coordination
- Quality gates and validation
- Output specifications
- ~100-300 lines
- Examples: campaign, launch, orchestrate

**Utility Commands (Medium-complexity):**
- Single-purpose functionality
- Parameter validation
- Error handling
- ~50-150 lines
- Examples: load, prime, mcp-load

**Teaching Commands (Low-complexity):**
- Standard template
- Reference to lesson module
- Script instructions
- ~10-20 lines (all identical structure)
- Examples: start-1-1, start-2-3

**System Commands (Medium-complexity):**
- System management
- Monitoring and reporting
- Status checks
- ~50-100 lines
- Examples: system-health, cost-report, agent-status

---

## ADAPTATION

**When adapting commands from external sources:**

**Structure:** Convert to markdown command format | Ensure sections (WHEN TO USE, SYNTAX, WHAT IT DOES, EXAMPLES) | Add category+version metadata
**Naming:** Enforce kebab-case | Remove special chars | Match to command invocation (/-prefixed)
**Syntax docs:** Standardize examples | Use consistent format (bash code blocks) | Show all options with descriptions
**Workflow:** Map external command logic to system patterns/agents | Document integration points | Update tool references
**Attribution:** Footer with source info + modifications

**Adaptation validated via:** Command discovery scan + `pre-tool-use-write.ts` hook

---

## USAGE NOTES

**When to use this pattern:**
- Creating a new command component
- Validating existing command compliance
- Understanding command standards for contributions
- Debugging command configuration issues

**When to use `/generate command` instead:**
- Want interactive prompts for all fields
- Prefer guided creation over manual writing
- Need auto-validation during creation
- Creating multiple commands quickly

**Pattern chaining opportunities:**
- `component_command` → validate → `component_agent` (create agents referenced by command)
- `component_command` → validate → `component_pattern` (create patterns used by command)

---

## MAINTENANCE NOTES

**When adding new commands:**
1. Determine category (use existing 14 or propose new)
2. Choose emoji (category emoji or distinctive individual)
3. Update emoji mapping in this pattern
4. Update command count in stats (currently 67)
5. Run similarity detection against all existing commands

**When changing validation rules:**
1. Update RULES section in this pattern
2. Update component-consistency-validator.ts to read new rules
3. Re-validate all existing commands (regression test)
4. Update CHANGELOG.md with validation changes

**When adding new category:**
1. Add to category emoji table
2. Update CommandCategory type
3. Document category purpose and examples
4. Update stats

**When deprecating a command:**
1. Move to `.claude/deprecated/commands/`
2. Remove from emoji standards mapping
3. Update command count in stats
4. Add deprecation notice in file
5. Update related commands to remove references

---

## ACCESSIBILITY GUIDELINES

**Emoji Usage:**
- ✓ Always include text description after emoji
- ✓ Never use emoji as sole indicator
- ✓ Use consistent emoji for same category
- ✓ Test rendering on macOS, Linux, Windows
- ✗ Avoid newly-introduced emojis (compatibility issues)

**Command Documentation:**
- ✓ Clear, jargon-free language
- ✓ Specific examples with realistic parameters
- ✓ Action-oriented instructions
- ✓ Error messages that guide toward solution
- ✗ Avoid assuming user knowledge of internals

**Usage Syntax:**
- ✓ Clear parameter names (not abbreviations)
- ✓ Distinguish required vs optional
- ✓ Show alternatives with | separator
- ✓ Include realistic examples
- ✗ Don't use technical jargon in parameter names

---

**Pattern Version:** 1.0
**Last Updated:** 2025-11-06
**Component Count:** 67 commands (27 teaching + 40 production/utility/system)
**Category Count:** 14 categories
**Validation Coverage:** 100%
