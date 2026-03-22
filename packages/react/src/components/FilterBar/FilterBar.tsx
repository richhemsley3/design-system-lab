import { forwardRef } from 'react';

/* ---------- FilterBar ---------- */

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClear?: () => void;
}

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  ({ onClear, className, children, ...rest }, ref) => {
    const classes = ['sds-filter-bar', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="sds-filter-bar__filters">{children}</div>
        {onClear && (
          <button
            type="button"
            className="sds-filter-bar__clear"
            onClick={onClear}
          >
            Clear all
          </button>
        )}
      </div>
    );
  },
);

FilterBar.displayName = 'FilterBar';

/* ---------- FilterChip ---------- */

export interface FilterChipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value?: string;
  active?: boolean;
  onRemove?: () => void;
}

export const FilterChip = forwardRef<HTMLDivElement, FilterChipProps>(
  ({ label, value, active, onRemove, className, ...rest }, ref) => {
    const classes = [
      'sds-filter-chip',
      active && 'sds-filter-chip--active',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <span className="sds-filter-chip__label">{label}</span>
        {value && <span className="sds-filter-chip__value">{value}</span>}
        {onRemove && (
          <button
            type="button"
            className="sds-filter-chip__remove"
            onClick={onRemove}
            aria-label={`Remove ${label} filter`}
          >
            &times;
          </button>
        )}
      </div>
    );
  },
);

FilterChip.displayName = 'FilterChip';
