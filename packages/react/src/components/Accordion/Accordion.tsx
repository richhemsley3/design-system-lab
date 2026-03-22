import { forwardRef, useState } from 'react';

/* ---------- Accordion ---------- */

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ bordered, className, children, ...rest }, ref) => {
    const classes = [
      'sds-accordion',
      bordered && 'sds-accordion--bordered',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';

/* ---------- AccordionItem ---------- */

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultOpen?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ title, defaultOpen = false, className, children, ...rest }, ref) => {
    const [open, setOpen] = useState(defaultOpen);

    const classes = ['sds-accordion-item', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <button
          type="button"
          className="sds-accordion-header"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sds-accordion-header-text">{title}</span>
          <span className="sds-accordion-icon" />
        </button>
        {open && (
          <div className="sds-accordion-panel">
            <div className="sds-accordion-panel-inner">{children}</div>
          </div>
        )}
      </div>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';
