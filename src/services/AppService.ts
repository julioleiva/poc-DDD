import { IApplication } from "../models/Application";

const BASE_URL = 'http://localhost:5001/applications';

export interface IAppService {
  getApplications(): Promise<IApplication[]>;
  createApplication(application: IApplication): Promise<IApplication>;
  updateApplication(id: string, updatedData: Partial<IApplication>): Promise<IApplication>;
  deleteApplication(id: string): Promise<void>;
  searchApplications(query: string): Promise<IApplication[]>;
}


export class AppService implements IAppService {
  async getApplications(): Promise<IApplication[]> {
    try {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const applications: IApplication[] = await response.json();
        return applications;
      } else {
        throw new Error("Response was not JSON!");
      }
    } catch (error) {
      console.error("A problem occurred with fetching applications: ", error);
      throw error;
    }
  }

  async createApplication(application: IApplication): Promise<IApplication> {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        throw new Error("Response was not JSON!");
      }
    } catch (error) {
      console.error("A problem occurred with creating an application: ", error);
      throw error;
    }
  }

  async updateApplication(id: string, updatedData: Partial<IApplication>): Promise<IApplication> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        throw new Error("Response was not JSON!");
      }
    } catch (error) {
      console.error("A problem occurred with updating the application: ", error);
      throw error;
    }
  }

  async deleteApplication(id: string): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return;
    } catch (error) {
      console.error("A problem occurred with deleting the application: ", error);
      throw error;
    }
  }

  async searchApplications(query: string): Promise<IApplication[]> {
    try {
      const response = await fetch(`${BASE_URL}?search=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        throw new Error("Response was not JSON!");
      }
    } catch (error) {
      console.error("A problem occurred with searching applications: ", error);
      throw error;
    }
  }

  async getApplicationById(id: string): Promise<IApplication> {
    try {
      const response = await fetch(`http://localhost:5001/applications/${id}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const application: IApplication = await response.json();
        return application;
      } else {
        throw new Error("Response was not JSON!");
      }
    } catch (error) {
      console.error("A problem occurred with fetching the application by ID: ", error);
      throw error;
    }
  }
  
  
  
  
}
