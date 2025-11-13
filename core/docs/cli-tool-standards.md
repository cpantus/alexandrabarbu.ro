# CLI Tool Standards (MANDATORY)

**CRITICAL:** MUST use modern CLI tools. 70-95% token savings. **FORBIDDEN:** grep, find, cat on JSON/YAML

## Modern CLI Tool Table

| Instead of | Use | Savings | When to Use |
|------------|-----|---------|-------------|
| `grep -r` | `rg` (ripgrep) | 60-80% | Searching code/text, supports regex, fast |
| `find` | `fd` | 40-50% | Finding files by name/pattern |
| `cat` | `bat --line-range` | 20-30% | Viewing file contents with syntax highlighting |
| `ls -la` / `tree` | `exa --git` / `tree -L 2` | 10-90% | Listing files with git status/tree view |
| `jq` / `yq` | Read tool (JSON/YAML) | 75-85% | Parsing JSON/YAML files |
| `parallel` / `delta` / `just` | Modern alternatives | 25-55% | Batch operations, diffs, task running |
| `zcat \| head` | Compression tools | 90-95% | Reading compressed files |

## Usage Examples

**ripgrep (rg):**
```bash
rg "pattern" --type ts                    # Search TypeScript files
rg "TODO" -g "*.md"                       # Search markdown files
rg "error" -A 3 -B 1                      # Show 3 lines after, 1 before
```

**fd:**
```bash
fd "\.ts$"                                # Find all TypeScript files
fd -e md -e txt                           # Find markdown and text files
fd "test" -x rm                           # Find and execute command
```

**bat:**
```bash
bat file.ts --line-range 10:50            # Show lines 10-50
bat file.json --style=plain               # No decorations
```

**exa:**
```bash
exa --git --long                          # List with git status
exa --tree --level=2                      # Tree view, 2 levels deep
```

**Read tool (preferred over jq/yq):**
```bash
# Instead of: cat config.json | jq '.settings'
# Use: Read tool on /path/to/config.json
```

## Enforcement

**Hook:** `pre-tool-use-bash.ts` validates and auto-corrects

**Debugging:**
```bash
export CC_BASH_OPT_DEBUG=1                # Enable debugging
```

**Warnings:** Hook warns when suboptimal tools are used and suggests alternatives

## Common Patterns

**Search and replace:**
```bash
rg "old_pattern" -l | xargs sed -i 's/old/new/g'
```

**Find and process:**
```bash
fd "\.ts$" -x prettier --write {}
```

**View with context:**
```bash
bat --line-range :100 large-file.log      # First 100 lines
```

## Troubleshooting

**Tool not found:**
- Install via package manager (apt, brew, pacman)
- Check PATH configuration
- Use fallback if unavailable (hook provides alternatives)

**Permission issues:**
- Ensure tools have execute permissions
- Check file/directory permissions for target

**Performance:**
- Use `--max-depth` with fd/exa for large directories
- Use `--max-count` with rg to limit results
- Consider `--ignore-case` impact on rg performance

---

**See also:**
- CLAUDE.md Core Principles
- `/load` for documentation system
- `cli-tool-enforcement.md` for enforcement details across all contexts

**Enforcement:**
- Hook: `pre-tool-use-bash.ts` (auto-correction)
- Coverage: Main session + planning mode + all subagents + pipes
- Status: ✅ Active in all contexts
