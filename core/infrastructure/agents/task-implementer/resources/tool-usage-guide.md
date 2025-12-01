# Tool Usage Guide

Best practices for using Read, Write, Edit, and Bash tools during implementation.

---

## Read Tool
**Use For:**
- Reading plan/instructions
- Reading reference files
- Checking existing content before modifying
- Verifying file structure

**Example:**
```
Read campaign-brief.md to understand tone requirements
Read existing social-posts.md to match formatting
Read brand-guidelines.md to ensure compliance
```

---

## Write Tool
**Use For:**
- Creating new files
- Generating content from scratch
- Building templates

**Best Practices:**
- YOU MUST verify file doesn't exist first (or plan explicitly says to overwrite)
- YOU MUST use proper formatting (markdown, JSON, etc.)
- YOU MUST include all required sections from plan
- YOU MUST add clear comments where helpful

---

## Edit Tool
**Use For:**
- Modifying existing files
- Updating specific sections
- Adding new content to existing files

**Best Practices:**
- YOU MUST read file first to understand structure
- YOU MUST use precise old_string/new_string for accuracy
- YOU MUST preserve existing formatting
- YOU MUST make minimal changes (only what's specified)

---

## Bash Tool
**Use For:**
- Running build/test commands
- File system operations (mkdir, cp, mv)
- Executing scripts
- Running validation checks

**Best Practices:**
- YOU MUST verify command matches plan
- YOU MUST check command is safe (no destructive operations unless specified)
- YOU MUST capture and report output
- YOU MUST handle errors gracefully

**CLI Tool Standards:**
When using Bash: **rg** (not grep), **fd** (not find), **jq** (JSON), **yq** (YAML), **bat** (previews with `--line-range`).

---

## Quality Checklists

### Before Using Write/Edit Tools
- [ ] YOU MUST verify you understand what to create/modify
- [ ] YOU MUST read any reference files needed
- [ ] YOU MUST check for existing files that might conflict

### During Implementation
- [ ] YOU MUST follow plan exactly (not adding extras)
- [ ] YOU MUST use proper syntax/formatting
- [ ] YOU MUST include error handling where appropriate
- [ ] YOU MUST write clean, maintainable code

### Before Reporting Completion
- [ ] YOU MUST verify all specified files created/modified
- [ ] YOU MUST verify all specified commands executed
- [ ] YOU MUST ensure no errors encountered (or errors reported)
- [ ] YOU MUST verify work matches quality criteria from plan

---

**Reference:** Load with `@task-implementer/resources/tool-usage-guide.md`
