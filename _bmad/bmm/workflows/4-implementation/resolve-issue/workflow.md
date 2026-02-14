---
name: resolve-issue
description: Autonomous GitHub issue investigation and resolution from triage through PR delivery or documented closure
module: bmm
phase: 4-implementation
---

# Resolve Issue - Autonomous GitHub Issue Resolution

## Purpose

Take a GitHub issue from initial triage to PR ready for merge, handling the complete lifecycle autonomously. Triage professionally, implement efficiently, and deliver production-ready code. Alternatively, close issues with clear, respectful explanations when a fix is not warranted.

## When to Use

- A GitHub issue needs to be investigated and resolved
- You want end-to-end autonomous handling from triage through PR creation
- The issue is assigned to you or unassigned and available
- You want professional, transparent communication with issue reporters

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- Repository access with permissions to comment, label, and create PRs
- Issue number known or detectable from current branch name

## Execution Steps

### Step 1: Identify the Issue

Determine the issue number from one of the following sources:

- Explicit issue number provided
- Auto-detect from current branch name using patterns: `do-issue-{N}`, `fix-issue-{N}`, `issue-{N}`, `fix-{N}`
- If no match and not on a relevant branch, prompt for the issue number

Validate the issue number is a positive integer before proceeding.

### Step 2: Fetch and Analyze

Fetch the issue with `gh`. Check for existing PRs, assignees, and current state. Extract the core request, user impact, and requirements. Add an eyes reaction to signal analysis is underway.

### Step 3: Triage

Decide autonomously among the following outcomes:

- **Fix**: The issue is valid and actionable. Continue to implementation.
- **Won't Fix**: The issue describes intended behavior or is out of scope. Update the issue with a clear explanation and close.
- **Need More Info**: The issue lacks sufficient detail to act on. Comment requesting specific information.
- **Invalid**: The issue is not reproducible or is based on a misunderstanding. Explain clearly and close.

Show the decision and rationale. Be professional and thoughtful -- these are real users who took time to file the issue.

### Step 4: Check Edge Cases

Before proceeding with a fix:

- If assigned to someone else, ask before taking over.
- If a PR already exists and is active, skip. If stale (7+ days with no activity), ask before proceeding.
- If the issue is closed, ask before reopening.

### Step 5: Prepare

When proceeding with a fix: add a rocket reaction, add an in-progress label if available, and comment with the implementation approach (2-3 bullets outlining the plan).

### Step 6: Implement

Use the autotask workflow to implement the fix. Ensure the PR description includes "Fixes #{number}" so GitHub auto-links and closes the issue when the PR merges.

### Step 7: Address Bot Feedback

Use the address-pr-comments workflow to handle bot feedback autonomously. This brings the PR to "ready to merge" state without human intervention for bot-related feedback.

### Step 8: Finalize

Comment on the issue with the PR link. Add heart reactions to helpful user comments. The issue auto-closes when the PR merges due to the "Fixes #" keyword in the PR description.

## Outputs

- Triaged issue with decision documented
- If fixing: PR ready for merge with "Fixes #{number}" in description, bot feedback addressed
- If not fixing: Issue updated with clear, respectful explanation and appropriate closure
- Issue linked to PR (if fixing)

## Completion Criteria

- Issue is triaged with a clear decision documented
- If fixing: PR is created, bot feedback is addressed, and PR is ready for human review
- If not fixing: Issue is updated with explanation and closed appropriately
- Issue is properly linked to PR via "Fixes #{number}" (if fixing)
- All workflow phases are completed (no half-done state)

## Error Recovery

- If autotask or address-pr-comments fail, evaluate recoverability
- Transient errors (API failures, missing dependencies): retry with additional context
- Fundamental blockers (architectural issues, unclear requirements): comment on the issue explaining the blocker and ask for guidance
- Never silently abandon the workflow

## Key Principles

- **Autonomous but transparent**: Make decisions independently, document them clearly
- **Professional communication**: Users took time to file issues; treat them with respect
- **Bias toward action**: Move quickly to implementation or explain thoughtfully why not
- **Complete the cycle**: Deliver the PR or close with explanation; never leave half-done
