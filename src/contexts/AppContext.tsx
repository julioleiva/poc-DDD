import { ReactNode, useState, useEffect, Dispatch, SetStateAction, createContext, FC } from 'react';
import { IApplication } from '../models/Application';
import { AppService } from '../services/AppService';
import { serviceFactory } from '../services/factory';

type IAppContext = {
  applications: IApplication[];
  setApplications: Dispatch<SetStateAction<IApplication[]>>;
  addApplication: (application: IApplication) => void;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [applications, setApplications] = useState<IApplication[]>([]);

  const appService = serviceFactory.createAppService(AppService);

  useEffect(() => {
    const loadApplications = async () => {
      const apps = await appService.getApplications();
      setApplications(apps);
    };
  
    loadApplications();
  }, []);
  

  const addApplication = async (application: IApplication) => {
    const newApplication = await appService.addApplication(application);
    setApplications(prev => [...prev, newApplication]);
  };

  return (
    <AppContext.Provider value={{ applications, setApplications, addApplication }}>
      {children}
    </AppContext.Provider>
  );
};
