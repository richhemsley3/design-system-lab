import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders with default props', () => {
    render(<Alert>Something happened.</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('sds-alert', 'sds-alert--info');
    expect(screen.getByText('Something happened.')).toBeInTheDocument();
  });

  it('applies correct CSS class for each variant', () => {
    const { container, rerender } = render(<Alert variant="success">OK</Alert>);
    expect(container.querySelector('[role="alert"]')).toHaveClass('sds-alert--success');

    rerender(<Alert variant="warning">Warn</Alert>);
    expect(container.querySelector('[role="alert"]')).toHaveClass('sds-alert--warning');

    rerender(<Alert variant="error">Err</Alert>);
    expect(container.querySelector('[role="alert"]')).toHaveClass('sds-alert--error');
  });

  it('renders title and icon', () => {
    render(
      <Alert title="Heads up" icon={<span data-testid="icon">!</span>}>
        Body
      </Alert>,
    );
    expect(screen.getByText('Heads up')).toHaveClass('sds-alert__title');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders dismiss button and calls onDismiss', () => {
    const onDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Dismissible
      </Alert>,
    );
    const btn = screen.getByLabelText('Dismiss');
    expect(btn).toHaveClass('sds-alert__dismiss');
    fireEvent.click(btn);
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('applies compact class', () => {
    const { container } = render(<Alert compact>Compact</Alert>);
    expect(container.querySelector('[role="alert"]')).toHaveClass('sds-alert--compact');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Ref</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Alert data-testid="my-alert">Attr</Alert>);
    expect(screen.getByTestId('my-alert')).toBeInTheDocument();
  });
});
