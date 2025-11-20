# Pattern: Component - Workflow

**Category**: meta
**Complexity**: simple
**Thinking**: N/A
**Knowledge Required**: N/A
**Version:** 2.0 (v5.4.0 - Directive Language + Task Decomposition Override)

---

## PURPOSE

Define structure, validation rules, and quality standards for workflow pattern components (scout/plan/build) in the Marketing Agent system.

---

## Task Decomposition Override (v5.4.0)

When creating or validating workflow components, **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE (Simple Pattern Creation):
1. Create workflow pattern without agent coordination analysis
2. Skip phase-specific validation
3. Forget to define hand-off protocols between agents
4. Deploy without testing multi-agent execution

### ✅ MANDATORY SEQUENCE (Systematic Workflow Development):

**Phase 1: Input Validation** (Validate 3 critical workflow requirements)
1. **Phase Validation**: Verify workflow phase is scout/plan/build and follows conventions
   - Reference: This pattern "Naming Convention" section
   - Output: Phase validity + naming compliance (`[phase]_workflow` pattern)

2. **Agent Coordination Validation**: Check which agents participate and hand-off logic
   - Reference: Agent orchestration patterns, existing workflow examples
   - Output: Agent coordination feasibility + hand-off protocol clarity

3. **Output Specification Validation**: Ensure workflow produces clearly defined deliverables
   - Reference: Pattern output standards
   - Output: Output specification completeness + format clarity

**Output Acknowledgment After Phase 1:**
```
Workflow Validation Input Analysis:
- Phase: [scout ✓, naming: scout_workflow ✓]
- Agent Coordination: [3 agents: researcher, analyst, synthesizer ✓]
- Output Specification: [Research summary + data files ✓]
```

**Phase 2: Staged Execution** (Create workflow with proper structure)
4. Create workflow pattern with phase-specific agent coordination
5. Define hand-off protocols (what each agent receives/produces)
6. Specify output format and quality gates

**Phase 3: Output Generation** (Test and validate workflow)
7. Test workflow executes all phases correctly
8. Verify agent hand-offs work as specified
9. Validate final output meets specification

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** Workflow creation requires validating agent coordination and output specifications upfront. Skipping Phase 1 leads to poorly coordinated multi-agent workflows, unclear hand-off protocols, and undefined outputs.

---

## Language Standards (v5.4.0)

**YOU MUST use directive language throughout workflow specifications:**

**Required Directives:**
- ✅ "MUST", "DO NOT", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "recommended"

**Workflow Requirements:**
- ✅ "Workflows MUST define agent hand-off protocols"
- ❌ "Workflows should define hand-offs"

**Agent Coordination:**
- ✅ "Execute phase 1", "ALWAYS validate hand-offs", "NEVER skip quality gates"
- ❌ "Try to execute", "Consider validating", "Should check quality"

**Enforcement Note:** Meta-patterns with weak language will be rejected by validation hooks.

---

## INPUT

**Required:**
1. **Workflow name**: snake_case with `_workflow` suffix
2. **Phase**: scout, plan, or build
3. **Agent coordination**: Which agents participate
4. **Output specification**: What the workflow produces

---

## RULES

### Naming Convention

**Format:** `[phase]_workflow`

**Valid examples:**
- `scout_workflow` ✓
- `plan_workflow` ✓
- `build_workflow` ✓

**Pattern:** Must end with `_workflow`

---

### Emoji Standards

**3 Workflow Patterns:**
- `scout_workflow`: 🔎 (research/discovery)
- `plan_workflow`: 📋 (planning/organization)
- `build_workflow`: 🔨 (execution/creation)

**Category emoji:** 🔄 (workflow category)

---

### Structure

Workflow patterns define multi-agent coordination:

```markdown
# Pattern: [Phase] Workflow

**Category**: workflow
**Complexity**: complex
**Thinking**: think-hard

---

## PURPOSE
[What this workflow phase accomplishes]

## AGENTS
[Which agents coordinate in this workflow]

## PROCESS
[Step-by-step coordination logic]

## OUTPUT
[What gets produced]
```

---

## QUALITY CHECKS

- [ ] Name ends with `_workflow`
- [ ] Phase clearly defined (scout/plan/build)
- [ ] Agent coordination explicit
- [ ] Hand-off protocol defined
- [ ] Output format specified

---

## ADAPTATION

**When adapting workflows from external sources:**

**Structure:** Map to scout/plan/build phases | Define agent coordination explicitly | Specify hand-off protocols and outputs
**Naming:** Enforce `_workflow` suffix | Use appropriate phase identifier | Match workflow system conventions
**Agent references:** Map external agents to system agents | Validate all referenced agents exist | Update tool/capability references
**Complexity:** Set to complex (workflows coordinate multiple components) | Use think-hard or ultrathink directives
**Attribution:** Footer with source info

**Adaptation validated via:** Workflow system integration tests + `pre-tool-use-write.ts` hook

---

**Pattern Version:** 1.0
**Last Updated:** 2025-11-12
**Component Count:** 3 workflows
