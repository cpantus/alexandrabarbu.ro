# Preventing Functional Duplication System

## Overview

This system prevents creating duplicate FUNCTIONALITY (not just duplicate files) by understanding component capabilities semantically and mapping task intent to existing components.

## Problem It Solves

**Before:** System would create new hooks/components even when existing ones already handled the domain
**Example:** "Integrate CLI tools" → System creates NEW hook instead of extending `pre-tool-use-bash.ts`

**After:** System recognizes functional overlap and extends existing components
**Example:** "Integrate CLI tools" → System extends `bash-optimizer.ts` rules

## System Components

### 1. Component Registry (`component-registry.json`)

**Purpose:** Semantic index of all component capabilities

**Structure:**
```json
{
  "components": {
    "[type]": {
      "[name]": {
        "purpose": "What it does",
        "capabilities": ["List of things it can do"],
        "domains": ["Areas it owns"],
        "extensible": true/false,
        "extensionPoints": [{"where to extend"}],
        "keywords": ["searchable terms"]
      }
    }
  },
  "domainOwnership": {
    "[domain]": {
      "owner": "component-that-owns-this",
      "includesSubdomains": ["related areas"]
    }
  },
  "intentMappings": [
    {
      "patterns": ["regex patterns for task descriptions"],
      "mapTo": "component/name",
      "action": "extend|configure|use_existing"
    }
  ]
}
```

### 2. Pre-Creation Check Pattern (`patterns/meta/pre_creation_check.md`)

**Purpose:** Decision process for extend vs create

**Process:**
1. Parse task intent (extract keywords, identify domain)
2. Search component registry (keywords, capabilities, domains)
3. Check intent mappings (pattern matching)
4. Determine action (extend, configure, use, or create)
5. Generate recommendation with reasoning

### 3. Pre-Planning Validation Hook (`hooks/pre-planning-validation.ts`)

**Purpose:** Automated validation before component creation

**Features:**
- Semantic similarity scoring
- Intent pattern matching
- Domain ownership checking
- Extension point discovery
- Clear guidance generation

**Usage:** Runs automatically when planning component creation

## How It Works

### Step 1: Task Analysis

When you request: "Integrate modern CLI tools like htop via hook"

System extracts:
- **Keywords:** [integrate, cli, tools, hook, htop]
- **Domain:** bash optimization
- **Intent:** Adding new CLI tool support

### Step 2: Registry Search

System checks:
1. **Intent patterns:** Does "integrate.*cli.*tools" match anything?
   - ✅ Matches → `hooks/pre-tool-use-bash` (action: extend)

2. **Keyword similarity:** Which components have similar keywords?
   - `pre-tool-use-bash`: 85% match (bash, cli, optimize, tools)

3. **Domain ownership:** Who owns "bash optimization"?
   - Owner: `hooks/pre-tool-use-bash`

### Step 3: Decision

Based on findings:
- **High match + extensible** → EXTEND at designated point
- **High match + not extensible** → USE existing
- **Partial match + configurable** → CONFIGURE
- **No match** → CREATE new

### Step 4: Guidance

System provides:
```
Action: EXTEND
Target: hooks/pre-tool-use-bash
Extension Point: Add rules to bash-optimizer.ts optimizationRules array
Implementation: Create new OptimizationRule for htop
```

## Maintenance Guide

### Adding New Components

When creating a new component:

1. **Update Registry:**
```json
{
  "components": {
    "hooks": {
      "new-hook-name": {
        "path": ".claude/hooks/new-hook-name.ts",
        "purpose": "Clear one-line description",
        "capabilities": ["capability1", "capability2"],
        "domains": ["domain-it-handles"],
        "extensible": false,
        "keywords": ["relevant", "search", "terms"]
      }
    }
  }
}
```

2. **Claim Domain (if applicable):**
```json
{
  "domainOwnership": {
    "new-domain": {
      "owner": "hooks/new-hook-name",
      "description": "What this domain covers"
    }
  }
}
```

3. **Add Intent Mappings:**
```json
{
  "intentMappings": [
    {
      "patterns": ["create.*new.*thing", "add.*feature"],
      "mapTo": "hooks/new-hook-name",
      "action": "extend"
    }
  ]
}
```

### Making Components Extensible

To make a component extensible:

1. **Design Extension Points:**
   - Arrays for adding items (rules, handlers, processors)
   - Interfaces for implementing (plugins, adapters)
   - Configuration objects for customizing

2. **Document in Registry:**
```json
{
  "extensible": true,
  "extensionPoints": [
    {
      "type": "rules",
      "location": "path/to/file.ts",
      "interface": "RuleInterface",
      "description": "How to extend this"
    }
  ]
}
```

3. **Add Extension Examples:**
   - Show sample extension code
   - Document interface requirements
   - Explain integration process

## Usage Patterns

### Before Creating Any Component

1. **Run Pre-Creation Check:**
```bash
/pattern pre_creation_check "integrate new CLI tool ncdu"
```

2. **Review Recommendations:**
   - If EXTEND → Follow extension guide
   - If CREATE → Proceed with creation

3. **Update Registry After Creation:**
   - Add component definition
   - Define domain ownership
   - Create intent mappings

### Common Scenarios

**Scenario 1: Adding CLI Tool**
- Task: "Add support for ncdu command"
- Result: EXTEND `bash-optimizer.ts`
- Action: Add `OptimizationRule` for ncdu

**Scenario 2: New File Validation**
- Task: "Validate JSON files before writing"
- Result: EXTEND `pre-tool-use-write.ts`
- Action: Add JSON validation logic

**Scenario 3: New Telemetry**
- Task: "Track pattern execution time"
- Result: EXTEND `agent-telemetry.ts`
- Action: Add pattern metrics

**Scenario 4: Genuinely New**
- Task: "Create database migration system"
- Result: CREATE new component
- Action: No existing component handles this

## Best Practices

### DO:
✅ Always check registry before creating
✅ Prefer extending over creating
✅ Update registry immediately after changes
✅ Document extension points clearly
✅ Use semantic keywords in registry
✅ Test intent patterns thoroughly

### DON'T:
❌ Create without checking registry
❌ Duplicate functionality
❌ Ignore domain boundaries
❌ Skip registry updates
❌ Use vague component purposes
❌ Create overly specific components

## Validation Commands

Check system health:
```bash
# Validate registry syntax
cat .claude/component-registry.json | jq .

# Test pre-creation check
echo '{"task": "add new CLI tool", "type": "hook", "name": "test"}' | \
  ts-node .claude/hooks/pre-planning-validation.ts

# Find components by keyword
jq '.components | .. | select(.keywords? | arrays | map(select(. == "bash")) | length > 0)' \
  .claude/component-registry.json
```

## Troubleshooting

### Component Not Found
- Check keywords in registry
- Verify domain ownership
- Test intent patterns
- Ensure registry is updated

### Wrong Action Suggested
- Review intent mappings
- Adjust similarity threshold
- Update component capabilities
- Fix domain boundaries

### Extension Point Missing
- Mark component as extensible
- Document extension points
- Provide interface definition
- Add usage examples

## Version History

- **v1.0.0** (2025-11-07): Initial implementation
  - Component registry
  - Pre-creation validation
  - Intent mapping system
  - Domain ownership tracking

## Related Files

- `/home/cere/Work/marketing-agent-v5/.claude/component-registry.json` - Component capability index
- `/home/cere/Work/marketing-agent-v5/.claude/patterns/meta/pre_creation_check.md` - Decision pattern
- `/home/cere/Work/marketing-agent-v5/.claude/hooks/pre-planning-validation.ts` - Automated validation
- `/home/cere/Work/marketing-agent-v5/.claude/hooks/utils/bash-optimizer.ts` - Example extensible component