<!-- pages/recruiter/dashboard/index.vue -->
<script setup lang="ts">
import type {
  ApiSuccessResponse,
  IJobApplications,
  IJobApplicationsWithPagination,
  IJobStatsData,
  IRecruiterDetails,
IUserDetails,
} from '~/types';

definePageMeta({
  title: 'Dashboard',
  pageName: 'dashboard.recruiter.job.index',
  layout: 'dashboard',
  middleware: ['auth', 'is-recruiter'],
});

const authStore = useAuthStore();
const userStore = useUserStore();
const jobStore = useJobStore();
const isLoading = ref(true);
const isLoadingApps = ref(false);
const starFeature = ref(false)
const jobStats = computed<IJobStatsData | null>(() => jobStore.jobStats);
const jobApps = computed<IJobApplications[]>(() => jobStore.jobApplicationList);
  const jobListPage = ref<{}>({});

  const userData = computed<IRecruiterDetails>(
  () => userStore.loggedInUserDetails
);

const getJobStats = async () => {
  try {
      isLoading.value = true;
      const token = authStore.userToken;
      const response = await jobStore.$api.fetchJobStats(token);
      const responseData = response as ApiSuccessResponse;

      setTimeout(() => {
        isLoading.value = false;
      }, 500);
      jobStore.setJobStatsList(responseData.data);
    } catch (e) {
      console.log(e);
    }
}
const getMyJobApps = async () => {
  try {
    isLoadingApps.value = true;
    const token = authStore.userToken;
    const response = await jobStore.$api.fetchRecruiterJobApplications(token, {});
    const responseData = response as ApiSuccessResponse;

    const { docs, ...other } =
      responseData.data as IJobApplicationsWithPagination;
    jobListPage.value = other;
    jobStore.setUserJobApplicationList(docs);
    setTimeout(() => {
      isLoadingApps.value = false;
    }, 1000);
  } catch (e) {
    console.log(e);
    isLoadingApps.value = false;
  }
};

onBeforeMount(async () => {
  if (jobStore.jobStats === null) {
    await getJobStats()
    await getMyJobApps();
  }
});
</script>

<template>
  <div class="md:pt-4 text-black-900 w-full">
    <!-- Dashboard content goes here -->
    <div
      class="flex flex-col-reverse md:flex-row justify-between items-center md:pb-6"
    >
      <div class="space-y-1 pb-2">
        <h2 class="text-2xl font-black">
          Good Morning
          <span v-if="!isLoading">
            <span v-if="userData?.companyName">
              {{userData?.companyName || ''}}
            </span>
          </span>
        </h2>
        <p class="text-sm">
          Here’s what’s happening with your job application since you joined us.
        </p>
      </div>

      <div class="self-end pb-4">
        <NuxtLink to="/dashboard/recruiter/job/create">
          <button
            class="px-4 py-3 text-xs flex bg-primary-1 gap-x-2 rounded-8 text-white items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 8C15.5 8.16576 15.4342 8.32473 15.3169 8.44194C15.1997 8.55915 15.0408 8.625 14.875 8.625H8.625V14.875C8.625 15.0408 8.55915 15.1997 8.44194 15.3169C8.32473 15.4342 8.16576 15.5 8 15.5C7.83424 15.5 7.67527 15.4342 7.55806 15.3169C7.44085 15.1997 7.375 15.0408 7.375 14.875V8.625H1.125C0.95924 8.625 0.800269 8.55915 0.683058 8.44194C0.565848 8.32473 0.5 8.16576 0.5 8C0.5 7.83424 0.565848 7.67527 0.683058 7.55806C0.800269 7.44085 0.95924 7.375 1.125 7.375H7.375V1.125C7.375 0.95924 7.44085 0.800269 7.55806 0.683058C7.67527 0.565848 7.83424 0.5 8 0.5C8.16576 0.5 8.32473 0.565848 8.44194 0.683058C8.55915 0.800269 8.625 0.95924 8.625 1.125V7.375H14.875C15.0408 7.375 15.1997 7.44085 15.3169 7.55806C15.4342 7.67527 15.5 7.83424 15.5 8Z"
                fill="white"
              />
            </svg>
            Create a job opening
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- card -->
    <div class="flex flex-col md:flex-row md:space-x-4 w-full mt-2">
      <!-- desktop -->
      <div class="flex flex-col md:flex-row md:space-x-4 md:w-3/5 items-center">
        <!-- desktop -->
        <div class="space-y-2 hidden md:block">
          <div class="rounded-10 w-full md:w-[310px] bg-white h-auto">
            <div class="px-4 space-y-2 pt-2">
              <h3 class="text-base whitespace-nowrap font-black">
                Total Jobs Created
              </h3>
              <div class="flex items-center justify-between">
                <p
                  class="text-5xl pb-8 tracking-tighter font-[Georgia] font-black"
                >
                  {{ jobStats?.jobsLength || 0 }}
                </p>
                <div class="pt-8"><IconsWhiteFileIcon class="" /></div>
              </div>
            </div>
          </div>

          <div class="rounded-10 w-full md:w-[310px] bg-white h-auto">
            <div class="px-4 space-y-2 pt-2">
              <h3 class="text-base whitespace-nowrap font-black">
                Total Interviewed
              </h3>
              <div class="flex items-center justify-between">
                <p
                  class="text-5xl pb-8 tracking-tighter font-[Georgia] font-black"
                >
                  {{ 0 }}
                </p>
                <div class="pt-8"><IconsWhiteChatIcon class="" /></div>
              </div>
            </div>
          </div>
        </div>

        <!-- for mobile view -->
        <div
          class="flex flex-col md:hidden w-full min-w-[210px] space-y-4 py-3"
        >
          <div class="rounded-10 bg-white h-full py-3">
            <div
              class="px-4 flex md:block items-center space-y-2 space-x-8 md:space-x-0 md:space-y-0 md:pt-4"
            >
              <div class="flex items-center justify-start space-x-4 w-full">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.25 15C8.25 15.1989 8.32902 15.3897 8.46967 15.5303C8.61032 15.671 8.80109 15.75 9 15.75H15C15.1989 15.75 15.3897 15.671 15.5303 15.5303C15.671 15.3897 15.75 15.1989 15.75 15C15.75 14.8011 15.671 14.6103 15.5303 14.4697C15.3897 14.329 15.1989 14.25 15 14.25H9C8.80109 14.25 8.61032 14.329 8.46967 14.4697C8.32902 14.6103 8.25 14.8011 8.25 15ZM9 11.25H15C15.1989 11.25 15.3897 11.329 15.5303 11.4697C15.671 11.6103 15.75 11.8011 15.75 12C15.75 12.1989 15.671 12.3897 15.5303 12.5303C15.3897 12.671 15.1989 12.75 15 12.75H9C8.80109 12.75 8.61032 12.671 8.46967 12.5303C8.32902 12.3897 8.25 12.1989 8.25 12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25ZM12 9.75H9C8.80109 9.75 8.61032 9.67098 8.46967 9.53033C8.32902 9.38968 8.25 9.19891 8.25 9C8.25 8.80109 8.32902 8.61032 8.46967 8.46967C8.61032 8.32902 8.80109 8.25 9 8.25H12C12.1989 8.25 12.3897 8.32902 12.5303 8.46967C12.671 8.61032 12.75 8.80109 12.75 9C12.75 9.19891 12.671 9.38968 12.5303 9.53033C12.3897 9.67098 12.1989 9.75 12 9.75ZM21 19.5V9.31031C21.0006 9.11326 20.9621 8.91804 20.8866 8.73602C20.8111 8.55399 20.7002 8.38878 20.5603 8.25L15.75 3.43969C15.6112 3.29979 15.446 3.18888 15.264 3.1134C15.082 3.03792 14.8867 2.99937 14.6897 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10217 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5ZM4.5 4.5H14.25V9C14.25 9.19891 14.329 9.38968 14.4697 9.53033C14.6103 9.67098 14.8011 9.75 15 9.75H19.5V19.5H4.5V4.5ZM15.75 8.25V5.55938L18.4397 8.25H15.75Z"
                      fill="#343330"
                    />
                  </svg>
                </span>
                <h3 class="text-sm whitespace-nowrap font-black">
                  Total Jobs Applied
                </h3>
              </div>
              <p
                class="md:text-5xl text-2xl md:pb-8 md:tracking-tighter font-[Georgia] font-black"
              >
                {{ jobStats?.jobsLength || 0 }}
              </p>
            </div>
          </div>

          <div class="rounded-10 bg-white h-full py-3">
            <div
              class="px-4 flex md:block items-center space-y-2 space-x-8 md:space-x-0 md:space-y-0 md:pt-4"
            >
              <div class="flex items-center justify-start space-x-4 w-full">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.7303 17.5622C22.2593 16.4871 22.5229 15.3008 22.4992 14.1029C22.4754 12.9049 22.165 11.73 21.5939 10.6767C21.0228 9.62333 20.2076 8.72215 19.2166 8.04859C18.2257 7.37503 17.0877 6.94871 15.8981 6.80533C15.502 5.88786 14.9266 5.05882 14.2055 4.36688C13.4845 3.67495 12.6325 3.13408 11.6995 2.77606C10.7665 2.41803 9.7714 2.25007 8.77259 2.28204C7.77378 2.314 6.79143 2.54525 5.88325 2.9622C4.97507 3.37915 4.15937 3.9734 3.48407 4.71002C2.80877 5.44664 2.2875 6.31079 1.95086 7.25171C1.61422 8.19262 1.46902 9.19132 1.52377 10.1891C1.57853 11.187 1.83214 12.1638 2.26971 13.0622L1.55158 15.5766C1.49573 15.7718 1.48595 15.9774 1.52303 16.1771C1.5601 16.3768 1.64302 16.5652 1.76524 16.7274C1.88747 16.8896 2.04567 17.0212 2.22739 17.1119C2.40912 17.2026 2.60942 17.2499 2.81252 17.25C2.93432 17.2504 3.05554 17.2333 3.17252 17.1994L5.68689 16.4813C6.44534 16.8562 7.26252 17.0981 8.10283 17.1966C8.50288 18.1335 9.08963 18.9792 9.82728 19.6819C10.5649 20.3846 11.438 20.9297 12.3933 21.2839C13.3486 21.638 14.366 21.7938 15.3834 21.7418C16.4009 21.6898 17.3971 21.431 18.3113 20.9813L20.8256 21.6994C21.0506 21.7635 21.2886 21.7663 21.515 21.7075C21.7414 21.6488 21.9479 21.5306 22.1133 21.3652C22.2787 21.1998 22.3969 20.9932 22.4557 20.7668C22.5144 20.5404 22.5116 20.3025 22.4475 20.0775L21.7303 17.5622ZM6.12752 15.0197C5.95555 14.9258 5.75365 14.9029 5.56502 14.956L3.08908 15.6638L3.79689 13.1878C3.84994 12.9992 3.82706 12.7973 3.73314 12.6253C2.95937 11.2347 2.76973 9.59361 3.20593 8.06314C3.64212 6.53267 4.66844 5.23816 6.05908 4.46439C7.44973 3.69062 9.0908 3.50097 10.6213 3.93717C12.1517 4.37337 13.4462 5.39968 14.22 6.79033C12.3769 6.98557 10.6711 7.85536 9.43053 9.23243C8.19001 10.6095 7.50243 12.3966 7.50002 14.25C7.50033 14.6997 7.54144 15.1484 7.62283 15.5906C7.10091 15.4687 6.59791 15.2766 6.12752 15.0197ZM20.206 17.6878L20.9138 20.1638L18.4378 19.456C18.2492 19.4029 18.0473 19.4258 17.8753 19.5197C16.6093 20.2093 15.1371 20.4196 13.7286 20.1121C12.3201 19.8045 11.0696 18.9997 10.2062 17.8451C9.34283 16.6905 8.92442 15.2635 9.02764 13.8255C9.13087 12.3875 9.74881 11.0349 10.7682 10.0154C11.7877 8.99599 13.1403 8.37805 14.5783 8.27483C16.0163 8.1716 17.4433 8.59001 18.5979 9.45338C19.7525 10.3168 20.5573 11.5673 20.8649 12.9758C21.1724 14.3843 20.9621 15.8565 20.2725 17.1225C20.1769 17.2949 20.153 17.498 20.206 17.6878ZM13.5 13.125C13.5 13.3475 13.434 13.565 13.3104 13.75C13.1868 13.935 13.0111 14.0792 12.8055 14.1644C12.6 14.2495 12.3738 14.2718 12.1555 14.2284C11.9373 14.185 11.7369 14.0778 11.5795 13.9205C11.4222 13.7632 11.315 13.5627 11.2716 13.3445C11.2282 13.1263 11.2505 12.9001 11.3357 12.6945C11.4208 12.4889 11.565 12.3132 11.75 12.1896C11.935 12.066 12.1525 12 12.375 12C12.6734 12 12.9595 12.1185 13.1705 12.3295C13.3815 12.5405 13.5 12.8266 13.5 13.125ZM18.75 13.125C18.75 13.3475 18.684 13.565 18.5604 13.75C18.4368 13.935 18.2611 14.0792 18.0555 14.1644C17.85 14.2495 17.6238 14.2718 17.4055 14.2284C17.1873 14.185 16.9869 14.0778 16.8295 13.9205C16.6722 13.7632 16.565 13.5627 16.5216 13.3445C16.4782 13.1263 16.5005 12.9001 16.5857 12.6945C16.6708 12.4889 16.815 12.3132 17 12.1896C17.185 12.066 17.4025 12 17.625 12C17.9234 12 18.2095 12.1185 18.4205 12.3295C18.6315 12.5405 18.75 12.8266 18.75 13.125Z"
                      fill="#343330"
                    />
                  </svg>
                </span>
                <h3 class="text-sm whitespace-nowrap font-black">
                  Total Interviewed
                </h3>
              </div>
              <p
                class="md:text-5xl text-2xl md:pb-8 md:tracking-tighter font-[Georgia] font-black"
              >
                {{ 0 }}
              </p>
            </div>
          </div>
        </div>

        <!--  -->
        <div
          class="font-[Nexa] bg-[#FFFFFF] w-full rounded-10 px-4 py-4 h-full md:h-72"
        >
          <h3 class="font-black">Latest Job Posting</h3>
          <div class="flex gap-4 items-center">
            <div
              v-if="jobStats?.recentJobs?.length"
              class="flex flex-col items-center pt-6 space-y-2"
            >
              <div class="space-y-4">
                <img
                  :src="userData?.photo?.url"
                  class="h-[40px] w-[40px]"
                  alt=""
                />
                <div
                  class="flex flex-col md:flex-row justify-between items-start"
                >
                  <div>
                    <h1 class="text-base font-black capitalize">
                      {{ jobStats.recentJobs[0].title }}
                    </h1>
                    <hw class="text-xs">{{
                      formatTimeDiffHuman(jobStats.recentJobs[0].createdAt)
                    }}</hw>
                  </div>

                  <div class="">
                    <h1 class="gap-x-2">
                      <b class="text-2xl">{{
                        jobStats.recentJobs[0]?.applicants || 0
                      }}</b
                      >applicants
                    </h1>
                  </div>
                </div>

                <div class="flex justify-between h-full w-full items-center">
                  <div>
                    <h1 class="md:text-sm text-xs md:w-5/6 w-full">
                      {{
                        jobStats.recentJobs[0].description.substring(0, 200)
                      }}...
                    </h1>
                  </div>
                  <!--clip  icon -->
                  <div class="md:pt-6 relative top-3 md:top-0">
                    <h1><IconsClipboardIcon /></h1>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>No latest Job</div>
          </div>
        </div>
      </div>

      <div class="font-[Nexa] bg-[#FFFFFF] h-72 rounded-10 my-4 md:w-2/5">
        <h3 class="font-black border-b px-6 ml-2 py-4 text-base text-gray-800">
          Upcoming Interviews
        </h3>

        <h3
          class="border-b flex justify-between px-6 ml-2 py-4 text-xs text-gray-600"
        >
          <div><b>Today</b>, 26th August 2024.</div>
          <span class="flex space-x-3">
            <!-- buttons left -->
            <button>
              <svg
                width="7"
                height="14"
                viewBox="0 0 7 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.64798 12.227C6.70025 12.2792 6.7417 12.3413 6.76999 12.4096C6.79827 12.4779 6.81283 12.551 6.81283 12.6249C6.81283 12.6989 6.79827 12.772 6.76999 12.8403C6.7417 12.9086 6.70025 12.9707 6.64798 13.0229C6.59572 13.0752 6.53368 13.1166 6.46539 13.1449C6.39711 13.1732 6.32392 13.1878 6.25001 13.1878C6.17611 13.1878 6.10292 13.1732 6.03464 13.1449C5.96635 13.1166 5.90431 13.0752 5.85205 13.0229L0.227046 7.39792C0.174747 7.34567 0.133258 7.28364 0.104951 7.21535C0.0766431 7.14706 0.0620728 7.07387 0.0620728 6.99995C0.0620728 6.92603 0.0766431 6.85283 0.104951 6.78454C0.133258 6.71626 0.174747 6.65422 0.227046 6.60198L5.85205 0.976978C5.95759 0.87143 6.10075 0.812134 6.25001 0.812134C6.39928 0.812134 6.54244 0.87143 6.64798 0.976978C6.75353 1.08253 6.81283 1.22568 6.81283 1.37495C6.81283 1.52421 6.75353 1.66737 6.64798 1.77292L1.42025 6.99995L6.64798 12.227Z"
                  fill="#B0B0B0"
                />
              </svg>
            </button>
            <!-- buttons right -->
            <button>
              <svg
                width="7"
                height="14"
                viewBox="0 0 7 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.77298 7.39792L1.14798 13.0229C1.09571 13.0752 1.03367 13.1166 0.965387 13.1449C0.897103 13.1732 0.823917 13.1878 0.750008 13.1878C0.676098 13.1878 0.602912 13.1732 0.534628 13.1449C0.466345 13.1166 0.404301 13.0752 0.352039 13.0229C0.299777 12.9707 0.25832 12.9086 0.230036 12.8403C0.201752 12.772 0.187195 12.6989 0.187195 12.6249C0.187195 12.551 0.201752 12.4779 0.230036 12.4096C0.25832 12.3413 0.299777 12.2792 0.352039 12.227L5.57977 6.99995L0.352039 1.77292C0.246491 1.66737 0.187195 1.52421 0.187195 1.37495C0.187195 1.22568 0.246491 1.08253 0.352039 0.976978C0.457586 0.87143 0.60074 0.812134 0.750008 0.812134C0.899275 0.812134 1.04243 0.87143 1.14798 0.976978L6.77298 6.60198C6.82528 6.65422 6.86677 6.71626 6.89507 6.78454C6.92338 6.85283 6.93795 6.92603 6.93795 6.99995C6.93795 7.07387 6.92338 7.14706 6.89507 7.21535C6.86677 7.28364 6.82528 7.34567 6.77298 7.39792Z"
                  fill="#343330"
                />
              </svg>
            </button>
          </span>
        </h3>

        <!-- Scrollable Content Area -->
        <div
          class="overflow-y-auto h-[calc(100%-120px)] no-scrollbar text-xs px-4"
        >
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">10:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>

          <!-- Profile Section -->
          <div class="flex justify-between items-center px-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">10:00 AM</h6>
            <div class="w-full rounded-10 p-2 bg-gray-100 mx-4">
              <div class="flex items-center space-x-4">
                <img
                  class="w-10 h-10 rounded-10"
                  src="/assets/images/Ellipse12.png"
                  alt="Profile Image"
                />
                <div>
                  <h6 class="font-semibold text-gray-800">Mark Steven</h6>
                  <p class="text-xs text-gray-500">UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Time Slots -->
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">11:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">11:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">11:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">11:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>
        </div>
      </div>
    </div>

    <!--cards-->
    <div class="py-4">
      <h1 class="text-2xl font-black font-[Georgia]">Current openings</h1>
      <div
        v-if="jobStats?.recentJobs?.length"
        class="grid md:grid-cols-3 gap-4"
      >
        <div
          v-for="(job, index) in jobStats?.recentJobs"
          :key="index"
          class="bg-white py-4 px-4 rounded-10 space-y-4 mt-4 h-full"
        >
          <div class="flex space-x-4 items-start">
            <img
              :src="userData?.photo?.url"
              class="h-[40px] w-[40px]"
              alt="no pix"
            />
            <div class="">
              <h1 class="text-base font-black capitalize">{{ job.title }}</h1>
              <h1 class="text-xs">
                Posted {{ formatTimeDiffHuman(job.createdAt) }}
              </h1>
            </div>
          </div>

          <div class="flex space-x-2 gap-2">
            <div
              class="flex space-x-2 items-center mt-2 p-2 bg-black-50 rounded-10"
            >
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
              <span class="text-xs text-gray-700">{{ userData.location }}</span>
            </div>

            <div
              class="flex space-x-2 items-center mt-2 p-2 bg-black-50 rounded-10"
            >
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

              <h1 class="text-xs text-gray-700 capitalize">{{ job.level }}</h1>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <h1 class="gap-x-2">
              <b class="text-2xl">{{ job?.applicants || 0 }}</b
              >applicants
            </h1>
            <!-- <h1 class="text-success-600 text-xs">13 in last 2 days</h1> -->
          </div>
        </div>
      </div>
      <div v-else>
        <span>No current jobs</span>
      </div>
    </div>
    <!-- latest candidates -->
    <div class="bg-white w-full rounded-10">
      <div class="my-4">
        <nav
          class="w-full flex justify-start border-b px-4 py-2 border-y-black-200 items-center"
        >
        <h1 class="text-2xl font-black font-[Georgia]">Recent Applications</h1>
        </nav>
        <!--  -->
        <div class="md:px-4 pt-2">
          <table class="w-full">
            <thead class="bg-bla h-10 rounded-10 px-3">
              <tr class="">
                <td
                  class="text-left text-[8px] md:text-sm bg-black-50 pl-4 rounded-l-10"
                >
                  Candidates Name
                </td>
                <td class="text-left text-[8px] md:text-sm bg-black-50">
                  Rating
                </td>
                <td class="text-left text-[8px] md:text-sm bg-black-50">
                  Stages
                </td>
                <td class="text-left text-[8px] md:text-sm bg-black-50">
                  Applied Role
                </td>
                <td class="text-left text-[8px] md:text-sm bg-black-50">
                  Application Date
                </td>
                <td
                  class="text-left text-[8px] md:text-sm rounded-r-10 bg-black-50"
                >
                  Action
                </td>
              </tr>
            </thead>

            <tbody v-if="isLoadingApps" class="text-[7px] md:text-base">
              <tr class="md:h-14 h-8">
                <td colspan="6" rowspan="7">
                  <div class="h-40 w-full flex items-center justify-center">
                    <span class="loader-2"></span>
                  </div>
                </td>
              </tr>
            </tbody>

            <tbody
              v-if="jobApps.length > 0 && !isLoadingApps"
              class="text-[7px] md:text-base"
            >
              <tr
                v-for="(jobApp, index) in jobApps"
                :key="index"
                class="md:h-14 h-8"
              >
                <td>
                  <div class="flex items-center space-x-2">
                    <img
                      :src="(jobApp?.user as IUserDetails)!.photo!.url"
                      :alt="((jobApp?.user as IUserDetails).firstName)"
                      class="!h-[32px] !w-[32px]"
                    />
                    <h1>{{(jobApp?.user as IUserDetails).firstName}} {{(jobApp?.user as IUserDetails).lastName}}</h1>
                  </div>
                </td>

                <td class="">
                  <div v-if="starFeature" class="flex items-center gap-1">
                    <svg
                      class="md:hidden"
                      width="10"
                      height="10"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.3203 7.93603L13.7969 11.011L14.8524 15.5892C14.9082 15.8285 14.8923 16.079 14.8065 16.3093C14.7208 16.5396 14.5691 16.7396 14.3703 16.8841C14.1716 17.0287 13.9346 17.1114 13.6891 17.1221C13.4436 17.1327 13.2004 17.0707 12.9899 16.9438L8.99689 14.522L5.01252 16.9438C4.80202 17.0707 4.55881 17.1327 4.31328 17.1221C4.06775 17.1114 3.83079 17.0287 3.63204 16.8841C3.4333 16.7396 3.28157 16.5396 3.19584 16.3093C3.1101 16.079 3.09416 15.8285 3.15002 15.5892L4.20392 11.0157L0.679705 7.93603C0.493305 7.77526 0.358519 7.56304 0.292249 7.32598C0.225978 7.08892 0.231173 6.83757 0.307183 6.60345C0.383193 6.36933 0.526633 6.16287 0.719516 6.00994C0.912399 5.85702 1.14614 5.76445 1.39142 5.74384L6.03674 5.34149L7.85002 1.01649C7.94471 0.789554 8.10443 0.595704 8.30907 0.459352C8.51371 0.323 8.75411 0.250244 9.00002 0.250244C9.24592 0.250244 9.48633 0.323 9.69097 0.459352C9.8956 0.595704 10.0553 0.789554 10.15 1.01649L11.9688 5.34149L16.6125 5.74384C16.8578 5.76445 17.0915 5.85702 17.2844 6.00994C17.4773 6.16287 17.6207 6.36933 17.6968 6.60345C17.7728 6.83757 17.778 7.08892 17.7117 7.32598C17.6454 7.56304 17.5106 7.77526 17.3242 7.93603H17.3203Z"
                        fill="#FE8900"
                      />
                    </svg>

                    <svg
                      class="hidden md:flex"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.3203 7.93603L13.7969 11.011L14.8524 15.5892C14.9082 15.8285 14.8923 16.079 14.8065 16.3093C14.7208 16.5396 14.5691 16.7396 14.3703 16.8841C14.1716 17.0287 13.9346 17.1114 13.6891 17.1221C13.4436 17.1327 13.2004 17.0707 12.9899 16.9438L8.99689 14.522L5.01252 16.9438C4.80202 17.0707 4.55881 17.1327 4.31328 17.1221C4.06775 17.1114 3.83079 17.0287 3.63204 16.8841C3.4333 16.7396 3.28157 16.5396 3.19584 16.3093C3.1101 16.079 3.09416 15.8285 3.15002 15.5892L4.20392 11.0157L0.679705 7.93603C0.493305 7.77526 0.358519 7.56304 0.292249 7.32598C0.225978 7.08892 0.231173 6.83757 0.307183 6.60345C0.383193 6.36933 0.526633 6.16287 0.719516 6.00994C0.912399 5.85702 1.14614 5.76445 1.39142 5.74384L6.03674 5.34149L7.85002 1.01649C7.94471 0.789554 8.10443 0.595704 8.30907 0.459352C8.51371 0.323 8.75411 0.250244 9.00002 0.250244C9.24592 0.250244 9.48633 0.323 9.69097 0.459352C9.8956 0.595704 10.0553 0.789554 10.15 1.01649L11.9688 5.34149L16.6125 5.74384C16.8578 5.76445 17.0915 5.85702 17.2844 6.00994C17.4773 6.16287 17.6207 6.36933 17.6968 6.60345C17.7728 6.83757 17.778 7.08892 17.7117 7.32598C17.6454 7.56304 17.5106 7.77526 17.3242 7.93603H17.3203Z"
                        fill="#FE8900"
                      />
                    </svg>

                    <h1>4.6</h1>
                  </div>
                  <div v-else>N/A</div>
                </td>
                <td>{{jobApp.status}}</td>
                <td class="capitalize">{{jobApp.jobListing.title}}</td>
                <td>{{ formatDateWithSuffix(jobApp.createdAt) }}</td>
                <td>
                  <div class="flex items-center gap-2">
                    <NuxtLink :to="`/dashboard/recruiter/candidates/${jobApp.id}-${jobApp.jobListing.slug}`">
                        View
                    </NuxtLink>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody
              v-if="jobApps.length === 0 && !isLoadingApps"
              class="text-[7px] md:text-base"
            >
              <tr class="md:h-14 h-8">
                <td colspan="5" rowspan="6">
                  <div>
                    <EmptyJobState />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
