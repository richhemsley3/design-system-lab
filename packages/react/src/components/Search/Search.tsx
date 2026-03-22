import { forwardRef } from 'react';

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
}

export const Search = forwardRef<HTMLDivElement, SearchProps>(
  (
    {
      size = 'md',
      value,
      onChange,
      onClear,
      placeholder,
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-search',
      size !== 'md' && `sds-search--${size}`,
      value && 'sds-search--has-value',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes}>
        <span className="sds-search__icon" aria-hidden="true" />
        <input
          type="search"
          className="sds-search__input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        />
        {value && onClear && (
          <button
            type="button"
            className="sds-search__clear"
            onClick={onClear}
            aria-label="Clear search"
          />
        )}
      </div>
    );
  },
);

Search.displayName = 'Search';
