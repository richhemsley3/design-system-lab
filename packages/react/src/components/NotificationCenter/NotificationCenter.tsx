import { forwardRef } from 'react';

/* ---------- NotificationCenter ---------- */

export interface NotificationCenterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onMarkAllRead?: () => void;
}

export const NotificationCenter = forwardRef<
  HTMLDivElement,
  NotificationCenterProps
>(({ title = 'Notifications', onMarkAllRead, className, children, ...rest }, ref) => {
  const classes = ['sds-notif-center', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      <div className="sds-notif-center__header">
        <div className="sds-notif-center__title">{title}</div>
        {onMarkAllRead && (
          <button
            type="button"
            className="sds-notif-center__mark-read"
            onClick={onMarkAllRead}
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="sds-notif-center__list">{children}</div>
    </div>
  );
});

NotificationCenter.displayName = 'NotificationCenter';

/* ---------- NotificationTabs ---------- */

export interface NotificationTabsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const NotificationTabs = forwardRef<
  HTMLDivElement,
  NotificationTabsProps
>(({ className, children, ...rest }, ref) => {
  const classes = ['sds-notif-center__tabs', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

NotificationTabs.displayName = 'NotificationTabs';

/* ---------- NotificationTab ---------- */

export interface NotificationTabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const NotificationTab = forwardRef<
  HTMLButtonElement,
  NotificationTabProps
>(({ active, className, children, ...rest }, ref) => {
  const classes = [
    'sds-notif-center__tab',
    active && 'sds-notif-center__tab--active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  );
});

NotificationTab.displayName = 'NotificationTab';

/* ---------- NotificationItem ---------- */

export interface NotificationItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  message: string;
  time?: string;
  variant?: 'error' | 'warning' | 'success' | 'info';
  unread?: boolean;
  onDismiss?: () => void;
}

export const NotificationItem = forwardRef<
  HTMLDivElement,
  NotificationItemProps
>(
  (
    { title, message, time, variant, unread, onDismiss, className, ...rest },
    ref,
  ) => {
    const classes = [
      'sds-notif-item',
      variant && `sds-notif-item--${variant}`,
      unread && 'sds-notif-item--unread',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="sds-notif-item__content">
          <div className="sds-notif-item__title">{title}</div>
          <div className="sds-notif-item__message">{message}</div>
          {time && <div className="sds-notif-item__time">{time}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            className="sds-notif-item__dismiss"
            onClick={onDismiss}
            aria-label="Dismiss notification"
          >
            &times;
          </button>
        )}
      </div>
    );
  },
);

NotificationItem.displayName = 'NotificationItem';

/* ---------- NotificationEmpty ---------- */

export interface NotificationEmptyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const NotificationEmpty = forwardRef<
  HTMLDivElement,
  NotificationEmptyProps
>(({ className, children, ...rest }, ref) => {
  const classes = ['sds-notif-center__empty', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

NotificationEmpty.displayName = 'NotificationEmpty';
