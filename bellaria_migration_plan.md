The goal is to analyze the Bellaria website and implement its design system and components into the current Next.js project.

## Phase 1: Analysis & Token Extraction

- [ ] **Action**: Open `https://html.cwsthemes.com/bellaria/index.html` using the browser tool.
- [ ] **Analysis**: Inspect computed styles to extract:
  - **Colors**: Primary (Teal, Pink), Secondary (Cream/White), Text colors.
  - **Typography**: Font families (likely Merienda/Playfair for headers, Sans for body), sizes, weights.
  - **Spacing**: Global spacing scale used in sections.
  - **Shapes/Borders**: Scalloped edges, border-radius on cards/buttons.
  - **Shadows**: Drop shadows on headers and cards.
- [ ] **Output**: Create `design-system/tokens.md` listing all extracted values.

## Phase 2: Configuration Updates

- [ ] **Action**: Update `tailwind.config.ts`.
  - Add custom colors (`bellaria-teal`, `bellaria-pink`, etc.).
  - Add font families.
  - Add custom background images or patterns if necessary.
- [ ] **Action**: Update `app/globals.css` (or `app/layout.tsx`) to import correct Google Fonts if strictly needed (checked against extracted fonts).

## Phase 3: Component Generation

- [ ] **Action**: Create/Update UI Components in `components/ui/` and `components/bellaria/`:
  - **Button**: Primary (Teal/Pink), Outline, Shapes.
  - **Header**: Refine existing header to match exact dimensions and font weights.
  - **Hero**: Refine Hero section with correct overlays and dividers.
  - **SectionDivider**: Reusable component for the scalloped/wavy edges (SVG).
  - **Card**: Product/Service cards with specific hover effects (blobs, icons).
  - **Footer**: Match the dark footer design.

## Phase 4: Page Implementation

- [ ] **Action**: Rewrite `app/page.tsx` using the new Bellaria components.
- [ ] **Action**: Ensure all sections (Specialties, Processing, Portfolio, Testimonials) are present and match visually.

## Phase 5: Documentation & Cleanup

- [ ] **Action**: Create `design-system/README.md`.
- [ ] **Action**: Update `CHANGELOG.md`.
- [ ] **Action**: Remove unused CSS/Components.

## Phase 6: Server Fixes (Background)

- [ ] **Action**: Address the persistent `server/routes/demo.ts` build error by either fixing the import or fully excluding the server directory from the build if it's not part of the Next.js app (which seems to be the case as it's likely an Express server).
