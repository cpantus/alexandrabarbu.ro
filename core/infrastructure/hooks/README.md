# Hook System Documentation

**Version:** 5.0.6 | **Last Updated:** 2025-11-12

Complete reference for the Marketing Agent v5 hook system.

---

## Terminology

### Hooks vs Utilities

**Hooks (10 files):** Event-driven TypeScript scripts that execute at Claude Code lifecycle events
- Registered in `.claude/settings.json`
- Respond to specific events (UserPromptSubmit, PreToolUse, etc.)
- Can modify behavior, validate operations, or track metrics

**Hook Utilities (22 files):** Supporting modules in `utils/` subdirectory
- NOT hooks themselves
- Shared functionality used by multiple hooks
- Include validators, matchers, state management, formatters

**Why the distinction matters:** The system previously claimed "33 hooks" by counting all .ts files in the hooks directory. The accurate count is **10 hooks + 22 utilities = 32 files total** (excluding TEMPLATE).

---

## Event Hooks

### Registered Hooks (7 active)

| Hook | Event | Purpose | Status |
|------|-------|---------|--------|
| `user-prompt-submit.ts` | UserPromptSubmit | Auto-activate skills/patterns/docs, pattern enforcement (simple=suggested, medium/complex=mandatory with justification bypass) | ✅ Active |
| `stop-event.ts` | Stop | Proactive error checking, cleanup on user interrupt | ✅ Active |
| `session-start-command-links.ts` | SessionStart (startup) | Dynamic plugin command symlink management | ✅ Active |
| `pre-tool-use-write.ts` | PreToolUse (Write) | ENFORCE naming standards (BLOCKING), validate file creation | ✅ Active |
| `pre-tool-use-edit.ts` | PreToolUse (Edit) | Track file modifications | ✅ Active |
| `pre-tool-use-bash.ts` | PreToolUse (Bash) | ENFORCE CLI tool standards (auto-correct with warnings) | ✅ Active |
| `post-tool-use-edit.ts` | PostToolUse (Edit) | Bundle log tracking | ✅ Active |

### Unregistered Hooks (3 files)

| Hook | Status | Notes |
|------|--------|-------|
| `session-end.ts` | ⚠️ Should be registered | Prunes context cache on session end. Currently not in settings.json (oversight). |
| `agent-telemetry.ts` | ❌ Not a hook | Telemetry data writer utility (misplaced). Used by background agents for metrics tracking. |
| `background-agent.ts` | ❌ Not a hook | Agent spawner utility (misplaced). Spawns autonomous background agents. |

**Recommendation:**
- Register `session-end.ts` in SessionEnd hooks
- Move or document `agent-telemetry.ts` and `background-agent.ts` as special utilities

---

## Hook Utilities (22 files)

### Validation & Enforcement (6)
- **bash-optimizer.ts** - CLI tool validation and auto-correction (70-95% token savings)
- **bash-optimizer-logger.ts** - Logging for bash optimization events
- **bash-optimizer.test.ts** - Test suite for bash optimizer
- **component-consistency-validator.ts** - Validates component structure, naming, cross-references
- **pattern-parser.ts** - Parses pattern frontmatter for validation rules
- **component-generator.ts** - Generates validated component templates

### Matching & Auto-Activation (5)
- **skill-matcher.ts** - Matches user prompts to relevant skills
- **pattern-matcher.ts** - Matches user prompts to patterns (with complexity-based enforcement)
- **docs-matcher.ts** - Matches prompts to documentation for auto-loading

### State Management (4)
- **plugin-state.ts** - Detects enabled plugins via environment variables (v5.0.5)
- **mode-detector.ts** - Detects teaching vs production mode, filters components
- **tier-filter.ts** - Filters components by tier (minimal/quick/full)
- **context-cache.ts** - Caches documentation to reduce token usage

### Performance & Optimization (3)
- **adaptive-loader.ts** - Determines optimal context tier based on task complexity
- **smart-router.ts** - Routes requests to appropriate agent/pattern
- **cost-budget.ts** - Tracks and enforces token/cost budgets

### Support & Formatting (4)
- **formatter.ts** - Formats activation reminders and suggestions
- **component-health-checker.ts** - Validates component health and consistency
- **file-analyzer.ts** - Analyzes file structures for validation
- **build-runner.ts** - Runs builds and tests during component creation
- **context-cache-cli.ts** - CLI tool for cache management

---

## Hook Registration

### How to Register a Hook

**1. Edit `.claude/settings.json`:**

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npx tsx core/infrastructure/hooks/your-hook.ts"
          }
        ]
      }
    ]
  }
}
```

**2. Registration Format by Event:**

**Events without matchers** (wrap in `{hooks: [...]}`):
- `UserPromptSubmit`
- `Stop`
- `SessionEnd`

**Events with matchers** (require `matcher` field):
- `PreToolUse` - matcher: "Write", "Edit", "Bash", "Read", etc.
- `PostToolUse` - matcher: "Write", "Edit", "Bash", etc.
- `SessionStart` - matcher: "startup", "resume", "clear", "compact"

**Example with matcher:**
```json
"PreToolUse": [
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "npx tsx core/infrastructure/hooks/pre-tool-use-bash.ts"
      }
    ]
  }
]
```

---

## Development Guide

### When to Create vs Extend

**BEFORE creating a new hook:**
1. Search existing hooks in `core/infrastructure/hooks/`
2. Check if event type already has a hook
3. Consider extending existing hook vs creating new one

**Create new hook when:**
- New lifecycle event not yet handled
- Completely different purpose from existing hooks
- Performance requires separate execution

**Extend existing hook when:**
- Same event type (e.g., another PreToolUse check)
- Related functionality (e.g., additional CLI tool validation)
- Can share utilities/context

### Hook Creation Checklist

1. ✅ Choose appropriate event type
2. ✅ Create TypeScript file in `core/infrastructure/hooks/`
3. ✅ Use `kebab-case` naming (enforced by pre-tool-use-write.ts)
4. ✅ Import needed utilities from `./utils/`
5. ✅ Handle stdin for arguments (if needed)
6. ✅ Exit with `process.exit(0)` (success) or `process.exit(1)` (failure)
7. ✅ Register in `.claude/settings.json`
8. ✅ Test with `CC_BASH_OPT_DEBUG=1` (for bash hooks)
9. ✅ Document in this README

### Hook Template

```typescript
/**
 * MyHook - Brief description
 *
 * Triggered on [EVENT_TYPE]
 */

import { /* utilities */ } from './utils/...';

async function main() {
  try {
    // Read stdin if needed
    const input = await readStdin();

    // Hook logic here

    // Success
    process.exit(0);
  } catch (error) {
    console.error('[my-hook] Error:', error);
    process.exit(0); // Usually don't fail hooks
  }
}

async function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => { resolve(data); });
  });
}

main();
```

---

## Utility Development

### When to Create a Utility

Create utilities for:
- ✅ Reusable logic needed by multiple hooks
- ✅ Complex algorithms (pattern matching, validation)
- ✅ State management (caching, detection)
- ✅ Formatting and presentation

### Utility Categories

**Place in appropriate category:**
- `utils/` - Validation, matching, state, formatters, performance

### Naming Convention

- Utilities: `kebab-case.ts` (e.g., `pattern-matcher.ts`)
- Test files: `*.test.ts` (e.g., `bash-optimizer.test.ts`)

---

## Common Patterns

### Auto-Activation Pattern

```typescript
// 1. Match user prompt to components
const matches = matchComponentsToPrompt(userPrompt, rules);

// 2. Format activation reminder
const reminder = formatActivationReminder(matches);

// 3. Output to stdout (Claude will see it)
console.log(reminder);
```

### Validation Pattern

```typescript
// 1. Validate operation
const validation = validateOperation(args);

// 2. If invalid, show error and block
if (!validation.valid) {
  console.error('🚫 BLOCKED:', validation.message);
  process.exit(1); // Blocks execution
}

// 3. If valid, allow
process.exit(0);
```

### Optimization Pattern

```typescript
// 1. Check for suboptimal usage
const optimization = checkForOptimization(command);

// 2. If optimizable, warn and suggest
if (optimization.canOptimize) {
  console.warn('⚠️ SUGGESTION:', optimization.suggestion);
  console.warn('💡 Estimated savings:', optimization.savings);
}

// 3. Allow regardless (flexible mode)
process.exit(0);
```

---

## Hook Lifecycle Events

### Event Execution Order

```
Session Start
    ↓
UserPromptSubmit (before each prompt)
    ↓
PreToolUse (before each tool)
    ↓
[Tool Execution]
    ↓
PostToolUse (after each tool)
    ↓
Stop (if user interrupts)
    ↓
Session End
```

### Event Details

**SessionStart (matcher: "startup")**
- Triggered once when session begins
- Use for: Initialization, plugin setup, command linking
- Example: `session-start-command-links.ts`

**UserPromptSubmit**
- Triggered before each user prompt is processed
- Use for: Auto-activation, mode detection, routing
- Example: `user-prompt-submit.ts`

**PreToolUse (matcher: tool name)**
- Triggered before tool execution
- Use for: Validation, enforcement, optimization
- Example: `pre-tool-use-bash.ts`, `pre-tool-use-write.ts`

**PostToolUse (matcher: tool name)**
- Triggered after tool completes
- Use for: Tracking, cleanup, follow-up actions
- Example: `post-tool-use-edit.ts`

**Stop**
- Triggered when user interrupts execution
- Use for: Error handling, state preservation, cleanup
- Example: `stop-event.ts`

**SessionEnd**
- Triggered when session ends
- Use for: Cleanup, cache pruning, final reporting
- Example: `session-end.ts` (currently unregistered)

---

## Testing & Debugging

### Enable Debug Mode

```bash
export CC_BASH_OPT_DEBUG=1
```

### Test a Hook Manually

```bash
echo '{"args": "test"}' | npx tsx core/infrastructure/hooks/my-hook.ts
```

### Common Issues

**Hook not firing:**
- Check registration in `.claude/settings.json`
- Verify event type matches
- Check matcher (for PreToolUse/PostToolUse/SessionStart)

**Hook failing silently:**
- Check `process.exit()` code
- Add `console.error()` for debugging
- Test with mock input

**Performance issues:**
- Use caching for expensive operations
- Profile with `console.time()` / `console.timeEnd()`
- Consider lazy loading

---

## Performance Metrics

### Hook Performance (v5.0.6)

| Hook | Avg Execution | Impact |
|------|--------------|--------|
| user-prompt-submit.ts | 50-100ms | Low (cached) |
| pre-tool-use-bash.ts | 10-20ms | Very low |
| pre-tool-use-write.ts | 20-50ms | Low |
| session-start-command-links.ts | 100-200ms | Low (once per session) |

### Optimization Impact

| Utility | Token Savings | Use Case |
|---------|--------------|----------|
| bash-optimizer | 70-95% | CLI command optimization |
| context-cache | 84% | Documentation auto-loading |
| adaptive-loader | 40-60% | Tier-based loading |

---

## Migration Notes

### v5.0.5 → v5.0.6

**Changes:**
- ✅ Clarified terminology: 10 hooks + 22 utilities (not "33 hooks")
- ✅ Pattern enforcement fully implemented (complexity-based)
- ✅ Output template naming exception documented
- ⚠️ `session-end.ts` should be registered (currently missing)

**Action items:**
- Register `session-end.ts` in SessionEnd hooks
- Consider moving/documenting utility files that aren't true hooks

---

## See Also

- **CLAUDE.md** - Core principles and rules
- **hook-architecture.md** - Detailed architecture documentation
- **cli-tool-standards.md** - CLI optimization standards
- **pattern-system.md** - Pattern matching and enforcement

---

**Last Updated:** 2025-11-12 (v5.0.6 compliance remediation)
