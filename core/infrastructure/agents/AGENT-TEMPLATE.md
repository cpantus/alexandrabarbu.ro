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
