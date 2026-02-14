---
name: polish-sweep
description: Final quality pass across code, docs, and tests using parallel specialized reviewers to find the user-facing issues that make an app feel unfinished
module: bmm
phase: 4-implementation
---

# Polish Sweep - Final Quality Pass

## Purpose

Find user-facing quality issues that make an application feel unfinished. Run four specialized reviewers in parallel, aggregate findings, and present actionable recommendations. This is the "last 15%" -- issues that users feel but cannot articulate: missing feedback, inconsistent behaviors, dead-end errors, and code patterns that lead to UX problems.

## When to Use

- Before a release or demo to catch user-facing quality issues
- After a major feature implementation to polish the experience
- When users report the app "feels janky" but cannot pinpoint specifics
- As a periodic quality audit across components and pages
- Before handing off to QA or stakeholders

## Prerequisites

- Application codebase with UI components accessible for scanning
- Sub-agent or Task tool capability for parallel execution
- Scope identified (specific directory, components, app, or all)

## Execution Steps

### Step 1: Determine Scope

Parse the scope to identify what to scan:

- **No scope or "all"**: Scan `components/` and `app/` directories (default for Next.js/React projects)
- **"components"**: Scan only the `components/` directory
- **"app"**: Scan only the `app/` directory
- **Specific path**: Scan the provided directory

For non-Next.js/React projects, specify a custom path such as `src/components`. Communicate the scope to each reviewer agent.

### Step 2: Check for Ignore File

If `.polish-ignore` exists in the project root, parse it to exclude specific files, agents, or patterns from the scan. Syntax: `path:agent:pattern`. Invalid lines are skipped with a warning.

### Step 3: Launch Parallel Reviewers

Spawn all four reviewer agents simultaneously. Each receives the scope and returns structured findings with file paths, line numbers, severity, and suggested fixes.

**UX Clarity Reviewer**: Scan for missing feedback states. Look for async operations without loading indicators, actions without success confirmation, operations without error feedback, and lists or views without empty states.

**UX Consistency Reviewer**: Scan for behavioral inconsistency. Look for inconsistent tooltip delays, mismatched animation timings, pattern variations across similar components, and inconsistent interaction models.

**Recovery Reviewer**: Scan for dead-end error paths. Look for caught errors without user feedback, missing retry mechanisms for failed operations, potential data loss scenarios, and states with no escape or recovery path.

**Code Consistency Reviewer**: Scan for code pattern variance. Look for inconsistent prop naming conventions, varying approaches to the same pattern, mixed coding styles within the same feature area, and convention violations.

### Step 4: Aggregate Results

Combine all agent outputs:

- Deduplicate findings at the same file and line across agents
- Sort by severity: HIGH, then MEDIUM, then LOW
- Group by file so developers can address all issues in one pass
- Track pattern frequency to identify systemic issues

### Step 5: Generate Report

Format findings for actionability:

- HIGH and MEDIUM severity findings by default
- Include LOW only if explicitly requested or if the count is small (fewer than 5)
- Every finding includes file path, line number, category tag, and a suggested fix
- Pattern summary table showing issue types, counts, and affected files

### Step 6: Present Recommendations

Identify systemic patterns worth addressing globally rather than file-by-file. Suggest broader fixes where a single change (shared component, utility, or convention) would resolve multiple findings at once.

## Outputs

- Polish sweep report organized by severity and grouped by file
- Each finding includes file path, line number, category (clarity, consistency, recovery, code-consistency), severity, and suggested fix
- Pattern summary identifying systemic issues and their frequency
- Actionable recommendations for both targeted fixes and systemic improvements

## Completion Criteria

- All four reviewer agents have completed their scans
- Findings are aggregated, deduplicated, and sorted by severity
- Report is generated with HIGH and MEDIUM findings at minimum
- Systemic patterns are identified in the pattern summary
- Every finding has a concrete suggested fix (not just a description of the problem)
