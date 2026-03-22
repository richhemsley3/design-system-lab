import { forwardRef, useId, useState } from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  maxLength?: number;
  showCharCount?: boolean;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      maxLength,
      showCharCount = false,
      required,
      className,
      id: idProp,
      onChange,
      defaultValue,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const [internalValue, setInternalValue] = useState(
      (defaultValue as string) ?? '',
    );
    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? String(valueProp) : internalValue;
    const charCount = currentValue.length;
    const isOver = maxLength !== undefined && charCount > maxLength;

    const textareaClasses = [
      'sds-textarea',
      error && 'sds-textarea--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

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
        <textarea
          ref={ref}
          id={id}
          className={textareaClasses}
          required={required}
          maxLength={maxLength}
          onChange={handleChange}
          value={isControlled ? valueProp : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          {...rest}
        />
        {(showCharCount || error || helperText) && (
          <div className="sds-textarea-footer">
            {error && <p className="sds-field-error">{error}</p>}
            {!error && helperText && (
              <p className="sds-field-helper">{helperText}</p>
            )}
            {showCharCount && (
              <span
                className={[
                  'sds-textarea-charcount',
                  isOver && 'sds-textarea-charcount--over',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {charCount}
                {maxLength !== undefined && `/${maxLength}`}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
