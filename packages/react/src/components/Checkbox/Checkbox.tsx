import { forwardRef, useEffect, useRef } from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate = false, className, disabled, ...rest }, ref) => {
    const internalRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const classes = [
      'sds-checkbox',
      indeterminate && 'sds-checkbox--indeterminate',
      disabled && 'sds-checkbox--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={classes}>
        <input
          type="checkbox"
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }
          }}
          disabled={disabled}
          hidden
          {...rest}
        />
        <span className="sds-checkbox-box">
          {indeterminate ? (
            <span className="sds-checkbox-dash" />
          ) : (
            <svg viewBox="0 0 12 10" fill="none" aria-hidden="true">
              <path
                d="M1 5l3.5 3.5L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {label}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
