# QIE — Quantum Intelligence Engine

This is the root intelligence system for the Light-Brands organization. It contains 88 AI agents across 7 modules (BMAD Core, BuildOS, InvestOS, AmplifyOS, GrowthOS, SoulOS, QI) with 148 workflows.

## QIE Client Hub

This repo is also a **Client Hub** — a master orchestration layer over all Light-Brands GitHub repos (46+ projects). The hub uses a registry-first, pull-on-demand architecture.

### Key Concepts

- **Registry** (`.qie/registry.json`): Knows every repo in the org. Committed to git. Shared awareness.
- **Clients** (`clients/`): Gitignored. Contains only repos pulled locally for active work. Per-user state.
- **Intelligence Symlink**: When a project is selected, `_bmad → ../../../_bmad` symlink gives it access to all QIE agents/workflows. The symlink is gitignored in each project.
- **The framework never ships.** Client repos deploy clean — zero QIE code in production.

### Working with Client Projects

**Always check for an active project before doing work:**

```bash
bin/qie status          # What project am I working on?
bin/qie list            # See all 46+ repos (local vs remote)
bin/qie select <name>   # Activate a project (auto-pulls if needed)
bin/qie deselect        # Clear active project
```

**The active project context is stored in `.qie/context.yaml`:**
```yaml
active_project: auracle
active_path: clients/light-brands/auracle
owner: Light-Brands
```

### QIE CLI Commands

| Command | Description |
|---------|-------------|
| `bin/qie scan` | Refresh registry from GitHub |
| `bin/qie list` | Show all repos (local + remote) |
| `bin/qie list --local` | Show only pulled repos |
| `bin/qie pull <project>` | Clone repo locally |
| `bin/qie select <project>` | Activate project (auto-pulls, creates symlink) |
| `bin/qie deselect` | Deactivate current project |
| `bin/qie status` | Show active project details |
| `bin/qie sync` | Pull latest for all local repos |
| `bin/qie remove <project>` | Delete local clone |
| `bin/qie open <project>` | Open in editor |

Fuzzy matching supported: `qie select aur` resolves to `auracle`.

### Directory Structure

```
investos/                     # Root — QIE Intelligence System
├── _bmad/                    # Intelligence layer (agents, workflows, modules)
├── .qie/                     # Hub config (registry, sources, ignore)
│   ├── registry.json         # All known repos with metadata
│   ├── sources.yaml          # GitHub orgs + personal repos to scan
│   └── ignore                # Repos hidden from list display
├── clients/                  # GITIGNORED — pulled repos only
│   ├── light-brands/<name>/  # Org repos
│   └── personal/<name>/      # Personal repos
├── bin/qie                   # CLI tool
└── .github/workflows/        # Auto-discovery cron
```

### Rules for Agents

1. **Check `.qie/context.yaml` at session start** to see if a project is active.
2. **When working on a client project**, operate within `clients/<category>/<name>/` — that is the project's root.
3. **Never commit client code to the engine repo.** The `clients/` directory is gitignored.
4. **Use `bin/qie select` to switch projects.** This manages symlinks and context.
5. **The _bmad symlink in a client project** points back to root intelligence. Agents and workflows are available from there.
6. **To create/modify repos**: select the project, work within its directory, commit and push from there. Changes go to the project's own remote.
7. **To discover new repos**: run `bin/qie scan` or wait for the auto-discovery GitHub Action.

## BMAD Framework

- Agents are in `_bmad/core/agents/` and `_bmad/bmm/agents/`
- Workflows are in `_bmad/core/workflows/` and `_bmad/bmm/workflows/`
- Configuration is in `_bmad/core/config.yaml`
- Output artifacts go to `_bmad-output/`
- Invoke agents via `/bmad-agent-*` commands

## Hub Knowledge Reference

For detailed hub architecture, see: `_bmad/core/data/qie-client-hub.md`
