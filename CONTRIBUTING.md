# Contributing to Design System Labs

## Development Setup

```bash
git clone <repo-url>
cd design-system-labs
npm install
npm run build
```

## Repository Structure

```
packages/
  tokens/     @sds/tokens — Design tokens (CSS, JSON, TypeScript)
  css/        @sds/css — Extracted component stylesheets
  react/      @sds/react — React component library
  angular/    @sds/angular — Angular component library

components/   HTML demo pages (interactive reference site)
data-viz/     Data visualization demo pages
tokens/       Source token CSS files
shared/       Shared demo site resources (nav, chart styles)
docs/         Foundation documentation pages
```

## Adding a New Component

### 1. Define CSS

Create `packages/css/src/components/{component-name}.css` with `.sds-{component}` prefixed classes. Follow BEM naming:

```css
/* Block */
.sds-alert { }

/* Element */
.sds-alert__icon { }

/* Modifier */
.sds-alert--warning { }
```

Add the import to `packages/css/src/index.css`.

### 2. Build the React Component

Create `packages/react/src/components/{ComponentName}/`:

```
ComponentName/
  ComponentName.tsx       # Implementation
  ComponentName.test.tsx  # Tests
  index.ts                # Re-export
```

Component conventions:
- Use `forwardRef` for DOM ref access
- Accept `className` prop and merge with internal classes
- Spread remaining HTML attributes onto the root element
- Use the `@sds/css` class names — do not duplicate styles in JS
- Export from `packages/react/src/index.ts`

```tsx
import { forwardRef } from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'warning' | 'error' | 'success';
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', dismissible, onDismiss, className, children, ...props }, ref) => {
    const classes = [
      'sds-alert',
      `sds-alert--${variant}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="alert" {...props}>
        {children}
        {dismissible && (
          <button className="sds-alert__dismiss" onClick={onDismiss} aria-label="Dismiss">
            ×
          </button>
        )}
      </div>
    );
  }
);
```

### 3. Build the Angular Component

Create `packages/angular/src/lib/{component-name}/`:

```
component-name/
  component-name.component.ts
  component-name.component.spec.ts
```

Use standalone components with host class bindings:

```typescript
@Component({
  selector: 'sds-alert',
  standalone: true,
  host: {
    'class': 'sds-alert',
    '[class]': 'variantClass',
    'role': 'alert',
  },
  template: `
    <ng-content />
    @if (dismissible) {
      <button class="sds-alert__dismiss" (click)="dismissed.emit()" aria-label="Dismiss">×</button>
    }
  `,
})
export class SdsAlertComponent {
  @Input() variant: 'info' | 'warning' | 'error' | 'success' = 'info';
  @Input() dismissible = false;
  @Output() dismissed = new EventEmitter<void>();

  get variantClass() { return `sds-alert--${this.variant}`; }
}
```

### 4. Add a Demo Page

Create `components/{component-name}.html` with interactive examples showing all variants, sizes, and states.

### 5. Update the Index

Add the component card to `index.html` in the appropriate section (alphabetical order within each section).

## Testing

```bash
# All packages
npm test

# React only
cd packages/react && npx vitest run

# Angular only
cd packages/angular && npm test
```

## Code Style

- **CSS**: BEM naming with `.sds-` prefix. Use token variables exclusively — no hardcoded colors, spacing, or font values.
- **TypeScript**: Strict mode. All props/inputs typed. No `any`.
- **Components**: Keep components thin — they apply CSS classes based on props, they don't implement visual logic.

## Versioning

We use semantic versioning. When making changes:
- **Patch** (0.1.x): Bug fixes, typo corrections
- **Minor** (0.x.0): New components, new variants, non-breaking additions
- **Major** (x.0.0): Breaking prop/API changes, removed components, token renames

## Pull Request Process

1. Create a feature branch from `main`
2. Make changes following the conventions above
3. Ensure `npm run build` and `npm test` pass
4. Open a PR with a clear description of the change
5. Get at least one review before merging
