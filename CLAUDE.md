# Design System Lab

## Overview
This is the **default design system** for all future projects. It provides tokens, patterns, and components for building consistent application interfaces.

## Project Structure
```
design-system-labs/
├── index.html                    # Design system home / component index
├── tokens/
│   ├── colors.css                # CSS custom properties (option + semantic tokens)
│   ├── spacing.css               # Space scale tokens (--sds-space-*)
│   ├── typography.css             # Typography tokens (Proxima Nova, type scale)
│   ├── colors.json               # JSON format color tokens
│   └── semantic-colors.json      # Semantic token mappings
├── shared/
│   ├── nav.js                    # Shared sidebar navigation
│   └── chart.css                 # Shared chart/data-viz styles
├── components/
│   ├── header.html               # Full-width header with logo, help, user profile
│   ├── buttons.html              # Button variants (primary, secondary, tertiary, danger)
│   ├── cards.html                # Composable content containers
│   ├── tabs.html                 # Horizontal tab bars
│   ├── tags.html                 # Status tags and badges
│   ├── side-navigation.html      # Animated sidebar with collapse/expand
│   └── tables.html               # Data tables (static, sortable, full-featured)
├── data-viz/
│   ├── bar-chart.html            # Bar chart variants
│   ├── line-chart.html           # Line chart variants
│   ├── area-chart.html           # Area chart variants
│   ├── donut-chart.html          # Donut chart variants
│   ├── waterfall-chart.html      # Waterfall/bridge charts
│   └── histogram.html            # Histogram/distribution charts
├── fonts/
│   ├── ProximaNova-Light.otf     # Proxima Nova Light (300)
│   ├── ProximaNova-Reg.otf       # Proxima Nova Regular (400)
│   ├── ProximaNova-Sbold.otf     # Proxima Nova Semibold (600)
│   ├── ProximaNova-Bold.otf      # Proxima Nova Bold (700)
│   └── ProximaNova-Xbold.otf     # Proxima Nova Extrabold (800)
├── docs/
│   ├── color-palette.html        # Color palette documentation
│   ├── space-scale.html          # Space scale documentation
│   ├── type-scale.html           # Type scale documentation
│   └── color-sampler.html        # Pixel color sampling tool
└── .claude/
    └── launch.json               # Preview server config (port 8091)
```

## Token System
- **Color option tokens**: Raw color values (warm-gray, cool-gray, blue, red, green, yellow, purple, brand)
- **Color semantic tokens**: Mapped meanings (bg, text, border, interactive, nav, status)
- **Space tokens**: Pixel-based spacing scale (`--sds-space-*`) for padding, margin, and gap
- **Type tokens**: Proxima Nova type scale with semantic size, weight, line height, and tracking tokens (`--sds-type-*`, `--sds-weight-*`, `--sds-leading-*`, `--sds-tracking-*`)
- **Light mode**: Warm grays as neutral palette
- **Dark mode**: Cool grays replace warm grays via `prefers-color-scheme: dark`

## Space Scale
| Token | Value | Typical Usage |
|-------|-------|---------------|
| `--sds-space-0` | 0px | Reset spacing |
| `--sds-space-050` | 2px | Hairline padding, code badge inset |
| `--sds-space-100` | 4px | Tight inline padding |
| `--sds-space-150` | 6px | Small gaps |
| `--sds-space-200` | 8px | Icon-to-label gaps, compact padding |
| `--sds-space-250` | 10px | Nav link gaps |
| `--sds-space-300` | 12px | Nav sidebar padding, grid gaps |
| `--sds-space-400` | 16px | Standard component padding |
| `--sds-space-500` | 20px | Chart header margins |
| `--sds-space-600` | 24px | Chart container padding, section spacing |
| `--sds-space-800` | 32px | Demo block padding, section margins |
| `--sds-space-1000` | 40px | Page horizontal padding |
| `--sds-space-1200` | 48px | Page top padding |
| `--sds-space-1600` | 64px | Large page vertical padding |

## Key Semantic Tokens
| Token | Light Value | Usage |
|-------|-------------|-------|
| `--sds-bg-page` | white | Page background |
| `--sds-bg-surface` | warm-gray-025 | Surface/card backgrounds |
| `--sds-text-primary` | warm-gray-900 | Primary text |
| `--sds-text-secondary` | warm-gray-650 | Secondary text |
| `--sds-interactive-primary` | blue-750 (#013D5B) | Buttons, links, active states |
| `--sds-nav-sidebar-bg` | warm-gray-025 | Sidebar background |
| `--sds-nav-item-active-bg` | blue-100 (#D9EBED) | Active nav item background |
| `--sds-nav-item-active-text` | blue-750 (#013D5B) | Active nav item text |
| `--sds-border-default` | warm-gray-150 | Default borders |

## Type Scale
| Token | Value | Usage |
|-------|-------|-------|
| `--sds-type-display` | 28px | Page titles, hero headings |
| `--sds-type-heading` | 22px | Section headings (h2) |
| `--sds-type-subheading` | 16px | Subsection headings (h3) |
| `--sds-type-title` | 15px | Card titles, large UI labels |
| `--sds-type-body` | 14px | Primary body text |
| `--sds-type-label` | 13px | Secondary text, nav, table cells |
| `--sds-type-caption` | 12px | Code, chart labels, small UI |
| `--sds-type-overline` | 11px | Captions, demo labels, overlines |

| Token | Value |
|-------|-------|
| `--sds-weight-light` | 300 |
| `--sds-weight-regular` | 400 |
| `--sds-weight-semibold` | 600 |
| `--sds-weight-bold` | 700 |
| `--sds-weight-extrabold` | 800 |

| Token | Value | Usage |
|-------|-------|-------|
| `--sds-leading-tight` | 1.2 | Display, headings |
| `--sds-leading-snug` | 1.35 | Subheadings, UI labels |
| `--sds-leading-normal` | 1.5 | Body text |
| `--sds-leading-relaxed` | 1.6 | Long-form content |

| Token | Value | Usage |
|-------|-------|-------|
| `--sds-tracking-tight` | -0.01em | Display, large headings |
| `--sds-tracking-normal` | 0em | Body text |
| `--sds-tracking-wide` | 0.5px | Uppercase labels, overlines |

## Design Conventions
- **Font stack**: `'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (`--sds-font-sans`)
- **Border radius**: 8px (components), 6px (small elements), 12px (cards/shells)
- **Transition easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard) for layout animations
- **Hover backgrounds**: warm-gray-050 (#F4F1EB) consistently across all interactive elements
- **Active/selected**: Light blue background (blue-100) + dark navy text (blue-750) — never solid dark backgrounds with white text

## Using in New Projects
1. Copy or link `tokens/colors.css`, `tokens/spacing.css`, and `tokens/typography.css` into the project
2. Reference color tokens via `var(--sds-color-*)` or `var(--sds-bg-*)`, `var(--sds-text-*)`, etc.
3. Reference space tokens via `var(--sds-space-*)` for padding, margin, and gap
4. Reference type tokens via `var(--sds-type-*)`, `var(--sds-weight-*)`, `var(--sds-leading-*)`, `var(--sds-tracking-*)`
5. Follow component patterns in `components/` for consistent UI
