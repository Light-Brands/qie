# QIE System Architecture

**A comprehensive guide to the Quantum Intelligence Engine's layered architecture, module interactions, and design principles.**

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [The Four Layers](#the-four-layers)
3. [Module Deep Dives](#module-deep-dives)
4. [Cross-Module Interactions](#cross-module-interactions)
5. [Data Architecture](#data-architecture)
6. [Agent Design Patterns](#agent-design-patterns)
7. [Intelligence & Learning System](#intelligence--learning-system)

---

## Architecture Overview

The QIE is organized as a **layered stack** of 7 modules, where higher layers provide intelligence, morality, and alignment services to lower operational layers.

```mermaid
graph TB
    subgraph L4["Layer 4: Quantum Intelligence (QI)"]
        direction LR
        QI_MG["Moral Gateway"]
        QI_AIQ["AIQ Scoring"]
        QI_MIQ["MIQ Scoring"]
        QI_TIS["TIS Calculation"]
        QI_LE["Lesson Extraction"]
        QI_IM["Intuition Memory"]
        QI_MG --> QI_AIQ --> QI_MIQ --> QI_TIS
        QI_TIS --> QI_LE --> QI_IM
    end

    subgraph L3["Layer 3: SoulOS"]
        direction LR
        SOS_L["50 Sacred Laws"]
        SOS_V["7 Values"]
        SOS_E["7 Ethics"]
        SOS_M["7 Morals"]
        SOS_C["Council of Seven"]
        SOS_G["4 Sacred Gates"]
    end

    subgraph L2["Layer 2: BMAD Core"]
        direction LR
        C_B["Brainstorming"]
        C_D["Debugging"]
        C_R["Research"]
        C_P["Party Mode"]
        C_E["Editorial"]
        C_S["Sessions"]
    end

    subgraph L1["Layer 1: Operational Modules"]
        BMM["<b>BuildOS</b><br/>27 agents · 26 workflows"]
        IOS["<b>InvestOS</b><br/>10 agents · 28 workflows"]
        AOS["<b>AmplifyOS</b><br/>10 agents · 24 workflows"]
        GOS["<b>GrowthOS</b><br/>18 agents · 35 workflows"]
    end

    L4 --> L3 --> L2 --> L1

    style L4 fill:#2d1b4e,color:#fff
    style L3 fill:#1b3b3b,color:#fff
    style L2 fill:#1b2d45,color:#fff
    style L1 fill:#1b3b1b,color:#fff
```

### Design Principles

1. **Layered Intelligence** — Higher layers enrich, not block. QI and SoulOS guide and score but never prevent operational modules from producing output.
2. **Module Independence** — Each module has its own agents, workflows, tasks, config, and data. Modules can operate independently.
3. **Shared Memory** — The `_memory/` directory provides cross-module persistent state: coding standards, communication styles, intuition lessons.
4. **Agent Personas** — Every agent has a name, personality, and specialized expertise. This creates consistent, reliable interactions.
5. **Workflow-Driven Execution** — All non-trivial operations follow multi-step workflows with guided instructions at each step.
6. **Runtime Resource Loading** — Agents and workflows are loaded at runtime, never pre-loaded. This keeps context windows clean.

---

## The Four Layers

### Layer 4: Quantum Intelligence (QI)

**Location:** `_bmad/qi/`

QI operates through three engines:

| Engine | Purpose | Key Metric |
|--------|---------|-----------|
| **Intuition Engine** | Transform experience into accumulated wisdom | Lesson count |
| **AIQ Engine** | Measure cognitive intelligence quality | AIQ score (0-1000) |
| **Morality Protocol** | Ensure ethical alignment on every decision | MIQ score (0-1000) |

**The crown metric:** True Intelligence Score (TIS)
```
TIS = (0.6 x AIQ) + (0.4 x MIQ) x balance_modifier
```

The balance modifier rewards systems where cognitive and moral intelligence develop together (within 100 points = 5% bonus) and penalizes extreme imbalance (300+ point gap = 5% penalty).

**Pre-execution flow (Moral Gateway):**

```mermaid
flowchart LR
    A["Request"] --> B["1. Detect<br/>Significance"]
    B --> C["2. Boundary Scan<br/><i>7 Divine Morals</i>"]
    C -->|"Pass"| D["3. Value Alignment<br/><i>7 Divine Values</i>"]
    C -->|"Violation"| X["HALT"]
    D --> E["4. Intuition<br/>Retrieval"]
    E --> F["5. Route with<br/>Enrichment"]

    style X fill:#7f1d1d,color:#fff
    style F fill:#1c4a1c,color:#fff
```

**Post-execution flow (Intelligence Capture):**

```mermaid
flowchart LR
    A["Workflow<br/>Complete"] --> B["1. Create<br/>Episode"]
    B --> C["2. Score AIQ<br/><i>6 cognitive dims</i>"]
    C --> D["3. Score MIQ<br/><i>6 moral dims</i>"]
    D --> E["4. Calculate<br/>TIS"]
    E --> F["5. Extract<br/>Lessons"]
    F --> G[("6. Store in<br/>Intuition Memory")]

    style E fill:#4a1a8a,color:#fff
    style G fill:#1a4a4a,color:#fff
```

### Layer 3: Living Light (SoulOS)

**Location:** `_bmad/sos/`

SoulOS is the spiritual and moral doctrine layer. Unlike operational modules that produce artifacts, SoulOS **guides and reviews** without modifying other module outputs.

**Core doctrine components:**

| Component | Count | Description |
|-----------|-------|-------------|
| Sacred Laws | 50 | Inviolable principles governing all operations |
| Divine Values | 7 | Core values the system embodies |
| Divine Ethics | 7 | Ethical principles guiding decision-making |
| Divine Morals | 7 | Hard-stop moral boundaries (violation = halt) |
| Sacred Gates | 4 | Soul, Earth, Consent, Sovereignty |
| Stewardship Council | 7 | Named guardian agents with specific domains |
| Legion of Light | 22 | Armies organized under 7 Commanders |

**SoulOS Doctrine Structure:**

```mermaid
flowchart TD
    subgraph Foundation["Sacred Foundation"]
        SL["50 Sacred Laws"]
        DV["7 Divine Values"]
        DE["7 Divine Ethics"]
        DM["7 Divine Morals<br/><i>(hard stops)</i>"]
    end

    subgraph Governance["Governance Bodies"]
        SC["Stewardship Council<br/><i>7 named guardians</i>"]
        LL["Legion of Light<br/><i>7 commanders · 22 armies</i>"]
    end

    subgraph Gates["Four Sacred Gates"]
        G1["Soul Gate"]
        G2["Earth Gate"]
        G3["Consent Gate"]
        G4["Sovereignty Gate"]
    end

    subgraph Kabbalah["Kabbalistic Layer"]
        TOL["Tree of Life<br/><i>10 Sefirot</i>"]
        FW["Four Worlds<br/><i>Atzilut · Beriah<br/>Yetzirah · Assiyah</i>"]
        KL["7 Klippot<br/><i>shadow tracking</i>"]
    end

    Foundation --> Governance --> Gates --> Kabbalah

    style Foundation fill:#1a4a4a,color:#fff
    style Governance fill:#2a3a1a,color:#fff
    style Gates fill:#3a2a1a,color:#fff
    style Kabbalah fill:#2a1a3a,color:#fff
```

### Layer 2: BMAD Core

**Location:** `_bmad/core/`

Core provides cross-cutting services:

| Service | Command | What It Does |
|---------|---------|-------------|
| Brainstorming | `/bmad-brainstorming` | Multi-technique creative ideation |
| Debugging | `/bmad-debugging` | Systematic root-cause analysis before fixing |
| Research | `/bmad-research` | Quick-check or deep-dive web research |
| Party Mode | `/bmad-party-mode` | Multi-agent perspective discussion |
| Help Router | `/bmad-help` | Context-aware next-step guidance |
| Editorial Review | `/bmad-editorial-review-*` | Prose and structural editing |
| Session Management | `/bmad-session-save` | Save/restore session state |
| Handoff Context | `/bmad-handoff-context` | Generate context for new sessions |

### Layer 1: Operational Modules

Four modules handle specific business domains:

**BuildOS (Build & Ship Software)** — `_bmad/bmm/`
Full Agile lifecycle: product brief → PRD → architecture → epics/stories → sprint execution → code review → retrospective. Plus: autotask, multi-review, polish sweep, troubleshoot, dependency upgrades.

**InvestOS (Capital Formation)** — `_bmad/ios/`
End-to-end capital raise: raise strategy → entity structure → financial model → valuation → data room → investor narrative → platform → readiness check. Master orchestrator "Alexander" coordinates 28 workflows across 5 phases.

**AmplifyOS (Investor Communications)** — `_bmad/aos/`
Regulated communications: brand voice → compliance framework → content production (offering circulars, decks, emails, video, social) → compliance review → distribution campaigns → crisis management. Master orchestrator "Diana" coordinates 24 workflows.

**GrowthOS (Growth Engine)** — `_bmad/gos/`
Full-funnel growth: strategy → content engine → distribution → pipeline → sales → analytics. Master orchestrator "Theo" coordinates 35 workflows across 6 phases with 18 specialized agents.

---

## Module Deep Dives

### BuildOS Pipeline

```mermaid
flowchart LR
    subgraph P1["1. Analysis"]
        BP["Brainstorm"] --> MR["Market<br/>Research"]
        MR --> CB["Create<br/>Brief"]
    end

    subgraph P2["2. Planning"]
        CP["Create PRD"] --> VP["Validate PRD"]
        VP --> CU["Create UX"]
    end

    subgraph P3["3. Solutioning"]
        CA["Architecture"] --> CE["Epics &<br/>Stories"]
        CE --> IR["Readiness<br/>Check"]
    end

    subgraph P4["4. Implementation"]
        SP["Sprint<br/>Planning"] --> CS["Create<br/>Story"]
        CS --> DS["Dev Story"]
        DS --> CR["Code<br/>Review"]
        CR -->|"fixes"| DS
        CR -->|"approved"| CS
        CR -->|"epic done"| ER["Retro"]
    end

    P1 --> P2 --> P3 --> P4

    style P1 fill:#1a2a3a,color:#fff
    style P2 fill:#1a3a2a,color:#fff
    style P3 fill:#2a2a1a,color:#fff
    style P4 fill:#1c4a1c,color:#fff
```

### BuildOS Agent Roster

BuildOS has the largest agent roster, reflecting the complexity of software development:

**Core Team (9 agents):**
Analyst (Mary), Architect (Winston), Developer (Amelia), Product Manager (John), QA Engineer (Quinn), Scrum Master (Bob), UX Designer (Sally), Tech Writer (Paige), Quick Flow (Barry)

**Review Team (17 agents):**
Architecture Auditor, Comment Analyzer, Debugger, Error Handling Reviewer, Git Writer, Library Advisor, Logic Reviewer, Observability Reviewer, Performance Reviewer, Recovery Reviewer, Robustness Reviewer, Security Reviewer, Simplifier, Style Reviewer, Test Analyzer, Test Engineer, Test Runner

The review team can run in parallel via `/bmad-bmm-multi-review`.

### InvestOS Pipeline

```mermaid
flowchart LR
    subgraph D["1. Discovery"]
        RS["Raise<br/>Strategy"] --> SF["Strategic<br/>Foundation"]
        SF --> MR["Market<br/>Research"]
        MR --> IT["Investor<br/>Targeting"]
        IT --> EP["Engagement<br/>Plan"]
    end

    subgraph L["2. Legal"]
        ES["Entity<br/>Structure"] --> RC["Regulatory<br/>Compliance"]
        RC --> ID["Investment<br/>Docs"]
    end

    subgraph F["3. Financial"]
        FM["Financial<br/>Model"] --> VR["Valuation<br/>Report"]
        VR --> CT["Cap Table"]
        CT --> SM["Staffing<br/>Model"]
    end

    subgraph M["4. Materials"]
        DR["Data Room"] --> IN["Investor<br/>Narrative"]
        IN --> OB["Operational<br/>Blueprint"]
        OB --> PP["Platform"]
    end

    subgraph E["5. Execution"]
        ST["Status"] --> QC["Quality<br/>Check"]
        QC --> VX["Validate<br/>Cross-Refs"]
        VX --> IR["Investor<br/>Readiness"]
    end

    D --> L --> F --> M --> E

    style D fill:#4a3a1a,color:#fff
    style L fill:#3a1a2a,color:#fff
    style F fill:#1a3a2a,color:#fff
    style M fill:#1a2a3a,color:#fff
    style E fill:#2a1a3a,color:#fff
```

### InvestOS Workflow Phases

| Phase | Workflows | Key Agents | What Gets Produced |
|-------|-----------|------------|-------------------|
| 1. Discovery | 8 | Alexander, Cassandra, Diana, Priya | Raise strategy, market research, deal structure, engagement plan |
| 2. Legal | 3 | Victoria | Entity structure, regulatory routing, investment docs |
| 3. Financial | 5 | Marcus, Raymond | Financial model, valuation report, cap table, staffing model |
| 4. Materials | 6 | Helena, Cassandra, Raymond, Nikolai | Data room, narrative, blueprint, platform, brand |
| 5. Execution | 4 | Priya, Helena, Alexander | Status, quality check, cross-refs, readiness |

### AmplifyOS Pipeline

```mermaid
flowchart LR
    subgraph S["1. Strategy"]
        BV["Brand<br/>Voice"] --> CF["Compliance<br/>Framework"]
        CF --> IS["Investor<br/>Segmentation"]
    end

    subgraph C["2. Content"]
        OC["Offering<br/>Circular"] --> ID["Investor<br/>Deck"]
        ID --> EC["Email<br/>Campaign"]
        EC --> VS["Video<br/>Scripts"]
    end

    subgraph R["3. Review"]
        CR["Content<br/>Compliance"] --> OR["Offering<br/>Review"]
        OR --> FG["Final<br/>Gate"]
    end

    subgraph DI["4. Distribution"]
        CC["Create<br/>Campaign"] --> RD["Roadshow"]
    end

    subgraph X["5. Crisis"]
        CRX["Crisis<br/>Response"] --> SEC["SEC Comment<br/>Response"]
    end

    S --> C --> R --> DI --> X

    style S fill:#4a1a2a,color:#fff
    style C fill:#3a2a1a,color:#fff
    style R fill:#2a1a3a,color:#fff
    style DI fill:#1a3a2a,color:#fff
    style X fill:#3a1a1a,color:#fff
```

### AmplifyOS Workflow Phases

| Phase | Workflows | Key Agents | Focus |
|-------|-----------|------------|-------|
| 1. Strategy | 4 | Zoe, Sarah, Amanda, Jordan | Brand voice, compliance framework, segmentation |
| 2. Content | 7 | Emma, Michael | Offering circulars, decks, emails, video, social, landing pages |
| 3. Review | 4 | Marcus | Compliance gates: content, offering, disclosure, final |
| 4. Distribution | 4 | Diana, Amanda | Campaign creation, planning, execution, roadshows |
| 5. Crisis | 3 | Victoria, Diana | Crisis response, SEC comments, retrospective |

### GrowthOS Pipeline

```mermaid
flowchart LR
    subgraph S["1. Strategy"]
        GS["Growth<br/>Strategy"] --> GM["Growth<br/>Model"]
        GM --> CP["Customer<br/>Personas"]
        CP --> CS["Channel<br/>Strategy"]
    end

    subgraph CE["2. Content"]
        CT["Content<br/>Strategy"] --> SE["SEO"]
        SE --> BC["Blog"]
        BC --> SC["Social"]
        SC --> ES["Email"]
    end

    subgraph D["3. Distribution"]
        SM["Social<br/>Campaigns"] --> PC["Paid<br/>Campaigns"]
        PC --> PR["PR"]
        PR --> PA["Partners"]
    end

    subgraph P["4. Pipeline"]
        PL["Pipeline<br/>Architecture"] --> LS["Lead<br/>Scoring"]
        LS --> NS["Nurture"]
    end

    subgraph SL["5. Sales"]
        SS["Sales<br/>Scripts"] --> PT["Proposals"]
        PT --> CW["Closing"]
    end

    subgraph A["6. Analytics"]
        GD["Growth<br/>Dashboard"] --> FA["Funnel<br/>Analysis"]
        FA --> GE["Experiments"]
    end

    S --> CE --> D --> P --> SL --> A

    style S fill:#1a2a4a,color:#fff
    style CE fill:#2a1a4a,color:#fff
    style D fill:#1a4a2a,color:#fff
    style P fill:#3a2a1a,color:#fff
    style SL fill:#4a1a1a,color:#fff
    style A fill:#1a4a4a,color:#fff
```

### GrowthOS Workflow Phases

| Phase | Workflows | Key Agents | Focus |
|-------|-----------|------------|-------|
| 1. Strategy | 6 | Theo, Jax | Growth strategy, model, personas, channels, positioning |
| 2. Content | 7 | Margot, Akira, Luna, Serena | Content strategy, SEO, blog, social, email, video, podcast |
| 3. Distribution | 6 | Luna, Declan, Piper | Social campaigns, paid ads, launch, PR, partners, events |
| 4. Pipeline | 5 | Roman, Serena, Vivienne | Architecture, lead scoring, nurture, onboarding, playbooks |
| 5. Sales | 4 | Vivienne | Scripts, proposals, closing workflows, upsell |
| 6. Analytics | 5 | Soren | Dashboard, campaign performance, funnel, experiments, retention |

---

## Cross-Module Interactions

### QI wraps every operation

```mermaid
flowchart TD
    A["Any Module Workflow"] --> B["QI Moral Gateway"]
    B -->|"pre-checks morality"| C["Workflow Executes Normally"]
    C --> D["QI Post-Execution Capture"]
    D -->|"scores intelligence,<br/>extracts lessons"| E[("_memory/intuition/<br/>lessons/")]
    E -.->|"informs next run"| B

    style B fill:#4a1a8a,color:#fff
    style D fill:#4a1a8a,color:#fff
    style E fill:#1a4a4a,color:#fff
```

### SoulOS reviews but doesn't modify

SoulOS provides alignment checks that other modules can request:

```mermaid
flowchart LR
    REQ["Module<br/>Request"] --> SOS{"SoulOS<br/>Alignment<br/>Engine"}
    SOS --> VA["Values Alignment<br/><i>7 Divine Values</i>"]
    SOS --> MC["Morals Check<br/><i>7 Divine Morals</i>"]
    SOS --> FG["Four Gates Review<br/><i>Soul · Earth<br/>Consent · Sovereignty</i>"]
    SOS --> CD["Council Deliberation<br/><i>7 Stewardship<br/>Council Members</i>"]

    VA --> OUT["Advisory Report<br/><i>(never modifies output)</i>"]
    MC --> OUT
    FG --> OUT
    CD --> OUT

    style SOS fill:#1a4a4a,color:#fff
    style OUT fill:#1a3a5c,color:#fff
```

### Cross-module data flow

```mermaid
flowchart LR
    subgraph IOS_OUT["InvestOS Produces"]
        S["Strategy"]
        F["Financials"]
        DR["Data Room"]
        N["Narrative"]
    end

    subgraph AOS_IN["AmplifyOS Consumes"]
        OC["Offering Circular"]
        EC["Email Campaigns"]
        RD["Roadshows"]
        ID["Investor Deck"]
    end

    subgraph GOS_IN["GrowthOS Supports"]
        MK["Marketing"]
        SL["Sales Pipeline"]
        AN["Analytics"]
    end

    IOS_OUT -->|"narrative + materials"| AOS_IN
    IOS_OUT -->|"strategy + metrics"| GOS_IN
    GOS_IN -->|"leads + pipeline"| AOS_IN

    style IOS_OUT fill:#4a3a1a,color:#fff
    style AOS_IN fill:#4a1a2a,color:#fff
    style GOS_IN fill:#1a2a4a,color:#fff
```

---

## Data Architecture

### Directory Structure

```
_bmad/
├── _config/
│   ├── agent-manifest.csv       ← All 88 agents indexed
│   ├── workflow-manifest.csv    ← All 148 workflows indexed
│   ├── task-manifest.csv        ← All 34 tasks indexed
│   ├── bmad-help.csv            ← Help routing table
│   └── manifest.yaml            ← Module versions, metadata
│
├── _memory/
│   ├── intuition/
│   │   ├── episodes/            ← Structured experience records
│   │   ├── lessons/             ← Accumulated wisdom by module
│   │   ├── moral-lessons/       ← Moral-specific wisdom
│   │   ├── meta-lessons/        ← Lessons about learning itself
│   │   └── schemas/             ← Episode and lesson schemas
│   ├── coding-standards/        ← 33 coding standards
│   ├── communication-styles/    ← 7 AI personality configs
│   └── prompt-engineering/      ← LLM-to-LLM best practices
│
├── {module}/
│   ├── agents/                  ← Agent persona definitions
│   ├── workflows/               ← Multi-step guided processes
│   ├── tasks/                   ← Single-shot operations
│   ├── data/                    ← Module-specific reference data
│   ├── config.yaml              ← Module configuration
│   └── module-help.csv          ← Module-specific help routing
```

### Artifact Output

All generated artifacts go to `_bmad-output/`:

| Subdirectory | Content |
|-------------|---------|
| `epic-center-source/` | Client project source code, platform builds |
| `planning-artifacts/` | Financial model specs, workflow plans |
| `raise-rebuild/` | Session manifests for capital raise rebuilds |
| `soul-artifacts/` | SoulOS-generated alignment artifacts |
| `implementation-artifacts/` | Implementation-phase outputs |

---

## Agent Design Patterns

### Agent Definition Structure

Every agent follows the same pattern:

```markdown
---
name: "agent-name"
description: "One-line role description"
---

<agent id="..." name="Name" title="Role" icon="emoji">
  <persona>
    <role>What they do</role>
    <identity>Who they are</identity>
    <communication_style>How they communicate</communication_style>
    <principles>Core operating principles</principles>
  </persona>

  <activation>Steps to activate the agent</activation>
  <menu>Available commands</menu>
</agent>
```

### Master Agent Pattern

Each operational module has a **Master Agent** that orchestrates the full module:

| Module | Master | Persona Name | Command |
|--------|--------|-------------|---------|
| InvestOS | ios-master | Alexander | `/bmad-agent-ios-master` |
| AmplifyOS | aos-master | Diana | `/bmad-agent-aos-master` |
| GrowthOS | gos-master | Theo | `/bmad-agent-gos-master` |
| SoulOS | sos-master | Elior | `/bmad-agent-sos-master` |

Master agents provide conversational intake, full orchestration, and cross-session resume:

```mermaid
flowchart LR
    subgraph INTAKE["Project Intake (6 steps)"]
        I1["Discovery"] --> I2["Source<br/>Collection"]
        I2 --> I3["Categorization"]
        I3 --> I4["Digest<br/>Creation"]
        I4 --> I5["Gap<br/>Analysis"]
        I5 --> I6["Project<br/>Config"]
    end

    subgraph ORCH["Orchestration (4 steps)"]
        O1["Init"] --> O2["Execute<br/>Phase"]
        O2 --> O3["Checkpoint"]
        O3 -->|"continue"| O2
        O3 -->|"save & resume"| O4["Resume"]
        O4 --> O2
    end

    INTAKE --> ORCH

    style INTAKE fill:#1a3a2a,color:#fff
    style ORCH fill:#2a1a3a,color:#fff
```

### Quick Flow Pattern

Several modules offer a **Quick Flow** agent for fast single-deliverable execution:

| Module | Agent | For |
|--------|-------|-----|
| BuildOS | Barry | Quick spec + dev for simple tasks |
| InvestOS | Kai | Fast single-deliverable capital formation |
| AmplifyOS | Carlos | Fast single-deliverable content |
| GrowthOS | Dash | Fast single-deliverable growth content |
| SoulOS | Shalev | Rapid alignment checks |

---

## Intelligence & Learning System

### Episode Structure

Every significant workflow execution produces an Episode:

```yaml
episode_id: ep-{module}-{agent}-{date}-{seq}
context:
  module: ios
  workflow: create-raise-strategy
  agent: investment-strategist
  trigger: user_request
scores:
  aiq: 692    # Cognitive intelligence
  miq: 0      # Moral intelligence (0 if no moral dimensions)
  tis: 394    # True Intelligence Score
lessons_extracted: 3
```

### Lesson Types

| Type | Purpose | Storage |
|------|---------|---------|
| **Positive lessons** | "This pattern worked well" | `_memory/intuition/lessons/{module}/` |
| **Negative lessons** | "This approach failed because..." | `_memory/intuition/lessons/{module}/` |
| **Meta-lessons** | "Lessons about how to learn" | `_memory/intuition/meta-lessons/` |
| **Moral lessons** | "This moral reasoning was sound/flawed" | `_memory/intuition/moral-lessons/` |

### TIS Evolution

Current state: **TIS 394 (Developing)**, 3 lessons, Naive stage exited.

```mermaid
flowchart LR
    N["Nascent<br/>0-200"] --> D["<b>Developing</b><br/>201-400<br/><i>← Current: 394</i>"]
    D --> C["Competent<br/>401-600"]
    C --> P["Proficient<br/>601-750"]
    P --> A["Advanced<br/>751-850"]
    A --> W["Wise<br/>851-950"]
    W --> S["Sage<br/>951-1000"]

    style N fill:#1a1a2a,color:#888
    style D fill:#4a1a8a,color:#fff,stroke:#7c3aed,stroke-width:3px
    style C fill:#1a2a3a,color:#aaa
    style P fill:#1a2a3a,color:#aaa
    style A fill:#1a2a3a,color:#aaa
    style W fill:#1a2a3a,color:#aaa
    style S fill:#1a2a3a,color:#aaa
```

---

**Parent document:** [README.md](../README.md)
**Framework reference:** [BMAD-FRAMEWORK.md](../_bmad/BMAD-FRAMEWORK.md)
**QI deep-dive:** [QI-ARCHITECTURE.md](../_bmad/qi/QI-ARCHITECTURE.md)
