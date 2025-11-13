# Skills System (Auto-Activating Knowledge)

**Your knowledge is organized as auto-activating skills** in `.claude/skills/`:

## Available Skills

1. **brand-voice-guidelines** - Voice, tone, vocabulary, quality checklists
2. **audience-research** - Personas, segmentation, buying behavior
3. **campaign-strategy-frameworks** - Campaign planning, workflow patterns
4. **seo-optimization** - Traditional + LLM SEO strategies
5. **marketing-analytics** - Metrics, testing, attribution
6. **automation-workflows** - Marketing ops, integrations
7. **compliance-and-legal** - Regulations, approval workflows

## How Skills Work

**Auto-activation (via hooks):**
- UserPromptSubmit hook detects keywords/intent patterns
- Relevant skills are suggested automatically (max 3 per prompt)
- No manual @-referencing needed in most cases

**Enforcement levels (v5.1.0):**
- **suggest**: Informational reminder only (most skills)
- **warn**: Strong warning message, non-blocking (quality-critical skills)
- **require**: BLOCKS execution until skill is read (design, security, compliance skills)

**How enforcement works:**
1. Skill matches prompt → check enforcement level
2. If `require` → verify skill was read (via session cache)
3. If not read → BLOCK with clear instructions
4. User reads skill → cache updates → automatically unblocked
5. Quality enforced system-wide without manual checks

**Progressive disclosure:**
- Main skill file: 500 lines (quick reference, summaries)
- Resources: Detailed guides loaded on-demand via `@resources/[topic].md`
- Token savings: 40-60% vs loading monolithic files

**When to load manually:**
- Complex tasks requiring deep expertise from 2-4 skills
- Reference with: `@.claude/skills/brand-voice-guidelines.md`
- Load resources: `@.claude/skills/resources/tone-by-format.md`

**Skill activation priority:**
- **Critical**: brand-voice-guidelines (80%+ of content tasks)
- **High**: audience-research, campaign-strategy-frameworks
- **Medium**: seo-optimization, marketing-analytics
- **As-needed**: automation-workflows, compliance-and-legal

---

**See also:** Main CLAUDE.md Capability Index for quick reference
**Load this file:** `/load skills`
