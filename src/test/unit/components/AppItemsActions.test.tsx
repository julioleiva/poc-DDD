import { render, screen, fireEvent } from '@testing-library/react';
import {AppItemActions} from "../../../components/AppItemsActions";
import { IApplication } from '../../../models/Application';

describe('AppItemActions', () => {
  let app: IApplication;
  let onEdit: jest.Mock;
  let onDelete: jest.Mock;

  beforeEach(() => {
    app = { id: '1', title: 'Test App', route: 'test-route' };
    onEdit = jest.fn();
    onDelete = jest.fn();
    render(<AppItemActions app={app} onEdit={onEdit} onDelete={onDelete} />);
  });

  it('renders the edit and remove buttons', () => {
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('calls the onEdit function with the correct app when the edit button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(app);
  });

  it('calls the onDelete function with the correct app id when the remove button is clicked', () => {
    fireEvent.click(screen.getByText('Remove'));
    expect(onDelete).toHaveBeenCalledWith(app.id);
  });
});
