import { AppService } from '../../../services/AppService';
import { IApplication } from '../../../models/Application';
import fetchMock from 'jest-fetch-mock';

let appService: AppService;

beforeEach(() => {
  fetchMock.resetMocks();
  appService = new AppService();
});

describe('AppService Tests', () => {
  describe('getApplications method', () => {
    it('fetches applications successfully', async () => {
      const mockApplications: IApplication[] = [
        { id: '1', title: 'App 1', route: 'app-1', },
        { id: '2', title: 'App 2', route: 'app-2', },
      ];

      fetchMock.mockResponseOnce(JSON.stringify(mockApplications), { headers: { 'content-type': 'application/json' } });

      const applications = await appService.getApplications();

      expect(applications).toEqual(mockApplications);
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:5001/applications');
    });
  });
});
