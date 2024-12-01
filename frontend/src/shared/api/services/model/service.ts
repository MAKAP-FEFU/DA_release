import { apiExtract } from '../..';
import { ICreateModelBody, IDeleteModelsBody, IDeleteModelsResponse, IModel } from './model';

const initialRoute = '/api/models';

export const ModelService = {
  async getMyModels() {
    return apiExtract.get<IModel[]>(`${initialRoute}`);
  },
  async deleteModels(data: IDeleteModelsBody) {
    return apiExtract.post<IDeleteModelsResponse>(`${initialRoute}/delete`, data);
  },
  async createModel(data: ICreateModelBody) {
    return apiExtract.post<IModel>(`${initialRoute}/create`, { ...data, features: JSON.parse(data.features) });
  },
};
