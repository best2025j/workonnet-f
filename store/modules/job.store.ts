import type { IJobPost, IJobStatsData } from '~/types';
import { skipHydrate } from 'pinia';

export const JobStore = defineStore('job-store', () => {
  const jobList = ref<IJobPost[] | []>([]);
  const jobStats = ref<IJobStatsData | null>(null);

  function setJobList(data: IJobPost[]) {
    jobList.value = data;
  }

  function setJobStatsList(data: IJobStatsData) {
    jobStats.value = data;
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

  async function fetchJobStats(token: string) {
    try {
      const response = await $fetch('/api/recruiter/job/stats', {
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
    jobStats: skipHydrate(jobStats),
    setJobList,
    setJobStatsList,
    $api: {
      fetchRecruiterJobs,
      fetchRecruiterSingle,
      fetchJobStats,
    },
  };
});
