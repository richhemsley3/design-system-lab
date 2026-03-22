import { forwardRef } from 'react';

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, className, disabled, ...rest }, ref) => {
    const classes = [
      'sds-toggle',
      disabled && 'sds-toggle--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={classes}>
        <input type="checkbox" ref={ref} disabled={disabled} hidden {...rest} />
        <span className="sds-toggle-track">
          <span className="sds-toggle-knob" />
        </span>
        {label}
      </label>
    );
  },
);

Toggle.displayName = 'Toggle';
