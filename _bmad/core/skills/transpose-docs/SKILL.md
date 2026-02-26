---
name: transpose-docs
description: Use when converting a complete document set from one business to another -- preserving all structure, formatting, and document types while replacing business substance with real target data. Handles concept mapping, data injection, and batch transposition across 100+ documents.
---

# Document Transposition

Take a proven document corpus from one business and produce structurally identical documents for a different business, using real data from the target.

## When to Use

- A business has a comprehensive document set (data room, strategy docs, segments, programs, market research) and you need the same documents for a different business
- Source and target businesses may be in completely different industries
- Target business already has some existing data (financials, team, raise terms, company overview) to pull from

## Core Pattern

### Phase 1: Concept Map (once per source-target pair)

Before transposing any documents, build a concept map. Read the source project's key docs (executive summary, company overview, data room) and the target project's existing docs. Produce a YAML mapping file:

```yaml
# concept-map.yaml -- stored in target project root
source_project: epic-center
target_project: endless
source_business: Medical-grade luxury wellness destination (Tulum, Mexico)
target_business: Industrial-scale plant biotech (Tulsa, Oklahoma)

entity_map:
  "Transformational Epicenter Holdings, LLC": "Endless Corporation"
  "Rancho Paraiso Oasis": "Endless Tulsa Facility"

people_map:
  "Nicholas Courchesne, Founder & CEO": "Travis Dahm, CEO"
  "Jason Sparks, Co-Founder & COO": "Valin Bodie, Head of Science"

concept_map:
  "medical-grade wellness": "industrial-scale tissue culture"
  "plant medicine protocols": "micropropagation protocols"
  "15 casitas scaling to 60": "40K plants/month scaling to 5M"
  "guest": "client"
  "treatment program": "production run"

financial_map:
  source_raise: "$5M seed"
  target_raise: "$75M Reg D 506(c)"
  source_revenue_y1: "$3.6M"
  target_revenue_latest: "$1.63M (2023)"

market_map:
  source_tam: "$1T+ wellness"
  target_tam: "$15.5T agriculture"

segment_map:
  "Medical Oversight": "Quality Assurance & Lab Protocols"
  "Plant Medicine": "Tissue Culture Operations"
  "Bio-Optimization": "Robotics & Automation"
  "Trauma Integration": "Genetic Research & CRISPR"
  "Hospitality": "Client Services & Fulfillment"
  "Digital Ecosystem": "Plant Health AI Platform"
  "Pre-Care": "Client Onboarding & Genetics Selection"
  "Post-Care": "Post-Delivery Support & Crop Monitoring"
```

The concept map is a living document. Update it as you discover new mappings during transposition.

### Phase 2: Transpose a Document

For each source document:

1. **Read the source** -- identify every structural element: heading hierarchy, tables (column count, row structure), lists, blockquotes, metadata blocks, navigation links, horizontal rules, ASCII diagrams, version footers

2. **Preserve structure exactly** -- the output document must have the same number of H1s, H2s, H3s, the same table shapes, the same list formats, the same separators. Structure is sacred.

3. **Replace substance using the concept map** -- every business reference transforms. Use the concept map for systematic replacements, then handle nuanced prose adaptation manually.

4. **Inject real target data** -- pull actual numbers, names, dates, and terms from the target project's existing documents. Search the target project for: financial statements, investor presentations, company overviews, data room docs, team bios, press releases, brand content. Use real data. Only use `[TODO: description of what's needed]` where no equivalent exists in the target project.

5. **Adapt tone** -- the source document's voice and energy should map to the target. A wellness brand's warmth becomes a biotech company's precision. A spiritual tagline becomes a scientific thesis. Match the target brand's existing voice from their docs.

### Phase 3: Verify

After transposing, check:
- Zero source business names, locations, or specific references remain
- Table structures match source (same columns, comparable row count)
- Heading hierarchy is identical
- All data points are either real target data or marked `[TODO]`
- Navigation links updated to target project structure
- Metadata blocks updated (document numbers, dates, classification, version, preparer)

## Batch Workflow

For large document sets (50+ docs):

1. Generate the concept map first using Phase 1
2. Map source directories to target directories (the directory structure should mirror)
3. Process documents in dependency order: foundational docs first (executive summary, company overview), then docs that reference them (data room, segments, programs)
4. Update the concept map as new mappings emerge
5. After each batch of 5-10 docs, review for consistency across the set

## Common Pitfalls

**Shallow find-and-replace** destroys meaning. "Medical oversight ensures guest safety" does not become "Quality assurance ensures client safety" -- it becomes "Quality assurance ensures genetic integrity and pathogen-free output." The concepts must transform semantically, not lexically.

**Inventing data** when real data exists. Always search the target project thoroughly before using a placeholder. The skill's value is in producing documents with real substance, not scaffolds.

**Breaking table structures.** Source tables often encode precise relationships (pricing tiers, market segments, financial projections). The target table must have equivalent precision even if the categories differ entirely.

**Ignoring the concept map.** Every transposition session should start by re-reading the concept map. Consistency across 100+ documents requires a single source of truth for how concepts translate.
