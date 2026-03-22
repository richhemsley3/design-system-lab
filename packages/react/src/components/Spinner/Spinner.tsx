import { forwardRef } from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onDark?: boolean;
  inline?: boolean;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', onDark, inline, className, ...rest }, ref) => {
    const classes = [
      inline ? 'sds-spinner-inline' : 'sds-spinner',
      size !== 'md' && `sds-spinner--${size}`,
      onDark && 'sds-spinner--on-dark',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        role="status"
        aria-label="Loading"
        {...rest}
      />
    );
  },
);

Spinner.displayName = 'Spinner';
