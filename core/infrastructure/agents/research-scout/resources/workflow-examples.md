# Workflow Integration Examples

How research-scout integrates with various workflows and usage patterns.

---

## Workflow Integration

### Standalone Mode
```
User: /research "React Hook best practices"
→ Research Scout spawns
→ Performs comprehensive research
→ Saves to research/react-hook-best-practices.md
→ Returns: Summary + link to full report
```

### Parallel with Scout Workflow
```
Workflow: scout-plan-build "add caching" --with-research
→ Research Scout: Caching best practices (external)
→ Code Scout: Existing cache patterns (codebase)
→ Both run in parallel (3-5 min total)
→ Plan phase: Loads both reports, synthesizes
```

### Parallel Research (Multiple Topics with Task Subdirectory)
```
Enhanced Planning: /plan-enhanced "implement GraphQL API"
→ Task subdirectory: "graphql-api-system" (sanitized from task description)
→ Research Scout 1: "GraphQL API best practices 2025"
→ Research Scout 2: "API design patterns"
→ Research Scout 3: "API security patterns"
→ All spawn simultaneously (3-5 min wall time)
→ Save to task-specific subdirectory:
  - research/graphql-api-system/graphql-api-best-practices.md
  - research/graphql-api-system/api-design-patterns.md
  - research/graphql-api-system/api-security-patterns.md
→ Architecture phase loads all reports from subdirectory
```

**Parallel Execution Notes**:
- Each scout instance is independent
- Reports saved to unique filenames (based on topic)
- All reports for a task grouped in subdirectory for easy access
- No coordination required between scout instances
- Main agent waits for all scouts to complete before next phase
- Subdirectory organization improves project-level research organization

### Gap-Driven Research
```
Plan workflow: Detects no existing patterns for new technology
→ Plan: "No Redis code found. Research Redis caching? [y/n]"
→ User: y
→ Research Scout spawns for "Redis caching patterns"
→ Plan continues with research context
```

---

## Cost Management

### Time Limits
- **Hard limit**: 5 minutes total research time
- **Soft limit**: 4 minutes (warn if approaching 5)
- **Timeout**: Gracefully stop if time limit reached, save partial results

### Query Limits
- **WebSearch**: 5-10 searches (comprehensive mode)
- **WebFetch**: 3-5 fetches (highest value sources)
- **Context7**: 1-3 queries (official docs)

### Cost Tracking
- **Estimate tokens**: ~30-50K total per comprehensive research
- **Target cost**: $0.03-0.05 per query (Haiku model)
- **Warn if exceeds**: $0.10 (potential issue)

---

## Storage & Caching

### File Naming
Sanitize topic to create filename:
- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Append `.md` extension
- Example: "React Server Components" → `react-server-components.md`

### Storage Location
- **Default**: `research/[topic].md` (standalone research)
- **Task-Specific**: `research/[task-subdirectory]/[topic].md` (when invoked with task subdirectory)
- **Index**: Add entry to `research/index.json` (if exists)
- **Dev Docs Integration**: For multi-session tasks, copy to `dev/active/[task]/CONTEXT.md`

**Task Subdirectory Benefits**:
- Groups related research reports together (e.g., all research for a planning task)
- Makes it easy to find all research for a specific project/feature
- Prevents root `research/` directory from becoming cluttered
- Example structure:
  ```
  research/
  ├── authentication-system/
  │   ├── oauth2-best-practices.md
  │   └── jwt-security-patterns.md
  ├── visualization-system/
  │   ├── chartjs-best-practices.md
  │   └── d3js-architecture-patterns.md
  └── redis-implementation.md  (standalone research)
  ```

### Caching Strategy
- Research reports are **persistent** (not deleted)
- **30-day retention**: Automatically cleanup old research (if implemented)
- **Reuse**: Check `research/` directory before researching same topic
- **Update**: If topic researched again, append date: `topic-2025-01-15.md`

---

## Task Subdirectory Parameter

When invoked, you may receive an optional `--task-subdirectory` parameter in your prompt. This is used to organize research reports for multi-topic tasks (like /plan-enhanced).

**How to use**:
1. **Check your prompt** for `--task-subdirectory="[subdirectory-name]"`
2. **If present**: Save research to `research/[subdirectory-name]/[topic].md`
3. **If absent**: Save to default location `research/[topic].md`
4. **Create subdirectory** if it doesn't exist (use Bash `mkdir -p research/[subdirectory-name]`)

**Example prompt with task subdirectory**:
```
Research "Chart.js best practices 2025" --task-subdirectory="chart-visualization-system"
→ Save to: research/chart-visualization-system/chartjs-best-practices.md
```

**Example prompt without task subdirectory**:
```
Research "React Hooks best practices"
→ Save to: research/react-hooks-best-practices.md
```

---

## Best Practices

### DO:
✅ YOU MUST prioritize official documentation and authoritative sources
✅ YOU MUST cross-reference findings across multiple sources
✅ YOU MUST include recent content (2024-2025) for fast-moving tech
✅ YOU MUST provide actionable recommendations with clear rationale
✅ YOU MUST flag conflicts between sources and explain why
✅ YOU MUST include code examples when available
✅ YOU MUST warn about common pitfalls and anti-patterns
✅ YOU MUST synthesize information without citing specific URLs

### DON'T:
❌ DO NOT rely on single source for important findings
❌ DO NOT include outdated content without flagging it
❌ DO NOT provide vague recommendations ("consider using...")
❌ DO NOT ignore conflicts between sources
❌ DO NOT include source URLs or citations in the output
❌ DO NOT skip metadata (total sources, confidence, duration)
❌ DO NOT exceed 5-minute time limit without warning

---

## Success Criteria

A successful research report:
1. **Informs decisions**: User knows what to do after reading
2. **Comprehensive**: 5-10 credible sources consulted
3. **Current**: Prefers 2024-2025 content for relevant topics
4. **Actionable**: Clear recommendations with rationale
5. **Warns**: Flags critical pitfalls and anti-patterns
6. **Synthesized**: Information consolidated without source citations
7. **Structured**: Easy to scan, find key information
8. **Confident**: Appropriate confidence level based on research quality

---

**Reference:** Load with `@research-scout/resources/workflow-examples.md`
