# Pattern System (Focused Execution Templates)

**Patterns are task-specific execution templates** that provide focused, reusable workflows for common development tasks.

## What Are Patterns?

Patterns complement skills by providing **structured execution templates** rather than knowledge:
- **Skills** = Knowledge and context (best practices, design patterns, frameworks)
- **Patterns** = Step-by-step execution logic (how to design a component, architect a system)
- **Agents** = Specialized orchestration (complex multi-faceted work)

## When to Use Patterns

**Use patterns for:**
- ✅ Focused tasks with clear structure (component design, API design, system architecture)
- ✅ Repeatable workflows (code review, performance optimization, accessibility audit)
- ✅ Speed optimization (patterns load 40-50% faster than full skills)
- ✅ Consistent output format (patterns enforce OUTPUT structure)

**Use skills for:**
- ✅ Knowledge loading (best practices, design principles, architecture patterns)
- ✅ Context and background information
- ✅ Cross-referenced expertise
- ✅ Deep technical thinking

**Use agents for:**
- ✅ Complex orchestration (system design, architecture review)
- ✅ Multi-faceted work requiring specialist review
- ✅ High-stakes decisions needing multiple perspectives

## Pattern Execution Methods

**1. Auto-suggestion (via hooks):**
```
User: "Design a user dashboard component"
→ Hook suggests: component_design pattern + frontend-best-practices skill
```

**2. Manual execution:**
```bash
/pattern component_design "user dashboard" "React" "responsive"
/pattern system_design "e-commerce platform" "microservices"
/pattern api_design "payment processing" "REST"
```

**3. Pattern chaining:**
```bash
/chain wireframe → component_design → performance_optimization
/chain system_design → api_design → scalability_analysis
/chain user_flow → wireframe → usability_test
```

## Available Patterns (37 total: 21 core + 16 code plugin)

**Core Infrastructure Patterns (21):**
- **Meta** (11): component_agent, component_pattern, component_skill, component_command, component_hook, component_workflow, component_resource, component_mcp_server, compress_documentation, pre_creation_check, PATTERN-TEMPLATE
- **Workflow** (5): scout_workflow, plan_workflow, build_workflow, two_stage_content_sonnet_haiku, two_stage_content_sonnet_sonnet
- **Bundles** (4): analysis-bundle, content-bundle, optimization-bundle, strategy-bundle

**Code Plugin Patterns (16):**

**Frontend Patterns (4):**
- `component_design` - React/Vue/Angular component architecture
- `state_management` - Redux/Zustand/Pinia state patterns
- `performance_optimization` - Bundle size, lazy loading, memoization
- `accessibility_audit` - WCAG compliance, ARIA, keyboard navigation

**UX Patterns (4):**
- `wireframe` - Low/high fidelity wireframes
- `user_flow` - User journey mapping, flow diagrams
- `design_system` - Component libraries, design tokens
- `usability_test` - User testing plans, heuristic evaluation

**Architecture Patterns (4):**
- `system_design` - Scalable system architecture
- `api_design` - REST/GraphQL API design
- `architecture_decision` - ADR (Architecture Decision Records)
- `scalability_analysis` - Performance, load testing, bottlenecks

**Hugo Patterns (4):**
- `hugo_theme_setup` - Hugo theme configuration
- `hugo_template_refactor` - Template optimization
- `hugo_content_migration` - Content migration strategies
- `hugo_performance_audit` - Static site performance

## Pattern Structure

Each pattern includes:
- **PURPOSE**: One-sentence description
- **INPUT**: What the pattern expects
- **PROCESS**: Step-by-step execution logic
- **OUTPUT**: Exact format specification
- **QUALITY CHECKS**: Validation criteria
- **EXAMPLE**: Real input → output demonstration
- **VARIATIONS**: Customization options

### v5.4.0 Structure Requirements (Component Reuse = Quality Guarantee)

All patterns created after v5.4.0 MUST include:

1. **Task Decomposition Override Section**
   - Overrides Claude's default task breakdown behavior
   - Provides MANDATORY 3-phase execution sequence
   - Includes ❌ PROHIBITED anti-patterns with consequences
   - Includes ✅ MANDATORY phase-by-phase guidance
   - Output Acknowledgment formats for validation

2. **Language Standards Section**
   - Enforces directive language (YOU MUST/DO NOT)
   - Prohibits weak language (should/consider/might)
   - Rationale: "Weak language leads to inconsistent execution"

**Phase naming conventions:**
- Research patterns: "Query Formulation & Source Strategy" → "Research Execution" → "Quality Validation"
- Workflow patterns: "Input Validation & Strategy" → "Staged Execution" → "Output Generation"
- Content patterns: "Content Strategy & Parameters" → "Generation" → "Review & Selection"

**Validation:** Use `/pattern component_pattern` to validate structure before production use.

## Pattern + Skills Integration

Patterns often reference skills for knowledge:
- `component_design` → loads `frontend-best-practices` skill
- `system_design` → references `architecture-patterns` skill
- `wireframe` → uses `ux-guidelines` skill principles
- `hugo_theme_setup` → references `hugo-development` skill

**Benefits:**
- 40-50% faster execution (compressed knowledge)
- 75% token reduction for common tasks
- Consistent output quality (enforced structure)
- Easy to chain into complex workflows

## Pattern Enforcement Levels (v5.3.0: Guidance-First)

**Complexity-based enforcement** ensures quality gates through context injection:

### Simple Patterns (🟢 SUGGESTED)
- **Examples**: component_agent, component_pattern, compress_documentation
- **Enforcement**: Gentle recommendation
- **Message**: "This pattern provides structure and quality gates. You may proceed without it if you have specific reasons."
- **Bypass**: No justification required
- **Behavior**: Hook suggests, no auto-load

### Medium Patterns (🔴 MANDATORY - AUTO-LOADED)
- **Examples**: system_design, api_design, component_design
- **Enforcement**: AUTO-INJECTION into Claude's context (200-500 tokens)
- **Message**: "✓ pattern-name auto-loaded (MANDATORY pattern, tier mode, N tokens)"
- **Behavior**: Pattern content injected → Claude executes workflow naturally
- **Bypass**: Requires "Bypassing pattern because..." in prompt
- **Progressive loading**: Quick tier loads core sections only

### Complex Patterns (🔴 MANDATORY - AUTO-LOADED)
- **Examples**: architecture_decision, scalability_analysis, hugo_content_migration
- **Enforcement**: AUTO-INJECTION into Claude's context (200-500 tokens)
- **Message**: "✓ pattern-name auto-loaded (MANDATORY pattern, tier mode, N tokens)"
- **Behavior**: Pattern content injected → Claude executes workflow naturally
- **Bypass**: Requires "Bypassing pattern because..." in prompt
- **Progressive loading**: Quick tier loads core sections only

### Auto-Load Mechanism (v5.3.0)

**Philosophy shift:**
- OLD: Block execution, require `/pattern` command
- NEW: Auto-inject pattern content into Claude's context
- Result: Pattern files are delegatable systems executed naturally

**How it works:**
1. Hook detects medium/complex pattern match
2. Check for bypass justification
3. If no bypass → load pattern progressively (tier-based)
4. Inject via stdout: `<required-pattern>...</required-pattern>`
5. Cache per session (no duplicate loads)
6. Claude sees workflow in context → executes it

**Progressive disclosure:**
- Quick tier: Core sections (PURPOSE, PROCESS, OUTPUT) ~200-500 lines
- Full tier: Complete pattern content
- Session cache prevents duplicate injections

### Justification Bypass

To proceed without a MANDATORY pattern, include in your prompt:
```
"Bypassing pattern because [specific reason]"

Alternative approach: [your approach]
Risk acknowledgment: [understood risks]
```

**Accepted justification phrases:**
- "Bypassing pattern because..."
- "Not using pattern because..."
- "Manual implementation because..."
- "Alternative approach: ..."
- "Justification: ..."

**When bypass is detected:**
- 🟡 Warning shown acknowledging bypass
- Quality gates NOT enforced
- User responsible for maintaining standards
- Pattern still recommended for validated output

## Pattern Decision Framework

**Choose pattern when:**
- Task is well-defined and repeatable
- Speed is priority
- Output format is standardized
- You want consistent structure

**Choose skill when:**
- You need deep context or background
- Task requires strategic thinking
- Multiple cross-references needed
- Educational understanding desired

**Choose agent when:**
- Task requires multiple specialties
- High complexity with many dependencies
- Stakeholder review needed
- Strategic orchestration required

**Combine all three when:**
- Complex production applications
- High-stakes system redesigns
- Multi-tier architecture projects
- Major platform migrations

---

**See also:** `@.claude/patterns/README.md` for complete pattern system guide
**Load this file:** `/load patterns`
