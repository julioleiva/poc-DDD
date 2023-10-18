import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../../../components/Modal';


describe('Modal component', () => {
  let isOpen: boolean;
  let title: string;
  let content: JSX.Element;
  let onClose: jest.Mock;
  let expectedContent: string;

  beforeEach(() => {
    isOpen = true;
    title = 'Test Modal Title';
    expectedContent = 'This is the modal content';
    content = <p>{expectedContent}</p>;
    onClose = jest.fn();
  });

  it('renders the modal when isOpen is true', () => {
    render(<Modal isOpen={isOpen} title={title} content={content} onClose={onClose} />);
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(expectedContent)).toBeInTheDocument();
    expect(screen.getByText('Cerrar')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(<Modal isOpen={false} title={title} content={content} onClose={onClose} />);
    
    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByText(expectedContent)).not.toBeInTheDocument();
    expect(screen.queryByText('Cerrar')).not.toBeInTheDocument();
  });

  it('calls onClose callback when close button is clicked', () => {
    render(<Modal isOpen={isOpen} title={title} content={content} onClose={onClose} />);

    fireEvent.click(screen.getByText('Cerrar'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

});

