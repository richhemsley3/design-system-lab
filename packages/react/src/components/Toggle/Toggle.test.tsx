import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with default props', () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { hidden: true })).toBeInTheDocument();
  });

  it('applies the base sds-toggle class', () => {
    render(<Toggle label="Test" />);
    const label = screen.getByText('Test').closest('label');
    expect(label).toHaveClass('sds-toggle');
  });

  it('applies disabled class when disabled', () => {
    render(<Toggle label="Disabled" disabled />);
    const label = screen.getByText('Disabled').closest('label');
    expect(label).toHaveClass('sds-toggle--disabled');
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Toggle ref={ref} label="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Toggle label="Extra" data-testid="toggle-input" />);
    expect(screen.getByTestId('toggle-input')).toBeInTheDocument();
  });
});
