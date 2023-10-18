import { render, screen } from '@testing-library/react';
import GridViewComponent from '../../../components/GridViewComponent';
import { IApplication } from '../../../models/Application';

describe('GridViewComponent', () => {
  let items: IApplication[];
  let onEdit: jest.Mock;
  let onDelete: jest.Mock;

  beforeEach(() => {
    items = [
      { id: '1', title: 'Test App 1', route: 'test-route-1' },
      { id: '2', title: 'Test App 2', route: 'test-route-2' }
    ];
    onEdit = jest.fn();
    onDelete = jest.fn();
    render(<GridViewComponent items={items} onEdit={onEdit} onDelete={onDelete} />);
  });

  it('renders the items with titles', () => {
    items.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

});
