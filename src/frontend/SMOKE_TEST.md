# Post-Deployment Smoke Test Checklist

## Purpose
This checklist ensures the live marketing site is functioning correctly after deployment.

## Manual Verification Steps

### 1. Page Load
- [ ] Visit the live URL
- [ ] Page loads without blank screen
- [ ] No critical JavaScript errors in browser console
- [ ] Page renders within 3 seconds

### 2. Header Verification
- [ ] Header is visible at the top of the page
- [ ] Quillworks logo is displayed correctly
- [ ] Navigation menu is visible (desktop)
- [ ] Mobile hamburger menu works (mobile)
- [ ] "Get Started" CTA button is present and clickable

### 3. Footer Verification
- [ ] Footer is visible at the bottom of the page
- [ ] Footer contains Quillworks branding
- [ ] Footer navigation links are present
- [ ] Attribution link to caffeine.ai is present and working

### 4. Contact Section Links
- [ ] Contact section is visible on the page
- [ ] Email link (quillworksmedia@gmail.com) is present and clickable
- [ ] X/Twitter link (@QuillworksMedia) is present and opens in new tab
- [ ] Instagram link (@quillworks_media_) is present and opens in new tab
- [ ] All contact links have proper hover states

### 5. Static Assets
- [ ] Hero illustration image loads without 404 error
- [ ] Quillworks logo image loads without 404 error
- [ ] Icons set image loads without 404 error
- [ ] No missing asset requests in Network tab

### 6. Responsive Design
- [ ] Site is responsive on mobile (320px - 768px)
- [ ] Site is responsive on tablet (768px - 1024px)
- [ ] Site is responsive on desktop (1024px+)

### 7. Navigation & Interactions
- [ ] Smooth scroll to sections works
- [ ] All navigation links scroll to correct sections
- [ ] CTA buttons trigger correct actions
- [ ] Mobile menu opens and closes properly

## Automated Smoke Check

To run the automated smoke check, append `?smokeCheck=true` to the URL:
