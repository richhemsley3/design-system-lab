import { forwardRef } from 'react';

/* ---------- CommandPalette ---------- */

export interface CommandPaletteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  ({ open, onClose, className, children, ...rest }, ref) => {
    const overlayClasses = [
      'sds-command-palette-overlay',
      open && 'is-open',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={overlayClasses} onClick={onClose} {...rest}>
        <div
          className="sds-command-palette"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <div className="sds-cmd-footer" />
        </div>
      </div>
    );
  },
);

CommandPalette.displayName = 'CommandPalette';

/* ---------- CommandSearch ---------- */

export interface CommandSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CommandSearch = forwardRef<HTMLInputElement, CommandSearchProps>(
  ({ className, ...rest }, ref) => {
    const classes = ['sds-cmd-search', className].filter(Boolean).join(' ');

    return (
      <div className={classes}>
        <input
          ref={ref}
          type="text"
          className="sds-cmd-search__search-input"
          {...rest}
        />
      </div>
    );
  },
);

CommandSearch.displayName = 'CommandSearch';

/* ---------- CommandGroup ---------- */

export interface CommandGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ label, className, children, ...rest }, ref) => {
    const classes = ['sds-cmd-results', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="sds-cmd-group-label">{label}</div>
        {children}
      </div>
    );
  },
);

CommandGroup.displayName = 'CommandGroup';

/* ---------- CommandItem ---------- */

export interface CommandItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  shortcut?: string;
  active?: boolean;
  onSelect?: () => void;
}

export const CommandItem = forwardRef<HTMLButtonElement, CommandItemProps>(
  ({ label, shortcut, active, onSelect, className, ...rest }, ref) => {
    const classes = [
      'sds-cmd-item',
      active && 'is-active',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} onClick={onSelect} {...rest}>
        <span className="sds-cmd-item__label">{label}</span>
        {shortcut && (
          <span className="sds-cmd-item__shortcut">{shortcut}</span>
        )}
      </button>
    );
  },
);

CommandItem.displayName = 'CommandItem';

/* ---------- CommandEmpty ---------- */

export interface CommandEmptyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-cmd-empty', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

CommandEmpty.displayName = 'CommandEmpty';
