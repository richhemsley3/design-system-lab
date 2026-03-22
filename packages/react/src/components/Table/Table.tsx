import { forwardRef } from 'react';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ striped, hoverable, compact, className, children, ...rest }, ref) => {
    const tableClasses = [
      'sds-table',
      striped && 'sds-table--striped',
      hoverable && 'sds-table--hoverable',
      compact && 'sds-table--compact',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="sds-table-container">
        <table ref={ref} className={tableClasses} {...rest}>
          {children}
        </table>
      </div>
    );
  },
);

Table.displayName = 'Table';
