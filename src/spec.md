# Specification

## Summary
**Goal:** Replace the site logo with the uploaded image and add a Twitter/X social link to the marketing site.

**Planned changes:**
- Create a new logo asset from the uploaded image and place it under `frontend/public/assets/generated`.
- Update all header and footer logo `<img>` references to use the new logo filename and ensure it renders crisply at the current displayed size (`h-8`) without layout shift.
- Add a visible Twitter/X link to `https://x.com/QuillworksMedia` in the site UI (e.g., header and/or footer) that opens in a new tab with `rel="noopener noreferrer"` and an accessible label.

**User-visible outcome:** The site shows the new logo in the header and footer, and visitors can click a Twitter/X link to open the QuillworksMedia profile in a new tab.
