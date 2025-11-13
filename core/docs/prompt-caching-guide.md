# Prompt Caching Guide

Prompt caching reduces costs by 26.5% through strategic content reuse. Agents >15K tokens MUST implement caching.

## The 5 Caching Rules

### Rule 1: Size Threshold & Structure

**Requirement:** Agents >15K tokens MUST cache

**Structure:**
```markdown
# Agent Name

## OPTIMIZATION
[Agent metadata, model, thinking mode]

## CACHEABLE CONTEXT
[Stable content that rarely changes - FIRST section]

## [Rest of agent content]
[Variable task requirements, examples]
```

**Cache window:** 5 minutes (10% cost after cache hit)

---

### Rule 2: Ordering Matters

**Correct order:** Cacheable → Variable

```markdown
## CACHEABLE CONTEXT

### Cached Knowledge Files
@.claude/knowledge/cache/marketing-context.md
@.claude/knowledge/cache/brand-guidelines.md

### Core Agent Expertise
[Stable frameworks, methodologies]

### Tools & Capabilities
[Available tools, integrations]

---

## Task Requirements
[Variable user input, specific requests]
```

**Why:** Cache breaks on first change. Stable content first maximizes reuse.

---

### Rule 3: File Organization

**Directory structure:**
```
.claude/knowledge/
├── cache/                          ← Stable files (cached)
│   ├── marketing-context.md
│   ├── brand-guidelines.md
│   └── audience-profiles.md
├── content/                        ← Variable files (not cached)
│   ├── campaign-brief.md
│   └── current-projects.md
```

**Cacheable files:**
- Brand guidelines (stable)
- Frameworks/methodologies (rarely change)
- Reference data (benchmarks, personas)

**Variable files:**
- Campaign briefs (task-specific)
- Current projects (frequently updated)
- Temporary analysis (one-time use)

---

### Rule 4: Naming Conventions

**Pattern:** `[domain]-context.md`

**Examples:**
- `marketing-context.md` - Core marketing knowledge
- `brand-context.md` - Brand voice, guidelines
- `analytics-context.md` - Metrics, benchmarks
- `compliance-context.md` - Legal, regulations

**Token budget:** 2-3K tokens per file

**Sharing:** Files shared across multiple agents for consistency

---

### Rule 5: YAML Configuration

**Location:** Agent frontmatter (after H1, before core content)

```yaml
---
name: marketing-director
description: Strategic marketing leadership
tools: [Read, Write, Bash, Task, WebSearch]
model: sonnet
thinkingMode: think-hard
promptCaching: true
cacheFiles:
  - .claude/knowledge/cache/marketing-context.md
  - .claude/knowledge/cache/brand-guidelines.md
  - .claude/knowledge/cache/audience-profiles.md
---
```

**Required fields when caching:**
- `promptCaching: true`
- `cacheFiles: [...]` (list of cacheable files)

**3 sections required:**
1. OPTIMIZATION (after H1)
2. CACHEABLE CONTEXT (first content section)
3. Rest of agent content

---

## Implementation Template

### Agent Structure with Caching

```markdown
---
name: my-agent
description: Agent description
tools: [Read, Write, Bash]
model: sonnet
thinkingMode: think-hard
promptCaching: true
cacheFiles:
  - .claude/knowledge/cache/domain-context.md
---

# Agent Name

## OPTIMIZATION

**Model:** sonnet
**Thinking:** think-hard
**Caching:** Enabled (3 context files, ~8K tokens cached)
**Cost impact:** 26% reduction with cache hits

---

## CACHEABLE CONTEXT

### Knowledge Files

@.claude/knowledge/cache/domain-context.md
@.claude/knowledge/cache/brand-guidelines.md
@.claude/knowledge/cache/reference-data.md

### Core Frameworks

[Stable methodologies, frameworks that rarely change]

### Quality Standards

[Consistent quality checks, validation criteria]

---

## Core Expertise

[Agent-specific expertise, when to invoke, workflow]

## Deliverables

[What this agent produces]

## Examples

[Task-specific examples - variable content]
```

---

## Cache File Template

```markdown
# Marketing Context (Cached)

**Version:** 1.2.0
**Last Updated:** 2025-11-08
**Token Budget:** 2,500

## Brand Overview

[Stable brand information]

## Target Audiences

### Strategic Sarah
- Role: VP Marketing, B2B SaaS
- Pain points: ROI attribution, stakeholder alignment
- Goals: Prove marketing value, optimize spend

[Additional personas...]

## Marketing Frameworks

### Campaign Strategy
[Stable frameworks, not task-specific]

## Performance Benchmarks

| Channel | CTR | CVR | CPA |
|---------|-----|-----|-----|
| LinkedIn | 2.8% | 12% | $450 |
| Email | 3.5% | 8% | $320 |

[Additional benchmarks...]

---

**Usage:** Included in agents via `cacheFiles` in YAML frontmatter
**Update frequency:** Monthly or when brand/strategy changes
```

---

## Impact Metrics

**Current implementation:**
- **Coverage:** 78% (14/18 agents)
- **Cost reduction:** 26.5% average
- **Tokens saved:** 28.8K per session
- **Cache hit rate:** 85% (5-minute window)

**Per-agent impact:**
- Agents with 3 files (8K cached): 30% cost reduction
- Agents with 2 files (5K cached): 22% cost reduction
- Agents with 1 file (2K cached): 15% cost reduction

---

## Troubleshooting

**Cache not activating:**
- Verify `promptCaching: true` in YAML
- Check `cacheFiles` paths are correct
- Ensure CACHEABLE CONTEXT section exists
- Files must be in `.claude/knowledge/cache/`

**Low cache hit rate:**
- Content changing too frequently (move to variable section)
- Files too large (split into multiple files)
- Cache window expired (5 minutes)

**Cache breaking unexpectedly:**
- Variable content in CACHEABLE CONTEXT section
- File edits during session
- Incorrect ordering (variable before cacheable)

**High costs despite caching:**
- Agent <15K tokens (caching overhead > benefit)
- Cache files in wrong directory
- Missing YAML configuration

---

## Best Practices

**DO:**
- Cache stable content (brand, frameworks, benchmarks)
- Keep cache files 2-3K tokens each
- Use descriptive naming (`[domain]-context.md`)
- Put CACHEABLE CONTEXT section first
- Share cache files across agents

**DON'T:**
- Cache task-specific content
- Mix stable and variable content in cache files
- Create files >3K tokens (split instead)
- Update cache files mid-session
- Forget YAML configuration

---

## Migration Checklist

**Converting existing agent to use caching:**

- [ ] Agent >15K tokens? (If no, skip caching)
- [ ] Add YAML frontmatter with `promptCaching: true`
- [ ] Identify stable content (frameworks, brand, benchmarks)
- [ ] Create cache files in `.claude/knowledge/cache/`
- [ ] Add `cacheFiles` list to YAML
- [ ] Add OPTIMIZATION section after H1
- [ ] Add CACHEABLE CONTEXT section (first content)
- [ ] Reference cache files with `@` notation
- [ ] Move variable content after cacheable
- [ ] Test cache activation
- [ ] Monitor cost reduction

---

**See also:** CLAUDE.md Cost Optimization, `/cost-report` for tracking
**Impact:** Properly configured caching reduces agent costs by 20-30%
