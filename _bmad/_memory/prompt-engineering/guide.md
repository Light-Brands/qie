# Prompt Engineering Guide

Best practices for LLM-to-LLM communication. These guidelines apply when creating
prompts that LLMs write for other LLMs to consume: commands, workflows, agent prompts.
Not for human-to-LLM interaction.

---

## Document Design for LLM Consumption

This guide itself follows its own principles. Minimal markdown formatting because
decorative symbols waste tokens and add no semantic value for LLM comprehension. Minimal
anti-pattern examples because LLMs encode patterns from what they see regardless of
labels. Simple structure with headings for organization and plain text for instructions.

When you read "avoid X" in this document, understand that describing anti-patterns
violates the principle for teaching purposes. Minimize this in prompts you create.

---

## Key Principles

**Assume the executing model is smarter.** The model executing your prompt is likely more
capable than the model that created it. Trust its abilities rather than over-prescribing
implementation details.

**Front-load critical information.** LLMs give more weight to early content. Put the most
important context and instructions first.

**Be explicit.** LLMs cannot infer context the way humans do. Spell out relationships,
requirements, and expectations.

**Maintain consistency.** Use the same terminology throughout. Do not vary vocabulary for
style. "Component" in one place and "widget" in another confuses LLM parsing.

**Structure matters.** Clear boundaries (especially XML tags) help LLMs parse complex
prompts reliably.

**Examples teach patterns.** What you show is what the LLM will do. This is the primary
teaching mechanism.

**Clarity over brevity.** Never sacrifice unambiguous interpretation for token savings.
Every word that adds clarity is worth including.

**Explain motivation.** Tell the LLM why a constraint exists. It generalizes from
reasoning better than from bare rules.

**Descriptive over directive.** "Use this tool when modifying files" works better than
"CRITICAL: You MUST use this tool." Aggressive language can cause over-triggering.

**Positive framing.** "Write in flowing prose" is clearer than "Don't use markdown."
Positive instructions are unambiguous; negative ones require constructing then negating.

---

## Pattern Reinforcement Through Examples

LLMs learn from what you show them, not from what you tell them to avoid. This is the
most important principle for LLM-to-LLM communication.

### How LLMs Process Examples

1. **Pattern matching over labels.** LLMs reproduce structural patterns. Code structure
   creates strong activation. Text labels like "wrong" or "don't do this" are weak
   signals that do not override pattern encoding.

2. **Direct teaching through examples.** When writing command workflows or agent prompts,
   every example shown is a lesson the executing LLM will follow.

3. **Consistency is critical.** Inconsistent examples cause unpredictable behavior. The
   executing LLM cannot resolve ambiguity the way humans do.

4. **Attention weighting.** All tokens in the prompt receive attention. Structural
   patterns activate high attention regardless of surrounding text saying "avoid this."

### Writing Effective Instructions

For command workflows and agent prompts:

1. Flood with correct patterns: show 5+ examples of the standard approach
2. Never show anti-patterns: do not include "wrong" examples
3. Describe exceptions in prose: if there are edge cases, describe them in words, not code
4. Maintain pattern consistency: all examples should follow the same structure

### Example: Good Pattern Teaching

```xml
<task>
Update all API endpoints to use consistent error handling
</task>

<examples>
// Pattern to follow:
async function getUser(id) {
  try {
    const user = await db.users.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  } catch (error) {
    logger.error('Failed to get user', { id, error });
    throw error;
  }
}

async function updateUser(id, data) {
  try {
    const user = await db.users.update(id, data);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  } catch (error) {
    logger.error('Failed to update user', { id, error });
    throw error;
  }
}
</examples>

<instructions>
Apply this exact error handling pattern to all endpoints. If an endpoint doesn't
interact with the database, omit the NotFoundError check but keep the try-catch
structure and logging.
</instructions>
```

The mechanism: the executing LLM encodes ALL patterns shown regardless of labels.
"Don't do X" requires the LLM to first construct X, then negate it. Direct positive
examples create stronger, more reliable execution.

---

## Goals Over Process

Focus on clear outcomes rather than micro-managing steps. LLMs can figure out
implementation details.

The model executing your prompt is likely more advanced than the model that created it.
Trust the executing model's superior capabilities.

### The Over-Prescription Problem

Overly prescriptive prompts:
- Waste tokens on process details the executing LLM can determine
- Prevent the executing model from using its superior capabilities
- Create brittle workflows that break with slight context changes
- Force unnecessary decision trees that add complexity
- Reduce the LLM's ability to handle edge cases intelligently

### Goal-Focused Approach

State what success looks like, not how to achieve it. Set boundaries, not algorithms.

Goal-focused command:

```xml
<task>
Remove the 'I' prefix from all TypeScript interface names throughout the codebase,
updating all references. Ensure type checking still passes.
</task>
```

Goal-focused agent prompt:

```xml
<objective>
Update all dependencies to their latest compatible versions while ensuring all tests
continue to pass.
</objective>

<constraints>
- Don't update major versions that would break compatibility
- Keep the application functional throughout the process
</constraints>
```

### When Detailed Steps ARE Needed

Include specific steps only when:
- The order is critical and non-obvious
- Domain-specific requirements must be followed exactly
- You are establishing a specific pattern to be replicated
- The process itself is the goal

```xml
<task>
Implement our team's database migration protocol
</task>

<required-steps>
1. Create migration with timestamp prefix
2. Write both up() and down() methods
3. Test rollback before committing
4. Document breaking changes in MIGRATIONS.md
</required-steps>

<reason>
These steps are required by our deployment pipeline and cannot be skipped or reordered.
</reason>
```

---

## Structural Delimiters

Modern LLMs are trained to recognize XML-style tags, making them highly effective for
creating unambiguous boundaries that LLMs can reliably parse.

### When to Use XML Tags

- Multiple distinct sections that need clear separation
- When you need to reference specific parts later in the prompt
- Complex prompts with different types of content (context, task, examples, constraints)
- Creating reusable command workflows or agent prompts

```xml
<context>
Current database has 50M records across 12 tables
</context>

<task>
Optimize the query to run in under 2 seconds
</task>

<constraints>
Cannot modify indexes or table structure
</constraints>
```

### When to Skip XML Tags

- Single, straightforward instructions
- Simple one-paragraph prompts
- When the prompt has natural flow without needing boundaries

### Guidelines for XML Structure

- **Use semantic names, not numbers.** `<task-preparation>` not `<phase-1>`,
  `<create-pr>` not `<step-6>`. Numbered tags are brittle; reordering requires
  renumbering all tags and references. Semantic tags are self-documenting.
- Be consistent with tag names throughout your codebase
- Use semantically meaningful tag names that describe the content
- Tags should enhance clarity, not add complexity for its own sake
- LLMs parse these more literally than humans would

---

## Writing for LLM Consumption

LLMs parse more literally than humans. Ambiguity that humans resolve through context
will confuse LLMs.

### Key Differences from Human-Readable Prompts

**LLMs need explicit context.** Humans infer relationships and context. LLMs need
everything spelled out.

Good: "Update the webpack.config.js to enable source maps in development mode by
setting devtool: 'source-map'"

**Consistent terminology matters.** Use the same terms throughout. Do not vary
vocabulary for style.

Good: "Update the component... update the component... update the component..."

**Unambiguous references.** Be specific about what you are referring to.

Good: "After updating the UserProfile component, test the user authentication
functionality"

### Structure for LLM Parsing

Use clear section markers and put foundational information first:

1. Environment/context
2. Overall objective
3. Specific requirements
4. Constraints
5. Examples
6. Output format

This allows the LLM to build understanding progressively.

### Common Patterns for Reliability

For refactoring tasks, be explicit about preservation:

```xml
<task>
Refactor all class components to functional components with hooks
</task>

<preserve>
- All existing functionality
- Component prop interfaces
- Test coverage
</preserve>
```

For code generation, specify integration points:

```xml
<task>
Add user authentication to the application
</task>

<integration>
- Use existing Router from src/router/index.ts
- Store auth state in existing Redux store
- Follow existing API client patterns in src/api/
</integration>
```

For analysis tasks, define evaluation criteria:

```xml
<task>
Review the codebase for performance issues
</task>

<focus-areas>
- Unnecessary re-renders in React components
- N+1 query problems in API endpoints
- Large bundle sizes from imports
- Missing memoization opportunities
</focus-areas>
```

### Testing LLM-Readable Prompts

When you write a prompt file, consider:
- Can another LLM execute this without your implicit knowledge?
- Are all terms defined or demonstrated through examples?
- Is the success criteria clear and measurable?
- Would a different LLM interpret this the same way?

---

## Few-Shot Example Guidelines

When an LLM creates prompts with examples for another LLM to execute, pattern
consistency is critical.

### How Many Examples

- **0 examples:** Only for standard operations the LLM knows well (e.g., "format as JSON")
- **1-2 examples:** When you need specific format but pattern is simple
- **3-5 examples:** Optimal for teaching new patterns with enough variety
- **5+ examples:** When establishing complex patterns or handling many edge cases

### Critical Rule

All examples must follow identical structure. Inconsistent structure (first example
shows result summary, second shows before/after code, third shows a text rule) prevents
the LLM from learning a reliable pattern.

### Ordering Examples

1. Most common case first (anchors the pattern)
2. Variations next (shows how pattern adapts)
3. Edge cases last (only if necessary)
4. Never include counter-examples

### Placement in Prompt Files

```xml
<task>
Convert all arrow functions to regular functions
</task>

<rules>
Preserve all functionality and bindings
</rules>

<examples>
// Pattern demonstrations go here
// Each showing the exact transformation
</examples>

<apply-to>
All files in src/components/
</apply-to>
```

---

## Token Efficiency

Prioritize unambiguous interpretation over brevity. Clear communication between LLMs is
more important than token count.

### Good Optimizations

**Remove redundancy, keep precision.** Good: "Update the webpack.config.js file."

**Use consistent terminology.** Good: "Update the component, then update the module,
then update the element."

**Combine related instructions when logical.** Good: "Validate input: ensure it's a
non-null string."

### Compressions That Hurt LLM Comprehension

Avoid these even when they save tokens:
- Ambiguous pronouns ("it", "that", "this") without clear antecedents
- Omitting articles that clarify meaning ("the UserService" vs "UserService")
- Context-dependent abbreviations not defined in the prompt
- Removing qualifiers that specify scope ("all", "only", "except")

Every word that adds clarity is worth including. Compression should never introduce
ambiguity.

---

## Prompt Composability

Design prompts that can be combined and reused across different contexts.

### Modular Prompt Design

Create prompts that work as building blocks:

```xml
<prompt id="refactor-base">
  <context>
    Working in a TypeScript codebase with strict mode enabled
  </context>
  <preserve>
    All existing functionality and type contracts
  </preserve>
</prompt>

<prompt extends="refactor-base">
  <task>
    Convert Promise chains to async/await syntax
  </task>
  <constraints>
    Maintain error handling semantics
  </constraints>
</prompt>
```

### Referencing Other Prompts

Design prompts that build upon each other:

```xml
<workflow>
  <step name="analyze">
    <description>Identify all components using deprecated lifecycle methods</description>
    <output>List of components needing updates</output>
  </step>

  <step name="refactor" depends-on="analyze">
    <description>Update each identified component to use modern hooks</description>
    <input>List from analyze step</input>
  </step>

  <step name="verify" depends-on="refactor">
    <description>Run tests and ensure no regressions</description>
  </step>
</workflow>
```

### Parameterized Prompts

Create reusable templates with parameters:

```xml
<template name="add-feature">
  <parameters>
    <param name="feature-name" required="true"/>
    <param name="integration-points" required="true"/>
    <param name="test-requirements" default="unit and integration tests"/>
  </parameters>

  <task>
    Add {{feature-name}} to the application
  </task>

  <requirements>
    - Integrate with {{integration-points}}
    - Include {{test-requirements}}
    - Follow existing patterns in the codebase
  </requirements>
</template>
```

### Composition Patterns

**Sequential:** Tasks that must run in order.

```xml
<sequence>
  <do>Analyze current implementation</do>
  <then>Identify optimization opportunities</then>
  <then>Apply optimizations</then>
  <finally>Measure performance improvements</finally>
</sequence>
```

**Parallel:** Tasks that can run simultaneously.

```xml
<parallel>
  <task>Update component styles</task>
  <task>Update component tests</task>
  <task>Update component documentation</task>
</parallel>
```

**Conditional:** Tasks based on conditions.

```xml
<conditional>
  <if condition="uses TypeScript">
    <task>Update type definitions</task>
  </if>
  <else>
    <task>Add JSDoc comments</task>
  </else>
</conditional>
```

### Best Practices for Composable Prompts

1. Clear interfaces: define what each prompt expects and produces
2. Minimize dependencies: keep prompts loosely coupled
3. Consistent naming: use predictable names for reusable components
4. Documentation: include descriptions of when and how to use each prompt
5. Version compatibility: note which versions of tools/frameworks prompts work with

Design prompts like you would design functions: focused, reusable, and composable.

---

## Common Pitfalls

- Ambiguous instructions: "Update the code" vs "Update all React components to use hooks"
- Inconsistent terminology: switching between "component", "element", "widget"
- Showing anti-patterns: including "wrong" examples that the LLM will reproduce
- Over-prescriptive steps: micro-managing instead of stating clear goals
- Unclear references: using "it", "that", "this" without clear antecedents
- Missing context: assuming the LLM knows project-specific conventions
- Inconsistent examples: examples that do not follow the same pattern structure
