# Compress Documentation

## PURPOSE
Reduce file size by 40-60% while preserving 100% of knowledge using systematic compression techniques.

## INPUT
- **File path** to compress (markdown, JSON, code, documentation)
- **Target compression %** (default: 40% of original = 60% reduction)
- **File type** (documentation, configuration, code)
- **Compression level** (conservative 30%, standard 40%, aggressive 60%)

## PROCESS

### Step 1: Analyze Current File (5 min)
1. Read full file content
2. Count metrics:
   - Total lines
   - Total words
   - Total characters
   - Estimated tokens (~0.4 × words)
3. Calculate target metrics (multiply by target %)
4. Identify sections and their sizes

### Step 2: Plan Compression by Section (10 min)
1. Map sections to compression targets
2. Identify verbose areas:
   - Redundant explanations
   - Multiple similar examples
   - Long prose paragraphs
   - Repeated concepts
   - Verbose code blocks
3. Determine techniques per section

### Step 3: Apply Compression Techniques (30-45 min)

**Notation Techniques:**
- **Pipe notation (|)** - Sequential concepts inline
  - Before: "First do X. Then do Y. Finally do Z."
  - After: "X | Y | Z"
- **Arrow notation (→)** - Cause-effect relationships
  - Before: "When you trigger the hook, it loads the skills"
  - After: "Trigger hook → loads skills"
- **Colon notation (:)** - Definition relationships
  - Before: "The complexity level is either simple, medium, or complex"
  - After: "Complexity: simple|medium|complex"

**Structure Techniques:**
- **Compact tables** - Lists become tables
  - Commands, options, configurations
- **Inline lists** - Replace vertical bullets
  - Before: 3 lines of bullets → After: comma-separated inline
- **Ellipsis in code (...)**  - Show structure without repetition
  - Full: `{"field1": "val", "field2": "val", "field3": "val"}`
  - Compressed: `{"field1": "val", ...}`

**Content Techniques:**
- **Remove verbose prose** - Keep facts, eliminate explanation
  - Cut: "It's important to understand that...", "As you can see...", "This means that..."
- **Consolidate examples** - 1-2 examples instead of 5+
- **Remove redundancy** - Say it once, reference it elsewhere
- **Abbreviated headers** - "Configuration Standards" → "Config Standards"
- **Progressive disclosure links** - Link to full docs instead of including

### Step 4: Verify Knowledge Preservation (10 min)
1. Create knowledge checklist from original:
   - All concepts mentioned
   - All facts stated
   - All examples demonstrated
   - All references provided
2. Verify compressed version includes 100% of checklist items
3. Check readability maintained

### Step 5: Generate Metrics Report (5 min)
1. Count compressed file metrics
2. Calculate compression ratio
3. Verify target achieved
4. Document techniques used

## OUTPUT

### Compressed File
Complete compressed content ready to replace original

### Metrics Report
```
Original:  [lines] lines, [words] words, ~[tokens] tokens
Target:    [lines] lines, [words] words, ~[tokens] tokens ([%]% of original)
Achieved:  [lines] lines, [words] words, ~[tokens] tokens ([%]% of original)

Compression: [%]% reduction
Knowledge:   100% preserved
```

### Techniques Applied
- List of compression techniques used
- Section-by-section breakdown
- Specific notation examples

## QUALITY CHECKS

- [ ] Target compression % achieved (±5%)
- [ ] 100% of knowledge elements preserved
- [ ] File still readable and scannable
- [ ] All facts present (no information loss)
- [ ] Structure maintains clarity
- [ ] Code examples remain functional
- [ ] Links and references intact
- [ ] Formatting valid (markdown, JSON, etc.)

## EXAMPLE

**Input:**
```
File: .claude/CLAUDE.md
Target: 40% of original (60% reduction)
Type: Documentation (markdown)
Level: Standard
```

**Original Metrics:**
```
Lines: 643
Words: 2,102
Tokens: ~2,802
```

**Compressed Output:**
```markdown
# Claude Code Infrastructure v4.0

## Architecture
**Knowledge** in auto-activating skills | **Tasks** via reusable patterns | **Complex work** via specialized agents | **Context** persists via dev docs (95%+ recovery) | **v4.0** adds background execution

**Agents** - Process/workflow (200-400 lines): Coordination, tools, procedures
**Skills** - Knowledge (under 500 lines): Principles, frameworks, links to resources (on-demand loading)
[...continues with compressed content...]
```

**Achieved Metrics:**
```
Lines: 241 (37.5% of original)
Words: ~800 (38% of original)
Tokens: ~1,067 (38% of original)

Compression: 62.5% reduction (exceeds 60% target)
Knowledge: 100% preserved
```

**Techniques Applied:**
1. Pipe notation (|) for sequential concepts: 45 instances
2. Arrow notation (→) for cause-effect: 28 instances
3. Compact tables for commands: 3 tables
4. Ellipsis in JSON schemas: 5 schemas
5. Inline lists: 12 sections
6. Removed verbose prose: ~400 words
7. Abbreviated headers: 15 sections
8. Progressive disclosure links: 8 references

## VARIATIONS

### Conservative (30% reduction to 70% of original)
- Use pipe/arrow notation sparingly
- Keep some verbose explanations
- Maintain most examples
- Light table compression
- Good for complex technical docs

### Standard (40% reduction to 60% of original - DEFAULT)
- Balanced notation usage
- Remove redundant prose
- Consolidate examples (2-3 per concept)
- Table compression for lists
- Good for most documentation

### Aggressive (60% reduction to 40% of original)
- Heavy notation usage
- Minimal prose (facts only)
- 1 example per concept
- Maximum table compression
- Ellipsis in all code blocks
- Good for quick reference files

### Ultra (70% reduction to 30% of original)
- Ultra-compact notation
- Zero prose (pure structure)
- Cheat-sheet format
- Single-line sections where possible
- Good for compressed "quick" files (like `*-patterns-quick.md`)

## COMPRESSION TECHNIQUES REFERENCE

### Notation Systems

**Pipe (|)** - Sequential or alternative items
```
Before: First X, then Y, finally Z
After:  X | Y | Z

Before: Use either option A or option B
After:  A|B
```

**Arrow (→)** - Cause/effect, transformation, flow
```
Before: When X happens, Y occurs
After:  X → Y

Before: Input gets processed and becomes output
After:  Input → process → output
```

**Colon (:)** - Definition, expansion
```
Before: The model can be either haiku, sonnet, or opus
After:  model: haiku|sonnet|opus
```

**Ellipsis (...)** - Repeated or obvious patterns
```json
Before: {"item1": {"field": "val"}, "item2": {"field": "val"}}
After:  {"item1": {...}, "item2": {...}}
```

### Structure Patterns

**Inline Lists:**
```
Before:
- Item one
- Item two
- Item three

After:
Items: one, two, three
```

**Tables for Commands:**
```
Before:
/command1 - Does thing one
/command2 - Does thing two

After:
| Command | Purpose |
|---------|---------|
| /command1 | Thing one |
| /command2 | Thing two |
```

**Abbreviated Sections:**
```
Before: ## Configuration Standards and Guidelines
After:  ## Config Standards
```

**Progressive Disclosure:**
```
Before: [500 words of detailed explanation]
After:  [2 sentences summary] See: @path/to/full-docs.md
```

---

**Related Patterns:** `component_resource` (resource file standards)
**See Also:** Existing compressed files: `voice-patterns-quick.md`, `personas-patterns-quick.md`, `performance-patterns-quick.md`
