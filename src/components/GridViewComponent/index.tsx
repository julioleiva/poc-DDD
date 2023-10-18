import { AppItemActions } from "../AppItemsActions";
import { IApplication } from '../../models/Application';

type GridViewProps = {
  items: IApplication[]; 
  onEdit: (app: IApplication) => void;
  onDelete: (appId: string) => void;
}

const GridViewComponent: React.FC<GridViewProps> = ({ items, onEdit, onDelete }) => {
  return (
    <div data-cy="app-item" className="grid grid-cols-4 gap-4 p-4">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 p-4 rounded">
          <h2 className="text-xl font-bold">{item.title}</h2>
          <AppItemActions app={item} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default GridViewComponent;
