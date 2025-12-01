# Skill Validation Checklists

**Parent Skill:** skill-developer
**Last Updated:** 2025-11-16
**Purpose:** Comprehensive checklists for validating skill quality before deployment

---

## Skill Creation Checklist

### Planning Phase
- [ ] **Identify knowledge domain** - What marketing area does this cover?
- [ ] **Determine skill type** - Universal, domain-specific, or guardrail?
- [ ] **Define trigger patterns** - What prompts will activate this skill?
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

## Quality Standards for Skills

### Excellent Skill (Ship It) ✅
✅ Purpose is crystal clear (no ambiguity)
✅ Quick reference fits on 1 page
✅ Core knowledge is actionable (not theory)
✅ Resources provide deep implementation details
✅ Real examples, not hypotheticals
✅ Quality checklist is specific and useful
✅ Auto-activates reliably on relevant prompts
✅ 40-60% token savings vs monolithic
✅ CMO-level guidance quality

### Good Skill (Needs Refinement) ⚠️
⚠️ Purpose is clear but needs more specificity
⚠️ Quick reference is 1.5 pages (needs compression)
⚠️ Core knowledge mixes theory and practice
⚠️ Some resources are generic
⚠️ Examples are realistic but limited
⚠️ Quality checklist is helpful but generic
⚠️ Auto-activation works but has false positives
⚠️ 20-40% token savings
⚠️ Director-level guidance quality

### Poor Skill (Revise Before Shipping) ❌
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

## Final Quality Checklist: Is This Skill Ready?

### Planning
- [ ] Domain clearly defined
- [ ] Skill type determined (universal, domain-specific, guardrail)
- [ ] Trigger patterns identified
- [ ] Resource structure planned

### Main File
- [ ] Purpose section is clear (2-3 sentences)
- [ ] Quick reference fits on 1 page
- [ ] Core knowledge is 300-400 lines (not too long!)
- [ ] Resource links are present
- [ ] Usage patterns included
- [ ] Quality checklist provided

### Resources
- [ ] 2-4 resource files created
- [ ] Each resource has clear purpose
- [ ] Detailed implementation guides present
- [ ] Templates and examples included
- [ ] Token budget is reasonable (2-10K per resource)

### Auto-Activation
- [ ] Added to skill-rules.json
- [ ] 15-30 keywords configured
- [ ] 4-8 intent patterns configured
- [ ] Priority level set appropriately
- [ ] Reminder message is clear and actionable

### Testing
- [ ] Auto-activation works on sample prompts
- [ ] No false positives on unrelated prompts
- [ ] 40-60% token savings vs monolithic
- [ ] Quality is CMO-level (not generic)

---

## Auto-Activation Test Cases

### Test 1: Direct Keyword Match
```
Prompt: "Create an email campaign"
Expected: Should trigger skill if "email" or "campaign" in keywords
Result: [Pass/Fail]
```

### Test 2: Intent Pattern Match
```
Prompt: "How do I optimize subject lines?"
Expected: Should trigger if pattern matches (optimize.*subject)
Result: [Pass/Fail]
```

### Test 3: File Trigger
```
Action: Edit file: campaign-email-draft.md
Expected: Should trigger if path pattern matches
Result: [Pass/Fail]
```

### Test 4: No False Positives
```
Prompt: "Update the homepage"
Expected: Should NOT trigger (unless skill is relevant to homepage)
Result: [Pass/Fail]
```

---

## Token Efficiency Validation

### Before (Monolithic Approach)
- **Single large file:** 15-30KB knowledge file
- **Token count:** 6-12K tokens loaded upfront
- **Progressive disclosure:** None - all content loaded always

### After (Progressive Disclosure)
- **Main file:** 2-4KB core knowledge
- **Resources:** 0-10KB loaded on-demand
- **Token count:** 1-6K tokens (main + selected resources)
- **Savings:** 40-70% reduction

### Calculate Savings
```
Before tokens: [X]
After tokens: [Y]
Savings %: ((X - Y) / X) * 100
Target: >40% savings
```

---

## Quality Validation Rubric

### CMO-Level Guidance (Target Quality)
✅ **Actionable frameworks** - Step-by-step processes, not vague advice
✅ **Real examples** - Actual campaigns, metrics, outcomes
✅ **Specific checklists** - Measurable criteria, not generic items
✅ **Strategic depth** - Considers business context, trade-offs
✅ **Implementation focus** - How to execute, not just what to do

### Director-Level Guidance (Acceptable, Needs Work)
⚠️ **Mix of frameworks and theory** - Some actionable, some conceptual
⚠️ **Realistic scenarios** - Plausible but limited real examples
⚠️ **Helpful checklists** - Useful but could be more specific
⚠️ **Tactical depth** - Focuses on execution, less on strategy
⚠️ **Some implementation gaps** - Missing edge cases or nuance

### Junior-Level Guidance (Unacceptable)
❌ **Mostly theory** - Concepts without application
❌ **Hypothetical examples** - Generic scenarios, no real data
❌ **Generic checklists** - "Ensure quality", "Check performance"
❌ **Surface-level** - No depth or strategic thinking
❌ **Implementation missing** - What to do, but not how

---

## Troubleshooting Common Issues

### Issue: Skill Doesn't Auto-Activate

**Symptoms:**
- Relevant prompts don't trigger skill
- Activation rate < 20% of expected prompts

**Diagnosis:**
1. Check keywords: Too specific or niche?
2. Check patterns: Too narrow or complex?
3. Check priority: Being bumped by higher priority skills?
4. Check limit: Max skills per prompt reached?

**Solutions:**
- Add broader keywords (synonyms, related terms)
- Expand intent patterns with OR logic
- Increase priority (if truly critical)
- Review which skills are activating instead

---

### Issue: Too Many False Positives

**Symptoms:**
- Skill triggers on unrelated prompts
- User complaints about irrelevant activations

**Diagnosis:**
1. Check keywords: Too generic?
2. Check patterns: Too broad?
3. Check file triggers: Matching unrelated files?

**Solutions:**
- Remove generic keywords, keep specific ones
- Narrow intent patterns with AND logic
- Add negative patterns to exclude false matches
- Adjust file trigger paths to be more specific

---

### Issue: Low Token Savings (<20%)

**Symptoms:**
- Main file + resources ≈ old monolithic file size
- Minimal progressive disclosure benefit

**Diagnosis:**
1. Main file size: >500 lines?
2. Duplication: Content repeated in main + resources?
3. Resources unused: All content in main file?

**Solutions:**
- Move detailed guides to resource files
- Keep main file to Quick Reference + Core Knowledge only
- Ensure progressive disclosure (main → resources)
- Split large resources into focused files

---

### Issue: Poor Quality Guidance

**Symptoms:**
- Generic advice instead of actionable frameworks
- Hypothetical examples instead of real scenarios
- Theory-heavy content

**Diagnosis:**
1. Content type: Mostly "why" vs "how"?
2. Examples: Hypothetical vs real?
3. Checklists: Generic vs specific?
4. Depth: Surface-level vs strategic?

**Solutions:**
- Replace theory with frameworks (step-by-step)
- Add real examples with before/after
- Focus on "how" not "why"
- Make checklists specific and measurable

---

## Status Decision Matrix

### Ship It ✅
- All "Excellent Skill" criteria met
- >40% token savings
- CMO-level quality
- Auto-activation tested and working

### Iterate 🔄
- Meets "Good Skill" criteria
- 20-40% token savings
- Director-level quality
- Some test failures

### Revise ❌
- "Poor Skill" characteristics present
- <20% token savings
- Junior-level quality
- Major test failures

---

**If all checks pass → Ship it!** ✅
**If some checks fail:** Iterate and test again.
