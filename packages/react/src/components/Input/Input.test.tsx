import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders label and helper text', () => {
    render(<Input label="Email" helperText="We won't share it" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText("We won't share it")).toBeInTheDocument();
  });

  it('applies error class and displays error message', () => {
    const { getByRole } = render(<Input label="Name" error="Required field" />);
    const input = getByRole('textbox');
    expect(input).toHaveClass('sds-input--error');
    expect(screen.getByText('Required field')).toHaveClass('sds-field-error');
  });

  it('applies success class and displays success message', () => {
    const { getByRole } = render(<Input label="Name" success="Looks good!" />);
    const input = getByRole('textbox');
    expect(input).toHaveClass('sds-input--success');
    expect(screen.getByText('Looks good!')).toHaveClass('sds-field-success');
  });

  it('applies size classes', () => {
    const { unmount, getByRole } = render(<Input inputSize="sm" />);
    expect(getByRole('textbox')).toHaveClass('sds-input--sm');
    unmount();

    const { getByRole: getByRole2 } = render(<Input inputSize="lg" />);
    expect(getByRole2('textbox')).toHaveClass('sds-input--lg');
  });

  it('renders leading and trailing icons', () => {
    const { getByRole } = render(
      <Input
        leadingIcon={<span data-testid="lead-icon">L</span>}
        trailingIcon={<span data-testid="trail-icon">T</span>}
      />,
    );
    expect(screen.getByTestId('lead-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trail-icon')).toBeInTheDocument();
    const input = getByRole('textbox');
    expect(input).toHaveClass('sds-input--has-leading-icon');
    expect(input).toHaveClass('sds-input--has-trailing-icon');
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Input data-testid="custom-input" />);
    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(<Input onChange={onChange} />);
    await userEvent.type(getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('applies required class to label', () => {
    const { getByText } = render(<Input label="Email" required />);
    expect(getByText('Email')).toHaveClass('sds-field-label--required');
  });
});
