import { forwardRef } from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    { content, title, position = 'top', className, children, ...rest },
    ref,
  ) => {
    const classes = [
      'sds-tooltip',
      `sds-tooltip--${position}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
        <div role="tooltip">
          {title && <div className="sds-tooltip__title">{title}</div>}
          <div className="sds-tooltip__desc">{content}</div>
        </div>
      </div>
    );
  },
);

Tooltip.displayName = 'Tooltip';
