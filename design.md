---
name: Senior Canine Care
colors:
  surface: '#faf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#faf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ef'
  surface-container: '#efeee9'
  surface-container-high: '#e9e8e3'
  surface-container-highest: '#e3e3de'
  on-surface: '#1b1c19'
  on-surface-variant: '#424843'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#727972'
  outline-variant: '#c2c8c1'
  surface-tint: '#476551'
  primary: '#45634f'
  on-primary: '#ffffff'
  primary-container: '#5d7c67'
  on-primary-container: '#f8fff7'
  inverse-primary: '#adcfb6'
  secondary: '#7c5730'
  on-secondary: '#ffffff'
  secondary-container: '#fdcb9b'
  on-secondary-container: '#79542d'
  tertiary: '#405e7f'
  on-tertiary: '#ffffff'
  tertiary-container: '#597799'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c9ebd1'
  primary-fixed-dim: '#adcfb6'
  on-primary-fixed: '#032111'
  on-primary-fixed-variant: '#2f4d3a'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#eebd8e'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#61401b'
  tertiary-fixed: '#d1e4ff'
  tertiary-fixed-dim: '#aac9ef'
  on-tertiary-fixed: '#001d35'
  on-tertiary-fixed-variant: '#2a4969'
  background: '#faf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e3e3de'
  warm-bg: '#EDEBE1'
  text-rich: '#1A1C1A'
  text-muted: '#6B7280'
  alert-amber: '#D97706'
  critical-red: '#B91C1C'
typography:
  hero-display:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: plusJakartaSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: plusJakartaSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: plusJakartaSans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  quote-text:
    fontFamily: plusJakartaSans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The design system is rooted in **Empathy, Professionalism, and Clarity**. It acknowledges the emotional weight of caring for an aging companion while providing the clinical authority required for medical guidance. The aesthetic is a blend of **Modern Minimalism and Tactile Warmth**, moving away from a purely clinical "veterinary" look toward a "well-being" lifestyle approach.

The visual direction uses generous whitespace to reduce cognitive load for users who may be in high-stress situations. It employs soft, rounded UI elements to evoke a sense of safety and comfort, balanced with precise, modern typography to establish scientific credibility. The interaction model is calm and deliberate, avoiding aggressive transitions in favor of gentle fades and stable layouts.

## Colors

The palette is anchored in organic, earthy tones that feel domestic and soothing. 

- **Primary (#5D7C67):** A muted sage green used for primary actions and growth-related themes (Health, Vitality). It represents the "care" aspect of the brand.
- **Secondary (#A67C52):** A soft leather brown, used for highlights and elements related to the home and physical comfort.
- **Tertiary (#547294):** A calm slate blue used sparingly to denote trust, scientific data, and professional resources.
- **Neutral (#F8F7F2):** A "paper" white base that is warmer than pure white, reducing eye strain and feeling more approachable.
- **Warm Background (#EDEBE1):** Used for subtle section differentiation and card surfaces to create depth without relying on heavy shadows.

Functional colors like **Alert Amber** and **Critical Red** are reserved strictly for medical warnings and urgent veterinary signs.

## Typography

This design system utilizes a dual-sans-serif pairing to distinguish between structural hierarchy and reading comfort.

- **Outfit (Headlines):** Chosen for its geometric clarity and modern "friendly-tech" feel. It is used for all major headings to provide a clean, professional architecture.
- **Plus Jakarta Sans (Body & UI):** A highly legible humanist sans-serif with soft terminals. It excels in long-form reading and interactive labels, maintaining the empathetic tone of the brand.

**Hierarchy Rules:**
- Use `hero-display` for main landing page titles only.
- `body-lg` is the default for introductory paragraphs to improve accessibility for a potentially older demographic of dog owners.
- Scientific terms or emphasis within body text should use **SemiBold** rather than Italics to ensure maximum legibility.

## Layout & Spacing

The layout utilizes a **12-column fixed grid** on desktop (centered) and a **fluid single-column** on mobile. 

- **Spacing Rhythm:** Based on an 8px base unit. Section gaps are generous (80px) to give the content room to "breathe," which helps prevent the information from feeling overwhelming.
- **The "Comfort" Margin:** Content containers use a maximum width of 1200px to keep line lengths readable.
- **Grouping:** Use `stack-md` for related elements (e.g., a heading and its subtext) and `stack-lg` for unrelated elements within the same section.

## Elevation & Depth

This design system uses a **Tonal Layering** approach combined with **Soft Ambient Shadows**. Depth is used to indicate interactivity and importance rather than literal physical height.

- **Level 0 (Base):** The `neutral` (#F8F7F2) surface.
- **Level 1 (Cards/Containers):** Uses the `warm-bg` (#EDEBE1) with no shadow or the `neutral` surface with a very soft, diffused shadow (Blur: 20px, Opacity: 4%, Color: Primary-Dark).
- **Level 2 (Interactive/Floating):** Used for hovered buttons and active calculators. Employs a slightly more pronounced shadow (Blur: 30px, Opacity: 8%).
- **Interactive States:** Buttons and interactive cards should use a subtle "lift" effect (moving -2px on the Y-axis) when hovered to provide tactile feedback.

## Shapes

The shape language is consistently **Rounded**, avoiding sharp corners to reinforce the themes of gentleness and care.

- **Standard Radius (0.5rem):** Applied to input fields, small buttons, and informational chips.
- **Large Radius (1rem):** Applied to content cards, calculators, and primary CTA buttons.
- **Extra Large Radius (1.5rem):** Used for large feature containers or "History" block quotes.
- **Icons:** Should follow a "soft-corner" or "rounded-cap" aesthetic to match the UI.

## Components

### Buttons
- **Primary:** Solid `primary_color` with white text. Rounded (1rem). High-contrast.
- **Secondary:** Outlined with `primary_color`, 1.5px border weight. 
- **Ghost:** Text-only in `primary_color` with a subtle background hover state in `warm-bg`.

### Cards
- **Informational:** `warm-bg` surface, no border, 1rem roundedness.
- **Interactive/Blog:** `neutral` surface, soft shadow, 1rem roundedness, with a subtle 1px border in a slightly darker neutral to define the edge.

### Inputs & Forms
- Inputs should have a background of `warm-bg` to distinguish them from the page surface. 
- Focus states must use a 2px `primary_color` border.
- Select menus and calculators should use `headline-md` for result numbers (e.g., "48 años") to ensure high visibility.

### Chips & Tags
- Used for categories (Mobility, Nutrition).
- Use a desaturated version of the category color with a dark text label. Pill-shaped (rounded-full).

### Lists & Checklists
- Use custom paw-print bullets for informational lists.
- Weekly checklists should use large, easy-to-tap 24px checkboxes for accessibility.
