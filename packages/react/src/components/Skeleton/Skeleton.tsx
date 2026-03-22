import { forwardRef } from 'react';

/* ---------- Skeleton ---------- */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, className, style, ...rest }, ref) => {
    const classes = [
      'sds-skeleton',
      `sds-skeleton--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        style={{ width, height, ...style }}
        aria-hidden="true"
        {...rest}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

/* ---------- SkeletonTextBlock ---------- */

export interface SkeletonTextBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SkeletonTextBlock = forwardRef<
  HTMLDivElement,
  SkeletonTextBlockProps
>(({ className, ...rest }, ref) => {
  const classes = ['sds-skeleton-text-block', className]
    .filter(Boolean)
    .join(' ');

  return <div ref={ref} className={classes} aria-hidden="true" {...rest} />;
});

SkeletonTextBlock.displayName = 'SkeletonTextBlock';

/* ---------- SkeletonCard ---------- */

export interface SkeletonCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-skeleton-card', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} aria-hidden="true" {...rest}>
        {children || (
          <>
            <div className="sds-skeleton-card__image" />
            <div className="sds-skeleton-card__body">
              <div className="sds-skeleton-card__title" />
              <div className="sds-skeleton-card__desc" />
              <div className="sds-skeleton-card__action" />
            </div>
          </>
        )}
      </div>
    );
  },
);

SkeletonCard.displayName = 'SkeletonCard';
