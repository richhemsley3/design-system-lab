import { forwardRef } from 'react';

/* ---------- Toast ---------- */

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissing?: boolean;
  icon?: React.ReactNode;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'info',
      title,
      message,
      dismissible,
      onDismiss,
      dismissing,
      icon,
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-toast',
      `sds-toast--${variant}`,
      dismissing && 'is-dismissing',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="alert" {...rest}>
        {icon && <span className="sds-toast__icon">{icon}</span>}
        <div className="sds-toast__content">
          {title && <div className="sds-toast__title">{title}</div>}
          <div className="sds-toast__message">{message}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            className="sds-toast__dismiss"
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

Toast.displayName = 'Toast';

/* ---------- ToastContainer ---------- */

export interface ToastContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-toast-container', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

ToastContainer.displayName = 'ToastContainer';
