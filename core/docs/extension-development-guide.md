# Extension Development Guide

**Version:** 1.0.0
**Last Updated:** 2025-11-08

## Overview

This guide explains how to create Claude Code extensions that add domain-specific agents, skills, patterns, and commands to the core infrastructure.

### What are Extensions?

Extensions are self-contained packages that add functionality to Claude Code:
- **Domain-specific agents** (e.g., marketing, sales, engineering)
- **Domain knowledge skills** (e.g., SEO, financial analysis)
- **Workflow patterns** (e.g., content creation, data analysis)
- **Custom commands** (e.g., /campaign, /analyze)
- **Knowledge bases** (frameworks, guidelines, examples)

### Core + Extensions Architecture

```
┌─────────────────────────────────────────┐
│  Core Infrastructure (v5.0+)            │
│  ├── Orchestrator agents                │
│  ├── Meta & workflow patterns           │
│  ├── Infrastructure commands            │
│  ├── Hooks & utilities                  │
│  └── Schemas & validation               │
└─────────────────────────────────────────┘
              ↓ Uses
┌─────────────────────────────────────────┐
│  Extensions (Domain-Specific)            │
│  ├── marketing/                          │
│  ├── sales/                              │
│  ├── engineering/                        │
│  └── your-extension/                     │
└─────────────────────────────────────────┘
              ↓ Composed in
┌─────────────────────────────────────────┐
│  Projects (Core + Extensions)            │
│  └── config.json → enables extensions   │
└─────────────────────────────────────────┘
```

---

## Quick Start

### 1. Copy Template

```bash
cp -r core/../extensions/_template extensions/your-domain
cd extensions/your-domain
```

### 2. Configure Manifest

Edit `domain.json`:

```json
{
  "name": "your-domain",
  "version": "1.0.0",
  "type": "extension",
  "description": "Your domain description",
  "components": {
    "agents": [...],
    "skills": [...],
    "patterns": [...],
    "commands": [...]
  }
}
```

### 3. Create Components

- Add agents to `agents/`
- Add skills to `skills/`
- Add patterns to `patterns/`
- Add commands to `commands/`

### 4. Enable Extension

Edit `projects/your-project/.claude/config.json`:

```json
{
  "extensions": [
    {
      "name": "your-domain",
      "enabled": true
    }
  ]
}
```

### 5. Test

```bash
/system-health  # Verify extension loaded
```

---

## Extension Structure

### Directory Layout

```
extensions/your-domain/
├── domain.json              # Manifest (required)
├── DOMAIN.md                # Domain-specific rules (optional)
├── README.md                # Documentation
├── agents/                  # Agent definitions
│   ├── strategist.md
│   └── executor.md
├── skills/                  # Auto-activated knowledge
│   ├── domain-knowledge.md
│   └── resources/
│       └── frameworks.md
├── patterns/                # Workflow templates
│   ├── category1/
│   │   └── pattern1.md
│   └── category2/
│       └── pattern2.md
├── commands/                # Slash commands
│   ├── primary-command.md
│   └── utility-command.md
├── knowledge/               # Knowledge base
│   ├── guidelines/
│   ├── frameworks/
│   └── examples/
└── teaching/                # Teaching system (optional)
    ├── modules/
    └── datasets/
```

---

## Manifest (domain.json)

### Required Fields

```json
{
  "name": "extension-name",           // kebab-case
  "version": "1.0.0",                 // Semantic versioning
  "type": "extension",                // Always "extension"
  "description": "Brief description",
  "components": {...}                 // Component definitions
}
```

### Component Definitions

#### Agents

```json
{
  "agents": [
    {
      "name": "my-agent",             // kebab-case
      "path": "agents/my-agent.md",   // Relative path
      "description": "Agent purpose",
      "tier": "tier2",                // tier1/tier2/tier3
      "model": "sonnet"               // haiku/sonnet/opus
    }
  ]
}
```

#### Skills

```json
{
  "skills": [
    {
      "name": "my-skill",
      "path": "skills/my-skill.md",
      "description": "Skill purpose",
      "tier": "tier2",
      "triggers": ["keyword1", "keyword2"]  // Auto-activation
    }
  ]
}
```

#### Patterns

```json
{
  "patterns": [
    {
      "name": "my_pattern",           // snake_case
      "path": "patterns/category/my_pattern.md",
      "category": "content",          // Pattern category
      "description": "Pattern purpose",
      "tier": "tier2",
      "model": "sonnet"
    }
  ]
}
```

#### Commands

```json
{
  "commands": [
    {
      "name": "mycommand",            // No / prefix
      "path": "commands/mycommand.md",
      "description": "Command purpose",
      "category": "workflow"
    }
  ]
}
```

### Features

```json
{
  "features": {
    "teaching": true,       // Has teaching modules
    "demo": false,          // Has demo capabilities
    "workflows": true,      // Has custom workflows
    "mcp": false            // Has MCP integrations
  }
}
```

### Dependencies

```json
{
  "dependencies": {
    "core": ">=5.0.0",                      // Core version
    "extensions": [
      {
        "name": "other-extension",
        "version": "^1.0.0"                 // Semver range
      }
    ]
  }
}
```

### Tier Assignments

```json
{
  "tier": {
    "tier1": ["critical-agent", "always-skill"],
    "tier2": ["common-pattern", "frequent-agent"],
    "tier3": ["specialized-agent", "advanced-pattern"]
  }
}
```

### MCP Servers

```json
{
  "mcpServers": [
    {
      "name": "domain-api",
      "command": "node",
      "args": ["mcp-servers/api-server.js"],
      "env": {
        "API_KEY": "${DOMAIN_API_KEY}"
      }
    }
  ]
}
```

---

## Component Development

### Agents

**Format:** Markdown with role, capabilities, and instructions

```markdown
# My Agent

**Category:** Strategy
**Purpose:** Strategic planning and analysis
**Model:** Sonnet

## Role

You are a strategic planning agent specializing in...

## Capabilities

- Capability 1
- Capability 2

## Tools Available

- Read, Write, Edit
- Bash, Grep, Glob

## Instructions

1. Step 1
2. Step 2
3. Step 3
```

**Best Practices:**
- Clear role definition
- Specific capabilities
- Detailed instructions
- Appropriate model selection

### Skills

**Format:** Markdown with triggers and domain knowledge

```markdown
# My Skill

**Triggers:** domain, expertise, specialized

## Purpose

Provides domain expertise for...

## Knowledge

### Topic 1

Detailed knowledge about topic 1...

### Topic 2

Detailed knowledge about topic 2...

## Examples

Practical examples...
```

**Best Practices:**
- Specific trigger keywords
- Focused domain knowledge
- Practical examples
- External resources for large content

### Patterns

**Format:** Structured markdown with phases and outputs

```markdown
# My Pattern

**Category:** content
**Model:** Sonnet

## PATTERN DEFINITION

Name, type, domain, complexity

## WHEN TO USE

Conditions for using this pattern

## INPUT

Expected input structure

## PROCESS

### Phase 1: Analysis
### Phase 2: Planning
### Phase 3: Execution
### Phase 4: Validation

## OUTPUT

Expected output structure

## EXAMPLE

Concrete example with input/output
```

**Best Practices:**
- Clear phases
- Structured I/O
- Concrete examples
- Chainable design

### Commands

**Format:** Markdown documentation

```markdown
# /mycommand - Description

**Category:** workflow
**Version:** 1.0.0

## SYNTAX

```bash
/mycommand [options] <args>
```

## WHAT IT DOES

Detailed description...

## EXAMPLES

Usage examples...

## WORKFLOW

Step-by-step process...
```

**Best Practices:**
- Clear syntax
- Helpful examples
- Error handling docs
- Integration notes

---

## Tiered Loading

### Tier Levels

**Tier 1:** Always loaded (critical)
- Core functionality
- Frequently used agents
- Auto-activation skills
- **Target:** <5 components, <50K tokens

**Tier 2:** Load on-demand (common)
- Standard workflows
- Common patterns
- Regular agents
- **Target:** 10-20 components, <100K tokens

**Tier 3:** Explicit request (specialized)
- Advanced features
- Specialized agents
- Rarely used patterns
- **Target:** Unlimited, load only when needed

### Assignment Strategy

```json
{
  "tier": {
    "tier1": [
      "primary-agent",      // Main agent
      "core-skill"          // Always-needed knowledge
    ],
    "tier2": [
      "common-pattern",     // Frequently used
      "standard-agent"      // Regular workflows
    ],
    "tier3": [
      "advanced-pattern",   // Specialized
      "expert-agent"        // Rarely needed
    ]
  }
}
```

---

## Auto-Activation

### Skill Triggers

Skills auto-load when user prompt matches triggers:

```json
{
  "skills": [
    {
      "name": "seo-optimization",
      "triggers": [
        "seo",
        "search engine",
        "keywords",
        "ranking"
      ]
    }
  ]
}
```

### Trigger Best Practices

1. **Specific keywords:** Use domain-specific terms
2. **Common phrases:** Include variations
3. **Avoid conflicts:** Don't overlap with other skills
4. **Test thoroughly:** Verify activation works

---

## Validation

### Schema Validation

All components are validated against JSON schemas:

```bash
# Validates manifest structure
domain-schema.json

# Validates component metadata
agent-schema.json
skill-schema.json
pattern-schema.json
command-schema.json
```

### Component Validation

Use meta-patterns to validate components:

```bash
/pattern component_agent agents/my-agent.md
/pattern component_skill skills/my-skill.md
/pattern component_pattern patterns/my_pattern.md
/pattern component_command commands/mycommand.md
```

### Testing Checklist

- [ ] Manifest validates against domain-schema.json
- [ ] All component paths exist
- [ ] Components validate against schemas
- [ ] Triggers activate correctly
- [ ] Tier assignments appropriate
- [ ] Dependencies satisfied
- [ ] MCP servers (if any) work
- [ ] No conflicts with other extensions

---

## Best Practices

### 1. Focused Domain

- One domain per extension
- Clear scope and boundaries
- Avoid feature creep

### 2. Clean Structure

- Consistent naming (kebab-case agents, snake_case patterns)
- Organized directories
- Clear documentation

### 3. Proper Tiering

- Tier 1: Only critical components
- Tier 2: Common workflows
- Tier 3: Specialized features

### 4. Quality Components

- Well-documented
- Thoroughly tested
- Error handling
- Clear examples

### 5. Versioning

- Semantic versioning (MAJOR.MINOR.PATCH)
- CHANGELOG.md for changes
- Dependency version ranges

### 6. Performance

- Lazy loading for large content
- External resources for knowledge
- Prompt caching for >15K tokens
- Minimize tier 1 components

---

## Example Extensions

### Minimal Extension

```
my-extension/
├── domain.json
├── README.md
├── agents/
│   └── assistant.md
└── skills/
    └── knowledge.md
```

### Full-Featured Extension

```
marketing/
├── domain.json
├── DOMAIN.md
├── README.md
├── agents/           (13 agents)
├── skills/           (7 skills)
├── patterns/         (30 patterns)
├── commands/         (50 commands)
├── knowledge/        (frameworks, guidelines)
└── teaching/         (30 modules)
```

---

## Troubleshooting

### Extension Not Loading

1. Check `domain.json` syntax
2. Verify extension enabled in `config.json`
3. Run `/system-health`
4. Check console for errors

### Components Not Found

1. Verify paths in `domain.json`
2. Check file names match
3. Ensure files exist
4. Validate with meta-patterns

### Auto-Activation Not Working

1. Check trigger keywords
2. Verify skill tier
3. Test with `/load skills`
4. Review hook output

---

## Publishing Extensions

### Packaging

1. Clean repository
2. Add LICENSE file
3. Update README.md
4. Version bump in domain.json
5. Create CHANGELOG.md entry

### Distribution

**Git Repository:**
```bash
git clone https://github.com/you/claude-code-extension-name
cp -r claude-code-extension-name extensions/extension-name
```

**NPM Package:**
```bash
npm install @your-org/claude-code-extension-name
ln -s node_modules/@your-org/extension-name extensions/
```

---

## Support

- **Documentation:** `@core/docs/`
- **Validation:** `/pattern component_*`
- **Testing:** `/system-health`
- **Examples:** `extensions/marketing/`

---

**Guide Version:** 1.0.0
**Compatible With:** Core v5.0+
**Last Updated:** 2025-11-08
