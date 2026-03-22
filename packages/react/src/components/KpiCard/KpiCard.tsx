import { forwardRef } from 'react';

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  trend?: {
    direction: 'positive' | 'negative' | 'neutral';
    value: string;
  };
  layout?: 'default' | 'row';
  chart?: React.ReactNode;
  footer?: React.ReactNode;
}

export const KpiCard = forwardRef<HTMLDivElement, KpiCardProps>(
  (
    { label, value, trend, layout = 'default', chart, footer, className, children, ...rest },
    ref,
  ) => {
    const classes = [
      'sds-viz-card',
      layout === 'row' && 'sds-viz-card--row',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="sds-viz-card__header">
          <span className="sds-viz-card__label">{label}</span>
          <span className="sds-viz-card__value">{value}</span>
          {trend && (
            <span
              className={[
                'sds-viz-card__trend',
                `sds-viz-card__trend--${trend.direction}`,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {trend.value}
            </span>
          )}
        </div>
        {chart && <div className="sds-viz-card__chart">{chart}</div>}
        {children}
        {footer && <div className="sds-viz-card__footer">{footer}</div>}
      </div>
    );
  },
);

KpiCard.displayName = 'KpiCard';
