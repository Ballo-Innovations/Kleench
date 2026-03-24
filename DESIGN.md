# Design System Specification

## 1. Overview & Creative North Star: "The Kinetic Ledger"

This design system is built to move beyond the utilitarian nature of financial interfaces, transforming data density into a high-end editorial experience. We define our Creative North Star as **"The Kinetic Ledger."** 

Unlike traditional fintech apps that rely on rigid grids and boxed-in containers, this system utilizes intentional asymmetry, layered depth, and a sophisticated typographic scale to guide the user’s eye. We treat the interface not as a software UI, but as a digital concierge—authoritative, energetic, and meticulously organized. By leveraging high-contrast color pops against a "Clean Slate" foundation, we create a sense of movement and momentum (Kinetic) backed by absolute structural stability (Ledger).

---

## 2. Colors & Tonal Architecture

Our palette balances the aggressive energy of high-action financial movement with the grounding calm of institutional security.

### Primary & Secondary Palette
- **Primary Action (Vibrant Energy):** Use `primary_container` (#ff8c00) for high-conversion elements. This is our "Heat" color.
- **Secondary Foundation (Trust):** Use `secondary` (#515d84) and `secondary_fixed_dim` (#b9c5f2) for navigation, security indicators, and secondary utility.

### The "No-Line" Rule
To achieve a premium editorial feel, **1px solid borders are prohibited for sectioning.** Structural boundaries must be defined solely through background color shifts or tonal transitions.
- **Surface Nesting:** Use the `surface-container` tiers to create depth. A card (`surface_container_lowest`) should sit on a section background (`surface_container_low`), which in turn sits on the global `background` (#f8f9fb).
- **The Glass & Gradient Rule:** For hero elements or primary CTAs, apply a subtle linear gradient (e.g., `primary` to `primary_container`) at a 135-degree angle. This adds "soul" and dimension that flat hex codes cannot replicate.
- **Signature Textures:** Floating action panels should utilize **Glassmorphism**: semi-transparent surface colors with a `20px` backdrop-blur to allow the vibrant primary colors to bleed through softly.

---

## 3. Typography: The Editorial Voice

We pair the brutalist, tech-forward geometry of **Space Grotesk** with the humanistic clarity of **Poppins** (mapped to our `plusJakartaSans` tokens) to create a sophisticated hierarchy.

| Level | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Space Grotesk | 3.5rem | Hero financial figures / Milestones |
| **Headline** | `headline-md` | Space Grotesk | 1.75rem | Section headers / Impactful statements |
| **Title** | `title-lg` | Poppins | 1.375rem | Card headings / List groupings |
| **Body** | `body-md` | Poppins | 0.875rem | Standard data / Descriptions |
| **Label** | `label-sm` | Poppins | 0.6875rem | Micro-copy / Overline metadata |

**Editorial Direction:** Use `display-lg` with tight letter-spacing (-0.02em) for account balances. Headlines should be "On-Surface" (#191c1e) to command attention, while body text should utilize "On-Surface-Variant" (#564334) for balanced readability.

---

## 4. Elevation & Depth: Tonal Layering

We reject the "drop-shadow everything" approach. Hierarchy is achieved through **The Layering Principle**.

- **Ambient Shadows:** When an element must float (e.g., a bottom navigation bar or a modal), use a high-diffusion shadow.
  - *Specs:* Blur: 40px, Y-Offset: 12px, Color: `on_surface` at 6% opacity. This mimics natural light rather than digital "glow."
- **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline_variant` token at **15% opacity**. Never use a 100% opaque border.
- **Glassmorphism & Depth:** To create a "Digital Curator" feel, use semi-transparent layers for the navigation header. This creates an integrated look where the content feels like it is sliding *under* a frosted lens rather than being cut off by a hard line.

---

## 5. Components

### Buttons & CTAs
- **Primary:** `primary_container` (#ff8c00) background with `on_primary_container` (#623200) text. Corner radius: `xl` (1.5rem / 24px) for a "pill" feel or `lg` (1rem / 16px) for standard buttons.
- **Secondary:** `secondary_container` background. Use for low-emphasis actions like "View History."
- **Tertiary:** No background, `primary` text. Use for "Cancel" or "Learn More."

### Cards & Data Lists
- **The Card Rule:** No borders. Use `surface_container_lowest` (#ffffff) on a `surface_container` (#edeef0) background. 
- **Separation:** Forbid the use of divider lines in lists. Instead, use the **Spacing Scale** `4` (1rem) or `6` (1.5rem) to separate list items. The white space *is* the divider.
- **Financial Data:** Balance amounts should use `Space Grotesk` (Medium weight) to feel "tech-forward" and precise.

### Input Fields
- **State:** `surface_container_highest` background with a `Ghost Border` focus state in `primary`. 
- **Corner Radius:** `md` (0.75rem / 12px) to maintain a friendly but professional stance.

### Signature Component: The "Kinetic Tab"
Instead of a standard tab bar, use a floating segmented control with a `backdrop-blur` and a `primary_container` sliding highlight indicator to represent active focus.

---

## 6. Do’s and Don’ts

### Do
- **Do** use asymmetrical spacing (e.g., more padding at the top of a card than the bottom) to create an editorial flow.
- **Do** use `primary_container` (#ff8c00) sparingly for "Success" or "Action" states to ensure it maintains its energetic punch.
- **Do** prioritize "Breathing Room." If a layout feels cramped, increase the spacing by two increments on the scale.

### Don’t
- **Don’t** use pure black (#000000) for text. Use `on_surface` (#191c1e) to maintain a premium, ink-on-paper feel.
- **Don’t** use "Standard" 1px dividers to separate financial line items. Use background tonal shifts or vertical white space.
- **Don’t** use sharp corners. The minimum corner radius for any container is `md` (0.75rem / 12px).