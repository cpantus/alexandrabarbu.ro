# /mcp-load [profile]

🔌 **Purpose:** Load a specific MCP profile to optimize context usage

**Usage:** `/mcp-load [profile]`

**Valid Profiles:**
- `content` - Content creation and distribution (4 MCPs)
- `analysis` - Performance analysis and BI (4 MCPs)
- `social` - Social media and advertising (5 MCPs)
- `seo` - SEO research and optimization (4 MCPs)
- `minimal` - No MCPs (0 MCPs, max context)

---

## Instructions

When the user invokes this command:

### 1. Read Profile Configuration

```typescript
const profilesPath = '.claude/mcp-profiles/profiles.json';
const profiles = JSON.parse(await readFile(profilesPath));
const requestedProfile = profiles.profiles[args.profile];

if (!requestedProfile) {
  return `❌ Profile "${args.profile}" not found. Valid profiles: content, analysis, social, seo, minimal`;
}
```

### 2. Display Profile Information

```
Loading MCP Profile: [profile-name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Description: [profile description]
Use Case: [when to use]

MCPs to load ([count]):
  ✓ [mcp-1]
  ✓ [mcp-2]
  ✓ [mcp-3]
  ...

Token Savings: [X]K tokens (~[Y]% of context window)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3. Explain What Will Happen

Say:

"I'm loading the **[profile-name]** profile. This will:

1. **Configure** the session to use only the [count] MCPs you need
2. **Free up** ~[X]K tokens that would be consumed by unused integrations
3. **Keep** all skills, patterns, and other system features active

This profile is optimized for: [use case]

The profile will remain active for the rest of this session unless you switch to another profile or use `/mcp-unload`."

### 4. Load the Profile

**Note:** Currently, MCP profile switching requires updating `.claude/settings.json` and restarting the session. For now:

Say:

"**To apply this profile:**

1. I'll show you the MCPs that should be loaded
2. You can verify these are appropriate for your task
3. Current limitation: Profile switching requires session restart (v4.0 Phase 17 implementation)

**For now, you can:**
- ✅ Use this command to **plan** which MCPs you need
- ✅ Manually configure `.claude/settings.json` before starting a session
- ✅ See what the different profiles offer

**Coming in full Phase 17 implementation:**
- Automatic profile switching without restart
- Per-task MCP context management
- Profile stacking and custom profiles"

### 5. Show Current MCPs (Informational)

Based on the profile, list the MCPs that WOULD be loaded:

```
📋 This profile would load:

google-analytics     ✓ Web traffic and behavior data
hubspot             ✓ CRM and email management
mailchimp           ✓ Email campaign execution
gdrive              ✓ Collaboration and assets

NOT loaded (saving context):
✗ salesforce
✗ slack
✗ twitter
✗ linkedin
✗ meta-ads
✗ google-ads
✗ stripe
✗ ahrefs
✗ semrush

Result: 9 MCPs unloaded = ~8K tokens saved
```

---

## Examples

### Example 1: Content Profile

```bash
/mcp-load content
```

**Output:**
```
Loading MCP Profile: content
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Description: Content creation and distribution workflow
Use Case: Creating blog posts, email campaigns, social content with performance tracking

MCPs to load (4):
  ✓ google-analytics
  ✓ hubspot
  ✓ mailchimp
  ✓ gdrive

Token Savings: ~8K tokens (~4% of context window)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I'm loading the **content** profile. This will:

1. **Configure** the session to use only the 4 MCPs you need
2. **Free up** ~8K tokens that would be consumed by unused integrations
3. **Keep** all skills, patterns, and other system features active

This profile is optimized for: Creating blog posts, email campaigns, social content with performance tracking

The profile will remain active for the rest of this session unless you switch to another profile or use `/mcp-unload`.

**To apply this profile:**

[Current implementation status message]

📋 This profile would load:

google-analytics     ✓ Web traffic and behavior data
hubspot             ✓ CRM and email management
mailchimp           ✓ Email campaign execution
gdrive              ✓ Collaboration and assets

NOT loaded (saving context):
✗ salesforce
✗ slack
✗ twitter
✗ linkedin
✗ meta-ads
✗ google-ads
✗ stripe
✗ ahrefs
✗ semrush

Result: 9 MCPs unloaded = ~8K tokens saved
```

---

### Example 2: Minimal Profile

```bash
/mcp-load minimal
```

**Output:**
```
Loading MCP Profile: minimal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Description: Minimal context for lightweight operations
Use Case: Pattern execution, local file work, no external integrations needed

MCPs to load (0):
  (none - all MCPs unloaded)

Token Savings: ~25K tokens (~12.5% of context window)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I'm loading the **minimal** profile. This will:

1. **Unload** all external MCP integrations
2. **Free up** ~25K tokens for maximum context space
3. **Keep** all skills, patterns, and local file operations active

This profile is optimized for: Pattern execution, local file work, no external integrations needed

Perfect for:
- Using patterns (`/pattern`, `/chain`)
- Content editing and refinement
- Strategy planning
- Teaching modules
- Any task that doesn't require external data

Result: ALL 13 MCPs unloaded = ~25K tokens saved (maximum)
```

---

## Error Handling

### Profile Not Found

If user requests invalid profile:

```
❌ Profile "analytics" not found

Valid profiles:
  • content   - Content creation (4 MCPs, saves ~8K tokens)
  • analysis  - Performance analysis (4 MCPs, saves ~9K tokens)
  • social    - Social media (5 MCPs, saves ~8K tokens)
  • seo       - SEO research (4 MCPs, saves ~9K tokens)
  • minimal   - No MCPs (0 MCPs, saves ~25K tokens)

Usage: /mcp-load [profile]
```

### Missing Argument

If user doesn't specify profile:

```
❌ Please specify a profile

Usage: /mcp-load [profile]

Available profiles:
  • content   - For content creation and campaigns
  • analysis  - For performance analysis
  • social    - For social media management
  • seo       - For SEO and search marketing
  • minimal   - For lightweight operations (no MCPs)

Example: /mcp-load content
```

---

## Notes

- **Current Status:** Phase 17.1 planning and documentation complete
- **Implementation:** Commands show intended behavior, full switching TBD
- **Workaround:** Manually edit `.claude/settings.json` before session start
- **Future:** Automatic profile switching without session restart (Phase 17 completion)

---

## Related Commands

- `/mcp-unload` - Unload all MCPs (equivalent to `minimal` profile)
- `/mcp-list` - Show currently active MCPs
- `/prime [context]` - Load context priming (Phase 17.2)

---

## See Also

- **Profile Definitions:** `.claude/mcp-profiles/profiles.json`
- **Full Documentation:** `.claude/mcp-profiles/README.md`
- **Phase 17 Plan:** `dev/active/v4-agentic-best-practices/v4-agentic-best-practices-plan.md`
