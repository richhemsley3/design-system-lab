import { forwardRef } from 'react';

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  status?:
    | 'online'
    | 'connected'
    | 'offline'
    | 'disconnected'
    | 'warning'
    | 'degraded'
    | 'error'
    | 'critical'
    | 'scanning'
    | 'syncing';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const StatusIndicator = forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ status = 'online', size = 'md', label, className, ...rest }, ref) => {
    const classes = [
      'sds-status',
      `sds-status--${status}`,
      size !== 'md' && `sds-status--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...rest}>
        <span className="sds-status__dot" />
        {label && <span className="sds-status__label">{label}</span>}
      </span>
    );
  },
);

StatusIndicator.displayName = 'StatusIndicator';
