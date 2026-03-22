import { forwardRef } from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: 'sm' | 'md' | 'lg';
  status?: 'default' | 'success' | 'error' | 'warning';
  indeterminate?: boolean;
  label?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      size = 'md',
      status = 'default',
      indeterminate,
      label,
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-progress',
      size !== 'md' && `sds-progress--${size}`,
      status !== 'default' && `sds-progress--${status}`,
      indeterminate && 'sds-progress--indeterminate',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const clampedValue =
      value !== undefined ? Math.min(100, Math.max(0, value)) : 0;

    return (
      <div
        ref={ref}
        className={classes}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...rest}
      >
        {label && <span className="sds-progress__label">{label}</span>}
        <div className="sds-progress__track">
          <div
            className="sds-progress__fill"
            style={
              indeterminate ? undefined : { width: `${clampedValue}%` }
            }
          />
        </div>
      </div>
    );
  },
);

Progress.displayName = 'Progress';
