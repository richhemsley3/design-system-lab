import { forwardRef } from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  compact?: boolean;
  actions?: React.ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      icon,
      dismissible,
      onDismiss,
      compact,
      actions,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-alert',
      `sds-alert--${variant}`,
      compact && 'sds-alert--compact',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="alert" {...rest}>
        {icon && <span className="sds-alert__icon">{icon}</span>}
        <div className="sds-alert__content">
          {title && <div className="sds-alert__title">{title}</div>}
          {children && <div className="sds-alert__message">{children}</div>}
        </div>
        {actions && <div className="sds-alert__actions">{actions}</div>}
        {dismissible && (
          <button
            type="button"
            className="sds-alert__dismiss"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            &times;
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
