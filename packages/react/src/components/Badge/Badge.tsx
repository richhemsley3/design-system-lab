import { forwardRef } from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'danger' | 'danger-solid';
  size?: 'sm' | 'md' | 'lg';
  count?: number;
  maxCount?: number;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      count,
      maxCount = 99,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-badge',
      `sds-badge--${variant}`,
      size !== 'md' && `sds-badge--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const displayContent =
      count !== undefined
        ? count > maxCount
          ? `${maxCount}+`
          : String(count)
        : children;

    return (
      <span ref={ref} className={classes} {...rest}>
        {displayContent}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
