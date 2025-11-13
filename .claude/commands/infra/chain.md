# Pattern Chaining Command

🔗 Chain multiple patterns into complex, multi-step marketing workflows.

## Purpose

The `/chain` command orchestrates multiple patterns in sequence, passing outputs between steps to create sophisticated marketing workflows that combine different pattern types (content → analysis → optimization, strategy → content → variants, etc.).

## Usage

```bash
/chain [pattern1] → [pattern2] → [pattern3] [initial-args]
```

Use `→` (or `->`) to separate patterns in the chain.

## Common Workflow Patterns

### Content Optimization Workflow
```bash
/chain create_linkedin_post → generate_variants → improve_copy
# Creates post, generates 3 variants, improves best performing copy
```

### Strategic Planning Workflow
```bash
/chain segment_audience → define_value_prop → create_campaign_plan
# Segments audience, defines value props for each segment, creates campaign plan
```

### Performance Analysis Workflow
```bash
/chain extract_insights → compare_performance → generate_variants
# Extracts insights from data, compares to benchmarks, creates optimized variants
```

### Launch Workflow
```bash
/chain position_product → create_gtm_plan → create_email_campaign
# Positions product, creates go-to-market plan, executes email campaign
```

### Conversion Optimization Workflow
```bash
/chain audit_content → optimize_conversion → design_ab_test
# Audits current content, optimizes for conversion, designs A/B test
```

## Chaining Rules

### 1. Output → Input Flow
Each pattern's OUTPUT becomes the INPUT for the next pattern:

```
Pattern 1 OUTPUT → Pattern 2 INPUT → Pattern 2 OUTPUT → Pattern 3 INPUT
```

### 2. Context Preservation
Skills and knowledge loaded once are reused across the entire chain:
- Brand voice guidelines remain active
- Persona data persists
- Performance benchmarks accessible to all patterns

### 3. Validation Points
Quality checks run at each step:
- Pattern 1 OUTPUT validated before passing to Pattern 2
- Pattern 2 OUTPUT validated before passing to Pattern 3
- Final OUTPUT validated at end of chain

### 4. Thinking Modes
Chain uses the highest thinking mode among all patterns:
- If any pattern requires `ultrathink`, entire chain uses `ultrathink`
- If max is `think-hard`, entire chain uses `think-hard`
- This ensures sufficient cognitive depth for complex workflows

## Example Workflows

### Example 1: Content Creation → Optimization
```bash
/chain create_linkedin_post → generate_variants → improve_copy

# Input: "Q4 results announcement", "Strategic Sarah", "awareness"
# Step 1: Creates LinkedIn post
# Step 2: Generates 3 variants of the post
# Step 3: Improves copy based on best practices
# Output: 3 optimized LinkedIn post variants
```

### Example 2: Strategy → Execution
```bash
/chain create_campaign_plan → create_email_campaign → generate_variants

# Input: "Q1 demand gen", "demo requests", 50000
# Step 1: Creates comprehensive campaign plan
# Step 2: Develops email campaign aligned to plan
# Step 3: Generates A/B test variants
# Output: Complete email campaign with variants
```

### Example 3: Analysis → Insights → Action
```bash
/chain extract_insights → compare_performance → optimize_conversion

# Input: data/campaign-metrics.csv
# Step 1: Extracts key insights from data
# Step 2: Compares to benchmarks and past performance
# Step 3: Creates optimization recommendations
# Output: Actionable optimization roadmap
```

### Example 4: Audience → Positioning → Content
```bash
/chain segment_audience → define_value_prop → create_landing_page_copy

# Input: data/users.csv
# Step 1: Segments audience into personas
# Step 2: Defines value props for each segment
# Step 3: Creates landing page copy for top segment
# Output: Segmentation-driven landing page
```

### Example 5: Full Launch Workflow
```bash
/chain position_product → competitive_analysis → create_gtm_plan → create_email_campaign

# Input: "New AI features", "enterprise segment"
# Step 1: Positions product in market
# Step 2: Analyzes competitive landscape
# Step 3: Creates go-to-market plan
# Step 4: Executes email campaign
# Output: Complete product launch campaign
```

## Advanced Chaining

### Conditional Chaining
Some patterns produce outputs that branch workflows:

```bash
/chain audit_content → {
  if (score < 70): improve_copy → generate_variants
  if (score >= 70): generate_variants only
}
```

### Parallel Chaining
Execute multiple patterns in parallel, then combine:

```bash
/chain segment_audience → [
  define_value_prop (segment 1) ||
  define_value_prop (segment 2) ||
  define_value_prop (segment 3)
] → create_campaign_plan
```

### Iterative Chaining
Loop patterns until quality threshold met:

```bash
/chain create_linkedin_post → improve_copy [repeat until quality >= 95%]
```

## Chain Execution Flow

1. **Parse Chain**: Break down pattern sequence
2. **Validate Compatibility**: Ensure outputs match inputs
3. **Load Dependencies**: Load all required skills/knowledge once
4. **Execute Pattern 1**: Run first pattern, capture OUTPUT
5. **Pass to Pattern 2**: Use Pattern 1 OUTPUT as Pattern 2 INPUT
6. **Execute Pattern 2**: Run second pattern, capture OUTPUT
7. **Continue Chain**: Repeat for remaining patterns
8. **Final Validation**: Validate final OUTPUT against last pattern's QUALITY CHECKS
9. **Deliver Result**: Output complete workflow results

## Chain Metadata

Each chain tracks:
- **Total execution time**: Sum of all pattern times
- **Total tokens used**: Sum of all pattern tokens
- **Patterns executed**: List of patterns in sequence
- **Success rate**: Did all patterns complete successfully?
- **Quality score**: Final OUTPUT quality rating

## Benefits

### Composability
- **10x more workflow combinations** vs individual patterns
- **Mix and match** 24 patterns into thousands of workflows
- **Reusable chains** for common multi-step tasks

### Efficiency
- **Skills loaded once**: Reused across entire chain
- **Context preserved**: No redundant loading
- **Optimized thinking**: Right cognitive mode for complexity

### Quality
- **Validation at each step**: Catches issues early
- **Cumulative quality checks**: Multiple validation points
- **Consistent outputs**: Structured templates throughout

## Tips

1. **Start simple**: Begin with 2-pattern chains before complex workflows
2. **Test patterns individually**: Validate each pattern works before chaining
3. **Match output → input**: Ensure Pattern N OUTPUT is valid Pattern N+1 INPUT
4. **Use strategic → tactical flow**: Strategy patterns → Content patterns → Optimization patterns
5. **Monitor thinking mode**: Complex chains may require `ultrathink`

## Common Chain Templates

### Content Marketing Workflow
```bash
segment_audience → define_value_prop → write_blog_article → generate_variants
```

### Campaign Launch Workflow
```bash
position_product → create_campaign_plan → create_email_campaign → design_ab_test
```

### Optimization Workflow
```bash
audit_content → extract_insights → improve_copy → generate_variants
```

### Analysis Workflow
```bash
funnel_analysis → cohort_analysis → attribution_analysis → extract_insights
```

### Competitive Workflow
```bash
competitive_analysis → position_product → define_value_prop → create_gtm_plan
```

## Pattern Compatibility Matrix

### Content Patterns
- **Input**: Topic, persona, goal
- **Output**: Formatted content (post, email, article, ad, page, thread)
- **Chains well with**: Optimization patterns (variants, improve, optimize)

### Strategy Patterns
- **Input**: Business goal, market context, data
- **Output**: Strategic framework (plan, positioning, segmentation, value prop, analysis, GTM)
- **Chains well with**: Content patterns, other strategy patterns

### Analysis Patterns
- **Input**: CSV data, content to analyze
- **Output**: Insights, comparisons, audit results, funnel/cohort/attribution data
- **Chains well with**: Optimization patterns, strategy patterns

### Optimization Patterns
- **Input**: Existing content, data, metrics
- **Output**: Improved copy, variants, optimization recommendations, subject lines, CTAs, test designs
- **Chains well with**: Content patterns, analysis patterns

## Chain Performance

### Speed
- **2-pattern chain**: ~90-180 seconds
- **3-pattern chain**: ~150-300 seconds
- **4-pattern chain**: ~240-480 seconds

### Token Efficiency
- **Shared context**: 30-40% token savings vs running patterns separately
- **Progressive disclosure**: Only load resources when needed
- **Cached skills**: Skills loaded once, used throughout

### Quality
- **Multi-point validation**: >90% quality consistency
- **Cumulative checks**: Each step validated
- **Final review**: End-to-end quality assurance

## Related Commands

- `/pattern` - Execute individual patterns
- `/campaign` - Full campaign strategy (uses pattern chains internally)
- `/content` - Content creation (suggests patterns that chain well)
- `/analyze` - Performance analysis (suggests analysis chain workflows)

## Error Handling

If a pattern in the chain fails:
1. **Show partial results**: Display outputs from successful patterns
2. **Identify failure point**: Highlight which pattern failed and why
3. **Suggest fixes**: Recommend adjustments to inputs or pattern selection
4. **Allow resume**: Option to fix issue and continue from failure point

## Saving Chains

Save frequently-used chains as custom commands:

```bash
# Save chain as /my-launch-workflow
/chain position_product → create_gtm_plan → create_email_campaign
# → Save as custom command
```

Then reuse:
```bash
/my-launch-workflow "New AI features" "enterprise"
```

## Chain Library

Common saved chains available in:
```bash
@.claude/patterns/chains/
```

Pre-built chains:
- `content-optimization.chain`
- `campaign-launch.chain`
- `competitive-analysis.chain`
- `conversion-optimization.chain`

## Pattern Chain Index

For all compatible pattern combinations:
```bash
@.claude/patterns/pattern-index.json
# See "chainCompatibility" section
```

---

**Example Session:**

```
User: /chain segment_audience → define_value_prop → create_campaign_plan data/users.csv

Agent: Executing 3-pattern chain...

Step 1/3: Segmenting audience from data/users.csv...
✓ Created 3 segments: Strategic Sarah (45%), Technical Tom (35%), Budget Betty (20%)

Step 2/3: Defining value props for each segment...
✓ Created value propositions for all 3 segments

Step 3/3: Creating campaign plan...
✓ Campaign plan complete: Q1 Demand Gen Strategy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAIN COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Patterns executed: 3
Total time: 180 seconds
Quality score: 96/100

Deliverable: Q1-demand-gen-campaign-plan.md
```

---

**Pro Tip**: The most powerful workflows combine all 4 pattern categories:
```bash
strategy → analysis → content → optimization
```

Example:
```bash
/chain create_campaign_plan → funnel_analysis → create_email_campaign → generate_variants
```
