import { forwardRef } from 'react';

/* ---------- DropdownMenu ---------- */

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-dropdown', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';

/* ---------- DropdownTrigger ---------- */

export interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ className, children, ...rest }, ref) => {
  const classes = ['sds-dropdown-trigger', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  );
});

DropdownTrigger.displayName = 'DropdownTrigger';

/* ---------- DropdownContent ---------- */

export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-dropdown-menu', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="menu" {...rest}>
        {children}
      </div>
    );
  },
);

DropdownContent.displayName = 'DropdownContent';

/* ---------- DropdownItem ---------- */

export interface DropdownItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
  disabled?: boolean;
  active?: boolean;
  descriptive?: boolean;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ danger, disabled, active, descriptive, className, children, ...rest }, ref) => {
    const classes = [
      'sds-dropdown-item',
      danger && 'sds-dropdown-item--danger',
      disabled && 'sds-dropdown-item--disabled',
      active && 'sds-dropdown-item--active',
      descriptive && 'sds-dropdown-item--descriptive',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        role="menuitem"
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

DropdownItem.displayName = 'DropdownItem';

/* ---------- DropdownDivider ---------- */

export interface DropdownDividerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownDivider = forwardRef<HTMLDivElement, DropdownDividerProps>(
  ({ className, ...rest }, ref) => {
    const classes = ['sds-dropdown-divider', className]
      .filter(Boolean)
      .join(' ');

    return <div ref={ref} className={classes} role="separator" {...rest} />;
  },
);

DropdownDivider.displayName = 'DropdownDivider';

/* ---------- DropdownHeader ---------- */

export interface DropdownHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownHeader = forwardRef<HTMLDivElement, DropdownHeaderProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-dropdown-header', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

DropdownHeader.displayName = 'DropdownHeader';
