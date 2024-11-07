<script setup lang="ts">
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  IJobPost,
  IJobPostWithPagination,
  IRecruiterDetails,
  IUserDetails,
} from '~/types';

definePageMeta({
  title: 'Find Jobs',
  pageName: 'dashboard.jobseeker.find-jobs.index',
  layout: 'dashboard',
  middleware: ['auth', 'is-jobseeker'],
});

const route = useRoute();
const userStore = useUserStore();
const authStore = useAuthStore();
const jobStore = useJobStore();
const currentJob = ref<IJobPost | null>(null);
const jobListPage = ref<{}>({});
const isLoading = ref(false);
const userData = computed<IUserDetails>(() => userStore.loggedInUserDetails);
const modalTrigger = ref(null);
const isErrorFetchingRecommendations = ref(false)

const jobsResult = ref<IJobPost[] | []>([]);

const showUpdateProfileModal = () => {
  (modalTrigger.value as unknown as any).showModal();
};

const getMyJobs = async (refresh: boolean = false) => {
  try {
    if (!jobStore.jobList.length && refresh === true) {
      isLoading.value = true;
    }
    const token = authStore.userToken;
    const response = await $fetch('/api/jobseeker/jobs/recommended', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response as ApiSuccessResponse;
    jobsResult.value = responseData.data;

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e: any) {
    const errorData = e.data as ApiErrorResponse;
    if(errorData.data.errorCode == 'EEEEEE') {
      isErrorFetchingRecommendations.value = true;
    }
  }
};

const getSingleJob = async () => {
  try {
    isLoading.value = true;
    const token = authStore.userToken;
    const response = await jobStore.$api.fetchJobseekerSingle(
      token,
      route.params.slug as string
    );
    const responseData = response as ApiSuccessResponse;
    currentJob.value = responseData.data;

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

const applyNow = async (jobId: string) => {
  // check user is not in draft mode.
  if (userData.value.status !== 'draft') {
    showUpdateProfileModal();
  }
  if (
    !userData.value?.resumeResource ||
    !userData.value.resumeResource?.resumeCv
  ) {
    showUpdateProfileModal();
  }
};

onBeforeMount(async () => {
  await getSingleJob();
  await getMyJobs();
});
</script>

<template>
  <div
    v-if="isLoading"
    class="h-60 py-40 w-full flex items-center justify-center"
  >
    <span class="loader-2"></span>
  </div>
  <div v-else class="w-full h-full text-black-600">
    <div class="p-4 bg-white rounded-10">
      <img
        v-if="(currentJob?.recruiter as IRecruiterDetails)?.photoHeader"
        :src="(currentJob?.recruiter as IRecruiterDetails)?.photoHeader?.url"
        class="w-full h-30 object-cover md:h-52 rounded"
        alt="no image yet..."
      />

      <div class="mt-12 md:pl-6 px-3 space-y-2 z-auto relative">
        <div
          class="bg-white rounded-full h-[70px] w-[70px] border-2 z-auto flex items-center justify-center absolute -top-24"
        >
          <img
            v-if="(currentJob?.recruiter as IRecruiterDetails)?.photo"
            :src="(currentJob?.recruiter as IRecruiterDetails)?.photo?.url"
            class="w-[70px] h-[70px] rounded-full"
            alt="profile-image"
          />
        </div>

        <div class="flex flex-col md:flex-row justify-between">
          <div class="space-y-2 pt-1">
            <div class="flex items-center space-x-6">
              <h1 class="font-black text-xs md:text-base capitalize">
                {{ currentJob?.title }}
              </h1>
              <div class="space-x-2 flex items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM10 18.25C8.36831 18.25 6.77326 17.7661 5.41655 16.8596C4.05984 15.9531 3.00242 14.6646 2.378 13.1571C1.75358 11.6496 1.5902 9.99085 1.90853 8.3905C2.22685 6.79016 3.01259 5.32015 4.16637 4.16637C5.32016 3.01259 6.79017 2.22685 8.39051 1.90852C9.99085 1.59019 11.6497 1.75357 13.1571 2.37799C14.6646 3.00242 15.9531 4.05984 16.8596 5.41655C17.7661 6.77325 18.25 8.3683 18.25 10C18.2475 12.1873 17.3775 14.2843 15.8309 15.8309C14.2843 17.3775 12.1873 18.2475 10 18.25ZM16 10C16 10.1989 15.921 10.3897 15.7803 10.5303C15.6397 10.671 15.4489 10.75 15.25 10.75H10C9.80109 10.75 9.61033 10.671 9.46967 10.5303C9.32902 10.3897 9.25 10.1989 9.25 10V4.75C9.25 4.55109 9.32902 4.36032 9.46967 4.21967C9.61033 4.07902 9.80109 4 10 4C10.1989 4 10.3897 4.07902 10.5303 4.21967C10.671 4.36032 10.75 4.55109 10.75 4.75V9.25H15.25C15.4489 9.25 15.6397 9.32902 15.7803 9.46967C15.921 9.61032 16 9.80109 16 10Z"
                    fill="#343330"
                  />
                </svg>
                <h1 class="text-xs">
                  Posted {{ formatTimeDiffHuman(currentJob!.createdAt) }}
                </h1>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="space-y-2">
                <h1 class="text-xs">
                  {{ (currentJob?.recruiter as IRecruiterDetails).companyName }}
                </h1>
                <h1 class="text-xs">
                  {{ (currentJob?.recruiter as IRecruiterDetails).location }}
                </h1>
              </div>
            </div>
          </div>

          <div>
            <div class="space-x-2 flex items-center mt-4 md:mt-0">
              <h1 class="md:text-lg text-sm font-black">
                NGN{{ formatCurrency(currentJob!.expectedSalary) }}/month
              </h1>
            </div>

            <div class="flex justify-end">
              <button
                @click="applyNow(currentJob!.id)"
                class="md:px-4 w-full mt-4 py-3 rounded-8 text-[10px] md:text-base text-white bg-primary-1"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- levels -->
    <div
      class="py-4 flex flex-col md:flex-row space-y-3 items-center justify-center w-full md:space-x-4"
    >
      <div
        class="p-2 h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-sm">Experience Level</h1>
        <p class="font-black text-base capitalize">{{ currentJob?.level }}</p>
      </div>
      <div
        class="p-2 h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-sm">Job Type</h1>
        <p class="font-black text-base capitalize">{{ currentJob?.jobType }}</p>
      </div>
      <div
        class="p-2 h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-sm">Work Type</h1>
        <p class="font-black text-base capitalize">Remote</p>
      </div>
      <div
        class="p-2 h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-sm">Salary</h1>
        <p class="font-black text-base">
          NGN{{ formatCurrency(currentJob!.expectedSalary) }}/month
        </p>
      </div>
      <div
        class="p-2 h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-sm">Location</h1>
        <p class="font-black text-base">
          {{ (currentJob?.recruiter as IRecruiterDetails).location }}
        </p>
      </div>
    </div>

    <!-- about the company -->
    <div class="gap-x-4 flex flex-col md:flex-row">
      <div class="bg-white p-4 rounded-10 h-full">
        <div class="space-y-2 py-2">
          <h1 class="font-black">About the company</h1>
          <p class="md:text-sm text-xs tracking-wider">
            {{ (currentJob?.recruiter as IRecruiterDetails)?.bio }}
          </p>
        </div>
        <!--  -->
        <div class="pt-4">
          <h1 class="font-black text-sm">Job Description</h1>
          <div class="space-y-1 py-4 text-xs md:text-sm">
            <p>
              {{ currentJob?.description }}
            </p>
          </div>
        </div>
        <!--  -->
        <div class="pt-4">
          <h1 class="font-black text-sm">Requirements</h1>
          <ul class="space-y-1 list-disc pl-6 py-4 text-xs md:text-sm">
            <li
              v-for="(requirement, index) in currentJob?.requirements"
              :key="index"
            >
              {{ requirement }}
            </li>
          </ul>
        </div>
        <!--  -->
        <div class="pt-4">
          <h1 class="font-black text-sm">Benefits</h1>
          <ul class="space-y-1 list-disc pl-6 py-4 text-xs md:text-sm">
            <li v-for="(benefit, index) in currentJob?.benefits" :key="index">
              {{ benefit }}
            </li>
          </ul>
        </div>
        <!--  -->
        <div class="pt-4">
          <h1 class="font-black text-sm">Must have Skills</h1>
          <ul class="space-y-1 list-disc pl-6 py-4 text-xs md:text-sm">
            <li v-for="(skill, index) in currentJob?.skills" :key="index">
              {{ skill }}
            </li>
          </ul>
        </div>
        <!--  -->
        <div class="pt-4">
          <h1 class="font-black text-sm">How to apply</h1>
          <div class="space-y-1 pl-1 py-4 text-xs md:text-sm">
            <p>Click on the apply button above</p>
          </div>
        </div>
      </div>

      <!--  -->
      <div>
        <div
          class="bg-gradient-to-r from-primary-1 to-primary-2 rounded-10 p-4 w-full my-4 md:my-0 md:w-[440px] text-white"
        >
          <div class="space-y-4">
            <h1 class="md:text-base text-sm font-black">
              Never Miss to The Latest Jobs
            </h1>
            <p class="md:text-sm text-xs">
              Be the first to get latest job right to your inbox. We'll send you
              the latest and greatest jobs that match your criteria everyday.
            </p>
            <button
              class="bg-white text-primary-1 h-10 font-black text-xs rounded-10 w-full"
            >
              Keep me updated
            </button>
          </div>
        </div>

        <div class="pt-4 pb-1">
          <h1 class="font-semibold">Recommended jobs</h1>
        </div>
        <!--  cards-->
        <div v-if="jobsResult && jobsResult.length" class="py-4 space-y-4">
          <div
            v-for="(job, index) in jobsResult"
            :key="index"
            class="bg-white rounded-10 w-full"
          >
            <div class="flex items-center justify-between border-b-2 p-3">
              <div class="flex items-center">
                <img
                  v-if="(job?.recruiter as IRecruiterDetails)?.photo"
                  :src="(job?.recruiter as IRecruiterDetails)?.photo?.url"
                  alt="Google"
                  class="w-10 h-10 rounded"
                />
                <div class="pl-4">
                  <span
                    class="block text-sm md:text-base font-black capitalize"
                    >{{ job.title }}</span
                  >
                  <span class="text-xs font-semimedium text-gray-500">{{
                    (job?.recruiter as IRecruiterDetails).companyName
                  }}</span>
                </div>
              </div>

              <div class="flex md:space-x-4 items-center relative md:right-5">
                <span
                  class="px-3 py-1 rounded-10 text-xs font-black text-success-600"
                  >80% match</span
                >
                <span
                  class="px-4 py-2 rounded-20 bg-gray-100 text-xs text-gray-500"
                  >Apply</span
                >
              </div>
            </div>

            <div
              class="flex justify-between items-center px-4 py-4 bg-white-100"
            >
              <div class="flex items-center space-x-6">
                <div class="">
                  <div class="flex space-x-2 items-center mt-2 p-2">
                    <svg
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 4C6.38193 4 5.77775 4.18328 5.26384 4.52666C4.74994 4.87004 4.3494 5.3581 4.11288 5.92911C3.87635 6.50013 3.81447 7.12847 3.93505 7.73466C4.05562 8.34085 4.35325 8.89767 4.79029 9.33471C5.22733 9.77175 5.78415 10.0694 6.39034 10.19C6.99653 10.3105 7.62487 10.2486 8.19589 10.0121C8.7669 9.7756 9.25496 9.37506 9.59834 8.86116C9.94172 8.34725 10.125 7.74307 10.125 7.125C10.125 6.2962 9.79576 5.50134 9.20971 4.91529C8.62366 4.32924 7.8288 4 7 4ZM7 9C6.62916 9 6.26665 8.89003 5.95831 8.68401C5.64996 8.47798 5.40964 8.18514 5.26773 7.84253C5.12581 7.49992 5.08868 7.12292 5.16103 6.75921C5.23337 6.39549 5.41195 6.0614 5.67417 5.79917C5.9364 5.53695 6.27049 5.35837 6.63421 5.28603C6.99792 5.21368 7.37492 5.25081 7.71753 5.39273C8.06014 5.53464 8.35298 5.77496 8.55901 6.08331C8.76503 6.39165 8.875 6.75416 8.875 7.125C8.875 7.62228 8.67746 8.09919 8.32583 8.45083C7.97419 8.80246 7.49728 9 7 9ZM7 0.25C5.17727 0.252068 3.42979 0.97706 2.14092 2.26592C0.85206 3.55479 0.127068 5.30227 0.125 7.125C0.125 9.57812 1.25859 12.1781 3.40625 14.6445C4.37127 15.759 5.45739 16.7626 6.64453 17.6367C6.74962 17.7103 6.87482 17.7498 7.00312 17.7498C7.13143 17.7498 7.25663 17.7103 7.36172 17.6367C8.54668 16.7623 9.63069 15.7587 10.5938 14.6445C12.7383 12.1781 13.875 9.57812 13.875 7.125C13.8729 5.30227 13.1479 3.55479 11.8591 2.26592C10.5702 0.97706 8.82273 0.252068 7 0.25ZM7 16.3438C5.70859 15.3281 1.375 11.5977 1.375 7.125C1.375 5.63316 1.96763 4.20242 3.02252 3.14752C4.07742 2.09263 5.50816 1.5 7 1.5C8.49184 1.5 9.92258 2.09263 10.9775 3.14752C12.0324 4.20242 12.625 5.63316 12.625 7.125C12.625 11.5961 8.29141 15.3281 7 16.3438Z"
                        fill="#343330"
                      />
                    </svg>
                    <span class="text-xs text-gray-700">{{
                      (currentJob?.recruiter as IRecruiterDetails).location
                    }}</span>
                  </div>

                  <div class="flex space-x-2 items-center mt-2 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                      />
                    </svg>
                    <span class="text-xs text-gray-700">
                      NGN{{ formatCurrency(currentJob!.expectedSalary) }}/per
                      month</span
                    >
                  </div>

                  <div class="flex space-x-2 items-center mt-2 p-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0.875C7.39303 0.875 5.82214 1.35152 4.486 2.24431C3.14985 3.1371 2.10844 4.40605 1.49348 5.8907C0.87852 7.37535 0.717618 9.00901 1.03112 10.5851C1.34463 12.1612 2.11846 13.6089 3.25476 14.7452C4.39106 15.8815 5.8388 16.6554 7.4149 16.9689C8.99099 17.2824 10.6247 17.1215 12.1093 16.5065C13.594 15.8916 14.8629 14.8502 15.7557 13.514C16.6485 12.1779 17.125 10.607 17.125 9C17.1227 6.84581 16.266 4.78051 14.7427 3.25727C13.2195 1.73403 11.1542 0.877275 9 0.875ZM9 15.875C7.64026 15.875 6.31105 15.4718 5.18046 14.7164C4.04987 13.9609 3.16868 12.8872 2.64833 11.6309C2.12798 10.3747 1.99183 8.99237 2.2571 7.65875C2.52238 6.32513 3.17716 5.10013 4.13864 4.13864C5.10013 3.17716 6.32514 2.52237 7.65876 2.2571C8.99238 1.99183 10.3747 2.12798 11.631 2.64833C12.8872 3.16868 13.9609 4.04987 14.7164 5.18045C15.4718 6.31104 15.875 7.64025 15.875 9C15.8729 10.8227 15.1479 12.5702 13.8591 13.8591C12.5702 15.1479 10.8227 15.8729 9 15.875ZM14 9C14 9.16576 13.9342 9.32473 13.8169 9.44194C13.6997 9.55915 13.5408 9.625 13.375 9.625H9C8.83424 9.625 8.67527 9.55915 8.55806 9.44194C8.44085 9.32473 8.375 9.16576 8.375 9V4.625C8.375 4.45924 8.44085 4.30027 8.55806 4.18306C8.67527 4.06585 8.83424 4 9 4C9.16576 4 9.32474 4.06585 9.44195 4.18306C9.55916 4.30027 9.625 4.45924 9.625 4.625V8.375H13.375C13.5408 8.375 13.6997 8.44085 13.8169 8.55806C13.9342 8.67527 14 8.83424 14 9Z"
                        fill="#343330"
                      />
                    </svg>
                    <span class="text-xs text-gray-700"
                      >Posted {{ formatTimeDiffHuman(job.createdAt) }}</span
                    >
                  </div>
                </div>

                <div class="">
                  <div class="flex space-x-2 items-center mt-2 p-2">
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.875 3.375H12.75V2.75C12.75 2.25272 12.5525 1.77581 12.2008 1.42417C11.8492 1.07254 11.3723 0.875 10.875 0.875H7.125C6.62772 0.875 6.15081 1.07254 5.79917 1.42417C5.44754 1.77581 5.25 2.25272 5.25 2.75V3.375H2.125C1.79348 3.375 1.47554 3.5067 1.24112 3.74112C1.0067 3.97554 0.875 4.29348 0.875 4.625V14.625C0.875 14.9565 1.0067 15.2745 1.24112 15.5089C1.47554 15.7433 1.79348 15.875 2.125 15.875H15.875C16.2065 15.875 16.5245 15.7433 16.7589 15.5089C16.9933 15.2745 17.125 14.9565 17.125 14.625V4.625C17.125 4.29348 16.9933 3.97554 16.7589 3.74112C16.5245 3.5067 16.2065 3.375 15.875 3.375ZM6.5 2.75C6.5 2.58424 6.56585 2.42527 6.68306 2.30806C6.80027 2.19085 6.95924 2.125 7.125 2.125H10.875C11.0408 2.125 11.1997 2.19085 11.3169 2.30806C11.4342 2.42527 11.5 2.58424 11.5 2.75V3.375H6.5V2.75ZM11.5 4.625V14.625H6.5V4.625H11.5ZM2.125 4.625H5.25V14.625H2.125V4.625ZM15.875 14.625H12.75V4.625H15.875V14.625Z"
                        fill="#343330"
                      />
                    </svg>
                    <span class="text-xs capitalize">{{ job.location }}</span>
                  </div>

                  <div class="flex space-x-2 items-center mt-2 p-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0.875C7.39303 0.875 5.82214 1.35152 4.486 2.24431C3.14985 3.1371 2.10844 4.40605 1.49348 5.8907C0.87852 7.37535 0.717618 9.00901 1.03112 10.5851C1.34463 12.1612 2.11846 13.6089 3.25476 14.7452C4.39106 15.8815 5.8388 16.6554 7.4149 16.9689C8.99099 17.2824 10.6247 17.1215 12.1093 16.5065C13.594 15.8916 14.8629 14.8502 15.7557 13.514C16.6485 12.1779 17.125 10.607 17.125 9C17.1227 6.84581 16.266 4.78051 14.7427 3.25727C13.2195 1.73403 11.1542 0.877275 9 0.875ZM9 15.875C7.64026 15.875 6.31105 15.4718 5.18046 14.7164C4.04987 13.9609 3.16868 12.8872 2.64833 11.6309C2.12798 10.3747 1.99183 8.99237 2.2571 7.65875C2.52238 6.32513 3.17716 5.10013 4.13864 4.13864C5.10013 3.17716 6.32514 2.52237 7.65876 2.2571C8.99238 1.99183 10.3747 2.12798 11.631 2.64833C12.8872 3.16868 13.9609 4.04987 14.7164 5.18045C15.4718 6.31104 15.875 7.64025 15.875 9C15.8729 10.8227 15.1479 12.5702 13.8591 13.8591C12.5702 15.1479 10.8227 15.8729 9 15.875ZM14 9C14 9.16576 13.9342 9.32473 13.8169 9.44194C13.6997 9.55915 13.5408 9.625 13.375 9.625H9C8.83424 9.625 8.67527 9.55915 8.55806 9.44194C8.44085 9.32473 8.375 9.16576 8.375 9V4.625C8.375 4.45924 8.44085 4.30027 8.55806 4.18306C8.67527 4.06585 8.83424 4 9 4C9.16576 4 9.32474 4.06585 9.44195 4.18306C9.55916 4.30027 9.625 4.45924 9.625 4.625V8.375H13.375C13.5408 8.375 13.6997 8.44085 13.8169 8.55806C13.9342 8.67527 14 8.83424 14 9Z"
                        fill="#343330"
                      />
                    </svg>
                    <span class="text-xs capitalize">{{ job.jobType }}</span>
                  </div>

                  <div class="flex space-x-2 items-center mt-2 p-2">
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 0.75H11.5C11.0149 0.75 10.5364 0.862953 10.1025 1.07991C9.66853 1.29688 9.29108 1.61189 9 2C8.70892 1.61189 8.33147 1.29688 7.89754 1.07991C7.46362 0.862953 6.98514 0.75 6.5 0.75H1.5C1.16848 0.75 0.850537 0.881696 0.616116 1.11612C0.381696 1.35054 0.25 1.66848 0.25 2V12C0.25 12.3315 0.381696 12.6495 0.616116 12.8839C0.850537 13.1183 1.16848 13.25 1.5 13.25H6.5C6.99728 13.25 7.47419 13.4475 7.82583 13.7992C8.17746 14.1508 8.375 14.6277 8.375 15.125C8.375 15.2908 8.44085 15.4497 8.55806 15.5669C8.67527 15.6842 8.83424 15.75 9 15.75C9.16576 15.75 9.32473 15.6842 9.44194 15.5669C9.55915 15.4497 9.625 15.2908 9.625 15.125C9.625 14.6277 9.82254 14.1508 10.1742 13.7992C10.5258 13.4475 11.0027 13.25 11.5 13.25H16.5C16.8315 13.25 17.1495 13.1183 17.3839 12.8839C17.6183 12.6495 17.75 12.3315 17.75 12V2C17.75 1.66848 17.6183 1.35054 17.3839 1.11612C17.1495 0.881696 16.8315 0.75 16.5 0.75ZM6.5 12H1.5V2H6.5C6.99728 2 7.47419 2.19754 7.82583 2.54917C8.17746 2.90081 8.375 3.37772 8.375 3.875V12.625C7.83458 12.2183 7.17633 11.9989 6.5 12ZM16.5 12H11.5C10.8237 11.9989 10.1654 12.2183 9.625 12.625V3.875C9.625 3.37772 9.82254 2.90081 10.1742 2.54917C10.5258 2.19754 11.0027 2 11.5 2H16.5V12ZM11.5 3.875H14.625C14.7908 3.875 14.9497 3.94085 15.0669 4.05806C15.1842 4.17527 15.25 4.33424 15.25 4.5C15.25 4.66576 15.1842 4.82473 15.0669 4.94194C14.9497 5.05915 14.7908 5.125 14.625 5.125H11.5C11.3342 5.125 11.1753 5.05915 11.0581 4.94194C10.9408 4.82473 10.875 4.66576 10.875 4.5C10.875 4.33424 10.9408 4.17527 11.0581 4.05806C11.1753 3.94085 11.3342 3.875 11.5 3.875ZM15.25 7C15.25 7.16576 15.1842 7.32473 15.0669 7.44194C14.9497 7.55915 14.7908 7.625 14.625 7.625H11.5C11.3342 7.625 11.1753 7.55915 11.0581 7.44194C10.9408 7.32473 10.875 7.16576 10.875 7C10.875 6.83424 10.9408 6.67527 11.0581 6.55806C11.1753 6.44085 11.3342 6.375 11.5 6.375H14.625C14.7908 6.375 14.9497 6.44085 15.0669 6.55806C15.1842 6.67527 15.25 6.83424 15.25 7ZM15.25 9.5C15.25 9.66576 15.1842 9.82473 15.0669 9.94194C14.9497 10.0592 14.7908 10.125 14.625 10.125H11.5C11.3342 10.125 11.1753 10.0592 11.0581 9.94194C10.9408 9.82473 10.875 9.66576 10.875 9.5C10.875 9.33424 10.9408 9.17527 11.0581 9.05806C11.1753 8.94085 11.3342 8.875 11.5 8.875H14.625C14.7908 8.875 14.9497 8.94085 15.0669 9.05806C15.1842 9.17527 15.25 9.33424 15.25 9.5Z"
                        fill="#343330"
                      />
                    </svg>
                    <span class="text-xs">{{ job.level }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="py-4">
            <p v-if="!isErrorFetchingRecommendations">No recommendations yet, check again later</p>
            <p v-else>You do not have an active plan, please subscribe to get recommendations</p>
        </div>
      </div>
    </div>

    <!-- modals -->
    <dialog
      ref="modalTrigger"
      id="delete_modal"
      class="modal text-black-950 backdrop-blur-sm backdrop-opacity-2 backdrop-filter"
    >
      <div class="modal-box flex-col max-w-md flex items-center space-y-3">
        <div
          class="flex items-center justify-between w-full pb-3 -mt-3 border-b-2"
        >
          <div class="text-white">no text.</div>
          <h3 class="text-lg font-bold">Notice</h3>

          <form method="dialog">
            <button class="btn">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.726027 0.724657C0.970105 0.480579 1.36583 0.480579 1.60991 0.724657L13.2758 12.3905C13.5199 12.6346 13.5199 13.0303 13.2758 13.2744C13.0317 13.5185 12.636 13.5185 12.3919 13.2744L0.726027 1.60854C0.481949 1.36446 0.481949 0.968734 0.726027 0.724657Z"
                  fill="#57575B"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.274 0.724657C13.5181 0.968734 13.5181 1.36446 13.274 1.60854L1.60809 13.2744C1.36401 13.5185 0.968285 13.5185 0.724208 13.2744C0.48013 13.0303 0.480131 12.6346 0.724208 12.3905L12.3901 0.724657C12.6342 0.480579 13.0299 0.480579 13.274 0.724657Z"
                  fill="#57575B"
                />
              </svg>
            </button>
          </form>
        </div>

        <p class="py-2 w-2/3 text-sm text-center">
          Please complete your profile to apply for jobs
        </p>

        <div class="space-x-4 flex items-center justify-center w-full">
          <NuxtLink
            to="/dashboard/jobseeker/my-profile/edit"
            class="rounded-8 px-3.5 py-2 text-white text-xs bg-primary-1"
          >
            Complete my profile
          </NuxtLink>
        </div>
      </div>
    </dialog>
  </div>
</template>
