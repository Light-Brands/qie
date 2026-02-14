---
name: troubleshoot
description: Production error triage and resolution from monitoring services with intelligent prioritization, root cause analysis, and parallel fix execution
module: bmm
phase: 4-implementation
---

# Troubleshoot - Production Error Triage and Resolution

## Purpose

Systematically eliminate production errors through intelligent analysis, prioritization, and parallel execution. Connect to error monitoring services (Sentry, HoneyBadger, or similar), fetch unresolved errors, identify root causes and patterns, and autonomously fix issues in isolated worktrees with tests and PRs.

## When to Use

- Production errors need systematic triage and resolution
- Error monitoring shows unresolved issues accumulating
- You want autonomous continuous fixing of prioritized errors
- You need pattern analysis across error clusters to find root causes
- A specific error needs keyword-based search and targeted fix

## Prerequisites

- Error monitoring service available and accessible (Sentry, HoneyBadger, or other)
- GitHub CLI (`gh`) installed and authenticated
- Git worktree support for parallel fix isolation
- Project test suite and validation tooling available

## Execution Steps

### Step 1: Service Detection

Identify available error monitoring tools. If multiple services are available, ask user preference. If no monitoring service is available, explain what is needed and how to connect one.

### Step 2: Select Operational Mode

Choose the appropriate mode based on the task:

- **Autonomous Continuous** (default): Fix the highest priority error. While the PR is in CI, start the next one in a parallel worktree. Continue until all critical errors are resolved.
- **Parallel Batch** (auto N): Identify the top N independent errors and fix simultaneously in separate worktrees. Submit all PRs at once.
- **Watch Mode**: Monitor for new critical errors (priority score above 85). Auto-create worktree, fix, and submit PR tagged as hotfix. Queue non-critical errors for batch processing.
- **Analysis Mode**: Fetch the last 500 errors (including resolved), identify patterns and common root causes, generate insights about error-prone areas, and suggest preventive refactorings. No fixes applied.
- **Keyword Search**: Search errors for matches in messages, types, file paths, stack traces, and function names. Use fuzzy matching. If multiple matches, show ranked by relevance. If one clear match, fix immediately.

### Step 3: Error Intelligence

Fetch unresolved errors in default sort order from the monitoring service. Identify clusters sharing root causes. Triage aggressively -- skip errors not worth fixing:

- Rate limiting (429 errors)
- External service failures
- User-caused errors
- Flaky or intermittent issues
- Deprecated code paths
- Low-value cosmetic issues
- Monitoring noise

Mark ignored errors in the monitoring service with a brief explanation.

### Step 4: Root Cause Analysis

For each targeted error or cluster:

- Review git history for affected files
- Examine code context and data flow
- Look for related errors that share the same root cause
- Check deployment timelines for correlation
- Generate hypotheses about the actual problem (not just where it manifested)

One strategic fix can prevent many future errors. Prioritize clusters where multiple errors share a single root cause.

### Step 5: Fix in Isolated Worktrees

Each bug fix goes in an isolated git worktree. Typically 3-5 concurrent worktrees is optimal for parallel execution.

For each fix:

1. Gather full context from error monitoring (stack traces, request data, timelines)
2. Read failing code and surrounding context
3. Identify root cause
4. Implement fix handling edge cases with improved error messages
5. Add tests when appropriate (logic errors, edge cases, regressions)
6. Run project validation (linting, type checking, tests)
7. Use code review agents if available
8. Create descriptive commits
9. Submit PR with error links, occurrence counts, root cause analysis, and monitoring plan

### Step 6: Verification

After PRs deploy, check if error rates dropped. Mark errors as resolved once confirmed. If errors persist, create follow-up fixes. Track outcomes and adjust approach based on what works.

### Step 7: Preventive Work

Notice patterns across fixes (missing error boundaries, inadequate input validation, repeated categories of issues). Suggest broader refactorings. Create optional PRs for systemic improvements.

## Outputs

- Prioritized error triage with clear decisions (fix, ignore with reason)
- PRs for each fix with root cause analysis and monitoring plans in descriptions
- Errors marked as resolved in monitoring service after verified fix deployment
- Pattern analysis report identifying systemic issues and preventive recommendations
- Clean worktrees (removed after PRs merge)

## Completion Criteria

- All critical errors have been triaged (fixed or ignored with documented rationale)
- Each fix is in its own PR with root cause analysis
- Tests prevent regressions for fixed issues
- No new errors introduced by the changes
- Error monitoring reflects resolved status for fixed issues
- Low-value errors are intelligently triaged and marked as ignored

## Quality Standards

- Write tests when they add value: logic errors, edge cases, regressions
- Follow project rules for code style, commit messages, and workflows
- Run complete validation before submitting PRs
- Link to error monitoring issues in commits and PRs
- Create detailed PR descriptions with root cause analysis and monitoring plans
- Balance immediate critical fixes with systematic cleanup of minor issues

## Success Metrics

- Production error count decreases over time
- Errors do not recur after fixes
- Related errors are fixed together through root cause analysis
- Preventive refactorings reduce new error introduction
- Good triage (knowing what not to fix) is as valuable as good fixes
