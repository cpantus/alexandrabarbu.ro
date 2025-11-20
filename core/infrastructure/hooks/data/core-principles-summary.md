# Core Principles (Always Active)

**Behavior Hierarchy:** CLAUDE.md rules → Hooks (validation) → Patterns/Skills (execution)

## Mandatory Rules

**CLI Tools (NO EXCEPTIONS):**
- `rg` not grep (search code)
- `fd` not find (find files)
- `bat` not cat (read files)
- `exa` not ls (list directories)
- Applies everywhere: main session, sub-agents, patterns, all contexts

**Naming Conventions:**
- Agents/Commands/Hooks/Skills: kebab-case
- Patterns (execution files): snake_case
- Patterns (output templates): kebab-case

**Pattern System:**
- Simple patterns: Suggested (no justification needed for bypass)
- Medium/Complex patterns: MANDATORY (auto-loaded into context OR explicit bypass)
- Pattern files are delegatable systems, NOT documentation
- When matched: patterns AUTO-LOAD into your context for execution
- Bypass format: "Bypassing pattern because [reason]" + alternative + risk acknowledgment

**Skill System:**
- "require" enforcement = AUTO-LOADED into context (200-500 tokens)
- Progressive disclosure: quick/minimal tier loads core principles, full tier loads complete content
- Reading without application is useless - injection guarantees application

**MCP Workflows:**
- 3+ tool calls detected = use code execution pattern
- Achieves 96-98% token reduction
- Auto-detection suggests optimization opportunities

**Minimal Changes Constraint:**
- ≤5 files per task (HARD LIMIT)
- <200 lines total changes
- BEFORE implementing: scan 3 similar patterns, list existing solutions, identify reusable components
- Modify existing > create new files
- Question every new abstraction

**Document-First Development:**
- Update documentation BEFORE implementing components
- Prevents doc-reality gaps
- Ensures designs are validated before code is written

**Core Workflow:**
- MUST update core submodule before making local modifications
- Core changes commit to hal-10k-core first, never directly in project submodules
- Sync workflow: `cd ~/Work/hal-10k-core` → commit → push → `cd project/core` → pull → `git add core`
- Document core updates with "CORE-SYNC:" prefix in CHANGELOG.md

## Forbidden Without Approval

- New architectural patterns
- Refactoring working code "for cleanliness"
- Premature optimization
- Single-use base classes/factories

## Required Per Task

- Affect ≤5 files
- Test strategy
- Rollback plan
- Dev docs update (for multi-session tasks)

---

*This guidance is loaded once per session to drive natural compliance. Hooks provide backup validation, not primary enforcement.*
