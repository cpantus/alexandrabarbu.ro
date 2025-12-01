# Skill Creation Examples

**Parent Skill:** skill-developer
**Last Updated:** 2025-11-15
**Token Budget:** ~800 tokens

---

## Purpose

Provides concrete examples of skill planning and structure for reference. Load this when you need to see how a complete skill is planned from domain identification through to file structure.

---

## Example 1: Email Deliverability Skill

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

---

## Example 2: Video Marketing Skill

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

## Cross-References

Related skills: [@skill-developer]
Related resources: [@skill-developer/resources/skill-templates.md]
