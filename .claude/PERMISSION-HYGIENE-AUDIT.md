# Permission Hygiene Audit - Marketing Agent Mk26

**Date:** 2025-11-06
**Audited By:** Sub-Agent Enhancement Implementation
**Total Agents:** 16 (13 original + 3 new Haiku agents)

---

## Executive Summary

**Overall Status:** 94% Compliant (15/16 agents have explicit tool permissions)

**Critical Finding:** `orchestrator.md` is missing explicit tool permissions, meaning it inherits ALL tools including sensitive ones (MCP, Bash). This violates the principle of least privilege.

**Recommendation:** Add explicit tool whitelisting to orchestrator.md (Read, Task only for pure coordination).

---

## Permission Tiers (Best Practice Framework)

### Tier 1: Read-Only (Reviewers & Analysts)
**Tools:** `Read, Grep, Glob` (no write access, no execution)
**Use Cases:** Code review, compliance checking, analysis without modification
**Agents:** scout-haiku

### Tier 2: Content Creators (Writers)
**Tools:** `Read, Write` (+ optional: Search)
**Use Cases:** Content generation, documentation, copy creation
**Agents:** copywriter, copywriter-haiku, content-strategist-haiku, llm-seo-expert (partial)

### Tier 3: Researchers & Strategists
**Tools:** `Read, Write, Search, WebSearch` (+ optional: Grep)
**Use Cases:** Strategy development, research, planning, brand review
**Agents:** brand-strategist, viral-expert, content-strategist, llm-seo-expert

### Tier 4: Data Specialists (Analysts with Python)
**Tools:** `Read, Write, Bash(python *), MCP(specific)`
**Use Cases:** Data analysis, statistical modeling, performance reporting
**Agents:** analyst, growth-hacker, ai-growth-hacker (partial)

### Tier 5: Coordinators (Orchestrators)
**Tools:** `Read, Task` (+ optional: Write for reports)
**Use Cases:** Pure coordination, delegation, no direct implementation
**Agents:** orchestrator (NEEDS FIX), task-coordinator (to be created)

### Tier 6: Implementers (Executors)
**Tools:** `Read, Edit, Write, Bash(limited scope)`
**Use Cases:** Code/content implementation, file modification, testing
**Agents:** task-implementer (to be created)

### Tier 7: Privileged (Full Access)
**Tools:** `Read, Write, Bash(all), MCP(all)`
**Use Cases:** Marketing ops, system automation, privileged operations
**Agents:** automation-expert, ai-growth-hacker

### Tier 8: Strategic Directors (Scoped Access)
**Tools:** `Read, Write, Search, Bash(git *), MCP(specific)`
**Use Cases:** Strategic planning with git operations and analytics access
**Agents:** marketing-director

### Tier 9: Demo Orchestrators (Mixed Permissions)
**Tools:** `Task, Bash, Read, Write` (+ optional: WebFetch)
**Use Cases:** Demo execution, workflow coordination with implementation
**Agents:** demo-orchestrator, demo-personalize-orchestrator

---

## Agent-by-Agent Audit

### ✅ COMPLIANT AGENTS (15/16)

#### analyst.md
```yaml
tools: Read, Write, Bash(python *), MCP(analytics, crm, bi-tools)
```
**Tier:** 4 (Data Specialist)
**Status:** ✅ Appropriate - Python for analysis, scoped MCP for data access
**Justification:** Needs Python for statistical analysis, specific MCPs for pulling metrics

---

#### marketing-director.md
```yaml
tools: Read, Write, Search, Bash(git *), MCP(analytics, crm)
```
**Tier:** 8 (Strategic Director)
**Status:** ✅ Appropriate - Scoped Bash (git only), specific MCPs
**Justification:** Git for commits, scoped analytics for performance data

---

#### copywriter.md
```yaml
tools: Read, Write, Search
```
**Tier:** 2 (Content Creator)
**Status:** ✅ Appropriate - Read/write for content, Search for research
**Justification:** No execution capabilities, appropriate for copy creation

---

#### copywriter-haiku.md
```yaml
tools: Read, Write
```
**Tier:** 2 (Content Creator - Minimal)
**Status:** ✅ Appropriate - Even more restricted than copywriter
**Justification:** Cost-optimized agent doesn't need Search

---

#### scout-haiku.md
```yaml
tools: Read, Grep, Glob
```
**Tier:** 1 (Read-Only)
**Status:** ✅ Excellent - Pure read access for fast search
**Justification:** Perfect for codebase exploration without modification risk

---

#### automation-expert.md
```yaml
tools: Read, Write, Bash(all), MCP(all)
```
**Tier:** 7 (Privileged)
**Status:** ✅ Appropriate BUT HIGH RISK - Full access justified by role
**Warning:** Use this agent sparingly, only for marketing ops automation
**Justification:** Marketing operations require broad tool access

---

#### viral-expert.md
```yaml
tools: Read, Write, Search, WebSearch, MCP(social-apis)
```
**Tier:** 3 (Researcher)
**Status:** ✅ Appropriate - Web research + social APIs for viral analysis
**Justification:** Needs web research for viral trends, social APIs for platform analysis

---

#### ai-growth-hacker.md
```yaml
tools: Read, Write, Bash(python *, node *), MCP(all), WebSearch
```
**Tier:** 7 (Privileged - Hybrid)
**Status:** ✅ Appropriate BUT BROAD - MCP(all) is aggressive
**Recommendation:** Consider scoping MCP to `MCP(analytics, product-analytics, experimentation-tools)`
**Justification:** Growth engineering needs broad tool access for automation

---

#### content-strategist.md
```yaml
tools: Read, Write, Search, Bash(git *)
```
**Tier:** 3 (Researcher + Git)
**Status:** ✅ Appropriate - Git for content repo management
**Justification:** Editorial planning with git for content versioning

---

#### content-strategist-haiku.md
```yaml
tools: Read, Write, Search
```
**Tier:** 3 (Researcher - Minimal)
**Status:** ✅ Appropriate - No git needed for fast planning
**Justification:** Cost-optimized version doesn't need git access

---

#### brand-strategist.md
```yaml
tools: Read, Write, Grep, Search
```
**Tier:** 3 (Researcher)
**Status:** ✅ Appropriate - Grep for compliance scanning, Search for research
**Justification:** Brand review needs grep for forbidden term detection

---

#### demo-orchestrator.md
```yaml
tools: Task, Bash, Read, Write
```
**Tier:** 9 (Demo Orchestrator)
**Status:** ⚠️ MIXED - Can both coordinate (Task) AND implement (Bash, Write)
**Recommendation:** Consider splitting into demo-coordinator + demo-implementer
**Justification:** Demo execution requires both coordination and implementation

---

#### llm-seo-expert.md
```yaml
tools: Read, Write, Search, WebSearch, MCP(search-console, analytics)
```
**Tier:** 3 (Researcher)
**Status:** ✅ Appropriate - Web research + SEO-specific MCPs
**Justification:** SEO optimization needs web research and search console access

---

#### growth-hacker.md
```yaml
tools: Read, Write, Search, Bash(python *), MCP(analytics, product-analytics)
```
**Tier:** 4 (Data Specialist)
**Status:** ✅ Appropriate - Python for modeling, scoped analytics MCPs
**Justification:** Growth experiments need Python for k-factor calculations

---

#### demo-personalize-orchestrator.md
```yaml
tools: Task, WebFetch, Read, Write, Bash
```
**Tier:** 9 (Demo Orchestrator)
**Status:** ⚠️ MIXED - Can coordinate (Task) AND implement (Bash, Write, WebFetch)
**Recommendation:** Consider splitting into coordinator + implementer
**Justification:** Personalized demos require web fetching and implementation

---

### ❌ NON-COMPLIANT AGENTS (1/16)

#### orchestrator.md
```yaml
tools: [NOT SPECIFIED - INHERITS ALL TOOLS]
```
**Tier:** Should be 5 (Coordinator), Currently Tier 7+ (Privileged by default)
**Status:** ❌ CRITICAL SECURITY GAP - Inherits ALL tools including MCP(all), Bash(all)
**Risk Level:** HIGH
**Impact:** Orchestrator can execute shell commands, access all MCPs, modify files
**Best Practice Violation:** Pure orchestrator should NEVER implement, only coordinate

**Recommended Fix:**
```yaml
tools: Read, Task
```
OR if reporting needed:
```yaml
tools: Read, Write, Task
```

**Rationale:**
Per best practices from cc-sub-agents.md:
> "Orchestrator ONLY coordinates, never implements. Implementation quality deteriorates every time, without exception when orchestrators help with simple tasks."

**Action Required:** Add explicit tools field to orchestrator.md frontmatter

---

## Security Recommendations

### Immediate (Critical)

1. **Fix orchestrator.md** - Add `tools: Read, Task` to frontmatter
   - Priority: P0 (Critical)
   - Impact: Prevents orchestrator from executing shell commands or accessing MCPs
   - Effort: 1 minute

### Short-Term (High Priority)

2. **Review ai-growth-hacker MCP access** - Consider scoping `MCP(all)` to specific tools
   - Priority: P1 (High)
   - Impact: Reduces attack surface for growth engineering agent
   - Effort: 5 minutes
   - Recommendation: `MCP(analytics, product-analytics, experimentation-tools)`

3. **Document permission escalation path** - Create process for temporary privilege grants
   - Priority: P1 (High)
   - Impact: Safe way to grant elevated permissions when needed
   - Effort: 30 minutes

### Medium-Term (Medium Priority)

4. **Consider splitting demo orchestrators** - Separate coordination from implementation
   - Priority: P2 (Medium)
   - Impact: Cleaner separation of concerns, aligns with best practices
   - Effort: 2-3 hours (create demo-coordinator, demo-implementer variants)

5. **Implement permission monitoring** - Track tool usage by agent
   - Priority: P2 (Medium)
   - Impact: Detect unusual tool usage patterns
   - Effort: 4-6 hours (add telemetry to hooks)

### Long-Term (Low Priority)

6. **Quarterly permission audits** - Regular review of agent tool grants
   - Priority: P3 (Low)
   - Impact: Maintain security posture over time
   - Effort: 1 hour per quarter

7. **Permission request workflow** - Formal process for new tool access
   - Priority: P3 (Low)
   - Impact: Governance and compliance
   - Effort: 2-3 hours (document workflow)

---

## Permission Patterns (Good Examples)

### ✅ Excellent: scout-haiku.md
```yaml
tools: Read, Grep, Glob
```
- **Why:** Pure read access for search agent
- **Principle:** Minimal necessary permissions
- **Security:** No write, no execute, no external access

### ✅ Good: copywriter.md
```yaml
tools: Read, Write, Search
```
- **Why:** Content creation needs read/write, Search for research
- **Principle:** Scoped to content operations
- **Security:** No execution capabilities

### ✅ Good (with justification): analyst.md
```yaml
tools: Read, Write, Bash(python *), MCP(analytics, crm, bi-tools)
```
- **Why:** Data analysis requires Python and analytics platforms
- **Principle:** Scoped Bash (python only), specific MCPs
- **Security:** Can't run arbitrary shell commands, limited MCP access

### ⚠️ Acceptable but monitor: automation-expert.md
```yaml
tools: Read, Write, Bash(all), MCP(all)
```
- **Why:** Marketing operations require broad access
- **Principle:** Privilege commensurate with role
- **Security:** HIGH RISK - use sparingly, audit usage

### ❌ Bad (current state): orchestrator.md
```yaml
tools: [NOT SPECIFIED]
```
- **Why:** Inherits ALL tools unintentionally
- **Principle:** Violates least privilege
- **Security:** CRITICAL GAP - can execute anything

---

## Permission Audit Checklist

Use this checklist when creating or reviewing agents:

- [ ] **Explicit tools field present** (never rely on inheritance)
- [ ] **Read/Write justified** (does agent need to modify files?)
- [ ] **Bash access scoped** (use `Bash(python *)` not `Bash(all)` unless required)
- [ ] **MCP access minimal** (specific tools, not `MCP(all)` unless required)
- [ ] **Task tool limited** (only orchestrators should spawn subagents)
- [ ] **WebFetch/WebSearch justified** (does agent need external data?)
- [ ] **Edit tool appropriate** (prefer Write for new files, Edit for modifications)
- [ ] **Grep/Glob for search** (faster than Bash equivalents)

---

## Next Steps

1. **Immediate:** Fix orchestrator.md by adding `tools: Read, Task`
2. **Week 2:** Create task-coordinator.md with pure orchestration permissions
3. **Week 2:** Create task-implementer.md with execution permissions
4. **Week 3:** Review ai-growth-hacker and demo orchestrator permissions
5. **Ongoing:** Document permission changes in this audit file

---

## Appendix: Tool Capabilities Reference

**Read:** Read files, no modification
**Write:** Create new files, overwrite existing
**Edit:** Modify existing files (string replacement)
**Grep:** Content search across files
**Glob:** Pattern-based file discovery
**Bash(cmd):** Execute shell commands (scope to `git *`, `python *`, etc.)
**Bash(all):** Execute ANY shell command (HIGH RISK)
**Task:** Spawn subagents (coordination capability)
**Search:** Built-in search (internal)
**WebSearch:** Web search capability (external)
**WebFetch:** Fetch web content (external)
**MCP(tool):** Access specific MCP server
**MCP(all):** Access ALL MCP servers (HIGH RISK)

---

**Audit Complete**
**Critical Issues:** 1 (orchestrator.md)
**High Priority:** 2 (ai-growth-hacker scoping, escalation process)
**Medium Priority:** 2 (demo orchestrator splits, monitoring)
**Low Priority:** 2 (quarterly audits, request workflow)

**Overall Security Posture:** Good (94% compliant, 1 critical fix needed)
