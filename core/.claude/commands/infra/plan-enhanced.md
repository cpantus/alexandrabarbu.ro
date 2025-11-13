# Command: plan-enhanced

**Version**: 1.1.0
**Category**: Workflow
**Complexity**: Complex
**Estimated Time**: 20-35 minutes
**Estimated Cost**: $0.50-1.00

## Purpose

Comprehensive research-first planning workflow with deep architectural thinking. Creates deeply researched, architecturally sound, validated implementation plans for complex software development tasks. Includes automatic dev docs creation for seamless session handoff.

## When to Use

**✅ Use /plan-enhanced for:**
- New systems/services (greenfield projects)
- Unfamiliar technology stacks
- Scalability-critical systems (high traffic/data)
- High-stakes projects (production-critical)
- Complex integrations (multiple systems)
- Architectural decisions needed
- Security-sensitive systems
- Major refactors/migrations

**❌ Don't use for:**
- Simple feature additions or bug fixes
- Well-understood patterns in familiar tech
- Time-sensitive hotfixes
- Minor UI tweaks or configuration changes

**Rule of thumb**: If failure costs > $100 or affects >100 users, use /plan-enhanced

## Usage

```bash
/plan-enhanced "implement GraphQL API for e-commerce platform"
/plan-enhanced "build real-time analytics dashboard with React"
/plan-enhanced "migrate monolith to microservices architecture"
/plan-enhanced "setup multi-region Kubernetes cluster with HA"
```

## Workflow

### Stage 1: Research (3-5 minutes, $0.09-0.15)

**Goal**: Gather best practices and official documentation for technologies involved

**Process**:
1. **Extract Technology Keywords** from task description
   - Example: "implement GraphQL API for e-commerce"
   - Technologies: [GraphQL, API, e-commerce]
   - Patterns: [API design, e-commerce architecture]

2. **Generate Research Topics** (2-3 topics)
   - Topic 1: "[Technology] best practices 2025"
   - Topic 2: "[Domain] architecture patterns"
   - Topic 3: "[Integration] design patterns" (if applicable)

3. **Spawn Parallel Research Scouts** (Haiku agents)
   ```
   /background research-scout-1 "Research [topic 1] with 5-10 sources"
   /background research-scout-2 "Research [topic 2] with 5-10 sources"
   ```

4. **Wait for Completion** (3-5 minutes)
   - Each scout produces comprehensive research report
   - Reports saved to `research/[topic].md`
   - Includes: best practices, patterns, warnings, sources

**Output**:
- 2-3 research reports (~1,000-2,000 lines each)
- High confidence (5-10 sources per topic)
- Recent information (2024-2025 focus)

---

### Stage 2: Architecture (20-30 minutes, $0.40-0.80)

**Goal**: Design comprehensive system architecture with ultrathink

**Agent**: system-architect (Sonnet + ultrathink)

**Process**:
1. **Load Context**:
   - All research reports from Stage 1
   - Task requirements and constraints
   - Existing system patterns (from scout)

2. **Design with Ultrathink**:
   ```
   Use system-architect agent with ultrathink mode to design:

   Think deeply about:
   - Why this architecture over alternatives?
   - What are the long-term implications?
   - What could go wrong at scale?
   - What are the hidden costs and trade-offs?

   Create comprehensive architecture covering:
   1. System Design Diagram (ASCII art)
   2. Component Specifications
      - Responsibilities
      - Technology choices with deep rationale
      - Interfaces and contracts
      - Scaling strategies

   3. Data Architecture
      - Data models
      - Data flow
      - Consistency strategy

   4. API Design (if applicable)
      - Endpoints
      - Authentication/authorization
      - Error handling

   5. Scalability Analysis
      - Performance requirements
      - Bottlenecks and mitigations
      - Caching strategies

   6. Security Considerations
      - Threat model
      - Authentication/authorization
      - Data protection

   7. Technology Choices
      - Selected technologies with rationale
      - Alternatives considered and rejected
      - Trade-offs analysis

   8. Architecture Decision Records (ADRs)
      - Key decisions
      - Context and consequences
      - Alternatives

   9. Risk Assessment
      - High/medium/low risks
      - Likelihood and impact
      - Mitigation strategies

   10. Cost Estimate
       - Infrastructure costs
       - Development timeline
   ```

3. **Output Architecture Proposal**:
   - Saved to `dev/active/[task]/architecture-proposal.md`
   - Comprehensive (15-25 pages)
   - Deeply reasoned with ultrathink

**Ultrathink Focus**:
- Question every technology choice
- Explore failure modes
- Consider maintenance burden
- Analyze cost implications
- Evaluate team capabilities

---

### Stage 3: Validation (10-15 minutes, $0.30-0.60)

**Goal**: Critically validate architecture against research and requirements

**Agent**: Main agent (Sonnet + ultrathink)

**Process**:
1. **Load All Context**:
   - Research reports (Stage 1)
   - Architecture proposal (Stage 2)
   - Task requirements

2. **Validate with Ultrathink**:
   ```
   With ultrathink mode, critically analyze the architecture:

   Think deeply about:
   - What has the architect missed or overlooked?
   - What assumptions are questionable or risky?
   - What will be hardest to maintain long-term?
   - What's the biggest risk to project success?
   - Are there simpler alternatives?

   Validation Checklist:

   ✓ Completeness
     - Are all requirements addressed?
     - Are there gaps in the design?
     - What's missing from the architecture?

   ✓ Best Practices Compliance
     - Does it follow research recommendations?
     - Are industry standards applied?
     - Are there anti-patterns?

   ✓ Scalability
     - Can it scale to anticipated load?
     - Are bottlenecks identified and mitigated?
     - Is horizontal scaling possible?

   ✓ Technology Fit
     - Is this the right tech for the use case?
     - Are alternatives better suited?
     - Does the team have expertise?

   ✓ Trade-offs Justification
     - Are trade-offs clearly documented?
     - Are trade-offs acceptable?
     - Are there better compromises?

   ✓ Security
     - Are security implications considered?
     - Is the threat model complete?
     - Are sensitive data flows protected?

   ✓ Cost-Effectiveness
     - Is this cost-effective for the scale?
     - Are there cheaper alternatives?
     - What are ongoing costs?

   ✓ Maintainability
     - Can the team maintain this?
     - Is complexity justified?
     - Is documentation sufficient?

   ✓ Risk Management
     - Are risks identified with mitigations?
     - What's the biggest risk?
     - Are contingency plans in place?
   ```

3. **Decision**:
   - **✅ APPROVED**: Architecture validated, proceed to planning
   - **🔄 REVISE**: Specific gaps identified, architect must revise
     - List specific issues to address
     - Suggest improvements
     - Return to Stage 2 (max 1 revision)

**Output**:
- Validation report with approval or revision requests
- Specific improvements identified
- Risk analysis

---

### Stage 4: Planning (10-15 minutes, $0.30-0.60)

**Goal**: Create comprehensive implementation plan synthesizing all context

**Agent**: Main agent (Sonnet + ultrathink)

**Process**:
1. **Load All Context**:
   - Research reports (Stage 1)
   - Validated architecture (Stage 2 + 3)
   - Task requirements
   - Existing codebase patterns

2. **Plan with Ultrathink**:
   ```
   With ultrathink mode, create implementation plan:

   Think deeply about:
   - What's the optimal implementation order?
   - Where are the critical path bottlenecks?
   - What should we build first to validate assumptions?
   - What's the riskiest part to tackle?
   - How do we minimize risk while delivering value?

   Create comprehensive plan:

   # Implementation Plan: [Task]

   ## Executive Summary
   - Goal and scope
   - Key decisions from architecture
   - Timeline estimate
   - Success criteria

   ## Architecture Overview
   - High-level design (from Stage 2)
   - Key components
   - Technology stack

   ## Implementation Phases

   ### Phase 1: Foundation
   **Goal**: [What this achieves]
   **Duration**: [Estimate]
   **Tasks**:
   - Task 1 (15-60 min)
   - Task 2 (15-60 min)
   - ...
   **Dependencies**: [What must be done first]
   **Risk**: [Main risk and mitigation]
   **Validation**: [How we know it works]

   ### Phase 2: Core Features
   [Similar structure]

   ### Phase 3: Integration & Testing
   [Similar structure]

   ### Phase 4: Optimization & Polish
   [Similar structure]

   ## Dependencies
   - Phase dependencies (order matters)
   - External dependencies (APIs, services)
   - Team dependencies (who needs to be involved)

   ## Risk Management

   ### High Priority Risks
   **Risk 1**: [Description]
   - Likelihood: [High/Medium/Low]
   - Impact: [High/Medium/Low]
   - Mitigation: [Strategy]
   - Contingency: [Backup plan]

   ### Medium Priority Risks
   [Similar structure]

   ## Testing Strategy
   - Unit testing approach
   - Integration testing
   - Load/performance testing
   - Security testing
   - User acceptance testing

   ## Success Criteria
   - [ ] Functional: Meets all requirements
   - [ ] Performance: Meets latency/throughput targets
   - [ ] Scalability: Can scale to anticipated load
   - [ ] Security: Passes security review
   - [ ] Cost: Within budget estimates
   - [ ] Maintainability: Team can maintain
   - [ ] Documentation: Comprehensive docs

   ## Next Steps
   1. First task to start
   2. Quick wins to validate approach
   3. Critical path items
   ```

3. **Output Final Plan**:
   - Saved to `dev/active/[task]/[task]-plan.md`
   - Comprehensive and actionable
   - Phased approach with clear tasks
   - Risk-aware with mitigations

**Ultrathink Focus**:
- Optimal task ordering
- Risk mitigation strategies
- Quick validation loops
- Clear success criteria

---

## Quality Checks

**Stage 1 (Research)**:
- [ ] Minimum 5 sources per topic
- [ ] High confidence ratings
- [ ] Recent information (2024-2025)
- [ ] Best practices identified
- [ ] Warnings and pitfalls noted

**Stage 2 (Architecture)**:
- [ ] All requirements addressed
- [ ] Technology choices justified
- [ ] Scalability considered
- [ ] Security implications analyzed
- [ ] ADRs for key decisions
- [ ] Risk assessment complete
- [ ] Ultrathink applied throughout

**Stage 3 (Validation)**:
- [ ] All 9 criteria validated
- [ ] Specific gaps identified (if any)
- [ ] Architecture approved or revision requested
- [ ] Ultrathink applied for critique

**Stage 4 (Planning)**:
- [ ] Phased approach with clear tasks
- [ ] Dependencies identified
- [ ] Risks managed with mitigations
- [ ] Testing strategy defined
- [ ] Success criteria measurable
- [ ] Ultrathink applied for synthesis

---

## Output Files

All outputs saved to `dev/active/[task]/`:
- `research/[topic]-1.md` - Research report 1
- `research/[topic]-2.md` - Research report 2
- `architecture-proposal.md` - Architecture design
- `validation-report.md` - Validation results
- `[task]-plan.md` - Final implementation plan

---

## Cost-Benefit Analysis

**Investment**:
- Time: 43-65 minutes
- Cost: $1.09-2.15

**Returns** (Errors Avoided):
- Architecture mistake: Saves 5-20 hours ($500-2,000)
- Performance issue: Saves 10-40 hours ($1,000-4,000)
- Security flaw: Saves incident response + reputation
- Wrong tech choice: Saves complete rewrite (weeks/months)

**ROI**: $2 planning → saves $500-4,000+ in rework

---

## Examples

### React Dashboard
```bash
/plan-enhanced "build admin dashboard with real-time updates and data visualization"

Stage 1: Research
- React best practices 2025
- Real-time architecture patterns
- Dashboard UX design

Stage 2: Architecture (ultrathink)
- Component hierarchy
- WebSocket/SSE design
- State management (Redux/Zustand)
- Data fetching strategy
- Performance optimization

Stage 3: Validation (ultrathink)
- Check scalability for 1000+ concurrent users
- Validate real-time architecture
- Review state management choice

Stage 4: Planning (ultrathink)
- Phase 1: Component scaffold
- Phase 2: Real-time integration
- Phase 3: Data visualization
- Phase 4: Optimization
```

### Python API
```bash
/plan-enhanced "create ML-powered analytics API with caching and rate limiting"

Stage 1: Research
- Python API frameworks (FastAPI/Flask/Django)
- ML model serving patterns
- API caching strategies

Stage 2: Architecture (ultrathink)
- API endpoint design
- ML inference pipeline
- Caching layer (Redis)
- Rate limiting strategy
- Database schema

Stage 3: Validation (ultrathink)
- Check scalability for ML inference
- Validate caching strategy
- Review rate limiting approach

Stage 4: Planning (ultrathink)
- Phase 1: API foundation
- Phase 2: ML integration
- Phase 3: Caching & rate limiting
- Phase 4: Load testing & optimization
```

### Kubernetes Cluster
```bash
/plan-enhanced "setup multi-region Kubernetes cluster with HA and disaster recovery"

Stage 1: Research
- Kubernetes multi-region patterns
- HA architecture best practices
- Disaster recovery strategies

Stage 2: Architecture (ultrathink)
- Cluster topology
- Ingress and load balancing
- Storage replication
- Monitoring and alerting
- Failover mechanisms

Stage 3: Validation (ultrathink)
- Check HA guarantees (5 nines)
- Validate DR strategy (RTO/RPO)
- Review cost implications

Stage 4: Planning (ultrathink)
- Phase 1: Single region setup
- Phase 2: Multi-region replication
- Phase 3: HA configuration
- Phase 4: DR testing
```

---

## Integration with Existing Workflows

**Standard Planning** (simple tasks):
```bash
/workflow scout-plan-build "add user authentication"
# 5-15 min, $0.10-0.30
```

**Enhanced Planning** (complex tasks):
```bash
/plan-enhanced "add user authentication with OAuth2, RBAC, and audit logging"
# 43-65 min, $1.09-2.15
```

**Choose based on**:
- Task complexity
- Technology familiarity
- Stakes (impact of failure)
- Time constraints

---

## Technical Implementation

This command delegates to the `enhanced_planning` pattern which orchestrates the 4-stage workflow:

```
/plan-enhanced "task"
  → Invokes pattern: enhanced_planning
    → Stage 1: Spawns research-scout agents (parallel)
    → Stage 2: Spawns system-architect agent (ultrathink)
    → Stage 3: Validates with ultrathink
    → Stage 4: Creates plan with ultrathink
  → Returns comprehensive plan for approval
```

---

## Notes

- **Ultrathink used 3 times**: Architecture, Validation, Planning (maximum depth)
- **Research runs first**: Avoids wasted effort on uninformed planning
- **Works for any tech**: Universal keyword extraction and research
- **Opt-in**: User explicitly chooses enhanced planning for appropriate tasks
- **Quality over speed**: 45-65 min investment prevents hours/days of rework

**See also**: `/workflow scout-plan-build` for standard planning
