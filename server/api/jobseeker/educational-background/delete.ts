import axios from 'axios';
import { ValidationError } from '~/types';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const headers = getHeaders(event);
  const query = getQuery(event);
  const authHeader = headers['authorization'];

  try {
<<<<<<<< HEAD:server/api/jobseeker/educational-background/delete.ts
    const response = await axios.delete(
      `education-background/${query.educationBackgroundId}`,
========
    const response = await axios.get(
      `job-application-tracking/${query.jobApplicationId}`,
>>>>>>>> e626179272ac82fccbecff50f7b4309d443842ac:server/api/job-applications/recruiter/get-joblisting-applications.ts
      {
        baseURL: config.apiBaseUrl,
        headers: {
          Authorization: authHeader,
        },
      }
    );
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
