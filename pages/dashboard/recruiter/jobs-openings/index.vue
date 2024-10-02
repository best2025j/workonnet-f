<script setup lang="ts">
import { useJobStore } from '~/store';
import type {
  ApiSuccessResponse,
  IJobPostWithPagination,
} from '~/types';

definePageMeta({
  title: 'Jobs Openings',
  pageName: 'dashboard.recruiter.jobs-opening.index',
  layout: 'dashboard',
  middleware: ['auth', 'is-recruiter'],
});

const jobStore = useJobStore();
const authStore = useAuthStore();
const jobListPage = ref<{}>({});
const isLoading = ref(false);
const route = useRoute();

const draftsJobs = computed(() =>
  jobStore.jobList?.filter((job) => job.status === 'draft')
);
const archivedJob = computed(() =>
  jobStore.jobList.filter((job) => job.status === 'archived')
);
const activeJobs = computed(() =>
  jobStore.jobList.filter((job) => job.status === 'published')
);

const getMyJobs = async () => {
  try {
    if(!jobStore.jobList.length){
      isLoading.value = true;
    }
    const token = authStore.userToken;
    const response = await jobStore.$api.fetchRecruiterJobs(token);
    const responseData = response as ApiSuccessResponse;

    const { docs, ...other } = responseData.data as IJobPostWithPagination;
    jobListPage.value = other;
    jobStore.setJobList((responseData.data as IJobPostWithPagination).docs);

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

onBeforeMount(async () => {
  await getMyJobs();
});
</script>

<template>
  <div class="py-2 w-full h-full">
    <OpenJobsNav />
    <div v-if="isLoading" class="h-40 w-full flex items-center justify-center">
      <span class="loader-2"></span>
    </div>
    <div v-if="!isLoading" class="h-full">
      <!--  -->
      <div class="w-full">
        <!-- content for applied -->
        <div v-if="route?.query?.tab === JOB_OPENING_TABS.ACTIVE">
          <OpenJobsActive :job-list="activeJobs" />
        </div>
        <!-- content for in review -->

        <div v-if="route?.query?.tab === JOB_OPENING_TABS.IN_ACTIVE">
          <OpenJobsInactive :job-list="archivedJob" />
        </div>

        <!-- content for interview -->

        <div v-if="route?.query?.tab === JOB_OPENING_TABS.DRAFT">
          <OpenJobsDraft :job-list="draftsJobs" />
        </div>

        <!--  -->
      </div>
    </div>
  </div>
</template>
