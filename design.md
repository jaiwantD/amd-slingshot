# Design System Document: The Kinetic Glass Methodology

## 1. Overview & Creative North Star: "The Neon Observatory"
This design system is built to move beyond the static, boxy layouts of traditional e-commerce. Our Creative North Star is **The Neon Observatory**—a high-fidelity, immersive environment that feels like a futuristic laboratory. We achieve this through "The Layered Void": a strategy that uses extreme tonal depth, vibrant light-bleed, and glassmorphism to make hardware components feel like they are floating in a pressurized, dark-matter environment.

To break the "template" look, designers must embrace **Intentional Asymmetry**. Overlap product imagery across container boundaries. Use the high-contrast `display-lg` typography to bleed off the edge of the grid, signaling that the technology within is too powerful to be contained by a standard browser window.

---

## 2. Colors: The Thermal Spectrum
The palette is rooted in deep obsidian (`surface`) and energized by high-velocity thermal accents (`primary` and `secondary`).

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning. Structural boundaries must be defined solely through background shifts.
*   **Implementation:** Transition from `surface` (the base) to `surface-container-low` (a section) to define a change in content. Use vertical whitespace—not lines—to breathe life into the layout.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of glass plates. 
*   **Lowest Layer:** `surface_container_lowest` (#000000) for deep-space backgrounds.
*   **Mid Layer:** `surface` (#0e0e0e) for the primary canvas.
*   **Top Layer:** `surface_container_highest` (#262626) for active interaction areas.
*   **Nesting:** Place a `surface_container_high` card inside a `surface_container_low` section to create a soft, natural lift that mimics high-end interior lighting.

### The "Glass & Gradient" Rule
Floating UI elements (modals, navigation bars, hover cards) must use **Glassmorphism**.
*   **Formula:** `surface_variant` at 40% opacity + `backdrop-filter: blur(24px)`.
*   **Signature Textures:** For main CTAs and Hero sections, use a linear gradient: `primary` (#ff8e83) to `secondary` (#fd8b00) at a 135-degree angle. This "Thermal Bloom" provides a professional polish that flat fills cannot replicate.

---

## 3. Typography: Technical Authority
We pair the geometric precision of **Space Grotesk** with the utilitarian clarity of **Inter**.

*   **Display & Headlines (`spaceGrotesk`):** Used for product names and hero statements. The wide apertures and technical character of Space Grotesk communicate AI sophistication. 
    *   *Styling Tip:* Use `display-lg` with -2% letter spacing to create an "Editorial Tech" feel.
*   **Body & Labels (`inter`):** Used for specs and descriptions. Inter provides maximum readability against dark, translucent backgrounds.
*   **The Monospaced Accent:** While not in the primary scale, use a monospaced font (like JetBrains Mono) for technical specs or SKU numbers to reinforce the "Hardware" aspect of the brand.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are forbidden. We use "Ambient Occlusion" and light-based depth.

*   **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers. A `surface_container_lowest` element on a `surface_container_highest` background creates a "carved out" effect.
*   **Ambient Shadows:** For floating glass elements, use a shadow color derived from `on_surface` (White) at 4% opacity with a 64px blur. This mimics a soft glow rather than a heavy shadow.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` (#484847) at **15% opacity**. This creates a "specular highlight" on the edge of the glass rather than a physical line.

---

## 5. Components: Precision Machining

### Buttons
*   **Primary:** Gradient fill (`primary` to `secondary`). No border. `label-md` text in `on_primary_fixed` (Black) for maximum contrast.
*   **Secondary (Glass):** `surface_variant` at 20% opacity with a 10% `outline_variant` ghost border.
*   **States:** On hover, increase `backdrop-filter` blur and shift the gradient 15% toward `secondary`.

### Inputs & Text Fields
*   **Base:** `surface_container_highest` with a `sm` (0.125rem) corner radius.
*   **Focus State:** A 2px outer glow using `secondary` (#fd8b00). This vibrant focus is critical for accessibility in dark mode.

### Cards & Product Grids
*   **Forbid Divider Lines.** Use the Spacing Scale (64px or 80px) to separate product information.
*   **Interaction:** On hover, the card should transition from `surface_container_low` to `surface_container_high`.

### The "Spec-Sheet" Chip
*   A specialized component for hardware specs. Use `surface_variant` with `label-sm` typography. The corner radius must be `none` or `sm` to maintain a "machined" look.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins (e.g., 10% left, 15% right) to create editorial tension.
*   **Do** lean into the "Thermal Bloom" gradients for high-energy interactions.
*   **Do** ensure all text on glass backgrounds meets WCAG AA contrast ratios using the `on_surface` (White) token.

### Don't:
*   **Don't** use 100% opaque borders. They break the illusion of glass.
*   **Don't** use standard "Grey" for shadows. Use low-opacity whites or subtle red-tints from the `error_dim` token to mimic light refraction.
*   **Don't** use the `full` roundedness scale for anything other than utility chips; keep the hardware aesthetic "sharp" using the `DEFAULT` (0.25rem) and `sm` tokens.