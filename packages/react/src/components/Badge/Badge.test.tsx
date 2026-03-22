import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children with default props', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toHaveClass('sds-badge', 'sds-badge--default');
  });

  it('applies correct CSS class for each variant', () => {
    const { rerender } = render(<Badge variant="primary">P</Badge>);
    expect(screen.getByText('P')).toHaveClass('sds-badge--primary');

    rerender(<Badge variant="danger">D</Badge>);
    expect(screen.getByText('D')).toHaveClass('sds-badge--danger');

    rerender(<Badge variant="danger-solid">DS</Badge>);
    expect(screen.getByText('DS')).toHaveClass('sds-badge--danger-solid');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Badge size="sm">S</Badge>);
    expect(screen.getByText('S')).toHaveClass('sds-badge--sm');

    rerender(<Badge size="lg">L</Badge>);
    expect(screen.getByText('L')).toHaveClass('sds-badge--lg');
  });

  it('displays count and caps at maxCount', () => {
    const { rerender } = render(<Badge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();

    rerender(<Badge count={150} maxCount={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>R</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Badge data-testid="my-badge">A</Badge>);
    expect(screen.getByTestId('my-badge')).toBeInTheDocument();
  });
});
