# Skill Templates

**Parent Skill:** skill-developer
**Last Updated:** 2025-11-15
**Token Budget:** ~1,500 tokens

---

## Purpose

Provides ready-to-use templates for common skill types. Load this when you're creating a new skill and need a starting structure based on the skill's primary purpose.

---

## Template 1: Content Creation Skill

**Use for:** Skills focused on creating specific content types

**Example domains:**
- Landing page optimization
- Ad copywriting
- Video scriptwriting
- Podcast content planning

**Structure:**
1. Purpose: When to create this content type
2. Quick reference: Format, structure, key elements
3. Core knowledge: Copywriting frameworks, psychology tactics
4. Resources: Templates, examples, testing frameworks
5. Quality checklist: Format-specific criteria

---

## Template 2: Analysis Skill

**Use for:** Skills focused on data analysis and insights

**Example domains:**
- Social media analytics
- Ad performance analysis
- Customer feedback analysis
- Competitive intelligence

**Structure:**
1. Purpose: What questions this analysis answers
2. Quick reference: Metrics, benchmarks, formulas
3. Core knowledge: Analysis frameworks, statistical tests
4. Resources: Data templates, visualization guides, interpretation tips
5. Quality checklist: Statistical rigor, actionable insights

---

## Template 3: Strategy Skill

**Use for:** Skills focused on strategic planning

**Example domains:**
- Pricing strategy
- Market positioning
- Channel strategy
- Partnership strategy

**Structure:**
1. Purpose: Strategic decisions this guides
2. Quick reference: Decision frameworks, key factors
3. Core knowledge: Strategic models, competitive analysis
4. Resources: Case studies, scenario planning, implementation roadmaps
5. Quality checklist: Strategic soundness, feasibility

---

## Template 4: Execution Skill

**Use for:** Skills focused on tactical implementation

**Example domains:**
- Event marketing execution
- Influencer outreach
- PR campaign management
- Community building

**Structure:**
1. Purpose: What tactics this skill covers
2. Quick reference: Step-by-step process, timeline
3. Core knowledge: Best practices, common pitfalls
4. Resources: Checklists, templates, vendor guides
5. Quality checklist: Execution excellence, risk mitigation

---

## Common Patterns

### Pattern 1: Converting Knowledge Base to Skill

**Source:** Existing `.claude/knowledge/` file (monolithic)
**Target:** Progressive disclosure skill

**Process:**
1. Identify core concepts (Quick Reference - 1 page)
2. Extract detailed guides (Resources - multiple files)
3. Add usage patterns and quality checklists
4. Configure auto-activation triggers
5. Test token efficiency (40-60% savings expected)

**Example:**
```
Before: knowledge/advertising/google-ads-guide.md (18KB monolithic)

After:
- skills/google-ads-optimization.md (2-4KB core)
- resources/google-ads-campaign-structure.md (5KB)
- resources/google-ads-bidding-strategies.md (6KB)
- resources/google-ads-quality-score.md (7KB)

Result: Load 2-4KB core, then 1-2 resources on-demand (60% token savings)
```

### Pattern 2: Creating Industry-Specific Skill

**Source:** Generic marketing skill
**Target:** Industry-adapted skill

**Process:**
1. Copy generic skill as template
2. Replace examples with industry-specific scenarios
3. Add industry jargon to keywords
4. Include industry regulations/compliance
5. Reference industry benchmarks in resources

**Example:**
```
Generic: content-strategy-frameworks.md
Industry-specific:
- saas-content-strategy.md (PLG motion, free trial optimization)
- ecommerce-content-strategy.md (Product pages, seasonal campaigns)
- b2b-content-strategy.md (Long sales cycles, thought leadership)
```

### Pattern 3: Multi-Skill Orchestration

**Use case:** Complex tasks requiring multiple skills

**Pattern:**
```
Primary skill: [Main domain knowledge]
Supporting skills: [2-3 related skills]
Execution order:
  1. Load primary skill for core framework
  2. Load supporting skill 1 for [specific aspect]
  3. Load supporting skill 2 for [quality check]
  4. Synthesize into deliverable
```

**Example:**
```
Task: "Create viral LinkedIn post about our new feature"

Skills loaded:
1. viral-expert (primary) - STEPPS framework, hook formulas
2. brand-voice-guidelines (supporting) - Tone, vocabulary
3. audience-research (supporting) - Strategic Sarah persona

Execution:
1. viral-expert: Design post structure with STEPPS (Social currency, Emotion)
2. brand-voice-guidelines: Write copy matching brand voice
3. audience-research: Tailor messaging to Strategic Sarah pain points
4. Synthesize: Viral post that's on-brand and persona-targeted
```

---

## Cross-References

Related skills: [@skill-developer]
Related resources: [@skill-developer/resources/skill-examples.md]
