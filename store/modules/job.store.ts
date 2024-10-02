import type { IJobPost } from '~/types';
import { skipHydrate } from 'pinia';

export const JobStore = defineStore('job-store', () => {
  const jobList = ref<IJobPost[] | []>([]);

  function setJobList(data: IJobPost[]) {
    jobList.value = data;
  }

  async function fetchRecruiterJobs(token: string) {
    try {
      const response = await $fetch('/api/recruiter/job/fetch', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function fetchRecruiterSingle(token: string, jobId: string) {
    try {
      const response = await $fetch('/api/recruiter/job/fetch-single', {
        query: {
          jobListingId: jobId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  return {
    jobList: skipHydrate(jobList),
    setJobList,
    $api: {
      fetchRecruiterJobs,
      fetchRecruiterSingle,
    },
  };
});
