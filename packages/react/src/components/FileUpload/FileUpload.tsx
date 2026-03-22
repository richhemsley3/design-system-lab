import { forwardRef } from 'react';

/* ---------- FileUpload (Dropzone) ---------- */

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  hint?: string;
  dragover?: boolean;
  onFilesSelected?: (files: FileList) => void;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      accept,
      multiple,
      disabled,
      hint,
      dragover,
      onFilesSelected,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-dropzone',
      dragover && 'is-dragover',
      disabled && 'is-disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && onFilesSelected) {
        onFilesSelected(e.target.files);
      }
    };

    return (
      <div ref={ref} className={classes} {...rest}>
        <span className="sds-dropzone__icon" aria-hidden="true" />
        <div className="sds-dropzone__text">
          {children || 'Drop files here or click to upload'}
        </div>
        {hint && <div className="sds-dropzone__hint">{hint}</div>}
        <input
          type="file"
          className="sds-dropzone__input"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
        />
      </div>
    );
  },
);

FileUpload.displayName = 'FileUpload';

/* ---------- FileUploadList ---------- */

export interface FileUploadListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const FileUploadList = forwardRef<HTMLDivElement, FileUploadListProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['sds-file-upload__list', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

FileUploadList.displayName = 'FileUploadList';

/* ---------- FileUploadItem ---------- */

export interface FileUploadItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  meta?: string;
  progress?: number;
  complete?: boolean;
  error?: boolean;
}

export const FileUploadItem = forwardRef<HTMLDivElement, FileUploadItemProps>(
  ({ name, meta, progress, complete, error, className, ...rest }, ref) => {
    const classes = [
      'sds-file-upload__item',
      complete && 'sds-file-upload__item--complete',
      error && 'sds-file-upload__item--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <span className="sds-file-upload__item-name">{name}</span>
        {meta && <span className="sds-file-upload__item-meta">{meta}</span>}
        {progress !== undefined && (
          <div className="sds-file-upload__progress">
            <div
              className="sds-file-upload__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    );
  },
);

FileUploadItem.displayName = 'FileUploadItem';
