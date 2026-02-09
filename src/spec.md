# Specification

## Summary
**Goal:** Fix the live deployment failure so the app deploys successfully and the live site passes a basic smoke test.

**Planned changes:**
- Reproduce the production deployment failure to capture the exact failing step and error output.
- Apply minimal code/config updates required to make the production deployment command/process complete successfully.
- Document the root cause and the specific fix in the PR/commit description.
- After successful deploy, smoke test the live site (homepage loads, header/footer render, Contact links for email, X/Twitter, and Instagram; no critical above-the-fold asset 404s).

**User-visible outcome:** The app is deployed live and the marketing page loads correctly with header/footer and Contact links present, without critical console-fatal errors or missing key static assets.
