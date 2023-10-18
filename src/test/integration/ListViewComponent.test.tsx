import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListViewComponent from '../../components/ListViewComponent';
import { IApplication } from '../../models/Application'

describe('ListViewComponent integration with AppItemActions', () => {
  let mockOnEdit: jest.Mock;
  let mockOnDelete: jest.Mock;
  let dummyItems: IApplication[];

  beforeEach(() => {
    mockOnEdit = jest.fn();
    mockOnDelete = jest.fn();
    dummyItems = [
      { id: '1', title: 'App 1', route: 'route1' },
      { id: '2', title: 'App 2', route: 'route2' }
    ];

    render(<ListViewComponent items={dummyItems} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
  });

  it('renders the list of items as expected', () => {
     expect(screen.getByText('App 1')).toBeInTheDocument();
    expect(screen.getByText('App 2')).toBeInTheDocument();
  });

  it('calls the onEdit function with the correct app when the Edit button is clicked', async () => {
    expect(mockOnEdit).not.toHaveBeenCalled(); // Ensure mockOnEdit hasn't been called yet

    const editButtons = screen.getAllByText('Edit');
    expect(editButtons).toHaveLength(dummyItems.length); // Ensure we have the right amount of Edit buttons

    userEvent.click(editButtons[0]);

    await waitFor(() => expect(mockOnEdit).toHaveBeenCalledWith(dummyItems[0]));
  });

  it('calls the onDelete function with the correct app id when the Remove button is clicked', async () => {
    expect(mockOnDelete).not.toHaveBeenCalled(); // Ensure mockOnDelete hasn't been called yet

    const deleteButtons = screen.getAllByText('Remove');
    expect(deleteButtons).toHaveLength(dummyItems.length); // Ensure we have the right amount of Remove buttons

    userEvent.click(deleteButtons[0]);

    await waitFor(() => expect(mockOnDelete).toHaveBeenCalledWith(dummyItems[0].id));
  });
});
