<script setup lang="ts">
import {
  JOB_APPLICATION_STATUS,
  type ApiSuccessResponse,
  type IJobApplicationsWithPagination,
} from '~/types';

definePageMeta({
  title: 'My Applications',
  pageName: 'dashboard.jobseeker.my-applications.index',
  layout: 'dashboard',
  middleware: ['auth', 'is-jobseeker'],
});

const jobStore = useJobStore();
const authStore = useAuthStore();
const jobListPage = ref<{}>({});
const isLoading = ref(false);
const route = useRoute();

const pendingApps = computed(() =>
  jobStore.jobApplicationList?.filter(
    (job) => job.status === JOB_APPLICATION_STATUS.PENDING
  )
);

const reviewApps = computed(() =>
  jobStore.jobApplicationList.filter(
    (job) => job.status === JOB_APPLICATION_STATUS.IN_REVIEW
  )
);

const rejectedApps = computed(() =>
  jobStore.jobApplicationList.filter(
    (job) => job.status === JOB_APPLICATION_STATUS.REJECTED
  )
);

const interviewApps = computed(() =>
  jobStore.jobApplicationList.filter(
    (job) => job.status === JOB_APPLICATION_STATUS.INTERVIEW
  )
);

const offeredApps = computed(() =>
  jobStore.jobApplicationList.filter(
    (job) => job.status === JOB_APPLICATION_STATUS.ACCEPTED
  )
);

const getMyJobs = async () => {
  try {
    if (!jobStore.jobApplicationList.length) {
      isLoading.value = true;
    }
    const token = authStore.userToken;
    const response = await jobStore.$api.fetchUserJobApplications(token);
    const responseData = response as ApiSuccessResponse;

    const { docs, ...other } =
      responseData.data as IJobApplicationsWithPagination;
    jobListPage.value = other;
    jobStore.setUserJobApplicationList(docs);

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

onBeforeMount(async () => {
  // if(jobStore.jobApplicationList.length){
  await getMyJobs();
  // }
});
</script>

<template>
  <div class="py-2 w-full">
    <AppNav />
    <div v-if="isLoading" class="h-40 w-full flex items-center justify-center">
      <span class="loader-2"></span>
    </div>
    <!--  -->
    <div v-else class="w-full">
      <!-- content for applied -->
      <div v-if="route?.query?.tab === TABS.APPLIED">
        <AppAppliedJobs
          v-if="pendingApps.length > 0"
          :jobAppList="pendingApps"
        />
        <AppBlank v-else />
      </div>
      <!-- content for in review -->

      <div v-if="route?.query?.tab === TABS.IN_REVIEW">
        <AppAppliedJobs v-if="reviewApps.length > 0" :jobAppList="reviewApps" />
        <AppBlank v-else />
      </div>

      <!-- content for interview -->

      <div v-if="route?.query?.tab === TABS.INTERVIEW">
        <AppAppliedJobs
          v-if="interviewApps.length > 0"
          :jobAppList="interviewApps"
        />
        <AppBlank v-else />
      </div>

      <!-- content for offered -->

      <div v-if="route?.query?.tab === TABS.OFFERED">
        <AppAppliedJobs
          v-if="offeredApps.length > 0"
          :jobAppList="offeredApps"
        />
        <AppBlank v-else />
      </div>
      <!-- content for rejected -->

      <div v-if="route?.query?.tab === TABS.REJECTED">
        <AppAppliedJobs
          v-if="rejectedApps.length > 0"
          :jobAppList="rejectedApps"
        />
        <AppBlank v-else />
      </div>
      <!--  -->
    </div>
  </div>
</template>
