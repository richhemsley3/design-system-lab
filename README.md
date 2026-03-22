# Design System Labs

A design system providing tokens, CSS components, and framework-specific component libraries for building consistent application interfaces.

## Packages

| Package | Description | Install |
|---------|-------------|---------|
| [`@sds/tokens`](./packages/tokens) | Design tokens (CSS custom properties, JSON, TypeScript) | `npm i @sds/tokens` |
| [`@sds/css`](./packages/css) | Extracted component CSS with BEM class names | `npm i @sds/css` |
| [`@sds/react`](./packages/react) | React component library with TypeScript | `npm i @sds/react` |
| [`@sds/angular`](./packages/angular) | Angular component library with TypeScript | `npm i @sds/angular` |

## Quick Start

### React

```bash
npm install @sds/react @sds/css @sds/tokens
```

```tsx
import '@sds/tokens/css';
import '@sds/css';
import { Button, Card, Tag } from '@sds/react';

function App() {
  return (
    <Card>
      <Card.Header title="Dashboard" />
      <Card.Body>
        <Tag status="success">Active</Tag>
        <Button variant="primary" size="md">View Details</Button>
      </Card.Body>
    </Card>
  );
}
```

### Angular

```bash
npm install @sds/angular @sds/css @sds/tokens
```

```typescript
import { SdsButtonComponent, SdsCardComponent } from '@sds/angular';

@Component({
  standalone: true,
  imports: [SdsButtonComponent, SdsCardComponent],
  template: `
    <sds-card>
      <sds-card-header title="Dashboard" />
      <sds-card-body>
        <sds-button variant="primary" size="md">View Details</sds-button>
      </sds-card-body>
    </sds-card>
  `
})
export class DashboardComponent {}
```

Add token and component styles in `angular.json`:

```json
"styles": [
  "node_modules/@sds/tokens/css/index.css",
  "node_modules/@sds/css/dist/index.css"
]
```

### CSS Only

```bash
npm install @sds/css @sds/tokens
```

```css
@import '@sds/tokens/css';
@import '@sds/css';
```

```html
<button class="sds-btn sds-btn--primary sds-btn--md">Submit</button>
```

Import individual components for smaller bundles:

```css
@import '@sds/tokens/css';
@import '@sds/css/components/buttons';
@import '@sds/css/components/cards';
```

### Tokens Only

```bash
npm install @sds/tokens
```

```css
/* CSS custom properties */
@import '@sds/tokens/css';

.my-component {
  color: var(--sds-text-primary);
  padding: var(--sds-space-400);
  font-size: var(--sds-type-body);
}
```

```typescript
// TypeScript objects
import { colors, spacing, typography } from '@sds/tokens';

console.log(colors['sds-color-blue-750']); // '#013D5B'
console.log(spacing['sds-space-400']);      // '16px'
```

## Token System

The design system uses a three-layer token architecture:

1. **Primitive tokens** — Raw color, spacing, and type values (`--sds-color-blue-750`, `--sds-space-400`)
2. **Semantic tokens** — Mapped meanings (`--sds-bg-page`, `--sds-text-primary`, `--sds-interactive-primary`)
3. **Component tokens** — Component-specific values built from semantic tokens

Light and dark mode are supported via `prefers-color-scheme` media queries on semantic tokens.

## Font

The system uses **Proxima Nova** (300–800 weights). This is a licensed font — consumers must supply their own license. Font files are not included in the npm packages.

## Development

```bash
# Install all dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test
```

## Component Reference

Browse the full interactive component reference at the [Design System Lab](./index.html) demo site (run `npx serve` in the root directory).

## License

Proprietary. Internal use only.
