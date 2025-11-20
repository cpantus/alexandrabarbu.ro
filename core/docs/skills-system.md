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

**Enforcement levels (v5.2.0):**
- **suggest**: Informational reminder only (most skills)
- **warn**: Strong warning message, non-blocking (quality-critical skills)
- **require**: AUTO-LOADS skill into Claude's context (design, security, compliance skills)

**How enforcement works (Application Guarantee):**
1. Skill matches prompt → check enforcement level
2. If `require` → AUTO-LOAD skill content into Claude's context
3. Uses progressive disclosure: tier-based loading (200-500 tokens)
4. Session-scoped cache prevents duplicate loads within same conversation
5. Quality GUARANTEED via mandatory context injection (not just awareness)

**The Application Guarantee:**
"require" enforcement exists to GUARANTEE quality, not just awareness.
- If reading the skill doesn't guarantee better output → use "warn"
- If ignoring the skill still produces acceptable quality → use "suggest"
- If the skill MUST be applied for acceptable quality → use "require"

**Examples:**
- diagram-drawing: require (ignoring = AI slop aesthetics = unacceptable)
- security-guidelines: require (ignoring = vulnerabilities = unacceptable)
- frontend-best-practices: warn (helpful but not critical)
- code-style-guide: suggest (nice to have)

**The contract:** When a skill is marked "require", the system GUARANTEES it's in Claude's context and Claude MUST apply it. Reading without application is useless.

**Progressive disclosure:**
- Main skill file: 500 lines (quick reference, summaries)
- Resources: Detailed guides loaded on-demand via `@resources/[topic].md`
- Token savings: 40-60% vs loading monolithic files

## v5.4.0 Structure Requirements (Component Reuse = Quality Guarantee)

All skills created after v5.4.0 MUST include:

1. **Task Decomposition Override Section**
   - Overrides Claude's default task breakdown behavior
   - Provides skill-specific MANDATORY execution sequence (typically 3-phase)
   - Includes ❌ PROHIBITED anti-patterns with consequences
   - Includes ✅ MANDATORY application steps with sub-decisions
   - Output Acknowledgment formats for validation

2. **Language Standards Section**
   - Enforces directive language (YOU MUST/DO NOT)
   - Prohibits weak language (should/consider/might)
   - Rationale: "Weak language leads to inconsistent application"

**Skill-specific phase patterns:**
- **Design skills**: "Design System Decisions" → "Implementation" → "Validation"
- **Technical skills**: "Architecture Analysis" → "Implementation" → "Testing"
- **Process skills**: "Context Analysis" → "Execution" → "Review"

**Size limit:** Core skill ≤500 lines. Use `/resources/` subdirectories for detailed reference material.

**Validation:** Use `/pattern component_skill` to validate structure before production use.

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
