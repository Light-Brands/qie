---
name: multi-review
description: Run multiple specialized review agents in parallel for comprehensive code analysis with diverse perspectives and actionable synthesis
module: bmm
phase: 4-implementation
---

# Multi-Review - Parallel Multi-Agent Code Review

## Purpose

Run N parallel code review agents with diverse perspectives. Each agent operates in isolation, catching issues that others miss. Synthesize findings into actionable fixes, implement them immediately, and report what was fixed versus declined.

## When to Use

- Before creating a pull request to catch issues early
- After implementation to validate code quality across multiple dimensions
- When changes touch security-sensitive, performance-critical, or architecturally significant code
- As part of the autotask workflow before PR submission
- When reviewing plans (not just code) for deep-complexity tasks

## Prerequisites

- Code changes available to review (branch diff, PR changes, staged changes, or recent modifications)
- Sub-agent or Task tool capability for parallel execution
- Project code review standards accessible (if defined)

## Execution Steps

### Step 1: Determine Depth

Select review depth based on context or explicit specification.

- **quick** (1-2 agents): Single-file change with clear purpose. Focus on correctness only. Minimal overhead.
- **balanced** (2-3 agents, default): Multi-file implementation. Cover primary domains the code touches.
- **deep** (5+ agents): Architectural changes, new patterns, security-sensitive code. Comprehensive coverage with architecture-auditor, security-reviewer, logic-reviewer, performance-reviewer, error-handling-reviewer, and domain-specific reviewers as needed.

Auto-detect depth from context when not specified. When called from autotask, respect the complexity level already determined.

### Step 2: Identify Review Scope

Determine what code to review from context: branch diff, PR changes, staged changes, or recent modifications. Analyze what domains the code touches (API, UI, logic, tests, security, infrastructure).

### Step 3: Select and Discover Agents

Examine available review agents and any project-specific agents. Categorize by focus area: correctness, security, performance, architecture, quality, UX, observability. Select N agents ensuring diversity -- do not pick multiple agents from the same domain.

When code requires domain expertise no existing agent provides, create a dynamic reviewer using a general-purpose agent with a focused prompt specifying the domain and key concerns. Common dynamic domains: Temporal workflows, GraphQL, database migrations, rate limiting, authentication, caching, streaming, real-time updates.

### Step 4: Launch Parallel Reviews

Launch all selected agents simultaneously. Each agent receives the review scope and operates in isolation. Agents return structured findings with file paths, line numbers, severity, and suggested fixes.

### Step 5: Synthesize Results

After all agents complete:

1. Deduplicate findings (same file + line across agents)
2. Group by severity
3. Note which agent caught each issue

### Step 6: Triage and Act

For each finding, determine the appropriate action:

- **Fix now**: The suggestion improves the code. Implement it immediately.
- **Wontfix**: The suggestion does not apply given full context the agent lacks. Explain why.
- **Complexity trade-off**: The fix adds more complexity than the risk it mitigates.
- **Large scope / Deferred**: Fixing would require substantial architectural changes outside the current scope. Create a follow-up issue or task.

Fix every valid issue. Do not carry technical debt forward with "we'll address this later" unless it genuinely requires separate architectural work.

### Step 7: Report Summary

Provide a structured summary after fixing issues.

- **Fixed** (N issues): Issue description and what was changed.
- **Wontfix** (N issues): Issue description and why the analysis does not apply given full context.
- **Deferred** (N issues, only for large scope): Issue description and follow-up task created.

If all agents return no issues, note this explicitly.

## Outputs

- All fixable issues resolved in the codebase
- Structured report of fixed, declined, and deferred findings
- Follow-up issues created for deferred items (if any)

## Completion Criteria

- All selected agents have completed their reviews
- Every finding has been triaged as fix, wontfix, or deferred
- All "fix now" items have been implemented
- Summary report generated with counts and rationale for declined items
- No valid improvement suggestions left unaddressed without documented reasoning
