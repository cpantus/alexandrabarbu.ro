# Research Best Practices Pattern

**Category**: Workflow
**Complexity**: Simple (Suggested)
**Purpose**: Specialized pattern for discovering current best practices from authoritative sources

## When to Use

Use this pattern when researching:
- Current best practices for technologies or frameworks
- Recommended approaches for common tasks
- Community consensus on how to use tools
- Up-to-date guidance (2024-2025)

**Examples**:
- "React Hook best practices"
- "REST API design best practices"
- "TypeScript strict mode best practices"
- "Error handling best practices in Node.js"

## Task Decomposition Override (v5.4.0)

**CRITICAL:** This pattern overrides Claude's default task decomposition behavior. YOU MUST follow the 3-phase sequence below. DO NOT create your own task breakdown.

### ❌ PROHIBITED SEQUENCE
1. ❌ Skipping official documentation as the primary source
2. ❌ Accepting single-source practices without cross-referencing
3. ❌ Including practices without rationale or examples
4. ❌ Missing anti-patterns or context-specific guidance

**Consequences:** Outdated practices, unreliable recommendations, missing critical context → ARCHITECTURE VIOLATION

### ✅ MANDATORY 3-PHASE SEQUENCE

#### Phase 1: Query Formulation & Source Strategy
**Decision Point:** Establish best practices research methodology

**YOU MUST:**
1. Identify the technology/framework for best practices research
2. Formulate official guidance queries (Context7 for documentation)
3. Formulate community consensus queries (WebSearch for 2024-2025 content)
4. Define source prioritization (Tier 1: Official, Tier 2: Experts, Tier 3: Companies, Tier 4: Practitioners)

**Output Acknowledgment After Phase 1:**
```
✅ Phase 1 Complete - Best Practices Research Strategy Defined
📋 Topic: [technology/framework]
📊 Source Tiers: Official → Experts → Companies → Practitioners
🎯 Recency Focus: 2024-2025 content prioritized
⏭️  Proceeding to Phase 2: Multi-Tier Research Execution
```

#### Phase 2: Multi-Tier Research Execution
**YOU MUST:**
1. Execute Phase 1: Official guidance (Context7 + WebFetch official docs)
2. Execute Phase 2: Community consensus (WebSearch with multiple query variations)
3. Execute Phase 3: Expert sources (WebFetch top 3-5 authoritative sources)
4. Execute Phase 4: Anti-patterns (WebSearch for common mistakes and pitfalls)
5. Cross-reference all practices across Tier 1-4 sources
6. Document consensus levels (strong 5/5, moderate 3/5, weak 2/5)

**Output Acknowledgment After Phase 2:**
```
✅ Phase 2 Complete - Best Practices Research Finished
📊 Official Sources: [count]
📄 Expert Sources: [count]
🎯 Practices Identified: [count] with consensus ratings
⚠️  Anti-Patterns: [count] documented
⏭️  Proceeding to Phase 3: Validation & Report Generation
```

#### Phase 3: Validation & Report Generation
**YOU MUST:**
1. Validate source requirements (official docs included, 2+ expert sources, 3+ practitioner sources)
2. Verify content requirements (5+ practices, rationale for each, examples, anti-patterns, context-specific guidance)
3. Confirm validation requirements (cross-referenced, conflicts noted, evolution documented)
4. Generate best practices report following the standard template
5. Include quick reference (DO/DON'T lists)
6. Assign confidence level based on consensus

**Output Acknowledgment After Phase 3:**
```
✅ Phase 3 Complete - Research Best Practices Pattern Finished
📊 Core Practices: [count] with consensus validation
🎯 Anti-Patterns: [count] documented with better alternatives
📄 Report Generated: research/[topic]-best-practices.md
✅ Pattern execution complete
```

## Language Standards (v5.4.0)

**Directive Language:** This pattern uses imperative commands.
- ✅ "YOU MUST", "DO NOT", "ALWAYS", "NEVER"
- ❌ "should", "consider", "might", "could", "try to"

**Rationale:** Weak language leads to inconsistent execution. Strong directives ensure reliable pattern application.

## Pattern Overview

This specialized pattern:
1. Focuses on **current, authoritative** best practices
2. Prioritizes **2024-2025 content** for fast-moving tech
3. Seeks **community consensus** across multiple sources
4. Provides **actionable guidance** with clear rationale
5. Flags **anti-patterns** and what to avoid

## Research Strategy

### Phase 1: Official Guidance (60-90 seconds)
```markdown
1. **Context7 query**: "[Technology] best practices use context7"
   - Gets official documentation recommendations
   - Latest framework/tool guidance
   - Authoritative starting point

2. **WebFetch official docs**:
   - Guides section
   - Best practices section
   - Style guides (if available)
```

**Example**:
```
Context7: "React best practices use context7"
WebFetch: https://react.dev/learn/thinking-in-react
WebFetch: https://react.dev/reference/rules
```

### Phase 2: Community Consensus (90-120 seconds)
```markdown
1. **WebSearch**: "[Topic] best practices 2025"
   - Prioritize recent content
   - Look for consensus patterns
   - Authoritative authors/blogs

2. **WebSearch**: "[Topic] recommended patterns"
   - Alternative phrasing finds different sources
   - More pattern-focused results

3. **WebSearch**: "[Topic] style guide" or "[Topic] conventions"
   - Coding standards
   - Team conventions
   - Industry standards
```

**Example**:
```
WebSearch "React Hook best practices 2025"
WebSearch "React Hook patterns and best practices"
WebSearch "React coding conventions"
```

### Phase 3: Expert Sources (60-90 seconds)
```markdown
1. **Identify top 3-5 results** from searches:
   - Official blogs (React, Next.js, etc.)
   - Framework authors
   - Established experts (Kent C. Dodds, Dan Abramov, etc.)
   - Major tech companies (Google, Meta, Vercel)

2. **WebFetch** these authoritative sources:
   - Extract specific recommendations
   - Note rationale for each practice
   - Capture code examples

3. **Cross-reference**:
   - What do multiple sources agree on?
   - Where do they disagree (and why)?
```

### Phase 4: Anti-Patterns (30-60 seconds)
```markdown
1. **WebSearch**: "[Topic] common mistakes"
2. **WebSearch**: "[Topic] anti-patterns"
3. **Extract** what NOT to do:
   - Outdated practices
   - Common beginner mistakes
   - Performance pitfalls
```

**Example**:
```
WebSearch "React Hook common mistakes"
WebSearch "React anti-patterns to avoid"
```

## Best Practices Report Structure

```markdown
# Research Report: [Topic] Best Practices

**Date**: YYYY-MM-DD
**Query**: [Topic] best practices
**Confidence**: High | Medium | Low

## Executive Summary
[2-3 sentences: Core recommendations that define best-in-class usage of this technology]

## Core Best Practices

### 1. [Practice Name]
**Recommendation**: [Clear, specific guidance]

**Rationale**: [Why this is important/beneficial]

**Example**:
```[language]
// Good: [Example demonstrating the practice]
[code]

// Avoid: [Counter-example showing what not to do]
[code]
```

**Sources**:
- [Source 1](url) - [Authority name]
- [Source 2](url) - [Authority name]

**Consensus**: Strong (5/5 sources agree) | Moderate (3/5) | Weak (2/5)

---

### 2. [Practice Name]
[Repeat structure]

---

[Continue for top 5-10 practices]

## Quick Reference

### DO:
- ✅ **[Practice]** - [1 sentence why]
- ✅ **[Practice]** - [1 sentence why]
- ✅ **[Practice]** - [1 sentence why]
[All positive recommendations]

### DON'T:
- ❌ **[Anti-pattern]** - [1 sentence why not]
- ❌ **[Anti-pattern]** - [1 sentence why not]
- ❌ **[Anti-pattern]** - [1 sentence why not]
[All things to avoid]

## Common Mistakes & Anti-Patterns

### Mistake 1: [Mistake Name]
**Problem**: [What developers commonly do wrong]
**Why It's Bad**: [Consequences, issues caused]
**Better Approach**: [What to do instead]
**Source**: [URL]

---

[Continue for all identified mistakes]

## Context-Specific Guidance

### For Small Projects
- [Practice adjustments for small scale]
- [What can be simplified]
- [Priorities for small teams]

### For Large/Enterprise Projects
- [Additional practices at scale]
- [Team coordination considerations]
- [Performance/maintainability priorities]

### For Beginners
- [Start with these 3 practices]
- [Common beginner pitfalls]
- [Learning progression]

### For Advanced Users
- [Advanced patterns]
- [Performance optimizations]
- [Edge cases to consider]

## Tooling & Enforcement

### Linters & Tools
- [ESLint rules for this topic]
- [TypeScript configurations]
- [Editor plugins]
- [CI/CD checks]

### Code Review Checklist
- [ ] [Check for practice 1]
- [ ] [Check for practice 2]
- [ ] [Verify anti-pattern X is avoided]

## Evolution & Trends

### Recent Changes (2024-2025)
- [What's new in current best practices]
- [What's deprecated or discouraged now]
- [Emerging patterns to watch]

### Historical Context
- [How practices have evolved]
- [Why older approaches are now anti-patterns]
- [Migration guidance from old to new]

## Real-World Examples

### Example 1: [Scenario]
**Setup**: [Context/requirements]
**Best Practice Application**: [How to apply practices]
**Code**:
```[language]
[Real example demonstrating multiple practices]
```
**Source**: [URL if available]

---

[Continue for 2-3 real examples]

## Official Resources

### Primary Documentation
- [Official Docs](url) - [Key sections]
- [Official Guide](url) - [Best practices section]
- [Official Style Guide](url) - [Conventions]

### Authoritative Guides
- [Expert Guide](url) - [Author/Organization]
- [Company Blog](url) - [Author]
- [Framework Author Article](url) - [Author]

## Sources

### High Credibility (Official/Framework Authors)
- [Source](url) - [Author] - [Date] - [Why credible]

### High Credibility (Established Experts)
- [Source](url) - [Expert name] - [Date] - [Why credible]

### Medium Credibility (Experienced Practitioners)
- [Source](url) - [Author] - [Date]

### Community Sources (Validation)
- [Source](url) - [Platform] - [Date]

## Research Metadata
- **Searches Performed**: N web searches
- **Pages Fetched**: N WebFetch operations
- **Context7 Queries**: N documentation lookups
- **Total Sources**: N sources consulted
- **Consensus Sources**: N/N sources agree on core practices
- **Confidence Level**: High | Medium | Low
- **Research Duration**: X.X minutes
- **Date Generated**: YYYY-MM-DD HH:MM
```

## Quality Gates (Best Practices Specific)

### Source Requirements
- [ ] **Official documentation** included (if exists)
- [ ] **At least 2 expert sources** (framework authors, established authorities)
- [ ] **3+ practitioner sources** (blogs, articles from experienced developers)
- [ ] **Recent content** (2024-2025 for fast-moving tech like React, Next.js)
- [ ] **Consensus validated** (multiple sources agree on core practices)

### Content Requirements
- [ ] **5+ core best practices** identified
- [ ] **Rationale provided** for each practice (not just "do this")
- [ ] **Examples included** (code snippets demonstrating practices)
- [ ] **Anti-patterns documented** (what NOT to do)
- [ ] **Context-specific guidance** (small vs large projects, beginners vs advanced)
- [ ] **Quick reference** (DO/DON'T summary for easy scanning)

### Validation Requirements
- [ ] **Cross-referenced** (claims validated across 3+ sources)
- [ ] **Conflicts noted** (if sources disagree, documented and explained)
- [ ] **Evolution documented** (how practices have changed over time)
- [ ] **Actionable** (developer knows exactly what to do)

## Search Query Optimization

### Effective Queries
```bash
# Good: Specific, includes year for recency
"React Hook best practices 2025"
"TypeScript strict mode best practices"
"REST API design best practices 2024"

# Better: Multiple angles
"React Hook best practices 2025"
"React Hook patterns and conventions"
"React Hook common mistakes"

# Best: Official + community
"React Hook best practices use context7"  # Official
"React Hook best practices 2025"         # Community
"React Hook anti-patterns"               # What to avoid
```

### Query Variations
For comprehensive coverage, vary queries:
1. **Direct**: "[Topic] best practices"
2. **Patterns**: "[Topic] recommended patterns"
3. **Conventions**: "[Topic] coding conventions"
4. **Style**: "[Topic] style guide"
5. **Anti-patterns**: "[Topic] common mistakes"

## Source Prioritization

### Tier 1: Official (Highest Priority)
- Official framework documentation
- Framework author blogs
- Official guides and tutorials
- Example: React docs, Next.js docs, official guides

### Tier 2: Established Experts
- Well-known framework contributors
- Authors of popular libraries
- Conference speakers on the topic
- Example: Kent C. Dodds, Dan Abramov, Theo Browne

### Tier 3: Major Tech Companies
- Engineering blogs from major companies
- Open source guidelines from Google, Meta, etc.
- Example: Meta Engineering Blog, Google Style Guides

### Tier 4: Experienced Practitioners
- Technical blogs with demonstrated expertise
- Popular tutorial sites (when recent and well-sourced)
- Example: CSS-Tricks, Smashing Magazine

### Skip: Low Quality
- Content farms (BestOf lists with no depth)
- Outdated content (pre-2023 for fast-moving tech)
- AI-generated listicles
- Promotional content

## Common Pitfalls (Pattern Usage)

### DON'T:
- ❌ **Accept single-source practices** - Always cross-reference
- ❌ **Include outdated practices** - Flag anything pre-2023 for modern frameworks
- ❌ **Omit rationale** - Always explain WHY a practice is recommended
- ❌ **Forget anti-patterns** - What NOT to do is as important as what to do
- ❌ **Miss context** - Best practices vary by project size, team, use case
- ❌ **Skip official docs** - Always start with Context7/official sources

### DO:
- ✅ **Cross-reference** everything across multiple authoritative sources
- ✅ **Prioritize recency** for fast-moving technologies
- ✅ **Include rationale** for every recommendation
- ✅ **Document evolution** - how practices have changed
- ✅ **Provide context** - when to use (and not use) each practice
- ✅ **Include examples** - code snippets demonstrating practices

## Integration Examples

### Example 1: Pre-Implementation Research
```bash
# Planning to use React Hooks extensively
/research "React Hook best practices"

# Review findings
cat research/react-hook-best-practices.md

# Implement with best practices in mind
/workflow scout-plan-build "refactor to Hooks"
```

### Example 2: Code Review Preparation
```bash
# Team adopting new technology
/research "TypeScript strict mode best practices"

# Use as code review checklist
# Reference: research/typescript-strict-mode-best-practices.md
# Check: Are we following the DO list? Avoiding the DON'T list?
```

### Example 3: Team Onboarding
```bash
# New team member learning technology
/research "Next.js App Router best practices"

# Share research report
# Highlights: Core practices, common mistakes, quick reference
# Benefit: Faster onboarding, consistent practices
```

## Success Criteria

A successful best practices research report:
1. **Consensus documented** - Multiple sources agree on core practices
2. **Rationale clear** - Every practice explains WHY (not just WHAT)
3. **Examples included** - Code snippets demonstrate practices
4. **Anti-patterns flagged** - Clear guidance on what to avoid
5. **Context provided** - Practices adjusted for different scenarios
6. **Actionable** - Developer knows exactly what to do
7. **Current** - Reflects 2024-2025 best practices (for relevant tech)
8. **Authoritative** - Based on official docs + established experts

---

**Related Patterns:**
- `research_query` - General research pattern (foundation)
- `research_comparison` - Technology comparison
- `code_review` - Use best practices for code review

**See Also:**
- `/research` command
- `research-scout` agent
- Best practices integration in development workflow
