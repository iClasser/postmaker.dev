# Copilot PR Instructions for New Component Creation

When submitting a PR for a **new component**, please follow these rules:

## 1. Tab in `apps/web/app/page.tsx`
- Add a new tab for your component in `apps/web/app/page.tsx`.
- The tab should allow users to navigate to your new editor.

## 2. Editor in `apps/web/components`
- Implement the main editor logic and UI in a new file under `apps/web/components`.
- Name the file appropriately (e.g., `my-component-editor.tsx`).

### Important:
- Do **not** use other brand names in your editor component.
- All states, props, and logic should be relevant to postmaker.dev (see `x-editor.tsx` for example).

## 3. Preview in `packages/ui/src`
- Add a preview component for your new editor in `packages/ui/src`.
- Name the file appropriately (e.g., `my-component-preview.tsx`).

## Example Structure
```
apps/web/app/page.tsx         # Add a new tab for your component
apps/web/components/          # Add your editor here
packages/ui/src/              # Add your preview here
```

## Checklist for PR Review
- [ ] Tab added in `apps/web/app/page.tsx`
- [ ] Editor created in `apps/web/components`
- [ ] Preview created in `packages/ui/src`

- [ ] No other brand names used in editor component; states are relevant to postmaker.dev

---
**PRs that do not follow this structure may be rejected or require changes.**
