# Review Dev Docs Workflow

👀 **Usage:** `/review-dev-docs [--detail] [task-name]`

**Examples:**
- `/review-dev-docs` (summary of all active tasks)
- `/review-dev-docs --detail` (detailed view of all tasks)
- `/review-dev-docs "email campaign redesign"` (specific task details)

**Purpose:** Review all active dev docs to understand current task status, progress, and priorities.

---

## When to Review Dev Docs

**Regular reviews:**
- 🔄 Start of work session (understand what's active)
- 🔄 Weekly planning (prioritize tasks)
- 🔄 After compaction (verify context restored)
- 🔄 When switching projects (see all open work)

**Ad-hoc reviews:**
- ❓ "What was I working on?"
- ❓ "What tasks are blocked?"
- ❓ "What's the status of [task]?"
- ❓ "What should I work on next?"

---

## Workflow

### Step 1: Scan Active Tasks Directory

Scan `/dev/active/` for all task directories:

```bash
/dev/active/
├── email-campaign-redesign/
├── viral-sharing-features/
├── analytics-dashboard/
└── seo-optimization/
```

**If no active tasks:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DEV DOCS REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No active tasks found in /dev/active/

💡 Tip: Create dev docs with /create-dev-docs [task-name]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 2: Load All Task Metadata

For each active task directory, read:
- `[task]-plan.md` - Extract: task name, goals, estimated time
- `[task]-context.md` - Extract: status, current focus, next step, last updated, blockers
- `[task]-tasks.md` - Extract: progress (X/Y tasks), phase breakdown

**Build task summary:**
```typescript
interface TaskSummary {
  name: string;
  status: 'In Progress' | 'Blocked' | 'Nearly Complete';
  progress: { completed: number; total: number; percentage: number };
  lastUpdated: string;
  age: string; // "2 hours ago", "3 days ago"
  currentFocus: string;
  nextStep: string;
  blockers: number;
  staleness: 'fresh' | 'stale' | 'very-stale'; // <6h, 6-24h, >24h
}
```

### Step 3: Display Summary View (Default)

**Format:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DEV DOCS REVIEW - ACTIVE TASKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary: 4 active tasks, 2 in progress, 1 blocked, 1 nearly complete

────────────────────────────────────────

1️⃣ Email Campaign Redesign
   Status: 🟢 In Progress
   Progress: ████████░░░░░░░░ 52% (13/25 tasks)
   Last Updated: 2 hours ago ✅
   Current Focus: Integrating with SendGrid API
   Next Step: Test SendGrid integration with sample campaign
   Blockers: 0

────────────────────────────────────────

2️⃣ Viral Sharing Features
   Status: 🟡 Blocked
   Progress: ██████░░░░░░░░░░ 38% (5/13 tasks)
   Last Updated: 3 days ago ⚠️  STALE
   Current Focus: Implementing social share buttons
   Next Step: Wait for design team to provide share icons
   Blockers: 2
     🚧 Missing share icon assets from design team
     🚧 API rate limit issue with Twitter embed

────────────────────────────────────────

3️⃣ Analytics Dashboard
   Status: 🟢 In Progress
   Progress: ███████████░░░░░ 71% (10/14 tasks)
   Last Updated: 6 hours ago
   Current Focus: Adding real-time metrics
   Next Step: Implement WebSocket connection for live data
   Blockers: 0

────────────────────────────────────────

4️⃣ SEO Optimization
   Status: 🔵 Nearly Complete
   Progress: ███████████████░ 94% (17/18 tasks)
   Last Updated: 1 day ago ⚠️
   Current Focus: Final testing and validation
   Next Step: Run Lighthouse audit and fix remaining issues
   Blockers: 0

────────────────────────────────────────

🎯 Recommendations:

1. ⚠️  "Viral Sharing Features" is stale (3 days) and blocked
   → Update or archive this task

2. 🔵 "SEO Optimization" nearly done (94%)
   → Prioritize finishing this task

3. 🟢 "Email Campaign Redesign" making good progress
   → Continue current work

4. ⏰ "Viral Sharing Features" needs attention
   → Resolve blockers or update status

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Commands:
   /review-dev-docs --detail          # Detailed view
   /review-dev-docs "task-name"       # Specific task
   /update-dev-docs "task-name"       # Update a task
```

### Step 4: Display Detailed View (--detail flag)

**Format:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DEV DOCS REVIEW - DETAILED VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ Email Campaign Redesign
────────────────────────────────────────

📊 Status & Progress:
   Status: 🟢 In Progress
   Progress: 52% complete (13/25 tasks)
   Last Updated: 2 hours ago ✅
   Created: 5 days ago
   Estimated Time: 40 hours
   Time Spent: ~20 hours (50%)

🎯 Current State:
   Current Focus: Integrating with SendGrid API
   Next Step: Test SendGrid integration with sample campaign
   Blockers: None

📝 Recent Activity:
   ✅ Completed (last 24h): 3 tasks
      - Implement email queue system
      - Add SendGrid authentication
      - Create rate limiting logic

   🔄 In Progress: 2 tasks
      - Test SendGrid integration
      - Add error handling for API failures

🔑 Key Decisions Made:
   - Use Redis queue instead of direct API calls (to handle rate limits)
   - Implement 100 emails/second throttle limit
   - Store failed sends in dead-letter queue

📁 Files Modified (total: 12):
   Recent:
   - src/integrations/sendgrid.ts (SendGrid client)
   - src/lib/email-sender.ts (Queue system)
   - src/components/email-builder.tsx (Template UI)

❓ Open Questions:
   - Should we support multiple email providers or just SendGrid?
   - What's the retry strategy for failed sends?

────────────────────────────────────────

2️⃣ Viral Sharing Features
────────────────────────────────────────

[Similar detailed format for each task...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 5: Display Specific Task View (task-name provided)

**Format:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 TASK DETAILS: Email Campaign Redesign
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 OVERVIEW
────────────────────────────────────────
Status: 🟢 In Progress
Progress: ████████░░░░░░░░ 52% (13/25 tasks)
Last Updated: 2 hours ago ✅
Created: 5 days ago
Estimated Time: 40 hours
Time Spent: ~20 hours (50%)

🎯 CURRENT STATE
────────────────────────────────────────
Current Focus: Integrating with SendGrid API
Next Step: Test SendGrid integration with sample campaign
Blockers: None

✅ COMPLETED TASKS (13/25)
────────────────────────────────────────
Phase 1: Foundation (5/5) ✅ COMPLETE
  ✅ Set up project structure
  ✅ Create database schema
  ✅ Implement email templates
  ✅ Build email builder UI
  ✅ Add template preview

Phase 2: Integration (5/8) 🔄 IN PROGRESS
  ✅ Research SendGrid API
  ✅ Set up API credentials
  ✅ Implement authentication
  ✅ Add rate limiting
  ✅ Create email queue
  ⏳ Test SendGrid integration
  ⏳ Add error handling
  ⏳ Implement retry logic

Phase 3: Testing (3/7)
  ✅ Write unit tests for queue
  ✅ Test rate limiting
  ✅ Test authentication
  ⏳ Integration tests
  ⏳ Load testing
  ⏳ Security audit
  ⏳ Performance optimization

Phase 4: Deployment (0/5)
  ⏳ Set up production environment
  ⏳ Configure monitoring
  ⏳ Deploy to staging
  ⏳ Run smoke tests
  ⏳ Deploy to production

🔑 KEY DECISIONS
────────────────────────────────────────
2025-01-15 - Use Redis queue for email sending
  Context: SendGrid has rate limits (100 emails/sec)
  Decision: Implement Redis-based queue with throttling
  Rationale: Reliable, scalable, prevents rate limit issues
  Alternatives: Direct API calls (would hit limits), delay-based throttling

2025-01-14 - Store templates in database, not filesystem
  Context: Need dynamic template editing
  Decision: Use PostgreSQL JSONB for template storage
  Rationale: Allows runtime editing, version history
  Alternatives: Filesystem (inflexible), S3 (slower)

📁 FILES MODIFIED (12 files)
────────────────────────────────────────
Recent (last 24h):
  - src/integrations/sendgrid.ts (SendGrid API client)
  - src/lib/email-sender.ts (Queue system implementation)
  - src/lib/email-queue.ts (Redis queue wrapper)

Earlier:
  - src/components/email-builder.tsx (Template builder UI)
  - src/lib/email-templates.ts (Template utilities)
  - src/db/schema.ts (Database schema)
  [... 6 more files]

❓ OPEN QUESTIONS
────────────────────────────────────────
1. Should we support multiple email providers or just SendGrid?
   Priority: Medium

2. What's the retry strategy for failed sends?
   Priority: High - needs decision before proceeding

3. How to handle unsubscribe links in transactional emails?
   Priority: Low - can decide later

🚧 BLOCKERS
────────────────────────────────────────
None currently

🧪 TESTING STATUS
────────────────────────────────────────
Tested:
  ✅ Authentication with SendGrid API
  ✅ Rate limiting (100 emails/sec throttle)
  ✅ Queue enqueue/dequeue operations

Needs Testing:
  ⏳ End-to-end email sending
  ⏳ Error handling for API failures
  ⏳ Load testing (1000+ emails/min)
  ⏳ Retry logic for transient failures

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Actions:
   Continue: "Continue working on email campaign redesign"
   Update: /update-dev-docs "email campaign redesign"
   Archive: Move to /dev/archived/ when complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Staleness Detection

**Flag tasks that need attention:**

**Fresh (< 6 hours):** ✅ Green, actively worked on
**Stale (6-24 hours):** ⚠️ Yellow, check if still relevant
**Very Stale (> 24 hours):** 🚨 Red, likely abandoned or blocked

**Recommendations:**
- Stale tasks: Suggest `/update-dev-docs` to refresh
- Very stale + blocked: Suggest archiving or resolving blockers
- Very stale + nearly complete: Prioritize finishing

---

## Prioritization Recommendations

**Display smart recommendations based on:**

1. **Nearly complete tasks (>90%)** → Finish first
2. **Blocked tasks** → Resolve blockers or archive
3. **Stale tasks** → Update or archive
4. **High-value, in-progress tasks** → Continue
5. **Recently updated, making progress** → Keep momentum

**Example:**
```
🎯 Recommendations:

1. 🔵 Finish "SEO Optimization" (94% done)
   → Only 1 task remaining, ship it!

2. ⚠️  Resolve blockers in "Viral Sharing Features"
   → Blocked for 3 days, needs attention

3. 🟢 Continue "Email Campaign Redesign"
   → Good progress (52%), updated recently

4. 📦 Consider archiving "Analytics Dashboard" if not urgent
   → 71% done but hasn't been touched in 6 hours
```

---

## Comparison View

**Compare tasks side-by-side:**

```
/review-dev-docs --compare

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TASK COMPARISON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    Email       Viral      Analytics   SEO
                    Campaign    Sharing    Dashboard   Opt.
─────────────────────────────────────────────────────────────
Status              Progress    Blocked    Progress    Nearly
Progress            52%         38%        71%         94%
Last Updated        2h ago      3d ago     6h ago      1d ago
Blockers            0           2          0           0
Staleness           Fresh       Stale      Fresh       Stale
Estimated Time      40h         20h        25h         8h
Time Spent          20h         8h         18h         7.5h
Completion ETA      5 days      Blocked    2 days      <1 day

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Priority Order (recommended):
   1. SEO Opt. (finish today!)
   2. Email Campaign (good momentum)
   3. Viral Sharing (resolve blockers first)
   4. Analytics Dashboard (continue after others)
```

---

## Archive Suggestions

**When to suggest archiving:**

- ✅ Task 100% complete
- ⏸️ Task abandoned (stale >7 days)
- 🚫 Task blocked indefinitely
- 🔄 Task deprioritized/cancelled

**Archive command suggestion:**
```
💡 Tip: Archive completed/abandoned tasks:
   mkdir -p /dev/archived/
   mv /dev/active/[task]/ /dev/archived/[task]-[date]/
```

---

## Integration with Other Commands

**Quick actions from review:**

```
After reviewing tasks:

→ Continue task: "Continue working on [task]"
→ Update task: /update-dev-docs "[task]"
→ Create new task: /create-dev-docs "[task]"
→ Specific details: /review-dev-docs "[task]"
```

---

## Best Practices

**DO:**
- ✅ Review at start of each session
- ✅ Archive completed tasks regularly
- ✅ Update stale tasks or mark as blocked
- ✅ Use review to prioritize work

**DON'T:**
- ❌ Let tasks go stale without updating
- ❌ Keep too many active tasks (>5 = context switch overhead)
- ❌ Forget to archive completed tasks
- ❌ Ignore blocked tasks indefinitely

---

## Time Estimate

- Summary view: 10-15 seconds
- Detailed view: 30-45 seconds
- Specific task view: 15-20 seconds
- Compare view: 20-30 seconds

**Use this:** At start of every session to understand current state

---

## Example Use Cases

**1. "What should I work on?"**
```
/review-dev-docs
→ See all tasks, priorities, recommendations
→ Pick highest priority or continue current momentum
```

**2. "What was I doing before compaction?"**
```
/review-dev-docs --detail
→ See recent activity, decisions, next steps
→ Resume most recent task
```

**3. "Status update for standup?"**
```
/review-dev-docs
→ Copy progress percentages and blockers
→ Share in team standup
```

**4. "Clean up abandoned work"**
```
/review-dev-docs
→ Identify very stale tasks
→ Archive or update them
```
