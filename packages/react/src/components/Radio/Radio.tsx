import { forwardRef } from 'react';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, disabled, ...rest }, ref) => {
    const classes = [
      'sds-radio',
      disabled && 'sds-radio--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={classes}>
        <input type="radio" ref={ref} disabled={disabled} hidden {...rest} />
        <span className="sds-radio-circle">
          <span className="sds-radio-dot" />
        </span>
        {label}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
