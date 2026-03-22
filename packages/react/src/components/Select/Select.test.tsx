import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

describe('Select', () => {
  const options = (
    <>
      <option value="">Choose</option>
      <option value="a">Alpha</option>
      <option value="b">Beta</option>
    </>
  );

  it('renders with default props', () => {
    render(<Select>{options}</Select>);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveClass('sds-select');
  });

  it('renders label and helper text', () => {
    render(
      <Select label="Country" helperText="Select your country">
        {options}
      </Select>,
    );
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Select your country')).toBeInTheDocument();
  });

  it('applies error class and displays error message', () => {
    const { getByRole } = render(
      <Select label="Country" error="Selection required">
        {options}
      </Select>,
    );
    expect(getByRole('combobox')).toHaveClass('sds-select--error');
    expect(screen.getByText('Selection required')).toHaveClass('sds-field-error');
  });

  it('applies size classes', () => {
    const { unmount, getByRole } = render(<Select selectSize="sm">{options}</Select>);
    expect(getByRole('combobox')).toHaveClass('sds-select--sm');
    unmount();

    const { getByRole: getByRole2 } = render(<Select selectSize="lg">{options}</Select>);
    expect(getByRole2('combobox')).toHaveClass('sds-select--lg');
  });

  it('forwards ref to the select element', () => {
    const ref = createRef<HTMLSelectElement>();
    render(<Select ref={ref}>{options}</Select>);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Select data-testid="custom-select">{options}</Select>);
    expect(screen.getByTestId('custom-select')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(<Select onChange={onChange}>{options}</Select>);
    await userEvent.selectOptions(getByRole('combobox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('applies required class to label', () => {
    const { getByText } = render(
      <Select label="Country" required>
        {options}
      </Select>,
    );
    expect(getByText('Country')).toHaveClass('sds-field-label--required');
  });
});
