# /mcp-unload

🔌 **Purpose:** Unload all MCP integrations to free maximum context

**Usage:** `/mcp-unload`

**Equivalent to:** `/mcp-load minimal`

---

## Instructions

When the user invokes this command:

### 1. Confirm Unload Action

Say:

"Unloading all MCP integrations...

This will:
- ✅ Free up ~25K tokens (~12.5% of context window)
- ✅ Keep all skills, patterns, and local operations active
- ✅ Remove access to external data sources

Use this when:
- Executing patterns that don't need external data
- Working with local files only
- Planning and strategy work
- Teaching modules
- You need maximum context space"

### 2. Show What's Being Unloaded

```
Unloading MCPs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analytics & Data:
  ✗ google-analytics
  ✗ stripe

CRM & Email:
  ✗ hubspot
  ✗ salesforce
  ✗ mailchimp

Social Media:
  ✗ linkedin
  ✗ twitter
  ✗ slack

Advertising:
  ✗ meta-ads
  ✗ google-ads

SEO Tools:
  ✗ ahrefs
  ✗ semrush

Collaboration:
  ✗ gdrive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 13 MCPs unloaded
Result: ~25K tokens freed (maximum)
```

### 3. Explain Current State

Say:

"**Current state:**

All MCP integrations are now unloaded. You're in **minimal context mode** with maximum space for complex reasoning and local work.

**You can still:**
- ✅ Use all 24 patterns (`/pattern`, `/chain`)
- ✅ Load all 7 skills (auto-activated)
- ✅ Read/write local files
- ✅ Execute bash commands
- ✅ Create deliverables

**You cannot:**
- ❌ Access live performance data (Google Analytics, Stripe)
- ❌ Pull CRM data (HubSpot, Salesforce)
- ❌ Manage social posts (LinkedIn, Twitter)
- ❌ Run API-based tools (Ahrefs, SEMrush)

**To restore external data access:**
```bash
/mcp-load content      # For content creation
/mcp-load analysis     # For data analysis
/mcp-load social       # For social media
/mcp-load seo          # For SEO work
```"

### 4. Implementation Note

Say:

"**Note:** This command shows the intended behavior for v4.0 Phase 17. Currently, MCP loading happens at session start via `.claude/settings.json`.

For now, this command serves as a reference for what the minimal profile provides and helps you plan which MCPs you actually need."

---

## Example

```bash
/mcp-unload
```

**Output:**
```
Unloading all MCP integrations...

This will:
- ✅ Free up ~25K tokens (~12.5% of context window)
- ✅ Keep all skills, patterns, and local operations active
- ✅ Remove access to external data sources

Use this when:
- Executing patterns that don't need external data
- Working with local files only
- Planning and strategy work
- Teaching modules
- You need maximum context space

Unloading MCPs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analytics & Data:
  ✗ google-analytics
  ✗ stripe

CRM & Email:
  ✗ hubspot
  ✗ salesforce
  ✗ mailchimp

Social Media:
  ✗ linkedin
  ✗ twitter
  ✗ slack

Advertising:
  ✗ meta-ads
  ✗ google-ads

SEO Tools:
  ✗ ahrefs
  ✗ semrush

Collaboration:
  ✗ gdrive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 13 MCPs unloaded
Result: ~25K tokens freed (maximum)

**Current state:**

All MCP integrations are now unloaded. You're in **minimal context mode** with maximum space for complex reasoning and local work.

**You can still:**
- ✅ Use all 24 patterns (`/pattern`, `/chain`)
- ✅ Load all 7 skills (auto-activated)
- ✅ Read/write local files
- ✅ Execute bash commands
- ✅ Create deliverables

**You cannot:**
- ❌ Access live performance data (Google Analytics, Stripe)
- ❌ Pull CRM data (HubSpot, Salesforce)
- ❌ Manage social posts (LinkedIn, Twitter)
- ❌ Run API-based tools (Ahrefs, SEMrush)

**To restore external data access:**
```bash
/mcp-load content      # For content creation
/mcp-load analysis     # For data analysis
/mcp-load social       # For social media
/mcp-load seo          # For SEO work
```

**Note:** This command shows the intended behavior for v4.0 Phase 17. Currently, MCP loading happens at session start via `.claude/settings.json`.

For now, this command serves as a reference for what the minimal profile provides and helps you plan which MCPs you actually need.
```

---

## Use Cases

### 1. Pattern Execution

When using patterns that don't need live data:

```bash
/mcp-unload
/pattern create_linkedin_post "New feature launch" "Sarah" "awareness"
/pattern generate_variants 3
```

Patterns have compressed knowledge built-in. No external APIs needed.

### 2. Strategy Planning

When brainstorming or planning:

```bash
/mcp-unload
# Now have maximum context for strategic thinking
# Create campaign plans, positioning docs, etc.
```

### 3. Content Editing

When refining existing content:

```bash
/mcp-unload
# Edit blog posts, email copy, landing pages
# No need for live data when editing
```

### 4. Before Long Tasks

When starting a multi-hour task that doesn't need external data:

```bash
/mcp-unload
/create-dev-docs improve-email-templates
# Work with maximum context space
```

---

## Comparison: Profiles vs Unload

| Aspect           | /mcp-unload | /mcp-load minimal |
|------------------|-------------|-------------------|
| MCPs loaded      | 0           | 0                 |
| Token savings    | ~25K        | ~25K              |
| Use case         | Same        | Same              |
| **Difference**   | **Explicit unload** | **Load minimal profile** |

Both commands do the same thing. Use whichever is clearer:
- `/mcp-unload` - "I want to remove external integrations"
- `/mcp-load minimal` - "I want the minimal configuration"

---

## Related Commands

- `/mcp-load [profile]` - Load a specific MCP profile
- `/mcp-list` - Show currently active MCPs
- `/prime [context]` - Load context priming (Phase 17.2)

---

## See Also

- **Profile Definitions:** `.claude/mcp-profiles/profiles.json`
- **Full Documentation:** `.claude/mcp-profiles/README.md`
- **Phase 17 Plan:** `dev/active/v4-agentic-best-practices/v4-agentic-best-practices-plan.md`
