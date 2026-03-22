import { forwardRef, useId } from 'react';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  selectSize?: 'sm' | 'md' | 'lg';
  required?: boolean;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      selectSize = 'md',
      required,
      className,
      children,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;

    const selectClasses = [
      'sds-select',
      selectSize !== 'md' && `sds-select--${selectSize}`,
      error && 'sds-select--error',
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
        <select ref={ref} id={id} className={selectClasses} required={required} {...rest}>
          {children}
        </select>
        {error && <p className="sds-field-error">{error}</p>}
        {!error && helperText && <p className="sds-field-helper">{helperText}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
