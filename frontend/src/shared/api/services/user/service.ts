import { apiExtract } from '../..';
import { ILoginBody, ILoginResponse, IUser } from './model';

const initialRoute = '/api/users';

export const UserService = {
  async getCurrentUser() {
    return apiExtract.get<IUser>(`${initialRoute}/me`);
  },

  async login(data: ILoginBody) {
    return apiExtract.post<ILoginResponse>(`${initialRoute}/auth`, data);
  },

  async register(data: ILoginBody) {
    return apiExtract.post<ILoginResponse>(`${initialRoute}/register`, data);
  },
};
