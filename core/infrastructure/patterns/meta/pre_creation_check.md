# Pattern: Pre-Creation Check

**Category**: meta
**Complexity**: medium
**Thinking**: think
**Dependencies**: component-registry.json
**Version:** 2.0 (v5.4.0 - Directive Language + Task Decomposition Override)

---

## PURPOSE

Prevent functional duplication by checking if requested functionality already exists before creating new components. Maps task intent to existing components and determines whether to extend, configure, or create.

---

## Task Decomposition Override (v5.4.0)

When performing pre-creation checks, **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE (Skip Duplication Check):
1. Create new component immediately without searching
2. Skip keyword and capability analysis
3. Forget to check domain ownership
4. Deploy duplicate functionality

### ✅ MANDATORY SEQUENCE (Systematic Duplication Prevention):

**Phase 1: Input Validation** (Analyze task intent and search registry)
1. **Intent Parsing**: Extract action verbs, domain nouns, technical terms
   - Reference: Task description
   - Output: Keywords + inferred capabilities

2. **Registry Search**: Check component-registry.json for matches
   - Reference: Keyword matches + capability matches + domain ownership
   - Output: Matching components list (exact + similar)

3. **Overlap Analysis**: Calculate functional overlap with existing components
   - Reference: Matching components capabilities vs requested functionality
   - Output: Overlap percentage + recommendation (extend/configure/create)

**Output Acknowledgment After Phase 1:**
```
Pre-Creation Check Analysis:
- Intent: [Optimize CLI commands with modern tools]
- Keywords: [CLI, bash, optimization, modern tools]
- Matches: [bash-optimizer.ts (85% overlap), pre-tool-use-bash.ts (70% overlap)]
- Recommendation: [EXTEND bash-optimizer.ts, DO NOT create new component]
```

**Phase 2: Staged Execution** (Determine action based on overlap)
4. If overlap >70%: Plan extension of existing component
5. If overlap 40-70%: Evaluate whether to extend or create
6. If overlap <40%: Plan new component creation

**Phase 3: Output Generation** (Produce decision with justification)
7. Generate recommendation with detailed rationale
8. Provide specific extension points if extending
9. Document decision for future reference

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** Pre-creation checks MUST prevent duplication by systematically searching existing components. Skipping Phase 1 leads to duplicate hooks, patterns, and skills that should have extended existing components.

---

## Language Standards (v5.4.0)

**YOU MUST use directive language:**
- ✅ "MUST check registry before creating", "NEVER create duplicates"
- ❌ "Should check registry", "Try to avoid duplicates"

**Enforcement Note:** Meta-patterns with weak language will be rejected by validation hooks.

---

## INPUT

**Required:**
1. **Task description**: What functionality is being requested
2. **Component type**: hook, pattern, skill, agent, command
3. **Proposed name**: Intended name for new component

---

## PROCESS

### 1. Parse Task Intent
Extract key concepts from task description:
- Action verbs (integrate, optimize, transform, validate)
- Domain nouns (CLI, bash, file, agent, telemetry)
- Technical terms (grep, ripgrep, jq, modern tools)

### 2. Search Component Registry
Check `component-registry.json` for matches:

```typescript
// Check exact keyword matches
const keywords = extractKeywords(taskDescription);
const matchingComponents = searchByKeywords(keywords);

// Check capability matches
const requiredCapabilities = inferCapabilities(taskDescription);
const capableComponents = searchByCapabilities(requiredCapabilities);

// Check domain ownership
const domain = identifyDomain(taskDescription);
const domainOwner = findDomainOwner(domain);
```

### 3. Analyze Intent Mappings
Match task against intent patterns:

```typescript
// Check intent mappings
for (const mapping of componentRegistry.intentMappings) {
  for (const pattern of mapping.patterns) {
    if (taskDescription.match(new RegExp(pattern, 'i'))) {
      return {
        component: mapping.mapTo,
        action: mapping.action,
        extensionPoint: mapping.extensionPoint
      };
    }
  }
}
```

### 4. Determine Action

**Decision Tree:**

```
IF exact_functionality_exists:
  IF component_is_extensible:
    → EXTEND at designated extension point
  ELSE:
    → USE existing component as-is
ELIF partial_functionality_exists:
  IF can_be_configured:
    → CONFIGURE via settings/rules files
  ELIF can_be_extended:
    → EXTEND with new capabilities
  ELSE:
    → CREATE wrapper or adapter
ELIF domain_has_owner:
  IF owner_is_extensible:
    → EXTEND domain owner
  ELSE:
    → CREATE complementary component
ELSE:
  → CREATE new component
```

### 5. Generate Recommendation

Format the decision with clear reasoning:

```markdown
## Pre-Creation Analysis

**Task:** [task description]
**Domain:** [identified domain]
**Intent:** [parsed intent]

### Existing Components Found:
- **[component-name]**: [relevance score]%
  - Capabilities: [matching capabilities]
  - Extension points: [if extensible]

### Recommendation: [EXTEND|CONFIGURE|USE|CREATE]

**Reasoning:**
[Detailed explanation of why this action was chosen]

**Action Steps:**
1. [Specific steps to implement the recommendation]
2. [File paths and modifications needed]
3. [Any configuration changes required]
```

---

## OUTPUT

### For EXTEND Action:
```json
{
  "action": "extend",
  "targetComponent": "hooks/pre-tool-use-bash",
  "extensionPoint": {
    "file": ".claude/hooks/utils/bash-optimizer.ts",
    "location": "optimizationRules array",
    "interface": "OptimizationRule"
  },
  "implementation": {
    "addRules": [
      {
        "name": "new-tool-optimization",
        "pattern": "regex-pattern",
        "tool": "tool-name",
        "priority": 85
      }
    ]
  }
}
```

### For CREATE Action:
```json
{
  "action": "create",
  "reason": "No existing component handles [domain]",
  "newComponent": {
    "type": "hook",
    "name": "proposed-name",
    "path": ".claude/hooks/proposed-name.ts",
    "registerIn": "component-registry.json"
  },
  "validation": {
    "checkedComponents": ["list-of-checked-components"],
    "checkedDomains": ["list-of-checked-domains"],
    "noMatchReason": "Specific reason why no match found"
  }
}
```

---

## QUALITY CHECKS

- [ ] Searched component registry for keywords
- [ ] Checked capability matches
- [ ] Verified domain ownership
- [ ] Tested intent pattern matching
- [ ] Documented why existing components don't match (if creating)
- [ ] Identified extension points (if extending)
- [ ] Provided clear implementation steps

---

## EXAMPLE

**Input:**
- Task: "Integrate modern CLI tools like htop and ncdu via pre-tool-use hook"
- Type: hook
- Proposed name: pre-tool-use-cli-tools

**Analysis:**
1. Keywords: [integrate, cli, tools, pre-tool-use, hook]
2. Domain: "bash optimization"
3. Intent match: "integrate.*cli.*tools" → hooks/pre-tool-use-bash

**Output:**
```json
{
  "action": "extend",
  "targetComponent": "hooks/pre-tool-use-bash",
  "reason": "Existing hook already handles CLI tool optimization via extensible rule system",
  "extensionPoint": {
    "file": ".claude/hooks/utils/bash-optimizer.ts",
    "location": "Add new rules to optimizationRules array"
  },
  "implementation": "Add OptimizationRule objects for htop and ncdu transformations"
}
```

---

## ERROR PREVENTION

**Common Mistakes:**
1. **Creating duplicate hooks** - Always check pre-tool-use-[tool] hooks first
2. **Missing extension points** - Look for "extensible: true" in registry
3. **Ignoring domain ownership** - Respect existing domain boundaries
4. **Shallow keyword matching** - Consider semantic similarity, not just exact matches

**Validation Rules:**
- MUST check component-registry.json before creating
- MUST document why no match if creating new
- MUST respect domain ownership boundaries
- MUST prefer extension over creation when possible

---

**Pattern Version:** 1.0
**Last Updated:** 2025-11-07
**Registry Version Required:** 1.0.0