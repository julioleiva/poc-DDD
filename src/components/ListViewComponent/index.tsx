import { IApplication } from "../../models/Application";
import { AppItemActions } from "../AppItemsActions";

type ListViewProps = {
  items: IApplication[];
  onEdit: (app: IApplication) => void;
  onDelete: (appId: string) => void;
}

const ListViewComponent: React.FC<ListViewProps> = ({ items, onEdit, onDelete }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 p-4 rounded">
          <h2 className="text-xl font-bold">{item.title}</h2>
          <AppItemActions app={item} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </ul>
  );
};

export default ListViewComponent;
