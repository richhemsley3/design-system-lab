import { forwardRef } from 'react';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'simple' | 'compact';
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      variant = 'default',
      currentPage,
      totalPages,
      onPageChange,
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-pagination',
      variant === 'simple' && 'sds-pagination--simple',
      variant === 'compact' && 'sds-pagination--compact',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handlePrev = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const renderPages = () => {
      if (variant === 'simple') {
        return (
          <span>
            {currentPage} of {totalPages}
          </span>
        );
      }

      const pages: React.ReactNode[] = [];

      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
          pages.push(
            <button
              key={i}
              type="button"
              className={[
                'sds-pagination__btn',
                i === currentPage && 'sds-pagination__btn--active',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={i === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>,
          );
        } else if (
          (i === currentPage - 2 && i > 1) ||
          (i === currentPage + 2 && i < totalPages)
        ) {
          pages.push(
            <span key={`ellipsis-${i}`} className="sds-pagination__ellipsis">
              &hellip;
            </span>,
          );
        }
      }

      return pages;
    };

    return (
      <nav ref={ref} className={classes} aria-label="Pagination" {...rest}>
        <button
          type="button"
          className="sds-pagination__arrow"
          disabled={currentPage <= 1}
          onClick={handlePrev}
          aria-label="Previous page"
        >
          &lsaquo;
        </button>
        {renderPages()}
        <button
          type="button"
          className="sds-pagination__arrow"
          disabled={currentPage >= totalPages}
          onClick={handleNext}
          aria-label="Next page"
        >
          &rsaquo;
        </button>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
