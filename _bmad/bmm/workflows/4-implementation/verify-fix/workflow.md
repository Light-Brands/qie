---
name: verify-fix
description: Verify fixes work from user's perspective before claiming success with evidence-based confirmation across tests, UI, API, config, and build verification
module: bmm
phase: 4-implementation
---

# Verify Fix - Evidence-Based Fix Verification

## Purpose

Verify that a fix actually works before claiming success. Run tests, check live behavior, and confirm the change resolves the issue from the user's perspective. This workflow prevents false "I fixed it" claims that destroy trust. A fix is not fixed until you have seen it work.

## When to Use

- After implementing any fix, before telling the user it is done
- Within autotask, before the create-PR phase
- When asked "does it work?" or "is it fixed?"
- Any time you are tempted to say "I fixed it" without running something
- After deploying a fix to verify production behavior

## Prerequisites

- A fix has been implemented (code changes are in place)
- Relevant test suite, dev server, API endpoint, or build system is available
- Understanding of what changed and what behavior should be different

## Execution Steps

### Step 1: Identify What Changed

Determine what code was modified and what specific behavior should now be different. Establish the expected outcome before running any verification.

### Step 2: Select Verification Method

Match the verification approach to the type of change:

- **Tests exist**: Run the relevant test file or test suite that exercises the changed code paths.
- **UI changes**: Start the dev server and verify visually, or fetch the page and inspect the output. Use browser automation tools for visual verification if available.
- **API changes**: Hit the endpoint and check the response matches expected output.
- **Config changes**: Verify the configuration loads without error.
- **Build/compile changes**: Verify the build succeeds without errors affecting the changed files.

### Step 3: Run the Verification

Execute the selected verification method. Capture the output, including test results, response bodies, error messages, or build output.

### Step 4: Evaluate Results

Determine whether the verification succeeded or failed based on the evidence.

**On successful verification**, use confident language:

- "Verified: the login redirect now works correctly"
- "Fix confirmed: tests pass and the page loads"

Report what was tested, what command was run, the specific outcome (N tests passed, page loads, response correct), and evidence (URL, test output, response snippet).

**On failed verification**, use direct language:

- "Verification failed"
- "The fix is NOT confirmed"

Report what was run, what happened, the specific error message or unexpected behavior, and the next action (investigating X, trying Y, need more info).

### Step 5: Handle Blocked Verification

If verification cannot be run immediately:

- Document what verification is needed in the response
- Explain to the user what they should verify manually
- Be explicit that the fix is unverified pending these checks
- State "this should work but I cannot verify because X" to preserve epistemic honesty

Never claim the fix works without some form of verification.

### Step 6: Continue or Report

If verification fails, continue debugging rather than reporting success. Only report success when specific evidence supports it.

## Outputs

- Verification result with evidence (pass or fail)
- Command(s) run and their output
- Confident claim of success (if verified) or clear failure report with next steps (if not)
- Manual verification instructions (if automated verification is blocked)

## Completion Criteria

- At least one verification method has been executed against the changed code paths
- Results are reported with specific evidence, not vague claims
- If verification failed, debugging has continued (not just reported failure)
- Language used matches the evidence: hedged before verification, confident only after successful verification

## Language Standards

Before verification, use hedged language:

- "I believe this should fix..."
- "My hypothesis is..."
- "This appears to resolve..."

After successful verification, use confident language:

- "Verified: [specific behavior] now works correctly"
- "Fix confirmed: [evidence]"

Claim success only with specific evidence. Epistemic honesty preserves trust.
