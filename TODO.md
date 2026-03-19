# Final Refactor Plan - Kleench Mobile App

## Goals
1. All divs and shapes must fit in mobile screens (max-width constraints)
2. Keep background white (clean, minimal aesthetic)
3. Apply frontend_aesthetics principles for intentional, art-directed design

## Information Gathered

### Current State
- **Framework**: React + Vite + Tailwind CSS + Motion (Framer Motion)
- **Typography**: Agrandir (headers), Poppins (body) - already distinctive
- **Colors**: Trust Blue (#0077B6), Action Gold (#FFC300), Clean Slate (#FFFFFF)
- **Structure**: Mobile-first PWA with bottom navigation
- **Screens**: 20+ screens including Home, Wallet, Friends, Marketplace, Learning, Profile, Settings, etc.

### Key Files to Modify
1. `apps/web/src/styles/theme.css` - CSS variables and design tokens ✅
2. `apps/web/src/styles/index.css` - Global styles and utilities ✅
3. `apps/web/src/app/components/Layout.tsx` - Main layout wrapper ✅
4. All screen components need mobile viewport constraints

## Implementation Plan

### Phase 1: Theme & Global Styles ✅ COMPLETE
- [x] Update theme.css to ensure white background dominance
- [x] Add mobile viewport constraints (max-w-md mx-auto pattern)
- [x] Enhance glass morphism effects for depth
- [x] Add subtle grid patterns and noise textures

### Phase 2: Layout Component ✅ COMPLETE
- [x] Ensure Layout.tsx has proper mobile constraints
- [x] Fix top navigation and bottom nav positioning
- [x] Add ambient background effects

### Phase 3: Screen Components (Mobile Fit) 🔄 IN PROGRESS
- [x] Home.tsx - Fixed closing tag, mobile spacing (needs content review)
- [x] Wallet.tsx - Mobile constraints applied
- [x] Friends.tsx - Mobile layout applied
- [x] Marketplace.tsx - Mobile grid applied
- [x] Learning.tsx - Mobile cards applied
- [x] Profile.tsx - Mobile layout applied
- [x] Settings.tsx - Mobile spacing applied
- [x] Login.tsx - Mobile form applied
- [x] Signup.tsx - Mobile form applied
- [x] Onboarding.tsx - Mobile steps applied
- [ ] ProductDetail.tsx - Mobile layout
- [ ] LearningDetail.tsx - Mobile layout
- [ ] Videos.tsx - Video cards mobile fit
- [ ] ChangePin.tsx - Mobile keypad
- [ ] ChangePassword.tsx - Mobile form
- [ ] ProfileEdit.tsx - Edit form mobile fit
- [ ] MobileMoneySettings.tsx - Mobile money mobile fit

### Phase 4: Aesthetic Enhancements
- [ ] Add purposeful motion animations
- [ ] Enhance color contrast and visual hierarchy
- [ ] Add subtle background textures
- [ ] Ensure consistent spacing and typography

## Design Principles Applied

### Typography
- Keep Agrandir for headers (bold, expressive)
- Keep Poppins for body (humanist, readable)
- Ensure font sizes scale properly on mobile

### Color & Theme
- White background (#FFFFFF) as dominant
- Trust Blue (#0077B6) for primary actions
- Action Gold (#FFC300) for accents and CTAs
- High contrast for readability

### Motion & Interactions
- CSS-based animations via Motion library
- Purposeful transitions (page loads, interactions)
- Staggered reveals for lists and grids

### Backgrounds & Atmosphere
- White base with subtle depth
- Glass morphism for cards
- Subtle gradients and shadows
- No flat solid colors without intention

## Mobile Constraints
- All content max-width: 448px (max-w-md)
- Centered with mx-auto
- Proper padding (px-4 standard)
- Bottom padding for nav (pb-24+)
- Top padding for header (pt-20)
