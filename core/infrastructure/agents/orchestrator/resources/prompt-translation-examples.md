# Prompt Translation Examples

**Purpose:** Detailed examples of translating vague, high-level prompts into detailed, actionable agent instructions.

---

## Your Critical Skill

Translating vague, high-level prompts into detailed, actionable agent instructions.

## Example 1: Email Template Migration

**High-level prompt:**
"Migrate email templates to pattern system"

**Your translation:**
```json
{
  "tasks": [
    {
      "id": "task-001",
      "name": "Search for email template files",
      "agentType": "scout",
      "prompt": "Search the codebase for all email template files. Look for:\n- .md files in /templates/ or /email/ directories\n- Files containing 'subject line' or 'email body'\n- Patterns: marketing emails, transactional emails, newsletters\nOutput: List of files with descriptions to /tmp/agents/scout-report.md",
      "dependencies": [],
      "model": "haiku",
      "timeout": 10,
      "priority": "high"
    },
    {
      "id": "task-002",
      "name": "Design migration strategy",
      "agentType": "planner",
      "prompt": "Based on the scout report at /tmp/agents/scout-report.md:\n1. Analyze existing email template structure\n2. Design pattern structure following .claude/patterns/ conventions\n3. Create step-by-step migration plan\n4. Identify risks and dependencies\nOutput: Detailed plan to /dev/active/email-migration/email-migration-plan.md",
      "dependencies": ["task-001"],
      "model": "sonnet",
      "timeout": 20,
      "priority": "high"
    },
    {
      "id": "task-003",
      "name": "Execute migration",
      "agentType": "builder",
      "prompt": "Load the migration plan from /dev/active/email-migration/email-migration-plan.md and execute it step by step:\n1. Create new pattern files in .claude/patterns/content/\n2. Migrate content from old templates\n3. Update references in codebase\n4. Test pattern loading\nOutput: Migration report to /dev/active/email-migration/migration-report.md",
      "dependencies": ["task-002"],
      "model": "sonnet",
      "timeout": 60,
      "priority": "normal"
    },
    {
      "id": "task-004",
      "name": "Review and validate",
      "agentType": "reviewer",
      "prompt": "Review the migrated patterns:\n1. Validate all patterns follow structure (PURPOSE, INPUT, PROCESS, OUTPUT, EXAMPLES)\n2. Check no content was lost during migration\n3. Verify pattern loading works (grep for pattern references)\n4. List any issues or improvements\nOutput: Review report to /dev/active/email-migration/review-report.md",
      "dependencies": ["task-003"],
      "model": "sonnet",
      "timeout": 20,
      "priority": "normal"
    }
  ],
  "chaining": "sequential"
}
```

## Example 2: Q4 Performance Analysis

**High-level prompt:**
"Analyze Q4 marketing performance and create strategy for Q1"

**Your translation:**
```json
{
  "tasks": [
    {
      "id": "task-001",
      "name": "Analyze Q4 performance data",
      "agentType": "analyst",
      "prompt": "Load Q4 metrics from data/q4-metrics.csv and perform comprehensive analysis:\n1. Calculate key metrics (CAC, LTV, conversion rates, ROI)\n2. Segment by channel (email, social, paid ads)\n3. Identify top performers and underperformers\n4. Statistical significance testing\nOutput: Analysis report to reports/q4-analysis.md",
      "dependencies": [],
      "model": "sonnet",
      "timeout": 30,
      "priority": "high"
    },
    {
      "id": "task-002",
      "name": "Research market trends",
      "agentType": "scout",
      "prompt": "Search for recent marketing trend data:\n1. Industry reports (last 3 months)\n2. Competitor campaigns\n3. Emerging channels/tactics\nOutput: Trend report to reports/q1-trends.md",
      "dependencies": [],
      "model": "haiku",
      "timeout": 15,
      "priority": "normal"
    },
    {
      "id": "task-003",
      "name": "Develop Q1 strategy",
      "agentType": "planner",
      "prompt": "Based on:\n- Q4 analysis: reports/q4-analysis.md\n- Market trends: reports/q1-trends.md\nCreate comprehensive Q1 marketing strategy:\n1. Goals and KPIs\n2. Channel allocation\n3. Budget recommendations\n4. Campaign calendar\n5. Experiments to run\nOutput: Q1 strategy to /dev/active/q1-strategy/q1-strategy-plan.md",
      "dependencies": ["task-001", "task-002"],
      "model": "sonnet",
      "timeout": 45,
      "priority": "high"
    }
  ],
  "chaining": "mixed"
}
```

## Translation Best Practices

1. **Be Specific:** Don't say "analyze data" - say "calculate CAC, LTV, conversion rates by channel"
2. **Define Inputs:** Always specify which files to load
3. **Define Outputs:** Always specify output file path
4. **Right-Size:** Tasks MUST be 10-60 minutes (not 5 min, not 3 hours)
5. **Right-Model:** Use Haiku for search, Sonnet for thinking, Opus rarely
6. **Dependencies:** Explicitly list which tasks must complete first
