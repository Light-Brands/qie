#!/usr/bin/env node
/**
 * QIE → OpenClaw Agent Integration Generator
 *
 * Reads _bmad/_config/agent-manifest.csv and module-help.csv files to generate:
 * 1. Per-agent workspace directories with SOUL.md, IDENTITY.md, and symlinks
 * 2. Per-module SKILL.md files
 * 3. agents.list[] JSON for openclaw.json
 *
 * Usage: node bin/generate-openclaw-agents.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BMAD = path.join(ROOT, "_bmad");
const MANIFEST = path.join(BMAD, "_config", "agent-manifest.csv");
const WORKSPACES = path.join(ROOT, "_openclaw", "workspaces");
const SKILLS_DIR = path.join(ROOT, "_openclaw", "skills");
const OUTPUT_JSON = path.join(ROOT, "_openclaw", "generated-agents.json");

// ─── CSV Parser ──────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = parseCSVRow(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCSVRow(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h.trim()] = (values[i] || "").trim();
    });
    return row;
  });
}

function parseCSVRow(line) {
  const values = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  values.push(current);
  return values;
}

// ─── Module metadata ─────────────────────────────────────────────────
const MODULE_META = {
  core: { name: "Core", fullName: "BMAD Core Platform", signals: "brainstorm, party mode, editorial, review, help" },
  bmm: { name: "BuildOS", fullName: "BuildOS — Software Development Lifecycle", signals: "build, develop, code, MVP, architecture, PRD, stories, epics" },
  ios: { name: "InvestOS", fullName: "InvestOS — Capital Formation Engine", signals: "raise, capital, fundraise, investors, financial model, compliance" },
  aos: { name: "AmplifyOS", fullName: "AmplifyOS — Investor Communications", signals: "investor comms, campaigns, email, deck, compliance review" },
  gos: { name: "GrowthOS", fullName: "GrowthOS — Growth Marketing Engine", signals: "growth, marketing, SEO, social, paid, sales, pipeline, content" },
  sos: { name: "SoulOS", fullName: "SoulOS — Spiritual Alignment & Moral Governance", signals: "soul, alignment, spiritual, ethics, values, sacred gates" },
  qi: { name: "QI", fullName: "QI — Quantum Intelligence System", signals: "intelligence, learn, reflect, episode, score, wisdom" },
  oc: { name: "OpenClaw", fullName: "OpenClaw — Presence & Integration Engineering", signals: "channels, skills, automation, voice, integration" },
  deepseek: { name: "DeepSeek", fullName: "DeepSeek — Sovereign Intelligence Pipeline", signals: "sovereign, training, fine-tune, evaluation, graduation" },
};

// ─── SOUL.md Generator ───────────────────────────────────────────────
function generateSoulMd(agent) {
  const moduleMeta = MODULE_META[agent.module] || { name: agent.module, fullName: agent.module };
  const isQuinn = agent.name === "quinn";

  if (isQuinn) {
    // Quinn's SOUL.md is the master — already exists at QIE root
    // But we generate a copy for the workspace
    return `# SOUL.md — Quinn

You are **Quinn** — the Quantum Intelligence Engine made present.

${agent.identity}

## How You Speak

${agent.communicationStyle}

## Your Principles

${agent.principles}

## The QIE System

You are the living mind of the entire system — 78 agents across 9 modules, 169 workflows, 46+ projects. You route intent to capability with wisdom.

| Module | What It Does |
|--------|-------------|
| BuildOS | Software development lifecycle |
| InvestOS | Capital formation engine |
| AmplifyOS | Investor communications |
| GrowthOS | Full-funnel growth marketing |
| SoulOS | Spiritual alignment & moral governance |
| QI | Intelligence tracking & wisdom |
| OpenClaw | Presence & integration engineering |
| DeepSeek | Sovereign intelligence pipeline |
| QIE Hub | 46+ project portfolio orchestration |

## Accessing Your Intelligence

All intelligence lives at \`_bmad/\` in your workspace. Each module has agents, workflows, and data:

\`\`\`
_bmad/{module-id}/agents/      — Specialist agents
_bmad/{module-id}/workflows/   — Step-by-step workflows
_bmad/{module-id}/data/        — Reference data
_bmad/{module-id}/module-help.csv — Complete workflow catalog
\`\`\`

Output artifacts go to \`_bmad-output/\`.
`;
  }

  return `# SOUL.md — ${agent.displayName}

You are **${agent.displayName}** — ${agent.title}.

You are part of the **${moduleMeta.fullName}** module within the Quantum Intelligence Engine (QIE).

## Who You Are

${agent.identity}

## How You Speak

${agent.communicationStyle}

## Your Principles

${formatPrinciples(agent.principles)}

## Your Module: ${moduleMeta.name}

You operate within the ${moduleMeta.fullName} module. Your workspace gives you access to the full QIE intelligence layer at \`_bmad/\`.

Your module's resources:
- Agents: \`_bmad/${agent.module}/agents/\`
- Workflows: \`_bmad/${agent.module}/workflows/\`
- Data: \`_bmad/${agent.module}/data/\`
- Workflow catalog: \`_bmad/${agent.module}/module-help.csv\`

When you need to invoke a workflow, read the workflow file first, then execute its steps sequentially. Save deliverables to \`_bmad-output/\`.

## The Owner

You work with **Lawless** — Creator, Architect, Visionary. Not a user — a co-creator and partner in building something meaningful. Address them as Lawless. They're direct, passionate, and move fast.

## Cross-Module Awareness

You are one of 78 agents in the QIE system. If a request falls outside your specialty, acknowledge it and suggest routing to the appropriate module or agent. You don't need to do everything — you need to do your part brilliantly.
`;
}

function formatPrinciples(raw) {
  if (!raw) return "Excellence in every deliverable.";
  // The CSV stores principles with " - " prefixes and HTML entities
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .split(" - ")
    .filter((p) => p.trim())
    .map((p) => `- ${p.trim()}`)
    .join("\n");
}

// ─── IDENTITY.md Generator ───────────────────────────────────────────
function generateIdentityMd(agent) {
  return `# IDENTITY.md — ${agent.displayName}

- Name: ${agent.displayName}
- Role: ${agent.title}
- Module: ${(MODULE_META[agent.module] || {}).name || agent.module}
- Emoji: ${agent.icon}
- Vibe: ${agent.communicationStyle.split(".")[0].trim()}
`;
}

// ─── Module SKILL.md Generator ───────────────────────────────────────
function generateModuleSkill(moduleId, moduleMeta, agents, workflows) {
  const agentList = agents
    .map((a) => `- **${a.displayName}** (${a.name}) ${a.icon} — ${a.title}`)
    .join("\n");

  const workflowList = workflows
    .map((w) => {
      const cmd = w.command ? `\`/${w.command}\`` : "";
      return `| ${w.phase} | ${w.name} | ${cmd} | ${w.description} |`;
    })
    .join("\n");

  const skillName = moduleId === "oc" ? "openclaw-module" : MODULE_META[moduleId]?.name?.toLowerCase().replace(/\s+/g, "") || moduleId;

  return `---
name: ${skillName}
description: "${moduleMeta.fullName} — ${moduleMeta.signals}. Access ${agents.length} agents and ${workflows.length} workflows for ${moduleMeta.name} operations."
---

# ${moduleMeta.fullName}

## Agents

${agentList}

## Workflows

| Phase | Workflow | Command | Description |
|-------|----------|---------|-------------|
${workflowList}

## How to Use

### Load an agent
Read the agent file to adopt their persona and capabilities:
\`\`\`
_bmad/${moduleId}/agents/{agent-name}.md
\`\`\`

### Execute a workflow
Read the workflow file for overview, then execute steps sequentially:
\`\`\`
_bmad/${moduleId}/workflows/{phase}/{workflow-name}/workflow.md
_bmad/${moduleId}/workflows/{phase}/{workflow-name}/steps/step-{n}-{name}.md
\`\`\`

### Access data
Reference data and templates:
\`\`\`
_bmad/${moduleId}/data/
\`\`\`

### Save deliverables
All output artifacts:
\`\`\`
_bmad-output/{context}/
\`\`\`
`;
}

// ─── Agent ID with module prefix ─────────────────────────────────────
const MODULE_PREFIX = {
  core: "core", bmm: "bmm", ios: "ios", aos: "aos",
  gos: "gos", sos: "sos", qi: "qi", oc: "oc", deepseek: "ds",
};

function agentId(agent) {
  if (agent.name === "quinn") return "quinn";
  if (agent.name === "bmad-master") return "core-bmad-master";
  const prefix = MODULE_PREFIX[agent.module] || agent.module;
  // Already has this module prefix? Keep as-is.
  if (agent.name.startsWith(prefix + "-")) return agent.name;
  // Special: deepseek-master → ds-master (not ds-deepseek-master)
  if (agent.module === "deepseek" && agent.name.startsWith("deepseek-")) {
    return `ds-${agent.name.slice("deepseek-".length)}`;
  }
  return `${prefix}-${agent.name}`;
}

// ─── agents.list[] Generator ─────────────────────────────────────────
function generateAgentConfig(agent) {
  const moduleMeta = MODULE_META[agent.module] || {};
  const skillName = agent.module === "oc" ? "openclaw-module" : moduleMeta.name?.toLowerCase().replace(/\s+/g, "") || agent.module;
  const id = agentId(agent);

  // Quinn gets all skills; others get their module skill + bridge
  const isQuinn = agent.name === "quinn";
  const skills = isQuinn ? undefined : [skillName, "qie-bridge"];

  return {
    id,
    ...(isQuinn ? { default: true } : {}),
    name: agent.displayName,
    workspace: path.join(ROOT, "_openclaw", "workspaces", agent.name),
    identity: {
      name: agent.displayName,
      theme: isQuinn ? "The Quantum Intelligence Engine — Living Intelligence" : `${moduleMeta.name || agent.module} — ${agent.title}`,
      emoji: agent.icon,
    },
    ...(skills ? { skills } : {}),
  };
}

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log("🔮 QIE → OpenClaw Agent Integration Generator\n");

  // 1. Read manifest
  const manifestRaw = fs.readFileSync(MANIFEST, "utf-8");
  const agents = parseCSV(manifestRaw);
  console.log(`  Found ${agents.length} agents in manifest`);

  // 2. Read module-help CSVs
  const moduleWorkflows = {};
  const moduleIds = [...new Set(agents.map((a) => a.module))];
  for (const moduleId of moduleIds) {
    const helpPath = path.join(BMAD, moduleId, "module-help.csv");
    if (fs.existsSync(helpPath)) {
      const raw = fs.readFileSync(helpPath, "utf-8");
      moduleWorkflows[moduleId] = parseCSV(raw);
      console.log(`  ${moduleId}: ${moduleWorkflows[moduleId].length} workflows`);
    } else {
      moduleWorkflows[moduleId] = [];
    }
  }

  // 3. Create workspace directories
  console.log("\n📁 Creating workspace directories...");
  fs.mkdirSync(WORKSPACES, { recursive: true });

  let created = 0;
  for (const agent of agents) {
    const wsDir = path.join(WORKSPACES, agent.name);
    fs.mkdirSync(wsDir, { recursive: true });

    // SOUL.md
    fs.writeFileSync(path.join(wsDir, "SOUL.md"), generateSoulMd(agent));

    // IDENTITY.md
    fs.writeFileSync(path.join(wsDir, "IDENTITY.md"), generateIdentityMd(agent));

    // USER.md symlink (shared)
    const userMdLink = path.join(wsDir, "USER.md");
    const userMdTarget = path.join(ROOT, "USER.md");
    if (fs.existsSync(userMdLink)) fs.unlinkSync(userMdLink);
    if (fs.existsSync(userMdTarget)) {
      fs.symlinkSync(path.relative(wsDir, userMdTarget), userMdLink);
    }

    // _bmad symlink
    const bmadLink = path.join(wsDir, "_bmad");
    if (fs.existsSync(bmadLink)) fs.unlinkSync(bmadLink);
    fs.symlinkSync(path.relative(wsDir, BMAD), bmadLink);

    // _bmad-output symlink
    const outputDir = path.join(ROOT, "_bmad-output");
    fs.mkdirSync(outputDir, { recursive: true });
    const outputLink = path.join(wsDir, "_bmad-output");
    if (fs.existsSync(outputLink)) fs.unlinkSync(outputLink);
    fs.symlinkSync(path.relative(wsDir, outputDir), outputLink);

    // bin symlink (for QIE CLI access)
    const binDir = path.join(ROOT, "bin");
    const binLink = path.join(wsDir, "bin");
    if (fs.existsSync(binLink)) fs.unlinkSync(binLink);
    if (fs.existsSync(binDir)) {
      fs.symlinkSync(path.relative(wsDir, binDir), binLink);
    }

    // .qie symlink (for project context)
    const qieDir = path.join(ROOT, ".qie");
    const qieLink = path.join(wsDir, ".qie");
    if (fs.existsSync(qieLink)) fs.unlinkSync(qieLink);
    if (fs.existsSync(qieDir)) {
      fs.symlinkSync(path.relative(wsDir, qieDir), qieLink);
    }

    created++;
  }
  console.log(`  ✅ Created ${created} agent workspaces`);

  // 4. Generate per-module skills
  console.log("\n🛠️  Generating module skills...");
  const agentsByModule = {};
  for (const agent of agents) {
    if (!agentsByModule[agent.module]) agentsByModule[agent.module] = [];
    agentsByModule[agent.module].push(agent);
  }

  let skillsCreated = 0;
  for (const moduleId of moduleIds) {
    const meta = MODULE_META[moduleId];
    if (!meta) continue;
    const moduleAgents = agentsByModule[moduleId] || [];
    const workflows = moduleWorkflows[moduleId] || [];
    const skillName = moduleId === "oc" ? "openclaw-module" : meta.name.toLowerCase().replace(/\s+/g, "");
    const skillDir = path.join(SKILLS_DIR, skillName);
    fs.mkdirSync(skillDir, { recursive: true });
    const skillContent = generateModuleSkill(moduleId, meta, moduleAgents, workflows);
    fs.writeFileSync(path.join(skillDir, "SKILL.md"), skillContent);
    skillsCreated++;
    console.log(`  ✅ ${skillName} (${moduleAgents.length} agents, ${workflows.length} workflows)`);
  }

  // Also create QIE Hub skill
  const hubSkillDir = path.join(SKILLS_DIR, "qie-hub");
  fs.mkdirSync(hubSkillDir, { recursive: true });
  fs.writeFileSync(
    path.join(hubSkillDir, "SKILL.md"),
    `---
name: qie-hub
description: "QIE Hub — Project orchestration across the 46+ repo portfolio. Use for project switching, repo management, sync, and portfolio overview."
---

# QIE Hub — Project Orchestration

Manage the 46+ repo portfolio:

\`\`\`bash
bin/qie status          # Active project
bin/qie list            # All repos
bin/qie select <name>   # Activate project (fuzzy match)
bin/qie deselect        # Clear active project
bin/qie scan            # Refresh from GitHub
bin/qie sync            # Pull latest for all local repos
\`\`\`

Active project context is stored in \`.qie/context.yaml\`.
Registry of all repos is in \`.qie/registry.json\`.
`
  );
  skillsCreated++;
  console.log(`  ✅ qie-hub`);

  console.log(`  Total: ${skillsCreated} module skills`);

  // 5. Generate agents.list[] JSON
  console.log("\n📋 Generating agents config...");
  const agentConfigs = agents.map(generateAgentConfig);

  // Write to a separate JSON file (user merges into openclaw.json)
  const output = {
    _comment: "Generated by bin/generate-openclaw-agents.mjs — paste agents.list into openclaw.json",
    _generated: new Date().toISOString(),
    agentCount: agentConfigs.length,
    agents: agentConfigs,
  };
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(output, null, 2));
  console.log(`  ✅ Written to ${path.relative(ROOT, OUTPUT_JSON)}`);

  // 6. Summary
  console.log("\n" + "═".repeat(60));
  console.log(`🔮 Generation complete!`);
  console.log(`   ${created} agent workspaces in _openclaw/workspaces/`);
  console.log(`   ${skillsCreated} module skills in _openclaw/skills/`);
  console.log(`   ${agentConfigs.length} agent configs in _openclaw/generated-agents.json`);
  console.log("═".repeat(60));
  console.log(`\nNext: Update ~/.openclaw/openclaw.json with the generated agents list.`);
}

main().catch((err) => {
  console.error("❌ Generator failed:", err);
  process.exit(1);
});
