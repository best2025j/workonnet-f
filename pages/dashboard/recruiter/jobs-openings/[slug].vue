<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  IJobPost,
  IRecruiterDetails,
  IMatchedUser
} from '~/types';

definePageMeta({
  title: 'Jobs Openings',
  pageName: 'dashboard.recruiter.jobs-opening.index',
  layout: 'dashboard',
  middleware: ['auth', 'is-recruiter'],
});

const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();
const jobStore = useJobStore();
const currentJob = ref<IJobPost | null>(null);
const matchedUsers = ref<IMatchedUser[]>([]);
const isLoading = ref(false);
const isEditAction = ref<boolean>(false);
const toast = useToast();

const slugId = computed(() => (route.params.slug as string).split('-')[0]);

const userData = computed<IRecruiterDetails>(
  () => userStore.loggedInUserDetails
);

const publishJob = async () => {
  await updateJobApi('published');
};
const archiveJob = async () => {
  await updateJobApi('archived');
};

const updateJobApi = async (action: string) => {
  let actionUrl;

  if (action === 'published') {
    actionUrl = '/api/recruiter/job/publish';
  } else {
    actionUrl = '/api/recruiter/job/archive';
  }

  isEditAction.value = true;
  try {
    isLoading.value = true;
    const token = authStore.userToken;
    await $fetch(actionUrl, {
      method: 'POST',
      query: {
        jobListingId: slugId.value,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(`Job post was ${action} successfully`, {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    await getJob();
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    toast.error('An error occurred try again', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });
  }

  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};

const getJob = async () => {
  try {
    isLoading.value = true;
    const token = authStore.userToken;
    const response = await jobStore.$api.fetchRecruiterSingle(
      token,
      slugId.value
    );
    const responseData = response as ApiSuccessResponse;
    currentJob.value = responseData.data;

    if (!isEditAction.value && currentJob.value?.status === 'published') {
      await getMatchedCandidate(slugId.value);
    }

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

const getMatchedCandidate = async (jobId: string) => {
  try {
    isLoading.value = true;
    const token = authStore.userToken;
  const  response = await $fetch('/api/matching/get-matched-candidate', {
      query: {
        jobListingId: jobId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response as ApiSuccessResponse;
    matchedUsers.value = responseData.data
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;
    console.log(errorData);
  }
};

onBeforeMount(async () => {
  await getJob();
});
</script>

<template>
  <div
    v-if="isLoading"
    class="h-full py-40 w-full flex items-center justify-center"
  >
    <span class="loader-2"></span>
  </div>
  <div v-else class="w-full h-full">
    <div class="p-4 bg-white rounded-10">
      <div class="md:mt-12 md:pl-6 space-y-2">
        <div
          class="bg-white rounded-full h-[70px] w-[70px] border-2 z-auto flex items-center justify-center absolute -top-24"
        >
          <img
            :src="userData!.photo?.url"
            class="h-[70px] w-[70px]"
            alt="profile-image"
          />
        </div>

        <div class="flex flex-col md:flex-row justify-between">
          <div class="space-y-2">
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
                  {{ userData!.companyName }}
                </h1>
                <h1 class="text-xs">
                  {{ userData!.location }}
                </h1>
              </div>
            </div>
          </div>

          <div>
            <div class="space-x-2">
              <h1 class="md:text-lg text-xs font-black">
                NGN{{ formatCurrency(currentJob!.expectedSalary) }}/month
              </h1>
            </div>
            <div class="flex justify-end w-full pt-4">
              <button
                v-if="currentJob?.status === 'published'"
                @click="archiveJob"
                class="md:px-4 w-full text-xs md:text-sm py-3 rounded-8 text-back-50 bg-white border border:bg-black-50"
              >
                Archive
              </button>
              <BtnPrimary
                @click="publishJob()"
                :isLoading="isLoading"
                :disabled="isLoading"
                v-if="currentJob?.status === 'draft'"
                class="md:px-4 w-full text-xs font-black md:text-sm py-3 rounded-8 text-white bg-primary"
              >
                <template #text> Publish </template>
              </BtnPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- levels -->
    <div
      class="py-4 flex flex-col md:flex-row space-y-3 md:space-y-0 space-x-0 items-center justify-center w-full md:space-x-4"
    >
      <div
        class="p-2 md:h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-xs">Experience Level</h1>
        <p class="font-black md:text-base text-xs capitalize">
          {{ currentJob?.level }}
        </p>
      </div>
      <div
        class="p-2 md:h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-xs">Job Type</h1>
        <p class="font-black md:text-base text-xs capitalize">
          {{ currentJob?.jobType }}
        </p>
      </div>
      <div
        class="p-2 md:h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-xs">Work Type</h1>
        <p class="font-black md:text-base text-xs capitalize">
          {{ currentJob?.location }}
        </p>
      </div>
      <div
        class="p-2 md:h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-xs">Salary</h1>
        <p class="font-black md:text-base text-xs">
          NGN{{ formatCurrency(currentJob!.expectedSalary) }}/month
        </p>
      </div>
      <div
        class="p-2 md:h-20 mx-auto justify-center flex-col flex bg-white rounded-10 w-full text-center"
      >
        <h1 class="text-xs">Location</h1>
        <p class="font-black md:text-base text-xs">
          {{ userData!.location }}
        </p>
      </div>
    </div>

    <!-- about the company -->
    <div class="gap-x-4 flex flex-col md:flex-row w-fill space-y-4">
      <div class="bg-white p-4 rounded-10 h-full md:w-2/3">
        <div class="space-y-2 py-2">
          <h1 class="font-black">About the company</h1>
          <p class="md:text-sm text-xs tracking-wider">
            {{ userData!.bio }}
          </p>
        </div>
        <div class="space-y-2 py-2">
          <h1 class="font-black">Job Description</h1>
          <p class="md:text-sm text-xs tracking-wider">
            {{ currentJob?.description }}
          </p>
        </div>
        <!--  -->
        <div class="pt-4">
          <h1 class="font-black text-sm">Requirements</h1>
          <ul class="space-y-1 list-disc pl-6 py-4 text-xs md:text-base">
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
          <ul class="space-y-1 list-disc pl-6 py-4 text-xs md:text-base">
            <li v-for="(benefit, index) in currentJob?.benefits" :key="index">
              {{ benefit }}
            </li>
          </ul>
        </div>
        <!--  -->
        <div class="pt-4">
          <h1 class="font-black text-sm">Skills</h1>
          <ul class="space-y-1 list-disc pl-6 py-4 text-xs md:text-base">
            <li v-for="(skill, index) in currentJob?.skills" :key="index">
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>

      <!-- second div -->
      <div class="bg-white px-4 py-4 w-full md:w-1/3 rounded-10">
        <div class="flex items-center justify-between py-2">
          <h1 class="text-sm font-black">Matched Candidates</h1>
          <button
            v-if="currentJob!.applicants > 0"
            class="text-xs text-primary-1 flex gap-x-2 items-center"
          >
            View all candidates (72)
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.8994 5.39985C14.1923 5.10695 14.6671 5.10695 14.96 5.39985L21.03 11.4698C21.1707 11.6105 21.2497 11.8013 21.2497 12.0002C21.2497 12.1991 21.1707 12.3899 21.03 12.5305L14.96 18.6005C14.6671 18.8934 14.1923 18.8934 13.8994 18.6005C13.6065 18.3076 13.6065 17.8327 13.8994 17.5398L19.439 12.0002L13.8994 6.46051C13.6065 6.16761 13.6065 5.69274 13.8994 5.39985Z"
                fill="#FE8900"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.75 12C2.75 11.5858 3.08579 11.25 3.5 11.25H20.33C20.7442 11.25 21.08 11.5858 21.08 12C21.08 12.4142 20.7442 12.75 20.33 12.75H3.5C3.08579 12.75 2.75 12.4142 2.75 12Z"
                fill="#FE8900"
              />
            </svg>
          </button>
        </div>

        <!-- list -->
        <div v-if="matchedUsers && matchedUsers.length > 0" class="w-full">
          <ul class="">
            <li
            v-for="(matchedCandidates, index) in matchedUsers" :key="index"
              class="flex my-2 items-center justify-between p-2 bg-black-50 w-full rounded-10"
            >
              <div class="flex items-center space-x-3 w-2/3">
                <img v-if="matchedCandidates?.candidate?.photo" :src="matchedCandidates?.candidate?.photo?.url" class="w-[32px] h-[32px] rounded-full">
                <div class="">
                  <h1 class="text-sm">{{matchedCandidates?.candidate?.firstName}} {{matchedCandidates?.candidate?.lastName}}</h1>
                  <h1 class="text-xs">{{matchedCandidates?.candidate?.occupation || ' '}}</h1>
                  <h1 class="text-xs">{{matchedCandidates?.candidate?.location || ' '}}</h1>

                </div>
              </div>

              <div class="flex items-center gap-1">
                <svg
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

                <h1 class="text-xs font-medium">{{convertNumToRating(matchedCandidates?.matchScore)}}</h1>
              </div>
              <!-- white svg toggle menu-->
              <div>
                <div
                  class="text-black-950 dropdown dropdown-bottom dropdown-end px-4 py-2 flex gap-2 text-sm items-center rounded-8"
                >
                  <button tabindex="0" role="button" class="bg-white">
                    <svg
                      width="4"
                      height="16"
                      viewBox="0 0 4 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.125 8C3.125 8.2225 3.05902 8.44001 2.9354 8.62502C2.81179 8.81002 2.63609 8.95422 2.43052 9.03936C2.22495 9.12451 1.99875 9.14679 1.78052 9.10338C1.5623 9.05998 1.36184 8.95283 1.20451 8.7955C1.04717 8.63816 0.940025 8.43771 0.896617 8.21948C0.853209 8.00125 0.875487 7.77505 0.960636 7.56948C1.04578 7.36391 1.18998 7.18821 1.37498 7.0646C1.55999 6.94098 1.7775 6.875 2 6.875C2.29837 6.875 2.58452 6.99353 2.79549 7.20451C3.00647 7.41548 3.125 7.70163 3.125 8ZM2 2.75C2.2225 2.75 2.44001 2.68402 2.62502 2.5604C2.81002 2.43679 2.95422 2.26109 3.03936 2.05552C3.12451 1.84995 3.14679 1.62375 3.10338 1.40552C3.05998 1.1873 2.95283 0.986839 2.79549 0.829505C2.63816 0.672171 2.43771 0.565025 2.21948 0.521617C2.00125 0.478209 1.77505 0.500487 1.56948 0.585636C1.36391 0.670785 1.18821 0.814979 1.0646 0.999984C0.94098 1.18499 0.875001 1.4025 0.875001 1.625C0.875001 1.92337 0.993527 2.20952 1.20451 2.4205C1.41548 2.63147 1.70163 2.75 2 2.75ZM2 13.25C1.7775 13.25 1.55999 13.316 1.37498 13.4396C1.18998 13.5632 1.04578 13.7389 0.960636 13.9445C0.875487 14.15 0.853209 14.3762 0.896617 14.5945C0.940025 14.8127 1.04717 15.0132 1.20451 15.1705C1.36184 15.3278 1.5623 15.435 1.78052 15.4784C1.99875 15.5218 2.22495 15.4995 2.43052 15.4144C2.63609 15.3292 2.81179 15.185 2.9354 15C3.05902 14.815 3.125 14.5975 3.125 14.375C3.125 14.0766 3.00647 13.7905 2.79549 13.5795C2.58452 13.3685 2.29837 13.25 2 13.25Z"
                        fill="#343330"
                      />
                    </svg>
                  </button>

                  <!-- drop down -->
                  <ul
                    tabindex="0"
                    class="dropdown-content menu bg-white rounded-box !top-[50%] !right-2 z-10 w-52 mt-4 space-y-2 py-3 shadow"
                  >
                    <li>
                      <NuxtLink
                        :to="`/dashboard/recruiter/jobseeker/${slugify(`${matchedCandidates.candidate.id} ${matchedCandidates.candidate.firstName} ${matchedCandidates.candidate.lastName}`)}`"
                      >
                        <div class="flex text-xs gap-x-3">
                          <span
                            ><svg
                              width="20"
                              height="14"
                              viewBox="0 0 20 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.3211 6.74688C19.2937 6.68516 18.632 5.21719 17.1609 3.74609C15.2008 1.78594 12.725 0.75 9.99999 0.75C7.27499 0.75 4.79921 1.78594 2.83905 3.74609C1.36796 5.21719 0.703118 6.6875 0.678899 6.74688C0.643362 6.82681 0.625 6.91331 0.625 7.00078C0.625 7.08826 0.643362 7.17476 0.678899 7.25469C0.706243 7.31641 1.36796 8.78359 2.83905 10.2547C4.79921 12.2141 7.27499 13.25 9.99999 13.25C12.725 13.25 15.2008 12.2141 17.1609 10.2547C18.632 8.78359 19.2937 7.31641 19.3211 7.25469C19.3566 7.17476 19.375 7.08826 19.375 7.00078C19.375 6.91331 19.3566 6.82681 19.3211 6.74688ZM9.99999 12C7.5953 12 5.49452 11.1258 3.75546 9.40234C3.0419 8.69273 2.43483 7.88356 1.95312 7C2.4347 6.11636 3.04179 5.30717 3.75546 4.59766C5.49452 2.87422 7.5953 2 9.99999 2C12.4047 2 14.5055 2.87422 16.2445 4.59766C16.9595 5.307 17.5679 6.11619 18.0508 7C17.4875 8.05156 15.0336 12 9.99999 12ZM9.99999 3.25C9.25831 3.25 8.53329 3.46993 7.9166 3.88199C7.29992 4.29404 6.81927 4.87971 6.53544 5.56494C6.25162 6.25016 6.17735 7.00416 6.32205 7.73159C6.46674 8.45902 6.82389 9.1272 7.34834 9.65165C7.87279 10.1761 8.54097 10.5333 9.2684 10.6779C9.99583 10.8226 10.7498 10.7484 11.4351 10.4645C12.1203 10.1807 12.7059 9.70007 13.118 9.08339C13.5301 8.4667 13.75 7.74168 13.75 7C13.749 6.00576 13.3535 5.05253 12.6505 4.34949C11.9475 3.64645 10.9942 3.25103 9.99999 3.25ZM9.99999 9.5C9.50554 9.5 9.02219 9.35338 8.61107 9.07867C8.19994 8.80397 7.87951 8.41352 7.69029 7.95671C7.50107 7.49989 7.45157 6.99723 7.54803 6.51227C7.64449 6.02732 7.88259 5.58186 8.23222 5.23223C8.58186 4.8826 9.02731 4.6445 9.51227 4.54804C9.99722 4.45157 10.4999 4.50108 10.9567 4.6903C11.4135 4.87952 11.804 5.19995 12.0787 5.61107C12.3534 6.0222 12.5 6.50555 12.5 7C12.5 7.66304 12.2366 8.29893 11.7678 8.76777C11.2989 9.23661 10.663 9.5 9.99999 9.5Z"
                                fill="#3D3D3D"
                              />
                            </svg> </span
                          ><a>View Profile</a>
                        </div></NuxtLink
                      >
                    </li>

                    <li>
                      <div class="flex text-xs gap-3">
                        <span
                          ><svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.875 8.125C6.875 7.95924 6.94085 7.80027 7.05806 7.68306C7.17527 7.56585 7.33424 7.5 7.5 7.5H12.5C12.6658 7.5 12.8247 7.56585 12.9419 7.68306C13.0592 7.80027 13.125 7.95924 13.125 8.125C13.125 8.29076 13.0592 8.44973 12.9419 8.56694C12.8247 8.68415 12.6658 8.75 12.5 8.75H7.5C7.33424 8.75 7.17527 8.68415 7.05806 8.56694C6.94085 8.44973 6.875 8.29076 6.875 8.125ZM7.5 11.25H12.5C12.6658 11.25 12.8247 11.1842 12.9419 11.0669C13.0592 10.9497 13.125 10.7908 13.125 10.625C13.125 10.4592 13.0592 10.3003 12.9419 10.1831C12.8247 10.0658 12.6658 10 12.5 10H7.5C7.33424 10 7.17527 10.0658 7.05806 10.1831C6.94085 10.3003 6.875 10.4592 6.875 10.625C6.875 10.7908 6.94085 10.9497 7.05806 11.0669C7.17527 11.1842 7.33424 11.25 7.5 11.25ZM18.125 4.375V14.375C18.125 14.7065 17.9933 15.0245 17.7589 15.2589C17.5245 15.4933 17.2065 15.625 16.875 15.625H12.2289L11.0695 17.5227C10.9579 17.707 10.8006 17.8593 10.6128 17.9649C10.4249 18.0705 10.213 18.1257 9.9975 18.1253C9.78203 18.1248 9.57034 18.0686 9.38297 17.9622C9.1956 17.8558 9.03891 17.7028 8.92812 17.518L7.77109 15.625H3.125C2.79348 15.625 2.47554 15.4933 2.24112 15.2589C2.0067 15.0245 1.875 14.7065 1.875 14.375V4.375C1.875 4.04348 2.0067 3.72554 2.24112 3.49112C2.47554 3.2567 2.79348 3.125 3.125 3.125H16.875C17.2065 3.125 17.5245 3.2567 17.7589 3.49112C17.9933 3.72554 18.125 4.04348 18.125 4.375ZM16.875 4.375H3.125V14.375H7.77109C7.98628 14.3756 8.19772 14.4314 8.38514 14.5371C8.57255 14.6429 8.72966 14.795 8.84141 14.9789L10 16.875L11.1578 14.975C11.27 14.7917 11.4275 14.6402 11.615 14.5351C11.8026 14.4301 12.0139 14.3749 12.2289 14.375H16.875V4.375Z"
                              fill="#3D3D3D"
                            />
                          </svg>
                        </span>
                        <a>Message</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="py-10 items-center flex justify-center">
          <span>No matched candidate yet</span>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>
