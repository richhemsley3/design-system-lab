import { forwardRef } from 'react';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  compact?: boolean;
  onCopy?: () => void;
}

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language,
      showLineNumbers,
      compact,
      onCopy,
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-code-block',
      showLineNumbers && 'sds-code-block--line-numbers',
      compact && 'sds-code-block--compact',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const lines = code.split('\n');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="sds-code-block__header">
          {language && (
            <span className="sds-code-block__language">{language}</span>
          )}
          {onCopy && (
            <button
              type="button"
              className="sds-code-block__copy"
              onClick={onCopy}
              aria-label="Copy code"
            >
              Copy
            </button>
          )}
        </div>
        <pre className="sds-code-block__content">
          {lines.map((line, i) => (
            <div key={i} className="sds-code-block__line">
              {showLineNumbers && (
                <span className="sds-code-block__line-number">{i + 1}</span>
              )}
              <span className="sds-code-block__line-text">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
