import { forwardRef } from 'react';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: React.ReactNode;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      variant = 'info',
      title,
      message,
      icon,
      dismissible,
      onDismiss,
      actions,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-banner',
      `sds-banner--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="alert" {...rest}>
        {icon && <span className="sds-banner__icon">{icon}</span>}
        <div className="sds-banner__content">
          {title && <div className="sds-banner__title">{title}</div>}
          {(message || children) && (
            <div className="sds-banner__message">{message || children}</div>
          )}
        </div>
        {actions && <div className="sds-banner__actions">{actions}</div>}
        {dismissible && (
          <button
            type="button"
            className="sds-banner__dismiss"
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

Banner.displayName = 'Banner';
