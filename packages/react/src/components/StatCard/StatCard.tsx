import { forwardRef } from 'react';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    positive?: boolean;
  };
  compact?: boolean;
  highlight?: 'info' | 'critical' | 'health';
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      trend,
      compact,
      highlight,
      icon,
      footer,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-stat-card',
      compact && 'sds-stat-card--compact',
      highlight && 'sds-stat-card--highlighted',
      highlight && `sds-stat-card--highlighted-${highlight}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const trendClasses = trend
      ? [
          'sds-stat-card__trend',
          `sds-stat-card__trend--${trend.direction}`,
          trend.positive !== undefined &&
            (trend.positive
              ? 'sds-stat-card__trend--positive'
              : 'sds-stat-card__trend--negative'),
        ]
          .filter(Boolean)
          .join(' ')
      : undefined;

    return (
      <div ref={ref} className={classes} {...rest}>
        {icon && <span className="sds-stat-card__icon">{icon}</span>}
        <span className="sds-stat-card__label">{label}</span>
        <span className="sds-stat-card__value">{value}</span>
        {trend && <span className={trendClasses}>{trend.value}</span>}
        {footer && <div className="sds-stat-card__footer">{footer}</div>}
        {children}
      </div>
    );
  },
);

StatCard.displayName = 'StatCard';
