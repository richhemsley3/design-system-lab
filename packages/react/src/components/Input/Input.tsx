import { forwardRef, useId } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  inputSize?: 'sm' | 'md' | 'lg';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      inputSize = 'md',
      leadingIcon,
      trailingIcon,
      required,
      className,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;

    const inputClasses = [
      'sds-input',
      inputSize !== 'md' && `sds-input--${inputSize}`,
      error && 'sds-input--error',
      success && !error && 'sds-input--success',
      leadingIcon && 'sds-input--has-leading-icon',
      trailingIcon && 'sds-input--has-trailing-icon',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="sds-field">
        {label && (
          <label
            htmlFor={id}
            className={[
              'sds-field-label',
              required && 'sds-field-label--required',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </label>
        )}
        <div className="sds-input-wrapper">
          {leadingIcon && (
            <span className="sds-input-icon--leading">{leadingIcon}</span>
          )}
          <input ref={ref} id={id} className={inputClasses} required={required} {...rest} />
          {trailingIcon && (
            <span className="sds-input-icon--trailing">{trailingIcon}</span>
          )}
        </div>
        {error && <p className="sds-field-error">{error}</p>}
        {!error && success && <p className="sds-field-success">{success}</p>}
        {!error && !success && helperText && (
          <p className="sds-field-helper">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
