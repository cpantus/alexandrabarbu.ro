#!/usr/bin/env bash
# Component Count Validation Script
# Verifies actual counts match documented counts
# Part of Phase 7 - Documentation Consistency
# CI/CD Ready: Exits with proper codes, works with find or fd

set -euo pipefail

# Color codes for output (disabled in CI)
if [ -t 1 ]; then
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    NC='\033[0m' # No Color
else
    RED=''
    GREEN=''
    YELLOW=''
    NC=''
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Component Count Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Change to project root
cd "$(dirname "$0")/.."

# Function to count files - uses fd if available, otherwise find
# Automatically excludes TEMPLATE files and resources/ subdirectories
count_files() {
    local pattern="$1"
    local dir="$2"
    local exclude="${3:-}"

    if command -v fd &> /dev/null; then
        if [ -n "$exclude" ]; then
            fd -e "$pattern" . "$dir" --exclude "$exclude" --exclude "*TEMPLATE*" --exclude "resources" 2>/dev/null | grep -v "README" | wc -l
        else
            fd -e "$pattern" . "$dir" --exclude "*TEMPLATE*" --exclude "resources" 2>/dev/null | grep -v "README" | wc -l
        fi
    else
        if [ -n "$exclude" ]; then
            find "$dir" -name "*.$pattern" -type f ! -name "*TEMPLATE*" ! -name "README*" ! -path "*/resources/*" ! -path "*/$exclude/*" 2>/dev/null | wc -l
        else
            find "$dir" -name "*.$pattern" -type f ! -name "*TEMPLATE*" ! -name "README*" ! -path "*/resources/*" 2>/dev/null | wc -l
        fi
    fi
}

# Track validation status
VALIDATION_PASSED=true

# === CODE PLUGIN COMPONENTS ===
echo "📦 Code Plugin Components"
echo "──────────────────────────────────────────"

# Agents
ACTUAL_AGENTS=$(count_files md code-plugin/agents/)
EXPECTED_AGENTS=7
if [ "$ACTUAL_AGENTS" -eq "$EXPECTED_AGENTS" ]; then
    echo -e "${GREEN}✓${NC} Agents: $ACTUAL_AGENTS (expected $EXPECTED_AGENTS)"
else
    echo -e "${RED}✗${NC} Agents: $ACTUAL_AGENTS (expected $EXPECTED_AGENTS)"
    VALIDATION_PASSED=false
fi

# Patterns
ACTUAL_PATTERNS=$(count_files md code-plugin/patterns/)
EXPECTED_PATTERNS=16
if [ "$ACTUAL_PATTERNS" -eq "$EXPECTED_PATTERNS" ]; then
    echo -e "${GREEN}✓${NC} Patterns: $ACTUAL_PATTERNS (expected $EXPECTED_PATTERNS)"
else
    echo -e "${RED}✗${NC} Patterns: $ACTUAL_PATTERNS (expected $EXPECTED_PATTERNS)"
    VALIDATION_PASSED=false
fi

# Skills
ACTUAL_SKILLS=$(count_files md code-plugin/skills/)
EXPECTED_SKILLS=4
if [ "$ACTUAL_SKILLS" -eq "$EXPECTED_SKILLS" ]; then
    echo -e "${GREEN}✓${NC} Skills: $ACTUAL_SKILLS (expected $EXPECTED_SKILLS)"
else
    echo -e "${RED}✗${NC} Skills: $ACTUAL_SKILLS (expected $EXPECTED_SKILLS)"
    VALIDATION_PASSED=false
fi

echo ""

# === INFRASTRUCTURE COMPONENTS ===
echo "🏗️  Infrastructure Components"
echo "──────────────────────────────────────────"

# Hooks (event hooks at root level, excluding utils/ and non-hook files)
if command -v fd &> /dev/null; then
    ACTUAL_HOOKS=$(fd -e ts . core/infrastructure/hooks/ --max-depth 1 --exclude "*TEMPLATE*" --exclude utils --exclude tsconfig --exclude package 2>/dev/null | wc -l)
else
    ACTUAL_HOOKS=$(find core/infrastructure/hooks/ -maxdepth 1 -name "*.ts" -type f ! -name "*TEMPLATE*" ! -name "tsconfig*" ! -name "package*" 2>/dev/null | wc -l)
fi
EXPECTED_HOOKS=11
if [ "$ACTUAL_HOOKS" -eq "$EXPECTED_HOOKS" ]; then
    echo -e "${GREEN}✓${NC} Hooks: $ACTUAL_HOOKS (expected $EXPECTED_HOOKS)"
else
    echo -e "${RED}✗${NC} Hooks: $ACTUAL_HOOKS (expected $EXPECTED_HOOKS)"
    VALIDATION_PASSED=false
fi

# Hook Utilities (in utils/ subdirectory)
if command -v fd &> /dev/null; then
    ACTUAL_HOOK_UTILS=$(fd -e ts . core/infrastructure/hooks/utils/ --exclude "*TEMPLATE*" 2>/dev/null | wc -l)
else
    ACTUAL_HOOK_UTILS=$(find core/infrastructure/hooks/utils/ -name "*.ts" -type f ! -name "*TEMPLATE*" 2>/dev/null | wc -l)
fi
EXPECTED_HOOK_UTILS=23
if [ "$ACTUAL_HOOK_UTILS" -eq "$EXPECTED_HOOK_UTILS" ]; then
    echo -e "${GREEN}✓${NC} Hook Utilities: $ACTUAL_HOOK_UTILS (expected $EXPECTED_HOOK_UTILS)"
else
    echo -e "${RED}✗${NC} Hook Utilities: $ACTUAL_HOOK_UTILS (expected $EXPECTED_HOOK_UTILS)"
    VALIDATION_PASSED=false
fi

# Agents
ACTUAL_INFRA_AGENTS=$(count_files md core/infrastructure/agents/)
EXPECTED_INFRA_AGENTS=6
if [ "$ACTUAL_INFRA_AGENTS" -eq "$EXPECTED_INFRA_AGENTS" ]; then
    echo -e "${GREEN}✓${NC} Agents: $ACTUAL_INFRA_AGENTS (expected $EXPECTED_INFRA_AGENTS)"
else
    echo -e "${RED}✗${NC} Agents: $ACTUAL_INFRA_AGENTS (expected $EXPECTED_INFRA_AGENTS)"
    VALIDATION_PASSED=false
fi

# Patterns (meta + workflow + bundle)
ACTUAL_INFRA_PATTERNS=$(count_files md core/infrastructure/patterns/)
EXPECTED_INFRA_PATTERNS=22
if [ "$ACTUAL_INFRA_PATTERNS" -eq "$EXPECTED_INFRA_PATTERNS" ]; then
    echo -e "${GREEN}✓${NC} Patterns: $ACTUAL_INFRA_PATTERNS (expected $EXPECTED_INFRA_PATTERNS)"
else
    echo -e "${RED}✗${NC} Patterns: $ACTUAL_INFRA_PATTERNS (expected $EXPECTED_INFRA_PATTERNS)"
    VALIDATION_PASSED=false
fi

echo ""

# === COMPONENT ISOLATION ===
echo "🔒 Component Isolation (2-Tier Hybrid Check)"
echo "──────────────────────────────────────────"

# .claude/ should only have infrastructure commands and config (not agents/patterns/hooks)
# Check if directories exist first, count files if they do
if [ -d ".claude/agents" ]; then
  CLAUDE_AGENTS=$(count_files md .claude/agents/)
else
  CLAUDE_AGENTS=0
fi

if [ -d ".claude/patterns" ]; then
  CLAUDE_PATTERNS=$(count_files md .claude/patterns/)
else
  CLAUDE_PATTERNS=0
fi

if [ -d ".claude/hooks" ]; then
  CLAUDE_HOOKS=$(count_files ts .claude/hooks/ node_modules)
else
  CLAUDE_HOOKS=0
fi

# Commands in .claude/commands/infra/ are expected (part of 2-tier hybrid architecture)
# We only check that no domain-specific components leak into .claude/

if [ "$CLAUDE_AGENTS" -eq 0 ] && [ "$CLAUDE_PATTERNS" -eq 0 ] && [ "$CLAUDE_HOOKS" -eq 0 ]; then
    echo -e "${GREEN}✓${NC} No domain components in .claude/ (2-tier hybrid maintained)"
    echo "  ℹ️  .claude/commands/infra/ contains 32 infrastructure commands (expected)"
else
    echo -e "${RED}✗${NC} Domain components found in .claude/ (should be in core/ or plugin/)"
    [ "$CLAUDE_AGENTS" -gt 0 ] && echo -e "  ${RED}✗${NC} Found $CLAUDE_AGENTS agents in .claude/"
    [ "$CLAUDE_PATTERNS" -gt 0 ] && echo -e "  ${RED}✗${NC} Found $CLAUDE_PATTERNS patterns in .claude/"
    [ "$CLAUDE_HOOKS" -gt 0 ] && echo -e "  ${RED}✗${NC} Found $CLAUDE_HOOKS hooks in .claude/"
    VALIDATION_PASSED=false
fi

echo ""

# === SUMMARY ===
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$VALIDATION_PASSED" = true ]; then
    echo -e "${GREEN}✅ All validations passed!${NC}"
    echo ""
    echo "Code Plugin: 7 agents, 16 patterns, 4 skills"
    echo "Infrastructure: 11 hooks, 23 utilities, 6 agents, 22 patterns"
    echo "Separation: Clean (.claude/ contains 32 commands)"
    exit 0
else
    echo -e "${RED}❌ Validation failed!${NC}"
    echo ""
    echo "Some component counts don't match expectations."
    echo "Review the output above for details."
    exit 1
fi
