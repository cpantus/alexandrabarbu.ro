# Research Report Template

Standard format for comprehensive research reports with all required sections.

---

## Standard Report Format

Generate structured markdown reports saved to:
- **Default**: `research/[sanitized-topic].md`
- **Task-Specific**: `research/[task-subdirectory]/[sanitized-topic].md` (when task subdirectory provided)

```markdown
# Research Report: [Topic]

**Date**: [YYYY-MM-DD]
**Query**: [Original research query]
**Confidence**: High | Medium | Low

## Executive Summary
[2-3 sentences synthesizing the most important findings. What should the user know?]

## Key Findings
1. **[Finding 1]** - [Brief explanation]
2. **[Finding 2]** - [Brief explanation]
3. **[Finding 3]** - [Brief explanation]
4. **[Finding 4]** - [Brief explanation]
5. **[Finding 5]** - [Brief explanation]
[Continue for 5-7 key findings]

## Best Practices
- **[Practice 1]** - [Why it matters] - [Benefit/rationale]
- **[Practice 2]** - [Why it matters] - [Benefit/rationale]
- **[Practice 3]** - [Why it matters] - [Benefit/rationale]
[Continue as needed]

## Recommendations
Based on this research, I recommend:

1. **[Recommendation 1]** - [Rationale based on research findings]
2. **[Recommendation 2]** - [Rationale based on research findings]
3. **[Recommendation 3]** - [Rationale based on research findings]
[Continue as needed]

## Warnings & Pitfalls
- **[Warning 1]** - [What to avoid and why] - [Consequence if ignored]
- **[Warning 2]** - [What to avoid and why] - [Consequence if ignored]
- **[Anti-pattern X]** - [Why this is problematic] - [Better alternative]
[Continue as needed]

## Technology Comparison
[Include this section only if comparing technologies]

| Aspect | [Option A] | [Option B] |
|--------|-----------|-----------|
| **Performance** | [Details] | [Details] |
| **Scalability** | [Details] | [Details] |
| **Complexity** | [Details] | [Details] |
| **Use Cases** | [Best for...] | [Best for...] |
| **Community** | [Ecosystem details] | [Ecosystem details] |

**Recommendation**: [Which to choose when, and why]

## Architecture Patterns
[Include this section if researching patterns]

### Pattern 1: [Name]
- **Use Case**: [When to use this pattern]
- **Implementation**: [How to implement]
- **Example**: [Code or diagram if available]
- **Trade-offs**: [Benefits vs costs]

[Continue for all relevant patterns]

## Code Examples
[Include if found in research]

```[language]
// [Brief description of what this demonstrates]
[Code example]
```

## Research Metadata
- **Total Sources Consulted**: [N] sources
- **Confidence Level**: High | Medium | Low
- **Research Duration**: [X.X] minutes
- **Date Generated**: [YYYY-MM-DD HH:MM]
```

---

## Example Research Queries

### Technology Research
```bash
/research "React Server Components best practices"
/research "Next.js App Router migration guide"
/research "TypeScript strict mode benefits"
/research "Tailwind CSS vs CSS Modules"
```

### Architecture & Patterns
```bash
/research "microservices architecture patterns"
/research "CQRS implementation examples"
/research "event-driven architecture best practices"
/research "API design patterns REST vs GraphQL"
```

### Implementation Guidance
```bash
/research "React Hook best practices"
/research "Redis caching strategies"
/research "OAuth 2.0 implementation guide"
/research "WebSocket vs Server-Sent Events"
```

### Technology Comparison
```bash
/research "PostgreSQL vs MongoDB comparison"
/research "Redux vs Zustand state management"
/research "Jest vs Vitest testing frameworks"
/research "Docker vs Podman containers"
```

---

## Quality Checks

Before finalizing report, verify:
- [ ] **3+ credible sources** for main findings
- [ ] **Executive summary** clearly states key insights
- [ ] **Recommendations** are actionable (user knows what to do)
- [ ] **Warnings** flag critical pitfalls
- [ ] **No source URLs** included in the output (synthesized findings only)
- [ ] **Metadata** documents research effort (total sources, confidence, duration)
- [ ] **Confidence** accurately reflects source quality and consensus

---

## Error Handling

### If Sources Conflict
- Document both perspectives in findings
- Explain the conflict and why it exists
- Recommend which to follow based on:
  - Source credibility
  - Recency
  - Use case alignment
  - Community consensus

### If Few Sources Found
- Lower confidence rating to Medium or Low
- Explicitly note limited sources in executive summary
- Recommend areas for further research
- Include alternative search strategies tried

### If Time Limit Approaching
- Prioritize remaining work:
  1. Finish critical WebFetch operations
  2. Write executive summary
  3. Save partial report
- Include note: "Research time-limited, [X] sources consulted"

### If Topic Too Broad
- Ask user to narrow scope
- Or break into sub-topics and research each
- Example: "API design" → "REST API design" + "GraphQL API design"

---

**Reference:** Load with `@research-scout/resources/report-template.md`
