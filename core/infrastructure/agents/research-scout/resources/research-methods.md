# Research Methods & Capabilities

Comprehensive guide to research approaches, tools, and techniques.

---

## Research Capabilities

### 1. Documentation Lookup
- **Context7 MCP**: Query latest framework documentation with "use context7" phrase
- **WebFetch**: Fetch specific official documentation pages
- **Focus**: Official docs, API references, migration guides
- **Example**: "React Server Components documentation use context7"

### 2. Best Practices Research
- **WebSearch**: "X best practices 2025" to find current guidance
- **WebFetch**: Top 3-5 authoritative results for detailed analysis
- **Focus**: Current practices (2024-2025), community consensus, real-world usage
- **Example**: WebSearch "React Hook best practices 2025"

### 3. Technology Comparison
- **WebSearch**: Both options plus "vs" or "comparison"
- **Synthesis**: Pros, cons, use cases, trade-offs
- **Focus**: Objective comparison, decision criteria, when to use each
- **Example**: WebSearch "PostgreSQL vs MongoDB comparison 2025"

### 4. Architecture Pattern Discovery
- **WebSearch**: "X architecture pattern" or "X design pattern"
- **WebFetch**: Examples, implementations, case studies
- **Focus**: Proven patterns, real examples, implementation guidance
- **Example**: WebSearch "microservices architecture patterns"

### 5. Pitfall Identification
- **WebSearch**: "X common mistakes" or "X anti-patterns"
- **Community wisdom**: Stack Overflow, Reddit, GitHub issues
- **Focus**: What to avoid, known issues, gotchas
- **Example**: WebSearch "React common mistakes to avoid"

---

## Research Process Details

### Phase 2: Documentation Search (60-90 seconds)
1. **Context7 first**: Query for official documentation using "use context7"
2. **Capture key points**: API usage, configuration, examples
3. **Note limitations**: What's covered, what's missing
4. **Save references**: Official doc URLs

### Phase 3: Web Research (90-120 seconds)
1. **Primary searches** (3-5 queries):
   - "[Topic] best practices 2025"
   - "[Topic] architecture patterns"
   - "[Topic] common mistakes"
   - "[Topic] use cases" or "[Topic] when to use"
   - "[Topic comparison]" (if comparing technologies)

2. **Evaluate results**:
   - Prioritize: Official blogs, authoritative sources, recent (2024-2025)
   - Skip: Outdated (pre-2023), promotional, thin content
   - Diversity: Get multiple perspectives

3. **WebFetch top results** (3-5 pages):
   - Fetch highest-value pages for detailed analysis
   - Extract: Key recommendations, code examples, warnings
   - Cross-reference: Validate across sources

### Phase 4: Synthesis (60-90 seconds)
1. **Identify consensus**: What do multiple sources agree on?
2. **Note conflicts**: Where do sources disagree? Why?
3. **Extract patterns**: Common themes, recurring recommendations
4. **Formulate recommendations**: Based on research, what should user do?
5. **Flag warnings**: Critical pitfalls, anti-patterns, gotchas

---

## Source Quality Standards

### Source Prioritization
- **Prioritize**: Official documentation, framework authors, established authorities
- **Use**: Popular blogs, experienced practitioners, recent articles
- **Avoid**: Forums, outdated content, promotional material
- **Exclude**: AI-generated listicles, content farms, pre-2023 for fast-moving tech

### Validation Requirements
- **Minimum 3 sources** agree on key recommendations
- **Recent content**: Prefer 2024-2025, flag if using older sources
- **Diversity**: Multiple perspectives (not just one blog's opinion)
- **Actionable**: Specific guidance, not just theory

### Confidence Scoring
- **High**: 5+ authoritative sources, strong consensus, recent, official docs
- **Medium**: 3-4 good sources, general agreement, some recent content
- **Low**: 2-3 sources, conflicts, older content, or niche topic

---

## Tools Usage Guide

### WebSearch
**Use for**: Finding articles, best practices, comparisons, patterns
**Query format**: "[Topic] [type] 2025" for recency
**Examples**:
```
WebSearch "React Server Components best practices 2025"
WebSearch "microservices vs monolith comparison"
WebSearch "Redis caching architecture patterns"
```

### WebFetch
**Use for**: Fetching specific URLs for detailed content
**Input**: URL from WebSearch results or known documentation
**Examples**:
```
WebFetch https://react.dev/reference/react/use-server
WebFetch https://nextjs.org/docs/app/building-your-application/rendering/server-components
```

### Context7 MCP
**Use for**: Latest official framework documentation
**Query format**: "[Question] use context7"
**Examples**:
```
"React Server Components API use context7"
"Next.js App Router configuration use context7"
```

### Read
**Use for**:
- Checking existing research reports in `research/` directory
- Reading codebase files for context if needed

### Write
**Use for**: Saving research reports to `research/[topic].md`

### Grep
**Use for**: Searching existing research library by keyword

---

**Reference:** Load with `@research-scout/resources/research-methods.md`
