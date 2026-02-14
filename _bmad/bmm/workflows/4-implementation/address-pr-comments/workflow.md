---
name: address-pr-comments
description: Triage and address PR review comments from code review bots - fix valid issues, decline incorrect suggestions, and react to every comment as training signal
module: bmm
phase: 4-implementation
---

# Address PR Comments - Bot Feedback Triage and Resolution

## Purpose

Process feedback from code review bots intelligently after PR creation. Fix what needs fixing, push back on what is wrong, and use reactions as training signals to shape future bot behavior. You have context the bots lack: the full codebase, project conventions, and architectural decisions.

## When to Use

- After creating a pull request that has review bots configured
- As the mandatory final phase of the autotask workflow
- When bot comments accumulate on an existing PR
- Any time `gh pr checks` shows completed reviews with comments

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- An open pull request (number provided or auto-detected from current branch)
- Project code review standards accessible (if defined)

## Execution Steps

### Step 1: Detect the PR

Use the provided PR number, or detect from current branch via `gh pr view --json number`. Exit with a clear message if no PR exists for the current branch.

### Step 2: Preflight Checks

Before processing comments, verify the PR is in a runnable state:

- **Mergeable status**: If conflicts exist, resolve them first. If merge state is blocked, identify why (required checks failing, reviews needed).
- **CI status**: If the build is failing, that blocks other checks. Investigate the build failure first. If jobs are queued indefinitely, there may be CI infrastructure issues.

These conditions explain why bots might not be running. Address root causes before waiting for bot comments that will not arrive.

### Step 3: Fetch Bot Comments

Code review bots comment at different API levels. Fetch from both endpoints:

- **PR-level comments** (issues endpoint): For bots like Claude Code Review. Only address the most recent review -- older ones reflect outdated code state.
- **Line-level comments** (pulls endpoint): For bots like Cursor, Codex, and Greptile that post inline comments on specific code lines. Address all of them since each flags a distinct location.

Process any username ending with `[bot]` that posts code review comments.

### Step 4: Triage Each Comment

For each bot comment, ask: "Is this suggestion correct given context the bot lacks?"

- **Fix**: The analysis is correct. The code has a bug, security issue, logic error, or genuine improvement opportunity. Implement the fix. React with thumbs-up. For exceptional catches (security issues, subtle bugs), react with heart.
- **Incorrect**: The bot's analysis is wrong given context it lacks (one-time value does not need constant extraction, race condition impossible due to serialization, type system guarantees non-null). Decline with thumbs-down reaction and brief explanation of why.
- **WONTFIX**: The suggestion is technically correct but explicitly unwanted (ARIA accessibility not a project priority, internationalization for English-only app, style preferences conflicting with project conventions). Decline with thumbs-down and brief explanation.
- **GitHub Issue Created**: Valid suggestion but scope exceeds this PR (requires refactoring unrelated code, would be a separate feature, needs investigation beyond current PR context). Create a trackable issue and link it in the reply.

Never decline just because fixing is inconvenient. If the code would be better with the change, make the change.

### Step 5: React to Every Comment

Every bot comment gets a reaction with no exceptions. Reactions are training signals:

- Thumbs-up: Helpful feedback you addressed. "More like this."
- Heart: Exceptional catch -- security issue, subtle bug, great insight.
- Thumbs-down: Incorrect, irrelevant, or wrong analysis. "Less like this."
- Rocket: Critical security vulnerability or production bug you fixed.

### Step 6: Reply When Declining

When declining a suggestion, explain the context the bot lacks. This creates training data that helps bots improve over time. Keep replies brief -- the reaction is the primary signal; replies add context.

When fixing, the commit speaks for itself. Mention the commit hash if helpful for tracking.

### Step 7: Process Incrementally

Process bot feedback as it arrives rather than waiting for all bots. When one bot completes, address its comments immediately while others run. Make fixes, commit, push, then process the next bot that completes.

After pushing fixes, re-poll since bots will re-analyze. Continue until all bots complete and no new actionable feedback remains. Track processed comments by ID to avoid re-processing on subsequent iterations.

If you have pushed 3+ times and bots keep finding new issues, flag for user attention -- something systematic may be wrong.

### Step 8: Handle Stalls

Track waiting time. If a bot stays queued or in-progress for more than 5 minutes without output, investigate common stall causes:

- Merge conflicts (PR will not run checks until conflicts resolved)
- Build failures (subsequent checks may be blocked)
- CI queue depth (jobs waiting for runners)
- Rate limiting (too many concurrent checks)

Report stalls clearly and explain what you are doing about it. Do not silently wait.

### Step 9: Handle Human Comments

Human reviewer comments require user attention, not auto-handling. Present them separately and clearly flag them for user review.

### Step 10: Completion Report

When all bots have completed and no actionable feedback remains, report:

- PR URL and title (prominent -- user may have multiple sessions)
- Structured counts: Fixed (N), Declined (N), Issues Created (N)
- Brief summary of what was fixed and why key suggestions were declined
- Any human comments still needing attention

Verify completeness: did every bot comment get a reaction? If any were missed, go back and add reactions before declaring complete.

## Outputs

- All fixable issues resolved and committed
- Every bot comment reacted to (thumbs-up, heart, thumbs-down, or rocket)
- Decline explanations posted as replies where applicable
- GitHub issues created for valid but out-of-scope suggestions
- Completion report with structured counts

## Completion Criteria

- All review bots have completed (or confirmed stalled with investigation)
- Every bot comment has a reaction
- All "fix" items are implemented and pushed
- All "incorrect" and "wontfix" items have reactions and explanations
- No actionable feedback remains unaddressed
- Human comments are flagged separately for user attention
- Completion report is generated
