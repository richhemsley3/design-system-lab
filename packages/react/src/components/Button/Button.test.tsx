import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('sds-btn', 'sds-btn--primary', 'sds-btn--md');
  });

  it('applies correct CSS class for each variant', () => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'danger-outline',
    ] as const;

    for (const variant of variants) {
      const { unmount, getByRole } = render(
        <Button variant={variant}>{variant}</Button>,
      );
      expect(getByRole('button')).toHaveClass(`sds-btn--${variant}`);
      unmount();
    }
  });

  it('applies correct CSS class for each size', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { unmount, getByRole } = render(<Button size={size}>{size}</Button>);
      expect(getByRole('button')).toHaveClass(`sds-btn--${size}`);
      unmount();
    }
  });

  it('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Button data-testid="custom-btn">Attrs</Button>);
    expect(screen.getByTestId('custom-btn')).toBeInTheDocument();
  });

  it('handles onClick events', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies icon classes', () => {
    const { getByRole } = render(
      <Button icon={<span>icon</span>} iconOnly>
        Hidden
      </Button>,
    );
    const btn = getByRole('button');
    expect(btn).toHaveClass('sds-btn--icon', 'sds-btn--icon-only');
    expect(btn).not.toHaveTextContent('Hidden');
  });
});
