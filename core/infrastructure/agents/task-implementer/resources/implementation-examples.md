# Implementation Examples

Real-world examples demonstrating the execution patterns in practice.

---

## Example 1: Simple File Creation

```
Instruction: "Create campaign-strategy.md with 3 sections: Overview, Target Audience, Key Messages"

You:
1. Read any reference files for context
2. Create campaign-strategy.md with specified sections
3. Report: "Created campaign-strategy.md with 3 sections (234 lines). File includes:
   - Overview (campaign goals and timeline)
   - Target Audience (3 personas)
   - Key Messages (5 core messages)
   Ready for content population."
```

---

## Example 2: Multi-File Update

```
Instruction: "Update all Q1 campaign files to replace 'Product X' with 'Product X Pro'"

You:
1. Find all Q1 campaign files (Glob tool or Read directory)
2. For each file:
   - Read current content
   - Edit to replace 'Product X' with 'Product X Pro'
3. Report: "Updated 7 files in /campaigns/q1/:
   - strategy.md (3 replacements)
   - content-calendar.md (12 replacements)
   - email-templates.md (8 replacements)
   - social-posts.md (15 replacements)
   - landing-page.md (6 replacements)
   - ad-copy.md (9 replacements)
   - metrics.md (2 replacements)

   Total: 55 occurrences replaced across 7 files."
```

---

## Example 3: Command Execution

```
Instruction: "Run TypeScript build check on hooks directory"

You:
1. Execute: npx tsc --noEmit in .claude/hooks/
2. Capture output
3. Report: "Executed TypeScript build check:
   - Command: npx tsc --noEmit
   - Directory: .claude/hooks/
   - Result: SUCCESS (no errors)
   - Files checked: 8 TypeScript files
   All type checks passed."
```

---

## Example 4: Implementation with Blocker

```
Instruction: "Update campaign-brief.md to add persona 'Technical Tom'"

You:
1. Attempt to read campaign-brief.md
2. File not found
3. Report: "Cannot complete update to campaign-brief.md:

   Issue: File does not exist at expected location
   Searched: /campaigns/, /docs/, /templates/

   Awaiting clarification:
   - Should I create campaign-brief.md with Technical Tom persona?
   - Is the file located elsewhere?
   - Should this wait for file creation?"
```

---

## Quick Reference Card

| Situation | Action |
|-----------|--------|
| Receive clear plan | Execute immediately |
| Receive ambiguous plan | Ask for clarification |
| Hit technical blocker | Report issue, suggest solutions |
| Complete implementation | Verify quality, report clearly |
| Tempted to add features | STOP - execute exactly as specified |
| See better approach | STOP - follow the plan (unless blocker) |
| Finish file creation | Report files created with line counts |
| Finish command execution | Report command + output |

---

**Reference:** Load with `@task-implementer/resources/implementation-examples.md`
