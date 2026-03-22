import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders with default props', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstElementChild).toHaveClass('sds-card');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders compound sub-components with correct classes', () => {
    const { container } = render(
      <Card>
        <Card.Header title="Title" bordered actions={<button>Act</button>} />
        <Card.Body>Body content</Card.Body>
        <Card.Footer>Footer content</Card.Footer>
      </Card>,
    );

    const header = container.querySelector('.sds-card-header');
    expect(header).toHaveClass('sds-card-header--bordered');
    expect(screen.getByText('Title')).toHaveClass('sds-card-title');
    expect(container.querySelector('.sds-card-actions')).toBeInTheDocument();

    expect(container.querySelector('.sds-card-body')).toBeInTheDocument();
    expect(container.querySelector('.sds-card-footer')).toBeInTheDocument();
  });

  it('forwards ref on Card', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>R</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref on sub-components', () => {
    const headerRef = createRef<HTMLDivElement>();
    const bodyRef = createRef<HTMLDivElement>();
    const footerRef = createRef<HTMLDivElement>();

    render(
      <Card>
        <Card.Header ref={headerRef} />
        <Card.Body ref={bodyRef}>B</Card.Body>
        <Card.Footer ref={footerRef}>F</Card.Footer>
      </Card>,
    );

    expect(headerRef.current).toBeInstanceOf(HTMLDivElement);
    expect(bodyRef.current).toBeInstanceOf(HTMLDivElement);
    expect(footerRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<Card data-testid="my-card">A</Card>);
    expect(screen.getByTestId('my-card')).toBeInTheDocument();
  });
});
