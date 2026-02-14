---
name: autotask
description: Autonomous task execution from description to PR-ready implementation with complexity-scaled planning, testing, review, and bot feedback resolution
module: bmm
phase: 4-implementation
---

# Autotask - Autonomous Task Execution

## Purpose

Execute a complete development task autonomously from a task description through implementation, validation, PR creation, and bot feedback resolution. The task is not complete until a pull request is ready for human review with all bot feedback addressed.

## When to Use

- A development task has a clear description and needs to be taken from zero to PR-ready
- You want end-to-end autonomous execution without back-and-forth supervision
- The task can be scoped as quick, balanced, or deep complexity
- You need implementation, testing, git workflow, and review bot handling in one pass

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- Project standards and rules accessible
- Clean or manageable git working tree
- Node.js/npm or relevant language toolchain available

## Execution Steps

### Step 1: Determine Complexity

Analyze the task to select the appropriate complexity level. Explicit user signals override auto-detection.

- **quick** -- Single-file changes, clear requirements, no design decisions. Skip heavy planning, implement directly, trust git hooks for validation, single self-review pass.
- **balanced** -- Standard multi-file implementation with some design decisions. Light planning, delegate exploration to sub-agents, targeted testing, multi-review with 2-3 agents.
- **deep** -- Architectural changes, new patterns, high-risk work, multiple valid approaches. Full exploration via sub-agents, detailed plan document, plan review before implementation, comprehensive testing, multi-review with 5+ agents.

Scope signals: single function/typo = quick. Most tasks = balanced. New architecture or "thorough/ultrathink" = deep. Risk factors (auth, payments, data migrations) escalate complexity but never reduce it below user-specified level.

### Step 2: Environment Setup

Determine where to work based on current git state.

- Clean working tree: work in place
- Dirty tree with multi-repo pattern: ask user preference
- Dirty tree without multi-repo: suggest worktree, confirm first
- Already in worktree: work in place

### Step 3: Task Preparation

Ensure task clarity before implementation. If the task description is unclear or ambiguous, clarify requirements. If clear, proceed to planning or implementation based on complexity.

### Step 4: Planning

Scale planning to complexity.

- **quick**: Skip to implementation.
- **balanced**: Load relevant project rules. Brief exploration via sub-agent if needed. Create implementation outline.
- **deep**: Full exploration via sub-agents. Use brainstorm-synthesis for hard architectural decisions. Create detailed plan document. Run multi-review on the plan with architecture-focused agents. Incorporate feedback before writing code.

### Step 5: Implementation

Execute using appropriate agents based on task type. Launch agents in parallel when independent, sequentially when dependent. Provide targeted context including task requirements, implementation decisions, relevant standards, and specific focus area.

Agent types by task: debugger for root cause analysis, autonomous-developer for implementation, ux-designer for user-facing text and accessibility, code-reviewer for architecture review, prompt-engineer for prompt optimization, explorer for investigation and research.

Capture decisions made and any blockers encountered for the PR description.

### Step 6: Validation

Scale validation to complexity.

- **quick**: Trust git hooks. If hooks pass, proceed.
- **balanced**: Run targeted tests for changed code. Brief self-review. Fix obvious issues.
- **deep**: Verify fix to confirm behavior works from user perspective. Comprehensive test suite. Security scan and performance check if applicable.

### Step 7: Pre-PR Review

Scale review to complexity.

- **quick**: Single self-review pass.
- **balanced**: Multi-review with 2-3 agents selected by domain (API changes = security-reviewer, UI changes = ux-designer, logic changes = logic-reviewer, test changes = test-analyzer).
- **deep**: Multi-review with 5+ agents (architecture-auditor, security-reviewer, performance-reviewer, error-handling-reviewer, logic-reviewer, plus domain-specific reviewers). Fix issues found before creating PR.

### Step 8: Create Pull Request

Create PR with commits following project commit message conventions. PR description includes:

- **Summary**: What was implemented and why. How it addresses requirements.
- **Design Decisions** (if any): Each decision with rationale. Alternatives considered.
- **Complexity Level**: quick, balanced, or deep and why.
- **Validation Performed**: Tests run, verification steps taken.

### Step 9: Bot Feedback Loop

This phase is mandatory. Autotask is not complete without it.

After PR creation, poll for bot analysis using `gh pr checks`. Polling duration scales with complexity: quick = 2 minutes, balanced = 5 minutes, deep = 15 minutes. If checks complete sooner, proceed immediately.

Execute address-pr-comments on the PR. Fix valuable feedback (security issues, real bugs, good suggestions). Decline with WONTFIX and rationale where bot lacks context. Iterate until critical issues resolved.

### Step 10: Completion Verification

Autotask is complete when all of the following are true:

- PR created with proper description
- Review bots have completed (or confirmed none configured)
- Address-pr-comments executed
- All "Fix" items resolved or documented

## Outputs

- Feature branch with implementation commits
- Pull request with descriptive summary, design decisions, and validation record
- Bot feedback fully triaged: fixed, declined with rationale, or documented
- Completion report with PR number, branch name, complexity level, accomplishments, and bot feedback summary

## Completion Criteria

- PR is created and linked to the task
- All automated checks pass or are addressed
- Bot feedback loop has been executed (not skipped)
- Every autonomous decision is documented in the PR description
- The PR is ready for human review without outstanding bot issues

## Error Recovery

- **Git failures**: Merge conflicts pause for user resolution. Push rejected triggers pull and rebase if safe, otherwise ask. Hook failures are fixed directly (never use --no-verify).
- **GitHub CLI failures**: Auth issues checked with `gh auth status`. Rate limits logged with wait suggestion. PR creation failure retried once after verifying remote branch.
- **Sub-agent failures**: Logged, retried once with simplified scope. If still failing, continue without that input and note the gap.

## Context Preservation

Delegate to sub-agents for codebase exploration, pattern searching, documentation research, and multi-file analysis. Keep orchestration, decision-making, user communication, and state management in main context. If context compaction occurs mid-task, save todos before compaction completes and re-orient from git state after compaction.
