---
description: "✍️ Review AI Content - Review and edit AI-generated text sections"
---

# Review AI Content Command

Interactive tool for reviewing, editing, and personalizing AI-generated content in your site.

## Usage

```bash
/review-ai-content [page]
```

**Pages**:
- `home` - Review home page AI content
- `about` - Review about page
- `services` - Review all service pages
- `all` - Review all AI-generated content
- (no page) - Interactive menu

## How It Works

### 1. Overview (No Page Specified)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✍️  AI CONTENT REVIEW

Generated: 2025-11-14 10:30
Total AI sections: 28
Word count: 3,560 words

Status by page:
┌─────────────────────────────────────────────┐
│ Home           │ 5 sections │ ⏳ Not reviewed  │
│ About          │ 3 sections │ ⏳ Not reviewed  │
│ Services       │ 12 sections│ ⏳ Not reviewed  │
│ Contact        │ 2 sections │ ⏳ Not reviewed  │
│ FAQ            │ 6 sections │ ⏳ Not reviewed  │
└─────────────────────────────────────────────┘

Review options:
1. Review all (guided walkthrough)
2. Review specific page
3. Quick scan (highlights only)
4. Export for offline review
5. Mark all as reviewed (skip)
6. View AI generation log
7. Exit

Enter choice [1-7]:
```

### 2. Review All (Guided Walkthrough)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✍️  GUIDED AI CONTENT REVIEW

We'll walk through each AI-generated section.
For each, you can:
- Keep as-is
- Edit in place
- Open in editor
- Mark for later review
- Delete and start over

Ready to begin? [Y/n]: Y

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1/28] Home Page › Hero Section

File: content/_index.ro.md
Section: hero-cta
Type: Value proposition
Words: 52
Generated: 2025-11-14 10:30

Current content:
┌─────────────────────────────────────────────┐
│ Suport Psihologic Profesionist în București │
│                                              │
│ Oferim terapie individuală și de cuplu      │
│ într-un mediu sigur, confidențial și lipsit │
│ de judecată. Cu o abordare bazată pe dovezi │
│ și centrată pe client, te ajutăm să         │
│ depășești provocările emoționale și să      │
│ construiești o viață mai împlinită.         │
└─────────────────────────────────────────────┘

✓ Grammar: Correct
✓ Tone: Professional, warm
✓ Length: Within target (50-60 words)
⚠️  Suggestion: Add your specific specialization

Actions:
a) Keep as-is
b) Edit text
c) Open in editor
d) Regenerate (new AI version)
e) Mark TODO for later
f) Skip to next

Enter choice: b

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDIT MODE: Hero Section

Current:
"Oferim terapie individuală și de cuplu într-un mediu sigur..."

New text (or press Enter to keep):
> Oferim terapie individuală și de cuplu, specializată în anxietate și depresie, într-un mediu sigur...

✓ Updated (added specialization)
✓ New word count: 59 words (still within target)

Mark as reviewed? [Y/n]: Y

✓ Section 1/28 reviewed

Continue to next section? [Y/n]: Y

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[2/28] Home Page › Services Overview

File: content/_index.ro.md
Section: services-overview
Type: Service intro
Words: 180
Generated: 2025-11-14 10:30

Current content:
┌─────────────────────────────────────────────┐
│ Oferim o gamă largă de servicii              │
│ psihologice adaptate nevoilor tale:          │
│                                              │
│ • Terapie individuală pentru adulți         │
│ • Terapie de cuplu pentru relații sănătoase │
│ • Evaluări psihologice complete             │
│ • Consiliere și suport emoțional            │
│                                              │
│ [... continues for 180 words ...]           │
└─────────────────────────────────────────────┘

✓ Grammar: Correct
✓ Tone: Professional
✓ Length: Within target (150-250 words)
✓ Structure: Well-organized

No issues detected.

Actions:
a) Keep as-is ← Recommended
b) Edit text
c) Open in editor
d) Regenerate
e) Mark TODO
f) Skip

Enter choice: a

✓ Section 2/28 marked as reviewed (no changes)

[Continue through all 28 sections...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ REVIEW COMPLETE!

Sections reviewed: 28/28
Changes made: 8
Kept as-is: 18
Marked TODO: 2

Summary of changes:
- Home › Hero: Added specialization
- About › Bio: Personalized intro
- Services › Individual Therapy: Added approach details
- Services › Pricing: Updated pricing structure
- FAQ › Q3: Clarified answer
- [... 3 more ...]

Marked for later review:
- About › Credentials (needs specific certifications)
- Services › Group Therapy (needs group details)

All changes saved automatically.

Next steps:
- Complete TODO items
- Preview site: hugo server
- Translate changes to other languages

Press any key to exit...
```

### 3. Review Specific Page

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✍️  REVIEW: Services › Individual Therapy

File: content/services/individual-therapy/_index.ro.md
AI sections: 4
Total words: 520

Section 1: Service Description
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Terapia individuală este un proces terapeutic
personalizat în care lucrezi individual cu un
psiholog clinician pentru a aborda provocările
emoționale, cognitive sau comportamentale cu care
te confrunți...

[... full text ...]

✓ Quality: Good
⚠️  Personalization: Could add your specific approach

[Actions menu...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Section 2: Benefits List
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Beneficii

- **Înțelegere mai bună**: Explorezi gândurile și
  emoțiile tale într-un spațiu sigur
- **Strategii practice**: Dezvolți tehnici pentru
  gestionarea stresului și anxietății
...

[Continue reviewing each section...]
```

### 4. Quick Scan

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ QUICK SCAN: AI Content Issues

Scanning 28 sections...

✓ Grammar: No errors detected
✓ Spelling: All correct
✓ Tone consistency: Maintained across pages
⚠️  4 suggestions for improvement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUGGESTIONS:

1. Home › Hero Section
   ⚠️  Generic value proposition
   💡 Add: Your unique specialization or approach
   Action: /review-ai-content home

2. About › Professional Background
   ⚠️  Placeholder text detected: "[Add years of experience]"
   💡 Replace with actual experience
   Action: /edit-content about

3. Services › Pricing
   ⚠️  Vague pricing information
   💡 Add: Specific prices or price ranges
   Action: /edit-content services/pricing

4. FAQ › "How much does therapy cost?"
   ⚠️  Answer says "varies" without details
   💡 Add: Your specific pricing or payment options
   Action: /edit-content faq

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIORITY ITEMS:

High priority (3):
- Placeholder text in About page
- Missing pricing details
- Generic value propositions

Medium priority (1):
- FAQ answer could be more specific

Overall quality: 85/100
AI-generated content is professional and well-written.
Main need: Personalization with your specific details.

Actions:
1. Review all suggestions
2. Fix high-priority items only
3. Export report
4. Exit

Enter choice:
```

### 5. Export for Offline Review

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 EXPORT AI CONTENT REVIEW

Format:
1. Markdown document (for editing)
2. PDF document (for printing)
3. Google Doc (collaborative review)
4. Track changes format (compare mode)

Select format: 1

Generating markdown document...

Included:
- All AI-generated sections
- Current content
- Suggestions for improvement
- TODO markers
- Edit tracking

✓ Exported to: .wizard/ai-content-review.md (45KB)

Open now? [Y/n]: Y

[Opens in $EDITOR]
```

**Example export format**:

```markdown
# AI Content Review
Generated: 2025-11-14
Total sections: 28

---

## Home Page › Hero Section

**File**: `content/_index.ro.md`
**Section**: hero-cta
**Type**: Value proposition
**Words**: 52
**Status**: ⏳ Needs review

### Current Content

> Suport Psihologic Profesionist în București
>
> Oferim terapie individuală și de cuplu într-un mediu sigur,
> confidențial și lipsit de judecată. Cu o abordare bazată pe
> dovezi și centrată pe client, te ajutăm să depășești
> provocările emoționale și să construiești o viață mai
> împlinită.

### Suggestions

- **Add specialization**: Mention specific areas (anxiety, depression, trauma)
- **Personal touch**: Include your approach or philosophy
- **Call to action**: Make it more compelling

### Proposed Changes

```diff
- Oferim terapie individuală și de cuplu într-un mediu sigur
+ Oferim terapie individuală și de cuplu, specializată în anxietate
+ și depresie, într-un mediu sigur
```

### TODO

- [ ] Add specific specializations
- [ ] Personalize with unique approach

---

[Continue for all 28 sections...]
```

### 6. Comparison Mode

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔀 COMPARISON: Before/After AI Generation

Page: Services › Individual Therapy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEFORE (Placeholder):

[Service description will be generated here]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AFTER (AI-generated):

Terapia individuală este un proces terapeutic personalizat
în care lucrezi individual cu un psiholog clinician pentru
a aborda provocările emoționale, cognitive sau
comportamentale cu care te confrunți...

[... full text ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Improvements:
✓ Professional tone
✓ Comprehensive information
✓ Well-structured
✓ Includes benefits and process

Changes needed:
⚠️  Add your specific therapeutic approach
⚠️  Personalize with your experience

Actions:
a) Accept AI version
b) Revert to placeholder
c) Edit AI version
d) Next comparison

Enter choice:
```

## Auto-Detection

The command automatically finds AI-generated content by looking for comment markers:

```html
<!-- AI-generated content -->
<!-- Generated: 2025-11-14 -->
<!-- Section: service-description -->
<!-- TODO: Review and personalize -->
```

## Quality Checks

For each section, automatic checks:

1. **Grammar & Spelling**: Via language tools
2. **Tone Consistency**: Compare across sections
3. **Word Count**: Against targets
4. **Placeholder Detection**: Find [TODO] markers
5. **Fact Checking**: Flag claims that need verification
6. **Brand Voice**: Match against style guide (if available)

## Review Tracking

Track review status in: `.wizard/ai-content-review-status.json`

```json
{
  "last_updated": "2025-11-14T16:45:00Z",
  "total_sections": 28,
  "reviewed": 26,
  "pending": 2,
  "sections": [
    {
      "id": "home-hero-cta",
      "file": "content/_index.ro.md",
      "section": "hero-cta",
      "status": "reviewed",
      "reviewed_at": "2025-11-14T16:30:00Z",
      "changes_made": true,
      "notes": "Added specialization"
    },
    {
      "id": "about-credentials",
      "file": "content/about/_index.ro.md",
      "section": "credentials",
      "status": "todo",
      "priority": "high",
      "notes": "Needs specific certifications"
    }
  ]
}
```

## Batch Operations

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ BATCH OPERATIONS

Apply change to multiple sections:

1. Find & replace across all AI content
2. Update tone/style globally
3. Add disclaimer to all generated sections
4. Regenerate all sections (fresh AI)
5. Remove all AI markers (mark as finalized)

Enter choice: 3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add disclaimer text:

Enter disclaimer (or blank to skip):
> Această informație are caracter general. Pentru recomandări
  personalizate, programează o consultație.

Add to which sections:
a) All AI-generated sections
b) Service descriptions only
c) FAQ answers only
d) Select manually

Enter choice: b

Processing...
✓ 8 sections updated with disclaimer

Preview:
[Service description text...]

---
*Această informație are caracter general. Pentru
recomandări personalizate, programează o consultație.*

Apply? [Y/n]: Y
✓ Changes saved
```

## Related Commands

- `/edit-content [page] [section]` - Edit specific content
- `/refine-site content` - General content refinement
- View AI generation log: `.wizard/generated-*/ai-content-log.md`

## Tips

**Review early**: Check AI content before adding personal details

**Use export**: Easier to review offline in your preferred editor

**Quick scan first**: Identify major issues before detailed review

**Keep quality**: AI provides good base, you add expertise

**Document changes**: Add notes for why you made changes

**Multilingual sites**: Review each language separately

---

**Note**: AI-generated content is a starting point. Your expertise and personalization make it authentic and valuable.
