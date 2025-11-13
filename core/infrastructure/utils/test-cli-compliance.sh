#!/bin/bash
# Test CLI Tool Compliance
# Validates that bash-optimizer correctly transforms legacy commands

echo "🧪 Testing CLI Tool Enforcement..."
echo ""

# Test cases: input|expected_pattern
declare -a TESTS=(
  "cat file.txt|bat --line-range"
  "cat file.txt | head|bat --line-range.*head"
  "ls -lh|exa --git.*-l.*-h"
  "ls -lat|exa --git.*-l.*-a.*--sort modified"
  "grep pattern file|rg.*pattern.*file"
  "find . -name '*.txt'|fd.*\\.txt"
  "wc -l file.txt|rg -c"
)

PASSED=0
FAILED=0

for test in "${TESTS[@]}"; do
  IFS='|' read -r input expected <<< "$test"

  # Run through bash-optimizer hook
  result=$(echo "{\"command\": \"$input\"}" | npx tsx /home/cere/Work/marketing-agent/.claude/hooks/pre-tool-use-bash.ts 2>/dev/null | jq -r .command 2>/dev/null)

  if echo "$result" | rg -q "$expected"; then
    echo "  ✅ $input"
    echo "     → $result"
    ((PASSED++))
  else
    echo "  ❌ $input"
    echo "     → $result"
    echo "     Expected pattern: $expected"
    ((FAILED++))
  fi
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Results: $PASSED passed, $FAILED failed"
echo ""

if [ $FAILED -eq 0 ]; then
  echo "✅ All tests passed!"
  exit 0
else
  echo "❌ $FAILED test(s) failed"
  exit 1
fi
