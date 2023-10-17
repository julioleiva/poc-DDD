import React from 'react';
import { IApplication } from '../../models/Application';

type AppItemActionsProps = {
  app: IApplication;
  onEdit: (app: IApplication) => void;
  onDelete: (appId: string) => void;
}

export const AppItemActions: React.FC<AppItemActionsProps> = ({ app, onEdit, onDelete }) => {
  return (
    <div className="flex space-x-4 mt-4">
      <button 
        onClick={() => onEdit(app)} 
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Edit
      </button>
      <button 
        onClick={() => onDelete(app.id)} 
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
      >
        Remove
      </button>
    </div>
  );
};
