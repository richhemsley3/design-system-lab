import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Table } from './Table';

describe('Table', () => {
  it('renders with default props', () => {
    const { container } = render(
      <Table>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(container.querySelector('.sds-table-container')).toBeInTheDocument();
    expect(screen.getByRole('table')).toHaveClass('sds-table');
  });

  it('applies striped, hoverable, and compact classes', () => {
    const { container } = render(
      <Table striped hoverable compact>
        <tbody>
          <tr>
            <td>A</td>
          </tr>
        </tbody>
      </Table>,
    );
    const table = container.querySelector('table');
    expect(table).toHaveClass('sds-table--striped');
    expect(table).toHaveClass('sds-table--hoverable');
    expect(table).toHaveClass('sds-table--compact');
  });

  it('forwards ref to the table element', () => {
    const ref = createRef<HTMLTableElement>();
    render(
      <Table ref={ref}>
        <tbody>
          <tr>
            <td>R</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Table data-testid="my-table">
        <tbody>
          <tr>
            <td>B</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(screen.getByTestId('my-table')).toBeInTheDocument();
  });

  it('renders children (thead, tbody, etc.)', () => {
    render(
      <Table>
        <thead>
          <tr>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
  });
});
