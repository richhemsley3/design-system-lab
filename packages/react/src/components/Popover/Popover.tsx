import { forwardRef } from 'react';

/* ---------- Popover ---------- */

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  title?: string;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    { open, onClose, position = 'bottom', title, className, children, ...rest },
    ref,
  ) => {
    const anchorClasses = ['sds-popover-anchor', className]
      .filter(Boolean)
      .join(' ');

    const popoverClasses = [
      'sds-popover',
      open && 'is-open',
      `sds-popover--${position}`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={anchorClasses} {...rest}>
        <div className={popoverClasses}>
          {(title || onClose) && (
            <div className="sds-popover__header">
              {title && <div className="sds-popover__title">{title}</div>}
              {onClose && (
                <button
                  type="button"
                  className="sds-popover__close"
                  onClick={onClose}
                  aria-label="Close"
                >
                  &times;
                </button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  },
);

Popover.displayName = 'Popover';

/* ---------- PopoverBody ---------- */

export interface PopoverBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverBody = forwardRef<HTMLDivElement, PopoverBodyProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-popover__body', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

PopoverBody.displayName = 'PopoverBody';

/* ---------- PopoverActions ---------- */

export interface PopoverActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverActions = forwardRef<HTMLDivElement, PopoverActionsProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-popover__actions', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

PopoverActions.displayName = 'PopoverActions';
