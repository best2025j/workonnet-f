import axios from 'axios';
import { ValidationError, AuthRequest, AuthResponse } from '~/types';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const data = await readBody(event);

  const URI = 'auth/jobseeker/authenticate';

  // AuthResponse checks type of form data expected

  try {
    const response = await axios.post<AuthResponse>(URI, data, {
      baseURL: config.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      
    });

    return {
      status: 200,
      data: {
        accessToken: response.data.accessToken,
        user: response.data.user,
      }
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      return createError({
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Authentication failed',
        data: error.response?.data
      });
    }

    return createError({
      statusCode: 500,
      message: 'Internal server error'
    });
  }










  // try {
  //   const response = await axios.post(URI, data, {
  //     baseURL: config.apiBaseUrl,
  //   });
  //   return { status: 200, data: response.data.data };
  // } catch (e: any) {
  //   if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
  //     if (e.response?.data) {
  //       return createError({
  //         status: e.status,
  //         data: e.response?.data,
  //         stack: '',
  //       });
  //     }
  //     return createError({
  //       status: e.status,
  //       message: 'An error occurred',
  //       data: null,
  //       stack: '',
  //     });
  //   } else {
  //     return createError({
  //       status: 500,
  //       message: 'Internal server error',
  //       stack: '',
  //     });
  //   }
  // }
});
