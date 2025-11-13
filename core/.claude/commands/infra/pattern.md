# Pattern Execution Command

📝 Execute a specific marketing pattern with focused, template-based workflow.

## Purpose

The `/pattern` command loads and executes a specific pattern from the pattern library, following its structured PROCESS steps to create high-quality marketing deliverables quickly and consistently.

## Usage

```bash
/pattern [pattern-name] [arguments]
```

## Pattern Categories

### Content Patterns (6)
- `create_linkedin_post` - Professional B2B social media posts
- `create_email_campaign` - Email campaigns with A/B variants
- `write_blog_article` - SEO-optimized long-form content
- `generate_ad_copy` - High-converting paid ad copy
- `create_landing_page_copy` - Conversion-focused landing pages
- `write_social_thread` - Multi-post Twitter/X threads

### Strategy Patterns (6)
- `create_campaign_plan` - Comprehensive campaign strategies
- `position_product` - Product positioning frameworks
- `segment_audience` - Audience segmentation analysis
- `define_value_prop` - Value proposition development
- `competitive_analysis` - Competitor analysis frameworks
- `create_gtm_plan` - Go-to-market strategies

### Analysis Patterns (6)
- `extract_insights` - Data-driven insights extraction
- `compare_performance` - Performance comparison analysis
- `audit_content` - Content quality audits
- `funnel_analysis` - Conversion funnel analysis
- `cohort_analysis` - Cohort behavior analysis
- `attribution_analysis` - Marketing attribution modeling

### Optimization Patterns (6)
- `improve_copy` - Copy improvement recommendations
- `generate_variants` - A/B test variant generation
- `optimize_conversion` - Conversion rate optimization
- `improve_subject_lines` - Email subject line optimization
- `optimize_cta` - Call-to-action optimization
- `design_ab_test` - A/B test design framework

## Examples

### Content Creation
```bash
/pattern create_linkedin_post "Q4 results announcement" "Strategic Sarah" "awareness"
/pattern create_email_campaign "demo request follow-up" "Technical Tom" "short"
/pattern write_blog_article "AI in marketing" "Sarah" 1500
```

### Strategy Development
```bash
/pattern create_campaign_plan "Q1 demand gen" "demo requests" 50000
/pattern position_product "new AI features" "enterprise"
/pattern segment_audience data/users.csv
```

### Performance Analysis
```bash
/pattern extract_insights data/campaign-metrics.csv
/pattern compare_performance data/email-campaign-1.csv data/email-campaign-2.csv
/pattern funnel_analysis data/conversion-funnel.csv
```

### Optimization
```bash
/pattern improve_copy existing-post.md
/pattern generate_variants landing-page.md 3
/pattern optimize_conversion landing-page.md data/metrics.csv
```

## Execution Workflow

When you run `/pattern [name] [args]`:

1. **Load Pattern**: Read pattern file from `.claude/patterns/[category]/[name].md`
2. **Parse INPUT**: Extract INPUT requirements from pattern
3. **Load Dependencies**: Load required skills and knowledge files (per pattern metadata)
4. **Execute PROCESS**: Follow step-by-step PROCESS logic from pattern
5. **Generate OUTPUT**: Create deliverable following OUTPUT format specification
6. **Run QUALITY CHECKS**: Validate against pattern's QUALITY CHECKS criteria
7. **Deliver Result**: Output final deliverable with pattern metadata

## Pattern Structure

Each pattern follows this template:

```markdown
# Pattern: [Name]
**Category**: content | strategy | analysis | optimization
**Complexity**: simple | medium | complex
**Thinking**: think | think-hard | ultrathink

## PURPOSE
[One-sentence description]

## INPUT
[Required inputs with types and formats]

## PROCESS
[Step-by-step execution logic]

## OUTPUT
[Exact format specification]

## QUALITY CHECKS
[Validation criteria before delivery]

## EXAMPLE
[Real input → output demonstration]

## VARIATIONS
[Customization options]
```

## Pattern vs Skill vs Agent

**Use patterns for:**
- ✅ Focused tasks with clear structure (LinkedIn post, email campaign)
- ✅ Repeatable workflows (A/B testing, content optimization)
- ✅ Speed (40-50% faster than loading full skills)
- ✅ Consistency (structured PROCESS guarantees execution quality)

**Use skills for:**
- ✅ Knowledge loading (brand voice, personas, benchmarks)
- ✅ Context and background information
- ✅ Cross-referenced expertise

**Use agents for:**
- ✅ Complex orchestration (campaign strategy, product launches)
- ✅ Multi-faceted work requiring specialist review

## Pattern Auto-Suggestion

Patterns are automatically suggested by the UserPromptSubmit hook based on:
- Keyword matching (252+ keywords across all patterns)
- Intent pattern matching (72+ regex patterns)
- Relevance scoring

When you type naturally, relevant patterns appear in the reminder:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 SKILL & PATTERN ACTIVATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 Brand Voice - @.claude/skills/brand-voice-guidelines.md
👥 Audience Research - @.claude/skills/audience-research.md

💡 SUGGESTED PATTERNS:

📝 create linkedin post (content, simple)
   Pattern: @.claude/patterns/content/create_linkedin_post.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Benefits

### Speed
- **40-50% faster** than manual skill loading
- **<60 seconds** for simple content (LinkedIn, email)
- **<120 seconds** for complex strategy (campaign plans)

### Consistency
- **95%+ OUTPUT format compliance** through structured templates
- **30-40% reduction** in quality variance
- **Automated quality checks** before delivery

### Reusability
- **24 proven patterns** across 4 categories
- **Mix and match** for custom workflows
- **Chain patterns** via `/chain` command

## Pattern Metadata

Each pattern tracks:
- **Usage count**: How often it's been executed
- **Avg execution time**: Expected completion time
- **Token estimate**: Expected token usage
- **Dependencies**: Required skills and knowledge files
- **Complexity**: simple | medium | complex
- **Thinking mode**: think | think-hard | ultrathink

View all pattern metadata: `@.claude/patterns/pattern-index.json`

## Related Commands

- `/chain` - Chain multiple patterns into workflows
- `/campaign` - Full campaign strategy (uses multiple patterns)
- `/content` - Content creation (suggests relevant patterns)
- `/analyze` - Performance analysis (suggests analysis patterns)

## Tips

1. **Let auto-suggestion guide you**: Type naturally, see which patterns match
2. **Use simple patterns first**: Start with `simple` complexity before `complex`
3. **Chain patterns for workflows**: Use `/chain` for multi-step processes
4. **Customize via VARIATIONS**: Most patterns support customization options
5. **Check QUALITY**: Patterns enforce quality checks automatically

## Pattern Index

For complete pattern catalog with all metadata:
```bash
@.claude/patterns/pattern-index.json
```

For pattern system guide:
```bash
@.claude/patterns/README.md
```

---

**Example Session:**

```
User: Create a LinkedIn post about our new AI features for CTOs

[Hook auto-suggests: create_linkedin_post pattern + brand-voice + audience-research]