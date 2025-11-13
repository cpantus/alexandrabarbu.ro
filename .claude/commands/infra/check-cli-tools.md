# Check CLI Tool Compliance

Verify modern CLI tools are being used and enable debug mode.

## Actions

1. Check if modern tools are installed:
   - `rg --version` (ripgrep)
   - `fd --version`
   - `bat --version`
   - `exa --version`

2. Show current hook status:
   - Check if `CC_BASH_OPT_DEBUG` is set
   - Review recent bash commands

3. Enable debug mode if requested:
   ```bash
   export CC_BASH_OPT_DEBUG=1
   ```

## Expected Tools

- **rg** (ripgrep) - replaces grep
- **fd** - replaces find
- **bat** - replaces cat
- **exa** - replaces ls/tree

## Enforcement

Hook: `core/infrastructure/hooks/pre-tool-use-bash.ts`
Coverage: All bash commands, including pipes
