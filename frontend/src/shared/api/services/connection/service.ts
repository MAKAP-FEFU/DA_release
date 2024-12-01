import { apiExtract } from '../..';
import {
  IConnectBody,
  IConnection,
  ICreateConnection,
  IDeleteConnectionBody,
  IDeleteConnectionResponse,
} from './model';

const initialRoute = '/api/connections';

export const ConnectionService = {
  async getMyConnections() {
    return apiExtract.get<IConnection[]>(`${initialRoute}`);
  },
  async deleteConnections(data: IDeleteConnectionBody) {
    return apiExtract.post<IDeleteConnectionResponse>(`${initialRoute}/delete`, data);
  },
  async createConnection(data: ICreateConnection) {
    return apiExtract.post<IConnection>(`${initialRoute}/create`, data);
  },
  async connect(data: IConnectBody) {
    return apiExtract.post<Record<string, string>>(`${initialRoute}/connect`, data);
  },
};
