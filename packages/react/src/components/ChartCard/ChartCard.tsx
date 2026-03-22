import { forwardRef } from 'react';

export interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  actions?: React.ReactNode;
}

export const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>(
  ({ title, actions, className, children, ...rest }, ref) => {
    const classes = ['sds-card', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="sds-card-header sds-card-header--bordered">
          <div className="sds-card-title">{title}</div>
          {actions && <div className="sds-card-actions">{actions}</div>}
        </div>
        <div className="sds-card-body">{children}</div>
      </div>
    );
  },
);

ChartCard.displayName = 'ChartCard';
