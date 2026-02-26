You must load and follow the transposition skill at `_bmad/core/skills/transpose-docs/SKILL.md`.

## Context

This command transposes documents from a source business project to a target business project, preserving all document structure while replacing business substance with real target data.

## Arguments

The user may provide:
- A specific source document path to transpose
- A directory to batch-transpose
- "concept-map" to generate or update the concept map
- No arguments (Quinn will ask what to transpose)

## Execution Flow

### If no concept map exists for this source-target pair:

1. Check if `{target_project_root}/concept-map.yaml` exists
2. If not, generate one by reading key documents from both source and target projects:
   - Source: executive summary, company overview, data room docs, segments, programs
   - Target: all existing docs (company overview, investor presentation, data room, press, brand content)
3. Present the concept map to the user for review before proceeding
4. Save it to `{target_project_root}/concept-map.yaml`

### For single document transposition:

1. Load the concept map
2. Read the source document
3. Read all relevant target project docs to find real data for injection
4. Transpose following the SKILL.md methodology (preserve structure, replace substance, inject real data, adapt tone)
5. Write the output to the equivalent path in the target project
6. Report: what was transposed, what real data was used, what TODOs remain

### For batch transposition:

1. Load the concept map
2. List all documents in the source directory
3. Suggest a processing order (foundational docs first)
4. Confirm with user
5. Process each document, updating the concept map as new mappings emerge
6. After each batch of 5-10, summarize progress and any new concept mappings discovered

## Active Project Awareness

Check `.qie/context.yaml` for the active project. If an active project is set, that is the target. The source project must be specified or inferred from context.

## Quality Gate

Before marking any document as complete:
- Zero source business references remain (names, locations, specific metrics)
- Structure matches source exactly (heading count, table shapes, list formats)
- All data is either real target data or marked `[TODO: description]`
- Tone matches the target business voice
