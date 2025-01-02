import axios from 'axios';
import { ValidationError } from '~/types';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const data = await readBody(event);

  // const URI = 'auth/jobseeker/register'; //Former URI
  const URI = 'auth/signup/jobseeker';

  try {
    const response = await axios.post(URI, data, {
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
