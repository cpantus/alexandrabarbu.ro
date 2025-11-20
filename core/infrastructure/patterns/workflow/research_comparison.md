# Research Comparison Pattern

**Category**: Workflow
**Complexity**: Simple (Suggested)
**Purpose**: Specialized pattern for objective technology/approach comparison to inform decision-making

## When to Use

Use this pattern when comparing:
- Technologies or frameworks (PostgreSQL vs MongoDB)
- Approaches or patterns (REST vs GraphQL)
- Tools or libraries (Redux vs Zustand)
- Architectural styles (monolith vs microservices)

**Goal**: Make informed technology selection decisions based on objective comparison of pros/cons/use cases.

## Task Decomposition Override (v5.4.0)

**CRITICAL:** This pattern overrides Claude's default task decomposition behavior. YOU MUST follow the 3-phase sequence below. DO NOT create your own task breakdown.

### ❌ PROHIBITED SEQUENCE
1. ❌ Comparing technologies without individual research first
2. ❌ Presenting biased recommendations without objective analysis
3. ❌ Skipping use-case mapping or trade-off documentation
4. ❌ Declaring universal winners without context

**Consequences:** Biased technology selection, missing critical trade-offs, poor decision support → ARCHITECTURE VIOLATION

### ✅ MANDATORY 3-PHASE SEQUENCE

#### Phase 1: Query Formulation & Source Strategy
**Decision Point:** Establish comparison scope and research methodology

**YOU MUST:**
1. Identify the two technologies/approaches being compared
2. Research EACH technology independently (individual strengths, limitations, use cases)
3. Formulate specific comparison queries (direct comparison, use-case guidance, migration experiences)
4. Define objectivity requirements (no bias, document both pros and cons, multiple perspectives)

**Output Acknowledgment After Phase 1:**
```
✅ Phase 1 Complete - Comparison Research Strategy Defined
📋 Technologies: [Tech A] vs [Tech B]
📊 Research Phases: Individual (2x) → Direct Comparison → Community Perspective
🎯 Objectivity: Unbiased analysis with trade-offs documented
⏭️  Proceeding to Phase 2: Comparative Research Execution
```

#### Phase 2: Comparative Research Execution
**YOU MUST:**
1. Execute Phase 1: Individual technology research (Context7 + WebSearch for each)
2. Execute Phase 2: Direct comparison research (comparison articles, use-case guidance, migration stories)
3. Execute Phase 3: Community perspective (WebFetch top comparison sources, extract patterns)
4. Execute Phase 4: Decision framework synthesis (criteria, mapping, recommendations)
5. Cross-reference findings across all phases
6. Identify consensus and conflicts in recommendations

**Output Acknowledgment After Phase 2:**
```
✅ Phase 2 Complete - Comparative Research Finished
📊 Individual Research: [Tech A sources count], [Tech B sources count]
📄 Comparison Sources: [count] comparison articles reviewed
🎯 Patterns Identified: [consensus points], [conflict areas]
⏭️  Proceeding to Phase 3: Decision Framework & Report Generation
```

#### Phase 3: Decision Framework & Report Generation
**YOU MUST:**
1. Validate coverage (both technologies researched, 3+ comparison articles, benchmarks included)
2. Verify objectivity (no bias, pros/cons for BOTH, trade-offs explained, context provided)
3. Create comparison matrix (performance, scalability, complexity, ecosystem, etc.)
4. Map technologies to use cases (when to choose each)
5. Generate decision tree and recommendations
6. Document all sources with credibility ratings

**Output Acknowledgment After Phase 3:**
```
✅ Phase 3 Complete - Research Comparison Pattern Finished
📊 Comparison Matrix: [dimensions compared]
🎯 Use Cases Mapped: [count] scenarios analyzed
📄 Decision Framework: Complete with recommendations
✅ Pattern execution complete
```

## Language Standards (v5.4.0)

**Directive Language:** This pattern uses imperative commands.
- ✅ "YOU MUST", "DO NOT", "ALWAYS", "NEVER"
- ❌ "should", "consider", "might", "could", "try to"

**Rationale:** Weak language leads to inconsistent execution. Strong directives ensure reliable pattern application.

## Pattern Overview

This specialized pattern:
1. **Objective analysis** - No bias toward either option
2. **Multi-dimensional comparison** - Performance, scalability, complexity, ecosystem, etc.
3. **Use-case driven** - When to choose each option
4. **Trade-off clarity** - What you gain vs what you sacrifice
5. **Decision framework** - Clear criteria for selection

## Research Strategy

### Phase 1: Individual Technology Research (90-120 seconds)
```markdown
For EACH technology being compared:

1. **Context7 query**: "[Technology] use context7"
   - Official documentation
   - Core features
   - Intended use cases

2. **WebSearch**: "[Technology] use cases"
   - When it's recommended
   - What it's designed for
   - Success stories

3. **WebSearch**: "[Technology] limitations"
   - Known weaknesses
   - What it's NOT good for
   - Common complaints
```

**Example**:
```
# Technology A (PostgreSQL)
Context7: "PostgreSQL features use context7"
WebSearch: "PostgreSQL use cases and strengths"
WebSearch: "PostgreSQL limitations and weaknesses"

# Technology B (MongoDB)
Context7: "MongoDB features use context7"
WebSearch: "MongoDB use cases and strengths"
WebSearch: "MongoDB limitations and weaknesses"
```

### Phase 2: Direct Comparison (90-120 seconds)
```markdown
1. **WebSearch**: "[Tech A] vs [Tech B] comparison"
   - Find comparison articles
   - Look for objective analysis
   - Prefer recent comparisons (2024-2025)

2. **WebSearch**: "when to use [Tech A] vs [Tech B]"
   - Decision criteria
   - Use-case guidance
   - Trade-off analysis

3. **WebSearch**: "[Tech A] to [Tech B] migration"
   - What people switched from/to
   - Reasons for switching
   - Migration challenges
```

**Example**:
```
WebSearch "PostgreSQL vs MongoDB comparison 2025"
WebSearch "when to use PostgreSQL vs MongoDB"
WebSearch "MongoDB to PostgreSQL migration experiences"
```

### Phase 3: Community Perspective (60-90 seconds)
```markdown
1. **WebFetch** top 3-5 comparison articles:
   - Technical deep dives
   - Real-world benchmarks
   - Experience reports

2. **Extract** key points:
   - Performance comparisons
   - Complexity comparisons
   - Ecosystem comparisons
   - Cost comparisons

3. **Identify patterns**:
   - What do multiple sources agree on?
   - Where are the trade-offs?
   - What are dealbreakers for each?
```

### Phase 4: Decision Framework (30-60 seconds)
```markdown
1. **Synthesize** decision criteria:
   - Performance requirements
   - Scalability needs
   - Team expertise
   - Ecosystem needs
   - Operational complexity

2. **Map technologies to criteria**:
   - Which excels where?
   - Which compromises what?
   - What are the trade-offs?

3. **Formulate recommendation**:
   - When to choose A
   - When to choose B
   - Hybrid approaches (if applicable)
```

## Comparison Report Structure

```markdown
# Research Report: [Technology A] vs [Technology B]

**Date**: YYYY-MM-DD
**Query**: [Tech A] vs [Tech B] comparison
**Confidence**: High | Medium | Low

## Executive Summary
[2-3 sentences: High-level recommendation on when to choose each option, key trade-offs]

## Quick Decision Guide

**Choose [Technology A] if**:
- [Primary use case 1]
- [Primary use case 2]
- [Primary use case 3]

**Choose [Technology B] if**:
- [Primary use case 1]
- [Primary use case 2]
- [Primary use case 3]

**Consider hybrid** if:
- [When both might be needed]

## Overview

### [Technology A]
**Description**: [1-2 sentence overview]
**Primary Use Cases**: [What it's designed for]
**Key Strengths**: [Top 3 advantages]
**Key Weaknesses**: [Top 3 limitations]
**Maturity**: [Ecosystem, community, stability]

### [Technology B]
**Description**: [1-2 sentence overview]
**Primary Use Cases**: [What it's designed for]
**Key Strengths**: [Top 3 advantages]
**Key Weaknesses**: [Top 3 limitations]
**Maturity**: [Ecosystem, community, stability]

## Detailed Comparison Matrix

| Dimension | [Technology A] | [Technology B] | Winner |
|-----------|---------------|---------------|--------|
| **Performance** | [Details, benchmarks] | [Details, benchmarks] | [A/B/Tie] |
| **Scalability** | [Horizontal/vertical limits] | [Horizontal/vertical limits] | [A/B/Tie] |
| **Complexity** | [Learning curve, ops complexity] | [Learning curve, ops complexity] | [A/B/Tie] |
| **Ecosystem** | [Libraries, tools, integrations] | [Libraries, tools, integrations] | [A/B/Tie] |
| **Community** | [Size, activity, support] | [Size, activity, support] | [A/B/Tie] |
| **Documentation** | [Quality, completeness] | [Quality, completeness] | [A/B/Tie] |
| **Cost** | [Licensing, hosting, operations] | [Licensing, hosting, operations] | [A/B/Tie] |
| **Maturity** | [Stability, production-readiness] | [Stability, production-readiness] | [A/B/Tie] |
| **Developer Experience** | [Ergonomics, tooling] | [Ergonomics, tooling] | [A/B/Tie] |
| **Hiring** | [Talent availability] | [Talent availability] | [A/B/Tie] |

## Use Case Analysis

### Use Case 1: [Scenario]
**Requirements**: [What's needed]

- **[Technology A]**: [How it handles this, pros/cons]
- **[Technology B]**: [How it handles this, pros/cons]

**Recommendation**: [Which is better for this use case and why]

---

### Use Case 2: [Scenario]
[Repeat structure]

---

[Cover 3-5 common use cases]

## Pros & Cons

### [Technology A]

**Pros**:
- ✅ **[Advantage 1]** - [Why this matters] - [Source](url)
- ✅ **[Advantage 2]** - [Why this matters] - [Source](url)
- ✅ **[Advantage 3]** - [Why this matters] - [Source](url)
[Continue for all major advantages]

**Cons**:
- ❌ **[Limitation 1]** - [Impact] - [Workaround if any] - [Source](url)
- ❌ **[Limitation 2]** - [Impact] - [Workaround if any] - [Source](url)
- ❌ **[Limitation 3]** - [Impact] - [Workaround if any] - [Source](url)
[Continue for all major limitations]

### [Technology B]

**Pros**:
[Same structure]

**Cons**:
[Same structure]

## Trade-Offs

### Choosing [Technology A]
**You Gain**:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

**You Sacrifice**:
- [Cost 1]
- [Cost 2]
- [Cost 3]

### Choosing [Technology B]
**You Gain**:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

**You Sacrifice**:
- [Cost 1]
- [Cost 2]
- [Cost 3]

## Decision Criteria

### Performance-Critical Applications
**Recommendation**: [Which to choose]
**Reasoning**: [Why, based on benchmarks and characteristics]

### Rapid Development / Prototyping
**Recommendation**: [Which to choose]
**Reasoning**: [Which has faster development cycle]

### Large-Scale Production
**Recommendation**: [Which to choose]
**Reasoning**: [Scalability, reliability, operational maturity]

### Small Team / Limited Resources
**Recommendation**: [Which to choose]
**Reasoning**: [Operational complexity, learning curve, support needs]

### Enterprise / Regulated Environment
**Recommendation**: [Which to choose]
**Reasoning**: [Compliance, support, stability, maturity]

## Real-World Examples

### Companies Using [Technology A]
- **[Company]**: [How they use it, scale, results]
- **[Company]**: [How they use it, scale, results]
**Source**: [URLs]

### Companies Using [Technology B]
- **[Company]**: [How they use it, scale, results]
- **[Company]**: [How they use it, scale, results]
**Source**: [URLs]

### Migration Stories

#### [Company] migrated from [A] to [B]
**Reason**: [Why they switched]
**Results**: [Outcomes, improvements]
**Challenges**: [What was difficult]
**Source**: [URL]

---

[Include 2-3 migration examples if found]

## Performance Benchmarks

### [Benchmark 1: Scenario]
- **[Tech A]**: [Results, metrics]
- **[Tech B]**: [Results, metrics]
- **Winner**: [Which performed better]
- **Source**: [URL to benchmark]

---

[Include 2-3 benchmarks if available]

## Ecosystem Comparison

### [Technology A] Ecosystem
**Popular Libraries**:
- [Library 1] - [Purpose]
- [Library 2] - [Purpose]

**Tooling**:
- [Tool 1] - [Purpose]
- [Tool 2] - [Purpose]

**Integrations**:
- [Platform 1]
- [Platform 2]

### [Technology B] Ecosystem
[Same structure]

## Learning Curve & Developer Experience

### [Technology A]
**Learning Curve**: Easy | Medium | Steep
**Time to Productivity**: [Estimate]
**Documentation Quality**: Excellent | Good | Fair | Poor
**Community Support**: Strong | Moderate | Limited

**Developer Feedback**:
- [Common praise]
- [Common complaints]
**Source**: [URLs]

### [Technology B]
[Same structure]

## Operational Considerations

### [Technology A]
**Deployment**: [Complexity, options]
**Monitoring**: [Tools, ease]
**Scaling**: [Horizontal, vertical, difficulty]
**Maintenance**: [Effort required]
**Debugging**: [Tools, difficulty]

### [Technology B]
[Same structure]

## Cost Analysis

### [Technology A]
**Licensing**: [Open source, commercial, costs]
**Infrastructure**: [Hosting requirements, costs]
**Operations**: [Team size, expertise needed]
**Total Cost of Ownership**: [Estimate if available]

### [Technology B]
[Same structure]

## Migration Path

### From [A] to [B]
**Difficulty**: Easy | Medium | Hard
**Time Estimate**: [Range]
**Key Challenges**: [What's difficult]
**Tools Available**: [Migration tools]
**Recommended Approach**: [Strategy]

### From [B] to [A]
[Same structure]

## Hybrid Approaches

**Using Both Together**:
- [Scenario where hybrid makes sense]
- [How to architect]
- [Trade-offs of hybrid approach]
**Examples**: [Companies doing this]

## Final Recommendation

### General Guidance
[2-3 paragraphs synthesizing the research into clear guidance]

### Decision Tree
```
Start here:
  ├─ Need [specific feature X]? → Choose [Tech A]
  ├─ Need [specific feature Y]? → Choose [Tech B]
  ├─ Team already knows [Tech A]? → Stick with [Tech A]
  ├─ Performance-critical? → [Benchmark-based recommendation]
  └─ Default recommendation: [Which for general case]
```

## Sources

### Comparison Articles
- [Article](url) - [Author/Publication] - [Date] - [Credibility: High/Medium]

### Official Documentation
- [[Tech A] Docs](url)
- [[Tech B] Docs](url)

### Benchmarks & Performance
- [Benchmark](url) - [Source] - [Date]

### Experience Reports
- [Report](url) - [Company/Author] - [Date]

### Community Discussions
- [Discussion](url) - [Platform] - [Date]

## Research Metadata
- **Searches Performed**: N web searches
- **Pages Fetched**: N WebFetch operations
- **Context7 Queries**: N documentation lookups
- **Total Sources**: N sources consulted
- **Technologies Compared**: [Tech A] vs [Tech B]
- **Confidence Level**: High | Medium | Low
- **Research Duration**: X.X minutes
- **Date Generated**: YYYY-MM-DD HH:MM
```

## Quality Gates (Comparison-Specific)

### Coverage Requirements
- [ ] **Both technologies researched** independently
- [ ] **Official documentation** consulted for both
- [ ] **3+ comparison articles** reviewed
- [ ] **Real-world examples** included for both
- [ ] **Benchmarks** included (if available)
- [ ] **Use case analysis** covers 3+ scenarios

### Objectivity Requirements
- [ ] **No bias** toward either option (unless data supports it)
- [ ] **Pros and cons** documented for BOTH options
- [ ] **Trade-offs** clearly explained
- [ ] **Context provided** (no universal "winner", depends on use case)
- [ ] **Multiple perspectives** included (not just one article's opinion)

### Decision Support Requirements
- [ ] **Decision criteria** clearly defined
- [ ] **Use case mapping** (which technology for which scenario)
- [ ] **Quick decision guide** at top (for fast scanning)
- [ ] **Recommendation** with clear rationale
- [ ] **Migration path** documented (if relevant)

## Search Query Optimization

### Effective Query Progression
```bash
# Phase 1: Individual research
"[Technology A] use cases and strengths"
"[Technology A] limitations and weaknesses"
"[Technology B] use cases and strengths"
"[Technology B] limitations and weaknesses"

# Phase 2: Direct comparison
"[Tech A] vs [Tech B] comparison 2025"
"when to use [Tech A] vs [Tech B]"
"[Tech A] vs [Tech B] performance"
"[Tech A] vs [Tech B] scalability"

# Phase 3: Migration & experiences
"[Tech A] to [Tech B] migration"
"why choose [Tech A] over [Tech B]"
"[Company] switched from [Tech A] to [Tech B]"

# Phase 4: Benchmarks & data
"[Tech A] vs [Tech B] benchmark"
"[Tech A] vs [Tech B] real-world performance"
```

## Common Pitfalls (Pattern Usage)

### DON'T:
- ❌ **Favor one option** without data to support it
- ❌ **Present universal winner** (it's always context-dependent)
- ❌ **Rely on single comparison** article
- ❌ **Ignore use cases** (both are usually good for different things)
- ❌ **Skip official docs** (understand what each is designed for)
- ❌ **Omit trade-offs** (every choice sacrifices something)
- ❌ **Forget real-world examples** (theory vs practice can differ)

### DO:
- ✅ **Research both** technologies independently first
- ✅ **Multiple comparison** sources for validation
- ✅ **Map to use cases** (when to choose each)
- ✅ **Include trade-offs** (what you gain vs sacrifice)
- ✅ **Consult official docs** (understand intended use)
- ✅ **Find real examples** (who's using what, and how)
- ✅ **Benchmark data** (objective performance when available)

## Integration Examples

### Example 1: Technology Selection
```bash
# Team deciding between state management options
/research "Redux vs Zustand state management"

# Review comparison report
cat research/redux-vs-zustand-state-management.md

# Make informed decision based on:
# - Team size (small → Zustand, large → Redux)
# - Complexity (simple app → Zustand, complex → Redux)
# - Learning curve (junior team → Zustand)
```

### Example 2: Migration Decision
```bash
# Considering migrating databases
/research "PostgreSQL vs MongoDB"

# Evaluate current use case against comparison
# Decision matrix shows: Our use case → PostgreSQL
# Migration path documented
# Make go/no-go decision
```

### Example 3: Architecture Planning
```bash
# Designing new system
/research "monolith vs microservices architecture"

# Use decision tree from report:
# Team size: Small (5 people) → Monolith
# Complexity: Medium → Monolith with modular design
# Recommendation: Start monolith, extract services later if needed
```

## Success Criteria

A successful technology comparison report:
1. **Objective** - No bias unless data strongly supports one option
2. **Comprehensive** - Both technologies thoroughly researched
3. **Use-case driven** - Maps technologies to appropriate scenarios
4. **Decision-enabling** - User can make informed choice after reading
5. **Trade-offs clear** - What you gain vs sacrifice is explicit
6. **Real-world grounded** - Includes examples and benchmarks
7. **Contextual** - No universal winner, depends on situation
8. **Actionable** - Quick decision guide + detailed analysis

---

**Related Patterns:**
- `research_query` - General research pattern (foundation)
- `research_best_practices` - Best practices research
- `architecture_decision` - Documenting technology decisions

**See Also:**
- `/research` command
- `research-scout` agent
- Technology decision documentation in dev docs
