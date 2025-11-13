# Marketing Research Command

Conduct comprehensive web research on marketing topics to gather intelligence, trends, benchmarks, and competitive insights.

## Usage

```bash
/research "[topic]"
```

## Description

The research command spawns the **research-scout agent** to gather external marketing intelligence from authoritative web sources. Research reports are saved to `research/marketing/[category]/` for future reference.

## What It Does

1. **Analyzes the topic** to determine research type (competitive, trends, benchmarks, audience, platforms, tools)
2. **Conducts web research** using WebSearch and WebFetch (5-10 authoritative marketing sources)
3. **Synthesizes findings** into structured markdown report with data, recommendations, warnings
4. **Saves report** to appropriate category in `research/marketing/`
5. **Updates index** for future searchability

## Research Categories

Research is automatically categorized and saved:

- **Competitors** → `research/marketing/competitors/` - Competitive intelligence
- **Markets** → `research/marketing/markets/` - Market trends, industry analysis
- **Campaigns** → `research/marketing/campaigns/` - Campaign benchmarks, performance data
- **Audiences** → `research/marketing/audiences/` - Target audience insights, behavior
- **Technologies** → `research/marketing/technologies/` - MarTech tools, platform updates

## Examples

### Competitive Intelligence
```bash
/research "HubSpot content marketing strategy 2025"
/research "Salesforce marketing positioning"
/research "competitor X campaign analysis"
```

### Market Trends
```bash
/research "B2B SaaS marketing trends 2025"
/research "content marketing trends 2025"
/research "email marketing best practices 2025"
```

### Campaign Benchmarks
```bash
/research "SaaS email marketing benchmarks"
/research "B2B conversion rate benchmarks"
/research "LinkedIn ad performance benchmarks"
```

### Audience Insights
```bash
/research "B2B buyer behavior 2025"
/research "CMO priorities 2025"
/research "marketing decision maker preferences"
```

### Platform Updates
```bash
/research "LinkedIn algorithm changes 2025"
/research "Meta advertising updates 2025"
/research "Google Analytics 4 best practices"
```

### MarTech Comparison
```bash
/research "email marketing platforms comparison"
/research "marketing automation tools 2025"
/research "HubSpot vs Marketo comparison"
```

## Output Format

Research reports include:

### Core Sections
- **Executive Summary** - Key findings in 2-3 sentences
- **Key Findings** - 5-7 major insights with sources
- **Best Practices** - Actionable recommendations
- **Benchmarks** - Performance data and industry standards
- **Recommendations** - Specific actions based on research
- **Warnings & Pitfalls** - Common mistakes to avoid

### Supporting Sections (when relevant)
- **Competitive Analysis** - Competitor strategies, strengths, weaknesses
- **Platform Updates** - Recent algorithm or feature changes
- **Audience Insights** - Demographic, behavioral, preference data
- **Case Studies** - Real examples with results
- **Tool Comparison** - Feature/pricing comparisons

### Metadata
- Sources with credibility ratings
- Research methodology (searches performed, pages fetched)
- Confidence level (High/Medium/Low)
- Cost and duration tracking

## Research Quality

### Source Credibility Priority
1. **High**: Official platform docs, HubSpot, CMI, MarketingProfs, Gartner, Forrester
2. **Medium**: Agency case studies, practitioner blogs, industry publications
3. **Low**: Generic marketing blogs, outdated content

### Validation Standards
- **3+ authoritative sources** must agree on key findings
- **Recent content** (2024-2025) for fast-changing topics
- **Data-backed** with actual numbers, case studies, research
- **Actionable** with specific tactical recommendations

### Confidence Scoring
- **High**: 5+ authoritative sources, strong consensus, recent data
- **Medium**: 3-4 good sources, general agreement
- **Low**: 2-3 sources, conflicts, older content

## Performance

- **Duration**: 3-5 minutes comprehensive research
- **Cost**: $0.03-0.05 per query (Haiku model)
- **Sources**: 5-10 authoritative marketing sources consulted
- **Output**: Structured markdown report (~500-1500 lines)

## Caching & Reuse

### Check Before Researching
The suggest-research hook automatically checks for existing research and notifies you if a related report exists.

### When to Re-Research
- Topic is >6 months old (marketing changes fast)
- Significant platform updates occurred
- Need more depth on specific aspect
- Original research had low confidence

### Research Library
All research persists in `research/marketing/` for:
- Reference during campaign planning
- Knowledge base building
- Team onboarding
- Historical trend analysis

## Integration with Workflows

### Campaign Planning
```bash
/campaign "launch content marketing program"
# System suggests: "Research content marketing trends? [y/n]"
# Or manually: --with-research flag
```

### Competitive Analysis
```bash
# Research competitors first
/research "HubSpot content strategy 2025"
/research "Salesforce email marketing 2025"

# Then create competitive campaign
/campaign "competitive content strategy"
```

### Market Entry
```bash
# Research market landscape
/research "B2B SaaS marketing trends 2025"
/research "SaaS email benchmarks 2025"

# Plan go-to-market
/pattern go_to_market
```

## Behind the Scenes

### Agent: research-scout
- **Model**: Haiku (cost-optimized)
- **Phase 1**: Query planning (30s)
- **Phase 2**: Documentation search (60-90s)
- **Phase 3**: Web research (90-120s)
- **Phase 4**: Synthesis (60-90s)
- **Phase 5**: Report generation (30s)

### Tools Used
- **WebSearch**: Find marketing articles, trends, benchmarks
- **WebFetch**: Fetch specific content for detailed analysis
- **Context7**: Query official platform documentation
- **Write**: Save structured markdown reports
- **Grep**: Search existing research library

## Tips for Best Results

### Be Specific
❌ `/research "marketing"` (too broad)
✅ `/research "B2B SaaS content marketing trends 2025"`

### Include Timeframe
❌ `/research "email marketing benchmarks"` (vague timing)
✅ `/research "SaaS email marketing benchmarks 2025"`

### Specify Industry/Segment
❌ `/research "conversion rates"` (what industry?)
✅ `/research "B2B SaaS conversion rate benchmarks"`

### Name Competitors
❌ `/research "competitor analysis"` (which competitor?)
✅ `/research "HubSpot content marketing strategy 2025"`

## Advanced Usage

### Chaining Research
```bash
# Build comprehensive intelligence
/research "content marketing trends 2025"
/research "HubSpot content strategy 2025"
/research "content marketing benchmarks 2025"

# Then create strategy with all research context
/campaign "content marketing program"
```

### Research → Pattern → Implementation
```bash
# 1. Research
/research "LinkedIn ads best practices 2025"

# 2. Apply pattern with research context
/pattern campaign_launch "LinkedIn ads campaign"

# 3. Implement with intelligence
/campaign "LinkedIn demand gen campaign"
```

## Troubleshooting

### "No results found"
- Make topic more specific
- Include industry/segment
- Check spelling of competitor names
- Try alternative phrasing

### "Low confidence" warning
- Topic too niche (few authoritative sources)
- Very recent topic (not enough coverage yet)
- Conflicting information across sources
- Consider broader research scope

### "Research already exists"
- Review existing report first
- Decide if update needed (>6 months old?)
- Use different phrasing to research different aspect
- Or manually override to refresh

## Cost Management

### Cost Tracking
Research costs are tracked in:
- Research metadata (each report shows cost)
- Agent telemetry (`/cost-report`)
- Background task monitoring (`/observe [id]`)

### Cost Optimization
- **Cache hits**: Free (existing research reused)
- **Focused queries**: Lower cost (fewer sources needed)
- **Broad queries**: Higher cost (more comprehensive)

Target: $0.03-0.05 per query | Warn if >$0.10

## Related Commands

- `/campaign` - Campaign planning (can trigger research)
- `/analyze` - Performance analysis (may need benchmark research)
- `/pattern [research_*]` - Use research patterns directly
- `/background research-scout` - Run research in background

## Model & Thinking

- **Model**: Haiku (cost-efficient, fast, quality web research)
- **Thinking**: Standard (balanced speed/quality)
- **Caching**: Aggressive (reports reused frequently)

---

**Remember**: Research builds your marketing intelligence library. Every report adds to team knowledge and improves future decision-making. Research first, strategize with confidence.
