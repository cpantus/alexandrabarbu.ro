---
name: "[agent-name]"
description: "[emoji] One-sentence description of agent's core expertise"
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Task
model: "sonnet"  # or "opus" or "haiku"
thinking: "think"  # or "think-hard" or "ultrathink"
---

# [Agent Name] Agent

**DOCUMENTATION CHECKLIST - COMPLETE BEFORE IMPLEMENTING:**

**[ ] 1. Update README.md:**
   - **Section**: Agent count in Quick Reference or Architecture
   - **Action**: Increment agent count, add to agent list if displayed
   - **Why**: Keep component inventory accurate

**[ ] 2. Update core/docs/agent-orchestration.md:**
   - **Section**: "Available Agents" or category-specific section
   - **Action**: Add agent entry with name, emoji, purpose, tools, model
   - **Why**: Central registry for agent discovery

**[ ] 3. Update ARCHITECTURE.md:**
   - **Section**: "Agent System" or "Marketing Agents"
   - **Action**: Add agent to architecture diagram/list
   - **Why**: Track system capabilities

**[ ] 4. Register agent (if background-capable):**
   - **File**: core/infrastructure/hooks/background-agent.ts
   - **Action**: Add agent ID to registry if supports background execution
   - **Why**: Enable /background command usage

**[ ] 5. Update plugin README (if plugin agent):**
   - **File**: [plugin-name]/README.md
   - **Action**: Add agent to plugin's agent list
   - **Why**: Document plugin-specific capabilities

---

## Role

[1-2 paragraphs describing the agent's role, expertise, and when to use it]

**Core Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

**Ideal For:**
- [Use case 1]
- [Use case 2]
- [Use case 3]

---

## Task Decomposition Override (v5.4.0)

When this agent is invoked ([specific invocation contexts]), **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE ([Name the anti-pattern - typical poor approach]):
1. [Wrong approach step 1 - common mistake in agent workflows]
2. [Wrong approach step 2 - leads to fragmented/incomplete work]
3. [Wrong approach step 3 - violates agent's core methodology]
4. [Wrong approach step 4 - produces poor quality outputs]

### ✅ MANDATORY SEQUENCE ([Agent's methodology name]):

**Phase 1: [Strategic Analysis]** (Make [N] critical decisions)
1. **[Analysis Name 1]**: [What to analyze/assess]
   - Reference: Agent "[Section Name]" or @[agent-name]/resources/[resource].md
   - Output: [Assessment result to document]

2. **[Analysis Name 2]**: [What to analyze/assess]
   - Reference: Agent "[Section Name]" or @[agent-name]/resources/[resource].md
   - Output: [Assessment result to document]

3. **[Analysis Name 3]**: [What to analyze/assess]
   - Reference: Agent "[Section Name]" or @[agent-name]/resources/[resource].md
   - Output: [Assessment result to document]

**Output Acknowledgment After Phase 1:**
```
[Agent Name] Analysis:
- [Analysis 1]: [Result + implications]
- [Analysis 2]: [Result + implications]
- [Analysis 3]: [Result + implications]
```

**Phase 2: [Execution]** (Execute workflow based on Phase 1 analysis)
4. [Execution step 1 - applies Phase 1 analysis]
5. [Execution step 2 - follows agent methodology]
6. [Execution step 3 - generates core deliverables]

**Phase 3: [Reporting]** (Validate and summarize outcomes)
7. [Validation criterion 1 - verify quality standards met]
8. [Validation criterion 2 - check completeness]
9. [Summary generation - unified report, not fragmented outputs]

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** [Explain WHY the mandatory sequence is required. What quality does it guarantee? What problem does it solve? How does strategic analysis ensure optimal outcomes?]

---

## Language Standards (v5.4.0)

**YOU MUST use directive language throughout agent workflows:**

**Required Directives:**
- ✅ "MUST", "DO NOT", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "it's recommended"

**Workflow Steps:**
- ✅ "Execute X", "Validate Y", "Generate Z"
- ❌ "Try to do X", "Consider Y", "Should generate Z"

**Quality Standards:**
- ✅ "This agent MUST ensure:", "MANDATORY verification:"
- ❌ "This agent should ensure:", "Recommended checks:"

**Enforcement Note:** Agents with weak language will be rejected by validation hooks.

---

## Capabilities

### Primary Skills
- **[Skill Name]**: [Description of capability]
- **[Skill Name]**: [Description of capability]
- **[Skill Name]**: [Description of capability]

### Tools & Methods
- **Tool Usage**: [Which tools this agent uses most, e.g., Read for research, Task for delegation]
- **Thinking Mode**: [How agent approaches problems - analytical, creative, systematic]
- **Collaboration**: [How agent works with other agents or patterns]

---

## Workflow

### Phase 1: [Phase Name]
**Goal:** [What this phase accomplishes]

**Steps:**
1. [Step description]
2. [Step description]
3. [Step description]

**Outputs:**
- [Deliverable 1]
- [Deliverable 2]

---

### Phase 2: [Phase Name]
**Goal:** [What this phase accomplishes]

**Steps:**
1. [Step description]
2. [Step description]

**Outputs:**
- [Deliverable 1]
- [Deliverable 2]

---

### Phase 3: [Phase Name]
[Continue as needed...]

---

## Quality Standards

**This agent ensures:**
- [ ] [Quality criterion 1]
- [ ] [Quality criterion 2]
- [ ] [Quality criterion 3]

**Output Validation:**
- [How to verify agent's work meets standards]
- [Specific metrics or checks to perform]

---

## Integration

**Works Best With:**
- **Agent**: [agent-name] - [Why/when to combine]
- **Pattern**: [pattern_name] - [Why/when to use]
- **Skill**: [skill-name] - [What knowledge it leverages]

**Command Usage:**
```bash
# Direct invocation
/[agent-command] [args]

# Background execution
/background [agent-name]

# Via orchestration
/workflow scout-plan-build "[task description]"
```

---

## Cost Optimization

**Model Selection:** [Why this model was chosen - balance of capability vs cost]

**Thinking Mode:** [Why this thinking mode - depth needed vs cost]

**Efficiency Strategies:**
- [Strategy 1, e.g., "Uses Read instead of Bash for file operations"]
- [Strategy 2, e.g., "Delegates complex sub-tasks to specialized agents"]
- [Strategy 3, e.g., "Leverages prompt caching for large contexts"]

**Estimated Cost:** [Rough tokens per invocation, e.g., "~50K tokens for full workflow"]

---

## Examples

### Example 1: [Scenario Name]

**Input:**
```
[Example user request or task]
```

**Agent Approach:**
```
1. [Step the agent takes]
2. [Step the agent takes]
3. [Step the agent takes]
```

**Output:**
```
[What the agent produces]
```

---

### Example 2: [Scenario Name]

[Additional examples as needed]

---

## Limitations

**Not Ideal For:**
- [Task type 1] - [Why, and what to use instead]
- [Task type 2] - [Why, and what to use instead]
- [Task type 3] - [Why, and what to use instead]

**Known Constraints:**
- [Limitation 1]
- [Limitation 2]

---

## Configuration

**Environment Variables:**
- `[ENV_VAR_NAME]`: [What it controls, default value]

**Model Rules (if custom):**
```json
{
  "taskType": "[task-type]",
  "agentName": "[agent-name]",
  "model": "sonnet",
  "thinking": "think"
}
```

---

## Notes

**Design Decisions:**
- [Key decision and rationale]
- [Key decision and rationale]

**Future Enhancements:**
- [Potential improvement]
- [Potential improvement]

---

**Agent Version:** 1.0
**Last Updated:** [YYYY-MM-DD]
**Maintained By:** [Team/role]
**Category:** [infrastructure|plugin-specific]
