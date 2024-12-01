import { apiExtract } from '../..';
import { ICreateSourceBody, IDeleteSourceBody, IDeleteSourcesResponse, ISource } from './model';

const initialRoute = '/api/sources';

export const SourceService = {
  async getMySources() {
    return apiExtract.get<ISource[]>(`${initialRoute}`);
  },
  async deleteSources(data: IDeleteSourceBody) {
    return apiExtract.post<IDeleteSourcesResponse>(`${initialRoute}/delete`, data);
  },
  async createSource(data: ICreateSourceBody) {
    return apiExtract.post<ISource>(`${initialRoute}/create`, { ...data, features: JSON.parse(data.features) });
  },
};
