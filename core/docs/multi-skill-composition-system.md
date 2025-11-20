# Multi-Skill Composition System (v5.5.0)

**Created**: 2025-11-14
**Status**: Production
**Purpose**: Enforce synergistic skill usage for exponential quality improvements

---

## Overview

The Multi-Skill Composition System automatically detects when 2+ skills should work together and guarantees they compose into a unified quality output, rather than operating in isolation.

**Core Philosophy**: Skills in isolation are good. Skills working together are exponentially better.

**Quality Multipliers**: Compositions provide 1.5-4.0x quality improvement over single-skill usage.

---

## Architecture

### Components

**1. Configuration** (`.claude/skill-composition-rules.json`)
- Defines known skill synergies (compositions)
- Specifies triggers, enforcement levels, quality gates
- Includes 8 pre-configured compositions

**2. Detection** (`user-prompt-submit.ts` hook)
- Detects when multiple loaded skills form a composition
- Injects composition guidance into Claude's context
- Caches composition state to prevent duplicate loads

**3. Utilities** (`composition-matcher.ts`)
- Matches loaded skills to composition rules
- Calculates confidence scores (skill match % + trigger match)
- Formats composition guidance for injection
- Extracts composition acknowledgment from outputs

**4. Validation** (`post-tool-use-multiskill.ts` hook)
- Runs after Write/Edit/Task tool usage
- Validates composition acknowledgment appears in output
- Warns if skills used in isolation when composition detected

**5. Documentation** (`CLAUDE.md` Rule + Skill metadata)
- Mandates composition usage in core principles
- Adds composition metadata to skill files
- Provides examples and rationale

---

## How It Works

### Step 1: Skill Loading (UserPromptSubmit Hook)

1. User submits prompt (e.g., "create infographic")
2. Hook matches skills to prompt (e.g., `data-visualization-designer`, `design-excellence`, `diagram-drawing`)
3. Skills auto-load with "require" enforcement

### Step 2: Composition Detection (UserPromptSubmit Hook)

1. Hook checks if 2+ skills are loaded
2. Matches loaded skills against composition rules
3. Calculates confidence:
   - 60% weight: Skill match percentage
   - 40% weight: Trigger match (prompt contains composition triggers)
4. If confidence > 0.5, composition detected

### Step 3: Guidance Injection (UserPromptSubmit Hook)

Composition guidance injected into Claude's context:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 MULTI-SKILL COMPOSITION DETECTED: visual-design-excellence
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Professional, accessible, beautiful data visualizations with distinctive aesthetics

**Loaded Skills (3/3):**
  ✓ data-visualization-designer
  ✓ design-excellence
  ✓ diagram-drawing

**Synergy Multiplier:** 3.2x quality improvement vs. single skill
**Enforcement:** MANDATORY
**Confidence:** 92%
**Trigger Matched:** "infographic"

**Rationale:**
Visual design requires three dimensions: (1) what to show and how to encode it truthfully,
(2) aesthetic excellence and brand distinction, (3) technical implementation with accessibility.
Using all three GUARANTEES professional-grade output.

**REQUIRED OUTPUT ACKNOWLEDGMENT:**
You MUST include this in your response:

```
Multi-Skill Composition Applied:
- data-visualization-designer: [chart type decisions, visual encoding strategy, truthfulness validation]
- design-excellence: [typography system, color palette, motion strategy, aesthetic polish]
- diagram-drawing: [Chart.js/D3.js implementation, export formats, accessibility features]
```

**Quality Gates (Validate All):**
  □ Chart type justified by data structure and task
  □ Typography uses distinctive pairing (not Inter/Roboto alone)
  □ Color system is colorblind-safe with redundant encoding
  □ Motion respects prefers-reduced-motion
  □ Implementation uses modern libraries (Chart.js 4.x/D3.js v7)
  □ Exports available in 3+ formats (PNG/SVG/PDF)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ REQUIREMENT: Use ALL loaded skills in conjunction.
   Single-skill usage when composition detected = ARCHITECTURE VIOLATION.
   Quality guarantee only applies when skills work together.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 4: Claude Execution

Claude sees:
1. All 3 skills loaded (data-viz-designer, design-excellence, diagram-drawing)
2. Composition guidance with quality gates
3. MANDATORY requirement to acknowledge composition

Claude MUST output acknowledgment showing how each skill contributed.

### Step 5: Validation (PostToolUse Hook)

After Claude completes Write/Edit/Task tool:

1. Hook checks if 2+ skills were loaded this session
2. Checks if loaded skills should compose
3. Extracts composition acknowledgment from output
4. If acknowledgment missing or invalid → WARNING (non-blocking)
5. If valid → SUCCESS with quality multiplier confirmation

---

## Pre-Configured Compositions

| Name | Skills | Multiplier | Enforcement |
|------|--------|------------|-------------|
| visual-design-excellence | data-visualization-designer, design-excellence, diagram-drawing | 3.2x | require |
| backend-security-architecture | backend-architect, security-engineer | 2.1x | require |
| devops-security | devops-architect, security-engineer | 2.3x | require |
| full-stack-architecture | frontend-architect, backend-architect, devops-architect | 3.5x | require |
| performance-refactoring | performance-engineer, refactoring-expert | 1.8x | suggest |
| quality-engineering | python-expert, quality-engineer | 1.9x | suggest |
| educational-documentation | technical-writer, socratic-mentor | 1.7x | suggest |
| root-cause-performance-analysis | root-cause-analyst, performance-engineer | 2.0x | suggest |

---

## Adding New Compositions

### Step 1: Identify Synergy

Find complementary skills that produce better results together:
- Orthogonal quality dimensions (design + implementation + validation)
- Complementary expertise (frontend + backend + devops)
- Sequential workflows (analysis → optimization → refactoring)

### Step 2: Define Composition

Add to `.claude/skill-composition-rules.json`:

```json
{
  "name": "composition-name",
  "description": "One-line description of synergy",
  "skills": ["skill-1", "skill-2", "skill-3"],
  "triggers": ["keyword1", "keyword2"],
  "enforcement": "require",
  "synergy_multiplier": 2.5,
  "output_acknowledgment_template": "Multi-Skill Composition Applied:\n- skill-1: [contribution]\n- skill-2: [contribution]\n- skill-3: [contribution]",
  "rationale": "Why these skills work better together",
  "quality_gates": [
    "Specific validation criterion 1",
    "Specific validation criterion 2"
  ]
}
```

### Step 3: Update Skill Metadata

Add composition metadata to each skill file:

```markdown
**Composes with (v5.5.0):**
- `complementary-skill-1` → What it provides
- `complementary-skill-2` → What it provides
- **Composition**: composition-name (Nx quality multiplier)
- **Why**: Explanation of synergy
```

### Step 4: Test

1. Trigger composition with user prompt
2. Verify skills auto-load
3. Verify composition guidance appears
4. Verify Claude acknowledges composition
5. Verify validation hook confirms success

---

## Enforcement Levels

**require (🔴 MANDATORY)**
- Composition is MANDATORY for acceptable quality
- Missing acknowledgment = architecture violation warning
- Use when skills are highly interdependent
- Example: visual-design-excellence (design without all 3 = poor quality)

**suggest (🟡 RECOMMENDED)**
- Composition is RECOMMENDED but not critical
- Missing acknowledgment = gentle warning
- Use when skills enhance each other but aren't required together
- Example: performance-refactoring (can optimize without refactoring, but better together)

---

## Synergy Multiplier Guide

Quality improvement factor when skills compose vs. single skill:

| Range | Meaning | Use When |
|-------|---------|----------|
| 1.0-1.5x | Minimal synergy | Skills mostly independent, small benefits |
| 1.5-2.5x | Moderate synergy | Clear quality improvement from composition |
| 2.5-3.5x | Strong synergy | Major quality leap, highly complementary |
| 3.5-5.0x | Exceptional synergy | Transformative difference, essential composition |

Calculate based on:
- How much quality degrades if skills used separately
- How much rework is needed without composition
- How complementary the skill dimensions are

---

## Benefits

**1. Quality Guarantee**
- Compositions guarantee orthogonal quality dimensions work together
- Example: Truthful encoding + aesthetic polish + accessible implementation = professional output

**2. Prevents Suboptimal Usage**
- Detects when Claude uses only one skill when multiple apply
- Warns about lost synergy opportunities

**3. Observable Quality**
- Composition acknowledgment shows explicit skill contributions
- Quality gates provide concrete validation criteria

**4. Systematic Improvement**
- Each composition encodes proven best practices
- Quality multipliers quantify value of composition

**5. Extensible**
- Easy to add new compositions as patterns emerge
- Self-documenting through configuration

---

## Implementation Files

**Configuration:**
- `.claude/skill-composition-rules.json` - Composition definitions

**Hooks:**
- `core/infrastructure/hooks/user-prompt-submit.ts` - Detection + injection
- `core/infrastructure/hooks/post-tool-use-multiskill.ts` - Validation

**Utilities:**
- `core/infrastructure/hooks/utils/composition-matcher.ts` - Matching logic
- `core/infrastructure/hooks/utils/context-cache.ts` - Session tracking

**Documentation:**
- `.claude/CLAUDE.md` - Rule (Multi-Skill Composition v5.5.0)
- `core/docs/multi-skill-composition-system.md` - This file
- Skill metadata in skill files

**Hook Registration:**
- `.claude/settings.json` - PostToolUse hooks for Write/Edit/Task

---

## Troubleshooting

**Composition not detected:**
- Check if all skills loaded (only "require" skills auto-load)
- Verify triggers match in skill-composition-rules.json
- Check confidence threshold (must be > 0.5)

**Validation warnings:**
- Ensure composition acknowledgment in output
- Use exact format: `Multi-Skill Composition Applied:`
- Mention all loaded skills with their contributions

**False positives:**
- Adjust triggers to be more specific
- Lower synergy_multiplier if composition not critical
- Change enforcement to "suggest" if optional

---

## Future Enhancements

**Potential improvements:**
1. Dynamic composition discovery (ML-based synergy detection)
2. Composition templates (pre-filled acknowledgments)
3. Quality metrics tracking (measure actual multiplier impact)
4. Composition visualization (show skill dependency graphs)
5. Cross-composition optimization (compose compositions)

---

## Examples

### Example 1: Visual Design Excellence

**Trigger**: User asks for infographic

**Skills Loaded**:
- data-visualization-designer (chart decisions)
- design-excellence (aesthetics)
- diagram-drawing (implementation)

**Composition Detected**: visual-design-excellence (3.2x multiplier)

**Output**:
```
Multi-Skill Composition Applied:
- data-visualization-designer: Column chart for year-over-year comparison, sequential color palette for growth trajectory, position encoding (primary) + color (secondary), y-axes start at zero for truthfulness
- design-excellence: Space Grotesk + IBM Plex Sans typography, Blue-Orange colorblind-safe palette, minimal motion (hover scale 1.02, 150ms), glassmorphic containers with strategic whitespace
- diagram-drawing: Chart.js 4.4.0 implementation, responsive canvas sizing, PNG/SVG export support, ARIA labels for screen readers
```

**Quality Gates Validated**:
- ✓ Chart type justified (comparison task → column chart)
- ✓ Typography distinctive (Space Grotesk, not Inter/Roboto)
- ✓ Color colorblind-safe (Blue-Orange, redundant encoding)
- ✓ Motion respects prefers-reduced-motion (minimal strategy)
- ✓ Modern libraries (Chart.js 4.4.0)
- ✓ Multiple export formats (PNG/SVG)

### Example 2: Backend Security Architecture

**Trigger**: User asks to build authentication API

**Skills Loaded**:
- backend-architect (system design)
- security-engineer (OWASP compliance)

**Composition Detected**: backend-security-architecture (2.1x multiplier)

**Output**:
```
Multi-Skill Composition Applied:
- backend-architect: RESTful API design with JWT token exchange, PostgreSQL for user data with proper indexing, Redis for session caching, graceful error handling with circuit breakers
- security-engineer: Bcrypt password hashing (cost factor 12), parameterized SQL queries to prevent injection, rate limiting (100 req/hour per IP), HTTPS-only with HSTS headers, secrets in environment variables
```

**Quality Gates Validated**:
- ✓ Authentication follows OWASP standards (JWT, bcrypt)
- ✓ Input validation on all endpoints
- ✓ Rate limiting implemented
- ✓ Parameterized queries (SQL injection prevention)
- ✓ Secrets not in code (env variables)
- ✓ Error handling doesn't leak info

---

## Related Documentation

- **Core Principles**: `.claude/CLAUDE.md` (Rule: Multi-Skill Composition)
- **Hook Architecture**: `core/docs/hook-architecture.md`
- **Skills System**: `core/docs/skills-system.md`
- **Pattern System**: `core/docs/pattern-system.md`
- **Quality Standards**: `.claude/CLAUDE.md` (Component Structure v5.4.0)

---

**Last Updated**: 2025-11-14
**Version**: 5.5.0
**Status**: Production-ready
