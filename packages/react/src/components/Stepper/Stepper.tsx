import { forwardRef } from 'react';

/* ---------- Stepper ---------- */

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  compact?: boolean;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ direction = 'horizontal', compact, className, children, ...rest }, ref) => {
    const classes = [
      'sds-stepper',
      direction === 'vertical' && 'sds-stepper--vertical',
      compact && 'sds-stepper--compact',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

Stepper.displayName = 'Stepper';

/* ---------- Step ---------- */

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  description?: string;
  status?: 'upcoming' | 'active' | 'completed' | 'error';
}

export const Step = forwardRef<HTMLDivElement, StepProps>(
  (
    { label, description, status = 'upcoming', className, children, ...rest },
    ref,
  ) => {
    const classes = [
      'sds-step',
      `sds-step--${status}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="sds-step__connector" />
        <div className="sds-step__indicator" />
        <div>
          <div className="sds-step__label">{label}</div>
          {description && (
            <div className="sds-step__description">{description}</div>
          )}
        </div>
        {children}
      </div>
    );
  },
);

Step.displayName = 'Step';
