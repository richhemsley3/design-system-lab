import { forwardRef } from 'react';

export interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  severity?: 'critical' | 'warning' | 'info' | 'success';
  compact?: boolean;
  icon?: React.ReactNode;
  meta?: string;
  action?: React.ReactNode;
}

export const InsightCard = forwardRef<HTMLDivElement, InsightCardProps>(
  (
    {
      title,
      description,
      severity,
      compact,
      icon,
      meta,
      action,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-insight',
      severity && 'sds-insight--accent',
      severity && `sds-insight--accent-${severity}`,
      compact && 'sds-insight--compact',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {icon && <span className="sds-insight__icon">{icon}</span>}
        <div className="sds-insight__content">
          <div className="sds-insight__header">
            <span className="sds-insight__title">{title}</span>
            {severity && (
              <span
                className={[
                  'sds-insight__severity',
                  `sds-insight__severity--${severity}`,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {severity}
              </span>
            )}
          </div>
          {description && (
            <p className="sds-insight__description">{description}</p>
          )}
          {children}
          {meta && <span className="sds-insight__meta">{meta}</span>}
        </div>
        {action && <div className="sds-insight__action">{action}</div>}
      </div>
    );
  },
);

InsightCard.displayName = 'InsightCard';
