---
name: upgrade-deps
description: Intelligent dependency scanning and upgrade workflow that transforms maintenance into feature discovery with sequential verification and changelog analysis
module: bmm
phase: 4-implementation
---

# Upgrade Deps - Dependency Discovery and Update

## Purpose

Transform dependency updates from maintenance chores into feature discovery opportunities. Scan outdated packages, analyze changelogs for new capabilities relevant to the codebase, update with verification at each step, implement quick wins from new features, and create issues for larger opportunities.

## When to Use

- Dependencies are outdated and need updating
- You want to discover new features available in updated packages
- Security advisories require dependency updates
- A specific package needs targeted upgrading
- Periodic maintenance to keep the dependency tree current

## Prerequisites

- Package manager detected (pnpm, npm, yarn, bun, pip, poetry, or uv)
- GitHub CLI (`gh`) for changelog fetching and issue creation
- Passing baseline: type checking and tests must pass before any updates begin
- Lock file present for the detected package manager

## Execution Steps

### Step 1: Detect Ecosystem

Identify the package manager from project files:

- **JavaScript/TypeScript**: `package.json` with `pnpm-lock.yaml` (pnpm), `package-lock.json` (npm), `yarn.lock` (yarn), or `bun.lockb` (bun). For yarn, detect classic vs Berry by checking for `__metadata` in `yarn.lock`.
- **Python**: `pyproject.toml` with `[tool.poetry]` (poetry), `[tool.uv]` or `uv.lock` (uv), generic `pyproject.toml` (pip), or `requirements.txt` (pip).

If multiple ecosystems are detected, process each separately.

### Step 2: Verify Baseline

Run type check and tests before starting any updates. If either fails, note this and ask how to proceed -- updating on a broken baseline makes it impossible to isolate which update caused issues.

### Step 3: Scan for Outdated Packages

Identify all packages with available updates using the appropriate outdated command. Group by update type:

- **Patch** (1.2.3 to 1.2.4): Bug fixes only
- **Minor** (1.2.3 to 1.3.0): New features, backward-compatible
- **Major** (1.2.3 to 2.0.0): Breaking changes possible

Identify related packages that should update together to avoid version mismatches. Common groups include: tanstack/react-query with devtools, radix-ui packages, eslint with typescript-eslint, testing-library packages, sqlalchemy with alembic, fastapi with starlette and pydantic.

### Step 4: Analyze Changelogs

For each outdated package, fetch the changelog between the current version and the latest. Primary sources in order of preference: GitHub Releases API, CHANGELOG.md in the repository, package registry release notes.

Extract and categorize:

- **New features and APIs** the project could adopt
- **Deprecations** affecting code currently in use
- **Bug fixes** relevant to actual usage patterns (not every fix in the changelog)
- **Breaking changes** requiring migration

For new features, identify where existing code could benefit: manual implementations the library now handles, workarounds for issues now fixed, new APIs that simplify existing code.

### Step 5: Confirmation Gates

Proceed automatically for patch and minor updates. Pause and confirm before:

- Major version updates
- Updates with breaking changes in the changelog
- Updates to core dependencies (react, next, typescript, django, fastapi, sqlalchemy)
- Updates where the changelog indicates significant API changes

Present: current version, target version, summary of changes, and any code modifications that may be needed.

### Step 6: Sequential Update Loop

For each package or batch of related packages:

1. Update the package(s)
2. Run type checking
3. Run tests
4. If either verification fails, stop immediately and report which package caused the failure with specific errors

If checks pass, continue to the next package. After all individual updates complete, run a final batch verification (type check + tests) with all updates applied together to catch cross-package conflicts.

### Step 7: Implement Quick Wins

After successful updates, evaluate discovered opportunities from changelog analysis:

- **Quick wins** (implement inline): New API replacing existing code, simplified syntax for existing patterns, removal of workarounds for fixed bugs, single-file changes of roughly 20 lines or fewer.
- **Medium scope** (create GitHub issue): New features requiring architectural consideration, deprecation migrations affecting multiple files, performance improvements requiring measurement, new capabilities needing planning.

For each GitHub issue created, include: link to the relevant changelog entry, files in the codebase that would be affected, suggested implementation approach, and link to new documentation.

### Step 8: Commit Strategy

One PR per command invocation with granular commits:

- Batch commit for patch/minor updates with no code changes
- Separate commit when implementing a feature from an upgrade
- Separate commit for breaking change migrations

Each commit should pass type check and tests independently.

### Step 9: Generate Final Report

Present a comprehensive summary:

- **Packages Updated**: Table with package name, previous version, current version, and change type
- **New Features Available**: What is new, how it applies to the codebase, whether it was implemented or deferred
- **Bugs Fixed That Affected Us**: Only bugs where the affected code paths are in use
- **Quick Wins Implemented**: What was adopted inline during this update
- **GitHub Issues Created**: Links to issues for larger opportunities
- **Deprecation Warnings**: APIs in use that are now deprecated, with migration timeline

## Outputs

- Updated dependencies with passing type checks and tests
- PR with granular commits (one per significant change category)
- Quick win implementations leveraging new package capabilities
- GitHub issues for medium-scope opportunities discovered during changelog analysis
- Final report documenting all updates, new capabilities, and next steps

## Completion Criteria

- All targeted packages are updated (or failures are documented with specific errors)
- Type check and tests pass after all updates applied together
- Changelogs have been analyzed for feature discovery
- Quick wins are implemented where applicable
- GitHub issues are created for medium-scope opportunities
- Final report is generated with full update summary
- Each commit passes type check and tests independently

## Edge Cases

- **No changelog available**: Proceed with update but note it in the report. Rely on type check and tests to catch issues.
- **Pre-existing failures**: If baseline type check or tests fail before any updates, ask how to proceed.
- **Monorepo packages**: Fetch the changelog once and apply relevant entries to each package being updated.
- **Mixed ecosystem projects**: Process one ecosystem at a time. Complete all updates for one before starting the other.
