# QIE Client Hub — Agent Knowledge Reference

This document provides complete knowledge about the QIE Client Hub for any BMAD agent that needs to work with client projects.

## Architecture

The QIE Client Hub has two layers:

1. **Registry Layer** (`.qie/registry.json`) — Committed. Contains metadata for ALL repos across the Light-Brands GitHub org and personal repos. Every agent sees the full portfolio.
2. **Local Layer** (`clients/`) — Gitignored. Contains only repos that have been pulled for active work. Per-user. Each user has their own set of pulled projects.

The engine repo (investos) tracks **zero** client code. The `clients/` directory is fully gitignored.

## How to Determine Active Project

Read `.qie/context.yaml` at `{project-root}/.qie/context.yaml`:

```yaml
active_project: auracle
active_path: clients/light-brands/auracle
owner: Light-Brands
selected_at: 2026-02-15T10:30:00Z
```

If this file does not exist or is empty, no project is active.

## How to Work on a Client Project

### From an Agent Session

1. Check `.qie/context.yaml` for active project
2. If active: the project root is `{project-root}/{active_path}/`
3. If not active: ask the user which project to work on, then run `bin/qie select <name>`
4. The project directory contains a `_bmad` symlink → root `_bmad/` (intelligence is available)
5. All file operations should be scoped to the project directory
6. Git commits and pushes from the project directory go to the **project's own remote**

### Key Paths When a Project is Active

| What | Path |
|------|------|
| Project root | `{project-root}/clients/<category>/<name>/` |
| Project source code | Inside the project root |
| Intelligence symlink | `{project-root}/clients/<category>/<name>/_bmad` → `../../../_bmad` |
| BMAD agents | Available via the symlink |
| Project's git remote | The project's own GitHub repo (e.g., `Light-Brands/auracle`) |

### Categories

| Category | Directory | Description |
|----------|-----------|-------------|
| `light-brands` | `clients/light-brands/` | Light-Brands organization repos |
| `personal` | `clients/personal/` | Personal repos (0ptimystic, danlawless, GrowthMastery-ai) |

## CLI Reference

The `qie` CLI is at `{project-root}/bin/qie`. All commands:

### Registry & Discovery
- `bin/qie scan` — Query GitHub API, update registry with all known repos
- `bin/qie list` — Display all repos grouped by category (local vs remote indicators)
- `bin/qie list --local` — Only locally-pulled repos
- `bin/qie list --remote` — Only remote repos
- `bin/qie list --all` — Include ignored repos

### Project Operations
- `bin/qie pull <name>` — Clone a repo locally (`git clone --depth 1`)
- `bin/qie pull <name> --full` — Clone with full history
- `bin/qie select <name>` — Activate project (auto-pulls if needed, creates symlink, sets context)
- `bin/qie deselect` — Deactivate project (removes symlink, clears context)
- `bin/qie status` — Show active project, branch, dirty/clean state

### Maintenance
- `bin/qie sync` — Pull latest for all local repos
- `bin/qie sync <name>` — Pull latest for one repo
- `bin/qie remove <name>` — Delete local clone (with dirty-state protection)
- `bin/qie open <name>` — Open in editor or Finder

### Fuzzy Matching
All project name arguments support fuzzy matching. `qie select aur` resolves to `auracle` if unambiguous.

## Registry Schema

`.qie/registry.json` contains:

```json
{
  "last_scan": "ISO-8601 timestamp",
  "repos": [
    {
      "name": "repo-name",
      "owner": "Light-Brands",
      "full_name": "Light-Brands/repo-name",
      "ssh_url": "git@github.com:Light-Brands/repo-name.git",
      "https_url": "https://github.com/Light-Brands/repo-name.git",
      "category": "light-brands",
      "description": "Repo description",
      "default_branch": "main",
      "language": "TypeScript",
      "updated_at": "ISO-8601 timestamp",
      "archived": false
    }
  ]
}
```

**Local presence is NOT stored in the registry.** It is detected at runtime by checking if `clients/<category>/<name>/` exists on disk.

## Sources Configuration

`.qie/sources.yaml` defines what the scanner queries:

```yaml
organizations:
  - name: Light-Brands
    category: light-brands

personal:
  - repo: 0ptimystic/SeedsGame
    category: personal
```

To add a new org or personal repo: edit this file, then run `bin/qie scan`.

## Critical Rules

1. **Never commit anything from `clients/` to the engine repo** — it is gitignored
2. **The `_bmad` symlink in client projects is ephemeral** — created by `qie select`, removed by `qie deselect`
3. **The `_bmad` symlink is gitignored in each client project** — it never enters the project's git history
4. **The framework never ships** — deployed client apps have zero QIE code
5. **One active project at a time** — `qie select` switches cleanly between projects
6. **Registry is committed, client clones are not** — the registry is shared knowledge, clones are per-user
