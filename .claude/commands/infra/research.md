# Research Command

Gather external knowledge (best practices, documentation, patterns) for informed planning and implementation decisions.

## Usage

```bash
/research "topic"
/research "React Server Components best practices"
/research "microservices vs monolith" --depth=comprehensive
/research "Redis caching patterns" --depth=quick
/research "OAuth 2.0 implementation" --save-to=dev/active/oauth-task/
```

## Arguments

### Topic (Required)
The research query/topic to investigate. Be specific for better results.

**Examples**:
- `"React Hook best practices"` - Best practices research
- `"microservices vs monolith"` - Technology comparison
- `"Next.js App Router migration"` - Implementation guidance
- `"Redis caching patterns"` - Architecture patterns
- `"GraphQL common mistakes"` - Pitfall identification

## Flags

### --depth
Research depth and thoroughness.

**Options**:
- `quick`: 2-3 sources, <2 minutes, lower cost (~$0.01-0.02)
  - Good for: Simple questions, quick reference, validation
- `comprehensive` (default): 5-10 sources, 3-5 minutes, higher quality (~$0.03-0.05)
  - Good for: Planning decisions, unfamiliar tech, critical choices

**Examples**:
```bash
/research "React Hook syntax" --depth=quick
/research "System architecture patterns" --depth=comprehensive
```

### --save-to
Custom save location for research report.

**Default**: `research/[sanitized-topic].md`

**Examples**:
```bash
/research "OAuth best practices" --save-to=dev/active/auth-migration/
/research "TypeScript patterns" --save-to=research/typescript/
```

## What You Get

### Research Report Structure
1. **Executive Summary**: 2-3 sentence key findings
2. **Key Findings**: 5-7 insights with authoritative sources
3. **Best Practices**: Prioritized recommendations with rationale
4. **Documentation References**: Official docs + authoritative guides
5. **Recommendations**: Actionable guidance based on research
6. **Warnings & Pitfalls**: Common mistakes to avoid
7. **Technology Comparison**: (if comparing options) Pros/cons/use cases
8. **Sources**: All URLs with credibility ratings
9. **Metadata**: Searches performed, confidence level, duration

### Output Location
- **File**: `research/[topic].md` (or custom via --save-to)
- **Display**: Summary + key recommendations + link to full report
- **Index**: Entry added to `research/index.json` (if exists)

## Research Capabilities

### 1. Documentation Lookup
Finds and summarizes official documentation using Context7 MCP and WebFetch.

**Example**:
```bash
/research "Next.js App Router documentation"
→ Context7: Latest Next.js App Router docs
→ WebFetch: Official migration guides
→ Output: Comprehensive doc summary with key API references
```

### 2. Best Practices
Discovers current best practices from authoritative sources (2024-2025).

**Example**:
```bash
/research "React Hook best practices"
→ WebSearch: "React Hook best practices 2025"
→ WebFetch: Top 3-5 authoritative articles
→ Output: Consensus recommendations from multiple experts
```

### 3. Technology Comparison
Compares technologies objectively with pros/cons/use cases.

**Example**:
```bash
/research "PostgreSQL vs MongoDB"
→ WebSearch: Both technologies + comparisons
→ Synthesis: Performance, scalability, use cases, trade-offs
→ Output: Decision matrix with clear recommendations
```

### 4. Architecture Patterns
Finds proven architecture patterns with implementation examples.

**Example**:
```bash
/research "microservices communication patterns"
→ WebSearch: Event-driven, REST, gRPC, message queues
→ WebFetch: Real implementation examples
→ Output: Pattern catalog with use cases and trade-offs
```

### 5. Pitfall Identification
Discovers common mistakes, anti-patterns, and gotchas.

**Example**:
```bash
/research "React common mistakes"
→ WebSearch: Common mistakes, anti-patterns, gotchas
→ Community wisdom: Stack Overflow, GitHub issues
→ Output: What to avoid with clear explanations
```

## Integration with Workflows

### Pre-Planning Research
Research before planning to gather context:

```bash
# 1. Research first
/research "React Server Components best practices"

# 2. Review findings
cat research/react-server-components-best-practices.md

# 3. Plan with research context
/workflow scout-plan-build "migrate to server components"
→ Plan workflow auto-loads research report
→ Informed planning decisions
```

### Parallel Research (Faster)
Integrate research with scout/plan/build workflow:

```bash
/workflow scout-plan-build "add caching layer" --with-research
→ Research Scout: Caching best practices (external)
→ Code Scout: Existing cache patterns (codebase)
→ Runs in parallel (no added time)
→ Plan: Synthesizes both sources
```

### Gap-Driven Research
Let planning workflow detect knowledge gaps:

```bash
/workflow scout-plan-build "implement Redis"
→ Scout: No Redis code found
→ Plan: "No patterns found. Research Redis caching? [y/n]"
→ You: y
→ Research Scout: Comprehensive Redis research
→ Plan: Continues with research context
```

## Cost & Performance

### Comprehensive (Default)
- **Sources**: 5-10 credible sources
- **Duration**: 3-5 minutes
- **Cost**: $0.03-0.05 per query
- **Cached**: $0.01-0.02 (70% reduction for repeat queries)
- **Use for**: Planning decisions, unfamiliar tech, critical choices

### Quick
- **Sources**: 2-3 sources
- **Duration**: <2 minutes
- **Cost**: $0.01-0.02 per query
- **Use for**: Simple questions, syntax lookup, quick validation

### Caching
Research reports are **persistent** and **reusable**:

```bash
# First time (comprehensive research)
/research "TypeScript best practices"  # $0.04, 4 minutes

# Later (reuse existing research)
cat research/typescript-best-practices.md  # Free, instant

# Re-research if needed (gets new report with date suffix)
/research "TypeScript best practices"  # $0.04, creates typescript-best-practices-2025-01-15.md
```

## Research Library

### Directory Structure
```
research/
├── index.json (optional index)
├── react-hooks-best-practices.md
├── redis-caching-patterns.md
├── postgresql-vs-mongodb.md
├── microservices-architecture-patterns.md
└── typescript-strict-mode.md
```

### Search Existing Research
```bash
# List all research
ls research/

# Search by keyword
grep -l "caching" research/*.md

# View specific research
cat research/redis-caching-patterns.md
```

### Multi-Session Tasks
For long-running tasks, research is copied to dev docs:

```bash
/create-dev-docs oauth-migration
/research "OAuth 2.0 best practices"
# Research automatically copied to: dev/active/oauth-migration/CONTEXT.md

/workflow scout-plan-build "migrate to OAuth" --task-name oauth-migration
# Task has access to research across sessions
```

## Examples

### Technology Research
```bash
/research "React Server Components"
/research "Next.js App Router features"
/research "TypeScript 5.0 new features"
```

### Best Practices
```bash
/research "React Hook best practices"
/research "REST API design best practices"
/research "Error handling patterns in Node.js"
```

### Architecture & Patterns
```bash
/research "microservices architecture patterns"
/research "CQRS implementation examples"
/research "event-driven architecture best practices"
```

### Technology Comparison
```bash
/research "PostgreSQL vs MongoDB"
/research "Redux vs Zustand state management"
/research "REST vs GraphQL API design"
/research "Docker vs Podman"
```

### Implementation Guidance
```bash
/research "OAuth 2.0 implementation guide"
/research "WebSocket server setup"
/research "Redis cache implementation"
```

### Pitfall Identification
```bash
/research "React common mistakes"
/research "TypeScript pitfalls to avoid"
/research "Microservices anti-patterns"
```

## Quality Standards

Every research report includes:
- ✅ **3+ credible sources** (minimum)
- ✅ **Current content**: Prefers 2024-2025 for fast-moving tech
- ✅ **Authoritative**: Official docs, framework authors, established experts
- ✅ **Actionable**: Clear recommendations with rationale
- ✅ **Validated**: Cross-referenced across sources
- ✅ **Complete**: Warnings about pitfalls and anti-patterns
- ✅ **Cited**: All sources with URLs and credibility ratings

### Confidence Levels
- **High**: 5+ authoritative sources, strong consensus, recent content
- **Medium**: 3-4 sources, general agreement, some recent content
- **Low**: 2-3 sources, conflicts, older content, niche topic

## When to Use Research

### ✅ DO Use Research For:
- Unfamiliar technologies or frameworks
- Technology selection decisions
- Planning complex features
- Architecture pattern discovery
- Best practices validation
- Avoiding known pitfalls
- Learning new concepts

### ❌ DON'T Need Research For:
- Well-known syntax you use daily
- Codebase-specific patterns (use `/workflow scout` instead)
- Simple implementation details you know
- Quick fixes or bug fixes
- Internal team conventions

## Best Practices

### 1. Be Specific
```bash
# Good: Specific, actionable topic
/research "React Server Components data fetching patterns"

# Avoid: Too broad
/research "React"  # Way too broad, hundreds of topics
```

### 2. Research Before Planning
```bash
# Good: Research first, then plan
/research "Next.js App Router migration"
/workflow scout-plan-build "migrate to App Router"

# Avoid: Plan without research (may miss best practices)
/workflow scout-plan-build "migrate to App Router"
```

### 3. Leverage Research Library
```bash
# Check existing research first
ls research/ | grep "react"

# Reuse if exists
cat research/react-hooks-best-practices.md

# Only research if needed
/research "React Hook advanced patterns"
```

### 4. Choose Right Depth
```bash
# Quick for simple questions
/research "React Hook syntax" --depth=quick

# Comprehensive for important decisions
/research "State management architecture" --depth=comprehensive
```

### 5. Integrate with Dev Docs
```bash
# Long tasks: Link research to dev docs
/create-dev-docs feature-name
/research "relevant topic" --save-to=dev/active/feature-name/
```

## Implementation

This command spawns the **research-scout** agent with the specified parameters:

```
Task Tool → research-scout agent
  ↓
Research Scout:
  1. Parse topic and flags
  2. Plan search strategy
  3. Query Context7 for docs
  4. WebSearch for articles (5-10 or 2-3 based on depth)
  5. WebFetch top results (3-5 or 1-2 based on depth)
  6. Synthesize findings
  7. Generate structured report
  8. Save to research/[topic].md
  9. Return summary + link
```

**Agent**: `core/infrastructure/agents/research-scout.md`
**Model**: Haiku (cost-efficient)
**Caching**: Aggressive (research is highly reusable)

## Troubleshooting

### "Few sources found"
- Topic may be too niche or new
- Try broader query or related topics
- Report will note limited sources and lower confidence

### "Research taking too long"
- Comprehensive mode targets 3-5 minutes
- Hard limit at 5 minutes (will save partial results)
- Use `--depth=quick` for faster results

### "Conflicting recommendations"
- Research report documents all perspectives
- Explains conflicts and why they exist
- Provides recommendation based on context

### "Outdated content"
- Report flags content older than 2023
- Explains why older source was used (if necessary)
- Recommends areas for further research

## See Also

- **Agent Documentation**: `core/infrastructure/agents/README.md`
- **Research Scout Agent**: `core/infrastructure/agents/research-scout.md`
- **Workflow Integration**: `core/docs/workflow-system.md`
- **Pattern System**: Research patterns for specialized queries

---

**Pro Tip**: Build a research library over time. Common queries get cached and reused, saving time and cost. Use `/research` liberally when exploring unfamiliar tech!
