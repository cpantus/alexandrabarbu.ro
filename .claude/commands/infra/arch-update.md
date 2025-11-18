# Architecture Update Command

Updates the system architecture visualization with current component data.

## Usage

```bash
/arch-update
```

## What It Does

1. **Scans the codebase** for all components:
   - Skills (`.claude/skills/*.md`)
   - Hooks (`core/infrastructure/hooks/*.ts`)
   - Patterns (`core/infrastructure/patterns/**/*.md`)
   - Agents (built-in Task tool agents from `/agents` command)
   - Configuration files (`.claude/*.json`)
   - Utilities (`core/infrastructure/hooks/utils/*.ts`)

2. **Counts components** accurately

3. **Updates** `system-architecture.html`:
   - Legend counts
   - Sidebar component lists
   - Graph node data
   - Relationship links

4. **Preserves**:
   - Visual styling and design
   - Manual relationship mappings
   - Custom descriptions

## Task Execution

Scan the codebase, extract current component counts and metadata, then regenerate the architecture visualization data while preserving all visual design and manually-defined relationships.

**Steps:**
1. Count all component types
2. List all component names
3. Extract descriptions from metadata files (skill-rules.json, pattern-index.json)
4. Update data arrays in system-architecture.html
5. Verify HTML is valid
6. Report what was updated

**Output:** Updated visualization file ready to open in browser
