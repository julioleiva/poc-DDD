import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppForm from '../../../components/AppForm/AppForm';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('<AppForm />', () => {
  const onSaveMock = jest.fn();

  beforeEach(() => {
    render(<AppForm onSave={onSaveMock} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display title error when title is empty and submit is clicked', () => {
    fireEvent.click(screen.getByText('Create'));
    expect(screen.getByText('Title is required.')).toBeInTheDocument();
  });

  it('should call onSave with the correct data when the form is submitted', () => {
    const appNameInput = screen.getByPlaceholderText('Application name');
    userEvent.type(appNameInput, 'Test App');

    fireEvent.click(screen.getByText('Create'));

    expect(onSaveMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test App',
      })
    );
  });

  it('should show toast error when an invalid route is provided', () => {
    const appNameInput = screen.getByPlaceholderText('Application name');
    const routeInput = screen.getByPlaceholderText('Route (optional)');
    
    userEvent.type(appNameInput, 'Test App');
    userEvent.type(routeInput, 'invalid/route');
    
    fireEvent.click(screen.getByText('Create'));

    expect(screen.getByText('The route contains invalid characters.')).toBeInTheDocument();
  });

});

