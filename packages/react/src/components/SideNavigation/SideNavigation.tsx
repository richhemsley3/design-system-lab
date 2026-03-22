import { forwardRef } from 'react';

/* ---------- SideNavigation ---------- */

export interface SideNavigationProps
  extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

export const SideNavigation = forwardRef<HTMLElement, SideNavigationProps>(
  ({ collapsed, className, children, ...rest }, ref) => {
    const classes = [
      'sds-sidenav',
      collapsed && 'is-collapsed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <nav ref={ref} className={classes} {...rest}>
        {children}
      </nav>
    );
  },
);

SideNavigation.displayName = 'SideNavigation';

/* ---------- SideNavItem ---------- */

export interface SideNavItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  icon?: React.ReactNode;
  label: string;
}

export const SideNavItem = forwardRef<HTMLDivElement, SideNavItemProps>(
  ({ active, icon, label, className, children, ...rest }, ref) => {
    const classes = [
      'sds-sidenav-item',
      active && 'active',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {icon && <span className="sds-sidenav-icon">{icon}</span>}
        <span className="sds-sidenav-item-label">{label}</span>
        {children}
      </div>
    );
  },
);

SideNavItem.displayName = 'SideNavItem';

/* ---------- SideNavGroup ---------- */

export interface SideNavGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const SideNavGroup = forwardRef<HTMLDivElement, SideNavGroupProps>(
  ({ label, className, children, ...rest }, ref) => {
    const classes = ['sds-sidenav-group', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="sds-sidenav-group-label">{label}</div>
        {children}
      </div>
    );
  },
);

SideNavGroup.displayName = 'SideNavGroup';

/* ---------- SideNavFooter ---------- */

export interface SideNavFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SideNavFooter = forwardRef<HTMLDivElement, SideNavFooterProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-sidenav-footer', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

SideNavFooter.displayName = 'SideNavFooter';
