import { forwardRef } from 'react';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ logo, className, children, ...rest }, ref) => {
    const classes = ['sds-header', className].filter(Boolean).join(' ');

    return (
      <header ref={ref} className={classes} {...rest}>
        {logo && <div className="sds-header-logo">{logo}</div>}
        <div className="sds-header-actions">{children}</div>
      </header>
    );
  },
);

Header.displayName = 'Header';
