import { forwardRef } from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple';
  variant?: 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      status,
      variant = 'filled',
      size = 'md',
      dot,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-tag',
      status && `sds-tag--${status}`,
      variant === 'outline' && 'sds-tag--outline',
      size !== 'md' && `sds-tag--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...rest}>
        {dot && <span className="sds-tag-dot" />}
        {children}
      </span>
    );
  },
);

Tag.displayName = 'Tag';
