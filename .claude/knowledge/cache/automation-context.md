# Automation Context Cache

**Purpose:** Marketing automation workflows, integration patterns, and operational blueprints
**Token Budget:** ~2-3k tokens
**Cache Duration:** Long-term (updates quarterly)

---

## Marketing Automation Fundamentals

### Key Automation Categories

**1. Lead Nurturing Automation**
- Welcome sequences for new subscribers
- Educational drip campaigns
- Product tour and onboarding flows
- Re-engagement campaigns for inactive leads
- Lead scoring and qualification workflows

**2. Customer Lifecycle Automation**
- Onboarding sequences (days 1, 7, 14, 30)
- Feature adoption campaigns
- Renewal reminders and offers
- Upsell/cross-sell triggers
- Winback campaigns for churned customers

**3. Behavioral Triggers**
- Cart abandonment emails
- Browse abandonment notifications
- Post-purchase follow-up
- Content engagement triggers
- Event-based messaging

**4. Data Enrichment & Routing**
- Lead scoring updates
- CRM field updates
- Sales alert notifications
- Territory assignment rules
- Lead routing to sales reps

---

## Email Automation Workflows

### Welcome Series (5-email sequence)

**Email 1: Immediate welcome (sent immediately)**
- Subject: "Welcome to [Brand]! Here's what to expect"
- Content: Thank you, set expectations, quick win
- CTA: Complete profile, watch video, or quick action

**Email 2: Value delivery (Day 2)**
- Subject: "Your free guide to [topic] is here"
- Content: Deliver promised resource, add context
- CTA: Read guide, join community

**Email 3: Social proof (Day 5)**
- Subject: "How [Customer Name] achieved [result]"
- Content: Customer success story, relatable challenge
- CTA: Read case study, book demo

**Email 4: Education (Day 8)**
- Subject: "5 ways to get more value from [product/topic]"
- Content: Tips, best practices, resources
- CTA: Try feature, watch webinar

**Email 5: Conversion (Day 12)**
- Subject: "Ready to [achieve outcome]?"
- Content: Recap value, address objections
- CTA: Start trial, book demo, purchase

---

### Lead Nurturing Campaign (Long-cycle B2B)

**Phase 1: Education (Week 1-4)**
- Send: Educational content (blog posts, guides)
- Frequency: Weekly
- Goal: Build awareness and trust

**Phase 2: Consideration (Week 5-8)**
- Send: Comparison guides, webinar invitations
- Frequency: Bi-weekly
- Goal: Position solution as viable option

**Phase 3: Decision (Week 9-12)**
- Send: Case studies, product demos, trials
- Frequency: Weekly with sales involvement
- Goal: Convert to SQL and close

**Triggers to Accelerate:**
- High engagement (3+ opens in week) → Move to next phase
- Clicked pricing page → Alert sales, send ROI calculator
- Downloaded comparison guide → Send demo invitation

---

### Abandoned Cart Recovery (E-commerce)

**Email 1: Gentle reminder (1 hour after abandonment)**
- Subject: "You left something behind"
- Content: Show cart contents with images
- CTA: Complete purchase
- Conversion rate: 10-15%

**Email 2: Incentive offer (24 hours)**
- Subject: "Still interested? Here's 10% off"
- Content: Cart + discount code
- CTA: Complete purchase with discount
- Conversion rate: 5-8%

**Email 3: Urgency + scarcity (48 hours)**
- Subject: "Last chance: Your cart expires soon"
- Content: Cart + urgency messaging (limited stock/time)
- CTA: Complete purchase
- Conversion rate: 3-5%

**Total recovery rate: 18-28% of abandoned carts**

---

## Lead Scoring Automation

### Behavioral Scoring

**Positive Actions (Add Points):**
- Email open: +1 point
- Email click: +3 points
- Website visit: +2 points
- Pricing page visit: +10 points
- Demo request: +50 points
- Free trial signup: +75 points
- Webinar attendance: +15 points
- Content download: +5 points

**Negative Actions (Subtract Points):**
- Unsubscribe: -20 points
- Email bounce: -10 points
- Spam report: -50 points
- 30 days inactive: -5 points
- Competitor domain: -25 points

**Thresholds:**
- 0-20 points: Cold lead (nurture)
- 21-50 points: Warm lead (continue nurture)
- 51-75 points: Hot lead (MQL, pass to sales)
- 76+ points: Very hot (SQL, immediate sales follow-up)

---

### Demographic Scoring

**Company Size:**
- 1-10 employees: +5 points (if SMB focus)
- 11-100 employees: +10 points
- 101-1000 employees: +15 points (if mid-market focus)
- 1000+ employees: +20 points (if enterprise focus)

**Job Title/Seniority:**
- C-level (CEO, CMO, etc.): +25 points
- VP-level: +20 points
- Director-level: +15 points
- Manager-level: +10 points
- Individual contributor: +5 points

**Industry Match:**
- Target industry: +15 points
- Adjacent industry: +5 points
- Poor fit industry: -10 points

---

## Integration Patterns

### Core Marketing Stack Integration

**CRM ↔ Marketing Automation:**
- **Sync frequency:** Real-time or every 5-15 minutes
- **Data flow:** Bi-directional
- **Key fields:** Name, Email, Company, Title, Lead Score, Status
- **Triggers:** New lead → Create CRM record | Status change → Update both systems

**Marketing Automation ↔ Email Service Provider:**
- **Purpose:** Send transactional and marketing emails
- **Data flow:** One-way (MA → ESP)
- **Triggers:** Campaign enrollment, behavior triggers
- **Tracking:** Opens, clicks, bounces sync back to MA

**CRM ↔ Analytics:**
- **Purpose:** Attribution and reporting
- **Data flow:** Bi-directional
- **Key metrics:** Revenue, pipeline, closed deals
- **Frequency:** Daily batch updates

**Marketing Automation ↔ Advertising Platforms:**
- **Purpose:** Audience syncing for retargeting
- **Data flow:** One-way (MA → Ad Platform)
- **Use cases:** Customer match audiences, lookalikes
- **Sync frequency:** Daily

---

### API-First Automation Architecture

**Webhook-Based Triggers:**
```javascript
// Example: Slack notification on high-value lead
{
  "trigger": "lead_score > 75",
  "action": "webhook",
  "url": "https://hooks.slack.com/services/...",
  "payload": {
    "text": "🔥 Hot lead: {{lead.name}} from {{lead.company}} scored {{lead.score}} points",
    "channel": "#sales"
  }
}
```

**REST API Integration Pattern:**
```javascript
// Example: Enrich lead with Clearbit data
1. New lead created in CRM
2. Trigger API call to Clearbit
3. Receive company/person data
4. Update CRM fields with enriched data
5. Re-score lead based on new data
```

---

## Workflow Automation Blueprints

### Webinar Workflow

**Pre-Webinar (2 weeks before):**
- Registration confirmation (immediate)
- Reminder email (1 week before)
- Reminder email (1 day before)
- Reminder email (1 hour before)
- SMS reminder (if mobile provided)

**During Webinar:**
- Welcome email with resources
- Q&A submission form
- Poll/survey during session

**Post-Webinar:**
- Thank you + recording (immediately after)
- Follow-up with resources (1 day after)
- Sales outreach for engaged attendees (2 days after)
- Re-engagement for no-shows (with recording)

**Segmentation:**
- Attended: High-value nurture sequence
- Registered but didn't attend: Replay invitation
- Highly engaged (questions/polls): Sales alert

---

### Product-Led Growth (PLG) Workflow

**Trial Signup:**
- Welcome email (immediate)
- Onboarding tutorial day 1
- Feature highlight day 3
- Use case examples day 5
- Check-in from customer success day 7

**Activation Triggers:**
- Completed setup → Congratulations email, next steps
- First value achieved (aha moment) → Celebration, share success
- Invited team member → Tips for collaboration

**Usage-Based Triggers:**
- Approaching limits → Upgrade notification
- Heavy usage → Expansion conversation
- Low usage (day 5) → Help resources, support offer
- No usage (day 7) → Re-engagement campaign

**Trial End:**
- 3 days before expiration: Upgrade reminder
- 1 day before expiration: Last chance offer
- Expired: Winback campaign with special offer

---

### Customer Onboarding Workflow

**Week 1: Quick Wins**
- Day 0: Welcome email + getting started guide
- Day 1: Complete setup checklist
- Day 2: First feature tutorial
- Day 3: Check-in: "How's it going?"
- Day 7: Week 1 recap + next steps

**Week 2-4: Depth**
- Weekly email with advanced features
- Use case spotlights
- Customer success story
- Webinar invitation (advanced topics)

**Month 2-3: Optimization**
- Best practices guide
- Performance review offer
- Upsell/cross-sell opportunities
- Referral program introduction

**Ongoing:**
- Quarterly business review
- Feature release announcements
- Renewal reminders (60, 30, 15 days before)

---

## Segmentation Strategies

### Behavioral Segmentation

**Engagement Level:**
- **Highly engaged:** 3+ emails opened in 30 days
  - Action: Send advanced content, upsell offers
- **Moderately engaged:** 1-2 opens in 30 days
  - Action: Continue nurture, A/B test content
- **Low engaged:** 0 opens in 30 days
  - Action: Re-engagement campaign
- **Inactive:** 0 opens in 90 days
  - Action: Sunset sequence, then suppress

**Content Interests:**
- Track clicks by topic/category
- Score interest based on content consumed
- Personalize future emails based on interests
- Example: "Clicked 3 attribution articles" → Attribution-focused nurture

**Purchase Journey Stage:**
- **Awareness:** Send educational content
- **Consideration:** Send comparisons, webinars
- **Decision:** Send case studies, trials, demos
- **Customer:** Send onboarding, optimization, upsells

---

### Predictive Segmentation

**Likelihood to Purchase:**
- Use ML to score conversion probability
- Factors: Engagement, demographics, behavior
- High probability → Prioritize for sales outreach
- Low probability → Continue nurture, don't waste sales time

**Churn Risk:**
- Score based on usage, support tickets, engagement
- High risk → Proactive customer success outreach
- Medium risk → Re-engagement campaigns
- Low risk → Continue standard communication

**Expansion Opportunity:**
- Heavy product usage → Upsell to higher tier
- Multiple users → Expand seats
- Using workarounds → Sell missing features

---

## Automation Best Practices

### Email Deliverability

**Authentication:**
- SPF record configured
- DKIM signing enabled
- DMARC policy set (p=quarantine or p=reject)
- Custom sending domain (mail.yourdomain.com)

**List Hygiene:**
- Remove hard bounces immediately
- Suppress chronic non-openers (6+ months)
- Remove spam complainers permanently
- Validate emails before adding to list

**Engagement Optimization:**
- Only send to engaged segments
- Sunset sequences for inactive subscribers
- Re-permission campaigns annually
- Easy unsubscribe (one-click)

**Content Best Practices:**
- Avoid spam trigger words
- Maintain 60:40 text-to-image ratio
- Include plain text version
- Test with Mail Tester before sending

---

### A/B Testing Automation

**Test Elements:**
- Subject lines (biggest impact)
- Send times and days
- From name
- Email copy and CTAs
- Personalization vs generic

**Testing Process:**
1. Split list (50/50 for 2 variations)
2. Send to test segment (10-20% of list)
3. Wait for statistical significance (2-4 hours)
4. Send winner to remaining 80-90%

**Sample Size Calculator:**
- Minimum 1,000 recipients per variation
- Need 100+ conversions per variation
- Run for at least 4 hours
- Target 95% confidence level

---

### Workflow Troubleshooting

**Common Issues:**

**Low Open Rates (<15%):**
- Improve subject lines
- Optimize send time
- Clean list (remove inactive)
- Check deliverability settings

**Low Click Rates (<2%):**
- Stronger CTAs
- More relevant content
- Better segmentation
- Improve email design

**High Unsubscribe (>0.5%):**
- Sending too frequently
- Irrelevant content
- Manage expectations in welcome email
- Better segmentation

**Workflows Not Triggering:**
- Check trigger conditions
- Verify field mapping
- Test with small segment first
- Check integration status

---

## Performance Benchmarks

### Email Automation Metrics

**Welcome Series:**
- Open rate: 50-60% (email 1), declining to 20-30% (email 5)
- Click rate: 10-15% (email 1), declining to 3-5% (email 5)
- Unsubscribe: <1% total series

**Lead Nurture:**
- Open rate: 20-30%
- Click rate: 3-5%
- MQL conversion: 5-10% of nurtured leads

**Cart Abandonment:**
- Open rate: 40-50%
- Click rate: 10-20%
- Recovery rate: 18-28% of abandoned carts

**Re-engagement:**
- Open rate: 10-15% (first email)
- Reactivation: 5-10% of inactive list
- Suppress after 3 emails with no opens

---

## Automation Tool Stack

**Marketing Automation Platforms:**
- **Enterprise:** Marketo, Eloqua, Pardot, HubSpot Enterprise
- **Mid-Market:** HubSpot, ActiveCampaign, Klaviyo
- **SMB:** Mailchimp, Drip, ConvertKit

**CRM Integration:**
- Salesforce (most popular)
- HubSpot CRM
- Pipedrive
- Close.com

**Workflow Builder Tools:**
- Zapier (no-code automation)
- Make (formerly Integromat)
- n8n (open-source alternative)
- Custom API integrations

**Analytics & Attribution:**
- Google Analytics 4
- Segment (CDP)
- Attribution tools (Bizible, Wicked Reports)

---

## Quick Automation Wins

**Implement in 1-2 Hours:**
1. Welcome email for new subscribers
2. Cart abandonment email (single email)
3. Lead score field in CRM
4. Sales notification for hot leads (>75 points)

**Implement in 1 Day:**
5. Welcome series (5 emails)
6. Re-engagement campaign for inactive
7. Basic lead nurture (3-email sequence)
8. Post-purchase follow-up

**Implement in 1 Week:**
9. Complete lead scoring model
10. Multi-stage nurture by persona
11. Full cart abandonment series
12. Customer onboarding workflow

---

**Last Updated:** 2025-11-11
**Next Review:** 2026-02-11
