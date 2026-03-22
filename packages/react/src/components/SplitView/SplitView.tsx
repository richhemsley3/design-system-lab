import { forwardRef } from 'react';

/* ---------- SplitView ---------- */

export interface SplitViewProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  bordered?: boolean;
}

export const SplitView = forwardRef<HTMLDivElement, SplitViewProps>(
  ({ direction = 'horizontal', bordered, className, children, ...rest }, ref) => {
    const classes = [
      'sds-split',
      direction === 'vertical' && 'sds-split--vertical',
      bordered && 'sds-split--bordered',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

SplitView.displayName = 'SplitView';

/* ---------- SplitPane ---------- */

export interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
}

export const SplitPane = forwardRef<HTMLDivElement, SplitPaneProps>(
  ({ variant = 'primary', className, children, ...rest }, ref) => {
    const classes = [
      'sds-split__pane',
      `sds-split__pane--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

SplitPane.displayName = 'SplitPane';

/* ---------- SplitDivider ---------- */

export interface SplitDividerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SplitDivider = forwardRef<HTMLDivElement, SplitDividerProps>(
  ({ className, ...rest }, ref) => {
    const classes = ['sds-split__divider', className]
      .filter(Boolean)
      .join(' ');

    return <div ref={ref} className={classes} {...rest} />;
  },
);

SplitDivider.displayName = 'SplitDivider';
