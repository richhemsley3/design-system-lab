import { forwardRef, Children, Fragment } from 'react';

/* ---------- Breadcrumbs ---------- */

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-breadcrumb', className].filter(Boolean).join(' ');
    const items = Children.toArray(children);

    return (
      <nav ref={ref} className={classes} aria-label="Breadcrumb" {...rest}>
        <ol className="sds-breadcrumb__list">
          {items.map((child, index) => (
            <Fragment key={index}>
              {index > 0 && (
                <li className="sds-breadcrumb__separator" aria-hidden="true">
                  /
                </li>
              )}
              {child}
            </Fragment>
          ))}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';

/* ---------- BreadcrumbItem ---------- */

export interface BreadcrumbItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  href?: string;
  current?: boolean;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ href, current, className, children, ...rest }, ref) => {
    const classes = ['sds-breadcrumb__item', className]
      .filter(Boolean)
      .join(' ');

    return (
      <li ref={ref} className={classes} {...rest}>
        {current ? (
          <span className="sds-breadcrumb__current" aria-current="page">
            {children}
          </span>
        ) : (
          <a className="sds-breadcrumb__link" href={href}>
            {children}
          </a>
        )}
      </li>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
