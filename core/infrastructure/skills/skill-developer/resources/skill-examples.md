# Skill Creation Examples

**Parent Skill:** skill-developer
**Last Updated:** 2025-11-16
**Purpose:** Complete examples showing the full skill creation process from planning to deployment

---

## Example 1: Email Deliverability Skill

### Planning Phase (15 minutes)

**1. Knowledge Domain:**
Email authentication, spam prevention, inbox placement optimization

**2. Skill Type:**
Domain-specific (technical, triggered by specific keywords)

**3. When to Use:**
- Setting up new email infrastructure
- Troubleshooting deliverability issues
- Implementing SPF/DKIM/DMARC
- Improving inbox placement rates

**4. Common Use Cases:**
- 80%: Technical setup (SPF, DKIM, DMARC configuration)
- 15%: Troubleshooting bounces/spam issues
- 5%: Advanced monitoring and reputation management

**5. Progressive Disclosure Strategy:**

**Main File (~350 lines):**
- Quick Reference: Authentication checklist (SPF/DKIM/DMARC basics)
- Core Knowledge: Setup process, common issues, monitoring
- Decision Tree: When to use each authentication method

**Resources (3 files):**
- `spf-dkim-dmarc-setup.md` (Detailed technical guides, DNS configuration)
- `troubleshooting-deliverability.md` (Bounce codes, spam traps, remediation)
- `monitoring-and-reputation.md` (Tools, metrics, ongoing maintenance)

**6. Auto-Activation Triggers:**

**Keywords (18 total):**
- email, deliverability, bounce, spam, inbox
- SPF, DKIM, DMARC, authentication
- sender reputation, blacklist, whitelist
- email server, SMTP, DNS records
- bounce rate, spam score, inbox placement

**Intent Patterns (6 total):**
- `(setup|configure|implement).*?(SPF|DKIM|DMARC|email.*authentication)`
- `(improve|fix|troubleshoot).*?(deliverability|inbox.*placement|bounce.*rate)`
- `(monitor|track|measure).*?(sender.*reputation|email.*performance)`
- `(prevent|avoid|reduce).*?(spam|bounce|blacklist)`
- `(how|what|why).*?(SPF|DKIM|DMARC|authentication)`
- `email.*?(setup|configuration|infrastructure)`

---

### Implementation (30 minutes)

#### Main Skill File Structure

```markdown
# Email Deliverability Optimization

**Last Updated:** 2025-11-16
**Skill Type:** domain-specific

## Purpose

Guides setup and optimization of email authentication and deliverability infrastructure.

Use this skill when:
- Setting up SPF, DKIM, DMARC for email authentication
- Troubleshooting bounces, spam issues, or low inbox placement
- Monitoring sender reputation and email performance

## Quick Reference

### Authentication Checklist

**SPF (Sender Policy Framework):**
- [ ] Add SPF record to DNS (TXT record)
- [ ] Include all sending IPs/domains
- [ ] Use "-all" for strict policy (or "~all" for testing)
- [ ] Verify with SPF checker tool

**DKIM (DomainKeys Identified Mail):**
- [ ] Generate public/private key pair
- [ ] Add public key to DNS (TXT record)
- [ ] Configure email server to sign messages
- [ ] Test with DKIM validator

**DMARC (Domain-based Message Authentication):**
- [ ] Set up SPF and DKIM first (required)
- [ ] Add DMARC policy to DNS (TXT record)
- [ ] Start with "p=none" for monitoring
- [ ] Gradually move to "p=quarantine" then "p=reject"

### Decision Tree: Authentication Priority

```
IF new infrastructure → SPF + DKIM + DMARC (all 3)
ELSE IF existing with issues → Check SPF first, then DKIM
ELSE IF monitoring only → DMARC reports
```

## Core Knowledge

### SPF Setup Process
[50-70 lines: DNS configuration, record syntax, common mistakes]

### DKIM Configuration
[50-70 lines: Key generation, DNS setup, server configuration]

### DMARC Implementation
[50-70 lines: Policy levels, reporting, gradual rollout]

### Common Deliverability Issues
[40-60 lines: Bounce codes, spam triggers, remediation]

## Resources

- [@email-deliverability/resources/spf-dkim-dmarc-setup.md] - Detailed technical setup guides
- [@email-deliverability/resources/troubleshooting-deliverability.md] - Bounce codes and spam remediation
- [@email-deliverability/resources/monitoring-and-reputation.md] - Tools and metrics

## Usage Patterns

**Pattern 1: New Email Infrastructure**
```
Load: email-deliverability + @resources/spf-dkim-dmarc-setup.md
Apply: Authentication checklist
Output: Configured SPF, DKIM, DMARC records
```

**Pattern 2: Troubleshooting Bounces**
```
Load: email-deliverability + @resources/troubleshooting-deliverability.md
Apply: Bounce code analysis
Output: Remediation plan
```

## Quality Checklist

**Authentication:**
- [ ] SPF record includes all sending IPs
- [ ] DKIM signing enabled and tested
- [ ] DMARC policy set (at least p=none)

**Monitoring:**
- [ ] DMARC reports configured
- [ ] Bounce rate tracked (<2% target)
- [ ] Spam complaints monitored (<0.1% target)
```

#### Resource File 1: SPF/DKIM/DMARC Setup

```markdown
# SPF, DKIM, and DMARC Technical Setup Guide

**Parent Skill:** email-deliverability
**Last Updated:** 2025-11-16
**Token Budget:** ~3K tokens

## Purpose

Detailed technical guides for configuring email authentication records.
Load this when you need step-by-step DNS configuration instructions.

## SPF Record Configuration

### Step 1: Identify All Sending Sources
[Detailed instructions with examples]

### Step 2: Build SPF Record
[Syntax guide, mechanism explanations]

### Step 3: Add to DNS
[Provider-specific instructions: Route53, Cloudflare, etc.]

### Step 4: Verify and Test
[Testing tools, validation process]

## DKIM Configuration

[Similar detailed structure]

## DMARC Implementation

[Similar detailed structure]

## Templates

### SPF Record Template
```
v=spf1 include:_spf.google.com include:sendgrid.net ip4:XXX.XXX.XXX.XXX -all
```

### DMARC Record Template
```
v=DMARC1; p=none; rua=mailto:dmarc@example.com; ruf=mailto:dmarc@example.com; pct=100
```

## Cross-References

Related skills: [@email-marketing-optimization]
Related resources: [@resources/troubleshooting-deliverability.md]
```

---

### skill-rules.json Configuration (15 minutes)

```json
"email-deliverability": {
  "type": "domain-specific",
  "enforcement": "suggest",
  "priority": "high",
  "description": "Email authentication and deliverability optimization",
  "skillPath": ".claude/skills/email-deliverability.md",
  "resources": [
    ".claude/skills/email-deliverability/resources/spf-dkim-dmarc-setup.md",
    ".claude/skills/email-deliverability/resources/troubleshooting-deliverability.md",
    ".claude/skills/email-deliverability/resources/monitoring-and-reputation.md"
  ],
  "promptTriggers": {
    "keywords": [
      "email", "deliverability", "bounce", "spam", "inbox",
      "SPF", "DKIM", "DMARC", "authentication",
      "sender reputation", "blacklist", "whitelist",
      "email server", "SMTP", "DNS records",
      "bounce rate", "spam score", "inbox placement"
    ],
    "intentPatterns": [
      "(setup|configure|implement).*?(SPF|DKIM|DMARC|email.*authentication)",
      "(improve|fix|troubleshoot).*?(deliverability|inbox.*placement|bounce.*rate)",
      "(monitor|track|measure).*?(sender.*reputation|email.*performance)",
      "(prevent|avoid|reduce).*?(spam|bounce|blacklist)",
      "(how|what|why).*?(SPF|DKIM|DMARC|authentication)",
      "email.*?(setup|configuration|infrastructure)"
    ]
  },
  "fileTriggers": {
    "pathPatterns": [
      "**/*-email-*.md",
      "**/email/**/*.md",
      "**/*-deliverability-*.md"
    ],
    "contentPatterns": [
      "Email Deliverability:",
      "SPF Record:",
      "DKIM Configuration:"
    ]
  },
  "autoActivate": true,
  "reminderMessage": "📧 Email Deliverability - Check SPF/DKIM/DMARC setup"
}
```

---

### Testing & Validation (15 minutes)

**Auto-Activation Tests:**

```bash
# Test 1: Direct keyword
Prompt: "Set up SPF records for our email domain"
Result: ✅ Triggered (keyword: SPF)

# Test 2: Intent pattern
Prompt: "How do I improve our email deliverability?"
Result: ✅ Triggered (pattern: improve.*deliverability)

# Test 3: File trigger
File: docs/email-authentication-setup.md
Result: ✅ Triggered (path pattern: *-email-*)

# Test 4: No false positive
Prompt: "Create a welcome email template"
Result: ❌ Should NOT trigger (content creation, not deliverability)
```

**Token Efficiency:**
```
Before (monolithic): 15KB file = ~6K tokens
After (progressive):
  - Main file: 3KB = ~1.5K tokens
  - Resources (on-demand): 0-9KB = 0-4K tokens
  - Typical usage: 1.5-3K tokens = 50-75% savings ✅
```

**Quality Check:**
- ✅ CMO-level technical accuracy
- ✅ Actionable step-by-step guides
- ✅ Real DNS record examples
- ✅ Specific validation criteria

---

## Example 2: Video Marketing Skill

### Planning Phase

**Skill:** video-marketing-strategy
**Type:** Domain-specific
**Triggers:** "video", "youtube", "vimeo", "video marketing", "video content"

**Progressive Disclosure:**
- Main: Video strategy framework, platform comparison, quick wins
- Resources:
  - `platform-optimization-guides.md` (YouTube, LinkedIn, TikTok specifics)
  - `video-production-checklist.md` (Pre-production, filming, editing)
  - `video-analytics-frameworks.md` (Metrics, reporting, optimization)

### Key Design Decisions

**1. Scope:** Strategy and optimization, NOT production techniques
**2. Token Budget:** Main 300 lines (~1.5K tokens), Resources 600 lines each (~2.5K tokens)
**3. Triggers:** Broad keywords + platform-specific intent patterns

---

## Example 3: Compliance and Legal Skill (Guardrail Type)

### Planning Phase

**Skill:** compliance-and-legal
**Type:** Guardrail (risk-triggered, critical priority)
**Triggers:** Claims, comparisons, regulatory terms

**Progressive Disclosure:**
- Main: Red flags checklist, claim review process, legal requirements
- Resources:
  - `advertising-standards.md` (FTC, ASA, industry-specific rules)
  - `disclaimer-templates.md` (Copy-paste ready disclaimers)
  - `claim-substantiation-guide.md` (Evidence requirements, testing)

**Key Characteristic:** High priority, auto-activates on ANY risky content

---

## Lessons Learned from Real Skill Development

### Lesson 1: Start with Use Cases, Not Features

**Wrong approach:**
"This skill covers email marketing best practices"

**Right approach:**
"This skill helps you:
- Fix low open rates (subject line optimization)
- Improve deliverability (authentication setup)
- Design effective campaigns (template structure)"

### Lesson 2: Progressive Disclosure is About Frequency

**Main file:** Content used in 70%+ of prompts
**Resources:** Detailed guides used in <30% of prompts

**Example:**
- Main: Quick reference authentication checklist (always useful)
- Resource: Detailed DNS configuration syntax (only when setting up)

### Lesson 3: Test with Real Prompts

Don't guess at triggers. Test with actual user prompts:

```
"Help me with email"  → Too vague, shouldn't trigger
"Set up email authentication" → Should trigger
"Write a marketing email" → Shouldn't trigger (content creation)
"Fix email bounces" → Should trigger
```

### Lesson 4: Quality Over Coverage

**Better:** Deep expertise in email deliverability (one skill)
**Worse:** Surface-level coverage of all email topics (one bloated skill)

---

## Planning Template (Use This)

```markdown
## Skill Planning: [Skill Name]

### 1. Knowledge Domain
[What area of marketing does this cover?]

### 2. Skill Type
[ ] Universal (70%+ of tasks)
[ ] Domain-specific (topic-triggered)
[ ] Guardrail (risk-triggered)

### 3. Primary Use Cases (80% Rule)
1. [Most common use case - 50% of usage]
2. [Second most common - 20%]
3. [Third most common - 10%]

### 4. Progressive Disclosure Strategy

**Main File (≤500 lines):**
- Quick Reference: [1-page summary]
- Core Knowledge: [Key frameworks]
- Decision Points: [When/how to use]

**Resources (2-4 files):**
- [resource-1.md]: [Detailed guide for use case 1]
- [resource-2.md]: [Detailed guide for use case 2]
- [resource-3.md]: [Templates and examples]

### 5. Auto-Activation Plan

**Keywords (15-30):**
[Primary keywords that users will mention]

**Intent Patterns (4-8):**
[Regex patterns matching common question/task structures]

**Priority:**
[ ] Critical [ ] High [ ] Medium [ ] Low

### 6. Success Metrics

- Auto-activation rate: [Target %]
- Token savings: [Target % vs monolithic]
- Quality level: [CMO/Director/Junior]

---

**Status:** Ready to implement? [Yes/No]
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Kitchen Sink Skill
**Problem:** Trying to cover everything about a topic in one skill
**Solution:** Focus on most common use cases, create separate skills for distinct areas

### Anti-Pattern 2: Theory-Heavy Content
**Problem:** Explaining WHY without showing HOW
**Solution:** Lead with frameworks, checklists, templates. Theory goes in resources.

### Anti-Pattern 3: Generic Examples
**Problem:** Hypothetical scenarios without real data
**Solution:** Use actual campaigns, metrics, outcomes

### Anti-Pattern 4: Vague Triggers
**Problem:** Keywords too broad ("marketing") or too narrow ("SPF record for Gmail")
**Solution:** Test with 10-20 real prompts, refine based on results

---

## Cross-References

**System Documentation:**
- [@.claude/skill-rules.json] - Auto-activation configuration
- [@.claude/skills/] - Existing skills for reference
- [ARCHITECTURE.md] - Skills system architecture

**Other Resources:**
- [@skill-developer/resources/skill-templates.md] - Templates for skill files
- [@skill-developer/resources/validation-checklists.md] - Quality validation
