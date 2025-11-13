# Tier System Architecture

**Version:** 1.0
**Last Updated:** 2025-11-11
**Purpose:** Infrastructure-level guide to the tier system for progressive context disclosure

---

## Overview

The **tier system** is a progressive disclosure mechanism that dynamically adjusts context loading based on task complexity. It provides a way for plugins to define capability levels and automatically activate the appropriate components (agents, skills, patterns) for each tier.

**Core Concept:** Start minimal, scale up as needed, optimize token usage while maintaining capability.

---

## Architecture

### Components

```
┌─────────────────────────────────────────────┐
│         User Prompt Submission              │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│      Tier Detection (Hook System)           │
│  - Keyword matching                         │
│  - Intent pattern analysis                  │
│  - Explicit tier requests                   │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│      Component Loading (Progressive)         │
│  - Core infrastructure (always)             │
│  - Tier-specific agents                     │
│  - Tier-specific skills                     │
│  - Tier-specific patterns                   │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         Context Assembly                     │
│  - Base context (CLAUDE.md)                 │
│  - Tier-appropriate docs                    │
│  - Plugin-specific components               │
└─────────────────────────────────────────────┘
```

---

## How Tiers Work

### 1. Tier Detection

**Trigger:** `UserPromptSubmit` hook event

**Detection Methods:**
- **Explicit:** User specifies tier (`/tier expert`, `use expert mode`)
- **Keyword matching:** Task-specific keywords indicate complexity
- **Intent patterns:** Regex patterns match task descriptions
- **Default:** Falls back to base tier when unclear

**Detection Logic:**
```typescript
function detectTier(prompt: string): string {
  // 1. Check explicit tier requests
  if (/\btier\s+(minimal|core|specialized|expert)/i.test(prompt)) {
    return extractTier(prompt);
  }

  // 2. Match against tier keyword patterns
  for (const tier of TIERS) {
    if (tier.keywords.some(kw => prompt.includes(kw))) {
      return tier.name;
    }
  }

  // 3. Default to base tier
  return DEFAULT_TIER;
}
```

### 2. Component Loading

**Progressive Loading Strategy:**
- **Base tier:** Core infrastructure only (minimal tokens)
- **Higher tiers:** Add specialized components incrementally
- **On-demand:** Load additional resources as needed

**Component Categories:**
- **Agents:** Tier-specific processing capabilities
- **Skills:** Domain knowledge and guidelines
- **Patterns:** Execution templates
- **Documentation:** Context-specific guides

### 3. Context Assembly

**Token Budget Management:**
```
Base Context (always loaded)
├── CLAUDE.md (~1,200 tokens)
├── Core infrastructure hooks
└── Essential utilities

Tier Context (progressive)
├── Tier-specific agents (0-2,000 tokens)
├── Auto-activated skills (0-4,000 tokens)
├── Relevant patterns (0-1,500 tokens)
└── Documentation (0-2,000 tokens)

Total: 1,200 - 10,700 tokens (progressive)
```

---

## Plugin Integration

### Defining Tiers for Your Plugin

**1. Create Tier Configuration**

Location: `[plugin]/.claude-plugin/tiers.json`

```json
{
  "tiers": {
    "minimal": {
      "description": "Basic tasks with core functionality",
      "agents": [],
      "skills": ["core-skill"],
      "patterns": ["basic_*"],
      "keywords": ["quick", "simple", "basic"],
      "intentPatterns": ["quick.*task", "simple.*help"],
      "tokenBudget": 1500
    },
    "core": {
      "description": "Standard tasks with common workflows",
      "agents": ["generalist"],
      "skills": ["core-skill", "domain-skill"],
      "patterns": ["basic_*", "standard_*"],
      "keywords": ["create", "analyze", "optimize"],
      "intentPatterns": ["create.*content", "analyze.*data"],
      "tokenBudget": 4000
    },
    "specialized": {
      "description": "Complex tasks requiring domain expertise",
      "agents": ["generalist", "specialist-1", "specialist-2"],
      "skills": ["core-skill", "domain-skill", "advanced-skill"],
      "patterns": ["*"],
      "keywords": ["complex", "strategic", "comprehensive"],
      "intentPatterns": ["complex.*strategy", "comprehensive.*plan"],
      "tokenBudget": 8000
    },
    "expert": {
      "description": "Highly complex tasks with full capabilities",
      "agents": ["*"],
      "skills": ["*"],
      "patterns": ["*"],
      "keywords": ["expert", "advanced", "full analysis"],
      "intentPatterns": ["expert.*mode", "full.*capabilities"],
      "tokenBudget": 10000
    }
  },
  "default": "core"
}
```

**2. Implement Tier Detection Hook**

Location: `[plugin]/hooks/tier-detector.ts`

```typescript
import { loadTierConfig } from './utils/tier-loader';

export function detectTier(prompt: string): string {
  const config = loadTierConfig();

  // Check explicit tier requests
  const explicitMatch = prompt.match(/\btier\s+(\w+)/i);
  if (explicitMatch && config.tiers[explicitMatch[1]]) {
    return explicitMatch[1];
  }

  // Match keywords and intent patterns
  for (const [tierName, tier] of Object.entries(config.tiers)) {
    // Keyword matching
    if (tier.keywords.some(kw =>
      new RegExp(`\\b${kw}\\b`, 'i').test(prompt)
    )) {
      return tierName;
    }

    // Intent pattern matching
    if (tier.intentPatterns.some(pattern =>
      new RegExp(pattern, 'i').test(prompt)
    )) {
      return tierName;
    }
  }

  return config.default;
}
```

**3. Register with Hook System**

Update `settings.json`:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npx tsx [plugin]/hooks/tier-detector.ts"
          }
        ]
      }
    ]
  }
}
```

---

## Implementation Patterns

### Pattern 1: Token Budget Enforcement

```typescript
interface TierConfig {
  tokenBudget: number;
  components: ComponentList;
}

function assembleContext(tier: TierConfig): Context {
  let tokenCount = BASE_CONTEXT_TOKENS;
  const components: Component[] = [];

  // Load components until budget reached
  for (const component of tier.components) {
    if (tokenCount + component.estimatedTokens <= tier.tokenBudget) {
      components.push(component);
      tokenCount += component.estimatedTokens;
    }
  }

  return { components, tokenCount };
}
```

### Pattern 2: Progressive Skill Activation

```typescript
function activateSkills(tier: string): Skill[] {
  const tierConfig = TIER_CONFIG[tier];
  const skills: Skill[] = [];

  // Always load core skills
  skills.push(...CORE_SKILLS);

  // Add tier-specific skills
  for (const skillPattern of tierConfig.skills) {
    if (skillPattern === '*') {
      skills.push(...ALL_SKILLS);
      break;
    }
    skills.push(...matchSkills(skillPattern));
  }

  return deduplicateSkills(skills);
}
```

### Pattern 3: Agent Orchestration by Tier

```typescript
function selectAgents(tier: string, taskType: string): Agent[] {
  const tierConfig = TIER_CONFIG[tier];

  // Minimal tier: no agents (direct execution)
  if (tier === 'minimal') return [];

  // Core tier: single generalist agent
  if (tier === 'core') return [GENERALIST_AGENT];

  // Specialized tier: task-specific specialists
  if (tier === 'specialized') {
    return selectSpecialists(taskType, tierConfig.agents);
  }

  // Expert tier: full agent fleet
  if (tier === 'expert') {
    return ALL_AGENTS;
  }
}
```

---

## Best Practices

### Tier Design Principles

1. **Start Minimal**
   - Base tier should handle 60-70% of common tasks
   - Keep base tier under 2,000 tokens
   - Progressive enhancement over preloading

2. **Clear Boundaries**
   - Each tier should have distinct capabilities
   - Tier transitions should be obvious to users
   - Document when to use each tier

3. **Token Efficiency**
   - Set realistic token budgets per tier
   - Use prompt caching for large components
   - Lazy-load documentation and resources

4. **User Experience**
   - Auto-detection should work 90%+ of the time
   - Allow explicit tier override
   - Provide tier switching guidance

### Tier Naming Conventions

**Standard Tier Names:**
- `minimal` - Simplest tasks, minimal context
- `core` - Standard tasks, common workflows
- `specialized` - Complex tasks, domain expertise
- `expert` - Advanced tasks, full capabilities

**Custom Tier Names:**
- Use domain-specific names if clearer
- Document tier hierarchy clearly
- Maintain consistent naming across plugin

---

## Monitoring and Optimization

### Metrics to Track

1. **Tier Distribution**
   - % of tasks at each tier
   - Auto-detection accuracy
   - User tier overrides

2. **Token Usage**
   - Average tokens per tier
   - Token budget compliance
   - Cache hit rates

3. **Task Success**
   - Completion rates by tier
   - Tier escalations (core → specialized)
   - User satisfaction by tier

### Optimization Strategies

**When base tier is overloaded (>80% of tasks):**
- Split into `minimal` and `core` tiers
- Improve specialized tier detection
- Add more specific keywords

**When expert tier is underused (<5% of tasks):**
- Merge with specialized tier
- Improve tier documentation
- Simplify tier selection

**When detection accuracy is low (<85%):**
- Add more keywords and patterns
- Improve intent pattern regex
- Allow user feedback on tier selection

---

## Example: Marketing Plugin Tiers

**Reference Implementation:** `marketing-plugin/docs/tier-guide.md`

**Tier Breakdown:**
- **Core** (70% tasks): Content creation, basic analysis, standard campaigns
- **Specialized** (20% tasks): Strategic planning, competitive analysis, optimization
- **Expert** (8% tasks): Comprehensive campaigns, multi-channel strategies
- **Teaching** (2% tasks): Educational modules, guided learning

**Key Insights:**
- Core tier handles majority of tasks efficiently
- Specialized tier activates for domain keywords
- Expert tier is explicit or pattern-triggered
- Teaching tier is command-triggered (`/start-*`)

---

## Troubleshooting

### Wrong Tier Detected

**Symptom:** Task uses inappropriate tier (too high or too low)

**Solutions:**
1. Add missing keywords to tier config
2. Improve intent pattern specificity
3. Allow explicit tier override
4. Review detection logs

### Token Budget Exceeded

**Symptom:** Tier loads more tokens than budgeted

**Solutions:**
1. Reduce component list for tier
2. Use lazy loading for documentation
3. Implement prompt caching
4. Split tier into sub-tiers

### Tier Transitions Unclear

**Symptom:** Users don't know when to switch tiers

**Solutions:**
1. Document tier capabilities clearly
2. Add tier suggestions in responses
3. Implement tier escalation hints
4. Create tier decision tree

---

## Related Documentation

- **Plugin-Specific Tiers:** See individual plugin docs (e.g., `marketing-plugin/docs/tier-guide.md`)
- **Hook Architecture:** `core/docs/hook-architecture.md`
- **Skills System:** `core/docs/skills-system.md`
- **Agent Orchestration:** `core/docs/agent-orchestration.md`
- **Token Optimization:** `core/docs/prompt-caching-guide.md`

---

**Last Updated:** 2025-11-11
**Version:** 1.0
**Maintainer:** Infrastructure Team
**Type:** Architecture Reference
