# Enhance Research Agent

Extract technical patterns from component examples to improve the research-scout agent.

## Purpose

Analyze component examples (research agents, analysis patterns) to discover proven methodologies and apply them to enhance marketing research quality.

## Orchestration Model

**Component Examples → Technical Patterns → Marketing Research Enhancement**

```
1. Scan component-examples/ for research/analysis agents
2. Extract technical patterns (structure, validation, synthesis, reports)
3. Analyze current research-scout.md
4. Identify improvement opportunities
5. Suggest enhancements with rationale
6. Apply improvements (with confirmation)
```

## What Gets Extracted

### Agent Structure Patterns
- Phase breakdown and organization
- Input/output flow
- Error handling approaches
- Progress reporting methods

### Validation Methodologies
- Source credibility scoring systems
- Consensus validation approaches
- Quality gate implementations
- Confidence scoring algorithms

### Synthesis Techniques
- How to combine multiple sources
- Conflict resolution methodologies
- Pattern identification approaches
- Insight generation methods

### Report Formats
- Section organization
- Metadata inclusion
- Visual presentation
- Actionability patterns

## Usage

```bash
/enhance-research-agent
```

## Execution Flow

### Phase 1: Component Discovery (30s)
1. Scan `research/component-examples/` for research agents
2. Filter: agents with "research", "analysis", "intelligence" in keywords
3. Identify: 5-15 relevant components
4. Load: Full content of top candidates

### Phase 2: Pattern Extraction (60s)
1. Analyze agent structures
2. Extract validation patterns
3. Identify synthesis methodologies
4. Note report formats
5. Compile: Pattern library with examples

### Phase 3: Current State Analysis (30s)
1. Read: `core/infrastructure/agents/research-scout.md`
2. Identify: Current structure, methods, gaps
3. Map: What patterns could improve what aspects

### Phase 4: Enhancement Suggestions (45s)
1. Generate: 3-7 specific improvement suggestions
2. Prioritize: By impact (High/Medium/Low)
3. Provide: Rationale with pattern source
4. Show: Before/after comparison for each

### Phase 5: Application (Interactive)
1. Present: All suggestions with details
2. User selects: Which improvements to apply
3. Apply: Selected enhancements
4. Update: research-scout.md
5. Document: Changes made (changelog)

## Example Enhancements

### Enhancement 1: Validation Phase
**From**: competitive-analysis-agent.md
**Pattern**: Dedicated validation phase with 5-point credibility check
**Current**: research-scout has inline validation
**Improvement**: Add structured validation phase
**Impact**: Higher confidence in source credibility

### Enhancement 2: Synthesis Method
**From**: market-research-pattern.md
**Pattern**: Three-stage synthesis (consensus → conflicts → insights)
**Current**: Single-pass synthesis
**Improvement**: Multi-stage synthesis with explicit conflict resolution
**Impact**: Better handling of disagreeing sources

### Enhancement 3: Report Structure
**From**: intelligence-agent.md
**Pattern**: Executive summary + detailed sections + action items
**Current**: Linear report structure
**Improvement**: Hierarchical structure with progressive disclosure
**Impact**: More scannable, actionable reports

## Output

### Enhancement Report
Saved to: `research/enhancements/research-scout-YYYY-MM-DD.md`

```markdown
# Research Scout Agent Enhancement Report

**Date**: YYYY-MM-DD
**Analyzed**: 12 research agents from component-examples
**Patterns Found**: 7
**Suggestions**: 5 (3 high priority, 2 medium)

## Suggested Enhancements

### 1. Add Dedicated Validation Phase [HIGH PRIORITY]
**Source**: competitive-intel-agent.md
**Pattern**: 5-point credibility scoring before synthesis
**Current State**: Inline validation during research
**Proposed Change**: Add Phase 2.5 validation with scoring
**Impact**: 30% higher confidence in source quality
**Effort**: Medium (30 min)

[Details of change...]

### 2. Improve Synthesis Methodology [HIGH PRIORITY]
**Source**: market-analysis-pattern.md
**Pattern**: Three-stage consensus building
**Current State**: Single-pass synthesis
**Proposed Change**: Multi-stage synthesis algorithm
**Impact**: Better conflict resolution
**Effort**: High (60 min)

[Details of change...]

## Applied Enhancements

[After user confirms and applies]

1. ✅ Added validation phase (30 min)
2. ✅ Improved synthesis (60 min)

Total improvements: 2
Time invested: 90 min
Expected quality increase: 25-35%
```

## Integration with v5.1.0

This command is part of the **orchestration model**:
- v5.1.0: Marketing research from web sources
- v5.2.0: Component examples teach better research methods
- **Orchestration**: Components improve research quality over time

## Quality Standards

### Patterns Must Be
- ✅ **Proven**: From working components
- ✅ **Specific**: Not vague best practices
- ✅ **Applicable**: Can be adapted to marketing research
- ✅ **Valuable**: Measurable improvement expected

### Enhancements Must
- ✅ **Improve quality**: Better research outputs
- ✅ **Preserve functionality**: Don't break existing features
- ✅ **Be documentable**: Clear before/after
- ✅ **Have rationale**: Why this improves things

## Cost & Performance

- **Duration**: 3-5 minutes analysis + user time for review
- **Model**: Haiku (pattern extraction is straightforward)
- **Cost**: $0.02-0.03 per analysis
- **Frequency**: Run quarterly or when major improvements found

## Example Usage

### Quarterly Improvement Cycle
```bash
# Quarter 1: Initial research system
/research "Competitor X"  # Current capability

# Quarter 2: After cloning 3 new component repos
cd research/component-examples/
git clone [new-research-agents-repo]
/sync-examples

# Enhance with new patterns
/enhance-research-agent
> [Found 15 research agents]
> [Extracted 8 patterns]
> [5 suggestions (3 high priority)]
> Apply high priority improvements? [y]

# Quarter 3: Test improved research
/research "Competitor X"  # Now with better validation, synthesis

# Measure improvement
Compare: research/marketing/competitors/competitor-x-q1.md
     vs: research/marketing/competitors/competitor-x-q3.md
Result: 30% more insights, higher confidence scores
```

## Success Criteria

A successful enhancement cycle:
- ✅ Analyzes 5-15 relevant component examples
- ✅ Extracts 5-10 concrete patterns
- ✅ Generates 3-7 specific suggestions
- ✅ Prioritizes by impact
- ✅ Provides clear before/after
- ✅ Improves research quality measurably

## Related Commands

- `/sync-examples` - Scan repos to find patterns
- `/create-from-example` - Create components from examples
- `/research` - Use enhanced research agent

---

**Remember**: Enhancement is continuous. As you clone more component repos with research patterns, run this command to extract and apply new methodologies to keep the research-scout agent at the cutting edge of research quality.
