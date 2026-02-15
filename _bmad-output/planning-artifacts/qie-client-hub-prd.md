---
stepsCompleted: ['brainstorm', 'requirements-gathering', 'revision-1', 'revision-2']
inputDocuments: ['README.md', 'config.yaml']
workflowType: 'prd'
---

# Product Requirements Document — QIE Client Hub

**Author:** Lawless
**Date:** 2026-02-15
**Revision:** 3 — Clean separation: engine repo tracks zero client code

---

## Executive Summary

### Vision

QIE Client Hub transforms the `investos` repository into a **master orchestration layer** that maintains full awareness of every repo across the Light-Brands GitHub organization (43 repos) and personal accounts (3 repos) — 46 total. A **registry** is the source of truth: every QIE user sees the complete portfolio of available projects. Repos are cloned locally **on demand** when a user chooses to work on a project. The entire `clients/` directory is **gitignored** — the engine repo tracks zero client code. No submodules, no `.gitmodules`, no commit refs. Client repos are plain `git clone`s managed by the `qie` CLI. Once pulled, repos persist locally for continued work.

### Core Principles

1. **The framework never ships.** QIE intelligence (88 agents, 148 workflows) exists only at root. Client repos receive ephemeral symlinks during development — zero bloat in deployed apps.
2. **The engine stays clean.** The root repo contains zero client code. `clients/` is gitignored. No submodules, no `.gitmodules`, no commit refs polluting the engine.
3. **Know everything, pull what you need.** The registry maintains awareness of all repos. Local disk only holds projects you're actively working on.
4. **Evolutionary growth.** New repos auto-discover into the registry. Users pull them when ready. The system grows organically.

### Target Users

- Lawless (primary operator)
- Future team members working through the QIE system
- Each user has their own local hub instance with their own set of pulled projects

---

## Success Criteria

| ID | Criteria | Measurement |
|----|----------|-------------|
| SC-1 | Registry contains all 46+ repos with metadata | `qie list` shows 46 entries with name, owner, description, local/remote status |
| SC-2 | `qie pull <project>` clones a repo locally in under 30 seconds | `time qie pull auracle` < 30s for average-size repo |
| SC-3 | `qie select` on already-local project completes in under 2 seconds | Symlink creation + context switch only |
| SC-4 | Intelligence symlink resolves correctly from any pulled project | `ls -la clients/<owner>/<project>/_bmad` resolves and agent files accessible |
| SC-5 | Client repos contain zero QIE artifacts when cloned standalone | Fresh `git clone` of any project repo has no `_bmad/` |
| SC-6 | New repos appear in registry within 24 hours of creation | GitHub Action cron updates registry, user sees new entry in `qie list` |
| SC-7 | `qie list` clearly distinguishes local vs remote-only repos | Visual indicator (icon or label) per repo |

---

## Architecture

### Two-Layer Model

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: REGISTRY (committed — shared awareness)           │
│  .qie/registry.json — 46+ entries, GitHub metadata only     │
│  Updated by: qie scan, GitHub Action cron                   │
│  Committed to git — every user sees all repos immediately   │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  LAYER 2: LOCAL (gitignored — per-user working state) │  │
│  │  clients/ — plain git clones, fully gitignored        │  │
│  │  No submodules. No .gitmodules. Zero tracking.        │  │
│  │  Managed by: qie pull, qie select, qie remove        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Key insight:** The registry is always complete and committed. The `clients/` directory is entirely gitignored — it's per-user working state, like `node_modules/`. The engine repo stays perfectly clean.

### Directory Structure

```
investos/                              # Root — QIE Intelligence System
├── _bmad/                             # BMAD Core + All Modules (NEVER deployed)
│   ├── core/
│   └── bmm/
├── .qie/                              # QIE Hub configuration (committed)
│   ├── registry.json                  # Complete repo awareness (all 46+)
│   ├── sources.yaml                   # GitHub orgs + personal repos to scan
│   └── ignore                         # Repos to exclude from list display
├── clients/                           # ⚠️ FULLY GITIGNORED — per-user only
│   ├── light-brands/                  # Light-Brands org repos (only pulled ones)
│   │   ├── auracle/                   # plain git clone — pulled and active
│   │   └── brand-factory/             # plain git clone — pulled, not active
│   └── personal/                      # Personal repos (only pulled ones)
│       └── growth-mastery/            # plain git clone
├── bin/                               # QIE CLI tooling (committed)
│   └── qie                            # Shell script — master CLI
├── .github/
│   └── workflows/
│       └── discover-repos.yml         # Cron-based registry update
└── README.md
```

**What is NOT in this tree:** No `.gitmodules`. No submodule refs. No client code tracked by the engine repo whatsoever.

### Registry File (`.qie/registry.json`)

The brain of the system. Contains every known repo. **Pure GitHub metadata only** — no local state stored. Local presence is detected at runtime by checking if `clients/<category>/<name>/` exists on disk.

```json
{
  "last_scan": "2026-02-15T10:30:00Z",
  "repos": [
    {
      "name": "auracle",
      "owner": "Light-Brands",
      "full_name": "Light-Brands/auracle",
      "ssh_url": "git@github.com:Light-Brands/auracle.git",
      "https_url": "https://github.com/Light-Brands/auracle.git",
      "category": "light-brands",
      "description": "Auracle platform",
      "default_branch": "main",
      "language": "TypeScript",
      "updated_at": "2026-02-14T18:00:00Z",
      "archived": false
    },
    {
      "name": "cedar-capital",
      "owner": "Light-Brands",
      "full_name": "Light-Brands/cedar-capital",
      "ssh_url": "git@github.com:Light-Brands/cedar-capital.git",
      "https_url": "https://github.com/Light-Brands/cedar-capital.git",
      "category": "light-brands",
      "description": "Cedar Capital fund site",
      "default_branch": "main",
      "language": "JavaScript",
      "updated_at": "2026-01-20T12:00:00Z",
      "archived": false
    }
  ]
}
```

**Local detection at runtime:** `qie list` checks if `clients/<category>/<name>/` directory exists → marks as `local`. No state to sync, no stale flags. The filesystem IS the truth for local presence.

### Sources Configuration (`.qie/sources.yaml`)

Defines what the scanner looks at. Committed to git so all hub users share the same scope.

```yaml
# Organizations to scan (all non-archived repos)
organizations:
  - name: Light-Brands
    category: light-brands

# Individual repos from any owner
personal:
  - repo: 0ptimystic/SeedsGame
    category: personal
  - repo: danlawless/busybees
    category: personal
  - repo: GrowthMastery-ai/growth-mastery
    category: personal
```

Adding a new org or personal repo here = next `qie scan` picks it up.

### Context File (`.qie/context.yaml`) — Gitignored

```yaml
active_project: auracle
active_path: clients/light-brands/auracle
owner: Light-Brands
selected_at: 2026-02-15T10:30:00Z
```

Per-user, per-machine. Gitignored alongside `clients/`.

### Ignore File (`.qie/ignore`)

```
test-brand-delete-me2
```

Repos listed here are excluded from `qie list` display (still in registry, just hidden).

### Symlink Intelligence Deployment

When `qie select <project>` runs on a local project:

```
clients/light-brands/auracle/
├── _bmad → ../../../_bmad            # Symlink (gitignored in project)
├── src/                               # Project's actual code
└── ...
```

Symlink path: `../../../_bmad` (3 levels: `clients/<category>/<project>` → root).
Isolation: `_bmad/` in each project's `.gitignore`.

---

## User Journeys

### UJ-1: First-Time Setup

1. Lawless runs `qie scan`
2. CLI queries GitHub API for all Light-Brands org repos + configured personal repos
3. CLI builds `.qie/registry.json` with all 46 repos — all marked `local: false`
4. CLI reports: "Registry built: 46 repos discovered. Run `qie list` to browse."
5. No repos cloned. Disk footprint: ~10KB (registry file only).

### UJ-2: Browse and Pull a Project

1. Lawless runs `qie list`
2. CLI reads registry, checks filesystem for local presence, displays:
   ```
   QIE Client Hub — 46 repos (2 local, 44 remote)

   LIGHT-BRANDS (43 repos)
     * auracle              TypeScript   local    3 days ago
       base-ai              Python       remote   1 week ago
     * brand-factory        JavaScript   local    5 days ago
       cedar-capital         JavaScript   remote   3 weeks ago
       cho-ventures          —            remote   2 months ago
       ...

   PERSONAL (3 repos)
       SeedsGame            GDScript     remote   1 month ago
       busybees             Python       remote   2 weeks ago
       growth-mastery       TypeScript   remote   1 week ago

   * = local    Active: auracle
   ```
3. Lawless runs `qie pull cedar-capital`
4. CLI runs `git clone --depth 1` into `clients/light-brands/cedar-capital/`
5. CLI reports: "Pulled cedar-capital. Run `qie select cedar-capital` to activate."
6. Nothing changes in the engine repo — `clients/` is gitignored

### UJ-3: Select and Work on a Project

1. Lawless runs `qie select cedar-capital`
2. If not local: CLI auto-pulls first (clone + select in one step)
3. CLI removes previous `_bmad` symlink (from auracle)
4. CLI creates `clients/light-brands/cedar-capital/_bmad → ../../../_bmad`
5. CLI ensures `_bmad` is in cedar-capital's `.gitignore`
6. CLI updates `.qie/context.yaml`
7. CLI confirms: "Active: cedar-capital (Light-Brands/cedar-capital)"
8. Lawless works in `clients/light-brands/cedar-capital/` — full BMAD available
9. Commits and pushes go directly to `Light-Brands/cedar-capital` remote
10. The engine repo sees nothing — `clients/` is gitignored

### UJ-4: Switch Projects

1. Lawless runs `qie select auracle`
2. CLI removes symlink from `cedar-capital/_bmad`
3. CLI creates symlink at `auracle/_bmad → ../../../_bmad`
4. CLI updates context — clean switch, no confusion

### UJ-5: Sync Local Projects

1. Lawless runs `qie sync` — runs `git pull` in all local project directories
2. Lawless runs `qie sync cedar-capital` — pulls one specific project
3. Non-local repos unaffected (nothing on disk to sync)

### UJ-6: Refresh Registry (New Repos)

1. Team member creates `Light-Brands/new-project` on GitHub
2. **Automatic path:** GitHub Action cron fires within 6 hours, updates `registry.json`, creates PR
3. **Manual path:** Lawless runs `qie scan` to refresh immediately
4. Next `qie list` shows `new-project` as `remote`
5. Lawless runs `qie pull new-project` when ready to work on it

### UJ-7: New Team Member Onboards

1. Team member clones `investos` repo
2. Runs `qie scan` — registry builds with all 46 repos
3. Runs `qie list` — sees the entire portfolio (all `remote`)
4. Runs `qie pull <their-project>` — only pulls what they need
5. Different team members have different local sets — no wasted disk

### UJ-8: Deploy Project Standalone

1. Developer clones `Light-Brands/auracle` directly (outside QIE hub)
2. No `_bmad/` — symlink was gitignored
3. Fully standalone application. Zero framework bloat.

---

## Functional Requirements

### FR-1: Registry Management

- FR-1.1: `qie scan` queries all orgs and personal repos defined in `.qie/sources.yaml`
- FR-1.2: `qie scan` creates or updates `.qie/registry.json` with GitHub metadata only (no local state)
- FR-1.3: `qie scan` skips repos listed in `.qie/ignore`
- FR-1.4: `qie scan` skips archived and disabled repos (marks them `archived: true` if already in registry)
- FR-1.5: `qie scan` reports: count of new repos found, count of repos removed/archived, total registry size
- FR-1.6: Registry is committed to git — shared source of truth for all hub users
- FR-1.7: Local presence is NEVER stored in registry — detected at runtime by checking `clients/<category>/<name>/` existence

### FR-2: Pull On Demand

- FR-2.1: `qie pull <project>` runs `git clone` into `clients/<category>/<name>/`
- FR-2.2: `qie pull` uses SSH URL from registry for cloning
- FR-2.3: `qie pull` uses `--depth 1` for shallow clone by default
- FR-2.4: `qie pull` adds `_bmad` to the project's `.gitignore` if not present
- FR-2.5: `qie pull` fails gracefully if directory already exists (reports "already local")
- FR-2.6: `qie pull --full` clones with full history instead of shallow
- FR-2.7: `qie pull` creates `clients/<category>/` directory if it doesn't exist
- FR-2.8: Nothing in the engine repo changes on pull — `clients/` is gitignored

### FR-3: Project Selection

- FR-3.1: `qie select <project>` sets the active project context
- FR-3.2: If project is not local, `qie select` auto-runs `qie pull` first, then activates
- FR-3.3: `qie select` creates `_bmad` symlink inside the selected project → root `_bmad/`
- FR-3.4: `qie select` removes `_bmad` symlink from previously active project
- FR-3.5: `qie select` writes project metadata to `.qie/context.yaml`
- FR-3.6: `qie deselect` clears active project and removes symlink
- FR-3.7: `qie status` shows active project, git branch, dirty/clean, last commit
- FR-3.8: Fuzzy matching — `qie select aur` resolves to `auracle` if unambiguous; prompts if multiple matches

### FR-4: List and Browse

- FR-4.1: `qie list` displays ALL repos from registry, grouped by category
- FR-4.2: Each entry shows: name, primary language, local/remote status, last updated date
- FR-4.3: Active project is highlighted (e.g., `*` prefix or color)
- FR-4.4: Repos in `.qie/ignore` are hidden from display
- FR-4.5: `qie list --all` shows ignored repos too
- FR-4.6: `qie list --local` filters to only locally-pulled repos
- FR-4.7: `qie list --remote` filters to only non-local repos

### FR-5: Sync

- FR-5.1: `qie sync` runs `git pull` in all local project directories under `clients/`
- FR-5.2: `qie sync <project>` pulls a single named project
- FR-5.3: `qie sync` auto-detects local repos by scanning `clients/` directory tree
- FR-5.4: `qie sync` reports per-repo status: updated, already current, error

### FR-6: Intelligence Symlink

- FR-6.1: Symlink target: `../../../_bmad` (3 levels up from `clients/<category>/<project>/`)
- FR-6.2: Symlink creation verifies target resolves to directory containing `core/config.yaml`
- FR-6.3: If project's `.gitignore` doesn't contain `_bmad`, CLI appends it
- FR-6.4: Only one symlink exists at a time (previous cleaned on project switch)

### FR-7: Auto-Discovery

- FR-7.1: GitHub Action runs on cron (configurable, default: every 6 hours)
- FR-7.2: Action runs same logic as `qie scan`
- FR-7.3: If registry changed, action commits updated `registry.json` and creates PR
- FR-7.4: PR title format: "Registry update: +N new, -M archived"
- FR-7.5: Manual trigger via `workflow_dispatch`
- FR-7.6: Action does NOT add submodules — only updates the registry

### FR-8: CLI Infrastructure

- FR-8.1: `qie` is a single executable shell script at `bin/qie`
- FR-8.2: `qie help` displays all commands with descriptions
- FR-8.3: `qie` with no args shows: active project (if any), registry stats, help hint
- FR-8.4: Colored terminal output with clear success/error/info states
- FR-8.5: `qie` resolves root via `git rev-parse --show-toplevel` — works from any subdirectory
- FR-8.6: `qie open <project>` opens local project in `$EDITOR` or Finder
- FR-8.7: `qie remove <project>` deletes the project's clone directory from `clients/` (with confirmation prompt)

---

## Non-Functional Requirements

- NFR-1: `qie select` on local project completes in under 2 seconds
- NFR-2: `qie list` renders full registry in under 3 seconds
- NFR-3: `qie scan` completes GitHub API queries in under 30 seconds for 50 repos
- NFR-4: `qie pull` handles network failures — reports error, does not corrupt state
- NFR-5: GitHub Action completes in under 5 minutes
- NFR-6: Zero external dependencies beyond `git`, `gh` CLI, `jq`, and standard Unix tools
- NFR-7: Works on macOS (primary) and Linux (CI)
- NFR-8: Registry JSON is valid and parseable after every `qie scan` (atomic write)

---

## CLI Command Reference

| Command | Description |
|---------|-------------|
| `qie scan` | Refresh registry from GitHub — discover all repos, update metadata |
| `qie list` | Show all repos (local + remote) grouped by category |
| `qie list --local` | Show only pulled repos |
| `qie list --remote` | Show only non-local repos |
| `qie list --all` | Include ignored repos |
| `qie pull <project>` | Clone repo as submodule (on demand) |
| `qie pull <project> --full` | Clone with full history |
| `qie select <project>` | Activate project (auto-pulls if needed), create symlink |
| `qie deselect` | Deactivate current project, remove symlink |
| `qie status` | Show active project details and git info |
| `qie sync` | Update all local submodules to latest remote |
| `qie sync <project>` | Update one local submodule |
| `qie open <project>` | Open project in editor or Finder |
| `qie remove <project>` | Remove local submodule, keep in registry as remote |
| `qie help` | Show command reference |

---

## Implementation Sequence

| Step | Description | Depends On |
|------|-------------|------------|
| 1 | Create `.qie/` directory + `sources.yaml` with Light-Brands org and 3 personal repos | — |
| 2 | Update root `.gitignore` — add `clients/` and `.qie/context.yaml` | — |
| 3 | Create `bin/qie` shell script scaffold: arg parsing, `help` command, root resolution | — |
| 4 | Implement `qie scan` — GitHub API queries → `registry.json` generation | Steps 1, 3 |
| 5 | Implement `qie list` — read registry, check filesystem for local presence, display | Step 4 |
| 6 | Implement `qie pull <project>` — `git clone --depth 1`, create category dirs, gitignore `_bmad` | Step 4 |
| 7 | Implement `qie select` / `qie deselect` — symlink + context management + auto-pull | Step 6 |
| 8 | Implement `qie status` — active project display | Step 7 |
| 9 | Implement `qie sync` — `git pull` in local project directories | Step 6 |
| 10 | Implement `qie remove` — dirty check + directory deletion | Step 6 |
| 11 | Implement `qie open` — editor/Finder integration | Step 7 |
| 12 | Create `.github/workflows/discover-repos.yml` — cron registry update | Step 4 |
| 13 | Run `qie scan` — build initial registry, commit | Step 4 |
| 14 | Test: `qie pull` + `qie select` on 2-3 repos, verify gitignore holds | Steps 6, 7 |
| 15 | Verify SC-1 through SC-7 success criteria | Step 14 |

---

## Gitignore Strategy

### Root `.gitignore` (investos repo)

```gitignore
# QIE Hub — client repos are per-user working state (NEVER tracked)
clients/

# QIE Hub — per-user context (not shared)
.qie/context.yaml
```

This is the critical line. `clients/` is treated like `node_modules/` — each user's local working state, never committed to the engine repo.

### Files Committed to Git (Shared)

| File | Why Committed |
|------|--------------|
| `.qie/sources.yaml` | All users need the same org/repo scan targets |
| `.qie/ignore` | All users see the same filtered list |
| `.qie/registry.json` | Shared awareness — everyone sees all repos without running scan |
| `bin/qie` | CLI available to all users |

### Files NOT Committed (Per-User)

| File / Directory | Why Gitignored |
|-----------------|----------------|
| `clients/` | All client repo clones — per-user working state |
| `.qie/context.yaml` | Active project selection — per-user |

### Per-Project `.gitignore` Addition

When `qie pull` or `qie select` runs, it ensures the pulled project's own `.gitignore` contains:

```gitignore
# QIE Intelligence Framework (symlink — not part of this project)
_bmad
```

This prevents the BMAD symlink from being committed into the client repo.

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Registry drift if GitHub Action PR not merged | New team members don't see new repos | `qie scan` can always refresh locally; Action PR is convenience not dependency |
| Shallow clones limit git history operations | Can't `git log` or `git blame` fully | `qie pull --full` option; `git fetch --unshallow` within project |
| Symlink breaks if directory structure changes | BMAD agents can't find config | FR-6.2 validates symlink target on every `qie select` |
| GitHub API rate limiting | Scan fails | Authenticated `gh` CLI gives 5000 req/hr; 46 repos needs ~3 requests |
| Large repos slow to pull | First pull takes minutes | Shallow clone default; progress indicator during pull |
| User accidentally `git add clients/` | Client code enters engine repo | Root `.gitignore` prevents this; `qie` CLI can verify gitignore on init |
| Cloned project has uncommitted work when `qie remove` runs | Data loss | `qie remove` checks for dirty state and warns before deletion |

---

## Open Questions (Future Phases)

1. Should `qie` support tagging/grouping repos (e.g., "active clients", "tools", "archived")?
2. Should BMAD Party Mode auto-read `.qie/context.yaml` to scope to active project?
3. Per-project module selection — track which QIE modules (BuildOS, GrowthOS) each project uses?
4. Should registry store additional metadata like "last worked on locally" timestamps?
5. Multi-user awareness — should `qie list` show which repos other team members have pulled?
