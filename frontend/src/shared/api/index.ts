import axios, { AxiosResponse } from 'axios';

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Authorization: '' },
});

ApiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

ApiClient.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        const resp = await ApiClient.get('/api/refresh');
        localStorage.setItem('token', resp.data.accessToken);
        return ApiClient.request(originalRequest);
      } catch (error) {
        console.log('error', error);
      }
    }
    throw error;
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const apiExtract = {
  get: <T>(...args: Parameters<typeof ApiClient.get<T>>) =>
    ApiClient.get<T>(...args).then(responseBody),
  post: <T>(...args: Parameters<typeof ApiClient.post<T>>) =>
    ApiClient.post<T>(...args).then(responseBody),
  put: <T>(...args: Parameters<typeof ApiClient.put<T>>) =>
    ApiClient.put<T>(...args).then(responseBody),
  patch: <T>(...args: Parameters<typeof ApiClient.patch<T>>) =>
    ApiClient.patch<T>(...args).then(responseBody),
  delete: <T>(...args: Parameters<typeof ApiClient.delete<T>>) => ApiClient.delete<T>(...args),
};
