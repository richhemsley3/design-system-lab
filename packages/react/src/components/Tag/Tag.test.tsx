import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders with default props', () => {
    render(<Tag>Default</Tag>);
    expect(screen.getByText('Default')).toHaveClass('sds-tag');
  });

  it('applies correct CSS class for each status', () => {
    const { rerender } = render(<Tag status="success">S</Tag>);
    expect(screen.getByText('S')).toHaveClass('sds-tag--success');

    rerender(<Tag status="warning">S</Tag>);
    expect(screen.getByText('S')).toHaveClass('sds-tag--warning');

    rerender(<Tag status="error">S</Tag>);
    expect(screen.getByText('S')).toHaveClass('sds-tag--error');

    rerender(<Tag status="purple">S</Tag>);
    expect(screen.getByText('S')).toHaveClass('sds-tag--purple');
  });

  it('applies outline variant class', () => {
    render(<Tag variant="outline">Outline</Tag>);
    expect(screen.getByText('Outline')).toHaveClass('sds-tag--outline');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Tag size="sm">Small</Tag>);
    expect(screen.getByText('Small')).toHaveClass('sds-tag--sm');

    rerender(<Tag size="lg">Large</Tag>);
    expect(screen.getByText('Large')).toHaveClass('sds-tag--lg');
  });

  it('renders a dot when dot prop is true', () => {
    const { container } = render(<Tag dot>Dotted</Tag>);
    expect(container.querySelector('.sds-tag-dot')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Tag ref={ref}>Ref</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Tag data-testid="my-tag">Attr</Tag>);
    expect(screen.getByTestId('my-tag')).toBeInTheDocument();
  });
});
