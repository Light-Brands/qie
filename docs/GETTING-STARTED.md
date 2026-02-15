# Getting Started with the Quantum Intelligence Engine

**A guided tour through the system — read this first if you're new.**

---

## What You're Looking At

This repository contains the **Quantum Intelligence Engine (QIE)** — a multi-module AI platform that handles business operations from software development to capital formation to growth marketing, all unified by a self-improving intelligence layer and a spiritual alignment framework.

It's a lot. This guide helps you navigate it without getting lost.

---

## The 5-Minute Overview

### Three things to understand:

**1. The BMAD Framework is the engine.**
BMAD (Build-Measure-Amplify-Deliver) is an AI agent framework with 88 specialized agents organized into 7 modules. Each agent has a name, personality, and domain expertise. Agents execute workflows (multi-step guided processes) and tasks (single-shot operations).

**2. The commercial products sit on top.**
- **CapitalOS** is the product umbrella for capital formation services (3 products)
- **InvestOS** is the detailed documentation for the fundraising infrastructure product
- These are *what clients see*. The BMAD framework is *what powers them*.

**3. Quantum Intelligence makes it learn.**
QI is the layer that makes every agent interaction produce learning. It scores cognitive intelligence (AIQ), moral intelligence (MIQ), extracts lessons from experience, and evolves the system toward wisdom over time.

---

## Reading Order

### Path 1: Understanding the Business

If you want to understand what QIE does commercially:

| Step | Read | Time | What You'll Learn |
|------|------|------|-------------------|
| 1 | [Root README](../README.md) | 5 min | System overview, module inventory, navigation |
| 2 | [CapitalOS Overview](../CapitalOS/CAPITALOS_MASTER_OVERVIEW.md) | 15 min | The three commercial products, pricing, journey |
| 3 | [InvestOS Offering](../InvestOS/INVESTOS_COMPLETE_OFFERING.md) | 10 min | What the fundraising product delivers |
| 4 | [Pricing Guide](../Pricing/CLIENT_PRICING_GUIDE.md) | 5 min | Package tiers and pricing |

### Path 2: Understanding the Technology

If you want to understand how QIE works under the hood:

| Step | Read | Time | What You'll Learn |
|------|------|------|-------------------|
| 1 | [Root README](../README.md) | 5 min | Layered architecture, module map |
| 2 | [System Architecture](./SYSTEM-ARCHITECTURE.md) | 15 min | Full architecture deep-dive |
| 3 | [BMAD Framework](../_bmad/BMAD-FRAMEWORK.md) | 20 min | All 88 agents, 148 workflows, every command |
| 4 | [QI Architecture](../_bmad/qi/QI-ARCHITECTURE.md) | 10 min | How the learning and morality systems work |

### Path 3: Using the System

If you want to start using agents and workflows:

| Step | Action | What Happens |
|------|--------|-------------|
| 1 | Run `/bmad-help` | Get context-aware guidance on next steps |
| 2 | Run `/bmad-agent-ios-master` | Start the IOS Master (capital formation orchestrator) |
| 3 | Or run `/bmad-bmm-quick-spec` | Fast-track a software spec |
| 4 | Or run `/bmad-agent-sos-master` | Start SOS Master (spiritual alignment) |

---

## Key Concepts

### Modules

A **module** is a self-contained domain with its own agents, workflows, tasks, and configuration.

| Module | Code | Domain |
|--------|------|--------|
| Core | CORE | Foundation services (brainstorming, debugging, research) |
| Build & Ship | BMM | Software development lifecycle |
| Capital Formation | IOS | Fundraising infrastructure |
| Investor Communications | AOS | Regulated investor content |
| Growth Engine | GOS | Marketing, sales, analytics |
| Living Light | SOS | Spiritual alignment and morality |
| Quantum Intelligence | QI | Learning, scoring, moral reasoning |

### Agents

An **agent** is a specialized AI persona with a name, personality, and domain expertise. When you activate an agent, the AI adopts that persona's communication style, knowledge base, and operating principles.

Examples:
- **Alexander** (IOS Investment Strategist) — Capital formation, deal structure
- **Winston** (BMM Architect) — Technical architecture and system design
- **Elior** (SOS Master) — Living Light steward, alignment orchestrator
- **Mary** (BMM Analyst) — Business analysis, market research

### Workflows

A **workflow** is a multi-step guided process. Each step has detailed instructions that the active agent follows. Workflows are the primary way work gets done.

Example: IOS "Create Raise Strategy" workflow:
1. Gather client information
2. Analyze market conditions
3. Determine optimal raise structure
4. Draft strategy document
5. Review and refine

### Tasks

A **task** is a single-shot operation — simpler than a workflow. Tasks handle focused operations like "check document completeness" or "validate financial model."

### The Help System

`/bmad-help` is your navigation compass. It reads the current project state and tells you what workflow to run next. You can also ask it specific questions:

```
/bmad-help where should I start with a capital raise?
/bmad-help I need to build a landing page
/bmad-help how do I run a code review?
```

---

## Directory Map

```
.
├── README.md              ← Start here: system overview
├── docs/
│   ├── GETTING-STARTED.md ← You are here
│   └── SYSTEM-ARCHITECTURE.md
│
├── CapitalOS/             ← Commercial product strategy (what clients see)
├── InvestOS/              ← Fundraising product details
├── Pricing/               ← Pricing structures
├── Compliance/            ← Regulatory documentation
├── Archive/               ← Superseded documents
│
├── _bmad/                 ← THE ENGINE (where the magic lives)
│   ├── BMAD-FRAMEWORK.md  ← Complete framework reference
│   ├── core/              ← Foundation services
│   ├── bmm/               ← Software development
│   ├── ios/               ← Capital formation
│   ├── aos/               ← Investor communications
│   ├── gos/               ← Growth operations
│   ├── sos/               ← Spiritual alignment
│   ├── qi/                ← Quantum intelligence
│   ├── _config/           ← Manifests & routing
│   └── _memory/           ← Persistent memory & standards
│
└── _bmad-output/          ← Generated artifacts
```

### What lives where

| I want to... | Look in |
|-------------|---------|
| Understand the business offering | `CapitalOS/`, `InvestOS/`, `Pricing/` |
| Understand the AI framework | `_bmad/BMAD-FRAMEWORK.md` |
| See all available agents | `_bmad/_config/agent-manifest.csv` |
| See all available workflows | `_bmad/_config/workflow-manifest.csv` |
| Understand the intelligence system | `_bmad/qi/QI-ARCHITECTURE.md` |
| Read the spiritual doctrine | `_bmad/sos/doctrine/` |
| See coding standards | `_bmad/_memory/coding-standards/` |
| Find generated output | `_bmad-output/` |
| Check regulatory compliance | `Compliance/` |

---

## The Commercial Products in Context

### CapitalOS is the brand, IOS is the engine

```
CapitalOS (Brand)
├── Capital Clarity ($10K)      → Uses IOS Phase 1 (Discovery)
├── Capital Investment ($75K+)  → Uses IOS Phases 1-5 (Full Raise)
└── Capital Deployment ($100K+) → Uses GOS + IOS post-raise workflows
```

### InvestOS is the IOS module's documentation

InvestOS was the original name for the fundraising product. It now lives as the detailed documentation layer for the IOS module:

| InvestOS Document | Maps To |
|------------------|---------|
| INVESTOS_COMPLETE_OFFERING.md | What Capital Investment delivers |
| INVESTOS_STRATEGIC_ARCHITECTURE.md | How IOS technically works |
| INVESTOS_BRAND_GUIDELINES.md | Brand voice for investor-facing materials |
| InvestOS_Project_Plan.md | Delivery timeline and milestones |
| INVESTOS_WEBSITE_PLAN.md | Website plan for the investor platform |

---

## Next Steps

After reading this guide:

1. **Read the [Root README](../README.md)** if you haven't — it has the complete module inventory and navigation tables
2. **Pick your path** from the reading order above
3. **Use `/bmad-help`** to get context-aware guidance on what to do next
4. **Explore the [BMAD Framework reference](../_bmad/BMAD-FRAMEWORK.md)** for the full agent and workflow catalog

---

**Parent document:** [README.md](../README.md)
