import { forwardRef } from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'teal' | 'coral' | 'green' | 'gray';
  status?: 'online' | 'away' | 'busy' | 'offline';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      initials,
      src,
      alt = '',
      size = 'md',
      color,
      status,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'sds-avatar',
      size !== 'md' && `sds-avatar--${size}`,
      color && `sds-avatar--${color}`,
      src && 'sds-avatar--image',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {src ? <img src={src} alt={alt} /> : initials || children}
        {status && (
          <span
            className={`sds-avatar-status sds-avatar-status--${status}`}
          />
        )}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
