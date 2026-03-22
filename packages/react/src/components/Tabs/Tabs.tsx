import { forwardRef } from 'react';

/* ---------- Tabs ---------- */

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md';
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ size = 'md', className, children, ...rest }, ref) => {
    const classes = [
      'sds-tabs',
      size === 'sm' && 'sds-tabs--sm',
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

Tabs.displayName = 'Tabs';

/* ---------- TabList ---------- */

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-tab-list', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="tablist" {...rest}>
        {children}
      </div>
    );
  },
);

TabList.displayName = 'TabList';

/* ---------- Tab ---------- */

export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  badge?: React.ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ label, active, badge, className, ...rest }, ref) => {
    const classes = ['sds-tab', active && 'is-active', className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} role="tab" aria-selected={active} {...rest}>
        {label}
        {badge !== undefined && <span className="sds-tab-badge">{badge}</span>}
      </button>
    );
  },
);

Tab.displayName = 'Tab';

/* ---------- TabPanel ---------- */

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-tab-panel', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="tabpanel" {...rest}>
        {children}
      </div>
    );
  },
);

TabPanel.displayName = 'TabPanel';
