import { forwardRef, useState } from 'react';

/* ---------- TreeView ---------- */

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-tree', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="tree" {...rest}>
        {children}
      </div>
    );
  },
);

TreeView.displayName = 'TreeView';

/* ---------- TreeItem ---------- */

export interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  defaultExpanded?: boolean;
}

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      label,
      icon,
      selected,
      disabled,
      defaultExpanded = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const hasChildren = !!children;

    const classes = [
      'sds-tree-item',
      selected && 'sds-tree-item--selected',
      disabled && 'sds-tree-item--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="treeitem" {...rest}>
        <div className="sds-tree-item__row">
          <button
            type="button"
            className={[
              'sds-tree-item__toggle',
              !hasChildren && 'sds-tree-item__toggle--hidden',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={hasChildren ? expanded : undefined}
            tabIndex={hasChildren ? 0 : -1}
          >
            {hasChildren ? (expanded ? '▾' : '▸') : null}
          </button>
          {icon && <span className="sds-tree-item__icon">{icon}</span>}
          <span className="sds-tree-item__label">{label}</span>
        </div>
        {hasChildren && expanded && (
          <div role="group">{children}</div>
        )}
      </div>
    );
  },
);

TreeItem.displayName = 'TreeItem';
