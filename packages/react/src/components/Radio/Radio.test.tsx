import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with default props', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByRole('radio', { hidden: true })).toBeInTheDocument();
  });

  it('applies the base sds-radio class', () => {
    render(<Radio label="Test" />);
    const label = screen.getByText('Test').closest('label');
    expect(label).toHaveClass('sds-radio');
  });

  it('applies disabled class when disabled', () => {
    render(<Radio label="Disabled" disabled />);
    const label = screen.getByText('Disabled').closest('label');
    expect(label).toHaveClass('sds-radio--disabled');
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Radio ref={ref} label="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Radio label="Extra" data-testid="radio-input" />);
    expect(screen.getByTestId('radio-input')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const onChange = vi.fn();
    render(<Radio label="Click me" onChange={onChange} />);
    await userEvent.click(screen.getByText('Click me'));
    expect(onChange).toHaveBeenCalledOnce();
  });
});
