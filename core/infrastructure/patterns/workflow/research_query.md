# Research Query Pattern

**Category**: Workflow
**Complexity**: Simple (Suggested)
**Purpose**: Guide effective research queries and validate research report quality

## When to Use

Use this pattern when:
- Conducting comprehensive research for planning
- Need quality gates for research outputs
- Want to validate research report completeness
- Structuring research queries for best results

## Task Decomposition Override (v5.4.0)

**CRITICAL:** This pattern overrides Claude's default task decomposition behavior. YOU MUST follow the 3-phase sequence below. DO NOT create your own task breakdown.

### ❌ PROHIBITED SEQUENCE
1. ❌ Jumping directly to searches without query formulation
2. ❌ Skipping source validation or credibility assessment
3. ❌ Generating outputs without quality gate validation
4. ❌ Single-source research without cross-referencing

**Consequences:** Poor research quality, unreliable recommendations, missing critical insights → ARCHITECTURE VIOLATION

### ✅ MANDATORY 3-PHASE SEQUENCE

#### Phase 1: Query Formulation & Source Strategy
**Decision Point:** Determine optimal query structure and research strategy

**YOU MUST:**
1. Analyze the research topic and classify the query type (best practices, comparison, patterns, pitfalls, implementation)
2. Formulate specific, context-rich queries following the query templates
3. Select the appropriate research strategy (Documentation-First, Best Practices Discovery, Technology Comparison, Pattern Discovery, or Pitfall Identification)
4. Define source quality requirements (minimum credibility thresholds, recency requirements)

**Output Acknowledgment After Phase 1:**
```
✅ Phase 1 Complete - Research Query Formulated
📋 Query Type: [best practices/comparison/patterns/etc.]
📊 Strategy: [selected research strategy]
🎯 Source Requirements: [min sources, credibility, recency]
⏭️  Proceeding to Phase 2: Research Execution
```

#### Phase 2: Research Execution & Source Collection
**YOU MUST:**
1. Execute the research strategy using the formulated queries
2. Use Context7 for official documentation (when available)
3. Perform WebSearch for community consensus and expert sources
4. WebFetch top 3-5 authoritative sources
5. Cross-reference findings across multiple sources
6. Document all sources with credibility ratings

**Output Acknowledgment After Phase 2:**
```
✅ Phase 2 Complete - Research Execution Finished
📊 Searches Performed: [count]
📄 Pages Fetched: [count]
🎯 Sources Collected: [count with credibility breakdown]
⏭️  Proceeding to Phase 3: Quality Validation & Report Generation
```

#### Phase 3: Quality Validation & Report Generation
**YOU MUST:**
1. Validate research against all quality gates (minimum requirements checklist)
2. Verify source quality (3+ credible sources, at least 1 high-credibility)
3. Confirm content completeness (executive summary, key findings, best practices, recommendations)
4. Check consensus validation (claims cross-referenced)
5. Generate research report following the standard template
6. Assign confidence level (High/Medium/Low) with justification

**Output Acknowledgment After Phase 3:**
```
✅ Phase 3 Complete - Research Query Pattern Finished
📊 Quality Gates: [passed count]/[total count] passed
🎯 Confidence Level: [High/Medium/Low]
📄 Report Generated: research/[topic].md
✅ Pattern execution complete
```

## Language Standards (v5.4.0)

**Directive Language:** This pattern uses imperative commands.
- ✅ "YOU MUST", "DO NOT", "ALWAYS", "NEVER"
- ❌ "should", "consider", "might", "could", "try to"

**Rationale:** Weak language leads to inconsistent execution. Strong directives ensure reliable pattern application.

## Pattern Overview

This pattern provides:
1. **Query formulation guidelines** - How to phrase effective research queries
2. **Research strategy templates** - Structured approaches for different research types
3. **Quality gates** - Validation checklist for research reports
4. **Output templates** - Standard report structure

## Query Formulation

### Effective Research Queries

**DO**:
- ✅ Be specific: "React Server Components data fetching" not "React"
- ✅ Include context: "OAuth 2.0 implementation guide" not just "OAuth"
- ✅ Specify type: "best practices", "comparison", "patterns", "pitfalls"
- ✅ Include year for fast-moving tech: "TypeScript best practices 2025"

**DON'T**:
- ❌ Too broad: "JavaScript", "databases", "frontend"
- ❌ Too narrow: "useState with number type" (documentation lookup, not research)
- ❌ Vague: "good ways to do X" (what kind of ways? best practices? patterns?)

### Query Templates

#### Best Practices Query
```
"[Technology/Topic] best practices [year]"

Examples:
- "React Hook best practices 2025"
- "REST API design best practices"
- "Error handling best practices Node.js"
```

#### Technology Comparison Query
```
"[Technology A] vs [Technology B] [aspect]"

Examples:
- "PostgreSQL vs MongoDB comparison"
- "Redux vs Zustand state management"
- "REST vs GraphQL API design"
```

#### Architecture Pattern Query
```
"[Domain] architecture patterns"
"[Pattern name] implementation examples"

Examples:
- "Microservices communication patterns"
- "CQRS implementation examples"
- "Event-driven architecture patterns"
```

#### Pitfall Query
```
"[Technology] common mistakes"
"[Technology] anti-patterns"
"[Technology] pitfalls to avoid"

Examples:
- "React common mistakes"
- "TypeScript pitfalls to avoid"
- "Microservices anti-patterns"
```

#### Implementation Guide Query
```
"[Technology/Feature] implementation guide"
"How to implement [feature] with [technology]"

Examples:
- "OAuth 2.0 implementation guide"
- "WebSocket server implementation"
- "Redis cache implementation Node.js"
```

## Research Strategies

### Strategy 1: Documentation-First
**Use when**: Researching official APIs, framework features, configuration

```markdown
1. Context7 query for official documentation
2. WebFetch official docs for details
3. WebSearch for practical examples and guides
4. WebFetch 2-3 authoritative tutorial/guides
5. Synthesize: Official API + practical usage
```

### Strategy 2: Best Practices Discovery
**Use when**: Finding current recommendations, community consensus

```markdown
1. WebSearch "[topic] best practices 2025"
2. WebSearch "[topic] recommended patterns"
3. WebFetch top 3-5 authoritative sources
4. Cross-reference recommendations
5. Identify consensus + note conflicts
6. Synthesize: Agreed-upon best practices + rationale
```

### Strategy 3: Technology Comparison
**Use when**: Choosing between alternatives, evaluating options

```markdown
1. WebSearch "[Tech A] vs [Tech B] comparison"
2. WebSearch "when to use [Tech A]"
3. WebSearch "when to use [Tech B]"
4. WebFetch comparison articles (2-3)
5. WebFetch official docs for both (Context7 if available)
6. Synthesize: Pros/Cons, Use Cases, Trade-offs, Recommendation
```

### Strategy 4: Pattern Discovery
**Use when**: Finding proven solutions, architecture patterns

```markdown
1. WebSearch "[domain] architecture patterns"
2. WebSearch "[pattern name] implementation"
3. WebFetch 2-3 articles with real examples
4. Extract: Pattern descriptions, use cases, trade-offs, examples
5. Synthesize: Pattern catalog with implementation guidance
```

### Strategy 5: Pitfall Identification
**Use when**: Avoiding mistakes, understanding gotchas

```markdown
1. WebSearch "[technology] common mistakes"
2. WebSearch "[technology] anti-patterns"
3. WebSearch "[technology] gotchas"
4. WebFetch Stack Overflow, GitHub issues, blog posts
5. Extract: What to avoid, why it's problematic, better alternatives
6. Synthesize: Warning list with explanations
```

## Quality Gates

### Minimum Requirements

Before accepting a research report, validate:

#### Source Quality
- [ ] **3+ credible sources minimum**
- [ ] **At least 1 high-credibility source** (official docs, framework authors)
- [ ] **Diverse sources** (not all from one blog/author)
- [ ] **Recent content** (2024-2025 for fast-moving tech, or flagged if older)

#### Content Completeness
- [ ] **Executive summary** (2-3 sentences, key findings clear)
- [ ] **Key findings** (5+ insights with sources)
- [ ] **Best practices** (at least 3, with rationale)
- [ ] **Recommendations** (actionable, specific guidance)
- [ ] **Warnings** (if applicable, pitfalls noted)
- [ ] **Sources** (all URLs included with credibility ratings)

#### Research Metadata
- [ ] **Searches performed** (documented count)
- [ ] **Pages fetched** (documented count)
- [ ] **Confidence level** (High/Medium/Low with justification)
- [ ] **Duration** (research time documented)
- [ ] **Date** (when research was conducted)

#### Quality Standards
- [ ] **Consensus validated** (claims cross-referenced across sources)
- [ ] **Conflicts noted** (if sources disagree, explained)
- [ ] **Actionable** (user knows what to do after reading)
- [ ] **No speculation** (recommendations based on research, not guesses)

### Confidence Levels

#### High Confidence
- 5+ authoritative sources
- Strong consensus on recommendations
- Recent content (2024-2025)
- Official documentation included
- Multiple expert sources agree

#### Medium Confidence
- 3-4 good sources
- General agreement (some minor conflicts)
- Mix of recent and older content
- Some authoritative sources
- Community consensus visible

#### Low Confidence
- 2-3 sources only
- Significant conflicts between sources
- Mostly older content (pre-2023)
- Niche topic with limited sources
- Community divided or silent

## Output Template

### Standard Research Report Structure

```markdown
# Research Report: [Topic]

**Date**: YYYY-MM-DD
**Query**: [Original research query]
**Confidence**: High | Medium | Low

## Executive Summary
[2-3 sentences: What are the most important findings? What should user know?]

## Key Findings
1. **[Finding]** - [Explanation] ([Source](url) - [Credibility: High/Medium])
2. **[Finding]** - [Explanation] ([Source](url) - [Credibility: High/Medium])
3. **[Finding]** - [Explanation] ([Source](url) - [Credibility: High/Medium])
[5-7 total findings]

## Best Practices
- **[Practice]** - [Why it matters] - [Benefit] - [Source](url)
- **[Practice]** - [Why it matters] - [Benefit] - [Source](url)
[At least 3 practices]

## Documentation References
- [Official Docs: Title](url) - [Key info summary]
- [Authoritative Guide: Title](url) - [Key info summary]
[All major documentation sources]

## Recommendations
Based on this research, I recommend:

1. **[Recommendation]** - [Rationale from research]
2. **[Recommendation]** - [Rationale from research]
[Actionable, specific guidance]

## Warnings & Pitfalls
- **[Warning]** - [What to avoid] - [Why] - [Consequence]
- **[Anti-pattern]** - [What not to do] - [Better alternative]
[Critical mistakes to avoid]

## Sources

### High Credibility
- [Source](url) - [Author/Publication] - [Date] - [Why credible]

### Medium Credibility
- [Source](url) - [Author/Publication] - [Date]

## Research Metadata
- **Searches Performed**: N web searches
- **Pages Fetched**: N WebFetch operations
- **Context7 Queries**: N documentation lookups
- **Total Sources**: N sources consulted
- **Confidence Level**: High | Medium | Low
- **Research Duration**: X.X minutes
- **Date Generated**: YYYY-MM-DD HH:MM
```

## Validation Checklist

Before finalizing research, verify:

### Query Quality
- [ ] Query is specific enough (not too broad)
- [ ] Query type is clear (best practices, comparison, patterns, etc.)
- [ ] Search strategy matches query type
- [ ] Time allocated appropriately (simple vs complex)

### Source Quality
- [ ] Minimum 3 credible sources
- [ ] Sources are diverse (multiple perspectives)
- [ ] Sources are recent (or older sources are flagged)
- [ ] Credibility ratings are accurate
- [ ] Official docs included (when available)

### Content Quality
- [ ] Executive summary is clear and concise
- [ ] Key findings are actionable insights (not just facts)
- [ ] Best practices have rationale (not just "do this")
- [ ] Recommendations are specific (not vague)
- [ ] Warnings prevent real mistakes
- [ ] No speculation or guessing

### Report Quality
- [ ] Structure follows template
- [ ] All sections are complete
- [ ] Sources are properly cited
- [ ] Metadata is accurate
- [ ] Confidence level is justified
- [ ] User knows what to do after reading

## Anti-Patterns

### DON'T:
- ❌ **Single-source research** - Always cross-reference multiple sources
- ❌ **Outdated content** - Flag anything pre-2023 for fast-moving tech
- ❌ **Vague recommendations** - "Consider using X" is not actionable
- ❌ **Missing rationale** - Always explain WHY a practice is recommended
- ❌ **Ignoring conflicts** - If sources disagree, document and explain
- ❌ **Speculation** - Only recommend based on research findings
- ❌ **Missing warnings** - Always include pitfalls section if applicable
- ❌ **Poor credibility rating** - Accurately rate source quality

## Examples

### Good Query Example
```
Query: "React Server Components data fetching patterns"

Strategy:
1. Context7: "React Server Components API use context7"
2. WebSearch: "React Server Components data fetching best practices 2025"
3. WebSearch: "React Server Components patterns"
4. WebFetch: Top 3 authoritative articles
5. Synthesize with examples

Result: Comprehensive guide with official API docs, community patterns,
real examples, and warnings about common mistakes.
```

### Poor Query Example (Fixed)
```
Query: "React" (too broad)

Fix: "React Hook best practices 2025" (specific, actionable)

---

Query: "How to use databases" (too vague)

Fix: "PostgreSQL vs MongoDB for e-commerce application" (specific comparison)

---

Query: "useState" (too narrow, just documentation lookup)

Fix: "React state management patterns for large applications" (research-worthy)
```

## Integration with Workflows

### Standalone Research
```bash
/research "topic"
→ Uses this pattern for query structure
→ Validates output against quality gates
→ Saves to research/topic.md
```

### In Scout/Plan/Build
```bash
/workflow scout-plan-build "task" --with-research
→ Research phase uses this pattern
→ Plan phase loads validated research
→ Build references research findings
```

### Pattern Chaining
```bash
/pattern research_best_practices "React Hooks"
→ Loads research_query pattern as foundation
→ Adds best-practices-specific guidance
→ Executes research with specialized strategy
```

## Success Criteria

A successful research query produces a report that:
1. **Answers the question** - User gets what they needed
2. **Enables decisions** - User knows what to do
3. **Prevents mistakes** - Warnings included
4. **Cites sources** - All claims backed by URLs
5. **Builds confidence** - Quality and consensus documented
6. **Saves time** - Faster than manual research
7. **Reusable** - Can be referenced later

---

**Related Patterns:**
- `research_best_practices` - Specialized best practices research
- `research_comparison` - Technology comparison template
- `scout_workflow` - Codebase discovery (complements external research)
- `plan_workflow` - Uses research reports for planning

**See Also:**
- `/research` command documentation
- `research-scout` agent specification
- Workflow integration guide
