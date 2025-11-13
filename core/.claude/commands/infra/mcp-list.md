# /mcp-list

📋 **Purpose:** Show currently loaded MCP integrations

**Usage:** `/mcp-list`

---

## Instructions

When the user invokes this command:

### 1. Determine Current State

**Note:** Since profiles are currently manually configured, read `.claude/settings.json` to see which MCPs are defined.

```typescript
const settingsPath = '.claude/settings.json';
const settings = JSON.parse(await readFile(settingsPath));
const activeMcps = Object.keys(settings.mcpServers || {});
```

### 2. Read Profile Definitions

```typescript
const profilesPath = '.claude/mcp-profiles/profiles.json';
const profiles = JSON.parse(await readFile(profilesPath));
```

### 3. Detect Active Profile

Compare active MCPs against profile definitions to detect which profile is active:

```typescript
let activeProfile = 'custom';
for (const [name, profile] of Object.entries(profiles.profiles)) {
  const profileMcps = profile.mcpServers.sort();
  const currentMcps = activeMcps.sort();
  if (JSON.stringify(profileMcps) === JSON.stringify(currentMcps)) {
    activeProfile = name;
    break;
  }
}
```

### 4. Display Current State

```
Currently Loaded MCPs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Profile: [detected-profile] ([count] MCPs)
Token Usage: ~[X]K tokens (~[Y]% of context window)

Active Integrations:
  ✓ [mcp-1]       - [description]
  ✓ [mcp-2]       - [description]
  ✓ [mcp-3]       - [description]
  ...

Inactive (saving context):
  ✗ [mcp-4]
  ✗ [mcp-5]
  ...

Token Savings: ~[X]K tokens vs default (all 13 MCPs)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 5. Suggest Optimizations

Based on the active profile, suggest if a different profile might be better:

Say:

"**Profile Analysis:**

Current profile: **[profile-name]**
Optimized for: [use case]

**Alternatives:**
- `/mcp-load content` - For content creation (4 MCPs)
- `/mcp-load analysis` - For data analysis (4 MCPs)
- `/mcp-load social` - For social media (5 MCPs)
- `/mcp-load seo` - For SEO research (4 MCPs)
- `/mcp-load minimal` - For lightweight ops (0 MCPs)

**Tip:** If you're not using all loaded MCPs, consider switching to a more focused profile to free up context."

---

## Example Outputs

### Example 1: Content Profile Active

```bash
/mcp-list
```

**Output:**
```
Currently Loaded MCPs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Profile: content (4 MCPs)
Token Usage: ~5K tokens (~2.5% of context window)

Active Integrations:
  ✓ google-analytics    - Web traffic and behavior data
  ✓ hubspot            - CRM and email management
  ✓ mailchimp          - Email campaign execution
  ✓ gdrive             - Collaboration and assets

Inactive (saving context):
  ✗ salesforce
  ✗ slack
  ✗ twitter
  ✗ linkedin
  ✗ meta-ads
  ✗ google-ads
  ✗ stripe
  ✗ ahrefs
  ✗ semrush

Token Savings: ~8K tokens vs default (all 13 MCPs)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Profile Analysis:**

Current profile: **content**
Optimized for: Creating blog posts, email campaigns, social content with performance tracking

Good choice for:
- Email campaign creation
- Blog posts with analytics
- Content calendars
- Newsletter management

**Alternatives:**
- `/mcp-load analysis` - If analyzing campaign performance
- `/mcp-load social` - If managing social posts/ads
- `/mcp-load minimal` - If executing patterns only (saves ~25K tokens)
```

---

### Example 2: All MCPs Loaded (Default)

```bash
/mcp-list
```

**Output:**
```
Currently Loaded MCPs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Profile: default (13 MCPs - ALL)
Token Usage: ~25K tokens (~12.5% of context window)

Active Integrations:
  ✓ google-analytics    - Web traffic and behavior data
  ✓ hubspot            - CRM and email management
  ✓ salesforce         - Sales pipeline and customer data
  ✓ gdrive             - Collaboration and assets
  ✓ slack              - Team coordination
  ✓ twitter            - Social engagement
  ✓ linkedin           - Professional networking
  ✓ meta-ads           - Facebook/Instagram advertising
  ✓ google-ads         - YouTube and Display ads
  ✓ mailchimp          - Email campaigns
  ✓ stripe             - Revenue and subscriptions
  ✓ ahrefs             - Backlinks and keywords
  ✓ semrush            - Competitive analysis

Token Savings: 0 tokens (default configuration)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  **Optimization Opportunity**

You're loading ALL 13 MCPs. Most tasks only need 3-4 MCPs.

**Recommended profiles:**
- `/mcp-load content` - For content work (saves ~8K tokens)
- `/mcp-load analysis` - For data analysis (saves ~9K tokens)
- `/mcp-load social` - For social media (saves ~8K tokens)
- `/mcp-load seo` - For SEO work (saves ~9K tokens)
- `/mcp-load minimal` - For pattern execution (saves ~25K tokens)

**Why optimize?**
- More context space = better reasoning
- Faster loading = quicker responses
- Focused tools = clearer intent
```

---

### Example 3: Minimal Profile Active

```bash
/mcp-list
```

**Output:**
```
Currently Loaded MCPs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Profile: minimal (0 MCPs)
Token Usage: 0 tokens (0% of context window)

Active Integrations:
  (none - all MCPs unloaded)

Inactive (saving context):
  ✗ google-analytics
  ✗ hubspot
  ✗ salesforce
  ✗ gdrive
  ✗ slack
  ✗ twitter
  ✗ linkedin
  ✗ meta-ads
  ✗ google-ads
  ✗ mailchimp
  ✗ stripe
  ✗ ahrefs
  ✗ semrush

Token Savings: ~25K tokens vs default (maximum)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Profile Analysis:**

Current profile: **minimal**
Optimized for: Pattern execution, local file work, no external integrations

Perfect for:
- Using patterns (`/pattern`, `/chain`)
- Content editing and refinement
- Strategy planning
- Teaching modules
- Maximum context for complex reasoning

**When to load MCPs:**
- `/mcp-load content` - Need email/content data
- `/mcp-load analysis` - Need performance metrics
- `/mcp-load social` - Need social media access
- `/mcp-load seo` - Need SEO tools
```

---

### Example 4: Custom Configuration

```bash
/mcp-list
```

**Output:**
```
Currently Loaded MCPs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Profile: custom (6 MCPs)
Token Usage: ~10K tokens (~5% of context window)

Active Integrations:
  ✓ google-analytics    - Web traffic
  ✓ hubspot            - CRM
  ✓ stripe             - Revenue
  ✓ linkedin           - B2B social
  ✓ meta-ads           - Advertising
  ✓ ahrefs             - SEO

Inactive (saving context):
  ✗ salesforce
  ✗ gdrive
  ✗ slack
  ✗ twitter
  ✗ google-ads
  ✗ mailchimp
  ✗ semrush

Token Savings: ~15K tokens vs default

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Profile Analysis:**

Current profile: **custom**
This doesn't match any predefined profile. You may have manually configured MCPs.

**Standard profiles available:**
- `/mcp-load content` - 4 MCPs for content work
- `/mcp-load analysis` - 4 MCPs for data analysis
- `/mcp-load social` - 5 MCPs for social media
- `/mcp-load seo` - 4 MCPs for SEO research
- `/mcp-load minimal` - 0 MCPs for maximum context

**To create a custom profile:**
Edit `.claude/mcp-profiles/profiles.json` and add your configuration.
```

---

## Information Provided

For each active MCP, optionally provide:

**google-analytics:**
- Purpose: Web traffic, behavior, conversions
- Use for: Analyzing campaign performance, traffic sources, user journeys

**hubspot:**
- Purpose: CRM, contacts, email campaigns
- Use for: Lead management, email automation, sales funnel

**salesforce:**
- Purpose: Sales pipeline, customer data
- Use for: Attribution analysis, revenue tracking

**gdrive:**
- Purpose: Document collaboration, asset storage
- Use for: Campaign briefs, creative assets, team docs

**slack:**
- Purpose: Team communication
- Use for: Campaign notifications, stakeholder updates

**twitter:**
- Purpose: Real-time social engagement
- Use for: Brand monitoring, trending topics, engagement

**linkedin:**
- Purpose: Professional networking, B2B
- Use for: Thought leadership, B2B campaigns

**meta-ads:**
- Purpose: Facebook/Instagram advertising
- Use for: Ad campaigns, audience targeting

**google-ads:**
- Purpose: Search and display advertising
- Use for: PPC campaigns, keyword bidding

**mailchimp:**
- Purpose: Email marketing
- Use for: Newsletter campaigns, email automation

**stripe:**
- Purpose: Payment processing, subscriptions
- Use for: Revenue analysis, subscription metrics

**ahrefs:**
- Purpose: SEO research, backlinks
- Use for: Keyword research, link building

**semrush:**
- Purpose: Competitive intelligence
- Use for: Competitor analysis, rank tracking

---

## Related Commands

- `/mcp-load [profile]` - Load a specific MCP profile
- `/mcp-unload` - Unload all MCPs
- `/prime [context]` - Load context priming (Phase 17.2)

---

## See Also

- **Profile Definitions:** `.claude/mcp-profiles/profiles.json`
- **Full Documentation:** `.claude/mcp-profiles/README.md`
- **Phase 17 Plan:** `dev/active/v4-agentic-best-practices/v4-agentic-best-practices-plan.md`
