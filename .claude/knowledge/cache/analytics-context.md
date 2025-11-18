# Analytics Context Cache

**Purpose:** Marketing metrics, attribution models, and performance benchmarks
**Token Budget:** ~2-3k tokens
**Cache Duration:** Long-term (updates quarterly)

---

## Core Marketing Metrics

### Traffic Metrics
- **Visitors:** Total unique users
- **Sessions:** Total visits (includes repeat)
- **Pageviews:** Total pages viewed
- **Bounce Rate:** % of single-page sessions
  - Good: <40% | Average: 40-60% | Poor: >60%
- **Session Duration:** Average time on site
  - Good: >3 min | Average: 2-3 min | Poor: <2 min

### Engagement Metrics
- **Click-Through Rate (CTR):**
  - Email: 2-5% average | 8-10% excellent
  - Display ads: 0.5-1% average | 2%+ excellent
  - Search ads: 3-5% average | 8%+ excellent
  - Social ads: 1-2% average | 3-4% excellent

- **Engagement Rate (Social):**
  - Formula: (Likes + Comments + Shares) / Reach × 100
  - Instagram: 1-5% | Facebook: 0.5-1% | LinkedIn: 2-3%

- **Time on Page:**
  - Blog posts: 2-4 minutes
  - Landing pages: 1-2 minutes
  - Product pages: 2-3 minutes

### Conversion Metrics
- **Conversion Rate:**
  - E-commerce: 2-3% average | 5%+ excellent
  - B2B lead gen: 2-5% average | 10%+ excellent
  - SaaS free trial: 5-10% average | 15%+ excellent

- **Cost Per Acquisition (CPA):**
  - E-commerce: $10-$50 depending on AOV
  - B2B: $50-$500 depending on deal size
  - SaaS: $100-$300 depending on LTV

- **Customer Acquisition Cost (CAC):**
  - Formula: (Sales + Marketing Costs) / New Customers
  - Target: CAC < 1/3 of LTV (1:3 ratio minimum)

### Revenue Metrics
- **Return on Ad Spend (ROAS):**
  - Minimum: 3:1 | Target: 5:1 | Excellent: 10:1+
  - Formula: Revenue / Ad Spend

- **Return on Investment (ROI):**
  - Formula: (Revenue - Cost) / Cost × 100
  - Target: 200-400% for paid channels

- **Average Order Value (AOV):**
  - Track monthly trends
  - Increase through upsells, bundles, free shipping thresholds

- **Customer Lifetime Value (LTV):**
  - Formula: Average Purchase Value × Purchase Frequency × Customer Lifespan
  - SaaS: Monthly subscription × Average retention months
  - E-commerce: AOV × Purchases per year × Average years

---

## Attribution Models

### Last-Touch Attribution
- **Credit:** 100% to last touchpoint before conversion
- **Best for:** Short sales cycles, direct response
- **Limitation:** Ignores awareness and consideration touchpoints

### First-Touch Attribution
- **Credit:** 100% to first touchpoint
- **Best for:** Measuring top-of-funnel effectiveness
- **Limitation:** Ignores nurturing and conversion touchpoints

### Linear Attribution
- **Credit:** Equal credit to all touchpoints
- **Best for:** Understanding full customer journey
- **Limitation:** Doesn't differentiate impact of each touchpoint

### Time-Decay Attribution
- **Credit:** More credit to recent touchpoints (exponential decay)
- **Best for:** Long sales cycles, values recent interactions
- **Formula:** Closer touchpoints get exponentially higher weight

### Position-Based (U-Shaped) Attribution
- **Credit:** 40% first touch, 40% last touch, 20% distributed to middle
- **Best for:** Valuing awareness and conversion
- **Use case:** Balanced view of customer journey

### Data-Driven Attribution (Google Analytics 4)
- **Credit:** Machine learning determines contribution
- **Best for:** Large data sets, complex journeys
- **Requirement:** Google Analytics 4 with sufficient conversion volume

### Custom Attribution Models
- **W-Shaped:** 30% first, 30% middle (lead creation), 30% last, 10% distributed
- **Z-Shaped:** Adds 4th touchpoint (opportunity creation) for enterprise sales
- **Channel-Specific Weights:** Assign different weights per channel based on historical data

---

## Funnel Analytics

### AARRR Metrics (Pirate Metrics)

**Acquisition:**
- Traffic sources breakdown (organic, paid, referral, direct, social)
- Cost per visitor by channel
- Visitor quality score (engagement, pages/session)

**Activation:**
- Sign-up rate: % of visitors who create account
- Onboarding completion rate
- Time to first value (aha moment)
- Feature adoption rate

**Retention:**
- Day 1, 7, 30, 90 retention rates
- Cohort analysis (monthly cohorts)
- Churn rate: % of customers lost per period
- Monthly Active Users (MAU) / Daily Active Users (DAU)

**Revenue:**
- Conversion to paid rate
- Average revenue per user (ARPU)
- LTV:CAC ratio (target: 3:1 or higher)
- Monthly recurring revenue (MRR) growth

**Referral:**
- Viral coefficient (invites per user × conversion rate)
- Net promoter score (NPS)
- Referral traffic and conversions
- Social sharing rates

### Conversion Funnel Benchmarks

**E-commerce Funnel:**
- Homepage → Product Page: 50-60%
- Product Page → Add to Cart: 10-20%
- Cart → Checkout: 50-70%
- Checkout → Purchase: 60-80%
- **Overall Conversion:** 2-3% average

**SaaS Funnel:**
- Visitor → Sign-up: 5-10%
- Sign-up → Activation: 40-60%
- Activation → Trial: 30-50%
- Trial → Paid: 15-25%
- **Overall Conversion:** 0.5-1% visitor to paid

**B2B Lead Gen Funnel:**
- Visitor → MQL: 2-5%
- MQL → SQL: 10-30%
- SQL → Opportunity: 30-50%
- Opportunity → Customer: 20-30%
- **Overall Conversion:** 0.1-0.5% visitor to customer

---

## Channel Performance Benchmarks

### Organic Search (SEO)
- **CTR by Position:**
  - #1: 30-35% | #2: 15-20% | #3: 10-12%
  - #4-10: 2-10% declining | Page 2: <1%
- **Traffic Growth:** 10-20% per quarter (healthy)
- **Keyword Rankings:** Track top 100 keywords
- **Domain Authority:** 40+ competitive, 60+ strong

### Paid Search (Google Ads)
- **Average CTR:** 3-5% search, 0.5-1% display
- **Quality Score:** 7-10 (reduces CPC by 30-50%)
- **Conversion Rate:** 3-5% average | 10%+ excellent
- **Cost Per Click (CPC):** $1-$3 average (varies by industry)

### Email Marketing
- **Open Rate:**
  - Good: 20-25% | Average: 15-20% | Poor: <15%
- **Click Rate:**
  - Good: 3-5% | Average: 2-3% | Poor: <2%
- **Unsubscribe Rate:**
  - Good: <0.2% | Average: 0.2-0.5% | Poor: >0.5%
- **Bounce Rate:**
  - Good: <2% | Average: 2-5% | Clean list urgently if >5%

### Social Media
**Facebook/Instagram:**
- Organic reach: 5-10% of followers
- Ad CTR: 1-2% average | 3-4% excellent
- Engagement rate: 0.5-1% average | 2-3% excellent
- Cost per click: $0.50-$2.00

**LinkedIn:**
- Organic reach: 2-5% of followers
- Ad CTR: 0.4-0.8% average | 1.5%+ excellent
- Engagement rate: 2-3% average | 5%+ excellent
- Cost per click: $5-$10 (B2B premium)

**Twitter:**
- Organic reach: 1-3% of followers
- Engagement rate: 0.5-1% average | 2-3% excellent
- Ad CTR: 1-3% average

---

## Cohort Analysis

### Monthly Cohorts
Track users by acquisition month:
```
Cohort | Month 0 | Month 1 | Month 2 | Month 3 | Month 6 | Month 12
Jan    | 100%    | 65%     | 45%     | 35%     | 25%     | 20%
Feb    | 100%    | 68%     | 48%     | 37%     | 27%     | —
Mar    | 100%    | 70%     | 50%     | 40%     | —       | —
```

### Retention Curve Analysis
- **Strong retention:** Flattens at 20-40% after 6-12 months
- **Poor retention:** Continues declining below 10%
- **Product-market fit indicator:** Retention curve flattening

### Revenue Cohorts
Track revenue contribution by cohort:
- Early cohorts (older users) should provide stable base revenue
- New cohorts should show increasing LTV over time
- Negative cohort trends indicate churn or pricing issues

---

## A/B Testing Statistics

### Sample Size Calculation
- **Minimum:** 100 conversions per variation
- **Formula:** n = (Z² × p × (1-p)) / E²
  - Z = 1.96 for 95% confidence
  - p = baseline conversion rate
  - E = minimum detectable effect

### Statistical Significance
- **Confidence Level:** 95% minimum (p-value < 0.05)
- **Test Duration:** 1-2 weeks minimum, 2-4 weeks ideal
- **Traffic Split:** 50/50 for 2 variations, equal splits for more

### Common Test Types
- **Headlines:** 20-30% impact on conversion
- **CTA buttons:** 10-20% impact (color, copy, placement)
- **Images:** 15-25% impact (hero images, product shots)
- **Form length:** 10-20% impact (fewer fields = higher conversion)
- **Social proof:** 10-15% impact (testimonials, trust badges)

---

## Dashboard Templates

### Daily Dashboard
- Yesterday's key metrics vs. 7-day average
- Top 5 traffic sources
- Top 5 converting pages
- Active campaigns performance
- Conversion funnel drop-offs

### Weekly Dashboard
- Week-over-week growth (traffic, conversions, revenue)
- Channel performance comparison
- Campaign ROI summary
- Top content by engagement
- A/B test results

### Monthly Dashboard
- Month-over-month trends (traffic, MQLs, revenue)
- Cohort retention analysis
- LTV:CAC ratio by channel
- Attribution model comparison
- Goal attainment vs. targets

---

## Key Formulas Reference

**Conversion Rate:** (Conversions / Visitors) × 100

**Bounce Rate:** (Single Page Sessions / Total Sessions) × 100

**CAC:** (Sales + Marketing Costs) / New Customers

**LTV:** AOV × Purchase Frequency × Customer Lifespan

**LTV:CAC Ratio:** LTV / CAC (target: 3:1 minimum)

**ROAS:** Revenue / Ad Spend

**ROI:** (Revenue - Cost) / Cost × 100

**Churn Rate:** (Customers Lost / Total Customers at Start) × 100

**Retention Rate:** ((End Customers - New Customers) / Start Customers) × 100

**Viral Coefficient:** Invites per User × Invite Conversion Rate

**NPS:** % Promoters - % Detractors

---

**Last Updated:** 2025-11-11
**Next Review:** 2026-02-11
