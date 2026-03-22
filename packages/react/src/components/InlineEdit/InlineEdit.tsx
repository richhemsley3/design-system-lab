import { forwardRef, useState } from 'react';

export interface InlineEditProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onSave?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  saving?: boolean;
}

export const InlineEdit = forwardRef<HTMLDivElement, InlineEditProps>(
  (
    {
      value,
      onSave,
      size = 'md',
      error,
      saving,
      className,
      ...rest
    },
    ref,
  ) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);

    const handleConfirm = () => {
      onSave?.(draft);
      setEditing(false);
    };

    const handleCancel = () => {
      setDraft(value);
      setEditing(false);
    };

    const classes = [
      'sds-inline-edit',
      editing && 'sds-inline-edit--editing',
      error && 'sds-inline-edit--error',
      saving && 'sds-inline-edit--saving',
      size !== 'md' && `sds-inline-edit--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {editing ? (
          <>
            <input
              type="text"
              className="sds-inline-edit__input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
            />
            <div className="sds-inline-edit__actions">
              <button
                type="button"
                className="sds-inline-edit__confirm"
                onClick={handleConfirm}
                aria-label="Confirm"
              >
                &#10003;
              </button>
              <button
                type="button"
                className="sds-inline-edit__cancel"
                onClick={handleCancel}
                aria-label="Cancel"
              >
                &times;
              </button>
            </div>
            {error && (
              <div className="sds-inline-edit__error-msg">{error}</div>
            )}
          </>
        ) : (
          <div className="sds-inline-edit__display">
            <span>{value}</span>
            <button
              type="button"
              className="sds-inline-edit__trigger"
              onClick={() => {
                setDraft(value);
                setEditing(true);
              }}
              aria-label="Edit"
            />
          </div>
        )}
      </div>
    );
  },
);

InlineEdit.displayName = 'InlineEdit';
