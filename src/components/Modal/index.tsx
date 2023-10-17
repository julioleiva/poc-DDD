import React from 'react';

type ModalProps = {
  isOpen: boolean;
  title: string;
  content: JSX.Element;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-3/4 max-w-xl">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {content}
        <button 
          onClick={onClose}
          className="mt-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
