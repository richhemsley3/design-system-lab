import { forwardRef } from 'react';

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  open?: boolean;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Select date',
      disabled,
      open,
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = ['sds-datepicker', className].filter(Boolean).join(' ');

    const displayText = value
      ? value.toLocaleDateString()
      : placeholder;

    return (
      <div ref={ref} className={classes} {...rest}>
        <button
          type="button"
          className={[
            'sds-datepicker__input',
            open && 'is-active',
          ]
            .filter(Boolean)
            .join(' ')}
          disabled={disabled}
        >
          <span
            className={[
              'sds-datepicker__input-text',
              !value && 'is-placeholder',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {displayText}
          </span>
        </button>

        <div
          className={[
            'sds-datepicker-dropdown',
            open && 'is-open',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="sds-calendar">
            <div className="sds-calendar__header">
              <button type="button" className="sds-calendar__nav" aria-label="Previous month">
                &lsaquo;
              </button>
              <div className="sds-calendar__title" />
              <button type="button" className="sds-calendar__nav" aria-label="Next month">
                &rsaquo;
              </button>
            </div>
            <div className="sds-calendar__weekdays" />
            <div className="sds-calendar__grid" />
          </div>
        </div>
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
