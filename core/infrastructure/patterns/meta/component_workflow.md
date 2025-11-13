# Pattern: Component - Workflow

**Category**: meta
**Complexity**: simple
**Thinking**: N/A
**Knowledge Required**: N/A

---

## PURPOSE

Define structure, validation rules, and quality standards for workflow pattern components (scout/plan/build) in the Marketing Agent system.

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
