# Hook Architecture

Hooks are TypeScript/Bash scripts that execute at specific lifecycle events to enforce rules, auto-activate features, and track telemetry.

## Hook Lifecycle

**Event types and execution order:**

1. **SessionStart** - Triggered when Claude Code session begins
2. **UserPromptSubmit** - Triggered before each user prompt is processed
3. **PreToolUse** - Triggered before any tool execution
4. **PostToolUse** - Triggered after tool execution completes
5. **Stop** - Triggered when user stops/interrupts execution
6. **SessionEnd** - Triggered when session ends
7. **PostPlanApproval** - Triggered when user approves a plan in Plan mode

## Hook Implementations

**Location:** `core/infrastructure/hooks/`

| Hook | Event | Purpose | Language |
|------|-------|---------|----------|
| `user-prompt-submit.ts` | UserPromptSubmit | Auto-activate skills/patterns/docs, **skill enforcement** (warn/require levels, blocks if unread), **pattern enforcement** (simple=suggested, medium/complex=mandatory with justification bypass), plugin filtering | TypeScript |
| `session-start-command-links.ts` | SessionStart (startup) | Dynamic plugin command symlink management | TypeScript |
| `stop-event.ts` | Stop | Proactive error checking, cleanup | TypeScript |
| `pre-tool-use-write.ts` | PreToolUse (Write) | **ENFORCE naming standards (BLOCKING)**, validate file creation, prevent duplication | TypeScript |
| `pre-tool-use-edit.ts` | PreToolUse (Edit) | Track file modifications | TypeScript |
| `pre-tool-use-bash.ts` | PreToolUse (Bash) | **ENFORCE CLI tool standards (auto-correct with MANDATORY warnings)** | TypeScript |
| `post-tool-use-edit.ts` | PostToolUse (Edit) | Bundle log tracking | TypeScript |
| `post-tool-use-pattern.ts` | PostToolUse (Task) | **Validate pattern stage completion and required outputs** | TypeScript |
| `background-agent.ts` | Custom | Background agent orchestration | TypeScript |
| `agent-telemetry.ts` | Custom | Cost tracking, observability | TypeScript |
| `context-bundle.ts` | Custom | Context persistence | TypeScript |
| `detect-mcp-opportunity.ts` | UserPromptSubmit | MCP optimization detection | TypeScript |
| `suggest-research.ts` | UserPromptSubmit | Research detection hook | TypeScript |

**Plugin-Specific Hooks:**

| Hook | Event | Purpose | Language |
|------|-------|---------|----------|
| `marketing-plugin/hooks/session-messages.ts` | SessionStart (startup) | Conditional marketing session messages | TypeScript |
| `marketing-plugin/hooks/session-end-messages.ts` | SessionEnd | Conditional marketing session summary | TypeScript |

## When to Create vs Extend

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

## Hook Creation Guide

**1. Choose event type:**
- `UserPromptSubmit` - Auto-activation, mode detection
- `PreToolUse` - Validation before tool execution
- `PostToolUse` - Tracking, cleanup after execution
- `Stop` - Error handling, state preservation
- `SessionStart/SessionEnd` - Initialization, teardown

**2. Create hook file:**
```typescript
// core/infrastructure/hooks/my-hook.ts
import { /* utilities */ } from './utils/...';

export function handleEvent(args: EventArgs) {
  // Hook logic here

  // Return success/failure
  return { success: true, message: 'Hook executed' };
}
```

**3. Register in settings.json:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npx tsx core/infrastructure/hooks/user-prompt-submit.ts"
          }
        ]
      }
    ],
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
    ],
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "npx tsx core/infrastructure/hooks/my-hook.ts"
          }
        ]
      }
    ]
  }
}
```

**Note:** Hook format requirements:
- Events like `UserPromptSubmit`, `Stop`, `SessionEnd` wrap hooks in `{hooks: [...]}`
- `PreToolUse` and `PostToolUse` require a `matcher` for tool type (e.g., "Bash", "Write", "Edit")
- `SessionStart` requires a `matcher` for trigger type: "startup", "resume", "clear", or "compact"

**4. Test hook:**
- Add logging/debugging
- Test success and failure paths
- Verify performance impact

## Hook Utilities

**Shared utilities in `core/infrastructure/hooks/utils/`:**

- `skill-matcher.ts` - Match skills to user prompts
- `pattern-matcher.ts` - Match patterns to user prompts
- `docs-matcher.ts` - Match documentation to prompts
- `mode-detector.ts` - Detect teaching vs production mode, plugin filtering
- `plugin-state.ts` - Detect enabled plugins via environment variables (v5.0.5)
- `tier-detector.ts` - Detect context tier (minimal/quick/full)
- `context-cache.ts` - Session-based caching
- `formatter.ts` - Output formatting
- `bash-optimizer.ts` - CLI tool validation/correction

## Detailed Hook Descriptions

### post-tool-use-pattern.ts (NEW v5.0.5)

**Event**: PostToolUse (Task tool)
**Purpose**: Validate pattern stage completion and required outputs
**Enforcement**: WARN (future: can be upgraded to BLOCK)

**How it works**:
1. Detects pattern invocation via Task tool (matches `/pattern [name]` in prompt)
2. Loads pattern metadata from `pattern-index.json` (requiredOutputs field)
3. Validates expected files exist using glob pattern matching
4. Checks file count meets minimum requirements (minCount)
5. Validates file size meets minimum (minSize, catches empty placeholders)
6. Reports missing stages with actionable error message

**When it triggers**:
- After any `/pattern [name]` command completes execution via Task tool
- Only for patterns with `validateOnCompletion: true` in metadata

**What it validates**:
- **File existence** - Uses glob patterns like `research/*.md`, `dev/active/*/architecture-proposal.md`
- **File count** - Ensures minimum number of files per stage (e.g., 2+ research reports)
- **File size** - Catches empty placeholder files (e.g., architecture must be 3KB+)

**Example validation metadata** (pattern-index.json):
```json
"enhanced_planning": {
  "requiredOutputs": {
    "stages": [
      {
        "name": "research",
        "outputs": [{
          "pattern": "research/*.md",
          "minCount": 2,
          "minSize": 5000
        }]
      }
    ],
    "validateOnCompletion": true
  }
}
```

**Error example**:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  PATTERN STAGE VALIDATION FAILED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pattern: enhanced_planning
Incomplete Stages: architecture, validation

Missing Output Files:
  ❌ Stage "architecture": dev/active/*/architecture-proposal.md
     Expected: 1 file(s), Found: 0
     Description: Architecture proposal (3-10 pages)

NEXT STEPS:
  1. Review pattern documentation
  2. Complete missing stages manually
  3. Or re-run pattern with explicit stage execution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Benefits**:
- Catches incomplete pattern execution (stage-skipping bugs)
- Validates outputs are substantive (not empty files)
- Provides actionable recovery instructions
- Non-blocking (WARN mode) for gradual rollout

**Performance**: <100ms execution time (glob matching + file stat)

## Hook Best Practices

**DO:**
- Keep hooks fast (<100ms execution time)
- Use shared utilities to avoid duplication
- Log errors for debugging
- Return clear success/failure status
- Handle edge cases gracefully

**DON'T:**
- Make hooks synchronously expensive
- Duplicate logic across hooks
- Fail silently without logging
- Block user workflow unnecessarily
- Access filesystem excessively

## Troubleshooting

**Hook not executing:**
- Check registration in settings.json
- Verify file permissions (executable)
- Check hook file path
- Review logs for errors

**Hook failing:**
- Enable debug logging
- Check error messages in output
- Verify dependencies are available
- Test hook in isolation

**Performance issues:**
- Profile hook execution time
- Cache expensive operations
- Use async operations where possible
- Consider splitting into multiple hooks

---

## Git Hook Integration: Documentation Enforcement

**Location:** `.git/hooks/pre-commit`

**Purpose:** Enforce documentation updates when code changes are committed to prevent documentation-reality gaps.

### Architecture

The documentation enforcement system validates that required documentation files have been updated when specific code changes are committed. This runs as part of the git pre-commit workflow and complements the Claude Code hook system.

**Components:**

1. **Configuration** (`core/infrastructure/hooks/utils/doc-enforcement-config.json`):
   - Maps file patterns to required documentation files
   - Defines severity levels (major/minor)
   - Sets timestamp validation window (default: 24 hours)
   - Configures bypass patterns for WIP commits

2. **Validator** (`core/infrastructure/hooks/utils/doc-validator.ts`):
   - Scans staged files from git
   - Matches files against pattern rules
   - Checks if required docs were recently modified or staged
   - Reports violations with clear remediation steps

3. **Git Hook** (`.git/hooks/pre-commit`):
   - Runs after core submodule validation
   - Executes doc-validator.ts
   - Blocks commits on major violations
   - Warns but allows commits on minor violations

### Smart Detection Rules

The system uses pattern matching to determine which documentation files must be updated:

| Changed Files | Required Documentation | Severity |
|--------------|----------------------|----------|
| `core/infrastructure/hooks/**/*.ts` | `hook-architecture.md`, `ARCHITECTURE.md` | Major (blocks) |
| `core/infrastructure/agents/**/*.md` | `agent-orchestration.md`, `ARCHITECTURE.md`, `README.md` | Major (blocks) |
| `core/infrastructure/patterns/**/*.md` | `pattern-system.md`, `ARCHITECTURE.md` | Major (blocks) |
| `core/infrastructure/skills/**/*.md` | `skills-system.md`, `ARCHITECTURE.md` | Major (blocks) |
| `core/infrastructure/commands/**/*.md` | `ARCHITECTURE.md`, `README.md` | Major (blocks) |
| `marketing-plugin/agents/**/*.md` | `marketing-plugin/README.md`, `README.md` | Major (blocks) |
| `marketing-plugin/patterns/**/*.md` | `marketing-plugin/README.md` | Minor (warns) |
| `.claude/*.json` (config files) | `ARCHITECTURE.md`, `.claude/CLAUDE.md` | Major (blocks) |
| `scripts/**/*.{sh,ts,js}` | `ARCHITECTURE.md` | Minor (warns) |

### Enforcement Levels

**Major Violations (Exit Code 2):**
- **Behavior:** Commit is BLOCKED
- **When:** Infrastructure components (hooks, agents, patterns, skills, commands) or critical config files changed
- **Message:** Red error with specific files that need updates
- **Recovery:** Update required docs, stage them, retry commit

**Minor Violations (Exit Code 1):**
- **Behavior:** Warning shown, commit proceeds after 5-second delay
- **When:** Plugin-specific changes, utility scripts, or minor modifications
- **Message:** Yellow warning with recommended updates
- **Recovery:** Optional - update docs at your convenience

**Bypass Mechanism:**
- Prefix commit message with `WIP:` or `TEMP:` to skip validation
- Use sparingly for work-in-progress commits
- Final commits should always satisfy documentation requirements

### Timestamp Validation

The system checks if required documentation files were modified within the configured time window (default: 24 hours):

1. **File recently modified:** Documentation timestamp within 24h → ✅ Valid
2. **File staged in commit:** Documentation included in this commit → ✅ Valid
3. **File unchanged:** Documentation not modified or staged → ❌ Violation

This allows two workflows:
- **Update-then-commit:** Modify docs, wait, modify code, commit both together
- **Commit-together:** Modify docs and code in same session, commit both at once

### Example Workflow

```bash
# Scenario: Adding a new hook
vim core/infrastructure/hooks/my-new-hook.ts
git add core/infrastructure/hooks/my-new-hook.ts

# Try to commit (will fail)
git commit -m "feat(hooks): add new validation hook"
# ❌ DOCUMENTATION ENFORCEMENT FAILED
# Hook changes require updates to hook-architecture.md and ARCHITECTURE.md

# Fix by updating required docs
vim core/docs/hook-architecture.md  # Add hook to table
vim ARCHITECTURE.md                  # Document in architecture
git add core/docs/hook-architecture.md ARCHITECTURE.md

# Retry commit (will succeed)
git commit -m "feat(hooks): add new validation hook"
# ✓ Documentation enforcement passed
```

### Configuration

Edit `core/infrastructure/hooks/utils/doc-enforcement-config.json` to:
- Add new file pattern rules
- Modify required documentation mappings
- Change severity levels
- Adjust timestamp window
- Add bypass patterns

**Performance:** Validation completes in <500ms for typical commits.

---

**See also:** CLAUDE.md Component Validation, `/load` for utilities
**Integration:** Hooks work with skills, patterns, agents for auto-activation
