import { forwardRef } from 'react';

/* ---------- TimelineItem ---------- */

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  time?: string;
  description?: string;
  status?: 'error' | 'warning' | 'success' | 'info';
  icon?: React.ReactNode;
}

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ title, time, description, status, icon, className, children, ...rest }, ref) => {
    const classes = [
      'sds-timeline-item',
      status && `sds-timeline-item--${status}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const markerClasses = [
      'sds-timeline-item__marker',
      icon && 'sds-timeline-item__marker--icon',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="sds-timeline-item__connector" />
        <div className={markerClasses}>{icon}</div>
        <div className="sds-timeline-item__content">
          {time && <span className="sds-timeline-item__time">{time}</span>}
          <span className="sds-timeline-item__title">{title}</span>
          {description && (
            <p className="sds-timeline-item__description">{description}</p>
          )}
          {children}
        </div>
      </div>
    );
  },
);

TimelineItem.displayName = 'TimelineItem';

/* ---------- Timeline ---------- */

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-timeline', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

Timeline.displayName = 'Timeline';
