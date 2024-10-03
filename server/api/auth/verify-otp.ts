import axios from 'axios';
import { ValidationError } from '~/types';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const data = await readBody(event);

  try {
    const response = await axios.post('auth/jobseeker/verify-code', data, {
      baseURL: config.apiBaseUrl,
    });
    return { status: 200, data: response.data.data };
  } catch (e: any) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
      if (e.response?.data) {
        return createError({
          status: e.status,
          data: e.response?.data,
          stack: '',
        });
      }
      return createError({
        status: e.status,
        message: 'An error occurred',
        data: null,
        stack: '',
      });
    } else {
      return createError({
        status: 500,
        message: 'Internal server error',
        stack: '',
      });
    }
  }
});
