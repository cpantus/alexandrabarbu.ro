# Execution Patterns

Reference for systematic implementation approaches.

---

## Pattern 1: File Creation
**When:** Plan says "create X file(s)"

```markdown
1. Read any reference files mentioned in plan
2. Create file(s) using Write tool
3. Verify content matches specification
4. Report: "Created [file.md] with [X] sections as specified"
```

## Pattern 2: File Modification
**When:** Plan says "update/edit X file(s)"

```markdown
1. YOU MUST read current file with Read tool
2. YOU MUST identify exact changes needed
3. YOU MUST use Edit tool for precise modifications
4. YOU MUST verify changes are correct
5. YOU MUST report: "Updated [file.md]: [description of changes]"
```

## Pattern 3: Code Execution
**When:** Plan says "run X command(s)"

```markdown
1. YOU MUST verify command is safe and matches plan
2. YOU MUST execute using Bash tool
3. YOU MUST capture output
4. YOU MUST check for errors
5. YOU MUST report: "Executed [command], result: [summary]"
```

## Pattern 4: Multi-Step Implementation
**When:** Plan has multiple sequential steps

```markdown
1. YOU MUST execute step 1 completely
2. YOU MUST verify step 1 success
3. YOU MUST execute step 2 completely
4. YOU MUST verify step 2 success
5. YOU MUST continue until all steps complete
6. YOU MUST report: "Completed all [N] steps successfully"
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Anti-Pattern 1: Adding Unspecified Features
**Wrong:**
```
Plan: "Create email template with header and body"
You: [Creates email template with header, body, footer, sidebar, and navigation]
```

**Right:**
```
Plan: "Create email template with header and body"
You: [Creates email template with ONLY header and body]
```

### ❌ Anti-Pattern 2: Changing the Approach
**Wrong:**
```
Plan: "Create 3 separate markdown files for campaign docs"
You: "I think it's better to use one JSON file instead..."
```

**Right:**
```
Plan: "Create 3 separate markdown files for campaign docs"
You: [Creates exactly 3 markdown files]
```

If you genuinely think the approach won't work, ask: "I received instructions to create 3 markdown files, but I notice [specific technical blocker]. Should I proceed or clarify with coordinator?"

### ❌ Anti-Pattern 3: Premature Optimization
**Wrong:**
```
Plan: "Create simple script to process 100 files"
You: [Builds complex parallel processing system with caching]
```

**Right:**
```
Plan: "Create simple script to process 100 files"
You: [Creates simple, straightforward script]
```

### ❌ Anti-Pattern 4: Incomplete Reporting
**Wrong:**
```
You: "Done"
```

**Right:**
```
You: "Implementation complete. Created 3 files:
- campaign-strategy.md (234 lines)
- content-calendar.md (156 lines)
- metrics-dashboard.md (89 lines)

All files follow specified format. Ready for review."
```

---

## Decision Framework

### When to Execute Immediately
- Plan is clear and complete
- All required resources exist
- No technical blockers
- Approach is straightforward

→ **Action:** Execute as specified, report when done

### When to Ask Clarification
- Plan is ambiguous or incomplete
- Technical blocker exists
- Requirements seem to conflict
- Approach seems problematic

→ **Action:** Ask coordinator specific question, wait for response

### When to Report Issues
- Implementation blocked mid-execution
- Error encountered
- Specification doesn't match reality
- Quality criteria can't be met

→ **Action:** Report issue clearly, suggest solutions, await guidance

---

**Reference:** Load with `@task-implementer/resources/execution-patterns.md`
