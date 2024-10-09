import type { IJobApplications, IJobPost, IJobStatsData } from '~/types';
import { skipHydrate } from 'pinia';

export const JobStore = defineStore('job-store', () => {
  const jobList = ref<IJobPost[] | []>([]);
  const jobApplicationList = ref<IJobApplications[] | []>([]);
  const jobStats = ref<IJobStatsData | null>(null);

  function setJobList(data: IJobPost[]) {
    jobList.value = data;
  }

  function setJobStatsList(data: IJobStatsData) {
    jobStats.value = data;
  }

  function setUserJobApplicationList(data: IJobApplications[]) {
    jobApplicationList.value = data;
  }

  async function fetchUserJobApplications(token: string) {
    try {
      const response = await $fetch(
        '/api/job-applications/jobseeker/my-applications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function fetchUserJobApplicationStats(token: string) {
    try {
      const response = await $fetch(
        '/api/job-applications/jobseeker/user-stats',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function fetchRecruiterJobApplications(token: string) {
    try {
      const response = await $fetch(
        '/api/job-applications/recruiter/get-all-applications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function fetchRecruiterJobApplicationStats(token: string) {
    try {
      const response = await $fetch(
        '/api/job-applications/recruiter/recruiter-stats',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
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

  async function fetchJobseekerSingle(token: string, jobId: string) {
    try {
      const response = await $fetch('/api/jobs/get-single', {
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

  async function fetchSingleApplication(token: string, appId: string) {
    try {
      const response = await $fetch(
        '/api/job-applications/get-single-application',
        {
          query: {
            jobApplicationId: appId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function fetchSingleApplicationDetailed(token: string, appId: string) {
    try {
      const response = await $fetch(
        '/api/job-applications/recruiter/get-single-application-detailed',
        {
          query: {
            jobApplicationId: appId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function updateSingleApplicationData(
    token: string,
    appId: string,
    body: any
  ) {
    try {
      const response = await $fetch(
        '/api/job-applications/recruiter/update-application',
        {
          method: 'POST',
          query: {
            jobApplicationId: appId,
          },
          body: body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  return {
    jobList: skipHydrate(jobList),
    jobStats: skipHydrate(jobStats),
    jobApplicationList: skipHydrate(jobApplicationList),
    setJobList,
    setJobStatsList,
    setUserJobApplicationList,
    $api: {
      fetchRecruiterJobs,
      fetchRecruiterSingle,
      fetchJobStats,
      fetchJobseekerSingle,
      fetchUserJobApplications,
      fetchSingleApplication,
      fetchUserJobApplicationStats,
      fetchRecruiterJobApplicationStats,
      fetchRecruiterJobApplications,
      fetchSingleApplicationDetailed,
      updateSingleApplicationData,
    },
  };
});
