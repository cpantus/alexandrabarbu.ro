# Content Patterns Bundle

**Quick reference for all 6 content creation patterns.**
**Purpose:** Fast pattern selection without loading full files. Use lazy loading for execution.

---

## Bundle Overview

**6 patterns** for creating marketing content across channels:
- LinkedIn posts, emails, blog articles, ads, landing pages, social threads

**Token savings:** ~4.8K tokens (loading bundle vs all 6 patterns)
**Use when:** Creating any marketing content, need quick pattern reference

---

## Pattern Selection Guide

### By Channel
- **LinkedIn/Professional:** `create_linkedin_post`
- **Email marketing:** `create_email_campaign`
- **Blog/SEO:** `write_blog_article`
- **Paid ads:** `generate_ad_copy`
- **Website:** `create_landing_page_copy`
- **Social media:** `write_social_thread`

### By Goal
- **Awareness/Thought leadership:** `create_linkedin_post`, `write_blog_article`, `write_social_thread`
- **Lead generation:** `create_landing_page_copy`, `create_email_campaign`
- **Conversion:** `generate_ad_copy`, `create_landing_page_copy`
- **Engagement:** `create_linkedin_post`, `write_social_thread`

### By Complexity
- **Simple (5-10 min):** `create_linkedin_post`, `generate_ad_copy`
- **Medium (15-30 min):** `create_email_campaign`, `write_social_thread`
- **Complex (30-60 min):** `write_blog_article`, `create_landing_page_copy`

---

## Patterns Reference

### 1. create_linkedin_post
**Path:** `.claude/patterns/content/create_linkedin_post.md`
**Purpose:** Professional LinkedIn posts with thought leadership positioning
**Input:** Topic, persona, post type (awareness/consideration/conversion)
**Output:** LinkedIn post (150-300 words), hooks, CTAs, hashtags
**Best for:** B2B thought leadership, company updates, industry insights
**Complexity:** Simple (~800 tokens)

### 2. create_email_campaign
**Path:** `.claude/patterns/content/create_email_campaign.md`
**Purpose:** Email campaigns with A/B variants and segmentation
**Input:** Campaign goal, persona, email type (welcome/nurture/promo)
**Output:** Subject lines (3 variants), email body, CTA, A/B test plan
**Best for:** Lead nurturing, product launches, event promotion
**Complexity:** Medium (~1200 tokens)

### 3. write_blog_article
**Path:** `.claude/patterns/content/write_blog_article.md`
**Purpose:** SEO-optimized blog content for organic traffic
**Input:** Topic/keyword, persona, article length (800-2000 words)
**Output:** Full article, meta description, headers, internal links
**Best for:** SEO content marketing, educational content, expertise building
**Complexity:** Complex (~1500 tokens)

### 4. generate_ad_copy
**Path:** `.claude/patterns/content/generate_ad_copy.md`
**Purpose:** High-converting ad copy for paid campaigns
**Input:** Platform, persona, product/offer, ad format
**Output:** Headlines (5 variants), body copy (3 variants), CTAs
**Best for:** Google Ads, Facebook/LinkedIn ads, display ads
**Complexity:** Simple (~900 tokens)

### 5. create_landing_page_copy
**Path:** `.claude/patterns/content/create_landing_page_copy.md`
**Purpose:** Conversion-focused landing page copy
**Input:** Offer, persona, page goal (lead gen/sales/signup)
**Output:** Hero, value props, social proof, CTA sections
**Best for:** Campaign landing pages, product pages, lead magnets
**Complexity:** Complex (~1400 tokens)

### 6. write_social_thread
**Path:** `.claude/patterns/content/write_social_thread.md`
**Purpose:** Multi-post social threads for storytelling
**Input:** Platform (Twitter/LinkedIn), topic, thread length (5-10 posts)
**Output:** Thread posts with hooks, transitions, closing CTA
**Best for:** Storytelling, educational content, viral engagement
**Complexity:** Medium (~1000 tokens)

---

## Usage

**Option 1: Load specific pattern (recommended)**
```
/pattern create_linkedin_post "AI trends" "Strategic Sarah" "awareness"
```

**Option 2: Reference bundle for selection**
```
Read this bundle → Select pattern → Execute pattern
```

**Option 3: Batch creation**
```
Loop through multiple patterns for campaign content
```

---

## Common Inputs

All content patterns expect:
- **Topic/subject:** What to write about
- **Target persona:** Strategic Sarah, Technical Tom, or custom
- **Goal/stage:** Awareness, consideration, conversion
- **Brand voice:** Reference `@.claude/skills/brand-voice-guidelines.md`

All content patterns output:
- **Primary content:** Main deliverable
- **Variants:** A/B test options (3-5 variants)
- **Metadata:** SEO, hashtags, CTAs as applicable
- **Quality checks:** Reference `@.claude/skills/resources/quality-checks-library.md`

---

## Token Estimates

| Loading Method | Tokens | Savings |
|----------------|--------|---------|
| All 6 patterns individually | ~6.8K | Baseline |
| Content bundle only | ~2.0K | 70% |
| Bundle + 1 pattern on-demand | ~2.8K | 59% |
| Bundle + 3 patterns on-demand | ~4.4K | 35% |

**Recommendation:** Load bundle for quick reference, then load specific pattern as needed.

---

## Related Resources

- **Skills:** `brand-voice-guidelines`, `audience-research`
- **Personas:** `strategic-sarah-card.md`, `technical-tom-card.md`
- **Quality checks:** `quality-checks-library.md`
- **Other bundles:** `strategy-bundle`, `optimization-bundle`, `analysis-bundle`

---

**Version:** 1.0
**Last updated:** 2025-01-08
**Part of:** Memory Optimization v4.1 (Pattern Bundling)
