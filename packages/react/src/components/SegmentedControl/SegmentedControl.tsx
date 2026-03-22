import { forwardRef } from 'react';

/* ---------- SegmentedControl ---------- */

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    { size = 'md', block, value, onChange, className, children, ...rest },
    ref,
  ) => {
    const classes = [
      'sds-segmented',
      size === 'sm' && 'sds-segmented--sm',
      size === 'lg' && 'sds-segmented--lg',
      block && 'sds-segmented--block',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="radiogroup" {...rest}>
        {children}
      </div>
    );
  },
);

SegmentedControl.displayName = 'SegmentedControl';

/* ---------- SegmentedOption ---------- */

export interface SegmentedOptionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  active?: boolean;
}

export const SegmentedOption = forwardRef<
  HTMLButtonElement,
  SegmentedOptionProps
>(({ value, active, className, children, ...rest }, ref) => {
  const classes = [
    'sds-segmented__option',
    active && 'sds-segmented__option--active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      role="radio"
      aria-checked={active}
      {...rest}
    >
      {children}
    </button>
  );
});

SegmentedOption.displayName = 'SegmentedOption';
