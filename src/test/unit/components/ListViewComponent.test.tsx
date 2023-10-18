import { render, screen } from '@testing-library/react';
import ListViewComponent from '../../../components/ListViewComponent';
import { IApplication } from '../../../models/Application';

describe('ListViewComponent', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const dummyItems: IApplication[] = [
    { id: '1', title: 'App 1', route: 'route1' },
    { id: '2', title: 'App 2', route: 'route2' }
  ];

  beforeEach(() => {
    render(<ListViewComponent items={dummyItems} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
  });

  it('renders the items provided', () => {
    expect(screen.getByText('App 1')).toBeInTheDocument();
    expect(screen.getByText('App 2')).toBeInTheDocument();
  });

});

