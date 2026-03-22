import { forwardRef } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'danger-outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconOnly?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconOnly = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-btn',
      `sds-btn--${variant}`,
      `sds-btn--${size}`,
      icon && 'sds-btn--icon',
      iconOnly && 'sds-btn--icon-only',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} {...rest}>
        {icon}
        {!iconOnly && children}
      </button>
    );
  },
);

Button.displayName = 'Button';
