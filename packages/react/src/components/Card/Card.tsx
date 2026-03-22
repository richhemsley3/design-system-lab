import { forwardRef } from 'react';

/* ---------- Card ---------- */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-card', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
) as CardComponent;

Card.displayName = 'Card';

/* ---------- Card.Header ---------- */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  bordered?: boolean;
  actions?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, bordered, actions, className, children, ...rest }, ref) => {
    const classes = [
      'sds-card-header',
      bordered && 'sds-card-header--bordered',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {title && <div className="sds-card-title">{title}</div>}
        {children}
        {actions && <div className="sds-card-actions">{actions}</div>}
      </div>
    );
  },
);

CardHeader.displayName = 'Card.Header';

/* ---------- Card.Body ---------- */

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-card-body', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

CardBody.displayName = 'Card.Body';

/* ---------- Card.Footer ---------- */

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-card-footer', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

CardFooter.displayName = 'Card.Footer';

/* ---------- Compound export ---------- */

interface CardComponent
  extends React.ForwardRefExoticComponent<
    CardProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
