---
category: workflow
complexity: complex
model: sonnet
thinking: think-hard (architect only), standard (validation/planning)
estimated_time: 43-65 minutes
estimated_cost: $1.09-2.15
version: 1.2.0
---

# Pattern: Enhanced Planning

## PURPOSE

Comprehensive research-first planning workflow for complex software development tasks. Orchestrates parallel research, architecture design with think-hard, validation with standard thinking, and plan creation with standard thinking to produce deeply researched, architecturally sound implementation plans.

## EXECUTION INSTRUCTIONS FOR CLAUDE

When this pattern is invoked, Claude MUST execute the following 4 stages in order. Each stage is MANDATORY:

### STAGE EXECUTION CHECKLIST:
- [ ] Stage 1: Spawn 2-3 research scouts in parallel (Task tool + research-scout subagent)
- [ ] Stage 2: Spawn system-architect agent with think-hard (Task tool + system-architect subagent)
- [ ] Stage 3: Validate architecture with 9-point checklist (standard thinking)
- [ ] Stage 4: Create implementation plan (standard thinking)
- [ ] Create dev docs for session handoff

**DO NOT**:
- Skip any stage
- Combine stages
- Proceed to next stage before previous completes
- Create architecture without research
- Create plan without validated architecture

## INPUT

- **TASK**: Software development goal (e.g., "implement GraphQL API for e-commerce")
- **REQUIREMENTS**: Functional and non-functional requirements
- **CONSTRAINTS**: Time, budget, team expertise, existing systems

## WHEN TO USE

**✅ Use this pattern for:**
- New systems/services (greenfield projects)
- Unfamiliar technology stacks
- Scalability-critical systems
- High-stakes projects (production-critical)
- Complex integrations
- Architectural decisions needed
- Security-sensitive systems
- Major refactors/migrations

**❌ Skip this pattern for:**
- Simple feature additions
- Bug fixes
- Well-understood patterns
- Time-sensitive hotfixes
- Minor changes

**Rule**: If failure costs > $100 or affects > 100 users, use this pattern

## Task Decomposition Override (v5.4.0)

**CRITICAL:** This pattern overrides Claude's default task decomposition behavior. YOU MUST follow the 3-phase sequence below. DO NOT create your own task breakdown.

### ❌ PROHIBITED SEQUENCE
1. ❌ Creating architecture without research foundation
2. ❌ Skipping validation before planning
3. ❌ Combining stages or proceeding without stage completion
4. ❌ Creating plans without risk assessment

**Consequences:** Uninformed architecture, missing quality gates, preventable failures → ARCHITECTURE VIOLATION

### ✅ MANDATORY 3-PHASE SEQUENCE

#### Phase 1: Requirements Analysis & Research Scope
**Decision Point:** Define research topics and establish planning foundation

**YOU MUST:**
1. Analyze the software development task and extract technology keywords
2. Generate 2-3 research topics ([Primary Tech] best practices, [Domain] architecture, [Integration] patterns)
3. Create sanitized task subdirectory for research organization
4. Spawn 2-3 research-scout agents in parallel (haiku model)
5. Wait for all research reports to complete (quality check: 5+ sources per topic, high confidence)

**Output Acknowledgment After Phase 1:**
```
✅ Phase 1 Complete - Research Foundation Established
📋 Research Topics: [topic 1], [topic 2], [topic 3]
📊 Reports Generated: [count] reports, [total sources] sources
🎯 Confidence Levels: [High/Medium/Low for each]
⏭️  Proceeding to Phase 2: Architecture Design
```

#### Phase 2: Architecture Design & Validation
**YOU MUST:**
1. Load all research reports from Phase 1
2. Spawn system-architect agent with think-hard mode (Sonnet model)
3. Create comprehensive architecture proposal (3-10 pages based on complexity)
4. Immediately create dev docs for session continuity (`/create-dev-docs`)
5. Execute systematic validation against 9 criteria (Completeness, Best Practices, Scalability, Technology Fit, Trade-offs, Security, Cost, Maintainability, Risk Management)
6. Make clear APPROVED or REVISE decision (max 1 revision cycle)

**Output Acknowledgment After Phase 2:**
```
✅ Phase 2 Complete - Architecture Designed & Validated
📋 Architecture: [page count] pages, [component count] components
📊 Validation: [criteria passed]/9 criteria passed
🎯 Decision: [APPROVED/REVISE]
📄 Dev Docs: Created for session continuity
⏭️  Proceeding to Phase 3: Implementation Planning
```

#### Phase 3: Implementation Planning & Risk Management
**YOU MUST:**
1. Load validated architecture and research reports
2. Create 4-phase implementation plan (Foundation & Validation, Core Features, Integration & Robustness, Optimization & Polish)
3. Define quality gates for each phase
4. Map critical path and dependencies
5. Identify and document risks with mitigations
6. Create comprehensive testing strategy
7. Define measurable success criteria

**Output Acknowledgment After Phase 3:**
```
✅ Phase 3 Complete - Enhanced Planning Pattern Finished
📋 Implementation Plan: 4 phases, [task count] tasks
📊 Quality Gates: Defined for each phase
🎯 Risks: [count] identified with mitigations
📄 Next Steps: [first 3 tasks documented]
✅ Pattern execution complete
```

## Language Standards (v5.4.0)

**Directive Language:** This pattern uses imperative commands.
- ✅ "YOU MUST", "DO NOT", "ALWAYS", "NEVER"
- ❌ "should", "consider", "might", "could", "try to"

**Rationale:** Weak language leads to inconsistent execution. Strong directives ensure reliable pattern application.

## PROCESS

### STAGE 1: PARALLEL RESEARCH (3-5 minutes)

**Goal**: Gather best practices and official documentation before designing

**Technology Extraction**:
1. Parse TASK for technology keywords
   - Example: "implement GraphQL API for e-commerce"
   - Technologies: [GraphQL, API, e-commerce]
   - Verbs: [implement, design, build]

2. Generate 2-3 research topics:
   - "[Primary Technology] best practices 2025"
   - "[Domain] architecture patterns"
   - "[Integration Point] design patterns" (if applicable)

**Task Subdirectory**:
Create a sanitized subdirectory name from the TASK:
- Example: "implement GraphQL API for e-commerce" → "graphql-api-ecommerce"
- Lowercase, replace spaces with hyphens, remove special characters
- This groups all research for this task together

**Research Execution**:
```
Spawn 2-3 research-scout agents in parallel:

Agent 1: research-scout (haiku)
Task: "Research [topic 1] --task-subdirectory='[sanitized-task-name]'

Focus on:
- Best practices from 2024-2025
- Common patterns and anti-patterns
- Scalability considerations
- Security implications
- Real-world examples
Search 5-10 credible sources and create comprehensive report."

Agent 2: research-scout (haiku)
Task: "Research [topic 2] --task-subdirectory='[sanitized-task-name]'

Focus on:
- Architecture patterns
- Technology comparisons
- Integration strategies
- Performance optimization
- Cost considerations
Search 5-10 credible sources and create comprehensive report."

Agent 3 (optional): research-scout (haiku)
Task: "Research [topic 3] --task-subdirectory='[sanitized-task-name]'

Focus on:
- [Third relevant topic]
Search 5-10 credible sources and create comprehensive report."

Wait for all agents to complete (3-5 minutes wall time).
Collect outputs from: research/[sanitized-task-name]/[topic-1].md,
                      research/[sanitized-task-name]/[topic-2].md, etc.
```

**Quality Check**:
- [ ] Minimum 5 sources per topic
- [ ] High confidence ratings (3+ high-credibility sources)
- [ ] Recent information (2024-2025 focus)
- [ ] Best practices clearly identified
- [ ] Warnings and pitfalls documented

**Output**:
- 2-3 research reports (~1,000-2,000 lines each)
- Saved to `research/[sanitized-task-name]/[topic].md`
- All research for this task grouped in one subdirectory
- Ready for architecture stage

---

### STAGE 2: ARCHITECTURE DESIGN (10-15 minutes)

**Goal**: Create comprehensive system architecture with deep reasoning

**Agent**: system-architect (Sonnet + think-hard)

**Context Preparation**:
1. Load research reports from Stage 1
2. Load task requirements and constraints
3. Load existing system patterns (if available)

**Architecture Creation**:
```
Use system-architect agent with think-hard mode:

"You are designing the architecture for: [TASK]

Context available:
- Research Report 1: [summary of key findings]
- Research Report 2: [summary of key findings]
- Requirements: [list requirements]
- Constraints: [list constraints]

With think-hard mode, think deeply about:
- Why this architecture over alternatives?
- What are the long-term implications and maintenance burden?
- What could go wrong at scale? What are failure modes?
- What are the hidden costs and trade-offs?
- How does this align with research best practices?
- What assumptions am I making and are they valid?

Create architecture proposal (3-10 pages depending on task complexity):
- **Simple tasks** (3-5 pages): Focus on diagram, key components, main decisions
- **Complex systems** (7-10 pages): Add detailed analysis, multiple alternatives, deep trade-offs
- Include only sections relevant to the task (not all 12 sections mandatory)

Essential sections:

## 1. System Design Diagram
[ASCII diagram showing components, data flow, external systems]

## 2. Component Specifications

For each component:
- **Name**: [Component name]
- **Responsibility**: [What it does]
- **Technology Choice**: [Technology] with rationale based on research
- **Alternatives Considered**: [Other options] and why rejected
- **Interfaces**: [Input/output, APIs]
- **Scaling Strategy**: [How it scales]
- **Failure Modes**: [What can go wrong]
- **Dependencies**: [What it depends on]

## 3. Data Architecture

- **Data Models**: [Entities, relationships, schema]
- **Data Flow**: [How data moves through system]
- **Consistency Strategy**: [Strong/eventual/mixed and why]
- **Storage Technology**: [Database/storage choice with rationale]

## 4. API Design (if applicable)

| Method | Endpoint | Purpose | Request | Response |
|--------|----------|---------|---------|----------|
| [HTTP method] | [path] | [what it does] | [payload] | [return] |

- **Authentication**: [Method and rationale]
- **Authorization**: [RBAC/ABAC/etc and why]
- **Error Handling**: [Strategy]
- **Versioning**: [Approach]

## 5. Scalability Analysis

- **Performance Requirements**: [RPS, latency, data volume]
- **Bottlenecks**: [Where system will struggle]
- **Mitigations**: [How to address bottlenecks]
- **Caching Strategy**: [What, where, how]
- **Database Scaling**: [Replication, sharding, read replicas]
- **Horizontal Scaling**: [What scales horizontally]

## 6. Security Considerations

- **Threat Model**: [Key threats]
- **Authentication**: [How users/services authenticate]
- **Authorization**: [Permission model]
- **Data Protection**: [Encryption at rest/transit]
- **Input Validation**: [Where and how]
- **Audit Logging**: [What gets logged]
- **Compliance**: [GDPR, HIPAA, etc if applicable]

## 7. Technology Choices

For each major technology:
- **Technology**: [Name]
- **Use Case**: [What we're using it for]
- **Why Chosen**: [Reasons based on research and requirements]
- **Alternatives**: [What else we considered]
- **Why Not Alternatives**: [Reasons for rejection]
- **Trade-offs**:
  - ✅ Pros: [benefits]
  - ❌ Cons: [costs/limitations]
- **Research Support**: [What research says about this choice]

## 8. Architecture Decision Records (ADRs)

### ADR 001: [Decision Title]
- **Status**: Proposed
- **Context**: [Problem we're solving]
- **Decision**: [What we decided]
- **Consequences**:
  - Positive: [benefits]
  - Negative: [trade-offs]
  - Risks: [what could go wrong]
- **Alternatives**: [What else we considered and why rejected]

[Additional ADRs for each major decision]

## 9. Risk Assessment

### High Priority Risks
**Risk 1**: [Description of risk]
- **Likelihood**: [High/Medium/Low]
- **Impact**: [High/Medium/Low]
- **Mitigation**: [How we'll reduce likelihood/impact]
- **Contingency**: [Backup plan if it occurs]
- **Early Warning Signs**: [How we'll detect it early]

### Medium Priority Risks
[Similar format]

### Low Priority Risks
[Similar format]

## 10. Cost Estimate

### Infrastructure Costs
- [Service 1]: [Estimated monthly cost and rationale]
- [Service 2]: [Estimated monthly cost and rationale]
- **Total Monthly**: [Sum]

### Development Costs
- **Timeline**: [Estimated weeks/months]
- **Team Size**: [Number and roles]
- **Total Effort**: [Person-weeks/months]

### Ongoing Costs
- **Maintenance**: [Estimated effort]
- **Monitoring**: [Tools and costs]
- **Support**: [Expected support burden]

## 11. Implementation Considerations

- **Prerequisites**: [What must exist before starting]
- **Critical Path**: [Longest dependency chain]
- **Quick Wins**: [What can be built first to validate]
- **Riskiest Parts**: [What to tackle early]
- **Team Requirements**: [Skills/expertise needed]

## 12. Success Metrics

- **Functional**: [How we know it works]
- **Performance**: [Latency/throughput targets]
- **Scalability**: [Load targets]
- **Reliability**: [Uptime target]
- **Security**: [Security requirements met]
- **Cost**: [Within budget]
- **User Satisfaction**: [How we measure]"

Save architecture proposal to: dev/active/[task]/architecture-proposal.md

THEN immediately create dev docs for session continuity:
/create-dev-docs [task-name] "[task description]"

This enables seamless multi-session work without context loss.
```

**Quality Check**:
- [ ] All requirements addressed
- [ ] Technology choices justified with research
- [ ] Scalability analyzed
- [ ] Security implications considered
- [ ] ADRs for key decisions
- [ ] Risks identified with mitigations
- [ ] Cost estimates provided
- [ ] Think-hard applied throughout
- [ ] Dev docs created for session continuity

**Output**:
- Architecture proposal (3-10 pages: 3 for simple tasks, 10 for complex systems)
- Depth matches task complexity (not all sections needed for every task)
- Deeply reasoned with think-hard
- Research-backed decisions
- **Dev docs created** (`/create-dev-docs` for session handoff)

---

### STAGE 3: VALIDATION (5-10 minutes)

**Goal**: Critically validate architecture against research and requirements

**Agent**: Main agent (Sonnet, standard thinking)

**Context Loading**:
1. Read all research reports from Stage 1
2. Read architecture proposal from Stage 2
3. Review task requirements and constraints

**Validation Process**:
```
Critically analyze the architecture proposal:

Think deeply about:
- What has the architect missed or overlooked?
- What assumptions are questionable or risky?
- What will be hardest to maintain long-term?
- What's the biggest risk to project success?
- Are there simpler alternatives that achieve the same goals?
- What will the team struggle with?
- What costs are underestimated?

Perform systematic validation against 9 criteria:

## 1. COMPLETENESS CHECK

Cross-reference architecture against requirements:
- [ ] Every requirement has a corresponding component/design
- [ ] No requirements ignored or forgotten
- [ ] Edge cases considered
- [ ] Error handling specified
- [ ] Monitoring and observability included

**Gaps Found**: [List any requirements not addressed]
**Missing Elements**: [What's missing from the architecture]

## 2. BEST PRACTICES COMPLIANCE

Cross-reference architecture against research:
- [ ] Follows research recommendations
- [ ] Industry standards applied
- [ ] Common anti-patterns avoided
- [ ] Proven patterns used appropriately

**Research Alignment**: [How well it follows research findings]
**Anti-patterns**: [Any problematic patterns detected]
**Improvements**: [How to better align with best practices]

## 3. SCALABILITY VALIDATION

Analyze scaling approach:
- [ ] Load estimates are realistic
- [ ] Bottlenecks identified correctly
- [ ] Mitigation strategies are sound
- [ ] Horizontal scaling possible
- [ ] Database scaling addressed
- [ ] Caching strategy appropriate

**Scaling Concerns**: [What might not scale as expected]
**Load Testing**: [What needs to be tested under load]
**Improvements**: [Better scaling approaches]

## 4. TECHNOLOGY FIT ASSESSMENT

Evaluate technology choices:
- [ ] Technologies fit the use case
- [ ] Team has or can acquire expertise
- [ ] Not over-engineering with unnecessary tech
- [ ] Not under-engineering with inadequate tech
- [ ] Alternatives properly evaluated

**Technology Mismatches**: [Where tech doesn't fit]
**Expertise Gaps**: [What team needs to learn]
**Better Alternatives**: [Technologies that might work better]

## 5. TRADE-OFFS JUSTIFICATION

Examine trade-off analysis:
- [ ] Trade-offs are clearly documented
- [ ] Trade-offs are acceptable given requirements
- [ ] Hidden trade-offs uncovered
- [ ] Better compromises exist

**Questionable Trade-offs**: [Trade-offs that concern you]
**Hidden Costs**: [Trade-offs not fully explored]
**Better Compromises**: [Alternative trade-offs to consider]

## 6. SECURITY REVIEW

Assess security posture:
- [ ] Threat model is comprehensive
- [ ] Authentication/authorization appropriate
- [ ] Data protection adequate
- [ ] Common vulnerabilities addressed (OWASP Top 10)
- [ ] Compliance requirements met

**Security Gaps**: [What's missing from security design]
**Vulnerabilities**: [Potential security issues]
**Improvements**: [How to strengthen security]

## 7. COST-EFFECTIVENESS ANALYSIS

Evaluate cost estimates:
- [ ] Infrastructure costs realistic
- [ ] Not over-provisioning
- [ ] Not under-provisioning
- [ ] Ongoing costs considered
- [ ] Cost optimization opportunities identified

**Cost Concerns**: [Where costs might exceed estimates]
**Over-provisioning**: [Where we might be wasting money]
**Cost Optimization**: [How to reduce costs without compromising quality]

## 8. MAINTAINABILITY ASSESSMENT

Analyze long-term maintenance:
- [ ] Architecture is understandable
- [ ] Complexity is justified
- [ ] Team can maintain it
- [ ] Documentation is sufficient
- [ ] Troubleshooting is feasible

**Maintenance Burden**: [What will be hard to maintain]
**Complexity Concerns**: [Unnecessary complexity]
**Documentation Needs**: [What needs better documentation]

## 9. RISK MANAGEMENT REVIEW

Evaluate risk assessment:
- [ ] All major risks identified
- [ ] Risk likelihood/impact realistic
- [ ] Mitigation strategies sound
- [ ] Contingency plans exist
- [ ] Early warning signs defined

**Missing Risks**: [Risks not identified]
**Inadequate Mitigations**: [Where mitigation is weak]
**Critical Risks**: [Risks that could kill the project]

---

## VALIDATION DECISION

Based on the analysis above:

**[ ] APPROVED** - Architecture is sound, proceed to planning
  - All criteria validated
  - Minor improvements noted but not blocking
  - Risk level acceptable

**[ ] REVISE** - Architecture needs revision before planning
  - Specific gaps identified: [list critical gaps]
  - Must address: [list must-fix items]
  - Recommended improvements: [list suggestions]
  - Return to Stage 2 for revision (max 1 revision cycle)

**Critical Issues** (if any):
1. [Issue 1]: [Why it's critical] → [Suggested fix]
2. [Issue 2]: [Why it's critical] → [Suggested fix]

**Recommended Improvements** (even if approved):
1. [Improvement 1]: [Benefit]
2. [Improvement 2]: [Benefit]
```

**Quality Check**:
- [ ] All 9 criteria evaluated
- [ ] Specific issues identified (not vague concerns)
- [ ] Clear approval or revision decision
- [ ] Actionable feedback provided
- [ ] Ultrathink applied for deep critique

**Output**:
- Validation report with decision (APPROVED or REVISE)
- Specific gaps and improvements
- Saved to `dev/active/[task]/validation-report.md`

---

### STAGE 4: COMPREHENSIVE PLANNING (5-10 minutes)

**Goal**: Create detailed implementation plan synthesizing all context

**Agent**: Main agent (Sonnet, standard thinking)

**Context Loading**:
1. Load research reports (Stage 1)
2. Load validated architecture (Stage 2 + 3)
3. Load task requirements
4. Load existing codebase patterns

**Planning Process**:
```
Create comprehensive implementation plan:

Think deeply about:
- What's the optimal implementation order to minimize risk?
- Where are the critical path bottlenecks?
- What should we build first to validate key assumptions?
- What's the riskiest part that we should tackle early?
- How do we deliver incremental value while building toward the vision?
- What could cause this project to fail and how do we prevent it?

Create detailed implementation plan:

# Implementation Plan: [TASK]

## Executive Summary

**Goal**: [One sentence description]

**Scope**: [What's included and excluded]

**Key Architecture Decisions** (from Stage 2):
1. [Decision 1]: [Rationale]
2. [Decision 2]: [Rationale]
3. [Decision 3]: [Rationale]

**Timeline**: [Estimated duration]

**Success Criteria**:
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

---

## Architecture Overview

[High-level diagram from Stage 2]

**Components**:
- [Component 1]: [Brief description and technology]
- [Component 2]: [Brief description and technology]
- [Component 3]: [Brief description and technology]

**Technology Stack**:
- [Technology 1]: [Purpose]
- [Technology 2]: [Purpose]
- [Technology 3]: [Purpose]

**Key Patterns** (from research):
- [Pattern 1]: [Where applied]
- [Pattern 2]: [Where applied]

---

## Implementation Phases

### Phase 1: Foundation & Validation

**Goal**: Establish infrastructure and validate core assumptions

**Duration**: [Estimated time]

**What We're Building**:
- [Core component that validates architecture]
- [Basic infrastructure setup]
- [Proof of concept for riskiest assumption]

**Tasks** (15-60 minutes each):
1. [Task 1.1]: [Description]
   - Files: [Which files to create/modify]
   - Dependencies: [What must be done first]
   - Testing: [How to validate]

2. [Task 1.2]: [Description]
   - Files: [Which files to create/modify]
   - Dependencies: [What must be done first]
   - Testing: [How to validate]

[Continue for all Phase 1 tasks]

**Dependencies**:
- Prerequisites: [What must exist before starting this phase]
- Blockers: [What could stop this phase]

**Risk**:
- **Primary Risk**: [Biggest risk in this phase]
- **Mitigation**: [How we reduce the risk]
- **Contingency**: [Backup plan if risk occurs]

**Validation Checkpoint**:
- [ ] [Success criterion 1 for this phase]
- [ ] [Success criterion 2 for this phase]
- [ ] [Success criterion 3 for this phase]

**Decision Point**: Proceed to Phase 2 only if all validation checkpoints pass

---

### Phase 2: Core Features

**Goal**: Implement primary functionality

**Duration**: [Estimated time]

**What We're Building**:
- [Main feature 1]
- [Main feature 2]
- [Integration with foundation from Phase 1]

**Tasks** (15-60 minutes each):
[Similar structure to Phase 1]

**Dependencies**:
- Phase 1 must be complete and validated
- [Other dependencies]

**Risk**:
[Similar structure to Phase 1]

**Validation Checkpoint**:
[Similar structure to Phase 1]

**Decision Point**: Proceed to Phase 3 only if all validation checkpoints pass

---

### Phase 3: Integration & Robustness

**Goal**: Connect components and handle edge cases

**Duration**: [Estimated time]

**What We're Building**:
- [Integration point 1]
- [Error handling and edge cases]
- [Monitoring and observability]

**Tasks** (15-60 minutes each):
[Similar structure]

**Dependencies**:
[Similar structure]

**Risk**:
[Similar structure]

**Validation Checkpoint**:
[Similar structure]

**Decision Point**: Proceed to Phase 4 only if all validation checkpoints pass

---

### Phase 4: Optimization & Polish

**Goal**: Performance, security, and production readiness

**Duration**: [Estimated time]

**What We're Building**:
- [Performance optimizations]
- [Security hardening]
- [Production configuration]
- [Documentation]

**Tasks** (15-60 minutes each):
[Similar structure]

**Dependencies**:
[Similar structure]

**Risk**:
[Similar structure]

**Validation Checkpoint**:
[Similar structure]

**Decision Point**: Ready for production deployment

---

## Critical Path Analysis

**Longest Dependency Chain**:
1. [Task A] → [Task B] → [Task C] → [Task D]
2. Timeline: [How long this path takes]
3. Bottleneck: [Where we might get stuck]

**Parallel Work Opportunities**:
- [Tasks X, Y, Z] can be done simultaneously
- [Tasks P, Q] can start while [Task R] is in progress

**Quick Wins** (for early validation):
1. [Task that delivers value quickly]: [Why this validates approach]
2. [Task that proves concept]: [Why this reduces risk]

---

## Dependency Map

### Phase Dependencies
- Phase 1 → Phase 2 → Phase 3 → Phase 4 (sequential)
- Phase 2 tasks 2.1, 2.2, 2.3 can run in parallel
- Phase 3 requires Phase 2 complete

### External Dependencies
- [API/Service 1]: [What we need from it]
- [Library/Tool 1]: [Version and capabilities needed]
- [Team/Person 1]: [Input or collaboration needed]

### Technical Dependencies
- [Technology 1] must be set up before [Task X]
- [Configuration 1] must be complete before [Phase Y]

---

## Risk Management

### High Priority Risks

**Risk H1**: [Description of high-impact risk]
- **Category**: [Technical/Resource/Schedule/External]
- **Likelihood**: High/Medium/Low
- **Impact**: High/Medium/Low
- **Phase**: [When this risk is most critical]
- **Mitigation**: [How we reduce likelihood or impact]
- **Contingency**: [Backup plan if risk occurs]
- **Early Warning Signs**: [How we'll detect it early]
- **Owner**: [Who monitors and manages this risk]

[Additional high priority risks]

### Medium Priority Risks
[Similar structure]

### Low Priority Risks
[Similar structure]

### Risk Monitoring
- **Weekly Review**: [Which risks to review weekly]
- **Daily Monitoring**: [Which risks to monitor daily]
- **Triggers**: [What events trigger risk escalation]

---

## Testing Strategy

### Unit Testing
- **Scope**: [What gets unit tested]
- **Coverage Target**: [Percentage]
- **Tools**: [Testing framework]
- **When**: [During development, before commit, CI]

### Integration Testing
- **Scope**: [What integrations to test]
- **Test Cases**: [Key scenarios]
- **Tools**: [Testing tools]
- **When**: [After each phase, before merge]

### Performance Testing
- **Scope**: [What to performance test]
- **Targets**: [Latency, throughput goals from architecture]
- **Load Profiles**: [Expected load patterns]
- **Tools**: [Load testing tools]
- **When**: [Phase 3 and Phase 4]

### Security Testing
- **Scope**: [Security test areas]
- **Tests**: [Penetration testing, vulnerability scanning]
- **Tools**: [Security testing tools]
- **When**: [Phase 4, before production]

### User Acceptance Testing
- **Scope**: [What users will test]
- **Test Cases**: [User workflows]
- **Success Criteria**: [What users must validate]
- **When**: [After Phase 3 or Phase 4]

---

## Quality Gates

### Phase Completion Gates

Each phase must pass these gates before proceeding:

**Phase 1 Gate**:
- [ ] All tasks complete
- [ ] Unit tests passing (coverage > [target]%)
- [ ] Integration tests passing
- [ ] Architecture validated (proof of concept works)
- [ ] No high priority risks materialized
- [ ] Code reviewed and approved

**Phase 2 Gate**:
- [ ] All tasks complete
- [ ] Core features functional
- [ ] Unit tests passing (coverage > [target]%)
- [ ] Integration tests passing
- [ ] Performance acceptable (within 2x of targets)
- [ ] No high priority risks materialized
- [ ] Code reviewed and approved

**Phase 3 Gate**:
- [ ] All tasks complete
- [ ] All integrations working
- [ ] Edge cases handled
- [ ] Unit + integration tests passing
- [ ] Performance tests passing (within 1.2x of targets)
- [ ] Security scan clean
- [ ] Documentation complete
- [ ] Code reviewed and approved

**Phase 4 Gate** (Production Readiness):
- [ ] All optimizations complete
- [ ] Performance targets met or exceeded
- [ ] Security tests passing
- [ ] Penetration testing complete
- [ ] Load testing at 2x expected load successful
- [ ] Monitoring and alerting configured
- [ ] Documentation complete and reviewed
- [ ] Runbooks created
- [ ] Disaster recovery plan tested
- [ ] Stakeholder approval obtained

---

## Success Criteria

### Functional Requirements
- [ ] [Requirement 1] fully implemented and tested
- [ ] [Requirement 2] fully implemented and tested
- [ ] All edge cases handled
- [ ] Error handling comprehensive

### Non-Functional Requirements
- [ ] **Performance**: [Target metric] achieved
- [ ] **Scalability**: Handles [load target] with <[latency target]
- [ ] **Reliability**: [Uptime target] demonstrated
- [ ] **Security**: Passes security review, no high/critical vulnerabilities
- [ ] **Maintainability**: Code review rating > [target], documentation complete

### Business Requirements
- [ ] **Cost**: Within [budget]
- [ ] **Timeline**: Delivered by [date]
- [ ] **User Satisfaction**: [Metric] > [target]

### Quality Requirements
- [ ] **Test Coverage**: > [target]%
- [ ] **Code Quality**: Linting passing, no tech debt
- [ ] **Documentation**: Complete and accurate

---

## Rollback Plan

If critical issues arise in production:

**Rollback Trigger**: [What conditions trigger rollback]

**Rollback Procedure**:
1. [Step 1 to roll back]
2. [Step 2 to roll back]
3. [Step 3 to roll back]

**Data Migration Rollback**: [How to handle data if schema changed]

**Communication Plan**: [Who to notify and how]

**Post-Rollback**: [How to investigate and fix the issue]

---

## Next Steps

### Immediate Actions (Start Here)
1. **[First task]**: [Why this is first]
   - Estimated time: [Duration]
   - Files: [Which files]
   - Expected outcome: [What you'll have]

2. **[Second task]**: [Why this is second]
   - Estimated time: [Duration]
   - Files: [Which files]
   - Expected outcome: [What you'll have]

3. **[Third task]**: [Why this is third]
   - Estimated time: [Duration]
   - Files: [Which files]
   - Expected outcome: [What you'll have]

### Quick Wins (Validate Approach)
- [Quick win task 1]: Proves [assumption]
- [Quick win task 2]: Delivers [value]

### Checkpoint (After Phase 1)
- Review architecture assumptions
- Adjust plan based on learnings
- Re-estimate remaining phases

---

## Appendix: Research Findings

### Key Best Practices (from Stage 1)
1. [Best practice 1 from research]
2. [Best practice 2 from research]
3. [Best practice 3 from research]

### Patterns Applied
1. [Pattern 1]: Applied in [component/phase]
2. [Pattern 2]: Applied in [component/phase]

### Anti-Patterns Avoided
1. [Anti-pattern 1]: Why we're avoiding it
2. [Anti-pattern 2]: Why we're avoiding it

### Research Sources
- [Source 1]: [Key findings]
- [Source 2]: [Key findings]
```

**Quality Check**:
- [ ] Phases are logical and build on each other
- [ ] Tasks are sized appropriately (15-60 min)
- [ ] Dependencies clearly identified
- [ ] Risks managed with mitigations
- [ ] Testing strategy comprehensive
- [ ] Success criteria measurable
- [ ] Ultrathink applied for synthesis

**Output**:
- Comprehensive implementation plan (20-40 pages)
- Actionable with clear next steps
- Risk-aware with quality gates
- Saved to `dev/active/[task]/[task]-plan.md`

---

## OUTPUT

### Files Created

All outputs saved to `dev/active/[task]/`:

1. **research/[topic-1].md**
   - Research report for first topic
   - 1,000-2,000 lines
   - 5-10 sources with confidence ratings

2. **research/[topic-2].md**
   - Research report for second topic
   - 1,000-2,000 lines
   - 5-10 sources with confidence ratings

3. **architecture-proposal.md**
   - Architecture design (depth matches task complexity)
   - 3-10 pages (3 for simple, 10 for complex systems)
   - Created with think-hard

4. **validation-report.md**
   - Validation results and decision
   - Gaps and improvements identified
   - Created with ultrathink

5. **[task]-plan.md**
   - Final implementation plan
   - 20-40 pages
   - Phased approach with quality gates
   - Created with ultrathink

### Plan Presentation

Present to user:
```
# Enhanced Planning Complete

## Research Completed
- [Topic 1]: [Key findings summary]
- [Topic 2]: [Key findings summary]

## Architecture Designed (with ultrathink)
- [Architecture summary in 2-3 sentences]
- Key decisions: [List 3-4 major decisions]
- Technology stack: [List technologies]

## Validation Complete (with ultrathink)
- Status: ✅ APPROVED (or 🔄 REVISED)
- [Validation summary]

## Implementation Plan Created (with ultrathink)
- 4 phases, [X] total tasks
- Estimated timeline: [Duration]
- Risks identified and mitigated
- Quality gates defined

## Next Steps
1. [First task to start]
2. [Second task]
3. [Third task]

Ready to proceed? Review the full plan at:
dev/active/[task]/[task]-plan.md
```

---

## QUALITY CHECKS

**Stage 1 (Research)**:
- [ ] 2-3 research topics generated
- [ ] Minimum 5 sources per topic
- [ ] High confidence (3+ high-credibility sources per topic)
- [ ] Recent information (2024-2025 focus)
- [ ] Best practices identified
- [ ] Anti-patterns documented

**Stage 2 (Architecture)**:
- [ ] Essential sections present (diagram, components, key decisions - adapt based on task complexity)
- [ ] Technology choices justified with research
- [ ] ADRs for major decisions
- [ ] Risks with mitigations
- [ ] Think-hard applied throughout
- [ ] 3-10 pages depending on complexity (not bloated)

**Stage 3 (Validation)**:
- [ ] All 9 validation criteria evaluated
- [ ] Specific gaps identified (if any)
- [ ] Clear APPROVED or REVISE decision
- [ ] Actionable feedback
- [ ] Standard thinking applied for critique

**Stage 4 (Planning)**:
- [ ] 4 phases defined (Foundation, Core, Integration, Optimization)
- [ ] Tasks sized appropriately (15-60 min)
- [ ] Dependencies mapped
- [ ] Risks with mitigations
- [ ] Testing strategy comprehensive
- [ ] Quality gates defined
- [ ] Success criteria measurable
- [ ] Next steps actionable
- [ ] Standard thinking applied for synthesis

---

## COST & TIME ANALYSIS

**Total Time**: 43-65 minutes
**Total Cost**: $1.09-2.15

**Breakdown**:
- Stage 1 (Research): 3-5 min, $0.09-0.15 (2x Haiku agents, parallel)
- Stage 2 (Architecture): 20-30 min, $0.40-0.80 (Sonnet + think-hard)
- Stage 3 (Validation): 10-15 min, $0.30-0.60 (Sonnet + standard thinking)
- Stage 4 (Planning): 10-15 min, $0.30-0.60 (Sonnet + standard thinking)

**ROI**:
- Investment: $1-2 in planning
- Prevents: $500-4,000 in rework from architecture mistakes
- Saves: 5-40 hours of developer time

---

## NOTES

- **Optimized thinking**: think-hard for architecture (stage 2 only), standard for validation and planning (stages 3-4) - balanced cost/quality approach
- **Research-first**: Ensures architecture is informed by best practices
- **No wasted effort**: Single comprehensive plan, not iterative refinement
- **Universal**: Works for any technology (React, Python, Kubernetes, Go, etc.)
- **Quality-focused**: Multiple validation checkpoints and quality gates
- **Risk-aware**: Proactive risk identification and mitigation
- **Actionable**: Clear phases, tasks, and next steps

**Integration**: Invoked via `/plan-enhanced` command for complex tasks requiring comprehensive planning.
