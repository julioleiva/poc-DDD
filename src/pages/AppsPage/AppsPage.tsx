import React from "react";
import { Modal } from "../../components/Modal";
import { AppService } from "../../services/AppService";
import { IApplication } from "../../models/Application";
import GridViewComponent from "../../components/GridViewComponent";
import ListViewComponent from "../../components/ListViewComponent";
import SearchComponent from "../../components/SearchComponent";
import AppForm from "../../components/AppForm/AppForm";
import ErrorBoundary from "../../utilitiies/ErrorBoundary";

const AppsPage: React.FC = () => {
  const [apps, setApps] = React.useState<IApplication[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentApp, setCurrentApp] = React.useState<IApplication | null>(null);
  const [view, setView] = React.useState<"list" | "grid">("grid");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
const [appToDelete, setAppToDelete] = React.useState<string | null>(null);


  const appService = React.useMemo(() => {
    return new AppService();
  }, []);

  React.useEffect(() => {
    const fetchApps = async () => {
      try {
        const apps = await appService.getApplications();
        setApps(apps);
      } catch (error) {
        console.error("Failed to fetch apps", error);
      }
    };

    fetchApps();
  }, [appService]);

  const handleDelete = (appId: string) => {
    setAppToDelete(appId);
    setShowDeleteConfirmation(true);
  };

  const handleEdit = (app: IApplication) => {
    setCurrentApp(app);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (appToDelete) {
      try {
        await appService.deleteApplication(appToDelete);
        setApps((prev) => prev.filter((app) => app.id !== appToDelete));
        setShowDeleteConfirmation(false);
      } catch (error) {
        console.error("Failed to delete app", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentApp(null);
  };

  const handleSave = async (editedApp: IApplication) => {
    try {
      const updatedApp = await appService.updateApplication(
        editedApp.id,
        editedApp
      );
      setApps((prev) =>
        prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
      );
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update app", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleNewAppSave = async (newApp: IApplication) => {
    try {
      const savedApp = await appService.createApplication(newApp); 
      setApps((prev) => [...prev, savedApp]);
    } catch (error) {
      console.error("Failed to save new app", error);
    }
  };
  

  const toggleView = () => {
    setView((prevView) => (prevView === "list" ? "grid" : "list"));
  };

  const filteredApps = apps.filter((app) =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  
  return (
    <div>
      <button onClick={toggleView}>Change View</button>
      <SearchComponent onSearch={handleSearch} />
      {view === "list" ? (
        <ListViewComponent
          items={filteredApps}
          onEdit={handleEdit}
          onDelete={handleDelete}  // Aquí se cambió confirmDelete por handleDelete
        />
      ) : (
        <GridViewComponent
          items={filteredApps}
          onEdit={handleEdit}
          onDelete={handleDelete}  // Aquí se cambió confirmDelete por handleDelete
        />
      )}

      <ErrorBoundary>
        <AppForm onSave={handleNewAppSave} />
      </ErrorBoundary>

      {currentApp && (
        <Modal
          isOpen={isModalOpen}
          title="Edit Application"
          content={
            <div>
              <label className="block mb-2 text-sm font-bold">
                Title:
                <input
                  value={currentApp.title}
                  onChange={(e) =>
                    setCurrentApp((prev) => {
                      if (prev) {
                        return { ...prev, title: e.target.value };
                      }
                      return null;
                    })
                  }
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
              <button
                onClick={() => handleSave(currentApp)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          }
          onClose={handleCloseModal}
        />
      )}

      {showDeleteConfirmation && (
       <Modal
       isOpen={showDeleteConfirmation}
       title="Delete Confirmation"
       content={
         <div className="text-center">
           <p className="mb-4 text-lg">Are you sure you want to delete this application?</p>
           <div className="flex justify-around">
             <button 
               onClick={confirmDelete}
               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 transition duration-300"
             >
               Confirm
             </button>
             <button 
               onClick={() => setShowDeleteConfirmation(false)}
               className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300"
             >
               Cancel
             </button>
           </div>
         </div>
       }
       onClose={() => setShowDeleteConfirmation(false)}
     />
     
      )}
    </div>
  );
};

export default AppsPage;
