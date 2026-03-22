import { forwardRef } from 'react';

/* ---------- Modal ---------- */

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, size = 'md', title, className, children, ...rest }, ref) => {
    if (!open) return null;

    const overlayClasses = ['sds-modal-overlay', 'is-open', className]
      .filter(Boolean)
      .join(' ');

    const modalClasses = ['sds-modal', `sds-modal--${size}`]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={overlayClasses} onClick={onClose}>
        <div
          ref={ref}
          className={modalClasses}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          {...rest}
        >
          {title && (
            <div className="sds-modal-header">
              <div className="sds-modal-header__title">{title}</div>
              <button
                type="button"
                className="sds-modal-header__close"
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
) as ModalComponent;

Modal.displayName = 'Modal';

/* ---------- Modal.Body ---------- */

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-modal-body', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

ModalBody.displayName = 'Modal.Body';

/* ---------- Modal.Footer ---------- */

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-modal-footer', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

ModalFooter.displayName = 'Modal.Footer';

/* ---------- Compound export ---------- */

interface ModalComponent
  extends React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<HTMLDivElement>
  > {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
