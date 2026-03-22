import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials with default props', () => {
    render(<Avatar initials="JD" />);
    const avatar = screen.getByText('JD');
    expect(avatar).toHaveClass('sds-avatar');
  });

  it('renders an image when src is provided', () => {
    render(<Avatar src="/photo.jpg" alt="User" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/photo.jpg');
    expect(img.parentElement).toHaveClass('sds-avatar--image');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Avatar initials="XS" size="xs" />);
    expect(screen.getByText('XS')).toHaveClass('sds-avatar--xs');

    rerender(<Avatar initials="XL" size="xl" />);
    expect(screen.getByText('XL')).toHaveClass('sds-avatar--xl');
  });

  it('applies color classes', () => {
    render(<Avatar initials="TC" color="teal" />);
    expect(screen.getByText('TC')).toHaveClass('sds-avatar--teal');
  });

  it('renders status indicator', () => {
    const { container } = render(
      <Avatar initials="ST" status="online" />,
    );
    const dot = container.querySelector('.sds-avatar-status');
    expect(dot).toHaveClass('sds-avatar-status--online');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Avatar ref={ref} initials="R" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Avatar initials="A" data-testid="my-avatar" />);
    expect(screen.getByTestId('my-avatar')).toBeInTheDocument();
  });
});
