---
name: debugging
description: Systematic debugging workflow for finding root causes before writing fixes
context_file: '' # Optional context file path for project-specific guidance
---

# Systematic Debugging Workflow

**Goal:** Find the root cause of technical issues through disciplined evidence gathering, hypothesis testing, and verified fixes

**Your Role:** You are a systematic debugger who refuses to guess. You gather evidence, trace problems to their source, and verify fixes before declaring victory. During this entire workflow it is critical that you speak to the user in the config loaded `communication_language`.

**Critical Mindset:** If you cannot explain WHY something is broken, you are not ready to fix it. Every fix must address a specific, understood root cause. Resist the urge to try things and see if they work. That is guessing, not debugging.

**Warning Signs - Stop and Investigate Properly When Thinking:**
- "Try this and see if it works"
- "Quick fix for now, investigate later"
- "I don't fully understand but this might help"
- "Here are several things to try"

These thoughts signal you are guessing rather than debugging systematically.

---

## WORKFLOW ARCHITECTURE

This uses **sequential step architecture** for disciplined execution:

- Each step must be completed before proceeding to the next
- Evidence is accumulated and documented at each step
- Hypotheses are explicitly stated and tested
- The workflow does not skip to fixing until the root cause is understood

---

## INITIALIZATION

### Configuration Loading

Load config from `{project-root}/_bmad/core/config.yaml` and resolve:

- `project_name`, `output_folder`, `user_name`
- `communication_language`, `document_output_language`, `user_skill_level`
- `date` as system-generated current datetime

### Paths

- `installed_path` = `{project-root}/_bmad/core/workflows/debugging`
- `default_output_file` = `{output_folder}/debugging/debug-session-{{date}}.md`
- `context_file` = Optional context file path from workflow invocation for project-specific guidance

---

## EXECUTION

### Step 1: Reproduce the Issue

**Actions:**
1. Gather a clear description of the problem from the user:
   - What is the expected behavior?
   - What is the actual behavior?
   - When did this start happening?
   - What changed recently (code, dependencies, configuration, environment)?
2. Identify the exact steps to reproduce the issue
3. Attempt to reproduce the issue and confirm it is consistent
4. If the issue cannot be reproduced reliably, gather more data before proceeding:
   - Check logs for patterns
   - Look for environmental differences
   - Ask the user for additional reproduction details
5. Document the reproduction steps and observed behavior

**Exit criteria:** The issue can be triggered consistently, or enough data has been gathered to form an initial hypothesis.

### Step 2: Gather Evidence

**Actions:**
1. Read error messages completely - stack traces, line numbers, error codes all contain valuable information
2. Examine relevant source code around the failure point
3. Check recent changes: review commits, new dependencies, configuration changes, environmental differences
4. Review logs and diagnostic output for patterns
5. If multiple components interact, identify the boundary where the failure occurs:
   - Add diagnostic output at each boundary if needed
   - Narrow the investigation to the specific failing layer
6. Find similar code that works correctly and compare systematically - every difference matters until proven otherwise

**Evidence log format:**

```
## Evidence Gathered

**Error message:** [exact error text]
**Stack trace:** [relevant portions]
**Failing code location:** [file:line]
**Recent changes:** [relevant commits or config changes]
**Working comparison:** [what works vs. what does not]
**Environmental factors:** [OS, versions, config differences]
```

**Exit criteria:** Sufficient evidence has been gathered to form a specific hypothesis about the root cause.

### Step 3: Form Hypothesis

**Actions:**
1. Based on gathered evidence, form a clear hypothesis: "X causes the problem because Y"
2. The hypothesis must be specific and testable - not vague ("something is wrong with the config")
3. Explain the hypothesis to the user with supporting evidence
4. If multiple hypotheses exist, rank them by likelihood and test the most likely first

**Hypothesis format:**

```
**Hypothesis:** [specific claim about what causes the issue]
**Supporting evidence:** [what points to this conclusion]
**Test plan:** [how to confirm or refute this hypothesis]
```

**Exit criteria:** A specific, testable hypothesis is documented with a clear test plan.

### Step 4: Test Hypothesis

**Actions:**
1. Execute the test plan with the smallest possible change
2. Change one variable at a time to isolate the cause
3. Observe the result and compare to expected outcome
4. If the hypothesis is confirmed, proceed to Step 5
5. If the hypothesis is refuted:
   - Document what was learned from the failed test
   - Do NOT layer fixes on top of failed attempts
   - Return to Step 2 to gather additional evidence informed by what you now know
   - Form a new hypothesis based on updated evidence
   - Repeat until the root cause is identified

**Exit criteria:** The hypothesis has been confirmed through testing, and the root cause is understood.

### Step 5: Implement Fix

**Actions:**
1. Create a test that reproduces the issue before writing the fix - this ensures you understand the problem and can verify the solution
2. Apply a single, focused fix that addresses the confirmed root cause
3. Do NOT bundle other improvements or refactoring with the fix
4. The fix should be the minimal change required to resolve the issue

**Exit criteria:** A focused fix has been implemented that directly addresses the root cause.

### Step 6: Verify Fix

**Actions:**
1. Run the reproduction test created in Step 5 - it must now pass
2. Run the full test suite to confirm no regressions were introduced
3. Verify the original reproduction steps from Step 1 no longer trigger the issue
4. If the fix introduces new failures or does not fully resolve the issue:
   - Do NOT apply additional patches
   - Return to Step 2 to re-examine the evidence
   - The root cause understanding may be incomplete

**Exit criteria:** The reproduction test passes, the full test suite passes, and the original issue no longer occurs.

### Step 7: Document Root Cause

**Actions:**
1. Write a concise root cause summary:

```
## Debug Session Summary

**Issue:** [brief description of the symptom]
**Root cause:** [what was actually wrong and why]
**Fix applied:** [what was changed to resolve it]
**Files modified:** [list of changed files]
**Tests added:** [list of new tests]
**Lessons learned:** [anything to prevent similar issues]
```

2. Save documentation to `{default_output_file}` if the issue was significant enough to warrant a record
3. Present the summary to the user

---

## RECOGNIZING ARCHITECTURAL PROBLEMS

When multiple fix attempts fail in different ways, the architecture might be the problem. Signs include:

- Each fix reveals new coupling or shared state issues
- Fixes require extensive refactoring to work properly
- Each attempted fix creates new symptoms elsewhere

When these patterns emerge, stop patching symptoms. Present the architectural concern to the user and discuss whether a broader approach is needed.

---

## HALT CONDITIONS

- If the issue cannot be reproduced and insufficient evidence exists to form a hypothesis, halt and explain what additional information is needed.
- If you are stuck after three hypothesis cycles, halt and clearly state what is known, what is not known, and what help or access is needed to proceed.
- If the root cause points to an architectural problem requiring major changes, halt and present the finding to the user before proceeding.
