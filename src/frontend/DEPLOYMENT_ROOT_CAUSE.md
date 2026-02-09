# Deployment Root Cause Analysis

## Issue
Production deployment was failing during the build process.

## Root Cause
The frontend build was failing due to missing module dependencies:

1. **Missing `@/lib/utils` module**: The `Section.tsx` component imported `cn` utility from `@/lib/utils`, but this file did not exist in the codebase.

2. **Unresolved shadcn/ui imports**: Components were importing from `@/components/ui/button`, `@/components/ui/card`, and `@/components/ui/sonner`, which may not have been properly resolved or available in the production build environment.

3. **Path alias resolution**: The `@/*` path alias may not have been consistently resolved during the production build process.

## Solution Applied
To fix the deployment failure with minimal changes:

1. **Created `frontend/src/lib/utils.ts`**: Added the missing utility module with the `cn` function for className merging using `clsx` and `tailwind-merge`.

2. **Created local primitive components**: 
   - `frontend/src/components/primitives/Button.tsx`: Lightweight button component to replace `@/components/ui/button`
   - `frontend/src/components/primitives/Card.tsx`: Lightweight card primitives to replace `@/components/ui/card`

3. **Updated component imports**: Modified all components to use the new local primitives instead of potentially unresolved shadcn/ui imports:
   - `SiteHeader.tsx`
   - `HeroSection.tsx`
   - `ServicesSection.tsx`
   - `ProcessSection.tsx`
   - `ContactSection.tsx`

4. **Removed Toaster from App.tsx**: Removed the potentially problematic `@/components/ui/sonner` import since the marketing site doesn't require toast notifications.

## Verification
After these changes, the production build should complete successfully with:
- All module dependencies resolved
- No missing imports
- Consistent path resolution
- All static assets properly referenced
