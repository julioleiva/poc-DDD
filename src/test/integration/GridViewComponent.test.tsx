import { render, screen, fireEvent } from '@testing-library/react';
import GridViewComponent from '../../components/GridViewComponent';
import { IApplication } from '../../models/Application';

describe('GridViewComponent Integration with AppItemActions', () => {
  let items: IApplication[];
  let onEdit: jest.Mock;
  let onDelete: jest.Mock;

  beforeEach(() => {
    items = [
      { id: '1', title: 'Test App 1', route: 'test-route-1' },
    ];
    onEdit = jest.fn();
    onDelete = jest.fn();
    render(<GridViewComponent items={items} onEdit={onEdit} onDelete={onDelete} />);
  });

  it('calls onEdit when the Edit button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(items[0]);
  });

  it('calls onDelete when the Remove button is clicked', () => {
    fireEvent.click(screen.getByText('Remove'));
    expect(onDelete).toHaveBeenCalledWith(items[0].id);
  });

});
