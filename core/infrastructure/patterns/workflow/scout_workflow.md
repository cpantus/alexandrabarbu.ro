# Scout Workflow Pattern

**Category:** Workflow
**Purpose:** Delegate exploratory search to fast, cheap agents for efficient file discovery
**Use When:** Starting complex tasks that require finding relevant files across the codebase
**Cost:** Low (uses fast models: Haiku, Gemini Flash)
**Speed:** Fast (2-5 minutes for 2-3 parallel scouts)

---

## INPUT

Required:
- **task_description** - High-level description of what needs to be done
- **search_scope** - Areas to search (e.g., "patterns/", "skills/", "entire codebase")
- **scout_count** - Number of parallel scouts (2-3 recommended)

Optional:
- **file_patterns** - Glob patterns to focus search (e.g., "*.md", "*.ts")
- **exclude_patterns** - Patterns to exclude (e.g., "node_modules/", "*.csv")
- **keywords** - Specific keywords to search for
- **output_file** - Where to save scout report (default: /dev/active/[task]/scout-report.md)

---

## PROCESS

### Step 1: Analyze Task & Define Search Strategy
1. Break down task description into searchable components
2. Identify key concepts, features, files that might be relevant
3. Define search queries for each scout
4. Determine search scope and patterns

**Think about:**
- What files are likely to be relevant?
- What keywords or patterns indicate relevance?
- How to divide search work among scouts?
- What to prioritize (recent changes, core files, dependencies)?

---

### Step 2: Spawn Scout Agents (Parallel Execution)
**Spawn 2-3 background agents in parallel:**

**Scout 1: Keyword Search**
- Task: Search for files containing key terms from task description
- Tools: Grep, Glob
- Model: Claude Haiku (cheap, fast)
- Report: List of files with keyword matches + match count

**Scout 2: Pattern/Structure Search**
- Task: Search for files matching structural patterns (imports, function names, etc.)
- Tools: Grep, Glob, Read (selective)
- Model: Claude Haiku (cheap, fast)
- Report: List of files with structural relevance + rationale

**Scout 3: Dependency/Related Search** (Optional)
- Task: Search for files related to identified files (imports, references)
- Tools: Grep, Read
- Model: Claude Haiku (cheap, fast)
- Report: List of related files + dependency graph

**Execution:**
```bash
# Spawn scouts as background agents
/background scout-1 "Search for files related to [task] using keywords: [keywords]"
/background scout-2 "Search for files with patterns: [patterns]"
/background scout-3 "Search for dependencies of [initial files]" # Optional
```

---

### Step 3: Monitor Scout Progress
**Check status periodically:**
```bash
/background-status scout-1
/background-status scout-2
/background-status scout-3
```

**Observe:**
- Execution time (should be <2 min per scout)
- Context usage (should be low, <50K tokens)
- Status (running → completed)

---

### Step 4: Search Research Examples (If Component Creation)
**If task involves creating agents, patterns, skills, or commands:**

1. **Detect component creation intent:**
   - Keywords: "create agent", "new pattern", "build skill", "add command"
   - Task description mentions component types

2. **Search research repositories:**
   ```typescript
   // Use source-scanner to find relevant examples
   import { searchComponents } from 'core/infrastructure/hooks/utils/source-scanner';

   const query = {
     keywords: extractKeywordsFromTask(taskDescription),
     type: detectComponentType(taskDescription) // 'agent' | 'pattern' | 'skill' | 'command'
   };

   const examples = searchComponents(query).slice(0, 5); // Top 5 matches
   ```

3. **Include in scout report:**
   - Add "Research Examples" section
   - List top 3-5 relevant components from research repos
   - Include repo name, component name, purpose, relevance score
   - Suggest `/create-from-example` command for adaptation

**Example output:**
```markdown
## Research Examples (from 1,515+ indexed components)
1. **web-scraper-agent** (wshobson-agents) - Score: 120
   Purpose: Advanced web scraping with rate limiting and proxy rotation
   Suggest: /create-from-example agent "web scraping"

2. **api-researcher** (agents-claude-code) - Score: 95
   Purpose: Research and analyze REST APIs
   Suggest: /create-from-example agent "api research"
```

---

### Step 5: Aggregate Scout Reports
**Once all scouts complete:**

1. **Read scout reports:**
   - scout-1-report.md (keyword matches)
   - scout-2-report.md (structural matches)
   - scout-3-report.md (dependency matches)
   - research-examples.md (if component creation detected)

2. **Deduplicate files:**
   - Remove duplicate file paths
   - Merge relevance scores

3. **Rank by relevance:**
   - High priority: Files mentioned by 2+ scouts
   - Medium priority: Files mentioned by 1 scout with high confidence
   - Low priority: Files mentioned with low confidence

4. **Create aggregated report:**

```markdown
# Scout Report: [Task Name]

**Generated:** [timestamp]
**Scouts:** 3 agents (parallel execution)
**Search Time:** [X] minutes
**Files Discovered:** [N] files

## High Priority Files (mentioned by 2+ scouts)
1. path/to/file1.md - Reason: [keywords + structure match]
2. path/to/file2.ts - Reason: [keywords + dependencies]

## Medium Priority Files (1 scout, high confidence)
3. path/to/file3.md - Reason: [strong keyword match]
4. path/to/file4.ts - Reason: [structural pattern match]

## Low Priority Files (1 scout, low confidence)
5. path/to/file5.md - Reason: [weak keyword match]

## Search Strategy
- Keywords: [list]
- Patterns: [list]
- Exclusions: [list]

## Scout Performance
- Scout 1: 45s, 32K tokens, 12 files found
- Scout 2: 62s, 41K tokens, 8 files found
- Scout 3: 38s, 28K tokens, 5 files found

## Next Steps
1. Load High Priority files into Plan agent
2. Skim Medium Priority files for relevance
3. Ignore Low Priority unless needed
```

---

### Step 5: Return Results to Orchestrator
**Output format for next agent (Plan):**
```json
{
  "scout_report": "/dev/active/[task]/scout-report.md",
  "high_priority_files": ["file1.md", "file2.ts"],
  "medium_priority_files": ["file3.md", "file4.ts"],
  "low_priority_files": ["file5.md"],
  "search_time_seconds": 120,
  "total_tokens_used": 101000,
  "total_cost_usd": 0.05
}
```

---

## OUTPUT

**Primary Deliverable:** Scout Report (scout-report.md)

**Format:**
```markdown
# Scout Report: [Task Name]

**Generated:** [timestamp]
**Scouts:** [N] agents
**Search Time:** [X] minutes
**Files Discovered:** [N] files

## Executive Summary
[2-3 sentences describing what was found and overall search strategy]

## High Priority Files ([N] files)
[Files mentioned by 2+ scouts OR with high confidence]
- path/to/file - Relevance: [reason] - Scouts: [scout1, scout2]

## Medium Priority Files ([N] files)
[Files mentioned by 1 scout with medium-high confidence]
- path/to/file - Relevance: [reason] - Scout: [scout1]

## Low Priority Files ([N] files)
[Files mentioned by 1 scout with low confidence]
- path/to/file - Relevance: [reason] - Scout: [scout1]

## Search Strategy
**Keywords:** [list]
**Patterns:** [list]
**Scope:** [directory paths]
**Exclusions:** [patterns]

## Scout Details
**Scout 1 (Keywords):**
- Execution time: [X]s
- Context usage: [X]K tokens
- Files found: [N]
- Strategy: [description]

**Scout 2 (Structure):**
- Execution time: [X]s
- Context usage: [X]K tokens
- Files found: [N]
- Strategy: [description]

**Scout 3 (Dependencies):** [Optional]
- Execution time: [X]s
- Context usage: [X]K tokens
- Files found: [N]
- Strategy: [description]

## Performance Summary
**Total Time:** [X] minutes
**Total Tokens:** [X]K tokens
**Total Cost:** $[X]
**Parallelization Benefit:** [X]x speedup vs sequential

## Recommendations
1. Start with High Priority files
2. [Specific recommendations based on findings]
3. [Warnings or caveats]

## Next Steps
1. Pass high_priority_files to Plan agent
2. Load files and create implementation plan
3. Review medium_priority_files if needed
```

---

## QUALITY CHECKS

**Before proceeding to Plan agent:**

- [ ] All scouts completed successfully (no failures)
- [ ] Files are deduplicated across scout reports
- [ ] Files are ranked by relevance (high/medium/low)
- [ ] High priority files are truly relevant (spot check 2-3 files)
- [ ] Search strategy is documented (keywords, patterns, scope)
- [ ] Scout performance is logged (time, tokens, cost)
- [ ] Report is formatted consistently
- [ ] Next steps are clear

**Cost Validation:**
- [ ] Total cost < $0.10 (scouts should be cheap)
- [ ] Total tokens < 150K (scouts should be efficient)
- [ ] Total time < 5 minutes (scouts should be fast)

**Quality Validation:**
- [ ] High priority files contain at least 1 truly relevant file
- [ ] No critical files were missed (spot check obvious candidates)
- [ ] Search scope was appropriate (not too narrow/broad)

---

## EXAMPLE

**Input:**
```json
{
  "task_description": "Migrate email templates to pattern system",
  "search_scope": "entire codebase",
  "scout_count": 3,
  "file_patterns": "*.md",
  "keywords": ["email", "template", "campaign", "mailchimp"]
}
```

**Scout 1 (Keywords) Report:**
```markdown
# Scout 1 Report: Keyword Search

**Keywords:** email, template, campaign, mailchimp
**Files Found:** 12

## High Confidence (5 files)
1. company-context/PRODUCT.md - 8 keyword matches
2. .claude/skills/automation-workflows.md - 6 keyword matches
3. teaching/2-3-content-at-scale.md - 5 keyword matches
4. .claude/patterns/content/create_email_campaign.md - 12 keyword matches (HIGHEST)
5. scripts/test-email-campaign.ts - 4 keyword matches

## Medium Confidence (4 files)
...

## Low Confidence (3 files)
...
```

**Scout 2 (Structure) Report:**
```markdown
# Scout 2 Report: Structure Search

**Patterns:** function.*email, class.*Campaign, interface.*Template
**Files Found:** 8

## High Confidence (3 files)
1. .claude/patterns/content/create_email_campaign.md - contains email pattern structure
2. .claude/hooks/user-prompt-submit.ts - contains pattern matching logic
3. .claude/patterns/pattern-index.json - contains email pattern metadata

## Medium Confidence (3 files)
...

## Low Confidence (2 files)
...
```

**Scout 3 (Dependencies) Report:**
```markdown
# Scout 3 Report: Dependency Search

**Root Files:** create_email_campaign.md
**Dependencies Found:** 5

## High Confidence (2 files)
1. .claude/skills/brand-voice-guidelines.md - imported by email pattern
2. .claude/skills/audience-research.md - imported by email pattern

## Medium Confidence (3 files)
...
```

**Aggregated Scout Report:**
```markdown
# Scout Report: Migrate Email Templates to Pattern System

**Generated:** 2025-11-04 14:15:00
**Scouts:** 3 agents (parallel execution)
**Search Time:** 2.3 minutes
**Files Discovered:** 15 unique files

## Executive Summary
Found email-related files across patterns, skills, scripts, and modules. The existing `create_email_campaign.md` pattern is the primary reference. Email templates may exist in company context and teaching modules.

## High Priority Files (4 files)
1. .claude/patterns/content/create_email_campaign.md - Reason: 12 keyword matches + structure match - Scouts: [1, 2]
2. .claude/skills/automation-workflows.md - Reason: 6 keyword matches + dependency - Scouts: [1, 3]
3. .claude/skills/brand-voice-guidelines.md - Reason: dependency + structure - Scouts: [2, 3]
4. scripts/test-email-campaign.ts - Reason: 4 keyword matches + functional code - Scout: [1]

## Medium Priority Files (5 files)
5. company-context/PRODUCT.md - Reason: 8 keyword matches - Scout: [1]
6. teaching/2-3-content-at-scale.md - Reason: 5 keyword matches - Scout: [1]
7. .claude/patterns/pattern-index.json - Reason: metadata reference - Scout: [2]
8. .claude/hooks/user-prompt-submit.ts - Reason: pattern matching - Scout: [2]
9. .claude/skills/audience-research.md - Reason: dependency - Scout: [3]

## Low Priority Files (6 files)
...

## Search Strategy
**Keywords:** email, template, campaign, mailchimp
**Patterns:** *.md, function.*email, class.*Campaign
**Scope:** entire codebase
**Exclusions:** node_modules/, *.csv, data/

## Scout Performance
- Scout 1: 45s, 32K tokens, 12 files found (keyword search)
- Scout 2: 62s, 41K tokens, 8 files found (structure search)
- Scout 3: 38s, 28K tokens, 5 files found (dependency search)

**Total:** 145s (2.4 min), 101K tokens, $0.05

## Next Steps
1. Load High Priority files (4 files) into Plan agent
2. Plan agent should design migration strategy
3. Check Medium Priority files if more context needed
```

**Output JSON for Plan Agent:**
```json
{
  "scout_report": "/dev/active/migrate-email-templates/scout-report.md",
  "high_priority_files": [
    ".claude/patterns/content/create_email_campaign.md",
    ".claude/skills/automation-workflows.md",
    ".claude/skills/brand-voice-guidelines.md",
    "scripts/test-email-campaign.ts"
  ],
  "medium_priority_files": [
    "company-context/PRODUCT.md",
    "teaching/2-3-content-at-scale.md",
    ".claude/patterns/pattern-index.json",
    ".claude/hooks/user-prompt-submit.ts",
    ".claude/skills/audience-research.md"
  ],
  "low_priority_files": [...],
  "search_time_seconds": 145,
  "total_tokens_used": 101000,
  "total_cost_usd": 0.05
}
```

---

## VARIATIONS

### Variation 1: Fast Scout (1 scout, <1 min)
**Use when:** Simple, well-scoped search
- Spawn only 1 scout
- Use keyword search only
- Skip deduplication (single source)
- Cost: $0.02, Time: 30-60s

### Variation 2: Deep Scout (4-5 scouts, 5-10 min)
**Use when:** Complex task with unclear scope
- Spawn 4-5 scouts with different strategies
- Include historical search (git log, recent changes)
- Include semantic search (related concepts)
- Cost: $0.10-0.15, Time: 5-10 min

### Variation 3: Focused Scout (2 scouts, specific directory)
**Use when:** Task scope is known (e.g., "search patterns/ only")
- Limit search scope to specific directory
- Use 2 scouts (keywords + structure)
- Cost: $0.03, Time: 1-2 min

### Variation 4: Continuous Scout (background monitoring)
**Use when:** Long-running task that evolves
- Spawn scouts periodically (every 30 min)
- Re-scan for new relevant files
- Cost: $0.05 per scan

### Variation 5: Scout with Research (--with-research flag)
**Use when:** Implementing unfamiliar technology or need external best practices

Spawns **Research Scout** in parallel with code scouts to gather external knowledge:

**Execution:**
```bash
/workflow scout-plan-build "implement Redis caching" --with-research
```

**What Happens:**
```
Parallel Execution (3-5 minutes):
├─ Code Scout 1: Find existing cache patterns (codebase)
├─ Code Scout 2: Find structure/dependencies (codebase)
└─ Research Scout: Redis caching best practices (external)
    ├─ WebSearch: "Redis caching patterns 2025"
    ├─ Context7: "Redis documentation use context7"
    ├─ WebFetch: Top 3-5 authoritative sources
    └─ Output: research/redis-caching-patterns.md
```

**Research Scout Strategy:**
1. **Parse topic** from task description (e.g., "Redis caching")
2. **External research** (parallel with code scouts):
   - Context7: Official documentation
   - WebSearch: Best practices, patterns
   - WebFetch: Authoritative sources
3. **Generate report**: `research/[topic].md`
4. **Return findings**: Structured research report

**Aggregated Report:**
```markdown
# Scout Report: Implement Redis Caching

**Generated:** [timestamp]
**Scouts:** 3 agents (2 code + 1 research, parallel execution)
**Search Time:** 4.2 minutes
**Files Discovered:** 12 codebase files + 1 research report

## External Knowledge (Research Scout)
**Research Report:** research/redis-caching-patterns.md
- Best practices: Connection pooling, key naming, TTL strategies
- Patterns: Cache-aside, write-through, write-behind
- Warnings: Avoid using Redis as primary database, connection leak pitfalls
- Sources: 7 authoritative sources (official Redis docs, architecture guides)
- Confidence: High

## Codebase Patterns (Code Scouts)

### High Priority Files (3 files)
1. lib/cache.ts - Existing cache abstraction
2. config/redis.config.ts - Redis configuration (if exists)

### Medium Priority Files (5 files)
...

## Synthesis
**Existing Patterns Found:** Basic cache abstraction exists
**Research Findings:** Redis best practices for production use
**Gap Analysis:** Need to implement connection pooling, key namespacing per research
**Recommendation:** Extend lib/cache.ts with Redis implementation following researched patterns
```

**Cost & Performance:**
- **Code Scouts**: $0.02-0.06 (2-3 scouts, Haiku)
- **Research Scout**: $0.03-0.05 (comprehensive research, Haiku)
- **Total**: $0.05-0.11 (combined)
- **Time**: 3-5 minutes (parallel, no time added)
- **Value**: Informed implementation with best practices + existing patterns

**When to Use:**
- ✅ Implementing new/unfamiliar technology
- ✅ No existing patterns in codebase
- ✅ Want to follow current best practices
- ✅ Architecture decision needs validation
- ✅ Team is learning new tool/framework

**When to Skip:**
- ❌ Technology is well-known to team
- ❌ Existing patterns are sufficient
- ❌ Simple implementation (syntax lookup, not research)
- ❌ Time-sensitive (research adds 3-5 min)

**Research Topics Auto-Detected:**
```
Task: "implement GraphQL API" → Research: "GraphQL API design patterns"
Task: "add OAuth authentication" → Research: "OAuth 2.0 best practices"
Task: "migrate to TypeScript" → Research: "TypeScript migration strategies"
Task: "setup Redis caching" → Research: "Redis caching patterns"
```

**Manual Research Topic:**
```bash
/workflow scout-plan-build "implement feature X" --with-research --research-topic="specific topic"
```

**Output for Plan Agent:**
```json
{
  "scout_report": "/dev/active/[task]/scout-report.md",
  "research_report": "research/[topic].md",
  "high_priority_files": ["file1.ts", "file2.ts"],
  "research_findings": {
    "best_practices": ["practice1", "practice2"],
    "warnings": ["warning1", "warning2"],
    "patterns": ["pattern1", "pattern2"],
    "confidence": "High"
  },
  "search_time_seconds": 250,
  "total_cost_usd": 0.08
}
```

---

## INTEGRATION

**Chaining with Plan Pattern:**
```bash
# Option 1: Manual chaining
/pattern scout_workflow "task description"
# Wait for scout report
/pattern plan_workflow "scout-report.md"

# Option 2: Auto-chaining via /workflow command
/workflow scout-plan-build "task description"
```

**Chaining with Build Pattern:**
```bash
# Scout → Plan → Build (full workflow)
/workflow scout-plan-build "task description"
```

**Using Scout as standalone:**
```bash
# Just scout (no plan/build)
/pattern scout_workflow "Find all files related to email templates"
```

---

## TROUBLESHOOTING

**Issue: Scouts return too many files (50+)**
- Solution: Narrow search scope, add exclusions, increase keyword specificity

**Issue: Scouts miss obvious files**
- Solution: Check keyword list, verify search scope includes relevant directories

**Issue: Scouts are slow (>5 min)**
- Solution: Reduce scout count, narrow scope, use faster models

**Issue: Scouts are expensive (>$0.15)**
- Solution: Use Haiku instead of Sonnet, reduce file reads, use Glob before Read

**Issue: Duplicate files across scouts**
- Solution: This is expected - deduplication happens in Step 4

**Issue: All files marked "high priority"**
- Solution: Adjust relevance criteria, require 2+ scouts for high priority

---

## BEST PRACTICES

1. **Use cheap models:** Haiku, Gemini Flash (NOT Sonnet) - scouts are exploratory
2. **Parallelize:** Always run 2-3 scouts in parallel for speed
3. **Start broad, then narrow:** First scout is broad, subsequent scouts refine
4. **Log performance:** Track time/tokens/cost for optimization
5. **Validate results:** Spot-check high priority files before passing to Plan
6. **Document strategy:** Include keywords/patterns in report for debugging
7. **Set time limits:** Scout should complete in <5 min, fail if exceeds
8. **Avoid file reads:** Use Grep/Glob for discovery, save Read for Plan stage
9. **Deduplicate aggressively:** Same file mentioned by multiple scouts = high priority
10. **Budget wisely:** Scout should cost <$0.10, or 5% of total task budget

---

**Pattern Version:** 1.0
**Last Updated:** 2025-11-04
**Part of:** v4.0 Multi-Agent Workflows (Phase 18)
