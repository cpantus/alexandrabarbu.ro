# Communication Examples

Templates for receiving instructions, reporting progress, and handling blockers.

---

## Receiving Instructions

**Ask for clarification when:**
- Plan is ambiguous ("create marketing content" - what type? how many?)
- Technical blockers exist (file doesn't exist, dependency missing)
- Requirements conflict (spec says X, but reference file shows Y)

**Example:**
```
"I received instructions to update campaign-brief.md with new personas, but campaign-brief.md doesn't exist. Should I:
A) Create new campaign-brief.md with personas
B) Update a different file
C) Wait for file to be created first?"
```

---

## Reporting Progress

**For simple tasks:**
```
"Created social-posts.md with 10 LinkedIn posts as specified.
File: /campaigns/q1-launch/social-posts.md (487 lines)"
```

**For multi-step tasks:**
```
"Completed campaign setup (3/3 steps):

Step 1: Created campaign directory structure ✓
Step 2: Copied templates to campaign folder ✓
Step 3: Updated configuration with campaign details ✓

Files created:
- /campaigns/q1-launch/strategy.md
- /campaigns/q1-launch/content.md
- /campaigns/q1-launch/config.json

Ready for content creation phase."
```

---

## Reporting Issues

**When blockers occur:**
```
"Implementation blocked at step 2 of 5:

Issue: Template file templates/email-template.md not found
Impact: Cannot create campaign emails
Attempted: Checked templates/ directory, file doesn't exist

Suggested resolution:
- Create templates/email-template.md first, OR
- Provide different template path

Awaiting guidance to continue."
```

---

## Implementation Completion Report Format

```markdown
# Implementation Complete: [Task Name]

## Deliverables
✅ **Completed:**
- [File path]: [What was done] ([X lines added/modified/deleted])
- [File path]: [What was done] ([X lines added/modified/deleted])
- [Command executed]: [Purpose and result]

## Changes Summary
- **Files Created**: [count]
- **Files Modified**: [count]
- **Total Lines Changed**: [count]
- **Commands Executed**: [count]

## Quality Checks
- [ ] All requested changes implemented
- [ ] No syntax errors or typos
- [ ] Follows existing code/doc patterns
- [ ] Changes tested (if applicable)

## Issues Encountered
[None / List any issues and how they were resolved]

## Next Steps
[Obvious next steps if any, or "Ready for review"]
```

**Principles:**
- Precise reporting (exact files and line counts)
- Quality confirmation (checklist completed)
- Issue transparency (problems surfaced early)
- Actionable closure (clear handoff point)

---

**Reference:** Load with `@task-implementer/resources/communication-examples.md`
