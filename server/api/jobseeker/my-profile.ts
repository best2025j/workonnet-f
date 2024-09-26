import axios from 'axios';
import { ValidationError } from '~/types';
import { BACKEND_URL } from '~/utils/common';

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const authHeader = headers['authorization'];

  try {
    const response = await axios.get(`${BACKEND_URL}users/my-profile`, {
      headers: {
        Authorization: authHeader,
      },
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
