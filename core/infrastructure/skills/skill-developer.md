# Skill Developer Guide

**Last Updated:** 2025-11-03
**Skill Type:** Meta-skill (guides creation of other skills)
**Status:** Production-ready

---

## Purpose

This skill guides you in creating new marketing skills for the Claude Code skills system. Use this when you need to:
- Create a custom skill for a new marketing domain
- Extend the existing 7 skills with new capabilities
- Adapt skills for different industries or use cases
- Document marketing knowledge in skill format

---

## Quick Reference

### Skill Anatomy

```markdown
# [Skill Name]

**Last Updated:** [Date]
**Skill Type:** [universal|domain-specific|guardrail]

## Purpose
[Why this skill exists, when to use it]

## Quick Reference
[1-page summary: key frameworks, checklists, decision trees]

## Core Knowledge
[Main content: 300-400 lines of detailed guidance]

## Resources
[@resources/file1.md] - [Description]
[@resources/file2.md] - [Description]

## Usage Patterns
[When/how to apply this skill]

## Quality Checklist
[Self-review criteria]
```

### Skill Types

1. **Universal Skills** - Used in 70%+ of tasks
   - Examples: brand-voice-guidelines, audience-research
   - Priority: Critical
   - Auto-activate: Broad keywords

2. **Domain-Specific Skills** - Topic-triggered
   - Examples: seo-optimization, campaign-strategy-frameworks
   - Priority: High/Medium
   - Auto-activate: Specific keywords + intent patterns

3. **Guardrail Skills** - Risk-triggered
   - Examples: compliance-and-legal
   - Priority: Critical
   - Auto-activate: Risky patterns (claims, comparisons)

---

## Skill Creation Checklist

### Planning Phase
- [ ] **Identify knowledge domain** - What marketing area does this cover?
- [ ] **Determine skill type** - Universal, domain-specific, or guardrail?
- [ ] **Define trigger patterns** - What prompts should activate this skill?
- [ ] **Assess resource needs** - What detailed guides belong in resources/?
- [ ] **Estimate token budget** - Main file 2-4K tokens, resources 2-10K each

### Main Skill File (500 lines max)
- [ ] **Purpose section** - Clear explanation of when to use
- [ ] **Quick reference** - 1-page summary (no more!)
- [ ] **Core knowledge** - Frameworks, checklists, decision trees
- [ ] **Resource links** - Point to detailed guides with @resources/
- [ ] **Usage patterns** - Examples of when/how to apply
- [ ] **Quality checklist** - Self-review criteria

### Resource Files (Progressive Disclosure)
- [ ] **Create 2-4 resource files** per skill
- [ ] **Detailed implementation guides** - Step-by-step processes
- [ ] **Templates and examples** - Copy-paste ready content
- [ ] **Edge cases and troubleshooting** - Handle complexity
- [ ] **Cross-references** - Link to other resources/skills

### skill-rules.json Configuration
- [ ] **Add skill entry** to `.claude/skill-rules.json`
- [ ] **Configure prompt triggers** - 15-30 keywords + 4-8 intent patterns
- [ ] **Set priority level** - Critical, high, medium, or low
- [ ] **Add file triggers** - Path patterns + content patterns
- [ ] **Write reminder message** - Clear, actionable, non-intrusive

### Testing & Validation
- [ ] **Test auto-activation** - Does it trigger on relevant prompts?
- [ ] **Check token efficiency** - 40-60% savings vs monolithic?
- [ ] **Validate progressive disclosure** - Main file → resources flow?
- [ ] **Review quality** - CMO-level guidance?
- [ ] **Update documentation** - Add to SKILLS-GUIDE.md

---

## Step-by-Step Creation Process

### Step 1: Plan the Skill (15 minutes)

**Questions to answer:**
1. What marketing knowledge does this skill contain?
2. When should it auto-activate? (Broad or narrow triggers?)
3. What's the most common use case? (Optimize for 80%)
4. What detailed guides belong in resources/? (Progressive disclosure)

**Example:**
```
Skill: email-marketing-optimization
Type: Domain-specific
Triggers: "email", "subject line", "open rate", "deliverability"
Resources:
  - email-deliverability-checklist.md (technical setup)
  - subject-line-formulas.md (copywriting tactics)
  - email-testing-framework.md (A/B test design)
```

### Step 2: Create Main Skill File (30 minutes)

**Template structure:**

```markdown
# [Skill Name]

**Last Updated:** [Date]
**Skill Type:** [universal|domain-specific|guardrail]

---

## Purpose

[2-3 sentences: What problem does this solve?]

Use this skill when:
- [Specific use case 1]
- [Specific use case 2]
- [Specific use case 3]

---

## Quick Reference

### [Framework/Process Name]

**[Key concept 1]**
- Point 1
- Point 2
- Point 3

**[Key concept 2]**
- Point 1
- Point 2

### Checklist: [Common Task]

1. [ ] [Step 1]
2. [ ] [Step 2]
3. [ ] [Step 3]

### Decision Tree: [Common Decision]

```
IF [condition] → THEN [action]
ELSE IF [condition] → THEN [action]
ELSE → [default action]
```

---

## Core Knowledge

### [Section 1: Foundational Concepts]

[Content: 50-100 lines]

### [Section 2: Key Frameworks]

[Content: 50-100 lines]

### [Section 3: Application Guidelines]

[Content: 50-100 lines]

### [Section 4: Common Pitfalls]

[Content: 30-50 lines]

---

## Resources

- [@resources/[file1].md] - [Description of detailed guide]
- [@resources/[file2].md] - [Description of detailed guide]
- [@resources/[file3].md] - [Description of detailed guide]

---

## Usage Patterns

**Pattern 1: [Common scenario]**
```
Load: [This skill] + [@other-skill]
Apply: [Framework from this skill]
Output: [Expected deliverable]
```

**Pattern 2: [Another scenario]**
```
Load: [This skill] + [@resources/specific-file]
Apply: [Specific technique]
Output: [Expected deliverable]
```

---

## Quality Checklist

Before delivering work using this skill:

**[Category 1]:**
- [ ] [Check 1]
- [ ] [Check 2]

**[Category 2]:**
- [ ] [Check 1]
- [ ] [Check 2]

**[Category 3]:**
- [ ] [Check 1]
- [ ] [Check 2]
```

### Step 3: Create Resource Files (20-30 minutes each)

**Resource file template:**

```markdown
# [Resource Name]

**Parent Skill:** [skill-name]
**Last Updated:** [Date]
**Token Budget:** [Estimated tokens]

---

## Purpose

[Why this resource exists, when to load it]

---

## [Section 1: Detailed Implementation Guide]

### Step 1: [First step]
[Detailed instructions with examples]

### Step 2: [Second step]
[Detailed instructions with examples]

[Continue...]

---

## [Section 2: Templates]

### Template 1: [Template name]
```
[Copy-paste ready template]
```

**When to use:** [Guidance]
**Customization:** [What to change]

---

## [Section 3: Examples]

### Example 1: [Scenario]
**Context:** [Background]
**Approach:** [What was done]
**Result:** [Outcome]
**Lessons:** [Takeaways]

---

## [Section 4: Edge Cases]

### Edge Case 1: [Unusual scenario]
**Problem:** [What goes wrong]
**Solution:** [How to handle]

---

## Cross-References

Related skills: [@skill1], [@skill2]
Related resources: [@resources/other-file]
```

### Step 4: Configure Auto-Activation (15 minutes)

**Add to `.claude/skill-rules.json`:**

```json
"[skill-name]": {
  "type": "domain-specific",
  "enforcement": "suggest",
  "priority": "high",
  "description": "[One-line description]",
  "skillPath": ".claude/skills/[skill-name].md",
  "resources": [
    ".claude/skills/resources/[resource1].md",
    ".claude/skills/resources/[resource2].md"
  ],
  "promptTriggers": {
    "keywords": [
      "keyword1", "keyword2", "keyword3",
      "phrase 1", "phrase 2"
    ],
    "intentPatterns": [
      "(verb).*?(noun|phrase)",
      "pattern2",
      "pattern3"
    ]
  },
  "fileTriggers": {
    "pathPatterns": [
      "**/*-[type].md",
      "[directory]/**/*.md"
    ],
    "contentPatterns": [
      "Marker:",
      "Another Marker:"
    ]
  },
  "autoActivate": true,
  "reminderMessage": "[Icon] [Category] Check - [Action to take]"
}
```

**Keyword selection tips:**
- Start with 15-30 keywords
- Include synonyms and variations
- Add domain-specific jargon
- Test with common prompts

**Intent pattern tips:**
- Match verb + noun combinations: `(create|build|design).*?(campaign|strategy)`
- Capture question patterns: `(how|what|why).*?(target|segment)`
- Use optional groups: `(analyze|review).*?(data|metrics|performance)?`

### Step 5: Test & Validate (15 minutes)

**Auto-activation tests:**
```bash
# Test 1: Direct keyword match
"Create an email campaign"  → Should trigger skill

# Test 2: Intent pattern match
"How do I optimize subject lines?" → Should trigger skill

# Test 3: File trigger
Edit file: campaign-email-draft.md → Should trigger skill

# Test 4: No false positives
"Update the homepage" → Should NOT trigger (unless relevant)
```

**Token efficiency test:**
```
Before (monolithic): Load 15-30KB knowledge file (6-12K tokens)
After (progressive): Load 2-4KB main + 0-10KB resource (1-6K tokens)
Savings: 40-70%
```

**Quality validation:**
- [ ] CMO-level guidance (not generic fluff)
- [ ] Actionable frameworks (not theory)
- [ ] Real examples (not hypotheticals)
- [ ] Clear checklists (not vague advice)

---

## Skill Templates

### Template 1: Content Creation Skill

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

### Template 2: Analysis Skill

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

### Template 3: Strategy Skill

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

### Template 4: Execution Skill

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

## Quality Standards for Skills

### Excellent Skill (Ship It)
✅ Purpose is crystal clear (no ambiguity)
✅ Quick reference fits on 1 page
✅ Core knowledge is actionable (not theory)
✅ Resources provide deep implementation details
✅ Real examples, not hypotheticals
✅ Quality checklist is specific and useful
✅ Auto-activates reliably on relevant prompts
✅ 40-60% token savings vs monolithic
✅ CMO-level guidance quality

### Good Skill (Needs Refinement)
⚠️ Purpose is clear but could be more specific
⚠️ Quick reference is 1.5 pages (could compress)
⚠️ Core knowledge mixes theory and practice
⚠️ Some resources are generic
⚠️ Examples are realistic but limited
⚠️ Quality checklist is helpful but generic
⚠️ Auto-activation works but has false positives
⚠️ 20-40% token savings
⚠️ Director-level guidance quality

### Poor Skill (Revise Before Shipping)
❌ Purpose is vague or overly broad
❌ Quick reference is 3+ pages (not quick!)
❌ Core knowledge is mostly theory
❌ Resources lack implementation detail
❌ Examples are hypothetical or missing
❌ Quality checklist is generic ("check quality")
❌ Auto-activation is unreliable
❌ <20% token savings (not progressive enough)
❌ Junior marketer-level guidance

---

## Skill Maintenance

### When to Update Skills

**Immediate updates (within 1 week):**
- Major platform algorithm changes (LinkedIn, Google, etc.)
- New legal/compliance requirements
- Critical errors or outdated information
- User feedback about poor auto-activation

**Quarterly updates:**
- Refresh benchmarks and performance data
- Add new examples and case studies
- Expand resource files with learnings
- Refine auto-activation keywords based on usage

**Annual updates:**
- Major framework overhauls
- Industry trend adaptations
- Competitive landscape shifts
- Technology/tool updates

### Update Process

1. **Review skill metrics** - Activation rate, token usage, user feedback
2. **Identify gaps** - What's missing? What's outdated?
3. **Update main file** - Refresh Quick Reference, Core Knowledge
4. **Update resources** - Add new guides, deprecate old ones
5. **Refine triggers** - Add/remove keywords, adjust patterns
6. **Test changes** - Validate auto-activation, check token efficiency
7. **Document changes** - Update Last Updated date, add changelog

---

## Troubleshooting

### Problem: Skill doesn't auto-activate

**Possible causes:**
- Keywords too specific or niche
- Intent patterns too narrow
- Skill priority too low (bumped by higher priority skills)
- Max skills per prompt limit reached (3 skills)

**Solutions:**
- Add broader keywords (synonyms, related terms)
- Expand intent patterns with OR logic
- Increase priority (if truly critical)
- Review which skills are activating instead

### Problem: Too many false positives

**Possible causes:**
- Keywords too generic
- Intent patterns too broad
- File triggers matching unrelated files

**Solutions:**
- Remove generic keywords, keep specific ones
- Narrow intent patterns with AND logic
- Add negative patterns to exclude false matches
- Adjust file trigger paths to be more specific

### Problem: Token savings are low (<20%)

**Possible causes:**
- Main skill file too large (>500 lines)
- Too much duplication between main and resources
- Resources not being used (all content in main file)

**Solutions:**
- Move detailed guides to resource files
- Keep main file to Quick Reference + Core Knowledge only
- Ensure progressive disclosure (main → resources)
- Split large resources into focused files

### Problem: Skill quality is poor

**Possible causes:**
- Generic advice instead of actionable frameworks
- Hypothetical examples instead of real scenarios
- Theory-heavy instead of implementation-focused
- Vague checklists instead of specific criteria

**Solutions:**
- Replace theory with frameworks (step-by-step)
- Add real examples with before/after
- Focus on "how" not "why"
- Make checklists specific and measurable

---

## Examples: Creating New Skills

### Example 1: Email Deliverability Skill

**Planning:**
- Domain: Email marketing (technical setup)
- Type: Domain-specific (high priority)
- Triggers: "email", "deliverability", "bounce", "spam", "inbox"
- Resources: SPF/DKIM/DMARC setup, IP warming, list hygiene

**Main file structure:**
```markdown
# Email Deliverability Optimization

## Quick Reference
- Authentication checklist (SPF, DKIM, DMARC)
- Spam score factors (content, sending patterns)
- List hygiene rules (bounces, engagement)

## Core Knowledge
- Email authentication (high-level)
- Deliverability best practices
- Monitoring and troubleshooting

## Resources
- @resources/email-authentication-setup.md (technical guides)
- @resources/ip-warming-schedule.md (sending ramp-up)
- @resources/list-hygiene-automation.md (maintenance workflows)
```

### Example 2: Video Marketing Skill

**Planning:**
- Domain: Video content creation and distribution
- Type: Domain-specific (medium priority)
- Triggers: "video", "youtube", "tiktok", "reel", "video script"
- Resources: Scriptwriting templates, platform specs, editing workflows

**Main file structure:**
```markdown
# Video Marketing Optimization

## Quick Reference
- Video hook formulas (first 3 seconds)
- Platform optimization (YouTube vs TikTok vs LinkedIn)
- Thumbnail design principles

## Core Knowledge
- Video content strategy
- Scriptwriting frameworks
- Distribution tactics

## Resources
- @resources/video-scriptwriting-templates.md (hooks, scripts)
- @resources/platform-video-specs.md (formats, lengths)
- @resources/video-editing-workflows.md (production process)
```

---

## Next Steps

After creating a new skill:

1. **Test it in production** - Use on 5-10 real tasks
2. **Gather feedback** - What's missing? What's confusing?
3. **Iterate** - Refine based on usage
4. **Document** - Add to SKILLS-GUIDE.md
5. **Share learnings** - Update this skill-developer guide

---

## Resources

- [@.claude/skill-rules.json] - Auto-activation configuration
- [@.claude/skills/] - Existing skills for reference
- [ARCHITECTURE.md] - Skills system architecture
- [docs/SKILLS-GUIDE.md] - User guide for skills system

---

## Quality Checklist: Is This Skill Ready?

**Planning:**
- [ ] Domain clearly defined
- [ ] Skill type determined (universal, domain-specific, guardrail)
- [ ] Trigger patterns identified
- [ ] Resource structure planned

**Main File:**
- [ ] Purpose section is clear (2-3 sentences)
- [ ] Quick reference fits on 1 page
- [ ] Core knowledge is 300-400 lines (not too long!)
- [ ] Resource links are present
- [ ] Usage patterns included
- [ ] Quality checklist provided

**Resources:**
- [ ] 2-4 resource files created
- [ ] Each resource has clear purpose
- [ ] Detailed implementation guides present
- [ ] Templates and examples included
- [ ] Token budget is reasonable (2-10K per resource)

**Auto-Activation:**
- [ ] Added to skill-rules.json
- [ ] 15-30 keywords configured
- [ ] 4-8 intent patterns configured
- [ ] Priority level set appropriately
- [ ] Reminder message is clear and actionable

**Testing:**
- [ ] Auto-activation works on sample prompts
- [ ] No false positives on unrelated prompts
- [ ] 40-60% token savings vs monolithic
- [ ] Quality is CMO-level (not generic)

---

**Status:** If all checks pass → Ship it! ✅
**If some checks fail:** Iterate and test again.
