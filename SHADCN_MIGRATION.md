# shadcn/ui migration plan

This document lists all pages and components that should be updated to use shadcn/ui primitives and Tailwind tokens. It also tracks progress.

## Scope

Pages to migrate:
- pages/_app.tsx — ensure global styles only
- pages/index.tsx — replace inline styles with shadcn + Tailwind (hero later)
- pages/login.tsx — convert form to Card, Input, Label, Button
- pages/signup.tsx — same as login
- pages/dashboard.tsx — convert stat cards and actions to Card, Button
- pages/notes.tsx — forms and modal via Input, Textarea, Checkbox, Select, Dialog, Button, Card, Badge
- pages/files.tsx — inputs/buttons to shadcn
- pages/emails.tsx — data list and actions to shadcn
- pages/ephemeral-email.tsx — same
- pages/inbox.tsx — list to Card and Button, Pagination with Button
- pages/sms.tsx — forms to shadcn
- pages/admin.tsx — layout is already shadcn but content to be aligned
- pages/users.tsx — table/list to shadcn
- pages/domains.tsx — forms to shadcn
- pages/f/[id].tsx — file viewer actions to shadcn

Shared components:
- Components/Layout.tsx — already updated to shadcn layout
- Components/Navbar.tsx — already using shadcn button/dropdown
- Components/Sidebar.tsx — already using shadcn button/scroll-area
- Components/ui/* — add Input, Label, Card, Textarea, Checkbox, Dialog, Badge, Separator as needed

## Status
- ✅ Core UI primitives added: Button, DropdownMenu, Avatar, ScrollArea, Input, Label, Card, Textarea, Checkbox, Badge, Dialog, Select (done)
- ✅ Tailwind content globs include `Components/**` (done)
- ✅ Login page migrated with UX enhancements (remember me, forgot password, social login placeholders)
- ✅ Signup page migrated with confirm password field
- ✅ Register page migrated with confirm password and terms checkbox
- ✅ Dashboard page migrated with stat cards and quick actions
- ✅ Notes page fully migrated with vault unlock, forms, and dialogs
- ✅ Emails page migrated with shadcn components
- ✅ Files page migrated with upload form and file cards
- ✅ Marketing pages (pricing, about, faq, contact, blog) created with landing navbar and tropical theme
- 🔄 Remaining app pages: inbox, sms, admin, users, domains, ephemeral-email, f/[id] (pending)

## Conventions
- Use `@/components/ui/*` alias (capital C for Windows compatibility)
- Marketing pages use inline landing navbar style with tropical gradient (linear-gradient(180deg, #38BDF8, #22D3EE, #06B6D4))
- App pages use dashboard Navbar component
- White text on gradient backgrounds for visibility (color: "white" or "rgba(255, 255, 255, 0.9)")
- Semi-transparent white cards on gradient (background: "rgba(255, 255, 255, 0.95)")
- Primary accent color: #0891B2 (cyan-600)
- Active nav state: rgba(255, 255, 255, 0.25) background

## Next steps
- Complete remaining app page migrations (inbox, sms, admin, users, domains, ephemeral-email, f/[id])
- Consider modernizing homepage hero section
- Test navigation and active states across all pages

## Recent updates (Dec 2024)
- ✅ Marketing pages refactored with landing navbar: Replaced dashboard Navbar component with inline landing page navbar style featuring tropical gradient background (rgba(6, 182, 212, 0.95)), active state highlighting, and sticky positioning
- ✅ Color theme unified: All marketing pages (pricing, about, faq, contact, blog) now use consistent tropical gradient, white text for headings/paragraphs, semi-transparent white cards, and cyan accent colors for visibility and brand consistency
- ✅ Navbar active state: Implemented router.pathname-based active highlighting with rgba(255, 255, 255, 0.25) background
- ✅ Build verified: All pages compile successfully with new design system
