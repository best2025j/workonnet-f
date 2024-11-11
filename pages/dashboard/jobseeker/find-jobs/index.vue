<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';

import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  IJobPost,
  IJobPostWithPagination,
  IRecruiterDetails,
  IUserDetails,
} from '~/types';
import { removeEmptyKeys } from '~/utils/helper.utils';

definePageMeta({
  title: 'Find Jobs',
  pageName: 'dashboard.jobseeker.find-jobs.index',
  layout: 'dashboard',
  middleware: ['auth', 'is-jobseeker'],
});

enum CARD_LAYOUT {
  LIST = 'list',
  GRID = 'grid',
}

const toast = useToast();
const userStore = useUserStore();
const jobStore = useJobStore();
const authStore = useAuthStore();
const jobListPage = ref<{}>({});
const isLoading = ref(false);
const route = useRoute();
const userData = computed<IUserDetails>(() => userStore.loggedInUserDetails);
const modalTrigger = ref(null);
const isApplying = ref<boolean>(false);
const isErrorFetchingRecommendations = ref(false);
const isErrorFetchingMatched = ref(false);

const searchFormData = reactive({
  searchQuery: '',
  locationSearchQuery: '',
});

const recommendJobs = ref<IJobPost[] | []>([]);
const matchedJobs = ref<IJobPost[] | []>([]);

const jobsResult = computed(() => jobStore.jobList);
const currentLayout = ref<CARD_LAYOUT>(CARD_LAYOUT.LIST);

const handleLayoutChange = (newLayout: CARD_LAYOUT) => {
  currentLayout.value = newLayout;
};

const selectedLocationTypeFilter = ref<string | null>(null); // Initially, no filter is selected for locationType
const selectedJobTypeFilter = ref<string | null>(null); // Initially, no filter is selected for jobType

const locationTypeFilters = ref(['hybrid', 'onsite', 'remote']); // locationType enum values
const jobTypeFilters = ref(['contract', 'full-time', 'part-time']); // jobType enum values

const currentJobIndex = ref(0);

const clearFilters = () => {
  selectedLocationTypeFilter.value = null;
  selectedJobTypeFilter.value = null;
  searchFormData.searchQuery = ''
  searchFormData.locationSearchQuery = ''

};

// Method to handle selection of locationType
const selectLocationTypeFilter = (filter: string) => {
  if (selectedLocationTypeFilter.value === filter) {
    // If the selected filter is clicked again, unselect it
    selectedLocationTypeFilter.value = null;
  } else {
    // Update the selected filter
    selectedLocationTypeFilter.value = filter;
  }
};

// Method to handle selection of jobType
const selectJobTypeFilter = (filter: string) => {
  if (selectedJobTypeFilter.value === filter) {
    // If the selected filter is clicked again, unselect it
    selectedJobTypeFilter.value = null;
  } else {
    // Update the selected filter
    selectedJobTypeFilter.value = filter;
  }
};

// Computed property to get combined selected filters for UI
const selectedSearchAndQueryFilters = computed(() => {
  return {
    locationType: selectedLocationTypeFilter.value,
    jobType: selectedJobTypeFilter.value,
    location: searchFormData.locationSearchQuery,
    search:searchFormData. searchQuery,
  };
});

const searchJobsWithSearchForm = async () => {
  console.log(selectedSearchAndQueryFilters.value)
  if (
    !selectedSearchAndQueryFilters.value.search &&
    !selectedSearchAndQueryFilters.value.location
  )
    return;

  const cleanedQuery = removeEmptyKeys(selectedSearchAndQueryFilters.value);

  await getMyJobs(true, cleanedQuery);
};

const searchJobsWithFilter = async () => {
  // Add locationType filter to the query if selected
  if (
    !selectedSearchAndQueryFilters.value.locationType &&
    !selectedSearchAndQueryFilters.value.jobType
  ) {
    return;
  }

  const cleanedQuery = removeEmptyKeys(selectedSearchAndQueryFilters.value);

  await getMyJobs(true, cleanedQuery);
};

const setPlace = (value: any) => {
  searchFormData.locationSearchQuery = value.formatted_address;
};

const setCurrentJobIndex = (index: number) => {
  currentJobIndex.value = index;
};

const showUpdateProfileModal = () => {
  (modalTrigger.value as unknown as any).showModal();
};

const getMyJobsRecommended = async (refresh: boolean = false) => {
  try {
    const token = authStore.userToken;
    const response = await $fetch('/api/jobseeker/jobs/recommended', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response as ApiSuccessResponse;
    recommendJobs.value = responseData.data;

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e: any) {
    isLoading.value = false;
    const errorData = e.data as ApiErrorResponse;
    isErrorFetchingRecommendations.value = true;
    if (errorData.data.errorCode == 'EEEEEE') {
      isErrorFetchingRecommendations.value = true;
    }
  }
};

const getMyJobsMatched = async (refresh: boolean = false) => {
  try {
    const token = authStore.userToken;
    const response = await $fetch('/api/jobseeker/jobs/matched', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response as ApiSuccessResponse;
    matchedJobs.value = responseData.data;

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e: any) {
    isLoading.value = false;
    const errorData = e.data as ApiErrorResponse;
    isErrorFetchingMatched.value = true;
    if (errorData.data.errorCode == 'EEEEEE') {
      isErrorFetchingMatched.value = true;
    }
  }
};

const getMyJobs = async (refresh: boolean = false, query: {}) => {
  try {
    if (!jobStore.jobList.length && refresh === true) {
      isLoading.value = true;
    }
    const token = authStore.userToken;
    const response = await $fetch('/api/jobseeker/jobs/fetch-all', {
      query: { ...query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response as ApiSuccessResponse;

    const { docs, ...other } = responseData.data as IJobPostWithPagination;
    jobListPage.value = other;
    jobStore.setJobList((responseData.data as IJobPostWithPagination).docs);

    await getMyJobsRecommended();
    await getMyJobsMatched();
  } catch (e) {
    isLoading.value = false;
    console.log(e);
  }
};

const applyNow = async (jobId: string) => {
  // check user is not in draft mode.
  if (userData.value.status === 'draft') {
    showUpdateProfileModal();
  }

  if (
    !userData.value?.resumeResource ||
    !userData.value.resumeResource?.resumeCv
  ) {
    showUpdateProfileModal();
  }

  //

  try {
    isApplying.value = true;
    const token = authStore.userToken;
    await $fetch('/api/job-applications/jobseeker/apply', {
      method: 'POST',
      query: {
        jobListingId: jobId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success('You have successfully applied to this job', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isApplying.value = false;
    }, 1000);
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;
    if (errorData.data.errorCode === 'E00001') {
      toast.info('You have previously applied for this role', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    } else {
      toast.error('An error occurred try again', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    }

    setTimeout(() => {
      isApplying.value = false;
    }, 1000);
  }
};

onBeforeMount(async () => {
  await getMyJobs(false, {});
});
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 text-black-900">
    <div class="md:w-[65%] w-full">
      <div
        class="bg-info-100 text-black-700 p-4 rounded-10 space-y-2 w-full md:h-[164px] h-full"
      >
        <h3 class="font-black text-2xl">
          Discover your ideal career right here
        </h3>
        <p class="text-sm">
          Explore opportunities that suits your interest to achieve the career
          you want.
        </p>

        <!-- input search -->
        <div class="flex flex-col md:flex-row gap-2 w-full pt-2">
          <div class="relative dropdown dropdown-bottom flex flex-col w-full">
            <input
              type="text"
              v-model="searchFormData.searchQuery"
              placeholder="Search job title e.g Banker"
              class="pl-8 pr-3 outline-none h-11 placeholder:text-sm border border-gray-300 rounded-md"
            />

            <svg
              width="10"
              height="10"
              class="absolute left-2.5 top-3.5 h-4 w-4 text-gray-400"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9422 16.0577L13.0305 12.1468C14.1642 10.7856 14.7296 9.03977 14.6089 7.27238C14.4883 5.50499 13.6909 3.85217 12.3826 2.65772C11.0744 1.46328 9.35597 0.819195 7.58492 0.859445C5.81388 0.899695 4.12653 1.62118 2.87389 2.87383C1.62125 4.12647 0.899756 5.81382 0.859506 7.58486C0.819256 9.35591 1.46334 11.0743 2.65779 12.3825C3.85223 13.6908 5.50506 14.4882 7.27244 14.6089C9.03983 14.7295 10.7857 14.1642 12.1469 13.0304L16.0578 16.9421C16.1159 17.0002 16.1848 17.0463 16.2607 17.0777C16.3366 17.1091 16.4179 17.1253 16.5 17.1253C16.5821 17.1253 16.6634 17.1091 16.7393 17.0777C16.8152 17.0463 16.8841 17.0002 16.9422 16.9421C17.0003 16.8841 17.0463 16.8151 17.0777 16.7392C17.1092 16.6634 17.1253 16.5821 17.1253 16.4999C17.1253 16.4178 17.1092 16.3365 17.0777 16.2606C17.0463 16.1848 17.0003 16.1158 16.9422 16.0577ZM2.125 7.74993C2.125 6.63741 2.4549 5.54988 3.07298 4.62485C3.69106 3.69982 4.56957 2.97885 5.5974 2.55311C6.62524 2.12737 7.75624 2.01598 8.84738 2.23302C9.93852 2.45006 10.9408 2.98579 11.7275 3.77246C12.5141 4.55913 13.0499 5.56141 13.2669 6.65255C13.484 7.74369 13.3726 8.87469 12.9468 9.90253C12.5211 10.9304 11.8001 11.8089 10.8751 12.427C9.95005 13.045 8.86252 13.3749 7.75 13.3749C6.25866 13.3733 4.82888 12.7801 3.77435 11.7256C2.71981 10.6711 2.12665 9.24127 2.125 7.74993Z"
                fill="#343330"
              />
            </svg>
          </div>

          <div class="relative dropdown dropdown-bottom flex flex-col w-full">
            <GMapAutocomplete
              placeholder="Enter location, e.g Lagos, Nigeria"
              class="pl-8 pr-3 outline-none h-11 placeholder:text-sm border border-gray-300 rounded-md"
              v-model="searchFormData.locationSearchQuery"
              @place_changed="setPlace"
            >
            </GMapAutocomplete>

            <svg
              width="10"
              height="10"
              class="absolute left-2.5 top-3.5 h-4 w-4 text-gray-400"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 4C6.38193 4 5.77775 4.18328 5.26384 4.52666C4.74994 4.87004 4.3494 5.3581 4.11288 5.92911C3.87635 6.50013 3.81447 7.12847 3.93505 7.73466C4.05562 8.34085 4.35325 8.89767 4.79029 9.33471C5.22733 9.77175 5.78415 10.0694 6.39034 10.19C6.99653 10.3105 7.62487 10.2486 8.19589 10.0121C8.7669 9.7756 9.25496 9.37506 9.59834 8.86116C9.94172 8.34725 10.125 7.74307 10.125 7.125C10.125 6.2962 9.79576 5.50134 9.20971 4.91529C8.62366 4.32924 7.8288 4 7 4ZM7 9C6.62916 9 6.26665 8.89003 5.95831 8.68401C5.64996 8.47798 5.40964 8.18514 5.26773 7.84253C5.12581 7.49992 5.08868 7.12292 5.16103 6.75921C5.23337 6.39549 5.41195 6.0614 5.67417 5.79917C5.9364 5.53695 6.27049 5.35837 6.63421 5.28603C6.99792 5.21368 7.37492 5.25081 7.71753 5.39273C8.06014 5.53464 8.35298 5.77496 8.55901 6.08331C8.76503 6.39165 8.875 6.75416 8.875 7.125C8.875 7.62228 8.67746 8.09919 8.32583 8.45083C7.97419 8.80246 7.49728 9 7 9ZM7 0.25C5.17727 0.252068 3.42979 0.97706 2.14092 2.26592C0.85206 3.55479 0.127068 5.30227 0.125 7.125C0.125 9.57812 1.25859 12.1781 3.40625 14.6445C4.37127 15.759 5.45739 16.7626 6.64453 17.6367C6.74962 17.7103 6.87482 17.7498 7.00312 17.7498C7.13143 17.7498 7.25663 17.7103 7.36172 17.6367C8.54668 16.7623 9.63069 15.7587 10.5938 14.6445C12.7383 12.1781 13.875 9.57812 13.875 7.125C13.8729 5.30227 13.1479 3.55479 11.8591 2.26592C10.5702 0.97706 8.82273 0.252068 7 0.25ZM7 16.3438C5.70859 15.3281 1.375 11.5977 1.375 7.125C1.375 5.63316 1.96763 4.20242 3.02252 3.14752C4.07742 2.09263 5.50816 1.5 7 1.5C8.49184 1.5 9.92258 2.09263 10.9775 3.14752C12.0324 4.20242 12.625 5.63316 12.625 7.125C12.625 11.5961 8.29141 15.3281 7 16.3438Z"
                fill="#343330"
              />
            </svg>
          </div>

          <button
            @click="searchJobsWithSearchForm()"
            class="bg-primary-1 md:px-4 p-3 md:p-0 flex items-center space-x-2 md:space-x-0 capitalize font-black justify-center rounded-10"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5855 9.39804L10.523 14.4605C10.4174 14.5661 10.2743 14.6254 10.125 14.6254C9.97573 14.6254 9.83258 14.5661 9.72703 14.4605C9.62148 14.355 9.56219 14.2118 9.56219 14.0626C9.56219 13.9133 9.62148 13.7701 9.72703 13.6646L13.8298 9.56257H2.8125C2.66332 9.56257 2.52024 9.50331 2.41475 9.39782C2.30926 9.29233 2.25 9.14925 2.25 9.00007C2.25 8.85088 2.30926 8.70781 2.41475 8.60232C2.52024 8.49683 2.66332 8.43757 2.8125 8.43757H13.8298L9.72703 4.33554C9.62148 4.22999 9.56219 4.08684 9.56219 3.93757C9.56219 3.7883 9.62148 3.64515 9.72703 3.5396C9.83258 3.43405 9.97573 3.37476 10.125 3.37476C10.2743 3.37476 10.4174 3.43405 10.523 3.5396L15.5855 8.6021C15.6378 8.65434 15.6793 8.71638 15.7076 8.78466C15.7359 8.85295 15.7504 8.92615 15.7504 9.00007C15.7504 9.07399 15.7359 9.14719 15.7076 9.21547C15.6793 9.28376 15.6378 9.3458 15.5855 9.39804Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- btn -->
      <div class="flex items-center justify-between w-full">
        <div class="py-5 flex flex-wrap gap-3 justify-start w-full">
          <button
            v-for="(item, index) in jobTypeFilters"
            :key="index"
            class="gap-x-2 flex items-start md:p-2 px-4 rounded-10 md:text-xs text-[10px]"
            :class="[
              selectedJobTypeFilter === item
                ? 'bg-westside-200 text-primary-1 font-black'
                : ' bg-white',
            ]"
            @click="selectJobTypeFilter(item)"
          >
            <svg
              v-if="selectedJobTypeFilter === item"
              width="14"
              height="15"
              viewBox="0 0 17 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9422 1.06729L5.9422 11.0673C5.88415 11.1254 5.81522 11.1715 5.73935 11.203C5.66348 11.2344 5.58215 11.2506 5.50001 11.2506C5.41788 11.2506 5.33655 11.2344 5.26067 11.203C5.1848 11.1715 5.11587 11.1254 5.05782 11.0673L0.682824 6.69229C0.565549 6.57502 0.499664 6.41596 0.499664 6.2501C0.499664 6.08425 0.565549 5.92519 0.682824 5.80792C0.8001 5.69064 0.959159 5.62476 1.12501 5.62476C1.29086 5.62476 1.44992 5.69064 1.5672 5.80792L5.50001 9.74151L15.0578 0.182916C15.1751 0.0656402 15.3342 -0.000244142 15.5 -0.000244141C15.6659 -0.000244139 15.8249 0.0656402 15.9422 0.182916C16.0595 0.300191 16.1254 0.459251 16.1254 0.625103C16.1254 0.790956 16.0595 0.950016 15.9422 1.06729Z"
                fill="#FE8900"
              />
            </svg>
            <span class="capitalize">{{ item }}</span>
          </button>

          <button
            v-for="(item, index) in locationTypeFilters"
            :key="index"
            class="gap-x-2 flex items-start md:p-2 px-4 rounded-10 md:text-xs text-[10px]"
            :class="[
              selectedLocationTypeFilter === item
                ? 'bg-westside-200 text-primary-1 font-black'
                : ' bg-white',
            ]"
            @click="selectLocationTypeFilter(item)"
          >
            <svg
              v-if="selectedLocationTypeFilter === item"
              width="14"
              height="15"
              viewBox="0 0 17 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9422 1.06729L5.9422 11.0673C5.88415 11.1254 5.81522 11.1715 5.73935 11.203C5.66348 11.2344 5.58215 11.2506 5.50001 11.2506C5.41788 11.2506 5.33655 11.2344 5.26067 11.203C5.1848 11.1715 5.11587 11.1254 5.05782 11.0673L0.682824 6.69229C0.565549 6.57502 0.499664 6.41596 0.499664 6.2501C0.499664 6.08425 0.565549 5.92519 0.682824 5.80792C0.8001 5.69064 0.959159 5.62476 1.12501 5.62476C1.29086 5.62476 1.44992 5.69064 1.5672 5.80792L5.50001 9.74151L15.0578 0.182916C15.1751 0.0656402 15.3342 -0.000244142 15.5 -0.000244141C15.6659 -0.000244139 15.8249 0.0656402 15.9422 0.182916C16.0595 0.300191 16.1254 0.459251 16.1254 0.625103C16.1254 0.790956 16.0595 0.950016 15.9422 1.06729Z"
                fill="#FE8900"
              />
            </svg>
            <span class="capitalize">{{ item }}</span>
          </button>
        </div>

        <div class="flex-shrink-0 space-x-6">
          <button
            @click="searchJobsWithFilter()"
            class="text-primary-1 font-black md:text-xs text-[10px] py-3"
          >
            Search
          </button>

          <button
            @click="clearFilters()"
            class="text-primary-1 font-black md:text-xs text-[10px] py-3"
          >
            Clear Filters
          </button>
        </div>
      </div>
      <!-- btn 2 -->
      <div class="w-full flex space-x-3 justify-between pt-2">
        <FindJobAppNav />
        <button
          v-show="currentLayout.toString() === CARD_LAYOUT.GRID.toString()"
          @click="handleLayoutChange(CARD_LAYOUT.LIST)"
          class="bg-black-100 p-1 rounded-8"
        >
          <svg
            width="28"
            height="22"
            viewBox="0 0 28 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.5 11C27.5 11.2984 27.3815 11.5845 27.1705 11.7955C26.9595 12.0065 26.6734 12.125 26.375 12.125H1.625C1.32663 12.125 1.04048 12.0065 0.829505 11.7955C0.618527 11.5845 0.5 11.2984 0.5 11C0.5 10.7016 0.618527 10.4155 0.829505 10.2045C1.04048 9.99353 1.32663 9.875 1.625 9.875H26.375C26.6734 9.875 26.9595 9.99353 27.1705 10.2045C27.3815 10.4155 27.5 10.7016 27.5 11ZM1.625 3.125H26.375C26.6734 3.125 26.9595 3.00647 27.1705 2.79549C27.3815 2.58452 27.5 2.29837 27.5 2C27.5 1.70163 27.3815 1.41548 27.1705 1.20451C26.9595 0.993527 26.6734 0.875 26.375 0.875H1.625C1.32663 0.875 1.04048 0.993527 0.829505 1.20451C0.618527 1.41548 0.5 1.70163 0.5 2C0.5 2.29837 0.618527 2.58452 0.829505 2.79549C1.04048 3.00647 1.32663 3.125 1.625 3.125ZM26.375 18.875H1.625C1.32663 18.875 1.04048 18.9935 0.829505 19.2045C0.618527 19.4155 0.5 19.7016 0.5 20C0.5 20.2984 0.618527 20.5845 0.829505 20.7955C1.04048 21.0065 1.32663 21.125 1.625 21.125H26.375C26.6734 21.125 26.9595 21.0065 27.1705 20.7955C27.3815 20.5845 27.5 20.2984 27.5 20C27.5 19.7016 27.3815 19.4155 27.1705 19.2045C26.9595 18.9935 26.6734 18.875 26.375 18.875Z"
              fill="#343330"
            />
          </svg>
        </button>

        <button
          v-show="currentLayout.toString() === CARD_LAYOUT.LIST.toString()"
          @click="handleLayoutChange(CARD_LAYOUT.GRID)"
          class="bg-black-100 p-1 rounded-8"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.625 0.625H2.875C2.27826 0.625 1.70597 0.862053 1.28401 1.28401C0.862053 1.70597 0.625 2.27826 0.625 2.875V9.625C0.625 10.2217 0.862053 10.794 1.28401 11.216C1.70597 11.6379 2.27826 11.875 2.875 11.875H9.625C10.2217 11.875 10.794 11.6379 11.216 11.216C11.6379 10.794 11.875 10.2217 11.875 9.625V2.875C11.875 2.27826 11.6379 1.70597 11.216 1.28401C10.794 0.862053 10.2217 0.625 9.625 0.625ZM9.625 9.625H2.875V2.875H9.625V9.625ZM23.125 0.625H16.375C15.7783 0.625 15.206 0.862053 14.784 1.28401C14.3621 1.70597 14.125 2.27826 14.125 2.875V9.625C14.125 10.2217 14.3621 10.794 14.784 11.216C15.206 11.6379 15.7783 11.875 16.375 11.875H23.125C23.7217 11.875 24.294 11.6379 24.716 11.216C25.1379 10.794 25.375 10.2217 25.375 9.625V2.875C25.375 2.27826 25.1379 1.70597 24.716 1.28401C24.294 0.862053 23.7217 0.625 23.125 0.625ZM23.125 9.625H16.375V2.875H23.125V9.625ZM9.625 14.125H2.875C2.27826 14.125 1.70597 14.3621 1.28401 14.784C0.862053 15.206 0.625 15.7783 0.625 16.375V23.125C0.625 23.7217 0.862053 24.294 1.28401 24.716C1.70597 25.1379 2.27826 25.375 2.875 25.375H9.625C10.2217 25.375 10.794 25.1379 11.216 24.716C11.6379 24.294 11.875 23.7217 11.875 23.125V16.375C11.875 15.7783 11.6379 15.206 11.216 14.784C10.794 14.3621 10.2217 14.125 9.625 14.125ZM9.625 23.125H2.875V16.375H9.625V23.125ZM23.125 14.125H16.375C15.7783 14.125 15.206 14.3621 14.784 14.784C14.3621 15.206 14.125 15.7783 14.125 16.375V23.125C14.125 23.7217 14.3621 24.294 14.784 24.716C15.206 25.1379 15.7783 25.375 16.375 25.375H23.125C23.7217 25.375 24.294 25.1379 24.716 24.716C25.1379 24.294 25.375 23.7217 25.375 23.125V16.375C25.375 15.7783 25.1379 15.206 24.716 14.784C24.294 14.3621 23.7217 14.125 23.125 14.125ZM23.125 23.125H16.375V16.375H23.125V23.125Z"
              fill="#343330"
            />
          </svg>
        </button>
      </div>

      <div
        v-if="isLoading"
        class="h-60 w-full flex items-center justify-center"
      >
        <span class="loader-2"></span>
      </div>

      <div v-else>
        <div v-if="route?.query?.tab === 'all'">
          <div v-if="!jobsResult.length" class="pt-5">
            <h1>No jobs available</h1>
          </div>
          <!-- cards -->
          <div v-if="currentLayout.toString() === CARD_LAYOUT.GRID.toString()">
            <FindJobGridView
              :job-list="jobsResult"
              :currentJobIndex="currentJobIndex"
              v-on:setCurrentJobIndex="setCurrentJobIndex"
            />
          </div>
          <div v-if="currentLayout.toString() === CARD_LAYOUT.LIST.toString()">
            <FindJobListView
              :job-list="jobsResult"
              :currentJobIndex="currentJobIndex"
              v-on:setCurrentJobIndex="setCurrentJobIndex"
            />
          </div>
        </div>
        <div v-if="route?.query?.tab === 'recommended'">
          <div v-if="!recommendJobs.length" class="pt-5">
            <p v-if="!isErrorFetchingRecommendations">
              No recommendations available
            </p>
            <p v-else>
              You do not have an active plan, please subscribe to get
              recommendations
            </p>
          </div>
          <!-- cards -->
          <div v-if="currentLayout.toString() === CARD_LAYOUT.GRID.toString()">
            <FindJobGridView
              :job-list="recommendJobs"
              :currentJobIndex="currentJobIndex"
              v-on:setCurrentJobIndex="setCurrentJobIndex"
            />
          </div>
          <div v-if="currentLayout.toString() === CARD_LAYOUT.LIST.toString()">
            <FindJobListView
              :job-list="recommendJobs"
              :currentJobIndex="currentJobIndex"
              v-on:setCurrentJobIndex="setCurrentJobIndex"
            />
          </div>
        </div>
        <div v-if="route?.query?.tab === 'matched'">
          <div v-if="!matchedJobs.length" class="pt-5">
            <p v-if="!isErrorFetchingMatched">No matched jobs available</p>
            <p v-else>
              You do not have an active plan, please subscribe to get matched to
              jobs
            </p>
          </div>
          <!-- cards -->
          <div v-if="currentLayout.toString() === CARD_LAYOUT.GRID.toString()">
            <FindJobGridView
              :job-list="matchedJobs"
              :currentJobIndex="currentJobIndex"
              v-on:setCurrentJobIndex="setCurrentJobIndex"
            />
          </div>
          <div v-if="currentLayout.toString() === CARD_LAYOUT.LIST.toString()">
            <FindJobListView
              :job-list="matchedJobs"
              :currentJobIndex="currentJobIndex"
              v-on:setCurrentJobIndex="setCurrentJobIndex"
            />
          </div>
        </div>
      </div>
    </div>

    <!--  second div-->
    <div
      v-if="jobsResult.length && jobsResult[currentJobIndex] && !isLoading"
      class="bg-white md:w-[35%] w-full h-full hidden md:block rounded-10"
    >
      <div class="flex items-center flex-col space-y-3 py-4 border-b-2">
        <img
          v-if="(jobsResult[currentJobIndex].recruiter as IRecruiterDetails)?.photo"
          :src="(jobsResult[currentJobIndex].recruiter as IRecruiterDetails)?.photo?.url"
          :alt="(jobsResult[currentJobIndex].recruiter as IRecruiterDetails)?.companyName"
          class="h-10 w-10"
        />
        <h1 class="text base font-black capitalize">
          {{ jobsResult[currentJobIndex].title }}
        </h1>
        <p class="text-xs capitalize">
          {{
            (jobsResult[currentJobIndex].recruiter as IRecruiterDetails)
              .companyName
          }}
        </p>
      </div>

      <!--  -->
      <div class="flex gap-x-6 p-6 border-b-2">
        <div class="space-y-4">
          <div class="space-y-2">
            <h1 class="text-xs">Job Type</h1>
            <h1 class="font-black text-sm capitalize">
              {{ jobsResult[currentJobIndex].jobType }}
            </h1>
          </div>

          <div class="space-y-2">
            <h1 class="text-xs">Location</h1>
            <h1 class="font-black text-sm">
              {{
                (jobsResult[currentJobIndex].recruiter as IRecruiterDetails)
                  ?.location
              }}
            </h1>
          </div>

          <div class="space-y-2">
            <h1 class="text-xs">Salary</h1>
            <h1 class="font-black text-sm">
              {{
                formatCurrency(jobsResult[currentJobIndex].expectedSalary)
              }}/month
            </h1>
          </div>
        </div>
        <!--  -->
        <div class="space-y-4">
          <div class="space-y-2">
            <h1 class="text-xs">Work Type</h1>
            <h1 class="font-black text-sm capitalize">
              {{ jobsResult[currentJobIndex].location }}
            </h1>
          </div>

          <div class="space-y-2">
            <h1 class="text-xs">Experience</h1>
            <h1 class="font-black text-sm capitalize">
              {{ jobsResult[currentJobIndex].level }}
            </h1>
          </div>

          <div class="flex items-center space-x-2">
            <BtnPrimary
              :isLoading="isApplying"
              :disabled="isApplying"
              @click="applyNow(jobsResult[currentJobIndex].id)"
              class="bg-primary-1 px-4 py-3 md:text-xs text-[8px] rounded-8 text-white"
            >
              <template #text> Apply Now </template>
            </BtnPrimary>
            <!-- <button class="border-primary-1 px-4 border md:py-3 py-2 rounded-8">
              <svg
                width="12"
                height="17"
                viewBox="0 0 12 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.375 0.5H1.625C1.29348 0.5 0.975537 0.631696 0.741116 0.866116C0.506696 1.10054 0.375 1.41848 0.375 1.75V15.5C0.375055 15.6115 0.404959 15.721 0.461608 15.8171C0.518256 15.9132 0.599586 15.9924 0.697156 16.0464C0.794726 16.1005 0.904983 16.1274 1.01648 16.1245C1.12798 16.1215 1.23666 16.0888 1.33125 16.0297L6 13.1117L10.6695 16.0297C10.7641 16.0886 10.8727 16.1212 10.9841 16.124C11.0955 16.1268 11.2056 16.0998 11.303 16.0458C11.4005 15.9918 11.4817 15.9127 11.5383 15.8167C11.5949 15.7208 11.6249 15.6114 11.625 15.5V1.75C11.625 1.41848 11.4933 1.10054 11.2589 0.866116C11.0245 0.631696 10.7065 0.5 10.375 0.5ZM10.375 14.3727L6.33047 11.8453C6.23114 11.7832 6.11636 11.7503 5.99922 11.7503C5.88208 11.7503 5.7673 11.7832 5.66797 11.8453L1.625 14.3727V1.75H10.375V14.3727Z"
                  fill="#FE8900"
                />
              </svg>
            </button> -->
          </div>
        </div>
      </div>

      <!--  -->
      <div class="space-y-4 py-4">
        <div class="px-6 space-y-2">
          <h1 class="font-black">Description</h1>

          <div class="text-xs">
            <p>
              {{ jobsResult[currentJobIndex].description }}
            </p>
          </div>
        </div>
        <!--  -->
        <div class="px-6 space-y-2">
          <h1 class="font-black">Requirements</h1>
          <div class="px-4">
            <ul class="space-y-3 list-disc text-xs">
              <li
                v-for="(requirement, index) in jobsResult[currentJobIndex]
                  ?.requirements"
                :key="index"
                class=""
              >
                {{ requirement }}
              </li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="px-6 space-y-2">
          <h1 class="font-black">Benefits</h1>
          <div class="px-4">
            <ul class="space-y-3 list-disc text-xs">
              <li
                v-for="(benefit, index) in jobsResult[currentJobIndex]
                  ?.benefits"
                :key="index"
                class=""
              >
                {{ benefit }}
              </li>
            </ul>
          </div>
        </div>

        <div class="px-6 space-y-2">
          <h1 class="font-black">Skills</h1>
          <div class="px-4">
            <ul class="space-y-3 list-disc text-xs">
              <li
                v-for="(skill, index) in jobsResult[currentJobIndex]?.skills"
                :key="index"
                class=""
              >
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="px-6 space-y-2">
          <div class="flex space-x-4 py-3">
            <div>
              <BtnPrimary
                :isLoading="isApplying"
                :disabled="isApplying"
                @click="applyNow(jobsResult[currentJobIndex].id)"
                class="bg-primary-1 w-auto px-4 py-3 md:text-xs text-[8px] rounded-8 text-white"
              >
                <template #text> Apply Now </template>
              </BtnPrimary>
            </div>
            <NuxtLink
              :to="`/dashboard/jobseeker/find-jobs/${jobsResult[currentJobIndex].id}`"
              class="py-3 px-4 border text-primary-1 border-primary-1 rounded-10 text-xs"
            >
              More details
            </NuxtLink>
          </div>
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
