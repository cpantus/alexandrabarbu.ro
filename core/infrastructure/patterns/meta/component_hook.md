# Pattern: Component - Hook

**Category**: meta
**Complexity**: simple
**Thinking**: N/A
**Knowledge Required**: N/A
**Version:** 2.0 (v5.4.0 - Directive Language + Task Decomposition Override)

---

## PURPOSE

Define structure, validation rules, and quality standards for hook (lifecycle event automation) components in the Marketing Agent system.

---

## Task Decomposition Override (v5.4.0)

When creating or validating hook components, **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE (Quick Hook Creation):
1. Write TypeScript file without checking existing hooks
2. Skip lifecycle event validation
3. Forget to register in settings.json
4. No testing before deployment

### ✅ MANDATORY SEQUENCE (Systematic Hook Development):

**Phase 1: Input Validation** (Validate 3 critical hook requirements)
1. **Event Type Validation**: Verify lifecycle event is valid and not already handled
   - Reference: This pattern "Lifecycle Events" section + Hook Architecture docs
   - Output: Event validity + existing hook check

2. **Naming Validation**: Check kebab-case compliance and descriptiveness
   - Reference: This pattern "Naming Convention" section
   - Output: Name compliance assessment

3. **Purpose Validation**: Ensure hook purpose doesn't duplicate existing functionality
   - Reference: Hook Architecture docs for existing hook purposes
   - Output: Uniqueness verification + extension vs creation decision

**Output Acknowledgment After Phase 1:**
```
Hook Validation Input Analysis:
- Event Type: [UserPromptSubmit ✓ / PreToolUse (Write) already has pre-tool-use-write.ts]
- Naming: [kebab-case ✓, descriptive ✓]
- Purpose: [Unique ✓ / 60% overlap with existing-hook.ts - consider extending]
```

**Phase 2: Staged Execution** (Implement hook with proper structure)
4. Create TypeScript file with required structure (handler, error handling, logging)
5. Implement hook logic following event-specific patterns
6. Register hook in settings.json with correct matcher/wrapper

**Phase 3: Output Generation** (Test and validate hook)
7. Test hook triggers correctly for target event
8. Verify error handling and status logging work
9. Document hook in Hook Architecture documentation

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** Hook creation requires validating the event type and checking for existing hooks first. Skipping Phase 1 leads to duplicate hooks for the same event, improper registration in settings.json, and missed opportunities to extend existing hooks instead of creating new ones. The mandatory sequence ensures hooks are properly integrated into the lifecycle system.

---

## Language Standards (v5.4.0)

**YOU MUST use directive language throughout hook specifications:**

**Required Directives:**
- ✅ "MUST", "DO NOT", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "recommended"

**Hook Requirements:**
- ✅ "Hooks MUST export a handler function"
- ❌ "Hooks should export a handler function"

**Implementation Rules:**
- ✅ "ALWAYS include error handling", "NEVER skip status logging"
- ❌ "Try to include error handling", "Consider adding logging"

**Enforcement Note:** Meta-patterns with weak language will be rejected by validation hooks.

---

## INPUT

**Required:**
1. **Hook name**: kebab-case identifier (e.g., "user-prompt-submit", "stop-event")
2. **Lifecycle event**: Which event triggers this hook
3. **Implementation**: TypeScript file with hook logic

---

## RULES

### Naming Convention

**Format:** kebab-case
**Pattern:** `/^[a-z0-9]+(-[a-z0-9]+)*$/`

**Valid examples:**
- `user-prompt-submit` ✓
- `stop-event` ✓
- `post-tool-use-edit` ✓
- `pre-tool-use-write` ✓
- `context-bundle` ✓
- `background-agent` ✓
- `agent-telemetry` ✓

**Rationale:** Kebab-case matches event naming conventions.

---

### Emoji Standards

**9 Hooks:**
- `user-prompt-submit`: ⚡ (execution trigger)
- `stop-event`: ✋ (interruption)
- `post-tool-use-edit`: 📝 (file modification)
- `post-plan-approval`: ✅ (approval flow)
- `context-bundle`: 📦 (context management)
- `background-agent`: ⏰ (background execution)
- `agent-telemetry`: 📊 (monitoring)
- `pre-tool-use-write`: 📝 (file creation)
- `pre-tool-use-edit`: 📝 (file editing)

---

### Structure

**File:** TypeScript `.ts` file in `.claude/hooks/`

**Required exports:**
- Hook handler function
- Error handling
- Status logging

**Example:**
```typescript
#!/usr/bin/env ts-node

import { /* dependencies */ } from './utils/...';

async function main() {
  try {
    // Hook logic
    console.log('✅ Hook success: message');
  } catch (error) {
    console.error('❌ Hook failed:', error.message);
    process.exit(1);
  }
}

main();
```

---

## PROCESS

1. **Determine Hook Type** - Identify lifecycle event (user-prompt-submit, pre-tool-use, post-tool-use, etc.)
2. **Create TypeScript File** - File in `.claude/hooks/[hook-name].ts`
3. **Implement Handler** - Async main function with try/catch
4. **Add Status Logging** - Success/failure messages with emojis
5. **Set Permissions** - Make executable (`chmod +x`)
6. **Register in Settings** - Add to `.claude/settings.json` if needed
7. **Test Hook** - Verify event triggers correctly

---

## OUTPUT

### Template Structure

```typescript
#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
{{#if hasUtils}}
import { {{utilImports}} } from './utils/...';
{{/if}}

/**
 * {{hookName}} Hook
 *
 * {{description}}
 *
 * Triggered: {{triggerEvent}}
 */
async function main() {
  try {
    {{#if envVars}}
    // Environment variables
    {{#each envVars}}
    const {{this}} = process.env.{{this}};
    {{/each}}
    {{/if}}

    // Hook logic
    {{hookLogic}}

    // Success
    console.log('{{emoji}} {{hookName}} success: {{successMessage}}');
    process.exit(0);
  } catch (error) {
    console.error('❌ {{hookName}} failed:', error.message);
    process.exit(1);
  }
}

main();
```

### Template Variables

**Required:**
- `hookName`: Hook identifier (kebab-case)
- `description`: One-sentence description of what hook does
- `triggerEvent`: When this hook is triggered
- `hookLogic`: Main hook implementation logic
- `emoji`: Hook emoji from standards (⚡📝✋✅📦⏰📊)
- `successMessage`: Success message content

**Optional:**
- `hasUtils`: Boolean - whether to import utility functions
- `utilImports`: Comma-separated utility function names
- `envVars`: Array of environment variable names
- `errorHandling`: Custom error handling logic

---

## QUALITY CHECKS

- [ ] Name is kebab-case
- [ ] TypeScript file exists
- [ ] Executable permissions set
- [ ] Error handling present
- [ ] Status logging to stdout
- [ ] Emoji in log messages
- [ ] Shebang line (`#!/usr/bin/env ts-node`)
- [ ] Exit codes correct (0 success, 1 failure)

---

## ADAPTATION

**When adapting hooks from external sources:**

**Language:** Convert to TypeScript if needed | Use system utils from `./utils/` | Add proper imports and types
**Structure:** Follow template (shebang, async main, try/catch, exit codes) | Add status logging with emojis | Ensure executable permissions
**Naming:** Enforce kebab-case | Match lifecycle event naming | Remove special chars
**Integration:** Register in settings.json if needed | Test event triggers | Validate dependencies exist
**Attribution:** Footer comment with source info

**Adaptation validated via:** TypeScript compiler + `pre-tool-use-write.ts` hook

---

**Pattern Version:** 1.1
**Last Updated:** 2025-11-12
**Component Count:** 9 hooks
