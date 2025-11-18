# SEO Context Cache

**Purpose:** LLM SEO, traditional SEO, and search optimization strategies
**Token Budget:** ~2-3k tokens
**Cache Duration:** Long-term (updates quarterly)

---

## LLM SEO (AI Overviews Optimization)

### What is LLM SEO?
Optimizing content for AI-powered search results, including:
- Google AI Overviews (formerly SGE)
- ChatGPT Search
- Perplexity AI
- Bing Copilot
- Claude, Gemini, other AI assistants

**Key Difference:** Traditional SEO targets 10 blue links; LLM SEO targets AI-generated summaries that cite sources.

---

### LLM SEO Principles

**1. Structured, Citation-Friendly Content**
- Clear hierarchical structure (H1, H2, H3)
- Factual statements that are easy to extract
- Direct answers to questions
- Lists, tables, and step-by-step formats
- Source attribution for claims

**Example:**
```markdown
## What is Marketing Attribution?

Marketing attribution is the process of identifying which marketing touchpoints contribute to conversions. According to a 2024 study by Gartner, 73% of marketers struggle with accurate attribution [1].

### Types of Attribution Models:
1. **Last-touch:** 100% credit to final touchpoint
2. **First-touch:** 100% credit to initial touchpoint
3. **Linear:** Equal credit across all touchpoints

[1] Gartner Marketing Attribution Study, 2024
```

**2. Answer-First Content Structure**
- Lead with direct answer (first 2-3 sentences)
- Expand with context and details
- Include "what, why, how, when, where"
- Use question-based headers

**Example:**
```markdown
## How Long Does SEO Take to Work?

SEO typically takes 4-6 months to show significant results for new websites, and 2-3 months for established sites. The timeline depends on competition, domain authority, and content quality.

### Factors That Affect SEO Timeline:
- Domain age and authority
- Competition in your niche
- Content quality and quantity
- Technical SEO foundation
```

**3. Comprehensive, Authoritative Content**
- Cover topics thoroughly (2,000+ words for pillar content)
- Include original data and research
- Expert quotes and interviews
- Up-to-date information (date-stamped)
- Clear author credentials

**4. Schema Markup and Structured Data**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Complete Guide to Marketing Attribution",
  "author": {
    "@type": "Person",
    "name": "Sarah Marketing",
    "jobTitle": "VP Marketing"
  },
  "datePublished": "2025-11-11",
  "dateModified": "2025-11-11"
}
```

---

### Optimizing for AI Overviews

**Content Formats AI Prefers:**
- **Comparison tables:** Feature comparisons, pros/cons
- **Step-by-step guides:** Numbered instructions with clear outcomes
- **FAQ sections:** Direct question/answer pairs
- **Definition boxes:** Clear, concise definitions
- **Statistics:** Data with sources and dates

**Example FAQ Section:**
```markdown
## Frequently Asked Questions

### What is the best attribution model for B2B?
Position-based (U-shaped) attribution is often best for B2B because it gives credit to both first-touch (awareness) and last-touch (conversion) while acknowledging mid-funnel nurturing.

### How much does attribution software cost?
Attribution software typically costs $500-5,000/month depending on data volume and features. Entry-level tools start at $500/month for up to 100,000 monthly visitors.
```

---

### Citation Optimization

**Make Your Content Easy to Cite:**
1. **Clear source attribution:** Date all statistics and studies
2. **Quote-friendly format:** Short, impactful statements
3. **Expert credibility:** Author bios with credentials
4. **Original research:** Proprietary data and insights

**Example:**
```markdown
According to our 2025 Marketing Attribution Survey of 1,000 marketers:
- 68% use multi-touch attribution
- 45% struggle with data integration
- 73% report improved ROI after implementing attribution

[Download full survey results]
```

---

## Traditional SEO Fundamentals

### Keyword Research

**Keyword Types:**
- **Head terms:** High volume, high competition (e.g., "marketing")
- **Body terms:** Medium volume, medium competition (e.g., "marketing attribution")
- **Long-tail:** Low volume, low competition (e.g., "best marketing attribution software for b2b saas")

**Search Intent Types:**
1. **Informational:** "what is marketing attribution"
2. **Navigational:** "google analytics login"
3. **Transactional:** "buy attribution software"
4. **Commercial:** "best attribution software"

**Keyword Research Process:**
1. Brainstorm seed keywords
2. Use tools (Ahrefs, SEMrush, Google Keyword Planner)
3. Analyze competitor rankings
4. Group keywords by topic clusters
5. Prioritize by difficulty + volume + relevance

---

### On-Page SEO Checklist

**Title Tag:**
- 50-60 characters
- Include primary keyword
- Front-load important terms
- Make it compelling (CTR matters)
- Example: "Marketing Attribution Guide 2025 | Multi-Touch Models"

**Meta Description:**
- 150-160 characters
- Include primary keyword
- Clear value proposition
- CTA if appropriate
- Example: "Learn how marketing attribution works, compare 5 attribution models, and implement multi-touch tracking in 2025. Free templates included."

**URL Structure:**
- Short and descriptive
- Include primary keyword
- Use hyphens, not underscores
- Lowercase only
- Example: `/marketing-attribution-guide`

**Header Tags (H1-H6):**
- One H1 per page (primary keyword)
- Multiple H2s for main sections
- H3-H6 for subsections
- Descriptive, not generic ("Understanding Attribution Models" vs "Learn More")

**Content Optimization:**
- Primary keyword in first 100 words
- Secondary keywords throughout naturally
- Include related terms and synonyms
- 1,500-2,500+ words for competitive topics
- Break up text with visuals every 300 words

**Image Optimization:**
- Descriptive file names: `marketing-attribution-model.jpg`
- Alt text with keywords (naturally)
- Compress images (under 200KB ideally)
- Use WebP format when possible
- Responsive images for mobile

**Internal Linking:**
- Link to related content (3-5 per article)
- Use descriptive anchor text
- Link to important pages more often
- Update old content with new links

---

### Technical SEO

**Site Speed:**
- Target: <2 seconds load time
- Tools: PageSpeed Insights, GTmetrix
- Optimizations: Image compression, CDN, caching, minification

**Mobile Optimization:**
- Responsive design (mobile-first indexing)
- Touch-friendly buttons (44px minimum)
- Readable text without zooming (16px minimum)
- No horizontal scrolling

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** <2.5 seconds
- **FID (First Input Delay):** <100 milliseconds
- **CLS (Cumulative Layout Shift):** <0.1

**XML Sitemap:**
- Include all important pages
- Update automatically
- Submit to Google Search Console
- Exclude admin, duplicate, low-value pages

**Robots.txt:**
- Allow search engines to crawl public pages
- Disallow admin, login, search results
- Link to XML sitemap

**Canonical Tags:**
- Prevent duplicate content issues
- Point to preferred URL version
- Example: `<link rel="canonical" href="https://example.com/page" />`

---

### Link Building Strategies

**High-Quality Backlink Sources:**
1. **Guest posting:** Industry blogs and publications
2. **Digital PR:** Media outreach for original research
3. **Resource links:** Industry directories and lists
4. **Broken link building:** Find and replace dead links
5. **Unlinked mentions:** Convert brand mentions to links

**Link Quality Factors:**
- **Domain authority:** Higher DA is better
- **Relevance:** Links from related sites
- **Context:** Editorial links in content (not footer/sidebar)
- **Anchor text:** Descriptive, varied
- **Follow vs nofollow:** Follow passes more value

**Avoid:**
- Buying links (penalty risk)
- Link farms and directories
- Reciprocal link schemes
- Irrelevant websites
- Over-optimized anchor text

---

### Content Strategy for SEO

**Topic Clusters (Pillar + Cluster Model):**
```
Pillar Page: Marketing Attribution (comprehensive guide, 3,000+ words)
    ↓
Cluster 1: Attribution Models (1,500 words)
Cluster 2: Implementation Guide (1,800 words)
Cluster 3: Tools Comparison (2,000 words)
Cluster 4: Case Studies (1,200 words)
```

**Content Calendar:**
- 2-4 new articles per month minimum
- Mix of pillar and cluster content
- Update old content quarterly
- Target mix of short-tail and long-tail keywords

**Content Types for SEO:**
- **How-to guides:** Step-by-step instructions
- **Listicles:** "10 Best...", "7 Ways to..."
- **Comparison posts:** "X vs Y" for competitive keywords
- **Ultimate guides:** Comprehensive resources
- **Case studies:** Real examples with data
- **Tools/calculators:** Interactive resources

---

## Local SEO (If Applicable)

**Google Business Profile:**
- Complete all sections (hours, photos, description)
- Choose correct categories
- Encourage customer reviews
- Post updates weekly
- Respond to all reviews

**Local Citations:**
- NAP consistency (Name, Address, Phone)
- List in relevant directories (Yelp, industry-specific)
- Local business schema markup

**Local Content:**
- Location-specific pages
- Local events and news
- Regional case studies
- City/region keywords

---

## SEO Analytics & Tracking

### Google Search Console Metrics
- **Impressions:** How often you appear in results
- **Clicks:** How often users click
- **CTR:** Clicks / Impressions (aim for 3-5%+)
- **Position:** Average ranking (target top 3)
- **Coverage issues:** Indexing errors
- **Core Web Vitals:** Performance scores

### Key SEO KPIs
- **Organic traffic:** Monthly sessions from search
- **Keyword rankings:** Track top 50 keywords
- **Backlinks:** Total and new per month
- **Domain Authority:** Track quarterly
- **Conversion rate:** Organic traffic to leads/sales
- **Pages indexed:** Total pages in Google index

### Monitoring Cadence
- **Daily:** Major ranking changes, technical issues
- **Weekly:** Traffic trends, new backlinks
- **Monthly:** Full keyword ranking report
- **Quarterly:** Comprehensive SEO audit

---

## SEO Best Practices by Content Type

### Blog Posts
- 1,500-2,500 words
- Clear H2/H3 structure
- 3-5 internal links
- Featured image with alt text
- Author bio with credentials
- Social sharing buttons
- Related posts section

### Landing Pages
- Clear primary CTA above fold
- Benefit-driven headlines
- Trust signals (testimonials, logos)
- Minimal navigation (reduce exits)
- Fast load time (<1.5s)
- Mobile-optimized forms

### Product Pages
- Unique descriptions (no manufacturer copy)
- High-quality images (5-10)
- Customer reviews and ratings
- Technical specifications
- Related products
- Schema markup (Product, Review, Offer)

### Service Pages
- Clear service description
- Pricing transparency (if possible)
- Process/timeline overview
- Case studies and results
- FAQ section
- Contact form or CTA

---

## Common SEO Mistakes to Avoid

**Content Issues:**
- ❌ Keyword stuffing
- ❌ Thin content (<300 words)
- ❌ Duplicate content
- ❌ Auto-generated content without review

**Technical Issues:**
- ❌ Slow page speed (>3 seconds)
- ❌ Not mobile-friendly
- ❌ Broken links (404 errors)
- ❌ Missing SSL certificate (https)

**Link Issues:**
- ❌ Buying backlinks
- ❌ Spam link building
- ❌ Ignoring toxic backlinks

**User Experience:**
- ❌ Intrusive pop-ups (especially mobile)
- ❌ Auto-playing videos
- ❌ Poor navigation
- ❌ Hard-to-read text

---

## SEO Tools Reference

**Keyword Research:**
- Ahrefs Keywords Explorer
- SEMrush Keyword Magic Tool
- Google Keyword Planner
- Answer The Public

**Technical SEO:**
- Google Search Console
- Screaming Frog
- GTmetrix
- PageSpeed Insights

**Backlink Analysis:**
- Ahrefs Site Explorer
- Moz Link Explorer
- SEMrush Backlink Analytics

**Rank Tracking:**
- Ahrefs Rank Tracker
- SEMrush Position Tracking
- AccuRanker

**Content Optimization:**
- Surfer SEO
- Clearscope
- MarketMuse
- Frase

---

## SEO Timeline & Expectations

**Month 1-3: Foundation**
- Technical SEO audit and fixes
- Keyword research and strategy
- Content calendar creation
- Initial content publication
- Expect: Minimal traffic growth

**Month 4-6: Momentum**
- Content publishing cadence established
- Link building efforts scaling
- Initial rankings improvements
- Expect: 20-50% traffic growth

**Month 7-12: Growth**
- Rankings for target keywords improving
- Domain authority increasing
- Backlink profile strengthening
- Expect: 100-200% traffic growth

**Year 2+: Scaling**
- Dominating topic clusters
- Top 3 rankings for target keywords
- Strong backlink profile
- Expect: 50-100% YoY growth

---

**Last Updated:** 2025-11-11
**Next Review:** 2026-02-11
