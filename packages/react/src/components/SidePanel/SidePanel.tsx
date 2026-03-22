import { forwardRef } from 'react';

/* ---------- SidePanel ---------- */

export interface SidePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  width?: 'narrow' | 'medium' | 'wide';
  title?: string;
}

export const SidePanel = forwardRef<HTMLDivElement, SidePanelProps>(
  (
    {
      open,
      onClose,
      side = 'right',
      width = 'medium',
      title,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    if (!open) return null;

    const overlayClasses = ['sds-side-panel-overlay', 'is-open', className]
      .filter(Boolean)
      .join(' ');

    const panelClasses = [
      'sds-side-panel',
      `sds-side-panel--${side}`,
      `sds-side-panel--${width}`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={overlayClasses} onClick={onClose}>
        <div
          ref={ref}
          className={panelClasses}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          {...rest}
        >
          {title && (
            <div className="sds-side-panel-header">
              <span>{title}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    );
  },
) as SidePanelComponent;

SidePanel.displayName = 'SidePanel';

/* ---------- SidePanel.Body ---------- */

export interface SidePanelBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SidePanelBody = forwardRef<HTMLDivElement, SidePanelBodyProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-side-panel-body', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

SidePanelBody.displayName = 'SidePanel.Body';

/* ---------- SidePanel.Footer ---------- */

export interface SidePanelFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SidePanelFooter = forwardRef<HTMLDivElement, SidePanelFooterProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-side-panel-footer', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

SidePanelFooter.displayName = 'SidePanel.Footer';

/* ---------- Compound export ---------- */

interface SidePanelComponent
  extends React.ForwardRefExoticComponent<
    SidePanelProps & React.RefAttributes<HTMLDivElement>
  > {
  Body: typeof SidePanelBody;
  Footer: typeof SidePanelFooter;
}

SidePanel.Body = SidePanelBody;
SidePanel.Footer = SidePanelFooter;
