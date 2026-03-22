import { forwardRef } from 'react';

/* ---------- DataList ---------- */

export interface DataListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value?: React.ReactNode;
}

export const DataListItem = forwardRef<HTMLDivElement, DataListItemProps>(
  ({ label, value, className, children, ...rest }, ref) => {
    const classes = ['sds-kv', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <dt className="sds-kv__label">{label}</dt>
        <dd className="sds-kv__value">{value ?? children}</dd>
      </div>
    );
  },
);

DataListItem.displayName = 'DataListItem';

/* ---------- DataList ---------- */

export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  columns?: 1 | 2 | 3;
}

export const DataList = forwardRef<HTMLDListElement, DataListProps>(
  ({ columns, className, children, ...rest }, ref) => {
    const classes = [
      'sds-data-list',
      columns && columns > 1 && 'sds-kv-grid',
      columns === 2 && 'sds-kv-grid--2col',
      columns === 3 && 'sds-kv-grid--3col',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <dl ref={ref} className={classes} {...rest}>
        {children}
      </dl>
    );
  },
);

DataList.displayName = 'DataList';
