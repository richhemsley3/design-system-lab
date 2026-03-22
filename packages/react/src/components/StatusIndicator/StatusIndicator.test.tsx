import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { StatusIndicator } from './StatusIndicator';

describe('StatusIndicator', () => {
  it('renders with default props', () => {
    const { container } = render(<StatusIndicator />);
    const root = container.firstElementChild;
    expect(root).toHaveClass('sds-status', 'sds-status--online');
    expect(container.querySelector('.sds-status__dot')).toBeInTheDocument();
  });

  it('applies correct CSS class for each status', () => {
    const { container, rerender } = render(
      <StatusIndicator status="critical" />,
    );
    expect(container.firstElementChild).toHaveClass('sds-status--critical');

    rerender(<StatusIndicator status="scanning" />);
    expect(container.firstElementChild).toHaveClass('sds-status--scanning');

    rerender(<StatusIndicator status="disconnected" />);
    expect(container.firstElementChild).toHaveClass(
      'sds-status--disconnected',
    );
  });

  it('applies size classes', () => {
    const { container, rerender } = render(
      <StatusIndicator size="sm" />,
    );
    expect(container.firstElementChild).toHaveClass('sds-status--sm');

    rerender(<StatusIndicator size="lg" />);
    expect(container.firstElementChild).toHaveClass('sds-status--lg');
  });

  it('renders label text', () => {
    render(<StatusIndicator label="Connected" />);
    const label = screen.getByText('Connected');
    expect(label).toHaveClass('sds-status__label');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<StatusIndicator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('spreads additional HTML attributes', () => {
    const { container } = render(
      <StatusIndicator data-testid="my-status" />,
    );
    expect(screen.getByTestId('my-status')).toBeInTheDocument();
  });
});
