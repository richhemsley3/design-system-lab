import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders with default props', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toHaveClass('sds-textarea');
  });

  it('renders label and helper text', () => {
    render(<Textarea label="Description" helperText="Optional" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('applies error class and displays error message', () => {
    const { getByRole } = render(<Textarea label="Bio" error="Too short" />);
    expect(getByRole('textbox')).toHaveClass('sds-textarea--error');
    expect(screen.getByText('Too short')).toHaveClass('sds-field-error');
  });

  it('displays character count', () => {
    render(
      <Textarea showCharCount maxLength={100} defaultValue="Hello" />,
    );
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('applies over class when exceeding maxLength', async () => {
    render(<Textarea showCharCount maxLength={3} defaultValue="Hello" />);
    expect(screen.getByText('5/3')).toHaveClass('sds-textarea-charcount--over');
  });

  it('forwards ref to the textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Textarea data-testid="custom-ta" />);
    expect(screen.getByTestId('custom-ta')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(<Textarea onChange={onChange} />);
    await userEvent.type(getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });
});
