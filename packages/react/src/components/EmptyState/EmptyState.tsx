import { forwardRef } from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description?: string;
  icon?: React.ReactNode;
  illustration?: React.ReactNode;
  compact?: boolean;
  actions?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      heading,
      description,
      icon,
      illustration,
      compact,
      actions,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-empty-state',
      compact && 'sds-empty-state--compact',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {icon && <span className="sds-empty-state__icon">{icon}</span>}
        {illustration && (
          <div className="sds-empty-state__illustration">{illustration}</div>
        )}
        <h3 className="sds-empty-state__heading">{heading}</h3>
        {description && (
          <p className="sds-empty-state__description">{description}</p>
        )}
        {children}
        {actions && <div className="sds-empty-state__actions">{actions}</div>}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';
