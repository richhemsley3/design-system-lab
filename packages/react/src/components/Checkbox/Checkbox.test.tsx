import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { hidden: true })).toBeInTheDocument();
  });

  it('applies the base sds-checkbox class', () => {
    render(<Checkbox label="Test" />);
    const label = screen.getByText('Test').closest('label');
    expect(label).toHaveClass('sds-checkbox');
  });

  it('applies indeterminate class', () => {
    render(<Checkbox label="Indeterminate" indeterminate />);
    const label = screen.getByText('Indeterminate').closest('label');
    expect(label).toHaveClass('sds-checkbox--indeterminate');
  });

  it('applies disabled class when disabled', () => {
    render(<Checkbox label="Disabled" disabled />);
    const label = screen.getByText('Disabled').closest('label');
    expect(label).toHaveClass('sds-checkbox--disabled');
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Checkbox label="Extra" data-testid="cb-input" />);
    expect(screen.getByTestId('cb-input')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Click me" onChange={onChange} />);
    await userEvent.click(screen.getByText('Click me'));
    expect(onChange).toHaveBeenCalledOnce();
  });
});
