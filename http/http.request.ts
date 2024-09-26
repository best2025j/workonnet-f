import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

let instance: AxiosInstance;

export const useAxiosInstance = () => {
  const defaultUrl = BACKEND_URL;

  if (!instance) {
    instance = axios.create({
      baseURL: defaultUrl,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    instance.interceptors.response.use((response: AxiosResponse) => {
      return response.data;
    });
  }

  return instance;
};

// Add a response interceptor
// http.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (
//       error.response.data.statusCode === 401 &&
//       error.response.data.errorMessage.includes('Unauthorized')
//     ) {
//       return;
//     }
//     return Promise.reject(error);
//   }
// );
