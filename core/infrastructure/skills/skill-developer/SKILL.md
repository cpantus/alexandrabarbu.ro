---
name: "skill-developer"
description: "Auto-activates when user mentions creating, updating, or designing skills"
---

# Skill Developer Guide

## Purpose

This skill guides you in creating new skills for the Claude Code skills system. Use this when you need to:
- Create a custom skill for a new domain
- Extend existing skills with new capabilities
- Adapt skills for different industries or use cases
- Document knowledge in skill format

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

## Task Decomposition Override (v5.4.0)

When this skill applies (creating/updating a skill), **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE (Generic skill creation):
1. Create skill file with generic template
2. Add some examples and best practices
3. Configure auto-activation with random keywords
4. Skip validation

### ✅ MANDATORY SEQUENCE (Quality-Guaranteed Skill Creation):

**Phase 1: Skill Design Decisions** (Make 3 explicit decisions)
1. **Skill Scope & Type**: Define domain and classification
   - Reference: "Skill Types" section above
   - Output: Type classification with rationale (e.g., "Domain-specific: Email deliverability - technical email setup only, not copywriting")

2. **Progressive Disclosure Strategy**: Plan main file vs resources split
   - Reference: "Skill Anatomy" section above
   - Output: Content allocation (e.g., "Main file: 300 lines authentication checklist + monitoring. Resources: SPF/DKIM/DMARC technical guides (3 files, 5-7KB each)")

3. **Auto-Activation Triggers**: Define keywords and intent patterns
   - Reference: @skill-developer/resources/skill-templates.md
   - Output: Trigger specification (e.g., "Keywords: email, deliverability, bounce, spam (15 total). Patterns: (setup|configure).*?(email|authentication), (improve|fix).*?(deliverability|inbox)")

**Output Acknowledgment After Phase 1:**
```
Skill Developer Applied:
- Skill Scope: [Type + domain boundaries]
- Progressive Disclosure: [Main file content + resource breakdown]
- Auto-Activation: [Keywords count + pattern examples]
```

**Phase 2: Implementation** (Apply Phase 1 decisions)
4. Create main skill file (≤500 lines) with Quick Reference + Core Knowledge
5. Create 2-4 resource files with detailed implementation guides
6. Configure skill-rules.json with triggers from Phase 1
7. Add quality checklist and usage patterns

**Phase 3: Validation** (Verify quality criteria)
8. Verify scope: Main file ≤500 lines, Quick Reference fits 1 page
9. Verify progressive disclosure: 40-60% token savings vs monolithic
10. Verify auto-activation: Tests on sample prompts, no false positives
11. Verify quality: CMO-level guidance, actionable frameworks, real examples

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** Generic skills dilute system quality and waste tokens. The 3-phase approach GUARANTEES: (1) clear scope boundaries prevent overlap, (2) progressive disclosure maximizes token efficiency, (3) validated triggers ensure reliable auto-activation. Quality skills compound knowledge; poor skills fragment it. This is MANDATORY for system integrity.

---

## Language Standards (v5.4.0)

**YOU MUST use directive language throughout this skill:**

**Required Directives:**
- ✅ "YOU MUST use", "DO NOT use", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "it's recommended", "please", "ideally"

**Section Headers:**
- ✅ "Required Standards", "Rules", "Requirements", "Anti-Patterns to Avoid"
- ❌ "Best Practices", "Guidelines", "Recommendations", "Suggestions"

**Examples of Directive Transformation:**
- ❌ "Consider using X" → ✅ "YOU MUST use X"
- ❌ "You should avoid Y" → ✅ "DO NOT use Y (PROHIBITED)"
- ❌ "It's recommended to Z" → ✅ "MANDATORY: Z"
- ❌ "Try to follow pattern P" → ✅ "ALWAYS follow pattern P"

**Enforcement Note:** Skills with weak language will be rejected by pre-tool-use-write.ts hook.

---

## Step-by-Step Creation Process

### Step 1: Plan the Skill (15 minutes)

**Questions to answer:**
1. What knowledge does this skill contain?
2. When will it auto-activate? (Broad or narrow triggers?)
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

Use the template from @skill-developer/resources/skill-templates.md

**Key sections:**
- Purpose: 2-3 sentences, clear use cases
- Quick Reference: 1-page summary (frameworks, checklists, decision trees)
- Core Knowledge: 300-400 lines of detailed guidance
- Resources: Links to detailed guides
- Usage Patterns: When/how to apply
- Quality Checklist: Self-review criteria

### Step 3: Create Resource Files (20-30 minutes each)

Use the resource template from @skill-developer/resources/skill-templates.md

**Each resource should include:**
- Purpose statement (when to load it)
- Detailed implementation guides (step-by-step)
- Templates (copy-paste ready)
- Examples (real scenarios with outcomes)
- Edge cases (unusual situations and solutions)
- Cross-references (related skills/resources)

### Step 4: Configure Auto-Activation (15 minutes)

Add to `.claude/skill-rules.json` using the configuration template from @skill-developer/resources/skill-templates.md

**Key configuration:**
- 15-30 keywords (include synonyms, variations, jargon)
- 4-8 intent patterns (verb+noun combinations, question patterns)
- Priority level (critical, high, medium, low)
- File triggers (path and content patterns)
- Reminder message (clear, actionable, non-intrusive)

### Step 5: Test & Validate (15 minutes)

**Auto-activation tests:**
```bash
# Test 1: Direct keyword match
"Create an email campaign" → Should trigger skill

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

## Resources

**Skill Development Guides:**
- [@skill-developer/resources/skill-templates.md] - Templates for main files, resources, and skill-rules.json configuration
- [@skill-developer/resources/skill-examples.md] - Complete examples (email deliverability, video marketing) with planning and implementation
- [@skill-developer/resources/validation-checklists.md] - Quality standards, testing procedures, and troubleshooting guides

**System References:**
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
