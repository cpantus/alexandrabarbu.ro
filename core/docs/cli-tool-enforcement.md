# CLI Tool Enforcement Across All Contexts

**Version**: 1.0.0
**Last Updated**: 2025-11-11
**Status**: Production

## Overview

Modern CLI tool enforcement is **automatically applied** to all execution contexts including main sessions, planning mode, and all spawned subagents. No manual configuration required.

## Enforcement Mechanisms

### 1. Hook-Based Auto-Correction (Primary)

**Location**: `core/infrastructure/hooks/pre-tool-use-bash.ts`

**Trigger**: Every Bash tool invocation (100% coverage)

**Behavior**:
- Intercepts command before execution
- Applies optimization rules from `bash-optimizer.ts`
- Transforms suboptimal commands (grep → rg, find → fd, etc.)
- Shows educational warnings when transformations occur
- Executes optimized command automatically

**Configuration**:
```typescript
enabled: process.env.CC_DISABLE_BASH_OPT !== '1'  // Default: ENABLED
```

**Skip Patterns** (Commands NOT optimized):
```typescript
- Git operations: git add, commit, push, pull, etc.
- Package managers: npm, yarn, pnpm, bun
- Interactive: vim, nano, emacs, less, more
- System: sudo, systemctl, service
- Already optimized: rg, fd, bat, exa, jq, yq, etc.
- Complex redirections: Multiple > or < in single command
```

**Pipe Support**: ✅ **ENABLED** (as of v5.0.5)
- Single pipes fully supported: `cat file | grep pattern` → `bat file | rg pattern`
- Chained pipes supported: `cat file | grep x | grep y` → optimizes each stage
- Complex patterns: JSON/YAML pipes use jq/yq optimizations

### 2. Planning Mode (ExitPlanMode)

**How It Works**:
- Planning mode uses the same Claude Code instance
- Same `.claude/settings.json` hooks apply
- Same `pre-tool-use-bash.ts` hook executes
- No special configuration needed

**Enforcement**: ✅ Automatic via shared hook infrastructure

### 3. Task Tool Subagents

**Agent Types Covered**:
- general-purpose
- Explore
- Plan
- refactoring-expert
- quality-engineer
- python-expert
- root-cause-analyst
- backend-architect
- ALL other Task tool agents

**How Subagents Inherit Enforcement**:

Claude Code's Task tool spawns subagents as new Claude Code processes. Each subprocess:

1. **Inherits settings.json**: All hooks from `.claude/settings.json` apply
2. **Shares hook files**: Same `pre-tool-use-bash.ts` executes in subprocess
3. **Automatic registration**: PreToolUse:Bash hook runs for every Bash call
4. **Zero configuration**: No manual setup required in subagent prompts

**Verification**:
```json
// .claude/settings.json:215-222
{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "npx tsx core/infrastructure/hooks/pre-tool-use-bash.ts"
  }]
}
```

This hook registration applies to **ALL Claude Code sessions** spawned in this project directory.

### 4. Background Agents (Custom Spawning)

**Location**: `core/infrastructure/hooks/background-agent.ts:384`

**Environment Inheritance**:
```typescript
spawn('claude', [...], {
  env: process.env  // Inherits CC_DISABLE_BASH_OPT and all env vars
})
```

**Settings Inheritance**:
Background agents run in the same project directory, so they automatically:
- Use the same `.claude/settings.json` hooks
- Execute the same `pre-tool-use-bash.ts`
- Apply identical optimization rules

**Enforcement**: ✅ Automatic via environment + settings inheritance

## Coverage Matrix

| Context | Hook Execution | Env Vars | settings.json | Status |
|---------|---------------|----------|---------------|---------|
| **Main Session** | ✅ Direct | ✅ Native | ✅ Direct | ✅ Enforced |
| **Planning Mode** | ✅ Same process | ✅ Same process | ✅ Same file | ✅ Enforced |
| **Task Tool Agents** | ✅ Subprocess | ✅ Inherited | ✅ Same file | ✅ Enforced |
| **Background Agents** | ✅ Subprocess | ✅ Explicit | ✅ Same file | ✅ Enforced |
| **Piped Commands** | ✅ Now enabled | ✅ N/A | ✅ Yes | ✅ Enforced |

## Tool Availability

**Cache Location**: `core/infrastructure/hooks/.cache/tool-availability.json`

**Current Status** (Auto-detected):
```json
{
  "rg": true,      // ripgrep
  "fd": true,      // fd-find
  "bat": true,     // bat
  "exa": true,     // exa
  "tree": true,    // tree
  "gh": true,      // GitHub CLI
  "fzf": true,     // fuzzy finder
  "zoxide": true,  // smart cd
  "jq": true,      // JSON processor
  "yq": true,      // YAML processor
  "parallel": true,// GNU Parallel
  "just": true,    // command runner
  "delta": true,   // git diff
  "fx": true,      // JSON viewer
  "zcat": true     // gzip reader
}
```

**Cache Duration**: 24 hours
**Refresh**: Automatic when cache expires or is deleted

## Optimization Rules (Excerpt)

**Priority Order** (Higher = Applied First):

| Priority | Rule | Tool | Savings |
|----------|------|------|---------|
| 100 | grep -r → rg | ripgrep | 70% |
| 98 | grep .json → jq | jq | 80% |
| 97 | cat .json \| grep → jq | jq | 85% |
| 96 | cat .json → jq | jq | 75% |
| 95 | grep simple → rg | ripgrep | 60% |
| 90 | \| grep → \| rg | ripgrep | 40% |

**Full Rules**: See `core/infrastructure/hooks/utils/bash-optimizer.ts:207+`

## Educational Warnings

When violations occur, Claude sees:

```
🚨 [CLI Tool Standards] VIOLATION DETECTED - Auto-corrected
   ❌ Forbidden:  grep -r "pattern" src/
   ✅ Required:   rg "pattern" src/
   Tool: ripgrep | Token savings: ~70%
   ⚠️  MANDATORY: Use modern CLI tools
   📋 CLAUDE.md: "ALWAYS use modern CLI tools"
```

**Purpose**: Teach correct patterns over time

## Disabling Enforcement (Not Recommended)

**Temporary (Current Session)**:
```bash
export CC_DISABLE_BASH_OPT=1
```

**Permanent (Not Recommended)**:
```bash
# Add to ~/.bashrc or ~/.zshrc
export CC_DISABLE_BASH_OPT=1
```

**Why Not Recommended**:
- Loses 70-95% token savings
- Makes codebase exploration slower
- Increases API costs significantly

## Debug Mode

**Enable Debug Logging**:
```bash
export CC_BASH_OPT_DEBUG=1
```

**Output**:
- Tool availability checks
- Cache read/write operations
- Optimization decisions
- Hook execution timing

**Log Location**: `/tmp/bash-optimizer.log`

## Testing Enforcement

**Test Pipe Optimization**:
```bash
cat .claude/CLAUDE.md | grep "plugin"
# Should optimize to: bat .claude/CLAUDE.md | rg "plugin"
```

**Test Find Optimization**:
```bash
find . -name "*.md" -maxdepth 2
# Should optimize to: fd -e md --max-depth 2
```

**Test JSON Optimization**:
```bash
cat config.json | grep "setting"
# Should optimize to: jq 'recurse | select(type == "string" and test("setting"))' config.json
```

## Verification Commands

**Check Hook Registration**:
```bash
rg '"matcher".*"Bash"' .claude/settings.json -A 5
```

**Check Tool Availability**:
```bash
cat core/infrastructure/hooks/.cache/tool-availability.json
```

**Check Optimization Stats**:
```bash
tail -50 /tmp/bash-optimizer.log  # If debug mode enabled
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Claude Code Main Session                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ .claude/settings.json → PreToolUse:Bash hook           │ │
│  │ ↓                                                       │ │
│  │ pre-tool-use-bash.ts → bash-optimizer.ts               │ │
│  │ ↓                                                       │ │
│  │ Auto-transform + Execute                               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌──────────────┐  ┌──────────────┐
│ Task Tool     │  │ Planning     │  │ Background   │
│ Subagent      │  │ Mode         │  │ Agent        │
├───────────────┤  ├──────────────┤  ├──────────────┤
│ Inherits:     │  │ Inherits:    │  │ Inherits:    │
│ • settings.   │  │ • Same       │  │ • process.   │
│   json hooks  │  │   process    │  │   env        │
│ • Same hook   │  │ • Same hooks │  │ • settings.  │
│   files       │  │              │  │   json hooks │
│ • Same cache  │  │              │  │              │
└───────────────┘  └──────────────┘  └──────────────┘
        │                  │                  │
        └──────────────────┴──────────────────┘
                           │
                All contexts use identical
                optimization rules
```

## Key Takeaways

1. ✅ **Automatic enforcement** across all contexts
2. ✅ **No manual configuration** needed for subagents
3. ✅ **Pipe support enabled** as of v5.0.5
4. ✅ **100% tool availability** in this environment
5. ✅ **Educational warnings** teach correct patterns
6. ✅ **24-hour caching** prevents performance overhead
7. ✅ **70-95% token savings** across all operations
8. ✅ **Zero breaking changes** via graceful degradation

## References

- **Hook Implementation**: `core/infrastructure/hooks/pre-tool-use-bash.ts`
- **Optimizer Logic**: `core/infrastructure/hooks/utils/bash-optimizer.ts`
- **Standards Doc**: `core/docs/cli-tool-standards.md`
- **CLAUDE.md Rule**: Line 16 (mandatory compliance)
- **Background Agents**: `core/infrastructure/hooks/background-agent.ts:384`

---

**Last Verified**: 2025-11-11
**Test Coverage**: Main session, planning mode, Task tool, background agents, pipes
**Status**: ✅ All contexts enforced
